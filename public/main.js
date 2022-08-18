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
    this.imgSize = {
      width: 1920,
      height: 1080
    };
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
    ['resize', 'updateMouse', 'update'].forEach(fn => this[fn] = this[fn].bind(this));
  } //replace all window.innerWidth and height by using them in store object


  resize() {
    let a1, a2;
    var imageAspect = this.imgSize.height / this.imgSize.width;

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
    var imageAspect = this.imgSize.height / this.imgSize.width;

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
          value: new _ogl__WEBPACK_IMPORTED_MODULE_0__.ogl.Vec2(this.imgSize.width, this.imgSize.height)
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
/******/ 		__webpack_require__.h = () => ("d11656d731a3f25ab1f0")
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QXlCLDJCQUEyQiw2QkFBNkIsNkJBQTZCLDZCQUE2Qiw2QkFBNkIsNkJBQTZCLDZCQUE2QiwyQkFBMkIsNkJBQTZCLHlCQUF5QiwyQkFBMkIsMkJBQTJCLDZCQUE2Qiw2QkFBNkIsNkJBQTZCLDJCQUEyQix5QkFBeUIsNkJBQTZCLDZCQUE2QiwyQkFBMkIseUJBQXlCLHVCQUF1Qiw2QkFBNkIsNkJBQTZCLDZCQUE2QiwyQkFBMkIsNkJBQTZCLHlCQUF5QiwyQkFBMkIsNkJBQTZCLDZCQUE2Qiw2QkFBNkIsMkJBQTJCLHlCQUF5Qiw2QkFBNkIsMkJBQTJCLDJCQUEyQiw2QkFBNkIsNkJBQTZCLDJCQUEyQiw2QkFBNkIseUJBQXlCLDJCQUEyQiwyQkFBMkIsNkJBQTZCLDZCQUE2Qiw2QkFBNkIsMkJBQTJCLHlCQUF5Qiw2QkFBNkIsNkJBQTZCLDJCQUEyQix5QkFBeUIsdUJBQXVCLDZCQUE2Qiw2QkFBNkIsNkJBQTZCLDJCQUEyQiw2QkFBNkIseUJBQXlCLDZCQUE2Qiw2QkFBNkIsNkJBQTZCLDZCQUE2QiwyQkFBMkIseUJBQXlCLDZCQUE2QiwyQkFBMkIseUJBQXlCLHlCQUF5Qix1QkFBdUIscUJBQXFCLHFCQUFxQixjQUFjLGNBQWMsZUFBZSxlQUFlLGFBQWEsYUFBYSxjQUFjLGFBQWEsYUFBYSxlQUFlLGFBQWEsWUFBWSxZQUFZLFlBQVksY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxhQUFhLGFBQWEsY0FBYyxhQUFhLGNBQWMsY0FBYyxnQkFBZ0IsYUFBYSxZQUFZLGNBQWMsYUFBYSxjQUFjLGVBQWUsV0FBVyxXQUFXLFdBQVcsZ0JBQWdCLFdBQVcsWUFBWSxjQUFjLFlBQVksZ0JBQWdCLFlBQVksWUFBWSxZQUFZLGNBQWMsY0FBYyxhQUFhLGNBQWMsY0FBYyxnQkFBZ0IsYUFBYSxZQUFZLGNBQWMsYUFBYSxjQUFjLGVBQWUsV0FBVyxXQUFXLFdBQVcsZ0JBQWdCLFdBQVcsWUFBWSxlQUFlLGNBQWMsWUFBWSxnQkFBZ0IsWUFBWSxZQUFZLFlBQVksY0FBYyxpQkFBaUIsY0FBYyxZQUFZLGFBQWEsZUFBZSxjQUFjLGNBQWMsY0FBYyxjQUFjLGVBQWUsY0FBYyxhQUFhLGNBQWMsZ0JBQWdCLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxjQUFjLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxlQUFlLGFBQWEsY0FBYyxjQUFjLGNBQWMsYUFBYSxjQUFjLFdBQVcsYUFBYSxZQUFZLGNBQWMsZUFBZSxjQUFjLGFBQWEsY0FBYyxZQUFZLFlBQVksV0FBVyxZQUFZLFlBQVksWUFBWSxlQUFlLFlBQVksYUFBYSxjQUFjLFdBQVcsY0FBYyxXQUFXLFdBQVcsWUFBWSxZQUFZLGFBQWEsYUFBYSxhQUFhLGNBQWMsZUFBZSxhQUFhLGFBQWEsY0FBYyxjQUFjLGVBQWUsZUFBZSxhQUFhLGFBQWEsWUFBWSxlQUFlLGNBQWMsZUFBZSxjQUFjLE1BQU0sYUFBYSxXQUFXLGFBQWEsY0FBYyxhQUFhLGNBQWMsZUFBZSxZQUFZLGVBQWUsYUFBYSxZQUFZLGFBQWEsYUFBYSxjQUFjLFlBQVksWUFBWSxZQUFZLGFBQWEsWUFBWSxlQUFlLGFBQWEsYUFBYSxjQUFjLGNBQWMsYUFBYSxlQUFlLGNBQWMsYUFBYSxhQUFhLGNBQWMsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsY0FBYyxlQUFlLGFBQWEsY0FBYyxjQUFjLGVBQWUsZUFBZSxlQUFlLGNBQWMsYUFBYSxlQUFlLGVBQWUsY0FBYyxhQUFhLFlBQVksZUFBZSxlQUFlLGVBQWUsY0FBYyxlQUFlLGFBQWEsY0FBYyxlQUFlLGVBQWUsZUFBZSxjQUFjLGFBQWEsZUFBZSxjQUFjLGNBQWMsZUFBZSxlQUFlLGNBQWMsZUFBZSxhQUFhLGNBQWMsY0FBYyxlQUFlLGVBQWUsZUFBZSxjQUFjLGFBQWEsZUFBZSxlQUFlLGNBQWMsYUFBYSxZQUFZLGVBQWUsZUFBZSxlQUFlLGNBQWMsZUFBZSxhQUFhLGVBQWUsZUFBZSxlQUFlLGVBQWUsY0FBYyxhQUFhLGVBQWUsY0FBYyxhQUFhLGFBQWEsWUFBWSxXQUFXLFdBQVcsY0FBYyxjQUFjLGVBQWUsZUFBZSxhQUFhLGFBQWEsY0FBYyxhQUFhLGFBQWEsZUFBZSxhQUFhLFlBQVksWUFBWSxZQUFZLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsYUFBYSxhQUFhLGNBQWMsYUFBYSxjQUFjLGNBQWMsZ0JBQWdCLGFBQWEsWUFBWSxjQUFjLGFBQWEsY0FBYyxlQUFlLFdBQVcsV0FBVyxXQUFXLGdCQUFnQixXQUFXLFlBQVksY0FBYyxZQUFZLGdCQUFnQixZQUFZLFlBQVksWUFBWSxjQUFjLGNBQWMsYUFBYSxjQUFjLGNBQWMsZ0JBQWdCLGFBQWEsWUFBWSxjQUFjLGFBQWEsY0FBYyxlQUFlLFdBQVcsV0FBVyxXQUFXLGdCQUFnQixXQUFXLFlBQVksZUFBZSxjQUFjLFlBQVksZ0JBQWdCLFlBQVksWUFBWSxZQUFZLGNBQWMsaUJBQWlCLGNBQWMsWUFBWSxhQUFhLGVBQWUsY0FBYyxjQUFjLGNBQWMsY0FBYyxlQUFlLGNBQWMsYUFBYSxjQUFjLGdCQUFnQixhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsY0FBYyxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsZUFBZSxhQUFhLGNBQWMsY0FBYyxjQUFjLGFBQWEsY0FBYyxXQUFXLGFBQWEsWUFBWSxjQUFjLGVBQWUsY0FBYyxhQUFhLGNBQWMsWUFBWSxZQUFZLFdBQVcsWUFBWSxZQUFZLFlBQVksZUFBZSxZQUFZLGFBQWEsY0FBYyxXQUFXLGNBQWMsV0FBVyxXQUFXLFlBQVksWUFBWSxhQUFhLGFBQWEsYUFBYSxjQUFjLGVBQWUsYUFBYSxhQUFhLGNBQWMsY0FBYyxlQUFlLGVBQWUsYUFBYSxhQUFhLFlBQVksZUFBZSxjQUFjLGVBQWUsY0FBYyxHQUFHLFFBQVEsVUFBVSxxQkFBcUIsdUJBQXVCLDZCQUE2QixlQUFlLDJCQUEyQixZQUFZLFlBQVksOEJBQThCLGNBQWMsY0FBYyxZQUFZLGNBQWMsYUFBYSx1QkFBdUIsMkJBQTJCLGFBQWEsZ0JBQWdCLDZCQUE2Qix5QkFBeUIsa0JBQWtCLGFBQWEsZUFBZSxZQUFZLGdCQUFnQixtQkFBbUIsYUFBYSxZQUFZLGNBQWMsZUFBZSxhQUFhLGVBQWUsYUFBYSx5QkFBeUIsZUFBZSxZQUFZLDZCQUE2QixnQkFBZ0IsZUFBZSw2QkFBNkIsY0FBYyxnQkFBZ0IsYUFBYSxnQkFBZ0Isa0JBQWtCLFlBQVksWUFBWSxrQkFBa0Isb0JBQW9CLG1CQUFtQixvQkFBb0IsaUNBQWlDLDhCQUE4Qix3QkFBd0IsY0FBYyxlQUFlLGtCQUFrQixlQUFlLHdCQUF3QixhQUFhLGtCQUFrQix3Q0FBd0MsY0FBYyxhQUFhLGFBQWEsZUFBZSxXQUFXLGlCQUFpQixhQUFhLGFBQWEsYUFBYSxlQUFlLGFBQWEsY0FBYyxlQUFlLFlBQVksWUFBWSxjQUFjLFlBQVksMEJBQTBCLHVCQUF1QiwrQkFBK0IseUJBQXlCLHlCQUF5QixnQkFBZ0Isc0JBQXNCLGFBQWEsYUFBYSxlQUFlLGlCQUFpQiw4QkFBOEIsa0JBQWtCLHdCQUF3Qix3QkFBd0IsNkJBQTZCLHNCQUFzQiw0QkFBNEIsaUNBQWlDLDZCQUE2Qix5QkFBeUIsdUJBQXVCLHNCQUFzQiwwQkFBMEIsMEJBQTBCLGtCQUFrQixxQkFBcUIseUJBQXlCLGtCQUFrQiw0QkFBNEIsMEJBQTBCLHVCQUF1QiwwQkFBMEIsMkJBQTJCLHdCQUF3QiwyQkFBMkIsZ0JBQWdCLHFCQUFxQixrQkFBa0IsYUFBYSxnQkFBZ0IsWUFBWSx1QkFBdUIsNkJBQTZCLGVBQWUsMkJBQTJCLFlBQVksYUFBYSxZQUFZLDhCQUE4QixnQkFBZ0IsY0FBYyx5QkFBeUIsNkJBQTZCLGNBQWMsYUFBYSxpQkFBaUIsY0FBYyxtQkFBbUIsb0JBQW9CLGFBQWEsYUFBYSxZQUFZLHlCQUF5QixlQUFlLHFCQUFxQixZQUFZLFlBQVksMkJBQTJCLDhCQUE4QixhQUFhLGdCQUFnQixtQkFBbUIsYUFBYSxhQUFhLHFCQUFxQixjQUFjLGVBQWUsZUFBZSxlQUFlLGNBQWMsWUFBWSxhQUFhLFlBQVksWUFBWSxhQUFhLHNCQUFzQix5QkFBeUIseUJBQXlCLHVCQUF1QixvQkFBb0IsMEJBQTBCLHFCQUFxQixhQUFhLFlBQVksZUFBZSxjQUFjLFlBQVksY0FBYyxZQUFZLHFCQUFxQixhQUFhLHVCQUF1QixhQUFhLGVBQWUscUJBQXFCLGtCQUFrQixhQUFhLGNBQWMsYUFBYSw2QkFBNkIsMkJBQTJCLFlBQVksYUFBYSxZQUFZLDZCQUE2QixXQUFXLGNBQWMsbUJBQW1CLGdCQUFnQixZQUFZLGlCQUFpQixxQkFBcUIsdUJBQXVCLHVCQUF1QixjQUFjLGFBQWEsY0FBYyxhQUFhLGVBQWUsY0FBYyx5QkFBeUIsY0FBYyxZQUFZLFlBQVksY0FBYyxjQUFjLGdCQUFnQixjQUFjLGFBQWEsYUFBYSxjQUFjLGVBQWUsWUFBWSxZQUFZLGNBQWMsY0FBYyxjQUFjLHFCQUFxQixlQUFlLGVBQWUsYUFBYSxtQkFBbUIsYUFBYSxlQUFlLGVBQWUsWUFBWSx5QkFBeUIsa0JBQWtCLHFCQUFxQiw0QkFBNEIsb0JBQW9CLDBCQUEwQiwwQkFBMEIsdUJBQXVCLDBCQUEwQixrQkFBa0IsdUJBQXVCLHdCQUF3QixnQkFBZ0IscUJBQXFCLHNCQUFzQixxQkFBcUIsd0JBQXdCLDBCQUEwQix5QkFBeUIsd0JBQXdCLHFCQUFxQix3QkFBd0IsbUJBQW1CLHNCQUFzQixrQkFBa0IsdUJBQXVCLHlCQUF5QixzQkFBc0Isb0JBQW9CLGlCQUFpQix1QkFBdUIsa0JBQWtCLFlBQVksWUFBWSxtQkFBbUIsZUFBZSxzQkFBc0IsMkJBQTJCLHVCQUF1QixzQkFBc0IsMkJBQTJCLHVCQUF1QixhQUFhLHdCQUF3Qix3QkFBd0IsYUFBYSxZQUFZLGVBQWUsV0FBVyxZQUFZLFlBQVksb0JBQW9CLGtCQUFrQixZQUFZLG1CQUFtQixhQUFhLGNBQWMsV0FBVyxhQUFhLGVBQWUsZUFBZSxlQUFlLFlBQVksNEJBQTRCLDJCQUEyQiwwQkFBMEIsOEJBQThCLDZCQUE2Qix1QkFBdUIsZ0JBQWdCLGFBQWEsaUJBQWlCLHlCQUF5QixhQUFhLFlBQVkscUJBQXFCLGtCQUFrQiw2QkFBNkIsbUJBQW1CLGlCQUFpQixzQkFBc0IsbUJBQW1CLG1CQUFtQix3QkFBd0IsNEJBQTRCLDJCQUEyQix3QkFBd0IsNkJBQTZCLHlCQUF5Qix3QkFBd0Isc0JBQXNCLHlCQUF5QiwyQkFBMkIsOEJBQThCLGdCQUFnQixxQkFBcUIsdUJBQXVCLG9CQUFvQiwyQkFBMkIsc0JBQXNCLGdDQUFnQywyQkFBMkIscUJBQXFCLHlCQUF5QiwrQkFBK0IsMEJBQTBCLHlCQUF5Qiw0QkFBNEIsK0JBQStCLHdCQUF3Qiw4QkFBOEIsMEJBQTBCLGdDQUFnQyxrQkFBa0Isd0JBQXdCLG9CQUFvQix5QkFBeUIsK0JBQStCLHlCQUF5QixxQkFBcUIsMEJBQTBCLGlCQUFpQixzQkFBc0IsMEJBQTBCLHNCQUFzQix1QkFBdUIsYUFBYSw4QkFBOEIsV0FBVyxjQUFjLDZCQUE2QiwyQkFBMkIsWUFBWSxlQUFlLFlBQVksOEJBQThCLGNBQWMsY0FBYyxnQkFBZ0IsYUFBYSw4QkFBOEIsdUJBQXVCLFdBQVcsYUFBYSw4QkFBOEIsNkJBQTZCLGVBQWUseUJBQXlCLGdCQUFnQixrQkFBa0Isb0JBQW9CLHdCQUF3QixpQkFBaUIsWUFBWSxZQUFZLGFBQWEsV0FBVyxrQkFBa0Isc0JBQXNCLGFBQWEsV0FBVyxpQkFBaUIsc0JBQXNCLDJCQUEyQixzQkFBc0IsY0FBYyxnQkFBZ0IsbUJBQW1CLHFCQUFxQixhQUFhLGFBQWEseUJBQXlCLFlBQVksY0FBYyxhQUFhLGVBQWUsdUJBQXVCLGVBQWUsYUFBYSxhQUFhLGVBQWUsZUFBZSxlQUFlLFlBQVksV0FBVyx1QkFBdUIsMkJBQTJCLDZCQUE2QixZQUFZLFlBQVksMEJBQTBCLG1CQUFtQixzQkFBc0IsNEJBQTRCLHFCQUFxQiwyQkFBMkIsMkJBQTJCLHdCQUF3QiwyQkFBMkIsbUJBQW1CLGlCQUFpQixzQkFBc0IsdUJBQXVCLHNCQUFzQix5QkFBeUIsMkJBQTJCLDBCQUEwQix5QkFBeUIsc0JBQXNCLHlCQUF5QixvQkFBb0IsdUJBQXVCLG1CQUFtQixhQUFhLHFCQUFxQixvQkFBb0IsYUFBYSxZQUFZLG9CQUFvQixlQUFlLGFBQWEsZUFBZSxlQUFlLFdBQVcsZUFBZSxlQUFlLGNBQWMsWUFBWSxZQUFZLHdCQUF3Qix1QkFBdUIsd0JBQXdCLHFCQUFxQixjQUFjLG9CQUFvQixhQUFhLGNBQWMsZUFBZSwyQkFBMkIscUJBQXFCLDBCQUEwQix1QkFBdUIsNEJBQTRCLG9CQUFvQixhQUFhLGNBQWMsWUFBWSxlQUFlLG9CQUFvQixpQkFBaUIsc0JBQXNCLDJCQUEyQixzQkFBc0IsaUJBQWlCLFlBQVksWUFBWSxpQkFBaUIsc0JBQXNCLGVBQWUsMkJBQTJCLGNBQWMsY0FBYyxhQUFhLFlBQVksYUFBYSxlQUFlLGVBQWUsWUFBWSxZQUFZLG1CQUFtQixjQUFjLG1CQUFtQixtQkFBbUIsY0FBYyxtQkFBbUIsdUJBQXVCLG1CQUFtQixhQUFhLG1CQUFtQixhQUFhLGdCQUFnQiw2QkFBNkIsYUFBYSxpQkFBaUIsY0FBYyxlQUFlLDJCQUEyQixZQUFZLGVBQWUsWUFBWSw4QkFBOEIsY0FBYyxpQkFBaUIsbUJBQW1CLHFCQUFxQix5QkFBeUIsY0FBYyxrQkFBa0IsY0FBYyxhQUFhLGlCQUFpQixtQkFBbUIseUJBQXlCLG9CQUFvQixzQkFBc0IsY0FBYyxtQkFBbUIsZ0JBQWdCLG9CQUFvQix1QkFBdUIsd0JBQXdCLGFBQWEsZ0JBQWdCLGNBQWMsYUFBYSxnQkFBZ0IseUJBQXlCLGNBQWMsYUFBYSxZQUFZLGNBQWMsZUFBZSxZQUFZLGVBQWUsYUFBYSxvQkFBb0IscUJBQXFCLDBCQUEwQixzQkFBc0Isc0JBQXNCLFlBQVksY0FBYyxjQUFjLGdCQUFnQixjQUFjLGNBQWMsWUFBWSxjQUFjLGNBQWMsYUFBYSxZQUFZLGFBQWEsY0FBYyxjQUFjLGFBQWEsYUFBYSw2QkFBNkIsY0FBYyxZQUFZLFlBQVksY0FBYyxjQUFjLGNBQWMsYUFBYSxlQUFlLGVBQWUsWUFBWSxhQUFhLHVCQUF1QixhQUFhLFlBQVksYUFBYSxhQUFhLDhCQUE4QixlQUFlLFdBQVcsWUFBWSxhQUFhLDJCQUEyQiwyQkFBMkIsWUFBWSwyQkFBMkIsV0FBVyxZQUFZLDhCQUE4QixnQkFBZ0IsY0FBYyxjQUFjLGNBQWMsY0FBYyx1QkFBdUIsWUFBWSxlQUFlLGFBQWEsaUJBQWlCLGFBQWEsWUFBWSxhQUFhLGNBQWMsZUFBZSxpQkFBaUIsaUJBQWlCLGlCQUFpQixpQkFBaUIsaUJBQWlCLGlCQUFpQixpQkFBaUIsaUJBQWlCLGNBQWMsZ0JBQWdCLGlCQUFpQixlQUFlLGNBQWMsZ0JBQWdCLGNBQWMsYUFBYSxZQUFZLFlBQVksZUFBZSxZQUFZLGFBQWEsYUFBYSxlQUFlLGlCQUFpQiwyQkFBMkIsYUFBYSxhQUFhLGNBQWMsZ0JBQWdCLDZCQUE2Qix5QkFBeUIsaUJBQWlCLGNBQWMsYUFBYSxpQkFBaUIsb0JBQW9CLGtCQUFrQixnQkFBZ0Isa0JBQWtCLGVBQWUsZUFBZSxpQkFBaUIsYUFBYSxpQkFBaUIsY0FBYyxZQUFZLGNBQWMsZUFBZSxnQkFBZ0IsZ0JBQWdCLGNBQWMsZUFBZSxhQUFhLGFBQWEsZ0JBQWdCLFlBQVksZ0JBQWdCLGdCQUFnQixlQUFlLGdCQUFnQixpQkFBaUIsa0JBQWtCLGlCQUFpQixnQkFBZ0Isd0JBQXdCLHNCQUFzQixpQkFBaUIsZUFBZSxpQkFBaUIsZUFBZSxxQkFBcUIsb0JBQW9CLHNCQUFzQiwwQkFBMEIsMEJBQTBCLDJCQUEyQixjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsWUFBWSxpQkFBaUIsY0FBYyxhQUFhLGFBQWEsZUFBZSxlQUFlLGNBQWMsY0FBYyxjQUFjLGNBQWMsYUFBYSxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsYUFBYSxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxlQUFlLGNBQWMsY0FBYyxjQUFjLGNBQWMsYUFBYSxjQUFjLGNBQWMsY0FBYyxjQUFjLGlCQUFpQixnQkFBZ0IsaUJBQWlCLGNBQWMsY0FBYyxjQUFjLGNBQWMsYUFBYSxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxlQUFlLGNBQWMsNkJBQTZCLGFBQWEsZUFBZSxhQUFhLGNBQWMsYUFBYSxlQUFlLGlCQUFpQixhQUFhLGVBQWUsYUFBYSxjQUFjLGNBQWMsZUFBZSxlQUFlLFlBQVksZUFBZSxpQkFBaUIsZUFBZSxlQUFlLGVBQWUsYUFBYSxlQUFlLGNBQWMsY0FBYyxlQUFlLDZCQUE2QixjQUFjLGNBQWMsZ0JBQWdCLGFBQWEsMkJBQTJCLGdCQUFnQix5QkFBeUIsa0JBQWtCLFlBQVksY0FBYyxjQUFjLGtCQUFrQixZQUFZLFlBQVksYUFBYSxhQUFhLGVBQWUsd0JBQXdCLHlCQUF5QixpQkFBaUIsaUJBQWlCLG1CQUFtQixvQkFBb0Isb0JBQW9CLGFBQWEsaUJBQWlCLGVBQWUsZ0JBQWdCLGNBQWMsaUJBQWlCLGNBQWMsZUFBZSxnQkFBZ0IsY0FBYyxlQUFlLGFBQWEsZUFBZSxtQkFBbUIsa0JBQWtCLGFBQWEsZ0JBQWdCLGVBQWUsYUFBYSxnQkFBZ0IseUJBQXlCLGVBQWUsY0FBYyxjQUFjLGFBQWEsY0FBYyxjQUFjLGFBQWEsY0FBYyxjQUFjLGdCQUFnQixnQkFBZ0IsY0FBYyxjQUFjLGVBQWUsZ0JBQWdCLFlBQVksaUJBQWlCLGVBQWUsZUFBZSxlQUFlLGNBQWMsYUFBYSxnQkFBZ0IsZ0JBQWdCLG9CQUFvQixvQkFBb0IsaUJBQWlCLG1CQUFtQiw2QkFBNkIsdUJBQXVCLHdCQUF3QixjQUFjLGNBQWMsaUJBQWlCLGNBQWMsZUFBZSxhQUFhLGFBQWEsZUFBZSxlQUFlLGFBQWEsYUFBYSxjQUFjLGdCQUFnQixjQUFjLGVBQWUsWUFBWSxXQUFXLGdCQUFnQixjQUFjLGdCQUFnQix1QkFBdUIsY0FBYyxnQkFBZ0IsZUFBZSxZQUFZLGVBQWUsY0FBYyxhQUFhLGdCQUFnQixvQkFBb0IsY0FBYyxZQUFZLGdCQUFnQixjQUFjLFlBQVksNkJBQTZCLHNCQUFzQixlQUFlLGFBQWEsZUFBZSxlQUFlLGVBQWUsYUFBYSxhQUFhLGNBQWMsaUJBQWlCLGlCQUFpQixnQkFBZ0Isa0JBQWtCLHVCQUF1QixrQkFBa0IsdUJBQXVCLHdCQUF3Qix5QkFBeUIsaUJBQWlCLGVBQWUsZUFBZSxhQUFhLGNBQWMsYUFBYSxlQUFlLGNBQWMsYUFBYSxjQUFjLGNBQWMsY0FBYyxnQkFBZ0IsYUFBYSxpQkFBaUIsY0FBYyxhQUFhLDZCQUE2QixlQUFlLGVBQWUsYUFBYSwyQkFBMkIsZUFBZSxZQUFZLGFBQWEsV0FBVyxjQUFjLFlBQVksWUFBWSw2QkFBNkIsWUFBWSxlQUFlLFdBQVcsaUJBQWlCLFlBQVksWUFBWSxlQUFlLGNBQWMsY0FBYyxpQkFBaUIsZUFBZSxlQUFlLGVBQWUsYUFBYSxZQUFZLGFBQWEsY0FBYyxhQUFhLGNBQWMsZUFBZSxjQUFjLGFBQWEsZ0JBQWdCLGNBQWMsZUFBZSxnQkFBZ0IsY0FBYyxtQkFBbUIsb0JBQW9CLGVBQWUsZUFBZSxjQUFjLGdCQUFnQixpQkFBaUIsY0FBYyxjQUFjLGFBQWEsY0FBYyxhQUFhLFlBQVksdUJBQXVCLHlCQUF5QixhQUFhLGFBQWEsY0FBYyxvQkFBb0IscUJBQXFCLHNCQUFzQixZQUFZLGVBQWUsZUFBZSxjQUFjLGVBQWUsWUFBWSxlQUFlLGNBQWMsY0FBYyxjQUFjLGNBQWMsYUFBYSxhQUFhLGdCQUFnQixhQUFhLGNBQWMsaUJBQWlCLDZCQUE2QixlQUFlLDZCQUE2QixlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsNkJBQTZCLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGNBQWMsY0FBYyxhQUFhLFlBQVksWUFBWSxlQUFlLGNBQWMsZUFBZSxZQUFZLGVBQWUsY0FBYyxZQUFZLGFBQWEsV0FBVyxZQUFZLFlBQVksYUFBYSxpQkFBaUIsWUFBWSxjQUFjLGVBQWUsZ0JBQWdCLGlCQUFpQixhQUFhLGdCQUFnQixZQUFZLFlBQVksWUFBWSxjQUFjLGFBQWEsV0FBVyxZQUFZLFlBQVksWUFBWSxZQUFZLGFBQWEsaUJBQWlCLFlBQVksYUFBYSxjQUFjLGNBQWMsYUFBYSxlQUFlLGFBQWEsYUFBYSxjQUFjLGNBQWMscUJBQXFCLGFBQWEsY0FBYyxjQUFjLGVBQWUsZ0JBQWdCLGtCQUFrQixlQUFlLGVBQWUsa0JBQWtCLG1CQUFtQixnQkFBZ0IsZUFBZSxrQkFBa0IsY0FBYyxjQUFjLGVBQWUsYUFBYSxlQUFlLGVBQWUsYUFBYSxnQkFBZ0IsY0FBYyxhQUFhLGNBQWMsZUFBZSxrQkFBa0IsZUFBZSxlQUFlLFlBQVksa0JBQWtCLGlCQUFpQixjQUFjLGVBQWUsc0JBQXNCLHVCQUF1QixhQUFhLGdCQUFnQixhQUFhLGdCQUFnQixlQUFlLGVBQWUsZUFBZSw2QkFBNkIsV0FBVywyQkFBMkIsWUFBWSxhQUFhLDJCQUEyQixZQUFZLFlBQVksOEJBQThCLFdBQVcsZUFBZSxjQUFjLGVBQWUsY0FBYyxjQUFjLGNBQWMsY0FBYyxpQkFBaUIsaUJBQWlCLGNBQWMsYUFBYSxjQUFjLFdBQVcsZUFBZSxjQUFjLGlCQUFpQixlQUFlLFlBQVksZUFBZSxpQkFBaUIsaUJBQWlCLGlCQUFpQixnQkFBZ0IsYUFBYSxjQUFjLGFBQWEsY0FBYyxjQUFjLDZCQUE2QixhQUFhLGNBQWMsY0FBYyxnQkFBZ0IsY0FBYyxlQUFlLGNBQWMsV0FBVyxlQUFlLGNBQWMseUJBQXlCLGNBQWMsWUFBWSxZQUFZLGVBQWUsYUFBYSxjQUFjLGdCQUFnQixjQUFjLGNBQWMsZUFBZSxlQUFlLFlBQVksWUFBWSxnQkFBZ0IsYUFBYSxhQUFhLGFBQWEsY0FBYyxlQUFlLGFBQWEsZUFBZSxjQUFjLFdBQVcsWUFBWSxhQUFhLGVBQWUsaUJBQWlCLGVBQWUsZUFBZSxhQUFhLGNBQWMsZUFBZSxZQUFZLDJCQUEyQixhQUFhLGNBQWMsZ0JBQWdCLGVBQWUsZUFBZSxlQUFlLGVBQWUsZ0JBQWdCLGVBQWUsWUFBWSxlQUFlLGFBQWEsY0FBYyxlQUFlLGNBQWMsZUFBZSxJQUFJLFdBQVcsY0FBYyxnQkFBZ0IsZ0JBQWdCLGVBQWUsZUFBZSxjQUFjLGFBQWEsSUFBSSxRQUFRLGFBQWEsY0FBYyxlQUFlLGdCQUFnQixpQkFBaUIsYUFBYSxXQUFXLGtCQUFrQixzQkFBc0Isd0JBQXdCLHNCQUFzQix1QkFBdUIsdUJBQXVCLHdCQUF3QiwwQkFBMEIsNEJBQTRCLHVCQUF1QixZQUFZLFlBQVksYUFBYSxpQkFBaUIsWUFBWSxjQUFjLGVBQWUsZ0JBQWdCLGlCQUFpQixhQUFhLGdCQUFnQixtQkFBbUIsZ0JBQWdCLGtCQUFrQixtQkFBbUIsZ0JBQWdCLGdCQUFnQixlQUFlLGVBQWUsWUFBWSxZQUFZLFlBQVksY0FBYyxjQUFjLGVBQWUsY0FBYyxhQUFhLFdBQVcsY0FBYyxpQkFBaUIsZUFBZSxjQUFjLGVBQWUsZUFBZSxtQkFBbUIsWUFBWSxhQUFhLGlCQUFpQixZQUFZLGFBQWEsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLHNCQUFzQiwyQkFBMkIsbUJBQW1CLHVCQUF1QixzQkFBc0IsdUJBQXVCLGNBQWMsYUFBYSxnQkFBZ0IsZ0JBQWdCLGVBQWUsZUFBZSxZQUFZLGdCQUFnQixhQUFhLGFBQWEsZUFBZSxjQUFjLGlCQUFpQixjQUFjLGVBQWUsWUFBWSxjQUFjLGVBQWUsYUFBYSxhQUFhLGFBQWEsY0FBYyxjQUFjLGFBQWEsY0FBYyxlQUFlLGVBQWUscUJBQXFCLGFBQWEsY0FBYyxjQUFjLGVBQWUsZUFBZSxlQUFlLGdCQUFnQixlQUFlLGFBQWEsY0FBYyxjQUFjLGlCQUFpQixnQkFBZ0Isa0JBQWtCLGNBQWMsZUFBZSx5QkFBeUIsYUFBYSxhQUFhLGdCQUFnQixZQUFZLGVBQWUsbUJBQW1CLG1CQUFtQixpQkFBaUIsZUFBZSxlQUFlLFlBQVksY0FBYyxzQkFBc0IsWUFBWSxhQUFhLDJCQUEyQixZQUFZLGVBQWUsZUFBZSw2QkFBNkIsY0FBYyxlQUFlLGVBQWUsZ0JBQWdCLGFBQWEsYUFBYSxlQUFlLGVBQWUsYUFBYSxZQUFZLGFBQWEsZ0JBQWdCLFdBQVcsaUJBQWlCLGNBQWMsWUFBWSxhQUFhLGNBQWMsb0JBQW9CLHdCQUF3QixZQUFZLGFBQWEsY0FBYyxxQkFBcUIsZUFBZSxlQUFlLGNBQWMsZUFBZSxhQUFhLGFBQWEsYUFBYSxlQUFlLGVBQWUsZ0JBQWdCLGNBQWMsZ0JBQWdCLGlCQUFpQix5QkFBeUIsY0FBYyxnQkFBZ0IsY0FBYyxlQUFlLGVBQWUsY0FBYyxpQkFBaUIsY0FBYyxZQUFZLGNBQWMsV0FBVyxjQUFjLGVBQWUsY0FBYyxnQkFBZ0IsY0FBYyxnQkFBZ0IsZUFBZSxjQUFjLGdCQUFnQixnQkFBZ0IsWUFBWSxhQUFhLGFBQWEsYUFBYSxjQUFjLG1CQUFtQixjQUFjLGVBQWUsWUFBWSxhQUFhLGNBQWMsY0FBYyxjQUFjLFdBQVcsWUFBWSxhQUFhLFlBQVksYUFBYSxjQUFjLFlBQVksZUFBZSxhQUFhLFlBQVksbUJBQW1CLHdCQUF3QixhQUFhLGNBQWMsbUJBQW1CLGNBQWMsZUFBZSxjQUFjLFlBQVksY0FBYyxlQUFlLGFBQWEsYUFBYSx3QkFBd0IsY0FBYyxlQUFlLGtCQUFrQixpQkFBaUIsZ0JBQWdCLGdCQUFnQixjQUFjLGdCQUFnQixnQkFBZ0IsZ0JBQWdCLGFBQWEsa0JBQWtCLGVBQWUsZUFBZSxpQkFBaUIsWUFBWSxlQUFlLGFBQWEsZUFBZSxnQkFBZ0IsZUFBZSxjQUFjLGVBQWUsZ0JBQWdCLHFCQUFxQixjQUFjLGVBQWUsWUFBWSxlQUFlLGFBQWEsY0FBYyxtQkFBbUIsdUJBQXVCLGFBQWEsY0FBYyxlQUFlLGNBQWMsY0FBYyxnQkFBZ0IsZ0JBQWdCLGFBQWEsY0FBYyxlQUFlLGdCQUFnQixtQkFBbUIsbUJBQW1CLGVBQWUsZ0JBQWdCLGNBQWMsY0FBYyxlQUFlLGdCQUFnQixtQkFBbUIsbUJBQW1CLGNBQWMsNkJBQTZCLGFBQWEsc0JBQXNCLHdCQUF3Qix1QkFBdUIseUJBQXlCLFdBQVcsWUFBWSxlQUFlLGNBQWMsZUFBZSxlQUFlLGFBQWEsZ0JBQWdCLGFBQWEsY0FBYyxpQkFBaUIsZUFBZSxhQUFhLGNBQWMsaUJBQWlCLGdCQUFnQixnQkFBZ0IsZUFBZSxlQUFlLGVBQWUsY0FBYyxnQkFBZ0IsZUFBZSxXQUFXLDZCQUE2QixhQUFhLGFBQWEsMkJBQTJCLFlBQVksY0FBYyxlQUFlLGFBQWEsYUFBYSxlQUFlLGNBQWMsY0FBYyxZQUFZLGNBQWMsNkJBQTZCLFlBQVksY0FBYyxZQUFZLGFBQWEsY0FBYyxjQUFjLGdCQUFnQixjQUFjLFlBQVksY0FBYyxjQUFjLGdCQUFnQixhQUFhLGVBQWUsYUFBYSxjQUFjLGNBQWMsY0FBYyxXQUFXLGNBQWMsWUFBWSxjQUFjLGdCQUFnQix5QkFBeUIseUJBQXlCLGVBQWUsYUFBYSxnQkFBZ0IsWUFBWSxhQUFhLDZCQUE2QixhQUFhLDZCQUE2QixlQUFlLGlCQUFpQix5QkFBeUIsY0FBYyxZQUFZLHlCQUF5QixpQkFBaUIsZUFBZSxjQUFjLGFBQWEsWUFBWSxlQUFlLGVBQWUsZUFBZSxhQUFhLGdCQUFnQixZQUFZLGFBQWEsYUFBYSxlQUFlLGNBQWMsV0FBVyxrQkFBa0IsWUFBWSxlQUFlLGdCQUFnQixlQUFlLGFBQWEsaUJBQWlCLGNBQWMsZ0JBQWdCLGVBQWUsZUFBZSxjQUFjLDZCQUE2QixnQkFBZ0IsZ0JBQWdCLFdBQVcsaUJBQWlCLGFBQWEsNEJBQTRCLFdBQVcsWUFBWSxhQUFhLGNBQWMsWUFBWSxhQUFhLG1CQUFtQixvQkFBb0IsZUFBZSxvQkFBb0IsaUJBQWlCLGlCQUFpQixnQkFBZ0IsY0FBYyxlQUFlLGFBQWEsY0FBYyxlQUFlLGFBQWEsaUJBQWlCLGlCQUFpQixpQkFBaUIsYUFBYSxlQUFlLGNBQWMsZUFBZSxhQUFhLGFBQWEsZUFBZSxZQUFZLGNBQWMsYUFBYSxnQkFBZ0IsYUFBYSxxQkFBcUIsZ0JBQWdCLGNBQWMsZ0JBQWdCLHlCQUF5QixjQUFjLGFBQWEsZUFBZSxjQUFjLGFBQWEsYUFBYSxnQkFBZ0IsY0FBYyxpQkFBaUIsYUFBYSxjQUFjLGNBQWMsZUFBZSwyQkFBMkIsYUFBYSxlQUFlLGNBQWMsZ0JBQWdCLGNBQWMsZUFBZSxlQUFlLGVBQWUsZUFBZSxnQkFBZ0IsZUFBZSxjQUFjLGVBQWUsY0FBYyxrQkFBa0IsY0FBYyxjQUFjLGVBQWUsSUFBSSxXQUFXLGNBQWMsZ0JBQWdCLGdCQUFnQixlQUFlLGVBQWUsY0FBYyxhQUFhLElBQUksUUFBUSxhQUFhLGdCQUFnQixjQUFjLGVBQWUsYUFBYSxhQUFhLGdCQUFnQixpQkFBaUIsY0FBYyxhQUFhLHVCQUF1QixlQUFlLGVBQWUsWUFBWSxlQUFlLGNBQWMsZUFBZSxZQUFZLGFBQWEsbUJBQW1CLHVCQUF1Qix5QkFBeUIsdUJBQXVCLHdCQUF3QiwwQkFBMEIseUJBQXlCLHdCQUF3Qix3QkFBd0IsYUFBYSxxQkFBcUIsY0FBYyxjQUFjLFlBQVksZUFBZSxtQkFBbUIsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGFBQWEsZ0JBQWdCLGdCQUFnQixhQUFhLGVBQWUsaUJBQWlCLGNBQWMsZUFBZSxhQUFhLGFBQWEsYUFBYSxjQUFjLGVBQWUsZUFBZSxlQUFlLGFBQWEsY0FBYyxjQUFjLGlCQUFpQixnQkFBZ0IsV0FBVyxlQUFlLGNBQWMsV0FBVyxZQUFZLGFBQWEsZUFBZSxjQUFjLFlBQVksZUFBZSxjQUFjLGFBQWEsY0FBYyxlQUFlLGlCQUFpQixjQUFjLFlBQVksYUFBYSxjQUFjLGNBQWMsY0FBYyxlQUFlLGNBQWMsZ0JBQWdCLHlCQUF5QixhQUFhLElBQUksV0FBVyxpQkFBaUIsY0FBYyxhQUFhLFlBQVksZ0JBQWdCLGNBQWMsZUFBZSxhQUFhLGlCQUFpQixzQkFBc0IsdUJBQXVCLGNBQWMsZUFBZSxlQUFlLFlBQVksZUFBZSxhQUFhLGNBQWMsYUFBYSxjQUFjLGFBQWEsY0FBYyxjQUFjLGdCQUFnQixnQkFBZ0IsY0FBYyxzQkFBc0IsZUFBZSxpQkFBaUIsYUFBYSxjQUFjLFlBQVksYUFBYSxjQUFjLGdCQUFnQixZQUFZLGFBQWEsZUFBZSxhQUFhLGdCQUFnQixrQkFBa0IsYUFBYSxjQUFjLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxpQkFBaUIsbUJBQW1CLGNBQWMsZUFBZSxpQkFBaUIsbUJBQW1CLFlBQVksZUFBZSxlQUFlLGFBQWEsY0FBYyxhQUFhLGdCQUFnQixlQUFlLGVBQWUsYUFBYSxjQUFjLHdCQUF3QixvQkFBb0IsY0FBYyxZQUFZLGFBQWEsZUFBZSxhQUFhLGdCQUFnQixnQkFBZ0IsY0FBYyxjQUFjLGdCQUFnQixnQkFBZ0IsZUFBZSxpQkFBaUIsa0JBQWtCLGtCQUFrQixtQkFBbUIsZUFBZSxlQUFlLGVBQWUsYUFBYSxtQkFBbUIsb0JBQW9CLGVBQWUsb0JBQW9CLGlCQUFpQixpQkFBaUIsZ0JBQWdCLFlBQVksYUFBYSx5QkFBeUIseUJBQXlCLHlCQUF5QixZQUFZLGFBQWEsZUFBZSxnQkFBZ0IsYUFBYSxnQkFBZ0IsZ0JBQWdCLGdCQUFnQixnQkFBZ0IsZ0JBQWdCLGNBQWMsY0FBYyxnQkFBZ0IsZUFBZSxpQkFBaUIsa0JBQWtCLGtCQUFrQixtQkFBbUIsZUFBZSxlQUFlLGVBQWUsY0FBYyxlQUFlLGNBQWMsZ0JBQWdCLGVBQWUsMkJBQTJCLGVBQWUsWUFBWSxhQUFhLGVBQWUsZUFBZSxZQUFZLGFBQWEsZUFBZSxZQUFZLGdCQUFnQixrQkFBa0IsY0FBYyxpQkFBaUIsZUFBZSxvQkFBb0IsaUJBQWlCLGVBQWUsY0FBYyxlQUFlLDJCQUEyQixjQUFjLDJCQUEyQixlQUFlLGlCQUFpQixlQUFlLGFBQWEsYUFBYSxZQUFZLGVBQWUsZUFBZSxhQUFhLGlCQUFpQixhQUFhLGVBQWUsY0FBYyxpQkFBaUIscUJBQXFCLHFCQUFxQix1QkFBdUIsa0JBQWtCLHNCQUFzQix3QkFBd0IsZUFBZSxhQUFhLGlCQUFpQixnQkFBZ0IsY0FBYyxnQkFBZ0IsaUJBQWlCLGFBQWEsY0FBYyxjQUFjLGVBQWUsY0FBYyx5QkFBeUIsMEJBQTBCLGFBQWEsYUFBYSw2QkFBNkIsYUFBYSxjQUFjLGVBQWUsMkJBQTJCLFlBQVksY0FBYyxlQUFlLGNBQWMsZUFBZSxZQUFZLDhCQUE4QixjQUFjLGNBQWMsY0FBYyxlQUFlLGlCQUFpQixlQUFlLGNBQWMsY0FBYyx1QkFBdUIsY0FBYyxhQUFhLGlCQUFpQixvQkFBb0Isc0JBQXNCLHVCQUF1QixjQUFjLGFBQWEsY0FBYyxnQkFBZ0IsbUJBQW1CLGVBQWUsaUJBQWlCLGVBQWUsY0FBYyxjQUFjLGFBQWEsZUFBZSxlQUFlLGFBQWEsY0FBYyxjQUFjLHlCQUF5QixnQkFBZ0IsYUFBYSxhQUFhLGNBQWMsY0FBYyxlQUFlLG1CQUFtQixpQkFBaUIsbUJBQW1CLGVBQWUsY0FBYyxrQkFBa0IsYUFBYSxlQUFlLGlCQUFpQixxQkFBcUIsdUJBQXVCLHNCQUFzQix1QkFBdUIsa0JBQWtCLHdCQUF3Qix5QkFBeUIsWUFBWSxjQUFjLFlBQVksZUFBZSxjQUFjLGVBQWUsZUFBZSxhQUFhLFlBQVksZUFBZSxjQUFjLGVBQWUsY0FBYyxlQUFlLGNBQWMsYUFBYSxnQkFBZ0IsZ0JBQWdCLGdCQUFnQixnQkFBZ0IsaUJBQWlCLGNBQWMsZUFBZSxjQUFjLGVBQWUsZUFBZSxZQUFZLGNBQWMsWUFBWSxXQUFXLGVBQWUsYUFBYSxjQUFjLGNBQWMsYUFBYSxjQUFjLFlBQVksZUFBZSxjQUFjLFdBQVcsY0FBYyxjQUFjLGFBQWEsYUFBYSxjQUFjLGFBQWEsZ0JBQWdCLGVBQWUsY0FBYyxjQUFjLGFBQWEsZ0JBQWdCLGVBQWUsY0FBYyxhQUFhLGVBQWUsNkJBQTZCLGFBQWEsY0FBYyxZQUFZLHVCQUF1QixZQUFZLGNBQWMsYUFBYSxjQUFjLGNBQWMseUJBQXlCLGVBQWUsZUFBZSxZQUFZLGFBQWEsZUFBZSxhQUFhLFlBQVksY0FBYyxnQkFBZ0IsYUFBYSxjQUFjLGFBQWEsYUFBYSxNQUFNLGFBQWEsWUFBWSxZQUFZLGVBQWUsZUFBZSxjQUFjLFlBQVksYUFBYSxlQUFlLGNBQWMsY0FBYyxZQUFZLGNBQWMsY0FBYyxXQUFXLGNBQWMsY0FBYyxnQkFBZ0IsZUFBZSxhQUFhLGVBQWUsYUFBYSx1QkFBdUIsWUFBWSxnQkFBZ0IsZUFBZSxhQUFhLGFBQWEsY0FBYyxjQUFjLGFBQWEsYUFBYSxhQUFhLGVBQWUsWUFBWSxXQUFXLFlBQVksZUFBZSxlQUFlLGNBQWMsZ0JBQWdCLGFBQWEsY0FBYyxlQUFlLFlBQVksYUFBYSxlQUFlLGNBQWMsZUFBZSxpQkFBaUIsZUFBZSxlQUFlLG1CQUFtQixlQUFlLGNBQWMsOEJBQThCLGFBQWEsa0JBQWtCLGVBQWUsaUJBQWlCLGNBQWMsY0FBYyxZQUFZLGdCQUFnQixpQkFBaUIsYUFBYSxhQUFhLGFBQWEsZ0JBQWdCLGFBQWEsc0JBQXNCLGVBQWUsWUFBWSxjQUFjLGNBQWMsYUFBYSxjQUFjLFlBQVksY0FBYyxjQUFjLGNBQWMsZ0JBQWdCLFdBQVcsY0FBYyxZQUFZLGVBQWUsY0FBYyxhQUFhLGFB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aUJBQWlCLGlCQUFpQixpQkFBaUIsaUJBQWlCLGlCQUFpQixpQkFBaUIsaUJBQWlCLGlCQUFpQixjQUFjLGdCQUFnQixpQkFBaUIsZUFBZSxnQkFBZ0IsY0FBYyxjQUFjLFlBQVksZUFBZSxpQkFBaUIsYUFBYSxhQUFhLGNBQWMsY0FBYyxlQUFlLGVBQWUsYUFBYSxjQUFjLGFBQWEsY0FBYyxjQUFjLGVBQWUsYUFBYSxjQUFjLGVBQWUsaUJBQWlCLGlCQUFpQixZQUFZLGVBQWUsZ0JBQWdCLGFBQWEsYUFBYSxjQUFjLGFBQWEsY0FBYyxjQUFjLGVBQWUsZUFBZSxlQUFlLGNBQWMsY0FBYyxjQUFjLGVBQWUsY0FBYyxhQUFhLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGFBQWEsaUJBQWlCLGFBQWEsY0FBYyxlQUFlLGNBQWMsY0FBYyxjQUFjLGNBQWMsYUFBYSxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsYUFBYSxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxlQUFlLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxlQUFlLGNBQWMsZUFBZSxjQUFjLGNBQWMsY0FBYyxjQUFjLGFBQWEsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsZUFBZSxjQUFjLGNBQWMsY0FBYyxjQUFjLGlCQUFpQixlQUFlLGNBQWMsZUFBZSxZQUFZLGVBQWUsaUJBQWlCLGVBQWUsZUFBZSxlQUFlLGNBQWMsY0FBYyxjQUFjLGVBQWUsZUFBZSxjQUFjLGNBQWMsZ0JBQWdCLGFBQWEsZ0JBQWdCLGFBQWEsYUFBYSxhQUFhLGtCQUFrQixZQUFZLFlBQVksYUFBYSxhQUFhLGFBQWEsY0FBYyxjQUFjLFdBQVcsYUFBYSxhQUFhLGNBQWMsaUJBQWlCLGVBQWUsZ0JBQWdCLGlCQUFpQixjQUFjLGNBQWMsZUFBZSxtQkFBbUIsZ0JBQWdCLGNBQWMsZUFBZSxjQUFjLGNBQWMsY0FBYyxhQUFhLGNBQWMsYUFBYSxjQUFjLGNBQWMsZ0JBQWdCLGdCQUFnQixvQkFBb0Isb0JBQW9CLHVCQUF1QixnQkFBZ0IsWUFBWSxpQkFBaUIsZUFBZSxlQUFlLGVBQWUsY0FBYyxjQUFjLHdCQUF3QixnQkFBZ0IsY0FBYyxjQUFjLGVBQWUsY0FBYyxlQUFlLGFBQWEsZUFBZSxlQUFlLGVBQWUsY0FBYyxlQUFlLFlBQVksdUJBQXVCLGNBQWMsWUFBWSxjQUFjLGdCQUFnQixlQUFlLGFBQWEsY0FBYyxlQUFlLGNBQWMsZUFBZSxlQUFlLGFBQWEsaUJBQWlCLGVBQWUsYUFBYSxjQUFjLGFBQWEsZUFBZSxlQUFlLGNBQWMsaUJBQWlCLGVBQWUsY0FBYyxhQUFhLGFBQWEsZUFBZSxjQUFjLHFCQUFxQixnQkFBZ0IsYUFBYSxpQkFBaUIsZUFBZSxlQUFlLGVBQWUsZUFBZSxjQUFjLGdCQUFnQixZQUFZLGFBQWEsc0JBQXNCLGFBQWEsV0FBVyxlQUFlLG1CQUFtQixlQUFlLFdBQVcsaUJBQWlCLFlBQVksb0JBQW9CLGVBQWUsY0FBYyxtQkFBbUIsZUFBZSxlQUFlLGFBQWEsWUFBWSxhQUFhLGNBQWMsY0FBYyxhQUFhLGVBQWUsY0FBYyxnQkFBZ0IsbUJBQW1CLGVBQWUsZ0JBQWdCLGdCQUFnQixpQkFBaUIscUJBQXFCLGNBQWMsYUFBYSxZQUFZLFlBQVksYUFBYSxhQUFhLGFBQWEsWUFBWSxlQUFlLGVBQWUsY0FBYyxlQUFlLGFBQWEsY0FBYyxhQUFhLGFBQWEsY0FBYyxjQUFjLGFBQWEsY0FBYyxrQkFBa0IsY0FBYyxpQkFBaUIsYUFBYSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsY0FBYyxlQUFlLGNBQWMsbUJBQW1CLGVBQWUsY0FBYyxrQkFBa0IsZUFBZSxjQUFjLFlBQVksYUFBYSxjQUFjLGVBQWUsZ0JBQWdCLGlCQUFpQixjQUFjLGVBQWUsYUFBYSxjQUFjLGFBQWEsWUFBWSxZQUFZLFlBQVksY0FBYyxpQkFBaUIsYUFBYSxjQUFjLGNBQWMsYUFBYSxjQUFjLGNBQWMsYUFBYSxjQUFjLGVBQWUsZUFBZSxnQkFBZ0IsZUFBZSxjQUFjLGVBQWUsZ0JBQWdCLDRCQUE0QixlQUFlLGNBQWMsa0JBQWtCLGFBQWEsZUFBZSxhQUFhLGVBQWUsZUFBZSxjQUFjLGVBQWUsZUFBZSxlQUFlLGNBQWMsZUFBZSxjQUFjLGVBQWUsZUFBZSxlQUFlLGNBQWMsWUFBWSxhQUFhLGNBQWMsYUFBYSxlQUFlLGFBQWEsYUFBYSxlQUFlLGNBQWMsY0FBYyxjQUFjLGVBQWUsYUFBYSxjQUFjLGVBQWUsY0FBYyxpQkFBaUIsaUJBQWlCLGlCQUFpQixjQUFjLGFBQWEsY0FBYyxjQUFjLGFBQWEsZUFBZSxjQUFjLGNBQWMsZ0JBQWdCLGNBQWMsZUFBZSxlQUFlLGNBQWMsYUFBYSxjQUFjLFlBQVksYUFBYSxjQUFjLGNBQWMsY0FBYyxlQUFlLGNBQWMsY0FBYyxpQkFBaUIsZUFBZSxZQUFZLGFBQWEsZUFBZSxhQUFhLGFBQWEsY0FBYyxjQUFjLGVBQWUsY0FBYyxtQkFBbUIsYUFBYSxlQUFlLGlCQUFpQixlQUFlLGNBQWMsbUJBQW1CLGNBQWMsZ0JBQWdCLGVBQWUsc0JBQXNCLGVBQWUsZ0JBQWdCLHNCQUFzQixZQUFZLGVBQWUsYUFBYSxlQUFlLGNBQWMsY0FBYyxJQUFJLFNBQVMsYUFBYSxjQUFjLGdCQUFnQixnQkFBZ0IsZUFBZSxlQUFlLFlBQVksYUFBYSxnQkFBZ0IsaUJBQWlCLGFBQWEsWUFBWSxjQUFjLGVBQWUsY0FBYyxlQUFlLGdCQUFnQixpQkFBaUIsY0FBYyxlQUFlLGNBQWMsZUFBZSxhQUFhLFlBQVksZUFBZSxjQUFjLGFBQWEsZUFBZSxjQUFjLGVBQWUsbUJBQW1CLGNBQWMsaUJBQWlCLGFBQWEsY0FBYyxjQUFjLGNBQWMsYUFBYSxlQUFlLGNBQWMsY0FBYyxlQUFlLGdCQUFnQixlQUFlLGdCQUFnQixhQUFhLGVBQWUsZUFBZSxZQUFZLGNBQWMsZUFBZSxjQUFjLGNBQWMsY0FBYyxjQUFjLGVBQWUsYUFBYSxjQUFjLGVBQWUsZUFBZSxnQkFBZ0IsZUFBZSxxQkFBcUIsaUJBQWlCLGdCQUFnQixjQUFjLGNBQWMsY0FBYyxhQUFhLGdCQUFnQixlQUFlLGVBQWUsWUFBWSxjQUFjLGFBQWEsWUFBWSxjQUFjLGVBQWUsY0FBYyxnQkFBZ0IsYUFBYSxlQUFlLGNBQWMsY0FBYyxXQUFXLGNBQWMsYUFBYSxhQUFhLGNBQWMsY0FBYyxhQUFhLGFBQWEsY0FBYyxlQUFlLGVBQWUsZUFBZSxjQUFjLGNBQWMsZUFBZSxjQUFjLGdCQUFnQixhQUFhLGVBQWUsZUFBZSxrQkFBa0IsYUFBYSxZQUFZLGNBQWMsY0FBYyxlQUFlLGVBQWUsYUFBYSxhQUFhLHdCQUF3QixjQUFjLFlBQVksYUFBYSxhQUFhLGVBQWUsbUJBQW1CLGFBQWEsY0FBYyxZQUFZLGdCQUFnQixrQkFBa0IsZ0JBQWdCLGdCQUFnQixnQkFBZ0IsZ0JBQWdCLGdCQUFnQixlQUFlLGdCQUFnQixvQkFBb0IsZ0JBQWdCLGdCQUFnQixjQUFjLGFBQWEsb0JBQW9CLGFBQWEsb0JBQW9CLGVBQWUsV0FBVyxZQUFZLGVBQWUsY0FBYyxlQUFlLGVBQWUsY0FBYyxlQUFlLGNBQWMsY0FBYyxnQkFBZ0IsZUFBZSxjQUFjLGNBQWMsaUJBQWlCLGVBQWUsaUJBQWlCLGVBQWUsY0FBYyxlQUFlLGVBQWUsZUFBZSxjQUFjLFlBQVksZUFBZSxhQUFhLGVBQWUsY0FBYyxjQUFjLGFBQWEsYUFBYSxlQUFlLFlBQVksY0FBYyxjQUFjLGdCQUFnQixZQUFZLGNBQWMsY0FBYyxnQkFBZ0IsYUFBYSxjQUFjLGFBQWEsY0FBYyxZQUFZLFlBQVksYUFBYSxhQUFhLGFBQWEsZUFBZSxhQUFhLGdCQUFnQixZQUFZLGVBQWUsYUFBYSxlQUFlLGlCQUFpQixhQUFhLGNBQWMsYUFBYSxlQUFlLGNBQWMsWUFBWSxlQUFlLGVBQWUsZUFBZSxnQkFBZ0IsYUFBYSxZQUFZLGVBQWUsY0FBYyxXQUFXLGNBQWMsZ0JBQWdCLGFBQWEsaUJBQWlCLGdCQUFnQixlQUFlLGNBQWMsZ0JBQWdCLGdCQUFnQixpQkFBaUIsY0FBYyxjQUFjLFlBQVksbUJBQW1CLGNBQWMsYUFBYSxlQUFlLGNBQWMsaUJBQWlCLGlCQUFpQixpQkFBaUIsZUFBZSxjQUFjLFlBQVksZUFBZSxhQUFhLGNBQWMsZUFBZSxjQUFjLGdCQUFnQixjQUFjLGVBQWUsYUFBYSxjQUFjLGVBQWUsaUJBQWlCLGNBQWMsY0FBYyxjQUFjLGVBQWUsZ0JBQWdCLGNBQWMsZUFBZSxlQUFlLGdCQUFnQix1QkFBdUIsd0JBQXdCLGVBQWUsY0FBYyxjQUFjLElBQUksU0FBUyxhQUFhLGNBQWMsZ0JBQWdCLGdCQUFnQixlQUFlLGVBQWUsWUFBWSxhQUFhLGdCQUFnQixhQUFhLGFBQWEsZUFBZSxhQUFhLGVBQWUsWUFBWSxlQUFlLGNBQWMsZUFBZSxhQUFhLFlBQVksbUJBQW1CLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxlQUFlLGdCQUFnQixhQUFhLGVBQWUsaUJBQWlCLGVBQWUsY0FBYyxlQUFlLHNCQUFzQixpQkFBaUIsZ0JBQWdCLFdBQVcsZUFBZSxZQUFZLG1CQUFtQixlQUFlLGVBQWUsY0FBYyxpQkFBaUIsb0JBQW9CLGlCQUFpQixpQkFBaUIsWUFBWSxhQUFhLGNBQWMsY0FBYyxhQUFhLElBQUksU0FBUyxhQUFhLGFBQWEsYUFBYSxjQUFjLGVBQWUsYUFBYSxZQUFZLGNBQWMsaUJBQWlCLGVBQWUsYUFBYSxjQUFjLGFBQWEsY0FBYyxjQUFjLGdCQUFnQixnQkFBZ0IsZUFBZSxpQkFBaUIsZUFBZSxZQUFZLGFBQWEsZUFBZSxlQUFlLFlBQVksYUFBYSxlQUFlLGNBQWMsa0JBQWtCLGdCQUFnQixnQkFBZ0IsY0FBYyxhQUFhLGVBQWUsa0JBQWtCLGVBQWUsZ0JBQWdCLGdCQUFnQixtQkFBbUIsa0JBQWtCLGdCQUFnQixnQkFBZ0IsZUFBZSxlQUFlLGVBQWUsYUFBYSxhQUFhLGFBQWEsYUFBYSxrQkFBa0IsZUFBZSxnQkFBZ0IsZ0JBQWdCLGdCQUFnQixnQkFBZ0IsZ0JBQWdCLGdCQUFnQixtQkFBbUIsa0JBQWtCLGdCQUFnQixlQUFlLGVBQWUsZUFBZSxjQUFjLGVBQWUsY0FBYyxlQUFlLFlBQVksZUFBZSxlQUFlLFlBQVksZUFBZSxhQUFhLGNBQWMsaUJBQWlCLGNBQWMsY0FBYyxpQkFBaUIsZUFBZSxlQUFlLGVBQWUsY0FBYyxnQkFBZ0IsZUFBZSxhQUFhLGFBQWEsZUFBZSxpQkFBaUIsZ0JBQWdCLGNBQWMsZ0JBQWdCLGlCQUFpQixjQUFjLGFBQWEsY0FBYyxlQUFlLGFBQWEsZUFBZSxjQUFjLGVBQWUsY0FBYyxZQUFZLGVBQWUsZUFBZSxhQUFhLGVBQWUsY0FBYyxpQkFBaUIsZUFBZSxjQUFjLGNBQWMsY0FBYyxjQUFjLGdCQUFnQixjQUFjLGlCQUFpQixlQUFlLGNBQWMsY0FBYyxjQUFjLGNBQWMsZUFBZSxhQUFhLGdCQUFnQixhQUFhLGNBQWMsZUFBZSxnQkFBZ0IsZ0JBQWdCLGdCQUFnQixnQkFBZ0IsWUFBWSxlQUFlLGNBQWMsZUFBZSxhQUFhLGNBQWMsY0FBYyxnQkFBZ0IsY0FBYyxlQUFlLGVBQWUsV0FBVyxhQUFhLGNBQWMsY0FBYyxhQUFhLFdBQVcsYUFBYSxjQUFjLGNBQWMsZUFBZSxhQUFhLGNBQWMsWUFBWSxZQUFZLGFBQWEsYUFBYSxjQUFjLGNBQWMsYUFBYSxhQUFhLGVBQWUsZUFBZSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsZ0JBQWdCLGNBQWMsY0FBYyxZQUFZLGFBQWE7Ozs7Ozs7Ozs7O0FDQTk2aUUsOENBQTJDLENBQUMsV0FBVyxFQUFDLENBQUMseUJBQXlCLEVBQUU7Ozs7Ozs7Ozs7O0FDQXBGLDhDQUEyQyxDQUFDLFdBQVcsRUFBQyxDQUFDLHFCQUFxQixpREFBaUQsK0dBQStHLG9CQUFvQix1REFBdUQsbUNBQW1DLDBCQUEwQix3RkFBd0YseUJBQXlCLE9BQU8sdUJBQXVCOzs7Ozs7Ozs7Ozs7Ozs7QUNBbGhCLGlFQUFlLHVCQUF1QixzQkFBc0IsZ0RBQWdELDBCQUEwQixzQkFBc0IscUJBQXFCLHFCQUFxQixpQkFBaUIsNEpBQTRKLG1EQUFtRCwwREFBMEQsMkNBQTJDLDJEQUEyRCxnRUFBZ0Usd0RBQXdELEdBQUcsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDQWxzQixpRUFBZSxzQ0FBc0MsMEJBQTBCLHFCQUFxQixpQkFBaUIsbUJBQW1CLHVEQUF1RCxHQUFHLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBbk0sa0RBQWtELDBDQUEwQzs7QUFFNUYsNENBQTRDLGdCQUFnQixrQkFBa0IsT0FBTywyQkFBMkIsd0RBQXdELGdDQUFnQyx1REFBdUQ7O0FBRS9QLDhEQUE4RCxzRUFBc0UsOERBQThELGtEQUFrRCxpQkFBaUIsR0FBRzs7QUFFbE87O0FBRXRDO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsTUFBTSxvREFBUztBQUNmO0FBQ0E7QUFDQTtBQUNBLGFBQWEsMEJBQTBCO0FBQ3ZDOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLDBCQUEwQjtBQUN6Qzs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBLGVBQWUsMEJBQTBCO0FBQ3pDOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDdkRELHVCQUF1QjtBQUN2QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0VBQXNFLFdBQVcsbUZBQW1GLFdBQVc7QUFDL0s7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEseUNBQXlDLFNBQVM7QUFDbEQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0Isa0JBQWtCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLGFBQWEsa0JBQWtCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLGFBQWEsWUFBWTtBQUN6QjtBQUNBO0FBQ0E7QUFDQSxhQUFhLFdBQVc7QUFDeEI7QUFDQTtBQUNBO0FBQ0EsYUFBYSxjQUFjO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0EsYUFBYSxVQUFVO0FBQ3ZCOztBQUVBLENBQUM7QUFDRDtBQUNBLGNBQWMsc0NBQXNDOztBQUVwRCwwRUFBMEUsV0FBVztBQUNyRiw2RUFBNkUsV0FBVztBQUN4Rix3RkFBd0YsV0FBVzs7QUFFbkc7QUFDQTtBQUNBLGFBQWEscUNBQXFDO0FBQ2xELGFBQWEsc0RBQXNEO0FBQ25FO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMEVBQTBFLGFBQWE7QUFDdkY7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSw2RUFBNkUsZUFBZTtBQUM1RjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLDZFQUE2RSxlQUFlO0FBQzVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsNkVBQTZFLGVBQWU7QUFDNUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSw2RUFBNkUsZUFBZTtBQUM1RjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsbUdBQW1HLGVBQWU7QUFDbEg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLDZFQUE2RSxlQUFlO0FBQzVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsNkVBQTZFLGVBQWU7QUFDNUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSw2RUFBNkUsZUFBZTtBQUM1RjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLGdGQUFnRixpQkFBaUI7QUFDakc7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxDQUFDOztBQUVEOztBQUVBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsZ0NBQW1COztBQUVyRTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0VBQXNFLFdBQVcsbUZBQW1GLFdBQVc7QUFDL0s7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEseUNBQXlDLFNBQVM7QUFDbEQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGVBQWUsZ0NBQW1CO0FBQ2xDO0FBQ0EsY0FBYyw2REFBNkQ7O0FBRTNFLGNBQWMseURBQXlEOztBQUV2RSxjQUFjLGdDQUFnQzs7QUFFOUMsY0FBYywyQkFBMkI7O0FBRXpDO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGNBQWMsa0JBQWtCO0FBQ2hDLGNBQWMsa0JBQWtCO0FBQ2hDLGNBQWMsMEJBQTBCO0FBQ3hDLGNBQWMsMEJBQTBCO0FBQ3hDLGNBQWMsMEJBQTBCO0FBQ3hDLGNBQWMsMEJBQTBCO0FBQ3hDLGNBQWMsMkJBQTJCO0FBQ3pDLGNBQWMsMkJBQTJCO0FBQ3pDLGNBQWMsMkJBQTJCO0FBQ3pDLGNBQWMsMkJBQTJCO0FBQ3pDLGNBQWMsMkJBQTJCO0FBQ3pDLGNBQWMsMkJBQTJCO0FBQ3pDLGNBQWMsMkJBQTJCO0FBQ3pDLGNBQWMsMkJBQTJCO0FBQ3pDOztBQUVBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGNBQWMseURBQXlEO0FBQ3ZFLGNBQWMscUJBQXFCO0FBQ25DLGNBQWMsZUFBZTtBQUM3Qjs7QUFFQTtBQUNBLFdBQVcsaUJBQWlCO0FBQzVCLGFBQWEsZ0JBQWdCO0FBQzdCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGVBQWU7QUFDMUIsYUFBYSw0Q0FBNEM7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxhQUFhLG1CQUFtQjtBQUNoQztBQUNBLGFBQWEsUUFBUTs7QUFFckI7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixhQUFhLGFBQWE7QUFDMUIsYUFBYSxPQUFPO0FBQ3BCLGVBQWU7QUFDZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSw0QkFBNEI7O0FBRTVCO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx1REFBdUQ7O0FBRXZEO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBOztBQUVBO0FBQ0EsdURBQXVEOztBQUV2RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx1REFBdUQ7O0FBRXZEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELGdDQUFtQjs7QUFFckU7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxvQkFBb0Isc0JBQXNCO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsbUJBQW1CLGdDQUFtQjs7QUFFdEMsZUFBZSxnQ0FBbUI7QUFDbEM7O0FBRUEsMEJBQTBCLGdDQUFtQjtBQUM3QyxXQUFXLG1DQUFtQzs7O0FBRzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsUUFBUTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxXQUFXLG1DQUFtQztBQUM5QyxhQUFhO0FBQ2I7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTzs7QUFFUCxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixnQ0FBbUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUUsZ0NBQW1CO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZ0NBQW1CO0FBQzlCO0FBQ0EsZ0JBQWdCLGdDQUFtQix3QkFBd0IsZ0NBQW1CO0FBQzlFLG9EQUFvRCx3Q0FBd0M7QUFDNUY7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZ0NBQW1CLDJCQUEyQjtBQUN6RCxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGdDQUFtQjtBQUM5QjtBQUNBLGtFQUFrRSxpQkFBaUI7QUFDbkY7QUFDQSwyREFBMkQsYUFBYTtBQUN4RTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQW1CO0FBQ25CLHFCQUFxQixnQ0FBbUI7QUFDeEMsK0NBQStDO0FBQy9DLHNCQUFzQjtBQUN0Qix1RkFBdUYsZ0NBQW1COztBQUUxRyxDQUFDO0FBQ0Q7QUFDQTtBQUNBLG9HQUFvRyxhQUFhO0FBQ2pILFVBQVU7QUFDVjs7Ozs7Ozs7OztBQzN6QkEsdUJBQXVCO0FBQ3ZCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwRUFBMEUsOEJBQW1COztBQUU3Riw4QkFBbUI7QUFDbkIscUJBQXFCLDhCQUFtQjtBQUN4QywrQ0FBK0M7QUFDL0Msc0JBQXNCO0FBQ3RCLG1FQUFtRSw4QkFBbUI7O0FBRXRGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBFQUEwRSwrQkFBbUI7O0FBRTdGLCtCQUFtQjtBQUNuQixxQkFBcUIsK0JBQW1CO0FBQ3hDLCtDQUErQztBQUMvQyxzQkFBc0I7QUFDdEI7QUFDQSxtRkFBbUY7QUFDbkY7QUFDQTs7QUFFQSwyQ0FBMkMsZ0JBQWdCLDZDQUE2QyxvREFBb0QsSUFBSSxJQUFJLElBQUksSUFBSTtBQUM1SztBQUNBOztBQUVBLE9BQU87O0FBRVAsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsK0JBQW1CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFLCtCQUFtQjtBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLCtCQUFtQjtBQUM5QjtBQUNBLGdCQUFnQiwrQkFBbUIsd0JBQXdCLCtCQUFtQjtBQUM5RSxvREFBb0Qsd0NBQXdDO0FBQzVGO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXLCtCQUFtQiwyQkFBMkI7QUFDekQsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVywrQkFBbUI7QUFDOUI7QUFDQSxrRUFBa0UsaUJBQWlCO0FBQ25GO0FBQ0EsMkRBQTJELGFBQWE7QUFDeEU7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUFtQjtBQUNuQixtRUFBbUUsK0JBQW1COztBQUV0RjtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0Esb0dBQW9HLGFBQWE7QUFDakgsVUFBVTtBQUNWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0SEE7QUFDQTtBQUMyQztBQUNKO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsc0NBQXNDOztBQUVqRDtBQUNBLFdBQVcsbUNBQW1DOztBQUU5QztBQUNBLFdBQVcsMENBQTBDOztBQUVyRDtBQUNBLG9FQUFrQjs7QUFFbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsVUFBVTs7QUFFekIsZUFBZSxtQkFBbUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7O0FBRWpEO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsVUFBVTs7QUFFekIsZUFBZSxtQkFBbUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGdCQUFnQjtBQUNqQztBQUNBLEtBQUs7QUFDTDtBQUNBLGVBQWUsbUJBQW1COztBQUVsQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUNBQW1DO0FBQzlDOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRTs7O0FBR0Y7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7O0FBR0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFlBQVksc0VBQXNFO0FBQzdGLGVBQWU7QUFDZjs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osZ0NBQWdDOztBQUVoQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLGtCQUFrQixvRUFBb0UsR0FBRztBQUNwRzs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3REFBd0Q7O0FBRXhELGlCQUFpQiwwREFBUSxDQUFDLHFEQUFNO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsZ0JBQWdCOztBQUVqQztBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbE1BO0FBQzJEO0FBQ3RCLENBQUM7O0FBRXRDOztBQUVBO0FBQ0EsT0FBTyw2QkFBNkIsMEJBQTBCLDZCQUE2QiwyQkFBMkIsNkJBQTZCLFdBQVcsNkJBQTZCLEdBQUcsbUVBQWU7QUFDN007O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSx3REFBd0Q7QUFDckUsV0FBVyxRQUFRO0FBQ25COztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxNQUFNOzs7QUFHTixtQkFBbUI7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sbURBQVE7QUFDZDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxhQUFhLEtBQUs7QUFDbEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSxpRUFBZSxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7QUM3RHJCO0FBQ0EsYUFBYSw0SUFBNEk7QUFDekosYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVEsK0JBQStCO0FBQ2xELGFBQWE7QUFDYjs7O0FBR0E7QUFDQSxxQ0FBcUM7QUFDckM7O0FBRUEsd0ZBQXdGO0FBQ3hGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdFQUF3RTs7QUFFeEU7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCOztBQUVBO0FBQ0Esd0NBQXdDO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLGlFQUFlLGVBQWU7Ozs7Ozs7Ozs7Ozs7OztBQ3hJOUI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7O0FBR0o7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFJOzs7QUFHSjtBQUNBOztBQUVBLGlFQUFlLHNCQUFzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekJXO0FBQ2hELGlDQUFpQztBQUNqQzs7QUFFQSwyQkFBMkI7O0FBRTNCO0FBQ0EsV0FBVyx1RUFBdUU7QUFDbEYsYUFBYTtBQUNiOztBQUVBO0FBQ0EsRUFBRSxzRkFBNkI7QUFDL0I7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQSxVQUFVLHlFQUFnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQnVDO0FBQ2pFO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGVBQWU7QUFDZjs7QUFFQTtBQUNBLGVBQWUseUJBQXlCO0FBQ3hDOztBQUVBO0FBQ0E7O0FBRUEsb0JBQW9CLHlCQUF5QjtBQUM3QztBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSx1QkFBdUIsc0VBQXNCO0FBQzdDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLGVBQWU7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUVBQWUsUUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEN5QjtBQUNqQjtBQUMvQixjQUFjLDRCQUE0QjtBQUMxQyxjQUFjLDJCQUEyQjs7QUFFekM7QUFDQSxXQUFXLFNBQVM7QUFDcEIsV0FBVyxRQUFRO0FBQ25COztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBLElBQUksNkNBQVE7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUksNkNBQVE7QUFDWixJQUFJLGtFQUFlOztBQUVuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLDJCQUEyQjs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBLGlFQUFlLFNBQVM7Ozs7Ozs7Ozs7Ozs7OztBQ3ZFeEI7QUFDQTs7QUFFQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLEtBQUs7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUEsaUVBQWUsT0FBTzs7Ozs7Ozs7OztBQ2hCdEIsbUJBQW1CLG1CQUFPLENBQUMsK0NBQVE7QUFDbkM7Ozs7Ozs7Ozs7O0FDREE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0I7O0FBRXBCLDZCQUE2Qjs7QUFFN0IsdUJBQXVCOztBQUV2QiwwQkFBMEI7QUFDMUI7QUFDQTs7QUFFQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOzs7Ozs7O1VDMURBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUMrQztBQUNPO0FBQ1g7QUFDVjtBQUN3QjtBQUNQO0FBQ0Q7QUFDSjtBQUNZO0FBQ3pEO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGNBQWMsU0FBUztBQUN2QixjQUFjLFNBQVM7QUFDdkIsY0FBYyxTQUFTO0FBQ3ZCLGNBQWMsWUFBWSx3Q0FBd0M7QUFDbEUsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0Qjs7QUFFQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixjQUFjLFNBQVM7QUFDdkIsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0Qjs7QUFFQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsS0FBdUMsR0FBRyx1QkFBZ0IsR0FBRyxDQUFFO0FBQzlFO0FBQ0EsV0FBVyxTQUFTOztBQUVwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsOERBQVEsQ0FBQyxlQUFlOztBQUVsRDtBQUNBO0FBQ0EsRUFBRSxtREFBUTtBQUNWOztBQUVBO0FBQ0E7QUFDQSxFQUFFLG1EQUFRO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25COzs7QUFHQTtBQUNBO0FBQ0EsRUFBRSxxRUFBeUI7QUFDM0IsRUFBRSwwREFBVztBQUNiOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLG1EQUFRO0FBQ1osR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSSxtREFBUTtBQUNaLEdBQUc7QUFDSDtBQUNBLElBQUksbURBQVEsaUNBQWlDOztBQUU3QztBQUNBLE1BQU0saURBQUk7QUFDVjs7QUFFQSxJQUFJLGlFQUFXO0FBQ2YsR0FBRzs7QUFFSDtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsZUFBZSxxREFBcUQ7QUFDcEU7QUFDQTtBQUNBO0FBQ0EsTUFBTSxtREFBUTtBQUNkOztBQUVBLElBQUksaUVBQVc7QUFDZixHQUFHO0FBQ0g7QUFDQSxJQUFJLG1EQUFROztBQUVaO0FBQ0EsTUFBTSxpREFBSTtBQUNWOztBQUVBLElBQUksaUVBQVc7QUFDZixHQUFHO0FBQ0g7QUFDQSxJQUFJLGlFQUFXOztBQUVmO0FBQ0EsTUFBTSxpREFBSTtBQUNWOztBQUVBLElBQUksK0RBQVM7QUFDYixHQUFHO0FBQ0g7O0FBRUE7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBLElBQUksbURBQVE7QUFDWjtBQUNBLEdBQUc7O0FBRUg7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBLElBQUksbURBQVE7QUFDWjtBQUNBLEdBQUc7O0FBRUg7QUFDQSxhQUFhLFNBQVM7QUFDdEIsYUFBYSxLQUFLO0FBQ2xCO0FBQ0E7QUFDQSxJQUFJLG1EQUFROztBQUVaO0FBQ0EsMkJBQTJCLDBEQUFhO0FBQ3hDO0FBQ0E7O0FBRUEsNENBQTRDLG1FQUFTO0FBQ3JELEtBQUs7O0FBRUwsSUFBSSxpRUFBVzs7QUFFZixvQkFBb0IsOEJBQThCO0FBQ2xELE1BQU0sbURBQVE7QUFDZDs7QUFFQTs7QUFFQTtBQUNBLE1BQU0saURBQUk7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSSwrREFBUztBQUNiLEdBQUc7O0FBRUg7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBLElBQUksb0RBQVM7O0FBRWI7QUFDQSw0QkFBNEIsMERBQWE7QUFDekM7QUFDQTs7QUFFQSw0Q0FBNEMsbUVBQVM7QUFDckQsS0FBSzs7QUFFTCxJQUFJLGlFQUFXOztBQUVmLG9CQUFvQiw0QkFBNEI7QUFDaEQsTUFBTSxvREFBUztBQUNmOztBQUVBOztBQUVBO0FBQ0EsTUFBTSxpREFBSTtBQUNWO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0EsSUFBSSxvREFBUztBQUNiLEdBQUc7QUFDSDtBQUNBLElBQUksbURBQVE7O0FBRVo7QUFDQSxNQUFNLGlEQUFJO0FBQ1Y7O0FBRUEsSUFBSSxpRUFBVztBQUNmO0FBQ0E7QUFDQSxnQkFBZ0IscUVBQWU7QUFDL0Isc0RBQU0sZ0Q7Ozs7Ozs7Ozs7OztBQ2hSTjs7QUFFQSxNQUFNK2pCLEdBQU4sQ0FBVTtBQUNOeHFCLEVBQUFBLFdBQVcsR0FBRztBQUNWLFNBQUtzQixJQUFMO0FBQ0g7O0FBRURBLEVBQUFBLElBQUksR0FBRztBQUNILFFBQUl2QiwwREFBSjtBQUNIOztBQVBLOztBQVNWLElBQUl5cUIsR0FBSixHOzs7Ozs7Ozs7O0FDWEEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYW5zaS1odG1sLWNvbW11bml0eS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9jYW52YXMuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvb2dsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9odG1sLWVudGl0aWVzL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaHRtbC1lbnRpdGllcy9saWIvbmFtZWQtcmVmZXJlbmNlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaHRtbC1lbnRpdGllcy9saWIvbnVtZXJpYy11bmljb2RlLW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaHRtbC1lbnRpdGllcy9saWIvc3Vycm9nYXRlLXBhaXJzLmpzIiwid2VicGFjazovLy8uL2FwcC9zaGFkZXJzL2ZyYWdtZW50Lmdsc2wiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NoYWRlcnMvdmVydGV4Lmdsc2wiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvY2xpZW50cy9XZWJTb2NrZXRDbGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvbW9kdWxlcy9sb2dnZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvbW9kdWxlcy9zdHJpcC1hbnNpL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L292ZXJsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvc29ja2V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL2NyZWF0ZVNvY2tldFVSTC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC91dGlscy9nZXRDdXJyZW50U2NyaXB0U291cmNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL2xvZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC91dGlscy9wYXJzZVVSTC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC91dGlscy9yZWxvYWRBcHAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvdXRpbHMvc2VuZE1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2VtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2xvZy5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3R5bGVzL2luZGV4LnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gYW5zaUhUTUxcblxuLy8gUmVmZXJlbmNlIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvYW5zaS1yZWdleFxudmFyIF9yZWdBTlNJID0gLyg/Oig/OlxcdTAwMWJcXFspfFxcdTAwOWIpKD86KD86WzAtOV17MSwzfSk/KD86KD86O1swLTldezAsM30pKik/W0EtTXxmLW1dKXxcXHUwMDFiW0EtTV0vXG5cbnZhciBfZGVmQ29sb3JzID0ge1xuICByZXNldDogWydmZmYnLCAnMDAwJ10sIC8vIFtGT1JFR1JPVURfQ09MT1IsIEJBQ0tHUk9VTkRfQ09MT1JdXG4gIGJsYWNrOiAnMDAwJyxcbiAgcmVkOiAnZmYwMDAwJyxcbiAgZ3JlZW46ICcyMDk4MDUnLFxuICB5ZWxsb3c6ICdlOGJmMDMnLFxuICBibHVlOiAnMDAwMGZmJyxcbiAgbWFnZW50YTogJ2ZmMDBmZicsXG4gIGN5YW46ICcwMGZmZWUnLFxuICBsaWdodGdyZXk6ICdmMGYwZjAnLFxuICBkYXJrZ3JleTogJzg4OCdcbn1cbnZhciBfc3R5bGVzID0ge1xuICAzMDogJ2JsYWNrJyxcbiAgMzE6ICdyZWQnLFxuICAzMjogJ2dyZWVuJyxcbiAgMzM6ICd5ZWxsb3cnLFxuICAzNDogJ2JsdWUnLFxuICAzNTogJ21hZ2VudGEnLFxuICAzNjogJ2N5YW4nLFxuICAzNzogJ2xpZ2h0Z3JleSdcbn1cbnZhciBfb3BlblRhZ3MgPSB7XG4gICcxJzogJ2ZvbnQtd2VpZ2h0OmJvbGQnLCAvLyBib2xkXG4gICcyJzogJ29wYWNpdHk6MC41JywgLy8gZGltXG4gICczJzogJzxpPicsIC8vIGl0YWxpY1xuICAnNCc6ICc8dT4nLCAvLyB1bmRlcnNjb3JlXG4gICc4JzogJ2Rpc3BsYXk6bm9uZScsIC8vIGhpZGRlblxuICAnOSc6ICc8ZGVsPicgLy8gZGVsZXRlXG59XG52YXIgX2Nsb3NlVGFncyA9IHtcbiAgJzIzJzogJzwvaT4nLCAvLyByZXNldCBpdGFsaWNcbiAgJzI0JzogJzwvdT4nLCAvLyByZXNldCB1bmRlcnNjb3JlXG4gICcyOSc6ICc8L2RlbD4nIC8vIHJlc2V0IGRlbGV0ZVxufVxuXG47WzAsIDIxLCAyMiwgMjcsIDI4LCAzOSwgNDldLmZvckVhY2goZnVuY3Rpb24gKG4pIHtcbiAgX2Nsb3NlVGFnc1tuXSA9ICc8L3NwYW4+J1xufSlcblxuLyoqXG4gKiBDb252ZXJ0cyB0ZXh0IHdpdGggQU5TSSBjb2xvciBjb2RlcyB0byBIVE1MIG1hcmt1cC5cbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0XG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gYW5zaUhUTUwgKHRleHQpIHtcbiAgLy8gUmV0dXJucyB0aGUgdGV4dCBpZiB0aGUgc3RyaW5nIGhhcyBubyBBTlNJIGVzY2FwZSBjb2RlLlxuICBpZiAoIV9yZWdBTlNJLnRlc3QodGV4dCkpIHtcbiAgICByZXR1cm4gdGV4dFxuICB9XG5cbiAgLy8gQ2FjaGUgb3BlbmVkIHNlcXVlbmNlLlxuICB2YXIgYW5zaUNvZGVzID0gW11cbiAgLy8gUmVwbGFjZSB3aXRoIG1hcmt1cC5cbiAgdmFyIHJldCA9IHRleHQucmVwbGFjZSgvXFwwMzNcXFsoXFxkKyltL2csIGZ1bmN0aW9uIChtYXRjaCwgc2VxKSB7XG4gICAgdmFyIG90ID0gX29wZW5UYWdzW3NlcV1cbiAgICBpZiAob3QpIHtcbiAgICAgIC8vIElmIGN1cnJlbnQgc2VxdWVuY2UgaGFzIGJlZW4gb3BlbmVkLCBjbG9zZSBpdC5cbiAgICAgIGlmICghIX5hbnNpQ29kZXMuaW5kZXhPZihzZXEpKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZXh0cmEtYm9vbGVhbi1jYXN0XG4gICAgICAgIGFuc2lDb2Rlcy5wb3AoKVxuICAgICAgICByZXR1cm4gJzwvc3Bhbj4nXG4gICAgICB9XG4gICAgICAvLyBPcGVuIHRhZy5cbiAgICAgIGFuc2lDb2Rlcy5wdXNoKHNlcSlcbiAgICAgIHJldHVybiBvdFswXSA9PT0gJzwnID8gb3QgOiAnPHNwYW4gc3R5bGU9XCInICsgb3QgKyAnO1wiPidcbiAgICB9XG5cbiAgICB2YXIgY3QgPSBfY2xvc2VUYWdzW3NlcV1cbiAgICBpZiAoY3QpIHtcbiAgICAgIC8vIFBvcCBzZXF1ZW5jZVxuICAgICAgYW5zaUNvZGVzLnBvcCgpXG4gICAgICByZXR1cm4gY3RcbiAgICB9XG4gICAgcmV0dXJuICcnXG4gIH0pXG5cbiAgLy8gTWFrZSBzdXJlIHRhZ3MgYXJlIGNsb3NlZC5cbiAgdmFyIGwgPSBhbnNpQ29kZXMubGVuZ3RoXG4gIDsobCA+IDApICYmIChyZXQgKz0gQXJyYXkobCArIDEpLmpvaW4oJzwvc3Bhbj4nKSlcblxuICByZXR1cm4gcmV0XG59XG5cbi8qKlxuICogQ3VzdG9taXplIGNvbG9ycy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb2xvcnMgcmVmZXJlbmNlIHRvIF9kZWZDb2xvcnNcbiAqL1xuYW5zaUhUTUwuc2V0Q29sb3JzID0gZnVuY3Rpb24gKGNvbG9ycykge1xuICBpZiAodHlwZW9mIGNvbG9ycyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2Bjb2xvcnNgIHBhcmFtZXRlciBtdXN0IGJlIGFuIE9iamVjdC4nKVxuICB9XG5cbiAgdmFyIF9maW5hbENvbG9ycyA9IHt9XG4gIGZvciAodmFyIGtleSBpbiBfZGVmQ29sb3JzKSB7XG4gICAgdmFyIGhleCA9IGNvbG9ycy5oYXNPd25Qcm9wZXJ0eShrZXkpID8gY29sb3JzW2tleV0gOiBudWxsXG4gICAgaWYgKCFoZXgpIHtcbiAgICAgIF9maW5hbENvbG9yc1trZXldID0gX2RlZkNvbG9yc1trZXldXG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICBpZiAoJ3Jlc2V0JyA9PT0ga2V5KSB7XG4gICAgICBpZiAodHlwZW9mIGhleCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaGV4ID0gW2hleF1cbiAgICAgIH1cbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShoZXgpIHx8IGhleC5sZW5ndGggPT09IDAgfHwgaGV4LnNvbWUoZnVuY3Rpb24gKGgpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBoICE9PSAnc3RyaW5nJ1xuICAgICAgfSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgdmFsdWUgb2YgYCcgKyBrZXkgKyAnYCBwcm9wZXJ0eSBtdXN0IGJlIGFuIEFycmF5IGFuZCBlYWNoIGl0ZW0gY291bGQgb25seSBiZSBhIGhleCBzdHJpbmcsIGUuZy46IEZGMDAwMCcpXG4gICAgICB9XG4gICAgICB2YXIgZGVmSGV4Q29sb3IgPSBfZGVmQ29sb3JzW2tleV1cbiAgICAgIGlmICghaGV4WzBdKSB7XG4gICAgICAgIGhleFswXSA9IGRlZkhleENvbG9yWzBdXG4gICAgICB9XG4gICAgICBpZiAoaGV4Lmxlbmd0aCA9PT0gMSB8fCAhaGV4WzFdKSB7XG4gICAgICAgIGhleCA9IFtoZXhbMF1dXG4gICAgICAgIGhleC5wdXNoKGRlZkhleENvbG9yWzFdKVxuICAgICAgfVxuXG4gICAgICBoZXggPSBoZXguc2xpY2UoMCwgMilcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBoZXggIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB2YWx1ZSBvZiBgJyArIGtleSArICdgIHByb3BlcnR5IG11c3QgYmUgYSBoZXggc3RyaW5nLCBlLmcuOiBGRjAwMDAnKVxuICAgIH1cbiAgICBfZmluYWxDb2xvcnNba2V5XSA9IGhleFxuICB9XG4gIF9zZXRUYWdzKF9maW5hbENvbG9ycylcbn1cblxuLyoqXG4gKiBSZXNldCBjb2xvcnMuXG4gKi9cbmFuc2lIVE1MLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICBfc2V0VGFncyhfZGVmQ29sb3JzKVxufVxuXG4vKipcbiAqIEV4cG9zZSB0YWdzLCBpbmNsdWRpbmcgb3BlbiBhbmQgY2xvc2UuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5hbnNpSFRNTC50YWdzID0ge31cblxuaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYW5zaUhUTUwudGFncywgJ29wZW4nLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfb3BlblRhZ3MgfVxuICB9KVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYW5zaUhUTUwudGFncywgJ2Nsb3NlJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX2Nsb3NlVGFncyB9XG4gIH0pXG59IGVsc2Uge1xuICBhbnNpSFRNTC50YWdzLm9wZW4gPSBfb3BlblRhZ3NcbiAgYW5zaUhUTUwudGFncy5jbG9zZSA9IF9jbG9zZVRhZ3Ncbn1cblxuZnVuY3Rpb24gX3NldFRhZ3MgKGNvbG9ycykge1xuICAvLyByZXNldCBhbGxcbiAgX29wZW5UYWdzWycwJ10gPSAnZm9udC13ZWlnaHQ6bm9ybWFsO29wYWNpdHk6MTtjb2xvcjojJyArIGNvbG9ycy5yZXNldFswXSArICc7YmFja2dyb3VuZDojJyArIGNvbG9ycy5yZXNldFsxXVxuICAvLyBpbnZlcnNlXG4gIF9vcGVuVGFnc1snNyddID0gJ2NvbG9yOiMnICsgY29sb3JzLnJlc2V0WzFdICsgJztiYWNrZ3JvdW5kOiMnICsgY29sb3JzLnJlc2V0WzBdXG4gIC8vIGRhcmsgZ3JleVxuICBfb3BlblRhZ3NbJzkwJ10gPSAnY29sb3I6IycgKyBjb2xvcnMuZGFya2dyZXlcblxuICBmb3IgKHZhciBjb2RlIGluIF9zdHlsZXMpIHtcbiAgICB2YXIgY29sb3IgPSBfc3R5bGVzW2NvZGVdXG4gICAgdmFyIG9yaUNvbG9yID0gY29sb3JzW2NvbG9yXSB8fCAnMDAwJ1xuICAgIF9vcGVuVGFnc1tjb2RlXSA9ICdjb2xvcjojJyArIG9yaUNvbG9yXG4gICAgY29kZSA9IHBhcnNlSW50KGNvZGUpXG4gICAgX29wZW5UYWdzWyhjb2RlICsgMTApLnRvU3RyaW5nKCldID0gJ2JhY2tncm91bmQ6IycgKyBvcmlDb2xvclxuICB9XG59XG5cbmFuc2lIVE1MLnJlc2V0KClcbiIsImltcG9ydCB7IG9nbCB9IGZyb20gXCIuL29nbFwiO1xyXG5cclxuaW1wb3J0IHZlcnRleFNoYWRlciBmcm9tICcuLi9zaGFkZXJzL3ZlcnRleC5nbHNsJ1xyXG5pbXBvcnQgZnJhZ21lbnRTaGFkZXIgZnJvbSAnLi4vc2hhZGVycy9mcmFnbWVudC5nbHNsJyBcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhcyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmJpbmQoKVxyXG5cclxuICAgICAgICB0aGlzLnZlcnRleFNoYWRlciA9IHZlcnRleFNoYWRlclxyXG4gICAgICAgIHRoaXMuZnJhZ21lbnRTaGFkZXIgPSBmcmFnbWVudFNoYWRlclxyXG5cclxuICAgICAgICB0aGlzLmltZ1NpemUgPSB7XHJcbiAgICAgICAgICAgIHdpZHRoOiAxOTIwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDEwODBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWJnbCcpXHJcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBvZ2wuUmVuZGVyZXIoeyBjYW52YXM6IGNhbnZhcywgZHByOiAyIH0pXHJcbiAgICAgICAgdGhpcy5nbCA9IHRoaXMucmVuZGVyZXIuZ2xcclxuXHJcbiAgICAgICAgLy8gVmFyaWFibGUgaW5wdXRzIHRvIGNvbnRyb2wgZmxvd21hcFxyXG4gICAgICAgIHRoaXMuYXNwZWN0ID0gMVxyXG4gICAgICAgIHRoaXMubW91c2UgPSBuZXcgb2dsLlZlYzIoLTEpXHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IG5ldyBvZ2wuVmVjMigpXHJcblxyXG4gICAgICAgIHRoaXMuZmxvd21hcCA9IG5ldyBvZ2wuRmxvd21hcCh0aGlzLmdsKVxyXG5cclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAgICAgdGhpcy5sYXN0TW91c2UgPSBuZXcgb2dsLlZlYzIoKVxyXG5cclxuICAgICAgICB0aGlzLnJBRiA9IHVuZGVmaW5lZFxyXG5cclxuICAgICAgICB0aGlzLmluaXQoKVxyXG4gICAgfVxyXG5cclxuICAgIGJpbmQoKSB7XHJcbiAgICAgICAgWydyZXNpemUnLCAndXBkYXRlTW91c2UnLCAndXBkYXRlJ11cclxuICAgICAgICAgICAgLmZvckVhY2goZm4gPT4gdGhpc1tmbl0gPSB0aGlzW2ZuXS5iaW5kKHRoaXMpKVxyXG4gICAgfVxyXG5cclxuICAgIC8vcmVwbGFjZSBhbGwgd2luZG93LmlubmVyV2lkdGggYW5kIGhlaWdodCBieSB1c2luZyB0aGVtIGluIHN0b3JlIG9iamVjdFxyXG4gICAgcmVzaXplKCkge1xyXG4gICAgICAgIGxldCBhMSwgYTJcclxuICAgICAgICB2YXIgaW1hZ2VBc3BlY3QgPSB0aGlzLmltZ1NpemUuaGVpZ2h0IC8gdGhpcy5pbWdTaXplLndpZHRoXHJcblxyXG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJIZWlnaHQgLyB3aW5kb3cuaW5uZXJXaWR0aCA8IGltYWdlQXNwZWN0KSB7XHJcbiAgICAgICAgICAgIGExID0gMVxyXG4gICAgICAgICAgICBhMiA9IHdpbmRvdy5pbm5lckhlaWdodCAvIHdpbmRvdy5pbm5lcldpZHRoIC8gaW1hZ2VBc3BlY3RcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhMSA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCkgKiBpbWFnZUFzcGVjdFxyXG4gICAgICAgICAgICBhMiA9IDFcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubWVzaC5wcm9ncmFtLnVuaWZvcm1zLnJlcy52YWx1ZSA9IG5ldyBvZ2wuVmVjNChcclxuICAgICAgICAgICAgd2luZG93LmlubmVyV2lkdGgsXHJcbiAgICAgICAgICAgIHdpbmRvdy5pbm5lckhlaWdodCxcclxuICAgICAgICAgICAgYTEsXHJcbiAgICAgICAgICAgIGEyXHJcbiAgICAgICAgKVxyXG4gICAgXHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXHJcbiAgICAgICAgdGhpcy5hc3BlY3QgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjcmVhdGVHZW9tZXRyeSgpIHtcclxuICAgICAgICAvLyBUcmlhbmdsZSB0aGF0IGluY2x1ZGVzIC0xIHRvIDEgcmFuZ2UgZm9yICdwb3NpdGlvbicsIGFuZCAwIHRvIDEgcmFuZ2UgZm9yICd1dicuXHJcbiAgICAgICAgdGhpcy5nZW9tZXRyeSA9IG5ldyBvZ2wuR2VvbWV0cnkodGhpcy5nbCwge1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHtcclxuICAgICAgICAgICAgICAgIHNpemU6IDIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBuZXcgRmxvYXQzMkFycmF5KFstMSwgLTEsIDMsIC0xLCAtMSwgM10pXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHV2OiB7IHNpemU6IDIsIGRhdGE6IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDIsIDAsIDAsIDJdKSB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVUZXh0dXJlKCkge1xyXG4gICAgICAgIHRoaXMudGV4dHVyZSA9IG5ldyBvZ2wuVGV4dHVyZSh0aGlzLmdsLCB7XHJcbiAgICAgICAgICAgIG1pbkZpbHRlcjogdGhpcy5nbC5MSU5FQVIsXHJcbiAgICAgICAgICAgIG1hZ0ZpbHRlcjogdGhpcy5nbC5MSU5FQVJcclxuICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpXHJcbiAgICAgICAgaW1nLm9ubG9hZCA9ICgpID0+ICh0aGlzLnRleHR1cmUuaW1hZ2UgPSBpbWcpXHJcbiAgICAgICAgaW1nLmNyb3NzT3JpZ2luID0gXCJBbm9ueW1vdXNcIlxyXG4gICAgICAgIGltZy5zcmMgPSBcInRleHQucG5nXCJcclxuICAgICAgICBcclxuICAgICAgICBsZXQgYTEsIGEyXHJcbiAgICAgICAgdmFyIGltYWdlQXNwZWN0ID0gdGhpcy5pbWdTaXplLmhlaWdodCAvIHRoaXMuaW1nU2l6ZS53aWR0aFxyXG5cclxuICAgICAgICBpZiAod2luZG93LmlubmVySGVpZ2h0IC8gd2luZG93LmlubmVyV2lkdGggPCBpbWFnZUFzcGVjdCkge1xyXG4gICAgICAgICAgICBhMSA9IDFcclxuICAgICAgICAgICAgYTIgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyB3aW5kb3cuaW5uZXJXaWR0aCAvIGltYWdlQXNwZWN0XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYTEgPSAod2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQpICogaW1hZ2VBc3BlY3RcclxuICAgICAgICAgICAgYTIgPSAxXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4geyBhMSwgYTIgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjcmVhdGVTaGFkZXJzKCkge1xyXG4gICAgICAgIGNvbnN0IHRleHR1cmVBc3BlY3QgPSB0aGlzLnVwZGF0ZVRleHR1cmUoKVxyXG5cclxuICAgICAgICB0aGlzLnByb2dyYW0gPSBuZXcgb2dsLlByb2dyYW0odGhpcy5nbCwge1xyXG4gICAgICAgICAgICB2ZXJ0ZXg6IHRoaXMudmVydGV4U2hhZGVyLFxyXG4gICAgICAgICAgICBmcmFnbWVudDogdGhpcy5mcmFnbWVudFNoYWRlcixcclxuICAgICAgICAgICAgdW5pZm9ybXM6IHtcclxuICAgICAgICAgICAgdVRpbWU6IHsgdmFsdWU6IDAgfSxcclxuICAgICAgICAgICAgdFdhdGVyOiB7IHZhbHVlOiB0aGlzLnRleHR1cmUgfSxcclxuICAgICAgICAgICAgcmVzOiB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogbmV3IG9nbC5WZWM0KHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQsIHRleHR1cmVBc3BlY3QuYTEsIHRleHR1cmVBc3BlY3QuYTIpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzogeyB2YWx1ZTogbmV3IG9nbC5WZWMyKHRoaXMuaW1nU2l6ZS53aWR0aCwgdGhpcy5pbWdTaXplLmhlaWdodCkgfSxcclxuICAgICAgICAgICAgLy8gTm90ZSB0aGF0IHRoZSB1bmlmb3JtIGlzIGFwcGxpZWQgd2l0aG91dCB1c2luZyBhbiBvYmplY3QgYW5kIHZhbHVlIHByb3BlcnR5XHJcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgYmVjYXVzZSB0aGUgY2xhc3MgYWx0ZXJuYXRlcyB0aGlzIHRleHR1cmUgYmV0d2VlbiB0d28gcmVuZGVyIHRhcmdldHNcclxuICAgICAgICAgICAgLy8gYW5kIHVwZGF0ZXMgdGhlIHZhbHVlIHByb3BlcnR5IGFmdGVyIGVhY2ggcmVuZGVyLlxyXG4gICAgICAgICAgICB0RmxvdzogdGhpcy5mbG93bWFwLnVuaWZvcm1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlTWVzaCgpIHtcclxuICAgICAgICB0aGlzLm1lc2ggPSBuZXcgb2dsLk1lc2godGhpcy5nbCwgeyBnZW9tZXRyeTogdGhpcy5nZW9tZXRyeSwgcHJvZ3JhbTogdGhpcy5wcm9ncmFtIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlTW91c2UoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgaWYgKGUuY2hhbmdlZFRvdWNoZXMgJiYgZS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZS54ID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWFxyXG4gICAgICAgICAgICBlLnkgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlLnggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBlLnggPSBlLnBhZ2VYXHJcbiAgICAgICAgICAgIGUueSA9IGUucGFnZVlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gR2V0IG1vdXNlIHZhbHVlIGluIDAgdG8gMSByYW5nZSwgd2l0aCB5IGZsaXBwZWRcclxuICAgICAgICB0aGlzLm1vdXNlLnNldChlLnggLyB0aGlzLmdsLnJlbmRlcmVyLndpZHRoLCAxLjAgLSBlLnkgLyB0aGlzLmdsLnJlbmRlcmVyLmhlaWdodCk7XHJcblxyXG4gICAgICAgIC8vIENhbGN1bGF0ZSB2ZWxvY2l0eVxyXG4gICAgICAgIGlmICghdGhpcy5sYXN0VGltZSkge1xyXG4gICAgICAgICAgICAvLyBGaXJzdCBmcmFtZVxyXG4gICAgICAgICAgICB0aGlzLmxhc3RUaW1lID0gcGVyZm9ybWFuY2Uubm93KClcclxuICAgICAgICAgICAgdGhpcy5sYXN0TW91c2Uuc2V0KGUueCwgZS55KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGVsdGFYID0gZS54IC0gdGhpcy5sYXN0TW91c2UueFxyXG4gICAgICAgIGNvbnN0IGRlbHRhWSA9IGUueSAtIHRoaXMubGFzdE1vdXNlLnlcclxuXHJcbiAgICAgICAgdGhpcy5sYXN0TW91c2Uuc2V0KGUueCwgZS55KVxyXG5cclxuICAgICAgICBsZXQgdGltZSA9IHBlcmZvcm1hbmNlLm5vdygpXHJcblxyXG4gICAgICAgIC8vIEF2b2lkIGRpdmlkaW5nIGJ5IDBcclxuICAgICAgICBsZXQgZGVsdGEgPSBNYXRoLm1heCgxMC40LCB0aW1lIC0gdGhpcy5sYXN0VGltZSlcclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gdGltZVxyXG5cclxuICAgICAgICB0aGlzLnZlbG9jaXR5LnggPSBkZWx0YVggLyBkZWx0YVxyXG4gICAgICAgIHRoaXMudmVsb2NpdHkueSA9IGRlbHRhWSAvIGRlbHRhXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gRmxhZyB1cGRhdGUgdG8gcHJldmVudCBoYW5naW5nIHZlbG9jaXR5IHZhbHVlcyB3aGVuIG5vdCBtb3ZpbmdcclxuICAgICAgICB0aGlzLnZlbG9jaXR5Lm5lZWRzVXBkYXRlID0gdHJ1ZVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSh0KSB7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlKTtcclxuICAgIFxyXG4gICAgICAgIC8vIFJlc2V0IHZlbG9jaXR5IHdoZW4gbW91c2Ugbm90IG1vdmluZ1xyXG4gICAgICAgIGlmICghdGhpcy52ZWxvY2l0eS5uZWVkc1VwZGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlLnNldCgtMSlcclxuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eS5zZXQoMClcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICB0aGlzLnZlbG9jaXR5Lm5lZWRzVXBkYXRlID0gZmFsc2VcclxuICAgIFxyXG4gICAgICAgIC8vIFVwZGF0ZSBmbG93bWFwIGlucHV0c1xyXG4gICAgICAgIHRoaXMuZmxvd21hcC5hc3BlY3QgPSB0aGlzLmFzcGVjdFxyXG4gICAgICAgIHRoaXMuZmxvd21hcC5tb3VzZS5jb3B5KHRoaXMubW91c2UpXHJcbiAgICBcclxuICAgICAgICAvLyBFYXNlIHZlbG9jaXR5IGlucHV0LCBzbG93ZXIgd2hlbiBmYWRpbmcgb3V0XHJcbiAgICAgICAgdGhpcy5mbG93bWFwLnZlbG9jaXR5LmxlcnAodGhpcy52ZWxvY2l0eSwgdGhpcy52ZWxvY2l0eS5sZW4gPyAwLjE1IDogMC4xKVxyXG4gICAgICAgIHRoaXMuZmxvd21hcC51cGRhdGUoKVxyXG4gICAgXHJcbiAgICAgICAgdGhpcy5wcm9ncmFtLnVuaWZvcm1zLnVUaW1lLnZhbHVlID0gdCAqIDAuMDFcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcih7IHNjZW5lOiB0aGlzLm1lc2ggfSlcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKSB7XHJcbiAgICAgICAgdGhpcy5yQUYgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUpXHJcbiAgICB9XHJcblxyXG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoKSB7XHJcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5yQUYpXHJcbiAgICB9XHJcblxyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKVxyXG4gICAgICBcclxuICAgICAgICAvLyBDcmVhdGUgaGFuZGxlcnMgdG8gZ2V0IG1vdXNlIHBvc2l0aW9uIGFuZCB2ZWxvY2l0eVxyXG4gICAgICAgIGNvbnN0IGlzVG91Y2hDYXBhYmxlID0gXCJvbnRvdWNoc3RhcnRcIiBpbiB3aW5kb3dcclxuICAgICAgICBpZiAoaXNUb3VjaENhcGFibGUpIHtcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMudXBkYXRlTW91c2UsIGZhbHNlKVxyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCB0aGlzLnVwZGF0ZU1vdXNlLCB7IHBhc3NpdmU6IGZhbHNlIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy51cGRhdGVNb3VzZSwgZmFsc2UpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMucmVzaXplLCBmYWxzZSlcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgdGhpcy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLnJBRilcclxuXHJcbiAgICAgICAgY29uc3QgaXNUb3VjaENhcGFibGUgPSBcIm9udG91Y2hzdGFydFwiIGluIHdpbmRvd1xyXG4gICAgICAgIGlmIChpc1RvdWNoQ2FwYWJsZSkge1xyXG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy51cGRhdGVNb3VzZSwgZmFsc2UpXHJcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIHRoaXMudXBkYXRlTW91c2UsIHsgcGFzc2l2ZTogZmFsc2UgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLnVwZGF0ZU1vdXNlLCBmYWxzZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHJlc2l6ZSwgZmFsc2UpXHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXJzKClcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlR2VvbWV0cnkoKVxyXG4gICAgICAgIHRoaXMuY3JlYXRlU2hhZGVycygpXHJcbiAgICAgICAgdGhpcy5jcmVhdGVNZXNoKClcclxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKClcclxuICAgICAgICB0aGlzLnJlc2l6ZSgpXHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY29uc3Qgb2dsPWZ1bmN0aW9uKGEpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQoYSl7bGV0IGI9YVswXSxjPWFbMV0sZD1hWzJdO3JldHVybiBNYXRoLnNxcnQoYipiK2MqYytkKmQpfWZ1bmN0aW9uIHUoYSxiKXtyZXR1cm4gYVswXT1iWzBdLGFbMV09YlsxXSxhWzJdPWJbMl0sYX1mdW5jdGlvbiB2KGEsYixjKXtyZXR1cm4gYVswXT1iWzBdK2NbMF0sYVsxXT1iWzFdK2NbMV0sYVsyXT1iWzJdK2NbMl0sYX1mdW5jdGlvbiB3KGEsYixjKXtyZXR1cm4gYVswXT1iWzBdLWNbMF0sYVsxXT1iWzFdLWNbMV0sYVsyXT1iWzJdLWNbMl0sYX1mdW5jdGlvbiB4KGEsYixjKXtyZXR1cm4gYVswXT1iWzBdKmMsYVsxXT1iWzFdKmMsYVsyXT1iWzJdKmMsYX1mdW5jdGlvbiB5KGMsYSl7bGV0IGQ9YVswXSxlPWFbMV0sZj1hWzJdLGI9ZCpkK2UqZStmKmY7cmV0dXJuIGI+MCYmKGI9MS9NYXRoLnNxcnQoYikpLGNbMF09YVswXSpiLGNbMV09YVsxXSpiLGNbMl09YVsyXSpiLGN9ZnVuY3Rpb24geihhLGIpe3JldHVybiBhWzBdKmJbMF0rYVsxXSpiWzFdK2FbMl0qYlsyXX1sZXQgQT1mdW5jdGlvbigpe2xldCBhPVswLDAsMF0sYj1bMCwwLDBdO3JldHVybiBmdW5jdGlvbihkLGUpe3UoYSxkKSx1KGIsZSkseShhLGEpLHkoYixiKTtsZXQgYz16KGEsYik7cmV0dXJuIGM+MT8wOmM8IC0xP01hdGguUEk6TWF0aC5hY29zKGMpfX0oKTtjbGFzcyBiIGV4dGVuZHMgQXJyYXl7Y29uc3RydWN0b3IoYT0wLGI9YSxjPWEpe3JldHVybiBzdXBlcihhLGIsYyksdGhpc31nZXQgeCgpe3JldHVybiB0aGlzWzBdfXNldCB4KGEpe3RoaXNbMF09YX1nZXQgeSgpe3JldHVybiB0aGlzWzFdfXNldCB5KGEpe3RoaXNbMV09YX1nZXQgeigpe3JldHVybiB0aGlzWzJdfXNldCB6KGEpe3RoaXNbMl09YX1zZXQoYSxmPWEsZz1hKXt2YXIgYixjLGQsZTtyZXR1cm4gYS5sZW5ndGg/dGhpcy5jb3B5KGEpOihiPXRoaXMsYz1hLGQ9ZixlPWcsYlswXT1jLGJbMV09ZCxiWzJdPWUsdGhpcyl9Y29weShhKXtyZXR1cm4gdSh0aGlzLGEpLHRoaXN9YWRkKGEsYil7cmV0dXJuIGI/dih0aGlzLGEsYik6dih0aGlzLHRoaXMsYSksdGhpc31zdWIoYSxiKXtyZXR1cm4gYj93KHRoaXMsYSxiKTp3KHRoaXMsdGhpcyxhKSx0aGlzfW11bHRpcGx5KGMpe3ZhciBkLGEsYjtyZXR1cm4gYy5sZW5ndGg/KGE9dGhpcyxiPWMsKGQ9dGhpcylbMF09YVswXSpiWzBdLGRbMV09YVsxXSpiWzFdLGRbMl09YVsyXSpiWzJdKTp4KHRoaXMsdGhpcyxjKSx0aGlzfWRpdmlkZShjKXt2YXIgZCxhLGI7cmV0dXJuIGMubGVuZ3RoPyhhPXRoaXMsYj1jLChkPXRoaXMpWzBdPWFbMF0vYlswXSxkWzFdPWFbMV0vYlsxXSxkWzJdPWFbMl0vYlsyXSk6eCh0aGlzLHRoaXMsMS9jKSx0aGlzfWludmVyc2UoYz10aGlzKXt2YXIgYixhO3JldHVybiBhPWMsKGI9dGhpcylbMF09MS9hWzBdLGJbMV09MS9hWzFdLGJbMl09MS9hWzJdLHRoaXN9bGVuKCl7cmV0dXJuIHQodGhpcyl9ZGlzdGFuY2UoZil7dmFyIGEsYjtsZXQgYyxkLGU7cmV0dXJuIGY/KGE9dGhpcyxjPShiPWYpWzBdLWFbMF0sZD1iWzFdLWFbMV0sZT1iWzJdLWFbMl0sTWF0aC5zcXJ0KGMqYytkKmQrZSplKSk6dCh0aGlzKX1zcXVhcmVkTGVuKCl7cmV0dXJuIHRoaXMuc3F1YXJlZERpc3RhbmNlKCl9c3F1YXJlZERpc3RhbmNlKGope3ZhciBhLGMsYjtsZXQgZCxlLGYsZyxoLGk7cmV0dXJuIGo/KGE9dGhpcyxkPShjPWopWzBdLWFbMF0sZT1jWzFdLWFbMV0sZj1jWzJdLWFbMl0sZCpkK2UqZStmKmYpOihiPXRoaXMsZz1iWzBdLGg9YlsxXSxpPWJbMl0sZypnK2gqaCtpKmkpfW5lZ2F0ZShjPXRoaXMpe3ZhciBiLGE7cmV0dXJuIGE9YywoYj10aGlzKVswXT0tYVswXSxiWzFdPS1hWzFdLGJbMl09LWFbMl0sdGhpc31jcm9zcyhqLGspe3ZhciBhLGIsYztsZXQgZCxlLGYsZyxoLGk7cmV0dXJuIGE9dGhpcyxiPWosYz1rLGQ9YlswXSxlPWJbMV0sZj1iWzJdLGc9Y1swXSxoPWNbMV0saT1jWzJdLGFbMF09ZSppLWYqaCxhWzFdPWYqZy1kKmksYVsyXT1kKmgtZSpnLHRoaXN9c2NhbGUoYSl7cmV0dXJuIHgodGhpcyx0aGlzLGEpLHRoaXN9bm9ybWFsaXplKCl7cmV0dXJuIHkodGhpcyx0aGlzKSx0aGlzfWRvdChhKXtyZXR1cm4geih0aGlzLGEpfWVxdWFscyhjKXt2YXIgYixhO3JldHVybiBhPWMsKGI9dGhpcylbMF09PT1hWzBdJiZiWzFdPT09YVsxXSYmYlsyXT09PWFbMl19YXBwbHlNYXRyaXg0KGgpe3ZhciBmLGcsYTtsZXQgYyxkLGUsYjtyZXR1cm4gZj10aGlzLGc9dGhpcyxhPWgsYz1nWzBdLGQ9Z1sxXSxlPWdbMl0sYj1hWzNdKmMrYVs3XSpkK2FbMTFdKmUrYVsxNV0sYj1ifHwxLGZbMF09KGFbMF0qYythWzRdKmQrYVs4XSplK2FbMTJdKS9iLGZbMV09KGFbMV0qYythWzVdKmQrYVs5XSplK2FbMTNdKS9iLGZbMl09KGFbMl0qYythWzZdKmQrYVsxMF0qZSthWzE0XSkvYix0aGlzfWFwcGx5UXVhdGVybmlvbihxKXt2YXIgaCxpLGE7bGV0IGosayxsLGIsYyxkLGUsZixnLG4sbyxwLG07cmV0dXJuIGg9dGhpcyxpPXRoaXMsYT1xLGo9aVswXSxrPWlbMV0sbD1pWzJdLGI9YVswXSxjPWFbMV0sZD1hWzJdLGU9YypsLWQqayxmPWQqai1iKmwsZz1iKmstYypqLG49YypnLWQqZixvPWQqZS1iKmcscD1iKmYtYyplLG09MiphWzNdLGUqPW0sZio9bSxnKj1tLG4qPTIsbyo9MixwKj0yLGhbMF09aitlK24saFsxXT1rK2YrbyxoWzJdPWwrZytwLHRoaXN9YW5nbGUoYSl7cmV0dXJuIEEodGhpcyxhKX1sZXJwKGgsaSl7dmFyIGEsYixjLGQ7bGV0IGUsZixnO3JldHVybiBhPXRoaXMsYj10aGlzLGM9aCxkPWksZT1iWzBdLGY9YlsxXSxnPWJbMl0sYVswXT1lK2QqKGNbMF0tZSksYVsxXT1mK2QqKGNbMV0tZiksYVsyXT1nK2QqKGNbMl0tZyksdGhpc31jbG9uZSgpe3JldHVybiBuZXcgYih0aGlzWzBdLHRoaXNbMV0sdGhpc1syXSl9ZnJvbUFycmF5KGEsYj0wKXtyZXR1cm4gdGhpc1swXT1hW2JdLHRoaXNbMV09YVtiKzFdLHRoaXNbMl09YVtiKzJdLHRoaXN9dG9BcnJheShhPVtdLGI9MCl7cmV0dXJuIGFbYl09dGhpc1swXSxhW2IrMV09dGhpc1sxXSxhW2IrMl09dGhpc1syXSxhfXRyYW5zZm9ybURpcmVjdGlvbihhKXtsZXQgYj10aGlzWzBdLGM9dGhpc1sxXSxkPXRoaXNbMl07cmV0dXJuIHRoaXNbMF09YVswXSpiK2FbNF0qYythWzhdKmQsdGhpc1sxXT1hWzFdKmIrYVs1XSpjK2FbOV0qZCx0aGlzWzJdPWFbMl0qYithWzZdKmMrYVsxMF0qZCx0aGlzLm5vcm1hbGl6ZSgpfX1sZXQgQj1uZXcgYixDPTAsRD0wO2NsYXNzIGZ7Y29uc3RydWN0b3IoYyxhPXt9KXtmb3IobGV0IGIgaW4gdGhpcy5nbD1jLHRoaXMuYXR0cmlidXRlcz1hLHRoaXMuaWQ9QysrLHRoaXMuVkFPcz17fSx0aGlzLmRyYXdSYW5nZT17c3RhcnQ6MCxjb3VudDowfSx0aGlzLmluc3RhbmNlZENvdW50PTAsdGhpcy5nbC5yZW5kZXJlci5iaW5kVmVydGV4QXJyYXkobnVsbCksdGhpcy5nbC5yZW5kZXJlci5jdXJyZW50R2VvbWV0cnk9bnVsbCx0aGlzLmdsU3RhdGU9dGhpcy5nbC5yZW5kZXJlci5zdGF0ZSxhKXRoaXMuYWRkQXR0cmlidXRlKGIsYVtiXSl9YWRkQXR0cmlidXRlKGIsYSl7aWYodGhpcy5hdHRyaWJ1dGVzW2JdPWEsYS5pZD1EKyssYS5zaXplPWEuc2l6ZXx8MSxhLnR5cGU9YS50eXBlfHwoYS5kYXRhLmNvbnN0cnVjdG9yPT09RmxvYXQzMkFycmF5P3RoaXMuZ2wuRkxPQVQ6YS5kYXRhLmNvbnN0cnVjdG9yPT09VWludDE2QXJyYXk/dGhpcy5nbC5VTlNJR05FRF9TSE9SVDp0aGlzLmdsLlVOU0lHTkVEX0lOVCksYS50YXJnZXQ9XCJpbmRleFwiPT09Yj90aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSOnRoaXMuZ2wuQVJSQVlfQlVGRkVSLGEubm9ybWFsaXplPWEubm9ybWFsaXplfHwhMSxhLmJ1ZmZlcj10aGlzLmdsLmNyZWF0ZUJ1ZmZlcigpLGEuY291bnQ9YS5kYXRhLmxlbmd0aC9hLnNpemUsYS5kaXZpc29yPWEuaW5zdGFuY2VkfHwwLGEubmVlZHNVcGRhdGU9ITEsdGhpcy51cGRhdGVBdHRyaWJ1dGUoYSksYS5kaXZpc29yKXtpZih0aGlzLmlzSW5zdGFuY2VkPSEwLHRoaXMuaW5zdGFuY2VkQ291bnQmJnRoaXMuaW5zdGFuY2VkQ291bnQhPT1hLmNvdW50KmEuZGl2aXNvcilyZXR1cm4gY29uc29sZS53YXJuKFwiZ2VvbWV0cnkgaGFzIG11bHRpcGxlIGluc3RhbmNlZCBidWZmZXJzIG9mIGRpZmZlcmVudCBsZW5ndGhcIiksdGhpcy5pbnN0YW5jZWRDb3VudD1NYXRoLm1pbih0aGlzLmluc3RhbmNlZENvdW50LGEuY291bnQqYS5kaXZpc29yKTt0aGlzLmluc3RhbmNlZENvdW50PWEuY291bnQqYS5kaXZpc29yfWVsc2VcImluZGV4XCI9PT1iP3RoaXMuZHJhd1JhbmdlLmNvdW50PWEuY291bnQ6dGhpcy5hdHRyaWJ1dGVzLmluZGV4fHwodGhpcy5kcmF3UmFuZ2UuY291bnQ9TWF0aC5tYXgodGhpcy5kcmF3UmFuZ2UuY291bnQsYS5jb3VudCkpfXVwZGF0ZUF0dHJpYnV0ZShhKXt0aGlzLmdsU3RhdGUuYm91bmRCdWZmZXIhPT1hLmlkJiYodGhpcy5nbC5iaW5kQnVmZmVyKGEudGFyZ2V0LGEuYnVmZmVyKSx0aGlzLmdsU3RhdGUuYm91bmRCdWZmZXI9YS5pZCksdGhpcy5nbC5idWZmZXJEYXRhKGEudGFyZ2V0LGEuZGF0YSx0aGlzLmdsLlNUQVRJQ19EUkFXKSxhLm5lZWRzVXBkYXRlPSExfXNldEluZGV4KGEpe3RoaXMuYWRkQXR0cmlidXRlKFwiaW5kZXhcIixhKX1zZXREcmF3UmFuZ2UoYSxiKXt0aGlzLmRyYXdSYW5nZS5zdGFydD1hLHRoaXMuZHJhd1JhbmdlLmNvdW50PWJ9c2V0SW5zdGFuY2VkQ291bnQoYSl7dGhpcy5pbnN0YW5jZWRDb3VudD1hfWNyZWF0ZVZBTyhhKXt0aGlzLlZBT3NbYS5hdHRyaWJ1dGVPcmRlcl09dGhpcy5nbC5yZW5kZXJlci5jcmVhdGVWZXJ0ZXhBcnJheSgpLHRoaXMuZ2wucmVuZGVyZXIuYmluZFZlcnRleEFycmF5KHRoaXMuVkFPc1thLmF0dHJpYnV0ZU9yZGVyXSksdGhpcy5iaW5kQXR0cmlidXRlcyhhKX1iaW5kQXR0cmlidXRlcyhhKXthLmF0dHJpYnV0ZUxvY2F0aW9ucy5mb3JFYWNoKChiLGMpPT57aWYoIXRoaXMuYXR0cmlidXRlc1tjXSlyZXR1cm4gdm9pZCBjb25zb2xlLndhcm4oYGFjdGl2ZSBhdHRyaWJ1dGUgJHtjfSBub3QgYmVpbmcgc3VwcGxpZWRgKTtsZXQgYT10aGlzLmF0dHJpYnV0ZXNbY107dGhpcy5nbC5iaW5kQnVmZmVyKGEudGFyZ2V0LGEuYnVmZmVyKSx0aGlzLmdsU3RhdGUuYm91bmRCdWZmZXI9YS5pZCx0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIoYixhLnNpemUsYS50eXBlLGEubm9ybWFsaXplLDAsMCksdGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShiKSx0aGlzLmdsLnJlbmRlcmVyLnZlcnRleEF0dHJpYkRpdmlzb3IoYixhLmRpdmlzb3IpfSksdGhpcy5hdHRyaWJ1dGVzLmluZGV4JiZ0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUix0aGlzLmF0dHJpYnV0ZXMuaW5kZXguYnVmZmVyKX1kcmF3KHtwcm9ncmFtOmEsbW9kZTpiPXRoaXMuZ2wuVFJJQU5HTEVTfSl7dGhpcy5nbC5yZW5kZXJlci5jdXJyZW50R2VvbWV0cnkhPT1gJHt0aGlzLmlkfV8ke2EuYXR0cmlidXRlT3JkZXJ9YCYmKHRoaXMuVkFPc1thLmF0dHJpYnV0ZU9yZGVyXXx8dGhpcy5jcmVhdGVWQU8oYSksdGhpcy5nbC5yZW5kZXJlci5iaW5kVmVydGV4QXJyYXkodGhpcy5WQU9zW2EuYXR0cmlidXRlT3JkZXJdKSx0aGlzLmdsLnJlbmRlcmVyLmN1cnJlbnRHZW9tZXRyeT1gJHt0aGlzLmlkfV8ke2EuYXR0cmlidXRlT3JkZXJ9YCksYS5hdHRyaWJ1dGVMb2NhdGlvbnMuZm9yRWFjaCgoYyxiKT0+e2xldCBhPXRoaXMuYXR0cmlidXRlc1tiXTthLm5lZWRzVXBkYXRlJiZ0aGlzLnVwZGF0ZUF0dHJpYnV0ZShhKX0pLHRoaXMuaXNJbnN0YW5jZWQ/dGhpcy5hdHRyaWJ1dGVzLmluZGV4P3RoaXMuZ2wucmVuZGVyZXIuZHJhd0VsZW1lbnRzSW5zdGFuY2VkKGIsdGhpcy5kcmF3UmFuZ2UuY291bnQsdGhpcy5hdHRyaWJ1dGVzLmluZGV4LnR5cGUsdGhpcy5kcmF3UmFuZ2Uuc3RhcnQsdGhpcy5pbnN0YW5jZWRDb3VudCk6dGhpcy5nbC5yZW5kZXJlci5kcmF3QXJyYXlzSW5zdGFuY2VkKGIsdGhpcy5kcmF3UmFuZ2Uuc3RhcnQsdGhpcy5kcmF3UmFuZ2UuY291bnQsdGhpcy5pbnN0YW5jZWRDb3VudCk6dGhpcy5hdHRyaWJ1dGVzLmluZGV4P3RoaXMuZ2wuZHJhd0VsZW1lbnRzKGIsdGhpcy5kcmF3UmFuZ2UuY291bnQsdGhpcy5hdHRyaWJ1dGVzLmluZGV4LnR5cGUsdGhpcy5kcmF3UmFuZ2Uuc3RhcnQpOnRoaXMuZ2wuZHJhd0FycmF5cyhiLHRoaXMuZHJhd1JhbmdlLnN0YXJ0LHRoaXMuZHJhd1JhbmdlLmNvdW50KX1jb21wdXRlQm91bmRpbmdCb3goZCl7IWQmJnRoaXMuYXR0cmlidXRlcy5wb3NpdGlvbiYmKGQ9dGhpcy5hdHRyaWJ1dGVzLnBvc2l0aW9uLmRhdGEpLGR8fGNvbnNvbGUud2FybihcIk5vIHBvc2l0aW9uIGJ1ZmZlciBmb3VuZCB0byBjb21wdXRlIGJvdW5kc1wiKSx0aGlzLmJvdW5kc3x8KHRoaXMuYm91bmRzPXttaW46bmV3IGIsbWF4Om5ldyBiLGNlbnRlcjpuZXcgYixzY2FsZTpuZXcgYixyYWRpdXM6MS8wfSk7bGV0IGE9dGhpcy5ib3VuZHMubWluLGM9dGhpcy5ib3VuZHMubWF4LGk9dGhpcy5ib3VuZHMuY2VudGVyLGo9dGhpcy5ib3VuZHMuc2NhbGU7YS5zZXQoMS8wKSxjLnNldCgtMS8wKTtmb3IobGV0IGU9MCxrPWQubGVuZ3RoO2U8aztlKz0zKXtsZXQgZj1kW2VdLGc9ZFtlKzFdLGg9ZFtlKzJdO2EueD1NYXRoLm1pbihmLGEueCksYS55PU1hdGgubWluKGcsYS55KSxhLno9TWF0aC5taW4oaCxhLnopLGMueD1NYXRoLm1heChmLGMueCksYy55PU1hdGgubWF4KGcsYy55KSxjLno9TWF0aC5tYXgoaCxjLnopfWouc3ViKGMsYSksaS5hZGQoYSxjKS5kaXZpZGUoMil9Y29tcHV0ZUJvdW5kaW5nU3BoZXJlKGEpeyFhJiZ0aGlzLmF0dHJpYnV0ZXMucG9zaXRpb24mJihhPXRoaXMuYXR0cmlidXRlcy5wb3NpdGlvbi5kYXRhKSxhfHxjb25zb2xlLndhcm4oXCJObyBwb3NpdGlvbiBidWZmZXIgZm91bmQgdG8gY29tcHV0ZSBib3VuZHNcIiksdGhpcy5ib3VuZHN8fHRoaXMuY29tcHV0ZUJvdW5kaW5nQm94KGEpO2xldCBiPTA7Zm9yKGxldCBjPTAsZD1hLmxlbmd0aDtjPGQ7Yys9MylCLmZyb21BcnJheShhLGMpLGI9TWF0aC5tYXgoYix0aGlzLmJvdW5kcy5jZW50ZXIuc3F1YXJlZERpc3RhbmNlKEIpKTt0aGlzLmJvdW5kcy5yYWRpdXM9TWF0aC5zcXJ0KGIpfXJlbW92ZSgpe2ZvcihsZXQgYSBpbiB0aGlzLnZhbyYmdGhpcy5nbC5yZW5kZXJlci5kZWxldGVWZXJ0ZXhBcnJheSh0aGlzLnZhbyksdGhpcy5hdHRyaWJ1dGVzKXRoaXMuZ2wuZGVsZXRlQnVmZmVyKHRoaXMuYXR0cmlidXRlc1thXS5idWZmZXIpLGRlbGV0ZSB0aGlzLmF0dHJpYnV0ZXNbYV19fWxldCBFPTAsRj17fTtjbGFzcyBoe2NvbnN0cnVjdG9yKGEse3ZlcnRleDpmLGZyYWdtZW50OmcsdW5pZm9ybXM6bT17fSx0cmFuc3BhcmVudDpuPSExLGN1bGxGYWNlOm89YS5CQUNLLGZyb250RmFjZTpwPWEuQ0NXLGRlcHRoVGVzdDpxPSEwLGRlcHRoV3JpdGU6cj0hMCxkZXB0aEZ1bmM6cz1hLkxFU1N9PXt9KXt0aGlzLmdsPWEsdGhpcy51bmlmb3Jtcz1tLHRoaXMuaWQ9RSsrLGZ8fGNvbnNvbGUud2FybihcInZlcnRleCBzaGFkZXIgbm90IHN1cHBsaWVkXCIpLGd8fGNvbnNvbGUud2FybihcImZyYWdtZW50IHNoYWRlciBub3Qgc3VwcGxpZWRcIiksdGhpcy50cmFuc3BhcmVudD1uLHRoaXMuY3VsbEZhY2U9byx0aGlzLmZyb250RmFjZT1wLHRoaXMuZGVwdGhUZXN0PXEsdGhpcy5kZXB0aFdyaXRlPXIsdGhpcy5kZXB0aEZ1bmM9cyx0aGlzLmJsZW5kRnVuYz17fSx0aGlzLmJsZW5kRXF1YXRpb249e30sdGhpcy50cmFuc3BhcmVudCYmIXRoaXMuYmxlbmRGdW5jLnNyYyYmKHRoaXMuZ2wucmVuZGVyZXIucHJlbXVsdGlwbGllZEFscGhhP3RoaXMuc2V0QmxlbmRGdW5jKHRoaXMuZ2wuT05FLHRoaXMuZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk6dGhpcy5zZXRCbGVuZEZ1bmModGhpcy5nbC5TUkNfQUxQSEEsdGhpcy5nbC5PTkVfTUlOVVNfU1JDX0FMUEhBKSk7bGV0IGQ9YS5jcmVhdGVTaGFkZXIoYS5WRVJURVhfU0hBREVSKTthLnNoYWRlclNvdXJjZShkLGYpLGEuY29tcGlsZVNoYWRlcihkKSxcIlwiIT09YS5nZXRTaGFkZXJJbmZvTG9nKGQpJiZjb25zb2xlLndhcm4oYCR7YS5nZXRTaGFkZXJJbmZvTG9nKGQpfVxyXG5WZXJ0ZXggU2hhZGVyXHJcbiR7SChmKX1gKTtsZXQgZT1hLmNyZWF0ZVNoYWRlcihhLkZSQUdNRU5UX1NIQURFUik7aWYoYS5zaGFkZXJTb3VyY2UoZSxnKSxhLmNvbXBpbGVTaGFkZXIoZSksXCJcIiE9PWEuZ2V0U2hhZGVySW5mb0xvZyhlKSYmY29uc29sZS53YXJuKGAke2EuZ2V0U2hhZGVySW5mb0xvZyhlKX1cclxuRnJhZ21lbnQgU2hhZGVyXHJcbiR7SChnKX1gKSx0aGlzLnByb2dyYW09YS5jcmVhdGVQcm9ncmFtKCksYS5hdHRhY2hTaGFkZXIodGhpcy5wcm9ncmFtLGQpLGEuYXR0YWNoU2hhZGVyKHRoaXMucHJvZ3JhbSxlKSxhLmxpbmtQcm9ncmFtKHRoaXMucHJvZ3JhbSksIWEuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLnByb2dyYW0sYS5MSU5LX1NUQVRVUykpcmV0dXJuIGNvbnNvbGUud2FybihhLmdldFByb2dyYW1JbmZvTG9nKHRoaXMucHJvZ3JhbSkpO2EuZGVsZXRlU2hhZGVyKGQpLGEuZGVsZXRlU2hhZGVyKGUpLHRoaXMudW5pZm9ybUxvY2F0aW9ucz1uZXcgTWFwO2xldCB0PWEuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLnByb2dyYW0sYS5BQ1RJVkVfVU5JRk9STVMpO2ZvcihsZXQgaD0wO2g8dDtoKyspe2xldCBiPWEuZ2V0QWN0aXZlVW5pZm9ybSh0aGlzLnByb2dyYW0saCk7dGhpcy51bmlmb3JtTG9jYXRpb25zLnNldChiLGEuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMucHJvZ3JhbSxiLm5hbWUpKTtsZXQgYz1iLm5hbWUubWF0Y2goLyhcXHcrKS9nKTtiLnVuaWZvcm1OYW1lPWNbMF0sMz09PWMubGVuZ3RoPyhiLmlzU3RydWN0QXJyYXk9ITAsYi5zdHJ1Y3RJbmRleD1OdW1iZXIoY1sxXSksYi5zdHJ1Y3RQcm9wZXJ0eT1jWzJdKToyPT09Yy5sZW5ndGgmJmlzTmFOKE51bWJlcihjWzFdKSkmJihiLmlzU3RydWN0PSEwLGIuc3RydWN0UHJvcGVydHk9Y1sxXSl9dGhpcy5hdHRyaWJ1dGVMb2NhdGlvbnM9bmV3IE1hcDtsZXQgaz1bXSx1PWEuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLnByb2dyYW0sYS5BQ1RJVkVfQVRUUklCVVRFUyk7Zm9yKGxldCBpPTA7aTx1O2krKyl7bGV0IGo9YS5nZXRBY3RpdmVBdHRyaWIodGhpcy5wcm9ncmFtLGkpLGw9YS5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnByb2dyYW0sai5uYW1lKTtrW2xdPWoubmFtZSx0aGlzLmF0dHJpYnV0ZUxvY2F0aW9ucy5zZXQoai5uYW1lLGwpfXRoaXMuYXR0cmlidXRlT3JkZXI9ay5qb2luKFwiXCIpfXNldEJsZW5kRnVuYyhhLGIsYyxkKXt0aGlzLmJsZW5kRnVuYy5zcmM9YSx0aGlzLmJsZW5kRnVuYy5kc3Q9Yix0aGlzLmJsZW5kRnVuYy5zcmNBbHBoYT1jLHRoaXMuYmxlbmRGdW5jLmRzdEFscGhhPWQsYSYmKHRoaXMudHJhbnNwYXJlbnQ9ITApfXNldEJsZW5kRXF1YXRpb24oYSxiKXt0aGlzLmJsZW5kRXF1YXRpb24ubW9kZVJHQj1hLHRoaXMuYmxlbmRFcXVhdGlvbi5tb2RlQWxwaGE9Yn1hcHBseVN0YXRlKCl7dGhpcy5kZXB0aFRlc3Q/dGhpcy5nbC5yZW5kZXJlci5lbmFibGUodGhpcy5nbC5ERVBUSF9URVNUKTp0aGlzLmdsLnJlbmRlcmVyLmRpc2FibGUodGhpcy5nbC5ERVBUSF9URVNUKSx0aGlzLmN1bGxGYWNlP3RoaXMuZ2wucmVuZGVyZXIuZW5hYmxlKHRoaXMuZ2wuQ1VMTF9GQUNFKTp0aGlzLmdsLnJlbmRlcmVyLmRpc2FibGUodGhpcy5nbC5DVUxMX0ZBQ0UpLHRoaXMuYmxlbmRGdW5jLnNyYz90aGlzLmdsLnJlbmRlcmVyLmVuYWJsZSh0aGlzLmdsLkJMRU5EKTp0aGlzLmdsLnJlbmRlcmVyLmRpc2FibGUodGhpcy5nbC5CTEVORCksdGhpcy5jdWxsRmFjZSYmdGhpcy5nbC5yZW5kZXJlci5zZXRDdWxsRmFjZSh0aGlzLmN1bGxGYWNlKSx0aGlzLmdsLnJlbmRlcmVyLnNldEZyb250RmFjZSh0aGlzLmZyb250RmFjZSksdGhpcy5nbC5yZW5kZXJlci5zZXREZXB0aE1hc2sodGhpcy5kZXB0aFdyaXRlKSx0aGlzLmdsLnJlbmRlcmVyLnNldERlcHRoRnVuYyh0aGlzLmRlcHRoRnVuYyksdGhpcy5ibGVuZEZ1bmMuc3JjJiZ0aGlzLmdsLnJlbmRlcmVyLnNldEJsZW5kRnVuYyh0aGlzLmJsZW5kRnVuYy5zcmMsdGhpcy5ibGVuZEZ1bmMuZHN0LHRoaXMuYmxlbmRGdW5jLnNyY0FscGhhLHRoaXMuYmxlbmRGdW5jLmRzdEFscGhhKSx0aGlzLmJsZW5kRXF1YXRpb24ubW9kZVJHQiYmdGhpcy5nbC5yZW5kZXJlci5zZXRCbGVuZEVxdWF0aW9uKHRoaXMuYmxlbmRFcXVhdGlvbi5tb2RlUkdCLHRoaXMuYmxlbmRFcXVhdGlvbi5tb2RlQWxwaGEpfXVzZSh7ZmxpcEZhY2VzOmE9ITF9PXt9KXtsZXQgYj0tMTt0aGlzLmdsLnJlbmRlcmVyLmN1cnJlbnRQcm9ncmFtPT09dGhpcy5pZHx8KHRoaXMuZ2wudXNlUHJvZ3JhbSh0aGlzLnByb2dyYW0pLHRoaXMuZ2wucmVuZGVyZXIuY3VycmVudFByb2dyYW09dGhpcy5pZCksdGhpcy51bmlmb3JtTG9jYXRpb25zLmZvckVhY2goKGUsYyk9PntsZXQgZD1jLnVuaWZvcm1OYW1lLGE9dGhpcy51bmlmb3Jtc1tkXTtpZihjLmlzU3RydWN0JiYoYT1hW2Muc3RydWN0UHJvcGVydHldLGQrPWAuJHtjLnN0cnVjdFByb3BlcnR5fWApLGMuaXNTdHJ1Y3RBcnJheSYmKGE9YVtjLnN0cnVjdEluZGV4XVtjLnN0cnVjdFByb3BlcnR5XSxkKz1gWyR7Yy5zdHJ1Y3RJbmRleH1dLiR7Yy5zdHJ1Y3RQcm9wZXJ0eX1gKSwhYSlyZXR1cm4gSihgQWN0aXZlIHVuaWZvcm0gJHtkfSBoYXMgbm90IGJlZW4gc3VwcGxpZWRgKTtpZihhJiYgdm9pZCAwPT09YS52YWx1ZSlyZXR1cm4gSihgJHtkfSB1bmlmb3JtIGlzIG1pc3NpbmcgYSB2YWx1ZSBwYXJhbWV0ZXJgKTtpZihhLnZhbHVlLnRleHR1cmUpcmV0dXJuIGIrPTEsYS52YWx1ZS51cGRhdGUoYiksRyh0aGlzLmdsLGMudHlwZSxlLGIpO2lmKGEudmFsdWUubGVuZ3RoJiZhLnZhbHVlWzBdLnRleHR1cmUpe2xldCBmPVtdO3JldHVybiBhLnZhbHVlLmZvckVhY2goYT0+e2IrPTEsYS51cGRhdGUoYiksZi5wdXNoKGIpfSksRyh0aGlzLmdsLGMudHlwZSxlLGYpfUcodGhpcy5nbCxjLnR5cGUsZSxhLnZhbHVlKX0pLHRoaXMuYXBwbHlTdGF0ZSgpLGEmJnRoaXMuZ2wucmVuZGVyZXIuc2V0RnJvbnRGYWNlKHRoaXMuZnJvbnRGYWNlPT09dGhpcy5nbC5DQ1c/dGhpcy5nbC5DVzp0aGlzLmdsLkNDVyl9cmVtb3ZlKCl7dGhpcy5nbC5kZWxldGVQcm9ncmFtKHRoaXMucHJvZ3JhbSl9fWZ1bmN0aW9uIEcoYixlLGMsYSl7YT1hLmxlbmd0aD9mdW5jdGlvbihhKXtsZXQgZj1hLmxlbmd0aCxkPWFbMF0ubGVuZ3RoO2lmKHZvaWQgMD09PWQpcmV0dXJuIGE7bGV0IGU9ZipkLGI9RltlXTtifHwoRltlXT1iPW5ldyBGbG9hdDMyQXJyYXkoZSkpO2ZvcihsZXQgYz0wO2M8ZjtjKyspYi5zZXQoYVtjXSxjKmQpO3JldHVybiBifShhKTphO2xldCBkPWIucmVuZGVyZXIuc3RhdGUudW5pZm9ybUxvY2F0aW9ucy5nZXQoYyk7aWYoYS5sZW5ndGgpe2lmKHZvaWQgMD09PWQpYi5yZW5kZXJlci5zdGF0ZS51bmlmb3JtTG9jYXRpb25zLnNldChjLGEuc2xpY2UoMCkpO2Vsc2V7aWYoZnVuY3Rpb24oYixjKXtpZihiLmxlbmd0aCE9PWMubGVuZ3RoKXJldHVybiExO2ZvcihsZXQgYT0wLGQ9Yi5sZW5ndGg7YTxkO2ErKylpZihiW2FdIT09Y1thXSlyZXR1cm4hMTtyZXR1cm4hMH0oZCxhKSlyZXR1cm47ZC5zZXQoYSksYi5yZW5kZXJlci5zdGF0ZS51bmlmb3JtTG9jYXRpb25zLnNldChjLGQpfX1lbHNle2lmKGQ9PT1hKXJldHVybjtiLnJlbmRlcmVyLnN0YXRlLnVuaWZvcm1Mb2NhdGlvbnMuc2V0KGMsYSl9c3dpdGNoKGUpe2Nhc2UgNTEyNjpyZXR1cm4gYS5sZW5ndGg/Yi51bmlmb3JtMWZ2KGMsYSk6Yi51bmlmb3JtMWYoYyxhKTtjYXNlIDM1NjY0OnJldHVybiBiLnVuaWZvcm0yZnYoYyxhKTtjYXNlIDM1NjY1OnJldHVybiBiLnVuaWZvcm0zZnYoYyxhKTtjYXNlIDM1NjY2OnJldHVybiBiLnVuaWZvcm00ZnYoYyxhKTtjYXNlIDM1NjcwOmNhc2UgNTEyNDpjYXNlIDM1Njc4OmNhc2UgMzU2ODA6cmV0dXJuIGEubGVuZ3RoP2IudW5pZm9ybTFpdihjLGEpOmIudW5pZm9ybTFpKGMsYSk7Y2FzZSAzNTY3MTpjYXNlIDM1NjY3OnJldHVybiBiLnVuaWZvcm0yaXYoYyxhKTtjYXNlIDM1NjcyOmNhc2UgMzU2Njg6cmV0dXJuIGIudW5pZm9ybTNpdihjLGEpO2Nhc2UgMzU2NzM6Y2FzZSAzNTY2OTpyZXR1cm4gYi51bmlmb3JtNGl2KGMsYSk7Y2FzZSAzNTY3NDpyZXR1cm4gYi51bmlmb3JtTWF0cml4MmZ2KGMsITEsYSk7Y2FzZSAzNTY3NTpyZXR1cm4gYi51bmlmb3JtTWF0cml4M2Z2KGMsITEsYSk7Y2FzZSAzNTY3NjpyZXR1cm4gYi51bmlmb3JtTWF0cml4NGZ2KGMsITEsYSl9fWZ1bmN0aW9uIEgoYyl7bGV0IGI9Yy5zcGxpdChcIlxcblwiKTtmb3IobGV0IGE9MDthPGIubGVuZ3RoO2ErKyliW2FdPWErMStcIjogXCIrYlthXTtyZXR1cm4gYi5qb2luKFwiXFxuXCIpfWxldCBJPTA7ZnVuY3Rpb24gSihhKXtJPjEwMHx8KGNvbnNvbGUud2FybihhKSwrK0k+MTAwJiZjb25zb2xlLndhcm4oXCJNb3JlIHRoYW4gMTAwIHByb2dyYW0gd2FybmluZ3MgLSBzdG9wcGluZyBsb2dzLlwiKSl9bGV0IEs9bmV3IGI7ZnVuY3Rpb24gaShhLGIpe3JldHVybiBhWzBdPWJbMF0sYVsxXT1iWzFdLGFbMl09YlsyXSxhWzNdPWJbM10sYX1mdW5jdGlvbiBqKGEsYixjLGQsZSl7cmV0dXJuIGFbMF09YixhWzFdPWMsYVsyXT1kLGFbM109ZSxhfWZ1bmN0aW9uIGsoYixjKXtsZXQgZD1jWzBdLGU9Y1sxXSxmPWNbMl0sZz1jWzNdLGE9ZCpkK2UqZStmKmYrZypnO3JldHVybiBhPjAmJihhPTEvTWF0aC5zcXJ0KGEpKSxiWzBdPWQqYSxiWzFdPWUqYSxiWzJdPWYqYSxiWzNdPWcqYSxifWZ1bmN0aW9uIEwoYSxiLGMpe2xldCBkPWJbMF0sZT1iWzFdLGY9YlsyXSxnPWJbM10saD1jWzBdLGk9Y1sxXSxqPWNbMl0saz1jWzNdO3JldHVybiBhWzBdPWQqaytnKmgrZSpqLWYqaSxhWzFdPWUqaytnKmkrZipoLWQqaixhWzJdPWYqaytnKmorZCppLWUqaCxhWzNdPWcqay1kKmgtZSppLWYqaixhfWxldCBNPWksXz1qLE49aztjbGFzcyBkIGV4dGVuZHMgQXJyYXl7Y29uc3RydWN0b3IoYT0wLGI9MCxjPTAsZD0xKXtyZXR1cm4gc3VwZXIoYSxiLGMsZCksdGhpcy5vbkNoYW5nZT0oKT0+e30sdGhpc31nZXQgeCgpe3JldHVybiB0aGlzWzBdfXNldCB4KGEpe3RoaXNbMF09YSx0aGlzLm9uQ2hhbmdlKCl9Z2V0IHkoKXtyZXR1cm4gdGhpc1sxXX1zZXQgeShhKXt0aGlzWzFdPWEsdGhpcy5vbkNoYW5nZSgpfWdldCB6KCl7cmV0dXJuIHRoaXNbMl19c2V0IHooYSl7dGhpc1syXT1hLHRoaXMub25DaGFuZ2UoKX1nZXQgdygpe3JldHVybiB0aGlzWzNdfXNldCB3KGEpe3RoaXNbM109YSx0aGlzLm9uQ2hhbmdlKCl9aWRlbnRpdHkoKXt2YXIgYTtyZXR1cm4oYT10aGlzKVswXT0wLGFbMV09MCxhWzJdPTAsYVszXT0xLHRoaXMub25DaGFuZ2UoKSx0aGlzfXNldChhLGIsYyxkKXtyZXR1cm4gYS5sZW5ndGg/dGhpcy5jb3B5KGEpOihfKHRoaXMsYSxiLGMsZCksdGhpcy5vbkNoYW5nZSgpLHRoaXMpfXJvdGF0ZVgoail7dmFyIGEsYixlO2xldCBmLGcsaCxpLGMsZDtyZXR1cm4gYT10aGlzLGI9dGhpcyxlPWosZSo9LjUsZj1iWzBdLGc9YlsxXSxoPWJbMl0saT1iWzNdLGM9TWF0aC5zaW4oZSksZD1NYXRoLmNvcyhlKSxhWzBdPWYqZCtpKmMsYVsxXT1nKmQraCpjLGFbMl09aCpkLWcqYyxhWzNdPWkqZC1mKmMsdGhpcy5vbkNoYW5nZSgpLHRoaXN9cm90YXRlWShqKXt2YXIgYSxiLGU7bGV0IGYsZyxoLGksYyxkO3JldHVybiBhPXRoaXMsYj10aGlzLGU9aixlKj0uNSxmPWJbMF0sZz1iWzFdLGg9YlsyXSxpPWJbM10sYz1NYXRoLnNpbihlKSxkPU1hdGguY29zKGUpLGFbMF09ZipkLWgqYyxhWzFdPWcqZCtpKmMsYVsyXT1oKmQrZipjLGFbM109aSpkLWcqYyx0aGlzLm9uQ2hhbmdlKCksdGhpc31yb3RhdGVaKGope3ZhciBhLGIsZTtsZXQgZixnLGgsaSxjLGQ7cmV0dXJuIGE9dGhpcyxiPXRoaXMsZT1qLGUqPS41LGY9YlswXSxnPWJbMV0saD1iWzJdLGk9YlszXSxjPU1hdGguc2luKGUpLGQ9TWF0aC5jb3MoZSksYVswXT1mKmQrZypjLGFbMV09ZypkLWYqYyxhWzJdPWgqZCtpKmMsYVszXT1pKmQtaCpjLHRoaXMub25DaGFuZ2UoKSx0aGlzfWludmVyc2UoaT10aGlzKXt2YXIgYSxjO2xldCBkLGUsZixnLGgsYjtyZXR1cm4gYT10aGlzLGQ9KGM9aSlbMF0sZT1jWzFdLGY9Y1syXSxnPWNbM10saD1kKmQrZSplK2YqZitnKmcsYj1oPzEvaDowLGFbMF09LWQqYixhWzFdPS1lKmIsYVsyXT0tZipiLGFbM109ZypiLHRoaXMub25DaGFuZ2UoKSx0aGlzfWNvbmp1Z2F0ZShjPXRoaXMpe3ZhciBiLGE7cmV0dXJuIGE9YywoYj10aGlzKVswXT0tYVswXSxiWzFdPS1hWzFdLGJbMl09LWFbMl0sYlszXT1hWzNdLHRoaXMub25DaGFuZ2UoKSx0aGlzfWNvcHkoYSl7cmV0dXJuIE0odGhpcyxhKSx0aGlzLm9uQ2hhbmdlKCksdGhpc31ub3JtYWxpemUoYT10aGlzKXtyZXR1cm4gTih0aGlzLGEpLHRoaXMub25DaGFuZ2UoKSx0aGlzfW11bHRpcGx5KGEsYil7cmV0dXJuIGI/TCh0aGlzLGEsYik6TCh0aGlzLHRoaXMsYSksdGhpcy5vbkNoYW5nZSgpLHRoaXN9ZG90KGMpe3ZhciBhLGI7cmV0dXJuIGE9dGhpcyxiPWMsYVswXSpiWzBdK2FbMV0qYlsxXSthWzJdKmJbMl0rYVszXSpiWzNdfWZyb21NYXRyaXgzKGEpe3JldHVybiBmdW5jdGlvbihkLGEpe2xldCBiLGc9YVswXSthWzRdK2FbOF07aWYoZz4wKWI9TWF0aC5zcXJ0KGcrMSksZFszXT0uNSpiLGI9LjUvYixkWzBdPShhWzVdLWFbN10pKmIsZFsxXT0oYVs2XS1hWzJdKSpiLGRbMl09KGFbMV0tYVszXSkqYjtlbHNle2xldCBjPTA7YVs0XT5hWzBdJiYoYz0xKSxhWzhdPmFbMypjK2NdJiYoYz0yKTtsZXQgZT0oYysxKSUzLGY9KGMrMiklMztiPU1hdGguc3FydChhWzMqYytjXS1hWzMqZStlXS1hWzMqZitmXSsxKSxkW2NdPS41KmIsYj0uNS9iLGRbM109KGFbMyplK2ZdLWFbMypmK2VdKSpiLGRbZV09KGFbMyplK2NdK2FbMypjK2VdKSpiLGRbZl09KGFbMypmK2NdK2FbMypjK2ZdKSpifX0odGhpcyxhKSx0aGlzLm9uQ2hhbmdlKCksdGhpc31mcm9tRXVsZXIoYSl7cmV0dXJuIGZ1bmN0aW9uKGEsaCxpPVwiWVhaXCIpe2xldCBiPU1hdGguc2luKC41KmhbMF0pLGM9TWF0aC5jb3MoLjUqaFswXSksZD1NYXRoLnNpbiguNSpoWzFdKSxlPU1hdGguY29zKC41KmhbMV0pLGY9TWF0aC5zaW4oLjUqaFsyXSksZz1NYXRoLmNvcyguNSpoWzJdKTtcIlhZWlwiPT09aT8oYVswXT1iKmUqZytjKmQqZixhWzFdPWMqZCpnLWIqZSpmLGFbMl09YyplKmYrYipkKmcsYVszXT1jKmUqZy1iKmQqZik6XCJZWFpcIj09PWk/KGFbMF09YiplKmcrYypkKmYsYVsxXT1jKmQqZy1iKmUqZixhWzJdPWMqZSpmLWIqZCpnLGFbM109YyplKmcrYipkKmYpOlwiWlhZXCI9PT1pPyhhWzBdPWIqZSpnLWMqZCpmLGFbMV09YypkKmcrYiplKmYsYVsyXT1jKmUqZitiKmQqZyxhWzNdPWMqZSpnLWIqZCpmKTpcIlpZWFwiPT09aT8oYVswXT1iKmUqZy1jKmQqZixhWzFdPWMqZCpnK2IqZSpmLGFbMl09YyplKmYtYipkKmcsYVszXT1jKmUqZytiKmQqZik6XCJZWlhcIj09PWk/KGFbMF09YiplKmcrYypkKmYsYVsxXT1jKmQqZytiKmUqZixhWzJdPWMqZSpmLWIqZCpnLGFbM109YyplKmctYipkKmYpOlwiWFpZXCI9PT1pJiYoYVswXT1iKmUqZy1jKmQqZixhWzFdPWMqZCpnLWIqZSpmLGFbMl09YyplKmYrYipkKmcsYVszXT1jKmUqZytiKmQqZil9KHRoaXMsYSxhLm9yZGVyKSx0aGlzfWZyb21BeGlzQW5nbGUoZSxmKXt2YXIgYSxiLGQ7bGV0IGM7cmV0dXJuIGE9dGhpcyxiPWUsZD1mLGM9TWF0aC5zaW4oZCo9LjUpLGFbMF09YypiWzBdLGFbMV09YypiWzFdLGFbMl09YypiWzJdLGFbM109TWF0aC5jb3MoZCksdGhpc31zbGVycChyLHMpe3ZhciBjLGQsZSxmO2xldCBsLGcsbSxhLGIsbixvLHAscSxoLGksaixrO3JldHVybiBjPXRoaXMsZD10aGlzLGU9cixmPXMsbj1kWzBdLG89ZFsxXSxwPWRbMl0scT1kWzNdLGg9ZVswXSxpPWVbMV0saj1lWzJdLGs9ZVszXSwoZz1uKmgrbyppK3AqaitxKmspPDAmJihnPS1nLGg9LWgsaT0taSxqPS1qLGs9LWspLDEtZz4xZS02PyhsPU1hdGguYWNvcyhnKSxtPU1hdGguc2luKGwpLGE9TWF0aC5zaW4oKDEtZikqbCkvbSxiPU1hdGguc2luKGYqbCkvbSk6KGE9MS1mLGI9ZiksY1swXT1hKm4rYipoLGNbMV09YSpvK2IqaSxjWzJdPWEqcCtiKmosY1szXT1hKnErYiprLHRoaXN9ZnJvbUFycmF5KGEsYj0wKXtyZXR1cm4gdGhpc1swXT1hW2JdLHRoaXNbMV09YVtiKzFdLHRoaXNbMl09YVtiKzJdLHRoaXNbM109YVtiKzNdLHRoaXN9dG9BcnJheShhPVtdLGI9MCl7cmV0dXJuIGFbYl09dGhpc1swXSxhW2IrMV09dGhpc1sxXSxhW2IrMl09dGhpc1syXSxhW2IrM109dGhpc1szXSxhfX1mdW5jdGlvbiBPKGUsZixnKXtsZXQgaD1mWzBdLGk9ZlsxXSxqPWZbMl0saz1mWzNdLGw9Zls0XSxtPWZbNV0sbj1mWzZdLG89Zls3XSxwPWZbOF0scT1mWzldLHI9ZlsxMF0scz1mWzExXSx0PWZbMTJdLHU9ZlsxM10sdj1mWzE0XSx3PWZbMTVdLGE9Z1swXSxiPWdbMV0sYz1nWzJdLGQ9Z1szXTtyZXR1cm4gZVswXT1hKmgrYipsK2MqcCtkKnQsZVsxXT1hKmkrYiptK2MqcStkKnUsZVsyXT1hKmorYipuK2MqcitkKnYsZVszXT1hKmsrYipvK2MqcytkKncsYT1nWzRdLGI9Z1s1XSxjPWdbNl0sZD1nWzddLGVbNF09YSpoK2IqbCtjKnArZCp0LGVbNV09YSppK2IqbStjKnErZCp1LGVbNl09YSpqK2IqbitjKnIrZCp2LGVbN109YSprK2IqbytjKnMrZCp3LGE9Z1s4XSxiPWdbOV0sYz1nWzEwXSxkPWdbMTFdLGVbOF09YSpoK2IqbCtjKnArZCp0LGVbOV09YSppK2IqbStjKnErZCp1LGVbMTBdPWEqaitiKm4rYypyK2QqdixlWzExXT1hKmsrYipvK2MqcytkKncsYT1nWzEyXSxiPWdbMTNdLGM9Z1sxNF0sZD1nWzE1XSxlWzEyXT1hKmgrYipsK2MqcCtkKnQsZVsxM109YSppK2IqbStjKnErZCp1LGVbMTRdPWEqaitiKm4rYypyK2QqdixlWzE1XT1hKmsrYipvK2MqcytkKncsZX1jbGFzcyBjIGV4dGVuZHMgQXJyYXl7Y29uc3RydWN0b3IoYT0xLGI9MCxjPTAsZD0wLGU9MCxmPTEsZz0wLGg9MCxpPTAsaj0wLGs9MSxsPTAsbT0wLG49MCxvPTAscD0xKXtyZXR1cm4gc3VwZXIoYSxiLGMsZCxlLGYsZyxoLGksaixrLGwsbSxuLG8scCksdGhpc31zZXQgeChhKXt0aGlzWzEyXT1hfWdldCB4KCl7cmV0dXJuIHRoaXNbMTJdfXNldCB5KGEpe3RoaXNbMTNdPWF9Z2V0IHkoKXtyZXR1cm4gdGhpc1sxM119c2V0IHooYSl7dGhpc1sxNF09YX1nZXQgeigpe3JldHVybiB0aGlzWzE0XX1zZXQgdyhhKXt0aGlzWzE1XT1hfWdldCB3KCl7cmV0dXJuIHRoaXNbMTVdfXNldChiLHMsdCx1LHYsdyx4LHkseixBLEIsQyxELEUsRixHKXt2YXIgYSxjLGQsZSxmLGcsaCxpLGosayxsLG0sbixvLHAscSxyO3JldHVybiBiLmxlbmd0aD90aGlzLmNvcHkoYik6KGE9dGhpcyxjPWIsZD1zLGU9dCxmPXUsZz12LGg9dyxpPXgsaj15LGs9eixsPUEsbT1CLG49QyxvPUQscD1FLHE9RixyPUcsYVswXT1jLGFbMV09ZCxhWzJdPWUsYVszXT1mLGFbNF09ZyxhWzVdPWgsYVs2XT1pLGFbN109aixhWzhdPWssYVs5XT1sLGFbMTBdPW0sYVsxMV09bixhWzEyXT1vLGFbMTNdPXAsYVsxNF09cSxhWzE1XT1yLHRoaXMpfXRyYW5zbGF0ZShzLHQ9dGhpcyl7dmFyIGIsYSxmO2xldCBnLGgsaSxqLGssbCxtLG4sbyxwLHEscixjLGQsZTtyZXR1cm4gYj10aGlzLGE9dCxjPShmPXMpWzBdLGQ9ZlsxXSxlPWZbMl0sYT09PWI/KGJbMTJdPWFbMF0qYythWzRdKmQrYVs4XSplK2FbMTJdLGJbMTNdPWFbMV0qYythWzVdKmQrYVs5XSplK2FbMTNdLGJbMTRdPWFbMl0qYythWzZdKmQrYVsxMF0qZSthWzE0XSxiWzE1XT1hWzNdKmMrYVs3XSpkK2FbMTFdKmUrYVsxNV0pOihnPWFbMF0saD1hWzFdLGk9YVsyXSxqPWFbM10saz1hWzRdLGw9YVs1XSxtPWFbNl0sbj1hWzddLG89YVs4XSxwPWFbOV0scT1hWzEwXSxyPWFbMTFdLGJbMF09ZyxiWzFdPWgsYlsyXT1pLGJbM109aixiWzRdPWssYls1XT1sLGJbNl09bSxiWzddPW4sYls4XT1vLGJbOV09cCxiWzEwXT1xLGJbMTFdPXIsYlsxMl09ZypjK2sqZCtvKmUrYVsxMl0sYlsxM109aCpjK2wqZCtwKmUrYVsxM10sYlsxNF09aSpjK20qZCtxKmUrYVsxNF0sYlsxNV09aipjK24qZCtyKmUrYVsxNV0pLHRoaXN9cm90YXRlWChuLG89dGhpcyl7dmFyIGEsYixtO2xldCBjLGQsZSxmLGcsaCxpLGosayxsO3JldHVybiBhPXRoaXMsYj1vLGM9TWF0aC5zaW4obT1uKSxkPU1hdGguY29zKG0pLGU9Yls0XSxmPWJbNV0sZz1iWzZdLGg9Yls3XSxpPWJbOF0saj1iWzldLGs9YlsxMF0sbD1iWzExXSxiIT09YSYmKGFbMF09YlswXSxhWzFdPWJbMV0sYVsyXT1iWzJdLGFbM109YlszXSxhWzEyXT1iWzEyXSxhWzEzXT1iWzEzXSxhWzE0XT1iWzE0XSxhWzE1XT1iWzE1XSksYVs0XT1lKmQraSpjLGFbNV09ZipkK2oqYyxhWzZdPWcqZCtrKmMsYVs3XT1oKmQrbCpjLGFbOF09aSpkLWUqYyxhWzldPWoqZC1mKmMsYVsxMF09aypkLWcqYyxhWzExXT1sKmQtaCpjLHRoaXN9cm90YXRlWShuLG89dGhpcyl7dmFyIGEsYixtO2xldCBjLGQsZSxmLGcsaCxpLGosayxsO3JldHVybiBhPXRoaXMsYj1vLGM9TWF0aC5zaW4obT1uKSxkPU1hdGguY29zKG0pLGU9YlswXSxmPWJbMV0sZz1iWzJdLGg9YlszXSxpPWJbOF0saj1iWzldLGs9YlsxMF0sbD1iWzExXSxiIT09YSYmKGFbNF09Yls0XSxhWzVdPWJbNV0sYVs2XT1iWzZdLGFbN109Yls3XSxhWzEyXT1iWzEyXSxhWzEzXT1iWzEzXSxhWzE0XT1iWzE0XSxhWzE1XT1iWzE1XSksYVswXT1lKmQtaSpjLGFbMV09ZipkLWoqYyxhWzJdPWcqZC1rKmMsYVszXT1oKmQtbCpjLGFbOF09ZSpjK2kqZCxhWzldPWYqYytqKmQsYVsxMF09ZypjK2sqZCxhWzExXT1oKmMrbCpkLHRoaXN9cm90YXRlWihuLG89dGhpcyl7dmFyIGEsYixtO2xldCBjLGQsZSxmLGcsaCxpLGosayxsO3JldHVybiBhPXRoaXMsYj1vLGM9TWF0aC5zaW4obT1uKSxkPU1hdGguY29zKG0pLGU9YlswXSxmPWJbMV0sZz1iWzJdLGg9YlszXSxpPWJbNF0saj1iWzVdLGs9Yls2XSxsPWJbN10sYiE9PWEmJihhWzhdPWJbOF0sYVs5XT1iWzldLGFbMTBdPWJbMTBdLGFbMTFdPWJbMTFdLGFbMTJdPWJbMTJdLGFbMTNdPWJbMTNdLGFbMTRdPWJbMTRdLGFbMTVdPWJbMTVdKSxhWzBdPWUqZCtpKmMsYVsxXT1mKmQraipjLGFbMl09ZypkK2sqYyxhWzNdPWgqZCtsKmMsYVs0XT1pKmQtZSpjLGFbNV09aipkLWYqYyxhWzZdPWsqZC1nKmMsYVs3XT1sKmQtaCpjLHRoaXN9c2NhbGUoYyxoPXRoaXMpe3ZhciBhLGIsZztsZXQgZCxlLGY7cmV0dXJuIGE9dGhpcyxiPWgsZD0oZz1cIm51bWJlclwiPT10eXBlb2YgYz9bYyxjLGNdOmMpWzBdLGU9Z1sxXSxmPWdbMl0sYVswXT1iWzBdKmQsYVsxXT1iWzFdKmQsYVsyXT1iWzJdKmQsYVszXT1iWzNdKmQsYVs0XT1iWzRdKmUsYVs1XT1iWzVdKmUsYVs2XT1iWzZdKmUsYVs3XT1iWzddKmUsYVs4XT1iWzhdKmYsYVs5XT1iWzldKmYsYVsxMF09YlsxMF0qZixhWzExXT1iWzExXSpmLGFbMTJdPWJbMTJdLGFbMTNdPWJbMTNdLGFbMTRdPWJbMTRdLGFbMTVdPWJbMTVdLHRoaXN9bXVsdGlwbHkoYSxiKXtyZXR1cm4gYj9PKHRoaXMsYSxiKTpPKHRoaXMsdGhpcyxhKSx0aGlzfWlkZW50aXR5KCl7dmFyIGE7cmV0dXJuKGE9dGhpcylbMF09MSxhWzFdPTAsYVsyXT0wLGFbM109MCxhWzRdPTAsYVs1XT0xLGFbNl09MCxhWzddPTAsYVs4XT0wLGFbOV09MCxhWzEwXT0xLGFbMTFdPTAsYVsxMl09MCxhWzEzXT0wLGFbMTRdPTAsYVsxNV09MSx0aGlzfWNvcHkoYyl7dmFyIGIsYTtyZXR1cm4gYT1jLChiPXRoaXMpWzBdPWFbMF0sYlsxXT1hWzFdLGJbMl09YVsyXSxiWzNdPWFbM10sYls0XT1hWzRdLGJbNV09YVs1XSxiWzZdPWFbNl0sYls3XT1hWzddLGJbOF09YVs4XSxiWzldPWFbOV0sYlsxMF09YVsxMF0sYlsxMV09YVsxMV0sYlsxMl09YVsxMl0sYlsxM109YVsxM10sYlsxNF09YVsxNF0sYlsxNV09YVsxNV0sdGhpc31mcm9tUGVyc3BlY3RpdmUoe2ZvdjpoLGFzcGVjdDppLG5lYXI6aixmYXI6a309e30pe3ZhciBhLGYsZyxiLGM7bGV0IGQsZTtyZXR1cm4gYT10aGlzLGY9aCxnPWksYj1qLGM9ayxkPTEvTWF0aC50YW4oZi8yKSxlPTEvKGItYyksYVswXT1kL2csYVsxXT0wLGFbMl09MCxhWzNdPTAsYVs0XT0wLGFbNV09ZCxhWzZdPTAsYVs3XT0wLGFbOF09MCxhWzldPTAsYVsxMF09KGMrYikqZSxhWzExXT0tMSxhWzEyXT0wLGFbMTNdPTAsYVsxNF09MipjKmIqZSxhWzE1XT0wLHRoaXN9ZnJvbU9ydGhvZ29uYWwoe2xlZnQ6ayxyaWdodDpsLGJvdHRvbTptLHRvcDpuLG5lYXI6byxmYXI6cH0pe3ZhciBhLGIsYyxkLGUsZixnO2xldCBoLGksajtyZXR1cm4gYT10aGlzLGI9ayxjPWwsZD1tLGU9bixmPW8sZz1wLGg9MS8oYi1jKSxpPTEvKGQtZSksaj0xLyhmLWcpLGFbMF09LTIqaCxhWzFdPTAsYVsyXT0wLGFbM109MCxhWzRdPTAsYVs1XT0tMippLGFbNl09MCxhWzddPTAsYVs4XT0wLGFbOV09MCxhWzEwXT0yKmosYVsxMV09MCxhWzEyXT0oYitjKSpoLGFbMTNdPShlK2QpKmksYVsxNF09KGcrZikqaixhWzE1XT0xLHRoaXN9ZnJvbVF1YXRlcm5pb24ocyl7dmFyIGEsZTtsZXQgZixjLGIsZyxkLGgsaSxqLGssbCxtLG4sbyxwLHEscjtyZXR1cm4gYT10aGlzLGY9KGU9cylbMF0sYz1lWzFdLGI9ZVsyXSxnPWVbM10sZD1mK2YsaD1jK2MsaT1iK2Isaj1mKmQsaz1jKmQsbD1jKmgsbT1iKmQsbj1iKmgsbz1iKmkscD1nKmQscT1nKmgscj1nKmksYVswXT0xLWwtbyxhWzFdPWsrcixhWzJdPW0tcSxhWzNdPTAsYVs0XT1rLXIsYVs1XT0xLWotbyxhWzZdPW4rcCxhWzddPTAsYVs4XT1tK3EsYVs5XT1uLXAsYVsxMF09MS1qLWwsYVsxMV09MCxhWzEyXT0wLGFbMTNdPTAsYVsxNF09MCxhWzE1XT0xLHRoaXN9c2V0UG9zaXRpb24oYSl7cmV0dXJuIHRoaXMueD1hWzBdLHRoaXMueT1hWzFdLHRoaXMuej1hWzJdLHRoaXN9aW52ZXJzZShFPXRoaXMpe3ZhciBiLGM7bGV0IGQsZSxmLGcsaCxpLGosayxsLG0sbixvLHAscSxyLHMsdCx1LHYsdyx4LHkseixBLEIsXyxDLEQsYTtyZXR1cm4gYj10aGlzLGQ9KGM9RSlbMF0sZT1jWzFdLGY9Y1syXSxnPWNbM10saD1jWzRdLGk9Y1s1XSxqPWNbNl0saz1jWzddLGw9Y1s4XSxtPWNbOV0sbj1jWzEwXSxvPWNbMTFdLHA9Y1sxMl0scT1jWzEzXSxyPWNbMTRdLHM9Y1sxNV0sdD1kKmktZSpoLHU9ZCpqLWYqaCx2PWQqay1nKmgsdz1lKmotZippLHg9ZSprLWcqaSx5PWYqay1nKmosej1sKnEtbSpwLEE9bCpyLW4qcCxCPWwqcy1vKnAsXz1tKnItbipxLEM9bSpzLW8qcSxEPW4qcy1vKnIsYT10KkQtdSpDK3YqXyt3KkIteCpBK3kqeixhJiYoYT0xL2EsYlswXT0oaSpELWoqQytrKl8pKmEsYlsxXT0oZipDLWUqRC1nKl8pKmEsYlsyXT0ocSp5LXIqeCtzKncpKmEsYlszXT0obip4LW0qeS1vKncpKmEsYls0XT0oaipCLWgqRC1rKkEpKmEsYls1XT0oZCpELWYqQitnKkEpKmEsYls2XT0ocip2LXAqeS1zKnUpKmEsYls3XT0obCp5LW4qditvKnUpKmEsYls4XT0oaCpDLWkqQitrKnopKmEsYls5XT0oZSpCLWQqQy1nKnopKmEsYlsxMF09KHAqeC1xKnYrcyp0KSphLGJbMTFdPShtKnYtbCp4LW8qdCkqYSxiWzEyXT0oaSpBLWgqXy1qKnopKmEsYlsxM109KGQqXy1lKkErZip6KSphLGJbMTRdPShxKnUtcCp3LXIqdCkqYSxiWzE1XT0obCp3LW0qdStuKnQpKmEpLHRoaXN9Y29tcG9zZSh4LHkseil7dmFyIGEsYyxmLGc7bGV0IGIsZCxoLGksbixqLGUsbyxwLHEscixzLHQsdSx2LHcsayxsLG07cmV0dXJuIGE9dGhpcyxjPXgsZj15LGc9eixiPWNbMF0sZD1jWzFdLGg9Y1syXSxpPWNbM10sbj1iK2Isaj1kK2QsZT1oK2gsbz1iKm4scD1iKmoscT1iKmUscj1kKmoscz1kKmUsdD1oKmUsdT1pKm4sdj1pKmosdz1pKmUsaz1nWzBdLGw9Z1sxXSxtPWdbMl0sYVswXT0oMS0ocit0KSkqayxhWzFdPShwK3cpKmssYVsyXT0ocS12KSprLGFbM109MCxhWzRdPShwLXcpKmwsYVs1XT0oMS0obyt0KSkqbCxhWzZdPShzK3UpKmwsYVs3XT0wLGFbOF09KHErdikqbSxhWzldPShzLXUpKm0sYVsxMF09KDEtKG8rcikpKm0sYVsxMV09MCxhWzEyXT1mWzBdLGFbMTNdPWZbMV0sYVsxNF09ZlsyXSxhWzE1XT0xLHRoaXN9Z2V0Um90YXRpb24oZSl7dmFyIGMsYTtsZXQgZCxiO3JldHVybiBjPWUsYT10aGlzLGQ9YVswXSthWzVdK2FbMTBdLGI9MCxkPjA/KGI9MipNYXRoLnNxcnQoZCsxKSxjWzNdPS4yNSpiLGNbMF09KGFbNl0tYVs5XSkvYixjWzFdPShhWzhdLWFbMl0pL2IsY1syXT0oYVsxXS1hWzRdKS9iKTphWzBdPmFbNV0mJmFbMF0+YVsxMF0/KGI9MipNYXRoLnNxcnQoMSthWzBdLWFbNV0tYVsxMF0pLGNbM109KGFbNl0tYVs5XSkvYixjWzBdPS4yNSpiLGNbMV09KGFbMV0rYVs0XSkvYixjWzJdPShhWzhdK2FbMl0pL2IpOmFbNV0+YVsxMF0/KGI9MipNYXRoLnNxcnQoMSthWzVdLWFbMF0tYVsxMF0pLGNbM109KGFbOF0tYVsyXSkvYixjWzBdPShhWzFdK2FbNF0pL2IsY1sxXT0uMjUqYixjWzJdPShhWzZdK2FbOV0pL2IpOihiPTIqTWF0aC5zcXJ0KDErYVsxMF0tYVswXS1hWzVdKSxjWzNdPShhWzFdLWFbNF0pL2IsY1swXT0oYVs4XSthWzJdKS9iLGNbMV09KGFbNl0rYVs5XSkvYixjWzJdPS4yNSpiKSx0aGlzfWdldFRyYW5zbGF0aW9uKGMpe3ZhciBiLGE7cmV0dXJuIGE9dGhpcywoYj1jKVswXT1hWzEyXSxiWzFdPWFbMTNdLGJbMl09YVsxNF0sdGhpc31nZXRTY2FsaW5nKGwpe3ZhciBiLGE7bGV0IGMsZCxlLGYsZyxoLGksaixrO3JldHVybiBiPWwsYT10aGlzLGM9YVswXSxkPWFbMV0sZT1hWzJdLGY9YVs0XSxnPWFbNV0saD1hWzZdLGk9YVs4XSxqPWFbOV0saz1hWzEwXSxiWzBdPU1hdGguc3FydChjKmMrZCpkK2UqZSksYlsxXT1NYXRoLnNxcnQoZipmK2cqZytoKmgpLGJbMl09TWF0aC5zcXJ0KGkqaStqKmorayprKSx0aGlzfWdldE1heFNjYWxlT25BeGlzKCl7dmFyIGE7bGV0IGIsYyxkLGUsZixnLGgsaSxqO3JldHVybiBhPXRoaXMsYj1hWzBdLGM9YVsxXSxkPWFbMl0sZT1hWzRdLGY9YVs1XSxnPWFbNl0saD1hWzhdLGk9YVs5XSxqPWFbMTBdLE1hdGguc3FydChNYXRoLm1heChiKmIrYypjK2QqZCxlKmUrZipmK2cqZyxoKmgraSppK2oqaikpfWxvb2tBdChyLHMsdCl7dmFyIGEsaSxqLGs7bGV0IGwsbSxuLG8scCxxLGMsZCxlLGIsZixnLGg7cmV0dXJuIGE9dGhpcyxpPXIsaj1zLGs9dCxsPWlbMF0sbT1pWzFdLG49aVsyXSxvPWtbMF0scD1rWzFdLHE9a1syXSxjPWwtalswXSxkPW0talsxXSxlPW4talsyXSxiPWMqYytkKmQrZSplLGI+MCYmKGMqPWI9MS9NYXRoLnNxcnQoYiksZCo9YixlKj1iKSxmPXAqZS1xKmQsZz1xKmMtbyplLGg9bypkLXAqYywoYj1mKmYrZypnK2gqaCk+MCYmKGYqPWI9MS9NYXRoLnNxcnQoYiksZyo9YixoKj1iKSxhWzBdPWYsYVsxXT1nLGFbMl09aCxhWzNdPTAsYVs0XT1kKmgtZSpnLGFbNV09ZSpmLWMqaCxhWzZdPWMqZy1kKmYsYVs3XT0wLGFbOF09YyxhWzldPWQsYVsxMF09ZSxhWzExXT0wLGFbMTJdPWwsYVsxM109bSxhWzE0XT1uLGFbMTVdPTEsdGhpc31kZXRlcm1pbmFudCgpe3ZhciBhO2xldCBiLGMsZCxlLGYsZyxoLGksaixrLGwsbSxuLG8scCxxO3JldHVybiBhPXRoaXMsYj1hWzBdLGM9YVsxXSxkPWFbMl0sZT1hWzNdLGY9YVs0XSxnPWFbNV0saD1hWzZdLGk9YVs3XSxqPWFbOF0saz1hWzldLGw9YVsxMF0sbT1hWzExXSxuPWFbMTJdLG89YVsxM10scD1hWzE0XSxxPWFbMTVdLChiKmctYypmKSoobCpxLW0qcCktKGIqaC1kKmYpKihrKnEtbSpvKSsoYippLWUqZikqKGsqcC1sKm8pKyhjKmgtZCpnKSooaipxLW0qbiktKGMqaS1lKmcpKihqKnAtbCpuKSsoZCppLWUqaCkqKGoqby1rKm4pfX1sZXQgUD1uZXcgYztjbGFzcyBsIGV4dGVuZHMgQXJyYXl7Y29uc3RydWN0b3IoYT0wLGI9YSxjPWEsZD1cIllYWlwiKXtyZXR1cm4gc3VwZXIoYSxiLGMpLHRoaXMub3JkZXI9ZCx0aGlzLm9uQ2hhbmdlPSgpPT57fSx0aGlzfWdldCB4KCl7cmV0dXJuIHRoaXNbMF19c2V0IHgoYSl7dGhpc1swXT1hLHRoaXMub25DaGFuZ2UoKX1nZXQgeSgpe3JldHVybiB0aGlzWzFdfXNldCB5KGEpe3RoaXNbMV09YSx0aGlzLm9uQ2hhbmdlKCl9Z2V0IHooKXtyZXR1cm4gdGhpc1syXX1zZXQgeihhKXt0aGlzWzJdPWEsdGhpcy5vbkNoYW5nZSgpfXNldChhLGI9YSxjPWEpe3JldHVybiBhLmxlbmd0aD90aGlzLmNvcHkoYSk6KHRoaXNbMF09YSx0aGlzWzFdPWIsdGhpc1syXT1jLHRoaXMub25DaGFuZ2UoKSx0aGlzKX1jb3B5KGEpe3JldHVybiB0aGlzWzBdPWFbMF0sdGhpc1sxXT1hWzFdLHRoaXNbMl09YVsyXSx0aGlzfXJlb3JkZXIoYSl7cmV0dXJuIHRoaXMub3JkZXI9YSx0aGlzLm9uQ2hhbmdlKCksdGhpc31mcm9tUm90YXRpb25NYXRyaXgoYSxiPXRoaXMub3JkZXIpe3JldHVybiBmdW5jdGlvbihiLGEsYz1cIllYWlwiKXtcIlhZWlwiPT09Yz8oYlsxXT1NYXRoLmFzaW4oTWF0aC5taW4oTWF0aC5tYXgoYVs4XSwtMSksMSkpLC45OTk5OT5NYXRoLmFicyhhWzhdKT8oYlswXT1NYXRoLmF0YW4yKC1hWzldLGFbMTBdKSxiWzJdPU1hdGguYXRhbjIoLWFbNF0sYVswXSkpOihiWzBdPU1hdGguYXRhbjIoYVs2XSxhWzVdKSxiWzJdPTApKTpcIllYWlwiPT09Yz8oYlswXT1NYXRoLmFzaW4oLU1hdGgubWluKE1hdGgubWF4KGFbOV0sLTEpLDEpKSwuOTk5OTk+TWF0aC5hYnMoYVs5XSk/KGJbMV09TWF0aC5hdGFuMihhWzhdLGFbMTBdKSxiWzJdPU1hdGguYXRhbjIoYVsxXSxhWzVdKSk6KGJbMV09TWF0aC5hdGFuMigtYVsyXSxhWzBdKSxiWzJdPTApKTpcIlpYWVwiPT09Yz8oYlswXT1NYXRoLmFzaW4oTWF0aC5taW4oTWF0aC5tYXgoYVs2XSwtMSksMSkpLC45OTk5OT5NYXRoLmFicyhhWzZdKT8oYlsxXT1NYXRoLmF0YW4yKC1hWzJdLGFbMTBdKSxiWzJdPU1hdGguYXRhbjIoLWFbNF0sYVs1XSkpOihiWzFdPTAsYlsyXT1NYXRoLmF0YW4yKGFbMV0sYVswXSkpKTpcIlpZWFwiPT09Yz8oYlsxXT1NYXRoLmFzaW4oLU1hdGgubWluKE1hdGgubWF4KGFbMl0sLTEpLDEpKSwuOTk5OTk+TWF0aC5hYnMoYVsyXSk/KGJbMF09TWF0aC5hdGFuMihhWzZdLGFbMTBdKSxiWzJdPU1hdGguYXRhbjIoYVsxXSxhWzBdKSk6KGJbMF09MCxiWzJdPU1hdGguYXRhbjIoLWFbNF0sYVs1XSkpKTpcIllaWFwiPT09Yz8oYlsyXT1NYXRoLmFzaW4oTWF0aC5taW4oTWF0aC5tYXgoYVsxXSwtMSksMSkpLC45OTk5OT5NYXRoLmFicyhhWzFdKT8oYlswXT1NYXRoLmF0YW4yKC1hWzldLGFbNV0pLGJbMV09TWF0aC5hdGFuMigtYVsyXSxhWzBdKSk6KGJbMF09MCxiWzFdPU1hdGguYXRhbjIoYVs4XSxhWzEwXSkpKTpcIlhaWVwiPT09YyYmKGJbMl09TWF0aC5hc2luKC1NYXRoLm1pbihNYXRoLm1heChhWzRdLC0xKSwxKSksLjk5OTk5Pk1hdGguYWJzKGFbNF0pPyhiWzBdPU1hdGguYXRhbjIoYVs2XSxhWzVdKSxiWzFdPU1hdGguYXRhbjIoYVs4XSxhWzBdKSk6KGJbMF09TWF0aC5hdGFuMigtYVs5XSxhWzEwXSksYlsxXT0wKSl9KHRoaXMsYSxiKSx0aGlzfWZyb21RdWF0ZXJuaW9uKGEsYj10aGlzLm9yZGVyKXtyZXR1cm4gUC5mcm9tUXVhdGVybmlvbihhKSx0aGlzLmZyb21Sb3RhdGlvbk1hdHJpeChQLGIpfX1jbGFzcyBne2NvbnN0cnVjdG9yKCl7dGhpcy5wYXJlbnQ9bnVsbCx0aGlzLmNoaWxkcmVuPVtdLHRoaXMudmlzaWJsZT0hMCx0aGlzLm1hdHJpeD1uZXcgYyx0aGlzLndvcmxkTWF0cml4PW5ldyBjLHRoaXMubWF0cml4QXV0b1VwZGF0ZT0hMCx0aGlzLnBvc2l0aW9uPW5ldyBiLHRoaXMucXVhdGVybmlvbj1uZXcgZCx0aGlzLnNjYWxlPW5ldyBiKDEpLHRoaXMucm90YXRpb249bmV3IGwsdGhpcy51cD1uZXcgYigwLDEsMCksdGhpcy5yb3RhdGlvbi5vbkNoYW5nZT0oKT0+dGhpcy5xdWF0ZXJuaW9uLmZyb21FdWxlcih0aGlzLnJvdGF0aW9uKSx0aGlzLnF1YXRlcm5pb24ub25DaGFuZ2U9KCk9PnRoaXMucm90YXRpb24uZnJvbVF1YXRlcm5pb24odGhpcy5xdWF0ZXJuaW9uKX1zZXRQYXJlbnQoYSxiPSEwKXtiJiZ0aGlzLnBhcmVudCYmYSE9PXRoaXMucGFyZW50JiZ0aGlzLnBhcmVudC5yZW1vdmVDaGlsZCh0aGlzLCExKSx0aGlzLnBhcmVudD1hLGImJmEmJmEuYWRkQ2hpbGQodGhpcywhMSl9YWRkQ2hpbGQoYSxiPSEwKXt+dGhpcy5jaGlsZHJlbi5pbmRleE9mKGEpfHx0aGlzLmNoaWxkcmVuLnB1c2goYSksYiYmYS5zZXRQYXJlbnQodGhpcywhMSl9cmVtb3ZlQ2hpbGQoYSxiPSEwKXt+dGhpcy5jaGlsZHJlbi5pbmRleE9mKGEpJiZ0aGlzLmNoaWxkcmVuLnNwbGljZSh0aGlzLmNoaWxkcmVuLmluZGV4T2YoYSksMSksYiYmYS5zZXRQYXJlbnQobnVsbCwhMSl9dXBkYXRlTWF0cml4V29ybGQoYSl7dGhpcy5tYXRyaXhBdXRvVXBkYXRlJiZ0aGlzLnVwZGF0ZU1hdHJpeCgpLCh0aGlzLndvcmxkTWF0cml4TmVlZHNVcGRhdGV8fGEpJiYobnVsbD09PXRoaXMucGFyZW50P3RoaXMud29ybGRNYXRyaXguY29weSh0aGlzLm1hdHJpeCk6dGhpcy53b3JsZE1hdHJpeC5tdWx0aXBseSh0aGlzLnBhcmVudC53b3JsZE1hdHJpeCx0aGlzLm1hdHJpeCksdGhpcy53b3JsZE1hdHJpeE5lZWRzVXBkYXRlPSExLGE9ITApO2ZvcihsZXQgYj0wLGM9dGhpcy5jaGlsZHJlbi5sZW5ndGg7YjxjO2IrKyl0aGlzLmNoaWxkcmVuW2JdLnVwZGF0ZU1hdHJpeFdvcmxkKGEpfXVwZGF0ZU1hdHJpeCgpe3RoaXMubWF0cml4LmNvbXBvc2UodGhpcy5xdWF0ZXJuaW9uLHRoaXMucG9zaXRpb24sdGhpcy5zY2FsZSksdGhpcy53b3JsZE1hdHJpeE5lZWRzVXBkYXRlPSEwfXRyYXZlcnNlKGIpe2lmKCFiKHRoaXMpKWZvcihsZXQgYT0wLGM9dGhpcy5jaGlsZHJlbi5sZW5ndGg7YTxjO2ErKyl0aGlzLmNoaWxkcmVuW2FdLnRyYXZlcnNlKGIpfWRlY29tcG9zZSgpe3RoaXMubWF0cml4LmdldFRyYW5zbGF0aW9uKHRoaXMucG9zaXRpb24pLHRoaXMubWF0cml4LmdldFJvdGF0aW9uKHRoaXMucXVhdGVybmlvbiksdGhpcy5tYXRyaXguZ2V0U2NhbGluZyh0aGlzLnNjYWxlKSx0aGlzLnJvdGF0aW9uLmZyb21RdWF0ZXJuaW9uKHRoaXMucXVhdGVybmlvbil9bG9va0F0KGEsYj0hMSl7Yj90aGlzLm1hdHJpeC5sb29rQXQodGhpcy5wb3NpdGlvbixhLHRoaXMudXApOnRoaXMubWF0cml4Lmxvb2tBdChhLHRoaXMucG9zaXRpb24sdGhpcy51cCksdGhpcy5tYXRyaXguZ2V0Um90YXRpb24odGhpcy5xdWF0ZXJuaW9uKSx0aGlzLnJvdGF0aW9uLmZyb21RdWF0ZXJuaW9uKHRoaXMucXVhdGVybmlvbil9fWxldCBRPW5ldyBjLFI9bmV3IGIsUz1uZXcgYjtmdW5jdGlvbiBUKGEsYixjKXtsZXQgZD1iWzBdLGU9YlsxXSxmPWJbMl0sZz1iWzNdLGg9Yls0XSxpPWJbNV0saj1iWzZdLGs9Yls3XSxsPWJbOF0sbT1jWzBdLG49Y1sxXSxvPWNbMl0scD1jWzNdLHE9Y1s0XSxyPWNbNV0scz1jWzZdLHQ9Y1s3XSx1PWNbOF07cmV0dXJuIGFbMF09bSpkK24qZytvKmosYVsxXT1tKmUrbipoK28qayxhWzJdPW0qZituKmkrbypsLGFbM109cCpkK3EqZytyKmosYVs0XT1wKmUrcSpoK3IqayxhWzVdPXAqZitxKmkrcipsLGFbNl09cypkK3QqZyt1KmosYVs3XT1zKmUrdCpoK3UqayxhWzhdPXMqZit0KmkrdSpsLGF9Y2xhc3MgbSBleHRlbmRzIEFycmF5e2NvbnN0cnVjdG9yKGE9MSxiPTAsYz0wLGQ9MCxlPTEsZj0wLGc9MCxoPTAsaT0xKXtyZXR1cm4gc3VwZXIoYSxiLGMsZCxlLGYsZyxoLGkpLHRoaXN9c2V0KGIsbCxtLG4sbyxwLHEscixzKXt2YXIgYSxjLGQsZSxmLGcsaCxpLGosaztyZXR1cm4gYi5sZW5ndGg/dGhpcy5jb3B5KGIpOihhPXRoaXMsYz1iLGQ9bCxlPW0sZj1uLGc9byxoPXAsaT1xLGo9cixrPXMsYVswXT1jLGFbMV09ZCxhWzJdPWUsYVszXT1mLGFbNF09ZyxhWzVdPWgsYVs2XT1pLGFbN109aixhWzhdPWssdGhpcyl9dHJhbnNsYXRlKG8scD10aGlzKXt2YXIgYSxiLGU7bGV0IGYsZyxoLGksaixrLGwsbSxuLGMsZDtyZXR1cm4gYT10aGlzLGI9cCxlPW8sZj1iWzBdLGc9YlsxXSxoPWJbMl0saT1iWzNdLGo9Yls0XSxrPWJbNV0sbD1iWzZdLG09Yls3XSxuPWJbOF0sYz1lWzBdLGQ9ZVsxXSxhWzBdPWYsYVsxXT1nLGFbMl09aCxhWzNdPWksYVs0XT1qLGFbNV09ayxhWzZdPWMqZitkKmkrbCxhWzddPWMqZytkKmorbSxhWzhdPWMqaCtkKmsrbix0aGlzfXJvdGF0ZShvLHA9dGhpcyl7dmFyIGEsYixlO2xldCBmLGcsaCxpLGosayxsLG0sbixjLGQ7cmV0dXJuIGE9dGhpcyxiPXAsZT1vLGY9YlswXSxnPWJbMV0saD1iWzJdLGk9YlszXSxqPWJbNF0saz1iWzVdLGw9Yls2XSxtPWJbN10sbj1iWzhdLGM9TWF0aC5zaW4oZSksZD1NYXRoLmNvcyhlKSxhWzBdPWQqZitjKmksYVsxXT1kKmcrYypqLGFbMl09ZCpoK2MqayxhWzNdPWQqaS1jKmYsYVs0XT1kKmotYypnLGFbNV09ZCprLWMqaCxhWzZdPWwsYVs3XT1tLGFbOF09bix0aGlzfXNjYWxlKGYsZz10aGlzKXt2YXIgYSxiLGU7bGV0IGMsZDtyZXR1cm4gYT10aGlzLGI9ZyxjPShlPWYpWzBdLGQ9ZVsxXSxhWzBdPWMqYlswXSxhWzFdPWMqYlsxXSxhWzJdPWMqYlsyXSxhWzNdPWQqYlszXSxhWzRdPWQqYls0XSxhWzVdPWQqYls1XSxhWzZdPWJbNl0sYVs3XT1iWzddLGFbOF09Yls4XSx0aGlzfW11bHRpcGx5KGEsYil7cmV0dXJuIGI/VCh0aGlzLGEsYik6VCh0aGlzLHRoaXMsYSksdGhpc31pZGVudGl0eSgpe3ZhciBhO3JldHVybihhPXRoaXMpWzBdPTEsYVsxXT0wLGFbMl09MCxhWzNdPTAsYVs0XT0xLGFbNV09MCxhWzZdPTAsYVs3XT0wLGFbOF09MSx0aGlzfWNvcHkoYyl7dmFyIGIsYTtyZXR1cm4gYT1jLChiPXRoaXMpWzBdPWFbMF0sYlsxXT1hWzFdLGJbMl09YVsyXSxiWzNdPWFbM10sYls0XT1hWzRdLGJbNV09YVs1XSxiWzZdPWFbNl0sYls3XT1hWzddLGJbOF09YVs4XSx0aGlzfWZyb21NYXRyaXg0KGMpe3ZhciBiLGE7cmV0dXJuIGE9YywoYj10aGlzKVswXT1hWzBdLGJbMV09YVsxXSxiWzJdPWFbMl0sYlszXT1hWzRdLGJbNF09YVs1XSxiWzVdPWFbNl0sYls2XT1hWzhdLGJbN109YVs5XSxiWzhdPWFbMTBdLHRoaXN9ZnJvbVF1YXRlcm5pb24ocyl7dmFyIGEsZTtsZXQgZixjLGIsZyxkLGgsaSxqLGssbCxtLG4sbyxwLHEscjtyZXR1cm4gYT10aGlzLGY9KGU9cylbMF0sYz1lWzFdLGI9ZVsyXSxnPWVbM10sZD1mK2YsaD1jK2MsaT1iK2Isaj1mKmQsaz1jKmQsbD1jKmgsbT1iKmQsbj1iKmgsbz1iKmkscD1nKmQscT1nKmgscj1nKmksYVswXT0xLWwtbyxhWzNdPWstcixhWzZdPW0rcSxhWzFdPWsrcixhWzRdPTEtai1vLGFbN109bi1wLGFbMl09bS1xLGFbNV09bitwLGFbOF09MS1qLWwsdGhpc31mcm9tQmFzaXMoYSxiLGMpe3JldHVybiB0aGlzLnNldChhWzBdLGFbMV0sYVsyXSxiWzBdLGJbMV0sYlsyXSxjWzBdLGNbMV0sY1syXSksdGhpc31pbnZlcnNlKHA9dGhpcyl7dmFyIGIsYztsZXQgZCxlLGYsZyxoLGksaixrLGwsbSxuLG8sYTtyZXR1cm4gYj10aGlzLGQ9KGM9cClbMF0sZT1jWzFdLGY9Y1syXSxnPWNbM10saD1jWzRdLGk9Y1s1XSxqPWNbNl0saz1jWzddLGw9Y1s4XSxtPWwqaC1pKmssbj0tbCpnK2kqaixvPWsqZy1oKmosYT1kKm0rZSpuK2YqbyxhJiYoYT0xL2EsYlswXT1tKmEsYlsxXT0oLWwqZStmKmspKmEsYlsyXT0oaSplLWYqaCkqYSxiWzNdPW4qYSxiWzRdPShsKmQtZipqKSphLGJbNV09KC1pKmQrZipnKSphLGJbNl09byphLGJbN109KC1rKmQrZSpqKSphLGJbOF09KGgqZC1lKmcpKmEpLHRoaXN9Z2V0Tm9ybWFsTWF0cml4KEUpe3ZhciBjLGE7bGV0IGcsaCxpLGQsaixrLGwsZSxzLHQsdSx2LG0sbixvLGYsQixDLHcsRCx4LHkseixBLHAsXyxxLHIsYjtyZXR1cm4gYz10aGlzLGc9KGE9RSlbMF0saD1hWzFdLGk9YVsyXSxkPWFbM10saj1hWzRdLGs9YVs1XSxsPWFbNl0sZT1hWzddLHM9YVs4XSx0PWFbOV0sdT1hWzEwXSx2PWFbMTFdLG09YVsxMl0sbj1hWzEzXSxvPWFbMTRdLGY9YVsxNV0sQj1nKmstaCpqLEM9ZypsLWkqaix3PWcqZS1kKmosRD1oKmwtaSprLHg9aCplLWQqayx5PWkqZS1kKmwsej1zKm4tdCptLEE9cypvLXUqbSxwPXMqZi12Km0sXz10Km8tdSpuLHE9dCpmLXYqbixyPXUqZi12Km8sYj1CKnItQypxK3cqXytEKnAteCpBK3kqeixiJiYoYj0xL2IsY1swXT0oaypyLWwqcStlKl8pKmIsY1sxXT0obCpwLWoqci1lKkEpKmIsY1syXT0oaipxLWsqcCtlKnopKmIsY1szXT0oaSpxLWgqci1kKl8pKmIsY1s0XT0oZypyLWkqcCtkKkEpKmIsY1s1XT0oaCpwLWcqcS1kKnopKmIsY1s2XT0obip5LW8qeCtmKkQpKmIsY1s3XT0obyp3LW0qeS1mKkMpKmIsY1s4XT0obSp4LW4qdytmKkIpKmIpLHRoaXN9fWxldCBVPTA7Y2xhc3MgbiBleHRlbmRzIGd7Y29uc3RydWN0b3IoYSx7Z2VvbWV0cnk6Yixwcm9ncmFtOmQsbW9kZTplPWEuVFJJQU5HTEVTLGZydXN0dW1DdWxsZWQ6Zj0hMCxyZW5kZXJPcmRlcjpnPTB9PXt9KXtzdXBlcihhKSx0aGlzLmdsPWEsdGhpcy5pZD1VKyssdGhpcy5nZW9tZXRyeT1iLHRoaXMucHJvZ3JhbT1kLHRoaXMubW9kZT1lLHRoaXMuZnJ1c3R1bUN1bGxlZD1mLHRoaXMucmVuZGVyT3JkZXI9Zyx0aGlzLm1vZGVsVmlld01hdHJpeD1uZXcgYyx0aGlzLm5vcm1hbE1hdHJpeD1uZXcgbSx0aGlzLnByb2dyYW0udW5pZm9ybXMubW9kZWxNYXRyaXh8fE9iamVjdC5hc3NpZ24odGhpcy5wcm9ncmFtLnVuaWZvcm1zLHttb2RlbE1hdHJpeDp7dmFsdWU6bnVsbH0sdmlld01hdHJpeDp7dmFsdWU6bnVsbH0sbW9kZWxWaWV3TWF0cml4Ont2YWx1ZTpudWxsfSxub3JtYWxNYXRyaXg6e3ZhbHVlOm51bGx9LHByb2plY3Rpb25NYXRyaXg6e3ZhbHVlOm51bGx9LGNhbWVyYVBvc2l0aW9uOnt2YWx1ZTpudWxsfX0pfWRyYXcoe2NhbWVyYTphfT17fSl7dGhpcy5vbkJlZm9yZVJlbmRlciYmdGhpcy5vbkJlZm9yZVJlbmRlcih7bWVzaDp0aGlzLGNhbWVyYTphfSksYSYmKHRoaXMucHJvZ3JhbS51bmlmb3Jtcy5wcm9qZWN0aW9uTWF0cml4LnZhbHVlPWEucHJvamVjdGlvbk1hdHJpeCx0aGlzLnByb2dyYW0udW5pZm9ybXMuY2FtZXJhUG9zaXRpb24udmFsdWU9YS5wb3NpdGlvbix0aGlzLnByb2dyYW0udW5pZm9ybXMudmlld01hdHJpeC52YWx1ZT1hLnZpZXdNYXRyaXgsdGhpcy5tb2RlbFZpZXdNYXRyaXgubXVsdGlwbHkoYS52aWV3TWF0cml4LHRoaXMud29ybGRNYXRyaXgpLHRoaXMubm9ybWFsTWF0cml4LmdldE5vcm1hbE1hdHJpeCh0aGlzLm1vZGVsVmlld01hdHJpeCksdGhpcy5wcm9ncmFtLnVuaWZvcm1zLm1vZGVsTWF0cml4LnZhbHVlPXRoaXMud29ybGRNYXRyaXgsdGhpcy5wcm9ncmFtLnVuaWZvcm1zLm1vZGVsVmlld01hdHJpeC52YWx1ZT10aGlzLm1vZGVsVmlld01hdHJpeCx0aGlzLnByb2dyYW0udW5pZm9ybXMubm9ybWFsTWF0cml4LnZhbHVlPXRoaXMubm9ybWFsTWF0cml4KTtsZXQgYj10aGlzLnByb2dyYW0uY3VsbEZhY2UmJjA+dGhpcy53b3JsZE1hdHJpeC5kZXRlcm1pbmFudCgpO3RoaXMucHJvZ3JhbS51c2Uoe2ZsaXBGYWNlczpifSksdGhpcy5nZW9tZXRyeS5kcmF3KHttb2RlOnRoaXMubW9kZSxwcm9ncmFtOnRoaXMucHJvZ3JhbX0pLHRoaXMub25BZnRlclJlbmRlciYmdGhpcy5vbkFmdGVyUmVuZGVyKHttZXNoOnRoaXMsY2FtZXJhOmF9KX19bGV0IFY9bmV3IFVpbnQ4QXJyYXkoNCk7ZnVuY3Rpb24gVyhhKXtyZXR1cm4gMD09KGEmYS0xKX1sZXQgWD0wO2NsYXNzIG97Y29uc3RydWN0b3IoYSx7aW1hZ2U6ZSx0YXJnZXQ6Zj1hLlRFWFRVUkVfMkQsdHlwZTpnPWEuVU5TSUdORURfQllURSxmb3JtYXQ6Yj1hLlJHQkEsaW50ZXJuYWxGb3JtYXQ6aD1iLHdyYXBTOmk9YS5DTEFNUF9UT19FREdFLHdyYXBUOmo9YS5DTEFNUF9UT19FREdFLGdlbmVyYXRlTWlwbWFwczpjPSEwLG1pbkZpbHRlcjprPWM/YS5ORUFSRVNUX01JUE1BUF9MSU5FQVI6YS5MSU5FQVIsbWFnRmlsdGVyOmw9YS5MSU5FQVIscHJlbXVsdGlwbHlBbHBoYTptPSExLHVucGFja0FsaWdubWVudDpuPTQsZmxpcFk6bz0hMCxsZXZlbDpwPTAsd2lkdGg6ZCxoZWlnaHQ6cT1kfT17fSl7dGhpcy5nbD1hLHRoaXMuaWQ9WCsrLHRoaXMuaW1hZ2U9ZSx0aGlzLnRhcmdldD1mLHRoaXMudHlwZT1nLHRoaXMuZm9ybWF0PWIsdGhpcy5pbnRlcm5hbEZvcm1hdD1oLHRoaXMubWluRmlsdGVyPWssdGhpcy5tYWdGaWx0ZXI9bCx0aGlzLndyYXBTPWksdGhpcy53cmFwVD1qLHRoaXMuZ2VuZXJhdGVNaXBtYXBzPWMsdGhpcy5wcmVtdWx0aXBseUFscGhhPW0sdGhpcy51bnBhY2tBbGlnbm1lbnQ9bix0aGlzLmZsaXBZPW8sdGhpcy5sZXZlbD1wLHRoaXMud2lkdGg9ZCx0aGlzLmhlaWdodD1xLHRoaXMudGV4dHVyZT10aGlzLmdsLmNyZWF0ZVRleHR1cmUoKSx0aGlzLnN0b3JlPXtpbWFnZTpudWxsfSx0aGlzLmdsU3RhdGU9dGhpcy5nbC5yZW5kZXJlci5zdGF0ZSx0aGlzLnN0YXRlPXt9LHRoaXMuc3RhdGUubWluRmlsdGVyPXRoaXMuZ2wuTkVBUkVTVF9NSVBNQVBfTElORUFSLHRoaXMuc3RhdGUubWFnRmlsdGVyPXRoaXMuZ2wuTElORUFSLHRoaXMuc3RhdGUud3JhcFM9dGhpcy5nbC5SRVBFQVQsdGhpcy5zdGF0ZS53cmFwVD10aGlzLmdsLlJFUEVBVH1iaW5kKCl7dGhpcy5nbFN0YXRlLnRleHR1cmVVbml0c1t0aGlzLmdsU3RhdGUuYWN0aXZlVGV4dHVyZVVuaXRdIT09dGhpcy5pZCYmKHRoaXMuZ2wuYmluZFRleHR1cmUodGhpcy50YXJnZXQsdGhpcy50ZXh0dXJlKSx0aGlzLmdsU3RhdGUudGV4dHVyZVVuaXRzW3RoaXMuZ2xTdGF0ZS5hY3RpdmVUZXh0dXJlVW5pdF09dGhpcy5pZCl9dXBkYXRlKGE9MCl7bGV0IGI9ISh0aGlzLmltYWdlPT09dGhpcy5zdG9yZS5pbWFnZSYmIXRoaXMubmVlZHNVcGRhdGUpOyhifHx0aGlzLmdsU3RhdGUudGV4dHVyZVVuaXRzW2FdIT09dGhpcy5pZCkmJih0aGlzLmdsLnJlbmRlcmVyLmFjdGl2ZVRleHR1cmUoYSksdGhpcy5iaW5kKCkpLGImJih0aGlzLm5lZWRzVXBkYXRlPSExLHRoaXMuZmxpcFkhPT10aGlzLmdsU3RhdGUuZmxpcFkmJih0aGlzLmdsLnBpeGVsU3RvcmVpKHRoaXMuZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCx0aGlzLmZsaXBZKSx0aGlzLmdsU3RhdGUuZmxpcFk9dGhpcy5mbGlwWSksdGhpcy5wcmVtdWx0aXBseUFscGhhIT09dGhpcy5nbFN0YXRlLnByZW11bHRpcGx5QWxwaGEmJih0aGlzLmdsLnBpeGVsU3RvcmVpKHRoaXMuZ2wuVU5QQUNLX1BSRU1VTFRJUExZX0FMUEhBX1dFQkdMLHRoaXMucHJlbXVsdGlwbHlBbHBoYSksdGhpcy5nbFN0YXRlLnByZW11bHRpcGx5QWxwaGE9dGhpcy5wcmVtdWx0aXBseUFscGhhKSx0aGlzLnVucGFja0FsaWdubWVudCE9PXRoaXMuZ2xTdGF0ZS51bnBhY2tBbGlnbm1lbnQmJih0aGlzLmdsLnBpeGVsU3RvcmVpKHRoaXMuZ2wuVU5QQUNLX0FMSUdOTUVOVCx0aGlzLnVucGFja0FsaWdubWVudCksdGhpcy5nbFN0YXRlLnVucGFja0FsaWdubWVudD10aGlzLnVucGFja0FsaWdubWVudCksdGhpcy5taW5GaWx0ZXIhPT10aGlzLnN0YXRlLm1pbkZpbHRlciYmKHRoaXMuZ2wudGV4UGFyYW1ldGVyaSh0aGlzLnRhcmdldCx0aGlzLmdsLlRFWFRVUkVfTUlOX0ZJTFRFUix0aGlzLm1pbkZpbHRlciksdGhpcy5zdGF0ZS5taW5GaWx0ZXI9dGhpcy5taW5GaWx0ZXIpLHRoaXMubWFnRmlsdGVyIT09dGhpcy5zdGF0ZS5tYWdGaWx0ZXImJih0aGlzLmdsLnRleFBhcmFtZXRlcmkodGhpcy50YXJnZXQsdGhpcy5nbC5URVhUVVJFX01BR19GSUxURVIsdGhpcy5tYWdGaWx0ZXIpLHRoaXMuc3RhdGUubWFnRmlsdGVyPXRoaXMubWFnRmlsdGVyKSx0aGlzLndyYXBTIT09dGhpcy5zdGF0ZS53cmFwUyYmKHRoaXMuZ2wudGV4UGFyYW1ldGVyaSh0aGlzLnRhcmdldCx0aGlzLmdsLlRFWFRVUkVfV1JBUF9TLHRoaXMud3JhcFMpLHRoaXMuc3RhdGUud3JhcFM9dGhpcy53cmFwUyksdGhpcy53cmFwVCE9PXRoaXMuc3RhdGUud3JhcFQmJih0aGlzLmdsLnRleFBhcmFtZXRlcmkodGhpcy50YXJnZXQsdGhpcy5nbC5URVhUVVJFX1dSQVBfVCx0aGlzLndyYXBUKSx0aGlzLnN0YXRlLndyYXBUPXRoaXMud3JhcFQpLHRoaXMuaW1hZ2U/KHRoaXMuaW1hZ2Uud2lkdGgmJih0aGlzLndpZHRoPXRoaXMuaW1hZ2Uud2lkdGgsdGhpcy5oZWlnaHQ9dGhpcy5pbWFnZS5oZWlnaHQpLHRoaXMuZ2wucmVuZGVyZXIuaXNXZWJnbDJ8fEFycmF5QnVmZmVyLmlzVmlldyh0aGlzLmltYWdlKT90aGlzLmdsLnRleEltYWdlMkQodGhpcy50YXJnZXQsdGhpcy5sZXZlbCx0aGlzLmludGVybmFsRm9ybWF0LHRoaXMud2lkdGgsdGhpcy5oZWlnaHQsMCx0aGlzLmZvcm1hdCx0aGlzLnR5cGUsdGhpcy5pbWFnZSk6dGhpcy5nbC50ZXhJbWFnZTJEKHRoaXMudGFyZ2V0LHRoaXMubGV2ZWwsdGhpcy5pbnRlcm5hbEZvcm1hdCx0aGlzLmZvcm1hdCx0aGlzLnR5cGUsdGhpcy5pbWFnZSksdGhpcy5nZW5lcmF0ZU1pcG1hcHMmJih0aGlzLmdsLnJlbmRlcmVyLmlzV2ViZ2wyfHxXKHRoaXMuaW1hZ2Uud2lkdGgpJiZXKHRoaXMuaW1hZ2UuaGVpZ2h0KT90aGlzLmdsLmdlbmVyYXRlTWlwbWFwKHRoaXMudGFyZ2V0KToodGhpcy5nZW5lcmF0ZU1pcG1hcHM9ITEsdGhpcy53cmFwUz10aGlzLndyYXBUPXRoaXMuZ2wuQ0xBTVBfVE9fRURHRSx0aGlzLm1pbkZpbHRlcj10aGlzLmdsLkxJTkVBUikpKTp0aGlzLndpZHRoP3RoaXMuZ2wudGV4SW1hZ2UyRCh0aGlzLnRhcmdldCx0aGlzLmxldmVsLHRoaXMuaW50ZXJuYWxGb3JtYXQsdGhpcy53aWR0aCx0aGlzLmhlaWdodCwwLHRoaXMuZm9ybWF0LHRoaXMudHlwZSxudWxsKTp0aGlzLmdsLnRleEltYWdlMkQodGhpcy50YXJnZXQsMCx0aGlzLmdsLlJHQkEsMSwxLDAsdGhpcy5nbC5SR0JBLHRoaXMuZ2wuVU5TSUdORURfQllURSxWKSx0aGlzLnN0b3JlLmltYWdlPXRoaXMuaW1hZ2UsdGhpcy5vblVwZGF0ZSYmdGhpcy5vblVwZGF0ZSgpKX19Y2xhc3MgcHtjb25zdHJ1Y3RvcihhLHt3aWR0aDpiPWEuY2FudmFzLndpZHRoLGhlaWdodDpjPWEuY2FudmFzLmhlaWdodCx0YXJnZXQ6az1hLkZSQU1FQlVGRkVSLGNvbG9yOmw9MSxkZXB0aDplPSEwLHN0ZW5jaWw6Zj0hMSxkZXB0aFRleHR1cmU6bT0hMSx3cmFwUzpnPWEuQ0xBTVBfVE9fRURHRSx3cmFwVDpoPWEuQ0xBTVBfVE9fRURHRSxtaW5GaWx0ZXI6aT1hLkxJTkVBUixtYWdGaWx0ZXI6bj1pLHR5cGU6cD1hLlVOU0lHTkVEX0JZVEUsZm9ybWF0Omo9YS5SR0JBLGludGVybmFsRm9ybWF0OnE9aix1bnBhY2tBbGlnbm1lbnQ6cixwcmVtdWx0aXBseUFscGhhOnN9PXt9KXt0aGlzLmdsPWEsdGhpcy53aWR0aD1iLHRoaXMuaGVpZ2h0PWMsdGhpcy5idWZmZXI9dGhpcy5nbC5jcmVhdGVGcmFtZWJ1ZmZlcigpLHRoaXMudGFyZ2V0PWssdGhpcy5nbC5iaW5kRnJhbWVidWZmZXIodGhpcy50YXJnZXQsdGhpcy5idWZmZXIpLHRoaXMudGV4dHVyZXM9W107Zm9yKGxldCBkPTA7ZDxsO2QrKyl0aGlzLnRleHR1cmVzLnB1c2gobmV3IG8oYSx7d2lkdGg6YixoZWlnaHQ6Yyx3cmFwUzpnLHdyYXBUOmgsbWluRmlsdGVyOmksbWFnRmlsdGVyOm4sdHlwZTpwLGZvcm1hdDpqLGludGVybmFsRm9ybWF0OnEsdW5wYWNrQWxpZ25tZW50OnIscHJlbXVsdGlwbHlBbHBoYTpzLGZsaXBZOiExLGdlbmVyYXRlTWlwbWFwczohMX0pKSx0aGlzLnRleHR1cmVzW2RdLnVwZGF0ZSgpLHRoaXMuZ2wuZnJhbWVidWZmZXJUZXh0dXJlMkQodGhpcy50YXJnZXQsdGhpcy5nbC5DT0xPUl9BVFRBQ0hNRU5UMCtkLHRoaXMuZ2wuVEVYVFVSRV8yRCx0aGlzLnRleHR1cmVzW2RdLnRleHR1cmUsMCk7dGhpcy50ZXh0dXJlPXRoaXMudGV4dHVyZXNbMF0sbSYmKHRoaXMuZ2wucmVuZGVyZXIuaXNXZWJnbDJ8fHRoaXMuZ2wucmVuZGVyZXIuZ2V0RXh0ZW5zaW9uKFwiV0VCR0xfZGVwdGhfdGV4dHVyZVwiKSk/KHRoaXMuZGVwdGhUZXh0dXJlPW5ldyBvKGEse3dpZHRoOmIsaGVpZ2h0OmMsd3JhcFM6Zyx3cmFwVDpoLG1pbkZpbHRlcjp0aGlzLmdsLk5FQVJFU1QsbWFnRmlsdGVyOnRoaXMuZ2wuTkVBUkVTVCxmbGlwWTohMSxmb3JtYXQ6dGhpcy5nbC5ERVBUSF9DT01QT05FTlQsaW50ZXJuYWxGb3JtYXQ6YS5yZW5kZXJlci5pc1dlYmdsMj90aGlzLmdsLkRFUFRIX0NPTVBPTkVOVDI0OnRoaXMuZ2wuREVQVEhfQ09NUE9ORU5ULHR5cGU6dGhpcy5nbC5VTlNJR05FRF9JTlQsZ2VuZXJhdGVNaXBtYXBzOiExfSksdGhpcy5kZXB0aFRleHR1cmUudXBkYXRlKCksdGhpcy5nbC5mcmFtZWJ1ZmZlclRleHR1cmUyRCh0aGlzLnRhcmdldCx0aGlzLmdsLkRFUFRIX0FUVEFDSE1FTlQsdGhpcy5nbC5URVhUVVJFXzJELHRoaXMuZGVwdGhUZXh0dXJlLnRleHR1cmUsMCkpOihlJiYhZiYmKHRoaXMuZGVwdGhCdWZmZXI9dGhpcy5nbC5jcmVhdGVSZW5kZXJidWZmZXIoKSx0aGlzLmdsLmJpbmRSZW5kZXJidWZmZXIodGhpcy5nbC5SRU5ERVJCVUZGRVIsdGhpcy5kZXB0aEJ1ZmZlciksdGhpcy5nbC5yZW5kZXJidWZmZXJTdG9yYWdlKHRoaXMuZ2wuUkVOREVSQlVGRkVSLHRoaXMuZ2wuREVQVEhfQ09NUE9ORU5UMTYsYixjKSx0aGlzLmdsLmZyYW1lYnVmZmVyUmVuZGVyYnVmZmVyKHRoaXMudGFyZ2V0LHRoaXMuZ2wuREVQVEhfQVRUQUNITUVOVCx0aGlzLmdsLlJFTkRFUkJVRkZFUix0aGlzLmRlcHRoQnVmZmVyKSksZiYmIWUmJih0aGlzLnN0ZW5jaWxCdWZmZXI9dGhpcy5nbC5jcmVhdGVSZW5kZXJidWZmZXIoKSx0aGlzLmdsLmJpbmRSZW5kZXJidWZmZXIodGhpcy5nbC5SRU5ERVJCVUZGRVIsdGhpcy5zdGVuY2lsQnVmZmVyKSx0aGlzLmdsLnJlbmRlcmJ1ZmZlclN0b3JhZ2UodGhpcy5nbC5SRU5ERVJCVUZGRVIsdGhpcy5nbC5TVEVOQ0lMX0lOREVYOCxiLGMpLHRoaXMuZ2wuZnJhbWVidWZmZXJSZW5kZXJidWZmZXIodGhpcy50YXJnZXQsdGhpcy5nbC5TVEVOQ0lMX0FUVEFDSE1FTlQsdGhpcy5nbC5SRU5ERVJCVUZGRVIsdGhpcy5zdGVuY2lsQnVmZmVyKSksZSYmZiYmKHRoaXMuZGVwdGhTdGVuY2lsQnVmZmVyPXRoaXMuZ2wuY3JlYXRlUmVuZGVyYnVmZmVyKCksdGhpcy5nbC5iaW5kUmVuZGVyYnVmZmVyKHRoaXMuZ2wuUkVOREVSQlVGRkVSLHRoaXMuZGVwdGhTdGVuY2lsQnVmZmVyKSx0aGlzLmdsLnJlbmRlcmJ1ZmZlclN0b3JhZ2UodGhpcy5nbC5SRU5ERVJCVUZGRVIsdGhpcy5nbC5ERVBUSF9TVEVOQ0lMLGIsYyksdGhpcy5nbC5mcmFtZWJ1ZmZlclJlbmRlcmJ1ZmZlcih0aGlzLnRhcmdldCx0aGlzLmdsLkRFUFRIX1NURU5DSUxfQVRUQUNITUVOVCx0aGlzLmdsLlJFTkRFUkJVRkZFUix0aGlzLmRlcHRoU3RlbmNpbEJ1ZmZlcikpKSx0aGlzLmdsLmJpbmRGcmFtZWJ1ZmZlcih0aGlzLnRhcmdldCxudWxsKX19Y2xhc3MgcSBleHRlbmRzIEFycmF5e2NvbnN0cnVjdG9yKGE9MCxiPTAsYz0wKXtyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgYSYmKFthLGIsY109cS5oZXhUb1JHQihhKSksc3VwZXIoYSxiLGMpLHRoaXN9Z2V0IHIoKXtyZXR1cm4gdGhpc1swXX1zZXQgcihhKXt0aGlzWzBdPWF9Z2V0IGcoKXtyZXR1cm4gdGhpc1sxXX1zZXQgZyhhKXt0aGlzWzFdPWF9Z2V0IGIoKXtyZXR1cm4gdGhpc1syXX1zZXQgYihhKXt0aGlzWzJdPWF9c2V0KGEsYixjKXtyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgYSYmKFthLGIsY109cS5oZXhUb1JHQihhKSksYS5sZW5ndGg/dGhpcy5jb3B5KGEpOih0aGlzWzBdPWEsdGhpc1sxXT1iLHRoaXNbMl09Yyx0aGlzKX1jb3B5KGEpe3JldHVybiB0aGlzWzBdPWFbMF0sdGhpc1sxXT1hWzFdLHRoaXNbMl09YVsyXSx0aGlzfXN0YXRpYyBoZXhUb1JHQihhKXs0PT09YS5sZW5ndGgmJihhPWFbMF0rYVsxXSthWzFdK2FbMl0rYVsyXSthWzNdK2FbM10pO2xldCBiPS9eIz8oW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkkL2kuZXhlYyhhKTtyZXR1cm4gYnx8Y29uc29sZS53YXJuKGBVbmFibGUgdG8gY29udmVydCBoZXggc3RyaW5nICR7YX0gdG8gcmdiIHZhbHVlc2ApLFtwYXJzZUludChiWzFdLDE2KS8yNTUscGFyc2VJbnQoYlsyXSwxNikvMjU1LHBhcnNlSW50KGJbM10sMTYpLzI1NV19fWZ1bmN0aW9uIFkoYSxiLGMpe3JldHVybiBhWzBdPWJbMF0rY1swXSxhWzFdPWJbMV0rY1sxXSxhfWZ1bmN0aW9uICQoYSxiLGMpe3JldHVybiBhWzBdPWJbMF0tY1swXSxhWzFdPWJbMV0tY1sxXSxhfWZ1bmN0aW9uIFooYSxiLGMpe3JldHVybiBhWzBdPWJbMF0qYyxhWzFdPWJbMV0qYyxhfWZ1bmN0aW9uIGFhKGEpe3ZhciBiPWFbMF0sYz1hWzFdO3JldHVybiBNYXRoLnNxcnQoYipiK2MqYyl9Y2xhc3MgZSBleHRlbmRzIEFycmF5e2NvbnN0cnVjdG9yKGE9MCxiPWEpe3JldHVybiBzdXBlcihhLGIpLHRoaXN9Z2V0IHgoKXtyZXR1cm4gdGhpc1swXX1zZXQgeChhKXt0aGlzWzBdPWF9Z2V0IHkoKXtyZXR1cm4gdGhpc1sxXX1zZXQgeShhKXt0aGlzWzFdPWF9c2V0KGEsZT1hKXt2YXIgYixjLGQ7cmV0dXJuIGEubGVuZ3RoP3RoaXMuY29weShhKTooYj10aGlzLGM9YSxkPWUsYlswXT1jLGJbMV09ZCx0aGlzKX1jb3B5KGMpe3ZhciBiLGE7cmV0dXJuIGE9YywoYj10aGlzKVswXT1hWzBdLGJbMV09YVsxXSx0aGlzfWFkZChhLGIpe3JldHVybiBiP1kodGhpcyxhLGIpOlkodGhpcyx0aGlzLGEpLHRoaXN9c3ViKGEsYil7cmV0dXJuIGI/JCh0aGlzLGEsYik6JCh0aGlzLHRoaXMsYSksdGhpc31tdWx0aXBseShhKXt2YXIgZCxiLGM7cmV0dXJuIGEubGVuZ3RoPyhiPXRoaXMsYz1hLChkPXRoaXMpWzBdPWJbMF0qY1swXSxkWzFdPWJbMV0qY1sxXSk6Wih0aGlzLHRoaXMsYSksdGhpc31kaXZpZGUoYSl7dmFyIGQsYixjO3JldHVybiBhLmxlbmd0aD8oYj10aGlzLGM9YSwoZD10aGlzKVswXT1iWzBdL2NbMF0sZFsxXT1iWzFdL2NbMV0pOloodGhpcyx0aGlzLDEvYSksdGhpc31pbnZlcnNlKGM9dGhpcyl7dmFyIGIsYTtyZXR1cm4gYT1jLChiPXRoaXMpWzBdPTEvYVswXSxiWzFdPTEvYVsxXSx0aGlzfWxlbigpe3JldHVybiBhYSh0aGlzKX1kaXN0YW5jZShkKXt2YXIgYSxlLGIsYztyZXR1cm4gZD8oYT10aGlzLGI9KGU9ZClbMF0tYVswXSxjPWVbMV0tYVsxXSxNYXRoLnNxcnQoYipiK2MqYykpOmFhKHRoaXMpfXNxdWFyZWRMZW4oKXtyZXR1cm4gdGhpcy5zcXVhcmVkRGlzdGFuY2UoKX1zcXVhcmVkRGlzdGFuY2UoZyl7dmFyIGEsaCxiLGMsZCxlLGY7cmV0dXJuIGc/KGE9dGhpcyxiPShoPWcpWzBdLWFbMF0sYz1oWzFdLWFbMV0sYipiK2MqYyk6KGQ9dGhpcyxlPWRbMF0sZj1kWzFdLGUqZStmKmYpfW5lZ2F0ZShjPXRoaXMpe3ZhciBiLGE7cmV0dXJuIGE9YywoYj10aGlzKVswXT0tYVswXSxiWzFdPS1hWzFdLHRoaXN9Y3Jvc3MoYyxkKXt2YXIgYixhO3JldHVybiBhPWQsKGI9YylbMF0qYVsxXS1iWzFdKmFbMF19c2NhbGUoYSl7cmV0dXJuIFoodGhpcyx0aGlzLGEpLHRoaXN9bm9ybWFsaXplKCl7dmFyIGMsYixkLGUsYTtyZXR1cm4gYz10aGlzLGQ9KGI9dGhpcylbMF0sZT1iWzFdLChhPWQqZCtlKmUpPjAmJihhPTEvTWF0aC5zcXJ0KGEpKSxjWzBdPWJbMF0qYSxjWzFdPWJbMV0qYSx0aGlzfWRvdChjKXt2YXIgYixhO3JldHVybiBhPWMsKGI9dGhpcylbMF0qYVswXStiWzFdKmFbMV19ZXF1YWxzKGMpe3ZhciBiLGE7cmV0dXJuIGE9YywoYj10aGlzKVswXT09PWFbMF0mJmJbMV09PT1hWzFdfWFwcGx5TWF0cml4MyhmKXt2YXIgYixlLGEsYyxkO3JldHVybiBiPXRoaXMsYT1mLGM9KGU9dGhpcylbMF0sZD1lWzFdLGJbMF09YVswXSpjK2FbM10qZCthWzZdLGJbMV09YVsxXSpjK2FbNF0qZCthWzddLHRoaXN9YXBwbHlNYXRyaXg0KGYpe3ZhciBiLGMsYTtsZXQgZCxlO3JldHVybiBiPXRoaXMsYz10aGlzLGE9ZixkPWNbMF0sZT1jWzFdLGJbMF09YVswXSpkK2FbNF0qZSthWzEyXSxiWzFdPWFbMV0qZCthWzVdKmUrYVsxM10sdGhpc31sZXJwKGcsaCl7dmFyIGEsYixjLGQsZSxmO2E9dGhpcyxiPXRoaXMsYz1nLGQ9aCxlPWJbMF0sZj1iWzFdLGFbMF09ZStkKihjWzBdLWUpLGFbMV09ZitkKihjWzFdLWYpfWNsb25lKCl7cmV0dXJuIG5ldyBlKHRoaXNbMF0sdGhpc1sxXSl9ZnJvbUFycmF5KGEsYj0wKXtyZXR1cm4gdGhpc1swXT1hW2JdLHRoaXNbMV09YVtiKzFdLHRoaXN9dG9BcnJheShhPVtdLGI9MCl7cmV0dXJuIGFbYl09dGhpc1swXSxhW2IrMV09dGhpc1sxXSxhfX1jbGFzcyByIGV4dGVuZHMgZntjb25zdHJ1Y3RvcihqLHt3aWR0aDprPTEsaGVpZ2h0Omw9MSx3aWR0aFNlZ21lbnRzOm09MSxoZWlnaHRTZWdtZW50czpuPTEsYXR0cmlidXRlczpkPXt9fT17fSl7bGV0IGI9bSxjPW4sYT0oYisxKSooYysxKSxlPWIqYyo2LGY9bmV3IEZsb2F0MzJBcnJheSgzKmEpLGc9bmV3IEZsb2F0MzJBcnJheSgzKmEpLGg9bmV3IEZsb2F0MzJBcnJheSgyKmEpLGk9YT42NTUzNj9uZXcgVWludDMyQXJyYXkoZSk6bmV3IFVpbnQxNkFycmF5KGUpO3IuYnVpbGRQbGFuZShmLGcsaCxpLGssbCwwLGIsYyksT2JqZWN0LmFzc2lnbihkLHtwb3NpdGlvbjp7c2l6ZTozLGRhdGE6Zn0sbm9ybWFsOntzaXplOjMsZGF0YTpnfSx1djp7c2l6ZToyLGRhdGE6aH0saW5kZXg6e2RhdGE6aX19KSxzdXBlcihqLGQpfXN0YXRpYyBidWlsZFBsYW5lKGksaixrLGYsbCxtLG4sZCxnLG89MCxwPTEscT0yLHQ9MSx1PS0xLGE9MCxlPTApe2xldCBoPWEsdj1sL2Qsdz1tL2c7Zm9yKGxldCBiPTA7Yjw9ZztiKyspe2xldCB4PWIqdy1tLzI7Zm9yKGxldCBjPTA7Yzw9ZDtjKyssYSsrKXtsZXQgeT1jKnYtbC8yO2lmKGlbMyphK29dPXkqdCxpWzMqYStwXT14KnUsaVszKmErcV09bi8yLGpbMyphK29dPTAsalszKmErcF09MCxqWzMqYStxXT1uPj0wPzE6LTEsa1syKmFdPWMvZCxrWzIqYSsxXT0xLWIvZyxiPT09Z3x8Yz09PWQpY29udGludWU7bGV0IHo9aCtjK2IqKGQrMSkscj1oK2MrKGIrMSkqKGQrMSksQT1oK2MrKGIrMSkqKGQrMSkrMSxzPWgrYytiKihkKzEpKzE7Zls2KmVdPXosZls2KmUrMV09cixmWzYqZSsyXT1zLGZbNiplKzNdPXIsZls2KmUrNF09QSxmWzYqZSs1XT1zLGUrK319fX1sZXQgYWI9e05PTkU6LTEsUk9UQVRFOjAsRE9MTFk6MSxQQU46MixET0xMWV9QQU46M30sYWM9bmV3IGIsYWQ9bmV3IGUsYWU9bmV3IGUsYWY9bmV3IGIsYWc9bmV3IGIsYWg9bmV3IGIsYWk9bmV3IGMsYWo9bmV3IGIsYWs9bmV3IGQsYWw9bmV3IGIsYW09bmV3IGIsYW49bmV3IGQsYW89bmV3IGI7Y2xhc3Mgc3tjb25zdHJ1Y3Rvcih7b2JqZWN0czpiLGRhdGE6YX0pe3RoaXMub2JqZWN0cz1iLHRoaXMuZGF0YT1hLHRoaXMuZWxhcHNlZD0wLHRoaXMud2VpZ2h0PTEsdGhpcy5kdXJhdGlvbj1hLmZyYW1lcy5sZW5ndGgtMX11cGRhdGUoYz0xLGQpe2xldCBlPWQ/MTp0aGlzLndlaWdodC9jLGI9dGhpcy5lbGFwc2VkJXRoaXMuZHVyYXRpb24sYT1NYXRoLmZsb29yKGIpLGY9Yi1hLGc9dGhpcy5kYXRhLmZyYW1lc1thXSxoPXRoaXMuZGF0YS5mcmFtZXNbKGErMSkldGhpcy5kdXJhdGlvbl07dGhpcy5vYmplY3RzLmZvckVhY2goKGIsYSk9Pnthai5mcm9tQXJyYXkoZy5wb3NpdGlvbiwzKmEpLGFrLmZyb21BcnJheShnLnF1YXRlcm5pb24sNCphKSxhbC5mcm9tQXJyYXkoZy5zY2FsZSwzKmEpLGFtLmZyb21BcnJheShoLnBvc2l0aW9uLDMqYSksYW4uZnJvbUFycmF5KGgucXVhdGVybmlvbiw0KmEpLGFvLmZyb21BcnJheShoLnNjYWxlLDMqYSksYWoubGVycChhbSxmKSxhay5zbGVycChhbixmKSxhbC5sZXJwKGFvLGYpLGIucG9zaXRpb24ubGVycChhaixlKSxiLnF1YXRlcm5pb24uc2xlcnAoYWssZSksYi5zY2FsZS5sZXJwKGFsLGUpfSl9fWxldCBhcD1uZXcgYztyZXR1cm4gYS5BbmltYXRpb249cyxhLkJveD1jbGFzcyBleHRlbmRzIGZ7Y29uc3RydWN0b3IocCx7d2lkdGg6aD0xLGhlaWdodDppPTEsZGVwdGg6aj0xLHdpZHRoU2VnbWVudHM6cT0xLGhlaWdodFNlZ21lbnRzOnM9MSxkZXB0aFNlZ21lbnRzOnQ9MSxhdHRyaWJ1dGVzOm49e319PXt9KXtsZXQgYz1xLGE9cyxiPXQsbT0oYysxKSooYSsxKSoyKyhjKzEpKihiKzEpKjIrKGErMSkqKGIrMSkqMixvPTYqKGMqYSoyK2MqYioyK2EqYioyKSxkPW5ldyBGbG9hdDMyQXJyYXkoMyptKSxlPW5ldyBGbG9hdDMyQXJyYXkoMyptKSxmPW5ldyBGbG9hdDMyQXJyYXkoMiptKSxnPW0+NjU1MzY/bmV3IFVpbnQzMkFycmF5KG8pOm5ldyBVaW50MTZBcnJheShvKSxrPTAsbD0wO3IuYnVpbGRQbGFuZShkLGUsZixnLGosaSxoLGIsYSwyLDEsMCwtMSwtMSxrLGwpLHIuYnVpbGRQbGFuZShkLGUsZixnLGosaSwtaCxiLGEsMiwxLDAsMSwtMSxrKz0oYisxKSooYSsxKSxsKz1iKmEpLHIuYnVpbGRQbGFuZShkLGUsZixnLGgsaixpLGIsYSwwLDIsMSwxLDEsays9KGIrMSkqKGErMSksbCs9YiphKSxyLmJ1aWxkUGxhbmUoZCxlLGYsZyxoLGosLWksYixhLDAsMiwxLDEsLTEsays9KGMrMSkqKGIrMSksbCs9YypiKSxyLmJ1aWxkUGxhbmUoZCxlLGYsZyxoLGksLWosYyxhLDAsMSwyLC0xLC0xLGsrPShjKzEpKihiKzEpLGwrPWMqYiksci5idWlsZFBsYW5lKGQsZSxmLGcsaCxpLGosYyxhLDAsMSwyLDEsLTEsays9KGMrMSkqKGErMSksbCs9YyphKSxPYmplY3QuYXNzaWduKG4se3Bvc2l0aW9uOntzaXplOjMsZGF0YTpkfSxub3JtYWw6e3NpemU6MyxkYXRhOmV9LHV2OntzaXplOjIsZGF0YTpmfSxpbmRleDp7ZGF0YTpnfX0pLHN1cGVyKHAsbil9fSxhLkNhbWVyYT1jbGFzcyBleHRlbmRzIGd7Y29uc3RydWN0b3IoZCx7bmVhcjplPS4xLGZhcjpmPTEwMCxmb3Y6Zz00NSxhc3BlY3Q6aD0xLGxlZnQ6YSxyaWdodDpiLGJvdHRvbTppLHRvcDpqfT17fSl7c3VwZXIoZCksdGhpcy5uZWFyPWUsdGhpcy5mYXI9Zix0aGlzLmZvdj1nLHRoaXMuYXNwZWN0PWgsdGhpcy5wcm9qZWN0aW9uTWF0cml4PW5ldyBjLHRoaXMudmlld01hdHJpeD1uZXcgYyx0aGlzLnByb2plY3Rpb25WaWV3TWF0cml4PW5ldyBjLGF8fGI/dGhpcy5vcnRob2dyYXBoaWMoe2xlZnQ6YSxyaWdodDpiLGJvdHRvbTppLHRvcDpqfSk6dGhpcy5wZXJzcGVjdGl2ZSgpfXBlcnNwZWN0aXZlKHtuZWFyOmE9dGhpcy5uZWFyLGZhcjpiPXRoaXMuZmFyLGZvdjpjPXRoaXMuZm92LGFzcGVjdDpkPXRoaXMuYXNwZWN0fT17fSl7cmV0dXJuIHRoaXMucHJvamVjdGlvbk1hdHJpeC5mcm9tUGVyc3BlY3RpdmUoe2ZvdjpjKihNYXRoLlBJLzE4MCksYXNwZWN0OmQsbmVhcjphLGZhcjpifSksdGhpcy50eXBlPVwicGVyc3BlY3RpdmVcIix0aGlzfW9ydGhvZ3JhcGhpYyh7bmVhcjphPXRoaXMubmVhcixmYXI6Yj10aGlzLmZhcixsZWZ0OmM9LTEscmlnaHQ6ZD0xLGJvdHRvbTplPS0xLHRvcDpmPTF9PXt9KXtyZXR1cm4gdGhpcy5wcm9qZWN0aW9uTWF0cml4LmZyb21PcnRob2dvbmFsKHtsZWZ0OmMscmlnaHQ6ZCxib3R0b206ZSx0b3A6ZixuZWFyOmEsZmFyOmJ9KSx0aGlzLnR5cGU9XCJvcnRob2dyYXBoaWNcIix0aGlzfXVwZGF0ZU1hdHJpeFdvcmxkKCl7cmV0dXJuIHN1cGVyLnVwZGF0ZU1hdHJpeFdvcmxkKCksdGhpcy52aWV3TWF0cml4LmludmVyc2UodGhpcy53b3JsZE1hdHJpeCksdGhpcy5wcm9qZWN0aW9uVmlld01hdHJpeC5tdWx0aXBseSh0aGlzLnByb2plY3Rpb25NYXRyaXgsdGhpcy52aWV3TWF0cml4KSx0aGlzfWxvb2tBdChhKXtyZXR1cm4gc3VwZXIubG9va0F0KGEsITApLHRoaXN9cHJvamVjdChhKXtyZXR1cm4gYS5hcHBseU1hdHJpeDQodGhpcy52aWV3TWF0cml4KSxhLmFwcGx5TWF0cml4NCh0aGlzLnByb2plY3Rpb25NYXRyaXgpLHRoaXN9dW5wcm9qZWN0KGEpe3JldHVybiBhLmFwcGx5TWF0cml4NChRLmludmVyc2UodGhpcy5wcm9qZWN0aW9uTWF0cml4KSksYS5hcHBseU1hdHJpeDQodGhpcy53b3JsZE1hdHJpeCksdGhpc311cGRhdGVGcnVzdHVtKCl7dGhpcy5mcnVzdHVtfHwodGhpcy5mcnVzdHVtPVtuZXcgYixuZXcgYixuZXcgYixuZXcgYixuZXcgYixuZXcgYl0pO2xldCBhPXRoaXMucHJvamVjdGlvblZpZXdNYXRyaXg7dGhpcy5mcnVzdHVtWzBdLnNldChhWzNdLWFbMF0sYVs3XS1hWzRdLGFbMTFdLWFbOF0pLmNvbnN0YW50PWFbMTVdLWFbMTJdLHRoaXMuZnJ1c3R1bVsxXS5zZXQoYVszXSthWzBdLGFbN10rYVs0XSxhWzExXSthWzhdKS5jb25zdGFudD1hWzE1XSthWzEyXSx0aGlzLmZydXN0dW1bMl0uc2V0KGFbM10rYVsxXSxhWzddK2FbNV0sYVsxMV0rYVs5XSkuY29uc3RhbnQ9YVsxNV0rYVsxM10sdGhpcy5mcnVzdHVtWzNdLnNldChhWzNdLWFbMV0sYVs3XS1hWzVdLGFbMTFdLWFbOV0pLmNvbnN0YW50PWFbMTVdLWFbMTNdLHRoaXMuZnJ1c3R1bVs0XS5zZXQoYVszXS1hWzJdLGFbN10tYVs2XSxhWzExXS1hWzEwXSkuY29uc3RhbnQ9YVsxNV0tYVsxNF0sdGhpcy5mcnVzdHVtWzVdLnNldChhWzNdK2FbMl0sYVs3XSthWzZdLGFbMTFdK2FbMTBdKS5jb25zdGFudD1hWzE1XSthWzE0XTtmb3IobGV0IGM9MDtjPDY7YysrKXtsZXQgZD0xL3RoaXMuZnJ1c3R1bVtjXS5kaXN0YW5jZSgpO3RoaXMuZnJ1c3R1bVtjXS5tdWx0aXBseShkKSx0aGlzLmZydXN0dW1bY10uY29uc3RhbnQqPWR9fWZydXN0dW1JbnRlcnNlY3RzTWVzaChhKXtpZighYS5nZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uKXJldHVybiEwO2EuZ2VvbWV0cnkuYm91bmRzJiZhLmdlb21ldHJ5LmJvdW5kcy5yYWRpdXMhPT0xLzB8fGEuZ2VvbWV0cnkuY29tcHV0ZUJvdW5kaW5nU3BoZXJlKCk7bGV0IGI9UjtiLmNvcHkoYS5nZW9tZXRyeS5ib3VuZHMuY2VudGVyKSxiLmFwcGx5TWF0cml4NChhLndvcmxkTWF0cml4KTtsZXQgYz1hLmdlb21ldHJ5LmJvdW5kcy5yYWRpdXMqYS53b3JsZE1hdHJpeC5nZXRNYXhTY2FsZU9uQXhpcygpO3JldHVybiB0aGlzLmZydXN0dW1JbnRlcnNlY3RzU3BoZXJlKGIsYyl9ZnJ1c3R1bUludGVyc2VjdHNTcGhlcmUoYyxkKXtsZXQgZT1TO2ZvcihsZXQgYT0wO2E8NjthKyspe2xldCBiPXRoaXMuZnJ1c3R1bVthXTtpZihlLmNvcHkoYikuZG90KGMpK2IuY29uc3RhbnQ8IC1kKXJldHVybiExfXJldHVybiEwfX0sYS5Db2xvcj1xLGEuQ3lsaW5kZXI9Y2xhc3MgZXh0ZW5kcyBme2NvbnN0cnVjdG9yKEEse3JhZGl1czp3PS41LGhlaWdodDpyPTEscmFkaWFsU2VnbWVudHM6cz0xNixoZWlnaHRTZWdtZW50czp0PTEsYXR0cmlidXRlczp4PXt9fT17fSl7bGV0IHU9cyxvPXQscT0ocysxKSoodCsxKSsyLHk9cyooMisyKnQpKjMsaD1uZXcgRmxvYXQzMkFycmF5KDMqcSksaT1uZXcgRmxvYXQzMkFycmF5KDMqcSksbj1uZXcgRmxvYXQzMkFycmF5KDIqcSksZD1xPjY1NTM2P25ldyBVaW50MzJBcnJheSh5KTpuZXcgVWludDE2QXJyYXkoeSksayxsLG0sYT0wLGU9bmV3IGI7az0wLGw9LTAuNSpyLG09MCxoWzMqYSswXT1rLGhbMyphKzFdPWwsaFszKmErMl09bSxlLnNldChrLGwsbSkubm9ybWFsaXplKCksaVszKmFdPWUueCxpWzMqYSsxXT1lLnksaVszKmErMl09ZS56LG5bMiphXT0wLG5bMiphKzFdPTE7bGV0IEI9YTtrPTAsbD0uNSpyLG09MCxoWzMqICsrYSswXT1rLGhbMyphKzFdPWwsaFszKmErMl09bSxlLnNldChrLGwsbSkubm9ybWFsaXplKCksaVszKmFdPWUueCxpWzMqYSsxXT1lLnksaVszKmErMl09ZS56LG5bMiphXT0wLG5bMiphKzFdPTA7bGV0IEM9YTthKys7Zm9yKHZhciBmPTA7Zjx1KzE7ZisrKXtsZXQgdj1mL3U7Zm9yKHZhciBnPTA7ZzxvKzE7ZysrKXtsZXQgej1nL287az1NYXRoLmNvcyh2Kk1hdGguUEkqMikqdyxsPSh6LS41KSpyLG09TWF0aC5zaW4odipNYXRoLlBJKjIpKncsaFszKmErMF09ayxoWzMqYSsxXT1sLGhbMyphKzJdPW0sZS5zZXQoayxsLG0pLm5vcm1hbGl6ZSgpLGlbMyphXT1lLngsaVszKmErMV09ZS55LGlbMyphKzJdPWUueixuWzIqYV09dixuWzIqYSsxXT0xLXosYSsrfX1sZXQgYz0wLGo9bysxO2ZvcihmPTA7Zjx1O2YrKyl7bGV0IHA9ZisxO2ZvcihkWzMqYyswXT1CLGRbMypjKzFdPTIrZipqLGRbMypjKzJdPTIrcCpqLGMrKyxnPTA7ZzxvO2crKylkWzMqYyswXT0yK2YqaisoZyswKSxkWzMqYysxXT0yK2YqaisoZysxKSxkWzMqYysyXT0yK3AqaisoZyswKSxkWzMqICsrYyswXT0yK3AqaisoZyswKSxkWzMqYysxXT0yK2YqaisoZysxKSxkWzMqYysyXT0yK3AqaisoZysxKSxjKys7ZFszKmMrMF09MitwKmorbyxkWzMqYysxXT0yK2YqaitvLGRbMypjKzJdPUMsYysrfU9iamVjdC5hc3NpZ24oeCx7cG9zaXRpb246e3NpemU6MyxkYXRhOmh9LG5vcm1hbDp7c2l6ZTozLGRhdGE6aX0sdXY6e3NpemU6MixkYXRhOm59LGluZGV4OntkYXRhOmR9fSksc3VwZXIoQSx4KX19LGEuRXVsZXI9bCxhLkZsb3dtYXA9Y2xhc3N7Y29uc3RydWN0b3IoYSx7c2l6ZTppPTUxMixmYWxsb2ZmOmM9LjMsYWxwaGE6ZD0xLGRpc3NpcGF0aW9uOmc9Ljk2fT17fSl7bGV0IGI9dGhpczt0aGlzLmdsPWEsdGhpcy51bmlmb3JtPXt2YWx1ZTpudWxsfSx0aGlzLm1hc2s9e3JlYWQ6bnVsbCx3cml0ZTpudWxsLHN3YXAoKXtsZXQgYT1iLm1hc2sucmVhZDtiLm1hc2sucmVhZD1iLm1hc2sud3JpdGUsYi5tYXNrLndyaXRlPWEsYi51bmlmb3JtLnZhbHVlPWIubWFzay5yZWFkLnRleHR1cmV9fSxmdW5jdGlvbigpe2xldCBkPWEucmVuZGVyZXIuZXh0ZW5zaW9uc1tgT0VTX3RleHR1cmVfJHthLnJlbmRlcmVyLmlzV2ViZ2wyP1wiXCI6XCJoYWxmX1wifWZsb2F0X2xpbmVhcmBdLGM9e3dpZHRoOmksaGVpZ2h0OmksdHlwZTphLnJlbmRlcmVyLmlzV2ViZ2wyP2EuSEFMRl9GTE9BVDphLnJlbmRlcmVyLmV4dGVuc2lvbnMuT0VTX3RleHR1cmVfaGFsZl9mbG9hdD9hLnJlbmRlcmVyLmV4dGVuc2lvbnMuT0VTX3RleHR1cmVfaGFsZl9mbG9hdC5IQUxGX0ZMT0FUX09FUzphLlVOU0lHTkVEX0JZVEUsZm9ybWF0OmEuUkdCQSxpbnRlcm5hbEZvcm1hdDphLnJlbmRlcmVyLmlzV2ViZ2wyP2EuUkdCQTE2RjphLlJHQkEsbWluRmlsdGVyOmQ/YS5MSU5FQVI6YS5ORUFSRVNULGRlcHRoOiExfTtiLm1hc2sucmVhZD1uZXcgcChhLGMpLGIubWFzay53cml0ZT1uZXcgcChhLGMpLGIubWFzay5zd2FwKCl9KCksdGhpcy5hc3BlY3Q9MSx0aGlzLm1vdXNlPW5ldyBlLHRoaXMudmVsb2NpdHk9bmV3IGUsdGhpcy5tZXNoPW5ldyBuKGEse2dlb21ldHJ5Om5ldyBmKGEse3Bvc2l0aW9uOntzaXplOjIsZGF0YTpuZXcgRmxvYXQzMkFycmF5KFstMSwtMSwzLC0xLC0xLDNdKX0sdXY6e3NpemU6MixkYXRhOm5ldyBGbG9hdDMyQXJyYXkoWzAsMCwyLDAsMCwyXSl9fSkscHJvZ3JhbTpuZXcgaChhLHt2ZXJ0ZXg6XCJcXG4gICAgYXR0cmlidXRlIHZlYzIgdXY7XFxuICAgIGF0dHJpYnV0ZSB2ZWMyIHBvc2l0aW9uO1xcblxcbiAgICB2YXJ5aW5nIHZlYzIgdlV2O1xcblxcbiAgICB2b2lkIG1haW4oKSB7XFxuICAgICAgICB2VXYgPSB1djtcXG4gICAgICAgIGdsX1Bvc2l0aW9uID0gdmVjNChwb3NpdGlvbiwgMCwgMSk7XFxuICAgIH1cXG5cIixmcmFnbWVudDpcIlxcbiAgICBwcmVjaXNpb24gaGlnaHAgZmxvYXQ7XFxuXFxuICAgIHVuaWZvcm0gc2FtcGxlcjJEIHRNYXA7XFxuXFxuICAgIHVuaWZvcm0gZmxvYXQgdUZhbGxvZmY7XFxuICAgIHVuaWZvcm0gZmxvYXQgdUFscGhhO1xcbiAgICB1bmlmb3JtIGZsb2F0IHVEaXNzaXBhdGlvbjtcXG5cXG4gICAgdW5pZm9ybSBmbG9hdCB1QXNwZWN0O1xcbiAgICB1bmlmb3JtIHZlYzIgdU1vdXNlO1xcbiAgICB1bmlmb3JtIHZlYzIgdVZlbG9jaXR5O1xcblxcbiAgICB2YXJ5aW5nIHZlYzIgdlV2O1xcblxcbiAgICB2b2lkIG1haW4oKSB7XFxuXFxuICAgICAgdmVjMiBjdXJzb3IgPSB2VXYgLSB1TW91c2U7XFxuXFxuICAgICAgICB2ZWM0IGNvbG9yID0gdGV4dHVyZTJEKHRNYXAsIHZVdikgKiB1RGlzc2lwYXRpb247XFxuXFxuICAgICAgICBjdXJzb3IueCAqPSB1QXNwZWN0O1xcblxcbiAgICAgICAgdmVjMyBzdGFtcCA9IHZlYzModVZlbG9jaXR5ICogdmVjMigxLCAtMSksIDEuMCAtIHBvdygxLjAgLSBtaW4oMS4wLCBsZW5ndGgodVZlbG9jaXR5KSksIDMuMCkpO1xcbiAgICAgICAgZmxvYXQgZmFsbG9mZiA9IHNtb290aHN0ZXAodUZhbGxvZmYsIDAuMCwgbGVuZ3RoKGN1cnNvcikpICogdUFscGhhO1xcblxcbiAgICAgICAgY29sb3IucmdiID0gbWl4KGNvbG9yLnJnYiwgc3RhbXAsIHZlYzMoZmFsbG9mZikpO1xcblxcbiAgICAgICAgZ2xfRnJhZ0NvbG9yID0gY29sb3I7XFxuICAgIH1cXG5cIix1bmlmb3Jtczp7dE1hcDpiLnVuaWZvcm0sdUZhbGxvZmY6e3ZhbHVlOi41KmN9LHVBbHBoYTp7dmFsdWU6ZH0sdURpc3NpcGF0aW9uOnt2YWx1ZTpnfSx1QXNwZWN0Ont2YWx1ZToxfSx1TW91c2U6e3ZhbHVlOmIubW91c2V9LHVWZWxvY2l0eTp7dmFsdWU6Yi52ZWxvY2l0eX19LGRlcHRoVGVzdDohMX0pfSl9dXBkYXRlKCl7dGhpcy5tZXNoLnByb2dyYW0udW5pZm9ybXMudUFzcGVjdC52YWx1ZT10aGlzLmFzcGVjdCx0aGlzLmdsLnJlbmRlcmVyLnJlbmRlcih7c2NlbmU6dGhpcy5tZXNoLHRhcmdldDp0aGlzLm1hc2sud3JpdGUsY2xlYXI6ITF9KSx0aGlzLm1hc2suc3dhcCgpfX0sYS5HUEdQVT1jbGFzc3tjb25zdHJ1Y3RvcihhLHtkYXRhOmQ9bmV3IEZsb2F0MzJBcnJheSgxNiksZ2VvbWV0cnk6ZT1uZXcgZihhLHtwb3NpdGlvbjp7c2l6ZToyLGRhdGE6bmV3IEZsb2F0MzJBcnJheShbLTEsLTEsMywtMSwtMSwzXSl9LHV2OntzaXplOjIsZGF0YTpuZXcgRmxvYXQzMkFycmF5KFswLDAsMiwwLDAsMl0pfX0pfSl7dGhpcy5nbD1hO2xldCBnPWQ7dGhpcy5wYXNzZXM9W10sdGhpcy5nZW9tZXRyeT1lLHRoaXMuZGF0YUxlbmd0aD1nLmxlbmd0aC80LHRoaXMuc2l6ZT1NYXRoLnBvdygyLE1hdGguY2VpbChNYXRoLmxvZyhNYXRoLmNlaWwoTWF0aC5zcXJ0KHRoaXMuZGF0YUxlbmd0aCkpKS9NYXRoLkxOMikpLHRoaXMuY29vcmRzPW5ldyBGbG9hdDMyQXJyYXkoMip0aGlzLmRhdGFMZW5ndGgpO2ZvcihsZXQgYj0wO2I8dGhpcy5kYXRhTGVuZ3RoO2IrKyl7bGV0IGg9YiV0aGlzLnNpemUvdGhpcy5zaXplLGk9TWF0aC5mbG9vcihiL3RoaXMuc2l6ZSkvdGhpcy5zaXplO3RoaXMuY29vcmRzLnNldChbaCxpXSwyKmIpfWxldCBqPSgoKT0+e2lmKGcubGVuZ3RoPT09dGhpcy5zaXplKnRoaXMuc2l6ZSo0KXJldHVybiBnO3tsZXQgYT1uZXcgRmxvYXQzMkFycmF5KHRoaXMuc2l6ZSp0aGlzLnNpemUqNCk7cmV0dXJuIGEuc2V0KGcpLGF9fSkoKTt0aGlzLnVuaWZvcm09e3ZhbHVlOm5ldyBvKGEse2ltYWdlOmosdGFyZ2V0OmEuVEVYVFVSRV8yRCx0eXBlOmEuRkxPQVQsZm9ybWF0OmEuUkdCQSxpbnRlcm5hbEZvcm1hdDphLnJlbmRlcmVyLmlzV2ViZ2wyP2EuUkdCQTMyRjphLlJHQkEsd3JhcFM6YS5DTEFNUF9UT19FREdFLHdyYXBUOmEuQ0xBTVBfVE9fRURHRSxnZW5lcmF0ZU1pcG1hcHM6ITEsbWluRmlsdGVyOmEuTkVBUkVTVCxtYWdGaWx0ZXI6YS5ORUFSRVNULHdpZHRoOnRoaXMuc2l6ZSxmbGlwWTohMX0pfTtsZXQgYz17d2lkdGg6dGhpcy5zaXplLGhlaWdodDp0aGlzLnNpemUsdHlwZTphLnJlbmRlcmVyLmlzV2ViZ2wyP2EuSEFMRl9GTE9BVDphLnJlbmRlcmVyLmV4dGVuc2lvbnMuT0VTX3RleHR1cmVfaGFsZl9mbG9hdD9hLnJlbmRlcmVyLmV4dGVuc2lvbnMuT0VTX3RleHR1cmVfaGFsZl9mbG9hdC5IQUxGX0ZMT0FUX09FUzphLlVOU0lHTkVEX0JZVEUsZm9ybWF0OmEuUkdCQSxpbnRlcm5hbEZvcm1hdDphLnJlbmRlcmVyLmlzV2ViZ2wyP2EuUkdCQTE2RjphLlJHQkEsbWluRmlsdGVyOmEuTkVBUkVTVCxkZXB0aDohMSx1bnBhY2tBbGlnbm1lbnQ6MX07dGhpcy5mYm89e3JlYWQ6bmV3IHAoYSxjKSx3cml0ZTpuZXcgcChhLGMpLHN3YXA6KCk9PntsZXQgYT10aGlzLmZiby5yZWFkO3RoaXMuZmJvLnJlYWQ9dGhpcy5mYm8ud3JpdGUsdGhpcy5mYm8ud3JpdGU9YSx0aGlzLnVuaWZvcm0udmFsdWU9dGhpcy5mYm8ucmVhZC50ZXh0dXJlfX19YWRkUGFzcyh7dmVydGV4OmU9XCJcXG4gICAgYXR0cmlidXRlIHZlYzIgdXY7XFxuICAgIGF0dHJpYnV0ZSB2ZWMyIHBvc2l0aW9uO1xcblxcbiAgICB2YXJ5aW5nIHZlYzIgdlV2O1xcblxcbiAgICB2b2lkIG1haW4oKSB7XFxuICAgICAgICB2VXYgPSB1djtcXG4gICAgICAgIGdsX1Bvc2l0aW9uID0gdmVjNChwb3NpdGlvbiwgMCwgMSk7XFxuICAgIH1cXG5cIixmcmFnbWVudDpmPVwiXFxuICAgIHByZWNpc2lvbiBoaWdocCBmbG9hdDtcXG5cXG4gICAgdW5pZm9ybSBzYW1wbGVyMkQgdE1hcDtcXG4gICAgdmFyeWluZyB2ZWMyIHZVdjtcXG5cXG4gICAgdm9pZCBtYWluKCkge1xcbiAgICAgICAgZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZTJEKHRNYXAsIHZVdik7XFxuICAgIH1cXG5cIix1bmlmb3JtczphPXt9LHRleHR1cmVVbmlmb3JtOmI9XCJ0TWFwXCIsZW5hYmxlZDpnPSEwfT17fSl7YVtiXT10aGlzLnVuaWZvcm07bGV0IGM9bmV3IGgodGhpcy5nbCx7dmVydGV4OmUsZnJhZ21lbnQ6Zix1bmlmb3JtczphfSksZD17bWVzaDpuZXcgbih0aGlzLmdsLHtnZW9tZXRyeTp0aGlzLmdlb21ldHJ5LHByb2dyYW06Y30pLHByb2dyYW06Yyx1bmlmb3JtczphLGVuYWJsZWQ6Zyx0ZXh0dXJlVW5pZm9ybTpifTtyZXR1cm4gdGhpcy5wYXNzZXMucHVzaChkKSxkfXJlbmRlcigpe3RoaXMucGFzc2VzLmZpbHRlcihhPT5hLmVuYWJsZWQpLmZvckVhY2goKGEsYik9Pnt0aGlzLmdsLnJlbmRlcmVyLnJlbmRlcih7c2NlbmU6YS5tZXNoLHRhcmdldDp0aGlzLmZiby53cml0ZSxjbGVhcjohMX0pLHRoaXMuZmJvLnN3YXAoKX0pfX0sYS5HZW9tZXRyeT1mLGEuTWF0Mz1tLGEuTWF0ND1jLGEuTWVzaD1uLGEuTm9ybWFsUHJvZ3JhbT1mdW5jdGlvbihhKXtyZXR1cm4gbmV3IGgoYSx7dmVydGV4OlwiXFxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xcbnByZWNpc2lvbiBoaWdocCBpbnQ7XFxuXFxuYXR0cmlidXRlIHZlYzMgcG9zaXRpb247XFxuYXR0cmlidXRlIHZlYzMgbm9ybWFsO1xcblxcbnVuaWZvcm0gbWF0MyBub3JtYWxNYXRyaXg7XFxudW5pZm9ybSBtYXQ0IG1vZGVsVmlld01hdHJpeDtcXG51bmlmb3JtIG1hdDQgcHJvamVjdGlvbk1hdHJpeDtcXG5cXG52YXJ5aW5nIHZlYzMgdk5vcm1hbDtcXG5cXG52b2lkIG1haW4oKSB7XFxuICAgIHZOb3JtYWwgPSBub3JtYWxpemUobm9ybWFsTWF0cml4ICogbm9ybWFsKTtcXG4gICAgZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNChwb3NpdGlvbiwgMS4wKTtcXG59XFxuXCIsZnJhZ21lbnQ6XCJcXG5wcmVjaXNpb24gaGlnaHAgZmxvYXQ7XFxucHJlY2lzaW9uIGhpZ2hwIGludDtcXG5cXG52YXJ5aW5nIHZlYzMgdk5vcm1hbDtcXG5cXG52b2lkIG1haW4oKSB7XFxuICAgIGdsX0ZyYWdDb2xvci5yZ2IgPSBub3JtYWxpemUodk5vcm1hbCk7XFxuICAgIGdsX0ZyYWdDb2xvci5hID0gMS4wO1xcbn1cXG5cIn0pfSxhLk9yYml0PWZ1bmN0aW9uKGkse2VsZW1lbnQ6YT1kb2N1bWVudCxlbmFibGVkOmo9ITAsdGFyZ2V0Oms9bmV3IGIsZWFzZTpnPS4yNSxpbmVydGlhOmg9Ljg1LGVuYWJsZVJvdGF0ZTp0PSEwLHJvdGF0ZVNwZWVkOnU9LjEsZW5hYmxlWm9vbTp2PSEwLHpvb21TcGVlZDp3PTEsZW5hYmxlUGFuOng9ITAscGFuU3BlZWQ6eT0uMSxtaW5Qb2xhckFuZ2xlOno9MCxtYXhQb2xhckFuZ2xlOkE9TWF0aC5QSSxtaW5BemltdXRoQW5nbGU6Qj0tMS8wLG1heEF6aW11dGhBbmdsZTpDPTEvMCxtaW5EaXN0YW5jZTpsPTAsbWF4RGlzdGFuY2U6bT0xLzB9PXt9KXt0aGlzLmVuYWJsZWQ9aix0aGlzLnRhcmdldD1rLGc9Z3x8MSxoPWh8fDEsdGhpcy5taW5EaXN0YW5jZT1sLHRoaXMubWF4RGlzdGFuY2U9bTtsZXQgRD17cmFkaXVzOjEscGhpOjAsdGhldGE6MH0sZD17cmFkaXVzOjEscGhpOjAsdGhldGE6MH0sZj17cmFkaXVzOjEscGhpOjAsdGhldGE6MH0sRT1uZXcgYixjPW5ldyBiO2MuY29weShpLnBvc2l0aW9uKS5zdWIodGhpcy50YXJnZXQpLGYucmFkaXVzPWQucmFkaXVzPWMuZGlzdGFuY2UoKSxmLnRoZXRhPWQudGhldGE9TWF0aC5hdGFuMihjLngsYy56KSxmLnBoaT1kLnBoaT1NYXRoLmFjb3MoTWF0aC5taW4oTWF0aC5tYXgoYy55L2QucmFkaXVzLC0xKSwxKSksdGhpcy51cGRhdGU9KCk9PntkLnJhZGl1cyo9RC5yYWRpdXMsZC50aGV0YSs9RC50aGV0YSxkLnBoaSs9RC5waGksZC50aGV0YT1NYXRoLm1heChCLE1hdGgubWluKEMsZC50aGV0YSkpLGQucGhpPU1hdGgubWF4KHosTWF0aC5taW4oQSxkLnBoaSkpLGQucmFkaXVzPU1hdGgubWF4KHRoaXMubWluRGlzdGFuY2UsTWF0aC5taW4odGhpcy5tYXhEaXN0YW5jZSxkLnJhZGl1cykpLGYucGhpKz0oZC5waGktZi5waGkpKmcsZi50aGV0YSs9KGQudGhldGEtZi50aGV0YSkqZyxmLnJhZGl1cys9KGQucmFkaXVzLWYucmFkaXVzKSpnLHRoaXMudGFyZ2V0LmFkZChFKTtsZXQgYT1mLnJhZGl1cypNYXRoLnNpbihNYXRoLm1heCgxZS02LGYucGhpKSk7Yy54PWEqTWF0aC5zaW4oZi50aGV0YSksYy55PWYucmFkaXVzKk1hdGguY29zKGYucGhpKSxjLno9YSpNYXRoLmNvcyhmLnRoZXRhKSxpLnBvc2l0aW9uLmNvcHkodGhpcy50YXJnZXQpLmFkZChjKSxpLmxvb2tBdCh0aGlzLnRhcmdldCksRC50aGV0YSo9aCxELnBoaSo9aCxFLm11bHRpcGx5KGgpLEQucmFkaXVzPTF9O2xldCBGPW5ldyBlLEc9bmV3IGUsSD1uZXcgZSxfPWFiLk5PTkU7ZnVuY3Rpb24gSSgpe3JldHVybiBNYXRoLnBvdyguOTUsdyl9dGhpcy5tb3VzZUJ1dHRvbnM9e09SQklUOjAsWk9PTToxLFBBTjoyfTtsZXQgSj0oaCxqKT0+e3ZhciBkLGIsZSxjO2xldCBmPWE9PT1kb2N1bWVudD9kb2N1bWVudC5ib2R5OmE7YWMuY29weShpLnBvc2l0aW9uKS5zdWIodGhpcy50YXJnZXQpO2xldCBnPWFjLmRpc3RhbmNlKCk7ZD0yKmgqKGcqPU1hdGgudGFuKChpLmZvdnx8NDUpLzIqTWF0aC5QSS8xODApKS9mLmNsaWVudEhlaWdodCxiPWkubWF0cml4LGFjLnNldChiWzBdLGJbMV0sYlsyXSksYWMubXVsdGlwbHkoLWQpLEUuYWRkKGFjKSxlPTIqaipnL2YuY2xpZW50SGVpZ2h0LGM9aS5tYXRyaXgsYWMuc2V0KGNbNF0sY1s1XSxjWzZdKSxhYy5tdWx0aXBseShlKSxFLmFkZChhYyl9O2Z1bmN0aW9uIEsoYSl7RC5yYWRpdXMvPWF9ZnVuY3Rpb24gTChjLGQpe2FkLnNldChjLGQpLGFlLnN1YihhZCxGKS5tdWx0aXBseSh1KTtsZXQgYj1hPT09ZG9jdW1lbnQ/ZG9jdW1lbnQuYm9keTphO0QudGhldGEtPTIqTWF0aC5QSSphZS54L2IuY2xpZW50SGVpZ2h0LEQucGhpLT0yKk1hdGguUEkqYWUueS9iLmNsaWVudEhlaWdodCxGLmNvcHkoYWQpfWZ1bmN0aW9uIE0oYSxiKXthZC5zZXQoYSxiKSxhZS5zdWIoYWQsRykubXVsdGlwbHkoeSksSihhZS54LGFlLnkpLEcuY29weShhZCl9bGV0IG49YT0+e2lmKHRoaXMuZW5hYmxlZCl7c3dpdGNoKGEuYnV0dG9uKXtjYXNlIHRoaXMubW91c2VCdXR0b25zLk9SQklUOmlmKCExPT09dClyZXR1cm47Ri5zZXQoYS5jbGllbnRYLGEuY2xpZW50WSksXz1hYi5ST1RBVEU7YnJlYWs7Y2FzZSB0aGlzLm1vdXNlQnV0dG9ucy5aT09NOmlmKCExPT09dilyZXR1cm47SC5zZXQoYS5jbGllbnRYLGEuY2xpZW50WSksXz1hYi5ET0xMWTticmVhaztjYXNlIHRoaXMubW91c2VCdXR0b25zLlBBTjppZighMT09PXgpcmV0dXJuO0cuc2V0KGEuY2xpZW50WCxhLmNsaWVudFkpLF89YWIuUEFOfV8hPT1hYi5OT05FJiYod2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIixOLCExKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIixPLCExKSl9fSxOPWE9PntpZih0aGlzLmVuYWJsZWQpc3dpdGNoKF8pe2Nhc2UgYWIuUk9UQVRFOmlmKCExPT09dClyZXR1cm47TChhLmNsaWVudFgsYS5jbGllbnRZKTticmVhaztjYXNlIGFiLkRPTExZOnZhciBiO2lmKCExPT09dilyZXR1cm47Yj1hLGFkLnNldChiLmNsaWVudFgsYi5jbGllbnRZKSxhZS5zdWIoYWQsSCksYWUueT4wP0soSSgpKTphZS55PDAmJksoMS9JKCkpLEguY29weShhZCk7YnJlYWs7Y2FzZSBhYi5QQU46aWYoITE9PT14KXJldHVybjtNKGEuY2xpZW50WCxhLmNsaWVudFkpfX0sTz0oKT0+e3RoaXMuZW5hYmxlZCYmKGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIixOLCExKSxkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLE8sITEpLF89YWIuTk9ORSl9LG89YT0+e3RoaXMuZW5hYmxlZCYmdiYmKF89PT1hYi5OT05FfHxfPT09YWIuUk9UQVRFKSYmKGEuc3RvcFByb3BhZ2F0aW9uKCksYS5kZWx0YVk8MD9LKDEvSSgpKTphLmRlbHRhWT4wJiZLKEkoKSkpfSxwPWE9PntpZih0aGlzLmVuYWJsZWQpc3dpdGNoKGEucHJldmVudERlZmF1bHQoKSxhLnRvdWNoZXMubGVuZ3RoKXtjYXNlIDE6aWYoITE9PT10KXJldHVybjtGLnNldChhLnRvdWNoZXNbMF0ucGFnZVgsYS50b3VjaGVzWzBdLnBhZ2VZKSxfPWFiLlJPVEFURTticmVhaztjYXNlIDI6aWYoITE9PT12JiYgITE9PT14KXJldHVybjsoZnVuY3Rpb24oYSl7aWYodil7bGV0IGI9YS50b3VjaGVzWzBdLnBhZ2VYLWEudG91Y2hlc1sxXS5wYWdlWCxjPWEudG91Y2hlc1swXS5wYWdlWS1hLnRvdWNoZXNbMV0ucGFnZVksZD1NYXRoLnNxcnQoYipiK2MqYyk7SC5zZXQoMCxkKX1pZih4KXtsZXQgZT0uNSooYS50b3VjaGVzWzBdLnBhZ2VYK2EudG91Y2hlc1sxXS5wYWdlWCksZj0uNSooYS50b3VjaGVzWzBdLnBhZ2VZK2EudG91Y2hlc1sxXS5wYWdlWSk7Ry5zZXQoZSxmKX19KShhKSxfPWFiLkRPTExZX1BBTjticmVhaztkZWZhdWx0Ol89YWIuTk9ORX19LHE9YT0+e2lmKHRoaXMuZW5hYmxlZClzd2l0Y2goYS5wcmV2ZW50RGVmYXVsdCgpLGEuc3RvcFByb3BhZ2F0aW9uKCksYS50b3VjaGVzLmxlbmd0aCl7Y2FzZSAxOmlmKCExPT09dClyZXR1cm47TChhLnRvdWNoZXNbMF0ucGFnZVgsYS50b3VjaGVzWzBdLnBhZ2VZKTticmVhaztjYXNlIDI6aWYoITE9PT12JiYgITE9PT14KXJldHVybjshZnVuY3Rpb24oYSl7aWYodil7bGV0IGI9YS50b3VjaGVzWzBdLnBhZ2VYLWEudG91Y2hlc1sxXS5wYWdlWCxjPWEudG91Y2hlc1swXS5wYWdlWS1hLnRvdWNoZXNbMV0ucGFnZVksZD1NYXRoLnNxcnQoYipiK2MqYyk7YWQuc2V0KDAsZCksYWUuc2V0KDAsTWF0aC5wb3coYWQueS9ILnksdykpLEsoYWUueSksSC5jb3B5KGFkKX14JiZNKC41KihhLnRvdWNoZXNbMF0ucGFnZVgrYS50b3VjaGVzWzFdLnBhZ2VYKSwuNSooYS50b3VjaGVzWzBdLnBhZ2VZK2EudG91Y2hlc1sxXS5wYWdlWSkpfShhKTticmVhaztkZWZhdWx0Ol89YWIuTk9ORX19LHI9KCk9Pnt0aGlzLmVuYWJsZWQmJihfPWFiLk5PTkUpfSxzPWE9Pnt0aGlzLmVuYWJsZWQmJmEucHJldmVudERlZmF1bHQoKX07dGhpcy5yZW1vdmU9ZnVuY3Rpb24oKXthLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLHMsITEpLGEucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLG4sITEpLHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwid2hlZWxcIixvLCExKSxhLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIscCwhMSksYS5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIixyLCExKSxhLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIixxLCExKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLE4sITEpLHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLE8sITEpfSxhLmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLHMsITEpLGEuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLG4sITEpLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIixvLCExKSxhLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIscCx7cGFzc2l2ZTohMX0pLGEuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsciwhMSksYS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIscSx7cGFzc2l2ZTohMX0pfSxhLlBsYW5lPXIsYS5Qb3N0PWNsYXNze2NvbnN0cnVjdG9yKGEse3dpZHRoOmIsaGVpZ2h0OmMsZHByOmQsd3JhcFM6ZT1hLkNMQU1QX1RPX0VER0Usd3JhcFQ6Zz1hLkNMQU1QX1RPX0VER0UsbWluRmlsdGVyOmg9YS5MSU5FQVIsbWFnRmlsdGVyOmk9YS5MSU5FQVIsZ2VvbWV0cnk6aj1uZXcgZihhLHtwb3NpdGlvbjp7c2l6ZToyLGRhdGE6bmV3IEZsb2F0MzJBcnJheShbLTEsLTEsMywtMSwtMSwzXSl9LHV2OntzaXplOjIsZGF0YTpuZXcgRmxvYXQzMkFycmF5KFswLDAsMiwwLDAsMl0pfX0pfT17fSl7dGhpcy5nbD1hLHRoaXMub3B0aW9ucz17d3JhcFM6ZSx3cmFwVDpnLG1pbkZpbHRlcjpoLG1hZ0ZpbHRlcjppfSx0aGlzLnBhc3Nlcz1bXSx0aGlzLmdlb21ldHJ5PWo7bGV0IGs9dGhpcy5mYm89e3JlYWQ6bnVsbCx3cml0ZTpudWxsLHN3YXAoKXtsZXQgYT1rLnJlYWQ7ay5yZWFkPWsud3JpdGUsay53cml0ZT1hfX07dGhpcy5yZXNpemUoe3dpZHRoOmIsaGVpZ2h0OmMsZHByOmR9KX1hZGRQYXNzKHt2ZXJ0ZXg6ZT1cIlxcbiAgICBhdHRyaWJ1dGUgdmVjMiB1djtcXG4gICAgYXR0cmlidXRlIHZlYzIgcG9zaXRpb247XFxuXFxuICAgIHZhcnlpbmcgdmVjMiB2VXY7XFxuXFxuICAgIHZvaWQgbWFpbigpIHtcXG4gICAgICAgIHZVdiA9IHV2O1xcbiAgICAgICAgZ2xfUG9zaXRpb24gPSB2ZWM0KHBvc2l0aW9uLCAwLCAxKTtcXG4gICAgfVxcblwiLGZyYWdtZW50OmY9XCJcXG4gICAgcHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xcblxcbiAgICB1bmlmb3JtIHNhbXBsZXIyRCB0TWFwO1xcbiAgICB2YXJ5aW5nIHZlYzIgdlV2O1xcblxcbiAgICB2b2lkIG1haW4oKSB7XFxuICAgICAgICBnbF9GcmFnQ29sb3IgPSB0ZXh0dXJlMkQodE1hcCwgdlV2KTtcXG4gICAgfVxcblwiLHVuaWZvcm1zOmE9e30sdGV4dHVyZVVuaWZvcm06Yj1cInRNYXBcIixlbmFibGVkOmc9ITB9PXt9KXthW2JdPXt2YWx1ZTp0aGlzLmZiby5yZWFkLnRleHR1cmV9O2xldCBjPW5ldyBoKHRoaXMuZ2wse3ZlcnRleDplLGZyYWdtZW50OmYsdW5pZm9ybXM6YX0pLGQ9e21lc2g6bmV3IG4odGhpcy5nbCx7Z2VvbWV0cnk6dGhpcy5nZW9tZXRyeSxwcm9ncmFtOmN9KSxwcm9ncmFtOmMsdW5pZm9ybXM6YSxlbmFibGVkOmcsdGV4dHVyZVVuaWZvcm06Yn07cmV0dXJuIHRoaXMucGFzc2VzLnB1c2goZCksZH1yZXNpemUoe3dpZHRoOmEsaGVpZ2h0OmMsZHByOmJ9PXt9KXtiJiYodGhpcy5kcHI9YiksYSYmKHRoaXMud2lkdGg9YSx0aGlzLmhlaWdodD1jfHxhKSxiPXRoaXMuZHByfHx0aGlzLmdsLnJlbmRlcmVyLmRwcixhPSh0aGlzLndpZHRofHx0aGlzLmdsLnJlbmRlcmVyLndpZHRoKSpiLGM9KHRoaXMuaGVpZ2h0fHx0aGlzLmdsLnJlbmRlcmVyLmhlaWdodCkqYix0aGlzLm9wdGlvbnMud2lkdGg9YSx0aGlzLm9wdGlvbnMuaGVpZ2h0PWMsdGhpcy5mYm8ucmVhZD1uZXcgcCh0aGlzLmdsLHRoaXMub3B0aW9ucyksdGhpcy5mYm8ud3JpdGU9bmV3IHAodGhpcy5nbCx0aGlzLm9wdGlvbnMpfXJlbmRlcih7c2NlbmU6YixjYW1lcmE6Yyx0YXJnZXQ6ZD1udWxsLHVwZGF0ZTplPSEwLHNvcnQ6Zj0hMCxmcnVzdHVtQ3VsbDpnPSEwfSl7bGV0IGE9dGhpcy5wYXNzZXMuZmlsdGVyKGE9PmEuZW5hYmxlZCk7dGhpcy5nbC5yZW5kZXJlci5yZW5kZXIoe3NjZW5lOmIsY2FtZXJhOmMsdGFyZ2V0OmEubGVuZ3RoP3RoaXMuZmJvLndyaXRlOmQsdXBkYXRlOmUsc29ydDpmLGZydXN0dW1DdWxsOmd9KSx0aGlzLmZiby5zd2FwKCksYS5mb3JFYWNoKChiLGMpPT57Yi5tZXNoLnByb2dyYW0udW5pZm9ybXNbYi50ZXh0dXJlVW5pZm9ybV0udmFsdWU9dGhpcy5mYm8ucmVhZC50ZXh0dXJlLHRoaXMuZ2wucmVuZGVyZXIucmVuZGVyKHtzY2VuZTpiLm1lc2gsdGFyZ2V0OmM9PT1hLmxlbmd0aC0xP2Q6dGhpcy5mYm8ud3JpdGUsY2xlYXI6ITF9KSx0aGlzLmZiby5zd2FwKCl9KX19LGEuUHJvZ3JhbT1oLGEuUXVhdD1kLGEuUmF5Y2FzdD1jbGFzc3tjb25zdHJ1Y3RvcihhKXt0aGlzLmdsPWEsdGhpcy5vcmlnaW49bmV3IGIsdGhpcy5kaXJlY3Rpb249bmV3IGJ9Y2FzdE1vdXNlKGEsYj1bMCwwXSl7YS53b3JsZE1hdHJpeC5nZXRUcmFuc2xhdGlvbih0aGlzLm9yaWdpbiksdGhpcy5kaXJlY3Rpb24uc2V0KGJbMF0sYlsxXSwuNSksYS51bnByb2plY3QodGhpcy5kaXJlY3Rpb24pLHRoaXMuZGlyZWN0aW9uLnN1Yih0aGlzLm9yaWdpbikubm9ybWFsaXplKCl9aW50ZXJzZWN0Qm91bmRzKGEpe0FycmF5LmlzQXJyYXkoYSl8fChhPVthXSk7bGV0IGQ9YWksZT1hZixmPWFnLGM9W107cmV0dXJuIGEuZm9yRWFjaChhPT57YS5nZW9tZXRyeS5ib3VuZHN8fGEuZ2VvbWV0cnkuY29tcHV0ZUJvdW5kaW5nQm94KCksXCJzcGhlcmVcIj09PWEuZ2VvbWV0cnkucmF5Y2FzdCYmYS5nZW9tZXRyeS5ib3VuZHM9PT0xLzAmJmEuZ2VvbWV0cnkuY29tcHV0ZUJvdW5kaW5nU3BoZXJlKCksZC5pbnZlcnNlKGEud29ybGRNYXRyaXgpLGUuY29weSh0aGlzLm9yaWdpbikuYXBwbHlNYXRyaXg0KGQpLGYuY29weSh0aGlzLmRpcmVjdGlvbikudHJhbnNmb3JtRGlyZWN0aW9uKGQpO2xldCBnPTA7KGc9XCJzcGhlcmVcIj09PWEuZ2VvbWV0cnkucmF5Y2FzdD90aGlzLmludGVyc2VjdFNwaGVyZShhLmdlb21ldHJ5LmJvdW5kcyxlLGYpOnRoaXMuaW50ZXJzZWN0Qm94KGEuZ2VvbWV0cnkuYm91bmRzLGUsZikpJiYoYS5oaXR8fChhLmhpdD17bG9jYWxQb2ludDpuZXcgYn0pLGEuaGl0LmRpc3RhbmNlPWcsYS5oaXQubG9jYWxQb2ludC5jb3B5KGYpLm11bHRpcGx5KGcpLmFkZChlKSxjLnB1c2goYSkpfSksYy5zb3J0KChhLGIpPT5hLmhpdC5kaXN0YW5jZS1iLmhpdC5kaXN0YW5jZSksY31pbnRlcnNlY3RTcGhlcmUoYyxpPXRoaXMub3JpZ2luLGo9dGhpcy5kaXJlY3Rpb24pe2xldCBhPWFoO2Euc3ViKGMuY2VudGVyLGkpO2xldCBiPWEuZG90KGopLGU9YS5kb3QoYSktYipiLGY9Yy5yYWRpdXMqYy5yYWRpdXM7aWYoZT5mKXJldHVybiAwO2xldCBnPU1hdGguc3FydChmLWUpLGQ9Yi1nLGg9YitnO3JldHVybiBkPDAmJmg8MD8wOmQ8MD9oOmR9aW50ZXJzZWN0Qm94KG4sYz10aGlzLm9yaWdpbixrPXRoaXMuZGlyZWN0aW9uKXtsZXQgYSxiLGYsbCxnLG0saD0xL2sueCxpPTEvay55LGo9MS9rLnosZD1uLm1pbixlPW4ubWF4O3JldHVybiBhPSgoaD49MD9kLng6ZS54KS1jLngpKmgsYj0oKGg+PTA/ZS54OmQueCktYy54KSpoLGY9KChpPj0wP2QueTplLnkpLWMueSkqaSxhPihsPSgoaT49MD9lLnk6ZC55KS1jLnkpKmkpfHxmPmI/MDooZj5hJiYoYT1mKSxsPGImJihiPWwpLGc9KChqPj0wP2QuejplLnopLWMueikqaixhPihtPSgoaj49MD9lLno6ZC56KS1jLnopKmopfHxnPmI/MDooZz5hJiYoYT1nKSxtPGImJihiPW0pLGI8MD8wOmE+PTA/YTpiKSl9fSxhLlJlbmRlclRhcmdldD1wLGEuUmVuZGVyZXI9Y2xhc3N7Y29uc3RydWN0b3Ioe2NhbnZhczphPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIiksd2lkdGg6Zz0zMDAsaGVpZ2h0Omg9MTUwLGRwcjppPTEsYWxwaGE6Yz0hMSxkZXB0aDpkPSEwLHN0ZW5jaWw6ZT0hMSxhbnRpYWxpYXM6aj0hMSxwcmVtdWx0aXBsaWVkQWxwaGE6Zj0hMSxwcmVzZXJ2ZURyYXdpbmdCdWZmZXI6az0hMSxwb3dlclByZWZlcmVuY2U6bD1cImRlZmF1bHRcIixhdXRvQ2xlYXI6bT0hMCx3ZWJnbDpuPTJ9PXt9KXtsZXQgYj17YWxwaGE6YyxkZXB0aDpkLHN0ZW5jaWw6ZSxhbnRpYWxpYXM6aixwcmVtdWx0aXBsaWVkQWxwaGE6ZixwcmVzZXJ2ZURyYXdpbmdCdWZmZXI6ayxwb3dlclByZWZlcmVuY2U6bH07dGhpcy5kcHI9aSx0aGlzLmFscGhhPWMsdGhpcy5jb2xvcj0hMCx0aGlzLmRlcHRoPWQsdGhpcy5zdGVuY2lsPWUsdGhpcy5wcmVtdWx0aXBsaWVkQWxwaGE9Zix0aGlzLmF1dG9DbGVhcj1tLDI9PT1uJiYodGhpcy5nbD1hLmdldENvbnRleHQoXCJ3ZWJnbDJcIixiKSksdGhpcy5pc1dlYmdsMj0hIXRoaXMuZ2wsdGhpcy5nbHx8KHRoaXMuZ2w9YS5nZXRDb250ZXh0KFwid2ViZ2xcIixiKXx8YS5nZXRDb250ZXh0KFwiZXhwZXJpbWVudGFsLXdlYmdsXCIsYikpLHRoaXMuZ2wucmVuZGVyZXI9dGhpcyx0aGlzLnNldFNpemUoZyxoKSx0aGlzLnBhcmFtZXRlcnM9e30sdGhpcy5wYXJhbWV0ZXJzLm1heFRleHR1cmVVbml0cz10aGlzLmdsLmdldFBhcmFtZXRlcih0aGlzLmdsLk1BWF9DT01CSU5FRF9URVhUVVJFX0lNQUdFX1VOSVRTKSx0aGlzLnN0YXRlPXt9LHRoaXMuc3RhdGUuYmxlbmRGdW5jPXtzcmM6dGhpcy5nbC5PTkUsZHN0OnRoaXMuZ2wuWkVST30sdGhpcy5zdGF0ZS5ibGVuZEVxdWF0aW9uPXttb2RlUkdCOnRoaXMuZ2wuRlVOQ19BRER9LHRoaXMuc3RhdGUuY3VsbEZhY2U9bnVsbCx0aGlzLnN0YXRlLmZyb250RmFjZT10aGlzLmdsLkNDVyx0aGlzLnN0YXRlLmRlcHRoTWFzaz0hMCx0aGlzLnN0YXRlLmRlcHRoRnVuYz10aGlzLmdsLkxFU1MsdGhpcy5zdGF0ZS5wcmVtdWx0aXBseUFscGhhPSExLHRoaXMuc3RhdGUuZmxpcFk9ITEsdGhpcy5zdGF0ZS51bnBhY2tBbGlnbm1lbnQ9NCx0aGlzLnN0YXRlLmZyYW1lYnVmZmVyPW51bGwsdGhpcy5zdGF0ZS52aWV3cG9ydD17d2lkdGg6bnVsbCxoZWlnaHQ6bnVsbH0sdGhpcy5zdGF0ZS50ZXh0dXJlVW5pdHM9W10sdGhpcy5zdGF0ZS5hY3RpdmVUZXh0dXJlVW5pdD0wLHRoaXMuc3RhdGUuYm91bmRCdWZmZXI9bnVsbCx0aGlzLnN0YXRlLnVuaWZvcm1Mb2NhdGlvbnM9bmV3IE1hcCx0aGlzLmV4dGVuc2lvbnM9e30sdGhpcy5pc1dlYmdsMj8odGhpcy5nZXRFeHRlbnNpb24oXCJFWFRfY29sb3JfYnVmZmVyX2Zsb2F0XCIpLHRoaXMuZ2V0RXh0ZW5zaW9uKFwiT0VTX3RleHR1cmVfZmxvYXRfbGluZWFyXCIpKToodGhpcy5nZXRFeHRlbnNpb24oXCJPRVNfdGV4dHVyZV9mbG9hdFwiKSx0aGlzLmdldEV4dGVuc2lvbihcIk9FU190ZXh0dXJlX2Zsb2F0X2xpbmVhclwiKSx0aGlzLmdldEV4dGVuc2lvbihcIk9FU190ZXh0dXJlX2hhbGZfZmxvYXRcIiksdGhpcy5nZXRFeHRlbnNpb24oXCJPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0X2xpbmVhclwiKSx0aGlzLmdldEV4dGVuc2lvbihcIk9FU19lbGVtZW50X2luZGV4X3VpbnRcIiksdGhpcy5nZXRFeHRlbnNpb24oXCJPRVNfc3RhbmRhcmRfZGVyaXZhdGl2ZXNcIiksdGhpcy5nZXRFeHRlbnNpb24oXCJFWFRfc1JHQlwiKSx0aGlzLmdldEV4dGVuc2lvbihcIldFQkdMX2RlcHRoX3RleHR1cmVcIikpLHRoaXMudmVydGV4QXR0cmliRGl2aXNvcj10aGlzLmdldEV4dGVuc2lvbihcIkFOR0xFX2luc3RhbmNlZF9hcnJheXNcIixcInZlcnRleEF0dHJpYkRpdmlzb3JcIixcInZlcnRleEF0dHJpYkRpdmlzb3JBTkdMRVwiKSx0aGlzLmRyYXdBcnJheXNJbnN0YW5jZWQ9dGhpcy5nZXRFeHRlbnNpb24oXCJBTkdMRV9pbnN0YW5jZWRfYXJyYXlzXCIsXCJkcmF3QXJyYXlzSW5zdGFuY2VkXCIsXCJkcmF3QXJyYXlzSW5zdGFuY2VkQU5HTEVcIiksdGhpcy5kcmF3RWxlbWVudHNJbnN0YW5jZWQ9dGhpcy5nZXRFeHRlbnNpb24oXCJBTkdMRV9pbnN0YW5jZWRfYXJyYXlzXCIsXCJkcmF3RWxlbWVudHNJbnN0YW5jZWRcIixcImRyYXdFbGVtZW50c0luc3RhbmNlZEFOR0xFXCIpLHRoaXMuY3JlYXRlVmVydGV4QXJyYXk9dGhpcy5nZXRFeHRlbnNpb24oXCJPRVNfdmVydGV4X2FycmF5X29iamVjdFwiLFwiY3JlYXRlVmVydGV4QXJyYXlcIixcImNyZWF0ZVZlcnRleEFycmF5T0VTXCIpLHRoaXMuYmluZFZlcnRleEFycmF5PXRoaXMuZ2V0RXh0ZW5zaW9uKFwiT0VTX3ZlcnRleF9hcnJheV9vYmplY3RcIixcImJpbmRWZXJ0ZXhBcnJheVwiLFwiYmluZFZlcnRleEFycmF5T0VTXCIpLHRoaXMuZGVsZXRlVmVydGV4QXJyYXk9dGhpcy5nZXRFeHRlbnNpb24oXCJPRVNfdmVydGV4X2FycmF5X29iamVjdFwiLFwiZGVsZXRlVmVydGV4QXJyYXlcIixcImRlbGV0ZVZlcnRleEFycmF5T0VTXCIpfXNldFNpemUoYSxiKXt0aGlzLndpZHRoPWEsdGhpcy5oZWlnaHQ9Yix0aGlzLmdsLmNhbnZhcy53aWR0aD1hKnRoaXMuZHByLHRoaXMuZ2wuY2FudmFzLmhlaWdodD1iKnRoaXMuZHByLE9iamVjdC5hc3NpZ24odGhpcy5nbC5jYW52YXMuc3R5bGUse3dpZHRoOmErXCJweFwiLGhlaWdodDpiK1wicHhcIn0pfXNldFZpZXdwb3J0KGEsYil7dGhpcy5zdGF0ZS52aWV3cG9ydC53aWR0aD09PWEmJnRoaXMuc3RhdGUudmlld3BvcnQuaGVpZ2h0PT09Ynx8KHRoaXMuc3RhdGUudmlld3BvcnQud2lkdGg9YSx0aGlzLnN0YXRlLnZpZXdwb3J0LmhlaWdodD1iLHRoaXMuZ2wudmlld3BvcnQoMCwwLGEsYikpfWVuYWJsZShhKXshMCE9PXRoaXMuc3RhdGVbYV0mJih0aGlzLmdsLmVuYWJsZShhKSx0aGlzLnN0YXRlW2FdPSEwKX1kaXNhYmxlKGEpeyExIT09dGhpcy5zdGF0ZVthXSYmKHRoaXMuZ2wuZGlzYWJsZShhKSx0aGlzLnN0YXRlW2FdPSExKX1zZXRCbGVuZEZ1bmMoYSxiLGMsZCl7dGhpcy5zdGF0ZS5ibGVuZEZ1bmMuc3JjPT09YSYmdGhpcy5zdGF0ZS5ibGVuZEZ1bmMuZHN0PT09YiYmdGhpcy5zdGF0ZS5ibGVuZEZ1bmMuc3JjQWxwaGE9PT1jJiZ0aGlzLnN0YXRlLmJsZW5kRnVuYy5kc3RBbHBoYT09PWR8fCh0aGlzLnN0YXRlLmJsZW5kRnVuYy5zcmM9YSx0aGlzLnN0YXRlLmJsZW5kRnVuYy5kc3Q9Yix0aGlzLnN0YXRlLmJsZW5kRnVuYy5zcmNBbHBoYT1jLHRoaXMuc3RhdGUuYmxlbmRGdW5jLmRzdEFscGhhPWQsdm9pZCAwIT09Yz90aGlzLmdsLmJsZW5kRnVuY1NlcGFyYXRlKGEsYixjLGQpOnRoaXMuZ2wuYmxlbmRGdW5jKGEsYikpfXNldEJsZW5kRXF1YXRpb24oYSxiKXt0aGlzLnN0YXRlLmJsZW5kRXF1YXRpb24ubW9kZVJHQj09PWEmJnRoaXMuc3RhdGUuYmxlbmRFcXVhdGlvbi5tb2RlQWxwaGE9PT1ifHwodGhpcy5zdGF0ZS5ibGVuZEVxdWF0aW9uLm1vZGVSR0I9YSx0aGlzLnN0YXRlLmJsZW5kRXF1YXRpb24ubW9kZUFscGhhPWIsdm9pZCAwIT09Yj90aGlzLmdsLmJsZW5kRXF1YXRpb25TZXBhcmF0ZShhLGIpOnRoaXMuZ2wuYmxlbmRFcXVhdGlvbihhKSl9c2V0Q3VsbEZhY2UoYSl7dGhpcy5zdGF0ZS5jdWxsRmFjZSE9PWEmJih0aGlzLnN0YXRlLmN1bGxGYWNlPWEsdGhpcy5nbC5jdWxsRmFjZShhKSl9c2V0RnJvbnRGYWNlKGEpe3RoaXMuc3RhdGUuZnJvbnRGYWNlIT09YSYmKHRoaXMuc3RhdGUuZnJvbnRGYWNlPWEsdGhpcy5nbC5mcm9udEZhY2UoYSkpfXNldERlcHRoTWFzayhhKXt0aGlzLnN0YXRlLmRlcHRoTWFzayE9PWEmJih0aGlzLnN0YXRlLmRlcHRoTWFzaz1hLHRoaXMuZ2wuZGVwdGhNYXNrKGEpKX1zZXREZXB0aEZ1bmMoYSl7dGhpcy5zdGF0ZS5kZXB0aEZ1bmMhPT1hJiYodGhpcy5zdGF0ZS5kZXB0aEZ1bmM9YSx0aGlzLmdsLmRlcHRoRnVuYyhhKSl9YWN0aXZlVGV4dHVyZShhKXt0aGlzLnN0YXRlLmFjdGl2ZVRleHR1cmVVbml0IT09YSYmKHRoaXMuc3RhdGUuYWN0aXZlVGV4dHVyZVVuaXQ9YSx0aGlzLmdsLmFjdGl2ZVRleHR1cmUodGhpcy5nbC5URVhUVVJFMCthKSl9YmluZEZyYW1lYnVmZmVyKHt0YXJnZXQ6Yj10aGlzLmdsLkZSQU1FQlVGRkVSLGJ1ZmZlcjphPW51bGx9PXt9KXt0aGlzLnN0YXRlLmZyYW1lYnVmZmVyIT09YSYmKHRoaXMuc3RhdGUuZnJhbWVidWZmZXI9YSx0aGlzLmdsLmJpbmRGcmFtZWJ1ZmZlcihiLGEpKX1nZXRFeHRlbnNpb24oYSxiLGMpe3JldHVybiBiJiZ0aGlzLmdsW2JdP3RoaXMuZ2xbYl0uYmluZCh0aGlzLmdsKToodGhpcy5leHRlbnNpb25zW2FdfHwodGhpcy5leHRlbnNpb25zW2FdPXRoaXMuZ2wuZ2V0RXh0ZW5zaW9uKGEpKSxiP3RoaXMuZXh0ZW5zaW9uc1thXVtjXS5iaW5kKHRoaXMuZXh0ZW5zaW9uc1thXSk6dGhpcy5leHRlbnNpb25zW2FdKX1zb3J0T3BhcXVlKGEsYil7cmV0dXJuIGEucmVuZGVyT3JkZXIhPT1iLnJlbmRlck9yZGVyP2EucmVuZGVyT3JkZXItYi5yZW5kZXJPcmRlcjphLnByb2dyYW0uaWQhPT1iLnByb2dyYW0uaWQ/YS5wcm9ncmFtLmlkLWIucHJvZ3JhbS5pZDphLnpEZXB0aCE9PWIuekRlcHRoP2EuekRlcHRoLWIuekRlcHRoOmIuaWQtYS5pZH1zb3J0VHJhbnNwYXJlbnQoYSxiKXtyZXR1cm4gYS5yZW5kZXJPcmRlciE9PWIucmVuZGVyT3JkZXI/YS5yZW5kZXJPcmRlci1iLnJlbmRlck9yZGVyOmEuekRlcHRoIT09Yi56RGVwdGg/Yi56RGVwdGgtYS56RGVwdGg6Yi5pZC1hLmlkfXNvcnRVSShhLGIpe3JldHVybiBhLnJlbmRlck9yZGVyIT09Yi5yZW5kZXJPcmRlcj9hLnJlbmRlck9yZGVyLWIucmVuZGVyT3JkZXI6YS5wcm9ncmFtLmlkIT09Yi5wcm9ncmFtLmlkP2EucHJvZ3JhbS5pZC1iLnByb2dyYW0uaWQ6Yi5pZC1hLmlkfWdldFJlbmRlckxpc3Qoe3NjZW5lOmYsY2FtZXJhOmIsZnJ1c3R1bUN1bGw6Zyxzb3J0Omh9KXtsZXQgYT1bXTtpZihiJiZnJiZiLnVwZGF0ZUZydXN0dW0oKSxmLnRyYXZlcnNlKGM9PntpZighYy52aXNpYmxlKXJldHVybiEwO2MuZHJhdyYmKGcmJmMuZnJ1c3R1bUN1bGxlZCYmYiYmIWIuZnJ1c3R1bUludGVyc2VjdHNNZXNoKGMpfHxhLnB1c2goYykpfSksaCl7bGV0IGM9W10sZD1bXSxlPVtdO2EuZm9yRWFjaChhPT57YS5wcm9ncmFtLnRyYW5zcGFyZW50P2EucHJvZ3JhbS5kZXB0aFRlc3Q/ZC5wdXNoKGEpOmUucHVzaChhKTpjLnB1c2goYSksYS56RGVwdGg9MCwwPT09YS5yZW5kZXJPcmRlciYmYS5wcm9ncmFtLmRlcHRoVGVzdCYmYiYmKGEud29ybGRNYXRyaXguZ2V0VHJhbnNsYXRpb24oSyksSy5hcHBseU1hdHJpeDQoYi5wcm9qZWN0aW9uVmlld01hdHJpeCksYS56RGVwdGg9Sy56KX0pLGMuc29ydCh0aGlzLnNvcnRPcGFxdWUpLGQuc29ydCh0aGlzLnNvcnRUcmFuc3BhcmVudCksZS5zb3J0KHRoaXMuc29ydFVJKSxhPWMuY29uY2F0KGQsZSl9cmV0dXJuIGF9cmVuZGVyKHtzY2VuZTpjLGNhbWVyYTpiLHRhcmdldDphPW51bGwsdXBkYXRlOmU9ITAsc29ydDpmPSEwLGZydXN0dW1DdWxsOmc9ITAsY2xlYXI6ZH0pe251bGw9PT1hPyh0aGlzLmJpbmRGcmFtZWJ1ZmZlcigpLHRoaXMuc2V0Vmlld3BvcnQodGhpcy53aWR0aCp0aGlzLmRwcix0aGlzLmhlaWdodCp0aGlzLmRwcikpOih0aGlzLmJpbmRGcmFtZWJ1ZmZlcihhKSx0aGlzLnNldFZpZXdwb3J0KGEud2lkdGgsYS5oZWlnaHQpKSwoZHx8dGhpcy5hdXRvQ2xlYXImJiAhMSE9PWQpJiYoIXRoaXMuZGVwdGh8fGEmJmEuZGVwdGh8fCh0aGlzLmVuYWJsZSh0aGlzLmdsLkRFUFRIX1RFU1QpLHRoaXMuc2V0RGVwdGhNYXNrKCEwKSksdGhpcy5nbC5jbGVhcigodGhpcy5jb2xvcj90aGlzLmdsLkNPTE9SX0JVRkZFUl9CSVQ6MCl8KHRoaXMuZGVwdGg/dGhpcy5nbC5ERVBUSF9CVUZGRVJfQklUOjApfCh0aGlzLnN0ZW5jaWw/dGhpcy5nbC5TVEVOQ0lMX0JVRkZFUl9CSVQ6MCkpKSxlJiZjLnVwZGF0ZU1hdHJpeFdvcmxkKCksYiYmbnVsbD09PWIucGFyZW50JiZiLnVwZGF0ZU1hdHJpeFdvcmxkKCksdGhpcy5nZXRSZW5kZXJMaXN0KHtzY2VuZTpjLGNhbWVyYTpiLGZydXN0dW1DdWxsOmcsc29ydDpmfSkuZm9yRWFjaChhPT57YS5kcmF3KHtjYW1lcmE6Yn0pfSl9fSxhLlNraW49Y2xhc3MgZXh0ZW5kcyBue2NvbnN0cnVjdG9yKGEse3JpZzpiLGdlb21ldHJ5OmMscHJvZ3JhbTpkLG1vZGU6ZT1hLlRSSUFOR0xFU309e30pe3N1cGVyKGEse2dlb21ldHJ5OmMscHJvZ3JhbTpkLG1vZGU6ZX0pLHRoaXMuY3JlYXRlQm9uZXMoYiksdGhpcy5jcmVhdGVCb25lVGV4dHVyZSgpLHRoaXMuYW5pbWF0aW9ucz1bXSxPYmplY3QuYXNzaWduKHRoaXMucHJvZ3JhbS51bmlmb3Jtcyx7Ym9uZVRleHR1cmU6e3ZhbHVlOnRoaXMuYm9uZVRleHR1cmV9LGJvbmVUZXh0dXJlU2l6ZTp7dmFsdWU6dGhpcy5ib25lVGV4dHVyZVNpemV9fSl9Y3JlYXRlQm9uZXMoYSl7aWYodGhpcy5yb290PW5ldyBnLHRoaXMuYm9uZXM9W10sYS5ib25lcyYmYS5ib25lcy5sZW5ndGgpe2ZvcihsZXQgYj0wO2I8YS5ib25lcy5sZW5ndGg7YisrKXtsZXQgZD1uZXcgZztkLnBvc2l0aW9uLmZyb21BcnJheShhLmJpbmRQb3NlLnBvc2l0aW9uLDMqYiksZC5xdWF0ZXJuaW9uLmZyb21BcnJheShhLmJpbmRQb3NlLnF1YXRlcm5pb24sNCpiKSxkLnNjYWxlLmZyb21BcnJheShhLmJpbmRQb3NlLnNjYWxlLDMqYiksdGhpcy5ib25lcy5wdXNoKGQpfWEuYm9uZXMuZm9yRWFjaCgoYSxiKT0+e2lmKHRoaXMuYm9uZXNbYl0ubmFtZT1hLm5hbWUsLTE9PT1hLnBhcmVudClyZXR1cm4gdGhpcy5ib25lc1tiXS5zZXRQYXJlbnQodGhpcy5yb290KTt0aGlzLmJvbmVzW2JdLnNldFBhcmVudCh0aGlzLmJvbmVzW2EucGFyZW50XSl9KSx0aGlzLnJvb3QudXBkYXRlTWF0cml4V29ybGQoITApLHRoaXMuYm9uZXMuZm9yRWFjaChhPT57YS5iaW5kSW52ZXJzZT1uZXcgYyguLi5hLndvcmxkTWF0cml4KS5pbnZlcnNlKCl9KX19Y3JlYXRlQm9uZVRleHR1cmUoKXtpZighdGhpcy5ib25lcy5sZW5ndGgpcmV0dXJuO2xldCBhPU1hdGgubWF4KDQsTWF0aC5wb3coMixNYXRoLmNlaWwoTWF0aC5sb2coTWF0aC5zcXJ0KDQqdGhpcy5ib25lcy5sZW5ndGgpKS9NYXRoLkxOMikpKTt0aGlzLmJvbmVNYXRyaWNlcz1uZXcgRmxvYXQzMkFycmF5KGEqYSo0KSx0aGlzLmJvbmVUZXh0dXJlU2l6ZT1hLHRoaXMuYm9uZVRleHR1cmU9bmV3IG8odGhpcy5nbCx7aW1hZ2U6dGhpcy5ib25lTWF0cmljZXMsZ2VuZXJhdGVNaXBtYXBzOiExLHR5cGU6dGhpcy5nbC5GTE9BVCxpbnRlcm5hbEZvcm1hdDp0aGlzLmdsLnJlbmRlcmVyLmlzV2ViZ2wyP3RoaXMuZ2wuUkdCQTE2Rjp0aGlzLmdsLlJHQkEsZmxpcFk6ITEsd2lkdGg6YX0pfWFkZEFuaW1hdGlvbihiKXtsZXQgYT1uZXcgcyh7b2JqZWN0czp0aGlzLmJvbmVzLGRhdGE6Yn0pO3JldHVybiB0aGlzLmFuaW1hdGlvbnMucHVzaChhKSxhfXVwZGF0ZSgpe2xldCBhPTA7dGhpcy5hbmltYXRpb25zLmZvckVhY2goYj0+YSs9Yi53ZWlnaHQpLHRoaXMuYW5pbWF0aW9ucy5mb3JFYWNoKChiLGMpPT57Yi51cGRhdGUoYSwwPT09Yyl9KX1kcmF3KHtjYW1lcmE6YX09e30pe3RoaXMucm9vdC51cGRhdGVNYXRyaXhXb3JsZCghMCksdGhpcy5ib25lcy5mb3JFYWNoKChhLGIpPT57YXAubXVsdGlwbHkoYS53b3JsZE1hdHJpeCxhLmJpbmRJbnZlcnNlKSx0aGlzLmJvbmVNYXRyaWNlcy5zZXQoYXAsMTYqYil9KSx0aGlzLmJvbmVUZXh0dXJlJiYodGhpcy5ib25lVGV4dHVyZS5uZWVkc1VwZGF0ZT0hMCksc3VwZXIuZHJhdyh7Y2FtZXJhOmF9KX19LGEuU3BoZXJlPWNsYXNzIGV4dGVuZHMgZntjb25zdHJ1Y3RvcihGLHtyYWRpdXM6cD0uNSx3aWR0aFNlZ21lbnRzOnU9MTYsaGVpZ2h0U2VnbWVudHM6Rz1NYXRoLmNlaWwoLjUqdSkscGhpU3RhcnQ6SD0wLHBoaUxlbmd0aDpJPTIqTWF0aC5QSSx0aGV0YVN0YXJ0Oko9MCx0aGV0YUxlbmd0aDpLPU1hdGguUEksYXR0cmlidXRlczp2PXt9fT17fSl7bGV0IGg9dSxmPUcsdz1ILHg9SSxpPUosaz1LLGw9KGgrMSkqKGYrMSkseT1oKmYqNixtPW5ldyBGbG9hdDMyQXJyYXkoMypsKSxuPW5ldyBGbG9hdDMyQXJyYXkoMypsKSxxPW5ldyBGbG9hdDMyQXJyYXkoMipsKSxlPWw+NjU1MzY/bmV3IFVpbnQzMkFycmF5KHkpOm5ldyBVaW50MTZBcnJheSh5KSxhPTAsTD0wLGM9MCxNPWkrayxqPVtdLF89bmV3IGI7Zm9yKGxldCByPTA7cjw9ZjtyKyspe2xldCB6PVtdLG89ci9mO2ZvcihsZXQgcz0wO3M8PWg7cysrLGErKyl7bGV0IHQ9cy9oLEE9LXAqTWF0aC5jb3Modyt0KngpKk1hdGguc2luKGkrbyprKSxCPXAqTWF0aC5jb3MoaStvKmspLEM9cCpNYXRoLnNpbih3K3QqeCkqTWF0aC5zaW4oaStvKmspO21bMyphXT1BLG1bMyphKzFdPUIsbVszKmErMl09QyxfLnNldChBLEIsQykubm9ybWFsaXplKCksblszKmFdPV8ueCxuWzMqYSsxXT1fLnksblszKmErMl09Xy56LHFbMiphXT10LHFbMiphKzFdPTEtbyx6LnB1c2goTCsrKX1qLnB1c2goeil9Zm9yKGxldCBkPTA7ZDxmO2QrKylmb3IobGV0IGc9MDtnPGg7ZysrKXtsZXQgTj1qW2RdW2crMV0sRD1qW2RdW2ddLE89altkKzFdW2ddLEU9altkKzFdW2crMV07KDAhPT1kfHxpPjApJiYoZVszKmNdPU4sZVszKmMrMV09RCxlWzMqYysyXT1FLGMrKyksKGQhPT1mLTF8fE08TWF0aC5QSSkmJihlWzMqY109RCxlWzMqYysxXT1PLGVbMypjKzJdPUUsYysrKX1PYmplY3QuYXNzaWduKHYse3Bvc2l0aW9uOntzaXplOjMsZGF0YTptfSxub3JtYWw6e3NpemU6MyxkYXRhOm59LHV2OntzaXplOjIsZGF0YTpxfSxpbmRleDp7ZGF0YTplfX0pLHN1cGVyKEYsdil9fSxhLlRleHQ9ZnVuY3Rpb24oe2ZvbnQ6YSx0ZXh0OmQsd2lkdGg6ZT0xLzAsYWxpZ246Zj1cImxlZnRcIixzaXplOmc9MSxsZXR0ZXJTcGFjaW5nOmg9MCxsaW5lSGVpZ2h0Omk9MS40LHdvcmRTcGFjaW5nOmo9MCx3b3JkQnJlYWs6az0hMX0pe2xldCBsPXRoaXMsYixtLG4sbyxwLHE9L1xcbi8scj0vXFxzLztmdW5jdGlvbiBjKCl7bj1hLmNvbW1vbi5saW5lSGVpZ2h0LG89YS5jb21tb24uYmFzZSxwPWcvbztsZXQgYz1kLnJlcGxhY2UoL1sgXFxuXS9nLFwiXCIpLmxlbmd0aDttPXtwb3NpdGlvbjpuZXcgRmxvYXQzMkFycmF5KDQqYyozKSx1djpuZXcgRmxvYXQzMkFycmF5KDQqYyoyKSxpZDpuZXcgRmxvYXQzMkFycmF5KDQqYyksaW5kZXg6bmV3IFVpbnQxNkFycmF5KDYqYyl9O2ZvcihsZXQgYj0wO2I8YztiKyspbS5pZFtiXT1iLG0uaW5kZXguc2V0KFs0KmIsNCpiKzIsNCpiKzEsNCpiKzEsNCpiKzIsNCpiKzNdLDYqYik7cygpfWZ1bmN0aW9uIHMoKXtsZXQgeT1bXSxuPTAsdT0wLG89MCxjPXcoKTtmdW5jdGlvbiB3KCl7bGV0IGE9e3dpZHRoOjAsZ2x5cGhzOltdfTtyZXR1cm4geS5wdXNoKGEpLHU9bixvPTAsYX1sZXQgej0wO2Zvcig7bjxkLmxlbmd0aCYmejwxMDA7KXt6Kys7bGV0IHY9ZFtuXTtpZighYy53aWR0aCYmci50ZXN0KHYpKXt1PSsrbixvPTA7Y29udGludWV9aWYocS50ZXN0KHYpKXtuKyssYz13KCk7Y29udGludWV9bGV0IHg9Ylt2XTtpZihjLmdseXBocy5sZW5ndGgpe2xldCBDPWMuZ2x5cGhzW2MuZ2x5cGhzLmxlbmd0aC0xXVswXSxBPXQoeC5pZCxDLmlkKSpwO2Mud2lkdGgrPUEsbys9QX1jLmdseXBocy5wdXNoKFt4LGMud2lkdGhdKTtsZXQgcz0wO2lmKHIudGVzdCh2KT8odT1uLG89MCxzKz1qKmcpOnMrPWgqZyxzKz14LnhhZHZhbmNlKnAsYy53aWR0aCs9cyxvKz1zLGMud2lkdGg+ZSl7aWYoayYmYy5nbHlwaHMubGVuZ3RoPjEpe2Mud2lkdGgtPXMsYy5nbHlwaHMucG9wKCksYz13KCk7Y29udGludWV9aWYoIWsmJm8hPT1jLndpZHRoKXtsZXQgQj1uLXUrMTtjLmdseXBocy5zcGxpY2UoLUIsQiksbj11LGMud2lkdGgtPW8sYz13KCk7Y29udGludWV9fW4rK31jLndpZHRofHx5LnBvcCgpLGZ1bmN0aW9uKG4pe2xldCBzPWEuY29tbW9uLnNjYWxlVyx0PWEuY29tbW9uLnNjYWxlSCxjPS4wNypnLG89MDtmb3IobGV0IHE9MDtxPG4ubGVuZ3RoO3ErKyl7bGV0IGU9bltxXTtmb3IobGV0IGg9MDtoPGUuZ2x5cGhzLmxlbmd0aDtoKyspe2xldCBiPWUuZ2x5cGhzW2hdWzBdLGQ9ZS5nbHlwaHNbaF1bMV07aWYoXCJjZW50ZXJcIj09PWY/ZC09LjUqZS53aWR0aDpcInJpZ2h0XCI9PT1mJiYoZC09ZS53aWR0aCksci50ZXN0KGIuY2hhcikpY29udGludWU7ZCs9Yi54b2Zmc2V0KnAsYy09Yi55b2Zmc2V0KnA7bGV0IHU9Yi53aWR0aCpwLHY9Yi5oZWlnaHQqcDttLnBvc2l0aW9uLnNldChbZCxjLXYsMCxkLGMsMCxkK3UsYy12LDAsZCt1LGMsMF0sNCpvKjMpO2xldCBqPWIueC9zLHc9Yi53aWR0aC9zLGs9MS1iLnkvdCx4PWIuaGVpZ2h0L3Q7bS51di5zZXQoW2osay14LGosayxqK3csay14LGordyxrXSw0Km8qMiksYys9Yi55b2Zmc2V0KnAsbysrfWMtPWcqaX1sLmJ1ZmZlcnM9bSxsLm51bUxpbmVzPW4ubGVuZ3RoLGwuaGVpZ2h0PWwubnVtTGluZXMqZyppfSh5KX1mdW5jdGlvbiB0KGMsZSl7Zm9yKGxldCBkPTA7ZDxhLmtlcm5pbmdzLmxlbmd0aDtkKyspe2xldCBiPWEua2VybmluZ3NbZF07aWYoIShiLmZpcnN0PGN8fGIuc2Vjb25kPGUpKXJldHVybiBiLmZpcnN0PmM/MDpiLmZpcnN0PT09YyYmYi5zZWNvbmQ+ZT8wOmIuYW1vdW50fXJldHVybiAwfWI9e30sYS5jaGFycy5mb3JFYWNoKGE9PmJbYS5jaGFyXT1hKSxjKCksdGhpcy5yZXNpemU9ZnVuY3Rpb24oYSl7KHt3aWR0aDplfT1hKSxzKCl9LHRoaXMudXBkYXRlPWZ1bmN0aW9uKGEpeyh7dGV4dDpkfT1hKSxjKCl9fSxhLlRleHR1cmU9byxhLlRyYW5zZm9ybT1nLGEuVmVjMj1lLGEuVmVjMz1iLGEuVmVjND1jbGFzcyBleHRlbmRzIEFycmF5e2NvbnN0cnVjdG9yKGE9MCxiPWEsYz1hLGQ9YSl7cmV0dXJuIHN1cGVyKGEsYixjLGQpLHRoaXN9Z2V0IHgoKXtyZXR1cm4gdGhpc1swXX1zZXQgeChhKXt0aGlzWzBdPWF9Z2V0IHkoKXtyZXR1cm4gdGhpc1sxXX1zZXQgeShhKXt0aGlzWzFdPWF9Z2V0IHooKXtyZXR1cm4gdGhpc1syXX1zZXQgeihhKXt0aGlzWzJdPWF9Z2V0IHcoKXtyZXR1cm4gdGhpc1szXX1zZXQgdyhhKXt0aGlzWzNdPWF9c2V0KGEsYixjLGQpe3JldHVybiBhLmxlbmd0aD90aGlzLmNvcHkoYSk6KGoodGhpcyxhLGIsYyxkKSx0aGlzKX1jb3B5KGEpe3JldHVybiBpKHRoaXMsYSksdGhpc31ub3JtYWxpemUoKXtyZXR1cm4gayh0aGlzLHRoaXMpLHRoaXN9ZnJvbUFycmF5KGEsYj0wKXtyZXR1cm4gdGhpc1swXT1hW2JdLHRoaXNbMV09YVtiKzFdLHRoaXNbMl09YVtiKzJdLHRoaXNbM109YVtiKzNdLHRoaXN9dG9BcnJheShhPVtdLGI9MCl7cmV0dXJuIGFbYl09dGhpc1swXSxhW2IrMV09dGhpc1sxXSxhW2IrMl09dGhpc1syXSxhW2IrM109dGhpc1szXSxhfX0sYX0oe30pIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFIgPSB0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgPyBSZWZsZWN0IDogbnVsbFxudmFyIFJlZmxlY3RBcHBseSA9IFIgJiYgdHlwZW9mIFIuYXBwbHkgPT09ICdmdW5jdGlvbidcbiAgPyBSLmFwcGx5XG4gIDogZnVuY3Rpb24gUmVmbGVjdEFwcGx5KHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwodGFyZ2V0LCByZWNlaXZlciwgYXJncyk7XG4gIH1cblxudmFyIFJlZmxlY3RPd25LZXlzXG5pZiAoUiAmJiB0eXBlb2YgUi5vd25LZXlzID09PSAnZnVuY3Rpb24nKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gUi5vd25LZXlzXG59IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KVxuICAgICAgLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkpO1xuICB9O1xufSBlbHNlIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gUHJvY2Vzc0VtaXRXYXJuaW5nKHdhcm5pbmcpIHtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSBjb25zb2xlLndhcm4od2FybmluZyk7XG59XG5cbnZhciBOdW1iZXJJc05hTiA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiBOdW1iZXJJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcbm1vZHVsZS5leHBvcnRzLm9uY2UgPSBvbmNlO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50c0NvdW50ID0gMDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxudmFyIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuZnVuY3Rpb24gY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcikge1xuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50RW1pdHRlciwgJ2RlZmF1bHRNYXhMaXN0ZW5lcnMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oYXJnKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcgIT09ICdudW1iZXInIHx8IGFyZyA8IDAgfHwgTnVtYmVySXNOYU4oYXJnKSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgYXJnICsgJy4nKTtcbiAgICB9XG4gICAgZGVmYXVsdE1heExpc3RlbmVycyA9IGFyZztcbiAgfVxufSk7XG5cbkV2ZW50RW1pdHRlci5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgaWYgKHRoaXMuX2V2ZW50cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICB0aGlzLl9ldmVudHMgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzKSB7XG4gICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufTtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBuIDwgMCB8fCBOdW1iZXJJc05hTihuKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJuXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIG4gKyAnLicpO1xuICB9XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gX2dldE1heExpc3RlbmVycyh0aGF0KSB7XG4gIGlmICh0aGF0Ll9tYXhMaXN0ZW5lcnMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIHJldHVybiB0aGF0Ll9tYXhMaXN0ZW5lcnM7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gX2dldE1heExpc3RlbmVycyh0aGlzKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICB2YXIgYXJncyA9IFtdO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIHZhciBkb0Vycm9yID0gKHR5cGUgPT09ICdlcnJvcicpO1xuXG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZClcbiAgICBkb0Vycm9yID0gKGRvRXJyb3IgJiYgZXZlbnRzLmVycm9yID09PSB1bmRlZmluZWQpO1xuICBlbHNlIGlmICghZG9FcnJvcilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAoZG9FcnJvcikge1xuICAgIHZhciBlcjtcbiAgICBpZiAoYXJncy5sZW5ndGggPiAwKVxuICAgICAgZXIgPSBhcmdzWzBdO1xuICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAvLyBOb3RlOiBUaGUgY29tbWVudHMgb24gdGhlIGB0aHJvd2AgbGluZXMgYXJlIGludGVudGlvbmFsLCB0aGV5IHNob3dcbiAgICAgIC8vIHVwIGluIE5vZGUncyBvdXRwdXQgaWYgdGhpcyByZXN1bHRzIGluIGFuIHVuaGFuZGxlZCBleGNlcHRpb24uXG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICB9XG4gICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuaGFuZGxlZCBlcnJvci4nICsgKGVyID8gJyAoJyArIGVyLm1lc3NhZ2UgKyAnKScgOiAnJykpO1xuICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgdGhyb3cgZXJyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICB9XG5cbiAgdmFyIGhhbmRsZXIgPSBldmVudHNbdHlwZV07XG5cbiAgaWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgUmVmbGVjdEFwcGx5KGhhbmRsZXIsIHRoaXMsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBSZWZsZWN0QXBwbHkobGlzdGVuZXJzW2ldLCB0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuZnVuY3Rpb24gX2FkZExpc3RlbmVyKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIsIHByZXBlbmQpIHtcbiAgdmFyIG07XG4gIHZhciBldmVudHM7XG4gIHZhciBleGlzdGluZztcblxuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRhcmdldC5fZXZlbnRzQ291bnQgPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICAgIGlmIChldmVudHMubmV3TGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0LmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyID8gbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgICAgIC8vIFJlLWFzc2lnbiBgZXZlbnRzYCBiZWNhdXNlIGEgbmV3TGlzdGVuZXIgaGFuZGxlciBjb3VsZCBoYXZlIGNhdXNlZCB0aGVcbiAgICAgIC8vIHRoaXMuX2V2ZW50cyB0byBiZSBhc3NpZ25lZCB0byBhIG5ldyBvYmplY3RcbiAgICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICAgIH1cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXTtcbiAgfVxuXG4gIGlmIChleGlzdGluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICArK3RhcmdldC5fZXZlbnRzQ291bnQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBleGlzdGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9XG4gICAgICAgIHByZXBlbmQgPyBbbGlzdGVuZXIsIGV4aXN0aW5nXSA6IFtleGlzdGluZywgbGlzdGVuZXJdO1xuICAgICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIH0gZWxzZSBpZiAocHJlcGVuZCkge1xuICAgICAgZXhpc3RpbmcudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4aXN0aW5nLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gICAgbSA9IF9nZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICBpZiAobSA+IDAgJiYgZXhpc3RpbmcubGVuZ3RoID4gbSAmJiAhZXhpc3Rpbmcud2FybmVkKSB7XG4gICAgICBleGlzdGluZy53YXJuZWQgPSB0cnVlO1xuICAgICAgLy8gTm8gZXJyb3IgY29kZSBmb3IgdGhpcyBzaW5jZSBpdCBpcyBhIFdhcm5pbmdcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nLmxlbmd0aCArICcgJyArIFN0cmluZyh0eXBlKSArICcgbGlzdGVuZXJzICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnaW5jcmVhc2UgbGltaXQnKTtcbiAgICAgIHcubmFtZSA9ICdNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmcnO1xuICAgICAgdy5lbWl0dGVyID0gdGFyZ2V0O1xuICAgICAgdy50eXBlID0gdHlwZTtcbiAgICAgIHcuY291bnQgPSBleGlzdGluZy5sZW5ndGg7XG4gICAgICBQcm9jZXNzRW1pdFdhcm5pbmcodyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuXG5mdW5jdGlvbiBvbmNlV3JhcHBlcigpIHtcbiAgaWYgKCF0aGlzLmZpcmVkKSB7XG4gICAgdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLCB0aGlzLndyYXBGbik7XG4gICAgdGhpcy5maXJlZCA9IHRydWU7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5jYWxsKHRoaXMudGFyZ2V0KTtcbiAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5hcHBseSh0aGlzLnRhcmdldCwgYXJndW1lbnRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfb25jZVdyYXAodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgc3RhdGUgPSB7IGZpcmVkOiBmYWxzZSwgd3JhcEZuOiB1bmRlZmluZWQsIHRhcmdldDogdGFyZ2V0LCB0eXBlOiB0eXBlLCBsaXN0ZW5lcjogbGlzdGVuZXIgfTtcbiAgdmFyIHdyYXBwZWQgPSBvbmNlV3JhcHBlci5iaW5kKHN0YXRlKTtcbiAgd3JhcHBlZC5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICBzdGF0ZS53cmFwRm4gPSB3cmFwcGVkO1xuICByZXR1cm4gd3JhcHBlZDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgdGhpcy5vbih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRPbmNlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgICAgdGhpcy5wcmVwZW5kTGlzdGVuZXIodHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4vLyBFbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWYgYW5kIG9ubHkgaWYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBsaXN0LCBldmVudHMsIHBvc2l0aW9uLCBpLCBvcmlnaW5hbExpc3RlbmVyO1xuXG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgbGlzdCA9IGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHwgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3QubGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yIChpID0gbGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fCBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgb3JpZ2luYWxMaXN0ZW5lciA9IGxpc3RbaV0ubGlzdGVuZXI7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMClcbiAgICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNwbGljZU9uZShsaXN0LCBwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgZXZlbnRzW3R5cGVdID0gbGlzdFswXTtcblxuICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIG9yaWdpbmFsTGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbiAgICBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnModHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycywgZXZlbnRzLCBpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudHNbdHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBMSUZPIG9yZGVyXG4gICAgICAgIGZvciAoaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5mdW5jdGlvbiBfbGlzdGVuZXJzKHRhcmdldCwgdHlwZSwgdW53cmFwKSB7XG4gIHZhciBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuICBpZiAoZXZsaXN0ZW5lciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIHVud3JhcCA/IFtldmxpc3RlbmVyLmxpc3RlbmVyIHx8IGV2bGlzdGVuZXJdIDogW2V2bGlzdGVuZXJdO1xuXG4gIHJldHVybiB1bndyYXAgP1xuICAgIHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKSA6IGFycmF5Q2xvbmUoZXZsaXN0ZW5lciwgZXZsaXN0ZW5lci5sZW5ndGgpO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIHRydWUpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yYXdMaXN0ZW5lcnMgPSBmdW5jdGlvbiByYXdMaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcblxuICAgIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChldmxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgcmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50ID4gMCA/IFJlZmxlY3RPd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBuKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KG4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSlcbiAgICBjb3B5W2ldID0gYXJyW2ldO1xuICByZXR1cm4gY29weTtcbn1cblxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAoOyBpbmRleCArIDEgPCBsaXN0Lmxlbmd0aDsgaW5kZXgrKylcbiAgICBsaXN0W2luZGV4XSA9IGxpc3RbaW5kZXggKyAxXTtcbiAgbGlzdC5wb3AoKTtcbn1cblxuZnVuY3Rpb24gdW53cmFwTGlzdGVuZXJzKGFycikge1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGFyci5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5sZW5ndGg7ICsraSkge1xuICAgIHJldFtpXSA9IGFycltpXS5saXN0ZW5lciB8fCBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gb25jZShlbWl0dGVyLCBuYW1lKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgZnVuY3Rpb24gZXJyb3JMaXN0ZW5lcihlcnIpIHtcbiAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIobmFtZSwgcmVzb2x2ZXIpO1xuICAgICAgcmVqZWN0KGVycik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzb2x2ZXIoKSB7XG4gICAgICBpZiAodHlwZW9mIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBlcnJvckxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICB9O1xuXG4gICAgZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsIG5hbWUsIHJlc29sdmVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgaWYgKG5hbWUgIT09ICdlcnJvcicpIHtcbiAgICAgIGFkZEVycm9ySGFuZGxlcklmRXZlbnRFbWl0dGVyKGVtaXR0ZXIsIGVycm9yTGlzdGVuZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlcihlbWl0dGVyLCBoYW5kbGVyLCBmbGFncykge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgJ2Vycm9yJywgaGFuZGxlciwgZmxhZ3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCBuYW1lLCBsaXN0ZW5lciwgZmxhZ3MpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLm9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKGZsYWdzLm9uY2UpIHtcbiAgICAgIGVtaXR0ZXIub25jZShuYW1lLCBsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVtaXR0ZXIub24obmFtZSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gRXZlbnRUYXJnZXQgZG9lcyBub3QgaGF2ZSBgZXJyb3JgIGV2ZW50IHNlbWFudGljcyBsaWtlIE5vZGVcbiAgICAvLyBFdmVudEVtaXR0ZXJzLCB3ZSBkbyBub3QgbGlzdGVuIGZvciBgZXJyb3JgIGV2ZW50cyBoZXJlLlxuICAgIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBmdW5jdGlvbiB3cmFwTGlzdGVuZXIoYXJnKSB7XG4gICAgICAvLyBJRSBkb2VzIG5vdCBoYXZlIGJ1aWx0aW4gYHsgb25jZTogdHJ1ZSB9YCBzdXBwb3J0IHNvIHdlXG4gICAgICAvLyBoYXZlIHRvIGRvIGl0IG1hbnVhbGx5LlxuICAgICAgaWYgKGZsYWdzLm9uY2UpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIHdyYXBMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICBsaXN0ZW5lcihhcmcpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImVtaXR0ZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRXZlbnRFbWl0dGVyLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgZW1pdHRlcik7XG4gIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBuYW1lZF9yZWZlcmVuY2VzXzEgPSByZXF1aXJlKFwiLi9uYW1lZC1yZWZlcmVuY2VzXCIpO1xudmFyIG51bWVyaWNfdW5pY29kZV9tYXBfMSA9IHJlcXVpcmUoXCIuL251bWVyaWMtdW5pY29kZS1tYXBcIik7XG52YXIgc3Vycm9nYXRlX3BhaXJzXzEgPSByZXF1aXJlKFwiLi9zdXJyb2dhdGUtcGFpcnNcIik7XG52YXIgYWxsTmFtZWRSZWZlcmVuY2VzID0gX19hc3NpZ24oX19hc3NpZ24oe30sIG5hbWVkX3JlZmVyZW5jZXNfMS5uYW1lZFJlZmVyZW5jZXMpLCB7IGFsbDogbmFtZWRfcmVmZXJlbmNlc18xLm5hbWVkUmVmZXJlbmNlcy5odG1sNSB9KTtcbnZhciBlbmNvZGVSZWdFeHBzID0ge1xuICAgIHNwZWNpYWxDaGFyczogL1s8PidcIiZdL2csXG4gICAgbm9uQXNjaWk6IC8oPzpbPD4nXCImXFx1MDA4MC1cXHVEN0ZGXFx1RTAwMC1cXHVGRkZGXXxbXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdfFtcXHVEODAwLVxcdURCRkZdKD8hW1xcdURDMDAtXFx1REZGRl0pfCg/OlteXFx1RDgwMC1cXHVEQkZGXXxeKVtcXHVEQzAwLVxcdURGRkZdKS9nLFxuICAgIG5vbkFzY2lpUHJpbnRhYmxlOiAvKD86Wzw+J1wiJlxceDAxLVxceDA4XFx4MTEtXFx4MTVcXHgxNy1cXHgxRlxceDdmLVxcdUQ3RkZcXHVFMDAwLVxcdUZGRkZdfFtcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl18W1xcdUQ4MDAtXFx1REJGRl0oPyFbXFx1REMwMC1cXHVERkZGXSl8KD86W15cXHVEODAwLVxcdURCRkZdfF4pW1xcdURDMDAtXFx1REZGRl0pL2csXG4gICAgZXh0ZW5zaXZlOiAvKD86W1xceDAxLVxceDBjXFx4MGUtXFx4MWZcXHgyMS1cXHgyY1xceDJlLVxceDJmXFx4M2EtXFx4NDBcXHg1Yi1cXHg2MFxceDdiLVxceDdkXFx4N2YtXFx1RDdGRlxcdUUwMDAtXFx1RkZGRl18W1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXXxbXFx1RDgwMC1cXHVEQkZGXSg/IVtcXHVEQzAwLVxcdURGRkZdKXwoPzpbXlxcdUQ4MDAtXFx1REJGRl18XilbXFx1REMwMC1cXHVERkZGXSkvZ1xufTtcbnZhciBkZWZhdWx0RW5jb2RlT3B0aW9ucyA9IHtcbiAgICBtb2RlOiAnc3BlY2lhbENoYXJzJyxcbiAgICBsZXZlbDogJ2FsbCcsXG4gICAgbnVtZXJpYzogJ2RlY2ltYWwnXG59O1xuLyoqIEVuY29kZXMgYWxsIHRoZSBuZWNlc3NhcnkgKHNwZWNpZmllZCBieSBgbGV2ZWxgKSBjaGFyYWN0ZXJzIGluIHRoZSB0ZXh0ICovXG5mdW5jdGlvbiBlbmNvZGUodGV4dCwgX2EpIHtcbiAgICB2YXIgX2IgPSBfYSA9PT0gdm9pZCAwID8gZGVmYXVsdEVuY29kZU9wdGlvbnMgOiBfYSwgX2MgPSBfYi5tb2RlLCBtb2RlID0gX2MgPT09IHZvaWQgMCA/ICdzcGVjaWFsQ2hhcnMnIDogX2MsIF9kID0gX2IubnVtZXJpYywgbnVtZXJpYyA9IF9kID09PSB2b2lkIDAgPyAnZGVjaW1hbCcgOiBfZCwgX2UgPSBfYi5sZXZlbCwgbGV2ZWwgPSBfZSA9PT0gdm9pZCAwID8gJ2FsbCcgOiBfZTtcbiAgICBpZiAoIXRleHQpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICB2YXIgZW5jb2RlUmVnRXhwID0gZW5jb2RlUmVnRXhwc1ttb2RlXTtcbiAgICB2YXIgcmVmZXJlbmNlcyA9IGFsbE5hbWVkUmVmZXJlbmNlc1tsZXZlbF0uY2hhcmFjdGVycztcbiAgICB2YXIgaXNIZXggPSBudW1lcmljID09PSAnaGV4YWRlY2ltYWwnO1xuICAgIGVuY29kZVJlZ0V4cC5sYXN0SW5kZXggPSAwO1xuICAgIHZhciBfYiA9IGVuY29kZVJlZ0V4cC5leGVjKHRleHQpO1xuICAgIHZhciBfYztcbiAgICBpZiAoX2IpIHtcbiAgICAgICAgX2MgPSAnJztcbiAgICAgICAgdmFyIF9kID0gMDtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgaWYgKF9kICE9PSBfYi5pbmRleCkge1xuICAgICAgICAgICAgICAgIF9jICs9IHRleHQuc3Vic3RyaW5nKF9kLCBfYi5pbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgX2UgPSBfYlswXTtcbiAgICAgICAgICAgIHZhciByZXN1bHRfMSA9IHJlZmVyZW5jZXNbX2VdO1xuICAgICAgICAgICAgaWYgKCFyZXN1bHRfMSkge1xuICAgICAgICAgICAgICAgIHZhciBjb2RlXzEgPSBfZS5sZW5ndGggPiAxID8gc3Vycm9nYXRlX3BhaXJzXzEuZ2V0Q29kZVBvaW50KF9lLCAwKSA6IF9lLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0XzEgPSAoaXNIZXggPyAnJiN4JyArIGNvZGVfMS50b1N0cmluZygxNikgOiAnJiMnICsgY29kZV8xKSArICc7JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9jICs9IHJlc3VsdF8xO1xuICAgICAgICAgICAgX2QgPSBfYi5pbmRleCArIF9lLmxlbmd0aDtcbiAgICAgICAgfSB3aGlsZSAoKF9iID0gZW5jb2RlUmVnRXhwLmV4ZWModGV4dCkpKTtcbiAgICAgICAgaWYgKF9kICE9PSB0ZXh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgX2MgKz0gdGV4dC5zdWJzdHJpbmcoX2QpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBfYyA9XG4gICAgICAgICAgICB0ZXh0O1xuICAgIH1cbiAgICByZXR1cm4gX2M7XG59XG5leHBvcnRzLmVuY29kZSA9IGVuY29kZTtcbnZhciBkZWZhdWx0RGVjb2RlT3B0aW9ucyA9IHtcbiAgICBzY29wZTogJ2JvZHknLFxuICAgIGxldmVsOiAnYWxsJ1xufTtcbnZhciBzdHJpY3QgPSAvJig/OiNcXGQrfCNbeFhdW1xcZGEtZkEtRl0rfFswLTlhLXpBLVpdKyk7L2c7XG52YXIgYXR0cmlidXRlID0gLyYoPzojXFxkK3wjW3hYXVtcXGRhLWZBLUZdK3xbMC05YS16QS1aXSspWzs9XT8vZztcbnZhciBiYXNlRGVjb2RlUmVnRXhwcyA9IHtcbiAgICB4bWw6IHtcbiAgICAgICAgc3RyaWN0OiBzdHJpY3QsXG4gICAgICAgIGF0dHJpYnV0ZTogYXR0cmlidXRlLFxuICAgICAgICBib2R5OiBuYW1lZF9yZWZlcmVuY2VzXzEuYm9keVJlZ0V4cHMueG1sXG4gICAgfSxcbiAgICBodG1sNDoge1xuICAgICAgICBzdHJpY3Q6IHN0cmljdCxcbiAgICAgICAgYXR0cmlidXRlOiBhdHRyaWJ1dGUsXG4gICAgICAgIGJvZHk6IG5hbWVkX3JlZmVyZW5jZXNfMS5ib2R5UmVnRXhwcy5odG1sNFxuICAgIH0sXG4gICAgaHRtbDU6IHtcbiAgICAgICAgc3RyaWN0OiBzdHJpY3QsXG4gICAgICAgIGF0dHJpYnV0ZTogYXR0cmlidXRlLFxuICAgICAgICBib2R5OiBuYW1lZF9yZWZlcmVuY2VzXzEuYm9keVJlZ0V4cHMuaHRtbDVcbiAgICB9XG59O1xudmFyIGRlY29kZVJlZ0V4cHMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgYmFzZURlY29kZVJlZ0V4cHMpLCB7IGFsbDogYmFzZURlY29kZVJlZ0V4cHMuaHRtbDUgfSk7XG52YXIgZnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZTtcbnZhciBvdXRPZkJvdW5kc0NoYXIgPSBmcm9tQ2hhckNvZGUoNjU1MzMpO1xudmFyIGRlZmF1bHREZWNvZGVFbnRpdHlPcHRpb25zID0ge1xuICAgIGxldmVsOiAnYWxsJ1xufTtcbi8qKiBEZWNvZGVzIGEgc2luZ2xlIGVudGl0eSAqL1xuZnVuY3Rpb24gZGVjb2RlRW50aXR5KGVudGl0eSwgX2EpIHtcbiAgICB2YXIgX2IgPSAoX2EgPT09IHZvaWQgMCA/IGRlZmF1bHREZWNvZGVFbnRpdHlPcHRpb25zIDogX2EpLmxldmVsLCBsZXZlbCA9IF9iID09PSB2b2lkIDAgPyAnYWxsJyA6IF9iO1xuICAgIGlmICghZW50aXR5KSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgdmFyIF9iID0gZW50aXR5O1xuICAgIHZhciBkZWNvZGVFbnRpdHlMYXN0Q2hhcl8xID0gZW50aXR5W2VudGl0eS5sZW5ndGggLSAxXTtcbiAgICBpZiAoZmFsc2VcbiAgICAgICAgJiYgZGVjb2RlRW50aXR5TGFzdENoYXJfMSA9PT0gJz0nKSB7XG4gICAgICAgIF9iID1cbiAgICAgICAgICAgIGVudGl0eTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZmFsc2VcbiAgICAgICAgJiYgZGVjb2RlRW50aXR5TGFzdENoYXJfMSAhPT0gJzsnKSB7XG4gICAgICAgIF9iID1cbiAgICAgICAgICAgIGVudGl0eTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBkZWNvZGVSZXN1bHRCeVJlZmVyZW5jZV8xID0gYWxsTmFtZWRSZWZlcmVuY2VzW2xldmVsXS5lbnRpdGllc1tlbnRpdHldO1xuICAgICAgICBpZiAoZGVjb2RlUmVzdWx0QnlSZWZlcmVuY2VfMSkge1xuICAgICAgICAgICAgX2IgPSBkZWNvZGVSZXN1bHRCeVJlZmVyZW5jZV8xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGVudGl0eVswXSA9PT0gJyYnICYmIGVudGl0eVsxXSA9PT0gJyMnKSB7XG4gICAgICAgICAgICB2YXIgZGVjb2RlU2Vjb25kQ2hhcl8xID0gZW50aXR5WzJdO1xuICAgICAgICAgICAgdmFyIGRlY29kZUNvZGVfMSA9IGRlY29kZVNlY29uZENoYXJfMSA9PSAneCcgfHwgZGVjb2RlU2Vjb25kQ2hhcl8xID09ICdYJ1xuICAgICAgICAgICAgICAgID8gcGFyc2VJbnQoZW50aXR5LnN1YnN0cigzKSwgMTYpXG4gICAgICAgICAgICAgICAgOiBwYXJzZUludChlbnRpdHkuc3Vic3RyKDIpKTtcbiAgICAgICAgICAgIF9iID1cbiAgICAgICAgICAgICAgICBkZWNvZGVDb2RlXzEgPj0gMHgxMGZmZmZcbiAgICAgICAgICAgICAgICAgICAgPyBvdXRPZkJvdW5kc0NoYXJcbiAgICAgICAgICAgICAgICAgICAgOiBkZWNvZGVDb2RlXzEgPiA2NTUzNVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBzdXJyb2dhdGVfcGFpcnNfMS5mcm9tQ29kZVBvaW50KGRlY29kZUNvZGVfMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDogZnJvbUNoYXJDb2RlKG51bWVyaWNfdW5pY29kZV9tYXBfMS5udW1lcmljVW5pY29kZU1hcFtkZWNvZGVDb2RlXzFdIHx8IGRlY29kZUNvZGVfMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIF9iO1xufVxuZXhwb3J0cy5kZWNvZGVFbnRpdHkgPSBkZWNvZGVFbnRpdHk7XG4vKiogRGVjb2RlcyBhbGwgZW50aXRpZXMgaW4gdGhlIHRleHQgKi9cbmZ1bmN0aW9uIGRlY29kZSh0ZXh0LCBfYSkge1xuICAgIHZhciBkZWNvZGVTZWNvbmRDaGFyXzEgPSBfYSA9PT0gdm9pZCAwID8gZGVmYXVsdERlY29kZU9wdGlvbnMgOiBfYSwgZGVjb2RlQ29kZV8xID0gZGVjb2RlU2Vjb25kQ2hhcl8xLmxldmVsLCBsZXZlbCA9IGRlY29kZUNvZGVfMSA9PT0gdm9pZCAwID8gJ2FsbCcgOiBkZWNvZGVDb2RlXzEsIF9iID0gZGVjb2RlU2Vjb25kQ2hhcl8xLnNjb3BlLCBzY29wZSA9IF9iID09PSB2b2lkIDAgPyBsZXZlbCA9PT0gJ3htbCcgPyAnc3RyaWN0JyA6ICdib2R5JyA6IF9iO1xuICAgIGlmICghdGV4dCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHZhciBkZWNvZGVSZWdFeHAgPSBkZWNvZGVSZWdFeHBzW2xldmVsXVtzY29wZV07XG4gICAgdmFyIHJlZmVyZW5jZXMgPSBhbGxOYW1lZFJlZmVyZW5jZXNbbGV2ZWxdLmVudGl0aWVzO1xuICAgIHZhciBpc0F0dHJpYnV0ZSA9IHNjb3BlID09PSAnYXR0cmlidXRlJztcbiAgICB2YXIgaXNTdHJpY3QgPSBzY29wZSA9PT0gJ3N0cmljdCc7XG4gICAgZGVjb2RlUmVnRXhwLmxhc3RJbmRleCA9IDA7XG4gICAgdmFyIHJlcGxhY2VNYXRjaF8xID0gZGVjb2RlUmVnRXhwLmV4ZWModGV4dCk7XG4gICAgdmFyIHJlcGxhY2VSZXN1bHRfMTtcbiAgICBpZiAocmVwbGFjZU1hdGNoXzEpIHtcbiAgICAgICAgcmVwbGFjZVJlc3VsdF8xID0gJyc7XG4gICAgICAgIHZhciByZXBsYWNlTGFzdEluZGV4XzEgPSAwO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAocmVwbGFjZUxhc3RJbmRleF8xICE9PSByZXBsYWNlTWF0Y2hfMS5pbmRleCkge1xuICAgICAgICAgICAgICAgIHJlcGxhY2VSZXN1bHRfMSArPSB0ZXh0LnN1YnN0cmluZyhyZXBsYWNlTGFzdEluZGV4XzEsIHJlcGxhY2VNYXRjaF8xLmluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByZXBsYWNlSW5wdXRfMSA9IHJlcGxhY2VNYXRjaF8xWzBdO1xuICAgICAgICAgICAgdmFyIGRlY29kZVJlc3VsdF8xID0gcmVwbGFjZUlucHV0XzE7XG4gICAgICAgICAgICB2YXIgZGVjb2RlRW50aXR5TGFzdENoYXJfMiA9IHJlcGxhY2VJbnB1dF8xW3JlcGxhY2VJbnB1dF8xLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgaWYgKGlzQXR0cmlidXRlXG4gICAgICAgICAgICAgICAgJiYgZGVjb2RlRW50aXR5TGFzdENoYXJfMiA9PT0gJz0nKSB7XG4gICAgICAgICAgICAgICAgZGVjb2RlUmVzdWx0XzEgPSByZXBsYWNlSW5wdXRfMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzU3RyaWN0XG4gICAgICAgICAgICAgICAgJiYgZGVjb2RlRW50aXR5TGFzdENoYXJfMiAhPT0gJzsnKSB7XG4gICAgICAgICAgICAgICAgZGVjb2RlUmVzdWx0XzEgPSByZXBsYWNlSW5wdXRfMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBkZWNvZGVSZXN1bHRCeVJlZmVyZW5jZV8yID0gcmVmZXJlbmNlc1tyZXBsYWNlSW5wdXRfMV07XG4gICAgICAgICAgICAgICAgaWYgKGRlY29kZVJlc3VsdEJ5UmVmZXJlbmNlXzIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVjb2RlUmVzdWx0XzEgPSBkZWNvZGVSZXN1bHRCeVJlZmVyZW5jZV8yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXBsYWNlSW5wdXRfMVswXSA9PT0gJyYnICYmIHJlcGxhY2VJbnB1dF8xWzFdID09PSAnIycpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlY29kZVNlY29uZENoYXJfMiA9IHJlcGxhY2VJbnB1dF8xWzJdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGVjb2RlQ29kZV8yID0gZGVjb2RlU2Vjb25kQ2hhcl8yID09ICd4JyB8fCBkZWNvZGVTZWNvbmRDaGFyXzIgPT0gJ1gnXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHBhcnNlSW50KHJlcGxhY2VJbnB1dF8xLnN1YnN0cigzKSwgMTYpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHBhcnNlSW50KHJlcGxhY2VJbnB1dF8xLnN1YnN0cigyKSk7XG4gICAgICAgICAgICAgICAgICAgIGRlY29kZVJlc3VsdF8xID1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlY29kZUNvZGVfMiA+PSAweDEwZmZmZlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gb3V0T2ZCb3VuZHNDaGFyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkZWNvZGVDb2RlXzIgPiA2NTUzNVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHN1cnJvZ2F0ZV9wYWlyc18xLmZyb21Db2RlUG9pbnQoZGVjb2RlQ29kZV8yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGZyb21DaGFyQ29kZShudW1lcmljX3VuaWNvZGVfbWFwXzEubnVtZXJpY1VuaWNvZGVNYXBbZGVjb2RlQ29kZV8yXSB8fCBkZWNvZGVDb2RlXzIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcGxhY2VSZXN1bHRfMSArPSBkZWNvZGVSZXN1bHRfMTtcbiAgICAgICAgICAgIHJlcGxhY2VMYXN0SW5kZXhfMSA9IHJlcGxhY2VNYXRjaF8xLmluZGV4ICsgcmVwbGFjZUlucHV0XzEubGVuZ3RoO1xuICAgICAgICB9IHdoaWxlICgocmVwbGFjZU1hdGNoXzEgPSBkZWNvZGVSZWdFeHAuZXhlYyh0ZXh0KSkpO1xuICAgICAgICBpZiAocmVwbGFjZUxhc3RJbmRleF8xICE9PSB0ZXh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgcmVwbGFjZVJlc3VsdF8xICs9IHRleHQuc3Vic3RyaW5nKHJlcGxhY2VMYXN0SW5kZXhfMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlcGxhY2VSZXN1bHRfMSA9XG4gICAgICAgICAgICB0ZXh0O1xuICAgIH1cbiAgICByZXR1cm4gcmVwbGFjZVJlc3VsdF8xO1xufVxuZXhwb3J0cy5kZWNvZGUgPSBkZWNvZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6dHJ1ZX0pO2V4cG9ydHMuYm9keVJlZ0V4cHM9e3htbDovJig/OiNcXGQrfCNbeFhdW1xcZGEtZkEtRl0rfFswLTlhLXpBLVpdKyk7Py9nLGh0bWw0Oi8mKD86bmJzcHxpZXhjbHxjZW50fHBvdW5kfGN1cnJlbnx5ZW58YnJ2YmFyfHNlY3R8dW1sfGNvcHl8b3JkZnxsYXF1b3xub3R8c2h5fHJlZ3xtYWNyfGRlZ3xwbHVzbW58c3VwMnxzdXAzfGFjdXRlfG1pY3JvfHBhcmF8bWlkZG90fGNlZGlsfHN1cDF8b3JkbXxyYXF1b3xmcmFjMTR8ZnJhYzEyfGZyYWMzNHxpcXVlc3R8QWdyYXZlfEFhY3V0ZXxBY2lyY3xBdGlsZGV8QXVtbHxBcmluZ3xBRWxpZ3xDY2VkaWx8RWdyYXZlfEVhY3V0ZXxFY2lyY3xFdW1sfElncmF2ZXxJYWN1dGV8SWNpcmN8SXVtbHxFVEh8TnRpbGRlfE9ncmF2ZXxPYWN1dGV8T2NpcmN8T3RpbGRlfE91bWx8dGltZXN8T3NsYXNofFVncmF2ZXxVYWN1dGV8VWNpcmN8VXVtbHxZYWN1dGV8VEhPUk58c3psaWd8YWdyYXZlfGFhY3V0ZXxhY2lyY3xhdGlsZGV8YXVtbHxhcmluZ3xhZWxpZ3xjY2VkaWx8ZWdyYXZlfGVhY3V0ZXxlY2lyY3xldW1sfGlncmF2ZXxpYWN1dGV8aWNpcmN8aXVtbHxldGh8bnRpbGRlfG9ncmF2ZXxvYWN1dGV8b2NpcmN8b3RpbGRlfG91bWx8ZGl2aWRlfG9zbGFzaHx1Z3JhdmV8dWFjdXRlfHVjaXJjfHV1bWx8eWFjdXRlfHRob3JufHl1bWx8cXVvdHxhbXB8bHR8Z3R8I1xcZCt8I1t4WF1bXFxkYS1mQS1GXSt8WzAtOWEtekEtWl0rKTs/L2csaHRtbDU6LyYoPzpBRWxpZ3xBTVB8QWFjdXRlfEFjaXJjfEFncmF2ZXxBcmluZ3xBdGlsZGV8QXVtbHxDT1BZfENjZWRpbHxFVEh8RWFjdXRlfEVjaXJjfEVncmF2ZXxFdW1sfEdUfElhY3V0ZXxJY2lyY3xJZ3JhdmV8SXVtbHxMVHxOdGlsZGV8T2FjdXRlfE9jaXJjfE9ncmF2ZXxPc2xhc2h8T3RpbGRlfE91bWx8UVVPVHxSRUd8VEhPUk58VWFjdXRlfFVjaXJjfFVncmF2ZXxVdW1sfFlhY3V0ZXxhYWN1dGV8YWNpcmN8YWN1dGV8YWVsaWd8YWdyYXZlfGFtcHxhcmluZ3xhdGlsZGV8YXVtbHxicnZiYXJ8Y2NlZGlsfGNlZGlsfGNlbnR8Y29weXxjdXJyZW58ZGVnfGRpdmlkZXxlYWN1dGV8ZWNpcmN8ZWdyYXZlfGV0aHxldW1sfGZyYWMxMnxmcmFjMTR8ZnJhYzM0fGd0fGlhY3V0ZXxpY2lyY3xpZXhjbHxpZ3JhdmV8aXF1ZXN0fGl1bWx8bGFxdW98bHR8bWFjcnxtaWNyb3xtaWRkb3R8bmJzcHxub3R8bnRpbGRlfG9hY3V0ZXxvY2lyY3xvZ3JhdmV8b3JkZnxvcmRtfG9zbGFzaHxvdGlsZGV8b3VtbHxwYXJhfHBsdXNtbnxwb3VuZHxxdW90fHJhcXVvfHJlZ3xzZWN0fHNoeXxzdXAxfHN1cDJ8c3VwM3xzemxpZ3x0aG9ybnx0aW1lc3x1YWN1dGV8dWNpcmN8dWdyYXZlfHVtbHx1dW1sfHlhY3V0ZXx5ZW58eXVtbHwjXFxkK3wjW3hYXVtcXGRhLWZBLUZdK3xbMC05YS16QS1aXSspOz8vZ307ZXhwb3J0cy5uYW1lZFJlZmVyZW5jZXM9e3htbDp7ZW50aXRpZXM6e1wiJmx0O1wiOlwiPFwiLFwiJmd0O1wiOlwiPlwiLFwiJnF1b3Q7XCI6J1wiJyxcIiZhcG9zO1wiOlwiJ1wiLFwiJmFtcDtcIjpcIiZcIn0sY2hhcmFjdGVyczp7XCI8XCI6XCImbHQ7XCIsXCI+XCI6XCImZ3Q7XCIsJ1wiJzpcIiZxdW90O1wiLFwiJ1wiOlwiJmFwb3M7XCIsXCImXCI6XCImYW1wO1wifX0saHRtbDQ6e2VudGl0aWVzOntcIiZhcG9zO1wiOlwiJ1wiLFwiJm5ic3BcIjpcIsKgXCIsXCImbmJzcDtcIjpcIsKgXCIsXCImaWV4Y2xcIjpcIsKhXCIsXCImaWV4Y2w7XCI6XCLCoVwiLFwiJmNlbnRcIjpcIsKiXCIsXCImY2VudDtcIjpcIsKiXCIsXCImcG91bmRcIjpcIsKjXCIsXCImcG91bmQ7XCI6XCLCo1wiLFwiJmN1cnJlblwiOlwiwqRcIixcIiZjdXJyZW47XCI6XCLCpFwiLFwiJnllblwiOlwiwqVcIixcIiZ5ZW47XCI6XCLCpVwiLFwiJmJydmJhclwiOlwiwqZcIixcIiZicnZiYXI7XCI6XCLCplwiLFwiJnNlY3RcIjpcIsKnXCIsXCImc2VjdDtcIjpcIsKnXCIsXCImdW1sXCI6XCLCqFwiLFwiJnVtbDtcIjpcIsKoXCIsXCImY29weVwiOlwiwqlcIixcIiZjb3B5O1wiOlwiwqlcIixcIiZvcmRmXCI6XCLCqlwiLFwiJm9yZGY7XCI6XCLCqlwiLFwiJmxhcXVvXCI6XCLCq1wiLFwiJmxhcXVvO1wiOlwiwqtcIixcIiZub3RcIjpcIsKsXCIsXCImbm90O1wiOlwiwqxcIixcIiZzaHlcIjpcIsKtXCIsXCImc2h5O1wiOlwiwq1cIixcIiZyZWdcIjpcIsKuXCIsXCImcmVnO1wiOlwiwq5cIixcIiZtYWNyXCI6XCLCr1wiLFwiJm1hY3I7XCI6XCLCr1wiLFwiJmRlZ1wiOlwiwrBcIixcIiZkZWc7XCI6XCLCsFwiLFwiJnBsdXNtblwiOlwiwrFcIixcIiZwbHVzbW47XCI6XCLCsVwiLFwiJnN1cDJcIjpcIsKyXCIsXCImc3VwMjtcIjpcIsKyXCIsXCImc3VwM1wiOlwiwrNcIixcIiZzdXAzO1wiOlwiwrNcIixcIiZhY3V0ZVwiOlwiwrRcIixcIiZhY3V0ZTtcIjpcIsK0XCIsXCImbWljcm9cIjpcIsK1XCIsXCImbWljcm87XCI6XCLCtVwiLFwiJnBhcmFcIjpcIsK2XCIsXCImcGFyYTtcIjpcIsK2XCIsXCImbWlkZG90XCI6XCLCt1wiLFwiJm1pZGRvdDtcIjpcIsK3XCIsXCImY2VkaWxcIjpcIsK4XCIsXCImY2VkaWw7XCI6XCLCuFwiLFwiJnN1cDFcIjpcIsK5XCIsXCImc3VwMTtcIjpcIsK5XCIsXCImb3JkbVwiOlwiwrpcIixcIiZvcmRtO1wiOlwiwrpcIixcIiZyYXF1b1wiOlwiwrtcIixcIiZyYXF1bztcIjpcIsK7XCIsXCImZnJhYzE0XCI6XCLCvFwiLFwiJmZyYWMxNDtcIjpcIsK8XCIsXCImZnJhYzEyXCI6XCLCvVwiLFwiJmZyYWMxMjtcIjpcIsK9XCIsXCImZnJhYzM0XCI6XCLCvlwiLFwiJmZyYWMzNDtcIjpcIsK+XCIsXCImaXF1ZXN0XCI6XCLCv1wiLFwiJmlxdWVzdDtcIjpcIsK/XCIsXCImQWdyYXZlXCI6XCLDgFwiLFwiJkFncmF2ZTtcIjpcIsOAXCIsXCImQWFjdXRlXCI6XCLDgVwiLFwiJkFhY3V0ZTtcIjpcIsOBXCIsXCImQWNpcmNcIjpcIsOCXCIsXCImQWNpcmM7XCI6XCLDglwiLFwiJkF0aWxkZVwiOlwiw4NcIixcIiZBdGlsZGU7XCI6XCLDg1wiLFwiJkF1bWxcIjpcIsOEXCIsXCImQXVtbDtcIjpcIsOEXCIsXCImQXJpbmdcIjpcIsOFXCIsXCImQXJpbmc7XCI6XCLDhVwiLFwiJkFFbGlnXCI6XCLDhlwiLFwiJkFFbGlnO1wiOlwiw4ZcIixcIiZDY2VkaWxcIjpcIsOHXCIsXCImQ2NlZGlsO1wiOlwiw4dcIixcIiZFZ3JhdmVcIjpcIsOIXCIsXCImRWdyYXZlO1wiOlwiw4hcIixcIiZFYWN1dGVcIjpcIsOJXCIsXCImRWFjdXRlO1wiOlwiw4lcIixcIiZFY2lyY1wiOlwiw4pcIixcIiZFY2lyYztcIjpcIsOKXCIsXCImRXVtbFwiOlwiw4tcIixcIiZFdW1sO1wiOlwiw4tcIixcIiZJZ3JhdmVcIjpcIsOMXCIsXCImSWdyYXZlO1wiOlwiw4xcIixcIiZJYWN1dGVcIjpcIsONXCIsXCImSWFjdXRlO1wiOlwiw41cIixcIiZJY2lyY1wiOlwiw45cIixcIiZJY2lyYztcIjpcIsOOXCIsXCImSXVtbFwiOlwiw49cIixcIiZJdW1sO1wiOlwiw49cIixcIiZFVEhcIjpcIsOQXCIsXCImRVRIO1wiOlwiw5BcIixcIiZOdGlsZGVcIjpcIsORXCIsXCImTnRpbGRlO1wiOlwiw5FcIixcIiZPZ3JhdmVcIjpcIsOSXCIsXCImT2dyYXZlO1wiOlwiw5JcIixcIiZPYWN1dGVcIjpcIsOTXCIsXCImT2FjdXRlO1wiOlwiw5NcIixcIiZPY2lyY1wiOlwiw5RcIixcIiZPY2lyYztcIjpcIsOUXCIsXCImT3RpbGRlXCI6XCLDlVwiLFwiJk90aWxkZTtcIjpcIsOVXCIsXCImT3VtbFwiOlwiw5ZcIixcIiZPdW1sO1wiOlwiw5ZcIixcIiZ0aW1lc1wiOlwiw5dcIixcIiZ0aW1lcztcIjpcIsOXXCIsXCImT3NsYXNoXCI6XCLDmFwiLFwiJk9zbGFzaDtcIjpcIsOYXCIsXCImVWdyYXZlXCI6XCLDmVwiLFwiJlVncmF2ZTtcIjpcIsOZXCIsXCImVWFjdXRlXCI6XCLDmlwiLFwiJlVhY3V0ZTtcIjpcIsOaXCIsXCImVWNpcmNcIjpcIsObXCIsXCImVWNpcmM7XCI6XCLDm1wiLFwiJlV1bWxcIjpcIsOcXCIsXCImVXVtbDtcIjpcIsOcXCIsXCImWWFjdXRlXCI6XCLDnVwiLFwiJllhY3V0ZTtcIjpcIsOdXCIsXCImVEhPUk5cIjpcIsOeXCIsXCImVEhPUk47XCI6XCLDnlwiLFwiJnN6bGlnXCI6XCLDn1wiLFwiJnN6bGlnO1wiOlwiw59cIixcIiZhZ3JhdmVcIjpcIsOgXCIsXCImYWdyYXZlO1wiOlwiw6BcIixcIiZhYWN1dGVcIjpcIsOhXCIsXCImYWFjdXRlO1wiOlwiw6FcIixcIiZhY2lyY1wiOlwiw6JcIixcIiZhY2lyYztcIjpcIsOiXCIsXCImYXRpbGRlXCI6XCLDo1wiLFwiJmF0aWxkZTtcIjpcIsOjXCIsXCImYXVtbFwiOlwiw6RcIixcIiZhdW1sO1wiOlwiw6RcIixcIiZhcmluZ1wiOlwiw6VcIixcIiZhcmluZztcIjpcIsOlXCIsXCImYWVsaWdcIjpcIsOmXCIsXCImYWVsaWc7XCI6XCLDplwiLFwiJmNjZWRpbFwiOlwiw6dcIixcIiZjY2VkaWw7XCI6XCLDp1wiLFwiJmVncmF2ZVwiOlwiw6hcIixcIiZlZ3JhdmU7XCI6XCLDqFwiLFwiJmVhY3V0ZVwiOlwiw6lcIixcIiZlYWN1dGU7XCI6XCLDqVwiLFwiJmVjaXJjXCI6XCLDqlwiLFwiJmVjaXJjO1wiOlwiw6pcIixcIiZldW1sXCI6XCLDq1wiLFwiJmV1bWw7XCI6XCLDq1wiLFwiJmlncmF2ZVwiOlwiw6xcIixcIiZpZ3JhdmU7XCI6XCLDrFwiLFwiJmlhY3V0ZVwiOlwiw61cIixcIiZpYWN1dGU7XCI6XCLDrVwiLFwiJmljaXJjXCI6XCLDrlwiLFwiJmljaXJjO1wiOlwiw65cIixcIiZpdW1sXCI6XCLDr1wiLFwiJml1bWw7XCI6XCLDr1wiLFwiJmV0aFwiOlwiw7BcIixcIiZldGg7XCI6XCLDsFwiLFwiJm50aWxkZVwiOlwiw7FcIixcIiZudGlsZGU7XCI6XCLDsVwiLFwiJm9ncmF2ZVwiOlwiw7JcIixcIiZvZ3JhdmU7XCI6XCLDslwiLFwiJm9hY3V0ZVwiOlwiw7NcIixcIiZvYWN1dGU7XCI6XCLDs1wiLFwiJm9jaXJjXCI6XCLDtFwiLFwiJm9jaXJjO1wiOlwiw7RcIixcIiZvdGlsZGVcIjpcIsO1XCIsXCImb3RpbGRlO1wiOlwiw7VcIixcIiZvdW1sXCI6XCLDtlwiLFwiJm91bWw7XCI6XCLDtlwiLFwiJmRpdmlkZVwiOlwiw7dcIixcIiZkaXZpZGU7XCI6XCLDt1wiLFwiJm9zbGFzaFwiOlwiw7hcIixcIiZvc2xhc2g7XCI6XCLDuFwiLFwiJnVncmF2ZVwiOlwiw7lcIixcIiZ1Z3JhdmU7XCI6XCLDuVwiLFwiJnVhY3V0ZVwiOlwiw7pcIixcIiZ1YWN1dGU7XCI6XCLDulwiLFwiJnVjaXJjXCI6XCLDu1wiLFwiJnVjaXJjO1wiOlwiw7tcIixcIiZ1dW1sXCI6XCLDvFwiLFwiJnV1bWw7XCI6XCLDvFwiLFwiJnlhY3V0ZVwiOlwiw71cIixcIiZ5YWN1dGU7XCI6XCLDvVwiLFwiJnRob3JuXCI6XCLDvlwiLFwiJnRob3JuO1wiOlwiw75cIixcIiZ5dW1sXCI6XCLDv1wiLFwiJnl1bWw7XCI6XCLDv1wiLFwiJnF1b3RcIjonXCInLFwiJnF1b3Q7XCI6J1wiJyxcIiZhbXBcIjpcIiZcIixcIiZhbXA7XCI6XCImXCIsXCImbHRcIjpcIjxcIixcIiZsdDtcIjpcIjxcIixcIiZndFwiOlwiPlwiLFwiJmd0O1wiOlwiPlwiLFwiJk9FbGlnO1wiOlwixZJcIixcIiZvZWxpZztcIjpcIsWTXCIsXCImU2Nhcm9uO1wiOlwixaBcIixcIiZzY2Fyb247XCI6XCLFoVwiLFwiJll1bWw7XCI6XCLFuFwiLFwiJmNpcmM7XCI6XCLLhlwiLFwiJnRpbGRlO1wiOlwiy5xcIixcIiZlbnNwO1wiOlwi4oCCXCIsXCImZW1zcDtcIjpcIuKAg1wiLFwiJnRoaW5zcDtcIjpcIuKAiVwiLFwiJnp3bmo7XCI6XCLigIxcIixcIiZ6d2o7XCI6XCLigI1cIixcIiZscm07XCI6XCLigI5cIixcIiZybG07XCI6XCLigI9cIixcIiZuZGFzaDtcIjpcIuKAk1wiLFwiJm1kYXNoO1wiOlwi4oCUXCIsXCImbHNxdW87XCI6XCLigJhcIixcIiZyc3F1bztcIjpcIuKAmVwiLFwiJnNicXVvO1wiOlwi4oCaXCIsXCImbGRxdW87XCI6XCLigJxcIixcIiZyZHF1bztcIjpcIuKAnVwiLFwiJmJkcXVvO1wiOlwi4oCeXCIsXCImZGFnZ2VyO1wiOlwi4oCgXCIsXCImRGFnZ2VyO1wiOlwi4oChXCIsXCImcGVybWlsO1wiOlwi4oCwXCIsXCImbHNhcXVvO1wiOlwi4oC5XCIsXCImcnNhcXVvO1wiOlwi4oC6XCIsXCImZXVybztcIjpcIuKCrFwiLFwiJmZub2Y7XCI6XCLGklwiLFwiJkFscGhhO1wiOlwizpFcIixcIiZCZXRhO1wiOlwizpJcIixcIiZHYW1tYTtcIjpcIs6TXCIsXCImRGVsdGE7XCI6XCLOlFwiLFwiJkVwc2lsb247XCI6XCLOlVwiLFwiJlpldGE7XCI6XCLOllwiLFwiJkV0YTtcIjpcIs6XXCIsXCImVGhldGE7XCI6XCLOmFwiLFwiJklvdGE7XCI6XCLOmVwiLFwiJkthcHBhO1wiOlwizppcIixcIiZMYW1iZGE7XCI6XCLOm1wiLFwiJk11O1wiOlwizpxcIixcIiZOdTtcIjpcIs6dXCIsXCImWGk7XCI6XCLOnlwiLFwiJk9taWNyb247XCI6XCLOn1wiLFwiJlBpO1wiOlwizqBcIixcIiZSaG87XCI6XCLOoVwiLFwiJlNpZ21hO1wiOlwizqNcIixcIiZUYXU7XCI6XCLOpFwiLFwiJlVwc2lsb247XCI6XCLOpVwiLFwiJlBoaTtcIjpcIs6mXCIsXCImQ2hpO1wiOlwizqdcIixcIiZQc2k7XCI6XCLOqFwiLFwiJk9tZWdhO1wiOlwizqlcIixcIiZhbHBoYTtcIjpcIs6xXCIsXCImYmV0YTtcIjpcIs6yXCIsXCImZ2FtbWE7XCI6XCLOs1wiLFwiJmRlbHRhO1wiOlwizrRcIixcIiZlcHNpbG9uO1wiOlwizrVcIixcIiZ6ZXRhO1wiOlwizrZcIixcIiZldGE7XCI6XCLOt1wiLFwiJnRoZXRhO1wiOlwizrhcIixcIiZpb3RhO1wiOlwizrlcIixcIiZrYXBwYTtcIjpcIs66XCIsXCImbGFtYmRhO1wiOlwizrtcIixcIiZtdTtcIjpcIs68XCIsXCImbnU7XCI6XCLOvVwiLFwiJnhpO1wiOlwizr5cIixcIiZvbWljcm9uO1wiOlwizr9cIixcIiZwaTtcIjpcIs+AXCIsXCImcmhvO1wiOlwiz4FcIixcIiZzaWdtYWY7XCI6XCLPglwiLFwiJnNpZ21hO1wiOlwiz4NcIixcIiZ0YXU7XCI6XCLPhFwiLFwiJnVwc2lsb247XCI6XCLPhVwiLFwiJnBoaTtcIjpcIs+GXCIsXCImY2hpO1wiOlwiz4dcIixcIiZwc2k7XCI6XCLPiFwiLFwiJm9tZWdhO1wiOlwiz4lcIixcIiZ0aGV0YXN5bTtcIjpcIs+RXCIsXCImdXBzaWg7XCI6XCLPklwiLFwiJnBpdjtcIjpcIs+WXCIsXCImYnVsbDtcIjpcIuKAolwiLFwiJmhlbGxpcDtcIjpcIuKAplwiLFwiJnByaW1lO1wiOlwi4oCyXCIsXCImUHJpbWU7XCI6XCLigLNcIixcIiZvbGluZTtcIjpcIuKAvlwiLFwiJmZyYXNsO1wiOlwi4oGEXCIsXCImd2VpZXJwO1wiOlwi4oSYXCIsXCImaW1hZ2U7XCI6XCLihJFcIixcIiZyZWFsO1wiOlwi4oScXCIsXCImdHJhZGU7XCI6XCLihKJcIixcIiZhbGVmc3ltO1wiOlwi4oS1XCIsXCImbGFycjtcIjpcIuKGkFwiLFwiJnVhcnI7XCI6XCLihpFcIixcIiZyYXJyO1wiOlwi4oaSXCIsXCImZGFycjtcIjpcIuKGk1wiLFwiJmhhcnI7XCI6XCLihpRcIixcIiZjcmFycjtcIjpcIuKGtVwiLFwiJmxBcnI7XCI6XCLih5BcIixcIiZ1QXJyO1wiOlwi4oeRXCIsXCImckFycjtcIjpcIuKHklwiLFwiJmRBcnI7XCI6XCLih5NcIixcIiZoQXJyO1wiOlwi4oeUXCIsXCImZm9yYWxsO1wiOlwi4oiAXCIsXCImcGFydDtcIjpcIuKIglwiLFwiJmV4aXN0O1wiOlwi4oiDXCIsXCImZW1wdHk7XCI6XCLiiIVcIixcIiZuYWJsYTtcIjpcIuKIh1wiLFwiJmlzaW47XCI6XCLiiIhcIixcIiZub3RpbjtcIjpcIuKIiVwiLFwiJm5pO1wiOlwi4oiLXCIsXCImcHJvZDtcIjpcIuKIj1wiLFwiJnN1bTtcIjpcIuKIkVwiLFwiJm1pbnVzO1wiOlwi4oiSXCIsXCImbG93YXN0O1wiOlwi4oiXXCIsXCImcmFkaWM7XCI6XCLiiJpcIixcIiZwcm9wO1wiOlwi4oidXCIsXCImaW5maW47XCI6XCLiiJ5cIixcIiZhbmc7XCI6XCLiiKBcIixcIiZhbmQ7XCI6XCLiiKdcIixcIiZvcjtcIjpcIuKIqFwiLFwiJmNhcDtcIjpcIuKIqVwiLFwiJmN1cDtcIjpcIuKIqlwiLFwiJmludDtcIjpcIuKIq1wiLFwiJnRoZXJlNDtcIjpcIuKItFwiLFwiJnNpbTtcIjpcIuKIvFwiLFwiJmNvbmc7XCI6XCLiiYVcIixcIiZhc3ltcDtcIjpcIuKJiFwiLFwiJm5lO1wiOlwi4omgXCIsXCImZXF1aXY7XCI6XCLiiaFcIixcIiZsZTtcIjpcIuKJpFwiLFwiJmdlO1wiOlwi4omlXCIsXCImc3ViO1wiOlwi4oqCXCIsXCImc3VwO1wiOlwi4oqDXCIsXCImbnN1YjtcIjpcIuKKhFwiLFwiJnN1YmU7XCI6XCLiioZcIixcIiZzdXBlO1wiOlwi4oqHXCIsXCImb3BsdXM7XCI6XCLiipVcIixcIiZvdGltZXM7XCI6XCLiipdcIixcIiZwZXJwO1wiOlwi4oqlXCIsXCImc2RvdDtcIjpcIuKLhVwiLFwiJmxjZWlsO1wiOlwi4oyIXCIsXCImcmNlaWw7XCI6XCLijIlcIixcIiZsZmxvb3I7XCI6XCLijIpcIixcIiZyZmxvb3I7XCI6XCLijItcIixcIiZsYW5nO1wiOlwi4oypXCIsXCImcmFuZztcIjpcIuKMqlwiLFwiJmxvejtcIjpcIuKXilwiLFwiJnNwYWRlcztcIjpcIuKZoFwiLFwiJmNsdWJzO1wiOlwi4pmjXCIsXCImaGVhcnRzO1wiOlwi4pmlXCIsXCImZGlhbXM7XCI6XCLimaZcIn0sY2hhcmFjdGVyczp7XCInXCI6XCImYXBvcztcIixcIsKgXCI6XCImbmJzcDtcIixcIsKhXCI6XCImaWV4Y2w7XCIsXCLColwiOlwiJmNlbnQ7XCIsXCLCo1wiOlwiJnBvdW5kO1wiLFwiwqRcIjpcIiZjdXJyZW47XCIsXCLCpVwiOlwiJnllbjtcIixcIsKmXCI6XCImYnJ2YmFyO1wiLFwiwqdcIjpcIiZzZWN0O1wiLFwiwqhcIjpcIiZ1bWw7XCIsXCLCqVwiOlwiJmNvcHk7XCIsXCLCqlwiOlwiJm9yZGY7XCIsXCLCq1wiOlwiJmxhcXVvO1wiLFwiwqxcIjpcIiZub3Q7XCIsXCLCrVwiOlwiJnNoeTtcIixcIsKuXCI6XCImcmVnO1wiLFwiwq9cIjpcIiZtYWNyO1wiLFwiwrBcIjpcIiZkZWc7XCIsXCLCsVwiOlwiJnBsdXNtbjtcIixcIsKyXCI6XCImc3VwMjtcIixcIsKzXCI6XCImc3VwMztcIixcIsK0XCI6XCImYWN1dGU7XCIsXCLCtVwiOlwiJm1pY3JvO1wiLFwiwrZcIjpcIiZwYXJhO1wiLFwiwrdcIjpcIiZtaWRkb3Q7XCIsXCLCuFwiOlwiJmNlZGlsO1wiLFwiwrlcIjpcIiZzdXAxO1wiLFwiwrpcIjpcIiZvcmRtO1wiLFwiwrtcIjpcIiZyYXF1bztcIixcIsK8XCI6XCImZnJhYzE0O1wiLFwiwr1cIjpcIiZmcmFjMTI7XCIsXCLCvlwiOlwiJmZyYWMzNDtcIixcIsK/XCI6XCImaXF1ZXN0O1wiLFwiw4BcIjpcIiZBZ3JhdmU7XCIsXCLDgVwiOlwiJkFhY3V0ZTtcIixcIsOCXCI6XCImQWNpcmM7XCIsXCLDg1wiOlwiJkF0aWxkZTtcIixcIsOEXCI6XCImQXVtbDtcIixcIsOFXCI6XCImQXJpbmc7XCIsXCLDhlwiOlwiJkFFbGlnO1wiLFwiw4dcIjpcIiZDY2VkaWw7XCIsXCLDiFwiOlwiJkVncmF2ZTtcIixcIsOJXCI6XCImRWFjdXRlO1wiLFwiw4pcIjpcIiZFY2lyYztcIixcIsOLXCI6XCImRXVtbDtcIixcIsOMXCI6XCImSWdyYXZlO1wiLFwiw41cIjpcIiZJYWN1dGU7XCIsXCLDjlwiOlwiJkljaXJjO1wiLFwiw49cIjpcIiZJdW1sO1wiLFwiw5BcIjpcIiZFVEg7XCIsXCLDkVwiOlwiJk50aWxkZTtcIixcIsOSXCI6XCImT2dyYXZlO1wiLFwiw5NcIjpcIiZPYWN1dGU7XCIsXCLDlFwiOlwiJk9jaXJjO1wiLFwiw5VcIjpcIiZPdGlsZGU7XCIsXCLDllwiOlwiJk91bWw7XCIsXCLDl1wiOlwiJnRpbWVzO1wiLFwiw5hcIjpcIiZPc2xhc2g7XCIsXCLDmVwiOlwiJlVncmF2ZTtcIixcIsOaXCI6XCImVWFjdXRlO1wiLFwiw5tcIjpcIiZVY2lyYztcIixcIsOcXCI6XCImVXVtbDtcIixcIsOdXCI6XCImWWFjdXRlO1wiLFwiw55cIjpcIiZUSE9STjtcIixcIsOfXCI6XCImc3psaWc7XCIsXCLDoFwiOlwiJmFncmF2ZTtcIixcIsOhXCI6XCImYWFjdXRlO1wiLFwiw6JcIjpcIiZhY2lyYztcIixcIsOjXCI6XCImYXRpbGRlO1wiLFwiw6RcIjpcIiZhdW1sO1wiLFwiw6VcIjpcIiZhcmluZztcIixcIsOmXCI6XCImYWVsaWc7XCIsXCLDp1wiOlwiJmNjZWRpbDtcIixcIsOoXCI6XCImZWdyYXZlO1wiLFwiw6lcIjpcIiZlYWN1dGU7XCIsXCLDqlwiOlwiJmVjaXJjO1wiLFwiw6tcIjpcIiZldW1sO1wiLFwiw6xcIjpcIiZpZ3JhdmU7XCIsXCLDrVwiOlwiJmlhY3V0ZTtcIixcIsOuXCI6XCImaWNpcmM7XCIsXCLDr1wiOlwiJml1bWw7XCIsXCLDsFwiOlwiJmV0aDtcIixcIsOxXCI6XCImbnRpbGRlO1wiLFwiw7JcIjpcIiZvZ3JhdmU7XCIsXCLDs1wiOlwiJm9hY3V0ZTtcIixcIsO0XCI6XCImb2NpcmM7XCIsXCLDtVwiOlwiJm90aWxkZTtcIixcIsO2XCI6XCImb3VtbDtcIixcIsO3XCI6XCImZGl2aWRlO1wiLFwiw7hcIjpcIiZvc2xhc2g7XCIsXCLDuVwiOlwiJnVncmF2ZTtcIixcIsO6XCI6XCImdWFjdXRlO1wiLFwiw7tcIjpcIiZ1Y2lyYztcIixcIsO8XCI6XCImdXVtbDtcIixcIsO9XCI6XCImeWFjdXRlO1wiLFwiw75cIjpcIiZ0aG9ybjtcIixcIsO/XCI6XCImeXVtbDtcIiwnXCInOlwiJnF1b3Q7XCIsXCImXCI6XCImYW1wO1wiLFwiPFwiOlwiJmx0O1wiLFwiPlwiOlwiJmd0O1wiLFwixZJcIjpcIiZPRWxpZztcIixcIsWTXCI6XCImb2VsaWc7XCIsXCLFoFwiOlwiJlNjYXJvbjtcIixcIsWhXCI6XCImc2Nhcm9uO1wiLFwixbhcIjpcIiZZdW1sO1wiLFwiy4ZcIjpcIiZjaXJjO1wiLFwiy5xcIjpcIiZ0aWxkZTtcIixcIuKAglwiOlwiJmVuc3A7XCIsXCLigINcIjpcIiZlbXNwO1wiLFwi4oCJXCI6XCImdGhpbnNwO1wiLFwi4oCMXCI6XCImenduajtcIixcIuKAjVwiOlwiJnp3ajtcIixcIuKAjlwiOlwiJmxybTtcIixcIuKAj1wiOlwiJnJsbTtcIixcIuKAk1wiOlwiJm5kYXNoO1wiLFwi4oCUXCI6XCImbWRhc2g7XCIsXCLigJhcIjpcIiZsc3F1bztcIixcIuKAmVwiOlwiJnJzcXVvO1wiLFwi4oCaXCI6XCImc2JxdW87XCIsXCLigJxcIjpcIiZsZHF1bztcIixcIuKAnVwiOlwiJnJkcXVvO1wiLFwi4oCeXCI6XCImYmRxdW87XCIsXCLigKBcIjpcIiZkYWdnZXI7XCIsXCLigKFcIjpcIiZEYWdnZXI7XCIsXCLigLBcIjpcIiZwZXJtaWw7XCIsXCLigLlcIjpcIiZsc2FxdW87XCIsXCLigLpcIjpcIiZyc2FxdW87XCIsXCLigqxcIjpcIiZldXJvO1wiLFwixpJcIjpcIiZmbm9mO1wiLFwizpFcIjpcIiZBbHBoYTtcIixcIs6SXCI6XCImQmV0YTtcIixcIs6TXCI6XCImR2FtbWE7XCIsXCLOlFwiOlwiJkRlbHRhO1wiLFwizpVcIjpcIiZFcHNpbG9uO1wiLFwizpZcIjpcIiZaZXRhO1wiLFwizpdcIjpcIiZFdGE7XCIsXCLOmFwiOlwiJlRoZXRhO1wiLFwizplcIjpcIiZJb3RhO1wiLFwizppcIjpcIiZLYXBwYTtcIixcIs6bXCI6XCImTGFtYmRhO1wiLFwizpxcIjpcIiZNdTtcIixcIs6dXCI6XCImTnU7XCIsXCLOnlwiOlwiJlhpO1wiLFwizp9cIjpcIiZPbWljcm9uO1wiLFwizqBcIjpcIiZQaTtcIixcIs6hXCI6XCImUmhvO1wiLFwizqNcIjpcIiZTaWdtYTtcIixcIs6kXCI6XCImVGF1O1wiLFwizqVcIjpcIiZVcHNpbG9uO1wiLFwizqZcIjpcIiZQaGk7XCIsXCLOp1wiOlwiJkNoaTtcIixcIs6oXCI6XCImUHNpO1wiLFwizqlcIjpcIiZPbWVnYTtcIixcIs6xXCI6XCImYWxwaGE7XCIsXCLOslwiOlwiJmJldGE7XCIsXCLOs1wiOlwiJmdhbW1hO1wiLFwizrRcIjpcIiZkZWx0YTtcIixcIs61XCI6XCImZXBzaWxvbjtcIixcIs62XCI6XCImemV0YTtcIixcIs63XCI6XCImZXRhO1wiLFwizrhcIjpcIiZ0aGV0YTtcIixcIs65XCI6XCImaW90YTtcIixcIs66XCI6XCIma2FwcGE7XCIsXCLOu1wiOlwiJmxhbWJkYTtcIixcIs68XCI6XCImbXU7XCIsXCLOvVwiOlwiJm51O1wiLFwizr5cIjpcIiZ4aTtcIixcIs6/XCI6XCImb21pY3JvbjtcIixcIs+AXCI6XCImcGk7XCIsXCLPgVwiOlwiJnJobztcIixcIs+CXCI6XCImc2lnbWFmO1wiLFwiz4NcIjpcIiZzaWdtYTtcIixcIs+EXCI6XCImdGF1O1wiLFwiz4VcIjpcIiZ1cHNpbG9uO1wiLFwiz4ZcIjpcIiZwaGk7XCIsXCLPh1wiOlwiJmNoaTtcIixcIs+IXCI6XCImcHNpO1wiLFwiz4lcIjpcIiZvbWVnYTtcIixcIs+RXCI6XCImdGhldGFzeW07XCIsXCLPklwiOlwiJnVwc2loO1wiLFwiz5ZcIjpcIiZwaXY7XCIsXCLigKJcIjpcIiZidWxsO1wiLFwi4oCmXCI6XCImaGVsbGlwO1wiLFwi4oCyXCI6XCImcHJpbWU7XCIsXCLigLNcIjpcIiZQcmltZTtcIixcIuKAvlwiOlwiJm9saW5lO1wiLFwi4oGEXCI6XCImZnJhc2w7XCIsXCLihJhcIjpcIiZ3ZWllcnA7XCIsXCLihJFcIjpcIiZpbWFnZTtcIixcIuKEnFwiOlwiJnJlYWw7XCIsXCLihKJcIjpcIiZ0cmFkZTtcIixcIuKEtVwiOlwiJmFsZWZzeW07XCIsXCLihpBcIjpcIiZsYXJyO1wiLFwi4oaRXCI6XCImdWFycjtcIixcIuKGklwiOlwiJnJhcnI7XCIsXCLihpNcIjpcIiZkYXJyO1wiLFwi4oaUXCI6XCImaGFycjtcIixcIuKGtVwiOlwiJmNyYXJyO1wiLFwi4oeQXCI6XCImbEFycjtcIixcIuKHkVwiOlwiJnVBcnI7XCIsXCLih5JcIjpcIiZyQXJyO1wiLFwi4oeTXCI6XCImZEFycjtcIixcIuKHlFwiOlwiJmhBcnI7XCIsXCLiiIBcIjpcIiZmb3JhbGw7XCIsXCLiiIJcIjpcIiZwYXJ0O1wiLFwi4oiDXCI6XCImZXhpc3Q7XCIsXCLiiIVcIjpcIiZlbXB0eTtcIixcIuKIh1wiOlwiJm5hYmxhO1wiLFwi4oiIXCI6XCImaXNpbjtcIixcIuKIiVwiOlwiJm5vdGluO1wiLFwi4oiLXCI6XCImbmk7XCIsXCLiiI9cIjpcIiZwcm9kO1wiLFwi4oiRXCI6XCImc3VtO1wiLFwi4oiSXCI6XCImbWludXM7XCIsXCLiiJdcIjpcIiZsb3dhc3Q7XCIsXCLiiJpcIjpcIiZyYWRpYztcIixcIuKInVwiOlwiJnByb3A7XCIsXCLiiJ5cIjpcIiZpbmZpbjtcIixcIuKIoFwiOlwiJmFuZztcIixcIuKIp1wiOlwiJmFuZDtcIixcIuKIqFwiOlwiJm9yO1wiLFwi4oipXCI6XCImY2FwO1wiLFwi4oiqXCI6XCImY3VwO1wiLFwi4oirXCI6XCImaW50O1wiLFwi4oi0XCI6XCImdGhlcmU0O1wiLFwi4oi8XCI6XCImc2ltO1wiLFwi4omFXCI6XCImY29uZztcIixcIuKJiFwiOlwiJmFzeW1wO1wiLFwi4omgXCI6XCImbmU7XCIsXCLiiaFcIjpcIiZlcXVpdjtcIixcIuKJpFwiOlwiJmxlO1wiLFwi4omlXCI6XCImZ2U7XCIsXCLiioJcIjpcIiZzdWI7XCIsXCLiioNcIjpcIiZzdXA7XCIsXCLiioRcIjpcIiZuc3ViO1wiLFwi4oqGXCI6XCImc3ViZTtcIixcIuKKh1wiOlwiJnN1cGU7XCIsXCLiipVcIjpcIiZvcGx1cztcIixcIuKKl1wiOlwiJm90aW1lcztcIixcIuKKpVwiOlwiJnBlcnA7XCIsXCLii4VcIjpcIiZzZG90O1wiLFwi4oyIXCI6XCImbGNlaWw7XCIsXCLijIlcIjpcIiZyY2VpbDtcIixcIuKMilwiOlwiJmxmbG9vcjtcIixcIuKMi1wiOlwiJnJmbG9vcjtcIixcIuKMqVwiOlwiJmxhbmc7XCIsXCLijKpcIjpcIiZyYW5nO1wiLFwi4peKXCI6XCImbG96O1wiLFwi4pmgXCI6XCImc3BhZGVzO1wiLFwi4pmjXCI6XCImY2x1YnM7XCIsXCLimaVcIjpcIiZoZWFydHM7XCIsXCLimaZcIjpcIiZkaWFtcztcIn19LGh0bWw1OntlbnRpdGllczp7XCImQUVsaWdcIjpcIsOGXCIsXCImQUVsaWc7XCI6XCLDhlwiLFwiJkFNUFwiOlwiJlwiLFwiJkFNUDtcIjpcIiZcIixcIiZBYWN1dGVcIjpcIsOBXCIsXCImQWFjdXRlO1wiOlwiw4FcIixcIiZBYnJldmU7XCI6XCLEglwiLFwiJkFjaXJjXCI6XCLDglwiLFwiJkFjaXJjO1wiOlwiw4JcIixcIiZBY3k7XCI6XCLQkFwiLFwiJkFmcjtcIjpcIvCdlIRcIixcIiZBZ3JhdmVcIjpcIsOAXCIsXCImQWdyYXZlO1wiOlwiw4BcIixcIiZBbHBoYTtcIjpcIs6RXCIsXCImQW1hY3I7XCI6XCLEgFwiLFwiJkFuZDtcIjpcIuKpk1wiLFwiJkFvZ29uO1wiOlwixIRcIixcIiZBb3BmO1wiOlwi8J2UuFwiLFwiJkFwcGx5RnVuY3Rpb247XCI6XCLigaFcIixcIiZBcmluZ1wiOlwiw4VcIixcIiZBcmluZztcIjpcIsOFXCIsXCImQXNjcjtcIjpcIvCdkpxcIixcIiZBc3NpZ247XCI6XCLiiZRcIixcIiZBdGlsZGVcIjpcIsODXCIsXCImQXRpbGRlO1wiOlwiw4NcIixcIiZBdW1sXCI6XCLDhFwiLFwiJkF1bWw7XCI6XCLDhFwiLFwiJkJhY2tzbGFzaDtcIjpcIuKIllwiLFwiJkJhcnY7XCI6XCLiq6dcIixcIiZCYXJ3ZWQ7XCI6XCLijIZcIixcIiZCY3k7XCI6XCLQkVwiLFwiJkJlY2F1c2U7XCI6XCLiiLVcIixcIiZCZXJub3VsbGlzO1wiOlwi4oSsXCIsXCImQmV0YTtcIjpcIs6SXCIsXCImQmZyO1wiOlwi8J2UhVwiLFwiJkJvcGY7XCI6XCLwnZS5XCIsXCImQnJldmU7XCI6XCLLmFwiLFwiJkJzY3I7XCI6XCLihKxcIixcIiZCdW1wZXE7XCI6XCLiiY5cIixcIiZDSGN5O1wiOlwi0KdcIixcIiZDT1BZXCI6XCLCqVwiLFwiJkNPUFk7XCI6XCLCqVwiLFwiJkNhY3V0ZTtcIjpcIsSGXCIsXCImQ2FwO1wiOlwi4ouSXCIsXCImQ2FwaXRhbERpZmZlcmVudGlhbEQ7XCI6XCLihYVcIixcIiZDYXlsZXlzO1wiOlwi4oStXCIsXCImQ2Nhcm9uO1wiOlwixIxcIixcIiZDY2VkaWxcIjpcIsOHXCIsXCImQ2NlZGlsO1wiOlwiw4dcIixcIiZDY2lyYztcIjpcIsSIXCIsXCImQ2NvbmludDtcIjpcIuKIsFwiLFwiJkNkb3Q7XCI6XCLEilwiLFwiJkNlZGlsbGE7XCI6XCLCuFwiLFwiJkNlbnRlckRvdDtcIjpcIsK3XCIsXCImQ2ZyO1wiOlwi4oStXCIsXCImQ2hpO1wiOlwizqdcIixcIiZDaXJjbGVEb3Q7XCI6XCLiiplcIixcIiZDaXJjbGVNaW51cztcIjpcIuKKllwiLFwiJkNpcmNsZVBsdXM7XCI6XCLiipVcIixcIiZDaXJjbGVUaW1lcztcIjpcIuKKl1wiLFwiJkNsb2Nrd2lzZUNvbnRvdXJJbnRlZ3JhbDtcIjpcIuKIslwiLFwiJkNsb3NlQ3VybHlEb3VibGVRdW90ZTtcIjpcIuKAnVwiLFwiJkNsb3NlQ3VybHlRdW90ZTtcIjpcIuKAmVwiLFwiJkNvbG9uO1wiOlwi4oi3XCIsXCImQ29sb25lO1wiOlwi4qm0XCIsXCImQ29uZ3J1ZW50O1wiOlwi4omhXCIsXCImQ29uaW50O1wiOlwi4oivXCIsXCImQ29udG91ckludGVncmFsO1wiOlwi4oiuXCIsXCImQ29wZjtcIjpcIuKEglwiLFwiJkNvcHJvZHVjdDtcIjpcIuKIkFwiLFwiJkNvdW50ZXJDbG9ja3dpc2VDb250b3VySW50ZWdyYWw7XCI6XCLiiLNcIixcIiZDcm9zcztcIjpcIuKor1wiLFwiJkNzY3I7XCI6XCLwnZKeXCIsXCImQ3VwO1wiOlwi4ouTXCIsXCImQ3VwQ2FwO1wiOlwi4omNXCIsXCImREQ7XCI6XCLihYVcIixcIiZERG90cmFoZDtcIjpcIuKkkVwiLFwiJkRKY3k7XCI6XCLQglwiLFwiJkRTY3k7XCI6XCLQhVwiLFwiJkRaY3k7XCI6XCLQj1wiLFwiJkRhZ2dlcjtcIjpcIuKAoVwiLFwiJkRhcnI7XCI6XCLihqFcIixcIiZEYXNodjtcIjpcIuKrpFwiLFwiJkRjYXJvbjtcIjpcIsSOXCIsXCImRGN5O1wiOlwi0JRcIixcIiZEZWw7XCI6XCLiiIdcIixcIiZEZWx0YTtcIjpcIs6UXCIsXCImRGZyO1wiOlwi8J2Uh1wiLFwiJkRpYWNyaXRpY2FsQWN1dGU7XCI6XCLCtFwiLFwiJkRpYWNyaXRpY2FsRG90O1wiOlwiy5lcIixcIiZEaWFjcml0aWNhbERvdWJsZUFjdXRlO1wiOlwiy51cIixcIiZEaWFjcml0aWNhbEdyYXZlO1wiOlwiYFwiLFwiJkRpYWNyaXRpY2FsVGlsZGU7XCI6XCLLnFwiLFwiJkRpYW1vbmQ7XCI6XCLii4RcIixcIiZEaWZmZXJlbnRpYWxEO1wiOlwi4oWGXCIsXCImRG9wZjtcIjpcIvCdlLtcIixcIiZEb3Q7XCI6XCLCqFwiLFwiJkRvdERvdDtcIjpcIuKDnFwiLFwiJkRvdEVxdWFsO1wiOlwi4omQXCIsXCImRG91YmxlQ29udG91ckludGVncmFsO1wiOlwi4oivXCIsXCImRG91YmxlRG90O1wiOlwiwqhcIixcIiZEb3VibGVEb3duQXJyb3c7XCI6XCLih5NcIixcIiZEb3VibGVMZWZ0QXJyb3c7XCI6XCLih5BcIixcIiZEb3VibGVMZWZ0UmlnaHRBcnJvdztcIjpcIuKHlFwiLFwiJkRvdWJsZUxlZnRUZWU7XCI6XCLiq6RcIixcIiZEb3VibGVMb25nTGVmdEFycm93O1wiOlwi4p+4XCIsXCImRG91YmxlTG9uZ0xlZnRSaWdodEFycm93O1wiOlwi4p+6XCIsXCImRG91YmxlTG9uZ1JpZ2h0QXJyb3c7XCI6XCLin7lcIixcIiZEb3VibGVSaWdodEFycm93O1wiOlwi4oeSXCIsXCImRG91YmxlUmlnaHRUZWU7XCI6XCLiiqhcIixcIiZEb3VibGVVcEFycm93O1wiOlwi4oeRXCIsXCImRG91YmxlVXBEb3duQXJyb3c7XCI6XCLih5VcIixcIiZEb3VibGVWZXJ0aWNhbEJhcjtcIjpcIuKIpVwiLFwiJkRvd25BcnJvdztcIjpcIuKGk1wiLFwiJkRvd25BcnJvd0JhcjtcIjpcIuKkk1wiLFwiJkRvd25BcnJvd1VwQXJyb3c7XCI6XCLih7VcIixcIiZEb3duQnJldmU7XCI6XCLMkVwiLFwiJkRvd25MZWZ0UmlnaHRWZWN0b3I7XCI6XCLipZBcIixcIiZEb3duTGVmdFRlZVZlY3RvcjtcIjpcIuKlnlwiLFwiJkRvd25MZWZ0VmVjdG9yO1wiOlwi4oa9XCIsXCImRG93bkxlZnRWZWN0b3JCYXI7XCI6XCLipZZcIixcIiZEb3duUmlnaHRUZWVWZWN0b3I7XCI6XCLipZ9cIixcIiZEb3duUmlnaHRWZWN0b3I7XCI6XCLih4FcIixcIiZEb3duUmlnaHRWZWN0b3JCYXI7XCI6XCLipZdcIixcIiZEb3duVGVlO1wiOlwi4oqkXCIsXCImRG93blRlZUFycm93O1wiOlwi4oanXCIsXCImRG93bmFycm93O1wiOlwi4oeTXCIsXCImRHNjcjtcIjpcIvCdkp9cIixcIiZEc3Ryb2s7XCI6XCLEkFwiLFwiJkVORztcIjpcIsWKXCIsXCImRVRIXCI6XCLDkFwiLFwiJkVUSDtcIjpcIsOQXCIsXCImRWFjdXRlXCI6XCLDiVwiLFwiJkVhY3V0ZTtcIjpcIsOJXCIsXCImRWNhcm9uO1wiOlwixJpcIixcIiZFY2lyY1wiOlwiw4pcIixcIiZFY2lyYztcIjpcIsOKXCIsXCImRWN5O1wiOlwi0K1cIixcIiZFZG90O1wiOlwixJZcIixcIiZFZnI7XCI6XCLwnZSIXCIsXCImRWdyYXZlXCI6XCLDiFwiLFwiJkVncmF2ZTtcIjpcIsOIXCIsXCImRWxlbWVudDtcIjpcIuKIiFwiLFwiJkVtYWNyO1wiOlwixJJcIixcIiZFbXB0eVNtYWxsU3F1YXJlO1wiOlwi4pe7XCIsXCImRW1wdHlWZXJ5U21hbGxTcXVhcmU7XCI6XCLilqtcIixcIiZFb2dvbjtcIjpcIsSYXCIsXCImRW9wZjtcIjpcIvCdlLxcIixcIiZFcHNpbG9uO1wiOlwizpVcIixcIiZFcXVhbDtcIjpcIuKptVwiLFwiJkVxdWFsVGlsZGU7XCI6XCLiiYJcIixcIiZFcXVpbGlicml1bTtcIjpcIuKHjFwiLFwiJkVzY3I7XCI6XCLihLBcIixcIiZFc2ltO1wiOlwi4qmzXCIsXCImRXRhO1wiOlwizpdcIixcIiZFdW1sXCI6XCLDi1wiLFwiJkV1bWw7XCI6XCLDi1wiLFwiJkV4aXN0cztcIjpcIuKIg1wiLFwiJkV4cG9uZW50aWFsRTtcIjpcIuKFh1wiLFwiJkZjeTtcIjpcItCkXCIsXCImRmZyO1wiOlwi8J2UiVwiLFwiJkZpbGxlZFNtYWxsU3F1YXJlO1wiOlwi4pe8XCIsXCImRmlsbGVkVmVyeVNtYWxsU3F1YXJlO1wiOlwi4paqXCIsXCImRm9wZjtcIjpcIvCdlL1cIixcIiZGb3JBbGw7XCI6XCLiiIBcIixcIiZGb3VyaWVydHJmO1wiOlwi4oSxXCIsXCImRnNjcjtcIjpcIuKEsVwiLFwiJkdKY3k7XCI6XCLQg1wiLFwiJkdUXCI6XCI+XCIsXCImR1Q7XCI6XCI+XCIsXCImR2FtbWE7XCI6XCLOk1wiLFwiJkdhbW1hZDtcIjpcIs+cXCIsXCImR2JyZXZlO1wiOlwixJ5cIixcIiZHY2VkaWw7XCI6XCLEolwiLFwiJkdjaXJjO1wiOlwixJxcIixcIiZHY3k7XCI6XCLQk1wiLFwiJkdkb3Q7XCI6XCLEoFwiLFwiJkdmcjtcIjpcIvCdlIpcIixcIiZHZztcIjpcIuKLmVwiLFwiJkdvcGY7XCI6XCLwnZS+XCIsXCImR3JlYXRlckVxdWFsO1wiOlwi4omlXCIsXCImR3JlYXRlckVxdWFsTGVzcztcIjpcIuKLm1wiLFwiJkdyZWF0ZXJGdWxsRXF1YWw7XCI6XCLiiadcIixcIiZHcmVhdGVyR3JlYXRlcjtcIjpcIuKqolwiLFwiJkdyZWF0ZXJMZXNzO1wiOlwi4om3XCIsXCImR3JlYXRlclNsYW50RXF1YWw7XCI6XCLiqb5cIixcIiZHcmVhdGVyVGlsZGU7XCI6XCLiibNcIixcIiZHc2NyO1wiOlwi8J2SolwiLFwiJkd0O1wiOlwi4omrXCIsXCImSEFSRGN5O1wiOlwi0KpcIixcIiZIYWNlaztcIjpcIsuHXCIsXCImSGF0O1wiOlwiXlwiLFwiJkhjaXJjO1wiOlwixKRcIixcIiZIZnI7XCI6XCLihIxcIixcIiZIaWxiZXJ0U3BhY2U7XCI6XCLihItcIixcIiZIb3BmO1wiOlwi4oSNXCIsXCImSG9yaXpvbnRhbExpbmU7XCI6XCLilIBcIixcIiZIc2NyO1wiOlwi4oSLXCIsXCImSHN0cm9rO1wiOlwixKZcIixcIiZIdW1wRG93bkh1bXA7XCI6XCLiiY5cIixcIiZIdW1wRXF1YWw7XCI6XCLiiY9cIixcIiZJRWN5O1wiOlwi0JVcIixcIiZJSmxpZztcIjpcIsSyXCIsXCImSU9jeTtcIjpcItCBXCIsXCImSWFjdXRlXCI6XCLDjVwiLFwiJklhY3V0ZTtcIjpcIsONXCIsXCImSWNpcmNcIjpcIsOOXCIsXCImSWNpcmM7XCI6XCLDjlwiLFwiJkljeTtcIjpcItCYXCIsXCImSWRvdDtcIjpcIsSwXCIsXCImSWZyO1wiOlwi4oSRXCIsXCImSWdyYXZlXCI6XCLDjFwiLFwiJklncmF2ZTtcIjpcIsOMXCIsXCImSW07XCI6XCLihJFcIixcIiZJbWFjcjtcIjpcIsSqXCIsXCImSW1hZ2luYXJ5STtcIjpcIuKFiFwiLFwiJkltcGxpZXM7XCI6XCLih5JcIixcIiZJbnQ7XCI6XCLiiKxcIixcIiZJbnRlZ3JhbDtcIjpcIuKIq1wiLFwiJkludGVyc2VjdGlvbjtcIjpcIuKLglwiLFwiJkludmlzaWJsZUNvbW1hO1wiOlwi4oGjXCIsXCImSW52aXNpYmxlVGltZXM7XCI6XCLigaJcIixcIiZJb2dvbjtcIjpcIsSuXCIsXCImSW9wZjtcIjpcIvCdlYBcIixcIiZJb3RhO1wiOlwizplcIixcIiZJc2NyO1wiOlwi4oSQXCIsXCImSXRpbGRlO1wiOlwixKhcIixcIiZJdWtjeTtcIjpcItCGXCIsXCImSXVtbFwiOlwiw49cIixcIiZJdW1sO1wiOlwiw49cIixcIiZKY2lyYztcIjpcIsS0XCIsXCImSmN5O1wiOlwi0JlcIixcIiZKZnI7XCI6XCLwnZSNXCIsXCImSm9wZjtcIjpcIvCdlYFcIixcIiZKc2NyO1wiOlwi8J2SpVwiLFwiJkpzZXJjeTtcIjpcItCIXCIsXCImSnVrY3k7XCI6XCLQhFwiLFwiJktIY3k7XCI6XCLQpVwiLFwiJktKY3k7XCI6XCLQjFwiLFwiJkthcHBhO1wiOlwizppcIixcIiZLY2VkaWw7XCI6XCLEtlwiLFwiJktjeTtcIjpcItCaXCIsXCImS2ZyO1wiOlwi8J2UjlwiLFwiJktvcGY7XCI6XCLwnZWCXCIsXCImS3NjcjtcIjpcIvCdkqZcIixcIiZMSmN5O1wiOlwi0IlcIixcIiZMVFwiOlwiPFwiLFwiJkxUO1wiOlwiPFwiLFwiJkxhY3V0ZTtcIjpcIsS5XCIsXCImTGFtYmRhO1wiOlwizptcIixcIiZMYW5nO1wiOlwi4p+qXCIsXCImTGFwbGFjZXRyZjtcIjpcIuKEklwiLFwiJkxhcnI7XCI6XCLihp5cIixcIiZMY2Fyb247XCI6XCLEvVwiLFwiJkxjZWRpbDtcIjpcIsS7XCIsXCImTGN5O1wiOlwi0JtcIixcIiZMZWZ0QW5nbGVCcmFja2V0O1wiOlwi4p+oXCIsXCImTGVmdEFycm93O1wiOlwi4oaQXCIsXCImTGVmdEFycm93QmFyO1wiOlwi4oekXCIsXCImTGVmdEFycm93UmlnaHRBcnJvdztcIjpcIuKHhlwiLFwiJkxlZnRDZWlsaW5nO1wiOlwi4oyIXCIsXCImTGVmdERvdWJsZUJyYWNrZXQ7XCI6XCLin6ZcIixcIiZMZWZ0RG93blRlZVZlY3RvcjtcIjpcIuKloVwiLFwiJkxlZnREb3duVmVjdG9yO1wiOlwi4oeDXCIsXCImTGVmdERvd25WZWN0b3JCYXI7XCI6XCLipZlcIixcIiZMZWZ0Rmxvb3I7XCI6XCLijIpcIixcIiZMZWZ0UmlnaHRBcnJvdztcIjpcIuKGlFwiLFwiJkxlZnRSaWdodFZlY3RvcjtcIjpcIuKljlwiLFwiJkxlZnRUZWU7XCI6XCLiiqNcIixcIiZMZWZ0VGVlQXJyb3c7XCI6XCLihqRcIixcIiZMZWZ0VGVlVmVjdG9yO1wiOlwi4qWaXCIsXCImTGVmdFRyaWFuZ2xlO1wiOlwi4oqyXCIsXCImTGVmdFRyaWFuZ2xlQmFyO1wiOlwi4qePXCIsXCImTGVmdFRyaWFuZ2xlRXF1YWw7XCI6XCLiirRcIixcIiZMZWZ0VXBEb3duVmVjdG9yO1wiOlwi4qWRXCIsXCImTGVmdFVwVGVlVmVjdG9yO1wiOlwi4qWgXCIsXCImTGVmdFVwVmVjdG9yO1wiOlwi4oa/XCIsXCImTGVmdFVwVmVjdG9yQmFyO1wiOlwi4qWYXCIsXCImTGVmdFZlY3RvcjtcIjpcIuKGvFwiLFwiJkxlZnRWZWN0b3JCYXI7XCI6XCLipZJcIixcIiZMZWZ0YXJyb3c7XCI6XCLih5BcIixcIiZMZWZ0cmlnaHRhcnJvdztcIjpcIuKHlFwiLFwiJkxlc3NFcXVhbEdyZWF0ZXI7XCI6XCLii5pcIixcIiZMZXNzRnVsbEVxdWFsO1wiOlwi4ommXCIsXCImTGVzc0dyZWF0ZXI7XCI6XCLiibZcIixcIiZMZXNzTGVzcztcIjpcIuKqoVwiLFwiJkxlc3NTbGFudEVxdWFsO1wiOlwi4qm9XCIsXCImTGVzc1RpbGRlO1wiOlwi4omyXCIsXCImTGZyO1wiOlwi8J2Uj1wiLFwiJkxsO1wiOlwi4ouYXCIsXCImTGxlZnRhcnJvdztcIjpcIuKHmlwiLFwiJkxtaWRvdDtcIjpcIsS/XCIsXCImTG9uZ0xlZnRBcnJvdztcIjpcIuKftVwiLFwiJkxvbmdMZWZ0UmlnaHRBcnJvdztcIjpcIuKft1wiLFwiJkxvbmdSaWdodEFycm93O1wiOlwi4p+2XCIsXCImTG9uZ2xlZnRhcnJvdztcIjpcIuKfuFwiLFwiJkxvbmdsZWZ0cmlnaHRhcnJvdztcIjpcIuKfulwiLFwiJkxvbmdyaWdodGFycm93O1wiOlwi4p+5XCIsXCImTG9wZjtcIjpcIvCdlYNcIixcIiZMb3dlckxlZnRBcnJvdztcIjpcIuKGmVwiLFwiJkxvd2VyUmlnaHRBcnJvdztcIjpcIuKGmFwiLFwiJkxzY3I7XCI6XCLihJJcIixcIiZMc2g7XCI6XCLihrBcIixcIiZMc3Ryb2s7XCI6XCLFgVwiLFwiJkx0O1wiOlwi4omqXCIsXCImTWFwO1wiOlwi4qSFXCIsXCImTWN5O1wiOlwi0JxcIixcIiZNZWRpdW1TcGFjZTtcIjpcIuKBn1wiLFwiJk1lbGxpbnRyZjtcIjpcIuKEs1wiLFwiJk1mcjtcIjpcIvCdlJBcIixcIiZNaW51c1BsdXM7XCI6XCLiiJNcIixcIiZNb3BmO1wiOlwi8J2VhFwiLFwiJk1zY3I7XCI6XCLihLNcIixcIiZNdTtcIjpcIs6cXCIsXCImTkpjeTtcIjpcItCKXCIsXCImTmFjdXRlO1wiOlwixYNcIixcIiZOY2Fyb247XCI6XCLFh1wiLFwiJk5jZWRpbDtcIjpcIsWFXCIsXCImTmN5O1wiOlwi0J1cIixcIiZOZWdhdGl2ZU1lZGl1bVNwYWNlO1wiOlwi4oCLXCIsXCImTmVnYXRpdmVUaGlja1NwYWNlO1wiOlwi4oCLXCIsXCImTmVnYXRpdmVUaGluU3BhY2U7XCI6XCLigItcIixcIiZOZWdhdGl2ZVZlcnlUaGluU3BhY2U7XCI6XCLigItcIixcIiZOZXN0ZWRHcmVhdGVyR3JlYXRlcjtcIjpcIuKJq1wiLFwiJk5lc3RlZExlc3NMZXNzO1wiOlwi4omqXCIsXCImTmV3TGluZTtcIjpcIlxcblwiLFwiJk5mcjtcIjpcIvCdlJFcIixcIiZOb0JyZWFrO1wiOlwi4oGgXCIsXCImTm9uQnJlYWtpbmdTcGFjZTtcIjpcIsKgXCIsXCImTm9wZjtcIjpcIuKElVwiLFwiJk5vdDtcIjpcIuKrrFwiLFwiJk5vdENvbmdydWVudDtcIjpcIuKJolwiLFwiJk5vdEN1cENhcDtcIjpcIuKJrVwiLFwiJk5vdERvdWJsZVZlcnRpY2FsQmFyO1wiOlwi4oimXCIsXCImTm90RWxlbWVudDtcIjpcIuKIiVwiLFwiJk5vdEVxdWFsO1wiOlwi4omgXCIsXCImTm90RXF1YWxUaWxkZTtcIjpcIuKJgsy4XCIsXCImTm90RXhpc3RzO1wiOlwi4oiEXCIsXCImTm90R3JlYXRlcjtcIjpcIuKJr1wiLFwiJk5vdEdyZWF0ZXJFcXVhbDtcIjpcIuKJsVwiLFwiJk5vdEdyZWF0ZXJGdWxsRXF1YWw7XCI6XCLiiafMuFwiLFwiJk5vdEdyZWF0ZXJHcmVhdGVyO1wiOlwi4omrzLhcIixcIiZOb3RHcmVhdGVyTGVzcztcIjpcIuKJuVwiLFwiJk5vdEdyZWF0ZXJTbGFudEVxdWFsO1wiOlwi4qm+zLhcIixcIiZOb3RHcmVhdGVyVGlsZGU7XCI6XCLiibVcIixcIiZOb3RIdW1wRG93bkh1bXA7XCI6XCLiiY7MuFwiLFwiJk5vdEh1bXBFcXVhbDtcIjpcIuKJj8y4XCIsXCImTm90TGVmdFRyaWFuZ2xlO1wiOlwi4ouqXCIsXCImTm90TGVmdFRyaWFuZ2xlQmFyO1wiOlwi4qePzLhcIixcIiZOb3RMZWZ0VHJpYW5nbGVFcXVhbDtcIjpcIuKLrFwiLFwiJk5vdExlc3M7XCI6XCLiia5cIixcIiZOb3RMZXNzRXF1YWw7XCI6XCLiibBcIixcIiZOb3RMZXNzR3JlYXRlcjtcIjpcIuKJuFwiLFwiJk5vdExlc3NMZXNzO1wiOlwi4omqzLhcIixcIiZOb3RMZXNzU2xhbnRFcXVhbDtcIjpcIuKpvcy4XCIsXCImTm90TGVzc1RpbGRlO1wiOlwi4om0XCIsXCImTm90TmVzdGVkR3JlYXRlckdyZWF0ZXI7XCI6XCLiqqLMuFwiLFwiJk5vdE5lc3RlZExlc3NMZXNzO1wiOlwi4qqhzLhcIixcIiZOb3RQcmVjZWRlcztcIjpcIuKKgFwiLFwiJk5vdFByZWNlZGVzRXF1YWw7XCI6XCLiqq/MuFwiLFwiJk5vdFByZWNlZGVzU2xhbnRFcXVhbDtcIjpcIuKLoFwiLFwiJk5vdFJldmVyc2VFbGVtZW50O1wiOlwi4oiMXCIsXCImTm90UmlnaHRUcmlhbmdsZTtcIjpcIuKLq1wiLFwiJk5vdFJpZ2h0VHJpYW5nbGVCYXI7XCI6XCLip5DMuFwiLFwiJk5vdFJpZ2h0VHJpYW5nbGVFcXVhbDtcIjpcIuKLrVwiLFwiJk5vdFNxdWFyZVN1YnNldDtcIjpcIuKKj8y4XCIsXCImTm90U3F1YXJlU3Vic2V0RXF1YWw7XCI6XCLii6JcIixcIiZOb3RTcXVhcmVTdXBlcnNldDtcIjpcIuKKkMy4XCIsXCImTm90U3F1YXJlU3VwZXJzZXRFcXVhbDtcIjpcIuKLo1wiLFwiJk5vdFN1YnNldDtcIjpcIuKKguKDklwiLFwiJk5vdFN1YnNldEVxdWFsO1wiOlwi4oqIXCIsXCImTm90U3VjY2VlZHM7XCI6XCLiioFcIixcIiZOb3RTdWNjZWVkc0VxdWFsO1wiOlwi4qqwzLhcIixcIiZOb3RTdWNjZWVkc1NsYW50RXF1YWw7XCI6XCLii6FcIixcIiZOb3RTdWNjZWVkc1RpbGRlO1wiOlwi4om/zLhcIixcIiZOb3RTdXBlcnNldDtcIjpcIuKKg+KDklwiLFwiJk5vdFN1cGVyc2V0RXF1YWw7XCI6XCLiiolcIixcIiZOb3RUaWxkZTtcIjpcIuKJgVwiLFwiJk5vdFRpbGRlRXF1YWw7XCI6XCLiiYRcIixcIiZOb3RUaWxkZUZ1bGxFcXVhbDtcIjpcIuKJh1wiLFwiJk5vdFRpbGRlVGlsZGU7XCI6XCLiiYlcIixcIiZOb3RWZXJ0aWNhbEJhcjtcIjpcIuKIpFwiLFwiJk5zY3I7XCI6XCLwnZKpXCIsXCImTnRpbGRlXCI6XCLDkVwiLFwiJk50aWxkZTtcIjpcIsORXCIsXCImTnU7XCI6XCLOnVwiLFwiJk9FbGlnO1wiOlwixZJcIixcIiZPYWN1dGVcIjpcIsOTXCIsXCImT2FjdXRlO1wiOlwiw5NcIixcIiZPY2lyY1wiOlwiw5RcIixcIiZPY2lyYztcIjpcIsOUXCIsXCImT2N5O1wiOlwi0J5cIixcIiZPZGJsYWM7XCI6XCLFkFwiLFwiJk9mcjtcIjpcIvCdlJJcIixcIiZPZ3JhdmVcIjpcIsOSXCIsXCImT2dyYXZlO1wiOlwiw5JcIixcIiZPbWFjcjtcIjpcIsWMXCIsXCImT21lZ2E7XCI6XCLOqVwiLFwiJk9taWNyb247XCI6XCLOn1wiLFwiJk9vcGY7XCI6XCLwnZWGXCIsXCImT3BlbkN1cmx5RG91YmxlUXVvdGU7XCI6XCLigJxcIixcIiZPcGVuQ3VybHlRdW90ZTtcIjpcIuKAmFwiLFwiJk9yO1wiOlwi4qmUXCIsXCImT3NjcjtcIjpcIvCdkqpcIixcIiZPc2xhc2hcIjpcIsOYXCIsXCImT3NsYXNoO1wiOlwiw5hcIixcIiZPdGlsZGVcIjpcIsOVXCIsXCImT3RpbGRlO1wiOlwiw5VcIixcIiZPdGltZXM7XCI6XCLiqLdcIixcIiZPdW1sXCI6XCLDllwiLFwiJk91bWw7XCI6XCLDllwiLFwiJk92ZXJCYXI7XCI6XCLigL5cIixcIiZPdmVyQnJhY2U7XCI6XCLij55cIixcIiZPdmVyQnJhY2tldDtcIjpcIuKOtFwiLFwiJk92ZXJQYXJlbnRoZXNpcztcIjpcIuKPnFwiLFwiJlBhcnRpYWxEO1wiOlwi4oiCXCIsXCImUGN5O1wiOlwi0J9cIixcIiZQZnI7XCI6XCLwnZSTXCIsXCImUGhpO1wiOlwizqZcIixcIiZQaTtcIjpcIs6gXCIsXCImUGx1c01pbnVzO1wiOlwiwrFcIixcIiZQb2luY2FyZXBsYW5lO1wiOlwi4oSMXCIsXCImUG9wZjtcIjpcIuKEmVwiLFwiJlByO1wiOlwi4qq7XCIsXCImUHJlY2VkZXM7XCI6XCLiibpcIixcIiZQcmVjZWRlc0VxdWFsO1wiOlwi4qqvXCIsXCImUHJlY2VkZXNTbGFudEVxdWFsO1wiOlwi4om8XCIsXCImUHJlY2VkZXNUaWxkZTtcIjpcIuKJvlwiLFwiJlByaW1lO1wiOlwi4oCzXCIsXCImUHJvZHVjdDtcIjpcIuKIj1wiLFwiJlByb3BvcnRpb247XCI6XCLiiLdcIixcIiZQcm9wb3J0aW9uYWw7XCI6XCLiiJ1cIixcIiZQc2NyO1wiOlwi8J2Sq1wiLFwiJlBzaTtcIjpcIs6oXCIsXCImUVVPVFwiOidcIicsXCImUVVPVDtcIjonXCInLFwiJlFmcjtcIjpcIvCdlJRcIixcIiZRb3BmO1wiOlwi4oSaXCIsXCImUXNjcjtcIjpcIvCdkqxcIixcIiZSQmFycjtcIjpcIuKkkFwiLFwiJlJFR1wiOlwiwq5cIixcIiZSRUc7XCI6XCLCrlwiLFwiJlJhY3V0ZTtcIjpcIsWUXCIsXCImUmFuZztcIjpcIuKfq1wiLFwiJlJhcnI7XCI6XCLihqBcIixcIiZSYXJydGw7XCI6XCLipJZcIixcIiZSY2Fyb247XCI6XCLFmFwiLFwiJlJjZWRpbDtcIjpcIsWWXCIsXCImUmN5O1wiOlwi0KBcIixcIiZSZTtcIjpcIuKEnFwiLFwiJlJldmVyc2VFbGVtZW50O1wiOlwi4oiLXCIsXCImUmV2ZXJzZUVxdWlsaWJyaXVtO1wiOlwi4oeLXCIsXCImUmV2ZXJzZVVwRXF1aWxpYnJpdW07XCI6XCLipa9cIixcIiZSZnI7XCI6XCLihJxcIixcIiZSaG87XCI6XCLOoVwiLFwiJlJpZ2h0QW5nbGVCcmFja2V0O1wiOlwi4p+pXCIsXCImUmlnaHRBcnJvdztcIjpcIuKGklwiLFwiJlJpZ2h0QXJyb3dCYXI7XCI6XCLih6VcIixcIiZSaWdodEFycm93TGVmdEFycm93O1wiOlwi4oeEXCIsXCImUmlnaHRDZWlsaW5nO1wiOlwi4oyJXCIsXCImUmlnaHREb3VibGVCcmFja2V0O1wiOlwi4p+nXCIsXCImUmlnaHREb3duVGVlVmVjdG9yO1wiOlwi4qWdXCIsXCImUmlnaHREb3duVmVjdG9yO1wiOlwi4oeCXCIsXCImUmlnaHREb3duVmVjdG9yQmFyO1wiOlwi4qWVXCIsXCImUmlnaHRGbG9vcjtcIjpcIuKMi1wiLFwiJlJpZ2h0VGVlO1wiOlwi4oqiXCIsXCImUmlnaHRUZWVBcnJvdztcIjpcIuKGplwiLFwiJlJpZ2h0VGVlVmVjdG9yO1wiOlwi4qWbXCIsXCImUmlnaHRUcmlhbmdsZTtcIjpcIuKKs1wiLFwiJlJpZ2h0VHJpYW5nbGVCYXI7XCI6XCLip5BcIixcIiZSaWdodFRyaWFuZ2xlRXF1YWw7XCI6XCLiirVcIixcIiZSaWdodFVwRG93blZlY3RvcjtcIjpcIuKlj1wiLFwiJlJpZ2h0VXBUZWVWZWN0b3I7XCI6XCLipZxcIixcIiZSaWdodFVwVmVjdG9yO1wiOlwi4oa+XCIsXCImUmlnaHRVcFZlY3RvckJhcjtcIjpcIuKllFwiLFwiJlJpZ2h0VmVjdG9yO1wiOlwi4oeAXCIsXCImUmlnaHRWZWN0b3JCYXI7XCI6XCLipZNcIixcIiZSaWdodGFycm93O1wiOlwi4oeSXCIsXCImUm9wZjtcIjpcIuKEnVwiLFwiJlJvdW5kSW1wbGllcztcIjpcIuKlsFwiLFwiJlJyaWdodGFycm93O1wiOlwi4oebXCIsXCImUnNjcjtcIjpcIuKEm1wiLFwiJlJzaDtcIjpcIuKGsVwiLFwiJlJ1bGVEZWxheWVkO1wiOlwi4qe0XCIsXCImU0hDSGN5O1wiOlwi0KlcIixcIiZTSGN5O1wiOlwi0KhcIixcIiZTT0ZUY3k7XCI6XCLQrFwiLFwiJlNhY3V0ZTtcIjpcIsWaXCIsXCImU2M7XCI6XCLiqrxcIixcIiZTY2Fyb247XCI6XCLFoFwiLFwiJlNjZWRpbDtcIjpcIsWeXCIsXCImU2NpcmM7XCI6XCLFnFwiLFwiJlNjeTtcIjpcItChXCIsXCImU2ZyO1wiOlwi8J2UllwiLFwiJlNob3J0RG93bkFycm93O1wiOlwi4oaTXCIsXCImU2hvcnRMZWZ0QXJyb3c7XCI6XCLihpBcIixcIiZTaG9ydFJpZ2h0QXJyb3c7XCI6XCLihpJcIixcIiZTaG9ydFVwQXJyb3c7XCI6XCLihpFcIixcIiZTaWdtYTtcIjpcIs6jXCIsXCImU21hbGxDaXJjbGU7XCI6XCLiiJhcIixcIiZTb3BmO1wiOlwi8J2VilwiLFwiJlNxcnQ7XCI6XCLiiJpcIixcIiZTcXVhcmU7XCI6XCLilqFcIixcIiZTcXVhcmVJbnRlcnNlY3Rpb247XCI6XCLiipNcIixcIiZTcXVhcmVTdWJzZXQ7XCI6XCLiio9cIixcIiZTcXVhcmVTdWJzZXRFcXVhbDtcIjpcIuKKkVwiLFwiJlNxdWFyZVN1cGVyc2V0O1wiOlwi4oqQXCIsXCImU3F1YXJlU3VwZXJzZXRFcXVhbDtcIjpcIuKKklwiLFwiJlNxdWFyZVVuaW9uO1wiOlwi4oqUXCIsXCImU3NjcjtcIjpcIvCdkq5cIixcIiZTdGFyO1wiOlwi4ouGXCIsXCImU3ViO1wiOlwi4ouQXCIsXCImU3Vic2V0O1wiOlwi4ouQXCIsXCImU3Vic2V0RXF1YWw7XCI6XCLiioZcIixcIiZTdWNjZWVkcztcIjpcIuKJu1wiLFwiJlN1Y2NlZWRzRXF1YWw7XCI6XCLiqrBcIixcIiZTdWNjZWVkc1NsYW50RXF1YWw7XCI6XCLiib1cIixcIiZTdWNjZWVkc1RpbGRlO1wiOlwi4om/XCIsXCImU3VjaFRoYXQ7XCI6XCLiiItcIixcIiZTdW07XCI6XCLiiJFcIixcIiZTdXA7XCI6XCLii5FcIixcIiZTdXBlcnNldDtcIjpcIuKKg1wiLFwiJlN1cGVyc2V0RXF1YWw7XCI6XCLiiodcIixcIiZTdXBzZXQ7XCI6XCLii5FcIixcIiZUSE9STlwiOlwiw55cIixcIiZUSE9STjtcIjpcIsOeXCIsXCImVFJBREU7XCI6XCLihKJcIixcIiZUU0hjeTtcIjpcItCLXCIsXCImVFNjeTtcIjpcItCmXCIsXCImVGFiO1wiOlwiXFx0XCIsXCImVGF1O1wiOlwizqRcIixcIiZUY2Fyb247XCI6XCLFpFwiLFwiJlRjZWRpbDtcIjpcIsWiXCIsXCImVGN5O1wiOlwi0KJcIixcIiZUZnI7XCI6XCLwnZSXXCIsXCImVGhlcmVmb3JlO1wiOlwi4oi0XCIsXCImVGhldGE7XCI6XCLOmFwiLFwiJlRoaWNrU3BhY2U7XCI6XCLigZ/igIpcIixcIiZUaGluU3BhY2U7XCI6XCLigIlcIixcIiZUaWxkZTtcIjpcIuKIvFwiLFwiJlRpbGRlRXF1YWw7XCI6XCLiiYNcIixcIiZUaWxkZUZ1bGxFcXVhbDtcIjpcIuKJhVwiLFwiJlRpbGRlVGlsZGU7XCI6XCLiiYhcIixcIiZUb3BmO1wiOlwi8J2Vi1wiLFwiJlRyaXBsZURvdDtcIjpcIuKDm1wiLFwiJlRzY3I7XCI6XCLwnZKvXCIsXCImVHN0cm9rO1wiOlwixaZcIixcIiZVYWN1dGVcIjpcIsOaXCIsXCImVWFjdXRlO1wiOlwiw5pcIixcIiZVYXJyO1wiOlwi4oafXCIsXCImVWFycm9jaXI7XCI6XCLipYlcIixcIiZVYnJjeTtcIjpcItCOXCIsXCImVWJyZXZlO1wiOlwixaxcIixcIiZVY2lyY1wiOlwiw5tcIixcIiZVY2lyYztcIjpcIsObXCIsXCImVWN5O1wiOlwi0KNcIixcIiZVZGJsYWM7XCI6XCLFsFwiLFwiJlVmcjtcIjpcIvCdlJhcIixcIiZVZ3JhdmVcIjpcIsOZXCIsXCImVWdyYXZlO1wiOlwiw5lcIixcIiZVbWFjcjtcIjpcIsWqXCIsXCImVW5kZXJCYXI7XCI6XCJfXCIsXCImVW5kZXJCcmFjZTtcIjpcIuKPn1wiLFwiJlVuZGVyQnJhY2tldDtcIjpcIuKOtVwiLFwiJlVuZGVyUGFyZW50aGVzaXM7XCI6XCLij51cIixcIiZVbmlvbjtcIjpcIuKLg1wiLFwiJlVuaW9uUGx1cztcIjpcIuKKjlwiLFwiJlVvZ29uO1wiOlwixbJcIixcIiZVb3BmO1wiOlwi8J2VjFwiLFwiJlVwQXJyb3c7XCI6XCLihpFcIixcIiZVcEFycm93QmFyO1wiOlwi4qSSXCIsXCImVXBBcnJvd0Rvd25BcnJvdztcIjpcIuKHhVwiLFwiJlVwRG93bkFycm93O1wiOlwi4oaVXCIsXCImVXBFcXVpbGlicml1bTtcIjpcIuKlrlwiLFwiJlVwVGVlO1wiOlwi4oqlXCIsXCImVXBUZWVBcnJvdztcIjpcIuKGpVwiLFwiJlVwYXJyb3c7XCI6XCLih5FcIixcIiZVcGRvd25hcnJvdztcIjpcIuKHlVwiLFwiJlVwcGVyTGVmdEFycm93O1wiOlwi4oaWXCIsXCImVXBwZXJSaWdodEFycm93O1wiOlwi4oaXXCIsXCImVXBzaTtcIjpcIs+SXCIsXCImVXBzaWxvbjtcIjpcIs6lXCIsXCImVXJpbmc7XCI6XCLFrlwiLFwiJlVzY3I7XCI6XCLwnZKwXCIsXCImVXRpbGRlO1wiOlwixahcIixcIiZVdW1sXCI6XCLDnFwiLFwiJlV1bWw7XCI6XCLDnFwiLFwiJlZEYXNoO1wiOlwi4oqrXCIsXCImVmJhcjtcIjpcIuKrq1wiLFwiJlZjeTtcIjpcItCSXCIsXCImVmRhc2g7XCI6XCLiiqlcIixcIiZWZGFzaGw7XCI6XCLiq6ZcIixcIiZWZWU7XCI6XCLii4FcIixcIiZWZXJiYXI7XCI6XCLigJZcIixcIiZWZXJ0O1wiOlwi4oCWXCIsXCImVmVydGljYWxCYXI7XCI6XCLiiKNcIixcIiZWZXJ0aWNhbExpbmU7XCI6XCJ8XCIsXCImVmVydGljYWxTZXBhcmF0b3I7XCI6XCLinZhcIixcIiZWZXJ0aWNhbFRpbGRlO1wiOlwi4omAXCIsXCImVmVyeVRoaW5TcGFjZTtcIjpcIuKAilwiLFwiJlZmcjtcIjpcIvCdlJlcIixcIiZWb3BmO1wiOlwi8J2VjVwiLFwiJlZzY3I7XCI6XCLwnZKxXCIsXCImVnZkYXNoO1wiOlwi4oqqXCIsXCImV2NpcmM7XCI6XCLFtFwiLFwiJldlZGdlO1wiOlwi4ouAXCIsXCImV2ZyO1wiOlwi8J2UmlwiLFwiJldvcGY7XCI6XCLwnZWOXCIsXCImV3NjcjtcIjpcIvCdkrJcIixcIiZYZnI7XCI6XCLwnZSbXCIsXCImWGk7XCI6XCLOnlwiLFwiJlhvcGY7XCI6XCLwnZWPXCIsXCImWHNjcjtcIjpcIvCdkrNcIixcIiZZQWN5O1wiOlwi0K9cIixcIiZZSWN5O1wiOlwi0IdcIixcIiZZVWN5O1wiOlwi0K5cIixcIiZZYWN1dGVcIjpcIsOdXCIsXCImWWFjdXRlO1wiOlwiw51cIixcIiZZY2lyYztcIjpcIsW2XCIsXCImWWN5O1wiOlwi0KtcIixcIiZZZnI7XCI6XCLwnZScXCIsXCImWW9wZjtcIjpcIvCdlZBcIixcIiZZc2NyO1wiOlwi8J2StFwiLFwiJll1bWw7XCI6XCLFuFwiLFwiJlpIY3k7XCI6XCLQllwiLFwiJlphY3V0ZTtcIjpcIsW5XCIsXCImWmNhcm9uO1wiOlwixb1cIixcIiZaY3k7XCI6XCLQl1wiLFwiJlpkb3Q7XCI6XCLFu1wiLFwiJlplcm9XaWR0aFNwYWNlO1wiOlwi4oCLXCIsXCImWmV0YTtcIjpcIs6WXCIsXCImWmZyO1wiOlwi4oSoXCIsXCImWm9wZjtcIjpcIuKEpFwiLFwiJlpzY3I7XCI6XCLwnZK1XCIsXCImYWFjdXRlXCI6XCLDoVwiLFwiJmFhY3V0ZTtcIjpcIsOhXCIsXCImYWJyZXZlO1wiOlwixINcIixcIiZhYztcIjpcIuKIvlwiLFwiJmFjRTtcIjpcIuKIvsyzXCIsXCImYWNkO1wiOlwi4oi/XCIsXCImYWNpcmNcIjpcIsOiXCIsXCImYWNpcmM7XCI6XCLDolwiLFwiJmFjdXRlXCI6XCLCtFwiLFwiJmFjdXRlO1wiOlwiwrRcIixcIiZhY3k7XCI6XCLQsFwiLFwiJmFlbGlnXCI6XCLDplwiLFwiJmFlbGlnO1wiOlwiw6ZcIixcIiZhZjtcIjpcIuKBoVwiLFwiJmFmcjtcIjpcIvCdlJ5cIixcIiZhZ3JhdmVcIjpcIsOgXCIsXCImYWdyYXZlO1wiOlwiw6BcIixcIiZhbGVmc3ltO1wiOlwi4oS1XCIsXCImYWxlcGg7XCI6XCLihLVcIixcIiZhbHBoYTtcIjpcIs6xXCIsXCImYW1hY3I7XCI6XCLEgVwiLFwiJmFtYWxnO1wiOlwi4qi/XCIsXCImYW1wXCI6XCImXCIsXCImYW1wO1wiOlwiJlwiLFwiJmFuZDtcIjpcIuKIp1wiLFwiJmFuZGFuZDtcIjpcIuKplVwiLFwiJmFuZGQ7XCI6XCLiqZxcIixcIiZhbmRzbG9wZTtcIjpcIuKpmFwiLFwiJmFuZHY7XCI6XCLiqZpcIixcIiZhbmc7XCI6XCLiiKBcIixcIiZhbmdlO1wiOlwi4qakXCIsXCImYW5nbGU7XCI6XCLiiKBcIixcIiZhbmdtc2Q7XCI6XCLiiKFcIixcIiZhbmdtc2RhYTtcIjpcIuKmqFwiLFwiJmFuZ21zZGFiO1wiOlwi4qapXCIsXCImYW5nbXNkYWM7XCI6XCLipqpcIixcIiZhbmdtc2RhZDtcIjpcIuKmq1wiLFwiJmFuZ21zZGFlO1wiOlwi4qasXCIsXCImYW5nbXNkYWY7XCI6XCLipq1cIixcIiZhbmdtc2RhZztcIjpcIuKmrlwiLFwiJmFuZ21zZGFoO1wiOlwi4qavXCIsXCImYW5ncnQ7XCI6XCLiiJ9cIixcIiZhbmdydHZiO1wiOlwi4oq+XCIsXCImYW5ncnR2YmQ7XCI6XCLipp1cIixcIiZhbmdzcGg7XCI6XCLiiKJcIixcIiZhbmdzdDtcIjpcIsOFXCIsXCImYW5nemFycjtcIjpcIuKNvFwiLFwiJmFvZ29uO1wiOlwixIVcIixcIiZhb3BmO1wiOlwi8J2VklwiLFwiJmFwO1wiOlwi4omIXCIsXCImYXBFO1wiOlwi4qmwXCIsXCImYXBhY2lyO1wiOlwi4qmvXCIsXCImYXBlO1wiOlwi4omKXCIsXCImYXBpZDtcIjpcIuKJi1wiLFwiJmFwb3M7XCI6XCInXCIsXCImYXBwcm94O1wiOlwi4omIXCIsXCImYXBwcm94ZXE7XCI6XCLiiYpcIixcIiZhcmluZ1wiOlwiw6VcIixcIiZhcmluZztcIjpcIsOlXCIsXCImYXNjcjtcIjpcIvCdkrZcIixcIiZhc3Q7XCI6XCIqXCIsXCImYXN5bXA7XCI6XCLiiYhcIixcIiZhc3ltcGVxO1wiOlwi4omNXCIsXCImYXRpbGRlXCI6XCLDo1wiLFwiJmF0aWxkZTtcIjpcIsOjXCIsXCImYXVtbFwiOlwiw6RcIixcIiZhdW1sO1wiOlwiw6RcIixcIiZhd2NvbmludDtcIjpcIuKIs1wiLFwiJmF3aW50O1wiOlwi4qiRXCIsXCImYk5vdDtcIjpcIuKrrVwiLFwiJmJhY2tjb25nO1wiOlwi4omMXCIsXCImYmFja2Vwc2lsb247XCI6XCLPtlwiLFwiJmJhY2twcmltZTtcIjpcIuKAtVwiLFwiJmJhY2tzaW07XCI6XCLiiL1cIixcIiZiYWNrc2ltZXE7XCI6XCLii41cIixcIiZiYXJ2ZWU7XCI6XCLiir1cIixcIiZiYXJ3ZWQ7XCI6XCLijIVcIixcIiZiYXJ3ZWRnZTtcIjpcIuKMhVwiLFwiJmJicms7XCI6XCLijrVcIixcIiZiYnJrdGJyaztcIjpcIuKOtlwiLFwiJmJjb25nO1wiOlwi4omMXCIsXCImYmN5O1wiOlwi0LFcIixcIiZiZHF1bztcIjpcIuKAnlwiLFwiJmJlY2F1cztcIjpcIuKItVwiLFwiJmJlY2F1c2U7XCI6XCLiiLVcIixcIiZiZW1wdHl2O1wiOlwi4qawXCIsXCImYmVwc2k7XCI6XCLPtlwiLFwiJmJlcm5vdTtcIjpcIuKErFwiLFwiJmJldGE7XCI6XCLOslwiLFwiJmJldGg7XCI6XCLihLZcIixcIiZiZXR3ZWVuO1wiOlwi4omsXCIsXCImYmZyO1wiOlwi8J2Un1wiLFwiJmJpZ2NhcDtcIjpcIuKLglwiLFwiJmJpZ2NpcmM7XCI6XCLil69cIixcIiZiaWdjdXA7XCI6XCLii4NcIixcIiZiaWdvZG90O1wiOlwi4qiAXCIsXCImYmlnb3BsdXM7XCI6XCLiqIFcIixcIiZiaWdvdGltZXM7XCI6XCLiqIJcIixcIiZiaWdzcWN1cDtcIjpcIuKohlwiLFwiJmJpZ3N0YXI7XCI6XCLimIVcIixcIiZiaWd0cmlhbmdsZWRvd247XCI6XCLilr1cIixcIiZiaWd0cmlhbmdsZXVwO1wiOlwi4pazXCIsXCImYmlndXBsdXM7XCI6XCLiqIRcIixcIiZiaWd2ZWU7XCI6XCLii4FcIixcIiZiaWd3ZWRnZTtcIjpcIuKLgFwiLFwiJmJrYXJvdztcIjpcIuKkjVwiLFwiJmJsYWNrbG96ZW5nZTtcIjpcIuKnq1wiLFwiJmJsYWNrc3F1YXJlO1wiOlwi4paqXCIsXCImYmxhY2t0cmlhbmdsZTtcIjpcIuKWtFwiLFwiJmJsYWNrdHJpYW5nbGVkb3duO1wiOlwi4pa+XCIsXCImYmxhY2t0cmlhbmdsZWxlZnQ7XCI6XCLil4JcIixcIiZibGFja3RyaWFuZ2xlcmlnaHQ7XCI6XCLilrhcIixcIiZibGFuaztcIjpcIuKQo1wiLFwiJmJsazEyO1wiOlwi4paSXCIsXCImYmxrMTQ7XCI6XCLilpFcIixcIiZibGszNDtcIjpcIuKWk1wiLFwiJmJsb2NrO1wiOlwi4paIXCIsXCImYm5lO1wiOlwiPeKDpVwiLFwiJmJuZXF1aXY7XCI6XCLiiaHig6VcIixcIiZibm90O1wiOlwi4oyQXCIsXCImYm9wZjtcIjpcIvCdlZNcIixcIiZib3Q7XCI6XCLiiqVcIixcIiZib3R0b207XCI6XCLiiqVcIixcIiZib3d0aWU7XCI6XCLii4hcIixcIiZib3hETDtcIjpcIuKVl1wiLFwiJmJveERSO1wiOlwi4pWUXCIsXCImYm94RGw7XCI6XCLilZZcIixcIiZib3hEcjtcIjpcIuKVk1wiLFwiJmJveEg7XCI6XCLilZBcIixcIiZib3hIRDtcIjpcIuKVplwiLFwiJmJveEhVO1wiOlwi4pWpXCIsXCImYm94SGQ7XCI6XCLilaRcIixcIiZib3hIdTtcIjpcIuKVp1wiLFwiJmJveFVMO1wiOlwi4pWdXCIsXCImYm94VVI7XCI6XCLilZpcIixcIiZib3hVbDtcIjpcIuKVnFwiLFwiJmJveFVyO1wiOlwi4pWZXCIsXCImYm94VjtcIjpcIuKVkVwiLFwiJmJveFZIO1wiOlwi4pWsXCIsXCImYm94Vkw7XCI6XCLilaNcIixcIiZib3hWUjtcIjpcIuKVoFwiLFwiJmJveFZoO1wiOlwi4pWrXCIsXCImYm94Vmw7XCI6XCLilaJcIixcIiZib3hWcjtcIjpcIuKVn1wiLFwiJmJveGJveDtcIjpcIuKniVwiLFwiJmJveGRMO1wiOlwi4pWVXCIsXCImYm94ZFI7XCI6XCLilZJcIixcIiZib3hkbDtcIjpcIuKUkFwiLFwiJmJveGRyO1wiOlwi4pSMXCIsXCImYm94aDtcIjpcIuKUgFwiLFwiJmJveGhEO1wiOlwi4pWlXCIsXCImYm94aFU7XCI6XCLilahcIixcIiZib3hoZDtcIjpcIuKUrFwiLFwiJmJveGh1O1wiOlwi4pS0XCIsXCImYm94bWludXM7XCI6XCLiip9cIixcIiZib3hwbHVzO1wiOlwi4oqeXCIsXCImYm94dGltZXM7XCI6XCLiiqBcIixcIiZib3h1TDtcIjpcIuKVm1wiLFwiJmJveHVSO1wiOlwi4pWYXCIsXCImYm94dWw7XCI6XCLilJhcIixcIiZib3h1cjtcIjpcIuKUlFwiLFwiJmJveHY7XCI6XCLilIJcIixcIiZib3h2SDtcIjpcIuKVqlwiLFwiJmJveHZMO1wiOlwi4pWhXCIsXCImYm94dlI7XCI6XCLilZ5cIixcIiZib3h2aDtcIjpcIuKUvFwiLFwiJmJveHZsO1wiOlwi4pSkXCIsXCImYm94dnI7XCI6XCLilJxcIixcIiZicHJpbWU7XCI6XCLigLVcIixcIiZicmV2ZTtcIjpcIsuYXCIsXCImYnJ2YmFyXCI6XCLCplwiLFwiJmJydmJhcjtcIjpcIsKmXCIsXCImYnNjcjtcIjpcIvCdkrdcIixcIiZic2VtaTtcIjpcIuKBj1wiLFwiJmJzaW07XCI6XCLiiL1cIixcIiZic2ltZTtcIjpcIuKLjVwiLFwiJmJzb2w7XCI6XCJcXFxcXCIsXCImYnNvbGI7XCI6XCLip4VcIixcIiZic29saHN1YjtcIjpcIuKfiFwiLFwiJmJ1bGw7XCI6XCLigKJcIixcIiZidWxsZXQ7XCI6XCLigKJcIixcIiZidW1wO1wiOlwi4omOXCIsXCImYnVtcEU7XCI6XCLiqq5cIixcIiZidW1wZTtcIjpcIuKJj1wiLFwiJmJ1bXBlcTtcIjpcIuKJj1wiLFwiJmNhY3V0ZTtcIjpcIsSHXCIsXCImY2FwO1wiOlwi4oipXCIsXCImY2FwYW5kO1wiOlwi4qmEXCIsXCImY2FwYnJjdXA7XCI6XCLiqYlcIixcIiZjYXBjYXA7XCI6XCLiqYtcIixcIiZjYXBjdXA7XCI6XCLiqYdcIixcIiZjYXBkb3Q7XCI6XCLiqYBcIixcIiZjYXBzO1wiOlwi4oip77iAXCIsXCImY2FyZXQ7XCI6XCLigYFcIixcIiZjYXJvbjtcIjpcIsuHXCIsXCImY2NhcHM7XCI6XCLiqY1cIixcIiZjY2Fyb247XCI6XCLEjVwiLFwiJmNjZWRpbFwiOlwiw6dcIixcIiZjY2VkaWw7XCI6XCLDp1wiLFwiJmNjaXJjO1wiOlwixIlcIixcIiZjY3VwcztcIjpcIuKpjFwiLFwiJmNjdXBzc207XCI6XCLiqZBcIixcIiZjZG90O1wiOlwixItcIixcIiZjZWRpbFwiOlwiwrhcIixcIiZjZWRpbDtcIjpcIsK4XCIsXCImY2VtcHR5djtcIjpcIuKmslwiLFwiJmNlbnRcIjpcIsKiXCIsXCImY2VudDtcIjpcIsKiXCIsXCImY2VudGVyZG90O1wiOlwiwrdcIixcIiZjZnI7XCI6XCLwnZSgXCIsXCImY2hjeTtcIjpcItGHXCIsXCImY2hlY2s7XCI6XCLinJNcIixcIiZjaGVja21hcms7XCI6XCLinJNcIixcIiZjaGk7XCI6XCLPh1wiLFwiJmNpcjtcIjpcIuKXi1wiLFwiJmNpckU7XCI6XCLip4NcIixcIiZjaXJjO1wiOlwiy4ZcIixcIiZjaXJjZXE7XCI6XCLiiZdcIixcIiZjaXJjbGVhcnJvd2xlZnQ7XCI6XCLihrpcIixcIiZjaXJjbGVhcnJvd3JpZ2h0O1wiOlwi4oa7XCIsXCImY2lyY2xlZFI7XCI6XCLCrlwiLFwiJmNpcmNsZWRTO1wiOlwi4pOIXCIsXCImY2lyY2xlZGFzdDtcIjpcIuKKm1wiLFwiJmNpcmNsZWRjaXJjO1wiOlwi4oqaXCIsXCImY2lyY2xlZGRhc2g7XCI6XCLiip1cIixcIiZjaXJlO1wiOlwi4omXXCIsXCImY2lyZm5pbnQ7XCI6XCLiqJBcIixcIiZjaXJtaWQ7XCI6XCLiq69cIixcIiZjaXJzY2lyO1wiOlwi4qeCXCIsXCImY2x1YnM7XCI6XCLimaNcIixcIiZjbHVic3VpdDtcIjpcIuKZo1wiLFwiJmNvbG9uO1wiOlwiOlwiLFwiJmNvbG9uZTtcIjpcIuKJlFwiLFwiJmNvbG9uZXE7XCI6XCLiiZRcIixcIiZjb21tYTtcIjpcIixcIixcIiZjb21tYXQ7XCI6XCJAXCIsXCImY29tcDtcIjpcIuKIgVwiLFwiJmNvbXBmbjtcIjpcIuKImFwiLFwiJmNvbXBsZW1lbnQ7XCI6XCLiiIFcIixcIiZjb21wbGV4ZXM7XCI6XCLihIJcIixcIiZjb25nO1wiOlwi4omFXCIsXCImY29uZ2RvdDtcIjpcIuKprVwiLFwiJmNvbmludDtcIjpcIuKIrlwiLFwiJmNvcGY7XCI6XCLwnZWUXCIsXCImY29wcm9kO1wiOlwi4oiQXCIsXCImY29weVwiOlwiwqlcIixcIiZjb3B5O1wiOlwiwqlcIixcIiZjb3B5c3I7XCI6XCLihJdcIixcIiZjcmFycjtcIjpcIuKGtVwiLFwiJmNyb3NzO1wiOlwi4pyXXCIsXCImY3NjcjtcIjpcIvCdkrhcIixcIiZjc3ViO1wiOlwi4quPXCIsXCImY3N1YmU7XCI6XCLiq5FcIixcIiZjc3VwO1wiOlwi4quQXCIsXCImY3N1cGU7XCI6XCLiq5JcIixcIiZjdGRvdDtcIjpcIuKLr1wiLFwiJmN1ZGFycmw7XCI6XCLipLhcIixcIiZjdWRhcnJyO1wiOlwi4qS1XCIsXCImY3VlcHI7XCI6XCLii55cIixcIiZjdWVzYztcIjpcIuKLn1wiLFwiJmN1bGFycjtcIjpcIuKGtlwiLFwiJmN1bGFycnA7XCI6XCLipL1cIixcIiZjdXA7XCI6XCLiiKpcIixcIiZjdXBicmNhcDtcIjpcIuKpiFwiLFwiJmN1cGNhcDtcIjpcIuKphlwiLFwiJmN1cGN1cDtcIjpcIuKpilwiLFwiJmN1cGRvdDtcIjpcIuKKjVwiLFwiJmN1cG9yO1wiOlwi4qmFXCIsXCImY3VwcztcIjpcIuKIqu+4gFwiLFwiJmN1cmFycjtcIjpcIuKGt1wiLFwiJmN1cmFycm07XCI6XCLipLxcIixcIiZjdXJseWVxcHJlYztcIjpcIuKLnlwiLFwiJmN1cmx5ZXFzdWNjO1wiOlwi4oufXCIsXCImY3VybHl2ZWU7XCI6XCLii45cIixcIiZjdXJseXdlZGdlO1wiOlwi4ouPXCIsXCImY3VycmVuXCI6XCLCpFwiLFwiJmN1cnJlbjtcIjpcIsKkXCIsXCImY3VydmVhcnJvd2xlZnQ7XCI6XCLihrZcIixcIiZjdXJ2ZWFycm93cmlnaHQ7XCI6XCLihrdcIixcIiZjdXZlZTtcIjpcIuKLjlwiLFwiJmN1d2VkO1wiOlwi4ouPXCIsXCImY3djb25pbnQ7XCI6XCLiiLJcIixcIiZjd2ludDtcIjpcIuKIsVwiLFwiJmN5bGN0eTtcIjpcIuKMrVwiLFwiJmRBcnI7XCI6XCLih5NcIixcIiZkSGFyO1wiOlwi4qWlXCIsXCImZGFnZ2VyO1wiOlwi4oCgXCIsXCImZGFsZXRoO1wiOlwi4oS4XCIsXCImZGFycjtcIjpcIuKGk1wiLFwiJmRhc2g7XCI6XCLigJBcIixcIiZkYXNodjtcIjpcIuKKo1wiLFwiJmRia2Fyb3c7XCI6XCLipI9cIixcIiZkYmxhYztcIjpcIsudXCIsXCImZGNhcm9uO1wiOlwixI9cIixcIiZkY3k7XCI6XCLQtFwiLFwiJmRkO1wiOlwi4oWGXCIsXCImZGRhZ2dlcjtcIjpcIuKAoVwiLFwiJmRkYXJyO1wiOlwi4oeKXCIsXCImZGRvdHNlcTtcIjpcIuKpt1wiLFwiJmRlZ1wiOlwiwrBcIixcIiZkZWc7XCI6XCLCsFwiLFwiJmRlbHRhO1wiOlwizrRcIixcIiZkZW1wdHl2O1wiOlwi4qaxXCIsXCImZGZpc2h0O1wiOlwi4qW/XCIsXCImZGZyO1wiOlwi8J2UoVwiLFwiJmRoYXJsO1wiOlwi4oeDXCIsXCImZGhhcnI7XCI6XCLih4JcIixcIiZkaWFtO1wiOlwi4ouEXCIsXCImZGlhbW9uZDtcIjpcIuKLhFwiLFwiJmRpYW1vbmRzdWl0O1wiOlwi4pmmXCIsXCImZGlhbXM7XCI6XCLimaZcIixcIiZkaWU7XCI6XCLCqFwiLFwiJmRpZ2FtbWE7XCI6XCLPnVwiLFwiJmRpc2luO1wiOlwi4ouyXCIsXCImZGl2O1wiOlwiw7dcIixcIiZkaXZpZGVcIjpcIsO3XCIsXCImZGl2aWRlO1wiOlwiw7dcIixcIiZkaXZpZGVvbnRpbWVzO1wiOlwi4ouHXCIsXCImZGl2b254O1wiOlwi4ouHXCIsXCImZGpjeTtcIjpcItGSXCIsXCImZGxjb3JuO1wiOlwi4oyeXCIsXCImZGxjcm9wO1wiOlwi4oyNXCIsXCImZG9sbGFyO1wiOlwiJFwiLFwiJmRvcGY7XCI6XCLwnZWVXCIsXCImZG90O1wiOlwiy5lcIixcIiZkb3RlcTtcIjpcIuKJkFwiLFwiJmRvdGVxZG90O1wiOlwi4omRXCIsXCImZG90bWludXM7XCI6XCLiiLhcIixcIiZkb3RwbHVzO1wiOlwi4oiUXCIsXCImZG90c3F1YXJlO1wiOlwi4oqhXCIsXCImZG91YmxlYmFyd2VkZ2U7XCI6XCLijIZcIixcIiZkb3duYXJyb3c7XCI6XCLihpNcIixcIiZkb3duZG93bmFycm93cztcIjpcIuKHilwiLFwiJmRvd25oYXJwb29ubGVmdDtcIjpcIuKHg1wiLFwiJmRvd25oYXJwb29ucmlnaHQ7XCI6XCLih4JcIixcIiZkcmJrYXJvdztcIjpcIuKkkFwiLFwiJmRyY29ybjtcIjpcIuKMn1wiLFwiJmRyY3JvcDtcIjpcIuKMjFwiLFwiJmRzY3I7XCI6XCLwnZK5XCIsXCImZHNjeTtcIjpcItGVXCIsXCImZHNvbDtcIjpcIuKntlwiLFwiJmRzdHJvaztcIjpcIsSRXCIsXCImZHRkb3Q7XCI6XCLii7FcIixcIiZkdHJpO1wiOlwi4pa/XCIsXCImZHRyaWY7XCI6XCLilr5cIixcIiZkdWFycjtcIjpcIuKHtVwiLFwiJmR1aGFyO1wiOlwi4qWvXCIsXCImZHdhbmdsZTtcIjpcIuKmplwiLFwiJmR6Y3k7XCI6XCLRn1wiLFwiJmR6aWdyYXJyO1wiOlwi4p+/XCIsXCImZUREb3Q7XCI6XCLiqbdcIixcIiZlRG90O1wiOlwi4omRXCIsXCImZWFjdXRlXCI6XCLDqVwiLFwiJmVhY3V0ZTtcIjpcIsOpXCIsXCImZWFzdGVyO1wiOlwi4qmuXCIsXCImZWNhcm9uO1wiOlwixJtcIixcIiZlY2lyO1wiOlwi4omWXCIsXCImZWNpcmNcIjpcIsOqXCIsXCImZWNpcmM7XCI6XCLDqlwiLFwiJmVjb2xvbjtcIjpcIuKJlVwiLFwiJmVjeTtcIjpcItGNXCIsXCImZWRvdDtcIjpcIsSXXCIsXCImZWU7XCI6XCLihYdcIixcIiZlZkRvdDtcIjpcIuKJklwiLFwiJmVmcjtcIjpcIvCdlKJcIixcIiZlZztcIjpcIuKqmlwiLFwiJmVncmF2ZVwiOlwiw6hcIixcIiZlZ3JhdmU7XCI6XCLDqFwiLFwiJmVncztcIjpcIuKqllwiLFwiJmVnc2RvdDtcIjpcIuKqmFwiLFwiJmVsO1wiOlwi4qqZXCIsXCImZWxpbnRlcnM7XCI6XCLij6dcIixcIiZlbGw7XCI6XCLihJNcIixcIiZlbHM7XCI6XCLiqpVcIixcIiZlbHNkb3Q7XCI6XCLiqpdcIixcIiZlbWFjcjtcIjpcIsSTXCIsXCImZW1wdHk7XCI6XCLiiIVcIixcIiZlbXB0eXNldDtcIjpcIuKIhVwiLFwiJmVtcHR5djtcIjpcIuKIhVwiLFwiJmVtc3AxMztcIjpcIuKAhFwiLFwiJmVtc3AxNDtcIjpcIuKAhVwiLFwiJmVtc3A7XCI6XCLigINcIixcIiZlbmc7XCI6XCLFi1wiLFwiJmVuc3A7XCI6XCLigIJcIixcIiZlb2dvbjtcIjpcIsSZXCIsXCImZW9wZjtcIjpcIvCdlZZcIixcIiZlcGFyO1wiOlwi4ouVXCIsXCImZXBhcnNsO1wiOlwi4qejXCIsXCImZXBsdXM7XCI6XCLiqbFcIixcIiZlcHNpO1wiOlwizrVcIixcIiZlcHNpbG9uO1wiOlwizrVcIixcIiZlcHNpdjtcIjpcIs+1XCIsXCImZXFjaXJjO1wiOlwi4omWXCIsXCImZXFjb2xvbjtcIjpcIuKJlVwiLFwiJmVxc2ltO1wiOlwi4omCXCIsXCImZXFzbGFudGd0cjtcIjpcIuKqllwiLFwiJmVxc2xhbnRsZXNzO1wiOlwi4qqVXCIsXCImZXF1YWxzO1wiOlwiPVwiLFwiJmVxdWVzdDtcIjpcIuKJn1wiLFwiJmVxdWl2O1wiOlwi4omhXCIsXCImZXF1aXZERDtcIjpcIuKpuFwiLFwiJmVxdnBhcnNsO1wiOlwi4qelXCIsXCImZXJEb3Q7XCI6XCLiiZNcIixcIiZlcmFycjtcIjpcIuKlsVwiLFwiJmVzY3I7XCI6XCLihK9cIixcIiZlc2RvdDtcIjpcIuKJkFwiLFwiJmVzaW07XCI6XCLiiYJcIixcIiZldGE7XCI6XCLOt1wiLFwiJmV0aFwiOlwiw7BcIixcIiZldGg7XCI6XCLDsFwiLFwiJmV1bWxcIjpcIsOrXCIsXCImZXVtbDtcIjpcIsOrXCIsXCImZXVybztcIjpcIuKCrFwiLFwiJmV4Y2w7XCI6XCIhXCIsXCImZXhpc3Q7XCI6XCLiiINcIixcIiZleHBlY3RhdGlvbjtcIjpcIuKEsFwiLFwiJmV4cG9uZW50aWFsZTtcIjpcIuKFh1wiLFwiJmZhbGxpbmdkb3RzZXE7XCI6XCLiiZJcIixcIiZmY3k7XCI6XCLRhFwiLFwiJmZlbWFsZTtcIjpcIuKZgFwiLFwiJmZmaWxpZztcIjpcIu+sg1wiLFwiJmZmbGlnO1wiOlwi76yAXCIsXCImZmZsbGlnO1wiOlwi76yEXCIsXCImZmZyO1wiOlwi8J2Uo1wiLFwiJmZpbGlnO1wiOlwi76yBXCIsXCImZmpsaWc7XCI6XCJmalwiLFwiJmZsYXQ7XCI6XCLima1cIixcIiZmbGxpZztcIjpcIu+sglwiLFwiJmZsdG5zO1wiOlwi4paxXCIsXCImZm5vZjtcIjpcIsaSXCIsXCImZm9wZjtcIjpcIvCdlZdcIixcIiZmb3JhbGw7XCI6XCLiiIBcIixcIiZmb3JrO1wiOlwi4ouUXCIsXCImZm9ya3Y7XCI6XCLiq5lcIixcIiZmcGFydGludDtcIjpcIuKojVwiLFwiJmZyYWMxMlwiOlwiwr1cIixcIiZmcmFjMTI7XCI6XCLCvVwiLFwiJmZyYWMxMztcIjpcIuKFk1wiLFwiJmZyYWMxNFwiOlwiwrxcIixcIiZmcmFjMTQ7XCI6XCLCvFwiLFwiJmZyYWMxNTtcIjpcIuKFlVwiLFwiJmZyYWMxNjtcIjpcIuKFmVwiLFwiJmZyYWMxODtcIjpcIuKFm1wiLFwiJmZyYWMyMztcIjpcIuKFlFwiLFwiJmZyYWMyNTtcIjpcIuKFllwiLFwiJmZyYWMzNFwiOlwiwr5cIixcIiZmcmFjMzQ7XCI6XCLCvlwiLFwiJmZyYWMzNTtcIjpcIuKFl1wiLFwiJmZyYWMzODtcIjpcIuKFnFwiLFwiJmZyYWM0NTtcIjpcIuKFmFwiLFwiJmZyYWM1NjtcIjpcIuKFmlwiLFwiJmZyYWM1ODtcIjpcIuKFnVwiLFwiJmZyYWM3ODtcIjpcIuKFnlwiLFwiJmZyYXNsO1wiOlwi4oGEXCIsXCImZnJvd247XCI6XCLijKJcIixcIiZmc2NyO1wiOlwi8J2Su1wiLFwiJmdFO1wiOlwi4omnXCIsXCImZ0VsO1wiOlwi4qqMXCIsXCImZ2FjdXRlO1wiOlwix7VcIixcIiZnYW1tYTtcIjpcIs6zXCIsXCImZ2FtbWFkO1wiOlwiz51cIixcIiZnYXA7XCI6XCLiqoZcIixcIiZnYnJldmU7XCI6XCLEn1wiLFwiJmdjaXJjO1wiOlwixJ1cIixcIiZnY3k7XCI6XCLQs1wiLFwiJmdkb3Q7XCI6XCLEoVwiLFwiJmdlO1wiOlwi4omlXCIsXCImZ2VsO1wiOlwi4oubXCIsXCImZ2VxO1wiOlwi4omlXCIsXCImZ2VxcTtcIjpcIuKJp1wiLFwiJmdlcXNsYW50O1wiOlwi4qm+XCIsXCImZ2VzO1wiOlwi4qm+XCIsXCImZ2VzY2M7XCI6XCLiqqlcIixcIiZnZXNkb3Q7XCI6XCLiqoBcIixcIiZnZXNkb3RvO1wiOlwi4qqCXCIsXCImZ2VzZG90b2w7XCI6XCLiqoRcIixcIiZnZXNsO1wiOlwi4oub77iAXCIsXCImZ2VzbGVzO1wiOlwi4qqUXCIsXCImZ2ZyO1wiOlwi8J2UpFwiLFwiJmdnO1wiOlwi4omrXCIsXCImZ2dnO1wiOlwi4ouZXCIsXCImZ2ltZWw7XCI6XCLihLdcIixcIiZnamN5O1wiOlwi0ZNcIixcIiZnbDtcIjpcIuKJt1wiLFwiJmdsRTtcIjpcIuKqklwiLFwiJmdsYTtcIjpcIuKqpVwiLFwiJmdsajtcIjpcIuKqpFwiLFwiJmduRTtcIjpcIuKJqVwiLFwiJmduYXA7XCI6XCLiqopcIixcIiZnbmFwcHJveDtcIjpcIuKqilwiLFwiJmduZTtcIjpcIuKqiFwiLFwiJmduZXE7XCI6XCLiqohcIixcIiZnbmVxcTtcIjpcIuKJqVwiLFwiJmduc2ltO1wiOlwi4ounXCIsXCImZ29wZjtcIjpcIvCdlZhcIixcIiZncmF2ZTtcIjpcImBcIixcIiZnc2NyO1wiOlwi4oSKXCIsXCImZ3NpbTtcIjpcIuKJs1wiLFwiJmdzaW1lO1wiOlwi4qqOXCIsXCImZ3NpbWw7XCI6XCLiqpBcIixcIiZndFwiOlwiPlwiLFwiJmd0O1wiOlwiPlwiLFwiJmd0Y2M7XCI6XCLiqqdcIixcIiZndGNpcjtcIjpcIuKpulwiLFwiJmd0ZG90O1wiOlwi4ouXXCIsXCImZ3RsUGFyO1wiOlwi4qaVXCIsXCImZ3RxdWVzdDtcIjpcIuKpvFwiLFwiJmd0cmFwcHJveDtcIjpcIuKqhlwiLFwiJmd0cmFycjtcIjpcIuKluFwiLFwiJmd0cmRvdDtcIjpcIuKLl1wiLFwiJmd0cmVxbGVzcztcIjpcIuKLm1wiLFwiJmd0cmVxcWxlc3M7XCI6XCLiqoxcIixcIiZndHJsZXNzO1wiOlwi4om3XCIsXCImZ3Ryc2ltO1wiOlwi4omzXCIsXCImZ3ZlcnRuZXFxO1wiOlwi4omp77iAXCIsXCImZ3ZuRTtcIjpcIuKJqe+4gFwiLFwiJmhBcnI7XCI6XCLih5RcIixcIiZoYWlyc3A7XCI6XCLigIpcIixcIiZoYWxmO1wiOlwiwr1cIixcIiZoYW1pbHQ7XCI6XCLihItcIixcIiZoYXJkY3k7XCI6XCLRilwiLFwiJmhhcnI7XCI6XCLihpRcIixcIiZoYXJyY2lyO1wiOlwi4qWIXCIsXCImaGFycnc7XCI6XCLihq1cIixcIiZoYmFyO1wiOlwi4oSPXCIsXCImaGNpcmM7XCI6XCLEpVwiLFwiJmhlYXJ0cztcIjpcIuKZpVwiLFwiJmhlYXJ0c3VpdDtcIjpcIuKZpVwiLFwiJmhlbGxpcDtcIjpcIuKAplwiLFwiJmhlcmNvbjtcIjpcIuKKuVwiLFwiJmhmcjtcIjpcIvCdlKVcIixcIiZoa3NlYXJvdztcIjpcIuKkpVwiLFwiJmhrc3dhcm93O1wiOlwi4qSmXCIsXCImaG9hcnI7XCI6XCLih79cIixcIiZob210aHQ7XCI6XCLiiLtcIixcIiZob29rbGVmdGFycm93O1wiOlwi4oapXCIsXCImaG9va3JpZ2h0YXJyb3c7XCI6XCLihqpcIixcIiZob3BmO1wiOlwi8J2VmVwiLFwiJmhvcmJhcjtcIjpcIuKAlVwiLFwiJmhzY3I7XCI6XCLwnZK9XCIsXCImaHNsYXNoO1wiOlwi4oSPXCIsXCImaHN0cm9rO1wiOlwixKdcIixcIiZoeWJ1bGw7XCI6XCLigYNcIixcIiZoeXBoZW47XCI6XCLigJBcIixcIiZpYWN1dGVcIjpcIsOtXCIsXCImaWFjdXRlO1wiOlwiw61cIixcIiZpYztcIjpcIuKBo1wiLFwiJmljaXJjXCI6XCLDrlwiLFwiJmljaXJjO1wiOlwiw65cIixcIiZpY3k7XCI6XCLQuFwiLFwiJmllY3k7XCI6XCLQtVwiLFwiJmlleGNsXCI6XCLCoVwiLFwiJmlleGNsO1wiOlwiwqFcIixcIiZpZmY7XCI6XCLih5RcIixcIiZpZnI7XCI6XCLwnZSmXCIsXCImaWdyYXZlXCI6XCLDrFwiLFwiJmlncmF2ZTtcIjpcIsOsXCIsXCImaWk7XCI6XCLihYhcIixcIiZpaWlpbnQ7XCI6XCLiqIxcIixcIiZpaWludDtcIjpcIuKIrVwiLFwiJmlpbmZpbjtcIjpcIuKnnFwiLFwiJmlpb3RhO1wiOlwi4oSpXCIsXCImaWpsaWc7XCI6XCLEs1wiLFwiJmltYWNyO1wiOlwixKtcIixcIiZpbWFnZTtcIjpcIuKEkVwiLFwiJmltYWdsaW5lO1wiOlwi4oSQXCIsXCImaW1hZ3BhcnQ7XCI6XCLihJFcIixcIiZpbWF0aDtcIjpcIsSxXCIsXCImaW1vZjtcIjpcIuKKt1wiLFwiJmltcGVkO1wiOlwixrVcIixcIiZpbjtcIjpcIuKIiFwiLFwiJmluY2FyZTtcIjpcIuKEhVwiLFwiJmluZmluO1wiOlwi4oieXCIsXCImaW5maW50aWU7XCI6XCLip51cIixcIiZpbm9kb3Q7XCI6XCLEsVwiLFwiJmludDtcIjpcIuKIq1wiLFwiJmludGNhbDtcIjpcIuKKulwiLFwiJmludGVnZXJzO1wiOlwi4oSkXCIsXCImaW50ZXJjYWw7XCI6XCLiirpcIixcIiZpbnRsYXJoaztcIjpcIuKol1wiLFwiJmludHByb2Q7XCI6XCLiqLxcIixcIiZpb2N5O1wiOlwi0ZFcIixcIiZpb2dvbjtcIjpcIsSvXCIsXCImaW9wZjtcIjpcIvCdlZpcIixcIiZpb3RhO1wiOlwizrlcIixcIiZpcHJvZDtcIjpcIuKovFwiLFwiJmlxdWVzdFwiOlwiwr9cIixcIiZpcXVlc3Q7XCI6XCLCv1wiLFwiJmlzY3I7XCI6XCLwnZK+XCIsXCImaXNpbjtcIjpcIuKIiFwiLFwiJmlzaW5FO1wiOlwi4ou5XCIsXCImaXNpbmRvdDtcIjpcIuKLtVwiLFwiJmlzaW5zO1wiOlwi4ou0XCIsXCImaXNpbnN2O1wiOlwi4ouzXCIsXCImaXNpbnY7XCI6XCLiiIhcIixcIiZpdDtcIjpcIuKBolwiLFwiJml0aWxkZTtcIjpcIsSpXCIsXCImaXVrY3k7XCI6XCLRllwiLFwiJml1bWxcIjpcIsOvXCIsXCImaXVtbDtcIjpcIsOvXCIsXCImamNpcmM7XCI6XCLEtVwiLFwiJmpjeTtcIjpcItC5XCIsXCImamZyO1wiOlwi8J2Up1wiLFwiJmptYXRoO1wiOlwiyLdcIixcIiZqb3BmO1wiOlwi8J2Vm1wiLFwiJmpzY3I7XCI6XCLwnZK/XCIsXCImanNlcmN5O1wiOlwi0ZhcIixcIiZqdWtjeTtcIjpcItGUXCIsXCIma2FwcGE7XCI6XCLOulwiLFwiJmthcHBhdjtcIjpcIs+wXCIsXCIma2NlZGlsO1wiOlwixLdcIixcIiZrY3k7XCI6XCLQulwiLFwiJmtmcjtcIjpcIvCdlKhcIixcIiZrZ3JlZW47XCI6XCLEuFwiLFwiJmtoY3k7XCI6XCLRhVwiLFwiJmtqY3k7XCI6XCLRnFwiLFwiJmtvcGY7XCI6XCLwnZWcXCIsXCIma3NjcjtcIjpcIvCdk4BcIixcIiZsQWFycjtcIjpcIuKHmlwiLFwiJmxBcnI7XCI6XCLih5BcIixcIiZsQXRhaWw7XCI6XCLipJtcIixcIiZsQmFycjtcIjpcIuKkjlwiLFwiJmxFO1wiOlwi4ommXCIsXCImbEVnO1wiOlwi4qqLXCIsXCImbEhhcjtcIjpcIuKlolwiLFwiJmxhY3V0ZTtcIjpcIsS6XCIsXCImbGFlbXB0eXY7XCI6XCLiprRcIixcIiZsYWdyYW47XCI6XCLihJJcIixcIiZsYW1iZGE7XCI6XCLOu1wiLFwiJmxhbmc7XCI6XCLin6hcIixcIiZsYW5nZDtcIjpcIuKmkVwiLFwiJmxhbmdsZTtcIjpcIuKfqFwiLFwiJmxhcDtcIjpcIuKqhVwiLFwiJmxhcXVvXCI6XCLCq1wiLFwiJmxhcXVvO1wiOlwiwqtcIixcIiZsYXJyO1wiOlwi4oaQXCIsXCImbGFycmI7XCI6XCLih6RcIixcIiZsYXJyYmZzO1wiOlwi4qSfXCIsXCImbGFycmZzO1wiOlwi4qSdXCIsXCImbGFycmhrO1wiOlwi4oapXCIsXCImbGFycmxwO1wiOlwi4oarXCIsXCImbGFycnBsO1wiOlwi4qS5XCIsXCImbGFycnNpbTtcIjpcIuKls1wiLFwiJmxhcnJ0bDtcIjpcIuKGolwiLFwiJmxhdDtcIjpcIuKqq1wiLFwiJmxhdGFpbDtcIjpcIuKkmVwiLFwiJmxhdGU7XCI6XCLiqq1cIixcIiZsYXRlcztcIjpcIuKqre+4gFwiLFwiJmxiYXJyO1wiOlwi4qSMXCIsXCImbGJicms7XCI6XCLinbJcIixcIiZsYnJhY2U7XCI6XCJ7XCIsXCImbGJyYWNrO1wiOlwiW1wiLFwiJmxicmtlO1wiOlwi4qaLXCIsXCImbGJya3NsZDtcIjpcIuKmj1wiLFwiJmxicmtzbHU7XCI6XCLipo1cIixcIiZsY2Fyb247XCI6XCLEvlwiLFwiJmxjZWRpbDtcIjpcIsS8XCIsXCImbGNlaWw7XCI6XCLijIhcIixcIiZsY3ViO1wiOlwie1wiLFwiJmxjeTtcIjpcItC7XCIsXCImbGRjYTtcIjpcIuKktlwiLFwiJmxkcXVvO1wiOlwi4oCcXCIsXCImbGRxdW9yO1wiOlwi4oCeXCIsXCImbGRyZGhhcjtcIjpcIuKlp1wiLFwiJmxkcnVzaGFyO1wiOlwi4qWLXCIsXCImbGRzaDtcIjpcIuKGslwiLFwiJmxlO1wiOlwi4omkXCIsXCImbGVmdGFycm93O1wiOlwi4oaQXCIsXCImbGVmdGFycm93dGFpbDtcIjpcIuKGolwiLFwiJmxlZnRoYXJwb29uZG93bjtcIjpcIuKGvVwiLFwiJmxlZnRoYXJwb29udXA7XCI6XCLihrxcIixcIiZsZWZ0bGVmdGFycm93cztcIjpcIuKHh1wiLFwiJmxlZnRyaWdodGFycm93O1wiOlwi4oaUXCIsXCImbGVmdHJpZ2h0YXJyb3dzO1wiOlwi4oeGXCIsXCImbGVmdHJpZ2h0aGFycG9vbnM7XCI6XCLih4tcIixcIiZsZWZ0cmlnaHRzcXVpZ2Fycm93O1wiOlwi4oatXCIsXCImbGVmdHRocmVldGltZXM7XCI6XCLii4tcIixcIiZsZWc7XCI6XCLii5pcIixcIiZsZXE7XCI6XCLiiaRcIixcIiZsZXFxO1wiOlwi4ommXCIsXCImbGVxc2xhbnQ7XCI6XCLiqb1cIixcIiZsZXM7XCI6XCLiqb1cIixcIiZsZXNjYztcIjpcIuKqqFwiLFwiJmxlc2RvdDtcIjpcIuKpv1wiLFwiJmxlc2RvdG87XCI6XCLiqoFcIixcIiZsZXNkb3RvcjtcIjpcIuKqg1wiLFwiJmxlc2c7XCI6XCLii5rvuIBcIixcIiZsZXNnZXM7XCI6XCLiqpNcIixcIiZsZXNzYXBwcm94O1wiOlwi4qqFXCIsXCImbGVzc2RvdDtcIjpcIuKLllwiLFwiJmxlc3NlcWd0cjtcIjpcIuKLmlwiLFwiJmxlc3NlcXFndHI7XCI6XCLiqotcIixcIiZsZXNzZ3RyO1wiOlwi4om2XCIsXCImbGVzc3NpbTtcIjpcIuKJslwiLFwiJmxmaXNodDtcIjpcIuKlvFwiLFwiJmxmbG9vcjtcIjpcIuKMilwiLFwiJmxmcjtcIjpcIvCdlKlcIixcIiZsZztcIjpcIuKJtlwiLFwiJmxnRTtcIjpcIuKqkVwiLFwiJmxoYXJkO1wiOlwi4oa9XCIsXCImbGhhcnU7XCI6XCLihrxcIixcIiZsaGFydWw7XCI6XCLipapcIixcIiZsaGJsaztcIjpcIuKWhFwiLFwiJmxqY3k7XCI6XCLRmVwiLFwiJmxsO1wiOlwi4omqXCIsXCImbGxhcnI7XCI6XCLih4dcIixcIiZsbGNvcm5lcjtcIjpcIuKMnlwiLFwiJmxsaGFyZDtcIjpcIuKlq1wiLFwiJmxsdHJpO1wiOlwi4pe6XCIsXCImbG1pZG90O1wiOlwixYBcIixcIiZsbW91c3Q7XCI6XCLijrBcIixcIiZsbW91c3RhY2hlO1wiOlwi4o6wXCIsXCImbG5FO1wiOlwi4omoXCIsXCImbG5hcDtcIjpcIuKqiVwiLFwiJmxuYXBwcm94O1wiOlwi4qqJXCIsXCImbG5lO1wiOlwi4qqHXCIsXCImbG5lcTtcIjpcIuKqh1wiLFwiJmxuZXFxO1wiOlwi4omoXCIsXCImbG5zaW07XCI6XCLii6ZcIixcIiZsb2FuZztcIjpcIuKfrFwiLFwiJmxvYXJyO1wiOlwi4oe9XCIsXCImbG9icms7XCI6XCLin6ZcIixcIiZsb25nbGVmdGFycm93O1wiOlwi4p+1XCIsXCImbG9uZ2xlZnRyaWdodGFycm93O1wiOlwi4p+3XCIsXCImbG9uZ21hcHN0bztcIjpcIuKfvFwiLFwiJmxvbmdyaWdodGFycm93O1wiOlwi4p+2XCIsXCImbG9vcGFycm93bGVmdDtcIjpcIuKGq1wiLFwiJmxvb3BhcnJvd3JpZ2h0O1wiOlwi4oasXCIsXCImbG9wYXI7XCI6XCLipoVcIixcIiZsb3BmO1wiOlwi8J2VnVwiLFwiJmxvcGx1cztcIjpcIuKorVwiLFwiJmxvdGltZXM7XCI6XCLiqLRcIixcIiZsb3dhc3Q7XCI6XCLiiJdcIixcIiZsb3diYXI7XCI6XCJfXCIsXCImbG96O1wiOlwi4peKXCIsXCImbG96ZW5nZTtcIjpcIuKXilwiLFwiJmxvemY7XCI6XCLip6tcIixcIiZscGFyO1wiOlwiKFwiLFwiJmxwYXJsdDtcIjpcIuKmk1wiLFwiJmxyYXJyO1wiOlwi4oeGXCIsXCImbHJjb3JuZXI7XCI6XCLijJ9cIixcIiZscmhhcjtcIjpcIuKHi1wiLFwiJmxyaGFyZDtcIjpcIuKlrVwiLFwiJmxybTtcIjpcIuKAjlwiLFwiJmxydHJpO1wiOlwi4oq/XCIsXCImbHNhcXVvO1wiOlwi4oC5XCIsXCImbHNjcjtcIjpcIvCdk4FcIixcIiZsc2g7XCI6XCLihrBcIixcIiZsc2ltO1wiOlwi4omyXCIsXCImbHNpbWU7XCI6XCLiqo1cIixcIiZsc2ltZztcIjpcIuKqj1wiLFwiJmxzcWI7XCI6XCJbXCIsXCImbHNxdW87XCI6XCLigJhcIixcIiZsc3F1b3I7XCI6XCLigJpcIixcIiZsc3Ryb2s7XCI6XCLFglwiLFwiJmx0XCI6XCI8XCIsXCImbHQ7XCI6XCI8XCIsXCImbHRjYztcIjpcIuKqplwiLFwiJmx0Y2lyO1wiOlwi4qm5XCIsXCImbHRkb3Q7XCI6XCLii5ZcIixcIiZsdGhyZWU7XCI6XCLii4tcIixcIiZsdGltZXM7XCI6XCLii4lcIixcIiZsdGxhcnI7XCI6XCLipbZcIixcIiZsdHF1ZXN0O1wiOlwi4qm7XCIsXCImbHRyUGFyO1wiOlwi4qaWXCIsXCImbHRyaTtcIjpcIuKXg1wiLFwiJmx0cmllO1wiOlwi4oq0XCIsXCImbHRyaWY7XCI6XCLil4JcIixcIiZsdXJkc2hhcjtcIjpcIuKlilwiLFwiJmx1cnVoYXI7XCI6XCLipaZcIixcIiZsdmVydG5lcXE7XCI6XCLiiajvuIBcIixcIiZsdm5FO1wiOlwi4omo77iAXCIsXCImbUREb3Q7XCI6XCLiiLpcIixcIiZtYWNyXCI6XCLCr1wiLFwiJm1hY3I7XCI6XCLCr1wiLFwiJm1hbGU7XCI6XCLimYJcIixcIiZtYWx0O1wiOlwi4pygXCIsXCImbWFsdGVzZTtcIjpcIuKcoFwiLFwiJm1hcDtcIjpcIuKGplwiLFwiJm1hcHN0bztcIjpcIuKGplwiLFwiJm1hcHN0b2Rvd247XCI6XCLihqdcIixcIiZtYXBzdG9sZWZ0O1wiOlwi4oakXCIsXCImbWFwc3RvdXA7XCI6XCLihqVcIixcIiZtYXJrZXI7XCI6XCLilq5cIixcIiZtY29tbWE7XCI6XCLiqKlcIixcIiZtY3k7XCI6XCLQvFwiLFwiJm1kYXNoO1wiOlwi4oCUXCIsXCImbWVhc3VyZWRhbmdsZTtcIjpcIuKIoVwiLFwiJm1mcjtcIjpcIvCdlKpcIixcIiZtaG87XCI6XCLihKdcIixcIiZtaWNyb1wiOlwiwrVcIixcIiZtaWNybztcIjpcIsK1XCIsXCImbWlkO1wiOlwi4oijXCIsXCImbWlkYXN0O1wiOlwiKlwiLFwiJm1pZGNpcjtcIjpcIuKrsFwiLFwiJm1pZGRvdFwiOlwiwrdcIixcIiZtaWRkb3Q7XCI6XCLCt1wiLFwiJm1pbnVzO1wiOlwi4oiSXCIsXCImbWludXNiO1wiOlwi4oqfXCIsXCImbWludXNkO1wiOlwi4oi4XCIsXCImbWludXNkdTtcIjpcIuKoqlwiLFwiJm1sY3A7XCI6XCLiq5tcIixcIiZtbGRyO1wiOlwi4oCmXCIsXCImbW5wbHVzO1wiOlwi4oiTXCIsXCImbW9kZWxzO1wiOlwi4oqnXCIsXCImbW9wZjtcIjpcIvCdlZ5cIixcIiZtcDtcIjpcIuKIk1wiLFwiJm1zY3I7XCI6XCLwnZOCXCIsXCImbXN0cG9zO1wiOlwi4oi+XCIsXCImbXU7XCI6XCLOvFwiLFwiJm11bHRpbWFwO1wiOlwi4oq4XCIsXCImbXVtYXA7XCI6XCLiirhcIixcIiZuR2c7XCI6XCLii5nMuFwiLFwiJm5HdDtcIjpcIuKJq+KDklwiLFwiJm5HdHY7XCI6XCLiiavMuFwiLFwiJm5MZWZ0YXJyb3c7XCI6XCLih41cIixcIiZuTGVmdHJpZ2h0YXJyb3c7XCI6XCLih45cIixcIiZuTGw7XCI6XCLii5jMuFwiLFwiJm5MdDtcIjpcIuKJquKDklwiLFwiJm5MdHY7XCI6XCLiiarMuFwiLFwiJm5SaWdodGFycm93O1wiOlwi4oePXCIsXCImblZEYXNoO1wiOlwi4oqvXCIsXCImblZkYXNoO1wiOlwi4oquXCIsXCImbmFibGE7XCI6XCLiiIdcIixcIiZuYWN1dGU7XCI6XCLFhFwiLFwiJm5hbmc7XCI6XCLiiKDig5JcIixcIiZuYXA7XCI6XCLiiYlcIixcIiZuYXBFO1wiOlwi4qmwzLhcIixcIiZuYXBpZDtcIjpcIuKJi8y4XCIsXCImbmFwb3M7XCI6XCLFiVwiLFwiJm5hcHByb3g7XCI6XCLiiYlcIixcIiZuYXR1cjtcIjpcIuKZrlwiLFwiJm5hdHVyYWw7XCI6XCLima5cIixcIiZuYXR1cmFscztcIjpcIuKElVwiLFwiJm5ic3BcIjpcIsKgXCIsXCImbmJzcDtcIjpcIsKgXCIsXCImbmJ1bXA7XCI6XCLiiY7MuFwiLFwiJm5idW1wZTtcIjpcIuKJj8y4XCIsXCImbmNhcDtcIjpcIuKpg1wiLFwiJm5jYXJvbjtcIjpcIsWIXCIsXCImbmNlZGlsO1wiOlwixYZcIixcIiZuY29uZztcIjpcIuKJh1wiLFwiJm5jb25nZG90O1wiOlwi4qmtzLhcIixcIiZuY3VwO1wiOlwi4qmCXCIsXCImbmN5O1wiOlwi0L1cIixcIiZuZGFzaDtcIjpcIuKAk1wiLFwiJm5lO1wiOlwi4omgXCIsXCImbmVBcnI7XCI6XCLih5dcIixcIiZuZWFyaGs7XCI6XCLipKRcIixcIiZuZWFycjtcIjpcIuKGl1wiLFwiJm5lYXJyb3c7XCI6XCLihpdcIixcIiZuZWRvdDtcIjpcIuKJkMy4XCIsXCImbmVxdWl2O1wiOlwi4omiXCIsXCImbmVzZWFyO1wiOlwi4qSoXCIsXCImbmVzaW07XCI6XCLiiYLMuFwiLFwiJm5leGlzdDtcIjpcIuKIhFwiLFwiJm5leGlzdHM7XCI6XCLiiIRcIixcIiZuZnI7XCI6XCLwnZSrXCIsXCImbmdFO1wiOlwi4omnzLhcIixcIiZuZ2U7XCI6XCLiibFcIixcIiZuZ2VxO1wiOlwi4omxXCIsXCImbmdlcXE7XCI6XCLiiafMuFwiLFwiJm5nZXFzbGFudDtcIjpcIuKpvsy4XCIsXCImbmdlcztcIjpcIuKpvsy4XCIsXCImbmdzaW07XCI6XCLiibVcIixcIiZuZ3Q7XCI6XCLiia9cIixcIiZuZ3RyO1wiOlwi4omvXCIsXCImbmhBcnI7XCI6XCLih45cIixcIiZuaGFycjtcIjpcIuKGrlwiLFwiJm5ocGFyO1wiOlwi4quyXCIsXCImbmk7XCI6XCLiiItcIixcIiZuaXM7XCI6XCLii7xcIixcIiZuaXNkO1wiOlwi4ou6XCIsXCImbml2O1wiOlwi4oiLXCIsXCImbmpjeTtcIjpcItGaXCIsXCImbmxBcnI7XCI6XCLih41cIixcIiZubEU7XCI6XCLiiabMuFwiLFwiJm5sYXJyO1wiOlwi4oaaXCIsXCImbmxkcjtcIjpcIuKApVwiLFwiJm5sZTtcIjpcIuKJsFwiLFwiJm5sZWZ0YXJyb3c7XCI6XCLihppcIixcIiZubGVmdHJpZ2h0YXJyb3c7XCI6XCLihq5cIixcIiZubGVxO1wiOlwi4omwXCIsXCImbmxlcXE7XCI6XCLiiabMuFwiLFwiJm5sZXFzbGFudDtcIjpcIuKpvcy4XCIsXCImbmxlcztcIjpcIuKpvcy4XCIsXCImbmxlc3M7XCI6XCLiia5cIixcIiZubHNpbTtcIjpcIuKJtFwiLFwiJm5sdDtcIjpcIuKJrlwiLFwiJm5sdHJpO1wiOlwi4ouqXCIsXCImbmx0cmllO1wiOlwi4ousXCIsXCImbm1pZDtcIjpcIuKIpFwiLFwiJm5vcGY7XCI6XCLwnZWfXCIsXCImbm90XCI6XCLCrFwiLFwiJm5vdDtcIjpcIsKsXCIsXCImbm90aW47XCI6XCLiiIlcIixcIiZub3RpbkU7XCI6XCLii7nMuFwiLFwiJm5vdGluZG90O1wiOlwi4ou1zLhcIixcIiZub3RpbnZhO1wiOlwi4oiJXCIsXCImbm90aW52YjtcIjpcIuKLt1wiLFwiJm5vdGludmM7XCI6XCLii7ZcIixcIiZub3RuaTtcIjpcIuKIjFwiLFwiJm5vdG5pdmE7XCI6XCLiiIxcIixcIiZub3RuaXZiO1wiOlwi4ou+XCIsXCImbm90bml2YztcIjpcIuKLvVwiLFwiJm5wYXI7XCI6XCLiiKZcIixcIiZucGFyYWxsZWw7XCI6XCLiiKZcIixcIiZucGFyc2w7XCI6XCLiq73ig6VcIixcIiZucGFydDtcIjpcIuKIgsy4XCIsXCImbnBvbGludDtcIjpcIuKolFwiLFwiJm5wcjtcIjpcIuKKgFwiLFwiJm5wcmN1ZTtcIjpcIuKLoFwiLFwiJm5wcmU7XCI6XCLiqq/MuFwiLFwiJm5wcmVjO1wiOlwi4oqAXCIsXCImbnByZWNlcTtcIjpcIuKqr8y4XCIsXCImbnJBcnI7XCI6XCLih49cIixcIiZucmFycjtcIjpcIuKGm1wiLFwiJm5yYXJyYztcIjpcIuKks8y4XCIsXCImbnJhcnJ3O1wiOlwi4oadzLhcIixcIiZucmlnaHRhcnJvdztcIjpcIuKGm1wiLFwiJm5ydHJpO1wiOlwi4ourXCIsXCImbnJ0cmllO1wiOlwi4outXCIsXCImbnNjO1wiOlwi4oqBXCIsXCImbnNjY3VlO1wiOlwi4ouhXCIsXCImbnNjZTtcIjpcIuKqsMy4XCIsXCImbnNjcjtcIjpcIvCdk4NcIixcIiZuc2hvcnRtaWQ7XCI6XCLiiKRcIixcIiZuc2hvcnRwYXJhbGxlbDtcIjpcIuKIplwiLFwiJm5zaW07XCI6XCLiiYFcIixcIiZuc2ltZTtcIjpcIuKJhFwiLFwiJm5zaW1lcTtcIjpcIuKJhFwiLFwiJm5zbWlkO1wiOlwi4oikXCIsXCImbnNwYXI7XCI6XCLiiKZcIixcIiZuc3FzdWJlO1wiOlwi4ouiXCIsXCImbnNxc3VwZTtcIjpcIuKLo1wiLFwiJm5zdWI7XCI6XCLiioRcIixcIiZuc3ViRTtcIjpcIuKrhcy4XCIsXCImbnN1YmU7XCI6XCLiiohcIixcIiZuc3Vic2V0O1wiOlwi4oqC4oOSXCIsXCImbnN1YnNldGVxO1wiOlwi4oqIXCIsXCImbnN1YnNldGVxcTtcIjpcIuKrhcy4XCIsXCImbnN1Y2M7XCI6XCLiioFcIixcIiZuc3VjY2VxO1wiOlwi4qqwzLhcIixcIiZuc3VwO1wiOlwi4oqFXCIsXCImbnN1cEU7XCI6XCLiq4bMuFwiLFwiJm5zdXBlO1wiOlwi4oqJXCIsXCImbnN1cHNldDtcIjpcIuKKg+KDklwiLFwiJm5zdXBzZXRlcTtcIjpcIuKKiVwiLFwiJm5zdXBzZXRlcXE7XCI6XCLiq4bMuFwiLFwiJm50Z2w7XCI6XCLiiblcIixcIiZudGlsZGVcIjpcIsOxXCIsXCImbnRpbGRlO1wiOlwiw7FcIixcIiZudGxnO1wiOlwi4om4XCIsXCImbnRyaWFuZ2xlbGVmdDtcIjpcIuKLqlwiLFwiJm50cmlhbmdsZWxlZnRlcTtcIjpcIuKLrFwiLFwiJm50cmlhbmdsZXJpZ2h0O1wiOlwi4ourXCIsXCImbnRyaWFuZ2xlcmlnaHRlcTtcIjpcIuKLrVwiLFwiJm51O1wiOlwizr1cIixcIiZudW07XCI6XCIjXCIsXCImbnVtZXJvO1wiOlwi4oSWXCIsXCImbnVtc3A7XCI6XCLigIdcIixcIiZudkRhc2g7XCI6XCLiiq1cIixcIiZudkhhcnI7XCI6XCLipIRcIixcIiZudmFwO1wiOlwi4omN4oOSXCIsXCImbnZkYXNoO1wiOlwi4oqsXCIsXCImbnZnZTtcIjpcIuKJpeKDklwiLFwiJm52Z3Q7XCI6XCI+4oOSXCIsXCImbnZpbmZpbjtcIjpcIuKnnlwiLFwiJm52bEFycjtcIjpcIuKkglwiLFwiJm52bGU7XCI6XCLiiaTig5JcIixcIiZudmx0O1wiOlwiPOKDklwiLFwiJm52bHRyaWU7XCI6XCLiirTig5JcIixcIiZudnJBcnI7XCI6XCLipINcIixcIiZudnJ0cmllO1wiOlwi4oq14oOSXCIsXCImbnZzaW07XCI6XCLiiLzig5JcIixcIiZud0FycjtcIjpcIuKHllwiLFwiJm53YXJoaztcIjpcIuKko1wiLFwiJm53YXJyO1wiOlwi4oaWXCIsXCImbndhcnJvdztcIjpcIuKGllwiLFwiJm53bmVhcjtcIjpcIuKkp1wiLFwiJm9TO1wiOlwi4pOIXCIsXCImb2FjdXRlXCI6XCLDs1wiLFwiJm9hY3V0ZTtcIjpcIsOzXCIsXCImb2FzdDtcIjpcIuKKm1wiLFwiJm9jaXI7XCI6XCLiippcIixcIiZvY2lyY1wiOlwiw7RcIixcIiZvY2lyYztcIjpcIsO0XCIsXCImb2N5O1wiOlwi0L5cIixcIiZvZGFzaDtcIjpcIuKKnVwiLFwiJm9kYmxhYztcIjpcIsWRXCIsXCImb2RpdjtcIjpcIuKouFwiLFwiJm9kb3Q7XCI6XCLiiplcIixcIiZvZHNvbGQ7XCI6XCLiprxcIixcIiZvZWxpZztcIjpcIsWTXCIsXCImb2ZjaXI7XCI6XCLipr9cIixcIiZvZnI7XCI6XCLwnZSsXCIsXCImb2dvbjtcIjpcIsubXCIsXCImb2dyYXZlXCI6XCLDslwiLFwiJm9ncmF2ZTtcIjpcIsOyXCIsXCImb2d0O1wiOlwi4qeBXCIsXCImb2hiYXI7XCI6XCLiprVcIixcIiZvaG07XCI6XCLOqVwiLFwiJm9pbnQ7XCI6XCLiiK5cIixcIiZvbGFycjtcIjpcIuKGulwiLFwiJm9sY2lyO1wiOlwi4qa+XCIsXCImb2xjcm9zcztcIjpcIuKmu1wiLFwiJm9saW5lO1wiOlwi4oC+XCIsXCImb2x0O1wiOlwi4qeAXCIsXCImb21hY3I7XCI6XCLFjVwiLFwiJm9tZWdhO1wiOlwiz4lcIixcIiZvbWljcm9uO1wiOlwizr9cIixcIiZvbWlkO1wiOlwi4qa2XCIsXCImb21pbnVzO1wiOlwi4oqWXCIsXCImb29wZjtcIjpcIvCdlaBcIixcIiZvcGFyO1wiOlwi4qa3XCIsXCImb3BlcnA7XCI6XCLiprlcIixcIiZvcGx1cztcIjpcIuKKlVwiLFwiJm9yO1wiOlwi4oioXCIsXCImb3JhcnI7XCI6XCLihrtcIixcIiZvcmQ7XCI6XCLiqZ1cIixcIiZvcmRlcjtcIjpcIuKEtFwiLFwiJm9yZGVyb2Y7XCI6XCLihLRcIixcIiZvcmRmXCI6XCLCqlwiLFwiJm9yZGY7XCI6XCLCqlwiLFwiJm9yZG1cIjpcIsK6XCIsXCImb3JkbTtcIjpcIsK6XCIsXCImb3JpZ29mO1wiOlwi4oq2XCIsXCImb3JvcjtcIjpcIuKpllwiLFwiJm9yc2xvcGU7XCI6XCLiqZdcIixcIiZvcnY7XCI6XCLiqZtcIixcIiZvc2NyO1wiOlwi4oS0XCIsXCImb3NsYXNoXCI6XCLDuFwiLFwiJm9zbGFzaDtcIjpcIsO4XCIsXCImb3NvbDtcIjpcIuKKmFwiLFwiJm90aWxkZVwiOlwiw7VcIixcIiZvdGlsZGU7XCI6XCLDtVwiLFwiJm90aW1lcztcIjpcIuKKl1wiLFwiJm90aW1lc2FzO1wiOlwi4qi2XCIsXCImb3VtbFwiOlwiw7ZcIixcIiZvdW1sO1wiOlwiw7ZcIixcIiZvdmJhcjtcIjpcIuKMvVwiLFwiJnBhcjtcIjpcIuKIpVwiLFwiJnBhcmFcIjpcIsK2XCIsXCImcGFyYTtcIjpcIsK2XCIsXCImcGFyYWxsZWw7XCI6XCLiiKVcIixcIiZwYXJzaW07XCI6XCLiq7NcIixcIiZwYXJzbDtcIjpcIuKrvVwiLFwiJnBhcnQ7XCI6XCLiiIJcIixcIiZwY3k7XCI6XCLQv1wiLFwiJnBlcmNudDtcIjpcIiVcIixcIiZwZXJpb2Q7XCI6XCIuXCIsXCImcGVybWlsO1wiOlwi4oCwXCIsXCImcGVycDtcIjpcIuKKpVwiLFwiJnBlcnRlbms7XCI6XCLigLFcIixcIiZwZnI7XCI6XCLwnZStXCIsXCImcGhpO1wiOlwiz4ZcIixcIiZwaGl2O1wiOlwiz5VcIixcIiZwaG1tYXQ7XCI6XCLihLNcIixcIiZwaG9uZTtcIjpcIuKYjlwiLFwiJnBpO1wiOlwiz4BcIixcIiZwaXRjaGZvcms7XCI6XCLii5RcIixcIiZwaXY7XCI6XCLPllwiLFwiJnBsYW5jaztcIjpcIuKEj1wiLFwiJnBsYW5ja2g7XCI6XCLihI5cIixcIiZwbGFua3Y7XCI6XCLihI9cIixcIiZwbHVzO1wiOlwiK1wiLFwiJnBsdXNhY2lyO1wiOlwi4qijXCIsXCImcGx1c2I7XCI6XCLiip5cIixcIiZwbHVzY2lyO1wiOlwi4qiiXCIsXCImcGx1c2RvO1wiOlwi4oiUXCIsXCImcGx1c2R1O1wiOlwi4qilXCIsXCImcGx1c2U7XCI6XCLiqbJcIixcIiZwbHVzbW5cIjpcIsKxXCIsXCImcGx1c21uO1wiOlwiwrFcIixcIiZwbHVzc2ltO1wiOlwi4qimXCIsXCImcGx1c3R3bztcIjpcIuKop1wiLFwiJnBtO1wiOlwiwrFcIixcIiZwb2ludGludDtcIjpcIuKolVwiLFwiJnBvcGY7XCI6XCLwnZWhXCIsXCImcG91bmRcIjpcIsKjXCIsXCImcG91bmQ7XCI6XCLCo1wiLFwiJnByO1wiOlwi4om6XCIsXCImcHJFO1wiOlwi4qqzXCIsXCImcHJhcDtcIjpcIuKqt1wiLFwiJnByY3VlO1wiOlwi4om8XCIsXCImcHJlO1wiOlwi4qqvXCIsXCImcHJlYztcIjpcIuKJulwiLFwiJnByZWNhcHByb3g7XCI6XCLiqrdcIixcIiZwcmVjY3VybHllcTtcIjpcIuKJvFwiLFwiJnByZWNlcTtcIjpcIuKqr1wiLFwiJnByZWNuYXBwcm94O1wiOlwi4qq5XCIsXCImcHJlY25lcXE7XCI6XCLiqrVcIixcIiZwcmVjbnNpbTtcIjpcIuKLqFwiLFwiJnByZWNzaW07XCI6XCLiib5cIixcIiZwcmltZTtcIjpcIuKAslwiLFwiJnByaW1lcztcIjpcIuKEmVwiLFwiJnBybkU7XCI6XCLiqrVcIixcIiZwcm5hcDtcIjpcIuKquVwiLFwiJnBybnNpbTtcIjpcIuKLqFwiLFwiJnByb2Q7XCI6XCLiiI9cIixcIiZwcm9mYWxhcjtcIjpcIuKMrlwiLFwiJnByb2ZsaW5lO1wiOlwi4oySXCIsXCImcHJvZnN1cmY7XCI6XCLijJNcIixcIiZwcm9wO1wiOlwi4oidXCIsXCImcHJvcHRvO1wiOlwi4oidXCIsXCImcHJzaW07XCI6XCLiib5cIixcIiZwcnVyZWw7XCI6XCLiirBcIixcIiZwc2NyO1wiOlwi8J2ThVwiLFwiJnBzaTtcIjpcIs+IXCIsXCImcHVuY3NwO1wiOlwi4oCIXCIsXCImcWZyO1wiOlwi8J2UrlwiLFwiJnFpbnQ7XCI6XCLiqIxcIixcIiZxb3BmO1wiOlwi8J2VolwiLFwiJnFwcmltZTtcIjpcIuKBl1wiLFwiJnFzY3I7XCI6XCLwnZOGXCIsXCImcXVhdGVybmlvbnM7XCI6XCLihI1cIixcIiZxdWF0aW50O1wiOlwi4qiWXCIsXCImcXVlc3Q7XCI6XCI/XCIsXCImcXVlc3RlcTtcIjpcIuKJn1wiLFwiJnF1b3RcIjonXCInLFwiJnF1b3Q7XCI6J1wiJyxcIiZyQWFycjtcIjpcIuKHm1wiLFwiJnJBcnI7XCI6XCLih5JcIixcIiZyQXRhaWw7XCI6XCLipJxcIixcIiZyQmFycjtcIjpcIuKkj1wiLFwiJnJIYXI7XCI6XCLipaRcIixcIiZyYWNlO1wiOlwi4oi9zLFcIixcIiZyYWN1dGU7XCI6XCLFlVwiLFwiJnJhZGljO1wiOlwi4oiaXCIsXCImcmFlbXB0eXY7XCI6XCLiprNcIixcIiZyYW5nO1wiOlwi4p+pXCIsXCImcmFuZ2Q7XCI6XCLippJcIixcIiZyYW5nZTtcIjpcIuKmpVwiLFwiJnJhbmdsZTtcIjpcIuKfqVwiLFwiJnJhcXVvXCI6XCLCu1wiLFwiJnJhcXVvO1wiOlwiwrtcIixcIiZyYXJyO1wiOlwi4oaSXCIsXCImcmFycmFwO1wiOlwi4qW1XCIsXCImcmFycmI7XCI6XCLih6VcIixcIiZyYXJyYmZzO1wiOlwi4qSgXCIsXCImcmFycmM7XCI6XCLipLNcIixcIiZyYXJyZnM7XCI6XCLipJ5cIixcIiZyYXJyaGs7XCI6XCLihqpcIixcIiZyYXJybHA7XCI6XCLihqxcIixcIiZyYXJycGw7XCI6XCLipYVcIixcIiZyYXJyc2ltO1wiOlwi4qW0XCIsXCImcmFycnRsO1wiOlwi4oajXCIsXCImcmFycnc7XCI6XCLihp1cIixcIiZyYXRhaWw7XCI6XCLipJpcIixcIiZyYXRpbztcIjpcIuKItlwiLFwiJnJhdGlvbmFscztcIjpcIuKEmlwiLFwiJnJiYXJyO1wiOlwi4qSNXCIsXCImcmJicms7XCI6XCLinbNcIixcIiZyYnJhY2U7XCI6XCJ9XCIsXCImcmJyYWNrO1wiOlwiXVwiLFwiJnJicmtlO1wiOlwi4qaMXCIsXCImcmJya3NsZDtcIjpcIuKmjlwiLFwiJnJicmtzbHU7XCI6XCLippBcIixcIiZyY2Fyb247XCI6XCLFmVwiLFwiJnJjZWRpbDtcIjpcIsWXXCIsXCImcmNlaWw7XCI6XCLijIlcIixcIiZyY3ViO1wiOlwifVwiLFwiJnJjeTtcIjpcItGAXCIsXCImcmRjYTtcIjpcIuKkt1wiLFwiJnJkbGRoYXI7XCI6XCLipalcIixcIiZyZHF1bztcIjpcIuKAnVwiLFwiJnJkcXVvcjtcIjpcIuKAnVwiLFwiJnJkc2g7XCI6XCLihrNcIixcIiZyZWFsO1wiOlwi4oScXCIsXCImcmVhbGluZTtcIjpcIuKEm1wiLFwiJnJlYWxwYXJ0O1wiOlwi4oScXCIsXCImcmVhbHM7XCI6XCLihJ1cIixcIiZyZWN0O1wiOlwi4patXCIsXCImcmVnXCI6XCLCrlwiLFwiJnJlZztcIjpcIsKuXCIsXCImcmZpc2h0O1wiOlwi4qW9XCIsXCImcmZsb29yO1wiOlwi4oyLXCIsXCImcmZyO1wiOlwi8J2Ur1wiLFwiJnJoYXJkO1wiOlwi4oeBXCIsXCImcmhhcnU7XCI6XCLih4BcIixcIiZyaGFydWw7XCI6XCLipaxcIixcIiZyaG87XCI6XCLPgVwiLFwiJnJob3Y7XCI6XCLPsVwiLFwiJnJpZ2h0YXJyb3c7XCI6XCLihpJcIixcIiZyaWdodGFycm93dGFpbDtcIjpcIuKGo1wiLFwiJnJpZ2h0aGFycG9vbmRvd247XCI6XCLih4FcIixcIiZyaWdodGhhcnBvb251cDtcIjpcIuKHgFwiLFwiJnJpZ2h0bGVmdGFycm93cztcIjpcIuKHhFwiLFwiJnJpZ2h0bGVmdGhhcnBvb25zO1wiOlwi4oeMXCIsXCImcmlnaHRyaWdodGFycm93cztcIjpcIuKHiVwiLFwiJnJpZ2h0c3F1aWdhcnJvdztcIjpcIuKGnVwiLFwiJnJpZ2h0dGhyZWV0aW1lcztcIjpcIuKLjFwiLFwiJnJpbmc7XCI6XCLLmlwiLFwiJnJpc2luZ2RvdHNlcTtcIjpcIuKJk1wiLFwiJnJsYXJyO1wiOlwi4oeEXCIsXCImcmxoYXI7XCI6XCLih4xcIixcIiZybG07XCI6XCLigI9cIixcIiZybW91c3Q7XCI6XCLijrFcIixcIiZybW91c3RhY2hlO1wiOlwi4o6xXCIsXCImcm5taWQ7XCI6XCLiq65cIixcIiZyb2FuZztcIjpcIuKfrVwiLFwiJnJvYXJyO1wiOlwi4oe+XCIsXCImcm9icms7XCI6XCLin6dcIixcIiZyb3BhcjtcIjpcIuKmhlwiLFwiJnJvcGY7XCI6XCLwnZWjXCIsXCImcm9wbHVzO1wiOlwi4qiuXCIsXCImcm90aW1lcztcIjpcIuKotVwiLFwiJnJwYXI7XCI6XCIpXCIsXCImcnBhcmd0O1wiOlwi4qaUXCIsXCImcnBwb2xpbnQ7XCI6XCLiqJJcIixcIiZycmFycjtcIjpcIuKHiVwiLFwiJnJzYXF1bztcIjpcIuKAulwiLFwiJnJzY3I7XCI6XCLwnZOHXCIsXCImcnNoO1wiOlwi4oaxXCIsXCImcnNxYjtcIjpcIl1cIixcIiZyc3F1bztcIjpcIuKAmVwiLFwiJnJzcXVvcjtcIjpcIuKAmVwiLFwiJnJ0aHJlZTtcIjpcIuKLjFwiLFwiJnJ0aW1lcztcIjpcIuKLilwiLFwiJnJ0cmk7XCI6XCLilrlcIixcIiZydHJpZTtcIjpcIuKKtVwiLFwiJnJ0cmlmO1wiOlwi4pa4XCIsXCImcnRyaWx0cmk7XCI6XCLip45cIixcIiZydWx1aGFyO1wiOlwi4qWoXCIsXCImcng7XCI6XCLihJ5cIixcIiZzYWN1dGU7XCI6XCLFm1wiLFwiJnNicXVvO1wiOlwi4oCaXCIsXCImc2M7XCI6XCLiibtcIixcIiZzY0U7XCI6XCLiqrRcIixcIiZzY2FwO1wiOlwi4qq4XCIsXCImc2Nhcm9uO1wiOlwixaFcIixcIiZzY2N1ZTtcIjpcIuKJvVwiLFwiJnNjZTtcIjpcIuKqsFwiLFwiJnNjZWRpbDtcIjpcIsWfXCIsXCImc2NpcmM7XCI6XCLFnVwiLFwiJnNjbkU7XCI6XCLiqrZcIixcIiZzY25hcDtcIjpcIuKqulwiLFwiJnNjbnNpbTtcIjpcIuKLqVwiLFwiJnNjcG9saW50O1wiOlwi4qiTXCIsXCImc2NzaW07XCI6XCLiib9cIixcIiZzY3k7XCI6XCLRgVwiLFwiJnNkb3Q7XCI6XCLii4VcIixcIiZzZG90YjtcIjpcIuKKoVwiLFwiJnNkb3RlO1wiOlwi4qmmXCIsXCImc2VBcnI7XCI6XCLih5hcIixcIiZzZWFyaGs7XCI6XCLipKVcIixcIiZzZWFycjtcIjpcIuKGmFwiLFwiJnNlYXJyb3c7XCI6XCLihphcIixcIiZzZWN0XCI6XCLCp1wiLFwiJnNlY3Q7XCI6XCLCp1wiLFwiJnNlbWk7XCI6XCI7XCIsXCImc2Vzd2FyO1wiOlwi4qSpXCIsXCImc2V0bWludXM7XCI6XCLiiJZcIixcIiZzZXRtbjtcIjpcIuKIllwiLFwiJnNleHQ7XCI6XCLinLZcIixcIiZzZnI7XCI6XCLwnZSwXCIsXCImc2Zyb3duO1wiOlwi4oyiXCIsXCImc2hhcnA7XCI6XCLima9cIixcIiZzaGNoY3k7XCI6XCLRiVwiLFwiJnNoY3k7XCI6XCLRiFwiLFwiJnNob3J0bWlkO1wiOlwi4oijXCIsXCImc2hvcnRwYXJhbGxlbDtcIjpcIuKIpVwiLFwiJnNoeVwiOlwiwq1cIixcIiZzaHk7XCI6XCLCrVwiLFwiJnNpZ21hO1wiOlwiz4NcIixcIiZzaWdtYWY7XCI6XCLPglwiLFwiJnNpZ21hdjtcIjpcIs+CXCIsXCImc2ltO1wiOlwi4oi8XCIsXCImc2ltZG90O1wiOlwi4qmqXCIsXCImc2ltZTtcIjpcIuKJg1wiLFwiJnNpbWVxO1wiOlwi4omDXCIsXCImc2ltZztcIjpcIuKqnlwiLFwiJnNpbWdFO1wiOlwi4qqgXCIsXCImc2ltbDtcIjpcIuKqnVwiLFwiJnNpbWxFO1wiOlwi4qqfXCIsXCImc2ltbmU7XCI6XCLiiYZcIixcIiZzaW1wbHVzO1wiOlwi4qikXCIsXCImc2ltcmFycjtcIjpcIuKlslwiLFwiJnNsYXJyO1wiOlwi4oaQXCIsXCImc21hbGxzZXRtaW51cztcIjpcIuKIllwiLFwiJnNtYXNocDtcIjpcIuKos1wiLFwiJnNtZXBhcnNsO1wiOlwi4qekXCIsXCImc21pZDtcIjpcIuKIo1wiLFwiJnNtaWxlO1wiOlwi4oyjXCIsXCImc210O1wiOlwi4qqqXCIsXCImc210ZTtcIjpcIuKqrFwiLFwiJnNtdGVzO1wiOlwi4qqs77iAXCIsXCImc29mdGN5O1wiOlwi0YxcIixcIiZzb2w7XCI6XCIvXCIsXCImc29sYjtcIjpcIuKnhFwiLFwiJnNvbGJhcjtcIjpcIuKMv1wiLFwiJnNvcGY7XCI6XCLwnZWkXCIsXCImc3BhZGVzO1wiOlwi4pmgXCIsXCImc3BhZGVzdWl0O1wiOlwi4pmgXCIsXCImc3BhcjtcIjpcIuKIpVwiLFwiJnNxY2FwO1wiOlwi4oqTXCIsXCImc3FjYXBzO1wiOlwi4oqT77iAXCIsXCImc3FjdXA7XCI6XCLiipRcIixcIiZzcWN1cHM7XCI6XCLiipTvuIBcIixcIiZzcXN1YjtcIjpcIuKKj1wiLFwiJnNxc3ViZTtcIjpcIuKKkVwiLFwiJnNxc3Vic2V0O1wiOlwi4oqPXCIsXCImc3FzdWJzZXRlcTtcIjpcIuKKkVwiLFwiJnNxc3VwO1wiOlwi4oqQXCIsXCImc3FzdXBlO1wiOlwi4oqSXCIsXCImc3FzdXBzZXQ7XCI6XCLiipBcIixcIiZzcXN1cHNldGVxO1wiOlwi4oqSXCIsXCImc3F1O1wiOlwi4pahXCIsXCImc3F1YXJlO1wiOlwi4pahXCIsXCImc3F1YXJmO1wiOlwi4paqXCIsXCImc3F1ZjtcIjpcIuKWqlwiLFwiJnNyYXJyO1wiOlwi4oaSXCIsXCImc3NjcjtcIjpcIvCdk4hcIixcIiZzc2V0bW47XCI6XCLiiJZcIixcIiZzc21pbGU7XCI6XCLijKNcIixcIiZzc3RhcmY7XCI6XCLii4ZcIixcIiZzdGFyO1wiOlwi4piGXCIsXCImc3RhcmY7XCI6XCLimIVcIixcIiZzdHJhaWdodGVwc2lsb247XCI6XCLPtVwiLFwiJnN0cmFpZ2h0cGhpO1wiOlwiz5VcIixcIiZzdHJucztcIjpcIsKvXCIsXCImc3ViO1wiOlwi4oqCXCIsXCImc3ViRTtcIjpcIuKrhVwiLFwiJnN1YmRvdDtcIjpcIuKqvVwiLFwiJnN1YmU7XCI6XCLiioZcIixcIiZzdWJlZG90O1wiOlwi4quDXCIsXCImc3VibXVsdDtcIjpcIuKrgVwiLFwiJnN1Ym5FO1wiOlwi4quLXCIsXCImc3VibmU7XCI6XCLiiopcIixcIiZzdWJwbHVzO1wiOlwi4qq/XCIsXCImc3VicmFycjtcIjpcIuKluVwiLFwiJnN1YnNldDtcIjpcIuKKglwiLFwiJnN1YnNldGVxO1wiOlwi4oqGXCIsXCImc3Vic2V0ZXFxO1wiOlwi4quFXCIsXCImc3Vic2V0bmVxO1wiOlwi4oqKXCIsXCImc3Vic2V0bmVxcTtcIjpcIuKri1wiLFwiJnN1YnNpbTtcIjpcIuKrh1wiLFwiJnN1YnN1YjtcIjpcIuKrlVwiLFwiJnN1YnN1cDtcIjpcIuKrk1wiLFwiJnN1Y2M7XCI6XCLiibtcIixcIiZzdWNjYXBwcm94O1wiOlwi4qq4XCIsXCImc3VjY2N1cmx5ZXE7XCI6XCLiib1cIixcIiZzdWNjZXE7XCI6XCLiqrBcIixcIiZzdWNjbmFwcHJveDtcIjpcIuKqulwiLFwiJnN1Y2NuZXFxO1wiOlwi4qq2XCIsXCImc3VjY25zaW07XCI6XCLii6lcIixcIiZzdWNjc2ltO1wiOlwi4om/XCIsXCImc3VtO1wiOlwi4oiRXCIsXCImc3VuZztcIjpcIuKZqlwiLFwiJnN1cDFcIjpcIsK5XCIsXCImc3VwMTtcIjpcIsK5XCIsXCImc3VwMlwiOlwiwrJcIixcIiZzdXAyO1wiOlwiwrJcIixcIiZzdXAzXCI6XCLCs1wiLFwiJnN1cDM7XCI6XCLCs1wiLFwiJnN1cDtcIjpcIuKKg1wiLFwiJnN1cEU7XCI6XCLiq4ZcIixcIiZzdXBkb3Q7XCI6XCLiqr5cIixcIiZzdXBkc3ViO1wiOlwi4quYXCIsXCImc3VwZTtcIjpcIuKKh1wiLFwiJnN1cGVkb3Q7XCI6XCLiq4RcIixcIiZzdXBoc29sO1wiOlwi4p+JXCIsXCImc3VwaHN1YjtcIjpcIuKrl1wiLFwiJnN1cGxhcnI7XCI6XCLipbtcIixcIiZzdXBtdWx0O1wiOlwi4quCXCIsXCImc3VwbkU7XCI6XCLiq4xcIixcIiZzdXBuZTtcIjpcIuKKi1wiLFwiJnN1cHBsdXM7XCI6XCLiq4BcIixcIiZzdXBzZXQ7XCI6XCLiioNcIixcIiZzdXBzZXRlcTtcIjpcIuKKh1wiLFwiJnN1cHNldGVxcTtcIjpcIuKrhlwiLFwiJnN1cHNldG5lcTtcIjpcIuKKi1wiLFwiJnN1cHNldG5lcXE7XCI6XCLiq4xcIixcIiZzdXBzaW07XCI6XCLiq4hcIixcIiZzdXBzdWI7XCI6XCLiq5RcIixcIiZzdXBzdXA7XCI6XCLiq5ZcIixcIiZzd0FycjtcIjpcIuKHmVwiLFwiJnN3YXJoaztcIjpcIuKkplwiLFwiJnN3YXJyO1wiOlwi4oaZXCIsXCImc3dhcnJvdztcIjpcIuKGmVwiLFwiJnN3bndhcjtcIjpcIuKkqlwiLFwiJnN6bGlnXCI6XCLDn1wiLFwiJnN6bGlnO1wiOlwiw59cIixcIiZ0YXJnZXQ7XCI6XCLijJZcIixcIiZ0YXU7XCI6XCLPhFwiLFwiJnRicms7XCI6XCLijrRcIixcIiZ0Y2Fyb247XCI6XCLFpVwiLFwiJnRjZWRpbDtcIjpcIsWjXCIsXCImdGN5O1wiOlwi0YJcIixcIiZ0ZG90O1wiOlwi4oObXCIsXCImdGVscmVjO1wiOlwi4oyVXCIsXCImdGZyO1wiOlwi8J2UsVwiLFwiJnRoZXJlNDtcIjpcIuKItFwiLFwiJnRoZXJlZm9yZTtcIjpcIuKItFwiLFwiJnRoZXRhO1wiOlwizrhcIixcIiZ0aGV0YXN5bTtcIjpcIs+RXCIsXCImdGhldGF2O1wiOlwiz5FcIixcIiZ0aGlja2FwcHJveDtcIjpcIuKJiFwiLFwiJnRoaWNrc2ltO1wiOlwi4oi8XCIsXCImdGhpbnNwO1wiOlwi4oCJXCIsXCImdGhrYXA7XCI6XCLiiYhcIixcIiZ0aGtzaW07XCI6XCLiiLxcIixcIiZ0aG9yblwiOlwiw75cIixcIiZ0aG9ybjtcIjpcIsO+XCIsXCImdGlsZGU7XCI6XCLLnFwiLFwiJnRpbWVzXCI6XCLDl1wiLFwiJnRpbWVzO1wiOlwiw5dcIixcIiZ0aW1lc2I7XCI6XCLiiqBcIixcIiZ0aW1lc2JhcjtcIjpcIuKosVwiLFwiJnRpbWVzZDtcIjpcIuKosFwiLFwiJnRpbnQ7XCI6XCLiiK1cIixcIiZ0b2VhO1wiOlwi4qSoXCIsXCImdG9wO1wiOlwi4oqkXCIsXCImdG9wYm90O1wiOlwi4oy2XCIsXCImdG9wY2lyO1wiOlwi4quxXCIsXCImdG9wZjtcIjpcIvCdlaVcIixcIiZ0b3Bmb3JrO1wiOlwi4quaXCIsXCImdG9zYTtcIjpcIuKkqVwiLFwiJnRwcmltZTtcIjpcIuKAtFwiLFwiJnRyYWRlO1wiOlwi4oSiXCIsXCImdHJpYW5nbGU7XCI6XCLilrVcIixcIiZ0cmlhbmdsZWRvd247XCI6XCLilr9cIixcIiZ0cmlhbmdsZWxlZnQ7XCI6XCLil4NcIixcIiZ0cmlhbmdsZWxlZnRlcTtcIjpcIuKKtFwiLFwiJnRyaWFuZ2xlcTtcIjpcIuKJnFwiLFwiJnRyaWFuZ2xlcmlnaHQ7XCI6XCLilrlcIixcIiZ0cmlhbmdsZXJpZ2h0ZXE7XCI6XCLiirVcIixcIiZ0cmlkb3Q7XCI6XCLil6xcIixcIiZ0cmllO1wiOlwi4omcXCIsXCImdHJpbWludXM7XCI6XCLiqLpcIixcIiZ0cmlwbHVzO1wiOlwi4qi5XCIsXCImdHJpc2I7XCI6XCLip41cIixcIiZ0cml0aW1lO1wiOlwi4qi7XCIsXCImdHJwZXppdW07XCI6XCLij6JcIixcIiZ0c2NyO1wiOlwi8J2TiVwiLFwiJnRzY3k7XCI6XCLRhlwiLFwiJnRzaGN5O1wiOlwi0ZtcIixcIiZ0c3Ryb2s7XCI6XCLFp1wiLFwiJnR3aXh0O1wiOlwi4omsXCIsXCImdHdvaGVhZGxlZnRhcnJvdztcIjpcIuKGnlwiLFwiJnR3b2hlYWRyaWdodGFycm93O1wiOlwi4oagXCIsXCImdUFycjtcIjpcIuKHkVwiLFwiJnVIYXI7XCI6XCLipaNcIixcIiZ1YWN1dGVcIjpcIsO6XCIsXCImdWFjdXRlO1wiOlwiw7pcIixcIiZ1YXJyO1wiOlwi4oaRXCIsXCImdWJyY3k7XCI6XCLRnlwiLFwiJnVicmV2ZTtcIjpcIsWtXCIsXCImdWNpcmNcIjpcIsO7XCIsXCImdWNpcmM7XCI6XCLDu1wiLFwiJnVjeTtcIjpcItGDXCIsXCImdWRhcnI7XCI6XCLih4VcIixcIiZ1ZGJsYWM7XCI6XCLFsVwiLFwiJnVkaGFyO1wiOlwi4qWuXCIsXCImdWZpc2h0O1wiOlwi4qW+XCIsXCImdWZyO1wiOlwi8J2UslwiLFwiJnVncmF2ZVwiOlwiw7lcIixcIiZ1Z3JhdmU7XCI6XCLDuVwiLFwiJnVoYXJsO1wiOlwi4oa/XCIsXCImdWhhcnI7XCI6XCLihr5cIixcIiZ1aGJsaztcIjpcIuKWgFwiLFwiJnVsY29ybjtcIjpcIuKMnFwiLFwiJnVsY29ybmVyO1wiOlwi4oycXCIsXCImdWxjcm9wO1wiOlwi4oyPXCIsXCImdWx0cmk7XCI6XCLil7hcIixcIiZ1bWFjcjtcIjpcIsWrXCIsXCImdW1sXCI6XCLCqFwiLFwiJnVtbDtcIjpcIsKoXCIsXCImdW9nb247XCI6XCLFs1wiLFwiJnVvcGY7XCI6XCLwnZWmXCIsXCImdXBhcnJvdztcIjpcIuKGkVwiLFwiJnVwZG93bmFycm93O1wiOlwi4oaVXCIsXCImdXBoYXJwb29ubGVmdDtcIjpcIuKGv1wiLFwiJnVwaGFycG9vbnJpZ2h0O1wiOlwi4oa+XCIsXCImdXBsdXM7XCI6XCLiio5cIixcIiZ1cHNpO1wiOlwiz4VcIixcIiZ1cHNpaDtcIjpcIs+SXCIsXCImdXBzaWxvbjtcIjpcIs+FXCIsXCImdXB1cGFycm93cztcIjpcIuKHiFwiLFwiJnVyY29ybjtcIjpcIuKMnVwiLFwiJnVyY29ybmVyO1wiOlwi4oydXCIsXCImdXJjcm9wO1wiOlwi4oyOXCIsXCImdXJpbmc7XCI6XCLFr1wiLFwiJnVydHJpO1wiOlwi4pe5XCIsXCImdXNjcjtcIjpcIvCdk4pcIixcIiZ1dGRvdDtcIjpcIuKLsFwiLFwiJnV0aWxkZTtcIjpcIsWpXCIsXCImdXRyaTtcIjpcIuKWtVwiLFwiJnV0cmlmO1wiOlwi4pa0XCIsXCImdXVhcnI7XCI6XCLih4hcIixcIiZ1dW1sXCI6XCLDvFwiLFwiJnV1bWw7XCI6XCLDvFwiLFwiJnV3YW5nbGU7XCI6XCLipqdcIixcIiZ2QXJyO1wiOlwi4oeVXCIsXCImdkJhcjtcIjpcIuKrqFwiLFwiJnZCYXJ2O1wiOlwi4qupXCIsXCImdkRhc2g7XCI6XCLiiqhcIixcIiZ2YW5ncnQ7XCI6XCLippxcIixcIiZ2YXJlcHNpbG9uO1wiOlwiz7VcIixcIiZ2YXJrYXBwYTtcIjpcIs+wXCIsXCImdmFybm90aGluZztcIjpcIuKIhVwiLFwiJnZhcnBoaTtcIjpcIs+VXCIsXCImdmFycGk7XCI6XCLPllwiLFwiJnZhcnByb3B0bztcIjpcIuKInVwiLFwiJnZhcnI7XCI6XCLihpVcIixcIiZ2YXJyaG87XCI6XCLPsVwiLFwiJnZhcnNpZ21hO1wiOlwiz4JcIixcIiZ2YXJzdWJzZXRuZXE7XCI6XCLiiorvuIBcIixcIiZ2YXJzdWJzZXRuZXFxO1wiOlwi4quL77iAXCIsXCImdmFyc3Vwc2V0bmVxO1wiOlwi4oqL77iAXCIsXCImdmFyc3Vwc2V0bmVxcTtcIjpcIuKrjO+4gFwiLFwiJnZhcnRoZXRhO1wiOlwiz5FcIixcIiZ2YXJ0cmlhbmdsZWxlZnQ7XCI6XCLiirJcIixcIiZ2YXJ0cmlhbmdsZXJpZ2h0O1wiOlwi4oqzXCIsXCImdmN5O1wiOlwi0LJcIixcIiZ2ZGFzaDtcIjpcIuKKolwiLFwiJnZlZTtcIjpcIuKIqFwiLFwiJnZlZWJhcjtcIjpcIuKKu1wiLFwiJnZlZWVxO1wiOlwi4omaXCIsXCImdmVsbGlwO1wiOlwi4ouuXCIsXCImdmVyYmFyO1wiOlwifFwiLFwiJnZlcnQ7XCI6XCJ8XCIsXCImdmZyO1wiOlwi8J2Us1wiLFwiJnZsdHJpO1wiOlwi4oqyXCIsXCImdm5zdWI7XCI6XCLiioLig5JcIixcIiZ2bnN1cDtcIjpcIuKKg+KDklwiLFwiJnZvcGY7XCI6XCLwnZWnXCIsXCImdnByb3A7XCI6XCLiiJ1cIixcIiZ2cnRyaTtcIjpcIuKKs1wiLFwiJnZzY3I7XCI6XCLwnZOLXCIsXCImdnN1Ym5FO1wiOlwi4quL77iAXCIsXCImdnN1Ym5lO1wiOlwi4oqK77iAXCIsXCImdnN1cG5FO1wiOlwi4quM77iAXCIsXCImdnN1cG5lO1wiOlwi4oqL77iAXCIsXCImdnppZ3phZztcIjpcIuKmmlwiLFwiJndjaXJjO1wiOlwixbVcIixcIiZ3ZWRiYXI7XCI6XCLiqZ9cIixcIiZ3ZWRnZTtcIjpcIuKIp1wiLFwiJndlZGdlcTtcIjpcIuKJmVwiLFwiJndlaWVycDtcIjpcIuKEmFwiLFwiJndmcjtcIjpcIvCdlLRcIixcIiZ3b3BmO1wiOlwi8J2VqFwiLFwiJndwO1wiOlwi4oSYXCIsXCImd3I7XCI6XCLiiYBcIixcIiZ3cmVhdGg7XCI6XCLiiYBcIixcIiZ3c2NyO1wiOlwi8J2TjFwiLFwiJnhjYXA7XCI6XCLii4JcIixcIiZ4Y2lyYztcIjpcIuKXr1wiLFwiJnhjdXA7XCI6XCLii4NcIixcIiZ4ZHRyaTtcIjpcIuKWvVwiLFwiJnhmcjtcIjpcIvCdlLVcIixcIiZ4aEFycjtcIjpcIuKfulwiLFwiJnhoYXJyO1wiOlwi4p+3XCIsXCImeGk7XCI6XCLOvlwiLFwiJnhsQXJyO1wiOlwi4p+4XCIsXCImeGxhcnI7XCI6XCLin7VcIixcIiZ4bWFwO1wiOlwi4p+8XCIsXCImeG5pcztcIjpcIuKLu1wiLFwiJnhvZG90O1wiOlwi4qiAXCIsXCImeG9wZjtcIjpcIvCdlalcIixcIiZ4b3BsdXM7XCI6XCLiqIFcIixcIiZ4b3RpbWU7XCI6XCLiqIJcIixcIiZ4ckFycjtcIjpcIuKfuVwiLFwiJnhyYXJyO1wiOlwi4p+2XCIsXCImeHNjcjtcIjpcIvCdk41cIixcIiZ4c3FjdXA7XCI6XCLiqIZcIixcIiZ4dXBsdXM7XCI6XCLiqIRcIixcIiZ4dXRyaTtcIjpcIuKWs1wiLFwiJnh2ZWU7XCI6XCLii4FcIixcIiZ4d2VkZ2U7XCI6XCLii4BcIixcIiZ5YWN1dGVcIjpcIsO9XCIsXCImeWFjdXRlO1wiOlwiw71cIixcIiZ5YWN5O1wiOlwi0Y9cIixcIiZ5Y2lyYztcIjpcIsW3XCIsXCImeWN5O1wiOlwi0YtcIixcIiZ5ZW5cIjpcIsKlXCIsXCImeWVuO1wiOlwiwqVcIixcIiZ5ZnI7XCI6XCLwnZS2XCIsXCImeWljeTtcIjpcItGXXCIsXCImeW9wZjtcIjpcIvCdlapcIixcIiZ5c2NyO1wiOlwi8J2TjlwiLFwiJnl1Y3k7XCI6XCLRjlwiLFwiJnl1bWxcIjpcIsO/XCIsXCImeXVtbDtcIjpcIsO/XCIsXCImemFjdXRlO1wiOlwixbpcIixcIiZ6Y2Fyb247XCI6XCLFvlwiLFwiJnpjeTtcIjpcItC3XCIsXCImemRvdDtcIjpcIsW8XCIsXCImemVldHJmO1wiOlwi4oSoXCIsXCImemV0YTtcIjpcIs62XCIsXCImemZyO1wiOlwi8J2Ut1wiLFwiJnpoY3k7XCI6XCLQtlwiLFwiJnppZ3JhcnI7XCI6XCLih51cIixcIiZ6b3BmO1wiOlwi8J2Vq1wiLFwiJnpzY3I7XCI6XCLwnZOPXCIsXCImendqO1wiOlwi4oCNXCIsXCImenduajtcIjpcIuKAjFwifSxjaGFyYWN0ZXJzOntcIsOGXCI6XCImQUVsaWc7XCIsXCImXCI6XCImYW1wO1wiLFwiw4FcIjpcIiZBYWN1dGU7XCIsXCLEglwiOlwiJkFicmV2ZTtcIixcIsOCXCI6XCImQWNpcmM7XCIsXCLQkFwiOlwiJkFjeTtcIixcIvCdlIRcIjpcIiZBZnI7XCIsXCLDgFwiOlwiJkFncmF2ZTtcIixcIs6RXCI6XCImQWxwaGE7XCIsXCLEgFwiOlwiJkFtYWNyO1wiLFwi4qmTXCI6XCImQW5kO1wiLFwixIRcIjpcIiZBb2dvbjtcIixcIvCdlLhcIjpcIiZBb3BmO1wiLFwi4oGhXCI6XCImYWY7XCIsXCLDhVwiOlwiJmFuZ3N0O1wiLFwi8J2SnFwiOlwiJkFzY3I7XCIsXCLiiZRcIjpcIiZjb2xvbmVxO1wiLFwiw4NcIjpcIiZBdGlsZGU7XCIsXCLDhFwiOlwiJkF1bWw7XCIsXCLiiJZcIjpcIiZzc2V0bW47XCIsXCLiq6dcIjpcIiZCYXJ2O1wiLFwi4oyGXCI6XCImZG91YmxlYmFyd2VkZ2U7XCIsXCLQkVwiOlwiJkJjeTtcIixcIuKItVwiOlwiJmJlY2F1c2U7XCIsXCLihKxcIjpcIiZiZXJub3U7XCIsXCLOklwiOlwiJkJldGE7XCIsXCLwnZSFXCI6XCImQmZyO1wiLFwi8J2UuVwiOlwiJkJvcGY7XCIsXCLLmFwiOlwiJmJyZXZlO1wiLFwi4omOXCI6XCImYnVtcDtcIixcItCnXCI6XCImQ0hjeTtcIixcIsKpXCI6XCImY29weTtcIixcIsSGXCI6XCImQ2FjdXRlO1wiLFwi4ouSXCI6XCImQ2FwO1wiLFwi4oWFXCI6XCImREQ7XCIsXCLihK1cIjpcIiZDZnI7XCIsXCLEjFwiOlwiJkNjYXJvbjtcIixcIsOHXCI6XCImQ2NlZGlsO1wiLFwixIhcIjpcIiZDY2lyYztcIixcIuKIsFwiOlwiJkNjb25pbnQ7XCIsXCLEilwiOlwiJkNkb3Q7XCIsXCLCuFwiOlwiJmNlZGlsO1wiLFwiwrdcIjpcIiZtaWRkb3Q7XCIsXCLOp1wiOlwiJkNoaTtcIixcIuKKmVwiOlwiJm9kb3Q7XCIsXCLiipZcIjpcIiZvbWludXM7XCIsXCLiipVcIjpcIiZvcGx1cztcIixcIuKKl1wiOlwiJm90aW1lcztcIixcIuKIslwiOlwiJmN3Y29uaW50O1wiLFwi4oCdXCI6XCImcmRxdW9yO1wiLFwi4oCZXCI6XCImcnNxdW9yO1wiLFwi4oi3XCI6XCImUHJvcG9ydGlvbjtcIixcIuKptFwiOlwiJkNvbG9uZTtcIixcIuKJoVwiOlwiJmVxdWl2O1wiLFwi4oivXCI6XCImRG91YmxlQ29udG91ckludGVncmFsO1wiLFwi4oiuXCI6XCImb2ludDtcIixcIuKEglwiOlwiJmNvbXBsZXhlcztcIixcIuKIkFwiOlwiJmNvcHJvZDtcIixcIuKIs1wiOlwiJmF3Y29uaW50O1wiLFwi4qivXCI6XCImQ3Jvc3M7XCIsXCLwnZKeXCI6XCImQ3NjcjtcIixcIuKLk1wiOlwiJkN1cDtcIixcIuKJjVwiOlwiJmFzeW1wZXE7XCIsXCLipJFcIjpcIiZERG90cmFoZDtcIixcItCCXCI6XCImREpjeTtcIixcItCFXCI6XCImRFNjeTtcIixcItCPXCI6XCImRFpjeTtcIixcIuKAoVwiOlwiJmRkYWdnZXI7XCIsXCLihqFcIjpcIiZEYXJyO1wiLFwi4qukXCI6XCImRG91YmxlTGVmdFRlZTtcIixcIsSOXCI6XCImRGNhcm9uO1wiLFwi0JRcIjpcIiZEY3k7XCIsXCLiiIdcIjpcIiZuYWJsYTtcIixcIs6UXCI6XCImRGVsdGE7XCIsXCLwnZSHXCI6XCImRGZyO1wiLFwiwrRcIjpcIiZhY3V0ZTtcIixcIsuZXCI6XCImZG90O1wiLFwiy51cIjpcIiZkYmxhYztcIixcImBcIjpcIiZncmF2ZTtcIixcIsucXCI6XCImdGlsZGU7XCIsXCLii4RcIjpcIiZkaWFtb25kO1wiLFwi4oWGXCI6XCImZGQ7XCIsXCLwnZS7XCI6XCImRG9wZjtcIixcIsKoXCI6XCImdW1sO1wiLFwi4oOcXCI6XCImRG90RG90O1wiLFwi4omQXCI6XCImZXNkb3Q7XCIsXCLih5NcIjpcIiZkQXJyO1wiLFwi4oeQXCI6XCImbEFycjtcIixcIuKHlFwiOlwiJmlmZjtcIixcIuKfuFwiOlwiJnhsQXJyO1wiLFwi4p+6XCI6XCImeGhBcnI7XCIsXCLin7lcIjpcIiZ4ckFycjtcIixcIuKHklwiOlwiJnJBcnI7XCIsXCLiiqhcIjpcIiZ2RGFzaDtcIixcIuKHkVwiOlwiJnVBcnI7XCIsXCLih5VcIjpcIiZ2QXJyO1wiLFwi4oilXCI6XCImc3BhcjtcIixcIuKGk1wiOlwiJmRvd25hcnJvdztcIixcIuKkk1wiOlwiJkRvd25BcnJvd0JhcjtcIixcIuKHtVwiOlwiJmR1YXJyO1wiLFwizJFcIjpcIiZEb3duQnJldmU7XCIsXCLipZBcIjpcIiZEb3duTGVmdFJpZ2h0VmVjdG9yO1wiLFwi4qWeXCI6XCImRG93bkxlZnRUZWVWZWN0b3I7XCIsXCLihr1cIjpcIiZsaGFyZDtcIixcIuKlllwiOlwiJkRvd25MZWZ0VmVjdG9yQmFyO1wiLFwi4qWfXCI6XCImRG93blJpZ2h0VGVlVmVjdG9yO1wiLFwi4oeBXCI6XCImcmlnaHRoYXJwb29uZG93bjtcIixcIuKll1wiOlwiJkRvd25SaWdodFZlY3RvckJhcjtcIixcIuKKpFwiOlwiJnRvcDtcIixcIuKGp1wiOlwiJm1hcHN0b2Rvd247XCIsXCLwnZKfXCI6XCImRHNjcjtcIixcIsSQXCI6XCImRHN0cm9rO1wiLFwixYpcIjpcIiZFTkc7XCIsXCLDkFwiOlwiJkVUSDtcIixcIsOJXCI6XCImRWFjdXRlO1wiLFwixJpcIjpcIiZFY2Fyb247XCIsXCLDilwiOlwiJkVjaXJjO1wiLFwi0K1cIjpcIiZFY3k7XCIsXCLEllwiOlwiJkVkb3Q7XCIsXCLwnZSIXCI6XCImRWZyO1wiLFwiw4hcIjpcIiZFZ3JhdmU7XCIsXCLiiIhcIjpcIiZpc2ludjtcIixcIsSSXCI6XCImRW1hY3I7XCIsXCLil7tcIjpcIiZFbXB0eVNtYWxsU3F1YXJlO1wiLFwi4parXCI6XCImRW1wdHlWZXJ5U21hbGxTcXVhcmU7XCIsXCLEmFwiOlwiJkVvZ29uO1wiLFwi8J2UvFwiOlwiJkVvcGY7XCIsXCLOlVwiOlwiJkVwc2lsb247XCIsXCLiqbVcIjpcIiZFcXVhbDtcIixcIuKJglwiOlwiJmVzaW07XCIsXCLih4xcIjpcIiZybGhhcjtcIixcIuKEsFwiOlwiJmV4cGVjdGF0aW9uO1wiLFwi4qmzXCI6XCImRXNpbTtcIixcIs6XXCI6XCImRXRhO1wiLFwiw4tcIjpcIiZFdW1sO1wiLFwi4oiDXCI6XCImZXhpc3Q7XCIsXCLihYdcIjpcIiZleHBvbmVudGlhbGU7XCIsXCLQpFwiOlwiJkZjeTtcIixcIvCdlIlcIjpcIiZGZnI7XCIsXCLil7xcIjpcIiZGaWxsZWRTbWFsbFNxdWFyZTtcIixcIuKWqlwiOlwiJnNxdWY7XCIsXCLwnZS9XCI6XCImRm9wZjtcIixcIuKIgFwiOlwiJmZvcmFsbDtcIixcIuKEsVwiOlwiJkZzY3I7XCIsXCLQg1wiOlwiJkdKY3k7XCIsXCI+XCI6XCImZ3Q7XCIsXCLOk1wiOlwiJkdhbW1hO1wiLFwiz5xcIjpcIiZHYW1tYWQ7XCIsXCLEnlwiOlwiJkdicmV2ZTtcIixcIsSiXCI6XCImR2NlZGlsO1wiLFwixJxcIjpcIiZHY2lyYztcIixcItCTXCI6XCImR2N5O1wiLFwixKBcIjpcIiZHZG90O1wiLFwi8J2UilwiOlwiJkdmcjtcIixcIuKLmVwiOlwiJmdnZztcIixcIvCdlL5cIjpcIiZHb3BmO1wiLFwi4omlXCI6XCImZ2VxO1wiLFwi4oubXCI6XCImZ3RyZXFsZXNzO1wiLFwi4omnXCI6XCImZ2VxcTtcIixcIuKqolwiOlwiJkdyZWF0ZXJHcmVhdGVyO1wiLFwi4om3XCI6XCImZ3RybGVzcztcIixcIuKpvlwiOlwiJmdlcztcIixcIuKJs1wiOlwiJmd0cnNpbTtcIixcIvCdkqJcIjpcIiZHc2NyO1wiLFwi4omrXCI6XCImZ2c7XCIsXCLQqlwiOlwiJkhBUkRjeTtcIixcIsuHXCI6XCImY2Fyb247XCIsXCJeXCI6XCImSGF0O1wiLFwixKRcIjpcIiZIY2lyYztcIixcIuKEjFwiOlwiJlBvaW5jYXJlcGxhbmU7XCIsXCLihItcIjpcIiZoYW1pbHQ7XCIsXCLihI1cIjpcIiZxdWF0ZXJuaW9ucztcIixcIuKUgFwiOlwiJmJveGg7XCIsXCLEplwiOlwiJkhzdHJvaztcIixcIuKJj1wiOlwiJmJ1bXBlcTtcIixcItCVXCI6XCImSUVjeTtcIixcIsSyXCI6XCImSUpsaWc7XCIsXCLQgVwiOlwiJklPY3k7XCIsXCLDjVwiOlwiJklhY3V0ZTtcIixcIsOOXCI6XCImSWNpcmM7XCIsXCLQmFwiOlwiJkljeTtcIixcIsSwXCI6XCImSWRvdDtcIixcIuKEkVwiOlwiJmltYWdwYXJ0O1wiLFwiw4xcIjpcIiZJZ3JhdmU7XCIsXCLEqlwiOlwiJkltYWNyO1wiLFwi4oWIXCI6XCImaWk7XCIsXCLiiKxcIjpcIiZJbnQ7XCIsXCLiiKtcIjpcIiZpbnQ7XCIsXCLii4JcIjpcIiZ4Y2FwO1wiLFwi4oGjXCI6XCImaWM7XCIsXCLigaJcIjpcIiZpdDtcIixcIsSuXCI6XCImSW9nb247XCIsXCLwnZWAXCI6XCImSW9wZjtcIixcIs6ZXCI6XCImSW90YTtcIixcIuKEkFwiOlwiJmltYWdsaW5lO1wiLFwixKhcIjpcIiZJdGlsZGU7XCIsXCLQhlwiOlwiJkl1a2N5O1wiLFwiw49cIjpcIiZJdW1sO1wiLFwixLRcIjpcIiZKY2lyYztcIixcItCZXCI6XCImSmN5O1wiLFwi8J2UjVwiOlwiJkpmcjtcIixcIvCdlYFcIjpcIiZKb3BmO1wiLFwi8J2SpVwiOlwiJkpzY3I7XCIsXCLQiFwiOlwiJkpzZXJjeTtcIixcItCEXCI6XCImSnVrY3k7XCIsXCLQpVwiOlwiJktIY3k7XCIsXCLQjFwiOlwiJktKY3k7XCIsXCLOmlwiOlwiJkthcHBhO1wiLFwixLZcIjpcIiZLY2VkaWw7XCIsXCLQmlwiOlwiJktjeTtcIixcIvCdlI5cIjpcIiZLZnI7XCIsXCLwnZWCXCI6XCImS29wZjtcIixcIvCdkqZcIjpcIiZLc2NyO1wiLFwi0IlcIjpcIiZMSmN5O1wiLFwiPFwiOlwiJmx0O1wiLFwixLlcIjpcIiZMYWN1dGU7XCIsXCLOm1wiOlwiJkxhbWJkYTtcIixcIuKfqlwiOlwiJkxhbmc7XCIsXCLihJJcIjpcIiZsYWdyYW47XCIsXCLihp5cIjpcIiZ0d29oZWFkbGVmdGFycm93O1wiLFwixL1cIjpcIiZMY2Fyb247XCIsXCLEu1wiOlwiJkxjZWRpbDtcIixcItCbXCI6XCImTGN5O1wiLFwi4p+oXCI6XCImbGFuZ2xlO1wiLFwi4oaQXCI6XCImc2xhcnI7XCIsXCLih6RcIjpcIiZsYXJyYjtcIixcIuKHhlwiOlwiJmxyYXJyO1wiLFwi4oyIXCI6XCImbGNlaWw7XCIsXCLin6ZcIjpcIiZsb2JyaztcIixcIuKloVwiOlwiJkxlZnREb3duVGVlVmVjdG9yO1wiLFwi4oeDXCI6XCImZG93bmhhcnBvb25sZWZ0O1wiLFwi4qWZXCI6XCImTGVmdERvd25WZWN0b3JCYXI7XCIsXCLijIpcIjpcIiZsZmxvb3I7XCIsXCLihpRcIjpcIiZsZWZ0cmlnaHRhcnJvdztcIixcIuKljlwiOlwiJkxlZnRSaWdodFZlY3RvcjtcIixcIuKKo1wiOlwiJmRhc2h2O1wiLFwi4oakXCI6XCImbWFwc3RvbGVmdDtcIixcIuKlmlwiOlwiJkxlZnRUZWVWZWN0b3I7XCIsXCLiirJcIjpcIiZ2bHRyaTtcIixcIuKnj1wiOlwiJkxlZnRUcmlhbmdsZUJhcjtcIixcIuKKtFwiOlwiJnRyaWFuZ2xlbGVmdGVxO1wiLFwi4qWRXCI6XCImTGVmdFVwRG93blZlY3RvcjtcIixcIuKloFwiOlwiJkxlZnRVcFRlZVZlY3RvcjtcIixcIuKGv1wiOlwiJnVwaGFycG9vbmxlZnQ7XCIsXCLipZhcIjpcIiZMZWZ0VXBWZWN0b3JCYXI7XCIsXCLihrxcIjpcIiZsaGFydTtcIixcIuKlklwiOlwiJkxlZnRWZWN0b3JCYXI7XCIsXCLii5pcIjpcIiZsZXNzZXFndHI7XCIsXCLiiaZcIjpcIiZsZXFxO1wiLFwi4om2XCI6XCImbGc7XCIsXCLiqqFcIjpcIiZMZXNzTGVzcztcIixcIuKpvVwiOlwiJmxlcztcIixcIuKJslwiOlwiJmxzaW07XCIsXCLwnZSPXCI6XCImTGZyO1wiLFwi4ouYXCI6XCImTGw7XCIsXCLih5pcIjpcIiZsQWFycjtcIixcIsS/XCI6XCImTG1pZG90O1wiLFwi4p+1XCI6XCImeGxhcnI7XCIsXCLin7dcIjpcIiZ4aGFycjtcIixcIuKftlwiOlwiJnhyYXJyO1wiLFwi8J2Vg1wiOlwiJkxvcGY7XCIsXCLihplcIjpcIiZzd2Fycm93O1wiLFwi4oaYXCI6XCImc2VhcnJvdztcIixcIuKGsFwiOlwiJmxzaDtcIixcIsWBXCI6XCImTHN0cm9rO1wiLFwi4omqXCI6XCImbGw7XCIsXCLipIVcIjpcIiZNYXA7XCIsXCLQnFwiOlwiJk1jeTtcIixcIuKBn1wiOlwiJk1lZGl1bVNwYWNlO1wiLFwi4oSzXCI6XCImcGhtbWF0O1wiLFwi8J2UkFwiOlwiJk1mcjtcIixcIuKIk1wiOlwiJm1wO1wiLFwi8J2VhFwiOlwiJk1vcGY7XCIsXCLOnFwiOlwiJk11O1wiLFwi0IpcIjpcIiZOSmN5O1wiLFwixYNcIjpcIiZOYWN1dGU7XCIsXCLFh1wiOlwiJk5jYXJvbjtcIixcIsWFXCI6XCImTmNlZGlsO1wiLFwi0J1cIjpcIiZOY3k7XCIsXCLigItcIjpcIiZaZXJvV2lkdGhTcGFjZTtcIixcIlxcblwiOlwiJk5ld0xpbmU7XCIsXCLwnZSRXCI6XCImTmZyO1wiLFwi4oGgXCI6XCImTm9CcmVhaztcIixcIsKgXCI6XCImbmJzcDtcIixcIuKElVwiOlwiJm5hdHVyYWxzO1wiLFwi4qusXCI6XCImTm90O1wiLFwi4omiXCI6XCImbmVxdWl2O1wiLFwi4omtXCI6XCImTm90Q3VwQ2FwO1wiLFwi4oimXCI6XCImbnNwYXI7XCIsXCLiiIlcIjpcIiZub3RpbnZhO1wiLFwi4omgXCI6XCImbmU7XCIsXCLiiYLMuFwiOlwiJm5lc2ltO1wiLFwi4oiEXCI6XCImbmV4aXN0cztcIixcIuKJr1wiOlwiJm5ndHI7XCIsXCLiibFcIjpcIiZuZ2VxO1wiLFwi4omnzLhcIjpcIiZuZ2VxcTtcIixcIuKJq8y4XCI6XCImbkd0djtcIixcIuKJuVwiOlwiJm50Z2w7XCIsXCLiqb7MuFwiOlwiJm5nZXM7XCIsXCLiibVcIjpcIiZuZ3NpbTtcIixcIuKJjsy4XCI6XCImbmJ1bXA7XCIsXCLiiY/MuFwiOlwiJm5idW1wZTtcIixcIuKLqlwiOlwiJm50cmlhbmdsZWxlZnQ7XCIsXCLip4/MuFwiOlwiJk5vdExlZnRUcmlhbmdsZUJhcjtcIixcIuKLrFwiOlwiJm50cmlhbmdsZWxlZnRlcTtcIixcIuKJrlwiOlwiJm5sdDtcIixcIuKJsFwiOlwiJm5sZXE7XCIsXCLiibhcIjpcIiZudGxnO1wiLFwi4omqzLhcIjpcIiZuTHR2O1wiLFwi4qm9zLhcIjpcIiZubGVzO1wiLFwi4om0XCI6XCImbmxzaW07XCIsXCLiqqLMuFwiOlwiJk5vdE5lc3RlZEdyZWF0ZXJHcmVhdGVyO1wiLFwi4qqhzLhcIjpcIiZOb3ROZXN0ZWRMZXNzTGVzcztcIixcIuKKgFwiOlwiJm5wcmVjO1wiLFwi4qqvzLhcIjpcIiZucHJlY2VxO1wiLFwi4ougXCI6XCImbnByY3VlO1wiLFwi4oiMXCI6XCImbm90bml2YTtcIixcIuKLq1wiOlwiJm50cmlhbmdsZXJpZ2h0O1wiLFwi4qeQzLhcIjpcIiZOb3RSaWdodFRyaWFuZ2xlQmFyO1wiLFwi4outXCI6XCImbnRyaWFuZ2xlcmlnaHRlcTtcIixcIuKKj8y4XCI6XCImTm90U3F1YXJlU3Vic2V0O1wiLFwi4ouiXCI6XCImbnNxc3ViZTtcIixcIuKKkMy4XCI6XCImTm90U3F1YXJlU3VwZXJzZXQ7XCIsXCLii6NcIjpcIiZuc3FzdXBlO1wiLFwi4oqC4oOSXCI6XCImdm5zdWI7XCIsXCLiiohcIjpcIiZuc3Vic2V0ZXE7XCIsXCLiioFcIjpcIiZuc3VjYztcIixcIuKqsMy4XCI6XCImbnN1Y2NlcTtcIixcIuKLoVwiOlwiJm5zY2N1ZTtcIixcIuKJv8y4XCI6XCImTm90U3VjY2VlZHNUaWxkZTtcIixcIuKKg+KDklwiOlwiJnZuc3VwO1wiLFwi4oqJXCI6XCImbnN1cHNldGVxO1wiLFwi4omBXCI6XCImbnNpbTtcIixcIuKJhFwiOlwiJm5zaW1lcTtcIixcIuKJh1wiOlwiJm5jb25nO1wiLFwi4omJXCI6XCImbmFwcHJveDtcIixcIuKIpFwiOlwiJm5zbWlkO1wiLFwi8J2SqVwiOlwiJk5zY3I7XCIsXCLDkVwiOlwiJk50aWxkZTtcIixcIs6dXCI6XCImTnU7XCIsXCLFklwiOlwiJk9FbGlnO1wiLFwiw5NcIjpcIiZPYWN1dGU7XCIsXCLDlFwiOlwiJk9jaXJjO1wiLFwi0J5cIjpcIiZPY3k7XCIsXCLFkFwiOlwiJk9kYmxhYztcIixcIvCdlJJcIjpcIiZPZnI7XCIsXCLDklwiOlwiJk9ncmF2ZTtcIixcIsWMXCI6XCImT21hY3I7XCIsXCLOqVwiOlwiJm9obTtcIixcIs6fXCI6XCImT21pY3JvbjtcIixcIvCdlYZcIjpcIiZPb3BmO1wiLFwi4oCcXCI6XCImbGRxdW87XCIsXCLigJhcIjpcIiZsc3F1bztcIixcIuKplFwiOlwiJk9yO1wiLFwi8J2SqlwiOlwiJk9zY3I7XCIsXCLDmFwiOlwiJk9zbGFzaDtcIixcIsOVXCI6XCImT3RpbGRlO1wiLFwi4qi3XCI6XCImT3RpbWVzO1wiLFwiw5ZcIjpcIiZPdW1sO1wiLFwi4oC+XCI6XCImb2xpbmU7XCIsXCLij55cIjpcIiZPdmVyQnJhY2U7XCIsXCLijrRcIjpcIiZ0YnJrO1wiLFwi4o+cXCI6XCImT3ZlclBhcmVudGhlc2lzO1wiLFwi4oiCXCI6XCImcGFydDtcIixcItCfXCI6XCImUGN5O1wiLFwi8J2Uk1wiOlwiJlBmcjtcIixcIs6mXCI6XCImUGhpO1wiLFwizqBcIjpcIiZQaTtcIixcIsKxXCI6XCImcG07XCIsXCLihJlcIjpcIiZwcmltZXM7XCIsXCLiqrtcIjpcIiZQcjtcIixcIuKJulwiOlwiJnByZWM7XCIsXCLiqq9cIjpcIiZwcmVjZXE7XCIsXCLiibxcIjpcIiZwcmVjY3VybHllcTtcIixcIuKJvlwiOlwiJnByc2ltO1wiLFwi4oCzXCI6XCImUHJpbWU7XCIsXCLiiI9cIjpcIiZwcm9kO1wiLFwi4oidXCI6XCImdnByb3A7XCIsXCLwnZKrXCI6XCImUHNjcjtcIixcIs6oXCI6XCImUHNpO1wiLCdcIic6XCImcXVvdDtcIixcIvCdlJRcIjpcIiZRZnI7XCIsXCLihJpcIjpcIiZyYXRpb25hbHM7XCIsXCLwnZKsXCI6XCImUXNjcjtcIixcIuKkkFwiOlwiJmRyYmthcm93O1wiLFwiwq5cIjpcIiZyZWc7XCIsXCLFlFwiOlwiJlJhY3V0ZTtcIixcIuKfq1wiOlwiJlJhbmc7XCIsXCLihqBcIjpcIiZ0d29oZWFkcmlnaHRhcnJvdztcIixcIuKkllwiOlwiJlJhcnJ0bDtcIixcIsWYXCI6XCImUmNhcm9uO1wiLFwixZZcIjpcIiZSY2VkaWw7XCIsXCLQoFwiOlwiJlJjeTtcIixcIuKEnFwiOlwiJnJlYWxwYXJ0O1wiLFwi4oiLXCI6XCImbml2O1wiLFwi4oeLXCI6XCImbHJoYXI7XCIsXCLipa9cIjpcIiZkdWhhcjtcIixcIs6hXCI6XCImUmhvO1wiLFwi4p+pXCI6XCImcmFuZ2xlO1wiLFwi4oaSXCI6XCImc3JhcnI7XCIsXCLih6VcIjpcIiZyYXJyYjtcIixcIuKHhFwiOlwiJnJsYXJyO1wiLFwi4oyJXCI6XCImcmNlaWw7XCIsXCLin6dcIjpcIiZyb2JyaztcIixcIuKlnVwiOlwiJlJpZ2h0RG93blRlZVZlY3RvcjtcIixcIuKHglwiOlwiJmRvd25oYXJwb29ucmlnaHQ7XCIsXCLipZVcIjpcIiZSaWdodERvd25WZWN0b3JCYXI7XCIsXCLijItcIjpcIiZyZmxvb3I7XCIsXCLiiqJcIjpcIiZ2ZGFzaDtcIixcIuKGplwiOlwiJm1hcHN0bztcIixcIuKlm1wiOlwiJlJpZ2h0VGVlVmVjdG9yO1wiLFwi4oqzXCI6XCImdnJ0cmk7XCIsXCLip5BcIjpcIiZSaWdodFRyaWFuZ2xlQmFyO1wiLFwi4oq1XCI6XCImdHJpYW5nbGVyaWdodGVxO1wiLFwi4qWPXCI6XCImUmlnaHRVcERvd25WZWN0b3I7XCIsXCLipZxcIjpcIiZSaWdodFVwVGVlVmVjdG9yO1wiLFwi4oa+XCI6XCImdXBoYXJwb29ucmlnaHQ7XCIsXCLipZRcIjpcIiZSaWdodFVwVmVjdG9yQmFyO1wiLFwi4oeAXCI6XCImcmlnaHRoYXJwb29udXA7XCIsXCLipZNcIjpcIiZSaWdodFZlY3RvckJhcjtcIixcIuKEnVwiOlwiJnJlYWxzO1wiLFwi4qWwXCI6XCImUm91bmRJbXBsaWVzO1wiLFwi4oebXCI6XCImckFhcnI7XCIsXCLihJtcIjpcIiZyZWFsaW5lO1wiLFwi4oaxXCI6XCImcnNoO1wiLFwi4qe0XCI6XCImUnVsZURlbGF5ZWQ7XCIsXCLQqVwiOlwiJlNIQ0hjeTtcIixcItCoXCI6XCImU0hjeTtcIixcItCsXCI6XCImU09GVGN5O1wiLFwixZpcIjpcIiZTYWN1dGU7XCIsXCLiqrxcIjpcIiZTYztcIixcIsWgXCI6XCImU2Nhcm9uO1wiLFwixZ5cIjpcIiZTY2VkaWw7XCIsXCLFnFwiOlwiJlNjaXJjO1wiLFwi0KFcIjpcIiZTY3k7XCIsXCLwnZSWXCI6XCImU2ZyO1wiLFwi4oaRXCI6XCImdXBhcnJvdztcIixcIs6jXCI6XCImU2lnbWE7XCIsXCLiiJhcIjpcIiZjb21wZm47XCIsXCLwnZWKXCI6XCImU29wZjtcIixcIuKImlwiOlwiJnJhZGljO1wiLFwi4pahXCI6XCImc3F1YXJlO1wiLFwi4oqTXCI6XCImc3FjYXA7XCIsXCLiio9cIjpcIiZzcXN1YnNldDtcIixcIuKKkVwiOlwiJnNxc3Vic2V0ZXE7XCIsXCLiipBcIjpcIiZzcXN1cHNldDtcIixcIuKKklwiOlwiJnNxc3Vwc2V0ZXE7XCIsXCLiipRcIjpcIiZzcWN1cDtcIixcIvCdkq5cIjpcIiZTc2NyO1wiLFwi4ouGXCI6XCImc3N0YXJmO1wiLFwi4ouQXCI6XCImU3Vic2V0O1wiLFwi4oqGXCI6XCImc3Vic2V0ZXE7XCIsXCLiibtcIjpcIiZzdWNjO1wiLFwi4qqwXCI6XCImc3VjY2VxO1wiLFwi4om9XCI6XCImc3VjY2N1cmx5ZXE7XCIsXCLiib9cIjpcIiZzdWNjc2ltO1wiLFwi4oiRXCI6XCImc3VtO1wiLFwi4ouRXCI6XCImU3Vwc2V0O1wiLFwi4oqDXCI6XCImc3Vwc2V0O1wiLFwi4oqHXCI6XCImc3Vwc2V0ZXE7XCIsXCLDnlwiOlwiJlRIT1JOO1wiLFwi4oSiXCI6XCImdHJhZGU7XCIsXCLQi1wiOlwiJlRTSGN5O1wiLFwi0KZcIjpcIiZUU2N5O1wiLFwiXFx0XCI6XCImVGFiO1wiLFwizqRcIjpcIiZUYXU7XCIsXCLFpFwiOlwiJlRjYXJvbjtcIixcIsWiXCI6XCImVGNlZGlsO1wiLFwi0KJcIjpcIiZUY3k7XCIsXCLwnZSXXCI6XCImVGZyO1wiLFwi4oi0XCI6XCImdGhlcmVmb3JlO1wiLFwizphcIjpcIiZUaGV0YTtcIixcIuKBn+KAilwiOlwiJlRoaWNrU3BhY2U7XCIsXCLigIlcIjpcIiZ0aGluc3A7XCIsXCLiiLxcIjpcIiZ0aGtzaW07XCIsXCLiiYNcIjpcIiZzaW1lcTtcIixcIuKJhVwiOlwiJmNvbmc7XCIsXCLiiYhcIjpcIiZ0aGthcDtcIixcIvCdlYtcIjpcIiZUb3BmO1wiLFwi4oObXCI6XCImdGRvdDtcIixcIvCdkq9cIjpcIiZUc2NyO1wiLFwixaZcIjpcIiZUc3Ryb2s7XCIsXCLDmlwiOlwiJlVhY3V0ZTtcIixcIuKGn1wiOlwiJlVhcnI7XCIsXCLipYlcIjpcIiZVYXJyb2NpcjtcIixcItCOXCI6XCImVWJyY3k7XCIsXCLFrFwiOlwiJlVicmV2ZTtcIixcIsObXCI6XCImVWNpcmM7XCIsXCLQo1wiOlwiJlVjeTtcIixcIsWwXCI6XCImVWRibGFjO1wiLFwi8J2UmFwiOlwiJlVmcjtcIixcIsOZXCI6XCImVWdyYXZlO1wiLFwixapcIjpcIiZVbWFjcjtcIixfOlwiJmxvd2JhcjtcIixcIuKPn1wiOlwiJlVuZGVyQnJhY2U7XCIsXCLijrVcIjpcIiZiYnJrO1wiLFwi4o+dXCI6XCImVW5kZXJQYXJlbnRoZXNpcztcIixcIuKLg1wiOlwiJnhjdXA7XCIsXCLiio5cIjpcIiZ1cGx1cztcIixcIsWyXCI6XCImVW9nb247XCIsXCLwnZWMXCI6XCImVW9wZjtcIixcIuKkklwiOlwiJlVwQXJyb3dCYXI7XCIsXCLih4VcIjpcIiZ1ZGFycjtcIixcIuKGlVwiOlwiJnZhcnI7XCIsXCLipa5cIjpcIiZ1ZGhhcjtcIixcIuKKpVwiOlwiJnBlcnA7XCIsXCLihqVcIjpcIiZtYXBzdG91cDtcIixcIuKGllwiOlwiJm53YXJyb3c7XCIsXCLihpdcIjpcIiZuZWFycm93O1wiLFwiz5JcIjpcIiZ1cHNpaDtcIixcIs6lXCI6XCImVXBzaWxvbjtcIixcIsWuXCI6XCImVXJpbmc7XCIsXCLwnZKwXCI6XCImVXNjcjtcIixcIsWoXCI6XCImVXRpbGRlO1wiLFwiw5xcIjpcIiZVdW1sO1wiLFwi4oqrXCI6XCImVkRhc2g7XCIsXCLiq6tcIjpcIiZWYmFyO1wiLFwi0JJcIjpcIiZWY3k7XCIsXCLiiqlcIjpcIiZWZGFzaDtcIixcIuKrplwiOlwiJlZkYXNobDtcIixcIuKLgVwiOlwiJnh2ZWU7XCIsXCLigJZcIjpcIiZWZXJ0O1wiLFwi4oijXCI6XCImc21pZDtcIixcInxcIjpcIiZ2ZXJ0O1wiLFwi4p2YXCI6XCImVmVydGljYWxTZXBhcmF0b3I7XCIsXCLiiYBcIjpcIiZ3cmVhdGg7XCIsXCLigIpcIjpcIiZoYWlyc3A7XCIsXCLwnZSZXCI6XCImVmZyO1wiLFwi8J2VjVwiOlwiJlZvcGY7XCIsXCLwnZKxXCI6XCImVnNjcjtcIixcIuKKqlwiOlwiJlZ2ZGFzaDtcIixcIsW0XCI6XCImV2NpcmM7XCIsXCLii4BcIjpcIiZ4d2VkZ2U7XCIsXCLwnZSaXCI6XCImV2ZyO1wiLFwi8J2VjlwiOlwiJldvcGY7XCIsXCLwnZKyXCI6XCImV3NjcjtcIixcIvCdlJtcIjpcIiZYZnI7XCIsXCLOnlwiOlwiJlhpO1wiLFwi8J2Vj1wiOlwiJlhvcGY7XCIsXCLwnZKzXCI6XCImWHNjcjtcIixcItCvXCI6XCImWUFjeTtcIixcItCHXCI6XCImWUljeTtcIixcItCuXCI6XCImWVVjeTtcIixcIsOdXCI6XCImWWFjdXRlO1wiLFwixbZcIjpcIiZZY2lyYztcIixcItCrXCI6XCImWWN5O1wiLFwi8J2UnFwiOlwiJllmcjtcIixcIvCdlZBcIjpcIiZZb3BmO1wiLFwi8J2StFwiOlwiJllzY3I7XCIsXCLFuFwiOlwiJll1bWw7XCIsXCLQllwiOlwiJlpIY3k7XCIsXCLFuVwiOlwiJlphY3V0ZTtcIixcIsW9XCI6XCImWmNhcm9uO1wiLFwi0JdcIjpcIiZaY3k7XCIsXCLFu1wiOlwiJlpkb3Q7XCIsXCLOllwiOlwiJlpldGE7XCIsXCLihKhcIjpcIiZ6ZWV0cmY7XCIsXCLihKRcIjpcIiZpbnRlZ2VycztcIixcIvCdkrVcIjpcIiZac2NyO1wiLFwiw6FcIjpcIiZhYWN1dGU7XCIsXCLEg1wiOlwiJmFicmV2ZTtcIixcIuKIvlwiOlwiJm1zdHBvcztcIixcIuKIvsyzXCI6XCImYWNFO1wiLFwi4oi/XCI6XCImYWNkO1wiLFwiw6JcIjpcIiZhY2lyYztcIixcItCwXCI6XCImYWN5O1wiLFwiw6ZcIjpcIiZhZWxpZztcIixcIvCdlJ5cIjpcIiZhZnI7XCIsXCLDoFwiOlwiJmFncmF2ZTtcIixcIuKEtVwiOlwiJmFsZXBoO1wiLFwizrFcIjpcIiZhbHBoYTtcIixcIsSBXCI6XCImYW1hY3I7XCIsXCLiqL9cIjpcIiZhbWFsZztcIixcIuKIp1wiOlwiJndlZGdlO1wiLFwi4qmVXCI6XCImYW5kYW5kO1wiLFwi4qmcXCI6XCImYW5kZDtcIixcIuKpmFwiOlwiJmFuZHNsb3BlO1wiLFwi4qmaXCI6XCImYW5kdjtcIixcIuKIoFwiOlwiJmFuZ2xlO1wiLFwi4qakXCI6XCImYW5nZTtcIixcIuKIoVwiOlwiJm1lYXN1cmVkYW5nbGU7XCIsXCLipqhcIjpcIiZhbmdtc2RhYTtcIixcIuKmqVwiOlwiJmFuZ21zZGFiO1wiLFwi4qaqXCI6XCImYW5nbXNkYWM7XCIsXCLipqtcIjpcIiZhbmdtc2RhZDtcIixcIuKmrFwiOlwiJmFuZ21zZGFlO1wiLFwi4qatXCI6XCImYW5nbXNkYWY7XCIsXCLipq5cIjpcIiZhbmdtc2RhZztcIixcIuKmr1wiOlwiJmFuZ21zZGFoO1wiLFwi4oifXCI6XCImYW5ncnQ7XCIsXCLiir5cIjpcIiZhbmdydHZiO1wiLFwi4qadXCI6XCImYW5ncnR2YmQ7XCIsXCLiiKJcIjpcIiZhbmdzcGg7XCIsXCLijbxcIjpcIiZhbmd6YXJyO1wiLFwixIVcIjpcIiZhb2dvbjtcIixcIvCdlZJcIjpcIiZhb3BmO1wiLFwi4qmwXCI6XCImYXBFO1wiLFwi4qmvXCI6XCImYXBhY2lyO1wiLFwi4omKXCI6XCImYXBwcm94ZXE7XCIsXCLiiYtcIjpcIiZhcGlkO1wiLFwiJ1wiOlwiJmFwb3M7XCIsXCLDpVwiOlwiJmFyaW5nO1wiLFwi8J2StlwiOlwiJmFzY3I7XCIsXCIqXCI6XCImbWlkYXN0O1wiLFwiw6NcIjpcIiZhdGlsZGU7XCIsXCLDpFwiOlwiJmF1bWw7XCIsXCLiqJFcIjpcIiZhd2ludDtcIixcIuKrrVwiOlwiJmJOb3Q7XCIsXCLiiYxcIjpcIiZiY29uZztcIixcIs+2XCI6XCImYmVwc2k7XCIsXCLigLVcIjpcIiZicHJpbWU7XCIsXCLiiL1cIjpcIiZic2ltO1wiLFwi4ouNXCI6XCImYnNpbWU7XCIsXCLiir1cIjpcIiZiYXJ2ZWU7XCIsXCLijIVcIjpcIiZiYXJ3ZWRnZTtcIixcIuKOtlwiOlwiJmJicmt0YnJrO1wiLFwi0LFcIjpcIiZiY3k7XCIsXCLigJ5cIjpcIiZsZHF1b3I7XCIsXCLiprBcIjpcIiZiZW1wdHl2O1wiLFwizrJcIjpcIiZiZXRhO1wiLFwi4oS2XCI6XCImYmV0aDtcIixcIuKJrFwiOlwiJnR3aXh0O1wiLFwi8J2Un1wiOlwiJmJmcjtcIixcIuKXr1wiOlwiJnhjaXJjO1wiLFwi4qiAXCI6XCImeG9kb3Q7XCIsXCLiqIFcIjpcIiZ4b3BsdXM7XCIsXCLiqIJcIjpcIiZ4b3RpbWU7XCIsXCLiqIZcIjpcIiZ4c3FjdXA7XCIsXCLimIVcIjpcIiZzdGFyZjtcIixcIuKWvVwiOlwiJnhkdHJpO1wiLFwi4pazXCI6XCImeHV0cmk7XCIsXCLiqIRcIjpcIiZ4dXBsdXM7XCIsXCLipI1cIjpcIiZyYmFycjtcIixcIuKnq1wiOlwiJmxvemY7XCIsXCLilrRcIjpcIiZ1dHJpZjtcIixcIuKWvlwiOlwiJmR0cmlmO1wiLFwi4peCXCI6XCImbHRyaWY7XCIsXCLilrhcIjpcIiZydHJpZjtcIixcIuKQo1wiOlwiJmJsYW5rO1wiLFwi4paSXCI6XCImYmxrMTI7XCIsXCLilpFcIjpcIiZibGsxNDtcIixcIuKWk1wiOlwiJmJsazM0O1wiLFwi4paIXCI6XCImYmxvY2s7XCIsXCI94oOlXCI6XCImYm5lO1wiLFwi4omh4oOlXCI6XCImYm5lcXVpdjtcIixcIuKMkFwiOlwiJmJub3Q7XCIsXCLwnZWTXCI6XCImYm9wZjtcIixcIuKLiFwiOlwiJmJvd3RpZTtcIixcIuKVl1wiOlwiJmJveERMO1wiLFwi4pWUXCI6XCImYm94RFI7XCIsXCLilZZcIjpcIiZib3hEbDtcIixcIuKVk1wiOlwiJmJveERyO1wiLFwi4pWQXCI6XCImYm94SDtcIixcIuKVplwiOlwiJmJveEhEO1wiLFwi4pWpXCI6XCImYm94SFU7XCIsXCLilaRcIjpcIiZib3hIZDtcIixcIuKVp1wiOlwiJmJveEh1O1wiLFwi4pWdXCI6XCImYm94VUw7XCIsXCLilZpcIjpcIiZib3hVUjtcIixcIuKVnFwiOlwiJmJveFVsO1wiLFwi4pWZXCI6XCImYm94VXI7XCIsXCLilZFcIjpcIiZib3hWO1wiLFwi4pWsXCI6XCImYm94Vkg7XCIsXCLilaNcIjpcIiZib3hWTDtcIixcIuKVoFwiOlwiJmJveFZSO1wiLFwi4pWrXCI6XCImYm94Vmg7XCIsXCLilaJcIjpcIiZib3hWbDtcIixcIuKVn1wiOlwiJmJveFZyO1wiLFwi4qeJXCI6XCImYm94Ym94O1wiLFwi4pWVXCI6XCImYm94ZEw7XCIsXCLilZJcIjpcIiZib3hkUjtcIixcIuKUkFwiOlwiJmJveGRsO1wiLFwi4pSMXCI6XCImYm94ZHI7XCIsXCLilaVcIjpcIiZib3hoRDtcIixcIuKVqFwiOlwiJmJveGhVO1wiLFwi4pSsXCI6XCImYm94aGQ7XCIsXCLilLRcIjpcIiZib3hodTtcIixcIuKKn1wiOlwiJm1pbnVzYjtcIixcIuKKnlwiOlwiJnBsdXNiO1wiLFwi4oqgXCI6XCImdGltZXNiO1wiLFwi4pWbXCI6XCImYm94dUw7XCIsXCLilZhcIjpcIiZib3h1UjtcIixcIuKUmFwiOlwiJmJveHVsO1wiLFwi4pSUXCI6XCImYm94dXI7XCIsXCLilIJcIjpcIiZib3h2O1wiLFwi4pWqXCI6XCImYm94dkg7XCIsXCLilaFcIjpcIiZib3h2TDtcIixcIuKVnlwiOlwiJmJveHZSO1wiLFwi4pS8XCI6XCImYm94dmg7XCIsXCLilKRcIjpcIiZib3h2bDtcIixcIuKUnFwiOlwiJmJveHZyO1wiLFwiwqZcIjpcIiZicnZiYXI7XCIsXCLwnZK3XCI6XCImYnNjcjtcIixcIuKBj1wiOlwiJmJzZW1pO1wiLFwiXFxcXFwiOlwiJmJzb2w7XCIsXCLip4VcIjpcIiZic29sYjtcIixcIuKfiFwiOlwiJmJzb2xoc3ViO1wiLFwi4oCiXCI6XCImYnVsbGV0O1wiLFwi4qquXCI6XCImYnVtcEU7XCIsXCLEh1wiOlwiJmNhY3V0ZTtcIixcIuKIqVwiOlwiJmNhcDtcIixcIuKphFwiOlwiJmNhcGFuZDtcIixcIuKpiVwiOlwiJmNhcGJyY3VwO1wiLFwi4qmLXCI6XCImY2FwY2FwO1wiLFwi4qmHXCI6XCImY2FwY3VwO1wiLFwi4qmAXCI6XCImY2FwZG90O1wiLFwi4oip77iAXCI6XCImY2FwcztcIixcIuKBgVwiOlwiJmNhcmV0O1wiLFwi4qmNXCI6XCImY2NhcHM7XCIsXCLEjVwiOlwiJmNjYXJvbjtcIixcIsOnXCI6XCImY2NlZGlsO1wiLFwixIlcIjpcIiZjY2lyYztcIixcIuKpjFwiOlwiJmNjdXBzO1wiLFwi4qmQXCI6XCImY2N1cHNzbTtcIixcIsSLXCI6XCImY2RvdDtcIixcIuKmslwiOlwiJmNlbXB0eXY7XCIsXCLColwiOlwiJmNlbnQ7XCIsXCLwnZSgXCI6XCImY2ZyO1wiLFwi0YdcIjpcIiZjaGN5O1wiLFwi4pyTXCI6XCImY2hlY2ttYXJrO1wiLFwiz4dcIjpcIiZjaGk7XCIsXCLil4tcIjpcIiZjaXI7XCIsXCLip4NcIjpcIiZjaXJFO1wiLFwiy4ZcIjpcIiZjaXJjO1wiLFwi4omXXCI6XCImY2lyZTtcIixcIuKGulwiOlwiJm9sYXJyO1wiLFwi4oa7XCI6XCImb3JhcnI7XCIsXCLik4hcIjpcIiZvUztcIixcIuKKm1wiOlwiJm9hc3Q7XCIsXCLiippcIjpcIiZvY2lyO1wiLFwi4oqdXCI6XCImb2Rhc2g7XCIsXCLiqJBcIjpcIiZjaXJmbmludDtcIixcIuKrr1wiOlwiJmNpcm1pZDtcIixcIuKnglwiOlwiJmNpcnNjaXI7XCIsXCLimaNcIjpcIiZjbHVic3VpdDtcIixcIjpcIjpcIiZjb2xvbjtcIixcIixcIjpcIiZjb21tYTtcIixcIkBcIjpcIiZjb21tYXQ7XCIsXCLiiIFcIjpcIiZjb21wbGVtZW50O1wiLFwi4qmtXCI6XCImY29uZ2RvdDtcIixcIvCdlZRcIjpcIiZjb3BmO1wiLFwi4oSXXCI6XCImY29weXNyO1wiLFwi4oa1XCI6XCImY3JhcnI7XCIsXCLinJdcIjpcIiZjcm9zcztcIixcIvCdkrhcIjpcIiZjc2NyO1wiLFwi4quPXCI6XCImY3N1YjtcIixcIuKrkVwiOlwiJmNzdWJlO1wiLFwi4quQXCI6XCImY3N1cDtcIixcIuKrklwiOlwiJmNzdXBlO1wiLFwi4ouvXCI6XCImY3Rkb3Q7XCIsXCLipLhcIjpcIiZjdWRhcnJsO1wiLFwi4qS1XCI6XCImY3VkYXJycjtcIixcIuKLnlwiOlwiJmN1cmx5ZXFwcmVjO1wiLFwi4oufXCI6XCImY3VybHllcXN1Y2M7XCIsXCLihrZcIjpcIiZjdXJ2ZWFycm93bGVmdDtcIixcIuKkvVwiOlwiJmN1bGFycnA7XCIsXCLiiKpcIjpcIiZjdXA7XCIsXCLiqYhcIjpcIiZjdXBicmNhcDtcIixcIuKphlwiOlwiJmN1cGNhcDtcIixcIuKpilwiOlwiJmN1cGN1cDtcIixcIuKKjVwiOlwiJmN1cGRvdDtcIixcIuKphVwiOlwiJmN1cG9yO1wiLFwi4oiq77iAXCI6XCImY3VwcztcIixcIuKGt1wiOlwiJmN1cnZlYXJyb3dyaWdodDtcIixcIuKkvFwiOlwiJmN1cmFycm07XCIsXCLii45cIjpcIiZjdXZlZTtcIixcIuKLj1wiOlwiJmN1d2VkO1wiLFwiwqRcIjpcIiZjdXJyZW47XCIsXCLiiLFcIjpcIiZjd2ludDtcIixcIuKMrVwiOlwiJmN5bGN0eTtcIixcIuKlpVwiOlwiJmRIYXI7XCIsXCLigKBcIjpcIiZkYWdnZXI7XCIsXCLihLhcIjpcIiZkYWxldGg7XCIsXCLigJBcIjpcIiZoeXBoZW47XCIsXCLipI9cIjpcIiZyQmFycjtcIixcIsSPXCI6XCImZGNhcm9uO1wiLFwi0LRcIjpcIiZkY3k7XCIsXCLih4pcIjpcIiZkb3duZG93bmFycm93cztcIixcIuKpt1wiOlwiJmVERG90O1wiLFwiwrBcIjpcIiZkZWc7XCIsXCLOtFwiOlwiJmRlbHRhO1wiLFwi4qaxXCI6XCImZGVtcHR5djtcIixcIuKlv1wiOlwiJmRmaXNodDtcIixcIvCdlKFcIjpcIiZkZnI7XCIsXCLimaZcIjpcIiZkaWFtcztcIixcIs+dXCI6XCImZ2FtbWFkO1wiLFwi4ouyXCI6XCImZGlzaW47XCIsXCLDt1wiOlwiJmRpdmlkZTtcIixcIuKLh1wiOlwiJmRpdm9ueDtcIixcItGSXCI6XCImZGpjeTtcIixcIuKMnlwiOlwiJmxsY29ybmVyO1wiLFwi4oyNXCI6XCImZGxjcm9wO1wiLCQ6XCImZG9sbGFyO1wiLFwi8J2VlVwiOlwiJmRvcGY7XCIsXCLiiZFcIjpcIiZlRG90O1wiLFwi4oi4XCI6XCImbWludXNkO1wiLFwi4oiUXCI6XCImcGx1c2RvO1wiLFwi4oqhXCI6XCImc2RvdGI7XCIsXCLijJ9cIjpcIiZscmNvcm5lcjtcIixcIuKMjFwiOlwiJmRyY3JvcDtcIixcIvCdkrlcIjpcIiZkc2NyO1wiLFwi0ZVcIjpcIiZkc2N5O1wiLFwi4qe2XCI6XCImZHNvbDtcIixcIsSRXCI6XCImZHN0cm9rO1wiLFwi4ouxXCI6XCImZHRkb3Q7XCIsXCLilr9cIjpcIiZ0cmlhbmdsZWRvd247XCIsXCLipqZcIjpcIiZkd2FuZ2xlO1wiLFwi0Z9cIjpcIiZkemN5O1wiLFwi4p+/XCI6XCImZHppZ3JhcnI7XCIsXCLDqVwiOlwiJmVhY3V0ZTtcIixcIuKprlwiOlwiJmVhc3RlcjtcIixcIsSbXCI6XCImZWNhcm9uO1wiLFwi4omWXCI6XCImZXFjaXJjO1wiLFwiw6pcIjpcIiZlY2lyYztcIixcIuKJlVwiOlwiJmVxY29sb247XCIsXCLRjVwiOlwiJmVjeTtcIixcIsSXXCI6XCImZWRvdDtcIixcIuKJklwiOlwiJmZhbGxpbmdkb3RzZXE7XCIsXCLwnZSiXCI6XCImZWZyO1wiLFwi4qqaXCI6XCImZWc7XCIsXCLDqFwiOlwiJmVncmF2ZTtcIixcIuKqllwiOlwiJmVxc2xhbnRndHI7XCIsXCLiqphcIjpcIiZlZ3Nkb3Q7XCIsXCLiqplcIjpcIiZlbDtcIixcIuKPp1wiOlwiJmVsaW50ZXJzO1wiLFwi4oSTXCI6XCImZWxsO1wiLFwi4qqVXCI6XCImZXFzbGFudGxlc3M7XCIsXCLiqpdcIjpcIiZlbHNkb3Q7XCIsXCLEk1wiOlwiJmVtYWNyO1wiLFwi4oiFXCI6XCImdmFybm90aGluZztcIixcIuKAhFwiOlwiJmVtc3AxMztcIixcIuKAhVwiOlwiJmVtc3AxNDtcIixcIuKAg1wiOlwiJmVtc3A7XCIsXCLFi1wiOlwiJmVuZztcIixcIuKAglwiOlwiJmVuc3A7XCIsXCLEmVwiOlwiJmVvZ29uO1wiLFwi8J2VllwiOlwiJmVvcGY7XCIsXCLii5VcIjpcIiZlcGFyO1wiLFwi4qejXCI6XCImZXBhcnNsO1wiLFwi4qmxXCI6XCImZXBsdXM7XCIsXCLOtVwiOlwiJmVwc2lsb247XCIsXCLPtVwiOlwiJnZhcmVwc2lsb247XCIsXCI9XCI6XCImZXF1YWxzO1wiLFwi4omfXCI6XCImcXVlc3RlcTtcIixcIuKpuFwiOlwiJmVxdWl2REQ7XCIsXCLip6VcIjpcIiZlcXZwYXJzbDtcIixcIuKJk1wiOlwiJnJpc2luZ2RvdHNlcTtcIixcIuKlsVwiOlwiJmVyYXJyO1wiLFwi4oSvXCI6XCImZXNjcjtcIixcIs63XCI6XCImZXRhO1wiLFwiw7BcIjpcIiZldGg7XCIsXCLDq1wiOlwiJmV1bWw7XCIsXCLigqxcIjpcIiZldXJvO1wiLFwiIVwiOlwiJmV4Y2w7XCIsXCLRhFwiOlwiJmZjeTtcIixcIuKZgFwiOlwiJmZlbWFsZTtcIixcIu+sg1wiOlwiJmZmaWxpZztcIixcIu+sgFwiOlwiJmZmbGlnO1wiLFwi76yEXCI6XCImZmZsbGlnO1wiLFwi8J2Uo1wiOlwiJmZmcjtcIixcIu+sgVwiOlwiJmZpbGlnO1wiLGZqOlwiJmZqbGlnO1wiLFwi4pmtXCI6XCImZmxhdDtcIixcIu+sglwiOlwiJmZsbGlnO1wiLFwi4paxXCI6XCImZmx0bnM7XCIsXCLGklwiOlwiJmZub2Y7XCIsXCLwnZWXXCI6XCImZm9wZjtcIixcIuKLlFwiOlwiJnBpdGNoZm9yaztcIixcIuKrmVwiOlwiJmZvcmt2O1wiLFwi4qiNXCI6XCImZnBhcnRpbnQ7XCIsXCLCvVwiOlwiJmhhbGY7XCIsXCLihZNcIjpcIiZmcmFjMTM7XCIsXCLCvFwiOlwiJmZyYWMxNDtcIixcIuKFlVwiOlwiJmZyYWMxNTtcIixcIuKFmVwiOlwiJmZyYWMxNjtcIixcIuKFm1wiOlwiJmZyYWMxODtcIixcIuKFlFwiOlwiJmZyYWMyMztcIixcIuKFllwiOlwiJmZyYWMyNTtcIixcIsK+XCI6XCImZnJhYzM0O1wiLFwi4oWXXCI6XCImZnJhYzM1O1wiLFwi4oWcXCI6XCImZnJhYzM4O1wiLFwi4oWYXCI6XCImZnJhYzQ1O1wiLFwi4oWaXCI6XCImZnJhYzU2O1wiLFwi4oWdXCI6XCImZnJhYzU4O1wiLFwi4oWeXCI6XCImZnJhYzc4O1wiLFwi4oGEXCI6XCImZnJhc2w7XCIsXCLijKJcIjpcIiZzZnJvd247XCIsXCLwnZK7XCI6XCImZnNjcjtcIixcIuKqjFwiOlwiJmd0cmVxcWxlc3M7XCIsXCLHtVwiOlwiJmdhY3V0ZTtcIixcIs6zXCI6XCImZ2FtbWE7XCIsXCLiqoZcIjpcIiZndHJhcHByb3g7XCIsXCLEn1wiOlwiJmdicmV2ZTtcIixcIsSdXCI6XCImZ2NpcmM7XCIsXCLQs1wiOlwiJmdjeTtcIixcIsShXCI6XCImZ2RvdDtcIixcIuKqqVwiOlwiJmdlc2NjO1wiLFwi4qqAXCI6XCImZ2VzZG90O1wiLFwi4qqCXCI6XCImZ2VzZG90bztcIixcIuKqhFwiOlwiJmdlc2RvdG9sO1wiLFwi4oub77iAXCI6XCImZ2VzbDtcIixcIuKqlFwiOlwiJmdlc2xlcztcIixcIvCdlKRcIjpcIiZnZnI7XCIsXCLihLdcIjpcIiZnaW1lbDtcIixcItGTXCI6XCImZ2pjeTtcIixcIuKqklwiOlwiJmdsRTtcIixcIuKqpVwiOlwiJmdsYTtcIixcIuKqpFwiOlwiJmdsajtcIixcIuKJqVwiOlwiJmduZXFxO1wiLFwi4qqKXCI6XCImZ25hcHByb3g7XCIsXCLiqohcIjpcIiZnbmVxO1wiLFwi4ounXCI6XCImZ25zaW07XCIsXCLwnZWYXCI6XCImZ29wZjtcIixcIuKEilwiOlwiJmdzY3I7XCIsXCLiqo5cIjpcIiZnc2ltZTtcIixcIuKqkFwiOlwiJmdzaW1sO1wiLFwi4qqnXCI6XCImZ3RjYztcIixcIuKpulwiOlwiJmd0Y2lyO1wiLFwi4ouXXCI6XCImZ3RyZG90O1wiLFwi4qaVXCI6XCImZ3RsUGFyO1wiLFwi4qm8XCI6XCImZ3RxdWVzdDtcIixcIuKluFwiOlwiJmd0cmFycjtcIixcIuKJqe+4gFwiOlwiJmd2bkU7XCIsXCLRilwiOlwiJmhhcmRjeTtcIixcIuKliFwiOlwiJmhhcnJjaXI7XCIsXCLihq1cIjpcIiZsZWZ0cmlnaHRzcXVpZ2Fycm93O1wiLFwi4oSPXCI6XCImcGxhbmt2O1wiLFwixKVcIjpcIiZoY2lyYztcIixcIuKZpVwiOlwiJmhlYXJ0c3VpdDtcIixcIuKAplwiOlwiJm1sZHI7XCIsXCLiirlcIjpcIiZoZXJjb247XCIsXCLwnZSlXCI6XCImaGZyO1wiLFwi4qSlXCI6XCImc2VhcmhrO1wiLFwi4qSmXCI6XCImc3dhcmhrO1wiLFwi4oe/XCI6XCImaG9hcnI7XCIsXCLiiLtcIjpcIiZob210aHQ7XCIsXCLihqlcIjpcIiZsYXJyaGs7XCIsXCLihqpcIjpcIiZyYXJyaGs7XCIsXCLwnZWZXCI6XCImaG9wZjtcIixcIuKAlVwiOlwiJmhvcmJhcjtcIixcIvCdkr1cIjpcIiZoc2NyO1wiLFwixKdcIjpcIiZoc3Ryb2s7XCIsXCLigYNcIjpcIiZoeWJ1bGw7XCIsXCLDrVwiOlwiJmlhY3V0ZTtcIixcIsOuXCI6XCImaWNpcmM7XCIsXCLQuFwiOlwiJmljeTtcIixcItC1XCI6XCImaWVjeTtcIixcIsKhXCI6XCImaWV4Y2w7XCIsXCLwnZSmXCI6XCImaWZyO1wiLFwiw6xcIjpcIiZpZ3JhdmU7XCIsXCLiqIxcIjpcIiZxaW50O1wiLFwi4oitXCI6XCImdGludDtcIixcIuKnnFwiOlwiJmlpbmZpbjtcIixcIuKEqVwiOlwiJmlpb3RhO1wiLFwixLNcIjpcIiZpamxpZztcIixcIsSrXCI6XCImaW1hY3I7XCIsXCLEsVwiOlwiJmlub2RvdDtcIixcIuKKt1wiOlwiJmltb2Y7XCIsXCLGtVwiOlwiJmltcGVkO1wiLFwi4oSFXCI6XCImaW5jYXJlO1wiLFwi4oieXCI6XCImaW5maW47XCIsXCLip51cIjpcIiZpbmZpbnRpZTtcIixcIuKKulwiOlwiJmludGVyY2FsO1wiLFwi4qiXXCI6XCImaW50bGFyaGs7XCIsXCLiqLxcIjpcIiZpcHJvZDtcIixcItGRXCI6XCImaW9jeTtcIixcIsSvXCI6XCImaW9nb247XCIsXCLwnZWaXCI6XCImaW9wZjtcIixcIs65XCI6XCImaW90YTtcIixcIsK/XCI6XCImaXF1ZXN0O1wiLFwi8J2SvlwiOlwiJmlzY3I7XCIsXCLii7lcIjpcIiZpc2luRTtcIixcIuKLtVwiOlwiJmlzaW5kb3Q7XCIsXCLii7RcIjpcIiZpc2lucztcIixcIuKLs1wiOlwiJmlzaW5zdjtcIixcIsSpXCI6XCImaXRpbGRlO1wiLFwi0ZZcIjpcIiZpdWtjeTtcIixcIsOvXCI6XCImaXVtbDtcIixcIsS1XCI6XCImamNpcmM7XCIsXCLQuVwiOlwiJmpjeTtcIixcIvCdlKdcIjpcIiZqZnI7XCIsXCLIt1wiOlwiJmptYXRoO1wiLFwi8J2Vm1wiOlwiJmpvcGY7XCIsXCLwnZK/XCI6XCImanNjcjtcIixcItGYXCI6XCImanNlcmN5O1wiLFwi0ZRcIjpcIiZqdWtjeTtcIixcIs66XCI6XCIma2FwcGE7XCIsXCLPsFwiOlwiJnZhcmthcHBhO1wiLFwixLdcIjpcIiZrY2VkaWw7XCIsXCLQulwiOlwiJmtjeTtcIixcIvCdlKhcIjpcIiZrZnI7XCIsXCLEuFwiOlwiJmtncmVlbjtcIixcItGFXCI6XCIma2hjeTtcIixcItGcXCI6XCIma2pjeTtcIixcIvCdlZxcIjpcIiZrb3BmO1wiLFwi8J2TgFwiOlwiJmtzY3I7XCIsXCLipJtcIjpcIiZsQXRhaWw7XCIsXCLipI5cIjpcIiZsQmFycjtcIixcIuKqi1wiOlwiJmxlc3NlcXFndHI7XCIsXCLipaJcIjpcIiZsSGFyO1wiLFwixLpcIjpcIiZsYWN1dGU7XCIsXCLiprRcIjpcIiZsYWVtcHR5djtcIixcIs67XCI6XCImbGFtYmRhO1wiLFwi4qaRXCI6XCImbGFuZ2Q7XCIsXCLiqoVcIjpcIiZsZXNzYXBwcm94O1wiLFwiwqtcIjpcIiZsYXF1bztcIixcIuKkn1wiOlwiJmxhcnJiZnM7XCIsXCLipJ1cIjpcIiZsYXJyZnM7XCIsXCLihqtcIjpcIiZsb29wYXJyb3dsZWZ0O1wiLFwi4qS5XCI6XCImbGFycnBsO1wiLFwi4qWzXCI6XCImbGFycnNpbTtcIixcIuKGolwiOlwiJmxlZnRhcnJvd3RhaWw7XCIsXCLiqqtcIjpcIiZsYXQ7XCIsXCLipJlcIjpcIiZsYXRhaWw7XCIsXCLiqq1cIjpcIiZsYXRlO1wiLFwi4qqt77iAXCI6XCImbGF0ZXM7XCIsXCLipIxcIjpcIiZsYmFycjtcIixcIuKdslwiOlwiJmxiYnJrO1wiLFwie1wiOlwiJmxjdWI7XCIsXCJbXCI6XCImbHNxYjtcIixcIuKmi1wiOlwiJmxicmtlO1wiLFwi4qaPXCI6XCImbGJya3NsZDtcIixcIuKmjVwiOlwiJmxicmtzbHU7XCIsXCLEvlwiOlwiJmxjYXJvbjtcIixcIsS8XCI6XCImbGNlZGlsO1wiLFwi0LtcIjpcIiZsY3k7XCIsXCLipLZcIjpcIiZsZGNhO1wiLFwi4qWnXCI6XCImbGRyZGhhcjtcIixcIuKli1wiOlwiJmxkcnVzaGFyO1wiLFwi4oayXCI6XCImbGRzaDtcIixcIuKJpFwiOlwiJmxlcTtcIixcIuKHh1wiOlwiJmxsYXJyO1wiLFwi4ouLXCI6XCImbHRocmVlO1wiLFwi4qqoXCI6XCImbGVzY2M7XCIsXCLiqb9cIjpcIiZsZXNkb3Q7XCIsXCLiqoFcIjpcIiZsZXNkb3RvO1wiLFwi4qqDXCI6XCImbGVzZG90b3I7XCIsXCLii5rvuIBcIjpcIiZsZXNnO1wiLFwi4qqTXCI6XCImbGVzZ2VzO1wiLFwi4ouWXCI6XCImbHRkb3Q7XCIsXCLipbxcIjpcIiZsZmlzaHQ7XCIsXCLwnZSpXCI6XCImbGZyO1wiLFwi4qqRXCI6XCImbGdFO1wiLFwi4qWqXCI6XCImbGhhcnVsO1wiLFwi4paEXCI6XCImbGhibGs7XCIsXCLRmVwiOlwiJmxqY3k7XCIsXCLipatcIjpcIiZsbGhhcmQ7XCIsXCLil7pcIjpcIiZsbHRyaTtcIixcIsWAXCI6XCImbG1pZG90O1wiLFwi4o6wXCI6XCImbG1vdXN0YWNoZTtcIixcIuKJqFwiOlwiJmxuZXFxO1wiLFwi4qqJXCI6XCImbG5hcHByb3g7XCIsXCLiqodcIjpcIiZsbmVxO1wiLFwi4oumXCI6XCImbG5zaW07XCIsXCLin6xcIjpcIiZsb2FuZztcIixcIuKHvVwiOlwiJmxvYXJyO1wiLFwi4p+8XCI6XCImeG1hcDtcIixcIuKGrFwiOlwiJnJhcnJscDtcIixcIuKmhVwiOlwiJmxvcGFyO1wiLFwi8J2VnVwiOlwiJmxvcGY7XCIsXCLiqK1cIjpcIiZsb3BsdXM7XCIsXCLiqLRcIjpcIiZsb3RpbWVzO1wiLFwi4oiXXCI6XCImbG93YXN0O1wiLFwi4peKXCI6XCImbG96ZW5nZTtcIixcIihcIjpcIiZscGFyO1wiLFwi4qaTXCI6XCImbHBhcmx0O1wiLFwi4qWtXCI6XCImbHJoYXJkO1wiLFwi4oCOXCI6XCImbHJtO1wiLFwi4oq/XCI6XCImbHJ0cmk7XCIsXCLigLlcIjpcIiZsc2FxdW87XCIsXCLwnZOBXCI6XCImbHNjcjtcIixcIuKqjVwiOlwiJmxzaW1lO1wiLFwi4qqPXCI6XCImbHNpbWc7XCIsXCLigJpcIjpcIiZzYnF1bztcIixcIsWCXCI6XCImbHN0cm9rO1wiLFwi4qqmXCI6XCImbHRjYztcIixcIuKpuVwiOlwiJmx0Y2lyO1wiLFwi4ouJXCI6XCImbHRpbWVzO1wiLFwi4qW2XCI6XCImbHRsYXJyO1wiLFwi4qm7XCI6XCImbHRxdWVzdDtcIixcIuKmllwiOlwiJmx0clBhcjtcIixcIuKXg1wiOlwiJnRyaWFuZ2xlbGVmdDtcIixcIuKlilwiOlwiJmx1cmRzaGFyO1wiLFwi4qWmXCI6XCImbHVydWhhcjtcIixcIuKJqO+4gFwiOlwiJmx2bkU7XCIsXCLiiLpcIjpcIiZtRERvdDtcIixcIsKvXCI6XCImc3RybnM7XCIsXCLimYJcIjpcIiZtYWxlO1wiLFwi4pygXCI6XCImbWFsdGVzZTtcIixcIuKWrlwiOlwiJm1hcmtlcjtcIixcIuKoqVwiOlwiJm1jb21tYTtcIixcItC8XCI6XCImbWN5O1wiLFwi4oCUXCI6XCImbWRhc2g7XCIsXCLwnZSqXCI6XCImbWZyO1wiLFwi4oSnXCI6XCImbWhvO1wiLFwiwrVcIjpcIiZtaWNybztcIixcIuKrsFwiOlwiJm1pZGNpcjtcIixcIuKIklwiOlwiJm1pbnVzO1wiLFwi4qiqXCI6XCImbWludXNkdTtcIixcIuKrm1wiOlwiJm1sY3A7XCIsXCLiiqdcIjpcIiZtb2RlbHM7XCIsXCLwnZWeXCI6XCImbW9wZjtcIixcIvCdk4JcIjpcIiZtc2NyO1wiLFwizrxcIjpcIiZtdTtcIixcIuKKuFwiOlwiJm11bWFwO1wiLFwi4ouZzLhcIjpcIiZuR2c7XCIsXCLiiavig5JcIjpcIiZuR3Q7XCIsXCLih41cIjpcIiZubEFycjtcIixcIuKHjlwiOlwiJm5oQXJyO1wiLFwi4ouYzLhcIjpcIiZuTGw7XCIsXCLiiarig5JcIjpcIiZuTHQ7XCIsXCLih49cIjpcIiZuckFycjtcIixcIuKKr1wiOlwiJm5WRGFzaDtcIixcIuKKrlwiOlwiJm5WZGFzaDtcIixcIsWEXCI6XCImbmFjdXRlO1wiLFwi4oig4oOSXCI6XCImbmFuZztcIixcIuKpsMy4XCI6XCImbmFwRTtcIixcIuKJi8y4XCI6XCImbmFwaWQ7XCIsXCLFiVwiOlwiJm5hcG9zO1wiLFwi4pmuXCI6XCImbmF0dXJhbDtcIixcIuKpg1wiOlwiJm5jYXA7XCIsXCLFiFwiOlwiJm5jYXJvbjtcIixcIsWGXCI6XCImbmNlZGlsO1wiLFwi4qmtzLhcIjpcIiZuY29uZ2RvdDtcIixcIuKpglwiOlwiJm5jdXA7XCIsXCLQvVwiOlwiJm5jeTtcIixcIuKAk1wiOlwiJm5kYXNoO1wiLFwi4oeXXCI6XCImbmVBcnI7XCIsXCLipKRcIjpcIiZuZWFyaGs7XCIsXCLiiZDMuFwiOlwiJm5lZG90O1wiLFwi4qSoXCI6XCImdG9lYTtcIixcIvCdlKtcIjpcIiZuZnI7XCIsXCLihq5cIjpcIiZubGVmdHJpZ2h0YXJyb3c7XCIsXCLiq7JcIjpcIiZuaHBhcjtcIixcIuKLvFwiOlwiJm5pcztcIixcIuKLulwiOlwiJm5pc2Q7XCIsXCLRmlwiOlwiJm5qY3k7XCIsXCLiiabMuFwiOlwiJm5sZXFxO1wiLFwi4oaaXCI6XCImbmxlZnRhcnJvdztcIixcIuKApVwiOlwiJm5sZHI7XCIsXCLwnZWfXCI6XCImbm9wZjtcIixcIsKsXCI6XCImbm90O1wiLFwi4ou5zLhcIjpcIiZub3RpbkU7XCIsXCLii7XMuFwiOlwiJm5vdGluZG90O1wiLFwi4ou3XCI6XCImbm90aW52YjtcIixcIuKLtlwiOlwiJm5vdGludmM7XCIsXCLii75cIjpcIiZub3RuaXZiO1wiLFwi4ou9XCI6XCImbm90bml2YztcIixcIuKrveKDpVwiOlwiJm5wYXJzbDtcIixcIuKIgsy4XCI6XCImbnBhcnQ7XCIsXCLiqJRcIjpcIiZucG9saW50O1wiLFwi4oabXCI6XCImbnJpZ2h0YXJyb3c7XCIsXCLipLPMuFwiOlwiJm5yYXJyYztcIixcIuKGncy4XCI6XCImbnJhcnJ3O1wiLFwi8J2Tg1wiOlwiJm5zY3I7XCIsXCLiioRcIjpcIiZuc3ViO1wiLFwi4quFzLhcIjpcIiZuc3Vic2V0ZXFxO1wiLFwi4oqFXCI6XCImbnN1cDtcIixcIuKrhsy4XCI6XCImbnN1cHNldGVxcTtcIixcIsOxXCI6XCImbnRpbGRlO1wiLFwizr1cIjpcIiZudTtcIixcIiNcIjpcIiZudW07XCIsXCLihJZcIjpcIiZudW1lcm87XCIsXCLigIdcIjpcIiZudW1zcDtcIixcIuKKrVwiOlwiJm52RGFzaDtcIixcIuKkhFwiOlwiJm52SGFycjtcIixcIuKJjeKDklwiOlwiJm52YXA7XCIsXCLiiqxcIjpcIiZudmRhc2g7XCIsXCLiiaXig5JcIjpcIiZudmdlO1wiLFwiPuKDklwiOlwiJm52Z3Q7XCIsXCLip55cIjpcIiZudmluZmluO1wiLFwi4qSCXCI6XCImbnZsQXJyO1wiLFwi4omk4oOSXCI6XCImbnZsZTtcIixcIjzig5JcIjpcIiZudmx0O1wiLFwi4oq04oOSXCI6XCImbnZsdHJpZTtcIixcIuKkg1wiOlwiJm52ckFycjtcIixcIuKKteKDklwiOlwiJm52cnRyaWU7XCIsXCLiiLzig5JcIjpcIiZudnNpbTtcIixcIuKHllwiOlwiJm53QXJyO1wiLFwi4qSjXCI6XCImbndhcmhrO1wiLFwi4qSnXCI6XCImbnduZWFyO1wiLFwiw7NcIjpcIiZvYWN1dGU7XCIsXCLDtFwiOlwiJm9jaXJjO1wiLFwi0L5cIjpcIiZvY3k7XCIsXCLFkVwiOlwiJm9kYmxhYztcIixcIuKouFwiOlwiJm9kaXY7XCIsXCLiprxcIjpcIiZvZHNvbGQ7XCIsXCLFk1wiOlwiJm9lbGlnO1wiLFwi4qa/XCI6XCImb2ZjaXI7XCIsXCLwnZSsXCI6XCImb2ZyO1wiLFwiy5tcIjpcIiZvZ29uO1wiLFwiw7JcIjpcIiZvZ3JhdmU7XCIsXCLip4FcIjpcIiZvZ3Q7XCIsXCLiprVcIjpcIiZvaGJhcjtcIixcIuKmvlwiOlwiJm9sY2lyO1wiLFwi4qa7XCI6XCImb2xjcm9zcztcIixcIuKngFwiOlwiJm9sdDtcIixcIsWNXCI6XCImb21hY3I7XCIsXCLPiVwiOlwiJm9tZWdhO1wiLFwizr9cIjpcIiZvbWljcm9uO1wiLFwi4qa2XCI6XCImb21pZDtcIixcIvCdlaBcIjpcIiZvb3BmO1wiLFwi4qa3XCI6XCImb3BhcjtcIixcIuKmuVwiOlwiJm9wZXJwO1wiLFwi4oioXCI6XCImdmVlO1wiLFwi4qmdXCI6XCImb3JkO1wiLFwi4oS0XCI6XCImb3NjcjtcIixcIsKqXCI6XCImb3JkZjtcIixcIsK6XCI6XCImb3JkbTtcIixcIuKKtlwiOlwiJm9yaWdvZjtcIixcIuKpllwiOlwiJm9yb3I7XCIsXCLiqZdcIjpcIiZvcnNsb3BlO1wiLFwi4qmbXCI6XCImb3J2O1wiLFwiw7hcIjpcIiZvc2xhc2g7XCIsXCLiiphcIjpcIiZvc29sO1wiLFwiw7VcIjpcIiZvdGlsZGU7XCIsXCLiqLZcIjpcIiZvdGltZXNhcztcIixcIsO2XCI6XCImb3VtbDtcIixcIuKMvVwiOlwiJm92YmFyO1wiLFwiwrZcIjpcIiZwYXJhO1wiLFwi4quzXCI6XCImcGFyc2ltO1wiLFwi4qu9XCI6XCImcGFyc2w7XCIsXCLQv1wiOlwiJnBjeTtcIixcIiVcIjpcIiZwZXJjbnQ7XCIsXCIuXCI6XCImcGVyaW9kO1wiLFwi4oCwXCI6XCImcGVybWlsO1wiLFwi4oCxXCI6XCImcGVydGVuaztcIixcIvCdlK1cIjpcIiZwZnI7XCIsXCLPhlwiOlwiJnBoaTtcIixcIs+VXCI6XCImdmFycGhpO1wiLFwi4piOXCI6XCImcGhvbmU7XCIsXCLPgFwiOlwiJnBpO1wiLFwiz5ZcIjpcIiZ2YXJwaTtcIixcIuKEjlwiOlwiJnBsYW5ja2g7XCIsXCIrXCI6XCImcGx1cztcIixcIuKoo1wiOlwiJnBsdXNhY2lyO1wiLFwi4qiiXCI6XCImcGx1c2NpcjtcIixcIuKopVwiOlwiJnBsdXNkdTtcIixcIuKpslwiOlwiJnBsdXNlO1wiLFwi4qimXCI6XCImcGx1c3NpbTtcIixcIuKop1wiOlwiJnBsdXN0d287XCIsXCLiqJVcIjpcIiZwb2ludGludDtcIixcIvCdlaFcIjpcIiZwb3BmO1wiLFwiwqNcIjpcIiZwb3VuZDtcIixcIuKqs1wiOlwiJnByRTtcIixcIuKqt1wiOlwiJnByZWNhcHByb3g7XCIsXCLiqrlcIjpcIiZwcm5hcDtcIixcIuKqtVwiOlwiJnBybkU7XCIsXCLii6hcIjpcIiZwcm5zaW07XCIsXCLigLJcIjpcIiZwcmltZTtcIixcIuKMrlwiOlwiJnByb2ZhbGFyO1wiLFwi4oySXCI6XCImcHJvZmxpbmU7XCIsXCLijJNcIjpcIiZwcm9mc3VyZjtcIixcIuKKsFwiOlwiJnBydXJlbDtcIixcIvCdk4VcIjpcIiZwc2NyO1wiLFwiz4hcIjpcIiZwc2k7XCIsXCLigIhcIjpcIiZwdW5jc3A7XCIsXCLwnZSuXCI6XCImcWZyO1wiLFwi8J2VolwiOlwiJnFvcGY7XCIsXCLigZdcIjpcIiZxcHJpbWU7XCIsXCLwnZOGXCI6XCImcXNjcjtcIixcIuKollwiOlwiJnF1YXRpbnQ7XCIsXCI/XCI6XCImcXVlc3Q7XCIsXCLipJxcIjpcIiZyQXRhaWw7XCIsXCLipaRcIjpcIiZySGFyO1wiLFwi4oi9zLFcIjpcIiZyYWNlO1wiLFwixZVcIjpcIiZyYWN1dGU7XCIsXCLiprNcIjpcIiZyYWVtcHR5djtcIixcIuKmklwiOlwiJnJhbmdkO1wiLFwi4qalXCI6XCImcmFuZ2U7XCIsXCLCu1wiOlwiJnJhcXVvO1wiLFwi4qW1XCI6XCImcmFycmFwO1wiLFwi4qSgXCI6XCImcmFycmJmcztcIixcIuKks1wiOlwiJnJhcnJjO1wiLFwi4qSeXCI6XCImcmFycmZzO1wiLFwi4qWFXCI6XCImcmFycnBsO1wiLFwi4qW0XCI6XCImcmFycnNpbTtcIixcIuKGo1wiOlwiJnJpZ2h0YXJyb3d0YWlsO1wiLFwi4oadXCI6XCImcmlnaHRzcXVpZ2Fycm93O1wiLFwi4qSaXCI6XCImcmF0YWlsO1wiLFwi4oi2XCI6XCImcmF0aW87XCIsXCLinbNcIjpcIiZyYmJyaztcIixcIn1cIjpcIiZyY3ViO1wiLFwiXVwiOlwiJnJzcWI7XCIsXCLipoxcIjpcIiZyYnJrZTtcIixcIuKmjlwiOlwiJnJicmtzbGQ7XCIsXCLippBcIjpcIiZyYnJrc2x1O1wiLFwixZlcIjpcIiZyY2Fyb247XCIsXCLFl1wiOlwiJnJjZWRpbDtcIixcItGAXCI6XCImcmN5O1wiLFwi4qS3XCI6XCImcmRjYTtcIixcIuKlqVwiOlwiJnJkbGRoYXI7XCIsXCLihrNcIjpcIiZyZHNoO1wiLFwi4patXCI6XCImcmVjdDtcIixcIuKlvVwiOlwiJnJmaXNodDtcIixcIvCdlK9cIjpcIiZyZnI7XCIsXCLipaxcIjpcIiZyaGFydWw7XCIsXCLPgVwiOlwiJnJobztcIixcIs+xXCI6XCImdmFycmhvO1wiLFwi4oeJXCI6XCImcnJhcnI7XCIsXCLii4xcIjpcIiZydGhyZWU7XCIsXCLLmlwiOlwiJnJpbmc7XCIsXCLigI9cIjpcIiZybG07XCIsXCLijrFcIjpcIiZybW91c3RhY2hlO1wiLFwi4quuXCI6XCImcm5taWQ7XCIsXCLin61cIjpcIiZyb2FuZztcIixcIuKHvlwiOlwiJnJvYXJyO1wiLFwi4qaGXCI6XCImcm9wYXI7XCIsXCLwnZWjXCI6XCImcm9wZjtcIixcIuKorlwiOlwiJnJvcGx1cztcIixcIuKotVwiOlwiJnJvdGltZXM7XCIsXCIpXCI6XCImcnBhcjtcIixcIuKmlFwiOlwiJnJwYXJndDtcIixcIuKoklwiOlwiJnJwcG9saW50O1wiLFwi4oC6XCI6XCImcnNhcXVvO1wiLFwi8J2Th1wiOlwiJnJzY3I7XCIsXCLii4pcIjpcIiZydGltZXM7XCIsXCLilrlcIjpcIiZ0cmlhbmdsZXJpZ2h0O1wiLFwi4qeOXCI6XCImcnRyaWx0cmk7XCIsXCLipahcIjpcIiZydWx1aGFyO1wiLFwi4oSeXCI6XCImcng7XCIsXCLFm1wiOlwiJnNhY3V0ZTtcIixcIuKqtFwiOlwiJnNjRTtcIixcIuKquFwiOlwiJnN1Y2NhcHByb3g7XCIsXCLFoVwiOlwiJnNjYXJvbjtcIixcIsWfXCI6XCImc2NlZGlsO1wiLFwixZ1cIjpcIiZzY2lyYztcIixcIuKqtlwiOlwiJnN1Y2NuZXFxO1wiLFwi4qq6XCI6XCImc3VjY25hcHByb3g7XCIsXCLii6lcIjpcIiZzdWNjbnNpbTtcIixcIuKok1wiOlwiJnNjcG9saW50O1wiLFwi0YFcIjpcIiZzY3k7XCIsXCLii4VcIjpcIiZzZG90O1wiLFwi4qmmXCI6XCImc2RvdGU7XCIsXCLih5hcIjpcIiZzZUFycjtcIixcIsKnXCI6XCImc2VjdDtcIixcIjtcIjpcIiZzZW1pO1wiLFwi4qSpXCI6XCImdG9zYTtcIixcIuKctlwiOlwiJnNleHQ7XCIsXCLwnZSwXCI6XCImc2ZyO1wiLFwi4pmvXCI6XCImc2hhcnA7XCIsXCLRiVwiOlwiJnNoY2hjeTtcIixcItGIXCI6XCImc2hjeTtcIixcIsKtXCI6XCImc2h5O1wiLFwiz4NcIjpcIiZzaWdtYTtcIixcIs+CXCI6XCImdmFyc2lnbWE7XCIsXCLiqapcIjpcIiZzaW1kb3Q7XCIsXCLiqp5cIjpcIiZzaW1nO1wiLFwi4qqgXCI6XCImc2ltZ0U7XCIsXCLiqp1cIjpcIiZzaW1sO1wiLFwi4qqfXCI6XCImc2ltbEU7XCIsXCLiiYZcIjpcIiZzaW1uZTtcIixcIuKopFwiOlwiJnNpbXBsdXM7XCIsXCLipbJcIjpcIiZzaW1yYXJyO1wiLFwi4qizXCI6XCImc21hc2hwO1wiLFwi4qekXCI6XCImc21lcGFyc2w7XCIsXCLijKNcIjpcIiZzc21pbGU7XCIsXCLiqqpcIjpcIiZzbXQ7XCIsXCLiqqxcIjpcIiZzbXRlO1wiLFwi4qqs77iAXCI6XCImc210ZXM7XCIsXCLRjFwiOlwiJnNvZnRjeTtcIixcIi9cIjpcIiZzb2w7XCIsXCLip4RcIjpcIiZzb2xiO1wiLFwi4oy/XCI6XCImc29sYmFyO1wiLFwi8J2VpFwiOlwiJnNvcGY7XCIsXCLimaBcIjpcIiZzcGFkZXN1aXQ7XCIsXCLiipPvuIBcIjpcIiZzcWNhcHM7XCIsXCLiipTvuIBcIjpcIiZzcWN1cHM7XCIsXCLwnZOIXCI6XCImc3NjcjtcIixcIuKYhlwiOlwiJnN0YXI7XCIsXCLiioJcIjpcIiZzdWJzZXQ7XCIsXCLiq4VcIjpcIiZzdWJzZXRlcXE7XCIsXCLiqr1cIjpcIiZzdWJkb3Q7XCIsXCLiq4NcIjpcIiZzdWJlZG90O1wiLFwi4quBXCI6XCImc3VibXVsdDtcIixcIuKri1wiOlwiJnN1YnNldG5lcXE7XCIsXCLiiopcIjpcIiZzdWJzZXRuZXE7XCIsXCLiqr9cIjpcIiZzdWJwbHVzO1wiLFwi4qW5XCI6XCImc3VicmFycjtcIixcIuKrh1wiOlwiJnN1YnNpbTtcIixcIuKrlVwiOlwiJnN1YnN1YjtcIixcIuKrk1wiOlwiJnN1YnN1cDtcIixcIuKZqlwiOlwiJnN1bmc7XCIsXCLCuVwiOlwiJnN1cDE7XCIsXCLCslwiOlwiJnN1cDI7XCIsXCLCs1wiOlwiJnN1cDM7XCIsXCLiq4ZcIjpcIiZzdXBzZXRlcXE7XCIsXCLiqr5cIjpcIiZzdXBkb3Q7XCIsXCLiq5hcIjpcIiZzdXBkc3ViO1wiLFwi4quEXCI6XCImc3VwZWRvdDtcIixcIuKfiVwiOlwiJnN1cGhzb2w7XCIsXCLiq5dcIjpcIiZzdXBoc3ViO1wiLFwi4qW7XCI6XCImc3VwbGFycjtcIixcIuKrglwiOlwiJnN1cG11bHQ7XCIsXCLiq4xcIjpcIiZzdXBzZXRuZXFxO1wiLFwi4oqLXCI6XCImc3Vwc2V0bmVxO1wiLFwi4quAXCI6XCImc3VwcGx1cztcIixcIuKriFwiOlwiJnN1cHNpbTtcIixcIuKrlFwiOlwiJnN1cHN1YjtcIixcIuKrllwiOlwiJnN1cHN1cDtcIixcIuKHmVwiOlwiJnN3QXJyO1wiLFwi4qSqXCI6XCImc3dud2FyO1wiLFwiw59cIjpcIiZzemxpZztcIixcIuKMllwiOlwiJnRhcmdldDtcIixcIs+EXCI6XCImdGF1O1wiLFwixaVcIjpcIiZ0Y2Fyb247XCIsXCLFo1wiOlwiJnRjZWRpbDtcIixcItGCXCI6XCImdGN5O1wiLFwi4oyVXCI6XCImdGVscmVjO1wiLFwi8J2UsVwiOlwiJnRmcjtcIixcIs64XCI6XCImdGhldGE7XCIsXCLPkVwiOlwiJnZhcnRoZXRhO1wiLFwiw75cIjpcIiZ0aG9ybjtcIixcIsOXXCI6XCImdGltZXM7XCIsXCLiqLFcIjpcIiZ0aW1lc2JhcjtcIixcIuKosFwiOlwiJnRpbWVzZDtcIixcIuKMtlwiOlwiJnRvcGJvdDtcIixcIuKrsVwiOlwiJnRvcGNpcjtcIixcIvCdlaVcIjpcIiZ0b3BmO1wiLFwi4quaXCI6XCImdG9wZm9yaztcIixcIuKAtFwiOlwiJnRwcmltZTtcIixcIuKWtVwiOlwiJnV0cmk7XCIsXCLiiZxcIjpcIiZ0cmllO1wiLFwi4pesXCI6XCImdHJpZG90O1wiLFwi4qi6XCI6XCImdHJpbWludXM7XCIsXCLiqLlcIjpcIiZ0cmlwbHVzO1wiLFwi4qeNXCI6XCImdHJpc2I7XCIsXCLiqLtcIjpcIiZ0cml0aW1lO1wiLFwi4o+iXCI6XCImdHJwZXppdW07XCIsXCLwnZOJXCI6XCImdHNjcjtcIixcItGGXCI6XCImdHNjeTtcIixcItGbXCI6XCImdHNoY3k7XCIsXCLFp1wiOlwiJnRzdHJvaztcIixcIuKlo1wiOlwiJnVIYXI7XCIsXCLDulwiOlwiJnVhY3V0ZTtcIixcItGeXCI6XCImdWJyY3k7XCIsXCLFrVwiOlwiJnVicmV2ZTtcIixcIsO7XCI6XCImdWNpcmM7XCIsXCLRg1wiOlwiJnVjeTtcIixcIsWxXCI6XCImdWRibGFjO1wiLFwi4qW+XCI6XCImdWZpc2h0O1wiLFwi8J2UslwiOlwiJnVmcjtcIixcIsO5XCI6XCImdWdyYXZlO1wiLFwi4paAXCI6XCImdWhibGs7XCIsXCLijJxcIjpcIiZ1bGNvcm5lcjtcIixcIuKMj1wiOlwiJnVsY3JvcDtcIixcIuKXuFwiOlwiJnVsdHJpO1wiLFwixatcIjpcIiZ1bWFjcjtcIixcIsWzXCI6XCImdW9nb247XCIsXCLwnZWmXCI6XCImdW9wZjtcIixcIs+FXCI6XCImdXBzaWxvbjtcIixcIuKHiFwiOlwiJnV1YXJyO1wiLFwi4oydXCI6XCImdXJjb3JuZXI7XCIsXCLijI5cIjpcIiZ1cmNyb3A7XCIsXCLFr1wiOlwiJnVyaW5nO1wiLFwi4pe5XCI6XCImdXJ0cmk7XCIsXCLwnZOKXCI6XCImdXNjcjtcIixcIuKLsFwiOlwiJnV0ZG90O1wiLFwixalcIjpcIiZ1dGlsZGU7XCIsXCLDvFwiOlwiJnV1bWw7XCIsXCLipqdcIjpcIiZ1d2FuZ2xlO1wiLFwi4quoXCI6XCImdkJhcjtcIixcIuKrqVwiOlwiJnZCYXJ2O1wiLFwi4qacXCI6XCImdmFuZ3J0O1wiLFwi4oqK77iAXCI6XCImdnN1Ym5lO1wiLFwi4quL77iAXCI6XCImdnN1Ym5FO1wiLFwi4oqL77iAXCI6XCImdnN1cG5lO1wiLFwi4quM77iAXCI6XCImdnN1cG5FO1wiLFwi0LJcIjpcIiZ2Y3k7XCIsXCLiirtcIjpcIiZ2ZWViYXI7XCIsXCLiiZpcIjpcIiZ2ZWVlcTtcIixcIuKLrlwiOlwiJnZlbGxpcDtcIixcIvCdlLNcIjpcIiZ2ZnI7XCIsXCLwnZWnXCI6XCImdm9wZjtcIixcIvCdk4tcIjpcIiZ2c2NyO1wiLFwi4qaaXCI6XCImdnppZ3phZztcIixcIsW1XCI6XCImd2NpcmM7XCIsXCLiqZ9cIjpcIiZ3ZWRiYXI7XCIsXCLiiZlcIjpcIiZ3ZWRnZXE7XCIsXCLihJhcIjpcIiZ3cDtcIixcIvCdlLRcIjpcIiZ3ZnI7XCIsXCLwnZWoXCI6XCImd29wZjtcIixcIvCdk4xcIjpcIiZ3c2NyO1wiLFwi8J2UtVwiOlwiJnhmcjtcIixcIs6+XCI6XCImeGk7XCIsXCLii7tcIjpcIiZ4bmlzO1wiLFwi8J2VqVwiOlwiJnhvcGY7XCIsXCLwnZONXCI6XCImeHNjcjtcIixcIsO9XCI6XCImeWFjdXRlO1wiLFwi0Y9cIjpcIiZ5YWN5O1wiLFwixbdcIjpcIiZ5Y2lyYztcIixcItGLXCI6XCImeWN5O1wiLFwiwqVcIjpcIiZ5ZW47XCIsXCLwnZS2XCI6XCImeWZyO1wiLFwi0ZdcIjpcIiZ5aWN5O1wiLFwi8J2VqlwiOlwiJnlvcGY7XCIsXCLwnZOOXCI6XCImeXNjcjtcIixcItGOXCI6XCImeXVjeTtcIixcIsO/XCI6XCImeXVtbDtcIixcIsW6XCI6XCImemFjdXRlO1wiLFwixb5cIjpcIiZ6Y2Fyb247XCIsXCLQt1wiOlwiJnpjeTtcIixcIsW8XCI6XCImemRvdDtcIixcIs62XCI6XCImemV0YTtcIixcIvCdlLdcIjpcIiZ6ZnI7XCIsXCLQtlwiOlwiJnpoY3k7XCIsXCLih51cIjpcIiZ6aWdyYXJyO1wiLFwi8J2Vq1wiOlwiJnpvcGY7XCIsXCLwnZOPXCI6XCImenNjcjtcIixcIuKAjVwiOlwiJnp3ajtcIixcIuKAjFwiOlwiJnp3bmo7XCJ9fX07IiwiXCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOnRydWV9KTtleHBvcnRzLm51bWVyaWNVbmljb2RlTWFwPXswOjY1NTMzLDEyODo4MzY0LDEzMDo4MjE4LDEzMTo0MDIsMTMyOjgyMjIsMTMzOjgyMzAsMTM0OjgyMjQsMTM1OjgyMjUsMTM2OjcxMCwxMzc6ODI0MCwxMzg6MzUyLDEzOTo4MjQ5LDE0MDozMzgsMTQyOjM4MSwxNDU6ODIxNiwxNDY6ODIxNywxNDc6ODIyMCwxNDg6ODIyMSwxNDk6ODIyNiwxNTA6ODIxMSwxNTE6ODIxMiwxNTI6NzMyLDE1Mzo4NDgyLDE1NDozNTMsMTU1OjgyNTAsMTU2OjMzOSwxNTg6MzgyLDE1OTozNzZ9OyIsIlwidXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTp0cnVlfSk7ZXhwb3J0cy5mcm9tQ29kZVBvaW50PVN0cmluZy5mcm9tQ29kZVBvaW50fHxmdW5jdGlvbihhc3RyYWxDb2RlUG9pbnQpe3JldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKE1hdGguZmxvb3IoKGFzdHJhbENvZGVQb2ludC02NTUzNikvMTAyNCkrNTUyOTYsKGFzdHJhbENvZGVQb2ludC02NTUzNiklMTAyNCs1NjMyMCl9O2V4cG9ydHMuZ2V0Q29kZVBvaW50PVN0cmluZy5wcm90b3R5cGUuY29kZVBvaW50QXQ/ZnVuY3Rpb24oaW5wdXQscG9zaXRpb24pe3JldHVybiBpbnB1dC5jb2RlUG9pbnRBdChwb3NpdGlvbil9OmZ1bmN0aW9uKGlucHV0LHBvc2l0aW9uKXtyZXR1cm4oaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbiktNTUyOTYpKjEwMjQraW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbisxKS01NjMyMCs2NTUzNn07ZXhwb3J0cy5oaWdoU3Vycm9nYXRlRnJvbT01NTI5NjtleHBvcnRzLmhpZ2hTdXJyb2dhdGVUbz01NjMxOTsiLCJleHBvcnQgZGVmYXVsdCBcInByZWNpc2lvbiBoaWdocCBmbG9hdDtcXG5wcmVjaXNpb24gaGlnaHAgaW50O1xcbiNkZWZpbmUgR0xTTElGWSAxXFxuXFxudW5pZm9ybSBzYW1wbGVyMkQgdFdhdGVyO1xcbnVuaWZvcm0gc2FtcGxlcjJEIHRGbG93O1xcbnVuaWZvcm0gZmxvYXQgdVRpbWU7XFxuXFxudmFyeWluZyB2ZWMyIHZVdjtcXG5cXG51bmlmb3JtIHZlYzQgcmVzO1xcblxcbnZvaWQgbWFpbigpIHtcXG4gICAgICAgIC8vIFIgYW5kIEcgdmFsdWVzIGFyZSB2ZWxvY2l0eSBpbiB0aGUgeCBhbmQgeSBkaXJlY3Rpb25cXG4gICAgICAgIC8vIEIgdmFsdWUgaXMgdGhlIHZlbG9jaXR5IGxlbmd0aFxcbiAgICAgICAgdmVjMyBmbG93ID0gdGV4dHVyZTJEKHRGbG93LCB2VXYpLnJnYjtcXG4gICAgICAgIHZlYzIgdXYgPSAuNSAqIGdsX0ZyYWdDb29yZC54eSAvIHJlcy54eSA7XFxuICAgICAgICB2ZWMyIG15VVYgPSAodXYgLSB2ZWMyKDAuNSkpKnJlcy56dyArIHZlYzIoMC41KTtcXG5cXG4gICAgICAgIG15VVYgLT0gZmxvdy54eSAqICgwLjE1ICogMC43KTtcXG4gICAgICAgIFxcbiAgICAgICAgdmVjMyB0ZXggPSB0ZXh0dXJlMkQodFdhdGVyLCBteVVWKS5yZ2I7XFxuXFxuICAgICAgICAvLyBnbF9GcmFnQ29sb3IgPSB2ZWM0KGZsb3cuciwgZmxvdy5nLCBmbG93LmIsIDEuMCk7XFxuICAgICAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KHRleC5yLCB0ZXguZywgdGV4LmIsIDEuMCk7XFxufVwiOyIsImV4cG9ydCBkZWZhdWx0IFwiI2RlZmluZSBHTFNMSUZZIDFcXG5hdHRyaWJ1dGUgdmVjMiB1djtcXG5hdHRyaWJ1dGUgdmVjMiBwb3NpdGlvbjtcXG5cXG52YXJ5aW5nIHZlYzIgdlV2O1xcblxcbnZvaWQgbWFpbigpIHtcXG4gICAgICAgIHZVdiA9IHV2O1xcbiAgICAgICAgXFxuICAgICAgICBnbF9Qb3NpdGlvbiA9IHZlYzQocG9zaXRpb24sIDAsIDEpO1xcbn1cIjsiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7IHdyaXRhYmxlOiBmYWxzZSB9KTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuLi91dGlscy9sb2cuanNcIjtcblxudmFyIFdlYlNvY2tldENsaWVudCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAqL1xuICBmdW5jdGlvbiBXZWJTb2NrZXRDbGllbnQodXJsKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFdlYlNvY2tldENsaWVudCk7XG5cbiAgICB0aGlzLmNsaWVudCA9IG5ldyBXZWJTb2NrZXQodXJsKTtcblxuICAgIHRoaXMuY2xpZW50Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIGxvZy5lcnJvcihlcnJvcik7XG4gICAgfTtcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHsoLi4uYXJnczogYW55W10pID0+IHZvaWR9IGZcbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoV2ViU29ja2V0Q2xpZW50LCBbe1xuICAgIGtleTogXCJvbk9wZW5cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25PcGVuKGYpIHtcbiAgICAgIHRoaXMuY2xpZW50Lm9ub3BlbiA9IGY7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSBmXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJvbkNsb3NlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uQ2xvc2UoZikge1xuICAgICAgdGhpcy5jbGllbnQub25jbG9zZSA9IGY7XG4gICAgfSAvLyBjYWxsIGYgd2l0aCB0aGUgbWVzc2FnZSBzdHJpbmcgYXMgdGhlIGZpcnN0IGFyZ3VtZW50XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0geyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gZlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwib25NZXNzYWdlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uTWVzc2FnZShmKSB7XG4gICAgICB0aGlzLmNsaWVudC5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBmKGUuZGF0YSk7XG4gICAgICB9O1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBXZWJTb2NrZXRDbGllbnQ7XG59KCk7XG5cbmV4cG9ydCB7IFdlYlNvY2tldENsaWVudCBhcyBkZWZhdWx0IH07IiwiLyoqKioqKi8gKGZ1bmN0aW9uKCkgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdFwidXNlIHN0cmljdFwiO1xuLyoqKioqKi8gXHR2YXIgX193ZWJwYWNrX21vZHVsZXNfXyA9ICh7XG5cbi8qKiovIFwiLi9jbGllbnQtc3JjL21vZHVsZXMvbG9nZ2VyL1N5bmNCYWlsSG9va0Zha2UuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9jbGllbnQtc3JjL21vZHVsZXMvbG9nZ2VyL1N5bmNCYWlsSG9va0Zha2UuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlKSB7XG5cblxuLyoqXG4gKiBDbGllbnQgc3R1YiBmb3IgdGFwYWJsZSBTeW5jQmFpbEhvb2tcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNsaWVudFRhcGFibGVTeW5jQmFpbEhvb2soKSB7XG4gIHJldHVybiB7XG4gICAgY2FsbDogZnVuY3Rpb24gY2FsbCgpIHt9XG4gIH07XG59O1xuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL0xvZ2dlci5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL0xvZ2dlci5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovIChmdW5jdGlvbihfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgZXhwb3J0cykge1xuXG4vKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBfbm9uSXRlcmFibGVTcHJlYWQoKTtcbn1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKHR5cGVvZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBpdGVyWyh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pLml0ZXJhdG9yXSAhPSBudWxsIHx8IGl0ZXJbXCJAQGl0ZXJhdG9yXCJdICE9IG51bGwpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShhcnIpO1xufVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHtcbiAgICBhcnIyW2ldID0gYXJyW2ldO1xuICB9XG5cbiAgcmV0dXJuIGFycjI7XG59XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgXCJwcm90b3R5cGVcIiwge1xuICAgIHdyaXRhYmxlOiBmYWxzZVxuICB9KTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxuXG52YXIgTG9nVHlwZSA9IE9iamVjdC5mcmVlemUoe1xuICBlcnJvcjpcbiAgLyoqIEB0eXBlIHtcImVycm9yXCJ9ICovXG4gIFwiZXJyb3JcIixcbiAgLy8gbWVzc2FnZSwgYyBzdHlsZSBhcmd1bWVudHNcbiAgd2FybjpcbiAgLyoqIEB0eXBlIHtcIndhcm5cIn0gKi9cbiAgXCJ3YXJuXCIsXG4gIC8vIG1lc3NhZ2UsIGMgc3R5bGUgYXJndW1lbnRzXG4gIGluZm86XG4gIC8qKiBAdHlwZSB7XCJpbmZvXCJ9ICovXG4gIFwiaW5mb1wiLFxuICAvLyBtZXNzYWdlLCBjIHN0eWxlIGFyZ3VtZW50c1xuICBsb2c6XG4gIC8qKiBAdHlwZSB7XCJsb2dcIn0gKi9cbiAgXCJsb2dcIixcbiAgLy8gbWVzc2FnZSwgYyBzdHlsZSBhcmd1bWVudHNcbiAgZGVidWc6XG4gIC8qKiBAdHlwZSB7XCJkZWJ1Z1wifSAqL1xuICBcImRlYnVnXCIsXG4gIC8vIG1lc3NhZ2UsIGMgc3R5bGUgYXJndW1lbnRzXG4gIHRyYWNlOlxuICAvKiogQHR5cGUge1widHJhY2VcIn0gKi9cbiAgXCJ0cmFjZVwiLFxuICAvLyBubyBhcmd1bWVudHNcbiAgZ3JvdXA6XG4gIC8qKiBAdHlwZSB7XCJncm91cFwifSAqL1xuICBcImdyb3VwXCIsXG4gIC8vIFtsYWJlbF1cbiAgZ3JvdXBDb2xsYXBzZWQ6XG4gIC8qKiBAdHlwZSB7XCJncm91cENvbGxhcHNlZFwifSAqL1xuICBcImdyb3VwQ29sbGFwc2VkXCIsXG4gIC8vIFtsYWJlbF1cbiAgZ3JvdXBFbmQ6XG4gIC8qKiBAdHlwZSB7XCJncm91cEVuZFwifSAqL1xuICBcImdyb3VwRW5kXCIsXG4gIC8vIFtsYWJlbF1cbiAgcHJvZmlsZTpcbiAgLyoqIEB0eXBlIHtcInByb2ZpbGVcIn0gKi9cbiAgXCJwcm9maWxlXCIsXG4gIC8vIFtwcm9maWxlTmFtZV1cbiAgcHJvZmlsZUVuZDpcbiAgLyoqIEB0eXBlIHtcInByb2ZpbGVFbmRcIn0gKi9cbiAgXCJwcm9maWxlRW5kXCIsXG4gIC8vIFtwcm9maWxlTmFtZV1cbiAgdGltZTpcbiAgLyoqIEB0eXBlIHtcInRpbWVcIn0gKi9cbiAgXCJ0aW1lXCIsXG4gIC8vIG5hbWUsIHRpbWUgYXMgW3NlY29uZHMsIG5hbm9zZWNvbmRzXVxuICBjbGVhcjpcbiAgLyoqIEB0eXBlIHtcImNsZWFyXCJ9ICovXG4gIFwiY2xlYXJcIixcbiAgLy8gbm8gYXJndW1lbnRzXG4gIHN0YXR1czpcbiAgLyoqIEB0eXBlIHtcInN0YXR1c1wifSAqL1xuICBcInN0YXR1c1wiIC8vIG1lc3NhZ2UsIGFyZ3VtZW50c1xuXG59KTtcbmV4cG9ydHMuTG9nVHlwZSA9IExvZ1R5cGU7XG4vKiogQHR5cGVkZWYge3R5cGVvZiBMb2dUeXBlW2tleW9mIHR5cGVvZiBMb2dUeXBlXX0gTG9nVHlwZUVudW0gKi9cblxudmFyIExPR19TWU1CT0wgPSAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KShcIndlYnBhY2sgbG9nZ2VyIHJhdyBsb2cgbWV0aG9kXCIpO1xudmFyIFRJTUVSU19TWU1CT0wgPSAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KShcIndlYnBhY2sgbG9nZ2VyIHRpbWVzXCIpO1xudmFyIFRJTUVSU19BR0dSRUdBVEVTX1NZTUJPTCA9ICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pKFwid2VicGFjayBsb2dnZXIgYWdncmVnYXRlZCB0aW1lc1wiKTtcblxudmFyIFdlYnBhY2tMb2dnZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICogQHBhcmFtIHtmdW5jdGlvbihMb2dUeXBlRW51bSwgYW55W109KTogdm9pZH0gbG9nIGxvZyBmdW5jdGlvblxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKHN0cmluZyB8IGZ1bmN0aW9uKCk6IHN0cmluZyk6IFdlYnBhY2tMb2dnZXJ9IGdldENoaWxkTG9nZ2VyIGZ1bmN0aW9uIHRvIGNyZWF0ZSBjaGlsZCBsb2dnZXJcbiAgICovXG4gIGZ1bmN0aW9uIFdlYnBhY2tMb2dnZXIobG9nLCBnZXRDaGlsZExvZ2dlcikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBXZWJwYWNrTG9nZ2VyKTtcblxuICAgIHRoaXNbTE9HX1NZTUJPTF0gPSBsb2c7XG4gICAgdGhpcy5nZXRDaGlsZExvZ2dlciA9IGdldENoaWxkTG9nZ2VyO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFdlYnBhY2tMb2dnZXIsIFt7XG4gICAga2V5OiBcImVycm9yXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVycm9yKCkge1xuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5lcnJvciwgYXJncyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIndhcm5cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gd2FybigpIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS53YXJuLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaW5mb1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbmZvKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjMgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4zKSwgX2tleTMgPSAwOyBfa2V5MyA8IF9sZW4zOyBfa2V5MysrKSB7XG4gICAgICAgIGFyZ3NbX2tleTNdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgICAgIH1cblxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmluZm8sIGFyZ3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJsb2dcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbG9nKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjQgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW40KSwgX2tleTQgPSAwOyBfa2V5NCA8IF9sZW40OyBfa2V5NCsrKSB7XG4gICAgICAgIGFyZ3NbX2tleTRdID0gYXJndW1lbnRzW19rZXk0XTtcbiAgICAgIH1cblxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmxvZywgYXJncyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImRlYnVnXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlYnVnKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjUgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW41KSwgX2tleTUgPSAwOyBfa2V5NSA8IF9sZW41OyBfa2V5NSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleTVdID0gYXJndW1lbnRzW19rZXk1XTtcbiAgICAgIH1cblxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmRlYnVnLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYXNzZXJ0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFzc2VydChhc3NlcnRpb24pIHtcbiAgICAgIGlmICghYXNzZXJ0aW9uKSB7XG4gICAgICAgIGZvciAodmFyIF9sZW42ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNiA+IDEgPyBfbGVuNiAtIDEgOiAwKSwgX2tleTYgPSAxOyBfa2V5NiA8IF9sZW42OyBfa2V5NisrKSB7XG4gICAgICAgICAgYXJnc1tfa2V5NiAtIDFdID0gYXJndW1lbnRzW19rZXk2XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5lcnJvciwgYXJncyk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRyYWNlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRyYWNlKCkge1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnRyYWNlLCBbXCJUcmFjZVwiXSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNsZWFyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmNsZWFyKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic3RhdHVzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN0YXR1cygpIHtcbiAgICAgIGZvciAodmFyIF9sZW43ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNyksIF9rZXk3ID0gMDsgX2tleTcgPCBfbGVuNzsgX2tleTcrKykge1xuICAgICAgICBhcmdzW19rZXk3XSA9IGFyZ3VtZW50c1tfa2V5N107XG4gICAgICB9XG5cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5zdGF0dXMsIGFyZ3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJncm91cFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBncm91cCgpIHtcbiAgICAgIGZvciAodmFyIF9sZW44ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuOCksIF9rZXk4ID0gMDsgX2tleTggPCBfbGVuODsgX2tleTgrKykge1xuICAgICAgICBhcmdzW19rZXk4XSA9IGFyZ3VtZW50c1tfa2V5OF07XG4gICAgICB9XG5cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5ncm91cCwgYXJncyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdyb3VwQ29sbGFwc2VkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdyb3VwQ29sbGFwc2VkKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjkgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW45KSwgX2tleTkgPSAwOyBfa2V5OSA8IF9sZW45OyBfa2V5OSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleTldID0gYXJndW1lbnRzW19rZXk5XTtcbiAgICAgIH1cblxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmdyb3VwQ29sbGFwc2VkLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ3JvdXBFbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ3JvdXBFbmQoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMTAgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4xMCksIF9rZXkxMCA9IDA7IF9rZXkxMCA8IF9sZW4xMDsgX2tleTEwKyspIHtcbiAgICAgICAgYXJnc1tfa2V5MTBdID0gYXJndW1lbnRzW19rZXkxMF07XG4gICAgICB9XG5cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5ncm91cEVuZCwgYXJncyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInByb2ZpbGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcHJvZmlsZShsYWJlbCkge1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnByb2ZpbGUsIFtsYWJlbF0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwcm9maWxlRW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHByb2ZpbGVFbmQobGFiZWwpIHtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5wcm9maWxlRW5kLCBbbGFiZWxdKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidGltZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0aW1lKGxhYmVsKSB7XG4gICAgICB0aGlzW1RJTUVSU19TWU1CT0xdID0gdGhpc1tUSU1FUlNfU1lNQk9MXSB8fCBuZXcgTWFwKCk7XG4gICAgICB0aGlzW1RJTUVSU19TWU1CT0xdLnNldChsYWJlbCwgcHJvY2Vzcy5ocnRpbWUoKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRpbWVMb2dcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdGltZUxvZyhsYWJlbCkge1xuICAgICAgdmFyIHByZXYgPSB0aGlzW1RJTUVSU19TWU1CT0xdICYmIHRoaXNbVElNRVJTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcblxuICAgICAgaWYgKCFwcmV2KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHN1Y2ggbGFiZWwgJ1wiLmNvbmNhdChsYWJlbCwgXCInIGZvciBXZWJwYWNrTG9nZ2VyLnRpbWVMb2coKVwiKSk7XG4gICAgICB9XG5cbiAgICAgIHZhciB0aW1lID0gcHJvY2Vzcy5ocnRpbWUocHJldik7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUudGltZSwgW2xhYmVsXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KHRpbWUpKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRpbWVFbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdGltZUVuZChsYWJlbCkge1xuICAgICAgdmFyIHByZXYgPSB0aGlzW1RJTUVSU19TWU1CT0xdICYmIHRoaXNbVElNRVJTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcblxuICAgICAgaWYgKCFwcmV2KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHN1Y2ggbGFiZWwgJ1wiLmNvbmNhdChsYWJlbCwgXCInIGZvciBXZWJwYWNrTG9nZ2VyLnRpbWVFbmQoKVwiKSk7XG4gICAgICB9XG5cbiAgICAgIHZhciB0aW1lID0gcHJvY2Vzcy5ocnRpbWUocHJldik7XG4gICAgICB0aGlzW1RJTUVSU19TWU1CT0xdLmRlbGV0ZShsYWJlbCk7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUudGltZSwgW2xhYmVsXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KHRpbWUpKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRpbWVBZ2dyZWdhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdGltZUFnZ3JlZ2F0ZShsYWJlbCkge1xuICAgICAgdmFyIHByZXYgPSB0aGlzW1RJTUVSU19TWU1CT0xdICYmIHRoaXNbVElNRVJTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcblxuICAgICAgaWYgKCFwcmV2KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHN1Y2ggbGFiZWwgJ1wiLmNvbmNhdChsYWJlbCwgXCInIGZvciBXZWJwYWNrTG9nZ2VyLnRpbWVBZ2dyZWdhdGUoKVwiKSk7XG4gICAgICB9XG5cbiAgICAgIHZhciB0aW1lID0gcHJvY2Vzcy5ocnRpbWUocHJldik7XG4gICAgICB0aGlzW1RJTUVSU19TWU1CT0xdLmRlbGV0ZShsYWJlbCk7XG4gICAgICB0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0gPSB0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0gfHwgbmV3IE1hcCgpO1xuICAgICAgdmFyIGN1cnJlbnQgPSB0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcblxuICAgICAgaWYgKGN1cnJlbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAodGltZVsxXSArIGN1cnJlbnRbMV0gPiAxZTkpIHtcbiAgICAgICAgICB0aW1lWzBdICs9IGN1cnJlbnRbMF0gKyAxO1xuICAgICAgICAgIHRpbWVbMV0gPSB0aW1lWzFdIC0gMWU5ICsgY3VycmVudFsxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aW1lWzBdICs9IGN1cnJlbnRbMF07XG4gICAgICAgICAgdGltZVsxXSArPSBjdXJyZW50WzFdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXS5zZXQobGFiZWwsIHRpbWUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0aW1lQWdncmVnYXRlRW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRpbWVBZ2dyZWdhdGVFbmQobGFiZWwpIHtcbiAgICAgIGlmICh0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0gPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgdmFyIHRpbWUgPSB0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcbiAgICAgIGlmICh0aW1lID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICAgIHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXS5kZWxldGUobGFiZWwpO1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnRpbWUsIFtsYWJlbF0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheSh0aW1lKSkpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBXZWJwYWNrTG9nZ2VyO1xufSgpO1xuXG5leHBvcnRzLkxvZ2dlciA9IFdlYnBhY2tMb2dnZXI7XG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvY3JlYXRlQ29uc29sZUxvZ2dlci5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9jcmVhdGVDb25zb2xlTG9nZ2VyLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIF9fdW51c2VkX3dlYnBhY2tfZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBfbm9uSXRlcmFibGVTcHJlYWQoKTtcbn1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKHR5cGVvZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBpdGVyWyh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pLml0ZXJhdG9yXSAhPSBudWxsIHx8IGl0ZXJbXCJAQGl0ZXJhdG9yXCJdICE9IG51bGwpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShhcnIpO1xufVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHtcbiAgICBhcnIyW2ldID0gYXJyW2ldO1xuICB9XG5cbiAgcmV0dXJuIGFycjI7XG59XG5cbnZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vTG9nZ2VyICovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9Mb2dnZXIuanNcIiksXG4gICAgTG9nVHlwZSA9IF9yZXF1aXJlLkxvZ1R5cGU7XG4vKiogQHR5cGVkZWYge2ltcG9ydChcIi4uLy4uL2RlY2xhcmF0aW9ucy9XZWJwYWNrT3B0aW9uc1wiKS5GaWx0ZXJJdGVtVHlwZXN9IEZpbHRlckl0ZW1UeXBlcyAqL1xuXG4vKiogQHR5cGVkZWYge2ltcG9ydChcIi4uLy4uL2RlY2xhcmF0aW9ucy9XZWJwYWNrT3B0aW9uc1wiKS5GaWx0ZXJUeXBlc30gRmlsdGVyVHlwZXMgKi9cblxuLyoqIEB0eXBlZGVmIHtpbXBvcnQoXCIuL0xvZ2dlclwiKS5Mb2dUeXBlRW51bX0gTG9nVHlwZUVudW0gKi9cblxuLyoqIEB0eXBlZGVmIHtmdW5jdGlvbihzdHJpbmcpOiBib29sZWFufSBGaWx0ZXJGdW5jdGlvbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IExvZ2dlckNvbnNvbGVcbiAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb24oKTogdm9pZH0gY2xlYXJcbiAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb24oKTogdm9pZH0gdHJhY2VcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSBpbmZvXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gbG9nXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gd2FyblxuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWR9IGVycm9yXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IGRlYnVnXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IGdyb3VwXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IGdyb3VwQ29sbGFwc2VkXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IGdyb3VwRW5kXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IHN0YXR1c1xuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWQ9fSBwcm9maWxlXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IHByb2ZpbGVFbmRcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gbG9nVGltZVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gTG9nZ2VyT3B0aW9uc1xuICogQHByb3BlcnR5IHtmYWxzZXx0cnVlfFwibm9uZVwifFwiZXJyb3JcInxcIndhcm5cInxcImluZm9cInxcImxvZ1wifFwidmVyYm9zZVwifSBsZXZlbCBsb2dsZXZlbFxuICogQHByb3BlcnR5IHtGaWx0ZXJUeXBlc3xib29sZWFufSBkZWJ1ZyBmaWx0ZXIgZm9yIGRlYnVnIGxvZ2dpbmdcbiAqIEBwcm9wZXJ0eSB7TG9nZ2VyQ29uc29sZX0gY29uc29sZSB0aGUgY29uc29sZSB0byBsb2cgdG9cbiAqL1xuXG4vKipcbiAqIEBwYXJhbSB7RmlsdGVySXRlbVR5cGVzfSBpdGVtIGFuIGlucHV0IGl0ZW1cbiAqIEByZXR1cm5zIHtGaWx0ZXJGdW5jdGlvbn0gZmlsdGVyIGZ1bmN0aW9uXG4gKi9cblxuXG52YXIgZmlsdGVyVG9GdW5jdGlvbiA9IGZ1bmN0aW9uIGZpbHRlclRvRnVuY3Rpb24oaXRlbSkge1xuICBpZiAodHlwZW9mIGl0ZW0gPT09IFwic3RyaW5nXCIpIHtcbiAgICB2YXIgcmVnRXhwID0gbmV3IFJlZ0V4cChcIltcXFxcXFxcXC9dXCIuY29uY2F0KGl0ZW0ucmVwbGFjZSggLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXG4gICAgL1stW1xcXXt9KCkqKz8uXFxcXF4kfF0vZywgXCJcXFxcJCZcIiksIFwiKFtcXFxcXFxcXC9dfCR8IXxcXFxcPylcIikpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoaWRlbnQpIHtcbiAgICAgIHJldHVybiByZWdFeHAudGVzdChpZGVudCk7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChpdGVtICYmIHR5cGVvZiBpdGVtID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBpdGVtLnRlc3QgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoaWRlbnQpIHtcbiAgICAgIHJldHVybiBpdGVtLnRlc3QoaWRlbnQpO1xuICAgIH07XG4gIH1cblxuICBpZiAodHlwZW9mIGl0ZW0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBpdGVtO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBpdGVtID09PSBcImJvb2xlYW5cIikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gaXRlbTtcbiAgICB9O1xuICB9XG59O1xuLyoqXG4gKiBAZW51bSB7bnVtYmVyfVxuICovXG5cblxudmFyIExvZ0xldmVsID0ge1xuICBub25lOiA2LFxuICBmYWxzZTogNixcbiAgZXJyb3I6IDUsXG4gIHdhcm46IDQsXG4gIGluZm86IDMsXG4gIGxvZzogMixcbiAgdHJ1ZTogMixcbiAgdmVyYm9zZTogMVxufTtcbi8qKlxuICogQHBhcmFtIHtMb2dnZXJPcHRpb25zfSBvcHRpb25zIG9wdGlvbnMgb2JqZWN0XG4gKiBAcmV0dXJucyB7ZnVuY3Rpb24oc3RyaW5nLCBMb2dUeXBlRW51bSwgYW55W10pOiB2b2lkfSBsb2dnaW5nIGZ1bmN0aW9uXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoX3JlZikge1xuICB2YXIgX3JlZiRsZXZlbCA9IF9yZWYubGV2ZWwsXG4gICAgICBsZXZlbCA9IF9yZWYkbGV2ZWwgPT09IHZvaWQgMCA/IFwiaW5mb1wiIDogX3JlZiRsZXZlbCxcbiAgICAgIF9yZWYkZGVidWcgPSBfcmVmLmRlYnVnLFxuICAgICAgZGVidWcgPSBfcmVmJGRlYnVnID09PSB2b2lkIDAgPyBmYWxzZSA6IF9yZWYkZGVidWcsXG4gICAgICBjb25zb2xlID0gX3JlZi5jb25zb2xlO1xuICB2YXIgZGVidWdGaWx0ZXJzID0gdHlwZW9mIGRlYnVnID09PSBcImJvb2xlYW5cIiA/IFtmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlYnVnO1xuICB9XSA6XG4gIC8qKiBAdHlwZSB7RmlsdGVySXRlbVR5cGVzW119ICovXG4gIFtdLmNvbmNhdChkZWJ1ZykubWFwKGZpbHRlclRvRnVuY3Rpb24pO1xuICAvKiogQHR5cGUge251bWJlcn0gKi9cblxuICB2YXIgbG9nbGV2ZWwgPSBMb2dMZXZlbFtcIlwiLmNvbmNhdChsZXZlbCldIHx8IDA7XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBuYW1lIG9mIHRoZSBsb2dnZXJcbiAgICogQHBhcmFtIHtMb2dUeXBlRW51bX0gdHlwZSB0eXBlIG9mIHRoZSBsb2cgZW50cnlcbiAgICogQHBhcmFtIHthbnlbXX0gYXJncyBhcmd1bWVudHMgb2YgdGhlIGxvZyBlbnRyeVxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG5cbiAgdmFyIGxvZ2dlciA9IGZ1bmN0aW9uIGxvZ2dlcihuYW1lLCB0eXBlLCBhcmdzKSB7XG4gICAgdmFyIGxhYmVsZWRBcmdzID0gZnVuY3Rpb24gbGFiZWxlZEFyZ3MoKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmdzKSkge1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPiAwICYmIHR5cGVvZiBhcmdzWzBdID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgcmV0dXJuIFtcIltcIi5jb25jYXQobmFtZSwgXCJdIFwiKS5jb25jYXQoYXJnc1swXSldLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkoYXJncy5zbGljZSgxKSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBbXCJbXCIuY29uY2F0KG5hbWUsIFwiXVwiKV0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShhcmdzKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGRlYnVnID0gZGVidWdGaWx0ZXJzLnNvbWUoZnVuY3Rpb24gKGYpIHtcbiAgICAgIHJldHVybiBmKG5hbWUpO1xuICAgIH0pO1xuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIExvZ1R5cGUuZGVidWc6XG4gICAgICAgIGlmICghZGVidWcpIHJldHVybjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5kZWJ1ZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuICAgICAgICAgIGNvbnNvbGUuZGVidWcuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS5sb2c6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcbiAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS5pbmZvOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwuaW5mbykgcmV0dXJuO1xuICAgICAgICBjb25zb2xlLmluZm8uYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS53YXJuOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwud2FybikgcmV0dXJuO1xuICAgICAgICBjb25zb2xlLndhcm4uYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS5lcnJvcjpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmVycm9yKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS50cmFjZTpcbiAgICAgICAgaWYgKCFkZWJ1ZykgcmV0dXJuO1xuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUuZ3JvdXBDb2xsYXBzZWQ6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcblxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwudmVyYm9zZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuICAgICAgICAgICAgY29uc29sZS5ncm91cENvbGxhcHNlZC5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgIC8vIGZhbGxzIHRocm91Z2hcblxuICAgICAgY2FzZSBMb2dUeXBlLmdyb3VwOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwubG9nKSByZXR1cm47IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUuZ3JvdXAgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgICBjb25zb2xlLmdyb3VwLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUuZ3JvdXBFbmQ6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5ncm91cEVuZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuICAgICAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUudGltZTpcbiAgICAgICAge1xuICAgICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcbiAgICAgICAgICB2YXIgbXMgPSBhcmdzWzFdICogMTAwMCArIGFyZ3NbMl0gLyAxMDAwMDAwO1xuICAgICAgICAgIHZhciBtc2cgPSBcIltcIi5jb25jYXQobmFtZSwgXCJdIFwiKS5jb25jYXQoYXJnc1swXSwgXCI6IFwiKS5jb25jYXQobXMsIFwiIG1zXCIpO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmxvZ1RpbWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgY29uc29sZS5sb2dUaW1lKG1zZyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgY2FzZSBMb2dUeXBlLnByb2ZpbGU6XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnByb2ZpbGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgICBjb25zb2xlLnByb2ZpbGUuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUucHJvZmlsZUVuZDpcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUucHJvZmlsZUVuZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuICAgICAgICAgIGNvbnNvbGUucHJvZmlsZUVuZC5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS5jbGVhcjpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmxvZykgcmV0dXJuOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmNsZWFyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG4gICAgICAgICAgY29uc29sZS5jbGVhcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS5zdGF0dXM6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5pbmZvKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnN0YXR1cyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLnN0YXR1cygpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLnN0YXR1cy5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoYXJncy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mby5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIExvZ1R5cGUgXCIuY29uY2F0KHR5cGUpKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxvZ2dlcjtcbn07XG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvcnVudGltZS5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9ydW50aW1lLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovIChmdW5jdGlvbihfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG5cbmZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbnZhciBTeW5jQmFpbEhvb2sgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISB0YXBhYmxlL2xpYi9TeW5jQmFpbEhvb2sgKi8gXCIuL2NsaWVudC1zcmMvbW9kdWxlcy9sb2dnZXIvU3luY0JhaWxIb29rRmFrZS5qc1wiKTtcblxudmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9Mb2dnZXIgKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL0xvZ2dlci5qc1wiKSxcbiAgICBMb2dnZXIgPSBfcmVxdWlyZS5Mb2dnZXI7XG5cbnZhciBjcmVhdGVDb25zb2xlTG9nZ2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9jcmVhdGVDb25zb2xlTG9nZ2VyICovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9jcmVhdGVDb25zb2xlTG9nZ2VyLmpzXCIpO1xuLyoqIEB0eXBlIHtjcmVhdGVDb25zb2xlTG9nZ2VyLkxvZ2dlck9wdGlvbnN9ICovXG5cblxudmFyIGN1cnJlbnREZWZhdWx0TG9nZ2VyT3B0aW9ucyA9IHtcbiAgbGV2ZWw6IFwiaW5mb1wiLFxuICBkZWJ1ZzogZmFsc2UsXG4gIGNvbnNvbGU6IGNvbnNvbGVcbn07XG52YXIgY3VycmVudERlZmF1bHRMb2dnZXIgPSBjcmVhdGVDb25zb2xlTG9nZ2VyKGN1cnJlbnREZWZhdWx0TG9nZ2VyT3B0aW9ucyk7XG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIG5hbWUgb2YgdGhlIGxvZ2dlclxuICogQHJldHVybnMge0xvZ2dlcn0gYSBsb2dnZXJcbiAqL1xuXG5leHBvcnRzLmdldExvZ2dlciA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBuZXcgTG9nZ2VyKGZ1bmN0aW9uICh0eXBlLCBhcmdzKSB7XG4gICAgaWYgKGV4cG9ydHMuaG9va3MubG9nLmNhbGwobmFtZSwgdHlwZSwgYXJncykgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY3VycmVudERlZmF1bHRMb2dnZXIobmFtZSwgdHlwZSwgYXJncyk7XG4gICAgfVxuICB9LCBmdW5jdGlvbiAoY2hpbGROYW1lKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMuZ2V0TG9nZ2VyKFwiXCIuY29uY2F0KG5hbWUsIFwiL1wiKS5jb25jYXQoY2hpbGROYW1lKSk7XG4gIH0pO1xufTtcbi8qKlxuICogQHBhcmFtIHtjcmVhdGVDb25zb2xlTG9nZ2VyLkxvZ2dlck9wdGlvbnN9IG9wdGlvbnMgbmV3IG9wdGlvbnMsIG1lcmdlIHdpdGggb2xkIG9wdGlvbnNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5cblxuZXhwb3J0cy5jb25maWd1cmVEZWZhdWx0TG9nZ2VyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgX2V4dGVuZHMoY3VycmVudERlZmF1bHRMb2dnZXJPcHRpb25zLCBvcHRpb25zKTtcblxuICBjdXJyZW50RGVmYXVsdExvZ2dlciA9IGNyZWF0ZUNvbnNvbGVMb2dnZXIoY3VycmVudERlZmF1bHRMb2dnZXJPcHRpb25zKTtcbn07XG5cbmV4cG9ydHMuaG9va3MgPSB7XG4gIGxvZzogbmV3IFN5bmNCYWlsSG9vayhbXCJvcmlnaW5cIiwgXCJ0eXBlXCIsIFwiYXJnc1wiXSlcbn07XG5cbi8qKiovIH0pXG5cbi8qKioqKiovIFx0fSk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcbi8qKioqKiovIFx0XHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcbi8qKioqKiovIFx0XHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyAqL1xuLyoqKioqKi8gXHQhZnVuY3Rpb24oKSB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcbi8qKioqKiovIFx0XHRcdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcbi8qKioqKiovIFx0XHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG4vKioqKioqLyBcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcbi8qKioqKiovIFx0XHRcdFx0fVxuLyoqKioqKi8gXHRcdFx0fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdH0oKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQgKi9cbi8qKioqKiovIFx0IWZ1bmN0aW9uKCkge1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH1cbi8qKioqKiovIFx0fSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCAqL1xuLyoqKioqKi8gXHQhZnVuY3Rpb24oKSB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbi8qKioqKiovIFx0XHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuLyoqKioqKi8gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbi8qKioqKiovIFx0XHRcdH1cbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuLy8gVGhpcyBlbnRyeSBuZWVkIHRvIGJlIHdyYXBwZWQgaW4gYW4gSUlGRSBiZWNhdXNlIGl0IG5lZWQgdG8gYmUgaXNvbGF0ZWQgYWdhaW5zdCBvdGhlciBtb2R1bGVzIGluIHRoZSBjaHVuay5cbiFmdW5jdGlvbigpIHtcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vY2xpZW50LXNyYy9tb2R1bGVzL2xvZ2dlci9pbmRleC5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBcImRlZmF1bHRcIjogZnVuY3Rpb24oKSB7IHJldHVybiAvKiByZWV4cG9ydCBkZWZhdWx0IGV4cG9ydCBmcm9tIG5hbWVkIG1vZHVsZSAqLyB3ZWJwYWNrX2xpYl9sb2dnaW5nX3J1bnRpbWVfanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXzsgfVxuLyogaGFybW9ueSBleHBvcnQgKi8gfSk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgd2VicGFja19saWJfbG9nZ2luZ19ydW50aW1lX2pzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISB3ZWJwYWNrL2xpYi9sb2dnaW5nL3J1bnRpbWUuanMgKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL3J1bnRpbWUuanNcIik7XG5cbn0oKTtcbnZhciBfX3dlYnBhY2tfZXhwb3J0X3RhcmdldF9fID0gZXhwb3J0cztcbmZvcih2YXIgaSBpbiBfX3dlYnBhY2tfZXhwb3J0c19fKSBfX3dlYnBhY2tfZXhwb3J0X3RhcmdldF9fW2ldID0gX193ZWJwYWNrX2V4cG9ydHNfX1tpXTtcbmlmKF9fd2VicGFja19leHBvcnRzX18uX19lc01vZHVsZSkgT2JqZWN0LmRlZmluZVByb3BlcnR5KF9fd2VicGFja19leHBvcnRfdGFyZ2V0X18sIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqKioqKi8gfSkoKVxuOyIsIi8qKioqKiovIChmdW5jdGlvbigpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHRcInVzZSBzdHJpY3RcIjtcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVzX18gPSAoe1xuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL3N0cmlwLWFuc2kvaW5kZXguanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9zdHJpcC1hbnNpL2luZGV4LmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoZnVuY3Rpb24oX191bnVzZWRfd2VicGFja19fX3dlYnBhY2tfbW9kdWxlX18sIF9fd2VicGFja19leHBvcnRzX18sIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5yKF9fd2VicGFja19leHBvcnRzX18pO1xuLyogaGFybW9ueSBleHBvcnQgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIHtcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgXCJkZWZhdWx0XCI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gLyogYmluZGluZyAqLyBzdHJpcEFuc2k7IH1cbi8qIGhhcm1vbnkgZXhwb3J0ICovIH0pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIGFuc2lfcmVnZXhfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIGFuc2ktcmVnZXggKi8gXCIuL25vZGVfbW9kdWxlcy9zdHJpcC1hbnNpL25vZGVfbW9kdWxlcy9hbnNpLXJlZ2V4L2luZGV4LmpzXCIpO1xuXG5mdW5jdGlvbiBzdHJpcEFuc2koc3RyaW5nKSB7XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJFeHBlY3RlZCBhIGBzdHJpbmdgLCBnb3QgYFwiLmNvbmNhdCh0eXBlb2Ygc3RyaW5nLCBcImBcIikpO1xuICB9XG5cbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKCgwLGFuc2lfcmVnZXhfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX1tcImRlZmF1bHRcIl0pKCksICcnKTtcbn1cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvc3RyaXAtYW5zaS9ub2RlX21vZHVsZXMvYW5zaS1yZWdleC9pbmRleC5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL3N0cmlwLWFuc2kvbm9kZV9tb2R1bGVzL2Fuc2ktcmVnZXgvaW5kZXguanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovIChmdW5jdGlvbihfX3VudXNlZF93ZWJwYWNrX19fd2VicGFja19tb2R1bGVfXywgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBcImRlZmF1bHRcIjogZnVuY3Rpb24oKSB7IHJldHVybiAvKiBiaW5kaW5nICovIGFuc2lSZWdleDsgfVxuLyogaGFybW9ueSBleHBvcnQgKi8gfSk7XG5mdW5jdGlvbiBhbnNpUmVnZXgoKSB7XG4gIHZhciBfcmVmID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fSxcbiAgICAgIF9yZWYkb25seUZpcnN0ID0gX3JlZi5vbmx5Rmlyc3QsXG4gICAgICBvbmx5Rmlyc3QgPSBfcmVmJG9ubHlGaXJzdCA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcmVmJG9ubHlGaXJzdDtcblxuICB2YXIgcGF0dGVybiA9IFtcIltcXFxcdTAwMUJcXFxcdTAwOUJdW1tcXFxcXSgpIzs/XSooPzooPzooPzooPzo7Wy1hLXpBLVpcXFxcZFxcXFwvIyYuOj0/JUB+X10rKSp8W2EtekEtWlxcXFxkXSsoPzo7Wy1hLXpBLVpcXFxcZFxcXFwvIyYuOj0/JUB+X10qKSopP1xcXFx1MDAwNylcIiwgJyg/Oig/OlxcXFxkezEsNH0oPzo7XFxcXGR7MCw0fSkqKT9bXFxcXGRBLVBSLVRaY2YtbnRxcnk9Pjx+XSkpJ10uam9pbignfCcpO1xuICByZXR1cm4gbmV3IFJlZ0V4cChwYXR0ZXJuLCBvbmx5Rmlyc3QgPyB1bmRlZmluZWQgOiAnZycpO1xufVxuXG4vKioqLyB9KVxuXG4vKioqKioqLyBcdH0pO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG4vKioqKioqLyBcdFx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovIFx0XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMgKi9cbi8qKioqKiovIFx0IWZ1bmN0aW9uKCkge1xuLyoqKioqKi8gXHRcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG4vKioqKioqLyBcdFx0XHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG4vKioqKioqLyBcdFx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuLyoqKioqKi8gXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG4vKioqKioqLyBcdFx0XHRcdH1cbi8qKioqKiovIFx0XHRcdH1cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHR9KCk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kICovXG4vKioqKioqLyBcdCFmdW5jdGlvbigpIHtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9XG4vKioqKioqLyBcdH0oKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QgKi9cbi8qKioqKiovIFx0IWZ1bmN0aW9uKCkge1xuLyoqKioqKi8gXHRcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4vKioqKioqLyBcdFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbi8qKioqKiovIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdH0oKTtcbi8qKioqKiovIFx0XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbi8vIFRoaXMgZW50cnkgbmVlZCB0byBiZSB3cmFwcGVkIGluIGFuIElJRkUgYmVjYXVzZSBpdCBuZWVkIHRvIGJlIGlzb2xhdGVkIGFnYWluc3Qgb3RoZXIgbW9kdWxlcyBpbiB0aGUgY2h1bmsuXG4hZnVuY3Rpb24oKSB7XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9jbGllbnQtc3JjL21vZHVsZXMvc3RyaXAtYW5zaS9pbmRleC5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yKF9fd2VicGFja19leHBvcnRzX18pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIHN0cmlwX2Fuc2lfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIHN0cmlwLWFuc2kgKi8gXCIuL25vZGVfbW9kdWxlcy9zdHJpcC1hbnNpL2luZGV4LmpzXCIpO1xuXG4vKiBoYXJtb255IGRlZmF1bHQgZXhwb3J0ICovIF9fd2VicGFja19leHBvcnRzX19bXCJkZWZhdWx0XCJdID0gKHN0cmlwX2Fuc2lfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX1tcImRlZmF1bHRcIl0pO1xufSgpO1xudmFyIF9fd2VicGFja19leHBvcnRfdGFyZ2V0X18gPSBleHBvcnRzO1xuZm9yKHZhciBpIGluIF9fd2VicGFja19leHBvcnRzX18pIF9fd2VicGFja19leHBvcnRfdGFyZ2V0X19baV0gPSBfX3dlYnBhY2tfZXhwb3J0c19fW2ldO1xuaWYoX193ZWJwYWNrX2V4cG9ydHNfXy5fX2VzTW9kdWxlKSBPYmplY3QuZGVmaW5lUHJvcGVydHkoX193ZWJwYWNrX2V4cG9ydF90YXJnZXRfXywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKioqKioqLyB9KSgpXG47IiwiLy8gVGhlIGVycm9yIG92ZXJsYXkgaXMgaW5zcGlyZWQgKGFuZCBtb3N0bHkgY29waWVkKSBmcm9tIENyZWF0ZSBSZWFjdCBBcHAgKGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9va2luY3ViYXRvci9jcmVhdGUtcmVhY3QtYXBwKVxuLy8gVGhleSwgaW4gdHVybiwgZ290IGluc3BpcmVkIGJ5IHdlYnBhY2staG90LW1pZGRsZXdhcmUgKGh0dHBzOi8vZ2l0aHViLmNvbS9nbGVuamFtaW4vd2VicGFjay1ob3QtbWlkZGxld2FyZSkuXG5pbXBvcnQgYW5zaUhUTUwgZnJvbSBcImFuc2ktaHRtbC1jb21tdW5pdHlcIjtcbmltcG9ydCB7IGVuY29kZSB9IGZyb20gXCJodG1sLWVudGl0aWVzXCI7XG52YXIgY29sb3JzID0ge1xuICByZXNldDogW1widHJhbnNwYXJlbnRcIiwgXCJ0cmFuc3BhcmVudFwiXSxcbiAgYmxhY2s6IFwiMTgxODE4XCIsXG4gIHJlZDogXCJFMzYwNDlcIixcbiAgZ3JlZW46IFwiQjNDQjc0XCIsXG4gIHllbGxvdzogXCJGRkQwODBcIixcbiAgYmx1ZTogXCI3Q0FGQzJcIixcbiAgbWFnZW50YTogXCI3RkFDQ0FcIixcbiAgY3lhbjogXCJDM0MyRUZcIixcbiAgbGlnaHRncmV5OiBcIkVCRTdFM1wiLFxuICBkYXJrZ3JleTogXCI2RDc4OTFcIlxufTtcbi8qKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnQgfCBudWxsIHwgdW5kZWZpbmVkfSAqL1xuXG52YXIgaWZyYW1lQ29udGFpbmVyRWxlbWVudDtcbi8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnQgfCBudWxsIHwgdW5kZWZpbmVkfSAqL1xuXG52YXIgY29udGFpbmVyRWxlbWVudDtcbi8qKiBAdHlwZSB7QXJyYXk8KGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50KSA9PiB2b2lkPn0gKi9cblxudmFyIG9uTG9hZFF1ZXVlID0gW107XG5hbnNpSFRNTC5zZXRDb2xvcnMoY29sb3JzKTtcblxuZnVuY3Rpb24gY3JlYXRlQ29udGFpbmVyKCkge1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlmcmFtZVwiKTtcbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5pZCA9IFwid2VicGFjay1kZXYtc2VydmVyLWNsaWVudC1vdmVybGF5XCI7XG4gIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuc3JjID0gXCJhYm91dDpibGFua1wiO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnN0eWxlLmxlZnQgPSAwO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnN0eWxlLnRvcCA9IDA7XG4gIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuc3R5bGUucmlnaHQgPSAwO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnN0eWxlLmJvdHRvbSA9IDA7XG4gIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuc3R5bGUud2lkdGggPSBcIjEwMHZ3XCI7XG4gIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gXCIxMDB2aFwiO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnN0eWxlLmJvcmRlciA9IFwibm9uZVwiO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnN0eWxlLnpJbmRleCA9IDk5OTk5OTk5OTk7XG5cbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29udGFpbmVyRWxlbWVudCA9XG4gICAgLyoqIEB0eXBlIHtEb2N1bWVudH0gKi9cblxuICAgIC8qKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnR9ICovXG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5jb250ZW50RG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb250YWluZXJFbGVtZW50LmlkID0gXCJ3ZWJwYWNrLWRldi1zZXJ2ZXItY2xpZW50LW92ZXJsYXktZGl2XCI7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLmJveFNpemluZyA9IFwiYm9yZGVyLWJveFwiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUubGVmdCA9IDA7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS50b3AgPSAwO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUucmlnaHQgPSAwO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUuYm90dG9tID0gMDtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLndpZHRoID0gXCIxMDB2d1wiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gXCIxMDB2aFwiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsIDAsIDAsIDAuODUpXCI7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS5jb2xvciA9IFwiI0U4RThFOFwiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUuZm9udEZhbWlseSA9IFwiTWVubG8sIENvbnNvbGFzLCBtb25vc3BhY2VcIjtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLmZvbnRTaXplID0gXCJsYXJnZVwiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUucGFkZGluZyA9IFwiMnJlbVwiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUubGluZUhlaWdodCA9IFwiMS4yXCI7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS53aGl0ZVNwYWNlID0gXCJwcmUtd3JhcFwiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSBcImF1dG9cIjtcbiAgICB2YXIgaGVhZGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIGhlYWRlckVsZW1lbnQuaW5uZXJUZXh0ID0gXCJDb21waWxlZCB3aXRoIHByb2JsZW1zOlwiO1xuICAgIHZhciBjbG9zZUJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGNsb3NlQnV0dG9uRWxlbWVudC5pbm5lclRleHQgPSBcIlhcIjtcbiAgICBjbG9zZUJ1dHRvbkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZCA9IFwidHJhbnNwYXJlbnRcIjtcbiAgICBjbG9zZUJ1dHRvbkVsZW1lbnQuc3R5bGUuYm9yZGVyID0gXCJub25lXCI7XG4gICAgY2xvc2VCdXR0b25FbGVtZW50LnN0eWxlLmZvbnRTaXplID0gXCIyMHB4XCI7XG4gICAgY2xvc2VCdXR0b25FbGVtZW50LnN0eWxlLmZvbnRXZWlnaHQgPSBcImJvbGRcIjtcbiAgICBjbG9zZUJ1dHRvbkVsZW1lbnQuc3R5bGUuY29sb3IgPSBcIndoaXRlXCI7XG4gICAgY2xvc2VCdXR0b25FbGVtZW50LnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgIGNsb3NlQnV0dG9uRWxlbWVudC5zdHlsZS5jc3NGbG9hdCA9IFwicmlnaHRcIjsgLy8gQHRzLWlnbm9yZVxuXG4gICAgY2xvc2VCdXR0b25FbGVtZW50LnN0eWxlLnN0eWxlRmxvYXQgPSBcInJpZ2h0XCI7XG4gICAgY2xvc2VCdXR0b25FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBoaWRlKCk7XG4gICAgfSk7XG4gICAgY29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChoZWFkZXJFbGVtZW50KTtcbiAgICBjb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uRWxlbWVudCk7XG4gICAgY29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIikpO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKTtcbiAgICAvKiogQHR5cGUge0RvY3VtZW50fSAqL1xuXG4gICAgLyoqIEB0eXBlIHtIVE1MSUZyYW1lRWxlbWVudH0gKi9cbiAgICBpZnJhbWVDb250YWluZXJFbGVtZW50LmNvbnRlbnREb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lckVsZW1lbnQpO1xuICAgIG9uTG9hZFF1ZXVlLmZvckVhY2goZnVuY3Rpb24gKG9uTG9hZCkge1xuICAgICAgb25Mb2FkKFxuICAgICAgLyoqIEB0eXBlIHtIVE1MRGl2RWxlbWVudH0gKi9cbiAgICAgIGNvbnRhaW5lckVsZW1lbnQpO1xuICAgIH0pO1xuICAgIG9uTG9hZFF1ZXVlID0gW107XG4gICAgLyoqIEB0eXBlIHtIVE1MSUZyYW1lRWxlbWVudH0gKi9cblxuICAgIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQub25sb2FkID0gbnVsbDtcbiAgfTtcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlmcmFtZUNvbnRhaW5lckVsZW1lbnQpO1xufVxuLyoqXG4gKiBAcGFyYW0geyhlbGVtZW50OiBIVE1MRGl2RWxlbWVudCkgPT4gdm9pZH0gY2FsbGJhY2tcbiAqL1xuXG5cbmZ1bmN0aW9uIGVuc3VyZU92ZXJsYXlFeGlzdHMoY2FsbGJhY2spIHtcbiAgaWYgKGNvbnRhaW5lckVsZW1lbnQpIHtcbiAgICAvLyBFdmVyeXRoaW5nIGlzIHJlYWR5LCBjYWxsIHRoZSBjYWxsYmFjayByaWdodCBhd2F5LlxuICAgIGNhbGxiYWNrKGNvbnRhaW5lckVsZW1lbnQpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIG9uTG9hZFF1ZXVlLnB1c2goY2FsbGJhY2spO1xuXG4gIGlmIChpZnJhbWVDb250YWluZXJFbGVtZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY3JlYXRlQ29udGFpbmVyKCk7XG59IC8vIFN1Y2Nlc3NmdWwgY29tcGlsYXRpb24uXG5cblxuZnVuY3Rpb24gaGlkZSgpIHtcbiAgaWYgKCFpZnJhbWVDb250YWluZXJFbGVtZW50KSB7XG4gICAgcmV0dXJuO1xuICB9IC8vIENsZWFuIHVwIGFuZCByZXNldCBpbnRlcm5hbCBzdGF0ZS5cblxuXG4gIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoaWZyYW1lQ29udGFpbmVyRWxlbWVudCk7XG4gIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQgPSBudWxsO1xuICBjb250YWluZXJFbGVtZW50ID0gbnVsbDtcbn1cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7c3RyaW5nICB8IHsgZmlsZT86IHN0cmluZywgbW9kdWxlTmFtZT86IHN0cmluZywgbG9jPzogc3RyaW5nLCBtZXNzYWdlPzogc3RyaW5nIH19IGl0ZW1cbiAqIEByZXR1cm5zIHt7IGhlYWRlcjogc3RyaW5nLCBib2R5OiBzdHJpbmcgfX1cbiAqL1xuXG5cbmZ1bmN0aW9uIGZvcm1hdFByb2JsZW0odHlwZSwgaXRlbSkge1xuICB2YXIgaGVhZGVyID0gdHlwZSA9PT0gXCJ3YXJuaW5nXCIgPyBcIldBUk5JTkdcIiA6IFwiRVJST1JcIjtcbiAgdmFyIGJvZHkgPSBcIlwiO1xuXG4gIGlmICh0eXBlb2YgaXRlbSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGJvZHkgKz0gaXRlbTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZmlsZSA9IGl0ZW0uZmlsZSB8fCBcIlwiOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVzdGVkLXRlcm5hcnlcblxuICAgIHZhciBtb2R1bGVOYW1lID0gaXRlbS5tb2R1bGVOYW1lID8gaXRlbS5tb2R1bGVOYW1lLmluZGV4T2YoXCIhXCIpICE9PSAtMSA/IFwiXCIuY29uY2F0KGl0ZW0ubW9kdWxlTmFtZS5yZXBsYWNlKC9eKFxcc3xcXFMpKiEvLCBcIlwiKSwgXCIgKFwiKS5jb25jYXQoaXRlbS5tb2R1bGVOYW1lLCBcIilcIikgOiBcIlwiLmNvbmNhdChpdGVtLm1vZHVsZU5hbWUpIDogXCJcIjtcbiAgICB2YXIgbG9jID0gaXRlbS5sb2M7XG4gICAgaGVhZGVyICs9IFwiXCIuY29uY2F0KG1vZHVsZU5hbWUgfHwgZmlsZSA/IFwiIGluIFwiLmNvbmNhdChtb2R1bGVOYW1lID8gXCJcIi5jb25jYXQobW9kdWxlTmFtZSkuY29uY2F0KGZpbGUgPyBcIiAoXCIuY29uY2F0KGZpbGUsIFwiKVwiKSA6IFwiXCIpIDogZmlsZSkuY29uY2F0KGxvYyA/IFwiIFwiLmNvbmNhdChsb2MpIDogXCJcIikgOiBcIlwiKTtcbiAgICBib2R5ICs9IGl0ZW0ubWVzc2FnZSB8fCBcIlwiO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBoZWFkZXI6IGhlYWRlcixcbiAgICBib2R5OiBib2R5XG4gIH07XG59IC8vIENvbXBpbGF0aW9uIHdpdGggZXJyb3JzIChlLmcuIHN5bnRheCBlcnJvciBvciBtaXNzaW5nIG1vZHVsZXMpLlxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0FycmF5PHN0cmluZyAgfCB7IGZpbGU/OiBzdHJpbmcsIG1vZHVsZU5hbWU/OiBzdHJpbmcsIGxvYz86IHN0cmluZywgbWVzc2FnZT86IHN0cmluZyB9Pn0gbWVzc2FnZXNcbiAqL1xuXG5cbmZ1bmN0aW9uIHNob3codHlwZSwgbWVzc2FnZXMpIHtcbiAgZW5zdXJlT3ZlcmxheUV4aXN0cyhmdW5jdGlvbiAoKSB7XG4gICAgbWVzc2FnZXMuZm9yRWFjaChmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgdmFyIGVudHJ5RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB2YXIgdHlwZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblxuICAgICAgdmFyIF9mb3JtYXRQcm9ibGVtID0gZm9ybWF0UHJvYmxlbSh0eXBlLCBtZXNzYWdlKSxcbiAgICAgICAgICBoZWFkZXIgPSBfZm9ybWF0UHJvYmxlbS5oZWFkZXIsXG4gICAgICAgICAgYm9keSA9IF9mb3JtYXRQcm9ibGVtLmJvZHk7XG5cbiAgICAgIHR5cGVFbGVtZW50LmlubmVyVGV4dCA9IGhlYWRlcjtcbiAgICAgIHR5cGVFbGVtZW50LnN0eWxlLmNvbG9yID0gXCIjXCIuY29uY2F0KGNvbG9ycy5yZWQpOyAvLyBNYWtlIGl0IGxvb2sgc2ltaWxhciB0byBvdXIgdGVybWluYWwuXG5cbiAgICAgIHZhciB0ZXh0ID0gYW5zaUhUTUwoZW5jb2RlKGJvZHkpKTtcbiAgICAgIHZhciBtZXNzYWdlVGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgbWVzc2FnZVRleHROb2RlLmlubmVySFRNTCA9IHRleHQ7XG4gICAgICBlbnRyeUVsZW1lbnQuYXBwZW5kQ2hpbGQodHlwZUVsZW1lbnQpO1xuICAgICAgZW50cnlFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gICAgICBlbnRyeUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKTtcbiAgICAgIGVudHJ5RWxlbWVudC5hcHBlbmRDaGlsZChtZXNzYWdlVGV4dE5vZGUpO1xuICAgICAgZW50cnlFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gICAgICBlbnRyeUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKTtcbiAgICAgIC8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9ICovXG5cbiAgICAgIGNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQoZW50cnlFbGVtZW50KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IGZvcm1hdFByb2JsZW0sIHNob3csIGhpZGUgfTsiLCIvKiBnbG9iYWwgX193ZWJwYWNrX2Rldl9zZXJ2ZXJfY2xpZW50X18gKi9cbmltcG9ydCBXZWJTb2NrZXRDbGllbnQgZnJvbSBcIi4vY2xpZW50cy9XZWJTb2NrZXRDbGllbnQuanNcIjtcbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuL3V0aWxzL2xvZy5qc1wiOyAvLyB0aGlzIFdlYnNvY2tldENsaWVudCBpcyBoZXJlIGFzIGEgZGVmYXVsdCBmYWxsYmFjaywgaW4gY2FzZSB0aGUgY2xpZW50IGlzIG5vdCBpbmplY3RlZFxuXG4vKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cblxudmFyIENsaWVudCA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXN0ZWQtdGVybmFyeVxudHlwZW9mIF9fd2VicGFja19kZXZfc2VydmVyX2NsaWVudF9fICE9PSBcInVuZGVmaW5lZFwiID8gdHlwZW9mIF9fd2VicGFja19kZXZfc2VydmVyX2NsaWVudF9fLmRlZmF1bHQgIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXy5kZWZhdWx0IDogX193ZWJwYWNrX2Rldl9zZXJ2ZXJfY2xpZW50X18gOiBXZWJTb2NrZXRDbGllbnQ7XG4vKiBlc2xpbnQtZW5hYmxlIGNhbWVsY2FzZSAqL1xuXG52YXIgcmV0cmllcyA9IDA7XG52YXIgbWF4UmV0cmllcyA9IDEwO1xudmFyIGNsaWVudCA9IG51bGw7XG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7eyBbaGFuZGxlcjogc3RyaW5nXTogKGRhdGE/OiBhbnksIHBhcmFtcz86IGFueSkgPT4gYW55IH19IGhhbmRsZXJzXG4gKiBAcGFyYW0ge251bWJlcn0gW3JlY29ubmVjdF1cbiAqL1xuXG52YXIgc29ja2V0ID0gZnVuY3Rpb24gaW5pdFNvY2tldCh1cmwsIGhhbmRsZXJzLCByZWNvbm5lY3QpIHtcbiAgY2xpZW50ID0gbmV3IENsaWVudCh1cmwpO1xuICBjbGllbnQub25PcGVuKGZ1bmN0aW9uICgpIHtcbiAgICByZXRyaWVzID0gMDtcblxuICAgIGlmICh0eXBlb2YgcmVjb25uZWN0ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBtYXhSZXRyaWVzID0gcmVjb25uZWN0O1xuICAgIH1cbiAgfSk7XG4gIGNsaWVudC5vbkNsb3NlKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAocmV0cmllcyA9PT0gMCkge1xuICAgICAgaGFuZGxlcnMuY2xvc2UoKTtcbiAgICB9IC8vIFRyeSB0byByZWNvbm5lY3QuXG5cblxuICAgIGNsaWVudCA9IG51bGw7IC8vIEFmdGVyIDEwIHJldHJpZXMgc3RvcCB0cnlpbmcsIHRvIHByZXZlbnQgbG9nc3BhbS5cblxuICAgIGlmIChyZXRyaWVzIDwgbWF4UmV0cmllcykge1xuICAgICAgLy8gRXhwb25lbnRpYWxseSBpbmNyZWFzZSB0aW1lb3V0IHRvIHJlY29ubmVjdC5cbiAgICAgIC8vIFJlc3BlY3RmdWxseSBjb3BpZWQgZnJvbSB0aGUgcGFja2FnZSBgZ290YC5cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXByb3BlcnRpZXNcbiAgICAgIHZhciByZXRyeUluTXMgPSAxMDAwICogTWF0aC5wb3coMiwgcmV0cmllcykgKyBNYXRoLnJhbmRvbSgpICogMTAwO1xuICAgICAgcmV0cmllcyArPSAxO1xuICAgICAgbG9nLmluZm8oXCJUcnlpbmcgdG8gcmVjb25uZWN0Li4uXCIpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNvY2tldCh1cmwsIGhhbmRsZXJzLCByZWNvbm5lY3QpO1xuICAgICAgfSwgcmV0cnlJbk1zKTtcbiAgICB9XG4gIH0pO1xuICBjbGllbnQub25NZXNzYWdlKFxuICAvKipcbiAgICogQHBhcmFtIHthbnl9IGRhdGFcbiAgICovXG4gIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdmFyIG1lc3NhZ2UgPSBKU09OLnBhcnNlKGRhdGEpO1xuXG4gICAgaWYgKGhhbmRsZXJzW21lc3NhZ2UudHlwZV0pIHtcbiAgICAgIGhhbmRsZXJzW21lc3NhZ2UudHlwZV0obWVzc2FnZS5kYXRhLCBtZXNzYWdlLnBhcmFtcyk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNvY2tldDsiLCIvKipcbiAqIEBwYXJhbSB7eyBwcm90b2NvbD86IHN0cmluZywgYXV0aD86IHN0cmluZywgaG9zdG5hbWU/OiBzdHJpbmcsIHBvcnQ/OiBzdHJpbmcsIHBhdGhuYW1lPzogc3RyaW5nLCBzZWFyY2g/OiBzdHJpbmcsIGhhc2g/OiBzdHJpbmcsIHNsYXNoZXM/OiBib29sZWFuIH19IG9ialVSTFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZm9ybWF0KG9ialVSTCkge1xuICB2YXIgcHJvdG9jb2wgPSBvYmpVUkwucHJvdG9jb2wgfHwgXCJcIjtcblxuICBpZiAocHJvdG9jb2wgJiYgcHJvdG9jb2wuc3Vic3RyKC0xKSAhPT0gXCI6XCIpIHtcbiAgICBwcm90b2NvbCArPSBcIjpcIjtcbiAgfVxuXG4gIHZhciBhdXRoID0gb2JqVVJMLmF1dGggfHwgXCJcIjtcblxuICBpZiAoYXV0aCkge1xuICAgIGF1dGggPSBlbmNvZGVVUklDb21wb25lbnQoYXV0aCk7XG4gICAgYXV0aCA9IGF1dGgucmVwbGFjZSgvJTNBL2ksIFwiOlwiKTtcbiAgICBhdXRoICs9IFwiQFwiO1xuICB9XG5cbiAgdmFyIGhvc3QgPSBcIlwiO1xuXG4gIGlmIChvYmpVUkwuaG9zdG5hbWUpIHtcbiAgICBob3N0ID0gYXV0aCArIChvYmpVUkwuaG9zdG5hbWUuaW5kZXhPZihcIjpcIikgPT09IC0xID8gb2JqVVJMLmhvc3RuYW1lIDogXCJbXCIuY29uY2F0KG9ialVSTC5ob3N0bmFtZSwgXCJdXCIpKTtcblxuICAgIGlmIChvYmpVUkwucG9ydCkge1xuICAgICAgaG9zdCArPSBcIjpcIi5jb25jYXQob2JqVVJMLnBvcnQpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBwYXRobmFtZSA9IG9ialVSTC5wYXRobmFtZSB8fCBcIlwiO1xuXG4gIGlmIChvYmpVUkwuc2xhc2hlcykge1xuICAgIGhvc3QgPSBcIi8vXCIuY29uY2F0KGhvc3QgfHwgXCJcIik7XG5cbiAgICBpZiAocGF0aG5hbWUgJiYgcGF0aG5hbWUuY2hhckF0KDApICE9PSBcIi9cIikge1xuICAgICAgcGF0aG5hbWUgPSBcIi9cIi5jb25jYXQocGF0aG5hbWUpO1xuICAgIH1cbiAgfSBlbHNlIGlmICghaG9zdCkge1xuICAgIGhvc3QgPSBcIlwiO1xuICB9XG5cbiAgdmFyIHNlYXJjaCA9IG9ialVSTC5zZWFyY2ggfHwgXCJcIjtcblxuICBpZiAoc2VhcmNoICYmIHNlYXJjaC5jaGFyQXQoMCkgIT09IFwiP1wiKSB7XG4gICAgc2VhcmNoID0gXCI/XCIuY29uY2F0KHNlYXJjaCk7XG4gIH1cblxuICB2YXIgaGFzaCA9IG9ialVSTC5oYXNoIHx8IFwiXCI7XG5cbiAgaWYgKGhhc2ggJiYgaGFzaC5jaGFyQXQoMCkgIT09IFwiI1wiKSB7XG4gICAgaGFzaCA9IFwiI1wiLmNvbmNhdChoYXNoKTtcbiAgfVxuXG4gIHBhdGhuYW1lID0gcGF0aG5hbWUucmVwbGFjZSgvWz8jXS9nLFxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1hdGNoXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KG1hdGNoKTtcbiAgfSk7XG4gIHNlYXJjaCA9IHNlYXJjaC5yZXBsYWNlKFwiI1wiLCBcIiUyM1wiKTtcbiAgcmV0dXJuIFwiXCIuY29uY2F0KHByb3RvY29sKS5jb25jYXQoaG9zdCkuY29uY2F0KHBhdGhuYW1lKS5jb25jYXQoc2VhcmNoKS5jb25jYXQoaGFzaCk7XG59XG4vKipcbiAqIEBwYXJhbSB7VVJMICYgeyBmcm9tQ3VycmVudFNjcmlwdD86IGJvb2xlYW4gfX0gcGFyc2VkVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5cblxuZnVuY3Rpb24gY3JlYXRlU29ja2V0VVJMKHBhcnNlZFVSTCkge1xuICB2YXIgaG9zdG5hbWUgPSBwYXJzZWRVUkwuaG9zdG5hbWU7IC8vIE5vZGUuanMgbW9kdWxlIHBhcnNlcyBpdCBhcyBgOjpgXG4gIC8vIGBuZXcgVVJMKHVybFN0cmluZywgW2Jhc2VVUkxTdHJpbmddKWAgcGFyc2VzIGl0IGFzICdbOjpdJ1xuXG4gIHZhciBpc0luQWRkckFueSA9IGhvc3RuYW1lID09PSBcIjAuMC4wLjBcIiB8fCBob3N0bmFtZSA9PT0gXCI6OlwiIHx8IGhvc3RuYW1lID09PSBcIls6Ol1cIjsgLy8gd2h5IGRvIHdlIG5lZWQgdGhpcyBjaGVjaz9cbiAgLy8gaG9zdG5hbWUgbi9hIGZvciBmaWxlIHByb3RvY29sIChleGFtcGxlLCB3aGVuIHVzaW5nIGVsZWN0cm9uLCBpb25pYylcbiAgLy8gc2VlOiBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay93ZWJwYWNrLWRldi1zZXJ2ZXIvcHVsbC8zODRcblxuICBpZiAoaXNJbkFkZHJBbnkgJiYgc2VsZi5sb2NhdGlvbi5ob3N0bmFtZSAmJiBzZWxmLmxvY2F0aW9uLnByb3RvY29sLmluZGV4T2YoXCJodHRwXCIpID09PSAwKSB7XG4gICAgaG9zdG5hbWUgPSBzZWxmLmxvY2F0aW9uLmhvc3RuYW1lO1xuICB9XG5cbiAgdmFyIHNvY2tldFVSTFByb3RvY29sID0gcGFyc2VkVVJMLnByb3RvY29sIHx8IHNlbGYubG9jYXRpb24ucHJvdG9jb2w7IC8vIFdoZW4gaHR0cHMgaXMgdXNlZCBpbiB0aGUgYXBwLCBzZWN1cmUgd2ViIHNvY2tldHMgYXJlIGFsd2F5cyBuZWNlc3NhcnkgYmVjYXVzZSB0aGUgYnJvd3NlciBkb2Vzbid0IGFjY2VwdCBub24tc2VjdXJlIHdlYiBzb2NrZXRzLlxuXG4gIGlmIChzb2NrZXRVUkxQcm90b2NvbCA9PT0gXCJhdXRvOlwiIHx8IGhvc3RuYW1lICYmIGlzSW5BZGRyQW55ICYmIHNlbGYubG9jYXRpb24ucHJvdG9jb2wgPT09IFwiaHR0cHM6XCIpIHtcbiAgICBzb2NrZXRVUkxQcm90b2NvbCA9IHNlbGYubG9jYXRpb24ucHJvdG9jb2w7XG4gIH1cblxuICBzb2NrZXRVUkxQcm90b2NvbCA9IHNvY2tldFVSTFByb3RvY29sLnJlcGxhY2UoL14oPzpodHRwfC4rLWV4dGVuc2lvbnxmaWxlKS9pLCBcIndzXCIpO1xuICB2YXIgc29ja2V0VVJMQXV0aCA9IFwiXCI7IC8vIGBuZXcgVVJMKHVybFN0cmluZywgW2Jhc2VVUkxzdHJpbmddKWAgZG9lc24ndCBoYXZlIGBhdXRoYCBwcm9wZXJ0eVxuICAvLyBQYXJzZSBhdXRoZW50aWNhdGlvbiBjcmVkZW50aWFscyBpbiBjYXNlIHdlIG5lZWQgdGhlbVxuXG4gIGlmIChwYXJzZWRVUkwudXNlcm5hbWUpIHtcbiAgICBzb2NrZXRVUkxBdXRoID0gcGFyc2VkVVJMLnVzZXJuYW1lOyAvLyBTaW5jZSBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uIGRvZXMgbm90IGFsbG93IGVtcHR5IHVzZXJuYW1lLFxuICAgIC8vIHdlIG9ubHkgaW5jbHVkZSBwYXNzd29yZCBpZiB0aGUgdXNlcm5hbWUgaXMgbm90IGVtcHR5LlxuXG4gICAgaWYgKHBhcnNlZFVSTC5wYXNzd29yZCkge1xuICAgICAgLy8gUmVzdWx0OiA8dXNlcm5hbWU+OjxwYXNzd29yZD5cbiAgICAgIHNvY2tldFVSTEF1dGggPSBzb2NrZXRVUkxBdXRoLmNvbmNhdChcIjpcIiwgcGFyc2VkVVJMLnBhc3N3b3JkKTtcbiAgICB9XG4gIH0gLy8gSW4gY2FzZSB0aGUgaG9zdCBpcyBhIHJhdyBJUHY2IGFkZHJlc3MsIGl0IGNhbiBiZSBlbmNsb3NlZCBpblxuICAvLyB0aGUgYnJhY2tldHMgYXMgdGhlIGJyYWNrZXRzIGFyZSBuZWVkZWQgaW4gdGhlIGZpbmFsIFVSTCBzdHJpbmcuXG4gIC8vIE5lZWQgdG8gcmVtb3ZlIHRob3NlIGFzIHVybC5mb3JtYXQgYmxpbmRseSBhZGRzIGl0cyBvd24gc2V0IG9mIGJyYWNrZXRzXG4gIC8vIGlmIHRoZSBob3N0IHN0cmluZyBjb250YWlucyBjb2xvbnMuIFRoYXQgd291bGQgbGVhZCB0byBub24td29ya2luZ1xuICAvLyBkb3VibGUgYnJhY2tldHMgKGUuZy4gW1s6Ol1dKSBob3N0XG4gIC8vXG4gIC8vIEFsbCBvZiB0aGVzZSB3ZWIgc29ja2V0IHVybCBwYXJhbXMgYXJlIG9wdGlvbmFsbHkgcGFzc2VkIGluIHRocm91Z2ggcmVzb3VyY2VRdWVyeSxcbiAgLy8gc28gd2UgbmVlZCB0byBmYWxsIGJhY2sgdG8gdGhlIGRlZmF1bHQgaWYgdGhleSBhcmUgbm90IHByb3ZpZGVkXG5cblxuICB2YXIgc29ja2V0VVJMSG9zdG5hbWUgPSAoaG9zdG5hbWUgfHwgc2VsZi5sb2NhdGlvbi5ob3N0bmFtZSB8fCBcImxvY2FsaG9zdFwiKS5yZXBsYWNlKC9eXFxbKC4qKVxcXSQvLCBcIiQxXCIpO1xuICB2YXIgc29ja2V0VVJMUG9ydCA9IHBhcnNlZFVSTC5wb3J0O1xuXG4gIGlmICghc29ja2V0VVJMUG9ydCB8fCBzb2NrZXRVUkxQb3J0ID09PSBcIjBcIikge1xuICAgIHNvY2tldFVSTFBvcnQgPSBzZWxmLmxvY2F0aW9uLnBvcnQ7XG4gIH0gLy8gSWYgcGF0aCBpcyBwcm92aWRlZCBpdCdsbCBiZSBwYXNzZWQgaW4gdmlhIHRoZSByZXNvdXJjZVF1ZXJ5IGFzIGFcbiAgLy8gcXVlcnkgcGFyYW0gc28gaXQgaGFzIHRvIGJlIHBhcnNlZCBvdXQgb2YgdGhlIHF1ZXJ5c3RyaW5nIGluIG9yZGVyIGZvciB0aGVcbiAgLy8gY2xpZW50IHRvIG9wZW4gdGhlIHNvY2tldCB0byB0aGUgY29ycmVjdCBsb2NhdGlvbi5cblxuXG4gIHZhciBzb2NrZXRVUkxQYXRobmFtZSA9IFwiL3dzXCI7XG5cbiAgaWYgKHBhcnNlZFVSTC5wYXRobmFtZSAmJiAhcGFyc2VkVVJMLmZyb21DdXJyZW50U2NyaXB0KSB7XG4gICAgc29ja2V0VVJMUGF0aG5hbWUgPSBwYXJzZWRVUkwucGF0aG5hbWU7XG4gIH1cblxuICByZXR1cm4gZm9ybWF0KHtcbiAgICBwcm90b2NvbDogc29ja2V0VVJMUHJvdG9jb2wsXG4gICAgYXV0aDogc29ja2V0VVJMQXV0aCxcbiAgICBob3N0bmFtZTogc29ja2V0VVJMSG9zdG5hbWUsXG4gICAgcG9ydDogc29ja2V0VVJMUG9ydCxcbiAgICBwYXRobmFtZTogc29ja2V0VVJMUGF0aG5hbWUsXG4gICAgc2xhc2hlczogdHJ1ZVxuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU29ja2V0VVJMOyIsIi8qKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0Q3VycmVudFNjcmlwdFNvdXJjZSgpIHtcbiAgLy8gYGRvY3VtZW50LmN1cnJlbnRTY3JpcHRgIGlzIHRoZSBtb3N0IGFjY3VyYXRlIHdheSB0byBmaW5kIHRoZSBjdXJyZW50IHNjcmlwdCxcbiAgLy8gYnV0IGlzIG5vdCBzdXBwb3J0ZWQgaW4gYWxsIGJyb3dzZXJzLlxuICBpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jdXJyZW50U2NyaXB0LmdldEF0dHJpYnV0ZShcInNyY1wiKTtcbiAgfSAvLyBGYWxsYmFjayB0byBnZXR0aW5nIGFsbCBzY3JpcHRzIHJ1bm5pbmcgaW4gdGhlIGRvY3VtZW50LlxuXG5cbiAgdmFyIHNjcmlwdEVsZW1lbnRzID0gZG9jdW1lbnQuc2NyaXB0cyB8fCBbXTtcbiAgdmFyIHNjcmlwdEVsZW1lbnRzV2l0aFNyYyA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChzY3JpcHRFbGVtZW50cywgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJzcmNcIik7XG4gIH0pO1xuXG4gIGlmIChzY3JpcHRFbGVtZW50c1dpdGhTcmMubGVuZ3RoID4gMCkge1xuICAgIHZhciBjdXJyZW50U2NyaXB0ID0gc2NyaXB0RWxlbWVudHNXaXRoU3JjW3NjcmlwdEVsZW1lbnRzV2l0aFNyYy5sZW5ndGggLSAxXTtcbiAgICByZXR1cm4gY3VycmVudFNjcmlwdC5nZXRBdHRyaWJ1dGUoXCJzcmNcIik7XG4gIH0gLy8gRmFpbCBhcyB0aGVyZSB3YXMgbm8gc2NyaXB0IHRvIHVzZS5cblxuXG4gIHRocm93IG5ldyBFcnJvcihcIlt3ZWJwYWNrLWRldi1zZXJ2ZXJdIEZhaWxlZCB0byBnZXQgY3VycmVudCBzY3JpcHQgc291cmNlLlwiKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0Q3VycmVudFNjcmlwdFNvdXJjZTsiLCJpbXBvcnQgbG9nZ2VyIGZyb20gXCIuLi9tb2R1bGVzL2xvZ2dlci9pbmRleC5qc1wiO1xudmFyIG5hbWUgPSBcIndlYnBhY2stZGV2LXNlcnZlclwiOyAvLyBkZWZhdWx0IGxldmVsIGlzIHNldCBvbiB0aGUgY2xpZW50IHNpZGUsIHNvIGl0IGRvZXMgbm90IG5lZWRcbi8vIHRvIGJlIHNldCBieSB0aGUgQ0xJIG9yIEFQSVxuXG52YXIgZGVmYXVsdExldmVsID0gXCJpbmZvXCI7IC8vIG9wdGlvbnMgbmV3IG9wdGlvbnMsIG1lcmdlIHdpdGggb2xkIG9wdGlvbnNcblxuLyoqXG4gKiBAcGFyYW0ge2ZhbHNlIHwgdHJ1ZSB8IFwibm9uZVwiIHwgXCJlcnJvclwiIHwgXCJ3YXJuXCIgfCBcImluZm9cIiB8IFwibG9nXCIgfCBcInZlcmJvc2VcIn0gbGV2ZWxcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5cbmZ1bmN0aW9uIHNldExvZ0xldmVsKGxldmVsKSB7XG4gIGxvZ2dlci5jb25maWd1cmVEZWZhdWx0TG9nZ2VyKHtcbiAgICBsZXZlbDogbGV2ZWxcbiAgfSk7XG59XG5cbnNldExvZ0xldmVsKGRlZmF1bHRMZXZlbCk7XG52YXIgbG9nID0gbG9nZ2VyLmdldExvZ2dlcihuYW1lKTtcbmV4cG9ydCB7IGxvZywgc2V0TG9nTGV2ZWwgfTsiLCJpbXBvcnQgZ2V0Q3VycmVudFNjcmlwdFNvdXJjZSBmcm9tIFwiLi9nZXRDdXJyZW50U2NyaXB0U291cmNlLmpzXCI7XG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZVF1ZXJ5XG4gKiBAcmV0dXJucyB7eyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBib29sZWFuIH19XG4gKi9cblxuZnVuY3Rpb24gcGFyc2VVUkwocmVzb3VyY2VRdWVyeSkge1xuICAvKiogQHR5cGUge3sgW2tleTogc3RyaW5nXTogc3RyaW5nIH19ICovXG4gIHZhciBvcHRpb25zID0ge307XG5cbiAgaWYgKHR5cGVvZiByZXNvdXJjZVF1ZXJ5ID09PSBcInN0cmluZ1wiICYmIHJlc291cmNlUXVlcnkgIT09IFwiXCIpIHtcbiAgICB2YXIgc2VhcmNoUGFyYW1zID0gcmVzb3VyY2VRdWVyeS5zdWJzdHIoMSkuc3BsaXQoXCImXCIpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWFyY2hQYXJhbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBwYWlyID0gc2VhcmNoUGFyYW1zW2ldLnNwbGl0KFwiPVwiKTtcbiAgICAgIG9wdGlvbnNbcGFpclswXV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEVsc2UsIGdldCB0aGUgdXJsIGZyb20gdGhlIDxzY3JpcHQ+IHRoaXMgZmlsZSB3YXMgY2FsbGVkIHdpdGguXG4gICAgdmFyIHNjcmlwdFNvdXJjZSA9IGdldEN1cnJlbnRTY3JpcHRTb3VyY2UoKTtcbiAgICB2YXIgc2NyaXB0U291cmNlVVJMO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIFRoZSBwbGFjZWhvbGRlciBgYmFzZVVSTGAgd2l0aCBgd2luZG93LmxvY2F0aW9uLmhyZWZgLFxuICAgICAgLy8gaXMgdG8gYWxsb3cgcGFyc2luZyBvZiBwYXRoLXJlbGF0aXZlIG9yIHByb3RvY29sLXJlbGF0aXZlIFVSTHMsXG4gICAgICAvLyBhbmQgd2lsbCBoYXZlIG5vIGVmZmVjdCBpZiBgc2NyaXB0U291cmNlYCBpcyBhIGZ1bGx5IHZhbGlkIFVSTC5cbiAgICAgIHNjcmlwdFNvdXJjZVVSTCA9IG5ldyBVUkwoc2NyaXB0U291cmNlLCBzZWxmLmxvY2F0aW9uLmhyZWYpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7Ly8gVVJMIHBhcnNpbmcgZmFpbGVkLCBkbyBub3RoaW5nLlxuICAgICAgLy8gV2Ugd2lsbCBzdGlsbCBwcm9jZWVkIHRvIHNlZSBpZiB3ZSBjYW4gcmVjb3ZlciB1c2luZyBgcmVzb3VyY2VRdWVyeWBcbiAgICB9XG5cbiAgICBpZiAoc2NyaXB0U291cmNlVVJMKSB7XG4gICAgICBvcHRpb25zID0gc2NyaXB0U291cmNlVVJMO1xuICAgICAgb3B0aW9ucy5mcm9tQ3VycmVudFNjcmlwdCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9wdGlvbnM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcnNlVVJMOyIsImltcG9ydCBob3RFbWl0dGVyIGZyb20gXCJ3ZWJwYWNrL2hvdC9lbWl0dGVyLmpzXCI7XG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi9sb2cuanNcIjtcbi8qKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vaW5kZXhcIikuT3B0aW9uc30gT3B0aW9uc1xuLyoqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi9pbmRleFwiKS5TdGF0dXN9IFN0YXR1c1xuXG4vKipcbiAqIEBwYXJhbSB7T3B0aW9uc30gb3B0aW9uc1xuICogQHBhcmFtIHtTdGF0dXN9IHN0YXR1c1xuICovXG5cbmZ1bmN0aW9uIHJlbG9hZEFwcChfcmVmLCBzdGF0dXMpIHtcbiAgdmFyIGhvdCA9IF9yZWYuaG90LFxuICAgICAgbGl2ZVJlbG9hZCA9IF9yZWYubGl2ZVJlbG9hZDtcblxuICBpZiAoc3RhdHVzLmlzVW5sb2FkaW5nKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGN1cnJlbnRIYXNoID0gc3RhdHVzLmN1cnJlbnRIYXNoLFxuICAgICAgcHJldmlvdXNIYXNoID0gc3RhdHVzLnByZXZpb3VzSGFzaDtcbiAgdmFyIGlzSW5pdGlhbCA9IGN1cnJlbnRIYXNoLmluZGV4T2YoXG4gIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICBwcmV2aW91c0hhc2gpID49IDA7XG5cbiAgaWYgKGlzSW5pdGlhbCkge1xuICAgIHJldHVybjtcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHtXaW5kb3d9IHJvb3RXaW5kb3dcbiAgICogQHBhcmFtIHtudW1iZXJ9IGludGVydmFsSWRcbiAgICovXG5cblxuICBmdW5jdGlvbiBhcHBseVJlbG9hZChyb290V2luZG93LCBpbnRlcnZhbElkKSB7XG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICBsb2cuaW5mbyhcIkFwcCB1cGRhdGVkLiBSZWxvYWRpbmcuLi5cIik7XG4gICAgcm9vdFdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfVxuXG4gIHZhciBzZWFyY2ggPSBzZWxmLmxvY2F0aW9uLnNlYXJjaC50b0xvd2VyQ2FzZSgpO1xuICB2YXIgYWxsb3dUb0hvdCA9IHNlYXJjaC5pbmRleE9mKFwid2VicGFjay1kZXYtc2VydmVyLWhvdD1mYWxzZVwiKSA9PT0gLTE7XG4gIHZhciBhbGxvd1RvTGl2ZVJlbG9hZCA9IHNlYXJjaC5pbmRleE9mKFwid2VicGFjay1kZXYtc2VydmVyLWxpdmUtcmVsb2FkPWZhbHNlXCIpID09PSAtMTtcblxuICBpZiAoaG90ICYmIGFsbG93VG9Ib3QpIHtcbiAgICBsb2cuaW5mbyhcIkFwcCBob3QgdXBkYXRlLi4uXCIpO1xuICAgIGhvdEVtaXR0ZXIuZW1pdChcIndlYnBhY2tIb3RVcGRhdGVcIiwgc3RhdHVzLmN1cnJlbnRIYXNoKTtcblxuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLndpbmRvdykge1xuICAgICAgLy8gYnJvYWRjYXN0IHVwZGF0ZSB0byB3aW5kb3dcbiAgICAgIHNlbGYucG9zdE1lc3NhZ2UoXCJ3ZWJwYWNrSG90VXBkYXRlXCIuY29uY2F0KHN0YXR1cy5jdXJyZW50SGFzaCksIFwiKlwiKTtcbiAgICB9XG4gIH0gLy8gYWxsb3cgcmVmcmVzaGluZyB0aGUgcGFnZSBvbmx5IGlmIGxpdmVSZWxvYWQgaXNuJ3QgZGlzYWJsZWRcbiAgZWxzZSBpZiAobGl2ZVJlbG9hZCAmJiBhbGxvd1RvTGl2ZVJlbG9hZCkge1xuICAgIHZhciByb290V2luZG93ID0gc2VsZjsgLy8gdXNlIHBhcmVudCB3aW5kb3cgZm9yIHJlbG9hZCAoaW4gY2FzZSB3ZSdyZSBpbiBhbiBpZnJhbWUgd2l0aCBubyB2YWxpZCBzcmMpXG5cbiAgICB2YXIgaW50ZXJ2YWxJZCA9IHNlbGYuc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHJvb3RXaW5kb3cubG9jYXRpb24ucHJvdG9jb2wgIT09IFwiYWJvdXQ6XCIpIHtcbiAgICAgICAgLy8gcmVsb2FkIGltbWVkaWF0ZWx5IGlmIHByb3RvY29sIGlzIHZhbGlkXG4gICAgICAgIGFwcGx5UmVsb2FkKHJvb3RXaW5kb3csIGludGVydmFsSWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdFdpbmRvdyA9IHJvb3RXaW5kb3cucGFyZW50O1xuXG4gICAgICAgIGlmIChyb290V2luZG93LnBhcmVudCA9PT0gcm9vdFdpbmRvdykge1xuICAgICAgICAgIC8vIGlmIHBhcmVudCBlcXVhbHMgY3VycmVudCB3aW5kb3cgd2UndmUgcmVhY2hlZCB0aGUgcm9vdCB3aGljaCB3b3VsZCBjb250aW51ZSBmb3JldmVyLCBzbyB0cmlnZ2VyIGEgcmVsb2FkIGFueXdheXNcbiAgICAgICAgICBhcHBseVJlbG9hZChyb290V2luZG93LCBpbnRlcnZhbElkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlbG9hZEFwcDsiLCIvKiBnbG9iYWwgX19yZXNvdXJjZVF1ZXJ5IFdvcmtlckdsb2JhbFNjb3BlICovXG4vLyBTZW5kIG1lc3NhZ2VzIHRvIHRoZSBvdXRzaWRlLCBzbyBwbHVnaW5zIGNhbiBjb25zdW1lIGl0LlxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge2FueX0gW2RhdGFdXG4gKi9cbmZ1bmN0aW9uIHNlbmRNc2codHlwZSwgZGF0YSkge1xuICBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgKHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKHNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZSkpKSB7XG4gICAgc2VsZi5wb3N0TWVzc2FnZSh7XG4gICAgICB0eXBlOiBcIndlYnBhY2tcIi5jb25jYXQodHlwZSksXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSwgXCIqXCIpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNlbmRNc2c7IiwidmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoXCJldmVudHNcIik7XG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiIsInZhciBsb2dMZXZlbCA9IFwiaW5mb1wiO1xuXG5mdW5jdGlvbiBkdW1teSgpIHt9XG5cbmZ1bmN0aW9uIHNob3VsZExvZyhsZXZlbCkge1xuXHR2YXIgc2hvdWxkTG9nID1cblx0XHQobG9nTGV2ZWwgPT09IFwiaW5mb1wiICYmIGxldmVsID09PSBcImluZm9cIikgfHxcblx0XHQoW1wiaW5mb1wiLCBcIndhcm5pbmdcIl0uaW5kZXhPZihsb2dMZXZlbCkgPj0gMCAmJiBsZXZlbCA9PT0gXCJ3YXJuaW5nXCIpIHx8XG5cdFx0KFtcImluZm9cIiwgXCJ3YXJuaW5nXCIsIFwiZXJyb3JcIl0uaW5kZXhPZihsb2dMZXZlbCkgPj0gMCAmJiBsZXZlbCA9PT0gXCJlcnJvclwiKTtcblx0cmV0dXJuIHNob3VsZExvZztcbn1cblxuZnVuY3Rpb24gbG9nR3JvdXAobG9nRm4pIHtcblx0cmV0dXJuIGZ1bmN0aW9uIChsZXZlbCwgbXNnKSB7XG5cdFx0aWYgKHNob3VsZExvZyhsZXZlbCkpIHtcblx0XHRcdGxvZ0ZuKG1zZyk7XG5cdFx0fVxuXHR9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsZXZlbCwgbXNnKSB7XG5cdGlmIChzaG91bGRMb2cobGV2ZWwpKSB7XG5cdFx0aWYgKGxldmVsID09PSBcImluZm9cIikge1xuXHRcdFx0Y29uc29sZS5sb2cobXNnKTtcblx0XHR9IGVsc2UgaWYgKGxldmVsID09PSBcIndhcm5pbmdcIikge1xuXHRcdFx0Y29uc29sZS53YXJuKG1zZyk7XG5cdFx0fSBlbHNlIGlmIChsZXZlbCA9PT0gXCJlcnJvclwiKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKG1zZyk7XG5cdFx0fVxuXHR9XG59O1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnMgKi9cbnZhciBncm91cCA9IGNvbnNvbGUuZ3JvdXAgfHwgZHVtbXk7XG52YXIgZ3JvdXBDb2xsYXBzZWQgPSBjb25zb2xlLmdyb3VwQ29sbGFwc2VkIHx8IGR1bW15O1xudmFyIGdyb3VwRW5kID0gY29uc29sZS5ncm91cEVuZCB8fCBkdW1teTtcbi8qIGVzbGludC1lbmFibGUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zICovXG5cbm1vZHVsZS5leHBvcnRzLmdyb3VwID0gbG9nR3JvdXAoZ3JvdXApO1xuXG5tb2R1bGUuZXhwb3J0cy5ncm91cENvbGxhcHNlZCA9IGxvZ0dyb3VwKGdyb3VwQ29sbGFwc2VkKTtcblxubW9kdWxlLmV4cG9ydHMuZ3JvdXBFbmQgPSBsb2dHcm91cChncm91cEVuZCk7XG5cbm1vZHVsZS5leHBvcnRzLnNldExvZ0xldmVsID0gZnVuY3Rpb24gKGxldmVsKSB7XG5cdGxvZ0xldmVsID0gbGV2ZWw7XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5mb3JtYXRFcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcblx0dmFyIG1lc3NhZ2UgPSBlcnIubWVzc2FnZTtcblx0dmFyIHN0YWNrID0gZXJyLnN0YWNrO1xuXHRpZiAoIXN0YWNrKSB7XG5cdFx0cmV0dXJuIG1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAoc3RhY2suaW5kZXhPZihtZXNzYWdlKSA8IDApIHtcblx0XHRyZXR1cm4gbWVzc2FnZSArIFwiXFxuXCIgKyBzdGFjaztcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gc3RhY2s7XG5cdH1cbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCJkMTE2NTZkNzMxYTNmMjVhYjFmMFwiKSIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKiBnbG9iYWwgX19yZXNvdXJjZVF1ZXJ5LCBfX3dlYnBhY2tfaGFzaF9fICovXG4vLy8gPHJlZmVyZW5jZSB0eXBlcz1cIndlYnBhY2svbW9kdWxlXCIgLz5cbmltcG9ydCB3ZWJwYWNrSG90TG9nIGZyb20gXCJ3ZWJwYWNrL2hvdC9sb2cuanNcIjtcbmltcG9ydCBzdHJpcEFuc2kgZnJvbSBcIi4vbW9kdWxlcy9zdHJpcC1hbnNpL2luZGV4LmpzXCI7XG5pbXBvcnQgcGFyc2VVUkwgZnJvbSBcIi4vdXRpbHMvcGFyc2VVUkwuanNcIjtcbmltcG9ydCBzb2NrZXQgZnJvbSBcIi4vc29ja2V0LmpzXCI7XG5pbXBvcnQgeyBmb3JtYXRQcm9ibGVtLCBzaG93LCBoaWRlIH0gZnJvbSBcIi4vb3ZlcmxheS5qc1wiO1xuaW1wb3J0IHsgbG9nLCBzZXRMb2dMZXZlbCB9IGZyb20gXCIuL3V0aWxzL2xvZy5qc1wiO1xuaW1wb3J0IHNlbmRNZXNzYWdlIGZyb20gXCIuL3V0aWxzL3NlbmRNZXNzYWdlLmpzXCI7XG5pbXBvcnQgcmVsb2FkQXBwIGZyb20gXCIuL3V0aWxzL3JlbG9hZEFwcC5qc1wiO1xuaW1wb3J0IGNyZWF0ZVNvY2tldFVSTCBmcm9tIFwiLi91dGlscy9jcmVhdGVTb2NrZXRVUkwuanNcIjtcbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gT3B0aW9uc1xuICogQHByb3BlcnR5IHtib29sZWFufSBob3RcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gbGl2ZVJlbG9hZFxuICogQHByb3BlcnR5IHtib29sZWFufSBwcm9ncmVzc1xuICogQHByb3BlcnR5IHtib29sZWFuIHwgeyB3YXJuaW5ncz86IGJvb2xlYW4sIGVycm9ycz86IGJvb2xlYW4gfX0gb3ZlcmxheVxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtsb2dnaW5nXVxuICogQHByb3BlcnR5IHtudW1iZXJ9IFtyZWNvbm5lY3RdXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTdGF0dXNcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNVbmxvYWRpbmdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjdXJyZW50SGFzaFxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtwcmV2aW91c0hhc2hdXG4gKi9cblxuLyoqXG4gKiBAdHlwZSB7U3RhdHVzfVxuICovXG5cbnZhciBzdGF0dXMgPSB7XG4gIGlzVW5sb2FkaW5nOiBmYWxzZSxcbiAgLy8gVE9ETyBXb3JrYXJvdW5kIGZvciB3ZWJwYWNrIHY0LCBgX193ZWJwYWNrX2hhc2hfX2AgaXMgbm90IHJlcGxhY2VkIHdpdGhvdXQgSG90TW9kdWxlUmVwbGFjZW1lbnRcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICBjdXJyZW50SGFzaDogdHlwZW9mIF9fd2VicGFja19oYXNoX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfaGFzaF9fIDogXCJcIlxufTtcbi8qKiBAdHlwZSB7T3B0aW9uc30gKi9cblxudmFyIG9wdGlvbnMgPSB7XG4gIGhvdDogZmFsc2UsXG4gIGxpdmVSZWxvYWQ6IGZhbHNlLFxuICBwcm9ncmVzczogZmFsc2UsXG4gIG92ZXJsYXk6IGZhbHNlXG59O1xudmFyIHBhcnNlZFJlc291cmNlUXVlcnkgPSBwYXJzZVVSTChfX3Jlc291cmNlUXVlcnkpO1xuXG5pZiAocGFyc2VkUmVzb3VyY2VRdWVyeS5ob3QgPT09IFwidHJ1ZVwiKSB7XG4gIG9wdGlvbnMuaG90ID0gdHJ1ZTtcbiAgbG9nLmluZm8oXCJIb3QgTW9kdWxlIFJlcGxhY2VtZW50IGVuYWJsZWQuXCIpO1xufVxuXG5pZiAocGFyc2VkUmVzb3VyY2VRdWVyeVtcImxpdmUtcmVsb2FkXCJdID09PSBcInRydWVcIikge1xuICBvcHRpb25zLmxpdmVSZWxvYWQgPSB0cnVlO1xuICBsb2cuaW5mbyhcIkxpdmUgUmVsb2FkaW5nIGVuYWJsZWQuXCIpO1xufVxuXG5pZiAocGFyc2VkUmVzb3VyY2VRdWVyeS5sb2dnaW5nKSB7XG4gIG9wdGlvbnMubG9nZ2luZyA9IHBhcnNlZFJlc291cmNlUXVlcnkubG9nZ2luZztcbn1cblxuaWYgKHR5cGVvZiBwYXJzZWRSZXNvdXJjZVF1ZXJ5LnJlY29ubmVjdCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICBvcHRpb25zLnJlY29ubmVjdCA9IE51bWJlcihwYXJzZWRSZXNvdXJjZVF1ZXJ5LnJlY29ubmVjdCk7XG59XG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBsZXZlbFxuICovXG5cblxuZnVuY3Rpb24gc2V0QWxsTG9nTGV2ZWwobGV2ZWwpIHtcbiAgLy8gVGhpcyBpcyBuZWVkZWQgYmVjYXVzZSB0aGUgSE1SIGxvZ2dlciBvcGVyYXRlIHNlcGFyYXRlbHkgZnJvbSBkZXYgc2VydmVyIGxvZ2dlclxuICB3ZWJwYWNrSG90TG9nLnNldExvZ0xldmVsKGxldmVsID09PSBcInZlcmJvc2VcIiB8fCBsZXZlbCA9PT0gXCJsb2dcIiA/IFwiaW5mb1wiIDogbGV2ZWwpO1xuICBzZXRMb2dMZXZlbChsZXZlbCk7XG59XG5cbmlmIChvcHRpb25zLmxvZ2dpbmcpIHtcbiAgc2V0QWxsTG9nTGV2ZWwob3B0aW9ucy5sb2dnaW5nKTtcbn1cblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKFwiYmVmb3JldW5sb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgc3RhdHVzLmlzVW5sb2FkaW5nID0gdHJ1ZTtcbn0pO1xudmFyIG9uU29ja2V0TWVzc2FnZSA9IHtcbiAgaG90OiBmdW5jdGlvbiBob3QoKSB7XG4gICAgaWYgKHBhcnNlZFJlc291cmNlUXVlcnkuaG90ID09PSBcImZhbHNlXCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBvcHRpb25zLmhvdCA9IHRydWU7XG4gICAgbG9nLmluZm8oXCJIb3QgTW9kdWxlIFJlcGxhY2VtZW50IGVuYWJsZWQuXCIpO1xuICB9LFxuICBsaXZlUmVsb2FkOiBmdW5jdGlvbiBsaXZlUmVsb2FkKCkge1xuICAgIGlmIChwYXJzZWRSZXNvdXJjZVF1ZXJ5W1wibGl2ZS1yZWxvYWRcIl0gPT09IFwiZmFsc2VcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG9wdGlvbnMubGl2ZVJlbG9hZCA9IHRydWU7XG4gICAgbG9nLmluZm8oXCJMaXZlIFJlbG9hZGluZyBlbmFibGVkLlwiKTtcbiAgfSxcbiAgaW52YWxpZDogZnVuY3Rpb24gaW52YWxpZCgpIHtcbiAgICBsb2cuaW5mbyhcIkFwcCB1cGRhdGVkLiBSZWNvbXBpbGluZy4uLlwiKTsgLy8gRml4ZXMgIzEwNDIuIG92ZXJsYXkgZG9lc24ndCBjbGVhciBpZiBlcnJvcnMgYXJlIGZpeGVkIGJ1dCB3YXJuaW5ncyByZW1haW4uXG5cbiAgICBpZiAob3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICBoaWRlKCk7XG4gICAgfVxuXG4gICAgc2VuZE1lc3NhZ2UoXCJJbnZhbGlkXCIpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaGFzaFxuICAgKi9cbiAgaGFzaDogZnVuY3Rpb24gaGFzaChfaGFzaCkge1xuICAgIHN0YXR1cy5wcmV2aW91c0hhc2ggPSBzdGF0dXMuY3VycmVudEhhc2g7XG4gICAgc3RhdHVzLmN1cnJlbnRIYXNoID0gX2hhc2g7XG4gIH0sXG4gIGxvZ2dpbmc6IHNldEFsbExvZ0xldmVsLFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlXG4gICAqL1xuICBvdmVybGF5OiBmdW5jdGlvbiBvdmVybGF5KHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG9wdGlvbnMub3ZlcmxheSA9IHZhbHVlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcbiAgICovXG4gIHJlY29ubmVjdDogZnVuY3Rpb24gcmVjb25uZWN0KHZhbHVlKSB7XG4gICAgaWYgKHBhcnNlZFJlc291cmNlUXVlcnkucmVjb25uZWN0ID09PSBcImZhbHNlXCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBvcHRpb25zLnJlY29ubmVjdCA9IHZhbHVlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlXG4gICAqL1xuICBwcm9ncmVzczogZnVuY3Rpb24gcHJvZ3Jlc3ModmFsdWUpIHtcbiAgICBvcHRpb25zLnByb2dyZXNzID0gdmFsdWU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7eyBwbHVnaW5OYW1lPzogc3RyaW5nLCBwZXJjZW50OiBudW1iZXIsIG1zZzogc3RyaW5nIH19IGRhdGFcbiAgICovXG4gIFwicHJvZ3Jlc3MtdXBkYXRlXCI6IGZ1bmN0aW9uIHByb2dyZXNzVXBkYXRlKGRhdGEpIHtcbiAgICBpZiAob3B0aW9ucy5wcm9ncmVzcykge1xuICAgICAgbG9nLmluZm8oXCJcIi5jb25jYXQoZGF0YS5wbHVnaW5OYW1lID8gXCJbXCIuY29uY2F0KGRhdGEucGx1Z2luTmFtZSwgXCJdIFwiKSA6IFwiXCIpLmNvbmNhdChkYXRhLnBlcmNlbnQsIFwiJSAtIFwiKS5jb25jYXQoZGF0YS5tc2csIFwiLlwiKSk7XG4gICAgfVxuXG4gICAgc2VuZE1lc3NhZ2UoXCJQcm9ncmVzc1wiLCBkYXRhKTtcbiAgfSxcbiAgXCJzdGlsbC1va1wiOiBmdW5jdGlvbiBzdGlsbE9rKCkge1xuICAgIGxvZy5pbmZvKFwiTm90aGluZyBjaGFuZ2VkLlwiKTtcblxuICAgIGlmIChvcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgIGhpZGUoKTtcbiAgICB9XG5cbiAgICBzZW5kTWVzc2FnZShcIlN0aWxsT2tcIik7XG4gIH0sXG4gIG9rOiBmdW5jdGlvbiBvaygpIHtcbiAgICBzZW5kTWVzc2FnZShcIk9rXCIpO1xuXG4gICAgaWYgKG9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgaGlkZSgpO1xuICAgIH1cblxuICAgIHJlbG9hZEFwcChvcHRpb25zLCBzdGF0dXMpO1xuICB9LFxuICAvLyBUT0RPOiByZW1vdmUgaW4gdjUgaW4gZmF2b3Igb2YgJ3N0YXRpYy1jaGFuZ2VkJ1xuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZVxuICAgKi9cbiAgXCJjb250ZW50LWNoYW5nZWRcIjogZnVuY3Rpb24gY29udGVudENoYW5nZWQoZmlsZSkge1xuICAgIGxvZy5pbmZvKFwiXCIuY29uY2F0KGZpbGUgPyBcIlxcXCJcIi5jb25jYXQoZmlsZSwgXCJcXFwiXCIpIDogXCJDb250ZW50XCIsIFwiIGZyb20gc3RhdGljIGRpcmVjdG9yeSB3YXMgY2hhbmdlZC4gUmVsb2FkaW5nLi4uXCIpKTtcbiAgICBzZWxmLmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZVxuICAgKi9cbiAgXCJzdGF0aWMtY2hhbmdlZFwiOiBmdW5jdGlvbiBzdGF0aWNDaGFuZ2VkKGZpbGUpIHtcbiAgICBsb2cuaW5mbyhcIlwiLmNvbmNhdChmaWxlID8gXCJcXFwiXCIuY29uY2F0KGZpbGUsIFwiXFxcIlwiKSA6IFwiQ29udGVudFwiLCBcIiBmcm9tIHN0YXRpYyBkaXJlY3Rvcnkgd2FzIGNoYW5nZWQuIFJlbG9hZGluZy4uLlwiKSk7XG4gICAgc2VsZi5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtFcnJvcltdfSB3YXJuaW5nc1xuICAgKiBAcGFyYW0ge2FueX0gcGFyYW1zXG4gICAqL1xuICB3YXJuaW5nczogZnVuY3Rpb24gd2FybmluZ3MoX3dhcm5pbmdzLCBwYXJhbXMpIHtcbiAgICBsb2cud2FybihcIldhcm5pbmdzIHdoaWxlIGNvbXBpbGluZy5cIik7XG5cbiAgICB2YXIgcHJpbnRhYmxlV2FybmluZ3MgPSBfd2FybmluZ3MubWFwKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgdmFyIF9mb3JtYXRQcm9ibGVtID0gZm9ybWF0UHJvYmxlbShcIndhcm5pbmdcIiwgZXJyb3IpLFxuICAgICAgICAgIGhlYWRlciA9IF9mb3JtYXRQcm9ibGVtLmhlYWRlcixcbiAgICAgICAgICBib2R5ID0gX2Zvcm1hdFByb2JsZW0uYm9keTtcblxuICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KGhlYWRlciwgXCJcXG5cIikuY29uY2F0KHN0cmlwQW5zaShib2R5KSk7XG4gICAgfSk7XG5cbiAgICBzZW5kTWVzc2FnZShcIldhcm5pbmdzXCIsIHByaW50YWJsZVdhcm5pbmdzKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJpbnRhYmxlV2FybmluZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxvZy53YXJuKHByaW50YWJsZVdhcm5pbmdzW2ldKTtcbiAgICB9XG5cbiAgICB2YXIgbmVlZFNob3dPdmVybGF5Rm9yV2FybmluZ3MgPSB0eXBlb2Ygb3B0aW9ucy5vdmVybGF5ID09PSBcImJvb2xlYW5cIiA/IG9wdGlvbnMub3ZlcmxheSA6IG9wdGlvbnMub3ZlcmxheSAmJiBvcHRpb25zLm92ZXJsYXkud2FybmluZ3M7XG5cbiAgICBpZiAobmVlZFNob3dPdmVybGF5Rm9yV2FybmluZ3MpIHtcbiAgICAgIHNob3coXCJ3YXJuaW5nXCIsIF93YXJuaW5ncyk7XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtcyAmJiBwYXJhbXMucHJldmVudFJlbG9hZGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJlbG9hZEFwcChvcHRpb25zLCBzdGF0dXMpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0Vycm9yW119IGVycm9yc1xuICAgKi9cbiAgZXJyb3JzOiBmdW5jdGlvbiBlcnJvcnMoX2Vycm9ycykge1xuICAgIGxvZy5lcnJvcihcIkVycm9ycyB3aGlsZSBjb21waWxpbmcuIFJlbG9hZCBwcmV2ZW50ZWQuXCIpO1xuXG4gICAgdmFyIHByaW50YWJsZUVycm9ycyA9IF9lcnJvcnMubWFwKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgdmFyIF9mb3JtYXRQcm9ibGVtMiA9IGZvcm1hdFByb2JsZW0oXCJlcnJvclwiLCBlcnJvciksXG4gICAgICAgICAgaGVhZGVyID0gX2Zvcm1hdFByb2JsZW0yLmhlYWRlcixcbiAgICAgICAgICBib2R5ID0gX2Zvcm1hdFByb2JsZW0yLmJvZHk7XG5cbiAgICAgIHJldHVybiBcIlwiLmNvbmNhdChoZWFkZXIsIFwiXFxuXCIpLmNvbmNhdChzdHJpcEFuc2koYm9keSkpO1xuICAgIH0pO1xuXG4gICAgc2VuZE1lc3NhZ2UoXCJFcnJvcnNcIiwgcHJpbnRhYmxlRXJyb3JzKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJpbnRhYmxlRXJyb3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsb2cuZXJyb3IocHJpbnRhYmxlRXJyb3JzW2ldKTtcbiAgICB9XG5cbiAgICB2YXIgbmVlZFNob3dPdmVybGF5Rm9yRXJyb3JzID0gdHlwZW9mIG9wdGlvbnMub3ZlcmxheSA9PT0gXCJib29sZWFuXCIgPyBvcHRpb25zLm92ZXJsYXkgOiBvcHRpb25zLm92ZXJsYXkgJiYgb3B0aW9ucy5vdmVybGF5LmVycm9ycztcblxuICAgIGlmIChuZWVkU2hvd092ZXJsYXlGb3JFcnJvcnMpIHtcbiAgICAgIHNob3coXCJlcnJvclwiLCBfZXJyb3JzKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RXJyb3J9IGVycm9yXG4gICAqL1xuICBlcnJvcjogZnVuY3Rpb24gZXJyb3IoX2Vycm9yKSB7XG4gICAgbG9nLmVycm9yKF9lcnJvcik7XG4gIH0sXG4gIGNsb3NlOiBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICBsb2cuaW5mbyhcIkRpc2Nvbm5lY3RlZCFcIik7XG5cbiAgICBpZiAob3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICBoaWRlKCk7XG4gICAgfVxuXG4gICAgc2VuZE1lc3NhZ2UoXCJDbG9zZVwiKTtcbiAgfVxufTtcbnZhciBzb2NrZXRVUkwgPSBjcmVhdGVTb2NrZXRVUkwocGFyc2VkUmVzb3VyY2VRdWVyeSk7XG5zb2NrZXQoc29ja2V0VVJMLCBvblNvY2tldE1lc3NhZ2UsIG9wdGlvbnMucmVjb25uZWN0KTsiLCJpbXBvcnQgQ2FudmFzIGZyb20gXCIuL2NvbXBvbmVudHMvY2FudmFzXCJcclxuXHJcbmNsYXNzIEFwcCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmluaXQoKVxyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgbmV3IENhbnZhcygpXHJcbiAgICB9XHJcbn1cclxubmV3IEFwcCgpIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbIm9nbCIsInZlcnRleFNoYWRlciIsImZyYWdtZW50U2hhZGVyIiwiQ2FudmFzIiwiY29uc3RydWN0b3IiLCJiaW5kIiwiaW1nU2l6ZSIsIndpZHRoIiwiaGVpZ2h0IiwiY2FudmFzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwicmVuZGVyZXIiLCJSZW5kZXJlciIsImRwciIsImdsIiwiYXNwZWN0IiwibW91c2UiLCJWZWMyIiwidmVsb2NpdHkiLCJmbG93bWFwIiwiRmxvd21hcCIsImxhc3RUaW1lIiwidW5kZWZpbmVkIiwibGFzdE1vdXNlIiwickFGIiwiaW5pdCIsImZvckVhY2giLCJmbiIsInJlc2l6ZSIsImExIiwiYTIiLCJpbWFnZUFzcGVjdCIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwiaW5uZXJXaWR0aCIsIm1lc2giLCJwcm9ncmFtIiwidW5pZm9ybXMiLCJyZXMiLCJ2YWx1ZSIsIlZlYzQiLCJzZXRTaXplIiwiY3JlYXRlR2VvbWV0cnkiLCJnZW9tZXRyeSIsIkdlb21ldHJ5IiwicG9zaXRpb24iLCJzaXplIiwiZGF0YSIsIkZsb2F0MzJBcnJheSIsInV2IiwidXBkYXRlVGV4dHVyZSIsInRleHR1cmUiLCJUZXh0dXJlIiwibWluRmlsdGVyIiwiTElORUFSIiwibWFnRmlsdGVyIiwiaW1nIiwiSW1hZ2UiLCJvbmxvYWQiLCJpbWFnZSIsImNyb3NzT3JpZ2luIiwic3JjIiwiY3JlYXRlU2hhZGVycyIsInRleHR1cmVBc3BlY3QiLCJQcm9ncmFtIiwidmVydGV4IiwiZnJhZ21lbnQiLCJ1VGltZSIsInRXYXRlciIsInRGbG93IiwidW5pZm9ybSIsImNyZWF0ZU1lc2giLCJNZXNoIiwidXBkYXRlTW91c2UiLCJlIiwicHJldmVudERlZmF1bHQiLCJjaGFuZ2VkVG91Y2hlcyIsImxlbmd0aCIsIngiLCJwYWdlWCIsInkiLCJwYWdlWSIsInNldCIsInBlcmZvcm1hbmNlIiwibm93IiwiZGVsdGFYIiwiZGVsdGFZIiwidGltZSIsImRlbHRhIiwiTWF0aCIsIm1heCIsIm5lZWRzVXBkYXRlIiwidXBkYXRlIiwidCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNvcHkiLCJsZXJwIiwibGVuIiwicmVuZGVyIiwic2NlbmUiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImFkZEV2ZW50TGlzdGVuZXJzIiwiaXNUb3VjaENhcGFibGUiLCJhZGRFdmVudExpc3RlbmVyIiwicGFzc2l2ZSIsInJlbW92ZUV2ZW50TGlzdGVuZXJzIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRlc3Ryb3kiLCJhIiwiYiIsImMiLCJkIiwic3FydCIsInUiLCJ2IiwidyIsImYiLCJ6IiwiQSIsIlBJIiwiYWNvcyIsIkFycmF5IiwiZyIsImFkZCIsInN1YiIsIm11bHRpcGx5IiwiZGl2aWRlIiwiaW52ZXJzZSIsImRpc3RhbmNlIiwic3F1YXJlZExlbiIsInNxdWFyZWREaXN0YW5jZSIsImoiLCJoIiwiaSIsIm5lZ2F0ZSIsImNyb3NzIiwiayIsInNjYWxlIiwibm9ybWFsaXplIiwiZG90IiwiZXF1YWxzIiwiYXBwbHlNYXRyaXg0IiwiYXBwbHlRdWF0ZXJuaW9uIiwicSIsImwiLCJuIiwibyIsInAiLCJtIiwiYW5nbGUiLCJjbG9uZSIsImZyb21BcnJheSIsInRvQXJyYXkiLCJ0cmFuc2Zvcm1EaXJlY3Rpb24iLCJCIiwiQyIsIkQiLCJhdHRyaWJ1dGVzIiwiaWQiLCJWQU9zIiwiZHJhd1JhbmdlIiwic3RhcnQiLCJjb3VudCIsImluc3RhbmNlZENvdW50IiwiYmluZFZlcnRleEFycmF5IiwiY3VycmVudEdlb21ldHJ5IiwiZ2xTdGF0ZSIsInN0YXRlIiwiYWRkQXR0cmlidXRlIiwidHlwZSIsIkZMT0FUIiwiVWludDE2QXJyYXkiLCJVTlNJR05FRF9TSE9SVCIsIlVOU0lHTkVEX0lOVCIsInRhcmdldCIsIkVMRU1FTlRfQVJSQVlfQlVGRkVSIiwiQVJSQVlfQlVGRkVSIiwiYnVmZmVyIiwiY3JlYXRlQnVmZmVyIiwiZGl2aXNvciIsImluc3RhbmNlZCIsInVwZGF0ZUF0dHJpYnV0ZSIsImlzSW5zdGFuY2VkIiwiY29uc29sZSIsIndhcm4iLCJtaW4iLCJpbmRleCIsImJvdW5kQnVmZmVyIiwiYmluZEJ1ZmZlciIsImJ1ZmZlckRhdGEiLCJTVEFUSUNfRFJBVyIsInNldEluZGV4Iiwic2V0RHJhd1JhbmdlIiwic2V0SW5zdGFuY2VkQ291bnQiLCJjcmVhdGVWQU8iLCJhdHRyaWJ1dGVPcmRlciIsImNyZWF0ZVZlcnRleEFycmF5IiwiYmluZEF0dHJpYnV0ZXMiLCJhdHRyaWJ1dGVMb2NhdGlvbnMiLCJ2ZXJ0ZXhBdHRyaWJQb2ludGVyIiwiZW5hYmxlVmVydGV4QXR0cmliQXJyYXkiLCJ2ZXJ0ZXhBdHRyaWJEaXZpc29yIiwiZHJhdyIsIm1vZGUiLCJUUklBTkdMRVMiLCJkcmF3RWxlbWVudHNJbnN0YW5jZWQiLCJkcmF3QXJyYXlzSW5zdGFuY2VkIiwiZHJhd0VsZW1lbnRzIiwiZHJhd0FycmF5cyIsImNvbXB1dGVCb3VuZGluZ0JveCIsImJvdW5kcyIsImNlbnRlciIsInJhZGl1cyIsImNvbXB1dGVCb3VuZGluZ1NwaGVyZSIsInJlbW92ZSIsInZhbyIsImRlbGV0ZVZlcnRleEFycmF5IiwiZGVsZXRlQnVmZmVyIiwiRSIsIkYiLCJ0cmFuc3BhcmVudCIsImN1bGxGYWNlIiwiQkFDSyIsImZyb250RmFjZSIsIkNDVyIsImRlcHRoVGVzdCIsImRlcHRoV3JpdGUiLCJyIiwiZGVwdGhGdW5jIiwicyIsIkxFU1MiLCJibGVuZEZ1bmMiLCJibGVuZEVxdWF0aW9uIiwicHJlbXVsdGlwbGllZEFscGhhIiwic2V0QmxlbmRGdW5jIiwiT05FIiwiT05FX01JTlVTX1NSQ19BTFBIQSIsIlNSQ19BTFBIQSIsImNyZWF0ZVNoYWRlciIsIlZFUlRFWF9TSEFERVIiLCJzaGFkZXJTb3VyY2UiLCJjb21waWxlU2hhZGVyIiwiZ2V0U2hhZGVySW5mb0xvZyIsIkgiLCJGUkFHTUVOVF9TSEFERVIiLCJjcmVhdGVQcm9ncmFtIiwiYXR0YWNoU2hhZGVyIiwibGlua1Byb2dyYW0iLCJnZXRQcm9ncmFtUGFyYW1ldGVyIiwiTElOS19TVEFUVVMiLCJnZXRQcm9ncmFtSW5mb0xvZyIsImRlbGV0ZVNoYWRlciIsInVuaWZvcm1Mb2NhdGlvbnMiLCJNYXAiLCJBQ1RJVkVfVU5JRk9STVMiLCJnZXRBY3RpdmVVbmlmb3JtIiwiZ2V0VW5pZm9ybUxvY2F0aW9uIiwibmFtZSIsIm1hdGNoIiwidW5pZm9ybU5hbWUiLCJpc1N0cnVjdEFycmF5Iiwic3RydWN0SW5kZXgiLCJOdW1iZXIiLCJzdHJ1Y3RQcm9wZXJ0eSIsImlzTmFOIiwiaXNTdHJ1Y3QiLCJBQ1RJVkVfQVRUUklCVVRFUyIsImdldEFjdGl2ZUF0dHJpYiIsImdldEF0dHJpYkxvY2F0aW9uIiwiam9pbiIsImRzdCIsInNyY0FscGhhIiwiZHN0QWxwaGEiLCJzZXRCbGVuZEVxdWF0aW9uIiwibW9kZVJHQiIsIm1vZGVBbHBoYSIsImFwcGx5U3RhdGUiLCJlbmFibGUiLCJERVBUSF9URVNUIiwiZGlzYWJsZSIsIkNVTExfRkFDRSIsIkJMRU5EIiwic2V0Q3VsbEZhY2UiLCJzZXRGcm9udEZhY2UiLCJzZXREZXB0aE1hc2siLCJzZXREZXB0aEZ1bmMiLCJ1c2UiLCJmbGlwRmFjZXMiLCJjdXJyZW50UHJvZ3JhbSIsInVzZVByb2dyYW0iLCJKIiwiRyIsInB1c2giLCJDVyIsImRlbGV0ZVByb2dyYW0iLCJnZXQiLCJzbGljZSIsInVuaWZvcm0xZnYiLCJ1bmlmb3JtMWYiLCJ1bmlmb3JtMmZ2IiwidW5pZm9ybTNmdiIsInVuaWZvcm00ZnYiLCJ1bmlmb3JtMWl2IiwidW5pZm9ybTFpIiwidW5pZm9ybTJpdiIsInVuaWZvcm0zaXYiLCJ1bmlmb3JtNGl2IiwidW5pZm9ybU1hdHJpeDJmdiIsInVuaWZvcm1NYXRyaXgzZnYiLCJ1bmlmb3JtTWF0cml4NGZ2Iiwic3BsaXQiLCJJIiwiSyIsIkwiLCJNIiwiXyIsIk4iLCJvbkNoYW5nZSIsImlkZW50aXR5Iiwicm90YXRlWCIsInNpbiIsImNvcyIsInJvdGF0ZVkiLCJyb3RhdGVaIiwiY29uanVnYXRlIiwiZnJvbU1hdHJpeDMiLCJmcm9tRXVsZXIiLCJvcmRlciIsImZyb21BeGlzQW5nbGUiLCJzbGVycCIsIk8iLCJ0cmFuc2xhdGUiLCJmcm9tUGVyc3BlY3RpdmUiLCJmb3YiLCJuZWFyIiwiZmFyIiwidGFuIiwiZnJvbU9ydGhvZ29uYWwiLCJsZWZ0IiwicmlnaHQiLCJib3R0b20iLCJ0b3AiLCJmcm9tUXVhdGVybmlvbiIsInNldFBvc2l0aW9uIiwiY29tcG9zZSIsImdldFJvdGF0aW9uIiwiZ2V0VHJhbnNsYXRpb24iLCJnZXRTY2FsaW5nIiwiZ2V0TWF4U2NhbGVPbkF4aXMiLCJsb29rQXQiLCJkZXRlcm1pbmFudCIsIlAiLCJyZW9yZGVyIiwiZnJvbVJvdGF0aW9uTWF0cml4IiwiYXNpbiIsImFicyIsImF0YW4yIiwicGFyZW50IiwiY2hpbGRyZW4iLCJ2aXNpYmxlIiwibWF0cml4Iiwid29ybGRNYXRyaXgiLCJtYXRyaXhBdXRvVXBkYXRlIiwicXVhdGVybmlvbiIsInJvdGF0aW9uIiwidXAiLCJzZXRQYXJlbnQiLCJyZW1vdmVDaGlsZCIsImFkZENoaWxkIiwiaW5kZXhPZiIsInNwbGljZSIsInVwZGF0ZU1hdHJpeFdvcmxkIiwidXBkYXRlTWF0cml4Iiwid29ybGRNYXRyaXhOZWVkc1VwZGF0ZSIsInRyYXZlcnNlIiwiZGVjb21wb3NlIiwiUSIsIlIiLCJTIiwiVCIsInJvdGF0ZSIsImZyb21NYXRyaXg0IiwiZnJvbUJhc2lzIiwiZ2V0Tm9ybWFsTWF0cml4IiwiVSIsImZydXN0dW1DdWxsZWQiLCJyZW5kZXJPcmRlciIsIm1vZGVsVmlld01hdHJpeCIsIm5vcm1hbE1hdHJpeCIsIm1vZGVsTWF0cml4IiwiT2JqZWN0IiwiYXNzaWduIiwidmlld01hdHJpeCIsInByb2plY3Rpb25NYXRyaXgiLCJjYW1lcmFQb3NpdGlvbiIsImNhbWVyYSIsIm9uQmVmb3JlUmVuZGVyIiwib25BZnRlclJlbmRlciIsIlYiLCJVaW50OEFycmF5IiwiVyIsIlgiLCJURVhUVVJFXzJEIiwiVU5TSUdORURfQllURSIsImZvcm1hdCIsIlJHQkEiLCJpbnRlcm5hbEZvcm1hdCIsIndyYXBTIiwiQ0xBTVBfVE9fRURHRSIsIndyYXBUIiwiZ2VuZXJhdGVNaXBtYXBzIiwiTkVBUkVTVF9NSVBNQVBfTElORUFSIiwicHJlbXVsdGlwbHlBbHBoYSIsInVucGFja0FsaWdubWVudCIsImZsaXBZIiwibGV2ZWwiLCJjcmVhdGVUZXh0dXJlIiwic3RvcmUiLCJSRVBFQVQiLCJ0ZXh0dXJlVW5pdHMiLCJhY3RpdmVUZXh0dXJlVW5pdCIsImJpbmRUZXh0dXJlIiwiYWN0aXZlVGV4dHVyZSIsInBpeGVsU3RvcmVpIiwiVU5QQUNLX0ZMSVBfWV9XRUJHTCIsIlVOUEFDS19QUkVNVUxUSVBMWV9BTFBIQV9XRUJHTCIsIlVOUEFDS19BTElHTk1FTlQiLCJ0ZXhQYXJhbWV0ZXJpIiwiVEVYVFVSRV9NSU5fRklMVEVSIiwiVEVYVFVSRV9NQUdfRklMVEVSIiwiVEVYVFVSRV9XUkFQX1MiLCJURVhUVVJFX1dSQVBfVCIsImlzV2ViZ2wyIiwiQXJyYXlCdWZmZXIiLCJpc1ZpZXciLCJ0ZXhJbWFnZTJEIiwiZ2VuZXJhdGVNaXBtYXAiLCJvblVwZGF0ZSIsIkZSQU1FQlVGRkVSIiwiY29sb3IiLCJkZXB0aCIsInN0ZW5jaWwiLCJkZXB0aFRleHR1cmUiLCJjcmVhdGVGcmFtZWJ1ZmZlciIsImJpbmRGcmFtZWJ1ZmZlciIsInRleHR1cmVzIiwiZnJhbWVidWZmZXJUZXh0dXJlMkQiLCJDT0xPUl9BVFRBQ0hNRU5UMCIsImdldEV4dGVuc2lvbiIsIk5FQVJFU1QiLCJERVBUSF9DT01QT05FTlQiLCJERVBUSF9DT01QT05FTlQyNCIsIkRFUFRIX0FUVEFDSE1FTlQiLCJkZXB0aEJ1ZmZlciIsImNyZWF0ZVJlbmRlcmJ1ZmZlciIsImJpbmRSZW5kZXJidWZmZXIiLCJSRU5ERVJCVUZGRVIiLCJyZW5kZXJidWZmZXJTdG9yYWdlIiwiREVQVEhfQ09NUE9ORU5UMTYiLCJmcmFtZWJ1ZmZlclJlbmRlcmJ1ZmZlciIsInN0ZW5jaWxCdWZmZXIiLCJTVEVOQ0lMX0lOREVYOCIsIlNURU5DSUxfQVRUQUNITUVOVCIsImRlcHRoU3RlbmNpbEJ1ZmZlciIsIkRFUFRIX1NURU5DSUwiLCJERVBUSF9TVEVOQ0lMX0FUVEFDSE1FTlQiLCJoZXhUb1JHQiIsImV4ZWMiLCJwYXJzZUludCIsIlkiLCIkIiwiWiIsImFhIiwiYXBwbHlNYXRyaXgzIiwid2lkdGhTZWdtZW50cyIsImhlaWdodFNlZ21lbnRzIiwiVWludDMyQXJyYXkiLCJidWlsZFBsYW5lIiwibm9ybWFsIiwiYWIiLCJOT05FIiwiUk9UQVRFIiwiRE9MTFkiLCJQQU4iLCJET0xMWV9QQU4iLCJhYyIsImFkIiwiYWUiLCJhZiIsImFnIiwiYWgiLCJhaSIsImFqIiwiYWsiLCJhbCIsImFtIiwiYW4iLCJhbyIsIm9iamVjdHMiLCJlbGFwc2VkIiwid2VpZ2h0IiwiZHVyYXRpb24iLCJmcmFtZXMiLCJmbG9vciIsImFwIiwiQW5pbWF0aW9uIiwiQm94IiwiZGVwdGhTZWdtZW50cyIsIkNhbWVyYSIsInByb2plY3Rpb25WaWV3TWF0cml4Iiwib3J0aG9ncmFwaGljIiwicGVyc3BlY3RpdmUiLCJwcm9qZWN0IiwidW5wcm9qZWN0IiwidXBkYXRlRnJ1c3R1bSIsImZydXN0dW0iLCJjb25zdGFudCIsImZydXN0dW1JbnRlcnNlY3RzTWVzaCIsImZydXN0dW1JbnRlcnNlY3RzU3BoZXJlIiwiQ29sb3IiLCJDeWxpbmRlciIsInJhZGlhbFNlZ21lbnRzIiwiRXVsZXIiLCJmYWxsb2ZmIiwiYWxwaGEiLCJkaXNzaXBhdGlvbiIsIm1hc2siLCJyZWFkIiwid3JpdGUiLCJzd2FwIiwiZXh0ZW5zaW9ucyIsIkhBTEZfRkxPQVQiLCJPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0IiwiSEFMRl9GTE9BVF9PRVMiLCJSR0JBMTZGIiwidE1hcCIsInVGYWxsb2ZmIiwidUFscGhhIiwidURpc3NpcGF0aW9uIiwidUFzcGVjdCIsInVNb3VzZSIsInVWZWxvY2l0eSIsImNsZWFyIiwiR1BHUFUiLCJwYXNzZXMiLCJkYXRhTGVuZ3RoIiwicG93IiwiY2VpbCIsImxvZyIsIkxOMiIsImNvb3JkcyIsIlJHQkEzMkYiLCJmYm8iLCJhZGRQYXNzIiwidGV4dHVyZVVuaWZvcm0iLCJlbmFibGVkIiwiZmlsdGVyIiwiTWF0MyIsIk1hdDQiLCJOb3JtYWxQcm9ncmFtIiwiT3JiaXQiLCJlbGVtZW50IiwiZWFzZSIsImluZXJ0aWEiLCJlbmFibGVSb3RhdGUiLCJyb3RhdGVTcGVlZCIsImVuYWJsZVpvb20iLCJ6b29tU3BlZWQiLCJlbmFibGVQYW4iLCJwYW5TcGVlZCIsIm1pblBvbGFyQW5nbGUiLCJtYXhQb2xhckFuZ2xlIiwibWluQXppbXV0aEFuZ2xlIiwibWF4QXppbXV0aEFuZ2xlIiwibWluRGlzdGFuY2UiLCJtYXhEaXN0YW5jZSIsInBoaSIsInRoZXRhIiwibW91c2VCdXR0b25zIiwiT1JCSVQiLCJaT09NIiwiYm9keSIsImNsaWVudEhlaWdodCIsImJ1dHRvbiIsImNsaWVudFgiLCJjbGllbnRZIiwic3RvcFByb3BhZ2F0aW9uIiwidG91Y2hlcyIsIlBsYW5lIiwiUG9zdCIsIm9wdGlvbnMiLCJzb3J0IiwiZnJ1c3R1bUN1bGwiLCJRdWF0IiwiUmF5Y2FzdCIsIm9yaWdpbiIsImRpcmVjdGlvbiIsImNhc3RNb3VzZSIsImludGVyc2VjdEJvdW5kcyIsImlzQXJyYXkiLCJyYXljYXN0IiwiaW50ZXJzZWN0U3BoZXJlIiwiaW50ZXJzZWN0Qm94IiwiaGl0IiwibG9jYWxQb2ludCIsIlJlbmRlclRhcmdldCIsImNyZWF0ZUVsZW1lbnQiLCJhbnRpYWxpYXMiLCJwcmVzZXJ2ZURyYXdpbmdCdWZmZXIiLCJwb3dlclByZWZlcmVuY2UiLCJhdXRvQ2xlYXIiLCJ3ZWJnbCIsImdldENvbnRleHQiLCJwYXJhbWV0ZXJzIiwibWF4VGV4dHVyZVVuaXRzIiwiZ2V0UGFyYW1ldGVyIiwiTUFYX0NPTUJJTkVEX1RFWFRVUkVfSU1BR0VfVU5JVFMiLCJaRVJPIiwiRlVOQ19BREQiLCJkZXB0aE1hc2siLCJmcmFtZWJ1ZmZlciIsInZpZXdwb3J0Iiwic3R5bGUiLCJzZXRWaWV3cG9ydCIsImJsZW5kRnVuY1NlcGFyYXRlIiwiYmxlbmRFcXVhdGlvblNlcGFyYXRlIiwiVEVYVFVSRTAiLCJzb3J0T3BhcXVlIiwiekRlcHRoIiwic29ydFRyYW5zcGFyZW50Iiwic29ydFVJIiwiZ2V0UmVuZGVyTGlzdCIsImNvbmNhdCIsIkNPTE9SX0JVRkZFUl9CSVQiLCJERVBUSF9CVUZGRVJfQklUIiwiU1RFTkNJTF9CVUZGRVJfQklUIiwiU2tpbiIsInJpZyIsImNyZWF0ZUJvbmVzIiwiY3JlYXRlQm9uZVRleHR1cmUiLCJhbmltYXRpb25zIiwiYm9uZVRleHR1cmUiLCJib25lVGV4dHVyZVNpemUiLCJyb290IiwiYm9uZXMiLCJiaW5kUG9zZSIsImJpbmRJbnZlcnNlIiwiYm9uZU1hdHJpY2VzIiwiYWRkQW5pbWF0aW9uIiwiU3BoZXJlIiwicGhpU3RhcnQiLCJwaGlMZW5ndGgiLCJ0aGV0YVN0YXJ0IiwidGhldGFMZW5ndGgiLCJUZXh0IiwiZm9udCIsInRleHQiLCJhbGlnbiIsImxldHRlclNwYWNpbmciLCJsaW5lSGVpZ2h0Iiwid29yZFNwYWNpbmciLCJ3b3JkQnJlYWsiLCJjb21tb24iLCJiYXNlIiwicmVwbGFjZSIsImdseXBocyIsInRlc3QiLCJ4YWR2YW5jZSIsInBvcCIsInNjYWxlVyIsInNjYWxlSCIsImNoYXIiLCJ4b2Zmc2V0IiwieW9mZnNldCIsImJ1ZmZlcnMiLCJudW1MaW5lcyIsImtlcm5pbmdzIiwiZmlyc3QiLCJzZWNvbmQiLCJhbW91bnQiLCJjaGFycyIsIlRyYW5zZm9ybSIsIlZlYzMiLCJBcHAiXSwic291cmNlUm9vdCI6IiJ9