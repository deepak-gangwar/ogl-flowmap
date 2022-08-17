/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/ansi-html-community/index.js":
/*!***************************************************!*\
  !*** ./node_modules/ansi-html-community/index.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = ansiHTML

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

var _defColors = {
  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
}
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
}
var _openTags = {
  '1': 'font-weight:bold', // bold
  '2': 'opacity:0.5', // dim
  '3': '<i>', // italic
  '4': '<u>', // underscore
  '8': 'display:none', // hidden
  '9': '<del>' // delete
}
var _closeTags = {
  '23': '</i>', // reset italic
  '24': '</u>', // reset underscore
  '29': '</del>' // reset delete
}

;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>'
})

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML (text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text
  }

  // Cache opened sequence.
  var ansiCodes = []
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)m/g, function (match, seq) {
    var ot = _openTags[seq]
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop()
        return '</span>'
      }
      // Open tag.
      ansiCodes.push(seq)
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
    }

    var ct = _closeTags[seq]
    if (ct) {
      // Pop sequence
      ansiCodes.pop()
      return ct
    }
    return ''
  })

  // Make sure tags are closed.
  var l = ansiCodes.length
  ;(l > 0) && (ret += Array(l + 1).join('</span>'))

  return ret
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.')
  }

  var _finalColors = {}
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null
    if (!hex) {
      _finalColors[key] = _defColors[key]
      continue
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex]
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string'
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
      }
      var defHexColor = _defColors[key]
      if (!hex[0]) {
        hex[0] = defHexColor[0]
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]]
        hex.push(defHexColor[1])
      }

      hex = hex.slice(0, 2)
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
    }
    _finalColors[key] = hex
  }
  _setTags(_finalColors)
}

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors)
}

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {}

if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () { return _openTags }
  })
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () { return _closeTags }
  })
} else {
  ansiHTML.tags.open = _openTags
  ansiHTML.tags.close = _closeTags
}

function _setTags (colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey

  for (var code in _styles) {
    var color = _styles[code]
    var oriColor = colors[color] || '000'
    _openTags[code] = 'color:#' + oriColor
    code = parseInt(code)
    _openTags[(code + 10).toString()] = 'background:#' + oriColor
  }
}

ansiHTML.reset()


/***/ }),

/***/ "./app/components/canvas.js":
/*!**********************************!*\
  !*** ./app/components/canvas.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Canvas)
/* harmony export */ });
/* harmony import */ var _ogl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ogl */ "./app/components/ogl.js");
/* harmony import */ var _shaders_vertex_glsl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shaders/vertex.glsl */ "./app/shaders/vertex.glsl");
/* harmony import */ var _shaders_fragment_glsl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shaders/fragment.glsl */ "./app/shaders/fragment.glsl");



class Canvas {
  constructor() {
    this.bind();
    this.vertexShader = _shaders_vertex_glsl__WEBPACK_IMPORTED_MODULE_1__["default"];
    this.fragmentShader = _shaders_fragment_glsl__WEBPACK_IMPORTED_MODULE_2__["default"];
    this.imgSize = [1920, 1080];
    const canvas = document.querySelector('.webgl');
    this.renderer = new _ogl__WEBPACK_IMPORTED_MODULE_0__.ogl.Renderer({
      canvas: canvas,
      dpr: 2
    });
    this.gl = this.renderer.gl; // Variable inputs to control flowmap

    this.aspect = 1;
    this.mouse = new _ogl__WEBPACK_IMPORTED_MODULE_0__.ogl.Vec2(-1);
    this.velocity = new _ogl__WEBPACK_IMPORTED_MODULE_0__.ogl.Vec2();
    this.flowmap = new _ogl__WEBPACK_IMPORTED_MODULE_0__.ogl.Flowmap(this.gl);
    this.lastTime = undefined;
    this.lastMouse = new _ogl__WEBPACK_IMPORTED_MODULE_0__.ogl.Vec2();
    this.rAF = undefined;
    this.init();
  }

  bind() {
    ['updateMouse', 'update'].forEach(fn => this[fn] = this[fn].bind(this));
  } //replace all window.innerWidth and height by using them in store object


  resize() {
    let a1, a2;
    var imageAspect = this.imgSize[1] / this.imgSize[0];

    if (window.innerHeight / window.innerWidth < imageAspect) {
      a1 = 1;
      a2 = window.innerHeight / window.innerWidth / imageAspect;
    } else {
      a1 = window.innerWidth / window.innerHeight * imageAspect;
      a2 = 1;
    }

    this.mesh.program.uniforms.res.value = new _ogl__WEBPACK_IMPORTED_MODULE_0__.ogl.Vec4(window.innerWidth, window.innerHeight, a1, a2);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.aspect = window.innerWidth / window.innerHeight;
  }

  createGeometry() {
    // Triangle that includes -1 to 1 range for 'position', and 0 to 1 range for 'uv'.
    this.geometry = new _ogl__WEBPACK_IMPORTED_MODULE_0__.ogl.Geometry(this.gl, {
      position: {
        size: 2,
        data: new Float32Array([-1, -1, 3, -1, -1, 3])
      },
      uv: {
        size: 2,
        data: new Float32Array([0, 0, 2, 0, 0, 2])
      }
    });
  }

  updateTexture() {
    this.texture = new _ogl__WEBPACK_IMPORTED_MODULE_0__.ogl.Texture(this.gl, {
      minFilter: this.gl.LINEAR,
      magFilter: this.gl.LINEAR
    });
    const img = new Image();

    img.onload = () => this.texture.image = img;

    img.crossOrigin = "Anonymous";
    img.src = "text.png";
    let a1, a2;
    var imageAspect = this.imgSize[1] / this.imgSize[0];

    if (window.innerHeight / window.innerWidth < imageAspect) {
      a1 = 1;
      a2 = window.innerHeight / window.innerWidth / imageAspect;
    } else {
      a1 = window.innerWidth / window.innerHeight * imageAspect;
      a2 = 1;
    }

    return {
      a1,
      a2
    };
  }

  createShaders() {
    const textureAspect = this.updateTexture();
    this.program = new _ogl__WEBPACK_IMPORTED_MODULE_0__.ogl.Program(this.gl, {
      vertex: this.vertexShader,
      fragment: this.fragmentShader,
      uniforms: {
        uTime: {
          value: 0
        },
        tWater: {
          value: this.texture
        },
        res: {
          value: new _ogl__WEBPACK_IMPORTED_MODULE_0__.ogl.Vec4(window.innerWidth, window.innerHeight, textureAspect.a1, textureAspect.a2)
        },
        img: {
          value: new _ogl__WEBPACK_IMPORTED_MODULE_0__.ogl.Vec2(this.imgSize[0], this.imgSize[1])
        },
        // Note that the uniform is applied without using an object and value property
        // This is because the class alternates this texture between two render targets
        // and updates the value property after each render.
        tFlow: this.flowmap.uniform
      }
    });
  }

  createMesh() {
    this.mesh = new _ogl__WEBPACK_IMPORTED_MODULE_0__.ogl.Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });
  }

  updateMouse(e) {
    e.preventDefault();

    if (e.changedTouches && e.changedTouches.length) {
      e.x = e.changedTouches[0].pageX;
      e.y = e.changedTouches[0].pageY;
    }

    if (e.x === undefined) {
      e.x = e.pageX;
      e.y = e.pageY;
    } // Get mouse value in 0 to 1 range, with y flipped


    this.mouse.set(e.x / this.gl.renderer.width, 1.0 - e.y / this.gl.renderer.height); // Calculate velocity

    if (!this.lastTime) {
      // First frame
      this.lastTime = performance.now();
      this.lastMouse.set(e.x, e.y);
    }

    const deltaX = e.x - this.lastMouse.x;
    const deltaY = e.y - this.lastMouse.y;
    this.lastMouse.set(e.x, e.y);
    let time = performance.now(); // Avoid dividing by 0

    let delta = Math.max(10.4, time - this.lastTime);
    this.lastTime = time;
    this.velocity.x = deltaX / delta;
    this.velocity.y = deltaY / delta; // Flag update to prevent hanging velocity values when not moving

    this.velocity.needsUpdate = true;
  }

  update(t) {
    requestAnimationFrame(this.update); // Reset velocity when mouse not moving

    if (!this.velocity.needsUpdate) {
      this.mouse.set(-1);
      this.velocity.set(0);
    }

    this.velocity.needsUpdate = false; // Update flowmap inputs

    this.flowmap.aspect = this.aspect;
    this.flowmap.mouse.copy(this.mouse); // Ease velocity input, slower when fading out

    this.flowmap.velocity.lerp(this.velocity, this.velocity.len ? 0.15 : 0.1);
    this.flowmap.update();
    this.program.uniforms.uTime.value = t * 0.01;
    this.renderer.render({
      scene: this.mesh
    });
  }

  requestAnimationFrame() {
    this.rAF = requestAnimationFrame(this.update);
  }

  cancelAnimationFrame() {
    cancelAnimationFrame(this.rAF);
  }

  addEventListeners() {
    this.update(); // Create handlers to get mouse position and velocity

    const isTouchCapable = ("ontouchstart" in window);

    if (isTouchCapable) {
      window.addEventListener("touchstart", this.updateMouse, false);
      window.addEventListener("touchmove", this.updateMouse, {
        passive: false
      });
    } else {
      window.addEventListener("mousemove", this.updateMouse, false);
    }

    window.addEventListener("resize", this.resize, false);
  }

  removeEventListeners() {
    this.cancelAnimationFrame(this.rAF);
    const isTouchCapable = ("ontouchstart" in window);

    if (isTouchCapable) {
      window.removeEventListener("touchstart", this.updateMouse, false);
      window.removeEventListener("touchmove", this.updateMouse, {
        passive: false
      });
    } else {
      window.removeEventListener("mousemove", this.updateMouse, false);
    }

    window.removeEventListener("resize", resize, false);
  }

  destroy() {
    this.removeEventListeners();
  }

  init() {
    this.createGeometry();
    this.createShaders();
    this.createMesh();
    this.addEventListeners();
    this.resize();
  }

}

/***/ }),

/***/ "./app/components/ogl.js":
/*!*******************************!*\
  !*** ./app/components/ogl.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ogl": () => (/* binding */ ogl)
/* harmony export */ });
const ogl = function (a) {
  "use strict";

  function t(a) {
    let b = a[0],
        c = a[1],
        d = a[2];
    return Math.sqrt(b * b + c * c + d * d);
  }

  function u(a, b) {
    return a[0] = b[0], a[1] = b[1], a[2] = b[2], a;
  }

  function v(a, b, c) {
    return a[0] = b[0] + c[0], a[1] = b[1] + c[1], a[2] = b[2] + c[2], a;
  }

  function w(a, b, c) {
    return a[0] = b[0] - c[0], a[1] = b[1] - c[1], a[2] = b[2] - c[2], a;
  }

  function x(a, b, c) {
    return a[0] = b[0] * c, a[1] = b[1] * c, a[2] = b[2] * c, a;
  }

  function y(c, a) {
    let d = a[0],
        e = a[1],
        f = a[2],
        b = d * d + e * e + f * f;
    return b > 0 && (b = 1 / Math.sqrt(b)), c[0] = a[0] * b, c[1] = a[1] * b, c[2] = a[2] * b, c;
  }

  function z(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }

  let A = function () {
    let a = [0, 0, 0],
        b = [0, 0, 0];
    return function (d, e) {
      u(a, d), u(b, e), y(a, a), y(b, b);
      let c = z(a, b);
      return c > 1 ? 0 : c < -1 ? Math.PI : Math.acos(c);
    };
  }();

  class b extends Array {
    constructor(a = 0, b = a, c = a) {
      return super(a, b, c), this;
    }

    get x() {
      return this[0];
    }

    set x(a) {
      this[0] = a;
    }

    get y() {
      return this[1];
    }

    set y(a) {
      this[1] = a;
    }

    get z() {
      return this[2];
    }

    set z(a) {
      this[2] = a;
    }

    set(a, f = a, g = a) {
      var b, c, d, e;
      return a.length ? this.copy(a) : (b = this, c = a, d = f, e = g, b[0] = c, b[1] = d, b[2] = e, this);
    }

    copy(a) {
      return u(this, a), this;
    }

    add(a, b) {
      return b ? v(this, a, b) : v(this, this, a), this;
    }

    sub(a, b) {
      return b ? w(this, a, b) : w(this, this, a), this;
    }

    multiply(c) {
      var d, a, b;
      return c.length ? (a = this, b = c, (d = this)[0] = a[0] * b[0], d[1] = a[1] * b[1], d[2] = a[2] * b[2]) : x(this, this, c), this;
    }

    divide(c) {
      var d, a, b;
      return c.length ? (a = this, b = c, (d = this)[0] = a[0] / b[0], d[1] = a[1] / b[1], d[2] = a[2] / b[2]) : x(this, this, 1 / c), this;
    }

    inverse(c = this) {
      var b, a;
      return a = c, (b = this)[0] = 1 / a[0], b[1] = 1 / a[1], b[2] = 1 / a[2], this;
    }

    len() {
      return t(this);
    }

    distance(f) {
      var a, b;
      let c, d, e;
      return f ? (a = this, c = (b = f)[0] - a[0], d = b[1] - a[1], e = b[2] - a[2], Math.sqrt(c * c + d * d + e * e)) : t(this);
    }

    squaredLen() {
      return this.squaredDistance();
    }

    squaredDistance(j) {
      var a, c, b;
      let d, e, f, g, h, i;
      return j ? (a = this, d = (c = j)[0] - a[0], e = c[1] - a[1], f = c[2] - a[2], d * d + e * e + f * f) : (b = this, g = b[0], h = b[1], i = b[2], g * g + h * h + i * i);
    }

    negate(c = this) {
      var b, a;
      return a = c, (b = this)[0] = -a[0], b[1] = -a[1], b[2] = -a[2], this;
    }

    cross(j, k) {
      var a, b, c;
      let d, e, f, g, h, i;
      return a = this, b = j, c = k, d = b[0], e = b[1], f = b[2], g = c[0], h = c[1], i = c[2], a[0] = e * i - f * h, a[1] = f * g - d * i, a[2] = d * h - e * g, this;
    }

    scale(a) {
      return x(this, this, a), this;
    }

    normalize() {
      return y(this, this), this;
    }

    dot(a) {
      return z(this, a);
    }

    equals(c) {
      var b, a;
      return a = c, (b = this)[0] === a[0] && b[1] === a[1] && b[2] === a[2];
    }

    applyMatrix4(h) {
      var f, g, a;
      let c, d, e, b;
      return f = this, g = this, a = h, c = g[0], d = g[1], e = g[2], b = a[3] * c + a[7] * d + a[11] * e + a[15], b = b || 1, f[0] = (a[0] * c + a[4] * d + a[8] * e + a[12]) / b, f[1] = (a[1] * c + a[5] * d + a[9] * e + a[13]) / b, f[2] = (a[2] * c + a[6] * d + a[10] * e + a[14]) / b, this;
    }

    applyQuaternion(q) {
      var h, i, a;
      let j, k, l, b, c, d, e, f, g, n, o, p, m;
      return h = this, i = this, a = q, j = i[0], k = i[1], l = i[2], b = a[0], c = a[1], d = a[2], e = c * l - d * k, f = d * j - b * l, g = b * k - c * j, n = c * g - d * f, o = d * e - b * g, p = b * f - c * e, m = 2 * a[3], e *= m, f *= m, g *= m, n *= 2, o *= 2, p *= 2, h[0] = j + e + n, h[1] = k + f + o, h[2] = l + g + p, this;
    }

    angle(a) {
      return A(this, a);
    }

    lerp(h, i) {
      var a, b, c, d;
      let e, f, g;
      return a = this, b = this, c = h, d = i, e = b[0], f = b[1], g = b[2], a[0] = e + d * (c[0] - e), a[1] = f + d * (c[1] - f), a[2] = g + d * (c[2] - g), this;
    }

    clone() {
      return new b(this[0], this[1], this[2]);
    }

    fromArray(a, b = 0) {
      return this[0] = a[b], this[1] = a[b + 1], this[2] = a[b + 2], this;
    }

    toArray(a = [], b = 0) {
      return a[b] = this[0], a[b + 1] = this[1], a[b + 2] = this[2], a;
    }

    transformDirection(a) {
      let b = this[0],
          c = this[1],
          d = this[2];
      return this[0] = a[0] * b + a[4] * c + a[8] * d, this[1] = a[1] * b + a[5] * c + a[9] * d, this[2] = a[2] * b + a[6] * c + a[10] * d, this.normalize();
    }

  }

  let B = new b(),
      C = 0,
      D = 0;

  class f {
    constructor(c, a = {}) {
      for (let b in this.gl = c, this.attributes = a, this.id = C++, this.VAOs = {}, this.drawRange = {
        start: 0,
        count: 0
      }, this.instancedCount = 0, this.gl.renderer.bindVertexArray(null), this.gl.renderer.currentGeometry = null, this.glState = this.gl.renderer.state, a) this.addAttribute(b, a[b]);
    }

    addAttribute(b, a) {
      if (this.attributes[b] = a, a.id = D++, a.size = a.size || 1, a.type = a.type || (a.data.constructor === Float32Array ? this.gl.FLOAT : a.data.constructor === Uint16Array ? this.gl.UNSIGNED_SHORT : this.gl.UNSIGNED_INT), a.target = "index" === b ? this.gl.ELEMENT_ARRAY_BUFFER : this.gl.ARRAY_BUFFER, a.normalize = a.normalize || !1, a.buffer = this.gl.createBuffer(), a.count = a.data.length / a.size, a.divisor = a.instanced || 0, a.needsUpdate = !1, this.updateAttribute(a), a.divisor) {
        if (this.isInstanced = !0, this.instancedCount && this.instancedCount !== a.count * a.divisor) return console.warn("geometry has multiple instanced buffers of different length"), this.instancedCount = Math.min(this.instancedCount, a.count * a.divisor);
        this.instancedCount = a.count * a.divisor;
      } else "index" === b ? this.drawRange.count = a.count : this.attributes.index || (this.drawRange.count = Math.max(this.drawRange.count, a.count));
    }

    updateAttribute(a) {
      this.glState.boundBuffer !== a.id && (this.gl.bindBuffer(a.target, a.buffer), this.glState.boundBuffer = a.id), this.gl.bufferData(a.target, a.data, this.gl.STATIC_DRAW), a.needsUpdate = !1;
    }

    setIndex(a) {
      this.addAttribute("index", a);
    }

    setDrawRange(a, b) {
      this.drawRange.start = a, this.drawRange.count = b;
    }

    setInstancedCount(a) {
      this.instancedCount = a;
    }

    createVAO(a) {
      this.VAOs[a.attributeOrder] = this.gl.renderer.createVertexArray(), this.gl.renderer.bindVertexArray(this.VAOs[a.attributeOrder]), this.bindAttributes(a);
    }

    bindAttributes(a) {
      a.attributeLocations.forEach((b, c) => {
        if (!this.attributes[c]) return void console.warn(`active attribute ${c} not being supplied`);
        let a = this.attributes[c];
        this.gl.bindBuffer(a.target, a.buffer), this.glState.boundBuffer = a.id, this.gl.vertexAttribPointer(b, a.size, a.type, a.normalize, 0, 0), this.gl.enableVertexAttribArray(b), this.gl.renderer.vertexAttribDivisor(b, a.divisor);
      }), this.attributes.index && this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.attributes.index.buffer);
    }

    draw({
      program: a,
      mode: b = this.gl.TRIANGLES
    }) {
      this.gl.renderer.currentGeometry !== `${this.id}_${a.attributeOrder}` && (this.VAOs[a.attributeOrder] || this.createVAO(a), this.gl.renderer.bindVertexArray(this.VAOs[a.attributeOrder]), this.gl.renderer.currentGeometry = `${this.id}_${a.attributeOrder}`), a.attributeLocations.forEach((c, b) => {
        let a = this.attributes[b];
        a.needsUpdate && this.updateAttribute(a);
      }), this.isInstanced ? this.attributes.index ? this.gl.renderer.drawElementsInstanced(b, this.drawRange.count, this.attributes.index.type, this.drawRange.start, this.instancedCount) : this.gl.renderer.drawArraysInstanced(b, this.drawRange.start, this.drawRange.count, this.instancedCount) : this.attributes.index ? this.gl.drawElements(b, this.drawRange.count, this.attributes.index.type, this.drawRange.start) : this.gl.drawArrays(b, this.drawRange.start, this.drawRange.count);
    }

    computeBoundingBox(d) {
      !d && this.attributes.position && (d = this.attributes.position.data), d || console.warn("No position buffer found to compute bounds"), this.bounds || (this.bounds = {
        min: new b(),
        max: new b(),
        center: new b(),
        scale: new b(),
        radius: 1 / 0
      });
      let a = this.bounds.min,
          c = this.bounds.max,
          i = this.bounds.center,
          j = this.bounds.scale;
      a.set(1 / 0), c.set(-1 / 0);

      for (let e = 0, k = d.length; e < k; e += 3) {
        let f = d[e],
            g = d[e + 1],
            h = d[e + 2];
        a.x = Math.min(f, a.x), a.y = Math.min(g, a.y), a.z = Math.min(h, a.z), c.x = Math.max(f, c.x), c.y = Math.max(g, c.y), c.z = Math.max(h, c.z);
      }

      j.sub(c, a), i.add(a, c).divide(2);
    }

    computeBoundingSphere(a) {
      !a && this.attributes.position && (a = this.attributes.position.data), a || console.warn("No position buffer found to compute bounds"), this.bounds || this.computeBoundingBox(a);
      let b = 0;

      for (let c = 0, d = a.length; c < d; c += 3) B.fromArray(a, c), b = Math.max(b, this.bounds.center.squaredDistance(B));

      this.bounds.radius = Math.sqrt(b);
    }

    remove() {
      for (let a in this.vao && this.gl.renderer.deleteVertexArray(this.vao), this.attributes) this.gl.deleteBuffer(this.attributes[a].buffer), delete this.attributes[a];
    }

  }

  let E = 0,
      F = {};

  class h {
    constructor(a, {
      vertex: f,
      fragment: g,
      uniforms: m = {},
      transparent: n = !1,
      cullFace: o = a.BACK,
      frontFace: p = a.CCW,
      depthTest: q = !0,
      depthWrite: r = !0,
      depthFunc: s = a.LESS
    } = {}) {
      this.gl = a, this.uniforms = m, this.id = E++, f || console.warn("vertex shader not supplied"), g || console.warn("fragment shader not supplied"), this.transparent = n, this.cullFace = o, this.frontFace = p, this.depthTest = q, this.depthWrite = r, this.depthFunc = s, this.blendFunc = {}, this.blendEquation = {}, this.transparent && !this.blendFunc.src && (this.gl.renderer.premultipliedAlpha ? this.setBlendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA) : this.setBlendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA));
      let d = a.createShader(a.VERTEX_SHADER);
      a.shaderSource(d, f), a.compileShader(d), "" !== a.getShaderInfoLog(d) && console.warn(`${a.getShaderInfoLog(d)}
Vertex Shader
${H(f)}`);
      let e = a.createShader(a.FRAGMENT_SHADER);
      if (a.shaderSource(e, g), a.compileShader(e), "" !== a.getShaderInfoLog(e) && console.warn(`${a.getShaderInfoLog(e)}
Fragment Shader
${H(g)}`), this.program = a.createProgram(), a.attachShader(this.program, d), a.attachShader(this.program, e), a.linkProgram(this.program), !a.getProgramParameter(this.program, a.LINK_STATUS)) return console.warn(a.getProgramInfoLog(this.program));
      a.deleteShader(d), a.deleteShader(e), this.uniformLocations = new Map();
      let t = a.getProgramParameter(this.program, a.ACTIVE_UNIFORMS);

      for (let h = 0; h < t; h++) {
        let b = a.getActiveUniform(this.program, h);
        this.uniformLocations.set(b, a.getUniformLocation(this.program, b.name));
        let c = b.name.match(/(\w+)/g);
        b.uniformName = c[0], 3 === c.length ? (b.isStructArray = !0, b.structIndex = Number(c[1]), b.structProperty = c[2]) : 2 === c.length && isNaN(Number(c[1])) && (b.isStruct = !0, b.structProperty = c[1]);
      }

      this.attributeLocations = new Map();
      let k = [],
          u = a.getProgramParameter(this.program, a.ACTIVE_ATTRIBUTES);

      for (let i = 0; i < u; i++) {
        let j = a.getActiveAttrib(this.program, i),
            l = a.getAttribLocation(this.program, j.name);
        k[l] = j.name, this.attributeLocations.set(j.name, l);
      }

      this.attributeOrder = k.join("");
    }

    setBlendFunc(a, b, c, d) {
      this.blendFunc.src = a, this.blendFunc.dst = b, this.blendFunc.srcAlpha = c, this.blendFunc.dstAlpha = d, a && (this.transparent = !0);
    }

    setBlendEquation(a, b) {
      this.blendEquation.modeRGB = a, this.blendEquation.modeAlpha = b;
    }

    applyState() {
      this.depthTest ? this.gl.renderer.enable(this.gl.DEPTH_TEST) : this.gl.renderer.disable(this.gl.DEPTH_TEST), this.cullFace ? this.gl.renderer.enable(this.gl.CULL_FACE) : this.gl.renderer.disable(this.gl.CULL_FACE), this.blendFunc.src ? this.gl.renderer.enable(this.gl.BLEND) : this.gl.renderer.disable(this.gl.BLEND), this.cullFace && this.gl.renderer.setCullFace(this.cullFace), this.gl.renderer.setFrontFace(this.frontFace), this.gl.renderer.setDepthMask(this.depthWrite), this.gl.renderer.setDepthFunc(this.depthFunc), this.blendFunc.src && this.gl.renderer.setBlendFunc(this.blendFunc.src, this.blendFunc.dst, this.blendFunc.srcAlpha, this.blendFunc.dstAlpha), this.blendEquation.modeRGB && this.gl.renderer.setBlendEquation(this.blendEquation.modeRGB, this.blendEquation.modeAlpha);
    }

    use({
      flipFaces: a = !1
    } = {}) {
      let b = -1;
      this.gl.renderer.currentProgram === this.id || (this.gl.useProgram(this.program), this.gl.renderer.currentProgram = this.id), this.uniformLocations.forEach((e, c) => {
        let d = c.uniformName,
            a = this.uniforms[d];
        if (c.isStruct && (a = a[c.structProperty], d += `.${c.structProperty}`), c.isStructArray && (a = a[c.structIndex][c.structProperty], d += `[${c.structIndex}].${c.structProperty}`), !a) return J(`Active uniform ${d} has not been supplied`);
        if (a && void 0 === a.value) return J(`${d} uniform is missing a value parameter`);
        if (a.value.texture) return b += 1, a.value.update(b), G(this.gl, c.type, e, b);

        if (a.value.length && a.value[0].texture) {
          let f = [];
          return a.value.forEach(a => {
            b += 1, a.update(b), f.push(b);
          }), G(this.gl, c.type, e, f);
        }

        G(this.gl, c.type, e, a.value);
      }), this.applyState(), a && this.gl.renderer.setFrontFace(this.frontFace === this.gl.CCW ? this.gl.CW : this.gl.CCW);
    }

    remove() {
      this.gl.deleteProgram(this.program);
    }

  }

  function G(b, e, c, a) {
    a = a.length ? function (a) {
      let f = a.length,
          d = a[0].length;
      if (void 0 === d) return a;
      let e = f * d,
          b = F[e];
      b || (F[e] = b = new Float32Array(e));

      for (let c = 0; c < f; c++) b.set(a[c], c * d);

      return b;
    }(a) : a;
    let d = b.renderer.state.uniformLocations.get(c);

    if (a.length) {
      if (void 0 === d) b.renderer.state.uniformLocations.set(c, a.slice(0));else {
        if (function (b, c) {
          if (b.length !== c.length) return !1;

          for (let a = 0, d = b.length; a < d; a++) if (b[a] !== c[a]) return !1;

          return !0;
        }(d, a)) return;
        d.set(a), b.renderer.state.uniformLocations.set(c, d);
      }
    } else {
      if (d === a) return;
      b.renderer.state.uniformLocations.set(c, a);
    }

    switch (e) {
      case 5126:
        return a.length ? b.uniform1fv(c, a) : b.uniform1f(c, a);

      case 35664:
        return b.uniform2fv(c, a);

      case 35665:
        return b.uniform3fv(c, a);

      case 35666:
        return b.uniform4fv(c, a);

      case 35670:
      case 5124:
      case 35678:
      case 35680:
        return a.length ? b.uniform1iv(c, a) : b.uniform1i(c, a);

      case 35671:
      case 35667:
        return b.uniform2iv(c, a);

      case 35672:
      case 35668:
        return b.uniform3iv(c, a);

      case 35673:
      case 35669:
        return b.uniform4iv(c, a);

      case 35674:
        return b.uniformMatrix2fv(c, !1, a);

      case 35675:
        return b.uniformMatrix3fv(c, !1, a);

      case 35676:
        return b.uniformMatrix4fv(c, !1, a);
    }
  }

  function H(c) {
    let b = c.split("\n");

    for (let a = 0; a < b.length; a++) b[a] = a + 1 + ": " + b[a];

    return b.join("\n");
  }

  let I = 0;

  function J(a) {
    I > 100 || (console.warn(a), ++I > 100 && console.warn("More than 100 program warnings - stopping logs."));
  }

  let K = new b();

  function i(a, b) {
    return a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = b[3], a;
  }

  function j(a, b, c, d, e) {
    return a[0] = b, a[1] = c, a[2] = d, a[3] = e, a;
  }

  function k(b, c) {
    let d = c[0],
        e = c[1],
        f = c[2],
        g = c[3],
        a = d * d + e * e + f * f + g * g;
    return a > 0 && (a = 1 / Math.sqrt(a)), b[0] = d * a, b[1] = e * a, b[2] = f * a, b[3] = g * a, b;
  }

  function L(a, b, c) {
    let d = b[0],
        e = b[1],
        f = b[2],
        g = b[3],
        h = c[0],
        i = c[1],
        j = c[2],
        k = c[3];
    return a[0] = d * k + g * h + e * j - f * i, a[1] = e * k + g * i + f * h - d * j, a[2] = f * k + g * j + d * i - e * h, a[3] = g * k - d * h - e * i - f * j, a;
  }

  let M = i,
      _ = j,
      N = k;

  class d extends Array {
    constructor(a = 0, b = 0, c = 0, d = 1) {
      return super(a, b, c, d), this.onChange = () => {}, this;
    }

    get x() {
      return this[0];
    }

    set x(a) {
      this[0] = a, this.onChange();
    }

    get y() {
      return this[1];
    }

    set y(a) {
      this[1] = a, this.onChange();
    }

    get z() {
      return this[2];
    }

    set z(a) {
      this[2] = a, this.onChange();
    }

    get w() {
      return this[3];
    }

    set w(a) {
      this[3] = a, this.onChange();
    }

    identity() {
      var a;
      return (a = this)[0] = 0, a[1] = 0, a[2] = 0, a[3] = 1, this.onChange(), this;
    }

    set(a, b, c, d) {
      return a.length ? this.copy(a) : (_(this, a, b, c, d), this.onChange(), this);
    }

    rotateX(j) {
      var a, b, e;
      let f, g, h, i, c, d;
      return a = this, b = this, e = j, e *= .5, f = b[0], g = b[1], h = b[2], i = b[3], c = Math.sin(e), d = Math.cos(e), a[0] = f * d + i * c, a[1] = g * d + h * c, a[2] = h * d - g * c, a[3] = i * d - f * c, this.onChange(), this;
    }

    rotateY(j) {
      var a, b, e;
      let f, g, h, i, c, d;
      return a = this, b = this, e = j, e *= .5, f = b[0], g = b[1], h = b[2], i = b[3], c = Math.sin(e), d = Math.cos(e), a[0] = f * d - h * c, a[1] = g * d + i * c, a[2] = h * d + f * c, a[3] = i * d - g * c, this.onChange(), this;
    }

    rotateZ(j) {
      var a, b, e;
      let f, g, h, i, c, d;
      return a = this, b = this, e = j, e *= .5, f = b[0], g = b[1], h = b[2], i = b[3], c = Math.sin(e), d = Math.cos(e), a[0] = f * d + g * c, a[1] = g * d - f * c, a[2] = h * d + i * c, a[3] = i * d - h * c, this.onChange(), this;
    }

    inverse(i = this) {
      var a, c;
      let d, e, f, g, h, b;
      return a = this, d = (c = i)[0], e = c[1], f = c[2], g = c[3], h = d * d + e * e + f * f + g * g, b = h ? 1 / h : 0, a[0] = -d * b, a[1] = -e * b, a[2] = -f * b, a[3] = g * b, this.onChange(), this;
    }

    conjugate(c = this) {
      var b, a;
      return a = c, (b = this)[0] = -a[0], b[1] = -a[1], b[2] = -a[2], b[3] = a[3], this.onChange(), this;
    }

    copy(a) {
      return M(this, a), this.onChange(), this;
    }

    normalize(a = this) {
      return N(this, a), this.onChange(), this;
    }

    multiply(a, b) {
      return b ? L(this, a, b) : L(this, this, a), this.onChange(), this;
    }

    dot(c) {
      var a, b;
      return a = this, b = c, a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    }

    fromMatrix3(a) {
      return function (d, a) {
        let b,
            g = a[0] + a[4] + a[8];
        if (g > 0) b = Math.sqrt(g + 1), d[3] = .5 * b, b = .5 / b, d[0] = (a[5] - a[7]) * b, d[1] = (a[6] - a[2]) * b, d[2] = (a[1] - a[3]) * b;else {
          let c = 0;
          a[4] > a[0] && (c = 1), a[8] > a[3 * c + c] && (c = 2);
          let e = (c + 1) % 3,
              f = (c + 2) % 3;
          b = Math.sqrt(a[3 * c + c] - a[3 * e + e] - a[3 * f + f] + 1), d[c] = .5 * b, b = .5 / b, d[3] = (a[3 * e + f] - a[3 * f + e]) * b, d[e] = (a[3 * e + c] + a[3 * c + e]) * b, d[f] = (a[3 * f + c] + a[3 * c + f]) * b;
        }
      }(this, a), this.onChange(), this;
    }

    fromEuler(a) {
      return function (a, h, i = "YXZ") {
        let b = Math.sin(.5 * h[0]),
            c = Math.cos(.5 * h[0]),
            d = Math.sin(.5 * h[1]),
            e = Math.cos(.5 * h[1]),
            f = Math.sin(.5 * h[2]),
            g = Math.cos(.5 * h[2]);
        "XYZ" === i ? (a[0] = b * e * g + c * d * f, a[1] = c * d * g - b * e * f, a[2] = c * e * f + b * d * g, a[3] = c * e * g - b * d * f) : "YXZ" === i ? (a[0] = b * e * g + c * d * f, a[1] = c * d * g - b * e * f, a[2] = c * e * f - b * d * g, a[3] = c * e * g + b * d * f) : "ZXY" === i ? (a[0] = b * e * g - c * d * f, a[1] = c * d * g + b * e * f, a[2] = c * e * f + b * d * g, a[3] = c * e * g - b * d * f) : "ZYX" === i ? (a[0] = b * e * g - c * d * f, a[1] = c * d * g + b * e * f, a[2] = c * e * f - b * d * g, a[3] = c * e * g + b * d * f) : "YZX" === i ? (a[0] = b * e * g + c * d * f, a[1] = c * d * g + b * e * f, a[2] = c * e * f - b * d * g, a[3] = c * e * g - b * d * f) : "XZY" === i && (a[0] = b * e * g - c * d * f, a[1] = c * d * g - b * e * f, a[2] = c * e * f + b * d * g, a[3] = c * e * g + b * d * f);
      }(this, a, a.order), this;
    }

    fromAxisAngle(e, f) {
      var a, b, d;
      let c;
      return a = this, b = e, d = f, c = Math.sin(d *= .5), a[0] = c * b[0], a[1] = c * b[1], a[2] = c * b[2], a[3] = Math.cos(d), this;
    }

    slerp(r, s) {
      var c, d, e, f;
      let l, g, m, a, b, n, o, p, q, h, i, j, k;
      return c = this, d = this, e = r, f = s, n = d[0], o = d[1], p = d[2], q = d[3], h = e[0], i = e[1], j = e[2], k = e[3], (g = n * h + o * i + p * j + q * k) < 0 && (g = -g, h = -h, i = -i, j = -j, k = -k), 1 - g > 1e-6 ? (l = Math.acos(g), m = Math.sin(l), a = Math.sin((1 - f) * l) / m, b = Math.sin(f * l) / m) : (a = 1 - f, b = f), c[0] = a * n + b * h, c[1] = a * o + b * i, c[2] = a * p + b * j, c[3] = a * q + b * k, this;
    }

    fromArray(a, b = 0) {
      return this[0] = a[b], this[1] = a[b + 1], this[2] = a[b + 2], this[3] = a[b + 3], this;
    }

    toArray(a = [], b = 0) {
      return a[b] = this[0], a[b + 1] = this[1], a[b + 2] = this[2], a[b + 3] = this[3], a;
    }

  }

  function O(e, f, g) {
    let h = f[0],
        i = f[1],
        j = f[2],
        k = f[3],
        l = f[4],
        m = f[5],
        n = f[6],
        o = f[7],
        p = f[8],
        q = f[9],
        r = f[10],
        s = f[11],
        t = f[12],
        u = f[13],
        v = f[14],
        w = f[15],
        a = g[0],
        b = g[1],
        c = g[2],
        d = g[3];
    return e[0] = a * h + b * l + c * p + d * t, e[1] = a * i + b * m + c * q + d * u, e[2] = a * j + b * n + c * r + d * v, e[3] = a * k + b * o + c * s + d * w, a = g[4], b = g[5], c = g[6], d = g[7], e[4] = a * h + b * l + c * p + d * t, e[5] = a * i + b * m + c * q + d * u, e[6] = a * j + b * n + c * r + d * v, e[7] = a * k + b * o + c * s + d * w, a = g[8], b = g[9], c = g[10], d = g[11], e[8] = a * h + b * l + c * p + d * t, e[9] = a * i + b * m + c * q + d * u, e[10] = a * j + b * n + c * r + d * v, e[11] = a * k + b * o + c * s + d * w, a = g[12], b = g[13], c = g[14], d = g[15], e[12] = a * h + b * l + c * p + d * t, e[13] = a * i + b * m + c * q + d * u, e[14] = a * j + b * n + c * r + d * v, e[15] = a * k + b * o + c * s + d * w, e;
  }

  class c extends Array {
    constructor(a = 1, b = 0, c = 0, d = 0, e = 0, f = 1, g = 0, h = 0, i = 0, j = 0, k = 1, l = 0, m = 0, n = 0, o = 0, p = 1) {
      return super(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p), this;
    }

    set x(a) {
      this[12] = a;
    }

    get x() {
      return this[12];
    }

    set y(a) {
      this[13] = a;
    }

    get y() {
      return this[13];
    }

    set z(a) {
      this[14] = a;
    }

    get z() {
      return this[14];
    }

    set w(a) {
      this[15] = a;
    }

    get w() {
      return this[15];
    }

    set(b, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G) {
      var a, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r;
      return b.length ? this.copy(b) : (a = this, c = b, d = s, e = t, f = u, g = v, h = w, i = x, j = y, k = z, l = A, m = B, n = C, o = D, p = E, q = F, r = G, a[0] = c, a[1] = d, a[2] = e, a[3] = f, a[4] = g, a[5] = h, a[6] = i, a[7] = j, a[8] = k, a[9] = l, a[10] = m, a[11] = n, a[12] = o, a[13] = p, a[14] = q, a[15] = r, this);
    }

    translate(s, t = this) {
      var b, a, f;
      let g, h, i, j, k, l, m, n, o, p, q, r, c, d, e;
      return b = this, a = t, c = (f = s)[0], d = f[1], e = f[2], a === b ? (b[12] = a[0] * c + a[4] * d + a[8] * e + a[12], b[13] = a[1] * c + a[5] * d + a[9] * e + a[13], b[14] = a[2] * c + a[6] * d + a[10] * e + a[14], b[15] = a[3] * c + a[7] * d + a[11] * e + a[15]) : (g = a[0], h = a[1], i = a[2], j = a[3], k = a[4], l = a[5], m = a[6], n = a[7], o = a[8], p = a[9], q = a[10], r = a[11], b[0] = g, b[1] = h, b[2] = i, b[3] = j, b[4] = k, b[5] = l, b[6] = m, b[7] = n, b[8] = o, b[9] = p, b[10] = q, b[11] = r, b[12] = g * c + k * d + o * e + a[12], b[13] = h * c + l * d + p * e + a[13], b[14] = i * c + m * d + q * e + a[14], b[15] = j * c + n * d + r * e + a[15]), this;
    }

    rotateX(n, o = this) {
      var a, b, m;
      let c, d, e, f, g, h, i, j, k, l;
      return a = this, b = o, c = Math.sin(m = n), d = Math.cos(m), e = b[4], f = b[5], g = b[6], h = b[7], i = b[8], j = b[9], k = b[10], l = b[11], b !== a && (a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = b[3], a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15]), a[4] = e * d + i * c, a[5] = f * d + j * c, a[6] = g * d + k * c, a[7] = h * d + l * c, a[8] = i * d - e * c, a[9] = j * d - f * c, a[10] = k * d - g * c, a[11] = l * d - h * c, this;
    }

    rotateY(n, o = this) {
      var a, b, m;
      let c, d, e, f, g, h, i, j, k, l;
      return a = this, b = o, c = Math.sin(m = n), d = Math.cos(m), e = b[0], f = b[1], g = b[2], h = b[3], i = b[8], j = b[9], k = b[10], l = b[11], b !== a && (a[4] = b[4], a[5] = b[5], a[6] = b[6], a[7] = b[7], a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15]), a[0] = e * d - i * c, a[1] = f * d - j * c, a[2] = g * d - k * c, a[3] = h * d - l * c, a[8] = e * c + i * d, a[9] = f * c + j * d, a[10] = g * c + k * d, a[11] = h * c + l * d, this;
    }

    rotateZ(n, o = this) {
      var a, b, m;
      let c, d, e, f, g, h, i, j, k, l;
      return a = this, b = o, c = Math.sin(m = n), d = Math.cos(m), e = b[0], f = b[1], g = b[2], h = b[3], i = b[4], j = b[5], k = b[6], l = b[7], b !== a && (a[8] = b[8], a[9] = b[9], a[10] = b[10], a[11] = b[11], a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15]), a[0] = e * d + i * c, a[1] = f * d + j * c, a[2] = g * d + k * c, a[3] = h * d + l * c, a[4] = i * d - e * c, a[5] = j * d - f * c, a[6] = k * d - g * c, a[7] = l * d - h * c, this;
    }

    scale(c, h = this) {
      var a, b, g;
      let d, e, f;
      return a = this, b = h, d = (g = "number" == typeof c ? [c, c, c] : c)[0], e = g[1], f = g[2], a[0] = b[0] * d, a[1] = b[1] * d, a[2] = b[2] * d, a[3] = b[3] * d, a[4] = b[4] * e, a[5] = b[5] * e, a[6] = b[6] * e, a[7] = b[7] * e, a[8] = b[8] * f, a[9] = b[9] * f, a[10] = b[10] * f, a[11] = b[11] * f, a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15], this;
    }

    multiply(a, b) {
      return b ? O(this, a, b) : O(this, this, a), this;
    }

    identity() {
      var a;
      return (a = this)[0] = 1, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = 1, a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[10] = 1, a[11] = 0, a[12] = 0, a[13] = 0, a[14] = 0, a[15] = 1, this;
    }

    copy(c) {
      var b, a;
      return a = c, (b = this)[0] = a[0], b[1] = a[1], b[2] = a[2], b[3] = a[3], b[4] = a[4], b[5] = a[5], b[6] = a[6], b[7] = a[7], b[8] = a[8], b[9] = a[9], b[10] = a[10], b[11] = a[11], b[12] = a[12], b[13] = a[13], b[14] = a[14], b[15] = a[15], this;
    }

    fromPerspective({
      fov: h,
      aspect: i,
      near: j,
      far: k
    } = {}) {
      var a, f, g, b, c;
      let d, e;
      return a = this, f = h, g = i, b = j, c = k, d = 1 / Math.tan(f / 2), e = 1 / (b - c), a[0] = d / g, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = d, a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[10] = (c + b) * e, a[11] = -1, a[12] = 0, a[13] = 0, a[14] = 2 * c * b * e, a[15] = 0, this;
    }

    fromOrthogonal({
      left: k,
      right: l,
      bottom: m,
      top: n,
      near: o,
      far: p
    }) {
      var a, b, c, d, e, f, g;
      let h, i, j;
      return a = this, b = k, c = l, d = m, e = n, f = o, g = p, h = 1 / (b - c), i = 1 / (d - e), j = 1 / (f - g), a[0] = -2 * h, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = -2 * i, a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[10] = 2 * j, a[11] = 0, a[12] = (b + c) * h, a[13] = (e + d) * i, a[14] = (g + f) * j, a[15] = 1, this;
    }

    fromQuaternion(s) {
      var a, e;
      let f, c, b, g, d, h, i, j, k, l, m, n, o, p, q, r;
      return a = this, f = (e = s)[0], c = e[1], b = e[2], g = e[3], d = f + f, h = c + c, i = b + b, j = f * d, k = c * d, l = c * h, m = b * d, n = b * h, o = b * i, p = g * d, q = g * h, r = g * i, a[0] = 1 - l - o, a[1] = k + r, a[2] = m - q, a[3] = 0, a[4] = k - r, a[5] = 1 - j - o, a[6] = n + p, a[7] = 0, a[8] = m + q, a[9] = n - p, a[10] = 1 - j - l, a[11] = 0, a[12] = 0, a[13] = 0, a[14] = 0, a[15] = 1, this;
    }

    setPosition(a) {
      return this.x = a[0], this.y = a[1], this.z = a[2], this;
    }

    inverse(E = this) {
      var b, c;

      let d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, _, C, D, a;

      return b = this, d = (c = E)[0], e = c[1], f = c[2], g = c[3], h = c[4], i = c[5], j = c[6], k = c[7], l = c[8], m = c[9], n = c[10], o = c[11], p = c[12], q = c[13], r = c[14], s = c[15], t = d * i - e * h, u = d * j - f * h, v = d * k - g * h, w = e * j - f * i, x = e * k - g * i, y = f * k - g * j, z = l * q - m * p, A = l * r - n * p, B = l * s - o * p, _ = m * r - n * q, C = m * s - o * q, D = n * s - o * r, a = t * D - u * C + v * _ + w * B - x * A + y * z, a && (a = 1 / a, b[0] = (i * D - j * C + k * _) * a, b[1] = (f * C - e * D - g * _) * a, b[2] = (q * y - r * x + s * w) * a, b[3] = (n * x - m * y - o * w) * a, b[4] = (j * B - h * D - k * A) * a, b[5] = (d * D - f * B + g * A) * a, b[6] = (r * v - p * y - s * u) * a, b[7] = (l * y - n * v + o * u) * a, b[8] = (h * C - i * B + k * z) * a, b[9] = (e * B - d * C - g * z) * a, b[10] = (p * x - q * v + s * t) * a, b[11] = (m * v - l * x - o * t) * a, b[12] = (i * A - h * _ - j * z) * a, b[13] = (d * _ - e * A + f * z) * a, b[14] = (q * u - p * w - r * t) * a, b[15] = (l * w - m * u + n * t) * a), this;
    }

    compose(x, y, z) {
      var a, c, f, g;
      let b, d, h, i, n, j, e, o, p, q, r, s, t, u, v, w, k, l, m;
      return a = this, c = x, f = y, g = z, b = c[0], d = c[1], h = c[2], i = c[3], n = b + b, j = d + d, e = h + h, o = b * n, p = b * j, q = b * e, r = d * j, s = d * e, t = h * e, u = i * n, v = i * j, w = i * e, k = g[0], l = g[1], m = g[2], a[0] = (1 - (r + t)) * k, a[1] = (p + w) * k, a[2] = (q - v) * k, a[3] = 0, a[4] = (p - w) * l, a[5] = (1 - (o + t)) * l, a[6] = (s + u) * l, a[7] = 0, a[8] = (q + v) * m, a[9] = (s - u) * m, a[10] = (1 - (o + r)) * m, a[11] = 0, a[12] = f[0], a[13] = f[1], a[14] = f[2], a[15] = 1, this;
    }

    getRotation(e) {
      var c, a;
      let d, b;
      return c = e, a = this, d = a[0] + a[5] + a[10], b = 0, d > 0 ? (b = 2 * Math.sqrt(d + 1), c[3] = .25 * b, c[0] = (a[6] - a[9]) / b, c[1] = (a[8] - a[2]) / b, c[2] = (a[1] - a[4]) / b) : a[0] > a[5] && a[0] > a[10] ? (b = 2 * Math.sqrt(1 + a[0] - a[5] - a[10]), c[3] = (a[6] - a[9]) / b, c[0] = .25 * b, c[1] = (a[1] + a[4]) / b, c[2] = (a[8] + a[2]) / b) : a[5] > a[10] ? (b = 2 * Math.sqrt(1 + a[5] - a[0] - a[10]), c[3] = (a[8] - a[2]) / b, c[0] = (a[1] + a[4]) / b, c[1] = .25 * b, c[2] = (a[6] + a[9]) / b) : (b = 2 * Math.sqrt(1 + a[10] - a[0] - a[5]), c[3] = (a[1] - a[4]) / b, c[0] = (a[8] + a[2]) / b, c[1] = (a[6] + a[9]) / b, c[2] = .25 * b), this;
    }

    getTranslation(c) {
      var b, a;
      return a = this, (b = c)[0] = a[12], b[1] = a[13], b[2] = a[14], this;
    }

    getScaling(l) {
      var b, a;
      let c, d, e, f, g, h, i, j, k;
      return b = l, a = this, c = a[0], d = a[1], e = a[2], f = a[4], g = a[5], h = a[6], i = a[8], j = a[9], k = a[10], b[0] = Math.sqrt(c * c + d * d + e * e), b[1] = Math.sqrt(f * f + g * g + h * h), b[2] = Math.sqrt(i * i + j * j + k * k), this;
    }

    getMaxScaleOnAxis() {
      var a;
      let b, c, d, e, f, g, h, i, j;
      return a = this, b = a[0], c = a[1], d = a[2], e = a[4], f = a[5], g = a[6], h = a[8], i = a[9], j = a[10], Math.sqrt(Math.max(b * b + c * c + d * d, e * e + f * f + g * g, h * h + i * i + j * j));
    }

    lookAt(r, s, t) {
      var a, i, j, k;
      let l, m, n, o, p, q, c, d, e, b, f, g, h;
      return a = this, i = r, j = s, k = t, l = i[0], m = i[1], n = i[2], o = k[0], p = k[1], q = k[2], c = l - j[0], d = m - j[1], e = n - j[2], b = c * c + d * d + e * e, b > 0 && (c *= b = 1 / Math.sqrt(b), d *= b, e *= b), f = p * e - q * d, g = q * c - o * e, h = o * d - p * c, (b = f * f + g * g + h * h) > 0 && (f *= b = 1 / Math.sqrt(b), g *= b, h *= b), a[0] = f, a[1] = g, a[2] = h, a[3] = 0, a[4] = d * h - e * g, a[5] = e * f - c * h, a[6] = c * g - d * f, a[7] = 0, a[8] = c, a[9] = d, a[10] = e, a[11] = 0, a[12] = l, a[13] = m, a[14] = n, a[15] = 1, this;
    }

    determinant() {
      var a;
      let b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q;
      return a = this, b = a[0], c = a[1], d = a[2], e = a[3], f = a[4], g = a[5], h = a[6], i = a[7], j = a[8], k = a[9], l = a[10], m = a[11], n = a[12], o = a[13], p = a[14], q = a[15], (b * g - c * f) * (l * q - m * p) - (b * h - d * f) * (k * q - m * o) + (b * i - e * f) * (k * p - l * o) + (c * h - d * g) * (j * q - m * n) - (c * i - e * g) * (j * p - l * n) + (d * i - e * h) * (j * o - k * n);
    }

  }

  let P = new c();

  class l extends Array {
    constructor(a = 0, b = a, c = a, d = "YXZ") {
      return super(a, b, c), this.order = d, this.onChange = () => {}, this;
    }

    get x() {
      return this[0];
    }

    set x(a) {
      this[0] = a, this.onChange();
    }

    get y() {
      return this[1];
    }

    set y(a) {
      this[1] = a, this.onChange();
    }

    get z() {
      return this[2];
    }

    set z(a) {
      this[2] = a, this.onChange();
    }

    set(a, b = a, c = a) {
      return a.length ? this.copy(a) : (this[0] = a, this[1] = b, this[2] = c, this.onChange(), this);
    }

    copy(a) {
      return this[0] = a[0], this[1] = a[1], this[2] = a[2], this;
    }

    reorder(a) {
      return this.order = a, this.onChange(), this;
    }

    fromRotationMatrix(a, b = this.order) {
      return function (b, a, c = "YXZ") {
        "XYZ" === c ? (b[1] = Math.asin(Math.min(Math.max(a[8], -1), 1)), .99999 > Math.abs(a[8]) ? (b[0] = Math.atan2(-a[9], a[10]), b[2] = Math.atan2(-a[4], a[0])) : (b[0] = Math.atan2(a[6], a[5]), b[2] = 0)) : "YXZ" === c ? (b[0] = Math.asin(-Math.min(Math.max(a[9], -1), 1)), .99999 > Math.abs(a[9]) ? (b[1] = Math.atan2(a[8], a[10]), b[2] = Math.atan2(a[1], a[5])) : (b[1] = Math.atan2(-a[2], a[0]), b[2] = 0)) : "ZXY" === c ? (b[0] = Math.asin(Math.min(Math.max(a[6], -1), 1)), .99999 > Math.abs(a[6]) ? (b[1] = Math.atan2(-a[2], a[10]), b[2] = Math.atan2(-a[4], a[5])) : (b[1] = 0, b[2] = Math.atan2(a[1], a[0]))) : "ZYX" === c ? (b[1] = Math.asin(-Math.min(Math.max(a[2], -1), 1)), .99999 > Math.abs(a[2]) ? (b[0] = Math.atan2(a[6], a[10]), b[2] = Math.atan2(a[1], a[0])) : (b[0] = 0, b[2] = Math.atan2(-a[4], a[5]))) : "YZX" === c ? (b[2] = Math.asin(Math.min(Math.max(a[1], -1), 1)), .99999 > Math.abs(a[1]) ? (b[0] = Math.atan2(-a[9], a[5]), b[1] = Math.atan2(-a[2], a[0])) : (b[0] = 0, b[1] = Math.atan2(a[8], a[10]))) : "XZY" === c && (b[2] = Math.asin(-Math.min(Math.max(a[4], -1), 1)), .99999 > Math.abs(a[4]) ? (b[0] = Math.atan2(a[6], a[5]), b[1] = Math.atan2(a[8], a[0])) : (b[0] = Math.atan2(-a[9], a[10]), b[1] = 0));
      }(this, a, b), this;
    }

    fromQuaternion(a, b = this.order) {
      return P.fromQuaternion(a), this.fromRotationMatrix(P, b);
    }

  }

  class g {
    constructor() {
      this.parent = null, this.children = [], this.visible = !0, this.matrix = new c(), this.worldMatrix = new c(), this.matrixAutoUpdate = !0, this.position = new b(), this.quaternion = new d(), this.scale = new b(1), this.rotation = new l(), this.up = new b(0, 1, 0), this.rotation.onChange = () => this.quaternion.fromEuler(this.rotation), this.quaternion.onChange = () => this.rotation.fromQuaternion(this.quaternion);
    }

    setParent(a, b = !0) {
      b && this.parent && a !== this.parent && this.parent.removeChild(this, !1), this.parent = a, b && a && a.addChild(this, !1);
    }

    addChild(a, b = !0) {
      ~this.children.indexOf(a) || this.children.push(a), b && a.setParent(this, !1);
    }

    removeChild(a, b = !0) {
      ~this.children.indexOf(a) && this.children.splice(this.children.indexOf(a), 1), b && a.setParent(null, !1);
    }

    updateMatrixWorld(a) {
      this.matrixAutoUpdate && this.updateMatrix(), (this.worldMatrixNeedsUpdate || a) && (null === this.parent ? this.worldMatrix.copy(this.matrix) : this.worldMatrix.multiply(this.parent.worldMatrix, this.matrix), this.worldMatrixNeedsUpdate = !1, a = !0);

      for (let b = 0, c = this.children.length; b < c; b++) this.children[b].updateMatrixWorld(a);
    }

    updateMatrix() {
      this.matrix.compose(this.quaternion, this.position, this.scale), this.worldMatrixNeedsUpdate = !0;
    }

    traverse(b) {
      if (!b(this)) for (let a = 0, c = this.children.length; a < c; a++) this.children[a].traverse(b);
    }

    decompose() {
      this.matrix.getTranslation(this.position), this.matrix.getRotation(this.quaternion), this.matrix.getScaling(this.scale), this.rotation.fromQuaternion(this.quaternion);
    }

    lookAt(a, b = !1) {
      b ? this.matrix.lookAt(this.position, a, this.up) : this.matrix.lookAt(a, this.position, this.up), this.matrix.getRotation(this.quaternion), this.rotation.fromQuaternion(this.quaternion);
    }

  }

  let Q = new c(),
      R = new b(),
      S = new b();

  function T(a, b, c) {
    let d = b[0],
        e = b[1],
        f = b[2],
        g = b[3],
        h = b[4],
        i = b[5],
        j = b[6],
        k = b[7],
        l = b[8],
        m = c[0],
        n = c[1],
        o = c[2],
        p = c[3],
        q = c[4],
        r = c[5],
        s = c[6],
        t = c[7],
        u = c[8];
    return a[0] = m * d + n * g + o * j, a[1] = m * e + n * h + o * k, a[2] = m * f + n * i + o * l, a[3] = p * d + q * g + r * j, a[4] = p * e + q * h + r * k, a[5] = p * f + q * i + r * l, a[6] = s * d + t * g + u * j, a[7] = s * e + t * h + u * k, a[8] = s * f + t * i + u * l, a;
  }

  class m extends Array {
    constructor(a = 1, b = 0, c = 0, d = 0, e = 1, f = 0, g = 0, h = 0, i = 1) {
      return super(a, b, c, d, e, f, g, h, i), this;
    }

    set(b, l, m, n, o, p, q, r, s) {
      var a, c, d, e, f, g, h, i, j, k;
      return b.length ? this.copy(b) : (a = this, c = b, d = l, e = m, f = n, g = o, h = p, i = q, j = r, k = s, a[0] = c, a[1] = d, a[2] = e, a[3] = f, a[4] = g, a[5] = h, a[6] = i, a[7] = j, a[8] = k, this);
    }

    translate(o, p = this) {
      var a, b, e;
      let f, g, h, i, j, k, l, m, n, c, d;
      return a = this, b = p, e = o, f = b[0], g = b[1], h = b[2], i = b[3], j = b[4], k = b[5], l = b[6], m = b[7], n = b[8], c = e[0], d = e[1], a[0] = f, a[1] = g, a[2] = h, a[3] = i, a[4] = j, a[5] = k, a[6] = c * f + d * i + l, a[7] = c * g + d * j + m, a[8] = c * h + d * k + n, this;
    }

    rotate(o, p = this) {
      var a, b, e;
      let f, g, h, i, j, k, l, m, n, c, d;
      return a = this, b = p, e = o, f = b[0], g = b[1], h = b[2], i = b[3], j = b[4], k = b[5], l = b[6], m = b[7], n = b[8], c = Math.sin(e), d = Math.cos(e), a[0] = d * f + c * i, a[1] = d * g + c * j, a[2] = d * h + c * k, a[3] = d * i - c * f, a[4] = d * j - c * g, a[5] = d * k - c * h, a[6] = l, a[7] = m, a[8] = n, this;
    }

    scale(f, g = this) {
      var a, b, e;
      let c, d;
      return a = this, b = g, c = (e = f)[0], d = e[1], a[0] = c * b[0], a[1] = c * b[1], a[2] = c * b[2], a[3] = d * b[3], a[4] = d * b[4], a[5] = d * b[5], a[6] = b[6], a[7] = b[7], a[8] = b[8], this;
    }

    multiply(a, b) {
      return b ? T(this, a, b) : T(this, this, a), this;
    }

    identity() {
      var a;
      return (a = this)[0] = 1, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 1, a[5] = 0, a[6] = 0, a[7] = 0, a[8] = 1, this;
    }

    copy(c) {
      var b, a;
      return a = c, (b = this)[0] = a[0], b[1] = a[1], b[2] = a[2], b[3] = a[3], b[4] = a[4], b[5] = a[5], b[6] = a[6], b[7] = a[7], b[8] = a[8], this;
    }

    fromMatrix4(c) {
      var b, a;
      return a = c, (b = this)[0] = a[0], b[1] = a[1], b[2] = a[2], b[3] = a[4], b[4] = a[5], b[5] = a[6], b[6] = a[8], b[7] = a[9], b[8] = a[10], this;
    }

    fromQuaternion(s) {
      var a, e;
      let f, c, b, g, d, h, i, j, k, l, m, n, o, p, q, r;
      return a = this, f = (e = s)[0], c = e[1], b = e[2], g = e[3], d = f + f, h = c + c, i = b + b, j = f * d, k = c * d, l = c * h, m = b * d, n = b * h, o = b * i, p = g * d, q = g * h, r = g * i, a[0] = 1 - l - o, a[3] = k - r, a[6] = m + q, a[1] = k + r, a[4] = 1 - j - o, a[7] = n - p, a[2] = m - q, a[5] = n + p, a[8] = 1 - j - l, this;
    }

    fromBasis(a, b, c) {
      return this.set(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]), this;
    }

    inverse(p = this) {
      var b, c;
      let d, e, f, g, h, i, j, k, l, m, n, o, a;
      return b = this, d = (c = p)[0], e = c[1], f = c[2], g = c[3], h = c[4], i = c[5], j = c[6], k = c[7], l = c[8], m = l * h - i * k, n = -l * g + i * j, o = k * g - h * j, a = d * m + e * n + f * o, a && (a = 1 / a, b[0] = m * a, b[1] = (-l * e + f * k) * a, b[2] = (i * e - f * h) * a, b[3] = n * a, b[4] = (l * d - f * j) * a, b[5] = (-i * d + f * g) * a, b[6] = o * a, b[7] = (-k * d + e * j) * a, b[8] = (h * d - e * g) * a), this;
    }

    getNormalMatrix(E) {
      var c, a;

      let g, h, i, d, j, k, l, e, s, t, u, v, m, n, o, f, B, C, w, D, x, y, z, A, p, _, q, r, b;

      return c = this, g = (a = E)[0], h = a[1], i = a[2], d = a[3], j = a[4], k = a[5], l = a[6], e = a[7], s = a[8], t = a[9], u = a[10], v = a[11], m = a[12], n = a[13], o = a[14], f = a[15], B = g * k - h * j, C = g * l - i * j, w = g * e - d * j, D = h * l - i * k, x = h * e - d * k, y = i * e - d * l, z = s * n - t * m, A = s * o - u * m, p = s * f - v * m, _ = t * o - u * n, q = t * f - v * n, r = u * f - v * o, b = B * r - C * q + w * _ + D * p - x * A + y * z, b && (b = 1 / b, c[0] = (k * r - l * q + e * _) * b, c[1] = (l * p - j * r - e * A) * b, c[2] = (j * q - k * p + e * z) * b, c[3] = (i * q - h * r - d * _) * b, c[4] = (g * r - i * p + d * A) * b, c[5] = (h * p - g * q - d * z) * b, c[6] = (n * y - o * x + f * D) * b, c[7] = (o * w - m * y - f * C) * b, c[8] = (m * x - n * w + f * B) * b), this;
    }

  }

  let U = 0;

  class n extends g {
    constructor(a, {
      geometry: b,
      program: d,
      mode: e = a.TRIANGLES,
      frustumCulled: f = !0,
      renderOrder: g = 0
    } = {}) {
      super(a), this.gl = a, this.id = U++, this.geometry = b, this.program = d, this.mode = e, this.frustumCulled = f, this.renderOrder = g, this.modelViewMatrix = new c(), this.normalMatrix = new m(), this.program.uniforms.modelMatrix || Object.assign(this.program.uniforms, {
        modelMatrix: {
          value: null
        },
        viewMatrix: {
          value: null
        },
        modelViewMatrix: {
          value: null
        },
        normalMatrix: {
          value: null
        },
        projectionMatrix: {
          value: null
        },
        cameraPosition: {
          value: null
        }
      });
    }

    draw({
      camera: a
    } = {}) {
      this.onBeforeRender && this.onBeforeRender({
        mesh: this,
        camera: a
      }), a && (this.program.uniforms.projectionMatrix.value = a.projectionMatrix, this.program.uniforms.cameraPosition.value = a.position, this.program.uniforms.viewMatrix.value = a.viewMatrix, this.modelViewMatrix.multiply(a.viewMatrix, this.worldMatrix), this.normalMatrix.getNormalMatrix(this.modelViewMatrix), this.program.uniforms.modelMatrix.value = this.worldMatrix, this.program.uniforms.modelViewMatrix.value = this.modelViewMatrix, this.program.uniforms.normalMatrix.value = this.normalMatrix);
      let b = this.program.cullFace && 0 > this.worldMatrix.determinant();
      this.program.use({
        flipFaces: b
      }), this.geometry.draw({
        mode: this.mode,
        program: this.program
      }), this.onAfterRender && this.onAfterRender({
        mesh: this,
        camera: a
      });
    }

  }

  let V = new Uint8Array(4);

  function W(a) {
    return 0 == (a & a - 1);
  }

  let X = 0;

  class o {
    constructor(a, {
      image: e,
      target: f = a.TEXTURE_2D,
      type: g = a.UNSIGNED_BYTE,
      format: b = a.RGBA,
      internalFormat: h = b,
      wrapS: i = a.CLAMP_TO_EDGE,
      wrapT: j = a.CLAMP_TO_EDGE,
      generateMipmaps: c = !0,
      minFilter: k = c ? a.NEAREST_MIPMAP_LINEAR : a.LINEAR,
      magFilter: l = a.LINEAR,
      premultiplyAlpha: m = !1,
      unpackAlignment: n = 4,
      flipY: o = !0,
      level: p = 0,
      width: d,
      height: q = d
    } = {}) {
      this.gl = a, this.id = X++, this.image = e, this.target = f, this.type = g, this.format = b, this.internalFormat = h, this.minFilter = k, this.magFilter = l, this.wrapS = i, this.wrapT = j, this.generateMipmaps = c, this.premultiplyAlpha = m, this.unpackAlignment = n, this.flipY = o, this.level = p, this.width = d, this.height = q, this.texture = this.gl.createTexture(), this.store = {
        image: null
      }, this.glState = this.gl.renderer.state, this.state = {}, this.state.minFilter = this.gl.NEAREST_MIPMAP_LINEAR, this.state.magFilter = this.gl.LINEAR, this.state.wrapS = this.gl.REPEAT, this.state.wrapT = this.gl.REPEAT;
    }

    bind() {
      this.glState.textureUnits[this.glState.activeTextureUnit] !== this.id && (this.gl.bindTexture(this.target, this.texture), this.glState.textureUnits[this.glState.activeTextureUnit] = this.id);
    }

    update(a = 0) {
      let b = !(this.image === this.store.image && !this.needsUpdate);
      (b || this.glState.textureUnits[a] !== this.id) && (this.gl.renderer.activeTexture(a), this.bind()), b && (this.needsUpdate = !1, this.flipY !== this.glState.flipY && (this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, this.flipY), this.glState.flipY = this.flipY), this.premultiplyAlpha !== this.glState.premultiplyAlpha && (this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha), this.glState.premultiplyAlpha = this.premultiplyAlpha), this.unpackAlignment !== this.glState.unpackAlignment && (this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, this.unpackAlignment), this.glState.unpackAlignment = this.unpackAlignment), this.minFilter !== this.state.minFilter && (this.gl.texParameteri(this.target, this.gl.TEXTURE_MIN_FILTER, this.minFilter), this.state.minFilter = this.minFilter), this.magFilter !== this.state.magFilter && (this.gl.texParameteri(this.target, this.gl.TEXTURE_MAG_FILTER, this.magFilter), this.state.magFilter = this.magFilter), this.wrapS !== this.state.wrapS && (this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_S, this.wrapS), this.state.wrapS = this.wrapS), this.wrapT !== this.state.wrapT && (this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_T, this.wrapT), this.state.wrapT = this.wrapT), this.image ? (this.image.width && (this.width = this.image.width, this.height = this.image.height), this.gl.renderer.isWebgl2 || ArrayBuffer.isView(this.image) ? this.gl.texImage2D(this.target, this.level, this.internalFormat, this.width, this.height, 0, this.format, this.type, this.image) : this.gl.texImage2D(this.target, this.level, this.internalFormat, this.format, this.type, this.image), this.generateMipmaps && (this.gl.renderer.isWebgl2 || W(this.image.width) && W(this.image.height) ? this.gl.generateMipmap(this.target) : (this.generateMipmaps = !1, this.wrapS = this.wrapT = this.gl.CLAMP_TO_EDGE, this.minFilter = this.gl.LINEAR))) : this.width ? this.gl.texImage2D(this.target, this.level, this.internalFormat, this.width, this.height, 0, this.format, this.type, null) : this.gl.texImage2D(this.target, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, V), this.store.image = this.image, this.onUpdate && this.onUpdate());
    }

  }

  class p {
    constructor(a, {
      width: b = a.canvas.width,
      height: c = a.canvas.height,
      target: k = a.FRAMEBUFFER,
      color: l = 1,
      depth: e = !0,
      stencil: f = !1,
      depthTexture: m = !1,
      wrapS: g = a.CLAMP_TO_EDGE,
      wrapT: h = a.CLAMP_TO_EDGE,
      minFilter: i = a.LINEAR,
      magFilter: n = i,
      type: p = a.UNSIGNED_BYTE,
      format: j = a.RGBA,
      internalFormat: q = j,
      unpackAlignment: r,
      premultiplyAlpha: s
    } = {}) {
      this.gl = a, this.width = b, this.height = c, this.buffer = this.gl.createFramebuffer(), this.target = k, this.gl.bindFramebuffer(this.target, this.buffer), this.textures = [];

      for (let d = 0; d < l; d++) this.textures.push(new o(a, {
        width: b,
        height: c,
        wrapS: g,
        wrapT: h,
        minFilter: i,
        magFilter: n,
        type: p,
        format: j,
        internalFormat: q,
        unpackAlignment: r,
        premultiplyAlpha: s,
        flipY: !1,
        generateMipmaps: !1
      })), this.textures[d].update(), this.gl.framebufferTexture2D(this.target, this.gl.COLOR_ATTACHMENT0 + d, this.gl.TEXTURE_2D, this.textures[d].texture, 0);

      this.texture = this.textures[0], m && (this.gl.renderer.isWebgl2 || this.gl.renderer.getExtension("WEBGL_depth_texture")) ? (this.depthTexture = new o(a, {
        width: b,
        height: c,
        wrapS: g,
        wrapT: h,
        minFilter: this.gl.NEAREST,
        magFilter: this.gl.NEAREST,
        flipY: !1,
        format: this.gl.DEPTH_COMPONENT,
        internalFormat: a.renderer.isWebgl2 ? this.gl.DEPTH_COMPONENT24 : this.gl.DEPTH_COMPONENT,
        type: this.gl.UNSIGNED_INT,
        generateMipmaps: !1
      }), this.depthTexture.update(), this.gl.framebufferTexture2D(this.target, this.gl.DEPTH_ATTACHMENT, this.gl.TEXTURE_2D, this.depthTexture.texture, 0)) : (e && !f && (this.depthBuffer = this.gl.createRenderbuffer(), this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthBuffer), this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, b, c), this.gl.framebufferRenderbuffer(this.target, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, this.depthBuffer)), f && !e && (this.stencilBuffer = this.gl.createRenderbuffer(), this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.stencilBuffer), this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.STENCIL_INDEX8, b, c), this.gl.framebufferRenderbuffer(this.target, this.gl.STENCIL_ATTACHMENT, this.gl.RENDERBUFFER, this.stencilBuffer)), e && f && (this.depthStencilBuffer = this.gl.createRenderbuffer(), this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthStencilBuffer), this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_STENCIL, b, c), this.gl.framebufferRenderbuffer(this.target, this.gl.DEPTH_STENCIL_ATTACHMENT, this.gl.RENDERBUFFER, this.depthStencilBuffer))), this.gl.bindFramebuffer(this.target, null);
    }

  }

  class q extends Array {
    constructor(a = 0, b = 0, c = 0) {
      return "string" == typeof a && ([a, b, c] = q.hexToRGB(a)), super(a, b, c), this;
    }

    get r() {
      return this[0];
    }

    set r(a) {
      this[0] = a;
    }

    get g() {
      return this[1];
    }

    set g(a) {
      this[1] = a;
    }

    get b() {
      return this[2];
    }

    set b(a) {
      this[2] = a;
    }

    set(a, b, c) {
      return "string" == typeof a && ([a, b, c] = q.hexToRGB(a)), a.length ? this.copy(a) : (this[0] = a, this[1] = b, this[2] = c, this);
    }

    copy(a) {
      return this[0] = a[0], this[1] = a[1], this[2] = a[2], this;
    }

    static hexToRGB(a) {
      4 === a.length && (a = a[0] + a[1] + a[1] + a[2] + a[2] + a[3] + a[3]);
      let b = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
      return b || console.warn(`Unable to convert hex string ${a} to rgb values`), [parseInt(b[1], 16) / 255, parseInt(b[2], 16) / 255, parseInt(b[3], 16) / 255];
    }

  }

  function Y(a, b, c) {
    return a[0] = b[0] + c[0], a[1] = b[1] + c[1], a;
  }

  function $(a, b, c) {
    return a[0] = b[0] - c[0], a[1] = b[1] - c[1], a;
  }

  function Z(a, b, c) {
    return a[0] = b[0] * c, a[1] = b[1] * c, a;
  }

  function aa(a) {
    var b = a[0],
        c = a[1];
    return Math.sqrt(b * b + c * c);
  }

  class e extends Array {
    constructor(a = 0, b = a) {
      return super(a, b), this;
    }

    get x() {
      return this[0];
    }

    set x(a) {
      this[0] = a;
    }

    get y() {
      return this[1];
    }

    set y(a) {
      this[1] = a;
    }

    set(a, e = a) {
      var b, c, d;
      return a.length ? this.copy(a) : (b = this, c = a, d = e, b[0] = c, b[1] = d, this);
    }

    copy(c) {
      var b, a;
      return a = c, (b = this)[0] = a[0], b[1] = a[1], this;
    }

    add(a, b) {
      return b ? Y(this, a, b) : Y(this, this, a), this;
    }

    sub(a, b) {
      return b ? $(this, a, b) : $(this, this, a), this;
    }

    multiply(a) {
      var d, b, c;
      return a.length ? (b = this, c = a, (d = this)[0] = b[0] * c[0], d[1] = b[1] * c[1]) : Z(this, this, a), this;
    }

    divide(a) {
      var d, b, c;
      return a.length ? (b = this, c = a, (d = this)[0] = b[0] / c[0], d[1] = b[1] / c[1]) : Z(this, this, 1 / a), this;
    }

    inverse(c = this) {
      var b, a;
      return a = c, (b = this)[0] = 1 / a[0], b[1] = 1 / a[1], this;
    }

    len() {
      return aa(this);
    }

    distance(d) {
      var a, e, b, c;
      return d ? (a = this, b = (e = d)[0] - a[0], c = e[1] - a[1], Math.sqrt(b * b + c * c)) : aa(this);
    }

    squaredLen() {
      return this.squaredDistance();
    }

    squaredDistance(g) {
      var a, h, b, c, d, e, f;
      return g ? (a = this, b = (h = g)[0] - a[0], c = h[1] - a[1], b * b + c * c) : (d = this, e = d[0], f = d[1], e * e + f * f);
    }

    negate(c = this) {
      var b, a;
      return a = c, (b = this)[0] = -a[0], b[1] = -a[1], this;
    }

    cross(c, d) {
      var b, a;
      return a = d, (b = c)[0] * a[1] - b[1] * a[0];
    }

    scale(a) {
      return Z(this, this, a), this;
    }

    normalize() {
      var c, b, d, e, a;
      return c = this, d = (b = this)[0], e = b[1], (a = d * d + e * e) > 0 && (a = 1 / Math.sqrt(a)), c[0] = b[0] * a, c[1] = b[1] * a, this;
    }

    dot(c) {
      var b, a;
      return a = c, (b = this)[0] * a[0] + b[1] * a[1];
    }

    equals(c) {
      var b, a;
      return a = c, (b = this)[0] === a[0] && b[1] === a[1];
    }

    applyMatrix3(f) {
      var b, e, a, c, d;
      return b = this, a = f, c = (e = this)[0], d = e[1], b[0] = a[0] * c + a[3] * d + a[6], b[1] = a[1] * c + a[4] * d + a[7], this;
    }

    applyMatrix4(f) {
      var b, c, a;
      let d, e;
      return b = this, c = this, a = f, d = c[0], e = c[1], b[0] = a[0] * d + a[4] * e + a[12], b[1] = a[1] * d + a[5] * e + a[13], this;
    }

    lerp(g, h) {
      var a, b, c, d, e, f;
      a = this, b = this, c = g, d = h, e = b[0], f = b[1], a[0] = e + d * (c[0] - e), a[1] = f + d * (c[1] - f);
    }

    clone() {
      return new e(this[0], this[1]);
    }

    fromArray(a, b = 0) {
      return this[0] = a[b], this[1] = a[b + 1], this;
    }

    toArray(a = [], b = 0) {
      return a[b] = this[0], a[b + 1] = this[1], a;
    }

  }

  class r extends f {
    constructor(j, {
      width: k = 1,
      height: l = 1,
      widthSegments: m = 1,
      heightSegments: n = 1,
      attributes: d = {}
    } = {}) {
      let b = m,
          c = n,
          a = (b + 1) * (c + 1),
          e = b * c * 6,
          f = new Float32Array(3 * a),
          g = new Float32Array(3 * a),
          h = new Float32Array(2 * a),
          i = a > 65536 ? new Uint32Array(e) : new Uint16Array(e);
      r.buildPlane(f, g, h, i, k, l, 0, b, c), Object.assign(d, {
        position: {
          size: 3,
          data: f
        },
        normal: {
          size: 3,
          data: g
        },
        uv: {
          size: 2,
          data: h
        },
        index: {
          data: i
        }
      }), super(j, d);
    }

    static buildPlane(i, j, k, f, l, m, n, d, g, o = 0, p = 1, q = 2, t = 1, u = -1, a = 0, e = 0) {
      let h = a,
          v = l / d,
          w = m / g;

      for (let b = 0; b <= g; b++) {
        let x = b * w - m / 2;

        for (let c = 0; c <= d; c++, a++) {
          let y = c * v - l / 2;
          if (i[3 * a + o] = y * t, i[3 * a + p] = x * u, i[3 * a + q] = n / 2, j[3 * a + o] = 0, j[3 * a + p] = 0, j[3 * a + q] = n >= 0 ? 1 : -1, k[2 * a] = c / d, k[2 * a + 1] = 1 - b / g, b === g || c === d) continue;
          let z = h + c + b * (d + 1),
              r = h + c + (b + 1) * (d + 1),
              A = h + c + (b + 1) * (d + 1) + 1,
              s = h + c + b * (d + 1) + 1;
          f[6 * e] = z, f[6 * e + 1] = r, f[6 * e + 2] = s, f[6 * e + 3] = r, f[6 * e + 4] = A, f[6 * e + 5] = s, e++;
        }
      }
    }

  }

  let ab = {
    NONE: -1,
    ROTATE: 0,
    DOLLY: 1,
    PAN: 2,
    DOLLY_PAN: 3
  },
      ac = new b(),
      ad = new e(),
      ae = new e(),
      af = new b(),
      ag = new b(),
      ah = new b(),
      ai = new c(),
      aj = new b(),
      ak = new d(),
      al = new b(),
      am = new b(),
      an = new d(),
      ao = new b();

  class s {
    constructor({
      objects: b,
      data: a
    }) {
      this.objects = b, this.data = a, this.elapsed = 0, this.weight = 1, this.duration = a.frames.length - 1;
    }

    update(c = 1, d) {
      let e = d ? 1 : this.weight / c,
          b = this.elapsed % this.duration,
          a = Math.floor(b),
          f = b - a,
          g = this.data.frames[a],
          h = this.data.frames[(a + 1) % this.duration];
      this.objects.forEach((b, a) => {
        aj.fromArray(g.position, 3 * a), ak.fromArray(g.quaternion, 4 * a), al.fromArray(g.scale, 3 * a), am.fromArray(h.position, 3 * a), an.fromArray(h.quaternion, 4 * a), ao.fromArray(h.scale, 3 * a), aj.lerp(am, f), ak.slerp(an, f), al.lerp(ao, f), b.position.lerp(aj, e), b.quaternion.slerp(ak, e), b.scale.lerp(al, e);
      });
    }

  }

  let ap = new c();
  return a.Animation = s, a.Box = class extends f {
    constructor(p, {
      width: h = 1,
      height: i = 1,
      depth: j = 1,
      widthSegments: q = 1,
      heightSegments: s = 1,
      depthSegments: t = 1,
      attributes: n = {}
    } = {}) {
      let c = q,
          a = s,
          b = t,
          m = (c + 1) * (a + 1) * 2 + (c + 1) * (b + 1) * 2 + (a + 1) * (b + 1) * 2,
          o = 6 * (c * a * 2 + c * b * 2 + a * b * 2),
          d = new Float32Array(3 * m),
          e = new Float32Array(3 * m),
          f = new Float32Array(2 * m),
          g = m > 65536 ? new Uint32Array(o) : new Uint16Array(o),
          k = 0,
          l = 0;
      r.buildPlane(d, e, f, g, j, i, h, b, a, 2, 1, 0, -1, -1, k, l), r.buildPlane(d, e, f, g, j, i, -h, b, a, 2, 1, 0, 1, -1, k += (b + 1) * (a + 1), l += b * a), r.buildPlane(d, e, f, g, h, j, i, b, a, 0, 2, 1, 1, 1, k += (b + 1) * (a + 1), l += b * a), r.buildPlane(d, e, f, g, h, j, -i, b, a, 0, 2, 1, 1, -1, k += (c + 1) * (b + 1), l += c * b), r.buildPlane(d, e, f, g, h, i, -j, c, a, 0, 1, 2, -1, -1, k += (c + 1) * (b + 1), l += c * b), r.buildPlane(d, e, f, g, h, i, j, c, a, 0, 1, 2, 1, -1, k += (c + 1) * (a + 1), l += c * a), Object.assign(n, {
        position: {
          size: 3,
          data: d
        },
        normal: {
          size: 3,
          data: e
        },
        uv: {
          size: 2,
          data: f
        },
        index: {
          data: g
        }
      }), super(p, n);
    }

  }, a.Camera = class extends g {
    constructor(d, {
      near: e = .1,
      far: f = 100,
      fov: g = 45,
      aspect: h = 1,
      left: a,
      right: b,
      bottom: i,
      top: j
    } = {}) {
      super(d), this.near = e, this.far = f, this.fov = g, this.aspect = h, this.projectionMatrix = new c(), this.viewMatrix = new c(), this.projectionViewMatrix = new c(), a || b ? this.orthographic({
        left: a,
        right: b,
        bottom: i,
        top: j
      }) : this.perspective();
    }

    perspective({
      near: a = this.near,
      far: b = this.far,
      fov: c = this.fov,
      aspect: d = this.aspect
    } = {}) {
      return this.projectionMatrix.fromPerspective({
        fov: c * (Math.PI / 180),
        aspect: d,
        near: a,
        far: b
      }), this.type = "perspective", this;
    }

    orthographic({
      near: a = this.near,
      far: b = this.far,
      left: c = -1,
      right: d = 1,
      bottom: e = -1,
      top: f = 1
    } = {}) {
      return this.projectionMatrix.fromOrthogonal({
        left: c,
        right: d,
        bottom: e,
        top: f,
        near: a,
        far: b
      }), this.type = "orthographic", this;
    }

    updateMatrixWorld() {
      return super.updateMatrixWorld(), this.viewMatrix.inverse(this.worldMatrix), this.projectionViewMatrix.multiply(this.projectionMatrix, this.viewMatrix), this;
    }

    lookAt(a) {
      return super.lookAt(a, !0), this;
    }

    project(a) {
      return a.applyMatrix4(this.viewMatrix), a.applyMatrix4(this.projectionMatrix), this;
    }

    unproject(a) {
      return a.applyMatrix4(Q.inverse(this.projectionMatrix)), a.applyMatrix4(this.worldMatrix), this;
    }

    updateFrustum() {
      this.frustum || (this.frustum = [new b(), new b(), new b(), new b(), new b(), new b()]);
      let a = this.projectionViewMatrix;
      this.frustum[0].set(a[3] - a[0], a[7] - a[4], a[11] - a[8]).constant = a[15] - a[12], this.frustum[1].set(a[3] + a[0], a[7] + a[4], a[11] + a[8]).constant = a[15] + a[12], this.frustum[2].set(a[3] + a[1], a[7] + a[5], a[11] + a[9]).constant = a[15] + a[13], this.frustum[3].set(a[3] - a[1], a[7] - a[5], a[11] - a[9]).constant = a[15] - a[13], this.frustum[4].set(a[3] - a[2], a[7] - a[6], a[11] - a[10]).constant = a[15] - a[14], this.frustum[5].set(a[3] + a[2], a[7] + a[6], a[11] + a[10]).constant = a[15] + a[14];

      for (let c = 0; c < 6; c++) {
        let d = 1 / this.frustum[c].distance();
        this.frustum[c].multiply(d), this.frustum[c].constant *= d;
      }
    }

    frustumIntersectsMesh(a) {
      if (!a.geometry.attributes.position) return !0;
      a.geometry.bounds && a.geometry.bounds.radius !== 1 / 0 || a.geometry.computeBoundingSphere();
      let b = R;
      b.copy(a.geometry.bounds.center), b.applyMatrix4(a.worldMatrix);
      let c = a.geometry.bounds.radius * a.worldMatrix.getMaxScaleOnAxis();
      return this.frustumIntersectsSphere(b, c);
    }

    frustumIntersectsSphere(c, d) {
      let e = S;

      for (let a = 0; a < 6; a++) {
        let b = this.frustum[a];
        if (e.copy(b).dot(c) + b.constant < -d) return !1;
      }

      return !0;
    }

  }, a.Color = q, a.Cylinder = class extends f {
    constructor(A, {
      radius: w = .5,
      height: r = 1,
      radialSegments: s = 16,
      heightSegments: t = 1,
      attributes: x = {}
    } = {}) {
      let u = s,
          o = t,
          q = (s + 1) * (t + 1) + 2,
          y = s * (2 + 2 * t) * 3,
          h = new Float32Array(3 * q),
          i = new Float32Array(3 * q),
          n = new Float32Array(2 * q),
          d = q > 65536 ? new Uint32Array(y) : new Uint16Array(y),
          k,
          l,
          m,
          a = 0,
          e = new b();
      k = 0, l = -0.5 * r, m = 0, h[3 * a + 0] = k, h[3 * a + 1] = l, h[3 * a + 2] = m, e.set(k, l, m).normalize(), i[3 * a] = e.x, i[3 * a + 1] = e.y, i[3 * a + 2] = e.z, n[2 * a] = 0, n[2 * a + 1] = 1;
      let B = a;
      k = 0, l = .5 * r, m = 0, h[3 * ++a + 0] = k, h[3 * a + 1] = l, h[3 * a + 2] = m, e.set(k, l, m).normalize(), i[3 * a] = e.x, i[3 * a + 1] = e.y, i[3 * a + 2] = e.z, n[2 * a] = 0, n[2 * a + 1] = 0;
      let C = a;
      a++;

      for (var f = 0; f < u + 1; f++) {
        let v = f / u;

        for (var g = 0; g < o + 1; g++) {
          let z = g / o;
          k = Math.cos(v * Math.PI * 2) * w, l = (z - .5) * r, m = Math.sin(v * Math.PI * 2) * w, h[3 * a + 0] = k, h[3 * a + 1] = l, h[3 * a + 2] = m, e.set(k, l, m).normalize(), i[3 * a] = e.x, i[3 * a + 1] = e.y, i[3 * a + 2] = e.z, n[2 * a] = v, n[2 * a + 1] = 1 - z, a++;
        }
      }

      let c = 0,
          j = o + 1;

      for (f = 0; f < u; f++) {
        let p = f + 1;

        for (d[3 * c + 0] = B, d[3 * c + 1] = 2 + f * j, d[3 * c + 2] = 2 + p * j, c++, g = 0; g < o; g++) d[3 * c + 0] = 2 + f * j + (g + 0), d[3 * c + 1] = 2 + f * j + (g + 1), d[3 * c + 2] = 2 + p * j + (g + 0), d[3 * ++c + 0] = 2 + p * j + (g + 0), d[3 * c + 1] = 2 + f * j + (g + 1), d[3 * c + 2] = 2 + p * j + (g + 1), c++;

        d[3 * c + 0] = 2 + p * j + o, d[3 * c + 1] = 2 + f * j + o, d[3 * c + 2] = C, c++;
      }

      Object.assign(x, {
        position: {
          size: 3,
          data: h
        },
        normal: {
          size: 3,
          data: i
        },
        uv: {
          size: 2,
          data: n
        },
        index: {
          data: d
        }
      }), super(A, x);
    }

  }, a.Euler = l, a.Flowmap = class {
    constructor(a, {
      size: i = 512,
      falloff: c = .3,
      alpha: d = 1,
      dissipation: g = .96
    } = {}) {
      let b = this;
      this.gl = a, this.uniform = {
        value: null
      }, this.mask = {
        read: null,
        write: null,

        swap() {
          let a = b.mask.read;
          b.mask.read = b.mask.write, b.mask.write = a, b.uniform.value = b.mask.read.texture;
        }

      }, function () {
        let d = a.renderer.extensions[`OES_texture_${a.renderer.isWebgl2 ? "" : "half_"}float_linear`],
            c = {
          width: i,
          height: i,
          type: a.renderer.isWebgl2 ? a.HALF_FLOAT : a.renderer.extensions.OES_texture_half_float ? a.renderer.extensions.OES_texture_half_float.HALF_FLOAT_OES : a.UNSIGNED_BYTE,
          format: a.RGBA,
          internalFormat: a.renderer.isWebgl2 ? a.RGBA16F : a.RGBA,
          minFilter: d ? a.LINEAR : a.NEAREST,
          depth: !1
        };
        b.mask.read = new p(a, c), b.mask.write = new p(a, c), b.mask.swap();
      }(), this.aspect = 1, this.mouse = new e(), this.velocity = new e(), this.mesh = new n(a, {
        geometry: new f(a, {
          position: {
            size: 2,
            data: new Float32Array([-1, -1, 3, -1, -1, 3])
          },
          uv: {
            size: 2,
            data: new Float32Array([0, 0, 2, 0, 0, 2])
          }
        }),
        program: new h(a, {
          vertex: "\n    attribute vec2 uv;\n    attribute vec2 position;\n\n    varying vec2 vUv;\n\n    void main() {\n        vUv = uv;\n        gl_Position = vec4(position, 0, 1);\n    }\n",
          fragment: "\n    precision highp float;\n\n    uniform sampler2D tMap;\n\n    uniform float uFalloff;\n    uniform float uAlpha;\n    uniform float uDissipation;\n\n    uniform float uAspect;\n    uniform vec2 uMouse;\n    uniform vec2 uVelocity;\n\n    varying vec2 vUv;\n\n    void main() {\n\n      vec2 cursor = vUv - uMouse;\n\n        vec4 color = texture2D(tMap, vUv) * uDissipation;\n\n        cursor.x *= uAspect;\n\n        vec3 stamp = vec3(uVelocity * vec2(1, -1), 1.0 - pow(1.0 - min(1.0, length(uVelocity)), 3.0));\n        float falloff = smoothstep(uFalloff, 0.0, length(cursor)) * uAlpha;\n\n        color.rgb = mix(color.rgb, stamp, vec3(falloff));\n\n        gl_FragColor = color;\n    }\n",
          uniforms: {
            tMap: b.uniform,
            uFalloff: {
              value: .5 * c
            },
            uAlpha: {
              value: d
            },
            uDissipation: {
              value: g
            },
            uAspect: {
              value: 1
            },
            uMouse: {
              value: b.mouse
            },
            uVelocity: {
              value: b.velocity
            }
          },
          depthTest: !1
        })
      });
    }

    update() {
      this.mesh.program.uniforms.uAspect.value = this.aspect, this.gl.renderer.render({
        scene: this.mesh,
        target: this.mask.write,
        clear: !1
      }), this.mask.swap();
    }

  }, a.GPGPU = class {
    constructor(a, {
      data: d = new Float32Array(16),
      geometry: e = new f(a, {
        position: {
          size: 2,
          data: new Float32Array([-1, -1, 3, -1, -1, 3])
        },
        uv: {
          size: 2,
          data: new Float32Array([0, 0, 2, 0, 0, 2])
        }
      })
    }) {
      this.gl = a;
      let g = d;
      this.passes = [], this.geometry = e, this.dataLength = g.length / 4, this.size = Math.pow(2, Math.ceil(Math.log(Math.ceil(Math.sqrt(this.dataLength))) / Math.LN2)), this.coords = new Float32Array(2 * this.dataLength);

      for (let b = 0; b < this.dataLength; b++) {
        let h = b % this.size / this.size,
            i = Math.floor(b / this.size) / this.size;
        this.coords.set([h, i], 2 * b);
      }

      let j = (() => {
        if (g.length === this.size * this.size * 4) return g;
        {
          let a = new Float32Array(this.size * this.size * 4);
          return a.set(g), a;
        }
      })();

      this.uniform = {
        value: new o(a, {
          image: j,
          target: a.TEXTURE_2D,
          type: a.FLOAT,
          format: a.RGBA,
          internalFormat: a.renderer.isWebgl2 ? a.RGBA32F : a.RGBA,
          wrapS: a.CLAMP_TO_EDGE,
          wrapT: a.CLAMP_TO_EDGE,
          generateMipmaps: !1,
          minFilter: a.NEAREST,
          magFilter: a.NEAREST,
          width: this.size,
          flipY: !1
        })
      };
      let c = {
        width: this.size,
        height: this.size,
        type: a.renderer.isWebgl2 ? a.HALF_FLOAT : a.renderer.extensions.OES_texture_half_float ? a.renderer.extensions.OES_texture_half_float.HALF_FLOAT_OES : a.UNSIGNED_BYTE,
        format: a.RGBA,
        internalFormat: a.renderer.isWebgl2 ? a.RGBA16F : a.RGBA,
        minFilter: a.NEAREST,
        depth: !1,
        unpackAlignment: 1
      };
      this.fbo = {
        read: new p(a, c),
        write: new p(a, c),
        swap: () => {
          let a = this.fbo.read;
          this.fbo.read = this.fbo.write, this.fbo.write = a, this.uniform.value = this.fbo.read.texture;
        }
      };
    }

    addPass({
      vertex: e = "\n    attribute vec2 uv;\n    attribute vec2 position;\n\n    varying vec2 vUv;\n\n    void main() {\n        vUv = uv;\n        gl_Position = vec4(position, 0, 1);\n    }\n",
      fragment: f = "\n    precision highp float;\n\n    uniform sampler2D tMap;\n    varying vec2 vUv;\n\n    void main() {\n        gl_FragColor = texture2D(tMap, vUv);\n    }\n",
      uniforms: a = {},
      textureUniform: b = "tMap",
      enabled: g = !0
    } = {}) {
      a[b] = this.uniform;
      let c = new h(this.gl, {
        vertex: e,
        fragment: f,
        uniforms: a
      }),
          d = {
        mesh: new n(this.gl, {
          geometry: this.geometry,
          program: c
        }),
        program: c,
        uniforms: a,
        enabled: g,
        textureUniform: b
      };
      return this.passes.push(d), d;
    }

    render() {
      this.passes.filter(a => a.enabled).forEach((a, b) => {
        this.gl.renderer.render({
          scene: a.mesh,
          target: this.fbo.write,
          clear: !1
        }), this.fbo.swap();
      });
    }

  }, a.Geometry = f, a.Mat3 = m, a.Mat4 = c, a.Mesh = n, a.NormalProgram = function (a) {
    return new h(a, {
      vertex: "\nprecision highp float;\nprecision highp int;\n\nattribute vec3 position;\nattribute vec3 normal;\n\nuniform mat3 normalMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\n\nvarying vec3 vNormal;\n\nvoid main() {\n    vNormal = normalize(normalMatrix * normal);\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",
      fragment: "\nprecision highp float;\nprecision highp int;\n\nvarying vec3 vNormal;\n\nvoid main() {\n    gl_FragColor.rgb = normalize(vNormal);\n    gl_FragColor.a = 1.0;\n}\n"
    });
  }, a.Orbit = function (i, {
    element: a = document,
    enabled: j = !0,
    target: k = new b(),
    ease: g = .25,
    inertia: h = .85,
    enableRotate: t = !0,
    rotateSpeed: u = .1,
    enableZoom: v = !0,
    zoomSpeed: w = 1,
    enablePan: x = !0,
    panSpeed: y = .1,
    minPolarAngle: z = 0,
    maxPolarAngle: A = Math.PI,
    minAzimuthAngle: B = -1 / 0,
    maxAzimuthAngle: C = 1 / 0,
    minDistance: l = 0,
    maxDistance: m = 1 / 0
  } = {}) {
    this.enabled = j, this.target = k, g = g || 1, h = h || 1, this.minDistance = l, this.maxDistance = m;
    let D = {
      radius: 1,
      phi: 0,
      theta: 0
    },
        d = {
      radius: 1,
      phi: 0,
      theta: 0
    },
        f = {
      radius: 1,
      phi: 0,
      theta: 0
    },
        E = new b(),
        c = new b();
    c.copy(i.position).sub(this.target), f.radius = d.radius = c.distance(), f.theta = d.theta = Math.atan2(c.x, c.z), f.phi = d.phi = Math.acos(Math.min(Math.max(c.y / d.radius, -1), 1)), this.update = () => {
      d.radius *= D.radius, d.theta += D.theta, d.phi += D.phi, d.theta = Math.max(B, Math.min(C, d.theta)), d.phi = Math.max(z, Math.min(A, d.phi)), d.radius = Math.max(this.minDistance, Math.min(this.maxDistance, d.radius)), f.phi += (d.phi - f.phi) * g, f.theta += (d.theta - f.theta) * g, f.radius += (d.radius - f.radius) * g, this.target.add(E);
      let a = f.radius * Math.sin(Math.max(1e-6, f.phi));
      c.x = a * Math.sin(f.theta), c.y = f.radius * Math.cos(f.phi), c.z = a * Math.cos(f.theta), i.position.copy(this.target).add(c), i.lookAt(this.target), D.theta *= h, D.phi *= h, E.multiply(h), D.radius = 1;
    };
    let F = new e(),
        G = new e(),
        H = new e(),
        _ = ab.NONE;

    function I() {
      return Math.pow(.95, w);
    }

    this.mouseButtons = {
      ORBIT: 0,
      ZOOM: 1,
      PAN: 2
    };

    let J = (h, j) => {
      var d, b, e, c;
      let f = a === document ? document.body : a;
      ac.copy(i.position).sub(this.target);
      let g = ac.distance();
      d = 2 * h * (g *= Math.tan((i.fov || 45) / 2 * Math.PI / 180)) / f.clientHeight, b = i.matrix, ac.set(b[0], b[1], b[2]), ac.multiply(-d), E.add(ac), e = 2 * j * g / f.clientHeight, c = i.matrix, ac.set(c[4], c[5], c[6]), ac.multiply(e), E.add(ac);
    };

    function K(a) {
      D.radius /= a;
    }

    function L(c, d) {
      ad.set(c, d), ae.sub(ad, F).multiply(u);
      let b = a === document ? document.body : a;
      D.theta -= 2 * Math.PI * ae.x / b.clientHeight, D.phi -= 2 * Math.PI * ae.y / b.clientHeight, F.copy(ad);
    }

    function M(a, b) {
      ad.set(a, b), ae.sub(ad, G).multiply(y), J(ae.x, ae.y), G.copy(ad);
    }

    let n = a => {
      if (this.enabled) {
        switch (a.button) {
          case this.mouseButtons.ORBIT:
            if (!1 === t) return;
            F.set(a.clientX, a.clientY), _ = ab.ROTATE;
            break;

          case this.mouseButtons.ZOOM:
            if (!1 === v) return;
            H.set(a.clientX, a.clientY), _ = ab.DOLLY;
            break;

          case this.mouseButtons.PAN:
            if (!1 === x) return;
            G.set(a.clientX, a.clientY), _ = ab.PAN;
        }

        _ !== ab.NONE && (window.addEventListener("mousemove", N, !1), window.addEventListener("mouseup", O, !1));
      }
    },
        N = a => {
      if (this.enabled) switch (_) {
        case ab.ROTATE:
          if (!1 === t) return;
          L(a.clientX, a.clientY);
          break;

        case ab.DOLLY:
          var b;
          if (!1 === v) return;
          b = a, ad.set(b.clientX, b.clientY), ae.sub(ad, H), ae.y > 0 ? K(I()) : ae.y < 0 && K(1 / I()), H.copy(ad);
          break;

        case ab.PAN:
          if (!1 === x) return;
          M(a.clientX, a.clientY);
      }
    },
        O = () => {
      this.enabled && (document.removeEventListener("mousemove", N, !1), document.removeEventListener("mouseup", O, !1), _ = ab.NONE);
    },
        o = a => {
      this.enabled && v && (_ === ab.NONE || _ === ab.ROTATE) && (a.stopPropagation(), a.deltaY < 0 ? K(1 / I()) : a.deltaY > 0 && K(I()));
    },
        p = a => {
      if (this.enabled) switch (a.preventDefault(), a.touches.length) {
        case 1:
          if (!1 === t) return;
          F.set(a.touches[0].pageX, a.touches[0].pageY), _ = ab.ROTATE;
          break;

        case 2:
          if (!1 === v && !1 === x) return;
          (function (a) {
            if (v) {
              let b = a.touches[0].pageX - a.touches[1].pageX,
                  c = a.touches[0].pageY - a.touches[1].pageY,
                  d = Math.sqrt(b * b + c * c);
              H.set(0, d);
            }

            if (x) {
              let e = .5 * (a.touches[0].pageX + a.touches[1].pageX),
                  f = .5 * (a.touches[0].pageY + a.touches[1].pageY);
              G.set(e, f);
            }
          })(a), _ = ab.DOLLY_PAN;
          break;

        default:
          _ = ab.NONE;
      }
    },
        q = a => {
      if (this.enabled) switch (a.preventDefault(), a.stopPropagation(), a.touches.length) {
        case 1:
          if (!1 === t) return;
          L(a.touches[0].pageX, a.touches[0].pageY);
          break;

        case 2:
          if (!1 === v && !1 === x) return;
          !function (a) {
            if (v) {
              let b = a.touches[0].pageX - a.touches[1].pageX,
                  c = a.touches[0].pageY - a.touches[1].pageY,
                  d = Math.sqrt(b * b + c * c);
              ad.set(0, d), ae.set(0, Math.pow(ad.y / H.y, w)), K(ae.y), H.copy(ad);
            }

            x && M(.5 * (a.touches[0].pageX + a.touches[1].pageX), .5 * (a.touches[0].pageY + a.touches[1].pageY));
          }(a);
          break;

        default:
          _ = ab.NONE;
      }
    },
        r = () => {
      this.enabled && (_ = ab.NONE);
    },
        s = a => {
      this.enabled && a.preventDefault();
    };

    this.remove = function () {
      a.removeEventListener("contextmenu", s, !1), a.removeEventListener("mousedown", n, !1), window.removeEventListener("wheel", o, !1), a.removeEventListener("touchstart", p, !1), a.removeEventListener("touchend", r, !1), a.removeEventListener("touchmove", q, !1), window.removeEventListener("mousemove", N, !1), window.removeEventListener("mouseup", O, !1);
    }, a.addEventListener("contextmenu", s, !1), a.addEventListener("mousedown", n, !1), window.addEventListener("wheel", o, !1), a.addEventListener("touchstart", p, {
      passive: !1
    }), a.addEventListener("touchend", r, !1), a.addEventListener("touchmove", q, {
      passive: !1
    });
  }, a.Plane = r, a.Post = class {
    constructor(a, {
      width: b,
      height: c,
      dpr: d,
      wrapS: e = a.CLAMP_TO_EDGE,
      wrapT: g = a.CLAMP_TO_EDGE,
      minFilter: h = a.LINEAR,
      magFilter: i = a.LINEAR,
      geometry: j = new f(a, {
        position: {
          size: 2,
          data: new Float32Array([-1, -1, 3, -1, -1, 3])
        },
        uv: {
          size: 2,
          data: new Float32Array([0, 0, 2, 0, 0, 2])
        }
      })
    } = {}) {
      this.gl = a, this.options = {
        wrapS: e,
        wrapT: g,
        minFilter: h,
        magFilter: i
      }, this.passes = [], this.geometry = j;
      let k = this.fbo = {
        read: null,
        write: null,

        swap() {
          let a = k.read;
          k.read = k.write, k.write = a;
        }

      };
      this.resize({
        width: b,
        height: c,
        dpr: d
      });
    }

    addPass({
      vertex: e = "\n    attribute vec2 uv;\n    attribute vec2 position;\n\n    varying vec2 vUv;\n\n    void main() {\n        vUv = uv;\n        gl_Position = vec4(position, 0, 1);\n    }\n",
      fragment: f = "\n    precision highp float;\n\n    uniform sampler2D tMap;\n    varying vec2 vUv;\n\n    void main() {\n        gl_FragColor = texture2D(tMap, vUv);\n    }\n",
      uniforms: a = {},
      textureUniform: b = "tMap",
      enabled: g = !0
    } = {}) {
      a[b] = {
        value: this.fbo.read.texture
      };
      let c = new h(this.gl, {
        vertex: e,
        fragment: f,
        uniforms: a
      }),
          d = {
        mesh: new n(this.gl, {
          geometry: this.geometry,
          program: c
        }),
        program: c,
        uniforms: a,
        enabled: g,
        textureUniform: b
      };
      return this.passes.push(d), d;
    }

    resize({
      width: a,
      height: c,
      dpr: b
    } = {}) {
      b && (this.dpr = b), a && (this.width = a, this.height = c || a), b = this.dpr || this.gl.renderer.dpr, a = (this.width || this.gl.renderer.width) * b, c = (this.height || this.gl.renderer.height) * b, this.options.width = a, this.options.height = c, this.fbo.read = new p(this.gl, this.options), this.fbo.write = new p(this.gl, this.options);
    }

    render({
      scene: b,
      camera: c,
      target: d = null,
      update: e = !0,
      sort: f = !0,
      frustumCull: g = !0
    }) {
      let a = this.passes.filter(a => a.enabled);
      this.gl.renderer.render({
        scene: b,
        camera: c,
        target: a.length ? this.fbo.write : d,
        update: e,
        sort: f,
        frustumCull: g
      }), this.fbo.swap(), a.forEach((b, c) => {
        b.mesh.program.uniforms[b.textureUniform].value = this.fbo.read.texture, this.gl.renderer.render({
          scene: b.mesh,
          target: c === a.length - 1 ? d : this.fbo.write,
          clear: !1
        }), this.fbo.swap();
      });
    }

  }, a.Program = h, a.Quat = d, a.Raycast = class {
    constructor(a) {
      this.gl = a, this.origin = new b(), this.direction = new b();
    }

    castMouse(a, b = [0, 0]) {
      a.worldMatrix.getTranslation(this.origin), this.direction.set(b[0], b[1], .5), a.unproject(this.direction), this.direction.sub(this.origin).normalize();
    }

    intersectBounds(a) {
      Array.isArray(a) || (a = [a]);
      let d = ai,
          e = af,
          f = ag,
          c = [];
      return a.forEach(a => {
        a.geometry.bounds || a.geometry.computeBoundingBox(), "sphere" === a.geometry.raycast && a.geometry.bounds === 1 / 0 && a.geometry.computeBoundingSphere(), d.inverse(a.worldMatrix), e.copy(this.origin).applyMatrix4(d), f.copy(this.direction).transformDirection(d);
        let g = 0;
        (g = "sphere" === a.geometry.raycast ? this.intersectSphere(a.geometry.bounds, e, f) : this.intersectBox(a.geometry.bounds, e, f)) && (a.hit || (a.hit = {
          localPoint: new b()
        }), a.hit.distance = g, a.hit.localPoint.copy(f).multiply(g).add(e), c.push(a));
      }), c.sort((a, b) => a.hit.distance - b.hit.distance), c;
    }

    intersectSphere(c, i = this.origin, j = this.direction) {
      let a = ah;
      a.sub(c.center, i);
      let b = a.dot(j),
          e = a.dot(a) - b * b,
          f = c.radius * c.radius;
      if (e > f) return 0;
      let g = Math.sqrt(f - e),
          d = b - g,
          h = b + g;
      return d < 0 && h < 0 ? 0 : d < 0 ? h : d;
    }

    intersectBox(n, c = this.origin, k = this.direction) {
      let a,
          b,
          f,
          l,
          g,
          m,
          h = 1 / k.x,
          i = 1 / k.y,
          j = 1 / k.z,
          d = n.min,
          e = n.max;
      return a = ((h >= 0 ? d.x : e.x) - c.x) * h, b = ((h >= 0 ? e.x : d.x) - c.x) * h, f = ((i >= 0 ? d.y : e.y) - c.y) * i, a > (l = ((i >= 0 ? e.y : d.y) - c.y) * i) || f > b ? 0 : (f > a && (a = f), l < b && (b = l), g = ((j >= 0 ? d.z : e.z) - c.z) * j, a > (m = ((j >= 0 ? e.z : d.z) - c.z) * j) || g > b ? 0 : (g > a && (a = g), m < b && (b = m), b < 0 ? 0 : a >= 0 ? a : b));
    }

  }, a.RenderTarget = p, a.Renderer = class {
    constructor({
      canvas: a = document.createElement("canvas"),
      width: g = 300,
      height: h = 150,
      dpr: i = 1,
      alpha: c = !1,
      depth: d = !0,
      stencil: e = !1,
      antialias: j = !1,
      premultipliedAlpha: f = !1,
      preserveDrawingBuffer: k = !1,
      powerPreference: l = "default",
      autoClear: m = !0,
      webgl: n = 2
    } = {}) {
      let b = {
        alpha: c,
        depth: d,
        stencil: e,
        antialias: j,
        premultipliedAlpha: f,
        preserveDrawingBuffer: k,
        powerPreference: l
      };
      this.dpr = i, this.alpha = c, this.color = !0, this.depth = d, this.stencil = e, this.premultipliedAlpha = f, this.autoClear = m, 2 === n && (this.gl = a.getContext("webgl2", b)), this.isWebgl2 = !!this.gl, this.gl || (this.gl = a.getContext("webgl", b) || a.getContext("experimental-webgl", b)), this.gl.renderer = this, this.setSize(g, h), this.parameters = {}, this.parameters.maxTextureUnits = this.gl.getParameter(this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS), this.state = {}, this.state.blendFunc = {
        src: this.gl.ONE,
        dst: this.gl.ZERO
      }, this.state.blendEquation = {
        modeRGB: this.gl.FUNC_ADD
      }, this.state.cullFace = null, this.state.frontFace = this.gl.CCW, this.state.depthMask = !0, this.state.depthFunc = this.gl.LESS, this.state.premultiplyAlpha = !1, this.state.flipY = !1, this.state.unpackAlignment = 4, this.state.framebuffer = null, this.state.viewport = {
        width: null,
        height: null
      }, this.state.textureUnits = [], this.state.activeTextureUnit = 0, this.state.boundBuffer = null, this.state.uniformLocations = new Map(), this.extensions = {}, this.isWebgl2 ? (this.getExtension("EXT_color_buffer_float"), this.getExtension("OES_texture_float_linear")) : (this.getExtension("OES_texture_float"), this.getExtension("OES_texture_float_linear"), this.getExtension("OES_texture_half_float"), this.getExtension("OES_texture_half_float_linear"), this.getExtension("OES_element_index_uint"), this.getExtension("OES_standard_derivatives"), this.getExtension("EXT_sRGB"), this.getExtension("WEBGL_depth_texture")), this.vertexAttribDivisor = this.getExtension("ANGLE_instanced_arrays", "vertexAttribDivisor", "vertexAttribDivisorANGLE"), this.drawArraysInstanced = this.getExtension("ANGLE_instanced_arrays", "drawArraysInstanced", "drawArraysInstancedANGLE"), this.drawElementsInstanced = this.getExtension("ANGLE_instanced_arrays", "drawElementsInstanced", "drawElementsInstancedANGLE"), this.createVertexArray = this.getExtension("OES_vertex_array_object", "createVertexArray", "createVertexArrayOES"), this.bindVertexArray = this.getExtension("OES_vertex_array_object", "bindVertexArray", "bindVertexArrayOES"), this.deleteVertexArray = this.getExtension("OES_vertex_array_object", "deleteVertexArray", "deleteVertexArrayOES");
    }

    setSize(a, b) {
      this.width = a, this.height = b, this.gl.canvas.width = a * this.dpr, this.gl.canvas.height = b * this.dpr, Object.assign(this.gl.canvas.style, {
        width: a + "px",
        height: b + "px"
      });
    }

    setViewport(a, b) {
      this.state.viewport.width === a && this.state.viewport.height === b || (this.state.viewport.width = a, this.state.viewport.height = b, this.gl.viewport(0, 0, a, b));
    }

    enable(a) {
      !0 !== this.state[a] && (this.gl.enable(a), this.state[a] = !0);
    }

    disable(a) {
      !1 !== this.state[a] && (this.gl.disable(a), this.state[a] = !1);
    }

    setBlendFunc(a, b, c, d) {
      this.state.blendFunc.src === a && this.state.blendFunc.dst === b && this.state.blendFunc.srcAlpha === c && this.state.blendFunc.dstAlpha === d || (this.state.blendFunc.src = a, this.state.blendFunc.dst = b, this.state.blendFunc.srcAlpha = c, this.state.blendFunc.dstAlpha = d, void 0 !== c ? this.gl.blendFuncSeparate(a, b, c, d) : this.gl.blendFunc(a, b));
    }

    setBlendEquation(a, b) {
      this.state.blendEquation.modeRGB === a && this.state.blendEquation.modeAlpha === b || (this.state.blendEquation.modeRGB = a, this.state.blendEquation.modeAlpha = b, void 0 !== b ? this.gl.blendEquationSeparate(a, b) : this.gl.blendEquation(a));
    }

    setCullFace(a) {
      this.state.cullFace !== a && (this.state.cullFace = a, this.gl.cullFace(a));
    }

    setFrontFace(a) {
      this.state.frontFace !== a && (this.state.frontFace = a, this.gl.frontFace(a));
    }

    setDepthMask(a) {
      this.state.depthMask !== a && (this.state.depthMask = a, this.gl.depthMask(a));
    }

    setDepthFunc(a) {
      this.state.depthFunc !== a && (this.state.depthFunc = a, this.gl.depthFunc(a));
    }

    activeTexture(a) {
      this.state.activeTextureUnit !== a && (this.state.activeTextureUnit = a, this.gl.activeTexture(this.gl.TEXTURE0 + a));
    }

    bindFramebuffer({
      target: b = this.gl.FRAMEBUFFER,
      buffer: a = null
    } = {}) {
      this.state.framebuffer !== a && (this.state.framebuffer = a, this.gl.bindFramebuffer(b, a));
    }

    getExtension(a, b, c) {
      return b && this.gl[b] ? this.gl[b].bind(this.gl) : (this.extensions[a] || (this.extensions[a] = this.gl.getExtension(a)), b ? this.extensions[a][c].bind(this.extensions[a]) : this.extensions[a]);
    }

    sortOpaque(a, b) {
      return a.renderOrder !== b.renderOrder ? a.renderOrder - b.renderOrder : a.program.id !== b.program.id ? a.program.id - b.program.id : a.zDepth !== b.zDepth ? a.zDepth - b.zDepth : b.id - a.id;
    }

    sortTransparent(a, b) {
      return a.renderOrder !== b.renderOrder ? a.renderOrder - b.renderOrder : a.zDepth !== b.zDepth ? b.zDepth - a.zDepth : b.id - a.id;
    }

    sortUI(a, b) {
      return a.renderOrder !== b.renderOrder ? a.renderOrder - b.renderOrder : a.program.id !== b.program.id ? a.program.id - b.program.id : b.id - a.id;
    }

    getRenderList({
      scene: f,
      camera: b,
      frustumCull: g,
      sort: h
    }) {
      let a = [];

      if (b && g && b.updateFrustum(), f.traverse(c => {
        if (!c.visible) return !0;
        c.draw && (g && c.frustumCulled && b && !b.frustumIntersectsMesh(c) || a.push(c));
      }), h) {
        let c = [],
            d = [],
            e = [];
        a.forEach(a => {
          a.program.transparent ? a.program.depthTest ? d.push(a) : e.push(a) : c.push(a), a.zDepth = 0, 0 === a.renderOrder && a.program.depthTest && b && (a.worldMatrix.getTranslation(K), K.applyMatrix4(b.projectionViewMatrix), a.zDepth = K.z);
        }), c.sort(this.sortOpaque), d.sort(this.sortTransparent), e.sort(this.sortUI), a = c.concat(d, e);
      }

      return a;
    }

    render({
      scene: c,
      camera: b,
      target: a = null,
      update: e = !0,
      sort: f = !0,
      frustumCull: g = !0,
      clear: d
    }) {
      null === a ? (this.bindFramebuffer(), this.setViewport(this.width * this.dpr, this.height * this.dpr)) : (this.bindFramebuffer(a), this.setViewport(a.width, a.height)), (d || this.autoClear && !1 !== d) && (!this.depth || a && a.depth || (this.enable(this.gl.DEPTH_TEST), this.setDepthMask(!0)), this.gl.clear((this.color ? this.gl.COLOR_BUFFER_BIT : 0) | (this.depth ? this.gl.DEPTH_BUFFER_BIT : 0) | (this.stencil ? this.gl.STENCIL_BUFFER_BIT : 0))), e && c.updateMatrixWorld(), b && null === b.parent && b.updateMatrixWorld(), this.getRenderList({
        scene: c,
        camera: b,
        frustumCull: g,
        sort: f
      }).forEach(a => {
        a.draw({
          camera: b
        });
      });
    }

  }, a.Skin = class extends n {
    constructor(a, {
      rig: b,
      geometry: c,
      program: d,
      mode: e = a.TRIANGLES
    } = {}) {
      super(a, {
        geometry: c,
        program: d,
        mode: e
      }), this.createBones(b), this.createBoneTexture(), this.animations = [], Object.assign(this.program.uniforms, {
        boneTexture: {
          value: this.boneTexture
        },
        boneTextureSize: {
          value: this.boneTextureSize
        }
      });
    }

    createBones(a) {
      if (this.root = new g(), this.bones = [], a.bones && a.bones.length) {
        for (let b = 0; b < a.bones.length; b++) {
          let d = new g();
          d.position.fromArray(a.bindPose.position, 3 * b), d.quaternion.fromArray(a.bindPose.quaternion, 4 * b), d.scale.fromArray(a.bindPose.scale, 3 * b), this.bones.push(d);
        }

        a.bones.forEach((a, b) => {
          if (this.bones[b].name = a.name, -1 === a.parent) return this.bones[b].setParent(this.root);
          this.bones[b].setParent(this.bones[a.parent]);
        }), this.root.updateMatrixWorld(!0), this.bones.forEach(a => {
          a.bindInverse = new c(...a.worldMatrix).inverse();
        });
      }
    }

    createBoneTexture() {
      if (!this.bones.length) return;
      let a = Math.max(4, Math.pow(2, Math.ceil(Math.log(Math.sqrt(4 * this.bones.length)) / Math.LN2)));
      this.boneMatrices = new Float32Array(a * a * 4), this.boneTextureSize = a, this.boneTexture = new o(this.gl, {
        image: this.boneMatrices,
        generateMipmaps: !1,
        type: this.gl.FLOAT,
        internalFormat: this.gl.renderer.isWebgl2 ? this.gl.RGBA16F : this.gl.RGBA,
        flipY: !1,
        width: a
      });
    }

    addAnimation(b) {
      let a = new s({
        objects: this.bones,
        data: b
      });
      return this.animations.push(a), a;
    }

    update() {
      let a = 0;
      this.animations.forEach(b => a += b.weight), this.animations.forEach((b, c) => {
        b.update(a, 0 === c);
      });
    }

    draw({
      camera: a
    } = {}) {
      this.root.updateMatrixWorld(!0), this.bones.forEach((a, b) => {
        ap.multiply(a.worldMatrix, a.bindInverse), this.boneMatrices.set(ap, 16 * b);
      }), this.boneTexture && (this.boneTexture.needsUpdate = !0), super.draw({
        camera: a
      });
    }

  }, a.Sphere = class extends f {
    constructor(F, {
      radius: p = .5,
      widthSegments: u = 16,
      heightSegments: G = Math.ceil(.5 * u),
      phiStart: H = 0,
      phiLength: I = 2 * Math.PI,
      thetaStart: J = 0,
      thetaLength: K = Math.PI,
      attributes: v = {}
    } = {}) {
      let h = u,
          f = G,
          w = H,
          x = I,
          i = J,
          k = K,
          l = (h + 1) * (f + 1),
          y = h * f * 6,
          m = new Float32Array(3 * l),
          n = new Float32Array(3 * l),
          q = new Float32Array(2 * l),
          e = l > 65536 ? new Uint32Array(y) : new Uint16Array(y),
          a = 0,
          L = 0,
          c = 0,
          M = i + k,
          j = [],
          _ = new b();

      for (let r = 0; r <= f; r++) {
        let z = [],
            o = r / f;

        for (let s = 0; s <= h; s++, a++) {
          let t = s / h,
              A = -p * Math.cos(w + t * x) * Math.sin(i + o * k),
              B = p * Math.cos(i + o * k),
              C = p * Math.sin(w + t * x) * Math.sin(i + o * k);
          m[3 * a] = A, m[3 * a + 1] = B, m[3 * a + 2] = C, _.set(A, B, C).normalize(), n[3 * a] = _.x, n[3 * a + 1] = _.y, n[3 * a + 2] = _.z, q[2 * a] = t, q[2 * a + 1] = 1 - o, z.push(L++);
        }

        j.push(z);
      }

      for (let d = 0; d < f; d++) for (let g = 0; g < h; g++) {
        let N = j[d][g + 1],
            D = j[d][g],
            O = j[d + 1][g],
            E = j[d + 1][g + 1];
        (0 !== d || i > 0) && (e[3 * c] = N, e[3 * c + 1] = D, e[3 * c + 2] = E, c++), (d !== f - 1 || M < Math.PI) && (e[3 * c] = D, e[3 * c + 1] = O, e[3 * c + 2] = E, c++);
      }

      Object.assign(v, {
        position: {
          size: 3,
          data: m
        },
        normal: {
          size: 3,
          data: n
        },
        uv: {
          size: 2,
          data: q
        },
        index: {
          data: e
        }
      }), super(F, v);
    }

  }, a.Text = function ({
    font: a,
    text: d,
    width: e = 1 / 0,
    align: f = "left",
    size: g = 1,
    letterSpacing: h = 0,
    lineHeight: i = 1.4,
    wordSpacing: j = 0,
    wordBreak: k = !1
  }) {
    let l = this,
        b,
        m,
        n,
        o,
        p,
        q = /\n/,
        r = /\s/;

    function c() {
      n = a.common.lineHeight, o = a.common.base, p = g / o;
      let c = d.replace(/[ \n]/g, "").length;
      m = {
        position: new Float32Array(4 * c * 3),
        uv: new Float32Array(4 * c * 2),
        id: new Float32Array(4 * c),
        index: new Uint16Array(6 * c)
      };

      for (let b = 0; b < c; b++) m.id[b] = b, m.index.set([4 * b, 4 * b + 2, 4 * b + 1, 4 * b + 1, 4 * b + 2, 4 * b + 3], 6 * b);

      s();
    }

    function s() {
      let y = [],
          n = 0,
          u = 0,
          o = 0,
          c = w();

      function w() {
        let a = {
          width: 0,
          glyphs: []
        };
        return y.push(a), u = n, o = 0, a;
      }

      let z = 0;

      for (; n < d.length && z < 100;) {
        z++;
        let v = d[n];

        if (!c.width && r.test(v)) {
          u = ++n, o = 0;
          continue;
        }

        if (q.test(v)) {
          n++, c = w();
          continue;
        }

        let x = b[v];

        if (c.glyphs.length) {
          let C = c.glyphs[c.glyphs.length - 1][0],
              A = t(x.id, C.id) * p;
          c.width += A, o += A;
        }

        c.glyphs.push([x, c.width]);
        let s = 0;

        if (r.test(v) ? (u = n, o = 0, s += j * g) : s += h * g, s += x.xadvance * p, c.width += s, o += s, c.width > e) {
          if (k && c.glyphs.length > 1) {
            c.width -= s, c.glyphs.pop(), c = w();
            continue;
          }

          if (!k && o !== c.width) {
            let B = n - u + 1;
            c.glyphs.splice(-B, B), n = u, c.width -= o, c = w();
            continue;
          }
        }

        n++;
      }

      c.width || y.pop(), function (n) {
        let s = a.common.scaleW,
            t = a.common.scaleH,
            c = .07 * g,
            o = 0;

        for (let q = 0; q < n.length; q++) {
          let e = n[q];

          for (let h = 0; h < e.glyphs.length; h++) {
            let b = e.glyphs[h][0],
                d = e.glyphs[h][1];
            if ("center" === f ? d -= .5 * e.width : "right" === f && (d -= e.width), r.test(b.char)) continue;
            d += b.xoffset * p, c -= b.yoffset * p;
            let u = b.width * p,
                v = b.height * p;
            m.position.set([d, c - v, 0, d, c, 0, d + u, c - v, 0, d + u, c, 0], 4 * o * 3);
            let j = b.x / s,
                w = b.width / s,
                k = 1 - b.y / t,
                x = b.height / t;
            m.uv.set([j, k - x, j, k, j + w, k - x, j + w, k], 4 * o * 2), c += b.yoffset * p, o++;
          }

          c -= g * i;
        }

        l.buffers = m, l.numLines = n.length, l.height = l.numLines * g * i;
      }(y);
    }

    function t(c, e) {
      for (let d = 0; d < a.kernings.length; d++) {
        let b = a.kernings[d];
        if (!(b.first < c || b.second < e)) return b.first > c ? 0 : b.first === c && b.second > e ? 0 : b.amount;
      }

      return 0;
    }

    b = {}, a.chars.forEach(a => b[a.char] = a), c(), this.resize = function (a) {
      ({
        width: e
      } = a), s();
    }, this.update = function (a) {
      ({
        text: d
      } = a), c();
    };
  }, a.Texture = o, a.Transform = g, a.Vec2 = e, a.Vec3 = b, a.Vec4 = class extends Array {
    constructor(a = 0, b = a, c = a, d = a) {
      return super(a, b, c, d), this;
    }

    get x() {
      return this[0];
    }

    set x(a) {
      this[0] = a;
    }

    get y() {
      return this[1];
    }

    set y(a) {
      this[1] = a;
    }

    get z() {
      return this[2];
    }

    set z(a) {
      this[2] = a;
    }

    get w() {
      return this[3];
    }

    set w(a) {
      this[3] = a;
    }

    set(a, b, c, d) {
      return a.length ? this.copy(a) : (j(this, a, b, c, d), this);
    }

    copy(a) {
      return i(this, a), this;
    }

    normalize() {
      return k(this, this), this;
    }

    fromArray(a, b = 0) {
      return this[0] = a[b], this[1] = a[b + 1], this[2] = a[b + 2], this[3] = a[b + 3], this;
    }

    toArray(a = [], b = 0) {
      return a[b] = this[0], a[b + 1] = this[1], a[b + 2] = this[2], a[b + 3] = this[3], a;
    }

  }, a;
}({});

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./node_modules/html-entities/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/html-entities/lib/index.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var named_references_1 = __webpack_require__(/*! ./named-references */ "./node_modules/html-entities/lib/named-references.js");
var numeric_unicode_map_1 = __webpack_require__(/*! ./numeric-unicode-map */ "./node_modules/html-entities/lib/numeric-unicode-map.js");
var surrogate_pairs_1 = __webpack_require__(/*! ./surrogate-pairs */ "./node_modules/html-entities/lib/surrogate-pairs.js");
var allNamedReferences = __assign(__assign({}, named_references_1.namedReferences), { all: named_references_1.namedReferences.html5 });
var encodeRegExps = {
    specialChars: /[<>'"&]/g,
    nonAscii: /(?:[<>'"&\u0080-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
    nonAsciiPrintable: /(?:[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
    extensive: /(?:[\x01-\x0c\x0e-\x1f\x21-\x2c\x2e-\x2f\x3a-\x40\x5b-\x60\x7b-\x7d\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g
};
var defaultEncodeOptions = {
    mode: 'specialChars',
    level: 'all',
    numeric: 'decimal'
};
/** Encodes all the necessary (specified by `level`) characters in the text */
function encode(text, _a) {
    var _b = _a === void 0 ? defaultEncodeOptions : _a, _c = _b.mode, mode = _c === void 0 ? 'specialChars' : _c, _d = _b.numeric, numeric = _d === void 0 ? 'decimal' : _d, _e = _b.level, level = _e === void 0 ? 'all' : _e;
    if (!text) {
        return '';
    }
    var encodeRegExp = encodeRegExps[mode];
    var references = allNamedReferences[level].characters;
    var isHex = numeric === 'hexadecimal';
    encodeRegExp.lastIndex = 0;
    var _b = encodeRegExp.exec(text);
    var _c;
    if (_b) {
        _c = '';
        var _d = 0;
        do {
            if (_d !== _b.index) {
                _c += text.substring(_d, _b.index);
            }
            var _e = _b[0];
            var result_1 = references[_e];
            if (!result_1) {
                var code_1 = _e.length > 1 ? surrogate_pairs_1.getCodePoint(_e, 0) : _e.charCodeAt(0);
                result_1 = (isHex ? '&#x' + code_1.toString(16) : '&#' + code_1) + ';';
            }
            _c += result_1;
            _d = _b.index + _e.length;
        } while ((_b = encodeRegExp.exec(text)));
        if (_d !== text.length) {
            _c += text.substring(_d);
        }
    }
    else {
        _c =
            text;
    }
    return _c;
}
exports.encode = encode;
var defaultDecodeOptions = {
    scope: 'body',
    level: 'all'
};
var strict = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g;
var attribute = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g;
var baseDecodeRegExps = {
    xml: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.xml
    },
    html4: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.html4
    },
    html5: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.html5
    }
};
var decodeRegExps = __assign(__assign({}, baseDecodeRegExps), { all: baseDecodeRegExps.html5 });
var fromCharCode = String.fromCharCode;
var outOfBoundsChar = fromCharCode(65533);
var defaultDecodeEntityOptions = {
    level: 'all'
};
/** Decodes a single entity */
function decodeEntity(entity, _a) {
    var _b = (_a === void 0 ? defaultDecodeEntityOptions : _a).level, level = _b === void 0 ? 'all' : _b;
    if (!entity) {
        return '';
    }
    var _b = entity;
    var decodeEntityLastChar_1 = entity[entity.length - 1];
    if (false) {}
    else if (false) {}
    else {
        var decodeResultByReference_1 = allNamedReferences[level].entities[entity];
        if (decodeResultByReference_1) {
            _b = decodeResultByReference_1;
        }
        else if (entity[0] === '&' && entity[1] === '#') {
            var decodeSecondChar_1 = entity[2];
            var decodeCode_1 = decodeSecondChar_1 == 'x' || decodeSecondChar_1 == 'X'
                ? parseInt(entity.substr(3), 16)
                : parseInt(entity.substr(2));
            _b =
                decodeCode_1 >= 0x10ffff
                    ? outOfBoundsChar
                    : decodeCode_1 > 65535
                        ? surrogate_pairs_1.fromCodePoint(decodeCode_1)
                        : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_1] || decodeCode_1);
        }
    }
    return _b;
}
exports.decodeEntity = decodeEntity;
/** Decodes all entities in the text */
function decode(text, _a) {
    var decodeSecondChar_1 = _a === void 0 ? defaultDecodeOptions : _a, decodeCode_1 = decodeSecondChar_1.level, level = decodeCode_1 === void 0 ? 'all' : decodeCode_1, _b = decodeSecondChar_1.scope, scope = _b === void 0 ? level === 'xml' ? 'strict' : 'body' : _b;
    if (!text) {
        return '';
    }
    var decodeRegExp = decodeRegExps[level][scope];
    var references = allNamedReferences[level].entities;
    var isAttribute = scope === 'attribute';
    var isStrict = scope === 'strict';
    decodeRegExp.lastIndex = 0;
    var replaceMatch_1 = decodeRegExp.exec(text);
    var replaceResult_1;
    if (replaceMatch_1) {
        replaceResult_1 = '';
        var replaceLastIndex_1 = 0;
        do {
            if (replaceLastIndex_1 !== replaceMatch_1.index) {
                replaceResult_1 += text.substring(replaceLastIndex_1, replaceMatch_1.index);
            }
            var replaceInput_1 = replaceMatch_1[0];
            var decodeResult_1 = replaceInput_1;
            var decodeEntityLastChar_2 = replaceInput_1[replaceInput_1.length - 1];
            if (isAttribute
                && decodeEntityLastChar_2 === '=') {
                decodeResult_1 = replaceInput_1;
            }
            else if (isStrict
                && decodeEntityLastChar_2 !== ';') {
                decodeResult_1 = replaceInput_1;
            }
            else {
                var decodeResultByReference_2 = references[replaceInput_1];
                if (decodeResultByReference_2) {
                    decodeResult_1 = decodeResultByReference_2;
                }
                else if (replaceInput_1[0] === '&' && replaceInput_1[1] === '#') {
                    var decodeSecondChar_2 = replaceInput_1[2];
                    var decodeCode_2 = decodeSecondChar_2 == 'x' || decodeSecondChar_2 == 'X'
                        ? parseInt(replaceInput_1.substr(3), 16)
                        : parseInt(replaceInput_1.substr(2));
                    decodeResult_1 =
                        decodeCode_2 >= 0x10ffff
                            ? outOfBoundsChar
                            : decodeCode_2 > 65535
                                ? surrogate_pairs_1.fromCodePoint(decodeCode_2)
                                : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_2] || decodeCode_2);
                }
            }
            replaceResult_1 += decodeResult_1;
            replaceLastIndex_1 = replaceMatch_1.index + replaceInput_1.length;
        } while ((replaceMatch_1 = decodeRegExp.exec(text)));
        if (replaceLastIndex_1 !== text.length) {
            replaceResult_1 += text.substring(replaceLastIndex_1);
        }
    }
    else {
        replaceResult_1 =
            text;
    }
    return replaceResult_1;
}
exports.decode = decode;


/***/ }),

/***/ "./node_modules/html-entities/lib/named-references.js":
/*!************************************************************!*\
  !*** ./node_modules/html-entities/lib/named-references.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.bodyRegExps={xml:/&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html4:/&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html5:/&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g};exports.namedReferences={xml:{entities:{"&lt;":"<","&gt;":">","&quot;":'"',"&apos;":"'","&amp;":"&"},characters:{"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;","&":"&amp;"}},html4:{entities:{"&apos;":"'","&nbsp":" ","&nbsp;":" ","&iexcl":"¡","&iexcl;":"¡","&cent":"¢","&cent;":"¢","&pound":"£","&pound;":"£","&curren":"¤","&curren;":"¤","&yen":"¥","&yen;":"¥","&brvbar":"¦","&brvbar;":"¦","&sect":"§","&sect;":"§","&uml":"¨","&uml;":"¨","&copy":"©","&copy;":"©","&ordf":"ª","&ordf;":"ª","&laquo":"«","&laquo;":"«","&not":"¬","&not;":"¬","&shy":"­","&shy;":"­","&reg":"®","&reg;":"®","&macr":"¯","&macr;":"¯","&deg":"°","&deg;":"°","&plusmn":"±","&plusmn;":"±","&sup2":"²","&sup2;":"²","&sup3":"³","&sup3;":"³","&acute":"´","&acute;":"´","&micro":"µ","&micro;":"µ","&para":"¶","&para;":"¶","&middot":"·","&middot;":"·","&cedil":"¸","&cedil;":"¸","&sup1":"¹","&sup1;":"¹","&ordm":"º","&ordm;":"º","&raquo":"»","&raquo;":"»","&frac14":"¼","&frac14;":"¼","&frac12":"½","&frac12;":"½","&frac34":"¾","&frac34;":"¾","&iquest":"¿","&iquest;":"¿","&Agrave":"À","&Agrave;":"À","&Aacute":"Á","&Aacute;":"Á","&Acirc":"Â","&Acirc;":"Â","&Atilde":"Ã","&Atilde;":"Ã","&Auml":"Ä","&Auml;":"Ä","&Aring":"Å","&Aring;":"Å","&AElig":"Æ","&AElig;":"Æ","&Ccedil":"Ç","&Ccedil;":"Ç","&Egrave":"È","&Egrave;":"È","&Eacute":"É","&Eacute;":"É","&Ecirc":"Ê","&Ecirc;":"Ê","&Euml":"Ë","&Euml;":"Ë","&Igrave":"Ì","&Igrave;":"Ì","&Iacute":"Í","&Iacute;":"Í","&Icirc":"Î","&Icirc;":"Î","&Iuml":"Ï","&Iuml;":"Ï","&ETH":"Ð","&ETH;":"Ð","&Ntilde":"Ñ","&Ntilde;":"Ñ","&Ograve":"Ò","&Ograve;":"Ò","&Oacute":"Ó","&Oacute;":"Ó","&Ocirc":"Ô","&Ocirc;":"Ô","&Otilde":"Õ","&Otilde;":"Õ","&Ouml":"Ö","&Ouml;":"Ö","&times":"×","&times;":"×","&Oslash":"Ø","&Oslash;":"Ø","&Ugrave":"Ù","&Ugrave;":"Ù","&Uacute":"Ú","&Uacute;":"Ú","&Ucirc":"Û","&Ucirc;":"Û","&Uuml":"Ü","&Uuml;":"Ü","&Yacute":"Ý","&Yacute;":"Ý","&THORN":"Þ","&THORN;":"Þ","&szlig":"ß","&szlig;":"ß","&agrave":"à","&agrave;":"à","&aacute":"á","&aacute;":"á","&acirc":"â","&acirc;":"â","&atilde":"ã","&atilde;":"ã","&auml":"ä","&auml;":"ä","&aring":"å","&aring;":"å","&aelig":"æ","&aelig;":"æ","&ccedil":"ç","&ccedil;":"ç","&egrave":"è","&egrave;":"è","&eacute":"é","&eacute;":"é","&ecirc":"ê","&ecirc;":"ê","&euml":"ë","&euml;":"ë","&igrave":"ì","&igrave;":"ì","&iacute":"í","&iacute;":"í","&icirc":"î","&icirc;":"î","&iuml":"ï","&iuml;":"ï","&eth":"ð","&eth;":"ð","&ntilde":"ñ","&ntilde;":"ñ","&ograve":"ò","&ograve;":"ò","&oacute":"ó","&oacute;":"ó","&ocirc":"ô","&ocirc;":"ô","&otilde":"õ","&otilde;":"õ","&ouml":"ö","&ouml;":"ö","&divide":"÷","&divide;":"÷","&oslash":"ø","&oslash;":"ø","&ugrave":"ù","&ugrave;":"ù","&uacute":"ú","&uacute;":"ú","&ucirc":"û","&ucirc;":"û","&uuml":"ü","&uuml;":"ü","&yacute":"ý","&yacute;":"ý","&thorn":"þ","&thorn;":"þ","&yuml":"ÿ","&yuml;":"ÿ","&quot":'"',"&quot;":'"',"&amp":"&","&amp;":"&","&lt":"<","&lt;":"<","&gt":">","&gt;":">","&OElig;":"Œ","&oelig;":"œ","&Scaron;":"Š","&scaron;":"š","&Yuml;":"Ÿ","&circ;":"ˆ","&tilde;":"˜","&ensp;":" ","&emsp;":" ","&thinsp;":" ","&zwnj;":"‌","&zwj;":"‍","&lrm;":"‎","&rlm;":"‏","&ndash;":"–","&mdash;":"—","&lsquo;":"‘","&rsquo;":"’","&sbquo;":"‚","&ldquo;":"“","&rdquo;":"”","&bdquo;":"„","&dagger;":"†","&Dagger;":"‡","&permil;":"‰","&lsaquo;":"‹","&rsaquo;":"›","&euro;":"€","&fnof;":"ƒ","&Alpha;":"Α","&Beta;":"Β","&Gamma;":"Γ","&Delta;":"Δ","&Epsilon;":"Ε","&Zeta;":"Ζ","&Eta;":"Η","&Theta;":"Θ","&Iota;":"Ι","&Kappa;":"Κ","&Lambda;":"Λ","&Mu;":"Μ","&Nu;":"Ν","&Xi;":"Ξ","&Omicron;":"Ο","&Pi;":"Π","&Rho;":"Ρ","&Sigma;":"Σ","&Tau;":"Τ","&Upsilon;":"Υ","&Phi;":"Φ","&Chi;":"Χ","&Psi;":"Ψ","&Omega;":"Ω","&alpha;":"α","&beta;":"β","&gamma;":"γ","&delta;":"δ","&epsilon;":"ε","&zeta;":"ζ","&eta;":"η","&theta;":"θ","&iota;":"ι","&kappa;":"κ","&lambda;":"λ","&mu;":"μ","&nu;":"ν","&xi;":"ξ","&omicron;":"ο","&pi;":"π","&rho;":"ρ","&sigmaf;":"ς","&sigma;":"σ","&tau;":"τ","&upsilon;":"υ","&phi;":"φ","&chi;":"χ","&psi;":"ψ","&omega;":"ω","&thetasym;":"ϑ","&upsih;":"ϒ","&piv;":"ϖ","&bull;":"•","&hellip;":"…","&prime;":"′","&Prime;":"″","&oline;":"‾","&frasl;":"⁄","&weierp;":"℘","&image;":"ℑ","&real;":"ℜ","&trade;":"™","&alefsym;":"ℵ","&larr;":"←","&uarr;":"↑","&rarr;":"→","&darr;":"↓","&harr;":"↔","&crarr;":"↵","&lArr;":"⇐","&uArr;":"⇑","&rArr;":"⇒","&dArr;":"⇓","&hArr;":"⇔","&forall;":"∀","&part;":"∂","&exist;":"∃","&empty;":"∅","&nabla;":"∇","&isin;":"∈","&notin;":"∉","&ni;":"∋","&prod;":"∏","&sum;":"∑","&minus;":"−","&lowast;":"∗","&radic;":"√","&prop;":"∝","&infin;":"∞","&ang;":"∠","&and;":"∧","&or;":"∨","&cap;":"∩","&cup;":"∪","&int;":"∫","&there4;":"∴","&sim;":"∼","&cong;":"≅","&asymp;":"≈","&ne;":"≠","&equiv;":"≡","&le;":"≤","&ge;":"≥","&sub;":"⊂","&sup;":"⊃","&nsub;":"⊄","&sube;":"⊆","&supe;":"⊇","&oplus;":"⊕","&otimes;":"⊗","&perp;":"⊥","&sdot;":"⋅","&lceil;":"⌈","&rceil;":"⌉","&lfloor;":"⌊","&rfloor;":"⌋","&lang;":"〈","&rang;":"〉","&loz;":"◊","&spades;":"♠","&clubs;":"♣","&hearts;":"♥","&diams;":"♦"},characters:{"'":"&apos;"," ":"&nbsp;","¡":"&iexcl;","¢":"&cent;","£":"&pound;","¤":"&curren;","¥":"&yen;","¦":"&brvbar;","§":"&sect;","¨":"&uml;","©":"&copy;","ª":"&ordf;","«":"&laquo;","¬":"&not;","­":"&shy;","®":"&reg;","¯":"&macr;","°":"&deg;","±":"&plusmn;","²":"&sup2;","³":"&sup3;","´":"&acute;","µ":"&micro;","¶":"&para;","·":"&middot;","¸":"&cedil;","¹":"&sup1;","º":"&ordm;","»":"&raquo;","¼":"&frac14;","½":"&frac12;","¾":"&frac34;","¿":"&iquest;","À":"&Agrave;","Á":"&Aacute;","Â":"&Acirc;","Ã":"&Atilde;","Ä":"&Auml;","Å":"&Aring;","Æ":"&AElig;","Ç":"&Ccedil;","È":"&Egrave;","É":"&Eacute;","Ê":"&Ecirc;","Ë":"&Euml;","Ì":"&Igrave;","Í":"&Iacute;","Î":"&Icirc;","Ï":"&Iuml;","Ð":"&ETH;","Ñ":"&Ntilde;","Ò":"&Ograve;","Ó":"&Oacute;","Ô":"&Ocirc;","Õ":"&Otilde;","Ö":"&Ouml;","×":"&times;","Ø":"&Oslash;","Ù":"&Ugrave;","Ú":"&Uacute;","Û":"&Ucirc;","Ü":"&Uuml;","Ý":"&Yacute;","Þ":"&THORN;","ß":"&szlig;","à":"&agrave;","á":"&aacute;","â":"&acirc;","ã":"&atilde;","ä":"&auml;","å":"&aring;","æ":"&aelig;","ç":"&ccedil;","è":"&egrave;","é":"&eacute;","ê":"&ecirc;","ë":"&euml;","ì":"&igrave;","í":"&iacute;","î":"&icirc;","ï":"&iuml;","ð":"&eth;","ñ":"&ntilde;","ò":"&ograve;","ó":"&oacute;","ô":"&ocirc;","õ":"&otilde;","ö":"&ouml;","÷":"&divide;","ø":"&oslash;","ù":"&ugrave;","ú":"&uacute;","û":"&ucirc;","ü":"&uuml;","ý":"&yacute;","þ":"&thorn;","ÿ":"&yuml;",'"':"&quot;","&":"&amp;","<":"&lt;",">":"&gt;","Œ":"&OElig;","œ":"&oelig;","Š":"&Scaron;","š":"&scaron;","Ÿ":"&Yuml;","ˆ":"&circ;","˜":"&tilde;"," ":"&ensp;"," ":"&emsp;"," ":"&thinsp;","‌":"&zwnj;","‍":"&zwj;","‎":"&lrm;","‏":"&rlm;","–":"&ndash;","—":"&mdash;","‘":"&lsquo;","’":"&rsquo;","‚":"&sbquo;","“":"&ldquo;","”":"&rdquo;","„":"&bdquo;","†":"&dagger;","‡":"&Dagger;","‰":"&permil;","‹":"&lsaquo;","›":"&rsaquo;","€":"&euro;","ƒ":"&fnof;","Α":"&Alpha;","Β":"&Beta;","Γ":"&Gamma;","Δ":"&Delta;","Ε":"&Epsilon;","Ζ":"&Zeta;","Η":"&Eta;","Θ":"&Theta;","Ι":"&Iota;","Κ":"&Kappa;","Λ":"&Lambda;","Μ":"&Mu;","Ν":"&Nu;","Ξ":"&Xi;","Ο":"&Omicron;","Π":"&Pi;","Ρ":"&Rho;","Σ":"&Sigma;","Τ":"&Tau;","Υ":"&Upsilon;","Φ":"&Phi;","Χ":"&Chi;","Ψ":"&Psi;","Ω":"&Omega;","α":"&alpha;","β":"&beta;","γ":"&gamma;","δ":"&delta;","ε":"&epsilon;","ζ":"&zeta;","η":"&eta;","θ":"&theta;","ι":"&iota;","κ":"&kappa;","λ":"&lambda;","μ":"&mu;","ν":"&nu;","ξ":"&xi;","ο":"&omicron;","π":"&pi;","ρ":"&rho;","ς":"&sigmaf;","σ":"&sigma;","τ":"&tau;","υ":"&upsilon;","φ":"&phi;","χ":"&chi;","ψ":"&psi;","ω":"&omega;","ϑ":"&thetasym;","ϒ":"&upsih;","ϖ":"&piv;","•":"&bull;","…":"&hellip;","′":"&prime;","″":"&Prime;","‾":"&oline;","⁄":"&frasl;","℘":"&weierp;","ℑ":"&image;","ℜ":"&real;","™":"&trade;","ℵ":"&alefsym;","←":"&larr;","↑":"&uarr;","→":"&rarr;","↓":"&darr;","↔":"&harr;","↵":"&crarr;","⇐":"&lArr;","⇑":"&uArr;","⇒":"&rArr;","⇓":"&dArr;","⇔":"&hArr;","∀":"&forall;","∂":"&part;","∃":"&exist;","∅":"&empty;","∇":"&nabla;","∈":"&isin;","∉":"&notin;","∋":"&ni;","∏":"&prod;","∑":"&sum;","−":"&minus;","∗":"&lowast;","√":"&radic;","∝":"&prop;","∞":"&infin;","∠":"&ang;","∧":"&and;","∨":"&or;","∩":"&cap;","∪":"&cup;","∫":"&int;","∴":"&there4;","∼":"&sim;","≅":"&cong;","≈":"&asymp;","≠":"&ne;","≡":"&equiv;","≤":"&le;","≥":"&ge;","⊂":"&sub;","⊃":"&sup;","⊄":"&nsub;","⊆":"&sube;","⊇":"&supe;","⊕":"&oplus;","⊗":"&otimes;","⊥":"&perp;","⋅":"&sdot;","⌈":"&lceil;","⌉":"&rceil;","⌊":"&lfloor;","⌋":"&rfloor;","〈":"&lang;","〉":"&rang;","◊":"&loz;","♠":"&spades;","♣":"&clubs;","♥":"&hearts;","♦":"&diams;"}},html5:{entities:{"&AElig":"Æ","&AElig;":"Æ","&AMP":"&","&AMP;":"&","&Aacute":"Á","&Aacute;":"Á","&Abreve;":"Ă","&Acirc":"Â","&Acirc;":"Â","&Acy;":"А","&Afr;":"𝔄","&Agrave":"À","&Agrave;":"À","&Alpha;":"Α","&Amacr;":"Ā","&And;":"⩓","&Aogon;":"Ą","&Aopf;":"𝔸","&ApplyFunction;":"⁡","&Aring":"Å","&Aring;":"Å","&Ascr;":"𝒜","&Assign;":"≔","&Atilde":"Ã","&Atilde;":"Ã","&Auml":"Ä","&Auml;":"Ä","&Backslash;":"∖","&Barv;":"⫧","&Barwed;":"⌆","&Bcy;":"Б","&Because;":"∵","&Bernoullis;":"ℬ","&Beta;":"Β","&Bfr;":"𝔅","&Bopf;":"𝔹","&Breve;":"˘","&Bscr;":"ℬ","&Bumpeq;":"≎","&CHcy;":"Ч","&COPY":"©","&COPY;":"©","&Cacute;":"Ć","&Cap;":"⋒","&CapitalDifferentialD;":"ⅅ","&Cayleys;":"ℭ","&Ccaron;":"Č","&Ccedil":"Ç","&Ccedil;":"Ç","&Ccirc;":"Ĉ","&Cconint;":"∰","&Cdot;":"Ċ","&Cedilla;":"¸","&CenterDot;":"·","&Cfr;":"ℭ","&Chi;":"Χ","&CircleDot;":"⊙","&CircleMinus;":"⊖","&CirclePlus;":"⊕","&CircleTimes;":"⊗","&ClockwiseContourIntegral;":"∲","&CloseCurlyDoubleQuote;":"”","&CloseCurlyQuote;":"’","&Colon;":"∷","&Colone;":"⩴","&Congruent;":"≡","&Conint;":"∯","&ContourIntegral;":"∮","&Copf;":"ℂ","&Coproduct;":"∐","&CounterClockwiseContourIntegral;":"∳","&Cross;":"⨯","&Cscr;":"𝒞","&Cup;":"⋓","&CupCap;":"≍","&DD;":"ⅅ","&DDotrahd;":"⤑","&DJcy;":"Ђ","&DScy;":"Ѕ","&DZcy;":"Џ","&Dagger;":"‡","&Darr;":"↡","&Dashv;":"⫤","&Dcaron;":"Ď","&Dcy;":"Д","&Del;":"∇","&Delta;":"Δ","&Dfr;":"𝔇","&DiacriticalAcute;":"´","&DiacriticalDot;":"˙","&DiacriticalDoubleAcute;":"˝","&DiacriticalGrave;":"`","&DiacriticalTilde;":"˜","&Diamond;":"⋄","&DifferentialD;":"ⅆ","&Dopf;":"𝔻","&Dot;":"¨","&DotDot;":"⃜","&DotEqual;":"≐","&DoubleContourIntegral;":"∯","&DoubleDot;":"¨","&DoubleDownArrow;":"⇓","&DoubleLeftArrow;":"⇐","&DoubleLeftRightArrow;":"⇔","&DoubleLeftTee;":"⫤","&DoubleLongLeftArrow;":"⟸","&DoubleLongLeftRightArrow;":"⟺","&DoubleLongRightArrow;":"⟹","&DoubleRightArrow;":"⇒","&DoubleRightTee;":"⊨","&DoubleUpArrow;":"⇑","&DoubleUpDownArrow;":"⇕","&DoubleVerticalBar;":"∥","&DownArrow;":"↓","&DownArrowBar;":"⤓","&DownArrowUpArrow;":"⇵","&DownBreve;":"̑","&DownLeftRightVector;":"⥐","&DownLeftTeeVector;":"⥞","&DownLeftVector;":"↽","&DownLeftVectorBar;":"⥖","&DownRightTeeVector;":"⥟","&DownRightVector;":"⇁","&DownRightVectorBar;":"⥗","&DownTee;":"⊤","&DownTeeArrow;":"↧","&Downarrow;":"⇓","&Dscr;":"𝒟","&Dstrok;":"Đ","&ENG;":"Ŋ","&ETH":"Ð","&ETH;":"Ð","&Eacute":"É","&Eacute;":"É","&Ecaron;":"Ě","&Ecirc":"Ê","&Ecirc;":"Ê","&Ecy;":"Э","&Edot;":"Ė","&Efr;":"𝔈","&Egrave":"È","&Egrave;":"È","&Element;":"∈","&Emacr;":"Ē","&EmptySmallSquare;":"◻","&EmptyVerySmallSquare;":"▫","&Eogon;":"Ę","&Eopf;":"𝔼","&Epsilon;":"Ε","&Equal;":"⩵","&EqualTilde;":"≂","&Equilibrium;":"⇌","&Escr;":"ℰ","&Esim;":"⩳","&Eta;":"Η","&Euml":"Ë","&Euml;":"Ë","&Exists;":"∃","&ExponentialE;":"ⅇ","&Fcy;":"Ф","&Ffr;":"𝔉","&FilledSmallSquare;":"◼","&FilledVerySmallSquare;":"▪","&Fopf;":"𝔽","&ForAll;":"∀","&Fouriertrf;":"ℱ","&Fscr;":"ℱ","&GJcy;":"Ѓ","&GT":">","&GT;":">","&Gamma;":"Γ","&Gammad;":"Ϝ","&Gbreve;":"Ğ","&Gcedil;":"Ģ","&Gcirc;":"Ĝ","&Gcy;":"Г","&Gdot;":"Ġ","&Gfr;":"𝔊","&Gg;":"⋙","&Gopf;":"𝔾","&GreaterEqual;":"≥","&GreaterEqualLess;":"⋛","&GreaterFullEqual;":"≧","&GreaterGreater;":"⪢","&GreaterLess;":"≷","&GreaterSlantEqual;":"⩾","&GreaterTilde;":"≳","&Gscr;":"𝒢","&Gt;":"≫","&HARDcy;":"Ъ","&Hacek;":"ˇ","&Hat;":"^","&Hcirc;":"Ĥ","&Hfr;":"ℌ","&HilbertSpace;":"ℋ","&Hopf;":"ℍ","&HorizontalLine;":"─","&Hscr;":"ℋ","&Hstrok;":"Ħ","&HumpDownHump;":"≎","&HumpEqual;":"≏","&IEcy;":"Е","&IJlig;":"Ĳ","&IOcy;":"Ё","&Iacute":"Í","&Iacute;":"Í","&Icirc":"Î","&Icirc;":"Î","&Icy;":"И","&Idot;":"İ","&Ifr;":"ℑ","&Igrave":"Ì","&Igrave;":"Ì","&Im;":"ℑ","&Imacr;":"Ī","&ImaginaryI;":"ⅈ","&Implies;":"⇒","&Int;":"∬","&Integral;":"∫","&Intersection;":"⋂","&InvisibleComma;":"⁣","&InvisibleTimes;":"⁢","&Iogon;":"Į","&Iopf;":"𝕀","&Iota;":"Ι","&Iscr;":"ℐ","&Itilde;":"Ĩ","&Iukcy;":"І","&Iuml":"Ï","&Iuml;":"Ï","&Jcirc;":"Ĵ","&Jcy;":"Й","&Jfr;":"𝔍","&Jopf;":"𝕁","&Jscr;":"𝒥","&Jsercy;":"Ј","&Jukcy;":"Є","&KHcy;":"Х","&KJcy;":"Ќ","&Kappa;":"Κ","&Kcedil;":"Ķ","&Kcy;":"К","&Kfr;":"𝔎","&Kopf;":"𝕂","&Kscr;":"𝒦","&LJcy;":"Љ","&LT":"<","&LT;":"<","&Lacute;":"Ĺ","&Lambda;":"Λ","&Lang;":"⟪","&Laplacetrf;":"ℒ","&Larr;":"↞","&Lcaron;":"Ľ","&Lcedil;":"Ļ","&Lcy;":"Л","&LeftAngleBracket;":"⟨","&LeftArrow;":"←","&LeftArrowBar;":"⇤","&LeftArrowRightArrow;":"⇆","&LeftCeiling;":"⌈","&LeftDoubleBracket;":"⟦","&LeftDownTeeVector;":"⥡","&LeftDownVector;":"⇃","&LeftDownVectorBar;":"⥙","&LeftFloor;":"⌊","&LeftRightArrow;":"↔","&LeftRightVector;":"⥎","&LeftTee;":"⊣","&LeftTeeArrow;":"↤","&LeftTeeVector;":"⥚","&LeftTriangle;":"⊲","&LeftTriangleBar;":"⧏","&LeftTriangleEqual;":"⊴","&LeftUpDownVector;":"⥑","&LeftUpTeeVector;":"⥠","&LeftUpVector;":"↿","&LeftUpVectorBar;":"⥘","&LeftVector;":"↼","&LeftVectorBar;":"⥒","&Leftarrow;":"⇐","&Leftrightarrow;":"⇔","&LessEqualGreater;":"⋚","&LessFullEqual;":"≦","&LessGreater;":"≶","&LessLess;":"⪡","&LessSlantEqual;":"⩽","&LessTilde;":"≲","&Lfr;":"𝔏","&Ll;":"⋘","&Lleftarrow;":"⇚","&Lmidot;":"Ŀ","&LongLeftArrow;":"⟵","&LongLeftRightArrow;":"⟷","&LongRightArrow;":"⟶","&Longleftarrow;":"⟸","&Longleftrightarrow;":"⟺","&Longrightarrow;":"⟹","&Lopf;":"𝕃","&LowerLeftArrow;":"↙","&LowerRightArrow;":"↘","&Lscr;":"ℒ","&Lsh;":"↰","&Lstrok;":"Ł","&Lt;":"≪","&Map;":"⤅","&Mcy;":"М","&MediumSpace;":" ","&Mellintrf;":"ℳ","&Mfr;":"𝔐","&MinusPlus;":"∓","&Mopf;":"𝕄","&Mscr;":"ℳ","&Mu;":"Μ","&NJcy;":"Њ","&Nacute;":"Ń","&Ncaron;":"Ň","&Ncedil;":"Ņ","&Ncy;":"Н","&NegativeMediumSpace;":"​","&NegativeThickSpace;":"​","&NegativeThinSpace;":"​","&NegativeVeryThinSpace;":"​","&NestedGreaterGreater;":"≫","&NestedLessLess;":"≪","&NewLine;":"\n","&Nfr;":"𝔑","&NoBreak;":"⁠","&NonBreakingSpace;":" ","&Nopf;":"ℕ","&Not;":"⫬","&NotCongruent;":"≢","&NotCupCap;":"≭","&NotDoubleVerticalBar;":"∦","&NotElement;":"∉","&NotEqual;":"≠","&NotEqualTilde;":"≂̸","&NotExists;":"∄","&NotGreater;":"≯","&NotGreaterEqual;":"≱","&NotGreaterFullEqual;":"≧̸","&NotGreaterGreater;":"≫̸","&NotGreaterLess;":"≹","&NotGreaterSlantEqual;":"⩾̸","&NotGreaterTilde;":"≵","&NotHumpDownHump;":"≎̸","&NotHumpEqual;":"≏̸","&NotLeftTriangle;":"⋪","&NotLeftTriangleBar;":"⧏̸","&NotLeftTriangleEqual;":"⋬","&NotLess;":"≮","&NotLessEqual;":"≰","&NotLessGreater;":"≸","&NotLessLess;":"≪̸","&NotLessSlantEqual;":"⩽̸","&NotLessTilde;":"≴","&NotNestedGreaterGreater;":"⪢̸","&NotNestedLessLess;":"⪡̸","&NotPrecedes;":"⊀","&NotPrecedesEqual;":"⪯̸","&NotPrecedesSlantEqual;":"⋠","&NotReverseElement;":"∌","&NotRightTriangle;":"⋫","&NotRightTriangleBar;":"⧐̸","&NotRightTriangleEqual;":"⋭","&NotSquareSubset;":"⊏̸","&NotSquareSubsetEqual;":"⋢","&NotSquareSuperset;":"⊐̸","&NotSquareSupersetEqual;":"⋣","&NotSubset;":"⊂⃒","&NotSubsetEqual;":"⊈","&NotSucceeds;":"⊁","&NotSucceedsEqual;":"⪰̸","&NotSucceedsSlantEqual;":"⋡","&NotSucceedsTilde;":"≿̸","&NotSuperset;":"⊃⃒","&NotSupersetEqual;":"⊉","&NotTilde;":"≁","&NotTildeEqual;":"≄","&NotTildeFullEqual;":"≇","&NotTildeTilde;":"≉","&NotVerticalBar;":"∤","&Nscr;":"𝒩","&Ntilde":"Ñ","&Ntilde;":"Ñ","&Nu;":"Ν","&OElig;":"Œ","&Oacute":"Ó","&Oacute;":"Ó","&Ocirc":"Ô","&Ocirc;":"Ô","&Ocy;":"О","&Odblac;":"Ő","&Ofr;":"𝔒","&Ograve":"Ò","&Ograve;":"Ò","&Omacr;":"Ō","&Omega;":"Ω","&Omicron;":"Ο","&Oopf;":"𝕆","&OpenCurlyDoubleQuote;":"“","&OpenCurlyQuote;":"‘","&Or;":"⩔","&Oscr;":"𝒪","&Oslash":"Ø","&Oslash;":"Ø","&Otilde":"Õ","&Otilde;":"Õ","&Otimes;":"⨷","&Ouml":"Ö","&Ouml;":"Ö","&OverBar;":"‾","&OverBrace;":"⏞","&OverBracket;":"⎴","&OverParenthesis;":"⏜","&PartialD;":"∂","&Pcy;":"П","&Pfr;":"𝔓","&Phi;":"Φ","&Pi;":"Π","&PlusMinus;":"±","&Poincareplane;":"ℌ","&Popf;":"ℙ","&Pr;":"⪻","&Precedes;":"≺","&PrecedesEqual;":"⪯","&PrecedesSlantEqual;":"≼","&PrecedesTilde;":"≾","&Prime;":"″","&Product;":"∏","&Proportion;":"∷","&Proportional;":"∝","&Pscr;":"𝒫","&Psi;":"Ψ","&QUOT":'"',"&QUOT;":'"',"&Qfr;":"𝔔","&Qopf;":"ℚ","&Qscr;":"𝒬","&RBarr;":"⤐","&REG":"®","&REG;":"®","&Racute;":"Ŕ","&Rang;":"⟫","&Rarr;":"↠","&Rarrtl;":"⤖","&Rcaron;":"Ř","&Rcedil;":"Ŗ","&Rcy;":"Р","&Re;":"ℜ","&ReverseElement;":"∋","&ReverseEquilibrium;":"⇋","&ReverseUpEquilibrium;":"⥯","&Rfr;":"ℜ","&Rho;":"Ρ","&RightAngleBracket;":"⟩","&RightArrow;":"→","&RightArrowBar;":"⇥","&RightArrowLeftArrow;":"⇄","&RightCeiling;":"⌉","&RightDoubleBracket;":"⟧","&RightDownTeeVector;":"⥝","&RightDownVector;":"⇂","&RightDownVectorBar;":"⥕","&RightFloor;":"⌋","&RightTee;":"⊢","&RightTeeArrow;":"↦","&RightTeeVector;":"⥛","&RightTriangle;":"⊳","&RightTriangleBar;":"⧐","&RightTriangleEqual;":"⊵","&RightUpDownVector;":"⥏","&RightUpTeeVector;":"⥜","&RightUpVector;":"↾","&RightUpVectorBar;":"⥔","&RightVector;":"⇀","&RightVectorBar;":"⥓","&Rightarrow;":"⇒","&Ropf;":"ℝ","&RoundImplies;":"⥰","&Rrightarrow;":"⇛","&Rscr;":"ℛ","&Rsh;":"↱","&RuleDelayed;":"⧴","&SHCHcy;":"Щ","&SHcy;":"Ш","&SOFTcy;":"Ь","&Sacute;":"Ś","&Sc;":"⪼","&Scaron;":"Š","&Scedil;":"Ş","&Scirc;":"Ŝ","&Scy;":"С","&Sfr;":"𝔖","&ShortDownArrow;":"↓","&ShortLeftArrow;":"←","&ShortRightArrow;":"→","&ShortUpArrow;":"↑","&Sigma;":"Σ","&SmallCircle;":"∘","&Sopf;":"𝕊","&Sqrt;":"√","&Square;":"□","&SquareIntersection;":"⊓","&SquareSubset;":"⊏","&SquareSubsetEqual;":"⊑","&SquareSuperset;":"⊐","&SquareSupersetEqual;":"⊒","&SquareUnion;":"⊔","&Sscr;":"𝒮","&Star;":"⋆","&Sub;":"⋐","&Subset;":"⋐","&SubsetEqual;":"⊆","&Succeeds;":"≻","&SucceedsEqual;":"⪰","&SucceedsSlantEqual;":"≽","&SucceedsTilde;":"≿","&SuchThat;":"∋","&Sum;":"∑","&Sup;":"⋑","&Superset;":"⊃","&SupersetEqual;":"⊇","&Supset;":"⋑","&THORN":"Þ","&THORN;":"Þ","&TRADE;":"™","&TSHcy;":"Ћ","&TScy;":"Ц","&Tab;":"\t","&Tau;":"Τ","&Tcaron;":"Ť","&Tcedil;":"Ţ","&Tcy;":"Т","&Tfr;":"𝔗","&Therefore;":"∴","&Theta;":"Θ","&ThickSpace;":"  ","&ThinSpace;":" ","&Tilde;":"∼","&TildeEqual;":"≃","&TildeFullEqual;":"≅","&TildeTilde;":"≈","&Topf;":"𝕋","&TripleDot;":"⃛","&Tscr;":"𝒯","&Tstrok;":"Ŧ","&Uacute":"Ú","&Uacute;":"Ú","&Uarr;":"↟","&Uarrocir;":"⥉","&Ubrcy;":"Ў","&Ubreve;":"Ŭ","&Ucirc":"Û","&Ucirc;":"Û","&Ucy;":"У","&Udblac;":"Ű","&Ufr;":"𝔘","&Ugrave":"Ù","&Ugrave;":"Ù","&Umacr;":"Ū","&UnderBar;":"_","&UnderBrace;":"⏟","&UnderBracket;":"⎵","&UnderParenthesis;":"⏝","&Union;":"⋃","&UnionPlus;":"⊎","&Uogon;":"Ų","&Uopf;":"𝕌","&UpArrow;":"↑","&UpArrowBar;":"⤒","&UpArrowDownArrow;":"⇅","&UpDownArrow;":"↕","&UpEquilibrium;":"⥮","&UpTee;":"⊥","&UpTeeArrow;":"↥","&Uparrow;":"⇑","&Updownarrow;":"⇕","&UpperLeftArrow;":"↖","&UpperRightArrow;":"↗","&Upsi;":"ϒ","&Upsilon;":"Υ","&Uring;":"Ů","&Uscr;":"𝒰","&Utilde;":"Ũ","&Uuml":"Ü","&Uuml;":"Ü","&VDash;":"⊫","&Vbar;":"⫫","&Vcy;":"В","&Vdash;":"⊩","&Vdashl;":"⫦","&Vee;":"⋁","&Verbar;":"‖","&Vert;":"‖","&VerticalBar;":"∣","&VerticalLine;":"|","&VerticalSeparator;":"❘","&VerticalTilde;":"≀","&VeryThinSpace;":" ","&Vfr;":"𝔙","&Vopf;":"𝕍","&Vscr;":"𝒱","&Vvdash;":"⊪","&Wcirc;":"Ŵ","&Wedge;":"⋀","&Wfr;":"𝔚","&Wopf;":"𝕎","&Wscr;":"𝒲","&Xfr;":"𝔛","&Xi;":"Ξ","&Xopf;":"𝕏","&Xscr;":"𝒳","&YAcy;":"Я","&YIcy;":"Ї","&YUcy;":"Ю","&Yacute":"Ý","&Yacute;":"Ý","&Ycirc;":"Ŷ","&Ycy;":"Ы","&Yfr;":"𝔜","&Yopf;":"𝕐","&Yscr;":"𝒴","&Yuml;":"Ÿ","&ZHcy;":"Ж","&Zacute;":"Ź","&Zcaron;":"Ž","&Zcy;":"З","&Zdot;":"Ż","&ZeroWidthSpace;":"​","&Zeta;":"Ζ","&Zfr;":"ℨ","&Zopf;":"ℤ","&Zscr;":"𝒵","&aacute":"á","&aacute;":"á","&abreve;":"ă","&ac;":"∾","&acE;":"∾̳","&acd;":"∿","&acirc":"â","&acirc;":"â","&acute":"´","&acute;":"´","&acy;":"а","&aelig":"æ","&aelig;":"æ","&af;":"⁡","&afr;":"𝔞","&agrave":"à","&agrave;":"à","&alefsym;":"ℵ","&aleph;":"ℵ","&alpha;":"α","&amacr;":"ā","&amalg;":"⨿","&amp":"&","&amp;":"&","&and;":"∧","&andand;":"⩕","&andd;":"⩜","&andslope;":"⩘","&andv;":"⩚","&ang;":"∠","&ange;":"⦤","&angle;":"∠","&angmsd;":"∡","&angmsdaa;":"⦨","&angmsdab;":"⦩","&angmsdac;":"⦪","&angmsdad;":"⦫","&angmsdae;":"⦬","&angmsdaf;":"⦭","&angmsdag;":"⦮","&angmsdah;":"⦯","&angrt;":"∟","&angrtvb;":"⊾","&angrtvbd;":"⦝","&angsph;":"∢","&angst;":"Å","&angzarr;":"⍼","&aogon;":"ą","&aopf;":"𝕒","&ap;":"≈","&apE;":"⩰","&apacir;":"⩯","&ape;":"≊","&apid;":"≋","&apos;":"'","&approx;":"≈","&approxeq;":"≊","&aring":"å","&aring;":"å","&ascr;":"𝒶","&ast;":"*","&asymp;":"≈","&asympeq;":"≍","&atilde":"ã","&atilde;":"ã","&auml":"ä","&auml;":"ä","&awconint;":"∳","&awint;":"⨑","&bNot;":"⫭","&backcong;":"≌","&backepsilon;":"϶","&backprime;":"‵","&backsim;":"∽","&backsimeq;":"⋍","&barvee;":"⊽","&barwed;":"⌅","&barwedge;":"⌅","&bbrk;":"⎵","&bbrktbrk;":"⎶","&bcong;":"≌","&bcy;":"б","&bdquo;":"„","&becaus;":"∵","&because;":"∵","&bemptyv;":"⦰","&bepsi;":"϶","&bernou;":"ℬ","&beta;":"β","&beth;":"ℶ","&between;":"≬","&bfr;":"𝔟","&bigcap;":"⋂","&bigcirc;":"◯","&bigcup;":"⋃","&bigodot;":"⨀","&bigoplus;":"⨁","&bigotimes;":"⨂","&bigsqcup;":"⨆","&bigstar;":"★","&bigtriangledown;":"▽","&bigtriangleup;":"△","&biguplus;":"⨄","&bigvee;":"⋁","&bigwedge;":"⋀","&bkarow;":"⤍","&blacklozenge;":"⧫","&blacksquare;":"▪","&blacktriangle;":"▴","&blacktriangledown;":"▾","&blacktriangleleft;":"◂","&blacktriangleright;":"▸","&blank;":"␣","&blk12;":"▒","&blk14;":"░","&blk34;":"▓","&block;":"█","&bne;":"=⃥","&bnequiv;":"≡⃥","&bnot;":"⌐","&bopf;":"𝕓","&bot;":"⊥","&bottom;":"⊥","&bowtie;":"⋈","&boxDL;":"╗","&boxDR;":"╔","&boxDl;":"╖","&boxDr;":"╓","&boxH;":"═","&boxHD;":"╦","&boxHU;":"╩","&boxHd;":"╤","&boxHu;":"╧","&boxUL;":"╝","&boxUR;":"╚","&boxUl;":"╜","&boxUr;":"╙","&boxV;":"║","&boxVH;":"╬","&boxVL;":"╣","&boxVR;":"╠","&boxVh;":"╫","&boxVl;":"╢","&boxVr;":"╟","&boxbox;":"⧉","&boxdL;":"╕","&boxdR;":"╒","&boxdl;":"┐","&boxdr;":"┌","&boxh;":"─","&boxhD;":"╥","&boxhU;":"╨","&boxhd;":"┬","&boxhu;":"┴","&boxminus;":"⊟","&boxplus;":"⊞","&boxtimes;":"⊠","&boxuL;":"╛","&boxuR;":"╘","&boxul;":"┘","&boxur;":"└","&boxv;":"│","&boxvH;":"╪","&boxvL;":"╡","&boxvR;":"╞","&boxvh;":"┼","&boxvl;":"┤","&boxvr;":"├","&bprime;":"‵","&breve;":"˘","&brvbar":"¦","&brvbar;":"¦","&bscr;":"𝒷","&bsemi;":"⁏","&bsim;":"∽","&bsime;":"⋍","&bsol;":"\\","&bsolb;":"⧅","&bsolhsub;":"⟈","&bull;":"•","&bullet;":"•","&bump;":"≎","&bumpE;":"⪮","&bumpe;":"≏","&bumpeq;":"≏","&cacute;":"ć","&cap;":"∩","&capand;":"⩄","&capbrcup;":"⩉","&capcap;":"⩋","&capcup;":"⩇","&capdot;":"⩀","&caps;":"∩︀","&caret;":"⁁","&caron;":"ˇ","&ccaps;":"⩍","&ccaron;":"č","&ccedil":"ç","&ccedil;":"ç","&ccirc;":"ĉ","&ccups;":"⩌","&ccupssm;":"⩐","&cdot;":"ċ","&cedil":"¸","&cedil;":"¸","&cemptyv;":"⦲","&cent":"¢","&cent;":"¢","&centerdot;":"·","&cfr;":"𝔠","&chcy;":"ч","&check;":"✓","&checkmark;":"✓","&chi;":"χ","&cir;":"○","&cirE;":"⧃","&circ;":"ˆ","&circeq;":"≗","&circlearrowleft;":"↺","&circlearrowright;":"↻","&circledR;":"®","&circledS;":"Ⓢ","&circledast;":"⊛","&circledcirc;":"⊚","&circleddash;":"⊝","&cire;":"≗","&cirfnint;":"⨐","&cirmid;":"⫯","&cirscir;":"⧂","&clubs;":"♣","&clubsuit;":"♣","&colon;":":","&colone;":"≔","&coloneq;":"≔","&comma;":",","&commat;":"@","&comp;":"∁","&compfn;":"∘","&complement;":"∁","&complexes;":"ℂ","&cong;":"≅","&congdot;":"⩭","&conint;":"∮","&copf;":"𝕔","&coprod;":"∐","&copy":"©","&copy;":"©","&copysr;":"℗","&crarr;":"↵","&cross;":"✗","&cscr;":"𝒸","&csub;":"⫏","&csube;":"⫑","&csup;":"⫐","&csupe;":"⫒","&ctdot;":"⋯","&cudarrl;":"⤸","&cudarrr;":"⤵","&cuepr;":"⋞","&cuesc;":"⋟","&cularr;":"↶","&cularrp;":"⤽","&cup;":"∪","&cupbrcap;":"⩈","&cupcap;":"⩆","&cupcup;":"⩊","&cupdot;":"⊍","&cupor;":"⩅","&cups;":"∪︀","&curarr;":"↷","&curarrm;":"⤼","&curlyeqprec;":"⋞","&curlyeqsucc;":"⋟","&curlyvee;":"⋎","&curlywedge;":"⋏","&curren":"¤","&curren;":"¤","&curvearrowleft;":"↶","&curvearrowright;":"↷","&cuvee;":"⋎","&cuwed;":"⋏","&cwconint;":"∲","&cwint;":"∱","&cylcty;":"⌭","&dArr;":"⇓","&dHar;":"⥥","&dagger;":"†","&daleth;":"ℸ","&darr;":"↓","&dash;":"‐","&dashv;":"⊣","&dbkarow;":"⤏","&dblac;":"˝","&dcaron;":"ď","&dcy;":"д","&dd;":"ⅆ","&ddagger;":"‡","&ddarr;":"⇊","&ddotseq;":"⩷","&deg":"°","&deg;":"°","&delta;":"δ","&demptyv;":"⦱","&dfisht;":"⥿","&dfr;":"𝔡","&dharl;":"⇃","&dharr;":"⇂","&diam;":"⋄","&diamond;":"⋄","&diamondsuit;":"♦","&diams;":"♦","&die;":"¨","&digamma;":"ϝ","&disin;":"⋲","&div;":"÷","&divide":"÷","&divide;":"÷","&divideontimes;":"⋇","&divonx;":"⋇","&djcy;":"ђ","&dlcorn;":"⌞","&dlcrop;":"⌍","&dollar;":"$","&dopf;":"𝕕","&dot;":"˙","&doteq;":"≐","&doteqdot;":"≑","&dotminus;":"∸","&dotplus;":"∔","&dotsquare;":"⊡","&doublebarwedge;":"⌆","&downarrow;":"↓","&downdownarrows;":"⇊","&downharpoonleft;":"⇃","&downharpoonright;":"⇂","&drbkarow;":"⤐","&drcorn;":"⌟","&drcrop;":"⌌","&dscr;":"𝒹","&dscy;":"ѕ","&dsol;":"⧶","&dstrok;":"đ","&dtdot;":"⋱","&dtri;":"▿","&dtrif;":"▾","&duarr;":"⇵","&duhar;":"⥯","&dwangle;":"⦦","&dzcy;":"џ","&dzigrarr;":"⟿","&eDDot;":"⩷","&eDot;":"≑","&eacute":"é","&eacute;":"é","&easter;":"⩮","&ecaron;":"ě","&ecir;":"≖","&ecirc":"ê","&ecirc;":"ê","&ecolon;":"≕","&ecy;":"э","&edot;":"ė","&ee;":"ⅇ","&efDot;":"≒","&efr;":"𝔢","&eg;":"⪚","&egrave":"è","&egrave;":"è","&egs;":"⪖","&egsdot;":"⪘","&el;":"⪙","&elinters;":"⏧","&ell;":"ℓ","&els;":"⪕","&elsdot;":"⪗","&emacr;":"ē","&empty;":"∅","&emptyset;":"∅","&emptyv;":"∅","&emsp13;":" ","&emsp14;":" ","&emsp;":" ","&eng;":"ŋ","&ensp;":" ","&eogon;":"ę","&eopf;":"𝕖","&epar;":"⋕","&eparsl;":"⧣","&eplus;":"⩱","&epsi;":"ε","&epsilon;":"ε","&epsiv;":"ϵ","&eqcirc;":"≖","&eqcolon;":"≕","&eqsim;":"≂","&eqslantgtr;":"⪖","&eqslantless;":"⪕","&equals;":"=","&equest;":"≟","&equiv;":"≡","&equivDD;":"⩸","&eqvparsl;":"⧥","&erDot;":"≓","&erarr;":"⥱","&escr;":"ℯ","&esdot;":"≐","&esim;":"≂","&eta;":"η","&eth":"ð","&eth;":"ð","&euml":"ë","&euml;":"ë","&euro;":"€","&excl;":"!","&exist;":"∃","&expectation;":"ℰ","&exponentiale;":"ⅇ","&fallingdotseq;":"≒","&fcy;":"ф","&female;":"♀","&ffilig;":"ﬃ","&fflig;":"ﬀ","&ffllig;":"ﬄ","&ffr;":"𝔣","&filig;":"ﬁ","&fjlig;":"fj","&flat;":"♭","&fllig;":"ﬂ","&fltns;":"▱","&fnof;":"ƒ","&fopf;":"𝕗","&forall;":"∀","&fork;":"⋔","&forkv;":"⫙","&fpartint;":"⨍","&frac12":"½","&frac12;":"½","&frac13;":"⅓","&frac14":"¼","&frac14;":"¼","&frac15;":"⅕","&frac16;":"⅙","&frac18;":"⅛","&frac23;":"⅔","&frac25;":"⅖","&frac34":"¾","&frac34;":"¾","&frac35;":"⅗","&frac38;":"⅜","&frac45;":"⅘","&frac56;":"⅚","&frac58;":"⅝","&frac78;":"⅞","&frasl;":"⁄","&frown;":"⌢","&fscr;":"𝒻","&gE;":"≧","&gEl;":"⪌","&gacute;":"ǵ","&gamma;":"γ","&gammad;":"ϝ","&gap;":"⪆","&gbreve;":"ğ","&gcirc;":"ĝ","&gcy;":"г","&gdot;":"ġ","&ge;":"≥","&gel;":"⋛","&geq;":"≥","&geqq;":"≧","&geqslant;":"⩾","&ges;":"⩾","&gescc;":"⪩","&gesdot;":"⪀","&gesdoto;":"⪂","&gesdotol;":"⪄","&gesl;":"⋛︀","&gesles;":"⪔","&gfr;":"𝔤","&gg;":"≫","&ggg;":"⋙","&gimel;":"ℷ","&gjcy;":"ѓ","&gl;":"≷","&glE;":"⪒","&gla;":"⪥","&glj;":"⪤","&gnE;":"≩","&gnap;":"⪊","&gnapprox;":"⪊","&gne;":"⪈","&gneq;":"⪈","&gneqq;":"≩","&gnsim;":"⋧","&gopf;":"𝕘","&grave;":"`","&gscr;":"ℊ","&gsim;":"≳","&gsime;":"⪎","&gsiml;":"⪐","&gt":">","&gt;":">","&gtcc;":"⪧","&gtcir;":"⩺","&gtdot;":"⋗","&gtlPar;":"⦕","&gtquest;":"⩼","&gtrapprox;":"⪆","&gtrarr;":"⥸","&gtrdot;":"⋗","&gtreqless;":"⋛","&gtreqqless;":"⪌","&gtrless;":"≷","&gtrsim;":"≳","&gvertneqq;":"≩︀","&gvnE;":"≩︀","&hArr;":"⇔","&hairsp;":" ","&half;":"½","&hamilt;":"ℋ","&hardcy;":"ъ","&harr;":"↔","&harrcir;":"⥈","&harrw;":"↭","&hbar;":"ℏ","&hcirc;":"ĥ","&hearts;":"♥","&heartsuit;":"♥","&hellip;":"…","&hercon;":"⊹","&hfr;":"𝔥","&hksearow;":"⤥","&hkswarow;":"⤦","&hoarr;":"⇿","&homtht;":"∻","&hookleftarrow;":"↩","&hookrightarrow;":"↪","&hopf;":"𝕙","&horbar;":"―","&hscr;":"𝒽","&hslash;":"ℏ","&hstrok;":"ħ","&hybull;":"⁃","&hyphen;":"‐","&iacute":"í","&iacute;":"í","&ic;":"⁣","&icirc":"î","&icirc;":"î","&icy;":"и","&iecy;":"е","&iexcl":"¡","&iexcl;":"¡","&iff;":"⇔","&ifr;":"𝔦","&igrave":"ì","&igrave;":"ì","&ii;":"ⅈ","&iiiint;":"⨌","&iiint;":"∭","&iinfin;":"⧜","&iiota;":"℩","&ijlig;":"ĳ","&imacr;":"ī","&image;":"ℑ","&imagline;":"ℐ","&imagpart;":"ℑ","&imath;":"ı","&imof;":"⊷","&imped;":"Ƶ","&in;":"∈","&incare;":"℅","&infin;":"∞","&infintie;":"⧝","&inodot;":"ı","&int;":"∫","&intcal;":"⊺","&integers;":"ℤ","&intercal;":"⊺","&intlarhk;":"⨗","&intprod;":"⨼","&iocy;":"ё","&iogon;":"į","&iopf;":"𝕚","&iota;":"ι","&iprod;":"⨼","&iquest":"¿","&iquest;":"¿","&iscr;":"𝒾","&isin;":"∈","&isinE;":"⋹","&isindot;":"⋵","&isins;":"⋴","&isinsv;":"⋳","&isinv;":"∈","&it;":"⁢","&itilde;":"ĩ","&iukcy;":"і","&iuml":"ï","&iuml;":"ï","&jcirc;":"ĵ","&jcy;":"й","&jfr;":"𝔧","&jmath;":"ȷ","&jopf;":"𝕛","&jscr;":"𝒿","&jsercy;":"ј","&jukcy;":"є","&kappa;":"κ","&kappav;":"ϰ","&kcedil;":"ķ","&kcy;":"к","&kfr;":"𝔨","&kgreen;":"ĸ","&khcy;":"х","&kjcy;":"ќ","&kopf;":"𝕜","&kscr;":"𝓀","&lAarr;":"⇚","&lArr;":"⇐","&lAtail;":"⤛","&lBarr;":"⤎","&lE;":"≦","&lEg;":"⪋","&lHar;":"⥢","&lacute;":"ĺ","&laemptyv;":"⦴","&lagran;":"ℒ","&lambda;":"λ","&lang;":"⟨","&langd;":"⦑","&langle;":"⟨","&lap;":"⪅","&laquo":"«","&laquo;":"«","&larr;":"←","&larrb;":"⇤","&larrbfs;":"⤟","&larrfs;":"⤝","&larrhk;":"↩","&larrlp;":"↫","&larrpl;":"⤹","&larrsim;":"⥳","&larrtl;":"↢","&lat;":"⪫","&latail;":"⤙","&late;":"⪭","&lates;":"⪭︀","&lbarr;":"⤌","&lbbrk;":"❲","&lbrace;":"{","&lbrack;":"[","&lbrke;":"⦋","&lbrksld;":"⦏","&lbrkslu;":"⦍","&lcaron;":"ľ","&lcedil;":"ļ","&lceil;":"⌈","&lcub;":"{","&lcy;":"л","&ldca;":"⤶","&ldquo;":"“","&ldquor;":"„","&ldrdhar;":"⥧","&ldrushar;":"⥋","&ldsh;":"↲","&le;":"≤","&leftarrow;":"←","&leftarrowtail;":"↢","&leftharpoondown;":"↽","&leftharpoonup;":"↼","&leftleftarrows;":"⇇","&leftrightarrow;":"↔","&leftrightarrows;":"⇆","&leftrightharpoons;":"⇋","&leftrightsquigarrow;":"↭","&leftthreetimes;":"⋋","&leg;":"⋚","&leq;":"≤","&leqq;":"≦","&leqslant;":"⩽","&les;":"⩽","&lescc;":"⪨","&lesdot;":"⩿","&lesdoto;":"⪁","&lesdotor;":"⪃","&lesg;":"⋚︀","&lesges;":"⪓","&lessapprox;":"⪅","&lessdot;":"⋖","&lesseqgtr;":"⋚","&lesseqqgtr;":"⪋","&lessgtr;":"≶","&lesssim;":"≲","&lfisht;":"⥼","&lfloor;":"⌊","&lfr;":"𝔩","&lg;":"≶","&lgE;":"⪑","&lhard;":"↽","&lharu;":"↼","&lharul;":"⥪","&lhblk;":"▄","&ljcy;":"љ","&ll;":"≪","&llarr;":"⇇","&llcorner;":"⌞","&llhard;":"⥫","&lltri;":"◺","&lmidot;":"ŀ","&lmoust;":"⎰","&lmoustache;":"⎰","&lnE;":"≨","&lnap;":"⪉","&lnapprox;":"⪉","&lne;":"⪇","&lneq;":"⪇","&lneqq;":"≨","&lnsim;":"⋦","&loang;":"⟬","&loarr;":"⇽","&lobrk;":"⟦","&longleftarrow;":"⟵","&longleftrightarrow;":"⟷","&longmapsto;":"⟼","&longrightarrow;":"⟶","&looparrowleft;":"↫","&looparrowright;":"↬","&lopar;":"⦅","&lopf;":"𝕝","&loplus;":"⨭","&lotimes;":"⨴","&lowast;":"∗","&lowbar;":"_","&loz;":"◊","&lozenge;":"◊","&lozf;":"⧫","&lpar;":"(","&lparlt;":"⦓","&lrarr;":"⇆","&lrcorner;":"⌟","&lrhar;":"⇋","&lrhard;":"⥭","&lrm;":"‎","&lrtri;":"⊿","&lsaquo;":"‹","&lscr;":"𝓁","&lsh;":"↰","&lsim;":"≲","&lsime;":"⪍","&lsimg;":"⪏","&lsqb;":"[","&lsquo;":"‘","&lsquor;":"‚","&lstrok;":"ł","&lt":"<","&lt;":"<","&ltcc;":"⪦","&ltcir;":"⩹","&ltdot;":"⋖","&lthree;":"⋋","&ltimes;":"⋉","&ltlarr;":"⥶","&ltquest;":"⩻","&ltrPar;":"⦖","&ltri;":"◃","&ltrie;":"⊴","&ltrif;":"◂","&lurdshar;":"⥊","&luruhar;":"⥦","&lvertneqq;":"≨︀","&lvnE;":"≨︀","&mDDot;":"∺","&macr":"¯","&macr;":"¯","&male;":"♂","&malt;":"✠","&maltese;":"✠","&map;":"↦","&mapsto;":"↦","&mapstodown;":"↧","&mapstoleft;":"↤","&mapstoup;":"↥","&marker;":"▮","&mcomma;":"⨩","&mcy;":"м","&mdash;":"—","&measuredangle;":"∡","&mfr;":"𝔪","&mho;":"℧","&micro":"µ","&micro;":"µ","&mid;":"∣","&midast;":"*","&midcir;":"⫰","&middot":"·","&middot;":"·","&minus;":"−","&minusb;":"⊟","&minusd;":"∸","&minusdu;":"⨪","&mlcp;":"⫛","&mldr;":"…","&mnplus;":"∓","&models;":"⊧","&mopf;":"𝕞","&mp;":"∓","&mscr;":"𝓂","&mstpos;":"∾","&mu;":"μ","&multimap;":"⊸","&mumap;":"⊸","&nGg;":"⋙̸","&nGt;":"≫⃒","&nGtv;":"≫̸","&nLeftarrow;":"⇍","&nLeftrightarrow;":"⇎","&nLl;":"⋘̸","&nLt;":"≪⃒","&nLtv;":"≪̸","&nRightarrow;":"⇏","&nVDash;":"⊯","&nVdash;":"⊮","&nabla;":"∇","&nacute;":"ń","&nang;":"∠⃒","&nap;":"≉","&napE;":"⩰̸","&napid;":"≋̸","&napos;":"ŉ","&napprox;":"≉","&natur;":"♮","&natural;":"♮","&naturals;":"ℕ","&nbsp":" ","&nbsp;":" ","&nbump;":"≎̸","&nbumpe;":"≏̸","&ncap;":"⩃","&ncaron;":"ň","&ncedil;":"ņ","&ncong;":"≇","&ncongdot;":"⩭̸","&ncup;":"⩂","&ncy;":"н","&ndash;":"–","&ne;":"≠","&neArr;":"⇗","&nearhk;":"⤤","&nearr;":"↗","&nearrow;":"↗","&nedot;":"≐̸","&nequiv;":"≢","&nesear;":"⤨","&nesim;":"≂̸","&nexist;":"∄","&nexists;":"∄","&nfr;":"𝔫","&ngE;":"≧̸","&nge;":"≱","&ngeq;":"≱","&ngeqq;":"≧̸","&ngeqslant;":"⩾̸","&nges;":"⩾̸","&ngsim;":"≵","&ngt;":"≯","&ngtr;":"≯","&nhArr;":"⇎","&nharr;":"↮","&nhpar;":"⫲","&ni;":"∋","&nis;":"⋼","&nisd;":"⋺","&niv;":"∋","&njcy;":"њ","&nlArr;":"⇍","&nlE;":"≦̸","&nlarr;":"↚","&nldr;":"‥","&nle;":"≰","&nleftarrow;":"↚","&nleftrightarrow;":"↮","&nleq;":"≰","&nleqq;":"≦̸","&nleqslant;":"⩽̸","&nles;":"⩽̸","&nless;":"≮","&nlsim;":"≴","&nlt;":"≮","&nltri;":"⋪","&nltrie;":"⋬","&nmid;":"∤","&nopf;":"𝕟","&not":"¬","&not;":"¬","&notin;":"∉","&notinE;":"⋹̸","&notindot;":"⋵̸","&notinva;":"∉","&notinvb;":"⋷","&notinvc;":"⋶","&notni;":"∌","&notniva;":"∌","&notnivb;":"⋾","&notnivc;":"⋽","&npar;":"∦","&nparallel;":"∦","&nparsl;":"⫽⃥","&npart;":"∂̸","&npolint;":"⨔","&npr;":"⊀","&nprcue;":"⋠","&npre;":"⪯̸","&nprec;":"⊀","&npreceq;":"⪯̸","&nrArr;":"⇏","&nrarr;":"↛","&nrarrc;":"⤳̸","&nrarrw;":"↝̸","&nrightarrow;":"↛","&nrtri;":"⋫","&nrtrie;":"⋭","&nsc;":"⊁","&nsccue;":"⋡","&nsce;":"⪰̸","&nscr;":"𝓃","&nshortmid;":"∤","&nshortparallel;":"∦","&nsim;":"≁","&nsime;":"≄","&nsimeq;":"≄","&nsmid;":"∤","&nspar;":"∦","&nsqsube;":"⋢","&nsqsupe;":"⋣","&nsub;":"⊄","&nsubE;":"⫅̸","&nsube;":"⊈","&nsubset;":"⊂⃒","&nsubseteq;":"⊈","&nsubseteqq;":"⫅̸","&nsucc;":"⊁","&nsucceq;":"⪰̸","&nsup;":"⊅","&nsupE;":"⫆̸","&nsupe;":"⊉","&nsupset;":"⊃⃒","&nsupseteq;":"⊉","&nsupseteqq;":"⫆̸","&ntgl;":"≹","&ntilde":"ñ","&ntilde;":"ñ","&ntlg;":"≸","&ntriangleleft;":"⋪","&ntrianglelefteq;":"⋬","&ntriangleright;":"⋫","&ntrianglerighteq;":"⋭","&nu;":"ν","&num;":"#","&numero;":"№","&numsp;":" ","&nvDash;":"⊭","&nvHarr;":"⤄","&nvap;":"≍⃒","&nvdash;":"⊬","&nvge;":"≥⃒","&nvgt;":">⃒","&nvinfin;":"⧞","&nvlArr;":"⤂","&nvle;":"≤⃒","&nvlt;":"<⃒","&nvltrie;":"⊴⃒","&nvrArr;":"⤃","&nvrtrie;":"⊵⃒","&nvsim;":"∼⃒","&nwArr;":"⇖","&nwarhk;":"⤣","&nwarr;":"↖","&nwarrow;":"↖","&nwnear;":"⤧","&oS;":"Ⓢ","&oacute":"ó","&oacute;":"ó","&oast;":"⊛","&ocir;":"⊚","&ocirc":"ô","&ocirc;":"ô","&ocy;":"о","&odash;":"⊝","&odblac;":"ő","&odiv;":"⨸","&odot;":"⊙","&odsold;":"⦼","&oelig;":"œ","&ofcir;":"⦿","&ofr;":"𝔬","&ogon;":"˛","&ograve":"ò","&ograve;":"ò","&ogt;":"⧁","&ohbar;":"⦵","&ohm;":"Ω","&oint;":"∮","&olarr;":"↺","&olcir;":"⦾","&olcross;":"⦻","&oline;":"‾","&olt;":"⧀","&omacr;":"ō","&omega;":"ω","&omicron;":"ο","&omid;":"⦶","&ominus;":"⊖","&oopf;":"𝕠","&opar;":"⦷","&operp;":"⦹","&oplus;":"⊕","&or;":"∨","&orarr;":"↻","&ord;":"⩝","&order;":"ℴ","&orderof;":"ℴ","&ordf":"ª","&ordf;":"ª","&ordm":"º","&ordm;":"º","&origof;":"⊶","&oror;":"⩖","&orslope;":"⩗","&orv;":"⩛","&oscr;":"ℴ","&oslash":"ø","&oslash;":"ø","&osol;":"⊘","&otilde":"õ","&otilde;":"õ","&otimes;":"⊗","&otimesas;":"⨶","&ouml":"ö","&ouml;":"ö","&ovbar;":"⌽","&par;":"∥","&para":"¶","&para;":"¶","&parallel;":"∥","&parsim;":"⫳","&parsl;":"⫽","&part;":"∂","&pcy;":"п","&percnt;":"%","&period;":".","&permil;":"‰","&perp;":"⊥","&pertenk;":"‱","&pfr;":"𝔭","&phi;":"φ","&phiv;":"ϕ","&phmmat;":"ℳ","&phone;":"☎","&pi;":"π","&pitchfork;":"⋔","&piv;":"ϖ","&planck;":"ℏ","&planckh;":"ℎ","&plankv;":"ℏ","&plus;":"+","&plusacir;":"⨣","&plusb;":"⊞","&pluscir;":"⨢","&plusdo;":"∔","&plusdu;":"⨥","&pluse;":"⩲","&plusmn":"±","&plusmn;":"±","&plussim;":"⨦","&plustwo;":"⨧","&pm;":"±","&pointint;":"⨕","&popf;":"𝕡","&pound":"£","&pound;":"£","&pr;":"≺","&prE;":"⪳","&prap;":"⪷","&prcue;":"≼","&pre;":"⪯","&prec;":"≺","&precapprox;":"⪷","&preccurlyeq;":"≼","&preceq;":"⪯","&precnapprox;":"⪹","&precneqq;":"⪵","&precnsim;":"⋨","&precsim;":"≾","&prime;":"′","&primes;":"ℙ","&prnE;":"⪵","&prnap;":"⪹","&prnsim;":"⋨","&prod;":"∏","&profalar;":"⌮","&profline;":"⌒","&profsurf;":"⌓","&prop;":"∝","&propto;":"∝","&prsim;":"≾","&prurel;":"⊰","&pscr;":"𝓅","&psi;":"ψ","&puncsp;":" ","&qfr;":"𝔮","&qint;":"⨌","&qopf;":"𝕢","&qprime;":"⁗","&qscr;":"𝓆","&quaternions;":"ℍ","&quatint;":"⨖","&quest;":"?","&questeq;":"≟","&quot":'"',"&quot;":'"',"&rAarr;":"⇛","&rArr;":"⇒","&rAtail;":"⤜","&rBarr;":"⤏","&rHar;":"⥤","&race;":"∽̱","&racute;":"ŕ","&radic;":"√","&raemptyv;":"⦳","&rang;":"⟩","&rangd;":"⦒","&range;":"⦥","&rangle;":"⟩","&raquo":"»","&raquo;":"»","&rarr;":"→","&rarrap;":"⥵","&rarrb;":"⇥","&rarrbfs;":"⤠","&rarrc;":"⤳","&rarrfs;":"⤞","&rarrhk;":"↪","&rarrlp;":"↬","&rarrpl;":"⥅","&rarrsim;":"⥴","&rarrtl;":"↣","&rarrw;":"↝","&ratail;":"⤚","&ratio;":"∶","&rationals;":"ℚ","&rbarr;":"⤍","&rbbrk;":"❳","&rbrace;":"}","&rbrack;":"]","&rbrke;":"⦌","&rbrksld;":"⦎","&rbrkslu;":"⦐","&rcaron;":"ř","&rcedil;":"ŗ","&rceil;":"⌉","&rcub;":"}","&rcy;":"р","&rdca;":"⤷","&rdldhar;":"⥩","&rdquo;":"”","&rdquor;":"”","&rdsh;":"↳","&real;":"ℜ","&realine;":"ℛ","&realpart;":"ℜ","&reals;":"ℝ","&rect;":"▭","&reg":"®","&reg;":"®","&rfisht;":"⥽","&rfloor;":"⌋","&rfr;":"𝔯","&rhard;":"⇁","&rharu;":"⇀","&rharul;":"⥬","&rho;":"ρ","&rhov;":"ϱ","&rightarrow;":"→","&rightarrowtail;":"↣","&rightharpoondown;":"⇁","&rightharpoonup;":"⇀","&rightleftarrows;":"⇄","&rightleftharpoons;":"⇌","&rightrightarrows;":"⇉","&rightsquigarrow;":"↝","&rightthreetimes;":"⋌","&ring;":"˚","&risingdotseq;":"≓","&rlarr;":"⇄","&rlhar;":"⇌","&rlm;":"‏","&rmoust;":"⎱","&rmoustache;":"⎱","&rnmid;":"⫮","&roang;":"⟭","&roarr;":"⇾","&robrk;":"⟧","&ropar;":"⦆","&ropf;":"𝕣","&roplus;":"⨮","&rotimes;":"⨵","&rpar;":")","&rpargt;":"⦔","&rppolint;":"⨒","&rrarr;":"⇉","&rsaquo;":"›","&rscr;":"𝓇","&rsh;":"↱","&rsqb;":"]","&rsquo;":"’","&rsquor;":"’","&rthree;":"⋌","&rtimes;":"⋊","&rtri;":"▹","&rtrie;":"⊵","&rtrif;":"▸","&rtriltri;":"⧎","&ruluhar;":"⥨","&rx;":"℞","&sacute;":"ś","&sbquo;":"‚","&sc;":"≻","&scE;":"⪴","&scap;":"⪸","&scaron;":"š","&sccue;":"≽","&sce;":"⪰","&scedil;":"ş","&scirc;":"ŝ","&scnE;":"⪶","&scnap;":"⪺","&scnsim;":"⋩","&scpolint;":"⨓","&scsim;":"≿","&scy;":"с","&sdot;":"⋅","&sdotb;":"⊡","&sdote;":"⩦","&seArr;":"⇘","&searhk;":"⤥","&searr;":"↘","&searrow;":"↘","&sect":"§","&sect;":"§","&semi;":";","&seswar;":"⤩","&setminus;":"∖","&setmn;":"∖","&sext;":"✶","&sfr;":"𝔰","&sfrown;":"⌢","&sharp;":"♯","&shchcy;":"щ","&shcy;":"ш","&shortmid;":"∣","&shortparallel;":"∥","&shy":"­","&shy;":"­","&sigma;":"σ","&sigmaf;":"ς","&sigmav;":"ς","&sim;":"∼","&simdot;":"⩪","&sime;":"≃","&simeq;":"≃","&simg;":"⪞","&simgE;":"⪠","&siml;":"⪝","&simlE;":"⪟","&simne;":"≆","&simplus;":"⨤","&simrarr;":"⥲","&slarr;":"←","&smallsetminus;":"∖","&smashp;":"⨳","&smeparsl;":"⧤","&smid;":"∣","&smile;":"⌣","&smt;":"⪪","&smte;":"⪬","&smtes;":"⪬︀","&softcy;":"ь","&sol;":"/","&solb;":"⧄","&solbar;":"⌿","&sopf;":"𝕤","&spades;":"♠","&spadesuit;":"♠","&spar;":"∥","&sqcap;":"⊓","&sqcaps;":"⊓︀","&sqcup;":"⊔","&sqcups;":"⊔︀","&sqsub;":"⊏","&sqsube;":"⊑","&sqsubset;":"⊏","&sqsubseteq;":"⊑","&sqsup;":"⊐","&sqsupe;":"⊒","&sqsupset;":"⊐","&sqsupseteq;":"⊒","&squ;":"□","&square;":"□","&squarf;":"▪","&squf;":"▪","&srarr;":"→","&sscr;":"𝓈","&ssetmn;":"∖","&ssmile;":"⌣","&sstarf;":"⋆","&star;":"☆","&starf;":"★","&straightepsilon;":"ϵ","&straightphi;":"ϕ","&strns;":"¯","&sub;":"⊂","&subE;":"⫅","&subdot;":"⪽","&sube;":"⊆","&subedot;":"⫃","&submult;":"⫁","&subnE;":"⫋","&subne;":"⊊","&subplus;":"⪿","&subrarr;":"⥹","&subset;":"⊂","&subseteq;":"⊆","&subseteqq;":"⫅","&subsetneq;":"⊊","&subsetneqq;":"⫋","&subsim;":"⫇","&subsub;":"⫕","&subsup;":"⫓","&succ;":"≻","&succapprox;":"⪸","&succcurlyeq;":"≽","&succeq;":"⪰","&succnapprox;":"⪺","&succneqq;":"⪶","&succnsim;":"⋩","&succsim;":"≿","&sum;":"∑","&sung;":"♪","&sup1":"¹","&sup1;":"¹","&sup2":"²","&sup2;":"²","&sup3":"³","&sup3;":"³","&sup;":"⊃","&supE;":"⫆","&supdot;":"⪾","&supdsub;":"⫘","&supe;":"⊇","&supedot;":"⫄","&suphsol;":"⟉","&suphsub;":"⫗","&suplarr;":"⥻","&supmult;":"⫂","&supnE;":"⫌","&supne;":"⊋","&supplus;":"⫀","&supset;":"⊃","&supseteq;":"⊇","&supseteqq;":"⫆","&supsetneq;":"⊋","&supsetneqq;":"⫌","&supsim;":"⫈","&supsub;":"⫔","&supsup;":"⫖","&swArr;":"⇙","&swarhk;":"⤦","&swarr;":"↙","&swarrow;":"↙","&swnwar;":"⤪","&szlig":"ß","&szlig;":"ß","&target;":"⌖","&tau;":"τ","&tbrk;":"⎴","&tcaron;":"ť","&tcedil;":"ţ","&tcy;":"т","&tdot;":"⃛","&telrec;":"⌕","&tfr;":"𝔱","&there4;":"∴","&therefore;":"∴","&theta;":"θ","&thetasym;":"ϑ","&thetav;":"ϑ","&thickapprox;":"≈","&thicksim;":"∼","&thinsp;":" ","&thkap;":"≈","&thksim;":"∼","&thorn":"þ","&thorn;":"þ","&tilde;":"˜","&times":"×","&times;":"×","&timesb;":"⊠","&timesbar;":"⨱","&timesd;":"⨰","&tint;":"∭","&toea;":"⤨","&top;":"⊤","&topbot;":"⌶","&topcir;":"⫱","&topf;":"𝕥","&topfork;":"⫚","&tosa;":"⤩","&tprime;":"‴","&trade;":"™","&triangle;":"▵","&triangledown;":"▿","&triangleleft;":"◃","&trianglelefteq;":"⊴","&triangleq;":"≜","&triangleright;":"▹","&trianglerighteq;":"⊵","&tridot;":"◬","&trie;":"≜","&triminus;":"⨺","&triplus;":"⨹","&trisb;":"⧍","&tritime;":"⨻","&trpezium;":"⏢","&tscr;":"𝓉","&tscy;":"ц","&tshcy;":"ћ","&tstrok;":"ŧ","&twixt;":"≬","&twoheadleftarrow;":"↞","&twoheadrightarrow;":"↠","&uArr;":"⇑","&uHar;":"⥣","&uacute":"ú","&uacute;":"ú","&uarr;":"↑","&ubrcy;":"ў","&ubreve;":"ŭ","&ucirc":"û","&ucirc;":"û","&ucy;":"у","&udarr;":"⇅","&udblac;":"ű","&udhar;":"⥮","&ufisht;":"⥾","&ufr;":"𝔲","&ugrave":"ù","&ugrave;":"ù","&uharl;":"↿","&uharr;":"↾","&uhblk;":"▀","&ulcorn;":"⌜","&ulcorner;":"⌜","&ulcrop;":"⌏","&ultri;":"◸","&umacr;":"ū","&uml":"¨","&uml;":"¨","&uogon;":"ų","&uopf;":"𝕦","&uparrow;":"↑","&updownarrow;":"↕","&upharpoonleft;":"↿","&upharpoonright;":"↾","&uplus;":"⊎","&upsi;":"υ","&upsih;":"ϒ","&upsilon;":"υ","&upuparrows;":"⇈","&urcorn;":"⌝","&urcorner;":"⌝","&urcrop;":"⌎","&uring;":"ů","&urtri;":"◹","&uscr;":"𝓊","&utdot;":"⋰","&utilde;":"ũ","&utri;":"▵","&utrif;":"▴","&uuarr;":"⇈","&uuml":"ü","&uuml;":"ü","&uwangle;":"⦧","&vArr;":"⇕","&vBar;":"⫨","&vBarv;":"⫩","&vDash;":"⊨","&vangrt;":"⦜","&varepsilon;":"ϵ","&varkappa;":"ϰ","&varnothing;":"∅","&varphi;":"ϕ","&varpi;":"ϖ","&varpropto;":"∝","&varr;":"↕","&varrho;":"ϱ","&varsigma;":"ς","&varsubsetneq;":"⊊︀","&varsubsetneqq;":"⫋︀","&varsupsetneq;":"⊋︀","&varsupsetneqq;":"⫌︀","&vartheta;":"ϑ","&vartriangleleft;":"⊲","&vartriangleright;":"⊳","&vcy;":"в","&vdash;":"⊢","&vee;":"∨","&veebar;":"⊻","&veeeq;":"≚","&vellip;":"⋮","&verbar;":"|","&vert;":"|","&vfr;":"𝔳","&vltri;":"⊲","&vnsub;":"⊂⃒","&vnsup;":"⊃⃒","&vopf;":"𝕧","&vprop;":"∝","&vrtri;":"⊳","&vscr;":"𝓋","&vsubnE;":"⫋︀","&vsubne;":"⊊︀","&vsupnE;":"⫌︀","&vsupne;":"⊋︀","&vzigzag;":"⦚","&wcirc;":"ŵ","&wedbar;":"⩟","&wedge;":"∧","&wedgeq;":"≙","&weierp;":"℘","&wfr;":"𝔴","&wopf;":"𝕨","&wp;":"℘","&wr;":"≀","&wreath;":"≀","&wscr;":"𝓌","&xcap;":"⋂","&xcirc;":"◯","&xcup;":"⋃","&xdtri;":"▽","&xfr;":"𝔵","&xhArr;":"⟺","&xharr;":"⟷","&xi;":"ξ","&xlArr;":"⟸","&xlarr;":"⟵","&xmap;":"⟼","&xnis;":"⋻","&xodot;":"⨀","&xopf;":"𝕩","&xoplus;":"⨁","&xotime;":"⨂","&xrArr;":"⟹","&xrarr;":"⟶","&xscr;":"𝓍","&xsqcup;":"⨆","&xuplus;":"⨄","&xutri;":"△","&xvee;":"⋁","&xwedge;":"⋀","&yacute":"ý","&yacute;":"ý","&yacy;":"я","&ycirc;":"ŷ","&ycy;":"ы","&yen":"¥","&yen;":"¥","&yfr;":"𝔶","&yicy;":"ї","&yopf;":"𝕪","&yscr;":"𝓎","&yucy;":"ю","&yuml":"ÿ","&yuml;":"ÿ","&zacute;":"ź","&zcaron;":"ž","&zcy;":"з","&zdot;":"ż","&zeetrf;":"ℨ","&zeta;":"ζ","&zfr;":"𝔷","&zhcy;":"ж","&zigrarr;":"⇝","&zopf;":"𝕫","&zscr;":"𝓏","&zwj;":"‍","&zwnj;":"‌"},characters:{"Æ":"&AElig;","&":"&amp;","Á":"&Aacute;","Ă":"&Abreve;","Â":"&Acirc;","А":"&Acy;","𝔄":"&Afr;","À":"&Agrave;","Α":"&Alpha;","Ā":"&Amacr;","⩓":"&And;","Ą":"&Aogon;","𝔸":"&Aopf;","⁡":"&af;","Å":"&angst;","𝒜":"&Ascr;","≔":"&coloneq;","Ã":"&Atilde;","Ä":"&Auml;","∖":"&ssetmn;","⫧":"&Barv;","⌆":"&doublebarwedge;","Б":"&Bcy;","∵":"&because;","ℬ":"&bernou;","Β":"&Beta;","𝔅":"&Bfr;","𝔹":"&Bopf;","˘":"&breve;","≎":"&bump;","Ч":"&CHcy;","©":"&copy;","Ć":"&Cacute;","⋒":"&Cap;","ⅅ":"&DD;","ℭ":"&Cfr;","Č":"&Ccaron;","Ç":"&Ccedil;","Ĉ":"&Ccirc;","∰":"&Cconint;","Ċ":"&Cdot;","¸":"&cedil;","·":"&middot;","Χ":"&Chi;","⊙":"&odot;","⊖":"&ominus;","⊕":"&oplus;","⊗":"&otimes;","∲":"&cwconint;","”":"&rdquor;","’":"&rsquor;","∷":"&Proportion;","⩴":"&Colone;","≡":"&equiv;","∯":"&DoubleContourIntegral;","∮":"&oint;","ℂ":"&complexes;","∐":"&coprod;","∳":"&awconint;","⨯":"&Cross;","𝒞":"&Cscr;","⋓":"&Cup;","≍":"&asympeq;","⤑":"&DDotrahd;","Ђ":"&DJcy;","Ѕ":"&DScy;","Џ":"&DZcy;","‡":"&ddagger;","↡":"&Darr;","⫤":"&DoubleLeftTee;","Ď":"&Dcaron;","Д":"&Dcy;","∇":"&nabla;","Δ":"&Delta;","𝔇":"&Dfr;","´":"&acute;","˙":"&dot;","˝":"&dblac;","`":"&grave;","˜":"&tilde;","⋄":"&diamond;","ⅆ":"&dd;","𝔻":"&Dopf;","¨":"&uml;","⃜":"&DotDot;","≐":"&esdot;","⇓":"&dArr;","⇐":"&lArr;","⇔":"&iff;","⟸":"&xlArr;","⟺":"&xhArr;","⟹":"&xrArr;","⇒":"&rArr;","⊨":"&vDash;","⇑":"&uArr;","⇕":"&vArr;","∥":"&spar;","↓":"&downarrow;","⤓":"&DownArrowBar;","⇵":"&duarr;","̑":"&DownBreve;","⥐":"&DownLeftRightVector;","⥞":"&DownLeftTeeVector;","↽":"&lhard;","⥖":"&DownLeftVectorBar;","⥟":"&DownRightTeeVector;","⇁":"&rightharpoondown;","⥗":"&DownRightVectorBar;","⊤":"&top;","↧":"&mapstodown;","𝒟":"&Dscr;","Đ":"&Dstrok;","Ŋ":"&ENG;","Ð":"&ETH;","É":"&Eacute;","Ě":"&Ecaron;","Ê":"&Ecirc;","Э":"&Ecy;","Ė":"&Edot;","𝔈":"&Efr;","È":"&Egrave;","∈":"&isinv;","Ē":"&Emacr;","◻":"&EmptySmallSquare;","▫":"&EmptyVerySmallSquare;","Ę":"&Eogon;","𝔼":"&Eopf;","Ε":"&Epsilon;","⩵":"&Equal;","≂":"&esim;","⇌":"&rlhar;","ℰ":"&expectation;","⩳":"&Esim;","Η":"&Eta;","Ë":"&Euml;","∃":"&exist;","ⅇ":"&exponentiale;","Ф":"&Fcy;","𝔉":"&Ffr;","◼":"&FilledSmallSquare;","▪":"&squf;","𝔽":"&Fopf;","∀":"&forall;","ℱ":"&Fscr;","Ѓ":"&GJcy;",">":"&gt;","Γ":"&Gamma;","Ϝ":"&Gammad;","Ğ":"&Gbreve;","Ģ":"&Gcedil;","Ĝ":"&Gcirc;","Г":"&Gcy;","Ġ":"&Gdot;","𝔊":"&Gfr;","⋙":"&ggg;","𝔾":"&Gopf;","≥":"&geq;","⋛":"&gtreqless;","≧":"&geqq;","⪢":"&GreaterGreater;","≷":"&gtrless;","⩾":"&ges;","≳":"&gtrsim;","𝒢":"&Gscr;","≫":"&gg;","Ъ":"&HARDcy;","ˇ":"&caron;","^":"&Hat;","Ĥ":"&Hcirc;","ℌ":"&Poincareplane;","ℋ":"&hamilt;","ℍ":"&quaternions;","─":"&boxh;","Ħ":"&Hstrok;","≏":"&bumpeq;","Е":"&IEcy;","Ĳ":"&IJlig;","Ё":"&IOcy;","Í":"&Iacute;","Î":"&Icirc;","И":"&Icy;","İ":"&Idot;","ℑ":"&imagpart;","Ì":"&Igrave;","Ī":"&Imacr;","ⅈ":"&ii;","∬":"&Int;","∫":"&int;","⋂":"&xcap;","⁣":"&ic;","⁢":"&it;","Į":"&Iogon;","𝕀":"&Iopf;","Ι":"&Iota;","ℐ":"&imagline;","Ĩ":"&Itilde;","І":"&Iukcy;","Ï":"&Iuml;","Ĵ":"&Jcirc;","Й":"&Jcy;","𝔍":"&Jfr;","𝕁":"&Jopf;","𝒥":"&Jscr;","Ј":"&Jsercy;","Є":"&Jukcy;","Х":"&KHcy;","Ќ":"&KJcy;","Κ":"&Kappa;","Ķ":"&Kcedil;","К":"&Kcy;","𝔎":"&Kfr;","𝕂":"&Kopf;","𝒦":"&Kscr;","Љ":"&LJcy;","<":"&lt;","Ĺ":"&Lacute;","Λ":"&Lambda;","⟪":"&Lang;","ℒ":"&lagran;","↞":"&twoheadleftarrow;","Ľ":"&Lcaron;","Ļ":"&Lcedil;","Л":"&Lcy;","⟨":"&langle;","←":"&slarr;","⇤":"&larrb;","⇆":"&lrarr;","⌈":"&lceil;","⟦":"&lobrk;","⥡":"&LeftDownTeeVector;","⇃":"&downharpoonleft;","⥙":"&LeftDownVectorBar;","⌊":"&lfloor;","↔":"&leftrightarrow;","⥎":"&LeftRightVector;","⊣":"&dashv;","↤":"&mapstoleft;","⥚":"&LeftTeeVector;","⊲":"&vltri;","⧏":"&LeftTriangleBar;","⊴":"&trianglelefteq;","⥑":"&LeftUpDownVector;","⥠":"&LeftUpTeeVector;","↿":"&upharpoonleft;","⥘":"&LeftUpVectorBar;","↼":"&lharu;","⥒":"&LeftVectorBar;","⋚":"&lesseqgtr;","≦":"&leqq;","≶":"&lg;","⪡":"&LessLess;","⩽":"&les;","≲":"&lsim;","𝔏":"&Lfr;","⋘":"&Ll;","⇚":"&lAarr;","Ŀ":"&Lmidot;","⟵":"&xlarr;","⟷":"&xharr;","⟶":"&xrarr;","𝕃":"&Lopf;","↙":"&swarrow;","↘":"&searrow;","↰":"&lsh;","Ł":"&Lstrok;","≪":"&ll;","⤅":"&Map;","М":"&Mcy;"," ":"&MediumSpace;","ℳ":"&phmmat;","𝔐":"&Mfr;","∓":"&mp;","𝕄":"&Mopf;","Μ":"&Mu;","Њ":"&NJcy;","Ń":"&Nacute;","Ň":"&Ncaron;","Ņ":"&Ncedil;","Н":"&Ncy;","​":"&ZeroWidthSpace;","\n":"&NewLine;","𝔑":"&Nfr;","⁠":"&NoBreak;"," ":"&nbsp;","ℕ":"&naturals;","⫬":"&Not;","≢":"&nequiv;","≭":"&NotCupCap;","∦":"&nspar;","∉":"&notinva;","≠":"&ne;","≂̸":"&nesim;","∄":"&nexists;","≯":"&ngtr;","≱":"&ngeq;","≧̸":"&ngeqq;","≫̸":"&nGtv;","≹":"&ntgl;","⩾̸":"&nges;","≵":"&ngsim;","≎̸":"&nbump;","≏̸":"&nbumpe;","⋪":"&ntriangleleft;","⧏̸":"&NotLeftTriangleBar;","⋬":"&ntrianglelefteq;","≮":"&nlt;","≰":"&nleq;","≸":"&ntlg;","≪̸":"&nLtv;","⩽̸":"&nles;","≴":"&nlsim;","⪢̸":"&NotNestedGreaterGreater;","⪡̸":"&NotNestedLessLess;","⊀":"&nprec;","⪯̸":"&npreceq;","⋠":"&nprcue;","∌":"&notniva;","⋫":"&ntriangleright;","⧐̸":"&NotRightTriangleBar;","⋭":"&ntrianglerighteq;","⊏̸":"&NotSquareSubset;","⋢":"&nsqsube;","⊐̸":"&NotSquareSuperset;","⋣":"&nsqsupe;","⊂⃒":"&vnsub;","⊈":"&nsubseteq;","⊁":"&nsucc;","⪰̸":"&nsucceq;","⋡":"&nsccue;","≿̸":"&NotSucceedsTilde;","⊃⃒":"&vnsup;","⊉":"&nsupseteq;","≁":"&nsim;","≄":"&nsimeq;","≇":"&ncong;","≉":"&napprox;","∤":"&nsmid;","𝒩":"&Nscr;","Ñ":"&Ntilde;","Ν":"&Nu;","Œ":"&OElig;","Ó":"&Oacute;","Ô":"&Ocirc;","О":"&Ocy;","Ő":"&Odblac;","𝔒":"&Ofr;","Ò":"&Ograve;","Ō":"&Omacr;","Ω":"&ohm;","Ο":"&Omicron;","𝕆":"&Oopf;","“":"&ldquo;","‘":"&lsquo;","⩔":"&Or;","𝒪":"&Oscr;","Ø":"&Oslash;","Õ":"&Otilde;","⨷":"&Otimes;","Ö":"&Ouml;","‾":"&oline;","⏞":"&OverBrace;","⎴":"&tbrk;","⏜":"&OverParenthesis;","∂":"&part;","П":"&Pcy;","𝔓":"&Pfr;","Φ":"&Phi;","Π":"&Pi;","±":"&pm;","ℙ":"&primes;","⪻":"&Pr;","≺":"&prec;","⪯":"&preceq;","≼":"&preccurlyeq;","≾":"&prsim;","″":"&Prime;","∏":"&prod;","∝":"&vprop;","𝒫":"&Pscr;","Ψ":"&Psi;",'"':"&quot;","𝔔":"&Qfr;","ℚ":"&rationals;","𝒬":"&Qscr;","⤐":"&drbkarow;","®":"&reg;","Ŕ":"&Racute;","⟫":"&Rang;","↠":"&twoheadrightarrow;","⤖":"&Rarrtl;","Ř":"&Rcaron;","Ŗ":"&Rcedil;","Р":"&Rcy;","ℜ":"&realpart;","∋":"&niv;","⇋":"&lrhar;","⥯":"&duhar;","Ρ":"&Rho;","⟩":"&rangle;","→":"&srarr;","⇥":"&rarrb;","⇄":"&rlarr;","⌉":"&rceil;","⟧":"&robrk;","⥝":"&RightDownTeeVector;","⇂":"&downharpoonright;","⥕":"&RightDownVectorBar;","⌋":"&rfloor;","⊢":"&vdash;","↦":"&mapsto;","⥛":"&RightTeeVector;","⊳":"&vrtri;","⧐":"&RightTriangleBar;","⊵":"&trianglerighteq;","⥏":"&RightUpDownVector;","⥜":"&RightUpTeeVector;","↾":"&upharpoonright;","⥔":"&RightUpVectorBar;","⇀":"&rightharpoonup;","⥓":"&RightVectorBar;","ℝ":"&reals;","⥰":"&RoundImplies;","⇛":"&rAarr;","ℛ":"&realine;","↱":"&rsh;","⧴":"&RuleDelayed;","Щ":"&SHCHcy;","Ш":"&SHcy;","Ь":"&SOFTcy;","Ś":"&Sacute;","⪼":"&Sc;","Š":"&Scaron;","Ş":"&Scedil;","Ŝ":"&Scirc;","С":"&Scy;","𝔖":"&Sfr;","↑":"&uparrow;","Σ":"&Sigma;","∘":"&compfn;","𝕊":"&Sopf;","√":"&radic;","□":"&square;","⊓":"&sqcap;","⊏":"&sqsubset;","⊑":"&sqsubseteq;","⊐":"&sqsupset;","⊒":"&sqsupseteq;","⊔":"&sqcup;","𝒮":"&Sscr;","⋆":"&sstarf;","⋐":"&Subset;","⊆":"&subseteq;","≻":"&succ;","⪰":"&succeq;","≽":"&succcurlyeq;","≿":"&succsim;","∑":"&sum;","⋑":"&Supset;","⊃":"&supset;","⊇":"&supseteq;","Þ":"&THORN;","™":"&trade;","Ћ":"&TSHcy;","Ц":"&TScy;","\t":"&Tab;","Τ":"&Tau;","Ť":"&Tcaron;","Ţ":"&Tcedil;","Т":"&Tcy;","𝔗":"&Tfr;","∴":"&therefore;","Θ":"&Theta;","  ":"&ThickSpace;"," ":"&thinsp;","∼":"&thksim;","≃":"&simeq;","≅":"&cong;","≈":"&thkap;","𝕋":"&Topf;","⃛":"&tdot;","𝒯":"&Tscr;","Ŧ":"&Tstrok;","Ú":"&Uacute;","↟":"&Uarr;","⥉":"&Uarrocir;","Ў":"&Ubrcy;","Ŭ":"&Ubreve;","Û":"&Ucirc;","У":"&Ucy;","Ű":"&Udblac;","𝔘":"&Ufr;","Ù":"&Ugrave;","Ū":"&Umacr;",_:"&lowbar;","⏟":"&UnderBrace;","⎵":"&bbrk;","⏝":"&UnderParenthesis;","⋃":"&xcup;","⊎":"&uplus;","Ų":"&Uogon;","𝕌":"&Uopf;","⤒":"&UpArrowBar;","⇅":"&udarr;","↕":"&varr;","⥮":"&udhar;","⊥":"&perp;","↥":"&mapstoup;","↖":"&nwarrow;","↗":"&nearrow;","ϒ":"&upsih;","Υ":"&Upsilon;","Ů":"&Uring;","𝒰":"&Uscr;","Ũ":"&Utilde;","Ü":"&Uuml;","⊫":"&VDash;","⫫":"&Vbar;","В":"&Vcy;","⊩":"&Vdash;","⫦":"&Vdashl;","⋁":"&xvee;","‖":"&Vert;","∣":"&smid;","|":"&vert;","❘":"&VerticalSeparator;","≀":"&wreath;"," ":"&hairsp;","𝔙":"&Vfr;","𝕍":"&Vopf;","𝒱":"&Vscr;","⊪":"&Vvdash;","Ŵ":"&Wcirc;","⋀":"&xwedge;","𝔚":"&Wfr;","𝕎":"&Wopf;","𝒲":"&Wscr;","𝔛":"&Xfr;","Ξ":"&Xi;","𝕏":"&Xopf;","𝒳":"&Xscr;","Я":"&YAcy;","Ї":"&YIcy;","Ю":"&YUcy;","Ý":"&Yacute;","Ŷ":"&Ycirc;","Ы":"&Ycy;","𝔜":"&Yfr;","𝕐":"&Yopf;","𝒴":"&Yscr;","Ÿ":"&Yuml;","Ж":"&ZHcy;","Ź":"&Zacute;","Ž":"&Zcaron;","З":"&Zcy;","Ż":"&Zdot;","Ζ":"&Zeta;","ℨ":"&zeetrf;","ℤ":"&integers;","𝒵":"&Zscr;","á":"&aacute;","ă":"&abreve;","∾":"&mstpos;","∾̳":"&acE;","∿":"&acd;","â":"&acirc;","а":"&acy;","æ":"&aelig;","𝔞":"&afr;","à":"&agrave;","ℵ":"&aleph;","α":"&alpha;","ā":"&amacr;","⨿":"&amalg;","∧":"&wedge;","⩕":"&andand;","⩜":"&andd;","⩘":"&andslope;","⩚":"&andv;","∠":"&angle;","⦤":"&ange;","∡":"&measuredangle;","⦨":"&angmsdaa;","⦩":"&angmsdab;","⦪":"&angmsdac;","⦫":"&angmsdad;","⦬":"&angmsdae;","⦭":"&angmsdaf;","⦮":"&angmsdag;","⦯":"&angmsdah;","∟":"&angrt;","⊾":"&angrtvb;","⦝":"&angrtvbd;","∢":"&angsph;","⍼":"&angzarr;","ą":"&aogon;","𝕒":"&aopf;","⩰":"&apE;","⩯":"&apacir;","≊":"&approxeq;","≋":"&apid;","'":"&apos;","å":"&aring;","𝒶":"&ascr;","*":"&midast;","ã":"&atilde;","ä":"&auml;","⨑":"&awint;","⫭":"&bNot;","≌":"&bcong;","϶":"&bepsi;","‵":"&bprime;","∽":"&bsim;","⋍":"&bsime;","⊽":"&barvee;","⌅":"&barwedge;","⎶":"&bbrktbrk;","б":"&bcy;","„":"&ldquor;","⦰":"&bemptyv;","β":"&beta;","ℶ":"&beth;","≬":"&twixt;","𝔟":"&bfr;","◯":"&xcirc;","⨀":"&xodot;","⨁":"&xoplus;","⨂":"&xotime;","⨆":"&xsqcup;","★":"&starf;","▽":"&xdtri;","△":"&xutri;","⨄":"&xuplus;","⤍":"&rbarr;","⧫":"&lozf;","▴":"&utrif;","▾":"&dtrif;","◂":"&ltrif;","▸":"&rtrif;","␣":"&blank;","▒":"&blk12;","░":"&blk14;","▓":"&blk34;","█":"&block;","=⃥":"&bne;","≡⃥":"&bnequiv;","⌐":"&bnot;","𝕓":"&bopf;","⋈":"&bowtie;","╗":"&boxDL;","╔":"&boxDR;","╖":"&boxDl;","╓":"&boxDr;","═":"&boxH;","╦":"&boxHD;","╩":"&boxHU;","╤":"&boxHd;","╧":"&boxHu;","╝":"&boxUL;","╚":"&boxUR;","╜":"&boxUl;","╙":"&boxUr;","║":"&boxV;","╬":"&boxVH;","╣":"&boxVL;","╠":"&boxVR;","╫":"&boxVh;","╢":"&boxVl;","╟":"&boxVr;","⧉":"&boxbox;","╕":"&boxdL;","╒":"&boxdR;","┐":"&boxdl;","┌":"&boxdr;","╥":"&boxhD;","╨":"&boxhU;","┬":"&boxhd;","┴":"&boxhu;","⊟":"&minusb;","⊞":"&plusb;","⊠":"&timesb;","╛":"&boxuL;","╘":"&boxuR;","┘":"&boxul;","└":"&boxur;","│":"&boxv;","╪":"&boxvH;","╡":"&boxvL;","╞":"&boxvR;","┼":"&boxvh;","┤":"&boxvl;","├":"&boxvr;","¦":"&brvbar;","𝒷":"&bscr;","⁏":"&bsemi;","\\":"&bsol;","⧅":"&bsolb;","⟈":"&bsolhsub;","•":"&bullet;","⪮":"&bumpE;","ć":"&cacute;","∩":"&cap;","⩄":"&capand;","⩉":"&capbrcup;","⩋":"&capcap;","⩇":"&capcup;","⩀":"&capdot;","∩︀":"&caps;","⁁":"&caret;","⩍":"&ccaps;","č":"&ccaron;","ç":"&ccedil;","ĉ":"&ccirc;","⩌":"&ccups;","⩐":"&ccupssm;","ċ":"&cdot;","⦲":"&cemptyv;","¢":"&cent;","𝔠":"&cfr;","ч":"&chcy;","✓":"&checkmark;","χ":"&chi;","○":"&cir;","⧃":"&cirE;","ˆ":"&circ;","≗":"&cire;","↺":"&olarr;","↻":"&orarr;","Ⓢ":"&oS;","⊛":"&oast;","⊚":"&ocir;","⊝":"&odash;","⨐":"&cirfnint;","⫯":"&cirmid;","⧂":"&cirscir;","♣":"&clubsuit;",":":"&colon;",",":"&comma;","@":"&commat;","∁":"&complement;","⩭":"&congdot;","𝕔":"&copf;","℗":"&copysr;","↵":"&crarr;","✗":"&cross;","𝒸":"&cscr;","⫏":"&csub;","⫑":"&csube;","⫐":"&csup;","⫒":"&csupe;","⋯":"&ctdot;","⤸":"&cudarrl;","⤵":"&cudarrr;","⋞":"&curlyeqprec;","⋟":"&curlyeqsucc;","↶":"&curvearrowleft;","⤽":"&cularrp;","∪":"&cup;","⩈":"&cupbrcap;","⩆":"&cupcap;","⩊":"&cupcup;","⊍":"&cupdot;","⩅":"&cupor;","∪︀":"&cups;","↷":"&curvearrowright;","⤼":"&curarrm;","⋎":"&cuvee;","⋏":"&cuwed;","¤":"&curren;","∱":"&cwint;","⌭":"&cylcty;","⥥":"&dHar;","†":"&dagger;","ℸ":"&daleth;","‐":"&hyphen;","⤏":"&rBarr;","ď":"&dcaron;","д":"&dcy;","⇊":"&downdownarrows;","⩷":"&eDDot;","°":"&deg;","δ":"&delta;","⦱":"&demptyv;","⥿":"&dfisht;","𝔡":"&dfr;","♦":"&diams;","ϝ":"&gammad;","⋲":"&disin;","÷":"&divide;","⋇":"&divonx;","ђ":"&djcy;","⌞":"&llcorner;","⌍":"&dlcrop;",$:"&dollar;","𝕕":"&dopf;","≑":"&eDot;","∸":"&minusd;","∔":"&plusdo;","⊡":"&sdotb;","⌟":"&lrcorner;","⌌":"&drcrop;","𝒹":"&dscr;","ѕ":"&dscy;","⧶":"&dsol;","đ":"&dstrok;","⋱":"&dtdot;","▿":"&triangledown;","⦦":"&dwangle;","џ":"&dzcy;","⟿":"&dzigrarr;","é":"&eacute;","⩮":"&easter;","ě":"&ecaron;","≖":"&eqcirc;","ê":"&ecirc;","≕":"&eqcolon;","э":"&ecy;","ė":"&edot;","≒":"&fallingdotseq;","𝔢":"&efr;","⪚":"&eg;","è":"&egrave;","⪖":"&eqslantgtr;","⪘":"&egsdot;","⪙":"&el;","⏧":"&elinters;","ℓ":"&ell;","⪕":"&eqslantless;","⪗":"&elsdot;","ē":"&emacr;","∅":"&varnothing;"," ":"&emsp13;"," ":"&emsp14;"," ":"&emsp;","ŋ":"&eng;"," ":"&ensp;","ę":"&eogon;","𝕖":"&eopf;","⋕":"&epar;","⧣":"&eparsl;","⩱":"&eplus;","ε":"&epsilon;","ϵ":"&varepsilon;","=":"&equals;","≟":"&questeq;","⩸":"&equivDD;","⧥":"&eqvparsl;","≓":"&risingdotseq;","⥱":"&erarr;","ℯ":"&escr;","η":"&eta;","ð":"&eth;","ë":"&euml;","€":"&euro;","!":"&excl;","ф":"&fcy;","♀":"&female;","ﬃ":"&ffilig;","ﬀ":"&fflig;","ﬄ":"&ffllig;","𝔣":"&ffr;","ﬁ":"&filig;",fj:"&fjlig;","♭":"&flat;","ﬂ":"&fllig;","▱":"&fltns;","ƒ":"&fnof;","𝕗":"&fopf;","⋔":"&pitchfork;","⫙":"&forkv;","⨍":"&fpartint;","½":"&half;","⅓":"&frac13;","¼":"&frac14;","⅕":"&frac15;","⅙":"&frac16;","⅛":"&frac18;","⅔":"&frac23;","⅖":"&frac25;","¾":"&frac34;","⅗":"&frac35;","⅜":"&frac38;","⅘":"&frac45;","⅚":"&frac56;","⅝":"&frac58;","⅞":"&frac78;","⁄":"&frasl;","⌢":"&sfrown;","𝒻":"&fscr;","⪌":"&gtreqqless;","ǵ":"&gacute;","γ":"&gamma;","⪆":"&gtrapprox;","ğ":"&gbreve;","ĝ":"&gcirc;","г":"&gcy;","ġ":"&gdot;","⪩":"&gescc;","⪀":"&gesdot;","⪂":"&gesdoto;","⪄":"&gesdotol;","⋛︀":"&gesl;","⪔":"&gesles;","𝔤":"&gfr;","ℷ":"&gimel;","ѓ":"&gjcy;","⪒":"&glE;","⪥":"&gla;","⪤":"&glj;","≩":"&gneqq;","⪊":"&gnapprox;","⪈":"&gneq;","⋧":"&gnsim;","𝕘":"&gopf;","ℊ":"&gscr;","⪎":"&gsime;","⪐":"&gsiml;","⪧":"&gtcc;","⩺":"&gtcir;","⋗":"&gtrdot;","⦕":"&gtlPar;","⩼":"&gtquest;","⥸":"&gtrarr;","≩︀":"&gvnE;","ъ":"&hardcy;","⥈":"&harrcir;","↭":"&leftrightsquigarrow;","ℏ":"&plankv;","ĥ":"&hcirc;","♥":"&heartsuit;","…":"&mldr;","⊹":"&hercon;","𝔥":"&hfr;","⤥":"&searhk;","⤦":"&swarhk;","⇿":"&hoarr;","∻":"&homtht;","↩":"&larrhk;","↪":"&rarrhk;","𝕙":"&hopf;","―":"&horbar;","𝒽":"&hscr;","ħ":"&hstrok;","⁃":"&hybull;","í":"&iacute;","î":"&icirc;","и":"&icy;","е":"&iecy;","¡":"&iexcl;","𝔦":"&ifr;","ì":"&igrave;","⨌":"&qint;","∭":"&tint;","⧜":"&iinfin;","℩":"&iiota;","ĳ":"&ijlig;","ī":"&imacr;","ı":"&inodot;","⊷":"&imof;","Ƶ":"&imped;","℅":"&incare;","∞":"&infin;","⧝":"&infintie;","⊺":"&intercal;","⨗":"&intlarhk;","⨼":"&iprod;","ё":"&iocy;","į":"&iogon;","𝕚":"&iopf;","ι":"&iota;","¿":"&iquest;","𝒾":"&iscr;","⋹":"&isinE;","⋵":"&isindot;","⋴":"&isins;","⋳":"&isinsv;","ĩ":"&itilde;","і":"&iukcy;","ï":"&iuml;","ĵ":"&jcirc;","й":"&jcy;","𝔧":"&jfr;","ȷ":"&jmath;","𝕛":"&jopf;","𝒿":"&jscr;","ј":"&jsercy;","є":"&jukcy;","κ":"&kappa;","ϰ":"&varkappa;","ķ":"&kcedil;","к":"&kcy;","𝔨":"&kfr;","ĸ":"&kgreen;","х":"&khcy;","ќ":"&kjcy;","𝕜":"&kopf;","𝓀":"&kscr;","⤛":"&lAtail;","⤎":"&lBarr;","⪋":"&lesseqqgtr;","⥢":"&lHar;","ĺ":"&lacute;","⦴":"&laemptyv;","λ":"&lambda;","⦑":"&langd;","⪅":"&lessapprox;","«":"&laquo;","⤟":"&larrbfs;","⤝":"&larrfs;","↫":"&looparrowleft;","⤹":"&larrpl;","⥳":"&larrsim;","↢":"&leftarrowtail;","⪫":"&lat;","⤙":"&latail;","⪭":"&late;","⪭︀":"&lates;","⤌":"&lbarr;","❲":"&lbbrk;","{":"&lcub;","[":"&lsqb;","⦋":"&lbrke;","⦏":"&lbrksld;","⦍":"&lbrkslu;","ľ":"&lcaron;","ļ":"&lcedil;","л":"&lcy;","⤶":"&ldca;","⥧":"&ldrdhar;","⥋":"&ldrushar;","↲":"&ldsh;","≤":"&leq;","⇇":"&llarr;","⋋":"&lthree;","⪨":"&lescc;","⩿":"&lesdot;","⪁":"&lesdoto;","⪃":"&lesdotor;","⋚︀":"&lesg;","⪓":"&lesges;","⋖":"&ltdot;","⥼":"&lfisht;","𝔩":"&lfr;","⪑":"&lgE;","⥪":"&lharul;","▄":"&lhblk;","љ":"&ljcy;","⥫":"&llhard;","◺":"&lltri;","ŀ":"&lmidot;","⎰":"&lmoustache;","≨":"&lneqq;","⪉":"&lnapprox;","⪇":"&lneq;","⋦":"&lnsim;","⟬":"&loang;","⇽":"&loarr;","⟼":"&xmap;","↬":"&rarrlp;","⦅":"&lopar;","𝕝":"&lopf;","⨭":"&loplus;","⨴":"&lotimes;","∗":"&lowast;","◊":"&lozenge;","(":"&lpar;","⦓":"&lparlt;","⥭":"&lrhard;","‎":"&lrm;","⊿":"&lrtri;","‹":"&lsaquo;","𝓁":"&lscr;","⪍":"&lsime;","⪏":"&lsimg;","‚":"&sbquo;","ł":"&lstrok;","⪦":"&ltcc;","⩹":"&ltcir;","⋉":"&ltimes;","⥶":"&ltlarr;","⩻":"&ltquest;","⦖":"&ltrPar;","◃":"&triangleleft;","⥊":"&lurdshar;","⥦":"&luruhar;","≨︀":"&lvnE;","∺":"&mDDot;","¯":"&strns;","♂":"&male;","✠":"&maltese;","▮":"&marker;","⨩":"&mcomma;","м":"&mcy;","—":"&mdash;","𝔪":"&mfr;","℧":"&mho;","µ":"&micro;","⫰":"&midcir;","−":"&minus;","⨪":"&minusdu;","⫛":"&mlcp;","⊧":"&models;","𝕞":"&mopf;","𝓂":"&mscr;","μ":"&mu;","⊸":"&mumap;","⋙̸":"&nGg;","≫⃒":"&nGt;","⇍":"&nlArr;","⇎":"&nhArr;","⋘̸":"&nLl;","≪⃒":"&nLt;","⇏":"&nrArr;","⊯":"&nVDash;","⊮":"&nVdash;","ń":"&nacute;","∠⃒":"&nang;","⩰̸":"&napE;","≋̸":"&napid;","ŉ":"&napos;","♮":"&natural;","⩃":"&ncap;","ň":"&ncaron;","ņ":"&ncedil;","⩭̸":"&ncongdot;","⩂":"&ncup;","н":"&ncy;","–":"&ndash;","⇗":"&neArr;","⤤":"&nearhk;","≐̸":"&nedot;","⤨":"&toea;","𝔫":"&nfr;","↮":"&nleftrightarrow;","⫲":"&nhpar;","⋼":"&nis;","⋺":"&nisd;","њ":"&njcy;","≦̸":"&nleqq;","↚":"&nleftarrow;","‥":"&nldr;","𝕟":"&nopf;","¬":"&not;","⋹̸":"&notinE;","⋵̸":"&notindot;","⋷":"&notinvb;","⋶":"&notinvc;","⋾":"&notnivb;","⋽":"&notnivc;","⫽⃥":"&nparsl;","∂̸":"&npart;","⨔":"&npolint;","↛":"&nrightarrow;","⤳̸":"&nrarrc;","↝̸":"&nrarrw;","𝓃":"&nscr;","⊄":"&nsub;","⫅̸":"&nsubseteqq;","⊅":"&nsup;","⫆̸":"&nsupseteqq;","ñ":"&ntilde;","ν":"&nu;","#":"&num;","№":"&numero;"," ":"&numsp;","⊭":"&nvDash;","⤄":"&nvHarr;","≍⃒":"&nvap;","⊬":"&nvdash;","≥⃒":"&nvge;",">⃒":"&nvgt;","⧞":"&nvinfin;","⤂":"&nvlArr;","≤⃒":"&nvle;","<⃒":"&nvlt;","⊴⃒":"&nvltrie;","⤃":"&nvrArr;","⊵⃒":"&nvrtrie;","∼⃒":"&nvsim;","⇖":"&nwArr;","⤣":"&nwarhk;","⤧":"&nwnear;","ó":"&oacute;","ô":"&ocirc;","о":"&ocy;","ő":"&odblac;","⨸":"&odiv;","⦼":"&odsold;","œ":"&oelig;","⦿":"&ofcir;","𝔬":"&ofr;","˛":"&ogon;","ò":"&ograve;","⧁":"&ogt;","⦵":"&ohbar;","⦾":"&olcir;","⦻":"&olcross;","⧀":"&olt;","ō":"&omacr;","ω":"&omega;","ο":"&omicron;","⦶":"&omid;","𝕠":"&oopf;","⦷":"&opar;","⦹":"&operp;","∨":"&vee;","⩝":"&ord;","ℴ":"&oscr;","ª":"&ordf;","º":"&ordm;","⊶":"&origof;","⩖":"&oror;","⩗":"&orslope;","⩛":"&orv;","ø":"&oslash;","⊘":"&osol;","õ":"&otilde;","⨶":"&otimesas;","ö":"&ouml;","⌽":"&ovbar;","¶":"&para;","⫳":"&parsim;","⫽":"&parsl;","п":"&pcy;","%":"&percnt;",".":"&period;","‰":"&permil;","‱":"&pertenk;","𝔭":"&pfr;","φ":"&phi;","ϕ":"&varphi;","☎":"&phone;","π":"&pi;","ϖ":"&varpi;","ℎ":"&planckh;","+":"&plus;","⨣":"&plusacir;","⨢":"&pluscir;","⨥":"&plusdu;","⩲":"&pluse;","⨦":"&plussim;","⨧":"&plustwo;","⨕":"&pointint;","𝕡":"&popf;","£":"&pound;","⪳":"&prE;","⪷":"&precapprox;","⪹":"&prnap;","⪵":"&prnE;","⋨":"&prnsim;","′":"&prime;","⌮":"&profalar;","⌒":"&profline;","⌓":"&profsurf;","⊰":"&prurel;","𝓅":"&pscr;","ψ":"&psi;"," ":"&puncsp;","𝔮":"&qfr;","𝕢":"&qopf;","⁗":"&qprime;","𝓆":"&qscr;","⨖":"&quatint;","?":"&quest;","⤜":"&rAtail;","⥤":"&rHar;","∽̱":"&race;","ŕ":"&racute;","⦳":"&raemptyv;","⦒":"&rangd;","⦥":"&range;","»":"&raquo;","⥵":"&rarrap;","⤠":"&rarrbfs;","⤳":"&rarrc;","⤞":"&rarrfs;","⥅":"&rarrpl;","⥴":"&rarrsim;","↣":"&rightarrowtail;","↝":"&rightsquigarrow;","⤚":"&ratail;","∶":"&ratio;","❳":"&rbbrk;","}":"&rcub;","]":"&rsqb;","⦌":"&rbrke;","⦎":"&rbrksld;","⦐":"&rbrkslu;","ř":"&rcaron;","ŗ":"&rcedil;","р":"&rcy;","⤷":"&rdca;","⥩":"&rdldhar;","↳":"&rdsh;","▭":"&rect;","⥽":"&rfisht;","𝔯":"&rfr;","⥬":"&rharul;","ρ":"&rho;","ϱ":"&varrho;","⇉":"&rrarr;","⋌":"&rthree;","˚":"&ring;","‏":"&rlm;","⎱":"&rmoustache;","⫮":"&rnmid;","⟭":"&roang;","⇾":"&roarr;","⦆":"&ropar;","𝕣":"&ropf;","⨮":"&roplus;","⨵":"&rotimes;",")":"&rpar;","⦔":"&rpargt;","⨒":"&rppolint;","›":"&rsaquo;","𝓇":"&rscr;","⋊":"&rtimes;","▹":"&triangleright;","⧎":"&rtriltri;","⥨":"&ruluhar;","℞":"&rx;","ś":"&sacute;","⪴":"&scE;","⪸":"&succapprox;","š":"&scaron;","ş":"&scedil;","ŝ":"&scirc;","⪶":"&succneqq;","⪺":"&succnapprox;","⋩":"&succnsim;","⨓":"&scpolint;","с":"&scy;","⋅":"&sdot;","⩦":"&sdote;","⇘":"&seArr;","§":"&sect;",";":"&semi;","⤩":"&tosa;","✶":"&sext;","𝔰":"&sfr;","♯":"&sharp;","щ":"&shchcy;","ш":"&shcy;","­":"&shy;","σ":"&sigma;","ς":"&varsigma;","⩪":"&simdot;","⪞":"&simg;","⪠":"&simgE;","⪝":"&siml;","⪟":"&simlE;","≆":"&simne;","⨤":"&simplus;","⥲":"&simrarr;","⨳":"&smashp;","⧤":"&smeparsl;","⌣":"&ssmile;","⪪":"&smt;","⪬":"&smte;","⪬︀":"&smtes;","ь":"&softcy;","/":"&sol;","⧄":"&solb;","⌿":"&solbar;","𝕤":"&sopf;","♠":"&spadesuit;","⊓︀":"&sqcaps;","⊔︀":"&sqcups;","𝓈":"&sscr;","☆":"&star;","⊂":"&subset;","⫅":"&subseteqq;","⪽":"&subdot;","⫃":"&subedot;","⫁":"&submult;","⫋":"&subsetneqq;","⊊":"&subsetneq;","⪿":"&subplus;","⥹":"&subrarr;","⫇":"&subsim;","⫕":"&subsub;","⫓":"&subsup;","♪":"&sung;","¹":"&sup1;","²":"&sup2;","³":"&sup3;","⫆":"&supseteqq;","⪾":"&supdot;","⫘":"&supdsub;","⫄":"&supedot;","⟉":"&suphsol;","⫗":"&suphsub;","⥻":"&suplarr;","⫂":"&supmult;","⫌":"&supsetneqq;","⊋":"&supsetneq;","⫀":"&supplus;","⫈":"&supsim;","⫔":"&supsub;","⫖":"&supsup;","⇙":"&swArr;","⤪":"&swnwar;","ß":"&szlig;","⌖":"&target;","τ":"&tau;","ť":"&tcaron;","ţ":"&tcedil;","т":"&tcy;","⌕":"&telrec;","𝔱":"&tfr;","θ":"&theta;","ϑ":"&vartheta;","þ":"&thorn;","×":"&times;","⨱":"&timesbar;","⨰":"&timesd;","⌶":"&topbot;","⫱":"&topcir;","𝕥":"&topf;","⫚":"&topfork;","‴":"&tprime;","▵":"&utri;","≜":"&trie;","◬":"&tridot;","⨺":"&triminus;","⨹":"&triplus;","⧍":"&trisb;","⨻":"&tritime;","⏢":"&trpezium;","𝓉":"&tscr;","ц":"&tscy;","ћ":"&tshcy;","ŧ":"&tstrok;","⥣":"&uHar;","ú":"&uacute;","ў":"&ubrcy;","ŭ":"&ubreve;","û":"&ucirc;","у":"&ucy;","ű":"&udblac;","⥾":"&ufisht;","𝔲":"&ufr;","ù":"&ugrave;","▀":"&uhblk;","⌜":"&ulcorner;","⌏":"&ulcrop;","◸":"&ultri;","ū":"&umacr;","ų":"&uogon;","𝕦":"&uopf;","υ":"&upsilon;","⇈":"&uuarr;","⌝":"&urcorner;","⌎":"&urcrop;","ů":"&uring;","◹":"&urtri;","𝓊":"&uscr;","⋰":"&utdot;","ũ":"&utilde;","ü":"&uuml;","⦧":"&uwangle;","⫨":"&vBar;","⫩":"&vBarv;","⦜":"&vangrt;","⊊︀":"&vsubne;","⫋︀":"&vsubnE;","⊋︀":"&vsupne;","⫌︀":"&vsupnE;","в":"&vcy;","⊻":"&veebar;","≚":"&veeeq;","⋮":"&vellip;","𝔳":"&vfr;","𝕧":"&vopf;","𝓋":"&vscr;","⦚":"&vzigzag;","ŵ":"&wcirc;","⩟":"&wedbar;","≙":"&wedgeq;","℘":"&wp;","𝔴":"&wfr;","𝕨":"&wopf;","𝓌":"&wscr;","𝔵":"&xfr;","ξ":"&xi;","⋻":"&xnis;","𝕩":"&xopf;","𝓍":"&xscr;","ý":"&yacute;","я":"&yacy;","ŷ":"&ycirc;","ы":"&ycy;","¥":"&yen;","𝔶":"&yfr;","ї":"&yicy;","𝕪":"&yopf;","𝓎":"&yscr;","ю":"&yucy;","ÿ":"&yuml;","ź":"&zacute;","ž":"&zcaron;","з":"&zcy;","ż":"&zdot;","ζ":"&zeta;","𝔷":"&zfr;","ж":"&zhcy;","⇝":"&zigrarr;","𝕫":"&zopf;","𝓏":"&zscr;","‍":"&zwj;","‌":"&zwnj;"}}};

/***/ }),

/***/ "./node_modules/html-entities/lib/numeric-unicode-map.js":
/*!***************************************************************!*\
  !*** ./node_modules/html-entities/lib/numeric-unicode-map.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.numericUnicodeMap={0:65533,128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376};

/***/ }),

/***/ "./node_modules/html-entities/lib/surrogate-pairs.js":
/*!***********************************************************!*\
  !*** ./node_modules/html-entities/lib/surrogate-pairs.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.fromCodePoint=String.fromCodePoint||function(astralCodePoint){return String.fromCharCode(Math.floor((astralCodePoint-65536)/1024)+55296,(astralCodePoint-65536)%1024+56320)};exports.getCodePoint=String.prototype.codePointAt?function(input,position){return input.codePointAt(position)}:function(input,position){return(input.charCodeAt(position)-55296)*1024+input.charCodeAt(position+1)-56320+65536};exports.highSurrogateFrom=55296;exports.highSurrogateTo=56319;

/***/ }),

/***/ "./app/shaders/fragment.glsl":
/*!***********************************!*\
  !*** ./app/shaders/fragment.glsl ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("precision highp float;\nprecision highp int;\n#define GLSLIFY 1\n\nuniform sampler2D tWater;\nuniform sampler2D tFlow;\nuniform float uTime;\n\nvarying vec2 vUv;\n\nuniform vec4 res;\n\nvoid main() {\n        // R and G values are velocity in the x and y direction\n        // B value is the velocity length\n        vec3 flow = texture2D(tFlow, vUv).rgb;\n        vec2 uv = .5 * gl_FragCoord.xy / res.xy ;\n        vec2 myUV = (uv - vec2(0.5))*res.zw + vec2(0.5);\n\n        myUV -= flow.xy * (0.15 * 0.7);\n        \n        vec3 tex = texture2D(tWater, myUV).rgb;\n\n        // gl_FragColor = vec4(flow.r, flow.g, flow.b, 1.0);\n        gl_FragColor = vec4(tex.r, tex.g, tex.b, 1.0);\n}");

/***/ }),

/***/ "./app/shaders/vertex.glsl":
/*!*********************************!*\
  !*** ./app/shaders/vertex.glsl ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("#define GLSLIFY 1\nattribute vec2 uv;\nattribute vec2 position;\n\nvarying vec2 vUv;\n\nvoid main() {\n        vUv = uv;\n        \n        gl_Position = vec4(position, 0, 1);\n}");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js":
/*!***************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WebSocketClient)
/* harmony export */ });
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var WebSocketClient = /*#__PURE__*/function () {
  /**
   * @param {string} url
   */
  function WebSocketClient(url) {
    _classCallCheck(this, WebSocketClient);

    this.client = new WebSocket(url);

    this.client.onerror = function (error) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_0__.log.error(error);
    };
  }
  /**
   * @param {(...args: any[]) => void} f
   */


  _createClass(WebSocketClient, [{
    key: "onOpen",
    value: function onOpen(f) {
      this.client.onopen = f;
    }
    /**
     * @param {(...args: any[]) => void} f
     */

  }, {
    key: "onClose",
    value: function onClose(f) {
      this.client.onclose = f;
    } // call f with the message string as the first argument

    /**
     * @param {(...args: any[]) => void} f
     */

  }, {
    key: "onMessage",
    value: function onMessage(f) {
      this.client.onmessage = function (e) {
        f(e.data);
      };
    }
  }]);

  return WebSocketClient;
}();



/***/ }),

/***/ "./node_modules/webpack-dev-server/client/modules/logger/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/logger/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client-src/modules/logger/SyncBailHookFake.js":
/*!*******************************************************!*\
  !*** ./client-src/modules/logger/SyncBailHookFake.js ***!
  \*******************************************************/
/***/ (function(module) {


/**
 * Client stub for tapable SyncBailHook
 */

module.exports = function clientTapableSyncBailHook() {
  return {
    call: function call() {}
  };
};

/***/ }),

/***/ "./node_modules/webpack/lib/logging/Logger.js":
/*!****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/Logger.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

var LogType = Object.freeze({
  error:
  /** @type {"error"} */
  "error",
  // message, c style arguments
  warn:
  /** @type {"warn"} */
  "warn",
  // message, c style arguments
  info:
  /** @type {"info"} */
  "info",
  // message, c style arguments
  log:
  /** @type {"log"} */
  "log",
  // message, c style arguments
  debug:
  /** @type {"debug"} */
  "debug",
  // message, c style arguments
  trace:
  /** @type {"trace"} */
  "trace",
  // no arguments
  group:
  /** @type {"group"} */
  "group",
  // [label]
  groupCollapsed:
  /** @type {"groupCollapsed"} */
  "groupCollapsed",
  // [label]
  groupEnd:
  /** @type {"groupEnd"} */
  "groupEnd",
  // [label]
  profile:
  /** @type {"profile"} */
  "profile",
  // [profileName]
  profileEnd:
  /** @type {"profileEnd"} */
  "profileEnd",
  // [profileName]
  time:
  /** @type {"time"} */
  "time",
  // name, time as [seconds, nanoseconds]
  clear:
  /** @type {"clear"} */
  "clear",
  // no arguments
  status:
  /** @type {"status"} */
  "status" // message, arguments

});
exports.LogType = LogType;
/** @typedef {typeof LogType[keyof typeof LogType]} LogTypeEnum */

var LOG_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger raw log method");
var TIMERS_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger times");
var TIMERS_AGGREGATES_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger aggregated times");

var WebpackLogger = /*#__PURE__*/function () {
  /**
   * @param {function(LogTypeEnum, any[]=): void} log log function
   * @param {function(string | function(): string): WebpackLogger} getChildLogger function to create child logger
   */
  function WebpackLogger(log, getChildLogger) {
    _classCallCheck(this, WebpackLogger);

    this[LOG_SYMBOL] = log;
    this.getChildLogger = getChildLogger;
  }

  _createClass(WebpackLogger, [{
    key: "error",
    value: function error() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this[LOG_SYMBOL](LogType.error, args);
    }
  }, {
    key: "warn",
    value: function warn() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this[LOG_SYMBOL](LogType.warn, args);
    }
  }, {
    key: "info",
    value: function info() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this[LOG_SYMBOL](LogType.info, args);
    }
  }, {
    key: "log",
    value: function log() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      this[LOG_SYMBOL](LogType.log, args);
    }
  }, {
    key: "debug",
    value: function debug() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      this[LOG_SYMBOL](LogType.debug, args);
    }
  }, {
    key: "assert",
    value: function assert(assertion) {
      if (!assertion) {
        for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          args[_key6 - 1] = arguments[_key6];
        }

        this[LOG_SYMBOL](LogType.error, args);
      }
    }
  }, {
    key: "trace",
    value: function trace() {
      this[LOG_SYMBOL](LogType.trace, ["Trace"]);
    }
  }, {
    key: "clear",
    value: function clear() {
      this[LOG_SYMBOL](LogType.clear);
    }
  }, {
    key: "status",
    value: function status() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      this[LOG_SYMBOL](LogType.status, args);
    }
  }, {
    key: "group",
    value: function group() {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      this[LOG_SYMBOL](LogType.group, args);
    }
  }, {
    key: "groupCollapsed",
    value: function groupCollapsed() {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }

      this[LOG_SYMBOL](LogType.groupCollapsed, args);
    }
  }, {
    key: "groupEnd",
    value: function groupEnd() {
      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }

      this[LOG_SYMBOL](LogType.groupEnd, args);
    }
  }, {
    key: "profile",
    value: function profile(label) {
      this[LOG_SYMBOL](LogType.profile, [label]);
    }
  }, {
    key: "profileEnd",
    value: function profileEnd(label) {
      this[LOG_SYMBOL](LogType.profileEnd, [label]);
    }
  }, {
    key: "time",
    value: function time(label) {
      this[TIMERS_SYMBOL] = this[TIMERS_SYMBOL] || new Map();
      this[TIMERS_SYMBOL].set(label, process.hrtime());
    }
  }, {
    key: "timeLog",
    value: function timeLog(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);

      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeLog()"));
      }

      var time = process.hrtime(prev);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }, {
    key: "timeEnd",
    value: function timeEnd(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);

      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeEnd()"));
      }

      var time = process.hrtime(prev);
      this[TIMERS_SYMBOL].delete(label);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }, {
    key: "timeAggregate",
    value: function timeAggregate(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);

      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeAggregate()"));
      }

      var time = process.hrtime(prev);
      this[TIMERS_SYMBOL].delete(label);
      this[TIMERS_AGGREGATES_SYMBOL] = this[TIMERS_AGGREGATES_SYMBOL] || new Map();
      var current = this[TIMERS_AGGREGATES_SYMBOL].get(label);

      if (current !== undefined) {
        if (time[1] + current[1] > 1e9) {
          time[0] += current[0] + 1;
          time[1] = time[1] - 1e9 + current[1];
        } else {
          time[0] += current[0];
          time[1] += current[1];
        }
      }

      this[TIMERS_AGGREGATES_SYMBOL].set(label, time);
    }
  }, {
    key: "timeAggregateEnd",
    value: function timeAggregateEnd(label) {
      if (this[TIMERS_AGGREGATES_SYMBOL] === undefined) return;
      var time = this[TIMERS_AGGREGATES_SYMBOL].get(label);
      if (time === undefined) return;
      this[TIMERS_AGGREGATES_SYMBOL].delete(label);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }]);

  return WebpackLogger;
}();

exports.Logger = WebpackLogger;

/***/ }),

/***/ "./node_modules/webpack/lib/logging/createConsoleLogger.js":
/*!*****************************************************************!*\
  !*** ./node_modules/webpack/lib/logging/createConsoleLogger.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_10785__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

var _require = __nested_webpack_require_10785__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"),
    LogType = _require.LogType;
/** @typedef {import("../../declarations/WebpackOptions").FilterItemTypes} FilterItemTypes */

/** @typedef {import("../../declarations/WebpackOptions").FilterTypes} FilterTypes */

/** @typedef {import("./Logger").LogTypeEnum} LogTypeEnum */

/** @typedef {function(string): boolean} FilterFunction */

/**
 * @typedef {Object} LoggerConsole
 * @property {function(): void} clear
 * @property {function(): void} trace
 * @property {(...args: any[]) => void} info
 * @property {(...args: any[]) => void} log
 * @property {(...args: any[]) => void} warn
 * @property {(...args: any[]) => void} error
 * @property {(...args: any[]) => void=} debug
 * @property {(...args: any[]) => void=} group
 * @property {(...args: any[]) => void=} groupCollapsed
 * @property {(...args: any[]) => void=} groupEnd
 * @property {(...args: any[]) => void=} status
 * @property {(...args: any[]) => void=} profile
 * @property {(...args: any[]) => void=} profileEnd
 * @property {(...args: any[]) => void=} logTime
 */

/**
 * @typedef {Object} LoggerOptions
 * @property {false|true|"none"|"error"|"warn"|"info"|"log"|"verbose"} level loglevel
 * @property {FilterTypes|boolean} debug filter for debug logging
 * @property {LoggerConsole} console the console to log to
 */

/**
 * @param {FilterItemTypes} item an input item
 * @returns {FilterFunction} filter function
 */


var filterToFunction = function filterToFunction(item) {
  if (typeof item === "string") {
    var regExp = new RegExp("[\\\\/]".concat(item.replace( // eslint-disable-next-line no-useless-escape
    /[-[\]{}()*+?.\\^$|]/g, "\\$&"), "([\\\\/]|$|!|\\?)"));
    return function (ident) {
      return regExp.test(ident);
    };
  }

  if (item && typeof item === "object" && typeof item.test === "function") {
    return function (ident) {
      return item.test(ident);
    };
  }

  if (typeof item === "function") {
    return item;
  }

  if (typeof item === "boolean") {
    return function () {
      return item;
    };
  }
};
/**
 * @enum {number}
 */


var LogLevel = {
  none: 6,
  false: 6,
  error: 5,
  warn: 4,
  info: 3,
  log: 2,
  true: 2,
  verbose: 1
};
/**
 * @param {LoggerOptions} options options object
 * @returns {function(string, LogTypeEnum, any[]): void} logging function
 */

module.exports = function (_ref) {
  var _ref$level = _ref.level,
      level = _ref$level === void 0 ? "info" : _ref$level,
      _ref$debug = _ref.debug,
      debug = _ref$debug === void 0 ? false : _ref$debug,
      console = _ref.console;
  var debugFilters = typeof debug === "boolean" ? [function () {
    return debug;
  }] :
  /** @type {FilterItemTypes[]} */
  [].concat(debug).map(filterToFunction);
  /** @type {number} */

  var loglevel = LogLevel["".concat(level)] || 0;
  /**
   * @param {string} name name of the logger
   * @param {LogTypeEnum} type type of the log entry
   * @param {any[]} args arguments of the log entry
   * @returns {void}
   */

  var logger = function logger(name, type, args) {
    var labeledArgs = function labeledArgs() {
      if (Array.isArray(args)) {
        if (args.length > 0 && typeof args[0] === "string") {
          return ["[".concat(name, "] ").concat(args[0])].concat(_toConsumableArray(args.slice(1)));
        } else {
          return ["[".concat(name, "]")].concat(_toConsumableArray(args));
        }
      } else {
        return [];
      }
    };

    var debug = debugFilters.some(function (f) {
      return f(name);
    });

    switch (type) {
      case LogType.debug:
        if (!debug) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

        if (typeof console.debug === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.debug.apply(console, _toConsumableArray(labeledArgs()));
        } else {
          console.log.apply(console, _toConsumableArray(labeledArgs()));
        }

        break;

      case LogType.log:
        if (!debug && loglevel > LogLevel.log) return;
        console.log.apply(console, _toConsumableArray(labeledArgs()));
        break;

      case LogType.info:
        if (!debug && loglevel > LogLevel.info) return;
        console.info.apply(console, _toConsumableArray(labeledArgs()));
        break;

      case LogType.warn:
        if (!debug && loglevel > LogLevel.warn) return;
        console.warn.apply(console, _toConsumableArray(labeledArgs()));
        break;

      case LogType.error:
        if (!debug && loglevel > LogLevel.error) return;
        console.error.apply(console, _toConsumableArray(labeledArgs()));
        break;

      case LogType.trace:
        if (!debug) return;
        console.trace();
        break;

      case LogType.groupCollapsed:
        if (!debug && loglevel > LogLevel.log) return;

        if (!debug && loglevel > LogLevel.verbose) {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          if (typeof console.groupCollapsed === "function") {
            // eslint-disable-next-line node/no-unsupported-features/node-builtins
            console.groupCollapsed.apply(console, _toConsumableArray(labeledArgs()));
          } else {
            console.log.apply(console, _toConsumableArray(labeledArgs()));
          }

          break;
        }

      // falls through

      case LogType.group:
        if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

        if (typeof console.group === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.group.apply(console, _toConsumableArray(labeledArgs()));
        } else {
          console.log.apply(console, _toConsumableArray(labeledArgs()));
        }

        break;

      case LogType.groupEnd:
        if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

        if (typeof console.groupEnd === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.groupEnd();
        }

        break;

      case LogType.time:
        {
          if (!debug && loglevel > LogLevel.log) return;
          var ms = args[1] * 1000 + args[2] / 1000000;
          var msg = "[".concat(name, "] ").concat(args[0], ": ").concat(ms, " ms");

          if (typeof console.logTime === "function") {
            console.logTime(msg);
          } else {
            console.log(msg);
          }

          break;
        }

      case LogType.profile:
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.profile === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.profile.apply(console, _toConsumableArray(labeledArgs()));
        }

        break;

      case LogType.profileEnd:
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.profileEnd === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.profileEnd.apply(console, _toConsumableArray(labeledArgs()));
        }

        break;

      case LogType.clear:
        if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

        if (typeof console.clear === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.clear();
        }

        break;

      case LogType.status:
        if (!debug && loglevel > LogLevel.info) return;

        if (typeof console.status === "function") {
          if (args.length === 0) {
            console.status();
          } else {
            console.status.apply(console, _toConsumableArray(labeledArgs()));
          }
        } else {
          if (args.length !== 0) {
            console.info.apply(console, _toConsumableArray(labeledArgs()));
          }
        }

        break;

      default:
        throw new Error("Unexpected LogType ".concat(type));
    }
  };

  return logger;
};

/***/ }),

/***/ "./node_modules/webpack/lib/logging/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/runtime.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_20872__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var SyncBailHook = __nested_webpack_require_20872__(/*! tapable/lib/SyncBailHook */ "./client-src/modules/logger/SyncBailHookFake.js");

var _require = __nested_webpack_require_20872__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"),
    Logger = _require.Logger;

var createConsoleLogger = __nested_webpack_require_20872__(/*! ./createConsoleLogger */ "./node_modules/webpack/lib/logging/createConsoleLogger.js");
/** @type {createConsoleLogger.LoggerOptions} */


var currentDefaultLoggerOptions = {
  level: "info",
  debug: false,
  console: console
};
var currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
/**
 * @param {string} name name of the logger
 * @returns {Logger} a logger
 */

exports.getLogger = function (name) {
  return new Logger(function (type, args) {
    if (exports.hooks.log.call(name, type, args) === undefined) {
      currentDefaultLogger(name, type, args);
    }
  }, function (childName) {
    return exports.getLogger("".concat(name, "/").concat(childName));
  });
};
/**
 * @param {createConsoleLogger.LoggerOptions} options new options, merge with old options
 * @returns {void}
 */


exports.configureDefaultLogger = function (options) {
  _extends(currentDefaultLoggerOptions, options);

  currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
};

exports.hooks = {
  log: new SyncBailHook(["origin", "type", "args"])
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_22988__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_22988__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_22988__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_22988__.o(definition, key) && !__nested_webpack_require_22988__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__nested_webpack_require_22988__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_22988__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!********************************************!*\
  !*** ./client-src/modules/logger/index.js ***!
  \********************************************/
__nested_webpack_require_22988__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_22988__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* reexport default export from named module */ webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__; }
/* harmony export */ });
/* harmony import */ var webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_22988__(/*! webpack/lib/logging/runtime.js */ "./node_modules/webpack/lib/logging/runtime.js");

}();
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/modules/strip-ansi/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/strip-ansi/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/strip-ansi/index.js":
/*!******************************************!*\
  !*** ./node_modules/strip-ansi/index.js ***!
  \******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __nested_webpack_require_368__) {

__nested_webpack_require_368__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_368__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ stripAnsi; }
/* harmony export */ });
/* harmony import */ var ansi_regex__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_368__(/*! ansi-regex */ "./node_modules/strip-ansi/node_modules/ansi-regex/index.js");

function stripAnsi(string) {
  if (typeof string !== 'string') {
    throw new TypeError("Expected a `string`, got `".concat(typeof string, "`"));
  }

  return string.replace((0,ansi_regex__WEBPACK_IMPORTED_MODULE_0__["default"])(), '');
}

/***/ }),

/***/ "./node_modules/strip-ansi/node_modules/ansi-regex/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/strip-ansi/node_modules/ansi-regex/index.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __nested_webpack_require_1387__) {

__nested_webpack_require_1387__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_1387__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ansiRegex; }
/* harmony export */ });
function ansiRegex() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$onlyFirst = _ref.onlyFirst,
      onlyFirst = _ref$onlyFirst === void 0 ? false : _ref$onlyFirst;

  var pattern = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'].join('|');
  return new RegExp(pattern, onlyFirst ? undefined : 'g');
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_2352__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_2352__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_2352__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_2352__.o(definition, key) && !__nested_webpack_require_2352__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__nested_webpack_require_2352__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_2352__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!************************************************!*\
  !*** ./client-src/modules/strip-ansi/index.js ***!
  \************************************************/
__nested_webpack_require_2352__.r(__webpack_exports__);
/* harmony import */ var strip_ansi__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_2352__(/*! strip-ansi */ "./node_modules/strip-ansi/index.js");

/* harmony default export */ __webpack_exports__["default"] = (strip_ansi__WEBPACK_IMPORTED_MODULE_0__["default"]);
}();
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay.js":
/*!***********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatProblem": () => (/* binding */ formatProblem),
/* harmony export */   "hide": () => (/* binding */ hide),
/* harmony export */   "show": () => (/* binding */ show)
/* harmony export */ });
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ansi-html-community */ "./node_modules/ansi-html-community/index.js");
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ansi_html_community__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! html-entities */ "./node_modules/html-entities/lib/index.js");
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(html_entities__WEBPACK_IMPORTED_MODULE_1__);
// The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)
// They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).


var colors = {
  reset: ["transparent", "transparent"],
  black: "181818",
  red: "E36049",
  green: "B3CB74",
  yellow: "FFD080",
  blue: "7CAFC2",
  magenta: "7FACCA",
  cyan: "C3C2EF",
  lightgrey: "EBE7E3",
  darkgrey: "6D7891"
};
/** @type {HTMLIFrameElement | null | undefined} */

var iframeContainerElement;
/** @type {HTMLDivElement | null | undefined} */

var containerElement;
/** @type {Array<(element: HTMLDivElement) => void>} */

var onLoadQueue = [];
ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default().setColors(colors);

function createContainer() {
  iframeContainerElement = document.createElement("iframe");
  iframeContainerElement.id = "webpack-dev-server-client-overlay";
  iframeContainerElement.src = "about:blank";
  iframeContainerElement.style.position = "fixed";
  iframeContainerElement.style.left = 0;
  iframeContainerElement.style.top = 0;
  iframeContainerElement.style.right = 0;
  iframeContainerElement.style.bottom = 0;
  iframeContainerElement.style.width = "100vw";
  iframeContainerElement.style.height = "100vh";
  iframeContainerElement.style.border = "none";
  iframeContainerElement.style.zIndex = 9999999999;

  iframeContainerElement.onload = function () {
    containerElement =
    /** @type {Document} */

    /** @type {HTMLIFrameElement} */
    iframeContainerElement.contentDocument.createElement("div");
    containerElement.id = "webpack-dev-server-client-overlay-div";
    containerElement.style.position = "fixed";
    containerElement.style.boxSizing = "border-box";
    containerElement.style.left = 0;
    containerElement.style.top = 0;
    containerElement.style.right = 0;
    containerElement.style.bottom = 0;
    containerElement.style.width = "100vw";
    containerElement.style.height = "100vh";
    containerElement.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
    containerElement.style.color = "#E8E8E8";
    containerElement.style.fontFamily = "Menlo, Consolas, monospace";
    containerElement.style.fontSize = "large";
    containerElement.style.padding = "2rem";
    containerElement.style.lineHeight = "1.2";
    containerElement.style.whiteSpace = "pre-wrap";
    containerElement.style.overflow = "auto";
    var headerElement = document.createElement("span");
    headerElement.innerText = "Compiled with problems:";
    var closeButtonElement = document.createElement("button");
    closeButtonElement.innerText = "X";
    closeButtonElement.style.background = "transparent";
    closeButtonElement.style.border = "none";
    closeButtonElement.style.fontSize = "20px";
    closeButtonElement.style.fontWeight = "bold";
    closeButtonElement.style.color = "white";
    closeButtonElement.style.cursor = "pointer";
    closeButtonElement.style.cssFloat = "right"; // @ts-ignore

    closeButtonElement.style.styleFloat = "right";
    closeButtonElement.addEventListener("click", function () {
      hide();
    });
    containerElement.appendChild(headerElement);
    containerElement.appendChild(closeButtonElement);
    containerElement.appendChild(document.createElement("br"));
    containerElement.appendChild(document.createElement("br"));
    /** @type {Document} */

    /** @type {HTMLIFrameElement} */
    iframeContainerElement.contentDocument.body.appendChild(containerElement);
    onLoadQueue.forEach(function (onLoad) {
      onLoad(
      /** @type {HTMLDivElement} */
      containerElement);
    });
    onLoadQueue = [];
    /** @type {HTMLIFrameElement} */

    iframeContainerElement.onload = null;
  };

  document.body.appendChild(iframeContainerElement);
}
/**
 * @param {(element: HTMLDivElement) => void} callback
 */


function ensureOverlayExists(callback) {
  if (containerElement) {
    // Everything is ready, call the callback right away.
    callback(containerElement);
    return;
  }

  onLoadQueue.push(callback);

  if (iframeContainerElement) {
    return;
  }

  createContainer();
} // Successful compilation.


function hide() {
  if (!iframeContainerElement) {
    return;
  } // Clean up and reset internal state.


  document.body.removeChild(iframeContainerElement);
  iframeContainerElement = null;
  containerElement = null;
}
/**
 * @param {string} type
 * @param {string  | { file?: string, moduleName?: string, loc?: string, message?: string }} item
 * @returns {{ header: string, body: string }}
 */


function formatProblem(type, item) {
  var header = type === "warning" ? "WARNING" : "ERROR";
  var body = "";

  if (typeof item === "string") {
    body += item;
  } else {
    var file = item.file || ""; // eslint-disable-next-line no-nested-ternary

    var moduleName = item.moduleName ? item.moduleName.indexOf("!") !== -1 ? "".concat(item.moduleName.replace(/^(\s|\S)*!/, ""), " (").concat(item.moduleName, ")") : "".concat(item.moduleName) : "";
    var loc = item.loc;
    header += "".concat(moduleName || file ? " in ".concat(moduleName ? "".concat(moduleName).concat(file ? " (".concat(file, ")") : "") : file).concat(loc ? " ".concat(loc) : "") : "");
    body += item.message || "";
  }

  return {
    header: header,
    body: body
  };
} // Compilation with errors (e.g. syntax error or missing modules).

/**
 * @param {string} type
 * @param {Array<string  | { file?: string, moduleName?: string, loc?: string, message?: string }>} messages
 */


function show(type, messages) {
  ensureOverlayExists(function () {
    messages.forEach(function (message) {
      var entryElement = document.createElement("div");
      var typeElement = document.createElement("span");

      var _formatProblem = formatProblem(type, message),
          header = _formatProblem.header,
          body = _formatProblem.body;

      typeElement.innerText = header;
      typeElement.style.color = "#".concat(colors.red); // Make it look similar to our terminal.

      var text = ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default()((0,html_entities__WEBPACK_IMPORTED_MODULE_1__.encode)(body));
      var messageTextNode = document.createElement("div");
      messageTextNode.innerHTML = text;
      entryElement.appendChild(typeElement);
      entryElement.appendChild(document.createElement("br"));
      entryElement.appendChild(document.createElement("br"));
      entryElement.appendChild(messageTextNode);
      entryElement.appendChild(document.createElement("br"));
      entryElement.appendChild(document.createElement("br"));
      /** @type {HTMLDivElement} */

      containerElement.appendChild(entryElement);
    });
  });
}



/***/ }),

/***/ "./node_modules/webpack-dev-server/client/socket.js":
/*!**********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/socket.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* provided dependency */ var __webpack_dev_server_client__ = __webpack_require__(/*! ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* global __webpack_dev_server_client__ */

 // this WebsocketClient is here as a default fallback, in case the client is not injected

/* eslint-disable camelcase */

var Client = // eslint-disable-next-line no-nested-ternary
typeof __webpack_dev_server_client__ !== "undefined" ? typeof __webpack_dev_server_client__.default !== "undefined" ? __webpack_dev_server_client__.default : __webpack_dev_server_client__ : _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__["default"];
/* eslint-enable camelcase */

var retries = 0;
var maxRetries = 10;
var client = null;
/**
 * @param {string} url
 * @param {{ [handler: string]: (data?: any, params?: any) => any }} handlers
 * @param {number} [reconnect]
 */

var socket = function initSocket(url, handlers, reconnect) {
  client = new Client(url);
  client.onOpen(function () {
    retries = 0;

    if (typeof reconnect !== "undefined") {
      maxRetries = reconnect;
    }
  });
  client.onClose(function () {
    if (retries === 0) {
      handlers.close();
    } // Try to reconnect.


    client = null; // After 10 retries stop trying, to prevent logspam.

    if (retries < maxRetries) {
      // Exponentially increase timeout to reconnect.
      // Respectfully copied from the package `got`.
      // eslint-disable-next-line no-restricted-properties
      var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
      retries += 1;
      _utils_log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("Trying to reconnect...");
      setTimeout(function () {
        socket(url, handlers, reconnect);
      }, retryInMs);
    }
  });
  client.onMessage(
  /**
   * @param {any} data
   */
  function (data) {
    var message = JSON.parse(data);

    if (handlers[message.type]) {
      handlers[message.type](message.data, message.params);
    }
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (socket);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/createSocketURL.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @param {{ protocol?: string, auth?: string, hostname?: string, port?: string, pathname?: string, search?: string, hash?: string, slashes?: boolean }} objURL
 * @returns {string}
 */
function format(objURL) {
  var protocol = objURL.protocol || "";

  if (protocol && protocol.substr(-1) !== ":") {
    protocol += ":";
  }

  var auth = objURL.auth || "";

  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ":");
    auth += "@";
  }

  var host = "";

  if (objURL.hostname) {
    host = auth + (objURL.hostname.indexOf(":") === -1 ? objURL.hostname : "[".concat(objURL.hostname, "]"));

    if (objURL.port) {
      host += ":".concat(objURL.port);
    }
  }

  var pathname = objURL.pathname || "";

  if (objURL.slashes) {
    host = "//".concat(host || "");

    if (pathname && pathname.charAt(0) !== "/") {
      pathname = "/".concat(pathname);
    }
  } else if (!host) {
    host = "";
  }

  var search = objURL.search || "";

  if (search && search.charAt(0) !== "?") {
    search = "?".concat(search);
  }

  var hash = objURL.hash || "";

  if (hash && hash.charAt(0) !== "#") {
    hash = "#".concat(hash);
  }

  pathname = pathname.replace(/[?#]/g,
  /**
   * @param {string} match
   * @returns {string}
   */
  function (match) {
    return encodeURIComponent(match);
  });
  search = search.replace("#", "%23");
  return "".concat(protocol).concat(host).concat(pathname).concat(search).concat(hash);
}
/**
 * @param {URL & { fromCurrentScript?: boolean }} parsedURL
 * @returns {string}
 */


function createSocketURL(parsedURL) {
  var hostname = parsedURL.hostname; // Node.js module parses it as `::`
  // `new URL(urlString, [baseURLString])` parses it as '[::]'

  var isInAddrAny = hostname === "0.0.0.0" || hostname === "::" || hostname === "[::]"; // why do we need this check?
  // hostname n/a for file protocol (example, when using electron, ionic)
  // see: https://github.com/webpack/webpack-dev-server/pull/384

  if (isInAddrAny && self.location.hostname && self.location.protocol.indexOf("http") === 0) {
    hostname = self.location.hostname;
  }

  var socketURLProtocol = parsedURL.protocol || self.location.protocol; // When https is used in the app, secure web sockets are always necessary because the browser doesn't accept non-secure web sockets.

  if (socketURLProtocol === "auto:" || hostname && isInAddrAny && self.location.protocol === "https:") {
    socketURLProtocol = self.location.protocol;
  }

  socketURLProtocol = socketURLProtocol.replace(/^(?:http|.+-extension|file)/i, "ws");
  var socketURLAuth = ""; // `new URL(urlString, [baseURLstring])` doesn't have `auth` property
  // Parse authentication credentials in case we need them

  if (parsedURL.username) {
    socketURLAuth = parsedURL.username; // Since HTTP basic authentication does not allow empty username,
    // we only include password if the username is not empty.

    if (parsedURL.password) {
      // Result: <username>:<password>
      socketURLAuth = socketURLAuth.concat(":", parsedURL.password);
    }
  } // In case the host is a raw IPv6 address, it can be enclosed in
  // the brackets as the brackets are needed in the final URL string.
  // Need to remove those as url.format blindly adds its own set of brackets
  // if the host string contains colons. That would lead to non-working
  // double brackets (e.g. [[::]]) host
  //
  // All of these web socket url params are optionally passed in through resourceQuery,
  // so we need to fall back to the default if they are not provided


  var socketURLHostname = (hostname || self.location.hostname || "localhost").replace(/^\[(.*)\]$/, "$1");
  var socketURLPort = parsedURL.port;

  if (!socketURLPort || socketURLPort === "0") {
    socketURLPort = self.location.port;
  } // If path is provided it'll be passed in via the resourceQuery as a
  // query param so it has to be parsed out of the querystring in order for the
  // client to open the socket to the correct location.


  var socketURLPathname = "/ws";

  if (parsedURL.pathname && !parsedURL.fromCurrentScript) {
    socketURLPathname = parsedURL.pathname;
  }

  return format({
    protocol: socketURLProtocol,
    auth: socketURLAuth,
    hostname: socketURLHostname,
    port: socketURLPort,
    pathname: socketURLPathname,
    slashes: true
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createSocketURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js":
/*!********************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @returns {string}
 */
function getCurrentScriptSource() {
  // `document.currentScript` is the most accurate way to find the current script,
  // but is not supported in all browsers.
  if (document.currentScript) {
    return document.currentScript.getAttribute("src");
  } // Fallback to getting all scripts running in the document.


  var scriptElements = document.scripts || [];
  var scriptElementsWithSrc = Array.prototype.filter.call(scriptElements, function (element) {
    return element.getAttribute("src");
  });

  if (scriptElementsWithSrc.length > 0) {
    var currentScript = scriptElementsWithSrc[scriptElementsWithSrc.length - 1];
    return currentScript.getAttribute("src");
  } // Fail as there was no script to use.


  throw new Error("[webpack-dev-server] Failed to get current script source.");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getCurrentScriptSource);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/log.js":
/*!*************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/log.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "log": () => (/* binding */ log),
/* harmony export */   "setLogLevel": () => (/* binding */ setLogLevel)
/* harmony export */ });
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/logger/index.js */ "./node_modules/webpack-dev-server/client/modules/logger/index.js");
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__);

var name = "webpack-dev-server"; // default level is set on the client side, so it does not need
// to be set by the CLI or API

var defaultLevel = "info"; // options new options, merge with old options

/**
 * @param {false | true | "none" | "error" | "warn" | "info" | "log" | "verbose"} level
 * @returns {void}
 */

function setLogLevel(level) {
  _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().configureDefaultLogger({
    level: level
  });
}

setLogLevel(defaultLevel);
var log = _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().getLogger(name);


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/parseURL.js":
/*!******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/parseURL.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getCurrentScriptSource.js */ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js");

/**
 * @param {string} resourceQuery
 * @returns {{ [key: string]: string | boolean }}
 */

function parseURL(resourceQuery) {
  /** @type {{ [key: string]: string }} */
  var options = {};

  if (typeof resourceQuery === "string" && resourceQuery !== "") {
    var searchParams = resourceQuery.substr(1).split("&");

    for (var i = 0; i < searchParams.length; i++) {
      var pair = searchParams[i].split("=");
      options[pair[0]] = decodeURIComponent(pair[1]);
    }
  } else {
    // Else, get the url from the <script> this file was called with.
    var scriptSource = (0,_getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    var scriptSourceURL;

    try {
      // The placeholder `baseURL` with `window.location.href`,
      // is to allow parsing of path-relative or protocol-relative URLs,
      // and will have no effect if `scriptSource` is a fully valid URL.
      scriptSourceURL = new URL(scriptSource, self.location.href);
    } catch (error) {// URL parsing failed, do nothing.
      // We will still proceed to see if we can recover using `resourceQuery`
    }

    if (scriptSourceURL) {
      options = scriptSourceURL;
      options.fromCurrentScript = true;
    }
  }

  return options;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parseURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/reloadApp.js":
/*!*******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/reloadApp.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/emitter.js */ "./node_modules/webpack/hot/emitter.js");
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");


/** @typedef {import("../index").Options} Options
/** @typedef {import("../index").Status} Status

/**
 * @param {Options} options
 * @param {Status} status
 */

function reloadApp(_ref, status) {
  var hot = _ref.hot,
      liveReload = _ref.liveReload;

  if (status.isUnloading) {
    return;
  }

  var currentHash = status.currentHash,
      previousHash = status.previousHash;
  var isInitial = currentHash.indexOf(
  /** @type {string} */
  previousHash) >= 0;

  if (isInitial) {
    return;
  }
  /**
   * @param {Window} rootWindow
   * @param {number} intervalId
   */


  function applyReload(rootWindow, intervalId) {
    clearInterval(intervalId);
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App updated. Reloading...");
    rootWindow.location.reload();
  }

  var search = self.location.search.toLowerCase();
  var allowToHot = search.indexOf("webpack-dev-server-hot=false") === -1;
  var allowToLiveReload = search.indexOf("webpack-dev-server-live-reload=false") === -1;

  if (hot && allowToHot) {
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App hot update...");
    webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default().emit("webpackHotUpdate", status.currentHash);

    if (typeof self !== "undefined" && self.window) {
      // broadcast update to window
      self.postMessage("webpackHotUpdate".concat(status.currentHash), "*");
    }
  } // allow refreshing the page only if liveReload isn't disabled
  else if (liveReload && allowToLiveReload) {
    var rootWindow = self; // use parent window for reload (in case we're in an iframe with no valid src)

    var intervalId = self.setInterval(function () {
      if (rootWindow.location.protocol !== "about:") {
        // reload immediately if protocol is valid
        applyReload(rootWindow, intervalId);
      } else {
        rootWindow = rootWindow.parent;

        if (rootWindow.parent === rootWindow) {
          // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
          applyReload(rootWindow, intervalId);
        }
      }
    });
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reloadApp);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/sendMessage.js":
/*!*********************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/sendMessage.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* global __resourceQuery WorkerGlobalScope */
// Send messages to the outside, so plugins can consume it.

/**
 * @param {string} type
 * @param {any} [data]
 */
function sendMsg(type, data) {
  if (typeof self !== "undefined" && (typeof WorkerGlobalScope === "undefined" || !(self instanceof WorkerGlobalScope))) {
    self.postMessage({
      type: "webpack".concat(type),
      data: data
    }, "*");
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendMsg);

/***/ }),

/***/ "./node_modules/webpack/hot/emitter.js":
/*!*********************************************!*\
  !*** ./node_modules/webpack/hot/emitter.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js");
module.exports = new EventEmitter();


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!*****************************************!*\
  !*** ./node_modules/webpack/hot/log.js ***!
  \*****************************************/
/***/ ((module) => {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function (level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function (level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function (level) {
	logLevel = level;
};

module.exports.formatError = function (err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("052beebd5e60b3bba1c8")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=none&reconnect=10 ***!
  \********************************************************************************************************************************************/
var __resourceQuery = "?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=none&reconnect=10";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/log.js */ "./node_modules/webpack/hot/log.js");
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/strip-ansi/index.js */ "./node_modules/webpack-dev-server/client/modules/strip-ansi/index.js");
/* harmony import */ var _modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/parseURL.js */ "./node_modules/webpack-dev-server/client/utils/parseURL.js");
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./socket.js */ "./node_modules/webpack-dev-server/client/socket.js");
/* harmony import */ var _overlay_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./overlay.js */ "./node_modules/webpack-dev-server/client/overlay.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* harmony import */ var _utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/sendMessage.js */ "./node_modules/webpack-dev-server/client/utils/sendMessage.js");
/* harmony import */ var _utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/reloadApp.js */ "./node_modules/webpack-dev-server/client/utils/reloadApp.js");
/* harmony import */ var _utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/createSocketURL.js */ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js");
/* global __resourceQuery, __webpack_hash__ */
/// <reference types="webpack/module" />









/**
 * @typedef {Object} Options
 * @property {boolean} hot
 * @property {boolean} liveReload
 * @property {boolean} progress
 * @property {boolean | { warnings?: boolean, errors?: boolean }} overlay
 * @property {string} [logging]
 * @property {number} [reconnect]
 */

/**
 * @typedef {Object} Status
 * @property {boolean} isUnloading
 * @property {string} currentHash
 * @property {string} [previousHash]
 */

/**
 * @type {Status}
 */

var status = {
  isUnloading: false,
  // TODO Workaround for webpack v4, `__webpack_hash__` is not replaced without HotModuleReplacement
  // eslint-disable-next-line camelcase
  currentHash:  true ? __webpack_require__.h() : 0
};
/** @type {Options} */

var options = {
  hot: false,
  liveReload: false,
  progress: false,
  overlay: false
};
var parsedResourceQuery = (0,_utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__["default"])(__resourceQuery);

if (parsedResourceQuery.hot === "true") {
  options.hot = true;
  _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Hot Module Replacement enabled.");
}

if (parsedResourceQuery["live-reload"] === "true") {
  options.liveReload = true;
  _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Live Reloading enabled.");
}

if (parsedResourceQuery.logging) {
  options.logging = parsedResourceQuery.logging;
}

if (typeof parsedResourceQuery.reconnect !== "undefined") {
  options.reconnect = Number(parsedResourceQuery.reconnect);
}
/**
 * @param {string} level
 */


function setAllLogLevel(level) {
  // This is needed because the HMR logger operate separately from dev server logger
  webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default().setLogLevel(level === "verbose" || level === "log" ? "info" : level);
  (0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.setLogLevel)(level);
}

if (options.logging) {
  setAllLogLevel(options.logging);
}

self.addEventListener("beforeunload", function () {
  status.isUnloading = true;
});
var onSocketMessage = {
  hot: function hot() {
    if (parsedResourceQuery.hot === "false") {
      return;
    }

    options.hot = true;
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Hot Module Replacement enabled.");
  },
  liveReload: function liveReload() {
    if (parsedResourceQuery["live-reload"] === "false") {
      return;
    }

    options.liveReload = true;
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Live Reloading enabled.");
  },
  invalid: function invalid() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("App updated. Recompiling..."); // Fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.

    if (options.overlay) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
    }

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Invalid");
  },

  /**
   * @param {string} hash
   */
  hash: function hash(_hash) {
    status.previousHash = status.currentHash;
    status.currentHash = _hash;
  },
  logging: setAllLogLevel,

  /**
   * @param {boolean} value
   */
  overlay: function overlay(value) {
    if (typeof document === "undefined") {
      return;
    }

    options.overlay = value;
  },

  /**
   * @param {number} value
   */
  reconnect: function reconnect(value) {
    if (parsedResourceQuery.reconnect === "false") {
      return;
    }

    options.reconnect = value;
  },

  /**
   * @param {boolean} value
   */
  progress: function progress(value) {
    options.progress = value;
  },

  /**
   * @param {{ pluginName?: string, percent: number, msg: string }} data
   */
  "progress-update": function progressUpdate(data) {
    if (options.progress) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(data.pluginName ? "[".concat(data.pluginName, "] ") : "").concat(data.percent, "% - ").concat(data.msg, "."));
    }

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Progress", data);
  },
  "still-ok": function stillOk() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Nothing changed.");

    if (options.overlay) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
    }

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("StillOk");
  },
  ok: function ok() {
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Ok");

    if (options.overlay) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
    }

    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },
  // TODO: remove in v5 in favor of 'static-changed'

  /**
   * @param {string} file
   */
  "content-changed": function contentChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },

  /**
   * @param {string} file
   */
  "static-changed": function staticChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },

  /**
   * @param {Error[]} warnings
   * @param {any} params
   */
  warnings: function warnings(_warnings, params) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn("Warnings while compiling.");

    var printableWarnings = _warnings.map(function (error) {
      var _formatProblem = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("warning", error),
          header = _formatProblem.header,
          body = _formatProblem.body;

      return "".concat(header, "\n").concat(_modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1___default()(body));
    });

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Warnings", printableWarnings);

    for (var i = 0; i < printableWarnings.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn(printableWarnings[i]);
    }

    var needShowOverlayForWarnings = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.warnings;

    if (needShowOverlayForWarnings) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.show)("warning", _warnings);
    }

    if (params && params.preventReloading) {
      return;
    }

    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },

  /**
   * @param {Error[]} errors
   */
  errors: function errors(_errors) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error("Errors while compiling. Reload prevented.");

    var printableErrors = _errors.map(function (error) {
      var _formatProblem2 = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("error", error),
          header = _formatProblem2.header,
          body = _formatProblem2.body;

      return "".concat(header, "\n").concat(_modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1___default()(body));
    });

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Errors", printableErrors);

    for (var i = 0; i < printableErrors.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(printableErrors[i]);
    }

    var needShowOverlayForErrors = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.errors;

    if (needShowOverlayForErrors) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.show)("error", _errors);
    }
  },

  /**
   * @param {Error} error
   */
  error: function error(_error) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(_error);
  },
  close: function close() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Disconnected!");

    if (options.overlay) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
    }

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Close");
  }
};
var socketURL = (0,_utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__["default"])(parsedResourceQuery);
(0,_socket_js__WEBPACK_IMPORTED_MODULE_3__["default"])(socketURL, onSocketMessage, options.reconnect);
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./app/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/canvas */ "./app/components/canvas.js");


class App {
  constructor() {
    this.init();
  }

  init() {
    new _components_canvas__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

}

new App();
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***************************!*\
  !*** ./styles/index.scss ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQVk7O0FBRVo7O0FBRUE7QUFDQSxtREFBbUQsSUFBSSxTQUFTLE1BQU0sSUFBSTs7QUFFMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDO0FBQ0Q7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJEO0FBQzNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCLEdBQUc7QUFDSDtBQUNBLHVCQUF1QjtBQUN2QixHQUFHO0FBQ0gsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUNBQXVDLFVBQVUsK0JBQStCO0FBQ2hGO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9LQTtBQUVBO0FBQ0E7QUFFZSxNQUFNRyxNQUFOLENBQWE7QUFDeEJDLEVBQUFBLFdBQVcsR0FBRztBQUNWLFNBQUtDLElBQUw7QUFFQSxTQUFLSixZQUFMLEdBQW9CQSw0REFBcEI7QUFDQSxTQUFLQyxjQUFMLEdBQXNCQSw4REFBdEI7QUFFQSxTQUFLSSxPQUFMLEdBQWUsQ0FBQyxJQUFELEVBQU8sSUFBUCxDQUFmO0FBRUEsVUFBTUMsTUFBTSxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBZjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsSUFBSVYsOENBQUosQ0FBaUI7QUFBRU8sTUFBQUEsTUFBTSxFQUFFQSxNQUFWO0FBQWtCSyxNQUFBQSxHQUFHLEVBQUU7QUFBdkIsS0FBakIsQ0FBaEI7QUFDQSxTQUFLQyxFQUFMLEdBQVUsS0FBS0gsUUFBTCxDQUFjRyxFQUF4QixDQVZVLENBWVY7O0FBQ0EsU0FBS0MsTUFBTCxHQUFjLENBQWQ7QUFDQSxTQUFLQyxLQUFMLEdBQWEsSUFBSWYsMENBQUosQ0FBYSxDQUFDLENBQWQsQ0FBYjtBQUNBLFNBQUtpQixRQUFMLEdBQWdCLElBQUlqQiwwQ0FBSixFQUFoQjtBQUVBLFNBQUtrQixPQUFMLEdBQWUsSUFBSWxCLDZDQUFKLENBQWdCLEtBQUthLEVBQXJCLENBQWY7QUFFQSxTQUFLTyxRQUFMLEdBQWdCQyxTQUFoQjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsSUFBSXRCLDBDQUFKLEVBQWpCO0FBRUEsU0FBS3VCLEdBQUwsR0FBV0YsU0FBWDtBQUVBLFNBQUtHLElBQUw7QUFDSDs7QUFFRG5CLEVBQUFBLElBQUksR0FBRztBQUNILEtBQUMsYUFBRCxFQUFnQixRQUFoQixFQUNLb0IsT0FETCxDQUNhQyxFQUFFLElBQUksS0FBS0EsRUFBTCxJQUFXLEtBQUtBLEVBQUwsRUFBU3JCLElBQVQsQ0FBYyxJQUFkLENBRDlCO0FBRUgsR0EvQnVCLENBaUN4Qjs7O0FBQ0FzQixFQUFBQSxNQUFNLEdBQUc7QUFDTCxRQUFJQyxFQUFKLEVBQVFDLEVBQVI7QUFDQSxRQUFJQyxXQUFXLEdBQUcsS0FBS3hCLE9BQUwsQ0FBYSxDQUFiLElBQWtCLEtBQUtBLE9BQUwsQ0FBYSxDQUFiLENBQXBDOztBQUVBLFFBQUl5QixNQUFNLENBQUNDLFdBQVAsR0FBcUJELE1BQU0sQ0FBQ0UsVUFBNUIsR0FBeUNILFdBQTdDLEVBQTBEO0FBQ3RERixNQUFBQSxFQUFFLEdBQUcsQ0FBTDtBQUNBQyxNQUFBQSxFQUFFLEdBQUdFLE1BQU0sQ0FBQ0MsV0FBUCxHQUFxQkQsTUFBTSxDQUFDRSxVQUE1QixHQUF5Q0gsV0FBOUM7QUFDSCxLQUhELE1BR087QUFDSEYsTUFBQUEsRUFBRSxHQUFJRyxNQUFNLENBQUNFLFVBQVAsR0FBb0JGLE1BQU0sQ0FBQ0MsV0FBNUIsR0FBMkNGLFdBQWhEO0FBQ0FELE1BQUFBLEVBQUUsR0FBRyxDQUFMO0FBQ0g7O0FBRUQsU0FBS0ssSUFBTCxDQUFVQyxPQUFWLENBQWtCQyxRQUFsQixDQUEyQkMsR0FBM0IsQ0FBK0JDLEtBQS9CLEdBQXVDLElBQUl0QywwQ0FBSixDQUNuQytCLE1BQU0sQ0FBQ0UsVUFENEIsRUFFbkNGLE1BQU0sQ0FBQ0MsV0FGNEIsRUFHbkNKLEVBSG1DLEVBSW5DQyxFQUptQyxDQUF2QztBQU9BLFNBQUtuQixRQUFMLENBQWM4QixPQUFkLENBQXNCVCxNQUFNLENBQUNFLFVBQTdCLEVBQXlDRixNQUFNLENBQUNDLFdBQWhEO0FBQ0EsU0FBS2xCLE1BQUwsR0FBY2lCLE1BQU0sQ0FBQ0UsVUFBUCxHQUFvQkYsTUFBTSxDQUFDQyxXQUF6QztBQUNIOztBQUVEUyxFQUFBQSxjQUFjLEdBQUc7QUFDYjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsSUFBSTFDLDhDQUFKLENBQWlCLEtBQUthLEVBQXRCLEVBQTBCO0FBQ2xDK0IsTUFBQUEsUUFBUSxFQUFFO0FBQ1ZDLFFBQUFBLElBQUksRUFBRSxDQURJO0FBRVZDLFFBQUFBLElBQUksRUFBRSxJQUFJQyxZQUFKLENBQWlCLENBQUMsQ0FBQyxDQUFGLEVBQUssQ0FBQyxDQUFOLEVBQVMsQ0FBVCxFQUFZLENBQUMsQ0FBYixFQUFnQixDQUFDLENBQWpCLEVBQW9CLENBQXBCLENBQWpCO0FBRkksT0FEd0I7QUFLdENDLE1BQUFBLEVBQUUsRUFBRTtBQUFFSCxRQUFBQSxJQUFJLEVBQUUsQ0FBUjtBQUFXQyxRQUFBQSxJQUFJLEVBQUUsSUFBSUMsWUFBSixDQUFpQixDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLENBQWpCO0FBQWpCO0FBTGtDLEtBQTFCLENBQWhCO0FBT0g7O0FBRURFLEVBQUFBLGFBQWEsR0FBRztBQUNaLFNBQUtDLE9BQUwsR0FBZSxJQUFJbEQsNkNBQUosQ0FBZ0IsS0FBS2EsRUFBckIsRUFBeUI7QUFDcEN1QyxNQUFBQSxTQUFTLEVBQUUsS0FBS3ZDLEVBQUwsQ0FBUXdDLE1BRGlCO0FBRXBDQyxNQUFBQSxTQUFTLEVBQUUsS0FBS3pDLEVBQUwsQ0FBUXdDO0FBRmlCLEtBQXpCLENBQWY7QUFLQSxVQUFNRSxHQUFHLEdBQUcsSUFBSUMsS0FBSixFQUFaOztBQUNBRCxJQUFBQSxHQUFHLENBQUNFLE1BQUosR0FBYSxNQUFPLEtBQUtQLE9BQUwsQ0FBYVEsS0FBYixHQUFxQkgsR0FBekM7O0FBQ0FBLElBQUFBLEdBQUcsQ0FBQ0ksV0FBSixHQUFrQixXQUFsQjtBQUNBSixJQUFBQSxHQUFHLENBQUNLLEdBQUosR0FBVSxVQUFWO0FBRUEsUUFBSWhDLEVBQUosRUFBUUMsRUFBUjtBQUNBLFFBQUlDLFdBQVcsR0FBRyxLQUFLeEIsT0FBTCxDQUFhLENBQWIsSUFBa0IsS0FBS0EsT0FBTCxDQUFhLENBQWIsQ0FBcEM7O0FBRUEsUUFBSXlCLE1BQU0sQ0FBQ0MsV0FBUCxHQUFxQkQsTUFBTSxDQUFDRSxVQUE1QixHQUF5Q0gsV0FBN0MsRUFBMEQ7QUFDdERGLE1BQUFBLEVBQUUsR0FBRyxDQUFMO0FBQ0FDLE1BQUFBLEVBQUUsR0FBR0UsTUFBTSxDQUFDQyxXQUFQLEdBQXFCRCxNQUFNLENBQUNFLFVBQTVCLEdBQXlDSCxXQUE5QztBQUNILEtBSEQsTUFHTztBQUNIRixNQUFBQSxFQUFFLEdBQUlHLE1BQU0sQ0FBQ0UsVUFBUCxHQUFvQkYsTUFBTSxDQUFDQyxXQUE1QixHQUEyQ0YsV0FBaEQ7QUFDQUQsTUFBQUEsRUFBRSxHQUFHLENBQUw7QUFDSDs7QUFFRCxXQUFPO0FBQUVELE1BQUFBLEVBQUY7QUFBTUMsTUFBQUE7QUFBTixLQUFQO0FBQ0g7O0FBRURnQyxFQUFBQSxhQUFhLEdBQUc7QUFDWixVQUFNQyxhQUFhLEdBQUcsS0FBS2IsYUFBTCxFQUF0QjtBQUVBLFNBQUtkLE9BQUwsR0FBZSxJQUFJbkMsNkNBQUosQ0FBZ0IsS0FBS2EsRUFBckIsRUFBeUI7QUFDcENtRCxNQUFBQSxNQUFNLEVBQUUsS0FBSy9ELFlBRHVCO0FBRXBDZ0UsTUFBQUEsUUFBUSxFQUFFLEtBQUsvRCxjQUZxQjtBQUdwQ2tDLE1BQUFBLFFBQVEsRUFBRTtBQUNWOEIsUUFBQUEsS0FBSyxFQUFFO0FBQUU1QixVQUFBQSxLQUFLLEVBQUU7QUFBVCxTQURHO0FBRVY2QixRQUFBQSxNQUFNLEVBQUU7QUFBRTdCLFVBQUFBLEtBQUssRUFBRSxLQUFLWTtBQUFkLFNBRkU7QUFHVmIsUUFBQUEsR0FBRyxFQUFFO0FBQ0RDLFVBQUFBLEtBQUssRUFBRSxJQUFJdEMsMENBQUosQ0FBYStCLE1BQU0sQ0FBQ0UsVUFBcEIsRUFBZ0NGLE1BQU0sQ0FBQ0MsV0FBdkMsRUFBb0Q4QixhQUFhLENBQUNsQyxFQUFsRSxFQUFzRWtDLGFBQWEsQ0FBQ2pDLEVBQXBGO0FBRE4sU0FISztBQU1WMEIsUUFBQUEsR0FBRyxFQUFFO0FBQUVqQixVQUFBQSxLQUFLLEVBQUUsSUFBSXRDLDBDQUFKLENBQWEsS0FBS00sT0FBTCxDQUFhLENBQWIsQ0FBYixFQUE4QixLQUFLQSxPQUFMLENBQWEsQ0FBYixDQUE5QjtBQUFULFNBTks7QUFPVjtBQUNBO0FBQ0E7QUFDQThELFFBQUFBLEtBQUssRUFBRSxLQUFLbEQsT0FBTCxDQUFhbUQ7QUFWVjtBQUgwQixLQUF6QixDQUFmO0FBZ0JIOztBQUVEQyxFQUFBQSxVQUFVLEdBQUc7QUFDVCxTQUFLcEMsSUFBTCxHQUFZLElBQUlsQywwQ0FBSixDQUFhLEtBQUthLEVBQWxCLEVBQXNCO0FBQUU2QixNQUFBQSxRQUFRLEVBQUUsS0FBS0EsUUFBakI7QUFBMkJQLE1BQUFBLE9BQU8sRUFBRSxLQUFLQTtBQUF6QyxLQUF0QixDQUFaO0FBQ0g7O0FBRURxQyxFQUFBQSxXQUFXLENBQUNDLENBQUQsRUFBSTtBQUNYQSxJQUFBQSxDQUFDLENBQUNDLGNBQUY7O0FBRUEsUUFBSUQsQ0FBQyxDQUFDRSxjQUFGLElBQW9CRixDQUFDLENBQUNFLGNBQUYsQ0FBaUJDLE1BQXpDLEVBQWlEO0FBQzdDSCxNQUFBQSxDQUFDLENBQUNJLENBQUYsR0FBTUosQ0FBQyxDQUFDRSxjQUFGLENBQWlCLENBQWpCLEVBQW9CRyxLQUExQjtBQUNBTCxNQUFBQSxDQUFDLENBQUNNLENBQUYsR0FBTU4sQ0FBQyxDQUFDRSxjQUFGLENBQWlCLENBQWpCLEVBQW9CSyxLQUExQjtBQUNIOztBQUNELFFBQUlQLENBQUMsQ0FBQ0ksQ0FBRixLQUFReEQsU0FBWixFQUF1QjtBQUNuQm9ELE1BQUFBLENBQUMsQ0FBQ0ksQ0FBRixHQUFNSixDQUFDLENBQUNLLEtBQVI7QUFDQUwsTUFBQUEsQ0FBQyxDQUFDTSxDQUFGLEdBQU1OLENBQUMsQ0FBQ08sS0FBUjtBQUNILEtBVlUsQ0FZWDs7O0FBQ0EsU0FBS2pFLEtBQUwsQ0FBV2tFLEdBQVgsQ0FBZVIsQ0FBQyxDQUFDSSxDQUFGLEdBQU0sS0FBS2hFLEVBQUwsQ0FBUUgsUUFBUixDQUFpQndFLEtBQXRDLEVBQTZDLE1BQU1ULENBQUMsQ0FBQ00sQ0FBRixHQUFNLEtBQUtsRSxFQUFMLENBQVFILFFBQVIsQ0FBaUJ5RSxNQUExRSxFQWJXLENBZVg7O0FBQ0EsUUFBSSxDQUFDLEtBQUsvRCxRQUFWLEVBQW9CO0FBQ2hCO0FBQ0EsV0FBS0EsUUFBTCxHQUFnQmdFLFdBQVcsQ0FBQ0MsR0FBWixFQUFoQjtBQUNBLFdBQUsvRCxTQUFMLENBQWUyRCxHQUFmLENBQW1CUixDQUFDLENBQUNJLENBQXJCLEVBQXdCSixDQUFDLENBQUNNLENBQTFCO0FBQ0g7O0FBRUQsVUFBTU8sTUFBTSxHQUFHYixDQUFDLENBQUNJLENBQUYsR0FBTSxLQUFLdkQsU0FBTCxDQUFldUQsQ0FBcEM7QUFDQSxVQUFNVSxNQUFNLEdBQUdkLENBQUMsQ0FBQ00sQ0FBRixHQUFNLEtBQUt6RCxTQUFMLENBQWV5RCxDQUFwQztBQUVBLFNBQUt6RCxTQUFMLENBQWUyRCxHQUFmLENBQW1CUixDQUFDLENBQUNJLENBQXJCLEVBQXdCSixDQUFDLENBQUNNLENBQTFCO0FBRUEsUUFBSVMsSUFBSSxHQUFHSixXQUFXLENBQUNDLEdBQVosRUFBWCxDQTNCVyxDQTZCWDs7QUFDQSxRQUFJSSxLQUFLLEdBQUdDLElBQUksQ0FBQ0MsR0FBTCxDQUFTLElBQVQsRUFBZUgsSUFBSSxHQUFHLEtBQUtwRSxRQUEzQixDQUFaO0FBQ0EsU0FBS0EsUUFBTCxHQUFnQm9FLElBQWhCO0FBRUEsU0FBS3ZFLFFBQUwsQ0FBYzRELENBQWQsR0FBa0JTLE1BQU0sR0FBR0csS0FBM0I7QUFDQSxTQUFLeEUsUUFBTCxDQUFjOEQsQ0FBZCxHQUFrQlEsTUFBTSxHQUFHRSxLQUEzQixDQWxDVyxDQW9DWDs7QUFDQSxTQUFLeEUsUUFBTCxDQUFjMkUsV0FBZCxHQUE0QixJQUE1QjtBQUNIOztBQUVEQyxFQUFBQSxNQUFNLENBQUNDLENBQUQsRUFBSTtBQUNOQyxJQUFBQSxxQkFBcUIsQ0FBQyxLQUFLRixNQUFOLENBQXJCLENBRE0sQ0FHTjs7QUFDQSxRQUFJLENBQUMsS0FBSzVFLFFBQUwsQ0FBYzJFLFdBQW5CLEVBQWdDO0FBQzVCLFdBQUs3RSxLQUFMLENBQVdrRSxHQUFYLENBQWUsQ0FBQyxDQUFoQjtBQUNBLFdBQUtoRSxRQUFMLENBQWNnRSxHQUFkLENBQWtCLENBQWxCO0FBQ0g7O0FBRUQsU0FBS2hFLFFBQUwsQ0FBYzJFLFdBQWQsR0FBNEIsS0FBNUIsQ0FUTSxDQVdOOztBQUNBLFNBQUsxRSxPQUFMLENBQWFKLE1BQWIsR0FBc0IsS0FBS0EsTUFBM0I7QUFDQSxTQUFLSSxPQUFMLENBQWFILEtBQWIsQ0FBbUJpRixJQUFuQixDQUF3QixLQUFLakYsS0FBN0IsRUFiTSxDQWVOOztBQUNBLFNBQUtHLE9BQUwsQ0FBYUQsUUFBYixDQUFzQmdGLElBQXRCLENBQTJCLEtBQUtoRixRQUFoQyxFQUEwQyxLQUFLQSxRQUFMLENBQWNpRixHQUFkLEdBQW9CLElBQXBCLEdBQTJCLEdBQXJFO0FBQ0EsU0FBS2hGLE9BQUwsQ0FBYTJFLE1BQWI7QUFFQSxTQUFLMUQsT0FBTCxDQUFhQyxRQUFiLENBQXNCOEIsS0FBdEIsQ0FBNEI1QixLQUE1QixHQUFvQ3dELENBQUMsR0FBRyxJQUF4QztBQUVBLFNBQUtwRixRQUFMLENBQWN5RixNQUFkLENBQXFCO0FBQUVDLE1BQUFBLEtBQUssRUFBRSxLQUFLbEU7QUFBZCxLQUFyQjtBQUNIOztBQUVENkQsRUFBQUEscUJBQXFCLEdBQUc7QUFDcEIsU0FBS3hFLEdBQUwsR0FBV3dFLHFCQUFxQixDQUFDLEtBQUtGLE1BQU4sQ0FBaEM7QUFDSDs7QUFFRFEsRUFBQUEsb0JBQW9CLEdBQUc7QUFDbkJBLElBQUFBLG9CQUFvQixDQUFDLEtBQUs5RSxHQUFOLENBQXBCO0FBQ0g7O0FBRUQrRSxFQUFBQSxpQkFBaUIsR0FBRztBQUNoQixTQUFLVCxNQUFMLEdBRGdCLENBR2hCOztBQUNBLFVBQU1VLGNBQWMsSUFBRyxrQkFBa0J4RSxNQUFyQixDQUFwQjs7QUFDQSxRQUFJd0UsY0FBSixFQUFvQjtBQUNoQnhFLE1BQUFBLE1BQU0sQ0FBQ3lFLGdCQUFQLENBQXdCLFlBQXhCLEVBQXNDLEtBQUtoQyxXQUEzQyxFQUF3RCxLQUF4RDtBQUNBekMsTUFBQUEsTUFBTSxDQUFDeUUsZ0JBQVAsQ0FBd0IsV0FBeEIsRUFBcUMsS0FBS2hDLFdBQTFDLEVBQXVEO0FBQUVpQyxRQUFBQSxPQUFPLEVBQUU7QUFBWCxPQUF2RDtBQUNILEtBSEQsTUFHTztBQUNIMUUsTUFBQUEsTUFBTSxDQUFDeUUsZ0JBQVAsQ0FBd0IsV0FBeEIsRUFBcUMsS0FBS2hDLFdBQTFDLEVBQXVELEtBQXZEO0FBQ0g7O0FBRUR6QyxJQUFBQSxNQUFNLENBQUN5RSxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxLQUFLN0UsTUFBdkMsRUFBK0MsS0FBL0M7QUFDSDs7QUFFRCtFLEVBQUFBLG9CQUFvQixHQUFHO0FBQ25CLFNBQUtMLG9CQUFMLENBQTBCLEtBQUs5RSxHQUEvQjtBQUVBLFVBQU1nRixjQUFjLElBQUcsa0JBQWtCeEUsTUFBckIsQ0FBcEI7O0FBQ0EsUUFBSXdFLGNBQUosRUFBb0I7QUFDaEJ4RSxNQUFBQSxNQUFNLENBQUM0RSxtQkFBUCxDQUEyQixZQUEzQixFQUF5QyxLQUFLbkMsV0FBOUMsRUFBMkQsS0FBM0Q7QUFDQXpDLE1BQUFBLE1BQU0sQ0FBQzRFLG1CQUFQLENBQTJCLFdBQTNCLEVBQXdDLEtBQUtuQyxXQUE3QyxFQUEwRDtBQUFFaUMsUUFBQUEsT0FBTyxFQUFFO0FBQVgsT0FBMUQ7QUFDSCxLQUhELE1BR087QUFDSDFFLE1BQUFBLE1BQU0sQ0FBQzRFLG1CQUFQLENBQTJCLFdBQTNCLEVBQXdDLEtBQUtuQyxXQUE3QyxFQUEwRCxLQUExRDtBQUNIOztBQUVEekMsSUFBQUEsTUFBTSxDQUFDNEUsbUJBQVAsQ0FBMkIsUUFBM0IsRUFBcUNoRixNQUFyQyxFQUE2QyxLQUE3QztBQUNIOztBQUVEaUYsRUFBQUEsT0FBTyxHQUFHO0FBQ04sU0FBS0Ysb0JBQUw7QUFDSDs7QUFFRGxGLEVBQUFBLElBQUksR0FBRztBQUNILFNBQUtpQixjQUFMO0FBQ0EsU0FBS29CLGFBQUw7QUFDQSxTQUFLUyxVQUFMO0FBQ0EsU0FBS2dDLGlCQUFMO0FBQ0EsU0FBSzNFLE1BQUw7QUFDSDs7QUFyT3VCOzs7Ozs7Ozs7Ozs7Ozs7QUNMckIsTUFBTTNCLEdBQUcsR0FBQyxVQUFTNkcsQ0FBVCxFQUFXO0FBQUM7O0FBQWEsV0FBU2YsQ0FBVCxDQUFXZSxDQUFYLEVBQWE7QUFBQyxRQUFJQyxDQUFDLEdBQUNELENBQUMsQ0FBQyxDQUFELENBQVA7QUFBQSxRQUFXRSxDQUFDLEdBQUNGLENBQUMsQ0FBQyxDQUFELENBQWQ7QUFBQSxRQUFrQkcsQ0FBQyxHQUFDSCxDQUFDLENBQUMsQ0FBRCxDQUFyQjtBQUF5QixXQUFPbkIsSUFBSSxDQUFDdUIsSUFBTCxDQUFVSCxDQUFDLEdBQUNBLENBQUYsR0FBSUMsQ0FBQyxHQUFDQSxDQUFOLEdBQVFDLENBQUMsR0FBQ0EsQ0FBcEIsQ0FBUDtBQUE4Qjs7QUFBQSxXQUFTRSxDQUFULENBQVdMLENBQVgsRUFBYUMsQ0FBYixFQUFlO0FBQUMsV0FBT0QsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFDLENBQUMsQ0FBRCxDQUFOLEVBQVVELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBaEIsRUFBb0JELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBMUIsRUFBOEJELENBQXJDO0FBQXVDOztBQUFBLFdBQVNNLENBQVQsQ0FBV04sQ0FBWCxFQUFhQyxDQUFiLEVBQWVDLENBQWYsRUFBaUI7QUFBQyxXQUFPRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBWCxFQUFlRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBMUIsRUFBOEJGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFDLENBQUMsQ0FBRCxDQUF6QyxFQUE2Q0YsQ0FBcEQ7QUFBc0Q7O0FBQUEsV0FBU08sQ0FBVCxDQUFXUCxDQUFYLEVBQWFDLENBQWIsRUFBZUMsQ0FBZixFQUFpQjtBQUFDLFdBQU9GLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFDLENBQUMsQ0FBRCxDQUFYLEVBQWVGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFDLENBQUMsQ0FBRCxDQUExQixFQUE4QkYsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUMsQ0FBQyxDQUFELENBQXpDLEVBQTZDRixDQUFwRDtBQUFzRDs7QUFBQSxXQUFTaEMsQ0FBVCxDQUFXZ0MsQ0FBWCxFQUFhQyxDQUFiLEVBQWVDLENBQWYsRUFBaUI7QUFBQyxXQUFPRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBVixFQUFZRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBdEIsRUFBd0JGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFsQyxFQUFvQ0YsQ0FBM0M7QUFBNkM7O0FBQUEsV0FBUzlCLENBQVQsQ0FBV2dDLENBQVgsRUFBYUYsQ0FBYixFQUFlO0FBQUMsUUFBSUcsQ0FBQyxHQUFDSCxDQUFDLENBQUMsQ0FBRCxDQUFQO0FBQUEsUUFBV3BDLENBQUMsR0FBQ29DLENBQUMsQ0FBQyxDQUFELENBQWQ7QUFBQSxRQUFrQlEsQ0FBQyxHQUFDUixDQUFDLENBQUMsQ0FBRCxDQUFyQjtBQUFBLFFBQXlCQyxDQUFDLEdBQUNFLENBQUMsR0FBQ0EsQ0FBRixHQUFJdkMsQ0FBQyxHQUFDQSxDQUFOLEdBQVE0QyxDQUFDLEdBQUNBLENBQXJDO0FBQXVDLFdBQU9QLENBQUMsR0FBQyxDQUFGLEtBQU1BLENBQUMsR0FBQyxJQUFFcEIsSUFBSSxDQUFDdUIsSUFBTCxDQUFVSCxDQUFWLENBQVYsR0FBd0JDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0YsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFsQyxFQUFvQ0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQTlDLEVBQWdEQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBMUQsRUFBNERDLENBQW5FO0FBQXFFOztBQUFBLFdBQVNPLENBQVQsQ0FBV1QsQ0FBWCxFQUFhQyxDQUFiLEVBQWU7QUFBQyxXQUFPRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUMsQ0FBQyxDQUFELENBQU4sR0FBVUQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFDLENBQUMsQ0FBRCxDQUFoQixHQUFvQkQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFDLENBQUMsQ0FBRCxDQUFqQztBQUFxQzs7QUFBQSxNQUFJUyxDQUFDLEdBQUMsWUFBVTtBQUFDLFFBQUlWLENBQUMsR0FBQyxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxDQUFOO0FBQUEsUUFBY0MsQ0FBQyxHQUFDLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLENBQWhCO0FBQXdCLFdBQU8sVUFBU0UsQ0FBVCxFQUFXdkMsQ0FBWCxFQUFhO0FBQUN5QyxNQUFBQSxDQUFDLENBQUNMLENBQUQsRUFBR0csQ0FBSCxDQUFELEVBQU9FLENBQUMsQ0FBQ0osQ0FBRCxFQUFHckMsQ0FBSCxDQUFSLEVBQWNNLENBQUMsQ0FBQzhCLENBQUQsRUFBR0EsQ0FBSCxDQUFmLEVBQXFCOUIsQ0FBQyxDQUFDK0IsQ0FBRCxFQUFHQSxDQUFILENBQXRCO0FBQTRCLFVBQUlDLENBQUMsR0FBQ08sQ0FBQyxDQUFDVCxDQUFELEVBQUdDLENBQUgsQ0FBUDtBQUFhLGFBQU9DLENBQUMsR0FBQyxDQUFGLEdBQUksQ0FBSixHQUFNQSxDQUFDLEdBQUUsQ0FBQyxDQUFKLEdBQU1yQixJQUFJLENBQUM4QixFQUFYLEdBQWM5QixJQUFJLENBQUMrQixJQUFMLENBQVVWLENBQVYsQ0FBM0I7QUFBd0MsS0FBdEc7QUFBdUcsR0FBMUksRUFBTjs7QUFBbUosUUFBTUQsQ0FBTixTQUFnQlksS0FBaEIsQ0FBcUI7QUFBQ3RILElBQUFBLFdBQVcsQ0FBQ3lHLENBQUMsR0FBQyxDQUFILEVBQUtDLENBQUMsR0FBQ0QsQ0FBUCxFQUFTRSxDQUFDLEdBQUNGLENBQVgsRUFBYTtBQUFDLGFBQU8sTUFBTUEsQ0FBTixFQUFRQyxDQUFSLEVBQVVDLENBQVYsR0FBYSxJQUFwQjtBQUF5Qjs7QUFBSyxRQUFEbEMsQ0FBQyxHQUFFO0FBQUMsYUFBTyxLQUFLLENBQUwsQ0FBUDtBQUFlOztBQUFLLFFBQURBLENBQUMsQ0FBQ2dDLENBQUQsRUFBRztBQUFDLFdBQUssQ0FBTCxJQUFRQSxDQUFSO0FBQVU7O0FBQUssUUFBRDlCLENBQUMsR0FBRTtBQUFDLGFBQU8sS0FBSyxDQUFMLENBQVA7QUFBZTs7QUFBSyxRQUFEQSxDQUFDLENBQUM4QixDQUFELEVBQUc7QUFBQyxXQUFLLENBQUwsSUFBUUEsQ0FBUjtBQUFVOztBQUFLLFFBQURTLENBQUMsR0FBRTtBQUFDLGFBQU8sS0FBSyxDQUFMLENBQVA7QUFBZTs7QUFBSyxRQUFEQSxDQUFDLENBQUNULENBQUQsRUFBRztBQUFDLFdBQUssQ0FBTCxJQUFRQSxDQUFSO0FBQVU7O0FBQUE1QixJQUFBQSxHQUFHLENBQUM0QixDQUFELEVBQUdRLENBQUMsR0FBQ1IsQ0FBTCxFQUFPYyxDQUFDLEdBQUNkLENBQVQsRUFBVztBQUFDLFVBQUlDLENBQUosRUFBTUMsQ0FBTixFQUFRQyxDQUFSLEVBQVV2QyxDQUFWO0FBQVksYUFBT29DLENBQUMsQ0FBQ2pDLE1BQUYsR0FBUyxLQUFLb0IsSUFBTCxDQUFVYSxDQUFWLENBQVQsSUFBdUJDLENBQUMsR0FBQyxJQUFGLEVBQU9DLENBQUMsR0FBQ0YsQ0FBVCxFQUFXRyxDQUFDLEdBQUNLLENBQWIsRUFBZTVDLENBQUMsR0FBQ2tELENBQWpCLEVBQW1CYixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQXhCLEVBQTBCRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtFLENBQS9CLEVBQWlDRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtyQyxDQUF0QyxFQUF3QyxJQUEvRCxDQUFQO0FBQTRFOztBQUFBdUIsSUFBQUEsSUFBSSxDQUFDYSxDQUFELEVBQUc7QUFBQyxhQUFPSyxDQUFDLENBQUMsSUFBRCxFQUFNTCxDQUFOLENBQUQsRUFBVSxJQUFqQjtBQUFzQjs7QUFBQWUsSUFBQUEsR0FBRyxDQUFDZixDQUFELEVBQUdDLENBQUgsRUFBSztBQUFDLGFBQU9BLENBQUMsR0FBQ0ssQ0FBQyxDQUFDLElBQUQsRUFBTU4sQ0FBTixFQUFRQyxDQUFSLENBQUYsR0FBYUssQ0FBQyxDQUFDLElBQUQsRUFBTSxJQUFOLEVBQVdOLENBQVgsQ0FBZixFQUE2QixJQUFwQztBQUF5Qzs7QUFBQWdCLElBQUFBLEdBQUcsQ0FBQ2hCLENBQUQsRUFBR0MsQ0FBSCxFQUFLO0FBQUMsYUFBT0EsQ0FBQyxHQUFDTSxDQUFDLENBQUMsSUFBRCxFQUFNUCxDQUFOLEVBQVFDLENBQVIsQ0FBRixHQUFhTSxDQUFDLENBQUMsSUFBRCxFQUFNLElBQU4sRUFBV1AsQ0FBWCxDQUFmLEVBQTZCLElBQXBDO0FBQXlDOztBQUFBaUIsSUFBQUEsUUFBUSxDQUFDZixDQUFELEVBQUc7QUFBQyxVQUFJQyxDQUFKLEVBQU1ILENBQU4sRUFBUUMsQ0FBUjtBQUFVLGFBQU9DLENBQUMsQ0FBQ25DLE1BQUYsSUFBVWlDLENBQUMsR0FBQyxJQUFGLEVBQU9DLENBQUMsR0FBQ0MsQ0FBVCxFQUFXLENBQUNDLENBQUMsR0FBQyxJQUFILEVBQVMsQ0FBVCxJQUFZSCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUMsQ0FBQyxDQUFELENBQTdCLEVBQWlDRSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtILENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBNUMsRUFBZ0RFLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0gsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFDLENBQUMsQ0FBRCxDQUFyRSxJQUEwRWpDLENBQUMsQ0FBQyxJQUFELEVBQU0sSUFBTixFQUFXa0MsQ0FBWCxDQUEzRSxFQUF5RixJQUFoRztBQUFxRzs7QUFBQWdCLElBQUFBLE1BQU0sQ0FBQ2hCLENBQUQsRUFBRztBQUFDLFVBQUlDLENBQUosRUFBTUgsQ0FBTixFQUFRQyxDQUFSO0FBQVUsYUFBT0MsQ0FBQyxDQUFDbkMsTUFBRixJQUFVaUMsQ0FBQyxHQUFDLElBQUYsRUFBT0MsQ0FBQyxHQUFDQyxDQUFULEVBQVcsQ0FBQ0MsQ0FBQyxHQUFDLElBQUgsRUFBUyxDQUFULElBQVlILENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBN0IsRUFBaUNFLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0gsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFDLENBQUMsQ0FBRCxDQUE1QyxFQUFnREUsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLSCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUMsQ0FBQyxDQUFELENBQXJFLElBQTBFakMsQ0FBQyxDQUFDLElBQUQsRUFBTSxJQUFOLEVBQVcsSUFBRWtDLENBQWIsQ0FBM0UsRUFBMkYsSUFBbEc7QUFBdUc7O0FBQUFpQixJQUFBQSxPQUFPLENBQUNqQixDQUFDLEdBQUMsSUFBSCxFQUFRO0FBQUMsVUFBSUQsQ0FBSixFQUFNRCxDQUFOO0FBQVEsYUFBT0EsQ0FBQyxHQUFDRSxDQUFGLEVBQUksQ0FBQ0QsQ0FBQyxHQUFDLElBQUgsRUFBUyxDQUFULElBQVksSUFBRUQsQ0FBQyxDQUFDLENBQUQsQ0FBbkIsRUFBdUJDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxJQUFFRCxDQUFDLENBQUMsQ0FBRCxDQUEvQixFQUFtQ0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLElBQUVELENBQUMsQ0FBQyxDQUFELENBQTNDLEVBQStDLElBQXREO0FBQTJEOztBQUFBWCxJQUFBQSxHQUFHLEdBQUU7QUFBQyxhQUFPSixDQUFDLENBQUMsSUFBRCxDQUFSO0FBQWU7O0FBQUFtQyxJQUFBQSxRQUFRLENBQUNaLENBQUQsRUFBRztBQUFDLFVBQUlSLENBQUosRUFBTUMsQ0FBTjtBQUFRLFVBQUlDLENBQUosRUFBTUMsQ0FBTixFQUFRdkMsQ0FBUjtBQUFVLGFBQU80QyxDQUFDLElBQUVSLENBQUMsR0FBQyxJQUFGLEVBQU9FLENBQUMsR0FBQyxDQUFDRCxDQUFDLEdBQUNPLENBQUgsRUFBTSxDQUFOLElBQVNSLENBQUMsQ0FBQyxDQUFELENBQW5CLEVBQXVCRyxDQUFDLEdBQUNGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0QsQ0FBQyxDQUFDLENBQUQsQ0FBL0IsRUFBbUNwQyxDQUFDLEdBQUNxQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtELENBQUMsQ0FBQyxDQUFELENBQTNDLEVBQStDbkIsSUFBSSxDQUFDdUIsSUFBTCxDQUFVRixDQUFDLEdBQUNBLENBQUYsR0FBSUMsQ0FBQyxHQUFDQSxDQUFOLEdBQVF2QyxDQUFDLEdBQUNBLENBQXBCLENBQWpELElBQXlFcUIsQ0FBQyxDQUFDLElBQUQsQ0FBbEY7QUFBeUY7O0FBQUFvQyxJQUFBQSxVQUFVLEdBQUU7QUFBQyxhQUFPLEtBQUtDLGVBQUwsRUFBUDtBQUE4Qjs7QUFBQUEsSUFBQUEsZUFBZSxDQUFDQyxDQUFELEVBQUc7QUFBQyxVQUFJdkIsQ0FBSixFQUFNRSxDQUFOLEVBQVFELENBQVI7QUFBVSxVQUFJRSxDQUFKLEVBQU12QyxDQUFOLEVBQVE0QyxDQUFSLEVBQVVNLENBQVYsRUFBWVUsQ0FBWixFQUFjQyxDQUFkO0FBQWdCLGFBQU9GLENBQUMsSUFBRXZCLENBQUMsR0FBQyxJQUFGLEVBQU9HLENBQUMsR0FBQyxDQUFDRCxDQUFDLEdBQUNxQixDQUFILEVBQU0sQ0FBTixJQUFTdkIsQ0FBQyxDQUFDLENBQUQsQ0FBbkIsRUFBdUJwQyxDQUFDLEdBQUNzQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtGLENBQUMsQ0FBQyxDQUFELENBQS9CLEVBQW1DUSxDQUFDLEdBQUNOLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0YsQ0FBQyxDQUFDLENBQUQsQ0FBM0MsRUFBK0NHLENBQUMsR0FBQ0EsQ0FBRixHQUFJdkMsQ0FBQyxHQUFDQSxDQUFOLEdBQVE0QyxDQUFDLEdBQUNBLENBQTNELEtBQStEUCxDQUFDLEdBQUMsSUFBRixFQUFPYSxDQUFDLEdBQUNiLENBQUMsQ0FBQyxDQUFELENBQVYsRUFBY3VCLENBQUMsR0FBQ3ZCLENBQUMsQ0FBQyxDQUFELENBQWpCLEVBQXFCd0IsQ0FBQyxHQUFDeEIsQ0FBQyxDQUFDLENBQUQsQ0FBeEIsRUFBNEJhLENBQUMsR0FBQ0EsQ0FBRixHQUFJVSxDQUFDLEdBQUNBLENBQU4sR0FBUUMsQ0FBQyxHQUFDQSxDQUFyRyxDQUFSO0FBQWdIOztBQUFBQyxJQUFBQSxNQUFNLENBQUN4QixDQUFDLEdBQUMsSUFBSCxFQUFRO0FBQUMsVUFBSUQsQ0FBSixFQUFNRCxDQUFOO0FBQVEsYUFBT0EsQ0FBQyxHQUFDRSxDQUFGLEVBQUksQ0FBQ0QsQ0FBQyxHQUFDLElBQUgsRUFBUyxDQUFULElBQVksQ0FBQ0QsQ0FBQyxDQUFDLENBQUQsQ0FBbEIsRUFBc0JDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDRCxDQUFDLENBQUMsQ0FBRCxDQUE3QixFQUFpQ0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUNELENBQUMsQ0FBQyxDQUFELENBQXhDLEVBQTRDLElBQW5EO0FBQXdEOztBQUFBMkIsSUFBQUEsS0FBSyxDQUFDSixDQUFELEVBQUdLLENBQUgsRUFBSztBQUFDLFVBQUk1QixDQUFKLEVBQU1DLENBQU4sRUFBUUMsQ0FBUjtBQUFVLFVBQUlDLENBQUosRUFBTXZDLENBQU4sRUFBUTRDLENBQVIsRUFBVU0sQ0FBVixFQUFZVSxDQUFaLEVBQWNDLENBQWQ7QUFBZ0IsYUFBT3pCLENBQUMsR0FBQyxJQUFGLEVBQU9DLENBQUMsR0FBQ3NCLENBQVQsRUFBV3JCLENBQUMsR0FBQzBCLENBQWIsRUFBZXpCLENBQUMsR0FBQ0YsQ0FBQyxDQUFDLENBQUQsQ0FBbEIsRUFBc0JyQyxDQUFDLEdBQUNxQyxDQUFDLENBQUMsQ0FBRCxDQUF6QixFQUE2Qk8sQ0FBQyxHQUFDUCxDQUFDLENBQUMsQ0FBRCxDQUFoQyxFQUFvQ2EsQ0FBQyxHQUFDWixDQUFDLENBQUMsQ0FBRCxDQUF2QyxFQUEyQ3NCLENBQUMsR0FBQ3RCLENBQUMsQ0FBQyxDQUFELENBQTlDLEVBQWtEdUIsQ0FBQyxHQUFDdkIsQ0FBQyxDQUFDLENBQUQsQ0FBckQsRUFBeURGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3BDLENBQUMsR0FBQzZELENBQUYsR0FBSWpCLENBQUMsR0FBQ2dCLENBQXBFLEVBQXNFeEIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLUSxDQUFDLEdBQUNNLENBQUYsR0FBSVgsQ0FBQyxHQUFDc0IsQ0FBakYsRUFBbUZ6QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtHLENBQUMsR0FBQ3FCLENBQUYsR0FBSTVELENBQUMsR0FBQ2tELENBQTlGLEVBQWdHLElBQXZHO0FBQTRHOztBQUFBZSxJQUFBQSxLQUFLLENBQUM3QixDQUFELEVBQUc7QUFBQyxhQUFPaEMsQ0FBQyxDQUFDLElBQUQsRUFBTSxJQUFOLEVBQVdnQyxDQUFYLENBQUQsRUFBZSxJQUF0QjtBQUEyQjs7QUFBQThCLElBQUFBLFNBQVMsR0FBRTtBQUFDLGFBQU81RCxDQUFDLENBQUMsSUFBRCxFQUFNLElBQU4sQ0FBRCxFQUFhLElBQXBCO0FBQXlCOztBQUFBNkQsSUFBQUEsR0FBRyxDQUFDL0IsQ0FBRCxFQUFHO0FBQUMsYUFBT1MsQ0FBQyxDQUFDLElBQUQsRUFBTVQsQ0FBTixDQUFSO0FBQWlCOztBQUFBZ0MsSUFBQUEsTUFBTSxDQUFDOUIsQ0FBRCxFQUFHO0FBQUMsVUFBSUQsQ0FBSixFQUFNRCxDQUFOO0FBQVEsYUFBT0EsQ0FBQyxHQUFDRSxDQUFGLEVBQUksQ0FBQ0QsQ0FBQyxHQUFDLElBQUgsRUFBUyxDQUFULE1BQWNELENBQUMsQ0FBQyxDQUFELENBQWYsSUFBb0JDLENBQUMsQ0FBQyxDQUFELENBQUQsS0FBT0QsQ0FBQyxDQUFDLENBQUQsQ0FBNUIsSUFBaUNDLENBQUMsQ0FBQyxDQUFELENBQUQsS0FBT0QsQ0FBQyxDQUFDLENBQUQsQ0FBcEQ7QUFBd0Q7O0FBQUFpQyxJQUFBQSxZQUFZLENBQUNULENBQUQsRUFBRztBQUFDLFVBQUloQixDQUFKLEVBQU1NLENBQU4sRUFBUWQsQ0FBUjtBQUFVLFVBQUlFLENBQUosRUFBTUMsQ0FBTixFQUFRdkMsQ0FBUixFQUFVcUMsQ0FBVjtBQUFZLGFBQU9PLENBQUMsR0FBQyxJQUFGLEVBQU9NLENBQUMsR0FBQyxJQUFULEVBQWNkLENBQUMsR0FBQ3dCLENBQWhCLEVBQWtCdEIsQ0FBQyxHQUFDWSxDQUFDLENBQUMsQ0FBRCxDQUFyQixFQUF5QlgsQ0FBQyxHQUFDVyxDQUFDLENBQUMsQ0FBRCxDQUE1QixFQUFnQ2xELENBQUMsR0FBQ2tELENBQUMsQ0FBQyxDQUFELENBQW5DLEVBQXVDYixDQUFDLEdBQUNELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0UsQ0FBTCxHQUFPRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtHLENBQVosR0FBY0gsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNcEMsQ0FBcEIsR0FBc0JvQyxDQUFDLENBQUMsRUFBRCxDQUFoRSxFQUFxRUMsQ0FBQyxHQUFDQSxDQUFDLElBQUUsQ0FBMUUsRUFBNEVPLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDUixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtFLENBQUwsR0FBT0YsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRyxDQUFaLEdBQWNILENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3BDLENBQW5CLEdBQXFCb0MsQ0FBQyxDQUFDLEVBQUQsQ0FBdkIsSUFBNkJDLENBQTlHLEVBQWdITyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQ1IsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRSxDQUFMLEdBQU9GLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0csQ0FBWixHQUFjSCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtwQyxDQUFuQixHQUFxQm9DLENBQUMsQ0FBQyxFQUFELENBQXZCLElBQTZCQyxDQUFsSixFQUFvSk8sQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUNSLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0UsQ0FBTCxHQUFPRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtHLENBQVosR0FBY0gsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNcEMsQ0FBcEIsR0FBc0JvQyxDQUFDLENBQUMsRUFBRCxDQUF4QixJQUE4QkMsQ0FBdkwsRUFBeUwsSUFBaE07QUFBcU07O0FBQUFpQyxJQUFBQSxlQUFlLENBQUNDLENBQUQsRUFBRztBQUFDLFVBQUlYLENBQUosRUFBTUMsQ0FBTixFQUFRekIsQ0FBUjtBQUFVLFVBQUl1QixDQUFKLEVBQU1LLENBQU4sRUFBUVEsQ0FBUixFQUFVbkMsQ0FBVixFQUFZQyxDQUFaLEVBQWNDLENBQWQsRUFBZ0J2QyxDQUFoQixFQUFrQjRDLENBQWxCLEVBQW9CTSxDQUFwQixFQUFzQnVCLENBQXRCLEVBQXdCQyxDQUF4QixFQUEwQkMsQ0FBMUIsRUFBNEJDLENBQTVCO0FBQThCLGFBQU9oQixDQUFDLEdBQUMsSUFBRixFQUFPQyxDQUFDLEdBQUMsSUFBVCxFQUFjekIsQ0FBQyxHQUFDbUMsQ0FBaEIsRUFBa0JaLENBQUMsR0FBQ0UsQ0FBQyxDQUFDLENBQUQsQ0FBckIsRUFBeUJHLENBQUMsR0FBQ0gsQ0FBQyxDQUFDLENBQUQsQ0FBNUIsRUFBZ0NXLENBQUMsR0FBQ1gsQ0FBQyxDQUFDLENBQUQsQ0FBbkMsRUFBdUN4QixDQUFDLEdBQUNELENBQUMsQ0FBQyxDQUFELENBQTFDLEVBQThDRSxDQUFDLEdBQUNGLENBQUMsQ0FBQyxDQUFELENBQWpELEVBQXFERyxDQUFDLEdBQUNILENBQUMsQ0FBQyxDQUFELENBQXhELEVBQTREcEMsQ0FBQyxHQUFDc0MsQ0FBQyxHQUFDa0MsQ0FBRixHQUFJakMsQ0FBQyxHQUFDeUIsQ0FBcEUsRUFBc0VwQixDQUFDLEdBQUNMLENBQUMsR0FBQ29CLENBQUYsR0FBSXRCLENBQUMsR0FBQ21DLENBQTlFLEVBQWdGdEIsQ0FBQyxHQUFDYixDQUFDLEdBQUMyQixDQUFGLEdBQUkxQixDQUFDLEdBQUNxQixDQUF4RixFQUEwRmMsQ0FBQyxHQUFDbkMsQ0FBQyxHQUFDWSxDQUFGLEdBQUlYLENBQUMsR0FBQ0ssQ0FBbEcsRUFBb0c4QixDQUFDLEdBQUNuQyxDQUFDLEdBQUN2QyxDQUFGLEdBQUlxQyxDQUFDLEdBQUNhLENBQTVHLEVBQThHeUIsQ0FBQyxHQUFDdEMsQ0FBQyxHQUFDTyxDQUFGLEdBQUlOLENBQUMsR0FBQ3RDLENBQXRILEVBQXdINEUsQ0FBQyxHQUFDLElBQUV4QyxDQUFDLENBQUMsQ0FBRCxDQUE3SCxFQUFpSXBDLENBQUMsSUFBRTRFLENBQXBJLEVBQXNJaEMsQ0FBQyxJQUFFZ0MsQ0FBekksRUFBMkkxQixDQUFDLElBQUUwQixDQUE5SSxFQUFnSkgsQ0FBQyxJQUFFLENBQW5KLEVBQXFKQyxDQUFDLElBQUUsQ0FBeEosRUFBMEpDLENBQUMsSUFBRSxDQUE3SixFQUErSmYsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLEdBQUMzRCxDQUFGLEdBQUl5RSxDQUF4SyxFQUEwS2IsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLSSxDQUFDLEdBQUNwQixDQUFGLEdBQUk4QixDQUFuTCxFQUFxTGQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLWSxDQUFDLEdBQUN0QixDQUFGLEdBQUl5QixDQUE5TCxFQUFnTSxJQUF2TTtBQUE0TTs7QUFBQUUsSUFBQUEsS0FBSyxDQUFDekMsQ0FBRCxFQUFHO0FBQUMsYUFBT1UsQ0FBQyxDQUFDLElBQUQsRUFBTVYsQ0FBTixDQUFSO0FBQWlCOztBQUFBWixJQUFBQSxJQUFJLENBQUNvQyxDQUFELEVBQUdDLENBQUgsRUFBSztBQUFDLFVBQUl6QixDQUFKLEVBQU1DLENBQU4sRUFBUUMsQ0FBUixFQUFVQyxDQUFWO0FBQVksVUFBSXZDLENBQUosRUFBTTRDLENBQU4sRUFBUU0sQ0FBUjtBQUFVLGFBQU9kLENBQUMsR0FBQyxJQUFGLEVBQU9DLENBQUMsR0FBQyxJQUFULEVBQWNDLENBQUMsR0FBQ3NCLENBQWhCLEVBQWtCckIsQ0FBQyxHQUFDc0IsQ0FBcEIsRUFBc0I3RCxDQUFDLEdBQUNxQyxDQUFDLENBQUMsQ0FBRCxDQUF6QixFQUE2Qk8sQ0FBQyxHQUFDUCxDQUFDLENBQUMsQ0FBRCxDQUFoQyxFQUFvQ2EsQ0FBQyxHQUFDYixDQUFDLENBQUMsQ0FBRCxDQUF2QyxFQUEyQ0QsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLcEMsQ0FBQyxHQUFDdUMsQ0FBQyxJQUFFRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUt0QyxDQUFQLENBQW5ELEVBQTZEb0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLUSxDQUFDLEdBQUNMLENBQUMsSUFBRUQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLTSxDQUFQLENBQXJFLEVBQStFUixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtjLENBQUMsR0FBQ1gsQ0FBQyxJQUFFRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtZLENBQVAsQ0FBdkYsRUFBaUcsSUFBeEc7QUFBNkc7O0FBQUE0QixJQUFBQSxLQUFLLEdBQUU7QUFBQyxhQUFPLElBQUl6QyxDQUFKLENBQU0sS0FBSyxDQUFMLENBQU4sRUFBYyxLQUFLLENBQUwsQ0FBZCxFQUFzQixLQUFLLENBQUwsQ0FBdEIsQ0FBUDtBQUFzQzs7QUFBQTBDLElBQUFBLFNBQVMsQ0FBQzNDLENBQUQsRUFBR0MsQ0FBQyxHQUFDLENBQUwsRUFBTztBQUFDLGFBQU8sS0FBSyxDQUFMLElBQVFELENBQUMsQ0FBQ0MsQ0FBRCxDQUFULEVBQWEsS0FBSyxDQUFMLElBQVFELENBQUMsQ0FBQ0MsQ0FBQyxHQUFDLENBQUgsQ0FBdEIsRUFBNEIsS0FBSyxDQUFMLElBQVFELENBQUMsQ0FBQ0MsQ0FBQyxHQUFDLENBQUgsQ0FBckMsRUFBMkMsSUFBbEQ7QUFBdUQ7O0FBQUEyQyxJQUFBQSxPQUFPLENBQUM1QyxDQUFDLEdBQUMsRUFBSCxFQUFNQyxDQUFDLEdBQUMsQ0FBUixFQUFVO0FBQUMsYUFBT0QsQ0FBQyxDQUFDQyxDQUFELENBQUQsR0FBSyxLQUFLLENBQUwsQ0FBTCxFQUFhRCxDQUFDLENBQUNDLENBQUMsR0FBQyxDQUFILENBQUQsR0FBTyxLQUFLLENBQUwsQ0FBcEIsRUFBNEJELENBQUMsQ0FBQ0MsQ0FBQyxHQUFDLENBQUgsQ0FBRCxHQUFPLEtBQUssQ0FBTCxDQUFuQyxFQUEyQ0QsQ0FBbEQ7QUFBb0Q7O0FBQUE2QyxJQUFBQSxrQkFBa0IsQ0FBQzdDLENBQUQsRUFBRztBQUFDLFVBQUlDLENBQUMsR0FBQyxLQUFLLENBQUwsQ0FBTjtBQUFBLFVBQWNDLENBQUMsR0FBQyxLQUFLLENBQUwsQ0FBaEI7QUFBQSxVQUF3QkMsQ0FBQyxHQUFDLEtBQUssQ0FBTCxDQUExQjtBQUFrQyxhQUFPLEtBQUssQ0FBTCxJQUFRSCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUwsR0FBT0QsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRSxDQUFaLEdBQWNGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0csQ0FBM0IsRUFBNkIsS0FBSyxDQUFMLElBQVFILENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBTCxHQUFPRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtFLENBQVosR0FBY0YsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRyxDQUF4RCxFQUEwRCxLQUFLLENBQUwsSUFBUUgsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFMLEdBQU9ELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0UsQ0FBWixHQUFjRixDQUFDLENBQUMsRUFBRCxDQUFELEdBQU1HLENBQXRGLEVBQXdGLEtBQUsyQixTQUFMLEVBQS9GO0FBQWdIOztBQUEvN0U7O0FBQWc4RSxNQUFJZ0IsQ0FBQyxHQUFDLElBQUk3QyxDQUFKLEVBQU47QUFBQSxNQUFZOEMsQ0FBQyxHQUFDLENBQWQ7QUFBQSxNQUFnQkMsQ0FBQyxHQUFDLENBQWxCOztBQUFvQixRQUFNeEMsQ0FBTixDQUFPO0FBQUNqSCxJQUFBQSxXQUFXLENBQUMyRyxDQUFELEVBQUdGLENBQUMsR0FBQyxFQUFMLEVBQVE7QUFBQyxXQUFJLElBQUlDLENBQVIsSUFBYSxLQUFLakcsRUFBTCxHQUFRa0csQ0FBUixFQUFVLEtBQUsrQyxVQUFMLEdBQWdCakQsQ0FBMUIsRUFBNEIsS0FBS2tELEVBQUwsR0FBUUgsQ0FBQyxFQUFyQyxFQUF3QyxLQUFLSSxJQUFMLEdBQVUsRUFBbEQsRUFBcUQsS0FBS0MsU0FBTCxHQUFlO0FBQUNDLFFBQUFBLEtBQUssRUFBQyxDQUFQO0FBQVNDLFFBQUFBLEtBQUssRUFBQztBQUFmLE9BQXBFLEVBQXNGLEtBQUtDLGNBQUwsR0FBb0IsQ0FBMUcsRUFBNEcsS0FBS3ZKLEVBQUwsQ0FBUUgsUUFBUixDQUFpQjJKLGVBQWpCLENBQWlDLElBQWpDLENBQTVHLEVBQW1KLEtBQUt4SixFQUFMLENBQVFILFFBQVIsQ0FBaUI0SixlQUFqQixHQUFpQyxJQUFwTCxFQUF5TCxLQUFLQyxPQUFMLEdBQWEsS0FBSzFKLEVBQUwsQ0FBUUgsUUFBUixDQUFpQjhKLEtBQXZOLEVBQTZOM0QsQ0FBMU8sRUFBNE8sS0FBSzRELFlBQUwsQ0FBa0IzRCxDQUFsQixFQUFvQkQsQ0FBQyxDQUFDQyxDQUFELENBQXJCO0FBQTBCOztBQUFBMkQsSUFBQUEsWUFBWSxDQUFDM0QsQ0FBRCxFQUFHRCxDQUFILEVBQUs7QUFBQyxVQUFHLEtBQUtpRCxVQUFMLENBQWdCaEQsQ0FBaEIsSUFBbUJELENBQW5CLEVBQXFCQSxDQUFDLENBQUNrRCxFQUFGLEdBQUtGLENBQUMsRUFBM0IsRUFBOEJoRCxDQUFDLENBQUNoRSxJQUFGLEdBQU9nRSxDQUFDLENBQUNoRSxJQUFGLElBQVEsQ0FBN0MsRUFBK0NnRSxDQUFDLENBQUM2RCxJQUFGLEdBQU83RCxDQUFDLENBQUM2RCxJQUFGLEtBQVM3RCxDQUFDLENBQUMvRCxJQUFGLENBQU8xQyxXQUFQLEtBQXFCMkMsWUFBckIsR0FBa0MsS0FBS2xDLEVBQUwsQ0FBUThKLEtBQTFDLEdBQWdEOUQsQ0FBQyxDQUFDL0QsSUFBRixDQUFPMUMsV0FBUCxLQUFxQndLLFdBQXJCLEdBQWlDLEtBQUsvSixFQUFMLENBQVFnSyxjQUF6QyxHQUF3RCxLQUFLaEssRUFBTCxDQUFRaUssWUFBekgsQ0FBdEQsRUFBNkxqRSxDQUFDLENBQUNrRSxNQUFGLEdBQVMsWUFBVWpFLENBQVYsR0FBWSxLQUFLakcsRUFBTCxDQUFRbUssb0JBQXBCLEdBQXlDLEtBQUtuSyxFQUFMLENBQVFvSyxZQUF2UCxFQUFvUXBFLENBQUMsQ0FBQzhCLFNBQUYsR0FBWTlCLENBQUMsQ0FBQzhCLFNBQUYsSUFBYSxDQUFDLENBQTlSLEVBQWdTOUIsQ0FBQyxDQUFDcUUsTUFBRixHQUFTLEtBQUtySyxFQUFMLENBQVFzSyxZQUFSLEVBQXpTLEVBQWdVdEUsQ0FBQyxDQUFDc0QsS0FBRixHQUFRdEQsQ0FBQyxDQUFDL0QsSUFBRixDQUFPOEIsTUFBUCxHQUFjaUMsQ0FBQyxDQUFDaEUsSUFBeFYsRUFBNlZnRSxDQUFDLENBQUN1RSxPQUFGLEdBQVV2RSxDQUFDLENBQUN3RSxTQUFGLElBQWEsQ0FBcFgsRUFBc1h4RSxDQUFDLENBQUNqQixXQUFGLEdBQWMsQ0FBQyxDQUFyWSxFQUF1WSxLQUFLMEYsZUFBTCxDQUFxQnpFLENBQXJCLENBQXZZLEVBQStaQSxDQUFDLENBQUN1RSxPQUFwYSxFQUE0YTtBQUFDLFlBQUcsS0FBS0csV0FBTCxHQUFpQixDQUFDLENBQWxCLEVBQW9CLEtBQUtuQixjQUFMLElBQXFCLEtBQUtBLGNBQUwsS0FBc0J2RCxDQUFDLENBQUNzRCxLQUFGLEdBQVF0RCxDQUFDLENBQUN1RSxPQUE1RSxFQUFvRixPQUFPSSxPQUFPLENBQUNDLElBQVIsQ0FBYSw2REFBYixHQUE0RSxLQUFLckIsY0FBTCxHQUFvQjFFLElBQUksQ0FBQ2dHLEdBQUwsQ0FBUyxLQUFLdEIsY0FBZCxFQUE2QnZELENBQUMsQ0FBQ3NELEtBQUYsR0FBUXRELENBQUMsQ0FBQ3VFLE9BQXZDLENBQXZHO0FBQXVKLGFBQUtoQixjQUFMLEdBQW9CdkQsQ0FBQyxDQUFDc0QsS0FBRixHQUFRdEQsQ0FBQyxDQUFDdUUsT0FBOUI7QUFBc0MsT0FBOXJCLE1BQWtzQixZQUFVdEUsQ0FBVixHQUFZLEtBQUttRCxTQUFMLENBQWVFLEtBQWYsR0FBcUJ0RCxDQUFDLENBQUNzRCxLQUFuQyxHQUF5QyxLQUFLTCxVQUFMLENBQWdCNkIsS0FBaEIsS0FBd0IsS0FBSzFCLFNBQUwsQ0FBZUUsS0FBZixHQUFxQnpFLElBQUksQ0FBQ0MsR0FBTCxDQUFTLEtBQUtzRSxTQUFMLENBQWVFLEtBQXhCLEVBQThCdEQsQ0FBQyxDQUFDc0QsS0FBaEMsQ0FBN0MsQ0FBekM7QUFBOEg7O0FBQUFtQixJQUFBQSxlQUFlLENBQUN6RSxDQUFELEVBQUc7QUFBQyxXQUFLMEQsT0FBTCxDQUFhcUIsV0FBYixLQUEyQi9FLENBQUMsQ0FBQ2tELEVBQTdCLEtBQWtDLEtBQUtsSixFQUFMLENBQVFnTCxVQUFSLENBQW1CaEYsQ0FBQyxDQUFDa0UsTUFBckIsRUFBNEJsRSxDQUFDLENBQUNxRSxNQUE5QixHQUFzQyxLQUFLWCxPQUFMLENBQWFxQixXQUFiLEdBQXlCL0UsQ0FBQyxDQUFDa0QsRUFBbkcsR0FBdUcsS0FBS2xKLEVBQUwsQ0FBUWlMLFVBQVIsQ0FBbUJqRixDQUFDLENBQUNrRSxNQUFyQixFQUE0QmxFLENBQUMsQ0FBQy9ELElBQTlCLEVBQW1DLEtBQUtqQyxFQUFMLENBQVFrTCxXQUEzQyxDQUF2RyxFQUErSmxGLENBQUMsQ0FBQ2pCLFdBQUYsR0FBYyxDQUFDLENBQTlLO0FBQWdMOztBQUFBb0csSUFBQUEsUUFBUSxDQUFDbkYsQ0FBRCxFQUFHO0FBQUMsV0FBSzRELFlBQUwsQ0FBa0IsT0FBbEIsRUFBMEI1RCxDQUExQjtBQUE2Qjs7QUFBQW9GLElBQUFBLFlBQVksQ0FBQ3BGLENBQUQsRUFBR0MsQ0FBSCxFQUFLO0FBQUMsV0FBS21ELFNBQUwsQ0FBZUMsS0FBZixHQUFxQnJELENBQXJCLEVBQXVCLEtBQUtvRCxTQUFMLENBQWVFLEtBQWYsR0FBcUJyRCxDQUE1QztBQUE4Qzs7QUFBQW9GLElBQUFBLGlCQUFpQixDQUFDckYsQ0FBRCxFQUFHO0FBQUMsV0FBS3VELGNBQUwsR0FBb0J2RCxDQUFwQjtBQUFzQjs7QUFBQXNGLElBQUFBLFNBQVMsQ0FBQ3RGLENBQUQsRUFBRztBQUFDLFdBQUttRCxJQUFMLENBQVVuRCxDQUFDLENBQUN1RixjQUFaLElBQTRCLEtBQUt2TCxFQUFMLENBQVFILFFBQVIsQ0FBaUIyTCxpQkFBakIsRUFBNUIsRUFBaUUsS0FBS3hMLEVBQUwsQ0FBUUgsUUFBUixDQUFpQjJKLGVBQWpCLENBQWlDLEtBQUtMLElBQUwsQ0FBVW5ELENBQUMsQ0FBQ3VGLGNBQVosQ0FBakMsQ0FBakUsRUFBK0gsS0FBS0UsY0FBTCxDQUFvQnpGLENBQXBCLENBQS9IO0FBQXNKOztBQUFBeUYsSUFBQUEsY0FBYyxDQUFDekYsQ0FBRCxFQUFHO0FBQUNBLE1BQUFBLENBQUMsQ0FBQzBGLGtCQUFGLENBQXFCOUssT0FBckIsQ0FBNkIsQ0FBQ3FGLENBQUQsRUFBR0MsQ0FBSCxLQUFPO0FBQUMsWUFBRyxDQUFDLEtBQUsrQyxVQUFMLENBQWdCL0MsQ0FBaEIsQ0FBSixFQUF1QixPQUFPLEtBQUt5RSxPQUFPLENBQUNDLElBQVIsQ0FBYyxvQkFBbUIxRSxDQUFFLHFCQUFuQyxDQUFaO0FBQXFFLFlBQUlGLENBQUMsR0FBQyxLQUFLaUQsVUFBTCxDQUFnQi9DLENBQWhCLENBQU47QUFBeUIsYUFBS2xHLEVBQUwsQ0FBUWdMLFVBQVIsQ0FBbUJoRixDQUFDLENBQUNrRSxNQUFyQixFQUE0QmxFLENBQUMsQ0FBQ3FFLE1BQTlCLEdBQXNDLEtBQUtYLE9BQUwsQ0FBYXFCLFdBQWIsR0FBeUIvRSxDQUFDLENBQUNrRCxFQUFqRSxFQUFvRSxLQUFLbEosRUFBTCxDQUFRMkwsbUJBQVIsQ0FBNEIxRixDQUE1QixFQUE4QkQsQ0FBQyxDQUFDaEUsSUFBaEMsRUFBcUNnRSxDQUFDLENBQUM2RCxJQUF2QyxFQUE0QzdELENBQUMsQ0FBQzhCLFNBQTlDLEVBQXdELENBQXhELEVBQTBELENBQTFELENBQXBFLEVBQWlJLEtBQUs5SCxFQUFMLENBQVE0TCx1QkFBUixDQUFnQzNGLENBQWhDLENBQWpJLEVBQW9LLEtBQUtqRyxFQUFMLENBQVFILFFBQVIsQ0FBaUJnTSxtQkFBakIsQ0FBcUM1RixDQUFyQyxFQUF1Q0QsQ0FBQyxDQUFDdUUsT0FBekMsQ0FBcEs7QUFBc04sT0FBaFgsR0FBa1gsS0FBS3RCLFVBQUwsQ0FBZ0I2QixLQUFoQixJQUF1QixLQUFLOUssRUFBTCxDQUFRZ0wsVUFBUixDQUFtQixLQUFLaEwsRUFBTCxDQUFRbUssb0JBQTNCLEVBQWdELEtBQUtsQixVQUFMLENBQWdCNkIsS0FBaEIsQ0FBc0JULE1BQXRFLENBQXpZO0FBQXVkOztBQUFBeUIsSUFBQUEsSUFBSSxDQUFDO0FBQUN4SyxNQUFBQSxPQUFPLEVBQUMwRSxDQUFUO0FBQVcrRixNQUFBQSxJQUFJLEVBQUM5RixDQUFDLEdBQUMsS0FBS2pHLEVBQUwsQ0FBUWdNO0FBQTFCLEtBQUQsRUFBc0M7QUFBQyxXQUFLaE0sRUFBTCxDQUFRSCxRQUFSLENBQWlCNEosZUFBakIsS0FBb0MsR0FBRSxLQUFLUCxFQUFHLElBQUdsRCxDQUFDLENBQUN1RixjQUFlLEVBQWxFLEtBQXNFLEtBQUtwQyxJQUFMLENBQVVuRCxDQUFDLENBQUN1RixjQUFaLEtBQTZCLEtBQUtELFNBQUwsQ0FBZXRGLENBQWYsQ0FBN0IsRUFBK0MsS0FBS2hHLEVBQUwsQ0FBUUgsUUFBUixDQUFpQjJKLGVBQWpCLENBQWlDLEtBQUtMLElBQUwsQ0FBVW5ELENBQUMsQ0FBQ3VGLGNBQVosQ0FBakMsQ0FBL0MsRUFBNkcsS0FBS3ZMLEVBQUwsQ0FBUUgsUUFBUixDQUFpQjRKLGVBQWpCLEdBQWtDLEdBQUUsS0FBS1AsRUFBRyxJQUFHbEQsQ0FBQyxDQUFDdUYsY0FBZSxFQUFuUCxHQUFzUHZGLENBQUMsQ0FBQzBGLGtCQUFGLENBQXFCOUssT0FBckIsQ0FBNkIsQ0FBQ3NGLENBQUQsRUFBR0QsQ0FBSCxLQUFPO0FBQUMsWUFBSUQsQ0FBQyxHQUFDLEtBQUtpRCxVQUFMLENBQWdCaEQsQ0FBaEIsQ0FBTjtBQUF5QkQsUUFBQUEsQ0FBQyxDQUFDakIsV0FBRixJQUFlLEtBQUswRixlQUFMLENBQXFCekUsQ0FBckIsQ0FBZjtBQUF1QyxPQUFyRyxDQUF0UCxFQUE2VixLQUFLMEUsV0FBTCxHQUFpQixLQUFLekIsVUFBTCxDQUFnQjZCLEtBQWhCLEdBQXNCLEtBQUs5SyxFQUFMLENBQVFILFFBQVIsQ0FBaUJvTSxxQkFBakIsQ0FBdUNoRyxDQUF2QyxFQUF5QyxLQUFLbUQsU0FBTCxDQUFlRSxLQUF4RCxFQUE4RCxLQUFLTCxVQUFMLENBQWdCNkIsS0FBaEIsQ0FBc0JqQixJQUFwRixFQUF5RixLQUFLVCxTQUFMLENBQWVDLEtBQXhHLEVBQThHLEtBQUtFLGNBQW5ILENBQXRCLEdBQXlKLEtBQUt2SixFQUFMLENBQVFILFFBQVIsQ0FBaUJxTSxtQkFBakIsQ0FBcUNqRyxDQUFyQyxFQUF1QyxLQUFLbUQsU0FBTCxDQUFlQyxLQUF0RCxFQUE0RCxLQUFLRCxTQUFMLENBQWVFLEtBQTNFLEVBQWlGLEtBQUtDLGNBQXRGLENBQTFLLEdBQWdSLEtBQUtOLFVBQUwsQ0FBZ0I2QixLQUFoQixHQUFzQixLQUFLOUssRUFBTCxDQUFRbU0sWUFBUixDQUFxQmxHLENBQXJCLEVBQXVCLEtBQUttRCxTQUFMLENBQWVFLEtBQXRDLEVBQTRDLEtBQUtMLFVBQUwsQ0FBZ0I2QixLQUFoQixDQUFzQmpCLElBQWxFLEVBQXVFLEtBQUtULFNBQUwsQ0FBZUMsS0FBdEYsQ0FBdEIsR0FBbUgsS0FBS3JKLEVBQUwsQ0FBUW9NLFVBQVIsQ0FBbUJuRyxDQUFuQixFQUFxQixLQUFLbUQsU0FBTCxDQUFlQyxLQUFwQyxFQUEwQyxLQUFLRCxTQUFMLENBQWVFLEtBQXpELENBQWh1QjtBQUFneUI7O0FBQUErQyxJQUFBQSxrQkFBa0IsQ0FBQ2xHLENBQUQsRUFBRztBQUFDLE9BQUNBLENBQUQsSUFBSSxLQUFLOEMsVUFBTCxDQUFnQmxILFFBQXBCLEtBQStCb0UsQ0FBQyxHQUFDLEtBQUs4QyxVQUFMLENBQWdCbEgsUUFBaEIsQ0FBeUJFLElBQTFELEdBQWdFa0UsQ0FBQyxJQUFFd0UsT0FBTyxDQUFDQyxJQUFSLENBQWEsNENBQWIsQ0FBbkUsRUFBOEgsS0FBSzBCLE1BQUwsS0FBYyxLQUFLQSxNQUFMLEdBQVk7QUFBQ3pCLFFBQUFBLEdBQUcsRUFBQyxJQUFJNUUsQ0FBSixFQUFMO0FBQVduQixRQUFBQSxHQUFHLEVBQUMsSUFBSW1CLENBQUosRUFBZjtBQUFxQnNHLFFBQUFBLE1BQU0sRUFBQyxJQUFJdEcsQ0FBSixFQUE1QjtBQUFrQzRCLFFBQUFBLEtBQUssRUFBQyxJQUFJNUIsQ0FBSixFQUF4QztBQUE4Q3VHLFFBQUFBLE1BQU0sRUFBQyxJQUFFO0FBQXZELE9BQTFCLENBQTlIO0FBQW1OLFVBQUl4RyxDQUFDLEdBQUMsS0FBS3NHLE1BQUwsQ0FBWXpCLEdBQWxCO0FBQUEsVUFBc0IzRSxDQUFDLEdBQUMsS0FBS29HLE1BQUwsQ0FBWXhILEdBQXBDO0FBQUEsVUFBd0MyQyxDQUFDLEdBQUMsS0FBSzZFLE1BQUwsQ0FBWUMsTUFBdEQ7QUFBQSxVQUE2RGhGLENBQUMsR0FBQyxLQUFLK0UsTUFBTCxDQUFZekUsS0FBM0U7QUFBaUY3QixNQUFBQSxDQUFDLENBQUM1QixHQUFGLENBQU0sSUFBRSxDQUFSLEdBQVc4QixDQUFDLENBQUM5QixHQUFGLENBQU0sQ0FBQyxDQUFELEdBQUcsQ0FBVCxDQUFYOztBQUF1QixXQUFJLElBQUlSLENBQUMsR0FBQyxDQUFOLEVBQVFnRSxDQUFDLEdBQUN6QixDQUFDLENBQUNwQyxNQUFoQixFQUF1QkgsQ0FBQyxHQUFDZ0UsQ0FBekIsRUFBMkJoRSxDQUFDLElBQUUsQ0FBOUIsRUFBZ0M7QUFBQyxZQUFJNEMsQ0FBQyxHQUFDTCxDQUFDLENBQUN2QyxDQUFELENBQVA7QUFBQSxZQUFXa0QsQ0FBQyxHQUFDWCxDQUFDLENBQUN2QyxDQUFDLEdBQUMsQ0FBSCxDQUFkO0FBQUEsWUFBb0I0RCxDQUFDLEdBQUNyQixDQUFDLENBQUN2QyxDQUFDLEdBQUMsQ0FBSCxDQUF2QjtBQUE2Qm9DLFFBQUFBLENBQUMsQ0FBQ2hDLENBQUYsR0FBSWEsSUFBSSxDQUFDZ0csR0FBTCxDQUFTckUsQ0FBVCxFQUFXUixDQUFDLENBQUNoQyxDQUFiLENBQUosRUFBb0JnQyxDQUFDLENBQUM5QixDQUFGLEdBQUlXLElBQUksQ0FBQ2dHLEdBQUwsQ0FBUy9ELENBQVQsRUFBV2QsQ0FBQyxDQUFDOUIsQ0FBYixDQUF4QixFQUF3QzhCLENBQUMsQ0FBQ1MsQ0FBRixHQUFJNUIsSUFBSSxDQUFDZ0csR0FBTCxDQUFTckQsQ0FBVCxFQUFXeEIsQ0FBQyxDQUFDUyxDQUFiLENBQTVDLEVBQTREUCxDQUFDLENBQUNsQyxDQUFGLEdBQUlhLElBQUksQ0FBQ0MsR0FBTCxDQUFTMEIsQ0FBVCxFQUFXTixDQUFDLENBQUNsQyxDQUFiLENBQWhFLEVBQWdGa0MsQ0FBQyxDQUFDaEMsQ0FBRixHQUFJVyxJQUFJLENBQUNDLEdBQUwsQ0FBU2dDLENBQVQsRUFBV1osQ0FBQyxDQUFDaEMsQ0FBYixDQUFwRixFQUFvR2dDLENBQUMsQ0FBQ08sQ0FBRixHQUFJNUIsSUFBSSxDQUFDQyxHQUFMLENBQVMwQyxDQUFULEVBQVd0QixDQUFDLENBQUNPLENBQWIsQ0FBeEc7QUFBd0g7O0FBQUFjLE1BQUFBLENBQUMsQ0FBQ1AsR0FBRixDQUFNZCxDQUFOLEVBQVFGLENBQVIsR0FBV3lCLENBQUMsQ0FBQ1YsR0FBRixDQUFNZixDQUFOLEVBQVFFLENBQVIsRUFBV2dCLE1BQVgsQ0FBa0IsQ0FBbEIsQ0FBWDtBQUFnQzs7QUFBQXVGLElBQUFBLHFCQUFxQixDQUFDekcsQ0FBRCxFQUFHO0FBQUMsT0FBQ0EsQ0FBRCxJQUFJLEtBQUtpRCxVQUFMLENBQWdCbEgsUUFBcEIsS0FBK0JpRSxDQUFDLEdBQUMsS0FBS2lELFVBQUwsQ0FBZ0JsSCxRQUFoQixDQUF5QkUsSUFBMUQsR0FBZ0UrRCxDQUFDLElBQUUyRSxPQUFPLENBQUNDLElBQVIsQ0FBYSw0Q0FBYixDQUFuRSxFQUE4SCxLQUFLMEIsTUFBTCxJQUFhLEtBQUtELGtCQUFMLENBQXdCckcsQ0FBeEIsQ0FBM0k7QUFBc0ssVUFBSUMsQ0FBQyxHQUFDLENBQU47O0FBQVEsV0FBSSxJQUFJQyxDQUFDLEdBQUMsQ0FBTixFQUFRQyxDQUFDLEdBQUNILENBQUMsQ0FBQ2pDLE1BQWhCLEVBQXVCbUMsQ0FBQyxHQUFDQyxDQUF6QixFQUEyQkQsQ0FBQyxJQUFFLENBQTlCLEVBQWdDNEMsQ0FBQyxDQUFDSCxTQUFGLENBQVkzQyxDQUFaLEVBQWNFLENBQWQsR0FBaUJELENBQUMsR0FBQ3BCLElBQUksQ0FBQ0MsR0FBTCxDQUFTbUIsQ0FBVCxFQUFXLEtBQUtxRyxNQUFMLENBQVlDLE1BQVosQ0FBbUJqRixlQUFuQixDQUFtQ3dCLENBQW5DLENBQVgsQ0FBbkI7O0FBQXFFLFdBQUt3RCxNQUFMLENBQVlFLE1BQVosR0FBbUIzSCxJQUFJLENBQUN1QixJQUFMLENBQVVILENBQVYsQ0FBbkI7QUFBZ0M7O0FBQUF5RyxJQUFBQSxNQUFNLEdBQUU7QUFBQyxXQUFJLElBQUkxRyxDQUFSLElBQWEsS0FBSzJHLEdBQUwsSUFBVSxLQUFLM00sRUFBTCxDQUFRSCxRQUFSLENBQWlCK00saUJBQWpCLENBQW1DLEtBQUtELEdBQXhDLENBQVYsRUFBdUQsS0FBSzFELFVBQXpFLEVBQW9GLEtBQUtqSixFQUFMLENBQVE2TSxZQUFSLENBQXFCLEtBQUs1RCxVQUFMLENBQWdCakQsQ0FBaEIsRUFBbUJxRSxNQUF4QyxHQUFnRCxPQUFPLEtBQUtwQixVQUFMLENBQWdCakQsQ0FBaEIsQ0FBdkQ7QUFBMEU7O0FBQXI3SDs7QUFBczdILE1BQUk4RyxDQUFDLEdBQUMsQ0FBTjtBQUFBLE1BQVFDLENBQUMsR0FBQyxFQUFWOztBQUFhLFFBQU12RixDQUFOLENBQU87QUFBQ2pJLElBQUFBLFdBQVcsQ0FBQ3lHLENBQUQsRUFBRztBQUFDN0MsTUFBQUEsTUFBTSxFQUFDcUQsQ0FBUjtBQUFVcEQsTUFBQUEsUUFBUSxFQUFDMEQsQ0FBbkI7QUFBcUJ2RixNQUFBQSxRQUFRLEVBQUNpSCxDQUFDLEdBQUMsRUFBaEM7QUFBbUN3RSxNQUFBQSxXQUFXLEVBQUMzRSxDQUFDLEdBQUMsQ0FBQyxDQUFsRDtBQUFvRDRFLE1BQUFBLFFBQVEsRUFBQzNFLENBQUMsR0FBQ3RDLENBQUMsQ0FBQ2tILElBQWpFO0FBQXNFQyxNQUFBQSxTQUFTLEVBQUM1RSxDQUFDLEdBQUN2QyxDQUFDLENBQUNvSCxHQUFwRjtBQUF3RkMsTUFBQUEsU0FBUyxFQUFDbEYsQ0FBQyxHQUFDLENBQUMsQ0FBckc7QUFBdUdtRixNQUFBQSxVQUFVLEVBQUNDLENBQUMsR0FBQyxDQUFDLENBQXJIO0FBQXVIQyxNQUFBQSxTQUFTLEVBQUNDLENBQUMsR0FBQ3pILENBQUMsQ0FBQzBIO0FBQXJJLFFBQTJJLEVBQTlJLEVBQWlKO0FBQUMsV0FBSzFOLEVBQUwsR0FBUWdHLENBQVIsRUFBVSxLQUFLekUsUUFBTCxHQUFjaUgsQ0FBeEIsRUFBMEIsS0FBS1UsRUFBTCxHQUFRNEQsQ0FBQyxFQUFuQyxFQUFzQ3RHLENBQUMsSUFBRW1FLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLDRCQUFiLENBQXpDLEVBQW9GOUQsQ0FBQyxJQUFFNkQsT0FBTyxDQUFDQyxJQUFSLENBQWEsOEJBQWIsQ0FBdkYsRUFBb0ksS0FBS29DLFdBQUwsR0FBaUIzRSxDQUFySixFQUF1SixLQUFLNEUsUUFBTCxHQUFjM0UsQ0FBckssRUFBdUssS0FBSzZFLFNBQUwsR0FBZTVFLENBQXRMLEVBQXdMLEtBQUs4RSxTQUFMLEdBQWVsRixDQUF2TSxFQUF5TSxLQUFLbUYsVUFBTCxHQUFnQkMsQ0FBek4sRUFBMk4sS0FBS0MsU0FBTCxHQUFlQyxDQUExTyxFQUE0TyxLQUFLRSxTQUFMLEdBQWUsRUFBM1AsRUFBOFAsS0FBS0MsYUFBTCxHQUFtQixFQUFqUixFQUFvUixLQUFLWixXQUFMLElBQWtCLENBQUMsS0FBS1csU0FBTCxDQUFlNUssR0FBbEMsS0FBd0MsS0FBSy9DLEVBQUwsQ0FBUUgsUUFBUixDQUFpQmdPLGtCQUFqQixHQUFvQyxLQUFLQyxZQUFMLENBQWtCLEtBQUs5TixFQUFMLENBQVErTixHQUExQixFQUE4QixLQUFLL04sRUFBTCxDQUFRZ08sbUJBQXRDLENBQXBDLEdBQStGLEtBQUtGLFlBQUwsQ0FBa0IsS0FBSzlOLEVBQUwsQ0FBUWlPLFNBQTFCLEVBQW9DLEtBQUtqTyxFQUFMLENBQVFnTyxtQkFBNUMsQ0FBdkksQ0FBcFI7QUFBNmQsVUFBSTdILENBQUMsR0FBQ0gsQ0FBQyxDQUFDa0ksWUFBRixDQUFlbEksQ0FBQyxDQUFDbUksYUFBakIsQ0FBTjtBQUFzQ25JLE1BQUFBLENBQUMsQ0FBQ29JLFlBQUYsQ0FBZWpJLENBQWYsRUFBaUJLLENBQWpCLEdBQW9CUixDQUFDLENBQUNxSSxhQUFGLENBQWdCbEksQ0FBaEIsQ0FBcEIsRUFBdUMsT0FBS0gsQ0FBQyxDQUFDc0ksZ0JBQUYsQ0FBbUJuSSxDQUFuQixDQUFMLElBQTRCd0UsT0FBTyxDQUFDQyxJQUFSLENBQWMsR0FBRTVFLENBQUMsQ0FBQ3NJLGdCQUFGLENBQW1CbkksQ0FBbkIsQ0FBc0I7QUFDNzNQO0FBQ0EsRUFBRW9JLENBQUMsQ0FBQy9ILENBQUQsQ0FBSSxFQUZnMVAsQ0FBbkU7QUFFMXdQLFVBQUk1QyxDQUFDLEdBQUNvQyxDQUFDLENBQUNrSSxZQUFGLENBQWVsSSxDQUFDLENBQUN3SSxlQUFqQixDQUFOO0FBQXdDLFVBQUd4SSxDQUFDLENBQUNvSSxZQUFGLENBQWV4SyxDQUFmLEVBQWlCa0QsQ0FBakIsR0FBb0JkLENBQUMsQ0FBQ3FJLGFBQUYsQ0FBZ0J6SyxDQUFoQixDQUFwQixFQUF1QyxPQUFLb0MsQ0FBQyxDQUFDc0ksZ0JBQUYsQ0FBbUIxSyxDQUFuQixDQUFMLElBQTRCK0csT0FBTyxDQUFDQyxJQUFSLENBQWMsR0FBRTVFLENBQUMsQ0FBQ3NJLGdCQUFGLENBQW1CMUssQ0FBbkIsQ0FBc0I7QUFDOUo7QUFDQSxFQUFFMkssQ0FBQyxDQUFDekgsQ0FBRCxDQUFJLEVBRmlILENBQW5FLEVBRTNDLEtBQUt4RixPQUFMLEdBQWEwRSxDQUFDLENBQUN5SSxhQUFGLEVBRjhCLEVBRVp6SSxDQUFDLENBQUMwSSxZQUFGLENBQWUsS0FBS3BOLE9BQXBCLEVBQTRCNkUsQ0FBNUIsQ0FGWSxFQUVtQkgsQ0FBQyxDQUFDMEksWUFBRixDQUFlLEtBQUtwTixPQUFwQixFQUE0QnNDLENBQTVCLENBRm5CLEVBRWtEb0MsQ0FBQyxDQUFDMkksV0FBRixDQUFjLEtBQUtyTixPQUFuQixDQUZsRCxFQUU4RSxDQUFDMEUsQ0FBQyxDQUFDNEksbUJBQUYsQ0FBc0IsS0FBS3ROLE9BQTNCLEVBQW1DMEUsQ0FBQyxDQUFDNkksV0FBckMsQ0FGbEYsRUFFb0ksT0FBT2xFLE9BQU8sQ0FBQ0MsSUFBUixDQUFhNUUsQ0FBQyxDQUFDOEksaUJBQUYsQ0FBb0IsS0FBS3hOLE9BQXpCLENBQWIsQ0FBUDtBQUF1RDBFLE1BQUFBLENBQUMsQ0FBQytJLFlBQUYsQ0FBZTVJLENBQWYsR0FBa0JILENBQUMsQ0FBQytJLFlBQUYsQ0FBZW5MLENBQWYsQ0FBbEIsRUFBb0MsS0FBS29MLGdCQUFMLEdBQXNCLElBQUlDLEdBQUosRUFBMUQ7QUFBa0UsVUFBSWhLLENBQUMsR0FBQ2UsQ0FBQyxDQUFDNEksbUJBQUYsQ0FBc0IsS0FBS3ROLE9BQTNCLEVBQW1DMEUsQ0FBQyxDQUFDa0osZUFBckMsQ0FBTjs7QUFBNEQsV0FBSSxJQUFJMUgsQ0FBQyxHQUFDLENBQVYsRUFBWUEsQ0FBQyxHQUFDdkMsQ0FBZCxFQUFnQnVDLENBQUMsRUFBakIsRUFBb0I7QUFBQyxZQUFJdkIsQ0FBQyxHQUFDRCxDQUFDLENBQUNtSixnQkFBRixDQUFtQixLQUFLN04sT0FBeEIsRUFBZ0NrRyxDQUFoQyxDQUFOO0FBQXlDLGFBQUt3SCxnQkFBTCxDQUFzQjVLLEdBQXRCLENBQTBCNkIsQ0FBMUIsRUFBNEJELENBQUMsQ0FBQ29KLGtCQUFGLENBQXFCLEtBQUs5TixPQUExQixFQUFrQzJFLENBQUMsQ0FBQ29KLElBQXBDLENBQTVCO0FBQXVFLFlBQUluSixDQUFDLEdBQUNELENBQUMsQ0FBQ29KLElBQUYsQ0FBT0MsS0FBUCxDQUFhLFFBQWIsQ0FBTjtBQUE2QnJKLFFBQUFBLENBQUMsQ0FBQ3NKLFdBQUYsR0FBY3JKLENBQUMsQ0FBQyxDQUFELENBQWYsRUFBbUIsTUFBSUEsQ0FBQyxDQUFDbkMsTUFBTixJQUFja0MsQ0FBQyxDQUFDdUosYUFBRixHQUFnQixDQUFDLENBQWpCLEVBQW1CdkosQ0FBQyxDQUFDd0osV0FBRixHQUFjQyxNQUFNLENBQUN4SixDQUFDLENBQUMsQ0FBRCxDQUFGLENBQXZDLEVBQThDRCxDQUFDLENBQUMwSixjQUFGLEdBQWlCekosQ0FBQyxDQUFDLENBQUQsQ0FBOUUsSUFBbUYsTUFBSUEsQ0FBQyxDQUFDbkMsTUFBTixJQUFjNkwsS0FBSyxDQUFDRixNQUFNLENBQUN4SixDQUFDLENBQUMsQ0FBRCxDQUFGLENBQVAsQ0FBbkIsS0FBb0NELENBQUMsQ0FBQzRKLFFBQUYsR0FBVyxDQUFDLENBQVosRUFBYzVKLENBQUMsQ0FBQzBKLGNBQUYsR0FBaUJ6SixDQUFDLENBQUMsQ0FBRCxDQUFwRSxDQUF0RztBQUErSzs7QUFBQSxXQUFLd0Ysa0JBQUwsR0FBd0IsSUFBSXVELEdBQUosRUFBeEI7QUFBZ0MsVUFBSXJILENBQUMsR0FBQyxFQUFOO0FBQUEsVUFBU3ZCLENBQUMsR0FBQ0wsQ0FBQyxDQUFDNEksbUJBQUYsQ0FBc0IsS0FBS3ROLE9BQTNCLEVBQW1DMEUsQ0FBQyxDQUFDOEosaUJBQXJDLENBQVg7O0FBQW1FLFdBQUksSUFBSXJJLENBQUMsR0FBQyxDQUFWLEVBQVlBLENBQUMsR0FBQ3BCLENBQWQsRUFBZ0JvQixDQUFDLEVBQWpCLEVBQW9CO0FBQUMsWUFBSUYsQ0FBQyxHQUFDdkIsQ0FBQyxDQUFDK0osZUFBRixDQUFrQixLQUFLek8sT0FBdkIsRUFBK0JtRyxDQUEvQixDQUFOO0FBQUEsWUFBd0NXLENBQUMsR0FBQ3BDLENBQUMsQ0FBQ2dLLGlCQUFGLENBQW9CLEtBQUsxTyxPQUF6QixFQUFpQ2lHLENBQUMsQ0FBQzhILElBQW5DLENBQTFDO0FBQW1GekgsUUFBQUEsQ0FBQyxDQUFDUSxDQUFELENBQUQsR0FBS2IsQ0FBQyxDQUFDOEgsSUFBUCxFQUFZLEtBQUszRCxrQkFBTCxDQUF3QnRILEdBQXhCLENBQTRCbUQsQ0FBQyxDQUFDOEgsSUFBOUIsRUFBbUNqSCxDQUFuQyxDQUFaO0FBQWtEOztBQUFBLFdBQUttRCxjQUFMLEdBQW9CM0QsQ0FBQyxDQUFDcUksSUFBRixDQUFPLEVBQVAsQ0FBcEI7QUFBK0I7O0FBQUFuQyxJQUFBQSxZQUFZLENBQUM5SCxDQUFELEVBQUdDLENBQUgsRUFBS0MsQ0FBTCxFQUFPQyxDQUFQLEVBQVM7QUFBQyxXQUFLd0gsU0FBTCxDQUFlNUssR0FBZixHQUFtQmlELENBQW5CLEVBQXFCLEtBQUsySCxTQUFMLENBQWV1QyxHQUFmLEdBQW1CakssQ0FBeEMsRUFBMEMsS0FBSzBILFNBQUwsQ0FBZXdDLFFBQWYsR0FBd0JqSyxDQUFsRSxFQUFvRSxLQUFLeUgsU0FBTCxDQUFleUMsUUFBZixHQUF3QmpLLENBQTVGLEVBQThGSCxDQUFDLEtBQUcsS0FBS2dILFdBQUwsR0FBaUIsQ0FBQyxDQUFyQixDQUEvRjtBQUF1SDs7QUFBQXFELElBQUFBLGdCQUFnQixDQUFDckssQ0FBRCxFQUFHQyxDQUFILEVBQUs7QUFBQyxXQUFLMkgsYUFBTCxDQUFtQjBDLE9BQW5CLEdBQTJCdEssQ0FBM0IsRUFBNkIsS0FBSzRILGFBQUwsQ0FBbUIyQyxTQUFuQixHQUE2QnRLLENBQTFEO0FBQTREOztBQUFBdUssSUFBQUEsVUFBVSxHQUFFO0FBQUMsV0FBS25ELFNBQUwsR0FBZSxLQUFLck4sRUFBTCxDQUFRSCxRQUFSLENBQWlCNFEsTUFBakIsQ0FBd0IsS0FBS3pRLEVBQUwsQ0FBUTBRLFVBQWhDLENBQWYsR0FBMkQsS0FBSzFRLEVBQUwsQ0FBUUgsUUFBUixDQUFpQjhRLE9BQWpCLENBQXlCLEtBQUszUSxFQUFMLENBQVEwUSxVQUFqQyxDQUEzRCxFQUF3RyxLQUFLekQsUUFBTCxHQUFjLEtBQUtqTixFQUFMLENBQVFILFFBQVIsQ0FBaUI0USxNQUFqQixDQUF3QixLQUFLelEsRUFBTCxDQUFRNFEsU0FBaEMsQ0FBZCxHQUF5RCxLQUFLNVEsRUFBTCxDQUFRSCxRQUFSLENBQWlCOFEsT0FBakIsQ0FBeUIsS0FBSzNRLEVBQUwsQ0FBUTRRLFNBQWpDLENBQWpLLEVBQTZNLEtBQUtqRCxTQUFMLENBQWU1SyxHQUFmLEdBQW1CLEtBQUsvQyxFQUFMLENBQVFILFFBQVIsQ0FBaUI0USxNQUFqQixDQUF3QixLQUFLelEsRUFBTCxDQUFRNlEsS0FBaEMsQ0FBbkIsR0FBMEQsS0FBSzdRLEVBQUwsQ0FBUUgsUUFBUixDQUFpQjhRLE9BQWpCLENBQXlCLEtBQUszUSxFQUFMLENBQVE2USxLQUFqQyxDQUF2USxFQUErUyxLQUFLNUQsUUFBTCxJQUFlLEtBQUtqTixFQUFMLENBQVFILFFBQVIsQ0FBaUJpUixXQUFqQixDQUE2QixLQUFLN0QsUUFBbEMsQ0FBOVQsRUFBMFcsS0FBS2pOLEVBQUwsQ0FBUUgsUUFBUixDQUFpQmtSLFlBQWpCLENBQThCLEtBQUs1RCxTQUFuQyxDQUExVyxFQUF3WixLQUFLbk4sRUFBTCxDQUFRSCxRQUFSLENBQWlCbVIsWUFBakIsQ0FBOEIsS0FBSzFELFVBQW5DLENBQXhaLEVBQXVjLEtBQUt0TixFQUFMLENBQVFILFFBQVIsQ0FBaUJvUixZQUFqQixDQUE4QixLQUFLekQsU0FBbkMsQ0FBdmMsRUFBcWYsS0FBS0csU0FBTCxDQUFlNUssR0FBZixJQUFvQixLQUFLL0MsRUFBTCxDQUFRSCxRQUFSLENBQWlCaU8sWUFBakIsQ0FBOEIsS0FBS0gsU0FBTCxDQUFlNUssR0FBN0MsRUFBaUQsS0FBSzRLLFNBQUwsQ0FBZXVDLEdBQWhFLEVBQW9FLEtBQUt2QyxTQUFMLENBQWV3QyxRQUFuRixFQUE0RixLQUFLeEMsU0FBTCxDQUFleUMsUUFBM0csQ0FBemdCLEVBQThuQixLQUFLeEMsYUFBTCxDQUFtQjBDLE9BQW5CLElBQTRCLEtBQUt0USxFQUFMLENBQVFILFFBQVIsQ0FBaUJ3USxnQkFBakIsQ0FBa0MsS0FBS3pDLGFBQUwsQ0FBbUIwQyxPQUFyRCxFQUE2RCxLQUFLMUMsYUFBTCxDQUFtQjJDLFNBQWhGLENBQTFwQjtBQUFxdkI7O0FBQUFXLElBQUFBLEdBQUcsQ0FBQztBQUFDQyxNQUFBQSxTQUFTLEVBQUNuTCxDQUFDLEdBQUMsQ0FBQztBQUFkLFFBQWlCLEVBQWxCLEVBQXFCO0FBQUMsVUFBSUMsQ0FBQyxHQUFDLENBQUMsQ0FBUDtBQUFTLFdBQUtqRyxFQUFMLENBQVFILFFBQVIsQ0FBaUJ1UixjQUFqQixLQUFrQyxLQUFLbEksRUFBdkMsS0FBNEMsS0FBS2xKLEVBQUwsQ0FBUXFSLFVBQVIsQ0FBbUIsS0FBSy9QLE9BQXhCLEdBQWlDLEtBQUt0QixFQUFMLENBQVFILFFBQVIsQ0FBaUJ1UixjQUFqQixHQUFnQyxLQUFLbEksRUFBbEgsR0FBc0gsS0FBSzhGLGdCQUFMLENBQXNCcE8sT0FBdEIsQ0FBOEIsQ0FBQ2dELENBQUQsRUFBR3NDLENBQUgsS0FBTztBQUFDLFlBQUlDLENBQUMsR0FBQ0QsQ0FBQyxDQUFDcUosV0FBUjtBQUFBLFlBQW9CdkosQ0FBQyxHQUFDLEtBQUt6RSxRQUFMLENBQWM0RSxDQUFkLENBQXRCO0FBQXVDLFlBQUdELENBQUMsQ0FBQzJKLFFBQUYsS0FBYTdKLENBQUMsR0FBQ0EsQ0FBQyxDQUFDRSxDQUFDLENBQUN5SixjQUFILENBQUgsRUFBc0J4SixDQUFDLElBQUcsSUFBR0QsQ0FBQyxDQUFDeUosY0FBZSxFQUEzRCxHQUE4RHpKLENBQUMsQ0FBQ3NKLGFBQUYsS0FBa0J4SixDQUFDLEdBQUNBLENBQUMsQ0FBQ0UsQ0FBQyxDQUFDdUosV0FBSCxDQUFELENBQWlCdkosQ0FBQyxDQUFDeUosY0FBbkIsQ0FBRixFQUFxQ3hKLENBQUMsSUFBRyxJQUFHRCxDQUFDLENBQUN1SixXQUFZLEtBQUl2SixDQUFDLENBQUN5SixjQUFlLEVBQWpHLENBQTlELEVBQWtLLENBQUMzSixDQUF0SyxFQUF3SyxPQUFPc0wsQ0FBQyxDQUFFLGtCQUFpQm5MLENBQUUsd0JBQXJCLENBQVI7QUFBc0QsWUFBR0gsQ0FBQyxJQUFHLEtBQUssQ0FBTCxLQUFTQSxDQUFDLENBQUN2RSxLQUFsQixFQUF3QixPQUFPNlAsQ0FBQyxDQUFFLEdBQUVuTCxDQUFFLHVDQUFOLENBQVI7QUFBc0QsWUFBR0gsQ0FBQyxDQUFDdkUsS0FBRixDQUFRWSxPQUFYLEVBQW1CLE9BQU80RCxDQUFDLElBQUUsQ0FBSCxFQUFLRCxDQUFDLENBQUN2RSxLQUFGLENBQVF1RCxNQUFSLENBQWVpQixDQUFmLENBQUwsRUFBdUJzTCxDQUFDLENBQUMsS0FBS3ZSLEVBQU4sRUFBU2tHLENBQUMsQ0FBQzJELElBQVgsRUFBZ0JqRyxDQUFoQixFQUFrQnFDLENBQWxCLENBQS9COztBQUFvRCxZQUFHRCxDQUFDLENBQUN2RSxLQUFGLENBQVFzQyxNQUFSLElBQWdCaUMsQ0FBQyxDQUFDdkUsS0FBRixDQUFRLENBQVIsRUFBV1ksT0FBOUIsRUFBc0M7QUFBQyxjQUFJbUUsQ0FBQyxHQUFDLEVBQU47QUFBUyxpQkFBT1IsQ0FBQyxDQUFDdkUsS0FBRixDQUFRYixPQUFSLENBQWdCb0YsQ0FBQyxJQUFFO0FBQUNDLFlBQUFBLENBQUMsSUFBRSxDQUFILEVBQUtELENBQUMsQ0FBQ2hCLE1BQUYsQ0FBU2lCLENBQVQsQ0FBTCxFQUFpQk8sQ0FBQyxDQUFDZ0wsSUFBRixDQUFPdkwsQ0FBUCxDQUFqQjtBQUEyQixXQUEvQyxHQUFpRHNMLENBQUMsQ0FBQyxLQUFLdlIsRUFBTixFQUFTa0csQ0FBQyxDQUFDMkQsSUFBWCxFQUFnQmpHLENBQWhCLEVBQWtCNEMsQ0FBbEIsQ0FBekQ7QUFBOEU7O0FBQUErSyxRQUFBQSxDQUFDLENBQUMsS0FBS3ZSLEVBQU4sRUFBU2tHLENBQUMsQ0FBQzJELElBQVgsRUFBZ0JqRyxDQUFoQixFQUFrQm9DLENBQUMsQ0FBQ3ZFLEtBQXBCLENBQUQ7QUFBNEIsT0FBMWxCLENBQXRILEVBQWt0QixLQUFLK08sVUFBTCxFQUFsdEIsRUFBb3VCeEssQ0FBQyxJQUFFLEtBQUtoRyxFQUFMLENBQVFILFFBQVIsQ0FBaUJrUixZQUFqQixDQUE4QixLQUFLNUQsU0FBTCxLQUFpQixLQUFLbk4sRUFBTCxDQUFRb04sR0FBekIsR0FBNkIsS0FBS3BOLEVBQUwsQ0FBUXlSLEVBQXJDLEdBQXdDLEtBQUt6UixFQUFMLENBQVFvTixHQUE5RSxDQUF2dUI7QUFBMHpCOztBQUFBVixJQUFBQSxNQUFNLEdBQUU7QUFBQyxXQUFLMU0sRUFBTCxDQUFRMFIsYUFBUixDQUFzQixLQUFLcFEsT0FBM0I7QUFBb0M7O0FBSml6STs7QUFJaHpJLFdBQVNpUSxDQUFULENBQVd0TCxDQUFYLEVBQWFyQyxDQUFiLEVBQWVzQyxDQUFmLEVBQWlCRixDQUFqQixFQUFtQjtBQUFDQSxJQUFBQSxDQUFDLEdBQUNBLENBQUMsQ0FBQ2pDLE1BQUYsR0FBUyxVQUFTaUMsQ0FBVCxFQUFXO0FBQUMsVUFBSVEsQ0FBQyxHQUFDUixDQUFDLENBQUNqQyxNQUFSO0FBQUEsVUFBZW9DLENBQUMsR0FBQ0gsQ0FBQyxDQUFDLENBQUQsQ0FBRCxDQUFLakMsTUFBdEI7QUFBNkIsVUFBRyxLQUFLLENBQUwsS0FBU29DLENBQVosRUFBYyxPQUFPSCxDQUFQO0FBQVMsVUFBSXBDLENBQUMsR0FBQzRDLENBQUMsR0FBQ0wsQ0FBUjtBQUFBLFVBQVVGLENBQUMsR0FBQzhHLENBQUMsQ0FBQ25KLENBQUQsQ0FBYjtBQUFpQnFDLE1BQUFBLENBQUMsS0FBRzhHLENBQUMsQ0FBQ25KLENBQUQsQ0FBRCxHQUFLcUMsQ0FBQyxHQUFDLElBQUkvRCxZQUFKLENBQWlCMEIsQ0FBakIsQ0FBVixDQUFEOztBQUFnQyxXQUFJLElBQUlzQyxDQUFDLEdBQUMsQ0FBVixFQUFZQSxDQUFDLEdBQUNNLENBQWQsRUFBZ0JOLENBQUMsRUFBakIsRUFBb0JELENBQUMsQ0FBQzdCLEdBQUYsQ0FBTTRCLENBQUMsQ0FBQ0UsQ0FBRCxDQUFQLEVBQVdBLENBQUMsR0FBQ0MsQ0FBYjs7QUFBZ0IsYUFBT0YsQ0FBUDtBQUFTLEtBQTlKLENBQStKRCxDQUEvSixDQUFULEdBQTJLQSxDQUE3SztBQUErSyxRQUFJRyxDQUFDLEdBQUNGLENBQUMsQ0FBQ3BHLFFBQUYsQ0FBVzhKLEtBQVgsQ0FBaUJxRixnQkFBakIsQ0FBa0MyQyxHQUFsQyxDQUFzQ3pMLENBQXRDLENBQU47O0FBQStDLFFBQUdGLENBQUMsQ0FBQ2pDLE1BQUwsRUFBWTtBQUFDLFVBQUcsS0FBSyxDQUFMLEtBQVNvQyxDQUFaLEVBQWNGLENBQUMsQ0FBQ3BHLFFBQUYsQ0FBVzhKLEtBQVgsQ0FBaUJxRixnQkFBakIsQ0FBa0M1SyxHQUFsQyxDQUFzQzhCLENBQXRDLEVBQXdDRixDQUFDLENBQUM0TCxLQUFGLENBQVEsQ0FBUixDQUF4QyxFQUFkLEtBQXNFO0FBQUMsWUFBRyxVQUFTM0wsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxjQUFHRCxDQUFDLENBQUNsQyxNQUFGLEtBQVdtQyxDQUFDLENBQUNuQyxNQUFoQixFQUF1QixPQUFNLENBQUMsQ0FBUDs7QUFBUyxlQUFJLElBQUlpQyxDQUFDLEdBQUMsQ0FBTixFQUFRRyxDQUFDLEdBQUNGLENBQUMsQ0FBQ2xDLE1BQWhCLEVBQXVCaUMsQ0FBQyxHQUFDRyxDQUF6QixFQUEyQkgsQ0FBQyxFQUE1QixFQUErQixJQUFHQyxDQUFDLENBQUNELENBQUQsQ0FBRCxLQUFPRSxDQUFDLENBQUNGLENBQUQsQ0FBWCxFQUFlLE9BQU0sQ0FBQyxDQUFQOztBQUFTLGlCQUFNLENBQUMsQ0FBUDtBQUFTLFNBQTlHLENBQStHRyxDQUEvRyxFQUFpSEgsQ0FBakgsQ0FBSCxFQUF1SDtBQUFPRyxRQUFBQSxDQUFDLENBQUMvQixHQUFGLENBQU00QixDQUFOLEdBQVNDLENBQUMsQ0FBQ3BHLFFBQUYsQ0FBVzhKLEtBQVgsQ0FBaUJxRixnQkFBakIsQ0FBa0M1SyxHQUFsQyxDQUFzQzhCLENBQXRDLEVBQXdDQyxDQUF4QyxDQUFUO0FBQW9EO0FBQUMsS0FBdlEsTUFBMlE7QUFBQyxVQUFHQSxDQUFDLEtBQUdILENBQVAsRUFBUztBQUFPQyxNQUFBQSxDQUFDLENBQUNwRyxRQUFGLENBQVc4SixLQUFYLENBQWlCcUYsZ0JBQWpCLENBQWtDNUssR0FBbEMsQ0FBc0M4QixDQUF0QyxFQUF3Q0YsQ0FBeEM7QUFBMkM7O0FBQUEsWUFBT3BDLENBQVA7QUFBVSxXQUFLLElBQUw7QUFBVSxlQUFPb0MsQ0FBQyxDQUFDakMsTUFBRixHQUFTa0MsQ0FBQyxDQUFDNEwsVUFBRixDQUFhM0wsQ0FBYixFQUFlRixDQUFmLENBQVQsR0FBMkJDLENBQUMsQ0FBQzZMLFNBQUYsQ0FBWTVMLENBQVosRUFBY0YsQ0FBZCxDQUFsQzs7QUFBbUQsV0FBSyxLQUFMO0FBQVcsZUFBT0MsQ0FBQyxDQUFDOEwsVUFBRixDQUFhN0wsQ0FBYixFQUFlRixDQUFmLENBQVA7O0FBQXlCLFdBQUssS0FBTDtBQUFXLGVBQU9DLENBQUMsQ0FBQytMLFVBQUYsQ0FBYTlMLENBQWIsRUFBZUYsQ0FBZixDQUFQOztBQUF5QixXQUFLLEtBQUw7QUFBVyxlQUFPQyxDQUFDLENBQUNnTSxVQUFGLENBQWEvTCxDQUFiLEVBQWVGLENBQWYsQ0FBUDs7QUFBeUIsV0FBSyxLQUFMO0FBQVcsV0FBSyxJQUFMO0FBQVUsV0FBSyxLQUFMO0FBQVcsV0FBSyxLQUFMO0FBQVcsZUFBT0EsQ0FBQyxDQUFDakMsTUFBRixHQUFTa0MsQ0FBQyxDQUFDaU0sVUFBRixDQUFhaE0sQ0FBYixFQUFlRixDQUFmLENBQVQsR0FBMkJDLENBQUMsQ0FBQ2tNLFNBQUYsQ0FBWWpNLENBQVosRUFBY0YsQ0FBZCxDQUFsQzs7QUFBbUQsV0FBSyxLQUFMO0FBQVcsV0FBSyxLQUFMO0FBQVcsZUFBT0MsQ0FBQyxDQUFDbU0sVUFBRixDQUFhbE0sQ0FBYixFQUFlRixDQUFmLENBQVA7O0FBQXlCLFdBQUssS0FBTDtBQUFXLFdBQUssS0FBTDtBQUFXLGVBQU9DLENBQUMsQ0FBQ29NLFVBQUYsQ0FBYW5NLENBQWIsRUFBZUYsQ0FBZixDQUFQOztBQUF5QixXQUFLLEtBQUw7QUFBVyxXQUFLLEtBQUw7QUFBVyxlQUFPQyxDQUFDLENBQUNxTSxVQUFGLENBQWFwTSxDQUFiLEVBQWVGLENBQWYsQ0FBUDs7QUFBeUIsV0FBSyxLQUFMO0FBQVcsZUFBT0MsQ0FBQyxDQUFDc00sZ0JBQUYsQ0FBbUJyTSxDQUFuQixFQUFxQixDQUFDLENBQXRCLEVBQXdCRixDQUF4QixDQUFQOztBQUFrQyxXQUFLLEtBQUw7QUFBVyxlQUFPQyxDQUFDLENBQUN1TSxnQkFBRixDQUFtQnRNLENBQW5CLEVBQXFCLENBQUMsQ0FBdEIsRUFBd0JGLENBQXhCLENBQVA7O0FBQWtDLFdBQUssS0FBTDtBQUFXLGVBQU9DLENBQUMsQ0FBQ3dNLGdCQUFGLENBQW1Cdk0sQ0FBbkIsRUFBcUIsQ0FBQyxDQUF0QixFQUF3QkYsQ0FBeEIsQ0FBUDtBQUFuZ0I7QUFBc2lCOztBQUFBLFdBQVN1SSxDQUFULENBQVdySSxDQUFYLEVBQWE7QUFBQyxRQUFJRCxDQUFDLEdBQUNDLENBQUMsQ0FBQ3dNLEtBQUYsQ0FBUSxJQUFSLENBQU47O0FBQW9CLFNBQUksSUFBSTFNLENBQUMsR0FBQyxDQUFWLEVBQVlBLENBQUMsR0FBQ0MsQ0FBQyxDQUFDbEMsTUFBaEIsRUFBdUJpQyxDQUFDLEVBQXhCLEVBQTJCQyxDQUFDLENBQUNELENBQUQsQ0FBRCxHQUFLQSxDQUFDLEdBQUMsQ0FBRixHQUFJLElBQUosR0FBU0MsQ0FBQyxDQUFDRCxDQUFELENBQWY7O0FBQW1CLFdBQU9DLENBQUMsQ0FBQ2dLLElBQUYsQ0FBTyxJQUFQLENBQVA7QUFBb0I7O0FBQUEsTUFBSTBDLENBQUMsR0FBQyxDQUFOOztBQUFRLFdBQVNyQixDQUFULENBQVd0TCxDQUFYLEVBQWE7QUFBQzJNLElBQUFBLENBQUMsR0FBQyxHQUFGLEtBQVFoSSxPQUFPLENBQUNDLElBQVIsQ0FBYTVFLENBQWIsR0FBZ0IsRUFBRTJNLENBQUYsR0FBSSxHQUFKLElBQVNoSSxPQUFPLENBQUNDLElBQVIsQ0FBYSxpREFBYixDQUFqQztBQUFrRzs7QUFBQSxNQUFJZ0ksQ0FBQyxHQUFDLElBQUkzTSxDQUFKLEVBQU47O0FBQVksV0FBU3dCLENBQVQsQ0FBV3pCLENBQVgsRUFBYUMsQ0FBYixFQUFlO0FBQUMsV0FBT0QsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFDLENBQUMsQ0FBRCxDQUFOLEVBQVVELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBaEIsRUFBb0JELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBMUIsRUFBOEJELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBcEMsRUFBd0NELENBQS9DO0FBQWlEOztBQUFBLFdBQVN1QixDQUFULENBQVd2QixDQUFYLEVBQWFDLENBQWIsRUFBZUMsQ0FBZixFQUFpQkMsQ0FBakIsRUFBbUJ2QyxDQUFuQixFQUFxQjtBQUFDLFdBQU9vQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUwsRUFBT0QsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRSxDQUFaLEVBQWNGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0csQ0FBbkIsRUFBcUJILENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3BDLENBQTFCLEVBQTRCb0MsQ0FBbkM7QUFBcUM7O0FBQUEsV0FBUzRCLENBQVQsQ0FBVzNCLENBQVgsRUFBYUMsQ0FBYixFQUFlO0FBQUMsUUFBSUMsQ0FBQyxHQUFDRCxDQUFDLENBQUMsQ0FBRCxDQUFQO0FBQUEsUUFBV3RDLENBQUMsR0FBQ3NDLENBQUMsQ0FBQyxDQUFELENBQWQ7QUFBQSxRQUFrQk0sQ0FBQyxHQUFDTixDQUFDLENBQUMsQ0FBRCxDQUFyQjtBQUFBLFFBQXlCWSxDQUFDLEdBQUNaLENBQUMsQ0FBQyxDQUFELENBQTVCO0FBQUEsUUFBZ0NGLENBQUMsR0FBQ0csQ0FBQyxHQUFDQSxDQUFGLEdBQUl2QyxDQUFDLEdBQUNBLENBQU4sR0FBUTRDLENBQUMsR0FBQ0EsQ0FBVixHQUFZTSxDQUFDLEdBQUNBLENBQWhEO0FBQWtELFdBQU9kLENBQUMsR0FBQyxDQUFGLEtBQU1BLENBQUMsR0FBQyxJQUFFbkIsSUFBSSxDQUFDdUIsSUFBTCxDQUFVSixDQUFWLENBQVYsR0FBd0JDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0UsQ0FBQyxHQUFDSCxDQUEvQixFQUFpQ0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLckMsQ0FBQyxHQUFDb0MsQ0FBeEMsRUFBMENDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS08sQ0FBQyxHQUFDUixDQUFqRCxFQUFtREMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLYSxDQUFDLEdBQUNkLENBQTFELEVBQTREQyxDQUFuRTtBQUFxRTs7QUFBQSxXQUFTNE0sQ0FBVCxDQUFXN00sQ0FBWCxFQUFhQyxDQUFiLEVBQWVDLENBQWYsRUFBaUI7QUFBQyxRQUFJQyxDQUFDLEdBQUNGLENBQUMsQ0FBQyxDQUFELENBQVA7QUFBQSxRQUFXckMsQ0FBQyxHQUFDcUMsQ0FBQyxDQUFDLENBQUQsQ0FBZDtBQUFBLFFBQWtCTyxDQUFDLEdBQUNQLENBQUMsQ0FBQyxDQUFELENBQXJCO0FBQUEsUUFBeUJhLENBQUMsR0FBQ2IsQ0FBQyxDQUFDLENBQUQsQ0FBNUI7QUFBQSxRQUFnQ3VCLENBQUMsR0FBQ3RCLENBQUMsQ0FBQyxDQUFELENBQW5DO0FBQUEsUUFBdUN1QixDQUFDLEdBQUN2QixDQUFDLENBQUMsQ0FBRCxDQUExQztBQUFBLFFBQThDcUIsQ0FBQyxHQUFDckIsQ0FBQyxDQUFDLENBQUQsQ0FBakQ7QUFBQSxRQUFxRDBCLENBQUMsR0FBQzFCLENBQUMsQ0FBQyxDQUFELENBQXhEO0FBQTRELFdBQU9GLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0csQ0FBQyxHQUFDeUIsQ0FBRixHQUFJZCxDQUFDLEdBQUNVLENBQU4sR0FBUTVELENBQUMsR0FBQzJELENBQVYsR0FBWWYsQ0FBQyxHQUFDaUIsQ0FBbkIsRUFBcUJ6QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtwQyxDQUFDLEdBQUNnRSxDQUFGLEdBQUlkLENBQUMsR0FBQ1csQ0FBTixHQUFRakIsQ0FBQyxHQUFDZ0IsQ0FBVixHQUFZckIsQ0FBQyxHQUFDb0IsQ0FBeEMsRUFBMEN2QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtRLENBQUMsR0FBQ29CLENBQUYsR0FBSWQsQ0FBQyxHQUFDUyxDQUFOLEdBQVFwQixDQUFDLEdBQUNzQixDQUFWLEdBQVk3RCxDQUFDLEdBQUM0RCxDQUE3RCxFQUErRHhCLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS2MsQ0FBQyxHQUFDYyxDQUFGLEdBQUl6QixDQUFDLEdBQUNxQixDQUFOLEdBQVE1RCxDQUFDLEdBQUM2RCxDQUFWLEdBQVlqQixDQUFDLEdBQUNlLENBQWxGLEVBQW9GdkIsQ0FBM0Y7QUFBNkY7O0FBQUEsTUFBSThNLENBQUMsR0FBQ3JMLENBQU47QUFBQSxNQUFRc0wsQ0FBQyxHQUFDeEwsQ0FBVjtBQUFBLE1BQVl5TCxDQUFDLEdBQUNwTCxDQUFkOztBQUFnQixRQUFNekIsQ0FBTixTQUFnQlUsS0FBaEIsQ0FBcUI7QUFBQ3RILElBQUFBLFdBQVcsQ0FBQ3lHLENBQUMsR0FBQyxDQUFILEVBQUtDLENBQUMsR0FBQyxDQUFQLEVBQVNDLENBQUMsR0FBQyxDQUFYLEVBQWFDLENBQUMsR0FBQyxDQUFmLEVBQWlCO0FBQUMsYUFBTyxNQUFNSCxDQUFOLEVBQVFDLENBQVIsRUFBVUMsQ0FBVixFQUFZQyxDQUFaLEdBQWUsS0FBSzhNLFFBQUwsR0FBYyxNQUFJLENBQUUsQ0FBbkMsRUFBb0MsSUFBM0M7QUFBZ0Q7O0FBQUssUUFBRGpQLENBQUMsR0FBRTtBQUFDLGFBQU8sS0FBSyxDQUFMLENBQVA7QUFBZTs7QUFBSyxRQUFEQSxDQUFDLENBQUNnQyxDQUFELEVBQUc7QUFBQyxXQUFLLENBQUwsSUFBUUEsQ0FBUixFQUFVLEtBQUtpTixRQUFMLEVBQVY7QUFBMEI7O0FBQUssUUFBRC9PLENBQUMsR0FBRTtBQUFDLGFBQU8sS0FBSyxDQUFMLENBQVA7QUFBZTs7QUFBSyxRQUFEQSxDQUFDLENBQUM4QixDQUFELEVBQUc7QUFBQyxXQUFLLENBQUwsSUFBUUEsQ0FBUixFQUFVLEtBQUtpTixRQUFMLEVBQVY7QUFBMEI7O0FBQUssUUFBRHhNLENBQUMsR0FBRTtBQUFDLGFBQU8sS0FBSyxDQUFMLENBQVA7QUFBZTs7QUFBSyxRQUFEQSxDQUFDLENBQUNULENBQUQsRUFBRztBQUFDLFdBQUssQ0FBTCxJQUFRQSxDQUFSLEVBQVUsS0FBS2lOLFFBQUwsRUFBVjtBQUEwQjs7QUFBSyxRQUFEMU0sQ0FBQyxHQUFFO0FBQUMsYUFBTyxLQUFLLENBQUwsQ0FBUDtBQUFlOztBQUFLLFFBQURBLENBQUMsQ0FBQ1AsQ0FBRCxFQUFHO0FBQUMsV0FBSyxDQUFMLElBQVFBLENBQVIsRUFBVSxLQUFLaU4sUUFBTCxFQUFWO0FBQTBCOztBQUFBQyxJQUFBQSxRQUFRLEdBQUU7QUFBQyxVQUFJbE4sQ0FBSjtBQUFNLGFBQU0sQ0FBQ0EsQ0FBQyxHQUFDLElBQUgsRUFBUyxDQUFULElBQVksQ0FBWixFQUFjQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBbkIsRUFBcUJBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUExQixFQUE0QkEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQWpDLEVBQW1DLEtBQUtpTixRQUFMLEVBQW5DLEVBQW1ELElBQXpEO0FBQThEOztBQUFBN08sSUFBQUEsR0FBRyxDQUFDNEIsQ0FBRCxFQUFHQyxDQUFILEVBQUtDLENBQUwsRUFBT0MsQ0FBUCxFQUFTO0FBQUMsYUFBT0gsQ0FBQyxDQUFDakMsTUFBRixHQUFTLEtBQUtvQixJQUFMLENBQVVhLENBQVYsQ0FBVCxJQUF1QitNLENBQUMsQ0FBQyxJQUFELEVBQU0vTSxDQUFOLEVBQVFDLENBQVIsRUFBVUMsQ0FBVixFQUFZQyxDQUFaLENBQUQsRUFBZ0IsS0FBSzhNLFFBQUwsRUFBaEIsRUFBZ0MsSUFBdkQsQ0FBUDtBQUFvRTs7QUFBQUUsSUFBQUEsT0FBTyxDQUFDNUwsQ0FBRCxFQUFHO0FBQUMsVUFBSXZCLENBQUosRUFBTUMsQ0FBTixFQUFRckMsQ0FBUjtBQUFVLFVBQUk0QyxDQUFKLEVBQU1NLENBQU4sRUFBUVUsQ0FBUixFQUFVQyxDQUFWLEVBQVl2QixDQUFaLEVBQWNDLENBQWQ7QUFBZ0IsYUFBT0gsQ0FBQyxHQUFDLElBQUYsRUFBT0MsQ0FBQyxHQUFDLElBQVQsRUFBY3JDLENBQUMsR0FBQzJELENBQWhCLEVBQWtCM0QsQ0FBQyxJQUFFLEVBQXJCLEVBQXdCNEMsQ0FBQyxHQUFDUCxDQUFDLENBQUMsQ0FBRCxDQUEzQixFQUErQmEsQ0FBQyxHQUFDYixDQUFDLENBQUMsQ0FBRCxDQUFsQyxFQUFzQ3VCLENBQUMsR0FBQ3ZCLENBQUMsQ0FBQyxDQUFELENBQXpDLEVBQTZDd0IsQ0FBQyxHQUFDeEIsQ0FBQyxDQUFDLENBQUQsQ0FBaEQsRUFBb0RDLENBQUMsR0FBQ3JCLElBQUksQ0FBQ3VPLEdBQUwsQ0FBU3hQLENBQVQsQ0FBdEQsRUFBa0V1QyxDQUFDLEdBQUN0QixJQUFJLENBQUN3TyxHQUFMLENBQVN6UCxDQUFULENBQXBFLEVBQWdGb0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLUSxDQUFDLEdBQUNMLENBQUYsR0FBSXNCLENBQUMsR0FBQ3ZCLENBQTNGLEVBQTZGRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtjLENBQUMsR0FBQ1gsQ0FBRixHQUFJcUIsQ0FBQyxHQUFDdEIsQ0FBeEcsRUFBMEdGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3dCLENBQUMsR0FBQ3JCLENBQUYsR0FBSVcsQ0FBQyxHQUFDWixDQUFySCxFQUF1SEYsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLeUIsQ0FBQyxHQUFDdEIsQ0FBRixHQUFJSyxDQUFDLEdBQUNOLENBQWxJLEVBQW9JLEtBQUsrTSxRQUFMLEVBQXBJLEVBQW9KLElBQTNKO0FBQWdLOztBQUFBSyxJQUFBQSxPQUFPLENBQUMvTCxDQUFELEVBQUc7QUFBQyxVQUFJdkIsQ0FBSixFQUFNQyxDQUFOLEVBQVFyQyxDQUFSO0FBQVUsVUFBSTRDLENBQUosRUFBTU0sQ0FBTixFQUFRVSxDQUFSLEVBQVVDLENBQVYsRUFBWXZCLENBQVosRUFBY0MsQ0FBZDtBQUFnQixhQUFPSCxDQUFDLEdBQUMsSUFBRixFQUFPQyxDQUFDLEdBQUMsSUFBVCxFQUFjckMsQ0FBQyxHQUFDMkQsQ0FBaEIsRUFBa0IzRCxDQUFDLElBQUUsRUFBckIsRUFBd0I0QyxDQUFDLEdBQUNQLENBQUMsQ0FBQyxDQUFELENBQTNCLEVBQStCYSxDQUFDLEdBQUNiLENBQUMsQ0FBQyxDQUFELENBQWxDLEVBQXNDdUIsQ0FBQyxHQUFDdkIsQ0FBQyxDQUFDLENBQUQsQ0FBekMsRUFBNkN3QixDQUFDLEdBQUN4QixDQUFDLENBQUMsQ0FBRCxDQUFoRCxFQUFvREMsQ0FBQyxHQUFDckIsSUFBSSxDQUFDdU8sR0FBTCxDQUFTeFAsQ0FBVCxDQUF0RCxFQUFrRXVDLENBQUMsR0FBQ3RCLElBQUksQ0FBQ3dPLEdBQUwsQ0FBU3pQLENBQVQsQ0FBcEUsRUFBZ0ZvQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtRLENBQUMsR0FBQ0wsQ0FBRixHQUFJcUIsQ0FBQyxHQUFDdEIsQ0FBM0YsRUFBNkZGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS2MsQ0FBQyxHQUFDWCxDQUFGLEdBQUlzQixDQUFDLEdBQUN2QixDQUF4RyxFQUEwR0YsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLd0IsQ0FBQyxHQUFDckIsQ0FBRixHQUFJSyxDQUFDLEdBQUNOLENBQXJILEVBQXVIRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUt5QixDQUFDLEdBQUN0QixDQUFGLEdBQUlXLENBQUMsR0FBQ1osQ0FBbEksRUFBb0ksS0FBSytNLFFBQUwsRUFBcEksRUFBb0osSUFBM0o7QUFBZ0s7O0FBQUFNLElBQUFBLE9BQU8sQ0FBQ2hNLENBQUQsRUFBRztBQUFDLFVBQUl2QixDQUFKLEVBQU1DLENBQU4sRUFBUXJDLENBQVI7QUFBVSxVQUFJNEMsQ0FBSixFQUFNTSxDQUFOLEVBQVFVLENBQVIsRUFBVUMsQ0FBVixFQUFZdkIsQ0FBWixFQUFjQyxDQUFkO0FBQWdCLGFBQU9ILENBQUMsR0FBQyxJQUFGLEVBQU9DLENBQUMsR0FBQyxJQUFULEVBQWNyQyxDQUFDLEdBQUMyRCxDQUFoQixFQUFrQjNELENBQUMsSUFBRSxFQUFyQixFQUF3QjRDLENBQUMsR0FBQ1AsQ0FBQyxDQUFDLENBQUQsQ0FBM0IsRUFBK0JhLENBQUMsR0FBQ2IsQ0FBQyxDQUFDLENBQUQsQ0FBbEMsRUFBc0N1QixDQUFDLEdBQUN2QixDQUFDLENBQUMsQ0FBRCxDQUF6QyxFQUE2Q3dCLENBQUMsR0FBQ3hCLENBQUMsQ0FBQyxDQUFELENBQWhELEVBQW9EQyxDQUFDLEdBQUNyQixJQUFJLENBQUN1TyxHQUFMLENBQVN4UCxDQUFULENBQXRELEVBQWtFdUMsQ0FBQyxHQUFDdEIsSUFBSSxDQUFDd08sR0FBTCxDQUFTelAsQ0FBVCxDQUFwRSxFQUFnRm9DLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS1EsQ0FBQyxHQUFDTCxDQUFGLEdBQUlXLENBQUMsR0FBQ1osQ0FBM0YsRUFBNkZGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS2MsQ0FBQyxHQUFDWCxDQUFGLEdBQUlLLENBQUMsR0FBQ04sQ0FBeEcsRUFBMEdGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3dCLENBQUMsR0FBQ3JCLENBQUYsR0FBSXNCLENBQUMsR0FBQ3ZCLENBQXJILEVBQXVIRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUt5QixDQUFDLEdBQUN0QixDQUFGLEdBQUlxQixDQUFDLEdBQUN0QixDQUFsSSxFQUFvSSxLQUFLK00sUUFBTCxFQUFwSSxFQUFvSixJQUEzSjtBQUFnSzs7QUFBQTlMLElBQUFBLE9BQU8sQ0FBQ00sQ0FBQyxHQUFDLElBQUgsRUFBUTtBQUFDLFVBQUl6QixDQUFKLEVBQU1FLENBQU47QUFBUSxVQUFJQyxDQUFKLEVBQU12QyxDQUFOLEVBQVE0QyxDQUFSLEVBQVVNLENBQVYsRUFBWVUsQ0FBWixFQUFjdkIsQ0FBZDtBQUFnQixhQUFPRCxDQUFDLEdBQUMsSUFBRixFQUFPRyxDQUFDLEdBQUMsQ0FBQ0QsQ0FBQyxHQUFDdUIsQ0FBSCxFQUFNLENBQU4sQ0FBVCxFQUFrQjdELENBQUMsR0FBQ3NDLENBQUMsQ0FBQyxDQUFELENBQXJCLEVBQXlCTSxDQUFDLEdBQUNOLENBQUMsQ0FBQyxDQUFELENBQTVCLEVBQWdDWSxDQUFDLEdBQUNaLENBQUMsQ0FBQyxDQUFELENBQW5DLEVBQXVDc0IsQ0FBQyxHQUFDckIsQ0FBQyxHQUFDQSxDQUFGLEdBQUl2QyxDQUFDLEdBQUNBLENBQU4sR0FBUTRDLENBQUMsR0FBQ0EsQ0FBVixHQUFZTSxDQUFDLEdBQUNBLENBQXZELEVBQXlEYixDQUFDLEdBQUN1QixDQUFDLEdBQUMsSUFBRUEsQ0FBSCxHQUFLLENBQWpFLEVBQW1FeEIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUNHLENBQUQsR0FBR0YsQ0FBM0UsRUFBNkVELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDcEMsQ0FBRCxHQUFHcUMsQ0FBckYsRUFBdUZELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDUSxDQUFELEdBQUdQLENBQS9GLEVBQWlHRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtjLENBQUMsR0FBQ2IsQ0FBeEcsRUFBMEcsS0FBS2dOLFFBQUwsRUFBMUcsRUFBMEgsSUFBakk7QUFBc0k7O0FBQUFPLElBQUFBLFNBQVMsQ0FBQ3ROLENBQUMsR0FBQyxJQUFILEVBQVE7QUFBQyxVQUFJRCxDQUFKLEVBQU1ELENBQU47QUFBUSxhQUFPQSxDQUFDLEdBQUNFLENBQUYsRUFBSSxDQUFDRCxDQUFDLEdBQUMsSUFBSCxFQUFTLENBQVQsSUFBWSxDQUFDRCxDQUFDLENBQUMsQ0FBRCxDQUFsQixFQUFzQkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUNELENBQUMsQ0FBQyxDQUFELENBQTdCLEVBQWlDQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQ0QsQ0FBQyxDQUFDLENBQUQsQ0FBeEMsRUFBNENDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0QsQ0FBQyxDQUFDLENBQUQsQ0FBbEQsRUFBc0QsS0FBS2lOLFFBQUwsRUFBdEQsRUFBc0UsSUFBN0U7QUFBa0Y7O0FBQUE5TixJQUFBQSxJQUFJLENBQUNhLENBQUQsRUFBRztBQUFDLGFBQU84TSxDQUFDLENBQUMsSUFBRCxFQUFNOU0sQ0FBTixDQUFELEVBQVUsS0FBS2lOLFFBQUwsRUFBVixFQUEwQixJQUFqQztBQUFzQzs7QUFBQW5MLElBQUFBLFNBQVMsQ0FBQzlCLENBQUMsR0FBQyxJQUFILEVBQVE7QUFBQyxhQUFPZ04sQ0FBQyxDQUFDLElBQUQsRUFBTWhOLENBQU4sQ0FBRCxFQUFVLEtBQUtpTixRQUFMLEVBQVYsRUFBMEIsSUFBakM7QUFBc0M7O0FBQUFoTSxJQUFBQSxRQUFRLENBQUNqQixDQUFELEVBQUdDLENBQUgsRUFBSztBQUFDLGFBQU9BLENBQUMsR0FBQzRNLENBQUMsQ0FBQyxJQUFELEVBQU03TSxDQUFOLEVBQVFDLENBQVIsQ0FBRixHQUFhNE0sQ0FBQyxDQUFDLElBQUQsRUFBTSxJQUFOLEVBQVc3TSxDQUFYLENBQWYsRUFBNkIsS0FBS2lOLFFBQUwsRUFBN0IsRUFBNkMsSUFBcEQ7QUFBeUQ7O0FBQUFsTCxJQUFBQSxHQUFHLENBQUM3QixDQUFELEVBQUc7QUFBQyxVQUFJRixDQUFKLEVBQU1DLENBQU47QUFBUSxhQUFPRCxDQUFDLEdBQUMsSUFBRixFQUFPQyxDQUFDLEdBQUNDLENBQVQsRUFBV0YsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFDLENBQUMsQ0FBRCxDQUFOLEdBQVVELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBaEIsR0FBb0JELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBMUIsR0FBOEJELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBdEQ7QUFBMEQ7O0FBQUF3TixJQUFBQSxXQUFXLENBQUN6TixDQUFELEVBQUc7QUFBQyxhQUFPLFVBQVNHLENBQVQsRUFBV0gsQ0FBWCxFQUFhO0FBQUMsWUFBSUMsQ0FBSjtBQUFBLFlBQU1hLENBQUMsR0FBQ2QsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQSxDQUFDLENBQUMsQ0FBRCxDQUFOLEdBQVVBLENBQUMsQ0FBQyxDQUFELENBQW5CO0FBQXVCLFlBQUdjLENBQUMsR0FBQyxDQUFMLEVBQU9iLENBQUMsR0FBQ3BCLElBQUksQ0FBQ3VCLElBQUwsQ0FBVVUsQ0FBQyxHQUFDLENBQVosQ0FBRixFQUFpQlgsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLEtBQUdGLENBQXpCLEVBQTJCQSxDQUFDLEdBQUMsS0FBR0EsQ0FBaEMsRUFBa0NFLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDSCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtBLENBQUMsQ0FBQyxDQUFELENBQVAsSUFBWUMsQ0FBbkQsRUFBcURFLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDSCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtBLENBQUMsQ0FBQyxDQUFELENBQVAsSUFBWUMsQ0FBdEUsRUFBd0VFLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDSCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtBLENBQUMsQ0FBQyxDQUFELENBQVAsSUFBWUMsQ0FBekYsQ0FBUCxLQUFzRztBQUFDLGNBQUlDLENBQUMsR0FBQyxDQUFOO0FBQVFGLFVBQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0EsQ0FBQyxDQUFDLENBQUQsQ0FBTixLQUFZRSxDQUFDLEdBQUMsQ0FBZCxHQUFpQkYsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQSxDQUFDLENBQUMsSUFBRUUsQ0FBRixHQUFJQSxDQUFMLENBQU4sS0FBZ0JBLENBQUMsR0FBQyxDQUFsQixDQUFqQjtBQUFzQyxjQUFJdEMsQ0FBQyxHQUFDLENBQUNzQyxDQUFDLEdBQUMsQ0FBSCxJQUFNLENBQVo7QUFBQSxjQUFjTSxDQUFDLEdBQUMsQ0FBQ04sQ0FBQyxHQUFDLENBQUgsSUFBTSxDQUF0QjtBQUF3QkQsVUFBQUEsQ0FBQyxHQUFDcEIsSUFBSSxDQUFDdUIsSUFBTCxDQUFVSixDQUFDLENBQUMsSUFBRUUsQ0FBRixHQUFJQSxDQUFMLENBQUQsR0FBU0YsQ0FBQyxDQUFDLElBQUVwQyxDQUFGLEdBQUlBLENBQUwsQ0FBVixHQUFrQm9DLENBQUMsQ0FBQyxJQUFFUSxDQUFGLEdBQUlBLENBQUwsQ0FBbkIsR0FBMkIsQ0FBckMsQ0FBRixFQUEwQ0wsQ0FBQyxDQUFDRCxDQUFELENBQUQsR0FBSyxLQUFHRCxDQUFsRCxFQUFvREEsQ0FBQyxHQUFDLEtBQUdBLENBQXpELEVBQTJERSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQ0gsQ0FBQyxDQUFDLElBQUVwQyxDQUFGLEdBQUk0QyxDQUFMLENBQUQsR0FBU1IsQ0FBQyxDQUFDLElBQUVRLENBQUYsR0FBSTVDLENBQUwsQ0FBWCxJQUFvQnFDLENBQXBGLEVBQXNGRSxDQUFDLENBQUN2QyxDQUFELENBQUQsR0FBSyxDQUFDb0MsQ0FBQyxDQUFDLElBQUVwQyxDQUFGLEdBQUlzQyxDQUFMLENBQUQsR0FBU0YsQ0FBQyxDQUFDLElBQUVFLENBQUYsR0FBSXRDLENBQUwsQ0FBWCxJQUFvQnFDLENBQS9HLEVBQWlIRSxDQUFDLENBQUNLLENBQUQsQ0FBRCxHQUFLLENBQUNSLENBQUMsQ0FBQyxJQUFFUSxDQUFGLEdBQUlOLENBQUwsQ0FBRCxHQUFTRixDQUFDLENBQUMsSUFBRUUsQ0FBRixHQUFJTSxDQUFMLENBQVgsSUFBb0JQLENBQTFJO0FBQTRJO0FBQUMsT0FBL1YsQ0FBZ1csSUFBaFcsRUFBcVdELENBQXJXLEdBQXdXLEtBQUtpTixRQUFMLEVBQXhXLEVBQXdYLElBQS9YO0FBQW9ZOztBQUFBUyxJQUFBQSxTQUFTLENBQUMxTixDQUFELEVBQUc7QUFBQyxhQUFPLFVBQVNBLENBQVQsRUFBV3dCLENBQVgsRUFBYUMsQ0FBQyxHQUFDLEtBQWYsRUFBcUI7QUFBQyxZQUFJeEIsQ0FBQyxHQUFDcEIsSUFBSSxDQUFDdU8sR0FBTCxDQUFTLEtBQUc1TCxDQUFDLENBQUMsQ0FBRCxDQUFiLENBQU47QUFBQSxZQUF3QnRCLENBQUMsR0FBQ3JCLElBQUksQ0FBQ3dPLEdBQUwsQ0FBUyxLQUFHN0wsQ0FBQyxDQUFDLENBQUQsQ0FBYixDQUExQjtBQUFBLFlBQTRDckIsQ0FBQyxHQUFDdEIsSUFBSSxDQUFDdU8sR0FBTCxDQUFTLEtBQUc1TCxDQUFDLENBQUMsQ0FBRCxDQUFiLENBQTlDO0FBQUEsWUFBZ0U1RCxDQUFDLEdBQUNpQixJQUFJLENBQUN3TyxHQUFMLENBQVMsS0FBRzdMLENBQUMsQ0FBQyxDQUFELENBQWIsQ0FBbEU7QUFBQSxZQUFvRmhCLENBQUMsR0FBQzNCLElBQUksQ0FBQ3VPLEdBQUwsQ0FBUyxLQUFHNUwsQ0FBQyxDQUFDLENBQUQsQ0FBYixDQUF0RjtBQUFBLFlBQXdHVixDQUFDLEdBQUNqQyxJQUFJLENBQUN3TyxHQUFMLENBQVMsS0FBRzdMLENBQUMsQ0FBQyxDQUFELENBQWIsQ0FBMUc7QUFBNEgsa0JBQVFDLENBQVIsSUFBV3pCLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxHQUFDckMsQ0FBRixHQUFJa0QsQ0FBSixHQUFNWixDQUFDLEdBQUNDLENBQUYsR0FBSUssQ0FBZixFQUFpQlIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRSxDQUFDLEdBQUNDLENBQUYsR0FBSVcsQ0FBSixHQUFNYixDQUFDLEdBQUNyQyxDQUFGLEdBQUk0QyxDQUFoQyxFQUFrQ1IsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRSxDQUFDLEdBQUN0QyxDQUFGLEdBQUk0QyxDQUFKLEdBQU1QLENBQUMsR0FBQ0UsQ0FBRixHQUFJVyxDQUFqRCxFQUFtRGQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRSxDQUFDLEdBQUN0QyxDQUFGLEdBQUlrRCxDQUFKLEdBQU1iLENBQUMsR0FBQ0UsQ0FBRixHQUFJSyxDQUE3RSxJQUFnRixVQUFRaUIsQ0FBUixJQUFXekIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFDLEdBQUNyQyxDQUFGLEdBQUlrRCxDQUFKLEdBQU1aLENBQUMsR0FBQ0MsQ0FBRixHQUFJSyxDQUFmLEVBQWlCUixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtFLENBQUMsR0FBQ0MsQ0FBRixHQUFJVyxDQUFKLEdBQU1iLENBQUMsR0FBQ3JDLENBQUYsR0FBSTRDLENBQWhDLEVBQWtDUixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtFLENBQUMsR0FBQ3RDLENBQUYsR0FBSTRDLENBQUosR0FBTVAsQ0FBQyxHQUFDRSxDQUFGLEdBQUlXLENBQWpELEVBQW1EZCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtFLENBQUMsR0FBQ3RDLENBQUYsR0FBSWtELENBQUosR0FBTWIsQ0FBQyxHQUFDRSxDQUFGLEdBQUlLLENBQTdFLElBQWdGLFVBQVFpQixDQUFSLElBQVd6QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUMsR0FBQ3JDLENBQUYsR0FBSWtELENBQUosR0FBTVosQ0FBQyxHQUFDQyxDQUFGLEdBQUlLLENBQWYsRUFBaUJSLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0UsQ0FBQyxHQUFDQyxDQUFGLEdBQUlXLENBQUosR0FBTWIsQ0FBQyxHQUFDckMsQ0FBRixHQUFJNEMsQ0FBaEMsRUFBa0NSLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0UsQ0FBQyxHQUFDdEMsQ0FBRixHQUFJNEMsQ0FBSixHQUFNUCxDQUFDLEdBQUNFLENBQUYsR0FBSVcsQ0FBakQsRUFBbURkLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0UsQ0FBQyxHQUFDdEMsQ0FBRixHQUFJa0QsQ0FBSixHQUFNYixDQUFDLEdBQUNFLENBQUYsR0FBSUssQ0FBN0UsSUFBZ0YsVUFBUWlCLENBQVIsSUFBV3pCLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxHQUFDckMsQ0FBRixHQUFJa0QsQ0FBSixHQUFNWixDQUFDLEdBQUNDLENBQUYsR0FBSUssQ0FBZixFQUFpQlIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRSxDQUFDLEdBQUNDLENBQUYsR0FBSVcsQ0FBSixHQUFNYixDQUFDLEdBQUNyQyxDQUFGLEdBQUk0QyxDQUFoQyxFQUFrQ1IsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRSxDQUFDLEdBQUN0QyxDQUFGLEdBQUk0QyxDQUFKLEdBQU1QLENBQUMsR0FBQ0UsQ0FBRixHQUFJVyxDQUFqRCxFQUFtRGQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRSxDQUFDLEdBQUN0QyxDQUFGLEdBQUlrRCxDQUFKLEdBQU1iLENBQUMsR0FBQ0UsQ0FBRixHQUFJSyxDQUE3RSxJQUFnRixVQUFRaUIsQ0FBUixJQUFXekIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFDLEdBQUNyQyxDQUFGLEdBQUlrRCxDQUFKLEdBQU1aLENBQUMsR0FBQ0MsQ0FBRixHQUFJSyxDQUFmLEVBQWlCUixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtFLENBQUMsR0FBQ0MsQ0FBRixHQUFJVyxDQUFKLEdBQU1iLENBQUMsR0FBQ3JDLENBQUYsR0FBSTRDLENBQWhDLEVBQWtDUixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtFLENBQUMsR0FBQ3RDLENBQUYsR0FBSTRDLENBQUosR0FBTVAsQ0FBQyxHQUFDRSxDQUFGLEdBQUlXLENBQWpELEVBQW1EZCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtFLENBQUMsR0FBQ3RDLENBQUYsR0FBSWtELENBQUosR0FBTWIsQ0FBQyxHQUFDRSxDQUFGLEdBQUlLLENBQTdFLElBQWdGLFVBQVFpQixDQUFSLEtBQVl6QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUMsR0FBQ3JDLENBQUYsR0FBSWtELENBQUosR0FBTVosQ0FBQyxHQUFDQyxDQUFGLEdBQUlLLENBQWYsRUFBaUJSLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0UsQ0FBQyxHQUFDQyxDQUFGLEdBQUlXLENBQUosR0FBTWIsQ0FBQyxHQUFDckMsQ0FBRixHQUFJNEMsQ0FBaEMsRUFBa0NSLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0UsQ0FBQyxHQUFDdEMsQ0FBRixHQUFJNEMsQ0FBSixHQUFNUCxDQUFDLEdBQUNFLENBQUYsR0FBSVcsQ0FBakQsRUFBbURkLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0UsQ0FBQyxHQUFDdEMsQ0FBRixHQUFJa0QsQ0FBSixHQUFNYixDQUFDLEdBQUNFLENBQUYsR0FBSUssQ0FBOUUsQ0FBaFo7QUFBaWUsT0FBbm5CLENBQW9uQixJQUFwbkIsRUFBeW5CUixDQUF6bkIsRUFBMm5CQSxDQUFDLENBQUMyTixLQUE3bkIsR0FBb29CLElBQTNvQjtBQUFncEI7O0FBQUFDLElBQUFBLGFBQWEsQ0FBQ2hRLENBQUQsRUFBRzRDLENBQUgsRUFBSztBQUFDLFVBQUlSLENBQUosRUFBTUMsQ0FBTixFQUFRRSxDQUFSO0FBQVUsVUFBSUQsQ0FBSjtBQUFNLGFBQU9GLENBQUMsR0FBQyxJQUFGLEVBQU9DLENBQUMsR0FBQ3JDLENBQVQsRUFBV3VDLENBQUMsR0FBQ0ssQ0FBYixFQUFlTixDQUFDLEdBQUNyQixJQUFJLENBQUN1TyxHQUFMLENBQVNqTixDQUFDLElBQUUsRUFBWixDQUFqQixFQUFpQ0gsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRSxDQUFDLEdBQUNELENBQUMsQ0FBQyxDQUFELENBQXpDLEVBQTZDRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtFLENBQUMsR0FBQ0QsQ0FBQyxDQUFDLENBQUQsQ0FBckQsRUFBeURELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0UsQ0FBQyxHQUFDRCxDQUFDLENBQUMsQ0FBRCxDQUFqRSxFQUFxRUQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLbkIsSUFBSSxDQUFDd08sR0FBTCxDQUFTbE4sQ0FBVCxDQUExRSxFQUFzRixJQUE3RjtBQUFrRzs7QUFBQTBOLElBQUFBLEtBQUssQ0FBQ3RHLENBQUQsRUFBR0UsQ0FBSCxFQUFLO0FBQUMsVUFBSXZILENBQUosRUFBTUMsQ0FBTixFQUFRdkMsQ0FBUixFQUFVNEMsQ0FBVjtBQUFZLFVBQUk0QixDQUFKLEVBQU10QixDQUFOLEVBQVEwQixDQUFSLEVBQVV4QyxDQUFWLEVBQVlDLENBQVosRUFBY29DLENBQWQsRUFBZ0JDLENBQWhCLEVBQWtCQyxDQUFsQixFQUFvQkosQ0FBcEIsRUFBc0JYLENBQXRCLEVBQXdCQyxDQUF4QixFQUEwQkYsQ0FBMUIsRUFBNEJLLENBQTVCO0FBQThCLGFBQU8xQixDQUFDLEdBQUMsSUFBRixFQUFPQyxDQUFDLEdBQUMsSUFBVCxFQUFjdkMsQ0FBQyxHQUFDMkosQ0FBaEIsRUFBa0IvRyxDQUFDLEdBQUNpSCxDQUFwQixFQUFzQnBGLENBQUMsR0FBQ2xDLENBQUMsQ0FBQyxDQUFELENBQXpCLEVBQTZCbUMsQ0FBQyxHQUFDbkMsQ0FBQyxDQUFDLENBQUQsQ0FBaEMsRUFBb0NvQyxDQUFDLEdBQUNwQyxDQUFDLENBQUMsQ0FBRCxDQUF2QyxFQUEyQ2dDLENBQUMsR0FBQ2hDLENBQUMsQ0FBQyxDQUFELENBQTlDLEVBQWtEcUIsQ0FBQyxHQUFDNUQsQ0FBQyxDQUFDLENBQUQsQ0FBckQsRUFBeUQ2RCxDQUFDLEdBQUM3RCxDQUFDLENBQUMsQ0FBRCxDQUE1RCxFQUFnRTJELENBQUMsR0FBQzNELENBQUMsQ0FBQyxDQUFELENBQW5FLEVBQXVFZ0UsQ0FBQyxHQUFDaEUsQ0FBQyxDQUFDLENBQUQsQ0FBMUUsRUFBOEUsQ0FBQ2tELENBQUMsR0FBQ3VCLENBQUMsR0FBQ2IsQ0FBRixHQUFJYyxDQUFDLEdBQUNiLENBQU4sR0FBUWMsQ0FBQyxHQUFDaEIsQ0FBVixHQUFZWSxDQUFDLEdBQUNQLENBQWpCLElBQW9CLENBQXBCLEtBQXdCZCxDQUFDLEdBQUMsQ0FBQ0EsQ0FBSCxFQUFLVSxDQUFDLEdBQUMsQ0FBQ0EsQ0FBUixFQUFVQyxDQUFDLEdBQUMsQ0FBQ0EsQ0FBYixFQUFlRixDQUFDLEdBQUMsQ0FBQ0EsQ0FBbEIsRUFBb0JLLENBQUMsR0FBQyxDQUFDQSxDQUEvQyxDQUE5RSxFQUFnSSxJQUFFZCxDQUFGLEdBQUksSUFBSixJQUFVc0IsQ0FBQyxHQUFDdkQsSUFBSSxDQUFDK0IsSUFBTCxDQUFVRSxDQUFWLENBQUYsRUFBZTBCLENBQUMsR0FBQzNELElBQUksQ0FBQ3VPLEdBQUwsQ0FBU2hMLENBQVQsQ0FBakIsRUFBNkJwQyxDQUFDLEdBQUNuQixJQUFJLENBQUN1TyxHQUFMLENBQVMsQ0FBQyxJQUFFNU0sQ0FBSCxJQUFNNEIsQ0FBZixJQUFrQkksQ0FBakQsRUFBbUR2QyxDQUFDLEdBQUNwQixJQUFJLENBQUN1TyxHQUFMLENBQVM1TSxDQUFDLEdBQUM0QixDQUFYLElBQWNJLENBQTdFLEtBQWlGeEMsQ0FBQyxHQUFDLElBQUVRLENBQUosRUFBTVAsQ0FBQyxHQUFDTyxDQUF6RixDQUFoSSxFQUE0Tk4sQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRixDQUFDLEdBQUNxQyxDQUFGLEdBQUlwQyxDQUFDLEdBQUN1QixDQUF2TyxFQUF5T3RCLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0YsQ0FBQyxHQUFDc0MsQ0FBRixHQUFJckMsQ0FBQyxHQUFDd0IsQ0FBcFAsRUFBc1B2QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtGLENBQUMsR0FBQ3VDLENBQUYsR0FBSXRDLENBQUMsR0FBQ3NCLENBQWpRLEVBQW1RckIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRixDQUFDLEdBQUNtQyxDQUFGLEdBQUlsQyxDQUFDLEdBQUMyQixDQUE5USxFQUFnUixJQUF2UjtBQUE0Ujs7QUFBQWUsSUFBQUEsU0FBUyxDQUFDM0MsQ0FBRCxFQUFHQyxDQUFDLEdBQUMsQ0FBTCxFQUFPO0FBQUMsYUFBTyxLQUFLLENBQUwsSUFBUUQsQ0FBQyxDQUFDQyxDQUFELENBQVQsRUFBYSxLQUFLLENBQUwsSUFBUUQsQ0FBQyxDQUFDQyxDQUFDLEdBQUMsQ0FBSCxDQUF0QixFQUE0QixLQUFLLENBQUwsSUFBUUQsQ0FBQyxDQUFDQyxDQUFDLEdBQUMsQ0FBSCxDQUFyQyxFQUEyQyxLQUFLLENBQUwsSUFBUUQsQ0FBQyxDQUFDQyxDQUFDLEdBQUMsQ0FBSCxDQUFwRCxFQUEwRCxJQUFqRTtBQUFzRTs7QUFBQTJDLElBQUFBLE9BQU8sQ0FBQzVDLENBQUMsR0FBQyxFQUFILEVBQU1DLENBQUMsR0FBQyxDQUFSLEVBQVU7QUFBQyxhQUFPRCxDQUFDLENBQUNDLENBQUQsQ0FBRCxHQUFLLEtBQUssQ0FBTCxDQUFMLEVBQWFELENBQUMsQ0FBQ0MsQ0FBQyxHQUFDLENBQUgsQ0FBRCxHQUFPLEtBQUssQ0FBTCxDQUFwQixFQUE0QkQsQ0FBQyxDQUFDQyxDQUFDLEdBQUMsQ0FBSCxDQUFELEdBQU8sS0FBSyxDQUFMLENBQW5DLEVBQTJDRCxDQUFDLENBQUNDLENBQUMsR0FBQyxDQUFILENBQUQsR0FBTyxLQUFLLENBQUwsQ0FBbEQsRUFBMERELENBQWpFO0FBQW1FOztBQUF2dUc7O0FBQXd1RyxXQUFTOE4sQ0FBVCxDQUFXbFEsQ0FBWCxFQUFhNEMsQ0FBYixFQUFlTSxDQUFmLEVBQWlCO0FBQUMsUUFBSVUsQ0FBQyxHQUFDaEIsQ0FBQyxDQUFDLENBQUQsQ0FBUDtBQUFBLFFBQVdpQixDQUFDLEdBQUNqQixDQUFDLENBQUMsQ0FBRCxDQUFkO0FBQUEsUUFBa0JlLENBQUMsR0FBQ2YsQ0FBQyxDQUFDLENBQUQsQ0FBckI7QUFBQSxRQUF5Qm9CLENBQUMsR0FBQ3BCLENBQUMsQ0FBQyxDQUFELENBQTVCO0FBQUEsUUFBZ0M0QixDQUFDLEdBQUM1QixDQUFDLENBQUMsQ0FBRCxDQUFuQztBQUFBLFFBQXVDZ0MsQ0FBQyxHQUFDaEMsQ0FBQyxDQUFDLENBQUQsQ0FBMUM7QUFBQSxRQUE4QzZCLENBQUMsR0FBQzdCLENBQUMsQ0FBQyxDQUFELENBQWpEO0FBQUEsUUFBcUQ4QixDQUFDLEdBQUM5QixDQUFDLENBQUMsQ0FBRCxDQUF4RDtBQUFBLFFBQTREK0IsQ0FBQyxHQUFDL0IsQ0FBQyxDQUFDLENBQUQsQ0FBL0Q7QUFBQSxRQUFtRTJCLENBQUMsR0FBQzNCLENBQUMsQ0FBQyxDQUFELENBQXRFO0FBQUEsUUFBMEUrRyxDQUFDLEdBQUMvRyxDQUFDLENBQUMsRUFBRCxDQUE3RTtBQUFBLFFBQWtGaUgsQ0FBQyxHQUFDakgsQ0FBQyxDQUFDLEVBQUQsQ0FBckY7QUFBQSxRQUEwRnZCLENBQUMsR0FBQ3VCLENBQUMsQ0FBQyxFQUFELENBQTdGO0FBQUEsUUFBa0dILENBQUMsR0FBQ0csQ0FBQyxDQUFDLEVBQUQsQ0FBckc7QUFBQSxRQUEwR0YsQ0FBQyxHQUFDRSxDQUFDLENBQUMsRUFBRCxDQUE3RztBQUFBLFFBQWtIRCxDQUFDLEdBQUNDLENBQUMsQ0FBQyxFQUFELENBQXJIO0FBQUEsUUFBMEhSLENBQUMsR0FBQ2MsQ0FBQyxDQUFDLENBQUQsQ0FBN0g7QUFBQSxRQUFpSWIsQ0FBQyxHQUFDYSxDQUFDLENBQUMsQ0FBRCxDQUFwSTtBQUFBLFFBQXdJWixDQUFDLEdBQUNZLENBQUMsQ0FBQyxDQUFELENBQTNJO0FBQUEsUUFBK0lYLENBQUMsR0FBQ1csQ0FBQyxDQUFDLENBQUQsQ0FBbEo7QUFBc0osV0FBT2xELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS29DLENBQUMsR0FBQ3dCLENBQUYsR0FBSXZCLENBQUMsR0FBQ21DLENBQU4sR0FBUWxDLENBQUMsR0FBQ3FDLENBQVYsR0FBWXBDLENBQUMsR0FBQ2xCLENBQW5CLEVBQXFCckIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLb0MsQ0FBQyxHQUFDeUIsQ0FBRixHQUFJeEIsQ0FBQyxHQUFDdUMsQ0FBTixHQUFRdEMsQ0FBQyxHQUFDaUMsQ0FBVixHQUFZaEMsQ0FBQyxHQUFDRSxDQUF4QyxFQUEwQ3pDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS29DLENBQUMsR0FBQ3VCLENBQUYsR0FBSXRCLENBQUMsR0FBQ29DLENBQU4sR0FBUW5DLENBQUMsR0FBQ3FILENBQVYsR0FBWXBILENBQUMsR0FBQ0csQ0FBN0QsRUFBK0QxQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtvQyxDQUFDLEdBQUM0QixDQUFGLEdBQUkzQixDQUFDLEdBQUNxQyxDQUFOLEdBQVFwQyxDQUFDLEdBQUN1SCxDQUFWLEdBQVl0SCxDQUFDLEdBQUNJLENBQWxGLEVBQW9GUCxDQUFDLEdBQUNjLENBQUMsQ0FBQyxDQUFELENBQXZGLEVBQTJGYixDQUFDLEdBQUNhLENBQUMsQ0FBQyxDQUFELENBQTlGLEVBQWtHWixDQUFDLEdBQUNZLENBQUMsQ0FBQyxDQUFELENBQXJHLEVBQXlHWCxDQUFDLEdBQUNXLENBQUMsQ0FBQyxDQUFELENBQTVHLEVBQWdIbEQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLb0MsQ0FBQyxHQUFDd0IsQ0FBRixHQUFJdkIsQ0FBQyxHQUFDbUMsQ0FBTixHQUFRbEMsQ0FBQyxHQUFDcUMsQ0FBVixHQUFZcEMsQ0FBQyxHQUFDbEIsQ0FBbkksRUFBcUlyQixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtvQyxDQUFDLEdBQUN5QixDQUFGLEdBQUl4QixDQUFDLEdBQUN1QyxDQUFOLEdBQVF0QyxDQUFDLEdBQUNpQyxDQUFWLEdBQVloQyxDQUFDLEdBQUNFLENBQXhKLEVBQTBKekMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLb0MsQ0FBQyxHQUFDdUIsQ0FBRixHQUFJdEIsQ0FBQyxHQUFDb0MsQ0FBTixHQUFRbkMsQ0FBQyxHQUFDcUgsQ0FBVixHQUFZcEgsQ0FBQyxHQUFDRyxDQUE3SyxFQUErSzFDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS29DLENBQUMsR0FBQzRCLENBQUYsR0FBSTNCLENBQUMsR0FBQ3FDLENBQU4sR0FBUXBDLENBQUMsR0FBQ3VILENBQVYsR0FBWXRILENBQUMsR0FBQ0ksQ0FBbE0sRUFBb01QLENBQUMsR0FBQ2MsQ0FBQyxDQUFDLENBQUQsQ0FBdk0sRUFBMk1iLENBQUMsR0FBQ2EsQ0FBQyxDQUFDLENBQUQsQ0FBOU0sRUFBa05aLENBQUMsR0FBQ1ksQ0FBQyxDQUFDLEVBQUQsQ0FBck4sRUFBME5YLENBQUMsR0FBQ1csQ0FBQyxDQUFDLEVBQUQsQ0FBN04sRUFBa09sRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtvQyxDQUFDLEdBQUN3QixDQUFGLEdBQUl2QixDQUFDLEdBQUNtQyxDQUFOLEdBQVFsQyxDQUFDLEdBQUNxQyxDQUFWLEdBQVlwQyxDQUFDLEdBQUNsQixDQUFyUCxFQUF1UHJCLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS29DLENBQUMsR0FBQ3lCLENBQUYsR0FBSXhCLENBQUMsR0FBQ3VDLENBQU4sR0FBUXRDLENBQUMsR0FBQ2lDLENBQVYsR0FBWWhDLENBQUMsR0FBQ0UsQ0FBMVEsRUFBNFF6QyxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU1vQyxDQUFDLEdBQUN1QixDQUFGLEdBQUl0QixDQUFDLEdBQUNvQyxDQUFOLEdBQVFuQyxDQUFDLEdBQUNxSCxDQUFWLEdBQVlwSCxDQUFDLEdBQUNHLENBQWhTLEVBQWtTMUMsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNb0MsQ0FBQyxHQUFDNEIsQ0FBRixHQUFJM0IsQ0FBQyxHQUFDcUMsQ0FBTixHQUFRcEMsQ0FBQyxHQUFDdUgsQ0FBVixHQUFZdEgsQ0FBQyxHQUFDSSxDQUF0VCxFQUF3VFAsQ0FBQyxHQUFDYyxDQUFDLENBQUMsRUFBRCxDQUEzVCxFQUFnVWIsQ0FBQyxHQUFDYSxDQUFDLENBQUMsRUFBRCxDQUFuVSxFQUF3VVosQ0FBQyxHQUFDWSxDQUFDLENBQUMsRUFBRCxDQUEzVSxFQUFnVlgsQ0FBQyxHQUFDVyxDQUFDLENBQUMsRUFBRCxDQUFuVixFQUF3VmxELENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTW9DLENBQUMsR0FBQ3dCLENBQUYsR0FBSXZCLENBQUMsR0FBQ21DLENBQU4sR0FBUWxDLENBQUMsR0FBQ3FDLENBQVYsR0FBWXBDLENBQUMsR0FBQ2xCLENBQTVXLEVBQThXckIsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNb0MsQ0FBQyxHQUFDeUIsQ0FBRixHQUFJeEIsQ0FBQyxHQUFDdUMsQ0FBTixHQUFRdEMsQ0FBQyxHQUFDaUMsQ0FBVixHQUFZaEMsQ0FBQyxHQUFDRSxDQUFsWSxFQUFvWXpDLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTW9DLENBQUMsR0FBQ3VCLENBQUYsR0FBSXRCLENBQUMsR0FBQ29DLENBQU4sR0FBUW5DLENBQUMsR0FBQ3FILENBQVYsR0FBWXBILENBQUMsR0FBQ0csQ0FBeFosRUFBMFoxQyxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU1vQyxDQUFDLEdBQUM0QixDQUFGLEdBQUkzQixDQUFDLEdBQUNxQyxDQUFOLEdBQVFwQyxDQUFDLEdBQUN1SCxDQUFWLEdBQVl0SCxDQUFDLEdBQUNJLENBQTlhLEVBQWdiM0MsQ0FBdmI7QUFBeWI7O0FBQUEsUUFBTXNDLENBQU4sU0FBZ0JXLEtBQWhCLENBQXFCO0FBQUN0SCxJQUFBQSxXQUFXLENBQUN5RyxDQUFDLEdBQUMsQ0FBSCxFQUFLQyxDQUFDLEdBQUMsQ0FBUCxFQUFTQyxDQUFDLEdBQUMsQ0FBWCxFQUFhQyxDQUFDLEdBQUMsQ0FBZixFQUFpQnZDLENBQUMsR0FBQyxDQUFuQixFQUFxQjRDLENBQUMsR0FBQyxDQUF2QixFQUF5Qk0sQ0FBQyxHQUFDLENBQTNCLEVBQTZCVSxDQUFDLEdBQUMsQ0FBL0IsRUFBaUNDLENBQUMsR0FBQyxDQUFuQyxFQUFxQ0YsQ0FBQyxHQUFDLENBQXZDLEVBQXlDSyxDQUFDLEdBQUMsQ0FBM0MsRUFBNkNRLENBQUMsR0FBQyxDQUEvQyxFQUFpREksQ0FBQyxHQUFDLENBQW5ELEVBQXFESCxDQUFDLEdBQUMsQ0FBdkQsRUFBeURDLENBQUMsR0FBQyxDQUEzRCxFQUE2REMsQ0FBQyxHQUFDLENBQS9ELEVBQWlFO0FBQUMsYUFBTyxNQUFNdkMsQ0FBTixFQUFRQyxDQUFSLEVBQVVDLENBQVYsRUFBWUMsQ0FBWixFQUFjdkMsQ0FBZCxFQUFnQjRDLENBQWhCLEVBQWtCTSxDQUFsQixFQUFvQlUsQ0FBcEIsRUFBc0JDLENBQXRCLEVBQXdCRixDQUF4QixFQUEwQkssQ0FBMUIsRUFBNEJRLENBQTVCLEVBQThCSSxDQUE5QixFQUFnQ0gsQ0FBaEMsRUFBa0NDLENBQWxDLEVBQW9DQyxDQUFwQyxHQUF1QyxJQUE5QztBQUFtRDs7QUFBSyxRQUFEdkUsQ0FBQyxDQUFDZ0MsQ0FBRCxFQUFHO0FBQUMsV0FBSyxFQUFMLElBQVNBLENBQVQ7QUFBVzs7QUFBSyxRQUFEaEMsQ0FBQyxHQUFFO0FBQUMsYUFBTyxLQUFLLEVBQUwsQ0FBUDtBQUFnQjs7QUFBSyxRQUFERSxDQUFDLENBQUM4QixDQUFELEVBQUc7QUFBQyxXQUFLLEVBQUwsSUFBU0EsQ0FBVDtBQUFXOztBQUFLLFFBQUQ5QixDQUFDLEdBQUU7QUFBQyxhQUFPLEtBQUssRUFBTCxDQUFQO0FBQWdCOztBQUFLLFFBQUR1QyxDQUFDLENBQUNULENBQUQsRUFBRztBQUFDLFdBQUssRUFBTCxJQUFTQSxDQUFUO0FBQVc7O0FBQUssUUFBRFMsQ0FBQyxHQUFFO0FBQUMsYUFBTyxLQUFLLEVBQUwsQ0FBUDtBQUFnQjs7QUFBSyxRQUFERixDQUFDLENBQUNQLENBQUQsRUFBRztBQUFDLFdBQUssRUFBTCxJQUFTQSxDQUFUO0FBQVc7O0FBQUssUUFBRE8sQ0FBQyxHQUFFO0FBQUMsYUFBTyxLQUFLLEVBQUwsQ0FBUDtBQUFnQjs7QUFBQW5DLElBQUFBLEdBQUcsQ0FBQzZCLENBQUQsRUFBR3dILENBQUgsRUFBS3hJLENBQUwsRUFBT29CLENBQVAsRUFBU0MsQ0FBVCxFQUFXQyxDQUFYLEVBQWF2QyxDQUFiLEVBQWVFLENBQWYsRUFBaUJ1QyxDQUFqQixFQUFtQkMsQ0FBbkIsRUFBcUJvQyxDQUFyQixFQUF1QkMsQ0FBdkIsRUFBeUJDLENBQXpCLEVBQTJCOEQsQ0FBM0IsRUFBNkJDLENBQTdCLEVBQStCd0UsQ0FBL0IsRUFBaUM7QUFBQyxVQUFJdkwsQ0FBSixFQUFNRSxDQUFOLEVBQVFDLENBQVIsRUFBVXZDLENBQVYsRUFBWTRDLENBQVosRUFBY00sQ0FBZCxFQUFnQlUsQ0FBaEIsRUFBa0JDLENBQWxCLEVBQW9CRixDQUFwQixFQUFzQkssQ0FBdEIsRUFBd0JRLENBQXhCLEVBQTBCSSxDQUExQixFQUE0QkgsQ0FBNUIsRUFBOEJDLENBQTlCLEVBQWdDQyxDQUFoQyxFQUFrQ0osQ0FBbEMsRUFBb0NvRixDQUFwQztBQUFzQyxhQUFPdEgsQ0FBQyxDQUFDbEMsTUFBRixHQUFTLEtBQUtvQixJQUFMLENBQVVjLENBQVYsQ0FBVCxJQUF1QkQsQ0FBQyxHQUFDLElBQUYsRUFBT0UsQ0FBQyxHQUFDRCxDQUFULEVBQVdFLENBQUMsR0FBQ3NILENBQWIsRUFBZTdKLENBQUMsR0FBQ3FCLENBQWpCLEVBQW1CdUIsQ0FBQyxHQUFDSCxDQUFyQixFQUF1QlMsQ0FBQyxHQUFDUixDQUF6QixFQUEyQmtCLENBQUMsR0FBQ2pCLENBQTdCLEVBQStCa0IsQ0FBQyxHQUFDekQsQ0FBakMsRUFBbUN1RCxDQUFDLEdBQUNyRCxDQUFyQyxFQUF1QzBELENBQUMsR0FBQ25CLENBQXpDLEVBQTJDMkIsQ0FBQyxHQUFDMUIsQ0FBN0MsRUFBK0M4QixDQUFDLEdBQUNNLENBQWpELEVBQW1EVCxDQUFDLEdBQUNVLENBQXJELEVBQXVEVCxDQUFDLEdBQUNVLENBQXpELEVBQTJEVCxDQUFDLEdBQUN1RSxDQUE3RCxFQUErRDNFLENBQUMsR0FBQzRFLENBQWpFLEVBQW1FUSxDQUFDLEdBQUNnRSxDQUFyRSxFQUF1RXZMLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0UsQ0FBNUUsRUFBOEVGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0csQ0FBbkYsRUFBcUZILENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3BDLENBQTFGLEVBQTRGb0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLUSxDQUFqRyxFQUFtR1IsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLYyxDQUF4RyxFQUEwR2QsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLd0IsQ0FBL0csRUFBaUh4QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUt5QixDQUF0SCxFQUF3SHpCLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3VCLENBQTdILEVBQStIdkIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLNEIsQ0FBcEksRUFBc0k1QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtvQyxDQUEzSSxFQUE2SXBDLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTXdDLENBQW5KLEVBQXFKeEMsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNcUMsQ0FBM0osRUFBNkpyQyxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU1zQyxDQUFuSyxFQUFxS3RDLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTXVDLENBQTNLLEVBQTZLdkMsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNbUMsQ0FBbkwsRUFBcUxuQyxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU11SCxDQUEzTCxFQUE2TCxJQUFwTixDQUFQO0FBQWlPOztBQUFBd0csSUFBQUEsU0FBUyxDQUFDdEcsQ0FBRCxFQUFHeEksQ0FBQyxHQUFDLElBQUwsRUFBVTtBQUFDLFVBQUlnQixDQUFKLEVBQU1ELENBQU4sRUFBUVEsQ0FBUjtBQUFVLFVBQUlNLENBQUosRUFBTVUsQ0FBTixFQUFRQyxDQUFSLEVBQVVGLENBQVYsRUFBWUssQ0FBWixFQUFjUSxDQUFkLEVBQWdCSSxDQUFoQixFQUFrQkgsQ0FBbEIsRUFBb0JDLENBQXBCLEVBQXNCQyxDQUF0QixFQUF3QkosQ0FBeEIsRUFBMEJvRixDQUExQixFQUE0QnJILENBQTVCLEVBQThCQyxDQUE5QixFQUFnQ3ZDLENBQWhDO0FBQWtDLGFBQU9xQyxDQUFDLEdBQUMsSUFBRixFQUFPRCxDQUFDLEdBQUNmLENBQVQsRUFBV2lCLENBQUMsR0FBQyxDQUFDTSxDQUFDLEdBQUNpSCxDQUFILEVBQU0sQ0FBTixDQUFiLEVBQXNCdEgsQ0FBQyxHQUFDSyxDQUFDLENBQUMsQ0FBRCxDQUF6QixFQUE2QjVDLENBQUMsR0FBQzRDLENBQUMsQ0FBQyxDQUFELENBQWhDLEVBQW9DUixDQUFDLEtBQUdDLENBQUosSUFBT0EsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtFLENBQUwsR0FBT0YsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRyxDQUFaLEdBQWNILENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3BDLENBQW5CLEdBQXFCb0MsQ0FBQyxDQUFDLEVBQUQsQ0FBNUIsRUFBaUNDLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTUQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRSxDQUFMLEdBQU9GLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0csQ0FBWixHQUFjSCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtwQyxDQUFuQixHQUFxQm9DLENBQUMsQ0FBQyxFQUFELENBQTdELEVBQWtFQyxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU1ELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0UsQ0FBTCxHQUFPRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtHLENBQVosR0FBY0gsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNcEMsQ0FBcEIsR0FBc0JvQyxDQUFDLENBQUMsRUFBRCxDQUEvRixFQUFvR0MsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtFLENBQUwsR0FBT0YsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRyxDQUFaLEdBQWNILENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTXBDLENBQXBCLEdBQXNCb0MsQ0FBQyxDQUFDLEVBQUQsQ0FBeEksS0FBK0ljLENBQUMsR0FBQ2QsQ0FBQyxDQUFDLENBQUQsQ0FBSCxFQUFPd0IsQ0FBQyxHQUFDeEIsQ0FBQyxDQUFDLENBQUQsQ0FBVixFQUFjeUIsQ0FBQyxHQUFDekIsQ0FBQyxDQUFDLENBQUQsQ0FBakIsRUFBcUJ1QixDQUFDLEdBQUN2QixDQUFDLENBQUMsQ0FBRCxDQUF4QixFQUE0QjRCLENBQUMsR0FBQzVCLENBQUMsQ0FBQyxDQUFELENBQS9CLEVBQW1Db0MsQ0FBQyxHQUFDcEMsQ0FBQyxDQUFDLENBQUQsQ0FBdEMsRUFBMEN3QyxDQUFDLEdBQUN4QyxDQUFDLENBQUMsQ0FBRCxDQUE3QyxFQUFpRHFDLENBQUMsR0FBQ3JDLENBQUMsQ0FBQyxDQUFELENBQXBELEVBQXdEc0MsQ0FBQyxHQUFDdEMsQ0FBQyxDQUFDLENBQUQsQ0FBM0QsRUFBK0R1QyxDQUFDLEdBQUN2QyxDQUFDLENBQUMsQ0FBRCxDQUFsRSxFQUFzRW1DLENBQUMsR0FBQ25DLENBQUMsQ0FBQyxFQUFELENBQXpFLEVBQThFdUgsQ0FBQyxHQUFDdkgsQ0FBQyxDQUFDLEVBQUQsQ0FBakYsRUFBc0ZDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS2EsQ0FBM0YsRUFBNkZiLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3VCLENBQWxHLEVBQW9HdkIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLd0IsQ0FBekcsRUFBMkd4QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtzQixDQUFoSCxFQUFrSHRCLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSzJCLENBQXZILEVBQXlIM0IsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLbUMsQ0FBOUgsRUFBZ0luQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUt1QyxDQUFySSxFQUF1SXZDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS29DLENBQTVJLEVBQThJcEMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLcUMsQ0FBbkosRUFBcUpyQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtzQyxDQUExSixFQUE0SnRDLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTWtDLENBQWxLLEVBQW9LbEMsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNc0gsQ0FBMUssRUFBNEt0SCxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU1hLENBQUMsR0FBQ1osQ0FBRixHQUFJMEIsQ0FBQyxHQUFDekIsQ0FBTixHQUFRbUMsQ0FBQyxHQUFDMUUsQ0FBVixHQUFZb0MsQ0FBQyxDQUFDLEVBQUQsQ0FBL0wsRUFBb01DLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTXVCLENBQUMsR0FBQ3RCLENBQUYsR0FBSWtDLENBQUMsR0FBQ2pDLENBQU4sR0FBUW9DLENBQUMsR0FBQzNFLENBQVYsR0FBWW9DLENBQUMsQ0FBQyxFQUFELENBQXZOLEVBQTROQyxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU13QixDQUFDLEdBQUN2QixDQUFGLEdBQUlzQyxDQUFDLEdBQUNyQyxDQUFOLEdBQVFnQyxDQUFDLEdBQUN2RSxDQUFWLEdBQVlvQyxDQUFDLENBQUMsRUFBRCxDQUEvTyxFQUFvUEMsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNc0IsQ0FBQyxHQUFDckIsQ0FBRixHQUFJbUMsQ0FBQyxHQUFDbEMsQ0FBTixHQUFRb0gsQ0FBQyxHQUFDM0osQ0FBVixHQUFZb0MsQ0FBQyxDQUFDLEVBQUQsQ0FBdFosQ0FBcEMsRUFBZ2MsSUFBdmM7QUFBNGM7O0FBQUFtTixJQUFBQSxPQUFPLENBQUM5SyxDQUFELEVBQUdDLENBQUMsR0FBQyxJQUFMLEVBQVU7QUFBQyxVQUFJdEMsQ0FBSixFQUFNQyxDQUFOLEVBQVF1QyxDQUFSO0FBQVUsVUFBSXRDLENBQUosRUFBTUMsQ0FBTixFQUFRdkMsQ0FBUixFQUFVNEMsQ0FBVixFQUFZTSxDQUFaLEVBQWNVLENBQWQsRUFBZ0JDLENBQWhCLEVBQWtCRixDQUFsQixFQUFvQkssQ0FBcEIsRUFBc0JRLENBQXRCO0FBQXdCLGFBQU9wQyxDQUFDLEdBQUMsSUFBRixFQUFPQyxDQUFDLEdBQUNxQyxDQUFULEVBQVdwQyxDQUFDLEdBQUNyQixJQUFJLENBQUN1TyxHQUFMLENBQVM1SyxDQUFDLEdBQUNILENBQVgsQ0FBYixFQUEyQmxDLENBQUMsR0FBQ3RCLElBQUksQ0FBQ3dPLEdBQUwsQ0FBUzdLLENBQVQsQ0FBN0IsRUFBeUM1RSxDQUFDLEdBQUNxQyxDQUFDLENBQUMsQ0FBRCxDQUE1QyxFQUFnRE8sQ0FBQyxHQUFDUCxDQUFDLENBQUMsQ0FBRCxDQUFuRCxFQUF1RGEsQ0FBQyxHQUFDYixDQUFDLENBQUMsQ0FBRCxDQUExRCxFQUE4RHVCLENBQUMsR0FBQ3ZCLENBQUMsQ0FBQyxDQUFELENBQWpFLEVBQXFFd0IsQ0FBQyxHQUFDeEIsQ0FBQyxDQUFDLENBQUQsQ0FBeEUsRUFBNEVzQixDQUFDLEdBQUN0QixDQUFDLENBQUMsQ0FBRCxDQUEvRSxFQUFtRjJCLENBQUMsR0FBQzNCLENBQUMsQ0FBQyxFQUFELENBQXRGLEVBQTJGbUMsQ0FBQyxHQUFDbkMsQ0FBQyxDQUFDLEVBQUQsQ0FBOUYsRUFBbUdBLENBQUMsS0FBR0QsQ0FBSixLQUFRQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUMsQ0FBQyxDQUFELENBQU4sRUFBVUQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFDLENBQUMsQ0FBRCxDQUFoQixFQUFvQkQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFDLENBQUMsQ0FBRCxDQUExQixFQUE4QkQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFDLENBQUMsQ0FBRCxDQUFwQyxFQUF3Q0QsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNQyxDQUFDLENBQUMsRUFBRCxDQUEvQyxFQUFvREQsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNQyxDQUFDLENBQUMsRUFBRCxDQUEzRCxFQUFnRUQsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNQyxDQUFDLENBQUMsRUFBRCxDQUF2RSxFQUE0RUQsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNQyxDQUFDLENBQUMsRUFBRCxDQUEzRixDQUFuRyxFQUFvTUQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLcEMsQ0FBQyxHQUFDdUMsQ0FBRixHQUFJc0IsQ0FBQyxHQUFDdkIsQ0FBL00sRUFBaU5GLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS1EsQ0FBQyxHQUFDTCxDQUFGLEdBQUlvQixDQUFDLEdBQUNyQixDQUE1TixFQUE4TkYsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLYyxDQUFDLEdBQUNYLENBQUYsR0FBSXlCLENBQUMsR0FBQzFCLENBQXpPLEVBQTJPRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUt3QixDQUFDLEdBQUNyQixDQUFGLEdBQUlpQyxDQUFDLEdBQUNsQyxDQUF0UCxFQUF3UEYsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLeUIsQ0FBQyxHQUFDdEIsQ0FBRixHQUFJdkMsQ0FBQyxHQUFDc0MsQ0FBblEsRUFBcVFGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3VCLENBQUMsR0FBQ3BCLENBQUYsR0FBSUssQ0FBQyxHQUFDTixDQUFoUixFQUFrUkYsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNNEIsQ0FBQyxHQUFDekIsQ0FBRixHQUFJVyxDQUFDLEdBQUNaLENBQTlSLEVBQWdTRixDQUFDLENBQUMsRUFBRCxDQUFELEdBQU1vQyxDQUFDLEdBQUNqQyxDQUFGLEdBQUlxQixDQUFDLEdBQUN0QixDQUE1UyxFQUE4UyxJQUFyVDtBQUEwVDs7QUFBQW9OLElBQUFBLE9BQU8sQ0FBQ2pMLENBQUQsRUFBR0MsQ0FBQyxHQUFDLElBQUwsRUFBVTtBQUFDLFVBQUl0QyxDQUFKLEVBQU1DLENBQU4sRUFBUXVDLENBQVI7QUFBVSxVQUFJdEMsQ0FBSixFQUFNQyxDQUFOLEVBQVF2QyxDQUFSLEVBQVU0QyxDQUFWLEVBQVlNLENBQVosRUFBY1UsQ0FBZCxFQUFnQkMsQ0FBaEIsRUFBa0JGLENBQWxCLEVBQW9CSyxDQUFwQixFQUFzQlEsQ0FBdEI7QUFBd0IsYUFBT3BDLENBQUMsR0FBQyxJQUFGLEVBQU9DLENBQUMsR0FBQ3FDLENBQVQsRUFBV3BDLENBQUMsR0FBQ3JCLElBQUksQ0FBQ3VPLEdBQUwsQ0FBUzVLLENBQUMsR0FBQ0gsQ0FBWCxDQUFiLEVBQTJCbEMsQ0FBQyxHQUFDdEIsSUFBSSxDQUFDd08sR0FBTCxDQUFTN0ssQ0FBVCxDQUE3QixFQUF5QzVFLENBQUMsR0FBQ3FDLENBQUMsQ0FBQyxDQUFELENBQTVDLEVBQWdETyxDQUFDLEdBQUNQLENBQUMsQ0FBQyxDQUFELENBQW5ELEVBQXVEYSxDQUFDLEdBQUNiLENBQUMsQ0FBQyxDQUFELENBQTFELEVBQThEdUIsQ0FBQyxHQUFDdkIsQ0FBQyxDQUFDLENBQUQsQ0FBakUsRUFBcUV3QixDQUFDLEdBQUN4QixDQUFDLENBQUMsQ0FBRCxDQUF4RSxFQUE0RXNCLENBQUMsR0FBQ3RCLENBQUMsQ0FBQyxDQUFELENBQS9FLEVBQW1GMkIsQ0FBQyxHQUFDM0IsQ0FBQyxDQUFDLEVBQUQsQ0FBdEYsRUFBMkZtQyxDQUFDLEdBQUNuQyxDQUFDLENBQUMsRUFBRCxDQUE5RixFQUFtR0EsQ0FBQyxLQUFHRCxDQUFKLEtBQVFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBTixFQUFVRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUMsQ0FBQyxDQUFELENBQWhCLEVBQW9CRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUMsQ0FBQyxDQUFELENBQTFCLEVBQThCRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUMsQ0FBQyxDQUFELENBQXBDLEVBQXdDRCxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU1DLENBQUMsQ0FBQyxFQUFELENBQS9DLEVBQW9ERCxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU1DLENBQUMsQ0FBQyxFQUFELENBQTNELEVBQWdFRCxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU1DLENBQUMsQ0FBQyxFQUFELENBQXZFLEVBQTRFRCxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU1DLENBQUMsQ0FBQyxFQUFELENBQTNGLENBQW5HLEVBQW9NRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtwQyxDQUFDLEdBQUN1QyxDQUFGLEdBQUlzQixDQUFDLEdBQUN2QixDQUEvTSxFQUFpTkYsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLUSxDQUFDLEdBQUNMLENBQUYsR0FBSW9CLENBQUMsR0FBQ3JCLENBQTVOLEVBQThORixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtjLENBQUMsR0FBQ1gsQ0FBRixHQUFJeUIsQ0FBQyxHQUFDMUIsQ0FBek8sRUFBMk9GLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3dCLENBQUMsR0FBQ3JCLENBQUYsR0FBSWlDLENBQUMsR0FBQ2xDLENBQXRQLEVBQXdQRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtwQyxDQUFDLEdBQUNzQyxDQUFGLEdBQUl1QixDQUFDLEdBQUN0QixDQUFuUSxFQUFxUUgsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLUSxDQUFDLEdBQUNOLENBQUYsR0FBSXFCLENBQUMsR0FBQ3BCLENBQWhSLEVBQWtSSCxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU1jLENBQUMsR0FBQ1osQ0FBRixHQUFJMEIsQ0FBQyxHQUFDekIsQ0FBOVIsRUFBZ1NILENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTXdCLENBQUMsR0FBQ3RCLENBQUYsR0FBSWtDLENBQUMsR0FBQ2pDLENBQTVTLEVBQThTLElBQXJUO0FBQTBUOztBQUFBb04sSUFBQUEsT0FBTyxDQUFDbEwsQ0FBRCxFQUFHQyxDQUFDLEdBQUMsSUFBTCxFQUFVO0FBQUMsVUFBSXRDLENBQUosRUFBTUMsQ0FBTixFQUFRdUMsQ0FBUjtBQUFVLFVBQUl0QyxDQUFKLEVBQU1DLENBQU4sRUFBUXZDLENBQVIsRUFBVTRDLENBQVYsRUFBWU0sQ0FBWixFQUFjVSxDQUFkLEVBQWdCQyxDQUFoQixFQUFrQkYsQ0FBbEIsRUFBb0JLLENBQXBCLEVBQXNCUSxDQUF0QjtBQUF3QixhQUFPcEMsQ0FBQyxHQUFDLElBQUYsRUFBT0MsQ0FBQyxHQUFDcUMsQ0FBVCxFQUFXcEMsQ0FBQyxHQUFDckIsSUFBSSxDQUFDdU8sR0FBTCxDQUFTNUssQ0FBQyxHQUFDSCxDQUFYLENBQWIsRUFBMkJsQyxDQUFDLEdBQUN0QixJQUFJLENBQUN3TyxHQUFMLENBQVM3SyxDQUFULENBQTdCLEVBQXlDNUUsQ0FBQyxHQUFDcUMsQ0FBQyxDQUFDLENBQUQsQ0FBNUMsRUFBZ0RPLENBQUMsR0FBQ1AsQ0FBQyxDQUFDLENBQUQsQ0FBbkQsRUFBdURhLENBQUMsR0FBQ2IsQ0FBQyxDQUFDLENBQUQsQ0FBMUQsRUFBOER1QixDQUFDLEdBQUN2QixDQUFDLENBQUMsQ0FBRCxDQUFqRSxFQUFxRXdCLENBQUMsR0FBQ3hCLENBQUMsQ0FBQyxDQUFELENBQXhFLEVBQTRFc0IsQ0FBQyxHQUFDdEIsQ0FBQyxDQUFDLENBQUQsQ0FBL0UsRUFBbUYyQixDQUFDLEdBQUMzQixDQUFDLENBQUMsQ0FBRCxDQUF0RixFQUEwRm1DLENBQUMsR0FBQ25DLENBQUMsQ0FBQyxDQUFELENBQTdGLEVBQWlHQSxDQUFDLEtBQUdELENBQUosS0FBUUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFDLENBQUMsQ0FBRCxDQUFOLEVBQVVELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBaEIsRUFBb0JELENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTUMsQ0FBQyxDQUFDLEVBQUQsQ0FBM0IsRUFBZ0NELENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTUMsQ0FBQyxDQUFDLEVBQUQsQ0FBdkMsRUFBNENELENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTUMsQ0FBQyxDQUFDLEVBQUQsQ0FBbkQsRUFBd0RELENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTUMsQ0FBQyxDQUFDLEVBQUQsQ0FBL0QsRUFBb0VELENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTUMsQ0FBQyxDQUFDLEVBQUQsQ0FBM0UsRUFBZ0ZELENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTUMsQ0FBQyxDQUFDLEVBQUQsQ0FBL0YsQ0FBakcsRUFBc01ELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3BDLENBQUMsR0FBQ3VDLENBQUYsR0FBSXNCLENBQUMsR0FBQ3ZCLENBQWpOLEVBQW1ORixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtRLENBQUMsR0FBQ0wsQ0FBRixHQUFJb0IsQ0FBQyxHQUFDckIsQ0FBOU4sRUFBZ09GLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS2MsQ0FBQyxHQUFDWCxDQUFGLEdBQUl5QixDQUFDLEdBQUMxQixDQUEzTyxFQUE2T0YsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLd0IsQ0FBQyxHQUFDckIsQ0FBRixHQUFJaUMsQ0FBQyxHQUFDbEMsQ0FBeFAsRUFBMFBGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3lCLENBQUMsR0FBQ3RCLENBQUYsR0FBSXZDLENBQUMsR0FBQ3NDLENBQXJRLEVBQXVRRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUt1QixDQUFDLEdBQUNwQixDQUFGLEdBQUlLLENBQUMsR0FBQ04sQ0FBbFIsRUFBb1JGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSzRCLENBQUMsR0FBQ3pCLENBQUYsR0FBSVcsQ0FBQyxHQUFDWixDQUEvUixFQUFpU0YsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLb0MsQ0FBQyxHQUFDakMsQ0FBRixHQUFJcUIsQ0FBQyxHQUFDdEIsQ0FBNVMsRUFBOFMsSUFBclQ7QUFBMFQ7O0FBQUEyQixJQUFBQSxLQUFLLENBQUMzQixDQUFELEVBQUdzQixDQUFDLEdBQUMsSUFBTCxFQUFVO0FBQUMsVUFBSXhCLENBQUosRUFBTUMsQ0FBTixFQUFRYSxDQUFSO0FBQVUsVUFBSVgsQ0FBSixFQUFNdkMsQ0FBTixFQUFRNEMsQ0FBUjtBQUFVLGFBQU9SLENBQUMsR0FBQyxJQUFGLEVBQU9DLENBQUMsR0FBQ3VCLENBQVQsRUFBV3JCLENBQUMsR0FBQyxDQUFDVyxDQUFDLEdBQUMsWUFBVSxPQUFPWixDQUFqQixHQUFtQixDQUFDQSxDQUFELEVBQUdBLENBQUgsRUFBS0EsQ0FBTCxDQUFuQixHQUEyQkEsQ0FBOUIsRUFBaUMsQ0FBakMsQ0FBYixFQUFpRHRDLENBQUMsR0FBQ2tELENBQUMsQ0FBQyxDQUFELENBQXBELEVBQXdETixDQUFDLEdBQUNNLENBQUMsQ0FBQyxDQUFELENBQTNELEVBQStEZCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0UsQ0FBekUsRUFBMkVILENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRSxDQUFyRixFQUF1RkgsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtFLENBQWpHLEVBQW1HSCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0UsQ0FBN0csRUFBK0dILENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLckMsQ0FBekgsRUFBMkhvQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3JDLENBQXJJLEVBQXVJb0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtyQyxDQUFqSixFQUFtSm9DLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLckMsQ0FBN0osRUFBK0pvQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS08sQ0FBekssRUFBMktSLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLTyxDQUFyTCxFQUF1TFIsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNQyxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU1PLENBQW5NLEVBQXFNUixDQUFDLENBQUMsRUFBRCxDQUFELEdBQU1DLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTU8sQ0FBak4sRUFBbU5SLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTUMsQ0FBQyxDQUFDLEVBQUQsQ0FBMU4sRUFBK05ELENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTUMsQ0FBQyxDQUFDLEVBQUQsQ0FBdE8sRUFBMk9ELENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTUMsQ0FBQyxDQUFDLEVBQUQsQ0FBbFAsRUFBdVBELENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTUMsQ0FBQyxDQUFDLEVBQUQsQ0FBOVAsRUFBbVEsSUFBMVE7QUFBK1E7O0FBQUFnQixJQUFBQSxRQUFRLENBQUNqQixDQUFELEVBQUdDLENBQUgsRUFBSztBQUFDLGFBQU9BLENBQUMsR0FBQzZOLENBQUMsQ0FBQyxJQUFELEVBQU05TixDQUFOLEVBQVFDLENBQVIsQ0FBRixHQUFhNk4sQ0FBQyxDQUFDLElBQUQsRUFBTSxJQUFOLEVBQVc5TixDQUFYLENBQWYsRUFBNkIsSUFBcEM7QUFBeUM7O0FBQUFrTixJQUFBQSxRQUFRLEdBQUU7QUFBQyxVQUFJbE4sQ0FBSjtBQUFNLGFBQU0sQ0FBQ0EsQ0FBQyxHQUFDLElBQUgsRUFBUyxDQUFULElBQVksQ0FBWixFQUFjQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBbkIsRUFBcUJBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUExQixFQUE0QkEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQWpDLEVBQW1DQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBeEMsRUFBMENBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUEvQyxFQUFpREEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQXRELEVBQXdEQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBN0QsRUFBK0RBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFwRSxFQUFzRUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQTNFLEVBQTZFQSxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU0sQ0FBbkYsRUFBcUZBLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTSxDQUEzRixFQUE2RkEsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNLENBQW5HLEVBQXFHQSxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU0sQ0FBM0csRUFBNkdBLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTSxDQUFuSCxFQUFxSEEsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNLENBQTNILEVBQTZILElBQW5JO0FBQXdJOztBQUFBYixJQUFBQSxJQUFJLENBQUNlLENBQUQsRUFBRztBQUFDLFVBQUlELENBQUosRUFBTUQsQ0FBTjtBQUFRLGFBQU9BLENBQUMsR0FBQ0UsQ0FBRixFQUFJLENBQUNELENBQUMsR0FBQyxJQUFILEVBQVMsQ0FBVCxJQUFZRCxDQUFDLENBQUMsQ0FBRCxDQUFqQixFQUFxQkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUEzQixFQUErQkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUFyQyxFQUF5Q0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUEvQyxFQUFtREMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUF6RCxFQUE2REMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUFuRSxFQUF1RUMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUE3RSxFQUFpRkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUF2RixFQUEyRkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUFqRyxFQUFxR0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUEzRyxFQUErR0MsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNRCxDQUFDLENBQUMsRUFBRCxDQUF0SCxFQUEySEMsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNRCxDQUFDLENBQUMsRUFBRCxDQUFsSSxFQUF1SUMsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNRCxDQUFDLENBQUMsRUFBRCxDQUE5SSxFQUFtSkMsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNRCxDQUFDLENBQUMsRUFBRCxDQUExSixFQUErSkMsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNRCxDQUFDLENBQUMsRUFBRCxDQUF0SyxFQUEyS0MsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNRCxDQUFDLENBQUMsRUFBRCxDQUFsTCxFQUF1TCxJQUE5TDtBQUFtTTs7QUFBQWdPLElBQUFBLGVBQWUsQ0FBQztBQUFDQyxNQUFBQSxHQUFHLEVBQUN6TSxDQUFMO0FBQU92SCxNQUFBQSxNQUFNLEVBQUN3SCxDQUFkO0FBQWdCeU0sTUFBQUEsSUFBSSxFQUFDM00sQ0FBckI7QUFBdUI0TSxNQUFBQSxHQUFHLEVBQUN2TTtBQUEzQixRQUE4QixFQUEvQixFQUFrQztBQUFDLFVBQUk1QixDQUFKLEVBQU1RLENBQU4sRUFBUU0sQ0FBUixFQUFVYixDQUFWLEVBQVlDLENBQVo7QUFBYyxVQUFJQyxDQUFKLEVBQU12QyxDQUFOO0FBQVEsYUFBT29DLENBQUMsR0FBQyxJQUFGLEVBQU9RLENBQUMsR0FBQ2dCLENBQVQsRUFBV1YsQ0FBQyxHQUFDVyxDQUFiLEVBQWV4QixDQUFDLEdBQUNzQixDQUFqQixFQUFtQnJCLENBQUMsR0FBQzBCLENBQXJCLEVBQXVCekIsQ0FBQyxHQUFDLElBQUV0QixJQUFJLENBQUN1UCxHQUFMLENBQVM1TixDQUFDLEdBQUMsQ0FBWCxDQUEzQixFQUF5QzVDLENBQUMsR0FBQyxLQUFHcUMsQ0FBQyxHQUFDQyxDQUFMLENBQTNDLEVBQW1ERixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtHLENBQUMsR0FBQ1csQ0FBMUQsRUFBNERkLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFqRSxFQUFtRUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQXhFLEVBQTBFQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBL0UsRUFBaUZBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUF0RixFQUF3RkEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRyxDQUE3RixFQUErRkgsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQXBHLEVBQXNHQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBM0csRUFBNkdBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFsSCxFQUFvSEEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQXpILEVBQTJIQSxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU0sQ0FBQ0UsQ0FBQyxHQUFDRCxDQUFILElBQU1yQyxDQUF2SSxFQUF5SW9DLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTSxDQUFDLENBQWhKLEVBQWtKQSxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU0sQ0FBeEosRUFBMEpBLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTSxDQUFoSyxFQUFrS0EsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNLElBQUVFLENBQUYsR0FBSUQsQ0FBSixHQUFNckMsQ0FBOUssRUFBZ0xvQyxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU0sQ0FBdEwsRUFBd0wsSUFBL0w7QUFBb007O0FBQUFxTyxJQUFBQSxjQUFjLENBQUM7QUFBQ0MsTUFBQUEsSUFBSSxFQUFDMU0sQ0FBTjtBQUFRMk0sTUFBQUEsS0FBSyxFQUFDbk0sQ0FBZDtBQUFnQm9NLE1BQUFBLE1BQU0sRUFBQ2hNLENBQXZCO0FBQXlCaU0sTUFBQUEsR0FBRyxFQUFDcE0sQ0FBN0I7QUFBK0I2TCxNQUFBQSxJQUFJLEVBQUM1TCxDQUFwQztBQUFzQzZMLE1BQUFBLEdBQUcsRUFBQzVMO0FBQTFDLEtBQUQsRUFBOEM7QUFBQyxVQUFJdkMsQ0FBSixFQUFNQyxDQUFOLEVBQVFDLENBQVIsRUFBVUMsQ0FBVixFQUFZdkMsQ0FBWixFQUFjNEMsQ0FBZCxFQUFnQk0sQ0FBaEI7QUFBa0IsVUFBSVUsQ0FBSixFQUFNQyxDQUFOLEVBQVFGLENBQVI7QUFBVSxhQUFPdkIsQ0FBQyxHQUFDLElBQUYsRUFBT0MsQ0FBQyxHQUFDMkIsQ0FBVCxFQUFXMUIsQ0FBQyxHQUFDa0MsQ0FBYixFQUFlakMsQ0FBQyxHQUFDcUMsQ0FBakIsRUFBbUI1RSxDQUFDLEdBQUN5RSxDQUFyQixFQUF1QjdCLENBQUMsR0FBQzhCLENBQXpCLEVBQTJCeEIsQ0FBQyxHQUFDeUIsQ0FBN0IsRUFBK0JmLENBQUMsR0FBQyxLQUFHdkIsQ0FBQyxHQUFDQyxDQUFMLENBQWpDLEVBQXlDdUIsQ0FBQyxHQUFDLEtBQUd0QixDQUFDLEdBQUN2QyxDQUFMLENBQTNDLEVBQW1EMkQsQ0FBQyxHQUFDLEtBQUdmLENBQUMsR0FBQ00sQ0FBTCxDQUFyRCxFQUE2RGQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUMsQ0FBRCxHQUFHd0IsQ0FBckUsRUFBdUV4QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBNUUsRUFBOEVBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFuRixFQUFxRkEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQTFGLEVBQTRGQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBakcsRUFBbUdBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDLENBQUQsR0FBR3lCLENBQTNHLEVBQTZHekIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQWxILEVBQW9IQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBekgsRUFBMkhBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFoSSxFQUFrSUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQXZJLEVBQXlJQSxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU0sSUFBRXVCLENBQWpKLEVBQW1KdkIsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNLENBQXpKLEVBQTJKQSxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU0sQ0FBQ0MsQ0FBQyxHQUFDQyxDQUFILElBQU1zQixDQUF2SyxFQUF5S3hCLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTSxDQUFDcEMsQ0FBQyxHQUFDdUMsQ0FBSCxJQUFNc0IsQ0FBckwsRUFBdUx6QixDQUFDLENBQUMsRUFBRCxDQUFELEdBQU0sQ0FBQ2MsQ0FBQyxHQUFDTixDQUFILElBQU1lLENBQW5NLEVBQXFNdkIsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNLENBQTNNLEVBQTZNLElBQXBOO0FBQXlOOztBQUFBME8sSUFBQUEsY0FBYyxDQUFDakgsQ0FBRCxFQUFHO0FBQUMsVUFBSXpILENBQUosRUFBTXBDLENBQU47QUFBUSxVQUFJNEMsQ0FBSixFQUFNTixDQUFOLEVBQVFELENBQVIsRUFBVWEsQ0FBVixFQUFZWCxDQUFaLEVBQWNxQixDQUFkLEVBQWdCQyxDQUFoQixFQUFrQkYsQ0FBbEIsRUFBb0JLLENBQXBCLEVBQXNCUSxDQUF0QixFQUF3QkksQ0FBeEIsRUFBMEJILENBQTFCLEVBQTRCQyxDQUE1QixFQUE4QkMsQ0FBOUIsRUFBZ0NKLENBQWhDLEVBQWtDb0YsQ0FBbEM7QUFBb0MsYUFBT3ZILENBQUMsR0FBQyxJQUFGLEVBQU9RLENBQUMsR0FBQyxDQUFDNUMsQ0FBQyxHQUFDNkosQ0FBSCxFQUFNLENBQU4sQ0FBVCxFQUFrQnZILENBQUMsR0FBQ3RDLENBQUMsQ0FBQyxDQUFELENBQXJCLEVBQXlCcUMsQ0FBQyxHQUFDckMsQ0FBQyxDQUFDLENBQUQsQ0FBNUIsRUFBZ0NrRCxDQUFDLEdBQUNsRCxDQUFDLENBQUMsQ0FBRCxDQUFuQyxFQUF1Q3VDLENBQUMsR0FBQ0ssQ0FBQyxHQUFDQSxDQUEzQyxFQUE2Q2dCLENBQUMsR0FBQ3RCLENBQUMsR0FBQ0EsQ0FBakQsRUFBbUR1QixDQUFDLEdBQUN4QixDQUFDLEdBQUNBLENBQXZELEVBQXlEc0IsQ0FBQyxHQUFDZixDQUFDLEdBQUNMLENBQTdELEVBQStEeUIsQ0FBQyxHQUFDMUIsQ0FBQyxHQUFDQyxDQUFuRSxFQUFxRWlDLENBQUMsR0FBQ2xDLENBQUMsR0FBQ3NCLENBQXpFLEVBQTJFZ0IsQ0FBQyxHQUFDdkMsQ0FBQyxHQUFDRSxDQUEvRSxFQUFpRmtDLENBQUMsR0FBQ3BDLENBQUMsR0FBQ3VCLENBQXJGLEVBQXVGYyxDQUFDLEdBQUNyQyxDQUFDLEdBQUN3QixDQUEzRixFQUE2RmMsQ0FBQyxHQUFDekIsQ0FBQyxHQUFDWCxDQUFqRyxFQUFtR2dDLENBQUMsR0FBQ3JCLENBQUMsR0FBQ1UsQ0FBdkcsRUFBeUcrRixDQUFDLEdBQUN6RyxDQUFDLEdBQUNXLENBQTdHLEVBQStHekIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLElBQUVvQyxDQUFGLEdBQUlFLENBQXhILEVBQTBIdEMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLNEIsQ0FBQyxHQUFDMkYsQ0FBakksRUFBbUl2SCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUt3QyxDQUFDLEdBQUNMLENBQTFJLEVBQTRJbkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQWpKLEVBQW1KQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUs0QixDQUFDLEdBQUMyRixDQUExSixFQUE0SnZILENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxJQUFFdUIsQ0FBRixHQUFJZSxDQUFySyxFQUF1S3RDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3FDLENBQUMsR0FBQ0UsQ0FBOUssRUFBZ0x2QyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBckwsRUFBdUxBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3dDLENBQUMsR0FBQ0wsQ0FBOUwsRUFBZ01uQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtxQyxDQUFDLEdBQUNFLENBQXZNLEVBQXlNdkMsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNLElBQUV1QixDQUFGLEdBQUlhLENBQW5OLEVBQXFOcEMsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNLENBQTNOLEVBQTZOQSxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU0sQ0FBbk8sRUFBcU9BLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTSxDQUEzTyxFQUE2T0EsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNLENBQW5QLEVBQXFQQSxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU0sQ0FBM1AsRUFBNlAsSUFBcFE7QUFBeVE7O0FBQUEyTyxJQUFBQSxXQUFXLENBQUMzTyxDQUFELEVBQUc7QUFBQyxhQUFPLEtBQUtoQyxDQUFMLEdBQU9nQyxDQUFDLENBQUMsQ0FBRCxDQUFSLEVBQVksS0FBSzlCLENBQUwsR0FBTzhCLENBQUMsQ0FBQyxDQUFELENBQXBCLEVBQXdCLEtBQUtTLENBQUwsR0FBT1QsQ0FBQyxDQUFDLENBQUQsQ0FBaEMsRUFBb0MsSUFBM0M7QUFBZ0Q7O0FBQUFtQixJQUFBQSxPQUFPLENBQUMyRixDQUFDLEdBQUMsSUFBSCxFQUFRO0FBQUMsVUFBSTdHLENBQUosRUFBTUMsQ0FBTjs7QUFBUSxVQUFJQyxDQUFKLEVBQU12QyxDQUFOLEVBQVE0QyxDQUFSLEVBQVVNLENBQVYsRUFBWVUsQ0FBWixFQUFjQyxDQUFkLEVBQWdCRixDQUFoQixFQUFrQkssQ0FBbEIsRUFBb0JRLENBQXBCLEVBQXNCSSxDQUF0QixFQUF3QkgsQ0FBeEIsRUFBMEJDLENBQTFCLEVBQTRCQyxDQUE1QixFQUE4QkosQ0FBOUIsRUFBZ0NvRixDQUFoQyxFQUFrQ0UsQ0FBbEMsRUFBb0N4SSxDQUFwQyxFQUFzQ29CLENBQXRDLEVBQXdDQyxDQUF4QyxFQUEwQ0MsQ0FBMUMsRUFBNEN2QyxDQUE1QyxFQUE4Q0UsQ0FBOUMsRUFBZ0R1QyxDQUFoRCxFQUFrREMsQ0FBbEQsRUFBb0RvQyxDQUFwRCxFQUFzRGlLLENBQXRELEVBQXdEaEssQ0FBeEQsRUFBMERDLENBQTFELEVBQTREaEQsQ0FBNUQ7O0FBQThELGFBQU9DLENBQUMsR0FBQyxJQUFGLEVBQU9FLENBQUMsR0FBQyxDQUFDRCxDQUFDLEdBQUM0RyxDQUFILEVBQU0sQ0FBTixDQUFULEVBQWtCbEosQ0FBQyxHQUFDc0MsQ0FBQyxDQUFDLENBQUQsQ0FBckIsRUFBeUJNLENBQUMsR0FBQ04sQ0FBQyxDQUFDLENBQUQsQ0FBNUIsRUFBZ0NZLENBQUMsR0FBQ1osQ0FBQyxDQUFDLENBQUQsQ0FBbkMsRUFBdUNzQixDQUFDLEdBQUN0QixDQUFDLENBQUMsQ0FBRCxDQUExQyxFQUE4Q3VCLENBQUMsR0FBQ3ZCLENBQUMsQ0FBQyxDQUFELENBQWpELEVBQXFEcUIsQ0FBQyxHQUFDckIsQ0FBQyxDQUFDLENBQUQsQ0FBeEQsRUFBNEQwQixDQUFDLEdBQUMxQixDQUFDLENBQUMsQ0FBRCxDQUEvRCxFQUFtRWtDLENBQUMsR0FBQ2xDLENBQUMsQ0FBQyxDQUFELENBQXRFLEVBQTBFc0MsQ0FBQyxHQUFDdEMsQ0FBQyxDQUFDLENBQUQsQ0FBN0UsRUFBaUZtQyxDQUFDLEdBQUNuQyxDQUFDLENBQUMsRUFBRCxDQUFwRixFQUF5Rm9DLENBQUMsR0FBQ3BDLENBQUMsQ0FBQyxFQUFELENBQTVGLEVBQWlHcUMsQ0FBQyxHQUFDckMsQ0FBQyxDQUFDLEVBQUQsQ0FBcEcsRUFBeUdpQyxDQUFDLEdBQUNqQyxDQUFDLENBQUMsRUFBRCxDQUE1RyxFQUFpSHFILENBQUMsR0FBQ3JILENBQUMsQ0FBQyxFQUFELENBQXBILEVBQXlIdUgsQ0FBQyxHQUFDdkgsQ0FBQyxDQUFDLEVBQUQsQ0FBNUgsRUFBaUlqQixDQUFDLEdBQUNrQixDQUFDLEdBQUNzQixDQUFGLEdBQUk3RCxDQUFDLEdBQUM0RCxDQUF6SSxFQUEySW5CLENBQUMsR0FBQ0YsQ0FBQyxHQUFDb0IsQ0FBRixHQUFJZixDQUFDLEdBQUNnQixDQUFuSixFQUFxSmxCLENBQUMsR0FBQ0gsQ0FBQyxHQUFDeUIsQ0FBRixHQUFJZCxDQUFDLEdBQUNVLENBQTdKLEVBQStKakIsQ0FBQyxHQUFDM0MsQ0FBQyxHQUFDMkQsQ0FBRixHQUFJZixDQUFDLEdBQUNpQixDQUF2SyxFQUF5S3pELENBQUMsR0FBQ0osQ0FBQyxHQUFDZ0UsQ0FBRixHQUFJZCxDQUFDLEdBQUNXLENBQWpMLEVBQW1MdkQsQ0FBQyxHQUFDc0MsQ0FBQyxHQUFDb0IsQ0FBRixHQUFJZCxDQUFDLEdBQUNTLENBQTNMLEVBQTZMZCxDQUFDLEdBQUMyQixDQUFDLEdBQUNELENBQUYsR0FBSUssQ0FBQyxHQUFDRCxDQUFyTSxFQUF1TTdCLENBQUMsR0FBQzBCLENBQUMsR0FBQ21GLENBQUYsR0FBSWxGLENBQUMsR0FBQ0UsQ0FBL00sRUFBaU5PLENBQUMsR0FBQ1YsQ0FBQyxHQUFDcUYsQ0FBRixHQUFJbkYsQ0FBQyxHQUFDQyxDQUF6TixFQUEyTndLLENBQUMsR0FBQ3ZLLENBQUMsR0FBQytFLENBQUYsR0FBSWxGLENBQUMsR0FBQ0YsQ0FBbk8sRUFBcU9ZLENBQUMsR0FBQ1AsQ0FBQyxHQUFDaUYsQ0FBRixHQUFJbkYsQ0FBQyxHQUFDSCxDQUE3TyxFQUErT2EsQ0FBQyxHQUFDWCxDQUFDLEdBQUNvRixDQUFGLEdBQUluRixDQUFDLEdBQUNpRixDQUF2UCxFQUF5UHZILENBQUMsR0FBQ2YsQ0FBQyxHQUFDK0QsQ0FBRixHQUFJM0MsQ0FBQyxHQUFDMEMsQ0FBTixHQUFRekMsQ0FBQyxHQUFDeU0sQ0FBVixHQUFZeE0sQ0FBQyxHQUFDdUMsQ0FBZCxHQUFnQjlFLENBQUMsR0FBQzBDLENBQWxCLEdBQW9CeEMsQ0FBQyxHQUFDdUMsQ0FBalIsRUFBbVJULENBQUMsS0FBR0EsQ0FBQyxHQUFDLElBQUVBLENBQUosRUFBTUMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUN3QixDQUFDLEdBQUN1QixDQUFGLEdBQUl6QixDQUFDLEdBQUN3QixDQUFOLEdBQVFuQixDQUFDLEdBQUNtTCxDQUFYLElBQWMvTSxDQUF6QixFQUEyQkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUNPLENBQUMsR0FBQ3VDLENBQUYsR0FBSW5GLENBQUMsR0FBQ29GLENBQU4sR0FBUWxDLENBQUMsR0FBQ2lNLENBQVgsSUFBYy9NLENBQTlDLEVBQWdEQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQ2tDLENBQUMsR0FBQ2pFLENBQUYsR0FBSXFKLENBQUMsR0FBQ3ZKLENBQU4sR0FBUXlKLENBQUMsR0FBQ2xILENBQVgsSUFBY1AsQ0FBbkUsRUFBcUVDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDb0MsQ0FBQyxHQUFDckUsQ0FBRixHQUFJd0UsQ0FBQyxHQUFDdEUsQ0FBTixHQUFRb0UsQ0FBQyxHQUFDL0IsQ0FBWCxJQUFjUCxDQUF4RixFQUEwRkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUNzQixDQUFDLEdBQUN1QixDQUFGLEdBQUl0QixDQUFDLEdBQUN3QixDQUFOLEdBQVFwQixDQUFDLEdBQUNsQixDQUFYLElBQWNWLENBQTdHLEVBQStHQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQ0UsQ0FBQyxHQUFDNkMsQ0FBRixHQUFJeEMsQ0FBQyxHQUFDc0MsQ0FBTixHQUFRaEMsQ0FBQyxHQUFDSixDQUFYLElBQWNWLENBQWxJLEVBQW9JQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQ3NILENBQUMsR0FBQ2pILENBQUYsR0FBSWlDLENBQUMsR0FBQ3JFLENBQU4sR0FBUXVKLENBQUMsR0FBQ3BILENBQVgsSUFBY0wsQ0FBdkosRUFBeUpDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDbUMsQ0FBQyxHQUFDbEUsQ0FBRixHQUFJbUUsQ0FBQyxHQUFDL0IsQ0FBTixHQUFRZ0MsQ0FBQyxHQUFDakMsQ0FBWCxJQUFjTCxDQUE1SyxFQUE4S0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUN1QixDQUFDLEdBQUN1QixDQUFGLEdBQUl0QixDQUFDLEdBQUNxQixDQUFOLEdBQVFsQixDQUFDLEdBQUNuQixDQUFYLElBQWNULENBQWpNLEVBQW1NQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQ3JDLENBQUMsR0FBQ2tGLENBQUYsR0FBSTNDLENBQUMsR0FBQzRDLENBQU4sR0FBUWpDLENBQUMsR0FBQ0wsQ0FBWCxJQUFjVCxDQUF0TixFQUF3TkMsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNLENBQUNzQyxDQUFDLEdBQUN2RSxDQUFGLEdBQUltRSxDQUFDLEdBQUM3QixDQUFOLEdBQVFtSCxDQUFDLEdBQUN4SSxDQUFYLElBQWNlLENBQTVPLEVBQThPQyxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU0sQ0FBQ3VDLENBQUMsR0FBQ2xDLENBQUYsR0FBSThCLENBQUMsR0FBQ3BFLENBQU4sR0FBUXNFLENBQUMsR0FBQ3JELENBQVgsSUFBY2UsQ0FBbFEsRUFBb1FDLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTSxDQUFDd0IsQ0FBQyxHQUFDZixDQUFGLEdBQUljLENBQUMsR0FBQ3VMLENBQU4sR0FBUXhMLENBQUMsR0FBQ2QsQ0FBWCxJQUFjVCxDQUF4UixFQUEwUkMsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNLENBQUNFLENBQUMsR0FBQzRNLENBQUYsR0FBSW5QLENBQUMsR0FBQzhDLENBQU4sR0FBUUYsQ0FBQyxHQUFDQyxDQUFYLElBQWNULENBQTlTLEVBQWdUQyxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU0sQ0FBQ2tDLENBQUMsR0FBQzlCLENBQUYsR0FBSWtDLENBQUMsR0FBQ2hDLENBQU4sR0FBUWdILENBQUMsR0FBQ3RJLENBQVgsSUFBY2UsQ0FBcFUsRUFBc1VDLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTSxDQUFDbUMsQ0FBQyxHQUFDN0IsQ0FBRixHQUFJaUMsQ0FBQyxHQUFDbkMsQ0FBTixHQUFRZ0MsQ0FBQyxHQUFDcEQsQ0FBWCxJQUFjZSxDQUE3VixDQUFwUixFQUFvbkIsSUFBM25CO0FBQWdvQjs7QUFBQTRPLElBQUFBLE9BQU8sQ0FBQzVRLENBQUQsRUFBR0UsQ0FBSCxFQUFLdUMsQ0FBTCxFQUFPO0FBQUMsVUFBSVQsQ0FBSixFQUFNRSxDQUFOLEVBQVFNLENBQVIsRUFBVU0sQ0FBVjtBQUFZLFVBQUliLENBQUosRUFBTUUsQ0FBTixFQUFRcUIsQ0FBUixFQUFVQyxDQUFWLEVBQVlZLENBQVosRUFBY2QsQ0FBZCxFQUFnQjNELENBQWhCLEVBQWtCMEUsQ0FBbEIsRUFBb0JDLENBQXBCLEVBQXNCSixDQUF0QixFQUF3Qm9GLENBQXhCLEVBQTBCRSxDQUExQixFQUE0QnhJLENBQTVCLEVBQThCb0IsQ0FBOUIsRUFBZ0NDLENBQWhDLEVBQWtDQyxDQUFsQyxFQUFvQ3FCLENBQXBDLEVBQXNDUSxDQUF0QyxFQUF3Q0ksQ0FBeEM7QUFBMEMsYUFBT3hDLENBQUMsR0FBQyxJQUFGLEVBQU9FLENBQUMsR0FBQ2xDLENBQVQsRUFBV3dDLENBQUMsR0FBQ3RDLENBQWIsRUFBZTRDLENBQUMsR0FBQ0wsQ0FBakIsRUFBbUJSLENBQUMsR0FBQ0MsQ0FBQyxDQUFDLENBQUQsQ0FBdEIsRUFBMEJDLENBQUMsR0FBQ0QsQ0FBQyxDQUFDLENBQUQsQ0FBN0IsRUFBaUNzQixDQUFDLEdBQUN0QixDQUFDLENBQUMsQ0FBRCxDQUFwQyxFQUF3Q3VCLENBQUMsR0FBQ3ZCLENBQUMsQ0FBQyxDQUFELENBQTNDLEVBQStDbUMsQ0FBQyxHQUFDcEMsQ0FBQyxHQUFDQSxDQUFuRCxFQUFxRHNCLENBQUMsR0FBQ3BCLENBQUMsR0FBQ0EsQ0FBekQsRUFBMkR2QyxDQUFDLEdBQUM0RCxDQUFDLEdBQUNBLENBQS9ELEVBQWlFYyxDQUFDLEdBQUNyQyxDQUFDLEdBQUNvQyxDQUFyRSxFQUF1RUUsQ0FBQyxHQUFDdEMsQ0FBQyxHQUFDc0IsQ0FBM0UsRUFBNkVZLENBQUMsR0FBQ2xDLENBQUMsR0FBQ3JDLENBQWpGLEVBQW1GMkosQ0FBQyxHQUFDcEgsQ0FBQyxHQUFDb0IsQ0FBdkYsRUFBeUZrRyxDQUFDLEdBQUN0SCxDQUFDLEdBQUN2QyxDQUE3RixFQUErRnFCLENBQUMsR0FBQ3VDLENBQUMsR0FBQzVELENBQW5HLEVBQXFHeUMsQ0FBQyxHQUFDb0IsQ0FBQyxHQUFDWSxDQUF6RyxFQUEyRy9CLENBQUMsR0FBQ21CLENBQUMsR0FBQ0YsQ0FBL0csRUFBaUhoQixDQUFDLEdBQUNrQixDQUFDLEdBQUM3RCxDQUFySCxFQUF1SGdFLENBQUMsR0FBQ2QsQ0FBQyxDQUFDLENBQUQsQ0FBMUgsRUFBOEhzQixDQUFDLEdBQUN0QixDQUFDLENBQUMsQ0FBRCxDQUFqSSxFQUFxSTBCLENBQUMsR0FBQzFCLENBQUMsQ0FBQyxDQUFELENBQXhJLEVBQTRJZCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQyxLQUFHdUgsQ0FBQyxHQUFDdEksQ0FBTCxDQUFELElBQVUyQyxDQUEzSixFQUE2SjVCLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDdUMsQ0FBQyxHQUFDaEMsQ0FBSCxJQUFNcUIsQ0FBeEssRUFBMEs1QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQ21DLENBQUMsR0FBQzdCLENBQUgsSUFBTXNCLENBQXJMLEVBQXVMNUIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQTVMLEVBQThMQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQ3VDLENBQUMsR0FBQ2hDLENBQUgsSUFBTTZCLENBQXpNLEVBQTJNcEMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUMsS0FBR3NDLENBQUMsR0FBQ3JELENBQUwsQ0FBRCxJQUFVbUQsQ0FBMU4sRUFBNE5wQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQ3lILENBQUMsR0FBQ3BILENBQUgsSUFBTStCLENBQXZPLEVBQXlPcEMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQTlPLEVBQWdQQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQ21DLENBQUMsR0FBQzdCLENBQUgsSUFBTWtDLENBQTNQLEVBQTZQeEMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUN5SCxDQUFDLEdBQUNwSCxDQUFILElBQU1tQyxDQUF4USxFQUEwUXhDLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTSxDQUFDLEtBQUdzQyxDQUFDLEdBQUNpRixDQUFMLENBQUQsSUFBVS9FLENBQTFSLEVBQTRSeEMsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNLENBQWxTLEVBQW9TQSxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU1RLENBQUMsQ0FBQyxDQUFELENBQTNTLEVBQStTUixDQUFDLENBQUMsRUFBRCxDQUFELEdBQU1RLENBQUMsQ0FBQyxDQUFELENBQXRULEVBQTBUUixDQUFDLENBQUMsRUFBRCxDQUFELEdBQU1RLENBQUMsQ0FBQyxDQUFELENBQWpVLEVBQXFVUixDQUFDLENBQUMsRUFBRCxDQUFELEdBQU0sQ0FBM1UsRUFBNlUsSUFBcFY7QUFBeVY7O0FBQUE2TyxJQUFBQSxXQUFXLENBQUNqUixDQUFELEVBQUc7QUFBQyxVQUFJc0MsQ0FBSixFQUFNRixDQUFOO0FBQVEsVUFBSUcsQ0FBSixFQUFNRixDQUFOO0FBQVEsYUFBT0MsQ0FBQyxHQUFDdEMsQ0FBRixFQUFJb0MsQ0FBQyxHQUFDLElBQU4sRUFBV0csQ0FBQyxHQUFDSCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtBLENBQUMsQ0FBQyxDQUFELENBQU4sR0FBVUEsQ0FBQyxDQUFDLEVBQUQsQ0FBeEIsRUFBNkJDLENBQUMsR0FBQyxDQUEvQixFQUFpQ0UsQ0FBQyxHQUFDLENBQUYsSUFBS0YsQ0FBQyxHQUFDLElBQUVwQixJQUFJLENBQUN1QixJQUFMLENBQVVELENBQUMsR0FBQyxDQUFaLENBQUosRUFBbUJELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxNQUFJRCxDQUE1QixFQUE4QkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUNGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0EsQ0FBQyxDQUFDLENBQUQsQ0FBUCxJQUFZQyxDQUEvQyxFQUFpREMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUNGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0EsQ0FBQyxDQUFDLENBQUQsQ0FBUCxJQUFZQyxDQUFsRSxFQUFvRUMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUNGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0EsQ0FBQyxDQUFDLENBQUQsQ0FBUCxJQUFZQyxDQUExRixJQUE2RkQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQSxDQUFDLENBQUMsQ0FBRCxDQUFOLElBQVdBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0EsQ0FBQyxDQUFDLEVBQUQsQ0FBakIsSUFBdUJDLENBQUMsR0FBQyxJQUFFcEIsSUFBSSxDQUFDdUIsSUFBTCxDQUFVLElBQUVKLENBQUMsQ0FBQyxDQUFELENBQUgsR0FBT0EsQ0FBQyxDQUFDLENBQUQsQ0FBUixHQUFZQSxDQUFDLENBQUMsRUFBRCxDQUF2QixDQUFKLEVBQWlDRSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQ0YsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQSxDQUFDLENBQUMsQ0FBRCxDQUFQLElBQVlDLENBQWxELEVBQW9EQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssTUFBSUQsQ0FBN0QsRUFBK0RDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtBLENBQUMsQ0FBQyxDQUFELENBQVAsSUFBWUMsQ0FBaEYsRUFBa0ZDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtBLENBQUMsQ0FBQyxDQUFELENBQVAsSUFBWUMsQ0FBMUgsSUFBNkhELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0EsQ0FBQyxDQUFDLEVBQUQsQ0FBTixJQUFZQyxDQUFDLEdBQUMsSUFBRXBCLElBQUksQ0FBQ3VCLElBQUwsQ0FBVSxJQUFFSixDQUFDLENBQUMsQ0FBRCxDQUFILEdBQU9BLENBQUMsQ0FBQyxDQUFELENBQVIsR0FBWUEsQ0FBQyxDQUFDLEVBQUQsQ0FBdkIsQ0FBSixFQUFpQ0UsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUNGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0EsQ0FBQyxDQUFDLENBQUQsQ0FBUCxJQUFZQyxDQUFsRCxFQUFvREMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUNGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0EsQ0FBQyxDQUFDLENBQUQsQ0FBUCxJQUFZQyxDQUFyRSxFQUF1RUMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLE1BQUlELENBQWhGLEVBQWtGQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQ0YsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQSxDQUFDLENBQUMsQ0FBRCxDQUFQLElBQVlDLENBQS9HLEtBQW1IQSxDQUFDLEdBQUMsSUFBRXBCLElBQUksQ0FBQ3VCLElBQUwsQ0FBVSxJQUFFSixDQUFDLENBQUMsRUFBRCxDQUFILEdBQVFBLENBQUMsQ0FBQyxDQUFELENBQVQsR0FBYUEsQ0FBQyxDQUFDLENBQUQsQ0FBeEIsQ0FBSixFQUFpQ0UsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUNGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0EsQ0FBQyxDQUFDLENBQUQsQ0FBUCxJQUFZQyxDQUFsRCxFQUFvREMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUNGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0EsQ0FBQyxDQUFDLENBQUQsQ0FBUCxJQUFZQyxDQUFyRSxFQUF1RUMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUNGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0EsQ0FBQyxDQUFDLENBQUQsQ0FBUCxJQUFZQyxDQUF4RixFQUEwRkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLE1BQUlELENBQXROLENBQTNQLEVBQW9kLElBQTNkO0FBQWdlOztBQUFBNk8sSUFBQUEsY0FBYyxDQUFDNU8sQ0FBRCxFQUFHO0FBQUMsVUFBSUQsQ0FBSixFQUFNRCxDQUFOO0FBQVEsYUFBT0EsQ0FBQyxHQUFDLElBQUYsRUFBTyxDQUFDQyxDQUFDLEdBQUNDLENBQUgsRUFBTSxDQUFOLElBQVNGLENBQUMsQ0FBQyxFQUFELENBQWpCLEVBQXNCQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtELENBQUMsQ0FBQyxFQUFELENBQTVCLEVBQWlDQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtELENBQUMsQ0FBQyxFQUFELENBQXZDLEVBQTRDLElBQW5EO0FBQXdEOztBQUFBK08sSUFBQUEsVUFBVSxDQUFDM00sQ0FBRCxFQUFHO0FBQUMsVUFBSW5DLENBQUosRUFBTUQsQ0FBTjtBQUFRLFVBQUlFLENBQUosRUFBTUMsQ0FBTixFQUFRdkMsQ0FBUixFQUFVNEMsQ0FBVixFQUFZTSxDQUFaLEVBQWNVLENBQWQsRUFBZ0JDLENBQWhCLEVBQWtCRixDQUFsQixFQUFvQkssQ0FBcEI7QUFBc0IsYUFBTzNCLENBQUMsR0FBQ21DLENBQUYsRUFBSXBDLENBQUMsR0FBQyxJQUFOLEVBQVdFLENBQUMsR0FBQ0YsQ0FBQyxDQUFDLENBQUQsQ0FBZCxFQUFrQkcsQ0FBQyxHQUFDSCxDQUFDLENBQUMsQ0FBRCxDQUFyQixFQUF5QnBDLENBQUMsR0FBQ29DLENBQUMsQ0FBQyxDQUFELENBQTVCLEVBQWdDUSxDQUFDLEdBQUNSLENBQUMsQ0FBQyxDQUFELENBQW5DLEVBQXVDYyxDQUFDLEdBQUNkLENBQUMsQ0FBQyxDQUFELENBQTFDLEVBQThDd0IsQ0FBQyxHQUFDeEIsQ0FBQyxDQUFDLENBQUQsQ0FBakQsRUFBcUR5QixDQUFDLEdBQUN6QixDQUFDLENBQUMsQ0FBRCxDQUF4RCxFQUE0RHVCLENBQUMsR0FBQ3ZCLENBQUMsQ0FBQyxDQUFELENBQS9ELEVBQW1FNEIsQ0FBQyxHQUFDNUIsQ0FBQyxDQUFDLEVBQUQsQ0FBdEUsRUFBMkVDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3BCLElBQUksQ0FBQ3VCLElBQUwsQ0FBVUYsQ0FBQyxHQUFDQSxDQUFGLEdBQUlDLENBQUMsR0FBQ0EsQ0FBTixHQUFRdkMsQ0FBQyxHQUFDQSxDQUFwQixDQUFoRixFQUF1R3FDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3BCLElBQUksQ0FBQ3VCLElBQUwsQ0FBVUksQ0FBQyxHQUFDQSxDQUFGLEdBQUlNLENBQUMsR0FBQ0EsQ0FBTixHQUFRVSxDQUFDLEdBQUNBLENBQXBCLENBQTVHLEVBQW1JdkIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLcEIsSUFBSSxDQUFDdUIsSUFBTCxDQUFVcUIsQ0FBQyxHQUFDQSxDQUFGLEdBQUlGLENBQUMsR0FBQ0EsQ0FBTixHQUFRSyxDQUFDLEdBQUNBLENBQXBCLENBQXhJLEVBQStKLElBQXRLO0FBQTJLOztBQUFBb04sSUFBQUEsaUJBQWlCLEdBQUU7QUFBQyxVQUFJaFAsQ0FBSjtBQUFNLFVBQUlDLENBQUosRUFBTUMsQ0FBTixFQUFRQyxDQUFSLEVBQVV2QyxDQUFWLEVBQVk0QyxDQUFaLEVBQWNNLENBQWQsRUFBZ0JVLENBQWhCLEVBQWtCQyxDQUFsQixFQUFvQkYsQ0FBcEI7QUFBc0IsYUFBT3ZCLENBQUMsR0FBQyxJQUFGLEVBQU9DLENBQUMsR0FBQ0QsQ0FBQyxDQUFDLENBQUQsQ0FBVixFQUFjRSxDQUFDLEdBQUNGLENBQUMsQ0FBQyxDQUFELENBQWpCLEVBQXFCRyxDQUFDLEdBQUNILENBQUMsQ0FBQyxDQUFELENBQXhCLEVBQTRCcEMsQ0FBQyxHQUFDb0MsQ0FBQyxDQUFDLENBQUQsQ0FBL0IsRUFBbUNRLENBQUMsR0FBQ1IsQ0FBQyxDQUFDLENBQUQsQ0FBdEMsRUFBMENjLENBQUMsR0FBQ2QsQ0FBQyxDQUFDLENBQUQsQ0FBN0MsRUFBaUR3QixDQUFDLEdBQUN4QixDQUFDLENBQUMsQ0FBRCxDQUFwRCxFQUF3RHlCLENBQUMsR0FBQ3pCLENBQUMsQ0FBQyxDQUFELENBQTNELEVBQStEdUIsQ0FBQyxHQUFDdkIsQ0FBQyxDQUFDLEVBQUQsQ0FBbEUsRUFBdUVuQixJQUFJLENBQUN1QixJQUFMLENBQVV2QixJQUFJLENBQUNDLEdBQUwsQ0FBU21CLENBQUMsR0FBQ0EsQ0FBRixHQUFJQyxDQUFDLEdBQUNBLENBQU4sR0FBUUMsQ0FBQyxHQUFDQSxDQUFuQixFQUFxQnZDLENBQUMsR0FBQ0EsQ0FBRixHQUFJNEMsQ0FBQyxHQUFDQSxDQUFOLEdBQVFNLENBQUMsR0FBQ0EsQ0FBL0IsRUFBaUNVLENBQUMsR0FBQ0EsQ0FBRixHQUFJQyxDQUFDLEdBQUNBLENBQU4sR0FBUUYsQ0FBQyxHQUFDQSxDQUEzQyxDQUFWLENBQTlFO0FBQXVJOztBQUFBME4sSUFBQUEsTUFBTSxDQUFDMUgsQ0FBRCxFQUFHRSxDQUFILEVBQUt4SSxDQUFMLEVBQU87QUFBQyxVQUFJZSxDQUFKLEVBQU15QixDQUFOLEVBQVFGLENBQVIsRUFBVUssQ0FBVjtBQUFZLFVBQUlRLENBQUosRUFBTUksQ0FBTixFQUFRSCxDQUFSLEVBQVVDLENBQVYsRUFBWUMsQ0FBWixFQUFjSixDQUFkLEVBQWdCakMsQ0FBaEIsRUFBa0JDLENBQWxCLEVBQW9CdkMsQ0FBcEIsRUFBc0JxQyxDQUF0QixFQUF3Qk8sQ0FBeEIsRUFBMEJNLENBQTFCLEVBQTRCVSxDQUE1QjtBQUE4QixhQUFPeEIsQ0FBQyxHQUFDLElBQUYsRUFBT3lCLENBQUMsR0FBQzhGLENBQVQsRUFBV2hHLENBQUMsR0FBQ2tHLENBQWIsRUFBZTdGLENBQUMsR0FBQzNDLENBQWpCLEVBQW1CbUQsQ0FBQyxHQUFDWCxDQUFDLENBQUMsQ0FBRCxDQUF0QixFQUEwQmUsQ0FBQyxHQUFDZixDQUFDLENBQUMsQ0FBRCxDQUE3QixFQUFpQ1ksQ0FBQyxHQUFDWixDQUFDLENBQUMsQ0FBRCxDQUFwQyxFQUF3Q2EsQ0FBQyxHQUFDVixDQUFDLENBQUMsQ0FBRCxDQUEzQyxFQUErQ1csQ0FBQyxHQUFDWCxDQUFDLENBQUMsQ0FBRCxDQUFsRCxFQUFzRE8sQ0FBQyxHQUFDUCxDQUFDLENBQUMsQ0FBRCxDQUF6RCxFQUE2RDFCLENBQUMsR0FBQ2tDLENBQUMsR0FBQ2IsQ0FBQyxDQUFDLENBQUQsQ0FBbEUsRUFBc0VwQixDQUFDLEdBQUNxQyxDQUFDLEdBQUNqQixDQUFDLENBQUMsQ0FBRCxDQUEzRSxFQUErRTNELENBQUMsR0FBQ3lFLENBQUMsR0FBQ2QsQ0FBQyxDQUFDLENBQUQsQ0FBcEYsRUFBd0Z0QixDQUFDLEdBQUNDLENBQUMsR0FBQ0EsQ0FBRixHQUFJQyxDQUFDLEdBQUNBLENBQU4sR0FBUXZDLENBQUMsR0FBQ0EsQ0FBcEcsRUFBc0dxQyxDQUFDLEdBQUMsQ0FBRixLQUFNQyxDQUFDLElBQUVELENBQUMsR0FBQyxJQUFFcEIsSUFBSSxDQUFDdUIsSUFBTCxDQUFVSCxDQUFWLENBQVAsRUFBb0JFLENBQUMsSUFBRUYsQ0FBdkIsRUFBeUJyQyxDQUFDLElBQUVxQyxDQUFsQyxDQUF0RyxFQUEySU8sQ0FBQyxHQUFDK0IsQ0FBQyxHQUFDM0UsQ0FBRixHQUFJdUUsQ0FBQyxHQUFDaEMsQ0FBbkosRUFBcUpXLENBQUMsR0FBQ3FCLENBQUMsR0FBQ2pDLENBQUYsR0FBSW9DLENBQUMsR0FBQzFFLENBQTdKLEVBQStKNEQsQ0FBQyxHQUFDYyxDQUFDLEdBQUNuQyxDQUFGLEdBQUlvQyxDQUFDLEdBQUNyQyxDQUF2SyxFQUF5SyxDQUFDRCxDQUFDLEdBQUNPLENBQUMsR0FBQ0EsQ0FBRixHQUFJTSxDQUFDLEdBQUNBLENBQU4sR0FBUVUsQ0FBQyxHQUFDQSxDQUFiLElBQWdCLENBQWhCLEtBQW9CaEIsQ0FBQyxJQUFFUCxDQUFDLEdBQUMsSUFBRXBCLElBQUksQ0FBQ3VCLElBQUwsQ0FBVUgsQ0FBVixDQUFQLEVBQW9CYSxDQUFDLElBQUViLENBQXZCLEVBQXlCdUIsQ0FBQyxJQUFFdkIsQ0FBaEQsQ0FBekssRUFBNE5ELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS1EsQ0FBak8sRUFBbU9SLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS2MsQ0FBeE8sRUFBME9kLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3dCLENBQS9PLEVBQWlQeEIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQXRQLEVBQXdQQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtHLENBQUMsR0FBQ3FCLENBQUYsR0FBSTVELENBQUMsR0FBQ2tELENBQW5RLEVBQXFRZCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtwQyxDQUFDLEdBQUM0QyxDQUFGLEdBQUlOLENBQUMsR0FBQ3NCLENBQWhSLEVBQWtSeEIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRSxDQUFDLEdBQUNZLENBQUYsR0FBSVgsQ0FBQyxHQUFDSyxDQUE3UixFQUErUlIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQXBTLEVBQXNTQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtFLENBQTNTLEVBQTZTRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtHLENBQWxULEVBQW9USCxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU1wQyxDQUExVCxFQUE0VG9DLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTSxDQUFsVSxFQUFvVUEsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNb0MsQ0FBMVUsRUFBNFVwQyxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU13QyxDQUFsVixFQUFvVnhDLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTXFDLENBQTFWLEVBQTRWckMsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNLENBQWxXLEVBQW9XLElBQTNXO0FBQWdYOztBQUFBa1AsSUFBQUEsV0FBVyxHQUFFO0FBQUMsVUFBSWxQLENBQUo7QUFBTSxVQUFJQyxDQUFKLEVBQU1DLENBQU4sRUFBUUMsQ0FBUixFQUFVdkMsQ0FBVixFQUFZNEMsQ0FBWixFQUFjTSxDQUFkLEVBQWdCVSxDQUFoQixFQUFrQkMsQ0FBbEIsRUFBb0JGLENBQXBCLEVBQXNCSyxDQUF0QixFQUF3QlEsQ0FBeEIsRUFBMEJJLENBQTFCLEVBQTRCSCxDQUE1QixFQUE4QkMsQ0FBOUIsRUFBZ0NDLENBQWhDLEVBQWtDSixDQUFsQztBQUFvQyxhQUFPbkMsQ0FBQyxHQUFDLElBQUYsRUFBT0MsQ0FBQyxHQUFDRCxDQUFDLENBQUMsQ0FBRCxDQUFWLEVBQWNFLENBQUMsR0FBQ0YsQ0FBQyxDQUFDLENBQUQsQ0FBakIsRUFBcUJHLENBQUMsR0FBQ0gsQ0FBQyxDQUFDLENBQUQsQ0FBeEIsRUFBNEJwQyxDQUFDLEdBQUNvQyxDQUFDLENBQUMsQ0FBRCxDQUEvQixFQUFtQ1EsQ0FBQyxHQUFDUixDQUFDLENBQUMsQ0FBRCxDQUF0QyxFQUEwQ2MsQ0FBQyxHQUFDZCxDQUFDLENBQUMsQ0FBRCxDQUE3QyxFQUFpRHdCLENBQUMsR0FBQ3hCLENBQUMsQ0FBQyxDQUFELENBQXBELEVBQXdEeUIsQ0FBQyxHQUFDekIsQ0FBQyxDQUFDLENBQUQsQ0FBM0QsRUFBK0R1QixDQUFDLEdBQUN2QixDQUFDLENBQUMsQ0FBRCxDQUFsRSxFQUFzRTRCLENBQUMsR0FBQzVCLENBQUMsQ0FBQyxDQUFELENBQXpFLEVBQTZFb0MsQ0FBQyxHQUFDcEMsQ0FBQyxDQUFDLEVBQUQsQ0FBaEYsRUFBcUZ3QyxDQUFDLEdBQUN4QyxDQUFDLENBQUMsRUFBRCxDQUF4RixFQUE2RnFDLENBQUMsR0FBQ3JDLENBQUMsQ0FBQyxFQUFELENBQWhHLEVBQXFHc0MsQ0FBQyxHQUFDdEMsQ0FBQyxDQUFDLEVBQUQsQ0FBeEcsRUFBNkd1QyxDQUFDLEdBQUN2QyxDQUFDLENBQUMsRUFBRCxDQUFoSCxFQUFxSG1DLENBQUMsR0FBQ25DLENBQUMsQ0FBQyxFQUFELENBQXhILEVBQTZILENBQUNDLENBQUMsR0FBQ2EsQ0FBRixHQUFJWixDQUFDLEdBQUNNLENBQVAsS0FBVzRCLENBQUMsR0FBQ0QsQ0FBRixHQUFJSyxDQUFDLEdBQUNELENBQWpCLElBQW9CLENBQUN0QyxDQUFDLEdBQUN1QixDQUFGLEdBQUlyQixDQUFDLEdBQUNLLENBQVAsS0FBV29CLENBQUMsR0FBQ08sQ0FBRixHQUFJSyxDQUFDLEdBQUNGLENBQWpCLENBQXBCLEdBQXdDLENBQUNyQyxDQUFDLEdBQUN3QixDQUFGLEdBQUk3RCxDQUFDLEdBQUM0QyxDQUFQLEtBQVdvQixDQUFDLEdBQUNXLENBQUYsR0FBSUgsQ0FBQyxHQUFDRSxDQUFqQixDQUF4QyxHQUE0RCxDQUFDcEMsQ0FBQyxHQUFDc0IsQ0FBRixHQUFJckIsQ0FBQyxHQUFDVyxDQUFQLEtBQVdTLENBQUMsR0FBQ1ksQ0FBRixHQUFJSyxDQUFDLEdBQUNILENBQWpCLENBQTVELEdBQWdGLENBQUNuQyxDQUFDLEdBQUN1QixDQUFGLEdBQUk3RCxDQUFDLEdBQUNrRCxDQUFQLEtBQVdTLENBQUMsR0FBQ2dCLENBQUYsR0FBSUgsQ0FBQyxHQUFDQyxDQUFqQixDQUFoRixHQUFvRyxDQUFDbEMsQ0FBQyxHQUFDc0IsQ0FBRixHQUFJN0QsQ0FBQyxHQUFDNEQsQ0FBUCxLQUFXRCxDQUFDLEdBQUNlLENBQUYsR0FBSVYsQ0FBQyxHQUFDUyxDQUFqQixDQUF4TztBQUE0UDs7QUFBNW5OOztBQUE2bk4sTUFBSThNLENBQUMsR0FBQyxJQUFJalAsQ0FBSixFQUFOOztBQUFZLFFBQU1rQyxDQUFOLFNBQWdCdkIsS0FBaEIsQ0FBcUI7QUFBQ3RILElBQUFBLFdBQVcsQ0FBQ3lHLENBQUMsR0FBQyxDQUFILEVBQUtDLENBQUMsR0FBQ0QsQ0FBUCxFQUFTRSxDQUFDLEdBQUNGLENBQVgsRUFBYUcsQ0FBQyxHQUFDLEtBQWYsRUFBcUI7QUFBQyxhQUFPLE1BQU1ILENBQU4sRUFBUUMsQ0FBUixFQUFVQyxDQUFWLEdBQWEsS0FBS3lOLEtBQUwsR0FBV3hOLENBQXhCLEVBQTBCLEtBQUs4TSxRQUFMLEdBQWMsTUFBSSxDQUFFLENBQTlDLEVBQStDLElBQXREO0FBQTJEOztBQUFLLFFBQURqUCxDQUFDLEdBQUU7QUFBQyxhQUFPLEtBQUssQ0FBTCxDQUFQO0FBQWU7O0FBQUssUUFBREEsQ0FBQyxDQUFDZ0MsQ0FBRCxFQUFHO0FBQUMsV0FBSyxDQUFMLElBQVFBLENBQVIsRUFBVSxLQUFLaU4sUUFBTCxFQUFWO0FBQTBCOztBQUFLLFFBQUQvTyxDQUFDLEdBQUU7QUFBQyxhQUFPLEtBQUssQ0FBTCxDQUFQO0FBQWU7O0FBQUssUUFBREEsQ0FBQyxDQUFDOEIsQ0FBRCxFQUFHO0FBQUMsV0FBSyxDQUFMLElBQVFBLENBQVIsRUFBVSxLQUFLaU4sUUFBTCxFQUFWO0FBQTBCOztBQUFLLFFBQUR4TSxDQUFDLEdBQUU7QUFBQyxhQUFPLEtBQUssQ0FBTCxDQUFQO0FBQWU7O0FBQUssUUFBREEsQ0FBQyxDQUFDVCxDQUFELEVBQUc7QUFBQyxXQUFLLENBQUwsSUFBUUEsQ0FBUixFQUFVLEtBQUtpTixRQUFMLEVBQVY7QUFBMEI7O0FBQUE3TyxJQUFBQSxHQUFHLENBQUM0QixDQUFELEVBQUdDLENBQUMsR0FBQ0QsQ0FBTCxFQUFPRSxDQUFDLEdBQUNGLENBQVQsRUFBVztBQUFDLGFBQU9BLENBQUMsQ0FBQ2pDLE1BQUYsR0FBUyxLQUFLb0IsSUFBTCxDQUFVYSxDQUFWLENBQVQsSUFBdUIsS0FBSyxDQUFMLElBQVFBLENBQVIsRUFBVSxLQUFLLENBQUwsSUFBUUMsQ0FBbEIsRUFBb0IsS0FBSyxDQUFMLElBQVFDLENBQTVCLEVBQThCLEtBQUsrTSxRQUFMLEVBQTlCLEVBQThDLElBQXJFLENBQVA7QUFBa0Y7O0FBQUE5TixJQUFBQSxJQUFJLENBQUNhLENBQUQsRUFBRztBQUFDLGFBQU8sS0FBSyxDQUFMLElBQVFBLENBQUMsQ0FBQyxDQUFELENBQVQsRUFBYSxLQUFLLENBQUwsSUFBUUEsQ0FBQyxDQUFDLENBQUQsQ0FBdEIsRUFBMEIsS0FBSyxDQUFMLElBQVFBLENBQUMsQ0FBQyxDQUFELENBQW5DLEVBQXVDLElBQTlDO0FBQW1EOztBQUFBb1AsSUFBQUEsT0FBTyxDQUFDcFAsQ0FBRCxFQUFHO0FBQUMsYUFBTyxLQUFLMk4sS0FBTCxHQUFXM04sQ0FBWCxFQUFhLEtBQUtpTixRQUFMLEVBQWIsRUFBNkIsSUFBcEM7QUFBeUM7O0FBQUFvQyxJQUFBQSxrQkFBa0IsQ0FBQ3JQLENBQUQsRUFBR0MsQ0FBQyxHQUFDLEtBQUswTixLQUFWLEVBQWdCO0FBQUMsYUFBTyxVQUFTMU4sQ0FBVCxFQUFXRCxDQUFYLEVBQWFFLENBQUMsR0FBQyxLQUFmLEVBQXFCO0FBQUMsa0JBQVFBLENBQVIsSUFBV0QsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLcEIsSUFBSSxDQUFDeVEsSUFBTCxDQUFVelEsSUFBSSxDQUFDZ0csR0FBTCxDQUFTaEcsSUFBSSxDQUFDQyxHQUFMLENBQVNrQixDQUFDLENBQUMsQ0FBRCxDQUFWLEVBQWMsQ0FBQyxDQUFmLENBQVQsRUFBMkIsQ0FBM0IsQ0FBVixDQUFMLEVBQThDLFNBQU9uQixJQUFJLENBQUMwUSxHQUFMLENBQVN2UCxDQUFDLENBQUMsQ0FBRCxDQUFWLENBQVAsSUFBdUJDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3BCLElBQUksQ0FBQzJRLEtBQUwsQ0FBVyxDQUFDeFAsQ0FBQyxDQUFDLENBQUQsQ0FBYixFQUFpQkEsQ0FBQyxDQUFDLEVBQUQsQ0FBbEIsQ0FBTCxFQUE2QkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLcEIsSUFBSSxDQUFDMlEsS0FBTCxDQUFXLENBQUN4UCxDQUFDLENBQUMsQ0FBRCxDQUFiLEVBQWlCQSxDQUFDLENBQUMsQ0FBRCxDQUFsQixDQUF6RCxLQUFrRkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLcEIsSUFBSSxDQUFDMlEsS0FBTCxDQUFXeFAsQ0FBQyxDQUFDLENBQUQsQ0FBWixFQUFnQkEsQ0FBQyxDQUFDLENBQUQsQ0FBakIsQ0FBTCxFQUEyQkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQWxILENBQXpELElBQStLLFVBQVFDLENBQVIsSUFBV0QsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLcEIsSUFBSSxDQUFDeVEsSUFBTCxDQUFVLENBQUN6USxJQUFJLENBQUNnRyxHQUFMLENBQVNoRyxJQUFJLENBQUNDLEdBQUwsQ0FBU2tCLENBQUMsQ0FBQyxDQUFELENBQVYsRUFBYyxDQUFDLENBQWYsQ0FBVCxFQUEyQixDQUEzQixDQUFYLENBQUwsRUFBK0MsU0FBT25CLElBQUksQ0FBQzBRLEdBQUwsQ0FBU3ZQLENBQUMsQ0FBQyxDQUFELENBQVYsQ0FBUCxJQUF1QkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLcEIsSUFBSSxDQUFDMlEsS0FBTCxDQUFXeFAsQ0FBQyxDQUFDLENBQUQsQ0FBWixFQUFnQkEsQ0FBQyxDQUFDLEVBQUQsQ0FBakIsQ0FBTCxFQUE0QkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLcEIsSUFBSSxDQUFDMlEsS0FBTCxDQUFXeFAsQ0FBQyxDQUFDLENBQUQsQ0FBWixFQUFnQkEsQ0FBQyxDQUFDLENBQUQsQ0FBakIsQ0FBeEQsS0FBZ0ZDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3BCLElBQUksQ0FBQzJRLEtBQUwsQ0FBVyxDQUFDeFAsQ0FBQyxDQUFDLENBQUQsQ0FBYixFQUFpQkEsQ0FBQyxDQUFDLENBQUQsQ0FBbEIsQ0FBTCxFQUE0QkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQWpILENBQTFELElBQStLLFVBQVFDLENBQVIsSUFBV0QsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLcEIsSUFBSSxDQUFDeVEsSUFBTCxDQUFVelEsSUFBSSxDQUFDZ0csR0FBTCxDQUFTaEcsSUFBSSxDQUFDQyxHQUFMLENBQVNrQixDQUFDLENBQUMsQ0FBRCxDQUFWLEVBQWMsQ0FBQyxDQUFmLENBQVQsRUFBMkIsQ0FBM0IsQ0FBVixDQUFMLEVBQThDLFNBQU9uQixJQUFJLENBQUMwUSxHQUFMLENBQVN2UCxDQUFDLENBQUMsQ0FBRCxDQUFWLENBQVAsSUFBdUJDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3BCLElBQUksQ0FBQzJRLEtBQUwsQ0FBVyxDQUFDeFAsQ0FBQyxDQUFDLENBQUQsQ0FBYixFQUFpQkEsQ0FBQyxDQUFDLEVBQUQsQ0FBbEIsQ0FBTCxFQUE2QkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLcEIsSUFBSSxDQUFDMlEsS0FBTCxDQUFXLENBQUN4UCxDQUFDLENBQUMsQ0FBRCxDQUFiLEVBQWlCQSxDQUFDLENBQUMsQ0FBRCxDQUFsQixDQUF6RCxLQUFrRkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUwsRUFBT0EsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLcEIsSUFBSSxDQUFDMlEsS0FBTCxDQUFXeFAsQ0FBQyxDQUFDLENBQUQsQ0FBWixFQUFnQkEsQ0FBQyxDQUFDLENBQUQsQ0FBakIsQ0FBOUYsQ0FBekQsSUFBK0ssVUFBUUUsQ0FBUixJQUFXRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtwQixJQUFJLENBQUN5USxJQUFMLENBQVUsQ0FBQ3pRLElBQUksQ0FBQ2dHLEdBQUwsQ0FBU2hHLElBQUksQ0FBQ0MsR0FBTCxDQUFTa0IsQ0FBQyxDQUFDLENBQUQsQ0FBVixFQUFjLENBQUMsQ0FBZixDQUFULEVBQTJCLENBQTNCLENBQVgsQ0FBTCxFQUErQyxTQUFPbkIsSUFBSSxDQUFDMFEsR0FBTCxDQUFTdlAsQ0FBQyxDQUFDLENBQUQsQ0FBVixDQUFQLElBQXVCQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtwQixJQUFJLENBQUMyUSxLQUFMLENBQVd4UCxDQUFDLENBQUMsQ0FBRCxDQUFaLEVBQWdCQSxDQUFDLENBQUMsRUFBRCxDQUFqQixDQUFMLEVBQTRCQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtwQixJQUFJLENBQUMyUSxLQUFMLENBQVd4UCxDQUFDLENBQUMsQ0FBRCxDQUFaLEVBQWdCQSxDQUFDLENBQUMsQ0FBRCxDQUFqQixDQUF4RCxLQUFnRkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUwsRUFBT0EsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLcEIsSUFBSSxDQUFDMlEsS0FBTCxDQUFXLENBQUN4UCxDQUFDLENBQUMsQ0FBRCxDQUFiLEVBQWlCQSxDQUFDLENBQUMsQ0FBRCxDQUFsQixDQUE1RixDQUExRCxJQUErSyxVQUFRRSxDQUFSLElBQVdELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3BCLElBQUksQ0FBQ3lRLElBQUwsQ0FBVXpRLElBQUksQ0FBQ2dHLEdBQUwsQ0FBU2hHLElBQUksQ0FBQ0MsR0FBTCxDQUFTa0IsQ0FBQyxDQUFDLENBQUQsQ0FBVixFQUFjLENBQUMsQ0FBZixDQUFULEVBQTJCLENBQTNCLENBQVYsQ0FBTCxFQUE4QyxTQUFPbkIsSUFBSSxDQUFDMFEsR0FBTCxDQUFTdlAsQ0FBQyxDQUFDLENBQUQsQ0FBVixDQUFQLElBQXVCQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtwQixJQUFJLENBQUMyUSxLQUFMLENBQVcsQ0FBQ3hQLENBQUMsQ0FBQyxDQUFELENBQWIsRUFBaUJBLENBQUMsQ0FBQyxDQUFELENBQWxCLENBQUwsRUFBNEJDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3BCLElBQUksQ0FBQzJRLEtBQUwsQ0FBVyxDQUFDeFAsQ0FBQyxDQUFDLENBQUQsQ0FBYixFQUFpQkEsQ0FBQyxDQUFDLENBQUQsQ0FBbEIsQ0FBeEQsS0FBaUZDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFMLEVBQU9BLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3BCLElBQUksQ0FBQzJRLEtBQUwsQ0FBV3hQLENBQUMsQ0FBQyxDQUFELENBQVosRUFBZ0JBLENBQUMsQ0FBQyxFQUFELENBQWpCLENBQTdGLENBQXpELElBQStLLFVBQVFFLENBQVIsS0FBWUQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLcEIsSUFBSSxDQUFDeVEsSUFBTCxDQUFVLENBQUN6USxJQUFJLENBQUNnRyxHQUFMLENBQVNoRyxJQUFJLENBQUNDLEdBQUwsQ0FBU2tCLENBQUMsQ0FBQyxDQUFELENBQVYsRUFBYyxDQUFDLENBQWYsQ0FBVCxFQUEyQixDQUEzQixDQUFYLENBQUwsRUFBK0MsU0FBT25CLElBQUksQ0FBQzBRLEdBQUwsQ0FBU3ZQLENBQUMsQ0FBQyxDQUFELENBQVYsQ0FBUCxJQUF1QkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLcEIsSUFBSSxDQUFDMlEsS0FBTCxDQUFXeFAsQ0FBQyxDQUFDLENBQUQsQ0FBWixFQUFnQkEsQ0FBQyxDQUFDLENBQUQsQ0FBakIsQ0FBTCxFQUEyQkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLcEIsSUFBSSxDQUFDMlEsS0FBTCxDQUFXeFAsQ0FBQyxDQUFDLENBQUQsQ0FBWixFQUFnQkEsQ0FBQyxDQUFDLENBQUQsQ0FBakIsQ0FBdkQsS0FBK0VDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3BCLElBQUksQ0FBQzJRLEtBQUwsQ0FBVyxDQUFDeFAsQ0FBQyxDQUFDLENBQUQsQ0FBYixFQUFpQkEsQ0FBQyxDQUFDLEVBQUQsQ0FBbEIsQ0FBTCxFQUE2QkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQWpILENBQTNELENBQTMyQjtBQUEyaEMsT0FBampDLENBQWtqQyxJQUFsakMsRUFBdWpDRCxDQUF2akMsRUFBeWpDQyxDQUF6akMsR0FBNGpDLElBQW5rQztBQUF3a0M7O0FBQUF5TyxJQUFBQSxjQUFjLENBQUMxTyxDQUFELEVBQUdDLENBQUMsR0FBQyxLQUFLME4sS0FBVixFQUFnQjtBQUFDLGFBQU93QixDQUFDLENBQUNULGNBQUYsQ0FBaUIxTyxDQUFqQixHQUFvQixLQUFLcVAsa0JBQUwsQ0FBd0JGLENBQXhCLEVBQTBCbFAsQ0FBMUIsQ0FBM0I7QUFBd0Q7O0FBQTdwRDs7QUFBOHBELFFBQU1hLENBQU4sQ0FBTztBQUFDdkgsSUFBQUEsV0FBVyxHQUFFO0FBQUMsV0FBS2tXLE1BQUwsR0FBWSxJQUFaLEVBQWlCLEtBQUtDLFFBQUwsR0FBYyxFQUEvQixFQUFrQyxLQUFLQyxPQUFMLEdBQWEsQ0FBQyxDQUFoRCxFQUFrRCxLQUFLQyxNQUFMLEdBQVksSUFBSTFQLENBQUosRUFBOUQsRUFBb0UsS0FBSzJQLFdBQUwsR0FBaUIsSUFBSTNQLENBQUosRUFBckYsRUFBMkYsS0FBSzRQLGdCQUFMLEdBQXNCLENBQUMsQ0FBbEgsRUFBb0gsS0FBSy9ULFFBQUwsR0FBYyxJQUFJa0UsQ0FBSixFQUFsSSxFQUF3SSxLQUFLOFAsVUFBTCxHQUFnQixJQUFJNVAsQ0FBSixFQUF4SixFQUE4SixLQUFLMEIsS0FBTCxHQUFXLElBQUk1QixDQUFKLENBQU0sQ0FBTixDQUF6SyxFQUFrTCxLQUFLK1AsUUFBTCxHQUFjLElBQUk1TixDQUFKLEVBQWhNLEVBQXNNLEtBQUs2TixFQUFMLEdBQVEsSUFBSWhRLENBQUosQ0FBTSxDQUFOLEVBQVEsQ0FBUixFQUFVLENBQVYsQ0FBOU0sRUFBMk4sS0FBSytQLFFBQUwsQ0FBYy9DLFFBQWQsR0FBdUIsTUFBSSxLQUFLOEMsVUFBTCxDQUFnQnJDLFNBQWhCLENBQTBCLEtBQUtzQyxRQUEvQixDQUF0UCxFQUErUixLQUFLRCxVQUFMLENBQWdCOUMsUUFBaEIsR0FBeUIsTUFBSSxLQUFLK0MsUUFBTCxDQUFjdEIsY0FBZCxDQUE2QixLQUFLcUIsVUFBbEMsQ0FBNVQ7QUFBMFc7O0FBQUFHLElBQUFBLFNBQVMsQ0FBQ2xRLENBQUQsRUFBR0MsQ0FBQyxHQUFDLENBQUMsQ0FBTixFQUFRO0FBQUNBLE1BQUFBLENBQUMsSUFBRSxLQUFLd1AsTUFBUixJQUFnQnpQLENBQUMsS0FBRyxLQUFLeVAsTUFBekIsSUFBaUMsS0FBS0EsTUFBTCxDQUFZVSxXQUFaLENBQXdCLElBQXhCLEVBQTZCLENBQUMsQ0FBOUIsQ0FBakMsRUFBa0UsS0FBS1YsTUFBTCxHQUFZelAsQ0FBOUUsRUFBZ0ZDLENBQUMsSUFBRUQsQ0FBSCxJQUFNQSxDQUFDLENBQUNvUSxRQUFGLENBQVcsSUFBWCxFQUFnQixDQUFDLENBQWpCLENBQXRGO0FBQTBHOztBQUFBQSxJQUFBQSxRQUFRLENBQUNwUSxDQUFELEVBQUdDLENBQUMsR0FBQyxDQUFDLENBQU4sRUFBUTtBQUFDLE9BQUMsS0FBS3lQLFFBQUwsQ0FBY1csT0FBZCxDQUFzQnJRLENBQXRCLENBQUQsSUFBMkIsS0FBSzBQLFFBQUwsQ0FBY2xFLElBQWQsQ0FBbUJ4TCxDQUFuQixDQUEzQixFQUFpREMsQ0FBQyxJQUFFRCxDQUFDLENBQUNrUSxTQUFGLENBQVksSUFBWixFQUFpQixDQUFDLENBQWxCLENBQXBEO0FBQXlFOztBQUFBQyxJQUFBQSxXQUFXLENBQUNuUSxDQUFELEVBQUdDLENBQUMsR0FBQyxDQUFDLENBQU4sRUFBUTtBQUFDLE9BQUMsS0FBS3lQLFFBQUwsQ0FBY1csT0FBZCxDQUFzQnJRLENBQXRCLENBQUQsSUFBMkIsS0FBSzBQLFFBQUwsQ0FBY1ksTUFBZCxDQUFxQixLQUFLWixRQUFMLENBQWNXLE9BQWQsQ0FBc0JyUSxDQUF0QixDQUFyQixFQUE4QyxDQUE5QyxDQUEzQixFQUE0RUMsQ0FBQyxJQUFFRCxDQUFDLENBQUNrUSxTQUFGLENBQVksSUFBWixFQUFpQixDQUFDLENBQWxCLENBQS9FO0FBQW9HOztBQUFBSyxJQUFBQSxpQkFBaUIsQ0FBQ3ZRLENBQUQsRUFBRztBQUFDLFdBQUs4UCxnQkFBTCxJQUF1QixLQUFLVSxZQUFMLEVBQXZCLEVBQTJDLENBQUMsS0FBS0Msc0JBQUwsSUFBNkJ6USxDQUE5QixNQUFtQyxTQUFPLEtBQUt5UCxNQUFaLEdBQW1CLEtBQUtJLFdBQUwsQ0FBaUIxUSxJQUFqQixDQUFzQixLQUFLeVEsTUFBM0IsQ0FBbkIsR0FBc0QsS0FBS0MsV0FBTCxDQUFpQjVPLFFBQWpCLENBQTBCLEtBQUt3TyxNQUFMLENBQVlJLFdBQXRDLEVBQWtELEtBQUtELE1BQXZELENBQXRELEVBQXFILEtBQUthLHNCQUFMLEdBQTRCLENBQUMsQ0FBbEosRUFBb0p6USxDQUFDLEdBQUMsQ0FBQyxDQUExTCxDQUEzQzs7QUFBd08sV0FBSSxJQUFJQyxDQUFDLEdBQUMsQ0FBTixFQUFRQyxDQUFDLEdBQUMsS0FBS3dQLFFBQUwsQ0FBYzNSLE1BQTVCLEVBQW1Da0MsQ0FBQyxHQUFDQyxDQUFyQyxFQUF1Q0QsQ0FBQyxFQUF4QyxFQUEyQyxLQUFLeVAsUUFBTCxDQUFjelAsQ0FBZCxFQUFpQnNRLGlCQUFqQixDQUFtQ3ZRLENBQW5DO0FBQXNDOztBQUFBd1EsSUFBQUEsWUFBWSxHQUFFO0FBQUMsV0FBS1osTUFBTCxDQUFZaEIsT0FBWixDQUFvQixLQUFLbUIsVUFBekIsRUFBb0MsS0FBS2hVLFFBQXpDLEVBQWtELEtBQUs4RixLQUF2RCxHQUE4RCxLQUFLNE8sc0JBQUwsR0FBNEIsQ0FBQyxDQUEzRjtBQUE2Rjs7QUFBQUMsSUFBQUEsUUFBUSxDQUFDelEsQ0FBRCxFQUFHO0FBQUMsVUFBRyxDQUFDQSxDQUFDLENBQUMsSUFBRCxDQUFMLEVBQVksS0FBSSxJQUFJRCxDQUFDLEdBQUMsQ0FBTixFQUFRRSxDQUFDLEdBQUMsS0FBS3dQLFFBQUwsQ0FBYzNSLE1BQTVCLEVBQW1DaUMsQ0FBQyxHQUFDRSxDQUFyQyxFQUF1Q0YsQ0FBQyxFQUF4QyxFQUEyQyxLQUFLMFAsUUFBTCxDQUFjMVAsQ0FBZCxFQUFpQjBRLFFBQWpCLENBQTBCelEsQ0FBMUI7QUFBNkI7O0FBQUEwUSxJQUFBQSxTQUFTLEdBQUU7QUFBQyxXQUFLZixNQUFMLENBQVlkLGNBQVosQ0FBMkIsS0FBSy9TLFFBQWhDLEdBQTBDLEtBQUs2VCxNQUFMLENBQVlmLFdBQVosQ0FBd0IsS0FBS2tCLFVBQTdCLENBQTFDLEVBQW1GLEtBQUtILE1BQUwsQ0FBWWIsVUFBWixDQUF1QixLQUFLbE4sS0FBNUIsQ0FBbkYsRUFBc0gsS0FBS21PLFFBQUwsQ0FBY3RCLGNBQWQsQ0FBNkIsS0FBS3FCLFVBQWxDLENBQXRIO0FBQW9LOztBQUFBZCxJQUFBQSxNQUFNLENBQUNqUCxDQUFELEVBQUdDLENBQUMsR0FBQyxDQUFDLENBQU4sRUFBUTtBQUFDQSxNQUFBQSxDQUFDLEdBQUMsS0FBSzJQLE1BQUwsQ0FBWVgsTUFBWixDQUFtQixLQUFLbFQsUUFBeEIsRUFBaUNpRSxDQUFqQyxFQUFtQyxLQUFLaVEsRUFBeEMsQ0FBRCxHQUE2QyxLQUFLTCxNQUFMLENBQVlYLE1BQVosQ0FBbUJqUCxDQUFuQixFQUFxQixLQUFLakUsUUFBMUIsRUFBbUMsS0FBS2tVLEVBQXhDLENBQTlDLEVBQTBGLEtBQUtMLE1BQUwsQ0FBWWYsV0FBWixDQUF3QixLQUFLa0IsVUFBN0IsQ0FBMUYsRUFBbUksS0FBS0MsUUFBTCxDQUFjdEIsY0FBZCxDQUE2QixLQUFLcUIsVUFBbEMsQ0FBbkk7QUFBaUw7O0FBQWpsRDs7QUFBa2xELE1BQUlhLENBQUMsR0FBQyxJQUFJMVEsQ0FBSixFQUFOO0FBQUEsTUFBWTJRLENBQUMsR0FBQyxJQUFJNVEsQ0FBSixFQUFkO0FBQUEsTUFBb0I2USxDQUFDLEdBQUMsSUFBSTdRLENBQUosRUFBdEI7O0FBQTRCLFdBQVM4USxDQUFULENBQVcvUSxDQUFYLEVBQWFDLENBQWIsRUFBZUMsQ0FBZixFQUFpQjtBQUFDLFFBQUlDLENBQUMsR0FBQ0YsQ0FBQyxDQUFDLENBQUQsQ0FBUDtBQUFBLFFBQVdyQyxDQUFDLEdBQUNxQyxDQUFDLENBQUMsQ0FBRCxDQUFkO0FBQUEsUUFBa0JPLENBQUMsR0FBQ1AsQ0FBQyxDQUFDLENBQUQsQ0FBckI7QUFBQSxRQUF5QmEsQ0FBQyxHQUFDYixDQUFDLENBQUMsQ0FBRCxDQUE1QjtBQUFBLFFBQWdDdUIsQ0FBQyxHQUFDdkIsQ0FBQyxDQUFDLENBQUQsQ0FBbkM7QUFBQSxRQUF1Q3dCLENBQUMsR0FBQ3hCLENBQUMsQ0FBQyxDQUFELENBQTFDO0FBQUEsUUFBOENzQixDQUFDLEdBQUN0QixDQUFDLENBQUMsQ0FBRCxDQUFqRDtBQUFBLFFBQXFEMkIsQ0FBQyxHQUFDM0IsQ0FBQyxDQUFDLENBQUQsQ0FBeEQ7QUFBQSxRQUE0RG1DLENBQUMsR0FBQ25DLENBQUMsQ0FBQyxDQUFELENBQS9EO0FBQUEsUUFBbUV1QyxDQUFDLEdBQUN0QyxDQUFDLENBQUMsQ0FBRCxDQUF0RTtBQUFBLFFBQTBFbUMsQ0FBQyxHQUFDbkMsQ0FBQyxDQUFDLENBQUQsQ0FBN0U7QUFBQSxRQUFpRm9DLENBQUMsR0FBQ3BDLENBQUMsQ0FBQyxDQUFELENBQXBGO0FBQUEsUUFBd0ZxQyxDQUFDLEdBQUNyQyxDQUFDLENBQUMsQ0FBRCxDQUEzRjtBQUFBLFFBQStGaUMsQ0FBQyxHQUFDakMsQ0FBQyxDQUFDLENBQUQsQ0FBbEc7QUFBQSxRQUFzR3FILENBQUMsR0FBQ3JILENBQUMsQ0FBQyxDQUFELENBQXpHO0FBQUEsUUFBNkd1SCxDQUFDLEdBQUN2SCxDQUFDLENBQUMsQ0FBRCxDQUFoSDtBQUFBLFFBQW9IakIsQ0FBQyxHQUFDaUIsQ0FBQyxDQUFDLENBQUQsQ0FBdkg7QUFBQSxRQUEySEcsQ0FBQyxHQUFDSCxDQUFDLENBQUMsQ0FBRCxDQUE5SDtBQUFrSSxXQUFPRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUt3QyxDQUFDLEdBQUNyQyxDQUFGLEdBQUlrQyxDQUFDLEdBQUN2QixDQUFOLEdBQVF3QixDQUFDLEdBQUNmLENBQWYsRUFBaUJ2QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUt3QyxDQUFDLEdBQUM1RSxDQUFGLEdBQUl5RSxDQUFDLEdBQUNiLENBQU4sR0FBUWMsQ0FBQyxHQUFDVixDQUFoQyxFQUFrQzVCLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3dDLENBQUMsR0FBQ2hDLENBQUYsR0FBSTZCLENBQUMsR0FBQ1osQ0FBTixHQUFRYSxDQUFDLEdBQUNGLENBQWpELEVBQW1EcEMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLdUMsQ0FBQyxHQUFDcEMsQ0FBRixHQUFJZ0MsQ0FBQyxHQUFDckIsQ0FBTixHQUFReUcsQ0FBQyxHQUFDaEcsQ0FBbEUsRUFBb0V2QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUt1QyxDQUFDLEdBQUMzRSxDQUFGLEdBQUl1RSxDQUFDLEdBQUNYLENBQU4sR0FBUStGLENBQUMsR0FBQzNGLENBQW5GLEVBQXFGNUIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLdUMsQ0FBQyxHQUFDL0IsQ0FBRixHQUFJMkIsQ0FBQyxHQUFDVixDQUFOLEdBQVE4RixDQUFDLEdBQUNuRixDQUFwRyxFQUFzR3BDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3lILENBQUMsR0FBQ3RILENBQUYsR0FBSWxCLENBQUMsR0FBQzZCLENBQU4sR0FBUVQsQ0FBQyxHQUFDa0IsQ0FBckgsRUFBdUh2QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUt5SCxDQUFDLEdBQUM3SixDQUFGLEdBQUlxQixDQUFDLEdBQUN1QyxDQUFOLEdBQVFuQixDQUFDLEdBQUN1QixDQUF0SSxFQUF3STVCLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3lILENBQUMsR0FBQ2pILENBQUYsR0FBSXZCLENBQUMsR0FBQ3dDLENBQU4sR0FBUXBCLENBQUMsR0FBQytCLENBQXZKLEVBQXlKcEMsQ0FBaEs7QUFBa0s7O0FBQUEsUUFBTXdDLENBQU4sU0FBZ0IzQixLQUFoQixDQUFxQjtBQUFDdEgsSUFBQUEsV0FBVyxDQUFDeUcsQ0FBQyxHQUFDLENBQUgsRUFBS0MsQ0FBQyxHQUFDLENBQVAsRUFBU0MsQ0FBQyxHQUFDLENBQVgsRUFBYUMsQ0FBQyxHQUFDLENBQWYsRUFBaUJ2QyxDQUFDLEdBQUMsQ0FBbkIsRUFBcUI0QyxDQUFDLEdBQUMsQ0FBdkIsRUFBeUJNLENBQUMsR0FBQyxDQUEzQixFQUE2QlUsQ0FBQyxHQUFDLENBQS9CLEVBQWlDQyxDQUFDLEdBQUMsQ0FBbkMsRUFBcUM7QUFBQyxhQUFPLE1BQU16QixDQUFOLEVBQVFDLENBQVIsRUFBVUMsQ0FBVixFQUFZQyxDQUFaLEVBQWN2QyxDQUFkLEVBQWdCNEMsQ0FBaEIsRUFBa0JNLENBQWxCLEVBQW9CVSxDQUFwQixFQUFzQkMsQ0FBdEIsR0FBeUIsSUFBaEM7QUFBcUM7O0FBQUFyRCxJQUFBQSxHQUFHLENBQUM2QixDQUFELEVBQUdtQyxDQUFILEVBQUtJLENBQUwsRUFBT0gsQ0FBUCxFQUFTQyxDQUFULEVBQVdDLENBQVgsRUFBYUosQ0FBYixFQUFlb0YsQ0FBZixFQUFpQkUsQ0FBakIsRUFBbUI7QUFBQyxVQUFJekgsQ0FBSixFQUFNRSxDQUFOLEVBQVFDLENBQVIsRUFBVXZDLENBQVYsRUFBWTRDLENBQVosRUFBY00sQ0FBZCxFQUFnQlUsQ0FBaEIsRUFBa0JDLENBQWxCLEVBQW9CRixDQUFwQixFQUFzQkssQ0FBdEI7QUFBd0IsYUFBTzNCLENBQUMsQ0FBQ2xDLE1BQUYsR0FBUyxLQUFLb0IsSUFBTCxDQUFVYyxDQUFWLENBQVQsSUFBdUJELENBQUMsR0FBQyxJQUFGLEVBQU9FLENBQUMsR0FBQ0QsQ0FBVCxFQUFXRSxDQUFDLEdBQUNpQyxDQUFiLEVBQWV4RSxDQUFDLEdBQUM0RSxDQUFqQixFQUFtQmhDLENBQUMsR0FBQzZCLENBQXJCLEVBQXVCdkIsQ0FBQyxHQUFDd0IsQ0FBekIsRUFBMkJkLENBQUMsR0FBQ2UsQ0FBN0IsRUFBK0JkLENBQUMsR0FBQ1UsQ0FBakMsRUFBbUNaLENBQUMsR0FBQ2dHLENBQXJDLEVBQXVDM0YsQ0FBQyxHQUFDNkYsQ0FBekMsRUFBMkN6SCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtFLENBQWhELEVBQWtERixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtHLENBQXZELEVBQXlESCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtwQyxDQUE5RCxFQUFnRW9DLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS1EsQ0FBckUsRUFBdUVSLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS2MsQ0FBNUUsRUFBOEVkLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3dCLENBQW5GLEVBQXFGeEIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLeUIsQ0FBMUYsRUFBNEZ6QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUt1QixDQUFqRyxFQUFtR3ZCLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSzRCLENBQXhHLEVBQTBHLElBQWpJLENBQVA7QUFBOEk7O0FBQUFtTSxJQUFBQSxTQUFTLENBQUN6TCxDQUFELEVBQUdDLENBQUMsR0FBQyxJQUFMLEVBQVU7QUFBQyxVQUFJdkMsQ0FBSixFQUFNQyxDQUFOLEVBQVFyQyxDQUFSO0FBQVUsVUFBSTRDLENBQUosRUFBTU0sQ0FBTixFQUFRVSxDQUFSLEVBQVVDLENBQVYsRUFBWUYsQ0FBWixFQUFjSyxDQUFkLEVBQWdCUSxDQUFoQixFQUFrQkksQ0FBbEIsRUFBb0JILENBQXBCLEVBQXNCbkMsQ0FBdEIsRUFBd0JDLENBQXhCO0FBQTBCLGFBQU9ILENBQUMsR0FBQyxJQUFGLEVBQU9DLENBQUMsR0FBQ3NDLENBQVQsRUFBVzNFLENBQUMsR0FBQzBFLENBQWIsRUFBZTlCLENBQUMsR0FBQ1AsQ0FBQyxDQUFDLENBQUQsQ0FBbEIsRUFBc0JhLENBQUMsR0FBQ2IsQ0FBQyxDQUFDLENBQUQsQ0FBekIsRUFBNkJ1QixDQUFDLEdBQUN2QixDQUFDLENBQUMsQ0FBRCxDQUFoQyxFQUFvQ3dCLENBQUMsR0FBQ3hCLENBQUMsQ0FBQyxDQUFELENBQXZDLEVBQTJDc0IsQ0FBQyxHQUFDdEIsQ0FBQyxDQUFDLENBQUQsQ0FBOUMsRUFBa0QyQixDQUFDLEdBQUMzQixDQUFDLENBQUMsQ0FBRCxDQUFyRCxFQUF5RG1DLENBQUMsR0FBQ25DLENBQUMsQ0FBQyxDQUFELENBQTVELEVBQWdFdUMsQ0FBQyxHQUFDdkMsQ0FBQyxDQUFDLENBQUQsQ0FBbkUsRUFBdUVvQyxDQUFDLEdBQUNwQyxDQUFDLENBQUMsQ0FBRCxDQUExRSxFQUE4RUMsQ0FBQyxHQUFDdEMsQ0FBQyxDQUFDLENBQUQsQ0FBakYsRUFBcUZ1QyxDQUFDLEdBQUN2QyxDQUFDLENBQUMsQ0FBRCxDQUF4RixFQUE0Rm9DLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS1EsQ0FBakcsRUFBbUdSLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS2MsQ0FBeEcsRUFBMEdkLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3dCLENBQS9HLEVBQWlIeEIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLeUIsQ0FBdEgsRUFBd0h6QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUt1QixDQUE3SCxFQUErSHZCLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSzRCLENBQXBJLEVBQXNJNUIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRSxDQUFDLEdBQUNNLENBQUYsR0FBSUwsQ0FBQyxHQUFDc0IsQ0FBTixHQUFRVyxDQUFuSixFQUFxSnBDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0UsQ0FBQyxHQUFDWSxDQUFGLEdBQUlYLENBQUMsR0FBQ29CLENBQU4sR0FBUWlCLENBQWxLLEVBQW9LeEMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRSxDQUFDLEdBQUNzQixDQUFGLEdBQUlyQixDQUFDLEdBQUN5QixDQUFOLEdBQVFTLENBQWpMLEVBQW1MLElBQTFMO0FBQStMOztBQUFBMk8sSUFBQUEsTUFBTSxDQUFDMU8sQ0FBRCxFQUFHQyxDQUFDLEdBQUMsSUFBTCxFQUFVO0FBQUMsVUFBSXZDLENBQUosRUFBTUMsQ0FBTixFQUFRckMsQ0FBUjtBQUFVLFVBQUk0QyxDQUFKLEVBQU1NLENBQU4sRUFBUVUsQ0FBUixFQUFVQyxDQUFWLEVBQVlGLENBQVosRUFBY0ssQ0FBZCxFQUFnQlEsQ0FBaEIsRUFBa0JJLENBQWxCLEVBQW9CSCxDQUFwQixFQUFzQm5DLENBQXRCLEVBQXdCQyxDQUF4QjtBQUEwQixhQUFPSCxDQUFDLEdBQUMsSUFBRixFQUFPQyxDQUFDLEdBQUNzQyxDQUFULEVBQVczRSxDQUFDLEdBQUMwRSxDQUFiLEVBQWU5QixDQUFDLEdBQUNQLENBQUMsQ0FBQyxDQUFELENBQWxCLEVBQXNCYSxDQUFDLEdBQUNiLENBQUMsQ0FBQyxDQUFELENBQXpCLEVBQTZCdUIsQ0FBQyxHQUFDdkIsQ0FBQyxDQUFDLENBQUQsQ0FBaEMsRUFBb0N3QixDQUFDLEdBQUN4QixDQUFDLENBQUMsQ0FBRCxDQUF2QyxFQUEyQ3NCLENBQUMsR0FBQ3RCLENBQUMsQ0FBQyxDQUFELENBQTlDLEVBQWtEMkIsQ0FBQyxHQUFDM0IsQ0FBQyxDQUFDLENBQUQsQ0FBckQsRUFBeURtQyxDQUFDLEdBQUNuQyxDQUFDLENBQUMsQ0FBRCxDQUE1RCxFQUFnRXVDLENBQUMsR0FBQ3ZDLENBQUMsQ0FBQyxDQUFELENBQW5FLEVBQXVFb0MsQ0FBQyxHQUFDcEMsQ0FBQyxDQUFDLENBQUQsQ0FBMUUsRUFBOEVDLENBQUMsR0FBQ3JCLElBQUksQ0FBQ3VPLEdBQUwsQ0FBU3hQLENBQVQsQ0FBaEYsRUFBNEZ1QyxDQUFDLEdBQUN0QixJQUFJLENBQUN3TyxHQUFMLENBQVN6UCxDQUFULENBQTlGLEVBQTBHb0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRyxDQUFDLEdBQUNLLENBQUYsR0FBSU4sQ0FBQyxHQUFDdUIsQ0FBckgsRUFBdUh6QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtHLENBQUMsR0FBQ1csQ0FBRixHQUFJWixDQUFDLEdBQUNxQixDQUFsSSxFQUFvSXZCLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0csQ0FBQyxHQUFDcUIsQ0FBRixHQUFJdEIsQ0FBQyxHQUFDMEIsQ0FBL0ksRUFBaUo1QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtHLENBQUMsR0FBQ3NCLENBQUYsR0FBSXZCLENBQUMsR0FBQ00sQ0FBNUosRUFBOEpSLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0csQ0FBQyxHQUFDb0IsQ0FBRixHQUFJckIsQ0FBQyxHQUFDWSxDQUF6SyxFQUEyS2QsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRyxDQUFDLEdBQUN5QixDQUFGLEdBQUkxQixDQUFDLEdBQUNzQixDQUF0TCxFQUF3THhCLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS29DLENBQTdMLEVBQStMcEMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLd0MsQ0FBcE0sRUFBc014QyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtxQyxDQUEzTSxFQUE2TSxJQUFwTjtBQUF5Tjs7QUFBQVIsSUFBQUEsS0FBSyxDQUFDckIsQ0FBRCxFQUFHTSxDQUFDLEdBQUMsSUFBTCxFQUFVO0FBQUMsVUFBSWQsQ0FBSixFQUFNQyxDQUFOLEVBQVFyQyxDQUFSO0FBQVUsVUFBSXNDLENBQUosRUFBTUMsQ0FBTjtBQUFRLGFBQU9ILENBQUMsR0FBQyxJQUFGLEVBQU9DLENBQUMsR0FBQ2EsQ0FBVCxFQUFXWixDQUFDLEdBQUMsQ0FBQ3RDLENBQUMsR0FBQzRDLENBQUgsRUFBTSxDQUFOLENBQWIsRUFBc0JMLENBQUMsR0FBQ3ZDLENBQUMsQ0FBQyxDQUFELENBQXpCLEVBQTZCb0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRSxDQUFDLEdBQUNELENBQUMsQ0FBQyxDQUFELENBQXJDLEVBQXlDRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtFLENBQUMsR0FBQ0QsQ0FBQyxDQUFDLENBQUQsQ0FBakQsRUFBcURELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0UsQ0FBQyxHQUFDRCxDQUFDLENBQUMsQ0FBRCxDQUE3RCxFQUFpRUQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRyxDQUFDLEdBQUNGLENBQUMsQ0FBQyxDQUFELENBQXpFLEVBQTZFRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtHLENBQUMsR0FBQ0YsQ0FBQyxDQUFDLENBQUQsQ0FBckYsRUFBeUZELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0csQ0FBQyxHQUFDRixDQUFDLENBQUMsQ0FBRCxDQUFqRyxFQUFxR0QsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFDLENBQUMsQ0FBRCxDQUEzRyxFQUErR0QsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFDLENBQUMsQ0FBRCxDQUFySCxFQUF5SEQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFDLENBQUMsQ0FBRCxDQUEvSCxFQUFtSSxJQUExSTtBQUErSTs7QUFBQWdCLElBQUFBLFFBQVEsQ0FBQ2pCLENBQUQsRUFBR0MsQ0FBSCxFQUFLO0FBQUMsYUFBT0EsQ0FBQyxHQUFDOFEsQ0FBQyxDQUFDLElBQUQsRUFBTS9RLENBQU4sRUFBUUMsQ0FBUixDQUFGLEdBQWE4USxDQUFDLENBQUMsSUFBRCxFQUFNLElBQU4sRUFBVy9RLENBQVgsQ0FBZixFQUE2QixJQUFwQztBQUF5Qzs7QUFBQWtOLElBQUFBLFFBQVEsR0FBRTtBQUFDLFVBQUlsTixDQUFKO0FBQU0sYUFBTSxDQUFDQSxDQUFDLEdBQUMsSUFBSCxFQUFTLENBQVQsSUFBWSxDQUFaLEVBQWNBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFuQixFQUFxQkEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQTFCLEVBQTRCQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBakMsRUFBbUNBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUF4QyxFQUEwQ0EsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQS9DLEVBQWlEQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBdEQsRUFBd0RBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUE3RCxFQUErREEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQXBFLEVBQXNFLElBQTVFO0FBQWlGOztBQUFBYixJQUFBQSxJQUFJLENBQUNlLENBQUQsRUFBRztBQUFDLFVBQUlELENBQUosRUFBTUQsQ0FBTjtBQUFRLGFBQU9BLENBQUMsR0FBQ0UsQ0FBRixFQUFJLENBQUNELENBQUMsR0FBQyxJQUFILEVBQVMsQ0FBVCxJQUFZRCxDQUFDLENBQUMsQ0FBRCxDQUFqQixFQUFxQkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUEzQixFQUErQkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUFyQyxFQUF5Q0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUEvQyxFQUFtREMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUF6RCxFQUE2REMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUFuRSxFQUF1RUMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUE3RSxFQUFpRkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUF2RixFQUEyRkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUFqRyxFQUFxRyxJQUE1RztBQUFpSDs7QUFBQWlSLElBQUFBLFdBQVcsQ0FBQy9RLENBQUQsRUFBRztBQUFDLFVBQUlELENBQUosRUFBTUQsQ0FBTjtBQUFRLGFBQU9BLENBQUMsR0FBQ0UsQ0FBRixFQUFJLENBQUNELENBQUMsR0FBQyxJQUFILEVBQVMsQ0FBVCxJQUFZRCxDQUFDLENBQUMsQ0FBRCxDQUFqQixFQUFxQkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUEzQixFQUErQkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUFyQyxFQUF5Q0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUEvQyxFQUFtREMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUF6RCxFQUE2REMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUFuRSxFQUF1RUMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUE3RSxFQUFpRkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUF2RixFQUEyRkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsRUFBRCxDQUFqRyxFQUFzRyxJQUE3RztBQUFrSDs7QUFBQTBPLElBQUFBLGNBQWMsQ0FBQ2pILENBQUQsRUFBRztBQUFDLFVBQUl6SCxDQUFKLEVBQU1wQyxDQUFOO0FBQVEsVUFBSTRDLENBQUosRUFBTU4sQ0FBTixFQUFRRCxDQUFSLEVBQVVhLENBQVYsRUFBWVgsQ0FBWixFQUFjcUIsQ0FBZCxFQUFnQkMsQ0FBaEIsRUFBa0JGLENBQWxCLEVBQW9CSyxDQUFwQixFQUFzQlEsQ0FBdEIsRUFBd0JJLENBQXhCLEVBQTBCSCxDQUExQixFQUE0QkMsQ0FBNUIsRUFBOEJDLENBQTlCLEVBQWdDSixDQUFoQyxFQUFrQ29GLENBQWxDO0FBQW9DLGFBQU92SCxDQUFDLEdBQUMsSUFBRixFQUFPUSxDQUFDLEdBQUMsQ0FBQzVDLENBQUMsR0FBQzZKLENBQUgsRUFBTSxDQUFOLENBQVQsRUFBa0J2SCxDQUFDLEdBQUN0QyxDQUFDLENBQUMsQ0FBRCxDQUFyQixFQUF5QnFDLENBQUMsR0FBQ3JDLENBQUMsQ0FBQyxDQUFELENBQTVCLEVBQWdDa0QsQ0FBQyxHQUFDbEQsQ0FBQyxDQUFDLENBQUQsQ0FBbkMsRUFBdUN1QyxDQUFDLEdBQUNLLENBQUMsR0FBQ0EsQ0FBM0MsRUFBNkNnQixDQUFDLEdBQUN0QixDQUFDLEdBQUNBLENBQWpELEVBQW1EdUIsQ0FBQyxHQUFDeEIsQ0FBQyxHQUFDQSxDQUF2RCxFQUF5RHNCLENBQUMsR0FBQ2YsQ0FBQyxHQUFDTCxDQUE3RCxFQUErRHlCLENBQUMsR0FBQzFCLENBQUMsR0FBQ0MsQ0FBbkUsRUFBcUVpQyxDQUFDLEdBQUNsQyxDQUFDLEdBQUNzQixDQUF6RSxFQUEyRWdCLENBQUMsR0FBQ3ZDLENBQUMsR0FBQ0UsQ0FBL0UsRUFBaUZrQyxDQUFDLEdBQUNwQyxDQUFDLEdBQUN1QixDQUFyRixFQUF1RmMsQ0FBQyxHQUFDckMsQ0FBQyxHQUFDd0IsQ0FBM0YsRUFBNkZjLENBQUMsR0FBQ3pCLENBQUMsR0FBQ1gsQ0FBakcsRUFBbUdnQyxDQUFDLEdBQUNyQixDQUFDLEdBQUNVLENBQXZHLEVBQXlHK0YsQ0FBQyxHQUFDekcsQ0FBQyxHQUFDVyxDQUE3RyxFQUErR3pCLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxJQUFFb0MsQ0FBRixHQUFJRSxDQUF4SCxFQUEwSHRDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSzRCLENBQUMsR0FBQzJGLENBQWpJLEVBQW1JdkgsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLd0MsQ0FBQyxHQUFDTCxDQUExSSxFQUE0SW5DLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSzRCLENBQUMsR0FBQzJGLENBQW5KLEVBQXFKdkgsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLElBQUV1QixDQUFGLEdBQUllLENBQTlKLEVBQWdLdEMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLcUMsQ0FBQyxHQUFDRSxDQUF2SyxFQUF5S3ZDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3dDLENBQUMsR0FBQ0wsQ0FBaEwsRUFBa0xuQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtxQyxDQUFDLEdBQUNFLENBQXpMLEVBQTJMdkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLElBQUV1QixDQUFGLEdBQUlhLENBQXBNLEVBQXNNLElBQTdNO0FBQWtOOztBQUFBOE8sSUFBQUEsU0FBUyxDQUFDbFIsQ0FBRCxFQUFHQyxDQUFILEVBQUtDLENBQUwsRUFBTztBQUFDLGFBQU8sS0FBSzlCLEdBQUwsQ0FBUzRCLENBQUMsQ0FBQyxDQUFELENBQVYsRUFBY0EsQ0FBQyxDQUFDLENBQUQsQ0FBZixFQUFtQkEsQ0FBQyxDQUFDLENBQUQsQ0FBcEIsRUFBd0JDLENBQUMsQ0FBQyxDQUFELENBQXpCLEVBQTZCQSxDQUFDLENBQUMsQ0FBRCxDQUE5QixFQUFrQ0EsQ0FBQyxDQUFDLENBQUQsQ0FBbkMsRUFBdUNDLENBQUMsQ0FBQyxDQUFELENBQXhDLEVBQTRDQSxDQUFDLENBQUMsQ0FBRCxDQUE3QyxFQUFpREEsQ0FBQyxDQUFDLENBQUQsQ0FBbEQsR0FBdUQsSUFBOUQ7QUFBbUU7O0FBQUFpQixJQUFBQSxPQUFPLENBQUNvQixDQUFDLEdBQUMsSUFBSCxFQUFRO0FBQUMsVUFBSXRDLENBQUosRUFBTUMsQ0FBTjtBQUFRLFVBQUlDLENBQUosRUFBTXZDLENBQU4sRUFBUTRDLENBQVIsRUFBVU0sQ0FBVixFQUFZVSxDQUFaLEVBQWNDLENBQWQsRUFBZ0JGLENBQWhCLEVBQWtCSyxDQUFsQixFQUFvQlEsQ0FBcEIsRUFBc0JJLENBQXRCLEVBQXdCSCxDQUF4QixFQUEwQkMsQ0FBMUIsRUFBNEJ0QyxDQUE1QjtBQUE4QixhQUFPQyxDQUFDLEdBQUMsSUFBRixFQUFPRSxDQUFDLEdBQUMsQ0FBQ0QsQ0FBQyxHQUFDcUMsQ0FBSCxFQUFNLENBQU4sQ0FBVCxFQUFrQjNFLENBQUMsR0FBQ3NDLENBQUMsQ0FBQyxDQUFELENBQXJCLEVBQXlCTSxDQUFDLEdBQUNOLENBQUMsQ0FBQyxDQUFELENBQTVCLEVBQWdDWSxDQUFDLEdBQUNaLENBQUMsQ0FBQyxDQUFELENBQW5DLEVBQXVDc0IsQ0FBQyxHQUFDdEIsQ0FBQyxDQUFDLENBQUQsQ0FBMUMsRUFBOEN1QixDQUFDLEdBQUN2QixDQUFDLENBQUMsQ0FBRCxDQUFqRCxFQUFxRHFCLENBQUMsR0FBQ3JCLENBQUMsQ0FBQyxDQUFELENBQXhELEVBQTREMEIsQ0FBQyxHQUFDMUIsQ0FBQyxDQUFDLENBQUQsQ0FBL0QsRUFBbUVrQyxDQUFDLEdBQUNsQyxDQUFDLENBQUMsQ0FBRCxDQUF0RSxFQUEwRXNDLENBQUMsR0FBQ0osQ0FBQyxHQUFDWixDQUFGLEdBQUlDLENBQUMsR0FBQ0csQ0FBbEYsRUFBb0ZTLENBQUMsR0FBQyxDQUFDRCxDQUFELEdBQUd0QixDQUFILEdBQUtXLENBQUMsR0FBQ0YsQ0FBN0YsRUFBK0ZlLENBQUMsR0FBQ1YsQ0FBQyxHQUFDZCxDQUFGLEdBQUlVLENBQUMsR0FBQ0QsQ0FBdkcsRUFBeUd2QixDQUFDLEdBQUNHLENBQUMsR0FBQ3FDLENBQUYsR0FBSTVFLENBQUMsR0FBQ3lFLENBQU4sR0FBUTdCLENBQUMsR0FBQzhCLENBQXJILEVBQXVIdEMsQ0FBQyxLQUFHQSxDQUFDLEdBQUMsSUFBRUEsQ0FBSixFQUFNQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUt1QyxDQUFDLEdBQUN4QyxDQUFiLEVBQWVDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDLENBQUNtQyxDQUFELEdBQUd4RSxDQUFILEdBQUs0QyxDQUFDLEdBQUNvQixDQUFSLElBQVc1QixDQUEvQixFQUFpQ0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUN3QixDQUFDLEdBQUM3RCxDQUFGLEdBQUk0QyxDQUFDLEdBQUNnQixDQUFQLElBQVV4QixDQUFoRCxFQUFrREMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLb0MsQ0FBQyxHQUFDckMsQ0FBekQsRUFBMkRDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDbUMsQ0FBQyxHQUFDakMsQ0FBRixHQUFJSyxDQUFDLEdBQUNlLENBQVAsSUFBVXZCLENBQTFFLEVBQTRFQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQyxDQUFDd0IsQ0FBRCxHQUFHdEIsQ0FBSCxHQUFLSyxDQUFDLEdBQUNNLENBQVIsSUFBV2QsQ0FBNUYsRUFBOEZDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3FDLENBQUMsR0FBQ3RDLENBQXJHLEVBQXVHQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQyxDQUFDMkIsQ0FBRCxHQUFHekIsQ0FBSCxHQUFLdkMsQ0FBQyxHQUFDMkQsQ0FBUixJQUFXdkIsQ0FBdkgsRUFBeUhDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDdUIsQ0FBQyxHQUFDckIsQ0FBRixHQUFJdkMsQ0FBQyxHQUFDa0QsQ0FBUCxJQUFVZCxDQUEzSSxDQUF4SCxFQUFzUSxJQUE3UTtBQUFrUjs7QUFBQW1SLElBQUFBLGVBQWUsQ0FBQ3JLLENBQUQsRUFBRztBQUFDLFVBQUk1RyxDQUFKLEVBQU1GLENBQU47O0FBQVEsVUFBSWMsQ0FBSixFQUFNVSxDQUFOLEVBQVFDLENBQVIsRUFBVXRCLENBQVYsRUFBWW9CLENBQVosRUFBY0ssQ0FBZCxFQUFnQlEsQ0FBaEIsRUFBa0J4RSxDQUFsQixFQUFvQjZKLENBQXBCLEVBQXNCeEksQ0FBdEIsRUFBd0JvQixDQUF4QixFQUEwQkMsQ0FBMUIsRUFBNEJrQyxDQUE1QixFQUE4QkgsQ0FBOUIsRUFBZ0NDLENBQWhDLEVBQWtDOUIsQ0FBbEMsRUFBb0NzQyxDQUFwQyxFQUFzQ0MsQ0FBdEMsRUFBd0N4QyxDQUF4QyxFQUEwQ3lDLENBQTFDLEVBQTRDaEYsQ0FBNUMsRUFBOENFLENBQTlDLEVBQWdEdUMsQ0FBaEQsRUFBa0RDLENBQWxELEVBQW9ENkIsQ0FBcEQsRUFBc0R3SyxDQUF0RCxFQUF3RDVLLENBQXhELEVBQTBEb0YsQ0FBMUQsRUFBNER0SCxDQUE1RDs7QUFBOEQsYUFBT0MsQ0FBQyxHQUFDLElBQUYsRUFBT1ksQ0FBQyxHQUFDLENBQUNkLENBQUMsR0FBQzhHLENBQUgsRUFBTSxDQUFOLENBQVQsRUFBa0J0RixDQUFDLEdBQUN4QixDQUFDLENBQUMsQ0FBRCxDQUFyQixFQUF5QnlCLENBQUMsR0FBQ3pCLENBQUMsQ0FBQyxDQUFELENBQTVCLEVBQWdDRyxDQUFDLEdBQUNILENBQUMsQ0FBQyxDQUFELENBQW5DLEVBQXVDdUIsQ0FBQyxHQUFDdkIsQ0FBQyxDQUFDLENBQUQsQ0FBMUMsRUFBOEM0QixDQUFDLEdBQUM1QixDQUFDLENBQUMsQ0FBRCxDQUFqRCxFQUFxRG9DLENBQUMsR0FBQ3BDLENBQUMsQ0FBQyxDQUFELENBQXhELEVBQTREcEMsQ0FBQyxHQUFDb0MsQ0FBQyxDQUFDLENBQUQsQ0FBL0QsRUFBbUV5SCxDQUFDLEdBQUN6SCxDQUFDLENBQUMsQ0FBRCxDQUF0RSxFQUEwRWYsQ0FBQyxHQUFDZSxDQUFDLENBQUMsQ0FBRCxDQUE3RSxFQUFpRkssQ0FBQyxHQUFDTCxDQUFDLENBQUMsRUFBRCxDQUFwRixFQUF5Rk0sQ0FBQyxHQUFDTixDQUFDLENBQUMsRUFBRCxDQUE1RixFQUFpR3dDLENBQUMsR0FBQ3hDLENBQUMsQ0FBQyxFQUFELENBQXBHLEVBQXlHcUMsQ0FBQyxHQUFDckMsQ0FBQyxDQUFDLEVBQUQsQ0FBNUcsRUFBaUhzQyxDQUFDLEdBQUN0QyxDQUFDLENBQUMsRUFBRCxDQUFwSCxFQUF5SFEsQ0FBQyxHQUFDUixDQUFDLENBQUMsRUFBRCxDQUE1SCxFQUFpSThDLENBQUMsR0FBQ2hDLENBQUMsR0FBQ2MsQ0FBRixHQUFJSixDQUFDLEdBQUNELENBQXpJLEVBQTJJd0IsQ0FBQyxHQUFDakMsQ0FBQyxHQUFDc0IsQ0FBRixHQUFJWCxDQUFDLEdBQUNGLENBQW5KLEVBQXFKaEIsQ0FBQyxHQUFDTyxDQUFDLEdBQUNsRCxDQUFGLEdBQUl1QyxDQUFDLEdBQUNvQixDQUE3SixFQUErSnlCLENBQUMsR0FBQ3hCLENBQUMsR0FBQ1ksQ0FBRixHQUFJWCxDQUFDLEdBQUNHLENBQXZLLEVBQXlLNUQsQ0FBQyxHQUFDd0QsQ0FBQyxHQUFDNUQsQ0FBRixHQUFJdUMsQ0FBQyxHQUFDeUIsQ0FBakwsRUFBbUwxRCxDQUFDLEdBQUN1RCxDQUFDLEdBQUM3RCxDQUFGLEdBQUl1QyxDQUFDLEdBQUNpQyxDQUEzTCxFQUE2TDNCLENBQUMsR0FBQ2dILENBQUMsR0FBQ3BGLENBQUYsR0FBSXBELENBQUMsR0FBQ3VELENBQXJNLEVBQXVNOUIsQ0FBQyxHQUFDK0csQ0FBQyxHQUFDbkYsQ0FBRixHQUFJakMsQ0FBQyxHQUFDbUMsQ0FBL00sRUFBaU5ELENBQUMsR0FBQ2tGLENBQUMsR0FBQ2pILENBQUYsR0FBSUYsQ0FBQyxHQUFDa0MsQ0FBek4sRUFBMk51SyxDQUFDLEdBQUM5TixDQUFDLEdBQUNxRCxDQUFGLEdBQUlqQyxDQUFDLEdBQUNnQyxDQUFuTyxFQUFxT0YsQ0FBQyxHQUFDbEQsQ0FBQyxHQUFDdUIsQ0FBRixHQUFJRixDQUFDLEdBQUMrQixDQUE3TyxFQUErT2tGLENBQUMsR0FBQ2xILENBQUMsR0FBQ0csQ0FBRixHQUFJRixDQUFDLEdBQUNnQyxDQUF2UCxFQUF5UHJDLENBQUMsR0FBQzZDLENBQUMsR0FBQ3lFLENBQUYsR0FBSXhFLENBQUMsR0FBQ1osQ0FBTixHQUFRNUIsQ0FBQyxHQUFDd00sQ0FBVixHQUFZL0osQ0FBQyxHQUFDVCxDQUFkLEdBQWdCdkUsQ0FBQyxHQUFDMEMsQ0FBbEIsR0FBb0J4QyxDQUFDLEdBQUN1QyxDQUFqUixFQUFtUlIsQ0FBQyxLQUFHQSxDQUFDLEdBQUMsSUFBRUEsQ0FBSixFQUFNQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQzBCLENBQUMsR0FBQzJGLENBQUYsR0FBSW5GLENBQUMsR0FBQ0QsQ0FBTixHQUFRdkUsQ0FBQyxHQUFDbVAsQ0FBWCxJQUFjOU0sQ0FBekIsRUFBMkJDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDa0MsQ0FBQyxHQUFDRyxDQUFGLEdBQUloQixDQUFDLEdBQUNnRyxDQUFOLEdBQVEzSixDQUFDLEdBQUM4QyxDQUFYLElBQWNULENBQTlDLEVBQWdEQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQ3FCLENBQUMsR0FBQ1ksQ0FBRixHQUFJUCxDQUFDLEdBQUNXLENBQU4sR0FBUTNFLENBQUMsR0FBQzZDLENBQVgsSUFBY1IsQ0FBbkUsRUFBcUVDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDdUIsQ0FBQyxHQUFDVSxDQUFGLEdBQUlYLENBQUMsR0FBQytGLENBQU4sR0FBUXBILENBQUMsR0FBQzRNLENBQVgsSUFBYzlNLENBQXhGLEVBQTBGQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQ1ksQ0FBQyxHQUFDeUcsQ0FBRixHQUFJOUYsQ0FBQyxHQUFDYyxDQUFOLEdBQVFwQyxDQUFDLEdBQUNPLENBQVgsSUFBY1QsQ0FBN0csRUFBK0dDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDc0IsQ0FBQyxHQUFDZSxDQUFGLEdBQUl6QixDQUFDLEdBQUNxQixDQUFOLEdBQVFoQyxDQUFDLEdBQUNNLENBQVgsSUFBY1IsQ0FBbEksRUFBb0lDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDbUMsQ0FBQyxHQUFDbkUsQ0FBRixHQUFJb0UsQ0FBQyxHQUFDdEUsQ0FBTixHQUFRd0MsQ0FBQyxHQUFDd0MsQ0FBWCxJQUFjL0MsQ0FBdkosRUFBeUpDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDb0MsQ0FBQyxHQUFDL0IsQ0FBRixHQUFJaUMsQ0FBQyxHQUFDdEUsQ0FBTixHQUFRc0MsQ0FBQyxHQUFDdUMsQ0FBWCxJQUFjOUMsQ0FBNUssRUFBOEtDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDc0MsQ0FBQyxHQUFDeEUsQ0FBRixHQUFJcUUsQ0FBQyxHQUFDOUIsQ0FBTixHQUFRQyxDQUFDLEdBQUNzQyxDQUFYLElBQWM3QyxDQUFwTSxDQUFwUixFQUEyZCxJQUFsZTtBQUF1ZTs7QUFBemxGOztBQUEwbEYsTUFBSW1SLENBQUMsR0FBQyxDQUFOOztBQUFRLFFBQU0vTyxDQUFOLFNBQWdCdkIsQ0FBaEIsQ0FBaUI7QUFBQ3ZILElBQUFBLFdBQVcsQ0FBQ3lHLENBQUQsRUFBRztBQUFDbkUsTUFBQUEsUUFBUSxFQUFDb0UsQ0FBVjtBQUFZM0UsTUFBQUEsT0FBTyxFQUFDNkUsQ0FBcEI7QUFBc0I0RixNQUFBQSxJQUFJLEVBQUNuSSxDQUFDLEdBQUNvQyxDQUFDLENBQUNnRyxTQUEvQjtBQUF5Q3FMLE1BQUFBLGFBQWEsRUFBQzdRLENBQUMsR0FBQyxDQUFDLENBQTFEO0FBQTREOFEsTUFBQUEsV0FBVyxFQUFDeFEsQ0FBQyxHQUFDO0FBQTFFLFFBQTZFLEVBQWhGLEVBQW1GO0FBQUMsWUFBTWQsQ0FBTixHQUFTLEtBQUtoRyxFQUFMLEdBQVFnRyxDQUFqQixFQUFtQixLQUFLa0QsRUFBTCxHQUFRa08sQ0FBQyxFQUE1QixFQUErQixLQUFLdlYsUUFBTCxHQUFjb0UsQ0FBN0MsRUFBK0MsS0FBSzNFLE9BQUwsR0FBYTZFLENBQTVELEVBQThELEtBQUs0RixJQUFMLEdBQVVuSSxDQUF4RSxFQUEwRSxLQUFLeVQsYUFBTCxHQUFtQjdRLENBQTdGLEVBQStGLEtBQUs4USxXQUFMLEdBQWlCeFEsQ0FBaEgsRUFBa0gsS0FBS3lRLGVBQUwsR0FBcUIsSUFBSXJSLENBQUosRUFBdkksRUFBNkksS0FBS3NSLFlBQUwsR0FBa0IsSUFBSWhQLENBQUosRUFBL0osRUFBcUssS0FBS2xILE9BQUwsQ0FBYUMsUUFBYixDQUFzQmtXLFdBQXRCLElBQW1DQyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxLQUFLclcsT0FBTCxDQUFhQyxRQUEzQixFQUFvQztBQUFDa1csUUFBQUEsV0FBVyxFQUFDO0FBQUNoVyxVQUFBQSxLQUFLLEVBQUM7QUFBUCxTQUFiO0FBQTBCbVcsUUFBQUEsVUFBVSxFQUFDO0FBQUNuVyxVQUFBQSxLQUFLLEVBQUM7QUFBUCxTQUFyQztBQUFrRDhWLFFBQUFBLGVBQWUsRUFBQztBQUFDOVYsVUFBQUEsS0FBSyxFQUFDO0FBQVAsU0FBbEU7QUFBK0UrVixRQUFBQSxZQUFZLEVBQUM7QUFBQy9WLFVBQUFBLEtBQUssRUFBQztBQUFQLFNBQTVGO0FBQXlHb1csUUFBQUEsZ0JBQWdCLEVBQUM7QUFBQ3BXLFVBQUFBLEtBQUssRUFBQztBQUFQLFNBQTFIO0FBQXVJcVcsUUFBQUEsY0FBYyxFQUFDO0FBQUNyVyxVQUFBQSxLQUFLLEVBQUM7QUFBUDtBQUF0SixPQUFwQyxDQUF4TTtBQUFpWjs7QUFBQXFLLElBQUFBLElBQUksQ0FBQztBQUFDaU0sTUFBQUEsTUFBTSxFQUFDL1I7QUFBUixRQUFXLEVBQVosRUFBZTtBQUFDLFdBQUtnUyxjQUFMLElBQXFCLEtBQUtBLGNBQUwsQ0FBb0I7QUFBQzNXLFFBQUFBLElBQUksRUFBQyxJQUFOO0FBQVcwVyxRQUFBQSxNQUFNLEVBQUMvUjtBQUFsQixPQUFwQixDQUFyQixFQUErREEsQ0FBQyxLQUFHLEtBQUsxRSxPQUFMLENBQWFDLFFBQWIsQ0FBc0JzVyxnQkFBdEIsQ0FBdUNwVyxLQUF2QyxHQUE2Q3VFLENBQUMsQ0FBQzZSLGdCQUEvQyxFQUFnRSxLQUFLdlcsT0FBTCxDQUFhQyxRQUFiLENBQXNCdVcsY0FBdEIsQ0FBcUNyVyxLQUFyQyxHQUEyQ3VFLENBQUMsQ0FBQ2pFLFFBQTdHLEVBQXNILEtBQUtULE9BQUwsQ0FBYUMsUUFBYixDQUFzQnFXLFVBQXRCLENBQWlDblcsS0FBakMsR0FBdUN1RSxDQUFDLENBQUM0UixVQUEvSixFQUEwSyxLQUFLTCxlQUFMLENBQXFCdFEsUUFBckIsQ0FBOEJqQixDQUFDLENBQUM0UixVQUFoQyxFQUEyQyxLQUFLL0IsV0FBaEQsQ0FBMUssRUFBdU8sS0FBSzJCLFlBQUwsQ0FBa0JMLGVBQWxCLENBQWtDLEtBQUtJLGVBQXZDLENBQXZPLEVBQStSLEtBQUtqVyxPQUFMLENBQWFDLFFBQWIsQ0FBc0JrVyxXQUF0QixDQUFrQ2hXLEtBQWxDLEdBQXdDLEtBQUtvVSxXQUE1VSxFQUF3VixLQUFLdlUsT0FBTCxDQUFhQyxRQUFiLENBQXNCZ1csZUFBdEIsQ0FBc0M5VixLQUF0QyxHQUE0QyxLQUFLOFYsZUFBelksRUFBeVosS0FBS2pXLE9BQUwsQ0FBYUMsUUFBYixDQUFzQmlXLFlBQXRCLENBQW1DL1YsS0FBbkMsR0FBeUMsS0FBSytWLFlBQTFjLENBQWhFO0FBQXdoQixVQUFJdlIsQ0FBQyxHQUFDLEtBQUszRSxPQUFMLENBQWEyTCxRQUFiLElBQXVCLElBQUUsS0FBSzRJLFdBQUwsQ0FBaUJYLFdBQWpCLEVBQS9CO0FBQThELFdBQUs1VCxPQUFMLENBQWE0UCxHQUFiLENBQWlCO0FBQUNDLFFBQUFBLFNBQVMsRUFBQ2xMO0FBQVgsT0FBakIsR0FBZ0MsS0FBS3BFLFFBQUwsQ0FBY2lLLElBQWQsQ0FBbUI7QUFBQ0MsUUFBQUEsSUFBSSxFQUFDLEtBQUtBLElBQVg7QUFBZ0J6SyxRQUFBQSxPQUFPLEVBQUMsS0FBS0E7QUFBN0IsT0FBbkIsQ0FBaEMsRUFBMEYsS0FBSzJXLGFBQUwsSUFBb0IsS0FBS0EsYUFBTCxDQUFtQjtBQUFDNVcsUUFBQUEsSUFBSSxFQUFDLElBQU47QUFBVzBXLFFBQUFBLE1BQU0sRUFBQy9SO0FBQWxCLE9BQW5CLENBQTlHO0FBQXVKOztBQUFsdkM7O0FBQW12QyxNQUFJa1MsQ0FBQyxHQUFDLElBQUlDLFVBQUosQ0FBZSxDQUFmLENBQU47O0FBQXdCLFdBQVNDLENBQVQsQ0FBV3BTLENBQVgsRUFBYTtBQUFDLFdBQU8sTUFBSUEsQ0FBQyxHQUFDQSxDQUFDLEdBQUMsQ0FBUixDQUFQO0FBQWtCOztBQUFBLE1BQUlxUyxDQUFDLEdBQUMsQ0FBTjs7QUFBUSxRQUFNL1AsQ0FBTixDQUFPO0FBQUMvSSxJQUFBQSxXQUFXLENBQUN5RyxDQUFELEVBQUc7QUFBQ25ELE1BQUFBLEtBQUssRUFBQ2UsQ0FBUDtBQUFTc0csTUFBQUEsTUFBTSxFQUFDMUQsQ0FBQyxHQUFDUixDQUFDLENBQUNzUyxVQUFwQjtBQUErQnpPLE1BQUFBLElBQUksRUFBQy9DLENBQUMsR0FBQ2QsQ0FBQyxDQUFDdVMsYUFBeEM7QUFBc0RDLE1BQUFBLE1BQU0sRUFBQ3ZTLENBQUMsR0FBQ0QsQ0FBQyxDQUFDeVMsSUFBakU7QUFBc0VDLE1BQUFBLGNBQWMsRUFBQ2xSLENBQUMsR0FBQ3ZCLENBQXZGO0FBQXlGMFMsTUFBQUEsS0FBSyxFQUFDbFIsQ0FBQyxHQUFDekIsQ0FBQyxDQUFDNFMsYUFBbkc7QUFBaUhDLE1BQUFBLEtBQUssRUFBQ3RSLENBQUMsR0FBQ3ZCLENBQUMsQ0FBQzRTLGFBQTNIO0FBQXlJRSxNQUFBQSxlQUFlLEVBQUM1UyxDQUFDLEdBQUMsQ0FBQyxDQUE1SjtBQUE4SjNELE1BQUFBLFNBQVMsRUFBQ3FGLENBQUMsR0FBQzFCLENBQUMsR0FBQ0YsQ0FBQyxDQUFDK1MscUJBQUgsR0FBeUIvUyxDQUFDLENBQUN4RCxNQUF0TTtBQUE2TUMsTUFBQUEsU0FBUyxFQUFDMkYsQ0FBQyxHQUFDcEMsQ0FBQyxDQUFDeEQsTUFBM047QUFBa093VyxNQUFBQSxnQkFBZ0IsRUFBQ3hRLENBQUMsR0FBQyxDQUFDLENBQXRQO0FBQXdQeVEsTUFBQUEsZUFBZSxFQUFDNVEsQ0FBQyxHQUFDLENBQTFRO0FBQTRRNlEsTUFBQUEsS0FBSyxFQUFDNVEsQ0FBQyxHQUFDLENBQUMsQ0FBclI7QUFBdVI2USxNQUFBQSxLQUFLLEVBQUM1USxDQUFDLEdBQUMsQ0FBL1I7QUFBaVNsRSxNQUFBQSxLQUFLLEVBQUM4QixDQUF2UztBQUF5UzdCLE1BQUFBLE1BQU0sRUFBQzZELENBQUMsR0FBQ2hDO0FBQWxULFFBQXFULEVBQXhULEVBQTJUO0FBQUMsV0FBS25HLEVBQUwsR0FBUWdHLENBQVIsRUFBVSxLQUFLa0QsRUFBTCxHQUFRbVAsQ0FBQyxFQUFuQixFQUFzQixLQUFLeFYsS0FBTCxHQUFXZSxDQUFqQyxFQUFtQyxLQUFLc0csTUFBTCxHQUFZMUQsQ0FBL0MsRUFBaUQsS0FBS3FELElBQUwsR0FBVS9DLENBQTNELEVBQTZELEtBQUswUixNQUFMLEdBQVl2UyxDQUF6RSxFQUEyRSxLQUFLeVMsY0FBTCxHQUFvQmxSLENBQS9GLEVBQWlHLEtBQUtqRixTQUFMLEdBQWVxRixDQUFoSCxFQUFrSCxLQUFLbkYsU0FBTCxHQUFlMkYsQ0FBakksRUFBbUksS0FBS3VRLEtBQUwsR0FBV2xSLENBQTlJLEVBQWdKLEtBQUtvUixLQUFMLEdBQVd0UixDQUEzSixFQUE2SixLQUFLdVIsZUFBTCxHQUFxQjVTLENBQWxMLEVBQW9MLEtBQUs4UyxnQkFBTCxHQUFzQnhRLENBQTFNLEVBQTRNLEtBQUt5USxlQUFMLEdBQXFCNVEsQ0FBak8sRUFBbU8sS0FBSzZRLEtBQUwsR0FBVzVRLENBQTlPLEVBQWdQLEtBQUs2USxLQUFMLEdBQVc1USxDQUEzUCxFQUE2UCxLQUFLbEUsS0FBTCxHQUFXOEIsQ0FBeFEsRUFBMFEsS0FBSzdCLE1BQUwsR0FBWTZELENBQXRSLEVBQXdSLEtBQUs5RixPQUFMLEdBQWEsS0FBS3JDLEVBQUwsQ0FBUW9aLGFBQVIsRUFBclMsRUFBNlQsS0FBS0MsS0FBTCxHQUFXO0FBQUN4VyxRQUFBQSxLQUFLLEVBQUM7QUFBUCxPQUF4VSxFQUFxVixLQUFLNkcsT0FBTCxHQUFhLEtBQUsxSixFQUFMLENBQVFILFFBQVIsQ0FBaUI4SixLQUFuWCxFQUF5WCxLQUFLQSxLQUFMLEdBQVcsRUFBcFksRUFBdVksS0FBS0EsS0FBTCxDQUFXcEgsU0FBWCxHQUFxQixLQUFLdkMsRUFBTCxDQUFRK1kscUJBQXBhLEVBQTBiLEtBQUtwUCxLQUFMLENBQVdsSCxTQUFYLEdBQXFCLEtBQUt6QyxFQUFMLENBQVF3QyxNQUF2ZCxFQUE4ZCxLQUFLbUgsS0FBTCxDQUFXZ1AsS0FBWCxHQUFpQixLQUFLM1ksRUFBTCxDQUFRc1osTUFBdmYsRUFBOGYsS0FBSzNQLEtBQUwsQ0FBV2tQLEtBQVgsR0FBaUIsS0FBSzdZLEVBQUwsQ0FBUXNaLE1BQXZoQjtBQUE4aEI7O0FBQUE5WixJQUFBQSxJQUFJLEdBQUU7QUFBQyxXQUFLa0ssT0FBTCxDQUFhNlAsWUFBYixDQUEwQixLQUFLN1AsT0FBTCxDQUFhOFAsaUJBQXZDLE1BQTRELEtBQUt0USxFQUFqRSxLQUFzRSxLQUFLbEosRUFBTCxDQUFReVosV0FBUixDQUFvQixLQUFLdlAsTUFBekIsRUFBZ0MsS0FBSzdILE9BQXJDLEdBQThDLEtBQUtxSCxPQUFMLENBQWE2UCxZQUFiLENBQTBCLEtBQUs3UCxPQUFMLENBQWE4UCxpQkFBdkMsSUFBMEQsS0FBS3RRLEVBQW5MO0FBQXVMOztBQUFBbEUsSUFBQUEsTUFBTSxDQUFDZ0IsQ0FBQyxHQUFDLENBQUgsRUFBSztBQUFDLFVBQUlDLENBQUMsR0FBQyxFQUFFLEtBQUtwRCxLQUFMLEtBQWEsS0FBS3dXLEtBQUwsQ0FBV3hXLEtBQXhCLElBQStCLENBQUMsS0FBS2tDLFdBQXZDLENBQU47QUFBMEQsT0FBQ2tCLENBQUMsSUFBRSxLQUFLeUQsT0FBTCxDQUFhNlAsWUFBYixDQUEwQnZULENBQTFCLE1BQStCLEtBQUtrRCxFQUF4QyxNQUE4QyxLQUFLbEosRUFBTCxDQUFRSCxRQUFSLENBQWlCNlosYUFBakIsQ0FBK0IxVCxDQUEvQixHQUFrQyxLQUFLeEcsSUFBTCxFQUFoRixHQUE2RnlHLENBQUMsS0FBRyxLQUFLbEIsV0FBTCxHQUFpQixDQUFDLENBQWxCLEVBQW9CLEtBQUttVSxLQUFMLEtBQWEsS0FBS3hQLE9BQUwsQ0FBYXdQLEtBQTFCLEtBQWtDLEtBQUtsWixFQUFMLENBQVEyWixXQUFSLENBQW9CLEtBQUszWixFQUFMLENBQVE0WixtQkFBNUIsRUFBZ0QsS0FBS1YsS0FBckQsR0FBNEQsS0FBS3hQLE9BQUwsQ0FBYXdQLEtBQWIsR0FBbUIsS0FBS0EsS0FBdEgsQ0FBcEIsRUFBaUosS0FBS0YsZ0JBQUwsS0FBd0IsS0FBS3RQLE9BQUwsQ0FBYXNQLGdCQUFyQyxLQUF3RCxLQUFLaFosRUFBTCxDQUFRMlosV0FBUixDQUFvQixLQUFLM1osRUFBTCxDQUFRNlosOEJBQTVCLEVBQTJELEtBQUtiLGdCQUFoRSxHQUFrRixLQUFLdFAsT0FBTCxDQUFhc1AsZ0JBQWIsR0FBOEIsS0FBS0EsZ0JBQTdLLENBQWpKLEVBQWdWLEtBQUtDLGVBQUwsS0FBdUIsS0FBS3ZQLE9BQUwsQ0FBYXVQLGVBQXBDLEtBQXNELEtBQUtqWixFQUFMLENBQVEyWixXQUFSLENBQW9CLEtBQUszWixFQUFMLENBQVE4WixnQkFBNUIsRUFBNkMsS0FBS2IsZUFBbEQsR0FBbUUsS0FBS3ZQLE9BQUwsQ0FBYXVQLGVBQWIsR0FBNkIsS0FBS0EsZUFBM0osQ0FBaFYsRUFBNGYsS0FBSzFXLFNBQUwsS0FBaUIsS0FBS29ILEtBQUwsQ0FBV3BILFNBQTVCLEtBQXdDLEtBQUt2QyxFQUFMLENBQVErWixhQUFSLENBQXNCLEtBQUs3UCxNQUEzQixFQUFrQyxLQUFLbEssRUFBTCxDQUFRZ2Esa0JBQTFDLEVBQTZELEtBQUt6WCxTQUFsRSxHQUE2RSxLQUFLb0gsS0FBTCxDQUFXcEgsU0FBWCxHQUFxQixLQUFLQSxTQUEvSSxDQUE1ZixFQUFzcEIsS0FBS0UsU0FBTCxLQUFpQixLQUFLa0gsS0FBTCxDQUFXbEgsU0FBNUIsS0FBd0MsS0FBS3pDLEVBQUwsQ0FBUStaLGFBQVIsQ0FBc0IsS0FBSzdQLE1BQTNCLEVBQWtDLEtBQUtsSyxFQUFMLENBQVFpYSxrQkFBMUMsRUFBNkQsS0FBS3hYLFNBQWxFLEdBQTZFLEtBQUtrSCxLQUFMLENBQVdsSCxTQUFYLEdBQXFCLEtBQUtBLFNBQS9JLENBQXRwQixFQUFnekIsS0FBS2tXLEtBQUwsS0FBYSxLQUFLaFAsS0FBTCxDQUFXZ1AsS0FBeEIsS0FBZ0MsS0FBSzNZLEVBQUwsQ0FBUStaLGFBQVIsQ0FBc0IsS0FBSzdQLE1BQTNCLEVBQWtDLEtBQUtsSyxFQUFMLENBQVFrYSxjQUExQyxFQUF5RCxLQUFLdkIsS0FBOUQsR0FBcUUsS0FBS2hQLEtBQUwsQ0FBV2dQLEtBQVgsR0FBaUIsS0FBS0EsS0FBM0gsQ0FBaHpCLEVBQWs3QixLQUFLRSxLQUFMLEtBQWEsS0FBS2xQLEtBQUwsQ0FBV2tQLEtBQXhCLEtBQWdDLEtBQUs3WSxFQUFMLENBQVErWixhQUFSLENBQXNCLEtBQUs3UCxNQUEzQixFQUFrQyxLQUFLbEssRUFBTCxDQUFRbWEsY0FBMUMsRUFBeUQsS0FBS3RCLEtBQTlELEdBQXFFLEtBQUtsUCxLQUFMLENBQVdrUCxLQUFYLEdBQWlCLEtBQUtBLEtBQTNILENBQWw3QixFQUFvakMsS0FBS2hXLEtBQUwsSUFBWSxLQUFLQSxLQUFMLENBQVd3QixLQUFYLEtBQW1CLEtBQUtBLEtBQUwsR0FBVyxLQUFLeEIsS0FBTCxDQUFXd0IsS0FBdEIsRUFBNEIsS0FBS0MsTUFBTCxHQUFZLEtBQUt6QixLQUFMLENBQVd5QixNQUF0RSxHQUE4RSxLQUFLdEUsRUFBTCxDQUFRSCxRQUFSLENBQWlCdWEsUUFBakIsSUFBMkJDLFdBQVcsQ0FBQ0MsTUFBWixDQUFtQixLQUFLelgsS0FBeEIsQ0FBM0IsR0FBMEQsS0FBSzdDLEVBQUwsQ0FBUXVhLFVBQVIsQ0FBbUIsS0FBS3JRLE1BQXhCLEVBQStCLEtBQUtpUCxLQUFwQyxFQUEwQyxLQUFLVCxjQUEvQyxFQUE4RCxLQUFLclUsS0FBbkUsRUFBeUUsS0FBS0MsTUFBOUUsRUFBcUYsQ0FBckYsRUFBdUYsS0FBS2tVLE1BQTVGLEVBQW1HLEtBQUszTyxJQUF4RyxFQUE2RyxLQUFLaEgsS0FBbEgsQ0FBMUQsR0FBbUwsS0FBSzdDLEVBQUwsQ0FBUXVhLFVBQVIsQ0FBbUIsS0FBS3JRLE1BQXhCLEVBQStCLEtBQUtpUCxLQUFwQyxFQUEwQyxLQUFLVCxjQUEvQyxFQUE4RCxLQUFLRixNQUFuRSxFQUEwRSxLQUFLM08sSUFBL0UsRUFBb0YsS0FBS2hILEtBQXpGLENBQWpRLEVBQWlXLEtBQUtpVyxlQUFMLEtBQXVCLEtBQUs5WSxFQUFMLENBQVFILFFBQVIsQ0FBaUJ1YSxRQUFqQixJQUEyQmhDLENBQUMsQ0FBQyxLQUFLdlYsS0FBTCxDQUFXd0IsS0FBWixDQUFELElBQXFCK1QsQ0FBQyxDQUFDLEtBQUt2VixLQUFMLENBQVd5QixNQUFaLENBQWpELEdBQXFFLEtBQUt0RSxFQUFMLENBQVF3YSxjQUFSLENBQXVCLEtBQUt0USxNQUE1QixDQUFyRSxJQUEwRyxLQUFLNE8sZUFBTCxHQUFxQixDQUFDLENBQXRCLEVBQXdCLEtBQUtILEtBQUwsR0FBVyxLQUFLRSxLQUFMLEdBQVcsS0FBSzdZLEVBQUwsQ0FBUTRZLGFBQXRELEVBQW9FLEtBQUtyVyxTQUFMLEdBQWUsS0FBS3ZDLEVBQUwsQ0FBUXdDLE1BQXJNLENBQXZCLENBQTdXLElBQW1sQixLQUFLNkIsS0FBTCxHQUFXLEtBQUtyRSxFQUFMLENBQVF1YSxVQUFSLENBQW1CLEtBQUtyUSxNQUF4QixFQUErQixLQUFLaVAsS0FBcEMsRUFBMEMsS0FBS1QsY0FBL0MsRUFBOEQsS0FBS3JVLEtBQW5FLEVBQXlFLEtBQUtDLE1BQTlFLEVBQXFGLENBQXJGLEVBQXVGLEtBQUtrVSxNQUE1RixFQUFtRyxLQUFLM08sSUFBeEcsRUFBNkcsSUFBN0csQ0FBWCxHQUE4SCxLQUFLN0osRUFBTCxDQUFRdWEsVUFBUixDQUFtQixLQUFLclEsTUFBeEIsRUFBK0IsQ0FBL0IsRUFBaUMsS0FBS2xLLEVBQUwsQ0FBUXlZLElBQXpDLEVBQThDLENBQTlDLEVBQWdELENBQWhELEVBQWtELENBQWxELEVBQW9ELEtBQUt6WSxFQUFMLENBQVF5WSxJQUE1RCxFQUFpRSxLQUFLelksRUFBTCxDQUFRdVksYUFBekUsRUFBdUZMLENBQXZGLENBQXJ3RCxFQUErMUQsS0FBS21CLEtBQUwsQ0FBV3hXLEtBQVgsR0FBaUIsS0FBS0EsS0FBcjNELEVBQTIzRCxLQUFLNFgsUUFBTCxJQUFlLEtBQUtBLFFBQUwsRUFBNzRELENBQTlGO0FBQTQvRDs7QUFBdG1HOztBQUF1bUcsUUFBTWxTLENBQU4sQ0FBTztBQUFDaEosSUFBQUEsV0FBVyxDQUFDeUcsQ0FBRCxFQUFHO0FBQUMzQixNQUFBQSxLQUFLLEVBQUM0QixDQUFDLEdBQUNELENBQUMsQ0FBQ3RHLE1BQUYsQ0FBUzJFLEtBQWxCO0FBQXdCQyxNQUFBQSxNQUFNLEVBQUM0QixDQUFDLEdBQUNGLENBQUMsQ0FBQ3RHLE1BQUYsQ0FBUzRFLE1BQTFDO0FBQWlENEYsTUFBQUEsTUFBTSxFQUFDdEMsQ0FBQyxHQUFDNUIsQ0FBQyxDQUFDMFUsV0FBNUQ7QUFBd0VDLE1BQUFBLEtBQUssRUFBQ3ZTLENBQUMsR0FBQyxDQUFoRjtBQUFrRndTLE1BQUFBLEtBQUssRUFBQ2hYLENBQUMsR0FBQyxDQUFDLENBQTNGO0FBQTZGaVgsTUFBQUEsT0FBTyxFQUFDclUsQ0FBQyxHQUFDLENBQUMsQ0FBeEc7QUFBMEdzVSxNQUFBQSxZQUFZLEVBQUN0UyxDQUFDLEdBQUMsQ0FBQyxDQUExSDtBQUE0SG1RLE1BQUFBLEtBQUssRUFBQzdSLENBQUMsR0FBQ2QsQ0FBQyxDQUFDNFMsYUFBdEk7QUFBb0pDLE1BQUFBLEtBQUssRUFBQ3JSLENBQUMsR0FBQ3hCLENBQUMsQ0FBQzRTLGFBQTlKO0FBQTRLclcsTUFBQUEsU0FBUyxFQUFDa0YsQ0FBQyxHQUFDekIsQ0FBQyxDQUFDeEQsTUFBMUw7QUFBaU1DLE1BQUFBLFNBQVMsRUFBQzRGLENBQUMsR0FBQ1osQ0FBN007QUFBK01vQyxNQUFBQSxJQUFJLEVBQUN0QixDQUFDLEdBQUN2QyxDQUFDLENBQUN1UyxhQUF4TjtBQUFzT0MsTUFBQUEsTUFBTSxFQUFDalIsQ0FBQyxHQUFDdkIsQ0FBQyxDQUFDeVMsSUFBalA7QUFBc1BDLE1BQUFBLGNBQWMsRUFBQ3ZRLENBQUMsR0FBQ1osQ0FBdlE7QUFBeVEwUixNQUFBQSxlQUFlLEVBQUMxTCxDQUF6UjtBQUEyUnlMLE1BQUFBLGdCQUFnQixFQUFDdkw7QUFBNVMsUUFBK1MsRUFBbFQsRUFBcVQ7QUFBQyxXQUFLek4sRUFBTCxHQUFRZ0csQ0FBUixFQUFVLEtBQUszQixLQUFMLEdBQVc0QixDQUFyQixFQUF1QixLQUFLM0IsTUFBTCxHQUFZNEIsQ0FBbkMsRUFBcUMsS0FBS21FLE1BQUwsR0FBWSxLQUFLckssRUFBTCxDQUFRK2EsaUJBQVIsRUFBakQsRUFBNkUsS0FBSzdRLE1BQUwsR0FBWXRDLENBQXpGLEVBQTJGLEtBQUs1SCxFQUFMLENBQVFnYixlQUFSLENBQXdCLEtBQUs5USxNQUE3QixFQUFvQyxLQUFLRyxNQUF6QyxDQUEzRixFQUE0SSxLQUFLNFEsUUFBTCxHQUFjLEVBQTFKOztBQUE2SixXQUFJLElBQUk5VSxDQUFDLEdBQUMsQ0FBVixFQUFZQSxDQUFDLEdBQUNpQyxDQUFkLEVBQWdCakMsQ0FBQyxFQUFqQixFQUFvQixLQUFLOFUsUUFBTCxDQUFjekosSUFBZCxDQUFtQixJQUFJbEosQ0FBSixDQUFNdEMsQ0FBTixFQUFRO0FBQUMzQixRQUFBQSxLQUFLLEVBQUM0QixDQUFQO0FBQVMzQixRQUFBQSxNQUFNLEVBQUM0QixDQUFoQjtBQUFrQnlTLFFBQUFBLEtBQUssRUFBQzdSLENBQXhCO0FBQTBCK1IsUUFBQUEsS0FBSyxFQUFDclIsQ0FBaEM7QUFBa0NqRixRQUFBQSxTQUFTLEVBQUNrRixDQUE1QztBQUE4Q2hGLFFBQUFBLFNBQVMsRUFBQzRGLENBQXhEO0FBQTBEd0IsUUFBQUEsSUFBSSxFQUFDdEIsQ0FBL0Q7QUFBaUVpUSxRQUFBQSxNQUFNLEVBQUNqUixDQUF4RTtBQUEwRW1SLFFBQUFBLGNBQWMsRUFBQ3ZRLENBQXpGO0FBQTJGOFEsUUFBQUEsZUFBZSxFQUFDMUwsQ0FBM0c7QUFBNkd5TCxRQUFBQSxnQkFBZ0IsRUFBQ3ZMLENBQTlIO0FBQWdJeUwsUUFBQUEsS0FBSyxFQUFDLENBQUMsQ0FBdkk7QUFBeUlKLFFBQUFBLGVBQWUsRUFBQyxDQUFDO0FBQTFKLE9BQVIsQ0FBbkIsR0FBMEwsS0FBS21DLFFBQUwsQ0FBYzlVLENBQWQsRUFBaUJuQixNQUFqQixFQUExTCxFQUFvTixLQUFLaEYsRUFBTCxDQUFRa2Isb0JBQVIsQ0FBNkIsS0FBS2hSLE1BQWxDLEVBQXlDLEtBQUtsSyxFQUFMLENBQVFtYixpQkFBUixHQUEwQmhWLENBQW5FLEVBQXFFLEtBQUtuRyxFQUFMLENBQVFzWSxVQUE3RSxFQUF3RixLQUFLMkMsUUFBTCxDQUFjOVUsQ0FBZCxFQUFpQjlELE9BQXpHLEVBQWlILENBQWpILENBQXBOOztBQUF3VSxXQUFLQSxPQUFMLEdBQWEsS0FBSzRZLFFBQUwsQ0FBYyxDQUFkLENBQWIsRUFBOEJ6UyxDQUFDLEtBQUcsS0FBS3hJLEVBQUwsQ0FBUUgsUUFBUixDQUFpQnVhLFFBQWpCLElBQTJCLEtBQUtwYSxFQUFMLENBQVFILFFBQVIsQ0FBaUJ1YixZQUFqQixDQUE4QixxQkFBOUIsQ0FBOUIsQ0FBRCxJQUFzRixLQUFLTixZQUFMLEdBQWtCLElBQUl4UyxDQUFKLENBQU10QyxDQUFOLEVBQVE7QUFBQzNCLFFBQUFBLEtBQUssRUFBQzRCLENBQVA7QUFBUzNCLFFBQUFBLE1BQU0sRUFBQzRCLENBQWhCO0FBQWtCeVMsUUFBQUEsS0FBSyxFQUFDN1IsQ0FBeEI7QUFBMEIrUixRQUFBQSxLQUFLLEVBQUNyUixDQUFoQztBQUFrQ2pGLFFBQUFBLFNBQVMsRUFBQyxLQUFLdkMsRUFBTCxDQUFRcWIsT0FBcEQ7QUFBNEQ1WSxRQUFBQSxTQUFTLEVBQUMsS0FBS3pDLEVBQUwsQ0FBUXFiLE9BQTlFO0FBQXNGbkMsUUFBQUEsS0FBSyxFQUFDLENBQUMsQ0FBN0Y7QUFBK0ZWLFFBQUFBLE1BQU0sRUFBQyxLQUFLeFksRUFBTCxDQUFRc2IsZUFBOUc7QUFBOEg1QyxRQUFBQSxjQUFjLEVBQUMxUyxDQUFDLENBQUNuRyxRQUFGLENBQVd1YSxRQUFYLEdBQW9CLEtBQUtwYSxFQUFMLENBQVF1YixpQkFBNUIsR0FBOEMsS0FBS3ZiLEVBQUwsQ0FBUXNiLGVBQW5NO0FBQW1OelIsUUFBQUEsSUFBSSxFQUFDLEtBQUs3SixFQUFMLENBQVFpSyxZQUFoTztBQUE2TzZPLFFBQUFBLGVBQWUsRUFBQyxDQUFDO0FBQTlQLE9BQVIsQ0FBbEIsRUFBNFIsS0FBS2dDLFlBQUwsQ0FBa0I5VixNQUFsQixFQUE1UixFQUF1VCxLQUFLaEYsRUFBTCxDQUFRa2Isb0JBQVIsQ0FBNkIsS0FBS2hSLE1BQWxDLEVBQXlDLEtBQUtsSyxFQUFMLENBQVF3YixnQkFBakQsRUFBa0UsS0FBS3hiLEVBQUwsQ0FBUXNZLFVBQTFFLEVBQXFGLEtBQUt3QyxZQUFMLENBQWtCelksT0FBdkcsRUFBK0csQ0FBL0csQ0FBN1ksS0FBaWdCdUIsQ0FBQyxJQUFFLENBQUM0QyxDQUFKLEtBQVEsS0FBS2lWLFdBQUwsR0FBaUIsS0FBS3piLEVBQUwsQ0FBUTBiLGtCQUFSLEVBQWpCLEVBQThDLEtBQUsxYixFQUFMLENBQVEyYixnQkFBUixDQUF5QixLQUFLM2IsRUFBTCxDQUFRNGIsWUFBakMsRUFBOEMsS0FBS0gsV0FBbkQsQ0FBOUMsRUFBOEcsS0FBS3piLEVBQUwsQ0FBUTZiLG1CQUFSLENBQTRCLEtBQUs3YixFQUFMLENBQVE0YixZQUFwQyxFQUFpRCxLQUFLNWIsRUFBTCxDQUFROGIsaUJBQXpELEVBQTJFN1YsQ0FBM0UsRUFBNkVDLENBQTdFLENBQTlHLEVBQThMLEtBQUtsRyxFQUFMLENBQVErYix1QkFBUixDQUFnQyxLQUFLN1IsTUFBckMsRUFBNEMsS0FBS2xLLEVBQUwsQ0FBUXdiLGdCQUFwRCxFQUFxRSxLQUFLeGIsRUFBTCxDQUFRNGIsWUFBN0UsRUFBMEYsS0FBS0gsV0FBL0YsQ0FBdE0sR0FBbVRqVixDQUFDLElBQUUsQ0FBQzVDLENBQUosS0FBUSxLQUFLb1ksYUFBTCxHQUFtQixLQUFLaGMsRUFBTCxDQUFRMGIsa0JBQVIsRUFBbkIsRUFBZ0QsS0FBSzFiLEVBQUwsQ0FBUTJiLGdCQUFSLENBQXlCLEtBQUszYixFQUFMLENBQVE0YixZQUFqQyxFQUE4QyxLQUFLSSxhQUFuRCxDQUFoRCxFQUFrSCxLQUFLaGMsRUFBTCxDQUFRNmIsbUJBQVIsQ0FBNEIsS0FBSzdiLEVBQUwsQ0FBUTRiLFlBQXBDLEVBQWlELEtBQUs1YixFQUFMLENBQVFpYyxjQUF6RCxFQUF3RWhXLENBQXhFLEVBQTBFQyxDQUExRSxDQUFsSCxFQUErTCxLQUFLbEcsRUFBTCxDQUFRK2IsdUJBQVIsQ0FBZ0MsS0FBSzdSLE1BQXJDLEVBQTRDLEtBQUtsSyxFQUFMLENBQVFrYyxrQkFBcEQsRUFBdUUsS0FBS2xjLEVBQUwsQ0FBUTRiLFlBQS9FLEVBQTRGLEtBQUtJLGFBQWpHLENBQXZNLENBQW5ULEVBQTJtQnBZLENBQUMsSUFBRTRDLENBQUgsS0FBTyxLQUFLMlYsa0JBQUwsR0FBd0IsS0FBS25jLEVBQUwsQ0FBUTBiLGtCQUFSLEVBQXhCLEVBQXFELEtBQUsxYixFQUFMLENBQVEyYixnQkFBUixDQUF5QixLQUFLM2IsRUFBTCxDQUFRNGIsWUFBakMsRUFBOEMsS0FBS08sa0JBQW5ELENBQXJELEVBQTRILEtBQUtuYyxFQUFMLENBQVE2YixtQkFBUixDQUE0QixLQUFLN2IsRUFBTCxDQUFRNGIsWUFBcEMsRUFBaUQsS0FBSzViLEVBQUwsQ0FBUW9jLGFBQXpELEVBQXVFblcsQ0FBdkUsRUFBeUVDLENBQXpFLENBQTVILEVBQXdNLEtBQUtsRyxFQUFMLENBQVErYix1QkFBUixDQUFnQyxLQUFLN1IsTUFBckMsRUFBNEMsS0FBS2xLLEVBQUwsQ0FBUXFjLHdCQUFwRCxFQUE2RSxLQUFLcmMsRUFBTCxDQUFRNGIsWUFBckYsRUFBa0csS0FBS08sa0JBQXZHLENBQS9NLENBQTVtQyxDQUE5QixFQUFzOUMsS0FBS25jLEVBQUwsQ0FBUWdiLGVBQVIsQ0FBd0IsS0FBSzlRLE1BQTdCLEVBQW9DLElBQXBDLENBQXQ5QztBQUFnZ0Q7O0FBQTN6RTs7QUFBNHpFLFFBQU0vQixDQUFOLFNBQWdCdEIsS0FBaEIsQ0FBcUI7QUFBQ3RILElBQUFBLFdBQVcsQ0FBQ3lHLENBQUMsR0FBQyxDQUFILEVBQUtDLENBQUMsR0FBQyxDQUFQLEVBQVNDLENBQUMsR0FBQyxDQUFYLEVBQWE7QUFBQyxhQUFNLFlBQVUsT0FBT0YsQ0FBakIsS0FBcUIsQ0FBQ0EsQ0FBRCxFQUFHQyxDQUFILEVBQUtDLENBQUwsSUFBUWlDLENBQUMsQ0FBQ21VLFFBQUYsQ0FBV3RXLENBQVgsQ0FBN0IsR0FBNEMsTUFBTUEsQ0FBTixFQUFRQyxDQUFSLEVBQVVDLENBQVYsQ0FBNUMsRUFBeUQsSUFBL0Q7QUFBb0U7O0FBQUssUUFBRHFILENBQUMsR0FBRTtBQUFDLGFBQU8sS0FBSyxDQUFMLENBQVA7QUFBZTs7QUFBSyxRQUFEQSxDQUFDLENBQUN2SCxDQUFELEVBQUc7QUFBQyxXQUFLLENBQUwsSUFBUUEsQ0FBUjtBQUFVOztBQUFLLFFBQURjLENBQUMsR0FBRTtBQUFDLGFBQU8sS0FBSyxDQUFMLENBQVA7QUFBZTs7QUFBSyxRQUFEQSxDQUFDLENBQUNkLENBQUQsRUFBRztBQUFDLFdBQUssQ0FBTCxJQUFRQSxDQUFSO0FBQVU7O0FBQUssUUFBREMsQ0FBQyxHQUFFO0FBQUMsYUFBTyxLQUFLLENBQUwsQ0FBUDtBQUFlOztBQUFLLFFBQURBLENBQUMsQ0FBQ0QsQ0FBRCxFQUFHO0FBQUMsV0FBSyxDQUFMLElBQVFBLENBQVI7QUFBVTs7QUFBQTVCLElBQUFBLEdBQUcsQ0FBQzRCLENBQUQsRUFBR0MsQ0FBSCxFQUFLQyxDQUFMLEVBQU87QUFBQyxhQUFNLFlBQVUsT0FBT0YsQ0FBakIsS0FBcUIsQ0FBQ0EsQ0FBRCxFQUFHQyxDQUFILEVBQUtDLENBQUwsSUFBUWlDLENBQUMsQ0FBQ21VLFFBQUYsQ0FBV3RXLENBQVgsQ0FBN0IsR0FBNENBLENBQUMsQ0FBQ2pDLE1BQUYsR0FBUyxLQUFLb0IsSUFBTCxDQUFVYSxDQUFWLENBQVQsSUFBdUIsS0FBSyxDQUFMLElBQVFBLENBQVIsRUFBVSxLQUFLLENBQUwsSUFBUUMsQ0FBbEIsRUFBb0IsS0FBSyxDQUFMLElBQVFDLENBQTVCLEVBQThCLElBQXJELENBQWxEO0FBQTZHOztBQUFBZixJQUFBQSxJQUFJLENBQUNhLENBQUQsRUFBRztBQUFDLGFBQU8sS0FBSyxDQUFMLElBQVFBLENBQUMsQ0FBQyxDQUFELENBQVQsRUFBYSxLQUFLLENBQUwsSUFBUUEsQ0FBQyxDQUFDLENBQUQsQ0FBdEIsRUFBMEIsS0FBSyxDQUFMLElBQVFBLENBQUMsQ0FBQyxDQUFELENBQW5DLEVBQXVDLElBQTlDO0FBQW1EOztBQUFlLFdBQVJzVyxRQUFRLENBQUN0VyxDQUFELEVBQUc7QUFBQyxZQUFJQSxDQUFDLENBQUNqQyxNQUFOLEtBQWVpQyxDQUFDLEdBQUNBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0EsQ0FBQyxDQUFDLENBQUQsQ0FBTixHQUFVQSxDQUFDLENBQUMsQ0FBRCxDQUFYLEdBQWVBLENBQUMsQ0FBQyxDQUFELENBQWhCLEdBQW9CQSxDQUFDLENBQUMsQ0FBRCxDQUFyQixHQUF5QkEsQ0FBQyxDQUFDLENBQUQsQ0FBMUIsR0FBOEJBLENBQUMsQ0FBQyxDQUFELENBQWhEO0FBQXFELFVBQUlDLENBQUMsR0FBQyw0Q0FBNENzVyxJQUE1QyxDQUFpRHZXLENBQWpELENBQU47QUFBMEQsYUFBT0MsQ0FBQyxJQUFFMEUsT0FBTyxDQUFDQyxJQUFSLENBQWMsZ0NBQStCNUUsQ0FBRSxnQkFBL0MsQ0FBSCxFQUFtRSxDQUFDd1csUUFBUSxDQUFDdlcsQ0FBQyxDQUFDLENBQUQsQ0FBRixFQUFNLEVBQU4sQ0FBUixHQUFrQixHQUFuQixFQUF1QnVXLFFBQVEsQ0FBQ3ZXLENBQUMsQ0FBQyxDQUFELENBQUYsRUFBTSxFQUFOLENBQVIsR0FBa0IsR0FBekMsRUFBNkN1VyxRQUFRLENBQUN2VyxDQUFDLENBQUMsQ0FBRCxDQUFGLEVBQU0sRUFBTixDQUFSLEdBQWtCLEdBQS9ELENBQTFFO0FBQThJOztBQUEvcEI7O0FBQWdxQixXQUFTd1csQ0FBVCxDQUFXelcsQ0FBWCxFQUFhQyxDQUFiLEVBQWVDLENBQWYsRUFBaUI7QUFBQyxXQUFPRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBWCxFQUFlRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBMUIsRUFBOEJGLENBQXJDO0FBQXVDOztBQUFBLFdBQVMwVyxDQUFULENBQVcxVyxDQUFYLEVBQWFDLENBQWIsRUFBZUMsQ0FBZixFQUFpQjtBQUFDLFdBQU9GLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFDLENBQUMsQ0FBRCxDQUFYLEVBQWVGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFDLENBQUMsQ0FBRCxDQUExQixFQUE4QkYsQ0FBckM7QUFBdUM7O0FBQUEsV0FBUzJXLENBQVQsQ0FBVzNXLENBQVgsRUFBYUMsQ0FBYixFQUFlQyxDQUFmLEVBQWlCO0FBQUMsV0FBT0YsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQVYsRUFBWUYsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQXRCLEVBQXdCRixDQUEvQjtBQUFpQzs7QUFBQSxXQUFTNFcsRUFBVCxDQUFZNVcsQ0FBWixFQUFjO0FBQUMsUUFBSUMsQ0FBQyxHQUFDRCxDQUFDLENBQUMsQ0FBRCxDQUFQO0FBQUEsUUFBV0UsQ0FBQyxHQUFDRixDQUFDLENBQUMsQ0FBRCxDQUFkO0FBQWtCLFdBQU9uQixJQUFJLENBQUN1QixJQUFMLENBQVVILENBQUMsR0FBQ0EsQ0FBRixHQUFJQyxDQUFDLEdBQUNBLENBQWhCLENBQVA7QUFBMEI7O0FBQUEsUUFBTXRDLENBQU4sU0FBZ0JpRCxLQUFoQixDQUFxQjtBQUFDdEgsSUFBQUEsV0FBVyxDQUFDeUcsQ0FBQyxHQUFDLENBQUgsRUFBS0MsQ0FBQyxHQUFDRCxDQUFQLEVBQVM7QUFBQyxhQUFPLE1BQU1BLENBQU4sRUFBUUMsQ0FBUixHQUFXLElBQWxCO0FBQXVCOztBQUFLLFFBQURqQyxDQUFDLEdBQUU7QUFBQyxhQUFPLEtBQUssQ0FBTCxDQUFQO0FBQWU7O0FBQUssUUFBREEsQ0FBQyxDQUFDZ0MsQ0FBRCxFQUFHO0FBQUMsV0FBSyxDQUFMLElBQVFBLENBQVI7QUFBVTs7QUFBSyxRQUFEOUIsQ0FBQyxHQUFFO0FBQUMsYUFBTyxLQUFLLENBQUwsQ0FBUDtBQUFlOztBQUFLLFFBQURBLENBQUMsQ0FBQzhCLENBQUQsRUFBRztBQUFDLFdBQUssQ0FBTCxJQUFRQSxDQUFSO0FBQVU7O0FBQUE1QixJQUFBQSxHQUFHLENBQUM0QixDQUFELEVBQUdwQyxDQUFDLEdBQUNvQyxDQUFMLEVBQU87QUFBQyxVQUFJQyxDQUFKLEVBQU1DLENBQU4sRUFBUUMsQ0FBUjtBQUFVLGFBQU9ILENBQUMsQ0FBQ2pDLE1BQUYsR0FBUyxLQUFLb0IsSUFBTCxDQUFVYSxDQUFWLENBQVQsSUFBdUJDLENBQUMsR0FBQyxJQUFGLEVBQU9DLENBQUMsR0FBQ0YsQ0FBVCxFQUFXRyxDQUFDLEdBQUN2QyxDQUFiLEVBQWVxQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQXBCLEVBQXNCRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtFLENBQTNCLEVBQTZCLElBQXBELENBQVA7QUFBaUU7O0FBQUFoQixJQUFBQSxJQUFJLENBQUNlLENBQUQsRUFBRztBQUFDLFVBQUlELENBQUosRUFBTUQsQ0FBTjtBQUFRLGFBQU9BLENBQUMsR0FBQ0UsQ0FBRixFQUFJLENBQUNELENBQUMsR0FBQyxJQUFILEVBQVMsQ0FBVCxJQUFZRCxDQUFDLENBQUMsQ0FBRCxDQUFqQixFQUFxQkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUEzQixFQUErQixJQUF0QztBQUEyQzs7QUFBQWUsSUFBQUEsR0FBRyxDQUFDZixDQUFELEVBQUdDLENBQUgsRUFBSztBQUFDLGFBQU9BLENBQUMsR0FBQ3dXLENBQUMsQ0FBQyxJQUFELEVBQU16VyxDQUFOLEVBQVFDLENBQVIsQ0FBRixHQUFhd1csQ0FBQyxDQUFDLElBQUQsRUFBTSxJQUFOLEVBQVd6VyxDQUFYLENBQWYsRUFBNkIsSUFBcEM7QUFBeUM7O0FBQUFnQixJQUFBQSxHQUFHLENBQUNoQixDQUFELEVBQUdDLENBQUgsRUFBSztBQUFDLGFBQU9BLENBQUMsR0FBQ3lXLENBQUMsQ0FBQyxJQUFELEVBQU0xVyxDQUFOLEVBQVFDLENBQVIsQ0FBRixHQUFheVcsQ0FBQyxDQUFDLElBQUQsRUFBTSxJQUFOLEVBQVcxVyxDQUFYLENBQWYsRUFBNkIsSUFBcEM7QUFBeUM7O0FBQUFpQixJQUFBQSxRQUFRLENBQUNqQixDQUFELEVBQUc7QUFBQyxVQUFJRyxDQUFKLEVBQU1GLENBQU4sRUFBUUMsQ0FBUjtBQUFVLGFBQU9GLENBQUMsQ0FBQ2pDLE1BQUYsSUFBVWtDLENBQUMsR0FBQyxJQUFGLEVBQU9DLENBQUMsR0FBQ0YsQ0FBVCxFQUFXLENBQUNHLENBQUMsR0FBQyxJQUFILEVBQVMsQ0FBVCxJQUFZRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUMsQ0FBQyxDQUFELENBQTdCLEVBQWlDQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBdEQsSUFBMkR5VyxDQUFDLENBQUMsSUFBRCxFQUFNLElBQU4sRUFBVzNXLENBQVgsQ0FBNUQsRUFBMEUsSUFBakY7QUFBc0Y7O0FBQUFrQixJQUFBQSxNQUFNLENBQUNsQixDQUFELEVBQUc7QUFBQyxVQUFJRyxDQUFKLEVBQU1GLENBQU4sRUFBUUMsQ0FBUjtBQUFVLGFBQU9GLENBQUMsQ0FBQ2pDLE1BQUYsSUFBVWtDLENBQUMsR0FBQyxJQUFGLEVBQU9DLENBQUMsR0FBQ0YsQ0FBVCxFQUFXLENBQUNHLENBQUMsR0FBQyxJQUFILEVBQVMsQ0FBVCxJQUFZRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUMsQ0FBQyxDQUFELENBQTdCLEVBQWlDQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBdEQsSUFBMkR5VyxDQUFDLENBQUMsSUFBRCxFQUFNLElBQU4sRUFBVyxJQUFFM1csQ0FBYixDQUE1RCxFQUE0RSxJQUFuRjtBQUF3Rjs7QUFBQW1CLElBQUFBLE9BQU8sQ0FBQ2pCLENBQUMsR0FBQyxJQUFILEVBQVE7QUFBQyxVQUFJRCxDQUFKLEVBQU1ELENBQU47QUFBUSxhQUFPQSxDQUFDLEdBQUNFLENBQUYsRUFBSSxDQUFDRCxDQUFDLEdBQUMsSUFBSCxFQUFTLENBQVQsSUFBWSxJQUFFRCxDQUFDLENBQUMsQ0FBRCxDQUFuQixFQUF1QkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLElBQUVELENBQUMsQ0FBQyxDQUFELENBQS9CLEVBQW1DLElBQTFDO0FBQStDOztBQUFBWCxJQUFBQSxHQUFHLEdBQUU7QUFBQyxhQUFPdVgsRUFBRSxDQUFDLElBQUQsQ0FBVDtBQUFnQjs7QUFBQXhWLElBQUFBLFFBQVEsQ0FBQ2pCLENBQUQsRUFBRztBQUFDLFVBQUlILENBQUosRUFBTXBDLENBQU4sRUFBUXFDLENBQVIsRUFBVUMsQ0FBVjtBQUFZLGFBQU9DLENBQUMsSUFBRUgsQ0FBQyxHQUFDLElBQUYsRUFBT0MsQ0FBQyxHQUFDLENBQUNyQyxDQUFDLEdBQUN1QyxDQUFILEVBQU0sQ0FBTixJQUFTSCxDQUFDLENBQUMsQ0FBRCxDQUFuQixFQUF1QkUsQ0FBQyxHQUFDdEMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLb0MsQ0FBQyxDQUFDLENBQUQsQ0FBL0IsRUFBbUNuQixJQUFJLENBQUN1QixJQUFMLENBQVVILENBQUMsR0FBQ0EsQ0FBRixHQUFJQyxDQUFDLEdBQUNBLENBQWhCLENBQXJDLElBQXlEMFcsRUFBRSxDQUFDLElBQUQsQ0FBbkU7QUFBMEU7O0FBQUF2VixJQUFBQSxVQUFVLEdBQUU7QUFBQyxhQUFPLEtBQUtDLGVBQUwsRUFBUDtBQUE4Qjs7QUFBQUEsSUFBQUEsZUFBZSxDQUFDUixDQUFELEVBQUc7QUFBQyxVQUFJZCxDQUFKLEVBQU13QixDQUFOLEVBQVF2QixDQUFSLEVBQVVDLENBQVYsRUFBWUMsQ0FBWixFQUFjdkMsQ0FBZCxFQUFnQjRDLENBQWhCO0FBQWtCLGFBQU9NLENBQUMsSUFBRWQsQ0FBQyxHQUFDLElBQUYsRUFBT0MsQ0FBQyxHQUFDLENBQUN1QixDQUFDLEdBQUNWLENBQUgsRUFBTSxDQUFOLElBQVNkLENBQUMsQ0FBQyxDQUFELENBQW5CLEVBQXVCRSxDQUFDLEdBQUNzQixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUt4QixDQUFDLENBQUMsQ0FBRCxDQUEvQixFQUFtQ0MsQ0FBQyxHQUFDQSxDQUFGLEdBQUlDLENBQUMsR0FBQ0EsQ0FBM0MsS0FBK0NDLENBQUMsR0FBQyxJQUFGLEVBQU92QyxDQUFDLEdBQUN1QyxDQUFDLENBQUMsQ0FBRCxDQUFWLEVBQWNLLENBQUMsR0FBQ0wsQ0FBQyxDQUFDLENBQUQsQ0FBakIsRUFBcUJ2QyxDQUFDLEdBQUNBLENBQUYsR0FBSTRDLENBQUMsR0FBQ0EsQ0FBMUUsQ0FBUjtBQUFxRjs7QUFBQWtCLElBQUFBLE1BQU0sQ0FBQ3hCLENBQUMsR0FBQyxJQUFILEVBQVE7QUFBQyxVQUFJRCxDQUFKLEVBQU1ELENBQU47QUFBUSxhQUFPQSxDQUFDLEdBQUNFLENBQUYsRUFBSSxDQUFDRCxDQUFDLEdBQUMsSUFBSCxFQUFTLENBQVQsSUFBWSxDQUFDRCxDQUFDLENBQUMsQ0FBRCxDQUFsQixFQUFzQkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUNELENBQUMsQ0FBQyxDQUFELENBQTdCLEVBQWlDLElBQXhDO0FBQTZDOztBQUFBMkIsSUFBQUEsS0FBSyxDQUFDekIsQ0FBRCxFQUFHQyxDQUFILEVBQUs7QUFBQyxVQUFJRixDQUFKLEVBQU1ELENBQU47QUFBUSxhQUFPQSxDQUFDLEdBQUNHLENBQUYsRUFBSSxDQUFDRixDQUFDLEdBQUNDLENBQUgsRUFBTSxDQUFOLElBQVNGLENBQUMsQ0FBQyxDQUFELENBQVYsR0FBY0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUEvQjtBQUFtQzs7QUFBQTZCLElBQUFBLEtBQUssQ0FBQzdCLENBQUQsRUFBRztBQUFDLGFBQU8yVyxDQUFDLENBQUMsSUFBRCxFQUFNLElBQU4sRUFBVzNXLENBQVgsQ0FBRCxFQUFlLElBQXRCO0FBQTJCOztBQUFBOEIsSUFBQUEsU0FBUyxHQUFFO0FBQUMsVUFBSTVCLENBQUosRUFBTUQsQ0FBTixFQUFRRSxDQUFSLEVBQVV2QyxDQUFWLEVBQVlvQyxDQUFaO0FBQWMsYUFBT0UsQ0FBQyxHQUFDLElBQUYsRUFBT0MsQ0FBQyxHQUFDLENBQUNGLENBQUMsR0FBQyxJQUFILEVBQVMsQ0FBVCxDQUFULEVBQXFCckMsQ0FBQyxHQUFDcUMsQ0FBQyxDQUFDLENBQUQsQ0FBeEIsRUFBNEIsQ0FBQ0QsQ0FBQyxHQUFDRyxDQUFDLEdBQUNBLENBQUYsR0FBSXZDLENBQUMsR0FBQ0EsQ0FBVCxJQUFZLENBQVosS0FBZ0JvQyxDQUFDLEdBQUMsSUFBRW5CLElBQUksQ0FBQ3VCLElBQUwsQ0FBVUosQ0FBVixDQUFwQixDQUE1QixFQUE4REUsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtELENBQXhFLEVBQTBFRSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0QsQ0FBcEYsRUFBc0YsSUFBN0Y7QUFBa0c7O0FBQUErQixJQUFBQSxHQUFHLENBQUM3QixDQUFELEVBQUc7QUFBQyxVQUFJRCxDQUFKLEVBQU1ELENBQU47QUFBUSxhQUFPQSxDQUFDLEdBQUNFLENBQUYsRUFBSSxDQUFDRCxDQUFDLEdBQUMsSUFBSCxFQUFTLENBQVQsSUFBWUQsQ0FBQyxDQUFDLENBQUQsQ0FBYixHQUFpQkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUFsQztBQUFzQzs7QUFBQWdDLElBQUFBLE1BQU0sQ0FBQzlCLENBQUQsRUFBRztBQUFDLFVBQUlELENBQUosRUFBTUQsQ0FBTjtBQUFRLGFBQU9BLENBQUMsR0FBQ0UsQ0FBRixFQUFJLENBQUNELENBQUMsR0FBQyxJQUFILEVBQVMsQ0FBVCxNQUFjRCxDQUFDLENBQUMsQ0FBRCxDQUFmLElBQW9CQyxDQUFDLENBQUMsQ0FBRCxDQUFELEtBQU9ELENBQUMsQ0FBQyxDQUFELENBQXZDO0FBQTJDOztBQUFBNlcsSUFBQUEsWUFBWSxDQUFDclcsQ0FBRCxFQUFHO0FBQUMsVUFBSVAsQ0FBSixFQUFNckMsQ0FBTixFQUFRb0MsQ0FBUixFQUFVRSxDQUFWLEVBQVlDLENBQVo7QUFBYyxhQUFPRixDQUFDLEdBQUMsSUFBRixFQUFPRCxDQUFDLEdBQUNRLENBQVQsRUFBV04sQ0FBQyxHQUFDLENBQUN0QyxDQUFDLEdBQUMsSUFBSCxFQUFTLENBQVQsQ0FBYixFQUF5QnVDLENBQUMsR0FBQ3ZDLENBQUMsQ0FBQyxDQUFELENBQTVCLEVBQWdDcUMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtFLENBQUwsR0FBT0YsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRyxDQUFaLEdBQWNILENBQUMsQ0FBQyxDQUFELENBQXBELEVBQXdEQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0UsQ0FBTCxHQUFPRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtHLENBQVosR0FBY0gsQ0FBQyxDQUFDLENBQUQsQ0FBNUUsRUFBZ0YsSUFBdkY7QUFBNEY7O0FBQUFpQyxJQUFBQSxZQUFZLENBQUN6QixDQUFELEVBQUc7QUFBQyxVQUFJUCxDQUFKLEVBQU1DLENBQU4sRUFBUUYsQ0FBUjtBQUFVLFVBQUlHLENBQUosRUFBTXZDLENBQU47QUFBUSxhQUFPcUMsQ0FBQyxHQUFDLElBQUYsRUFBT0MsQ0FBQyxHQUFDLElBQVQsRUFBY0YsQ0FBQyxHQUFDUSxDQUFoQixFQUFrQkwsQ0FBQyxHQUFDRCxDQUFDLENBQUMsQ0FBRCxDQUFyQixFQUF5QnRDLENBQUMsR0FBQ3NDLENBQUMsQ0FBQyxDQUFELENBQTVCLEVBQWdDRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0csQ0FBTCxHQUFPSCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtwQyxDQUFaLEdBQWNvQyxDQUFDLENBQUMsRUFBRCxDQUFwRCxFQUF5REMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtHLENBQUwsR0FBT0gsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLcEMsQ0FBWixHQUFjb0MsQ0FBQyxDQUFDLEVBQUQsQ0FBN0UsRUFBa0YsSUFBekY7QUFBOEY7O0FBQUFaLElBQUFBLElBQUksQ0FBQzBCLENBQUQsRUFBR1UsQ0FBSCxFQUFLO0FBQUMsVUFBSXhCLENBQUosRUFBTUMsQ0FBTixFQUFRQyxDQUFSLEVBQVVDLENBQVYsRUFBWXZDLENBQVosRUFBYzRDLENBQWQ7QUFBZ0JSLE1BQUFBLENBQUMsR0FBQyxJQUFGLEVBQU9DLENBQUMsR0FBQyxJQUFULEVBQWNDLENBQUMsR0FBQ1ksQ0FBaEIsRUFBa0JYLENBQUMsR0FBQ3FCLENBQXBCLEVBQXNCNUQsQ0FBQyxHQUFDcUMsQ0FBQyxDQUFDLENBQUQsQ0FBekIsRUFBNkJPLENBQUMsR0FBQ1AsQ0FBQyxDQUFDLENBQUQsQ0FBaEMsRUFBb0NELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3BDLENBQUMsR0FBQ3VDLENBQUMsSUFBRUQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLdEMsQ0FBUCxDQUE1QyxFQUFzRG9DLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS1EsQ0FBQyxHQUFDTCxDQUFDLElBQUVELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS00sQ0FBUCxDQUE5RDtBQUF3RTs7QUFBQWtDLElBQUFBLEtBQUssR0FBRTtBQUFDLGFBQU8sSUFBSTlFLENBQUosQ0FBTSxLQUFLLENBQUwsQ0FBTixFQUFjLEtBQUssQ0FBTCxDQUFkLENBQVA7QUFBOEI7O0FBQUErRSxJQUFBQSxTQUFTLENBQUMzQyxDQUFELEVBQUdDLENBQUMsR0FBQyxDQUFMLEVBQU87QUFBQyxhQUFPLEtBQUssQ0FBTCxJQUFRRCxDQUFDLENBQUNDLENBQUQsQ0FBVCxFQUFhLEtBQUssQ0FBTCxJQUFRRCxDQUFDLENBQUNDLENBQUMsR0FBQyxDQUFILENBQXRCLEVBQTRCLElBQW5DO0FBQXdDOztBQUFBMkMsSUFBQUEsT0FBTyxDQUFDNUMsQ0FBQyxHQUFDLEVBQUgsRUFBTUMsQ0FBQyxHQUFDLENBQVIsRUFBVTtBQUFDLGFBQU9ELENBQUMsQ0FBQ0MsQ0FBRCxDQUFELEdBQUssS0FBSyxDQUFMLENBQUwsRUFBYUQsQ0FBQyxDQUFDQyxDQUFDLEdBQUMsQ0FBSCxDQUFELEdBQU8sS0FBSyxDQUFMLENBQXBCLEVBQTRCRCxDQUFuQztBQUFxQzs7QUFBaHpEOztBQUFpekQsUUFBTXVILENBQU4sU0FBZ0IvRyxDQUFoQixDQUFpQjtBQUFDakgsSUFBQUEsV0FBVyxDQUFDZ0ksQ0FBRCxFQUFHO0FBQUNsRCxNQUFBQSxLQUFLLEVBQUN1RCxDQUFDLEdBQUMsQ0FBVDtBQUFXdEQsTUFBQUEsTUFBTSxFQUFDOEQsQ0FBQyxHQUFDLENBQXBCO0FBQXNCMFUsTUFBQUEsYUFBYSxFQUFDdFUsQ0FBQyxHQUFDLENBQXRDO0FBQXdDdVUsTUFBQUEsY0FBYyxFQUFDMVUsQ0FBQyxHQUFDLENBQXpEO0FBQTJEWSxNQUFBQSxVQUFVLEVBQUM5QyxDQUFDLEdBQUM7QUFBeEUsUUFBNEUsRUFBL0UsRUFBa0Y7QUFBQyxVQUFJRixDQUFDLEdBQUN1QyxDQUFOO0FBQUEsVUFBUXRDLENBQUMsR0FBQ21DLENBQVY7QUFBQSxVQUFZckMsQ0FBQyxHQUFDLENBQUNDLENBQUMsR0FBQyxDQUFILEtBQU9DLENBQUMsR0FBQyxDQUFULENBQWQ7QUFBQSxVQUEwQnRDLENBQUMsR0FBQ3FDLENBQUMsR0FBQ0MsQ0FBRixHQUFJLENBQWhDO0FBQUEsVUFBa0NNLENBQUMsR0FBQyxJQUFJdEUsWUFBSixDQUFpQixJQUFFOEQsQ0FBbkIsQ0FBcEM7QUFBQSxVQUEwRGMsQ0FBQyxHQUFDLElBQUk1RSxZQUFKLENBQWlCLElBQUU4RCxDQUFuQixDQUE1RDtBQUFBLFVBQWtGd0IsQ0FBQyxHQUFDLElBQUl0RixZQUFKLENBQWlCLElBQUU4RCxDQUFuQixDQUFwRjtBQUFBLFVBQTBHeUIsQ0FBQyxHQUFDekIsQ0FBQyxHQUFDLEtBQUYsR0FBUSxJQUFJZ1gsV0FBSixDQUFnQnBaLENBQWhCLENBQVIsR0FBMkIsSUFBSW1HLFdBQUosQ0FBZ0JuRyxDQUFoQixDQUF2STtBQUEwSjJKLE1BQUFBLENBQUMsQ0FBQzBQLFVBQUYsQ0FBYXpXLENBQWIsRUFBZU0sQ0FBZixFQUFpQlUsQ0FBakIsRUFBbUJDLENBQW5CLEVBQXFCRyxDQUFyQixFQUF1QlEsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkJuQyxDQUEzQixFQUE2QkMsQ0FBN0IsR0FBZ0N3UixNQUFNLENBQUNDLE1BQVAsQ0FBY3hSLENBQWQsRUFBZ0I7QUFBQ3BFLFFBQUFBLFFBQVEsRUFBQztBQUFDQyxVQUFBQSxJQUFJLEVBQUMsQ0FBTjtBQUFRQyxVQUFBQSxJQUFJLEVBQUN1RTtBQUFiLFNBQVY7QUFBMEIwVyxRQUFBQSxNQUFNLEVBQUM7QUFBQ2xiLFVBQUFBLElBQUksRUFBQyxDQUFOO0FBQVFDLFVBQUFBLElBQUksRUFBQzZFO0FBQWIsU0FBakM7QUFBaUQzRSxRQUFBQSxFQUFFLEVBQUM7QUFBQ0gsVUFBQUEsSUFBSSxFQUFDLENBQU47QUFBUUMsVUFBQUEsSUFBSSxFQUFDdUY7QUFBYixTQUFwRDtBQUFvRXNELFFBQUFBLEtBQUssRUFBQztBQUFDN0ksVUFBQUEsSUFBSSxFQUFDd0Y7QUFBTjtBQUExRSxPQUFoQixDQUFoQyxFQUFxSSxNQUFNRixDQUFOLEVBQVFwQixDQUFSLENBQXJJO0FBQWdKOztBQUFpQixXQUFWOFcsVUFBVSxDQUFDeFYsQ0FBRCxFQUFHRixDQUFILEVBQUtLLENBQUwsRUFBT3BCLENBQVAsRUFBUzRCLENBQVQsRUFBV0ksQ0FBWCxFQUFhSCxDQUFiLEVBQWVsQyxDQUFmLEVBQWlCVyxDQUFqQixFQUFtQndCLENBQUMsR0FBQyxDQUFyQixFQUF1QkMsQ0FBQyxHQUFDLENBQXpCLEVBQTJCSixDQUFDLEdBQUMsQ0FBN0IsRUFBK0JsRCxDQUFDLEdBQUMsQ0FBakMsRUFBbUNvQixDQUFDLEdBQUMsQ0FBQyxDQUF0QyxFQUF3Q0wsQ0FBQyxHQUFDLENBQTFDLEVBQTRDcEMsQ0FBQyxHQUFDLENBQTlDLEVBQWdEO0FBQUMsVUFBSTRELENBQUMsR0FBQ3hCLENBQU47QUFBQSxVQUFRTSxDQUFDLEdBQUM4QixDQUFDLEdBQUNqQyxDQUFaO0FBQUEsVUFBY0ksQ0FBQyxHQUFDaUMsQ0FBQyxHQUFDMUIsQ0FBbEI7O0FBQW9CLFdBQUksSUFBSWIsQ0FBQyxHQUFDLENBQVYsRUFBWUEsQ0FBQyxJQUFFYSxDQUFmLEVBQWlCYixDQUFDLEVBQWxCLEVBQXFCO0FBQUMsWUFBSWpDLENBQUMsR0FBQ2lDLENBQUMsR0FBQ00sQ0FBRixHQUFJaUMsQ0FBQyxHQUFDLENBQVo7O0FBQWMsYUFBSSxJQUFJdEMsQ0FBQyxHQUFDLENBQVYsRUFBWUEsQ0FBQyxJQUFFQyxDQUFmLEVBQWlCRCxDQUFDLElBQUdGLENBQUMsRUFBdEIsRUFBeUI7QUFBQyxjQUFJOUIsQ0FBQyxHQUFDZ0MsQ0FBQyxHQUFDSSxDQUFGLEdBQUk4QixDQUFDLEdBQUMsQ0FBWjtBQUFjLGNBQUdYLENBQUMsQ0FBQyxJQUFFekIsQ0FBRixHQUFJc0MsQ0FBTCxDQUFELEdBQVNwRSxDQUFDLEdBQUNlLENBQVgsRUFBYXdDLENBQUMsQ0FBQyxJQUFFekIsQ0FBRixHQUFJdUMsQ0FBTCxDQUFELEdBQVN2RSxDQUFDLEdBQUNxQyxDQUF4QixFQUEwQm9CLENBQUMsQ0FBQyxJQUFFekIsQ0FBRixHQUFJbUMsQ0FBTCxDQUFELEdBQVNFLENBQUMsR0FBQyxDQUFyQyxFQUF1Q2QsQ0FBQyxDQUFDLElBQUV2QixDQUFGLEdBQUlzQyxDQUFMLENBQUQsR0FBUyxDQUFoRCxFQUFrRGYsQ0FBQyxDQUFDLElBQUV2QixDQUFGLEdBQUl1QyxDQUFMLENBQUQsR0FBUyxDQUEzRCxFQUE2RGhCLENBQUMsQ0FBQyxJQUFFdkIsQ0FBRixHQUFJbUMsQ0FBTCxDQUFELEdBQVNFLENBQUMsSUFBRSxDQUFILEdBQUssQ0FBTCxHQUFPLENBQUMsQ0FBOUUsRUFBZ0ZULENBQUMsQ0FBQyxJQUFFNUIsQ0FBSCxDQUFELEdBQU9FLENBQUMsR0FBQ0MsQ0FBekYsRUFBMkZ5QixDQUFDLENBQUMsSUFBRTVCLENBQUYsR0FBSSxDQUFMLENBQUQsR0FBUyxJQUFFQyxDQUFDLEdBQUNhLENBQXhHLEVBQTBHYixDQUFDLEtBQUdhLENBQUosSUFBT1osQ0FBQyxLQUFHQyxDQUF4SCxFQUEwSDtBQUFTLGNBQUlNLENBQUMsR0FBQ2UsQ0FBQyxHQUFDdEIsQ0FBRixHQUFJRCxDQUFDLElBQUVFLENBQUMsR0FBQyxDQUFKLENBQVg7QUFBQSxjQUFrQm9ILENBQUMsR0FBQy9GLENBQUMsR0FBQ3RCLENBQUYsR0FBSSxDQUFDRCxDQUFDLEdBQUMsQ0FBSCxLQUFPRSxDQUFDLEdBQUMsQ0FBVCxDQUF4QjtBQUFBLGNBQW9DTyxDQUFDLEdBQUNjLENBQUMsR0FBQ3RCLENBQUYsR0FBSSxDQUFDRCxDQUFDLEdBQUMsQ0FBSCxLQUFPRSxDQUFDLEdBQUMsQ0FBVCxDQUFKLEdBQWdCLENBQXREO0FBQUEsY0FBd0RzSCxDQUFDLEdBQUNqRyxDQUFDLEdBQUN0QixDQUFGLEdBQUlELENBQUMsSUFBRUUsQ0FBQyxHQUFDLENBQUosQ0FBTCxHQUFZLENBQXRFO0FBQXdFSyxVQUFBQSxDQUFDLENBQUMsSUFBRTVDLENBQUgsQ0FBRCxHQUFPNkMsQ0FBUCxFQUFTRCxDQUFDLENBQUMsSUFBRTVDLENBQUYsR0FBSSxDQUFMLENBQUQsR0FBUzJKLENBQWxCLEVBQW9CL0csQ0FBQyxDQUFDLElBQUU1QyxDQUFGLEdBQUksQ0FBTCxDQUFELEdBQVM2SixDQUE3QixFQUErQmpILENBQUMsQ0FBQyxJQUFFNUMsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTMkosQ0FBeEMsRUFBMEMvRyxDQUFDLENBQUMsSUFBRTVDLENBQUYsR0FBSSxDQUFMLENBQUQsR0FBUzhDLENBQW5ELEVBQXFERixDQUFDLENBQUMsSUFBRTVDLENBQUYsR0FBSSxDQUFMLENBQUQsR0FBUzZKLENBQTlELEVBQWdFN0osQ0FBQyxFQUFqRTtBQUFvRTtBQUFDO0FBQUM7O0FBQTV6Qjs7QUFBNnpCLE1BQUl1WixFQUFFLEdBQUM7QUFBQ0MsSUFBQUEsSUFBSSxFQUFDLENBQUMsQ0FBUDtBQUFTQyxJQUFBQSxNQUFNLEVBQUMsQ0FBaEI7QUFBa0JDLElBQUFBLEtBQUssRUFBQyxDQUF4QjtBQUEwQkMsSUFBQUEsR0FBRyxFQUFDLENBQTlCO0FBQWdDQyxJQUFBQSxTQUFTLEVBQUM7QUFBMUMsR0FBUDtBQUFBLE1BQW9EQyxFQUFFLEdBQUMsSUFBSXhYLENBQUosRUFBdkQ7QUFBQSxNQUE2RHlYLEVBQUUsR0FBQyxJQUFJOVosQ0FBSixFQUFoRTtBQUFBLE1BQXNFK1osRUFBRSxHQUFDLElBQUkvWixDQUFKLEVBQXpFO0FBQUEsTUFBK0VnYSxFQUFFLEdBQUMsSUFBSTNYLENBQUosRUFBbEY7QUFBQSxNQUF3RjRYLEVBQUUsR0FBQyxJQUFJNVgsQ0FBSixFQUEzRjtBQUFBLE1BQWlHNlgsRUFBRSxHQUFDLElBQUk3WCxDQUFKLEVBQXBHO0FBQUEsTUFBMEc4WCxFQUFFLEdBQUMsSUFBSTdYLENBQUosRUFBN0c7QUFBQSxNQUFtSDhYLEVBQUUsR0FBQyxJQUFJL1gsQ0FBSixFQUF0SDtBQUFBLE1BQTRIZ1ksRUFBRSxHQUFDLElBQUk5WCxDQUFKLEVBQS9IO0FBQUEsTUFBcUkrWCxFQUFFLEdBQUMsSUFBSWpZLENBQUosRUFBeEk7QUFBQSxNQUE4SWtZLEVBQUUsR0FBQyxJQUFJbFksQ0FBSixFQUFqSjtBQUFBLE1BQXVKbVksRUFBRSxHQUFDLElBQUlqWSxDQUFKLEVBQTFKO0FBQUEsTUFBZ0trWSxFQUFFLEdBQUMsSUFBSXBZLENBQUosRUFBbks7O0FBQXlLLFFBQU13SCxDQUFOLENBQU87QUFBQ2xPLElBQUFBLFdBQVcsQ0FBQztBQUFDK2UsTUFBQUEsT0FBTyxFQUFDclksQ0FBVDtBQUFXaEUsTUFBQUEsSUFBSSxFQUFDK0Q7QUFBaEIsS0FBRCxFQUFvQjtBQUFDLFdBQUtzWSxPQUFMLEdBQWFyWSxDQUFiLEVBQWUsS0FBS2hFLElBQUwsR0FBVStELENBQXpCLEVBQTJCLEtBQUt1WSxPQUFMLEdBQWEsQ0FBeEMsRUFBMEMsS0FBS0MsTUFBTCxHQUFZLENBQXRELEVBQXdELEtBQUtDLFFBQUwsR0FBY3pZLENBQUMsQ0FBQzBZLE1BQUYsQ0FBUzNhLE1BQVQsR0FBZ0IsQ0FBdEY7QUFBd0Y7O0FBQUFpQixJQUFBQSxNQUFNLENBQUNrQixDQUFDLEdBQUMsQ0FBSCxFQUFLQyxDQUFMLEVBQU87QUFBQyxVQUFJdkMsQ0FBQyxHQUFDdUMsQ0FBQyxHQUFDLENBQUQsR0FBRyxLQUFLcVksTUFBTCxHQUFZdFksQ0FBdEI7QUFBQSxVQUF3QkQsQ0FBQyxHQUFDLEtBQUtzWSxPQUFMLEdBQWEsS0FBS0UsUUFBNUM7QUFBQSxVQUFxRHpZLENBQUMsR0FBQ25CLElBQUksQ0FBQzhaLEtBQUwsQ0FBVzFZLENBQVgsQ0FBdkQ7QUFBQSxVQUFxRU8sQ0FBQyxHQUFDUCxDQUFDLEdBQUNELENBQXpFO0FBQUEsVUFBMkVjLENBQUMsR0FBQyxLQUFLN0UsSUFBTCxDQUFVeWMsTUFBVixDQUFpQjFZLENBQWpCLENBQTdFO0FBQUEsVUFBaUd3QixDQUFDLEdBQUMsS0FBS3ZGLElBQUwsQ0FBVXljLE1BQVYsQ0FBaUIsQ0FBQzFZLENBQUMsR0FBQyxDQUFILElBQU0sS0FBS3lZLFFBQTVCLENBQW5HO0FBQXlJLFdBQUtILE9BQUwsQ0FBYTFkLE9BQWIsQ0FBcUIsQ0FBQ3FGLENBQUQsRUFBR0QsQ0FBSCxLQUFPO0FBQUNnWSxRQUFBQSxFQUFFLENBQUNyVixTQUFILENBQWE3QixDQUFDLENBQUMvRSxRQUFmLEVBQXdCLElBQUVpRSxDQUExQixHQUE2QmlZLEVBQUUsQ0FBQ3RWLFNBQUgsQ0FBYTdCLENBQUMsQ0FBQ2lQLFVBQWYsRUFBMEIsSUFBRS9QLENBQTVCLENBQTdCLEVBQTREa1ksRUFBRSxDQUFDdlYsU0FBSCxDQUFhN0IsQ0FBQyxDQUFDZSxLQUFmLEVBQXFCLElBQUU3QixDQUF2QixDQUE1RCxFQUFzRm1ZLEVBQUUsQ0FBQ3hWLFNBQUgsQ0FBYW5CLENBQUMsQ0FBQ3pGLFFBQWYsRUFBd0IsSUFBRWlFLENBQTFCLENBQXRGLEVBQW1Ib1ksRUFBRSxDQUFDelYsU0FBSCxDQUFhbkIsQ0FBQyxDQUFDdU8sVUFBZixFQUEwQixJQUFFL1AsQ0FBNUIsQ0FBbkgsRUFBa0pxWSxFQUFFLENBQUMxVixTQUFILENBQWFuQixDQUFDLENBQUNLLEtBQWYsRUFBcUIsSUFBRTdCLENBQXZCLENBQWxKLEVBQTRLZ1ksRUFBRSxDQUFDNVksSUFBSCxDQUFRK1ksRUFBUixFQUFXM1gsQ0FBWCxDQUE1SyxFQUEwTHlYLEVBQUUsQ0FBQ3BLLEtBQUgsQ0FBU3VLLEVBQVQsRUFBWTVYLENBQVosQ0FBMUwsRUFBeU0wWCxFQUFFLENBQUM5WSxJQUFILENBQVFpWixFQUFSLEVBQVc3WCxDQUFYLENBQXpNLEVBQXVOUCxDQUFDLENBQUNsRSxRQUFGLENBQVdxRCxJQUFYLENBQWdCNFksRUFBaEIsRUFBbUJwYSxDQUFuQixDQUF2TixFQUE2T3FDLENBQUMsQ0FBQzhQLFVBQUYsQ0FBYWxDLEtBQWIsQ0FBbUJvSyxFQUFuQixFQUFzQnJhLENBQXRCLENBQTdPLEVBQXNRcUMsQ0FBQyxDQUFDNEIsS0FBRixDQUFRekMsSUFBUixDQUFhOFksRUFBYixFQUFnQnRhLENBQWhCLENBQXRRO0FBQXlSLE9BQXRUO0FBQXdUOztBQUF4a0I7O0FBQXlrQixNQUFJZ2IsRUFBRSxHQUFDLElBQUkxWSxDQUFKLEVBQVA7QUFBYSxTQUFPRixDQUFDLENBQUM2WSxTQUFGLEdBQVlwUixDQUFaLEVBQWN6SCxDQUFDLENBQUM4WSxHQUFGLEdBQU0sY0FBY3RZLENBQWQsQ0FBZTtBQUFDakgsSUFBQUEsV0FBVyxDQUFDZ0osQ0FBRCxFQUFHO0FBQUNsRSxNQUFBQSxLQUFLLEVBQUNtRCxDQUFDLEdBQUMsQ0FBVDtBQUFXbEQsTUFBQUEsTUFBTSxFQUFDbUQsQ0FBQyxHQUFDLENBQXBCO0FBQXNCbVQsTUFBQUEsS0FBSyxFQUFDclQsQ0FBQyxHQUFDLENBQTlCO0FBQWdDdVYsTUFBQUEsYUFBYSxFQUFDM1UsQ0FBQyxHQUFDLENBQWhEO0FBQWtENFUsTUFBQUEsY0FBYyxFQUFDdFAsQ0FBQyxHQUFDLENBQW5FO0FBQXFFc1IsTUFBQUEsYUFBYSxFQUFDOVosQ0FBQyxHQUFDLENBQXJGO0FBQXVGZ0UsTUFBQUEsVUFBVSxFQUFDWixDQUFDLEdBQUM7QUFBcEcsUUFBd0csRUFBM0csRUFBOEc7QUFBQyxVQUFJbkMsQ0FBQyxHQUFDaUMsQ0FBTjtBQUFBLFVBQVFuQyxDQUFDLEdBQUN5SCxDQUFWO0FBQUEsVUFBWXhILENBQUMsR0FBQ2hCLENBQWQ7QUFBQSxVQUFnQnVELENBQUMsR0FBQyxDQUFDdEMsQ0FBQyxHQUFDLENBQUgsS0FBT0YsQ0FBQyxHQUFDLENBQVQsSUFBWSxDQUFaLEdBQWMsQ0FBQ0UsQ0FBQyxHQUFDLENBQUgsS0FBT0QsQ0FBQyxHQUFDLENBQVQsSUFBWSxDQUExQixHQUE0QixDQUFDRCxDQUFDLEdBQUMsQ0FBSCxLQUFPQyxDQUFDLEdBQUMsQ0FBVCxJQUFZLENBQTFEO0FBQUEsVUFBNERxQyxDQUFDLEdBQUMsS0FBR3BDLENBQUMsR0FBQ0YsQ0FBRixHQUFJLENBQUosR0FBTUUsQ0FBQyxHQUFDRCxDQUFGLEdBQUksQ0FBVixHQUFZRCxDQUFDLEdBQUNDLENBQUYsR0FBSSxDQUFuQixDQUE5RDtBQUFBLFVBQW9GRSxDQUFDLEdBQUMsSUFBSWpFLFlBQUosQ0FBaUIsSUFBRXNHLENBQW5CLENBQXRGO0FBQUEsVUFBNEc1RSxDQUFDLEdBQUMsSUFBSTFCLFlBQUosQ0FBaUIsSUFBRXNHLENBQW5CLENBQTlHO0FBQUEsVUFBb0loQyxDQUFDLEdBQUMsSUFBSXRFLFlBQUosQ0FBaUIsSUFBRXNHLENBQW5CLENBQXRJO0FBQUEsVUFBNEoxQixDQUFDLEdBQUMwQixDQUFDLEdBQUMsS0FBRixHQUFRLElBQUl3VSxXQUFKLENBQWdCMVUsQ0FBaEIsQ0FBUixHQUEyQixJQUFJeUIsV0FBSixDQUFnQnpCLENBQWhCLENBQXpMO0FBQUEsVUFBNE1WLENBQUMsR0FBQyxDQUE5TTtBQUFBLFVBQWdOUSxDQUFDLEdBQUMsQ0FBbE47QUFBb05tRixNQUFBQSxDQUFDLENBQUMwUCxVQUFGLENBQWE5VyxDQUFiLEVBQWV2QyxDQUFmLEVBQWlCNEMsQ0FBakIsRUFBbUJNLENBQW5CLEVBQXFCUyxDQUFyQixFQUF1QkUsQ0FBdkIsRUFBeUJELENBQXpCLEVBQTJCdkIsQ0FBM0IsRUFBNkJELENBQTdCLEVBQStCLENBQS9CLEVBQWlDLENBQWpDLEVBQW1DLENBQW5DLEVBQXFDLENBQUMsQ0FBdEMsRUFBd0MsQ0FBQyxDQUF6QyxFQUEyQzRCLENBQTNDLEVBQTZDUSxDQUE3QyxHQUFnRG1GLENBQUMsQ0FBQzBQLFVBQUYsQ0FBYTlXLENBQWIsRUFBZXZDLENBQWYsRUFBaUI0QyxDQUFqQixFQUFtQk0sQ0FBbkIsRUFBcUJTLENBQXJCLEVBQXVCRSxDQUF2QixFQUF5QixDQUFDRCxDQUExQixFQUE0QnZCLENBQTVCLEVBQThCRCxDQUE5QixFQUFnQyxDQUFoQyxFQUFrQyxDQUFsQyxFQUFvQyxDQUFwQyxFQUFzQyxDQUF0QyxFQUF3QyxDQUFDLENBQXpDLEVBQTJDNEIsQ0FBQyxJQUFFLENBQUMzQixDQUFDLEdBQUMsQ0FBSCxLQUFPRCxDQUFDLEdBQUMsQ0FBVCxDQUE5QyxFQUEwRG9DLENBQUMsSUFBRW5DLENBQUMsR0FBQ0QsQ0FBL0QsQ0FBaEQsRUFBa0h1SCxDQUFDLENBQUMwUCxVQUFGLENBQWE5VyxDQUFiLEVBQWV2QyxDQUFmLEVBQWlCNEMsQ0FBakIsRUFBbUJNLENBQW5CLEVBQXFCVSxDQUFyQixFQUF1QkQsQ0FBdkIsRUFBeUJFLENBQXpCLEVBQTJCeEIsQ0FBM0IsRUFBNkJELENBQTdCLEVBQStCLENBQS9CLEVBQWlDLENBQWpDLEVBQW1DLENBQW5DLEVBQXFDLENBQXJDLEVBQXVDLENBQXZDLEVBQXlDNEIsQ0FBQyxJQUFFLENBQUMzQixDQUFDLEdBQUMsQ0FBSCxLQUFPRCxDQUFDLEdBQUMsQ0FBVCxDQUE1QyxFQUF3RG9DLENBQUMsSUFBRW5DLENBQUMsR0FBQ0QsQ0FBN0QsQ0FBbEgsRUFBa0x1SCxDQUFDLENBQUMwUCxVQUFGLENBQWE5VyxDQUFiLEVBQWV2QyxDQUFmLEVBQWlCNEMsQ0FBakIsRUFBbUJNLENBQW5CLEVBQXFCVSxDQUFyQixFQUF1QkQsQ0FBdkIsRUFBeUIsQ0FBQ0UsQ0FBMUIsRUFBNEJ4QixDQUE1QixFQUE4QkQsQ0FBOUIsRUFBZ0MsQ0FBaEMsRUFBa0MsQ0FBbEMsRUFBb0MsQ0FBcEMsRUFBc0MsQ0FBdEMsRUFBd0MsQ0FBQyxDQUF6QyxFQUEyQzRCLENBQUMsSUFBRSxDQUFDMUIsQ0FBQyxHQUFDLENBQUgsS0FBT0QsQ0FBQyxHQUFDLENBQVQsQ0FBOUMsRUFBMERtQyxDQUFDLElBQUVsQyxDQUFDLEdBQUNELENBQS9ELENBQWxMLEVBQW9Qc0gsQ0FBQyxDQUFDMFAsVUFBRixDQUFhOVcsQ0FBYixFQUFldkMsQ0FBZixFQUFpQjRDLENBQWpCLEVBQW1CTSxDQUFuQixFQUFxQlUsQ0FBckIsRUFBdUJDLENBQXZCLEVBQXlCLENBQUNGLENBQTFCLEVBQTRCckIsQ0FBNUIsRUFBOEJGLENBQTlCLEVBQWdDLENBQWhDLEVBQWtDLENBQWxDLEVBQW9DLENBQXBDLEVBQXNDLENBQUMsQ0FBdkMsRUFBeUMsQ0FBQyxDQUExQyxFQUE0QzRCLENBQUMsSUFBRSxDQUFDMUIsQ0FBQyxHQUFDLENBQUgsS0FBT0QsQ0FBQyxHQUFDLENBQVQsQ0FBL0MsRUFBMkRtQyxDQUFDLElBQUVsQyxDQUFDLEdBQUNELENBQWhFLENBQXBQLEVBQXVUc0gsQ0FBQyxDQUFDMFAsVUFBRixDQUFhOVcsQ0FBYixFQUFldkMsQ0FBZixFQUFpQjRDLENBQWpCLEVBQW1CTSxDQUFuQixFQUFxQlUsQ0FBckIsRUFBdUJDLENBQXZCLEVBQXlCRixDQUF6QixFQUEyQnJCLENBQTNCLEVBQTZCRixDQUE3QixFQUErQixDQUEvQixFQUFpQyxDQUFqQyxFQUFtQyxDQUFuQyxFQUFxQyxDQUFyQyxFQUF1QyxDQUFDLENBQXhDLEVBQTBDNEIsQ0FBQyxJQUFFLENBQUMxQixDQUFDLEdBQUMsQ0FBSCxLQUFPRixDQUFDLEdBQUMsQ0FBVCxDQUE3QyxFQUF5RG9DLENBQUMsSUFBRWxDLENBQUMsR0FBQ0YsQ0FBOUQsQ0FBdlQsRUFBd1gwUixNQUFNLENBQUNDLE1BQVAsQ0FBY3RQLENBQWQsRUFBZ0I7QUFBQ3RHLFFBQUFBLFFBQVEsRUFBQztBQUFDQyxVQUFBQSxJQUFJLEVBQUMsQ0FBTjtBQUFRQyxVQUFBQSxJQUFJLEVBQUNrRTtBQUFiLFNBQVY7QUFBMEIrVyxRQUFBQSxNQUFNLEVBQUM7QUFBQ2xiLFVBQUFBLElBQUksRUFBQyxDQUFOO0FBQVFDLFVBQUFBLElBQUksRUFBQzJCO0FBQWIsU0FBakM7QUFBaUR6QixRQUFBQSxFQUFFLEVBQUM7QUFBQ0gsVUFBQUEsSUFBSSxFQUFDLENBQU47QUFBUUMsVUFBQUEsSUFBSSxFQUFDdUU7QUFBYixTQUFwRDtBQUFvRXNFLFFBQUFBLEtBQUssRUFBQztBQUFDN0ksVUFBQUEsSUFBSSxFQUFDNkU7QUFBTjtBQUExRSxPQUFoQixDQUF4WCxFQUE2ZCxNQUFNeUIsQ0FBTixFQUFRRixDQUFSLENBQTdkO0FBQXdlOztBQUF2ekIsR0FBbkMsRUFBNDFCckMsQ0FBQyxDQUFDZ1osTUFBRixHQUFTLGNBQWNsWSxDQUFkLENBQWU7QUFBQ3ZILElBQUFBLFdBQVcsQ0FBQzRHLENBQUQsRUFBRztBQUFDK04sTUFBQUEsSUFBSSxFQUFDdFEsQ0FBQyxHQUFDLEVBQVI7QUFBV3VRLE1BQUFBLEdBQUcsRUFBQzNOLENBQUMsR0FBQyxHQUFqQjtBQUFxQnlOLE1BQUFBLEdBQUcsRUFBQ25OLENBQUMsR0FBQyxFQUEzQjtBQUE4QjdHLE1BQUFBLE1BQU0sRUFBQ3VILENBQUMsR0FBQyxDQUF2QztBQUF5QzhNLE1BQUFBLElBQUksRUFBQ3RPLENBQTlDO0FBQWdEdU8sTUFBQUEsS0FBSyxFQUFDdE8sQ0FBdEQ7QUFBd0R1TyxNQUFBQSxNQUFNLEVBQUMvTSxDQUEvRDtBQUFpRWdOLE1BQUFBLEdBQUcsRUFBQ2xOO0FBQXJFLFFBQXdFLEVBQTNFLEVBQThFO0FBQUMsWUFBTXBCLENBQU4sR0FBUyxLQUFLK04sSUFBTCxHQUFVdFEsQ0FBbkIsRUFBcUIsS0FBS3VRLEdBQUwsR0FBUzNOLENBQTlCLEVBQWdDLEtBQUt5TixHQUFMLEdBQVNuTixDQUF6QyxFQUEyQyxLQUFLN0csTUFBTCxHQUFZdUgsQ0FBdkQsRUFBeUQsS0FBS3FRLGdCQUFMLEdBQXNCLElBQUkzUixDQUFKLEVBQS9FLEVBQXFGLEtBQUswUixVQUFMLEdBQWdCLElBQUkxUixDQUFKLEVBQXJHLEVBQTJHLEtBQUsrWSxvQkFBTCxHQUEwQixJQUFJL1ksQ0FBSixFQUFySSxFQUEySUYsQ0FBQyxJQUFFQyxDQUFILEdBQUssS0FBS2laLFlBQUwsQ0FBa0I7QUFBQzVLLFFBQUFBLElBQUksRUFBQ3RPLENBQU47QUFBUXVPLFFBQUFBLEtBQUssRUFBQ3RPLENBQWQ7QUFBZ0J1TyxRQUFBQSxNQUFNLEVBQUMvTSxDQUF2QjtBQUF5QmdOLFFBQUFBLEdBQUcsRUFBQ2xOO0FBQTdCLE9BQWxCLENBQUwsR0FBd0QsS0FBSzRYLFdBQUwsRUFBbk07QUFBc047O0FBQUFBLElBQUFBLFdBQVcsQ0FBQztBQUFDakwsTUFBQUEsSUFBSSxFQUFDbE8sQ0FBQyxHQUFDLEtBQUtrTyxJQUFiO0FBQWtCQyxNQUFBQSxHQUFHLEVBQUNsTyxDQUFDLEdBQUMsS0FBS2tPLEdBQTdCO0FBQWlDRixNQUFBQSxHQUFHLEVBQUMvTixDQUFDLEdBQUMsS0FBSytOLEdBQTVDO0FBQWdEaFUsTUFBQUEsTUFBTSxFQUFDa0csQ0FBQyxHQUFDLEtBQUtsRztBQUE5RCxRQUFzRSxFQUF2RSxFQUEwRTtBQUFDLGFBQU8sS0FBSzRYLGdCQUFMLENBQXNCN0QsZUFBdEIsQ0FBc0M7QUFBQ0MsUUFBQUEsR0FBRyxFQUFDL04sQ0FBQyxJQUFFckIsSUFBSSxDQUFDOEIsRUFBTCxHQUFRLEdBQVYsQ0FBTjtBQUFxQjFHLFFBQUFBLE1BQU0sRUFBQ2tHLENBQTVCO0FBQThCK04sUUFBQUEsSUFBSSxFQUFDbE8sQ0FBbkM7QUFBcUNtTyxRQUFBQSxHQUFHLEVBQUNsTztBQUF6QyxPQUF0QyxHQUFtRixLQUFLNEQsSUFBTCxHQUFVLGFBQTdGLEVBQTJHLElBQWxIO0FBQXVIOztBQUFBcVYsSUFBQUEsWUFBWSxDQUFDO0FBQUNoTCxNQUFBQSxJQUFJLEVBQUNsTyxDQUFDLEdBQUMsS0FBS2tPLElBQWI7QUFBa0JDLE1BQUFBLEdBQUcsRUFBQ2xPLENBQUMsR0FBQyxLQUFLa08sR0FBN0I7QUFBaUNHLE1BQUFBLElBQUksRUFBQ3BPLENBQUMsR0FBQyxDQUFDLENBQXpDO0FBQTJDcU8sTUFBQUEsS0FBSyxFQUFDcE8sQ0FBQyxHQUFDLENBQW5EO0FBQXFEcU8sTUFBQUEsTUFBTSxFQUFDNVEsQ0FBQyxHQUFDLENBQUMsQ0FBL0Q7QUFBaUU2USxNQUFBQSxHQUFHLEVBQUNqTyxDQUFDLEdBQUM7QUFBdkUsUUFBMEUsRUFBM0UsRUFBOEU7QUFBQyxhQUFPLEtBQUtxUixnQkFBTCxDQUFzQnhELGNBQXRCLENBQXFDO0FBQUNDLFFBQUFBLElBQUksRUFBQ3BPLENBQU47QUFBUXFPLFFBQUFBLEtBQUssRUFBQ3BPLENBQWQ7QUFBZ0JxTyxRQUFBQSxNQUFNLEVBQUM1USxDQUF2QjtBQUF5QjZRLFFBQUFBLEdBQUcsRUFBQ2pPLENBQTdCO0FBQStCME4sUUFBQUEsSUFBSSxFQUFDbE8sQ0FBcEM7QUFBc0NtTyxRQUFBQSxHQUFHLEVBQUNsTztBQUExQyxPQUFyQyxHQUFtRixLQUFLNEQsSUFBTCxHQUFVLGNBQTdGLEVBQTRHLElBQW5IO0FBQXdIOztBQUFBME0sSUFBQUEsaUJBQWlCLEdBQUU7QUFBQyxhQUFPLE1BQU1BLGlCQUFOLElBQTBCLEtBQUtxQixVQUFMLENBQWdCelEsT0FBaEIsQ0FBd0IsS0FBSzBPLFdBQTdCLENBQTFCLEVBQW9FLEtBQUtvSixvQkFBTCxDQUEwQmhZLFFBQTFCLENBQW1DLEtBQUs0USxnQkFBeEMsRUFBeUQsS0FBS0QsVUFBOUQsQ0FBcEUsRUFBOEksSUFBcko7QUFBMEo7O0FBQUEzQyxJQUFBQSxNQUFNLENBQUNqUCxDQUFELEVBQUc7QUFBQyxhQUFPLE1BQU1pUCxNQUFOLENBQWFqUCxDQUFiLEVBQWUsQ0FBQyxDQUFoQixHQUFtQixJQUExQjtBQUErQjs7QUFBQW9aLElBQUFBLE9BQU8sQ0FBQ3BaLENBQUQsRUFBRztBQUFDLGFBQU9BLENBQUMsQ0FBQ2lDLFlBQUYsQ0FBZSxLQUFLMlAsVUFBcEIsR0FBZ0M1UixDQUFDLENBQUNpQyxZQUFGLENBQWUsS0FBSzRQLGdCQUFwQixDQUFoQyxFQUFzRSxJQUE3RTtBQUFrRjs7QUFBQXdILElBQUFBLFNBQVMsQ0FBQ3JaLENBQUQsRUFBRztBQUFDLGFBQU9BLENBQUMsQ0FBQ2lDLFlBQUYsQ0FBZTJPLENBQUMsQ0FBQ3pQLE9BQUYsQ0FBVSxLQUFLMFEsZ0JBQWYsQ0FBZixHQUFpRDdSLENBQUMsQ0FBQ2lDLFlBQUYsQ0FBZSxLQUFLNE4sV0FBcEIsQ0FBakQsRUFBa0YsSUFBekY7QUFBOEY7O0FBQUF5SixJQUFBQSxhQUFhLEdBQUU7QUFBQyxXQUFLQyxPQUFMLEtBQWUsS0FBS0EsT0FBTCxHQUFhLENBQUMsSUFBSXRaLENBQUosRUFBRCxFQUFPLElBQUlBLENBQUosRUFBUCxFQUFhLElBQUlBLENBQUosRUFBYixFQUFtQixJQUFJQSxDQUFKLEVBQW5CLEVBQXlCLElBQUlBLENBQUosRUFBekIsRUFBK0IsSUFBSUEsQ0FBSixFQUEvQixDQUE1QjtBQUFtRSxVQUFJRCxDQUFDLEdBQUMsS0FBS2laLG9CQUFYO0FBQWdDLFdBQUtNLE9BQUwsQ0FBYSxDQUFiLEVBQWdCbmIsR0FBaEIsQ0FBb0I0QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtBLENBQUMsQ0FBQyxDQUFELENBQTFCLEVBQThCQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtBLENBQUMsQ0FBQyxDQUFELENBQXBDLEVBQXdDQSxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU1BLENBQUMsQ0FBQyxDQUFELENBQS9DLEVBQW9Ed1osUUFBcEQsR0FBNkR4WixDQUFDLENBQUMsRUFBRCxDQUFELEdBQU1BLENBQUMsQ0FBQyxFQUFELENBQXBFLEVBQXlFLEtBQUt1WixPQUFMLENBQWEsQ0FBYixFQUFnQm5iLEdBQWhCLENBQW9CNEIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQSxDQUFDLENBQUMsQ0FBRCxDQUExQixFQUE4QkEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQSxDQUFDLENBQUMsQ0FBRCxDQUFwQyxFQUF3Q0EsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNQSxDQUFDLENBQUMsQ0FBRCxDQUEvQyxFQUFvRHdaLFFBQXBELEdBQTZEeFosQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNQSxDQUFDLENBQUMsRUFBRCxDQUE3SSxFQUFrSixLQUFLdVosT0FBTCxDQUFhLENBQWIsRUFBZ0JuYixHQUFoQixDQUFvQjRCLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0EsQ0FBQyxDQUFDLENBQUQsQ0FBMUIsRUFBOEJBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0EsQ0FBQyxDQUFDLENBQUQsQ0FBcEMsRUFBd0NBLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTUEsQ0FBQyxDQUFDLENBQUQsQ0FBL0MsRUFBb0R3WixRQUFwRCxHQUE2RHhaLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTUEsQ0FBQyxDQUFDLEVBQUQsQ0FBdE4sRUFBMk4sS0FBS3VaLE9BQUwsQ0FBYSxDQUFiLEVBQWdCbmIsR0FBaEIsQ0FBb0I0QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtBLENBQUMsQ0FBQyxDQUFELENBQTFCLEVBQThCQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtBLENBQUMsQ0FBQyxDQUFELENBQXBDLEVBQXdDQSxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU1BLENBQUMsQ0FBQyxDQUFELENBQS9DLEVBQW9Ed1osUUFBcEQsR0FBNkR4WixDQUFDLENBQUMsRUFBRCxDQUFELEdBQU1BLENBQUMsQ0FBQyxFQUFELENBQS9SLEVBQW9TLEtBQUt1WixPQUFMLENBQWEsQ0FBYixFQUFnQm5iLEdBQWhCLENBQW9CNEIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQSxDQUFDLENBQUMsQ0FBRCxDQUExQixFQUE4QkEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQSxDQUFDLENBQUMsQ0FBRCxDQUFwQyxFQUF3Q0EsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNQSxDQUFDLENBQUMsRUFBRCxDQUEvQyxFQUFxRHdaLFFBQXJELEdBQThEeFosQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNQSxDQUFDLENBQUMsRUFBRCxDQUF6VyxFQUE4VyxLQUFLdVosT0FBTCxDQUFhLENBQWIsRUFBZ0JuYixHQUFoQixDQUFvQjRCLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0EsQ0FBQyxDQUFDLENBQUQsQ0FBMUIsRUFBOEJBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0EsQ0FBQyxDQUFDLENBQUQsQ0FBcEMsRUFBd0NBLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTUEsQ0FBQyxDQUFDLEVBQUQsQ0FBL0MsRUFBcUR3WixRQUFyRCxHQUE4RHhaLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTUEsQ0FBQyxDQUFDLEVBQUQsQ0FBbmI7O0FBQXdiLFdBQUksSUFBSUUsQ0FBQyxHQUFDLENBQVYsRUFBWUEsQ0FBQyxHQUFDLENBQWQsRUFBZ0JBLENBQUMsRUFBakIsRUFBb0I7QUFBQyxZQUFJQyxDQUFDLEdBQUMsSUFBRSxLQUFLb1osT0FBTCxDQUFhclosQ0FBYixFQUFnQmtCLFFBQWhCLEVBQVI7QUFBbUMsYUFBS21ZLE9BQUwsQ0FBYXJaLENBQWIsRUFBZ0JlLFFBQWhCLENBQXlCZCxDQUF6QixHQUE0QixLQUFLb1osT0FBTCxDQUFhclosQ0FBYixFQUFnQnNaLFFBQWhCLElBQTBCclosQ0FBdEQ7QUFBd0Q7QUFBQzs7QUFBQXNaLElBQUFBLHFCQUFxQixDQUFDelosQ0FBRCxFQUFHO0FBQUMsVUFBRyxDQUFDQSxDQUFDLENBQUNuRSxRQUFGLENBQVdvSCxVQUFYLENBQXNCbEgsUUFBMUIsRUFBbUMsT0FBTSxDQUFDLENBQVA7QUFBU2lFLE1BQUFBLENBQUMsQ0FBQ25FLFFBQUYsQ0FBV3lLLE1BQVgsSUFBbUJ0RyxDQUFDLENBQUNuRSxRQUFGLENBQVd5SyxNQUFYLENBQWtCRSxNQUFsQixLQUEyQixJQUFFLENBQWhELElBQW1EeEcsQ0FBQyxDQUFDbkUsUUFBRixDQUFXNEsscUJBQVgsRUFBbkQ7QUFBc0YsVUFBSXhHLENBQUMsR0FBQzRRLENBQU47QUFBUTVRLE1BQUFBLENBQUMsQ0FBQ2QsSUFBRixDQUFPYSxDQUFDLENBQUNuRSxRQUFGLENBQVd5SyxNQUFYLENBQWtCQyxNQUF6QixHQUFpQ3RHLENBQUMsQ0FBQ2dDLFlBQUYsQ0FBZWpDLENBQUMsQ0FBQzZQLFdBQWpCLENBQWpDO0FBQStELFVBQUkzUCxDQUFDLEdBQUNGLENBQUMsQ0FBQ25FLFFBQUYsQ0FBV3lLLE1BQVgsQ0FBa0JFLE1BQWxCLEdBQXlCeEcsQ0FBQyxDQUFDNlAsV0FBRixDQUFjYixpQkFBZCxFQUEvQjtBQUFpRSxhQUFPLEtBQUswSyx1QkFBTCxDQUE2QnpaLENBQTdCLEVBQStCQyxDQUEvQixDQUFQO0FBQXlDOztBQUFBd1osSUFBQUEsdUJBQXVCLENBQUN4WixDQUFELEVBQUdDLENBQUgsRUFBSztBQUFDLFVBQUl2QyxDQUFDLEdBQUNrVCxDQUFOOztBQUFRLFdBQUksSUFBSTlRLENBQUMsR0FBQyxDQUFWLEVBQVlBLENBQUMsR0FBQyxDQUFkLEVBQWdCQSxDQUFDLEVBQWpCLEVBQW9CO0FBQUMsWUFBSUMsQ0FBQyxHQUFDLEtBQUtzWixPQUFMLENBQWF2WixDQUFiLENBQU47QUFBc0IsWUFBR3BDLENBQUMsQ0FBQ3VCLElBQUYsQ0FBT2MsQ0FBUCxFQUFVOEIsR0FBVixDQUFjN0IsQ0FBZCxJQUFpQkQsQ0FBQyxDQUFDdVosUUFBbkIsR0FBNkIsQ0FBQ3JaLENBQWpDLEVBQW1DLE9BQU0sQ0FBQyxDQUFQO0FBQVM7O0FBQUEsYUFBTSxDQUFDLENBQVA7QUFBUzs7QUFBN3RFLEdBQXAzQixFQUFtbEdILENBQUMsQ0FBQzJaLEtBQUYsR0FBUXhYLENBQTNsRyxFQUE2bEduQyxDQUFDLENBQUM0WixRQUFGLEdBQVcsY0FBY3BaLENBQWQsQ0FBZTtBQUFDakgsSUFBQUEsV0FBVyxDQUFDbUgsQ0FBRCxFQUFHO0FBQUM4RixNQUFBQSxNQUFNLEVBQUNqRyxDQUFDLEdBQUMsRUFBVjtBQUFhakMsTUFBQUEsTUFBTSxFQUFDaUosQ0FBQyxHQUFDLENBQXRCO0FBQXdCc1MsTUFBQUEsY0FBYyxFQUFDcFMsQ0FBQyxHQUFDLEVBQXpDO0FBQTRDc1AsTUFBQUEsY0FBYyxFQUFDOVgsQ0FBQyxHQUFDLENBQTdEO0FBQStEZ0UsTUFBQUEsVUFBVSxFQUFDakYsQ0FBQyxHQUFDO0FBQTVFLFFBQWdGLEVBQW5GLEVBQXNGO0FBQUMsVUFBSXFDLENBQUMsR0FBQ29ILENBQU47QUFBQSxVQUFRbkYsQ0FBQyxHQUFDckQsQ0FBVjtBQUFBLFVBQVlrRCxDQUFDLEdBQUMsQ0FBQ3NGLENBQUMsR0FBQyxDQUFILEtBQU94SSxDQUFDLEdBQUMsQ0FBVCxJQUFZLENBQTFCO0FBQUEsVUFBNEJmLENBQUMsR0FBQ3VKLENBQUMsSUFBRSxJQUFFLElBQUV4SSxDQUFOLENBQUQsR0FBVSxDQUF4QztBQUFBLFVBQTBDdUMsQ0FBQyxHQUFDLElBQUl0RixZQUFKLENBQWlCLElBQUVpRyxDQUFuQixDQUE1QztBQUFBLFVBQWtFVixDQUFDLEdBQUMsSUFBSXZGLFlBQUosQ0FBaUIsSUFBRWlHLENBQW5CLENBQXBFO0FBQUEsVUFBMEZFLENBQUMsR0FBQyxJQUFJbkcsWUFBSixDQUFpQixJQUFFaUcsQ0FBbkIsQ0FBNUY7QUFBQSxVQUFrSGhDLENBQUMsR0FBQ2dDLENBQUMsR0FBQyxLQUFGLEdBQVEsSUFBSTZVLFdBQUosQ0FBZ0I5WSxDQUFoQixDQUFSLEdBQTJCLElBQUk2RixXQUFKLENBQWdCN0YsQ0FBaEIsQ0FBL0k7QUFBQSxVQUFrSzBELENBQWxLO0FBQUEsVUFBb0tRLENBQXBLO0FBQUEsVUFBc0tJLENBQXRLO0FBQUEsVUFBd0t4QyxDQUFDLEdBQUMsQ0FBMUs7QUFBQSxVQUE0S3BDLENBQUMsR0FBQyxJQUFJcUMsQ0FBSixFQUE5SztBQUFvTDJCLE1BQUFBLENBQUMsR0FBQyxDQUFGLEVBQUlRLENBQUMsR0FBQyxDQUFDLEdBQUQsR0FBS21GLENBQVgsRUFBYS9FLENBQUMsR0FBQyxDQUFmLEVBQWlCaEIsQ0FBQyxDQUFDLElBQUV4QixDQUFGLEdBQUksQ0FBTCxDQUFELEdBQVM0QixDQUExQixFQUE0QkosQ0FBQyxDQUFDLElBQUV4QixDQUFGLEdBQUksQ0FBTCxDQUFELEdBQVNvQyxDQUFyQyxFQUF1Q1osQ0FBQyxDQUFDLElBQUV4QixDQUFGLEdBQUksQ0FBTCxDQUFELEdBQVN3QyxDQUFoRCxFQUFrRDVFLENBQUMsQ0FBQ1EsR0FBRixDQUFNd0QsQ0FBTixFQUFRUSxDQUFSLEVBQVVJLENBQVYsRUFBYVYsU0FBYixFQUFsRCxFQUEyRUwsQ0FBQyxDQUFDLElBQUV6QixDQUFILENBQUQsR0FBT3BDLENBQUMsQ0FBQ0ksQ0FBcEYsRUFBc0Z5RCxDQUFDLENBQUMsSUFBRXpCLENBQUYsR0FBSSxDQUFMLENBQUQsR0FBU3BDLENBQUMsQ0FBQ00sQ0FBakcsRUFBbUd1RCxDQUFDLENBQUMsSUFBRXpCLENBQUYsR0FBSSxDQUFMLENBQUQsR0FBU3BDLENBQUMsQ0FBQzZDLENBQTlHLEVBQWdINEIsQ0FBQyxDQUFDLElBQUVyQyxDQUFILENBQUQsR0FBTyxDQUF2SCxFQUF5SHFDLENBQUMsQ0FBQyxJQUFFckMsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTLENBQWxJO0FBQW9JLFVBQUk4QyxDQUFDLEdBQUM5QyxDQUFOO0FBQVE0QixNQUFBQSxDQUFDLEdBQUMsQ0FBRixFQUFJUSxDQUFDLEdBQUMsS0FBR21GLENBQVQsRUFBVy9FLENBQUMsR0FBQyxDQUFiLEVBQWVoQixDQUFDLENBQUMsSUFBRyxFQUFFeEIsQ0FBTCxHQUFPLENBQVIsQ0FBRCxHQUFZNEIsQ0FBM0IsRUFBNkJKLENBQUMsQ0FBQyxJQUFFeEIsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTb0MsQ0FBdEMsRUFBd0NaLENBQUMsQ0FBQyxJQUFFeEIsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTd0MsQ0FBakQsRUFBbUQ1RSxDQUFDLENBQUNRLEdBQUYsQ0FBTXdELENBQU4sRUFBUVEsQ0FBUixFQUFVSSxDQUFWLEVBQWFWLFNBQWIsRUFBbkQsRUFBNEVMLENBQUMsQ0FBQyxJQUFFekIsQ0FBSCxDQUFELEdBQU9wQyxDQUFDLENBQUNJLENBQXJGLEVBQXVGeUQsQ0FBQyxDQUFDLElBQUV6QixDQUFGLEdBQUksQ0FBTCxDQUFELEdBQVNwQyxDQUFDLENBQUNNLENBQWxHLEVBQW9HdUQsQ0FBQyxDQUFDLElBQUV6QixDQUFGLEdBQUksQ0FBTCxDQUFELEdBQVNwQyxDQUFDLENBQUM2QyxDQUEvRyxFQUFpSDRCLENBQUMsQ0FBQyxJQUFFckMsQ0FBSCxDQUFELEdBQU8sQ0FBeEgsRUFBMEhxQyxDQUFDLENBQUMsSUFBRXJDLENBQUYsR0FBSSxDQUFMLENBQUQsR0FBUyxDQUFuSTtBQUFxSSxVQUFJK0MsQ0FBQyxHQUFDL0MsQ0FBTjtBQUFRQSxNQUFBQSxDQUFDOztBQUFHLFdBQUksSUFBSVEsQ0FBQyxHQUFDLENBQVYsRUFBWUEsQ0FBQyxHQUFDSCxDQUFDLEdBQUMsQ0FBaEIsRUFBa0JHLENBQUMsRUFBbkIsRUFBc0I7QUFBQyxZQUFJRixDQUFDLEdBQUNFLENBQUMsR0FBQ0gsQ0FBUjs7QUFBVSxhQUFJLElBQUlTLENBQUMsR0FBQyxDQUFWLEVBQVlBLENBQUMsR0FBQ3dCLENBQUMsR0FBQyxDQUFoQixFQUFrQnhCLENBQUMsRUFBbkIsRUFBc0I7QUFBQyxjQUFJTCxDQUFDLEdBQUNLLENBQUMsR0FBQ3dCLENBQVI7QUFBVVYsVUFBQUEsQ0FBQyxHQUFDL0MsSUFBSSxDQUFDd08sR0FBTCxDQUFTL00sQ0FBQyxHQUFDekIsSUFBSSxDQUFDOEIsRUFBUCxHQUFVLENBQW5CLElBQXNCSixDQUF4QixFQUEwQjZCLENBQUMsR0FBQyxDQUFDM0IsQ0FBQyxHQUFDLEVBQUgsSUFBTzhHLENBQW5DLEVBQXFDL0UsQ0FBQyxHQUFDM0QsSUFBSSxDQUFDdU8sR0FBTCxDQUFTOU0sQ0FBQyxHQUFDekIsSUFBSSxDQUFDOEIsRUFBUCxHQUFVLENBQW5CLElBQXNCSixDQUE3RCxFQUErRGlCLENBQUMsQ0FBQyxJQUFFeEIsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTNEIsQ0FBeEUsRUFBMEVKLENBQUMsQ0FBQyxJQUFFeEIsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTb0MsQ0FBbkYsRUFBcUZaLENBQUMsQ0FBQyxJQUFFeEIsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTd0MsQ0FBOUYsRUFBZ0c1RSxDQUFDLENBQUNRLEdBQUYsQ0FBTXdELENBQU4sRUFBUVEsQ0FBUixFQUFVSSxDQUFWLEVBQWFWLFNBQWIsRUFBaEcsRUFBeUhMLENBQUMsQ0FBQyxJQUFFekIsQ0FBSCxDQUFELEdBQU9wQyxDQUFDLENBQUNJLENBQWxJLEVBQW9JeUQsQ0FBQyxDQUFDLElBQUV6QixDQUFGLEdBQUksQ0FBTCxDQUFELEdBQVNwQyxDQUFDLENBQUNNLENBQS9JLEVBQWlKdUQsQ0FBQyxDQUFDLElBQUV6QixDQUFGLEdBQUksQ0FBTCxDQUFELEdBQVNwQyxDQUFDLENBQUM2QyxDQUE1SixFQUE4SjRCLENBQUMsQ0FBQyxJQUFFckMsQ0FBSCxDQUFELEdBQU9NLENBQXJLLEVBQXVLK0IsQ0FBQyxDQUFDLElBQUVyQyxDQUFGLEdBQUksQ0FBTCxDQUFELEdBQVMsSUFBRVMsQ0FBbEwsRUFBb0xULENBQUMsRUFBckw7QUFBd0w7QUFBQzs7QUFBQSxVQUFJRSxDQUFDLEdBQUMsQ0FBTjtBQUFBLFVBQVFxQixDQUFDLEdBQUNlLENBQUMsR0FBQyxDQUFaOztBQUFjLFdBQUk5QixDQUFDLEdBQUMsQ0FBTixFQUFRQSxDQUFDLEdBQUNILENBQVYsRUFBWUcsQ0FBQyxFQUFiLEVBQWdCO0FBQUMsWUFBSStCLENBQUMsR0FBQy9CLENBQUMsR0FBQyxDQUFSOztBQUFVLGFBQUlMLENBQUMsQ0FBQyxJQUFFRCxDQUFGLEdBQUksQ0FBTCxDQUFELEdBQVM0QyxDQUFULEVBQVczQyxDQUFDLENBQUMsSUFBRUQsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTLElBQUVNLENBQUMsR0FBQ2UsQ0FBeEIsRUFBMEJwQixDQUFDLENBQUMsSUFBRUQsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTLElBQUVxQyxDQUFDLEdBQUNoQixDQUF2QyxFQUF5Q3JCLENBQUMsRUFBMUMsRUFBNkNZLENBQUMsR0FBQyxDQUFuRCxFQUFxREEsQ0FBQyxHQUFDd0IsQ0FBdkQsRUFBeUR4QixDQUFDLEVBQTFELEVBQTZEWCxDQUFDLENBQUMsSUFBRUQsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTLElBQUVNLENBQUMsR0FBQ2UsQ0FBSixJQUFPVCxDQUFDLEdBQUMsQ0FBVCxDQUFULEVBQXFCWCxDQUFDLENBQUMsSUFBRUQsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTLElBQUVNLENBQUMsR0FBQ2UsQ0FBSixJQUFPVCxDQUFDLEdBQUMsQ0FBVCxDQUE5QixFQUEwQ1gsQ0FBQyxDQUFDLElBQUVELENBQUYsR0FBSSxDQUFMLENBQUQsR0FBUyxJQUFFcUMsQ0FBQyxHQUFDaEIsQ0FBSixJQUFPVCxDQUFDLEdBQUMsQ0FBVCxDQUFuRCxFQUErRFgsQ0FBQyxDQUFDLElBQUcsRUFBRUQsQ0FBTCxHQUFPLENBQVIsQ0FBRCxHQUFZLElBQUVxQyxDQUFDLEdBQUNoQixDQUFKLElBQU9ULENBQUMsR0FBQyxDQUFULENBQTNFLEVBQXVGWCxDQUFDLENBQUMsSUFBRUQsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTLElBQUVNLENBQUMsR0FBQ2UsQ0FBSixJQUFPVCxDQUFDLEdBQUMsQ0FBVCxDQUFoRyxFQUE0R1gsQ0FBQyxDQUFDLElBQUVELENBQUYsR0FBSSxDQUFMLENBQUQsR0FBUyxJQUFFcUMsQ0FBQyxHQUFDaEIsQ0FBSixJQUFPVCxDQUFDLEdBQUMsQ0FBVCxDQUFySCxFQUFpSVosQ0FBQyxFQUFsSTs7QUFBcUlDLFFBQUFBLENBQUMsQ0FBQyxJQUFFRCxDQUFGLEdBQUksQ0FBTCxDQUFELEdBQVMsSUFBRXFDLENBQUMsR0FBQ2hCLENBQUosR0FBTWUsQ0FBZixFQUFpQm5DLENBQUMsQ0FBQyxJQUFFRCxDQUFGLEdBQUksQ0FBTCxDQUFELEdBQVMsSUFBRU0sQ0FBQyxHQUFDZSxDQUFKLEdBQU1lLENBQWhDLEVBQWtDbkMsQ0FBQyxDQUFDLElBQUVELENBQUYsR0FBSSxDQUFMLENBQUQsR0FBUzZDLENBQTNDLEVBQTZDN0MsQ0FBQyxFQUE5QztBQUFpRDs7QUFBQXdSLE1BQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjM1QsQ0FBZCxFQUFnQjtBQUFDakMsUUFBQUEsUUFBUSxFQUFDO0FBQUNDLFVBQUFBLElBQUksRUFBQyxDQUFOO0FBQVFDLFVBQUFBLElBQUksRUFBQ3VGO0FBQWIsU0FBVjtBQUEwQjBWLFFBQUFBLE1BQU0sRUFBQztBQUFDbGIsVUFBQUEsSUFBSSxFQUFDLENBQU47QUFBUUMsVUFBQUEsSUFBSSxFQUFDd0Y7QUFBYixTQUFqQztBQUFpRHRGLFFBQUFBLEVBQUUsRUFBQztBQUFDSCxVQUFBQSxJQUFJLEVBQUMsQ0FBTjtBQUFRQyxVQUFBQSxJQUFJLEVBQUNvRztBQUFiLFNBQXBEO0FBQW9FeUMsUUFBQUEsS0FBSyxFQUFDO0FBQUM3SSxVQUFBQSxJQUFJLEVBQUNrRTtBQUFOO0FBQTFFLE9BQWhCLEdBQXFHLE1BQU1PLENBQU4sRUFBUTFDLENBQVIsQ0FBckc7QUFBZ0g7O0FBQTNyQyxHQUF2bkcsRUFBb3pJZ0MsQ0FBQyxDQUFDOFosS0FBRixHQUFRMVgsQ0FBNXpJLEVBQTh6SXBDLENBQUMsQ0FBQzFGLE9BQUYsR0FBVSxNQUFLO0FBQUNmLElBQUFBLFdBQVcsQ0FBQ3lHLENBQUQsRUFBRztBQUFDaEUsTUFBQUEsSUFBSSxFQUFDeUYsQ0FBQyxHQUFDLEdBQVI7QUFBWXNZLE1BQUFBLE9BQU8sRUFBQzdaLENBQUMsR0FBQyxFQUF0QjtBQUF5QjhaLE1BQUFBLEtBQUssRUFBQzdaLENBQUMsR0FBQyxDQUFqQztBQUFtQzhaLE1BQUFBLFdBQVcsRUFBQ25aLENBQUMsR0FBQztBQUFqRCxRQUFzRCxFQUF6RCxFQUE0RDtBQUFDLFVBQUliLENBQUMsR0FBQyxJQUFOO0FBQVcsV0FBS2pHLEVBQUwsR0FBUWdHLENBQVIsRUFBVSxLQUFLeEMsT0FBTCxHQUFhO0FBQUMvQixRQUFBQSxLQUFLLEVBQUM7QUFBUCxPQUF2QixFQUFvQyxLQUFLeWUsSUFBTCxHQUFVO0FBQUNDLFFBQUFBLElBQUksRUFBQyxJQUFOO0FBQVdDLFFBQUFBLEtBQUssRUFBQyxJQUFqQjs7QUFBc0JDLFFBQUFBLElBQUksR0FBRTtBQUFDLGNBQUlyYSxDQUFDLEdBQUNDLENBQUMsQ0FBQ2lhLElBQUYsQ0FBT0MsSUFBYjtBQUFrQmxhLFVBQUFBLENBQUMsQ0FBQ2lhLElBQUYsQ0FBT0MsSUFBUCxHQUFZbGEsQ0FBQyxDQUFDaWEsSUFBRixDQUFPRSxLQUFuQixFQUF5Qm5hLENBQUMsQ0FBQ2lhLElBQUYsQ0FBT0UsS0FBUCxHQUFhcGEsQ0FBdEMsRUFBd0NDLENBQUMsQ0FBQ3pDLE9BQUYsQ0FBVS9CLEtBQVYsR0FBZ0J3RSxDQUFDLENBQUNpYSxJQUFGLENBQU9DLElBQVAsQ0FBWTlkLE9BQXBFO0FBQTRFOztBQUEzSCxPQUE5QyxFQUEySyxZQUFVO0FBQUMsWUFBSThELENBQUMsR0FBQ0gsQ0FBQyxDQUFDbkcsUUFBRixDQUFXeWdCLFVBQVgsQ0FBdUIsZUFBY3RhLENBQUMsQ0FBQ25HLFFBQUYsQ0FBV3VhLFFBQVgsR0FBb0IsRUFBcEIsR0FBdUIsT0FBUSxjQUFwRSxDQUFOO0FBQUEsWUFBeUZsVSxDQUFDLEdBQUM7QUFBQzdCLFVBQUFBLEtBQUssRUFBQ29ELENBQVA7QUFBU25ELFVBQUFBLE1BQU0sRUFBQ21ELENBQWhCO0FBQWtCb0MsVUFBQUEsSUFBSSxFQUFDN0QsQ0FBQyxDQUFDbkcsUUFBRixDQUFXdWEsUUFBWCxHQUFvQnBVLENBQUMsQ0FBQ3VhLFVBQXRCLEdBQWlDdmEsQ0FBQyxDQUFDbkcsUUFBRixDQUFXeWdCLFVBQVgsQ0FBc0JFLHNCQUF0QixHQUE2Q3hhLENBQUMsQ0FBQ25HLFFBQUYsQ0FBV3lnQixVQUFYLENBQXNCRSxzQkFBdEIsQ0FBNkNDLGNBQTFGLEdBQXlHemEsQ0FBQyxDQUFDdVMsYUFBbks7QUFBaUxDLFVBQUFBLE1BQU0sRUFBQ3hTLENBQUMsQ0FBQ3lTLElBQTFMO0FBQStMQyxVQUFBQSxjQUFjLEVBQUMxUyxDQUFDLENBQUNuRyxRQUFGLENBQVd1YSxRQUFYLEdBQW9CcFUsQ0FBQyxDQUFDMGEsT0FBdEIsR0FBOEIxYSxDQUFDLENBQUN5UyxJQUE5TztBQUFtUGxXLFVBQUFBLFNBQVMsRUFBQzRELENBQUMsR0FBQ0gsQ0FBQyxDQUFDeEQsTUFBSCxHQUFVd0QsQ0FBQyxDQUFDcVYsT0FBMVE7QUFBa1JULFVBQUFBLEtBQUssRUFBQyxDQUFDO0FBQXpSLFNBQTNGO0FBQXVYM1UsUUFBQUEsQ0FBQyxDQUFDaWEsSUFBRixDQUFPQyxJQUFQLEdBQVksSUFBSTVYLENBQUosQ0FBTXZDLENBQU4sRUFBUUUsQ0FBUixDQUFaLEVBQXVCRCxDQUFDLENBQUNpYSxJQUFGLENBQU9FLEtBQVAsR0FBYSxJQUFJN1gsQ0FBSixDQUFNdkMsQ0FBTixFQUFRRSxDQUFSLENBQXBDLEVBQStDRCxDQUFDLENBQUNpYSxJQUFGLENBQU9HLElBQVAsRUFBL0M7QUFBNkQsT0FBL2IsRUFBM0ssRUFBNm1CLEtBQUtwZ0IsTUFBTCxHQUFZLENBQXpuQixFQUEybkIsS0FBS0MsS0FBTCxHQUFXLElBQUkwRCxDQUFKLEVBQXRvQixFQUE0b0IsS0FBS3hELFFBQUwsR0FBYyxJQUFJd0QsQ0FBSixFQUExcEIsRUFBZ3FCLEtBQUt2QyxJQUFMLEdBQVUsSUFBSWdILENBQUosQ0FBTXJDLENBQU4sRUFBUTtBQUFDbkUsUUFBQUEsUUFBUSxFQUFDLElBQUkyRSxDQUFKLENBQU1SLENBQU4sRUFBUTtBQUFDakUsVUFBQUEsUUFBUSxFQUFDO0FBQUNDLFlBQUFBLElBQUksRUFBQyxDQUFOO0FBQVFDLFlBQUFBLElBQUksRUFBQyxJQUFJQyxZQUFKLENBQWlCLENBQUMsQ0FBQyxDQUFGLEVBQUksQ0FBQyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQUMsQ0FBVixFQUFZLENBQUMsQ0FBYixFQUFlLENBQWYsQ0FBakI7QUFBYixXQUFWO0FBQTREQyxVQUFBQSxFQUFFLEVBQUM7QUFBQ0gsWUFBQUEsSUFBSSxFQUFDLENBQU47QUFBUUMsWUFBQUEsSUFBSSxFQUFDLElBQUlDLFlBQUosQ0FBaUIsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsQ0FBakI7QUFBYjtBQUEvRCxTQUFSLENBQVY7QUFBaUlaLFFBQUFBLE9BQU8sRUFBQyxJQUFJa0csQ0FBSixDQUFNeEIsQ0FBTixFQUFRO0FBQUM3QyxVQUFBQSxNQUFNLEVBQUMsK0tBQVI7QUFBd0xDLFVBQUFBLFFBQVEsRUFBQywyckJBQWpNO0FBQTYzQjdCLFVBQUFBLFFBQVEsRUFBQztBQUFDb2YsWUFBQUEsSUFBSSxFQUFDMWEsQ0FBQyxDQUFDekMsT0FBUjtBQUFnQm9kLFlBQUFBLFFBQVEsRUFBQztBQUFDbmYsY0FBQUEsS0FBSyxFQUFDLEtBQUd5RTtBQUFWLGFBQXpCO0FBQXNDMmEsWUFBQUEsTUFBTSxFQUFDO0FBQUNwZixjQUFBQSxLQUFLLEVBQUMwRTtBQUFQLGFBQTdDO0FBQXVEMmEsWUFBQUEsWUFBWSxFQUFDO0FBQUNyZixjQUFBQSxLQUFLLEVBQUNxRjtBQUFQLGFBQXBFO0FBQThFaWEsWUFBQUEsT0FBTyxFQUFDO0FBQUN0ZixjQUFBQSxLQUFLLEVBQUM7QUFBUCxhQUF0RjtBQUFnR3VmLFlBQUFBLE1BQU0sRUFBQztBQUFDdmYsY0FBQUEsS0FBSyxFQUFDd0UsQ0FBQyxDQUFDL0Y7QUFBVCxhQUF2RztBQUF1SCtnQixZQUFBQSxTQUFTLEVBQUM7QUFBQ3hmLGNBQUFBLEtBQUssRUFBQ3dFLENBQUMsQ0FBQzdGO0FBQVQ7QUFBakksV0FBdDRCO0FBQTJoQ2lOLFVBQUFBLFNBQVMsRUFBQyxDQUFDO0FBQXRpQyxTQUFSO0FBQXpJLE9BQVIsQ0FBMXFCO0FBQSsyRDs7QUFBQXJJLElBQUFBLE1BQU0sR0FBRTtBQUFDLFdBQUszRCxJQUFMLENBQVVDLE9BQVYsQ0FBa0JDLFFBQWxCLENBQTJCd2YsT0FBM0IsQ0FBbUN0ZixLQUFuQyxHQUF5QyxLQUFLeEIsTUFBOUMsRUFBcUQsS0FBS0QsRUFBTCxDQUFRSCxRQUFSLENBQWlCeUYsTUFBakIsQ0FBd0I7QUFBQ0MsUUFBQUEsS0FBSyxFQUFDLEtBQUtsRSxJQUFaO0FBQWlCNkksUUFBQUEsTUFBTSxFQUFDLEtBQUtnVyxJQUFMLENBQVVFLEtBQWxDO0FBQXdDYyxRQUFBQSxLQUFLLEVBQUMsQ0FBQztBQUEvQyxPQUF4QixDQUFyRCxFQUFnSSxLQUFLaEIsSUFBTCxDQUFVRyxJQUFWLEVBQWhJO0FBQWlKOztBQUE3bEUsR0FBNzBJLEVBQTQ2TXJhLENBQUMsQ0FBQ21iLEtBQUYsR0FBUSxNQUFLO0FBQUM1aEIsSUFBQUEsV0FBVyxDQUFDeUcsQ0FBRCxFQUFHO0FBQUMvRCxNQUFBQSxJQUFJLEVBQUNrRSxDQUFDLEdBQUMsSUFBSWpFLFlBQUosQ0FBaUIsRUFBakIsQ0FBUjtBQUE2QkwsTUFBQUEsUUFBUSxFQUFDK0IsQ0FBQyxHQUFDLElBQUk0QyxDQUFKLENBQU1SLENBQU4sRUFBUTtBQUFDakUsUUFBQUEsUUFBUSxFQUFDO0FBQUNDLFVBQUFBLElBQUksRUFBQyxDQUFOO0FBQVFDLFVBQUFBLElBQUksRUFBQyxJQUFJQyxZQUFKLENBQWlCLENBQUMsQ0FBQyxDQUFGLEVBQUksQ0FBQyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQUMsQ0FBVixFQUFZLENBQUMsQ0FBYixFQUFlLENBQWYsQ0FBakI7QUFBYixTQUFWO0FBQTREQyxRQUFBQSxFQUFFLEVBQUM7QUFBQ0gsVUFBQUEsSUFBSSxFQUFDLENBQU47QUFBUUMsVUFBQUEsSUFBSSxFQUFDLElBQUlDLFlBQUosQ0FBaUIsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsQ0FBakI7QUFBYjtBQUEvRCxPQUFSO0FBQXhDLEtBQUgsRUFBbUs7QUFBQyxXQUFLbEMsRUFBTCxHQUFRZ0csQ0FBUjtBQUFVLFVBQUljLENBQUMsR0FBQ1gsQ0FBTjtBQUFRLFdBQUtpYixNQUFMLEdBQVksRUFBWixFQUFlLEtBQUt2ZixRQUFMLEdBQWMrQixDQUE3QixFQUErQixLQUFLeWQsVUFBTCxHQUFnQnZhLENBQUMsQ0FBQy9DLE1BQUYsR0FBUyxDQUF4RCxFQUEwRCxLQUFLL0IsSUFBTCxHQUFVNkMsSUFBSSxDQUFDeWMsR0FBTCxDQUFTLENBQVQsRUFBV3pjLElBQUksQ0FBQzBjLElBQUwsQ0FBVTFjLElBQUksQ0FBQzJjLEdBQUwsQ0FBUzNjLElBQUksQ0FBQzBjLElBQUwsQ0FBVTFjLElBQUksQ0FBQ3VCLElBQUwsQ0FBVSxLQUFLaWIsVUFBZixDQUFWLENBQVQsSUFBZ0R4YyxJQUFJLENBQUM0YyxHQUEvRCxDQUFYLENBQXBFLEVBQW9KLEtBQUtDLE1BQUwsR0FBWSxJQUFJeGYsWUFBSixDQUFpQixJQUFFLEtBQUttZixVQUF4QixDQUFoSzs7QUFBb00sV0FBSSxJQUFJcGIsQ0FBQyxHQUFDLENBQVYsRUFBWUEsQ0FBQyxHQUFDLEtBQUtvYixVQUFuQixFQUE4QnBiLENBQUMsRUFBL0IsRUFBa0M7QUFBQyxZQUFJdUIsQ0FBQyxHQUFDdkIsQ0FBQyxHQUFDLEtBQUtqRSxJQUFQLEdBQVksS0FBS0EsSUFBdkI7QUFBQSxZQUE0QnlGLENBQUMsR0FBQzVDLElBQUksQ0FBQzhaLEtBQUwsQ0FBVzFZLENBQUMsR0FBQyxLQUFLakUsSUFBbEIsSUFBd0IsS0FBS0EsSUFBM0Q7QUFBZ0UsYUFBSzBmLE1BQUwsQ0FBWXRkLEdBQVosQ0FBZ0IsQ0FBQ29ELENBQUQsRUFBR0MsQ0FBSCxDQUFoQixFQUFzQixJQUFFeEIsQ0FBeEI7QUFBMkI7O0FBQUEsVUFBSXNCLENBQUMsR0FBQyxDQUFDLE1BQUk7QUFBQyxZQUFHVCxDQUFDLENBQUMvQyxNQUFGLEtBQVcsS0FBSy9CLElBQUwsR0FBVSxLQUFLQSxJQUFmLEdBQW9CLENBQWxDLEVBQW9DLE9BQU84RSxDQUFQO0FBQVM7QUFBQyxjQUFJZCxDQUFDLEdBQUMsSUFBSTlELFlBQUosQ0FBaUIsS0FBS0YsSUFBTCxHQUFVLEtBQUtBLElBQWYsR0FBb0IsQ0FBckMsQ0FBTjtBQUE4QyxpQkFBT2dFLENBQUMsQ0FBQzVCLEdBQUYsQ0FBTTBDLENBQU4sR0FBU2QsQ0FBaEI7QUFBa0I7QUFBQyxPQUFySCxHQUFOOztBQUErSCxXQUFLeEMsT0FBTCxHQUFhO0FBQUMvQixRQUFBQSxLQUFLLEVBQUMsSUFBSTZHLENBQUosQ0FBTXRDLENBQU4sRUFBUTtBQUFDbkQsVUFBQUEsS0FBSyxFQUFDMEUsQ0FBUDtBQUFTMkMsVUFBQUEsTUFBTSxFQUFDbEUsQ0FBQyxDQUFDc1MsVUFBbEI7QUFBNkJ6TyxVQUFBQSxJQUFJLEVBQUM3RCxDQUFDLENBQUM4RCxLQUFwQztBQUEwQzBPLFVBQUFBLE1BQU0sRUFBQ3hTLENBQUMsQ0FBQ3lTLElBQW5EO0FBQXdEQyxVQUFBQSxjQUFjLEVBQUMxUyxDQUFDLENBQUNuRyxRQUFGLENBQVd1YSxRQUFYLEdBQW9CcFUsQ0FBQyxDQUFDMmIsT0FBdEIsR0FBOEIzYixDQUFDLENBQUN5UyxJQUF2RztBQUE0R0UsVUFBQUEsS0FBSyxFQUFDM1MsQ0FBQyxDQUFDNFMsYUFBcEg7QUFBa0lDLFVBQUFBLEtBQUssRUFBQzdTLENBQUMsQ0FBQzRTLGFBQTFJO0FBQXdKRSxVQUFBQSxlQUFlLEVBQUMsQ0FBQyxDQUF6SztBQUEyS3ZXLFVBQUFBLFNBQVMsRUFBQ3lELENBQUMsQ0FBQ3FWLE9BQXZMO0FBQStMNVksVUFBQUEsU0FBUyxFQUFDdUQsQ0FBQyxDQUFDcVYsT0FBM007QUFBbU5oWCxVQUFBQSxLQUFLLEVBQUMsS0FBS3JDLElBQTlOO0FBQW1Pa1gsVUFBQUEsS0FBSyxFQUFDLENBQUM7QUFBMU8sU0FBUjtBQUFQLE9BQWI7QUFBMlEsVUFBSWhULENBQUMsR0FBQztBQUFDN0IsUUFBQUEsS0FBSyxFQUFDLEtBQUtyQyxJQUFaO0FBQWlCc0MsUUFBQUEsTUFBTSxFQUFDLEtBQUt0QyxJQUE3QjtBQUFrQzZILFFBQUFBLElBQUksRUFBQzdELENBQUMsQ0FBQ25HLFFBQUYsQ0FBV3VhLFFBQVgsR0FBb0JwVSxDQUFDLENBQUN1YSxVQUF0QixHQUFpQ3ZhLENBQUMsQ0FBQ25HLFFBQUYsQ0FBV3lnQixVQUFYLENBQXNCRSxzQkFBdEIsR0FBNkN4YSxDQUFDLENBQUNuRyxRQUFGLENBQVd5Z0IsVUFBWCxDQUFzQkUsc0JBQXRCLENBQTZDQyxjQUExRixHQUF5R3phLENBQUMsQ0FBQ3VTLGFBQW5MO0FBQWlNQyxRQUFBQSxNQUFNLEVBQUN4UyxDQUFDLENBQUN5UyxJQUExTTtBQUErTUMsUUFBQUEsY0FBYyxFQUFDMVMsQ0FBQyxDQUFDbkcsUUFBRixDQUFXdWEsUUFBWCxHQUFvQnBVLENBQUMsQ0FBQzBhLE9BQXRCLEdBQThCMWEsQ0FBQyxDQUFDeVMsSUFBOVA7QUFBbVFsVyxRQUFBQSxTQUFTLEVBQUN5RCxDQUFDLENBQUNxVixPQUEvUTtBQUF1UlQsUUFBQUEsS0FBSyxFQUFDLENBQUMsQ0FBOVI7QUFBZ1MzQixRQUFBQSxlQUFlLEVBQUM7QUFBaFQsT0FBTjtBQUF5VCxXQUFLMkksR0FBTCxHQUFTO0FBQUN6QixRQUFBQSxJQUFJLEVBQUMsSUFBSTVYLENBQUosQ0FBTXZDLENBQU4sRUFBUUUsQ0FBUixDQUFOO0FBQWlCa2EsUUFBQUEsS0FBSyxFQUFDLElBQUk3WCxDQUFKLENBQU12QyxDQUFOLEVBQVFFLENBQVIsQ0FBdkI7QUFBa0NtYSxRQUFBQSxJQUFJLEVBQUMsTUFBSTtBQUFDLGNBQUlyYSxDQUFDLEdBQUMsS0FBSzRiLEdBQUwsQ0FBU3pCLElBQWY7QUFBb0IsZUFBS3lCLEdBQUwsQ0FBU3pCLElBQVQsR0FBYyxLQUFLeUIsR0FBTCxDQUFTeEIsS0FBdkIsRUFBNkIsS0FBS3dCLEdBQUwsQ0FBU3hCLEtBQVQsR0FBZXBhLENBQTVDLEVBQThDLEtBQUt4QyxPQUFMLENBQWEvQixLQUFiLEdBQW1CLEtBQUttZ0IsR0FBTCxDQUFTekIsSUFBVCxDQUFjOWQsT0FBL0U7QUFBdUY7QUFBdkosT0FBVDtBQUFrSzs7QUFBQXdmLElBQUFBLE9BQU8sQ0FBQztBQUFDMWUsTUFBQUEsTUFBTSxFQUFDUyxDQUFDLEdBQUMsK0tBQVY7QUFBMExSLE1BQUFBLFFBQVEsRUFBQ29ELENBQUMsR0FBQyxnS0FBck07QUFBc1dqRixNQUFBQSxRQUFRLEVBQUN5RSxDQUFDLEdBQUMsRUFBalg7QUFBb1g4YixNQUFBQSxjQUFjLEVBQUM3YixDQUFDLEdBQUMsTUFBclk7QUFBNFk4YixNQUFBQSxPQUFPLEVBQUNqYixDQUFDLEdBQUMsQ0FBQztBQUF2WixRQUEwWixFQUEzWixFQUE4WjtBQUFDZCxNQUFBQSxDQUFDLENBQUNDLENBQUQsQ0FBRCxHQUFLLEtBQUt6QyxPQUFWO0FBQWtCLFVBQUkwQyxDQUFDLEdBQUMsSUFBSXNCLENBQUosQ0FBTSxLQUFLeEgsRUFBWCxFQUFjO0FBQUNtRCxRQUFBQSxNQUFNLEVBQUNTLENBQVI7QUFBVVIsUUFBQUEsUUFBUSxFQUFDb0QsQ0FBbkI7QUFBcUJqRixRQUFBQSxRQUFRLEVBQUN5RTtBQUE5QixPQUFkLENBQU47QUFBQSxVQUFzREcsQ0FBQyxHQUFDO0FBQUM5RSxRQUFBQSxJQUFJLEVBQUMsSUFBSWdILENBQUosQ0FBTSxLQUFLckksRUFBWCxFQUFjO0FBQUM2QixVQUFBQSxRQUFRLEVBQUMsS0FBS0EsUUFBZjtBQUF3QlAsVUFBQUEsT0FBTyxFQUFDNEU7QUFBaEMsU0FBZCxDQUFOO0FBQXdENUUsUUFBQUEsT0FBTyxFQUFDNEUsQ0FBaEU7QUFBa0UzRSxRQUFBQSxRQUFRLEVBQUN5RSxDQUEzRTtBQUE2RStiLFFBQUFBLE9BQU8sRUFBQ2piLENBQXJGO0FBQXVGZ2IsUUFBQUEsY0FBYyxFQUFDN2I7QUFBdEcsT0FBeEQ7QUFBaUssYUFBTyxLQUFLbWIsTUFBTCxDQUFZNVAsSUFBWixDQUFpQnJMLENBQWpCLEdBQW9CQSxDQUEzQjtBQUE2Qjs7QUFBQWIsSUFBQUEsTUFBTSxHQUFFO0FBQUMsV0FBSzhiLE1BQUwsQ0FBWVksTUFBWixDQUFtQmhjLENBQUMsSUFBRUEsQ0FBQyxDQUFDK2IsT0FBeEIsRUFBaUNuaEIsT0FBakMsQ0FBeUMsQ0FBQ29GLENBQUQsRUFBR0MsQ0FBSCxLQUFPO0FBQUMsYUFBS2pHLEVBQUwsQ0FBUUgsUUFBUixDQUFpQnlGLE1BQWpCLENBQXdCO0FBQUNDLFVBQUFBLEtBQUssRUFBQ1MsQ0FBQyxDQUFDM0UsSUFBVDtBQUFjNkksVUFBQUEsTUFBTSxFQUFDLEtBQUswWCxHQUFMLENBQVN4QixLQUE5QjtBQUFvQ2MsVUFBQUEsS0FBSyxFQUFDLENBQUM7QUFBM0MsU0FBeEIsR0FBdUUsS0FBS1UsR0FBTCxDQUFTdkIsSUFBVCxFQUF2RTtBQUF1RixPQUF4STtBQUEwSTs7QUFBbG5FLEdBQXo3TSxFQUE2aVJyYSxDQUFDLENBQUNsRSxRQUFGLEdBQVcwRSxDQUF4alIsRUFBMGpSUixDQUFDLENBQUNpYyxJQUFGLEdBQU96WixDQUFqa1IsRUFBbWtSeEMsQ0FBQyxDQUFDa2MsSUFBRixHQUFPaGMsQ0FBMWtSLEVBQTRrUkYsQ0FBQyxDQUFDdEMsSUFBRixHQUFPMkUsQ0FBbmxSLEVBQXFsUnJDLENBQUMsQ0FBQ21jLGFBQUYsR0FBZ0IsVUFBU25jLENBQVQsRUFBVztBQUFDLFdBQU8sSUFBSXdCLENBQUosQ0FBTXhCLENBQU4sRUFBUTtBQUFDN0MsTUFBQUEsTUFBTSxFQUFDLDhXQUFSO0FBQXVYQyxNQUFBQSxRQUFRLEVBQUM7QUFBaFksS0FBUixDQUFQO0FBQXdqQixHQUF6cVMsRUFBMHFTNEMsQ0FBQyxDQUFDb2MsS0FBRixHQUFRLFVBQVMzYSxDQUFULEVBQVc7QUFBQzRhLElBQUFBLE9BQU8sRUFBQ3JjLENBQUMsR0FBQ3JHLFFBQVg7QUFBb0JvaUIsSUFBQUEsT0FBTyxFQUFDeGEsQ0FBQyxHQUFDLENBQUMsQ0FBL0I7QUFBaUMyQyxJQUFBQSxNQUFNLEVBQUN0QyxDQUFDLEdBQUMsSUFBSTNCLENBQUosRUFBMUM7QUFBZ0RxYyxJQUFBQSxJQUFJLEVBQUN4YixDQUFDLEdBQUMsR0FBdkQ7QUFBMkR5YixJQUFBQSxPQUFPLEVBQUMvYSxDQUFDLEdBQUMsR0FBckU7QUFBeUVnYixJQUFBQSxZQUFZLEVBQUN2ZCxDQUFDLEdBQUMsQ0FBQyxDQUF6RjtBQUEyRndkLElBQUFBLFdBQVcsRUFBQ3BjLENBQUMsR0FBQyxFQUF6RztBQUE0R3FjLElBQUFBLFVBQVUsRUFBQ3BjLENBQUMsR0FBQyxDQUFDLENBQTFIO0FBQTRIcWMsSUFBQUEsU0FBUyxFQUFDcGMsQ0FBQyxHQUFDLENBQXhJO0FBQTBJcWMsSUFBQUEsU0FBUyxFQUFDNWUsQ0FBQyxHQUFDLENBQUMsQ0FBdko7QUFBeUo2ZSxJQUFBQSxRQUFRLEVBQUMzZSxDQUFDLEdBQUMsRUFBcEs7QUFBdUs0ZSxJQUFBQSxhQUFhLEVBQUNyYyxDQUFDLEdBQUMsQ0FBdkw7QUFBeUxzYyxJQUFBQSxhQUFhLEVBQUNyYyxDQUFDLEdBQUM3QixJQUFJLENBQUM4QixFQUE5TTtBQUFpTnFjLElBQUFBLGVBQWUsRUFBQ2xhLENBQUMsR0FBQyxDQUFDLENBQUQsR0FBRyxDQUF0TztBQUF3T21hLElBQUFBLGVBQWUsRUFBQ2xhLENBQUMsR0FBQyxJQUFFLENBQTVQO0FBQThQbWEsSUFBQUEsV0FBVyxFQUFDOWEsQ0FBQyxHQUFDLENBQTVRO0FBQThRK2EsSUFBQUEsV0FBVyxFQUFDM2EsQ0FBQyxHQUFDLElBQUU7QUFBOVIsTUFBaVMsRUFBNVMsRUFBK1M7QUFBQyxTQUFLdVosT0FBTCxHQUFheGEsQ0FBYixFQUFlLEtBQUsyQyxNQUFMLEdBQVl0QyxDQUEzQixFQUE2QmQsQ0FBQyxHQUFDQSxDQUFDLElBQUUsQ0FBbEMsRUFBb0NVLENBQUMsR0FBQ0EsQ0FBQyxJQUFFLENBQXpDLEVBQTJDLEtBQUswYixXQUFMLEdBQWlCOWEsQ0FBNUQsRUFBOEQsS0FBSythLFdBQUwsR0FBaUIzYSxDQUEvRTtBQUFpRixRQUFJUSxDQUFDLEdBQUM7QUFBQ3dELE1BQUFBLE1BQU0sRUFBQyxDQUFSO0FBQVU0VyxNQUFBQSxHQUFHLEVBQUMsQ0FBZDtBQUFnQkMsTUFBQUEsS0FBSyxFQUFDO0FBQXRCLEtBQU47QUFBQSxRQUErQmxkLENBQUMsR0FBQztBQUFDcUcsTUFBQUEsTUFBTSxFQUFDLENBQVI7QUFBVTRXLE1BQUFBLEdBQUcsRUFBQyxDQUFkO0FBQWdCQyxNQUFBQSxLQUFLLEVBQUM7QUFBdEIsS0FBakM7QUFBQSxRQUEwRDdjLENBQUMsR0FBQztBQUFDZ0csTUFBQUEsTUFBTSxFQUFDLENBQVI7QUFBVTRXLE1BQUFBLEdBQUcsRUFBQyxDQUFkO0FBQWdCQyxNQUFBQSxLQUFLLEVBQUM7QUFBdEIsS0FBNUQ7QUFBQSxRQUFxRnZXLENBQUMsR0FBQyxJQUFJN0csQ0FBSixFQUF2RjtBQUFBLFFBQTZGQyxDQUFDLEdBQUMsSUFBSUQsQ0FBSixFQUEvRjtBQUFxR0MsSUFBQUEsQ0FBQyxDQUFDZixJQUFGLENBQU9zQyxDQUFDLENBQUMxRixRQUFULEVBQW1CaUYsR0FBbkIsQ0FBdUIsS0FBS2tELE1BQTVCLEdBQW9DMUQsQ0FBQyxDQUFDZ0csTUFBRixHQUFTckcsQ0FBQyxDQUFDcUcsTUFBRixHQUFTdEcsQ0FBQyxDQUFDa0IsUUFBRixFQUF0RCxFQUFtRVosQ0FBQyxDQUFDNmMsS0FBRixHQUFRbGQsQ0FBQyxDQUFDa2QsS0FBRixHQUFReGUsSUFBSSxDQUFDMlEsS0FBTCxDQUFXdFAsQ0FBQyxDQUFDbEMsQ0FBYixFQUFla0MsQ0FBQyxDQUFDTyxDQUFqQixDQUFuRixFQUF1R0QsQ0FBQyxDQUFDNGMsR0FBRixHQUFNamQsQ0FBQyxDQUFDaWQsR0FBRixHQUFNdmUsSUFBSSxDQUFDK0IsSUFBTCxDQUFVL0IsSUFBSSxDQUFDZ0csR0FBTCxDQUFTaEcsSUFBSSxDQUFDQyxHQUFMLENBQVNvQixDQUFDLENBQUNoQyxDQUFGLEdBQUlpQyxDQUFDLENBQUNxRyxNQUFmLEVBQXNCLENBQUMsQ0FBdkIsQ0FBVCxFQUFtQyxDQUFuQyxDQUFWLENBQW5ILEVBQW9LLEtBQUt4SCxNQUFMLEdBQVksTUFBSTtBQUFDbUIsTUFBQUEsQ0FBQyxDQUFDcUcsTUFBRixJQUFVeEQsQ0FBQyxDQUFDd0QsTUFBWixFQUFtQnJHLENBQUMsQ0FBQ2tkLEtBQUYsSUFBU3JhLENBQUMsQ0FBQ3FhLEtBQTlCLEVBQW9DbGQsQ0FBQyxDQUFDaWQsR0FBRixJQUFPcGEsQ0FBQyxDQUFDb2EsR0FBN0MsRUFBaURqZCxDQUFDLENBQUNrZCxLQUFGLEdBQVF4ZSxJQUFJLENBQUNDLEdBQUwsQ0FBU2dFLENBQVQsRUFBV2pFLElBQUksQ0FBQ2dHLEdBQUwsQ0FBUzlCLENBQVQsRUFBVzVDLENBQUMsQ0FBQ2tkLEtBQWIsQ0FBWCxDQUF6RCxFQUF5RmxkLENBQUMsQ0FBQ2lkLEdBQUYsR0FBTXZlLElBQUksQ0FBQ0MsR0FBTCxDQUFTMkIsQ0FBVCxFQUFXNUIsSUFBSSxDQUFDZ0csR0FBTCxDQUFTbkUsQ0FBVCxFQUFXUCxDQUFDLENBQUNpZCxHQUFiLENBQVgsQ0FBL0YsRUFBNkhqZCxDQUFDLENBQUNxRyxNQUFGLEdBQVMzSCxJQUFJLENBQUNDLEdBQUwsQ0FBUyxLQUFLb2UsV0FBZCxFQUEwQnJlLElBQUksQ0FBQ2dHLEdBQUwsQ0FBUyxLQUFLc1ksV0FBZCxFQUEwQmhkLENBQUMsQ0FBQ3FHLE1BQTVCLENBQTFCLENBQXRJLEVBQXFNaEcsQ0FBQyxDQUFDNGMsR0FBRixJQUFPLENBQUNqZCxDQUFDLENBQUNpZCxHQUFGLEdBQU01YyxDQUFDLENBQUM0YyxHQUFULElBQWN0YyxDQUExTixFQUE0Tk4sQ0FBQyxDQUFDNmMsS0FBRixJQUFTLENBQUNsZCxDQUFDLENBQUNrZCxLQUFGLEdBQVE3YyxDQUFDLENBQUM2YyxLQUFYLElBQWtCdmMsQ0FBdlAsRUFBeVBOLENBQUMsQ0FBQ2dHLE1BQUYsSUFBVSxDQUFDckcsQ0FBQyxDQUFDcUcsTUFBRixHQUFTaEcsQ0FBQyxDQUFDZ0csTUFBWixJQUFvQjFGLENBQXZSLEVBQXlSLEtBQUtvRCxNQUFMLENBQVluRCxHQUFaLENBQWdCK0YsQ0FBaEIsQ0FBelI7QUFBNFMsVUFBSTlHLENBQUMsR0FBQ1EsQ0FBQyxDQUFDZ0csTUFBRixHQUFTM0gsSUFBSSxDQUFDdU8sR0FBTCxDQUFTdk8sSUFBSSxDQUFDQyxHQUFMLENBQVMsSUFBVCxFQUFjMEIsQ0FBQyxDQUFDNGMsR0FBaEIsQ0FBVCxDQUFmO0FBQThDbGQsTUFBQUEsQ0FBQyxDQUFDbEMsQ0FBRixHQUFJZ0MsQ0FBQyxHQUFDbkIsSUFBSSxDQUFDdU8sR0FBTCxDQUFTNU0sQ0FBQyxDQUFDNmMsS0FBWCxDQUFOLEVBQXdCbmQsQ0FBQyxDQUFDaEMsQ0FBRixHQUFJc0MsQ0FBQyxDQUFDZ0csTUFBRixHQUFTM0gsSUFBSSxDQUFDd08sR0FBTCxDQUFTN00sQ0FBQyxDQUFDNGMsR0FBWCxDQUFyQyxFQUFxRGxkLENBQUMsQ0FBQ08sQ0FBRixHQUFJVCxDQUFDLEdBQUNuQixJQUFJLENBQUN3TyxHQUFMLENBQVM3TSxDQUFDLENBQUM2YyxLQUFYLENBQTNELEVBQTZFNWIsQ0FBQyxDQUFDMUYsUUFBRixDQUFXb0QsSUFBWCxDQUFnQixLQUFLK0UsTUFBckIsRUFBNkJuRCxHQUE3QixDQUFpQ2IsQ0FBakMsQ0FBN0UsRUFBaUh1QixDQUFDLENBQUN3TixNQUFGLENBQVMsS0FBSy9LLE1BQWQsQ0FBakgsRUFBdUlsQixDQUFDLENBQUNxYSxLQUFGLElBQVM3YixDQUFoSixFQUFrSndCLENBQUMsQ0FBQ29hLEdBQUYsSUFBTzViLENBQXpKLEVBQTJKc0YsQ0FBQyxDQUFDN0YsUUFBRixDQUFXTyxDQUFYLENBQTNKLEVBQXlLd0IsQ0FBQyxDQUFDd0QsTUFBRixHQUFTLENBQWxMO0FBQW9MLEtBQW5zQjtBQUFvc0IsUUFBSU8sQ0FBQyxHQUFDLElBQUluSixDQUFKLEVBQU47QUFBQSxRQUFZMk4sQ0FBQyxHQUFDLElBQUkzTixDQUFKLEVBQWQ7QUFBQSxRQUFvQjJLLENBQUMsR0FBQyxJQUFJM0ssQ0FBSixFQUF0QjtBQUFBLFFBQTRCbVAsQ0FBQyxHQUFDb0ssRUFBRSxDQUFDQyxJQUFqQzs7QUFBc0MsYUFBU3pLLENBQVQsR0FBWTtBQUFDLGFBQU85TixJQUFJLENBQUN5YyxHQUFMLENBQVMsR0FBVCxFQUFhL2EsQ0FBYixDQUFQO0FBQXVCOztBQUFBLFNBQUsrYyxZQUFMLEdBQWtCO0FBQUNDLE1BQUFBLEtBQUssRUFBQyxDQUFQO0FBQVNDLE1BQUFBLElBQUksRUFBQyxDQUFkO0FBQWdCakcsTUFBQUEsR0FBRyxFQUFDO0FBQXBCLEtBQWxCOztBQUF5QyxRQUFJak0sQ0FBQyxHQUFDLENBQUM5SixDQUFELEVBQUdELENBQUgsS0FBTztBQUFDLFVBQUlwQixDQUFKLEVBQU1GLENBQU4sRUFBUXJDLENBQVIsRUFBVXNDLENBQVY7QUFBWSxVQUFJTSxDQUFDLEdBQUNSLENBQUMsS0FBR3JHLFFBQUosR0FBYUEsUUFBUSxDQUFDOGpCLElBQXRCLEdBQTJCemQsQ0FBakM7QUFBbUN5WCxNQUFBQSxFQUFFLENBQUN0WSxJQUFILENBQVFzQyxDQUFDLENBQUMxRixRQUFWLEVBQW9CaUYsR0FBcEIsQ0FBd0IsS0FBS2tELE1BQTdCO0FBQXFDLFVBQUlwRCxDQUFDLEdBQUMyVyxFQUFFLENBQUNyVyxRQUFILEVBQU47QUFBb0JqQixNQUFBQSxDQUFDLEdBQUMsSUFBRXFCLENBQUYsSUFBS1YsQ0FBQyxJQUFFakMsSUFBSSxDQUFDdVAsR0FBTCxDQUFTLENBQUMzTSxDQUFDLENBQUN3TSxHQUFGLElBQU8sRUFBUixJQUFZLENBQVosR0FBY3BQLElBQUksQ0FBQzhCLEVBQW5CLEdBQXNCLEdBQS9CLENBQVIsSUFBNkNILENBQUMsQ0FBQ2tkLFlBQWpELEVBQThEemQsQ0FBQyxHQUFDd0IsQ0FBQyxDQUFDbU8sTUFBbEUsRUFBeUU2SCxFQUFFLENBQUNyWixHQUFILENBQU82QixDQUFDLENBQUMsQ0FBRCxDQUFSLEVBQVlBLENBQUMsQ0FBQyxDQUFELENBQWIsRUFBaUJBLENBQUMsQ0FBQyxDQUFELENBQWxCLENBQXpFLEVBQWdHd1gsRUFBRSxDQUFDeFcsUUFBSCxDQUFZLENBQUNkLENBQWIsQ0FBaEcsRUFBZ0gyRyxDQUFDLENBQUMvRixHQUFGLENBQU0wVyxFQUFOLENBQWhILEVBQTBIN1osQ0FBQyxHQUFDLElBQUUyRCxDQUFGLEdBQUlULENBQUosR0FBTU4sQ0FBQyxDQUFDa2QsWUFBcEksRUFBaUp4ZCxDQUFDLEdBQUN1QixDQUFDLENBQUNtTyxNQUFySixFQUE0SjZILEVBQUUsQ0FBQ3JaLEdBQUgsQ0FBTzhCLENBQUMsQ0FBQyxDQUFELENBQVIsRUFBWUEsQ0FBQyxDQUFDLENBQUQsQ0FBYixFQUFpQkEsQ0FBQyxDQUFDLENBQUQsQ0FBbEIsQ0FBNUosRUFBbUx1WCxFQUFFLENBQUN4VyxRQUFILENBQVlyRCxDQUFaLENBQW5MLEVBQWtNa0osQ0FBQyxDQUFDL0YsR0FBRixDQUFNMFcsRUFBTixDQUFsTTtBQUE0TSxLQUFsVTs7QUFBbVUsYUFBUzdLLENBQVQsQ0FBVzVNLENBQVgsRUFBYTtBQUFDZ0QsTUFBQUEsQ0FBQyxDQUFDd0QsTUFBRixJQUFVeEcsQ0FBVjtBQUFZOztBQUFBLGFBQVM2TSxDQUFULENBQVczTSxDQUFYLEVBQWFDLENBQWIsRUFBZTtBQUFDdVgsTUFBQUEsRUFBRSxDQUFDdFosR0FBSCxDQUFPOEIsQ0FBUCxFQUFTQyxDQUFULEdBQVl3WCxFQUFFLENBQUMzVyxHQUFILENBQU8wVyxFQUFQLEVBQVUzUSxDQUFWLEVBQWE5RixRQUFiLENBQXNCWixDQUF0QixDQUFaO0FBQXFDLFVBQUlKLENBQUMsR0FBQ0QsQ0FBQyxLQUFHckcsUUFBSixHQUFhQSxRQUFRLENBQUM4akIsSUFBdEIsR0FBMkJ6ZCxDQUFqQztBQUFtQ2dELE1BQUFBLENBQUMsQ0FBQ3FhLEtBQUYsSUFBUyxJQUFFeGUsSUFBSSxDQUFDOEIsRUFBUCxHQUFVZ1gsRUFBRSxDQUFDM1osQ0FBYixHQUFlaUMsQ0FBQyxDQUFDeWQsWUFBMUIsRUFBdUMxYSxDQUFDLENBQUNvYSxHQUFGLElBQU8sSUFBRXZlLElBQUksQ0FBQzhCLEVBQVAsR0FBVWdYLEVBQUUsQ0FBQ3paLENBQWIsR0FBZStCLENBQUMsQ0FBQ3lkLFlBQS9ELEVBQTRFM1csQ0FBQyxDQUFDNUgsSUFBRixDQUFPdVksRUFBUCxDQUE1RTtBQUF1Rjs7QUFBQSxhQUFTNUssQ0FBVCxDQUFXOU0sQ0FBWCxFQUFhQyxDQUFiLEVBQWU7QUFBQ3lYLE1BQUFBLEVBQUUsQ0FBQ3RaLEdBQUgsQ0FBTzRCLENBQVAsRUFBU0MsQ0FBVCxHQUFZMFgsRUFBRSxDQUFDM1csR0FBSCxDQUFPMFcsRUFBUCxFQUFVbk0sQ0FBVixFQUFhdEssUUFBYixDQUFzQi9DLENBQXRCLENBQVosRUFBcUNvTixDQUFDLENBQUNxTSxFQUFFLENBQUMzWixDQUFKLEVBQU0yWixFQUFFLENBQUN6WixDQUFULENBQXRDLEVBQWtEcU4sQ0FBQyxDQUFDcE0sSUFBRixDQUFPdVksRUFBUCxDQUFsRDtBQUE2RDs7QUFBQSxRQUFJclYsQ0FBQyxHQUFDckMsQ0FBQyxJQUFFO0FBQUMsVUFBRyxLQUFLK2IsT0FBUixFQUFnQjtBQUFDLGdCQUFPL2IsQ0FBQyxDQUFDMmQsTUFBVDtBQUFpQixlQUFLLEtBQUtMLFlBQUwsQ0FBa0JDLEtBQXZCO0FBQTZCLGdCQUFHLENBQUMsQ0FBRCxLQUFLdGUsQ0FBUixFQUFVO0FBQU84SCxZQUFBQSxDQUFDLENBQUMzSSxHQUFGLENBQU00QixDQUFDLENBQUM0ZCxPQUFSLEVBQWdCNWQsQ0FBQyxDQUFDNmQsT0FBbEIsR0FBMkI5USxDQUFDLEdBQUNvSyxFQUFFLENBQUNFLE1BQWhDO0FBQXVDOztBQUFNLGVBQUssS0FBS2lHLFlBQUwsQ0FBa0JFLElBQXZCO0FBQTRCLGdCQUFHLENBQUMsQ0FBRCxLQUFLbGQsQ0FBUixFQUFVO0FBQU9pSSxZQUFBQSxDQUFDLENBQUNuSyxHQUFGLENBQU00QixDQUFDLENBQUM0ZCxPQUFSLEVBQWdCNWQsQ0FBQyxDQUFDNmQsT0FBbEIsR0FBMkI5USxDQUFDLEdBQUNvSyxFQUFFLENBQUNHLEtBQWhDO0FBQXNDOztBQUFNLGVBQUssS0FBS2dHLFlBQUwsQ0FBa0IvRixHQUF2QjtBQUEyQixnQkFBRyxDQUFDLENBQUQsS0FBS3ZaLENBQVIsRUFBVTtBQUFPdU4sWUFBQUEsQ0FBQyxDQUFDbk4sR0FBRixDQUFNNEIsQ0FBQyxDQUFDNGQsT0FBUixFQUFnQjVkLENBQUMsQ0FBQzZkLE9BQWxCLEdBQTJCOVEsQ0FBQyxHQUFDb0ssRUFBRSxDQUFDSSxHQUFoQztBQUFqUDs7QUFBcVJ4SyxRQUFBQSxDQUFDLEtBQUdvSyxFQUFFLENBQUNDLElBQVAsS0FBY2xjLE1BQU0sQ0FBQ3lFLGdCQUFQLENBQXdCLFdBQXhCLEVBQW9DcU4sQ0FBcEMsRUFBc0MsQ0FBQyxDQUF2QyxHQUEwQzlSLE1BQU0sQ0FBQ3lFLGdCQUFQLENBQXdCLFNBQXhCLEVBQWtDbU8sQ0FBbEMsRUFBb0MsQ0FBQyxDQUFyQyxDQUF4RDtBQUFpRztBQUFDLEtBQWxaO0FBQUEsUUFBbVpkLENBQUMsR0FBQ2hOLENBQUMsSUFBRTtBQUFDLFVBQUcsS0FBSytiLE9BQVIsRUFBZ0IsUUFBT2hQLENBQVA7QUFBVSxhQUFLb0ssRUFBRSxDQUFDRSxNQUFSO0FBQWUsY0FBRyxDQUFDLENBQUQsS0FBS3BZLENBQVIsRUFBVTtBQUFPNE4sVUFBQUEsQ0FBQyxDQUFDN00sQ0FBQyxDQUFDNGQsT0FBSCxFQUFXNWQsQ0FBQyxDQUFDNmQsT0FBYixDQUFEO0FBQXVCOztBQUFNLGFBQUsxRyxFQUFFLENBQUNHLEtBQVI7QUFBYyxjQUFJclgsQ0FBSjtBQUFNLGNBQUcsQ0FBQyxDQUFELEtBQUtLLENBQVIsRUFBVTtBQUFPTCxVQUFBQSxDQUFDLEdBQUNELENBQUYsRUFBSTBYLEVBQUUsQ0FBQ3RaLEdBQUgsQ0FBTzZCLENBQUMsQ0FBQzJkLE9BQVQsRUFBaUIzZCxDQUFDLENBQUM0ZCxPQUFuQixDQUFKLEVBQWdDbEcsRUFBRSxDQUFDM1csR0FBSCxDQUFPMFcsRUFBUCxFQUFVblAsQ0FBVixDQUFoQyxFQUE2Q29QLEVBQUUsQ0FBQ3paLENBQUgsR0FBSyxDQUFMLEdBQU8wTyxDQUFDLENBQUNELENBQUMsRUFBRixDQUFSLEdBQWNnTCxFQUFFLENBQUN6WixDQUFILEdBQUssQ0FBTCxJQUFRME8sQ0FBQyxDQUFDLElBQUVELENBQUMsRUFBSixDQUFwRSxFQUE0RXBFLENBQUMsQ0FBQ3BKLElBQUYsQ0FBT3VZLEVBQVAsQ0FBNUU7QUFBdUY7O0FBQU0sYUFBS1AsRUFBRSxDQUFDSSxHQUFSO0FBQVksY0FBRyxDQUFDLENBQUQsS0FBS3ZaLENBQVIsRUFBVTtBQUFPOE8sVUFBQUEsQ0FBQyxDQUFDOU0sQ0FBQyxDQUFDNGQsT0FBSCxFQUFXNWQsQ0FBQyxDQUFDNmQsT0FBYixDQUFEO0FBQXRPO0FBQThQLEtBQXZxQjtBQUFBLFFBQXdxQi9QLENBQUMsR0FBQyxNQUFJO0FBQUMsV0FBS2lPLE9BQUwsS0FBZXBpQixRQUFRLENBQUNtRyxtQkFBVCxDQUE2QixXQUE3QixFQUF5Q2tOLENBQXpDLEVBQTJDLENBQUMsQ0FBNUMsR0FBK0NyVCxRQUFRLENBQUNtRyxtQkFBVCxDQUE2QixTQUE3QixFQUF1Q2dPLENBQXZDLEVBQXlDLENBQUMsQ0FBMUMsQ0FBL0MsRUFBNEZmLENBQUMsR0FBQ29LLEVBQUUsQ0FBQ0MsSUFBaEg7QUFBc0gsS0FBcnlCO0FBQUEsUUFBc3lCOVUsQ0FBQyxHQUFDdEMsQ0FBQyxJQUFFO0FBQUMsV0FBSytiLE9BQUwsSUFBY3piLENBQWQsS0FBa0J5TSxDQUFDLEtBQUdvSyxFQUFFLENBQUNDLElBQVAsSUFBYXJLLENBQUMsS0FBR29LLEVBQUUsQ0FBQ0UsTUFBdEMsTUFBZ0RyWCxDQUFDLENBQUM4ZCxlQUFGLElBQW9COWQsQ0FBQyxDQUFDdEIsTUFBRixHQUFTLENBQVQsR0FBV2tPLENBQUMsQ0FBQyxJQUFFRCxDQUFDLEVBQUosQ0FBWixHQUFvQjNNLENBQUMsQ0FBQ3RCLE1BQUYsR0FBUyxDQUFULElBQVlrTyxDQUFDLENBQUNELENBQUMsRUFBRixDQUFyRztBQUE0RyxLQUF4NUI7QUFBQSxRQUF5NUJwSyxDQUFDLEdBQUN2QyxDQUFDLElBQUU7QUFBQyxVQUFHLEtBQUsrYixPQUFSLEVBQWdCLFFBQU8vYixDQUFDLENBQUNuQyxjQUFGLElBQW1CbUMsQ0FBQyxDQUFDK2QsT0FBRixDQUFVaGdCLE1BQXBDO0FBQTRDLGFBQUssQ0FBTDtBQUFPLGNBQUcsQ0FBQyxDQUFELEtBQUtrQixDQUFSLEVBQVU7QUFBTzhILFVBQUFBLENBQUMsQ0FBQzNJLEdBQUYsQ0FBTTRCLENBQUMsQ0FBQytkLE9BQUYsQ0FBVSxDQUFWLEVBQWE5ZixLQUFuQixFQUF5QitCLENBQUMsQ0FBQytkLE9BQUYsQ0FBVSxDQUFWLEVBQWE1ZixLQUF0QyxHQUE2QzRPLENBQUMsR0FBQ29LLEVBQUUsQ0FBQ0UsTUFBbEQ7QUFBeUQ7O0FBQU0sYUFBSyxDQUFMO0FBQU8sY0FBRyxDQUFDLENBQUQsS0FBSy9XLENBQUwsSUFBUyxDQUFDLENBQUQsS0FBS3RDLENBQWpCLEVBQW1CO0FBQU8sV0FBQyxVQUFTZ0MsQ0FBVCxFQUFXO0FBQUMsZ0JBQUdNLENBQUgsRUFBSztBQUFDLGtCQUFJTCxDQUFDLEdBQUNELENBQUMsQ0FBQytkLE9BQUYsQ0FBVSxDQUFWLEVBQWE5ZixLQUFiLEdBQW1CK0IsQ0FBQyxDQUFDK2QsT0FBRixDQUFVLENBQVYsRUFBYTlmLEtBQXRDO0FBQUEsa0JBQTRDaUMsQ0FBQyxHQUFDRixDQUFDLENBQUMrZCxPQUFGLENBQVUsQ0FBVixFQUFhNWYsS0FBYixHQUFtQjZCLENBQUMsQ0FBQytkLE9BQUYsQ0FBVSxDQUFWLEVBQWE1ZixLQUE5RTtBQUFBLGtCQUFvRmdDLENBQUMsR0FBQ3RCLElBQUksQ0FBQ3VCLElBQUwsQ0FBVUgsQ0FBQyxHQUFDQSxDQUFGLEdBQUlDLENBQUMsR0FBQ0EsQ0FBaEIsQ0FBdEY7QUFBeUdxSSxjQUFBQSxDQUFDLENBQUNuSyxHQUFGLENBQU0sQ0FBTixFQUFRK0IsQ0FBUjtBQUFXOztBQUFBLGdCQUFHbkMsQ0FBSCxFQUFLO0FBQUMsa0JBQUlKLENBQUMsR0FBQyxNQUFJb0MsQ0FBQyxDQUFDK2QsT0FBRixDQUFVLENBQVYsRUFBYTlmLEtBQWIsR0FBbUIrQixDQUFDLENBQUMrZCxPQUFGLENBQVUsQ0FBVixFQUFhOWYsS0FBcEMsQ0FBTjtBQUFBLGtCQUFpRHVDLENBQUMsR0FBQyxNQUFJUixDQUFDLENBQUMrZCxPQUFGLENBQVUsQ0FBVixFQUFhNWYsS0FBYixHQUFtQjZCLENBQUMsQ0FBQytkLE9BQUYsQ0FBVSxDQUFWLEVBQWE1ZixLQUFwQyxDQUFuRDtBQUE4Rm9OLGNBQUFBLENBQUMsQ0FBQ25OLEdBQUYsQ0FBTVIsQ0FBTixFQUFRNEMsQ0FBUjtBQUFXO0FBQUMsV0FBdlAsRUFBeVBSLENBQXpQLEdBQTRQK00sQ0FBQyxHQUFDb0ssRUFBRSxDQUFDSyxTQUFqUTtBQUEyUTs7QUFBTTtBQUFRekssVUFBQUEsQ0FBQyxHQUFDb0ssRUFBRSxDQUFDQyxJQUFMO0FBQTdiO0FBQXdjLEtBQXYzQztBQUFBLFFBQXczQ2pWLENBQUMsR0FBQ25DLENBQUMsSUFBRTtBQUFDLFVBQUcsS0FBSytiLE9BQVIsRUFBZ0IsUUFBTy9iLENBQUMsQ0FBQ25DLGNBQUYsSUFBbUJtQyxDQUFDLENBQUM4ZCxlQUFGLEVBQW5CLEVBQXVDOWQsQ0FBQyxDQUFDK2QsT0FBRixDQUFVaGdCLE1BQXhEO0FBQWdFLGFBQUssQ0FBTDtBQUFPLGNBQUcsQ0FBQyxDQUFELEtBQUtrQixDQUFSLEVBQVU7QUFBTzROLFVBQUFBLENBQUMsQ0FBQzdNLENBQUMsQ0FBQytkLE9BQUYsQ0FBVSxDQUFWLEVBQWE5ZixLQUFkLEVBQW9CK0IsQ0FBQyxDQUFDK2QsT0FBRixDQUFVLENBQVYsRUFBYTVmLEtBQWpDLENBQUQ7QUFBeUM7O0FBQU0sYUFBSyxDQUFMO0FBQU8sY0FBRyxDQUFDLENBQUQsS0FBS21DLENBQUwsSUFBUyxDQUFDLENBQUQsS0FBS3RDLENBQWpCLEVBQW1CO0FBQU8sV0FBQyxVQUFTZ0MsQ0FBVCxFQUFXO0FBQUMsZ0JBQUdNLENBQUgsRUFBSztBQUFDLGtCQUFJTCxDQUFDLEdBQUNELENBQUMsQ0FBQytkLE9BQUYsQ0FBVSxDQUFWLEVBQWE5ZixLQUFiLEdBQW1CK0IsQ0FBQyxDQUFDK2QsT0FBRixDQUFVLENBQVYsRUFBYTlmLEtBQXRDO0FBQUEsa0JBQTRDaUMsQ0FBQyxHQUFDRixDQUFDLENBQUMrZCxPQUFGLENBQVUsQ0FBVixFQUFhNWYsS0FBYixHQUFtQjZCLENBQUMsQ0FBQytkLE9BQUYsQ0FBVSxDQUFWLEVBQWE1ZixLQUE5RTtBQUFBLGtCQUFvRmdDLENBQUMsR0FBQ3RCLElBQUksQ0FBQ3VCLElBQUwsQ0FBVUgsQ0FBQyxHQUFDQSxDQUFGLEdBQUlDLENBQUMsR0FBQ0EsQ0FBaEIsQ0FBdEY7QUFBeUd3WCxjQUFBQSxFQUFFLENBQUN0WixHQUFILENBQU8sQ0FBUCxFQUFTK0IsQ0FBVCxHQUFZd1gsRUFBRSxDQUFDdlosR0FBSCxDQUFPLENBQVAsRUFBU1MsSUFBSSxDQUFDeWMsR0FBTCxDQUFTNUQsRUFBRSxDQUFDeFosQ0FBSCxHQUFLcUssQ0FBQyxDQUFDckssQ0FBaEIsRUFBa0JxQyxDQUFsQixDQUFULENBQVosRUFBMkNxTSxDQUFDLENBQUMrSyxFQUFFLENBQUN6WixDQUFKLENBQTVDLEVBQW1EcUssQ0FBQyxDQUFDcEosSUFBRixDQUFPdVksRUFBUCxDQUFuRDtBQUE4RDs7QUFBQTFaLFlBQUFBLENBQUMsSUFBRThPLENBQUMsQ0FBQyxNQUFJOU0sQ0FBQyxDQUFDK2QsT0FBRixDQUFVLENBQVYsRUFBYTlmLEtBQWIsR0FBbUIrQixDQUFDLENBQUMrZCxPQUFGLENBQVUsQ0FBVixFQUFhOWYsS0FBcEMsQ0FBRCxFQUE0QyxNQUFJK0IsQ0FBQyxDQUFDK2QsT0FBRixDQUFVLENBQVYsRUFBYTVmLEtBQWIsR0FBbUI2QixDQUFDLENBQUMrZCxPQUFGLENBQVUsQ0FBVixFQUFhNWYsS0FBcEMsQ0FBNUMsQ0FBSjtBQUE0RixXQUFyUixDQUFzUjZCLENBQXRSLENBQUQ7QUFBMFI7O0FBQU07QUFBUStNLFVBQUFBLENBQUMsR0FBQ29LLEVBQUUsQ0FBQ0MsSUFBTDtBQUFoZDtBQUEyZCxLQUF6MkQ7QUFBQSxRQUEwMkQ3UCxDQUFDLEdBQUMsTUFBSTtBQUFDLFdBQUt3VSxPQUFMLEtBQWVoUCxDQUFDLEdBQUNvSyxFQUFFLENBQUNDLElBQXBCO0FBQTBCLEtBQTM0RDtBQUFBLFFBQTQ0RDNQLENBQUMsR0FBQ3pILENBQUMsSUFBRTtBQUFDLFdBQUsrYixPQUFMLElBQWMvYixDQUFDLENBQUNuQyxjQUFGLEVBQWQ7QUFBaUMsS0FBbjdEOztBQUFvN0QsU0FBSzZJLE1BQUwsR0FBWSxZQUFVO0FBQUMxRyxNQUFBQSxDQUFDLENBQUNGLG1CQUFGLENBQXNCLGFBQXRCLEVBQW9DMkgsQ0FBcEMsRUFBc0MsQ0FBQyxDQUF2QyxHQUEwQ3pILENBQUMsQ0FBQ0YsbUJBQUYsQ0FBc0IsV0FBdEIsRUFBa0N1QyxDQUFsQyxFQUFvQyxDQUFDLENBQXJDLENBQTFDLEVBQWtGbkgsTUFBTSxDQUFDNEUsbUJBQVAsQ0FBMkIsT0FBM0IsRUFBbUN3QyxDQUFuQyxFQUFxQyxDQUFDLENBQXRDLENBQWxGLEVBQTJIdEMsQ0FBQyxDQUFDRixtQkFBRixDQUFzQixZQUF0QixFQUFtQ3lDLENBQW5DLEVBQXFDLENBQUMsQ0FBdEMsQ0FBM0gsRUFBb0t2QyxDQUFDLENBQUNGLG1CQUFGLENBQXNCLFVBQXRCLEVBQWlDeUgsQ0FBakMsRUFBbUMsQ0FBQyxDQUFwQyxDQUFwSyxFQUEyTXZILENBQUMsQ0FBQ0YsbUJBQUYsQ0FBc0IsV0FBdEIsRUFBa0NxQyxDQUFsQyxFQUFvQyxDQUFDLENBQXJDLENBQTNNLEVBQW1QakgsTUFBTSxDQUFDNEUsbUJBQVAsQ0FBMkIsV0FBM0IsRUFBdUNrTixDQUF2QyxFQUF5QyxDQUFDLENBQTFDLENBQW5QLEVBQWdTOVIsTUFBTSxDQUFDNEUsbUJBQVAsQ0FBMkIsU0FBM0IsRUFBcUNnTyxDQUFyQyxFQUF1QyxDQUFDLENBQXhDLENBQWhTO0FBQTJVLEtBQWxXLEVBQW1XOU4sQ0FBQyxDQUFDTCxnQkFBRixDQUFtQixhQUFuQixFQUFpQzhILENBQWpDLEVBQW1DLENBQUMsQ0FBcEMsQ0FBblcsRUFBMFl6SCxDQUFDLENBQUNMLGdCQUFGLENBQW1CLFdBQW5CLEVBQStCMEMsQ0FBL0IsRUFBaUMsQ0FBQyxDQUFsQyxDQUExWSxFQUErYW5ILE1BQU0sQ0FBQ3lFLGdCQUFQLENBQXdCLE9BQXhCLEVBQWdDMkMsQ0FBaEMsRUFBa0MsQ0FBQyxDQUFuQyxDQUEvYSxFQUFxZHRDLENBQUMsQ0FBQ0wsZ0JBQUYsQ0FBbUIsWUFBbkIsRUFBZ0M0QyxDQUFoQyxFQUFrQztBQUFDM0MsTUFBQUEsT0FBTyxFQUFDLENBQUM7QUFBVixLQUFsQyxDQUFyZCxFQUFxZ0JJLENBQUMsQ0FBQ0wsZ0JBQUYsQ0FBbUIsVUFBbkIsRUFBOEI0SCxDQUE5QixFQUFnQyxDQUFDLENBQWpDLENBQXJnQixFQUF5aUJ2SCxDQUFDLENBQUNMLGdCQUFGLENBQW1CLFdBQW5CLEVBQStCd0MsQ0FBL0IsRUFBaUM7QUFBQ3ZDLE1BQUFBLE9BQU8sRUFBQyxDQUFDO0FBQVYsS0FBakMsQ0FBemlCO0FBQXdsQixHQUFwamIsRUFBcWpiSSxDQUFDLENBQUNnZSxLQUFGLEdBQVF6VyxDQUE3amIsRUFBK2pidkgsQ0FBQyxDQUFDaWUsSUFBRixHQUFPLE1BQUs7QUFBQzFrQixJQUFBQSxXQUFXLENBQUN5RyxDQUFELEVBQUc7QUFBQzNCLE1BQUFBLEtBQUssRUFBQzRCLENBQVA7QUFBUzNCLE1BQUFBLE1BQU0sRUFBQzRCLENBQWhCO0FBQWtCbkcsTUFBQUEsR0FBRyxFQUFDb0csQ0FBdEI7QUFBd0J3UyxNQUFBQSxLQUFLLEVBQUMvVSxDQUFDLEdBQUNvQyxDQUFDLENBQUM0UyxhQUFsQztBQUFnREMsTUFBQUEsS0FBSyxFQUFDL1IsQ0FBQyxHQUFDZCxDQUFDLENBQUM0UyxhQUExRDtBQUF3RXJXLE1BQUFBLFNBQVMsRUFBQ2lGLENBQUMsR0FBQ3hCLENBQUMsQ0FBQ3hELE1BQXRGO0FBQTZGQyxNQUFBQSxTQUFTLEVBQUNnRixDQUFDLEdBQUN6QixDQUFDLENBQUN4RCxNQUEzRztBQUFrSFgsTUFBQUEsUUFBUSxFQUFDMEYsQ0FBQyxHQUFDLElBQUlmLENBQUosQ0FBTVIsQ0FBTixFQUFRO0FBQUNqRSxRQUFBQSxRQUFRLEVBQUM7QUFBQ0MsVUFBQUEsSUFBSSxFQUFDLENBQU47QUFBUUMsVUFBQUEsSUFBSSxFQUFDLElBQUlDLFlBQUosQ0FBaUIsQ0FBQyxDQUFDLENBQUYsRUFBSSxDQUFDLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBQyxDQUFWLEVBQVksQ0FBQyxDQUFiLEVBQWUsQ0FBZixDQUFqQjtBQUFiLFNBQVY7QUFBNERDLFFBQUFBLEVBQUUsRUFBQztBQUFDSCxVQUFBQSxJQUFJLEVBQUMsQ0FBTjtBQUFRQyxVQUFBQSxJQUFJLEVBQUMsSUFBSUMsWUFBSixDQUFpQixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxDQUFqQjtBQUFiO0FBQS9ELE9BQVI7QUFBN0gsUUFBcVAsRUFBeFAsRUFBMlA7QUFBQyxXQUFLbEMsRUFBTCxHQUFRZ0csQ0FBUixFQUFVLEtBQUtrZSxPQUFMLEdBQWE7QUFBQ3ZMLFFBQUFBLEtBQUssRUFBQy9VLENBQVA7QUFBU2lWLFFBQUFBLEtBQUssRUFBQy9SLENBQWY7QUFBaUJ2RSxRQUFBQSxTQUFTLEVBQUNpRixDQUEzQjtBQUE2Qi9FLFFBQUFBLFNBQVMsRUFBQ2dGO0FBQXZDLE9BQXZCLEVBQWlFLEtBQUsyWixNQUFMLEdBQVksRUFBN0UsRUFBZ0YsS0FBS3ZmLFFBQUwsR0FBYzBGLENBQTlGO0FBQWdHLFVBQUlLLENBQUMsR0FBQyxLQUFLZ2EsR0FBTCxHQUFTO0FBQUN6QixRQUFBQSxJQUFJLEVBQUMsSUFBTjtBQUFXQyxRQUFBQSxLQUFLLEVBQUMsSUFBakI7O0FBQXNCQyxRQUFBQSxJQUFJLEdBQUU7QUFBQyxjQUFJcmEsQ0FBQyxHQUFDNEIsQ0FBQyxDQUFDdVksSUFBUjtBQUFhdlksVUFBQUEsQ0FBQyxDQUFDdVksSUFBRixHQUFPdlksQ0FBQyxDQUFDd1ksS0FBVCxFQUFleFksQ0FBQyxDQUFDd1ksS0FBRixHQUFRcGEsQ0FBdkI7QUFBeUI7O0FBQW5FLE9BQWY7QUFBb0YsV0FBS2xGLE1BQUwsQ0FBWTtBQUFDdUQsUUFBQUEsS0FBSyxFQUFDNEIsQ0FBUDtBQUFTM0IsUUFBQUEsTUFBTSxFQUFDNEIsQ0FBaEI7QUFBa0JuRyxRQUFBQSxHQUFHLEVBQUNvRztBQUF0QixPQUFaO0FBQXNDOztBQUFBMGIsSUFBQUEsT0FBTyxDQUFDO0FBQUMxZSxNQUFBQSxNQUFNLEVBQUNTLENBQUMsR0FBQywrS0FBVjtBQUEwTFIsTUFBQUEsUUFBUSxFQUFDb0QsQ0FBQyxHQUFDLGdLQUFyTTtBQUFzV2pGLE1BQUFBLFFBQVEsRUFBQ3lFLENBQUMsR0FBQyxFQUFqWDtBQUFvWDhiLE1BQUFBLGNBQWMsRUFBQzdiLENBQUMsR0FBQyxNQUFyWTtBQUE0WThiLE1BQUFBLE9BQU8sRUFBQ2piLENBQUMsR0FBQyxDQUFDO0FBQXZaLFFBQTBaLEVBQTNaLEVBQThaO0FBQUNkLE1BQUFBLENBQUMsQ0FBQ0MsQ0FBRCxDQUFELEdBQUs7QUFBQ3hFLFFBQUFBLEtBQUssRUFBQyxLQUFLbWdCLEdBQUwsQ0FBU3pCLElBQVQsQ0FBYzlkO0FBQXJCLE9BQUw7QUFBbUMsVUFBSTZELENBQUMsR0FBQyxJQUFJc0IsQ0FBSixDQUFNLEtBQUt4SCxFQUFYLEVBQWM7QUFBQ21ELFFBQUFBLE1BQU0sRUFBQ1MsQ0FBUjtBQUFVUixRQUFBQSxRQUFRLEVBQUNvRCxDQUFuQjtBQUFxQmpGLFFBQUFBLFFBQVEsRUFBQ3lFO0FBQTlCLE9BQWQsQ0FBTjtBQUFBLFVBQXNERyxDQUFDLEdBQUM7QUFBQzlFLFFBQUFBLElBQUksRUFBQyxJQUFJZ0gsQ0FBSixDQUFNLEtBQUtySSxFQUFYLEVBQWM7QUFBQzZCLFVBQUFBLFFBQVEsRUFBQyxLQUFLQSxRQUFmO0FBQXdCUCxVQUFBQSxPQUFPLEVBQUM0RTtBQUFoQyxTQUFkLENBQU47QUFBd0Q1RSxRQUFBQSxPQUFPLEVBQUM0RSxDQUFoRTtBQUFrRTNFLFFBQUFBLFFBQVEsRUFBQ3lFLENBQTNFO0FBQTZFK2IsUUFBQUEsT0FBTyxFQUFDamIsQ0FBckY7QUFBdUZnYixRQUFBQSxjQUFjLEVBQUM3YjtBQUF0RyxPQUF4RDtBQUFpSyxhQUFPLEtBQUttYixNQUFMLENBQVk1UCxJQUFaLENBQWlCckwsQ0FBakIsR0FBb0JBLENBQTNCO0FBQTZCOztBQUFBckYsSUFBQUEsTUFBTSxDQUFDO0FBQUN1RCxNQUFBQSxLQUFLLEVBQUMyQixDQUFQO0FBQVMxQixNQUFBQSxNQUFNLEVBQUM0QixDQUFoQjtBQUFrQm5HLE1BQUFBLEdBQUcsRUFBQ2tHO0FBQXRCLFFBQXlCLEVBQTFCLEVBQTZCO0FBQUNBLE1BQUFBLENBQUMsS0FBRyxLQUFLbEcsR0FBTCxHQUFTa0csQ0FBWixDQUFELEVBQWdCRCxDQUFDLEtBQUcsS0FBSzNCLEtBQUwsR0FBVzJCLENBQVgsRUFBYSxLQUFLMUIsTUFBTCxHQUFZNEIsQ0FBQyxJQUFFRixDQUEvQixDQUFqQixFQUFtREMsQ0FBQyxHQUFDLEtBQUtsRyxHQUFMLElBQVUsS0FBS0MsRUFBTCxDQUFRSCxRQUFSLENBQWlCRSxHQUFoRixFQUFvRmlHLENBQUMsR0FBQyxDQUFDLEtBQUszQixLQUFMLElBQVksS0FBS3JFLEVBQUwsQ0FBUUgsUUFBUixDQUFpQndFLEtBQTlCLElBQXFDNEIsQ0FBM0gsRUFBNkhDLENBQUMsR0FBQyxDQUFDLEtBQUs1QixNQUFMLElBQWEsS0FBS3RFLEVBQUwsQ0FBUUgsUUFBUixDQUFpQnlFLE1BQS9CLElBQXVDMkIsQ0FBdEssRUFBd0ssS0FBS2llLE9BQUwsQ0FBYTdmLEtBQWIsR0FBbUIyQixDQUEzTCxFQUE2TCxLQUFLa2UsT0FBTCxDQUFhNWYsTUFBYixHQUFvQjRCLENBQWpOLEVBQW1OLEtBQUswYixHQUFMLENBQVN6QixJQUFULEdBQWMsSUFBSTVYLENBQUosQ0FBTSxLQUFLdkksRUFBWCxFQUFjLEtBQUtra0IsT0FBbkIsQ0FBak8sRUFBNlAsS0FBS3RDLEdBQUwsQ0FBU3hCLEtBQVQsR0FBZSxJQUFJN1gsQ0FBSixDQUFNLEtBQUt2SSxFQUFYLEVBQWMsS0FBS2trQixPQUFuQixDQUE1UTtBQUF3Uzs7QUFBQTVlLElBQUFBLE1BQU0sQ0FBQztBQUFDQyxNQUFBQSxLQUFLLEVBQUNVLENBQVA7QUFBUzhSLE1BQUFBLE1BQU0sRUFBQzdSLENBQWhCO0FBQWtCZ0UsTUFBQUEsTUFBTSxFQUFDL0QsQ0FBQyxHQUFDLElBQTNCO0FBQWdDbkIsTUFBQUEsTUFBTSxFQUFDcEIsQ0FBQyxHQUFDLENBQUMsQ0FBMUM7QUFBNEN1Z0IsTUFBQUEsSUFBSSxFQUFDM2QsQ0FBQyxHQUFDLENBQUMsQ0FBcEQ7QUFBc0Q0ZCxNQUFBQSxXQUFXLEVBQUN0ZCxDQUFDLEdBQUMsQ0FBQztBQUFyRSxLQUFELEVBQXlFO0FBQUMsVUFBSWQsQ0FBQyxHQUFDLEtBQUtvYixNQUFMLENBQVlZLE1BQVosQ0FBbUJoYyxDQUFDLElBQUVBLENBQUMsQ0FBQytiLE9BQXhCLENBQU47QUFBdUMsV0FBSy9oQixFQUFMLENBQVFILFFBQVIsQ0FBaUJ5RixNQUFqQixDQUF3QjtBQUFDQyxRQUFBQSxLQUFLLEVBQUNVLENBQVA7QUFBUzhSLFFBQUFBLE1BQU0sRUFBQzdSLENBQWhCO0FBQWtCZ0UsUUFBQUEsTUFBTSxFQUFDbEUsQ0FBQyxDQUFDakMsTUFBRixHQUFTLEtBQUs2ZCxHQUFMLENBQVN4QixLQUFsQixHQUF3QmphLENBQWpEO0FBQW1EbkIsUUFBQUEsTUFBTSxFQUFDcEIsQ0FBMUQ7QUFBNER1Z0IsUUFBQUEsSUFBSSxFQUFDM2QsQ0FBakU7QUFBbUU0ZCxRQUFBQSxXQUFXLEVBQUN0ZDtBQUEvRSxPQUF4QixHQUEyRyxLQUFLOGEsR0FBTCxDQUFTdkIsSUFBVCxFQUEzRyxFQUEySHJhLENBQUMsQ0FBQ3BGLE9BQUYsQ0FBVSxDQUFDcUYsQ0FBRCxFQUFHQyxDQUFILEtBQU87QUFBQ0QsUUFBQUEsQ0FBQyxDQUFDNUUsSUFBRixDQUFPQyxPQUFQLENBQWVDLFFBQWYsQ0FBd0IwRSxDQUFDLENBQUM2YixjQUExQixFQUEwQ3JnQixLQUExQyxHQUFnRCxLQUFLbWdCLEdBQUwsQ0FBU3pCLElBQVQsQ0FBYzlkLE9BQTlELEVBQXNFLEtBQUtyQyxFQUFMLENBQVFILFFBQVIsQ0FBaUJ5RixNQUFqQixDQUF3QjtBQUFDQyxVQUFBQSxLQUFLLEVBQUNVLENBQUMsQ0FBQzVFLElBQVQ7QUFBYzZJLFVBQUFBLE1BQU0sRUFBQ2hFLENBQUMsS0FBR0YsQ0FBQyxDQUFDakMsTUFBRixHQUFTLENBQWIsR0FBZW9DLENBQWYsR0FBaUIsS0FBS3liLEdBQUwsQ0FBU3hCLEtBQS9DO0FBQXFEYyxVQUFBQSxLQUFLLEVBQUMsQ0FBQztBQUE1RCxTQUF4QixDQUF0RSxFQUE4SixLQUFLVSxHQUFMLENBQVN2QixJQUFULEVBQTlKO0FBQThLLE9BQWhNLENBQTNIO0FBQTZUOztBQUF6MkQsR0FBM2tiLEVBQXM3ZXJhLENBQUMsQ0FBQzlDLE9BQUYsR0FBVXNFLENBQWg4ZSxFQUFrOGV4QixDQUFDLENBQUNxZSxJQUFGLEdBQU9sZSxDQUF6OGUsRUFBMjhlSCxDQUFDLENBQUNzZSxPQUFGLEdBQVUsTUFBSztBQUFDL2tCLElBQUFBLFdBQVcsQ0FBQ3lHLENBQUQsRUFBRztBQUFDLFdBQUtoRyxFQUFMLEdBQVFnRyxDQUFSLEVBQVUsS0FBS3VlLE1BQUwsR0FBWSxJQUFJdGUsQ0FBSixFQUF0QixFQUE0QixLQUFLdWUsU0FBTCxHQUFlLElBQUl2ZSxDQUFKLEVBQTNDO0FBQWlEOztBQUFBd2UsSUFBQUEsU0FBUyxDQUFDemUsQ0FBRCxFQUFHQyxDQUFDLEdBQUMsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFMLEVBQVc7QUFBQ0QsTUFBQUEsQ0FBQyxDQUFDNlAsV0FBRixDQUFjZixjQUFkLENBQTZCLEtBQUt5UCxNQUFsQyxHQUEwQyxLQUFLQyxTQUFMLENBQWVwZ0IsR0FBZixDQUFtQjZCLENBQUMsQ0FBQyxDQUFELENBQXBCLEVBQXdCQSxDQUFDLENBQUMsQ0FBRCxDQUF6QixFQUE2QixFQUE3QixDQUExQyxFQUEyRUQsQ0FBQyxDQUFDcVosU0FBRixDQUFZLEtBQUttRixTQUFqQixDQUEzRSxFQUF1RyxLQUFLQSxTQUFMLENBQWV4ZCxHQUFmLENBQW1CLEtBQUt1ZCxNQUF4QixFQUFnQ3pjLFNBQWhDLEVBQXZHO0FBQW1KOztBQUFBNGMsSUFBQUEsZUFBZSxDQUFDMWUsQ0FBRCxFQUFHO0FBQUNhLE1BQUFBLEtBQUssQ0FBQzhkLE9BQU4sQ0FBYzNlLENBQWQsTUFBbUJBLENBQUMsR0FBQyxDQUFDQSxDQUFELENBQXJCO0FBQTBCLFVBQUlHLENBQUMsR0FBQzRYLEVBQU47QUFBQSxVQUFTbmEsQ0FBQyxHQUFDZ2EsRUFBWDtBQUFBLFVBQWNwWCxDQUFDLEdBQUNxWCxFQUFoQjtBQUFBLFVBQW1CM1gsQ0FBQyxHQUFDLEVBQXJCO0FBQXdCLGFBQU9GLENBQUMsQ0FBQ3BGLE9BQUYsQ0FBVW9GLENBQUMsSUFBRTtBQUFDQSxRQUFBQSxDQUFDLENBQUNuRSxRQUFGLENBQVd5SyxNQUFYLElBQW1CdEcsQ0FBQyxDQUFDbkUsUUFBRixDQUFXd0ssa0JBQVgsRUFBbkIsRUFBbUQsYUFBV3JHLENBQUMsQ0FBQ25FLFFBQUYsQ0FBVytpQixPQUF0QixJQUErQjVlLENBQUMsQ0FBQ25FLFFBQUYsQ0FBV3lLLE1BQVgsS0FBb0IsSUFBRSxDQUFyRCxJQUF3RHRHLENBQUMsQ0FBQ25FLFFBQUYsQ0FBVzRLLHFCQUFYLEVBQTNHLEVBQThJdEcsQ0FBQyxDQUFDZ0IsT0FBRixDQUFVbkIsQ0FBQyxDQUFDNlAsV0FBWixDQUE5SSxFQUF1S2pTLENBQUMsQ0FBQ3VCLElBQUYsQ0FBTyxLQUFLb2YsTUFBWixFQUFvQnRjLFlBQXBCLENBQWlDOUIsQ0FBakMsQ0FBdkssRUFBMk1LLENBQUMsQ0FBQ3JCLElBQUYsQ0FBTyxLQUFLcWYsU0FBWixFQUF1QjNiLGtCQUF2QixDQUEwQzFDLENBQTFDLENBQTNNO0FBQXdQLFlBQUlXLENBQUMsR0FBQyxDQUFOO0FBQVEsU0FBQ0EsQ0FBQyxHQUFDLGFBQVdkLENBQUMsQ0FBQ25FLFFBQUYsQ0FBVytpQixPQUF0QixHQUE4QixLQUFLQyxlQUFMLENBQXFCN2UsQ0FBQyxDQUFDbkUsUUFBRixDQUFXeUssTUFBaEMsRUFBdUMxSSxDQUF2QyxFQUF5QzRDLENBQXpDLENBQTlCLEdBQTBFLEtBQUtzZSxZQUFMLENBQWtCOWUsQ0FBQyxDQUFDbkUsUUFBRixDQUFXeUssTUFBN0IsRUFBb0MxSSxDQUFwQyxFQUFzQzRDLENBQXRDLENBQTdFLE1BQXlIUixDQUFDLENBQUMrZSxHQUFGLEtBQVEvZSxDQUFDLENBQUMrZSxHQUFGLEdBQU07QUFBQ0MsVUFBQUEsVUFBVSxFQUFDLElBQUkvZSxDQUFKO0FBQVosU0FBZCxHQUFrQ0QsQ0FBQyxDQUFDK2UsR0FBRixDQUFNM2QsUUFBTixHQUFlTixDQUFqRCxFQUFtRGQsQ0FBQyxDQUFDK2UsR0FBRixDQUFNQyxVQUFOLENBQWlCN2YsSUFBakIsQ0FBc0JxQixDQUF0QixFQUF5QlMsUUFBekIsQ0FBa0NILENBQWxDLEVBQXFDQyxHQUFyQyxDQUF5Q25ELENBQXpDLENBQW5ELEVBQStGc0MsQ0FBQyxDQUFDc0wsSUFBRixDQUFPeEwsQ0FBUCxDQUF4TjtBQUFtTyxPQUFqZixHQUFtZkUsQ0FBQyxDQUFDaWUsSUFBRixDQUFPLENBQUNuZSxDQUFELEVBQUdDLENBQUgsS0FBT0QsQ0FBQyxDQUFDK2UsR0FBRixDQUFNM2QsUUFBTixHQUFlbkIsQ0FBQyxDQUFDOGUsR0FBRixDQUFNM2QsUUFBbkMsQ0FBbmYsRUFBZ2lCbEIsQ0FBdmlCO0FBQXlpQjs7QUFBQTJlLElBQUFBLGVBQWUsQ0FBQzNlLENBQUQsRUFBR3VCLENBQUMsR0FBQyxLQUFLOGMsTUFBVixFQUFpQmhkLENBQUMsR0FBQyxLQUFLaWQsU0FBeEIsRUFBa0M7QUFBQyxVQUFJeGUsQ0FBQyxHQUFDOFgsRUFBTjtBQUFTOVgsTUFBQUEsQ0FBQyxDQUFDZ0IsR0FBRixDQUFNZCxDQUFDLENBQUNxRyxNQUFSLEVBQWU5RSxDQUFmO0FBQWtCLFVBQUl4QixDQUFDLEdBQUNELENBQUMsQ0FBQytCLEdBQUYsQ0FBTVIsQ0FBTixDQUFOO0FBQUEsVUFBZTNELENBQUMsR0FBQ29DLENBQUMsQ0FBQytCLEdBQUYsQ0FBTS9CLENBQU4sSUFBU0MsQ0FBQyxHQUFDQSxDQUE1QjtBQUFBLFVBQThCTyxDQUFDLEdBQUNOLENBQUMsQ0FBQ3NHLE1BQUYsR0FBU3RHLENBQUMsQ0FBQ3NHLE1BQTNDO0FBQWtELFVBQUc1SSxDQUFDLEdBQUM0QyxDQUFMLEVBQU8sT0FBTyxDQUFQO0FBQVMsVUFBSU0sQ0FBQyxHQUFDakMsSUFBSSxDQUFDdUIsSUFBTCxDQUFVSSxDQUFDLEdBQUM1QyxDQUFaLENBQU47QUFBQSxVQUFxQnVDLENBQUMsR0FBQ0YsQ0FBQyxHQUFDYSxDQUF6QjtBQUFBLFVBQTJCVSxDQUFDLEdBQUN2QixDQUFDLEdBQUNhLENBQS9CO0FBQWlDLGFBQU9YLENBQUMsR0FBQyxDQUFGLElBQUtxQixDQUFDLEdBQUMsQ0FBUCxHQUFTLENBQVQsR0FBV3JCLENBQUMsR0FBQyxDQUFGLEdBQUlxQixDQUFKLEdBQU1yQixDQUF4QjtBQUEwQjs7QUFBQTJlLElBQUFBLFlBQVksQ0FBQ3pjLENBQUQsRUFBR25DLENBQUMsR0FBQyxLQUFLcWUsTUFBVixFQUFpQjNjLENBQUMsR0FBQyxLQUFLNGMsU0FBeEIsRUFBa0M7QUFBQyxVQUFJeGUsQ0FBSjtBQUFBLFVBQU1DLENBQU47QUFBQSxVQUFRTyxDQUFSO0FBQUEsVUFBVTRCLENBQVY7QUFBQSxVQUFZdEIsQ0FBWjtBQUFBLFVBQWMwQixDQUFkO0FBQUEsVUFBZ0JoQixDQUFDLEdBQUMsSUFBRUksQ0FBQyxDQUFDNUQsQ0FBdEI7QUFBQSxVQUF3QnlELENBQUMsR0FBQyxJQUFFRyxDQUFDLENBQUMxRCxDQUE5QjtBQUFBLFVBQWdDcUQsQ0FBQyxHQUFDLElBQUVLLENBQUMsQ0FBQ25CLENBQXRDO0FBQUEsVUFBd0NOLENBQUMsR0FBQ2tDLENBQUMsQ0FBQ3dDLEdBQTVDO0FBQUEsVUFBZ0RqSCxDQUFDLEdBQUN5RSxDQUFDLENBQUN2RCxHQUFwRDtBQUF3RCxhQUFPa0IsQ0FBQyxHQUFDLENBQUMsQ0FBQ3dCLENBQUMsSUFBRSxDQUFILEdBQUtyQixDQUFDLENBQUNuQyxDQUFQLEdBQVNKLENBQUMsQ0FBQ0ksQ0FBWixJQUFla0MsQ0FBQyxDQUFDbEMsQ0FBbEIsSUFBcUJ3RCxDQUF2QixFQUF5QnZCLENBQUMsR0FBQyxDQUFDLENBQUN1QixDQUFDLElBQUUsQ0FBSCxHQUFLNUQsQ0FBQyxDQUFDSSxDQUFQLEdBQVNtQyxDQUFDLENBQUNuQyxDQUFaLElBQWVrQyxDQUFDLENBQUNsQyxDQUFsQixJQUFxQndELENBQWhELEVBQWtEaEIsQ0FBQyxHQUFDLENBQUMsQ0FBQ2lCLENBQUMsSUFBRSxDQUFILEdBQUt0QixDQUFDLENBQUNqQyxDQUFQLEdBQVNOLENBQUMsQ0FBQ00sQ0FBWixJQUFlZ0MsQ0FBQyxDQUFDaEMsQ0FBbEIsSUFBcUJ1RCxDQUF6RSxFQUEyRXpCLENBQUMsSUFBRW9DLENBQUMsR0FBQyxDQUFDLENBQUNYLENBQUMsSUFBRSxDQUFILEdBQUs3RCxDQUFDLENBQUNNLENBQVAsR0FBU2lDLENBQUMsQ0FBQ2pDLENBQVosSUFBZWdDLENBQUMsQ0FBQ2hDLENBQWxCLElBQXFCdUQsQ0FBekIsQ0FBRCxJQUE4QmpCLENBQUMsR0FBQ1AsQ0FBaEMsR0FBa0MsQ0FBbEMsSUFBcUNPLENBQUMsR0FBQ1IsQ0FBRixLQUFNQSxDQUFDLEdBQUNRLENBQVIsR0FBVzRCLENBQUMsR0FBQ25DLENBQUYsS0FBTUEsQ0FBQyxHQUFDbUMsQ0FBUixDQUFYLEVBQXNCdEIsQ0FBQyxHQUFDLENBQUMsQ0FBQ1MsQ0FBQyxJQUFFLENBQUgsR0FBS3BCLENBQUMsQ0FBQ00sQ0FBUCxHQUFTN0MsQ0FBQyxDQUFDNkMsQ0FBWixJQUFlUCxDQUFDLENBQUNPLENBQWxCLElBQXFCYyxDQUE3QyxFQUErQ3ZCLENBQUMsSUFBRXdDLENBQUMsR0FBQyxDQUFDLENBQUNqQixDQUFDLElBQUUsQ0FBSCxHQUFLM0QsQ0FBQyxDQUFDNkMsQ0FBUCxHQUFTTixDQUFDLENBQUNNLENBQVosSUFBZVAsQ0FBQyxDQUFDTyxDQUFsQixJQUFxQmMsQ0FBekIsQ0FBRCxJQUE4QlQsQ0FBQyxHQUFDYixDQUFoQyxHQUFrQyxDQUFsQyxJQUFxQ2EsQ0FBQyxHQUFDZCxDQUFGLEtBQU1BLENBQUMsR0FBQ2MsQ0FBUixHQUFXMEIsQ0FBQyxHQUFDdkMsQ0FBRixLQUFNQSxDQUFDLEdBQUN1QyxDQUFSLENBQVgsRUFBc0J2QyxDQUFDLEdBQUMsQ0FBRixHQUFJLENBQUosR0FBTUQsQ0FBQyxJQUFFLENBQUgsR0FBS0EsQ0FBTCxHQUFPQyxDQUF4RSxDQUFwRixDQUFsRjtBQUFrUDs7QUFBMTNDLEdBQTE5ZSxFQUFzMWhCRCxDQUFDLENBQUNpZixZQUFGLEdBQWUxYyxDQUFyMmhCLEVBQXUyaEJ2QyxDQUFDLENBQUNsRyxRQUFGLEdBQVcsTUFBSztBQUFDUCxJQUFBQSxXQUFXLENBQUM7QUFBQ0csTUFBQUEsTUFBTSxFQUFDc0csQ0FBQyxHQUFDckcsUUFBUSxDQUFDdWxCLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBVjtBQUEyQzdnQixNQUFBQSxLQUFLLEVBQUN5QyxDQUFDLEdBQUMsR0FBbkQ7QUFBdUR4QyxNQUFBQSxNQUFNLEVBQUNrRCxDQUFDLEdBQUMsR0FBaEU7QUFBb0V6SCxNQUFBQSxHQUFHLEVBQUMwSCxDQUFDLEdBQUMsQ0FBMUU7QUFBNEV1WSxNQUFBQSxLQUFLLEVBQUM5WixDQUFDLEdBQUMsQ0FBQyxDQUFyRjtBQUF1RjBVLE1BQUFBLEtBQUssRUFBQ3pVLENBQUMsR0FBQyxDQUFDLENBQWhHO0FBQWtHMFUsTUFBQUEsT0FBTyxFQUFDalgsQ0FBQyxHQUFDLENBQUMsQ0FBN0c7QUFBK0d1aEIsTUFBQUEsU0FBUyxFQUFDNWQsQ0FBQyxHQUFDLENBQUMsQ0FBNUg7QUFBOEhzRyxNQUFBQSxrQkFBa0IsRUFBQ3JILENBQUMsR0FBQyxDQUFDLENBQXBKO0FBQXNKNGUsTUFBQUEscUJBQXFCLEVBQUN4ZCxDQUFDLEdBQUMsQ0FBQyxDQUEvSztBQUFpTHlkLE1BQUFBLGVBQWUsRUFBQ2pkLENBQUMsR0FBQyxTQUFuTTtBQUE2TWtkLE1BQUFBLFNBQVMsRUFBQzljLENBQUMsR0FBQyxDQUFDLENBQTFOO0FBQTROK2MsTUFBQUEsS0FBSyxFQUFDbGQsQ0FBQyxHQUFDO0FBQXBPLFFBQXVPLEVBQXhPLEVBQTJPO0FBQUMsVUFBSXBDLENBQUMsR0FBQztBQUFDK1osUUFBQUEsS0FBSyxFQUFDOVosQ0FBUDtBQUFTMFUsUUFBQUEsS0FBSyxFQUFDelUsQ0FBZjtBQUFpQjBVLFFBQUFBLE9BQU8sRUFBQ2pYLENBQXpCO0FBQTJCdWhCLFFBQUFBLFNBQVMsRUFBQzVkLENBQXJDO0FBQXVDc0csUUFBQUEsa0JBQWtCLEVBQUNySCxDQUExRDtBQUE0RDRlLFFBQUFBLHFCQUFxQixFQUFDeGQsQ0FBbEY7QUFBb0Z5ZCxRQUFBQSxlQUFlLEVBQUNqZDtBQUFwRyxPQUFOO0FBQTZHLFdBQUtySSxHQUFMLEdBQVMwSCxDQUFULEVBQVcsS0FBS3VZLEtBQUwsR0FBVzlaLENBQXRCLEVBQXdCLEtBQUt5VSxLQUFMLEdBQVcsQ0FBQyxDQUFwQyxFQUFzQyxLQUFLQyxLQUFMLEdBQVd6VSxDQUFqRCxFQUFtRCxLQUFLMFUsT0FBTCxHQUFhalgsQ0FBaEUsRUFBa0UsS0FBS2lLLGtCQUFMLEdBQXdCckgsQ0FBMUYsRUFBNEYsS0FBSzhlLFNBQUwsR0FBZTljLENBQTNHLEVBQTZHLE1BQUlILENBQUosS0FBUSxLQUFLckksRUFBTCxHQUFRZ0csQ0FBQyxDQUFDd2YsVUFBRixDQUFhLFFBQWIsRUFBc0J2ZixDQUF0QixDQUFoQixDQUE3RyxFQUF1SixLQUFLbVUsUUFBTCxHQUFjLENBQUMsQ0FBQyxLQUFLcGEsRUFBNUssRUFBK0ssS0FBS0EsRUFBTCxLQUFVLEtBQUtBLEVBQUwsR0FBUWdHLENBQUMsQ0FBQ3dmLFVBQUYsQ0FBYSxPQUFiLEVBQXFCdmYsQ0FBckIsS0FBeUJELENBQUMsQ0FBQ3dmLFVBQUYsQ0FBYSxvQkFBYixFQUFrQ3ZmLENBQWxDLENBQTNDLENBQS9LLEVBQWdRLEtBQUtqRyxFQUFMLENBQVFILFFBQVIsR0FBaUIsSUFBalIsRUFBc1IsS0FBSzhCLE9BQUwsQ0FBYW1GLENBQWIsRUFBZVUsQ0FBZixDQUF0UixFQUF3UyxLQUFLaWUsVUFBTCxHQUFnQixFQUF4VCxFQUEyVCxLQUFLQSxVQUFMLENBQWdCQyxlQUFoQixHQUFnQyxLQUFLMWxCLEVBQUwsQ0FBUTJsQixZQUFSLENBQXFCLEtBQUszbEIsRUFBTCxDQUFRNGxCLGdDQUE3QixDQUEzVixFQUEwWixLQUFLamMsS0FBTCxHQUFXLEVBQXJhLEVBQXdhLEtBQUtBLEtBQUwsQ0FBV2dFLFNBQVgsR0FBcUI7QUFBQzVLLFFBQUFBLEdBQUcsRUFBQyxLQUFLL0MsRUFBTCxDQUFRK04sR0FBYjtBQUFpQm1DLFFBQUFBLEdBQUcsRUFBQyxLQUFLbFEsRUFBTCxDQUFRNmxCO0FBQTdCLE9BQTdiLEVBQWdlLEtBQUtsYyxLQUFMLENBQVdpRSxhQUFYLEdBQXlCO0FBQUMwQyxRQUFBQSxPQUFPLEVBQUMsS0FBS3RRLEVBQUwsQ0FBUThsQjtBQUFqQixPQUF6ZixFQUFvaEIsS0FBS25jLEtBQUwsQ0FBV3NELFFBQVgsR0FBb0IsSUFBeGlCLEVBQTZpQixLQUFLdEQsS0FBTCxDQUFXd0QsU0FBWCxHQUFxQixLQUFLbk4sRUFBTCxDQUFRb04sR0FBMWtCLEVBQThrQixLQUFLekQsS0FBTCxDQUFXb2MsU0FBWCxHQUFxQixDQUFDLENBQXBtQixFQUFzbUIsS0FBS3BjLEtBQUwsQ0FBVzZELFNBQVgsR0FBcUIsS0FBS3hOLEVBQUwsQ0FBUTBOLElBQW5vQixFQUF3b0IsS0FBSy9ELEtBQUwsQ0FBV3FQLGdCQUFYLEdBQTRCLENBQUMsQ0FBcnFCLEVBQXVxQixLQUFLclAsS0FBTCxDQUFXdVAsS0FBWCxHQUFpQixDQUFDLENBQXpyQixFQUEyckIsS0FBS3ZQLEtBQUwsQ0FBV3NQLGVBQVgsR0FBMkIsQ0FBdHRCLEVBQXd0QixLQUFLdFAsS0FBTCxDQUFXcWMsV0FBWCxHQUF1QixJQUEvdUIsRUFBb3ZCLEtBQUtyYyxLQUFMLENBQVdzYyxRQUFYLEdBQW9CO0FBQUM1aEIsUUFBQUEsS0FBSyxFQUFDLElBQVA7QUFBWUMsUUFBQUEsTUFBTSxFQUFDO0FBQW5CLE9BQXh3QixFQUFpeUIsS0FBS3FGLEtBQUwsQ0FBVzRQLFlBQVgsR0FBd0IsRUFBenpCLEVBQTR6QixLQUFLNVAsS0FBTCxDQUFXNlAsaUJBQVgsR0FBNkIsQ0FBejFCLEVBQTIxQixLQUFLN1AsS0FBTCxDQUFXb0IsV0FBWCxHQUF1QixJQUFsM0IsRUFBdTNCLEtBQUtwQixLQUFMLENBQVdxRixnQkFBWCxHQUE0QixJQUFJQyxHQUFKLEVBQW41QixFQUEyNUIsS0FBS3FSLFVBQUwsR0FBZ0IsRUFBMzZCLEVBQTg2QixLQUFLbEcsUUFBTCxJQUFlLEtBQUtnQixZQUFMLENBQWtCLHdCQUFsQixHQUE0QyxLQUFLQSxZQUFMLENBQWtCLDBCQUFsQixDQUEzRCxLQUEyRyxLQUFLQSxZQUFMLENBQWtCLG1CQUFsQixHQUF1QyxLQUFLQSxZQUFMLENBQWtCLDBCQUFsQixDQUF2QyxFQUFxRixLQUFLQSxZQUFMLENBQWtCLHdCQUFsQixDQUFyRixFQUFpSSxLQUFLQSxZQUFMLENBQWtCLCtCQUFsQixDQUFqSSxFQUFvTCxLQUFLQSxZQUFMLENBQWtCLHdCQUFsQixDQUFwTCxFQUFnTyxLQUFLQSxZQUFMLENBQWtCLDBCQUFsQixDQUFoTyxFQUE4USxLQUFLQSxZQUFMLENBQWtCLFVBQWxCLENBQTlRLEVBQTRTLEtBQUtBLFlBQUwsQ0FBa0IscUJBQWxCLENBQXZaLENBQTk2QixFQUErMkMsS0FBS3ZQLG1CQUFMLEdBQXlCLEtBQUt1UCxZQUFMLENBQWtCLHdCQUFsQixFQUEyQyxxQkFBM0MsRUFBaUUsMEJBQWpFLENBQXg0QyxFQUFxK0MsS0FBS2xQLG1CQUFMLEdBQXlCLEtBQUtrUCxZQUFMLENBQWtCLHdCQUFsQixFQUEyQyxxQkFBM0MsRUFBaUUsMEJBQWpFLENBQTkvQyxFQUEybEQsS0FBS25QLHFCQUFMLEdBQTJCLEtBQUttUCxZQUFMLENBQWtCLHdCQUFsQixFQUEyQyx1QkFBM0MsRUFBbUUsNEJBQW5FLENBQXRuRCxFQUF1dEQsS0FBSzVQLGlCQUFMLEdBQXVCLEtBQUs0UCxZQUFMLENBQWtCLHlCQUFsQixFQUE0QyxtQkFBNUMsRUFBZ0Usc0JBQWhFLENBQTl1RCxFQUFzMEQsS0FBSzVSLGVBQUwsR0FBcUIsS0FBSzRSLFlBQUwsQ0FBa0IseUJBQWxCLEVBQTRDLGlCQUE1QyxFQUE4RCxvQkFBOUQsQ0FBMzFELEVBQSs2RCxLQUFLeE8saUJBQUwsR0FBdUIsS0FBS3dPLFlBQUwsQ0FBa0IseUJBQWxCLEVBQTRDLG1CQUE1QyxFQUFnRSxzQkFBaEUsQ0FBdDhEO0FBQThoRTs7QUFBQXpaLElBQUFBLE9BQU8sQ0FBQ3FFLENBQUQsRUFBR0MsQ0FBSCxFQUFLO0FBQUMsV0FBSzVCLEtBQUwsR0FBVzJCLENBQVgsRUFBYSxLQUFLMUIsTUFBTCxHQUFZMkIsQ0FBekIsRUFBMkIsS0FBS2pHLEVBQUwsQ0FBUU4sTUFBUixDQUFlMkUsS0FBZixHQUFxQjJCLENBQUMsR0FBQyxLQUFLakcsR0FBdkQsRUFBMkQsS0FBS0MsRUFBTCxDQUFRTixNQUFSLENBQWU0RSxNQUFmLEdBQXNCMkIsQ0FBQyxHQUFDLEtBQUtsRyxHQUF4RixFQUE0RjJYLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLEtBQUszWCxFQUFMLENBQVFOLE1BQVIsQ0FBZXdtQixLQUE3QixFQUFtQztBQUFDN2hCLFFBQUFBLEtBQUssRUFBQzJCLENBQUMsR0FBQyxJQUFUO0FBQWMxQixRQUFBQSxNQUFNLEVBQUMyQixDQUFDLEdBQUM7QUFBdkIsT0FBbkMsQ0FBNUY7QUFBNko7O0FBQUFrZ0IsSUFBQUEsV0FBVyxDQUFDbmdCLENBQUQsRUFBR0MsQ0FBSCxFQUFLO0FBQUMsV0FBSzBELEtBQUwsQ0FBV3NjLFFBQVgsQ0FBb0I1aEIsS0FBcEIsS0FBNEIyQixDQUE1QixJQUErQixLQUFLMkQsS0FBTCxDQUFXc2MsUUFBWCxDQUFvQjNoQixNQUFwQixLQUE2QjJCLENBQTVELEtBQWdFLEtBQUswRCxLQUFMLENBQVdzYyxRQUFYLENBQW9CNWhCLEtBQXBCLEdBQTBCMkIsQ0FBMUIsRUFBNEIsS0FBSzJELEtBQUwsQ0FBV3NjLFFBQVgsQ0FBb0IzaEIsTUFBcEIsR0FBMkIyQixDQUF2RCxFQUF5RCxLQUFLakcsRUFBTCxDQUFRaW1CLFFBQVIsQ0FBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUJqZ0IsQ0FBckIsRUFBdUJDLENBQXZCLENBQXpIO0FBQW9KOztBQUFBd0ssSUFBQUEsTUFBTSxDQUFDekssQ0FBRCxFQUFHO0FBQUMsT0FBQyxDQUFELEtBQUssS0FBSzJELEtBQUwsQ0FBVzNELENBQVgsQ0FBTCxLQUFxQixLQUFLaEcsRUFBTCxDQUFReVEsTUFBUixDQUFlekssQ0FBZixHQUFrQixLQUFLMkQsS0FBTCxDQUFXM0QsQ0FBWCxJQUFjLENBQUMsQ0FBdEQ7QUFBeUQ7O0FBQUEySyxJQUFBQSxPQUFPLENBQUMzSyxDQUFELEVBQUc7QUFBQyxPQUFDLENBQUQsS0FBSyxLQUFLMkQsS0FBTCxDQUFXM0QsQ0FBWCxDQUFMLEtBQXFCLEtBQUtoRyxFQUFMLENBQVEyUSxPQUFSLENBQWdCM0ssQ0FBaEIsR0FBbUIsS0FBSzJELEtBQUwsQ0FBVzNELENBQVgsSUFBYyxDQUFDLENBQXZEO0FBQTBEOztBQUFBOEgsSUFBQUEsWUFBWSxDQUFDOUgsQ0FBRCxFQUFHQyxDQUFILEVBQUtDLENBQUwsRUFBT0MsQ0FBUCxFQUFTO0FBQUMsV0FBS3dELEtBQUwsQ0FBV2dFLFNBQVgsQ0FBcUI1SyxHQUFyQixLQUEyQmlELENBQTNCLElBQThCLEtBQUsyRCxLQUFMLENBQVdnRSxTQUFYLENBQXFCdUMsR0FBckIsS0FBMkJqSyxDQUF6RCxJQUE0RCxLQUFLMEQsS0FBTCxDQUFXZ0UsU0FBWCxDQUFxQndDLFFBQXJCLEtBQWdDakssQ0FBNUYsSUFBK0YsS0FBS3lELEtBQUwsQ0FBV2dFLFNBQVgsQ0FBcUJ5QyxRQUFyQixLQUFnQ2pLLENBQS9ILEtBQW1JLEtBQUt3RCxLQUFMLENBQVdnRSxTQUFYLENBQXFCNUssR0FBckIsR0FBeUJpRCxDQUF6QixFQUEyQixLQUFLMkQsS0FBTCxDQUFXZ0UsU0FBWCxDQUFxQnVDLEdBQXJCLEdBQXlCakssQ0FBcEQsRUFBc0QsS0FBSzBELEtBQUwsQ0FBV2dFLFNBQVgsQ0FBcUJ3QyxRQUFyQixHQUE4QmpLLENBQXBGLEVBQXNGLEtBQUt5RCxLQUFMLENBQVdnRSxTQUFYLENBQXFCeUMsUUFBckIsR0FBOEJqSyxDQUFwSCxFQUFzSCxLQUFLLENBQUwsS0FBU0QsQ0FBVCxHQUFXLEtBQUtsRyxFQUFMLENBQVFvbUIsaUJBQVIsQ0FBMEJwZ0IsQ0FBMUIsRUFBNEJDLENBQTVCLEVBQThCQyxDQUE5QixFQUFnQ0MsQ0FBaEMsQ0FBWCxHQUE4QyxLQUFLbkcsRUFBTCxDQUFRMk4sU0FBUixDQUFrQjNILENBQWxCLEVBQW9CQyxDQUFwQixDQUF2UztBQUErVDs7QUFBQW9LLElBQUFBLGdCQUFnQixDQUFDckssQ0FBRCxFQUFHQyxDQUFILEVBQUs7QUFBQyxXQUFLMEQsS0FBTCxDQUFXaUUsYUFBWCxDQUF5QjBDLE9BQXpCLEtBQW1DdEssQ0FBbkMsSUFBc0MsS0FBSzJELEtBQUwsQ0FBV2lFLGFBQVgsQ0FBeUIyQyxTQUF6QixLQUFxQ3RLLENBQTNFLEtBQStFLEtBQUswRCxLQUFMLENBQVdpRSxhQUFYLENBQXlCMEMsT0FBekIsR0FBaUN0SyxDQUFqQyxFQUFtQyxLQUFLMkQsS0FBTCxDQUFXaUUsYUFBWCxDQUF5QjJDLFNBQXpCLEdBQW1DdEssQ0FBdEUsRUFBd0UsS0FBSyxDQUFMLEtBQVNBLENBQVQsR0FBVyxLQUFLakcsRUFBTCxDQUFRcW1CLHFCQUFSLENBQThCcmdCLENBQTlCLEVBQWdDQyxDQUFoQyxDQUFYLEdBQThDLEtBQUtqRyxFQUFMLENBQVE0TixhQUFSLENBQXNCNUgsQ0FBdEIsQ0FBck07QUFBK047O0FBQUE4SyxJQUFBQSxXQUFXLENBQUM5SyxDQUFELEVBQUc7QUFBQyxXQUFLMkQsS0FBTCxDQUFXc0QsUUFBWCxLQUFzQmpILENBQXRCLEtBQTBCLEtBQUsyRCxLQUFMLENBQVdzRCxRQUFYLEdBQW9CakgsQ0FBcEIsRUFBc0IsS0FBS2hHLEVBQUwsQ0FBUWlOLFFBQVIsQ0FBaUJqSCxDQUFqQixDQUFoRDtBQUFxRTs7QUFBQStLLElBQUFBLFlBQVksQ0FBQy9LLENBQUQsRUFBRztBQUFDLFdBQUsyRCxLQUFMLENBQVd3RCxTQUFYLEtBQXVCbkgsQ0FBdkIsS0FBMkIsS0FBSzJELEtBQUwsQ0FBV3dELFNBQVgsR0FBcUJuSCxDQUFyQixFQUF1QixLQUFLaEcsRUFBTCxDQUFRbU4sU0FBUixDQUFrQm5ILENBQWxCLENBQWxEO0FBQXdFOztBQUFBZ0wsSUFBQUEsWUFBWSxDQUFDaEwsQ0FBRCxFQUFHO0FBQUMsV0FBSzJELEtBQUwsQ0FBV29jLFNBQVgsS0FBdUIvZixDQUF2QixLQUEyQixLQUFLMkQsS0FBTCxDQUFXb2MsU0FBWCxHQUFxQi9mLENBQXJCLEVBQXVCLEtBQUtoRyxFQUFMLENBQVErbEIsU0FBUixDQUFrQi9mLENBQWxCLENBQWxEO0FBQXdFOztBQUFBaUwsSUFBQUEsWUFBWSxDQUFDakwsQ0FBRCxFQUFHO0FBQUMsV0FBSzJELEtBQUwsQ0FBVzZELFNBQVgsS0FBdUJ4SCxDQUF2QixLQUEyQixLQUFLMkQsS0FBTCxDQUFXNkQsU0FBWCxHQUFxQnhILENBQXJCLEVBQXVCLEtBQUtoRyxFQUFMLENBQVF3TixTQUFSLENBQWtCeEgsQ0FBbEIsQ0FBbEQ7QUFBd0U7O0FBQUEwVCxJQUFBQSxhQUFhLENBQUMxVCxDQUFELEVBQUc7QUFBQyxXQUFLMkQsS0FBTCxDQUFXNlAsaUJBQVgsS0FBK0J4VCxDQUEvQixLQUFtQyxLQUFLMkQsS0FBTCxDQUFXNlAsaUJBQVgsR0FBNkJ4VCxDQUE3QixFQUErQixLQUFLaEcsRUFBTCxDQUFRMFosYUFBUixDQUFzQixLQUFLMVosRUFBTCxDQUFRc21CLFFBQVIsR0FBaUJ0Z0IsQ0FBdkMsQ0FBbEU7QUFBNkc7O0FBQUFnVixJQUFBQSxlQUFlLENBQUM7QUFBQzlRLE1BQUFBLE1BQU0sRUFBQ2pFLENBQUMsR0FBQyxLQUFLakcsRUFBTCxDQUFRMGEsV0FBbEI7QUFBOEJyUSxNQUFBQSxNQUFNLEVBQUNyRSxDQUFDLEdBQUM7QUFBdkMsUUFBNkMsRUFBOUMsRUFBaUQ7QUFBQyxXQUFLMkQsS0FBTCxDQUFXcWMsV0FBWCxLQUF5QmhnQixDQUF6QixLQUE2QixLQUFLMkQsS0FBTCxDQUFXcWMsV0FBWCxHQUF1QmhnQixDQUF2QixFQUF5QixLQUFLaEcsRUFBTCxDQUFRZ2IsZUFBUixDQUF3Qi9VLENBQXhCLEVBQTBCRCxDQUExQixDQUF0RDtBQUFvRjs7QUFBQW9WLElBQUFBLFlBQVksQ0FBQ3BWLENBQUQsRUFBR0MsQ0FBSCxFQUFLQyxDQUFMLEVBQU87QUFBQyxhQUFPRCxDQUFDLElBQUUsS0FBS2pHLEVBQUwsQ0FBUWlHLENBQVIsQ0FBSCxHQUFjLEtBQUtqRyxFQUFMLENBQVFpRyxDQUFSLEVBQVd6RyxJQUFYLENBQWdCLEtBQUtRLEVBQXJCLENBQWQsSUFBd0MsS0FBS3NnQixVQUFMLENBQWdCdGEsQ0FBaEIsTUFBcUIsS0FBS3NhLFVBQUwsQ0FBZ0J0YSxDQUFoQixJQUFtQixLQUFLaEcsRUFBTCxDQUFRb2IsWUFBUixDQUFxQnBWLENBQXJCLENBQXhDLEdBQWlFQyxDQUFDLEdBQUMsS0FBS3FhLFVBQUwsQ0FBZ0J0YSxDQUFoQixFQUFtQkUsQ0FBbkIsRUFBc0IxRyxJQUF0QixDQUEyQixLQUFLOGdCLFVBQUwsQ0FBZ0J0YSxDQUFoQixDQUEzQixDQUFELEdBQWdELEtBQUtzYSxVQUFMLENBQWdCdGEsQ0FBaEIsQ0FBMUosQ0FBUDtBQUFxTDs7QUFBQXVnQixJQUFBQSxVQUFVLENBQUN2Z0IsQ0FBRCxFQUFHQyxDQUFILEVBQUs7QUFBQyxhQUFPRCxDQUFDLENBQUNzUixXQUFGLEtBQWdCclIsQ0FBQyxDQUFDcVIsV0FBbEIsR0FBOEJ0UixDQUFDLENBQUNzUixXQUFGLEdBQWNyUixDQUFDLENBQUNxUixXQUE5QyxHQUEwRHRSLENBQUMsQ0FBQzFFLE9BQUYsQ0FBVTRILEVBQVYsS0FBZWpELENBQUMsQ0FBQzNFLE9BQUYsQ0FBVTRILEVBQXpCLEdBQTRCbEQsQ0FBQyxDQUFDMUUsT0FBRixDQUFVNEgsRUFBVixHQUFhakQsQ0FBQyxDQUFDM0UsT0FBRixDQUFVNEgsRUFBbkQsR0FBc0RsRCxDQUFDLENBQUN3Z0IsTUFBRixLQUFXdmdCLENBQUMsQ0FBQ3VnQixNQUFiLEdBQW9CeGdCLENBQUMsQ0FBQ3dnQixNQUFGLEdBQVN2Z0IsQ0FBQyxDQUFDdWdCLE1BQS9CLEdBQXNDdmdCLENBQUMsQ0FBQ2lELEVBQUYsR0FBS2xELENBQUMsQ0FBQ2tELEVBQXBLO0FBQXVLOztBQUFBdWQsSUFBQUEsZUFBZSxDQUFDemdCLENBQUQsRUFBR0MsQ0FBSCxFQUFLO0FBQUMsYUFBT0QsQ0FBQyxDQUFDc1IsV0FBRixLQUFnQnJSLENBQUMsQ0FBQ3FSLFdBQWxCLEdBQThCdFIsQ0FBQyxDQUFDc1IsV0FBRixHQUFjclIsQ0FBQyxDQUFDcVIsV0FBOUMsR0FBMER0UixDQUFDLENBQUN3Z0IsTUFBRixLQUFXdmdCLENBQUMsQ0FBQ3VnQixNQUFiLEdBQW9CdmdCLENBQUMsQ0FBQ3VnQixNQUFGLEdBQVN4Z0IsQ0FBQyxDQUFDd2dCLE1BQS9CLEdBQXNDdmdCLENBQUMsQ0FBQ2lELEVBQUYsR0FBS2xELENBQUMsQ0FBQ2tELEVBQTlHO0FBQWlIOztBQUFBd2QsSUFBQUEsTUFBTSxDQUFDMWdCLENBQUQsRUFBR0MsQ0FBSCxFQUFLO0FBQUMsYUFBT0QsQ0FBQyxDQUFDc1IsV0FBRixLQUFnQnJSLENBQUMsQ0FBQ3FSLFdBQWxCLEdBQThCdFIsQ0FBQyxDQUFDc1IsV0FBRixHQUFjclIsQ0FBQyxDQUFDcVIsV0FBOUMsR0FBMER0UixDQUFDLENBQUMxRSxPQUFGLENBQVU0SCxFQUFWLEtBQWVqRCxDQUFDLENBQUMzRSxPQUFGLENBQVU0SCxFQUF6QixHQUE0QmxELENBQUMsQ0FBQzFFLE9BQUYsQ0FBVTRILEVBQVYsR0FBYWpELENBQUMsQ0FBQzNFLE9BQUYsQ0FBVTRILEVBQW5ELEdBQXNEakQsQ0FBQyxDQUFDaUQsRUFBRixHQUFLbEQsQ0FBQyxDQUFDa0QsRUFBOUg7QUFBaUk7O0FBQUF5ZCxJQUFBQSxhQUFhLENBQUM7QUFBQ3BoQixNQUFBQSxLQUFLLEVBQUNpQixDQUFQO0FBQVN1UixNQUFBQSxNQUFNLEVBQUM5UixDQUFoQjtBQUFrQm1lLE1BQUFBLFdBQVcsRUFBQ3RkLENBQTlCO0FBQWdDcWQsTUFBQUEsSUFBSSxFQUFDM2M7QUFBckMsS0FBRCxFQUF5QztBQUFDLFVBQUl4QixDQUFDLEdBQUMsRUFBTjs7QUFBUyxVQUFHQyxDQUFDLElBQUVhLENBQUgsSUFBTWIsQ0FBQyxDQUFDcVosYUFBRixFQUFOLEVBQXdCOVksQ0FBQyxDQUFDa1EsUUFBRixDQUFXeFEsQ0FBQyxJQUFFO0FBQUMsWUFBRyxDQUFDQSxDQUFDLENBQUN5UCxPQUFOLEVBQWMsT0FBTSxDQUFDLENBQVA7QUFBU3pQLFFBQUFBLENBQUMsQ0FBQzRGLElBQUYsS0FBU2hGLENBQUMsSUFBRVosQ0FBQyxDQUFDbVIsYUFBTCxJQUFvQnBSLENBQXBCLElBQXVCLENBQUNBLENBQUMsQ0FBQ3daLHFCQUFGLENBQXdCdlosQ0FBeEIsQ0FBeEIsSUFBb0RGLENBQUMsQ0FBQ3dMLElBQUYsQ0FBT3RMLENBQVAsQ0FBN0Q7QUFBd0UsT0FBOUcsQ0FBeEIsRUFBd0lzQixDQUEzSSxFQUE2STtBQUFDLFlBQUl0QixDQUFDLEdBQUMsRUFBTjtBQUFBLFlBQVNDLENBQUMsR0FBQyxFQUFYO0FBQUEsWUFBY3ZDLENBQUMsR0FBQyxFQUFoQjtBQUFtQm9DLFFBQUFBLENBQUMsQ0FBQ3BGLE9BQUYsQ0FBVW9GLENBQUMsSUFBRTtBQUFDQSxVQUFBQSxDQUFDLENBQUMxRSxPQUFGLENBQVUwTCxXQUFWLEdBQXNCaEgsQ0FBQyxDQUFDMUUsT0FBRixDQUFVK0wsU0FBVixHQUFvQmxILENBQUMsQ0FBQ3FMLElBQUYsQ0FBT3hMLENBQVAsQ0FBcEIsR0FBOEJwQyxDQUFDLENBQUM0TixJQUFGLENBQU94TCxDQUFQLENBQXBELEdBQThERSxDQUFDLENBQUNzTCxJQUFGLENBQU94TCxDQUFQLENBQTlELEVBQXdFQSxDQUFDLENBQUN3Z0IsTUFBRixHQUFTLENBQWpGLEVBQW1GLE1BQUl4Z0IsQ0FBQyxDQUFDc1IsV0FBTixJQUFtQnRSLENBQUMsQ0FBQzFFLE9BQUYsQ0FBVStMLFNBQTdCLElBQXdDcEgsQ0FBeEMsS0FBNENELENBQUMsQ0FBQzZQLFdBQUYsQ0FBY2YsY0FBZCxDQUE2QmxDLENBQTdCLEdBQWdDQSxDQUFDLENBQUMzSyxZQUFGLENBQWVoQyxDQUFDLENBQUNnWixvQkFBakIsQ0FBaEMsRUFBdUVqWixDQUFDLENBQUN3Z0IsTUFBRixHQUFTNVQsQ0FBQyxDQUFDbk0sQ0FBOUgsQ0FBbkY7QUFBb04sU0FBbE8sR0FBb09QLENBQUMsQ0FBQ2llLElBQUYsQ0FBTyxLQUFLb0MsVUFBWixDQUFwTyxFQUE0UHBnQixDQUFDLENBQUNnZSxJQUFGLENBQU8sS0FBS3NDLGVBQVosQ0FBNVAsRUFBeVI3aUIsQ0FBQyxDQUFDdWdCLElBQUYsQ0FBTyxLQUFLdUMsTUFBWixDQUF6UixFQUE2UzFnQixDQUFDLEdBQUNFLENBQUMsQ0FBQzBnQixNQUFGLENBQVN6Z0IsQ0FBVCxFQUFXdkMsQ0FBWCxDQUEvUztBQUE2VDs7QUFBQSxhQUFPb0MsQ0FBUDtBQUFTOztBQUFBVixJQUFBQSxNQUFNLENBQUM7QUFBQ0MsTUFBQUEsS0FBSyxFQUFDVyxDQUFQO0FBQVM2UixNQUFBQSxNQUFNLEVBQUM5UixDQUFoQjtBQUFrQmlFLE1BQUFBLE1BQU0sRUFBQ2xFLENBQUMsR0FBQyxJQUEzQjtBQUFnQ2hCLE1BQUFBLE1BQU0sRUFBQ3BCLENBQUMsR0FBQyxDQUFDLENBQTFDO0FBQTRDdWdCLE1BQUFBLElBQUksRUFBQzNkLENBQUMsR0FBQyxDQUFDLENBQXBEO0FBQXNENGQsTUFBQUEsV0FBVyxFQUFDdGQsQ0FBQyxHQUFDLENBQUMsQ0FBckU7QUFBdUVvYSxNQUFBQSxLQUFLLEVBQUMvYTtBQUE3RSxLQUFELEVBQWlGO0FBQUMsZUFBT0gsQ0FBUCxJQUFVLEtBQUtnVixlQUFMLElBQXVCLEtBQUttTCxXQUFMLENBQWlCLEtBQUs5aEIsS0FBTCxHQUFXLEtBQUt0RSxHQUFqQyxFQUFxQyxLQUFLdUUsTUFBTCxHQUFZLEtBQUt2RSxHQUF0RCxDQUFqQyxLQUE4RixLQUFLaWIsZUFBTCxDQUFxQmhWLENBQXJCLEdBQXdCLEtBQUttZ0IsV0FBTCxDQUFpQm5nQixDQUFDLENBQUMzQixLQUFuQixFQUF5QjJCLENBQUMsQ0FBQzFCLE1BQTNCLENBQXRILEdBQTBKLENBQUM2QixDQUFDLElBQUUsS0FBS21mLFNBQUwsSUFBaUIsQ0FBQyxDQUFELEtBQUtuZixDQUExQixNQUErQixDQUFDLEtBQUt5VSxLQUFOLElBQWE1VSxDQUFDLElBQUVBLENBQUMsQ0FBQzRVLEtBQWxCLEtBQTBCLEtBQUtuSyxNQUFMLENBQVksS0FBS3pRLEVBQUwsQ0FBUTBRLFVBQXBCLEdBQWdDLEtBQUtNLFlBQUwsQ0FBa0IsQ0FBQyxDQUFuQixDQUExRCxHQUFpRixLQUFLaFIsRUFBTCxDQUFRa2hCLEtBQVIsQ0FBYyxDQUFDLEtBQUt2RyxLQUFMLEdBQVcsS0FBSzNhLEVBQUwsQ0FBUTZtQixnQkFBbkIsR0FBb0MsQ0FBckMsS0FBeUMsS0FBS2pNLEtBQUwsR0FBVyxLQUFLNWEsRUFBTCxDQUFROG1CLGdCQUFuQixHQUFvQyxDQUE3RSxLQUFpRixLQUFLak0sT0FBTCxHQUFhLEtBQUs3YSxFQUFMLENBQVErbUIsa0JBQXJCLEdBQXdDLENBQXpILENBQWQsQ0FBaEgsQ0FBMUosRUFBc1puakIsQ0FBQyxJQUFFc0MsQ0FBQyxDQUFDcVEsaUJBQUYsRUFBelosRUFBK2F0USxDQUFDLElBQUUsU0FBT0EsQ0FBQyxDQUFDd1AsTUFBWixJQUFvQnhQLENBQUMsQ0FBQ3NRLGlCQUFGLEVBQW5jLEVBQXlkLEtBQUtvUSxhQUFMLENBQW1CO0FBQUNwaEIsUUFBQUEsS0FBSyxFQUFDVyxDQUFQO0FBQVM2UixRQUFBQSxNQUFNLEVBQUM5UixDQUFoQjtBQUFrQm1lLFFBQUFBLFdBQVcsRUFBQ3RkLENBQTlCO0FBQWdDcWQsUUFBQUEsSUFBSSxFQUFDM2Q7QUFBckMsT0FBbkIsRUFBNEQ1RixPQUE1RCxDQUFvRW9GLENBQUMsSUFBRTtBQUFDQSxRQUFBQSxDQUFDLENBQUM4RixJQUFGLENBQU87QUFBQ2lNLFVBQUFBLE1BQU0sRUFBQzlSO0FBQVIsU0FBUDtBQUFtQixPQUEzRixDQUF6ZDtBQUFzakI7O0FBQTMxTCxHQUF2M2hCLEVBQW90dEJELENBQUMsQ0FBQ2doQixJQUFGLEdBQU8sY0FBYzNlLENBQWQsQ0FBZTtBQUFDOUksSUFBQUEsV0FBVyxDQUFDeUcsQ0FBRCxFQUFHO0FBQUNpaEIsTUFBQUEsR0FBRyxFQUFDaGhCLENBQUw7QUFBT3BFLE1BQUFBLFFBQVEsRUFBQ3FFLENBQWhCO0FBQWtCNUUsTUFBQUEsT0FBTyxFQUFDNkUsQ0FBMUI7QUFBNEI0RixNQUFBQSxJQUFJLEVBQUNuSSxDQUFDLEdBQUNvQyxDQUFDLENBQUNnRztBQUFyQyxRQUFnRCxFQUFuRCxFQUFzRDtBQUFDLFlBQU1oRyxDQUFOLEVBQVE7QUFBQ25FLFFBQUFBLFFBQVEsRUFBQ3FFLENBQVY7QUFBWTVFLFFBQUFBLE9BQU8sRUFBQzZFLENBQXBCO0FBQXNCNEYsUUFBQUEsSUFBSSxFQUFDbkk7QUFBM0IsT0FBUixHQUF1QyxLQUFLc2pCLFdBQUwsQ0FBaUJqaEIsQ0FBakIsQ0FBdkMsRUFBMkQsS0FBS2toQixpQkFBTCxFQUEzRCxFQUFvRixLQUFLQyxVQUFMLEdBQWdCLEVBQXBHLEVBQXVHMVAsTUFBTSxDQUFDQyxNQUFQLENBQWMsS0FBS3JXLE9BQUwsQ0FBYUMsUUFBM0IsRUFBb0M7QUFBQzhsQixRQUFBQSxXQUFXLEVBQUM7QUFBQzVsQixVQUFBQSxLQUFLLEVBQUMsS0FBSzRsQjtBQUFaLFNBQWI7QUFBc0NDLFFBQUFBLGVBQWUsRUFBQztBQUFDN2xCLFVBQUFBLEtBQUssRUFBQyxLQUFLNmxCO0FBQVo7QUFBdEQsT0FBcEMsQ0FBdkc7QUFBZ087O0FBQUFKLElBQUFBLFdBQVcsQ0FBQ2xoQixDQUFELEVBQUc7QUFBQyxVQUFHLEtBQUt1aEIsSUFBTCxHQUFVLElBQUl6Z0IsQ0FBSixFQUFWLEVBQWdCLEtBQUswZ0IsS0FBTCxHQUFXLEVBQTNCLEVBQThCeGhCLENBQUMsQ0FBQ3doQixLQUFGLElBQVN4aEIsQ0FBQyxDQUFDd2hCLEtBQUYsQ0FBUXpqQixNQUFsRCxFQUF5RDtBQUFDLGFBQUksSUFBSWtDLENBQUMsR0FBQyxDQUFWLEVBQVlBLENBQUMsR0FBQ0QsQ0FBQyxDQUFDd2hCLEtBQUYsQ0FBUXpqQixNQUF0QixFQUE2QmtDLENBQUMsRUFBOUIsRUFBaUM7QUFBQyxjQUFJRSxDQUFDLEdBQUMsSUFBSVcsQ0FBSixFQUFOO0FBQVlYLFVBQUFBLENBQUMsQ0FBQ3BFLFFBQUYsQ0FBVzRHLFNBQVgsQ0FBcUIzQyxDQUFDLENBQUN5aEIsUUFBRixDQUFXMWxCLFFBQWhDLEVBQXlDLElBQUVrRSxDQUEzQyxHQUE4Q0UsQ0FBQyxDQUFDNFAsVUFBRixDQUFhcE4sU0FBYixDQUF1QjNDLENBQUMsQ0FBQ3loQixRQUFGLENBQVcxUixVQUFsQyxFQUE2QyxJQUFFOVAsQ0FBL0MsQ0FBOUMsRUFBZ0dFLENBQUMsQ0FBQzBCLEtBQUYsQ0FBUWMsU0FBUixDQUFrQjNDLENBQUMsQ0FBQ3loQixRQUFGLENBQVc1ZixLQUE3QixFQUFtQyxJQUFFNUIsQ0FBckMsQ0FBaEcsRUFBd0ksS0FBS3VoQixLQUFMLENBQVdoVyxJQUFYLENBQWdCckwsQ0FBaEIsQ0FBeEk7QUFBMko7O0FBQUFILFFBQUFBLENBQUMsQ0FBQ3doQixLQUFGLENBQVE1bUIsT0FBUixDQUFnQixDQUFDb0YsQ0FBRCxFQUFHQyxDQUFILEtBQU87QUFBQyxjQUFHLEtBQUt1aEIsS0FBTCxDQUFXdmhCLENBQVgsRUFBY29KLElBQWQsR0FBbUJySixDQUFDLENBQUNxSixJQUFyQixFQUEwQixDQUFDLENBQUQsS0FBS3JKLENBQUMsQ0FBQ3lQLE1BQXBDLEVBQTJDLE9BQU8sS0FBSytSLEtBQUwsQ0FBV3ZoQixDQUFYLEVBQWNpUSxTQUFkLENBQXdCLEtBQUtxUixJQUE3QixDQUFQO0FBQTBDLGVBQUtDLEtBQUwsQ0FBV3ZoQixDQUFYLEVBQWNpUSxTQUFkLENBQXdCLEtBQUtzUixLQUFMLENBQVd4aEIsQ0FBQyxDQUFDeVAsTUFBYixDQUF4QjtBQUE4QyxTQUEzSixHQUE2SixLQUFLOFIsSUFBTCxDQUFVaFIsaUJBQVYsQ0FBNEIsQ0FBQyxDQUE3QixDQUE3SixFQUE2TCxLQUFLaVIsS0FBTCxDQUFXNW1CLE9BQVgsQ0FBbUJvRixDQUFDLElBQUU7QUFBQ0EsVUFBQUEsQ0FBQyxDQUFDMGhCLFdBQUYsR0FBYyxJQUFJeGhCLENBQUosQ0FBTSxHQUFHRixDQUFDLENBQUM2UCxXQUFYLEVBQXdCMU8sT0FBeEIsRUFBZDtBQUFnRCxTQUF2RSxDQUE3TDtBQUFzUTtBQUFDOztBQUFBZ2dCLElBQUFBLGlCQUFpQixHQUFFO0FBQUMsVUFBRyxDQUFDLEtBQUtLLEtBQUwsQ0FBV3pqQixNQUFmLEVBQXNCO0FBQU8sVUFBSWlDLENBQUMsR0FBQ25CLElBQUksQ0FBQ0MsR0FBTCxDQUFTLENBQVQsRUFBV0QsSUFBSSxDQUFDeWMsR0FBTCxDQUFTLENBQVQsRUFBV3pjLElBQUksQ0FBQzBjLElBQUwsQ0FBVTFjLElBQUksQ0FBQzJjLEdBQUwsQ0FBUzNjLElBQUksQ0FBQ3VCLElBQUwsQ0FBVSxJQUFFLEtBQUtvaEIsS0FBTCxDQUFXempCLE1BQXZCLENBQVQsSUFBeUNjLElBQUksQ0FBQzRjLEdBQXhELENBQVgsQ0FBWCxDQUFOO0FBQTJGLFdBQUtrRyxZQUFMLEdBQWtCLElBQUl6bEIsWUFBSixDQUFpQjhELENBQUMsR0FBQ0EsQ0FBRixHQUFJLENBQXJCLENBQWxCLEVBQTBDLEtBQUtzaEIsZUFBTCxHQUFxQnRoQixDQUEvRCxFQUFpRSxLQUFLcWhCLFdBQUwsR0FBaUIsSUFBSS9lLENBQUosQ0FBTSxLQUFLdEksRUFBWCxFQUFjO0FBQUM2QyxRQUFBQSxLQUFLLEVBQUMsS0FBSzhrQixZQUFaO0FBQXlCN08sUUFBQUEsZUFBZSxFQUFDLENBQUMsQ0FBMUM7QUFBNENqUCxRQUFBQSxJQUFJLEVBQUMsS0FBSzdKLEVBQUwsQ0FBUThKLEtBQXpEO0FBQStENE8sUUFBQUEsY0FBYyxFQUFDLEtBQUsxWSxFQUFMLENBQVFILFFBQVIsQ0FBaUJ1YSxRQUFqQixHQUEwQixLQUFLcGEsRUFBTCxDQUFRMGdCLE9BQWxDLEdBQTBDLEtBQUsxZ0IsRUFBTCxDQUFReVksSUFBaEk7QUFBcUlTLFFBQUFBLEtBQUssRUFBQyxDQUFDLENBQTVJO0FBQThJN1UsUUFBQUEsS0FBSyxFQUFDMkI7QUFBcEosT0FBZCxDQUFsRjtBQUF3UDs7QUFBQTRoQixJQUFBQSxZQUFZLENBQUMzaEIsQ0FBRCxFQUFHO0FBQUMsVUFBSUQsQ0FBQyxHQUFDLElBQUl5SCxDQUFKLENBQU07QUFBQzZRLFFBQUFBLE9BQU8sRUFBQyxLQUFLa0osS0FBZDtBQUFvQnZsQixRQUFBQSxJQUFJLEVBQUNnRTtBQUF6QixPQUFOLENBQU47QUFBeUMsYUFBTyxLQUFLbWhCLFVBQUwsQ0FBZ0I1VixJQUFoQixDQUFxQnhMLENBQXJCLEdBQXdCQSxDQUEvQjtBQUFpQzs7QUFBQWhCLElBQUFBLE1BQU0sR0FBRTtBQUFDLFVBQUlnQixDQUFDLEdBQUMsQ0FBTjtBQUFRLFdBQUtvaEIsVUFBTCxDQUFnQnhtQixPQUFoQixDQUF3QnFGLENBQUMsSUFBRUQsQ0FBQyxJQUFFQyxDQUFDLENBQUN1WSxNQUFoQyxHQUF3QyxLQUFLNEksVUFBTCxDQUFnQnhtQixPQUFoQixDQUF3QixDQUFDcUYsQ0FBRCxFQUFHQyxDQUFILEtBQU87QUFBQ0QsUUFBQUEsQ0FBQyxDQUFDakIsTUFBRixDQUFTZ0IsQ0FBVCxFQUFXLE1BQUlFLENBQWY7QUFBa0IsT0FBbEQsQ0FBeEM7QUFBNEY7O0FBQUE0RixJQUFBQSxJQUFJLENBQUM7QUFBQ2lNLE1BQUFBLE1BQU0sRUFBQy9SO0FBQVIsUUFBVyxFQUFaLEVBQWU7QUFBQyxXQUFLdWhCLElBQUwsQ0FBVWhSLGlCQUFWLENBQTRCLENBQUMsQ0FBN0IsR0FBZ0MsS0FBS2lSLEtBQUwsQ0FBVzVtQixPQUFYLENBQW1CLENBQUNvRixDQUFELEVBQUdDLENBQUgsS0FBTztBQUFDMlksUUFBQUEsRUFBRSxDQUFDM1gsUUFBSCxDQUFZakIsQ0FBQyxDQUFDNlAsV0FBZCxFQUEwQjdQLENBQUMsQ0FBQzBoQixXQUE1QixHQUF5QyxLQUFLQyxZQUFMLENBQWtCdmpCLEdBQWxCLENBQXNCd2EsRUFBdEIsRUFBeUIsS0FBRzNZLENBQTVCLENBQXpDO0FBQXdFLE9BQW5HLENBQWhDLEVBQXFJLEtBQUtvaEIsV0FBTCxLQUFtQixLQUFLQSxXQUFMLENBQWlCdGlCLFdBQWpCLEdBQTZCLENBQUMsQ0FBakQsQ0FBckksRUFBeUwsTUFBTStHLElBQU4sQ0FBVztBQUFDaU0sUUFBQUEsTUFBTSxFQUFDL1I7QUFBUixPQUFYLENBQXpMO0FBQWdOOztBQUEzbUQsR0FBMXV0QixFQUF1MXdCQSxDQUFDLENBQUM2aEIsTUFBRixHQUFTLGNBQWNyaEIsQ0FBZCxDQUFlO0FBQUNqSCxJQUFBQSxXQUFXLENBQUN3TixDQUFELEVBQUc7QUFBQ1AsTUFBQUEsTUFBTSxFQUFDakUsQ0FBQyxHQUFDLEVBQVY7QUFBYXVVLE1BQUFBLGFBQWEsRUFBQ3pXLENBQUMsR0FBQyxFQUE3QjtBQUFnQzBXLE1BQUFBLGNBQWMsRUFBQ3hMLENBQUMsR0FBQzFNLElBQUksQ0FBQzBjLElBQUwsQ0FBVSxLQUFHbGIsQ0FBYixDQUFqRDtBQUFpRXloQixNQUFBQSxRQUFRLEVBQUN2WixDQUFDLEdBQUMsQ0FBNUU7QUFBOEV3WixNQUFBQSxTQUFTLEVBQUNwVixDQUFDLEdBQUMsSUFBRTlOLElBQUksQ0FBQzhCLEVBQWpHO0FBQW9HcWhCLE1BQUFBLFVBQVUsRUFBQzFXLENBQUMsR0FBQyxDQUFqSDtBQUFtSDJXLE1BQUFBLFdBQVcsRUFBQ3JWLENBQUMsR0FBQy9OLElBQUksQ0FBQzhCLEVBQXRJO0FBQXlJc0MsTUFBQUEsVUFBVSxFQUFDM0MsQ0FBQyxHQUFDO0FBQXRKLFFBQTBKLEVBQTdKLEVBQWdLO0FBQUMsVUFBSWtCLENBQUMsR0FBQ25CLENBQU47QUFBQSxVQUFRRyxDQUFDLEdBQUMrSyxDQUFWO0FBQUEsVUFBWWhMLENBQUMsR0FBQ2dJLENBQWQ7QUFBQSxVQUFnQnZLLENBQUMsR0FBQzJPLENBQWxCO0FBQUEsVUFBb0JsTCxDQUFDLEdBQUM2SixDQUF0QjtBQUFBLFVBQXdCMUosQ0FBQyxHQUFDZ0wsQ0FBMUI7QUFBQSxVQUE0QnhLLENBQUMsR0FBQyxDQUFDWixDQUFDLEdBQUMsQ0FBSCxLQUFPaEIsQ0FBQyxHQUFDLENBQVQsQ0FBOUI7QUFBQSxVQUEwQ3RDLENBQUMsR0FBQ3NELENBQUMsR0FBQ2hCLENBQUYsR0FBSSxDQUFoRDtBQUFBLFVBQWtEZ0MsQ0FBQyxHQUFDLElBQUl0RyxZQUFKLENBQWlCLElBQUVrRyxDQUFuQixDQUFwRDtBQUFBLFVBQTBFQyxDQUFDLEdBQUMsSUFBSW5HLFlBQUosQ0FBaUIsSUFBRWtHLENBQW5CLENBQTVFO0FBQUEsVUFBa0dELENBQUMsR0FBQyxJQUFJakcsWUFBSixDQUFpQixJQUFFa0csQ0FBbkIsQ0FBcEc7QUFBQSxVQUEwSHhFLENBQUMsR0FBQ3dFLENBQUMsR0FBQyxLQUFGLEdBQVEsSUFBSTRVLFdBQUosQ0FBZ0I5WSxDQUFoQixDQUFSLEdBQTJCLElBQUk2RixXQUFKLENBQWdCN0YsQ0FBaEIsQ0FBdko7QUFBQSxVQUEwSzhCLENBQUMsR0FBQyxDQUE1SztBQUFBLFVBQThLNk0sQ0FBQyxHQUFDLENBQWhMO0FBQUEsVUFBa0wzTSxDQUFDLEdBQUMsQ0FBcEw7QUFBQSxVQUFzTDRNLENBQUMsR0FBQ3JMLENBQUMsR0FBQ0csQ0FBMUw7QUFBQSxVQUE0TEwsQ0FBQyxHQUFDLEVBQTlMO0FBQUEsVUFBaU13TCxDQUFDLEdBQUMsSUFBSTlNLENBQUosRUFBbk07O0FBQXlNLFdBQUksSUFBSXNILENBQUMsR0FBQyxDQUFWLEVBQVlBLENBQUMsSUFBRS9HLENBQWYsRUFBaUIrRyxDQUFDLEVBQWxCLEVBQXFCO0FBQUMsWUFBSTlHLENBQUMsR0FBQyxFQUFOO0FBQUEsWUFBUzZCLENBQUMsR0FBQ2lGLENBQUMsR0FBQy9HLENBQWI7O0FBQWUsYUFBSSxJQUFJaUgsQ0FBQyxHQUFDLENBQVYsRUFBWUEsQ0FBQyxJQUFFakcsQ0FBZixFQUFpQmlHLENBQUMsSUFBR3pILENBQUMsRUFBdEIsRUFBeUI7QUFBQyxjQUFJZixDQUFDLEdBQUN3SSxDQUFDLEdBQUNqRyxDQUFSO0FBQUEsY0FBVWQsQ0FBQyxHQUFDLENBQUM2QixDQUFELEdBQUcxRCxJQUFJLENBQUN3TyxHQUFMLENBQVM5TSxDQUFDLEdBQUN0QixDQUFDLEdBQUNqQixDQUFiLENBQUgsR0FBbUJhLElBQUksQ0FBQ3VPLEdBQUwsQ0FBUzNMLENBQUMsR0FBQ2EsQ0FBQyxHQUFDVixDQUFiLENBQS9CO0FBQUEsY0FBK0NrQixDQUFDLEdBQUNQLENBQUMsR0FBQzFELElBQUksQ0FBQ3dPLEdBQUwsQ0FBUzVMLENBQUMsR0FBQ2EsQ0FBQyxHQUFDVixDQUFiLENBQW5EO0FBQUEsY0FBbUVtQixDQUFDLEdBQUNSLENBQUMsR0FBQzFELElBQUksQ0FBQ3VPLEdBQUwsQ0FBUzdNLENBQUMsR0FBQ3RCLENBQUMsR0FBQ2pCLENBQWIsQ0FBRixHQUFrQmEsSUFBSSxDQUFDdU8sR0FBTCxDQUFTM0wsQ0FBQyxHQUFDYSxDQUFDLEdBQUNWLENBQWIsQ0FBdkY7QUFBdUdZLFVBQUFBLENBQUMsQ0FBQyxJQUFFeEMsQ0FBSCxDQUFELEdBQU9VLENBQVAsRUFBUzhCLENBQUMsQ0FBQyxJQUFFeEMsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTOEMsQ0FBbEIsRUFBb0JOLENBQUMsQ0FBQyxJQUFFeEMsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTK0MsQ0FBN0IsRUFBK0JnSyxDQUFDLENBQUMzTyxHQUFGLENBQU1zQyxDQUFOLEVBQVFvQyxDQUFSLEVBQVVDLENBQVYsRUFBYWpCLFNBQWIsRUFBL0IsRUFBd0RPLENBQUMsQ0FBQyxJQUFFckMsQ0FBSCxDQUFELEdBQU8rTSxDQUFDLENBQUMvTyxDQUFqRSxFQUFtRXFFLENBQUMsQ0FBQyxJQUFFckMsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTK00sQ0FBQyxDQUFDN08sQ0FBOUUsRUFBZ0ZtRSxDQUFDLENBQUMsSUFBRXJDLENBQUYsR0FBSSxDQUFMLENBQUQsR0FBUytNLENBQUMsQ0FBQ3RNLENBQTNGLEVBQTZGMEIsQ0FBQyxDQUFDLElBQUVuQyxDQUFILENBQUQsR0FBT2YsQ0FBcEcsRUFBc0drRCxDQUFDLENBQUMsSUFBRW5DLENBQUYsR0FBSSxDQUFMLENBQUQsR0FBUyxJQUFFc0MsQ0FBakgsRUFBbUg3QixDQUFDLENBQUMrSyxJQUFGLENBQU9xQixDQUFDLEVBQVIsQ0FBbkg7QUFBK0g7O0FBQUF0TCxRQUFBQSxDQUFDLENBQUNpSyxJQUFGLENBQU8vSyxDQUFQO0FBQVU7O0FBQUEsV0FBSSxJQUFJTixDQUFDLEdBQUMsQ0FBVixFQUFZQSxDQUFDLEdBQUNLLENBQWQsRUFBZ0JMLENBQUMsRUFBakIsRUFBb0IsS0FBSSxJQUFJVyxDQUFDLEdBQUMsQ0FBVixFQUFZQSxDQUFDLEdBQUNVLENBQWQsRUFBZ0JWLENBQUMsRUFBakIsRUFBb0I7QUFBQyxZQUFJa00sQ0FBQyxHQUFDekwsQ0FBQyxDQUFDcEIsQ0FBRCxDQUFELENBQUtXLENBQUMsR0FBQyxDQUFQLENBQU47QUFBQSxZQUFnQmtDLENBQUMsR0FBQ3pCLENBQUMsQ0FBQ3BCLENBQUQsQ0FBRCxDQUFLVyxDQUFMLENBQWxCO0FBQUEsWUFBMEJnTixDQUFDLEdBQUN2TSxDQUFDLENBQUNwQixDQUFDLEdBQUMsQ0FBSCxDQUFELENBQU9XLENBQVAsQ0FBNUI7QUFBQSxZQUFzQ2dHLENBQUMsR0FBQ3ZGLENBQUMsQ0FBQ3BCLENBQUMsR0FBQyxDQUFILENBQUQsQ0FBT1csQ0FBQyxHQUFDLENBQVQsQ0FBeEM7QUFBb0QsU0FBQyxNQUFJWCxDQUFKLElBQU9zQixDQUFDLEdBQUMsQ0FBVixNQUFlN0QsQ0FBQyxDQUFDLElBQUVzQyxDQUFILENBQUQsR0FBTzhNLENBQVAsRUFBU3BQLENBQUMsQ0FBQyxJQUFFc0MsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTOEMsQ0FBbEIsRUFBb0JwRixDQUFDLENBQUMsSUFBRXNDLENBQUYsR0FBSSxDQUFMLENBQUQsR0FBUzRHLENBQTdCLEVBQStCNUcsQ0FBQyxFQUEvQyxHQUFtRCxDQUFDQyxDQUFDLEtBQUdLLENBQUMsR0FBQyxDQUFOLElBQVNzTSxDQUFDLEdBQUNqTyxJQUFJLENBQUM4QixFQUFqQixNQUF1Qi9DLENBQUMsQ0FBQyxJQUFFc0MsQ0FBSCxDQUFELEdBQU84QyxDQUFQLEVBQVNwRixDQUFDLENBQUMsSUFBRXNDLENBQUYsR0FBSSxDQUFMLENBQUQsR0FBUzROLENBQWxCLEVBQW9CbFEsQ0FBQyxDQUFDLElBQUVzQyxDQUFGLEdBQUksQ0FBTCxDQUFELEdBQVM0RyxDQUE3QixFQUErQjVHLENBQUMsRUFBdkQsQ0FBbkQ7QUFBOEc7O0FBQUF3UixNQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBY3JSLENBQWQsRUFBZ0I7QUFBQ3ZFLFFBQUFBLFFBQVEsRUFBQztBQUFDQyxVQUFBQSxJQUFJLEVBQUMsQ0FBTjtBQUFRQyxVQUFBQSxJQUFJLEVBQUN1RztBQUFiLFNBQVY7QUFBMEIwVSxRQUFBQSxNQUFNLEVBQUM7QUFBQ2xiLFVBQUFBLElBQUksRUFBQyxDQUFOO0FBQVFDLFVBQUFBLElBQUksRUFBQ29HO0FBQWIsU0FBakM7QUFBaURsRyxRQUFBQSxFQUFFLEVBQUM7QUFBQ0gsVUFBQUEsSUFBSSxFQUFDLENBQU47QUFBUUMsVUFBQUEsSUFBSSxFQUFDa0c7QUFBYixTQUFwRDtBQUFvRTJDLFFBQUFBLEtBQUssRUFBQztBQUFDN0ksVUFBQUEsSUFBSSxFQUFDMkI7QUFBTjtBQUExRSxPQUFoQixHQUFxRyxNQUFNbUosQ0FBTixFQUFRekcsQ0FBUixDQUFyRztBQUFnSDs7QUFBaCtCLEdBQS8yd0IsRUFBaTF5Qk4sQ0FBQyxDQUFDa2lCLElBQUYsR0FBTyxVQUFTO0FBQUNDLElBQUFBLElBQUksRUFBQ25pQixDQUFOO0FBQVFvaUIsSUFBQUEsSUFBSSxFQUFDamlCLENBQWI7QUFBZTlCLElBQUFBLEtBQUssRUFBQ1QsQ0FBQyxHQUFDLElBQUUsQ0FBekI7QUFBMkJ5a0IsSUFBQUEsS0FBSyxFQUFDN2hCLENBQUMsR0FBQyxNQUFuQztBQUEwQ3hFLElBQUFBLElBQUksRUFBQzhFLENBQUMsR0FBQyxDQUFqRDtBQUFtRHdoQixJQUFBQSxhQUFhLEVBQUM5Z0IsQ0FBQyxHQUFDLENBQW5FO0FBQXFFK2dCLElBQUFBLFVBQVUsRUFBQzlnQixDQUFDLEdBQUMsR0FBbEY7QUFBc0YrZ0IsSUFBQUEsV0FBVyxFQUFDamhCLENBQUMsR0FBQyxDQUFwRztBQUFzR2toQixJQUFBQSxTQUFTLEVBQUM3Z0IsQ0FBQyxHQUFDLENBQUM7QUFBbkgsR0FBVCxFQUErSDtBQUFDLFFBQUlRLENBQUMsR0FBQyxJQUFOO0FBQUEsUUFBV25DLENBQVg7QUFBQSxRQUFhdUMsQ0FBYjtBQUFBLFFBQWVILENBQWY7QUFBQSxRQUFpQkMsQ0FBakI7QUFBQSxRQUFtQkMsQ0FBbkI7QUFBQSxRQUFxQkosQ0FBQyxHQUFDLElBQXZCO0FBQUEsUUFBNEJvRixDQUFDLEdBQUMsSUFBOUI7O0FBQW1DLGFBQVNySCxDQUFULEdBQVk7QUFBQ21DLE1BQUFBLENBQUMsR0FBQ3JDLENBQUMsQ0FBQzBpQixNQUFGLENBQVNILFVBQVgsRUFBc0JqZ0IsQ0FBQyxHQUFDdEMsQ0FBQyxDQUFDMGlCLE1BQUYsQ0FBU0MsSUFBakMsRUFBc0NwZ0IsQ0FBQyxHQUFDekIsQ0FBQyxHQUFDd0IsQ0FBMUM7QUFBNEMsVUFBSXBDLENBQUMsR0FBQ0MsQ0FBQyxDQUFDeWlCLE9BQUYsQ0FBVSxRQUFWLEVBQW1CLEVBQW5CLEVBQXVCN2tCLE1BQTdCO0FBQW9DeUUsTUFBQUEsQ0FBQyxHQUFDO0FBQUN6RyxRQUFBQSxRQUFRLEVBQUMsSUFBSUcsWUFBSixDQUFpQixJQUFFZ0UsQ0FBRixHQUFJLENBQXJCLENBQVY7QUFBa0MvRCxRQUFBQSxFQUFFLEVBQUMsSUFBSUQsWUFBSixDQUFpQixJQUFFZ0UsQ0FBRixHQUFJLENBQXJCLENBQXJDO0FBQTZEZ0QsUUFBQUEsRUFBRSxFQUFDLElBQUloSCxZQUFKLENBQWlCLElBQUVnRSxDQUFuQixDQUFoRTtBQUFzRjRFLFFBQUFBLEtBQUssRUFBQyxJQUFJZixXQUFKLENBQWdCLElBQUU3RCxDQUFsQjtBQUE1RixPQUFGOztBQUFvSCxXQUFJLElBQUlELENBQUMsR0FBQyxDQUFWLEVBQVlBLENBQUMsR0FBQ0MsQ0FBZCxFQUFnQkQsQ0FBQyxFQUFqQixFQUFvQnVDLENBQUMsQ0FBQ1UsRUFBRixDQUFLakQsQ0FBTCxJQUFRQSxDQUFSLEVBQVV1QyxDQUFDLENBQUNzQyxLQUFGLENBQVExRyxHQUFSLENBQVksQ0FBQyxJQUFFNkIsQ0FBSCxFQUFLLElBQUVBLENBQUYsR0FBSSxDQUFULEVBQVcsSUFBRUEsQ0FBRixHQUFJLENBQWYsRUFBaUIsSUFBRUEsQ0FBRixHQUFJLENBQXJCLEVBQXVCLElBQUVBLENBQUYsR0FBSSxDQUEzQixFQUE2QixJQUFFQSxDQUFGLEdBQUksQ0FBakMsQ0FBWixFQUFnRCxJQUFFQSxDQUFsRCxDQUFWOztBQUErRHdILE1BQUFBLENBQUM7QUFBRzs7QUFBQSxhQUFTQSxDQUFULEdBQVk7QUFBQyxVQUFJdkosQ0FBQyxHQUFDLEVBQU47QUFBQSxVQUFTbUUsQ0FBQyxHQUFDLENBQVg7QUFBQSxVQUFhaEMsQ0FBQyxHQUFDLENBQWY7QUFBQSxVQUFpQmlDLENBQUMsR0FBQyxDQUFuQjtBQUFBLFVBQXFCcEMsQ0FBQyxHQUFDSyxDQUFDLEVBQXhCOztBQUEyQixlQUFTQSxDQUFULEdBQVk7QUFBQyxZQUFJUCxDQUFDLEdBQUM7QUFBQzNCLFVBQUFBLEtBQUssRUFBQyxDQUFQO0FBQVN3a0IsVUFBQUEsTUFBTSxFQUFDO0FBQWhCLFNBQU47QUFBMEIsZUFBTzNrQixDQUFDLENBQUNzTixJQUFGLENBQU94TCxDQUFQLEdBQVVLLENBQUMsR0FBQ2dDLENBQVosRUFBY0MsQ0FBQyxHQUFDLENBQWhCLEVBQWtCdEMsQ0FBekI7QUFBMkI7O0FBQUEsVUFBSVMsQ0FBQyxHQUFDLENBQU47O0FBQVEsYUFBSzRCLENBQUMsR0FBQ2xDLENBQUMsQ0FBQ3BDLE1BQUosSUFBWTBDLENBQUMsR0FBQyxHQUFuQixHQUF3QjtBQUFDQSxRQUFBQSxDQUFDO0FBQUcsWUFBSUgsQ0FBQyxHQUFDSCxDQUFDLENBQUNrQyxDQUFELENBQVA7O0FBQVcsWUFBRyxDQUFDbkMsQ0FBQyxDQUFDN0IsS0FBSCxJQUFVa0osQ0FBQyxDQUFDdWIsSUFBRixDQUFPeGlCLENBQVAsQ0FBYixFQUF1QjtBQUFDRCxVQUFBQSxDQUFDLEdBQUMsRUFBRWdDLENBQUosRUFBTUMsQ0FBQyxHQUFDLENBQVI7QUFBVTtBQUFTOztBQUFBLFlBQUdILENBQUMsQ0FBQzJnQixJQUFGLENBQU94aUIsQ0FBUCxDQUFILEVBQWE7QUFBQytCLFVBQUFBLENBQUMsSUFBR25DLENBQUMsR0FBQ0ssQ0FBQyxFQUFQO0FBQVU7QUFBUzs7QUFBQSxZQUFJdkMsQ0FBQyxHQUFDaUMsQ0FBQyxDQUFDSyxDQUFELENBQVA7O0FBQVcsWUFBR0osQ0FBQyxDQUFDMmlCLE1BQUYsQ0FBUzlrQixNQUFaLEVBQW1CO0FBQUMsY0FBSWdGLENBQUMsR0FBQzdDLENBQUMsQ0FBQzJpQixNQUFGLENBQVMzaUIsQ0FBQyxDQUFDMmlCLE1BQUYsQ0FBUzlrQixNQUFULEdBQWdCLENBQXpCLEVBQTRCLENBQTVCLENBQU47QUFBQSxjQUFxQzJDLENBQUMsR0FBQ3pCLENBQUMsQ0FBQ2pCLENBQUMsQ0FBQ2tGLEVBQUgsRUFBTUgsQ0FBQyxDQUFDRyxFQUFSLENBQUQsR0FBYVgsQ0FBcEQ7QUFBc0RyQyxVQUFBQSxDQUFDLENBQUM3QixLQUFGLElBQVNxQyxDQUFULEVBQVc0QixDQUFDLElBQUU1QixDQUFkO0FBQWdCOztBQUFBUixRQUFBQSxDQUFDLENBQUMyaUIsTUFBRixDQUFTclgsSUFBVCxDQUFjLENBQUN4TixDQUFELEVBQUdrQyxDQUFDLENBQUM3QixLQUFMLENBQWQ7QUFBMkIsWUFBSW9KLENBQUMsR0FBQyxDQUFOOztBQUFRLFlBQUdGLENBQUMsQ0FBQ3ViLElBQUYsQ0FBT3hpQixDQUFQLEtBQVdELENBQUMsR0FBQ2dDLENBQUYsRUFBSUMsQ0FBQyxHQUFDLENBQU4sRUFBUW1GLENBQUMsSUFBRWxHLENBQUMsR0FBQ1QsQ0FBeEIsSUFBMkIyRyxDQUFDLElBQUVqRyxDQUFDLEdBQUNWLENBQWhDLEVBQWtDMkcsQ0FBQyxJQUFFekosQ0FBQyxDQUFDK2tCLFFBQUYsR0FBV3hnQixDQUFoRCxFQUFrRHJDLENBQUMsQ0FBQzdCLEtBQUYsSUFBU29KLENBQTNELEVBQTZEbkYsQ0FBQyxJQUFFbUYsQ0FBaEUsRUFBa0V2SCxDQUFDLENBQUM3QixLQUFGLEdBQVFULENBQTdFLEVBQStFO0FBQUMsY0FBR2dFLENBQUMsSUFBRTFCLENBQUMsQ0FBQzJpQixNQUFGLENBQVM5a0IsTUFBVCxHQUFnQixDQUF0QixFQUF3QjtBQUFDbUMsWUFBQUEsQ0FBQyxDQUFDN0IsS0FBRixJQUFTb0osQ0FBVCxFQUFXdkgsQ0FBQyxDQUFDMmlCLE1BQUYsQ0FBU0csR0FBVCxFQUFYLEVBQTBCOWlCLENBQUMsR0FBQ0ssQ0FBQyxFQUE3QjtBQUFnQztBQUFTOztBQUFBLGNBQUcsQ0FBQ3FCLENBQUQsSUFBSVUsQ0FBQyxLQUFHcEMsQ0FBQyxDQUFDN0IsS0FBYixFQUFtQjtBQUFDLGdCQUFJeUUsQ0FBQyxHQUFDVCxDQUFDLEdBQUNoQyxDQUFGLEdBQUksQ0FBVjtBQUFZSCxZQUFBQSxDQUFDLENBQUMyaUIsTUFBRixDQUFTdlMsTUFBVCxDQUFnQixDQUFDeE4sQ0FBakIsRUFBbUJBLENBQW5CLEdBQXNCVCxDQUFDLEdBQUNoQyxDQUF4QixFQUEwQkgsQ0FBQyxDQUFDN0IsS0FBRixJQUFTaUUsQ0FBbkMsRUFBcUNwQyxDQUFDLEdBQUNLLENBQUMsRUFBeEM7QUFBMkM7QUFBUztBQUFDOztBQUFBOEIsUUFBQUEsQ0FBQztBQUFHOztBQUFBbkMsTUFBQUEsQ0FBQyxDQUFDN0IsS0FBRixJQUFTSCxDQUFDLENBQUM4a0IsR0FBRixFQUFULEVBQWlCLFVBQVMzZ0IsQ0FBVCxFQUFXO0FBQUMsWUFBSW9GLENBQUMsR0FBQ3pILENBQUMsQ0FBQzBpQixNQUFGLENBQVNPLE1BQWY7QUFBQSxZQUFzQmhrQixDQUFDLEdBQUNlLENBQUMsQ0FBQzBpQixNQUFGLENBQVNRLE1BQWpDO0FBQUEsWUFBd0NoakIsQ0FBQyxHQUFDLE1BQUlZLENBQTlDO0FBQUEsWUFBZ0R3QixDQUFDLEdBQUMsQ0FBbEQ7O0FBQW9ELGFBQUksSUFBSUgsQ0FBQyxHQUFDLENBQVYsRUFBWUEsQ0FBQyxHQUFDRSxDQUFDLENBQUN0RSxNQUFoQixFQUF1Qm9FLENBQUMsRUFBeEIsRUFBMkI7QUFBQyxjQUFJdkUsQ0FBQyxHQUFDeUUsQ0FBQyxDQUFDRixDQUFELENBQVA7O0FBQVcsZUFBSSxJQUFJWCxDQUFDLEdBQUMsQ0FBVixFQUFZQSxDQUFDLEdBQUM1RCxDQUFDLENBQUNpbEIsTUFBRixDQUFTOWtCLE1BQXZCLEVBQThCeUQsQ0FBQyxFQUEvQixFQUFrQztBQUFDLGdCQUFJdkIsQ0FBQyxHQUFDckMsQ0FBQyxDQUFDaWxCLE1BQUYsQ0FBU3JoQixDQUFULEVBQVksQ0FBWixDQUFOO0FBQUEsZ0JBQXFCckIsQ0FBQyxHQUFDdkMsQ0FBQyxDQUFDaWxCLE1BQUYsQ0FBU3JoQixDQUFULEVBQVksQ0FBWixDQUF2QjtBQUFzQyxnQkFBRyxhQUFXaEIsQ0FBWCxHQUFhTCxDQUFDLElBQUUsS0FBR3ZDLENBQUMsQ0FBQ1MsS0FBckIsR0FBMkIsWUFBVW1DLENBQVYsS0FBY0wsQ0FBQyxJQUFFdkMsQ0FBQyxDQUFDUyxLQUFuQixDQUEzQixFQUFxRGtKLENBQUMsQ0FBQ3ViLElBQUYsQ0FBTzdpQixDQUFDLENBQUNrakIsSUFBVCxDQUF4RCxFQUF1RTtBQUFTaGpCLFlBQUFBLENBQUMsSUFBRUYsQ0FBQyxDQUFDbWpCLE9BQUYsR0FBVTdnQixDQUFiLEVBQWVyQyxDQUFDLElBQUVELENBQUMsQ0FBQ29qQixPQUFGLEdBQVU5Z0IsQ0FBNUI7QUFBOEIsZ0JBQUlsQyxDQUFDLEdBQUNKLENBQUMsQ0FBQzVCLEtBQUYsR0FBUWtFLENBQWQ7QUFBQSxnQkFBZ0JqQyxDQUFDLEdBQUNMLENBQUMsQ0FBQzNCLE1BQUYsR0FBU2lFLENBQTNCO0FBQTZCQyxZQUFBQSxDQUFDLENBQUN6RyxRQUFGLENBQVdxQyxHQUFYLENBQWUsQ0FBQytCLENBQUQsRUFBR0QsQ0FBQyxHQUFDSSxDQUFMLEVBQU8sQ0FBUCxFQUFTSCxDQUFULEVBQVdELENBQVgsRUFBYSxDQUFiLEVBQWVDLENBQUMsR0FBQ0UsQ0FBakIsRUFBbUJILENBQUMsR0FBQ0ksQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUJILENBQUMsR0FBQ0UsQ0FBM0IsRUFBNkJILENBQTdCLEVBQStCLENBQS9CLENBQWYsRUFBaUQsSUFBRW9DLENBQUYsR0FBSSxDQUFyRDtBQUF3RCxnQkFBSWYsQ0FBQyxHQUFDdEIsQ0FBQyxDQUFDakMsQ0FBRixHQUFJeUosQ0FBVjtBQUFBLGdCQUFZbEgsQ0FBQyxHQUFDTixDQUFDLENBQUM1QixLQUFGLEdBQVFvSixDQUF0QjtBQUFBLGdCQUF3QjdGLENBQUMsR0FBQyxJQUFFM0IsQ0FBQyxDQUFDL0IsQ0FBRixHQUFJZSxDQUFoQztBQUFBLGdCQUFrQ2pCLENBQUMsR0FBQ2lDLENBQUMsQ0FBQzNCLE1BQUYsR0FBU1csQ0FBN0M7QUFBK0N1RCxZQUFBQSxDQUFDLENBQUNyRyxFQUFGLENBQUtpQyxHQUFMLENBQVMsQ0FBQ21ELENBQUQsRUFBR0ssQ0FBQyxHQUFDNUQsQ0FBTCxFQUFPdUQsQ0FBUCxFQUFTSyxDQUFULEVBQVdMLENBQUMsR0FBQ2hCLENBQWIsRUFBZXFCLENBQUMsR0FBQzVELENBQWpCLEVBQW1CdUQsQ0FBQyxHQUFDaEIsQ0FBckIsRUFBdUJxQixDQUF2QixDQUFULEVBQW1DLElBQUVVLENBQUYsR0FBSSxDQUF2QyxHQUEwQ3BDLENBQUMsSUFBRUQsQ0FBQyxDQUFDb2pCLE9BQUYsR0FBVTlnQixDQUF2RCxFQUF5REQsQ0FBQyxFQUExRDtBQUE2RDs7QUFBQXBDLFVBQUFBLENBQUMsSUFBRVksQ0FBQyxHQUFDVyxDQUFMO0FBQU87O0FBQUFXLFFBQUFBLENBQUMsQ0FBQ2toQixPQUFGLEdBQVU5Z0IsQ0FBVixFQUFZSixDQUFDLENBQUNtaEIsUUFBRixHQUFXbGhCLENBQUMsQ0FBQ3RFLE1BQXpCLEVBQWdDcUUsQ0FBQyxDQUFDOUQsTUFBRixHQUFTOEQsQ0FBQyxDQUFDbWhCLFFBQUYsR0FBV3ppQixDQUFYLEdBQWFXLENBQXREO0FBQXdELE9BQTloQixDQUEraEJ2RCxDQUEvaEIsQ0FBakI7QUFBbWpCOztBQUFBLGFBQVNlLENBQVQsQ0FBV2lCLENBQVgsRUFBYXRDLENBQWIsRUFBZTtBQUFDLFdBQUksSUFBSXVDLENBQUMsR0FBQyxDQUFWLEVBQVlBLENBQUMsR0FBQ0gsQ0FBQyxDQUFDd2pCLFFBQUYsQ0FBV3psQixNQUF6QixFQUFnQ29DLENBQUMsRUFBakMsRUFBb0M7QUFBQyxZQUFJRixDQUFDLEdBQUNELENBQUMsQ0FBQ3dqQixRQUFGLENBQVdyakIsQ0FBWCxDQUFOO0FBQW9CLFlBQUcsRUFBRUYsQ0FBQyxDQUFDd2pCLEtBQUYsR0FBUXZqQixDQUFSLElBQVdELENBQUMsQ0FBQ3lqQixNQUFGLEdBQVM5bEIsQ0FBdEIsQ0FBSCxFQUE0QixPQUFPcUMsQ0FBQyxDQUFDd2pCLEtBQUYsR0FBUXZqQixDQUFSLEdBQVUsQ0FBVixHQUFZRCxDQUFDLENBQUN3akIsS0FBRixLQUFVdmpCLENBQVYsSUFBYUQsQ0FBQyxDQUFDeWpCLE1BQUYsR0FBUzlsQixDQUF0QixHQUF3QixDQUF4QixHQUEwQnFDLENBQUMsQ0FBQzBqQixNQUEvQztBQUFzRDs7QUFBQSxhQUFPLENBQVA7QUFBUzs7QUFBQTFqQixJQUFBQSxDQUFDLEdBQUMsRUFBRixFQUFLRCxDQUFDLENBQUM0akIsS0FBRixDQUFRaHBCLE9BQVIsQ0FBZ0JvRixDQUFDLElBQUVDLENBQUMsQ0FBQ0QsQ0FBQyxDQUFDbWpCLElBQUgsQ0FBRCxHQUFVbmpCLENBQTdCLENBQUwsRUFBcUNFLENBQUMsRUFBdEMsRUFBeUMsS0FBS3BGLE1BQUwsR0FBWSxVQUFTa0YsQ0FBVCxFQUFXO0FBQUMsT0FBQztBQUFDM0IsUUFBQUEsS0FBSyxFQUFDVDtBQUFQLFVBQVVvQyxDQUFYLEdBQWN5SCxDQUFDLEVBQWY7QUFBa0IsS0FBbkYsRUFBb0YsS0FBS3pJLE1BQUwsR0FBWSxVQUFTZ0IsQ0FBVCxFQUFXO0FBQUMsT0FBQztBQUFDb2lCLFFBQUFBLElBQUksRUFBQ2ppQjtBQUFOLFVBQVNILENBQVYsR0FBYUUsQ0FBQyxFQUFkO0FBQWlCLEtBQTdIO0FBQThILEdBQWp0MkIsRUFBa3QyQkYsQ0FBQyxDQUFDMUQsT0FBRixHQUFVZ0csQ0FBNXQyQixFQUE4dDJCdEMsQ0FBQyxDQUFDNmpCLFNBQUYsR0FBWS9pQixDQUExdTJCLEVBQTR1MkJkLENBQUMsQ0FBQzdGLElBQUYsR0FBT3lELENBQW52MkIsRUFBcXYyQm9DLENBQUMsQ0FBQzhqQixJQUFGLEdBQU83akIsQ0FBNXYyQixFQUE4djJCRCxDQUFDLENBQUN0RSxJQUFGLEdBQU8sY0FBY21GLEtBQWQsQ0FBbUI7QUFBQ3RILElBQUFBLFdBQVcsQ0FBQ3lHLENBQUMsR0FBQyxDQUFILEVBQUtDLENBQUMsR0FBQ0QsQ0FBUCxFQUFTRSxDQUFDLEdBQUNGLENBQVgsRUFBYUcsQ0FBQyxHQUFDSCxDQUFmLEVBQWlCO0FBQUMsYUFBTyxNQUFNQSxDQUFOLEVBQVFDLENBQVIsRUFBVUMsQ0FBVixFQUFZQyxDQUFaLEdBQWUsSUFBdEI7QUFBMkI7O0FBQUssUUFBRG5DLENBQUMsR0FBRTtBQUFDLGFBQU8sS0FBSyxDQUFMLENBQVA7QUFBZTs7QUFBSyxRQUFEQSxDQUFDLENBQUNnQyxDQUFELEVBQUc7QUFBQyxXQUFLLENBQUwsSUFBUUEsQ0FBUjtBQUFVOztBQUFLLFFBQUQ5QixDQUFDLEdBQUU7QUFBQyxhQUFPLEtBQUssQ0FBTCxDQUFQO0FBQWU7O0FBQUssUUFBREEsQ0FBQyxDQUFDOEIsQ0FBRCxFQUFHO0FBQUMsV0FBSyxDQUFMLElBQVFBLENBQVI7QUFBVTs7QUFBSyxRQUFEUyxDQUFDLEdBQUU7QUFBQyxhQUFPLEtBQUssQ0FBTCxDQUFQO0FBQWU7O0FBQUssUUFBREEsQ0FBQyxDQUFDVCxDQUFELEVBQUc7QUFBQyxXQUFLLENBQUwsSUFBUUEsQ0FBUjtBQUFVOztBQUFLLFFBQURPLENBQUMsR0FBRTtBQUFDLGFBQU8sS0FBSyxDQUFMLENBQVA7QUFBZTs7QUFBSyxRQUFEQSxDQUFDLENBQUNQLENBQUQsRUFBRztBQUFDLFdBQUssQ0FBTCxJQUFRQSxDQUFSO0FBQVU7O0FBQUE1QixJQUFBQSxHQUFHLENBQUM0QixDQUFELEVBQUdDLENBQUgsRUFBS0MsQ0FBTCxFQUFPQyxDQUFQLEVBQVM7QUFBQyxhQUFPSCxDQUFDLENBQUNqQyxNQUFGLEdBQVMsS0FBS29CLElBQUwsQ0FBVWEsQ0FBVixDQUFULElBQXVCdUIsQ0FBQyxDQUFDLElBQUQsRUFBTXZCLENBQU4sRUFBUUMsQ0FBUixFQUFVQyxDQUFWLEVBQVlDLENBQVosQ0FBRCxFQUFnQixJQUF2QyxDQUFQO0FBQW9EOztBQUFBaEIsSUFBQUEsSUFBSSxDQUFDYSxDQUFELEVBQUc7QUFBQyxhQUFPeUIsQ0FBQyxDQUFDLElBQUQsRUFBTXpCLENBQU4sQ0FBRCxFQUFVLElBQWpCO0FBQXNCOztBQUFBOEIsSUFBQUEsU0FBUyxHQUFFO0FBQUMsYUFBT0YsQ0FBQyxDQUFDLElBQUQsRUFBTSxJQUFOLENBQUQsRUFBYSxJQUFwQjtBQUF5Qjs7QUFBQWUsSUFBQUEsU0FBUyxDQUFDM0MsQ0FBRCxFQUFHQyxDQUFDLEdBQUMsQ0FBTCxFQUFPO0FBQUMsYUFBTyxLQUFLLENBQUwsSUFBUUQsQ0FBQyxDQUFDQyxDQUFELENBQVQsRUFBYSxLQUFLLENBQUwsSUFBUUQsQ0FBQyxDQUFDQyxDQUFDLEdBQUMsQ0FBSCxDQUF0QixFQUE0QixLQUFLLENBQUwsSUFBUUQsQ0FBQyxDQUFDQyxDQUFDLEdBQUMsQ0FBSCxDQUFyQyxFQUEyQyxLQUFLLENBQUwsSUFBUUQsQ0FBQyxDQUFDQyxDQUFDLEdBQUMsQ0FBSCxDQUFwRCxFQUEwRCxJQUFqRTtBQUFzRTs7QUFBQTJDLElBQUFBLE9BQU8sQ0FBQzVDLENBQUMsR0FBQyxFQUFILEVBQU1DLENBQUMsR0FBQyxDQUFSLEVBQVU7QUFBQyxhQUFPRCxDQUFDLENBQUNDLENBQUQsQ0FBRCxHQUFLLEtBQUssQ0FBTCxDQUFMLEVBQWFELENBQUMsQ0FBQ0MsQ0FBQyxHQUFDLENBQUgsQ0FBRCxHQUFPLEtBQUssQ0FBTCxDQUFwQixFQUE0QkQsQ0FBQyxDQUFDQyxDQUFDLEdBQUMsQ0FBSCxDQUFELEdBQU8sS0FBSyxDQUFMLENBQW5DLEVBQTJDRCxDQUFDLENBQUNDLENBQUMsR0FBQyxDQUFILENBQUQsR0FBTyxLQUFLLENBQUwsQ0FBbEQsRUFBMERELENBQWpFO0FBQW1FOztBQUFqaEIsR0FBeHgyQixFQUEyeTNCQSxDQUFsejNCO0FBQW96M0IsQ0FKaG00RCxDQUlpbTRELEVBSmptNEQsQ0FBVjs7Ozs7Ozs7Ozs7QUNBUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjs7QUFFbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0Isc0JBQXNCO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7O0FBRUEsa0NBQWtDLFFBQVE7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixpQkFBaUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSx1Q0FBdUMsUUFBUTtBQUMvQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLE9BQU87QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUyx5QkFBeUI7QUFDbEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsZ0JBQWdCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOERBQThELFlBQVk7QUFDMUU7QUFDQSw4REFBOEQsWUFBWTtBQUMxRTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLFlBQVk7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNoZmE7QUFDYjtBQUNBO0FBQ0EsaURBQWlELE9BQU87QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx5QkFBeUIsbUJBQU8sQ0FBQyxnRkFBb0I7QUFDckQsNEJBQTRCLG1CQUFPLENBQUMsc0ZBQXVCO0FBQzNELHdCQUF3QixtQkFBTyxDQUFDLDhFQUFtQjtBQUNuRCw2Q0FBNkMseUNBQXlDLCtDQUErQztBQUNySTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFGQUFxRjtBQUNyRjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0Q7QUFDdEQsMERBQTBEO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLHdCQUF3Qiw4QkFBOEI7QUFDOUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLEtBQ2lDLEVBQUUsRUFHdEM7QUFDTCxhQUFhLEtBQzRCLEVBQUUsRUFHdEM7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYzs7Ozs7Ozs7Ozs7O0FDck1ELDhDQUEyQyxDQUFDLFdBQVcsRUFBQyxDQUFDLG1CQUFtQixFQUFFLDZDQUE2Qyxxb0JBQXFvQiw2cEJBQTZwQixLQUFLLHVCQUF1QixFQUFFLEtBQUssVUFBVSxLQUFLLFdBQVcsYUFBYSxhQUFhLFlBQVksTUFBTSxhQUFhLFNBQVMsV0FBVyxhQUFhLGFBQWEsWUFBWSxHQUFHLFFBQVEsVUFBVSxPQUFPLHlCQUF5QiwyQkFBMkIseUJBQXlCLDJCQUEyQiw2QkFBNkIsdUJBQXVCLDZCQUE2Qix5QkFBeUIsdUJBQXVCLHlCQUF5Qix5QkFBeUIsMkJBQTJCLHVCQUF1Qix1QkFBdUIsdUJBQXVCLHlCQUF5Qix1QkFBdUIsNkJBQTZCLHlCQUF5Qix5QkFBeUIsMkJBQTJCLDJCQUEyQix5QkFBeUIsNkJBQTZCLDJCQUEyQix5QkFBeUIseUJBQXlCLDJCQUEyQiw2QkFBNkIsNkJBQTZCLDZCQUE2Qiw2QkFBNkIsNkJBQTZCLDZCQUE2QiwyQkFBMkIsNkJBQTZCLHlCQUF5QiwyQkFBMkIsMkJBQTJCLDZCQUE2Qiw2QkFBNkIsNkJBQTZCLDJCQUEyQix5QkFBeUIsNkJBQTZCLDZCQUE2QiwyQkFBMkIseUJBQXlCLHVCQUF1Qiw2QkFBNkIsNkJBQTZCLDZCQUE2QiwyQkFBMkIsNkJBQTZCLHlCQUF5QiwyQkFBMkIsNkJBQTZCLDZCQUE2Qiw2QkFBNkIsMkJBQTJCLHlCQUF5Qiw2QkFBNkIsMkJBQTJCLDJCQUEyQiw2QkFBNkIsNkJBQTZCLDJCQUEyQiw2QkFBNkIseUJBQXlCLDJCQUEyQiwyQkFBMkIsNkJBQTZCLDZCQUE2Qiw2QkFBNkIsMkJBQTJCLHlCQUF5Qiw2QkFBNkIsNkJBQTZCLDJCQUEyQix5QkFBeUIsdUJBQXVCLDZCQUE2Qiw2QkFBNkIsNkJBQTZCLDJCQUEyQiw2QkFBNkIseUJBQXlCLDZCQUE2Qiw2QkFBNkIsNkJBQTZCLDZCQUE2QiwyQkFBMkIseUJBQXlCLDZCQUE2QiwyQkFBMkIseUJBQXlCLHlCQUF5Qix1QkFBdUIscUJBQXFCLHFCQUFxQixjQUFjLGNBQWMsZUFBZSxlQUFlLGFBQWEsYUFBYSxjQUFjLGFBQWEsYUFBYSxlQUFlLGFBQWEsWUFBWSxZQUFZLFlBQVksY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxhQUFhLGFBQWEsY0FBYyxhQUFhLGNBQWMsY0FBYyxnQkFBZ0IsYUFBYSxZQUFZLGNBQWMsYUFBYSxjQUFjLGVBQWUsV0FBVyxXQUFXLFdBQVcsZ0JBQWdCLFdBQVcsWUFBWSxjQUFjLFlBQVksZ0JBQWdCLFlBQVksWUFBWSxZQUFZLGNBQWMsY0FBYyxhQUFhLGNBQWMsY0FBYyxnQkFBZ0IsYUFBYSxZQUFZLGNBQWMsYUFBYSxjQUFjLGVBQWUsV0FBVyxXQUFXLFdBQVcsZ0JBQWdCLFdBQVcsWUFBWSxlQUFlLGNBQWMsWUFBWSxnQkFBZ0IsWUFBWSxZQUFZLFlBQVksY0FBYyxpQkFBaUIsY0FBYyxZQUFZLGFBQWEsZUFBZSxjQUFjLGNBQWMsY0FBYyxjQUFjLGVBQWUsY0FBYyxhQUFhLGNBQWMsZ0JBQWdCLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxjQUFjLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxlQUFlLGFBQWEsY0FBYyxjQUFjLGNBQWMsYUFBYSxjQUFjLFdBQVcsYUFBYSxZQUFZLGNBQWMsZUFBZSxjQUFjLGFBQWEsY0FBYyxZQUFZLFlBQVksV0FBVyxZQUFZLFlBQVksWUFBWSxlQUFlLFlBQVksYUFBYSxjQUFjLFdBQVcsY0FBYyxXQUFXLFdBQVcsWUFBWSxZQUFZLGFBQWEsYUFBYSxhQUFhLGNBQWMsZUFBZSxhQUFhLGFBQWEsY0FBYyxjQUFjLGVBQWUsZUFBZSxhQUFhLGFBQWEsWUFBWSxlQUFlLGNBQWMsZUFBZSxjQUFjLE1BQU0sYUFBYSxXQUFXLGFBQWEsY0FBYyxhQUFhLGNBQWMsZUFBZSxZQUFZLGVBQWUsYUFBYSxZQUFZLGFBQWEsYUFBYSxjQUFjLFlBQVksWUFBWSxZQUFZLGFBQWEsWUFBWSxlQUFlLGFBQWEsYUFBYSxjQUFjLGNBQWMsYUFBYSxlQUFlLGNBQWMsYUFBYSxhQUFhLGNBQWMsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsY0FBYyxlQUFlLGFBQWEsY0FBYyxjQUFjLGVBQWUsZUFBZSxlQUFlLGNBQWMsYUFBYSxlQUFlLGVBQWUsY0FBYyxhQUFhLFlBQVksZUFBZSxlQUFlLGVBQWUsY0FBYyxlQUFlLGFBQWEsY0FBYyxlQUFlLGVBQWUsZUFBZSxjQUFjLGFBQWEsZUFBZSxjQUFjLGNBQWMsZUFBZSxlQUFlLGNBQWMsZUFBZSxhQUFhLGNBQWMsY0FBYyxlQUFlLGVBQWUsZUFBZSxjQUFjLGFBQWEsZUFBZSxlQUFlLGNBQWMsYUFBYSxZQUFZLGVBQWUsZUFBZSxlQUFlLGNBQWMsZUFBZSxhQUFhLGVBQWUsZUFBZSxlQUFlLGVBQWUsY0FBYyxhQUFhLGVBQWUsY0FBYyxhQUFhLGFBQWEsWUFBWSxXQUFXLFdBQVcsY0FBYyxjQUFjLGVB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ZUFBZSxjQUFjLGVBQWUsZUFBZSxhQUFhLFlBQVksZUFBZSxjQUFjLGVBQWUsY0FBYyxlQUFlLGNBQWMsYUFBYSxnQkFBZ0IsZ0JBQWdCLGdCQUFnQixnQkFBZ0IsaUJBQWlCLGNBQWMsZUFBZSxjQUFjLGVBQWUsZUFBZSxZQUFZLGNBQWMsWUFBWSxXQUFXLGVBQWUsYUFBYSxjQUFjLGNBQWMsYUFBYSxjQUFjLFlBQVksZUFBZSxjQUFjLFdBQVcsY0FBYyxjQUFjLGFBQWEsYUFBYSxjQUFjLGFBQWEsZ0JBQWdCLGVBQWUsY0FBYyxjQUFjLGFBQWEsZ0JBQWdCLGVBQWUsY0FBYyxhQUFhLGVBQWUsNkJBQTZCLGFBQWEsY0FBYyxZQUFZLHVCQUF1QixZQUFZLGNBQWMsYUFBYSxjQUFjLGNBQWMseUJBQXlCLGVBQWUsZUFBZSxZQUFZLGFBQWEsZUFBZSxhQUFhLFlBQVksY0FBYyxnQkFBZ0IsYUFBYSxjQUFjLGFBQWEsYUFBYSxNQUFNLGFBQWEsWUFBWSxZQUFZLGVBQWUsZUFBZSxjQUFjLFlBQVksYUFBYSxlQUFlLGNBQWMsY0FBYyxZQUFZLGNBQWMsY0FBYyxXQUFXLGNBQWMsY0FBYyxnQkFBZ0IsZUFBZSxhQUFhLGVBQWUsYUFBYSx1QkFBdUIsWUFBWSxnQkFBZ0IsZUFBZSxhQUFhLGFBQWEsY0FBYyxjQUFjLGFBQWEsYUFBYSxhQUFhLGVBQWUsWUFBWSxXQUFXLFlBQVksZUFBZSxlQUFlLGNBQWMsZ0JBQWdCLGFBQWEsY0FBYyxlQUFlLFlBQVksYUFBYSxlQUFlLGNBQWMsZUFBZSxpQkFBaUIsZUFBZSxlQUFlLG1CQUFtQixlQUFlLGNBQWMsOEJBQThCLGFBQWEsa0JBQWtCLGVBQWUsaUJBQWlCLGNBQWMsY0FBYyxZQUFZLGdCQUFnQixpQkFBaUIsYUFBYSxhQUFhLGFBQWEsZ0JBQWdCLGFBQWEsc0JBQXNCLGVBQWUsWUFBWSxjQUFjLGNBQWMsYUFBYSxjQUFjLFlBQVksY0FBYyxjQUFjLGNBQWMsZ0JBQWdCLFdBQVcsY0FBYyxZQUFZLGVBQWUsY0FBYyxhQUFhLGFBQWEsWUFBWSxjQUFjLGNBQWMs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aUIsaUJBQWlCLGlCQUFpQixpQkFBaUIsaUJBQWlCLGlCQUFpQixjQUFjLGdCQUFnQixpQkFBaUIsZUFBZSxnQkFBZ0IsY0FBYyxjQUFjLFlBQVksZUFBZSxpQkFBaUIsYUFBYSxhQUFhLGNBQWMsY0FBYyxlQUFlLGVBQWUsYUFBYSxjQUFjLGFBQWEsY0FBYyxjQUFjLGVBQWUsYUFBYSxjQUFjLGVBQWUsaUJBQWlCLGlCQUFpQixZQUFZLGVBQWUsZ0JBQWdCLGFBQWEsYUFBYSxjQUFjLGFBQWEsY0FBYyxjQUFjLGVBQWUsZUFBZSxlQUFlLGNBQWMsY0FBYyxjQUFjLGVBQWUsY0FBYyxhQUFhLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGFBQWEsaUJBQWlCLGFBQWEsY0FBYyxlQUFlLGNBQWMsY0FBYyxjQUFjLGNBQWMsYUFBYSxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsYUFBYSxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxlQUFlLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxlQUFlLGNBQWMsZUFBZSxjQUFjLGNBQWMsY0FBYyxjQUFjLGFBQWEsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsZUFBZSxjQUFjLGNBQWMsY0FBYyxjQUFjLGlCQUFpQixlQUFlLGNBQWMsZUFBZSxZQUFZLGVBQWUsaUJBQWlCLGVBQWUsZUFBZSxlQUFlLGNBQWMsY0FBYyxjQUFjLGVBQWUsZUFBZSxjQUFjLGNBQWMsZ0JBQWdCLGFBQWEsZ0JBQWdCLGFBQWEsYUFBYSxhQUFhLGtCQUFrQixZQUFZLFlBQVksYUFBYSxhQUFhLGFBQWEsY0FBYyxjQUFjLFdBQVcsYUFBYSxhQUFhLGNBQWMsaUJBQWlCLGVBQWUsZ0JBQWdCLGlCQUFpQixjQUFjLGNBQWMsZUFBZSxtQkFBbUIsZ0JBQWdCLGNBQWMsZUFBZSxjQUFjLGNBQWMsY0FBYyxhQUFhLGNBQWMsYUFBYSxjQUFjLGNBQWMsZ0JBQWdCLGdCQUFnQixvQkFBb0Isb0JBQW9CLHVCQUF1QixnQkFBZ0IsWUFBWSxpQkFBaUIsZUFBZSxlQUFlLGVBQWUsY0FBYyxjQUFjLHdCQUF3QixnQkFBZ0IsY0FBYyxjQUFjLGVBQWUsY0FBYyxlQUFlLGFBQWEsZUFBZSxlQUFlLGVBQWUsY0FBYyxlQUFlLFlBQVksdUJBQXVCLGNBQWMsWUFBWSxjQUFjLGdCQUFnQixlQUFlLGFBQWEsY0FBYyxlQUFlLGNBQWMsZUFBZSxlQUFlLGFBQWEsaUJBQWlCLGVBQWUsYUFBYSxjQUFjLGFBQWEsZUFBZSxlQUFlLGNBQWMsaUJBQWlCLGVBQWUsY0FBYyxhQUFhLGFBQWEsZUFBZSxjQUFjLHFCQUFxQixnQkFBZ0IsYUFBYSxpQkFBaUIsZUFBZSxlQUFlLGVBQWUsZUFBZSxjQUFjLGdCQUFnQixZQUFZLGFBQWEsc0JBQXNCLGFBQWEsV0FBVyxlQUFlLG1CQUFtQixlQUFlLFdBQVcsaUJBQWlCLFlBQVksb0JBQW9CLGVBQWUsY0FBYyxtQkFBbUIsZUFBZSxlQUFlLGFBQWEsWUFBWSxhQUFhLGNBQWMsY0FBYyxhQUFhLGVBQWUsY0FBYyxnQkFBZ0IsbUJBQW1CLGVBQWUsZ0JBQWdCLGdCQUFnQixpQkFBaUIscUJBQXFCLGNBQWMsYUFBYSxZQUFZLFlBQVksYUFBYSxhQUFhLGFBQWEsWUFBWSxlQUFlLGVBQWUsY0FBYyxlQUFlLGFBQWEsY0FBYyxhQUFhLGFBQWEsY0FBYyxjQUFjLGFBQWEsY0FBYyxrQkFBa0IsY0FBYyxpQkFBaUIsYUFBYSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsY0FBYyxlQUFlLGNBQWMsbUJBQW1CLGVBQWUsY0FBYyxrQkFBa0IsZUFBZSxjQUFjLFlBQVksYUFBYSxjQUFjLGVBQWUsZ0JBQWdCLGlCQUFpQixjQUFjLGVBQWUsYUFBYSxjQUFjLGFBQWEsWUFBWSxZQUFZLFlBQVksY0FBYyxpQkFBaUIsYUFBYSxjQUFjLGNBQWMsYUFBYSxjQUFjLGNBQWMsYUFBYSxjQUFjLGVBQWUsZUFBZSxnQkFBZ0IsZUFBZSxjQUFjLGVBQWUsZ0JBQWdCLDRCQUE0QixlQUFlLGNBQWMsa0JBQWtCLGFBQWEsZUFBZSxhQUFhLGVBQWUsZUFBZSxjQUFjLGVBQWUsZUFBZSxlQUFlLGNBQWMsZUFBZSxjQUFjLGVBQWUsZUFBZSxlQUFlLGNBQWMsWUFBWSxhQUFhLGNBQWMsYUFBYSxlQUFlLGFBQWEsYUFBYSxlQUFlLGNBQWMsY0FBYyxjQUFjLGVBQWUsYUFBYSxjQUFjLGVBQWUsY0FBYyxpQkFBaUIsaUJBQWlCLGlCQUFpQixjQUFjLGFBQWEsY0FBYyxjQUFjLGFBQWEsZUFBZSxjQUFjLGNBQWMsZ0JBQWdCLGNBQWMsZUFBZSxlQUFlLGNBQWMsYUFBYSxjQUFjLFlBQVksYUFBYSxjQUFjLGNBQWMsY0FBYyxlQUFlLGNBQWMsY0FBYyxpQkFBaUIsZUFBZSxZQUFZLGFBQWEsZUFBZSxhQUFhLGFBQWEsY0FBYyxjQUFjLGVBQWUsY0FBYyxtQkFBbUIsYUFBYSxlQUFlLGlCQUFpQixlQUFlLGNBQWMsbUJBQW1CLGNBQWMsZ0JBQWdCLGVBQWUsc0JBQXNCLGVBQWUsZ0JBQWdCLHNCQUFzQixZQUFZLGVBQWUsYUFBYSxlQUFlLGNBQWMsY0FBYyxJQUFJLFNBQVMsYUFBYSxjQUFjLGdCQUFnQixnQkFBZ0IsZUFBZSxlQUFlLFlBQVksYUFBYSxnQkFBZ0IsaUJBQWlCLGFBQWEsWUFBWSxjQUFjLGVBQWUsY0FBYyxlQUFlLGdCQUFnQixpQkFBaUIsY0FBYyxlQUFlLGNBQWMsZUFBZSxhQUFhLFlBQVksZUFBZSxjQUFjLGFBQWEsZUFBZSxjQUFjLGVBQWUsbUJBQW1CLGNBQWMsaUJBQWlCLGFBQWEsY0FBYyxjQUFjLGNBQWMsYUFBYSxlQUFlLGNBQWMsY0FBYyxlQUFlLGdCQUFnQixlQUFlLGdCQUFnQixhQUFhLGVBQWUsZUFBZSxZQUFZLGNBQWMsZUFBZSxjQUFjLGNBQWMsY0FBYyxjQUFjLGVBQWUsYUFBYSxjQUFjLGVBQWUsZUFBZSxnQkFBZ0IsZUFBZSxxQkFBcUIsaUJBQWlCLGdCQUFnQixjQUFjLGNBQWMsY0FBYyxhQUFhLGdCQUFnQixlQUFlLGVBQWUsWUFBWSxjQUFjLGFBQWEsWUFBWSxjQUFjLGVBQWUsY0FBYyxnQkFBZ0IsYUFBYSxlQUFlLGNBQWMsY0FBYyxXQUFXLGNBQWMsYUFBYSxhQUFhLGNBQWMsY0FBYyxhQUFhLGFBQWEsY0FBYyxlQUFlLGVBQWUsZUFBZSxjQUFjLGNBQWMsZUFBZSxjQUFjLGdCQUFnQixhQUFhLGVBQWUsZUFBZSxrQkFBa0IsYUFBYSxZQUFZLGNBQWMsY0FBYyxlQUFlLGVBQWUsYUFBYSxhQUFhLHdCQUF3QixjQUFjLFlBQVksYUFBYSxhQUFhLGVBQWUsbUJBQW1CLGFBQWEsY0FBYyxZQUFZLGdCQUFnQixrQkFBa0IsZ0JBQWdCLGdCQUFnQixnQkFBZ0IsZ0JBQWdCLGdCQUFnQixlQUFlLGdCQUFnQixvQkFBb0IsZ0JBQWdCLGdCQUFnQixjQUFjLGFBQWEsb0JBQW9CLGFBQWEsb0JBQW9CLGVBQWUsV0FBVyxZQUFZLGVBQWUsY0FBYyxlQUFlLGVBQWUsY0FBYyxlQUFlLGNBQWMsY0FBYyxnQkFBZ0IsZUFBZSxjQUFjLGNBQWMsaUJBQWlCLGVBQWUsaUJBQWlCLGVBQWUsY0FBYyxlQUFlLGVBQWUsZUFBZSxjQUFjLFlBQVksZUFBZSxhQUFhLGVBQWUsY0FBYyxjQUFjLGFBQWEsYUFBYSxlQUFlLFlBQVksY0FBYyxjQUFjLGdCQUFnQixZQUFZLGNBQWMsY0FBYyxnQkFBZ0IsYUFBYSxjQUFjLGFBQWEsY0FBYyxZQUFZLFlBQVksYUFBYSxhQUFhLGFBQWEsZUFBZSxhQUFhLGdCQUFnQixZQUFZLGVBQWUsYUFBYSxlQUFlLGlCQUFpQixhQUFhLGNBQWMsYUFBYSxlQUFlLGNBQWMsWUFBWSxlQUFlLGVBQWUsZUFBZSxnQkFBZ0IsYUFBYSxZQUFZLGVBQWUsY0FBYyxXQUFXLGNBQWMsZ0JBQWdCLGFBQWEsaUJBQWlCLGdCQUFnQixlQUFlLGNBQWMsZ0JBQWdCLGdCQUFnQixpQkFBaUIsY0FBYyxjQUFjLFlBQVksbUJBQW1CLGNBQWMsYUFBYSxlQUFlLGNBQWMsaUJBQWlCLGlCQUFpQixpQkFBaUIsZUFBZSxjQUFjLFlBQVksZUFBZSxhQUFhLGNBQWMsZUFBZSxjQUFjLGdCQUFnQixjQUFjLGVBQWUsYUFBYSxjQUFjLGVBQWUsaUJBQWlCLGNBQWMsY0FBYyxjQUFjLGVBQWUsZ0JBQWdCLGNBQWMsZUFBZSxlQUFlLGdCQUFnQix1QkFBdUIsd0JBQXdCLGVBQWUsY0FBYyxjQUFjLElBQUksU0FBUyxhQUFhLGNBQWMsZ0JBQWdCLGdCQUFnQixlQUFlLGVBQWUsWUFBWSxhQUFhLGdCQUFnQixhQUFhLGFBQWEsZUFBZSxhQUFhLGVBQWUsWUFBWSxlQUFlLGNBQWMsZUFBZSxhQUFhLFlBQVksbUJBQW1CLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxlQUFlLGdCQUFnQixhQUFhLGVBQWUsaUJBQWlCLGVBQWUsY0FBYyxlQUFlLHNCQUFzQixpQkFBaUIsZ0JBQWdCLFdBQVcsZUFBZSxZQUFZLG1CQUFtQixlQUFlLGVBQWUsY0FBYyxpQkFBaUIsb0JBQW9CLGlCQUFpQixpQkFBaUIsWUFBWSxhQUFhLGNBQWMsY0FBYyxhQUFhLElBQUksU0FBUyxhQUFhLGFBQWEsYUFBYSxjQUFjLGVBQWUsYUFBYSxZQUFZLGNBQWMsaUJBQWlCLGVBQWUsYUFBYSxjQUFjLGFBQWEsY0FBYyxjQUFjLGdCQUFnQixnQkFBZ0IsZUFBZSxpQkFBaUIsZUFBZSxZQUFZLGFBQWEsZUFBZSxlQUFlLFlBQVksYUFBYSxlQUFlLGNBQWMsa0JBQWtCLGdCQUFnQixnQkFBZ0IsY0FBYyxhQUFhLGVBQWUsa0JBQWtCLGVBQWUsZ0JBQWdCLGdCQUFnQixtQkFBbUIsa0JBQWtCLGdCQUFnQixnQkFBZ0IsZUFBZSxlQUFlLGVBQWUsYUFBYSxhQUFhLGFBQWEsYUFBYSxrQkFBa0IsZUFBZSxnQkFBZ0IsZ0JBQWdCLGdCQUFnQixnQkFBZ0IsZ0JBQWdCLGdCQUFnQixtQkFBbUIsa0JBQWtCLGdCQUFnQixlQUFlLGVBQWUsZUFBZSxjQUFjLGVBQWUsY0FBYyxlQUFlLFlBQVksZUFBZSxlQUFlLFlBQVksZUFBZSxhQUFhLGNBQWMsaUJBQWlCLGNB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QSw0QkFBNEIsMERBQWE7QUFDekM7QUFDQTs7QUFFQSw0Q0FBNEMsbUVBQVM7QUFDckQsS0FBSzs7QUFFTCxJQUFJLGlFQUFXOztBQUVmLG9CQUFvQiw0QkFBNEI7QUFDaEQsTUFBTSxvREFBUztBQUNmOztBQUVBOztBQUVBO0FBQ0EsTUFBTSxpREFBSTtBQUNWO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0EsSUFBSSxvREFBUztBQUNiLEdBQUc7QUFDSDtBQUNBLElBQUksbURBQVE7O0FBRVo7QUFDQSxNQUFNLGlEQUFJO0FBQ1Y7O0FBRUEsSUFBSSxpRUFBVztBQUNmO0FBQ0E7QUFDQSxnQkFBZ0IscUVBQWU7QUFDL0Isc0RBQU0sZ0Q7Ozs7Ozs7Ozs7OztBQ2hSTjs7QUFFQSxNQUFNK2pCLEdBQU4sQ0FBVTtBQUNOeHFCLEVBQUFBLFdBQVcsR0FBRztBQUNWLFNBQUtvQixJQUFMO0FBQ0g7O0FBRURBLEVBQUFBLElBQUksR0FBRztBQUNILFFBQUlyQiwwREFBSjtBQUNIOztBQVBLOztBQVNWLElBQUl5cUIsR0FBSixHOzs7Ozs7Ozs7O0FDWEEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYW5zaS1odG1sLWNvbW11bml0eS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9jYW52YXMuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvb2dsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9odG1sLWVudGl0aWVzL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaHRtbC1lbnRpdGllcy9saWIvbmFtZWQtcmVmZXJlbmNlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaHRtbC1lbnRpdGllcy9saWIvbnVtZXJpYy11bmljb2RlLW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaHRtbC1lbnRpdGllcy9saWIvc3Vycm9nYXRlLXBhaXJzLmpzIiwid2VicGFjazovLy8uL2FwcC9zaGFkZXJzL2ZyYWdtZW50Lmdsc2wiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NoYWRlcnMvdmVydGV4Lmdsc2wiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvY2xpZW50cy9XZWJTb2NrZXRDbGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvbW9kdWxlcy9sb2dnZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvbW9kdWxlcy9zdHJpcC1hbnNpL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L292ZXJsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvc29ja2V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL2NyZWF0ZVNvY2tldFVSTC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC91dGlscy9nZXRDdXJyZW50U2NyaXB0U291cmNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL2xvZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC91dGlscy9wYXJzZVVSTC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC91dGlscy9yZWxvYWRBcHAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvdXRpbHMvc2VuZE1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2VtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2xvZy5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3R5bGVzL2luZGV4LnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gYW5zaUhUTUxcblxuLy8gUmVmZXJlbmNlIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvYW5zaS1yZWdleFxudmFyIF9yZWdBTlNJID0gLyg/Oig/OlxcdTAwMWJcXFspfFxcdTAwOWIpKD86KD86WzAtOV17MSwzfSk/KD86KD86O1swLTldezAsM30pKik/W0EtTXxmLW1dKXxcXHUwMDFiW0EtTV0vXG5cbnZhciBfZGVmQ29sb3JzID0ge1xuICByZXNldDogWydmZmYnLCAnMDAwJ10sIC8vIFtGT1JFR1JPVURfQ09MT1IsIEJBQ0tHUk9VTkRfQ09MT1JdXG4gIGJsYWNrOiAnMDAwJyxcbiAgcmVkOiAnZmYwMDAwJyxcbiAgZ3JlZW46ICcyMDk4MDUnLFxuICB5ZWxsb3c6ICdlOGJmMDMnLFxuICBibHVlOiAnMDAwMGZmJyxcbiAgbWFnZW50YTogJ2ZmMDBmZicsXG4gIGN5YW46ICcwMGZmZWUnLFxuICBsaWdodGdyZXk6ICdmMGYwZjAnLFxuICBkYXJrZ3JleTogJzg4OCdcbn1cbnZhciBfc3R5bGVzID0ge1xuICAzMDogJ2JsYWNrJyxcbiAgMzE6ICdyZWQnLFxuICAzMjogJ2dyZWVuJyxcbiAgMzM6ICd5ZWxsb3cnLFxuICAzNDogJ2JsdWUnLFxuICAzNTogJ21hZ2VudGEnLFxuICAzNjogJ2N5YW4nLFxuICAzNzogJ2xpZ2h0Z3JleSdcbn1cbnZhciBfb3BlblRhZ3MgPSB7XG4gICcxJzogJ2ZvbnQtd2VpZ2h0OmJvbGQnLCAvLyBib2xkXG4gICcyJzogJ29wYWNpdHk6MC41JywgLy8gZGltXG4gICczJzogJzxpPicsIC8vIGl0YWxpY1xuICAnNCc6ICc8dT4nLCAvLyB1bmRlcnNjb3JlXG4gICc4JzogJ2Rpc3BsYXk6bm9uZScsIC8vIGhpZGRlblxuICAnOSc6ICc8ZGVsPicgLy8gZGVsZXRlXG59XG52YXIgX2Nsb3NlVGFncyA9IHtcbiAgJzIzJzogJzwvaT4nLCAvLyByZXNldCBpdGFsaWNcbiAgJzI0JzogJzwvdT4nLCAvLyByZXNldCB1bmRlcnNjb3JlXG4gICcyOSc6ICc8L2RlbD4nIC8vIHJlc2V0IGRlbGV0ZVxufVxuXG47WzAsIDIxLCAyMiwgMjcsIDI4LCAzOSwgNDldLmZvckVhY2goZnVuY3Rpb24gKG4pIHtcbiAgX2Nsb3NlVGFnc1tuXSA9ICc8L3NwYW4+J1xufSlcblxuLyoqXG4gKiBDb252ZXJ0cyB0ZXh0IHdpdGggQU5TSSBjb2xvciBjb2RlcyB0byBIVE1MIG1hcmt1cC5cbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0XG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gYW5zaUhUTUwgKHRleHQpIHtcbiAgLy8gUmV0dXJucyB0aGUgdGV4dCBpZiB0aGUgc3RyaW5nIGhhcyBubyBBTlNJIGVzY2FwZSBjb2RlLlxuICBpZiAoIV9yZWdBTlNJLnRlc3QodGV4dCkpIHtcbiAgICByZXR1cm4gdGV4dFxuICB9XG5cbiAgLy8gQ2FjaGUgb3BlbmVkIHNlcXVlbmNlLlxuICB2YXIgYW5zaUNvZGVzID0gW11cbiAgLy8gUmVwbGFjZSB3aXRoIG1hcmt1cC5cbiAgdmFyIHJldCA9IHRleHQucmVwbGFjZSgvXFwwMzNcXFsoXFxkKyltL2csIGZ1bmN0aW9uIChtYXRjaCwgc2VxKSB7XG4gICAgdmFyIG90ID0gX29wZW5UYWdzW3NlcV1cbiAgICBpZiAob3QpIHtcbiAgICAgIC8vIElmIGN1cnJlbnQgc2VxdWVuY2UgaGFzIGJlZW4gb3BlbmVkLCBjbG9zZSBpdC5cbiAgICAgIGlmICghIX5hbnNpQ29kZXMuaW5kZXhPZihzZXEpKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZXh0cmEtYm9vbGVhbi1jYXN0XG4gICAgICAgIGFuc2lDb2Rlcy5wb3AoKVxuICAgICAgICByZXR1cm4gJzwvc3Bhbj4nXG4gICAgICB9XG4gICAgICAvLyBPcGVuIHRhZy5cbiAgICAgIGFuc2lDb2Rlcy5wdXNoKHNlcSlcbiAgICAgIHJldHVybiBvdFswXSA9PT0gJzwnID8gb3QgOiAnPHNwYW4gc3R5bGU9XCInICsgb3QgKyAnO1wiPidcbiAgICB9XG5cbiAgICB2YXIgY3QgPSBfY2xvc2VUYWdzW3NlcV1cbiAgICBpZiAoY3QpIHtcbiAgICAgIC8vIFBvcCBzZXF1ZW5jZVxuICAgICAgYW5zaUNvZGVzLnBvcCgpXG4gICAgICByZXR1cm4gY3RcbiAgICB9XG4gICAgcmV0dXJuICcnXG4gIH0pXG5cbiAgLy8gTWFrZSBzdXJlIHRhZ3MgYXJlIGNsb3NlZC5cbiAgdmFyIGwgPSBhbnNpQ29kZXMubGVuZ3RoXG4gIDsobCA+IDApICYmIChyZXQgKz0gQXJyYXkobCArIDEpLmpvaW4oJzwvc3Bhbj4nKSlcblxuICByZXR1cm4gcmV0XG59XG5cbi8qKlxuICogQ3VzdG9taXplIGNvbG9ycy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb2xvcnMgcmVmZXJlbmNlIHRvIF9kZWZDb2xvcnNcbiAqL1xuYW5zaUhUTUwuc2V0Q29sb3JzID0gZnVuY3Rpb24gKGNvbG9ycykge1xuICBpZiAodHlwZW9mIGNvbG9ycyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2Bjb2xvcnNgIHBhcmFtZXRlciBtdXN0IGJlIGFuIE9iamVjdC4nKVxuICB9XG5cbiAgdmFyIF9maW5hbENvbG9ycyA9IHt9XG4gIGZvciAodmFyIGtleSBpbiBfZGVmQ29sb3JzKSB7XG4gICAgdmFyIGhleCA9IGNvbG9ycy5oYXNPd25Qcm9wZXJ0eShrZXkpID8gY29sb3JzW2tleV0gOiBudWxsXG4gICAgaWYgKCFoZXgpIHtcbiAgICAgIF9maW5hbENvbG9yc1trZXldID0gX2RlZkNvbG9yc1trZXldXG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICBpZiAoJ3Jlc2V0JyA9PT0ga2V5KSB7XG4gICAgICBpZiAodHlwZW9mIGhleCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaGV4ID0gW2hleF1cbiAgICAgIH1cbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShoZXgpIHx8IGhleC5sZW5ndGggPT09IDAgfHwgaGV4LnNvbWUoZnVuY3Rpb24gKGgpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBoICE9PSAnc3RyaW5nJ1xuICAgICAgfSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgdmFsdWUgb2YgYCcgKyBrZXkgKyAnYCBwcm9wZXJ0eSBtdXN0IGJlIGFuIEFycmF5IGFuZCBlYWNoIGl0ZW0gY291bGQgb25seSBiZSBhIGhleCBzdHJpbmcsIGUuZy46IEZGMDAwMCcpXG4gICAgICB9XG4gICAgICB2YXIgZGVmSGV4Q29sb3IgPSBfZGVmQ29sb3JzW2tleV1cbiAgICAgIGlmICghaGV4WzBdKSB7XG4gICAgICAgIGhleFswXSA9IGRlZkhleENvbG9yWzBdXG4gICAgICB9XG4gICAgICBpZiAoaGV4Lmxlbmd0aCA9PT0gMSB8fCAhaGV4WzFdKSB7XG4gICAgICAgIGhleCA9IFtoZXhbMF1dXG4gICAgICAgIGhleC5wdXNoKGRlZkhleENvbG9yWzFdKVxuICAgICAgfVxuXG4gICAgICBoZXggPSBoZXguc2xpY2UoMCwgMilcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBoZXggIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB2YWx1ZSBvZiBgJyArIGtleSArICdgIHByb3BlcnR5IG11c3QgYmUgYSBoZXggc3RyaW5nLCBlLmcuOiBGRjAwMDAnKVxuICAgIH1cbiAgICBfZmluYWxDb2xvcnNba2V5XSA9IGhleFxuICB9XG4gIF9zZXRUYWdzKF9maW5hbENvbG9ycylcbn1cblxuLyoqXG4gKiBSZXNldCBjb2xvcnMuXG4gKi9cbmFuc2lIVE1MLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICBfc2V0VGFncyhfZGVmQ29sb3JzKVxufVxuXG4vKipcbiAqIEV4cG9zZSB0YWdzLCBpbmNsdWRpbmcgb3BlbiBhbmQgY2xvc2UuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5hbnNpSFRNTC50YWdzID0ge31cblxuaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYW5zaUhUTUwudGFncywgJ29wZW4nLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfb3BlblRhZ3MgfVxuICB9KVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYW5zaUhUTUwudGFncywgJ2Nsb3NlJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX2Nsb3NlVGFncyB9XG4gIH0pXG59IGVsc2Uge1xuICBhbnNpSFRNTC50YWdzLm9wZW4gPSBfb3BlblRhZ3NcbiAgYW5zaUhUTUwudGFncy5jbG9zZSA9IF9jbG9zZVRhZ3Ncbn1cblxuZnVuY3Rpb24gX3NldFRhZ3MgKGNvbG9ycykge1xuICAvLyByZXNldCBhbGxcbiAgX29wZW5UYWdzWycwJ10gPSAnZm9udC13ZWlnaHQ6bm9ybWFsO29wYWNpdHk6MTtjb2xvcjojJyArIGNvbG9ycy5yZXNldFswXSArICc7YmFja2dyb3VuZDojJyArIGNvbG9ycy5yZXNldFsxXVxuICAvLyBpbnZlcnNlXG4gIF9vcGVuVGFnc1snNyddID0gJ2NvbG9yOiMnICsgY29sb3JzLnJlc2V0WzFdICsgJztiYWNrZ3JvdW5kOiMnICsgY29sb3JzLnJlc2V0WzBdXG4gIC8vIGRhcmsgZ3JleVxuICBfb3BlblRhZ3NbJzkwJ10gPSAnY29sb3I6IycgKyBjb2xvcnMuZGFya2dyZXlcblxuICBmb3IgKHZhciBjb2RlIGluIF9zdHlsZXMpIHtcbiAgICB2YXIgY29sb3IgPSBfc3R5bGVzW2NvZGVdXG4gICAgdmFyIG9yaUNvbG9yID0gY29sb3JzW2NvbG9yXSB8fCAnMDAwJ1xuICAgIF9vcGVuVGFnc1tjb2RlXSA9ICdjb2xvcjojJyArIG9yaUNvbG9yXG4gICAgY29kZSA9IHBhcnNlSW50KGNvZGUpXG4gICAgX29wZW5UYWdzWyhjb2RlICsgMTApLnRvU3RyaW5nKCldID0gJ2JhY2tncm91bmQ6IycgKyBvcmlDb2xvclxuICB9XG59XG5cbmFuc2lIVE1MLnJlc2V0KClcbiIsImltcG9ydCB7IG9nbCB9IGZyb20gXCIuL29nbFwiO1xyXG5cclxuaW1wb3J0IHZlcnRleFNoYWRlciBmcm9tICcuLi9zaGFkZXJzL3ZlcnRleC5nbHNsJ1xyXG5pbXBvcnQgZnJhZ21lbnRTaGFkZXIgZnJvbSAnLi4vc2hhZGVycy9mcmFnbWVudC5nbHNsJyBcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhcyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmJpbmQoKVxyXG5cclxuICAgICAgICB0aGlzLnZlcnRleFNoYWRlciA9IHZlcnRleFNoYWRlclxyXG4gICAgICAgIHRoaXMuZnJhZ21lbnRTaGFkZXIgPSBmcmFnbWVudFNoYWRlclxyXG5cclxuICAgICAgICB0aGlzLmltZ1NpemUgPSBbMTkyMCwgMTA4MF1cclxuXHJcbiAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlYmdsJylcclxuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IG9nbC5SZW5kZXJlcih7IGNhbnZhczogY2FudmFzLCBkcHI6IDIgfSlcclxuICAgICAgICB0aGlzLmdsID0gdGhpcy5yZW5kZXJlci5nbFxyXG5cclxuICAgICAgICAvLyBWYXJpYWJsZSBpbnB1dHMgdG8gY29udHJvbCBmbG93bWFwXHJcbiAgICAgICAgdGhpcy5hc3BlY3QgPSAxXHJcbiAgICAgICAgdGhpcy5tb3VzZSA9IG5ldyBvZ2wuVmVjMigtMSlcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gbmV3IG9nbC5WZWMyKClcclxuXHJcbiAgICAgICAgdGhpcy5mbG93bWFwID0gbmV3IG9nbC5GbG93bWFwKHRoaXMuZ2wpXHJcblxyXG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSB1bmRlZmluZWRcclxuICAgICAgICB0aGlzLmxhc3RNb3VzZSA9IG5ldyBvZ2wuVmVjMigpXHJcblxyXG4gICAgICAgIHRoaXMuckFGID0gdW5kZWZpbmVkXHJcblxyXG4gICAgICAgIHRoaXMuaW5pdCgpXHJcbiAgICB9XHJcblxyXG4gICAgYmluZCgpIHtcclxuICAgICAgICBbJ3VwZGF0ZU1vdXNlJywgJ3VwZGF0ZSddXHJcbiAgICAgICAgICAgIC5mb3JFYWNoKGZuID0+IHRoaXNbZm5dID0gdGhpc1tmbl0uYmluZCh0aGlzKSlcclxuICAgIH1cclxuXHJcbiAgICAvL3JlcGxhY2UgYWxsIHdpbmRvdy5pbm5lcldpZHRoIGFuZCBoZWlnaHQgYnkgdXNpbmcgdGhlbSBpbiBzdG9yZSBvYmplY3RcclxuICAgIHJlc2l6ZSgpIHtcclxuICAgICAgICBsZXQgYTEsIGEyXHJcbiAgICAgICAgdmFyIGltYWdlQXNwZWN0ID0gdGhpcy5pbWdTaXplWzFdIC8gdGhpcy5pbWdTaXplWzBdXHJcblxyXG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJIZWlnaHQgLyB3aW5kb3cuaW5uZXJXaWR0aCA8IGltYWdlQXNwZWN0KSB7XHJcbiAgICAgICAgICAgIGExID0gMVxyXG4gICAgICAgICAgICBhMiA9IHdpbmRvdy5pbm5lckhlaWdodCAvIHdpbmRvdy5pbm5lcldpZHRoIC8gaW1hZ2VBc3BlY3RcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhMSA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCkgKiBpbWFnZUFzcGVjdFxyXG4gICAgICAgICAgICBhMiA9IDFcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubWVzaC5wcm9ncmFtLnVuaWZvcm1zLnJlcy52YWx1ZSA9IG5ldyBvZ2wuVmVjNChcclxuICAgICAgICAgICAgd2luZG93LmlubmVyV2lkdGgsXHJcbiAgICAgICAgICAgIHdpbmRvdy5pbm5lckhlaWdodCxcclxuICAgICAgICAgICAgYTEsXHJcbiAgICAgICAgICAgIGEyXHJcbiAgICAgICAgKVxyXG4gICAgXHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXHJcbiAgICAgICAgdGhpcy5hc3BlY3QgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjcmVhdGVHZW9tZXRyeSgpIHtcclxuICAgICAgICAvLyBUcmlhbmdsZSB0aGF0IGluY2x1ZGVzIC0xIHRvIDEgcmFuZ2UgZm9yICdwb3NpdGlvbicsIGFuZCAwIHRvIDEgcmFuZ2UgZm9yICd1dicuXHJcbiAgICAgICAgdGhpcy5nZW9tZXRyeSA9IG5ldyBvZ2wuR2VvbWV0cnkodGhpcy5nbCwge1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHtcclxuICAgICAgICAgICAgICAgIHNpemU6IDIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBuZXcgRmxvYXQzMkFycmF5KFstMSwgLTEsIDMsIC0xLCAtMSwgM10pXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHV2OiB7IHNpemU6IDIsIGRhdGE6IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDIsIDAsIDAsIDJdKSB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVUZXh0dXJlKCkge1xyXG4gICAgICAgIHRoaXMudGV4dHVyZSA9IG5ldyBvZ2wuVGV4dHVyZSh0aGlzLmdsLCB7XHJcbiAgICAgICAgICAgIG1pbkZpbHRlcjogdGhpcy5nbC5MSU5FQVIsXHJcbiAgICAgICAgICAgIG1hZ0ZpbHRlcjogdGhpcy5nbC5MSU5FQVJcclxuICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpXHJcbiAgICAgICAgaW1nLm9ubG9hZCA9ICgpID0+ICh0aGlzLnRleHR1cmUuaW1hZ2UgPSBpbWcpXHJcbiAgICAgICAgaW1nLmNyb3NzT3JpZ2luID0gXCJBbm9ueW1vdXNcIlxyXG4gICAgICAgIGltZy5zcmMgPSBcInRleHQucG5nXCJcclxuICAgICAgICBcclxuICAgICAgICBsZXQgYTEsIGEyXHJcbiAgICAgICAgdmFyIGltYWdlQXNwZWN0ID0gdGhpcy5pbWdTaXplWzFdIC8gdGhpcy5pbWdTaXplWzBdXHJcblxyXG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJIZWlnaHQgLyB3aW5kb3cuaW5uZXJXaWR0aCA8IGltYWdlQXNwZWN0KSB7XHJcbiAgICAgICAgICAgIGExID0gMVxyXG4gICAgICAgICAgICBhMiA9IHdpbmRvdy5pbm5lckhlaWdodCAvIHdpbmRvdy5pbm5lcldpZHRoIC8gaW1hZ2VBc3BlY3RcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhMSA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCkgKiBpbWFnZUFzcGVjdFxyXG4gICAgICAgICAgICBhMiA9IDFcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7IGExLCBhMiB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNyZWF0ZVNoYWRlcnMoKSB7XHJcbiAgICAgICAgY29uc3QgdGV4dHVyZUFzcGVjdCA9IHRoaXMudXBkYXRlVGV4dHVyZSgpXHJcblxyXG4gICAgICAgIHRoaXMucHJvZ3JhbSA9IG5ldyBvZ2wuUHJvZ3JhbSh0aGlzLmdsLCB7XHJcbiAgICAgICAgICAgIHZlcnRleDogdGhpcy52ZXJ0ZXhTaGFkZXIsXHJcbiAgICAgICAgICAgIGZyYWdtZW50OiB0aGlzLmZyYWdtZW50U2hhZGVyLFxyXG4gICAgICAgICAgICB1bmlmb3Jtczoge1xyXG4gICAgICAgICAgICB1VGltZTogeyB2YWx1ZTogMCB9LFxyXG4gICAgICAgICAgICB0V2F0ZXI6IHsgdmFsdWU6IHRoaXMudGV4dHVyZSB9LFxyXG4gICAgICAgICAgICByZXM6IHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBuZXcgb2dsLlZlYzQod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCwgdGV4dHVyZUFzcGVjdC5hMSwgdGV4dHVyZUFzcGVjdC5hMilcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW1nOiB7IHZhbHVlOiBuZXcgb2dsLlZlYzIodGhpcy5pbWdTaXplWzBdLCB0aGlzLmltZ1NpemVbMV0pIH0sXHJcbiAgICAgICAgICAgIC8vIE5vdGUgdGhhdCB0aGUgdW5pZm9ybSBpcyBhcHBsaWVkIHdpdGhvdXQgdXNpbmcgYW4gb2JqZWN0IGFuZCB2YWx1ZSBwcm9wZXJ0eVxyXG4gICAgICAgICAgICAvLyBUaGlzIGlzIGJlY2F1c2UgdGhlIGNsYXNzIGFsdGVybmF0ZXMgdGhpcyB0ZXh0dXJlIGJldHdlZW4gdHdvIHJlbmRlciB0YXJnZXRzXHJcbiAgICAgICAgICAgIC8vIGFuZCB1cGRhdGVzIHRoZSB2YWx1ZSBwcm9wZXJ0eSBhZnRlciBlYWNoIHJlbmRlci5cclxuICAgICAgICAgICAgdEZsb3c6IHRoaXMuZmxvd21hcC51bmlmb3JtXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZU1lc2goKSB7XHJcbiAgICAgICAgdGhpcy5tZXNoID0gbmV3IG9nbC5NZXNoKHRoaXMuZ2wsIHsgZ2VvbWV0cnk6IHRoaXMuZ2VvbWV0cnksIHByb2dyYW06IHRoaXMucHJvZ3JhbSB9KVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZU1vdXNlKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGlmIChlLmNoYW5nZWRUb3VjaGVzICYmIGUuY2hhbmdlZFRvdWNoZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGUueCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVhcclxuICAgICAgICAgICAgZS55ID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZS54ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZS54ID0gZS5wYWdlWFxyXG4gICAgICAgICAgICBlLnkgPSBlLnBhZ2VZXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEdldCBtb3VzZSB2YWx1ZSBpbiAwIHRvIDEgcmFuZ2UsIHdpdGggeSBmbGlwcGVkXHJcbiAgICAgICAgdGhpcy5tb3VzZS5zZXQoZS54IC8gdGhpcy5nbC5yZW5kZXJlci53aWR0aCwgMS4wIC0gZS55IC8gdGhpcy5nbC5yZW5kZXJlci5oZWlnaHQpO1xyXG5cclxuICAgICAgICAvLyBDYWxjdWxhdGUgdmVsb2NpdHlcclxuICAgICAgICBpZiAoIXRoaXMubGFzdFRpbWUpIHtcclxuICAgICAgICAgICAgLy8gRmlyc3QgZnJhbWVcclxuICAgICAgICAgICAgdGhpcy5sYXN0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpXHJcbiAgICAgICAgICAgIHRoaXMubGFzdE1vdXNlLnNldChlLngsIGUueSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRlbHRhWCA9IGUueCAtIHRoaXMubGFzdE1vdXNlLnhcclxuICAgICAgICBjb25zdCBkZWx0YVkgPSBlLnkgLSB0aGlzLmxhc3RNb3VzZS55XHJcblxyXG4gICAgICAgIHRoaXMubGFzdE1vdXNlLnNldChlLngsIGUueSlcclxuXHJcbiAgICAgICAgbGV0IHRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKVxyXG5cclxuICAgICAgICAvLyBBdm9pZCBkaXZpZGluZyBieSAwXHJcbiAgICAgICAgbGV0IGRlbHRhID0gTWF0aC5tYXgoMTAuNCwgdGltZSAtIHRoaXMubGFzdFRpbWUpXHJcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IHRpbWVcclxuXHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eS54ID0gZGVsdGFYIC8gZGVsdGFcclxuICAgICAgICB0aGlzLnZlbG9jaXR5LnkgPSBkZWx0YVkgLyBkZWx0YVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEZsYWcgdXBkYXRlIHRvIHByZXZlbnQgaGFuZ2luZyB2ZWxvY2l0eSB2YWx1ZXMgd2hlbiBub3QgbW92aW5nXHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eS5uZWVkc1VwZGF0ZSA9IHRydWVcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUodCkge1xyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZSk7XHJcbiAgICBcclxuICAgICAgICAvLyBSZXNldCB2ZWxvY2l0eSB3aGVuIG1vdXNlIG5vdCBtb3ZpbmdcclxuICAgICAgICBpZiAoIXRoaXMudmVsb2NpdHkubmVlZHNVcGRhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5tb3VzZS5zZXQoLTEpXHJcbiAgICAgICAgICAgIHRoaXMudmVsb2NpdHkuc2V0KDApXHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eS5uZWVkc1VwZGF0ZSA9IGZhbHNlXHJcbiAgICBcclxuICAgICAgICAvLyBVcGRhdGUgZmxvd21hcCBpbnB1dHNcclxuICAgICAgICB0aGlzLmZsb3dtYXAuYXNwZWN0ID0gdGhpcy5hc3BlY3RcclxuICAgICAgICB0aGlzLmZsb3dtYXAubW91c2UuY29weSh0aGlzLm1vdXNlKVxyXG4gICAgXHJcbiAgICAgICAgLy8gRWFzZSB2ZWxvY2l0eSBpbnB1dCwgc2xvd2VyIHdoZW4gZmFkaW5nIG91dFxyXG4gICAgICAgIHRoaXMuZmxvd21hcC52ZWxvY2l0eS5sZXJwKHRoaXMudmVsb2NpdHksIHRoaXMudmVsb2NpdHkubGVuID8gMC4xNSA6IDAuMSlcclxuICAgICAgICB0aGlzLmZsb3dtYXAudXBkYXRlKClcclxuICAgIFxyXG4gICAgICAgIHRoaXMucHJvZ3JhbS51bmlmb3Jtcy51VGltZS52YWx1ZSA9IHQgKiAwLjAxXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoeyBzY2VuZTogdGhpcy5tZXNoIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCkge1xyXG4gICAgICAgIHRoaXMuckFGID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlKVxyXG4gICAgfVxyXG5cclxuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKCkge1xyXG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuckFGKVxyXG4gICAgfVxyXG5cclxuICAgIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlKClcclxuICAgICAgXHJcbiAgICAgICAgLy8gQ3JlYXRlIGhhbmRsZXJzIHRvIGdldCBtb3VzZSBwb3NpdGlvbiBhbmQgdmVsb2NpdHlcclxuICAgICAgICBjb25zdCBpc1RvdWNoQ2FwYWJsZSA9IFwib250b3VjaHN0YXJ0XCIgaW4gd2luZG93XHJcbiAgICAgICAgaWYgKGlzVG91Y2hDYXBhYmxlKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLnVwZGF0ZU1vdXNlLCBmYWxzZSlcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgdGhpcy51cGRhdGVNb3VzZSwgeyBwYXNzaXZlOiBmYWxzZSB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMudXBkYXRlTW91c2UsIGZhbHNlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLnJlc2l6ZSwgZmFsc2UpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgICAgIHRoaXMuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5yQUYpXHJcblxyXG4gICAgICAgIGNvbnN0IGlzVG91Y2hDYXBhYmxlID0gXCJvbnRvdWNoc3RhcnRcIiBpbiB3aW5kb3dcclxuICAgICAgICBpZiAoaXNUb3VjaENhcGFibGUpIHtcclxuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMudXBkYXRlTW91c2UsIGZhbHNlKVxyXG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCB0aGlzLnVwZGF0ZU1vdXNlLCB7IHBhc3NpdmU6IGZhbHNlIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy51cGRhdGVNb3VzZSwgZmFsc2UpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCByZXNpemUsIGZhbHNlKVxyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVycygpXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZUdlb21ldHJ5KClcclxuICAgICAgICB0aGlzLmNyZWF0ZVNoYWRlcnMoKVxyXG4gICAgICAgIHRoaXMuY3JlYXRlTWVzaCgpXHJcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpXHJcbiAgICAgICAgdGhpcy5yZXNpemUoKVxyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNvbnN0IG9nbD1mdW5jdGlvbihhKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KGEpe2xldCBiPWFbMF0sYz1hWzFdLGQ9YVsyXTtyZXR1cm4gTWF0aC5zcXJ0KGIqYitjKmMrZCpkKX1mdW5jdGlvbiB1KGEsYil7cmV0dXJuIGFbMF09YlswXSxhWzFdPWJbMV0sYVsyXT1iWzJdLGF9ZnVuY3Rpb24gdihhLGIsYyl7cmV0dXJuIGFbMF09YlswXStjWzBdLGFbMV09YlsxXStjWzFdLGFbMl09YlsyXStjWzJdLGF9ZnVuY3Rpb24gdyhhLGIsYyl7cmV0dXJuIGFbMF09YlswXS1jWzBdLGFbMV09YlsxXS1jWzFdLGFbMl09YlsyXS1jWzJdLGF9ZnVuY3Rpb24geChhLGIsYyl7cmV0dXJuIGFbMF09YlswXSpjLGFbMV09YlsxXSpjLGFbMl09YlsyXSpjLGF9ZnVuY3Rpb24geShjLGEpe2xldCBkPWFbMF0sZT1hWzFdLGY9YVsyXSxiPWQqZCtlKmUrZipmO3JldHVybiBiPjAmJihiPTEvTWF0aC5zcXJ0KGIpKSxjWzBdPWFbMF0qYixjWzFdPWFbMV0qYixjWzJdPWFbMl0qYixjfWZ1bmN0aW9uIHooYSxiKXtyZXR1cm4gYVswXSpiWzBdK2FbMV0qYlsxXSthWzJdKmJbMl19bGV0IEE9ZnVuY3Rpb24oKXtsZXQgYT1bMCwwLDBdLGI9WzAsMCwwXTtyZXR1cm4gZnVuY3Rpb24oZCxlKXt1KGEsZCksdShiLGUpLHkoYSxhKSx5KGIsYik7bGV0IGM9eihhLGIpO3JldHVybiBjPjE/MDpjPCAtMT9NYXRoLlBJOk1hdGguYWNvcyhjKX19KCk7Y2xhc3MgYiBleHRlbmRzIEFycmF5e2NvbnN0cnVjdG9yKGE9MCxiPWEsYz1hKXtyZXR1cm4gc3VwZXIoYSxiLGMpLHRoaXN9Z2V0IHgoKXtyZXR1cm4gdGhpc1swXX1zZXQgeChhKXt0aGlzWzBdPWF9Z2V0IHkoKXtyZXR1cm4gdGhpc1sxXX1zZXQgeShhKXt0aGlzWzFdPWF9Z2V0IHooKXtyZXR1cm4gdGhpc1syXX1zZXQgeihhKXt0aGlzWzJdPWF9c2V0KGEsZj1hLGc9YSl7dmFyIGIsYyxkLGU7cmV0dXJuIGEubGVuZ3RoP3RoaXMuY29weShhKTooYj10aGlzLGM9YSxkPWYsZT1nLGJbMF09YyxiWzFdPWQsYlsyXT1lLHRoaXMpfWNvcHkoYSl7cmV0dXJuIHUodGhpcyxhKSx0aGlzfWFkZChhLGIpe3JldHVybiBiP3YodGhpcyxhLGIpOnYodGhpcyx0aGlzLGEpLHRoaXN9c3ViKGEsYil7cmV0dXJuIGI/dyh0aGlzLGEsYik6dyh0aGlzLHRoaXMsYSksdGhpc31tdWx0aXBseShjKXt2YXIgZCxhLGI7cmV0dXJuIGMubGVuZ3RoPyhhPXRoaXMsYj1jLChkPXRoaXMpWzBdPWFbMF0qYlswXSxkWzFdPWFbMV0qYlsxXSxkWzJdPWFbMl0qYlsyXSk6eCh0aGlzLHRoaXMsYyksdGhpc31kaXZpZGUoYyl7dmFyIGQsYSxiO3JldHVybiBjLmxlbmd0aD8oYT10aGlzLGI9YywoZD10aGlzKVswXT1hWzBdL2JbMF0sZFsxXT1hWzFdL2JbMV0sZFsyXT1hWzJdL2JbMl0pOngodGhpcyx0aGlzLDEvYyksdGhpc31pbnZlcnNlKGM9dGhpcyl7dmFyIGIsYTtyZXR1cm4gYT1jLChiPXRoaXMpWzBdPTEvYVswXSxiWzFdPTEvYVsxXSxiWzJdPTEvYVsyXSx0aGlzfWxlbigpe3JldHVybiB0KHRoaXMpfWRpc3RhbmNlKGYpe3ZhciBhLGI7bGV0IGMsZCxlO3JldHVybiBmPyhhPXRoaXMsYz0oYj1mKVswXS1hWzBdLGQ9YlsxXS1hWzFdLGU9YlsyXS1hWzJdLE1hdGguc3FydChjKmMrZCpkK2UqZSkpOnQodGhpcyl9c3F1YXJlZExlbigpe3JldHVybiB0aGlzLnNxdWFyZWREaXN0YW5jZSgpfXNxdWFyZWREaXN0YW5jZShqKXt2YXIgYSxjLGI7bGV0IGQsZSxmLGcsaCxpO3JldHVybiBqPyhhPXRoaXMsZD0oYz1qKVswXS1hWzBdLGU9Y1sxXS1hWzFdLGY9Y1syXS1hWzJdLGQqZCtlKmUrZipmKTooYj10aGlzLGc9YlswXSxoPWJbMV0saT1iWzJdLGcqZytoKmgraSppKX1uZWdhdGUoYz10aGlzKXt2YXIgYixhO3JldHVybiBhPWMsKGI9dGhpcylbMF09LWFbMF0sYlsxXT0tYVsxXSxiWzJdPS1hWzJdLHRoaXN9Y3Jvc3MoaixrKXt2YXIgYSxiLGM7bGV0IGQsZSxmLGcsaCxpO3JldHVybiBhPXRoaXMsYj1qLGM9ayxkPWJbMF0sZT1iWzFdLGY9YlsyXSxnPWNbMF0saD1jWzFdLGk9Y1syXSxhWzBdPWUqaS1mKmgsYVsxXT1mKmctZCppLGFbMl09ZCpoLWUqZyx0aGlzfXNjYWxlKGEpe3JldHVybiB4KHRoaXMsdGhpcyxhKSx0aGlzfW5vcm1hbGl6ZSgpe3JldHVybiB5KHRoaXMsdGhpcyksdGhpc31kb3QoYSl7cmV0dXJuIHoodGhpcyxhKX1lcXVhbHMoYyl7dmFyIGIsYTtyZXR1cm4gYT1jLChiPXRoaXMpWzBdPT09YVswXSYmYlsxXT09PWFbMV0mJmJbMl09PT1hWzJdfWFwcGx5TWF0cml4NChoKXt2YXIgZixnLGE7bGV0IGMsZCxlLGI7cmV0dXJuIGY9dGhpcyxnPXRoaXMsYT1oLGM9Z1swXSxkPWdbMV0sZT1nWzJdLGI9YVszXSpjK2FbN10qZCthWzExXSplK2FbMTVdLGI9Ynx8MSxmWzBdPShhWzBdKmMrYVs0XSpkK2FbOF0qZSthWzEyXSkvYixmWzFdPShhWzFdKmMrYVs1XSpkK2FbOV0qZSthWzEzXSkvYixmWzJdPShhWzJdKmMrYVs2XSpkK2FbMTBdKmUrYVsxNF0pL2IsdGhpc31hcHBseVF1YXRlcm5pb24ocSl7dmFyIGgsaSxhO2xldCBqLGssbCxiLGMsZCxlLGYsZyxuLG8scCxtO3JldHVybiBoPXRoaXMsaT10aGlzLGE9cSxqPWlbMF0saz1pWzFdLGw9aVsyXSxiPWFbMF0sYz1hWzFdLGQ9YVsyXSxlPWMqbC1kKmssZj1kKmotYipsLGc9YiprLWMqaixuPWMqZy1kKmYsbz1kKmUtYipnLHA9YipmLWMqZSxtPTIqYVszXSxlKj1tLGYqPW0sZyo9bSxuKj0yLG8qPTIscCo9MixoWzBdPWorZStuLGhbMV09aytmK28saFsyXT1sK2crcCx0aGlzfWFuZ2xlKGEpe3JldHVybiBBKHRoaXMsYSl9bGVycChoLGkpe3ZhciBhLGIsYyxkO2xldCBlLGYsZztyZXR1cm4gYT10aGlzLGI9dGhpcyxjPWgsZD1pLGU9YlswXSxmPWJbMV0sZz1iWzJdLGFbMF09ZStkKihjWzBdLWUpLGFbMV09ZitkKihjWzFdLWYpLGFbMl09ZytkKihjWzJdLWcpLHRoaXN9Y2xvbmUoKXtyZXR1cm4gbmV3IGIodGhpc1swXSx0aGlzWzFdLHRoaXNbMl0pfWZyb21BcnJheShhLGI9MCl7cmV0dXJuIHRoaXNbMF09YVtiXSx0aGlzWzFdPWFbYisxXSx0aGlzWzJdPWFbYisyXSx0aGlzfXRvQXJyYXkoYT1bXSxiPTApe3JldHVybiBhW2JdPXRoaXNbMF0sYVtiKzFdPXRoaXNbMV0sYVtiKzJdPXRoaXNbMl0sYX10cmFuc2Zvcm1EaXJlY3Rpb24oYSl7bGV0IGI9dGhpc1swXSxjPXRoaXNbMV0sZD10aGlzWzJdO3JldHVybiB0aGlzWzBdPWFbMF0qYithWzRdKmMrYVs4XSpkLHRoaXNbMV09YVsxXSpiK2FbNV0qYythWzldKmQsdGhpc1syXT1hWzJdKmIrYVs2XSpjK2FbMTBdKmQsdGhpcy5ub3JtYWxpemUoKX19bGV0IEI9bmV3IGIsQz0wLEQ9MDtjbGFzcyBme2NvbnN0cnVjdG9yKGMsYT17fSl7Zm9yKGxldCBiIGluIHRoaXMuZ2w9Yyx0aGlzLmF0dHJpYnV0ZXM9YSx0aGlzLmlkPUMrKyx0aGlzLlZBT3M9e30sdGhpcy5kcmF3UmFuZ2U9e3N0YXJ0OjAsY291bnQ6MH0sdGhpcy5pbnN0YW5jZWRDb3VudD0wLHRoaXMuZ2wucmVuZGVyZXIuYmluZFZlcnRleEFycmF5KG51bGwpLHRoaXMuZ2wucmVuZGVyZXIuY3VycmVudEdlb21ldHJ5PW51bGwsdGhpcy5nbFN0YXRlPXRoaXMuZ2wucmVuZGVyZXIuc3RhdGUsYSl0aGlzLmFkZEF0dHJpYnV0ZShiLGFbYl0pfWFkZEF0dHJpYnV0ZShiLGEpe2lmKHRoaXMuYXR0cmlidXRlc1tiXT1hLGEuaWQ9RCsrLGEuc2l6ZT1hLnNpemV8fDEsYS50eXBlPWEudHlwZXx8KGEuZGF0YS5jb25zdHJ1Y3Rvcj09PUZsb2F0MzJBcnJheT90aGlzLmdsLkZMT0FUOmEuZGF0YS5jb25zdHJ1Y3Rvcj09PVVpbnQxNkFycmF5P3RoaXMuZ2wuVU5TSUdORURfU0hPUlQ6dGhpcy5nbC5VTlNJR05FRF9JTlQpLGEudGFyZ2V0PVwiaW5kZXhcIj09PWI/dGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUjp0aGlzLmdsLkFSUkFZX0JVRkZFUixhLm5vcm1hbGl6ZT1hLm5vcm1hbGl6ZXx8ITEsYS5idWZmZXI9dGhpcy5nbC5jcmVhdGVCdWZmZXIoKSxhLmNvdW50PWEuZGF0YS5sZW5ndGgvYS5zaXplLGEuZGl2aXNvcj1hLmluc3RhbmNlZHx8MCxhLm5lZWRzVXBkYXRlPSExLHRoaXMudXBkYXRlQXR0cmlidXRlKGEpLGEuZGl2aXNvcil7aWYodGhpcy5pc0luc3RhbmNlZD0hMCx0aGlzLmluc3RhbmNlZENvdW50JiZ0aGlzLmluc3RhbmNlZENvdW50IT09YS5jb3VudCphLmRpdmlzb3IpcmV0dXJuIGNvbnNvbGUud2FybihcImdlb21ldHJ5IGhhcyBtdWx0aXBsZSBpbnN0YW5jZWQgYnVmZmVycyBvZiBkaWZmZXJlbnQgbGVuZ3RoXCIpLHRoaXMuaW5zdGFuY2VkQ291bnQ9TWF0aC5taW4odGhpcy5pbnN0YW5jZWRDb3VudCxhLmNvdW50KmEuZGl2aXNvcik7dGhpcy5pbnN0YW5jZWRDb3VudD1hLmNvdW50KmEuZGl2aXNvcn1lbHNlXCJpbmRleFwiPT09Yj90aGlzLmRyYXdSYW5nZS5jb3VudD1hLmNvdW50OnRoaXMuYXR0cmlidXRlcy5pbmRleHx8KHRoaXMuZHJhd1JhbmdlLmNvdW50PU1hdGgubWF4KHRoaXMuZHJhd1JhbmdlLmNvdW50LGEuY291bnQpKX11cGRhdGVBdHRyaWJ1dGUoYSl7dGhpcy5nbFN0YXRlLmJvdW5kQnVmZmVyIT09YS5pZCYmKHRoaXMuZ2wuYmluZEJ1ZmZlcihhLnRhcmdldCxhLmJ1ZmZlciksdGhpcy5nbFN0YXRlLmJvdW5kQnVmZmVyPWEuaWQpLHRoaXMuZ2wuYnVmZmVyRGF0YShhLnRhcmdldCxhLmRhdGEsdGhpcy5nbC5TVEFUSUNfRFJBVyksYS5uZWVkc1VwZGF0ZT0hMX1zZXRJbmRleChhKXt0aGlzLmFkZEF0dHJpYnV0ZShcImluZGV4XCIsYSl9c2V0RHJhd1JhbmdlKGEsYil7dGhpcy5kcmF3UmFuZ2Uuc3RhcnQ9YSx0aGlzLmRyYXdSYW5nZS5jb3VudD1ifXNldEluc3RhbmNlZENvdW50KGEpe3RoaXMuaW5zdGFuY2VkQ291bnQ9YX1jcmVhdGVWQU8oYSl7dGhpcy5WQU9zW2EuYXR0cmlidXRlT3JkZXJdPXRoaXMuZ2wucmVuZGVyZXIuY3JlYXRlVmVydGV4QXJyYXkoKSx0aGlzLmdsLnJlbmRlcmVyLmJpbmRWZXJ0ZXhBcnJheSh0aGlzLlZBT3NbYS5hdHRyaWJ1dGVPcmRlcl0pLHRoaXMuYmluZEF0dHJpYnV0ZXMoYSl9YmluZEF0dHJpYnV0ZXMoYSl7YS5hdHRyaWJ1dGVMb2NhdGlvbnMuZm9yRWFjaCgoYixjKT0+e2lmKCF0aGlzLmF0dHJpYnV0ZXNbY10pcmV0dXJuIHZvaWQgY29uc29sZS53YXJuKGBhY3RpdmUgYXR0cmlidXRlICR7Y30gbm90IGJlaW5nIHN1cHBsaWVkYCk7bGV0IGE9dGhpcy5hdHRyaWJ1dGVzW2NdO3RoaXMuZ2wuYmluZEJ1ZmZlcihhLnRhcmdldCxhLmJ1ZmZlciksdGhpcy5nbFN0YXRlLmJvdW5kQnVmZmVyPWEuaWQsdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGIsYS5zaXplLGEudHlwZSxhLm5vcm1hbGl6ZSwwLDApLHRoaXMuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoYiksdGhpcy5nbC5yZW5kZXJlci52ZXJ0ZXhBdHRyaWJEaXZpc29yKGIsYS5kaXZpc29yKX0pLHRoaXMuYXR0cmlidXRlcy5pbmRleCYmdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsdGhpcy5hdHRyaWJ1dGVzLmluZGV4LmJ1ZmZlcil9ZHJhdyh7cHJvZ3JhbTphLG1vZGU6Yj10aGlzLmdsLlRSSUFOR0xFU30pe3RoaXMuZ2wucmVuZGVyZXIuY3VycmVudEdlb21ldHJ5IT09YCR7dGhpcy5pZH1fJHthLmF0dHJpYnV0ZU9yZGVyfWAmJih0aGlzLlZBT3NbYS5hdHRyaWJ1dGVPcmRlcl18fHRoaXMuY3JlYXRlVkFPKGEpLHRoaXMuZ2wucmVuZGVyZXIuYmluZFZlcnRleEFycmF5KHRoaXMuVkFPc1thLmF0dHJpYnV0ZU9yZGVyXSksdGhpcy5nbC5yZW5kZXJlci5jdXJyZW50R2VvbWV0cnk9YCR7dGhpcy5pZH1fJHthLmF0dHJpYnV0ZU9yZGVyfWApLGEuYXR0cmlidXRlTG9jYXRpb25zLmZvckVhY2goKGMsYik9PntsZXQgYT10aGlzLmF0dHJpYnV0ZXNbYl07YS5uZWVkc1VwZGF0ZSYmdGhpcy51cGRhdGVBdHRyaWJ1dGUoYSl9KSx0aGlzLmlzSW5zdGFuY2VkP3RoaXMuYXR0cmlidXRlcy5pbmRleD90aGlzLmdsLnJlbmRlcmVyLmRyYXdFbGVtZW50c0luc3RhbmNlZChiLHRoaXMuZHJhd1JhbmdlLmNvdW50LHRoaXMuYXR0cmlidXRlcy5pbmRleC50eXBlLHRoaXMuZHJhd1JhbmdlLnN0YXJ0LHRoaXMuaW5zdGFuY2VkQ291bnQpOnRoaXMuZ2wucmVuZGVyZXIuZHJhd0FycmF5c0luc3RhbmNlZChiLHRoaXMuZHJhd1JhbmdlLnN0YXJ0LHRoaXMuZHJhd1JhbmdlLmNvdW50LHRoaXMuaW5zdGFuY2VkQ291bnQpOnRoaXMuYXR0cmlidXRlcy5pbmRleD90aGlzLmdsLmRyYXdFbGVtZW50cyhiLHRoaXMuZHJhd1JhbmdlLmNvdW50LHRoaXMuYXR0cmlidXRlcy5pbmRleC50eXBlLHRoaXMuZHJhd1JhbmdlLnN0YXJ0KTp0aGlzLmdsLmRyYXdBcnJheXMoYix0aGlzLmRyYXdSYW5nZS5zdGFydCx0aGlzLmRyYXdSYW5nZS5jb3VudCl9Y29tcHV0ZUJvdW5kaW5nQm94KGQpeyFkJiZ0aGlzLmF0dHJpYnV0ZXMucG9zaXRpb24mJihkPXRoaXMuYXR0cmlidXRlcy5wb3NpdGlvbi5kYXRhKSxkfHxjb25zb2xlLndhcm4oXCJObyBwb3NpdGlvbiBidWZmZXIgZm91bmQgdG8gY29tcHV0ZSBib3VuZHNcIiksdGhpcy5ib3VuZHN8fCh0aGlzLmJvdW5kcz17bWluOm5ldyBiLG1heDpuZXcgYixjZW50ZXI6bmV3IGIsc2NhbGU6bmV3IGIscmFkaXVzOjEvMH0pO2xldCBhPXRoaXMuYm91bmRzLm1pbixjPXRoaXMuYm91bmRzLm1heCxpPXRoaXMuYm91bmRzLmNlbnRlcixqPXRoaXMuYm91bmRzLnNjYWxlO2Euc2V0KDEvMCksYy5zZXQoLTEvMCk7Zm9yKGxldCBlPTAsaz1kLmxlbmd0aDtlPGs7ZSs9Myl7bGV0IGY9ZFtlXSxnPWRbZSsxXSxoPWRbZSsyXTthLng9TWF0aC5taW4oZixhLngpLGEueT1NYXRoLm1pbihnLGEueSksYS56PU1hdGgubWluKGgsYS56KSxjLng9TWF0aC5tYXgoZixjLngpLGMueT1NYXRoLm1heChnLGMueSksYy56PU1hdGgubWF4KGgsYy56KX1qLnN1YihjLGEpLGkuYWRkKGEsYykuZGl2aWRlKDIpfWNvbXB1dGVCb3VuZGluZ1NwaGVyZShhKXshYSYmdGhpcy5hdHRyaWJ1dGVzLnBvc2l0aW9uJiYoYT10aGlzLmF0dHJpYnV0ZXMucG9zaXRpb24uZGF0YSksYXx8Y29uc29sZS53YXJuKFwiTm8gcG9zaXRpb24gYnVmZmVyIGZvdW5kIHRvIGNvbXB1dGUgYm91bmRzXCIpLHRoaXMuYm91bmRzfHx0aGlzLmNvbXB1dGVCb3VuZGluZ0JveChhKTtsZXQgYj0wO2ZvcihsZXQgYz0wLGQ9YS5sZW5ndGg7YzxkO2MrPTMpQi5mcm9tQXJyYXkoYSxjKSxiPU1hdGgubWF4KGIsdGhpcy5ib3VuZHMuY2VudGVyLnNxdWFyZWREaXN0YW5jZShCKSk7dGhpcy5ib3VuZHMucmFkaXVzPU1hdGguc3FydChiKX1yZW1vdmUoKXtmb3IobGV0IGEgaW4gdGhpcy52YW8mJnRoaXMuZ2wucmVuZGVyZXIuZGVsZXRlVmVydGV4QXJyYXkodGhpcy52YW8pLHRoaXMuYXR0cmlidXRlcyl0aGlzLmdsLmRlbGV0ZUJ1ZmZlcih0aGlzLmF0dHJpYnV0ZXNbYV0uYnVmZmVyKSxkZWxldGUgdGhpcy5hdHRyaWJ1dGVzW2FdfX1sZXQgRT0wLEY9e307Y2xhc3MgaHtjb25zdHJ1Y3RvcihhLHt2ZXJ0ZXg6ZixmcmFnbWVudDpnLHVuaWZvcm1zOm09e30sdHJhbnNwYXJlbnQ6bj0hMSxjdWxsRmFjZTpvPWEuQkFDSyxmcm9udEZhY2U6cD1hLkNDVyxkZXB0aFRlc3Q6cT0hMCxkZXB0aFdyaXRlOnI9ITAsZGVwdGhGdW5jOnM9YS5MRVNTfT17fSl7dGhpcy5nbD1hLHRoaXMudW5pZm9ybXM9bSx0aGlzLmlkPUUrKyxmfHxjb25zb2xlLndhcm4oXCJ2ZXJ0ZXggc2hhZGVyIG5vdCBzdXBwbGllZFwiKSxnfHxjb25zb2xlLndhcm4oXCJmcmFnbWVudCBzaGFkZXIgbm90IHN1cHBsaWVkXCIpLHRoaXMudHJhbnNwYXJlbnQ9bix0aGlzLmN1bGxGYWNlPW8sdGhpcy5mcm9udEZhY2U9cCx0aGlzLmRlcHRoVGVzdD1xLHRoaXMuZGVwdGhXcml0ZT1yLHRoaXMuZGVwdGhGdW5jPXMsdGhpcy5ibGVuZEZ1bmM9e30sdGhpcy5ibGVuZEVxdWF0aW9uPXt9LHRoaXMudHJhbnNwYXJlbnQmJiF0aGlzLmJsZW5kRnVuYy5zcmMmJih0aGlzLmdsLnJlbmRlcmVyLnByZW11bHRpcGxpZWRBbHBoYT90aGlzLnNldEJsZW5kRnVuYyh0aGlzLmdsLk9ORSx0aGlzLmdsLk9ORV9NSU5VU19TUkNfQUxQSEEpOnRoaXMuc2V0QmxlbmRGdW5jKHRoaXMuZ2wuU1JDX0FMUEhBLHRoaXMuZ2wuT05FX01JTlVTX1NSQ19BTFBIQSkpO2xldCBkPWEuY3JlYXRlU2hhZGVyKGEuVkVSVEVYX1NIQURFUik7YS5zaGFkZXJTb3VyY2UoZCxmKSxhLmNvbXBpbGVTaGFkZXIoZCksXCJcIiE9PWEuZ2V0U2hhZGVySW5mb0xvZyhkKSYmY29uc29sZS53YXJuKGAke2EuZ2V0U2hhZGVySW5mb0xvZyhkKX1cclxuVmVydGV4IFNoYWRlclxyXG4ke0goZil9YCk7bGV0IGU9YS5jcmVhdGVTaGFkZXIoYS5GUkFHTUVOVF9TSEFERVIpO2lmKGEuc2hhZGVyU291cmNlKGUsZyksYS5jb21waWxlU2hhZGVyKGUpLFwiXCIhPT1hLmdldFNoYWRlckluZm9Mb2coZSkmJmNvbnNvbGUud2FybihgJHthLmdldFNoYWRlckluZm9Mb2coZSl9XHJcbkZyYWdtZW50IFNoYWRlclxyXG4ke0goZyl9YCksdGhpcy5wcm9ncmFtPWEuY3JlYXRlUHJvZ3JhbSgpLGEuYXR0YWNoU2hhZGVyKHRoaXMucHJvZ3JhbSxkKSxhLmF0dGFjaFNoYWRlcih0aGlzLnByb2dyYW0sZSksYS5saW5rUHJvZ3JhbSh0aGlzLnByb2dyYW0pLCFhLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5wcm9ncmFtLGEuTElOS19TVEFUVVMpKXJldHVybiBjb25zb2xlLndhcm4oYS5nZXRQcm9ncmFtSW5mb0xvZyh0aGlzLnByb2dyYW0pKTthLmRlbGV0ZVNoYWRlcihkKSxhLmRlbGV0ZVNoYWRlcihlKSx0aGlzLnVuaWZvcm1Mb2NhdGlvbnM9bmV3IE1hcDtsZXQgdD1hLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5wcm9ncmFtLGEuQUNUSVZFX1VOSUZPUk1TKTtmb3IobGV0IGg9MDtoPHQ7aCsrKXtsZXQgYj1hLmdldEFjdGl2ZVVuaWZvcm0odGhpcy5wcm9ncmFtLGgpO3RoaXMudW5pZm9ybUxvY2F0aW9ucy5zZXQoYixhLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnByb2dyYW0sYi5uYW1lKSk7bGV0IGM9Yi5uYW1lLm1hdGNoKC8oXFx3KykvZyk7Yi51bmlmb3JtTmFtZT1jWzBdLDM9PT1jLmxlbmd0aD8oYi5pc1N0cnVjdEFycmF5PSEwLGIuc3RydWN0SW5kZXg9TnVtYmVyKGNbMV0pLGIuc3RydWN0UHJvcGVydHk9Y1syXSk6Mj09PWMubGVuZ3RoJiZpc05hTihOdW1iZXIoY1sxXSkpJiYoYi5pc1N0cnVjdD0hMCxiLnN0cnVjdFByb3BlcnR5PWNbMV0pfXRoaXMuYXR0cmlidXRlTG9jYXRpb25zPW5ldyBNYXA7bGV0IGs9W10sdT1hLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5wcm9ncmFtLGEuQUNUSVZFX0FUVFJJQlVURVMpO2ZvcihsZXQgaT0wO2k8dTtpKyspe2xldCBqPWEuZ2V0QWN0aXZlQXR0cmliKHRoaXMucHJvZ3JhbSxpKSxsPWEuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5wcm9ncmFtLGoubmFtZSk7a1tsXT1qLm5hbWUsdGhpcy5hdHRyaWJ1dGVMb2NhdGlvbnMuc2V0KGoubmFtZSxsKX10aGlzLmF0dHJpYnV0ZU9yZGVyPWsuam9pbihcIlwiKX1zZXRCbGVuZEZ1bmMoYSxiLGMsZCl7dGhpcy5ibGVuZEZ1bmMuc3JjPWEsdGhpcy5ibGVuZEZ1bmMuZHN0PWIsdGhpcy5ibGVuZEZ1bmMuc3JjQWxwaGE9Yyx0aGlzLmJsZW5kRnVuYy5kc3RBbHBoYT1kLGEmJih0aGlzLnRyYW5zcGFyZW50PSEwKX1zZXRCbGVuZEVxdWF0aW9uKGEsYil7dGhpcy5ibGVuZEVxdWF0aW9uLm1vZGVSR0I9YSx0aGlzLmJsZW5kRXF1YXRpb24ubW9kZUFscGhhPWJ9YXBwbHlTdGF0ZSgpe3RoaXMuZGVwdGhUZXN0P3RoaXMuZ2wucmVuZGVyZXIuZW5hYmxlKHRoaXMuZ2wuREVQVEhfVEVTVCk6dGhpcy5nbC5yZW5kZXJlci5kaXNhYmxlKHRoaXMuZ2wuREVQVEhfVEVTVCksdGhpcy5jdWxsRmFjZT90aGlzLmdsLnJlbmRlcmVyLmVuYWJsZSh0aGlzLmdsLkNVTExfRkFDRSk6dGhpcy5nbC5yZW5kZXJlci5kaXNhYmxlKHRoaXMuZ2wuQ1VMTF9GQUNFKSx0aGlzLmJsZW5kRnVuYy5zcmM/dGhpcy5nbC5yZW5kZXJlci5lbmFibGUodGhpcy5nbC5CTEVORCk6dGhpcy5nbC5yZW5kZXJlci5kaXNhYmxlKHRoaXMuZ2wuQkxFTkQpLHRoaXMuY3VsbEZhY2UmJnRoaXMuZ2wucmVuZGVyZXIuc2V0Q3VsbEZhY2UodGhpcy5jdWxsRmFjZSksdGhpcy5nbC5yZW5kZXJlci5zZXRGcm9udEZhY2UodGhpcy5mcm9udEZhY2UpLHRoaXMuZ2wucmVuZGVyZXIuc2V0RGVwdGhNYXNrKHRoaXMuZGVwdGhXcml0ZSksdGhpcy5nbC5yZW5kZXJlci5zZXREZXB0aEZ1bmModGhpcy5kZXB0aEZ1bmMpLHRoaXMuYmxlbmRGdW5jLnNyYyYmdGhpcy5nbC5yZW5kZXJlci5zZXRCbGVuZEZ1bmModGhpcy5ibGVuZEZ1bmMuc3JjLHRoaXMuYmxlbmRGdW5jLmRzdCx0aGlzLmJsZW5kRnVuYy5zcmNBbHBoYSx0aGlzLmJsZW5kRnVuYy5kc3RBbHBoYSksdGhpcy5ibGVuZEVxdWF0aW9uLm1vZGVSR0ImJnRoaXMuZ2wucmVuZGVyZXIuc2V0QmxlbmRFcXVhdGlvbih0aGlzLmJsZW5kRXF1YXRpb24ubW9kZVJHQix0aGlzLmJsZW5kRXF1YXRpb24ubW9kZUFscGhhKX11c2Uoe2ZsaXBGYWNlczphPSExfT17fSl7bGV0IGI9LTE7dGhpcy5nbC5yZW5kZXJlci5jdXJyZW50UHJvZ3JhbT09PXRoaXMuaWR8fCh0aGlzLmdsLnVzZVByb2dyYW0odGhpcy5wcm9ncmFtKSx0aGlzLmdsLnJlbmRlcmVyLmN1cnJlbnRQcm9ncmFtPXRoaXMuaWQpLHRoaXMudW5pZm9ybUxvY2F0aW9ucy5mb3JFYWNoKChlLGMpPT57bGV0IGQ9Yy51bmlmb3JtTmFtZSxhPXRoaXMudW5pZm9ybXNbZF07aWYoYy5pc1N0cnVjdCYmKGE9YVtjLnN0cnVjdFByb3BlcnR5XSxkKz1gLiR7Yy5zdHJ1Y3RQcm9wZXJ0eX1gKSxjLmlzU3RydWN0QXJyYXkmJihhPWFbYy5zdHJ1Y3RJbmRleF1bYy5zdHJ1Y3RQcm9wZXJ0eV0sZCs9YFske2Muc3RydWN0SW5kZXh9XS4ke2Muc3RydWN0UHJvcGVydHl9YCksIWEpcmV0dXJuIEooYEFjdGl2ZSB1bmlmb3JtICR7ZH0gaGFzIG5vdCBiZWVuIHN1cHBsaWVkYCk7aWYoYSYmIHZvaWQgMD09PWEudmFsdWUpcmV0dXJuIEooYCR7ZH0gdW5pZm9ybSBpcyBtaXNzaW5nIGEgdmFsdWUgcGFyYW1ldGVyYCk7aWYoYS52YWx1ZS50ZXh0dXJlKXJldHVybiBiKz0xLGEudmFsdWUudXBkYXRlKGIpLEcodGhpcy5nbCxjLnR5cGUsZSxiKTtpZihhLnZhbHVlLmxlbmd0aCYmYS52YWx1ZVswXS50ZXh0dXJlKXtsZXQgZj1bXTtyZXR1cm4gYS52YWx1ZS5mb3JFYWNoKGE9PntiKz0xLGEudXBkYXRlKGIpLGYucHVzaChiKX0pLEcodGhpcy5nbCxjLnR5cGUsZSxmKX1HKHRoaXMuZ2wsYy50eXBlLGUsYS52YWx1ZSl9KSx0aGlzLmFwcGx5U3RhdGUoKSxhJiZ0aGlzLmdsLnJlbmRlcmVyLnNldEZyb250RmFjZSh0aGlzLmZyb250RmFjZT09PXRoaXMuZ2wuQ0NXP3RoaXMuZ2wuQ1c6dGhpcy5nbC5DQ1cpfXJlbW92ZSgpe3RoaXMuZ2wuZGVsZXRlUHJvZ3JhbSh0aGlzLnByb2dyYW0pfX1mdW5jdGlvbiBHKGIsZSxjLGEpe2E9YS5sZW5ndGg/ZnVuY3Rpb24oYSl7bGV0IGY9YS5sZW5ndGgsZD1hWzBdLmxlbmd0aDtpZih2b2lkIDA9PT1kKXJldHVybiBhO2xldCBlPWYqZCxiPUZbZV07Ynx8KEZbZV09Yj1uZXcgRmxvYXQzMkFycmF5KGUpKTtmb3IobGV0IGM9MDtjPGY7YysrKWIuc2V0KGFbY10sYypkKTtyZXR1cm4gYn0oYSk6YTtsZXQgZD1iLnJlbmRlcmVyLnN0YXRlLnVuaWZvcm1Mb2NhdGlvbnMuZ2V0KGMpO2lmKGEubGVuZ3RoKXtpZih2b2lkIDA9PT1kKWIucmVuZGVyZXIuc3RhdGUudW5pZm9ybUxvY2F0aW9ucy5zZXQoYyxhLnNsaWNlKDApKTtlbHNle2lmKGZ1bmN0aW9uKGIsYyl7aWYoYi5sZW5ndGghPT1jLmxlbmd0aClyZXR1cm4hMTtmb3IobGV0IGE9MCxkPWIubGVuZ3RoO2E8ZDthKyspaWYoYlthXSE9PWNbYV0pcmV0dXJuITE7cmV0dXJuITB9KGQsYSkpcmV0dXJuO2Quc2V0KGEpLGIucmVuZGVyZXIuc3RhdGUudW5pZm9ybUxvY2F0aW9ucy5zZXQoYyxkKX19ZWxzZXtpZihkPT09YSlyZXR1cm47Yi5yZW5kZXJlci5zdGF0ZS51bmlmb3JtTG9jYXRpb25zLnNldChjLGEpfXN3aXRjaChlKXtjYXNlIDUxMjY6cmV0dXJuIGEubGVuZ3RoP2IudW5pZm9ybTFmdihjLGEpOmIudW5pZm9ybTFmKGMsYSk7Y2FzZSAzNTY2NDpyZXR1cm4gYi51bmlmb3JtMmZ2KGMsYSk7Y2FzZSAzNTY2NTpyZXR1cm4gYi51bmlmb3JtM2Z2KGMsYSk7Y2FzZSAzNTY2NjpyZXR1cm4gYi51bmlmb3JtNGZ2KGMsYSk7Y2FzZSAzNTY3MDpjYXNlIDUxMjQ6Y2FzZSAzNTY3ODpjYXNlIDM1NjgwOnJldHVybiBhLmxlbmd0aD9iLnVuaWZvcm0xaXYoYyxhKTpiLnVuaWZvcm0xaShjLGEpO2Nhc2UgMzU2NzE6Y2FzZSAzNTY2NzpyZXR1cm4gYi51bmlmb3JtMml2KGMsYSk7Y2FzZSAzNTY3MjpjYXNlIDM1NjY4OnJldHVybiBiLnVuaWZvcm0zaXYoYyxhKTtjYXNlIDM1NjczOmNhc2UgMzU2Njk6cmV0dXJuIGIudW5pZm9ybTRpdihjLGEpO2Nhc2UgMzU2NzQ6cmV0dXJuIGIudW5pZm9ybU1hdHJpeDJmdihjLCExLGEpO2Nhc2UgMzU2NzU6cmV0dXJuIGIudW5pZm9ybU1hdHJpeDNmdihjLCExLGEpO2Nhc2UgMzU2NzY6cmV0dXJuIGIudW5pZm9ybU1hdHJpeDRmdihjLCExLGEpfX1mdW5jdGlvbiBIKGMpe2xldCBiPWMuc3BsaXQoXCJcXG5cIik7Zm9yKGxldCBhPTA7YTxiLmxlbmd0aDthKyspYlthXT1hKzErXCI6IFwiK2JbYV07cmV0dXJuIGIuam9pbihcIlxcblwiKX1sZXQgST0wO2Z1bmN0aW9uIEooYSl7ST4xMDB8fChjb25zb2xlLndhcm4oYSksKytJPjEwMCYmY29uc29sZS53YXJuKFwiTW9yZSB0aGFuIDEwMCBwcm9ncmFtIHdhcm5pbmdzIC0gc3RvcHBpbmcgbG9ncy5cIikpfWxldCBLPW5ldyBiO2Z1bmN0aW9uIGkoYSxiKXtyZXR1cm4gYVswXT1iWzBdLGFbMV09YlsxXSxhWzJdPWJbMl0sYVszXT1iWzNdLGF9ZnVuY3Rpb24gaihhLGIsYyxkLGUpe3JldHVybiBhWzBdPWIsYVsxXT1jLGFbMl09ZCxhWzNdPWUsYX1mdW5jdGlvbiBrKGIsYyl7bGV0IGQ9Y1swXSxlPWNbMV0sZj1jWzJdLGc9Y1szXSxhPWQqZCtlKmUrZipmK2cqZztyZXR1cm4gYT4wJiYoYT0xL01hdGguc3FydChhKSksYlswXT1kKmEsYlsxXT1lKmEsYlsyXT1mKmEsYlszXT1nKmEsYn1mdW5jdGlvbiBMKGEsYixjKXtsZXQgZD1iWzBdLGU9YlsxXSxmPWJbMl0sZz1iWzNdLGg9Y1swXSxpPWNbMV0saj1jWzJdLGs9Y1szXTtyZXR1cm4gYVswXT1kKmsrZypoK2Uqai1mKmksYVsxXT1lKmsrZyppK2YqaC1kKmosYVsyXT1mKmsrZypqK2QqaS1lKmgsYVszXT1nKmstZCpoLWUqaS1mKmosYX1sZXQgTT1pLF89aixOPWs7Y2xhc3MgZCBleHRlbmRzIEFycmF5e2NvbnN0cnVjdG9yKGE9MCxiPTAsYz0wLGQ9MSl7cmV0dXJuIHN1cGVyKGEsYixjLGQpLHRoaXMub25DaGFuZ2U9KCk9Pnt9LHRoaXN9Z2V0IHgoKXtyZXR1cm4gdGhpc1swXX1zZXQgeChhKXt0aGlzWzBdPWEsdGhpcy5vbkNoYW5nZSgpfWdldCB5KCl7cmV0dXJuIHRoaXNbMV19c2V0IHkoYSl7dGhpc1sxXT1hLHRoaXMub25DaGFuZ2UoKX1nZXQgeigpe3JldHVybiB0aGlzWzJdfXNldCB6KGEpe3RoaXNbMl09YSx0aGlzLm9uQ2hhbmdlKCl9Z2V0IHcoKXtyZXR1cm4gdGhpc1szXX1zZXQgdyhhKXt0aGlzWzNdPWEsdGhpcy5vbkNoYW5nZSgpfWlkZW50aXR5KCl7dmFyIGE7cmV0dXJuKGE9dGhpcylbMF09MCxhWzFdPTAsYVsyXT0wLGFbM109MSx0aGlzLm9uQ2hhbmdlKCksdGhpc31zZXQoYSxiLGMsZCl7cmV0dXJuIGEubGVuZ3RoP3RoaXMuY29weShhKTooXyh0aGlzLGEsYixjLGQpLHRoaXMub25DaGFuZ2UoKSx0aGlzKX1yb3RhdGVYKGope3ZhciBhLGIsZTtsZXQgZixnLGgsaSxjLGQ7cmV0dXJuIGE9dGhpcyxiPXRoaXMsZT1qLGUqPS41LGY9YlswXSxnPWJbMV0saD1iWzJdLGk9YlszXSxjPU1hdGguc2luKGUpLGQ9TWF0aC5jb3MoZSksYVswXT1mKmQraSpjLGFbMV09ZypkK2gqYyxhWzJdPWgqZC1nKmMsYVszXT1pKmQtZipjLHRoaXMub25DaGFuZ2UoKSx0aGlzfXJvdGF0ZVkoail7dmFyIGEsYixlO2xldCBmLGcsaCxpLGMsZDtyZXR1cm4gYT10aGlzLGI9dGhpcyxlPWosZSo9LjUsZj1iWzBdLGc9YlsxXSxoPWJbMl0saT1iWzNdLGM9TWF0aC5zaW4oZSksZD1NYXRoLmNvcyhlKSxhWzBdPWYqZC1oKmMsYVsxXT1nKmQraSpjLGFbMl09aCpkK2YqYyxhWzNdPWkqZC1nKmMsdGhpcy5vbkNoYW5nZSgpLHRoaXN9cm90YXRlWihqKXt2YXIgYSxiLGU7bGV0IGYsZyxoLGksYyxkO3JldHVybiBhPXRoaXMsYj10aGlzLGU9aixlKj0uNSxmPWJbMF0sZz1iWzFdLGg9YlsyXSxpPWJbM10sYz1NYXRoLnNpbihlKSxkPU1hdGguY29zKGUpLGFbMF09ZipkK2cqYyxhWzFdPWcqZC1mKmMsYVsyXT1oKmQraSpjLGFbM109aSpkLWgqYyx0aGlzLm9uQ2hhbmdlKCksdGhpc31pbnZlcnNlKGk9dGhpcyl7dmFyIGEsYztsZXQgZCxlLGYsZyxoLGI7cmV0dXJuIGE9dGhpcyxkPShjPWkpWzBdLGU9Y1sxXSxmPWNbMl0sZz1jWzNdLGg9ZCpkK2UqZStmKmYrZypnLGI9aD8xL2g6MCxhWzBdPS1kKmIsYVsxXT0tZSpiLGFbMl09LWYqYixhWzNdPWcqYix0aGlzLm9uQ2hhbmdlKCksdGhpc31jb25qdWdhdGUoYz10aGlzKXt2YXIgYixhO3JldHVybiBhPWMsKGI9dGhpcylbMF09LWFbMF0sYlsxXT0tYVsxXSxiWzJdPS1hWzJdLGJbM109YVszXSx0aGlzLm9uQ2hhbmdlKCksdGhpc31jb3B5KGEpe3JldHVybiBNKHRoaXMsYSksdGhpcy5vbkNoYW5nZSgpLHRoaXN9bm9ybWFsaXplKGE9dGhpcyl7cmV0dXJuIE4odGhpcyxhKSx0aGlzLm9uQ2hhbmdlKCksdGhpc31tdWx0aXBseShhLGIpe3JldHVybiBiP0wodGhpcyxhLGIpOkwodGhpcyx0aGlzLGEpLHRoaXMub25DaGFuZ2UoKSx0aGlzfWRvdChjKXt2YXIgYSxiO3JldHVybiBhPXRoaXMsYj1jLGFbMF0qYlswXSthWzFdKmJbMV0rYVsyXSpiWzJdK2FbM10qYlszXX1mcm9tTWF0cml4MyhhKXtyZXR1cm4gZnVuY3Rpb24oZCxhKXtsZXQgYixnPWFbMF0rYVs0XSthWzhdO2lmKGc+MCliPU1hdGguc3FydChnKzEpLGRbM109LjUqYixiPS41L2IsZFswXT0oYVs1XS1hWzddKSpiLGRbMV09KGFbNl0tYVsyXSkqYixkWzJdPShhWzFdLWFbM10pKmI7ZWxzZXtsZXQgYz0wO2FbNF0+YVswXSYmKGM9MSksYVs4XT5hWzMqYytjXSYmKGM9Mik7bGV0IGU9KGMrMSklMyxmPShjKzIpJTM7Yj1NYXRoLnNxcnQoYVszKmMrY10tYVszKmUrZV0tYVszKmYrZl0rMSksZFtjXT0uNSpiLGI9LjUvYixkWzNdPShhWzMqZStmXS1hWzMqZitlXSkqYixkW2VdPShhWzMqZStjXSthWzMqYytlXSkqYixkW2ZdPShhWzMqZitjXSthWzMqYytmXSkqYn19KHRoaXMsYSksdGhpcy5vbkNoYW5nZSgpLHRoaXN9ZnJvbUV1bGVyKGEpe3JldHVybiBmdW5jdGlvbihhLGgsaT1cIllYWlwiKXtsZXQgYj1NYXRoLnNpbiguNSpoWzBdKSxjPU1hdGguY29zKC41KmhbMF0pLGQ9TWF0aC5zaW4oLjUqaFsxXSksZT1NYXRoLmNvcyguNSpoWzFdKSxmPU1hdGguc2luKC41KmhbMl0pLGc9TWF0aC5jb3MoLjUqaFsyXSk7XCJYWVpcIj09PWk/KGFbMF09YiplKmcrYypkKmYsYVsxXT1jKmQqZy1iKmUqZixhWzJdPWMqZSpmK2IqZCpnLGFbM109YyplKmctYipkKmYpOlwiWVhaXCI9PT1pPyhhWzBdPWIqZSpnK2MqZCpmLGFbMV09YypkKmctYiplKmYsYVsyXT1jKmUqZi1iKmQqZyxhWzNdPWMqZSpnK2IqZCpmKTpcIlpYWVwiPT09aT8oYVswXT1iKmUqZy1jKmQqZixhWzFdPWMqZCpnK2IqZSpmLGFbMl09YyplKmYrYipkKmcsYVszXT1jKmUqZy1iKmQqZik6XCJaWVhcIj09PWk/KGFbMF09YiplKmctYypkKmYsYVsxXT1jKmQqZytiKmUqZixhWzJdPWMqZSpmLWIqZCpnLGFbM109YyplKmcrYipkKmYpOlwiWVpYXCI9PT1pPyhhWzBdPWIqZSpnK2MqZCpmLGFbMV09YypkKmcrYiplKmYsYVsyXT1jKmUqZi1iKmQqZyxhWzNdPWMqZSpnLWIqZCpmKTpcIlhaWVwiPT09aSYmKGFbMF09YiplKmctYypkKmYsYVsxXT1jKmQqZy1iKmUqZixhWzJdPWMqZSpmK2IqZCpnLGFbM109YyplKmcrYipkKmYpfSh0aGlzLGEsYS5vcmRlciksdGhpc31mcm9tQXhpc0FuZ2xlKGUsZil7dmFyIGEsYixkO2xldCBjO3JldHVybiBhPXRoaXMsYj1lLGQ9ZixjPU1hdGguc2luKGQqPS41KSxhWzBdPWMqYlswXSxhWzFdPWMqYlsxXSxhWzJdPWMqYlsyXSxhWzNdPU1hdGguY29zKGQpLHRoaXN9c2xlcnAocixzKXt2YXIgYyxkLGUsZjtsZXQgbCxnLG0sYSxiLG4sbyxwLHEsaCxpLGosaztyZXR1cm4gYz10aGlzLGQ9dGhpcyxlPXIsZj1zLG49ZFswXSxvPWRbMV0scD1kWzJdLHE9ZFszXSxoPWVbMF0saT1lWzFdLGo9ZVsyXSxrPWVbM10sKGc9bipoK28qaStwKmorcSprKTwwJiYoZz0tZyxoPS1oLGk9LWksaj0taixrPS1rKSwxLWc+MWUtNj8obD1NYXRoLmFjb3MoZyksbT1NYXRoLnNpbihsKSxhPU1hdGguc2luKCgxLWYpKmwpL20sYj1NYXRoLnNpbihmKmwpL20pOihhPTEtZixiPWYpLGNbMF09YSpuK2IqaCxjWzFdPWEqbytiKmksY1syXT1hKnArYipqLGNbM109YSpxK2Iqayx0aGlzfWZyb21BcnJheShhLGI9MCl7cmV0dXJuIHRoaXNbMF09YVtiXSx0aGlzWzFdPWFbYisxXSx0aGlzWzJdPWFbYisyXSx0aGlzWzNdPWFbYiszXSx0aGlzfXRvQXJyYXkoYT1bXSxiPTApe3JldHVybiBhW2JdPXRoaXNbMF0sYVtiKzFdPXRoaXNbMV0sYVtiKzJdPXRoaXNbMl0sYVtiKzNdPXRoaXNbM10sYX19ZnVuY3Rpb24gTyhlLGYsZyl7bGV0IGg9ZlswXSxpPWZbMV0saj1mWzJdLGs9ZlszXSxsPWZbNF0sbT1mWzVdLG49Zls2XSxvPWZbN10scD1mWzhdLHE9Zls5XSxyPWZbMTBdLHM9ZlsxMV0sdD1mWzEyXSx1PWZbMTNdLHY9ZlsxNF0sdz1mWzE1XSxhPWdbMF0sYj1nWzFdLGM9Z1syXSxkPWdbM107cmV0dXJuIGVbMF09YSpoK2IqbCtjKnArZCp0LGVbMV09YSppK2IqbStjKnErZCp1LGVbMl09YSpqK2IqbitjKnIrZCp2LGVbM109YSprK2IqbytjKnMrZCp3LGE9Z1s0XSxiPWdbNV0sYz1nWzZdLGQ9Z1s3XSxlWzRdPWEqaCtiKmwrYypwK2QqdCxlWzVdPWEqaStiKm0rYypxK2QqdSxlWzZdPWEqaitiKm4rYypyK2QqdixlWzddPWEqaytiKm8rYypzK2QqdyxhPWdbOF0sYj1nWzldLGM9Z1sxMF0sZD1nWzExXSxlWzhdPWEqaCtiKmwrYypwK2QqdCxlWzldPWEqaStiKm0rYypxK2QqdSxlWzEwXT1hKmorYipuK2MqcitkKnYsZVsxMV09YSprK2IqbytjKnMrZCp3LGE9Z1sxMl0sYj1nWzEzXSxjPWdbMTRdLGQ9Z1sxNV0sZVsxMl09YSpoK2IqbCtjKnArZCp0LGVbMTNdPWEqaStiKm0rYypxK2QqdSxlWzE0XT1hKmorYipuK2MqcitkKnYsZVsxNV09YSprK2IqbytjKnMrZCp3LGV9Y2xhc3MgYyBleHRlbmRzIEFycmF5e2NvbnN0cnVjdG9yKGE9MSxiPTAsYz0wLGQ9MCxlPTAsZj0xLGc9MCxoPTAsaT0wLGo9MCxrPTEsbD0wLG09MCxuPTAsbz0wLHA9MSl7cmV0dXJuIHN1cGVyKGEsYixjLGQsZSxmLGcsaCxpLGosayxsLG0sbixvLHApLHRoaXN9c2V0IHgoYSl7dGhpc1sxMl09YX1nZXQgeCgpe3JldHVybiB0aGlzWzEyXX1zZXQgeShhKXt0aGlzWzEzXT1hfWdldCB5KCl7cmV0dXJuIHRoaXNbMTNdfXNldCB6KGEpe3RoaXNbMTRdPWF9Z2V0IHooKXtyZXR1cm4gdGhpc1sxNF19c2V0IHcoYSl7dGhpc1sxNV09YX1nZXQgdygpe3JldHVybiB0aGlzWzE1XX1zZXQoYixzLHQsdSx2LHcseCx5LHosQSxCLEMsRCxFLEYsRyl7dmFyIGEsYyxkLGUsZixnLGgsaSxqLGssbCxtLG4sbyxwLHEscjtyZXR1cm4gYi5sZW5ndGg/dGhpcy5jb3B5KGIpOihhPXRoaXMsYz1iLGQ9cyxlPXQsZj11LGc9dixoPXcsaT14LGo9eSxrPXosbD1BLG09QixuPUMsbz1ELHA9RSxxPUYscj1HLGFbMF09YyxhWzFdPWQsYVsyXT1lLGFbM109ZixhWzRdPWcsYVs1XT1oLGFbNl09aSxhWzddPWosYVs4XT1rLGFbOV09bCxhWzEwXT1tLGFbMTFdPW4sYVsxMl09byxhWzEzXT1wLGFbMTRdPXEsYVsxNV09cix0aGlzKX10cmFuc2xhdGUocyx0PXRoaXMpe3ZhciBiLGEsZjtsZXQgZyxoLGksaixrLGwsbSxuLG8scCxxLHIsYyxkLGU7cmV0dXJuIGI9dGhpcyxhPXQsYz0oZj1zKVswXSxkPWZbMV0sZT1mWzJdLGE9PT1iPyhiWzEyXT1hWzBdKmMrYVs0XSpkK2FbOF0qZSthWzEyXSxiWzEzXT1hWzFdKmMrYVs1XSpkK2FbOV0qZSthWzEzXSxiWzE0XT1hWzJdKmMrYVs2XSpkK2FbMTBdKmUrYVsxNF0sYlsxNV09YVszXSpjK2FbN10qZCthWzExXSplK2FbMTVdKTooZz1hWzBdLGg9YVsxXSxpPWFbMl0saj1hWzNdLGs9YVs0XSxsPWFbNV0sbT1hWzZdLG49YVs3XSxvPWFbOF0scD1hWzldLHE9YVsxMF0scj1hWzExXSxiWzBdPWcsYlsxXT1oLGJbMl09aSxiWzNdPWosYls0XT1rLGJbNV09bCxiWzZdPW0sYls3XT1uLGJbOF09byxiWzldPXAsYlsxMF09cSxiWzExXT1yLGJbMTJdPWcqYytrKmQrbyplK2FbMTJdLGJbMTNdPWgqYytsKmQrcCplK2FbMTNdLGJbMTRdPWkqYyttKmQrcSplK2FbMTRdLGJbMTVdPWoqYytuKmQrciplK2FbMTVdKSx0aGlzfXJvdGF0ZVgobixvPXRoaXMpe3ZhciBhLGIsbTtsZXQgYyxkLGUsZixnLGgsaSxqLGssbDtyZXR1cm4gYT10aGlzLGI9byxjPU1hdGguc2luKG09biksZD1NYXRoLmNvcyhtKSxlPWJbNF0sZj1iWzVdLGc9Yls2XSxoPWJbN10saT1iWzhdLGo9Yls5XSxrPWJbMTBdLGw9YlsxMV0sYiE9PWEmJihhWzBdPWJbMF0sYVsxXT1iWzFdLGFbMl09YlsyXSxhWzNdPWJbM10sYVsxMl09YlsxMl0sYVsxM109YlsxM10sYVsxNF09YlsxNF0sYVsxNV09YlsxNV0pLGFbNF09ZSpkK2kqYyxhWzVdPWYqZCtqKmMsYVs2XT1nKmQraypjLGFbN109aCpkK2wqYyxhWzhdPWkqZC1lKmMsYVs5XT1qKmQtZipjLGFbMTBdPWsqZC1nKmMsYVsxMV09bCpkLWgqYyx0aGlzfXJvdGF0ZVkobixvPXRoaXMpe3ZhciBhLGIsbTtsZXQgYyxkLGUsZixnLGgsaSxqLGssbDtyZXR1cm4gYT10aGlzLGI9byxjPU1hdGguc2luKG09biksZD1NYXRoLmNvcyhtKSxlPWJbMF0sZj1iWzFdLGc9YlsyXSxoPWJbM10saT1iWzhdLGo9Yls5XSxrPWJbMTBdLGw9YlsxMV0sYiE9PWEmJihhWzRdPWJbNF0sYVs1XT1iWzVdLGFbNl09Yls2XSxhWzddPWJbN10sYVsxMl09YlsxMl0sYVsxM109YlsxM10sYVsxNF09YlsxNF0sYVsxNV09YlsxNV0pLGFbMF09ZSpkLWkqYyxhWzFdPWYqZC1qKmMsYVsyXT1nKmQtaypjLGFbM109aCpkLWwqYyxhWzhdPWUqYytpKmQsYVs5XT1mKmMraipkLGFbMTBdPWcqYytrKmQsYVsxMV09aCpjK2wqZCx0aGlzfXJvdGF0ZVoobixvPXRoaXMpe3ZhciBhLGIsbTtsZXQgYyxkLGUsZixnLGgsaSxqLGssbDtyZXR1cm4gYT10aGlzLGI9byxjPU1hdGguc2luKG09biksZD1NYXRoLmNvcyhtKSxlPWJbMF0sZj1iWzFdLGc9YlsyXSxoPWJbM10saT1iWzRdLGo9Yls1XSxrPWJbNl0sbD1iWzddLGIhPT1hJiYoYVs4XT1iWzhdLGFbOV09Yls5XSxhWzEwXT1iWzEwXSxhWzExXT1iWzExXSxhWzEyXT1iWzEyXSxhWzEzXT1iWzEzXSxhWzE0XT1iWzE0XSxhWzE1XT1iWzE1XSksYVswXT1lKmQraSpjLGFbMV09ZipkK2oqYyxhWzJdPWcqZCtrKmMsYVszXT1oKmQrbCpjLGFbNF09aSpkLWUqYyxhWzVdPWoqZC1mKmMsYVs2XT1rKmQtZypjLGFbN109bCpkLWgqYyx0aGlzfXNjYWxlKGMsaD10aGlzKXt2YXIgYSxiLGc7bGV0IGQsZSxmO3JldHVybiBhPXRoaXMsYj1oLGQ9KGc9XCJudW1iZXJcIj09dHlwZW9mIGM/W2MsYyxjXTpjKVswXSxlPWdbMV0sZj1nWzJdLGFbMF09YlswXSpkLGFbMV09YlsxXSpkLGFbMl09YlsyXSpkLGFbM109YlszXSpkLGFbNF09Yls0XSplLGFbNV09Yls1XSplLGFbNl09Yls2XSplLGFbN109Yls3XSplLGFbOF09Yls4XSpmLGFbOV09Yls5XSpmLGFbMTBdPWJbMTBdKmYsYVsxMV09YlsxMV0qZixhWzEyXT1iWzEyXSxhWzEzXT1iWzEzXSxhWzE0XT1iWzE0XSxhWzE1XT1iWzE1XSx0aGlzfW11bHRpcGx5KGEsYil7cmV0dXJuIGI/Tyh0aGlzLGEsYik6Tyh0aGlzLHRoaXMsYSksdGhpc31pZGVudGl0eSgpe3ZhciBhO3JldHVybihhPXRoaXMpWzBdPTEsYVsxXT0wLGFbMl09MCxhWzNdPTAsYVs0XT0wLGFbNV09MSxhWzZdPTAsYVs3XT0wLGFbOF09MCxhWzldPTAsYVsxMF09MSxhWzExXT0wLGFbMTJdPTAsYVsxM109MCxhWzE0XT0wLGFbMTVdPTEsdGhpc31jb3B5KGMpe3ZhciBiLGE7cmV0dXJuIGE9YywoYj10aGlzKVswXT1hWzBdLGJbMV09YVsxXSxiWzJdPWFbMl0sYlszXT1hWzNdLGJbNF09YVs0XSxiWzVdPWFbNV0sYls2XT1hWzZdLGJbN109YVs3XSxiWzhdPWFbOF0sYls5XT1hWzldLGJbMTBdPWFbMTBdLGJbMTFdPWFbMTFdLGJbMTJdPWFbMTJdLGJbMTNdPWFbMTNdLGJbMTRdPWFbMTRdLGJbMTVdPWFbMTVdLHRoaXN9ZnJvbVBlcnNwZWN0aXZlKHtmb3Y6aCxhc3BlY3Q6aSxuZWFyOmosZmFyOmt9PXt9KXt2YXIgYSxmLGcsYixjO2xldCBkLGU7cmV0dXJuIGE9dGhpcyxmPWgsZz1pLGI9aixjPWssZD0xL01hdGgudGFuKGYvMiksZT0xLyhiLWMpLGFbMF09ZC9nLGFbMV09MCxhWzJdPTAsYVszXT0wLGFbNF09MCxhWzVdPWQsYVs2XT0wLGFbN109MCxhWzhdPTAsYVs5XT0wLGFbMTBdPShjK2IpKmUsYVsxMV09LTEsYVsxMl09MCxhWzEzXT0wLGFbMTRdPTIqYypiKmUsYVsxNV09MCx0aGlzfWZyb21PcnRob2dvbmFsKHtsZWZ0OmsscmlnaHQ6bCxib3R0b206bSx0b3A6bixuZWFyOm8sZmFyOnB9KXt2YXIgYSxiLGMsZCxlLGYsZztsZXQgaCxpLGo7cmV0dXJuIGE9dGhpcyxiPWssYz1sLGQ9bSxlPW4sZj1vLGc9cCxoPTEvKGItYyksaT0xLyhkLWUpLGo9MS8oZi1nKSxhWzBdPS0yKmgsYVsxXT0wLGFbMl09MCxhWzNdPTAsYVs0XT0wLGFbNV09LTIqaSxhWzZdPTAsYVs3XT0wLGFbOF09MCxhWzldPTAsYVsxMF09MipqLGFbMTFdPTAsYVsxMl09KGIrYykqaCxhWzEzXT0oZStkKSppLGFbMTRdPShnK2YpKmosYVsxNV09MSx0aGlzfWZyb21RdWF0ZXJuaW9uKHMpe3ZhciBhLGU7bGV0IGYsYyxiLGcsZCxoLGksaixrLGwsbSxuLG8scCxxLHI7cmV0dXJuIGE9dGhpcyxmPShlPXMpWzBdLGM9ZVsxXSxiPWVbMl0sZz1lWzNdLGQ9ZitmLGg9YytjLGk9YitiLGo9ZipkLGs9YypkLGw9YypoLG09YipkLG49YipoLG89YippLHA9ZypkLHE9ZypoLHI9ZyppLGFbMF09MS1sLW8sYVsxXT1rK3IsYVsyXT1tLXEsYVszXT0wLGFbNF09ay1yLGFbNV09MS1qLW8sYVs2XT1uK3AsYVs3XT0wLGFbOF09bStxLGFbOV09bi1wLGFbMTBdPTEtai1sLGFbMTFdPTAsYVsxMl09MCxhWzEzXT0wLGFbMTRdPTAsYVsxNV09MSx0aGlzfXNldFBvc2l0aW9uKGEpe3JldHVybiB0aGlzLng9YVswXSx0aGlzLnk9YVsxXSx0aGlzLno9YVsyXSx0aGlzfWludmVyc2UoRT10aGlzKXt2YXIgYixjO2xldCBkLGUsZixnLGgsaSxqLGssbCxtLG4sbyxwLHEscixzLHQsdSx2LHcseCx5LHosQSxCLF8sQyxELGE7cmV0dXJuIGI9dGhpcyxkPShjPUUpWzBdLGU9Y1sxXSxmPWNbMl0sZz1jWzNdLGg9Y1s0XSxpPWNbNV0saj1jWzZdLGs9Y1s3XSxsPWNbOF0sbT1jWzldLG49Y1sxMF0sbz1jWzExXSxwPWNbMTJdLHE9Y1sxM10scj1jWzE0XSxzPWNbMTVdLHQ9ZCppLWUqaCx1PWQqai1mKmgsdj1kKmstZypoLHc9ZSpqLWYqaSx4PWUqay1nKmkseT1mKmstZypqLHo9bCpxLW0qcCxBPWwqci1uKnAsQj1sKnMtbypwLF89bSpyLW4qcSxDPW0qcy1vKnEsRD1uKnMtbypyLGE9dCpELXUqQyt2Kl8rdypCLXgqQSt5KnosYSYmKGE9MS9hLGJbMF09KGkqRC1qKkMraypfKSphLGJbMV09KGYqQy1lKkQtZypfKSphLGJbMl09KHEqeS1yKngrcyp3KSphLGJbM109KG4qeC1tKnktbyp3KSphLGJbNF09KGoqQi1oKkQtaypBKSphLGJbNV09KGQqRC1mKkIrZypBKSphLGJbNl09KHIqdi1wKnktcyp1KSphLGJbN109KGwqeS1uKnYrbyp1KSphLGJbOF09KGgqQy1pKkIrayp6KSphLGJbOV09KGUqQi1kKkMtZyp6KSphLGJbMTBdPShwKngtcSp2K3MqdCkqYSxiWzExXT0obSp2LWwqeC1vKnQpKmEsYlsxMl09KGkqQS1oKl8taip6KSphLGJbMTNdPShkKl8tZSpBK2YqeikqYSxiWzE0XT0ocSp1LXAqdy1yKnQpKmEsYlsxNV09KGwqdy1tKnUrbip0KSphKSx0aGlzfWNvbXBvc2UoeCx5LHope3ZhciBhLGMsZixnO2xldCBiLGQsaCxpLG4saixlLG8scCxxLHIscyx0LHUsdix3LGssbCxtO3JldHVybiBhPXRoaXMsYz14LGY9eSxnPXosYj1jWzBdLGQ9Y1sxXSxoPWNbMl0saT1jWzNdLG49YitiLGo9ZCtkLGU9aCtoLG89YipuLHA9YipqLHE9YiplLHI9ZCpqLHM9ZCplLHQ9aCplLHU9aSpuLHY9aSpqLHc9aSplLGs9Z1swXSxsPWdbMV0sbT1nWzJdLGFbMF09KDEtKHIrdCkpKmssYVsxXT0ocCt3KSprLGFbMl09KHEtdikqayxhWzNdPTAsYVs0XT0ocC13KSpsLGFbNV09KDEtKG8rdCkpKmwsYVs2XT0ocyt1KSpsLGFbN109MCxhWzhdPShxK3YpKm0sYVs5XT0ocy11KSptLGFbMTBdPSgxLShvK3IpKSptLGFbMTFdPTAsYVsxMl09ZlswXSxhWzEzXT1mWzFdLGFbMTRdPWZbMl0sYVsxNV09MSx0aGlzfWdldFJvdGF0aW9uKGUpe3ZhciBjLGE7bGV0IGQsYjtyZXR1cm4gYz1lLGE9dGhpcyxkPWFbMF0rYVs1XSthWzEwXSxiPTAsZD4wPyhiPTIqTWF0aC5zcXJ0KGQrMSksY1szXT0uMjUqYixjWzBdPShhWzZdLWFbOV0pL2IsY1sxXT0oYVs4XS1hWzJdKS9iLGNbMl09KGFbMV0tYVs0XSkvYik6YVswXT5hWzVdJiZhWzBdPmFbMTBdPyhiPTIqTWF0aC5zcXJ0KDErYVswXS1hWzVdLWFbMTBdKSxjWzNdPShhWzZdLWFbOV0pL2IsY1swXT0uMjUqYixjWzFdPShhWzFdK2FbNF0pL2IsY1syXT0oYVs4XSthWzJdKS9iKTphWzVdPmFbMTBdPyhiPTIqTWF0aC5zcXJ0KDErYVs1XS1hWzBdLWFbMTBdKSxjWzNdPShhWzhdLWFbMl0pL2IsY1swXT0oYVsxXSthWzRdKS9iLGNbMV09LjI1KmIsY1syXT0oYVs2XSthWzldKS9iKTooYj0yKk1hdGguc3FydCgxK2FbMTBdLWFbMF0tYVs1XSksY1szXT0oYVsxXS1hWzRdKS9iLGNbMF09KGFbOF0rYVsyXSkvYixjWzFdPShhWzZdK2FbOV0pL2IsY1syXT0uMjUqYiksdGhpc31nZXRUcmFuc2xhdGlvbihjKXt2YXIgYixhO3JldHVybiBhPXRoaXMsKGI9YylbMF09YVsxMl0sYlsxXT1hWzEzXSxiWzJdPWFbMTRdLHRoaXN9Z2V0U2NhbGluZyhsKXt2YXIgYixhO2xldCBjLGQsZSxmLGcsaCxpLGosaztyZXR1cm4gYj1sLGE9dGhpcyxjPWFbMF0sZD1hWzFdLGU9YVsyXSxmPWFbNF0sZz1hWzVdLGg9YVs2XSxpPWFbOF0saj1hWzldLGs9YVsxMF0sYlswXT1NYXRoLnNxcnQoYypjK2QqZCtlKmUpLGJbMV09TWF0aC5zcXJ0KGYqZitnKmcraCpoKSxiWzJdPU1hdGguc3FydChpKmkraipqK2sqayksdGhpc31nZXRNYXhTY2FsZU9uQXhpcygpe3ZhciBhO2xldCBiLGMsZCxlLGYsZyxoLGksajtyZXR1cm4gYT10aGlzLGI9YVswXSxjPWFbMV0sZD1hWzJdLGU9YVs0XSxmPWFbNV0sZz1hWzZdLGg9YVs4XSxpPWFbOV0saj1hWzEwXSxNYXRoLnNxcnQoTWF0aC5tYXgoYipiK2MqYytkKmQsZSplK2YqZitnKmcsaCpoK2kqaStqKmopKX1sb29rQXQocixzLHQpe3ZhciBhLGksaixrO2xldCBsLG0sbixvLHAscSxjLGQsZSxiLGYsZyxoO3JldHVybiBhPXRoaXMsaT1yLGo9cyxrPXQsbD1pWzBdLG09aVsxXSxuPWlbMl0sbz1rWzBdLHA9a1sxXSxxPWtbMl0sYz1sLWpbMF0sZD1tLWpbMV0sZT1uLWpbMl0sYj1jKmMrZCpkK2UqZSxiPjAmJihjKj1iPTEvTWF0aC5zcXJ0KGIpLGQqPWIsZSo9YiksZj1wKmUtcSpkLGc9cSpjLW8qZSxoPW8qZC1wKmMsKGI9ZipmK2cqZytoKmgpPjAmJihmKj1iPTEvTWF0aC5zcXJ0KGIpLGcqPWIsaCo9YiksYVswXT1mLGFbMV09ZyxhWzJdPWgsYVszXT0wLGFbNF09ZCpoLWUqZyxhWzVdPWUqZi1jKmgsYVs2XT1jKmctZCpmLGFbN109MCxhWzhdPWMsYVs5XT1kLGFbMTBdPWUsYVsxMV09MCxhWzEyXT1sLGFbMTNdPW0sYVsxNF09bixhWzE1XT0xLHRoaXN9ZGV0ZXJtaW5hbnQoKXt2YXIgYTtsZXQgYixjLGQsZSxmLGcsaCxpLGosayxsLG0sbixvLHAscTtyZXR1cm4gYT10aGlzLGI9YVswXSxjPWFbMV0sZD1hWzJdLGU9YVszXSxmPWFbNF0sZz1hWzVdLGg9YVs2XSxpPWFbN10saj1hWzhdLGs9YVs5XSxsPWFbMTBdLG09YVsxMV0sbj1hWzEyXSxvPWFbMTNdLHA9YVsxNF0scT1hWzE1XSwoYipnLWMqZikqKGwqcS1tKnApLShiKmgtZCpmKSooaypxLW0qbykrKGIqaS1lKmYpKihrKnAtbCpvKSsoYypoLWQqZykqKGoqcS1tKm4pLShjKmktZSpnKSooaipwLWwqbikrKGQqaS1lKmgpKihqKm8taypuKX19bGV0IFA9bmV3IGM7Y2xhc3MgbCBleHRlbmRzIEFycmF5e2NvbnN0cnVjdG9yKGE9MCxiPWEsYz1hLGQ9XCJZWFpcIil7cmV0dXJuIHN1cGVyKGEsYixjKSx0aGlzLm9yZGVyPWQsdGhpcy5vbkNoYW5nZT0oKT0+e30sdGhpc31nZXQgeCgpe3JldHVybiB0aGlzWzBdfXNldCB4KGEpe3RoaXNbMF09YSx0aGlzLm9uQ2hhbmdlKCl9Z2V0IHkoKXtyZXR1cm4gdGhpc1sxXX1zZXQgeShhKXt0aGlzWzFdPWEsdGhpcy5vbkNoYW5nZSgpfWdldCB6KCl7cmV0dXJuIHRoaXNbMl19c2V0IHooYSl7dGhpc1syXT1hLHRoaXMub25DaGFuZ2UoKX1zZXQoYSxiPWEsYz1hKXtyZXR1cm4gYS5sZW5ndGg/dGhpcy5jb3B5KGEpOih0aGlzWzBdPWEsdGhpc1sxXT1iLHRoaXNbMl09Yyx0aGlzLm9uQ2hhbmdlKCksdGhpcyl9Y29weShhKXtyZXR1cm4gdGhpc1swXT1hWzBdLHRoaXNbMV09YVsxXSx0aGlzWzJdPWFbMl0sdGhpc31yZW9yZGVyKGEpe3JldHVybiB0aGlzLm9yZGVyPWEsdGhpcy5vbkNoYW5nZSgpLHRoaXN9ZnJvbVJvdGF0aW9uTWF0cml4KGEsYj10aGlzLm9yZGVyKXtyZXR1cm4gZnVuY3Rpb24oYixhLGM9XCJZWFpcIil7XCJYWVpcIj09PWM/KGJbMV09TWF0aC5hc2luKE1hdGgubWluKE1hdGgubWF4KGFbOF0sLTEpLDEpKSwuOTk5OTk+TWF0aC5hYnMoYVs4XSk/KGJbMF09TWF0aC5hdGFuMigtYVs5XSxhWzEwXSksYlsyXT1NYXRoLmF0YW4yKC1hWzRdLGFbMF0pKTooYlswXT1NYXRoLmF0YW4yKGFbNl0sYVs1XSksYlsyXT0wKSk6XCJZWFpcIj09PWM/KGJbMF09TWF0aC5hc2luKC1NYXRoLm1pbihNYXRoLm1heChhWzldLC0xKSwxKSksLjk5OTk5Pk1hdGguYWJzKGFbOV0pPyhiWzFdPU1hdGguYXRhbjIoYVs4XSxhWzEwXSksYlsyXT1NYXRoLmF0YW4yKGFbMV0sYVs1XSkpOihiWzFdPU1hdGguYXRhbjIoLWFbMl0sYVswXSksYlsyXT0wKSk6XCJaWFlcIj09PWM/KGJbMF09TWF0aC5hc2luKE1hdGgubWluKE1hdGgubWF4KGFbNl0sLTEpLDEpKSwuOTk5OTk+TWF0aC5hYnMoYVs2XSk/KGJbMV09TWF0aC5hdGFuMigtYVsyXSxhWzEwXSksYlsyXT1NYXRoLmF0YW4yKC1hWzRdLGFbNV0pKTooYlsxXT0wLGJbMl09TWF0aC5hdGFuMihhWzFdLGFbMF0pKSk6XCJaWVhcIj09PWM/KGJbMV09TWF0aC5hc2luKC1NYXRoLm1pbihNYXRoLm1heChhWzJdLC0xKSwxKSksLjk5OTk5Pk1hdGguYWJzKGFbMl0pPyhiWzBdPU1hdGguYXRhbjIoYVs2XSxhWzEwXSksYlsyXT1NYXRoLmF0YW4yKGFbMV0sYVswXSkpOihiWzBdPTAsYlsyXT1NYXRoLmF0YW4yKC1hWzRdLGFbNV0pKSk6XCJZWlhcIj09PWM/KGJbMl09TWF0aC5hc2luKE1hdGgubWluKE1hdGgubWF4KGFbMV0sLTEpLDEpKSwuOTk5OTk+TWF0aC5hYnMoYVsxXSk/KGJbMF09TWF0aC5hdGFuMigtYVs5XSxhWzVdKSxiWzFdPU1hdGguYXRhbjIoLWFbMl0sYVswXSkpOihiWzBdPTAsYlsxXT1NYXRoLmF0YW4yKGFbOF0sYVsxMF0pKSk6XCJYWllcIj09PWMmJihiWzJdPU1hdGguYXNpbigtTWF0aC5taW4oTWF0aC5tYXgoYVs0XSwtMSksMSkpLC45OTk5OT5NYXRoLmFicyhhWzRdKT8oYlswXT1NYXRoLmF0YW4yKGFbNl0sYVs1XSksYlsxXT1NYXRoLmF0YW4yKGFbOF0sYVswXSkpOihiWzBdPU1hdGguYXRhbjIoLWFbOV0sYVsxMF0pLGJbMV09MCkpfSh0aGlzLGEsYiksdGhpc31mcm9tUXVhdGVybmlvbihhLGI9dGhpcy5vcmRlcil7cmV0dXJuIFAuZnJvbVF1YXRlcm5pb24oYSksdGhpcy5mcm9tUm90YXRpb25NYXRyaXgoUCxiKX19Y2xhc3MgZ3tjb25zdHJ1Y3Rvcigpe3RoaXMucGFyZW50PW51bGwsdGhpcy5jaGlsZHJlbj1bXSx0aGlzLnZpc2libGU9ITAsdGhpcy5tYXRyaXg9bmV3IGMsdGhpcy53b3JsZE1hdHJpeD1uZXcgYyx0aGlzLm1hdHJpeEF1dG9VcGRhdGU9ITAsdGhpcy5wb3NpdGlvbj1uZXcgYix0aGlzLnF1YXRlcm5pb249bmV3IGQsdGhpcy5zY2FsZT1uZXcgYigxKSx0aGlzLnJvdGF0aW9uPW5ldyBsLHRoaXMudXA9bmV3IGIoMCwxLDApLHRoaXMucm90YXRpb24ub25DaGFuZ2U9KCk9PnRoaXMucXVhdGVybmlvbi5mcm9tRXVsZXIodGhpcy5yb3RhdGlvbiksdGhpcy5xdWF0ZXJuaW9uLm9uQ2hhbmdlPSgpPT50aGlzLnJvdGF0aW9uLmZyb21RdWF0ZXJuaW9uKHRoaXMucXVhdGVybmlvbil9c2V0UGFyZW50KGEsYj0hMCl7YiYmdGhpcy5wYXJlbnQmJmEhPT10aGlzLnBhcmVudCYmdGhpcy5wYXJlbnQucmVtb3ZlQ2hpbGQodGhpcywhMSksdGhpcy5wYXJlbnQ9YSxiJiZhJiZhLmFkZENoaWxkKHRoaXMsITEpfWFkZENoaWxkKGEsYj0hMCl7fnRoaXMuY2hpbGRyZW4uaW5kZXhPZihhKXx8dGhpcy5jaGlsZHJlbi5wdXNoKGEpLGImJmEuc2V0UGFyZW50KHRoaXMsITEpfXJlbW92ZUNoaWxkKGEsYj0hMCl7fnRoaXMuY2hpbGRyZW4uaW5kZXhPZihhKSYmdGhpcy5jaGlsZHJlbi5zcGxpY2UodGhpcy5jaGlsZHJlbi5pbmRleE9mKGEpLDEpLGImJmEuc2V0UGFyZW50KG51bGwsITEpfXVwZGF0ZU1hdHJpeFdvcmxkKGEpe3RoaXMubWF0cml4QXV0b1VwZGF0ZSYmdGhpcy51cGRhdGVNYXRyaXgoKSwodGhpcy53b3JsZE1hdHJpeE5lZWRzVXBkYXRlfHxhKSYmKG51bGw9PT10aGlzLnBhcmVudD90aGlzLndvcmxkTWF0cml4LmNvcHkodGhpcy5tYXRyaXgpOnRoaXMud29ybGRNYXRyaXgubXVsdGlwbHkodGhpcy5wYXJlbnQud29ybGRNYXRyaXgsdGhpcy5tYXRyaXgpLHRoaXMud29ybGRNYXRyaXhOZWVkc1VwZGF0ZT0hMSxhPSEwKTtmb3IobGV0IGI9MCxjPXRoaXMuY2hpbGRyZW4ubGVuZ3RoO2I8YztiKyspdGhpcy5jaGlsZHJlbltiXS51cGRhdGVNYXRyaXhXb3JsZChhKX11cGRhdGVNYXRyaXgoKXt0aGlzLm1hdHJpeC5jb21wb3NlKHRoaXMucXVhdGVybmlvbix0aGlzLnBvc2l0aW9uLHRoaXMuc2NhbGUpLHRoaXMud29ybGRNYXRyaXhOZWVkc1VwZGF0ZT0hMH10cmF2ZXJzZShiKXtpZighYih0aGlzKSlmb3IobGV0IGE9MCxjPXRoaXMuY2hpbGRyZW4ubGVuZ3RoO2E8YzthKyspdGhpcy5jaGlsZHJlblthXS50cmF2ZXJzZShiKX1kZWNvbXBvc2UoKXt0aGlzLm1hdHJpeC5nZXRUcmFuc2xhdGlvbih0aGlzLnBvc2l0aW9uKSx0aGlzLm1hdHJpeC5nZXRSb3RhdGlvbih0aGlzLnF1YXRlcm5pb24pLHRoaXMubWF0cml4LmdldFNjYWxpbmcodGhpcy5zY2FsZSksdGhpcy5yb3RhdGlvbi5mcm9tUXVhdGVybmlvbih0aGlzLnF1YXRlcm5pb24pfWxvb2tBdChhLGI9ITEpe2I/dGhpcy5tYXRyaXgubG9va0F0KHRoaXMucG9zaXRpb24sYSx0aGlzLnVwKTp0aGlzLm1hdHJpeC5sb29rQXQoYSx0aGlzLnBvc2l0aW9uLHRoaXMudXApLHRoaXMubWF0cml4LmdldFJvdGF0aW9uKHRoaXMucXVhdGVybmlvbiksdGhpcy5yb3RhdGlvbi5mcm9tUXVhdGVybmlvbih0aGlzLnF1YXRlcm5pb24pfX1sZXQgUT1uZXcgYyxSPW5ldyBiLFM9bmV3IGI7ZnVuY3Rpb24gVChhLGIsYyl7bGV0IGQ9YlswXSxlPWJbMV0sZj1iWzJdLGc9YlszXSxoPWJbNF0saT1iWzVdLGo9Yls2XSxrPWJbN10sbD1iWzhdLG09Y1swXSxuPWNbMV0sbz1jWzJdLHA9Y1szXSxxPWNbNF0scj1jWzVdLHM9Y1s2XSx0PWNbN10sdT1jWzhdO3JldHVybiBhWzBdPW0qZCtuKmcrbypqLGFbMV09bSplK24qaCtvKmssYVsyXT1tKmYrbippK28qbCxhWzNdPXAqZCtxKmcrcipqLGFbNF09cCplK3EqaCtyKmssYVs1XT1wKmYrcSppK3IqbCxhWzZdPXMqZCt0KmcrdSpqLGFbN109cyplK3QqaCt1KmssYVs4XT1zKmYrdCppK3UqbCxhfWNsYXNzIG0gZXh0ZW5kcyBBcnJheXtjb25zdHJ1Y3RvcihhPTEsYj0wLGM9MCxkPTAsZT0xLGY9MCxnPTAsaD0wLGk9MSl7cmV0dXJuIHN1cGVyKGEsYixjLGQsZSxmLGcsaCxpKSx0aGlzfXNldChiLGwsbSxuLG8scCxxLHIscyl7dmFyIGEsYyxkLGUsZixnLGgsaSxqLGs7cmV0dXJuIGIubGVuZ3RoP3RoaXMuY29weShiKTooYT10aGlzLGM9YixkPWwsZT1tLGY9bixnPW8saD1wLGk9cSxqPXIsaz1zLGFbMF09YyxhWzFdPWQsYVsyXT1lLGFbM109ZixhWzRdPWcsYVs1XT1oLGFbNl09aSxhWzddPWosYVs4XT1rLHRoaXMpfXRyYW5zbGF0ZShvLHA9dGhpcyl7dmFyIGEsYixlO2xldCBmLGcsaCxpLGosayxsLG0sbixjLGQ7cmV0dXJuIGE9dGhpcyxiPXAsZT1vLGY9YlswXSxnPWJbMV0saD1iWzJdLGk9YlszXSxqPWJbNF0saz1iWzVdLGw9Yls2XSxtPWJbN10sbj1iWzhdLGM9ZVswXSxkPWVbMV0sYVswXT1mLGFbMV09ZyxhWzJdPWgsYVszXT1pLGFbNF09aixhWzVdPWssYVs2XT1jKmYrZCppK2wsYVs3XT1jKmcrZCpqK20sYVs4XT1jKmgrZCprK24sdGhpc31yb3RhdGUobyxwPXRoaXMpe3ZhciBhLGIsZTtsZXQgZixnLGgsaSxqLGssbCxtLG4sYyxkO3JldHVybiBhPXRoaXMsYj1wLGU9byxmPWJbMF0sZz1iWzFdLGg9YlsyXSxpPWJbM10saj1iWzRdLGs9Yls1XSxsPWJbNl0sbT1iWzddLG49Yls4XSxjPU1hdGguc2luKGUpLGQ9TWF0aC5jb3MoZSksYVswXT1kKmYrYyppLGFbMV09ZCpnK2MqaixhWzJdPWQqaCtjKmssYVszXT1kKmktYypmLGFbNF09ZCpqLWMqZyxhWzVdPWQqay1jKmgsYVs2XT1sLGFbN109bSxhWzhdPW4sdGhpc31zY2FsZShmLGc9dGhpcyl7dmFyIGEsYixlO2xldCBjLGQ7cmV0dXJuIGE9dGhpcyxiPWcsYz0oZT1mKVswXSxkPWVbMV0sYVswXT1jKmJbMF0sYVsxXT1jKmJbMV0sYVsyXT1jKmJbMl0sYVszXT1kKmJbM10sYVs0XT1kKmJbNF0sYVs1XT1kKmJbNV0sYVs2XT1iWzZdLGFbN109Yls3XSxhWzhdPWJbOF0sdGhpc31tdWx0aXBseShhLGIpe3JldHVybiBiP1QodGhpcyxhLGIpOlQodGhpcyx0aGlzLGEpLHRoaXN9aWRlbnRpdHkoKXt2YXIgYTtyZXR1cm4oYT10aGlzKVswXT0xLGFbMV09MCxhWzJdPTAsYVszXT0wLGFbNF09MSxhWzVdPTAsYVs2XT0wLGFbN109MCxhWzhdPTEsdGhpc31jb3B5KGMpe3ZhciBiLGE7cmV0dXJuIGE9YywoYj10aGlzKVswXT1hWzBdLGJbMV09YVsxXSxiWzJdPWFbMl0sYlszXT1hWzNdLGJbNF09YVs0XSxiWzVdPWFbNV0sYls2XT1hWzZdLGJbN109YVs3XSxiWzhdPWFbOF0sdGhpc31mcm9tTWF0cml4NChjKXt2YXIgYixhO3JldHVybiBhPWMsKGI9dGhpcylbMF09YVswXSxiWzFdPWFbMV0sYlsyXT1hWzJdLGJbM109YVs0XSxiWzRdPWFbNV0sYls1XT1hWzZdLGJbNl09YVs4XSxiWzddPWFbOV0sYls4XT1hWzEwXSx0aGlzfWZyb21RdWF0ZXJuaW9uKHMpe3ZhciBhLGU7bGV0IGYsYyxiLGcsZCxoLGksaixrLGwsbSxuLG8scCxxLHI7cmV0dXJuIGE9dGhpcyxmPShlPXMpWzBdLGM9ZVsxXSxiPWVbMl0sZz1lWzNdLGQ9ZitmLGg9YytjLGk9YitiLGo9ZipkLGs9YypkLGw9YypoLG09YipkLG49YipoLG89YippLHA9ZypkLHE9ZypoLHI9ZyppLGFbMF09MS1sLW8sYVszXT1rLXIsYVs2XT1tK3EsYVsxXT1rK3IsYVs0XT0xLWotbyxhWzddPW4tcCxhWzJdPW0tcSxhWzVdPW4rcCxhWzhdPTEtai1sLHRoaXN9ZnJvbUJhc2lzKGEsYixjKXtyZXR1cm4gdGhpcy5zZXQoYVswXSxhWzFdLGFbMl0sYlswXSxiWzFdLGJbMl0sY1swXSxjWzFdLGNbMl0pLHRoaXN9aW52ZXJzZShwPXRoaXMpe3ZhciBiLGM7bGV0IGQsZSxmLGcsaCxpLGosayxsLG0sbixvLGE7cmV0dXJuIGI9dGhpcyxkPShjPXApWzBdLGU9Y1sxXSxmPWNbMl0sZz1jWzNdLGg9Y1s0XSxpPWNbNV0saj1jWzZdLGs9Y1s3XSxsPWNbOF0sbT1sKmgtaSprLG49LWwqZytpKmosbz1rKmctaCpqLGE9ZCptK2UqbitmKm8sYSYmKGE9MS9hLGJbMF09bSphLGJbMV09KC1sKmUrZiprKSphLGJbMl09KGkqZS1mKmgpKmEsYlszXT1uKmEsYls0XT0obCpkLWYqaikqYSxiWzVdPSgtaSpkK2YqZykqYSxiWzZdPW8qYSxiWzddPSgtaypkK2UqaikqYSxiWzhdPShoKmQtZSpnKSphKSx0aGlzfWdldE5vcm1hbE1hdHJpeChFKXt2YXIgYyxhO2xldCBnLGgsaSxkLGosayxsLGUscyx0LHUsdixtLG4sbyxmLEIsQyx3LEQseCx5LHosQSxwLF8scSxyLGI7cmV0dXJuIGM9dGhpcyxnPShhPUUpWzBdLGg9YVsxXSxpPWFbMl0sZD1hWzNdLGo9YVs0XSxrPWFbNV0sbD1hWzZdLGU9YVs3XSxzPWFbOF0sdD1hWzldLHU9YVsxMF0sdj1hWzExXSxtPWFbMTJdLG49YVsxM10sbz1hWzE0XSxmPWFbMTVdLEI9ZyprLWgqaixDPWcqbC1pKmosdz1nKmUtZCpqLEQ9aCpsLWkqayx4PWgqZS1kKmsseT1pKmUtZCpsLHo9cypuLXQqbSxBPXMqby11Km0scD1zKmYtdiptLF89dCpvLXUqbixxPXQqZi12Km4scj11KmYtdipvLGI9QipyLUMqcSt3Kl8rRCpwLXgqQSt5KnosYiYmKGI9MS9iLGNbMF09KGsqci1sKnErZSpfKSpiLGNbMV09KGwqcC1qKnItZSpBKSpiLGNbMl09KGoqcS1rKnArZSp6KSpiLGNbM109KGkqcS1oKnItZCpfKSpiLGNbNF09KGcqci1pKnArZCpBKSpiLGNbNV09KGgqcC1nKnEtZCp6KSpiLGNbNl09KG4qeS1vKngrZipEKSpiLGNbN109KG8qdy1tKnktZipDKSpiLGNbOF09KG0qeC1uKncrZipCKSpiKSx0aGlzfX1sZXQgVT0wO2NsYXNzIG4gZXh0ZW5kcyBne2NvbnN0cnVjdG9yKGEse2dlb21ldHJ5OmIscHJvZ3JhbTpkLG1vZGU6ZT1hLlRSSUFOR0xFUyxmcnVzdHVtQ3VsbGVkOmY9ITAscmVuZGVyT3JkZXI6Zz0wfT17fSl7c3VwZXIoYSksdGhpcy5nbD1hLHRoaXMuaWQ9VSsrLHRoaXMuZ2VvbWV0cnk9Yix0aGlzLnByb2dyYW09ZCx0aGlzLm1vZGU9ZSx0aGlzLmZydXN0dW1DdWxsZWQ9Zix0aGlzLnJlbmRlck9yZGVyPWcsdGhpcy5tb2RlbFZpZXdNYXRyaXg9bmV3IGMsdGhpcy5ub3JtYWxNYXRyaXg9bmV3IG0sdGhpcy5wcm9ncmFtLnVuaWZvcm1zLm1vZGVsTWF0cml4fHxPYmplY3QuYXNzaWduKHRoaXMucHJvZ3JhbS51bmlmb3Jtcyx7bW9kZWxNYXRyaXg6e3ZhbHVlOm51bGx9LHZpZXdNYXRyaXg6e3ZhbHVlOm51bGx9LG1vZGVsVmlld01hdHJpeDp7dmFsdWU6bnVsbH0sbm9ybWFsTWF0cml4Ont2YWx1ZTpudWxsfSxwcm9qZWN0aW9uTWF0cml4Ont2YWx1ZTpudWxsfSxjYW1lcmFQb3NpdGlvbjp7dmFsdWU6bnVsbH19KX1kcmF3KHtjYW1lcmE6YX09e30pe3RoaXMub25CZWZvcmVSZW5kZXImJnRoaXMub25CZWZvcmVSZW5kZXIoe21lc2g6dGhpcyxjYW1lcmE6YX0pLGEmJih0aGlzLnByb2dyYW0udW5pZm9ybXMucHJvamVjdGlvbk1hdHJpeC52YWx1ZT1hLnByb2plY3Rpb25NYXRyaXgsdGhpcy5wcm9ncmFtLnVuaWZvcm1zLmNhbWVyYVBvc2l0aW9uLnZhbHVlPWEucG9zaXRpb24sdGhpcy5wcm9ncmFtLnVuaWZvcm1zLnZpZXdNYXRyaXgudmFsdWU9YS52aWV3TWF0cml4LHRoaXMubW9kZWxWaWV3TWF0cml4Lm11bHRpcGx5KGEudmlld01hdHJpeCx0aGlzLndvcmxkTWF0cml4KSx0aGlzLm5vcm1hbE1hdHJpeC5nZXROb3JtYWxNYXRyaXgodGhpcy5tb2RlbFZpZXdNYXRyaXgpLHRoaXMucHJvZ3JhbS51bmlmb3Jtcy5tb2RlbE1hdHJpeC52YWx1ZT10aGlzLndvcmxkTWF0cml4LHRoaXMucHJvZ3JhbS51bmlmb3Jtcy5tb2RlbFZpZXdNYXRyaXgudmFsdWU9dGhpcy5tb2RlbFZpZXdNYXRyaXgsdGhpcy5wcm9ncmFtLnVuaWZvcm1zLm5vcm1hbE1hdHJpeC52YWx1ZT10aGlzLm5vcm1hbE1hdHJpeCk7bGV0IGI9dGhpcy5wcm9ncmFtLmN1bGxGYWNlJiYwPnRoaXMud29ybGRNYXRyaXguZGV0ZXJtaW5hbnQoKTt0aGlzLnByb2dyYW0udXNlKHtmbGlwRmFjZXM6Yn0pLHRoaXMuZ2VvbWV0cnkuZHJhdyh7bW9kZTp0aGlzLm1vZGUscHJvZ3JhbTp0aGlzLnByb2dyYW19KSx0aGlzLm9uQWZ0ZXJSZW5kZXImJnRoaXMub25BZnRlclJlbmRlcih7bWVzaDp0aGlzLGNhbWVyYTphfSl9fWxldCBWPW5ldyBVaW50OEFycmF5KDQpO2Z1bmN0aW9uIFcoYSl7cmV0dXJuIDA9PShhJmEtMSl9bGV0IFg9MDtjbGFzcyBve2NvbnN0cnVjdG9yKGEse2ltYWdlOmUsdGFyZ2V0OmY9YS5URVhUVVJFXzJELHR5cGU6Zz1hLlVOU0lHTkVEX0JZVEUsZm9ybWF0OmI9YS5SR0JBLGludGVybmFsRm9ybWF0Omg9Yix3cmFwUzppPWEuQ0xBTVBfVE9fRURHRSx3cmFwVDpqPWEuQ0xBTVBfVE9fRURHRSxnZW5lcmF0ZU1pcG1hcHM6Yz0hMCxtaW5GaWx0ZXI6az1jP2EuTkVBUkVTVF9NSVBNQVBfTElORUFSOmEuTElORUFSLG1hZ0ZpbHRlcjpsPWEuTElORUFSLHByZW11bHRpcGx5QWxwaGE6bT0hMSx1bnBhY2tBbGlnbm1lbnQ6bj00LGZsaXBZOm89ITAsbGV2ZWw6cD0wLHdpZHRoOmQsaGVpZ2h0OnE9ZH09e30pe3RoaXMuZ2w9YSx0aGlzLmlkPVgrKyx0aGlzLmltYWdlPWUsdGhpcy50YXJnZXQ9Zix0aGlzLnR5cGU9Zyx0aGlzLmZvcm1hdD1iLHRoaXMuaW50ZXJuYWxGb3JtYXQ9aCx0aGlzLm1pbkZpbHRlcj1rLHRoaXMubWFnRmlsdGVyPWwsdGhpcy53cmFwUz1pLHRoaXMud3JhcFQ9aix0aGlzLmdlbmVyYXRlTWlwbWFwcz1jLHRoaXMucHJlbXVsdGlwbHlBbHBoYT1tLHRoaXMudW5wYWNrQWxpZ25tZW50PW4sdGhpcy5mbGlwWT1vLHRoaXMubGV2ZWw9cCx0aGlzLndpZHRoPWQsdGhpcy5oZWlnaHQ9cSx0aGlzLnRleHR1cmU9dGhpcy5nbC5jcmVhdGVUZXh0dXJlKCksdGhpcy5zdG9yZT17aW1hZ2U6bnVsbH0sdGhpcy5nbFN0YXRlPXRoaXMuZ2wucmVuZGVyZXIuc3RhdGUsdGhpcy5zdGF0ZT17fSx0aGlzLnN0YXRlLm1pbkZpbHRlcj10aGlzLmdsLk5FQVJFU1RfTUlQTUFQX0xJTkVBUix0aGlzLnN0YXRlLm1hZ0ZpbHRlcj10aGlzLmdsLkxJTkVBUix0aGlzLnN0YXRlLndyYXBTPXRoaXMuZ2wuUkVQRUFULHRoaXMuc3RhdGUud3JhcFQ9dGhpcy5nbC5SRVBFQVR9YmluZCgpe3RoaXMuZ2xTdGF0ZS50ZXh0dXJlVW5pdHNbdGhpcy5nbFN0YXRlLmFjdGl2ZVRleHR1cmVVbml0XSE9PXRoaXMuaWQmJih0aGlzLmdsLmJpbmRUZXh0dXJlKHRoaXMudGFyZ2V0LHRoaXMudGV4dHVyZSksdGhpcy5nbFN0YXRlLnRleHR1cmVVbml0c1t0aGlzLmdsU3RhdGUuYWN0aXZlVGV4dHVyZVVuaXRdPXRoaXMuaWQpfXVwZGF0ZShhPTApe2xldCBiPSEodGhpcy5pbWFnZT09PXRoaXMuc3RvcmUuaW1hZ2UmJiF0aGlzLm5lZWRzVXBkYXRlKTsoYnx8dGhpcy5nbFN0YXRlLnRleHR1cmVVbml0c1thXSE9PXRoaXMuaWQpJiYodGhpcy5nbC5yZW5kZXJlci5hY3RpdmVUZXh0dXJlKGEpLHRoaXMuYmluZCgpKSxiJiYodGhpcy5uZWVkc1VwZGF0ZT0hMSx0aGlzLmZsaXBZIT09dGhpcy5nbFN0YXRlLmZsaXBZJiYodGhpcy5nbC5waXhlbFN0b3JlaSh0aGlzLmdsLlVOUEFDS19GTElQX1lfV0VCR0wsdGhpcy5mbGlwWSksdGhpcy5nbFN0YXRlLmZsaXBZPXRoaXMuZmxpcFkpLHRoaXMucHJlbXVsdGlwbHlBbHBoYSE9PXRoaXMuZ2xTdGF0ZS5wcmVtdWx0aXBseUFscGhhJiYodGhpcy5nbC5waXhlbFN0b3JlaSh0aGlzLmdsLlVOUEFDS19QUkVNVUxUSVBMWV9BTFBIQV9XRUJHTCx0aGlzLnByZW11bHRpcGx5QWxwaGEpLHRoaXMuZ2xTdGF0ZS5wcmVtdWx0aXBseUFscGhhPXRoaXMucHJlbXVsdGlwbHlBbHBoYSksdGhpcy51bnBhY2tBbGlnbm1lbnQhPT10aGlzLmdsU3RhdGUudW5wYWNrQWxpZ25tZW50JiYodGhpcy5nbC5waXhlbFN0b3JlaSh0aGlzLmdsLlVOUEFDS19BTElHTk1FTlQsdGhpcy51bnBhY2tBbGlnbm1lbnQpLHRoaXMuZ2xTdGF0ZS51bnBhY2tBbGlnbm1lbnQ9dGhpcy51bnBhY2tBbGlnbm1lbnQpLHRoaXMubWluRmlsdGVyIT09dGhpcy5zdGF0ZS5taW5GaWx0ZXImJih0aGlzLmdsLnRleFBhcmFtZXRlcmkodGhpcy50YXJnZXQsdGhpcy5nbC5URVhUVVJFX01JTl9GSUxURVIsdGhpcy5taW5GaWx0ZXIpLHRoaXMuc3RhdGUubWluRmlsdGVyPXRoaXMubWluRmlsdGVyKSx0aGlzLm1hZ0ZpbHRlciE9PXRoaXMuc3RhdGUubWFnRmlsdGVyJiYodGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMudGFyZ2V0LHRoaXMuZ2wuVEVYVFVSRV9NQUdfRklMVEVSLHRoaXMubWFnRmlsdGVyKSx0aGlzLnN0YXRlLm1hZ0ZpbHRlcj10aGlzLm1hZ0ZpbHRlciksdGhpcy53cmFwUyE9PXRoaXMuc3RhdGUud3JhcFMmJih0aGlzLmdsLnRleFBhcmFtZXRlcmkodGhpcy50YXJnZXQsdGhpcy5nbC5URVhUVVJFX1dSQVBfUyx0aGlzLndyYXBTKSx0aGlzLnN0YXRlLndyYXBTPXRoaXMud3JhcFMpLHRoaXMud3JhcFQhPT10aGlzLnN0YXRlLndyYXBUJiYodGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMudGFyZ2V0LHRoaXMuZ2wuVEVYVFVSRV9XUkFQX1QsdGhpcy53cmFwVCksdGhpcy5zdGF0ZS53cmFwVD10aGlzLndyYXBUKSx0aGlzLmltYWdlPyh0aGlzLmltYWdlLndpZHRoJiYodGhpcy53aWR0aD10aGlzLmltYWdlLndpZHRoLHRoaXMuaGVpZ2h0PXRoaXMuaW1hZ2UuaGVpZ2h0KSx0aGlzLmdsLnJlbmRlcmVyLmlzV2ViZ2wyfHxBcnJheUJ1ZmZlci5pc1ZpZXcodGhpcy5pbWFnZSk/dGhpcy5nbC50ZXhJbWFnZTJEKHRoaXMudGFyZ2V0LHRoaXMubGV2ZWwsdGhpcy5pbnRlcm5hbEZvcm1hdCx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0LDAsdGhpcy5mb3JtYXQsdGhpcy50eXBlLHRoaXMuaW1hZ2UpOnRoaXMuZ2wudGV4SW1hZ2UyRCh0aGlzLnRhcmdldCx0aGlzLmxldmVsLHRoaXMuaW50ZXJuYWxGb3JtYXQsdGhpcy5mb3JtYXQsdGhpcy50eXBlLHRoaXMuaW1hZ2UpLHRoaXMuZ2VuZXJhdGVNaXBtYXBzJiYodGhpcy5nbC5yZW5kZXJlci5pc1dlYmdsMnx8Vyh0aGlzLmltYWdlLndpZHRoKSYmVyh0aGlzLmltYWdlLmhlaWdodCk/dGhpcy5nbC5nZW5lcmF0ZU1pcG1hcCh0aGlzLnRhcmdldCk6KHRoaXMuZ2VuZXJhdGVNaXBtYXBzPSExLHRoaXMud3JhcFM9dGhpcy53cmFwVD10aGlzLmdsLkNMQU1QX1RPX0VER0UsdGhpcy5taW5GaWx0ZXI9dGhpcy5nbC5MSU5FQVIpKSk6dGhpcy53aWR0aD90aGlzLmdsLnRleEltYWdlMkQodGhpcy50YXJnZXQsdGhpcy5sZXZlbCx0aGlzLmludGVybmFsRm9ybWF0LHRoaXMud2lkdGgsdGhpcy5oZWlnaHQsMCx0aGlzLmZvcm1hdCx0aGlzLnR5cGUsbnVsbCk6dGhpcy5nbC50ZXhJbWFnZTJEKHRoaXMudGFyZ2V0LDAsdGhpcy5nbC5SR0JBLDEsMSwwLHRoaXMuZ2wuUkdCQSx0aGlzLmdsLlVOU0lHTkVEX0JZVEUsViksdGhpcy5zdG9yZS5pbWFnZT10aGlzLmltYWdlLHRoaXMub25VcGRhdGUmJnRoaXMub25VcGRhdGUoKSl9fWNsYXNzIHB7Y29uc3RydWN0b3IoYSx7d2lkdGg6Yj1hLmNhbnZhcy53aWR0aCxoZWlnaHQ6Yz1hLmNhbnZhcy5oZWlnaHQsdGFyZ2V0Oms9YS5GUkFNRUJVRkZFUixjb2xvcjpsPTEsZGVwdGg6ZT0hMCxzdGVuY2lsOmY9ITEsZGVwdGhUZXh0dXJlOm09ITEsd3JhcFM6Zz1hLkNMQU1QX1RPX0VER0Usd3JhcFQ6aD1hLkNMQU1QX1RPX0VER0UsbWluRmlsdGVyOmk9YS5MSU5FQVIsbWFnRmlsdGVyOm49aSx0eXBlOnA9YS5VTlNJR05FRF9CWVRFLGZvcm1hdDpqPWEuUkdCQSxpbnRlcm5hbEZvcm1hdDpxPWosdW5wYWNrQWxpZ25tZW50OnIscHJlbXVsdGlwbHlBbHBoYTpzfT17fSl7dGhpcy5nbD1hLHRoaXMud2lkdGg9Yix0aGlzLmhlaWdodD1jLHRoaXMuYnVmZmVyPXRoaXMuZ2wuY3JlYXRlRnJhbWVidWZmZXIoKSx0aGlzLnRhcmdldD1rLHRoaXMuZ2wuYmluZEZyYW1lYnVmZmVyKHRoaXMudGFyZ2V0LHRoaXMuYnVmZmVyKSx0aGlzLnRleHR1cmVzPVtdO2ZvcihsZXQgZD0wO2Q8bDtkKyspdGhpcy50ZXh0dXJlcy5wdXNoKG5ldyBvKGEse3dpZHRoOmIsaGVpZ2h0OmMsd3JhcFM6Zyx3cmFwVDpoLG1pbkZpbHRlcjppLG1hZ0ZpbHRlcjpuLHR5cGU6cCxmb3JtYXQ6aixpbnRlcm5hbEZvcm1hdDpxLHVucGFja0FsaWdubWVudDpyLHByZW11bHRpcGx5QWxwaGE6cyxmbGlwWTohMSxnZW5lcmF0ZU1pcG1hcHM6ITF9KSksdGhpcy50ZXh0dXJlc1tkXS51cGRhdGUoKSx0aGlzLmdsLmZyYW1lYnVmZmVyVGV4dHVyZTJEKHRoaXMudGFyZ2V0LHRoaXMuZ2wuQ09MT1JfQVRUQUNITUVOVDArZCx0aGlzLmdsLlRFWFRVUkVfMkQsdGhpcy50ZXh0dXJlc1tkXS50ZXh0dXJlLDApO3RoaXMudGV4dHVyZT10aGlzLnRleHR1cmVzWzBdLG0mJih0aGlzLmdsLnJlbmRlcmVyLmlzV2ViZ2wyfHx0aGlzLmdsLnJlbmRlcmVyLmdldEV4dGVuc2lvbihcIldFQkdMX2RlcHRoX3RleHR1cmVcIikpPyh0aGlzLmRlcHRoVGV4dHVyZT1uZXcgbyhhLHt3aWR0aDpiLGhlaWdodDpjLHdyYXBTOmcsd3JhcFQ6aCxtaW5GaWx0ZXI6dGhpcy5nbC5ORUFSRVNULG1hZ0ZpbHRlcjp0aGlzLmdsLk5FQVJFU1QsZmxpcFk6ITEsZm9ybWF0OnRoaXMuZ2wuREVQVEhfQ09NUE9ORU5ULGludGVybmFsRm9ybWF0OmEucmVuZGVyZXIuaXNXZWJnbDI/dGhpcy5nbC5ERVBUSF9DT01QT05FTlQyNDp0aGlzLmdsLkRFUFRIX0NPTVBPTkVOVCx0eXBlOnRoaXMuZ2wuVU5TSUdORURfSU5ULGdlbmVyYXRlTWlwbWFwczohMX0pLHRoaXMuZGVwdGhUZXh0dXJlLnVwZGF0ZSgpLHRoaXMuZ2wuZnJhbWVidWZmZXJUZXh0dXJlMkQodGhpcy50YXJnZXQsdGhpcy5nbC5ERVBUSF9BVFRBQ0hNRU5ULHRoaXMuZ2wuVEVYVFVSRV8yRCx0aGlzLmRlcHRoVGV4dHVyZS50ZXh0dXJlLDApKTooZSYmIWYmJih0aGlzLmRlcHRoQnVmZmVyPXRoaXMuZ2wuY3JlYXRlUmVuZGVyYnVmZmVyKCksdGhpcy5nbC5iaW5kUmVuZGVyYnVmZmVyKHRoaXMuZ2wuUkVOREVSQlVGRkVSLHRoaXMuZGVwdGhCdWZmZXIpLHRoaXMuZ2wucmVuZGVyYnVmZmVyU3RvcmFnZSh0aGlzLmdsLlJFTkRFUkJVRkZFUix0aGlzLmdsLkRFUFRIX0NPTVBPTkVOVDE2LGIsYyksdGhpcy5nbC5mcmFtZWJ1ZmZlclJlbmRlcmJ1ZmZlcih0aGlzLnRhcmdldCx0aGlzLmdsLkRFUFRIX0FUVEFDSE1FTlQsdGhpcy5nbC5SRU5ERVJCVUZGRVIsdGhpcy5kZXB0aEJ1ZmZlcikpLGYmJiFlJiYodGhpcy5zdGVuY2lsQnVmZmVyPXRoaXMuZ2wuY3JlYXRlUmVuZGVyYnVmZmVyKCksdGhpcy5nbC5iaW5kUmVuZGVyYnVmZmVyKHRoaXMuZ2wuUkVOREVSQlVGRkVSLHRoaXMuc3RlbmNpbEJ1ZmZlciksdGhpcy5nbC5yZW5kZXJidWZmZXJTdG9yYWdlKHRoaXMuZ2wuUkVOREVSQlVGRkVSLHRoaXMuZ2wuU1RFTkNJTF9JTkRFWDgsYixjKSx0aGlzLmdsLmZyYW1lYnVmZmVyUmVuZGVyYnVmZmVyKHRoaXMudGFyZ2V0LHRoaXMuZ2wuU1RFTkNJTF9BVFRBQ0hNRU5ULHRoaXMuZ2wuUkVOREVSQlVGRkVSLHRoaXMuc3RlbmNpbEJ1ZmZlcikpLGUmJmYmJih0aGlzLmRlcHRoU3RlbmNpbEJ1ZmZlcj10aGlzLmdsLmNyZWF0ZVJlbmRlcmJ1ZmZlcigpLHRoaXMuZ2wuYmluZFJlbmRlcmJ1ZmZlcih0aGlzLmdsLlJFTkRFUkJVRkZFUix0aGlzLmRlcHRoU3RlbmNpbEJ1ZmZlciksdGhpcy5nbC5yZW5kZXJidWZmZXJTdG9yYWdlKHRoaXMuZ2wuUkVOREVSQlVGRkVSLHRoaXMuZ2wuREVQVEhfU1RFTkNJTCxiLGMpLHRoaXMuZ2wuZnJhbWVidWZmZXJSZW5kZXJidWZmZXIodGhpcy50YXJnZXQsdGhpcy5nbC5ERVBUSF9TVEVOQ0lMX0FUVEFDSE1FTlQsdGhpcy5nbC5SRU5ERVJCVUZGRVIsdGhpcy5kZXB0aFN0ZW5jaWxCdWZmZXIpKSksdGhpcy5nbC5iaW5kRnJhbWVidWZmZXIodGhpcy50YXJnZXQsbnVsbCl9fWNsYXNzIHEgZXh0ZW5kcyBBcnJheXtjb25zdHJ1Y3RvcihhPTAsYj0wLGM9MCl7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIGEmJihbYSxiLGNdPXEuaGV4VG9SR0IoYSkpLHN1cGVyKGEsYixjKSx0aGlzfWdldCByKCl7cmV0dXJuIHRoaXNbMF19c2V0IHIoYSl7dGhpc1swXT1hfWdldCBnKCl7cmV0dXJuIHRoaXNbMV19c2V0IGcoYSl7dGhpc1sxXT1hfWdldCBiKCl7cmV0dXJuIHRoaXNbMl19c2V0IGIoYSl7dGhpc1syXT1hfXNldChhLGIsYyl7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIGEmJihbYSxiLGNdPXEuaGV4VG9SR0IoYSkpLGEubGVuZ3RoP3RoaXMuY29weShhKToodGhpc1swXT1hLHRoaXNbMV09Yix0aGlzWzJdPWMsdGhpcyl9Y29weShhKXtyZXR1cm4gdGhpc1swXT1hWzBdLHRoaXNbMV09YVsxXSx0aGlzWzJdPWFbMl0sdGhpc31zdGF0aWMgaGV4VG9SR0IoYSl7ND09PWEubGVuZ3RoJiYoYT1hWzBdK2FbMV0rYVsxXSthWzJdK2FbMl0rYVszXSthWzNdKTtsZXQgYj0vXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pLmV4ZWMoYSk7cmV0dXJuIGJ8fGNvbnNvbGUud2FybihgVW5hYmxlIHRvIGNvbnZlcnQgaGV4IHN0cmluZyAke2F9IHRvIHJnYiB2YWx1ZXNgKSxbcGFyc2VJbnQoYlsxXSwxNikvMjU1LHBhcnNlSW50KGJbMl0sMTYpLzI1NSxwYXJzZUludChiWzNdLDE2KS8yNTVdfX1mdW5jdGlvbiBZKGEsYixjKXtyZXR1cm4gYVswXT1iWzBdK2NbMF0sYVsxXT1iWzFdK2NbMV0sYX1mdW5jdGlvbiAkKGEsYixjKXtyZXR1cm4gYVswXT1iWzBdLWNbMF0sYVsxXT1iWzFdLWNbMV0sYX1mdW5jdGlvbiBaKGEsYixjKXtyZXR1cm4gYVswXT1iWzBdKmMsYVsxXT1iWzFdKmMsYX1mdW5jdGlvbiBhYShhKXt2YXIgYj1hWzBdLGM9YVsxXTtyZXR1cm4gTWF0aC5zcXJ0KGIqYitjKmMpfWNsYXNzIGUgZXh0ZW5kcyBBcnJheXtjb25zdHJ1Y3RvcihhPTAsYj1hKXtyZXR1cm4gc3VwZXIoYSxiKSx0aGlzfWdldCB4KCl7cmV0dXJuIHRoaXNbMF19c2V0IHgoYSl7dGhpc1swXT1hfWdldCB5KCl7cmV0dXJuIHRoaXNbMV19c2V0IHkoYSl7dGhpc1sxXT1hfXNldChhLGU9YSl7dmFyIGIsYyxkO3JldHVybiBhLmxlbmd0aD90aGlzLmNvcHkoYSk6KGI9dGhpcyxjPWEsZD1lLGJbMF09YyxiWzFdPWQsdGhpcyl9Y29weShjKXt2YXIgYixhO3JldHVybiBhPWMsKGI9dGhpcylbMF09YVswXSxiWzFdPWFbMV0sdGhpc31hZGQoYSxiKXtyZXR1cm4gYj9ZKHRoaXMsYSxiKTpZKHRoaXMsdGhpcyxhKSx0aGlzfXN1YihhLGIpe3JldHVybiBiPyQodGhpcyxhLGIpOiQodGhpcyx0aGlzLGEpLHRoaXN9bXVsdGlwbHkoYSl7dmFyIGQsYixjO3JldHVybiBhLmxlbmd0aD8oYj10aGlzLGM9YSwoZD10aGlzKVswXT1iWzBdKmNbMF0sZFsxXT1iWzFdKmNbMV0pOloodGhpcyx0aGlzLGEpLHRoaXN9ZGl2aWRlKGEpe3ZhciBkLGIsYztyZXR1cm4gYS5sZW5ndGg/KGI9dGhpcyxjPWEsKGQ9dGhpcylbMF09YlswXS9jWzBdLGRbMV09YlsxXS9jWzFdKTpaKHRoaXMsdGhpcywxL2EpLHRoaXN9aW52ZXJzZShjPXRoaXMpe3ZhciBiLGE7cmV0dXJuIGE9YywoYj10aGlzKVswXT0xL2FbMF0sYlsxXT0xL2FbMV0sdGhpc31sZW4oKXtyZXR1cm4gYWEodGhpcyl9ZGlzdGFuY2UoZCl7dmFyIGEsZSxiLGM7cmV0dXJuIGQ/KGE9dGhpcyxiPShlPWQpWzBdLWFbMF0sYz1lWzFdLWFbMV0sTWF0aC5zcXJ0KGIqYitjKmMpKTphYSh0aGlzKX1zcXVhcmVkTGVuKCl7cmV0dXJuIHRoaXMuc3F1YXJlZERpc3RhbmNlKCl9c3F1YXJlZERpc3RhbmNlKGcpe3ZhciBhLGgsYixjLGQsZSxmO3JldHVybiBnPyhhPXRoaXMsYj0oaD1nKVswXS1hWzBdLGM9aFsxXS1hWzFdLGIqYitjKmMpOihkPXRoaXMsZT1kWzBdLGY9ZFsxXSxlKmUrZipmKX1uZWdhdGUoYz10aGlzKXt2YXIgYixhO3JldHVybiBhPWMsKGI9dGhpcylbMF09LWFbMF0sYlsxXT0tYVsxXSx0aGlzfWNyb3NzKGMsZCl7dmFyIGIsYTtyZXR1cm4gYT1kLChiPWMpWzBdKmFbMV0tYlsxXSphWzBdfXNjYWxlKGEpe3JldHVybiBaKHRoaXMsdGhpcyxhKSx0aGlzfW5vcm1hbGl6ZSgpe3ZhciBjLGIsZCxlLGE7cmV0dXJuIGM9dGhpcyxkPShiPXRoaXMpWzBdLGU9YlsxXSwoYT1kKmQrZSplKT4wJiYoYT0xL01hdGguc3FydChhKSksY1swXT1iWzBdKmEsY1sxXT1iWzFdKmEsdGhpc31kb3QoYyl7dmFyIGIsYTtyZXR1cm4gYT1jLChiPXRoaXMpWzBdKmFbMF0rYlsxXSphWzFdfWVxdWFscyhjKXt2YXIgYixhO3JldHVybiBhPWMsKGI9dGhpcylbMF09PT1hWzBdJiZiWzFdPT09YVsxXX1hcHBseU1hdHJpeDMoZil7dmFyIGIsZSxhLGMsZDtyZXR1cm4gYj10aGlzLGE9ZixjPShlPXRoaXMpWzBdLGQ9ZVsxXSxiWzBdPWFbMF0qYythWzNdKmQrYVs2XSxiWzFdPWFbMV0qYythWzRdKmQrYVs3XSx0aGlzfWFwcGx5TWF0cml4NChmKXt2YXIgYixjLGE7bGV0IGQsZTtyZXR1cm4gYj10aGlzLGM9dGhpcyxhPWYsZD1jWzBdLGU9Y1sxXSxiWzBdPWFbMF0qZCthWzRdKmUrYVsxMl0sYlsxXT1hWzFdKmQrYVs1XSplK2FbMTNdLHRoaXN9bGVycChnLGgpe3ZhciBhLGIsYyxkLGUsZjthPXRoaXMsYj10aGlzLGM9ZyxkPWgsZT1iWzBdLGY9YlsxXSxhWzBdPWUrZCooY1swXS1lKSxhWzFdPWYrZCooY1sxXS1mKX1jbG9uZSgpe3JldHVybiBuZXcgZSh0aGlzWzBdLHRoaXNbMV0pfWZyb21BcnJheShhLGI9MCl7cmV0dXJuIHRoaXNbMF09YVtiXSx0aGlzWzFdPWFbYisxXSx0aGlzfXRvQXJyYXkoYT1bXSxiPTApe3JldHVybiBhW2JdPXRoaXNbMF0sYVtiKzFdPXRoaXNbMV0sYX19Y2xhc3MgciBleHRlbmRzIGZ7Y29uc3RydWN0b3Ioaix7d2lkdGg6az0xLGhlaWdodDpsPTEsd2lkdGhTZWdtZW50czptPTEsaGVpZ2h0U2VnbWVudHM6bj0xLGF0dHJpYnV0ZXM6ZD17fX09e30pe2xldCBiPW0sYz1uLGE9KGIrMSkqKGMrMSksZT1iKmMqNixmPW5ldyBGbG9hdDMyQXJyYXkoMyphKSxnPW5ldyBGbG9hdDMyQXJyYXkoMyphKSxoPW5ldyBGbG9hdDMyQXJyYXkoMiphKSxpPWE+NjU1MzY/bmV3IFVpbnQzMkFycmF5KGUpOm5ldyBVaW50MTZBcnJheShlKTtyLmJ1aWxkUGxhbmUoZixnLGgsaSxrLGwsMCxiLGMpLE9iamVjdC5hc3NpZ24oZCx7cG9zaXRpb246e3NpemU6MyxkYXRhOmZ9LG5vcm1hbDp7c2l6ZTozLGRhdGE6Z30sdXY6e3NpemU6MixkYXRhOmh9LGluZGV4OntkYXRhOml9fSksc3VwZXIoaixkKX1zdGF0aWMgYnVpbGRQbGFuZShpLGosayxmLGwsbSxuLGQsZyxvPTAscD0xLHE9Mix0PTEsdT0tMSxhPTAsZT0wKXtsZXQgaD1hLHY9bC9kLHc9bS9nO2ZvcihsZXQgYj0wO2I8PWc7YisrKXtsZXQgeD1iKnctbS8yO2ZvcihsZXQgYz0wO2M8PWQ7YysrLGErKyl7bGV0IHk9Yyp2LWwvMjtpZihpWzMqYStvXT15KnQsaVszKmErcF09eCp1LGlbMyphK3FdPW4vMixqWzMqYStvXT0wLGpbMyphK3BdPTAsalszKmErcV09bj49MD8xOi0xLGtbMiphXT1jL2Qsa1syKmErMV09MS1iL2csYj09PWd8fGM9PT1kKWNvbnRpbnVlO2xldCB6PWgrYytiKihkKzEpLHI9aCtjKyhiKzEpKihkKzEpLEE9aCtjKyhiKzEpKihkKzEpKzEscz1oK2MrYiooZCsxKSsxO2ZbNiplXT16LGZbNiplKzFdPXIsZls2KmUrMl09cyxmWzYqZSszXT1yLGZbNiplKzRdPUEsZls2KmUrNV09cyxlKyt9fX19bGV0IGFiPXtOT05FOi0xLFJPVEFURTowLERPTExZOjEsUEFOOjIsRE9MTFlfUEFOOjN9LGFjPW5ldyBiLGFkPW5ldyBlLGFlPW5ldyBlLGFmPW5ldyBiLGFnPW5ldyBiLGFoPW5ldyBiLGFpPW5ldyBjLGFqPW5ldyBiLGFrPW5ldyBkLGFsPW5ldyBiLGFtPW5ldyBiLGFuPW5ldyBkLGFvPW5ldyBiO2NsYXNzIHN7Y29uc3RydWN0b3Ioe29iamVjdHM6YixkYXRhOmF9KXt0aGlzLm9iamVjdHM9Yix0aGlzLmRhdGE9YSx0aGlzLmVsYXBzZWQ9MCx0aGlzLndlaWdodD0xLHRoaXMuZHVyYXRpb249YS5mcmFtZXMubGVuZ3RoLTF9dXBkYXRlKGM9MSxkKXtsZXQgZT1kPzE6dGhpcy53ZWlnaHQvYyxiPXRoaXMuZWxhcHNlZCV0aGlzLmR1cmF0aW9uLGE9TWF0aC5mbG9vcihiKSxmPWItYSxnPXRoaXMuZGF0YS5mcmFtZXNbYV0saD10aGlzLmRhdGEuZnJhbWVzWyhhKzEpJXRoaXMuZHVyYXRpb25dO3RoaXMub2JqZWN0cy5mb3JFYWNoKChiLGEpPT57YWouZnJvbUFycmF5KGcucG9zaXRpb24sMyphKSxhay5mcm9tQXJyYXkoZy5xdWF0ZXJuaW9uLDQqYSksYWwuZnJvbUFycmF5KGcuc2NhbGUsMyphKSxhbS5mcm9tQXJyYXkoaC5wb3NpdGlvbiwzKmEpLGFuLmZyb21BcnJheShoLnF1YXRlcm5pb24sNCphKSxhby5mcm9tQXJyYXkoaC5zY2FsZSwzKmEpLGFqLmxlcnAoYW0sZiksYWsuc2xlcnAoYW4sZiksYWwubGVycChhbyxmKSxiLnBvc2l0aW9uLmxlcnAoYWosZSksYi5xdWF0ZXJuaW9uLnNsZXJwKGFrLGUpLGIuc2NhbGUubGVycChhbCxlKX0pfX1sZXQgYXA9bmV3IGM7cmV0dXJuIGEuQW5pbWF0aW9uPXMsYS5Cb3g9Y2xhc3MgZXh0ZW5kcyBme2NvbnN0cnVjdG9yKHAse3dpZHRoOmg9MSxoZWlnaHQ6aT0xLGRlcHRoOmo9MSx3aWR0aFNlZ21lbnRzOnE9MSxoZWlnaHRTZWdtZW50czpzPTEsZGVwdGhTZWdtZW50czp0PTEsYXR0cmlidXRlczpuPXt9fT17fSl7bGV0IGM9cSxhPXMsYj10LG09KGMrMSkqKGErMSkqMisoYysxKSooYisxKSoyKyhhKzEpKihiKzEpKjIsbz02KihjKmEqMitjKmIqMithKmIqMiksZD1uZXcgRmxvYXQzMkFycmF5KDMqbSksZT1uZXcgRmxvYXQzMkFycmF5KDMqbSksZj1uZXcgRmxvYXQzMkFycmF5KDIqbSksZz1tPjY1NTM2P25ldyBVaW50MzJBcnJheShvKTpuZXcgVWludDE2QXJyYXkobyksaz0wLGw9MDtyLmJ1aWxkUGxhbmUoZCxlLGYsZyxqLGksaCxiLGEsMiwxLDAsLTEsLTEsayxsKSxyLmJ1aWxkUGxhbmUoZCxlLGYsZyxqLGksLWgsYixhLDIsMSwwLDEsLTEsays9KGIrMSkqKGErMSksbCs9YiphKSxyLmJ1aWxkUGxhbmUoZCxlLGYsZyxoLGosaSxiLGEsMCwyLDEsMSwxLGsrPShiKzEpKihhKzEpLGwrPWIqYSksci5idWlsZFBsYW5lKGQsZSxmLGcsaCxqLC1pLGIsYSwwLDIsMSwxLC0xLGsrPShjKzEpKihiKzEpLGwrPWMqYiksci5idWlsZFBsYW5lKGQsZSxmLGcsaCxpLC1qLGMsYSwwLDEsMiwtMSwtMSxrKz0oYysxKSooYisxKSxsKz1jKmIpLHIuYnVpbGRQbGFuZShkLGUsZixnLGgsaSxqLGMsYSwwLDEsMiwxLC0xLGsrPShjKzEpKihhKzEpLGwrPWMqYSksT2JqZWN0LmFzc2lnbihuLHtwb3NpdGlvbjp7c2l6ZTozLGRhdGE6ZH0sbm9ybWFsOntzaXplOjMsZGF0YTplfSx1djp7c2l6ZToyLGRhdGE6Zn0saW5kZXg6e2RhdGE6Z319KSxzdXBlcihwLG4pfX0sYS5DYW1lcmE9Y2xhc3MgZXh0ZW5kcyBne2NvbnN0cnVjdG9yKGQse25lYXI6ZT0uMSxmYXI6Zj0xMDAsZm92Omc9NDUsYXNwZWN0Omg9MSxsZWZ0OmEscmlnaHQ6Yixib3R0b206aSx0b3A6an09e30pe3N1cGVyKGQpLHRoaXMubmVhcj1lLHRoaXMuZmFyPWYsdGhpcy5mb3Y9Zyx0aGlzLmFzcGVjdD1oLHRoaXMucHJvamVjdGlvbk1hdHJpeD1uZXcgYyx0aGlzLnZpZXdNYXRyaXg9bmV3IGMsdGhpcy5wcm9qZWN0aW9uVmlld01hdHJpeD1uZXcgYyxhfHxiP3RoaXMub3J0aG9ncmFwaGljKHtsZWZ0OmEscmlnaHQ6Yixib3R0b206aSx0b3A6an0pOnRoaXMucGVyc3BlY3RpdmUoKX1wZXJzcGVjdGl2ZSh7bmVhcjphPXRoaXMubmVhcixmYXI6Yj10aGlzLmZhcixmb3Y6Yz10aGlzLmZvdixhc3BlY3Q6ZD10aGlzLmFzcGVjdH09e30pe3JldHVybiB0aGlzLnByb2plY3Rpb25NYXRyaXguZnJvbVBlcnNwZWN0aXZlKHtmb3Y6YyooTWF0aC5QSS8xODApLGFzcGVjdDpkLG5lYXI6YSxmYXI6Yn0pLHRoaXMudHlwZT1cInBlcnNwZWN0aXZlXCIsdGhpc31vcnRob2dyYXBoaWMoe25lYXI6YT10aGlzLm5lYXIsZmFyOmI9dGhpcy5mYXIsbGVmdDpjPS0xLHJpZ2h0OmQ9MSxib3R0b206ZT0tMSx0b3A6Zj0xfT17fSl7cmV0dXJuIHRoaXMucHJvamVjdGlvbk1hdHJpeC5mcm9tT3J0aG9nb25hbCh7bGVmdDpjLHJpZ2h0OmQsYm90dG9tOmUsdG9wOmYsbmVhcjphLGZhcjpifSksdGhpcy50eXBlPVwib3J0aG9ncmFwaGljXCIsdGhpc311cGRhdGVNYXRyaXhXb3JsZCgpe3JldHVybiBzdXBlci51cGRhdGVNYXRyaXhXb3JsZCgpLHRoaXMudmlld01hdHJpeC5pbnZlcnNlKHRoaXMud29ybGRNYXRyaXgpLHRoaXMucHJvamVjdGlvblZpZXdNYXRyaXgubXVsdGlwbHkodGhpcy5wcm9qZWN0aW9uTWF0cml4LHRoaXMudmlld01hdHJpeCksdGhpc31sb29rQXQoYSl7cmV0dXJuIHN1cGVyLmxvb2tBdChhLCEwKSx0aGlzfXByb2plY3QoYSl7cmV0dXJuIGEuYXBwbHlNYXRyaXg0KHRoaXMudmlld01hdHJpeCksYS5hcHBseU1hdHJpeDQodGhpcy5wcm9qZWN0aW9uTWF0cml4KSx0aGlzfXVucHJvamVjdChhKXtyZXR1cm4gYS5hcHBseU1hdHJpeDQoUS5pbnZlcnNlKHRoaXMucHJvamVjdGlvbk1hdHJpeCkpLGEuYXBwbHlNYXRyaXg0KHRoaXMud29ybGRNYXRyaXgpLHRoaXN9dXBkYXRlRnJ1c3R1bSgpe3RoaXMuZnJ1c3R1bXx8KHRoaXMuZnJ1c3R1bT1bbmV3IGIsbmV3IGIsbmV3IGIsbmV3IGIsbmV3IGIsbmV3IGJdKTtsZXQgYT10aGlzLnByb2plY3Rpb25WaWV3TWF0cml4O3RoaXMuZnJ1c3R1bVswXS5zZXQoYVszXS1hWzBdLGFbN10tYVs0XSxhWzExXS1hWzhdKS5jb25zdGFudD1hWzE1XS1hWzEyXSx0aGlzLmZydXN0dW1bMV0uc2V0KGFbM10rYVswXSxhWzddK2FbNF0sYVsxMV0rYVs4XSkuY29uc3RhbnQ9YVsxNV0rYVsxMl0sdGhpcy5mcnVzdHVtWzJdLnNldChhWzNdK2FbMV0sYVs3XSthWzVdLGFbMTFdK2FbOV0pLmNvbnN0YW50PWFbMTVdK2FbMTNdLHRoaXMuZnJ1c3R1bVszXS5zZXQoYVszXS1hWzFdLGFbN10tYVs1XSxhWzExXS1hWzldKS5jb25zdGFudD1hWzE1XS1hWzEzXSx0aGlzLmZydXN0dW1bNF0uc2V0KGFbM10tYVsyXSxhWzddLWFbNl0sYVsxMV0tYVsxMF0pLmNvbnN0YW50PWFbMTVdLWFbMTRdLHRoaXMuZnJ1c3R1bVs1XS5zZXQoYVszXSthWzJdLGFbN10rYVs2XSxhWzExXSthWzEwXSkuY29uc3RhbnQ9YVsxNV0rYVsxNF07Zm9yKGxldCBjPTA7Yzw2O2MrKyl7bGV0IGQ9MS90aGlzLmZydXN0dW1bY10uZGlzdGFuY2UoKTt0aGlzLmZydXN0dW1bY10ubXVsdGlwbHkoZCksdGhpcy5mcnVzdHVtW2NdLmNvbnN0YW50Kj1kfX1mcnVzdHVtSW50ZXJzZWN0c01lc2goYSl7aWYoIWEuZ2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbilyZXR1cm4hMDthLmdlb21ldHJ5LmJvdW5kcyYmYS5nZW9tZXRyeS5ib3VuZHMucmFkaXVzIT09MS8wfHxhLmdlb21ldHJ5LmNvbXB1dGVCb3VuZGluZ1NwaGVyZSgpO2xldCBiPVI7Yi5jb3B5KGEuZ2VvbWV0cnkuYm91bmRzLmNlbnRlciksYi5hcHBseU1hdHJpeDQoYS53b3JsZE1hdHJpeCk7bGV0IGM9YS5nZW9tZXRyeS5ib3VuZHMucmFkaXVzKmEud29ybGRNYXRyaXguZ2V0TWF4U2NhbGVPbkF4aXMoKTtyZXR1cm4gdGhpcy5mcnVzdHVtSW50ZXJzZWN0c1NwaGVyZShiLGMpfWZydXN0dW1JbnRlcnNlY3RzU3BoZXJlKGMsZCl7bGV0IGU9Uztmb3IobGV0IGE9MDthPDY7YSsrKXtsZXQgYj10aGlzLmZydXN0dW1bYV07aWYoZS5jb3B5KGIpLmRvdChjKStiLmNvbnN0YW50PCAtZClyZXR1cm4hMX1yZXR1cm4hMH19LGEuQ29sb3I9cSxhLkN5bGluZGVyPWNsYXNzIGV4dGVuZHMgZntjb25zdHJ1Y3RvcihBLHtyYWRpdXM6dz0uNSxoZWlnaHQ6cj0xLHJhZGlhbFNlZ21lbnRzOnM9MTYsaGVpZ2h0U2VnbWVudHM6dD0xLGF0dHJpYnV0ZXM6eD17fX09e30pe2xldCB1PXMsbz10LHE9KHMrMSkqKHQrMSkrMix5PXMqKDIrMip0KSozLGg9bmV3IEZsb2F0MzJBcnJheSgzKnEpLGk9bmV3IEZsb2F0MzJBcnJheSgzKnEpLG49bmV3IEZsb2F0MzJBcnJheSgyKnEpLGQ9cT42NTUzNj9uZXcgVWludDMyQXJyYXkoeSk6bmV3IFVpbnQxNkFycmF5KHkpLGssbCxtLGE9MCxlPW5ldyBiO2s9MCxsPS0wLjUqcixtPTAsaFszKmErMF09ayxoWzMqYSsxXT1sLGhbMyphKzJdPW0sZS5zZXQoayxsLG0pLm5vcm1hbGl6ZSgpLGlbMyphXT1lLngsaVszKmErMV09ZS55LGlbMyphKzJdPWUueixuWzIqYV09MCxuWzIqYSsxXT0xO2xldCBCPWE7az0wLGw9LjUqcixtPTAsaFszKiArK2ErMF09ayxoWzMqYSsxXT1sLGhbMyphKzJdPW0sZS5zZXQoayxsLG0pLm5vcm1hbGl6ZSgpLGlbMyphXT1lLngsaVszKmErMV09ZS55LGlbMyphKzJdPWUueixuWzIqYV09MCxuWzIqYSsxXT0wO2xldCBDPWE7YSsrO2Zvcih2YXIgZj0wO2Y8dSsxO2YrKyl7bGV0IHY9Zi91O2Zvcih2YXIgZz0wO2c8bysxO2crKyl7bGV0IHo9Zy9vO2s9TWF0aC5jb3ModipNYXRoLlBJKjIpKncsbD0oei0uNSkqcixtPU1hdGguc2luKHYqTWF0aC5QSSoyKSp3LGhbMyphKzBdPWssaFszKmErMV09bCxoWzMqYSsyXT1tLGUuc2V0KGssbCxtKS5ub3JtYWxpemUoKSxpWzMqYV09ZS54LGlbMyphKzFdPWUueSxpWzMqYSsyXT1lLnosblsyKmFdPXYsblsyKmErMV09MS16LGErK319bGV0IGM9MCxqPW8rMTtmb3IoZj0wO2Y8dTtmKyspe2xldCBwPWYrMTtmb3IoZFszKmMrMF09QixkWzMqYysxXT0yK2YqaixkWzMqYysyXT0yK3AqaixjKyssZz0wO2c8bztnKyspZFszKmMrMF09MitmKmorKGcrMCksZFszKmMrMV09MitmKmorKGcrMSksZFszKmMrMl09MitwKmorKGcrMCksZFszKiArK2MrMF09MitwKmorKGcrMCksZFszKmMrMV09MitmKmorKGcrMSksZFszKmMrMl09MitwKmorKGcrMSksYysrO2RbMypjKzBdPTIrcCpqK28sZFszKmMrMV09MitmKmorbyxkWzMqYysyXT1DLGMrK31PYmplY3QuYXNzaWduKHgse3Bvc2l0aW9uOntzaXplOjMsZGF0YTpofSxub3JtYWw6e3NpemU6MyxkYXRhOml9LHV2OntzaXplOjIsZGF0YTpufSxpbmRleDp7ZGF0YTpkfX0pLHN1cGVyKEEseCl9fSxhLkV1bGVyPWwsYS5GbG93bWFwPWNsYXNze2NvbnN0cnVjdG9yKGEse3NpemU6aT01MTIsZmFsbG9mZjpjPS4zLGFscGhhOmQ9MSxkaXNzaXBhdGlvbjpnPS45Nn09e30pe2xldCBiPXRoaXM7dGhpcy5nbD1hLHRoaXMudW5pZm9ybT17dmFsdWU6bnVsbH0sdGhpcy5tYXNrPXtyZWFkOm51bGwsd3JpdGU6bnVsbCxzd2FwKCl7bGV0IGE9Yi5tYXNrLnJlYWQ7Yi5tYXNrLnJlYWQ9Yi5tYXNrLndyaXRlLGIubWFzay53cml0ZT1hLGIudW5pZm9ybS52YWx1ZT1iLm1hc2sucmVhZC50ZXh0dXJlfX0sZnVuY3Rpb24oKXtsZXQgZD1hLnJlbmRlcmVyLmV4dGVuc2lvbnNbYE9FU190ZXh0dXJlXyR7YS5yZW5kZXJlci5pc1dlYmdsMj9cIlwiOlwiaGFsZl9cIn1mbG9hdF9saW5lYXJgXSxjPXt3aWR0aDppLGhlaWdodDppLHR5cGU6YS5yZW5kZXJlci5pc1dlYmdsMj9hLkhBTEZfRkxPQVQ6YS5yZW5kZXJlci5leHRlbnNpb25zLk9FU190ZXh0dXJlX2hhbGZfZmxvYXQ/YS5yZW5kZXJlci5leHRlbnNpb25zLk9FU190ZXh0dXJlX2hhbGZfZmxvYXQuSEFMRl9GTE9BVF9PRVM6YS5VTlNJR05FRF9CWVRFLGZvcm1hdDphLlJHQkEsaW50ZXJuYWxGb3JtYXQ6YS5yZW5kZXJlci5pc1dlYmdsMj9hLlJHQkExNkY6YS5SR0JBLG1pbkZpbHRlcjpkP2EuTElORUFSOmEuTkVBUkVTVCxkZXB0aDohMX07Yi5tYXNrLnJlYWQ9bmV3IHAoYSxjKSxiLm1hc2sud3JpdGU9bmV3IHAoYSxjKSxiLm1hc2suc3dhcCgpfSgpLHRoaXMuYXNwZWN0PTEsdGhpcy5tb3VzZT1uZXcgZSx0aGlzLnZlbG9jaXR5PW5ldyBlLHRoaXMubWVzaD1uZXcgbihhLHtnZW9tZXRyeTpuZXcgZihhLHtwb3NpdGlvbjp7c2l6ZToyLGRhdGE6bmV3IEZsb2F0MzJBcnJheShbLTEsLTEsMywtMSwtMSwzXSl9LHV2OntzaXplOjIsZGF0YTpuZXcgRmxvYXQzMkFycmF5KFswLDAsMiwwLDAsMl0pfX0pLHByb2dyYW06bmV3IGgoYSx7dmVydGV4OlwiXFxuICAgIGF0dHJpYnV0ZSB2ZWMyIHV2O1xcbiAgICBhdHRyaWJ1dGUgdmVjMiBwb3NpdGlvbjtcXG5cXG4gICAgdmFyeWluZyB2ZWMyIHZVdjtcXG5cXG4gICAgdm9pZCBtYWluKCkge1xcbiAgICAgICAgdlV2ID0gdXY7XFxuICAgICAgICBnbF9Qb3NpdGlvbiA9IHZlYzQocG9zaXRpb24sIDAsIDEpO1xcbiAgICB9XFxuXCIsZnJhZ21lbnQ6XCJcXG4gICAgcHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xcblxcbiAgICB1bmlmb3JtIHNhbXBsZXIyRCB0TWFwO1xcblxcbiAgICB1bmlmb3JtIGZsb2F0IHVGYWxsb2ZmO1xcbiAgICB1bmlmb3JtIGZsb2F0IHVBbHBoYTtcXG4gICAgdW5pZm9ybSBmbG9hdCB1RGlzc2lwYXRpb247XFxuXFxuICAgIHVuaWZvcm0gZmxvYXQgdUFzcGVjdDtcXG4gICAgdW5pZm9ybSB2ZWMyIHVNb3VzZTtcXG4gICAgdW5pZm9ybSB2ZWMyIHVWZWxvY2l0eTtcXG5cXG4gICAgdmFyeWluZyB2ZWMyIHZVdjtcXG5cXG4gICAgdm9pZCBtYWluKCkge1xcblxcbiAgICAgIHZlYzIgY3Vyc29yID0gdlV2IC0gdU1vdXNlO1xcblxcbiAgICAgICAgdmVjNCBjb2xvciA9IHRleHR1cmUyRCh0TWFwLCB2VXYpICogdURpc3NpcGF0aW9uO1xcblxcbiAgICAgICAgY3Vyc29yLnggKj0gdUFzcGVjdDtcXG5cXG4gICAgICAgIHZlYzMgc3RhbXAgPSB2ZWMzKHVWZWxvY2l0eSAqIHZlYzIoMSwgLTEpLCAxLjAgLSBwb3coMS4wIC0gbWluKDEuMCwgbGVuZ3RoKHVWZWxvY2l0eSkpLCAzLjApKTtcXG4gICAgICAgIGZsb2F0IGZhbGxvZmYgPSBzbW9vdGhzdGVwKHVGYWxsb2ZmLCAwLjAsIGxlbmd0aChjdXJzb3IpKSAqIHVBbHBoYTtcXG5cXG4gICAgICAgIGNvbG9yLnJnYiA9IG1peChjb2xvci5yZ2IsIHN0YW1wLCB2ZWMzKGZhbGxvZmYpKTtcXG5cXG4gICAgICAgIGdsX0ZyYWdDb2xvciA9IGNvbG9yO1xcbiAgICB9XFxuXCIsdW5pZm9ybXM6e3RNYXA6Yi51bmlmb3JtLHVGYWxsb2ZmOnt2YWx1ZTouNSpjfSx1QWxwaGE6e3ZhbHVlOmR9LHVEaXNzaXBhdGlvbjp7dmFsdWU6Z30sdUFzcGVjdDp7dmFsdWU6MX0sdU1vdXNlOnt2YWx1ZTpiLm1vdXNlfSx1VmVsb2NpdHk6e3ZhbHVlOmIudmVsb2NpdHl9fSxkZXB0aFRlc3Q6ITF9KX0pfXVwZGF0ZSgpe3RoaXMubWVzaC5wcm9ncmFtLnVuaWZvcm1zLnVBc3BlY3QudmFsdWU9dGhpcy5hc3BlY3QsdGhpcy5nbC5yZW5kZXJlci5yZW5kZXIoe3NjZW5lOnRoaXMubWVzaCx0YXJnZXQ6dGhpcy5tYXNrLndyaXRlLGNsZWFyOiExfSksdGhpcy5tYXNrLnN3YXAoKX19LGEuR1BHUFU9Y2xhc3N7Y29uc3RydWN0b3IoYSx7ZGF0YTpkPW5ldyBGbG9hdDMyQXJyYXkoMTYpLGdlb21ldHJ5OmU9bmV3IGYoYSx7cG9zaXRpb246e3NpemU6MixkYXRhOm5ldyBGbG9hdDMyQXJyYXkoWy0xLC0xLDMsLTEsLTEsM10pfSx1djp7c2l6ZToyLGRhdGE6bmV3IEZsb2F0MzJBcnJheShbMCwwLDIsMCwwLDJdKX19KX0pe3RoaXMuZ2w9YTtsZXQgZz1kO3RoaXMucGFzc2VzPVtdLHRoaXMuZ2VvbWV0cnk9ZSx0aGlzLmRhdGFMZW5ndGg9Zy5sZW5ndGgvNCx0aGlzLnNpemU9TWF0aC5wb3coMixNYXRoLmNlaWwoTWF0aC5sb2coTWF0aC5jZWlsKE1hdGguc3FydCh0aGlzLmRhdGFMZW5ndGgpKSkvTWF0aC5MTjIpKSx0aGlzLmNvb3Jkcz1uZXcgRmxvYXQzMkFycmF5KDIqdGhpcy5kYXRhTGVuZ3RoKTtmb3IobGV0IGI9MDtiPHRoaXMuZGF0YUxlbmd0aDtiKyspe2xldCBoPWIldGhpcy5zaXplL3RoaXMuc2l6ZSxpPU1hdGguZmxvb3IoYi90aGlzLnNpemUpL3RoaXMuc2l6ZTt0aGlzLmNvb3Jkcy5zZXQoW2gsaV0sMipiKX1sZXQgaj0oKCk9PntpZihnLmxlbmd0aD09PXRoaXMuc2l6ZSp0aGlzLnNpemUqNClyZXR1cm4gZzt7bGV0IGE9bmV3IEZsb2F0MzJBcnJheSh0aGlzLnNpemUqdGhpcy5zaXplKjQpO3JldHVybiBhLnNldChnKSxhfX0pKCk7dGhpcy51bmlmb3JtPXt2YWx1ZTpuZXcgbyhhLHtpbWFnZTpqLHRhcmdldDphLlRFWFRVUkVfMkQsdHlwZTphLkZMT0FULGZvcm1hdDphLlJHQkEsaW50ZXJuYWxGb3JtYXQ6YS5yZW5kZXJlci5pc1dlYmdsMj9hLlJHQkEzMkY6YS5SR0JBLHdyYXBTOmEuQ0xBTVBfVE9fRURHRSx3cmFwVDphLkNMQU1QX1RPX0VER0UsZ2VuZXJhdGVNaXBtYXBzOiExLG1pbkZpbHRlcjphLk5FQVJFU1QsbWFnRmlsdGVyOmEuTkVBUkVTVCx3aWR0aDp0aGlzLnNpemUsZmxpcFk6ITF9KX07bGV0IGM9e3dpZHRoOnRoaXMuc2l6ZSxoZWlnaHQ6dGhpcy5zaXplLHR5cGU6YS5yZW5kZXJlci5pc1dlYmdsMj9hLkhBTEZfRkxPQVQ6YS5yZW5kZXJlci5leHRlbnNpb25zLk9FU190ZXh0dXJlX2hhbGZfZmxvYXQ/YS5yZW5kZXJlci5leHRlbnNpb25zLk9FU190ZXh0dXJlX2hhbGZfZmxvYXQuSEFMRl9GTE9BVF9PRVM6YS5VTlNJR05FRF9CWVRFLGZvcm1hdDphLlJHQkEsaW50ZXJuYWxGb3JtYXQ6YS5yZW5kZXJlci5pc1dlYmdsMj9hLlJHQkExNkY6YS5SR0JBLG1pbkZpbHRlcjphLk5FQVJFU1QsZGVwdGg6ITEsdW5wYWNrQWxpZ25tZW50OjF9O3RoaXMuZmJvPXtyZWFkOm5ldyBwKGEsYyksd3JpdGU6bmV3IHAoYSxjKSxzd2FwOigpPT57bGV0IGE9dGhpcy5mYm8ucmVhZDt0aGlzLmZiby5yZWFkPXRoaXMuZmJvLndyaXRlLHRoaXMuZmJvLndyaXRlPWEsdGhpcy51bmlmb3JtLnZhbHVlPXRoaXMuZmJvLnJlYWQudGV4dHVyZX19fWFkZFBhc3Moe3ZlcnRleDplPVwiXFxuICAgIGF0dHJpYnV0ZSB2ZWMyIHV2O1xcbiAgICBhdHRyaWJ1dGUgdmVjMiBwb3NpdGlvbjtcXG5cXG4gICAgdmFyeWluZyB2ZWMyIHZVdjtcXG5cXG4gICAgdm9pZCBtYWluKCkge1xcbiAgICAgICAgdlV2ID0gdXY7XFxuICAgICAgICBnbF9Qb3NpdGlvbiA9IHZlYzQocG9zaXRpb24sIDAsIDEpO1xcbiAgICB9XFxuXCIsZnJhZ21lbnQ6Zj1cIlxcbiAgICBwcmVjaXNpb24gaGlnaHAgZmxvYXQ7XFxuXFxuICAgIHVuaWZvcm0gc2FtcGxlcjJEIHRNYXA7XFxuICAgIHZhcnlpbmcgdmVjMiB2VXY7XFxuXFxuICAgIHZvaWQgbWFpbigpIHtcXG4gICAgICAgIGdsX0ZyYWdDb2xvciA9IHRleHR1cmUyRCh0TWFwLCB2VXYpO1xcbiAgICB9XFxuXCIsdW5pZm9ybXM6YT17fSx0ZXh0dXJlVW5pZm9ybTpiPVwidE1hcFwiLGVuYWJsZWQ6Zz0hMH09e30pe2FbYl09dGhpcy51bmlmb3JtO2xldCBjPW5ldyBoKHRoaXMuZ2wse3ZlcnRleDplLGZyYWdtZW50OmYsdW5pZm9ybXM6YX0pLGQ9e21lc2g6bmV3IG4odGhpcy5nbCx7Z2VvbWV0cnk6dGhpcy5nZW9tZXRyeSxwcm9ncmFtOmN9KSxwcm9ncmFtOmMsdW5pZm9ybXM6YSxlbmFibGVkOmcsdGV4dHVyZVVuaWZvcm06Yn07cmV0dXJuIHRoaXMucGFzc2VzLnB1c2goZCksZH1yZW5kZXIoKXt0aGlzLnBhc3Nlcy5maWx0ZXIoYT0+YS5lbmFibGVkKS5mb3JFYWNoKChhLGIpPT57dGhpcy5nbC5yZW5kZXJlci5yZW5kZXIoe3NjZW5lOmEubWVzaCx0YXJnZXQ6dGhpcy5mYm8ud3JpdGUsY2xlYXI6ITF9KSx0aGlzLmZiby5zd2FwKCl9KX19LGEuR2VvbWV0cnk9ZixhLk1hdDM9bSxhLk1hdDQ9YyxhLk1lc2g9bixhLk5vcm1hbFByb2dyYW09ZnVuY3Rpb24oYSl7cmV0dXJuIG5ldyBoKGEse3ZlcnRleDpcIlxcbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcXG5wcmVjaXNpb24gaGlnaHAgaW50O1xcblxcbmF0dHJpYnV0ZSB2ZWMzIHBvc2l0aW9uO1xcbmF0dHJpYnV0ZSB2ZWMzIG5vcm1hbDtcXG5cXG51bmlmb3JtIG1hdDMgbm9ybWFsTWF0cml4O1xcbnVuaWZvcm0gbWF0NCBtb2RlbFZpZXdNYXRyaXg7XFxudW5pZm9ybSBtYXQ0IHByb2plY3Rpb25NYXRyaXg7XFxuXFxudmFyeWluZyB2ZWMzIHZOb3JtYWw7XFxuXFxudm9pZCBtYWluKCkge1xcbiAgICB2Tm9ybWFsID0gbm9ybWFsaXplKG5vcm1hbE1hdHJpeCAqIG5vcm1hbCk7XFxuICAgIGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQocG9zaXRpb24sIDEuMCk7XFxufVxcblwiLGZyYWdtZW50OlwiXFxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xcbnByZWNpc2lvbiBoaWdocCBpbnQ7XFxuXFxudmFyeWluZyB2ZWMzIHZOb3JtYWw7XFxuXFxudm9pZCBtYWluKCkge1xcbiAgICBnbF9GcmFnQ29sb3IucmdiID0gbm9ybWFsaXplKHZOb3JtYWwpO1xcbiAgICBnbF9GcmFnQ29sb3IuYSA9IDEuMDtcXG59XFxuXCJ9KX0sYS5PcmJpdD1mdW5jdGlvbihpLHtlbGVtZW50OmE9ZG9jdW1lbnQsZW5hYmxlZDpqPSEwLHRhcmdldDprPW5ldyBiLGVhc2U6Zz0uMjUsaW5lcnRpYTpoPS44NSxlbmFibGVSb3RhdGU6dD0hMCxyb3RhdGVTcGVlZDp1PS4xLGVuYWJsZVpvb206dj0hMCx6b29tU3BlZWQ6dz0xLGVuYWJsZVBhbjp4PSEwLHBhblNwZWVkOnk9LjEsbWluUG9sYXJBbmdsZTp6PTAsbWF4UG9sYXJBbmdsZTpBPU1hdGguUEksbWluQXppbXV0aEFuZ2xlOkI9LTEvMCxtYXhBemltdXRoQW5nbGU6Qz0xLzAsbWluRGlzdGFuY2U6bD0wLG1heERpc3RhbmNlOm09MS8wfT17fSl7dGhpcy5lbmFibGVkPWosdGhpcy50YXJnZXQ9ayxnPWd8fDEsaD1ofHwxLHRoaXMubWluRGlzdGFuY2U9bCx0aGlzLm1heERpc3RhbmNlPW07bGV0IEQ9e3JhZGl1czoxLHBoaTowLHRoZXRhOjB9LGQ9e3JhZGl1czoxLHBoaTowLHRoZXRhOjB9LGY9e3JhZGl1czoxLHBoaTowLHRoZXRhOjB9LEU9bmV3IGIsYz1uZXcgYjtjLmNvcHkoaS5wb3NpdGlvbikuc3ViKHRoaXMudGFyZ2V0KSxmLnJhZGl1cz1kLnJhZGl1cz1jLmRpc3RhbmNlKCksZi50aGV0YT1kLnRoZXRhPU1hdGguYXRhbjIoYy54LGMueiksZi5waGk9ZC5waGk9TWF0aC5hY29zKE1hdGgubWluKE1hdGgubWF4KGMueS9kLnJhZGl1cywtMSksMSkpLHRoaXMudXBkYXRlPSgpPT57ZC5yYWRpdXMqPUQucmFkaXVzLGQudGhldGErPUQudGhldGEsZC5waGkrPUQucGhpLGQudGhldGE9TWF0aC5tYXgoQixNYXRoLm1pbihDLGQudGhldGEpKSxkLnBoaT1NYXRoLm1heCh6LE1hdGgubWluKEEsZC5waGkpKSxkLnJhZGl1cz1NYXRoLm1heCh0aGlzLm1pbkRpc3RhbmNlLE1hdGgubWluKHRoaXMubWF4RGlzdGFuY2UsZC5yYWRpdXMpKSxmLnBoaSs9KGQucGhpLWYucGhpKSpnLGYudGhldGErPShkLnRoZXRhLWYudGhldGEpKmcsZi5yYWRpdXMrPShkLnJhZGl1cy1mLnJhZGl1cykqZyx0aGlzLnRhcmdldC5hZGQoRSk7bGV0IGE9Zi5yYWRpdXMqTWF0aC5zaW4oTWF0aC5tYXgoMWUtNixmLnBoaSkpO2MueD1hKk1hdGguc2luKGYudGhldGEpLGMueT1mLnJhZGl1cypNYXRoLmNvcyhmLnBoaSksYy56PWEqTWF0aC5jb3MoZi50aGV0YSksaS5wb3NpdGlvbi5jb3B5KHRoaXMudGFyZ2V0KS5hZGQoYyksaS5sb29rQXQodGhpcy50YXJnZXQpLEQudGhldGEqPWgsRC5waGkqPWgsRS5tdWx0aXBseShoKSxELnJhZGl1cz0xfTtsZXQgRj1uZXcgZSxHPW5ldyBlLEg9bmV3IGUsXz1hYi5OT05FO2Z1bmN0aW9uIEkoKXtyZXR1cm4gTWF0aC5wb3coLjk1LHcpfXRoaXMubW91c2VCdXR0b25zPXtPUkJJVDowLFpPT006MSxQQU46Mn07bGV0IEo9KGgsaik9Pnt2YXIgZCxiLGUsYztsZXQgZj1hPT09ZG9jdW1lbnQ/ZG9jdW1lbnQuYm9keTphO2FjLmNvcHkoaS5wb3NpdGlvbikuc3ViKHRoaXMudGFyZ2V0KTtsZXQgZz1hYy5kaXN0YW5jZSgpO2Q9MipoKihnKj1NYXRoLnRhbigoaS5mb3Z8fDQ1KS8yKk1hdGguUEkvMTgwKSkvZi5jbGllbnRIZWlnaHQsYj1pLm1hdHJpeCxhYy5zZXQoYlswXSxiWzFdLGJbMl0pLGFjLm11bHRpcGx5KC1kKSxFLmFkZChhYyksZT0yKmoqZy9mLmNsaWVudEhlaWdodCxjPWkubWF0cml4LGFjLnNldChjWzRdLGNbNV0sY1s2XSksYWMubXVsdGlwbHkoZSksRS5hZGQoYWMpfTtmdW5jdGlvbiBLKGEpe0QucmFkaXVzLz1hfWZ1bmN0aW9uIEwoYyxkKXthZC5zZXQoYyxkKSxhZS5zdWIoYWQsRikubXVsdGlwbHkodSk7bGV0IGI9YT09PWRvY3VtZW50P2RvY3VtZW50LmJvZHk6YTtELnRoZXRhLT0yKk1hdGguUEkqYWUueC9iLmNsaWVudEhlaWdodCxELnBoaS09MipNYXRoLlBJKmFlLnkvYi5jbGllbnRIZWlnaHQsRi5jb3B5KGFkKX1mdW5jdGlvbiBNKGEsYil7YWQuc2V0KGEsYiksYWUuc3ViKGFkLEcpLm11bHRpcGx5KHkpLEooYWUueCxhZS55KSxHLmNvcHkoYWQpfWxldCBuPWE9PntpZih0aGlzLmVuYWJsZWQpe3N3aXRjaChhLmJ1dHRvbil7Y2FzZSB0aGlzLm1vdXNlQnV0dG9ucy5PUkJJVDppZighMT09PXQpcmV0dXJuO0Yuc2V0KGEuY2xpZW50WCxhLmNsaWVudFkpLF89YWIuUk9UQVRFO2JyZWFrO2Nhc2UgdGhpcy5tb3VzZUJ1dHRvbnMuWk9PTTppZighMT09PXYpcmV0dXJuO0guc2V0KGEuY2xpZW50WCxhLmNsaWVudFkpLF89YWIuRE9MTFk7YnJlYWs7Y2FzZSB0aGlzLm1vdXNlQnV0dG9ucy5QQU46aWYoITE9PT14KXJldHVybjtHLnNldChhLmNsaWVudFgsYS5jbGllbnRZKSxfPWFiLlBBTn1fIT09YWIuTk9ORSYmKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsTiwhMSksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsTywhMSkpfX0sTj1hPT57aWYodGhpcy5lbmFibGVkKXN3aXRjaChfKXtjYXNlIGFiLlJPVEFURTppZighMT09PXQpcmV0dXJuO0woYS5jbGllbnRYLGEuY2xpZW50WSk7YnJlYWs7Y2FzZSBhYi5ET0xMWTp2YXIgYjtpZighMT09PXYpcmV0dXJuO2I9YSxhZC5zZXQoYi5jbGllbnRYLGIuY2xpZW50WSksYWUuc3ViKGFkLEgpLGFlLnk+MD9LKEkoKSk6YWUueTwwJiZLKDEvSSgpKSxILmNvcHkoYWQpO2JyZWFrO2Nhc2UgYWIuUEFOOmlmKCExPT09eClyZXR1cm47TShhLmNsaWVudFgsYS5jbGllbnRZKX19LE89KCk9Pnt0aGlzLmVuYWJsZWQmJihkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsTiwhMSksZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIixPLCExKSxfPWFiLk5PTkUpfSxvPWE9Pnt0aGlzLmVuYWJsZWQmJnYmJihfPT09YWIuTk9ORXx8Xz09PWFiLlJPVEFURSkmJihhLnN0b3BQcm9wYWdhdGlvbigpLGEuZGVsdGFZPDA/SygxL0koKSk6YS5kZWx0YVk+MCYmSyhJKCkpKX0scD1hPT57aWYodGhpcy5lbmFibGVkKXN3aXRjaChhLnByZXZlbnREZWZhdWx0KCksYS50b3VjaGVzLmxlbmd0aCl7Y2FzZSAxOmlmKCExPT09dClyZXR1cm47Ri5zZXQoYS50b3VjaGVzWzBdLnBhZ2VYLGEudG91Y2hlc1swXS5wYWdlWSksXz1hYi5ST1RBVEU7YnJlYWs7Y2FzZSAyOmlmKCExPT09diYmICExPT09eClyZXR1cm47KGZ1bmN0aW9uKGEpe2lmKHYpe2xldCBiPWEudG91Y2hlc1swXS5wYWdlWC1hLnRvdWNoZXNbMV0ucGFnZVgsYz1hLnRvdWNoZXNbMF0ucGFnZVktYS50b3VjaGVzWzFdLnBhZ2VZLGQ9TWF0aC5zcXJ0KGIqYitjKmMpO0guc2V0KDAsZCl9aWYoeCl7bGV0IGU9LjUqKGEudG91Y2hlc1swXS5wYWdlWCthLnRvdWNoZXNbMV0ucGFnZVgpLGY9LjUqKGEudG91Y2hlc1swXS5wYWdlWSthLnRvdWNoZXNbMV0ucGFnZVkpO0cuc2V0KGUsZil9fSkoYSksXz1hYi5ET0xMWV9QQU47YnJlYWs7ZGVmYXVsdDpfPWFiLk5PTkV9fSxxPWE9PntpZih0aGlzLmVuYWJsZWQpc3dpdGNoKGEucHJldmVudERlZmF1bHQoKSxhLnN0b3BQcm9wYWdhdGlvbigpLGEudG91Y2hlcy5sZW5ndGgpe2Nhc2UgMTppZighMT09PXQpcmV0dXJuO0woYS50b3VjaGVzWzBdLnBhZ2VYLGEudG91Y2hlc1swXS5wYWdlWSk7YnJlYWs7Y2FzZSAyOmlmKCExPT09diYmICExPT09eClyZXR1cm47IWZ1bmN0aW9uKGEpe2lmKHYpe2xldCBiPWEudG91Y2hlc1swXS5wYWdlWC1hLnRvdWNoZXNbMV0ucGFnZVgsYz1hLnRvdWNoZXNbMF0ucGFnZVktYS50b3VjaGVzWzFdLnBhZ2VZLGQ9TWF0aC5zcXJ0KGIqYitjKmMpO2FkLnNldCgwLGQpLGFlLnNldCgwLE1hdGgucG93KGFkLnkvSC55LHcpKSxLKGFlLnkpLEguY29weShhZCl9eCYmTSguNSooYS50b3VjaGVzWzBdLnBhZ2VYK2EudG91Y2hlc1sxXS5wYWdlWCksLjUqKGEudG91Y2hlc1swXS5wYWdlWSthLnRvdWNoZXNbMV0ucGFnZVkpKX0oYSk7YnJlYWs7ZGVmYXVsdDpfPWFiLk5PTkV9fSxyPSgpPT57dGhpcy5lbmFibGVkJiYoXz1hYi5OT05FKX0scz1hPT57dGhpcy5lbmFibGVkJiZhLnByZXZlbnREZWZhdWx0KCl9O3RoaXMucmVtb3ZlPWZ1bmN0aW9uKCl7YS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIixzLCExKSxhLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIixuLCExKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIndoZWVsXCIsbywhMSksYS5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLHAsITEpLGEucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsciwhMSksYS5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIscSwhMSksd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIixOLCExKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIixPLCExKX0sYS5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIixzLCExKSxhLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIixuLCExKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIndoZWVsXCIsbywhMSksYS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLHAse3Bhc3NpdmU6ITF9KSxhLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLHIsITEpLGEuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLHEse3Bhc3NpdmU6ITF9KX0sYS5QbGFuZT1yLGEuUG9zdD1jbGFzc3tjb25zdHJ1Y3RvcihhLHt3aWR0aDpiLGhlaWdodDpjLGRwcjpkLHdyYXBTOmU9YS5DTEFNUF9UT19FREdFLHdyYXBUOmc9YS5DTEFNUF9UT19FREdFLG1pbkZpbHRlcjpoPWEuTElORUFSLG1hZ0ZpbHRlcjppPWEuTElORUFSLGdlb21ldHJ5Omo9bmV3IGYoYSx7cG9zaXRpb246e3NpemU6MixkYXRhOm5ldyBGbG9hdDMyQXJyYXkoWy0xLC0xLDMsLTEsLTEsM10pfSx1djp7c2l6ZToyLGRhdGE6bmV3IEZsb2F0MzJBcnJheShbMCwwLDIsMCwwLDJdKX19KX09e30pe3RoaXMuZ2w9YSx0aGlzLm9wdGlvbnM9e3dyYXBTOmUsd3JhcFQ6ZyxtaW5GaWx0ZXI6aCxtYWdGaWx0ZXI6aX0sdGhpcy5wYXNzZXM9W10sdGhpcy5nZW9tZXRyeT1qO2xldCBrPXRoaXMuZmJvPXtyZWFkOm51bGwsd3JpdGU6bnVsbCxzd2FwKCl7bGV0IGE9ay5yZWFkO2sucmVhZD1rLndyaXRlLGsud3JpdGU9YX19O3RoaXMucmVzaXplKHt3aWR0aDpiLGhlaWdodDpjLGRwcjpkfSl9YWRkUGFzcyh7dmVydGV4OmU9XCJcXG4gICAgYXR0cmlidXRlIHZlYzIgdXY7XFxuICAgIGF0dHJpYnV0ZSB2ZWMyIHBvc2l0aW9uO1xcblxcbiAgICB2YXJ5aW5nIHZlYzIgdlV2O1xcblxcbiAgICB2b2lkIG1haW4oKSB7XFxuICAgICAgICB2VXYgPSB1djtcXG4gICAgICAgIGdsX1Bvc2l0aW9uID0gdmVjNChwb3NpdGlvbiwgMCwgMSk7XFxuICAgIH1cXG5cIixmcmFnbWVudDpmPVwiXFxuICAgIHByZWNpc2lvbiBoaWdocCBmbG9hdDtcXG5cXG4gICAgdW5pZm9ybSBzYW1wbGVyMkQgdE1hcDtcXG4gICAgdmFyeWluZyB2ZWMyIHZVdjtcXG5cXG4gICAgdm9pZCBtYWluKCkge1xcbiAgICAgICAgZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZTJEKHRNYXAsIHZVdik7XFxuICAgIH1cXG5cIix1bmlmb3JtczphPXt9LHRleHR1cmVVbmlmb3JtOmI9XCJ0TWFwXCIsZW5hYmxlZDpnPSEwfT17fSl7YVtiXT17dmFsdWU6dGhpcy5mYm8ucmVhZC50ZXh0dXJlfTtsZXQgYz1uZXcgaCh0aGlzLmdsLHt2ZXJ0ZXg6ZSxmcmFnbWVudDpmLHVuaWZvcm1zOmF9KSxkPXttZXNoOm5ldyBuKHRoaXMuZ2wse2dlb21ldHJ5OnRoaXMuZ2VvbWV0cnkscHJvZ3JhbTpjfSkscHJvZ3JhbTpjLHVuaWZvcm1zOmEsZW5hYmxlZDpnLHRleHR1cmVVbmlmb3JtOmJ9O3JldHVybiB0aGlzLnBhc3Nlcy5wdXNoKGQpLGR9cmVzaXplKHt3aWR0aDphLGhlaWdodDpjLGRwcjpifT17fSl7YiYmKHRoaXMuZHByPWIpLGEmJih0aGlzLndpZHRoPWEsdGhpcy5oZWlnaHQ9Y3x8YSksYj10aGlzLmRwcnx8dGhpcy5nbC5yZW5kZXJlci5kcHIsYT0odGhpcy53aWR0aHx8dGhpcy5nbC5yZW5kZXJlci53aWR0aCkqYixjPSh0aGlzLmhlaWdodHx8dGhpcy5nbC5yZW5kZXJlci5oZWlnaHQpKmIsdGhpcy5vcHRpb25zLndpZHRoPWEsdGhpcy5vcHRpb25zLmhlaWdodD1jLHRoaXMuZmJvLnJlYWQ9bmV3IHAodGhpcy5nbCx0aGlzLm9wdGlvbnMpLHRoaXMuZmJvLndyaXRlPW5ldyBwKHRoaXMuZ2wsdGhpcy5vcHRpb25zKX1yZW5kZXIoe3NjZW5lOmIsY2FtZXJhOmMsdGFyZ2V0OmQ9bnVsbCx1cGRhdGU6ZT0hMCxzb3J0OmY9ITAsZnJ1c3R1bUN1bGw6Zz0hMH0pe2xldCBhPXRoaXMucGFzc2VzLmZpbHRlcihhPT5hLmVuYWJsZWQpO3RoaXMuZ2wucmVuZGVyZXIucmVuZGVyKHtzY2VuZTpiLGNhbWVyYTpjLHRhcmdldDphLmxlbmd0aD90aGlzLmZiby53cml0ZTpkLHVwZGF0ZTplLHNvcnQ6ZixmcnVzdHVtQ3VsbDpnfSksdGhpcy5mYm8uc3dhcCgpLGEuZm9yRWFjaCgoYixjKT0+e2IubWVzaC5wcm9ncmFtLnVuaWZvcm1zW2IudGV4dHVyZVVuaWZvcm1dLnZhbHVlPXRoaXMuZmJvLnJlYWQudGV4dHVyZSx0aGlzLmdsLnJlbmRlcmVyLnJlbmRlcih7c2NlbmU6Yi5tZXNoLHRhcmdldDpjPT09YS5sZW5ndGgtMT9kOnRoaXMuZmJvLndyaXRlLGNsZWFyOiExfSksdGhpcy5mYm8uc3dhcCgpfSl9fSxhLlByb2dyYW09aCxhLlF1YXQ9ZCxhLlJheWNhc3Q9Y2xhc3N7Y29uc3RydWN0b3IoYSl7dGhpcy5nbD1hLHRoaXMub3JpZ2luPW5ldyBiLHRoaXMuZGlyZWN0aW9uPW5ldyBifWNhc3RNb3VzZShhLGI9WzAsMF0pe2Eud29ybGRNYXRyaXguZ2V0VHJhbnNsYXRpb24odGhpcy5vcmlnaW4pLHRoaXMuZGlyZWN0aW9uLnNldChiWzBdLGJbMV0sLjUpLGEudW5wcm9qZWN0KHRoaXMuZGlyZWN0aW9uKSx0aGlzLmRpcmVjdGlvbi5zdWIodGhpcy5vcmlnaW4pLm5vcm1hbGl6ZSgpfWludGVyc2VjdEJvdW5kcyhhKXtBcnJheS5pc0FycmF5KGEpfHwoYT1bYV0pO2xldCBkPWFpLGU9YWYsZj1hZyxjPVtdO3JldHVybiBhLmZvckVhY2goYT0+e2EuZ2VvbWV0cnkuYm91bmRzfHxhLmdlb21ldHJ5LmNvbXB1dGVCb3VuZGluZ0JveCgpLFwic3BoZXJlXCI9PT1hLmdlb21ldHJ5LnJheWNhc3QmJmEuZ2VvbWV0cnkuYm91bmRzPT09MS8wJiZhLmdlb21ldHJ5LmNvbXB1dGVCb3VuZGluZ1NwaGVyZSgpLGQuaW52ZXJzZShhLndvcmxkTWF0cml4KSxlLmNvcHkodGhpcy5vcmlnaW4pLmFwcGx5TWF0cml4NChkKSxmLmNvcHkodGhpcy5kaXJlY3Rpb24pLnRyYW5zZm9ybURpcmVjdGlvbihkKTtsZXQgZz0wOyhnPVwic3BoZXJlXCI9PT1hLmdlb21ldHJ5LnJheWNhc3Q/dGhpcy5pbnRlcnNlY3RTcGhlcmUoYS5nZW9tZXRyeS5ib3VuZHMsZSxmKTp0aGlzLmludGVyc2VjdEJveChhLmdlb21ldHJ5LmJvdW5kcyxlLGYpKSYmKGEuaGl0fHwoYS5oaXQ9e2xvY2FsUG9pbnQ6bmV3IGJ9KSxhLmhpdC5kaXN0YW5jZT1nLGEuaGl0LmxvY2FsUG9pbnQuY29weShmKS5tdWx0aXBseShnKS5hZGQoZSksYy5wdXNoKGEpKX0pLGMuc29ydCgoYSxiKT0+YS5oaXQuZGlzdGFuY2UtYi5oaXQuZGlzdGFuY2UpLGN9aW50ZXJzZWN0U3BoZXJlKGMsaT10aGlzLm9yaWdpbixqPXRoaXMuZGlyZWN0aW9uKXtsZXQgYT1haDthLnN1YihjLmNlbnRlcixpKTtsZXQgYj1hLmRvdChqKSxlPWEuZG90KGEpLWIqYixmPWMucmFkaXVzKmMucmFkaXVzO2lmKGU+ZilyZXR1cm4gMDtsZXQgZz1NYXRoLnNxcnQoZi1lKSxkPWItZyxoPWIrZztyZXR1cm4gZDwwJiZoPDA/MDpkPDA/aDpkfWludGVyc2VjdEJveChuLGM9dGhpcy5vcmlnaW4saz10aGlzLmRpcmVjdGlvbil7bGV0IGEsYixmLGwsZyxtLGg9MS9rLngsaT0xL2sueSxqPTEvay56LGQ9bi5taW4sZT1uLm1heDtyZXR1cm4gYT0oKGg+PTA/ZC54OmUueCktYy54KSpoLGI9KChoPj0wP2UueDpkLngpLWMueCkqaCxmPSgoaT49MD9kLnk6ZS55KS1jLnkpKmksYT4obD0oKGk+PTA/ZS55OmQueSktYy55KSppKXx8Zj5iPzA6KGY+YSYmKGE9ZiksbDxiJiYoYj1sKSxnPSgoaj49MD9kLno6ZS56KS1jLnopKmosYT4obT0oKGo+PTA/ZS56OmQueiktYy56KSpqKXx8Zz5iPzA6KGc+YSYmKGE9ZyksbTxiJiYoYj1tKSxiPDA/MDphPj0wP2E6YikpfX0sYS5SZW5kZXJUYXJnZXQ9cCxhLlJlbmRlcmVyPWNsYXNze2NvbnN0cnVjdG9yKHtjYW52YXM6YT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLHdpZHRoOmc9MzAwLGhlaWdodDpoPTE1MCxkcHI6aT0xLGFscGhhOmM9ITEsZGVwdGg6ZD0hMCxzdGVuY2lsOmU9ITEsYW50aWFsaWFzOmo9ITEscHJlbXVsdGlwbGllZEFscGhhOmY9ITEscHJlc2VydmVEcmF3aW5nQnVmZmVyOms9ITEscG93ZXJQcmVmZXJlbmNlOmw9XCJkZWZhdWx0XCIsYXV0b0NsZWFyOm09ITAsd2ViZ2w6bj0yfT17fSl7bGV0IGI9e2FscGhhOmMsZGVwdGg6ZCxzdGVuY2lsOmUsYW50aWFsaWFzOmoscHJlbXVsdGlwbGllZEFscGhhOmYscHJlc2VydmVEcmF3aW5nQnVmZmVyOmsscG93ZXJQcmVmZXJlbmNlOmx9O3RoaXMuZHByPWksdGhpcy5hbHBoYT1jLHRoaXMuY29sb3I9ITAsdGhpcy5kZXB0aD1kLHRoaXMuc3RlbmNpbD1lLHRoaXMucHJlbXVsdGlwbGllZEFscGhhPWYsdGhpcy5hdXRvQ2xlYXI9bSwyPT09biYmKHRoaXMuZ2w9YS5nZXRDb250ZXh0KFwid2ViZ2wyXCIsYikpLHRoaXMuaXNXZWJnbDI9ISF0aGlzLmdsLHRoaXMuZ2x8fCh0aGlzLmdsPWEuZ2V0Q29udGV4dChcIndlYmdsXCIsYil8fGEuZ2V0Q29udGV4dChcImV4cGVyaW1lbnRhbC13ZWJnbFwiLGIpKSx0aGlzLmdsLnJlbmRlcmVyPXRoaXMsdGhpcy5zZXRTaXplKGcsaCksdGhpcy5wYXJhbWV0ZXJzPXt9LHRoaXMucGFyYW1ldGVycy5tYXhUZXh0dXJlVW5pdHM9dGhpcy5nbC5nZXRQYXJhbWV0ZXIodGhpcy5nbC5NQVhfQ09NQklORURfVEVYVFVSRV9JTUFHRV9VTklUUyksdGhpcy5zdGF0ZT17fSx0aGlzLnN0YXRlLmJsZW5kRnVuYz17c3JjOnRoaXMuZ2wuT05FLGRzdDp0aGlzLmdsLlpFUk99LHRoaXMuc3RhdGUuYmxlbmRFcXVhdGlvbj17bW9kZVJHQjp0aGlzLmdsLkZVTkNfQUREfSx0aGlzLnN0YXRlLmN1bGxGYWNlPW51bGwsdGhpcy5zdGF0ZS5mcm9udEZhY2U9dGhpcy5nbC5DQ1csdGhpcy5zdGF0ZS5kZXB0aE1hc2s9ITAsdGhpcy5zdGF0ZS5kZXB0aEZ1bmM9dGhpcy5nbC5MRVNTLHRoaXMuc3RhdGUucHJlbXVsdGlwbHlBbHBoYT0hMSx0aGlzLnN0YXRlLmZsaXBZPSExLHRoaXMuc3RhdGUudW5wYWNrQWxpZ25tZW50PTQsdGhpcy5zdGF0ZS5mcmFtZWJ1ZmZlcj1udWxsLHRoaXMuc3RhdGUudmlld3BvcnQ9e3dpZHRoOm51bGwsaGVpZ2h0Om51bGx9LHRoaXMuc3RhdGUudGV4dHVyZVVuaXRzPVtdLHRoaXMuc3RhdGUuYWN0aXZlVGV4dHVyZVVuaXQ9MCx0aGlzLnN0YXRlLmJvdW5kQnVmZmVyPW51bGwsdGhpcy5zdGF0ZS51bmlmb3JtTG9jYXRpb25zPW5ldyBNYXAsdGhpcy5leHRlbnNpb25zPXt9LHRoaXMuaXNXZWJnbDI/KHRoaXMuZ2V0RXh0ZW5zaW9uKFwiRVhUX2NvbG9yX2J1ZmZlcl9mbG9hdFwiKSx0aGlzLmdldEV4dGVuc2lvbihcIk9FU190ZXh0dXJlX2Zsb2F0X2xpbmVhclwiKSk6KHRoaXMuZ2V0RXh0ZW5zaW9uKFwiT0VTX3RleHR1cmVfZmxvYXRcIiksdGhpcy5nZXRFeHRlbnNpb24oXCJPRVNfdGV4dHVyZV9mbG9hdF9saW5lYXJcIiksdGhpcy5nZXRFeHRlbnNpb24oXCJPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0XCIpLHRoaXMuZ2V0RXh0ZW5zaW9uKFwiT0VTX3RleHR1cmVfaGFsZl9mbG9hdF9saW5lYXJcIiksdGhpcy5nZXRFeHRlbnNpb24oXCJPRVNfZWxlbWVudF9pbmRleF91aW50XCIpLHRoaXMuZ2V0RXh0ZW5zaW9uKFwiT0VTX3N0YW5kYXJkX2Rlcml2YXRpdmVzXCIpLHRoaXMuZ2V0RXh0ZW5zaW9uKFwiRVhUX3NSR0JcIiksdGhpcy5nZXRFeHRlbnNpb24oXCJXRUJHTF9kZXB0aF90ZXh0dXJlXCIpKSx0aGlzLnZlcnRleEF0dHJpYkRpdmlzb3I9dGhpcy5nZXRFeHRlbnNpb24oXCJBTkdMRV9pbnN0YW5jZWRfYXJyYXlzXCIsXCJ2ZXJ0ZXhBdHRyaWJEaXZpc29yXCIsXCJ2ZXJ0ZXhBdHRyaWJEaXZpc29yQU5HTEVcIiksdGhpcy5kcmF3QXJyYXlzSW5zdGFuY2VkPXRoaXMuZ2V0RXh0ZW5zaW9uKFwiQU5HTEVfaW5zdGFuY2VkX2FycmF5c1wiLFwiZHJhd0FycmF5c0luc3RhbmNlZFwiLFwiZHJhd0FycmF5c0luc3RhbmNlZEFOR0xFXCIpLHRoaXMuZHJhd0VsZW1lbnRzSW5zdGFuY2VkPXRoaXMuZ2V0RXh0ZW5zaW9uKFwiQU5HTEVfaW5zdGFuY2VkX2FycmF5c1wiLFwiZHJhd0VsZW1lbnRzSW5zdGFuY2VkXCIsXCJkcmF3RWxlbWVudHNJbnN0YW5jZWRBTkdMRVwiKSx0aGlzLmNyZWF0ZVZlcnRleEFycmF5PXRoaXMuZ2V0RXh0ZW5zaW9uKFwiT0VTX3ZlcnRleF9hcnJheV9vYmplY3RcIixcImNyZWF0ZVZlcnRleEFycmF5XCIsXCJjcmVhdGVWZXJ0ZXhBcnJheU9FU1wiKSx0aGlzLmJpbmRWZXJ0ZXhBcnJheT10aGlzLmdldEV4dGVuc2lvbihcIk9FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0XCIsXCJiaW5kVmVydGV4QXJyYXlcIixcImJpbmRWZXJ0ZXhBcnJheU9FU1wiKSx0aGlzLmRlbGV0ZVZlcnRleEFycmF5PXRoaXMuZ2V0RXh0ZW5zaW9uKFwiT0VTX3ZlcnRleF9hcnJheV9vYmplY3RcIixcImRlbGV0ZVZlcnRleEFycmF5XCIsXCJkZWxldGVWZXJ0ZXhBcnJheU9FU1wiKX1zZXRTaXplKGEsYil7dGhpcy53aWR0aD1hLHRoaXMuaGVpZ2h0PWIsdGhpcy5nbC5jYW52YXMud2lkdGg9YSp0aGlzLmRwcix0aGlzLmdsLmNhbnZhcy5oZWlnaHQ9Yip0aGlzLmRwcixPYmplY3QuYXNzaWduKHRoaXMuZ2wuY2FudmFzLnN0eWxlLHt3aWR0aDphK1wicHhcIixoZWlnaHQ6YitcInB4XCJ9KX1zZXRWaWV3cG9ydChhLGIpe3RoaXMuc3RhdGUudmlld3BvcnQud2lkdGg9PT1hJiZ0aGlzLnN0YXRlLnZpZXdwb3J0LmhlaWdodD09PWJ8fCh0aGlzLnN0YXRlLnZpZXdwb3J0LndpZHRoPWEsdGhpcy5zdGF0ZS52aWV3cG9ydC5oZWlnaHQ9Yix0aGlzLmdsLnZpZXdwb3J0KDAsMCxhLGIpKX1lbmFibGUoYSl7ITAhPT10aGlzLnN0YXRlW2FdJiYodGhpcy5nbC5lbmFibGUoYSksdGhpcy5zdGF0ZVthXT0hMCl9ZGlzYWJsZShhKXshMSE9PXRoaXMuc3RhdGVbYV0mJih0aGlzLmdsLmRpc2FibGUoYSksdGhpcy5zdGF0ZVthXT0hMSl9c2V0QmxlbmRGdW5jKGEsYixjLGQpe3RoaXMuc3RhdGUuYmxlbmRGdW5jLnNyYz09PWEmJnRoaXMuc3RhdGUuYmxlbmRGdW5jLmRzdD09PWImJnRoaXMuc3RhdGUuYmxlbmRGdW5jLnNyY0FscGhhPT09YyYmdGhpcy5zdGF0ZS5ibGVuZEZ1bmMuZHN0QWxwaGE9PT1kfHwodGhpcy5zdGF0ZS5ibGVuZEZ1bmMuc3JjPWEsdGhpcy5zdGF0ZS5ibGVuZEZ1bmMuZHN0PWIsdGhpcy5zdGF0ZS5ibGVuZEZ1bmMuc3JjQWxwaGE9Yyx0aGlzLnN0YXRlLmJsZW5kRnVuYy5kc3RBbHBoYT1kLHZvaWQgMCE9PWM/dGhpcy5nbC5ibGVuZEZ1bmNTZXBhcmF0ZShhLGIsYyxkKTp0aGlzLmdsLmJsZW5kRnVuYyhhLGIpKX1zZXRCbGVuZEVxdWF0aW9uKGEsYil7dGhpcy5zdGF0ZS5ibGVuZEVxdWF0aW9uLm1vZGVSR0I9PT1hJiZ0aGlzLnN0YXRlLmJsZW5kRXF1YXRpb24ubW9kZUFscGhhPT09Ynx8KHRoaXMuc3RhdGUuYmxlbmRFcXVhdGlvbi5tb2RlUkdCPWEsdGhpcy5zdGF0ZS5ibGVuZEVxdWF0aW9uLm1vZGVBbHBoYT1iLHZvaWQgMCE9PWI/dGhpcy5nbC5ibGVuZEVxdWF0aW9uU2VwYXJhdGUoYSxiKTp0aGlzLmdsLmJsZW5kRXF1YXRpb24oYSkpfXNldEN1bGxGYWNlKGEpe3RoaXMuc3RhdGUuY3VsbEZhY2UhPT1hJiYodGhpcy5zdGF0ZS5jdWxsRmFjZT1hLHRoaXMuZ2wuY3VsbEZhY2UoYSkpfXNldEZyb250RmFjZShhKXt0aGlzLnN0YXRlLmZyb250RmFjZSE9PWEmJih0aGlzLnN0YXRlLmZyb250RmFjZT1hLHRoaXMuZ2wuZnJvbnRGYWNlKGEpKX1zZXREZXB0aE1hc2soYSl7dGhpcy5zdGF0ZS5kZXB0aE1hc2shPT1hJiYodGhpcy5zdGF0ZS5kZXB0aE1hc2s9YSx0aGlzLmdsLmRlcHRoTWFzayhhKSl9c2V0RGVwdGhGdW5jKGEpe3RoaXMuc3RhdGUuZGVwdGhGdW5jIT09YSYmKHRoaXMuc3RhdGUuZGVwdGhGdW5jPWEsdGhpcy5nbC5kZXB0aEZ1bmMoYSkpfWFjdGl2ZVRleHR1cmUoYSl7dGhpcy5zdGF0ZS5hY3RpdmVUZXh0dXJlVW5pdCE9PWEmJih0aGlzLnN0YXRlLmFjdGl2ZVRleHR1cmVVbml0PWEsdGhpcy5nbC5hY3RpdmVUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRTArYSkpfWJpbmRGcmFtZWJ1ZmZlcih7dGFyZ2V0OmI9dGhpcy5nbC5GUkFNRUJVRkZFUixidWZmZXI6YT1udWxsfT17fSl7dGhpcy5zdGF0ZS5mcmFtZWJ1ZmZlciE9PWEmJih0aGlzLnN0YXRlLmZyYW1lYnVmZmVyPWEsdGhpcy5nbC5iaW5kRnJhbWVidWZmZXIoYixhKSl9Z2V0RXh0ZW5zaW9uKGEsYixjKXtyZXR1cm4gYiYmdGhpcy5nbFtiXT90aGlzLmdsW2JdLmJpbmQodGhpcy5nbCk6KHRoaXMuZXh0ZW5zaW9uc1thXXx8KHRoaXMuZXh0ZW5zaW9uc1thXT10aGlzLmdsLmdldEV4dGVuc2lvbihhKSksYj90aGlzLmV4dGVuc2lvbnNbYV1bY10uYmluZCh0aGlzLmV4dGVuc2lvbnNbYV0pOnRoaXMuZXh0ZW5zaW9uc1thXSl9c29ydE9wYXF1ZShhLGIpe3JldHVybiBhLnJlbmRlck9yZGVyIT09Yi5yZW5kZXJPcmRlcj9hLnJlbmRlck9yZGVyLWIucmVuZGVyT3JkZXI6YS5wcm9ncmFtLmlkIT09Yi5wcm9ncmFtLmlkP2EucHJvZ3JhbS5pZC1iLnByb2dyYW0uaWQ6YS56RGVwdGghPT1iLnpEZXB0aD9hLnpEZXB0aC1iLnpEZXB0aDpiLmlkLWEuaWR9c29ydFRyYW5zcGFyZW50KGEsYil7cmV0dXJuIGEucmVuZGVyT3JkZXIhPT1iLnJlbmRlck9yZGVyP2EucmVuZGVyT3JkZXItYi5yZW5kZXJPcmRlcjphLnpEZXB0aCE9PWIuekRlcHRoP2IuekRlcHRoLWEuekRlcHRoOmIuaWQtYS5pZH1zb3J0VUkoYSxiKXtyZXR1cm4gYS5yZW5kZXJPcmRlciE9PWIucmVuZGVyT3JkZXI/YS5yZW5kZXJPcmRlci1iLnJlbmRlck9yZGVyOmEucHJvZ3JhbS5pZCE9PWIucHJvZ3JhbS5pZD9hLnByb2dyYW0uaWQtYi5wcm9ncmFtLmlkOmIuaWQtYS5pZH1nZXRSZW5kZXJMaXN0KHtzY2VuZTpmLGNhbWVyYTpiLGZydXN0dW1DdWxsOmcsc29ydDpofSl7bGV0IGE9W107aWYoYiYmZyYmYi51cGRhdGVGcnVzdHVtKCksZi50cmF2ZXJzZShjPT57aWYoIWMudmlzaWJsZSlyZXR1cm4hMDtjLmRyYXcmJihnJiZjLmZydXN0dW1DdWxsZWQmJmImJiFiLmZydXN0dW1JbnRlcnNlY3RzTWVzaChjKXx8YS5wdXNoKGMpKX0pLGgpe2xldCBjPVtdLGQ9W10sZT1bXTthLmZvckVhY2goYT0+e2EucHJvZ3JhbS50cmFuc3BhcmVudD9hLnByb2dyYW0uZGVwdGhUZXN0P2QucHVzaChhKTplLnB1c2goYSk6Yy5wdXNoKGEpLGEuekRlcHRoPTAsMD09PWEucmVuZGVyT3JkZXImJmEucHJvZ3JhbS5kZXB0aFRlc3QmJmImJihhLndvcmxkTWF0cml4LmdldFRyYW5zbGF0aW9uKEspLEsuYXBwbHlNYXRyaXg0KGIucHJvamVjdGlvblZpZXdNYXRyaXgpLGEuekRlcHRoPUsueil9KSxjLnNvcnQodGhpcy5zb3J0T3BhcXVlKSxkLnNvcnQodGhpcy5zb3J0VHJhbnNwYXJlbnQpLGUuc29ydCh0aGlzLnNvcnRVSSksYT1jLmNvbmNhdChkLGUpfXJldHVybiBhfXJlbmRlcih7c2NlbmU6YyxjYW1lcmE6Yix0YXJnZXQ6YT1udWxsLHVwZGF0ZTplPSEwLHNvcnQ6Zj0hMCxmcnVzdHVtQ3VsbDpnPSEwLGNsZWFyOmR9KXtudWxsPT09YT8odGhpcy5iaW5kRnJhbWVidWZmZXIoKSx0aGlzLnNldFZpZXdwb3J0KHRoaXMud2lkdGgqdGhpcy5kcHIsdGhpcy5oZWlnaHQqdGhpcy5kcHIpKToodGhpcy5iaW5kRnJhbWVidWZmZXIoYSksdGhpcy5zZXRWaWV3cG9ydChhLndpZHRoLGEuaGVpZ2h0KSksKGR8fHRoaXMuYXV0b0NsZWFyJiYgITEhPT1kKSYmKCF0aGlzLmRlcHRofHxhJiZhLmRlcHRofHwodGhpcy5lbmFibGUodGhpcy5nbC5ERVBUSF9URVNUKSx0aGlzLnNldERlcHRoTWFzayghMCkpLHRoaXMuZ2wuY2xlYXIoKHRoaXMuY29sb3I/dGhpcy5nbC5DT0xPUl9CVUZGRVJfQklUOjApfCh0aGlzLmRlcHRoP3RoaXMuZ2wuREVQVEhfQlVGRkVSX0JJVDowKXwodGhpcy5zdGVuY2lsP3RoaXMuZ2wuU1RFTkNJTF9CVUZGRVJfQklUOjApKSksZSYmYy51cGRhdGVNYXRyaXhXb3JsZCgpLGImJm51bGw9PT1iLnBhcmVudCYmYi51cGRhdGVNYXRyaXhXb3JsZCgpLHRoaXMuZ2V0UmVuZGVyTGlzdCh7c2NlbmU6YyxjYW1lcmE6YixmcnVzdHVtQ3VsbDpnLHNvcnQ6Zn0pLmZvckVhY2goYT0+e2EuZHJhdyh7Y2FtZXJhOmJ9KX0pfX0sYS5Ta2luPWNsYXNzIGV4dGVuZHMgbntjb25zdHJ1Y3RvcihhLHtyaWc6YixnZW9tZXRyeTpjLHByb2dyYW06ZCxtb2RlOmU9YS5UUklBTkdMRVN9PXt9KXtzdXBlcihhLHtnZW9tZXRyeTpjLHByb2dyYW06ZCxtb2RlOmV9KSx0aGlzLmNyZWF0ZUJvbmVzKGIpLHRoaXMuY3JlYXRlQm9uZVRleHR1cmUoKSx0aGlzLmFuaW1hdGlvbnM9W10sT2JqZWN0LmFzc2lnbih0aGlzLnByb2dyYW0udW5pZm9ybXMse2JvbmVUZXh0dXJlOnt2YWx1ZTp0aGlzLmJvbmVUZXh0dXJlfSxib25lVGV4dHVyZVNpemU6e3ZhbHVlOnRoaXMuYm9uZVRleHR1cmVTaXplfX0pfWNyZWF0ZUJvbmVzKGEpe2lmKHRoaXMucm9vdD1uZXcgZyx0aGlzLmJvbmVzPVtdLGEuYm9uZXMmJmEuYm9uZXMubGVuZ3RoKXtmb3IobGV0IGI9MDtiPGEuYm9uZXMubGVuZ3RoO2IrKyl7bGV0IGQ9bmV3IGc7ZC5wb3NpdGlvbi5mcm9tQXJyYXkoYS5iaW5kUG9zZS5wb3NpdGlvbiwzKmIpLGQucXVhdGVybmlvbi5mcm9tQXJyYXkoYS5iaW5kUG9zZS5xdWF0ZXJuaW9uLDQqYiksZC5zY2FsZS5mcm9tQXJyYXkoYS5iaW5kUG9zZS5zY2FsZSwzKmIpLHRoaXMuYm9uZXMucHVzaChkKX1hLmJvbmVzLmZvckVhY2goKGEsYik9PntpZih0aGlzLmJvbmVzW2JdLm5hbWU9YS5uYW1lLC0xPT09YS5wYXJlbnQpcmV0dXJuIHRoaXMuYm9uZXNbYl0uc2V0UGFyZW50KHRoaXMucm9vdCk7dGhpcy5ib25lc1tiXS5zZXRQYXJlbnQodGhpcy5ib25lc1thLnBhcmVudF0pfSksdGhpcy5yb290LnVwZGF0ZU1hdHJpeFdvcmxkKCEwKSx0aGlzLmJvbmVzLmZvckVhY2goYT0+e2EuYmluZEludmVyc2U9bmV3IGMoLi4uYS53b3JsZE1hdHJpeCkuaW52ZXJzZSgpfSl9fWNyZWF0ZUJvbmVUZXh0dXJlKCl7aWYoIXRoaXMuYm9uZXMubGVuZ3RoKXJldHVybjtsZXQgYT1NYXRoLm1heCg0LE1hdGgucG93KDIsTWF0aC5jZWlsKE1hdGgubG9nKE1hdGguc3FydCg0KnRoaXMuYm9uZXMubGVuZ3RoKSkvTWF0aC5MTjIpKSk7dGhpcy5ib25lTWF0cmljZXM9bmV3IEZsb2F0MzJBcnJheShhKmEqNCksdGhpcy5ib25lVGV4dHVyZVNpemU9YSx0aGlzLmJvbmVUZXh0dXJlPW5ldyBvKHRoaXMuZ2wse2ltYWdlOnRoaXMuYm9uZU1hdHJpY2VzLGdlbmVyYXRlTWlwbWFwczohMSx0eXBlOnRoaXMuZ2wuRkxPQVQsaW50ZXJuYWxGb3JtYXQ6dGhpcy5nbC5yZW5kZXJlci5pc1dlYmdsMj90aGlzLmdsLlJHQkExNkY6dGhpcy5nbC5SR0JBLGZsaXBZOiExLHdpZHRoOmF9KX1hZGRBbmltYXRpb24oYil7bGV0IGE9bmV3IHMoe29iamVjdHM6dGhpcy5ib25lcyxkYXRhOmJ9KTtyZXR1cm4gdGhpcy5hbmltYXRpb25zLnB1c2goYSksYX11cGRhdGUoKXtsZXQgYT0wO3RoaXMuYW5pbWF0aW9ucy5mb3JFYWNoKGI9PmErPWIud2VpZ2h0KSx0aGlzLmFuaW1hdGlvbnMuZm9yRWFjaCgoYixjKT0+e2IudXBkYXRlKGEsMD09PWMpfSl9ZHJhdyh7Y2FtZXJhOmF9PXt9KXt0aGlzLnJvb3QudXBkYXRlTWF0cml4V29ybGQoITApLHRoaXMuYm9uZXMuZm9yRWFjaCgoYSxiKT0+e2FwLm11bHRpcGx5KGEud29ybGRNYXRyaXgsYS5iaW5kSW52ZXJzZSksdGhpcy5ib25lTWF0cmljZXMuc2V0KGFwLDE2KmIpfSksdGhpcy5ib25lVGV4dHVyZSYmKHRoaXMuYm9uZVRleHR1cmUubmVlZHNVcGRhdGU9ITApLHN1cGVyLmRyYXcoe2NhbWVyYTphfSl9fSxhLlNwaGVyZT1jbGFzcyBleHRlbmRzIGZ7Y29uc3RydWN0b3IoRix7cmFkaXVzOnA9LjUsd2lkdGhTZWdtZW50czp1PTE2LGhlaWdodFNlZ21lbnRzOkc9TWF0aC5jZWlsKC41KnUpLHBoaVN0YXJ0Okg9MCxwaGlMZW5ndGg6ST0yKk1hdGguUEksdGhldGFTdGFydDpKPTAsdGhldGFMZW5ndGg6Sz1NYXRoLlBJLGF0dHJpYnV0ZXM6dj17fX09e30pe2xldCBoPXUsZj1HLHc9SCx4PUksaT1KLGs9SyxsPShoKzEpKihmKzEpLHk9aCpmKjYsbT1uZXcgRmxvYXQzMkFycmF5KDMqbCksbj1uZXcgRmxvYXQzMkFycmF5KDMqbCkscT1uZXcgRmxvYXQzMkFycmF5KDIqbCksZT1sPjY1NTM2P25ldyBVaW50MzJBcnJheSh5KTpuZXcgVWludDE2QXJyYXkoeSksYT0wLEw9MCxjPTAsTT1pK2ssaj1bXSxfPW5ldyBiO2ZvcihsZXQgcj0wO3I8PWY7cisrKXtsZXQgej1bXSxvPXIvZjtmb3IobGV0IHM9MDtzPD1oO3MrKyxhKyspe2xldCB0PXMvaCxBPS1wKk1hdGguY29zKHcrdCp4KSpNYXRoLnNpbihpK28qayksQj1wKk1hdGguY29zKGkrbyprKSxDPXAqTWF0aC5zaW4odyt0KngpKk1hdGguc2luKGkrbyprKTttWzMqYV09QSxtWzMqYSsxXT1CLG1bMyphKzJdPUMsXy5zZXQoQSxCLEMpLm5vcm1hbGl6ZSgpLG5bMyphXT1fLngsblszKmErMV09Xy55LG5bMyphKzJdPV8ueixxWzIqYV09dCxxWzIqYSsxXT0xLW8sei5wdXNoKEwrKyl9ai5wdXNoKHopfWZvcihsZXQgZD0wO2Q8ZjtkKyspZm9yKGxldCBnPTA7ZzxoO2crKyl7bGV0IE49altkXVtnKzFdLEQ9altkXVtnXSxPPWpbZCsxXVtnXSxFPWpbZCsxXVtnKzFdOygwIT09ZHx8aT4wKSYmKGVbMypjXT1OLGVbMypjKzFdPUQsZVszKmMrMl09RSxjKyspLChkIT09Zi0xfHxNPE1hdGguUEkpJiYoZVszKmNdPUQsZVszKmMrMV09TyxlWzMqYysyXT1FLGMrKyl9T2JqZWN0LmFzc2lnbih2LHtwb3NpdGlvbjp7c2l6ZTozLGRhdGE6bX0sbm9ybWFsOntzaXplOjMsZGF0YTpufSx1djp7c2l6ZToyLGRhdGE6cX0saW5kZXg6e2RhdGE6ZX19KSxzdXBlcihGLHYpfX0sYS5UZXh0PWZ1bmN0aW9uKHtmb250OmEsdGV4dDpkLHdpZHRoOmU9MS8wLGFsaWduOmY9XCJsZWZ0XCIsc2l6ZTpnPTEsbGV0dGVyU3BhY2luZzpoPTAsbGluZUhlaWdodDppPTEuNCx3b3JkU3BhY2luZzpqPTAsd29yZEJyZWFrOms9ITF9KXtsZXQgbD10aGlzLGIsbSxuLG8scCxxPS9cXG4vLHI9L1xccy87ZnVuY3Rpb24gYygpe249YS5jb21tb24ubGluZUhlaWdodCxvPWEuY29tbW9uLmJhc2UscD1nL287bGV0IGM9ZC5yZXBsYWNlKC9bIFxcbl0vZyxcIlwiKS5sZW5ndGg7bT17cG9zaXRpb246bmV3IEZsb2F0MzJBcnJheSg0KmMqMyksdXY6bmV3IEZsb2F0MzJBcnJheSg0KmMqMiksaWQ6bmV3IEZsb2F0MzJBcnJheSg0KmMpLGluZGV4Om5ldyBVaW50MTZBcnJheSg2KmMpfTtmb3IobGV0IGI9MDtiPGM7YisrKW0uaWRbYl09YixtLmluZGV4LnNldChbNCpiLDQqYisyLDQqYisxLDQqYisxLDQqYisyLDQqYiszXSw2KmIpO3MoKX1mdW5jdGlvbiBzKCl7bGV0IHk9W10sbj0wLHU9MCxvPTAsYz13KCk7ZnVuY3Rpb24gdygpe2xldCBhPXt3aWR0aDowLGdseXBoczpbXX07cmV0dXJuIHkucHVzaChhKSx1PW4sbz0wLGF9bGV0IHo9MDtmb3IoO248ZC5sZW5ndGgmJno8MTAwOyl7eisrO2xldCB2PWRbbl07aWYoIWMud2lkdGgmJnIudGVzdCh2KSl7dT0rK24sbz0wO2NvbnRpbnVlfWlmKHEudGVzdCh2KSl7bisrLGM9dygpO2NvbnRpbnVlfWxldCB4PWJbdl07aWYoYy5nbHlwaHMubGVuZ3RoKXtsZXQgQz1jLmdseXBoc1tjLmdseXBocy5sZW5ndGgtMV1bMF0sQT10KHguaWQsQy5pZCkqcDtjLndpZHRoKz1BLG8rPUF9Yy5nbHlwaHMucHVzaChbeCxjLndpZHRoXSk7bGV0IHM9MDtpZihyLnRlc3Qodik/KHU9bixvPTAscys9aipnKTpzKz1oKmcscys9eC54YWR2YW5jZSpwLGMud2lkdGgrPXMsbys9cyxjLndpZHRoPmUpe2lmKGsmJmMuZ2x5cGhzLmxlbmd0aD4xKXtjLndpZHRoLT1zLGMuZ2x5cGhzLnBvcCgpLGM9dygpO2NvbnRpbnVlfWlmKCFrJiZvIT09Yy53aWR0aCl7bGV0IEI9bi11KzE7Yy5nbHlwaHMuc3BsaWNlKC1CLEIpLG49dSxjLndpZHRoLT1vLGM9dygpO2NvbnRpbnVlfX1uKyt9Yy53aWR0aHx8eS5wb3AoKSxmdW5jdGlvbihuKXtsZXQgcz1hLmNvbW1vbi5zY2FsZVcsdD1hLmNvbW1vbi5zY2FsZUgsYz0uMDcqZyxvPTA7Zm9yKGxldCBxPTA7cTxuLmxlbmd0aDtxKyspe2xldCBlPW5bcV07Zm9yKGxldCBoPTA7aDxlLmdseXBocy5sZW5ndGg7aCsrKXtsZXQgYj1lLmdseXBoc1toXVswXSxkPWUuZ2x5cGhzW2hdWzFdO2lmKFwiY2VudGVyXCI9PT1mP2QtPS41KmUud2lkdGg6XCJyaWdodFwiPT09ZiYmKGQtPWUud2lkdGgpLHIudGVzdChiLmNoYXIpKWNvbnRpbnVlO2QrPWIueG9mZnNldCpwLGMtPWIueW9mZnNldCpwO2xldCB1PWIud2lkdGgqcCx2PWIuaGVpZ2h0KnA7bS5wb3NpdGlvbi5zZXQoW2QsYy12LDAsZCxjLDAsZCt1LGMtdiwwLGQrdSxjLDBdLDQqbyozKTtsZXQgaj1iLngvcyx3PWIud2lkdGgvcyxrPTEtYi55L3QseD1iLmhlaWdodC90O20udXYuc2V0KFtqLGsteCxqLGssait3LGsteCxqK3csa10sNCpvKjIpLGMrPWIueW9mZnNldCpwLG8rK31jLT1nKml9bC5idWZmZXJzPW0sbC5udW1MaW5lcz1uLmxlbmd0aCxsLmhlaWdodD1sLm51bUxpbmVzKmcqaX0oeSl9ZnVuY3Rpb24gdChjLGUpe2ZvcihsZXQgZD0wO2Q8YS5rZXJuaW5ncy5sZW5ndGg7ZCsrKXtsZXQgYj1hLmtlcm5pbmdzW2RdO2lmKCEoYi5maXJzdDxjfHxiLnNlY29uZDxlKSlyZXR1cm4gYi5maXJzdD5jPzA6Yi5maXJzdD09PWMmJmIuc2Vjb25kPmU/MDpiLmFtb3VudH1yZXR1cm4gMH1iPXt9LGEuY2hhcnMuZm9yRWFjaChhPT5iW2EuY2hhcl09YSksYygpLHRoaXMucmVzaXplPWZ1bmN0aW9uKGEpeyh7d2lkdGg6ZX09YSkscygpfSx0aGlzLnVwZGF0ZT1mdW5jdGlvbihhKXsoe3RleHQ6ZH09YSksYygpfX0sYS5UZXh0dXJlPW8sYS5UcmFuc2Zvcm09ZyxhLlZlYzI9ZSxhLlZlYzM9YixhLlZlYzQ9Y2xhc3MgZXh0ZW5kcyBBcnJheXtjb25zdHJ1Y3RvcihhPTAsYj1hLGM9YSxkPWEpe3JldHVybiBzdXBlcihhLGIsYyxkKSx0aGlzfWdldCB4KCl7cmV0dXJuIHRoaXNbMF19c2V0IHgoYSl7dGhpc1swXT1hfWdldCB5KCl7cmV0dXJuIHRoaXNbMV19c2V0IHkoYSl7dGhpc1sxXT1hfWdldCB6KCl7cmV0dXJuIHRoaXNbMl19c2V0IHooYSl7dGhpc1syXT1hfWdldCB3KCl7cmV0dXJuIHRoaXNbM119c2V0IHcoYSl7dGhpc1szXT1hfXNldChhLGIsYyxkKXtyZXR1cm4gYS5sZW5ndGg/dGhpcy5jb3B5KGEpOihqKHRoaXMsYSxiLGMsZCksdGhpcyl9Y29weShhKXtyZXR1cm4gaSh0aGlzLGEpLHRoaXN9bm9ybWFsaXplKCl7cmV0dXJuIGsodGhpcyx0aGlzKSx0aGlzfWZyb21BcnJheShhLGI9MCl7cmV0dXJuIHRoaXNbMF09YVtiXSx0aGlzWzFdPWFbYisxXSx0aGlzWzJdPWFbYisyXSx0aGlzWzNdPWFbYiszXSx0aGlzfXRvQXJyYXkoYT1bXSxiPTApe3JldHVybiBhW2JdPXRoaXNbMF0sYVtiKzFdPXRoaXNbMV0sYVtiKzJdPXRoaXNbMl0sYVtiKzNdPXRoaXNbM10sYX19LGF9KHt9KSIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSID0gdHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnID8gUmVmbGVjdCA6IG51bGxcbnZhciBSZWZsZWN0QXBwbHkgPSBSICYmIHR5cGVvZiBSLmFwcGx5ID09PSAnZnVuY3Rpb24nXG4gID8gUi5hcHBseVxuICA6IGZ1bmN0aW9uIFJlZmxlY3RBcHBseSh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpO1xuICB9XG5cbnZhciBSZWZsZWN0T3duS2V5c1xuaWYgKFIgJiYgdHlwZW9mIFIub3duS2V5cyA9PT0gJ2Z1bmN0aW9uJykge1xuICBSZWZsZWN0T3duS2V5cyA9IFIub3duS2V5c1xufSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldClcbiAgICAgIC5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFByb2Nlc3NFbWl0V2FybmluZyh3YXJuaW5nKSB7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2FybikgY29uc29sZS53YXJuKHdhcm5pbmcpO1xufVxuXG52YXIgTnVtYmVySXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgZnVuY3Rpb24gTnVtYmVySXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICBFdmVudEVtaXR0ZXIuaW5pdC5jYWxsKHRoaXMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5tb2R1bGUuZXhwb3J0cy5vbmNlID0gb25jZTtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHNDb3VudCA9IDA7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbnZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbmZ1bmN0aW9uIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudEVtaXR0ZXIsICdkZWZhdWx0TWF4TGlzdGVuZXJzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyB8fCBhcmcgPCAwIHx8IE51bWJlcklzTmFOKGFyZykpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIGFyZyArICcuJyk7XG4gICAgfVxuICAgIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBhcmc7XG4gIH1cbn0pO1xuXG5FdmVudEVtaXR0ZXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gIGlmICh0aGlzLl9ldmVudHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgTnVtYmVySXNOYU4obikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBuICsgJy4nKTtcbiAgfVxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIF9nZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuIF9nZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICB2YXIgZG9FcnJvciA9ICh0eXBlID09PSAnZXJyb3InKTtcblxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpXG4gICAgZG9FcnJvciA9IChkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PT0gdW5kZWZpbmVkKTtcbiAgZWxzZSBpZiAoIWRvRXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICB2YXIgZXI7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMClcbiAgICAgIGVyID0gYXJnc1swXTtcbiAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgLy8gTm90ZTogVGhlIGNvbW1lbnRzIG9uIHRoZSBgdGhyb3dgIGxpbmVzIGFyZSBpbnRlbnRpb25hbCwgdGhleSBzaG93XG4gICAgICAvLyB1cCBpbiBOb2RlJ3Mgb3V0cHV0IGlmIHRoaXMgcmVzdWx0cyBpbiBhbiB1bmhhbmRsZWQgZXhjZXB0aW9uLlxuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgfVxuICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmhhbmRsZWQgZXJyb3IuJyArIChlciA/ICcgKCcgKyBlci5tZXNzYWdlICsgJyknIDogJycpKTtcbiAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgIHRocm93IGVycjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgfVxuXG4gIHZhciBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIFJlZmxlY3RBcHBseShoYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgUmVmbGVjdEFwcGx5KGxpc3RlbmVyc1tpXSwgdGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldC5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA/IGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gICAgICAvLyBSZS1hc3NpZ24gYGV2ZW50c2AgYmVjYXVzZSBhIG5ld0xpc3RlbmVyIGhhbmRsZXIgY291bGQgaGF2ZSBjYXVzZWQgdGhlXG4gICAgICAvLyB0aGlzLl9ldmVudHMgdG8gYmUgYXNzaWduZWQgdG8gYSBuZXcgb2JqZWN0XG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPVxuICAgICAgICBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOiBbZXhpc3RpbmcsIGxpc3RlbmVyXTtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB9IGVsc2UgaWYgKHByZXBlbmQpIHtcbiAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdGluZy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICAgIG0gPSBfZ2V0TWF4TGlzdGVuZXJzKHRhcmdldCk7XG4gICAgaWYgKG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0gJiYgIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgIC8vIE5vIGVycm9yIGNvZGUgZm9yIHRoaXMgc2luY2UgaXQgaXMgYSBXYXJuaW5nXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIHZhciB3ID0gbmV3IEVycm9yKCdQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5sZW5ndGggKyAnICcgKyBTdHJpbmcodHlwZSkgKyAnIGxpc3RlbmVycyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luY3JlYXNlIGxpbWl0Jyk7XG4gICAgICB3Lm5hbWUgPSAnTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nJztcbiAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgIHcudHlwZSA9IHR5cGU7XG4gICAgICB3LmNvdW50ID0gZXhpc3RpbmcubGVuZ3RoO1xuICAgICAgUHJvY2Vzc0VtaXRXYXJuaW5nKHcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcblxuZnVuY3Rpb24gb25jZVdyYXBwZXIoKSB7XG4gIGlmICghdGhpcy5maXJlZCkge1xuICAgIHRoaXMudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy53cmFwRm4pO1xuICAgIHRoaXMuZmlyZWQgPSB0cnVlO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuY2FsbCh0aGlzLnRhcmdldCk7XG4gICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuYXBwbHkodGhpcy50YXJnZXQsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX29uY2VXcmFwKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIHN0YXRlID0geyBmaXJlZDogZmFsc2UsIHdyYXBGbjogdW5kZWZpbmVkLCB0YXJnZXQ6IHRhcmdldCwgdHlwZTogdHlwZSwgbGlzdGVuZXI6IGxpc3RlbmVyIH07XG4gIHZhciB3cmFwcGVkID0gb25jZVdyYXBwZXIuYmluZChzdGF0ZSk7XG4gIHdyYXBwZWQubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgc3RhdGUud3JhcEZuID0gd3JhcHBlZDtcbiAgcmV0dXJuIHdyYXBwZWQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gIHRoaXMub24odHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kT25jZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgIHRoaXMucHJlcGVuZExpc3RlbmVyKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuLy8gRW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmIGFuZCBvbmx5IGlmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgbGlzdCwgZXZlbnRzLCBwb3NpdGlvbiwgaSwgb3JpZ2luYWxMaXN0ZW5lcjtcblxuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGxpc3QgPSBldmVudHNbdHlwZV07XG4gICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8IGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0Lmxpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgICAgIGZvciAoaSA9IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHwgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsTGlzdGVuZXIgPSBsaXN0W2ldLmxpc3RlbmVyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09IDApXG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcGxpY2VPbmUobGlzdCwgcG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKVxuICAgICAgICAgIGV2ZW50c1t0eXBlXSA9IGxpc3RbMF07XG5cbiAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBvcmlnaW5hbExpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cywgaTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRzW3R5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV07XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuZnVuY3Rpb24gX2xpc3RlbmVycyh0YXJnZXQsIHR5cGUsIHVud3JhcCkge1xuICB2YXIgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgaWYgKGV2bGlzdGVuZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiB1bndyYXAgPyBbZXZsaXN0ZW5lci5saXN0ZW5lciB8fCBldmxpc3RlbmVyXSA6IFtldmxpc3RlbmVyXTtcblxuICByZXR1cm4gdW53cmFwID9cbiAgICB1bndyYXBMaXN0ZW5lcnMoZXZsaXN0ZW5lcikgOiBhcnJheUNsb25lKGV2bGlzdGVuZXIsIGV2bGlzdGVuZXIubGVuZ3RoKTtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCB0cnVlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmF3TGlzdGVuZXJzID0gZnVuY3Rpb24gcmF3TGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5saXN0ZW5lckNvdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGlzdGVuZXJDb3VudC5jYWxsKGVtaXR0ZXIsIHR5cGUpO1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBsaXN0ZW5lckNvdW50O1xuZnVuY3Rpb24gbGlzdGVuZXJDb3VudCh0eXBlKSB7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHJldHVybiB0aGlzLl9ldmVudHNDb3VudCA+IDAgPyBSZWZsZWN0T3duS2V5cyh0aGlzLl9ldmVudHMpIDogW107XG59O1xuXG5mdW5jdGlvbiBhcnJheUNsb25lKGFyciwgbikge1xuICB2YXIgY29weSA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpXG4gICAgY29weVtpXSA9IGFycltpXTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKDsgaW5kZXggKyAxIDwgbGlzdC5sZW5ndGg7IGluZGV4KyspXG4gICAgbGlzdFtpbmRleF0gPSBsaXN0W2luZGV4ICsgMV07XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhhcnIpIHtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyArK2kpIHtcbiAgICByZXRbaV0gPSBhcnJbaV0ubGlzdGVuZXIgfHwgYXJyW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIG9uY2UoZW1pdHRlciwgbmFtZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGZ1bmN0aW9uIGVycm9yTGlzdGVuZXIoZXJyKSB7XG4gICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKG5hbWUsIHJlc29sdmVyKTtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc29sdmVyKCkge1xuICAgICAgaWYgKHR5cGVvZiBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICByZXNvbHZlKFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgfTtcblxuICAgIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCBuYW1lLCByZXNvbHZlciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgIGlmIChuYW1lICE9PSAnZXJyb3InKSB7XG4gICAgICBhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlcihlbWl0dGVyLCBlcnJvckxpc3RlbmVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIoZW1pdHRlciwgaGFuZGxlciwgZmxhZ3MpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLm9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsICdlcnJvcicsIGhhbmRsZXIsIGZsYWdzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgbmFtZSwgbGlzdGVuZXIsIGZsYWdzKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChmbGFncy5vbmNlKSB7XG4gICAgICBlbWl0dGVyLm9uY2UobmFtZSwgbGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbWl0dGVyLm9uKG5hbWUsIGxpc3RlbmVyKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIEV2ZW50VGFyZ2V0IGRvZXMgbm90IGhhdmUgYGVycm9yYCBldmVudCBzZW1hbnRpY3MgbGlrZSBOb2RlXG4gICAgLy8gRXZlbnRFbWl0dGVycywgd2UgZG8gbm90IGxpc3RlbiBmb3IgYGVycm9yYCBldmVudHMgaGVyZS5cbiAgICBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZnVuY3Rpb24gd3JhcExpc3RlbmVyKGFyZykge1xuICAgICAgLy8gSUUgZG9lcyBub3QgaGF2ZSBidWlsdGluIGB7IG9uY2U6IHRydWUgfWAgc3VwcG9ydCBzbyB3ZVxuICAgICAgLy8gaGF2ZSB0byBkbyBpdCBtYW51YWxseS5cbiAgICAgIGlmIChmbGFncy5vbmNlKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCB3cmFwTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgbGlzdGVuZXIoYXJnKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJlbWl0dGVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEV2ZW50RW1pdHRlci4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGVtaXR0ZXIpO1xuICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgbmFtZWRfcmVmZXJlbmNlc18xID0gcmVxdWlyZShcIi4vbmFtZWQtcmVmZXJlbmNlc1wiKTtcbnZhciBudW1lcmljX3VuaWNvZGVfbWFwXzEgPSByZXF1aXJlKFwiLi9udW1lcmljLXVuaWNvZGUtbWFwXCIpO1xudmFyIHN1cnJvZ2F0ZV9wYWlyc18xID0gcmVxdWlyZShcIi4vc3Vycm9nYXRlLXBhaXJzXCIpO1xudmFyIGFsbE5hbWVkUmVmZXJlbmNlcyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBuYW1lZF9yZWZlcmVuY2VzXzEubmFtZWRSZWZlcmVuY2VzKSwgeyBhbGw6IG5hbWVkX3JlZmVyZW5jZXNfMS5uYW1lZFJlZmVyZW5jZXMuaHRtbDUgfSk7XG52YXIgZW5jb2RlUmVnRXhwcyA9IHtcbiAgICBzcGVjaWFsQ2hhcnM6IC9bPD4nXCImXS9nLFxuICAgIG5vbkFzY2lpOiAvKD86Wzw+J1wiJlxcdTAwODAtXFx1RDdGRlxcdUUwMDAtXFx1RkZGRl18W1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXXxbXFx1RDgwMC1cXHVEQkZGXSg/IVtcXHVEQzAwLVxcdURGRkZdKXwoPzpbXlxcdUQ4MDAtXFx1REJGRl18XilbXFx1REMwMC1cXHVERkZGXSkvZyxcbiAgICBub25Bc2NpaVByaW50YWJsZTogLyg/Ols8PidcIiZcXHgwMS1cXHgwOFxceDExLVxceDE1XFx4MTctXFx4MUZcXHg3Zi1cXHVEN0ZGXFx1RTAwMC1cXHVGRkZGXXxbXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdfFtcXHVEODAwLVxcdURCRkZdKD8hW1xcdURDMDAtXFx1REZGRl0pfCg/OlteXFx1RDgwMC1cXHVEQkZGXXxeKVtcXHVEQzAwLVxcdURGRkZdKS9nLFxuICAgIGV4dGVuc2l2ZTogLyg/OltcXHgwMS1cXHgwY1xceDBlLVxceDFmXFx4MjEtXFx4MmNcXHgyZS1cXHgyZlxceDNhLVxceDQwXFx4NWItXFx4NjBcXHg3Yi1cXHg3ZFxceDdmLVxcdUQ3RkZcXHVFMDAwLVxcdUZGRkZdfFtcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl18W1xcdUQ4MDAtXFx1REJGRl0oPyFbXFx1REMwMC1cXHVERkZGXSl8KD86W15cXHVEODAwLVxcdURCRkZdfF4pW1xcdURDMDAtXFx1REZGRl0pL2dcbn07XG52YXIgZGVmYXVsdEVuY29kZU9wdGlvbnMgPSB7XG4gICAgbW9kZTogJ3NwZWNpYWxDaGFycycsXG4gICAgbGV2ZWw6ICdhbGwnLFxuICAgIG51bWVyaWM6ICdkZWNpbWFsJ1xufTtcbi8qKiBFbmNvZGVzIGFsbCB0aGUgbmVjZXNzYXJ5IChzcGVjaWZpZWQgYnkgYGxldmVsYCkgY2hhcmFjdGVycyBpbiB0aGUgdGV4dCAqL1xuZnVuY3Rpb24gZW5jb2RlKHRleHQsIF9hKSB7XG4gICAgdmFyIF9iID0gX2EgPT09IHZvaWQgMCA/IGRlZmF1bHRFbmNvZGVPcHRpb25zIDogX2EsIF9jID0gX2IubW9kZSwgbW9kZSA9IF9jID09PSB2b2lkIDAgPyAnc3BlY2lhbENoYXJzJyA6IF9jLCBfZCA9IF9iLm51bWVyaWMsIG51bWVyaWMgPSBfZCA9PT0gdm9pZCAwID8gJ2RlY2ltYWwnIDogX2QsIF9lID0gX2IubGV2ZWwsIGxldmVsID0gX2UgPT09IHZvaWQgMCA/ICdhbGwnIDogX2U7XG4gICAgaWYgKCF0ZXh0KSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgdmFyIGVuY29kZVJlZ0V4cCA9IGVuY29kZVJlZ0V4cHNbbW9kZV07XG4gICAgdmFyIHJlZmVyZW5jZXMgPSBhbGxOYW1lZFJlZmVyZW5jZXNbbGV2ZWxdLmNoYXJhY3RlcnM7XG4gICAgdmFyIGlzSGV4ID0gbnVtZXJpYyA9PT0gJ2hleGFkZWNpbWFsJztcbiAgICBlbmNvZGVSZWdFeHAubGFzdEluZGV4ID0gMDtcbiAgICB2YXIgX2IgPSBlbmNvZGVSZWdFeHAuZXhlYyh0ZXh0KTtcbiAgICB2YXIgX2M7XG4gICAgaWYgKF9iKSB7XG4gICAgICAgIF9jID0gJyc7XG4gICAgICAgIHZhciBfZCA9IDA7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGlmIChfZCAhPT0gX2IuaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBfYyArPSB0ZXh0LnN1YnN0cmluZyhfZCwgX2IuaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIF9lID0gX2JbMF07XG4gICAgICAgICAgICB2YXIgcmVzdWx0XzEgPSByZWZlcmVuY2VzW19lXTtcbiAgICAgICAgICAgIGlmICghcmVzdWx0XzEpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29kZV8xID0gX2UubGVuZ3RoID4gMSA/IHN1cnJvZ2F0ZV9wYWlyc18xLmdldENvZGVQb2ludChfZSwgMCkgOiBfZS5jaGFyQ29kZUF0KDApO1xuICAgICAgICAgICAgICAgIHJlc3VsdF8xID0gKGlzSGV4ID8gJyYjeCcgKyBjb2RlXzEudG9TdHJpbmcoMTYpIDogJyYjJyArIGNvZGVfMSkgKyAnOyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfYyArPSByZXN1bHRfMTtcbiAgICAgICAgICAgIF9kID0gX2IuaW5kZXggKyBfZS5sZW5ndGg7XG4gICAgICAgIH0gd2hpbGUgKChfYiA9IGVuY29kZVJlZ0V4cC5leGVjKHRleHQpKSk7XG4gICAgICAgIGlmIChfZCAhPT0gdGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgIF9jICs9IHRleHQuc3Vic3RyaW5nKF9kKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgX2MgPVxuICAgICAgICAgICAgdGV4dDtcbiAgICB9XG4gICAgcmV0dXJuIF9jO1xufVxuZXhwb3J0cy5lbmNvZGUgPSBlbmNvZGU7XG52YXIgZGVmYXVsdERlY29kZU9wdGlvbnMgPSB7XG4gICAgc2NvcGU6ICdib2R5JyxcbiAgICBsZXZlbDogJ2FsbCdcbn07XG52YXIgc3RyaWN0ID0gLyYoPzojXFxkK3wjW3hYXVtcXGRhLWZBLUZdK3xbMC05YS16QS1aXSspOy9nO1xudmFyIGF0dHJpYnV0ZSA9IC8mKD86I1xcZCt8I1t4WF1bXFxkYS1mQS1GXSt8WzAtOWEtekEtWl0rKVs7PV0/L2c7XG52YXIgYmFzZURlY29kZVJlZ0V4cHMgPSB7XG4gICAgeG1sOiB7XG4gICAgICAgIHN0cmljdDogc3RyaWN0LFxuICAgICAgICBhdHRyaWJ1dGU6IGF0dHJpYnV0ZSxcbiAgICAgICAgYm9keTogbmFtZWRfcmVmZXJlbmNlc18xLmJvZHlSZWdFeHBzLnhtbFxuICAgIH0sXG4gICAgaHRtbDQ6IHtcbiAgICAgICAgc3RyaWN0OiBzdHJpY3QsXG4gICAgICAgIGF0dHJpYnV0ZTogYXR0cmlidXRlLFxuICAgICAgICBib2R5OiBuYW1lZF9yZWZlcmVuY2VzXzEuYm9keVJlZ0V4cHMuaHRtbDRcbiAgICB9LFxuICAgIGh0bWw1OiB7XG4gICAgICAgIHN0cmljdDogc3RyaWN0LFxuICAgICAgICBhdHRyaWJ1dGU6IGF0dHJpYnV0ZSxcbiAgICAgICAgYm9keTogbmFtZWRfcmVmZXJlbmNlc18xLmJvZHlSZWdFeHBzLmh0bWw1XG4gICAgfVxufTtcbnZhciBkZWNvZGVSZWdFeHBzID0gX19hc3NpZ24oX19hc3NpZ24oe30sIGJhc2VEZWNvZGVSZWdFeHBzKSwgeyBhbGw6IGJhc2VEZWNvZGVSZWdFeHBzLmh0bWw1IH0pO1xudmFyIGZyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGU7XG52YXIgb3V0T2ZCb3VuZHNDaGFyID0gZnJvbUNoYXJDb2RlKDY1NTMzKTtcbnZhciBkZWZhdWx0RGVjb2RlRW50aXR5T3B0aW9ucyA9IHtcbiAgICBsZXZlbDogJ2FsbCdcbn07XG4vKiogRGVjb2RlcyBhIHNpbmdsZSBlbnRpdHkgKi9cbmZ1bmN0aW9uIGRlY29kZUVudGl0eShlbnRpdHksIF9hKSB7XG4gICAgdmFyIF9iID0gKF9hID09PSB2b2lkIDAgPyBkZWZhdWx0RGVjb2RlRW50aXR5T3B0aW9ucyA6IF9hKS5sZXZlbCwgbGV2ZWwgPSBfYiA9PT0gdm9pZCAwID8gJ2FsbCcgOiBfYjtcbiAgICBpZiAoIWVudGl0eSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHZhciBfYiA9IGVudGl0eTtcbiAgICB2YXIgZGVjb2RlRW50aXR5TGFzdENoYXJfMSA9IGVudGl0eVtlbnRpdHkubGVuZ3RoIC0gMV07XG4gICAgaWYgKGZhbHNlXG4gICAgICAgICYmIGRlY29kZUVudGl0eUxhc3RDaGFyXzEgPT09ICc9Jykge1xuICAgICAgICBfYiA9XG4gICAgICAgICAgICBlbnRpdHk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGZhbHNlXG4gICAgICAgICYmIGRlY29kZUVudGl0eUxhc3RDaGFyXzEgIT09ICc7Jykge1xuICAgICAgICBfYiA9XG4gICAgICAgICAgICBlbnRpdHk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgZGVjb2RlUmVzdWx0QnlSZWZlcmVuY2VfMSA9IGFsbE5hbWVkUmVmZXJlbmNlc1tsZXZlbF0uZW50aXRpZXNbZW50aXR5XTtcbiAgICAgICAgaWYgKGRlY29kZVJlc3VsdEJ5UmVmZXJlbmNlXzEpIHtcbiAgICAgICAgICAgIF9iID0gZGVjb2RlUmVzdWx0QnlSZWZlcmVuY2VfMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChlbnRpdHlbMF0gPT09ICcmJyAmJiBlbnRpdHlbMV0gPT09ICcjJykge1xuICAgICAgICAgICAgdmFyIGRlY29kZVNlY29uZENoYXJfMSA9IGVudGl0eVsyXTtcbiAgICAgICAgICAgIHZhciBkZWNvZGVDb2RlXzEgPSBkZWNvZGVTZWNvbmRDaGFyXzEgPT0gJ3gnIHx8IGRlY29kZVNlY29uZENoYXJfMSA9PSAnWCdcbiAgICAgICAgICAgICAgICA/IHBhcnNlSW50KGVudGl0eS5zdWJzdHIoMyksIDE2KVxuICAgICAgICAgICAgICAgIDogcGFyc2VJbnQoZW50aXR5LnN1YnN0cigyKSk7XG4gICAgICAgICAgICBfYiA9XG4gICAgICAgICAgICAgICAgZGVjb2RlQ29kZV8xID49IDB4MTBmZmZmXG4gICAgICAgICAgICAgICAgICAgID8gb3V0T2ZCb3VuZHNDaGFyXG4gICAgICAgICAgICAgICAgICAgIDogZGVjb2RlQ29kZV8xID4gNjU1MzVcbiAgICAgICAgICAgICAgICAgICAgICAgID8gc3Vycm9nYXRlX3BhaXJzXzEuZnJvbUNvZGVQb2ludChkZWNvZGVDb2RlXzEpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGZyb21DaGFyQ29kZShudW1lcmljX3VuaWNvZGVfbWFwXzEubnVtZXJpY1VuaWNvZGVNYXBbZGVjb2RlQ29kZV8xXSB8fCBkZWNvZGVDb2RlXzEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBfYjtcbn1cbmV4cG9ydHMuZGVjb2RlRW50aXR5ID0gZGVjb2RlRW50aXR5O1xuLyoqIERlY29kZXMgYWxsIGVudGl0aWVzIGluIHRoZSB0ZXh0ICovXG5mdW5jdGlvbiBkZWNvZGUodGV4dCwgX2EpIHtcbiAgICB2YXIgZGVjb2RlU2Vjb25kQ2hhcl8xID0gX2EgPT09IHZvaWQgMCA/IGRlZmF1bHREZWNvZGVPcHRpb25zIDogX2EsIGRlY29kZUNvZGVfMSA9IGRlY29kZVNlY29uZENoYXJfMS5sZXZlbCwgbGV2ZWwgPSBkZWNvZGVDb2RlXzEgPT09IHZvaWQgMCA/ICdhbGwnIDogZGVjb2RlQ29kZV8xLCBfYiA9IGRlY29kZVNlY29uZENoYXJfMS5zY29wZSwgc2NvcGUgPSBfYiA9PT0gdm9pZCAwID8gbGV2ZWwgPT09ICd4bWwnID8gJ3N0cmljdCcgOiAnYm9keScgOiBfYjtcbiAgICBpZiAoIXRleHQpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICB2YXIgZGVjb2RlUmVnRXhwID0gZGVjb2RlUmVnRXhwc1tsZXZlbF1bc2NvcGVdO1xuICAgIHZhciByZWZlcmVuY2VzID0gYWxsTmFtZWRSZWZlcmVuY2VzW2xldmVsXS5lbnRpdGllcztcbiAgICB2YXIgaXNBdHRyaWJ1dGUgPSBzY29wZSA9PT0gJ2F0dHJpYnV0ZSc7XG4gICAgdmFyIGlzU3RyaWN0ID0gc2NvcGUgPT09ICdzdHJpY3QnO1xuICAgIGRlY29kZVJlZ0V4cC5sYXN0SW5kZXggPSAwO1xuICAgIHZhciByZXBsYWNlTWF0Y2hfMSA9IGRlY29kZVJlZ0V4cC5leGVjKHRleHQpO1xuICAgIHZhciByZXBsYWNlUmVzdWx0XzE7XG4gICAgaWYgKHJlcGxhY2VNYXRjaF8xKSB7XG4gICAgICAgIHJlcGxhY2VSZXN1bHRfMSA9ICcnO1xuICAgICAgICB2YXIgcmVwbGFjZUxhc3RJbmRleF8xID0gMDtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgaWYgKHJlcGxhY2VMYXN0SW5kZXhfMSAhPT0gcmVwbGFjZU1hdGNoXzEuaW5kZXgpIHtcbiAgICAgICAgICAgICAgICByZXBsYWNlUmVzdWx0XzEgKz0gdGV4dC5zdWJzdHJpbmcocmVwbGFjZUxhc3RJbmRleF8xLCByZXBsYWNlTWF0Y2hfMS5pbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcmVwbGFjZUlucHV0XzEgPSByZXBsYWNlTWF0Y2hfMVswXTtcbiAgICAgICAgICAgIHZhciBkZWNvZGVSZXN1bHRfMSA9IHJlcGxhY2VJbnB1dF8xO1xuICAgICAgICAgICAgdmFyIGRlY29kZUVudGl0eUxhc3RDaGFyXzIgPSByZXBsYWNlSW5wdXRfMVtyZXBsYWNlSW5wdXRfMS5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGlmIChpc0F0dHJpYnV0ZVxuICAgICAgICAgICAgICAgICYmIGRlY29kZUVudGl0eUxhc3RDaGFyXzIgPT09ICc9Jykge1xuICAgICAgICAgICAgICAgIGRlY29kZVJlc3VsdF8xID0gcmVwbGFjZUlucHV0XzE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc1N0cmljdFxuICAgICAgICAgICAgICAgICYmIGRlY29kZUVudGl0eUxhc3RDaGFyXzIgIT09ICc7Jykge1xuICAgICAgICAgICAgICAgIGRlY29kZVJlc3VsdF8xID0gcmVwbGFjZUlucHV0XzE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVjb2RlUmVzdWx0QnlSZWZlcmVuY2VfMiA9IHJlZmVyZW5jZXNbcmVwbGFjZUlucHV0XzFdO1xuICAgICAgICAgICAgICAgIGlmIChkZWNvZGVSZXN1bHRCeVJlZmVyZW5jZV8yKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlY29kZVJlc3VsdF8xID0gZGVjb2RlUmVzdWx0QnlSZWZlcmVuY2VfMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocmVwbGFjZUlucHV0XzFbMF0gPT09ICcmJyAmJiByZXBsYWNlSW5wdXRfMVsxXSA9PT0gJyMnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWNvZGVTZWNvbmRDaGFyXzIgPSByZXBsYWNlSW5wdXRfMVsyXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlY29kZUNvZGVfMiA9IGRlY29kZVNlY29uZENoYXJfMiA9PSAneCcgfHwgZGVjb2RlU2Vjb25kQ2hhcl8yID09ICdYJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyBwYXJzZUludChyZXBsYWNlSW5wdXRfMS5zdWJzdHIoMyksIDE2KVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBwYXJzZUludChyZXBsYWNlSW5wdXRfMS5zdWJzdHIoMikpO1xuICAgICAgICAgICAgICAgICAgICBkZWNvZGVSZXN1bHRfMSA9XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWNvZGVDb2RlXzIgPj0gMHgxMGZmZmZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IG91dE9mQm91bmRzQ2hhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZGVjb2RlQ29kZV8yID4gNjU1MzVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBzdXJyb2dhdGVfcGFpcnNfMS5mcm9tQ29kZVBvaW50KGRlY29kZUNvZGVfMilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBmcm9tQ2hhckNvZGUobnVtZXJpY191bmljb2RlX21hcF8xLm51bWVyaWNVbmljb2RlTWFwW2RlY29kZUNvZGVfMl0gfHwgZGVjb2RlQ29kZV8yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXBsYWNlUmVzdWx0XzEgKz0gZGVjb2RlUmVzdWx0XzE7XG4gICAgICAgICAgICByZXBsYWNlTGFzdEluZGV4XzEgPSByZXBsYWNlTWF0Y2hfMS5pbmRleCArIHJlcGxhY2VJbnB1dF8xLmxlbmd0aDtcbiAgICAgICAgfSB3aGlsZSAoKHJlcGxhY2VNYXRjaF8xID0gZGVjb2RlUmVnRXhwLmV4ZWModGV4dCkpKTtcbiAgICAgICAgaWYgKHJlcGxhY2VMYXN0SW5kZXhfMSAhPT0gdGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlcGxhY2VSZXN1bHRfMSArPSB0ZXh0LnN1YnN0cmluZyhyZXBsYWNlTGFzdEluZGV4XzEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXBsYWNlUmVzdWx0XzEgPVxuICAgICAgICAgICAgdGV4dDtcbiAgICB9XG4gICAgcmV0dXJuIHJlcGxhY2VSZXN1bHRfMTtcbn1cbmV4cG9ydHMuZGVjb2RlID0gZGVjb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOnRydWV9KTtleHBvcnRzLmJvZHlSZWdFeHBzPXt4bWw6LyYoPzojXFxkK3wjW3hYXVtcXGRhLWZBLUZdK3xbMC05YS16QS1aXSspOz8vZyxodG1sNDovJig/Om5ic3B8aWV4Y2x8Y2VudHxwb3VuZHxjdXJyZW58eWVufGJydmJhcnxzZWN0fHVtbHxjb3B5fG9yZGZ8bGFxdW98bm90fHNoeXxyZWd8bWFjcnxkZWd8cGx1c21ufHN1cDJ8c3VwM3xhY3V0ZXxtaWNyb3xwYXJhfG1pZGRvdHxjZWRpbHxzdXAxfG9yZG18cmFxdW98ZnJhYzE0fGZyYWMxMnxmcmFjMzR8aXF1ZXN0fEFncmF2ZXxBYWN1dGV8QWNpcmN8QXRpbGRlfEF1bWx8QXJpbmd8QUVsaWd8Q2NlZGlsfEVncmF2ZXxFYWN1dGV8RWNpcmN8RXVtbHxJZ3JhdmV8SWFjdXRlfEljaXJjfEl1bWx8RVRIfE50aWxkZXxPZ3JhdmV8T2FjdXRlfE9jaXJjfE90aWxkZXxPdW1sfHRpbWVzfE9zbGFzaHxVZ3JhdmV8VWFjdXRlfFVjaXJjfFV1bWx8WWFjdXRlfFRIT1JOfHN6bGlnfGFncmF2ZXxhYWN1dGV8YWNpcmN8YXRpbGRlfGF1bWx8YXJpbmd8YWVsaWd8Y2NlZGlsfGVncmF2ZXxlYWN1dGV8ZWNpcmN8ZXVtbHxpZ3JhdmV8aWFjdXRlfGljaXJjfGl1bWx8ZXRofG50aWxkZXxvZ3JhdmV8b2FjdXRlfG9jaXJjfG90aWxkZXxvdW1sfGRpdmlkZXxvc2xhc2h8dWdyYXZlfHVhY3V0ZXx1Y2lyY3x1dW1sfHlhY3V0ZXx0aG9ybnx5dW1sfHF1b3R8YW1wfGx0fGd0fCNcXGQrfCNbeFhdW1xcZGEtZkEtRl0rfFswLTlhLXpBLVpdKyk7Py9nLGh0bWw1Oi8mKD86QUVsaWd8QU1QfEFhY3V0ZXxBY2lyY3xBZ3JhdmV8QXJpbmd8QXRpbGRlfEF1bWx8Q09QWXxDY2VkaWx8RVRIfEVhY3V0ZXxFY2lyY3xFZ3JhdmV8RXVtbHxHVHxJYWN1dGV8SWNpcmN8SWdyYXZlfEl1bWx8TFR8TnRpbGRlfE9hY3V0ZXxPY2lyY3xPZ3JhdmV8T3NsYXNofE90aWxkZXxPdW1sfFFVT1R8UkVHfFRIT1JOfFVhY3V0ZXxVY2lyY3xVZ3JhdmV8VXVtbHxZYWN1dGV8YWFjdXRlfGFjaXJjfGFjdXRlfGFlbGlnfGFncmF2ZXxhbXB8YXJpbmd8YXRpbGRlfGF1bWx8YnJ2YmFyfGNjZWRpbHxjZWRpbHxjZW50fGNvcHl8Y3VycmVufGRlZ3xkaXZpZGV8ZWFjdXRlfGVjaXJjfGVncmF2ZXxldGh8ZXVtbHxmcmFjMTJ8ZnJhYzE0fGZyYWMzNHxndHxpYWN1dGV8aWNpcmN8aWV4Y2x8aWdyYXZlfGlxdWVzdHxpdW1sfGxhcXVvfGx0fG1hY3J8bWljcm98bWlkZG90fG5ic3B8bm90fG50aWxkZXxvYWN1dGV8b2NpcmN8b2dyYXZlfG9yZGZ8b3JkbXxvc2xhc2h8b3RpbGRlfG91bWx8cGFyYXxwbHVzbW58cG91bmR8cXVvdHxyYXF1b3xyZWd8c2VjdHxzaHl8c3VwMXxzdXAyfHN1cDN8c3psaWd8dGhvcm58dGltZXN8dWFjdXRlfHVjaXJjfHVncmF2ZXx1bWx8dXVtbHx5YWN1dGV8eWVufHl1bWx8I1xcZCt8I1t4WF1bXFxkYS1mQS1GXSt8WzAtOWEtekEtWl0rKTs/L2d9O2V4cG9ydHMubmFtZWRSZWZlcmVuY2VzPXt4bWw6e2VudGl0aWVzOntcIiZsdDtcIjpcIjxcIixcIiZndDtcIjpcIj5cIixcIiZxdW90O1wiOidcIicsXCImYXBvcztcIjpcIidcIixcIiZhbXA7XCI6XCImXCJ9LGNoYXJhY3RlcnM6e1wiPFwiOlwiJmx0O1wiLFwiPlwiOlwiJmd0O1wiLCdcIic6XCImcXVvdDtcIixcIidcIjpcIiZhcG9zO1wiLFwiJlwiOlwiJmFtcDtcIn19LGh0bWw0OntlbnRpdGllczp7XCImYXBvcztcIjpcIidcIixcIiZuYnNwXCI6XCLCoFwiLFwiJm5ic3A7XCI6XCLCoFwiLFwiJmlleGNsXCI6XCLCoVwiLFwiJmlleGNsO1wiOlwiwqFcIixcIiZjZW50XCI6XCLColwiLFwiJmNlbnQ7XCI6XCLColwiLFwiJnBvdW5kXCI6XCLCo1wiLFwiJnBvdW5kO1wiOlwiwqNcIixcIiZjdXJyZW5cIjpcIsKkXCIsXCImY3VycmVuO1wiOlwiwqRcIixcIiZ5ZW5cIjpcIsKlXCIsXCImeWVuO1wiOlwiwqVcIixcIiZicnZiYXJcIjpcIsKmXCIsXCImYnJ2YmFyO1wiOlwiwqZcIixcIiZzZWN0XCI6XCLCp1wiLFwiJnNlY3Q7XCI6XCLCp1wiLFwiJnVtbFwiOlwiwqhcIixcIiZ1bWw7XCI6XCLCqFwiLFwiJmNvcHlcIjpcIsKpXCIsXCImY29weTtcIjpcIsKpXCIsXCImb3JkZlwiOlwiwqpcIixcIiZvcmRmO1wiOlwiwqpcIixcIiZsYXF1b1wiOlwiwqtcIixcIiZsYXF1bztcIjpcIsKrXCIsXCImbm90XCI6XCLCrFwiLFwiJm5vdDtcIjpcIsKsXCIsXCImc2h5XCI6XCLCrVwiLFwiJnNoeTtcIjpcIsKtXCIsXCImcmVnXCI6XCLCrlwiLFwiJnJlZztcIjpcIsKuXCIsXCImbWFjclwiOlwiwq9cIixcIiZtYWNyO1wiOlwiwq9cIixcIiZkZWdcIjpcIsKwXCIsXCImZGVnO1wiOlwiwrBcIixcIiZwbHVzbW5cIjpcIsKxXCIsXCImcGx1c21uO1wiOlwiwrFcIixcIiZzdXAyXCI6XCLCslwiLFwiJnN1cDI7XCI6XCLCslwiLFwiJnN1cDNcIjpcIsKzXCIsXCImc3VwMztcIjpcIsKzXCIsXCImYWN1dGVcIjpcIsK0XCIsXCImYWN1dGU7XCI6XCLCtFwiLFwiJm1pY3JvXCI6XCLCtVwiLFwiJm1pY3JvO1wiOlwiwrVcIixcIiZwYXJhXCI6XCLCtlwiLFwiJnBhcmE7XCI6XCLCtlwiLFwiJm1pZGRvdFwiOlwiwrdcIixcIiZtaWRkb3Q7XCI6XCLCt1wiLFwiJmNlZGlsXCI6XCLCuFwiLFwiJmNlZGlsO1wiOlwiwrhcIixcIiZzdXAxXCI6XCLCuVwiLFwiJnN1cDE7XCI6XCLCuVwiLFwiJm9yZG1cIjpcIsK6XCIsXCImb3JkbTtcIjpcIsK6XCIsXCImcmFxdW9cIjpcIsK7XCIsXCImcmFxdW87XCI6XCLCu1wiLFwiJmZyYWMxNFwiOlwiwrxcIixcIiZmcmFjMTQ7XCI6XCLCvFwiLFwiJmZyYWMxMlwiOlwiwr1cIixcIiZmcmFjMTI7XCI6XCLCvVwiLFwiJmZyYWMzNFwiOlwiwr5cIixcIiZmcmFjMzQ7XCI6XCLCvlwiLFwiJmlxdWVzdFwiOlwiwr9cIixcIiZpcXVlc3Q7XCI6XCLCv1wiLFwiJkFncmF2ZVwiOlwiw4BcIixcIiZBZ3JhdmU7XCI6XCLDgFwiLFwiJkFhY3V0ZVwiOlwiw4FcIixcIiZBYWN1dGU7XCI6XCLDgVwiLFwiJkFjaXJjXCI6XCLDglwiLFwiJkFjaXJjO1wiOlwiw4JcIixcIiZBdGlsZGVcIjpcIsODXCIsXCImQXRpbGRlO1wiOlwiw4NcIixcIiZBdW1sXCI6XCLDhFwiLFwiJkF1bWw7XCI6XCLDhFwiLFwiJkFyaW5nXCI6XCLDhVwiLFwiJkFyaW5nO1wiOlwiw4VcIixcIiZBRWxpZ1wiOlwiw4ZcIixcIiZBRWxpZztcIjpcIsOGXCIsXCImQ2NlZGlsXCI6XCLDh1wiLFwiJkNjZWRpbDtcIjpcIsOHXCIsXCImRWdyYXZlXCI6XCLDiFwiLFwiJkVncmF2ZTtcIjpcIsOIXCIsXCImRWFjdXRlXCI6XCLDiVwiLFwiJkVhY3V0ZTtcIjpcIsOJXCIsXCImRWNpcmNcIjpcIsOKXCIsXCImRWNpcmM7XCI6XCLDilwiLFwiJkV1bWxcIjpcIsOLXCIsXCImRXVtbDtcIjpcIsOLXCIsXCImSWdyYXZlXCI6XCLDjFwiLFwiJklncmF2ZTtcIjpcIsOMXCIsXCImSWFjdXRlXCI6XCLDjVwiLFwiJklhY3V0ZTtcIjpcIsONXCIsXCImSWNpcmNcIjpcIsOOXCIsXCImSWNpcmM7XCI6XCLDjlwiLFwiJkl1bWxcIjpcIsOPXCIsXCImSXVtbDtcIjpcIsOPXCIsXCImRVRIXCI6XCLDkFwiLFwiJkVUSDtcIjpcIsOQXCIsXCImTnRpbGRlXCI6XCLDkVwiLFwiJk50aWxkZTtcIjpcIsORXCIsXCImT2dyYXZlXCI6XCLDklwiLFwiJk9ncmF2ZTtcIjpcIsOSXCIsXCImT2FjdXRlXCI6XCLDk1wiLFwiJk9hY3V0ZTtcIjpcIsOTXCIsXCImT2NpcmNcIjpcIsOUXCIsXCImT2NpcmM7XCI6XCLDlFwiLFwiJk90aWxkZVwiOlwiw5VcIixcIiZPdGlsZGU7XCI6XCLDlVwiLFwiJk91bWxcIjpcIsOWXCIsXCImT3VtbDtcIjpcIsOWXCIsXCImdGltZXNcIjpcIsOXXCIsXCImdGltZXM7XCI6XCLDl1wiLFwiJk9zbGFzaFwiOlwiw5hcIixcIiZPc2xhc2g7XCI6XCLDmFwiLFwiJlVncmF2ZVwiOlwiw5lcIixcIiZVZ3JhdmU7XCI6XCLDmVwiLFwiJlVhY3V0ZVwiOlwiw5pcIixcIiZVYWN1dGU7XCI6XCLDmlwiLFwiJlVjaXJjXCI6XCLDm1wiLFwiJlVjaXJjO1wiOlwiw5tcIixcIiZVdW1sXCI6XCLDnFwiLFwiJlV1bWw7XCI6XCLDnFwiLFwiJllhY3V0ZVwiOlwiw51cIixcIiZZYWN1dGU7XCI6XCLDnVwiLFwiJlRIT1JOXCI6XCLDnlwiLFwiJlRIT1JOO1wiOlwiw55cIixcIiZzemxpZ1wiOlwiw59cIixcIiZzemxpZztcIjpcIsOfXCIsXCImYWdyYXZlXCI6XCLDoFwiLFwiJmFncmF2ZTtcIjpcIsOgXCIsXCImYWFjdXRlXCI6XCLDoVwiLFwiJmFhY3V0ZTtcIjpcIsOhXCIsXCImYWNpcmNcIjpcIsOiXCIsXCImYWNpcmM7XCI6XCLDolwiLFwiJmF0aWxkZVwiOlwiw6NcIixcIiZhdGlsZGU7XCI6XCLDo1wiLFwiJmF1bWxcIjpcIsOkXCIsXCImYXVtbDtcIjpcIsOkXCIsXCImYXJpbmdcIjpcIsOlXCIsXCImYXJpbmc7XCI6XCLDpVwiLFwiJmFlbGlnXCI6XCLDplwiLFwiJmFlbGlnO1wiOlwiw6ZcIixcIiZjY2VkaWxcIjpcIsOnXCIsXCImY2NlZGlsO1wiOlwiw6dcIixcIiZlZ3JhdmVcIjpcIsOoXCIsXCImZWdyYXZlO1wiOlwiw6hcIixcIiZlYWN1dGVcIjpcIsOpXCIsXCImZWFjdXRlO1wiOlwiw6lcIixcIiZlY2lyY1wiOlwiw6pcIixcIiZlY2lyYztcIjpcIsOqXCIsXCImZXVtbFwiOlwiw6tcIixcIiZldW1sO1wiOlwiw6tcIixcIiZpZ3JhdmVcIjpcIsOsXCIsXCImaWdyYXZlO1wiOlwiw6xcIixcIiZpYWN1dGVcIjpcIsOtXCIsXCImaWFjdXRlO1wiOlwiw61cIixcIiZpY2lyY1wiOlwiw65cIixcIiZpY2lyYztcIjpcIsOuXCIsXCImaXVtbFwiOlwiw69cIixcIiZpdW1sO1wiOlwiw69cIixcIiZldGhcIjpcIsOwXCIsXCImZXRoO1wiOlwiw7BcIixcIiZudGlsZGVcIjpcIsOxXCIsXCImbnRpbGRlO1wiOlwiw7FcIixcIiZvZ3JhdmVcIjpcIsOyXCIsXCImb2dyYXZlO1wiOlwiw7JcIixcIiZvYWN1dGVcIjpcIsOzXCIsXCImb2FjdXRlO1wiOlwiw7NcIixcIiZvY2lyY1wiOlwiw7RcIixcIiZvY2lyYztcIjpcIsO0XCIsXCImb3RpbGRlXCI6XCLDtVwiLFwiJm90aWxkZTtcIjpcIsO1XCIsXCImb3VtbFwiOlwiw7ZcIixcIiZvdW1sO1wiOlwiw7ZcIixcIiZkaXZpZGVcIjpcIsO3XCIsXCImZGl2aWRlO1wiOlwiw7dcIixcIiZvc2xhc2hcIjpcIsO4XCIsXCImb3NsYXNoO1wiOlwiw7hcIixcIiZ1Z3JhdmVcIjpcIsO5XCIsXCImdWdyYXZlO1wiOlwiw7lcIixcIiZ1YWN1dGVcIjpcIsO6XCIsXCImdWFjdXRlO1wiOlwiw7pcIixcIiZ1Y2lyY1wiOlwiw7tcIixcIiZ1Y2lyYztcIjpcIsO7XCIsXCImdXVtbFwiOlwiw7xcIixcIiZ1dW1sO1wiOlwiw7xcIixcIiZ5YWN1dGVcIjpcIsO9XCIsXCImeWFjdXRlO1wiOlwiw71cIixcIiZ0aG9yblwiOlwiw75cIixcIiZ0aG9ybjtcIjpcIsO+XCIsXCImeXVtbFwiOlwiw79cIixcIiZ5dW1sO1wiOlwiw79cIixcIiZxdW90XCI6J1wiJyxcIiZxdW90O1wiOidcIicsXCImYW1wXCI6XCImXCIsXCImYW1wO1wiOlwiJlwiLFwiJmx0XCI6XCI8XCIsXCImbHQ7XCI6XCI8XCIsXCImZ3RcIjpcIj5cIixcIiZndDtcIjpcIj5cIixcIiZPRWxpZztcIjpcIsWSXCIsXCImb2VsaWc7XCI6XCLFk1wiLFwiJlNjYXJvbjtcIjpcIsWgXCIsXCImc2Nhcm9uO1wiOlwixaFcIixcIiZZdW1sO1wiOlwixbhcIixcIiZjaXJjO1wiOlwiy4ZcIixcIiZ0aWxkZTtcIjpcIsucXCIsXCImZW5zcDtcIjpcIuKAglwiLFwiJmVtc3A7XCI6XCLigINcIixcIiZ0aGluc3A7XCI6XCLigIlcIixcIiZ6d25qO1wiOlwi4oCMXCIsXCImendqO1wiOlwi4oCNXCIsXCImbHJtO1wiOlwi4oCOXCIsXCImcmxtO1wiOlwi4oCPXCIsXCImbmRhc2g7XCI6XCLigJNcIixcIiZtZGFzaDtcIjpcIuKAlFwiLFwiJmxzcXVvO1wiOlwi4oCYXCIsXCImcnNxdW87XCI6XCLigJlcIixcIiZzYnF1bztcIjpcIuKAmlwiLFwiJmxkcXVvO1wiOlwi4oCcXCIsXCImcmRxdW87XCI6XCLigJ1cIixcIiZiZHF1bztcIjpcIuKAnlwiLFwiJmRhZ2dlcjtcIjpcIuKAoFwiLFwiJkRhZ2dlcjtcIjpcIuKAoVwiLFwiJnBlcm1pbDtcIjpcIuKAsFwiLFwiJmxzYXF1bztcIjpcIuKAuVwiLFwiJnJzYXF1bztcIjpcIuKAulwiLFwiJmV1cm87XCI6XCLigqxcIixcIiZmbm9mO1wiOlwixpJcIixcIiZBbHBoYTtcIjpcIs6RXCIsXCImQmV0YTtcIjpcIs6SXCIsXCImR2FtbWE7XCI6XCLOk1wiLFwiJkRlbHRhO1wiOlwizpRcIixcIiZFcHNpbG9uO1wiOlwizpVcIixcIiZaZXRhO1wiOlwizpZcIixcIiZFdGE7XCI6XCLOl1wiLFwiJlRoZXRhO1wiOlwizphcIixcIiZJb3RhO1wiOlwizplcIixcIiZLYXBwYTtcIjpcIs6aXCIsXCImTGFtYmRhO1wiOlwizptcIixcIiZNdTtcIjpcIs6cXCIsXCImTnU7XCI6XCLOnVwiLFwiJlhpO1wiOlwizp5cIixcIiZPbWljcm9uO1wiOlwizp9cIixcIiZQaTtcIjpcIs6gXCIsXCImUmhvO1wiOlwizqFcIixcIiZTaWdtYTtcIjpcIs6jXCIsXCImVGF1O1wiOlwizqRcIixcIiZVcHNpbG9uO1wiOlwizqVcIixcIiZQaGk7XCI6XCLOplwiLFwiJkNoaTtcIjpcIs6nXCIsXCImUHNpO1wiOlwizqhcIixcIiZPbWVnYTtcIjpcIs6pXCIsXCImYWxwaGE7XCI6XCLOsVwiLFwiJmJldGE7XCI6XCLOslwiLFwiJmdhbW1hO1wiOlwizrNcIixcIiZkZWx0YTtcIjpcIs60XCIsXCImZXBzaWxvbjtcIjpcIs61XCIsXCImemV0YTtcIjpcIs62XCIsXCImZXRhO1wiOlwizrdcIixcIiZ0aGV0YTtcIjpcIs64XCIsXCImaW90YTtcIjpcIs65XCIsXCIma2FwcGE7XCI6XCLOulwiLFwiJmxhbWJkYTtcIjpcIs67XCIsXCImbXU7XCI6XCLOvFwiLFwiJm51O1wiOlwizr1cIixcIiZ4aTtcIjpcIs6+XCIsXCImb21pY3JvbjtcIjpcIs6/XCIsXCImcGk7XCI6XCLPgFwiLFwiJnJobztcIjpcIs+BXCIsXCImc2lnbWFmO1wiOlwiz4JcIixcIiZzaWdtYTtcIjpcIs+DXCIsXCImdGF1O1wiOlwiz4RcIixcIiZ1cHNpbG9uO1wiOlwiz4VcIixcIiZwaGk7XCI6XCLPhlwiLFwiJmNoaTtcIjpcIs+HXCIsXCImcHNpO1wiOlwiz4hcIixcIiZvbWVnYTtcIjpcIs+JXCIsXCImdGhldGFzeW07XCI6XCLPkVwiLFwiJnVwc2loO1wiOlwiz5JcIixcIiZwaXY7XCI6XCLPllwiLFwiJmJ1bGw7XCI6XCLigKJcIixcIiZoZWxsaXA7XCI6XCLigKZcIixcIiZwcmltZTtcIjpcIuKAslwiLFwiJlByaW1lO1wiOlwi4oCzXCIsXCImb2xpbmU7XCI6XCLigL5cIixcIiZmcmFzbDtcIjpcIuKBhFwiLFwiJndlaWVycDtcIjpcIuKEmFwiLFwiJmltYWdlO1wiOlwi4oSRXCIsXCImcmVhbDtcIjpcIuKEnFwiLFwiJnRyYWRlO1wiOlwi4oSiXCIsXCImYWxlZnN5bTtcIjpcIuKEtVwiLFwiJmxhcnI7XCI6XCLihpBcIixcIiZ1YXJyO1wiOlwi4oaRXCIsXCImcmFycjtcIjpcIuKGklwiLFwiJmRhcnI7XCI6XCLihpNcIixcIiZoYXJyO1wiOlwi4oaUXCIsXCImY3JhcnI7XCI6XCLihrVcIixcIiZsQXJyO1wiOlwi4oeQXCIsXCImdUFycjtcIjpcIuKHkVwiLFwiJnJBcnI7XCI6XCLih5JcIixcIiZkQXJyO1wiOlwi4oeTXCIsXCImaEFycjtcIjpcIuKHlFwiLFwiJmZvcmFsbDtcIjpcIuKIgFwiLFwiJnBhcnQ7XCI6XCLiiIJcIixcIiZleGlzdDtcIjpcIuKIg1wiLFwiJmVtcHR5O1wiOlwi4oiFXCIsXCImbmFibGE7XCI6XCLiiIdcIixcIiZpc2luO1wiOlwi4oiIXCIsXCImbm90aW47XCI6XCLiiIlcIixcIiZuaTtcIjpcIuKIi1wiLFwiJnByb2Q7XCI6XCLiiI9cIixcIiZzdW07XCI6XCLiiJFcIixcIiZtaW51cztcIjpcIuKIklwiLFwiJmxvd2FzdDtcIjpcIuKIl1wiLFwiJnJhZGljO1wiOlwi4oiaXCIsXCImcHJvcDtcIjpcIuKInVwiLFwiJmluZmluO1wiOlwi4oieXCIsXCImYW5nO1wiOlwi4oigXCIsXCImYW5kO1wiOlwi4oinXCIsXCImb3I7XCI6XCLiiKhcIixcIiZjYXA7XCI6XCLiiKlcIixcIiZjdXA7XCI6XCLiiKpcIixcIiZpbnQ7XCI6XCLiiKtcIixcIiZ0aGVyZTQ7XCI6XCLiiLRcIixcIiZzaW07XCI6XCLiiLxcIixcIiZjb25nO1wiOlwi4omFXCIsXCImYXN5bXA7XCI6XCLiiYhcIixcIiZuZTtcIjpcIuKJoFwiLFwiJmVxdWl2O1wiOlwi4omhXCIsXCImbGU7XCI6XCLiiaRcIixcIiZnZTtcIjpcIuKJpVwiLFwiJnN1YjtcIjpcIuKKglwiLFwiJnN1cDtcIjpcIuKKg1wiLFwiJm5zdWI7XCI6XCLiioRcIixcIiZzdWJlO1wiOlwi4oqGXCIsXCImc3VwZTtcIjpcIuKKh1wiLFwiJm9wbHVzO1wiOlwi4oqVXCIsXCImb3RpbWVzO1wiOlwi4oqXXCIsXCImcGVycDtcIjpcIuKKpVwiLFwiJnNkb3Q7XCI6XCLii4VcIixcIiZsY2VpbDtcIjpcIuKMiFwiLFwiJnJjZWlsO1wiOlwi4oyJXCIsXCImbGZsb29yO1wiOlwi4oyKXCIsXCImcmZsb29yO1wiOlwi4oyLXCIsXCImbGFuZztcIjpcIuKMqVwiLFwiJnJhbmc7XCI6XCLijKpcIixcIiZsb3o7XCI6XCLil4pcIixcIiZzcGFkZXM7XCI6XCLimaBcIixcIiZjbHVicztcIjpcIuKZo1wiLFwiJmhlYXJ0cztcIjpcIuKZpVwiLFwiJmRpYW1zO1wiOlwi4pmmXCJ9LGNoYXJhY3RlcnM6e1wiJ1wiOlwiJmFwb3M7XCIsXCLCoFwiOlwiJm5ic3A7XCIsXCLCoVwiOlwiJmlleGNsO1wiLFwiwqJcIjpcIiZjZW50O1wiLFwiwqNcIjpcIiZwb3VuZDtcIixcIsKkXCI6XCImY3VycmVuO1wiLFwiwqVcIjpcIiZ5ZW47XCIsXCLCplwiOlwiJmJydmJhcjtcIixcIsKnXCI6XCImc2VjdDtcIixcIsKoXCI6XCImdW1sO1wiLFwiwqlcIjpcIiZjb3B5O1wiLFwiwqpcIjpcIiZvcmRmO1wiLFwiwqtcIjpcIiZsYXF1bztcIixcIsKsXCI6XCImbm90O1wiLFwiwq1cIjpcIiZzaHk7XCIsXCLCrlwiOlwiJnJlZztcIixcIsKvXCI6XCImbWFjcjtcIixcIsKwXCI6XCImZGVnO1wiLFwiwrFcIjpcIiZwbHVzbW47XCIsXCLCslwiOlwiJnN1cDI7XCIsXCLCs1wiOlwiJnN1cDM7XCIsXCLCtFwiOlwiJmFjdXRlO1wiLFwiwrVcIjpcIiZtaWNybztcIixcIsK2XCI6XCImcGFyYTtcIixcIsK3XCI6XCImbWlkZG90O1wiLFwiwrhcIjpcIiZjZWRpbDtcIixcIsK5XCI6XCImc3VwMTtcIixcIsK6XCI6XCImb3JkbTtcIixcIsK7XCI6XCImcmFxdW87XCIsXCLCvFwiOlwiJmZyYWMxNDtcIixcIsK9XCI6XCImZnJhYzEyO1wiLFwiwr5cIjpcIiZmcmFjMzQ7XCIsXCLCv1wiOlwiJmlxdWVzdDtcIixcIsOAXCI6XCImQWdyYXZlO1wiLFwiw4FcIjpcIiZBYWN1dGU7XCIsXCLDglwiOlwiJkFjaXJjO1wiLFwiw4NcIjpcIiZBdGlsZGU7XCIsXCLDhFwiOlwiJkF1bWw7XCIsXCLDhVwiOlwiJkFyaW5nO1wiLFwiw4ZcIjpcIiZBRWxpZztcIixcIsOHXCI6XCImQ2NlZGlsO1wiLFwiw4hcIjpcIiZFZ3JhdmU7XCIsXCLDiVwiOlwiJkVhY3V0ZTtcIixcIsOKXCI6XCImRWNpcmM7XCIsXCLDi1wiOlwiJkV1bWw7XCIsXCLDjFwiOlwiJklncmF2ZTtcIixcIsONXCI6XCImSWFjdXRlO1wiLFwiw45cIjpcIiZJY2lyYztcIixcIsOPXCI6XCImSXVtbDtcIixcIsOQXCI6XCImRVRIO1wiLFwiw5FcIjpcIiZOdGlsZGU7XCIsXCLDklwiOlwiJk9ncmF2ZTtcIixcIsOTXCI6XCImT2FjdXRlO1wiLFwiw5RcIjpcIiZPY2lyYztcIixcIsOVXCI6XCImT3RpbGRlO1wiLFwiw5ZcIjpcIiZPdW1sO1wiLFwiw5dcIjpcIiZ0aW1lcztcIixcIsOYXCI6XCImT3NsYXNoO1wiLFwiw5lcIjpcIiZVZ3JhdmU7XCIsXCLDmlwiOlwiJlVhY3V0ZTtcIixcIsObXCI6XCImVWNpcmM7XCIsXCLDnFwiOlwiJlV1bWw7XCIsXCLDnVwiOlwiJllhY3V0ZTtcIixcIsOeXCI6XCImVEhPUk47XCIsXCLDn1wiOlwiJnN6bGlnO1wiLFwiw6BcIjpcIiZhZ3JhdmU7XCIsXCLDoVwiOlwiJmFhY3V0ZTtcIixcIsOiXCI6XCImYWNpcmM7XCIsXCLDo1wiOlwiJmF0aWxkZTtcIixcIsOkXCI6XCImYXVtbDtcIixcIsOlXCI6XCImYXJpbmc7XCIsXCLDplwiOlwiJmFlbGlnO1wiLFwiw6dcIjpcIiZjY2VkaWw7XCIsXCLDqFwiOlwiJmVncmF2ZTtcIixcIsOpXCI6XCImZWFjdXRlO1wiLFwiw6pcIjpcIiZlY2lyYztcIixcIsOrXCI6XCImZXVtbDtcIixcIsOsXCI6XCImaWdyYXZlO1wiLFwiw61cIjpcIiZpYWN1dGU7XCIsXCLDrlwiOlwiJmljaXJjO1wiLFwiw69cIjpcIiZpdW1sO1wiLFwiw7BcIjpcIiZldGg7XCIsXCLDsVwiOlwiJm50aWxkZTtcIixcIsOyXCI6XCImb2dyYXZlO1wiLFwiw7NcIjpcIiZvYWN1dGU7XCIsXCLDtFwiOlwiJm9jaXJjO1wiLFwiw7VcIjpcIiZvdGlsZGU7XCIsXCLDtlwiOlwiJm91bWw7XCIsXCLDt1wiOlwiJmRpdmlkZTtcIixcIsO4XCI6XCImb3NsYXNoO1wiLFwiw7lcIjpcIiZ1Z3JhdmU7XCIsXCLDulwiOlwiJnVhY3V0ZTtcIixcIsO7XCI6XCImdWNpcmM7XCIsXCLDvFwiOlwiJnV1bWw7XCIsXCLDvVwiOlwiJnlhY3V0ZTtcIixcIsO+XCI6XCImdGhvcm47XCIsXCLDv1wiOlwiJnl1bWw7XCIsJ1wiJzpcIiZxdW90O1wiLFwiJlwiOlwiJmFtcDtcIixcIjxcIjpcIiZsdDtcIixcIj5cIjpcIiZndDtcIixcIsWSXCI6XCImT0VsaWc7XCIsXCLFk1wiOlwiJm9lbGlnO1wiLFwixaBcIjpcIiZTY2Fyb247XCIsXCLFoVwiOlwiJnNjYXJvbjtcIixcIsW4XCI6XCImWXVtbDtcIixcIsuGXCI6XCImY2lyYztcIixcIsucXCI6XCImdGlsZGU7XCIsXCLigIJcIjpcIiZlbnNwO1wiLFwi4oCDXCI6XCImZW1zcDtcIixcIuKAiVwiOlwiJnRoaW5zcDtcIixcIuKAjFwiOlwiJnp3bmo7XCIsXCLigI1cIjpcIiZ6d2o7XCIsXCLigI5cIjpcIiZscm07XCIsXCLigI9cIjpcIiZybG07XCIsXCLigJNcIjpcIiZuZGFzaDtcIixcIuKAlFwiOlwiJm1kYXNoO1wiLFwi4oCYXCI6XCImbHNxdW87XCIsXCLigJlcIjpcIiZyc3F1bztcIixcIuKAmlwiOlwiJnNicXVvO1wiLFwi4oCcXCI6XCImbGRxdW87XCIsXCLigJ1cIjpcIiZyZHF1bztcIixcIuKAnlwiOlwiJmJkcXVvO1wiLFwi4oCgXCI6XCImZGFnZ2VyO1wiLFwi4oChXCI6XCImRGFnZ2VyO1wiLFwi4oCwXCI6XCImcGVybWlsO1wiLFwi4oC5XCI6XCImbHNhcXVvO1wiLFwi4oC6XCI6XCImcnNhcXVvO1wiLFwi4oKsXCI6XCImZXVybztcIixcIsaSXCI6XCImZm5vZjtcIixcIs6RXCI6XCImQWxwaGE7XCIsXCLOklwiOlwiJkJldGE7XCIsXCLOk1wiOlwiJkdhbW1hO1wiLFwizpRcIjpcIiZEZWx0YTtcIixcIs6VXCI6XCImRXBzaWxvbjtcIixcIs6WXCI6XCImWmV0YTtcIixcIs6XXCI6XCImRXRhO1wiLFwizphcIjpcIiZUaGV0YTtcIixcIs6ZXCI6XCImSW90YTtcIixcIs6aXCI6XCImS2FwcGE7XCIsXCLOm1wiOlwiJkxhbWJkYTtcIixcIs6cXCI6XCImTXU7XCIsXCLOnVwiOlwiJk51O1wiLFwizp5cIjpcIiZYaTtcIixcIs6fXCI6XCImT21pY3JvbjtcIixcIs6gXCI6XCImUGk7XCIsXCLOoVwiOlwiJlJobztcIixcIs6jXCI6XCImU2lnbWE7XCIsXCLOpFwiOlwiJlRhdTtcIixcIs6lXCI6XCImVXBzaWxvbjtcIixcIs6mXCI6XCImUGhpO1wiLFwizqdcIjpcIiZDaGk7XCIsXCLOqFwiOlwiJlBzaTtcIixcIs6pXCI6XCImT21lZ2E7XCIsXCLOsVwiOlwiJmFscGhhO1wiLFwizrJcIjpcIiZiZXRhO1wiLFwizrNcIjpcIiZnYW1tYTtcIixcIs60XCI6XCImZGVsdGE7XCIsXCLOtVwiOlwiJmVwc2lsb247XCIsXCLOtlwiOlwiJnpldGE7XCIsXCLOt1wiOlwiJmV0YTtcIixcIs64XCI6XCImdGhldGE7XCIsXCLOuVwiOlwiJmlvdGE7XCIsXCLOulwiOlwiJmthcHBhO1wiLFwizrtcIjpcIiZsYW1iZGE7XCIsXCLOvFwiOlwiJm11O1wiLFwizr1cIjpcIiZudTtcIixcIs6+XCI6XCImeGk7XCIsXCLOv1wiOlwiJm9taWNyb247XCIsXCLPgFwiOlwiJnBpO1wiLFwiz4FcIjpcIiZyaG87XCIsXCLPglwiOlwiJnNpZ21hZjtcIixcIs+DXCI6XCImc2lnbWE7XCIsXCLPhFwiOlwiJnRhdTtcIixcIs+FXCI6XCImdXBzaWxvbjtcIixcIs+GXCI6XCImcGhpO1wiLFwiz4dcIjpcIiZjaGk7XCIsXCLPiFwiOlwiJnBzaTtcIixcIs+JXCI6XCImb21lZ2E7XCIsXCLPkVwiOlwiJnRoZXRhc3ltO1wiLFwiz5JcIjpcIiZ1cHNpaDtcIixcIs+WXCI6XCImcGl2O1wiLFwi4oCiXCI6XCImYnVsbDtcIixcIuKAplwiOlwiJmhlbGxpcDtcIixcIuKAslwiOlwiJnByaW1lO1wiLFwi4oCzXCI6XCImUHJpbWU7XCIsXCLigL5cIjpcIiZvbGluZTtcIixcIuKBhFwiOlwiJmZyYXNsO1wiLFwi4oSYXCI6XCImd2VpZXJwO1wiLFwi4oSRXCI6XCImaW1hZ2U7XCIsXCLihJxcIjpcIiZyZWFsO1wiLFwi4oSiXCI6XCImdHJhZGU7XCIsXCLihLVcIjpcIiZhbGVmc3ltO1wiLFwi4oaQXCI6XCImbGFycjtcIixcIuKGkVwiOlwiJnVhcnI7XCIsXCLihpJcIjpcIiZyYXJyO1wiLFwi4oaTXCI6XCImZGFycjtcIixcIuKGlFwiOlwiJmhhcnI7XCIsXCLihrVcIjpcIiZjcmFycjtcIixcIuKHkFwiOlwiJmxBcnI7XCIsXCLih5FcIjpcIiZ1QXJyO1wiLFwi4oeSXCI6XCImckFycjtcIixcIuKHk1wiOlwiJmRBcnI7XCIsXCLih5RcIjpcIiZoQXJyO1wiLFwi4oiAXCI6XCImZm9yYWxsO1wiLFwi4oiCXCI6XCImcGFydDtcIixcIuKIg1wiOlwiJmV4aXN0O1wiLFwi4oiFXCI6XCImZW1wdHk7XCIsXCLiiIdcIjpcIiZuYWJsYTtcIixcIuKIiFwiOlwiJmlzaW47XCIsXCLiiIlcIjpcIiZub3RpbjtcIixcIuKIi1wiOlwiJm5pO1wiLFwi4oiPXCI6XCImcHJvZDtcIixcIuKIkVwiOlwiJnN1bTtcIixcIuKIklwiOlwiJm1pbnVzO1wiLFwi4oiXXCI6XCImbG93YXN0O1wiLFwi4oiaXCI6XCImcmFkaWM7XCIsXCLiiJ1cIjpcIiZwcm9wO1wiLFwi4oieXCI6XCImaW5maW47XCIsXCLiiKBcIjpcIiZhbmc7XCIsXCLiiKdcIjpcIiZhbmQ7XCIsXCLiiKhcIjpcIiZvcjtcIixcIuKIqVwiOlwiJmNhcDtcIixcIuKIqlwiOlwiJmN1cDtcIixcIuKIq1wiOlwiJmludDtcIixcIuKItFwiOlwiJnRoZXJlNDtcIixcIuKIvFwiOlwiJnNpbTtcIixcIuKJhVwiOlwiJmNvbmc7XCIsXCLiiYhcIjpcIiZhc3ltcDtcIixcIuKJoFwiOlwiJm5lO1wiLFwi4omhXCI6XCImZXF1aXY7XCIsXCLiiaRcIjpcIiZsZTtcIixcIuKJpVwiOlwiJmdlO1wiLFwi4oqCXCI6XCImc3ViO1wiLFwi4oqDXCI6XCImc3VwO1wiLFwi4oqEXCI6XCImbnN1YjtcIixcIuKKhlwiOlwiJnN1YmU7XCIsXCLiiodcIjpcIiZzdXBlO1wiLFwi4oqVXCI6XCImb3BsdXM7XCIsXCLiipdcIjpcIiZvdGltZXM7XCIsXCLiiqVcIjpcIiZwZXJwO1wiLFwi4ouFXCI6XCImc2RvdDtcIixcIuKMiFwiOlwiJmxjZWlsO1wiLFwi4oyJXCI6XCImcmNlaWw7XCIsXCLijIpcIjpcIiZsZmxvb3I7XCIsXCLijItcIjpcIiZyZmxvb3I7XCIsXCLijKlcIjpcIiZsYW5nO1wiLFwi4oyqXCI6XCImcmFuZztcIixcIuKXilwiOlwiJmxvejtcIixcIuKZoFwiOlwiJnNwYWRlcztcIixcIuKZo1wiOlwiJmNsdWJzO1wiLFwi4pmlXCI6XCImaGVhcnRzO1wiLFwi4pmmXCI6XCImZGlhbXM7XCJ9fSxodG1sNTp7ZW50aXRpZXM6e1wiJkFFbGlnXCI6XCLDhlwiLFwiJkFFbGlnO1wiOlwiw4ZcIixcIiZBTVBcIjpcIiZcIixcIiZBTVA7XCI6XCImXCIsXCImQWFjdXRlXCI6XCLDgVwiLFwiJkFhY3V0ZTtcIjpcIsOBXCIsXCImQWJyZXZlO1wiOlwixIJcIixcIiZBY2lyY1wiOlwiw4JcIixcIiZBY2lyYztcIjpcIsOCXCIsXCImQWN5O1wiOlwi0JBcIixcIiZBZnI7XCI6XCLwnZSEXCIsXCImQWdyYXZlXCI6XCLDgFwiLFwiJkFncmF2ZTtcIjpcIsOAXCIsXCImQWxwaGE7XCI6XCLOkVwiLFwiJkFtYWNyO1wiOlwixIBcIixcIiZBbmQ7XCI6XCLiqZNcIixcIiZBb2dvbjtcIjpcIsSEXCIsXCImQW9wZjtcIjpcIvCdlLhcIixcIiZBcHBseUZ1bmN0aW9uO1wiOlwi4oGhXCIsXCImQXJpbmdcIjpcIsOFXCIsXCImQXJpbmc7XCI6XCLDhVwiLFwiJkFzY3I7XCI6XCLwnZKcXCIsXCImQXNzaWduO1wiOlwi4omUXCIsXCImQXRpbGRlXCI6XCLDg1wiLFwiJkF0aWxkZTtcIjpcIsODXCIsXCImQXVtbFwiOlwiw4RcIixcIiZBdW1sO1wiOlwiw4RcIixcIiZCYWNrc2xhc2g7XCI6XCLiiJZcIixcIiZCYXJ2O1wiOlwi4qunXCIsXCImQmFyd2VkO1wiOlwi4oyGXCIsXCImQmN5O1wiOlwi0JFcIixcIiZCZWNhdXNlO1wiOlwi4oi1XCIsXCImQmVybm91bGxpcztcIjpcIuKErFwiLFwiJkJldGE7XCI6XCLOklwiLFwiJkJmcjtcIjpcIvCdlIVcIixcIiZCb3BmO1wiOlwi8J2UuVwiLFwiJkJyZXZlO1wiOlwiy5hcIixcIiZCc2NyO1wiOlwi4oSsXCIsXCImQnVtcGVxO1wiOlwi4omOXCIsXCImQ0hjeTtcIjpcItCnXCIsXCImQ09QWVwiOlwiwqlcIixcIiZDT1BZO1wiOlwiwqlcIixcIiZDYWN1dGU7XCI6XCLEhlwiLFwiJkNhcDtcIjpcIuKLklwiLFwiJkNhcGl0YWxEaWZmZXJlbnRpYWxEO1wiOlwi4oWFXCIsXCImQ2F5bGV5cztcIjpcIuKErVwiLFwiJkNjYXJvbjtcIjpcIsSMXCIsXCImQ2NlZGlsXCI6XCLDh1wiLFwiJkNjZWRpbDtcIjpcIsOHXCIsXCImQ2NpcmM7XCI6XCLEiFwiLFwiJkNjb25pbnQ7XCI6XCLiiLBcIixcIiZDZG90O1wiOlwixIpcIixcIiZDZWRpbGxhO1wiOlwiwrhcIixcIiZDZW50ZXJEb3Q7XCI6XCLCt1wiLFwiJkNmcjtcIjpcIuKErVwiLFwiJkNoaTtcIjpcIs6nXCIsXCImQ2lyY2xlRG90O1wiOlwi4oqZXCIsXCImQ2lyY2xlTWludXM7XCI6XCLiipZcIixcIiZDaXJjbGVQbHVzO1wiOlwi4oqVXCIsXCImQ2lyY2xlVGltZXM7XCI6XCLiipdcIixcIiZDbG9ja3dpc2VDb250b3VySW50ZWdyYWw7XCI6XCLiiLJcIixcIiZDbG9zZUN1cmx5RG91YmxlUXVvdGU7XCI6XCLigJ1cIixcIiZDbG9zZUN1cmx5UXVvdGU7XCI6XCLigJlcIixcIiZDb2xvbjtcIjpcIuKIt1wiLFwiJkNvbG9uZTtcIjpcIuKptFwiLFwiJkNvbmdydWVudDtcIjpcIuKJoVwiLFwiJkNvbmludDtcIjpcIuKIr1wiLFwiJkNvbnRvdXJJbnRlZ3JhbDtcIjpcIuKIrlwiLFwiJkNvcGY7XCI6XCLihIJcIixcIiZDb3Byb2R1Y3Q7XCI6XCLiiJBcIixcIiZDb3VudGVyQ2xvY2t3aXNlQ29udG91ckludGVncmFsO1wiOlwi4oizXCIsXCImQ3Jvc3M7XCI6XCLiqK9cIixcIiZDc2NyO1wiOlwi8J2SnlwiLFwiJkN1cDtcIjpcIuKLk1wiLFwiJkN1cENhcDtcIjpcIuKJjVwiLFwiJkREO1wiOlwi4oWFXCIsXCImRERvdHJhaGQ7XCI6XCLipJFcIixcIiZESmN5O1wiOlwi0IJcIixcIiZEU2N5O1wiOlwi0IVcIixcIiZEWmN5O1wiOlwi0I9cIixcIiZEYWdnZXI7XCI6XCLigKFcIixcIiZEYXJyO1wiOlwi4oahXCIsXCImRGFzaHY7XCI6XCLiq6RcIixcIiZEY2Fyb247XCI6XCLEjlwiLFwiJkRjeTtcIjpcItCUXCIsXCImRGVsO1wiOlwi4oiHXCIsXCImRGVsdGE7XCI6XCLOlFwiLFwiJkRmcjtcIjpcIvCdlIdcIixcIiZEaWFjcml0aWNhbEFjdXRlO1wiOlwiwrRcIixcIiZEaWFjcml0aWNhbERvdDtcIjpcIsuZXCIsXCImRGlhY3JpdGljYWxEb3VibGVBY3V0ZTtcIjpcIsudXCIsXCImRGlhY3JpdGljYWxHcmF2ZTtcIjpcImBcIixcIiZEaWFjcml0aWNhbFRpbGRlO1wiOlwiy5xcIixcIiZEaWFtb25kO1wiOlwi4ouEXCIsXCImRGlmZmVyZW50aWFsRDtcIjpcIuKFhlwiLFwiJkRvcGY7XCI6XCLwnZS7XCIsXCImRG90O1wiOlwiwqhcIixcIiZEb3REb3Q7XCI6XCLig5xcIixcIiZEb3RFcXVhbDtcIjpcIuKJkFwiLFwiJkRvdWJsZUNvbnRvdXJJbnRlZ3JhbDtcIjpcIuKIr1wiLFwiJkRvdWJsZURvdDtcIjpcIsKoXCIsXCImRG91YmxlRG93bkFycm93O1wiOlwi4oeTXCIsXCImRG91YmxlTGVmdEFycm93O1wiOlwi4oeQXCIsXCImRG91YmxlTGVmdFJpZ2h0QXJyb3c7XCI6XCLih5RcIixcIiZEb3VibGVMZWZ0VGVlO1wiOlwi4qukXCIsXCImRG91YmxlTG9uZ0xlZnRBcnJvdztcIjpcIuKfuFwiLFwiJkRvdWJsZUxvbmdMZWZ0UmlnaHRBcnJvdztcIjpcIuKfulwiLFwiJkRvdWJsZUxvbmdSaWdodEFycm93O1wiOlwi4p+5XCIsXCImRG91YmxlUmlnaHRBcnJvdztcIjpcIuKHklwiLFwiJkRvdWJsZVJpZ2h0VGVlO1wiOlwi4oqoXCIsXCImRG91YmxlVXBBcnJvdztcIjpcIuKHkVwiLFwiJkRvdWJsZVVwRG93bkFycm93O1wiOlwi4oeVXCIsXCImRG91YmxlVmVydGljYWxCYXI7XCI6XCLiiKVcIixcIiZEb3duQXJyb3c7XCI6XCLihpNcIixcIiZEb3duQXJyb3dCYXI7XCI6XCLipJNcIixcIiZEb3duQXJyb3dVcEFycm93O1wiOlwi4oe1XCIsXCImRG93bkJyZXZlO1wiOlwizJFcIixcIiZEb3duTGVmdFJpZ2h0VmVjdG9yO1wiOlwi4qWQXCIsXCImRG93bkxlZnRUZWVWZWN0b3I7XCI6XCLipZ5cIixcIiZEb3duTGVmdFZlY3RvcjtcIjpcIuKGvVwiLFwiJkRvd25MZWZ0VmVjdG9yQmFyO1wiOlwi4qWWXCIsXCImRG93blJpZ2h0VGVlVmVjdG9yO1wiOlwi4qWfXCIsXCImRG93blJpZ2h0VmVjdG9yO1wiOlwi4oeBXCIsXCImRG93blJpZ2h0VmVjdG9yQmFyO1wiOlwi4qWXXCIsXCImRG93blRlZTtcIjpcIuKKpFwiLFwiJkRvd25UZWVBcnJvdztcIjpcIuKGp1wiLFwiJkRvd25hcnJvdztcIjpcIuKHk1wiLFwiJkRzY3I7XCI6XCLwnZKfXCIsXCImRHN0cm9rO1wiOlwixJBcIixcIiZFTkc7XCI6XCLFilwiLFwiJkVUSFwiOlwiw5BcIixcIiZFVEg7XCI6XCLDkFwiLFwiJkVhY3V0ZVwiOlwiw4lcIixcIiZFYWN1dGU7XCI6XCLDiVwiLFwiJkVjYXJvbjtcIjpcIsSaXCIsXCImRWNpcmNcIjpcIsOKXCIsXCImRWNpcmM7XCI6XCLDilwiLFwiJkVjeTtcIjpcItCtXCIsXCImRWRvdDtcIjpcIsSWXCIsXCImRWZyO1wiOlwi8J2UiFwiLFwiJkVncmF2ZVwiOlwiw4hcIixcIiZFZ3JhdmU7XCI6XCLDiFwiLFwiJkVsZW1lbnQ7XCI6XCLiiIhcIixcIiZFbWFjcjtcIjpcIsSSXCIsXCImRW1wdHlTbWFsbFNxdWFyZTtcIjpcIuKXu1wiLFwiJkVtcHR5VmVyeVNtYWxsU3F1YXJlO1wiOlwi4parXCIsXCImRW9nb247XCI6XCLEmFwiLFwiJkVvcGY7XCI6XCLwnZS8XCIsXCImRXBzaWxvbjtcIjpcIs6VXCIsXCImRXF1YWw7XCI6XCLiqbVcIixcIiZFcXVhbFRpbGRlO1wiOlwi4omCXCIsXCImRXF1aWxpYnJpdW07XCI6XCLih4xcIixcIiZFc2NyO1wiOlwi4oSwXCIsXCImRXNpbTtcIjpcIuKps1wiLFwiJkV0YTtcIjpcIs6XXCIsXCImRXVtbFwiOlwiw4tcIixcIiZFdW1sO1wiOlwiw4tcIixcIiZFeGlzdHM7XCI6XCLiiINcIixcIiZFeHBvbmVudGlhbEU7XCI6XCLihYdcIixcIiZGY3k7XCI6XCLQpFwiLFwiJkZmcjtcIjpcIvCdlIlcIixcIiZGaWxsZWRTbWFsbFNxdWFyZTtcIjpcIuKXvFwiLFwiJkZpbGxlZFZlcnlTbWFsbFNxdWFyZTtcIjpcIuKWqlwiLFwiJkZvcGY7XCI6XCLwnZS9XCIsXCImRm9yQWxsO1wiOlwi4oiAXCIsXCImRm91cmllcnRyZjtcIjpcIuKEsVwiLFwiJkZzY3I7XCI6XCLihLFcIixcIiZHSmN5O1wiOlwi0INcIixcIiZHVFwiOlwiPlwiLFwiJkdUO1wiOlwiPlwiLFwiJkdhbW1hO1wiOlwizpNcIixcIiZHYW1tYWQ7XCI6XCLPnFwiLFwiJkdicmV2ZTtcIjpcIsSeXCIsXCImR2NlZGlsO1wiOlwixKJcIixcIiZHY2lyYztcIjpcIsScXCIsXCImR2N5O1wiOlwi0JNcIixcIiZHZG90O1wiOlwixKBcIixcIiZHZnI7XCI6XCLwnZSKXCIsXCImR2c7XCI6XCLii5lcIixcIiZHb3BmO1wiOlwi8J2UvlwiLFwiJkdyZWF0ZXJFcXVhbDtcIjpcIuKJpVwiLFwiJkdyZWF0ZXJFcXVhbExlc3M7XCI6XCLii5tcIixcIiZHcmVhdGVyRnVsbEVxdWFsO1wiOlwi4omnXCIsXCImR3JlYXRlckdyZWF0ZXI7XCI6XCLiqqJcIixcIiZHcmVhdGVyTGVzcztcIjpcIuKJt1wiLFwiJkdyZWF0ZXJTbGFudEVxdWFsO1wiOlwi4qm+XCIsXCImR3JlYXRlclRpbGRlO1wiOlwi4omzXCIsXCImR3NjcjtcIjpcIvCdkqJcIixcIiZHdDtcIjpcIuKJq1wiLFwiJkhBUkRjeTtcIjpcItCqXCIsXCImSGFjZWs7XCI6XCLLh1wiLFwiJkhhdDtcIjpcIl5cIixcIiZIY2lyYztcIjpcIsSkXCIsXCImSGZyO1wiOlwi4oSMXCIsXCImSGlsYmVydFNwYWNlO1wiOlwi4oSLXCIsXCImSG9wZjtcIjpcIuKEjVwiLFwiJkhvcml6b250YWxMaW5lO1wiOlwi4pSAXCIsXCImSHNjcjtcIjpcIuKEi1wiLFwiJkhzdHJvaztcIjpcIsSmXCIsXCImSHVtcERvd25IdW1wO1wiOlwi4omOXCIsXCImSHVtcEVxdWFsO1wiOlwi4omPXCIsXCImSUVjeTtcIjpcItCVXCIsXCImSUpsaWc7XCI6XCLEslwiLFwiJklPY3k7XCI6XCLQgVwiLFwiJklhY3V0ZVwiOlwiw41cIixcIiZJYWN1dGU7XCI6XCLDjVwiLFwiJkljaXJjXCI6XCLDjlwiLFwiJkljaXJjO1wiOlwiw45cIixcIiZJY3k7XCI6XCLQmFwiLFwiJklkb3Q7XCI6XCLEsFwiLFwiJklmcjtcIjpcIuKEkVwiLFwiJklncmF2ZVwiOlwiw4xcIixcIiZJZ3JhdmU7XCI6XCLDjFwiLFwiJkltO1wiOlwi4oSRXCIsXCImSW1hY3I7XCI6XCLEqlwiLFwiJkltYWdpbmFyeUk7XCI6XCLihYhcIixcIiZJbXBsaWVzO1wiOlwi4oeSXCIsXCImSW50O1wiOlwi4oisXCIsXCImSW50ZWdyYWw7XCI6XCLiiKtcIixcIiZJbnRlcnNlY3Rpb247XCI6XCLii4JcIixcIiZJbnZpc2libGVDb21tYTtcIjpcIuKBo1wiLFwiJkludmlzaWJsZVRpbWVzO1wiOlwi4oGiXCIsXCImSW9nb247XCI6XCLErlwiLFwiJklvcGY7XCI6XCLwnZWAXCIsXCImSW90YTtcIjpcIs6ZXCIsXCImSXNjcjtcIjpcIuKEkFwiLFwiJkl0aWxkZTtcIjpcIsSoXCIsXCImSXVrY3k7XCI6XCLQhlwiLFwiJkl1bWxcIjpcIsOPXCIsXCImSXVtbDtcIjpcIsOPXCIsXCImSmNpcmM7XCI6XCLEtFwiLFwiJkpjeTtcIjpcItCZXCIsXCImSmZyO1wiOlwi8J2UjVwiLFwiJkpvcGY7XCI6XCLwnZWBXCIsXCImSnNjcjtcIjpcIvCdkqVcIixcIiZKc2VyY3k7XCI6XCLQiFwiLFwiJkp1a2N5O1wiOlwi0IRcIixcIiZLSGN5O1wiOlwi0KVcIixcIiZLSmN5O1wiOlwi0IxcIixcIiZLYXBwYTtcIjpcIs6aXCIsXCImS2NlZGlsO1wiOlwixLZcIixcIiZLY3k7XCI6XCLQmlwiLFwiJktmcjtcIjpcIvCdlI5cIixcIiZLb3BmO1wiOlwi8J2VglwiLFwiJktzY3I7XCI6XCLwnZKmXCIsXCImTEpjeTtcIjpcItCJXCIsXCImTFRcIjpcIjxcIixcIiZMVDtcIjpcIjxcIixcIiZMYWN1dGU7XCI6XCLEuVwiLFwiJkxhbWJkYTtcIjpcIs6bXCIsXCImTGFuZztcIjpcIuKfqlwiLFwiJkxhcGxhY2V0cmY7XCI6XCLihJJcIixcIiZMYXJyO1wiOlwi4oaeXCIsXCImTGNhcm9uO1wiOlwixL1cIixcIiZMY2VkaWw7XCI6XCLEu1wiLFwiJkxjeTtcIjpcItCbXCIsXCImTGVmdEFuZ2xlQnJhY2tldDtcIjpcIuKfqFwiLFwiJkxlZnRBcnJvdztcIjpcIuKGkFwiLFwiJkxlZnRBcnJvd0JhcjtcIjpcIuKHpFwiLFwiJkxlZnRBcnJvd1JpZ2h0QXJyb3c7XCI6XCLih4ZcIixcIiZMZWZ0Q2VpbGluZztcIjpcIuKMiFwiLFwiJkxlZnREb3VibGVCcmFja2V0O1wiOlwi4p+mXCIsXCImTGVmdERvd25UZWVWZWN0b3I7XCI6XCLipaFcIixcIiZMZWZ0RG93blZlY3RvcjtcIjpcIuKHg1wiLFwiJkxlZnREb3duVmVjdG9yQmFyO1wiOlwi4qWZXCIsXCImTGVmdEZsb29yO1wiOlwi4oyKXCIsXCImTGVmdFJpZ2h0QXJyb3c7XCI6XCLihpRcIixcIiZMZWZ0UmlnaHRWZWN0b3I7XCI6XCLipY5cIixcIiZMZWZ0VGVlO1wiOlwi4oqjXCIsXCImTGVmdFRlZUFycm93O1wiOlwi4oakXCIsXCImTGVmdFRlZVZlY3RvcjtcIjpcIuKlmlwiLFwiJkxlZnRUcmlhbmdsZTtcIjpcIuKKslwiLFwiJkxlZnRUcmlhbmdsZUJhcjtcIjpcIuKnj1wiLFwiJkxlZnRUcmlhbmdsZUVxdWFsO1wiOlwi4oq0XCIsXCImTGVmdFVwRG93blZlY3RvcjtcIjpcIuKlkVwiLFwiJkxlZnRVcFRlZVZlY3RvcjtcIjpcIuKloFwiLFwiJkxlZnRVcFZlY3RvcjtcIjpcIuKGv1wiLFwiJkxlZnRVcFZlY3RvckJhcjtcIjpcIuKlmFwiLFwiJkxlZnRWZWN0b3I7XCI6XCLihrxcIixcIiZMZWZ0VmVjdG9yQmFyO1wiOlwi4qWSXCIsXCImTGVmdGFycm93O1wiOlwi4oeQXCIsXCImTGVmdHJpZ2h0YXJyb3c7XCI6XCLih5RcIixcIiZMZXNzRXF1YWxHcmVhdGVyO1wiOlwi4ouaXCIsXCImTGVzc0Z1bGxFcXVhbDtcIjpcIuKJplwiLFwiJkxlc3NHcmVhdGVyO1wiOlwi4om2XCIsXCImTGVzc0xlc3M7XCI6XCLiqqFcIixcIiZMZXNzU2xhbnRFcXVhbDtcIjpcIuKpvVwiLFwiJkxlc3NUaWxkZTtcIjpcIuKJslwiLFwiJkxmcjtcIjpcIvCdlI9cIixcIiZMbDtcIjpcIuKLmFwiLFwiJkxsZWZ0YXJyb3c7XCI6XCLih5pcIixcIiZMbWlkb3Q7XCI6XCLEv1wiLFwiJkxvbmdMZWZ0QXJyb3c7XCI6XCLin7VcIixcIiZMb25nTGVmdFJpZ2h0QXJyb3c7XCI6XCLin7dcIixcIiZMb25nUmlnaHRBcnJvdztcIjpcIuKftlwiLFwiJkxvbmdsZWZ0YXJyb3c7XCI6XCLin7hcIixcIiZMb25nbGVmdHJpZ2h0YXJyb3c7XCI6XCLin7pcIixcIiZMb25ncmlnaHRhcnJvdztcIjpcIuKfuVwiLFwiJkxvcGY7XCI6XCLwnZWDXCIsXCImTG93ZXJMZWZ0QXJyb3c7XCI6XCLihplcIixcIiZMb3dlclJpZ2h0QXJyb3c7XCI6XCLihphcIixcIiZMc2NyO1wiOlwi4oSSXCIsXCImTHNoO1wiOlwi4oawXCIsXCImTHN0cm9rO1wiOlwixYFcIixcIiZMdDtcIjpcIuKJqlwiLFwiJk1hcDtcIjpcIuKkhVwiLFwiJk1jeTtcIjpcItCcXCIsXCImTWVkaXVtU3BhY2U7XCI6XCLigZ9cIixcIiZNZWxsaW50cmY7XCI6XCLihLNcIixcIiZNZnI7XCI6XCLwnZSQXCIsXCImTWludXNQbHVzO1wiOlwi4oiTXCIsXCImTW9wZjtcIjpcIvCdlYRcIixcIiZNc2NyO1wiOlwi4oSzXCIsXCImTXU7XCI6XCLOnFwiLFwiJk5KY3k7XCI6XCLQilwiLFwiJk5hY3V0ZTtcIjpcIsWDXCIsXCImTmNhcm9uO1wiOlwixYdcIixcIiZOY2VkaWw7XCI6XCLFhVwiLFwiJk5jeTtcIjpcItCdXCIsXCImTmVnYXRpdmVNZWRpdW1TcGFjZTtcIjpcIuKAi1wiLFwiJk5lZ2F0aXZlVGhpY2tTcGFjZTtcIjpcIuKAi1wiLFwiJk5lZ2F0aXZlVGhpblNwYWNlO1wiOlwi4oCLXCIsXCImTmVnYXRpdmVWZXJ5VGhpblNwYWNlO1wiOlwi4oCLXCIsXCImTmVzdGVkR3JlYXRlckdyZWF0ZXI7XCI6XCLiiatcIixcIiZOZXN0ZWRMZXNzTGVzcztcIjpcIuKJqlwiLFwiJk5ld0xpbmU7XCI6XCJcXG5cIixcIiZOZnI7XCI6XCLwnZSRXCIsXCImTm9CcmVhaztcIjpcIuKBoFwiLFwiJk5vbkJyZWFraW5nU3BhY2U7XCI6XCLCoFwiLFwiJk5vcGY7XCI6XCLihJVcIixcIiZOb3Q7XCI6XCLiq6xcIixcIiZOb3RDb25ncnVlbnQ7XCI6XCLiiaJcIixcIiZOb3RDdXBDYXA7XCI6XCLiia1cIixcIiZOb3REb3VibGVWZXJ0aWNhbEJhcjtcIjpcIuKIplwiLFwiJk5vdEVsZW1lbnQ7XCI6XCLiiIlcIixcIiZOb3RFcXVhbDtcIjpcIuKJoFwiLFwiJk5vdEVxdWFsVGlsZGU7XCI6XCLiiYLMuFwiLFwiJk5vdEV4aXN0cztcIjpcIuKIhFwiLFwiJk5vdEdyZWF0ZXI7XCI6XCLiia9cIixcIiZOb3RHcmVhdGVyRXF1YWw7XCI6XCLiibFcIixcIiZOb3RHcmVhdGVyRnVsbEVxdWFsO1wiOlwi4omnzLhcIixcIiZOb3RHcmVhdGVyR3JlYXRlcjtcIjpcIuKJq8y4XCIsXCImTm90R3JlYXRlckxlc3M7XCI6XCLiiblcIixcIiZOb3RHcmVhdGVyU2xhbnRFcXVhbDtcIjpcIuKpvsy4XCIsXCImTm90R3JlYXRlclRpbGRlO1wiOlwi4om1XCIsXCImTm90SHVtcERvd25IdW1wO1wiOlwi4omOzLhcIixcIiZOb3RIdW1wRXF1YWw7XCI6XCLiiY/MuFwiLFwiJk5vdExlZnRUcmlhbmdsZTtcIjpcIuKLqlwiLFwiJk5vdExlZnRUcmlhbmdsZUJhcjtcIjpcIuKnj8y4XCIsXCImTm90TGVmdFRyaWFuZ2xlRXF1YWw7XCI6XCLii6xcIixcIiZOb3RMZXNzO1wiOlwi4omuXCIsXCImTm90TGVzc0VxdWFsO1wiOlwi4omwXCIsXCImTm90TGVzc0dyZWF0ZXI7XCI6XCLiibhcIixcIiZOb3RMZXNzTGVzcztcIjpcIuKJqsy4XCIsXCImTm90TGVzc1NsYW50RXF1YWw7XCI6XCLiqb3MuFwiLFwiJk5vdExlc3NUaWxkZTtcIjpcIuKJtFwiLFwiJk5vdE5lc3RlZEdyZWF0ZXJHcmVhdGVyO1wiOlwi4qqizLhcIixcIiZOb3ROZXN0ZWRMZXNzTGVzcztcIjpcIuKqocy4XCIsXCImTm90UHJlY2VkZXM7XCI6XCLiioBcIixcIiZOb3RQcmVjZWRlc0VxdWFsO1wiOlwi4qqvzLhcIixcIiZOb3RQcmVjZWRlc1NsYW50RXF1YWw7XCI6XCLii6BcIixcIiZOb3RSZXZlcnNlRWxlbWVudDtcIjpcIuKIjFwiLFwiJk5vdFJpZ2h0VHJpYW5nbGU7XCI6XCLii6tcIixcIiZOb3RSaWdodFRyaWFuZ2xlQmFyO1wiOlwi4qeQzLhcIixcIiZOb3RSaWdodFRyaWFuZ2xlRXF1YWw7XCI6XCLii61cIixcIiZOb3RTcXVhcmVTdWJzZXQ7XCI6XCLiio/MuFwiLFwiJk5vdFNxdWFyZVN1YnNldEVxdWFsO1wiOlwi4ouiXCIsXCImTm90U3F1YXJlU3VwZXJzZXQ7XCI6XCLiipDMuFwiLFwiJk5vdFNxdWFyZVN1cGVyc2V0RXF1YWw7XCI6XCLii6NcIixcIiZOb3RTdWJzZXQ7XCI6XCLiioLig5JcIixcIiZOb3RTdWJzZXRFcXVhbDtcIjpcIuKKiFwiLFwiJk5vdFN1Y2NlZWRzO1wiOlwi4oqBXCIsXCImTm90U3VjY2VlZHNFcXVhbDtcIjpcIuKqsMy4XCIsXCImTm90U3VjY2VlZHNTbGFudEVxdWFsO1wiOlwi4ouhXCIsXCImTm90U3VjY2VlZHNUaWxkZTtcIjpcIuKJv8y4XCIsXCImTm90U3VwZXJzZXQ7XCI6XCLiioPig5JcIixcIiZOb3RTdXBlcnNldEVxdWFsO1wiOlwi4oqJXCIsXCImTm90VGlsZGU7XCI6XCLiiYFcIixcIiZOb3RUaWxkZUVxdWFsO1wiOlwi4omEXCIsXCImTm90VGlsZGVGdWxsRXF1YWw7XCI6XCLiiYdcIixcIiZOb3RUaWxkZVRpbGRlO1wiOlwi4omJXCIsXCImTm90VmVydGljYWxCYXI7XCI6XCLiiKRcIixcIiZOc2NyO1wiOlwi8J2SqVwiLFwiJk50aWxkZVwiOlwiw5FcIixcIiZOdGlsZGU7XCI6XCLDkVwiLFwiJk51O1wiOlwizp1cIixcIiZPRWxpZztcIjpcIsWSXCIsXCImT2FjdXRlXCI6XCLDk1wiLFwiJk9hY3V0ZTtcIjpcIsOTXCIsXCImT2NpcmNcIjpcIsOUXCIsXCImT2NpcmM7XCI6XCLDlFwiLFwiJk9jeTtcIjpcItCeXCIsXCImT2RibGFjO1wiOlwixZBcIixcIiZPZnI7XCI6XCLwnZSSXCIsXCImT2dyYXZlXCI6XCLDklwiLFwiJk9ncmF2ZTtcIjpcIsOSXCIsXCImT21hY3I7XCI6XCLFjFwiLFwiJk9tZWdhO1wiOlwizqlcIixcIiZPbWljcm9uO1wiOlwizp9cIixcIiZPb3BmO1wiOlwi8J2VhlwiLFwiJk9wZW5DdXJseURvdWJsZVF1b3RlO1wiOlwi4oCcXCIsXCImT3BlbkN1cmx5UXVvdGU7XCI6XCLigJhcIixcIiZPcjtcIjpcIuKplFwiLFwiJk9zY3I7XCI6XCLwnZKqXCIsXCImT3NsYXNoXCI6XCLDmFwiLFwiJk9zbGFzaDtcIjpcIsOYXCIsXCImT3RpbGRlXCI6XCLDlVwiLFwiJk90aWxkZTtcIjpcIsOVXCIsXCImT3RpbWVzO1wiOlwi4qi3XCIsXCImT3VtbFwiOlwiw5ZcIixcIiZPdW1sO1wiOlwiw5ZcIixcIiZPdmVyQmFyO1wiOlwi4oC+XCIsXCImT3ZlckJyYWNlO1wiOlwi4o+eXCIsXCImT3ZlckJyYWNrZXQ7XCI6XCLijrRcIixcIiZPdmVyUGFyZW50aGVzaXM7XCI6XCLij5xcIixcIiZQYXJ0aWFsRDtcIjpcIuKIglwiLFwiJlBjeTtcIjpcItCfXCIsXCImUGZyO1wiOlwi8J2Uk1wiLFwiJlBoaTtcIjpcIs6mXCIsXCImUGk7XCI6XCLOoFwiLFwiJlBsdXNNaW51cztcIjpcIsKxXCIsXCImUG9pbmNhcmVwbGFuZTtcIjpcIuKEjFwiLFwiJlBvcGY7XCI6XCLihJlcIixcIiZQcjtcIjpcIuKqu1wiLFwiJlByZWNlZGVzO1wiOlwi4om6XCIsXCImUHJlY2VkZXNFcXVhbDtcIjpcIuKqr1wiLFwiJlByZWNlZGVzU2xhbnRFcXVhbDtcIjpcIuKJvFwiLFwiJlByZWNlZGVzVGlsZGU7XCI6XCLiib5cIixcIiZQcmltZTtcIjpcIuKAs1wiLFwiJlByb2R1Y3Q7XCI6XCLiiI9cIixcIiZQcm9wb3J0aW9uO1wiOlwi4oi3XCIsXCImUHJvcG9ydGlvbmFsO1wiOlwi4oidXCIsXCImUHNjcjtcIjpcIvCdkqtcIixcIiZQc2k7XCI6XCLOqFwiLFwiJlFVT1RcIjonXCInLFwiJlFVT1Q7XCI6J1wiJyxcIiZRZnI7XCI6XCLwnZSUXCIsXCImUW9wZjtcIjpcIuKEmlwiLFwiJlFzY3I7XCI6XCLwnZKsXCIsXCImUkJhcnI7XCI6XCLipJBcIixcIiZSRUdcIjpcIsKuXCIsXCImUkVHO1wiOlwiwq5cIixcIiZSYWN1dGU7XCI6XCLFlFwiLFwiJlJhbmc7XCI6XCLin6tcIixcIiZSYXJyO1wiOlwi4oagXCIsXCImUmFycnRsO1wiOlwi4qSWXCIsXCImUmNhcm9uO1wiOlwixZhcIixcIiZSY2VkaWw7XCI6XCLFllwiLFwiJlJjeTtcIjpcItCgXCIsXCImUmU7XCI6XCLihJxcIixcIiZSZXZlcnNlRWxlbWVudDtcIjpcIuKIi1wiLFwiJlJldmVyc2VFcXVpbGlicml1bTtcIjpcIuKHi1wiLFwiJlJldmVyc2VVcEVxdWlsaWJyaXVtO1wiOlwi4qWvXCIsXCImUmZyO1wiOlwi4oScXCIsXCImUmhvO1wiOlwizqFcIixcIiZSaWdodEFuZ2xlQnJhY2tldDtcIjpcIuKfqVwiLFwiJlJpZ2h0QXJyb3c7XCI6XCLihpJcIixcIiZSaWdodEFycm93QmFyO1wiOlwi4oelXCIsXCImUmlnaHRBcnJvd0xlZnRBcnJvdztcIjpcIuKHhFwiLFwiJlJpZ2h0Q2VpbGluZztcIjpcIuKMiVwiLFwiJlJpZ2h0RG91YmxlQnJhY2tldDtcIjpcIuKfp1wiLFwiJlJpZ2h0RG93blRlZVZlY3RvcjtcIjpcIuKlnVwiLFwiJlJpZ2h0RG93blZlY3RvcjtcIjpcIuKHglwiLFwiJlJpZ2h0RG93blZlY3RvckJhcjtcIjpcIuKllVwiLFwiJlJpZ2h0Rmxvb3I7XCI6XCLijItcIixcIiZSaWdodFRlZTtcIjpcIuKKolwiLFwiJlJpZ2h0VGVlQXJyb3c7XCI6XCLihqZcIixcIiZSaWdodFRlZVZlY3RvcjtcIjpcIuKlm1wiLFwiJlJpZ2h0VHJpYW5nbGU7XCI6XCLiirNcIixcIiZSaWdodFRyaWFuZ2xlQmFyO1wiOlwi4qeQXCIsXCImUmlnaHRUcmlhbmdsZUVxdWFsO1wiOlwi4oq1XCIsXCImUmlnaHRVcERvd25WZWN0b3I7XCI6XCLipY9cIixcIiZSaWdodFVwVGVlVmVjdG9yO1wiOlwi4qWcXCIsXCImUmlnaHRVcFZlY3RvcjtcIjpcIuKGvlwiLFwiJlJpZ2h0VXBWZWN0b3JCYXI7XCI6XCLipZRcIixcIiZSaWdodFZlY3RvcjtcIjpcIuKHgFwiLFwiJlJpZ2h0VmVjdG9yQmFyO1wiOlwi4qWTXCIsXCImUmlnaHRhcnJvdztcIjpcIuKHklwiLFwiJlJvcGY7XCI6XCLihJ1cIixcIiZSb3VuZEltcGxpZXM7XCI6XCLipbBcIixcIiZScmlnaHRhcnJvdztcIjpcIuKHm1wiLFwiJlJzY3I7XCI6XCLihJtcIixcIiZSc2g7XCI6XCLihrFcIixcIiZSdWxlRGVsYXllZDtcIjpcIuKntFwiLFwiJlNIQ0hjeTtcIjpcItCpXCIsXCImU0hjeTtcIjpcItCoXCIsXCImU09GVGN5O1wiOlwi0KxcIixcIiZTYWN1dGU7XCI6XCLFmlwiLFwiJlNjO1wiOlwi4qq8XCIsXCImU2Nhcm9uO1wiOlwixaBcIixcIiZTY2VkaWw7XCI6XCLFnlwiLFwiJlNjaXJjO1wiOlwixZxcIixcIiZTY3k7XCI6XCLQoVwiLFwiJlNmcjtcIjpcIvCdlJZcIixcIiZTaG9ydERvd25BcnJvdztcIjpcIuKGk1wiLFwiJlNob3J0TGVmdEFycm93O1wiOlwi4oaQXCIsXCImU2hvcnRSaWdodEFycm93O1wiOlwi4oaSXCIsXCImU2hvcnRVcEFycm93O1wiOlwi4oaRXCIsXCImU2lnbWE7XCI6XCLOo1wiLFwiJlNtYWxsQ2lyY2xlO1wiOlwi4oiYXCIsXCImU29wZjtcIjpcIvCdlYpcIixcIiZTcXJ0O1wiOlwi4oiaXCIsXCImU3F1YXJlO1wiOlwi4pahXCIsXCImU3F1YXJlSW50ZXJzZWN0aW9uO1wiOlwi4oqTXCIsXCImU3F1YXJlU3Vic2V0O1wiOlwi4oqPXCIsXCImU3F1YXJlU3Vic2V0RXF1YWw7XCI6XCLiipFcIixcIiZTcXVhcmVTdXBlcnNldDtcIjpcIuKKkFwiLFwiJlNxdWFyZVN1cGVyc2V0RXF1YWw7XCI6XCLiipJcIixcIiZTcXVhcmVVbmlvbjtcIjpcIuKKlFwiLFwiJlNzY3I7XCI6XCLwnZKuXCIsXCImU3RhcjtcIjpcIuKLhlwiLFwiJlN1YjtcIjpcIuKLkFwiLFwiJlN1YnNldDtcIjpcIuKLkFwiLFwiJlN1YnNldEVxdWFsO1wiOlwi4oqGXCIsXCImU3VjY2VlZHM7XCI6XCLiibtcIixcIiZTdWNjZWVkc0VxdWFsO1wiOlwi4qqwXCIsXCImU3VjY2VlZHNTbGFudEVxdWFsO1wiOlwi4om9XCIsXCImU3VjY2VlZHNUaWxkZTtcIjpcIuKJv1wiLFwiJlN1Y2hUaGF0O1wiOlwi4oiLXCIsXCImU3VtO1wiOlwi4oiRXCIsXCImU3VwO1wiOlwi4ouRXCIsXCImU3VwZXJzZXQ7XCI6XCLiioNcIixcIiZTdXBlcnNldEVxdWFsO1wiOlwi4oqHXCIsXCImU3Vwc2V0O1wiOlwi4ouRXCIsXCImVEhPUk5cIjpcIsOeXCIsXCImVEhPUk47XCI6XCLDnlwiLFwiJlRSQURFO1wiOlwi4oSiXCIsXCImVFNIY3k7XCI6XCLQi1wiLFwiJlRTY3k7XCI6XCLQplwiLFwiJlRhYjtcIjpcIlxcdFwiLFwiJlRhdTtcIjpcIs6kXCIsXCImVGNhcm9uO1wiOlwixaRcIixcIiZUY2VkaWw7XCI6XCLFolwiLFwiJlRjeTtcIjpcItCiXCIsXCImVGZyO1wiOlwi8J2Ul1wiLFwiJlRoZXJlZm9yZTtcIjpcIuKItFwiLFwiJlRoZXRhO1wiOlwizphcIixcIiZUaGlja1NwYWNlO1wiOlwi4oGf4oCKXCIsXCImVGhpblNwYWNlO1wiOlwi4oCJXCIsXCImVGlsZGU7XCI6XCLiiLxcIixcIiZUaWxkZUVxdWFsO1wiOlwi4omDXCIsXCImVGlsZGVGdWxsRXF1YWw7XCI6XCLiiYVcIixcIiZUaWxkZVRpbGRlO1wiOlwi4omIXCIsXCImVG9wZjtcIjpcIvCdlYtcIixcIiZUcmlwbGVEb3Q7XCI6XCLig5tcIixcIiZUc2NyO1wiOlwi8J2Sr1wiLFwiJlRzdHJvaztcIjpcIsWmXCIsXCImVWFjdXRlXCI6XCLDmlwiLFwiJlVhY3V0ZTtcIjpcIsOaXCIsXCImVWFycjtcIjpcIuKGn1wiLFwiJlVhcnJvY2lyO1wiOlwi4qWJXCIsXCImVWJyY3k7XCI6XCLQjlwiLFwiJlVicmV2ZTtcIjpcIsWsXCIsXCImVWNpcmNcIjpcIsObXCIsXCImVWNpcmM7XCI6XCLDm1wiLFwiJlVjeTtcIjpcItCjXCIsXCImVWRibGFjO1wiOlwixbBcIixcIiZVZnI7XCI6XCLwnZSYXCIsXCImVWdyYXZlXCI6XCLDmVwiLFwiJlVncmF2ZTtcIjpcIsOZXCIsXCImVW1hY3I7XCI6XCLFqlwiLFwiJlVuZGVyQmFyO1wiOlwiX1wiLFwiJlVuZGVyQnJhY2U7XCI6XCLij59cIixcIiZVbmRlckJyYWNrZXQ7XCI6XCLijrVcIixcIiZVbmRlclBhcmVudGhlc2lzO1wiOlwi4o+dXCIsXCImVW5pb247XCI6XCLii4NcIixcIiZVbmlvblBsdXM7XCI6XCLiio5cIixcIiZVb2dvbjtcIjpcIsWyXCIsXCImVW9wZjtcIjpcIvCdlYxcIixcIiZVcEFycm93O1wiOlwi4oaRXCIsXCImVXBBcnJvd0JhcjtcIjpcIuKkklwiLFwiJlVwQXJyb3dEb3duQXJyb3c7XCI6XCLih4VcIixcIiZVcERvd25BcnJvdztcIjpcIuKGlVwiLFwiJlVwRXF1aWxpYnJpdW07XCI6XCLipa5cIixcIiZVcFRlZTtcIjpcIuKKpVwiLFwiJlVwVGVlQXJyb3c7XCI6XCLihqVcIixcIiZVcGFycm93O1wiOlwi4oeRXCIsXCImVXBkb3duYXJyb3c7XCI6XCLih5VcIixcIiZVcHBlckxlZnRBcnJvdztcIjpcIuKGllwiLFwiJlVwcGVyUmlnaHRBcnJvdztcIjpcIuKGl1wiLFwiJlVwc2k7XCI6XCLPklwiLFwiJlVwc2lsb247XCI6XCLOpVwiLFwiJlVyaW5nO1wiOlwixa5cIixcIiZVc2NyO1wiOlwi8J2SsFwiLFwiJlV0aWxkZTtcIjpcIsWoXCIsXCImVXVtbFwiOlwiw5xcIixcIiZVdW1sO1wiOlwiw5xcIixcIiZWRGFzaDtcIjpcIuKKq1wiLFwiJlZiYXI7XCI6XCLiq6tcIixcIiZWY3k7XCI6XCLQklwiLFwiJlZkYXNoO1wiOlwi4oqpXCIsXCImVmRhc2hsO1wiOlwi4qumXCIsXCImVmVlO1wiOlwi4ouBXCIsXCImVmVyYmFyO1wiOlwi4oCWXCIsXCImVmVydDtcIjpcIuKAllwiLFwiJlZlcnRpY2FsQmFyO1wiOlwi4oijXCIsXCImVmVydGljYWxMaW5lO1wiOlwifFwiLFwiJlZlcnRpY2FsU2VwYXJhdG9yO1wiOlwi4p2YXCIsXCImVmVydGljYWxUaWxkZTtcIjpcIuKJgFwiLFwiJlZlcnlUaGluU3BhY2U7XCI6XCLigIpcIixcIiZWZnI7XCI6XCLwnZSZXCIsXCImVm9wZjtcIjpcIvCdlY1cIixcIiZWc2NyO1wiOlwi8J2SsVwiLFwiJlZ2ZGFzaDtcIjpcIuKKqlwiLFwiJldjaXJjO1wiOlwixbRcIixcIiZXZWRnZTtcIjpcIuKLgFwiLFwiJldmcjtcIjpcIvCdlJpcIixcIiZXb3BmO1wiOlwi8J2VjlwiLFwiJldzY3I7XCI6XCLwnZKyXCIsXCImWGZyO1wiOlwi8J2Um1wiLFwiJlhpO1wiOlwizp5cIixcIiZYb3BmO1wiOlwi8J2Vj1wiLFwiJlhzY3I7XCI6XCLwnZKzXCIsXCImWUFjeTtcIjpcItCvXCIsXCImWUljeTtcIjpcItCHXCIsXCImWVVjeTtcIjpcItCuXCIsXCImWWFjdXRlXCI6XCLDnVwiLFwiJllhY3V0ZTtcIjpcIsOdXCIsXCImWWNpcmM7XCI6XCLFtlwiLFwiJlljeTtcIjpcItCrXCIsXCImWWZyO1wiOlwi8J2UnFwiLFwiJllvcGY7XCI6XCLwnZWQXCIsXCImWXNjcjtcIjpcIvCdkrRcIixcIiZZdW1sO1wiOlwixbhcIixcIiZaSGN5O1wiOlwi0JZcIixcIiZaYWN1dGU7XCI6XCLFuVwiLFwiJlpjYXJvbjtcIjpcIsW9XCIsXCImWmN5O1wiOlwi0JdcIixcIiZaZG90O1wiOlwixbtcIixcIiZaZXJvV2lkdGhTcGFjZTtcIjpcIuKAi1wiLFwiJlpldGE7XCI6XCLOllwiLFwiJlpmcjtcIjpcIuKEqFwiLFwiJlpvcGY7XCI6XCLihKRcIixcIiZac2NyO1wiOlwi8J2StVwiLFwiJmFhY3V0ZVwiOlwiw6FcIixcIiZhYWN1dGU7XCI6XCLDoVwiLFwiJmFicmV2ZTtcIjpcIsSDXCIsXCImYWM7XCI6XCLiiL5cIixcIiZhY0U7XCI6XCLiiL7Ms1wiLFwiJmFjZDtcIjpcIuKIv1wiLFwiJmFjaXJjXCI6XCLDolwiLFwiJmFjaXJjO1wiOlwiw6JcIixcIiZhY3V0ZVwiOlwiwrRcIixcIiZhY3V0ZTtcIjpcIsK0XCIsXCImYWN5O1wiOlwi0LBcIixcIiZhZWxpZ1wiOlwiw6ZcIixcIiZhZWxpZztcIjpcIsOmXCIsXCImYWY7XCI6XCLigaFcIixcIiZhZnI7XCI6XCLwnZSeXCIsXCImYWdyYXZlXCI6XCLDoFwiLFwiJmFncmF2ZTtcIjpcIsOgXCIsXCImYWxlZnN5bTtcIjpcIuKEtVwiLFwiJmFsZXBoO1wiOlwi4oS1XCIsXCImYWxwaGE7XCI6XCLOsVwiLFwiJmFtYWNyO1wiOlwixIFcIixcIiZhbWFsZztcIjpcIuKov1wiLFwiJmFtcFwiOlwiJlwiLFwiJmFtcDtcIjpcIiZcIixcIiZhbmQ7XCI6XCLiiKdcIixcIiZhbmRhbmQ7XCI6XCLiqZVcIixcIiZhbmRkO1wiOlwi4qmcXCIsXCImYW5kc2xvcGU7XCI6XCLiqZhcIixcIiZhbmR2O1wiOlwi4qmaXCIsXCImYW5nO1wiOlwi4oigXCIsXCImYW5nZTtcIjpcIuKmpFwiLFwiJmFuZ2xlO1wiOlwi4oigXCIsXCImYW5nbXNkO1wiOlwi4oihXCIsXCImYW5nbXNkYWE7XCI6XCLipqhcIixcIiZhbmdtc2RhYjtcIjpcIuKmqVwiLFwiJmFuZ21zZGFjO1wiOlwi4qaqXCIsXCImYW5nbXNkYWQ7XCI6XCLipqtcIixcIiZhbmdtc2RhZTtcIjpcIuKmrFwiLFwiJmFuZ21zZGFmO1wiOlwi4qatXCIsXCImYW5nbXNkYWc7XCI6XCLipq5cIixcIiZhbmdtc2RhaDtcIjpcIuKmr1wiLFwiJmFuZ3J0O1wiOlwi4oifXCIsXCImYW5ncnR2YjtcIjpcIuKKvlwiLFwiJmFuZ3J0dmJkO1wiOlwi4qadXCIsXCImYW5nc3BoO1wiOlwi4oiiXCIsXCImYW5nc3Q7XCI6XCLDhVwiLFwiJmFuZ3phcnI7XCI6XCLijbxcIixcIiZhb2dvbjtcIjpcIsSFXCIsXCImYW9wZjtcIjpcIvCdlZJcIixcIiZhcDtcIjpcIuKJiFwiLFwiJmFwRTtcIjpcIuKpsFwiLFwiJmFwYWNpcjtcIjpcIuKpr1wiLFwiJmFwZTtcIjpcIuKJilwiLFwiJmFwaWQ7XCI6XCLiiYtcIixcIiZhcG9zO1wiOlwiJ1wiLFwiJmFwcHJveDtcIjpcIuKJiFwiLFwiJmFwcHJveGVxO1wiOlwi4omKXCIsXCImYXJpbmdcIjpcIsOlXCIsXCImYXJpbmc7XCI6XCLDpVwiLFwiJmFzY3I7XCI6XCLwnZK2XCIsXCImYXN0O1wiOlwiKlwiLFwiJmFzeW1wO1wiOlwi4omIXCIsXCImYXN5bXBlcTtcIjpcIuKJjVwiLFwiJmF0aWxkZVwiOlwiw6NcIixcIiZhdGlsZGU7XCI6XCLDo1wiLFwiJmF1bWxcIjpcIsOkXCIsXCImYXVtbDtcIjpcIsOkXCIsXCImYXdjb25pbnQ7XCI6XCLiiLNcIixcIiZhd2ludDtcIjpcIuKokVwiLFwiJmJOb3Q7XCI6XCLiq61cIixcIiZiYWNrY29uZztcIjpcIuKJjFwiLFwiJmJhY2tlcHNpbG9uO1wiOlwiz7ZcIixcIiZiYWNrcHJpbWU7XCI6XCLigLVcIixcIiZiYWNrc2ltO1wiOlwi4oi9XCIsXCImYmFja3NpbWVxO1wiOlwi4ouNXCIsXCImYmFydmVlO1wiOlwi4oq9XCIsXCImYmFyd2VkO1wiOlwi4oyFXCIsXCImYmFyd2VkZ2U7XCI6XCLijIVcIixcIiZiYnJrO1wiOlwi4o61XCIsXCImYmJya3Ricms7XCI6XCLijrZcIixcIiZiY29uZztcIjpcIuKJjFwiLFwiJmJjeTtcIjpcItCxXCIsXCImYmRxdW87XCI6XCLigJ5cIixcIiZiZWNhdXM7XCI6XCLiiLVcIixcIiZiZWNhdXNlO1wiOlwi4oi1XCIsXCImYmVtcHR5djtcIjpcIuKmsFwiLFwiJmJlcHNpO1wiOlwiz7ZcIixcIiZiZXJub3U7XCI6XCLihKxcIixcIiZiZXRhO1wiOlwizrJcIixcIiZiZXRoO1wiOlwi4oS2XCIsXCImYmV0d2VlbjtcIjpcIuKJrFwiLFwiJmJmcjtcIjpcIvCdlJ9cIixcIiZiaWdjYXA7XCI6XCLii4JcIixcIiZiaWdjaXJjO1wiOlwi4pevXCIsXCImYmlnY3VwO1wiOlwi4ouDXCIsXCImYmlnb2RvdDtcIjpcIuKogFwiLFwiJmJpZ29wbHVzO1wiOlwi4qiBXCIsXCImYmlnb3RpbWVzO1wiOlwi4qiCXCIsXCImYmlnc3FjdXA7XCI6XCLiqIZcIixcIiZiaWdzdGFyO1wiOlwi4piFXCIsXCImYmlndHJpYW5nbGVkb3duO1wiOlwi4pa9XCIsXCImYmlndHJpYW5nbGV1cDtcIjpcIuKWs1wiLFwiJmJpZ3VwbHVzO1wiOlwi4qiEXCIsXCImYmlndmVlO1wiOlwi4ouBXCIsXCImYmlnd2VkZ2U7XCI6XCLii4BcIixcIiZia2Fyb3c7XCI6XCLipI1cIixcIiZibGFja2xvemVuZ2U7XCI6XCLip6tcIixcIiZibGFja3NxdWFyZTtcIjpcIuKWqlwiLFwiJmJsYWNrdHJpYW5nbGU7XCI6XCLilrRcIixcIiZibGFja3RyaWFuZ2xlZG93bjtcIjpcIuKWvlwiLFwiJmJsYWNrdHJpYW5nbGVsZWZ0O1wiOlwi4peCXCIsXCImYmxhY2t0cmlhbmdsZXJpZ2h0O1wiOlwi4pa4XCIsXCImYmxhbms7XCI6XCLikKNcIixcIiZibGsxMjtcIjpcIuKWklwiLFwiJmJsazE0O1wiOlwi4paRXCIsXCImYmxrMzQ7XCI6XCLilpNcIixcIiZibG9jaztcIjpcIuKWiFwiLFwiJmJuZTtcIjpcIj3ig6VcIixcIiZibmVxdWl2O1wiOlwi4omh4oOlXCIsXCImYm5vdDtcIjpcIuKMkFwiLFwiJmJvcGY7XCI6XCLwnZWTXCIsXCImYm90O1wiOlwi4oqlXCIsXCImYm90dG9tO1wiOlwi4oqlXCIsXCImYm93dGllO1wiOlwi4ouIXCIsXCImYm94REw7XCI6XCLilZdcIixcIiZib3hEUjtcIjpcIuKVlFwiLFwiJmJveERsO1wiOlwi4pWWXCIsXCImYm94RHI7XCI6XCLilZNcIixcIiZib3hIO1wiOlwi4pWQXCIsXCImYm94SEQ7XCI6XCLilaZcIixcIiZib3hIVTtcIjpcIuKVqVwiLFwiJmJveEhkO1wiOlwi4pWkXCIsXCImYm94SHU7XCI6XCLiladcIixcIiZib3hVTDtcIjpcIuKVnVwiLFwiJmJveFVSO1wiOlwi4pWaXCIsXCImYm94VWw7XCI6XCLilZxcIixcIiZib3hVcjtcIjpcIuKVmVwiLFwiJmJveFY7XCI6XCLilZFcIixcIiZib3hWSDtcIjpcIuKVrFwiLFwiJmJveFZMO1wiOlwi4pWjXCIsXCImYm94VlI7XCI6XCLilaBcIixcIiZib3hWaDtcIjpcIuKVq1wiLFwiJmJveFZsO1wiOlwi4pWiXCIsXCImYm94VnI7XCI6XCLilZ9cIixcIiZib3hib3g7XCI6XCLip4lcIixcIiZib3hkTDtcIjpcIuKVlVwiLFwiJmJveGRSO1wiOlwi4pWSXCIsXCImYm94ZGw7XCI6XCLilJBcIixcIiZib3hkcjtcIjpcIuKUjFwiLFwiJmJveGg7XCI6XCLilIBcIixcIiZib3hoRDtcIjpcIuKVpVwiLFwiJmJveGhVO1wiOlwi4pWoXCIsXCImYm94aGQ7XCI6XCLilKxcIixcIiZib3hodTtcIjpcIuKUtFwiLFwiJmJveG1pbnVzO1wiOlwi4oqfXCIsXCImYm94cGx1cztcIjpcIuKKnlwiLFwiJmJveHRpbWVzO1wiOlwi4oqgXCIsXCImYm94dUw7XCI6XCLilZtcIixcIiZib3h1UjtcIjpcIuKVmFwiLFwiJmJveHVsO1wiOlwi4pSYXCIsXCImYm94dXI7XCI6XCLilJRcIixcIiZib3h2O1wiOlwi4pSCXCIsXCImYm94dkg7XCI6XCLilapcIixcIiZib3h2TDtcIjpcIuKVoVwiLFwiJmJveHZSO1wiOlwi4pWeXCIsXCImYm94dmg7XCI6XCLilLxcIixcIiZib3h2bDtcIjpcIuKUpFwiLFwiJmJveHZyO1wiOlwi4pScXCIsXCImYnByaW1lO1wiOlwi4oC1XCIsXCImYnJldmU7XCI6XCLLmFwiLFwiJmJydmJhclwiOlwiwqZcIixcIiZicnZiYXI7XCI6XCLCplwiLFwiJmJzY3I7XCI6XCLwnZK3XCIsXCImYnNlbWk7XCI6XCLigY9cIixcIiZic2ltO1wiOlwi4oi9XCIsXCImYnNpbWU7XCI6XCLii41cIixcIiZic29sO1wiOlwiXFxcXFwiLFwiJmJzb2xiO1wiOlwi4qeFXCIsXCImYnNvbGhzdWI7XCI6XCLin4hcIixcIiZidWxsO1wiOlwi4oCiXCIsXCImYnVsbGV0O1wiOlwi4oCiXCIsXCImYnVtcDtcIjpcIuKJjlwiLFwiJmJ1bXBFO1wiOlwi4qquXCIsXCImYnVtcGU7XCI6XCLiiY9cIixcIiZidW1wZXE7XCI6XCLiiY9cIixcIiZjYWN1dGU7XCI6XCLEh1wiLFwiJmNhcDtcIjpcIuKIqVwiLFwiJmNhcGFuZDtcIjpcIuKphFwiLFwiJmNhcGJyY3VwO1wiOlwi4qmJXCIsXCImY2FwY2FwO1wiOlwi4qmLXCIsXCImY2FwY3VwO1wiOlwi4qmHXCIsXCImY2FwZG90O1wiOlwi4qmAXCIsXCImY2FwcztcIjpcIuKIqe+4gFwiLFwiJmNhcmV0O1wiOlwi4oGBXCIsXCImY2Fyb247XCI6XCLLh1wiLFwiJmNjYXBzO1wiOlwi4qmNXCIsXCImY2Nhcm9uO1wiOlwixI1cIixcIiZjY2VkaWxcIjpcIsOnXCIsXCImY2NlZGlsO1wiOlwiw6dcIixcIiZjY2lyYztcIjpcIsSJXCIsXCImY2N1cHM7XCI6XCLiqYxcIixcIiZjY3Vwc3NtO1wiOlwi4qmQXCIsXCImY2RvdDtcIjpcIsSLXCIsXCImY2VkaWxcIjpcIsK4XCIsXCImY2VkaWw7XCI6XCLCuFwiLFwiJmNlbXB0eXY7XCI6XCLiprJcIixcIiZjZW50XCI6XCLColwiLFwiJmNlbnQ7XCI6XCLColwiLFwiJmNlbnRlcmRvdDtcIjpcIsK3XCIsXCImY2ZyO1wiOlwi8J2UoFwiLFwiJmNoY3k7XCI6XCLRh1wiLFwiJmNoZWNrO1wiOlwi4pyTXCIsXCImY2hlY2ttYXJrO1wiOlwi4pyTXCIsXCImY2hpO1wiOlwiz4dcIixcIiZjaXI7XCI6XCLil4tcIixcIiZjaXJFO1wiOlwi4qeDXCIsXCImY2lyYztcIjpcIsuGXCIsXCImY2lyY2VxO1wiOlwi4omXXCIsXCImY2lyY2xlYXJyb3dsZWZ0O1wiOlwi4oa6XCIsXCImY2lyY2xlYXJyb3dyaWdodDtcIjpcIuKGu1wiLFwiJmNpcmNsZWRSO1wiOlwiwq5cIixcIiZjaXJjbGVkUztcIjpcIuKTiFwiLFwiJmNpcmNsZWRhc3Q7XCI6XCLiiptcIixcIiZjaXJjbGVkY2lyYztcIjpcIuKKmlwiLFwiJmNpcmNsZWRkYXNoO1wiOlwi4oqdXCIsXCImY2lyZTtcIjpcIuKJl1wiLFwiJmNpcmZuaW50O1wiOlwi4qiQXCIsXCImY2lybWlkO1wiOlwi4quvXCIsXCImY2lyc2NpcjtcIjpcIuKnglwiLFwiJmNsdWJzO1wiOlwi4pmjXCIsXCImY2x1YnN1aXQ7XCI6XCLimaNcIixcIiZjb2xvbjtcIjpcIjpcIixcIiZjb2xvbmU7XCI6XCLiiZRcIixcIiZjb2xvbmVxO1wiOlwi4omUXCIsXCImY29tbWE7XCI6XCIsXCIsXCImY29tbWF0O1wiOlwiQFwiLFwiJmNvbXA7XCI6XCLiiIFcIixcIiZjb21wZm47XCI6XCLiiJhcIixcIiZjb21wbGVtZW50O1wiOlwi4oiBXCIsXCImY29tcGxleGVzO1wiOlwi4oSCXCIsXCImY29uZztcIjpcIuKJhVwiLFwiJmNvbmdkb3Q7XCI6XCLiqa1cIixcIiZjb25pbnQ7XCI6XCLiiK5cIixcIiZjb3BmO1wiOlwi8J2VlFwiLFwiJmNvcHJvZDtcIjpcIuKIkFwiLFwiJmNvcHlcIjpcIsKpXCIsXCImY29weTtcIjpcIsKpXCIsXCImY29weXNyO1wiOlwi4oSXXCIsXCImY3JhcnI7XCI6XCLihrVcIixcIiZjcm9zcztcIjpcIuKcl1wiLFwiJmNzY3I7XCI6XCLwnZK4XCIsXCImY3N1YjtcIjpcIuKrj1wiLFwiJmNzdWJlO1wiOlwi4quRXCIsXCImY3N1cDtcIjpcIuKrkFwiLFwiJmNzdXBlO1wiOlwi4quSXCIsXCImY3Rkb3Q7XCI6XCLii69cIixcIiZjdWRhcnJsO1wiOlwi4qS4XCIsXCImY3VkYXJycjtcIjpcIuKktVwiLFwiJmN1ZXByO1wiOlwi4oueXCIsXCImY3Vlc2M7XCI6XCLii59cIixcIiZjdWxhcnI7XCI6XCLihrZcIixcIiZjdWxhcnJwO1wiOlwi4qS9XCIsXCImY3VwO1wiOlwi4oiqXCIsXCImY3VwYnJjYXA7XCI6XCLiqYhcIixcIiZjdXBjYXA7XCI6XCLiqYZcIixcIiZjdXBjdXA7XCI6XCLiqYpcIixcIiZjdXBkb3Q7XCI6XCLiio1cIixcIiZjdXBvcjtcIjpcIuKphVwiLFwiJmN1cHM7XCI6XCLiiKrvuIBcIixcIiZjdXJhcnI7XCI6XCLihrdcIixcIiZjdXJhcnJtO1wiOlwi4qS8XCIsXCImY3VybHllcXByZWM7XCI6XCLii55cIixcIiZjdXJseWVxc3VjYztcIjpcIuKLn1wiLFwiJmN1cmx5dmVlO1wiOlwi4ouOXCIsXCImY3VybHl3ZWRnZTtcIjpcIuKLj1wiLFwiJmN1cnJlblwiOlwiwqRcIixcIiZjdXJyZW47XCI6XCLCpFwiLFwiJmN1cnZlYXJyb3dsZWZ0O1wiOlwi4oa2XCIsXCImY3VydmVhcnJvd3JpZ2h0O1wiOlwi4oa3XCIsXCImY3V2ZWU7XCI6XCLii45cIixcIiZjdXdlZDtcIjpcIuKLj1wiLFwiJmN3Y29uaW50O1wiOlwi4oiyXCIsXCImY3dpbnQ7XCI6XCLiiLFcIixcIiZjeWxjdHk7XCI6XCLijK1cIixcIiZkQXJyO1wiOlwi4oeTXCIsXCImZEhhcjtcIjpcIuKlpVwiLFwiJmRhZ2dlcjtcIjpcIuKAoFwiLFwiJmRhbGV0aDtcIjpcIuKEuFwiLFwiJmRhcnI7XCI6XCLihpNcIixcIiZkYXNoO1wiOlwi4oCQXCIsXCImZGFzaHY7XCI6XCLiiqNcIixcIiZkYmthcm93O1wiOlwi4qSPXCIsXCImZGJsYWM7XCI6XCLLnVwiLFwiJmRjYXJvbjtcIjpcIsSPXCIsXCImZGN5O1wiOlwi0LRcIixcIiZkZDtcIjpcIuKFhlwiLFwiJmRkYWdnZXI7XCI6XCLigKFcIixcIiZkZGFycjtcIjpcIuKHilwiLFwiJmRkb3RzZXE7XCI6XCLiqbdcIixcIiZkZWdcIjpcIsKwXCIsXCImZGVnO1wiOlwiwrBcIixcIiZkZWx0YTtcIjpcIs60XCIsXCImZGVtcHR5djtcIjpcIuKmsVwiLFwiJmRmaXNodDtcIjpcIuKlv1wiLFwiJmRmcjtcIjpcIvCdlKFcIixcIiZkaGFybDtcIjpcIuKHg1wiLFwiJmRoYXJyO1wiOlwi4oeCXCIsXCImZGlhbTtcIjpcIuKLhFwiLFwiJmRpYW1vbmQ7XCI6XCLii4RcIixcIiZkaWFtb25kc3VpdDtcIjpcIuKZplwiLFwiJmRpYW1zO1wiOlwi4pmmXCIsXCImZGllO1wiOlwiwqhcIixcIiZkaWdhbW1hO1wiOlwiz51cIixcIiZkaXNpbjtcIjpcIuKLslwiLFwiJmRpdjtcIjpcIsO3XCIsXCImZGl2aWRlXCI6XCLDt1wiLFwiJmRpdmlkZTtcIjpcIsO3XCIsXCImZGl2aWRlb250aW1lcztcIjpcIuKLh1wiLFwiJmRpdm9ueDtcIjpcIuKLh1wiLFwiJmRqY3k7XCI6XCLRklwiLFwiJmRsY29ybjtcIjpcIuKMnlwiLFwiJmRsY3JvcDtcIjpcIuKMjVwiLFwiJmRvbGxhcjtcIjpcIiRcIixcIiZkb3BmO1wiOlwi8J2VlVwiLFwiJmRvdDtcIjpcIsuZXCIsXCImZG90ZXE7XCI6XCLiiZBcIixcIiZkb3RlcWRvdDtcIjpcIuKJkVwiLFwiJmRvdG1pbnVzO1wiOlwi4oi4XCIsXCImZG90cGx1cztcIjpcIuKIlFwiLFwiJmRvdHNxdWFyZTtcIjpcIuKKoVwiLFwiJmRvdWJsZWJhcndlZGdlO1wiOlwi4oyGXCIsXCImZG93bmFycm93O1wiOlwi4oaTXCIsXCImZG93bmRvd25hcnJvd3M7XCI6XCLih4pcIixcIiZkb3duaGFycG9vbmxlZnQ7XCI6XCLih4NcIixcIiZkb3duaGFycG9vbnJpZ2h0O1wiOlwi4oeCXCIsXCImZHJia2Fyb3c7XCI6XCLipJBcIixcIiZkcmNvcm47XCI6XCLijJ9cIixcIiZkcmNyb3A7XCI6XCLijIxcIixcIiZkc2NyO1wiOlwi8J2SuVwiLFwiJmRzY3k7XCI6XCLRlVwiLFwiJmRzb2w7XCI6XCLip7ZcIixcIiZkc3Ryb2s7XCI6XCLEkVwiLFwiJmR0ZG90O1wiOlwi4ouxXCIsXCImZHRyaTtcIjpcIuKWv1wiLFwiJmR0cmlmO1wiOlwi4pa+XCIsXCImZHVhcnI7XCI6XCLih7VcIixcIiZkdWhhcjtcIjpcIuKlr1wiLFwiJmR3YW5nbGU7XCI6XCLipqZcIixcIiZkemN5O1wiOlwi0Z9cIixcIiZkemlncmFycjtcIjpcIuKfv1wiLFwiJmVERG90O1wiOlwi4qm3XCIsXCImZURvdDtcIjpcIuKJkVwiLFwiJmVhY3V0ZVwiOlwiw6lcIixcIiZlYWN1dGU7XCI6XCLDqVwiLFwiJmVhc3RlcjtcIjpcIuKprlwiLFwiJmVjYXJvbjtcIjpcIsSbXCIsXCImZWNpcjtcIjpcIuKJllwiLFwiJmVjaXJjXCI6XCLDqlwiLFwiJmVjaXJjO1wiOlwiw6pcIixcIiZlY29sb247XCI6XCLiiZVcIixcIiZlY3k7XCI6XCLRjVwiLFwiJmVkb3Q7XCI6XCLEl1wiLFwiJmVlO1wiOlwi4oWHXCIsXCImZWZEb3Q7XCI6XCLiiZJcIixcIiZlZnI7XCI6XCLwnZSiXCIsXCImZWc7XCI6XCLiqppcIixcIiZlZ3JhdmVcIjpcIsOoXCIsXCImZWdyYXZlO1wiOlwiw6hcIixcIiZlZ3M7XCI6XCLiqpZcIixcIiZlZ3Nkb3Q7XCI6XCLiqphcIixcIiZlbDtcIjpcIuKqmVwiLFwiJmVsaW50ZXJzO1wiOlwi4o+nXCIsXCImZWxsO1wiOlwi4oSTXCIsXCImZWxzO1wiOlwi4qqVXCIsXCImZWxzZG90O1wiOlwi4qqXXCIsXCImZW1hY3I7XCI6XCLEk1wiLFwiJmVtcHR5O1wiOlwi4oiFXCIsXCImZW1wdHlzZXQ7XCI6XCLiiIVcIixcIiZlbXB0eXY7XCI6XCLiiIVcIixcIiZlbXNwMTM7XCI6XCLigIRcIixcIiZlbXNwMTQ7XCI6XCLigIVcIixcIiZlbXNwO1wiOlwi4oCDXCIsXCImZW5nO1wiOlwixYtcIixcIiZlbnNwO1wiOlwi4oCCXCIsXCImZW9nb247XCI6XCLEmVwiLFwiJmVvcGY7XCI6XCLwnZWWXCIsXCImZXBhcjtcIjpcIuKLlVwiLFwiJmVwYXJzbDtcIjpcIuKno1wiLFwiJmVwbHVzO1wiOlwi4qmxXCIsXCImZXBzaTtcIjpcIs61XCIsXCImZXBzaWxvbjtcIjpcIs61XCIsXCImZXBzaXY7XCI6XCLPtVwiLFwiJmVxY2lyYztcIjpcIuKJllwiLFwiJmVxY29sb247XCI6XCLiiZVcIixcIiZlcXNpbTtcIjpcIuKJglwiLFwiJmVxc2xhbnRndHI7XCI6XCLiqpZcIixcIiZlcXNsYW50bGVzcztcIjpcIuKqlVwiLFwiJmVxdWFscztcIjpcIj1cIixcIiZlcXVlc3Q7XCI6XCLiiZ9cIixcIiZlcXVpdjtcIjpcIuKJoVwiLFwiJmVxdWl2REQ7XCI6XCLiqbhcIixcIiZlcXZwYXJzbDtcIjpcIuKnpVwiLFwiJmVyRG90O1wiOlwi4omTXCIsXCImZXJhcnI7XCI6XCLipbFcIixcIiZlc2NyO1wiOlwi4oSvXCIsXCImZXNkb3Q7XCI6XCLiiZBcIixcIiZlc2ltO1wiOlwi4omCXCIsXCImZXRhO1wiOlwizrdcIixcIiZldGhcIjpcIsOwXCIsXCImZXRoO1wiOlwiw7BcIixcIiZldW1sXCI6XCLDq1wiLFwiJmV1bWw7XCI6XCLDq1wiLFwiJmV1cm87XCI6XCLigqxcIixcIiZleGNsO1wiOlwiIVwiLFwiJmV4aXN0O1wiOlwi4oiDXCIsXCImZXhwZWN0YXRpb247XCI6XCLihLBcIixcIiZleHBvbmVudGlhbGU7XCI6XCLihYdcIixcIiZmYWxsaW5nZG90c2VxO1wiOlwi4omSXCIsXCImZmN5O1wiOlwi0YRcIixcIiZmZW1hbGU7XCI6XCLimYBcIixcIiZmZmlsaWc7XCI6XCLvrINcIixcIiZmZmxpZztcIjpcIu+sgFwiLFwiJmZmbGxpZztcIjpcIu+shFwiLFwiJmZmcjtcIjpcIvCdlKNcIixcIiZmaWxpZztcIjpcIu+sgVwiLFwiJmZqbGlnO1wiOlwiZmpcIixcIiZmbGF0O1wiOlwi4pmtXCIsXCImZmxsaWc7XCI6XCLvrIJcIixcIiZmbHRucztcIjpcIuKWsVwiLFwiJmZub2Y7XCI6XCLGklwiLFwiJmZvcGY7XCI6XCLwnZWXXCIsXCImZm9yYWxsO1wiOlwi4oiAXCIsXCImZm9yaztcIjpcIuKLlFwiLFwiJmZvcmt2O1wiOlwi4quZXCIsXCImZnBhcnRpbnQ7XCI6XCLiqI1cIixcIiZmcmFjMTJcIjpcIsK9XCIsXCImZnJhYzEyO1wiOlwiwr1cIixcIiZmcmFjMTM7XCI6XCLihZNcIixcIiZmcmFjMTRcIjpcIsK8XCIsXCImZnJhYzE0O1wiOlwiwrxcIixcIiZmcmFjMTU7XCI6XCLihZVcIixcIiZmcmFjMTY7XCI6XCLihZlcIixcIiZmcmFjMTg7XCI6XCLihZtcIixcIiZmcmFjMjM7XCI6XCLihZRcIixcIiZmcmFjMjU7XCI6XCLihZZcIixcIiZmcmFjMzRcIjpcIsK+XCIsXCImZnJhYzM0O1wiOlwiwr5cIixcIiZmcmFjMzU7XCI6XCLihZdcIixcIiZmcmFjMzg7XCI6XCLihZxcIixcIiZmcmFjNDU7XCI6XCLihZhcIixcIiZmcmFjNTY7XCI6XCLihZpcIixcIiZmcmFjNTg7XCI6XCLihZ1cIixcIiZmcmFjNzg7XCI6XCLihZ5cIixcIiZmcmFzbDtcIjpcIuKBhFwiLFwiJmZyb3duO1wiOlwi4oyiXCIsXCImZnNjcjtcIjpcIvCdkrtcIixcIiZnRTtcIjpcIuKJp1wiLFwiJmdFbDtcIjpcIuKqjFwiLFwiJmdhY3V0ZTtcIjpcIse1XCIsXCImZ2FtbWE7XCI6XCLOs1wiLFwiJmdhbW1hZDtcIjpcIs+dXCIsXCImZ2FwO1wiOlwi4qqGXCIsXCImZ2JyZXZlO1wiOlwixJ9cIixcIiZnY2lyYztcIjpcIsSdXCIsXCImZ2N5O1wiOlwi0LNcIixcIiZnZG90O1wiOlwixKFcIixcIiZnZTtcIjpcIuKJpVwiLFwiJmdlbDtcIjpcIuKLm1wiLFwiJmdlcTtcIjpcIuKJpVwiLFwiJmdlcXE7XCI6XCLiiadcIixcIiZnZXFzbGFudDtcIjpcIuKpvlwiLFwiJmdlcztcIjpcIuKpvlwiLFwiJmdlc2NjO1wiOlwi4qqpXCIsXCImZ2VzZG90O1wiOlwi4qqAXCIsXCImZ2VzZG90bztcIjpcIuKqglwiLFwiJmdlc2RvdG9sO1wiOlwi4qqEXCIsXCImZ2VzbDtcIjpcIuKLm++4gFwiLFwiJmdlc2xlcztcIjpcIuKqlFwiLFwiJmdmcjtcIjpcIvCdlKRcIixcIiZnZztcIjpcIuKJq1wiLFwiJmdnZztcIjpcIuKLmVwiLFwiJmdpbWVsO1wiOlwi4oS3XCIsXCImZ2pjeTtcIjpcItGTXCIsXCImZ2w7XCI6XCLiibdcIixcIiZnbEU7XCI6XCLiqpJcIixcIiZnbGE7XCI6XCLiqqVcIixcIiZnbGo7XCI6XCLiqqRcIixcIiZnbkU7XCI6XCLiialcIixcIiZnbmFwO1wiOlwi4qqKXCIsXCImZ25hcHByb3g7XCI6XCLiqopcIixcIiZnbmU7XCI6XCLiqohcIixcIiZnbmVxO1wiOlwi4qqIXCIsXCImZ25lcXE7XCI6XCLiialcIixcIiZnbnNpbTtcIjpcIuKLp1wiLFwiJmdvcGY7XCI6XCLwnZWYXCIsXCImZ3JhdmU7XCI6XCJgXCIsXCImZ3NjcjtcIjpcIuKEilwiLFwiJmdzaW07XCI6XCLiibNcIixcIiZnc2ltZTtcIjpcIuKqjlwiLFwiJmdzaW1sO1wiOlwi4qqQXCIsXCImZ3RcIjpcIj5cIixcIiZndDtcIjpcIj5cIixcIiZndGNjO1wiOlwi4qqnXCIsXCImZ3RjaXI7XCI6XCLiqbpcIixcIiZndGRvdDtcIjpcIuKLl1wiLFwiJmd0bFBhcjtcIjpcIuKmlVwiLFwiJmd0cXVlc3Q7XCI6XCLiqbxcIixcIiZndHJhcHByb3g7XCI6XCLiqoZcIixcIiZndHJhcnI7XCI6XCLipbhcIixcIiZndHJkb3Q7XCI6XCLii5dcIixcIiZndHJlcWxlc3M7XCI6XCLii5tcIixcIiZndHJlcXFsZXNzO1wiOlwi4qqMXCIsXCImZ3RybGVzcztcIjpcIuKJt1wiLFwiJmd0cnNpbTtcIjpcIuKJs1wiLFwiJmd2ZXJ0bmVxcTtcIjpcIuKJqe+4gFwiLFwiJmd2bkU7XCI6XCLiianvuIBcIixcIiZoQXJyO1wiOlwi4oeUXCIsXCImaGFpcnNwO1wiOlwi4oCKXCIsXCImaGFsZjtcIjpcIsK9XCIsXCImaGFtaWx0O1wiOlwi4oSLXCIsXCImaGFyZGN5O1wiOlwi0YpcIixcIiZoYXJyO1wiOlwi4oaUXCIsXCImaGFycmNpcjtcIjpcIuKliFwiLFwiJmhhcnJ3O1wiOlwi4oatXCIsXCImaGJhcjtcIjpcIuKEj1wiLFwiJmhjaXJjO1wiOlwixKVcIixcIiZoZWFydHM7XCI6XCLimaVcIixcIiZoZWFydHN1aXQ7XCI6XCLimaVcIixcIiZoZWxsaXA7XCI6XCLigKZcIixcIiZoZXJjb247XCI6XCLiirlcIixcIiZoZnI7XCI6XCLwnZSlXCIsXCImaGtzZWFyb3c7XCI6XCLipKVcIixcIiZoa3N3YXJvdztcIjpcIuKkplwiLFwiJmhvYXJyO1wiOlwi4oe/XCIsXCImaG9tdGh0O1wiOlwi4oi7XCIsXCImaG9va2xlZnRhcnJvdztcIjpcIuKGqVwiLFwiJmhvb2tyaWdodGFycm93O1wiOlwi4oaqXCIsXCImaG9wZjtcIjpcIvCdlZlcIixcIiZob3JiYXI7XCI6XCLigJVcIixcIiZoc2NyO1wiOlwi8J2SvVwiLFwiJmhzbGFzaDtcIjpcIuKEj1wiLFwiJmhzdHJvaztcIjpcIsSnXCIsXCImaHlidWxsO1wiOlwi4oGDXCIsXCImaHlwaGVuO1wiOlwi4oCQXCIsXCImaWFjdXRlXCI6XCLDrVwiLFwiJmlhY3V0ZTtcIjpcIsOtXCIsXCImaWM7XCI6XCLigaNcIixcIiZpY2lyY1wiOlwiw65cIixcIiZpY2lyYztcIjpcIsOuXCIsXCImaWN5O1wiOlwi0LhcIixcIiZpZWN5O1wiOlwi0LVcIixcIiZpZXhjbFwiOlwiwqFcIixcIiZpZXhjbDtcIjpcIsKhXCIsXCImaWZmO1wiOlwi4oeUXCIsXCImaWZyO1wiOlwi8J2UplwiLFwiJmlncmF2ZVwiOlwiw6xcIixcIiZpZ3JhdmU7XCI6XCLDrFwiLFwiJmlpO1wiOlwi4oWIXCIsXCImaWlpaW50O1wiOlwi4qiMXCIsXCImaWlpbnQ7XCI6XCLiiK1cIixcIiZpaW5maW47XCI6XCLip5xcIixcIiZpaW90YTtcIjpcIuKEqVwiLFwiJmlqbGlnO1wiOlwixLNcIixcIiZpbWFjcjtcIjpcIsSrXCIsXCImaW1hZ2U7XCI6XCLihJFcIixcIiZpbWFnbGluZTtcIjpcIuKEkFwiLFwiJmltYWdwYXJ0O1wiOlwi4oSRXCIsXCImaW1hdGg7XCI6XCLEsVwiLFwiJmltb2Y7XCI6XCLiirdcIixcIiZpbXBlZDtcIjpcIsa1XCIsXCImaW47XCI6XCLiiIhcIixcIiZpbmNhcmU7XCI6XCLihIVcIixcIiZpbmZpbjtcIjpcIuKInlwiLFwiJmluZmludGllO1wiOlwi4qedXCIsXCImaW5vZG90O1wiOlwixLFcIixcIiZpbnQ7XCI6XCLiiKtcIixcIiZpbnRjYWw7XCI6XCLiirpcIixcIiZpbnRlZ2VycztcIjpcIuKEpFwiLFwiJmludGVyY2FsO1wiOlwi4oq6XCIsXCImaW50bGFyaGs7XCI6XCLiqJdcIixcIiZpbnRwcm9kO1wiOlwi4qi8XCIsXCImaW9jeTtcIjpcItGRXCIsXCImaW9nb247XCI6XCLEr1wiLFwiJmlvcGY7XCI6XCLwnZWaXCIsXCImaW90YTtcIjpcIs65XCIsXCImaXByb2Q7XCI6XCLiqLxcIixcIiZpcXVlc3RcIjpcIsK/XCIsXCImaXF1ZXN0O1wiOlwiwr9cIixcIiZpc2NyO1wiOlwi8J2SvlwiLFwiJmlzaW47XCI6XCLiiIhcIixcIiZpc2luRTtcIjpcIuKLuVwiLFwiJmlzaW5kb3Q7XCI6XCLii7VcIixcIiZpc2lucztcIjpcIuKLtFwiLFwiJmlzaW5zdjtcIjpcIuKLs1wiLFwiJmlzaW52O1wiOlwi4oiIXCIsXCImaXQ7XCI6XCLigaJcIixcIiZpdGlsZGU7XCI6XCLEqVwiLFwiJml1a2N5O1wiOlwi0ZZcIixcIiZpdW1sXCI6XCLDr1wiLFwiJml1bWw7XCI6XCLDr1wiLFwiJmpjaXJjO1wiOlwixLVcIixcIiZqY3k7XCI6XCLQuVwiLFwiJmpmcjtcIjpcIvCdlKdcIixcIiZqbWF0aDtcIjpcIsi3XCIsXCImam9wZjtcIjpcIvCdlZtcIixcIiZqc2NyO1wiOlwi8J2Sv1wiLFwiJmpzZXJjeTtcIjpcItGYXCIsXCImanVrY3k7XCI6XCLRlFwiLFwiJmthcHBhO1wiOlwizrpcIixcIiZrYXBwYXY7XCI6XCLPsFwiLFwiJmtjZWRpbDtcIjpcIsS3XCIsXCIma2N5O1wiOlwi0LpcIixcIiZrZnI7XCI6XCLwnZSoXCIsXCIma2dyZWVuO1wiOlwixLhcIixcIiZraGN5O1wiOlwi0YVcIixcIiZramN5O1wiOlwi0ZxcIixcIiZrb3BmO1wiOlwi8J2VnFwiLFwiJmtzY3I7XCI6XCLwnZOAXCIsXCImbEFhcnI7XCI6XCLih5pcIixcIiZsQXJyO1wiOlwi4oeQXCIsXCImbEF0YWlsO1wiOlwi4qSbXCIsXCImbEJhcnI7XCI6XCLipI5cIixcIiZsRTtcIjpcIuKJplwiLFwiJmxFZztcIjpcIuKqi1wiLFwiJmxIYXI7XCI6XCLipaJcIixcIiZsYWN1dGU7XCI6XCLEulwiLFwiJmxhZW1wdHl2O1wiOlwi4qa0XCIsXCImbGFncmFuO1wiOlwi4oSSXCIsXCImbGFtYmRhO1wiOlwizrtcIixcIiZsYW5nO1wiOlwi4p+oXCIsXCImbGFuZ2Q7XCI6XCLippFcIixcIiZsYW5nbGU7XCI6XCLin6hcIixcIiZsYXA7XCI6XCLiqoVcIixcIiZsYXF1b1wiOlwiwqtcIixcIiZsYXF1bztcIjpcIsKrXCIsXCImbGFycjtcIjpcIuKGkFwiLFwiJmxhcnJiO1wiOlwi4oekXCIsXCImbGFycmJmcztcIjpcIuKkn1wiLFwiJmxhcnJmcztcIjpcIuKknVwiLFwiJmxhcnJoaztcIjpcIuKGqVwiLFwiJmxhcnJscDtcIjpcIuKGq1wiLFwiJmxhcnJwbDtcIjpcIuKkuVwiLFwiJmxhcnJzaW07XCI6XCLipbNcIixcIiZsYXJydGw7XCI6XCLihqJcIixcIiZsYXQ7XCI6XCLiqqtcIixcIiZsYXRhaWw7XCI6XCLipJlcIixcIiZsYXRlO1wiOlwi4qqtXCIsXCImbGF0ZXM7XCI6XCLiqq3vuIBcIixcIiZsYmFycjtcIjpcIuKkjFwiLFwiJmxiYnJrO1wiOlwi4p2yXCIsXCImbGJyYWNlO1wiOlwie1wiLFwiJmxicmFjaztcIjpcIltcIixcIiZsYnJrZTtcIjpcIuKmi1wiLFwiJmxicmtzbGQ7XCI6XCLipo9cIixcIiZsYnJrc2x1O1wiOlwi4qaNXCIsXCImbGNhcm9uO1wiOlwixL5cIixcIiZsY2VkaWw7XCI6XCLEvFwiLFwiJmxjZWlsO1wiOlwi4oyIXCIsXCImbGN1YjtcIjpcIntcIixcIiZsY3k7XCI6XCLQu1wiLFwiJmxkY2E7XCI6XCLipLZcIixcIiZsZHF1bztcIjpcIuKAnFwiLFwiJmxkcXVvcjtcIjpcIuKAnlwiLFwiJmxkcmRoYXI7XCI6XCLipadcIixcIiZsZHJ1c2hhcjtcIjpcIuKli1wiLFwiJmxkc2g7XCI6XCLihrJcIixcIiZsZTtcIjpcIuKJpFwiLFwiJmxlZnRhcnJvdztcIjpcIuKGkFwiLFwiJmxlZnRhcnJvd3RhaWw7XCI6XCLihqJcIixcIiZsZWZ0aGFycG9vbmRvd247XCI6XCLihr1cIixcIiZsZWZ0aGFycG9vbnVwO1wiOlwi4oa8XCIsXCImbGVmdGxlZnRhcnJvd3M7XCI6XCLih4dcIixcIiZsZWZ0cmlnaHRhcnJvdztcIjpcIuKGlFwiLFwiJmxlZnRyaWdodGFycm93cztcIjpcIuKHhlwiLFwiJmxlZnRyaWdodGhhcnBvb25zO1wiOlwi4oeLXCIsXCImbGVmdHJpZ2h0c3F1aWdhcnJvdztcIjpcIuKGrVwiLFwiJmxlZnR0aHJlZXRpbWVzO1wiOlwi4ouLXCIsXCImbGVnO1wiOlwi4ouaXCIsXCImbGVxO1wiOlwi4omkXCIsXCImbGVxcTtcIjpcIuKJplwiLFwiJmxlcXNsYW50O1wiOlwi4qm9XCIsXCImbGVzO1wiOlwi4qm9XCIsXCImbGVzY2M7XCI6XCLiqqhcIixcIiZsZXNkb3Q7XCI6XCLiqb9cIixcIiZsZXNkb3RvO1wiOlwi4qqBXCIsXCImbGVzZG90b3I7XCI6XCLiqoNcIixcIiZsZXNnO1wiOlwi4oua77iAXCIsXCImbGVzZ2VzO1wiOlwi4qqTXCIsXCImbGVzc2FwcHJveDtcIjpcIuKqhVwiLFwiJmxlc3Nkb3Q7XCI6XCLii5ZcIixcIiZsZXNzZXFndHI7XCI6XCLii5pcIixcIiZsZXNzZXFxZ3RyO1wiOlwi4qqLXCIsXCImbGVzc2d0cjtcIjpcIuKJtlwiLFwiJmxlc3NzaW07XCI6XCLiibJcIixcIiZsZmlzaHQ7XCI6XCLipbxcIixcIiZsZmxvb3I7XCI6XCLijIpcIixcIiZsZnI7XCI6XCLwnZSpXCIsXCImbGc7XCI6XCLiibZcIixcIiZsZ0U7XCI6XCLiqpFcIixcIiZsaGFyZDtcIjpcIuKGvVwiLFwiJmxoYXJ1O1wiOlwi4oa8XCIsXCImbGhhcnVsO1wiOlwi4qWqXCIsXCImbGhibGs7XCI6XCLiloRcIixcIiZsamN5O1wiOlwi0ZlcIixcIiZsbDtcIjpcIuKJqlwiLFwiJmxsYXJyO1wiOlwi4oeHXCIsXCImbGxjb3JuZXI7XCI6XCLijJ5cIixcIiZsbGhhcmQ7XCI6XCLipatcIixcIiZsbHRyaTtcIjpcIuKXulwiLFwiJmxtaWRvdDtcIjpcIsWAXCIsXCImbG1vdXN0O1wiOlwi4o6wXCIsXCImbG1vdXN0YWNoZTtcIjpcIuKOsFwiLFwiJmxuRTtcIjpcIuKJqFwiLFwiJmxuYXA7XCI6XCLiqolcIixcIiZsbmFwcHJveDtcIjpcIuKqiVwiLFwiJmxuZTtcIjpcIuKqh1wiLFwiJmxuZXE7XCI6XCLiqodcIixcIiZsbmVxcTtcIjpcIuKJqFwiLFwiJmxuc2ltO1wiOlwi4oumXCIsXCImbG9hbmc7XCI6XCLin6xcIixcIiZsb2FycjtcIjpcIuKHvVwiLFwiJmxvYnJrO1wiOlwi4p+mXCIsXCImbG9uZ2xlZnRhcnJvdztcIjpcIuKftVwiLFwiJmxvbmdsZWZ0cmlnaHRhcnJvdztcIjpcIuKft1wiLFwiJmxvbmdtYXBzdG87XCI6XCLin7xcIixcIiZsb25ncmlnaHRhcnJvdztcIjpcIuKftlwiLFwiJmxvb3BhcnJvd2xlZnQ7XCI6XCLihqtcIixcIiZsb29wYXJyb3dyaWdodDtcIjpcIuKGrFwiLFwiJmxvcGFyO1wiOlwi4qaFXCIsXCImbG9wZjtcIjpcIvCdlZ1cIixcIiZsb3BsdXM7XCI6XCLiqK1cIixcIiZsb3RpbWVzO1wiOlwi4qi0XCIsXCImbG93YXN0O1wiOlwi4oiXXCIsXCImbG93YmFyO1wiOlwiX1wiLFwiJmxvejtcIjpcIuKXilwiLFwiJmxvemVuZ2U7XCI6XCLil4pcIixcIiZsb3pmO1wiOlwi4qerXCIsXCImbHBhcjtcIjpcIihcIixcIiZscGFybHQ7XCI6XCLippNcIixcIiZscmFycjtcIjpcIuKHhlwiLFwiJmxyY29ybmVyO1wiOlwi4oyfXCIsXCImbHJoYXI7XCI6XCLih4tcIixcIiZscmhhcmQ7XCI6XCLipa1cIixcIiZscm07XCI6XCLigI5cIixcIiZscnRyaTtcIjpcIuKKv1wiLFwiJmxzYXF1bztcIjpcIuKAuVwiLFwiJmxzY3I7XCI6XCLwnZOBXCIsXCImbHNoO1wiOlwi4oawXCIsXCImbHNpbTtcIjpcIuKJslwiLFwiJmxzaW1lO1wiOlwi4qqNXCIsXCImbHNpbWc7XCI6XCLiqo9cIixcIiZsc3FiO1wiOlwiW1wiLFwiJmxzcXVvO1wiOlwi4oCYXCIsXCImbHNxdW9yO1wiOlwi4oCaXCIsXCImbHN0cm9rO1wiOlwixYJcIixcIiZsdFwiOlwiPFwiLFwiJmx0O1wiOlwiPFwiLFwiJmx0Y2M7XCI6XCLiqqZcIixcIiZsdGNpcjtcIjpcIuKpuVwiLFwiJmx0ZG90O1wiOlwi4ouWXCIsXCImbHRocmVlO1wiOlwi4ouLXCIsXCImbHRpbWVzO1wiOlwi4ouJXCIsXCImbHRsYXJyO1wiOlwi4qW2XCIsXCImbHRxdWVzdDtcIjpcIuKpu1wiLFwiJmx0clBhcjtcIjpcIuKmllwiLFwiJmx0cmk7XCI6XCLil4NcIixcIiZsdHJpZTtcIjpcIuKKtFwiLFwiJmx0cmlmO1wiOlwi4peCXCIsXCImbHVyZHNoYXI7XCI6XCLipYpcIixcIiZsdXJ1aGFyO1wiOlwi4qWmXCIsXCImbHZlcnRuZXFxO1wiOlwi4omo77iAXCIsXCImbHZuRTtcIjpcIuKJqO+4gFwiLFwiJm1ERG90O1wiOlwi4oi6XCIsXCImbWFjclwiOlwiwq9cIixcIiZtYWNyO1wiOlwiwq9cIixcIiZtYWxlO1wiOlwi4pmCXCIsXCImbWFsdDtcIjpcIuKcoFwiLFwiJm1hbHRlc2U7XCI6XCLinKBcIixcIiZtYXA7XCI6XCLihqZcIixcIiZtYXBzdG87XCI6XCLihqZcIixcIiZtYXBzdG9kb3duO1wiOlwi4oanXCIsXCImbWFwc3RvbGVmdDtcIjpcIuKGpFwiLFwiJm1hcHN0b3VwO1wiOlwi4oalXCIsXCImbWFya2VyO1wiOlwi4pauXCIsXCImbWNvbW1hO1wiOlwi4qipXCIsXCImbWN5O1wiOlwi0LxcIixcIiZtZGFzaDtcIjpcIuKAlFwiLFwiJm1lYXN1cmVkYW5nbGU7XCI6XCLiiKFcIixcIiZtZnI7XCI6XCLwnZSqXCIsXCImbWhvO1wiOlwi4oSnXCIsXCImbWljcm9cIjpcIsK1XCIsXCImbWljcm87XCI6XCLCtVwiLFwiJm1pZDtcIjpcIuKIo1wiLFwiJm1pZGFzdDtcIjpcIipcIixcIiZtaWRjaXI7XCI6XCLiq7BcIixcIiZtaWRkb3RcIjpcIsK3XCIsXCImbWlkZG90O1wiOlwiwrdcIixcIiZtaW51cztcIjpcIuKIklwiLFwiJm1pbnVzYjtcIjpcIuKKn1wiLFwiJm1pbnVzZDtcIjpcIuKIuFwiLFwiJm1pbnVzZHU7XCI6XCLiqKpcIixcIiZtbGNwO1wiOlwi4qubXCIsXCImbWxkcjtcIjpcIuKAplwiLFwiJm1ucGx1cztcIjpcIuKIk1wiLFwiJm1vZGVscztcIjpcIuKKp1wiLFwiJm1vcGY7XCI6XCLwnZWeXCIsXCImbXA7XCI6XCLiiJNcIixcIiZtc2NyO1wiOlwi8J2TglwiLFwiJm1zdHBvcztcIjpcIuKIvlwiLFwiJm11O1wiOlwizrxcIixcIiZtdWx0aW1hcDtcIjpcIuKKuFwiLFwiJm11bWFwO1wiOlwi4oq4XCIsXCImbkdnO1wiOlwi4ouZzLhcIixcIiZuR3Q7XCI6XCLiiavig5JcIixcIiZuR3R2O1wiOlwi4omrzLhcIixcIiZuTGVmdGFycm93O1wiOlwi4oeNXCIsXCImbkxlZnRyaWdodGFycm93O1wiOlwi4oeOXCIsXCImbkxsO1wiOlwi4ouYzLhcIixcIiZuTHQ7XCI6XCLiiarig5JcIixcIiZuTHR2O1wiOlwi4omqzLhcIixcIiZuUmlnaHRhcnJvdztcIjpcIuKHj1wiLFwiJm5WRGFzaDtcIjpcIuKKr1wiLFwiJm5WZGFzaDtcIjpcIuKKrlwiLFwiJm5hYmxhO1wiOlwi4oiHXCIsXCImbmFjdXRlO1wiOlwixYRcIixcIiZuYW5nO1wiOlwi4oig4oOSXCIsXCImbmFwO1wiOlwi4omJXCIsXCImbmFwRTtcIjpcIuKpsMy4XCIsXCImbmFwaWQ7XCI6XCLiiYvMuFwiLFwiJm5hcG9zO1wiOlwixYlcIixcIiZuYXBwcm94O1wiOlwi4omJXCIsXCImbmF0dXI7XCI6XCLima5cIixcIiZuYXR1cmFsO1wiOlwi4pmuXCIsXCImbmF0dXJhbHM7XCI6XCLihJVcIixcIiZuYnNwXCI6XCLCoFwiLFwiJm5ic3A7XCI6XCLCoFwiLFwiJm5idW1wO1wiOlwi4omOzLhcIixcIiZuYnVtcGU7XCI6XCLiiY/MuFwiLFwiJm5jYXA7XCI6XCLiqYNcIixcIiZuY2Fyb247XCI6XCLFiFwiLFwiJm5jZWRpbDtcIjpcIsWGXCIsXCImbmNvbmc7XCI6XCLiiYdcIixcIiZuY29uZ2RvdDtcIjpcIuKprcy4XCIsXCImbmN1cDtcIjpcIuKpglwiLFwiJm5jeTtcIjpcItC9XCIsXCImbmRhc2g7XCI6XCLigJNcIixcIiZuZTtcIjpcIuKJoFwiLFwiJm5lQXJyO1wiOlwi4oeXXCIsXCImbmVhcmhrO1wiOlwi4qSkXCIsXCImbmVhcnI7XCI6XCLihpdcIixcIiZuZWFycm93O1wiOlwi4oaXXCIsXCImbmVkb3Q7XCI6XCLiiZDMuFwiLFwiJm5lcXVpdjtcIjpcIuKJolwiLFwiJm5lc2VhcjtcIjpcIuKkqFwiLFwiJm5lc2ltO1wiOlwi4omCzLhcIixcIiZuZXhpc3Q7XCI6XCLiiIRcIixcIiZuZXhpc3RzO1wiOlwi4oiEXCIsXCImbmZyO1wiOlwi8J2Uq1wiLFwiJm5nRTtcIjpcIuKJp8y4XCIsXCImbmdlO1wiOlwi4omxXCIsXCImbmdlcTtcIjpcIuKJsVwiLFwiJm5nZXFxO1wiOlwi4omnzLhcIixcIiZuZ2Vxc2xhbnQ7XCI6XCLiqb7MuFwiLFwiJm5nZXM7XCI6XCLiqb7MuFwiLFwiJm5nc2ltO1wiOlwi4om1XCIsXCImbmd0O1wiOlwi4omvXCIsXCImbmd0cjtcIjpcIuKJr1wiLFwiJm5oQXJyO1wiOlwi4oeOXCIsXCImbmhhcnI7XCI6XCLihq5cIixcIiZuaHBhcjtcIjpcIuKrslwiLFwiJm5pO1wiOlwi4oiLXCIsXCImbmlzO1wiOlwi4ou8XCIsXCImbmlzZDtcIjpcIuKLulwiLFwiJm5pdjtcIjpcIuKIi1wiLFwiJm5qY3k7XCI6XCLRmlwiLFwiJm5sQXJyO1wiOlwi4oeNXCIsXCImbmxFO1wiOlwi4ommzLhcIixcIiZubGFycjtcIjpcIuKGmlwiLFwiJm5sZHI7XCI6XCLigKVcIixcIiZubGU7XCI6XCLiibBcIixcIiZubGVmdGFycm93O1wiOlwi4oaaXCIsXCImbmxlZnRyaWdodGFycm93O1wiOlwi4oauXCIsXCImbmxlcTtcIjpcIuKJsFwiLFwiJm5sZXFxO1wiOlwi4ommzLhcIixcIiZubGVxc2xhbnQ7XCI6XCLiqb3MuFwiLFwiJm5sZXM7XCI6XCLiqb3MuFwiLFwiJm5sZXNzO1wiOlwi4omuXCIsXCImbmxzaW07XCI6XCLiibRcIixcIiZubHQ7XCI6XCLiia5cIixcIiZubHRyaTtcIjpcIuKLqlwiLFwiJm5sdHJpZTtcIjpcIuKLrFwiLFwiJm5taWQ7XCI6XCLiiKRcIixcIiZub3BmO1wiOlwi8J2Vn1wiLFwiJm5vdFwiOlwiwqxcIixcIiZub3Q7XCI6XCLCrFwiLFwiJm5vdGluO1wiOlwi4oiJXCIsXCImbm90aW5FO1wiOlwi4ou5zLhcIixcIiZub3RpbmRvdDtcIjpcIuKLtcy4XCIsXCImbm90aW52YTtcIjpcIuKIiVwiLFwiJm5vdGludmI7XCI6XCLii7dcIixcIiZub3RpbnZjO1wiOlwi4ou2XCIsXCImbm90bmk7XCI6XCLiiIxcIixcIiZub3RuaXZhO1wiOlwi4oiMXCIsXCImbm90bml2YjtcIjpcIuKLvlwiLFwiJm5vdG5pdmM7XCI6XCLii71cIixcIiZucGFyO1wiOlwi4oimXCIsXCImbnBhcmFsbGVsO1wiOlwi4oimXCIsXCImbnBhcnNsO1wiOlwi4qu94oOlXCIsXCImbnBhcnQ7XCI6XCLiiILMuFwiLFwiJm5wb2xpbnQ7XCI6XCLiqJRcIixcIiZucHI7XCI6XCLiioBcIixcIiZucHJjdWU7XCI6XCLii6BcIixcIiZucHJlO1wiOlwi4qqvzLhcIixcIiZucHJlYztcIjpcIuKKgFwiLFwiJm5wcmVjZXE7XCI6XCLiqq/MuFwiLFwiJm5yQXJyO1wiOlwi4oePXCIsXCImbnJhcnI7XCI6XCLihptcIixcIiZucmFycmM7XCI6XCLipLPMuFwiLFwiJm5yYXJydztcIjpcIuKGncy4XCIsXCImbnJpZ2h0YXJyb3c7XCI6XCLihptcIixcIiZucnRyaTtcIjpcIuKLq1wiLFwiJm5ydHJpZTtcIjpcIuKLrVwiLFwiJm5zYztcIjpcIuKKgVwiLFwiJm5zY2N1ZTtcIjpcIuKLoVwiLFwiJm5zY2U7XCI6XCLiqrDMuFwiLFwiJm5zY3I7XCI6XCLwnZODXCIsXCImbnNob3J0bWlkO1wiOlwi4oikXCIsXCImbnNob3J0cGFyYWxsZWw7XCI6XCLiiKZcIixcIiZuc2ltO1wiOlwi4omBXCIsXCImbnNpbWU7XCI6XCLiiYRcIixcIiZuc2ltZXE7XCI6XCLiiYRcIixcIiZuc21pZDtcIjpcIuKIpFwiLFwiJm5zcGFyO1wiOlwi4oimXCIsXCImbnNxc3ViZTtcIjpcIuKLolwiLFwiJm5zcXN1cGU7XCI6XCLii6NcIixcIiZuc3ViO1wiOlwi4oqEXCIsXCImbnN1YkU7XCI6XCLiq4XMuFwiLFwiJm5zdWJlO1wiOlwi4oqIXCIsXCImbnN1YnNldDtcIjpcIuKKguKDklwiLFwiJm5zdWJzZXRlcTtcIjpcIuKKiFwiLFwiJm5zdWJzZXRlcXE7XCI6XCLiq4XMuFwiLFwiJm5zdWNjO1wiOlwi4oqBXCIsXCImbnN1Y2NlcTtcIjpcIuKqsMy4XCIsXCImbnN1cDtcIjpcIuKKhVwiLFwiJm5zdXBFO1wiOlwi4quGzLhcIixcIiZuc3VwZTtcIjpcIuKKiVwiLFwiJm5zdXBzZXQ7XCI6XCLiioPig5JcIixcIiZuc3Vwc2V0ZXE7XCI6XCLiiolcIixcIiZuc3Vwc2V0ZXFxO1wiOlwi4quGzLhcIixcIiZudGdsO1wiOlwi4om5XCIsXCImbnRpbGRlXCI6XCLDsVwiLFwiJm50aWxkZTtcIjpcIsOxXCIsXCImbnRsZztcIjpcIuKJuFwiLFwiJm50cmlhbmdsZWxlZnQ7XCI6XCLii6pcIixcIiZudHJpYW5nbGVsZWZ0ZXE7XCI6XCLii6xcIixcIiZudHJpYW5nbGVyaWdodDtcIjpcIuKLq1wiLFwiJm50cmlhbmdsZXJpZ2h0ZXE7XCI6XCLii61cIixcIiZudTtcIjpcIs69XCIsXCImbnVtO1wiOlwiI1wiLFwiJm51bWVybztcIjpcIuKEllwiLFwiJm51bXNwO1wiOlwi4oCHXCIsXCImbnZEYXNoO1wiOlwi4oqtXCIsXCImbnZIYXJyO1wiOlwi4qSEXCIsXCImbnZhcDtcIjpcIuKJjeKDklwiLFwiJm52ZGFzaDtcIjpcIuKKrFwiLFwiJm52Z2U7XCI6XCLiiaXig5JcIixcIiZudmd0O1wiOlwiPuKDklwiLFwiJm52aW5maW47XCI6XCLip55cIixcIiZudmxBcnI7XCI6XCLipIJcIixcIiZudmxlO1wiOlwi4omk4oOSXCIsXCImbnZsdDtcIjpcIjzig5JcIixcIiZudmx0cmllO1wiOlwi4oq04oOSXCIsXCImbnZyQXJyO1wiOlwi4qSDXCIsXCImbnZydHJpZTtcIjpcIuKKteKDklwiLFwiJm52c2ltO1wiOlwi4oi84oOSXCIsXCImbndBcnI7XCI6XCLih5ZcIixcIiZud2FyaGs7XCI6XCLipKNcIixcIiZud2FycjtcIjpcIuKGllwiLFwiJm53YXJyb3c7XCI6XCLihpZcIixcIiZud25lYXI7XCI6XCLipKdcIixcIiZvUztcIjpcIuKTiFwiLFwiJm9hY3V0ZVwiOlwiw7NcIixcIiZvYWN1dGU7XCI6XCLDs1wiLFwiJm9hc3Q7XCI6XCLiiptcIixcIiZvY2lyO1wiOlwi4oqaXCIsXCImb2NpcmNcIjpcIsO0XCIsXCImb2NpcmM7XCI6XCLDtFwiLFwiJm9jeTtcIjpcItC+XCIsXCImb2Rhc2g7XCI6XCLiip1cIixcIiZvZGJsYWM7XCI6XCLFkVwiLFwiJm9kaXY7XCI6XCLiqLhcIixcIiZvZG90O1wiOlwi4oqZXCIsXCImb2Rzb2xkO1wiOlwi4qa8XCIsXCImb2VsaWc7XCI6XCLFk1wiLFwiJm9mY2lyO1wiOlwi4qa/XCIsXCImb2ZyO1wiOlwi8J2UrFwiLFwiJm9nb247XCI6XCLLm1wiLFwiJm9ncmF2ZVwiOlwiw7JcIixcIiZvZ3JhdmU7XCI6XCLDslwiLFwiJm9ndDtcIjpcIuKngVwiLFwiJm9oYmFyO1wiOlwi4qa1XCIsXCImb2htO1wiOlwizqlcIixcIiZvaW50O1wiOlwi4oiuXCIsXCImb2xhcnI7XCI6XCLihrpcIixcIiZvbGNpcjtcIjpcIuKmvlwiLFwiJm9sY3Jvc3M7XCI6XCLiprtcIixcIiZvbGluZTtcIjpcIuKAvlwiLFwiJm9sdDtcIjpcIuKngFwiLFwiJm9tYWNyO1wiOlwixY1cIixcIiZvbWVnYTtcIjpcIs+JXCIsXCImb21pY3JvbjtcIjpcIs6/XCIsXCImb21pZDtcIjpcIuKmtlwiLFwiJm9taW51cztcIjpcIuKKllwiLFwiJm9vcGY7XCI6XCLwnZWgXCIsXCImb3BhcjtcIjpcIuKmt1wiLFwiJm9wZXJwO1wiOlwi4qa5XCIsXCImb3BsdXM7XCI6XCLiipVcIixcIiZvcjtcIjpcIuKIqFwiLFwiJm9yYXJyO1wiOlwi4oa7XCIsXCImb3JkO1wiOlwi4qmdXCIsXCImb3JkZXI7XCI6XCLihLRcIixcIiZvcmRlcm9mO1wiOlwi4oS0XCIsXCImb3JkZlwiOlwiwqpcIixcIiZvcmRmO1wiOlwiwqpcIixcIiZvcmRtXCI6XCLCulwiLFwiJm9yZG07XCI6XCLCulwiLFwiJm9yaWdvZjtcIjpcIuKKtlwiLFwiJm9yb3I7XCI6XCLiqZZcIixcIiZvcnNsb3BlO1wiOlwi4qmXXCIsXCImb3J2O1wiOlwi4qmbXCIsXCImb3NjcjtcIjpcIuKEtFwiLFwiJm9zbGFzaFwiOlwiw7hcIixcIiZvc2xhc2g7XCI6XCLDuFwiLFwiJm9zb2w7XCI6XCLiiphcIixcIiZvdGlsZGVcIjpcIsO1XCIsXCImb3RpbGRlO1wiOlwiw7VcIixcIiZvdGltZXM7XCI6XCLiipdcIixcIiZvdGltZXNhcztcIjpcIuKotlwiLFwiJm91bWxcIjpcIsO2XCIsXCImb3VtbDtcIjpcIsO2XCIsXCImb3ZiYXI7XCI6XCLijL1cIixcIiZwYXI7XCI6XCLiiKVcIixcIiZwYXJhXCI6XCLCtlwiLFwiJnBhcmE7XCI6XCLCtlwiLFwiJnBhcmFsbGVsO1wiOlwi4oilXCIsXCImcGFyc2ltO1wiOlwi4quzXCIsXCImcGFyc2w7XCI6XCLiq71cIixcIiZwYXJ0O1wiOlwi4oiCXCIsXCImcGN5O1wiOlwi0L9cIixcIiZwZXJjbnQ7XCI6XCIlXCIsXCImcGVyaW9kO1wiOlwiLlwiLFwiJnBlcm1pbDtcIjpcIuKAsFwiLFwiJnBlcnA7XCI6XCLiiqVcIixcIiZwZXJ0ZW5rO1wiOlwi4oCxXCIsXCImcGZyO1wiOlwi8J2UrVwiLFwiJnBoaTtcIjpcIs+GXCIsXCImcGhpdjtcIjpcIs+VXCIsXCImcGhtbWF0O1wiOlwi4oSzXCIsXCImcGhvbmU7XCI6XCLimI5cIixcIiZwaTtcIjpcIs+AXCIsXCImcGl0Y2hmb3JrO1wiOlwi4ouUXCIsXCImcGl2O1wiOlwiz5ZcIixcIiZwbGFuY2s7XCI6XCLihI9cIixcIiZwbGFuY2toO1wiOlwi4oSOXCIsXCImcGxhbmt2O1wiOlwi4oSPXCIsXCImcGx1cztcIjpcIitcIixcIiZwbHVzYWNpcjtcIjpcIuKoo1wiLFwiJnBsdXNiO1wiOlwi4oqeXCIsXCImcGx1c2NpcjtcIjpcIuKoolwiLFwiJnBsdXNkbztcIjpcIuKIlFwiLFwiJnBsdXNkdTtcIjpcIuKopVwiLFwiJnBsdXNlO1wiOlwi4qmyXCIsXCImcGx1c21uXCI6XCLCsVwiLFwiJnBsdXNtbjtcIjpcIsKxXCIsXCImcGx1c3NpbTtcIjpcIuKoplwiLFwiJnBsdXN0d287XCI6XCLiqKdcIixcIiZwbTtcIjpcIsKxXCIsXCImcG9pbnRpbnQ7XCI6XCLiqJVcIixcIiZwb3BmO1wiOlwi8J2VoVwiLFwiJnBvdW5kXCI6XCLCo1wiLFwiJnBvdW5kO1wiOlwiwqNcIixcIiZwcjtcIjpcIuKJulwiLFwiJnByRTtcIjpcIuKqs1wiLFwiJnByYXA7XCI6XCLiqrdcIixcIiZwcmN1ZTtcIjpcIuKJvFwiLFwiJnByZTtcIjpcIuKqr1wiLFwiJnByZWM7XCI6XCLiibpcIixcIiZwcmVjYXBwcm94O1wiOlwi4qq3XCIsXCImcHJlY2N1cmx5ZXE7XCI6XCLiibxcIixcIiZwcmVjZXE7XCI6XCLiqq9cIixcIiZwcmVjbmFwcHJveDtcIjpcIuKquVwiLFwiJnByZWNuZXFxO1wiOlwi4qq1XCIsXCImcHJlY25zaW07XCI6XCLii6hcIixcIiZwcmVjc2ltO1wiOlwi4om+XCIsXCImcHJpbWU7XCI6XCLigLJcIixcIiZwcmltZXM7XCI6XCLihJlcIixcIiZwcm5FO1wiOlwi4qq1XCIsXCImcHJuYXA7XCI6XCLiqrlcIixcIiZwcm5zaW07XCI6XCLii6hcIixcIiZwcm9kO1wiOlwi4oiPXCIsXCImcHJvZmFsYXI7XCI6XCLijK5cIixcIiZwcm9mbGluZTtcIjpcIuKMklwiLFwiJnByb2ZzdXJmO1wiOlwi4oyTXCIsXCImcHJvcDtcIjpcIuKInVwiLFwiJnByb3B0bztcIjpcIuKInVwiLFwiJnByc2ltO1wiOlwi4om+XCIsXCImcHJ1cmVsO1wiOlwi4oqwXCIsXCImcHNjcjtcIjpcIvCdk4VcIixcIiZwc2k7XCI6XCLPiFwiLFwiJnB1bmNzcDtcIjpcIuKAiFwiLFwiJnFmcjtcIjpcIvCdlK5cIixcIiZxaW50O1wiOlwi4qiMXCIsXCImcW9wZjtcIjpcIvCdlaJcIixcIiZxcHJpbWU7XCI6XCLigZdcIixcIiZxc2NyO1wiOlwi8J2ThlwiLFwiJnF1YXRlcm5pb25zO1wiOlwi4oSNXCIsXCImcXVhdGludDtcIjpcIuKollwiLFwiJnF1ZXN0O1wiOlwiP1wiLFwiJnF1ZXN0ZXE7XCI6XCLiiZ9cIixcIiZxdW90XCI6J1wiJyxcIiZxdW90O1wiOidcIicsXCImckFhcnI7XCI6XCLih5tcIixcIiZyQXJyO1wiOlwi4oeSXCIsXCImckF0YWlsO1wiOlwi4qScXCIsXCImckJhcnI7XCI6XCLipI9cIixcIiZySGFyO1wiOlwi4qWkXCIsXCImcmFjZTtcIjpcIuKIvcyxXCIsXCImcmFjdXRlO1wiOlwixZVcIixcIiZyYWRpYztcIjpcIuKImlwiLFwiJnJhZW1wdHl2O1wiOlwi4qazXCIsXCImcmFuZztcIjpcIuKfqVwiLFwiJnJhbmdkO1wiOlwi4qaSXCIsXCImcmFuZ2U7XCI6XCLipqVcIixcIiZyYW5nbGU7XCI6XCLin6lcIixcIiZyYXF1b1wiOlwiwrtcIixcIiZyYXF1bztcIjpcIsK7XCIsXCImcmFycjtcIjpcIuKGklwiLFwiJnJhcnJhcDtcIjpcIuKltVwiLFwiJnJhcnJiO1wiOlwi4oelXCIsXCImcmFycmJmcztcIjpcIuKkoFwiLFwiJnJhcnJjO1wiOlwi4qSzXCIsXCImcmFycmZzO1wiOlwi4qSeXCIsXCImcmFycmhrO1wiOlwi4oaqXCIsXCImcmFycmxwO1wiOlwi4oasXCIsXCImcmFycnBsO1wiOlwi4qWFXCIsXCImcmFycnNpbTtcIjpcIuKltFwiLFwiJnJhcnJ0bDtcIjpcIuKGo1wiLFwiJnJhcnJ3O1wiOlwi4oadXCIsXCImcmF0YWlsO1wiOlwi4qSaXCIsXCImcmF0aW87XCI6XCLiiLZcIixcIiZyYXRpb25hbHM7XCI6XCLihJpcIixcIiZyYmFycjtcIjpcIuKkjVwiLFwiJnJiYnJrO1wiOlwi4p2zXCIsXCImcmJyYWNlO1wiOlwifVwiLFwiJnJicmFjaztcIjpcIl1cIixcIiZyYnJrZTtcIjpcIuKmjFwiLFwiJnJicmtzbGQ7XCI6XCLipo5cIixcIiZyYnJrc2x1O1wiOlwi4qaQXCIsXCImcmNhcm9uO1wiOlwixZlcIixcIiZyY2VkaWw7XCI6XCLFl1wiLFwiJnJjZWlsO1wiOlwi4oyJXCIsXCImcmN1YjtcIjpcIn1cIixcIiZyY3k7XCI6XCLRgFwiLFwiJnJkY2E7XCI6XCLipLdcIixcIiZyZGxkaGFyO1wiOlwi4qWpXCIsXCImcmRxdW87XCI6XCLigJ1cIixcIiZyZHF1b3I7XCI6XCLigJ1cIixcIiZyZHNoO1wiOlwi4oazXCIsXCImcmVhbDtcIjpcIuKEnFwiLFwiJnJlYWxpbmU7XCI6XCLihJtcIixcIiZyZWFscGFydDtcIjpcIuKEnFwiLFwiJnJlYWxzO1wiOlwi4oSdXCIsXCImcmVjdDtcIjpcIuKWrVwiLFwiJnJlZ1wiOlwiwq5cIixcIiZyZWc7XCI6XCLCrlwiLFwiJnJmaXNodDtcIjpcIuKlvVwiLFwiJnJmbG9vcjtcIjpcIuKMi1wiLFwiJnJmcjtcIjpcIvCdlK9cIixcIiZyaGFyZDtcIjpcIuKHgVwiLFwiJnJoYXJ1O1wiOlwi4oeAXCIsXCImcmhhcnVsO1wiOlwi4qWsXCIsXCImcmhvO1wiOlwiz4FcIixcIiZyaG92O1wiOlwiz7FcIixcIiZyaWdodGFycm93O1wiOlwi4oaSXCIsXCImcmlnaHRhcnJvd3RhaWw7XCI6XCLihqNcIixcIiZyaWdodGhhcnBvb25kb3duO1wiOlwi4oeBXCIsXCImcmlnaHRoYXJwb29udXA7XCI6XCLih4BcIixcIiZyaWdodGxlZnRhcnJvd3M7XCI6XCLih4RcIixcIiZyaWdodGxlZnRoYXJwb29ucztcIjpcIuKHjFwiLFwiJnJpZ2h0cmlnaHRhcnJvd3M7XCI6XCLih4lcIixcIiZyaWdodHNxdWlnYXJyb3c7XCI6XCLihp1cIixcIiZyaWdodHRocmVldGltZXM7XCI6XCLii4xcIixcIiZyaW5nO1wiOlwiy5pcIixcIiZyaXNpbmdkb3RzZXE7XCI6XCLiiZNcIixcIiZybGFycjtcIjpcIuKHhFwiLFwiJnJsaGFyO1wiOlwi4oeMXCIsXCImcmxtO1wiOlwi4oCPXCIsXCImcm1vdXN0O1wiOlwi4o6xXCIsXCImcm1vdXN0YWNoZTtcIjpcIuKOsVwiLFwiJnJubWlkO1wiOlwi4quuXCIsXCImcm9hbmc7XCI6XCLin61cIixcIiZyb2FycjtcIjpcIuKHvlwiLFwiJnJvYnJrO1wiOlwi4p+nXCIsXCImcm9wYXI7XCI6XCLipoZcIixcIiZyb3BmO1wiOlwi8J2Vo1wiLFwiJnJvcGx1cztcIjpcIuKorlwiLFwiJnJvdGltZXM7XCI6XCLiqLVcIixcIiZycGFyO1wiOlwiKVwiLFwiJnJwYXJndDtcIjpcIuKmlFwiLFwiJnJwcG9saW50O1wiOlwi4qiSXCIsXCImcnJhcnI7XCI6XCLih4lcIixcIiZyc2FxdW87XCI6XCLigLpcIixcIiZyc2NyO1wiOlwi8J2Th1wiLFwiJnJzaDtcIjpcIuKGsVwiLFwiJnJzcWI7XCI6XCJdXCIsXCImcnNxdW87XCI6XCLigJlcIixcIiZyc3F1b3I7XCI6XCLigJlcIixcIiZydGhyZWU7XCI6XCLii4xcIixcIiZydGltZXM7XCI6XCLii4pcIixcIiZydHJpO1wiOlwi4pa5XCIsXCImcnRyaWU7XCI6XCLiirVcIixcIiZydHJpZjtcIjpcIuKWuFwiLFwiJnJ0cmlsdHJpO1wiOlwi4qeOXCIsXCImcnVsdWhhcjtcIjpcIuKlqFwiLFwiJnJ4O1wiOlwi4oSeXCIsXCImc2FjdXRlO1wiOlwixZtcIixcIiZzYnF1bztcIjpcIuKAmlwiLFwiJnNjO1wiOlwi4om7XCIsXCImc2NFO1wiOlwi4qq0XCIsXCImc2NhcDtcIjpcIuKquFwiLFwiJnNjYXJvbjtcIjpcIsWhXCIsXCImc2NjdWU7XCI6XCLiib1cIixcIiZzY2U7XCI6XCLiqrBcIixcIiZzY2VkaWw7XCI6XCLFn1wiLFwiJnNjaXJjO1wiOlwixZ1cIixcIiZzY25FO1wiOlwi4qq2XCIsXCImc2NuYXA7XCI6XCLiqrpcIixcIiZzY25zaW07XCI6XCLii6lcIixcIiZzY3BvbGludDtcIjpcIuKok1wiLFwiJnNjc2ltO1wiOlwi4om/XCIsXCImc2N5O1wiOlwi0YFcIixcIiZzZG90O1wiOlwi4ouFXCIsXCImc2RvdGI7XCI6XCLiiqFcIixcIiZzZG90ZTtcIjpcIuKpplwiLFwiJnNlQXJyO1wiOlwi4oeYXCIsXCImc2VhcmhrO1wiOlwi4qSlXCIsXCImc2VhcnI7XCI6XCLihphcIixcIiZzZWFycm93O1wiOlwi4oaYXCIsXCImc2VjdFwiOlwiwqdcIixcIiZzZWN0O1wiOlwiwqdcIixcIiZzZW1pO1wiOlwiO1wiLFwiJnNlc3dhcjtcIjpcIuKkqVwiLFwiJnNldG1pbnVzO1wiOlwi4oiWXCIsXCImc2V0bW47XCI6XCLiiJZcIixcIiZzZXh0O1wiOlwi4py2XCIsXCImc2ZyO1wiOlwi8J2UsFwiLFwiJnNmcm93bjtcIjpcIuKMolwiLFwiJnNoYXJwO1wiOlwi4pmvXCIsXCImc2hjaGN5O1wiOlwi0YlcIixcIiZzaGN5O1wiOlwi0YhcIixcIiZzaG9ydG1pZDtcIjpcIuKIo1wiLFwiJnNob3J0cGFyYWxsZWw7XCI6XCLiiKVcIixcIiZzaHlcIjpcIsKtXCIsXCImc2h5O1wiOlwiwq1cIixcIiZzaWdtYTtcIjpcIs+DXCIsXCImc2lnbWFmO1wiOlwiz4JcIixcIiZzaWdtYXY7XCI6XCLPglwiLFwiJnNpbTtcIjpcIuKIvFwiLFwiJnNpbWRvdDtcIjpcIuKpqlwiLFwiJnNpbWU7XCI6XCLiiYNcIixcIiZzaW1lcTtcIjpcIuKJg1wiLFwiJnNpbWc7XCI6XCLiqp5cIixcIiZzaW1nRTtcIjpcIuKqoFwiLFwiJnNpbWw7XCI6XCLiqp1cIixcIiZzaW1sRTtcIjpcIuKqn1wiLFwiJnNpbW5lO1wiOlwi4omGXCIsXCImc2ltcGx1cztcIjpcIuKopFwiLFwiJnNpbXJhcnI7XCI6XCLipbJcIixcIiZzbGFycjtcIjpcIuKGkFwiLFwiJnNtYWxsc2V0bWludXM7XCI6XCLiiJZcIixcIiZzbWFzaHA7XCI6XCLiqLNcIixcIiZzbWVwYXJzbDtcIjpcIuKnpFwiLFwiJnNtaWQ7XCI6XCLiiKNcIixcIiZzbWlsZTtcIjpcIuKMo1wiLFwiJnNtdDtcIjpcIuKqqlwiLFwiJnNtdGU7XCI6XCLiqqxcIixcIiZzbXRlcztcIjpcIuKqrO+4gFwiLFwiJnNvZnRjeTtcIjpcItGMXCIsXCImc29sO1wiOlwiL1wiLFwiJnNvbGI7XCI6XCLip4RcIixcIiZzb2xiYXI7XCI6XCLijL9cIixcIiZzb3BmO1wiOlwi8J2VpFwiLFwiJnNwYWRlcztcIjpcIuKZoFwiLFwiJnNwYWRlc3VpdDtcIjpcIuKZoFwiLFwiJnNwYXI7XCI6XCLiiKVcIixcIiZzcWNhcDtcIjpcIuKKk1wiLFwiJnNxY2FwcztcIjpcIuKKk++4gFwiLFwiJnNxY3VwO1wiOlwi4oqUXCIsXCImc3FjdXBzO1wiOlwi4oqU77iAXCIsXCImc3FzdWI7XCI6XCLiio9cIixcIiZzcXN1YmU7XCI6XCLiipFcIixcIiZzcXN1YnNldDtcIjpcIuKKj1wiLFwiJnNxc3Vic2V0ZXE7XCI6XCLiipFcIixcIiZzcXN1cDtcIjpcIuKKkFwiLFwiJnNxc3VwZTtcIjpcIuKKklwiLFwiJnNxc3Vwc2V0O1wiOlwi4oqQXCIsXCImc3FzdXBzZXRlcTtcIjpcIuKKklwiLFwiJnNxdTtcIjpcIuKWoVwiLFwiJnNxdWFyZTtcIjpcIuKWoVwiLFwiJnNxdWFyZjtcIjpcIuKWqlwiLFwiJnNxdWY7XCI6XCLilqpcIixcIiZzcmFycjtcIjpcIuKGklwiLFwiJnNzY3I7XCI6XCLwnZOIXCIsXCImc3NldG1uO1wiOlwi4oiWXCIsXCImc3NtaWxlO1wiOlwi4oyjXCIsXCImc3N0YXJmO1wiOlwi4ouGXCIsXCImc3RhcjtcIjpcIuKYhlwiLFwiJnN0YXJmO1wiOlwi4piFXCIsXCImc3RyYWlnaHRlcHNpbG9uO1wiOlwiz7VcIixcIiZzdHJhaWdodHBoaTtcIjpcIs+VXCIsXCImc3RybnM7XCI6XCLCr1wiLFwiJnN1YjtcIjpcIuKKglwiLFwiJnN1YkU7XCI6XCLiq4VcIixcIiZzdWJkb3Q7XCI6XCLiqr1cIixcIiZzdWJlO1wiOlwi4oqGXCIsXCImc3ViZWRvdDtcIjpcIuKrg1wiLFwiJnN1Ym11bHQ7XCI6XCLiq4FcIixcIiZzdWJuRTtcIjpcIuKri1wiLFwiJnN1Ym5lO1wiOlwi4oqKXCIsXCImc3VicGx1cztcIjpcIuKqv1wiLFwiJnN1YnJhcnI7XCI6XCLipblcIixcIiZzdWJzZXQ7XCI6XCLiioJcIixcIiZzdWJzZXRlcTtcIjpcIuKKhlwiLFwiJnN1YnNldGVxcTtcIjpcIuKrhVwiLFwiJnN1YnNldG5lcTtcIjpcIuKKilwiLFwiJnN1YnNldG5lcXE7XCI6XCLiq4tcIixcIiZzdWJzaW07XCI6XCLiq4dcIixcIiZzdWJzdWI7XCI6XCLiq5VcIixcIiZzdWJzdXA7XCI6XCLiq5NcIixcIiZzdWNjO1wiOlwi4om7XCIsXCImc3VjY2FwcHJveDtcIjpcIuKquFwiLFwiJnN1Y2NjdXJseWVxO1wiOlwi4om9XCIsXCImc3VjY2VxO1wiOlwi4qqwXCIsXCImc3VjY25hcHByb3g7XCI6XCLiqrpcIixcIiZzdWNjbmVxcTtcIjpcIuKqtlwiLFwiJnN1Y2Nuc2ltO1wiOlwi4oupXCIsXCImc3VjY3NpbTtcIjpcIuKJv1wiLFwiJnN1bTtcIjpcIuKIkVwiLFwiJnN1bmc7XCI6XCLimapcIixcIiZzdXAxXCI6XCLCuVwiLFwiJnN1cDE7XCI6XCLCuVwiLFwiJnN1cDJcIjpcIsKyXCIsXCImc3VwMjtcIjpcIsKyXCIsXCImc3VwM1wiOlwiwrNcIixcIiZzdXAzO1wiOlwiwrNcIixcIiZzdXA7XCI6XCLiioNcIixcIiZzdXBFO1wiOlwi4quGXCIsXCImc3VwZG90O1wiOlwi4qq+XCIsXCImc3VwZHN1YjtcIjpcIuKrmFwiLFwiJnN1cGU7XCI6XCLiiodcIixcIiZzdXBlZG90O1wiOlwi4quEXCIsXCImc3VwaHNvbDtcIjpcIuKfiVwiLFwiJnN1cGhzdWI7XCI6XCLiq5dcIixcIiZzdXBsYXJyO1wiOlwi4qW7XCIsXCImc3VwbXVsdDtcIjpcIuKrglwiLFwiJnN1cG5FO1wiOlwi4quMXCIsXCImc3VwbmU7XCI6XCLiiotcIixcIiZzdXBwbHVzO1wiOlwi4quAXCIsXCImc3Vwc2V0O1wiOlwi4oqDXCIsXCImc3Vwc2V0ZXE7XCI6XCLiiodcIixcIiZzdXBzZXRlcXE7XCI6XCLiq4ZcIixcIiZzdXBzZXRuZXE7XCI6XCLiiotcIixcIiZzdXBzZXRuZXFxO1wiOlwi4quMXCIsXCImc3Vwc2ltO1wiOlwi4quIXCIsXCImc3Vwc3ViO1wiOlwi4quUXCIsXCImc3Vwc3VwO1wiOlwi4quWXCIsXCImc3dBcnI7XCI6XCLih5lcIixcIiZzd2FyaGs7XCI6XCLipKZcIixcIiZzd2FycjtcIjpcIuKGmVwiLFwiJnN3YXJyb3c7XCI6XCLihplcIixcIiZzd253YXI7XCI6XCLipKpcIixcIiZzemxpZ1wiOlwiw59cIixcIiZzemxpZztcIjpcIsOfXCIsXCImdGFyZ2V0O1wiOlwi4oyWXCIsXCImdGF1O1wiOlwiz4RcIixcIiZ0YnJrO1wiOlwi4o60XCIsXCImdGNhcm9uO1wiOlwixaVcIixcIiZ0Y2VkaWw7XCI6XCLFo1wiLFwiJnRjeTtcIjpcItGCXCIsXCImdGRvdDtcIjpcIuKDm1wiLFwiJnRlbHJlYztcIjpcIuKMlVwiLFwiJnRmcjtcIjpcIvCdlLFcIixcIiZ0aGVyZTQ7XCI6XCLiiLRcIixcIiZ0aGVyZWZvcmU7XCI6XCLiiLRcIixcIiZ0aGV0YTtcIjpcIs64XCIsXCImdGhldGFzeW07XCI6XCLPkVwiLFwiJnRoZXRhdjtcIjpcIs+RXCIsXCImdGhpY2thcHByb3g7XCI6XCLiiYhcIixcIiZ0aGlja3NpbTtcIjpcIuKIvFwiLFwiJnRoaW5zcDtcIjpcIuKAiVwiLFwiJnRoa2FwO1wiOlwi4omIXCIsXCImdGhrc2ltO1wiOlwi4oi8XCIsXCImdGhvcm5cIjpcIsO+XCIsXCImdGhvcm47XCI6XCLDvlwiLFwiJnRpbGRlO1wiOlwiy5xcIixcIiZ0aW1lc1wiOlwiw5dcIixcIiZ0aW1lcztcIjpcIsOXXCIsXCImdGltZXNiO1wiOlwi4oqgXCIsXCImdGltZXNiYXI7XCI6XCLiqLFcIixcIiZ0aW1lc2Q7XCI6XCLiqLBcIixcIiZ0aW50O1wiOlwi4oitXCIsXCImdG9lYTtcIjpcIuKkqFwiLFwiJnRvcDtcIjpcIuKKpFwiLFwiJnRvcGJvdDtcIjpcIuKMtlwiLFwiJnRvcGNpcjtcIjpcIuKrsVwiLFwiJnRvcGY7XCI6XCLwnZWlXCIsXCImdG9wZm9yaztcIjpcIuKrmlwiLFwiJnRvc2E7XCI6XCLipKlcIixcIiZ0cHJpbWU7XCI6XCLigLRcIixcIiZ0cmFkZTtcIjpcIuKEolwiLFwiJnRyaWFuZ2xlO1wiOlwi4pa1XCIsXCImdHJpYW5nbGVkb3duO1wiOlwi4pa/XCIsXCImdHJpYW5nbGVsZWZ0O1wiOlwi4peDXCIsXCImdHJpYW5nbGVsZWZ0ZXE7XCI6XCLiirRcIixcIiZ0cmlhbmdsZXE7XCI6XCLiiZxcIixcIiZ0cmlhbmdsZXJpZ2h0O1wiOlwi4pa5XCIsXCImdHJpYW5nbGVyaWdodGVxO1wiOlwi4oq1XCIsXCImdHJpZG90O1wiOlwi4pesXCIsXCImdHJpZTtcIjpcIuKJnFwiLFwiJnRyaW1pbnVzO1wiOlwi4qi6XCIsXCImdHJpcGx1cztcIjpcIuKouVwiLFwiJnRyaXNiO1wiOlwi4qeNXCIsXCImdHJpdGltZTtcIjpcIuKou1wiLFwiJnRycGV6aXVtO1wiOlwi4o+iXCIsXCImdHNjcjtcIjpcIvCdk4lcIixcIiZ0c2N5O1wiOlwi0YZcIixcIiZ0c2hjeTtcIjpcItGbXCIsXCImdHN0cm9rO1wiOlwixadcIixcIiZ0d2l4dDtcIjpcIuKJrFwiLFwiJnR3b2hlYWRsZWZ0YXJyb3c7XCI6XCLihp5cIixcIiZ0d29oZWFkcmlnaHRhcnJvdztcIjpcIuKGoFwiLFwiJnVBcnI7XCI6XCLih5FcIixcIiZ1SGFyO1wiOlwi4qWjXCIsXCImdWFjdXRlXCI6XCLDulwiLFwiJnVhY3V0ZTtcIjpcIsO6XCIsXCImdWFycjtcIjpcIuKGkVwiLFwiJnVicmN5O1wiOlwi0Z5cIixcIiZ1YnJldmU7XCI6XCLFrVwiLFwiJnVjaXJjXCI6XCLDu1wiLFwiJnVjaXJjO1wiOlwiw7tcIixcIiZ1Y3k7XCI6XCLRg1wiLFwiJnVkYXJyO1wiOlwi4oeFXCIsXCImdWRibGFjO1wiOlwixbFcIixcIiZ1ZGhhcjtcIjpcIuKlrlwiLFwiJnVmaXNodDtcIjpcIuKlvlwiLFwiJnVmcjtcIjpcIvCdlLJcIixcIiZ1Z3JhdmVcIjpcIsO5XCIsXCImdWdyYXZlO1wiOlwiw7lcIixcIiZ1aGFybDtcIjpcIuKGv1wiLFwiJnVoYXJyO1wiOlwi4oa+XCIsXCImdWhibGs7XCI6XCLiloBcIixcIiZ1bGNvcm47XCI6XCLijJxcIixcIiZ1bGNvcm5lcjtcIjpcIuKMnFwiLFwiJnVsY3JvcDtcIjpcIuKMj1wiLFwiJnVsdHJpO1wiOlwi4pe4XCIsXCImdW1hY3I7XCI6XCLFq1wiLFwiJnVtbFwiOlwiwqhcIixcIiZ1bWw7XCI6XCLCqFwiLFwiJnVvZ29uO1wiOlwixbNcIixcIiZ1b3BmO1wiOlwi8J2VplwiLFwiJnVwYXJyb3c7XCI6XCLihpFcIixcIiZ1cGRvd25hcnJvdztcIjpcIuKGlVwiLFwiJnVwaGFycG9vbmxlZnQ7XCI6XCLihr9cIixcIiZ1cGhhcnBvb25yaWdodDtcIjpcIuKGvlwiLFwiJnVwbHVzO1wiOlwi4oqOXCIsXCImdXBzaTtcIjpcIs+FXCIsXCImdXBzaWg7XCI6XCLPklwiLFwiJnVwc2lsb247XCI6XCLPhVwiLFwiJnVwdXBhcnJvd3M7XCI6XCLih4hcIixcIiZ1cmNvcm47XCI6XCLijJ1cIixcIiZ1cmNvcm5lcjtcIjpcIuKMnVwiLFwiJnVyY3JvcDtcIjpcIuKMjlwiLFwiJnVyaW5nO1wiOlwixa9cIixcIiZ1cnRyaTtcIjpcIuKXuVwiLFwiJnVzY3I7XCI6XCLwnZOKXCIsXCImdXRkb3Q7XCI6XCLii7BcIixcIiZ1dGlsZGU7XCI6XCLFqVwiLFwiJnV0cmk7XCI6XCLilrVcIixcIiZ1dHJpZjtcIjpcIuKWtFwiLFwiJnV1YXJyO1wiOlwi4oeIXCIsXCImdXVtbFwiOlwiw7xcIixcIiZ1dW1sO1wiOlwiw7xcIixcIiZ1d2FuZ2xlO1wiOlwi4qanXCIsXCImdkFycjtcIjpcIuKHlVwiLFwiJnZCYXI7XCI6XCLiq6hcIixcIiZ2QmFydjtcIjpcIuKrqVwiLFwiJnZEYXNoO1wiOlwi4oqoXCIsXCImdmFuZ3J0O1wiOlwi4qacXCIsXCImdmFyZXBzaWxvbjtcIjpcIs+1XCIsXCImdmFya2FwcGE7XCI6XCLPsFwiLFwiJnZhcm5vdGhpbmc7XCI6XCLiiIVcIixcIiZ2YXJwaGk7XCI6XCLPlVwiLFwiJnZhcnBpO1wiOlwiz5ZcIixcIiZ2YXJwcm9wdG87XCI6XCLiiJ1cIixcIiZ2YXJyO1wiOlwi4oaVXCIsXCImdmFycmhvO1wiOlwiz7FcIixcIiZ2YXJzaWdtYTtcIjpcIs+CXCIsXCImdmFyc3Vic2V0bmVxO1wiOlwi4oqK77iAXCIsXCImdmFyc3Vic2V0bmVxcTtcIjpcIuKri++4gFwiLFwiJnZhcnN1cHNldG5lcTtcIjpcIuKKi++4gFwiLFwiJnZhcnN1cHNldG5lcXE7XCI6XCLiq4zvuIBcIixcIiZ2YXJ0aGV0YTtcIjpcIs+RXCIsXCImdmFydHJpYW5nbGVsZWZ0O1wiOlwi4oqyXCIsXCImdmFydHJpYW5nbGVyaWdodDtcIjpcIuKKs1wiLFwiJnZjeTtcIjpcItCyXCIsXCImdmRhc2g7XCI6XCLiiqJcIixcIiZ2ZWU7XCI6XCLiiKhcIixcIiZ2ZWViYXI7XCI6XCLiirtcIixcIiZ2ZWVlcTtcIjpcIuKJmlwiLFwiJnZlbGxpcDtcIjpcIuKLrlwiLFwiJnZlcmJhcjtcIjpcInxcIixcIiZ2ZXJ0O1wiOlwifFwiLFwiJnZmcjtcIjpcIvCdlLNcIixcIiZ2bHRyaTtcIjpcIuKKslwiLFwiJnZuc3ViO1wiOlwi4oqC4oOSXCIsXCImdm5zdXA7XCI6XCLiioPig5JcIixcIiZ2b3BmO1wiOlwi8J2Vp1wiLFwiJnZwcm9wO1wiOlwi4oidXCIsXCImdnJ0cmk7XCI6XCLiirNcIixcIiZ2c2NyO1wiOlwi8J2Ti1wiLFwiJnZzdWJuRTtcIjpcIuKri++4gFwiLFwiJnZzdWJuZTtcIjpcIuKKiu+4gFwiLFwiJnZzdXBuRTtcIjpcIuKrjO+4gFwiLFwiJnZzdXBuZTtcIjpcIuKKi++4gFwiLFwiJnZ6aWd6YWc7XCI6XCLipppcIixcIiZ3Y2lyYztcIjpcIsW1XCIsXCImd2VkYmFyO1wiOlwi4qmfXCIsXCImd2VkZ2U7XCI6XCLiiKdcIixcIiZ3ZWRnZXE7XCI6XCLiiZlcIixcIiZ3ZWllcnA7XCI6XCLihJhcIixcIiZ3ZnI7XCI6XCLwnZS0XCIsXCImd29wZjtcIjpcIvCdlahcIixcIiZ3cDtcIjpcIuKEmFwiLFwiJndyO1wiOlwi4omAXCIsXCImd3JlYXRoO1wiOlwi4omAXCIsXCImd3NjcjtcIjpcIvCdk4xcIixcIiZ4Y2FwO1wiOlwi4ouCXCIsXCImeGNpcmM7XCI6XCLil69cIixcIiZ4Y3VwO1wiOlwi4ouDXCIsXCImeGR0cmk7XCI6XCLilr1cIixcIiZ4ZnI7XCI6XCLwnZS1XCIsXCImeGhBcnI7XCI6XCLin7pcIixcIiZ4aGFycjtcIjpcIuKft1wiLFwiJnhpO1wiOlwizr5cIixcIiZ4bEFycjtcIjpcIuKfuFwiLFwiJnhsYXJyO1wiOlwi4p+1XCIsXCImeG1hcDtcIjpcIuKfvFwiLFwiJnhuaXM7XCI6XCLii7tcIixcIiZ4b2RvdDtcIjpcIuKogFwiLFwiJnhvcGY7XCI6XCLwnZWpXCIsXCImeG9wbHVzO1wiOlwi4qiBXCIsXCImeG90aW1lO1wiOlwi4qiCXCIsXCImeHJBcnI7XCI6XCLin7lcIixcIiZ4cmFycjtcIjpcIuKftlwiLFwiJnhzY3I7XCI6XCLwnZONXCIsXCImeHNxY3VwO1wiOlwi4qiGXCIsXCImeHVwbHVzO1wiOlwi4qiEXCIsXCImeHV0cmk7XCI6XCLilrNcIixcIiZ4dmVlO1wiOlwi4ouBXCIsXCImeHdlZGdlO1wiOlwi4ouAXCIsXCImeWFjdXRlXCI6XCLDvVwiLFwiJnlhY3V0ZTtcIjpcIsO9XCIsXCImeWFjeTtcIjpcItGPXCIsXCImeWNpcmM7XCI6XCLFt1wiLFwiJnljeTtcIjpcItGLXCIsXCImeWVuXCI6XCLCpVwiLFwiJnllbjtcIjpcIsKlXCIsXCImeWZyO1wiOlwi8J2UtlwiLFwiJnlpY3k7XCI6XCLRl1wiLFwiJnlvcGY7XCI6XCLwnZWqXCIsXCImeXNjcjtcIjpcIvCdk45cIixcIiZ5dWN5O1wiOlwi0Y5cIixcIiZ5dW1sXCI6XCLDv1wiLFwiJnl1bWw7XCI6XCLDv1wiLFwiJnphY3V0ZTtcIjpcIsW6XCIsXCImemNhcm9uO1wiOlwixb5cIixcIiZ6Y3k7XCI6XCLQt1wiLFwiJnpkb3Q7XCI6XCLFvFwiLFwiJnplZXRyZjtcIjpcIuKEqFwiLFwiJnpldGE7XCI6XCLOtlwiLFwiJnpmcjtcIjpcIvCdlLdcIixcIiZ6aGN5O1wiOlwi0LZcIixcIiZ6aWdyYXJyO1wiOlwi4oedXCIsXCImem9wZjtcIjpcIvCdlatcIixcIiZ6c2NyO1wiOlwi8J2Tj1wiLFwiJnp3ajtcIjpcIuKAjVwiLFwiJnp3bmo7XCI6XCLigIxcIn0sY2hhcmFjdGVyczp7XCLDhlwiOlwiJkFFbGlnO1wiLFwiJlwiOlwiJmFtcDtcIixcIsOBXCI6XCImQWFjdXRlO1wiLFwixIJcIjpcIiZBYnJldmU7XCIsXCLDglwiOlwiJkFjaXJjO1wiLFwi0JBcIjpcIiZBY3k7XCIsXCLwnZSEXCI6XCImQWZyO1wiLFwiw4BcIjpcIiZBZ3JhdmU7XCIsXCLOkVwiOlwiJkFscGhhO1wiLFwixIBcIjpcIiZBbWFjcjtcIixcIuKpk1wiOlwiJkFuZDtcIixcIsSEXCI6XCImQW9nb247XCIsXCLwnZS4XCI6XCImQW9wZjtcIixcIuKBoVwiOlwiJmFmO1wiLFwiw4VcIjpcIiZhbmdzdDtcIixcIvCdkpxcIjpcIiZBc2NyO1wiLFwi4omUXCI6XCImY29sb25lcTtcIixcIsODXCI6XCImQXRpbGRlO1wiLFwiw4RcIjpcIiZBdW1sO1wiLFwi4oiWXCI6XCImc3NldG1uO1wiLFwi4qunXCI6XCImQmFydjtcIixcIuKMhlwiOlwiJmRvdWJsZWJhcndlZGdlO1wiLFwi0JFcIjpcIiZCY3k7XCIsXCLiiLVcIjpcIiZiZWNhdXNlO1wiLFwi4oSsXCI6XCImYmVybm91O1wiLFwizpJcIjpcIiZCZXRhO1wiLFwi8J2UhVwiOlwiJkJmcjtcIixcIvCdlLlcIjpcIiZCb3BmO1wiLFwiy5hcIjpcIiZicmV2ZTtcIixcIuKJjlwiOlwiJmJ1bXA7XCIsXCLQp1wiOlwiJkNIY3k7XCIsXCLCqVwiOlwiJmNvcHk7XCIsXCLEhlwiOlwiJkNhY3V0ZTtcIixcIuKLklwiOlwiJkNhcDtcIixcIuKFhVwiOlwiJkREO1wiLFwi4oStXCI6XCImQ2ZyO1wiLFwixIxcIjpcIiZDY2Fyb247XCIsXCLDh1wiOlwiJkNjZWRpbDtcIixcIsSIXCI6XCImQ2NpcmM7XCIsXCLiiLBcIjpcIiZDY29uaW50O1wiLFwixIpcIjpcIiZDZG90O1wiLFwiwrhcIjpcIiZjZWRpbDtcIixcIsK3XCI6XCImbWlkZG90O1wiLFwizqdcIjpcIiZDaGk7XCIsXCLiiplcIjpcIiZvZG90O1wiLFwi4oqWXCI6XCImb21pbnVzO1wiLFwi4oqVXCI6XCImb3BsdXM7XCIsXCLiipdcIjpcIiZvdGltZXM7XCIsXCLiiLJcIjpcIiZjd2NvbmludDtcIixcIuKAnVwiOlwiJnJkcXVvcjtcIixcIuKAmVwiOlwiJnJzcXVvcjtcIixcIuKIt1wiOlwiJlByb3BvcnRpb247XCIsXCLiqbRcIjpcIiZDb2xvbmU7XCIsXCLiiaFcIjpcIiZlcXVpdjtcIixcIuKIr1wiOlwiJkRvdWJsZUNvbnRvdXJJbnRlZ3JhbDtcIixcIuKIrlwiOlwiJm9pbnQ7XCIsXCLihIJcIjpcIiZjb21wbGV4ZXM7XCIsXCLiiJBcIjpcIiZjb3Byb2Q7XCIsXCLiiLNcIjpcIiZhd2NvbmludDtcIixcIuKor1wiOlwiJkNyb3NzO1wiLFwi8J2SnlwiOlwiJkNzY3I7XCIsXCLii5NcIjpcIiZDdXA7XCIsXCLiiY1cIjpcIiZhc3ltcGVxO1wiLFwi4qSRXCI6XCImRERvdHJhaGQ7XCIsXCLQglwiOlwiJkRKY3k7XCIsXCLQhVwiOlwiJkRTY3k7XCIsXCLQj1wiOlwiJkRaY3k7XCIsXCLigKFcIjpcIiZkZGFnZ2VyO1wiLFwi4oahXCI6XCImRGFycjtcIixcIuKrpFwiOlwiJkRvdWJsZUxlZnRUZWU7XCIsXCLEjlwiOlwiJkRjYXJvbjtcIixcItCUXCI6XCImRGN5O1wiLFwi4oiHXCI6XCImbmFibGE7XCIsXCLOlFwiOlwiJkRlbHRhO1wiLFwi8J2Uh1wiOlwiJkRmcjtcIixcIsK0XCI6XCImYWN1dGU7XCIsXCLLmVwiOlwiJmRvdDtcIixcIsudXCI6XCImZGJsYWM7XCIsXCJgXCI6XCImZ3JhdmU7XCIsXCLLnFwiOlwiJnRpbGRlO1wiLFwi4ouEXCI6XCImZGlhbW9uZDtcIixcIuKFhlwiOlwiJmRkO1wiLFwi8J2Uu1wiOlwiJkRvcGY7XCIsXCLCqFwiOlwiJnVtbDtcIixcIuKDnFwiOlwiJkRvdERvdDtcIixcIuKJkFwiOlwiJmVzZG90O1wiLFwi4oeTXCI6XCImZEFycjtcIixcIuKHkFwiOlwiJmxBcnI7XCIsXCLih5RcIjpcIiZpZmY7XCIsXCLin7hcIjpcIiZ4bEFycjtcIixcIuKfulwiOlwiJnhoQXJyO1wiLFwi4p+5XCI6XCImeHJBcnI7XCIsXCLih5JcIjpcIiZyQXJyO1wiLFwi4oqoXCI6XCImdkRhc2g7XCIsXCLih5FcIjpcIiZ1QXJyO1wiLFwi4oeVXCI6XCImdkFycjtcIixcIuKIpVwiOlwiJnNwYXI7XCIsXCLihpNcIjpcIiZkb3duYXJyb3c7XCIsXCLipJNcIjpcIiZEb3duQXJyb3dCYXI7XCIsXCLih7VcIjpcIiZkdWFycjtcIixcIsyRXCI6XCImRG93bkJyZXZlO1wiLFwi4qWQXCI6XCImRG93bkxlZnRSaWdodFZlY3RvcjtcIixcIuKlnlwiOlwiJkRvd25MZWZ0VGVlVmVjdG9yO1wiLFwi4oa9XCI6XCImbGhhcmQ7XCIsXCLipZZcIjpcIiZEb3duTGVmdFZlY3RvckJhcjtcIixcIuKln1wiOlwiJkRvd25SaWdodFRlZVZlY3RvcjtcIixcIuKHgVwiOlwiJnJpZ2h0aGFycG9vbmRvd247XCIsXCLipZdcIjpcIiZEb3duUmlnaHRWZWN0b3JCYXI7XCIsXCLiiqRcIjpcIiZ0b3A7XCIsXCLihqdcIjpcIiZtYXBzdG9kb3duO1wiLFwi8J2Sn1wiOlwiJkRzY3I7XCIsXCLEkFwiOlwiJkRzdHJvaztcIixcIsWKXCI6XCImRU5HO1wiLFwiw5BcIjpcIiZFVEg7XCIsXCLDiVwiOlwiJkVhY3V0ZTtcIixcIsSaXCI6XCImRWNhcm9uO1wiLFwiw4pcIjpcIiZFY2lyYztcIixcItCtXCI6XCImRWN5O1wiLFwixJZcIjpcIiZFZG90O1wiLFwi8J2UiFwiOlwiJkVmcjtcIixcIsOIXCI6XCImRWdyYXZlO1wiLFwi4oiIXCI6XCImaXNpbnY7XCIsXCLEklwiOlwiJkVtYWNyO1wiLFwi4pe7XCI6XCImRW1wdHlTbWFsbFNxdWFyZTtcIixcIuKWq1wiOlwiJkVtcHR5VmVyeVNtYWxsU3F1YXJlO1wiLFwixJhcIjpcIiZFb2dvbjtcIixcIvCdlLxcIjpcIiZFb3BmO1wiLFwizpVcIjpcIiZFcHNpbG9uO1wiLFwi4qm1XCI6XCImRXF1YWw7XCIsXCLiiYJcIjpcIiZlc2ltO1wiLFwi4oeMXCI6XCImcmxoYXI7XCIsXCLihLBcIjpcIiZleHBlY3RhdGlvbjtcIixcIuKps1wiOlwiJkVzaW07XCIsXCLOl1wiOlwiJkV0YTtcIixcIsOLXCI6XCImRXVtbDtcIixcIuKIg1wiOlwiJmV4aXN0O1wiLFwi4oWHXCI6XCImZXhwb25lbnRpYWxlO1wiLFwi0KRcIjpcIiZGY3k7XCIsXCLwnZSJXCI6XCImRmZyO1wiLFwi4pe8XCI6XCImRmlsbGVkU21hbGxTcXVhcmU7XCIsXCLilqpcIjpcIiZzcXVmO1wiLFwi8J2UvVwiOlwiJkZvcGY7XCIsXCLiiIBcIjpcIiZmb3JhbGw7XCIsXCLihLFcIjpcIiZGc2NyO1wiLFwi0INcIjpcIiZHSmN5O1wiLFwiPlwiOlwiJmd0O1wiLFwizpNcIjpcIiZHYW1tYTtcIixcIs+cXCI6XCImR2FtbWFkO1wiLFwixJ5cIjpcIiZHYnJldmU7XCIsXCLEolwiOlwiJkdjZWRpbDtcIixcIsScXCI6XCImR2NpcmM7XCIsXCLQk1wiOlwiJkdjeTtcIixcIsSgXCI6XCImR2RvdDtcIixcIvCdlIpcIjpcIiZHZnI7XCIsXCLii5lcIjpcIiZnZ2c7XCIsXCLwnZS+XCI6XCImR29wZjtcIixcIuKJpVwiOlwiJmdlcTtcIixcIuKLm1wiOlwiJmd0cmVxbGVzcztcIixcIuKJp1wiOlwiJmdlcXE7XCIsXCLiqqJcIjpcIiZHcmVhdGVyR3JlYXRlcjtcIixcIuKJt1wiOlwiJmd0cmxlc3M7XCIsXCLiqb5cIjpcIiZnZXM7XCIsXCLiibNcIjpcIiZndHJzaW07XCIsXCLwnZKiXCI6XCImR3NjcjtcIixcIuKJq1wiOlwiJmdnO1wiLFwi0KpcIjpcIiZIQVJEY3k7XCIsXCLLh1wiOlwiJmNhcm9uO1wiLFwiXlwiOlwiJkhhdDtcIixcIsSkXCI6XCImSGNpcmM7XCIsXCLihIxcIjpcIiZQb2luY2FyZXBsYW5lO1wiLFwi4oSLXCI6XCImaGFtaWx0O1wiLFwi4oSNXCI6XCImcXVhdGVybmlvbnM7XCIsXCLilIBcIjpcIiZib3hoO1wiLFwixKZcIjpcIiZIc3Ryb2s7XCIsXCLiiY9cIjpcIiZidW1wZXE7XCIsXCLQlVwiOlwiJklFY3k7XCIsXCLEslwiOlwiJklKbGlnO1wiLFwi0IFcIjpcIiZJT2N5O1wiLFwiw41cIjpcIiZJYWN1dGU7XCIsXCLDjlwiOlwiJkljaXJjO1wiLFwi0JhcIjpcIiZJY3k7XCIsXCLEsFwiOlwiJklkb3Q7XCIsXCLihJFcIjpcIiZpbWFncGFydDtcIixcIsOMXCI6XCImSWdyYXZlO1wiLFwixKpcIjpcIiZJbWFjcjtcIixcIuKFiFwiOlwiJmlpO1wiLFwi4oisXCI6XCImSW50O1wiLFwi4oirXCI6XCImaW50O1wiLFwi4ouCXCI6XCImeGNhcDtcIixcIuKBo1wiOlwiJmljO1wiLFwi4oGiXCI6XCImaXQ7XCIsXCLErlwiOlwiJklvZ29uO1wiLFwi8J2VgFwiOlwiJklvcGY7XCIsXCLOmVwiOlwiJklvdGE7XCIsXCLihJBcIjpcIiZpbWFnbGluZTtcIixcIsSoXCI6XCImSXRpbGRlO1wiLFwi0IZcIjpcIiZJdWtjeTtcIixcIsOPXCI6XCImSXVtbDtcIixcIsS0XCI6XCImSmNpcmM7XCIsXCLQmVwiOlwiJkpjeTtcIixcIvCdlI1cIjpcIiZKZnI7XCIsXCLwnZWBXCI6XCImSm9wZjtcIixcIvCdkqVcIjpcIiZKc2NyO1wiLFwi0IhcIjpcIiZKc2VyY3k7XCIsXCLQhFwiOlwiJkp1a2N5O1wiLFwi0KVcIjpcIiZLSGN5O1wiLFwi0IxcIjpcIiZLSmN5O1wiLFwizppcIjpcIiZLYXBwYTtcIixcIsS2XCI6XCImS2NlZGlsO1wiLFwi0JpcIjpcIiZLY3k7XCIsXCLwnZSOXCI6XCImS2ZyO1wiLFwi8J2VglwiOlwiJktvcGY7XCIsXCLwnZKmXCI6XCImS3NjcjtcIixcItCJXCI6XCImTEpjeTtcIixcIjxcIjpcIiZsdDtcIixcIsS5XCI6XCImTGFjdXRlO1wiLFwizptcIjpcIiZMYW1iZGE7XCIsXCLin6pcIjpcIiZMYW5nO1wiLFwi4oSSXCI6XCImbGFncmFuO1wiLFwi4oaeXCI6XCImdHdvaGVhZGxlZnRhcnJvdztcIixcIsS9XCI6XCImTGNhcm9uO1wiLFwixLtcIjpcIiZMY2VkaWw7XCIsXCLQm1wiOlwiJkxjeTtcIixcIuKfqFwiOlwiJmxhbmdsZTtcIixcIuKGkFwiOlwiJnNsYXJyO1wiLFwi4oekXCI6XCImbGFycmI7XCIsXCLih4ZcIjpcIiZscmFycjtcIixcIuKMiFwiOlwiJmxjZWlsO1wiLFwi4p+mXCI6XCImbG9icms7XCIsXCLipaFcIjpcIiZMZWZ0RG93blRlZVZlY3RvcjtcIixcIuKHg1wiOlwiJmRvd25oYXJwb29ubGVmdDtcIixcIuKlmVwiOlwiJkxlZnREb3duVmVjdG9yQmFyO1wiLFwi4oyKXCI6XCImbGZsb29yO1wiLFwi4oaUXCI6XCImbGVmdHJpZ2h0YXJyb3c7XCIsXCLipY5cIjpcIiZMZWZ0UmlnaHRWZWN0b3I7XCIsXCLiiqNcIjpcIiZkYXNodjtcIixcIuKGpFwiOlwiJm1hcHN0b2xlZnQ7XCIsXCLipZpcIjpcIiZMZWZ0VGVlVmVjdG9yO1wiLFwi4oqyXCI6XCImdmx0cmk7XCIsXCLip49cIjpcIiZMZWZ0VHJpYW5nbGVCYXI7XCIsXCLiirRcIjpcIiZ0cmlhbmdsZWxlZnRlcTtcIixcIuKlkVwiOlwiJkxlZnRVcERvd25WZWN0b3I7XCIsXCLipaBcIjpcIiZMZWZ0VXBUZWVWZWN0b3I7XCIsXCLihr9cIjpcIiZ1cGhhcnBvb25sZWZ0O1wiLFwi4qWYXCI6XCImTGVmdFVwVmVjdG9yQmFyO1wiLFwi4oa8XCI6XCImbGhhcnU7XCIsXCLipZJcIjpcIiZMZWZ0VmVjdG9yQmFyO1wiLFwi4ouaXCI6XCImbGVzc2VxZ3RyO1wiLFwi4ommXCI6XCImbGVxcTtcIixcIuKJtlwiOlwiJmxnO1wiLFwi4qqhXCI6XCImTGVzc0xlc3M7XCIsXCLiqb1cIjpcIiZsZXM7XCIsXCLiibJcIjpcIiZsc2ltO1wiLFwi8J2Uj1wiOlwiJkxmcjtcIixcIuKLmFwiOlwiJkxsO1wiLFwi4oeaXCI6XCImbEFhcnI7XCIsXCLEv1wiOlwiJkxtaWRvdDtcIixcIuKftVwiOlwiJnhsYXJyO1wiLFwi4p+3XCI6XCImeGhhcnI7XCIsXCLin7ZcIjpcIiZ4cmFycjtcIixcIvCdlYNcIjpcIiZMb3BmO1wiLFwi4oaZXCI6XCImc3dhcnJvdztcIixcIuKGmFwiOlwiJnNlYXJyb3c7XCIsXCLihrBcIjpcIiZsc2g7XCIsXCLFgVwiOlwiJkxzdHJvaztcIixcIuKJqlwiOlwiJmxsO1wiLFwi4qSFXCI6XCImTWFwO1wiLFwi0JxcIjpcIiZNY3k7XCIsXCLigZ9cIjpcIiZNZWRpdW1TcGFjZTtcIixcIuKEs1wiOlwiJnBobW1hdDtcIixcIvCdlJBcIjpcIiZNZnI7XCIsXCLiiJNcIjpcIiZtcDtcIixcIvCdlYRcIjpcIiZNb3BmO1wiLFwizpxcIjpcIiZNdTtcIixcItCKXCI6XCImTkpjeTtcIixcIsWDXCI6XCImTmFjdXRlO1wiLFwixYdcIjpcIiZOY2Fyb247XCIsXCLFhVwiOlwiJk5jZWRpbDtcIixcItCdXCI6XCImTmN5O1wiLFwi4oCLXCI6XCImWmVyb1dpZHRoU3BhY2U7XCIsXCJcXG5cIjpcIiZOZXdMaW5lO1wiLFwi8J2UkVwiOlwiJk5mcjtcIixcIuKBoFwiOlwiJk5vQnJlYWs7XCIsXCLCoFwiOlwiJm5ic3A7XCIsXCLihJVcIjpcIiZuYXR1cmFscztcIixcIuKrrFwiOlwiJk5vdDtcIixcIuKJolwiOlwiJm5lcXVpdjtcIixcIuKJrVwiOlwiJk5vdEN1cENhcDtcIixcIuKIplwiOlwiJm5zcGFyO1wiLFwi4oiJXCI6XCImbm90aW52YTtcIixcIuKJoFwiOlwiJm5lO1wiLFwi4omCzLhcIjpcIiZuZXNpbTtcIixcIuKIhFwiOlwiJm5leGlzdHM7XCIsXCLiia9cIjpcIiZuZ3RyO1wiLFwi4omxXCI6XCImbmdlcTtcIixcIuKJp8y4XCI6XCImbmdlcXE7XCIsXCLiiavMuFwiOlwiJm5HdHY7XCIsXCLiiblcIjpcIiZudGdsO1wiLFwi4qm+zLhcIjpcIiZuZ2VzO1wiLFwi4om1XCI6XCImbmdzaW07XCIsXCLiiY7MuFwiOlwiJm5idW1wO1wiLFwi4omPzLhcIjpcIiZuYnVtcGU7XCIsXCLii6pcIjpcIiZudHJpYW5nbGVsZWZ0O1wiLFwi4qePzLhcIjpcIiZOb3RMZWZ0VHJpYW5nbGVCYXI7XCIsXCLii6xcIjpcIiZudHJpYW5nbGVsZWZ0ZXE7XCIsXCLiia5cIjpcIiZubHQ7XCIsXCLiibBcIjpcIiZubGVxO1wiLFwi4om4XCI6XCImbnRsZztcIixcIuKJqsy4XCI6XCImbkx0djtcIixcIuKpvcy4XCI6XCImbmxlcztcIixcIuKJtFwiOlwiJm5sc2ltO1wiLFwi4qqizLhcIjpcIiZOb3ROZXN0ZWRHcmVhdGVyR3JlYXRlcjtcIixcIuKqocy4XCI6XCImTm90TmVzdGVkTGVzc0xlc3M7XCIsXCLiioBcIjpcIiZucHJlYztcIixcIuKqr8y4XCI6XCImbnByZWNlcTtcIixcIuKLoFwiOlwiJm5wcmN1ZTtcIixcIuKIjFwiOlwiJm5vdG5pdmE7XCIsXCLii6tcIjpcIiZudHJpYW5nbGVyaWdodDtcIixcIuKnkMy4XCI6XCImTm90UmlnaHRUcmlhbmdsZUJhcjtcIixcIuKLrVwiOlwiJm50cmlhbmdsZXJpZ2h0ZXE7XCIsXCLiio/MuFwiOlwiJk5vdFNxdWFyZVN1YnNldDtcIixcIuKLolwiOlwiJm5zcXN1YmU7XCIsXCLiipDMuFwiOlwiJk5vdFNxdWFyZVN1cGVyc2V0O1wiLFwi4oujXCI6XCImbnNxc3VwZTtcIixcIuKKguKDklwiOlwiJnZuc3ViO1wiLFwi4oqIXCI6XCImbnN1YnNldGVxO1wiLFwi4oqBXCI6XCImbnN1Y2M7XCIsXCLiqrDMuFwiOlwiJm5zdWNjZXE7XCIsXCLii6FcIjpcIiZuc2NjdWU7XCIsXCLiib/MuFwiOlwiJk5vdFN1Y2NlZWRzVGlsZGU7XCIsXCLiioPig5JcIjpcIiZ2bnN1cDtcIixcIuKKiVwiOlwiJm5zdXBzZXRlcTtcIixcIuKJgVwiOlwiJm5zaW07XCIsXCLiiYRcIjpcIiZuc2ltZXE7XCIsXCLiiYdcIjpcIiZuY29uZztcIixcIuKJiVwiOlwiJm5hcHByb3g7XCIsXCLiiKRcIjpcIiZuc21pZDtcIixcIvCdkqlcIjpcIiZOc2NyO1wiLFwiw5FcIjpcIiZOdGlsZGU7XCIsXCLOnVwiOlwiJk51O1wiLFwixZJcIjpcIiZPRWxpZztcIixcIsOTXCI6XCImT2FjdXRlO1wiLFwiw5RcIjpcIiZPY2lyYztcIixcItCeXCI6XCImT2N5O1wiLFwixZBcIjpcIiZPZGJsYWM7XCIsXCLwnZSSXCI6XCImT2ZyO1wiLFwiw5JcIjpcIiZPZ3JhdmU7XCIsXCLFjFwiOlwiJk9tYWNyO1wiLFwizqlcIjpcIiZvaG07XCIsXCLOn1wiOlwiJk9taWNyb247XCIsXCLwnZWGXCI6XCImT29wZjtcIixcIuKAnFwiOlwiJmxkcXVvO1wiLFwi4oCYXCI6XCImbHNxdW87XCIsXCLiqZRcIjpcIiZPcjtcIixcIvCdkqpcIjpcIiZPc2NyO1wiLFwiw5hcIjpcIiZPc2xhc2g7XCIsXCLDlVwiOlwiJk90aWxkZTtcIixcIuKot1wiOlwiJk90aW1lcztcIixcIsOWXCI6XCImT3VtbDtcIixcIuKAvlwiOlwiJm9saW5lO1wiLFwi4o+eXCI6XCImT3ZlckJyYWNlO1wiLFwi4o60XCI6XCImdGJyaztcIixcIuKPnFwiOlwiJk92ZXJQYXJlbnRoZXNpcztcIixcIuKIglwiOlwiJnBhcnQ7XCIsXCLQn1wiOlwiJlBjeTtcIixcIvCdlJNcIjpcIiZQZnI7XCIsXCLOplwiOlwiJlBoaTtcIixcIs6gXCI6XCImUGk7XCIsXCLCsVwiOlwiJnBtO1wiLFwi4oSZXCI6XCImcHJpbWVzO1wiLFwi4qq7XCI6XCImUHI7XCIsXCLiibpcIjpcIiZwcmVjO1wiLFwi4qqvXCI6XCImcHJlY2VxO1wiLFwi4om8XCI6XCImcHJlY2N1cmx5ZXE7XCIsXCLiib5cIjpcIiZwcnNpbTtcIixcIuKAs1wiOlwiJlByaW1lO1wiLFwi4oiPXCI6XCImcHJvZDtcIixcIuKInVwiOlwiJnZwcm9wO1wiLFwi8J2Sq1wiOlwiJlBzY3I7XCIsXCLOqFwiOlwiJlBzaTtcIiwnXCInOlwiJnF1b3Q7XCIsXCLwnZSUXCI6XCImUWZyO1wiLFwi4oSaXCI6XCImcmF0aW9uYWxzO1wiLFwi8J2SrFwiOlwiJlFzY3I7XCIsXCLipJBcIjpcIiZkcmJrYXJvdztcIixcIsKuXCI6XCImcmVnO1wiLFwixZRcIjpcIiZSYWN1dGU7XCIsXCLin6tcIjpcIiZSYW5nO1wiLFwi4oagXCI6XCImdHdvaGVhZHJpZ2h0YXJyb3c7XCIsXCLipJZcIjpcIiZSYXJydGw7XCIsXCLFmFwiOlwiJlJjYXJvbjtcIixcIsWWXCI6XCImUmNlZGlsO1wiLFwi0KBcIjpcIiZSY3k7XCIsXCLihJxcIjpcIiZyZWFscGFydDtcIixcIuKIi1wiOlwiJm5pdjtcIixcIuKHi1wiOlwiJmxyaGFyO1wiLFwi4qWvXCI6XCImZHVoYXI7XCIsXCLOoVwiOlwiJlJobztcIixcIuKfqVwiOlwiJnJhbmdsZTtcIixcIuKGklwiOlwiJnNyYXJyO1wiLFwi4oelXCI6XCImcmFycmI7XCIsXCLih4RcIjpcIiZybGFycjtcIixcIuKMiVwiOlwiJnJjZWlsO1wiLFwi4p+nXCI6XCImcm9icms7XCIsXCLipZ1cIjpcIiZSaWdodERvd25UZWVWZWN0b3I7XCIsXCLih4JcIjpcIiZkb3duaGFycG9vbnJpZ2h0O1wiLFwi4qWVXCI6XCImUmlnaHREb3duVmVjdG9yQmFyO1wiLFwi4oyLXCI6XCImcmZsb29yO1wiLFwi4oqiXCI6XCImdmRhc2g7XCIsXCLihqZcIjpcIiZtYXBzdG87XCIsXCLipZtcIjpcIiZSaWdodFRlZVZlY3RvcjtcIixcIuKKs1wiOlwiJnZydHJpO1wiLFwi4qeQXCI6XCImUmlnaHRUcmlhbmdsZUJhcjtcIixcIuKKtVwiOlwiJnRyaWFuZ2xlcmlnaHRlcTtcIixcIuKlj1wiOlwiJlJpZ2h0VXBEb3duVmVjdG9yO1wiLFwi4qWcXCI6XCImUmlnaHRVcFRlZVZlY3RvcjtcIixcIuKGvlwiOlwiJnVwaGFycG9vbnJpZ2h0O1wiLFwi4qWUXCI6XCImUmlnaHRVcFZlY3RvckJhcjtcIixcIuKHgFwiOlwiJnJpZ2h0aGFycG9vbnVwO1wiLFwi4qWTXCI6XCImUmlnaHRWZWN0b3JCYXI7XCIsXCLihJ1cIjpcIiZyZWFscztcIixcIuKlsFwiOlwiJlJvdW5kSW1wbGllcztcIixcIuKHm1wiOlwiJnJBYXJyO1wiLFwi4oSbXCI6XCImcmVhbGluZTtcIixcIuKGsVwiOlwiJnJzaDtcIixcIuKntFwiOlwiJlJ1bGVEZWxheWVkO1wiLFwi0KlcIjpcIiZTSENIY3k7XCIsXCLQqFwiOlwiJlNIY3k7XCIsXCLQrFwiOlwiJlNPRlRjeTtcIixcIsWaXCI6XCImU2FjdXRlO1wiLFwi4qq8XCI6XCImU2M7XCIsXCLFoFwiOlwiJlNjYXJvbjtcIixcIsWeXCI6XCImU2NlZGlsO1wiLFwixZxcIjpcIiZTY2lyYztcIixcItChXCI6XCImU2N5O1wiLFwi8J2UllwiOlwiJlNmcjtcIixcIuKGkVwiOlwiJnVwYXJyb3c7XCIsXCLOo1wiOlwiJlNpZ21hO1wiLFwi4oiYXCI6XCImY29tcGZuO1wiLFwi8J2VilwiOlwiJlNvcGY7XCIsXCLiiJpcIjpcIiZyYWRpYztcIixcIuKWoVwiOlwiJnNxdWFyZTtcIixcIuKKk1wiOlwiJnNxY2FwO1wiLFwi4oqPXCI6XCImc3FzdWJzZXQ7XCIsXCLiipFcIjpcIiZzcXN1YnNldGVxO1wiLFwi4oqQXCI6XCImc3FzdXBzZXQ7XCIsXCLiipJcIjpcIiZzcXN1cHNldGVxO1wiLFwi4oqUXCI6XCImc3FjdXA7XCIsXCLwnZKuXCI6XCImU3NjcjtcIixcIuKLhlwiOlwiJnNzdGFyZjtcIixcIuKLkFwiOlwiJlN1YnNldDtcIixcIuKKhlwiOlwiJnN1YnNldGVxO1wiLFwi4om7XCI6XCImc3VjYztcIixcIuKqsFwiOlwiJnN1Y2NlcTtcIixcIuKJvVwiOlwiJnN1Y2NjdXJseWVxO1wiLFwi4om/XCI6XCImc3VjY3NpbTtcIixcIuKIkVwiOlwiJnN1bTtcIixcIuKLkVwiOlwiJlN1cHNldDtcIixcIuKKg1wiOlwiJnN1cHNldDtcIixcIuKKh1wiOlwiJnN1cHNldGVxO1wiLFwiw55cIjpcIiZUSE9STjtcIixcIuKEolwiOlwiJnRyYWRlO1wiLFwi0ItcIjpcIiZUU0hjeTtcIixcItCmXCI6XCImVFNjeTtcIixcIlxcdFwiOlwiJlRhYjtcIixcIs6kXCI6XCImVGF1O1wiLFwixaRcIjpcIiZUY2Fyb247XCIsXCLFolwiOlwiJlRjZWRpbDtcIixcItCiXCI6XCImVGN5O1wiLFwi8J2Ul1wiOlwiJlRmcjtcIixcIuKItFwiOlwiJnRoZXJlZm9yZTtcIixcIs6YXCI6XCImVGhldGE7XCIsXCLigZ/igIpcIjpcIiZUaGlja1NwYWNlO1wiLFwi4oCJXCI6XCImdGhpbnNwO1wiLFwi4oi8XCI6XCImdGhrc2ltO1wiLFwi4omDXCI6XCImc2ltZXE7XCIsXCLiiYVcIjpcIiZjb25nO1wiLFwi4omIXCI6XCImdGhrYXA7XCIsXCLwnZWLXCI6XCImVG9wZjtcIixcIuKDm1wiOlwiJnRkb3Q7XCIsXCLwnZKvXCI6XCImVHNjcjtcIixcIsWmXCI6XCImVHN0cm9rO1wiLFwiw5pcIjpcIiZVYWN1dGU7XCIsXCLihp9cIjpcIiZVYXJyO1wiLFwi4qWJXCI6XCImVWFycm9jaXI7XCIsXCLQjlwiOlwiJlVicmN5O1wiLFwixaxcIjpcIiZVYnJldmU7XCIsXCLDm1wiOlwiJlVjaXJjO1wiLFwi0KNcIjpcIiZVY3k7XCIsXCLFsFwiOlwiJlVkYmxhYztcIixcIvCdlJhcIjpcIiZVZnI7XCIsXCLDmVwiOlwiJlVncmF2ZTtcIixcIsWqXCI6XCImVW1hY3I7XCIsXzpcIiZsb3diYXI7XCIsXCLij59cIjpcIiZVbmRlckJyYWNlO1wiLFwi4o61XCI6XCImYmJyaztcIixcIuKPnVwiOlwiJlVuZGVyUGFyZW50aGVzaXM7XCIsXCLii4NcIjpcIiZ4Y3VwO1wiLFwi4oqOXCI6XCImdXBsdXM7XCIsXCLFslwiOlwiJlVvZ29uO1wiLFwi8J2VjFwiOlwiJlVvcGY7XCIsXCLipJJcIjpcIiZVcEFycm93QmFyO1wiLFwi4oeFXCI6XCImdWRhcnI7XCIsXCLihpVcIjpcIiZ2YXJyO1wiLFwi4qWuXCI6XCImdWRoYXI7XCIsXCLiiqVcIjpcIiZwZXJwO1wiLFwi4oalXCI6XCImbWFwc3RvdXA7XCIsXCLihpZcIjpcIiZud2Fycm93O1wiLFwi4oaXXCI6XCImbmVhcnJvdztcIixcIs+SXCI6XCImdXBzaWg7XCIsXCLOpVwiOlwiJlVwc2lsb247XCIsXCLFrlwiOlwiJlVyaW5nO1wiLFwi8J2SsFwiOlwiJlVzY3I7XCIsXCLFqFwiOlwiJlV0aWxkZTtcIixcIsOcXCI6XCImVXVtbDtcIixcIuKKq1wiOlwiJlZEYXNoO1wiLFwi4qurXCI6XCImVmJhcjtcIixcItCSXCI6XCImVmN5O1wiLFwi4oqpXCI6XCImVmRhc2g7XCIsXCLiq6ZcIjpcIiZWZGFzaGw7XCIsXCLii4FcIjpcIiZ4dmVlO1wiLFwi4oCWXCI6XCImVmVydDtcIixcIuKIo1wiOlwiJnNtaWQ7XCIsXCJ8XCI6XCImdmVydDtcIixcIuKdmFwiOlwiJlZlcnRpY2FsU2VwYXJhdG9yO1wiLFwi4omAXCI6XCImd3JlYXRoO1wiLFwi4oCKXCI6XCImaGFpcnNwO1wiLFwi8J2UmVwiOlwiJlZmcjtcIixcIvCdlY1cIjpcIiZWb3BmO1wiLFwi8J2SsVwiOlwiJlZzY3I7XCIsXCLiiqpcIjpcIiZWdmRhc2g7XCIsXCLFtFwiOlwiJldjaXJjO1wiLFwi4ouAXCI6XCImeHdlZGdlO1wiLFwi8J2UmlwiOlwiJldmcjtcIixcIvCdlY5cIjpcIiZXb3BmO1wiLFwi8J2SslwiOlwiJldzY3I7XCIsXCLwnZSbXCI6XCImWGZyO1wiLFwizp5cIjpcIiZYaTtcIixcIvCdlY9cIjpcIiZYb3BmO1wiLFwi8J2Ss1wiOlwiJlhzY3I7XCIsXCLQr1wiOlwiJllBY3k7XCIsXCLQh1wiOlwiJllJY3k7XCIsXCLQrlwiOlwiJllVY3k7XCIsXCLDnVwiOlwiJllhY3V0ZTtcIixcIsW2XCI6XCImWWNpcmM7XCIsXCLQq1wiOlwiJlljeTtcIixcIvCdlJxcIjpcIiZZZnI7XCIsXCLwnZWQXCI6XCImWW9wZjtcIixcIvCdkrRcIjpcIiZZc2NyO1wiLFwixbhcIjpcIiZZdW1sO1wiLFwi0JZcIjpcIiZaSGN5O1wiLFwixblcIjpcIiZaYWN1dGU7XCIsXCLFvVwiOlwiJlpjYXJvbjtcIixcItCXXCI6XCImWmN5O1wiLFwixbtcIjpcIiZaZG90O1wiLFwizpZcIjpcIiZaZXRhO1wiLFwi4oSoXCI6XCImemVldHJmO1wiLFwi4oSkXCI6XCImaW50ZWdlcnM7XCIsXCLwnZK1XCI6XCImWnNjcjtcIixcIsOhXCI6XCImYWFjdXRlO1wiLFwixINcIjpcIiZhYnJldmU7XCIsXCLiiL5cIjpcIiZtc3Rwb3M7XCIsXCLiiL7Ms1wiOlwiJmFjRTtcIixcIuKIv1wiOlwiJmFjZDtcIixcIsOiXCI6XCImYWNpcmM7XCIsXCLQsFwiOlwiJmFjeTtcIixcIsOmXCI6XCImYWVsaWc7XCIsXCLwnZSeXCI6XCImYWZyO1wiLFwiw6BcIjpcIiZhZ3JhdmU7XCIsXCLihLVcIjpcIiZhbGVwaDtcIixcIs6xXCI6XCImYWxwaGE7XCIsXCLEgVwiOlwiJmFtYWNyO1wiLFwi4qi/XCI6XCImYW1hbGc7XCIsXCLiiKdcIjpcIiZ3ZWRnZTtcIixcIuKplVwiOlwiJmFuZGFuZDtcIixcIuKpnFwiOlwiJmFuZGQ7XCIsXCLiqZhcIjpcIiZhbmRzbG9wZTtcIixcIuKpmlwiOlwiJmFuZHY7XCIsXCLiiKBcIjpcIiZhbmdsZTtcIixcIuKmpFwiOlwiJmFuZ2U7XCIsXCLiiKFcIjpcIiZtZWFzdXJlZGFuZ2xlO1wiLFwi4qaoXCI6XCImYW5nbXNkYWE7XCIsXCLipqlcIjpcIiZhbmdtc2RhYjtcIixcIuKmqlwiOlwiJmFuZ21zZGFjO1wiLFwi4qarXCI6XCImYW5nbXNkYWQ7XCIsXCLipqxcIjpcIiZhbmdtc2RhZTtcIixcIuKmrVwiOlwiJmFuZ21zZGFmO1wiLFwi4qauXCI6XCImYW5nbXNkYWc7XCIsXCLipq9cIjpcIiZhbmdtc2RhaDtcIixcIuKIn1wiOlwiJmFuZ3J0O1wiLFwi4oq+XCI6XCImYW5ncnR2YjtcIixcIuKmnVwiOlwiJmFuZ3J0dmJkO1wiLFwi4oiiXCI6XCImYW5nc3BoO1wiLFwi4o28XCI6XCImYW5nemFycjtcIixcIsSFXCI6XCImYW9nb247XCIsXCLwnZWSXCI6XCImYW9wZjtcIixcIuKpsFwiOlwiJmFwRTtcIixcIuKpr1wiOlwiJmFwYWNpcjtcIixcIuKJilwiOlwiJmFwcHJveGVxO1wiLFwi4omLXCI6XCImYXBpZDtcIixcIidcIjpcIiZhcG9zO1wiLFwiw6VcIjpcIiZhcmluZztcIixcIvCdkrZcIjpcIiZhc2NyO1wiLFwiKlwiOlwiJm1pZGFzdDtcIixcIsOjXCI6XCImYXRpbGRlO1wiLFwiw6RcIjpcIiZhdW1sO1wiLFwi4qiRXCI6XCImYXdpbnQ7XCIsXCLiq61cIjpcIiZiTm90O1wiLFwi4omMXCI6XCImYmNvbmc7XCIsXCLPtlwiOlwiJmJlcHNpO1wiLFwi4oC1XCI6XCImYnByaW1lO1wiLFwi4oi9XCI6XCImYnNpbTtcIixcIuKLjVwiOlwiJmJzaW1lO1wiLFwi4oq9XCI6XCImYmFydmVlO1wiLFwi4oyFXCI6XCImYmFyd2VkZ2U7XCIsXCLijrZcIjpcIiZiYnJrdGJyaztcIixcItCxXCI6XCImYmN5O1wiLFwi4oCeXCI6XCImbGRxdW9yO1wiLFwi4qawXCI6XCImYmVtcHR5djtcIixcIs6yXCI6XCImYmV0YTtcIixcIuKEtlwiOlwiJmJldGg7XCIsXCLiiaxcIjpcIiZ0d2l4dDtcIixcIvCdlJ9cIjpcIiZiZnI7XCIsXCLil69cIjpcIiZ4Y2lyYztcIixcIuKogFwiOlwiJnhvZG90O1wiLFwi4qiBXCI6XCImeG9wbHVzO1wiLFwi4qiCXCI6XCImeG90aW1lO1wiLFwi4qiGXCI6XCImeHNxY3VwO1wiLFwi4piFXCI6XCImc3RhcmY7XCIsXCLilr1cIjpcIiZ4ZHRyaTtcIixcIuKWs1wiOlwiJnh1dHJpO1wiLFwi4qiEXCI6XCImeHVwbHVzO1wiLFwi4qSNXCI6XCImcmJhcnI7XCIsXCLip6tcIjpcIiZsb3pmO1wiLFwi4pa0XCI6XCImdXRyaWY7XCIsXCLilr5cIjpcIiZkdHJpZjtcIixcIuKXglwiOlwiJmx0cmlmO1wiLFwi4pa4XCI6XCImcnRyaWY7XCIsXCLikKNcIjpcIiZibGFuaztcIixcIuKWklwiOlwiJmJsazEyO1wiLFwi4paRXCI6XCImYmxrMTQ7XCIsXCLilpNcIjpcIiZibGszNDtcIixcIuKWiFwiOlwiJmJsb2NrO1wiLFwiPeKDpVwiOlwiJmJuZTtcIixcIuKJoeKDpVwiOlwiJmJuZXF1aXY7XCIsXCLijJBcIjpcIiZibm90O1wiLFwi8J2Vk1wiOlwiJmJvcGY7XCIsXCLii4hcIjpcIiZib3d0aWU7XCIsXCLilZdcIjpcIiZib3hETDtcIixcIuKVlFwiOlwiJmJveERSO1wiLFwi4pWWXCI6XCImYm94RGw7XCIsXCLilZNcIjpcIiZib3hEcjtcIixcIuKVkFwiOlwiJmJveEg7XCIsXCLilaZcIjpcIiZib3hIRDtcIixcIuKVqVwiOlwiJmJveEhVO1wiLFwi4pWkXCI6XCImYm94SGQ7XCIsXCLiladcIjpcIiZib3hIdTtcIixcIuKVnVwiOlwiJmJveFVMO1wiLFwi4pWaXCI6XCImYm94VVI7XCIsXCLilZxcIjpcIiZib3hVbDtcIixcIuKVmVwiOlwiJmJveFVyO1wiLFwi4pWRXCI6XCImYm94VjtcIixcIuKVrFwiOlwiJmJveFZIO1wiLFwi4pWjXCI6XCImYm94Vkw7XCIsXCLilaBcIjpcIiZib3hWUjtcIixcIuKVq1wiOlwiJmJveFZoO1wiLFwi4pWiXCI6XCImYm94Vmw7XCIsXCLilZ9cIjpcIiZib3hWcjtcIixcIuKniVwiOlwiJmJveGJveDtcIixcIuKVlVwiOlwiJmJveGRMO1wiLFwi4pWSXCI6XCImYm94ZFI7XCIsXCLilJBcIjpcIiZib3hkbDtcIixcIuKUjFwiOlwiJmJveGRyO1wiLFwi4pWlXCI6XCImYm94aEQ7XCIsXCLilahcIjpcIiZib3hoVTtcIixcIuKUrFwiOlwiJmJveGhkO1wiLFwi4pS0XCI6XCImYm94aHU7XCIsXCLiip9cIjpcIiZtaW51c2I7XCIsXCLiip5cIjpcIiZwbHVzYjtcIixcIuKKoFwiOlwiJnRpbWVzYjtcIixcIuKVm1wiOlwiJmJveHVMO1wiLFwi4pWYXCI6XCImYm94dVI7XCIsXCLilJhcIjpcIiZib3h1bDtcIixcIuKUlFwiOlwiJmJveHVyO1wiLFwi4pSCXCI6XCImYm94djtcIixcIuKVqlwiOlwiJmJveHZIO1wiLFwi4pWhXCI6XCImYm94dkw7XCIsXCLilZ5cIjpcIiZib3h2UjtcIixcIuKUvFwiOlwiJmJveHZoO1wiLFwi4pSkXCI6XCImYm94dmw7XCIsXCLilJxcIjpcIiZib3h2cjtcIixcIsKmXCI6XCImYnJ2YmFyO1wiLFwi8J2St1wiOlwiJmJzY3I7XCIsXCLigY9cIjpcIiZic2VtaTtcIixcIlxcXFxcIjpcIiZic29sO1wiLFwi4qeFXCI6XCImYnNvbGI7XCIsXCLin4hcIjpcIiZic29saHN1YjtcIixcIuKAolwiOlwiJmJ1bGxldDtcIixcIuKqrlwiOlwiJmJ1bXBFO1wiLFwixIdcIjpcIiZjYWN1dGU7XCIsXCLiiKlcIjpcIiZjYXA7XCIsXCLiqYRcIjpcIiZjYXBhbmQ7XCIsXCLiqYlcIjpcIiZjYXBicmN1cDtcIixcIuKpi1wiOlwiJmNhcGNhcDtcIixcIuKph1wiOlwiJmNhcGN1cDtcIixcIuKpgFwiOlwiJmNhcGRvdDtcIixcIuKIqe+4gFwiOlwiJmNhcHM7XCIsXCLigYFcIjpcIiZjYXJldDtcIixcIuKpjVwiOlwiJmNjYXBzO1wiLFwixI1cIjpcIiZjY2Fyb247XCIsXCLDp1wiOlwiJmNjZWRpbDtcIixcIsSJXCI6XCImY2NpcmM7XCIsXCLiqYxcIjpcIiZjY3VwcztcIixcIuKpkFwiOlwiJmNjdXBzc207XCIsXCLEi1wiOlwiJmNkb3Q7XCIsXCLiprJcIjpcIiZjZW1wdHl2O1wiLFwiwqJcIjpcIiZjZW50O1wiLFwi8J2UoFwiOlwiJmNmcjtcIixcItGHXCI6XCImY2hjeTtcIixcIuKck1wiOlwiJmNoZWNrbWFyaztcIixcIs+HXCI6XCImY2hpO1wiLFwi4peLXCI6XCImY2lyO1wiLFwi4qeDXCI6XCImY2lyRTtcIixcIsuGXCI6XCImY2lyYztcIixcIuKJl1wiOlwiJmNpcmU7XCIsXCLihrpcIjpcIiZvbGFycjtcIixcIuKGu1wiOlwiJm9yYXJyO1wiLFwi4pOIXCI6XCImb1M7XCIsXCLiiptcIjpcIiZvYXN0O1wiLFwi4oqaXCI6XCImb2NpcjtcIixcIuKKnVwiOlwiJm9kYXNoO1wiLFwi4qiQXCI6XCImY2lyZm5pbnQ7XCIsXCLiq69cIjpcIiZjaXJtaWQ7XCIsXCLip4JcIjpcIiZjaXJzY2lyO1wiLFwi4pmjXCI6XCImY2x1YnN1aXQ7XCIsXCI6XCI6XCImY29sb247XCIsXCIsXCI6XCImY29tbWE7XCIsXCJAXCI6XCImY29tbWF0O1wiLFwi4oiBXCI6XCImY29tcGxlbWVudDtcIixcIuKprVwiOlwiJmNvbmdkb3Q7XCIsXCLwnZWUXCI6XCImY29wZjtcIixcIuKEl1wiOlwiJmNvcHlzcjtcIixcIuKGtVwiOlwiJmNyYXJyO1wiLFwi4pyXXCI6XCImY3Jvc3M7XCIsXCLwnZK4XCI6XCImY3NjcjtcIixcIuKrj1wiOlwiJmNzdWI7XCIsXCLiq5FcIjpcIiZjc3ViZTtcIixcIuKrkFwiOlwiJmNzdXA7XCIsXCLiq5JcIjpcIiZjc3VwZTtcIixcIuKLr1wiOlwiJmN0ZG90O1wiLFwi4qS4XCI6XCImY3VkYXJybDtcIixcIuKktVwiOlwiJmN1ZGFycnI7XCIsXCLii55cIjpcIiZjdXJseWVxcHJlYztcIixcIuKLn1wiOlwiJmN1cmx5ZXFzdWNjO1wiLFwi4oa2XCI6XCImY3VydmVhcnJvd2xlZnQ7XCIsXCLipL1cIjpcIiZjdWxhcnJwO1wiLFwi4oiqXCI6XCImY3VwO1wiLFwi4qmIXCI6XCImY3VwYnJjYXA7XCIsXCLiqYZcIjpcIiZjdXBjYXA7XCIsXCLiqYpcIjpcIiZjdXBjdXA7XCIsXCLiio1cIjpcIiZjdXBkb3Q7XCIsXCLiqYVcIjpcIiZjdXBvcjtcIixcIuKIqu+4gFwiOlwiJmN1cHM7XCIsXCLihrdcIjpcIiZjdXJ2ZWFycm93cmlnaHQ7XCIsXCLipLxcIjpcIiZjdXJhcnJtO1wiLFwi4ouOXCI6XCImY3V2ZWU7XCIsXCLii49cIjpcIiZjdXdlZDtcIixcIsKkXCI6XCImY3VycmVuO1wiLFwi4oixXCI6XCImY3dpbnQ7XCIsXCLijK1cIjpcIiZjeWxjdHk7XCIsXCLipaVcIjpcIiZkSGFyO1wiLFwi4oCgXCI6XCImZGFnZ2VyO1wiLFwi4oS4XCI6XCImZGFsZXRoO1wiLFwi4oCQXCI6XCImaHlwaGVuO1wiLFwi4qSPXCI6XCImckJhcnI7XCIsXCLEj1wiOlwiJmRjYXJvbjtcIixcItC0XCI6XCImZGN5O1wiLFwi4oeKXCI6XCImZG93bmRvd25hcnJvd3M7XCIsXCLiqbdcIjpcIiZlRERvdDtcIixcIsKwXCI6XCImZGVnO1wiLFwizrRcIjpcIiZkZWx0YTtcIixcIuKmsVwiOlwiJmRlbXB0eXY7XCIsXCLipb9cIjpcIiZkZmlzaHQ7XCIsXCLwnZShXCI6XCImZGZyO1wiLFwi4pmmXCI6XCImZGlhbXM7XCIsXCLPnVwiOlwiJmdhbW1hZDtcIixcIuKLslwiOlwiJmRpc2luO1wiLFwiw7dcIjpcIiZkaXZpZGU7XCIsXCLii4dcIjpcIiZkaXZvbng7XCIsXCLRklwiOlwiJmRqY3k7XCIsXCLijJ5cIjpcIiZsbGNvcm5lcjtcIixcIuKMjVwiOlwiJmRsY3JvcDtcIiwkOlwiJmRvbGxhcjtcIixcIvCdlZVcIjpcIiZkb3BmO1wiLFwi4omRXCI6XCImZURvdDtcIixcIuKIuFwiOlwiJm1pbnVzZDtcIixcIuKIlFwiOlwiJnBsdXNkbztcIixcIuKKoVwiOlwiJnNkb3RiO1wiLFwi4oyfXCI6XCImbHJjb3JuZXI7XCIsXCLijIxcIjpcIiZkcmNyb3A7XCIsXCLwnZK5XCI6XCImZHNjcjtcIixcItGVXCI6XCImZHNjeTtcIixcIuKntlwiOlwiJmRzb2w7XCIsXCLEkVwiOlwiJmRzdHJvaztcIixcIuKLsVwiOlwiJmR0ZG90O1wiLFwi4pa/XCI6XCImdHJpYW5nbGVkb3duO1wiLFwi4qamXCI6XCImZHdhbmdsZTtcIixcItGfXCI6XCImZHpjeTtcIixcIuKfv1wiOlwiJmR6aWdyYXJyO1wiLFwiw6lcIjpcIiZlYWN1dGU7XCIsXCLiqa5cIjpcIiZlYXN0ZXI7XCIsXCLEm1wiOlwiJmVjYXJvbjtcIixcIuKJllwiOlwiJmVxY2lyYztcIixcIsOqXCI6XCImZWNpcmM7XCIsXCLiiZVcIjpcIiZlcWNvbG9uO1wiLFwi0Y1cIjpcIiZlY3k7XCIsXCLEl1wiOlwiJmVkb3Q7XCIsXCLiiZJcIjpcIiZmYWxsaW5nZG90c2VxO1wiLFwi8J2UolwiOlwiJmVmcjtcIixcIuKqmlwiOlwiJmVnO1wiLFwiw6hcIjpcIiZlZ3JhdmU7XCIsXCLiqpZcIjpcIiZlcXNsYW50Z3RyO1wiLFwi4qqYXCI6XCImZWdzZG90O1wiLFwi4qqZXCI6XCImZWw7XCIsXCLij6dcIjpcIiZlbGludGVycztcIixcIuKEk1wiOlwiJmVsbDtcIixcIuKqlVwiOlwiJmVxc2xhbnRsZXNzO1wiLFwi4qqXXCI6XCImZWxzZG90O1wiLFwixJNcIjpcIiZlbWFjcjtcIixcIuKIhVwiOlwiJnZhcm5vdGhpbmc7XCIsXCLigIRcIjpcIiZlbXNwMTM7XCIsXCLigIVcIjpcIiZlbXNwMTQ7XCIsXCLigINcIjpcIiZlbXNwO1wiLFwixYtcIjpcIiZlbmc7XCIsXCLigIJcIjpcIiZlbnNwO1wiLFwixJlcIjpcIiZlb2dvbjtcIixcIvCdlZZcIjpcIiZlb3BmO1wiLFwi4ouVXCI6XCImZXBhcjtcIixcIuKno1wiOlwiJmVwYXJzbDtcIixcIuKpsVwiOlwiJmVwbHVzO1wiLFwizrVcIjpcIiZlcHNpbG9uO1wiLFwiz7VcIjpcIiZ2YXJlcHNpbG9uO1wiLFwiPVwiOlwiJmVxdWFscztcIixcIuKJn1wiOlwiJnF1ZXN0ZXE7XCIsXCLiqbhcIjpcIiZlcXVpdkREO1wiLFwi4qelXCI6XCImZXF2cGFyc2w7XCIsXCLiiZNcIjpcIiZyaXNpbmdkb3RzZXE7XCIsXCLipbFcIjpcIiZlcmFycjtcIixcIuKEr1wiOlwiJmVzY3I7XCIsXCLOt1wiOlwiJmV0YTtcIixcIsOwXCI6XCImZXRoO1wiLFwiw6tcIjpcIiZldW1sO1wiLFwi4oKsXCI6XCImZXVybztcIixcIiFcIjpcIiZleGNsO1wiLFwi0YRcIjpcIiZmY3k7XCIsXCLimYBcIjpcIiZmZW1hbGU7XCIsXCLvrINcIjpcIiZmZmlsaWc7XCIsXCLvrIBcIjpcIiZmZmxpZztcIixcIu+shFwiOlwiJmZmbGxpZztcIixcIvCdlKNcIjpcIiZmZnI7XCIsXCLvrIFcIjpcIiZmaWxpZztcIixmajpcIiZmamxpZztcIixcIuKZrVwiOlwiJmZsYXQ7XCIsXCLvrIJcIjpcIiZmbGxpZztcIixcIuKWsVwiOlwiJmZsdG5zO1wiLFwixpJcIjpcIiZmbm9mO1wiLFwi8J2Vl1wiOlwiJmZvcGY7XCIsXCLii5RcIjpcIiZwaXRjaGZvcms7XCIsXCLiq5lcIjpcIiZmb3JrdjtcIixcIuKojVwiOlwiJmZwYXJ0aW50O1wiLFwiwr1cIjpcIiZoYWxmO1wiLFwi4oWTXCI6XCImZnJhYzEzO1wiLFwiwrxcIjpcIiZmcmFjMTQ7XCIsXCLihZVcIjpcIiZmcmFjMTU7XCIsXCLihZlcIjpcIiZmcmFjMTY7XCIsXCLihZtcIjpcIiZmcmFjMTg7XCIsXCLihZRcIjpcIiZmcmFjMjM7XCIsXCLihZZcIjpcIiZmcmFjMjU7XCIsXCLCvlwiOlwiJmZyYWMzNDtcIixcIuKFl1wiOlwiJmZyYWMzNTtcIixcIuKFnFwiOlwiJmZyYWMzODtcIixcIuKFmFwiOlwiJmZyYWM0NTtcIixcIuKFmlwiOlwiJmZyYWM1NjtcIixcIuKFnVwiOlwiJmZyYWM1ODtcIixcIuKFnlwiOlwiJmZyYWM3ODtcIixcIuKBhFwiOlwiJmZyYXNsO1wiLFwi4oyiXCI6XCImc2Zyb3duO1wiLFwi8J2Su1wiOlwiJmZzY3I7XCIsXCLiqoxcIjpcIiZndHJlcXFsZXNzO1wiLFwix7VcIjpcIiZnYWN1dGU7XCIsXCLOs1wiOlwiJmdhbW1hO1wiLFwi4qqGXCI6XCImZ3RyYXBwcm94O1wiLFwixJ9cIjpcIiZnYnJldmU7XCIsXCLEnVwiOlwiJmdjaXJjO1wiLFwi0LNcIjpcIiZnY3k7XCIsXCLEoVwiOlwiJmdkb3Q7XCIsXCLiqqlcIjpcIiZnZXNjYztcIixcIuKqgFwiOlwiJmdlc2RvdDtcIixcIuKqglwiOlwiJmdlc2RvdG87XCIsXCLiqoRcIjpcIiZnZXNkb3RvbDtcIixcIuKLm++4gFwiOlwiJmdlc2w7XCIsXCLiqpRcIjpcIiZnZXNsZXM7XCIsXCLwnZSkXCI6XCImZ2ZyO1wiLFwi4oS3XCI6XCImZ2ltZWw7XCIsXCLRk1wiOlwiJmdqY3k7XCIsXCLiqpJcIjpcIiZnbEU7XCIsXCLiqqVcIjpcIiZnbGE7XCIsXCLiqqRcIjpcIiZnbGo7XCIsXCLiialcIjpcIiZnbmVxcTtcIixcIuKqilwiOlwiJmduYXBwcm94O1wiLFwi4qqIXCI6XCImZ25lcTtcIixcIuKLp1wiOlwiJmduc2ltO1wiLFwi8J2VmFwiOlwiJmdvcGY7XCIsXCLihIpcIjpcIiZnc2NyO1wiLFwi4qqOXCI6XCImZ3NpbWU7XCIsXCLiqpBcIjpcIiZnc2ltbDtcIixcIuKqp1wiOlwiJmd0Y2M7XCIsXCLiqbpcIjpcIiZndGNpcjtcIixcIuKLl1wiOlwiJmd0cmRvdDtcIixcIuKmlVwiOlwiJmd0bFBhcjtcIixcIuKpvFwiOlwiJmd0cXVlc3Q7XCIsXCLipbhcIjpcIiZndHJhcnI7XCIsXCLiianvuIBcIjpcIiZndm5FO1wiLFwi0YpcIjpcIiZoYXJkY3k7XCIsXCLipYhcIjpcIiZoYXJyY2lyO1wiLFwi4oatXCI6XCImbGVmdHJpZ2h0c3F1aWdhcnJvdztcIixcIuKEj1wiOlwiJnBsYW5rdjtcIixcIsSlXCI6XCImaGNpcmM7XCIsXCLimaVcIjpcIiZoZWFydHN1aXQ7XCIsXCLigKZcIjpcIiZtbGRyO1wiLFwi4oq5XCI6XCImaGVyY29uO1wiLFwi8J2UpVwiOlwiJmhmcjtcIixcIuKkpVwiOlwiJnNlYXJoaztcIixcIuKkplwiOlwiJnN3YXJoaztcIixcIuKHv1wiOlwiJmhvYXJyO1wiLFwi4oi7XCI6XCImaG9tdGh0O1wiLFwi4oapXCI6XCImbGFycmhrO1wiLFwi4oaqXCI6XCImcmFycmhrO1wiLFwi8J2VmVwiOlwiJmhvcGY7XCIsXCLigJVcIjpcIiZob3JiYXI7XCIsXCLwnZK9XCI6XCImaHNjcjtcIixcIsSnXCI6XCImaHN0cm9rO1wiLFwi4oGDXCI6XCImaHlidWxsO1wiLFwiw61cIjpcIiZpYWN1dGU7XCIsXCLDrlwiOlwiJmljaXJjO1wiLFwi0LhcIjpcIiZpY3k7XCIsXCLQtVwiOlwiJmllY3k7XCIsXCLCoVwiOlwiJmlleGNsO1wiLFwi8J2UplwiOlwiJmlmcjtcIixcIsOsXCI6XCImaWdyYXZlO1wiLFwi4qiMXCI6XCImcWludDtcIixcIuKIrVwiOlwiJnRpbnQ7XCIsXCLip5xcIjpcIiZpaW5maW47XCIsXCLihKlcIjpcIiZpaW90YTtcIixcIsSzXCI6XCImaWpsaWc7XCIsXCLEq1wiOlwiJmltYWNyO1wiLFwixLFcIjpcIiZpbm9kb3Q7XCIsXCLiirdcIjpcIiZpbW9mO1wiLFwixrVcIjpcIiZpbXBlZDtcIixcIuKEhVwiOlwiJmluY2FyZTtcIixcIuKInlwiOlwiJmluZmluO1wiLFwi4qedXCI6XCImaW5maW50aWU7XCIsXCLiirpcIjpcIiZpbnRlcmNhbDtcIixcIuKol1wiOlwiJmludGxhcmhrO1wiLFwi4qi8XCI6XCImaXByb2Q7XCIsXCLRkVwiOlwiJmlvY3k7XCIsXCLEr1wiOlwiJmlvZ29uO1wiLFwi8J2VmlwiOlwiJmlvcGY7XCIsXCLOuVwiOlwiJmlvdGE7XCIsXCLCv1wiOlwiJmlxdWVzdDtcIixcIvCdkr5cIjpcIiZpc2NyO1wiLFwi4ou5XCI6XCImaXNpbkU7XCIsXCLii7VcIjpcIiZpc2luZG90O1wiLFwi4ou0XCI6XCImaXNpbnM7XCIsXCLii7NcIjpcIiZpc2luc3Y7XCIsXCLEqVwiOlwiJml0aWxkZTtcIixcItGWXCI6XCImaXVrY3k7XCIsXCLDr1wiOlwiJml1bWw7XCIsXCLEtVwiOlwiJmpjaXJjO1wiLFwi0LlcIjpcIiZqY3k7XCIsXCLwnZSnXCI6XCImamZyO1wiLFwiyLdcIjpcIiZqbWF0aDtcIixcIvCdlZtcIjpcIiZqb3BmO1wiLFwi8J2Sv1wiOlwiJmpzY3I7XCIsXCLRmFwiOlwiJmpzZXJjeTtcIixcItGUXCI6XCImanVrY3k7XCIsXCLOulwiOlwiJmthcHBhO1wiLFwiz7BcIjpcIiZ2YXJrYXBwYTtcIixcIsS3XCI6XCIma2NlZGlsO1wiLFwi0LpcIjpcIiZrY3k7XCIsXCLwnZSoXCI6XCIma2ZyO1wiLFwixLhcIjpcIiZrZ3JlZW47XCIsXCLRhVwiOlwiJmtoY3k7XCIsXCLRnFwiOlwiJmtqY3k7XCIsXCLwnZWcXCI6XCIma29wZjtcIixcIvCdk4BcIjpcIiZrc2NyO1wiLFwi4qSbXCI6XCImbEF0YWlsO1wiLFwi4qSOXCI6XCImbEJhcnI7XCIsXCLiqotcIjpcIiZsZXNzZXFxZ3RyO1wiLFwi4qWiXCI6XCImbEhhcjtcIixcIsS6XCI6XCImbGFjdXRlO1wiLFwi4qa0XCI6XCImbGFlbXB0eXY7XCIsXCLOu1wiOlwiJmxhbWJkYTtcIixcIuKmkVwiOlwiJmxhbmdkO1wiLFwi4qqFXCI6XCImbGVzc2FwcHJveDtcIixcIsKrXCI6XCImbGFxdW87XCIsXCLipJ9cIjpcIiZsYXJyYmZzO1wiLFwi4qSdXCI6XCImbGFycmZzO1wiLFwi4oarXCI6XCImbG9vcGFycm93bGVmdDtcIixcIuKkuVwiOlwiJmxhcnJwbDtcIixcIuKls1wiOlwiJmxhcnJzaW07XCIsXCLihqJcIjpcIiZsZWZ0YXJyb3d0YWlsO1wiLFwi4qqrXCI6XCImbGF0O1wiLFwi4qSZXCI6XCImbGF0YWlsO1wiLFwi4qqtXCI6XCImbGF0ZTtcIixcIuKqre+4gFwiOlwiJmxhdGVzO1wiLFwi4qSMXCI6XCImbGJhcnI7XCIsXCLinbJcIjpcIiZsYmJyaztcIixcIntcIjpcIiZsY3ViO1wiLFwiW1wiOlwiJmxzcWI7XCIsXCLipotcIjpcIiZsYnJrZTtcIixcIuKmj1wiOlwiJmxicmtzbGQ7XCIsXCLipo1cIjpcIiZsYnJrc2x1O1wiLFwixL5cIjpcIiZsY2Fyb247XCIsXCLEvFwiOlwiJmxjZWRpbDtcIixcItC7XCI6XCImbGN5O1wiLFwi4qS2XCI6XCImbGRjYTtcIixcIuKlp1wiOlwiJmxkcmRoYXI7XCIsXCLipYtcIjpcIiZsZHJ1c2hhcjtcIixcIuKGslwiOlwiJmxkc2g7XCIsXCLiiaRcIjpcIiZsZXE7XCIsXCLih4dcIjpcIiZsbGFycjtcIixcIuKLi1wiOlwiJmx0aHJlZTtcIixcIuKqqFwiOlwiJmxlc2NjO1wiLFwi4qm/XCI6XCImbGVzZG90O1wiLFwi4qqBXCI6XCImbGVzZG90bztcIixcIuKqg1wiOlwiJmxlc2RvdG9yO1wiLFwi4oua77iAXCI6XCImbGVzZztcIixcIuKqk1wiOlwiJmxlc2dlcztcIixcIuKLllwiOlwiJmx0ZG90O1wiLFwi4qW8XCI6XCImbGZpc2h0O1wiLFwi8J2UqVwiOlwiJmxmcjtcIixcIuKqkVwiOlwiJmxnRTtcIixcIuKlqlwiOlwiJmxoYXJ1bDtcIixcIuKWhFwiOlwiJmxoYmxrO1wiLFwi0ZlcIjpcIiZsamN5O1wiLFwi4qWrXCI6XCImbGxoYXJkO1wiLFwi4pe6XCI6XCImbGx0cmk7XCIsXCLFgFwiOlwiJmxtaWRvdDtcIixcIuKOsFwiOlwiJmxtb3VzdGFjaGU7XCIsXCLiiahcIjpcIiZsbmVxcTtcIixcIuKqiVwiOlwiJmxuYXBwcm94O1wiLFwi4qqHXCI6XCImbG5lcTtcIixcIuKLplwiOlwiJmxuc2ltO1wiLFwi4p+sXCI6XCImbG9hbmc7XCIsXCLih71cIjpcIiZsb2FycjtcIixcIuKfvFwiOlwiJnhtYXA7XCIsXCLihqxcIjpcIiZyYXJybHA7XCIsXCLipoVcIjpcIiZsb3BhcjtcIixcIvCdlZ1cIjpcIiZsb3BmO1wiLFwi4qitXCI6XCImbG9wbHVzO1wiLFwi4qi0XCI6XCImbG90aW1lcztcIixcIuKIl1wiOlwiJmxvd2FzdDtcIixcIuKXilwiOlwiJmxvemVuZ2U7XCIsXCIoXCI6XCImbHBhcjtcIixcIuKmk1wiOlwiJmxwYXJsdDtcIixcIuKlrVwiOlwiJmxyaGFyZDtcIixcIuKAjlwiOlwiJmxybTtcIixcIuKKv1wiOlwiJmxydHJpO1wiLFwi4oC5XCI6XCImbHNhcXVvO1wiLFwi8J2TgVwiOlwiJmxzY3I7XCIsXCLiqo1cIjpcIiZsc2ltZTtcIixcIuKqj1wiOlwiJmxzaW1nO1wiLFwi4oCaXCI6XCImc2JxdW87XCIsXCLFglwiOlwiJmxzdHJvaztcIixcIuKqplwiOlwiJmx0Y2M7XCIsXCLiqblcIjpcIiZsdGNpcjtcIixcIuKLiVwiOlwiJmx0aW1lcztcIixcIuKltlwiOlwiJmx0bGFycjtcIixcIuKpu1wiOlwiJmx0cXVlc3Q7XCIsXCLippZcIjpcIiZsdHJQYXI7XCIsXCLil4NcIjpcIiZ0cmlhbmdsZWxlZnQ7XCIsXCLipYpcIjpcIiZsdXJkc2hhcjtcIixcIuKlplwiOlwiJmx1cnVoYXI7XCIsXCLiiajvuIBcIjpcIiZsdm5FO1wiLFwi4oi6XCI6XCImbUREb3Q7XCIsXCLCr1wiOlwiJnN0cm5zO1wiLFwi4pmCXCI6XCImbWFsZTtcIixcIuKcoFwiOlwiJm1hbHRlc2U7XCIsXCLilq5cIjpcIiZtYXJrZXI7XCIsXCLiqKlcIjpcIiZtY29tbWE7XCIsXCLQvFwiOlwiJm1jeTtcIixcIuKAlFwiOlwiJm1kYXNoO1wiLFwi8J2UqlwiOlwiJm1mcjtcIixcIuKEp1wiOlwiJm1obztcIixcIsK1XCI6XCImbWljcm87XCIsXCLiq7BcIjpcIiZtaWRjaXI7XCIsXCLiiJJcIjpcIiZtaW51cztcIixcIuKoqlwiOlwiJm1pbnVzZHU7XCIsXCLiq5tcIjpcIiZtbGNwO1wiLFwi4oqnXCI6XCImbW9kZWxzO1wiLFwi8J2VnlwiOlwiJm1vcGY7XCIsXCLwnZOCXCI6XCImbXNjcjtcIixcIs68XCI6XCImbXU7XCIsXCLiirhcIjpcIiZtdW1hcDtcIixcIuKLmcy4XCI6XCImbkdnO1wiLFwi4omr4oOSXCI6XCImbkd0O1wiLFwi4oeNXCI6XCImbmxBcnI7XCIsXCLih45cIjpcIiZuaEFycjtcIixcIuKLmMy4XCI6XCImbkxsO1wiLFwi4omq4oOSXCI6XCImbkx0O1wiLFwi4oePXCI6XCImbnJBcnI7XCIsXCLiiq9cIjpcIiZuVkRhc2g7XCIsXCLiiq5cIjpcIiZuVmRhc2g7XCIsXCLFhFwiOlwiJm5hY3V0ZTtcIixcIuKIoOKDklwiOlwiJm5hbmc7XCIsXCLiqbDMuFwiOlwiJm5hcEU7XCIsXCLiiYvMuFwiOlwiJm5hcGlkO1wiLFwixYlcIjpcIiZuYXBvcztcIixcIuKZrlwiOlwiJm5hdHVyYWw7XCIsXCLiqYNcIjpcIiZuY2FwO1wiLFwixYhcIjpcIiZuY2Fyb247XCIsXCLFhlwiOlwiJm5jZWRpbDtcIixcIuKprcy4XCI6XCImbmNvbmdkb3Q7XCIsXCLiqYJcIjpcIiZuY3VwO1wiLFwi0L1cIjpcIiZuY3k7XCIsXCLigJNcIjpcIiZuZGFzaDtcIixcIuKHl1wiOlwiJm5lQXJyO1wiLFwi4qSkXCI6XCImbmVhcmhrO1wiLFwi4omQzLhcIjpcIiZuZWRvdDtcIixcIuKkqFwiOlwiJnRvZWE7XCIsXCLwnZSrXCI6XCImbmZyO1wiLFwi4oauXCI6XCImbmxlZnRyaWdodGFycm93O1wiLFwi4quyXCI6XCImbmhwYXI7XCIsXCLii7xcIjpcIiZuaXM7XCIsXCLii7pcIjpcIiZuaXNkO1wiLFwi0ZpcIjpcIiZuamN5O1wiLFwi4ommzLhcIjpcIiZubGVxcTtcIixcIuKGmlwiOlwiJm5sZWZ0YXJyb3c7XCIsXCLigKVcIjpcIiZubGRyO1wiLFwi8J2Vn1wiOlwiJm5vcGY7XCIsXCLCrFwiOlwiJm5vdDtcIixcIuKLucy4XCI6XCImbm90aW5FO1wiLFwi4ou1zLhcIjpcIiZub3RpbmRvdDtcIixcIuKLt1wiOlwiJm5vdGludmI7XCIsXCLii7ZcIjpcIiZub3RpbnZjO1wiLFwi4ou+XCI6XCImbm90bml2YjtcIixcIuKLvVwiOlwiJm5vdG5pdmM7XCIsXCLiq73ig6VcIjpcIiZucGFyc2w7XCIsXCLiiILMuFwiOlwiJm5wYXJ0O1wiLFwi4qiUXCI6XCImbnBvbGludDtcIixcIuKGm1wiOlwiJm5yaWdodGFycm93O1wiLFwi4qSzzLhcIjpcIiZucmFycmM7XCIsXCLihp3MuFwiOlwiJm5yYXJydztcIixcIvCdk4NcIjpcIiZuc2NyO1wiLFwi4oqEXCI6XCImbnN1YjtcIixcIuKrhcy4XCI6XCImbnN1YnNldGVxcTtcIixcIuKKhVwiOlwiJm5zdXA7XCIsXCLiq4bMuFwiOlwiJm5zdXBzZXRlcXE7XCIsXCLDsVwiOlwiJm50aWxkZTtcIixcIs69XCI6XCImbnU7XCIsXCIjXCI6XCImbnVtO1wiLFwi4oSWXCI6XCImbnVtZXJvO1wiLFwi4oCHXCI6XCImbnVtc3A7XCIsXCLiiq1cIjpcIiZudkRhc2g7XCIsXCLipIRcIjpcIiZudkhhcnI7XCIsXCLiiY3ig5JcIjpcIiZudmFwO1wiLFwi4oqsXCI6XCImbnZkYXNoO1wiLFwi4oml4oOSXCI6XCImbnZnZTtcIixcIj7ig5JcIjpcIiZudmd0O1wiLFwi4qeeXCI6XCImbnZpbmZpbjtcIixcIuKkglwiOlwiJm52bEFycjtcIixcIuKJpOKDklwiOlwiJm52bGU7XCIsXCI84oOSXCI6XCImbnZsdDtcIixcIuKKtOKDklwiOlwiJm52bHRyaWU7XCIsXCLipINcIjpcIiZudnJBcnI7XCIsXCLiirXig5JcIjpcIiZudnJ0cmllO1wiLFwi4oi84oOSXCI6XCImbnZzaW07XCIsXCLih5ZcIjpcIiZud0FycjtcIixcIuKko1wiOlwiJm53YXJoaztcIixcIuKkp1wiOlwiJm53bmVhcjtcIixcIsOzXCI6XCImb2FjdXRlO1wiLFwiw7RcIjpcIiZvY2lyYztcIixcItC+XCI6XCImb2N5O1wiLFwixZFcIjpcIiZvZGJsYWM7XCIsXCLiqLhcIjpcIiZvZGl2O1wiLFwi4qa8XCI6XCImb2Rzb2xkO1wiLFwixZNcIjpcIiZvZWxpZztcIixcIuKmv1wiOlwiJm9mY2lyO1wiLFwi8J2UrFwiOlwiJm9mcjtcIixcIsubXCI6XCImb2dvbjtcIixcIsOyXCI6XCImb2dyYXZlO1wiLFwi4qeBXCI6XCImb2d0O1wiLFwi4qa1XCI6XCImb2hiYXI7XCIsXCLipr5cIjpcIiZvbGNpcjtcIixcIuKmu1wiOlwiJm9sY3Jvc3M7XCIsXCLip4BcIjpcIiZvbHQ7XCIsXCLFjVwiOlwiJm9tYWNyO1wiLFwiz4lcIjpcIiZvbWVnYTtcIixcIs6/XCI6XCImb21pY3JvbjtcIixcIuKmtlwiOlwiJm9taWQ7XCIsXCLwnZWgXCI6XCImb29wZjtcIixcIuKmt1wiOlwiJm9wYXI7XCIsXCLiprlcIjpcIiZvcGVycDtcIixcIuKIqFwiOlwiJnZlZTtcIixcIuKpnVwiOlwiJm9yZDtcIixcIuKEtFwiOlwiJm9zY3I7XCIsXCLCqlwiOlwiJm9yZGY7XCIsXCLCulwiOlwiJm9yZG07XCIsXCLiirZcIjpcIiZvcmlnb2Y7XCIsXCLiqZZcIjpcIiZvcm9yO1wiLFwi4qmXXCI6XCImb3JzbG9wZTtcIixcIuKpm1wiOlwiJm9ydjtcIixcIsO4XCI6XCImb3NsYXNoO1wiLFwi4oqYXCI6XCImb3NvbDtcIixcIsO1XCI6XCImb3RpbGRlO1wiLFwi4qi2XCI6XCImb3RpbWVzYXM7XCIsXCLDtlwiOlwiJm91bWw7XCIsXCLijL1cIjpcIiZvdmJhcjtcIixcIsK2XCI6XCImcGFyYTtcIixcIuKrs1wiOlwiJnBhcnNpbTtcIixcIuKrvVwiOlwiJnBhcnNsO1wiLFwi0L9cIjpcIiZwY3k7XCIsXCIlXCI6XCImcGVyY250O1wiLFwiLlwiOlwiJnBlcmlvZDtcIixcIuKAsFwiOlwiJnBlcm1pbDtcIixcIuKAsVwiOlwiJnBlcnRlbms7XCIsXCLwnZStXCI6XCImcGZyO1wiLFwiz4ZcIjpcIiZwaGk7XCIsXCLPlVwiOlwiJnZhcnBoaTtcIixcIuKYjlwiOlwiJnBob25lO1wiLFwiz4BcIjpcIiZwaTtcIixcIs+WXCI6XCImdmFycGk7XCIsXCLihI5cIjpcIiZwbGFuY2toO1wiLFwiK1wiOlwiJnBsdXM7XCIsXCLiqKNcIjpcIiZwbHVzYWNpcjtcIixcIuKoolwiOlwiJnBsdXNjaXI7XCIsXCLiqKVcIjpcIiZwbHVzZHU7XCIsXCLiqbJcIjpcIiZwbHVzZTtcIixcIuKoplwiOlwiJnBsdXNzaW07XCIsXCLiqKdcIjpcIiZwbHVzdHdvO1wiLFwi4qiVXCI6XCImcG9pbnRpbnQ7XCIsXCLwnZWhXCI6XCImcG9wZjtcIixcIsKjXCI6XCImcG91bmQ7XCIsXCLiqrNcIjpcIiZwckU7XCIsXCLiqrdcIjpcIiZwcmVjYXBwcm94O1wiLFwi4qq5XCI6XCImcHJuYXA7XCIsXCLiqrVcIjpcIiZwcm5FO1wiLFwi4ouoXCI6XCImcHJuc2ltO1wiLFwi4oCyXCI6XCImcHJpbWU7XCIsXCLijK5cIjpcIiZwcm9mYWxhcjtcIixcIuKMklwiOlwiJnByb2ZsaW5lO1wiLFwi4oyTXCI6XCImcHJvZnN1cmY7XCIsXCLiirBcIjpcIiZwcnVyZWw7XCIsXCLwnZOFXCI6XCImcHNjcjtcIixcIs+IXCI6XCImcHNpO1wiLFwi4oCIXCI6XCImcHVuY3NwO1wiLFwi8J2UrlwiOlwiJnFmcjtcIixcIvCdlaJcIjpcIiZxb3BmO1wiLFwi4oGXXCI6XCImcXByaW1lO1wiLFwi8J2ThlwiOlwiJnFzY3I7XCIsXCLiqJZcIjpcIiZxdWF0aW50O1wiLFwiP1wiOlwiJnF1ZXN0O1wiLFwi4qScXCI6XCImckF0YWlsO1wiLFwi4qWkXCI6XCImckhhcjtcIixcIuKIvcyxXCI6XCImcmFjZTtcIixcIsWVXCI6XCImcmFjdXRlO1wiLFwi4qazXCI6XCImcmFlbXB0eXY7XCIsXCLippJcIjpcIiZyYW5nZDtcIixcIuKmpVwiOlwiJnJhbmdlO1wiLFwiwrtcIjpcIiZyYXF1bztcIixcIuKltVwiOlwiJnJhcnJhcDtcIixcIuKkoFwiOlwiJnJhcnJiZnM7XCIsXCLipLNcIjpcIiZyYXJyYztcIixcIuKknlwiOlwiJnJhcnJmcztcIixcIuKlhVwiOlwiJnJhcnJwbDtcIixcIuKltFwiOlwiJnJhcnJzaW07XCIsXCLihqNcIjpcIiZyaWdodGFycm93dGFpbDtcIixcIuKGnVwiOlwiJnJpZ2h0c3F1aWdhcnJvdztcIixcIuKkmlwiOlwiJnJhdGFpbDtcIixcIuKItlwiOlwiJnJhdGlvO1wiLFwi4p2zXCI6XCImcmJicms7XCIsXCJ9XCI6XCImcmN1YjtcIixcIl1cIjpcIiZyc3FiO1wiLFwi4qaMXCI6XCImcmJya2U7XCIsXCLipo5cIjpcIiZyYnJrc2xkO1wiLFwi4qaQXCI6XCImcmJya3NsdTtcIixcIsWZXCI6XCImcmNhcm9uO1wiLFwixZdcIjpcIiZyY2VkaWw7XCIsXCLRgFwiOlwiJnJjeTtcIixcIuKkt1wiOlwiJnJkY2E7XCIsXCLipalcIjpcIiZyZGxkaGFyO1wiLFwi4oazXCI6XCImcmRzaDtcIixcIuKWrVwiOlwiJnJlY3Q7XCIsXCLipb1cIjpcIiZyZmlzaHQ7XCIsXCLwnZSvXCI6XCImcmZyO1wiLFwi4qWsXCI6XCImcmhhcnVsO1wiLFwiz4FcIjpcIiZyaG87XCIsXCLPsVwiOlwiJnZhcnJobztcIixcIuKHiVwiOlwiJnJyYXJyO1wiLFwi4ouMXCI6XCImcnRocmVlO1wiLFwiy5pcIjpcIiZyaW5nO1wiLFwi4oCPXCI6XCImcmxtO1wiLFwi4o6xXCI6XCImcm1vdXN0YWNoZTtcIixcIuKrrlwiOlwiJnJubWlkO1wiLFwi4p+tXCI6XCImcm9hbmc7XCIsXCLih75cIjpcIiZyb2FycjtcIixcIuKmhlwiOlwiJnJvcGFyO1wiLFwi8J2Vo1wiOlwiJnJvcGY7XCIsXCLiqK5cIjpcIiZyb3BsdXM7XCIsXCLiqLVcIjpcIiZyb3RpbWVzO1wiLFwiKVwiOlwiJnJwYXI7XCIsXCLippRcIjpcIiZycGFyZ3Q7XCIsXCLiqJJcIjpcIiZycHBvbGludDtcIixcIuKAulwiOlwiJnJzYXF1bztcIixcIvCdk4dcIjpcIiZyc2NyO1wiLFwi4ouKXCI6XCImcnRpbWVzO1wiLFwi4pa5XCI6XCImdHJpYW5nbGVyaWdodDtcIixcIuKnjlwiOlwiJnJ0cmlsdHJpO1wiLFwi4qWoXCI6XCImcnVsdWhhcjtcIixcIuKEnlwiOlwiJnJ4O1wiLFwixZtcIjpcIiZzYWN1dGU7XCIsXCLiqrRcIjpcIiZzY0U7XCIsXCLiqrhcIjpcIiZzdWNjYXBwcm94O1wiLFwixaFcIjpcIiZzY2Fyb247XCIsXCLFn1wiOlwiJnNjZWRpbDtcIixcIsWdXCI6XCImc2NpcmM7XCIsXCLiqrZcIjpcIiZzdWNjbmVxcTtcIixcIuKqulwiOlwiJnN1Y2NuYXBwcm94O1wiLFwi4oupXCI6XCImc3VjY25zaW07XCIsXCLiqJNcIjpcIiZzY3BvbGludDtcIixcItGBXCI6XCImc2N5O1wiLFwi4ouFXCI6XCImc2RvdDtcIixcIuKpplwiOlwiJnNkb3RlO1wiLFwi4oeYXCI6XCImc2VBcnI7XCIsXCLCp1wiOlwiJnNlY3Q7XCIsXCI7XCI6XCImc2VtaTtcIixcIuKkqVwiOlwiJnRvc2E7XCIsXCLinLZcIjpcIiZzZXh0O1wiLFwi8J2UsFwiOlwiJnNmcjtcIixcIuKZr1wiOlwiJnNoYXJwO1wiLFwi0YlcIjpcIiZzaGNoY3k7XCIsXCLRiFwiOlwiJnNoY3k7XCIsXCLCrVwiOlwiJnNoeTtcIixcIs+DXCI6XCImc2lnbWE7XCIsXCLPglwiOlwiJnZhcnNpZ21hO1wiLFwi4qmqXCI6XCImc2ltZG90O1wiLFwi4qqeXCI6XCImc2ltZztcIixcIuKqoFwiOlwiJnNpbWdFO1wiLFwi4qqdXCI6XCImc2ltbDtcIixcIuKqn1wiOlwiJnNpbWxFO1wiLFwi4omGXCI6XCImc2ltbmU7XCIsXCLiqKRcIjpcIiZzaW1wbHVzO1wiLFwi4qWyXCI6XCImc2ltcmFycjtcIixcIuKos1wiOlwiJnNtYXNocDtcIixcIuKnpFwiOlwiJnNtZXBhcnNsO1wiLFwi4oyjXCI6XCImc3NtaWxlO1wiLFwi4qqqXCI6XCImc210O1wiLFwi4qqsXCI6XCImc210ZTtcIixcIuKqrO+4gFwiOlwiJnNtdGVzO1wiLFwi0YxcIjpcIiZzb2Z0Y3k7XCIsXCIvXCI6XCImc29sO1wiLFwi4qeEXCI6XCImc29sYjtcIixcIuKMv1wiOlwiJnNvbGJhcjtcIixcIvCdlaRcIjpcIiZzb3BmO1wiLFwi4pmgXCI6XCImc3BhZGVzdWl0O1wiLFwi4oqT77iAXCI6XCImc3FjYXBzO1wiLFwi4oqU77iAXCI6XCImc3FjdXBzO1wiLFwi8J2TiFwiOlwiJnNzY3I7XCIsXCLimIZcIjpcIiZzdGFyO1wiLFwi4oqCXCI6XCImc3Vic2V0O1wiLFwi4quFXCI6XCImc3Vic2V0ZXFxO1wiLFwi4qq9XCI6XCImc3ViZG90O1wiLFwi4quDXCI6XCImc3ViZWRvdDtcIixcIuKrgVwiOlwiJnN1Ym11bHQ7XCIsXCLiq4tcIjpcIiZzdWJzZXRuZXFxO1wiLFwi4oqKXCI6XCImc3Vic2V0bmVxO1wiLFwi4qq/XCI6XCImc3VicGx1cztcIixcIuKluVwiOlwiJnN1YnJhcnI7XCIsXCLiq4dcIjpcIiZzdWJzaW07XCIsXCLiq5VcIjpcIiZzdWJzdWI7XCIsXCLiq5NcIjpcIiZzdWJzdXA7XCIsXCLimapcIjpcIiZzdW5nO1wiLFwiwrlcIjpcIiZzdXAxO1wiLFwiwrJcIjpcIiZzdXAyO1wiLFwiwrNcIjpcIiZzdXAzO1wiLFwi4quGXCI6XCImc3Vwc2V0ZXFxO1wiLFwi4qq+XCI6XCImc3VwZG90O1wiLFwi4quYXCI6XCImc3VwZHN1YjtcIixcIuKrhFwiOlwiJnN1cGVkb3Q7XCIsXCLin4lcIjpcIiZzdXBoc29sO1wiLFwi4quXXCI6XCImc3VwaHN1YjtcIixcIuKlu1wiOlwiJnN1cGxhcnI7XCIsXCLiq4JcIjpcIiZzdXBtdWx0O1wiLFwi4quMXCI6XCImc3Vwc2V0bmVxcTtcIixcIuKKi1wiOlwiJnN1cHNldG5lcTtcIixcIuKrgFwiOlwiJnN1cHBsdXM7XCIsXCLiq4hcIjpcIiZzdXBzaW07XCIsXCLiq5RcIjpcIiZzdXBzdWI7XCIsXCLiq5ZcIjpcIiZzdXBzdXA7XCIsXCLih5lcIjpcIiZzd0FycjtcIixcIuKkqlwiOlwiJnN3bndhcjtcIixcIsOfXCI6XCImc3psaWc7XCIsXCLijJZcIjpcIiZ0YXJnZXQ7XCIsXCLPhFwiOlwiJnRhdTtcIixcIsWlXCI6XCImdGNhcm9uO1wiLFwixaNcIjpcIiZ0Y2VkaWw7XCIsXCLRglwiOlwiJnRjeTtcIixcIuKMlVwiOlwiJnRlbHJlYztcIixcIvCdlLFcIjpcIiZ0ZnI7XCIsXCLOuFwiOlwiJnRoZXRhO1wiLFwiz5FcIjpcIiZ2YXJ0aGV0YTtcIixcIsO+XCI6XCImdGhvcm47XCIsXCLDl1wiOlwiJnRpbWVzO1wiLFwi4qixXCI6XCImdGltZXNiYXI7XCIsXCLiqLBcIjpcIiZ0aW1lc2Q7XCIsXCLijLZcIjpcIiZ0b3Bib3Q7XCIsXCLiq7FcIjpcIiZ0b3BjaXI7XCIsXCLwnZWlXCI6XCImdG9wZjtcIixcIuKrmlwiOlwiJnRvcGZvcms7XCIsXCLigLRcIjpcIiZ0cHJpbWU7XCIsXCLilrVcIjpcIiZ1dHJpO1wiLFwi4omcXCI6XCImdHJpZTtcIixcIuKXrFwiOlwiJnRyaWRvdDtcIixcIuKoulwiOlwiJnRyaW1pbnVzO1wiLFwi4qi5XCI6XCImdHJpcGx1cztcIixcIuKnjVwiOlwiJnRyaXNiO1wiLFwi4qi7XCI6XCImdHJpdGltZTtcIixcIuKPolwiOlwiJnRycGV6aXVtO1wiLFwi8J2TiVwiOlwiJnRzY3I7XCIsXCLRhlwiOlwiJnRzY3k7XCIsXCLRm1wiOlwiJnRzaGN5O1wiLFwixadcIjpcIiZ0c3Ryb2s7XCIsXCLipaNcIjpcIiZ1SGFyO1wiLFwiw7pcIjpcIiZ1YWN1dGU7XCIsXCLRnlwiOlwiJnVicmN5O1wiLFwixa1cIjpcIiZ1YnJldmU7XCIsXCLDu1wiOlwiJnVjaXJjO1wiLFwi0YNcIjpcIiZ1Y3k7XCIsXCLFsVwiOlwiJnVkYmxhYztcIixcIuKlvlwiOlwiJnVmaXNodDtcIixcIvCdlLJcIjpcIiZ1ZnI7XCIsXCLDuVwiOlwiJnVncmF2ZTtcIixcIuKWgFwiOlwiJnVoYmxrO1wiLFwi4oycXCI6XCImdWxjb3JuZXI7XCIsXCLijI9cIjpcIiZ1bGNyb3A7XCIsXCLil7hcIjpcIiZ1bHRyaTtcIixcIsWrXCI6XCImdW1hY3I7XCIsXCLFs1wiOlwiJnVvZ29uO1wiLFwi8J2VplwiOlwiJnVvcGY7XCIsXCLPhVwiOlwiJnVwc2lsb247XCIsXCLih4hcIjpcIiZ1dWFycjtcIixcIuKMnVwiOlwiJnVyY29ybmVyO1wiLFwi4oyOXCI6XCImdXJjcm9wO1wiLFwixa9cIjpcIiZ1cmluZztcIixcIuKXuVwiOlwiJnVydHJpO1wiLFwi8J2TilwiOlwiJnVzY3I7XCIsXCLii7BcIjpcIiZ1dGRvdDtcIixcIsWpXCI6XCImdXRpbGRlO1wiLFwiw7xcIjpcIiZ1dW1sO1wiLFwi4qanXCI6XCImdXdhbmdsZTtcIixcIuKrqFwiOlwiJnZCYXI7XCIsXCLiq6lcIjpcIiZ2QmFydjtcIixcIuKmnFwiOlwiJnZhbmdydDtcIixcIuKKiu+4gFwiOlwiJnZzdWJuZTtcIixcIuKri++4gFwiOlwiJnZzdWJuRTtcIixcIuKKi++4gFwiOlwiJnZzdXBuZTtcIixcIuKrjO+4gFwiOlwiJnZzdXBuRTtcIixcItCyXCI6XCImdmN5O1wiLFwi4oq7XCI6XCImdmVlYmFyO1wiLFwi4omaXCI6XCImdmVlZXE7XCIsXCLii65cIjpcIiZ2ZWxsaXA7XCIsXCLwnZSzXCI6XCImdmZyO1wiLFwi8J2Vp1wiOlwiJnZvcGY7XCIsXCLwnZOLXCI6XCImdnNjcjtcIixcIuKmmlwiOlwiJnZ6aWd6YWc7XCIsXCLFtVwiOlwiJndjaXJjO1wiLFwi4qmfXCI6XCImd2VkYmFyO1wiLFwi4omZXCI6XCImd2VkZ2VxO1wiLFwi4oSYXCI6XCImd3A7XCIsXCLwnZS0XCI6XCImd2ZyO1wiLFwi8J2VqFwiOlwiJndvcGY7XCIsXCLwnZOMXCI6XCImd3NjcjtcIixcIvCdlLVcIjpcIiZ4ZnI7XCIsXCLOvlwiOlwiJnhpO1wiLFwi4ou7XCI6XCImeG5pcztcIixcIvCdlalcIjpcIiZ4b3BmO1wiLFwi8J2TjVwiOlwiJnhzY3I7XCIsXCLDvVwiOlwiJnlhY3V0ZTtcIixcItGPXCI6XCImeWFjeTtcIixcIsW3XCI6XCImeWNpcmM7XCIsXCLRi1wiOlwiJnljeTtcIixcIsKlXCI6XCImeWVuO1wiLFwi8J2UtlwiOlwiJnlmcjtcIixcItGXXCI6XCImeWljeTtcIixcIvCdlapcIjpcIiZ5b3BmO1wiLFwi8J2TjlwiOlwiJnlzY3I7XCIsXCLRjlwiOlwiJnl1Y3k7XCIsXCLDv1wiOlwiJnl1bWw7XCIsXCLFulwiOlwiJnphY3V0ZTtcIixcIsW+XCI6XCImemNhcm9uO1wiLFwi0LdcIjpcIiZ6Y3k7XCIsXCLFvFwiOlwiJnpkb3Q7XCIsXCLOtlwiOlwiJnpldGE7XCIsXCLwnZS3XCI6XCImemZyO1wiLFwi0LZcIjpcIiZ6aGN5O1wiLFwi4oedXCI6XCImemlncmFycjtcIixcIvCdlatcIjpcIiZ6b3BmO1wiLFwi8J2Tj1wiOlwiJnpzY3I7XCIsXCLigI1cIjpcIiZ6d2o7XCIsXCLigIxcIjpcIiZ6d25qO1wifX19OyIsIlwidXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTp0cnVlfSk7ZXhwb3J0cy5udW1lcmljVW5pY29kZU1hcD17MDo2NTUzMywxMjg6ODM2NCwxMzA6ODIxOCwxMzE6NDAyLDEzMjo4MjIyLDEzMzo4MjMwLDEzNDo4MjI0LDEzNTo4MjI1LDEzNjo3MTAsMTM3OjgyNDAsMTM4OjM1MiwxMzk6ODI0OSwxNDA6MzM4LDE0MjozODEsMTQ1OjgyMTYsMTQ2OjgyMTcsMTQ3OjgyMjAsMTQ4OjgyMjEsMTQ5OjgyMjYsMTUwOjgyMTEsMTUxOjgyMTIsMTUyOjczMiwxNTM6ODQ4MiwxNTQ6MzUzLDE1NTo4MjUwLDE1NjozMzksMTU4OjM4MiwxNTk6Mzc2fTsiLCJcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6dHJ1ZX0pO2V4cG9ydHMuZnJvbUNvZGVQb2ludD1TdHJpbmcuZnJvbUNvZGVQb2ludHx8ZnVuY3Rpb24oYXN0cmFsQ29kZVBvaW50KXtyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShNYXRoLmZsb29yKChhc3RyYWxDb2RlUG9pbnQtNjU1MzYpLzEwMjQpKzU1Mjk2LChhc3RyYWxDb2RlUG9pbnQtNjU1MzYpJTEwMjQrNTYzMjApfTtleHBvcnRzLmdldENvZGVQb2ludD1TdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0P2Z1bmN0aW9uKGlucHV0LHBvc2l0aW9uKXtyZXR1cm4gaW5wdXQuY29kZVBvaW50QXQocG9zaXRpb24pfTpmdW5jdGlvbihpbnB1dCxwb3NpdGlvbil7cmV0dXJuKGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pLTU1Mjk2KSoxMDI0K2lucHV0LmNoYXJDb2RlQXQocG9zaXRpb24rMSktNTYzMjArNjU1MzZ9O2V4cG9ydHMuaGlnaFN1cnJvZ2F0ZUZyb209NTUyOTY7ZXhwb3J0cy5oaWdoU3Vycm9nYXRlVG89NTYzMTk7IiwiZXhwb3J0IGRlZmF1bHQgXCJwcmVjaXNpb24gaGlnaHAgZmxvYXQ7XFxucHJlY2lzaW9uIGhpZ2hwIGludDtcXG4jZGVmaW5lIEdMU0xJRlkgMVxcblxcbnVuaWZvcm0gc2FtcGxlcjJEIHRXYXRlcjtcXG51bmlmb3JtIHNhbXBsZXIyRCB0RmxvdztcXG51bmlmb3JtIGZsb2F0IHVUaW1lO1xcblxcbnZhcnlpbmcgdmVjMiB2VXY7XFxuXFxudW5pZm9ybSB2ZWM0IHJlcztcXG5cXG52b2lkIG1haW4oKSB7XFxuICAgICAgICAvLyBSIGFuZCBHIHZhbHVlcyBhcmUgdmVsb2NpdHkgaW4gdGhlIHggYW5kIHkgZGlyZWN0aW9uXFxuICAgICAgICAvLyBCIHZhbHVlIGlzIHRoZSB2ZWxvY2l0eSBsZW5ndGhcXG4gICAgICAgIHZlYzMgZmxvdyA9IHRleHR1cmUyRCh0RmxvdywgdlV2KS5yZ2I7XFxuICAgICAgICB2ZWMyIHV2ID0gLjUgKiBnbF9GcmFnQ29vcmQueHkgLyByZXMueHkgO1xcbiAgICAgICAgdmVjMiBteVVWID0gKHV2IC0gdmVjMigwLjUpKSpyZXMuencgKyB2ZWMyKDAuNSk7XFxuXFxuICAgICAgICBteVVWIC09IGZsb3cueHkgKiAoMC4xNSAqIDAuNyk7XFxuICAgICAgICBcXG4gICAgICAgIHZlYzMgdGV4ID0gdGV4dHVyZTJEKHRXYXRlciwgbXlVVikucmdiO1xcblxcbiAgICAgICAgLy8gZ2xfRnJhZ0NvbG9yID0gdmVjNChmbG93LnIsIGZsb3cuZywgZmxvdy5iLCAxLjApO1xcbiAgICAgICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCh0ZXguciwgdGV4LmcsIHRleC5iLCAxLjApO1xcbn1cIjsiLCJleHBvcnQgZGVmYXVsdCBcIiNkZWZpbmUgR0xTTElGWSAxXFxuYXR0cmlidXRlIHZlYzIgdXY7XFxuYXR0cmlidXRlIHZlYzIgcG9zaXRpb247XFxuXFxudmFyeWluZyB2ZWMyIHZVdjtcXG5cXG52b2lkIG1haW4oKSB7XFxuICAgICAgICB2VXYgPSB1djtcXG4gICAgICAgIFxcbiAgICAgICAgZ2xfUG9zaXRpb24gPSB2ZWM0KHBvc2l0aW9uLCAwLCAxKTtcXG59XCI7IiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgXCJwcm90b3R5cGVcIiwgeyB3cml0YWJsZTogZmFsc2UgfSk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi4vdXRpbHMvbG9nLmpzXCI7XG5cbnZhciBXZWJTb2NrZXRDbGllbnQgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgKi9cbiAgZnVuY3Rpb24gV2ViU29ja2V0Q2xpZW50KHVybCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBXZWJTb2NrZXRDbGllbnQpO1xuXG4gICAgdGhpcy5jbGllbnQgPSBuZXcgV2ViU29ja2V0KHVybCk7XG5cbiAgICB0aGlzLmNsaWVudC5vbmVycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICBsb2cuZXJyb3IoZXJyb3IpO1xuICAgIH07XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSBmXG4gICAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKFdlYlNvY2tldENsaWVudCwgW3tcbiAgICBrZXk6IFwib25PcGVuXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uT3BlbihmKSB7XG4gICAgICB0aGlzLmNsaWVudC5vbm9wZW4gPSBmO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0geyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gZlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwib25DbG9zZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkNsb3NlKGYpIHtcbiAgICAgIHRoaXMuY2xpZW50Lm9uY2xvc2UgPSBmO1xuICAgIH0gLy8gY2FsbCBmIHdpdGggdGhlIG1lc3NhZ2Ugc3RyaW5nIGFzIHRoZSBmaXJzdCBhcmd1bWVudFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHsoLi4uYXJnczogYW55W10pID0+IHZvaWR9IGZcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcIm9uTWVzc2FnZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbk1lc3NhZ2UoZikge1xuICAgICAgdGhpcy5jbGllbnQub25tZXNzYWdlID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZihlLmRhdGEpO1xuICAgICAgfTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gV2ViU29ja2V0Q2xpZW50O1xufSgpO1xuXG5leHBvcnQgeyBXZWJTb2NrZXRDbGllbnQgYXMgZGVmYXVsdCB9OyIsIi8qKioqKiovIChmdW5jdGlvbigpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHRcInVzZSBzdHJpY3RcIjtcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVzX18gPSAoe1xuXG4vKioqLyBcIi4vY2xpZW50LXNyYy9tb2R1bGVzL2xvZ2dlci9TeW5jQmFpbEhvb2tGYWtlLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vY2xpZW50LXNyYy9tb2R1bGVzL2xvZ2dlci9TeW5jQmFpbEhvb2tGYWtlLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSkge1xuXG5cbi8qKlxuICogQ2xpZW50IHN0dWIgZm9yIHRhcGFibGUgU3luY0JhaWxIb29rXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjbGllbnRUYXBhYmxlU3luY0JhaWxIb29rKCkge1xuICByZXR1cm4ge1xuICAgIGNhbGw6IGZ1bmN0aW9uIGNhbGwoKSB7fVxuICB9O1xufTtcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9Mb2dnZXIuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9Mb2dnZXIuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoZnVuY3Rpb24oX191bnVzZWRfd2VicGFja19tb2R1bGUsIGV4cG9ydHMpIHtcblxuLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5KGFycikgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFycikgfHwgX25vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbn1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmICh0eXBlb2YgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkgIT09IFwidW5kZWZpbmVkXCIgJiYgaXRlclsodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KS5pdGVyYXRvcl0gIT0gbnVsbCB8fCBpdGVyW1wiQEBpdGVyYXRvclwiXSAhPSBudWxsKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn1cblxuZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkoYXJyKTtcbn1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgYXJyMltpXSA9IGFycltpXTtcbiAgfVxuXG4gIHJldHVybiBhcnIyO1xufVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFwicHJvdG90eXBlXCIsIHtcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cblxudmFyIExvZ1R5cGUgPSBPYmplY3QuZnJlZXplKHtcbiAgZXJyb3I6XG4gIC8qKiBAdHlwZSB7XCJlcnJvclwifSAqL1xuICBcImVycm9yXCIsXG4gIC8vIG1lc3NhZ2UsIGMgc3R5bGUgYXJndW1lbnRzXG4gIHdhcm46XG4gIC8qKiBAdHlwZSB7XCJ3YXJuXCJ9ICovXG4gIFwid2FyblwiLFxuICAvLyBtZXNzYWdlLCBjIHN0eWxlIGFyZ3VtZW50c1xuICBpbmZvOlxuICAvKiogQHR5cGUge1wiaW5mb1wifSAqL1xuICBcImluZm9cIixcbiAgLy8gbWVzc2FnZSwgYyBzdHlsZSBhcmd1bWVudHNcbiAgbG9nOlxuICAvKiogQHR5cGUge1wibG9nXCJ9ICovXG4gIFwibG9nXCIsXG4gIC8vIG1lc3NhZ2UsIGMgc3R5bGUgYXJndW1lbnRzXG4gIGRlYnVnOlxuICAvKiogQHR5cGUge1wiZGVidWdcIn0gKi9cbiAgXCJkZWJ1Z1wiLFxuICAvLyBtZXNzYWdlLCBjIHN0eWxlIGFyZ3VtZW50c1xuICB0cmFjZTpcbiAgLyoqIEB0eXBlIHtcInRyYWNlXCJ9ICovXG4gIFwidHJhY2VcIixcbiAgLy8gbm8gYXJndW1lbnRzXG4gIGdyb3VwOlxuICAvKiogQHR5cGUge1wiZ3JvdXBcIn0gKi9cbiAgXCJncm91cFwiLFxuICAvLyBbbGFiZWxdXG4gIGdyb3VwQ29sbGFwc2VkOlxuICAvKiogQHR5cGUge1wiZ3JvdXBDb2xsYXBzZWRcIn0gKi9cbiAgXCJncm91cENvbGxhcHNlZFwiLFxuICAvLyBbbGFiZWxdXG4gIGdyb3VwRW5kOlxuICAvKiogQHR5cGUge1wiZ3JvdXBFbmRcIn0gKi9cbiAgXCJncm91cEVuZFwiLFxuICAvLyBbbGFiZWxdXG4gIHByb2ZpbGU6XG4gIC8qKiBAdHlwZSB7XCJwcm9maWxlXCJ9ICovXG4gIFwicHJvZmlsZVwiLFxuICAvLyBbcHJvZmlsZU5hbWVdXG4gIHByb2ZpbGVFbmQ6XG4gIC8qKiBAdHlwZSB7XCJwcm9maWxlRW5kXCJ9ICovXG4gIFwicHJvZmlsZUVuZFwiLFxuICAvLyBbcHJvZmlsZU5hbWVdXG4gIHRpbWU6XG4gIC8qKiBAdHlwZSB7XCJ0aW1lXCJ9ICovXG4gIFwidGltZVwiLFxuICAvLyBuYW1lLCB0aW1lIGFzIFtzZWNvbmRzLCBuYW5vc2Vjb25kc11cbiAgY2xlYXI6XG4gIC8qKiBAdHlwZSB7XCJjbGVhclwifSAqL1xuICBcImNsZWFyXCIsXG4gIC8vIG5vIGFyZ3VtZW50c1xuICBzdGF0dXM6XG4gIC8qKiBAdHlwZSB7XCJzdGF0dXNcIn0gKi9cbiAgXCJzdGF0dXNcIiAvLyBtZXNzYWdlLCBhcmd1bWVudHNcblxufSk7XG5leHBvcnRzLkxvZ1R5cGUgPSBMb2dUeXBlO1xuLyoqIEB0eXBlZGVmIHt0eXBlb2YgTG9nVHlwZVtrZXlvZiB0eXBlb2YgTG9nVHlwZV19IExvZ1R5cGVFbnVtICovXG5cbnZhciBMT0dfU1lNQk9MID0gKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkoXCJ3ZWJwYWNrIGxvZ2dlciByYXcgbG9nIG1ldGhvZFwiKTtcbnZhciBUSU1FUlNfU1lNQk9MID0gKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkoXCJ3ZWJwYWNrIGxvZ2dlciB0aW1lc1wiKTtcbnZhciBUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0wgPSAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KShcIndlYnBhY2sgbG9nZ2VyIGFnZ3JlZ2F0ZWQgdGltZXNcIik7XG5cbnZhciBXZWJwYWNrTG9nZ2VyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oTG9nVHlwZUVudW0sIGFueVtdPSk6IHZvaWR9IGxvZyBsb2cgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtmdW5jdGlvbihzdHJpbmcgfCBmdW5jdGlvbigpOiBzdHJpbmcpOiBXZWJwYWNrTG9nZ2VyfSBnZXRDaGlsZExvZ2dlciBmdW5jdGlvbiB0byBjcmVhdGUgY2hpbGQgbG9nZ2VyXG4gICAqL1xuICBmdW5jdGlvbiBXZWJwYWNrTG9nZ2VyKGxvZywgZ2V0Q2hpbGRMb2dnZXIpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgV2VicGFja0xvZ2dlcik7XG5cbiAgICB0aGlzW0xPR19TWU1CT0xdID0gbG9nO1xuICAgIHRoaXMuZ2V0Q2hpbGRMb2dnZXIgPSBnZXRDaGlsZExvZ2dlcjtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhXZWJwYWNrTG9nZ2VyLCBbe1xuICAgIGtleTogXCJlcnJvclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlcnJvcigpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuZXJyb3IsIGFyZ3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ3YXJuXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHdhcm4oKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuXG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUud2FybiwgYXJncyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImluZm9cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5mbygpIHtcbiAgICAgIGZvciAodmFyIF9sZW4zID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMyksIF9rZXkzID0gMDsgX2tleTMgPCBfbGVuMzsgX2tleTMrKykge1xuICAgICAgICBhcmdzW19rZXkzXSA9IGFyZ3VtZW50c1tfa2V5M107XG4gICAgICB9XG5cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5pbmZvLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwibG9nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGxvZygpIHtcbiAgICAgIGZvciAodmFyIF9sZW40ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNCksIF9rZXk0ID0gMDsgX2tleTQgPCBfbGVuNDsgX2tleTQrKykge1xuICAgICAgICBhcmdzW19rZXk0XSA9IGFyZ3VtZW50c1tfa2V5NF07XG4gICAgICB9XG5cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5sb2csIGFyZ3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkZWJ1Z1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZWJ1ZygpIHtcbiAgICAgIGZvciAodmFyIF9sZW41ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNSksIF9rZXk1ID0gMDsgX2tleTUgPCBfbGVuNTsgX2tleTUrKykge1xuICAgICAgICBhcmdzW19rZXk1XSA9IGFyZ3VtZW50c1tfa2V5NV07XG4gICAgICB9XG5cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5kZWJ1ZywgYXJncyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImFzc2VydFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhc3NlcnQoYXNzZXJ0aW9uKSB7XG4gICAgICBpZiAoIWFzc2VydGlvbikge1xuICAgICAgICBmb3IgKHZhciBfbGVuNiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjYgPiAxID8gX2xlbjYgLSAxIDogMCksIF9rZXk2ID0gMTsgX2tleTYgPCBfbGVuNjsgX2tleTYrKykge1xuICAgICAgICAgIGFyZ3NbX2tleTYgLSAxXSA9IGFyZ3VtZW50c1tfa2V5Nl07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuZXJyb3IsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0cmFjZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0cmFjZSgpIHtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS50cmFjZSwgW1wiVHJhY2VcIl0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjbGVhclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5jbGVhcik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInN0YXR1c1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzdGF0dXMoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuNyA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjcpLCBfa2V5NyA9IDA7IF9rZXk3IDwgX2xlbjc7IF9rZXk3KyspIHtcbiAgICAgICAgYXJnc1tfa2V5N10gPSBhcmd1bWVudHNbX2tleTddO1xuICAgICAgfVxuXG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuc3RhdHVzLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ3JvdXBcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ3JvdXAoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuOCA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjgpLCBfa2V5OCA9IDA7IF9rZXk4IDwgX2xlbjg7IF9rZXk4KyspIHtcbiAgICAgICAgYXJnc1tfa2V5OF0gPSBhcmd1bWVudHNbX2tleThdO1xuICAgICAgfVxuXG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuZ3JvdXAsIGFyZ3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJncm91cENvbGxhcHNlZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBncm91cENvbGxhcHNlZCgpIHtcbiAgICAgIGZvciAodmFyIF9sZW45ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuOSksIF9rZXk5ID0gMDsgX2tleTkgPCBfbGVuOTsgX2tleTkrKykge1xuICAgICAgICBhcmdzW19rZXk5XSA9IGFyZ3VtZW50c1tfa2V5OV07XG4gICAgICB9XG5cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5ncm91cENvbGxhcHNlZCwgYXJncyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdyb3VwRW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdyb3VwRW5kKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjEwID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMTApLCBfa2V5MTAgPSAwOyBfa2V5MTAgPCBfbGVuMTA7IF9rZXkxMCsrKSB7XG4gICAgICAgIGFyZ3NbX2tleTEwXSA9IGFyZ3VtZW50c1tfa2V5MTBdO1xuICAgICAgfVxuXG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuZ3JvdXBFbmQsIGFyZ3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwcm9maWxlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHByb2ZpbGUobGFiZWwpIHtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5wcm9maWxlLCBbbGFiZWxdKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicHJvZmlsZUVuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwcm9maWxlRW5kKGxhYmVsKSB7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUucHJvZmlsZUVuZCwgW2xhYmVsXSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRpbWVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdGltZShsYWJlbCkge1xuICAgICAgdGhpc1tUSU1FUlNfU1lNQk9MXSA9IHRoaXNbVElNRVJTX1NZTUJPTF0gfHwgbmV3IE1hcCgpO1xuICAgICAgdGhpc1tUSU1FUlNfU1lNQk9MXS5zZXQobGFiZWwsIHByb2Nlc3MuaHJ0aW1lKCkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0aW1lTG9nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRpbWVMb2cobGFiZWwpIHtcbiAgICAgIHZhciBwcmV2ID0gdGhpc1tUSU1FUlNfU1lNQk9MXSAmJiB0aGlzW1RJTUVSU19TWU1CT0xdLmdldChsYWJlbCk7XG5cbiAgICAgIGlmICghcHJldikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzdWNoIGxhYmVsICdcIi5jb25jYXQobGFiZWwsIFwiJyBmb3IgV2VicGFja0xvZ2dlci50aW1lTG9nKClcIikpO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGltZSA9IHByb2Nlc3MuaHJ0aW1lKHByZXYpO1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnRpbWUsIFtsYWJlbF0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheSh0aW1lKSkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0aW1lRW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRpbWVFbmQobGFiZWwpIHtcbiAgICAgIHZhciBwcmV2ID0gdGhpc1tUSU1FUlNfU1lNQk9MXSAmJiB0aGlzW1RJTUVSU19TWU1CT0xdLmdldChsYWJlbCk7XG5cbiAgICAgIGlmICghcHJldikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzdWNoIGxhYmVsICdcIi5jb25jYXQobGFiZWwsIFwiJyBmb3IgV2VicGFja0xvZ2dlci50aW1lRW5kKClcIikpO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGltZSA9IHByb2Nlc3MuaHJ0aW1lKHByZXYpO1xuICAgICAgdGhpc1tUSU1FUlNfU1lNQk9MXS5kZWxldGUobGFiZWwpO1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnRpbWUsIFtsYWJlbF0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheSh0aW1lKSkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0aW1lQWdncmVnYXRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRpbWVBZ2dyZWdhdGUobGFiZWwpIHtcbiAgICAgIHZhciBwcmV2ID0gdGhpc1tUSU1FUlNfU1lNQk9MXSAmJiB0aGlzW1RJTUVSU19TWU1CT0xdLmdldChsYWJlbCk7XG5cbiAgICAgIGlmICghcHJldikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzdWNoIGxhYmVsICdcIi5jb25jYXQobGFiZWwsIFwiJyBmb3IgV2VicGFja0xvZ2dlci50aW1lQWdncmVnYXRlKClcIikpO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGltZSA9IHByb2Nlc3MuaHJ0aW1lKHByZXYpO1xuICAgICAgdGhpc1tUSU1FUlNfU1lNQk9MXS5kZWxldGUobGFiZWwpO1xuICAgICAgdGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdID0gdGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdIHx8IG5ldyBNYXAoKTtcbiAgICAgIHZhciBjdXJyZW50ID0gdGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdLmdldChsYWJlbCk7XG5cbiAgICAgIGlmIChjdXJyZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHRpbWVbMV0gKyBjdXJyZW50WzFdID4gMWU5KSB7XG4gICAgICAgICAgdGltZVswXSArPSBjdXJyZW50WzBdICsgMTtcbiAgICAgICAgICB0aW1lWzFdID0gdGltZVsxXSAtIDFlOSArIGN1cnJlbnRbMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGltZVswXSArPSBjdXJyZW50WzBdO1xuICAgICAgICAgIHRpbWVbMV0gKz0gY3VycmVudFsxXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0uc2V0KGxhYmVsLCB0aW1lKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidGltZUFnZ3JlZ2F0ZUVuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0aW1lQWdncmVnYXRlRW5kKGxhYmVsKSB7XG4gICAgICBpZiAodGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICAgIHZhciB0aW1lID0gdGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdLmdldChsYWJlbCk7XG4gICAgICBpZiAodGltZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgICB0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0uZGVsZXRlKGxhYmVsKTtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS50aW1lLCBbbGFiZWxdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkodGltZSkpKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gV2VicGFja0xvZ2dlcjtcbn0oKTtcblxuZXhwb3J0cy5Mb2dnZXIgPSBXZWJwYWNrTG9nZ2VyO1xuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL2NyZWF0ZUNvbnNvbGVMb2dnZXIuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvY3JlYXRlQ29uc29sZUxvZ2dlci5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBfX3VudXNlZF93ZWJwYWNrX2V4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5KGFycikgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFycikgfHwgX25vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbn1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmICh0eXBlb2YgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkgIT09IFwidW5kZWZpbmVkXCIgJiYgaXRlclsodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KS5pdGVyYXRvcl0gIT0gbnVsbCB8fCBpdGVyW1wiQEBpdGVyYXRvclwiXSAhPSBudWxsKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn1cblxuZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkoYXJyKTtcbn1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgYXJyMltpXSA9IGFycltpXTtcbiAgfVxuXG4gIHJldHVybiBhcnIyO1xufVxuXG52YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL0xvZ2dlciAqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvTG9nZ2VyLmpzXCIpLFxuICAgIExvZ1R5cGUgPSBfcmVxdWlyZS5Mb2dUeXBlO1xuLyoqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi8uLi9kZWNsYXJhdGlvbnMvV2VicGFja09wdGlvbnNcIikuRmlsdGVySXRlbVR5cGVzfSBGaWx0ZXJJdGVtVHlwZXMgKi9cblxuLyoqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi8uLi9kZWNsYXJhdGlvbnMvV2VicGFja09wdGlvbnNcIikuRmlsdGVyVHlwZXN9IEZpbHRlclR5cGVzICovXG5cbi8qKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi9Mb2dnZXJcIikuTG9nVHlwZUVudW19IExvZ1R5cGVFbnVtICovXG5cbi8qKiBAdHlwZWRlZiB7ZnVuY3Rpb24oc3RyaW5nKTogYm9vbGVhbn0gRmlsdGVyRnVuY3Rpb24gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBMb2dnZXJDb25zb2xlXG4gKiBAcHJvcGVydHkge2Z1bmN0aW9uKCk6IHZvaWR9IGNsZWFyXG4gKiBAcHJvcGVydHkge2Z1bmN0aW9uKCk6IHZvaWR9IHRyYWNlXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gaW5mb1xuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWR9IGxvZ1xuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWR9IHdhcm5cbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSBlcnJvclxuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWQ9fSBkZWJ1Z1xuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWQ9fSBncm91cFxuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWQ9fSBncm91cENvbGxhcHNlZFxuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWQ9fSBncm91cEVuZFxuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWQ9fSBzdGF0dXNcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gcHJvZmlsZVxuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWQ9fSBwcm9maWxlRW5kXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IGxvZ1RpbWVcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IExvZ2dlck9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7ZmFsc2V8dHJ1ZXxcIm5vbmVcInxcImVycm9yXCJ8XCJ3YXJuXCJ8XCJpbmZvXCJ8XCJsb2dcInxcInZlcmJvc2VcIn0gbGV2ZWwgbG9nbGV2ZWxcbiAqIEBwcm9wZXJ0eSB7RmlsdGVyVHlwZXN8Ym9vbGVhbn0gZGVidWcgZmlsdGVyIGZvciBkZWJ1ZyBsb2dnaW5nXG4gKiBAcHJvcGVydHkge0xvZ2dlckNvbnNvbGV9IGNvbnNvbGUgdGhlIGNvbnNvbGUgdG8gbG9nIHRvXG4gKi9cblxuLyoqXG4gKiBAcGFyYW0ge0ZpbHRlckl0ZW1UeXBlc30gaXRlbSBhbiBpbnB1dCBpdGVtXG4gKiBAcmV0dXJucyB7RmlsdGVyRnVuY3Rpb259IGZpbHRlciBmdW5jdGlvblxuICovXG5cblxudmFyIGZpbHRlclRvRnVuY3Rpb24gPSBmdW5jdGlvbiBmaWx0ZXJUb0Z1bmN0aW9uKGl0ZW0pIHtcbiAgaWYgKHR5cGVvZiBpdGVtID09PSBcInN0cmluZ1wiKSB7XG4gICAgdmFyIHJlZ0V4cCA9IG5ldyBSZWdFeHAoXCJbXFxcXFxcXFwvXVwiLmNvbmNhdChpdGVtLnJlcGxhY2UoIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuICAgIC9bLVtcXF17fSgpKis/LlxcXFxeJHxdL2csIFwiXFxcXCQmXCIpLCBcIihbXFxcXFxcXFwvXXwkfCF8XFxcXD8pXCIpKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGlkZW50KSB7XG4gICAgICByZXR1cm4gcmVnRXhwLnRlc3QoaWRlbnQpO1xuICAgIH07XG4gIH1cblxuICBpZiAoaXRlbSAmJiB0eXBlb2YgaXRlbSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgaXRlbS50ZXN0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGlkZW50KSB7XG4gICAgICByZXR1cm4gaXRlbS50ZXN0KGlkZW50KTtcbiAgICB9O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBpdGVtID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gaXRlbTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgaXRlbSA9PT0gXCJib29sZWFuXCIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfTtcbiAgfVxufTtcbi8qKlxuICogQGVudW0ge251bWJlcn1cbiAqL1xuXG5cbnZhciBMb2dMZXZlbCA9IHtcbiAgbm9uZTogNixcbiAgZmFsc2U6IDYsXG4gIGVycm9yOiA1LFxuICB3YXJuOiA0LFxuICBpbmZvOiAzLFxuICBsb2c6IDIsXG4gIHRydWU6IDIsXG4gIHZlcmJvc2U6IDFcbn07XG4vKipcbiAqIEBwYXJhbSB7TG9nZ2VyT3B0aW9uc30gb3B0aW9ucyBvcHRpb25zIG9iamVjdFxuICogQHJldHVybnMge2Z1bmN0aW9uKHN0cmluZywgTG9nVHlwZUVudW0sIGFueVtdKTogdm9pZH0gbG9nZ2luZyBmdW5jdGlvblxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKF9yZWYpIHtcbiAgdmFyIF9yZWYkbGV2ZWwgPSBfcmVmLmxldmVsLFxuICAgICAgbGV2ZWwgPSBfcmVmJGxldmVsID09PSB2b2lkIDAgPyBcImluZm9cIiA6IF9yZWYkbGV2ZWwsXG4gICAgICBfcmVmJGRlYnVnID0gX3JlZi5kZWJ1ZyxcbiAgICAgIGRlYnVnID0gX3JlZiRkZWJ1ZyA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcmVmJGRlYnVnLFxuICAgICAgY29uc29sZSA9IF9yZWYuY29uc29sZTtcbiAgdmFyIGRlYnVnRmlsdGVycyA9IHR5cGVvZiBkZWJ1ZyA9PT0gXCJib29sZWFuXCIgPyBbZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkZWJ1ZztcbiAgfV0gOlxuICAvKiogQHR5cGUge0ZpbHRlckl0ZW1UeXBlc1tdfSAqL1xuICBbXS5jb25jYXQoZGVidWcpLm1hcChmaWx0ZXJUb0Z1bmN0aW9uKTtcbiAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXG5cbiAgdmFyIGxvZ2xldmVsID0gTG9nTGV2ZWxbXCJcIi5jb25jYXQobGV2ZWwpXSB8fCAwO1xuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgbmFtZSBvZiB0aGUgbG9nZ2VyXG4gICAqIEBwYXJhbSB7TG9nVHlwZUVudW19IHR5cGUgdHlwZSBvZiB0aGUgbG9nIGVudHJ5XG4gICAqIEBwYXJhbSB7YW55W119IGFyZ3MgYXJndW1lbnRzIG9mIHRoZSBsb2cgZW50cnlcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuXG4gIHZhciBsb2dnZXIgPSBmdW5jdGlvbiBsb2dnZXIobmFtZSwgdHlwZSwgYXJncykge1xuICAgIHZhciBsYWJlbGVkQXJncyA9IGZ1bmN0aW9uIGxhYmVsZWRBcmdzKCkge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJncykpIHtcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID4gMCAmJiB0eXBlb2YgYXJnc1swXSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIHJldHVybiBbXCJbXCIuY29uY2F0KG5hbWUsIFwiXSBcIikuY29uY2F0KGFyZ3NbMF0pXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KGFyZ3Muc2xpY2UoMSkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gW1wiW1wiLmNvbmNhdChuYW1lLCBcIl1cIildLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkoYXJncykpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBkZWJ1ZyA9IGRlYnVnRmlsdGVycy5zb21lKGZ1bmN0aW9uIChmKSB7XG4gICAgICByZXR1cm4gZihuYW1lKTtcbiAgICB9KTtcblxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBMb2dUeXBlLmRlYnVnOlxuICAgICAgICBpZiAoIWRlYnVnKSByZXR1cm47IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUuZGVidWcgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgICBjb25zb2xlLmRlYnVnLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUubG9nOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwubG9nKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUuaW5mbzpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmluZm8pIHJldHVybjtcbiAgICAgICAgY29uc29sZS5pbmZvLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUud2FybjpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLndhcm4pIHJldHVybjtcbiAgICAgICAgY29uc29sZS53YXJuLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUuZXJyb3I6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5lcnJvcikgcmV0dXJuO1xuICAgICAgICBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUudHJhY2U6XG4gICAgICAgIGlmICghZGVidWcpIHJldHVybjtcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBMb2dUeXBlLmdyb3VwQ29sbGFwc2VkOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwubG9nKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLnZlcmJvc2UpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG4gICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmdyb3VwQ29sbGFwc2VkID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgICAgIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAvLyBmYWxscyB0aHJvdWdoXG5cbiAgICAgIGNhc2UgTG9nVHlwZS5ncm91cDpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmxvZykgcmV0dXJuOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmdyb3VwID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG4gICAgICAgICAgY29uc29sZS5ncm91cC5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBMb2dUeXBlLmdyb3VwRW5kOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwubG9nKSByZXR1cm47IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUuZ3JvdXBFbmQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBMb2dUeXBlLnRpbWU6XG4gICAgICAgIHtcbiAgICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwubG9nKSByZXR1cm47XG4gICAgICAgICAgdmFyIG1zID0gYXJnc1sxXSAqIDEwMDAgKyBhcmdzWzJdIC8gMTAwMDAwMDtcbiAgICAgICAgICB2YXIgbXNnID0gXCJbXCIuY29uY2F0KG5hbWUsIFwiXSBcIikuY29uY2F0KGFyZ3NbMF0sIFwiOiBcIikuY29uY2F0KG1zLCBcIiBtc1wiKTtcblxuICAgICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5sb2dUaW1lID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nVGltZShtc2cpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgIGNhc2UgTG9nVHlwZS5wcm9maWxlOlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5wcm9maWxlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG4gICAgICAgICAgY29uc29sZS5wcm9maWxlLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBMb2dUeXBlLnByb2ZpbGVFbmQ6XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnByb2ZpbGVFbmQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgICBjb25zb2xlLnByb2ZpbGVFbmQuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUuY2xlYXI6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5jbGVhciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuICAgICAgICAgIGNvbnNvbGUuY2xlYXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUuc3RhdHVzOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwuaW5mbykgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5zdGF0dXMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgY29uc29sZS5zdGF0dXMoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5zdGF0dXMuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8uYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5leHBlY3RlZCBMb2dUeXBlIFwiLmNvbmNhdCh0eXBlKSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsb2dnZXI7XG59O1xuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL3J1bnRpbWUuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvcnVudGltZS5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoZnVuY3Rpb24oX191bnVzZWRfd2VicGFja19tb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxuXG5mdW5jdGlvbiBfZXh0ZW5kcygpIHtcbiAgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuXG4gIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG52YXIgU3luY0JhaWxIb29rID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgdGFwYWJsZS9saWIvU3luY0JhaWxIb29rICovIFwiLi9jbGllbnQtc3JjL21vZHVsZXMvbG9nZ2VyL1N5bmNCYWlsSG9va0Zha2UuanNcIik7XG5cbnZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vTG9nZ2VyICovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9Mb2dnZXIuanNcIiksXG4gICAgTG9nZ2VyID0gX3JlcXVpcmUuTG9nZ2VyO1xuXG52YXIgY3JlYXRlQ29uc29sZUxvZ2dlciA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vY3JlYXRlQ29uc29sZUxvZ2dlciAqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvY3JlYXRlQ29uc29sZUxvZ2dlci5qc1wiKTtcbi8qKiBAdHlwZSB7Y3JlYXRlQ29uc29sZUxvZ2dlci5Mb2dnZXJPcHRpb25zfSAqL1xuXG5cbnZhciBjdXJyZW50RGVmYXVsdExvZ2dlck9wdGlvbnMgPSB7XG4gIGxldmVsOiBcImluZm9cIixcbiAgZGVidWc6IGZhbHNlLFxuICBjb25zb2xlOiBjb25zb2xlXG59O1xudmFyIGN1cnJlbnREZWZhdWx0TG9nZ2VyID0gY3JlYXRlQ29uc29sZUxvZ2dlcihjdXJyZW50RGVmYXVsdExvZ2dlck9wdGlvbnMpO1xuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBuYW1lIG9mIHRoZSBsb2dnZXJcbiAqIEByZXR1cm5zIHtMb2dnZXJ9IGEgbG9nZ2VyXG4gKi9cblxuZXhwb3J0cy5nZXRMb2dnZXIgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gbmV3IExvZ2dlcihmdW5jdGlvbiAodHlwZSwgYXJncykge1xuICAgIGlmIChleHBvcnRzLmhvb2tzLmxvZy5jYWxsKG5hbWUsIHR5cGUsIGFyZ3MpID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGN1cnJlbnREZWZhdWx0TG9nZ2VyKG5hbWUsIHR5cGUsIGFyZ3MpO1xuICAgIH1cbiAgfSwgZnVuY3Rpb24gKGNoaWxkTmFtZSkge1xuICAgIHJldHVybiBleHBvcnRzLmdldExvZ2dlcihcIlwiLmNvbmNhdChuYW1lLCBcIi9cIikuY29uY2F0KGNoaWxkTmFtZSkpO1xuICB9KTtcbn07XG4vKipcbiAqIEBwYXJhbSB7Y3JlYXRlQ29uc29sZUxvZ2dlci5Mb2dnZXJPcHRpb25zfSBvcHRpb25zIG5ldyBvcHRpb25zLCBtZXJnZSB3aXRoIG9sZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuXG5cbmV4cG9ydHMuY29uZmlndXJlRGVmYXVsdExvZ2dlciA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIF9leHRlbmRzKGN1cnJlbnREZWZhdWx0TG9nZ2VyT3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgY3VycmVudERlZmF1bHRMb2dnZXIgPSBjcmVhdGVDb25zb2xlTG9nZ2VyKGN1cnJlbnREZWZhdWx0TG9nZ2VyT3B0aW9ucyk7XG59O1xuXG5leHBvcnRzLmhvb2tzID0ge1xuICBsb2c6IG5ldyBTeW5jQmFpbEhvb2soW1wib3JpZ2luXCIsIFwidHlwZVwiLCBcImFyZ3NcIl0pXG59O1xuXG4vKioqLyB9KVxuXG4vKioqKioqLyBcdH0pO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG4vKioqKioqLyBcdFx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovIFx0XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMgKi9cbi8qKioqKiovIFx0IWZ1bmN0aW9uKCkge1xuLyoqKioqKi8gXHRcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG4vKioqKioqLyBcdFx0XHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG4vKioqKioqLyBcdFx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuLyoqKioqKi8gXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG4vKioqKioqLyBcdFx0XHRcdH1cbi8qKioqKiovIFx0XHRcdH1cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHR9KCk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kICovXG4vKioqKioqLyBcdCFmdW5jdGlvbigpIHtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9XG4vKioqKioqLyBcdH0oKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QgKi9cbi8qKioqKiovIFx0IWZ1bmN0aW9uKCkge1xuLyoqKioqKi8gXHRcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4vKioqKioqLyBcdFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbi8qKioqKiovIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdH0oKTtcbi8qKioqKiovIFx0XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbi8vIFRoaXMgZW50cnkgbmVlZCB0byBiZSB3cmFwcGVkIGluIGFuIElJRkUgYmVjYXVzZSBpdCBuZWVkIHRvIGJlIGlzb2xhdGVkIGFnYWluc3Qgb3RoZXIgbW9kdWxlcyBpbiB0aGUgY2h1bmsuXG4hZnVuY3Rpb24oKSB7XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL2NsaWVudC1zcmMvbW9kdWxlcy9sb2dnZXIvaW5kZXguanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yKF9fd2VicGFja19leHBvcnRzX18pO1xuLyogaGFybW9ueSBleHBvcnQgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIHtcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgXCJkZWZhdWx0XCI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gLyogcmVleHBvcnQgZGVmYXVsdCBleHBvcnQgZnJvbSBuYW1lZCBtb2R1bGUgKi8gd2VicGFja19saWJfbG9nZ2luZ19ydW50aW1lX2pzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX187IH1cbi8qIGhhcm1vbnkgZXhwb3J0ICovIH0pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIHdlYnBhY2tfbGliX2xvZ2dpbmdfcnVudGltZV9qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgd2VicGFjay9saWIvbG9nZ2luZy9ydW50aW1lLmpzICovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9ydW50aW1lLmpzXCIpO1xuXG59KCk7XG52YXIgX193ZWJwYWNrX2V4cG9ydF90YXJnZXRfXyA9IGV4cG9ydHM7XG5mb3IodmFyIGkgaW4gX193ZWJwYWNrX2V4cG9ydHNfXykgX193ZWJwYWNrX2V4cG9ydF90YXJnZXRfX1tpXSA9IF9fd2VicGFja19leHBvcnRzX19baV07XG5pZihfX3dlYnBhY2tfZXhwb3J0c19fLl9fZXNNb2R1bGUpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfX3dlYnBhY2tfZXhwb3J0X3RhcmdldF9fLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKioqKiovIH0pKClcbjsiLCIvKioqKioqLyAoZnVuY3Rpb24oKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0XCJ1c2Ugc3RyaWN0XCI7XG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlc19fID0gKHtcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy9zdHJpcC1hbnNpL2luZGV4LmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvc3RyaXAtYW5zaS9pbmRleC5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKGZ1bmN0aW9uKF9fdW51c2VkX3dlYnBhY2tfX193ZWJwYWNrX21vZHVsZV9fLCBfX3dlYnBhY2tfZXhwb3J0c19fLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFwiZGVmYXVsdFwiOiBmdW5jdGlvbigpIHsgcmV0dXJuIC8qIGJpbmRpbmcgKi8gc3RyaXBBbnNpOyB9XG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBhbnNpX3JlZ2V4X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISBhbnNpLXJlZ2V4ICovIFwiLi9ub2RlX21vZHVsZXMvc3RyaXAtYW5zaS9ub2RlX21vZHVsZXMvYW5zaS1yZWdleC9pbmRleC5qc1wiKTtcblxuZnVuY3Rpb24gc3RyaXBBbnNpKHN0cmluZykge1xuICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRXhwZWN0ZWQgYSBgc3RyaW5nYCwgZ290IGBcIi5jb25jYXQodHlwZW9mIHN0cmluZywgXCJgXCIpKTtcbiAgfVxuXG4gIHJldHVybiBzdHJpbmcucmVwbGFjZSgoMCxhbnNpX3JlZ2V4X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19bXCJkZWZhdWx0XCJdKSgpLCAnJyk7XG59XG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL3N0cmlwLWFuc2kvbm9kZV9tb2R1bGVzL2Fuc2ktcmVnZXgvaW5kZXguanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9zdHJpcC1hbnNpL25vZGVfbW9kdWxlcy9hbnNpLXJlZ2V4L2luZGV4LmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoZnVuY3Rpb24oX191bnVzZWRfd2VicGFja19fX3dlYnBhY2tfbW9kdWxlX18sIF9fd2VicGFja19leHBvcnRzX18sIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5yKF9fd2VicGFja19leHBvcnRzX18pO1xuLyogaGFybW9ueSBleHBvcnQgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIHtcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgXCJkZWZhdWx0XCI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gLyogYmluZGluZyAqLyBhbnNpUmVnZXg7IH1cbi8qIGhhcm1vbnkgZXhwb3J0ICovIH0pO1xuZnVuY3Rpb24gYW5zaVJlZ2V4KCkge1xuICB2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge30sXG4gICAgICBfcmVmJG9ubHlGaXJzdCA9IF9yZWYub25seUZpcnN0LFxuICAgICAgb25seUZpcnN0ID0gX3JlZiRvbmx5Rmlyc3QgPT09IHZvaWQgMCA/IGZhbHNlIDogX3JlZiRvbmx5Rmlyc3Q7XG5cbiAgdmFyIHBhdHRlcm4gPSBbXCJbXFxcXHUwMDFCXFxcXHUwMDlCXVtbXFxcXF0oKSM7P10qKD86KD86KD86KD86O1stYS16QS1aXFxcXGRcXFxcLyMmLjo9PyVAfl9dKykqfFthLXpBLVpcXFxcZF0rKD86O1stYS16QS1aXFxcXGRcXFxcLyMmLjo9PyVAfl9dKikqKT9cXFxcdTAwMDcpXCIsICcoPzooPzpcXFxcZHsxLDR9KD86O1xcXFxkezAsNH0pKik/W1xcXFxkQS1QUi1UWmNmLW50cXJ5PT48fl0pKSddLmpvaW4oJ3wnKTtcbiAgcmV0dXJuIG5ldyBSZWdFeHAocGF0dGVybiwgb25seUZpcnN0ID8gdW5kZWZpbmVkIDogJ2cnKTtcbn1cblxuLyoqKi8gfSlcblxuLyoqKioqKi8gXHR9KTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuLyoqKioqKi8gXHRcdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzICovXG4vKioqKioqLyBcdCFmdW5jdGlvbigpIHtcbi8qKioqKiovIFx0XHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuLyoqKioqKi8gXHRcdFx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuLyoqKioqKi8gXHRcdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcbi8qKioqKiovIFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuLyoqKioqKi8gXHRcdFx0XHR9XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCAqL1xuLyoqKioqKi8gXHQhZnVuY3Rpb24oKSB7XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfVxuLyoqKioqKi8gXHR9KCk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0ICovXG4vKioqKioqLyBcdCFmdW5jdGlvbigpIHtcbi8qKioqKiovIFx0XHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuLyoqKioqKi8gXHRcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4vKioqKioqLyBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuLyoqKioqKi8gXHRcdFx0fVxuLyoqKioqKi8gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHR9KCk7XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG4vLyBUaGlzIGVudHJ5IG5lZWQgdG8gYmUgd3JhcHBlZCBpbiBhbiBJSUZFIGJlY2F1c2UgaXQgbmVlZCB0byBiZSBpc29sYXRlZCBhZ2FpbnN0IG90aGVyIG1vZHVsZXMgaW4gdGhlIGNodW5rLlxuIWZ1bmN0aW9uKCkge1xuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vY2xpZW50LXNyYy9tb2R1bGVzL3N0cmlwLWFuc2kvaW5kZXguanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBzdHJpcF9hbnNpX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISBzdHJpcC1hbnNpICovIFwiLi9ub2RlX21vZHVsZXMvc3RyaXAtYW5zaS9pbmRleC5qc1wiKTtcblxuLyogaGFybW9ueSBkZWZhdWx0IGV4cG9ydCAqLyBfX3dlYnBhY2tfZXhwb3J0c19fW1wiZGVmYXVsdFwiXSA9IChzdHJpcF9hbnNpX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19bXCJkZWZhdWx0XCJdKTtcbn0oKTtcbnZhciBfX3dlYnBhY2tfZXhwb3J0X3RhcmdldF9fID0gZXhwb3J0cztcbmZvcih2YXIgaSBpbiBfX3dlYnBhY2tfZXhwb3J0c19fKSBfX3dlYnBhY2tfZXhwb3J0X3RhcmdldF9fW2ldID0gX193ZWJwYWNrX2V4cG9ydHNfX1tpXTtcbmlmKF9fd2VicGFja19leHBvcnRzX18uX19lc01vZHVsZSkgT2JqZWN0LmRlZmluZVByb3BlcnR5KF9fd2VicGFja19leHBvcnRfdGFyZ2V0X18sIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqKioqKi8gfSkoKVxuOyIsIi8vIFRoZSBlcnJvciBvdmVybGF5IGlzIGluc3BpcmVkIChhbmQgbW9zdGx5IGNvcGllZCkgZnJvbSBDcmVhdGUgUmVhY3QgQXBwIChodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2tpbmN1YmF0b3IvY3JlYXRlLXJlYWN0LWFwcClcbi8vIFRoZXksIGluIHR1cm4sIGdvdCBpbnNwaXJlZCBieSB3ZWJwYWNrLWhvdC1taWRkbGV3YXJlIChodHRwczovL2dpdGh1Yi5jb20vZ2xlbmphbWluL3dlYnBhY2staG90LW1pZGRsZXdhcmUpLlxuaW1wb3J0IGFuc2lIVE1MIGZyb20gXCJhbnNpLWh0bWwtY29tbXVuaXR5XCI7XG5pbXBvcnQgeyBlbmNvZGUgfSBmcm9tIFwiaHRtbC1lbnRpdGllc1wiO1xudmFyIGNvbG9ycyA9IHtcbiAgcmVzZXQ6IFtcInRyYW5zcGFyZW50XCIsIFwidHJhbnNwYXJlbnRcIl0sXG4gIGJsYWNrOiBcIjE4MTgxOFwiLFxuICByZWQ6IFwiRTM2MDQ5XCIsXG4gIGdyZWVuOiBcIkIzQ0I3NFwiLFxuICB5ZWxsb3c6IFwiRkZEMDgwXCIsXG4gIGJsdWU6IFwiN0NBRkMyXCIsXG4gIG1hZ2VudGE6IFwiN0ZBQ0NBXCIsXG4gIGN5YW46IFwiQzNDMkVGXCIsXG4gIGxpZ2h0Z3JleTogXCJFQkU3RTNcIixcbiAgZGFya2dyZXk6IFwiNkQ3ODkxXCJcbn07XG4vKiogQHR5cGUge0hUTUxJRnJhbWVFbGVtZW50IHwgbnVsbCB8IHVuZGVmaW5lZH0gKi9cblxudmFyIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQ7XG4vKiogQHR5cGUge0hUTUxEaXZFbGVtZW50IHwgbnVsbCB8IHVuZGVmaW5lZH0gKi9cblxudmFyIGNvbnRhaW5lckVsZW1lbnQ7XG4vKiogQHR5cGUge0FycmF5PChlbGVtZW50OiBIVE1MRGl2RWxlbWVudCkgPT4gdm9pZD59ICovXG5cbnZhciBvbkxvYWRRdWV1ZSA9IFtdO1xuYW5zaUhUTUwuc2V0Q29sb3JzKGNvbG9ycyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lcigpIHtcbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XG4gIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuaWQgPSBcIndlYnBhY2stZGV2LXNlcnZlci1jbGllbnQtb3ZlcmxheVwiO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnNyYyA9IFwiYWJvdXQ6YmxhbmtcIjtcbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5zdHlsZS5sZWZ0ID0gMDtcbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5zdHlsZS50b3AgPSAwO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnN0eWxlLnJpZ2h0ID0gMDtcbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5zdHlsZS5ib3R0b20gPSAwO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnN0eWxlLndpZHRoID0gXCIxMDB2d1wiO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnN0eWxlLmhlaWdodCA9IFwiMTAwdmhcIjtcbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5zdHlsZS5ib3JkZXIgPSBcIm5vbmVcIjtcbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5zdHlsZS56SW5kZXggPSA5OTk5OTk5OTk5O1xuXG4gIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnRhaW5lckVsZW1lbnQgPVxuICAgIC8qKiBAdHlwZSB7RG9jdW1lbnR9ICovXG5cbiAgICAvKiogQHR5cGUge0hUTUxJRnJhbWVFbGVtZW50fSAqL1xuICAgIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuY29udGVudERvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29udGFpbmVyRWxlbWVudC5pZCA9IFwid2VicGFjay1kZXYtc2VydmVyLWNsaWVudC1vdmVybGF5LWRpdlwiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSBcImZpeGVkXCI7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS5ib3hTaXppbmcgPSBcImJvcmRlci1ib3hcIjtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLmxlZnQgPSAwO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUudG9wID0gMDtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLnJpZ2h0ID0gMDtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLmJvdHRvbSA9IDA7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS53aWR0aCA9IFwiMTAwdndcIjtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLmhlaWdodCA9IFwiMTAwdmhcIjtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLCAwLCAwLCAwLjg1KVwiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUuY29sb3IgPSBcIiNFOEU4RThcIjtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLmZvbnRGYW1pbHkgPSBcIk1lbmxvLCBDb25zb2xhcywgbW9ub3NwYWNlXCI7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS5mb250U2l6ZSA9IFwibGFyZ2VcIjtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLnBhZGRpbmcgPSBcIjJyZW1cIjtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLmxpbmVIZWlnaHQgPSBcIjEuMlwiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUud2hpdGVTcGFjZSA9IFwicHJlLXdyYXBcIjtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gXCJhdXRvXCI7XG4gICAgdmFyIGhlYWRlckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBoZWFkZXJFbGVtZW50LmlubmVyVGV4dCA9IFwiQ29tcGlsZWQgd2l0aCBwcm9ibGVtczpcIjtcbiAgICB2YXIgY2xvc2VCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBjbG9zZUJ1dHRvbkVsZW1lbnQuaW5uZXJUZXh0ID0gXCJYXCI7XG4gICAgY2xvc2VCdXR0b25FbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSBcInRyYW5zcGFyZW50XCI7XG4gICAgY2xvc2VCdXR0b25FbGVtZW50LnN0eWxlLmJvcmRlciA9IFwibm9uZVwiO1xuICAgIGNsb3NlQnV0dG9uRWxlbWVudC5zdHlsZS5mb250U2l6ZSA9IFwiMjBweFwiO1xuICAgIGNsb3NlQnV0dG9uRWxlbWVudC5zdHlsZS5mb250V2VpZ2h0ID0gXCJib2xkXCI7XG4gICAgY2xvc2VCdXR0b25FbGVtZW50LnN0eWxlLmNvbG9yID0gXCJ3aGl0ZVwiO1xuICAgIGNsb3NlQnV0dG9uRWxlbWVudC5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICBjbG9zZUJ1dHRvbkVsZW1lbnQuc3R5bGUuY3NzRmxvYXQgPSBcInJpZ2h0XCI7IC8vIEB0cy1pZ25vcmVcblxuICAgIGNsb3NlQnV0dG9uRWxlbWVudC5zdHlsZS5zdHlsZUZsb2F0ID0gXCJyaWdodFwiO1xuICAgIGNsb3NlQnV0dG9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgaGlkZSgpO1xuICAgIH0pO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQoaGVhZGVyRWxlbWVudCk7XG4gICAgY29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChjbG9zZUJ1dHRvbkVsZW1lbnQpO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKTtcbiAgICBjb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gICAgLyoqIEB0eXBlIHtEb2N1bWVudH0gKi9cblxuICAgIC8qKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnR9ICovXG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5jb250ZW50RG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXJFbGVtZW50KTtcbiAgICBvbkxvYWRRdWV1ZS5mb3JFYWNoKGZ1bmN0aW9uIChvbkxvYWQpIHtcbiAgICAgIG9uTG9hZChcbiAgICAgIC8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9ICovXG4gICAgICBjb250YWluZXJFbGVtZW50KTtcbiAgICB9KTtcbiAgICBvbkxvYWRRdWV1ZSA9IFtdO1xuICAgIC8qKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnR9ICovXG5cbiAgICBpZnJhbWVDb250YWluZXJFbGVtZW50Lm9ubG9hZCA9IG51bGw7XG4gIH07XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWVDb250YWluZXJFbGVtZW50KTtcbn1cbi8qKlxuICogQHBhcmFtIHsoZWxlbWVudDogSFRNTERpdkVsZW1lbnQpID0+IHZvaWR9IGNhbGxiYWNrXG4gKi9cblxuXG5mdW5jdGlvbiBlbnN1cmVPdmVybGF5RXhpc3RzKGNhbGxiYWNrKSB7XG4gIGlmIChjb250YWluZXJFbGVtZW50KSB7XG4gICAgLy8gRXZlcnl0aGluZyBpcyByZWFkeSwgY2FsbCB0aGUgY2FsbGJhY2sgcmlnaHQgYXdheS5cbiAgICBjYWxsYmFjayhjb250YWluZXJFbGVtZW50KTtcbiAgICByZXR1cm47XG4gIH1cblxuICBvbkxvYWRRdWV1ZS5wdXNoKGNhbGxiYWNrKTtcblxuICBpZiAoaWZyYW1lQ29udGFpbmVyRWxlbWVudCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNyZWF0ZUNvbnRhaW5lcigpO1xufSAvLyBTdWNjZXNzZnVsIGNvbXBpbGF0aW9uLlxuXG5cbmZ1bmN0aW9uIGhpZGUoKSB7XG4gIGlmICghaWZyYW1lQ29udGFpbmVyRWxlbWVudCkge1xuICAgIHJldHVybjtcbiAgfSAvLyBDbGVhbiB1cCBhbmQgcmVzZXQgaW50ZXJuYWwgc3RhdGUuXG5cblxuICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGlmcmFtZUNvbnRhaW5lckVsZW1lbnQpO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50ID0gbnVsbDtcbiAgY29udGFpbmVyRWxlbWVudCA9IG51bGw7XG59XG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge3N0cmluZyAgfCB7IGZpbGU/OiBzdHJpbmcsIG1vZHVsZU5hbWU/OiBzdHJpbmcsIGxvYz86IHN0cmluZywgbWVzc2FnZT86IHN0cmluZyB9fSBpdGVtXG4gKiBAcmV0dXJucyB7eyBoZWFkZXI6IHN0cmluZywgYm9keTogc3RyaW5nIH19XG4gKi9cblxuXG5mdW5jdGlvbiBmb3JtYXRQcm9ibGVtKHR5cGUsIGl0ZW0pIHtcbiAgdmFyIGhlYWRlciA9IHR5cGUgPT09IFwid2FybmluZ1wiID8gXCJXQVJOSU5HXCIgOiBcIkVSUk9SXCI7XG4gIHZhciBib2R5ID0gXCJcIjtcblxuICBpZiAodHlwZW9mIGl0ZW0gPT09IFwic3RyaW5nXCIpIHtcbiAgICBib2R5ICs9IGl0ZW07XG4gIH0gZWxzZSB7XG4gICAgdmFyIGZpbGUgPSBpdGVtLmZpbGUgfHwgXCJcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5lc3RlZC10ZXJuYXJ5XG5cbiAgICB2YXIgbW9kdWxlTmFtZSA9IGl0ZW0ubW9kdWxlTmFtZSA/IGl0ZW0ubW9kdWxlTmFtZS5pbmRleE9mKFwiIVwiKSAhPT0gLTEgPyBcIlwiLmNvbmNhdChpdGVtLm1vZHVsZU5hbWUucmVwbGFjZSgvXihcXHN8XFxTKSohLywgXCJcIiksIFwiIChcIikuY29uY2F0KGl0ZW0ubW9kdWxlTmFtZSwgXCIpXCIpIDogXCJcIi5jb25jYXQoaXRlbS5tb2R1bGVOYW1lKSA6IFwiXCI7XG4gICAgdmFyIGxvYyA9IGl0ZW0ubG9jO1xuICAgIGhlYWRlciArPSBcIlwiLmNvbmNhdChtb2R1bGVOYW1lIHx8IGZpbGUgPyBcIiBpbiBcIi5jb25jYXQobW9kdWxlTmFtZSA/IFwiXCIuY29uY2F0KG1vZHVsZU5hbWUpLmNvbmNhdChmaWxlID8gXCIgKFwiLmNvbmNhdChmaWxlLCBcIilcIikgOiBcIlwiKSA6IGZpbGUpLmNvbmNhdChsb2MgPyBcIiBcIi5jb25jYXQobG9jKSA6IFwiXCIpIDogXCJcIik7XG4gICAgYm9keSArPSBpdGVtLm1lc3NhZ2UgfHwgXCJcIjtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaGVhZGVyOiBoZWFkZXIsXG4gICAgYm9keTogYm9keVxuICB9O1xufSAvLyBDb21waWxhdGlvbiB3aXRoIGVycm9ycyAoZS5nLiBzeW50YXggZXJyb3Igb3IgbWlzc2luZyBtb2R1bGVzKS5cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtBcnJheTxzdHJpbmcgIHwgeyBmaWxlPzogc3RyaW5nLCBtb2R1bGVOYW1lPzogc3RyaW5nLCBsb2M/OiBzdHJpbmcsIG1lc3NhZ2U/OiBzdHJpbmcgfT59IG1lc3NhZ2VzXG4gKi9cblxuXG5mdW5jdGlvbiBzaG93KHR5cGUsIG1lc3NhZ2VzKSB7XG4gIGVuc3VyZU92ZXJsYXlFeGlzdHMoZnVuY3Rpb24gKCkge1xuICAgIG1lc3NhZ2VzLmZvckVhY2goZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgIHZhciBlbnRyeUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdmFyIHR5cGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG5cbiAgICAgIHZhciBfZm9ybWF0UHJvYmxlbSA9IGZvcm1hdFByb2JsZW0odHlwZSwgbWVzc2FnZSksXG4gICAgICAgICAgaGVhZGVyID0gX2Zvcm1hdFByb2JsZW0uaGVhZGVyLFxuICAgICAgICAgIGJvZHkgPSBfZm9ybWF0UHJvYmxlbS5ib2R5O1xuXG4gICAgICB0eXBlRWxlbWVudC5pbm5lclRleHQgPSBoZWFkZXI7XG4gICAgICB0eXBlRWxlbWVudC5zdHlsZS5jb2xvciA9IFwiI1wiLmNvbmNhdChjb2xvcnMucmVkKTsgLy8gTWFrZSBpdCBsb29rIHNpbWlsYXIgdG8gb3VyIHRlcm1pbmFsLlxuXG4gICAgICB2YXIgdGV4dCA9IGFuc2lIVE1MKGVuY29kZShib2R5KSk7XG4gICAgICB2YXIgbWVzc2FnZVRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIG1lc3NhZ2VUZXh0Tm9kZS5pbm5lckhUTUwgPSB0ZXh0O1xuICAgICAgZW50cnlFbGVtZW50LmFwcGVuZENoaWxkKHR5cGVFbGVtZW50KTtcbiAgICAgIGVudHJ5RWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIikpO1xuICAgICAgZW50cnlFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gICAgICBlbnRyeUVsZW1lbnQuYXBwZW5kQ2hpbGQobWVzc2FnZVRleHROb2RlKTtcbiAgICAgIGVudHJ5RWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIikpO1xuICAgICAgZW50cnlFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gICAgICAvKiogQHR5cGUge0hUTUxEaXZFbGVtZW50fSAqL1xuXG4gICAgICBjb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKGVudHJ5RWxlbWVudCk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5leHBvcnQgeyBmb3JtYXRQcm9ibGVtLCBzaG93LCBoaWRlIH07IiwiLyogZ2xvYmFsIF9fd2VicGFja19kZXZfc2VydmVyX2NsaWVudF9fICovXG5pbXBvcnQgV2ViU29ja2V0Q2xpZW50IGZyb20gXCIuL2NsaWVudHMvV2ViU29ja2V0Q2xpZW50LmpzXCI7XG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi91dGlscy9sb2cuanNcIjsgLy8gdGhpcyBXZWJzb2NrZXRDbGllbnQgaXMgaGVyZSBhcyBhIGRlZmF1bHQgZmFsbGJhY2ssIGluIGNhc2UgdGhlIGNsaWVudCBpcyBub3QgaW5qZWN0ZWRcblxuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5cbnZhciBDbGllbnQgPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVzdGVkLXRlcm5hcnlcbnR5cGVvZiBfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IHR5cGVvZiBfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXy5kZWZhdWx0ICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX2Rldl9zZXJ2ZXJfY2xpZW50X18uZGVmYXVsdCA6IF9fd2VicGFja19kZXZfc2VydmVyX2NsaWVudF9fIDogV2ViU29ja2V0Q2xpZW50O1xuLyogZXNsaW50LWVuYWJsZSBjYW1lbGNhc2UgKi9cblxudmFyIHJldHJpZXMgPSAwO1xudmFyIG1heFJldHJpZXMgPSAxMDtcbnZhciBjbGllbnQgPSBudWxsO1xuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge3sgW2hhbmRsZXI6IHN0cmluZ106IChkYXRhPzogYW55LCBwYXJhbXM/OiBhbnkpID0+IGFueSB9fSBoYW5kbGVyc1xuICogQHBhcmFtIHtudW1iZXJ9IFtyZWNvbm5lY3RdXG4gKi9cblxudmFyIHNvY2tldCA9IGZ1bmN0aW9uIGluaXRTb2NrZXQodXJsLCBoYW5kbGVycywgcmVjb25uZWN0KSB7XG4gIGNsaWVudCA9IG5ldyBDbGllbnQodXJsKTtcbiAgY2xpZW50Lm9uT3BlbihmdW5jdGlvbiAoKSB7XG4gICAgcmV0cmllcyA9IDA7XG5cbiAgICBpZiAodHlwZW9mIHJlY29ubmVjdCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgbWF4UmV0cmllcyA9IHJlY29ubmVjdDtcbiAgICB9XG4gIH0pO1xuICBjbGllbnQub25DbG9zZShmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHJldHJpZXMgPT09IDApIHtcbiAgICAgIGhhbmRsZXJzLmNsb3NlKCk7XG4gICAgfSAvLyBUcnkgdG8gcmVjb25uZWN0LlxuXG5cbiAgICBjbGllbnQgPSBudWxsOyAvLyBBZnRlciAxMCByZXRyaWVzIHN0b3AgdHJ5aW5nLCB0byBwcmV2ZW50IGxvZ3NwYW0uXG5cbiAgICBpZiAocmV0cmllcyA8IG1heFJldHJpZXMpIHtcbiAgICAgIC8vIEV4cG9uZW50aWFsbHkgaW5jcmVhc2UgdGltZW91dCB0byByZWNvbm5lY3QuXG4gICAgICAvLyBSZXNwZWN0ZnVsbHkgY29waWVkIGZyb20gdGhlIHBhY2thZ2UgYGdvdGAuXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1wcm9wZXJ0aWVzXG4gICAgICB2YXIgcmV0cnlJbk1zID0gMTAwMCAqIE1hdGgucG93KDIsIHJldHJpZXMpICsgTWF0aC5yYW5kb20oKSAqIDEwMDtcbiAgICAgIHJldHJpZXMgKz0gMTtcbiAgICAgIGxvZy5pbmZvKFwiVHJ5aW5nIHRvIHJlY29ubmVjdC4uLlwiKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBzb2NrZXQodXJsLCBoYW5kbGVycywgcmVjb25uZWN0KTtcbiAgICAgIH0sIHJldHJ5SW5Ncyk7XG4gICAgfVxuICB9KTtcbiAgY2xpZW50Lm9uTWVzc2FnZShcbiAgLyoqXG4gICAqIEBwYXJhbSB7YW55fSBkYXRhXG4gICAqL1xuICBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHZhciBtZXNzYWdlID0gSlNPTi5wYXJzZShkYXRhKTtcblxuICAgIGlmIChoYW5kbGVyc1ttZXNzYWdlLnR5cGVdKSB7XG4gICAgICBoYW5kbGVyc1ttZXNzYWdlLnR5cGVdKG1lc3NhZ2UuZGF0YSwgbWVzc2FnZS5wYXJhbXMpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBzb2NrZXQ7IiwiLyoqXG4gKiBAcGFyYW0ge3sgcHJvdG9jb2w/OiBzdHJpbmcsIGF1dGg/OiBzdHJpbmcsIGhvc3RuYW1lPzogc3RyaW5nLCBwb3J0Pzogc3RyaW5nLCBwYXRobmFtZT86IHN0cmluZywgc2VhcmNoPzogc3RyaW5nLCBoYXNoPzogc3RyaW5nLCBzbGFzaGVzPzogYm9vbGVhbiB9fSBvYmpVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGZvcm1hdChvYmpVUkwpIHtcbiAgdmFyIHByb3RvY29sID0gb2JqVVJMLnByb3RvY29sIHx8IFwiXCI7XG5cbiAgaWYgKHByb3RvY29sICYmIHByb3RvY29sLnN1YnN0cigtMSkgIT09IFwiOlwiKSB7XG4gICAgcHJvdG9jb2wgKz0gXCI6XCI7XG4gIH1cblxuICB2YXIgYXV0aCA9IG9ialVSTC5hdXRoIHx8IFwiXCI7XG5cbiAgaWYgKGF1dGgpIHtcbiAgICBhdXRoID0gZW5jb2RlVVJJQ29tcG9uZW50KGF1dGgpO1xuICAgIGF1dGggPSBhdXRoLnJlcGxhY2UoLyUzQS9pLCBcIjpcIik7XG4gICAgYXV0aCArPSBcIkBcIjtcbiAgfVxuXG4gIHZhciBob3N0ID0gXCJcIjtcblxuICBpZiAob2JqVVJMLmhvc3RuYW1lKSB7XG4gICAgaG9zdCA9IGF1dGggKyAob2JqVVJMLmhvc3RuYW1lLmluZGV4T2YoXCI6XCIpID09PSAtMSA/IG9ialVSTC5ob3N0bmFtZSA6IFwiW1wiLmNvbmNhdChvYmpVUkwuaG9zdG5hbWUsIFwiXVwiKSk7XG5cbiAgICBpZiAob2JqVVJMLnBvcnQpIHtcbiAgICAgIGhvc3QgKz0gXCI6XCIuY29uY2F0KG9ialVSTC5wb3J0KTtcbiAgICB9XG4gIH1cblxuICB2YXIgcGF0aG5hbWUgPSBvYmpVUkwucGF0aG5hbWUgfHwgXCJcIjtcblxuICBpZiAob2JqVVJMLnNsYXNoZXMpIHtcbiAgICBob3N0ID0gXCIvL1wiLmNvbmNhdChob3N0IHx8IFwiXCIpO1xuXG4gICAgaWYgKHBhdGhuYW1lICYmIHBhdGhuYW1lLmNoYXJBdCgwKSAhPT0gXCIvXCIpIHtcbiAgICAgIHBhdGhuYW1lID0gXCIvXCIuY29uY2F0KHBhdGhuYW1lKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIWhvc3QpIHtcbiAgICBob3N0ID0gXCJcIjtcbiAgfVxuXG4gIHZhciBzZWFyY2ggPSBvYmpVUkwuc2VhcmNoIHx8IFwiXCI7XG5cbiAgaWYgKHNlYXJjaCAmJiBzZWFyY2guY2hhckF0KDApICE9PSBcIj9cIikge1xuICAgIHNlYXJjaCA9IFwiP1wiLmNvbmNhdChzZWFyY2gpO1xuICB9XG5cbiAgdmFyIGhhc2ggPSBvYmpVUkwuaGFzaCB8fCBcIlwiO1xuXG4gIGlmIChoYXNoICYmIGhhc2guY2hhckF0KDApICE9PSBcIiNcIikge1xuICAgIGhhc2ggPSBcIiNcIi5jb25jYXQoaGFzaCk7XG4gIH1cblxuICBwYXRobmFtZSA9IHBhdGhuYW1lLnJlcGxhY2UoL1s/I10vZyxcbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtYXRjaFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChtYXRjaCk7XG4gIH0pO1xuICBzZWFyY2ggPSBzZWFyY2gucmVwbGFjZShcIiNcIiwgXCIlMjNcIik7XG4gIHJldHVybiBcIlwiLmNvbmNhdChwcm90b2NvbCkuY29uY2F0KGhvc3QpLmNvbmNhdChwYXRobmFtZSkuY29uY2F0KHNlYXJjaCkuY29uY2F0KGhhc2gpO1xufVxuLyoqXG4gKiBAcGFyYW0ge1VSTCAmIHsgZnJvbUN1cnJlbnRTY3JpcHQ/OiBib29sZWFuIH19IHBhcnNlZFVSTFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuXG5cbmZ1bmN0aW9uIGNyZWF0ZVNvY2tldFVSTChwYXJzZWRVUkwpIHtcbiAgdmFyIGhvc3RuYW1lID0gcGFyc2VkVVJMLmhvc3RuYW1lOyAvLyBOb2RlLmpzIG1vZHVsZSBwYXJzZXMgaXQgYXMgYDo6YFxuICAvLyBgbmV3IFVSTCh1cmxTdHJpbmcsIFtiYXNlVVJMU3RyaW5nXSlgIHBhcnNlcyBpdCBhcyAnWzo6XSdcblxuICB2YXIgaXNJbkFkZHJBbnkgPSBob3N0bmFtZSA9PT0gXCIwLjAuMC4wXCIgfHwgaG9zdG5hbWUgPT09IFwiOjpcIiB8fCBob3N0bmFtZSA9PT0gXCJbOjpdXCI7IC8vIHdoeSBkbyB3ZSBuZWVkIHRoaXMgY2hlY2s/XG4gIC8vIGhvc3RuYW1lIG4vYSBmb3IgZmlsZSBwcm90b2NvbCAoZXhhbXBsZSwgd2hlbiB1c2luZyBlbGVjdHJvbiwgaW9uaWMpXG4gIC8vIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2svd2VicGFjay1kZXYtc2VydmVyL3B1bGwvMzg0XG5cbiAgaWYgKGlzSW5BZGRyQW55ICYmIHNlbGYubG9jYXRpb24uaG9zdG5hbWUgJiYgc2VsZi5sb2NhdGlvbi5wcm90b2NvbC5pbmRleE9mKFwiaHR0cFwiKSA9PT0gMCkge1xuICAgIGhvc3RuYW1lID0gc2VsZi5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgfVxuXG4gIHZhciBzb2NrZXRVUkxQcm90b2NvbCA9IHBhcnNlZFVSTC5wcm90b2NvbCB8fCBzZWxmLmxvY2F0aW9uLnByb3RvY29sOyAvLyBXaGVuIGh0dHBzIGlzIHVzZWQgaW4gdGhlIGFwcCwgc2VjdXJlIHdlYiBzb2NrZXRzIGFyZSBhbHdheXMgbmVjZXNzYXJ5IGJlY2F1c2UgdGhlIGJyb3dzZXIgZG9lc24ndCBhY2NlcHQgbm9uLXNlY3VyZSB3ZWIgc29ja2V0cy5cblxuICBpZiAoc29ja2V0VVJMUHJvdG9jb2wgPT09IFwiYXV0bzpcIiB8fCBob3N0bmFtZSAmJiBpc0luQWRkckFueSAmJiBzZWxmLmxvY2F0aW9uLnByb3RvY29sID09PSBcImh0dHBzOlwiKSB7XG4gICAgc29ja2V0VVJMUHJvdG9jb2wgPSBzZWxmLmxvY2F0aW9uLnByb3RvY29sO1xuICB9XG5cbiAgc29ja2V0VVJMUHJvdG9jb2wgPSBzb2NrZXRVUkxQcm90b2NvbC5yZXBsYWNlKC9eKD86aHR0cHwuKy1leHRlbnNpb258ZmlsZSkvaSwgXCJ3c1wiKTtcbiAgdmFyIHNvY2tldFVSTEF1dGggPSBcIlwiOyAvLyBgbmV3IFVSTCh1cmxTdHJpbmcsIFtiYXNlVVJMc3RyaW5nXSlgIGRvZXNuJ3QgaGF2ZSBgYXV0aGAgcHJvcGVydHlcbiAgLy8gUGFyc2UgYXV0aGVudGljYXRpb24gY3JlZGVudGlhbHMgaW4gY2FzZSB3ZSBuZWVkIHRoZW1cblxuICBpZiAocGFyc2VkVVJMLnVzZXJuYW1lKSB7XG4gICAgc29ja2V0VVJMQXV0aCA9IHBhcnNlZFVSTC51c2VybmFtZTsgLy8gU2luY2UgSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvbiBkb2VzIG5vdCBhbGxvdyBlbXB0eSB1c2VybmFtZSxcbiAgICAvLyB3ZSBvbmx5IGluY2x1ZGUgcGFzc3dvcmQgaWYgdGhlIHVzZXJuYW1lIGlzIG5vdCBlbXB0eS5cblxuICAgIGlmIChwYXJzZWRVUkwucGFzc3dvcmQpIHtcbiAgICAgIC8vIFJlc3VsdDogPHVzZXJuYW1lPjo8cGFzc3dvcmQ+XG4gICAgICBzb2NrZXRVUkxBdXRoID0gc29ja2V0VVJMQXV0aC5jb25jYXQoXCI6XCIsIHBhcnNlZFVSTC5wYXNzd29yZCk7XG4gICAgfVxuICB9IC8vIEluIGNhc2UgdGhlIGhvc3QgaXMgYSByYXcgSVB2NiBhZGRyZXNzLCBpdCBjYW4gYmUgZW5jbG9zZWQgaW5cbiAgLy8gdGhlIGJyYWNrZXRzIGFzIHRoZSBicmFja2V0cyBhcmUgbmVlZGVkIGluIHRoZSBmaW5hbCBVUkwgc3RyaW5nLlxuICAvLyBOZWVkIHRvIHJlbW92ZSB0aG9zZSBhcyB1cmwuZm9ybWF0IGJsaW5kbHkgYWRkcyBpdHMgb3duIHNldCBvZiBicmFja2V0c1xuICAvLyBpZiB0aGUgaG9zdCBzdHJpbmcgY29udGFpbnMgY29sb25zLiBUaGF0IHdvdWxkIGxlYWQgdG8gbm9uLXdvcmtpbmdcbiAgLy8gZG91YmxlIGJyYWNrZXRzIChlLmcuIFtbOjpdXSkgaG9zdFxuICAvL1xuICAvLyBBbGwgb2YgdGhlc2Ugd2ViIHNvY2tldCB1cmwgcGFyYW1zIGFyZSBvcHRpb25hbGx5IHBhc3NlZCBpbiB0aHJvdWdoIHJlc291cmNlUXVlcnksXG4gIC8vIHNvIHdlIG5lZWQgdG8gZmFsbCBiYWNrIHRvIHRoZSBkZWZhdWx0IGlmIHRoZXkgYXJlIG5vdCBwcm92aWRlZFxuXG5cbiAgdmFyIHNvY2tldFVSTEhvc3RuYW1lID0gKGhvc3RuYW1lIHx8IHNlbGYubG9jYXRpb24uaG9zdG5hbWUgfHwgXCJsb2NhbGhvc3RcIikucmVwbGFjZSgvXlxcWyguKilcXF0kLywgXCIkMVwiKTtcbiAgdmFyIHNvY2tldFVSTFBvcnQgPSBwYXJzZWRVUkwucG9ydDtcblxuICBpZiAoIXNvY2tldFVSTFBvcnQgfHwgc29ja2V0VVJMUG9ydCA9PT0gXCIwXCIpIHtcbiAgICBzb2NrZXRVUkxQb3J0ID0gc2VsZi5sb2NhdGlvbi5wb3J0O1xuICB9IC8vIElmIHBhdGggaXMgcHJvdmlkZWQgaXQnbGwgYmUgcGFzc2VkIGluIHZpYSB0aGUgcmVzb3VyY2VRdWVyeSBhcyBhXG4gIC8vIHF1ZXJ5IHBhcmFtIHNvIGl0IGhhcyB0byBiZSBwYXJzZWQgb3V0IG9mIHRoZSBxdWVyeXN0cmluZyBpbiBvcmRlciBmb3IgdGhlXG4gIC8vIGNsaWVudCB0byBvcGVuIHRoZSBzb2NrZXQgdG8gdGhlIGNvcnJlY3QgbG9jYXRpb24uXG5cblxuICB2YXIgc29ja2V0VVJMUGF0aG5hbWUgPSBcIi93c1wiO1xuXG4gIGlmIChwYXJzZWRVUkwucGF0aG5hbWUgJiYgIXBhcnNlZFVSTC5mcm9tQ3VycmVudFNjcmlwdCkge1xuICAgIHNvY2tldFVSTFBhdGhuYW1lID0gcGFyc2VkVVJMLnBhdGhuYW1lO1xuICB9XG5cbiAgcmV0dXJuIGZvcm1hdCh7XG4gICAgcHJvdG9jb2w6IHNvY2tldFVSTFByb3RvY29sLFxuICAgIGF1dGg6IHNvY2tldFVSTEF1dGgsXG4gICAgaG9zdG5hbWU6IHNvY2tldFVSTEhvc3RuYW1lLFxuICAgIHBvcnQ6IHNvY2tldFVSTFBvcnQsXG4gICAgcGF0aG5hbWU6IHNvY2tldFVSTFBhdGhuYW1lLFxuICAgIHNsYXNoZXM6IHRydWVcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVNvY2tldFVSTDsiLCIvKipcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldEN1cnJlbnRTY3JpcHRTb3VyY2UoKSB7XG4gIC8vIGBkb2N1bWVudC5jdXJyZW50U2NyaXB0YCBpcyB0aGUgbW9zdCBhY2N1cmF0ZSB3YXkgdG8gZmluZCB0aGUgY3VycmVudCBzY3JpcHQsXG4gIC8vIGJ1dCBpcyBub3Qgc3VwcG9ydGVkIGluIGFsbCBicm93c2Vycy5cbiAgaWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5nZXRBdHRyaWJ1dGUoXCJzcmNcIik7XG4gIH0gLy8gRmFsbGJhY2sgdG8gZ2V0dGluZyBhbGwgc2NyaXB0cyBydW5uaW5nIGluIHRoZSBkb2N1bWVudC5cblxuXG4gIHZhciBzY3JpcHRFbGVtZW50cyA9IGRvY3VtZW50LnNjcmlwdHMgfHwgW107XG4gIHZhciBzY3JpcHRFbGVtZW50c1dpdGhTcmMgPSBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwoc2NyaXB0RWxlbWVudHMsIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwic3JjXCIpO1xuICB9KTtcblxuICBpZiAoc2NyaXB0RWxlbWVudHNXaXRoU3JjLmxlbmd0aCA+IDApIHtcbiAgICB2YXIgY3VycmVudFNjcmlwdCA9IHNjcmlwdEVsZW1lbnRzV2l0aFNyY1tzY3JpcHRFbGVtZW50c1dpdGhTcmMubGVuZ3RoIC0gMV07XG4gICAgcmV0dXJuIGN1cnJlbnRTY3JpcHQuZ2V0QXR0cmlidXRlKFwic3JjXCIpO1xuICB9IC8vIEZhaWwgYXMgdGhlcmUgd2FzIG5vIHNjcmlwdCB0byB1c2UuXG5cblxuICB0aHJvdyBuZXcgRXJyb3IoXCJbd2VicGFjay1kZXYtc2VydmVyXSBGYWlsZWQgdG8gZ2V0IGN1cnJlbnQgc2NyaXB0IHNvdXJjZS5cIik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldEN1cnJlbnRTY3JpcHRTb3VyY2U7IiwiaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi4vbW9kdWxlcy9sb2dnZXIvaW5kZXguanNcIjtcbnZhciBuYW1lID0gXCJ3ZWJwYWNrLWRldi1zZXJ2ZXJcIjsgLy8gZGVmYXVsdCBsZXZlbCBpcyBzZXQgb24gdGhlIGNsaWVudCBzaWRlLCBzbyBpdCBkb2VzIG5vdCBuZWVkXG4vLyB0byBiZSBzZXQgYnkgdGhlIENMSSBvciBBUElcblxudmFyIGRlZmF1bHRMZXZlbCA9IFwiaW5mb1wiOyAvLyBvcHRpb25zIG5ldyBvcHRpb25zLCBtZXJnZSB3aXRoIG9sZCBvcHRpb25zXG5cbi8qKlxuICogQHBhcmFtIHtmYWxzZSB8IHRydWUgfCBcIm5vbmVcIiB8IFwiZXJyb3JcIiB8IFwid2FyblwiIHwgXCJpbmZvXCIgfCBcImxvZ1wiIHwgXCJ2ZXJib3NlXCJ9IGxldmVsXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuXG5mdW5jdGlvbiBzZXRMb2dMZXZlbChsZXZlbCkge1xuICBsb2dnZXIuY29uZmlndXJlRGVmYXVsdExvZ2dlcih7XG4gICAgbGV2ZWw6IGxldmVsXG4gIH0pO1xufVxuXG5zZXRMb2dMZXZlbChkZWZhdWx0TGV2ZWwpO1xudmFyIGxvZyA9IGxvZ2dlci5nZXRMb2dnZXIobmFtZSk7XG5leHBvcnQgeyBsb2csIHNldExvZ0xldmVsIH07IiwiaW1wb3J0IGdldEN1cnJlbnRTY3JpcHRTb3VyY2UgZnJvbSBcIi4vZ2V0Q3VycmVudFNjcmlwdFNvdXJjZS5qc1wiO1xuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVzb3VyY2VRdWVyeVxuICogQHJldHVybnMge3sgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgYm9vbGVhbiB9fVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlVVJMKHJlc291cmNlUXVlcnkpIHtcbiAgLyoqIEB0eXBlIHt7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9fSAqL1xuICB2YXIgb3B0aW9ucyA9IHt9O1xuXG4gIGlmICh0eXBlb2YgcmVzb3VyY2VRdWVyeSA9PT0gXCJzdHJpbmdcIiAmJiByZXNvdXJjZVF1ZXJ5ICE9PSBcIlwiKSB7XG4gICAgdmFyIHNlYXJjaFBhcmFtcyA9IHJlc291cmNlUXVlcnkuc3Vic3RyKDEpLnNwbGl0KFwiJlwiKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VhcmNoUGFyYW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcGFpciA9IHNlYXJjaFBhcmFtc1tpXS5zcGxpdChcIj1cIik7XG4gICAgICBvcHRpb25zW3BhaXJbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBFbHNlLCBnZXQgdGhlIHVybCBmcm9tIHRoZSA8c2NyaXB0PiB0aGlzIGZpbGUgd2FzIGNhbGxlZCB3aXRoLlxuICAgIHZhciBzY3JpcHRTb3VyY2UgPSBnZXRDdXJyZW50U2NyaXB0U291cmNlKCk7XG4gICAgdmFyIHNjcmlwdFNvdXJjZVVSTDtcblxuICAgIHRyeSB7XG4gICAgICAvLyBUaGUgcGxhY2Vob2xkZXIgYGJhc2VVUkxgIHdpdGggYHdpbmRvdy5sb2NhdGlvbi5ocmVmYCxcbiAgICAgIC8vIGlzIHRvIGFsbG93IHBhcnNpbmcgb2YgcGF0aC1yZWxhdGl2ZSBvciBwcm90b2NvbC1yZWxhdGl2ZSBVUkxzLFxuICAgICAgLy8gYW5kIHdpbGwgaGF2ZSBubyBlZmZlY3QgaWYgYHNjcmlwdFNvdXJjZWAgaXMgYSBmdWxseSB2YWxpZCBVUkwuXG4gICAgICBzY3JpcHRTb3VyY2VVUkwgPSBuZXcgVVJMKHNjcmlwdFNvdXJjZSwgc2VsZi5sb2NhdGlvbi5ocmVmKTtcbiAgICB9IGNhdGNoIChlcnJvcikgey8vIFVSTCBwYXJzaW5nIGZhaWxlZCwgZG8gbm90aGluZy5cbiAgICAgIC8vIFdlIHdpbGwgc3RpbGwgcHJvY2VlZCB0byBzZWUgaWYgd2UgY2FuIHJlY292ZXIgdXNpbmcgYHJlc291cmNlUXVlcnlgXG4gICAgfVxuXG4gICAgaWYgKHNjcmlwdFNvdXJjZVVSTCkge1xuICAgICAgb3B0aW9ucyA9IHNjcmlwdFNvdXJjZVVSTDtcbiAgICAgIG9wdGlvbnMuZnJvbUN1cnJlbnRTY3JpcHQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvcHRpb25zO1xufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJzZVVSTDsiLCJpbXBvcnQgaG90RW1pdHRlciBmcm9tIFwid2VicGFjay9ob3QvZW1pdHRlci5qc1wiO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vbG9nLmpzXCI7XG4vKiogQHR5cGVkZWYge2ltcG9ydChcIi4uL2luZGV4XCIpLk9wdGlvbnN9IE9wdGlvbnNcbi8qKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vaW5kZXhcIikuU3RhdHVzfSBTdGF0dXNcblxuLyoqXG4gKiBAcGFyYW0ge09wdGlvbnN9IG9wdGlvbnNcbiAqIEBwYXJhbSB7U3RhdHVzfSBzdGF0dXNcbiAqL1xuXG5mdW5jdGlvbiByZWxvYWRBcHAoX3JlZiwgc3RhdHVzKSB7XG4gIHZhciBob3QgPSBfcmVmLmhvdCxcbiAgICAgIGxpdmVSZWxvYWQgPSBfcmVmLmxpdmVSZWxvYWQ7XG5cbiAgaWYgKHN0YXR1cy5pc1VubG9hZGluZykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBjdXJyZW50SGFzaCA9IHN0YXR1cy5jdXJyZW50SGFzaCxcbiAgICAgIHByZXZpb3VzSGFzaCA9IHN0YXR1cy5wcmV2aW91c0hhc2g7XG4gIHZhciBpc0luaXRpYWwgPSBjdXJyZW50SGFzaC5pbmRleE9mKFxuICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgcHJldmlvdXNIYXNoKSA+PSAwO1xuXG4gIGlmIChpc0luaXRpYWwpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7V2luZG93fSByb290V2luZG93XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbnRlcnZhbElkXG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gYXBwbHlSZWxvYWQocm9vdFdpbmRvdywgaW50ZXJ2YWxJZCkge1xuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG4gICAgbG9nLmluZm8oXCJBcHAgdXBkYXRlZC4gUmVsb2FkaW5nLi4uXCIpO1xuICAgIHJvb3RXaW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gIH1cblxuICB2YXIgc2VhcmNoID0gc2VsZi5sb2NhdGlvbi5zZWFyY2gudG9Mb3dlckNhc2UoKTtcbiAgdmFyIGFsbG93VG9Ib3QgPSBzZWFyY2guaW5kZXhPZihcIndlYnBhY2stZGV2LXNlcnZlci1ob3Q9ZmFsc2VcIikgPT09IC0xO1xuICB2YXIgYWxsb3dUb0xpdmVSZWxvYWQgPSBzZWFyY2guaW5kZXhPZihcIndlYnBhY2stZGV2LXNlcnZlci1saXZlLXJlbG9hZD1mYWxzZVwiKSA9PT0gLTE7XG5cbiAgaWYgKGhvdCAmJiBhbGxvd1RvSG90KSB7XG4gICAgbG9nLmluZm8oXCJBcHAgaG90IHVwZGF0ZS4uLlwiKTtcbiAgICBob3RFbWl0dGVyLmVtaXQoXCJ3ZWJwYWNrSG90VXBkYXRlXCIsIHN0YXR1cy5jdXJyZW50SGFzaCk7XG5cbiAgICBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZi53aW5kb3cpIHtcbiAgICAgIC8vIGJyb2FkY2FzdCB1cGRhdGUgdG8gd2luZG93XG4gICAgICBzZWxmLnBvc3RNZXNzYWdlKFwid2VicGFja0hvdFVwZGF0ZVwiLmNvbmNhdChzdGF0dXMuY3VycmVudEhhc2gpLCBcIipcIik7XG4gICAgfVxuICB9IC8vIGFsbG93IHJlZnJlc2hpbmcgdGhlIHBhZ2Ugb25seSBpZiBsaXZlUmVsb2FkIGlzbid0IGRpc2FibGVkXG4gIGVsc2UgaWYgKGxpdmVSZWxvYWQgJiYgYWxsb3dUb0xpdmVSZWxvYWQpIHtcbiAgICB2YXIgcm9vdFdpbmRvdyA9IHNlbGY7IC8vIHVzZSBwYXJlbnQgd2luZG93IGZvciByZWxvYWQgKGluIGNhc2Ugd2UncmUgaW4gYW4gaWZyYW1lIHdpdGggbm8gdmFsaWQgc3JjKVxuXG4gICAgdmFyIGludGVydmFsSWQgPSBzZWxmLnNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChyb290V2luZG93LmxvY2F0aW9uLnByb3RvY29sICE9PSBcImFib3V0OlwiKSB7XG4gICAgICAgIC8vIHJlbG9hZCBpbW1lZGlhdGVseSBpZiBwcm90b2NvbCBpcyB2YWxpZFxuICAgICAgICBhcHBseVJlbG9hZChyb290V2luZG93LCBpbnRlcnZhbElkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3RXaW5kb3cgPSByb290V2luZG93LnBhcmVudDtcblxuICAgICAgICBpZiAocm9vdFdpbmRvdy5wYXJlbnQgPT09IHJvb3RXaW5kb3cpIHtcbiAgICAgICAgICAvLyBpZiBwYXJlbnQgZXF1YWxzIGN1cnJlbnQgd2luZG93IHdlJ3ZlIHJlYWNoZWQgdGhlIHJvb3Qgd2hpY2ggd291bGQgY29udGludWUgZm9yZXZlciwgc28gdHJpZ2dlciBhIHJlbG9hZCBhbnl3YXlzXG4gICAgICAgICAgYXBwbHlSZWxvYWQocm9vdFdpbmRvdywgaW50ZXJ2YWxJZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCByZWxvYWRBcHA7IiwiLyogZ2xvYmFsIF9fcmVzb3VyY2VRdWVyeSBXb3JrZXJHbG9iYWxTY29wZSAqL1xuLy8gU2VuZCBtZXNzYWdlcyB0byB0aGUgb3V0c2lkZSwgc28gcGx1Z2lucyBjYW4gY29uc3VtZSBpdC5cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHBhcmFtIHthbnl9IFtkYXRhXVxuICovXG5mdW5jdGlvbiBzZW5kTXNnKHR5cGUsIGRhdGEpIHtcbiAgaWYgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmICh0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgPT09IFwidW5kZWZpbmVkXCIgfHwgIShzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUpKSkge1xuICAgIHNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgICAgdHlwZTogXCJ3ZWJwYWNrXCIuY29uY2F0KHR5cGUpLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0sIFwiKlwiKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBzZW5kTXNnOyIsInZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKFwiZXZlbnRzXCIpO1xubW9kdWxlLmV4cG9ydHMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4iLCJ2YXIgbG9nTGV2ZWwgPSBcImluZm9cIjtcblxuZnVuY3Rpb24gZHVtbXkoKSB7fVxuXG5mdW5jdGlvbiBzaG91bGRMb2cobGV2ZWwpIHtcblx0dmFyIHNob3VsZExvZyA9XG5cdFx0KGxvZ0xldmVsID09PSBcImluZm9cIiAmJiBsZXZlbCA9PT0gXCJpbmZvXCIpIHx8XG5cdFx0KFtcImluZm9cIiwgXCJ3YXJuaW5nXCJdLmluZGV4T2YobG9nTGV2ZWwpID49IDAgJiYgbGV2ZWwgPT09IFwid2FybmluZ1wiKSB8fFxuXHRcdChbXCJpbmZvXCIsIFwid2FybmluZ1wiLCBcImVycm9yXCJdLmluZGV4T2YobG9nTGV2ZWwpID49IDAgJiYgbGV2ZWwgPT09IFwiZXJyb3JcIik7XG5cdHJldHVybiBzaG91bGRMb2c7XG59XG5cbmZ1bmN0aW9uIGxvZ0dyb3VwKGxvZ0ZuKSB7XG5cdHJldHVybiBmdW5jdGlvbiAobGV2ZWwsIG1zZykge1xuXHRcdGlmIChzaG91bGRMb2cobGV2ZWwpKSB7XG5cdFx0XHRsb2dGbihtc2cpO1xuXHRcdH1cblx0fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGV2ZWwsIG1zZykge1xuXHRpZiAoc2hvdWxkTG9nKGxldmVsKSkge1xuXHRcdGlmIChsZXZlbCA9PT0gXCJpbmZvXCIpIHtcblx0XHRcdGNvbnNvbGUubG9nKG1zZyk7XG5cdFx0fSBlbHNlIGlmIChsZXZlbCA9PT0gXCJ3YXJuaW5nXCIpIHtcblx0XHRcdGNvbnNvbGUud2Fybihtc2cpO1xuXHRcdH0gZWxzZSBpZiAobGV2ZWwgPT09IFwiZXJyb3JcIikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihtc2cpO1xuXHRcdH1cblx0fVxufTtcblxuLyogZXNsaW50LWRpc2FibGUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zICovXG52YXIgZ3JvdXAgPSBjb25zb2xlLmdyb3VwIHx8IGR1bW15O1xudmFyIGdyb3VwQ29sbGFwc2VkID0gY29uc29sZS5ncm91cENvbGxhcHNlZCB8fCBkdW1teTtcbnZhciBncm91cEVuZCA9IGNvbnNvbGUuZ3JvdXBFbmQgfHwgZHVtbXk7XG4vKiBlc2xpbnQtZW5hYmxlIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGlucyAqL1xuXG5tb2R1bGUuZXhwb3J0cy5ncm91cCA9IGxvZ0dyb3VwKGdyb3VwKTtcblxubW9kdWxlLmV4cG9ydHMuZ3JvdXBDb2xsYXBzZWQgPSBsb2dHcm91cChncm91cENvbGxhcHNlZCk7XG5cbm1vZHVsZS5leHBvcnRzLmdyb3VwRW5kID0gbG9nR3JvdXAoZ3JvdXBFbmQpO1xuXG5tb2R1bGUuZXhwb3J0cy5zZXRMb2dMZXZlbCA9IGZ1bmN0aW9uIChsZXZlbCkge1xuXHRsb2dMZXZlbCA9IGxldmVsO1xufTtcblxubW9kdWxlLmV4cG9ydHMuZm9ybWF0RXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG5cdHZhciBtZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG5cdHZhciBzdGFjayA9IGVyci5zdGFjaztcblx0aWYgKCFzdGFjaykge1xuXHRcdHJldHVybiBtZXNzYWdlO1xuXHR9IGVsc2UgaWYgKHN0YWNrLmluZGV4T2YobWVzc2FnZSkgPCAwKSB7XG5cdFx0cmV0dXJuIG1lc3NhZ2UgKyBcIlxcblwiICsgc3RhY2s7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIHN0YWNrO1xuXHR9XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiMDUyYmVlYmQ1ZTYwYjNiYmExYzhcIikiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyogZ2xvYmFsIF9fcmVzb3VyY2VRdWVyeSwgX193ZWJwYWNrX2hhc2hfXyAqL1xuLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ3ZWJwYWNrL21vZHVsZVwiIC8+XG5pbXBvcnQgd2VicGFja0hvdExvZyBmcm9tIFwid2VicGFjay9ob3QvbG9nLmpzXCI7XG5pbXBvcnQgc3RyaXBBbnNpIGZyb20gXCIuL21vZHVsZXMvc3RyaXAtYW5zaS9pbmRleC5qc1wiO1xuaW1wb3J0IHBhcnNlVVJMIGZyb20gXCIuL3V0aWxzL3BhcnNlVVJMLmpzXCI7XG5pbXBvcnQgc29ja2V0IGZyb20gXCIuL3NvY2tldC5qc1wiO1xuaW1wb3J0IHsgZm9ybWF0UHJvYmxlbSwgc2hvdywgaGlkZSB9IGZyb20gXCIuL292ZXJsYXkuanNcIjtcbmltcG9ydCB7IGxvZywgc2V0TG9nTGV2ZWwgfSBmcm9tIFwiLi91dGlscy9sb2cuanNcIjtcbmltcG9ydCBzZW5kTWVzc2FnZSBmcm9tIFwiLi91dGlscy9zZW5kTWVzc2FnZS5qc1wiO1xuaW1wb3J0IHJlbG9hZEFwcCBmcm9tIFwiLi91dGlscy9yZWxvYWRBcHAuanNcIjtcbmltcG9ydCBjcmVhdGVTb2NrZXRVUkwgZnJvbSBcIi4vdXRpbHMvY3JlYXRlU29ja2V0VVJMLmpzXCI7XG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaG90XG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGxpdmVSZWxvYWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcHJvZ3Jlc3NcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IHsgd2FybmluZ3M/OiBib29sZWFuLCBlcnJvcnM/OiBib29sZWFuIH19IG92ZXJsYXlcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbbG9nZ2luZ11cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbcmVjb25uZWN0XVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gU3RhdHVzXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGlzVW5sb2FkaW5nXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY3VycmVudEhhc2hcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbcHJldmlvdXNIYXNoXVxuICovXG5cbi8qKlxuICogQHR5cGUge1N0YXR1c31cbiAqL1xuXG52YXIgc3RhdHVzID0ge1xuICBpc1VubG9hZGluZzogZmFsc2UsXG4gIC8vIFRPRE8gV29ya2Fyb3VuZCBmb3Igd2VicGFjayB2NCwgYF9fd2VicGFja19oYXNoX19gIGlzIG5vdCByZXBsYWNlZCB3aXRob3V0IEhvdE1vZHVsZVJlcGxhY2VtZW50XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgY3VycmVudEhhc2g6IHR5cGVvZiBfX3dlYnBhY2tfaGFzaF9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX2hhc2hfXyA6IFwiXCJcbn07XG4vKiogQHR5cGUge09wdGlvbnN9ICovXG5cbnZhciBvcHRpb25zID0ge1xuICBob3Q6IGZhbHNlLFxuICBsaXZlUmVsb2FkOiBmYWxzZSxcbiAgcHJvZ3Jlc3M6IGZhbHNlLFxuICBvdmVybGF5OiBmYWxzZVxufTtcbnZhciBwYXJzZWRSZXNvdXJjZVF1ZXJ5ID0gcGFyc2VVUkwoX19yZXNvdXJjZVF1ZXJ5KTtcblxuaWYgKHBhcnNlZFJlc291cmNlUXVlcnkuaG90ID09PSBcInRydWVcIikge1xuICBvcHRpb25zLmhvdCA9IHRydWU7XG4gIGxvZy5pbmZvKFwiSG90IE1vZHVsZSBSZXBsYWNlbWVudCBlbmFibGVkLlwiKTtcbn1cblxuaWYgKHBhcnNlZFJlc291cmNlUXVlcnlbXCJsaXZlLXJlbG9hZFwiXSA9PT0gXCJ0cnVlXCIpIHtcbiAgb3B0aW9ucy5saXZlUmVsb2FkID0gdHJ1ZTtcbiAgbG9nLmluZm8oXCJMaXZlIFJlbG9hZGluZyBlbmFibGVkLlwiKTtcbn1cblxuaWYgKHBhcnNlZFJlc291cmNlUXVlcnkubG9nZ2luZykge1xuICBvcHRpb25zLmxvZ2dpbmcgPSBwYXJzZWRSZXNvdXJjZVF1ZXJ5LmxvZ2dpbmc7XG59XG5cbmlmICh0eXBlb2YgcGFyc2VkUmVzb3VyY2VRdWVyeS5yZWNvbm5lY3QgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgb3B0aW9ucy5yZWNvbm5lY3QgPSBOdW1iZXIocGFyc2VkUmVzb3VyY2VRdWVyeS5yZWNvbm5lY3QpO1xufVxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gbGV2ZWxcbiAqL1xuXG5cbmZ1bmN0aW9uIHNldEFsbExvZ0xldmVsKGxldmVsKSB7XG4gIC8vIFRoaXMgaXMgbmVlZGVkIGJlY2F1c2UgdGhlIEhNUiBsb2dnZXIgb3BlcmF0ZSBzZXBhcmF0ZWx5IGZyb20gZGV2IHNlcnZlciBsb2dnZXJcbiAgd2VicGFja0hvdExvZy5zZXRMb2dMZXZlbChsZXZlbCA9PT0gXCJ2ZXJib3NlXCIgfHwgbGV2ZWwgPT09IFwibG9nXCIgPyBcImluZm9cIiA6IGxldmVsKTtcbiAgc2V0TG9nTGV2ZWwobGV2ZWwpO1xufVxuXG5pZiAob3B0aW9ucy5sb2dnaW5nKSB7XG4gIHNldEFsbExvZ0xldmVsKG9wdGlvbnMubG9nZ2luZyk7XG59XG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCBmdW5jdGlvbiAoKSB7XG4gIHN0YXR1cy5pc1VubG9hZGluZyA9IHRydWU7XG59KTtcbnZhciBvblNvY2tldE1lc3NhZ2UgPSB7XG4gIGhvdDogZnVuY3Rpb24gaG90KCkge1xuICAgIGlmIChwYXJzZWRSZXNvdXJjZVF1ZXJ5LmhvdCA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgb3B0aW9ucy5ob3QgPSB0cnVlO1xuICAgIGxvZy5pbmZvKFwiSG90IE1vZHVsZSBSZXBsYWNlbWVudCBlbmFibGVkLlwiKTtcbiAgfSxcbiAgbGl2ZVJlbG9hZDogZnVuY3Rpb24gbGl2ZVJlbG9hZCgpIHtcbiAgICBpZiAocGFyc2VkUmVzb3VyY2VRdWVyeVtcImxpdmUtcmVsb2FkXCJdID09PSBcImZhbHNlXCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBvcHRpb25zLmxpdmVSZWxvYWQgPSB0cnVlO1xuICAgIGxvZy5pbmZvKFwiTGl2ZSBSZWxvYWRpbmcgZW5hYmxlZC5cIik7XG4gIH0sXG4gIGludmFsaWQ6IGZ1bmN0aW9uIGludmFsaWQoKSB7XG4gICAgbG9nLmluZm8oXCJBcHAgdXBkYXRlZC4gUmVjb21waWxpbmcuLi5cIik7IC8vIEZpeGVzICMxMDQyLiBvdmVybGF5IGRvZXNuJ3QgY2xlYXIgaWYgZXJyb3JzIGFyZSBmaXhlZCBidXQgd2FybmluZ3MgcmVtYWluLlxuXG4gICAgaWYgKG9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgaGlkZSgpO1xuICAgIH1cblxuICAgIHNlbmRNZXNzYWdlKFwiSW52YWxpZFwiKTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGhhc2hcbiAgICovXG4gIGhhc2g6IGZ1bmN0aW9uIGhhc2goX2hhc2gpIHtcbiAgICBzdGF0dXMucHJldmlvdXNIYXNoID0gc3RhdHVzLmN1cnJlbnRIYXNoO1xuICAgIHN0YXR1cy5jdXJyZW50SGFzaCA9IF9oYXNoO1xuICB9LFxuICBsb2dnaW5nOiBzZXRBbGxMb2dMZXZlbCxcblxuICAvKipcbiAgICogQHBhcmFtIHtib29sZWFufSB2YWx1ZVxuICAgKi9cbiAgb3ZlcmxheTogZnVuY3Rpb24gb3ZlcmxheSh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBvcHRpb25zLm92ZXJsYXkgPSB2YWx1ZTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAqL1xuICByZWNvbm5lY3Q6IGZ1bmN0aW9uIHJlY29ubmVjdCh2YWx1ZSkge1xuICAgIGlmIChwYXJzZWRSZXNvdXJjZVF1ZXJ5LnJlY29ubmVjdCA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgb3B0aW9ucy5yZWNvbm5lY3QgPSB2YWx1ZTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtib29sZWFufSB2YWx1ZVxuICAgKi9cbiAgcHJvZ3Jlc3M6IGZ1bmN0aW9uIHByb2dyZXNzKHZhbHVlKSB7XG4gICAgb3B0aW9ucy5wcm9ncmVzcyA9IHZhbHVlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3sgcGx1Z2luTmFtZT86IHN0cmluZywgcGVyY2VudDogbnVtYmVyLCBtc2c6IHN0cmluZyB9fSBkYXRhXG4gICAqL1xuICBcInByb2dyZXNzLXVwZGF0ZVwiOiBmdW5jdGlvbiBwcm9ncmVzc1VwZGF0ZShkYXRhKSB7XG4gICAgaWYgKG9wdGlvbnMucHJvZ3Jlc3MpIHtcbiAgICAgIGxvZy5pbmZvKFwiXCIuY29uY2F0KGRhdGEucGx1Z2luTmFtZSA/IFwiW1wiLmNvbmNhdChkYXRhLnBsdWdpbk5hbWUsIFwiXSBcIikgOiBcIlwiKS5jb25jYXQoZGF0YS5wZXJjZW50LCBcIiUgLSBcIikuY29uY2F0KGRhdGEubXNnLCBcIi5cIikpO1xuICAgIH1cblxuICAgIHNlbmRNZXNzYWdlKFwiUHJvZ3Jlc3NcIiwgZGF0YSk7XG4gIH0sXG4gIFwic3RpbGwtb2tcIjogZnVuY3Rpb24gc3RpbGxPaygpIHtcbiAgICBsb2cuaW5mbyhcIk5vdGhpbmcgY2hhbmdlZC5cIik7XG5cbiAgICBpZiAob3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICBoaWRlKCk7XG4gICAgfVxuXG4gICAgc2VuZE1lc3NhZ2UoXCJTdGlsbE9rXCIpO1xuICB9LFxuICBvazogZnVuY3Rpb24gb2soKSB7XG4gICAgc2VuZE1lc3NhZ2UoXCJPa1wiKTtcblxuICAgIGlmIChvcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgIGhpZGUoKTtcbiAgICB9XG5cbiAgICByZWxvYWRBcHAob3B0aW9ucywgc3RhdHVzKTtcbiAgfSxcbiAgLy8gVE9ETzogcmVtb3ZlIGluIHY1IGluIGZhdm9yIG9mICdzdGF0aWMtY2hhbmdlZCdcblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVcbiAgICovXG4gIFwiY29udGVudC1jaGFuZ2VkXCI6IGZ1bmN0aW9uIGNvbnRlbnRDaGFuZ2VkKGZpbGUpIHtcbiAgICBsb2cuaW5mbyhcIlwiLmNvbmNhdChmaWxlID8gXCJcXFwiXCIuY29uY2F0KGZpbGUsIFwiXFxcIlwiKSA6IFwiQ29udGVudFwiLCBcIiBmcm9tIHN0YXRpYyBkaXJlY3Rvcnkgd2FzIGNoYW5nZWQuIFJlbG9hZGluZy4uLlwiKSk7XG4gICAgc2VsZi5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVcbiAgICovXG4gIFwic3RhdGljLWNoYW5nZWRcIjogZnVuY3Rpb24gc3RhdGljQ2hhbmdlZChmaWxlKSB7XG4gICAgbG9nLmluZm8oXCJcIi5jb25jYXQoZmlsZSA/IFwiXFxcIlwiLmNvbmNhdChmaWxlLCBcIlxcXCJcIikgOiBcIkNvbnRlbnRcIiwgXCIgZnJvbSBzdGF0aWMgZGlyZWN0b3J5IHdhcyBjaGFuZ2VkLiBSZWxvYWRpbmcuLi5cIikpO1xuICAgIHNlbGYubG9jYXRpb24ucmVsb2FkKCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RXJyb3JbXX0gd2FybmluZ3NcbiAgICogQHBhcmFtIHthbnl9IHBhcmFtc1xuICAgKi9cbiAgd2FybmluZ3M6IGZ1bmN0aW9uIHdhcm5pbmdzKF93YXJuaW5ncywgcGFyYW1zKSB7XG4gICAgbG9nLndhcm4oXCJXYXJuaW5ncyB3aGlsZSBjb21waWxpbmcuXCIpO1xuXG4gICAgdmFyIHByaW50YWJsZVdhcm5pbmdzID0gX3dhcm5pbmdzLm1hcChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIHZhciBfZm9ybWF0UHJvYmxlbSA9IGZvcm1hdFByb2JsZW0oXCJ3YXJuaW5nXCIsIGVycm9yKSxcbiAgICAgICAgICBoZWFkZXIgPSBfZm9ybWF0UHJvYmxlbS5oZWFkZXIsXG4gICAgICAgICAgYm9keSA9IF9mb3JtYXRQcm9ibGVtLmJvZHk7XG5cbiAgICAgIHJldHVybiBcIlwiLmNvbmNhdChoZWFkZXIsIFwiXFxuXCIpLmNvbmNhdChzdHJpcEFuc2koYm9keSkpO1xuICAgIH0pO1xuXG4gICAgc2VuZE1lc3NhZ2UoXCJXYXJuaW5nc1wiLCBwcmludGFibGVXYXJuaW5ncyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByaW50YWJsZVdhcm5pbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsb2cud2FybihwcmludGFibGVXYXJuaW5nc1tpXSk7XG4gICAgfVxuXG4gICAgdmFyIG5lZWRTaG93T3ZlcmxheUZvcldhcm5pbmdzID0gdHlwZW9mIG9wdGlvbnMub3ZlcmxheSA9PT0gXCJib29sZWFuXCIgPyBvcHRpb25zLm92ZXJsYXkgOiBvcHRpb25zLm92ZXJsYXkgJiYgb3B0aW9ucy5vdmVybGF5Lndhcm5pbmdzO1xuXG4gICAgaWYgKG5lZWRTaG93T3ZlcmxheUZvcldhcm5pbmdzKSB7XG4gICAgICBzaG93KFwid2FybmluZ1wiLCBfd2FybmluZ3MpO1xuICAgIH1cblxuICAgIGlmIChwYXJhbXMgJiYgcGFyYW1zLnByZXZlbnRSZWxvYWRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZWxvYWRBcHAob3B0aW9ucywgc3RhdHVzKTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtFcnJvcltdfSBlcnJvcnNcbiAgICovXG4gIGVycm9yczogZnVuY3Rpb24gZXJyb3JzKF9lcnJvcnMpIHtcbiAgICBsb2cuZXJyb3IoXCJFcnJvcnMgd2hpbGUgY29tcGlsaW5nLiBSZWxvYWQgcHJldmVudGVkLlwiKTtcblxuICAgIHZhciBwcmludGFibGVFcnJvcnMgPSBfZXJyb3JzLm1hcChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIHZhciBfZm9ybWF0UHJvYmxlbTIgPSBmb3JtYXRQcm9ibGVtKFwiZXJyb3JcIiwgZXJyb3IpLFxuICAgICAgICAgIGhlYWRlciA9IF9mb3JtYXRQcm9ibGVtMi5oZWFkZXIsXG4gICAgICAgICAgYm9keSA9IF9mb3JtYXRQcm9ibGVtMi5ib2R5O1xuXG4gICAgICByZXR1cm4gXCJcIi5jb25jYXQoaGVhZGVyLCBcIlxcblwiKS5jb25jYXQoc3RyaXBBbnNpKGJvZHkpKTtcbiAgICB9KTtcblxuICAgIHNlbmRNZXNzYWdlKFwiRXJyb3JzXCIsIHByaW50YWJsZUVycm9ycyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByaW50YWJsZUVycm9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgbG9nLmVycm9yKHByaW50YWJsZUVycm9yc1tpXSk7XG4gICAgfVxuXG4gICAgdmFyIG5lZWRTaG93T3ZlcmxheUZvckVycm9ycyA9IHR5cGVvZiBvcHRpb25zLm92ZXJsYXkgPT09IFwiYm9vbGVhblwiID8gb3B0aW9ucy5vdmVybGF5IDogb3B0aW9ucy5vdmVybGF5ICYmIG9wdGlvbnMub3ZlcmxheS5lcnJvcnM7XG5cbiAgICBpZiAobmVlZFNob3dPdmVybGF5Rm9yRXJyb3JzKSB7XG4gICAgICBzaG93KFwiZXJyb3JcIiwgX2Vycm9ycyk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0Vycm9yfSBlcnJvclxuICAgKi9cbiAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKF9lcnJvcikge1xuICAgIGxvZy5lcnJvcihfZXJyb3IpO1xuICB9LFxuICBjbG9zZTogZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgbG9nLmluZm8oXCJEaXNjb25uZWN0ZWQhXCIpO1xuXG4gICAgaWYgKG9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgaGlkZSgpO1xuICAgIH1cblxuICAgIHNlbmRNZXNzYWdlKFwiQ2xvc2VcIik7XG4gIH1cbn07XG52YXIgc29ja2V0VVJMID0gY3JlYXRlU29ja2V0VVJMKHBhcnNlZFJlc291cmNlUXVlcnkpO1xuc29ja2V0KHNvY2tldFVSTCwgb25Tb2NrZXRNZXNzYWdlLCBvcHRpb25zLnJlY29ubmVjdCk7IiwiaW1wb3J0IENhbnZhcyBmcm9tIFwiLi9jb21wb25lbnRzL2NhbnZhc1wiXHJcblxyXG5jbGFzcyBBcHAge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0KClcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIG5ldyBDYW52YXMoKVxyXG4gICAgfVxyXG59XHJcbm5ldyBBcHAoKSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJvZ2wiLCJ2ZXJ0ZXhTaGFkZXIiLCJmcmFnbWVudFNoYWRlciIsIkNhbnZhcyIsImNvbnN0cnVjdG9yIiwiYmluZCIsImltZ1NpemUiLCJjYW52YXMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJyZW5kZXJlciIsIlJlbmRlcmVyIiwiZHByIiwiZ2wiLCJhc3BlY3QiLCJtb3VzZSIsIlZlYzIiLCJ2ZWxvY2l0eSIsImZsb3dtYXAiLCJGbG93bWFwIiwibGFzdFRpbWUiLCJ1bmRlZmluZWQiLCJsYXN0TW91c2UiLCJyQUYiLCJpbml0IiwiZm9yRWFjaCIsImZuIiwicmVzaXplIiwiYTEiLCJhMiIsImltYWdlQXNwZWN0Iiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJpbm5lcldpZHRoIiwibWVzaCIsInByb2dyYW0iLCJ1bmlmb3JtcyIsInJlcyIsInZhbHVlIiwiVmVjNCIsInNldFNpemUiLCJjcmVhdGVHZW9tZXRyeSIsImdlb21ldHJ5IiwiR2VvbWV0cnkiLCJwb3NpdGlvbiIsInNpemUiLCJkYXRhIiwiRmxvYXQzMkFycmF5IiwidXYiLCJ1cGRhdGVUZXh0dXJlIiwidGV4dHVyZSIsIlRleHR1cmUiLCJtaW5GaWx0ZXIiLCJMSU5FQVIiLCJtYWdGaWx0ZXIiLCJpbWciLCJJbWFnZSIsIm9ubG9hZCIsImltYWdlIiwiY3Jvc3NPcmlnaW4iLCJzcmMiLCJjcmVhdGVTaGFkZXJzIiwidGV4dHVyZUFzcGVjdCIsIlByb2dyYW0iLCJ2ZXJ0ZXgiLCJmcmFnbWVudCIsInVUaW1lIiwidFdhdGVyIiwidEZsb3ciLCJ1bmlmb3JtIiwiY3JlYXRlTWVzaCIsIk1lc2giLCJ1cGRhdGVNb3VzZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImNoYW5nZWRUb3VjaGVzIiwibGVuZ3RoIiwieCIsInBhZ2VYIiwieSIsInBhZ2VZIiwic2V0Iiwid2lkdGgiLCJoZWlnaHQiLCJwZXJmb3JtYW5jZSIsIm5vdyIsImRlbHRhWCIsImRlbHRhWSIsInRpbWUiLCJkZWx0YSIsIk1hdGgiLCJtYXgiLCJuZWVkc1VwZGF0ZSIsInVwZGF0ZSIsInQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjb3B5IiwibGVycCIsImxlbiIsInJlbmRlciIsInNjZW5lIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJhZGRFdmVudExpc3RlbmVycyIsImlzVG91Y2hDYXBhYmxlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhc3NpdmUiLCJyZW1vdmVFdmVudExpc3RlbmVycyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJkZXN0cm95IiwiYSIsImIiLCJjIiwiZCIsInNxcnQiLCJ1IiwidiIsInciLCJmIiwieiIsIkEiLCJQSSIsImFjb3MiLCJBcnJheSIsImciLCJhZGQiLCJzdWIiLCJtdWx0aXBseSIsImRpdmlkZSIsImludmVyc2UiLCJkaXN0YW5jZSIsInNxdWFyZWRMZW4iLCJzcXVhcmVkRGlzdGFuY2UiLCJqIiwiaCIsImkiLCJuZWdhdGUiLCJjcm9zcyIsImsiLCJzY2FsZSIsIm5vcm1hbGl6ZSIsImRvdCIsImVxdWFscyIsImFwcGx5TWF0cml4NCIsImFwcGx5UXVhdGVybmlvbiIsInEiLCJsIiwibiIsIm8iLCJwIiwibSIsImFuZ2xlIiwiY2xvbmUiLCJmcm9tQXJyYXkiLCJ0b0FycmF5IiwidHJhbnNmb3JtRGlyZWN0aW9uIiwiQiIsIkMiLCJEIiwiYXR0cmlidXRlcyIsImlkIiwiVkFPcyIsImRyYXdSYW5nZSIsInN0YXJ0IiwiY291bnQiLCJpbnN0YW5jZWRDb3VudCIsImJpbmRWZXJ0ZXhBcnJheSIsImN1cnJlbnRHZW9tZXRyeSIsImdsU3RhdGUiLCJzdGF0ZSIsImFkZEF0dHJpYnV0ZSIsInR5cGUiLCJGTE9BVCIsIlVpbnQxNkFycmF5IiwiVU5TSUdORURfU0hPUlQiLCJVTlNJR05FRF9JTlQiLCJ0YXJnZXQiLCJFTEVNRU5UX0FSUkFZX0JVRkZFUiIsIkFSUkFZX0JVRkZFUiIsImJ1ZmZlciIsImNyZWF0ZUJ1ZmZlciIsImRpdmlzb3IiLCJpbnN0YW5jZWQiLCJ1cGRhdGVBdHRyaWJ1dGUiLCJpc0luc3RhbmNlZCIsImNvbnNvbGUiLCJ3YXJuIiwibWluIiwiaW5kZXgiLCJib3VuZEJ1ZmZlciIsImJpbmRCdWZmZXIiLCJidWZmZXJEYXRhIiwiU1RBVElDX0RSQVciLCJzZXRJbmRleCIsInNldERyYXdSYW5nZSIsInNldEluc3RhbmNlZENvdW50IiwiY3JlYXRlVkFPIiwiYXR0cmlidXRlT3JkZXIiLCJjcmVhdGVWZXJ0ZXhBcnJheSIsImJpbmRBdHRyaWJ1dGVzIiwiYXR0cmlidXRlTG9jYXRpb25zIiwidmVydGV4QXR0cmliUG9pbnRlciIsImVuYWJsZVZlcnRleEF0dHJpYkFycmF5IiwidmVydGV4QXR0cmliRGl2aXNvciIsImRyYXciLCJtb2RlIiwiVFJJQU5HTEVTIiwiZHJhd0VsZW1lbnRzSW5zdGFuY2VkIiwiZHJhd0FycmF5c0luc3RhbmNlZCIsImRyYXdFbGVtZW50cyIsImRyYXdBcnJheXMiLCJjb21wdXRlQm91bmRpbmdCb3giLCJib3VuZHMiLCJjZW50ZXIiLCJyYWRpdXMiLCJjb21wdXRlQm91bmRpbmdTcGhlcmUiLCJyZW1vdmUiLCJ2YW8iLCJkZWxldGVWZXJ0ZXhBcnJheSIsImRlbGV0ZUJ1ZmZlciIsIkUiLCJGIiwidHJhbnNwYXJlbnQiLCJjdWxsRmFjZSIsIkJBQ0siLCJmcm9udEZhY2UiLCJDQ1ciLCJkZXB0aFRlc3QiLCJkZXB0aFdyaXRlIiwiciIsImRlcHRoRnVuYyIsInMiLCJMRVNTIiwiYmxlbmRGdW5jIiwiYmxlbmRFcXVhdGlvbiIsInByZW11bHRpcGxpZWRBbHBoYSIsInNldEJsZW5kRnVuYyIsIk9ORSIsIk9ORV9NSU5VU19TUkNfQUxQSEEiLCJTUkNfQUxQSEEiLCJjcmVhdGVTaGFkZXIiLCJWRVJURVhfU0hBREVSIiwic2hhZGVyU291cmNlIiwiY29tcGlsZVNoYWRlciIsImdldFNoYWRlckluZm9Mb2ciLCJIIiwiRlJBR01FTlRfU0hBREVSIiwiY3JlYXRlUHJvZ3JhbSIsImF0dGFjaFNoYWRlciIsImxpbmtQcm9ncmFtIiwiZ2V0UHJvZ3JhbVBhcmFtZXRlciIsIkxJTktfU1RBVFVTIiwiZ2V0UHJvZ3JhbUluZm9Mb2ciLCJkZWxldGVTaGFkZXIiLCJ1bmlmb3JtTG9jYXRpb25zIiwiTWFwIiwiQUNUSVZFX1VOSUZPUk1TIiwiZ2V0QWN0aXZlVW5pZm9ybSIsImdldFVuaWZvcm1Mb2NhdGlvbiIsIm5hbWUiLCJtYXRjaCIsInVuaWZvcm1OYW1lIiwiaXNTdHJ1Y3RBcnJheSIsInN0cnVjdEluZGV4IiwiTnVtYmVyIiwic3RydWN0UHJvcGVydHkiLCJpc05hTiIsImlzU3RydWN0IiwiQUNUSVZFX0FUVFJJQlVURVMiLCJnZXRBY3RpdmVBdHRyaWIiLCJnZXRBdHRyaWJMb2NhdGlvbiIsImpvaW4iLCJkc3QiLCJzcmNBbHBoYSIsImRzdEFscGhhIiwic2V0QmxlbmRFcXVhdGlvbiIsIm1vZGVSR0IiLCJtb2RlQWxwaGEiLCJhcHBseVN0YXRlIiwiZW5hYmxlIiwiREVQVEhfVEVTVCIsImRpc2FibGUiLCJDVUxMX0ZBQ0UiLCJCTEVORCIsInNldEN1bGxGYWNlIiwic2V0RnJvbnRGYWNlIiwic2V0RGVwdGhNYXNrIiwic2V0RGVwdGhGdW5jIiwidXNlIiwiZmxpcEZhY2VzIiwiY3VycmVudFByb2dyYW0iLCJ1c2VQcm9ncmFtIiwiSiIsIkciLCJwdXNoIiwiQ1ciLCJkZWxldGVQcm9ncmFtIiwiZ2V0Iiwic2xpY2UiLCJ1bmlmb3JtMWZ2IiwidW5pZm9ybTFmIiwidW5pZm9ybTJmdiIsInVuaWZvcm0zZnYiLCJ1bmlmb3JtNGZ2IiwidW5pZm9ybTFpdiIsInVuaWZvcm0xaSIsInVuaWZvcm0yaXYiLCJ1bmlmb3JtM2l2IiwidW5pZm9ybTRpdiIsInVuaWZvcm1NYXRyaXgyZnYiLCJ1bmlmb3JtTWF0cml4M2Z2IiwidW5pZm9ybU1hdHJpeDRmdiIsInNwbGl0IiwiSSIsIksiLCJMIiwiTSIsIl8iLCJOIiwib25DaGFuZ2UiLCJpZGVudGl0eSIsInJvdGF0ZVgiLCJzaW4iLCJjb3MiLCJyb3RhdGVZIiwicm90YXRlWiIsImNvbmp1Z2F0ZSIsImZyb21NYXRyaXgzIiwiZnJvbUV1bGVyIiwib3JkZXIiLCJmcm9tQXhpc0FuZ2xlIiwic2xlcnAiLCJPIiwidHJhbnNsYXRlIiwiZnJvbVBlcnNwZWN0aXZlIiwiZm92IiwibmVhciIsImZhciIsInRhbiIsImZyb21PcnRob2dvbmFsIiwibGVmdCIsInJpZ2h0IiwiYm90dG9tIiwidG9wIiwiZnJvbVF1YXRlcm5pb24iLCJzZXRQb3NpdGlvbiIsImNvbXBvc2UiLCJnZXRSb3RhdGlvbiIsImdldFRyYW5zbGF0aW9uIiwiZ2V0U2NhbGluZyIsImdldE1heFNjYWxlT25BeGlzIiwibG9va0F0IiwiZGV0ZXJtaW5hbnQiLCJQIiwicmVvcmRlciIsImZyb21Sb3RhdGlvbk1hdHJpeCIsImFzaW4iLCJhYnMiLCJhdGFuMiIsInBhcmVudCIsImNoaWxkcmVuIiwidmlzaWJsZSIsIm1hdHJpeCIsIndvcmxkTWF0cml4IiwibWF0cml4QXV0b1VwZGF0ZSIsInF1YXRlcm5pb24iLCJyb3RhdGlvbiIsInVwIiwic2V0UGFyZW50IiwicmVtb3ZlQ2hpbGQiLCJhZGRDaGlsZCIsImluZGV4T2YiLCJzcGxpY2UiLCJ1cGRhdGVNYXRyaXhXb3JsZCIsInVwZGF0ZU1hdHJpeCIsIndvcmxkTWF0cml4TmVlZHNVcGRhdGUiLCJ0cmF2ZXJzZSIsImRlY29tcG9zZSIsIlEiLCJSIiwiUyIsIlQiLCJyb3RhdGUiLCJmcm9tTWF0cml4NCIsImZyb21CYXNpcyIsImdldE5vcm1hbE1hdHJpeCIsIlUiLCJmcnVzdHVtQ3VsbGVkIiwicmVuZGVyT3JkZXIiLCJtb2RlbFZpZXdNYXRyaXgiLCJub3JtYWxNYXRyaXgiLCJtb2RlbE1hdHJpeCIsIk9iamVjdCIsImFzc2lnbiIsInZpZXdNYXRyaXgiLCJwcm9qZWN0aW9uTWF0cml4IiwiY2FtZXJhUG9zaXRpb24iLCJjYW1lcmEiLCJvbkJlZm9yZVJlbmRlciIsIm9uQWZ0ZXJSZW5kZXIiLCJWIiwiVWludDhBcnJheSIsIlciLCJYIiwiVEVYVFVSRV8yRCIsIlVOU0lHTkVEX0JZVEUiLCJmb3JtYXQiLCJSR0JBIiwiaW50ZXJuYWxGb3JtYXQiLCJ3cmFwUyIsIkNMQU1QX1RPX0VER0UiLCJ3cmFwVCIsImdlbmVyYXRlTWlwbWFwcyIsIk5FQVJFU1RfTUlQTUFQX0xJTkVBUiIsInByZW11bHRpcGx5QWxwaGEiLCJ1bnBhY2tBbGlnbm1lbnQiLCJmbGlwWSIsImxldmVsIiwiY3JlYXRlVGV4dHVyZSIsInN0b3JlIiwiUkVQRUFUIiwidGV4dHVyZVVuaXRzIiwiYWN0aXZlVGV4dHVyZVVuaXQiLCJiaW5kVGV4dHVyZSIsImFjdGl2ZVRleHR1cmUiLCJwaXhlbFN0b3JlaSIsIlVOUEFDS19GTElQX1lfV0VCR0wiLCJVTlBBQ0tfUFJFTVVMVElQTFlfQUxQSEFfV0VCR0wiLCJVTlBBQ0tfQUxJR05NRU5UIiwidGV4UGFyYW1ldGVyaSIsIlRFWFRVUkVfTUlOX0ZJTFRFUiIsIlRFWFRVUkVfTUFHX0ZJTFRFUiIsIlRFWFRVUkVfV1JBUF9TIiwiVEVYVFVSRV9XUkFQX1QiLCJpc1dlYmdsMiIsIkFycmF5QnVmZmVyIiwiaXNWaWV3IiwidGV4SW1hZ2UyRCIsImdlbmVyYXRlTWlwbWFwIiwib25VcGRhdGUiLCJGUkFNRUJVRkZFUiIsImNvbG9yIiwiZGVwdGgiLCJzdGVuY2lsIiwiZGVwdGhUZXh0dXJlIiwiY3JlYXRlRnJhbWVidWZmZXIiLCJiaW5kRnJhbWVidWZmZXIiLCJ0ZXh0dXJlcyIsImZyYW1lYnVmZmVyVGV4dHVyZTJEIiwiQ09MT1JfQVRUQUNITUVOVDAiLCJnZXRFeHRlbnNpb24iLCJORUFSRVNUIiwiREVQVEhfQ09NUE9ORU5UIiwiREVQVEhfQ09NUE9ORU5UMjQiLCJERVBUSF9BVFRBQ0hNRU5UIiwiZGVwdGhCdWZmZXIiLCJjcmVhdGVSZW5kZXJidWZmZXIiLCJiaW5kUmVuZGVyYnVmZmVyIiwiUkVOREVSQlVGRkVSIiwicmVuZGVyYnVmZmVyU3RvcmFnZSIsIkRFUFRIX0NPTVBPTkVOVDE2IiwiZnJhbWVidWZmZXJSZW5kZXJidWZmZXIiLCJzdGVuY2lsQnVmZmVyIiwiU1RFTkNJTF9JTkRFWDgiLCJTVEVOQ0lMX0FUVEFDSE1FTlQiLCJkZXB0aFN0ZW5jaWxCdWZmZXIiLCJERVBUSF9TVEVOQ0lMIiwiREVQVEhfU1RFTkNJTF9BVFRBQ0hNRU5UIiwiaGV4VG9SR0IiLCJleGVjIiwicGFyc2VJbnQiLCJZIiwiJCIsIloiLCJhYSIsImFwcGx5TWF0cml4MyIsIndpZHRoU2VnbWVudHMiLCJoZWlnaHRTZWdtZW50cyIsIlVpbnQzMkFycmF5IiwiYnVpbGRQbGFuZSIsIm5vcm1hbCIsImFiIiwiTk9ORSIsIlJPVEFURSIsIkRPTExZIiwiUEFOIiwiRE9MTFlfUEFOIiwiYWMiLCJhZCIsImFlIiwiYWYiLCJhZyIsImFoIiwiYWkiLCJhaiIsImFrIiwiYWwiLCJhbSIsImFuIiwiYW8iLCJvYmplY3RzIiwiZWxhcHNlZCIsIndlaWdodCIsImR1cmF0aW9uIiwiZnJhbWVzIiwiZmxvb3IiLCJhcCIsIkFuaW1hdGlvbiIsIkJveCIsImRlcHRoU2VnbWVudHMiLCJDYW1lcmEiLCJwcm9qZWN0aW9uVmlld01hdHJpeCIsIm9ydGhvZ3JhcGhpYyIsInBlcnNwZWN0aXZlIiwicHJvamVjdCIsInVucHJvamVjdCIsInVwZGF0ZUZydXN0dW0iLCJmcnVzdHVtIiwiY29uc3RhbnQiLCJmcnVzdHVtSW50ZXJzZWN0c01lc2giLCJmcnVzdHVtSW50ZXJzZWN0c1NwaGVyZSIsIkNvbG9yIiwiQ3lsaW5kZXIiLCJyYWRpYWxTZWdtZW50cyIsIkV1bGVyIiwiZmFsbG9mZiIsImFscGhhIiwiZGlzc2lwYXRpb24iLCJtYXNrIiwicmVhZCIsIndyaXRlIiwic3dhcCIsImV4dGVuc2lvbnMiLCJIQUxGX0ZMT0FUIiwiT0VTX3RleHR1cmVfaGFsZl9mbG9hdCIsIkhBTEZfRkxPQVRfT0VTIiwiUkdCQTE2RiIsInRNYXAiLCJ1RmFsbG9mZiIsInVBbHBoYSIsInVEaXNzaXBhdGlvbiIsInVBc3BlY3QiLCJ1TW91c2UiLCJ1VmVsb2NpdHkiLCJjbGVhciIsIkdQR1BVIiwicGFzc2VzIiwiZGF0YUxlbmd0aCIsInBvdyIsImNlaWwiLCJsb2ciLCJMTjIiLCJjb29yZHMiLCJSR0JBMzJGIiwiZmJvIiwiYWRkUGFzcyIsInRleHR1cmVVbmlmb3JtIiwiZW5hYmxlZCIsImZpbHRlciIsIk1hdDMiLCJNYXQ0IiwiTm9ybWFsUHJvZ3JhbSIsIk9yYml0IiwiZWxlbWVudCIsImVhc2UiLCJpbmVydGlhIiwiZW5hYmxlUm90YXRlIiwicm90YXRlU3BlZWQiLCJlbmFibGVab29tIiwiem9vbVNwZWVkIiwiZW5hYmxlUGFuIiwicGFuU3BlZWQiLCJtaW5Qb2xhckFuZ2xlIiwibWF4UG9sYXJBbmdsZSIsIm1pbkF6aW11dGhBbmdsZSIsIm1heEF6aW11dGhBbmdsZSIsIm1pbkRpc3RhbmNlIiwibWF4RGlzdGFuY2UiLCJwaGkiLCJ0aGV0YSIsIm1vdXNlQnV0dG9ucyIsIk9SQklUIiwiWk9PTSIsImJvZHkiLCJjbGllbnRIZWlnaHQiLCJidXR0b24iLCJjbGllbnRYIiwiY2xpZW50WSIsInN0b3BQcm9wYWdhdGlvbiIsInRvdWNoZXMiLCJQbGFuZSIsIlBvc3QiLCJvcHRpb25zIiwic29ydCIsImZydXN0dW1DdWxsIiwiUXVhdCIsIlJheWNhc3QiLCJvcmlnaW4iLCJkaXJlY3Rpb24iLCJjYXN0TW91c2UiLCJpbnRlcnNlY3RCb3VuZHMiLCJpc0FycmF5IiwicmF5Y2FzdCIsImludGVyc2VjdFNwaGVyZSIsImludGVyc2VjdEJveCIsImhpdCIsImxvY2FsUG9pbnQiLCJSZW5kZXJUYXJnZXQiLCJjcmVhdGVFbGVtZW50IiwiYW50aWFsaWFzIiwicHJlc2VydmVEcmF3aW5nQnVmZmVyIiwicG93ZXJQcmVmZXJlbmNlIiwiYXV0b0NsZWFyIiwid2ViZ2wiLCJnZXRDb250ZXh0IiwicGFyYW1ldGVycyIsIm1heFRleHR1cmVVbml0cyIsImdldFBhcmFtZXRlciIsIk1BWF9DT01CSU5FRF9URVhUVVJFX0lNQUdFX1VOSVRTIiwiWkVSTyIsIkZVTkNfQUREIiwiZGVwdGhNYXNrIiwiZnJhbWVidWZmZXIiLCJ2aWV3cG9ydCIsInN0eWxlIiwic2V0Vmlld3BvcnQiLCJibGVuZEZ1bmNTZXBhcmF0ZSIsImJsZW5kRXF1YXRpb25TZXBhcmF0ZSIsIlRFWFRVUkUwIiwic29ydE9wYXF1ZSIsInpEZXB0aCIsInNvcnRUcmFuc3BhcmVudCIsInNvcnRVSSIsImdldFJlbmRlckxpc3QiLCJjb25jYXQiLCJDT0xPUl9CVUZGRVJfQklUIiwiREVQVEhfQlVGRkVSX0JJVCIsIlNURU5DSUxfQlVGRkVSX0JJVCIsIlNraW4iLCJyaWciLCJjcmVhdGVCb25lcyIsImNyZWF0ZUJvbmVUZXh0dXJlIiwiYW5pbWF0aW9ucyIsImJvbmVUZXh0dXJlIiwiYm9uZVRleHR1cmVTaXplIiwicm9vdCIsImJvbmVzIiwiYmluZFBvc2UiLCJiaW5kSW52ZXJzZSIsImJvbmVNYXRyaWNlcyIsImFkZEFuaW1hdGlvbiIsIlNwaGVyZSIsInBoaVN0YXJ0IiwicGhpTGVuZ3RoIiwidGhldGFTdGFydCIsInRoZXRhTGVuZ3RoIiwiVGV4dCIsImZvbnQiLCJ0ZXh0IiwiYWxpZ24iLCJsZXR0ZXJTcGFjaW5nIiwibGluZUhlaWdodCIsIndvcmRTcGFjaW5nIiwid29yZEJyZWFrIiwiY29tbW9uIiwiYmFzZSIsInJlcGxhY2UiLCJnbHlwaHMiLCJ0ZXN0IiwieGFkdmFuY2UiLCJwb3AiLCJzY2FsZVciLCJzY2FsZUgiLCJjaGFyIiwieG9mZnNldCIsInlvZmZzZXQiLCJidWZmZXJzIiwibnVtTGluZXMiLCJrZXJuaW5ncyIsImZpcnN0Iiwic2Vjb25kIiwiYW1vdW50IiwiY2hhcnMiLCJUcmFuc2Zvcm0iLCJWZWMzIiwiQXBwIl0sInNvdXJjZVJvb3QiOiIifQ==