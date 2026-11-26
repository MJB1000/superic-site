/* MatrixRain — dependency-free Matrix-style digital rain on <canvas>.
 * Authentic green-trail / bright-head look, DPR-aware, responsive, and cheap.
 * Pauses when offscreen or tab hidden; honors prefers-reduced-motion.
 *
 *   const rain = new MatrixRain(canvasEl, { theme:'green' });
 *   rain.start();
 *   rain.setConfig({ theme:'amber', speed:1.4 });
 */
const global = typeof window !== 'undefined' ? window : globalThis;

  // Half-width katakana (the real Matrix glyphs) + digits + a little latin/symbols.
  var KATAKANA = '';
  for (var c = 0xff66; c <= 0xff9d; c++) KATAKANA += String.fromCharCode(c);
  var DIGITS = '0123456789';
  var LATIN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var SYMBOLS = ':.=*+-<>¦|╌╍';

  // Words that make the rain relevant to a solo-marketer / AI-automation site.
  var WORDS = ['AUTOMATE','SCALE','SHIP','GROWTH','SOLO','SYSTEM','OUTPUT',
    'SIGNAL','FOCUS','BUILD','BRAND','CONTENT','FUNNEL','COMPOUND','EXECUTE',
    'AI','LEVERAGE','SPEED','OPERATOR'];

  var THEMES = {
    green: { bg: '#0a0a0a', body: '#13db86', head: '#d8ffe9', glow: '#10b981' },
    amber: { bg: '#231f20', body: '#f5eb19', head: '#fffbe0', glow: '#f5eb19' },
    mono:  { bg: '#0a0a0a', body: '#9aa3ab', head: '#ffffff', glow: '#c8ccd0' }
  };

  var GLYPHSETS = {
    matrix: { chars: (KATAKANA + DIGITS + LATIN).split(''), wordChance: 0.10 },
    binary: { chars: ['0', '1'], wordChance: 0 },
    words:  { chars: (LATIN + DIGITS).split(''), wordChance: 0.55 },
    mixed:  { chars: (KATAKANA + DIGITS + LATIN + SYMBOLS).split(''), wordChance: 0.18 }
  };

  function MatrixRain(canvas, opts) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false });
    this.cfg = {
      theme: 'green',
      glyphSet: 'mixed',
      fontSize: 18,     // logical px at desktop; auto-scaled down on small screens
      speed: 1,         // global multiplier
      density: 0.85,    // fraction of columns that are "live"
      trail: 0.09,      // fade alpha per frame — lower = longer trails
      glow: true
    };
    if (opts) for (var k in opts) this.cfg[k] = opts[k];

    this.running = false;
    this.cols = [];
    this.dpr = 1;
    this.visible = true;
    this.reduced = global.matchMedia &&
      global.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this._frame = this._frame.bind(this);
    this._onResize = this._debounce(this.resize.bind(this), 150);

    global.addEventListener('resize', this._onResize);
    document.addEventListener('visibilitychange', this._onVisibility.bind(this));
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

  MatrixRain.prototype._debounce = function (fn, ms) {
    var t; return function () { clearTimeout(t); t = setTimeout(fn, ms); };
  };

  MatrixRain.prototype._effectiveFont = function (w) {
    // Shrink glyphs a touch on phones so columns stay dense, not chunky.
    var fs = this.cfg.fontSize;
    if (w < 560) fs = Math.max(11, fs * 0.62);
    else if (w < 900) fs = Math.max(13, fs * 0.8);
    return Math.round(fs);
  };

  MatrixRain.prototype.resize = function () {
    var rect = this.canvas.getBoundingClientRect();
    var w = Math.max(1, rect.width), h = Math.max(1, rect.height);
    this.dpr = Math.min(global.devicePixelRatio || 1, 2);
    this.canvas.width = Math.floor(w * this.dpr);
    this.canvas.height = Math.floor(h * this.dpr);
    this.cssW = w; this.cssH = h;

    this.fs = this._effectiveFont(w);
    var ncols = Math.ceil(w / this.fs);
    this.rows = Math.ceil(h / this.fs);

    var prev = this.cols;
    this.cols = [];
    for (var i = 0; i < ncols; i++) {
      this.cols[i] = prev[i] || this._newCol(true);
    }

    var ctx = this.ctx;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.textBaseline = 'top';
    ctx.fillStyle = THEMES[this.cfg.theme].bg;
    ctx.fillRect(0, 0, w, h);

    if (this.reduced) this._renderStatic();
  };

  MatrixRain.prototype._newCol = function (initial) {
    var gs = GLYPHSETS[this.cfg.glyphSet] || GLYPHSETS.mixed;
    var rows = this.rows || 40;
    var col = {
      y: -Math.random() * rows * 1.5,   // staggered above the band → continuous flow
      speed: 0.28 + Math.random() * 0.62,
      tail: 5 + ((Math.random() * 22) | 0),
      lastRow: null,
      lastChar: null,
      step: 0,
      live: Math.random() < this.cfg.density,
      word: null
    };
    if (Math.random() < gs.wordChance) col.word = WORDS[(Math.random() * WORDS.length) | 0];
    return col;
  };

  MatrixRain.prototype._pickChar = function (col) {
    var gs = GLYPHSETS[this.cfg.glyphSet] || GLYPHSETS.mixed;
    if (col.word && col.step < col.word.length) return col.word.charAt(col.step);
    return gs.chars[(Math.random() * gs.chars.length) | 0];
  };

  MatrixRain.prototype.setConfig = function (partial) {
    var themeOrSetChanged = false;
    for (var k in partial) {
      if ((k === 'glyphSet') && partial[k] !== this.cfg.glyphSet) themeOrSetChanged = true;
      this.cfg[k] = partial[k];
    }
    if (themeOrSetChanged) {
      // reassign word-ness to columns under the new glyph set
      for (var i = 0; i < this.cols.length; i++) {
        var gs = GLYPHSETS[this.cfg.glyphSet] || GLYPHSETS.mixed;
        this.cols[i].word = (Math.random() < gs.wordChance)
          ? WORDS[(Math.random() * WORDS.length) | 0] : null;
        this.cols[i].live = Math.random() < this.cfg.density;
      }
    }
    if (partial.theme) {
      this.ctx.fillStyle = THEMES[this.cfg.theme].bg;
      this.ctx.fillRect(0, 0, this.cssW, this.cssH);
    }
    if (this.reduced) this._renderStatic();
  };

  MatrixRain.prototype._renderStatic = function () {
    // One dense pass for reduced-motion / print: a frozen field of glyphs.
    var ctx = this.ctx, t = THEMES[this.cfg.theme];
    ctx.fillStyle = t.bg; ctx.fillRect(0, 0, this.cssW, this.cssH);
    ctx.font = this.fs + 'px "JetBrains Mono", ui-monospace, monospace';
    for (var i = 0; i < this.cols.length; i++) {
      var x = i * this.fs;
      var top = (Math.random() * this.rows) | 0;
      var len = 6 + ((Math.random() * (this.rows * 0.7)) | 0);
      for (var r = 0; r < len; r++) {
        var row = top + r;
        if (row > this.rows) break;
        var a = 0.12 + 0.75 * (r / len);
        ctx.globalAlpha = a;
        ctx.fillStyle = (r === len - 1) ? t.head : t.body;
        ctx.fillText(this._pickChar({ word: null, step: 0 }), x, row * this.fs);
      }
    }
    ctx.globalAlpha = 1;
  };

  MatrixRain.prototype._frame = function () {
    if (!this.running || !this.visible || document.hidden) { this._raf = 0; return; }
    var ctx = this.ctx, t = THEMES[this.cfg.theme], fs = this.fs;

    // Fade the whole field toward bg → leaves the green trails behind the heads.
    ctx.globalAlpha = this.cfg.trail;
    ctx.fillStyle = t.bg;
    ctx.fillRect(0, 0, this.cssW, this.cssH);
    ctx.globalAlpha = 1;

    ctx.font = fs + 'px "JetBrains Mono", ui-monospace, monospace';

    for (var i = 0; i < this.cols.length; i++) {
      var col = this.cols[i];
      if (!col.live) continue;
      var x = i * fs;
      var newRow = Math.floor(col.y);

      if (col.lastRow === null) { col.lastRow = newRow; col.lastChar = this._pickChar(col); }

      if (newRow !== col.lastRow) {
        if (col.lastChar !== null && col.lastRow >= 0) {
          ctx.shadowBlur = 0;
          ctx.fillStyle = t.body;
          ctx.fillText(col.lastChar, x, col.lastRow * fs);
        }
        col.step++;
        col.lastChar = this._pickChar(col);
        col.lastRow = newRow;
      }

      if (newRow >= 0) {
        if (this.cfg.glow) { ctx.shadowColor = t.glow; ctx.shadowBlur = fs * 0.55; }
        ctx.fillStyle = t.head;
        ctx.fillText(col.lastChar, x, newRow * fs);
        ctx.shadowBlur = 0;
      }

      col.y += col.speed * this.cfg.speed;

      if (newRow > this.rows + col.tail) {
        this.cols[i] = this._newCol(false);
      }
    }

    this._raf = requestAnimationFrame(this._frame);
  };

  MatrixRain.prototype._ensureLoop = function () {
    if (!this._raf) this._raf = requestAnimationFrame(this._frame);
  };

  MatrixRain.prototype._onVisibility = function () {
    if (!document.hidden && this.running) this._ensureLoop();
  };

  MatrixRain.prototype.start = function () {
    this.running = true;
    if (this.reduced) { this._renderStatic(); return; }
    this._ensureLoop();
    // Watchdog: if the loop ever drops (tab switch, canvas re-layout, throttled
    // rAF, IO false-negative) restart it so the rain never stalls.
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

  MatrixRain.prototype.stop = function () {
    this.running = false;
    if (this._raf) { cancelAnimationFrame(this._raf); this._raf = 0; }
  };

  MatrixRain.prototype.destroy = function () {
    this.stop();
    if (this._watchdog) { clearInterval(this._watchdog); this._watchdog = 0; }
    global.removeEventListener('resize', this._onResize);
    if (this._io) this._io.disconnect();
  };

MatrixRain.THEMES = THEMES;
MatrixRain.GLYPHSETS = GLYPHSETS;
export default MatrixRain;
