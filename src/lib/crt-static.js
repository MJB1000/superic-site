/* CRTStatic — analog TV static / snow on <canvas>.
 * Dependency-free, DPR-aware, pauses offscreen or when the tab is hidden,
 * honors prefers-reduced-motion (renders one frozen frame).
 *
 *   const crt = new CRTStatic(canvasEl, { tint:'green', intensity:0.55 });
 *   crt.start();
 *   crt.destroy();
 */
const global = typeof window !== 'undefined' ? window : globalThis;

const TINTS = {
  mono: [255, 255, 255],
  green: [150, 255, 205],
  amber: [255, 224, 150],
  blue: [180, 215, 255],
};

function CRTStatic(canvas, opts) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d', { alpha: false });
  this.cfg = {
    tint: 'green',
    intensity: 0.55,   // 0..1 brightness of the snow
    grain: 2,          // noise pixel size (logical px) — bigger = chunkier
    fps: 24,           // static refresh rate; TVs feel right around 20-30
    scanlines: true,
    rollbar: true,     // slow bright band drifting down the tube
  };
  if (opts) for (var k in opts) this.cfg[k] = opts[k];

  this.running = false;
  this.visible = true;
  this._raf = 0;
  this._last = 0;
  this._roll = 0;
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

CRTStatic.prototype._debounce = function (fn, ms) {
  var t; return function () { clearTimeout(t); t = setTimeout(fn, ms); };
};

CRTStatic.prototype.resize = function () {
  var rect = this.canvas.getBoundingClientRect();
  var w = Math.max(1, Math.floor(rect.width));
  var h = Math.max(1, Math.floor(rect.height));
  this.cssW = w; this.cssH = h;

  // Render the noise at a reduced resolution, then upscale — that's what gives
  // the chunky analog grain instead of fine digital dither.
  var g = Math.max(1, this.cfg.grain);
  this.nw = Math.max(1, Math.ceil(w / g));
  this.nh = Math.max(1, Math.ceil(h / g));

  this.canvas.width = w;
  this.canvas.height = h;

  if (!this._buf || this._buf.width !== this.nw || this._buf.height !== this.nh) {
    this._buf = document.createElement('canvas');
    this._buf.width = this.nw;
    this._buf.height = this.nh;
    this._bctx = this._buf.getContext('2d');
    this._img = this._bctx.createImageData(this.nw, this.nh);
  }

  this.ctx.imageSmoothingEnabled = false;
  this._draw();
};

CRTStatic.prototype.setConfig = function (partial) {
  var needsResize = false;
  for (var k in partial) {
    if (k === 'grain' && partial[k] !== this.cfg.grain) needsResize = true;
    this.cfg[k] = partial[k];
  }
  if (needsResize) this.resize(); else this._draw();
};

CRTStatic.prototype._draw = function () {
  var ctx = this.ctx, img = this._img;
  if (!img) return;
  var d = img.data;
  var tint = TINTS[this.cfg.tint] || TINTS.mono;
  var amp = 255 * Math.max(0, Math.min(1, this.cfg.intensity));

  for (var i = 0; i < d.length; i += 4) {
    var v = Math.random() * amp;
    d[i] = (v * tint[0]) / 255;
    d[i + 1] = (v * tint[1]) / 255;
    d[i + 2] = (v * tint[2]) / 255;
    d[i + 3] = 255;
  }
  this._bctx.putImageData(img, 0, 0);

  ctx.imageSmoothingEnabled = false;
  ctx.globalAlpha = 1;
  ctx.drawImage(this._buf, 0, 0, this.cssW, this.cssH);

  // Slow roll bar — the classic vertical-sync drift.
  if (this.cfg.rollbar) {
    var bandH = Math.max(40, this.cssH * 0.14);
    var y = this._roll % (this.cssH + bandH) - bandH;
    var grad = ctx.createLinearGradient(0, y, 0, y + bandH);
    grad.addColorStop(0, 'rgba(255,255,255,0)');
    grad.addColorStop(0.5, 'rgba(255,255,255,0.06)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, y, this.cssW, bandH);
  }

  // Scanlines burned into the tube.
  if (this.cfg.scanlines) {
    ctx.fillStyle = 'rgba(0,0,0,0.32)';
    for (var sy = 0; sy < this.cssH; sy += 3) ctx.fillRect(0, sy, this.cssW, 1);
  }
};

CRTStatic.prototype._frame = function (t) {
  if (!this.running || !this.visible || document.hidden) { this._raf = 0; return; }
  var interval = 1000 / Math.max(1, this.cfg.fps);
  if (!this._last || t - this._last >= interval) {
    this._last = t;
    this._roll += 6;
    this._draw();
  }
  this._raf = requestAnimationFrame(this._frame);
};

CRTStatic.prototype._ensureLoop = function () {
  if (!this._raf) this._raf = requestAnimationFrame(this._frame);
};

CRTStatic.prototype._onVisibility = function () {
  if (!document.hidden && this.running) this._ensureLoop();
};

CRTStatic.prototype.start = function () {
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

CRTStatic.prototype.stop = function () {
  this.running = false;
  if (this._raf) { cancelAnimationFrame(this._raf); this._raf = 0; }
};

CRTStatic.prototype.destroy = function () {
  this.stop();
  if (this._watchdog) { clearInterval(this._watchdog); this._watchdog = 0; }
  global.removeEventListener('resize', this._onResize);
  document.removeEventListener('visibilitychange', this._onVis);
  if (this._io) this._io.disconnect();
};

CRTStatic.TINTS = TINTS;
export default CRTStatic;
