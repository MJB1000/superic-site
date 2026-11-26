/* CRTDrive — 8-bit POV night drive rendered on a CRT tube.
 * A low-res pixel buffer (chunky grain) draws: starfield, layered hill
 * silhouettes scrolling sideways, a perspective road with dashes rushing
 * toward the viewer, plus analog snow, scanlines and a slow roll bar.
 *
 *   const drive = new CRTDrive(canvasEl, { tint:'green', noise:0.18 });
 *   drive.start();
 *   drive.destroy();
 */
const global = typeof window !== 'undefined' ? window : globalThis;

const TINTS = {
  mono: [255, 255, 255],
  green: [150, 255, 205],
  amber: [255, 224, 150],
  blue: [180, 215, 255],
};

function CRTDrive(canvas, opts) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d', { alpha: false });
  this.cfg = {
    tint: 'green',
    grain: 4,        // pixel size (logical px) — chunky 8-bit look
    noise: 0.18,     // 0..1 amount of TV snow mixed over the scene
    speed: 1,        // drive speed multiplier
    fps: 24,
    scanlines: true,
    rollbar: true,
  };
  if (opts) for (var k in opts) this.cfg[k] = opts[k];

  this.running = false;
  this.visible = true;
  this._raf = 0;
  this._last = 0;
  this._roll = 0;
  this._z = 0;      // distance travelled
  this._x = 0;      // lateral hill drift
  this.reduced = global.matchMedia &&
    global.matchMedia('(prefers-reduced-motion: reduce)').matches;

  this._frame = this._frame.bind(this);
  this._onResize = this._debounce(this.resize.bind(this), 150);
  global.addEventListener('resize', this._onResize);
  this._onVis = this._onVisibility.bind(this);
  document.addEventListener('visibilitychange', this._onVis);

  if ('IntersectionObserver' in global) {
    var self = this;
    this._io = new IntersectionObserver(function (es) {
      self.visible = es[0].isIntersecting;
      if (self.visible && self.running) self._ensureLoop();
    }, { threshold: 0 });
    this._io.observe(canvas);
  }

  this.resize();
}

CRTDrive.prototype._debounce = function (fn, ms) {
  var t; return function () { clearTimeout(t); t = setTimeout(fn, ms); };
};

CRTDrive.prototype.resize = function () {
  var rect = this.canvas.getBoundingClientRect();
  var w = Math.max(1, Math.floor(rect.width));
  var h = Math.max(1, Math.floor(rect.height));
  this.cssW = w; this.cssH = h;

  var g = Math.max(1, this.cfg.grain);
  this.nw = Math.max(1, Math.ceil(w / g));
  this.nh = Math.max(1, Math.ceil(h / g));

  this.canvas.width = w;
  this.canvas.height = h;

  this._buf = document.createElement('canvas');
  this._buf.width = this.nw;
  this._buf.height = this.nh;
  this._bctx = this._buf.getContext('2d');
  this._img = this._bctx.createImageData(this.nw, this.nh);

  // Stable starfield in buffer space.
  this._stars = [];
  var horizon = Math.floor(this.nh * 0.46);
  var count = Math.floor((this.nw * horizon) / 900);
  for (var i = 0; i < count; i++) {
    this._stars.push({
      x: Math.random() * this.nw,
      y: Math.random() * (horizon - 2),
      b: 0.35 + Math.random() * 0.65,
    });
  }

  this.ctx.imageSmoothingEnabled = false;
  this._draw();
};

CRTDrive.prototype.setConfig = function (partial) {
  var needsResize = false;
  for (var k in partial) {
    if (k === 'grain' && partial[k] !== this.cfg.grain) needsResize = true;
    this.cfg[k] = partial[k];
  }
  if (needsResize) this.resize(); else this._draw();
};

/* ---- scene painting into the low-res image buffer ---- */

CRTDrive.prototype._draw = function () {
  var img = this._img;
  if (!img) return;
  var d = img.data, W = this.nw, H = this.nh;
  var tint = TINTS[this.cfg.tint] || TINTS.mono;
  var noise = Math.max(0, Math.min(1, this.cfg.noise));
  var horizon = Math.floor(H * 0.46);
  var z = this._z, xdrift = this._x;

  function px(x, y, lum) {
    var i = (y * W + x) * 4;
    var v = lum * 255;
    d[i] = (v * tint[0]) / 255;
    d[i + 1] = (v * tint[1]) / 255;
    d[i + 2] = (v * tint[2]) / 255;
    d[i + 3] = 255;
  }

  // Sky gradient (very dark, brightening a touch at the horizon).
  for (var y = 0; y < horizon; y++) {
    var t = y / horizon;
    var lum = 0.015 + t * t * 0.075;
    for (var x = 0; x < W; x++) px(x, y, lum + Math.random() * noise * 0.25);
  }

  // Stars (twinkle).
  for (var s = 0; s < this._stars.length; s++) {
    var st = this._stars[s];
    var sx = Math.floor(st.x) % W;
    var sy = Math.floor(st.y);
    if (sy >= 0 && sy < horizon) px(sx, sy, st.b * (0.6 + Math.random() * 0.4));
  }

  // Ground base.
  for (var gy = horizon; gy < H; gy++) {
    for (var gx = 0; gx < W; gx++) px(gx, gy, 0.03 + Math.random() * noise * 0.35);
  }

  // Hill layers behind the horizon: three parallax bands of sine ridges.
  var layers = [
    { amp: H * 0.13, freq: 0.018, off: 0.0, par: 0.10, lum: 0.16 },
    { amp: H * 0.09, freq: 0.030, off: 40.0, par: 0.22, lum: 0.10 },
    { amp: H * 0.055, freq: 0.052, off: 90.0, par: 0.38, lum: 0.06 },
  ];
  for (var L = 0; L < layers.length; L++) {
    var la = layers[L];
    for (var hx = 0; hx < W; hx++) {
      var u = hx + xdrift * la.par + la.off;
      var ridge =
        Math.sin(u * la.freq) * la.amp +
        Math.sin(u * la.freq * 2.3 + 1.7) * la.amp * 0.35;
      var top = Math.floor(horizon - Math.abs(ridge) * 0.9 - 1);
      if (top < 0) top = 0;
      // silhouette edge is brighter (phosphor rim), body darker
      for (var yy = top; yy < horizon; yy++) {
        var edge = yy < top + 2 ? la.lum + 0.42 : la.lum;
        px(hx, yy, edge);
      }
    }
  }

  // Perspective road.
  var cx = W / 2;
  var roadTopHalf = Math.max(1, W * 0.012);
  var roadBotHalf = W * 0.62;
  for (var ry = horizon; ry < H; ry++) {
    var p = (ry - horizon) / Math.max(1, H - horizon);   // 0 at horizon, 1 bottom
    var pers = p * p;                                     // perspective easing
    var half = roadTopHalf + (roadBotHalf - roadTopHalf) * pers;
    var bend = Math.sin((z * 0.01) + p * 1.4) * W * 0.06 * (1 - p);
    var center = cx + bend;
    var l = Math.floor(center - half), r = Math.floor(center + half);

    // asphalt with alternating scan bands rushing toward viewer
    var band = Math.floor((1 / Math.max(0.02, p)) * 6 + z * 0.55) % 2;
    var base = 0.055 + (band ? 0.03 : 0) + p * 0.02;
    for (var ax = Math.max(0, l); ax <= Math.min(W - 1, r); ax++) {
      px(ax, ry, base + Math.random() * noise * 0.4);
    }
    // shoulders / edge lines
    var ew = Math.max(1, Math.floor(half * 0.05));
    for (var e = 0; e < ew; e++) {
      if (l + e >= 0 && l + e < W) px(l + e, ry, 0.55 + Math.random() * 0.15);
      if (r - e >= 0 && r - e < W) px(r - e, ry, 0.55 + Math.random() * 0.15);
    }
    // dashed centre line
    var dash = Math.floor((1 / Math.max(0.02, p)) * 3 + z * 0.5) % 2 === 0;
    if (dash) {
      var dw = Math.max(1, Math.floor(half * 0.035));
      for (var dx = -dw; dx <= dw; dx++) {
        var mx = Math.floor(center + dx);
        if (mx >= 0 && mx < W) px(mx, ry, 0.7);
      }
    }
  }

  // Headlight cone glow near the bottom centre.
  for (var cy = horizon; cy < H; cy++) {
    var cp = (cy - horizon) / Math.max(1, H - horizon);
    var spread = W * (0.04 + cp * 0.5);
    for (var gx2 = Math.max(0, Math.floor(cx - spread)); gx2 < Math.min(W, cx + spread); gx2++) {
      var i2 = (cy * W + gx2) * 4;
      var falloff = (1 - Math.abs(gx2 - cx) / spread) * cp * 0.22;
      d[i2] = Math.min(255, d[i2] + falloff * tint[0] * 0.5);
      d[i2 + 1] = Math.min(255, d[i2 + 1] + falloff * tint[1] * 0.7);
      d[i2 + 2] = Math.min(255, d[i2 + 2] + falloff * tint[2] * 0.6);
    }
  }

  // TV snow mixed over everything.
  if (noise > 0) {
    for (var i3 = 0; i3 < d.length; i3 += 4) {
      var n = Math.random() * noise * 190;
      d[i3] = Math.min(255, d[i3] + (n * tint[0]) / 255);
      d[i3 + 1] = Math.min(255, d[i3 + 1] + (n * tint[1]) / 255);
      d[i3 + 2] = Math.min(255, d[i3 + 2] + (n * tint[2]) / 255);
    }
  }

  this._bctx.putImageData(img, 0, 0);

  var ctx = this.ctx;
  ctx.imageSmoothingEnabled = false;
  ctx.globalAlpha = 1;
  ctx.drawImage(this._buf, 0, 0, this.cssW, this.cssH);

  if (this.cfg.rollbar) {
    var bandH = Math.max(40, this.cssH * 0.14);
    var yb = this._roll % (this.cssH + bandH) - bandH;
    var grad = ctx.createLinearGradient(0, yb, 0, yb + bandH);
    grad.addColorStop(0, 'rgba(255,255,255,0)');
    grad.addColorStop(0.5, 'rgba(255,255,255,0.05)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, yb, this.cssW, bandH);
  }

  if (this.cfg.scanlines) {
    ctx.fillStyle = 'rgba(0,0,0,0.32)';
    for (var sy2 = 0; sy2 < this.cssH; sy2 += 3) ctx.fillRect(0, sy2, this.cssW, 1);
  }
};

CRTDrive.prototype._frame = function (t) {
  if (!this.running || !this.visible || document.hidden) { this._raf = 0; return; }
  var interval = 1000 / Math.max(1, this.cfg.fps);
  if (!this._last || t - this._last >= interval) {
    this._last = t;
    this._roll += 6;
    this._z += 1.1 * this.cfg.speed;
    this._x += 0.9 * this.cfg.speed;
    this._draw();
  }
  this._raf = requestAnimationFrame(this._frame);
};

CRTDrive.prototype._ensureLoop = function () {
  if (!this._raf) this._raf = requestAnimationFrame(this._frame);
};

CRTDrive.prototype._onVisibility = function () {
  if (!document.hidden && this.running) this._ensureLoop();
};

CRTDrive.prototype.start = function () {
  this.running = true;
  if (this.reduced) { this._draw(); return; }
  this._ensureLoop();
  if (!this._watchdog) {
    var self = this;
    this._watchdog = setInterval(function () {
      if (self.running && !document.hidden && !self._raf) {
        self.visible = true;
        self._ensureLoop();
      }
    }, 1000);
  }
};

CRTDrive.prototype.stop = function () {
  this.running = false;
  if (this._raf) { cancelAnimationFrame(this._raf); this._raf = 0; }
};

CRTDrive.prototype.destroy = function () {
  this.stop();
  if (this._watchdog) { clearInterval(this._watchdog); this._watchdog = 0; }
  global.removeEventListener('resize', this._onResize);
  document.removeEventListener('visibilitychange', this._onVis);
  if (this._io) this._io.disconnect();
};

CRTDrive.TINTS = TINTS;
export default CRTDrive;
