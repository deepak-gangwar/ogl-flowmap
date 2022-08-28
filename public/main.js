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
    this.flowmap = new _ogl__WEBPACK_IMPORTED_MODULE_0__.ogl.Flowmap(this.gl, {
      alpha: 0.1
    });
    this.lastTime = undefined;
    this.lastMouse = new _ogl__WEBPACK_IMPORTED_MODULE_0__.ogl.Vec2();
    this.isTouchCapable = "ontouchstart" in window;
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

    img.crossOrigin = "Anonymous"; // Change images based on device

    if (this.isTouchCapable) {
      img.src = "mobile.jpg";
      this.imgSize = {
        width: 522,
        height: 1080
      };
    } else {
      img.src = "desktop.png";
    }

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

    if (this.isTouchCapable) {
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

    if (this.isTouchCapable) {
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
/******/ 		__webpack_require__.h = () => ("780f2bb900d4ce6bf2ff")
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQVQsSUFBWUQsQ0FBQyxDQUFDLENBQUQsQ0FBakIsRUFBcUJDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0QsQ0FBQyxDQUFDLENBQUQsQ0FBM0IsRUFBK0JDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0QsQ0FBQyxDQUFDLENBQUQsQ0FBckMsRUFBeUNDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0QsQ0FBQyxDQUFDLENBQUQsQ0FBL0MsRUFBbURDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0QsQ0FBQyxDQUFDLENBQUQsQ0FBekQsRUFBNkRDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0QsQ0FBQyxDQUFDLENBQUQsQ0FBbkUsRUFBdUVDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0QsQ0FBQyxDQUFDLENBQUQsQ0FBN0UsRUFBaUZDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0QsQ0FBQyxDQUFDLENBQUQsQ0FBdkYsRUFBMkZDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0QsQ0FBQyxDQUFDLENBQUQsQ0FBakcsRUFBcUdDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0QsQ0FBQyxDQUFDLENBQUQsQ0FBM0csRUFBK0dDLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTUQsQ0FBQyxDQUFDLEVBQUQsQ0FBdEgsRUFBMkhDLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTUQsQ0FBQyxDQUFDLEVBQUQsQ0FBbEksRUFBdUlDLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTUQsQ0FBQyxDQUFDLEVBQUQsQ0FBOUksRUFBbUpDLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTUQsQ0FBQyxDQUFDLEVBQUQsQ0FBMUosRUFBK0pDLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTUQsQ0FBQyxDQUFDLEVBQUQsQ0FBdEssRUFBMktDLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTUQsQ0FBQyxDQUFDLEVBQUQsQ0FBbEwsRUFBdUwsSUFBOUw7QUFBbU07O0FBQUFnTyxJQUFBQSxlQUFlLENBQUM7QUFBQ0MsTUFBQUEsR0FBRyxFQUFDek0sQ0FBTDtBQUFPdEgsTUFBQUEsTUFBTSxFQUFDdUgsQ0FBZDtBQUFnQnlNLE1BQUFBLElBQUksRUFBQzNNLENBQXJCO0FBQXVCNE0sTUFBQUEsR0FBRyxFQUFDdk07QUFBM0IsUUFBOEIsRUFBL0IsRUFBa0M7QUFBQyxVQUFJNUIsQ0FBSixFQUFNUSxDQUFOLEVBQVFNLENBQVIsRUFBVWIsQ0FBVixFQUFZQyxDQUFaO0FBQWMsVUFBSUMsQ0FBSixFQUFNcEMsQ0FBTjtBQUFRLGFBQU9pQyxDQUFDLEdBQUMsSUFBRixFQUFPUSxDQUFDLEdBQUNnQixDQUFULEVBQVdWLENBQUMsR0FBQ1csQ0FBYixFQUFleEIsQ0FBQyxHQUFDc0IsQ0FBakIsRUFBbUJyQixDQUFDLEdBQUMwQixDQUFyQixFQUF1QnpCLENBQUMsR0FBQyxJQUFFckIsSUFBSSxDQUFDc1AsR0FBTCxDQUFTNU4sQ0FBQyxHQUFDLENBQVgsQ0FBM0IsRUFBeUN6QyxDQUFDLEdBQUMsS0FBR2tDLENBQUMsR0FBQ0MsQ0FBTCxDQUEzQyxFQUFtREYsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRyxDQUFDLEdBQUNXLENBQTFELEVBQTREZCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBakUsRUFBbUVBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUF4RSxFQUEwRUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQS9FLEVBQWlGQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBdEYsRUFBd0ZBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0csQ0FBN0YsRUFBK0ZILENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFwRyxFQUFzR0EsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQTNHLEVBQTZHQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBbEgsRUFBb0hBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUF6SCxFQUEySEEsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNLENBQUNFLENBQUMsR0FBQ0QsQ0FBSCxJQUFNbEMsQ0FBdkksRUFBeUlpQyxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU0sQ0FBQyxDQUFoSixFQUFrSkEsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNLENBQXhKLEVBQTBKQSxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU0sQ0FBaEssRUFBa0tBLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTSxJQUFFRSxDQUFGLEdBQUlELENBQUosR0FBTWxDLENBQTlLLEVBQWdMaUMsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNLENBQXRMLEVBQXdMLElBQS9MO0FBQW9NOztBQUFBcU8sSUFBQUEsY0FBYyxDQUFDO0FBQUNDLE1BQUFBLElBQUksRUFBQzFNLENBQU47QUFBUTJNLE1BQUFBLEtBQUssRUFBQ25NLENBQWQ7QUFBZ0JvTSxNQUFBQSxNQUFNLEVBQUNoTSxDQUF2QjtBQUF5QmlNLE1BQUFBLEdBQUcsRUFBQ3BNLENBQTdCO0FBQStCNkwsTUFBQUEsSUFBSSxFQUFDNUwsQ0FBcEM7QUFBc0M2TCxNQUFBQSxHQUFHLEVBQUM1TDtBQUExQyxLQUFELEVBQThDO0FBQUMsVUFBSXZDLENBQUosRUFBTUMsQ0FBTixFQUFRQyxDQUFSLEVBQVVDLENBQVYsRUFBWXBDLENBQVosRUFBY3lDLENBQWQsRUFBZ0JNLENBQWhCO0FBQWtCLFVBQUlVLENBQUosRUFBTUMsQ0FBTixFQUFRRixDQUFSO0FBQVUsYUFBT3ZCLENBQUMsR0FBQyxJQUFGLEVBQU9DLENBQUMsR0FBQzJCLENBQVQsRUFBVzFCLENBQUMsR0FBQ2tDLENBQWIsRUFBZWpDLENBQUMsR0FBQ3FDLENBQWpCLEVBQW1CekUsQ0FBQyxHQUFDc0UsQ0FBckIsRUFBdUI3QixDQUFDLEdBQUM4QixDQUF6QixFQUEyQnhCLENBQUMsR0FBQ3lCLENBQTdCLEVBQStCZixDQUFDLEdBQUMsS0FBR3ZCLENBQUMsR0FBQ0MsQ0FBTCxDQUFqQyxFQUF5Q3VCLENBQUMsR0FBQyxLQUFHdEIsQ0FBQyxHQUFDcEMsQ0FBTCxDQUEzQyxFQUFtRHdELENBQUMsR0FBQyxLQUFHZixDQUFDLEdBQUNNLENBQUwsQ0FBckQsRUFBNkRkLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDLENBQUQsR0FBR3dCLENBQXJFLEVBQXVFeEIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQTVFLEVBQThFQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBbkYsRUFBcUZBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUExRixFQUE0RkEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQWpHLEVBQW1HQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQyxDQUFELEdBQUd5QixDQUEzRyxFQUE2R3pCLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFsSCxFQUFvSEEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQXpILEVBQTJIQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBaEksRUFBa0lBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUF2SSxFQUF5SUEsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNLElBQUV1QixDQUFqSixFQUFtSnZCLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTSxDQUF6SixFQUEySkEsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNLENBQUNDLENBQUMsR0FBQ0MsQ0FBSCxJQUFNc0IsQ0FBdkssRUFBeUt4QixDQUFDLENBQUMsRUFBRCxDQUFELEdBQU0sQ0FBQ2pDLENBQUMsR0FBQ29DLENBQUgsSUFBTXNCLENBQXJMLEVBQXVMekIsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNLENBQUNjLENBQUMsR0FBQ04sQ0FBSCxJQUFNZSxDQUFuTSxFQUFxTXZCLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTSxDQUEzTSxFQUE2TSxJQUFwTjtBQUF5Tjs7QUFBQTBPLElBQUFBLGNBQWMsQ0FBQ2pILENBQUQsRUFBRztBQUFDLFVBQUl6SCxDQUFKLEVBQU1qQyxDQUFOO0FBQVEsVUFBSXlDLENBQUosRUFBTU4sQ0FBTixFQUFRRCxDQUFSLEVBQVVhLENBQVYsRUFBWVgsQ0FBWixFQUFjcUIsQ0FBZCxFQUFnQkMsQ0FBaEIsRUFBa0JGLENBQWxCLEVBQW9CSyxDQUFwQixFQUFzQlEsQ0FBdEIsRUFBd0JJLENBQXhCLEVBQTBCSCxDQUExQixFQUE0QkMsQ0FBNUIsRUFBOEJDLENBQTlCLEVBQWdDSixDQUFoQyxFQUFrQ29GLENBQWxDO0FBQW9DLGFBQU92SCxDQUFDLEdBQUMsSUFBRixFQUFPUSxDQUFDLEdBQUMsQ0FBQ3pDLENBQUMsR0FBQzBKLENBQUgsRUFBTSxDQUFOLENBQVQsRUFBa0J2SCxDQUFDLEdBQUNuQyxDQUFDLENBQUMsQ0FBRCxDQUFyQixFQUF5QmtDLENBQUMsR0FBQ2xDLENBQUMsQ0FBQyxDQUFELENBQTVCLEVBQWdDK0MsQ0FBQyxHQUFDL0MsQ0FBQyxDQUFDLENBQUQsQ0FBbkMsRUFBdUNvQyxDQUFDLEdBQUNLLENBQUMsR0FBQ0EsQ0FBM0MsRUFBNkNnQixDQUFDLEdBQUN0QixDQUFDLEdBQUNBLENBQWpELEVBQW1EdUIsQ0FBQyxHQUFDeEIsQ0FBQyxHQUFDQSxDQUF2RCxFQUF5RHNCLENBQUMsR0FBQ2YsQ0FBQyxHQUFDTCxDQUE3RCxFQUErRHlCLENBQUMsR0FBQzFCLENBQUMsR0FBQ0MsQ0FBbkUsRUFBcUVpQyxDQUFDLEdBQUNsQyxDQUFDLEdBQUNzQixDQUF6RSxFQUEyRWdCLENBQUMsR0FBQ3ZDLENBQUMsR0FBQ0UsQ0FBL0UsRUFBaUZrQyxDQUFDLEdBQUNwQyxDQUFDLEdBQUN1QixDQUFyRixFQUF1RmMsQ0FBQyxHQUFDckMsQ0FBQyxHQUFDd0IsQ0FBM0YsRUFBNkZjLENBQUMsR0FBQ3pCLENBQUMsR0FBQ1gsQ0FBakcsRUFBbUdnQyxDQUFDLEdBQUNyQixDQUFDLEdBQUNVLENBQXZHLEVBQXlHK0YsQ0FBQyxHQUFDekcsQ0FBQyxHQUFDVyxDQUE3RyxFQUErR3pCLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxJQUFFb0MsQ0FBRixHQUFJRSxDQUF4SCxFQUEwSHRDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSzRCLENBQUMsR0FBQzJGLENBQWpJLEVBQW1JdkgsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLd0MsQ0FBQyxHQUFDTCxDQUExSSxFQUE0SW5DLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFqSixFQUFtSkEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLNEIsQ0FBQyxHQUFDMkYsQ0FBMUosRUFBNEp2SCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssSUFBRXVCLENBQUYsR0FBSWUsQ0FBckssRUFBdUt0QyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtxQyxDQUFDLEdBQUNFLENBQTlLLEVBQWdMdkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQXJMLEVBQXVMQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUt3QyxDQUFDLEdBQUNMLENBQTlMLEVBQWdNbkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLcUMsQ0FBQyxHQUFDRSxDQUF2TSxFQUF5TXZDLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTSxJQUFFdUIsQ0FBRixHQUFJYSxDQUFuTixFQUFxTnBDLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTSxDQUEzTixFQUE2TkEsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNLENBQW5PLEVBQXFPQSxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU0sQ0FBM08sRUFBNk9BLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTSxDQUFuUCxFQUFxUEEsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNLENBQTNQLEVBQTZQLElBQXBRO0FBQXlROztBQUFBMk8sSUFBQUEsV0FBVyxDQUFDM08sQ0FBRCxFQUFHO0FBQUMsYUFBTyxLQUFLN0IsQ0FBTCxHQUFPNkIsQ0FBQyxDQUFDLENBQUQsQ0FBUixFQUFZLEtBQUszQixDQUFMLEdBQU8yQixDQUFDLENBQUMsQ0FBRCxDQUFwQixFQUF3QixLQUFLUyxDQUFMLEdBQU9ULENBQUMsQ0FBQyxDQUFELENBQWhDLEVBQW9DLElBQTNDO0FBQWdEOztBQUFBbUIsSUFBQUEsT0FBTyxDQUFDMkYsQ0FBQyxHQUFDLElBQUgsRUFBUTtBQUFDLFVBQUk3RyxDQUFKLEVBQU1DLENBQU47O0FBQVEsVUFBSUMsQ0FBSixFQUFNcEMsQ0FBTixFQUFReUMsQ0FBUixFQUFVTSxDQUFWLEVBQVlVLENBQVosRUFBY0MsQ0FBZCxFQUFnQkYsQ0FBaEIsRUFBa0JLLENBQWxCLEVBQW9CUSxDQUFwQixFQUFzQkksQ0FBdEIsRUFBd0JILENBQXhCLEVBQTBCQyxDQUExQixFQUE0QkMsQ0FBNUIsRUFBOEJKLENBQTlCLEVBQWdDb0YsQ0FBaEMsRUFBa0NFLENBQWxDLEVBQW9DdkksQ0FBcEMsRUFBc0NtQixDQUF0QyxFQUF3Q0MsQ0FBeEMsRUFBMENDLENBQTFDLEVBQTRDcEMsQ0FBNUMsRUFBOENFLENBQTlDLEVBQWdEb0MsQ0FBaEQsRUFBa0RDLENBQWxELEVBQW9Eb0MsQ0FBcEQsRUFBc0RpSyxDQUF0RCxFQUF3RGhLLENBQXhELEVBQTBEQyxDQUExRCxFQUE0RGhELENBQTVEOztBQUE4RCxhQUFPQyxDQUFDLEdBQUMsSUFBRixFQUFPRSxDQUFDLEdBQUMsQ0FBQ0QsQ0FBQyxHQUFDNEcsQ0FBSCxFQUFNLENBQU4sQ0FBVCxFQUFrQi9JLENBQUMsR0FBQ21DLENBQUMsQ0FBQyxDQUFELENBQXJCLEVBQXlCTSxDQUFDLEdBQUNOLENBQUMsQ0FBQyxDQUFELENBQTVCLEVBQWdDWSxDQUFDLEdBQUNaLENBQUMsQ0FBQyxDQUFELENBQW5DLEVBQXVDc0IsQ0FBQyxHQUFDdEIsQ0FBQyxDQUFDLENBQUQsQ0FBMUMsRUFBOEN1QixDQUFDLEdBQUN2QixDQUFDLENBQUMsQ0FBRCxDQUFqRCxFQUFxRHFCLENBQUMsR0FBQ3JCLENBQUMsQ0FBQyxDQUFELENBQXhELEVBQTREMEIsQ0FBQyxHQUFDMUIsQ0FBQyxDQUFDLENBQUQsQ0FBL0QsRUFBbUVrQyxDQUFDLEdBQUNsQyxDQUFDLENBQUMsQ0FBRCxDQUF0RSxFQUEwRXNDLENBQUMsR0FBQ3RDLENBQUMsQ0FBQyxDQUFELENBQTdFLEVBQWlGbUMsQ0FBQyxHQUFDbkMsQ0FBQyxDQUFDLEVBQUQsQ0FBcEYsRUFBeUZvQyxDQUFDLEdBQUNwQyxDQUFDLENBQUMsRUFBRCxDQUE1RixFQUFpR3FDLENBQUMsR0FBQ3JDLENBQUMsQ0FBQyxFQUFELENBQXBHLEVBQXlHaUMsQ0FBQyxHQUFDakMsQ0FBQyxDQUFDLEVBQUQsQ0FBNUcsRUFBaUhxSCxDQUFDLEdBQUNySCxDQUFDLENBQUMsRUFBRCxDQUFwSCxFQUF5SHVILENBQUMsR0FBQ3ZILENBQUMsQ0FBQyxFQUFELENBQTVILEVBQWlJaEIsQ0FBQyxHQUFDaUIsQ0FBQyxHQUFDc0IsQ0FBRixHQUFJMUQsQ0FBQyxHQUFDeUQsQ0FBekksRUFBMkluQixDQUFDLEdBQUNGLENBQUMsR0FBQ29CLENBQUYsR0FBSWYsQ0FBQyxHQUFDZ0IsQ0FBbkosRUFBcUpsQixDQUFDLEdBQUNILENBQUMsR0FBQ3lCLENBQUYsR0FBSWQsQ0FBQyxHQUFDVSxDQUE3SixFQUErSmpCLENBQUMsR0FBQ3hDLENBQUMsR0FBQ3dELENBQUYsR0FBSWYsQ0FBQyxHQUFDaUIsQ0FBdkssRUFBeUt0RCxDQUFDLEdBQUNKLENBQUMsR0FBQzZELENBQUYsR0FBSWQsQ0FBQyxHQUFDVyxDQUFqTCxFQUFtTHBELENBQUMsR0FBQ21DLENBQUMsR0FBQ29CLENBQUYsR0FBSWQsQ0FBQyxHQUFDUyxDQUEzTCxFQUE2TGQsQ0FBQyxHQUFDMkIsQ0FBQyxHQUFDRCxDQUFGLEdBQUlLLENBQUMsR0FBQ0QsQ0FBck0sRUFBdU03QixDQUFDLEdBQUMwQixDQUFDLEdBQUNtRixDQUFGLEdBQUlsRixDQUFDLEdBQUNFLENBQS9NLEVBQWlOTyxDQUFDLEdBQUNWLENBQUMsR0FBQ3FGLENBQUYsR0FBSW5GLENBQUMsR0FBQ0MsQ0FBek4sRUFBMk53SyxDQUFDLEdBQUN2SyxDQUFDLEdBQUMrRSxDQUFGLEdBQUlsRixDQUFDLEdBQUNGLENBQW5PLEVBQXFPWSxDQUFDLEdBQUNQLENBQUMsR0FBQ2lGLENBQUYsR0FBSW5GLENBQUMsR0FBQ0gsQ0FBN08sRUFBK09hLENBQUMsR0FBQ1gsQ0FBQyxHQUFDb0YsQ0FBRixHQUFJbkYsQ0FBQyxHQUFDaUYsQ0FBdlAsRUFBeVB2SCxDQUFDLEdBQUNkLENBQUMsR0FBQzhELENBQUYsR0FBSTNDLENBQUMsR0FBQzBDLENBQU4sR0FBUXpDLENBQUMsR0FBQ3lNLENBQVYsR0FBWXhNLENBQUMsR0FBQ3VDLENBQWQsR0FBZ0IzRSxDQUFDLEdBQUN1QyxDQUFsQixHQUFvQnJDLENBQUMsR0FBQ29DLENBQWpSLEVBQW1SVCxDQUFDLEtBQUdBLENBQUMsR0FBQyxJQUFFQSxDQUFKLEVBQU1DLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDd0IsQ0FBQyxHQUFDdUIsQ0FBRixHQUFJekIsQ0FBQyxHQUFDd0IsQ0FBTixHQUFRbkIsQ0FBQyxHQUFDbUwsQ0FBWCxJQUFjL00sQ0FBekIsRUFBMkJDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDTyxDQUFDLEdBQUN1QyxDQUFGLEdBQUloRixDQUFDLEdBQUNpRixDQUFOLEdBQVFsQyxDQUFDLEdBQUNpTSxDQUFYLElBQWMvTSxDQUE5QyxFQUFnREMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUNrQyxDQUFDLEdBQUM5RCxDQUFGLEdBQUlrSixDQUFDLEdBQUNwSixDQUFOLEdBQVFzSixDQUFDLEdBQUNsSCxDQUFYLElBQWNQLENBQW5FLEVBQXFFQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQ29DLENBQUMsR0FBQ2xFLENBQUYsR0FBSXFFLENBQUMsR0FBQ25FLENBQU4sR0FBUWlFLENBQUMsR0FBQy9CLENBQVgsSUFBY1AsQ0FBeEYsRUFBMEZDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDc0IsQ0FBQyxHQUFDdUIsQ0FBRixHQUFJdEIsQ0FBQyxHQUFDd0IsQ0FBTixHQUFRcEIsQ0FBQyxHQUFDbEIsQ0FBWCxJQUFjVixDQUE3RyxFQUErR0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUNFLENBQUMsR0FBQzZDLENBQUYsR0FBSXhDLENBQUMsR0FBQ3NDLENBQU4sR0FBUWhDLENBQUMsR0FBQ0osQ0FBWCxJQUFjVixDQUFsSSxFQUFvSUMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUNzSCxDQUFDLEdBQUNqSCxDQUFGLEdBQUlpQyxDQUFDLEdBQUNsRSxDQUFOLEdBQVFvSixDQUFDLEdBQUNwSCxDQUFYLElBQWNMLENBQXZKLEVBQXlKQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQ21DLENBQUMsR0FBQy9ELENBQUYsR0FBSWdFLENBQUMsR0FBQy9CLENBQU4sR0FBUWdDLENBQUMsR0FBQ2pDLENBQVgsSUFBY0wsQ0FBNUssRUFBOEtDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDdUIsQ0FBQyxHQUFDdUIsQ0FBRixHQUFJdEIsQ0FBQyxHQUFDcUIsQ0FBTixHQUFRbEIsQ0FBQyxHQUFDbkIsQ0FBWCxJQUFjVCxDQUFqTSxFQUFtTUMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUNsQyxDQUFDLEdBQUMrRSxDQUFGLEdBQUkzQyxDQUFDLEdBQUM0QyxDQUFOLEdBQVFqQyxDQUFDLEdBQUNMLENBQVgsSUFBY1QsQ0FBdE4sRUFBd05DLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTSxDQUFDc0MsQ0FBQyxHQUFDcEUsQ0FBRixHQUFJZ0UsQ0FBQyxHQUFDN0IsQ0FBTixHQUFRbUgsQ0FBQyxHQUFDdkksQ0FBWCxJQUFjYyxDQUE1TyxFQUE4T0MsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNLENBQUN1QyxDQUFDLEdBQUNsQyxDQUFGLEdBQUk4QixDQUFDLEdBQUNqRSxDQUFOLEdBQVFtRSxDQUFDLEdBQUNwRCxDQUFYLElBQWNjLENBQWxRLEVBQW9RQyxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU0sQ0FBQ3dCLENBQUMsR0FBQ2YsQ0FBRixHQUFJYyxDQUFDLEdBQUN1TCxDQUFOLEdBQVF4TCxDQUFDLEdBQUNkLENBQVgsSUFBY1QsQ0FBeFIsRUFBMFJDLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTSxDQUFDRSxDQUFDLEdBQUM0TSxDQUFGLEdBQUloUCxDQUFDLEdBQUMyQyxDQUFOLEdBQVFGLENBQUMsR0FBQ0MsQ0FBWCxJQUFjVCxDQUE5UyxFQUFnVEMsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNLENBQUNrQyxDQUFDLEdBQUM5QixDQUFGLEdBQUlrQyxDQUFDLEdBQUNoQyxDQUFOLEdBQVFnSCxDQUFDLEdBQUNySSxDQUFYLElBQWNjLENBQXBVLEVBQXNVQyxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU0sQ0FBQ21DLENBQUMsR0FBQzdCLENBQUYsR0FBSWlDLENBQUMsR0FBQ25DLENBQU4sR0FBUWdDLENBQUMsR0FBQ25ELENBQVgsSUFBY2MsQ0FBN1YsQ0FBcFIsRUFBb25CLElBQTNuQjtBQUFnb0I7O0FBQUE0TyxJQUFBQSxPQUFPLENBQUN6USxDQUFELEVBQUdFLENBQUgsRUFBS29DLENBQUwsRUFBTztBQUFDLFVBQUlULENBQUosRUFBTUUsQ0FBTixFQUFRTSxDQUFSLEVBQVVNLENBQVY7QUFBWSxVQUFJYixDQUFKLEVBQU1FLENBQU4sRUFBUXFCLENBQVIsRUFBVUMsQ0FBVixFQUFZWSxDQUFaLEVBQWNkLENBQWQsRUFBZ0J4RCxDQUFoQixFQUFrQnVFLENBQWxCLEVBQW9CQyxDQUFwQixFQUFzQkosQ0FBdEIsRUFBd0JvRixDQUF4QixFQUEwQkUsQ0FBMUIsRUFBNEJ2SSxDQUE1QixFQUE4Qm1CLENBQTlCLEVBQWdDQyxDQUFoQyxFQUFrQ0MsQ0FBbEMsRUFBb0NxQixDQUFwQyxFQUFzQ1EsQ0FBdEMsRUFBd0NJLENBQXhDO0FBQTBDLGFBQU94QyxDQUFDLEdBQUMsSUFBRixFQUFPRSxDQUFDLEdBQUMvQixDQUFULEVBQVdxQyxDQUFDLEdBQUNuQyxDQUFiLEVBQWV5QyxDQUFDLEdBQUNMLENBQWpCLEVBQW1CUixDQUFDLEdBQUNDLENBQUMsQ0FBQyxDQUFELENBQXRCLEVBQTBCQyxDQUFDLEdBQUNELENBQUMsQ0FBQyxDQUFELENBQTdCLEVBQWlDc0IsQ0FBQyxHQUFDdEIsQ0FBQyxDQUFDLENBQUQsQ0FBcEMsRUFBd0N1QixDQUFDLEdBQUN2QixDQUFDLENBQUMsQ0FBRCxDQUEzQyxFQUErQ21DLENBQUMsR0FBQ3BDLENBQUMsR0FBQ0EsQ0FBbkQsRUFBcURzQixDQUFDLEdBQUNwQixDQUFDLEdBQUNBLENBQXpELEVBQTJEcEMsQ0FBQyxHQUFDeUQsQ0FBQyxHQUFDQSxDQUEvRCxFQUFpRWMsQ0FBQyxHQUFDckMsQ0FBQyxHQUFDb0MsQ0FBckUsRUFBdUVFLENBQUMsR0FBQ3RDLENBQUMsR0FBQ3NCLENBQTNFLEVBQTZFWSxDQUFDLEdBQUNsQyxDQUFDLEdBQUNsQyxDQUFqRixFQUFtRndKLENBQUMsR0FBQ3BILENBQUMsR0FBQ29CLENBQXZGLEVBQXlGa0csQ0FBQyxHQUFDdEgsQ0FBQyxHQUFDcEMsQ0FBN0YsRUFBK0ZtQixDQUFDLEdBQUNzQyxDQUFDLEdBQUN6RCxDQUFuRyxFQUFxR3NDLENBQUMsR0FBQ29CLENBQUMsR0FBQ1ksQ0FBekcsRUFBMkcvQixDQUFDLEdBQUNtQixDQUFDLEdBQUNGLENBQS9HLEVBQWlIaEIsQ0FBQyxHQUFDa0IsQ0FBQyxHQUFDMUQsQ0FBckgsRUFBdUg2RCxDQUFDLEdBQUNkLENBQUMsQ0FBQyxDQUFELENBQTFILEVBQThIc0IsQ0FBQyxHQUFDdEIsQ0FBQyxDQUFDLENBQUQsQ0FBakksRUFBcUkwQixDQUFDLEdBQUMxQixDQUFDLENBQUMsQ0FBRCxDQUF4SSxFQUE0SWQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUMsS0FBR3VILENBQUMsR0FBQ3JJLENBQUwsQ0FBRCxJQUFVMEMsQ0FBM0osRUFBNko1QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQ3VDLENBQUMsR0FBQ2hDLENBQUgsSUFBTXFCLENBQXhLLEVBQTBLNUIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUNtQyxDQUFDLEdBQUM3QixDQUFILElBQU1zQixDQUFyTCxFQUF1TDVCLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUE1TCxFQUE4TEEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUN1QyxDQUFDLEdBQUNoQyxDQUFILElBQU02QixDQUF6TSxFQUEyTXBDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDLEtBQUdzQyxDQUFDLEdBQUNwRCxDQUFMLENBQUQsSUFBVWtELENBQTFOLEVBQTROcEMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUN5SCxDQUFDLEdBQUNwSCxDQUFILElBQU0rQixDQUF2TyxFQUF5T3BDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUE5TyxFQUFnUEEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUNtQyxDQUFDLEdBQUM3QixDQUFILElBQU1rQyxDQUEzUCxFQUE2UHhDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDeUgsQ0FBQyxHQUFDcEgsQ0FBSCxJQUFNbUMsQ0FBeFEsRUFBMFF4QyxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU0sQ0FBQyxLQUFHc0MsQ0FBQyxHQUFDaUYsQ0FBTCxDQUFELElBQVUvRSxDQUExUixFQUE0UnhDLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTSxDQUFsUyxFQUFvU0EsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNUSxDQUFDLENBQUMsQ0FBRCxDQUEzUyxFQUErU1IsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNUSxDQUFDLENBQUMsQ0FBRCxDQUF0VCxFQUEwVFIsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNUSxDQUFDLENBQUMsQ0FBRCxDQUFqVSxFQUFxVVIsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNLENBQTNVLEVBQTZVLElBQXBWO0FBQXlWOztBQUFBNk8sSUFBQUEsV0FBVyxDQUFDOVEsQ0FBRCxFQUFHO0FBQUMsVUFBSW1DLENBQUosRUFBTUYsQ0FBTjtBQUFRLFVBQUlHLENBQUosRUFBTUYsQ0FBTjtBQUFRLGFBQU9DLENBQUMsR0FBQ25DLENBQUYsRUFBSWlDLENBQUMsR0FBQyxJQUFOLEVBQVdHLENBQUMsR0FBQ0gsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQSxDQUFDLENBQUMsQ0FBRCxDQUFOLEdBQVVBLENBQUMsQ0FBQyxFQUFELENBQXhCLEVBQTZCQyxDQUFDLEdBQUMsQ0FBL0IsRUFBaUNFLENBQUMsR0FBQyxDQUFGLElBQUtGLENBQUMsR0FBQyxJQUFFbkIsSUFBSSxDQUFDc0IsSUFBTCxDQUFVRCxDQUFDLEdBQUMsQ0FBWixDQUFKLEVBQW1CRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssTUFBSUQsQ0FBNUIsRUFBOEJDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtBLENBQUMsQ0FBQyxDQUFELENBQVAsSUFBWUMsQ0FBL0MsRUFBaURDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtBLENBQUMsQ0FBQyxDQUFELENBQVAsSUFBWUMsQ0FBbEUsRUFBb0VDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtBLENBQUMsQ0FBQyxDQUFELENBQVAsSUFBWUMsQ0FBMUYsSUFBNkZELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0EsQ0FBQyxDQUFDLENBQUQsQ0FBTixJQUFXQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtBLENBQUMsQ0FBQyxFQUFELENBQWpCLElBQXVCQyxDQUFDLEdBQUMsSUFBRW5CLElBQUksQ0FBQ3NCLElBQUwsQ0FBVSxJQUFFSixDQUFDLENBQUMsQ0FBRCxDQUFILEdBQU9BLENBQUMsQ0FBQyxDQUFELENBQVIsR0FBWUEsQ0FBQyxDQUFDLEVBQUQsQ0FBdkIsQ0FBSixFQUFpQ0UsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUNGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0EsQ0FBQyxDQUFDLENBQUQsQ0FBUCxJQUFZQyxDQUFsRCxFQUFvREMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLE1BQUlELENBQTdELEVBQStEQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQ0YsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQSxDQUFDLENBQUMsQ0FBRCxDQUFQLElBQVlDLENBQWhGLEVBQWtGQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQ0YsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQSxDQUFDLENBQUMsQ0FBRCxDQUFQLElBQVlDLENBQTFILElBQTZIRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtBLENBQUMsQ0FBQyxFQUFELENBQU4sSUFBWUMsQ0FBQyxHQUFDLElBQUVuQixJQUFJLENBQUNzQixJQUFMLENBQVUsSUFBRUosQ0FBQyxDQUFDLENBQUQsQ0FBSCxHQUFPQSxDQUFDLENBQUMsQ0FBRCxDQUFSLEdBQVlBLENBQUMsQ0FBQyxFQUFELENBQXZCLENBQUosRUFBaUNFLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtBLENBQUMsQ0FBQyxDQUFELENBQVAsSUFBWUMsQ0FBbEQsRUFBb0RDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtBLENBQUMsQ0FBQyxDQUFELENBQVAsSUFBWUMsQ0FBckUsRUFBdUVDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxNQUFJRCxDQUFoRixFQUFrRkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUNGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0EsQ0FBQyxDQUFDLENBQUQsQ0FBUCxJQUFZQyxDQUEvRyxLQUFtSEEsQ0FBQyxHQUFDLElBQUVuQixJQUFJLENBQUNzQixJQUFMLENBQVUsSUFBRUosQ0FBQyxDQUFDLEVBQUQsQ0FBSCxHQUFRQSxDQUFDLENBQUMsQ0FBRCxDQUFULEdBQWFBLENBQUMsQ0FBQyxDQUFELENBQXhCLENBQUosRUFBaUNFLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtBLENBQUMsQ0FBQyxDQUFELENBQVAsSUFBWUMsQ0FBbEQsRUFBb0RDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtBLENBQUMsQ0FBQyxDQUFELENBQVAsSUFBWUMsQ0FBckUsRUFBdUVDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtBLENBQUMsQ0FBQyxDQUFELENBQVAsSUFBWUMsQ0FBeEYsRUFBMEZDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxNQUFJRCxDQUF0TixDQUEzUCxFQUFvZCxJQUEzZDtBQUFnZTs7QUFBQTZPLElBQUFBLGNBQWMsQ0FBQzVPLENBQUQsRUFBRztBQUFDLFVBQUlELENBQUosRUFBTUQsQ0FBTjtBQUFRLGFBQU9BLENBQUMsR0FBQyxJQUFGLEVBQU8sQ0FBQ0MsQ0FBQyxHQUFDQyxDQUFILEVBQU0sQ0FBTixJQUFTRixDQUFDLENBQUMsRUFBRCxDQUFqQixFQUFzQkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsRUFBRCxDQUE1QixFQUFpQ0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsRUFBRCxDQUF2QyxFQUE0QyxJQUFuRDtBQUF3RDs7QUFBQStPLElBQUFBLFVBQVUsQ0FBQzNNLENBQUQsRUFBRztBQUFDLFVBQUluQyxDQUFKLEVBQU1ELENBQU47QUFBUSxVQUFJRSxDQUFKLEVBQU1DLENBQU4sRUFBUXBDLENBQVIsRUFBVXlDLENBQVYsRUFBWU0sQ0FBWixFQUFjVSxDQUFkLEVBQWdCQyxDQUFoQixFQUFrQkYsQ0FBbEIsRUFBb0JLLENBQXBCO0FBQXNCLGFBQU8zQixDQUFDLEdBQUNtQyxDQUFGLEVBQUlwQyxDQUFDLEdBQUMsSUFBTixFQUFXRSxDQUFDLEdBQUNGLENBQUMsQ0FBQyxDQUFELENBQWQsRUFBa0JHLENBQUMsR0FBQ0gsQ0FBQyxDQUFDLENBQUQsQ0FBckIsRUFBeUJqQyxDQUFDLEdBQUNpQyxDQUFDLENBQUMsQ0FBRCxDQUE1QixFQUFnQ1EsQ0FBQyxHQUFDUixDQUFDLENBQUMsQ0FBRCxDQUFuQyxFQUF1Q2MsQ0FBQyxHQUFDZCxDQUFDLENBQUMsQ0FBRCxDQUExQyxFQUE4Q3dCLENBQUMsR0FBQ3hCLENBQUMsQ0FBQyxDQUFELENBQWpELEVBQXFEeUIsQ0FBQyxHQUFDekIsQ0FBQyxDQUFDLENBQUQsQ0FBeEQsRUFBNER1QixDQUFDLEdBQUN2QixDQUFDLENBQUMsQ0FBRCxDQUEvRCxFQUFtRTRCLENBQUMsR0FBQzVCLENBQUMsQ0FBQyxFQUFELENBQXRFLEVBQTJFQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtuQixJQUFJLENBQUNzQixJQUFMLENBQVVGLENBQUMsR0FBQ0EsQ0FBRixHQUFJQyxDQUFDLEdBQUNBLENBQU4sR0FBUXBDLENBQUMsR0FBQ0EsQ0FBcEIsQ0FBaEYsRUFBdUdrQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtuQixJQUFJLENBQUNzQixJQUFMLENBQVVJLENBQUMsR0FBQ0EsQ0FBRixHQUFJTSxDQUFDLEdBQUNBLENBQU4sR0FBUVUsQ0FBQyxHQUFDQSxDQUFwQixDQUE1RyxFQUFtSXZCLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS25CLElBQUksQ0FBQ3NCLElBQUwsQ0FBVXFCLENBQUMsR0FBQ0EsQ0FBRixHQUFJRixDQUFDLEdBQUNBLENBQU4sR0FBUUssQ0FBQyxHQUFDQSxDQUFwQixDQUF4SSxFQUErSixJQUF0SztBQUEySzs7QUFBQW9OLElBQUFBLGlCQUFpQixHQUFFO0FBQUMsVUFBSWhQLENBQUo7QUFBTSxVQUFJQyxDQUFKLEVBQU1DLENBQU4sRUFBUUMsQ0FBUixFQUFVcEMsQ0FBVixFQUFZeUMsQ0FBWixFQUFjTSxDQUFkLEVBQWdCVSxDQUFoQixFQUFrQkMsQ0FBbEIsRUFBb0JGLENBQXBCO0FBQXNCLGFBQU92QixDQUFDLEdBQUMsSUFBRixFQUFPQyxDQUFDLEdBQUNELENBQUMsQ0FBQyxDQUFELENBQVYsRUFBY0UsQ0FBQyxHQUFDRixDQUFDLENBQUMsQ0FBRCxDQUFqQixFQUFxQkcsQ0FBQyxHQUFDSCxDQUFDLENBQUMsQ0FBRCxDQUF4QixFQUE0QmpDLENBQUMsR0FBQ2lDLENBQUMsQ0FBQyxDQUFELENBQS9CLEVBQW1DUSxDQUFDLEdBQUNSLENBQUMsQ0FBQyxDQUFELENBQXRDLEVBQTBDYyxDQUFDLEdBQUNkLENBQUMsQ0FBQyxDQUFELENBQTdDLEVBQWlEd0IsQ0FBQyxHQUFDeEIsQ0FBQyxDQUFDLENBQUQsQ0FBcEQsRUFBd0R5QixDQUFDLEdBQUN6QixDQUFDLENBQUMsQ0FBRCxDQUEzRCxFQUErRHVCLENBQUMsR0FBQ3ZCLENBQUMsQ0FBQyxFQUFELENBQWxFLEVBQXVFbEIsSUFBSSxDQUFDc0IsSUFBTCxDQUFVdEIsSUFBSSxDQUFDQyxHQUFMLENBQVNrQixDQUFDLEdBQUNBLENBQUYsR0FBSUMsQ0FBQyxHQUFDQSxDQUFOLEdBQVFDLENBQUMsR0FBQ0EsQ0FBbkIsRUFBcUJwQyxDQUFDLEdBQUNBLENBQUYsR0FBSXlDLENBQUMsR0FBQ0EsQ0FBTixHQUFRTSxDQUFDLEdBQUNBLENBQS9CLEVBQWlDVSxDQUFDLEdBQUNBLENBQUYsR0FBSUMsQ0FBQyxHQUFDQSxDQUFOLEdBQVFGLENBQUMsR0FBQ0EsQ0FBM0MsQ0FBVixDQUE5RTtBQUF1STs7QUFBQTBOLElBQUFBLE1BQU0sQ0FBQzFILENBQUQsRUFBR0UsQ0FBSCxFQUFLdkksQ0FBTCxFQUFPO0FBQUMsVUFBSWMsQ0FBSixFQUFNeUIsQ0FBTixFQUFRRixDQUFSLEVBQVVLLENBQVY7QUFBWSxVQUFJUSxDQUFKLEVBQU1JLENBQU4sRUFBUUgsQ0FBUixFQUFVQyxDQUFWLEVBQVlDLENBQVosRUFBY0osQ0FBZCxFQUFnQmpDLENBQWhCLEVBQWtCQyxDQUFsQixFQUFvQnBDLENBQXBCLEVBQXNCa0MsQ0FBdEIsRUFBd0JPLENBQXhCLEVBQTBCTSxDQUExQixFQUE0QlUsQ0FBNUI7QUFBOEIsYUFBT3hCLENBQUMsR0FBQyxJQUFGLEVBQU95QixDQUFDLEdBQUM4RixDQUFULEVBQVdoRyxDQUFDLEdBQUNrRyxDQUFiLEVBQWU3RixDQUFDLEdBQUMxQyxDQUFqQixFQUFtQmtELENBQUMsR0FBQ1gsQ0FBQyxDQUFDLENBQUQsQ0FBdEIsRUFBMEJlLENBQUMsR0FBQ2YsQ0FBQyxDQUFDLENBQUQsQ0FBN0IsRUFBaUNZLENBQUMsR0FBQ1osQ0FBQyxDQUFDLENBQUQsQ0FBcEMsRUFBd0NhLENBQUMsR0FBQ1YsQ0FBQyxDQUFDLENBQUQsQ0FBM0MsRUFBK0NXLENBQUMsR0FBQ1gsQ0FBQyxDQUFDLENBQUQsQ0FBbEQsRUFBc0RPLENBQUMsR0FBQ1AsQ0FBQyxDQUFDLENBQUQsQ0FBekQsRUFBNkQxQixDQUFDLEdBQUNrQyxDQUFDLEdBQUNiLENBQUMsQ0FBQyxDQUFELENBQWxFLEVBQXNFcEIsQ0FBQyxHQUFDcUMsQ0FBQyxHQUFDakIsQ0FBQyxDQUFDLENBQUQsQ0FBM0UsRUFBK0V4RCxDQUFDLEdBQUNzRSxDQUFDLEdBQUNkLENBQUMsQ0FBQyxDQUFELENBQXBGLEVBQXdGdEIsQ0FBQyxHQUFDQyxDQUFDLEdBQUNBLENBQUYsR0FBSUMsQ0FBQyxHQUFDQSxDQUFOLEdBQVFwQyxDQUFDLEdBQUNBLENBQXBHLEVBQXNHa0MsQ0FBQyxHQUFDLENBQUYsS0FBTUMsQ0FBQyxJQUFFRCxDQUFDLEdBQUMsSUFBRW5CLElBQUksQ0FBQ3NCLElBQUwsQ0FBVUgsQ0FBVixDQUFQLEVBQW9CRSxDQUFDLElBQUVGLENBQXZCLEVBQXlCbEMsQ0FBQyxJQUFFa0MsQ0FBbEMsQ0FBdEcsRUFBMklPLENBQUMsR0FBQytCLENBQUMsR0FBQ3hFLENBQUYsR0FBSW9FLENBQUMsR0FBQ2hDLENBQW5KLEVBQXFKVyxDQUFDLEdBQUNxQixDQUFDLEdBQUNqQyxDQUFGLEdBQUlvQyxDQUFDLEdBQUN2RSxDQUE3SixFQUErSnlELENBQUMsR0FBQ2MsQ0FBQyxHQUFDbkMsQ0FBRixHQUFJb0MsQ0FBQyxHQUFDckMsQ0FBdkssRUFBeUssQ0FBQ0QsQ0FBQyxHQUFDTyxDQUFDLEdBQUNBLENBQUYsR0FBSU0sQ0FBQyxHQUFDQSxDQUFOLEdBQVFVLENBQUMsR0FBQ0EsQ0FBYixJQUFnQixDQUFoQixLQUFvQmhCLENBQUMsSUFBRVAsQ0FBQyxHQUFDLElBQUVuQixJQUFJLENBQUNzQixJQUFMLENBQVVILENBQVYsQ0FBUCxFQUFvQmEsQ0FBQyxJQUFFYixDQUF2QixFQUF5QnVCLENBQUMsSUFBRXZCLENBQWhELENBQXpLLEVBQTRORCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtRLENBQWpPLEVBQW1PUixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtjLENBQXhPLEVBQTBPZCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUt3QixDQUEvTyxFQUFpUHhCLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUF0UCxFQUF3UEEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRyxDQUFDLEdBQUNxQixDQUFGLEdBQUl6RCxDQUFDLEdBQUMrQyxDQUFuUSxFQUFxUWQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLakMsQ0FBQyxHQUFDeUMsQ0FBRixHQUFJTixDQUFDLEdBQUNzQixDQUFoUixFQUFrUnhCLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0UsQ0FBQyxHQUFDWSxDQUFGLEdBQUlYLENBQUMsR0FBQ0ssQ0FBN1IsRUFBK1JSLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFwUyxFQUFzU0EsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRSxDQUEzUyxFQUE2U0YsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRyxDQUFsVCxFQUFvVEgsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNakMsQ0FBMVQsRUFBNFRpQyxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU0sQ0FBbFUsRUFBb1VBLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTW9DLENBQTFVLEVBQTRVcEMsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNd0MsQ0FBbFYsRUFBb1Z4QyxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU1xQyxDQUExVixFQUE0VnJDLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTSxDQUFsVyxFQUFvVyxJQUEzVztBQUFnWDs7QUFBQWtQLElBQUFBLFdBQVcsR0FBRTtBQUFDLFVBQUlsUCxDQUFKO0FBQU0sVUFBSUMsQ0FBSixFQUFNQyxDQUFOLEVBQVFDLENBQVIsRUFBVXBDLENBQVYsRUFBWXlDLENBQVosRUFBY00sQ0FBZCxFQUFnQlUsQ0FBaEIsRUFBa0JDLENBQWxCLEVBQW9CRixDQUFwQixFQUFzQkssQ0FBdEIsRUFBd0JRLENBQXhCLEVBQTBCSSxDQUExQixFQUE0QkgsQ0FBNUIsRUFBOEJDLENBQTlCLEVBQWdDQyxDQUFoQyxFQUFrQ0osQ0FBbEM7QUFBb0MsYUFBT25DLENBQUMsR0FBQyxJQUFGLEVBQU9DLENBQUMsR0FBQ0QsQ0FBQyxDQUFDLENBQUQsQ0FBVixFQUFjRSxDQUFDLEdBQUNGLENBQUMsQ0FBQyxDQUFELENBQWpCLEVBQXFCRyxDQUFDLEdBQUNILENBQUMsQ0FBQyxDQUFELENBQXhCLEVBQTRCakMsQ0FBQyxHQUFDaUMsQ0FBQyxDQUFDLENBQUQsQ0FBL0IsRUFBbUNRLENBQUMsR0FBQ1IsQ0FBQyxDQUFDLENBQUQsQ0FBdEMsRUFBMENjLENBQUMsR0FBQ2QsQ0FBQyxDQUFDLENBQUQsQ0FBN0MsRUFBaUR3QixDQUFDLEdBQUN4QixDQUFDLENBQUMsQ0FBRCxDQUFwRCxFQUF3RHlCLENBQUMsR0FBQ3pCLENBQUMsQ0FBQyxDQUFELENBQTNELEVBQStEdUIsQ0FBQyxHQUFDdkIsQ0FBQyxDQUFDLENBQUQsQ0FBbEUsRUFBc0U0QixDQUFDLEdBQUM1QixDQUFDLENBQUMsQ0FBRCxDQUF6RSxFQUE2RW9DLENBQUMsR0FBQ3BDLENBQUMsQ0FBQyxFQUFELENBQWhGLEVBQXFGd0MsQ0FBQyxHQUFDeEMsQ0FBQyxDQUFDLEVBQUQsQ0FBeEYsRUFBNkZxQyxDQUFDLEdBQUNyQyxDQUFDLENBQUMsRUFBRCxDQUFoRyxFQUFxR3NDLENBQUMsR0FBQ3RDLENBQUMsQ0FBQyxFQUFELENBQXhHLEVBQTZHdUMsQ0FBQyxHQUFDdkMsQ0FBQyxDQUFDLEVBQUQsQ0FBaEgsRUFBcUhtQyxDQUFDLEdBQUNuQyxDQUFDLENBQUMsRUFBRCxDQUF4SCxFQUE2SCxDQUFDQyxDQUFDLEdBQUNhLENBQUYsR0FBSVosQ0FBQyxHQUFDTSxDQUFQLEtBQVc0QixDQUFDLEdBQUNELENBQUYsR0FBSUssQ0FBQyxHQUFDRCxDQUFqQixJQUFvQixDQUFDdEMsQ0FBQyxHQUFDdUIsQ0FBRixHQUFJckIsQ0FBQyxHQUFDSyxDQUFQLEtBQVdvQixDQUFDLEdBQUNPLENBQUYsR0FBSUssQ0FBQyxHQUFDRixDQUFqQixDQUFwQixHQUF3QyxDQUFDckMsQ0FBQyxHQUFDd0IsQ0FBRixHQUFJMUQsQ0FBQyxHQUFDeUMsQ0FBUCxLQUFXb0IsQ0FBQyxHQUFDVyxDQUFGLEdBQUlILENBQUMsR0FBQ0UsQ0FBakIsQ0FBeEMsR0FBNEQsQ0FBQ3BDLENBQUMsR0FBQ3NCLENBQUYsR0FBSXJCLENBQUMsR0FBQ1csQ0FBUCxLQUFXUyxDQUFDLEdBQUNZLENBQUYsR0FBSUssQ0FBQyxHQUFDSCxDQUFqQixDQUE1RCxHQUFnRixDQUFDbkMsQ0FBQyxHQUFDdUIsQ0FBRixHQUFJMUQsQ0FBQyxHQUFDK0MsQ0FBUCxLQUFXUyxDQUFDLEdBQUNnQixDQUFGLEdBQUlILENBQUMsR0FBQ0MsQ0FBakIsQ0FBaEYsR0FBb0csQ0FBQ2xDLENBQUMsR0FBQ3NCLENBQUYsR0FBSTFELENBQUMsR0FBQ3lELENBQVAsS0FBV0QsQ0FBQyxHQUFDZSxDQUFGLEdBQUlWLENBQUMsR0FBQ1MsQ0FBakIsQ0FBeE87QUFBNFA7O0FBQTVuTjs7QUFBNm5OLE1BQUk4TSxDQUFDLEdBQUMsSUFBSWpQLENBQUosRUFBTjs7QUFBWSxRQUFNa0MsQ0FBTixTQUFnQnZCLEtBQWhCLENBQXFCO0FBQUN2SCxJQUFBQSxXQUFXLENBQUMwRyxDQUFDLEdBQUMsQ0FBSCxFQUFLQyxDQUFDLEdBQUNELENBQVAsRUFBU0UsQ0FBQyxHQUFDRixDQUFYLEVBQWFHLENBQUMsR0FBQyxLQUFmLEVBQXFCO0FBQUMsYUFBTyxNQUFNSCxDQUFOLEVBQVFDLENBQVIsRUFBVUMsQ0FBVixHQUFhLEtBQUt5TixLQUFMLEdBQVd4TixDQUF4QixFQUEwQixLQUFLOE0sUUFBTCxHQUFjLE1BQUksQ0FBRSxDQUE5QyxFQUErQyxJQUF0RDtBQUEyRDs7QUFBSyxRQUFEOU8sQ0FBQyxHQUFFO0FBQUMsYUFBTyxLQUFLLENBQUwsQ0FBUDtBQUFlOztBQUFLLFFBQURBLENBQUMsQ0FBQzZCLENBQUQsRUFBRztBQUFDLFdBQUssQ0FBTCxJQUFRQSxDQUFSLEVBQVUsS0FBS2lOLFFBQUwsRUFBVjtBQUEwQjs7QUFBSyxRQUFENU8sQ0FBQyxHQUFFO0FBQUMsYUFBTyxLQUFLLENBQUwsQ0FBUDtBQUFlOztBQUFLLFFBQURBLENBQUMsQ0FBQzJCLENBQUQsRUFBRztBQUFDLFdBQUssQ0FBTCxJQUFRQSxDQUFSLEVBQVUsS0FBS2lOLFFBQUwsRUFBVjtBQUEwQjs7QUFBSyxRQUFEeE0sQ0FBQyxHQUFFO0FBQUMsYUFBTyxLQUFLLENBQUwsQ0FBUDtBQUFlOztBQUFLLFFBQURBLENBQUMsQ0FBQ1QsQ0FBRCxFQUFHO0FBQUMsV0FBSyxDQUFMLElBQVFBLENBQVIsRUFBVSxLQUFLaU4sUUFBTCxFQUFWO0FBQTBCOztBQUFBMU8sSUFBQUEsR0FBRyxDQUFDeUIsQ0FBRCxFQUFHQyxDQUFDLEdBQUNELENBQUwsRUFBT0UsQ0FBQyxHQUFDRixDQUFULEVBQVc7QUFBQyxhQUFPQSxDQUFDLENBQUM5QixNQUFGLEdBQVMsS0FBS2tCLElBQUwsQ0FBVVksQ0FBVixDQUFULElBQXVCLEtBQUssQ0FBTCxJQUFRQSxDQUFSLEVBQVUsS0FBSyxDQUFMLElBQVFDLENBQWxCLEVBQW9CLEtBQUssQ0FBTCxJQUFRQyxDQUE1QixFQUE4QixLQUFLK00sUUFBTCxFQUE5QixFQUE4QyxJQUFyRSxDQUFQO0FBQWtGOztBQUFBN04sSUFBQUEsSUFBSSxDQUFDWSxDQUFELEVBQUc7QUFBQyxhQUFPLEtBQUssQ0FBTCxJQUFRQSxDQUFDLENBQUMsQ0FBRCxDQUFULEVBQWEsS0FBSyxDQUFMLElBQVFBLENBQUMsQ0FBQyxDQUFELENBQXRCLEVBQTBCLEtBQUssQ0FBTCxJQUFRQSxDQUFDLENBQUMsQ0FBRCxDQUFuQyxFQUF1QyxJQUE5QztBQUFtRDs7QUFBQW9QLElBQUFBLE9BQU8sQ0FBQ3BQLENBQUQsRUFBRztBQUFDLGFBQU8sS0FBSzJOLEtBQUwsR0FBVzNOLENBQVgsRUFBYSxLQUFLaU4sUUFBTCxFQUFiLEVBQTZCLElBQXBDO0FBQXlDOztBQUFBb0MsSUFBQUEsa0JBQWtCLENBQUNyUCxDQUFELEVBQUdDLENBQUMsR0FBQyxLQUFLME4sS0FBVixFQUFnQjtBQUFDLGFBQU8sVUFBUzFOLENBQVQsRUFBV0QsQ0FBWCxFQUFhRSxDQUFDLEdBQUMsS0FBZixFQUFxQjtBQUFDLGtCQUFRQSxDQUFSLElBQVdELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS25CLElBQUksQ0FBQ3dRLElBQUwsQ0FBVXhRLElBQUksQ0FBQytGLEdBQUwsQ0FBUy9GLElBQUksQ0FBQ0MsR0FBTCxDQUFTaUIsQ0FBQyxDQUFDLENBQUQsQ0FBVixFQUFjLENBQUMsQ0FBZixDQUFULEVBQTJCLENBQTNCLENBQVYsQ0FBTCxFQUE4QyxTQUFPbEIsSUFBSSxDQUFDeVEsR0FBTCxDQUFTdlAsQ0FBQyxDQUFDLENBQUQsQ0FBVixDQUFQLElBQXVCQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtuQixJQUFJLENBQUMwUSxLQUFMLENBQVcsQ0FBQ3hQLENBQUMsQ0FBQyxDQUFELENBQWIsRUFBaUJBLENBQUMsQ0FBQyxFQUFELENBQWxCLENBQUwsRUFBNkJDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS25CLElBQUksQ0FBQzBRLEtBQUwsQ0FBVyxDQUFDeFAsQ0FBQyxDQUFDLENBQUQsQ0FBYixFQUFpQkEsQ0FBQyxDQUFDLENBQUQsQ0FBbEIsQ0FBekQsS0FBa0ZDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS25CLElBQUksQ0FBQzBRLEtBQUwsQ0FBV3hQLENBQUMsQ0FBQyxDQUFELENBQVosRUFBZ0JBLENBQUMsQ0FBQyxDQUFELENBQWpCLENBQUwsRUFBMkJDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFsSCxDQUF6RCxJQUErSyxVQUFRQyxDQUFSLElBQVdELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS25CLElBQUksQ0FBQ3dRLElBQUwsQ0FBVSxDQUFDeFEsSUFBSSxDQUFDK0YsR0FBTCxDQUFTL0YsSUFBSSxDQUFDQyxHQUFMLENBQVNpQixDQUFDLENBQUMsQ0FBRCxDQUFWLEVBQWMsQ0FBQyxDQUFmLENBQVQsRUFBMkIsQ0FBM0IsQ0FBWCxDQUFMLEVBQStDLFNBQU9sQixJQUFJLENBQUN5USxHQUFMLENBQVN2UCxDQUFDLENBQUMsQ0FBRCxDQUFWLENBQVAsSUFBdUJDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS25CLElBQUksQ0FBQzBRLEtBQUwsQ0FBV3hQLENBQUMsQ0FBQyxDQUFELENBQVosRUFBZ0JBLENBQUMsQ0FBQyxFQUFELENBQWpCLENBQUwsRUFBNEJDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS25CLElBQUksQ0FBQzBRLEtBQUwsQ0FBV3hQLENBQUMsQ0FBQyxDQUFELENBQVosRUFBZ0JBLENBQUMsQ0FBQyxDQUFELENBQWpCLENBQXhELEtBQWdGQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtuQixJQUFJLENBQUMwUSxLQUFMLENBQVcsQ0FBQ3hQLENBQUMsQ0FBQyxDQUFELENBQWIsRUFBaUJBLENBQUMsQ0FBQyxDQUFELENBQWxCLENBQUwsRUFBNEJDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFqSCxDQUExRCxJQUErSyxVQUFRQyxDQUFSLElBQVdELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS25CLElBQUksQ0FBQ3dRLElBQUwsQ0FBVXhRLElBQUksQ0FBQytGLEdBQUwsQ0FBUy9GLElBQUksQ0FBQ0MsR0FBTCxDQUFTaUIsQ0FBQyxDQUFDLENBQUQsQ0FBVixFQUFjLENBQUMsQ0FBZixDQUFULEVBQTJCLENBQTNCLENBQVYsQ0FBTCxFQUE4QyxTQUFPbEIsSUFBSSxDQUFDeVEsR0FBTCxDQUFTdlAsQ0FBQyxDQUFDLENBQUQsQ0FBVixDQUFQLElBQXVCQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtuQixJQUFJLENBQUMwUSxLQUFMLENBQVcsQ0FBQ3hQLENBQUMsQ0FBQyxDQUFELENBQWIsRUFBaUJBLENBQUMsQ0FBQyxFQUFELENBQWxCLENBQUwsRUFBNkJDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS25CLElBQUksQ0FBQzBRLEtBQUwsQ0FBVyxDQUFDeFAsQ0FBQyxDQUFDLENBQUQsQ0FBYixFQUFpQkEsQ0FBQyxDQUFDLENBQUQsQ0FBbEIsQ0FBekQsS0FBa0ZDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFMLEVBQU9BLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS25CLElBQUksQ0FBQzBRLEtBQUwsQ0FBV3hQLENBQUMsQ0FBQyxDQUFELENBQVosRUFBZ0JBLENBQUMsQ0FBQyxDQUFELENBQWpCLENBQTlGLENBQXpELElBQStLLFVBQVFFLENBQVIsSUFBV0QsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLbkIsSUFBSSxDQUFDd1EsSUFBTCxDQUFVLENBQUN4USxJQUFJLENBQUMrRixHQUFMLENBQVMvRixJQUFJLENBQUNDLEdBQUwsQ0FBU2lCLENBQUMsQ0FBQyxDQUFELENBQVYsRUFBYyxDQUFDLENBQWYsQ0FBVCxFQUEyQixDQUEzQixDQUFYLENBQUwsRUFBK0MsU0FBT2xCLElBQUksQ0FBQ3lRLEdBQUwsQ0FBU3ZQLENBQUMsQ0FBQyxDQUFELENBQVYsQ0FBUCxJQUF1QkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLbkIsSUFBSSxDQUFDMFEsS0FBTCxDQUFXeFAsQ0FBQyxDQUFDLENBQUQsQ0FBWixFQUFnQkEsQ0FBQyxDQUFDLEVBQUQsQ0FBakIsQ0FBTCxFQUE0QkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLbkIsSUFBSSxDQUFDMFEsS0FBTCxDQUFXeFAsQ0FBQyxDQUFDLENBQUQsQ0FBWixFQUFnQkEsQ0FBQyxDQUFDLENBQUQsQ0FBakIsQ0FBeEQsS0FBZ0ZDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFMLEVBQU9BLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS25CLElBQUksQ0FBQzBRLEtBQUwsQ0FBVyxDQUFDeFAsQ0FBQyxDQUFDLENBQUQsQ0FBYixFQUFpQkEsQ0FBQyxDQUFDLENBQUQsQ0FBbEIsQ0FBNUYsQ0FBMUQsSUFBK0ssVUFBUUUsQ0FBUixJQUFXRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtuQixJQUFJLENBQUN3USxJQUFMLENBQVV4USxJQUFJLENBQUMrRixHQUFMLENBQVMvRixJQUFJLENBQUNDLEdBQUwsQ0FBU2lCLENBQUMsQ0FBQyxDQUFELENBQVYsRUFBYyxDQUFDLENBQWYsQ0FBVCxFQUEyQixDQUEzQixDQUFWLENBQUwsRUFBOEMsU0FBT2xCLElBQUksQ0FBQ3lRLEdBQUwsQ0FBU3ZQLENBQUMsQ0FBQyxDQUFELENBQVYsQ0FBUCxJQUF1QkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLbkIsSUFBSSxDQUFDMFEsS0FBTCxDQUFXLENBQUN4UCxDQUFDLENBQUMsQ0FBRCxDQUFiLEVBQWlCQSxDQUFDLENBQUMsQ0FBRCxDQUFsQixDQUFMLEVBQTRCQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtuQixJQUFJLENBQUMwUSxLQUFMLENBQVcsQ0FBQ3hQLENBQUMsQ0FBQyxDQUFELENBQWIsRUFBaUJBLENBQUMsQ0FBQyxDQUFELENBQWxCLENBQXhELEtBQWlGQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBTCxFQUFPQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtuQixJQUFJLENBQUMwUSxLQUFMLENBQVd4UCxDQUFDLENBQUMsQ0FBRCxDQUFaLEVBQWdCQSxDQUFDLENBQUMsRUFBRCxDQUFqQixDQUE3RixDQUF6RCxJQUErSyxVQUFRRSxDQUFSLEtBQVlELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS25CLElBQUksQ0FBQ3dRLElBQUwsQ0FBVSxDQUFDeFEsSUFBSSxDQUFDK0YsR0FBTCxDQUFTL0YsSUFBSSxDQUFDQyxHQUFMLENBQVNpQixDQUFDLENBQUMsQ0FBRCxDQUFWLEVBQWMsQ0FBQyxDQUFmLENBQVQsRUFBMkIsQ0FBM0IsQ0FBWCxDQUFMLEVBQStDLFNBQU9sQixJQUFJLENBQUN5USxHQUFMLENBQVN2UCxDQUFDLENBQUMsQ0FBRCxDQUFWLENBQVAsSUFBdUJDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS25CLElBQUksQ0FBQzBRLEtBQUwsQ0FBV3hQLENBQUMsQ0FBQyxDQUFELENBQVosRUFBZ0JBLENBQUMsQ0FBQyxDQUFELENBQWpCLENBQUwsRUFBMkJDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS25CLElBQUksQ0FBQzBRLEtBQUwsQ0FBV3hQLENBQUMsQ0FBQyxDQUFELENBQVosRUFBZ0JBLENBQUMsQ0FBQyxDQUFELENBQWpCLENBQXZELEtBQStFQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtuQixJQUFJLENBQUMwUSxLQUFMLENBQVcsQ0FBQ3hQLENBQUMsQ0FBQyxDQUFELENBQWIsRUFBaUJBLENBQUMsQ0FBQyxFQUFELENBQWxCLENBQUwsRUFBNkJDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFqSCxDQUEzRCxDQUEzMkI7QUFBMmhDLE9BQWpqQyxDQUFrakMsSUFBbGpDLEVBQXVqQ0QsQ0FBdmpDLEVBQXlqQ0MsQ0FBempDLEdBQTRqQyxJQUFua0M7QUFBd2tDOztBQUFBeU8sSUFBQUEsY0FBYyxDQUFDMU8sQ0FBRCxFQUFHQyxDQUFDLEdBQUMsS0FBSzBOLEtBQVYsRUFBZ0I7QUFBQyxhQUFPd0IsQ0FBQyxDQUFDVCxjQUFGLENBQWlCMU8sQ0FBakIsR0FBb0IsS0FBS3FQLGtCQUFMLENBQXdCRixDQUF4QixFQUEwQmxQLENBQTFCLENBQTNCO0FBQXdEOztBQUE3cEQ7O0FBQThwRCxRQUFNYSxDQUFOLENBQU87QUFBQ3hILElBQUFBLFdBQVcsR0FBRTtBQUFDLFdBQUttVyxNQUFMLEdBQVksSUFBWixFQUFpQixLQUFLQyxRQUFMLEdBQWMsRUFBL0IsRUFBa0MsS0FBS0MsT0FBTCxHQUFhLENBQUMsQ0FBaEQsRUFBa0QsS0FBS0MsTUFBTCxHQUFZLElBQUkxUCxDQUFKLEVBQTlELEVBQW9FLEtBQUsyUCxXQUFMLEdBQWlCLElBQUkzUCxDQUFKLEVBQXJGLEVBQTJGLEtBQUs0UCxnQkFBTCxHQUFzQixDQUFDLENBQWxILEVBQW9ILEtBQUs1VCxRQUFMLEdBQWMsSUFBSStELENBQUosRUFBbEksRUFBd0ksS0FBSzhQLFVBQUwsR0FBZ0IsSUFBSTVQLENBQUosRUFBeEosRUFBOEosS0FBSzBCLEtBQUwsR0FBVyxJQUFJNUIsQ0FBSixDQUFNLENBQU4sQ0FBekssRUFBa0wsS0FBSytQLFFBQUwsR0FBYyxJQUFJNU4sQ0FBSixFQUFoTSxFQUFzTSxLQUFLNk4sRUFBTCxHQUFRLElBQUloUSxDQUFKLENBQU0sQ0FBTixFQUFRLENBQVIsRUFBVSxDQUFWLENBQTlNLEVBQTJOLEtBQUsrUCxRQUFMLENBQWMvQyxRQUFkLEdBQXVCLE1BQUksS0FBSzhDLFVBQUwsQ0FBZ0JyQyxTQUFoQixDQUEwQixLQUFLc0MsUUFBL0IsQ0FBdFAsRUFBK1IsS0FBS0QsVUFBTCxDQUFnQjlDLFFBQWhCLEdBQXlCLE1BQUksS0FBSytDLFFBQUwsQ0FBY3RCLGNBQWQsQ0FBNkIsS0FBS3FCLFVBQWxDLENBQTVUO0FBQTBXOztBQUFBRyxJQUFBQSxTQUFTLENBQUNsUSxDQUFELEVBQUdDLENBQUMsR0FBQyxDQUFDLENBQU4sRUFBUTtBQUFDQSxNQUFBQSxDQUFDLElBQUUsS0FBS3dQLE1BQVIsSUFBZ0J6UCxDQUFDLEtBQUcsS0FBS3lQLE1BQXpCLElBQWlDLEtBQUtBLE1BQUwsQ0FBWVUsV0FBWixDQUF3QixJQUF4QixFQUE2QixDQUFDLENBQTlCLENBQWpDLEVBQWtFLEtBQUtWLE1BQUwsR0FBWXpQLENBQTlFLEVBQWdGQyxDQUFDLElBQUVELENBQUgsSUFBTUEsQ0FBQyxDQUFDb1EsUUFBRixDQUFXLElBQVgsRUFBZ0IsQ0FBQyxDQUFqQixDQUF0RjtBQUEwRzs7QUFBQUEsSUFBQUEsUUFBUSxDQUFDcFEsQ0FBRCxFQUFHQyxDQUFDLEdBQUMsQ0FBQyxDQUFOLEVBQVE7QUFBQyxPQUFDLEtBQUt5UCxRQUFMLENBQWNXLE9BQWQsQ0FBc0JyUSxDQUF0QixDQUFELElBQTJCLEtBQUswUCxRQUFMLENBQWNsRSxJQUFkLENBQW1CeEwsQ0FBbkIsQ0FBM0IsRUFBaURDLENBQUMsSUFBRUQsQ0FBQyxDQUFDa1EsU0FBRixDQUFZLElBQVosRUFBaUIsQ0FBQyxDQUFsQixDQUFwRDtBQUF5RTs7QUFBQUMsSUFBQUEsV0FBVyxDQUFDblEsQ0FBRCxFQUFHQyxDQUFDLEdBQUMsQ0FBQyxDQUFOLEVBQVE7QUFBQyxPQUFDLEtBQUt5UCxRQUFMLENBQWNXLE9BQWQsQ0FBc0JyUSxDQUF0QixDQUFELElBQTJCLEtBQUswUCxRQUFMLENBQWNZLE1BQWQsQ0FBcUIsS0FBS1osUUFBTCxDQUFjVyxPQUFkLENBQXNCclEsQ0FBdEIsQ0FBckIsRUFBOEMsQ0FBOUMsQ0FBM0IsRUFBNEVDLENBQUMsSUFBRUQsQ0FBQyxDQUFDa1EsU0FBRixDQUFZLElBQVosRUFBaUIsQ0FBQyxDQUFsQixDQUEvRTtBQUFvRzs7QUFBQUssSUFBQUEsaUJBQWlCLENBQUN2USxDQUFELEVBQUc7QUFBQyxXQUFLOFAsZ0JBQUwsSUFBdUIsS0FBS1UsWUFBTCxFQUF2QixFQUEyQyxDQUFDLEtBQUtDLHNCQUFMLElBQTZCelEsQ0FBOUIsTUFBbUMsU0FBTyxLQUFLeVAsTUFBWixHQUFtQixLQUFLSSxXQUFMLENBQWlCelEsSUFBakIsQ0FBc0IsS0FBS3dRLE1BQTNCLENBQW5CLEdBQXNELEtBQUtDLFdBQUwsQ0FBaUI1TyxRQUFqQixDQUEwQixLQUFLd08sTUFBTCxDQUFZSSxXQUF0QyxFQUFrRCxLQUFLRCxNQUF2RCxDQUF0RCxFQUFxSCxLQUFLYSxzQkFBTCxHQUE0QixDQUFDLENBQWxKLEVBQW9KelEsQ0FBQyxHQUFDLENBQUMsQ0FBMUwsQ0FBM0M7O0FBQXdPLFdBQUksSUFBSUMsQ0FBQyxHQUFDLENBQU4sRUFBUUMsQ0FBQyxHQUFDLEtBQUt3UCxRQUFMLENBQWN4UixNQUE1QixFQUFtQytCLENBQUMsR0FBQ0MsQ0FBckMsRUFBdUNELENBQUMsRUFBeEMsRUFBMkMsS0FBS3lQLFFBQUwsQ0FBY3pQLENBQWQsRUFBaUJzUSxpQkFBakIsQ0FBbUN2USxDQUFuQztBQUFzQzs7QUFBQXdRLElBQUFBLFlBQVksR0FBRTtBQUFDLFdBQUtaLE1BQUwsQ0FBWWhCLE9BQVosQ0FBb0IsS0FBS21CLFVBQXpCLEVBQW9DLEtBQUs3VCxRQUF6QyxFQUFrRCxLQUFLMkYsS0FBdkQsR0FBOEQsS0FBSzRPLHNCQUFMLEdBQTRCLENBQUMsQ0FBM0Y7QUFBNkY7O0FBQUFDLElBQUFBLFFBQVEsQ0FBQ3pRLENBQUQsRUFBRztBQUFDLFVBQUcsQ0FBQ0EsQ0FBQyxDQUFDLElBQUQsQ0FBTCxFQUFZLEtBQUksSUFBSUQsQ0FBQyxHQUFDLENBQU4sRUFBUUUsQ0FBQyxHQUFDLEtBQUt3UCxRQUFMLENBQWN4UixNQUE1QixFQUFtQzhCLENBQUMsR0FBQ0UsQ0FBckMsRUFBdUNGLENBQUMsRUFBeEMsRUFBMkMsS0FBSzBQLFFBQUwsQ0FBYzFQLENBQWQsRUFBaUIwUSxRQUFqQixDQUEwQnpRLENBQTFCO0FBQTZCOztBQUFBMFEsSUFBQUEsU0FBUyxHQUFFO0FBQUMsV0FBS2YsTUFBTCxDQUFZZCxjQUFaLENBQTJCLEtBQUs1UyxRQUFoQyxHQUEwQyxLQUFLMFQsTUFBTCxDQUFZZixXQUFaLENBQXdCLEtBQUtrQixVQUE3QixDQUExQyxFQUFtRixLQUFLSCxNQUFMLENBQVliLFVBQVosQ0FBdUIsS0FBS2xOLEtBQTVCLENBQW5GLEVBQXNILEtBQUttTyxRQUFMLENBQWN0QixjQUFkLENBQTZCLEtBQUtxQixVQUFsQyxDQUF0SDtBQUFvSzs7QUFBQWQsSUFBQUEsTUFBTSxDQUFDalAsQ0FBRCxFQUFHQyxDQUFDLEdBQUMsQ0FBQyxDQUFOLEVBQVE7QUFBQ0EsTUFBQUEsQ0FBQyxHQUFDLEtBQUsyUCxNQUFMLENBQVlYLE1BQVosQ0FBbUIsS0FBSy9TLFFBQXhCLEVBQWlDOEQsQ0FBakMsRUFBbUMsS0FBS2lRLEVBQXhDLENBQUQsR0FBNkMsS0FBS0wsTUFBTCxDQUFZWCxNQUFaLENBQW1CalAsQ0FBbkIsRUFBcUIsS0FBSzlELFFBQTFCLEVBQW1DLEtBQUsrVCxFQUF4QyxDQUE5QyxFQUEwRixLQUFLTCxNQUFMLENBQVlmLFdBQVosQ0FBd0IsS0FBS2tCLFVBQTdCLENBQTFGLEVBQW1JLEtBQUtDLFFBQUwsQ0FBY3RCLGNBQWQsQ0FBNkIsS0FBS3FCLFVBQWxDLENBQW5JO0FBQWlMOztBQUFqbEQ7O0FBQWtsRCxNQUFJYSxDQUFDLEdBQUMsSUFBSTFRLENBQUosRUFBTjtBQUFBLE1BQVkyUSxDQUFDLEdBQUMsSUFBSTVRLENBQUosRUFBZDtBQUFBLE1BQW9CNlEsQ0FBQyxHQUFDLElBQUk3USxDQUFKLEVBQXRCOztBQUE0QixXQUFTOFEsQ0FBVCxDQUFXL1EsQ0FBWCxFQUFhQyxDQUFiLEVBQWVDLENBQWYsRUFBaUI7QUFBQyxRQUFJQyxDQUFDLEdBQUNGLENBQUMsQ0FBQyxDQUFELENBQVA7QUFBQSxRQUFXbEMsQ0FBQyxHQUFDa0MsQ0FBQyxDQUFDLENBQUQsQ0FBZDtBQUFBLFFBQWtCTyxDQUFDLEdBQUNQLENBQUMsQ0FBQyxDQUFELENBQXJCO0FBQUEsUUFBeUJhLENBQUMsR0FBQ2IsQ0FBQyxDQUFDLENBQUQsQ0FBNUI7QUFBQSxRQUFnQ3VCLENBQUMsR0FBQ3ZCLENBQUMsQ0FBQyxDQUFELENBQW5DO0FBQUEsUUFBdUN3QixDQUFDLEdBQUN4QixDQUFDLENBQUMsQ0FBRCxDQUExQztBQUFBLFFBQThDc0IsQ0FBQyxHQUFDdEIsQ0FBQyxDQUFDLENBQUQsQ0FBakQ7QUFBQSxRQUFxRDJCLENBQUMsR0FBQzNCLENBQUMsQ0FBQyxDQUFELENBQXhEO0FBQUEsUUFBNERtQyxDQUFDLEdBQUNuQyxDQUFDLENBQUMsQ0FBRCxDQUEvRDtBQUFBLFFBQW1FdUMsQ0FBQyxHQUFDdEMsQ0FBQyxDQUFDLENBQUQsQ0FBdEU7QUFBQSxRQUEwRW1DLENBQUMsR0FBQ25DLENBQUMsQ0FBQyxDQUFELENBQTdFO0FBQUEsUUFBaUZvQyxDQUFDLEdBQUNwQyxDQUFDLENBQUMsQ0FBRCxDQUFwRjtBQUFBLFFBQXdGcUMsQ0FBQyxHQUFDckMsQ0FBQyxDQUFDLENBQUQsQ0FBM0Y7QUFBQSxRQUErRmlDLENBQUMsR0FBQ2pDLENBQUMsQ0FBQyxDQUFELENBQWxHO0FBQUEsUUFBc0dxSCxDQUFDLEdBQUNySCxDQUFDLENBQUMsQ0FBRCxDQUF6RztBQUFBLFFBQTZHdUgsQ0FBQyxHQUFDdkgsQ0FBQyxDQUFDLENBQUQsQ0FBaEg7QUFBQSxRQUFvSGhCLENBQUMsR0FBQ2dCLENBQUMsQ0FBQyxDQUFELENBQXZIO0FBQUEsUUFBMkhHLENBQUMsR0FBQ0gsQ0FBQyxDQUFDLENBQUQsQ0FBOUg7QUFBa0ksV0FBT0YsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLd0MsQ0FBQyxHQUFDckMsQ0FBRixHQUFJa0MsQ0FBQyxHQUFDdkIsQ0FBTixHQUFRd0IsQ0FBQyxHQUFDZixDQUFmLEVBQWlCdkIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLd0MsQ0FBQyxHQUFDekUsQ0FBRixHQUFJc0UsQ0FBQyxHQUFDYixDQUFOLEdBQVFjLENBQUMsR0FBQ1YsQ0FBaEMsRUFBa0M1QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUt3QyxDQUFDLEdBQUNoQyxDQUFGLEdBQUk2QixDQUFDLEdBQUNaLENBQU4sR0FBUWEsQ0FBQyxHQUFDRixDQUFqRCxFQUFtRHBDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3VDLENBQUMsR0FBQ3BDLENBQUYsR0FBSWdDLENBQUMsR0FBQ3JCLENBQU4sR0FBUXlHLENBQUMsR0FBQ2hHLENBQWxFLEVBQW9FdkIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLdUMsQ0FBQyxHQUFDeEUsQ0FBRixHQUFJb0UsQ0FBQyxHQUFDWCxDQUFOLEdBQVErRixDQUFDLEdBQUMzRixDQUFuRixFQUFxRjVCLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3VDLENBQUMsR0FBQy9CLENBQUYsR0FBSTJCLENBQUMsR0FBQ1YsQ0FBTixHQUFROEYsQ0FBQyxHQUFDbkYsQ0FBcEcsRUFBc0dwQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUt5SCxDQUFDLEdBQUN0SCxDQUFGLEdBQUlqQixDQUFDLEdBQUM0QixDQUFOLEdBQVFULENBQUMsR0FBQ2tCLENBQXJILEVBQXVIdkIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLeUgsQ0FBQyxHQUFDMUosQ0FBRixHQUFJbUIsQ0FBQyxHQUFDc0MsQ0FBTixHQUFRbkIsQ0FBQyxHQUFDdUIsQ0FBdEksRUFBd0k1QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUt5SCxDQUFDLEdBQUNqSCxDQUFGLEdBQUl0QixDQUFDLEdBQUN1QyxDQUFOLEdBQVFwQixDQUFDLEdBQUMrQixDQUF2SixFQUF5SnBDLENBQWhLO0FBQWtLOztBQUFBLFFBQU13QyxDQUFOLFNBQWdCM0IsS0FBaEIsQ0FBcUI7QUFBQ3ZILElBQUFBLFdBQVcsQ0FBQzBHLENBQUMsR0FBQyxDQUFILEVBQUtDLENBQUMsR0FBQyxDQUFQLEVBQVNDLENBQUMsR0FBQyxDQUFYLEVBQWFDLENBQUMsR0FBQyxDQUFmLEVBQWlCcEMsQ0FBQyxHQUFDLENBQW5CLEVBQXFCeUMsQ0FBQyxHQUFDLENBQXZCLEVBQXlCTSxDQUFDLEdBQUMsQ0FBM0IsRUFBNkJVLENBQUMsR0FBQyxDQUEvQixFQUFpQ0MsQ0FBQyxHQUFDLENBQW5DLEVBQXFDO0FBQUMsYUFBTyxNQUFNekIsQ0FBTixFQUFRQyxDQUFSLEVBQVVDLENBQVYsRUFBWUMsQ0FBWixFQUFjcEMsQ0FBZCxFQUFnQnlDLENBQWhCLEVBQWtCTSxDQUFsQixFQUFvQlUsQ0FBcEIsRUFBc0JDLENBQXRCLEdBQXlCLElBQWhDO0FBQXFDOztBQUFBbEQsSUFBQUEsR0FBRyxDQUFDMEIsQ0FBRCxFQUFHbUMsQ0FBSCxFQUFLSSxDQUFMLEVBQU9ILENBQVAsRUFBU0MsQ0FBVCxFQUFXQyxDQUFYLEVBQWFKLENBQWIsRUFBZW9GLENBQWYsRUFBaUJFLENBQWpCLEVBQW1CO0FBQUMsVUFBSXpILENBQUosRUFBTUUsQ0FBTixFQUFRQyxDQUFSLEVBQVVwQyxDQUFWLEVBQVl5QyxDQUFaLEVBQWNNLENBQWQsRUFBZ0JVLENBQWhCLEVBQWtCQyxDQUFsQixFQUFvQkYsQ0FBcEIsRUFBc0JLLENBQXRCO0FBQXdCLGFBQU8zQixDQUFDLENBQUMvQixNQUFGLEdBQVMsS0FBS2tCLElBQUwsQ0FBVWEsQ0FBVixDQUFULElBQXVCRCxDQUFDLEdBQUMsSUFBRixFQUFPRSxDQUFDLEdBQUNELENBQVQsRUFBV0UsQ0FBQyxHQUFDaUMsQ0FBYixFQUFlckUsQ0FBQyxHQUFDeUUsQ0FBakIsRUFBbUJoQyxDQUFDLEdBQUM2QixDQUFyQixFQUF1QnZCLENBQUMsR0FBQ3dCLENBQXpCLEVBQTJCZCxDQUFDLEdBQUNlLENBQTdCLEVBQStCZCxDQUFDLEdBQUNVLENBQWpDLEVBQW1DWixDQUFDLEdBQUNnRyxDQUFyQyxFQUF1QzNGLENBQUMsR0FBQzZGLENBQXpDLEVBQTJDekgsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRSxDQUFoRCxFQUFrREYsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRyxDQUF2RCxFQUF5REgsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLakMsQ0FBOUQsRUFBZ0VpQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtRLENBQXJFLEVBQXVFUixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtjLENBQTVFLEVBQThFZCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUt3QixDQUFuRixFQUFxRnhCLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3lCLENBQTFGLEVBQTRGekIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLdUIsQ0FBakcsRUFBbUd2QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUs0QixDQUF4RyxFQUEwRyxJQUFqSSxDQUFQO0FBQThJOztBQUFBbU0sSUFBQUEsU0FBUyxDQUFDekwsQ0FBRCxFQUFHQyxDQUFDLEdBQUMsSUFBTCxFQUFVO0FBQUMsVUFBSXZDLENBQUosRUFBTUMsQ0FBTixFQUFRbEMsQ0FBUjtBQUFVLFVBQUl5QyxDQUFKLEVBQU1NLENBQU4sRUFBUVUsQ0FBUixFQUFVQyxDQUFWLEVBQVlGLENBQVosRUFBY0ssQ0FBZCxFQUFnQlEsQ0FBaEIsRUFBa0JJLENBQWxCLEVBQW9CSCxDQUFwQixFQUFzQm5DLENBQXRCLEVBQXdCQyxDQUF4QjtBQUEwQixhQUFPSCxDQUFDLEdBQUMsSUFBRixFQUFPQyxDQUFDLEdBQUNzQyxDQUFULEVBQVd4RSxDQUFDLEdBQUN1RSxDQUFiLEVBQWU5QixDQUFDLEdBQUNQLENBQUMsQ0FBQyxDQUFELENBQWxCLEVBQXNCYSxDQUFDLEdBQUNiLENBQUMsQ0FBQyxDQUFELENBQXpCLEVBQTZCdUIsQ0FBQyxHQUFDdkIsQ0FBQyxDQUFDLENBQUQsQ0FBaEMsRUFBb0N3QixDQUFDLEdBQUN4QixDQUFDLENBQUMsQ0FBRCxDQUF2QyxFQUEyQ3NCLENBQUMsR0FBQ3RCLENBQUMsQ0FBQyxDQUFELENBQTlDLEVBQWtEMkIsQ0FBQyxHQUFDM0IsQ0FBQyxDQUFDLENBQUQsQ0FBckQsRUFBeURtQyxDQUFDLEdBQUNuQyxDQUFDLENBQUMsQ0FBRCxDQUE1RCxFQUFnRXVDLENBQUMsR0FBQ3ZDLENBQUMsQ0FBQyxDQUFELENBQW5FLEVBQXVFb0MsQ0FBQyxHQUFDcEMsQ0FBQyxDQUFDLENBQUQsQ0FBMUUsRUFBOEVDLENBQUMsR0FBQ25DLENBQUMsQ0FBQyxDQUFELENBQWpGLEVBQXFGb0MsQ0FBQyxHQUFDcEMsQ0FBQyxDQUFDLENBQUQsQ0FBeEYsRUFBNEZpQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtRLENBQWpHLEVBQW1HUixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtjLENBQXhHLEVBQTBHZCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUt3QixDQUEvRyxFQUFpSHhCLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3lCLENBQXRILEVBQXdIekIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLdUIsQ0FBN0gsRUFBK0h2QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUs0QixDQUFwSSxFQUFzSTVCLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0UsQ0FBQyxHQUFDTSxDQUFGLEdBQUlMLENBQUMsR0FBQ3NCLENBQU4sR0FBUVcsQ0FBbkosRUFBcUpwQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtFLENBQUMsR0FBQ1ksQ0FBRixHQUFJWCxDQUFDLEdBQUNvQixDQUFOLEdBQVFpQixDQUFsSyxFQUFvS3hDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0UsQ0FBQyxHQUFDc0IsQ0FBRixHQUFJckIsQ0FBQyxHQUFDeUIsQ0FBTixHQUFRUyxDQUFqTCxFQUFtTCxJQUExTDtBQUErTDs7QUFBQTJPLElBQUFBLE1BQU0sQ0FBQzFPLENBQUQsRUFBR0MsQ0FBQyxHQUFDLElBQUwsRUFBVTtBQUFDLFVBQUl2QyxDQUFKLEVBQU1DLENBQU4sRUFBUWxDLENBQVI7QUFBVSxVQUFJeUMsQ0FBSixFQUFNTSxDQUFOLEVBQVFVLENBQVIsRUFBVUMsQ0FBVixFQUFZRixDQUFaLEVBQWNLLENBQWQsRUFBZ0JRLENBQWhCLEVBQWtCSSxDQUFsQixFQUFvQkgsQ0FBcEIsRUFBc0JuQyxDQUF0QixFQUF3QkMsQ0FBeEI7QUFBMEIsYUFBT0gsQ0FBQyxHQUFDLElBQUYsRUFBT0MsQ0FBQyxHQUFDc0MsQ0FBVCxFQUFXeEUsQ0FBQyxHQUFDdUUsQ0FBYixFQUFlOUIsQ0FBQyxHQUFDUCxDQUFDLENBQUMsQ0FBRCxDQUFsQixFQUFzQmEsQ0FBQyxHQUFDYixDQUFDLENBQUMsQ0FBRCxDQUF6QixFQUE2QnVCLENBQUMsR0FBQ3ZCLENBQUMsQ0FBQyxDQUFELENBQWhDLEVBQW9Dd0IsQ0FBQyxHQUFDeEIsQ0FBQyxDQUFDLENBQUQsQ0FBdkMsRUFBMkNzQixDQUFDLEdBQUN0QixDQUFDLENBQUMsQ0FBRCxDQUE5QyxFQUFrRDJCLENBQUMsR0FBQzNCLENBQUMsQ0FBQyxDQUFELENBQXJELEVBQXlEbUMsQ0FBQyxHQUFDbkMsQ0FBQyxDQUFDLENBQUQsQ0FBNUQsRUFBZ0V1QyxDQUFDLEdBQUN2QyxDQUFDLENBQUMsQ0FBRCxDQUFuRSxFQUF1RW9DLENBQUMsR0FBQ3BDLENBQUMsQ0FBQyxDQUFELENBQTFFLEVBQThFQyxDQUFDLEdBQUNwQixJQUFJLENBQUNzTyxHQUFMLENBQVNyUCxDQUFULENBQWhGLEVBQTRGb0MsQ0FBQyxHQUFDckIsSUFBSSxDQUFDdU8sR0FBTCxDQUFTdFAsQ0FBVCxDQUE5RixFQUEwR2lDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0csQ0FBQyxHQUFDSyxDQUFGLEdBQUlOLENBQUMsR0FBQ3VCLENBQXJILEVBQXVIekIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRyxDQUFDLEdBQUNXLENBQUYsR0FBSVosQ0FBQyxHQUFDcUIsQ0FBbEksRUFBb0l2QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtHLENBQUMsR0FBQ3FCLENBQUYsR0FBSXRCLENBQUMsR0FBQzBCLENBQS9JLEVBQWlKNUIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRyxDQUFDLEdBQUNzQixDQUFGLEdBQUl2QixDQUFDLEdBQUNNLENBQTVKLEVBQThKUixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtHLENBQUMsR0FBQ29CLENBQUYsR0FBSXJCLENBQUMsR0FBQ1ksQ0FBekssRUFBMktkLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0csQ0FBQyxHQUFDeUIsQ0FBRixHQUFJMUIsQ0FBQyxHQUFDc0IsQ0FBdEwsRUFBd0x4QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtvQyxDQUE3TCxFQUErTHBDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3dDLENBQXBNLEVBQXNNeEMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLcUMsQ0FBM00sRUFBNk0sSUFBcE47QUFBeU47O0FBQUFSLElBQUFBLEtBQUssQ0FBQ3JCLENBQUQsRUFBR00sQ0FBQyxHQUFDLElBQUwsRUFBVTtBQUFDLFVBQUlkLENBQUosRUFBTUMsQ0FBTixFQUFRbEMsQ0FBUjtBQUFVLFVBQUltQyxDQUFKLEVBQU1DLENBQU47QUFBUSxhQUFPSCxDQUFDLEdBQUMsSUFBRixFQUFPQyxDQUFDLEdBQUNhLENBQVQsRUFBV1osQ0FBQyxHQUFDLENBQUNuQyxDQUFDLEdBQUN5QyxDQUFILEVBQU0sQ0FBTixDQUFiLEVBQXNCTCxDQUFDLEdBQUNwQyxDQUFDLENBQUMsQ0FBRCxDQUF6QixFQUE2QmlDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0UsQ0FBQyxHQUFDRCxDQUFDLENBQUMsQ0FBRCxDQUFyQyxFQUF5Q0QsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRSxDQUFDLEdBQUNELENBQUMsQ0FBQyxDQUFELENBQWpELEVBQXFERCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtFLENBQUMsR0FBQ0QsQ0FBQyxDQUFDLENBQUQsQ0FBN0QsRUFBaUVELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0csQ0FBQyxHQUFDRixDQUFDLENBQUMsQ0FBRCxDQUF6RSxFQUE2RUQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRyxDQUFDLEdBQUNGLENBQUMsQ0FBQyxDQUFELENBQXJGLEVBQXlGRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtHLENBQUMsR0FBQ0YsQ0FBQyxDQUFDLENBQUQsQ0FBakcsRUFBcUdELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBM0csRUFBK0dELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBckgsRUFBeUhELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBL0gsRUFBbUksSUFBMUk7QUFBK0k7O0FBQUFnQixJQUFBQSxRQUFRLENBQUNqQixDQUFELEVBQUdDLENBQUgsRUFBSztBQUFDLGFBQU9BLENBQUMsR0FBQzhRLENBQUMsQ0FBQyxJQUFELEVBQU0vUSxDQUFOLEVBQVFDLENBQVIsQ0FBRixHQUFhOFEsQ0FBQyxDQUFDLElBQUQsRUFBTSxJQUFOLEVBQVcvUSxDQUFYLENBQWYsRUFBNkIsSUFBcEM7QUFBeUM7O0FBQUFrTixJQUFBQSxRQUFRLEdBQUU7QUFBQyxVQUFJbE4sQ0FBSjtBQUFNLGFBQU0sQ0FBQ0EsQ0FBQyxHQUFDLElBQUgsRUFBUyxDQUFULElBQVksQ0FBWixFQUFjQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBbkIsRUFBcUJBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUExQixFQUE0QkEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQWpDLEVBQW1DQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBeEMsRUFBMENBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUEvQyxFQUFpREEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQXRELEVBQXdEQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBN0QsRUFBK0RBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFwRSxFQUFzRSxJQUE1RTtBQUFpRjs7QUFBQVosSUFBQUEsSUFBSSxDQUFDYyxDQUFELEVBQUc7QUFBQyxVQUFJRCxDQUFKLEVBQU1ELENBQU47QUFBUSxhQUFPQSxDQUFDLEdBQUNFLENBQUYsRUFBSSxDQUFDRCxDQUFDLEdBQUMsSUFBSCxFQUFTLENBQVQsSUFBWUQsQ0FBQyxDQUFDLENBQUQsQ0FBakIsRUFBcUJDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0QsQ0FBQyxDQUFDLENBQUQsQ0FBM0IsRUFBK0JDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0QsQ0FBQyxDQUFDLENBQUQsQ0FBckMsRUFBeUNDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0QsQ0FBQyxDQUFDLENBQUQsQ0FBL0MsRUFBbURDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0QsQ0FBQyxDQUFDLENBQUQsQ0FBekQsRUFBNkRDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0QsQ0FBQyxDQUFDLENBQUQsQ0FBbkUsRUFBdUVDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0QsQ0FBQyxDQUFDLENBQUQsQ0FBN0UsRUFBaUZDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0QsQ0FBQyxDQUFDLENBQUQsQ0FBdkYsRUFBMkZDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0QsQ0FBQyxDQUFDLENBQUQsQ0FBakcsRUFBcUcsSUFBNUc7QUFBaUg7O0FBQUFpUixJQUFBQSxXQUFXLENBQUMvUSxDQUFELEVBQUc7QUFBQyxVQUFJRCxDQUFKLEVBQU1ELENBQU47QUFBUSxhQUFPQSxDQUFDLEdBQUNFLENBQUYsRUFBSSxDQUFDRCxDQUFDLEdBQUMsSUFBSCxFQUFTLENBQVQsSUFBWUQsQ0FBQyxDQUFDLENBQUQsQ0FBakIsRUFBcUJDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0QsQ0FBQyxDQUFDLENBQUQsQ0FBM0IsRUFBK0JDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0QsQ0FBQyxDQUFDLENBQUQsQ0FBckMsRUFBeUNDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0QsQ0FBQyxDQUFDLENBQUQsQ0FBL0MsRUFBbURDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0QsQ0FBQyxDQUFDLENBQUQsQ0FBekQsRUFBNkRDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0QsQ0FBQyxDQUFDLENBQUQsQ0FBbkUsRUFBdUVDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0QsQ0FBQyxDQUFDLENBQUQsQ0FBN0UsRUFBaUZDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0QsQ0FBQyxDQUFDLENBQUQsQ0FBdkYsRUFBMkZDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0QsQ0FBQyxDQUFDLEVBQUQsQ0FBakcsRUFBc0csSUFBN0c7QUFBa0g7O0FBQUEwTyxJQUFBQSxjQUFjLENBQUNqSCxDQUFELEVBQUc7QUFBQyxVQUFJekgsQ0FBSixFQUFNakMsQ0FBTjtBQUFRLFVBQUl5QyxDQUFKLEVBQU1OLENBQU4sRUFBUUQsQ0FBUixFQUFVYSxDQUFWLEVBQVlYLENBQVosRUFBY3FCLENBQWQsRUFBZ0JDLENBQWhCLEVBQWtCRixDQUFsQixFQUFvQkssQ0FBcEIsRUFBc0JRLENBQXRCLEVBQXdCSSxDQUF4QixFQUEwQkgsQ0FBMUIsRUFBNEJDLENBQTVCLEVBQThCQyxDQUE5QixFQUFnQ0osQ0FBaEMsRUFBa0NvRixDQUFsQztBQUFvQyxhQUFPdkgsQ0FBQyxHQUFDLElBQUYsRUFBT1EsQ0FBQyxHQUFDLENBQUN6QyxDQUFDLEdBQUMwSixDQUFILEVBQU0sQ0FBTixDQUFULEVBQWtCdkgsQ0FBQyxHQUFDbkMsQ0FBQyxDQUFDLENBQUQsQ0FBckIsRUFBeUJrQyxDQUFDLEdBQUNsQyxDQUFDLENBQUMsQ0FBRCxDQUE1QixFQUFnQytDLENBQUMsR0FBQy9DLENBQUMsQ0FBQyxDQUFELENBQW5DLEVBQXVDb0MsQ0FBQyxHQUFDSyxDQUFDLEdBQUNBLENBQTNDLEVBQTZDZ0IsQ0FBQyxHQUFDdEIsQ0FBQyxHQUFDQSxDQUFqRCxFQUFtRHVCLENBQUMsR0FBQ3hCLENBQUMsR0FBQ0EsQ0FBdkQsRUFBeURzQixDQUFDLEdBQUNmLENBQUMsR0FBQ0wsQ0FBN0QsRUFBK0R5QixDQUFDLEdBQUMxQixDQUFDLEdBQUNDLENBQW5FLEVBQXFFaUMsQ0FBQyxHQUFDbEMsQ0FBQyxHQUFDc0IsQ0FBekUsRUFBMkVnQixDQUFDLEdBQUN2QyxDQUFDLEdBQUNFLENBQS9FLEVBQWlGa0MsQ0FBQyxHQUFDcEMsQ0FBQyxHQUFDdUIsQ0FBckYsRUFBdUZjLENBQUMsR0FBQ3JDLENBQUMsR0FBQ3dCLENBQTNGLEVBQTZGYyxDQUFDLEdBQUN6QixDQUFDLEdBQUNYLENBQWpHLEVBQW1HZ0MsQ0FBQyxHQUFDckIsQ0FBQyxHQUFDVSxDQUF2RyxFQUF5RytGLENBQUMsR0FBQ3pHLENBQUMsR0FBQ1csQ0FBN0csRUFBK0d6QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssSUFBRW9DLENBQUYsR0FBSUUsQ0FBeEgsRUFBMEh0QyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUs0QixDQUFDLEdBQUMyRixDQUFqSSxFQUFtSXZILENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3dDLENBQUMsR0FBQ0wsQ0FBMUksRUFBNEluQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUs0QixDQUFDLEdBQUMyRixDQUFuSixFQUFxSnZILENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxJQUFFdUIsQ0FBRixHQUFJZSxDQUE5SixFQUFnS3RDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS3FDLENBQUMsR0FBQ0UsQ0FBdkssRUFBeUt2QyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUt3QyxDQUFDLEdBQUNMLENBQWhMLEVBQWtMbkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLcUMsQ0FBQyxHQUFDRSxDQUF6TCxFQUEyTHZDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxJQUFFdUIsQ0FBRixHQUFJYSxDQUFwTSxFQUFzTSxJQUE3TTtBQUFrTjs7QUFBQThPLElBQUFBLFNBQVMsQ0FBQ2xSLENBQUQsRUFBR0MsQ0FBSCxFQUFLQyxDQUFMLEVBQU87QUFBQyxhQUFPLEtBQUszQixHQUFMLENBQVN5QixDQUFDLENBQUMsQ0FBRCxDQUFWLEVBQWNBLENBQUMsQ0FBQyxDQUFELENBQWYsRUFBbUJBLENBQUMsQ0FBQyxDQUFELENBQXBCLEVBQXdCQyxDQUFDLENBQUMsQ0FBRCxDQUF6QixFQUE2QkEsQ0FBQyxDQUFDLENBQUQsQ0FBOUIsRUFBa0NBLENBQUMsQ0FBQyxDQUFELENBQW5DLEVBQXVDQyxDQUFDLENBQUMsQ0FBRCxDQUF4QyxFQUE0Q0EsQ0FBQyxDQUFDLENBQUQsQ0FBN0MsRUFBaURBLENBQUMsQ0FBQyxDQUFELENBQWxELEdBQXVELElBQTlEO0FBQW1FOztBQUFBaUIsSUFBQUEsT0FBTyxDQUFDb0IsQ0FBQyxHQUFDLElBQUgsRUFBUTtBQUFDLFVBQUl0QyxDQUFKLEVBQU1DLENBQU47QUFBUSxVQUFJQyxDQUFKLEVBQU1wQyxDQUFOLEVBQVF5QyxDQUFSLEVBQVVNLENBQVYsRUFBWVUsQ0FBWixFQUFjQyxDQUFkLEVBQWdCRixDQUFoQixFQUFrQkssQ0FBbEIsRUFBb0JRLENBQXBCLEVBQXNCSSxDQUF0QixFQUF3QkgsQ0FBeEIsRUFBMEJDLENBQTFCLEVBQTRCdEMsQ0FBNUI7QUFBOEIsYUFBT0MsQ0FBQyxHQUFDLElBQUYsRUFBT0UsQ0FBQyxHQUFDLENBQUNELENBQUMsR0FBQ3FDLENBQUgsRUFBTSxDQUFOLENBQVQsRUFBa0J4RSxDQUFDLEdBQUNtQyxDQUFDLENBQUMsQ0FBRCxDQUFyQixFQUF5Qk0sQ0FBQyxHQUFDTixDQUFDLENBQUMsQ0FBRCxDQUE1QixFQUFnQ1ksQ0FBQyxHQUFDWixDQUFDLENBQUMsQ0FBRCxDQUFuQyxFQUF1Q3NCLENBQUMsR0FBQ3RCLENBQUMsQ0FBQyxDQUFELENBQTFDLEVBQThDdUIsQ0FBQyxHQUFDdkIsQ0FBQyxDQUFDLENBQUQsQ0FBakQsRUFBcURxQixDQUFDLEdBQUNyQixDQUFDLENBQUMsQ0FBRCxDQUF4RCxFQUE0RDBCLENBQUMsR0FBQzFCLENBQUMsQ0FBQyxDQUFELENBQS9ELEVBQW1Fa0MsQ0FBQyxHQUFDbEMsQ0FBQyxDQUFDLENBQUQsQ0FBdEUsRUFBMEVzQyxDQUFDLEdBQUNKLENBQUMsR0FBQ1osQ0FBRixHQUFJQyxDQUFDLEdBQUNHLENBQWxGLEVBQW9GUyxDQUFDLEdBQUMsQ0FBQ0QsQ0FBRCxHQUFHdEIsQ0FBSCxHQUFLVyxDQUFDLEdBQUNGLENBQTdGLEVBQStGZSxDQUFDLEdBQUNWLENBQUMsR0FBQ2QsQ0FBRixHQUFJVSxDQUFDLEdBQUNELENBQXZHLEVBQXlHdkIsQ0FBQyxHQUFDRyxDQUFDLEdBQUNxQyxDQUFGLEdBQUl6RSxDQUFDLEdBQUNzRSxDQUFOLEdBQVE3QixDQUFDLEdBQUM4QixDQUFySCxFQUF1SHRDLENBQUMsS0FBR0EsQ0FBQyxHQUFDLElBQUVBLENBQUosRUFBTUMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLdUMsQ0FBQyxHQUFDeEMsQ0FBYixFQUFlQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQyxDQUFDbUMsQ0FBRCxHQUFHckUsQ0FBSCxHQUFLeUMsQ0FBQyxHQUFDb0IsQ0FBUixJQUFXNUIsQ0FBL0IsRUFBaUNDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBSyxDQUFDd0IsQ0FBQyxHQUFDMUQsQ0FBRixHQUFJeUMsQ0FBQyxHQUFDZ0IsQ0FBUCxJQUFVeEIsQ0FBaEQsRUFBa0RDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS29DLENBQUMsR0FBQ3JDLENBQXpELEVBQTJEQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQ21DLENBQUMsR0FBQ2pDLENBQUYsR0FBSUssQ0FBQyxHQUFDZSxDQUFQLElBQVV2QixDQUExRSxFQUE0RUMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUMsQ0FBQ3dCLENBQUQsR0FBR3RCLENBQUgsR0FBS0ssQ0FBQyxHQUFDTSxDQUFSLElBQVdkLENBQTVGLEVBQThGQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtxQyxDQUFDLEdBQUN0QyxDQUFyRyxFQUF1R0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUMsQ0FBQzJCLENBQUQsR0FBR3pCLENBQUgsR0FBS3BDLENBQUMsR0FBQ3dELENBQVIsSUFBV3ZCLENBQXZILEVBQXlIQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQ3VCLENBQUMsR0FBQ3JCLENBQUYsR0FBSXBDLENBQUMsR0FBQytDLENBQVAsSUFBVWQsQ0FBM0ksQ0FBeEgsRUFBc1EsSUFBN1E7QUFBa1I7O0FBQUFtUixJQUFBQSxlQUFlLENBQUNySyxDQUFELEVBQUc7QUFBQyxVQUFJNUcsQ0FBSixFQUFNRixDQUFOOztBQUFRLFVBQUljLENBQUosRUFBTVUsQ0FBTixFQUFRQyxDQUFSLEVBQVV0QixDQUFWLEVBQVlvQixDQUFaLEVBQWNLLENBQWQsRUFBZ0JRLENBQWhCLEVBQWtCckUsQ0FBbEIsRUFBb0IwSixDQUFwQixFQUFzQnZJLENBQXRCLEVBQXdCbUIsQ0FBeEIsRUFBMEJDLENBQTFCLEVBQTRCa0MsQ0FBNUIsRUFBOEJILENBQTlCLEVBQWdDQyxDQUFoQyxFQUFrQzlCLENBQWxDLEVBQW9Dc0MsQ0FBcEMsRUFBc0NDLENBQXRDLEVBQXdDeEMsQ0FBeEMsRUFBMEN5QyxDQUExQyxFQUE0QzdFLENBQTVDLEVBQThDRSxDQUE5QyxFQUFnRG9DLENBQWhELEVBQWtEQyxDQUFsRCxFQUFvRDZCLENBQXBELEVBQXNEd0ssQ0FBdEQsRUFBd0Q1SyxDQUF4RCxFQUEwRG9GLENBQTFELEVBQTREdEgsQ0FBNUQ7O0FBQThELGFBQU9DLENBQUMsR0FBQyxJQUFGLEVBQU9ZLENBQUMsR0FBQyxDQUFDZCxDQUFDLEdBQUM4RyxDQUFILEVBQU0sQ0FBTixDQUFULEVBQWtCdEYsQ0FBQyxHQUFDeEIsQ0FBQyxDQUFDLENBQUQsQ0FBckIsRUFBeUJ5QixDQUFDLEdBQUN6QixDQUFDLENBQUMsQ0FBRCxDQUE1QixFQUFnQ0csQ0FBQyxHQUFDSCxDQUFDLENBQUMsQ0FBRCxDQUFuQyxFQUF1Q3VCLENBQUMsR0FBQ3ZCLENBQUMsQ0FBQyxDQUFELENBQTFDLEVBQThDNEIsQ0FBQyxHQUFDNUIsQ0FBQyxDQUFDLENBQUQsQ0FBakQsRUFBcURvQyxDQUFDLEdBQUNwQyxDQUFDLENBQUMsQ0FBRCxDQUF4RCxFQUE0RGpDLENBQUMsR0FBQ2lDLENBQUMsQ0FBQyxDQUFELENBQS9ELEVBQW1FeUgsQ0FBQyxHQUFDekgsQ0FBQyxDQUFDLENBQUQsQ0FBdEUsRUFBMEVkLENBQUMsR0FBQ2MsQ0FBQyxDQUFDLENBQUQsQ0FBN0UsRUFBaUZLLENBQUMsR0FBQ0wsQ0FBQyxDQUFDLEVBQUQsQ0FBcEYsRUFBeUZNLENBQUMsR0FBQ04sQ0FBQyxDQUFDLEVBQUQsQ0FBNUYsRUFBaUd3QyxDQUFDLEdBQUN4QyxDQUFDLENBQUMsRUFBRCxDQUFwRyxFQUF5R3FDLENBQUMsR0FBQ3JDLENBQUMsQ0FBQyxFQUFELENBQTVHLEVBQWlIc0MsQ0FBQyxHQUFDdEMsQ0FBQyxDQUFDLEVBQUQsQ0FBcEgsRUFBeUhRLENBQUMsR0FBQ1IsQ0FBQyxDQUFDLEVBQUQsQ0FBNUgsRUFBaUk4QyxDQUFDLEdBQUNoQyxDQUFDLEdBQUNjLENBQUYsR0FBSUosQ0FBQyxHQUFDRCxDQUF6SSxFQUEySXdCLENBQUMsR0FBQ2pDLENBQUMsR0FBQ3NCLENBQUYsR0FBSVgsQ0FBQyxHQUFDRixDQUFuSixFQUFxSmhCLENBQUMsR0FBQ08sQ0FBQyxHQUFDL0MsQ0FBRixHQUFJb0MsQ0FBQyxHQUFDb0IsQ0FBN0osRUFBK0p5QixDQUFDLEdBQUN4QixDQUFDLEdBQUNZLENBQUYsR0FBSVgsQ0FBQyxHQUFDRyxDQUF2SyxFQUF5S3pELENBQUMsR0FBQ3FELENBQUMsR0FBQ3pELENBQUYsR0FBSW9DLENBQUMsR0FBQ3lCLENBQWpMLEVBQW1MdkQsQ0FBQyxHQUFDb0QsQ0FBQyxHQUFDMUQsQ0FBRixHQUFJb0MsQ0FBQyxHQUFDaUMsQ0FBM0wsRUFBNkwzQixDQUFDLEdBQUNnSCxDQUFDLEdBQUNwRixDQUFGLEdBQUluRCxDQUFDLEdBQUNzRCxDQUFyTSxFQUF1TTlCLENBQUMsR0FBQytHLENBQUMsR0FBQ25GLENBQUYsR0FBSWpDLENBQUMsR0FBQ21DLENBQS9NLEVBQWlORCxDQUFDLEdBQUNrRixDQUFDLEdBQUNqSCxDQUFGLEdBQUlGLENBQUMsR0FBQ2tDLENBQXpOLEVBQTJOdUssQ0FBQyxHQUFDN04sQ0FBQyxHQUFDb0QsQ0FBRixHQUFJakMsQ0FBQyxHQUFDZ0MsQ0FBbk8sRUFBcU9GLENBQUMsR0FBQ2pELENBQUMsR0FBQ3NCLENBQUYsR0FBSUYsQ0FBQyxHQUFDK0IsQ0FBN08sRUFBK09rRixDQUFDLEdBQUNsSCxDQUFDLEdBQUNHLENBQUYsR0FBSUYsQ0FBQyxHQUFDZ0MsQ0FBdlAsRUFBeVByQyxDQUFDLEdBQUM2QyxDQUFDLEdBQUN5RSxDQUFGLEdBQUl4RSxDQUFDLEdBQUNaLENBQU4sR0FBUTVCLENBQUMsR0FBQ3dNLENBQVYsR0FBWS9KLENBQUMsR0FBQ1QsQ0FBZCxHQUFnQnBFLENBQUMsR0FBQ3VDLENBQWxCLEdBQW9CckMsQ0FBQyxHQUFDb0MsQ0FBalIsRUFBbVJSLENBQUMsS0FBR0EsQ0FBQyxHQUFDLElBQUVBLENBQUosRUFBTUMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUMwQixDQUFDLEdBQUMyRixDQUFGLEdBQUluRixDQUFDLEdBQUNELENBQU4sR0FBUXBFLENBQUMsR0FBQ2dQLENBQVgsSUFBYzlNLENBQXpCLEVBQTJCQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQ2tDLENBQUMsR0FBQ0csQ0FBRixHQUFJaEIsQ0FBQyxHQUFDZ0csQ0FBTixHQUFReEosQ0FBQyxHQUFDMkMsQ0FBWCxJQUFjVCxDQUE5QyxFQUFnREMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUNxQixDQUFDLEdBQUNZLENBQUYsR0FBSVAsQ0FBQyxHQUFDVyxDQUFOLEdBQVF4RSxDQUFDLEdBQUMwQyxDQUFYLElBQWNSLENBQW5FLEVBQXFFQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQ3VCLENBQUMsR0FBQ1UsQ0FBRixHQUFJWCxDQUFDLEdBQUMrRixDQUFOLEdBQVFwSCxDQUFDLEdBQUM0TSxDQUFYLElBQWM5TSxDQUF4RixFQUEwRkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUNZLENBQUMsR0FBQ3lHLENBQUYsR0FBSTlGLENBQUMsR0FBQ2MsQ0FBTixHQUFRcEMsQ0FBQyxHQUFDTyxDQUFYLElBQWNULENBQTdHLEVBQStHQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQ3NCLENBQUMsR0FBQ2UsQ0FBRixHQUFJekIsQ0FBQyxHQUFDcUIsQ0FBTixHQUFRaEMsQ0FBQyxHQUFDTSxDQUFYLElBQWNSLENBQWxJLEVBQW9JQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQ21DLENBQUMsR0FBQ2hFLENBQUYsR0FBSWlFLENBQUMsR0FBQ25FLENBQU4sR0FBUXFDLENBQUMsR0FBQ3dDLENBQVgsSUFBYy9DLENBQXZKLEVBQXlKQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQ29DLENBQUMsR0FBQy9CLENBQUYsR0FBSWlDLENBQUMsR0FBQ25FLENBQU4sR0FBUW1DLENBQUMsR0FBQ3VDLENBQVgsSUFBYzlDLENBQTVLLEVBQThLQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUssQ0FBQ3NDLENBQUMsR0FBQ3JFLENBQUYsR0FBSWtFLENBQUMsR0FBQzlCLENBQU4sR0FBUUMsQ0FBQyxHQUFDc0MsQ0FBWCxJQUFjN0MsQ0FBcE0sQ0FBcFIsRUFBMmQsSUFBbGU7QUFBdWU7O0FBQXpsRjs7QUFBMGxGLE1BQUltUixDQUFDLEdBQUMsQ0FBTjs7QUFBUSxRQUFNL08sQ0FBTixTQUFnQnZCLENBQWhCLENBQWlCO0FBQUN4SCxJQUFBQSxXQUFXLENBQUMwRyxDQUFELEVBQUc7QUFBQ2hFLE1BQUFBLFFBQVEsRUFBQ2lFLENBQVY7QUFBWXhFLE1BQUFBLE9BQU8sRUFBQzBFLENBQXBCO0FBQXNCNEYsTUFBQUEsSUFBSSxFQUFDaEksQ0FBQyxHQUFDaUMsQ0FBQyxDQUFDZ0csU0FBL0I7QUFBeUNxTCxNQUFBQSxhQUFhLEVBQUM3USxDQUFDLEdBQUMsQ0FBQyxDQUExRDtBQUE0RDhRLE1BQUFBLFdBQVcsRUFBQ3hRLENBQUMsR0FBQztBQUExRSxRQUE2RSxFQUFoRixFQUFtRjtBQUFDLFlBQU1kLENBQU4sR0FBUyxLQUFLL0YsRUFBTCxHQUFRK0YsQ0FBakIsRUFBbUIsS0FBS2tELEVBQUwsR0FBUWtPLENBQUMsRUFBNUIsRUFBK0IsS0FBS3BWLFFBQUwsR0FBY2lFLENBQTdDLEVBQStDLEtBQUt4RSxPQUFMLEdBQWEwRSxDQUE1RCxFQUE4RCxLQUFLNEYsSUFBTCxHQUFVaEksQ0FBeEUsRUFBMEUsS0FBS3NULGFBQUwsR0FBbUI3USxDQUE3RixFQUErRixLQUFLOFEsV0FBTCxHQUFpQnhRLENBQWhILEVBQWtILEtBQUt5USxlQUFMLEdBQXFCLElBQUlyUixDQUFKLEVBQXZJLEVBQTZJLEtBQUtzUixZQUFMLEdBQWtCLElBQUloUCxDQUFKLEVBQS9KLEVBQXFLLEtBQUsvRyxPQUFMLENBQWFDLFFBQWIsQ0FBc0IrVixXQUF0QixJQUFtQ0MsTUFBTSxDQUFDQyxNQUFQLENBQWMsS0FBS2xXLE9BQUwsQ0FBYUMsUUFBM0IsRUFBb0M7QUFBQytWLFFBQUFBLFdBQVcsRUFBQztBQUFDN1YsVUFBQUEsS0FBSyxFQUFDO0FBQVAsU0FBYjtBQUEwQmdXLFFBQUFBLFVBQVUsRUFBQztBQUFDaFcsVUFBQUEsS0FBSyxFQUFDO0FBQVAsU0FBckM7QUFBa0QyVixRQUFBQSxlQUFlLEVBQUM7QUFBQzNWLFVBQUFBLEtBQUssRUFBQztBQUFQLFNBQWxFO0FBQStFNFYsUUFBQUEsWUFBWSxFQUFDO0FBQUM1VixVQUFBQSxLQUFLLEVBQUM7QUFBUCxTQUE1RjtBQUF5R2lXLFFBQUFBLGdCQUFnQixFQUFDO0FBQUNqVyxVQUFBQSxLQUFLLEVBQUM7QUFBUCxTQUExSDtBQUF1SWtXLFFBQUFBLGNBQWMsRUFBQztBQUFDbFcsVUFBQUEsS0FBSyxFQUFDO0FBQVA7QUFBdEosT0FBcEMsQ0FBeE07QUFBaVo7O0FBQUFrSyxJQUFBQSxJQUFJLENBQUM7QUFBQ2lNLE1BQUFBLE1BQU0sRUFBQy9SO0FBQVIsUUFBVyxFQUFaLEVBQWU7QUFBQyxXQUFLZ1MsY0FBTCxJQUFxQixLQUFLQSxjQUFMLENBQW9CO0FBQUN4VyxRQUFBQSxJQUFJLEVBQUMsSUFBTjtBQUFXdVcsUUFBQUEsTUFBTSxFQUFDL1I7QUFBbEIsT0FBcEIsQ0FBckIsRUFBK0RBLENBQUMsS0FBRyxLQUFLdkUsT0FBTCxDQUFhQyxRQUFiLENBQXNCbVcsZ0JBQXRCLENBQXVDalcsS0FBdkMsR0FBNkNvRSxDQUFDLENBQUM2UixnQkFBL0MsRUFBZ0UsS0FBS3BXLE9BQUwsQ0FBYUMsUUFBYixDQUFzQm9XLGNBQXRCLENBQXFDbFcsS0FBckMsR0FBMkNvRSxDQUFDLENBQUM5RCxRQUE3RyxFQUFzSCxLQUFLVCxPQUFMLENBQWFDLFFBQWIsQ0FBc0JrVyxVQUF0QixDQUFpQ2hXLEtBQWpDLEdBQXVDb0UsQ0FBQyxDQUFDNFIsVUFBL0osRUFBMEssS0FBS0wsZUFBTCxDQUFxQnRRLFFBQXJCLENBQThCakIsQ0FBQyxDQUFDNFIsVUFBaEMsRUFBMkMsS0FBSy9CLFdBQWhELENBQTFLLEVBQXVPLEtBQUsyQixZQUFMLENBQWtCTCxlQUFsQixDQUFrQyxLQUFLSSxlQUF2QyxDQUF2TyxFQUErUixLQUFLOVYsT0FBTCxDQUFhQyxRQUFiLENBQXNCK1YsV0FBdEIsQ0FBa0M3VixLQUFsQyxHQUF3QyxLQUFLaVUsV0FBNVUsRUFBd1YsS0FBS3BVLE9BQUwsQ0FBYUMsUUFBYixDQUFzQjZWLGVBQXRCLENBQXNDM1YsS0FBdEMsR0FBNEMsS0FBSzJWLGVBQXpZLEVBQXlaLEtBQUs5VixPQUFMLENBQWFDLFFBQWIsQ0FBc0I4VixZQUF0QixDQUFtQzVWLEtBQW5DLEdBQXlDLEtBQUs0VixZQUExYyxDQUFoRTtBQUF3aEIsVUFBSXZSLENBQUMsR0FBQyxLQUFLeEUsT0FBTCxDQUFhd0wsUUFBYixJQUF1QixJQUFFLEtBQUs0SSxXQUFMLENBQWlCWCxXQUFqQixFQUEvQjtBQUE4RCxXQUFLelQsT0FBTCxDQUFheVAsR0FBYixDQUFpQjtBQUFDQyxRQUFBQSxTQUFTLEVBQUNsTDtBQUFYLE9BQWpCLEdBQWdDLEtBQUtqRSxRQUFMLENBQWM4SixJQUFkLENBQW1CO0FBQUNDLFFBQUFBLElBQUksRUFBQyxLQUFLQSxJQUFYO0FBQWdCdEssUUFBQUEsT0FBTyxFQUFDLEtBQUtBO0FBQTdCLE9BQW5CLENBQWhDLEVBQTBGLEtBQUt3VyxhQUFMLElBQW9CLEtBQUtBLGFBQUwsQ0FBbUI7QUFBQ3pXLFFBQUFBLElBQUksRUFBQyxJQUFOO0FBQVd1VyxRQUFBQSxNQUFNLEVBQUMvUjtBQUFsQixPQUFuQixDQUE5RztBQUF1Sjs7QUFBbHZDOztBQUFtdkMsTUFBSWtTLENBQUMsR0FBQyxJQUFJQyxVQUFKLENBQWUsQ0FBZixDQUFOOztBQUF3QixXQUFTQyxDQUFULENBQVdwUyxDQUFYLEVBQWE7QUFBQyxXQUFPLE1BQUlBLENBQUMsR0FBQ0EsQ0FBQyxHQUFDLENBQVIsQ0FBUDtBQUFrQjs7QUFBQSxNQUFJcVMsQ0FBQyxHQUFDLENBQU47O0FBQVEsUUFBTS9QLENBQU4sQ0FBTztBQUFDaEosSUFBQUEsV0FBVyxDQUFDMEcsQ0FBRCxFQUFHO0FBQUNoRCxNQUFBQSxLQUFLLEVBQUNlLENBQVA7QUFBU21HLE1BQUFBLE1BQU0sRUFBQzFELENBQUMsR0FBQ1IsQ0FBQyxDQUFDc1MsVUFBcEI7QUFBK0J6TyxNQUFBQSxJQUFJLEVBQUMvQyxDQUFDLEdBQUNkLENBQUMsQ0FBQ3VTLGFBQXhDO0FBQXNEQyxNQUFBQSxNQUFNLEVBQUN2UyxDQUFDLEdBQUNELENBQUMsQ0FBQ3lTLElBQWpFO0FBQXNFQyxNQUFBQSxjQUFjLEVBQUNsUixDQUFDLEdBQUN2QixDQUF2RjtBQUF5RjBTLE1BQUFBLEtBQUssRUFBQ2xSLENBQUMsR0FBQ3pCLENBQUMsQ0FBQzRTLGFBQW5HO0FBQWlIQyxNQUFBQSxLQUFLLEVBQUN0UixDQUFDLEdBQUN2QixDQUFDLENBQUM0UyxhQUEzSDtBQUF5SUUsTUFBQUEsZUFBZSxFQUFDNVMsQ0FBQyxHQUFDLENBQUMsQ0FBNUo7QUFBOEp4RCxNQUFBQSxTQUFTLEVBQUNrRixDQUFDLEdBQUMxQixDQUFDLEdBQUNGLENBQUMsQ0FBQytTLHFCQUFILEdBQXlCL1MsQ0FBQyxDQUFDckQsTUFBdE07QUFBNk1DLE1BQUFBLFNBQVMsRUFBQ3dGLENBQUMsR0FBQ3BDLENBQUMsQ0FBQ3JELE1BQTNOO0FBQWtPcVcsTUFBQUEsZ0JBQWdCLEVBQUN4USxDQUFDLEdBQUMsQ0FBQyxDQUF0UDtBQUF3UHlRLE1BQUFBLGVBQWUsRUFBQzVRLENBQUMsR0FBQyxDQUExUTtBQUE0UTZRLE1BQUFBLEtBQUssRUFBQzVRLENBQUMsR0FBQyxDQUFDLENBQXJSO0FBQXVSNlEsTUFBQUEsS0FBSyxFQUFDNVEsQ0FBQyxHQUFDLENBQS9SO0FBQWlTOUksTUFBQUEsS0FBSyxFQUFDMEcsQ0FBdlM7QUFBeVN6RyxNQUFBQSxNQUFNLEVBQUN5SSxDQUFDLEdBQUNoQztBQUFsVCxRQUFxVCxFQUF4VCxFQUEyVDtBQUFDLFdBQUtsRyxFQUFMLEdBQVErRixDQUFSLEVBQVUsS0FBS2tELEVBQUwsR0FBUW1QLENBQUMsRUFBbkIsRUFBc0IsS0FBS3JWLEtBQUwsR0FBV2UsQ0FBakMsRUFBbUMsS0FBS21HLE1BQUwsR0FBWTFELENBQS9DLEVBQWlELEtBQUtxRCxJQUFMLEdBQVUvQyxDQUEzRCxFQUE2RCxLQUFLMFIsTUFBTCxHQUFZdlMsQ0FBekUsRUFBMkUsS0FBS3lTLGNBQUwsR0FBb0JsUixDQUEvRixFQUFpRyxLQUFLOUUsU0FBTCxHQUFla0YsQ0FBaEgsRUFBa0gsS0FBS2hGLFNBQUwsR0FBZXdGLENBQWpJLEVBQW1JLEtBQUt1USxLQUFMLEdBQVdsUixDQUE5SSxFQUFnSixLQUFLb1IsS0FBTCxHQUFXdFIsQ0FBM0osRUFBNkosS0FBS3VSLGVBQUwsR0FBcUI1UyxDQUFsTCxFQUFvTCxLQUFLOFMsZ0JBQUwsR0FBc0J4USxDQUExTSxFQUE0TSxLQUFLeVEsZUFBTCxHQUFxQjVRLENBQWpPLEVBQW1PLEtBQUs2USxLQUFMLEdBQVc1USxDQUE5TyxFQUFnUCxLQUFLNlEsS0FBTCxHQUFXNVEsQ0FBM1AsRUFBNlAsS0FBSzlJLEtBQUwsR0FBVzBHLENBQXhRLEVBQTBRLEtBQUt6RyxNQUFMLEdBQVl5SSxDQUF0UixFQUF3UixLQUFLM0YsT0FBTCxHQUFhLEtBQUt2QyxFQUFMLENBQVFtWixhQUFSLEVBQXJTLEVBQTZULEtBQUtDLEtBQUwsR0FBVztBQUFDclcsUUFBQUEsS0FBSyxFQUFDO0FBQVAsT0FBeFUsRUFBcVYsS0FBSzBHLE9BQUwsR0FBYSxLQUFLekosRUFBTCxDQUFRSCxRQUFSLENBQWlCNkosS0FBblgsRUFBeVgsS0FBS0EsS0FBTCxHQUFXLEVBQXBZLEVBQXVZLEtBQUtBLEtBQUwsQ0FBV2pILFNBQVgsR0FBcUIsS0FBS3pDLEVBQUwsQ0FBUThZLHFCQUFwYSxFQUEwYixLQUFLcFAsS0FBTCxDQUFXL0csU0FBWCxHQUFxQixLQUFLM0MsRUFBTCxDQUFRMEMsTUFBdmQsRUFBOGQsS0FBS2dILEtBQUwsQ0FBV2dQLEtBQVgsR0FBaUIsS0FBSzFZLEVBQUwsQ0FBUXFaLE1BQXZmLEVBQThmLEtBQUszUCxLQUFMLENBQVdrUCxLQUFYLEdBQWlCLEtBQUs1WSxFQUFMLENBQVFxWixNQUF2aEI7QUFBOGhCOztBQUFBL1osSUFBQUEsSUFBSSxHQUFFO0FBQUMsV0FBS21LLE9BQUwsQ0FBYTZQLFlBQWIsQ0FBMEIsS0FBSzdQLE9BQUwsQ0FBYThQLGlCQUF2QyxNQUE0RCxLQUFLdFEsRUFBakUsS0FBc0UsS0FBS2pKLEVBQUwsQ0FBUXdaLFdBQVIsQ0FBb0IsS0FBS3ZQLE1BQXpCLEVBQWdDLEtBQUsxSCxPQUFyQyxHQUE4QyxLQUFLa0gsT0FBTCxDQUFhNlAsWUFBYixDQUEwQixLQUFLN1AsT0FBTCxDQUFhOFAsaUJBQXZDLElBQTBELEtBQUt0USxFQUFuTDtBQUF1TDs7QUFBQWpFLElBQUFBLE1BQU0sQ0FBQ2UsQ0FBQyxHQUFDLENBQUgsRUFBSztBQUFDLFVBQUlDLENBQUMsR0FBQyxFQUFFLEtBQUtqRCxLQUFMLEtBQWEsS0FBS3FXLEtBQUwsQ0FBV3JXLEtBQXhCLElBQStCLENBQUMsS0FBS2dDLFdBQXZDLENBQU47QUFBMEQsT0FBQ2lCLENBQUMsSUFBRSxLQUFLeUQsT0FBTCxDQUFhNlAsWUFBYixDQUEwQnZULENBQTFCLE1BQStCLEtBQUtrRCxFQUF4QyxNQUE4QyxLQUFLakosRUFBTCxDQUFRSCxRQUFSLENBQWlCNFosYUFBakIsQ0FBK0IxVCxDQUEvQixHQUFrQyxLQUFLekcsSUFBTCxFQUFoRixHQUE2RjBHLENBQUMsS0FBRyxLQUFLakIsV0FBTCxHQUFpQixDQUFDLENBQWxCLEVBQW9CLEtBQUtrVSxLQUFMLEtBQWEsS0FBS3hQLE9BQUwsQ0FBYXdQLEtBQTFCLEtBQWtDLEtBQUtqWixFQUFMLENBQVEwWixXQUFSLENBQW9CLEtBQUsxWixFQUFMLENBQVEyWixtQkFBNUIsRUFBZ0QsS0FBS1YsS0FBckQsR0FBNEQsS0FBS3hQLE9BQUwsQ0FBYXdQLEtBQWIsR0FBbUIsS0FBS0EsS0FBdEgsQ0FBcEIsRUFBaUosS0FBS0YsZ0JBQUwsS0FBd0IsS0FBS3RQLE9BQUwsQ0FBYXNQLGdCQUFyQyxLQUF3RCxLQUFLL1ksRUFBTCxDQUFRMFosV0FBUixDQUFvQixLQUFLMVosRUFBTCxDQUFRNFosOEJBQTVCLEVBQTJELEtBQUtiLGdCQUFoRSxHQUFrRixLQUFLdFAsT0FBTCxDQUFhc1AsZ0JBQWIsR0FBOEIsS0FBS0EsZ0JBQTdLLENBQWpKLEVBQWdWLEtBQUtDLGVBQUwsS0FBdUIsS0FBS3ZQLE9BQUwsQ0FBYXVQLGVBQXBDLEtBQXNELEtBQUtoWixFQUFMLENBQVEwWixXQUFSLENBQW9CLEtBQUsxWixFQUFMLENBQVE2WixnQkFBNUIsRUFBNkMsS0FBS2IsZUFBbEQsR0FBbUUsS0FBS3ZQLE9BQUwsQ0FBYXVQLGVBQWIsR0FBNkIsS0FBS0EsZUFBM0osQ0FBaFYsRUFBNGYsS0FBS3ZXLFNBQUwsS0FBaUIsS0FBS2lILEtBQUwsQ0FBV2pILFNBQTVCLEtBQXdDLEtBQUt6QyxFQUFMLENBQVE4WixhQUFSLENBQXNCLEtBQUs3UCxNQUEzQixFQUFrQyxLQUFLakssRUFBTCxDQUFRK1osa0JBQTFDLEVBQTZELEtBQUt0WCxTQUFsRSxHQUE2RSxLQUFLaUgsS0FBTCxDQUFXakgsU0FBWCxHQUFxQixLQUFLQSxTQUEvSSxDQUE1ZixFQUFzcEIsS0FBS0UsU0FBTCxLQUFpQixLQUFLK0csS0FBTCxDQUFXL0csU0FBNUIsS0FBd0MsS0FBSzNDLEVBQUwsQ0FBUThaLGFBQVIsQ0FBc0IsS0FBSzdQLE1BQTNCLEVBQWtDLEtBQUtqSyxFQUFMLENBQVFnYSxrQkFBMUMsRUFBNkQsS0FBS3JYLFNBQWxFLEdBQTZFLEtBQUsrRyxLQUFMLENBQVcvRyxTQUFYLEdBQXFCLEtBQUtBLFNBQS9JLENBQXRwQixFQUFnekIsS0FBSytWLEtBQUwsS0FBYSxLQUFLaFAsS0FBTCxDQUFXZ1AsS0FBeEIsS0FBZ0MsS0FBSzFZLEVBQUwsQ0FBUThaLGFBQVIsQ0FBc0IsS0FBSzdQLE1BQTNCLEVBQWtDLEtBQUtqSyxFQUFMLENBQVFpYSxjQUExQyxFQUF5RCxLQUFLdkIsS0FBOUQsR0FBcUUsS0FBS2hQLEtBQUwsQ0FBV2dQLEtBQVgsR0FBaUIsS0FBS0EsS0FBM0gsQ0FBaHpCLEVBQWs3QixLQUFLRSxLQUFMLEtBQWEsS0FBS2xQLEtBQUwsQ0FBV2tQLEtBQXhCLEtBQWdDLEtBQUs1WSxFQUFMLENBQVE4WixhQUFSLENBQXNCLEtBQUs3UCxNQUEzQixFQUFrQyxLQUFLakssRUFBTCxDQUFRa2EsY0FBMUMsRUFBeUQsS0FBS3RCLEtBQTlELEdBQXFFLEtBQUtsUCxLQUFMLENBQVdrUCxLQUFYLEdBQWlCLEtBQUtBLEtBQTNILENBQWw3QixFQUFvakMsS0FBSzdWLEtBQUwsSUFBWSxLQUFLQSxLQUFMLENBQVd2RCxLQUFYLEtBQW1CLEtBQUtBLEtBQUwsR0FBVyxLQUFLdUQsS0FBTCxDQUFXdkQsS0FBdEIsRUFBNEIsS0FBS0MsTUFBTCxHQUFZLEtBQUtzRCxLQUFMLENBQVd0RCxNQUF0RSxHQUE4RSxLQUFLTyxFQUFMLENBQVFILFFBQVIsQ0FBaUJzYSxRQUFqQixJQUEyQkMsV0FBVyxDQUFDQyxNQUFaLENBQW1CLEtBQUt0WCxLQUF4QixDQUEzQixHQUEwRCxLQUFLL0MsRUFBTCxDQUFRc2EsVUFBUixDQUFtQixLQUFLclEsTUFBeEIsRUFBK0IsS0FBS2lQLEtBQXBDLEVBQTBDLEtBQUtULGNBQS9DLEVBQThELEtBQUtqWixLQUFuRSxFQUF5RSxLQUFLQyxNQUE5RSxFQUFxRixDQUFyRixFQUF1RixLQUFLOFksTUFBNUYsRUFBbUcsS0FBSzNPLElBQXhHLEVBQTZHLEtBQUs3RyxLQUFsSCxDQUExRCxHQUFtTCxLQUFLL0MsRUFBTCxDQUFRc2EsVUFBUixDQUFtQixLQUFLclEsTUFBeEIsRUFBK0IsS0FBS2lQLEtBQXBDLEVBQTBDLEtBQUtULGNBQS9DLEVBQThELEtBQUtGLE1BQW5FLEVBQTBFLEtBQUszTyxJQUEvRSxFQUFvRixLQUFLN0csS0FBekYsQ0FBalEsRUFBaVcsS0FBSzhWLGVBQUwsS0FBdUIsS0FBSzdZLEVBQUwsQ0FBUUgsUUFBUixDQUFpQnNhLFFBQWpCLElBQTJCaEMsQ0FBQyxDQUFDLEtBQUtwVixLQUFMLENBQVd2RCxLQUFaLENBQUQsSUFBcUIyWSxDQUFDLENBQUMsS0FBS3BWLEtBQUwsQ0FBV3RELE1BQVosQ0FBakQsR0FBcUUsS0FBS08sRUFBTCxDQUFRdWEsY0FBUixDQUF1QixLQUFLdFEsTUFBNUIsQ0FBckUsSUFBMEcsS0FBSzRPLGVBQUwsR0FBcUIsQ0FBQyxDQUF0QixFQUF3QixLQUFLSCxLQUFMLEdBQVcsS0FBS0UsS0FBTCxHQUFXLEtBQUs1WSxFQUFMLENBQVEyWSxhQUF0RCxFQUFvRSxLQUFLbFcsU0FBTCxHQUFlLEtBQUt6QyxFQUFMLENBQVEwQyxNQUFyTSxDQUF2QixDQUE3VyxJQUFtbEIsS0FBS2xELEtBQUwsR0FBVyxLQUFLUSxFQUFMLENBQVFzYSxVQUFSLENBQW1CLEtBQUtyUSxNQUF4QixFQUErQixLQUFLaVAsS0FBcEMsRUFBMEMsS0FBS1QsY0FBL0MsRUFBOEQsS0FBS2paLEtBQW5FLEVBQXlFLEtBQUtDLE1BQTlFLEVBQXFGLENBQXJGLEVBQXVGLEtBQUs4WSxNQUE1RixFQUFtRyxLQUFLM08sSUFBeEcsRUFBNkcsSUFBN0csQ0FBWCxHQUE4SCxLQUFLNUosRUFBTCxDQUFRc2EsVUFBUixDQUFtQixLQUFLclEsTUFBeEIsRUFBK0IsQ0FBL0IsRUFBaUMsS0FBS2pLLEVBQUwsQ0FBUXdZLElBQXpDLEVBQThDLENBQTlDLEVBQWdELENBQWhELEVBQWtELENBQWxELEVBQW9ELEtBQUt4WSxFQUFMLENBQVF3WSxJQUE1RCxFQUFpRSxLQUFLeFksRUFBTCxDQUFRc1ksYUFBekUsRUFBdUZMLENBQXZGLENBQXJ3RCxFQUErMUQsS0FBS21CLEtBQUwsQ0FBV3JXLEtBQVgsR0FBaUIsS0FBS0EsS0FBcjNELEVBQTIzRCxLQUFLeVgsUUFBTCxJQUFlLEtBQUtBLFFBQUwsRUFBNzRELENBQTlGO0FBQTQvRDs7QUFBdG1HOztBQUF1bUcsUUFBTWxTLENBQU4sQ0FBTztBQUFDakosSUFBQUEsV0FBVyxDQUFDMEcsQ0FBRCxFQUFHO0FBQUN2RyxNQUFBQSxLQUFLLEVBQUN3RyxDQUFDLEdBQUNELENBQUMsQ0FBQ3JHLE1BQUYsQ0FBU0YsS0FBbEI7QUFBd0JDLE1BQUFBLE1BQU0sRUFBQ3dHLENBQUMsR0FBQ0YsQ0FBQyxDQUFDckcsTUFBRixDQUFTRCxNQUExQztBQUFpRHdLLE1BQUFBLE1BQU0sRUFBQ3RDLENBQUMsR0FBQzVCLENBQUMsQ0FBQzBVLFdBQTVEO0FBQXdFQyxNQUFBQSxLQUFLLEVBQUN2UyxDQUFDLEdBQUMsQ0FBaEY7QUFBa0Z3UyxNQUFBQSxLQUFLLEVBQUM3VyxDQUFDLEdBQUMsQ0FBQyxDQUEzRjtBQUE2RjhXLE1BQUFBLE9BQU8sRUFBQ3JVLENBQUMsR0FBQyxDQUFDLENBQXhHO0FBQTBHc1UsTUFBQUEsWUFBWSxFQUFDdFMsQ0FBQyxHQUFDLENBQUMsQ0FBMUg7QUFBNEhtUSxNQUFBQSxLQUFLLEVBQUM3UixDQUFDLEdBQUNkLENBQUMsQ0FBQzRTLGFBQXRJO0FBQW9KQyxNQUFBQSxLQUFLLEVBQUNyUixDQUFDLEdBQUN4QixDQUFDLENBQUM0UyxhQUE5SjtBQUE0S2xXLE1BQUFBLFNBQVMsRUFBQytFLENBQUMsR0FBQ3pCLENBQUMsQ0FBQ3JELE1BQTFMO0FBQWlNQyxNQUFBQSxTQUFTLEVBQUN5RixDQUFDLEdBQUNaLENBQTdNO0FBQStNb0MsTUFBQUEsSUFBSSxFQUFDdEIsQ0FBQyxHQUFDdkMsQ0FBQyxDQUFDdVMsYUFBeE47QUFBc09DLE1BQUFBLE1BQU0sRUFBQ2pSLENBQUMsR0FBQ3ZCLENBQUMsQ0FBQ3lTLElBQWpQO0FBQXNQQyxNQUFBQSxjQUFjLEVBQUN2USxDQUFDLEdBQUNaLENBQXZRO0FBQXlRMFIsTUFBQUEsZUFBZSxFQUFDMUwsQ0FBelI7QUFBMlJ5TCxNQUFBQSxnQkFBZ0IsRUFBQ3ZMO0FBQTVTLFFBQStTLEVBQWxULEVBQXFUO0FBQUMsV0FBS3hOLEVBQUwsR0FBUStGLENBQVIsRUFBVSxLQUFLdkcsS0FBTCxHQUFXd0csQ0FBckIsRUFBdUIsS0FBS3ZHLE1BQUwsR0FBWXdHLENBQW5DLEVBQXFDLEtBQUttRSxNQUFMLEdBQVksS0FBS3BLLEVBQUwsQ0FBUThhLGlCQUFSLEVBQWpELEVBQTZFLEtBQUs3USxNQUFMLEdBQVl0QyxDQUF6RixFQUEyRixLQUFLM0gsRUFBTCxDQUFRK2EsZUFBUixDQUF3QixLQUFLOVEsTUFBN0IsRUFBb0MsS0FBS0csTUFBekMsQ0FBM0YsRUFBNEksS0FBSzRRLFFBQUwsR0FBYyxFQUExSjs7QUFBNkosV0FBSSxJQUFJOVUsQ0FBQyxHQUFDLENBQVYsRUFBWUEsQ0FBQyxHQUFDaUMsQ0FBZCxFQUFnQmpDLENBQUMsRUFBakIsRUFBb0IsS0FBSzhVLFFBQUwsQ0FBY3pKLElBQWQsQ0FBbUIsSUFBSWxKLENBQUosQ0FBTXRDLENBQU4sRUFBUTtBQUFDdkcsUUFBQUEsS0FBSyxFQUFDd0csQ0FBUDtBQUFTdkcsUUFBQUEsTUFBTSxFQUFDd0csQ0FBaEI7QUFBa0J5UyxRQUFBQSxLQUFLLEVBQUM3UixDQUF4QjtBQUEwQitSLFFBQUFBLEtBQUssRUFBQ3JSLENBQWhDO0FBQWtDOUUsUUFBQUEsU0FBUyxFQUFDK0UsQ0FBNUM7QUFBOEM3RSxRQUFBQSxTQUFTLEVBQUN5RixDQUF4RDtBQUEwRHdCLFFBQUFBLElBQUksRUFBQ3RCLENBQS9EO0FBQWlFaVEsUUFBQUEsTUFBTSxFQUFDalIsQ0FBeEU7QUFBMEVtUixRQUFBQSxjQUFjLEVBQUN2USxDQUF6RjtBQUEyRjhRLFFBQUFBLGVBQWUsRUFBQzFMLENBQTNHO0FBQTZHeUwsUUFBQUEsZ0JBQWdCLEVBQUN2TCxDQUE5SDtBQUFnSXlMLFFBQUFBLEtBQUssRUFBQyxDQUFDLENBQXZJO0FBQXlJSixRQUFBQSxlQUFlLEVBQUMsQ0FBQztBQUExSixPQUFSLENBQW5CLEdBQTBMLEtBQUttQyxRQUFMLENBQWM5VSxDQUFkLEVBQWlCbEIsTUFBakIsRUFBMUwsRUFBb04sS0FBS2hGLEVBQUwsQ0FBUWliLG9CQUFSLENBQTZCLEtBQUtoUixNQUFsQyxFQUF5QyxLQUFLakssRUFBTCxDQUFRa2IsaUJBQVIsR0FBMEJoVixDQUFuRSxFQUFxRSxLQUFLbEcsRUFBTCxDQUFRcVksVUFBN0UsRUFBd0YsS0FBSzJDLFFBQUwsQ0FBYzlVLENBQWQsRUFBaUIzRCxPQUF6RyxFQUFpSCxDQUFqSCxDQUFwTjs7QUFBd1UsV0FBS0EsT0FBTCxHQUFhLEtBQUt5WSxRQUFMLENBQWMsQ0FBZCxDQUFiLEVBQThCelMsQ0FBQyxLQUFHLEtBQUt2SSxFQUFMLENBQVFILFFBQVIsQ0FBaUJzYSxRQUFqQixJQUEyQixLQUFLbmEsRUFBTCxDQUFRSCxRQUFSLENBQWlCc2IsWUFBakIsQ0FBOEIscUJBQTlCLENBQTlCLENBQUQsSUFBc0YsS0FBS04sWUFBTCxHQUFrQixJQUFJeFMsQ0FBSixDQUFNdEMsQ0FBTixFQUFRO0FBQUN2RyxRQUFBQSxLQUFLLEVBQUN3RyxDQUFQO0FBQVN2RyxRQUFBQSxNQUFNLEVBQUN3RyxDQUFoQjtBQUFrQnlTLFFBQUFBLEtBQUssRUFBQzdSLENBQXhCO0FBQTBCK1IsUUFBQUEsS0FBSyxFQUFDclIsQ0FBaEM7QUFBa0M5RSxRQUFBQSxTQUFTLEVBQUMsS0FBS3pDLEVBQUwsQ0FBUW9iLE9BQXBEO0FBQTREelksUUFBQUEsU0FBUyxFQUFDLEtBQUszQyxFQUFMLENBQVFvYixPQUE5RTtBQUFzRm5DLFFBQUFBLEtBQUssRUFBQyxDQUFDLENBQTdGO0FBQStGVixRQUFBQSxNQUFNLEVBQUMsS0FBS3ZZLEVBQUwsQ0FBUXFiLGVBQTlHO0FBQThINUMsUUFBQUEsY0FBYyxFQUFDMVMsQ0FBQyxDQUFDbEcsUUFBRixDQUFXc2EsUUFBWCxHQUFvQixLQUFLbmEsRUFBTCxDQUFRc2IsaUJBQTVCLEdBQThDLEtBQUt0YixFQUFMLENBQVFxYixlQUFuTTtBQUFtTnpSLFFBQUFBLElBQUksRUFBQyxLQUFLNUosRUFBTCxDQUFRZ0ssWUFBaE87QUFBNk82TyxRQUFBQSxlQUFlLEVBQUMsQ0FBQztBQUE5UCxPQUFSLENBQWxCLEVBQTRSLEtBQUtnQyxZQUFMLENBQWtCN1YsTUFBbEIsRUFBNVIsRUFBdVQsS0FBS2hGLEVBQUwsQ0FBUWliLG9CQUFSLENBQTZCLEtBQUtoUixNQUFsQyxFQUF5QyxLQUFLakssRUFBTCxDQUFRdWIsZ0JBQWpELEVBQWtFLEtBQUt2YixFQUFMLENBQVFxWSxVQUExRSxFQUFxRixLQUFLd0MsWUFBTCxDQUFrQnRZLE9BQXZHLEVBQStHLENBQS9HLENBQTdZLEtBQWlnQnVCLENBQUMsSUFBRSxDQUFDeUMsQ0FBSixLQUFRLEtBQUtpVixXQUFMLEdBQWlCLEtBQUt4YixFQUFMLENBQVF5YixrQkFBUixFQUFqQixFQUE4QyxLQUFLemIsRUFBTCxDQUFRMGIsZ0JBQVIsQ0FBeUIsS0FBSzFiLEVBQUwsQ0FBUTJiLFlBQWpDLEVBQThDLEtBQUtILFdBQW5ELENBQTlDLEVBQThHLEtBQUt4YixFQUFMLENBQVE0YixtQkFBUixDQUE0QixLQUFLNWIsRUFBTCxDQUFRMmIsWUFBcEMsRUFBaUQsS0FBSzNiLEVBQUwsQ0FBUTZiLGlCQUF6RCxFQUEyRTdWLENBQTNFLEVBQTZFQyxDQUE3RSxDQUE5RyxFQUE4TCxLQUFLakcsRUFBTCxDQUFROGIsdUJBQVIsQ0FBZ0MsS0FBSzdSLE1BQXJDLEVBQTRDLEtBQUtqSyxFQUFMLENBQVF1YixnQkFBcEQsRUFBcUUsS0FBS3ZiLEVBQUwsQ0FBUTJiLFlBQTdFLEVBQTBGLEtBQUtILFdBQS9GLENBQXRNLEdBQW1UalYsQ0FBQyxJQUFFLENBQUN6QyxDQUFKLEtBQVEsS0FBS2lZLGFBQUwsR0FBbUIsS0FBSy9iLEVBQUwsQ0FBUXliLGtCQUFSLEVBQW5CLEVBQWdELEtBQUt6YixFQUFMLENBQVEwYixnQkFBUixDQUF5QixLQUFLMWIsRUFBTCxDQUFRMmIsWUFBakMsRUFBOEMsS0FBS0ksYUFBbkQsQ0FBaEQsRUFBa0gsS0FBSy9iLEVBQUwsQ0FBUTRiLG1CQUFSLENBQTRCLEtBQUs1YixFQUFMLENBQVEyYixZQUFwQyxFQUFpRCxLQUFLM2IsRUFBTCxDQUFRZ2MsY0FBekQsRUFBd0VoVyxDQUF4RSxFQUEwRUMsQ0FBMUUsQ0FBbEgsRUFBK0wsS0FBS2pHLEVBQUwsQ0FBUThiLHVCQUFSLENBQWdDLEtBQUs3UixNQUFyQyxFQUE0QyxLQUFLakssRUFBTCxDQUFRaWMsa0JBQXBELEVBQXVFLEtBQUtqYyxFQUFMLENBQVEyYixZQUEvRSxFQUE0RixLQUFLSSxhQUFqRyxDQUF2TSxDQUFuVCxFQUEybUJqWSxDQUFDLElBQUV5QyxDQUFILEtBQU8sS0FBSzJWLGtCQUFMLEdBQXdCLEtBQUtsYyxFQUFMLENBQVF5YixrQkFBUixFQUF4QixFQUFxRCxLQUFLemIsRUFBTCxDQUFRMGIsZ0JBQVIsQ0FBeUIsS0FBSzFiLEVBQUwsQ0FBUTJiLFlBQWpDLEVBQThDLEtBQUtPLGtCQUFuRCxDQUFyRCxFQUE0SCxLQUFLbGMsRUFBTCxDQUFRNGIsbUJBQVIsQ0FBNEIsS0FBSzViLEVBQUwsQ0FBUTJiLFlBQXBDLEVBQWlELEtBQUszYixFQUFMLENBQVFtYyxhQUF6RCxFQUF1RW5XLENBQXZFLEVBQXlFQyxDQUF6RSxDQUE1SCxFQUF3TSxLQUFLakcsRUFBTCxDQUFROGIsdUJBQVIsQ0FBZ0MsS0FBSzdSLE1BQXJDLEVBQTRDLEtBQUtqSyxFQUFMLENBQVFvYyx3QkFBcEQsRUFBNkUsS0FBS3BjLEVBQUwsQ0FBUTJiLFlBQXJGLEVBQWtHLEtBQUtPLGtCQUF2RyxDQUEvTSxDQUE1bUMsQ0FBOUIsRUFBczlDLEtBQUtsYyxFQUFMLENBQVErYSxlQUFSLENBQXdCLEtBQUs5USxNQUE3QixFQUFvQyxJQUFwQyxDQUF0OUM7QUFBZ2dEOztBQUEzekU7O0FBQTR6RSxRQUFNL0IsQ0FBTixTQUFnQnRCLEtBQWhCLENBQXFCO0FBQUN2SCxJQUFBQSxXQUFXLENBQUMwRyxDQUFDLEdBQUMsQ0FBSCxFQUFLQyxDQUFDLEdBQUMsQ0FBUCxFQUFTQyxDQUFDLEdBQUMsQ0FBWCxFQUFhO0FBQUMsYUFBTSxZQUFVLE9BQU9GLENBQWpCLEtBQXFCLENBQUNBLENBQUQsRUFBR0MsQ0FBSCxFQUFLQyxDQUFMLElBQVFpQyxDQUFDLENBQUNtVSxRQUFGLENBQVd0VyxDQUFYLENBQTdCLEdBQTRDLE1BQU1BLENBQU4sRUFBUUMsQ0FBUixFQUFVQyxDQUFWLENBQTVDLEVBQXlELElBQS9EO0FBQW9FOztBQUFLLFFBQURxSCxDQUFDLEdBQUU7QUFBQyxhQUFPLEtBQUssQ0FBTCxDQUFQO0FBQWU7O0FBQUssUUFBREEsQ0FBQyxDQUFDdkgsQ0FBRCxFQUFHO0FBQUMsV0FBSyxDQUFMLElBQVFBLENBQVI7QUFBVTs7QUFBSyxRQUFEYyxDQUFDLEdBQUU7QUFBQyxhQUFPLEtBQUssQ0FBTCxDQUFQO0FBQWU7O0FBQUssUUFBREEsQ0FBQyxDQUFDZCxDQUFELEVBQUc7QUFBQyxXQUFLLENBQUwsSUFBUUEsQ0FBUjtBQUFVOztBQUFLLFFBQURDLENBQUMsR0FBRTtBQUFDLGFBQU8sS0FBSyxDQUFMLENBQVA7QUFBZTs7QUFBSyxRQUFEQSxDQUFDLENBQUNELENBQUQsRUFBRztBQUFDLFdBQUssQ0FBTCxJQUFRQSxDQUFSO0FBQVU7O0FBQUF6QixJQUFBQSxHQUFHLENBQUN5QixDQUFELEVBQUdDLENBQUgsRUFBS0MsQ0FBTCxFQUFPO0FBQUMsYUFBTSxZQUFVLE9BQU9GLENBQWpCLEtBQXFCLENBQUNBLENBQUQsRUFBR0MsQ0FBSCxFQUFLQyxDQUFMLElBQVFpQyxDQUFDLENBQUNtVSxRQUFGLENBQVd0VyxDQUFYLENBQTdCLEdBQTRDQSxDQUFDLENBQUM5QixNQUFGLEdBQVMsS0FBS2tCLElBQUwsQ0FBVVksQ0FBVixDQUFULElBQXVCLEtBQUssQ0FBTCxJQUFRQSxDQUFSLEVBQVUsS0FBSyxDQUFMLElBQVFDLENBQWxCLEVBQW9CLEtBQUssQ0FBTCxJQUFRQyxDQUE1QixFQUE4QixJQUFyRCxDQUFsRDtBQUE2Rzs7QUFBQWQsSUFBQUEsSUFBSSxDQUFDWSxDQUFELEVBQUc7QUFBQyxhQUFPLEtBQUssQ0FBTCxJQUFRQSxDQUFDLENBQUMsQ0FBRCxDQUFULEVBQWEsS0FBSyxDQUFMLElBQVFBLENBQUMsQ0FBQyxDQUFELENBQXRCLEVBQTBCLEtBQUssQ0FBTCxJQUFRQSxDQUFDLENBQUMsQ0FBRCxDQUFuQyxFQUF1QyxJQUE5QztBQUFtRDs7QUFBZSxXQUFSc1csUUFBUSxDQUFDdFcsQ0FBRCxFQUFHO0FBQUMsWUFBSUEsQ0FBQyxDQUFDOUIsTUFBTixLQUFlOEIsQ0FBQyxHQUFDQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtBLENBQUMsQ0FBQyxDQUFELENBQU4sR0FBVUEsQ0FBQyxDQUFDLENBQUQsQ0FBWCxHQUFlQSxDQUFDLENBQUMsQ0FBRCxDQUFoQixHQUFvQkEsQ0FBQyxDQUFDLENBQUQsQ0FBckIsR0FBeUJBLENBQUMsQ0FBQyxDQUFELENBQTFCLEdBQThCQSxDQUFDLENBQUMsQ0FBRCxDQUFoRDtBQUFxRCxVQUFJQyxDQUFDLEdBQUMsNENBQTRDc1csSUFBNUMsQ0FBaUR2VyxDQUFqRCxDQUFOO0FBQTBELGFBQU9DLENBQUMsSUFBRTBFLE9BQU8sQ0FBQ0MsSUFBUixDQUFjLGdDQUErQjVFLENBQUUsZ0JBQS9DLENBQUgsRUFBbUUsQ0FBQ3dXLFFBQVEsQ0FBQ3ZXLENBQUMsQ0FBQyxDQUFELENBQUYsRUFBTSxFQUFOLENBQVIsR0FBa0IsR0FBbkIsRUFBdUJ1VyxRQUFRLENBQUN2VyxDQUFDLENBQUMsQ0FBRCxDQUFGLEVBQU0sRUFBTixDQUFSLEdBQWtCLEdBQXpDLEVBQTZDdVcsUUFBUSxDQUFDdlcsQ0FBQyxDQUFDLENBQUQsQ0FBRixFQUFNLEVBQU4sQ0FBUixHQUFrQixHQUEvRCxDQUExRTtBQUE4STs7QUFBL3BCOztBQUFncUIsV0FBU3dXLENBQVQsQ0FBV3pXLENBQVgsRUFBYUMsQ0FBYixFQUFlQyxDQUFmLEVBQWlCO0FBQUMsV0FBT0YsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUMsQ0FBQyxDQUFELENBQVgsRUFBZUYsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUMsQ0FBQyxDQUFELENBQTFCLEVBQThCRixDQUFyQztBQUF1Qzs7QUFBQSxXQUFTMFcsQ0FBVCxDQUFXMVcsQ0FBWCxFQUFhQyxDQUFiLEVBQWVDLENBQWYsRUFBaUI7QUFBQyxXQUFPRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBWCxFQUFlRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBMUIsRUFBOEJGLENBQXJDO0FBQXVDOztBQUFBLFdBQVMyVyxDQUFULENBQVczVyxDQUFYLEVBQWFDLENBQWIsRUFBZUMsQ0FBZixFQUFpQjtBQUFDLFdBQU9GLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFWLEVBQVlGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUF0QixFQUF3QkYsQ0FBL0I7QUFBaUM7O0FBQUEsV0FBUzRXLEVBQVQsQ0FBWTVXLENBQVosRUFBYztBQUFDLFFBQUlDLENBQUMsR0FBQ0QsQ0FBQyxDQUFDLENBQUQsQ0FBUDtBQUFBLFFBQVdFLENBQUMsR0FBQ0YsQ0FBQyxDQUFDLENBQUQsQ0FBZDtBQUFrQixXQUFPbEIsSUFBSSxDQUFDc0IsSUFBTCxDQUFVSCxDQUFDLEdBQUNBLENBQUYsR0FBSUMsQ0FBQyxHQUFDQSxDQUFoQixDQUFQO0FBQTBCOztBQUFBLFFBQU1uQyxDQUFOLFNBQWdCOEMsS0FBaEIsQ0FBcUI7QUFBQ3ZILElBQUFBLFdBQVcsQ0FBQzBHLENBQUMsR0FBQyxDQUFILEVBQUtDLENBQUMsR0FBQ0QsQ0FBUCxFQUFTO0FBQUMsYUFBTyxNQUFNQSxDQUFOLEVBQVFDLENBQVIsR0FBVyxJQUFsQjtBQUF1Qjs7QUFBSyxRQUFEOUIsQ0FBQyxHQUFFO0FBQUMsYUFBTyxLQUFLLENBQUwsQ0FBUDtBQUFlOztBQUFLLFFBQURBLENBQUMsQ0FBQzZCLENBQUQsRUFBRztBQUFDLFdBQUssQ0FBTCxJQUFRQSxDQUFSO0FBQVU7O0FBQUssUUFBRDNCLENBQUMsR0FBRTtBQUFDLGFBQU8sS0FBSyxDQUFMLENBQVA7QUFBZTs7QUFBSyxRQUFEQSxDQUFDLENBQUMyQixDQUFELEVBQUc7QUFBQyxXQUFLLENBQUwsSUFBUUEsQ0FBUjtBQUFVOztBQUFBekIsSUFBQUEsR0FBRyxDQUFDeUIsQ0FBRCxFQUFHakMsQ0FBQyxHQUFDaUMsQ0FBTCxFQUFPO0FBQUMsVUFBSUMsQ0FBSixFQUFNQyxDQUFOLEVBQVFDLENBQVI7QUFBVSxhQUFPSCxDQUFDLENBQUM5QixNQUFGLEdBQVMsS0FBS2tCLElBQUwsQ0FBVVksQ0FBVixDQUFULElBQXVCQyxDQUFDLEdBQUMsSUFBRixFQUFPQyxDQUFDLEdBQUNGLENBQVQsRUFBV0csQ0FBQyxHQUFDcEMsQ0FBYixFQUFla0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFwQixFQUFzQkQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRSxDQUEzQixFQUE2QixJQUFwRCxDQUFQO0FBQWlFOztBQUFBZixJQUFBQSxJQUFJLENBQUNjLENBQUQsRUFBRztBQUFDLFVBQUlELENBQUosRUFBTUQsQ0FBTjtBQUFRLGFBQU9BLENBQUMsR0FBQ0UsQ0FBRixFQUFJLENBQUNELENBQUMsR0FBQyxJQUFILEVBQVMsQ0FBVCxJQUFZRCxDQUFDLENBQUMsQ0FBRCxDQUFqQixFQUFxQkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUEzQixFQUErQixJQUF0QztBQUEyQzs7QUFBQWUsSUFBQUEsR0FBRyxDQUFDZixDQUFELEVBQUdDLENBQUgsRUFBSztBQUFDLGFBQU9BLENBQUMsR0FBQ3dXLENBQUMsQ0FBQyxJQUFELEVBQU16VyxDQUFOLEVBQVFDLENBQVIsQ0FBRixHQUFhd1csQ0FBQyxDQUFDLElBQUQsRUFBTSxJQUFOLEVBQVd6VyxDQUFYLENBQWYsRUFBNkIsSUFBcEM7QUFBeUM7O0FBQUFnQixJQUFBQSxHQUFHLENBQUNoQixDQUFELEVBQUdDLENBQUgsRUFBSztBQUFDLGFBQU9BLENBQUMsR0FBQ3lXLENBQUMsQ0FBQyxJQUFELEVBQU0xVyxDQUFOLEVBQVFDLENBQVIsQ0FBRixHQUFheVcsQ0FBQyxDQUFDLElBQUQsRUFBTSxJQUFOLEVBQVcxVyxDQUFYLENBQWYsRUFBNkIsSUFBcEM7QUFBeUM7O0FBQUFpQixJQUFBQSxRQUFRLENBQUNqQixDQUFELEVBQUc7QUFBQyxVQUFJRyxDQUFKLEVBQU1GLENBQU4sRUFBUUMsQ0FBUjtBQUFVLGFBQU9GLENBQUMsQ0FBQzlCLE1BQUYsSUFBVStCLENBQUMsR0FBQyxJQUFGLEVBQU9DLENBQUMsR0FBQ0YsQ0FBVCxFQUFXLENBQUNHLENBQUMsR0FBQyxJQUFILEVBQVMsQ0FBVCxJQUFZRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUMsQ0FBQyxDQUFELENBQTdCLEVBQWlDQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBdEQsSUFBMkR5VyxDQUFDLENBQUMsSUFBRCxFQUFNLElBQU4sRUFBVzNXLENBQVgsQ0FBNUQsRUFBMEUsSUFBakY7QUFBc0Y7O0FBQUFrQixJQUFBQSxNQUFNLENBQUNsQixDQUFELEVBQUc7QUFBQyxVQUFJRyxDQUFKLEVBQU1GLENBQU4sRUFBUUMsQ0FBUjtBQUFVLGFBQU9GLENBQUMsQ0FBQzlCLE1BQUYsSUFBVStCLENBQUMsR0FBQyxJQUFGLEVBQU9DLENBQUMsR0FBQ0YsQ0FBVCxFQUFXLENBQUNHLENBQUMsR0FBQyxJQUFILEVBQVMsQ0FBVCxJQUFZRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtDLENBQUMsQ0FBQyxDQUFELENBQTdCLEVBQWlDQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtGLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0MsQ0FBQyxDQUFDLENBQUQsQ0FBdEQsSUFBMkR5VyxDQUFDLENBQUMsSUFBRCxFQUFNLElBQU4sRUFBVyxJQUFFM1csQ0FBYixDQUE1RCxFQUE0RSxJQUFuRjtBQUF3Rjs7QUFBQW1CLElBQUFBLE9BQU8sQ0FBQ2pCLENBQUMsR0FBQyxJQUFILEVBQVE7QUFBQyxVQUFJRCxDQUFKLEVBQU1ELENBQU47QUFBUSxhQUFPQSxDQUFDLEdBQUNFLENBQUYsRUFBSSxDQUFDRCxDQUFDLEdBQUMsSUFBSCxFQUFTLENBQVQsSUFBWSxJQUFFRCxDQUFDLENBQUMsQ0FBRCxDQUFuQixFQUF1QkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLElBQUVELENBQUMsQ0FBQyxDQUFELENBQS9CLEVBQW1DLElBQTFDO0FBQStDOztBQUFBVixJQUFBQSxHQUFHLEdBQUU7QUFBQyxhQUFPc1gsRUFBRSxDQUFDLElBQUQsQ0FBVDtBQUFnQjs7QUFBQXhWLElBQUFBLFFBQVEsQ0FBQ2pCLENBQUQsRUFBRztBQUFDLFVBQUlILENBQUosRUFBTWpDLENBQU4sRUFBUWtDLENBQVIsRUFBVUMsQ0FBVjtBQUFZLGFBQU9DLENBQUMsSUFBRUgsQ0FBQyxHQUFDLElBQUYsRUFBT0MsQ0FBQyxHQUFDLENBQUNsQyxDQUFDLEdBQUNvQyxDQUFILEVBQU0sQ0FBTixJQUFTSCxDQUFDLENBQUMsQ0FBRCxDQUFuQixFQUF1QkUsQ0FBQyxHQUFDbkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLaUMsQ0FBQyxDQUFDLENBQUQsQ0FBL0IsRUFBbUNsQixJQUFJLENBQUNzQixJQUFMLENBQVVILENBQUMsR0FBQ0EsQ0FBRixHQUFJQyxDQUFDLEdBQUNBLENBQWhCLENBQXJDLElBQXlEMFcsRUFBRSxDQUFDLElBQUQsQ0FBbkU7QUFBMEU7O0FBQUF2VixJQUFBQSxVQUFVLEdBQUU7QUFBQyxhQUFPLEtBQUtDLGVBQUwsRUFBUDtBQUE4Qjs7QUFBQUEsSUFBQUEsZUFBZSxDQUFDUixDQUFELEVBQUc7QUFBQyxVQUFJZCxDQUFKLEVBQU13QixDQUFOLEVBQVF2QixDQUFSLEVBQVVDLENBQVYsRUFBWUMsQ0FBWixFQUFjcEMsQ0FBZCxFQUFnQnlDLENBQWhCO0FBQWtCLGFBQU9NLENBQUMsSUFBRWQsQ0FBQyxHQUFDLElBQUYsRUFBT0MsQ0FBQyxHQUFDLENBQUN1QixDQUFDLEdBQUNWLENBQUgsRUFBTSxDQUFOLElBQVNkLENBQUMsQ0FBQyxDQUFELENBQW5CLEVBQXVCRSxDQUFDLEdBQUNzQixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUt4QixDQUFDLENBQUMsQ0FBRCxDQUEvQixFQUFtQ0MsQ0FBQyxHQUFDQSxDQUFGLEdBQUlDLENBQUMsR0FBQ0EsQ0FBM0MsS0FBK0NDLENBQUMsR0FBQyxJQUFGLEVBQU9wQyxDQUFDLEdBQUNvQyxDQUFDLENBQUMsQ0FBRCxDQUFWLEVBQWNLLENBQUMsR0FBQ0wsQ0FBQyxDQUFDLENBQUQsQ0FBakIsRUFBcUJwQyxDQUFDLEdBQUNBLENBQUYsR0FBSXlDLENBQUMsR0FBQ0EsQ0FBMUUsQ0FBUjtBQUFxRjs7QUFBQWtCLElBQUFBLE1BQU0sQ0FBQ3hCLENBQUMsR0FBQyxJQUFILEVBQVE7QUFBQyxVQUFJRCxDQUFKLEVBQU1ELENBQU47QUFBUSxhQUFPQSxDQUFDLEdBQUNFLENBQUYsRUFBSSxDQUFDRCxDQUFDLEdBQUMsSUFBSCxFQUFTLENBQVQsSUFBWSxDQUFDRCxDQUFDLENBQUMsQ0FBRCxDQUFsQixFQUFzQkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLLENBQUNELENBQUMsQ0FBQyxDQUFELENBQTdCLEVBQWlDLElBQXhDO0FBQTZDOztBQUFBMkIsSUFBQUEsS0FBSyxDQUFDekIsQ0FBRCxFQUFHQyxDQUFILEVBQUs7QUFBQyxVQUFJRixDQUFKLEVBQU1ELENBQU47QUFBUSxhQUFPQSxDQUFDLEdBQUNHLENBQUYsRUFBSSxDQUFDRixDQUFDLEdBQUNDLENBQUgsRUFBTSxDQUFOLElBQVNGLENBQUMsQ0FBQyxDQUFELENBQVYsR0FBY0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUEvQjtBQUFtQzs7QUFBQTZCLElBQUFBLEtBQUssQ0FBQzdCLENBQUQsRUFBRztBQUFDLGFBQU8yVyxDQUFDLENBQUMsSUFBRCxFQUFNLElBQU4sRUFBVzNXLENBQVgsQ0FBRCxFQUFlLElBQXRCO0FBQTJCOztBQUFBOEIsSUFBQUEsU0FBUyxHQUFFO0FBQUMsVUFBSTVCLENBQUosRUFBTUQsQ0FBTixFQUFRRSxDQUFSLEVBQVVwQyxDQUFWLEVBQVlpQyxDQUFaO0FBQWMsYUFBT0UsQ0FBQyxHQUFDLElBQUYsRUFBT0MsQ0FBQyxHQUFDLENBQUNGLENBQUMsR0FBQyxJQUFILEVBQVMsQ0FBVCxDQUFULEVBQXFCbEMsQ0FBQyxHQUFDa0MsQ0FBQyxDQUFDLENBQUQsQ0FBeEIsRUFBNEIsQ0FBQ0QsQ0FBQyxHQUFDRyxDQUFDLEdBQUNBLENBQUYsR0FBSXBDLENBQUMsR0FBQ0EsQ0FBVCxJQUFZLENBQVosS0FBZ0JpQyxDQUFDLEdBQUMsSUFBRWxCLElBQUksQ0FBQ3NCLElBQUwsQ0FBVUosQ0FBVixDQUFwQixDQUE1QixFQUE4REUsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtELENBQXhFLEVBQTBFRSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0QsQ0FBcEYsRUFBc0YsSUFBN0Y7QUFBa0c7O0FBQUErQixJQUFBQSxHQUFHLENBQUM3QixDQUFELEVBQUc7QUFBQyxVQUFJRCxDQUFKLEVBQU1ELENBQU47QUFBUSxhQUFPQSxDQUFDLEdBQUNFLENBQUYsRUFBSSxDQUFDRCxDQUFDLEdBQUMsSUFBSCxFQUFTLENBQVQsSUFBWUQsQ0FBQyxDQUFDLENBQUQsQ0FBYixHQUFpQkMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUFsQztBQUFzQzs7QUFBQWdDLElBQUFBLE1BQU0sQ0FBQzlCLENBQUQsRUFBRztBQUFDLFVBQUlELENBQUosRUFBTUQsQ0FBTjtBQUFRLGFBQU9BLENBQUMsR0FBQ0UsQ0FBRixFQUFJLENBQUNELENBQUMsR0FBQyxJQUFILEVBQVMsQ0FBVCxNQUFjRCxDQUFDLENBQUMsQ0FBRCxDQUFmLElBQW9CQyxDQUFDLENBQUMsQ0FBRCxDQUFELEtBQU9ELENBQUMsQ0FBQyxDQUFELENBQXZDO0FBQTJDOztBQUFBNlcsSUFBQUEsWUFBWSxDQUFDclcsQ0FBRCxFQUFHO0FBQUMsVUFBSVAsQ0FBSixFQUFNbEMsQ0FBTixFQUFRaUMsQ0FBUixFQUFVRSxDQUFWLEVBQVlDLENBQVo7QUFBYyxhQUFPRixDQUFDLEdBQUMsSUFBRixFQUFPRCxDQUFDLEdBQUNRLENBQVQsRUFBV04sQ0FBQyxHQUFDLENBQUNuQyxDQUFDLEdBQUMsSUFBSCxFQUFTLENBQVQsQ0FBYixFQUF5Qm9DLENBQUMsR0FBQ3BDLENBQUMsQ0FBQyxDQUFELENBQTVCLEVBQWdDa0MsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtFLENBQUwsR0FBT0YsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRyxDQUFaLEdBQWNILENBQUMsQ0FBQyxDQUFELENBQXBELEVBQXdEQyxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0UsQ0FBTCxHQUFPRixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtHLENBQVosR0FBY0gsQ0FBQyxDQUFDLENBQUQsQ0FBNUUsRUFBZ0YsSUFBdkY7QUFBNEY7O0FBQUFpQyxJQUFBQSxZQUFZLENBQUN6QixDQUFELEVBQUc7QUFBQyxVQUFJUCxDQUFKLEVBQU1DLENBQU4sRUFBUUYsQ0FBUjtBQUFVLFVBQUlHLENBQUosRUFBTXBDLENBQU47QUFBUSxhQUFPa0MsQ0FBQyxHQUFDLElBQUYsRUFBT0MsQ0FBQyxHQUFDLElBQVQsRUFBY0YsQ0FBQyxHQUFDUSxDQUFoQixFQUFrQkwsQ0FBQyxHQUFDRCxDQUFDLENBQUMsQ0FBRCxDQUFyQixFQUF5Qm5DLENBQUMsR0FBQ21DLENBQUMsQ0FBQyxDQUFELENBQTVCLEVBQWdDRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0csQ0FBTCxHQUFPSCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtqQyxDQUFaLEdBQWNpQyxDQUFDLENBQUMsRUFBRCxDQUFwRCxFQUF5REMsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLRCxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtHLENBQUwsR0FBT0gsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLakMsQ0FBWixHQUFjaUMsQ0FBQyxDQUFDLEVBQUQsQ0FBN0UsRUFBa0YsSUFBekY7QUFBOEY7O0FBQUFYLElBQUFBLElBQUksQ0FBQ3lCLENBQUQsRUFBR1UsQ0FBSCxFQUFLO0FBQUMsVUFBSXhCLENBQUosRUFBTUMsQ0FBTixFQUFRQyxDQUFSLEVBQVVDLENBQVYsRUFBWXBDLENBQVosRUFBY3lDLENBQWQ7QUFBZ0JSLE1BQUFBLENBQUMsR0FBQyxJQUFGLEVBQU9DLENBQUMsR0FBQyxJQUFULEVBQWNDLENBQUMsR0FBQ1ksQ0FBaEIsRUFBa0JYLENBQUMsR0FBQ3FCLENBQXBCLEVBQXNCekQsQ0FBQyxHQUFDa0MsQ0FBQyxDQUFDLENBQUQsQ0FBekIsRUFBNkJPLENBQUMsR0FBQ1AsQ0FBQyxDQUFDLENBQUQsQ0FBaEMsRUFBb0NELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS2pDLENBQUMsR0FBQ29DLENBQUMsSUFBRUQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLbkMsQ0FBUCxDQUE1QyxFQUFzRGlDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS1EsQ0FBQyxHQUFDTCxDQUFDLElBQUVELENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS00sQ0FBUCxDQUE5RDtBQUF3RTs7QUFBQWtDLElBQUFBLEtBQUssR0FBRTtBQUFDLGFBQU8sSUFBSTNFLENBQUosQ0FBTSxLQUFLLENBQUwsQ0FBTixFQUFjLEtBQUssQ0FBTCxDQUFkLENBQVA7QUFBOEI7O0FBQUE0RSxJQUFBQSxTQUFTLENBQUMzQyxDQUFELEVBQUdDLENBQUMsR0FBQyxDQUFMLEVBQU87QUFBQyxhQUFPLEtBQUssQ0FBTCxJQUFRRCxDQUFDLENBQUNDLENBQUQsQ0FBVCxFQUFhLEtBQUssQ0FBTCxJQUFRRCxDQUFDLENBQUNDLENBQUMsR0FBQyxDQUFILENBQXRCLEVBQTRCLElBQW5DO0FBQXdDOztBQUFBMkMsSUFBQUEsT0FBTyxDQUFDNUMsQ0FBQyxHQUFDLEVBQUgsRUFBTUMsQ0FBQyxHQUFDLENBQVIsRUFBVTtBQUFDLGFBQU9ELENBQUMsQ0FBQ0MsQ0FBRCxDQUFELEdBQUssS0FBSyxDQUFMLENBQUwsRUFBYUQsQ0FBQyxDQUFDQyxDQUFDLEdBQUMsQ0FBSCxDQUFELEdBQU8sS0FBSyxDQUFMLENBQXBCLEVBQTRCRCxDQUFuQztBQUFxQzs7QUFBaHpEOztBQUFpekQsUUFBTXVILENBQU4sU0FBZ0IvRyxDQUFoQixDQUFpQjtBQUFDbEgsSUFBQUEsV0FBVyxDQUFDaUksQ0FBRCxFQUFHO0FBQUM5SCxNQUFBQSxLQUFLLEVBQUNtSSxDQUFDLEdBQUMsQ0FBVDtBQUFXbEksTUFBQUEsTUFBTSxFQUFDMEksQ0FBQyxHQUFDLENBQXBCO0FBQXNCMFUsTUFBQUEsYUFBYSxFQUFDdFUsQ0FBQyxHQUFDLENBQXRDO0FBQXdDdVUsTUFBQUEsY0FBYyxFQUFDMVUsQ0FBQyxHQUFDLENBQXpEO0FBQTJEWSxNQUFBQSxVQUFVLEVBQUM5QyxDQUFDLEdBQUM7QUFBeEUsUUFBNEUsRUFBL0UsRUFBa0Y7QUFBQyxVQUFJRixDQUFDLEdBQUN1QyxDQUFOO0FBQUEsVUFBUXRDLENBQUMsR0FBQ21DLENBQVY7QUFBQSxVQUFZckMsQ0FBQyxHQUFDLENBQUNDLENBQUMsR0FBQyxDQUFILEtBQU9DLENBQUMsR0FBQyxDQUFULENBQWQ7QUFBQSxVQUEwQm5DLENBQUMsR0FBQ2tDLENBQUMsR0FBQ0MsQ0FBRixHQUFJLENBQWhDO0FBQUEsVUFBa0NNLENBQUMsR0FBQyxJQUFJbkUsWUFBSixDQUFpQixJQUFFMkQsQ0FBbkIsQ0FBcEM7QUFBQSxVQUEwRGMsQ0FBQyxHQUFDLElBQUl6RSxZQUFKLENBQWlCLElBQUUyRCxDQUFuQixDQUE1RDtBQUFBLFVBQWtGd0IsQ0FBQyxHQUFDLElBQUluRixZQUFKLENBQWlCLElBQUUyRCxDQUFuQixDQUFwRjtBQUFBLFVBQTBHeUIsQ0FBQyxHQUFDekIsQ0FBQyxHQUFDLEtBQUYsR0FBUSxJQUFJZ1gsV0FBSixDQUFnQmpaLENBQWhCLENBQVIsR0FBMkIsSUFBSWdHLFdBQUosQ0FBZ0JoRyxDQUFoQixDQUF2STtBQUEwSndKLE1BQUFBLENBQUMsQ0FBQzBQLFVBQUYsQ0FBYXpXLENBQWIsRUFBZU0sQ0FBZixFQUFpQlUsQ0FBakIsRUFBbUJDLENBQW5CLEVBQXFCRyxDQUFyQixFQUF1QlEsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkJuQyxDQUEzQixFQUE2QkMsQ0FBN0IsR0FBZ0N3UixNQUFNLENBQUNDLE1BQVAsQ0FBY3hSLENBQWQsRUFBZ0I7QUFBQ2pFLFFBQUFBLFFBQVEsRUFBQztBQUFDQyxVQUFBQSxJQUFJLEVBQUMsQ0FBTjtBQUFRQyxVQUFBQSxJQUFJLEVBQUNvRTtBQUFiLFNBQVY7QUFBMEIwVyxRQUFBQSxNQUFNLEVBQUM7QUFBQy9hLFVBQUFBLElBQUksRUFBQyxDQUFOO0FBQVFDLFVBQUFBLElBQUksRUFBQzBFO0FBQWIsU0FBakM7QUFBaUR4RSxRQUFBQSxFQUFFLEVBQUM7QUFBQ0gsVUFBQUEsSUFBSSxFQUFDLENBQU47QUFBUUMsVUFBQUEsSUFBSSxFQUFDb0Y7QUFBYixTQUFwRDtBQUFvRXNELFFBQUFBLEtBQUssRUFBQztBQUFDMUksVUFBQUEsSUFBSSxFQUFDcUY7QUFBTjtBQUExRSxPQUFoQixDQUFoQyxFQUFxSSxNQUFNRixDQUFOLEVBQVFwQixDQUFSLENBQXJJO0FBQWdKOztBQUFpQixXQUFWOFcsVUFBVSxDQUFDeFYsQ0FBRCxFQUFHRixDQUFILEVBQUtLLENBQUwsRUFBT3BCLENBQVAsRUFBUzRCLENBQVQsRUFBV0ksQ0FBWCxFQUFhSCxDQUFiLEVBQWVsQyxDQUFmLEVBQWlCVyxDQUFqQixFQUFtQndCLENBQUMsR0FBQyxDQUFyQixFQUF1QkMsQ0FBQyxHQUFDLENBQXpCLEVBQTJCSixDQUFDLEdBQUMsQ0FBN0IsRUFBK0JqRCxDQUFDLEdBQUMsQ0FBakMsRUFBbUNtQixDQUFDLEdBQUMsQ0FBQyxDQUF0QyxFQUF3Q0wsQ0FBQyxHQUFDLENBQTFDLEVBQTRDakMsQ0FBQyxHQUFDLENBQTlDLEVBQWdEO0FBQUMsVUFBSXlELENBQUMsR0FBQ3hCLENBQU47QUFBQSxVQUFRTSxDQUFDLEdBQUM4QixDQUFDLEdBQUNqQyxDQUFaO0FBQUEsVUFBY0ksQ0FBQyxHQUFDaUMsQ0FBQyxHQUFDMUIsQ0FBbEI7O0FBQW9CLFdBQUksSUFBSWIsQ0FBQyxHQUFDLENBQVYsRUFBWUEsQ0FBQyxJQUFFYSxDQUFmLEVBQWlCYixDQUFDLEVBQWxCLEVBQXFCO0FBQUMsWUFBSTlCLENBQUMsR0FBQzhCLENBQUMsR0FBQ00sQ0FBRixHQUFJaUMsQ0FBQyxHQUFDLENBQVo7O0FBQWMsYUFBSSxJQUFJdEMsQ0FBQyxHQUFDLENBQVYsRUFBWUEsQ0FBQyxJQUFFQyxDQUFmLEVBQWlCRCxDQUFDLElBQUdGLENBQUMsRUFBdEIsRUFBeUI7QUFBQyxjQUFJM0IsQ0FBQyxHQUFDNkIsQ0FBQyxHQUFDSSxDQUFGLEdBQUk4QixDQUFDLEdBQUMsQ0FBWjtBQUFjLGNBQUdYLENBQUMsQ0FBQyxJQUFFekIsQ0FBRixHQUFJc0MsQ0FBTCxDQUFELEdBQVNqRSxDQUFDLEdBQUNhLENBQVgsRUFBYXVDLENBQUMsQ0FBQyxJQUFFekIsQ0FBRixHQUFJdUMsQ0FBTCxDQUFELEdBQVNwRSxDQUFDLEdBQUNrQyxDQUF4QixFQUEwQm9CLENBQUMsQ0FBQyxJQUFFekIsQ0FBRixHQUFJbUMsQ0FBTCxDQUFELEdBQVNFLENBQUMsR0FBQyxDQUFyQyxFQUF1Q2QsQ0FBQyxDQUFDLElBQUV2QixDQUFGLEdBQUlzQyxDQUFMLENBQUQsR0FBUyxDQUFoRCxFQUFrRGYsQ0FBQyxDQUFDLElBQUV2QixDQUFGLEdBQUl1QyxDQUFMLENBQUQsR0FBUyxDQUEzRCxFQUE2RGhCLENBQUMsQ0FBQyxJQUFFdkIsQ0FBRixHQUFJbUMsQ0FBTCxDQUFELEdBQVNFLENBQUMsSUFBRSxDQUFILEdBQUssQ0FBTCxHQUFPLENBQUMsQ0FBOUUsRUFBZ0ZULENBQUMsQ0FBQyxJQUFFNUIsQ0FBSCxDQUFELEdBQU9FLENBQUMsR0FBQ0MsQ0FBekYsRUFBMkZ5QixDQUFDLENBQUMsSUFBRTVCLENBQUYsR0FBSSxDQUFMLENBQUQsR0FBUyxJQUFFQyxDQUFDLEdBQUNhLENBQXhHLEVBQTBHYixDQUFDLEtBQUdhLENBQUosSUFBT1osQ0FBQyxLQUFHQyxDQUF4SCxFQUEwSDtBQUFTLGNBQUlNLENBQUMsR0FBQ2UsQ0FBQyxHQUFDdEIsQ0FBRixHQUFJRCxDQUFDLElBQUVFLENBQUMsR0FBQyxDQUFKLENBQVg7QUFBQSxjQUFrQm9ILENBQUMsR0FBQy9GLENBQUMsR0FBQ3RCLENBQUYsR0FBSSxDQUFDRCxDQUFDLEdBQUMsQ0FBSCxLQUFPRSxDQUFDLEdBQUMsQ0FBVCxDQUF4QjtBQUFBLGNBQW9DTyxDQUFDLEdBQUNjLENBQUMsR0FBQ3RCLENBQUYsR0FBSSxDQUFDRCxDQUFDLEdBQUMsQ0FBSCxLQUFPRSxDQUFDLEdBQUMsQ0FBVCxDQUFKLEdBQWdCLENBQXREO0FBQUEsY0FBd0RzSCxDQUFDLEdBQUNqRyxDQUFDLEdBQUN0QixDQUFGLEdBQUlELENBQUMsSUFBRUUsQ0FBQyxHQUFDLENBQUosQ0FBTCxHQUFZLENBQXRFO0FBQXdFSyxVQUFBQSxDQUFDLENBQUMsSUFBRXpDLENBQUgsQ0FBRCxHQUFPMEMsQ0FBUCxFQUFTRCxDQUFDLENBQUMsSUFBRXpDLENBQUYsR0FBSSxDQUFMLENBQUQsR0FBU3dKLENBQWxCLEVBQW9CL0csQ0FBQyxDQUFDLElBQUV6QyxDQUFGLEdBQUksQ0FBTCxDQUFELEdBQVMwSixDQUE3QixFQUErQmpILENBQUMsQ0FBQyxJQUFFekMsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTd0osQ0FBeEMsRUFBMEMvRyxDQUFDLENBQUMsSUFBRXpDLENBQUYsR0FBSSxDQUFMLENBQUQsR0FBUzJDLENBQW5ELEVBQXFERixDQUFDLENBQUMsSUFBRXpDLENBQUYsR0FBSSxDQUFMLENBQUQsR0FBUzBKLENBQTlELEVBQWdFMUosQ0FBQyxFQUFqRTtBQUFvRTtBQUFDO0FBQUM7O0FBQTV6Qjs7QUFBNnpCLE1BQUlvWixFQUFFLEdBQUM7QUFBQ0MsSUFBQUEsSUFBSSxFQUFDLENBQUMsQ0FBUDtBQUFTQyxJQUFBQSxNQUFNLEVBQUMsQ0FBaEI7QUFBa0JDLElBQUFBLEtBQUssRUFBQyxDQUF4QjtBQUEwQkMsSUFBQUEsR0FBRyxFQUFDLENBQTlCO0FBQWdDQyxJQUFBQSxTQUFTLEVBQUM7QUFBMUMsR0FBUDtBQUFBLE1BQW9EQyxFQUFFLEdBQUMsSUFBSXhYLENBQUosRUFBdkQ7QUFBQSxNQUE2RHlYLEVBQUUsR0FBQyxJQUFJM1osQ0FBSixFQUFoRTtBQUFBLE1BQXNFNFosRUFBRSxHQUFDLElBQUk1WixDQUFKLEVBQXpFO0FBQUEsTUFBK0U2WixFQUFFLEdBQUMsSUFBSTNYLENBQUosRUFBbEY7QUFBQSxNQUF3RjRYLEVBQUUsR0FBQyxJQUFJNVgsQ0FBSixFQUEzRjtBQUFBLE1BQWlHNlgsRUFBRSxHQUFDLElBQUk3WCxDQUFKLEVBQXBHO0FBQUEsTUFBMEc4WCxFQUFFLEdBQUMsSUFBSTdYLENBQUosRUFBN0c7QUFBQSxNQUFtSDhYLEVBQUUsR0FBQyxJQUFJL1gsQ0FBSixFQUF0SDtBQUFBLE1BQTRIZ1ksRUFBRSxHQUFDLElBQUk5WCxDQUFKLEVBQS9IO0FBQUEsTUFBcUkrWCxFQUFFLEdBQUMsSUFBSWpZLENBQUosRUFBeEk7QUFBQSxNQUE4SWtZLEVBQUUsR0FBQyxJQUFJbFksQ0FBSixFQUFqSjtBQUFBLE1BQXVKbVksRUFBRSxHQUFDLElBQUlqWSxDQUFKLEVBQTFKO0FBQUEsTUFBZ0trWSxFQUFFLEdBQUMsSUFBSXBZLENBQUosRUFBbks7O0FBQXlLLFFBQU13SCxDQUFOLENBQU87QUFBQ25PLElBQUFBLFdBQVcsQ0FBQztBQUFDZ2YsTUFBQUEsT0FBTyxFQUFDclksQ0FBVDtBQUFXN0QsTUFBQUEsSUFBSSxFQUFDNEQ7QUFBaEIsS0FBRCxFQUFvQjtBQUFDLFdBQUtzWSxPQUFMLEdBQWFyWSxDQUFiLEVBQWUsS0FBSzdELElBQUwsR0FBVTRELENBQXpCLEVBQTJCLEtBQUt1WSxPQUFMLEdBQWEsQ0FBeEMsRUFBMEMsS0FBS0MsTUFBTCxHQUFZLENBQXRELEVBQXdELEtBQUtDLFFBQUwsR0FBY3pZLENBQUMsQ0FBQzBZLE1BQUYsQ0FBU3hhLE1BQVQsR0FBZ0IsQ0FBdEY7QUFBd0Y7O0FBQUFlLElBQUFBLE1BQU0sQ0FBQ2lCLENBQUMsR0FBQyxDQUFILEVBQUtDLENBQUwsRUFBTztBQUFDLFVBQUlwQyxDQUFDLEdBQUNvQyxDQUFDLEdBQUMsQ0FBRCxHQUFHLEtBQUtxWSxNQUFMLEdBQVl0WSxDQUF0QjtBQUFBLFVBQXdCRCxDQUFDLEdBQUMsS0FBS3NZLE9BQUwsR0FBYSxLQUFLRSxRQUE1QztBQUFBLFVBQXFEelksQ0FBQyxHQUFDbEIsSUFBSSxDQUFDNlosS0FBTCxDQUFXMVksQ0FBWCxDQUF2RDtBQUFBLFVBQXFFTyxDQUFDLEdBQUNQLENBQUMsR0FBQ0QsQ0FBekU7QUFBQSxVQUEyRWMsQ0FBQyxHQUFDLEtBQUsxRSxJQUFMLENBQVVzYyxNQUFWLENBQWlCMVksQ0FBakIsQ0FBN0U7QUFBQSxVQUFpR3dCLENBQUMsR0FBQyxLQUFLcEYsSUFBTCxDQUFVc2MsTUFBVixDQUFpQixDQUFDMVksQ0FBQyxHQUFDLENBQUgsSUFBTSxLQUFLeVksUUFBNUIsQ0FBbkc7QUFBeUksV0FBS0gsT0FBTCxDQUFhdGQsT0FBYixDQUFxQixDQUFDaUYsQ0FBRCxFQUFHRCxDQUFILEtBQU87QUFBQ2dZLFFBQUFBLEVBQUUsQ0FBQ3JWLFNBQUgsQ0FBYTdCLENBQUMsQ0FBQzVFLFFBQWYsRUFBd0IsSUFBRThELENBQTFCLEdBQTZCaVksRUFBRSxDQUFDdFYsU0FBSCxDQUFhN0IsQ0FBQyxDQUFDaVAsVUFBZixFQUEwQixJQUFFL1AsQ0FBNUIsQ0FBN0IsRUFBNERrWSxFQUFFLENBQUN2VixTQUFILENBQWE3QixDQUFDLENBQUNlLEtBQWYsRUFBcUIsSUFBRTdCLENBQXZCLENBQTVELEVBQXNGbVksRUFBRSxDQUFDeFYsU0FBSCxDQUFhbkIsQ0FBQyxDQUFDdEYsUUFBZixFQUF3QixJQUFFOEQsQ0FBMUIsQ0FBdEYsRUFBbUhvWSxFQUFFLENBQUN6VixTQUFILENBQWFuQixDQUFDLENBQUN1TyxVQUFmLEVBQTBCLElBQUUvUCxDQUE1QixDQUFuSCxFQUFrSnFZLEVBQUUsQ0FBQzFWLFNBQUgsQ0FBYW5CLENBQUMsQ0FBQ0ssS0FBZixFQUFxQixJQUFFN0IsQ0FBdkIsQ0FBbEosRUFBNEtnWSxFQUFFLENBQUMzWSxJQUFILENBQVE4WSxFQUFSLEVBQVczWCxDQUFYLENBQTVLLEVBQTBMeVgsRUFBRSxDQUFDcEssS0FBSCxDQUFTdUssRUFBVCxFQUFZNVgsQ0FBWixDQUExTCxFQUF5TTBYLEVBQUUsQ0FBQzdZLElBQUgsQ0FBUWdaLEVBQVIsRUFBVzdYLENBQVgsQ0FBek0sRUFBdU5QLENBQUMsQ0FBQy9ELFFBQUYsQ0FBV21ELElBQVgsQ0FBZ0IyWSxFQUFoQixFQUFtQmphLENBQW5CLENBQXZOLEVBQTZPa0MsQ0FBQyxDQUFDOFAsVUFBRixDQUFhbEMsS0FBYixDQUFtQm9LLEVBQW5CLEVBQXNCbGEsQ0FBdEIsQ0FBN08sRUFBc1FrQyxDQUFDLENBQUM0QixLQUFGLENBQVF4QyxJQUFSLENBQWE2WSxFQUFiLEVBQWdCbmEsQ0FBaEIsQ0FBdFE7QUFBeVIsT0FBdFQ7QUFBd1Q7O0FBQXhrQjs7QUFBeWtCLE1BQUk2YSxFQUFFLEdBQUMsSUFBSTFZLENBQUosRUFBUDtBQUFhLFNBQU9GLENBQUMsQ0FBQzZZLFNBQUYsR0FBWXBSLENBQVosRUFBY3pILENBQUMsQ0FBQzhZLEdBQUYsR0FBTSxjQUFjdFksQ0FBZCxDQUFlO0FBQUNsSCxJQUFBQSxXQUFXLENBQUNpSixDQUFELEVBQUc7QUFBQzlJLE1BQUFBLEtBQUssRUFBQytILENBQUMsR0FBQyxDQUFUO0FBQVc5SCxNQUFBQSxNQUFNLEVBQUMrSCxDQUFDLEdBQUMsQ0FBcEI7QUFBc0JtVCxNQUFBQSxLQUFLLEVBQUNyVCxDQUFDLEdBQUMsQ0FBOUI7QUFBZ0N1VixNQUFBQSxhQUFhLEVBQUMzVSxDQUFDLEdBQUMsQ0FBaEQ7QUFBa0Q0VSxNQUFBQSxjQUFjLEVBQUN0UCxDQUFDLEdBQUMsQ0FBbkU7QUFBcUVzUixNQUFBQSxhQUFhLEVBQUM3WixDQUFDLEdBQUMsQ0FBckY7QUFBdUYrRCxNQUFBQSxVQUFVLEVBQUNaLENBQUMsR0FBQztBQUFwRyxRQUF3RyxFQUEzRyxFQUE4RztBQUFDLFVBQUluQyxDQUFDLEdBQUNpQyxDQUFOO0FBQUEsVUFBUW5DLENBQUMsR0FBQ3lILENBQVY7QUFBQSxVQUFZeEgsQ0FBQyxHQUFDZixDQUFkO0FBQUEsVUFBZ0JzRCxDQUFDLEdBQUMsQ0FBQ3RDLENBQUMsR0FBQyxDQUFILEtBQU9GLENBQUMsR0FBQyxDQUFULElBQVksQ0FBWixHQUFjLENBQUNFLENBQUMsR0FBQyxDQUFILEtBQU9ELENBQUMsR0FBQyxDQUFULElBQVksQ0FBMUIsR0FBNEIsQ0FBQ0QsQ0FBQyxHQUFDLENBQUgsS0FBT0MsQ0FBQyxHQUFDLENBQVQsSUFBWSxDQUExRDtBQUFBLFVBQTREcUMsQ0FBQyxHQUFDLEtBQUdwQyxDQUFDLEdBQUNGLENBQUYsR0FBSSxDQUFKLEdBQU1FLENBQUMsR0FBQ0QsQ0FBRixHQUFJLENBQVYsR0FBWUQsQ0FBQyxHQUFDQyxDQUFGLEdBQUksQ0FBbkIsQ0FBOUQ7QUFBQSxVQUFvRkUsQ0FBQyxHQUFDLElBQUk5RCxZQUFKLENBQWlCLElBQUVtRyxDQUFuQixDQUF0RjtBQUFBLFVBQTRHekUsQ0FBQyxHQUFDLElBQUkxQixZQUFKLENBQWlCLElBQUVtRyxDQUFuQixDQUE5RztBQUFBLFVBQW9JaEMsQ0FBQyxHQUFDLElBQUluRSxZQUFKLENBQWlCLElBQUVtRyxDQUFuQixDQUF0STtBQUFBLFVBQTRKMUIsQ0FBQyxHQUFDMEIsQ0FBQyxHQUFDLEtBQUYsR0FBUSxJQUFJd1UsV0FBSixDQUFnQjFVLENBQWhCLENBQVIsR0FBMkIsSUFBSXlCLFdBQUosQ0FBZ0J6QixDQUFoQixDQUF6TDtBQUFBLFVBQTRNVixDQUFDLEdBQUMsQ0FBOU07QUFBQSxVQUFnTlEsQ0FBQyxHQUFDLENBQWxOO0FBQW9ObUYsTUFBQUEsQ0FBQyxDQUFDMFAsVUFBRixDQUFhOVcsQ0FBYixFQUFlcEMsQ0FBZixFQUFpQnlDLENBQWpCLEVBQW1CTSxDQUFuQixFQUFxQlMsQ0FBckIsRUFBdUJFLENBQXZCLEVBQXlCRCxDQUF6QixFQUEyQnZCLENBQTNCLEVBQTZCRCxDQUE3QixFQUErQixDQUEvQixFQUFpQyxDQUFqQyxFQUFtQyxDQUFuQyxFQUFxQyxDQUFDLENBQXRDLEVBQXdDLENBQUMsQ0FBekMsRUFBMkM0QixDQUEzQyxFQUE2Q1EsQ0FBN0MsR0FBZ0RtRixDQUFDLENBQUMwUCxVQUFGLENBQWE5VyxDQUFiLEVBQWVwQyxDQUFmLEVBQWlCeUMsQ0FBakIsRUFBbUJNLENBQW5CLEVBQXFCUyxDQUFyQixFQUF1QkUsQ0FBdkIsRUFBeUIsQ0FBQ0QsQ0FBMUIsRUFBNEJ2QixDQUE1QixFQUE4QkQsQ0FBOUIsRUFBZ0MsQ0FBaEMsRUFBa0MsQ0FBbEMsRUFBb0MsQ0FBcEMsRUFBc0MsQ0FBdEMsRUFBd0MsQ0FBQyxDQUF6QyxFQUEyQzRCLENBQUMsSUFBRSxDQUFDM0IsQ0FBQyxHQUFDLENBQUgsS0FBT0QsQ0FBQyxHQUFDLENBQVQsQ0FBOUMsRUFBMERvQyxDQUFDLElBQUVuQyxDQUFDLEdBQUNELENBQS9ELENBQWhELEVBQWtIdUgsQ0FBQyxDQUFDMFAsVUFBRixDQUFhOVcsQ0FBYixFQUFlcEMsQ0FBZixFQUFpQnlDLENBQWpCLEVBQW1CTSxDQUFuQixFQUFxQlUsQ0FBckIsRUFBdUJELENBQXZCLEVBQXlCRSxDQUF6QixFQUEyQnhCLENBQTNCLEVBQTZCRCxDQUE3QixFQUErQixDQUEvQixFQUFpQyxDQUFqQyxFQUFtQyxDQUFuQyxFQUFxQyxDQUFyQyxFQUF1QyxDQUF2QyxFQUF5QzRCLENBQUMsSUFBRSxDQUFDM0IsQ0FBQyxHQUFDLENBQUgsS0FBT0QsQ0FBQyxHQUFDLENBQVQsQ0FBNUMsRUFBd0RvQyxDQUFDLElBQUVuQyxDQUFDLEdBQUNELENBQTdELENBQWxILEVBQWtMdUgsQ0FBQyxDQUFDMFAsVUFBRixDQUFhOVcsQ0FBYixFQUFlcEMsQ0FBZixFQUFpQnlDLENBQWpCLEVBQW1CTSxDQUFuQixFQUFxQlUsQ0FBckIsRUFBdUJELENBQXZCLEVBQXlCLENBQUNFLENBQTFCLEVBQTRCeEIsQ0FBNUIsRUFBOEJELENBQTlCLEVBQWdDLENBQWhDLEVBQWtDLENBQWxDLEVBQW9DLENBQXBDLEVBQXNDLENBQXRDLEVBQXdDLENBQUMsQ0FBekMsRUFBMkM0QixDQUFDLElBQUUsQ0FBQzFCLENBQUMsR0FBQyxDQUFILEtBQU9ELENBQUMsR0FBQyxDQUFULENBQTlDLEVBQTBEbUMsQ0FBQyxJQUFFbEMsQ0FBQyxHQUFDRCxDQUEvRCxDQUFsTCxFQUFvUHNILENBQUMsQ0FBQzBQLFVBQUYsQ0FBYTlXLENBQWIsRUFBZXBDLENBQWYsRUFBaUJ5QyxDQUFqQixFQUFtQk0sQ0FBbkIsRUFBcUJVLENBQXJCLEVBQXVCQyxDQUF2QixFQUF5QixDQUFDRixDQUExQixFQUE0QnJCLENBQTVCLEVBQThCRixDQUE5QixFQUFnQyxDQUFoQyxFQUFrQyxDQUFsQyxFQUFvQyxDQUFwQyxFQUFzQyxDQUFDLENBQXZDLEVBQXlDLENBQUMsQ0FBMUMsRUFBNEM0QixDQUFDLElBQUUsQ0FBQzFCLENBQUMsR0FBQyxDQUFILEtBQU9ELENBQUMsR0FBQyxDQUFULENBQS9DLEVBQTJEbUMsQ0FBQyxJQUFFbEMsQ0FBQyxHQUFDRCxDQUFoRSxDQUFwUCxFQUF1VHNILENBQUMsQ0FBQzBQLFVBQUYsQ0FBYTlXLENBQWIsRUFBZXBDLENBQWYsRUFBaUJ5QyxDQUFqQixFQUFtQk0sQ0FBbkIsRUFBcUJVLENBQXJCLEVBQXVCQyxDQUF2QixFQUF5QkYsQ0FBekIsRUFBMkJyQixDQUEzQixFQUE2QkYsQ0FBN0IsRUFBK0IsQ0FBL0IsRUFBaUMsQ0FBakMsRUFBbUMsQ0FBbkMsRUFBcUMsQ0FBckMsRUFBdUMsQ0FBQyxDQUF4QyxFQUEwQzRCLENBQUMsSUFBRSxDQUFDMUIsQ0FBQyxHQUFDLENBQUgsS0FBT0YsQ0FBQyxHQUFDLENBQVQsQ0FBN0MsRUFBeURvQyxDQUFDLElBQUVsQyxDQUFDLEdBQUNGLENBQTlELENBQXZULEVBQXdYMFIsTUFBTSxDQUFDQyxNQUFQLENBQWN0UCxDQUFkLEVBQWdCO0FBQUNuRyxRQUFBQSxRQUFRLEVBQUM7QUFBQ0MsVUFBQUEsSUFBSSxFQUFDLENBQU47QUFBUUMsVUFBQUEsSUFBSSxFQUFDK0Q7QUFBYixTQUFWO0FBQTBCK1csUUFBQUEsTUFBTSxFQUFDO0FBQUMvYSxVQUFBQSxJQUFJLEVBQUMsQ0FBTjtBQUFRQyxVQUFBQSxJQUFJLEVBQUMyQjtBQUFiLFNBQWpDO0FBQWlEekIsUUFBQUEsRUFBRSxFQUFDO0FBQUNILFVBQUFBLElBQUksRUFBQyxDQUFOO0FBQVFDLFVBQUFBLElBQUksRUFBQ29FO0FBQWIsU0FBcEQ7QUFBb0VzRSxRQUFBQSxLQUFLLEVBQUM7QUFBQzFJLFVBQUFBLElBQUksRUFBQzBFO0FBQU47QUFBMUUsT0FBaEIsQ0FBeFgsRUFBNmQsTUFBTXlCLENBQU4sRUFBUUYsQ0FBUixDQUE3ZDtBQUF3ZTs7QUFBdnpCLEdBQW5DLEVBQTQxQnJDLENBQUMsQ0FBQ2daLE1BQUYsR0FBUyxjQUFjbFksQ0FBZCxDQUFlO0FBQUN4SCxJQUFBQSxXQUFXLENBQUM2RyxDQUFELEVBQUc7QUFBQytOLE1BQUFBLElBQUksRUFBQ25RLENBQUMsR0FBQyxFQUFSO0FBQVdvUSxNQUFBQSxHQUFHLEVBQUMzTixDQUFDLEdBQUMsR0FBakI7QUFBcUJ5TixNQUFBQSxHQUFHLEVBQUNuTixDQUFDLEdBQUMsRUFBM0I7QUFBOEI1RyxNQUFBQSxNQUFNLEVBQUNzSCxDQUFDLEdBQUMsQ0FBdkM7QUFBeUM4TSxNQUFBQSxJQUFJLEVBQUN0TyxDQUE5QztBQUFnRHVPLE1BQUFBLEtBQUssRUFBQ3RPLENBQXREO0FBQXdEdU8sTUFBQUEsTUFBTSxFQUFDL00sQ0FBL0Q7QUFBaUVnTixNQUFBQSxHQUFHLEVBQUNsTjtBQUFyRSxRQUF3RSxFQUEzRSxFQUE4RTtBQUFDLFlBQU1wQixDQUFOLEdBQVMsS0FBSytOLElBQUwsR0FBVW5RLENBQW5CLEVBQXFCLEtBQUtvUSxHQUFMLEdBQVMzTixDQUE5QixFQUFnQyxLQUFLeU4sR0FBTCxHQUFTbk4sQ0FBekMsRUFBMkMsS0FBSzVHLE1BQUwsR0FBWXNILENBQXZELEVBQXlELEtBQUtxUSxnQkFBTCxHQUFzQixJQUFJM1IsQ0FBSixFQUEvRSxFQUFxRixLQUFLMFIsVUFBTCxHQUFnQixJQUFJMVIsQ0FBSixFQUFyRyxFQUEyRyxLQUFLK1ksb0JBQUwsR0FBMEIsSUFBSS9ZLENBQUosRUFBckksRUFBMklGLENBQUMsSUFBRUMsQ0FBSCxHQUFLLEtBQUtpWixZQUFMLENBQWtCO0FBQUM1SyxRQUFBQSxJQUFJLEVBQUN0TyxDQUFOO0FBQVF1TyxRQUFBQSxLQUFLLEVBQUN0TyxDQUFkO0FBQWdCdU8sUUFBQUEsTUFBTSxFQUFDL00sQ0FBdkI7QUFBeUJnTixRQUFBQSxHQUFHLEVBQUNsTjtBQUE3QixPQUFsQixDQUFMLEdBQXdELEtBQUs0WCxXQUFMLEVBQW5NO0FBQXNOOztBQUFBQSxJQUFBQSxXQUFXLENBQUM7QUFBQ2pMLE1BQUFBLElBQUksRUFBQ2xPLENBQUMsR0FBQyxLQUFLa08sSUFBYjtBQUFrQkMsTUFBQUEsR0FBRyxFQUFDbE8sQ0FBQyxHQUFDLEtBQUtrTyxHQUE3QjtBQUFpQ0YsTUFBQUEsR0FBRyxFQUFDL04sQ0FBQyxHQUFDLEtBQUsrTixHQUE1QztBQUFnRC9ULE1BQUFBLE1BQU0sRUFBQ2lHLENBQUMsR0FBQyxLQUFLakc7QUFBOUQsUUFBc0UsRUFBdkUsRUFBMEU7QUFBQyxhQUFPLEtBQUsyWCxnQkFBTCxDQUFzQjdELGVBQXRCLENBQXNDO0FBQUNDLFFBQUFBLEdBQUcsRUFBQy9OLENBQUMsSUFBRXBCLElBQUksQ0FBQzZCLEVBQUwsR0FBUSxHQUFWLENBQU47QUFBcUJ6RyxRQUFBQSxNQUFNLEVBQUNpRyxDQUE1QjtBQUE4QitOLFFBQUFBLElBQUksRUFBQ2xPLENBQW5DO0FBQXFDbU8sUUFBQUEsR0FBRyxFQUFDbE87QUFBekMsT0FBdEMsR0FBbUYsS0FBSzRELElBQUwsR0FBVSxhQUE3RixFQUEyRyxJQUFsSDtBQUF1SDs7QUFBQXFWLElBQUFBLFlBQVksQ0FBQztBQUFDaEwsTUFBQUEsSUFBSSxFQUFDbE8sQ0FBQyxHQUFDLEtBQUtrTyxJQUFiO0FBQWtCQyxNQUFBQSxHQUFHLEVBQUNsTyxDQUFDLEdBQUMsS0FBS2tPLEdBQTdCO0FBQWlDRyxNQUFBQSxJQUFJLEVBQUNwTyxDQUFDLEdBQUMsQ0FBQyxDQUF6QztBQUEyQ3FPLE1BQUFBLEtBQUssRUFBQ3BPLENBQUMsR0FBQyxDQUFuRDtBQUFxRHFPLE1BQUFBLE1BQU0sRUFBQ3pRLENBQUMsR0FBQyxDQUFDLENBQS9EO0FBQWlFMFEsTUFBQUEsR0FBRyxFQUFDak8sQ0FBQyxHQUFDO0FBQXZFLFFBQTBFLEVBQTNFLEVBQThFO0FBQUMsYUFBTyxLQUFLcVIsZ0JBQUwsQ0FBc0J4RCxjQUF0QixDQUFxQztBQUFDQyxRQUFBQSxJQUFJLEVBQUNwTyxDQUFOO0FBQVFxTyxRQUFBQSxLQUFLLEVBQUNwTyxDQUFkO0FBQWdCcU8sUUFBQUEsTUFBTSxFQUFDelEsQ0FBdkI7QUFBeUIwUSxRQUFBQSxHQUFHLEVBQUNqTyxDQUE3QjtBQUErQjBOLFFBQUFBLElBQUksRUFBQ2xPLENBQXBDO0FBQXNDbU8sUUFBQUEsR0FBRyxFQUFDbE87QUFBMUMsT0FBckMsR0FBbUYsS0FBSzRELElBQUwsR0FBVSxjQUE3RixFQUE0RyxJQUFuSDtBQUF3SDs7QUFBQTBNLElBQUFBLGlCQUFpQixHQUFFO0FBQUMsYUFBTyxNQUFNQSxpQkFBTixJQUEwQixLQUFLcUIsVUFBTCxDQUFnQnpRLE9BQWhCLENBQXdCLEtBQUswTyxXQUE3QixDQUExQixFQUFvRSxLQUFLb0osb0JBQUwsQ0FBMEJoWSxRQUExQixDQUFtQyxLQUFLNFEsZ0JBQXhDLEVBQXlELEtBQUtELFVBQTlELENBQXBFLEVBQThJLElBQXJKO0FBQTBKOztBQUFBM0MsSUFBQUEsTUFBTSxDQUFDalAsQ0FBRCxFQUFHO0FBQUMsYUFBTyxNQUFNaVAsTUFBTixDQUFhalAsQ0FBYixFQUFlLENBQUMsQ0FBaEIsR0FBbUIsSUFBMUI7QUFBK0I7O0FBQUFvWixJQUFBQSxPQUFPLENBQUNwWixDQUFELEVBQUc7QUFBQyxhQUFPQSxDQUFDLENBQUNpQyxZQUFGLENBQWUsS0FBSzJQLFVBQXBCLEdBQWdDNVIsQ0FBQyxDQUFDaUMsWUFBRixDQUFlLEtBQUs0UCxnQkFBcEIsQ0FBaEMsRUFBc0UsSUFBN0U7QUFBa0Y7O0FBQUF3SCxJQUFBQSxTQUFTLENBQUNyWixDQUFELEVBQUc7QUFBQyxhQUFPQSxDQUFDLENBQUNpQyxZQUFGLENBQWUyTyxDQUFDLENBQUN6UCxPQUFGLENBQVUsS0FBSzBRLGdCQUFmLENBQWYsR0FBaUQ3UixDQUFDLENBQUNpQyxZQUFGLENBQWUsS0FBSzROLFdBQXBCLENBQWpELEVBQWtGLElBQXpGO0FBQThGOztBQUFBeUosSUFBQUEsYUFBYSxHQUFFO0FBQUMsV0FBS0MsT0FBTCxLQUFlLEtBQUtBLE9BQUwsR0FBYSxDQUFDLElBQUl0WixDQUFKLEVBQUQsRUFBTyxJQUFJQSxDQUFKLEVBQVAsRUFBYSxJQUFJQSxDQUFKLEVBQWIsRUFBbUIsSUFBSUEsQ0FBSixFQUFuQixFQUF5QixJQUFJQSxDQUFKLEVBQXpCLEVBQStCLElBQUlBLENBQUosRUFBL0IsQ0FBNUI7QUFBbUUsVUFBSUQsQ0FBQyxHQUFDLEtBQUtpWixvQkFBWDtBQUFnQyxXQUFLTSxPQUFMLENBQWEsQ0FBYixFQUFnQmhiLEdBQWhCLENBQW9CeUIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQSxDQUFDLENBQUMsQ0FBRCxDQUExQixFQUE4QkEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQSxDQUFDLENBQUMsQ0FBRCxDQUFwQyxFQUF3Q0EsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNQSxDQUFDLENBQUMsQ0FBRCxDQUEvQyxFQUFvRHdaLFFBQXBELEdBQTZEeFosQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNQSxDQUFDLENBQUMsRUFBRCxDQUFwRSxFQUF5RSxLQUFLdVosT0FBTCxDQUFhLENBQWIsRUFBZ0JoYixHQUFoQixDQUFvQnlCLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0EsQ0FBQyxDQUFDLENBQUQsQ0FBMUIsRUFBOEJBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0EsQ0FBQyxDQUFDLENBQUQsQ0FBcEMsRUFBd0NBLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTUEsQ0FBQyxDQUFDLENBQUQsQ0FBL0MsRUFBb0R3WixRQUFwRCxHQUE2RHhaLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTUEsQ0FBQyxDQUFDLEVBQUQsQ0FBN0ksRUFBa0osS0FBS3VaLE9BQUwsQ0FBYSxDQUFiLEVBQWdCaGIsR0FBaEIsQ0FBb0J5QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtBLENBQUMsQ0FBQyxDQUFELENBQTFCLEVBQThCQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtBLENBQUMsQ0FBQyxDQUFELENBQXBDLEVBQXdDQSxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU1BLENBQUMsQ0FBQyxDQUFELENBQS9DLEVBQW9Ed1osUUFBcEQsR0FBNkR4WixDQUFDLENBQUMsRUFBRCxDQUFELEdBQU1BLENBQUMsQ0FBQyxFQUFELENBQXROLEVBQTJOLEtBQUt1WixPQUFMLENBQWEsQ0FBYixFQUFnQmhiLEdBQWhCLENBQW9CeUIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQSxDQUFDLENBQUMsQ0FBRCxDQUExQixFQUE4QkEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQSxDQUFDLENBQUMsQ0FBRCxDQUFwQyxFQUF3Q0EsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNQSxDQUFDLENBQUMsQ0FBRCxDQUEvQyxFQUFvRHdaLFFBQXBELEdBQTZEeFosQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFNQSxDQUFDLENBQUMsRUFBRCxDQUEvUixFQUFvUyxLQUFLdVosT0FBTCxDQUFhLENBQWIsRUFBZ0JoYixHQUFoQixDQUFvQnlCLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0EsQ0FBQyxDQUFDLENBQUQsQ0FBMUIsRUFBOEJBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS0EsQ0FBQyxDQUFDLENBQUQsQ0FBcEMsRUFBd0NBLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTUEsQ0FBQyxDQUFDLEVBQUQsQ0FBL0MsRUFBcUR3WixRQUFyRCxHQUE4RHhaLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBTUEsQ0FBQyxDQUFDLEVBQUQsQ0FBelcsRUFBOFcsS0FBS3VaLE9BQUwsQ0FBYSxDQUFiLEVBQWdCaGIsR0FBaEIsQ0FBb0J5QixDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtBLENBQUMsQ0FBQyxDQUFELENBQTFCLEVBQThCQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQUtBLENBQUMsQ0FBQyxDQUFELENBQXBDLEVBQXdDQSxDQUFDLENBQUMsRUFBRCxDQUFELEdBQU1BLENBQUMsQ0FBQyxFQUFELENBQS9DLEVBQXFEd1osUUFBckQsR0FBOER4WixDQUFDLENBQUMsRUFBRCxDQUFELEdBQU1BLENBQUMsQ0FBQyxFQUFELENBQW5iOztBQUF3YixXQUFJLElBQUlFLENBQUMsR0FBQyxDQUFWLEVBQVlBLENBQUMsR0FBQyxDQUFkLEVBQWdCQSxDQUFDLEVBQWpCLEVBQW9CO0FBQUMsWUFBSUMsQ0FBQyxHQUFDLElBQUUsS0FBS29aLE9BQUwsQ0FBYXJaLENBQWIsRUFBZ0JrQixRQUFoQixFQUFSO0FBQW1DLGFBQUttWSxPQUFMLENBQWFyWixDQUFiLEVBQWdCZSxRQUFoQixDQUF5QmQsQ0FBekIsR0FBNEIsS0FBS29aLE9BQUwsQ0FBYXJaLENBQWIsRUFBZ0JzWixRQUFoQixJQUEwQnJaLENBQXREO0FBQXdEO0FBQUM7O0FBQUFzWixJQUFBQSxxQkFBcUIsQ0FBQ3paLENBQUQsRUFBRztBQUFDLFVBQUcsQ0FBQ0EsQ0FBQyxDQUFDaEUsUUFBRixDQUFXaUgsVUFBWCxDQUFzQi9HLFFBQTFCLEVBQW1DLE9BQU0sQ0FBQyxDQUFQO0FBQVM4RCxNQUFBQSxDQUFDLENBQUNoRSxRQUFGLENBQVdzSyxNQUFYLElBQW1CdEcsQ0FBQyxDQUFDaEUsUUFBRixDQUFXc0ssTUFBWCxDQUFrQkUsTUFBbEIsS0FBMkIsSUFBRSxDQUFoRCxJQUFtRHhHLENBQUMsQ0FBQ2hFLFFBQUYsQ0FBV3lLLHFCQUFYLEVBQW5EO0FBQXNGLFVBQUl4RyxDQUFDLEdBQUM0USxDQUFOO0FBQVE1USxNQUFBQSxDQUFDLENBQUNiLElBQUYsQ0FBT1ksQ0FBQyxDQUFDaEUsUUFBRixDQUFXc0ssTUFBWCxDQUFrQkMsTUFBekIsR0FBaUN0RyxDQUFDLENBQUNnQyxZQUFGLENBQWVqQyxDQUFDLENBQUM2UCxXQUFqQixDQUFqQztBQUErRCxVQUFJM1AsQ0FBQyxHQUFDRixDQUFDLENBQUNoRSxRQUFGLENBQVdzSyxNQUFYLENBQWtCRSxNQUFsQixHQUF5QnhHLENBQUMsQ0FBQzZQLFdBQUYsQ0FBY2IsaUJBQWQsRUFBL0I7QUFBaUUsYUFBTyxLQUFLMEssdUJBQUwsQ0FBNkJ6WixDQUE3QixFQUErQkMsQ0FBL0IsQ0FBUDtBQUF5Qzs7QUFBQXdaLElBQUFBLHVCQUF1QixDQUFDeFosQ0FBRCxFQUFHQyxDQUFILEVBQUs7QUFBQyxVQUFJcEMsQ0FBQyxHQUFDK1MsQ0FBTjs7QUFBUSxXQUFJLElBQUk5USxDQUFDLEdBQUMsQ0FBVixFQUFZQSxDQUFDLEdBQUMsQ0FBZCxFQUFnQkEsQ0FBQyxFQUFqQixFQUFvQjtBQUFDLFlBQUlDLENBQUMsR0FBQyxLQUFLc1osT0FBTCxDQUFhdlosQ0FBYixDQUFOO0FBQXNCLFlBQUdqQyxDQUFDLENBQUNxQixJQUFGLENBQU9hLENBQVAsRUFBVThCLEdBQVYsQ0FBYzdCLENBQWQsSUFBaUJELENBQUMsQ0FBQ3VaLFFBQW5CLEdBQTZCLENBQUNyWixDQUFqQyxFQUFtQyxPQUFNLENBQUMsQ0FBUDtBQUFTOztBQUFBLGFBQU0sQ0FBQyxDQUFQO0FBQVM7O0FBQTd0RSxHQUFwM0IsRUFBbWxHSCxDQUFDLENBQUMyWixLQUFGLEdBQVF4WCxDQUEzbEcsRUFBNmxHbkMsQ0FBQyxDQUFDNFosUUFBRixHQUFXLGNBQWNwWixDQUFkLENBQWU7QUFBQ2xILElBQUFBLFdBQVcsQ0FBQ29ILENBQUQsRUFBRztBQUFDOEYsTUFBQUEsTUFBTSxFQUFDakcsQ0FBQyxHQUFDLEVBQVY7QUFBYTdHLE1BQUFBLE1BQU0sRUFBQzZOLENBQUMsR0FBQyxDQUF0QjtBQUF3QnNTLE1BQUFBLGNBQWMsRUFBQ3BTLENBQUMsR0FBQyxFQUF6QztBQUE0Q3NQLE1BQUFBLGNBQWMsRUFBQzdYLENBQUMsR0FBQyxDQUE3RDtBQUErRCtELE1BQUFBLFVBQVUsRUFBQzlFLENBQUMsR0FBQztBQUE1RSxRQUFnRixFQUFuRixFQUFzRjtBQUFDLFVBQUlrQyxDQUFDLEdBQUNvSCxDQUFOO0FBQUEsVUFBUW5GLENBQUMsR0FBQ3BELENBQVY7QUFBQSxVQUFZaUQsQ0FBQyxHQUFDLENBQUNzRixDQUFDLEdBQUMsQ0FBSCxLQUFPdkksQ0FBQyxHQUFDLENBQVQsSUFBWSxDQUExQjtBQUFBLFVBQTRCYixDQUFDLEdBQUNvSixDQUFDLElBQUUsSUFBRSxJQUFFdkksQ0FBTixDQUFELEdBQVUsQ0FBeEM7QUFBQSxVQUEwQ3NDLENBQUMsR0FBQyxJQUFJbkYsWUFBSixDQUFpQixJQUFFOEYsQ0FBbkIsQ0FBNUM7QUFBQSxVQUFrRVYsQ0FBQyxHQUFDLElBQUlwRixZQUFKLENBQWlCLElBQUU4RixDQUFuQixDQUFwRTtBQUFBLFVBQTBGRSxDQUFDLEdBQUMsSUFBSWhHLFlBQUosQ0FBaUIsSUFBRThGLENBQW5CLENBQTVGO0FBQUEsVUFBa0hoQyxDQUFDLEdBQUNnQyxDQUFDLEdBQUMsS0FBRixHQUFRLElBQUk2VSxXQUFKLENBQWdCM1ksQ0FBaEIsQ0FBUixHQUEyQixJQUFJMEYsV0FBSixDQUFnQjFGLENBQWhCLENBQS9JO0FBQUEsVUFBa0t1RCxDQUFsSztBQUFBLFVBQW9LUSxDQUFwSztBQUFBLFVBQXNLSSxDQUF0SztBQUFBLFVBQXdLeEMsQ0FBQyxHQUFDLENBQTFLO0FBQUEsVUFBNEtqQyxDQUFDLEdBQUMsSUFBSWtDLENBQUosRUFBOUs7QUFBb0wyQixNQUFBQSxDQUFDLEdBQUMsQ0FBRixFQUFJUSxDQUFDLEdBQUMsQ0FBQyxHQUFELEdBQUttRixDQUFYLEVBQWEvRSxDQUFDLEdBQUMsQ0FBZixFQUFpQmhCLENBQUMsQ0FBQyxJQUFFeEIsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTNEIsQ0FBMUIsRUFBNEJKLENBQUMsQ0FBQyxJQUFFeEIsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTb0MsQ0FBckMsRUFBdUNaLENBQUMsQ0FBQyxJQUFFeEIsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTd0MsQ0FBaEQsRUFBa0R6RSxDQUFDLENBQUNRLEdBQUYsQ0FBTXFELENBQU4sRUFBUVEsQ0FBUixFQUFVSSxDQUFWLEVBQWFWLFNBQWIsRUFBbEQsRUFBMkVMLENBQUMsQ0FBQyxJQUFFekIsQ0FBSCxDQUFELEdBQU9qQyxDQUFDLENBQUNJLENBQXBGLEVBQXNGc0QsQ0FBQyxDQUFDLElBQUV6QixDQUFGLEdBQUksQ0FBTCxDQUFELEdBQVNqQyxDQUFDLENBQUNNLENBQWpHLEVBQW1Hb0QsQ0FBQyxDQUFDLElBQUV6QixDQUFGLEdBQUksQ0FBTCxDQUFELEdBQVNqQyxDQUFDLENBQUMwQyxDQUE5RyxFQUFnSDRCLENBQUMsQ0FBQyxJQUFFckMsQ0FBSCxDQUFELEdBQU8sQ0FBdkgsRUFBeUhxQyxDQUFDLENBQUMsSUFBRXJDLENBQUYsR0FBSSxDQUFMLENBQUQsR0FBUyxDQUFsSTtBQUFvSSxVQUFJOEMsQ0FBQyxHQUFDOUMsQ0FBTjtBQUFRNEIsTUFBQUEsQ0FBQyxHQUFDLENBQUYsRUFBSVEsQ0FBQyxHQUFDLEtBQUdtRixDQUFULEVBQVcvRSxDQUFDLEdBQUMsQ0FBYixFQUFlaEIsQ0FBQyxDQUFDLElBQUcsRUFBRXhCLENBQUwsR0FBTyxDQUFSLENBQUQsR0FBWTRCLENBQTNCLEVBQTZCSixDQUFDLENBQUMsSUFBRXhCLENBQUYsR0FBSSxDQUFMLENBQUQsR0FBU29DLENBQXRDLEVBQXdDWixDQUFDLENBQUMsSUFBRXhCLENBQUYsR0FBSSxDQUFMLENBQUQsR0FBU3dDLENBQWpELEVBQW1EekUsQ0FBQyxDQUFDUSxHQUFGLENBQU1xRCxDQUFOLEVBQVFRLENBQVIsRUFBVUksQ0FBVixFQUFhVixTQUFiLEVBQW5ELEVBQTRFTCxDQUFDLENBQUMsSUFBRXpCLENBQUgsQ0FBRCxHQUFPakMsQ0FBQyxDQUFDSSxDQUFyRixFQUF1RnNELENBQUMsQ0FBQyxJQUFFekIsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTakMsQ0FBQyxDQUFDTSxDQUFsRyxFQUFvR29ELENBQUMsQ0FBQyxJQUFFekIsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTakMsQ0FBQyxDQUFDMEMsQ0FBL0csRUFBaUg0QixDQUFDLENBQUMsSUFBRXJDLENBQUgsQ0FBRCxHQUFPLENBQXhILEVBQTBIcUMsQ0FBQyxDQUFDLElBQUVyQyxDQUFGLEdBQUksQ0FBTCxDQUFELEdBQVMsQ0FBbkk7QUFBcUksVUFBSStDLENBQUMsR0FBQy9DLENBQU47QUFBUUEsTUFBQUEsQ0FBQzs7QUFBRyxXQUFJLElBQUlRLENBQUMsR0FBQyxDQUFWLEVBQVlBLENBQUMsR0FBQ0gsQ0FBQyxHQUFDLENBQWhCLEVBQWtCRyxDQUFDLEVBQW5CLEVBQXNCO0FBQUMsWUFBSUYsQ0FBQyxHQUFDRSxDQUFDLEdBQUNILENBQVI7O0FBQVUsYUFBSSxJQUFJUyxDQUFDLEdBQUMsQ0FBVixFQUFZQSxDQUFDLEdBQUN3QixDQUFDLEdBQUMsQ0FBaEIsRUFBa0J4QixDQUFDLEVBQW5CLEVBQXNCO0FBQUMsY0FBSUwsQ0FBQyxHQUFDSyxDQUFDLEdBQUN3QixDQUFSO0FBQVVWLFVBQUFBLENBQUMsR0FBQzlDLElBQUksQ0FBQ3VPLEdBQUwsQ0FBUy9NLENBQUMsR0FBQ3hCLElBQUksQ0FBQzZCLEVBQVAsR0FBVSxDQUFuQixJQUFzQkosQ0FBeEIsRUFBMEI2QixDQUFDLEdBQUMsQ0FBQzNCLENBQUMsR0FBQyxFQUFILElBQU84RyxDQUFuQyxFQUFxQy9FLENBQUMsR0FBQzFELElBQUksQ0FBQ3NPLEdBQUwsQ0FBUzlNLENBQUMsR0FBQ3hCLElBQUksQ0FBQzZCLEVBQVAsR0FBVSxDQUFuQixJQUFzQkosQ0FBN0QsRUFBK0RpQixDQUFDLENBQUMsSUFBRXhCLENBQUYsR0FBSSxDQUFMLENBQUQsR0FBUzRCLENBQXhFLEVBQTBFSixDQUFDLENBQUMsSUFBRXhCLENBQUYsR0FBSSxDQUFMLENBQUQsR0FBU29DLENBQW5GLEVBQXFGWixDQUFDLENBQUMsSUFBRXhCLENBQUYsR0FBSSxDQUFMLENBQUQsR0FBU3dDLENBQTlGLEVBQWdHekUsQ0FBQyxDQUFDUSxHQUFGLENBQU1xRCxDQUFOLEVBQVFRLENBQVIsRUFBVUksQ0FBVixFQUFhVixTQUFiLEVBQWhHLEVBQXlITCxDQUFDLENBQUMsSUFBRXpCLENBQUgsQ0FBRCxHQUFPakMsQ0FBQyxDQUFDSSxDQUFsSSxFQUFvSXNELENBQUMsQ0FBQyxJQUFFekIsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTakMsQ0FBQyxDQUFDTSxDQUEvSSxFQUFpSm9ELENBQUMsQ0FBQyxJQUFFekIsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTakMsQ0FBQyxDQUFDMEMsQ0FBNUosRUFBOEo0QixDQUFDLENBQUMsSUFBRXJDLENBQUgsQ0FBRCxHQUFPTSxDQUFySyxFQUF1SytCLENBQUMsQ0FBQyxJQUFFckMsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTLElBQUVTLENBQWxMLEVBQW9MVCxDQUFDLEVBQXJMO0FBQXdMO0FBQUM7O0FBQUEsVUFBSUUsQ0FBQyxHQUFDLENBQU47QUFBQSxVQUFRcUIsQ0FBQyxHQUFDZSxDQUFDLEdBQUMsQ0FBWjs7QUFBYyxXQUFJOUIsQ0FBQyxHQUFDLENBQU4sRUFBUUEsQ0FBQyxHQUFDSCxDQUFWLEVBQVlHLENBQUMsRUFBYixFQUFnQjtBQUFDLFlBQUkrQixDQUFDLEdBQUMvQixDQUFDLEdBQUMsQ0FBUjs7QUFBVSxhQUFJTCxDQUFDLENBQUMsSUFBRUQsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTNEMsQ0FBVCxFQUFXM0MsQ0FBQyxDQUFDLElBQUVELENBQUYsR0FBSSxDQUFMLENBQUQsR0FBUyxJQUFFTSxDQUFDLEdBQUNlLENBQXhCLEVBQTBCcEIsQ0FBQyxDQUFDLElBQUVELENBQUYsR0FBSSxDQUFMLENBQUQsR0FBUyxJQUFFcUMsQ0FBQyxHQUFDaEIsQ0FBdkMsRUFBeUNyQixDQUFDLEVBQTFDLEVBQTZDWSxDQUFDLEdBQUMsQ0FBbkQsRUFBcURBLENBQUMsR0FBQ3dCLENBQXZELEVBQXlEeEIsQ0FBQyxFQUExRCxFQUE2RFgsQ0FBQyxDQUFDLElBQUVELENBQUYsR0FBSSxDQUFMLENBQUQsR0FBUyxJQUFFTSxDQUFDLEdBQUNlLENBQUosSUFBT1QsQ0FBQyxHQUFDLENBQVQsQ0FBVCxFQUFxQlgsQ0FBQyxDQUFDLElBQUVELENBQUYsR0FBSSxDQUFMLENBQUQsR0FBUyxJQUFFTSxDQUFDLEdBQUNlLENBQUosSUFBT1QsQ0FBQyxHQUFDLENBQVQsQ0FBOUIsRUFBMENYLENBQUMsQ0FBQyxJQUFFRCxDQUFGLEdBQUksQ0FBTCxDQUFELEdBQVMsSUFBRXFDLENBQUMsR0FBQ2hCLENBQUosSUFBT1QsQ0FBQyxHQUFDLENBQVQsQ0FBbkQsRUFBK0RYLENBQUMsQ0FBQyxJQUFHLEVBQUVELENBQUwsR0FBTyxDQUFSLENBQUQsR0FBWSxJQUFFcUMsQ0FBQyxHQUFDaEIsQ0FBSixJQUFPVCxDQUFDLEdBQUMsQ0FBVCxDQUEzRSxFQUF1RlgsQ0FBQyxDQUFDLElBQUVELENBQUYsR0FBSSxDQUFMLENBQUQsR0FBUyxJQUFFTSxDQUFDLEdBQUNlLENBQUosSUFBT1QsQ0FBQyxHQUFDLENBQVQsQ0FBaEcsRUFBNEdYLENBQUMsQ0FBQyxJQUFFRCxDQUFGLEdBQUksQ0FBTCxDQUFELEdBQVMsSUFBRXFDLENBQUMsR0FBQ2hCLENBQUosSUFBT1QsQ0FBQyxHQUFDLENBQVQsQ0FBckgsRUFBaUlaLENBQUMsRUFBbEk7O0FBQXFJQyxRQUFBQSxDQUFDLENBQUMsSUFBRUQsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTLElBQUVxQyxDQUFDLEdBQUNoQixDQUFKLEdBQU1lLENBQWYsRUFBaUJuQyxDQUFDLENBQUMsSUFBRUQsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTLElBQUVNLENBQUMsR0FBQ2UsQ0FBSixHQUFNZSxDQUFoQyxFQUFrQ25DLENBQUMsQ0FBQyxJQUFFRCxDQUFGLEdBQUksQ0FBTCxDQUFELEdBQVM2QyxDQUEzQyxFQUE2QzdDLENBQUMsRUFBOUM7QUFBaUQ7O0FBQUF3UixNQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBY3hULENBQWQsRUFBZ0I7QUFBQ2pDLFFBQUFBLFFBQVEsRUFBQztBQUFDQyxVQUFBQSxJQUFJLEVBQUMsQ0FBTjtBQUFRQyxVQUFBQSxJQUFJLEVBQUNvRjtBQUFiLFNBQVY7QUFBMEIwVixRQUFBQSxNQUFNLEVBQUM7QUFBQy9hLFVBQUFBLElBQUksRUFBQyxDQUFOO0FBQVFDLFVBQUFBLElBQUksRUFBQ3FGO0FBQWIsU0FBakM7QUFBaURuRixRQUFBQSxFQUFFLEVBQUM7QUFBQ0gsVUFBQUEsSUFBSSxFQUFDLENBQU47QUFBUUMsVUFBQUEsSUFBSSxFQUFDaUc7QUFBYixTQUFwRDtBQUFvRXlDLFFBQUFBLEtBQUssRUFBQztBQUFDMUksVUFBQUEsSUFBSSxFQUFDK0Q7QUFBTjtBQUExRSxPQUFoQixHQUFxRyxNQUFNTyxDQUFOLEVBQVF2QyxDQUFSLENBQXJHO0FBQWdIOztBQUEzckMsR0FBdm5HLEVBQW96STZCLENBQUMsQ0FBQzhaLEtBQUYsR0FBUTFYLENBQTV6SSxFQUE4eklwQyxDQUFDLENBQUN6RixPQUFGLEdBQVUsTUFBSztBQUFDakIsSUFBQUEsV0FBVyxDQUFDMEcsQ0FBRCxFQUFHO0FBQUM3RCxNQUFBQSxJQUFJLEVBQUNzRixDQUFDLEdBQUMsR0FBUjtBQUFZc1ksTUFBQUEsT0FBTyxFQUFDN1osQ0FBQyxHQUFDLEVBQXRCO0FBQXlCMUYsTUFBQUEsS0FBSyxFQUFDMkYsQ0FBQyxHQUFDLENBQWpDO0FBQW1DNlosTUFBQUEsV0FBVyxFQUFDbFosQ0FBQyxHQUFDO0FBQWpELFFBQXNELEVBQXpELEVBQTREO0FBQUMsVUFBSWIsQ0FBQyxHQUFDLElBQU47QUFBVyxXQUFLaEcsRUFBTCxHQUFRK0YsQ0FBUixFQUFVLEtBQUtyQyxPQUFMLEdBQWE7QUFBQy9CLFFBQUFBLEtBQUssRUFBQztBQUFQLE9BQXZCLEVBQW9DLEtBQUtxZSxJQUFMLEdBQVU7QUFBQ0MsUUFBQUEsSUFBSSxFQUFDLElBQU47QUFBV0MsUUFBQUEsS0FBSyxFQUFDLElBQWpCOztBQUFzQkMsUUFBQUEsSUFBSSxHQUFFO0FBQUMsY0FBSXBhLENBQUMsR0FBQ0MsQ0FBQyxDQUFDZ2EsSUFBRixDQUFPQyxJQUFiO0FBQWtCamEsVUFBQUEsQ0FBQyxDQUFDZ2EsSUFBRixDQUFPQyxJQUFQLEdBQVlqYSxDQUFDLENBQUNnYSxJQUFGLENBQU9FLEtBQW5CLEVBQXlCbGEsQ0FBQyxDQUFDZ2EsSUFBRixDQUFPRSxLQUFQLEdBQWFuYSxDQUF0QyxFQUF3Q0MsQ0FBQyxDQUFDdEMsT0FBRixDQUFVL0IsS0FBVixHQUFnQnFFLENBQUMsQ0FBQ2dhLElBQUYsQ0FBT0MsSUFBUCxDQUFZMWQsT0FBcEU7QUFBNEU7O0FBQTNILE9BQTlDLEVBQTJLLFlBQVU7QUFBQyxZQUFJMkQsQ0FBQyxHQUFDSCxDQUFDLENBQUNsRyxRQUFGLENBQVd1Z0IsVUFBWCxDQUF1QixlQUFjcmEsQ0FBQyxDQUFDbEcsUUFBRixDQUFXc2EsUUFBWCxHQUFvQixFQUFwQixHQUF1QixPQUFRLGNBQXBFLENBQU47QUFBQSxZQUF5RmxVLENBQUMsR0FBQztBQUFDekcsVUFBQUEsS0FBSyxFQUFDZ0ksQ0FBUDtBQUFTL0gsVUFBQUEsTUFBTSxFQUFDK0gsQ0FBaEI7QUFBa0JvQyxVQUFBQSxJQUFJLEVBQUM3RCxDQUFDLENBQUNsRyxRQUFGLENBQVdzYSxRQUFYLEdBQW9CcFUsQ0FBQyxDQUFDc2EsVUFBdEIsR0FBaUN0YSxDQUFDLENBQUNsRyxRQUFGLENBQVd1Z0IsVUFBWCxDQUFzQkUsc0JBQXRCLEdBQTZDdmEsQ0FBQyxDQUFDbEcsUUFBRixDQUFXdWdCLFVBQVgsQ0FBc0JFLHNCQUF0QixDQUE2Q0MsY0FBMUYsR0FBeUd4YSxDQUFDLENBQUN1UyxhQUFuSztBQUFpTEMsVUFBQUEsTUFBTSxFQUFDeFMsQ0FBQyxDQUFDeVMsSUFBMUw7QUFBK0xDLFVBQUFBLGNBQWMsRUFBQzFTLENBQUMsQ0FBQ2xHLFFBQUYsQ0FBV3NhLFFBQVgsR0FBb0JwVSxDQUFDLENBQUN5YSxPQUF0QixHQUE4QnphLENBQUMsQ0FBQ3lTLElBQTlPO0FBQW1QL1YsVUFBQUEsU0FBUyxFQUFDeUQsQ0FBQyxHQUFDSCxDQUFDLENBQUNyRCxNQUFILEdBQVVxRCxDQUFDLENBQUNxVixPQUExUTtBQUFrUlQsVUFBQUEsS0FBSyxFQUFDLENBQUM7QUFBelIsU0FBM0Y7QUFBdVgzVSxRQUFBQSxDQUFDLENBQUNnYSxJQUFGLENBQU9DLElBQVAsR0FBWSxJQUFJM1gsQ0FBSixDQUFNdkMsQ0FBTixFQUFRRSxDQUFSLENBQVosRUFBdUJELENBQUMsQ0FBQ2dhLElBQUYsQ0FBT0UsS0FBUCxHQUFhLElBQUk1WCxDQUFKLENBQU12QyxDQUFOLEVBQVFFLENBQVIsQ0FBcEMsRUFBK0NELENBQUMsQ0FBQ2dhLElBQUYsQ0FBT0csSUFBUCxFQUEvQztBQUE2RCxPQUEvYixFQUEzSyxFQUE2bUIsS0FBS2xnQixNQUFMLEdBQVksQ0FBem5CLEVBQTJuQixLQUFLQyxLQUFMLEdBQVcsSUFBSTRELENBQUosRUFBdG9CLEVBQTRvQixLQUFLMUQsUUFBTCxHQUFjLElBQUkwRCxDQUFKLEVBQTFwQixFQUFncUIsS0FBS3ZDLElBQUwsR0FBVSxJQUFJNkcsQ0FBSixDQUFNckMsQ0FBTixFQUFRO0FBQUNoRSxRQUFBQSxRQUFRLEVBQUMsSUFBSXdFLENBQUosQ0FBTVIsQ0FBTixFQUFRO0FBQUM5RCxVQUFBQSxRQUFRLEVBQUM7QUFBQ0MsWUFBQUEsSUFBSSxFQUFDLENBQU47QUFBUUMsWUFBQUEsSUFBSSxFQUFDLElBQUlDLFlBQUosQ0FBaUIsQ0FBQyxDQUFDLENBQUYsRUFBSSxDQUFDLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBQyxDQUFWLEVBQVksQ0FBQyxDQUFiLEVBQWUsQ0FBZixDQUFqQjtBQUFiLFdBQVY7QUFBNERDLFVBQUFBLEVBQUUsRUFBQztBQUFDSCxZQUFBQSxJQUFJLEVBQUMsQ0FBTjtBQUFRQyxZQUFBQSxJQUFJLEVBQUMsSUFBSUMsWUFBSixDQUFpQixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxDQUFqQjtBQUFiO0FBQS9ELFNBQVIsQ0FBVjtBQUFpSVosUUFBQUEsT0FBTyxFQUFDLElBQUkrRixDQUFKLENBQU14QixDQUFOLEVBQVE7QUFBQzFDLFVBQUFBLE1BQU0sRUFBQywrS0FBUjtBQUF3TEMsVUFBQUEsUUFBUSxFQUFDLDJyQkFBak07QUFBNjNCN0IsVUFBQUEsUUFBUSxFQUFDO0FBQUNnZixZQUFBQSxJQUFJLEVBQUN6YSxDQUFDLENBQUN0QyxPQUFSO0FBQWdCZ2QsWUFBQUEsUUFBUSxFQUFDO0FBQUMvZSxjQUFBQSxLQUFLLEVBQUMsS0FBR3NFO0FBQVYsYUFBekI7QUFBc0MwYSxZQUFBQSxNQUFNLEVBQUM7QUFBQ2hmLGNBQUFBLEtBQUssRUFBQ3VFO0FBQVAsYUFBN0M7QUFBdUQwYSxZQUFBQSxZQUFZLEVBQUM7QUFBQ2pmLGNBQUFBLEtBQUssRUFBQ2tGO0FBQVAsYUFBcEU7QUFBOEVnYSxZQUFBQSxPQUFPLEVBQUM7QUFBQ2xmLGNBQUFBLEtBQUssRUFBQztBQUFQLGFBQXRGO0FBQWdHbWYsWUFBQUEsTUFBTSxFQUFDO0FBQUNuZixjQUFBQSxLQUFLLEVBQUNxRSxDQUFDLENBQUM5RjtBQUFULGFBQXZHO0FBQXVINmdCLFlBQUFBLFNBQVMsRUFBQztBQUFDcGYsY0FBQUEsS0FBSyxFQUFDcUUsQ0FBQyxDQUFDNUY7QUFBVDtBQUFqSSxXQUF0NEI7QUFBMmhDZ04sVUFBQUEsU0FBUyxFQUFDLENBQUM7QUFBdGlDLFNBQVI7QUFBekksT0FBUixDQUExcUI7QUFBKzJEOztBQUFBcEksSUFBQUEsTUFBTSxHQUFFO0FBQUMsV0FBS3pELElBQUwsQ0FBVUMsT0FBVixDQUFrQkMsUUFBbEIsQ0FBMkJvZixPQUEzQixDQUFtQ2xmLEtBQW5DLEdBQXlDLEtBQUsxQixNQUE5QyxFQUFxRCxLQUFLRCxFQUFMLENBQVFILFFBQVIsQ0FBaUJ5RixNQUFqQixDQUF3QjtBQUFDQyxRQUFBQSxLQUFLLEVBQUMsS0FBS2hFLElBQVo7QUFBaUIwSSxRQUFBQSxNQUFNLEVBQUMsS0FBSytWLElBQUwsQ0FBVUUsS0FBbEM7QUFBd0NjLFFBQUFBLEtBQUssRUFBQyxDQUFDO0FBQS9DLE9BQXhCLENBQXJELEVBQWdJLEtBQUtoQixJQUFMLENBQVVHLElBQVYsRUFBaEk7QUFBaUo7O0FBQTdsRSxHQUE3MEksRUFBNDZNcGEsQ0FBQyxDQUFDa2IsS0FBRixHQUFRLE1BQUs7QUFBQzVoQixJQUFBQSxXQUFXLENBQUMwRyxDQUFELEVBQUc7QUFBQzVELE1BQUFBLElBQUksRUFBQytELENBQUMsR0FBQyxJQUFJOUQsWUFBSixDQUFpQixFQUFqQixDQUFSO0FBQTZCTCxNQUFBQSxRQUFRLEVBQUMrQixDQUFDLEdBQUMsSUFBSXlDLENBQUosQ0FBTVIsQ0FBTixFQUFRO0FBQUM5RCxRQUFBQSxRQUFRLEVBQUM7QUFBQ0MsVUFBQUEsSUFBSSxFQUFDLENBQU47QUFBUUMsVUFBQUEsSUFBSSxFQUFDLElBQUlDLFlBQUosQ0FBaUIsQ0FBQyxDQUFDLENBQUYsRUFBSSxDQUFDLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBQyxDQUFWLEVBQVksQ0FBQyxDQUFiLEVBQWUsQ0FBZixDQUFqQjtBQUFiLFNBQVY7QUFBNERDLFFBQUFBLEVBQUUsRUFBQztBQUFDSCxVQUFBQSxJQUFJLEVBQUMsQ0FBTjtBQUFRQyxVQUFBQSxJQUFJLEVBQUMsSUFBSUMsWUFBSixDQUFpQixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxDQUFqQjtBQUFiO0FBQS9ELE9BQVI7QUFBeEMsS0FBSCxFQUFtSztBQUFDLFdBQUtwQyxFQUFMLEdBQVErRixDQUFSO0FBQVUsVUFBSWMsQ0FBQyxHQUFDWCxDQUFOO0FBQVEsV0FBS2diLE1BQUwsR0FBWSxFQUFaLEVBQWUsS0FBS25mLFFBQUwsR0FBYytCLENBQTdCLEVBQStCLEtBQUtxZCxVQUFMLEdBQWdCdGEsQ0FBQyxDQUFDNUMsTUFBRixHQUFTLENBQXhELEVBQTBELEtBQUsvQixJQUFMLEdBQVUyQyxJQUFJLENBQUN1YyxHQUFMLENBQVMsQ0FBVCxFQUFXdmMsSUFBSSxDQUFDd2MsSUFBTCxDQUFVeGMsSUFBSSxDQUFDeWMsR0FBTCxDQUFTemMsSUFBSSxDQUFDd2MsSUFBTCxDQUFVeGMsSUFBSSxDQUFDc0IsSUFBTCxDQUFVLEtBQUtnYixVQUFmLENBQVYsQ0FBVCxJQUFnRHRjLElBQUksQ0FBQzBjLEdBQS9ELENBQVgsQ0FBcEUsRUFBb0osS0FBS0MsTUFBTCxHQUFZLElBQUlwZixZQUFKLENBQWlCLElBQUUsS0FBSytlLFVBQXhCLENBQWhLOztBQUFvTSxXQUFJLElBQUluYixDQUFDLEdBQUMsQ0FBVixFQUFZQSxDQUFDLEdBQUMsS0FBS21iLFVBQW5CLEVBQThCbmIsQ0FBQyxFQUEvQixFQUFrQztBQUFDLFlBQUl1QixDQUFDLEdBQUN2QixDQUFDLEdBQUMsS0FBSzlELElBQVAsR0FBWSxLQUFLQSxJQUF2QjtBQUFBLFlBQTRCc0YsQ0FBQyxHQUFDM0MsSUFBSSxDQUFDNlosS0FBTCxDQUFXMVksQ0FBQyxHQUFDLEtBQUs5RCxJQUFsQixJQUF3QixLQUFLQSxJQUEzRDtBQUFnRSxhQUFLc2YsTUFBTCxDQUFZbGQsR0FBWixDQUFnQixDQUFDaUQsQ0FBRCxFQUFHQyxDQUFILENBQWhCLEVBQXNCLElBQUV4QixDQUF4QjtBQUEyQjs7QUFBQSxVQUFJc0IsQ0FBQyxHQUFDLENBQUMsTUFBSTtBQUFDLFlBQUdULENBQUMsQ0FBQzVDLE1BQUYsS0FBVyxLQUFLL0IsSUFBTCxHQUFVLEtBQUtBLElBQWYsR0FBb0IsQ0FBbEMsRUFBb0MsT0FBTzJFLENBQVA7QUFBUztBQUFDLGNBQUlkLENBQUMsR0FBQyxJQUFJM0QsWUFBSixDQUFpQixLQUFLRixJQUFMLEdBQVUsS0FBS0EsSUFBZixHQUFvQixDQUFyQyxDQUFOO0FBQThDLGlCQUFPNkQsQ0FBQyxDQUFDekIsR0FBRixDQUFNdUMsQ0FBTixHQUFTZCxDQUFoQjtBQUFrQjtBQUFDLE9BQXJILEdBQU47O0FBQStILFdBQUtyQyxPQUFMLEdBQWE7QUFBQy9CLFFBQUFBLEtBQUssRUFBQyxJQUFJMEcsQ0FBSixDQUFNdEMsQ0FBTixFQUFRO0FBQUNoRCxVQUFBQSxLQUFLLEVBQUN1RSxDQUFQO0FBQVMyQyxVQUFBQSxNQUFNLEVBQUNsRSxDQUFDLENBQUNzUyxVQUFsQjtBQUE2QnpPLFVBQUFBLElBQUksRUFBQzdELENBQUMsQ0FBQzhELEtBQXBDO0FBQTBDME8sVUFBQUEsTUFBTSxFQUFDeFMsQ0FBQyxDQUFDeVMsSUFBbkQ7QUFBd0RDLFVBQUFBLGNBQWMsRUFBQzFTLENBQUMsQ0FBQ2xHLFFBQUYsQ0FBV3NhLFFBQVgsR0FBb0JwVSxDQUFDLENBQUMwYixPQUF0QixHQUE4QjFiLENBQUMsQ0FBQ3lTLElBQXZHO0FBQTRHRSxVQUFBQSxLQUFLLEVBQUMzUyxDQUFDLENBQUM0UyxhQUFwSDtBQUFrSUMsVUFBQUEsS0FBSyxFQUFDN1MsQ0FBQyxDQUFDNFMsYUFBMUk7QUFBd0pFLFVBQUFBLGVBQWUsRUFBQyxDQUFDLENBQXpLO0FBQTJLcFcsVUFBQUEsU0FBUyxFQUFDc0QsQ0FBQyxDQUFDcVYsT0FBdkw7QUFBK0x6WSxVQUFBQSxTQUFTLEVBQUNvRCxDQUFDLENBQUNxVixPQUEzTTtBQUFtTjViLFVBQUFBLEtBQUssRUFBQyxLQUFLMEMsSUFBOU47QUFBbU8rVyxVQUFBQSxLQUFLLEVBQUMsQ0FBQztBQUExTyxTQUFSO0FBQVAsT0FBYjtBQUEyUSxVQUFJaFQsQ0FBQyxHQUFDO0FBQUN6RyxRQUFBQSxLQUFLLEVBQUMsS0FBSzBDLElBQVo7QUFBaUJ6QyxRQUFBQSxNQUFNLEVBQUMsS0FBS3lDLElBQTdCO0FBQWtDMEgsUUFBQUEsSUFBSSxFQUFDN0QsQ0FBQyxDQUFDbEcsUUFBRixDQUFXc2EsUUFBWCxHQUFvQnBVLENBQUMsQ0FBQ3NhLFVBQXRCLEdBQWlDdGEsQ0FBQyxDQUFDbEcsUUFBRixDQUFXdWdCLFVBQVgsQ0FBc0JFLHNCQUF0QixHQUE2Q3ZhLENBQUMsQ0FBQ2xHLFFBQUYsQ0FBV3VnQixVQUFYLENBQXNCRSxzQkFBdEIsQ0FBNkNDLGNBQTFGLEdBQXlHeGEsQ0FBQyxDQUFDdVMsYUFBbkw7QUFBaU1DLFFBQUFBLE1BQU0sRUFBQ3hTLENBQUMsQ0FBQ3lTLElBQTFNO0FBQStNQyxRQUFBQSxjQUFjLEVBQUMxUyxDQUFDLENBQUNsRyxRQUFGLENBQVdzYSxRQUFYLEdBQW9CcFUsQ0FBQyxDQUFDeWEsT0FBdEIsR0FBOEJ6YSxDQUFDLENBQUN5UyxJQUE5UDtBQUFtUS9WLFFBQUFBLFNBQVMsRUFBQ3NELENBQUMsQ0FBQ3FWLE9BQS9RO0FBQXVSVCxRQUFBQSxLQUFLLEVBQUMsQ0FBQyxDQUE5UjtBQUFnUzNCLFFBQUFBLGVBQWUsRUFBQztBQUFoVCxPQUFOO0FBQXlULFdBQUswSSxHQUFMLEdBQVM7QUFBQ3pCLFFBQUFBLElBQUksRUFBQyxJQUFJM1gsQ0FBSixDQUFNdkMsQ0FBTixFQUFRRSxDQUFSLENBQU47QUFBaUJpYSxRQUFBQSxLQUFLLEVBQUMsSUFBSTVYLENBQUosQ0FBTXZDLENBQU4sRUFBUUUsQ0FBUixDQUF2QjtBQUFrQ2thLFFBQUFBLElBQUksRUFBQyxNQUFJO0FBQUMsY0FBSXBhLENBQUMsR0FBQyxLQUFLMmIsR0FBTCxDQUFTekIsSUFBZjtBQUFvQixlQUFLeUIsR0FBTCxDQUFTekIsSUFBVCxHQUFjLEtBQUt5QixHQUFMLENBQVN4QixLQUF2QixFQUE2QixLQUFLd0IsR0FBTCxDQUFTeEIsS0FBVCxHQUFlbmEsQ0FBNUMsRUFBOEMsS0FBS3JDLE9BQUwsQ0FBYS9CLEtBQWIsR0FBbUIsS0FBSytmLEdBQUwsQ0FBU3pCLElBQVQsQ0FBYzFkLE9BQS9FO0FBQXVGO0FBQXZKLE9BQVQ7QUFBa0s7O0FBQUFvZixJQUFBQSxPQUFPLENBQUM7QUFBQ3RlLE1BQUFBLE1BQU0sRUFBQ1MsQ0FBQyxHQUFDLCtLQUFWO0FBQTBMUixNQUFBQSxRQUFRLEVBQUNpRCxDQUFDLEdBQUMsZ0tBQXJNO0FBQXNXOUUsTUFBQUEsUUFBUSxFQUFDc0UsQ0FBQyxHQUFDLEVBQWpYO0FBQW9YNmIsTUFBQUEsY0FBYyxFQUFDNWIsQ0FBQyxHQUFDLE1BQXJZO0FBQTRZNmIsTUFBQUEsT0FBTyxFQUFDaGIsQ0FBQyxHQUFDLENBQUM7QUFBdlosUUFBMFosRUFBM1osRUFBOFo7QUFBQ2QsTUFBQUEsQ0FBQyxDQUFDQyxDQUFELENBQUQsR0FBSyxLQUFLdEMsT0FBVjtBQUFrQixVQUFJdUMsQ0FBQyxHQUFDLElBQUlzQixDQUFKLENBQU0sS0FBS3ZILEVBQVgsRUFBYztBQUFDcUQsUUFBQUEsTUFBTSxFQUFDUyxDQUFSO0FBQVVSLFFBQUFBLFFBQVEsRUFBQ2lELENBQW5CO0FBQXFCOUUsUUFBQUEsUUFBUSxFQUFDc0U7QUFBOUIsT0FBZCxDQUFOO0FBQUEsVUFBc0RHLENBQUMsR0FBQztBQUFDM0UsUUFBQUEsSUFBSSxFQUFDLElBQUk2RyxDQUFKLENBQU0sS0FBS3BJLEVBQVgsRUFBYztBQUFDK0IsVUFBQUEsUUFBUSxFQUFDLEtBQUtBLFFBQWY7QUFBd0JQLFVBQUFBLE9BQU8sRUFBQ3lFO0FBQWhDLFNBQWQsQ0FBTjtBQUF3RHpFLFFBQUFBLE9BQU8sRUFBQ3lFLENBQWhFO0FBQWtFeEUsUUFBQUEsUUFBUSxFQUFDc0UsQ0FBM0U7QUFBNkU4YixRQUFBQSxPQUFPLEVBQUNoYixDQUFyRjtBQUF1RithLFFBQUFBLGNBQWMsRUFBQzViO0FBQXRHLE9BQXhEO0FBQWlLLGFBQU8sS0FBS2tiLE1BQUwsQ0FBWTNQLElBQVosQ0FBaUJyTCxDQUFqQixHQUFvQkEsQ0FBM0I7QUFBNkI7O0FBQUFaLElBQUFBLE1BQU0sR0FBRTtBQUFDLFdBQUs0YixNQUFMLENBQVlZLE1BQVosQ0FBbUIvYixDQUFDLElBQUVBLENBQUMsQ0FBQzhiLE9BQXhCLEVBQWlDOWdCLE9BQWpDLENBQXlDLENBQUNnRixDQUFELEVBQUdDLENBQUgsS0FBTztBQUFDLGFBQUtoRyxFQUFMLENBQVFILFFBQVIsQ0FBaUJ5RixNQUFqQixDQUF3QjtBQUFDQyxVQUFBQSxLQUFLLEVBQUNRLENBQUMsQ0FBQ3hFLElBQVQ7QUFBYzBJLFVBQUFBLE1BQU0sRUFBQyxLQUFLeVgsR0FBTCxDQUFTeEIsS0FBOUI7QUFBb0NjLFVBQUFBLEtBQUssRUFBQyxDQUFDO0FBQTNDLFNBQXhCLEdBQXVFLEtBQUtVLEdBQUwsQ0FBU3ZCLElBQVQsRUFBdkU7QUFBdUYsT0FBeEk7QUFBMEk7O0FBQWxuRSxHQUF6N00sRUFBNmlScGEsQ0FBQyxDQUFDL0QsUUFBRixHQUFXdUUsQ0FBeGpSLEVBQTBqUlIsQ0FBQyxDQUFDZ2MsSUFBRixHQUFPeFosQ0FBamtSLEVBQW1rUnhDLENBQUMsQ0FBQ2ljLElBQUYsR0FBTy9iLENBQTFrUixFQUE0a1JGLENBQUMsQ0FBQ25DLElBQUYsR0FBT3dFLENBQW5sUixFQUFxbFJyQyxDQUFDLENBQUNrYyxhQUFGLEdBQWdCLFVBQVNsYyxDQUFULEVBQVc7QUFBQyxXQUFPLElBQUl3QixDQUFKLENBQU14QixDQUFOLEVBQVE7QUFBQzFDLE1BQUFBLE1BQU0sRUFBQyw4V0FBUjtBQUF1WEMsTUFBQUEsUUFBUSxFQUFDO0FBQWhZLEtBQVIsQ0FBUDtBQUF3akIsR0FBenFTLEVBQTBxU3lDLENBQUMsQ0FBQ21jLEtBQUYsR0FBUSxVQUFTMWEsQ0FBVCxFQUFXO0FBQUMyYSxJQUFBQSxPQUFPLEVBQUNwYyxDQUFDLEdBQUNwRyxRQUFYO0FBQW9Ca2lCLElBQUFBLE9BQU8sRUFBQ3ZhLENBQUMsR0FBQyxDQUFDLENBQS9CO0FBQWlDMkMsSUFBQUEsTUFBTSxFQUFDdEMsQ0FBQyxHQUFDLElBQUkzQixDQUFKLEVBQTFDO0FBQWdEb2MsSUFBQUEsSUFBSSxFQUFDdmIsQ0FBQyxHQUFDLEdBQXZEO0FBQTJEd2IsSUFBQUEsT0FBTyxFQUFDOWEsQ0FBQyxHQUFDLEdBQXJFO0FBQXlFK2EsSUFBQUEsWUFBWSxFQUFDcmQsQ0FBQyxHQUFDLENBQUMsQ0FBekY7QUFBMkZzZCxJQUFBQSxXQUFXLEVBQUNuYyxDQUFDLEdBQUMsRUFBekc7QUFBNEdvYyxJQUFBQSxVQUFVLEVBQUNuYyxDQUFDLEdBQUMsQ0FBQyxDQUExSDtBQUE0SG9jLElBQUFBLFNBQVMsRUFBQ25jLENBQUMsR0FBQyxDQUF4STtBQUEwSW9jLElBQUFBLFNBQVMsRUFBQ3hlLENBQUMsR0FBQyxDQUFDLENBQXZKO0FBQXlKeWUsSUFBQUEsUUFBUSxFQUFDdmUsQ0FBQyxHQUFDLEVBQXBLO0FBQXVLd2UsSUFBQUEsYUFBYSxFQUFDcGMsQ0FBQyxHQUFDLENBQXZMO0FBQXlMcWMsSUFBQUEsYUFBYSxFQUFDcGMsQ0FBQyxHQUFDNUIsSUFBSSxDQUFDNkIsRUFBOU07QUFBaU5vYyxJQUFBQSxlQUFlLEVBQUNqYSxDQUFDLEdBQUMsQ0FBQyxDQUFELEdBQUcsQ0FBdE87QUFBd09rYSxJQUFBQSxlQUFlLEVBQUNqYSxDQUFDLEdBQUMsSUFBRSxDQUE1UDtBQUE4UGthLElBQUFBLFdBQVcsRUFBQzdhLENBQUMsR0FBQyxDQUE1UTtBQUE4UThhLElBQUFBLFdBQVcsRUFBQzFhLENBQUMsR0FBQyxJQUFFO0FBQTlSLE1BQWlTLEVBQTVTLEVBQStTO0FBQUMsU0FBS3NaLE9BQUwsR0FBYXZhLENBQWIsRUFBZSxLQUFLMkMsTUFBTCxHQUFZdEMsQ0FBM0IsRUFBNkJkLENBQUMsR0FBQ0EsQ0FBQyxJQUFFLENBQWxDLEVBQW9DVSxDQUFDLEdBQUNBLENBQUMsSUFBRSxDQUF6QyxFQUEyQyxLQUFLeWIsV0FBTCxHQUFpQjdhLENBQTVELEVBQThELEtBQUs4YSxXQUFMLEdBQWlCMWEsQ0FBL0U7QUFBaUYsUUFBSVEsQ0FBQyxHQUFDO0FBQUN3RCxNQUFBQSxNQUFNLEVBQUMsQ0FBUjtBQUFVMlcsTUFBQUEsR0FBRyxFQUFDLENBQWQ7QUFBZ0JDLE1BQUFBLEtBQUssRUFBQztBQUF0QixLQUFOO0FBQUEsUUFBK0JqZCxDQUFDLEdBQUM7QUFBQ3FHLE1BQUFBLE1BQU0sRUFBQyxDQUFSO0FBQVUyVyxNQUFBQSxHQUFHLEVBQUMsQ0FBZDtBQUFnQkMsTUFBQUEsS0FBSyxFQUFDO0FBQXRCLEtBQWpDO0FBQUEsUUFBMEQ1YyxDQUFDLEdBQUM7QUFBQ2dHLE1BQUFBLE1BQU0sRUFBQyxDQUFSO0FBQVUyVyxNQUFBQSxHQUFHLEVBQUMsQ0FBZDtBQUFnQkMsTUFBQUEsS0FBSyxFQUFDO0FBQXRCLEtBQTVEO0FBQUEsUUFBcUZ0VyxDQUFDLEdBQUMsSUFBSTdHLENBQUosRUFBdkY7QUFBQSxRQUE2RkMsQ0FBQyxHQUFDLElBQUlELENBQUosRUFBL0Y7QUFBcUdDLElBQUFBLENBQUMsQ0FBQ2QsSUFBRixDQUFPcUMsQ0FBQyxDQUFDdkYsUUFBVCxFQUFtQjhFLEdBQW5CLENBQXVCLEtBQUtrRCxNQUE1QixHQUFvQzFELENBQUMsQ0FBQ2dHLE1BQUYsR0FBU3JHLENBQUMsQ0FBQ3FHLE1BQUYsR0FBU3RHLENBQUMsQ0FBQ2tCLFFBQUYsRUFBdEQsRUFBbUVaLENBQUMsQ0FBQzRjLEtBQUYsR0FBUWpkLENBQUMsQ0FBQ2lkLEtBQUYsR0FBUXRlLElBQUksQ0FBQzBRLEtBQUwsQ0FBV3RQLENBQUMsQ0FBQy9CLENBQWIsRUFBZStCLENBQUMsQ0FBQ08sQ0FBakIsQ0FBbkYsRUFBdUdELENBQUMsQ0FBQzJjLEdBQUYsR0FBTWhkLENBQUMsQ0FBQ2dkLEdBQUYsR0FBTXJlLElBQUksQ0FBQzhCLElBQUwsQ0FBVTlCLElBQUksQ0FBQytGLEdBQUwsQ0FBUy9GLElBQUksQ0FBQ0MsR0FBTCxDQUFTbUIsQ0FBQyxDQUFDN0IsQ0FBRixHQUFJOEIsQ0FBQyxDQUFDcUcsTUFBZixFQUFzQixDQUFDLENBQXZCLENBQVQsRUFBbUMsQ0FBbkMsQ0FBVixDQUFuSCxFQUFvSyxLQUFLdkgsTUFBTCxHQUFZLE1BQUk7QUFBQ2tCLE1BQUFBLENBQUMsQ0FBQ3FHLE1BQUYsSUFBVXhELENBQUMsQ0FBQ3dELE1BQVosRUFBbUJyRyxDQUFDLENBQUNpZCxLQUFGLElBQVNwYSxDQUFDLENBQUNvYSxLQUE5QixFQUFvQ2pkLENBQUMsQ0FBQ2dkLEdBQUYsSUFBT25hLENBQUMsQ0FBQ21hLEdBQTdDLEVBQWlEaGQsQ0FBQyxDQUFDaWQsS0FBRixHQUFRdGUsSUFBSSxDQUFDQyxHQUFMLENBQVMrRCxDQUFULEVBQVdoRSxJQUFJLENBQUMrRixHQUFMLENBQVM5QixDQUFULEVBQVc1QyxDQUFDLENBQUNpZCxLQUFiLENBQVgsQ0FBekQsRUFBeUZqZCxDQUFDLENBQUNnZCxHQUFGLEdBQU1yZSxJQUFJLENBQUNDLEdBQUwsQ0FBUzBCLENBQVQsRUFBVzNCLElBQUksQ0FBQytGLEdBQUwsQ0FBU25FLENBQVQsRUFBV1AsQ0FBQyxDQUFDZ2QsR0FBYixDQUFYLENBQS9GLEVBQTZIaGQsQ0FBQyxDQUFDcUcsTUFBRixHQUFTMUgsSUFBSSxDQUFDQyxHQUFMLENBQVMsS0FBS2tlLFdBQWQsRUFBMEJuZSxJQUFJLENBQUMrRixHQUFMLENBQVMsS0FBS3FZLFdBQWQsRUFBMEIvYyxDQUFDLENBQUNxRyxNQUE1QixDQUExQixDQUF0SSxFQUFxTWhHLENBQUMsQ0FBQzJjLEdBQUYsSUFBTyxDQUFDaGQsQ0FBQyxDQUFDZ2QsR0FBRixHQUFNM2MsQ0FBQyxDQUFDMmMsR0FBVCxJQUFjcmMsQ0FBMU4sRUFBNE5OLENBQUMsQ0FBQzRjLEtBQUYsSUFBUyxDQUFDamQsQ0FBQyxDQUFDaWQsS0FBRixHQUFRNWMsQ0FBQyxDQUFDNGMsS0FBWCxJQUFrQnRjLENBQXZQLEVBQXlQTixDQUFDLENBQUNnRyxNQUFGLElBQVUsQ0FBQ3JHLENBQUMsQ0FBQ3FHLE1BQUYsR0FBU2hHLENBQUMsQ0FBQ2dHLE1BQVosSUFBb0IxRixDQUF2UixFQUF5UixLQUFLb0QsTUFBTCxDQUFZbkQsR0FBWixDQUFnQitGLENBQWhCLENBQXpSO0FBQTRTLFVBQUk5RyxDQUFDLEdBQUNRLENBQUMsQ0FBQ2dHLE1BQUYsR0FBUzFILElBQUksQ0FBQ3NPLEdBQUwsQ0FBU3RPLElBQUksQ0FBQ0MsR0FBTCxDQUFTLElBQVQsRUFBY3lCLENBQUMsQ0FBQzJjLEdBQWhCLENBQVQsQ0FBZjtBQUE4Q2pkLE1BQUFBLENBQUMsQ0FBQy9CLENBQUYsR0FBSTZCLENBQUMsR0FBQ2xCLElBQUksQ0FBQ3NPLEdBQUwsQ0FBUzVNLENBQUMsQ0FBQzRjLEtBQVgsQ0FBTixFQUF3QmxkLENBQUMsQ0FBQzdCLENBQUYsR0FBSW1DLENBQUMsQ0FBQ2dHLE1BQUYsR0FBUzFILElBQUksQ0FBQ3VPLEdBQUwsQ0FBUzdNLENBQUMsQ0FBQzJjLEdBQVgsQ0FBckMsRUFBcURqZCxDQUFDLENBQUNPLENBQUYsR0FBSVQsQ0FBQyxHQUFDbEIsSUFBSSxDQUFDdU8sR0FBTCxDQUFTN00sQ0FBQyxDQUFDNGMsS0FBWCxDQUEzRCxFQUE2RTNiLENBQUMsQ0FBQ3ZGLFFBQUYsQ0FBV2tELElBQVgsQ0FBZ0IsS0FBSzhFLE1BQXJCLEVBQTZCbkQsR0FBN0IsQ0FBaUNiLENBQWpDLENBQTdFLEVBQWlIdUIsQ0FBQyxDQUFDd04sTUFBRixDQUFTLEtBQUsvSyxNQUFkLENBQWpILEVBQXVJbEIsQ0FBQyxDQUFDb2EsS0FBRixJQUFTNWIsQ0FBaEosRUFBa0p3QixDQUFDLENBQUNtYSxHQUFGLElBQU8zYixDQUF6SixFQUEySnNGLENBQUMsQ0FBQzdGLFFBQUYsQ0FBV08sQ0FBWCxDQUEzSixFQUF5S3dCLENBQUMsQ0FBQ3dELE1BQUYsR0FBUyxDQUFsTDtBQUFvTCxLQUFuc0I7QUFBb3NCLFFBQUlPLENBQUMsR0FBQyxJQUFJaEosQ0FBSixFQUFOO0FBQUEsUUFBWXdOLENBQUMsR0FBQyxJQUFJeE4sQ0FBSixFQUFkO0FBQUEsUUFBb0J3SyxDQUFDLEdBQUMsSUFBSXhLLENBQUosRUFBdEI7QUFBQSxRQUE0QmdQLENBQUMsR0FBQ29LLEVBQUUsQ0FBQ0MsSUFBakM7O0FBQXNDLGFBQVN6SyxDQUFULEdBQVk7QUFBQyxhQUFPN04sSUFBSSxDQUFDdWMsR0FBTCxDQUFTLEdBQVQsRUFBYTlhLENBQWIsQ0FBUDtBQUF1Qjs7QUFBQSxTQUFLOGMsWUFBTCxHQUFrQjtBQUFDQyxNQUFBQSxLQUFLLEVBQUMsQ0FBUDtBQUFTQyxNQUFBQSxJQUFJLEVBQUMsQ0FBZDtBQUFnQmhHLE1BQUFBLEdBQUcsRUFBQztBQUFwQixLQUFsQjs7QUFBeUMsUUFBSWpNLENBQUMsR0FBQyxDQUFDOUosQ0FBRCxFQUFHRCxDQUFILEtBQU87QUFBQyxVQUFJcEIsQ0FBSixFQUFNRixDQUFOLEVBQVFsQyxDQUFSLEVBQVVtQyxDQUFWO0FBQVksVUFBSU0sQ0FBQyxHQUFDUixDQUFDLEtBQUdwRyxRQUFKLEdBQWFBLFFBQVEsQ0FBQzRqQixJQUF0QixHQUEyQnhkLENBQWpDO0FBQW1DeVgsTUFBQUEsRUFBRSxDQUFDclksSUFBSCxDQUFRcUMsQ0FBQyxDQUFDdkYsUUFBVixFQUFvQjhFLEdBQXBCLENBQXdCLEtBQUtrRCxNQUE3QjtBQUFxQyxVQUFJcEQsQ0FBQyxHQUFDMlcsRUFBRSxDQUFDclcsUUFBSCxFQUFOO0FBQW9CakIsTUFBQUEsQ0FBQyxHQUFDLElBQUVxQixDQUFGLElBQUtWLENBQUMsSUFBRWhDLElBQUksQ0FBQ3NQLEdBQUwsQ0FBUyxDQUFDM00sQ0FBQyxDQUFDd00sR0FBRixJQUFPLEVBQVIsSUFBWSxDQUFaLEdBQWNuUCxJQUFJLENBQUM2QixFQUFuQixHQUFzQixHQUEvQixDQUFSLElBQTZDSCxDQUFDLENBQUNpZCxZQUFqRCxFQUE4RHhkLENBQUMsR0FBQ3dCLENBQUMsQ0FBQ21PLE1BQWxFLEVBQXlFNkgsRUFBRSxDQUFDbFosR0FBSCxDQUFPMEIsQ0FBQyxDQUFDLENBQUQsQ0FBUixFQUFZQSxDQUFDLENBQUMsQ0FBRCxDQUFiLEVBQWlCQSxDQUFDLENBQUMsQ0FBRCxDQUFsQixDQUF6RSxFQUFnR3dYLEVBQUUsQ0FBQ3hXLFFBQUgsQ0FBWSxDQUFDZCxDQUFiLENBQWhHLEVBQWdIMkcsQ0FBQyxDQUFDL0YsR0FBRixDQUFNMFcsRUFBTixDQUFoSCxFQUEwSDFaLENBQUMsR0FBQyxJQUFFd0QsQ0FBRixHQUFJVCxDQUFKLEdBQU1OLENBQUMsQ0FBQ2lkLFlBQXBJLEVBQWlKdmQsQ0FBQyxHQUFDdUIsQ0FBQyxDQUFDbU8sTUFBckosRUFBNEo2SCxFQUFFLENBQUNsWixHQUFILENBQU8yQixDQUFDLENBQUMsQ0FBRCxDQUFSLEVBQVlBLENBQUMsQ0FBQyxDQUFELENBQWIsRUFBaUJBLENBQUMsQ0FBQyxDQUFELENBQWxCLENBQTVKLEVBQW1MdVgsRUFBRSxDQUFDeFcsUUFBSCxDQUFZbEQsQ0FBWixDQUFuTCxFQUFrTStJLENBQUMsQ0FBQy9GLEdBQUYsQ0FBTTBXLEVBQU4sQ0FBbE07QUFBNE0sS0FBbFU7O0FBQW1VLGFBQVM3SyxDQUFULENBQVc1TSxDQUFYLEVBQWE7QUFBQ2dELE1BQUFBLENBQUMsQ0FBQ3dELE1BQUYsSUFBVXhHLENBQVY7QUFBWTs7QUFBQSxhQUFTNk0sQ0FBVCxDQUFXM00sQ0FBWCxFQUFhQyxDQUFiLEVBQWU7QUFBQ3VYLE1BQUFBLEVBQUUsQ0FBQ25aLEdBQUgsQ0FBTzJCLENBQVAsRUFBU0MsQ0FBVCxHQUFZd1gsRUFBRSxDQUFDM1csR0FBSCxDQUFPMFcsRUFBUCxFQUFVM1EsQ0FBVixFQUFhOUYsUUFBYixDQUFzQlosQ0FBdEIsQ0FBWjtBQUFxQyxVQUFJSixDQUFDLEdBQUNELENBQUMsS0FBR3BHLFFBQUosR0FBYUEsUUFBUSxDQUFDNGpCLElBQXRCLEdBQTJCeGQsQ0FBakM7QUFBbUNnRCxNQUFBQSxDQUFDLENBQUNvYSxLQUFGLElBQVMsSUFBRXRlLElBQUksQ0FBQzZCLEVBQVAsR0FBVWdYLEVBQUUsQ0FBQ3haLENBQWIsR0FBZThCLENBQUMsQ0FBQ3dkLFlBQTFCLEVBQXVDemEsQ0FBQyxDQUFDbWEsR0FBRixJQUFPLElBQUVyZSxJQUFJLENBQUM2QixFQUFQLEdBQVVnWCxFQUFFLENBQUN0WixDQUFiLEdBQWU0QixDQUFDLENBQUN3ZCxZQUEvRCxFQUE0RTFXLENBQUMsQ0FBQzNILElBQUYsQ0FBT3NZLEVBQVAsQ0FBNUU7QUFBdUY7O0FBQUEsYUFBUzVLLENBQVQsQ0FBVzlNLENBQVgsRUFBYUMsQ0FBYixFQUFlO0FBQUN5WCxNQUFBQSxFQUFFLENBQUNuWixHQUFILENBQU95QixDQUFQLEVBQVNDLENBQVQsR0FBWTBYLEVBQUUsQ0FBQzNXLEdBQUgsQ0FBTzBXLEVBQVAsRUFBVW5NLENBQVYsRUFBYXRLLFFBQWIsQ0FBc0I1QyxDQUF0QixDQUFaLEVBQXFDaU4sQ0FBQyxDQUFDcU0sRUFBRSxDQUFDeFosQ0FBSixFQUFNd1osRUFBRSxDQUFDdFosQ0FBVCxDQUF0QyxFQUFrRGtOLENBQUMsQ0FBQ25NLElBQUYsQ0FBT3NZLEVBQVAsQ0FBbEQ7QUFBNkQ7O0FBQUEsUUFBSXJWLENBQUMsR0FBQ3JDLENBQUMsSUFBRTtBQUFDLFVBQUcsS0FBSzhiLE9BQVIsRUFBZ0I7QUFBQyxnQkFBTzliLENBQUMsQ0FBQzBkLE1BQVQ7QUFBaUIsZUFBSyxLQUFLTCxZQUFMLENBQWtCQyxLQUF2QjtBQUE2QixnQkFBRyxDQUFDLENBQUQsS0FBS3BlLENBQVIsRUFBVTtBQUFPNkgsWUFBQUEsQ0FBQyxDQUFDeEksR0FBRixDQUFNeUIsQ0FBQyxDQUFDMmQsT0FBUixFQUFnQjNkLENBQUMsQ0FBQzRkLE9BQWxCLEdBQTJCN1EsQ0FBQyxHQUFDb0ssRUFBRSxDQUFDRSxNQUFoQztBQUF1Qzs7QUFBTSxlQUFLLEtBQUtnRyxZQUFMLENBQWtCRSxJQUF2QjtBQUE0QixnQkFBRyxDQUFDLENBQUQsS0FBS2pkLENBQVIsRUFBVTtBQUFPaUksWUFBQUEsQ0FBQyxDQUFDaEssR0FBRixDQUFNeUIsQ0FBQyxDQUFDMmQsT0FBUixFQUFnQjNkLENBQUMsQ0FBQzRkLE9BQWxCLEdBQTJCN1EsQ0FBQyxHQUFDb0ssRUFBRSxDQUFDRyxLQUFoQztBQUFzQzs7QUFBTSxlQUFLLEtBQUsrRixZQUFMLENBQWtCOUYsR0FBdkI7QUFBMkIsZ0JBQUcsQ0FBQyxDQUFELEtBQUtwWixDQUFSLEVBQVU7QUFBT29OLFlBQUFBLENBQUMsQ0FBQ2hOLEdBQUYsQ0FBTXlCLENBQUMsQ0FBQzJkLE9BQVIsRUFBZ0IzZCxDQUFDLENBQUM0ZCxPQUFsQixHQUEyQjdRLENBQUMsR0FBQ29LLEVBQUUsQ0FBQ0ksR0FBaEM7QUFBalA7O0FBQXFSeEssUUFBQUEsQ0FBQyxLQUFHb0ssRUFBRSxDQUFDQyxJQUFQLEtBQWN2YyxNQUFNLENBQUM4RSxnQkFBUCxDQUF3QixXQUF4QixFQUFvQ3FOLENBQXBDLEVBQXNDLENBQUMsQ0FBdkMsR0FBMENuUyxNQUFNLENBQUM4RSxnQkFBUCxDQUF3QixTQUF4QixFQUFrQ21PLENBQWxDLEVBQW9DLENBQUMsQ0FBckMsQ0FBeEQ7QUFBaUc7QUFBQyxLQUFsWjtBQUFBLFFBQW1aZCxDQUFDLEdBQUNoTixDQUFDLElBQUU7QUFBQyxVQUFHLEtBQUs4YixPQUFSLEVBQWdCLFFBQU8vTyxDQUFQO0FBQVUsYUFBS29LLEVBQUUsQ0FBQ0UsTUFBUjtBQUFlLGNBQUcsQ0FBQyxDQUFELEtBQUtuWSxDQUFSLEVBQVU7QUFBTzJOLFVBQUFBLENBQUMsQ0FBQzdNLENBQUMsQ0FBQzJkLE9BQUgsRUFBVzNkLENBQUMsQ0FBQzRkLE9BQWIsQ0FBRDtBQUF1Qjs7QUFBTSxhQUFLekcsRUFBRSxDQUFDRyxLQUFSO0FBQWMsY0FBSXJYLENBQUo7QUFBTSxjQUFHLENBQUMsQ0FBRCxLQUFLSyxDQUFSLEVBQVU7QUFBT0wsVUFBQUEsQ0FBQyxHQUFDRCxDQUFGLEVBQUkwWCxFQUFFLENBQUNuWixHQUFILENBQU8wQixDQUFDLENBQUMwZCxPQUFULEVBQWlCMWQsQ0FBQyxDQUFDMmQsT0FBbkIsQ0FBSixFQUFnQ2pHLEVBQUUsQ0FBQzNXLEdBQUgsQ0FBTzBXLEVBQVAsRUFBVW5QLENBQVYsQ0FBaEMsRUFBNkNvUCxFQUFFLENBQUN0WixDQUFILEdBQUssQ0FBTCxHQUFPdU8sQ0FBQyxDQUFDRCxDQUFDLEVBQUYsQ0FBUixHQUFjZ0wsRUFBRSxDQUFDdFosQ0FBSCxHQUFLLENBQUwsSUFBUXVPLENBQUMsQ0FBQyxJQUFFRCxDQUFDLEVBQUosQ0FBcEUsRUFBNEVwRSxDQUFDLENBQUNuSixJQUFGLENBQU9zWSxFQUFQLENBQTVFO0FBQXVGOztBQUFNLGFBQUtQLEVBQUUsQ0FBQ0ksR0FBUjtBQUFZLGNBQUcsQ0FBQyxDQUFELEtBQUtwWixDQUFSLEVBQVU7QUFBTzJPLFVBQUFBLENBQUMsQ0FBQzlNLENBQUMsQ0FBQzJkLE9BQUgsRUFBVzNkLENBQUMsQ0FBQzRkLE9BQWIsQ0FBRDtBQUF0TztBQUE4UCxLQUF2cUI7QUFBQSxRQUF3cUI5UCxDQUFDLEdBQUMsTUFBSTtBQUFDLFdBQUtnTyxPQUFMLEtBQWVsaUIsUUFBUSxDQUFDa0csbUJBQVQsQ0FBNkIsV0FBN0IsRUFBeUNrTixDQUF6QyxFQUEyQyxDQUFDLENBQTVDLEdBQStDcFQsUUFBUSxDQUFDa0csbUJBQVQsQ0FBNkIsU0FBN0IsRUFBdUNnTyxDQUF2QyxFQUF5QyxDQUFDLENBQTFDLENBQS9DLEVBQTRGZixDQUFDLEdBQUNvSyxFQUFFLENBQUNDLElBQWhIO0FBQXNILEtBQXJ5QjtBQUFBLFFBQXN5QjlVLENBQUMsR0FBQ3RDLENBQUMsSUFBRTtBQUFDLFdBQUs4YixPQUFMLElBQWN4YixDQUFkLEtBQWtCeU0sQ0FBQyxLQUFHb0ssRUFBRSxDQUFDQyxJQUFQLElBQWFySyxDQUFDLEtBQUdvSyxFQUFFLENBQUNFLE1BQXRDLE1BQWdEclgsQ0FBQyxDQUFDNmQsZUFBRixJQUFvQjdkLENBQUMsQ0FBQ3JCLE1BQUYsR0FBUyxDQUFULEdBQVdpTyxDQUFDLENBQUMsSUFBRUQsQ0FBQyxFQUFKLENBQVosR0FBb0IzTSxDQUFDLENBQUNyQixNQUFGLEdBQVMsQ0FBVCxJQUFZaU8sQ0FBQyxDQUFDRCxDQUFDLEVBQUYsQ0FBckc7QUFBNEcsS0FBeDVCO0FBQUEsUUFBeTVCcEssQ0FBQyxHQUFDdkMsQ0FBQyxJQUFFO0FBQUMsVUFBRyxLQUFLOGIsT0FBUixFQUFnQixRQUFPOWIsQ0FBQyxDQUFDaEMsY0FBRixJQUFtQmdDLENBQUMsQ0FBQzhkLE9BQUYsQ0FBVTVmLE1BQXBDO0FBQTRDLGFBQUssQ0FBTDtBQUFPLGNBQUcsQ0FBQyxDQUFELEtBQUtnQixDQUFSLEVBQVU7QUFBTzZILFVBQUFBLENBQUMsQ0FBQ3hJLEdBQUYsQ0FBTXlCLENBQUMsQ0FBQzhkLE9BQUYsQ0FBVSxDQUFWLEVBQWExZixLQUFuQixFQUF5QjRCLENBQUMsQ0FBQzhkLE9BQUYsQ0FBVSxDQUFWLEVBQWF4ZixLQUF0QyxHQUE2Q3lPLENBQUMsR0FBQ29LLEVBQUUsQ0FBQ0UsTUFBbEQ7QUFBeUQ7O0FBQU0sYUFBSyxDQUFMO0FBQU8sY0FBRyxDQUFDLENBQUQsS0FBSy9XLENBQUwsSUFBUyxDQUFDLENBQUQsS0FBS25DLENBQWpCLEVBQW1CO0FBQU8sV0FBQyxVQUFTNkIsQ0FBVCxFQUFXO0FBQUMsZ0JBQUdNLENBQUgsRUFBSztBQUFDLGtCQUFJTCxDQUFDLEdBQUNELENBQUMsQ0FBQzhkLE9BQUYsQ0FBVSxDQUFWLEVBQWExZixLQUFiLEdBQW1CNEIsQ0FBQyxDQUFDOGQsT0FBRixDQUFVLENBQVYsRUFBYTFmLEtBQXRDO0FBQUEsa0JBQTRDOEIsQ0FBQyxHQUFDRixDQUFDLENBQUM4ZCxPQUFGLENBQVUsQ0FBVixFQUFheGYsS0FBYixHQUFtQjBCLENBQUMsQ0FBQzhkLE9BQUYsQ0FBVSxDQUFWLEVBQWF4ZixLQUE5RTtBQUFBLGtCQUFvRjZCLENBQUMsR0FBQ3JCLElBQUksQ0FBQ3NCLElBQUwsQ0FBVUgsQ0FBQyxHQUFDQSxDQUFGLEdBQUlDLENBQUMsR0FBQ0EsQ0FBaEIsQ0FBdEY7QUFBeUdxSSxjQUFBQSxDQUFDLENBQUNoSyxHQUFGLENBQU0sQ0FBTixFQUFRNEIsQ0FBUjtBQUFXOztBQUFBLGdCQUFHaEMsQ0FBSCxFQUFLO0FBQUMsa0JBQUlKLENBQUMsR0FBQyxNQUFJaUMsQ0FBQyxDQUFDOGQsT0FBRixDQUFVLENBQVYsRUFBYTFmLEtBQWIsR0FBbUI0QixDQUFDLENBQUM4ZCxPQUFGLENBQVUsQ0FBVixFQUFhMWYsS0FBcEMsQ0FBTjtBQUFBLGtCQUFpRG9DLENBQUMsR0FBQyxNQUFJUixDQUFDLENBQUM4ZCxPQUFGLENBQVUsQ0FBVixFQUFheGYsS0FBYixHQUFtQjBCLENBQUMsQ0FBQzhkLE9BQUYsQ0FBVSxDQUFWLEVBQWF4ZixLQUFwQyxDQUFuRDtBQUE4RmlOLGNBQUFBLENBQUMsQ0FBQ2hOLEdBQUYsQ0FBTVIsQ0FBTixFQUFReUMsQ0FBUjtBQUFXO0FBQUMsV0FBdlAsRUFBeVBSLENBQXpQLEdBQTRQK00sQ0FBQyxHQUFDb0ssRUFBRSxDQUFDSyxTQUFqUTtBQUEyUTs7QUFBTTtBQUFRekssVUFBQUEsQ0FBQyxHQUFDb0ssRUFBRSxDQUFDQyxJQUFMO0FBQTdiO0FBQXdjLEtBQXYzQztBQUFBLFFBQXczQ2pWLENBQUMsR0FBQ25DLENBQUMsSUFBRTtBQUFDLFVBQUcsS0FBSzhiLE9BQVIsRUFBZ0IsUUFBTzliLENBQUMsQ0FBQ2hDLGNBQUYsSUFBbUJnQyxDQUFDLENBQUM2ZCxlQUFGLEVBQW5CLEVBQXVDN2QsQ0FBQyxDQUFDOGQsT0FBRixDQUFVNWYsTUFBeEQ7QUFBZ0UsYUFBSyxDQUFMO0FBQU8sY0FBRyxDQUFDLENBQUQsS0FBS2dCLENBQVIsRUFBVTtBQUFPMk4sVUFBQUEsQ0FBQyxDQUFDN00sQ0FBQyxDQUFDOGQsT0FBRixDQUFVLENBQVYsRUFBYTFmLEtBQWQsRUFBb0I0QixDQUFDLENBQUM4ZCxPQUFGLENBQVUsQ0FBVixFQUFheGYsS0FBakMsQ0FBRDtBQUF5Qzs7QUFBTSxhQUFLLENBQUw7QUFBTyxjQUFHLENBQUMsQ0FBRCxLQUFLZ0MsQ0FBTCxJQUFTLENBQUMsQ0FBRCxLQUFLbkMsQ0FBakIsRUFBbUI7QUFBTyxXQUFDLFVBQVM2QixDQUFULEVBQVc7QUFBQyxnQkFBR00sQ0FBSCxFQUFLO0FBQUMsa0JBQUlMLENBQUMsR0FBQ0QsQ0FBQyxDQUFDOGQsT0FBRixDQUFVLENBQVYsRUFBYTFmLEtBQWIsR0FBbUI0QixDQUFDLENBQUM4ZCxPQUFGLENBQVUsQ0FBVixFQUFhMWYsS0FBdEM7QUFBQSxrQkFBNEM4QixDQUFDLEdBQUNGLENBQUMsQ0FBQzhkLE9BQUYsQ0FBVSxDQUFWLEVBQWF4ZixLQUFiLEdBQW1CMEIsQ0FBQyxDQUFDOGQsT0FBRixDQUFVLENBQVYsRUFBYXhmLEtBQTlFO0FBQUEsa0JBQW9GNkIsQ0FBQyxHQUFDckIsSUFBSSxDQUFDc0IsSUFBTCxDQUFVSCxDQUFDLEdBQUNBLENBQUYsR0FBSUMsQ0FBQyxHQUFDQSxDQUFoQixDQUF0RjtBQUF5R3dYLGNBQUFBLEVBQUUsQ0FBQ25aLEdBQUgsQ0FBTyxDQUFQLEVBQVM0QixDQUFULEdBQVl3WCxFQUFFLENBQUNwWixHQUFILENBQU8sQ0FBUCxFQUFTTyxJQUFJLENBQUN1YyxHQUFMLENBQVMzRCxFQUFFLENBQUNyWixDQUFILEdBQUtrSyxDQUFDLENBQUNsSyxDQUFoQixFQUFrQmtDLENBQWxCLENBQVQsQ0FBWixFQUEyQ3FNLENBQUMsQ0FBQytLLEVBQUUsQ0FBQ3RaLENBQUosQ0FBNUMsRUFBbURrSyxDQUFDLENBQUNuSixJQUFGLENBQU9zWSxFQUFQLENBQW5EO0FBQThEOztBQUFBdlosWUFBQUEsQ0FBQyxJQUFFMk8sQ0FBQyxDQUFDLE1BQUk5TSxDQUFDLENBQUM4ZCxPQUFGLENBQVUsQ0FBVixFQUFhMWYsS0FBYixHQUFtQjRCLENBQUMsQ0FBQzhkLE9BQUYsQ0FBVSxDQUFWLEVBQWExZixLQUFwQyxDQUFELEVBQTRDLE1BQUk0QixDQUFDLENBQUM4ZCxPQUFGLENBQVUsQ0FBVixFQUFheGYsS0FBYixHQUFtQjBCLENBQUMsQ0FBQzhkLE9BQUYsQ0FBVSxDQUFWLEVBQWF4ZixLQUFwQyxDQUE1QyxDQUFKO0FBQTRGLFdBQXJSLENBQXNSMEIsQ0FBdFIsQ0FBRDtBQUEwUjs7QUFBTTtBQUFRK00sVUFBQUEsQ0FBQyxHQUFDb0ssRUFBRSxDQUFDQyxJQUFMO0FBQWhkO0FBQTJkLEtBQXoyRDtBQUFBLFFBQTAyRDdQLENBQUMsR0FBQyxNQUFJO0FBQUMsV0FBS3VVLE9BQUwsS0FBZS9PLENBQUMsR0FBQ29LLEVBQUUsQ0FBQ0MsSUFBcEI7QUFBMEIsS0FBMzREO0FBQUEsUUFBNDREM1AsQ0FBQyxHQUFDekgsQ0FBQyxJQUFFO0FBQUMsV0FBSzhiLE9BQUwsSUFBYzliLENBQUMsQ0FBQ2hDLGNBQUYsRUFBZDtBQUFpQyxLQUFuN0Q7O0FBQW83RCxTQUFLMEksTUFBTCxHQUFZLFlBQVU7QUFBQzFHLE1BQUFBLENBQUMsQ0FBQ0YsbUJBQUYsQ0FBc0IsYUFBdEIsRUFBb0MySCxDQUFwQyxFQUFzQyxDQUFDLENBQXZDLEdBQTBDekgsQ0FBQyxDQUFDRixtQkFBRixDQUFzQixXQUF0QixFQUFrQ3VDLENBQWxDLEVBQW9DLENBQUMsQ0FBckMsQ0FBMUMsRUFBa0Z4SCxNQUFNLENBQUNpRixtQkFBUCxDQUEyQixPQUEzQixFQUFtQ3dDLENBQW5DLEVBQXFDLENBQUMsQ0FBdEMsQ0FBbEYsRUFBMkh0QyxDQUFDLENBQUNGLG1CQUFGLENBQXNCLFlBQXRCLEVBQW1DeUMsQ0FBbkMsRUFBcUMsQ0FBQyxDQUF0QyxDQUEzSCxFQUFvS3ZDLENBQUMsQ0FBQ0YsbUJBQUYsQ0FBc0IsVUFBdEIsRUFBaUN5SCxDQUFqQyxFQUFtQyxDQUFDLENBQXBDLENBQXBLLEVBQTJNdkgsQ0FBQyxDQUFDRixtQkFBRixDQUFzQixXQUF0QixFQUFrQ3FDLENBQWxDLEVBQW9DLENBQUMsQ0FBckMsQ0FBM00sRUFBbVB0SCxNQUFNLENBQUNpRixtQkFBUCxDQUEyQixXQUEzQixFQUF1Q2tOLENBQXZDLEVBQXlDLENBQUMsQ0FBMUMsQ0FBblAsRUFBZ1NuUyxNQUFNLENBQUNpRixtQkFBUCxDQUEyQixTQUEzQixFQUFxQ2dPLENBQXJDLEVBQXVDLENBQUMsQ0FBeEMsQ0FBaFM7QUFBMlUsS0FBbFcsRUFBbVc5TixDQUFDLENBQUNMLGdCQUFGLENBQW1CLGFBQW5CLEVBQWlDOEgsQ0FBakMsRUFBbUMsQ0FBQyxDQUFwQyxDQUFuVyxFQUEwWXpILENBQUMsQ0FBQ0wsZ0JBQUYsQ0FBbUIsV0FBbkIsRUFBK0IwQyxDQUEvQixFQUFpQyxDQUFDLENBQWxDLENBQTFZLEVBQStheEgsTUFBTSxDQUFDOEUsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBZ0MyQyxDQUFoQyxFQUFrQyxDQUFDLENBQW5DLENBQS9hLEVBQXFkdEMsQ0FBQyxDQUFDTCxnQkFBRixDQUFtQixZQUFuQixFQUFnQzRDLENBQWhDLEVBQWtDO0FBQUMzQyxNQUFBQSxPQUFPLEVBQUMsQ0FBQztBQUFWLEtBQWxDLENBQXJkLEVBQXFnQkksQ0FBQyxDQUFDTCxnQkFBRixDQUFtQixVQUFuQixFQUE4QjRILENBQTlCLEVBQWdDLENBQUMsQ0FBakMsQ0FBcmdCLEVBQXlpQnZILENBQUMsQ0FBQ0wsZ0JBQUYsQ0FBbUIsV0FBbkIsRUFBK0J3QyxDQUEvQixFQUFpQztBQUFDdkMsTUFBQUEsT0FBTyxFQUFDLENBQUM7QUFBVixLQUFqQyxDQUF6aUI7QUFBd2xCLEdBQXBqYixFQUFxamJJLENBQUMsQ0FBQytkLEtBQUYsR0FBUXhXLENBQTdqYixFQUEramJ2SCxDQUFDLENBQUNnZSxJQUFGLEdBQU8sTUFBSztBQUFDMWtCLElBQUFBLFdBQVcsQ0FBQzBHLENBQUQsRUFBRztBQUFDdkcsTUFBQUEsS0FBSyxFQUFDd0csQ0FBUDtBQUFTdkcsTUFBQUEsTUFBTSxFQUFDd0csQ0FBaEI7QUFBa0JsRyxNQUFBQSxHQUFHLEVBQUNtRyxDQUF0QjtBQUF3QndTLE1BQUFBLEtBQUssRUFBQzVVLENBQUMsR0FBQ2lDLENBQUMsQ0FBQzRTLGFBQWxDO0FBQWdEQyxNQUFBQSxLQUFLLEVBQUMvUixDQUFDLEdBQUNkLENBQUMsQ0FBQzRTLGFBQTFEO0FBQXdFbFcsTUFBQUEsU0FBUyxFQUFDOEUsQ0FBQyxHQUFDeEIsQ0FBQyxDQUFDckQsTUFBdEY7QUFBNkZDLE1BQUFBLFNBQVMsRUFBQzZFLENBQUMsR0FBQ3pCLENBQUMsQ0FBQ3JELE1BQTNHO0FBQWtIWCxNQUFBQSxRQUFRLEVBQUN1RixDQUFDLEdBQUMsSUFBSWYsQ0FBSixDQUFNUixDQUFOLEVBQVE7QUFBQzlELFFBQUFBLFFBQVEsRUFBQztBQUFDQyxVQUFBQSxJQUFJLEVBQUMsQ0FBTjtBQUFRQyxVQUFBQSxJQUFJLEVBQUMsSUFBSUMsWUFBSixDQUFpQixDQUFDLENBQUMsQ0FBRixFQUFJLENBQUMsQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFDLENBQVYsRUFBWSxDQUFDLENBQWIsRUFBZSxDQUFmLENBQWpCO0FBQWIsU0FBVjtBQUE0REMsUUFBQUEsRUFBRSxFQUFDO0FBQUNILFVBQUFBLElBQUksRUFBQyxDQUFOO0FBQVFDLFVBQUFBLElBQUksRUFBQyxJQUFJQyxZQUFKLENBQWlCLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLENBQWpCO0FBQWI7QUFBL0QsT0FBUjtBQUE3SCxRQUFxUCxFQUF4UCxFQUEyUDtBQUFDLFdBQUtwQyxFQUFMLEdBQVErRixDQUFSLEVBQVUsS0FBS2llLE9BQUwsR0FBYTtBQUFDdEwsUUFBQUEsS0FBSyxFQUFDNVUsQ0FBUDtBQUFTOFUsUUFBQUEsS0FBSyxFQUFDL1IsQ0FBZjtBQUFpQnBFLFFBQUFBLFNBQVMsRUFBQzhFLENBQTNCO0FBQTZCNUUsUUFBQUEsU0FBUyxFQUFDNkU7QUFBdkMsT0FBdkIsRUFBaUUsS0FBSzBaLE1BQUwsR0FBWSxFQUE3RSxFQUFnRixLQUFLbmYsUUFBTCxHQUFjdUYsQ0FBOUY7QUFBZ0csVUFBSUssQ0FBQyxHQUFDLEtBQUsrWixHQUFMLEdBQVM7QUFBQ3pCLFFBQUFBLElBQUksRUFBQyxJQUFOO0FBQVdDLFFBQUFBLEtBQUssRUFBQyxJQUFqQjs7QUFBc0JDLFFBQUFBLElBQUksR0FBRTtBQUFDLGNBQUlwYSxDQUFDLEdBQUM0QixDQUFDLENBQUNzWSxJQUFSO0FBQWF0WSxVQUFBQSxDQUFDLENBQUNzWSxJQUFGLEdBQU90WSxDQUFDLENBQUN1WSxLQUFULEVBQWV2WSxDQUFDLENBQUN1WSxLQUFGLEdBQVFuYSxDQUF2QjtBQUF5Qjs7QUFBbkUsT0FBZjtBQUFvRixXQUFLOUUsTUFBTCxDQUFZO0FBQUN6QixRQUFBQSxLQUFLLEVBQUN3RyxDQUFQO0FBQVN2RyxRQUFBQSxNQUFNLEVBQUN3RyxDQUFoQjtBQUFrQmxHLFFBQUFBLEdBQUcsRUFBQ21HO0FBQXRCLE9BQVo7QUFBc0M7O0FBQUF5YixJQUFBQSxPQUFPLENBQUM7QUFBQ3RlLE1BQUFBLE1BQU0sRUFBQ1MsQ0FBQyxHQUFDLCtLQUFWO0FBQTBMUixNQUFBQSxRQUFRLEVBQUNpRCxDQUFDLEdBQUMsZ0tBQXJNO0FBQXNXOUUsTUFBQUEsUUFBUSxFQUFDc0UsQ0FBQyxHQUFDLEVBQWpYO0FBQW9YNmIsTUFBQUEsY0FBYyxFQUFDNWIsQ0FBQyxHQUFDLE1BQXJZO0FBQTRZNmIsTUFBQUEsT0FBTyxFQUFDaGIsQ0FBQyxHQUFDLENBQUM7QUFBdlosUUFBMFosRUFBM1osRUFBOFo7QUFBQ2QsTUFBQUEsQ0FBQyxDQUFDQyxDQUFELENBQUQsR0FBSztBQUFDckUsUUFBQUEsS0FBSyxFQUFDLEtBQUsrZixHQUFMLENBQVN6QixJQUFULENBQWMxZDtBQUFyQixPQUFMO0FBQW1DLFVBQUkwRCxDQUFDLEdBQUMsSUFBSXNCLENBQUosQ0FBTSxLQUFLdkgsRUFBWCxFQUFjO0FBQUNxRCxRQUFBQSxNQUFNLEVBQUNTLENBQVI7QUFBVVIsUUFBQUEsUUFBUSxFQUFDaUQsQ0FBbkI7QUFBcUI5RSxRQUFBQSxRQUFRLEVBQUNzRTtBQUE5QixPQUFkLENBQU47QUFBQSxVQUFzREcsQ0FBQyxHQUFDO0FBQUMzRSxRQUFBQSxJQUFJLEVBQUMsSUFBSTZHLENBQUosQ0FBTSxLQUFLcEksRUFBWCxFQUFjO0FBQUMrQixVQUFBQSxRQUFRLEVBQUMsS0FBS0EsUUFBZjtBQUF3QlAsVUFBQUEsT0FBTyxFQUFDeUU7QUFBaEMsU0FBZCxDQUFOO0FBQXdEekUsUUFBQUEsT0FBTyxFQUFDeUUsQ0FBaEU7QUFBa0V4RSxRQUFBQSxRQUFRLEVBQUNzRSxDQUEzRTtBQUE2RThiLFFBQUFBLE9BQU8sRUFBQ2hiLENBQXJGO0FBQXVGK2EsUUFBQUEsY0FBYyxFQUFDNWI7QUFBdEcsT0FBeEQ7QUFBaUssYUFBTyxLQUFLa2IsTUFBTCxDQUFZM1AsSUFBWixDQUFpQnJMLENBQWpCLEdBQW9CQSxDQUEzQjtBQUE2Qjs7QUFBQWpGLElBQUFBLE1BQU0sQ0FBQztBQUFDekIsTUFBQUEsS0FBSyxFQUFDdUcsQ0FBUDtBQUFTdEcsTUFBQUEsTUFBTSxFQUFDd0csQ0FBaEI7QUFBa0JsRyxNQUFBQSxHQUFHLEVBQUNpRztBQUF0QixRQUF5QixFQUExQixFQUE2QjtBQUFDQSxNQUFBQSxDQUFDLEtBQUcsS0FBS2pHLEdBQUwsR0FBU2lHLENBQVosQ0FBRCxFQUFnQkQsQ0FBQyxLQUFHLEtBQUt2RyxLQUFMLEdBQVd1RyxDQUFYLEVBQWEsS0FBS3RHLE1BQUwsR0FBWXdHLENBQUMsSUFBRUYsQ0FBL0IsQ0FBakIsRUFBbURDLENBQUMsR0FBQyxLQUFLakcsR0FBTCxJQUFVLEtBQUtDLEVBQUwsQ0FBUUgsUUFBUixDQUFpQkUsR0FBaEYsRUFBb0ZnRyxDQUFDLEdBQUMsQ0FBQyxLQUFLdkcsS0FBTCxJQUFZLEtBQUtRLEVBQUwsQ0FBUUgsUUFBUixDQUFpQkwsS0FBOUIsSUFBcUN3RyxDQUEzSCxFQUE2SEMsQ0FBQyxHQUFDLENBQUMsS0FBS3hHLE1BQUwsSUFBYSxLQUFLTyxFQUFMLENBQVFILFFBQVIsQ0FBaUJKLE1BQS9CLElBQXVDdUcsQ0FBdEssRUFBd0ssS0FBS2dlLE9BQUwsQ0FBYXhrQixLQUFiLEdBQW1CdUcsQ0FBM0wsRUFBNkwsS0FBS2llLE9BQUwsQ0FBYXZrQixNQUFiLEdBQW9Cd0csQ0FBak4sRUFBbU4sS0FBS3liLEdBQUwsQ0FBU3pCLElBQVQsR0FBYyxJQUFJM1gsQ0FBSixDQUFNLEtBQUt0SSxFQUFYLEVBQWMsS0FBS2drQixPQUFuQixDQUFqTyxFQUE2UCxLQUFLdEMsR0FBTCxDQUFTeEIsS0FBVCxHQUFlLElBQUk1WCxDQUFKLENBQU0sS0FBS3RJLEVBQVgsRUFBYyxLQUFLZ2tCLE9BQW5CLENBQTVRO0FBQXdTOztBQUFBMWUsSUFBQUEsTUFBTSxDQUFDO0FBQUNDLE1BQUFBLEtBQUssRUFBQ1MsQ0FBUDtBQUFTOFIsTUFBQUEsTUFBTSxFQUFDN1IsQ0FBaEI7QUFBa0JnRSxNQUFBQSxNQUFNLEVBQUMvRCxDQUFDLEdBQUMsSUFBM0I7QUFBZ0NsQixNQUFBQSxNQUFNLEVBQUNsQixDQUFDLEdBQUMsQ0FBQyxDQUExQztBQUE0Q21nQixNQUFBQSxJQUFJLEVBQUMxZCxDQUFDLEdBQUMsQ0FBQyxDQUFwRDtBQUFzRDJkLE1BQUFBLFdBQVcsRUFBQ3JkLENBQUMsR0FBQyxDQUFDO0FBQXJFLEtBQUQsRUFBeUU7QUFBQyxVQUFJZCxDQUFDLEdBQUMsS0FBS21iLE1BQUwsQ0FBWVksTUFBWixDQUFtQi9iLENBQUMsSUFBRUEsQ0FBQyxDQUFDOGIsT0FBeEIsQ0FBTjtBQUF1QyxXQUFLN2hCLEVBQUwsQ0FBUUgsUUFBUixDQUFpQnlGLE1BQWpCLENBQXdCO0FBQUNDLFFBQUFBLEtBQUssRUFBQ1MsQ0FBUDtBQUFTOFIsUUFBQUEsTUFBTSxFQUFDN1IsQ0FBaEI7QUFBa0JnRSxRQUFBQSxNQUFNLEVBQUNsRSxDQUFDLENBQUM5QixNQUFGLEdBQVMsS0FBS3lkLEdBQUwsQ0FBU3hCLEtBQWxCLEdBQXdCaGEsQ0FBakQ7QUFBbURsQixRQUFBQSxNQUFNLEVBQUNsQixDQUExRDtBQUE0RG1nQixRQUFBQSxJQUFJLEVBQUMxZCxDQUFqRTtBQUFtRTJkLFFBQUFBLFdBQVcsRUFBQ3JkO0FBQS9FLE9BQXhCLEdBQTJHLEtBQUs2YSxHQUFMLENBQVN2QixJQUFULEVBQTNHLEVBQTJIcGEsQ0FBQyxDQUFDaEYsT0FBRixDQUFVLENBQUNpRixDQUFELEVBQUdDLENBQUgsS0FBTztBQUFDRCxRQUFBQSxDQUFDLENBQUN6RSxJQUFGLENBQU9DLE9BQVAsQ0FBZUMsUUFBZixDQUF3QnVFLENBQUMsQ0FBQzRiLGNBQTFCLEVBQTBDamdCLEtBQTFDLEdBQWdELEtBQUsrZixHQUFMLENBQVN6QixJQUFULENBQWMxZCxPQUE5RCxFQUFzRSxLQUFLdkMsRUFBTCxDQUFRSCxRQUFSLENBQWlCeUYsTUFBakIsQ0FBd0I7QUFBQ0MsVUFBQUEsS0FBSyxFQUFDUyxDQUFDLENBQUN6RSxJQUFUO0FBQWMwSSxVQUFBQSxNQUFNLEVBQUNoRSxDQUFDLEtBQUdGLENBQUMsQ0FBQzlCLE1BQUYsR0FBUyxDQUFiLEdBQWVpQyxDQUFmLEdBQWlCLEtBQUt3YixHQUFMLENBQVN4QixLQUEvQztBQUFxRGMsVUFBQUEsS0FBSyxFQUFDLENBQUM7QUFBNUQsU0FBeEIsQ0FBdEUsRUFBOEosS0FBS1UsR0FBTCxDQUFTdkIsSUFBVCxFQUE5SjtBQUE4SyxPQUFoTSxDQUEzSDtBQUE2VDs7QUFBejJELEdBQTNrYixFQUFzN2VwYSxDQUFDLENBQUMzQyxPQUFGLEdBQVVtRSxDQUFoOGUsRUFBazhleEIsQ0FBQyxDQUFDb2UsSUFBRixHQUFPamUsQ0FBejhlLEVBQTI4ZUgsQ0FBQyxDQUFDcWUsT0FBRixHQUFVLE1BQUs7QUFBQy9rQixJQUFBQSxXQUFXLENBQUMwRyxDQUFELEVBQUc7QUFBQyxXQUFLL0YsRUFBTCxHQUFRK0YsQ0FBUixFQUFVLEtBQUtzZSxNQUFMLEdBQVksSUFBSXJlLENBQUosRUFBdEIsRUFBNEIsS0FBS3NlLFNBQUwsR0FBZSxJQUFJdGUsQ0FBSixFQUEzQztBQUFpRDs7QUFBQXVlLElBQUFBLFNBQVMsQ0FBQ3hlLENBQUQsRUFBR0MsQ0FBQyxHQUFDLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBTCxFQUFXO0FBQUNELE1BQUFBLENBQUMsQ0FBQzZQLFdBQUYsQ0FBY2YsY0FBZCxDQUE2QixLQUFLd1AsTUFBbEMsR0FBMEMsS0FBS0MsU0FBTCxDQUFlaGdCLEdBQWYsQ0FBbUIwQixDQUFDLENBQUMsQ0FBRCxDQUFwQixFQUF3QkEsQ0FBQyxDQUFDLENBQUQsQ0FBekIsRUFBNkIsRUFBN0IsQ0FBMUMsRUFBMkVELENBQUMsQ0FBQ3FaLFNBQUYsQ0FBWSxLQUFLa0YsU0FBakIsQ0FBM0UsRUFBdUcsS0FBS0EsU0FBTCxDQUFldmQsR0FBZixDQUFtQixLQUFLc2QsTUFBeEIsRUFBZ0N4YyxTQUFoQyxFQUF2RztBQUFtSjs7QUFBQTJjLElBQUFBLGVBQWUsQ0FBQ3plLENBQUQsRUFBRztBQUFDYSxNQUFBQSxLQUFLLENBQUM2ZCxPQUFOLENBQWMxZSxDQUFkLE1BQW1CQSxDQUFDLEdBQUMsQ0FBQ0EsQ0FBRCxDQUFyQjtBQUEwQixVQUFJRyxDQUFDLEdBQUM0WCxFQUFOO0FBQUEsVUFBU2hhLENBQUMsR0FBQzZaLEVBQVg7QUFBQSxVQUFjcFgsQ0FBQyxHQUFDcVgsRUFBaEI7QUFBQSxVQUFtQjNYLENBQUMsR0FBQyxFQUFyQjtBQUF3QixhQUFPRixDQUFDLENBQUNoRixPQUFGLENBQVVnRixDQUFDLElBQUU7QUFBQ0EsUUFBQUEsQ0FBQyxDQUFDaEUsUUFBRixDQUFXc0ssTUFBWCxJQUFtQnRHLENBQUMsQ0FBQ2hFLFFBQUYsQ0FBV3FLLGtCQUFYLEVBQW5CLEVBQW1ELGFBQVdyRyxDQUFDLENBQUNoRSxRQUFGLENBQVcyaUIsT0FBdEIsSUFBK0IzZSxDQUFDLENBQUNoRSxRQUFGLENBQVdzSyxNQUFYLEtBQW9CLElBQUUsQ0FBckQsSUFBd0R0RyxDQUFDLENBQUNoRSxRQUFGLENBQVd5SyxxQkFBWCxFQUEzRyxFQUE4SXRHLENBQUMsQ0FBQ2dCLE9BQUYsQ0FBVW5CLENBQUMsQ0FBQzZQLFdBQVosQ0FBOUksRUFBdUs5UixDQUFDLENBQUNxQixJQUFGLENBQU8sS0FBS2tmLE1BQVosRUFBb0JyYyxZQUFwQixDQUFpQzlCLENBQWpDLENBQXZLLEVBQTJNSyxDQUFDLENBQUNwQixJQUFGLENBQU8sS0FBS21mLFNBQVosRUFBdUIxYixrQkFBdkIsQ0FBMEMxQyxDQUExQyxDQUEzTTtBQUF3UCxZQUFJVyxDQUFDLEdBQUMsQ0FBTjtBQUFRLFNBQUNBLENBQUMsR0FBQyxhQUFXZCxDQUFDLENBQUNoRSxRQUFGLENBQVcyaUIsT0FBdEIsR0FBOEIsS0FBS0MsZUFBTCxDQUFxQjVlLENBQUMsQ0FBQ2hFLFFBQUYsQ0FBV3NLLE1BQWhDLEVBQXVDdkksQ0FBdkMsRUFBeUN5QyxDQUF6QyxDQUE5QixHQUEwRSxLQUFLcWUsWUFBTCxDQUFrQjdlLENBQUMsQ0FBQ2hFLFFBQUYsQ0FBV3NLLE1BQTdCLEVBQW9DdkksQ0FBcEMsRUFBc0N5QyxDQUF0QyxDQUE3RSxNQUF5SFIsQ0FBQyxDQUFDOGUsR0FBRixLQUFROWUsQ0FBQyxDQUFDOGUsR0FBRixHQUFNO0FBQUNDLFVBQUFBLFVBQVUsRUFBQyxJQUFJOWUsQ0FBSjtBQUFaLFNBQWQsR0FBa0NELENBQUMsQ0FBQzhlLEdBQUYsQ0FBTTFkLFFBQU4sR0FBZU4sQ0FBakQsRUFBbURkLENBQUMsQ0FBQzhlLEdBQUYsQ0FBTUMsVUFBTixDQUFpQjNmLElBQWpCLENBQXNCb0IsQ0FBdEIsRUFBeUJTLFFBQXpCLENBQWtDSCxDQUFsQyxFQUFxQ0MsR0FBckMsQ0FBeUNoRCxDQUF6QyxDQUFuRCxFQUErRm1DLENBQUMsQ0FBQ3NMLElBQUYsQ0FBT3hMLENBQVAsQ0FBeE47QUFBbU8sT0FBamYsR0FBbWZFLENBQUMsQ0FBQ2dlLElBQUYsQ0FBTyxDQUFDbGUsQ0FBRCxFQUFHQyxDQUFILEtBQU9ELENBQUMsQ0FBQzhlLEdBQUYsQ0FBTTFkLFFBQU4sR0FBZW5CLENBQUMsQ0FBQzZlLEdBQUYsQ0FBTTFkLFFBQW5DLENBQW5mLEVBQWdpQmxCLENBQXZpQjtBQUF5aUI7O0FBQUEwZSxJQUFBQSxlQUFlLENBQUMxZSxDQUFELEVBQUd1QixDQUFDLEdBQUMsS0FBSzZjLE1BQVYsRUFBaUIvYyxDQUFDLEdBQUMsS0FBS2dkLFNBQXhCLEVBQWtDO0FBQUMsVUFBSXZlLENBQUMsR0FBQzhYLEVBQU47QUFBUzlYLE1BQUFBLENBQUMsQ0FBQ2dCLEdBQUYsQ0FBTWQsQ0FBQyxDQUFDcUcsTUFBUixFQUFlOUUsQ0FBZjtBQUFrQixVQUFJeEIsQ0FBQyxHQUFDRCxDQUFDLENBQUMrQixHQUFGLENBQU1SLENBQU4sQ0FBTjtBQUFBLFVBQWV4RCxDQUFDLEdBQUNpQyxDQUFDLENBQUMrQixHQUFGLENBQU0vQixDQUFOLElBQVNDLENBQUMsR0FBQ0EsQ0FBNUI7QUFBQSxVQUE4Qk8sQ0FBQyxHQUFDTixDQUFDLENBQUNzRyxNQUFGLEdBQVN0RyxDQUFDLENBQUNzRyxNQUEzQztBQUFrRCxVQUFHekksQ0FBQyxHQUFDeUMsQ0FBTCxFQUFPLE9BQU8sQ0FBUDtBQUFTLFVBQUlNLENBQUMsR0FBQ2hDLElBQUksQ0FBQ3NCLElBQUwsQ0FBVUksQ0FBQyxHQUFDekMsQ0FBWixDQUFOO0FBQUEsVUFBcUJvQyxDQUFDLEdBQUNGLENBQUMsR0FBQ2EsQ0FBekI7QUFBQSxVQUEyQlUsQ0FBQyxHQUFDdkIsQ0FBQyxHQUFDYSxDQUEvQjtBQUFpQyxhQUFPWCxDQUFDLEdBQUMsQ0FBRixJQUFLcUIsQ0FBQyxHQUFDLENBQVAsR0FBUyxDQUFULEdBQVdyQixDQUFDLEdBQUMsQ0FBRixHQUFJcUIsQ0FBSixHQUFNckIsQ0FBeEI7QUFBMEI7O0FBQUEwZSxJQUFBQSxZQUFZLENBQUN4YyxDQUFELEVBQUduQyxDQUFDLEdBQUMsS0FBS29lLE1BQVYsRUFBaUIxYyxDQUFDLEdBQUMsS0FBSzJjLFNBQXhCLEVBQWtDO0FBQUMsVUFBSXZlLENBQUo7QUFBQSxVQUFNQyxDQUFOO0FBQUEsVUFBUU8sQ0FBUjtBQUFBLFVBQVU0QixDQUFWO0FBQUEsVUFBWXRCLENBQVo7QUFBQSxVQUFjMEIsQ0FBZDtBQUFBLFVBQWdCaEIsQ0FBQyxHQUFDLElBQUVJLENBQUMsQ0FBQ3pELENBQXRCO0FBQUEsVUFBd0JzRCxDQUFDLEdBQUMsSUFBRUcsQ0FBQyxDQUFDdkQsQ0FBOUI7QUFBQSxVQUFnQ2tELENBQUMsR0FBQyxJQUFFSyxDQUFDLENBQUNuQixDQUF0QztBQUFBLFVBQXdDTixDQUFDLEdBQUNrQyxDQUFDLENBQUN3QyxHQUE1QztBQUFBLFVBQWdEOUcsQ0FBQyxHQUFDc0UsQ0FBQyxDQUFDdEQsR0FBcEQ7QUFBd0QsYUFBT2lCLENBQUMsR0FBQyxDQUFDLENBQUN3QixDQUFDLElBQUUsQ0FBSCxHQUFLckIsQ0FBQyxDQUFDaEMsQ0FBUCxHQUFTSixDQUFDLENBQUNJLENBQVosSUFBZStCLENBQUMsQ0FBQy9CLENBQWxCLElBQXFCcUQsQ0FBdkIsRUFBeUJ2QixDQUFDLEdBQUMsQ0FBQyxDQUFDdUIsQ0FBQyxJQUFFLENBQUgsR0FBS3pELENBQUMsQ0FBQ0ksQ0FBUCxHQUFTZ0MsQ0FBQyxDQUFDaEMsQ0FBWixJQUFlK0IsQ0FBQyxDQUFDL0IsQ0FBbEIsSUFBcUJxRCxDQUFoRCxFQUFrRGhCLENBQUMsR0FBQyxDQUFDLENBQUNpQixDQUFDLElBQUUsQ0FBSCxHQUFLdEIsQ0FBQyxDQUFDOUIsQ0FBUCxHQUFTTixDQUFDLENBQUNNLENBQVosSUFBZTZCLENBQUMsQ0FBQzdCLENBQWxCLElBQXFCb0QsQ0FBekUsRUFBMkV6QixDQUFDLElBQUVvQyxDQUFDLEdBQUMsQ0FBQyxDQUFDWCxDQUFDLElBQUUsQ0FBSCxHQUFLMUQsQ0FBQyxDQUFDTSxDQUFQLEdBQVM4QixDQUFDLENBQUM5QixDQUFaLElBQWU2QixDQUFDLENBQUM3QixDQUFsQixJQUFxQm9ELENBQXpCLENBQUQsSUFBOEJqQixDQUFDLEdBQUNQLENBQWhDLEdBQWtDLENBQWxDLElBQXFDTyxDQUFDLEdBQUNSLENBQUYsS0FBTUEsQ0FBQyxHQUFDUSxDQUFSLEdBQVc0QixDQUFDLEdBQUNuQyxDQUFGLEtBQU1BLENBQUMsR0FBQ21DLENBQVIsQ0FBWCxFQUFzQnRCLENBQUMsR0FBQyxDQUFDLENBQUNTLENBQUMsSUFBRSxDQUFILEdBQUtwQixDQUFDLENBQUNNLENBQVAsR0FBUzFDLENBQUMsQ0FBQzBDLENBQVosSUFBZVAsQ0FBQyxDQUFDTyxDQUFsQixJQUFxQmMsQ0FBN0MsRUFBK0N2QixDQUFDLElBQUV3QyxDQUFDLEdBQUMsQ0FBQyxDQUFDakIsQ0FBQyxJQUFFLENBQUgsR0FBS3hELENBQUMsQ0FBQzBDLENBQVAsR0FBU04sQ0FBQyxDQUFDTSxDQUFaLElBQWVQLENBQUMsQ0FBQ08sQ0FBbEIsSUFBcUJjLENBQXpCLENBQUQsSUFBOEJULENBQUMsR0FBQ2IsQ0FBaEMsR0FBa0MsQ0FBbEMsSUFBcUNhLENBQUMsR0FBQ2QsQ0FBRixLQUFNQSxDQUFDLEdBQUNjLENBQVIsR0FBVzBCLENBQUMsR0FBQ3ZDLENBQUYsS0FBTUEsQ0FBQyxHQUFDdUMsQ0FBUixDQUFYLEVBQXNCdkMsQ0FBQyxHQUFDLENBQUYsR0FBSSxDQUFKLEdBQU1ELENBQUMsSUFBRSxDQUFILEdBQUtBLENBQUwsR0FBT0MsQ0FBeEUsQ0FBcEYsQ0FBbEY7QUFBa1A7O0FBQTEzQyxHQUExOWUsRUFBczFoQkQsQ0FBQyxDQUFDZ2YsWUFBRixHQUFlemMsQ0FBcjJoQixFQUF1MmhCdkMsQ0FBQyxDQUFDakcsUUFBRixHQUFXLE1BQUs7QUFBQ1QsSUFBQUEsV0FBVyxDQUFDO0FBQUNLLE1BQUFBLE1BQU0sRUFBQ3FHLENBQUMsR0FBQ3BHLFFBQVEsQ0FBQ3FsQixhQUFULENBQXVCLFFBQXZCLENBQVY7QUFBMkN4bEIsTUFBQUEsS0FBSyxFQUFDcUgsQ0FBQyxHQUFDLEdBQW5EO0FBQXVEcEgsTUFBQUEsTUFBTSxFQUFDOEgsQ0FBQyxHQUFDLEdBQWhFO0FBQW9FeEgsTUFBQUEsR0FBRyxFQUFDeUgsQ0FBQyxHQUFDLENBQTFFO0FBQTRFakgsTUFBQUEsS0FBSyxFQUFDMEYsQ0FBQyxHQUFDLENBQUMsQ0FBckY7QUFBdUYwVSxNQUFBQSxLQUFLLEVBQUN6VSxDQUFDLEdBQUMsQ0FBQyxDQUFoRztBQUFrRzBVLE1BQUFBLE9BQU8sRUFBQzlXLENBQUMsR0FBQyxDQUFDLENBQTdHO0FBQStHbWhCLE1BQUFBLFNBQVMsRUFBQzNkLENBQUMsR0FBQyxDQUFDLENBQTVIO0FBQThIc0csTUFBQUEsa0JBQWtCLEVBQUNySCxDQUFDLEdBQUMsQ0FBQyxDQUFwSjtBQUFzSjJlLE1BQUFBLHFCQUFxQixFQUFDdmQsQ0FBQyxHQUFDLENBQUMsQ0FBL0s7QUFBaUx3ZCxNQUFBQSxlQUFlLEVBQUNoZCxDQUFDLEdBQUMsU0FBbk07QUFBNk1pZCxNQUFBQSxTQUFTLEVBQUM3YyxDQUFDLEdBQUMsQ0FBQyxDQUExTjtBQUE0TjhjLE1BQUFBLEtBQUssRUFBQ2pkLENBQUMsR0FBQztBQUFwTyxRQUF1TyxFQUF4TyxFQUEyTztBQUFDLFVBQUlwQyxDQUFDLEdBQUM7QUFBQ3pGLFFBQUFBLEtBQUssRUFBQzBGLENBQVA7QUFBUzBVLFFBQUFBLEtBQUssRUFBQ3pVLENBQWY7QUFBaUIwVSxRQUFBQSxPQUFPLEVBQUM5VyxDQUF6QjtBQUEyQm1oQixRQUFBQSxTQUFTLEVBQUMzZCxDQUFyQztBQUF1Q3NHLFFBQUFBLGtCQUFrQixFQUFDckgsQ0FBMUQ7QUFBNEQyZSxRQUFBQSxxQkFBcUIsRUFBQ3ZkLENBQWxGO0FBQW9Gd2QsUUFBQUEsZUFBZSxFQUFDaGQ7QUFBcEcsT0FBTjtBQUE2RyxXQUFLcEksR0FBTCxHQUFTeUgsQ0FBVCxFQUFXLEtBQUtqSCxLQUFMLEdBQVcwRixDQUF0QixFQUF3QixLQUFLeVUsS0FBTCxHQUFXLENBQUMsQ0FBcEMsRUFBc0MsS0FBS0MsS0FBTCxHQUFXelUsQ0FBakQsRUFBbUQsS0FBSzBVLE9BQUwsR0FBYTlXLENBQWhFLEVBQWtFLEtBQUs4SixrQkFBTCxHQUF3QnJILENBQTFGLEVBQTRGLEtBQUs2ZSxTQUFMLEdBQWU3YyxDQUEzRyxFQUE2RyxNQUFJSCxDQUFKLEtBQVEsS0FBS3BJLEVBQUwsR0FBUStGLENBQUMsQ0FBQ3VmLFVBQUYsQ0FBYSxRQUFiLEVBQXNCdGYsQ0FBdEIsQ0FBaEIsQ0FBN0csRUFBdUosS0FBS21VLFFBQUwsR0FBYyxDQUFDLENBQUMsS0FBS25hLEVBQTVLLEVBQStLLEtBQUtBLEVBQUwsS0FBVSxLQUFLQSxFQUFMLEdBQVErRixDQUFDLENBQUN1ZixVQUFGLENBQWEsT0FBYixFQUFxQnRmLENBQXJCLEtBQXlCRCxDQUFDLENBQUN1ZixVQUFGLENBQWEsb0JBQWIsRUFBa0N0ZixDQUFsQyxDQUEzQyxDQUEvSyxFQUFnUSxLQUFLaEcsRUFBTCxDQUFRSCxRQUFSLEdBQWlCLElBQWpSLEVBQXNSLEtBQUtnQyxPQUFMLENBQWFnRixDQUFiLEVBQWVVLENBQWYsQ0FBdFIsRUFBd1MsS0FBS2dlLFVBQUwsR0FBZ0IsRUFBeFQsRUFBMlQsS0FBS0EsVUFBTCxDQUFnQkMsZUFBaEIsR0FBZ0MsS0FBS3hsQixFQUFMLENBQVF5bEIsWUFBUixDQUFxQixLQUFLemxCLEVBQUwsQ0FBUTBsQixnQ0FBN0IsQ0FBM1YsRUFBMFosS0FBS2hjLEtBQUwsR0FBVyxFQUFyYSxFQUF3YSxLQUFLQSxLQUFMLENBQVdnRSxTQUFYLEdBQXFCO0FBQUN6SyxRQUFBQSxHQUFHLEVBQUMsS0FBS2pELEVBQUwsQ0FBUThOLEdBQWI7QUFBaUJtQyxRQUFBQSxHQUFHLEVBQUMsS0FBS2pRLEVBQUwsQ0FBUTJsQjtBQUE3QixPQUE3YixFQUFnZSxLQUFLamMsS0FBTCxDQUFXaUUsYUFBWCxHQUF5QjtBQUFDMEMsUUFBQUEsT0FBTyxFQUFDLEtBQUtyUSxFQUFMLENBQVE0bEI7QUFBakIsT0FBemYsRUFBb2hCLEtBQUtsYyxLQUFMLENBQVdzRCxRQUFYLEdBQW9CLElBQXhpQixFQUE2aUIsS0FBS3RELEtBQUwsQ0FBV3dELFNBQVgsR0FBcUIsS0FBS2xOLEVBQUwsQ0FBUW1OLEdBQTFrQixFQUE4a0IsS0FBS3pELEtBQUwsQ0FBV21jLFNBQVgsR0FBcUIsQ0FBQyxDQUFwbUIsRUFBc21CLEtBQUtuYyxLQUFMLENBQVc2RCxTQUFYLEdBQXFCLEtBQUt2TixFQUFMLENBQVF5TixJQUFub0IsRUFBd29CLEtBQUsvRCxLQUFMLENBQVdxUCxnQkFBWCxHQUE0QixDQUFDLENBQXJxQixFQUF1cUIsS0FBS3JQLEtBQUwsQ0FBV3VQLEtBQVgsR0FBaUIsQ0FBQyxDQUF6ckIsRUFBMnJCLEtBQUt2UCxLQUFMLENBQVdzUCxlQUFYLEdBQTJCLENBQXR0QixFQUF3dEIsS0FBS3RQLEtBQUwsQ0FBV29jLFdBQVgsR0FBdUIsSUFBL3VCLEVBQW92QixLQUFLcGMsS0FBTCxDQUFXcWMsUUFBWCxHQUFvQjtBQUFDdm1CLFFBQUFBLEtBQUssRUFBQyxJQUFQO0FBQVlDLFFBQUFBLE1BQU0sRUFBQztBQUFuQixPQUF4d0IsRUFBaXlCLEtBQUtpSyxLQUFMLENBQVc0UCxZQUFYLEdBQXdCLEVBQXp6QixFQUE0ekIsS0FBSzVQLEtBQUwsQ0FBVzZQLGlCQUFYLEdBQTZCLENBQXoxQixFQUEyMUIsS0FBSzdQLEtBQUwsQ0FBV29CLFdBQVgsR0FBdUIsSUFBbDNCLEVBQXUzQixLQUFLcEIsS0FBTCxDQUFXcUYsZ0JBQVgsR0FBNEIsSUFBSUMsR0FBSixFQUFuNUIsRUFBMjVCLEtBQUtvUixVQUFMLEdBQWdCLEVBQTM2QixFQUE4NkIsS0FBS2pHLFFBQUwsSUFBZSxLQUFLZ0IsWUFBTCxDQUFrQix3QkFBbEIsR0FBNEMsS0FBS0EsWUFBTCxDQUFrQiwwQkFBbEIsQ0FBM0QsS0FBMkcsS0FBS0EsWUFBTCxDQUFrQixtQkFBbEIsR0FBdUMsS0FBS0EsWUFBTCxDQUFrQiwwQkFBbEIsQ0FBdkMsRUFBcUYsS0FBS0EsWUFBTCxDQUFrQix3QkFBbEIsQ0FBckYsRUFBaUksS0FBS0EsWUFBTCxDQUFrQiwrQkFBbEIsQ0FBakksRUFBb0wsS0FBS0EsWUFBTCxDQUFrQix3QkFBbEIsQ0FBcEwsRUFBZ08sS0FBS0EsWUFBTCxDQUFrQiwwQkFBbEIsQ0FBaE8sRUFBOFEsS0FBS0EsWUFBTCxDQUFrQixVQUFsQixDQUE5USxFQUE0UyxLQUFLQSxZQUFMLENBQWtCLHFCQUFsQixDQUF2WixDQUE5NkIsRUFBKzJDLEtBQUt2UCxtQkFBTCxHQUF5QixLQUFLdVAsWUFBTCxDQUFrQix3QkFBbEIsRUFBMkMscUJBQTNDLEVBQWlFLDBCQUFqRSxDQUF4NEMsRUFBcStDLEtBQUtsUCxtQkFBTCxHQUF5QixLQUFLa1AsWUFBTCxDQUFrQix3QkFBbEIsRUFBMkMscUJBQTNDLEVBQWlFLDBCQUFqRSxDQUE5L0MsRUFBMmxELEtBQUtuUCxxQkFBTCxHQUEyQixLQUFLbVAsWUFBTCxDQUFrQix3QkFBbEIsRUFBMkMsdUJBQTNDLEVBQW1FLDRCQUFuRSxDQUF0bkQsRUFBdXRELEtBQUs1UCxpQkFBTCxHQUF1QixLQUFLNFAsWUFBTCxDQUFrQix5QkFBbEIsRUFBNEMsbUJBQTVDLEVBQWdFLHNCQUFoRSxDQUE5dUQsRUFBczBELEtBQUs1UixlQUFMLEdBQXFCLEtBQUs0UixZQUFMLENBQWtCLHlCQUFsQixFQUE0QyxpQkFBNUMsRUFBOEQsb0JBQTlELENBQTMxRCxFQUErNkQsS0FBS3hPLGlCQUFMLEdBQXVCLEtBQUt3TyxZQUFMLENBQWtCLHlCQUFsQixFQUE0QyxtQkFBNUMsRUFBZ0Usc0JBQWhFLENBQXQ4RDtBQUE4aEU7O0FBQUF0WixJQUFBQSxPQUFPLENBQUNrRSxDQUFELEVBQUdDLENBQUgsRUFBSztBQUFDLFdBQUt4RyxLQUFMLEdBQVd1RyxDQUFYLEVBQWEsS0FBS3RHLE1BQUwsR0FBWXVHLENBQXpCLEVBQTJCLEtBQUtoRyxFQUFMLENBQVFOLE1BQVIsQ0FBZUYsS0FBZixHQUFxQnVHLENBQUMsR0FBQyxLQUFLaEcsR0FBdkQsRUFBMkQsS0FBS0MsRUFBTCxDQUFRTixNQUFSLENBQWVELE1BQWYsR0FBc0J1RyxDQUFDLEdBQUMsS0FBS2pHLEdBQXhGLEVBQTRGMFgsTUFBTSxDQUFDQyxNQUFQLENBQWMsS0FBSzFYLEVBQUwsQ0FBUU4sTUFBUixDQUFlc21CLEtBQTdCLEVBQW1DO0FBQUN4bUIsUUFBQUEsS0FBSyxFQUFDdUcsQ0FBQyxHQUFDLElBQVQ7QUFBY3RHLFFBQUFBLE1BQU0sRUFBQ3VHLENBQUMsR0FBQztBQUF2QixPQUFuQyxDQUE1RjtBQUE2Sjs7QUFBQWlnQixJQUFBQSxXQUFXLENBQUNsZ0IsQ0FBRCxFQUFHQyxDQUFILEVBQUs7QUFBQyxXQUFLMEQsS0FBTCxDQUFXcWMsUUFBWCxDQUFvQnZtQixLQUFwQixLQUE0QnVHLENBQTVCLElBQStCLEtBQUsyRCxLQUFMLENBQVdxYyxRQUFYLENBQW9CdG1CLE1BQXBCLEtBQTZCdUcsQ0FBNUQsS0FBZ0UsS0FBSzBELEtBQUwsQ0FBV3FjLFFBQVgsQ0FBb0J2bUIsS0FBcEIsR0FBMEJ1RyxDQUExQixFQUE0QixLQUFLMkQsS0FBTCxDQUFXcWMsUUFBWCxDQUFvQnRtQixNQUFwQixHQUEyQnVHLENBQXZELEVBQXlELEtBQUtoRyxFQUFMLENBQVErbEIsUUFBUixDQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQmhnQixDQUFyQixFQUF1QkMsQ0FBdkIsQ0FBekg7QUFBb0o7O0FBQUF3SyxJQUFBQSxNQUFNLENBQUN6SyxDQUFELEVBQUc7QUFBQyxPQUFDLENBQUQsS0FBSyxLQUFLMkQsS0FBTCxDQUFXM0QsQ0FBWCxDQUFMLEtBQXFCLEtBQUsvRixFQUFMLENBQVF3USxNQUFSLENBQWV6SyxDQUFmLEdBQWtCLEtBQUsyRCxLQUFMLENBQVczRCxDQUFYLElBQWMsQ0FBQyxDQUF0RDtBQUF5RDs7QUFBQTJLLElBQUFBLE9BQU8sQ0FBQzNLLENBQUQsRUFBRztBQUFDLE9BQUMsQ0FBRCxLQUFLLEtBQUsyRCxLQUFMLENBQVczRCxDQUFYLENBQUwsS0FBcUIsS0FBSy9GLEVBQUwsQ0FBUTBRLE9BQVIsQ0FBZ0IzSyxDQUFoQixHQUFtQixLQUFLMkQsS0FBTCxDQUFXM0QsQ0FBWCxJQUFjLENBQUMsQ0FBdkQ7QUFBMEQ7O0FBQUE4SCxJQUFBQSxZQUFZLENBQUM5SCxDQUFELEVBQUdDLENBQUgsRUFBS0MsQ0FBTCxFQUFPQyxDQUFQLEVBQVM7QUFBQyxXQUFLd0QsS0FBTCxDQUFXZ0UsU0FBWCxDQUFxQnpLLEdBQXJCLEtBQTJCOEMsQ0FBM0IsSUFBOEIsS0FBSzJELEtBQUwsQ0FBV2dFLFNBQVgsQ0FBcUJ1QyxHQUFyQixLQUEyQmpLLENBQXpELElBQTRELEtBQUswRCxLQUFMLENBQVdnRSxTQUFYLENBQXFCd0MsUUFBckIsS0FBZ0NqSyxDQUE1RixJQUErRixLQUFLeUQsS0FBTCxDQUFXZ0UsU0FBWCxDQUFxQnlDLFFBQXJCLEtBQWdDakssQ0FBL0gsS0FBbUksS0FBS3dELEtBQUwsQ0FBV2dFLFNBQVgsQ0FBcUJ6SyxHQUFyQixHQUF5QjhDLENBQXpCLEVBQTJCLEtBQUsyRCxLQUFMLENBQVdnRSxTQUFYLENBQXFCdUMsR0FBckIsR0FBeUJqSyxDQUFwRCxFQUFzRCxLQUFLMEQsS0FBTCxDQUFXZ0UsU0FBWCxDQUFxQndDLFFBQXJCLEdBQThCakssQ0FBcEYsRUFBc0YsS0FBS3lELEtBQUwsQ0FBV2dFLFNBQVgsQ0FBcUJ5QyxRQUFyQixHQUE4QmpLLENBQXBILEVBQXNILEtBQUssQ0FBTCxLQUFTRCxDQUFULEdBQVcsS0FBS2pHLEVBQUwsQ0FBUWttQixpQkFBUixDQUEwQm5nQixDQUExQixFQUE0QkMsQ0FBNUIsRUFBOEJDLENBQTlCLEVBQWdDQyxDQUFoQyxDQUFYLEdBQThDLEtBQUtsRyxFQUFMLENBQVEwTixTQUFSLENBQWtCM0gsQ0FBbEIsRUFBb0JDLENBQXBCLENBQXZTO0FBQStUOztBQUFBb0ssSUFBQUEsZ0JBQWdCLENBQUNySyxDQUFELEVBQUdDLENBQUgsRUFBSztBQUFDLFdBQUswRCxLQUFMLENBQVdpRSxhQUFYLENBQXlCMEMsT0FBekIsS0FBbUN0SyxDQUFuQyxJQUFzQyxLQUFLMkQsS0FBTCxDQUFXaUUsYUFBWCxDQUF5QjJDLFNBQXpCLEtBQXFDdEssQ0FBM0UsS0FBK0UsS0FBSzBELEtBQUwsQ0FBV2lFLGFBQVgsQ0FBeUIwQyxPQUF6QixHQUFpQ3RLLENBQWpDLEVBQW1DLEtBQUsyRCxLQUFMLENBQVdpRSxhQUFYLENBQXlCMkMsU0FBekIsR0FBbUN0SyxDQUF0RSxFQUF3RSxLQUFLLENBQUwsS0FBU0EsQ0FBVCxHQUFXLEtBQUtoRyxFQUFMLENBQVFtbUIscUJBQVIsQ0FBOEJwZ0IsQ0FBOUIsRUFBZ0NDLENBQWhDLENBQVgsR0FBOEMsS0FBS2hHLEVBQUwsQ0FBUTJOLGFBQVIsQ0FBc0I1SCxDQUF0QixDQUFyTTtBQUErTjs7QUFBQThLLElBQUFBLFdBQVcsQ0FBQzlLLENBQUQsRUFBRztBQUFDLFdBQUsyRCxLQUFMLENBQVdzRCxRQUFYLEtBQXNCakgsQ0FBdEIsS0FBMEIsS0FBSzJELEtBQUwsQ0FBV3NELFFBQVgsR0FBb0JqSCxDQUFwQixFQUFzQixLQUFLL0YsRUFBTCxDQUFRZ04sUUFBUixDQUFpQmpILENBQWpCLENBQWhEO0FBQXFFOztBQUFBK0ssSUFBQUEsWUFBWSxDQUFDL0ssQ0FBRCxFQUFHO0FBQUMsV0FBSzJELEtBQUwsQ0FBV3dELFNBQVgsS0FBdUJuSCxDQUF2QixLQUEyQixLQUFLMkQsS0FBTCxDQUFXd0QsU0FBWCxHQUFxQm5ILENBQXJCLEVBQXVCLEtBQUsvRixFQUFMLENBQVFrTixTQUFSLENBQWtCbkgsQ0FBbEIsQ0FBbEQ7QUFBd0U7O0FBQUFnTCxJQUFBQSxZQUFZLENBQUNoTCxDQUFELEVBQUc7QUFBQyxXQUFLMkQsS0FBTCxDQUFXbWMsU0FBWCxLQUF1QjlmLENBQXZCLEtBQTJCLEtBQUsyRCxLQUFMLENBQVdtYyxTQUFYLEdBQXFCOWYsQ0FBckIsRUFBdUIsS0FBSy9GLEVBQUwsQ0FBUTZsQixTQUFSLENBQWtCOWYsQ0FBbEIsQ0FBbEQ7QUFBd0U7O0FBQUFpTCxJQUFBQSxZQUFZLENBQUNqTCxDQUFELEVBQUc7QUFBQyxXQUFLMkQsS0FBTCxDQUFXNkQsU0FBWCxLQUF1QnhILENBQXZCLEtBQTJCLEtBQUsyRCxLQUFMLENBQVc2RCxTQUFYLEdBQXFCeEgsQ0FBckIsRUFBdUIsS0FBSy9GLEVBQUwsQ0FBUXVOLFNBQVIsQ0FBa0J4SCxDQUFsQixDQUFsRDtBQUF3RTs7QUFBQTBULElBQUFBLGFBQWEsQ0FBQzFULENBQUQsRUFBRztBQUFDLFdBQUsyRCxLQUFMLENBQVc2UCxpQkFBWCxLQUErQnhULENBQS9CLEtBQW1DLEtBQUsyRCxLQUFMLENBQVc2UCxpQkFBWCxHQUE2QnhULENBQTdCLEVBQStCLEtBQUsvRixFQUFMLENBQVF5WixhQUFSLENBQXNCLEtBQUt6WixFQUFMLENBQVFvbUIsUUFBUixHQUFpQnJnQixDQUF2QyxDQUFsRTtBQUE2Rzs7QUFBQWdWLElBQUFBLGVBQWUsQ0FBQztBQUFDOVEsTUFBQUEsTUFBTSxFQUFDakUsQ0FBQyxHQUFDLEtBQUtoRyxFQUFMLENBQVF5YSxXQUFsQjtBQUE4QnJRLE1BQUFBLE1BQU0sRUFBQ3JFLENBQUMsR0FBQztBQUF2QyxRQUE2QyxFQUE5QyxFQUFpRDtBQUFDLFdBQUsyRCxLQUFMLENBQVdvYyxXQUFYLEtBQXlCL2YsQ0FBekIsS0FBNkIsS0FBSzJELEtBQUwsQ0FBV29jLFdBQVgsR0FBdUIvZixDQUF2QixFQUF5QixLQUFLL0YsRUFBTCxDQUFRK2EsZUFBUixDQUF3Qi9VLENBQXhCLEVBQTBCRCxDQUExQixDQUF0RDtBQUFvRjs7QUFBQW9WLElBQUFBLFlBQVksQ0FBQ3BWLENBQUQsRUFBR0MsQ0FBSCxFQUFLQyxDQUFMLEVBQU87QUFBQyxhQUFPRCxDQUFDLElBQUUsS0FBS2hHLEVBQUwsQ0FBUWdHLENBQVIsQ0FBSCxHQUFjLEtBQUtoRyxFQUFMLENBQVFnRyxDQUFSLEVBQVcxRyxJQUFYLENBQWdCLEtBQUtVLEVBQXJCLENBQWQsSUFBd0MsS0FBS29nQixVQUFMLENBQWdCcmEsQ0FBaEIsTUFBcUIsS0FBS3FhLFVBQUwsQ0FBZ0JyYSxDQUFoQixJQUFtQixLQUFLL0YsRUFBTCxDQUFRbWIsWUFBUixDQUFxQnBWLENBQXJCLENBQXhDLEdBQWlFQyxDQUFDLEdBQUMsS0FBS29hLFVBQUwsQ0FBZ0JyYSxDQUFoQixFQUFtQkUsQ0FBbkIsRUFBc0IzRyxJQUF0QixDQUEyQixLQUFLOGdCLFVBQUwsQ0FBZ0JyYSxDQUFoQixDQUEzQixDQUFELEdBQWdELEtBQUtxYSxVQUFMLENBQWdCcmEsQ0FBaEIsQ0FBMUosQ0FBUDtBQUFxTDs7QUFBQXNnQixJQUFBQSxVQUFVLENBQUN0Z0IsQ0FBRCxFQUFHQyxDQUFILEVBQUs7QUFBQyxhQUFPRCxDQUFDLENBQUNzUixXQUFGLEtBQWdCclIsQ0FBQyxDQUFDcVIsV0FBbEIsR0FBOEJ0UixDQUFDLENBQUNzUixXQUFGLEdBQWNyUixDQUFDLENBQUNxUixXQUE5QyxHQUEwRHRSLENBQUMsQ0FBQ3ZFLE9BQUYsQ0FBVXlILEVBQVYsS0FBZWpELENBQUMsQ0FBQ3hFLE9BQUYsQ0FBVXlILEVBQXpCLEdBQTRCbEQsQ0FBQyxDQUFDdkUsT0FBRixDQUFVeUgsRUFBVixHQUFhakQsQ0FBQyxDQUFDeEUsT0FBRixDQUFVeUgsRUFBbkQsR0FBc0RsRCxDQUFDLENBQUN1Z0IsTUFBRixLQUFXdGdCLENBQUMsQ0FBQ3NnQixNQUFiLEdBQW9CdmdCLENBQUMsQ0FBQ3VnQixNQUFGLEdBQVN0Z0IsQ0FBQyxDQUFDc2dCLE1BQS9CLEdBQXNDdGdCLENBQUMsQ0FBQ2lELEVBQUYsR0FBS2xELENBQUMsQ0FBQ2tELEVBQXBLO0FBQXVLOztBQUFBc2QsSUFBQUEsZUFBZSxDQUFDeGdCLENBQUQsRUFBR0MsQ0FBSCxFQUFLO0FBQUMsYUFBT0QsQ0FBQyxDQUFDc1IsV0FBRixLQUFnQnJSLENBQUMsQ0FBQ3FSLFdBQWxCLEdBQThCdFIsQ0FBQyxDQUFDc1IsV0FBRixHQUFjclIsQ0FBQyxDQUFDcVIsV0FBOUMsR0FBMER0UixDQUFDLENBQUN1Z0IsTUFBRixLQUFXdGdCLENBQUMsQ0FBQ3NnQixNQUFiLEdBQW9CdGdCLENBQUMsQ0FBQ3NnQixNQUFGLEdBQVN2Z0IsQ0FBQyxDQUFDdWdCLE1BQS9CLEdBQXNDdGdCLENBQUMsQ0FBQ2lELEVBQUYsR0FBS2xELENBQUMsQ0FBQ2tELEVBQTlHO0FBQWlIOztBQUFBdWQsSUFBQUEsTUFBTSxDQUFDemdCLENBQUQsRUFBR0MsQ0FBSCxFQUFLO0FBQUMsYUFBT0QsQ0FBQyxDQUFDc1IsV0FBRixLQUFnQnJSLENBQUMsQ0FBQ3FSLFdBQWxCLEdBQThCdFIsQ0FBQyxDQUFDc1IsV0FBRixHQUFjclIsQ0FBQyxDQUFDcVIsV0FBOUMsR0FBMER0UixDQUFDLENBQUN2RSxPQUFGLENBQVV5SCxFQUFWLEtBQWVqRCxDQUFDLENBQUN4RSxPQUFGLENBQVV5SCxFQUF6QixHQUE0QmxELENBQUMsQ0FBQ3ZFLE9BQUYsQ0FBVXlILEVBQVYsR0FBYWpELENBQUMsQ0FBQ3hFLE9BQUYsQ0FBVXlILEVBQW5ELEdBQXNEakQsQ0FBQyxDQUFDaUQsRUFBRixHQUFLbEQsQ0FBQyxDQUFDa0QsRUFBOUg7QUFBaUk7O0FBQUF3ZCxJQUFBQSxhQUFhLENBQUM7QUFBQ2xoQixNQUFBQSxLQUFLLEVBQUNnQixDQUFQO0FBQVN1UixNQUFBQSxNQUFNLEVBQUM5UixDQUFoQjtBQUFrQmtlLE1BQUFBLFdBQVcsRUFBQ3JkLENBQTlCO0FBQWdDb2QsTUFBQUEsSUFBSSxFQUFDMWM7QUFBckMsS0FBRCxFQUF5QztBQUFDLFVBQUl4QixDQUFDLEdBQUMsRUFBTjs7QUFBUyxVQUFHQyxDQUFDLElBQUVhLENBQUgsSUFBTWIsQ0FBQyxDQUFDcVosYUFBRixFQUFOLEVBQXdCOVksQ0FBQyxDQUFDa1EsUUFBRixDQUFXeFEsQ0FBQyxJQUFFO0FBQUMsWUFBRyxDQUFDQSxDQUFDLENBQUN5UCxPQUFOLEVBQWMsT0FBTSxDQUFDLENBQVA7QUFBU3pQLFFBQUFBLENBQUMsQ0FBQzRGLElBQUYsS0FBU2hGLENBQUMsSUFBRVosQ0FBQyxDQUFDbVIsYUFBTCxJQUFvQnBSLENBQXBCLElBQXVCLENBQUNBLENBQUMsQ0FBQ3daLHFCQUFGLENBQXdCdlosQ0FBeEIsQ0FBeEIsSUFBb0RGLENBQUMsQ0FBQ3dMLElBQUYsQ0FBT3RMLENBQVAsQ0FBN0Q7QUFBd0UsT0FBOUcsQ0FBeEIsRUFBd0lzQixDQUEzSSxFQUE2STtBQUFDLFlBQUl0QixDQUFDLEdBQUMsRUFBTjtBQUFBLFlBQVNDLENBQUMsR0FBQyxFQUFYO0FBQUEsWUFBY3BDLENBQUMsR0FBQyxFQUFoQjtBQUFtQmlDLFFBQUFBLENBQUMsQ0FBQ2hGLE9BQUYsQ0FBVWdGLENBQUMsSUFBRTtBQUFDQSxVQUFBQSxDQUFDLENBQUN2RSxPQUFGLENBQVV1TCxXQUFWLEdBQXNCaEgsQ0FBQyxDQUFDdkUsT0FBRixDQUFVNEwsU0FBVixHQUFvQmxILENBQUMsQ0FBQ3FMLElBQUYsQ0FBT3hMLENBQVAsQ0FBcEIsR0FBOEJqQyxDQUFDLENBQUN5TixJQUFGLENBQU94TCxDQUFQLENBQXBELEdBQThERSxDQUFDLENBQUNzTCxJQUFGLENBQU94TCxDQUFQLENBQTlELEVBQXdFQSxDQUFDLENBQUN1Z0IsTUFBRixHQUFTLENBQWpGLEVBQW1GLE1BQUl2Z0IsQ0FBQyxDQUFDc1IsV0FBTixJQUFtQnRSLENBQUMsQ0FBQ3ZFLE9BQUYsQ0FBVTRMLFNBQTdCLElBQXdDcEgsQ0FBeEMsS0FBNENELENBQUMsQ0FBQzZQLFdBQUYsQ0FBY2YsY0FBZCxDQUE2QmxDLENBQTdCLEdBQWdDQSxDQUFDLENBQUMzSyxZQUFGLENBQWVoQyxDQUFDLENBQUNnWixvQkFBakIsQ0FBaEMsRUFBdUVqWixDQUFDLENBQUN1Z0IsTUFBRixHQUFTM1QsQ0FBQyxDQUFDbk0sQ0FBOUgsQ0FBbkY7QUFBb04sU0FBbE8sR0FBb09QLENBQUMsQ0FBQ2dlLElBQUYsQ0FBTyxLQUFLb0MsVUFBWixDQUFwTyxFQUE0UG5nQixDQUFDLENBQUMrZCxJQUFGLENBQU8sS0FBS3NDLGVBQVosQ0FBNVAsRUFBeVJ6aUIsQ0FBQyxDQUFDbWdCLElBQUYsQ0FBTyxLQUFLdUMsTUFBWixDQUF6UixFQUE2U3pnQixDQUFDLEdBQUNFLENBQUMsQ0FBQ3lnQixNQUFGLENBQVN4Z0IsQ0FBVCxFQUFXcEMsQ0FBWCxDQUEvUztBQUE2VDs7QUFBQSxhQUFPaUMsQ0FBUDtBQUFTOztBQUFBVCxJQUFBQSxNQUFNLENBQUM7QUFBQ0MsTUFBQUEsS0FBSyxFQUFDVSxDQUFQO0FBQVM2UixNQUFBQSxNQUFNLEVBQUM5UixDQUFoQjtBQUFrQmlFLE1BQUFBLE1BQU0sRUFBQ2xFLENBQUMsR0FBQyxJQUEzQjtBQUFnQ2YsTUFBQUEsTUFBTSxFQUFDbEIsQ0FBQyxHQUFDLENBQUMsQ0FBMUM7QUFBNENtZ0IsTUFBQUEsSUFBSSxFQUFDMWQsQ0FBQyxHQUFDLENBQUMsQ0FBcEQ7QUFBc0QyZCxNQUFBQSxXQUFXLEVBQUNyZCxDQUFDLEdBQUMsQ0FBQyxDQUFyRTtBQUF1RW1hLE1BQUFBLEtBQUssRUFBQzlhO0FBQTdFLEtBQUQsRUFBaUY7QUFBQyxlQUFPSCxDQUFQLElBQVUsS0FBS2dWLGVBQUwsSUFBdUIsS0FBS2tMLFdBQUwsQ0FBaUIsS0FBS3ptQixLQUFMLEdBQVcsS0FBS08sR0FBakMsRUFBcUMsS0FBS04sTUFBTCxHQUFZLEtBQUtNLEdBQXRELENBQWpDLEtBQThGLEtBQUtnYixlQUFMLENBQXFCaFYsQ0FBckIsR0FBd0IsS0FBS2tnQixXQUFMLENBQWlCbGdCLENBQUMsQ0FBQ3ZHLEtBQW5CLEVBQXlCdUcsQ0FBQyxDQUFDdEcsTUFBM0IsQ0FBdEgsR0FBMEosQ0FBQ3lHLENBQUMsSUFBRSxLQUFLa2YsU0FBTCxJQUFpQixDQUFDLENBQUQsS0FBS2xmLENBQTFCLE1BQStCLENBQUMsS0FBS3lVLEtBQU4sSUFBYTVVLENBQUMsSUFBRUEsQ0FBQyxDQUFDNFUsS0FBbEIsS0FBMEIsS0FBS25LLE1BQUwsQ0FBWSxLQUFLeFEsRUFBTCxDQUFReVEsVUFBcEIsR0FBZ0MsS0FBS00sWUFBTCxDQUFrQixDQUFDLENBQW5CLENBQTFELEdBQWlGLEtBQUsvUSxFQUFMLENBQVFnaEIsS0FBUixDQUFjLENBQUMsS0FBS3RHLEtBQUwsR0FBVyxLQUFLMWEsRUFBTCxDQUFRMm1CLGdCQUFuQixHQUFvQyxDQUFyQyxLQUF5QyxLQUFLaE0sS0FBTCxHQUFXLEtBQUszYSxFQUFMLENBQVE0bUIsZ0JBQW5CLEdBQW9DLENBQTdFLEtBQWlGLEtBQUtoTSxPQUFMLEdBQWEsS0FBSzVhLEVBQUwsQ0FBUTZtQixrQkFBckIsR0FBd0MsQ0FBekgsQ0FBZCxDQUFoSCxDQUExSixFQUFzWi9pQixDQUFDLElBQUVtQyxDQUFDLENBQUNxUSxpQkFBRixFQUF6WixFQUErYXRRLENBQUMsSUFBRSxTQUFPQSxDQUFDLENBQUN3UCxNQUFaLElBQW9CeFAsQ0FBQyxDQUFDc1EsaUJBQUYsRUFBbmMsRUFBeWQsS0FBS21RLGFBQUwsQ0FBbUI7QUFBQ2xoQixRQUFBQSxLQUFLLEVBQUNVLENBQVA7QUFBUzZSLFFBQUFBLE1BQU0sRUFBQzlSLENBQWhCO0FBQWtCa2UsUUFBQUEsV0FBVyxFQUFDcmQsQ0FBOUI7QUFBZ0NvZCxRQUFBQSxJQUFJLEVBQUMxZDtBQUFyQyxPQUFuQixFQUE0RHhGLE9BQTVELENBQW9FZ0YsQ0FBQyxJQUFFO0FBQUNBLFFBQUFBLENBQUMsQ0FBQzhGLElBQUYsQ0FBTztBQUFDaU0sVUFBQUEsTUFBTSxFQUFDOVI7QUFBUixTQUFQO0FBQW1CLE9BQTNGLENBQXpkO0FBQXNqQjs7QUFBMzFMLEdBQXYzaEIsRUFBb3R0QkQsQ0FBQyxDQUFDK2dCLElBQUYsR0FBTyxjQUFjMWUsQ0FBZCxDQUFlO0FBQUMvSSxJQUFBQSxXQUFXLENBQUMwRyxDQUFELEVBQUc7QUFBQ2doQixNQUFBQSxHQUFHLEVBQUMvZ0IsQ0FBTDtBQUFPakUsTUFBQUEsUUFBUSxFQUFDa0UsQ0FBaEI7QUFBa0J6RSxNQUFBQSxPQUFPLEVBQUMwRSxDQUExQjtBQUE0QjRGLE1BQUFBLElBQUksRUFBQ2hJLENBQUMsR0FBQ2lDLENBQUMsQ0FBQ2dHO0FBQXJDLFFBQWdELEVBQW5ELEVBQXNEO0FBQUMsWUFBTWhHLENBQU4sRUFBUTtBQUFDaEUsUUFBQUEsUUFBUSxFQUFDa0UsQ0FBVjtBQUFZekUsUUFBQUEsT0FBTyxFQUFDMEUsQ0FBcEI7QUFBc0I0RixRQUFBQSxJQUFJLEVBQUNoSTtBQUEzQixPQUFSLEdBQXVDLEtBQUtrakIsV0FBTCxDQUFpQmhoQixDQUFqQixDQUF2QyxFQUEyRCxLQUFLaWhCLGlCQUFMLEVBQTNELEVBQW9GLEtBQUtDLFVBQUwsR0FBZ0IsRUFBcEcsRUFBdUd6UCxNQUFNLENBQUNDLE1BQVAsQ0FBYyxLQUFLbFcsT0FBTCxDQUFhQyxRQUEzQixFQUFvQztBQUFDMGxCLFFBQUFBLFdBQVcsRUFBQztBQUFDeGxCLFVBQUFBLEtBQUssRUFBQyxLQUFLd2xCO0FBQVosU0FBYjtBQUFzQ0MsUUFBQUEsZUFBZSxFQUFDO0FBQUN6bEIsVUFBQUEsS0FBSyxFQUFDLEtBQUt5bEI7QUFBWjtBQUF0RCxPQUFwQyxDQUF2RztBQUFnTzs7QUFBQUosSUFBQUEsV0FBVyxDQUFDamhCLENBQUQsRUFBRztBQUFDLFVBQUcsS0FBS3NoQixJQUFMLEdBQVUsSUFBSXhnQixDQUFKLEVBQVYsRUFBZ0IsS0FBS3lnQixLQUFMLEdBQVcsRUFBM0IsRUFBOEJ2aEIsQ0FBQyxDQUFDdWhCLEtBQUYsSUFBU3ZoQixDQUFDLENBQUN1aEIsS0FBRixDQUFRcmpCLE1BQWxELEVBQXlEO0FBQUMsYUFBSSxJQUFJK0IsQ0FBQyxHQUFDLENBQVYsRUFBWUEsQ0FBQyxHQUFDRCxDQUFDLENBQUN1aEIsS0FBRixDQUFRcmpCLE1BQXRCLEVBQTZCK0IsQ0FBQyxFQUE5QixFQUFpQztBQUFDLGNBQUlFLENBQUMsR0FBQyxJQUFJVyxDQUFKLEVBQU47QUFBWVgsVUFBQUEsQ0FBQyxDQUFDakUsUUFBRixDQUFXeUcsU0FBWCxDQUFxQjNDLENBQUMsQ0FBQ3doQixRQUFGLENBQVd0bEIsUUFBaEMsRUFBeUMsSUFBRStELENBQTNDLEdBQThDRSxDQUFDLENBQUM0UCxVQUFGLENBQWFwTixTQUFiLENBQXVCM0MsQ0FBQyxDQUFDd2hCLFFBQUYsQ0FBV3pSLFVBQWxDLEVBQTZDLElBQUU5UCxDQUEvQyxDQUE5QyxFQUFnR0UsQ0FBQyxDQUFDMEIsS0FBRixDQUFRYyxTQUFSLENBQWtCM0MsQ0FBQyxDQUFDd2hCLFFBQUYsQ0FBVzNmLEtBQTdCLEVBQW1DLElBQUU1QixDQUFyQyxDQUFoRyxFQUF3SSxLQUFLc2hCLEtBQUwsQ0FBVy9WLElBQVgsQ0FBZ0JyTCxDQUFoQixDQUF4STtBQUEySjs7QUFBQUgsUUFBQUEsQ0FBQyxDQUFDdWhCLEtBQUYsQ0FBUXZtQixPQUFSLENBQWdCLENBQUNnRixDQUFELEVBQUdDLENBQUgsS0FBTztBQUFDLGNBQUcsS0FBS3NoQixLQUFMLENBQVd0aEIsQ0FBWCxFQUFjb0osSUFBZCxHQUFtQnJKLENBQUMsQ0FBQ3FKLElBQXJCLEVBQTBCLENBQUMsQ0FBRCxLQUFLckosQ0FBQyxDQUFDeVAsTUFBcEMsRUFBMkMsT0FBTyxLQUFLOFIsS0FBTCxDQUFXdGhCLENBQVgsRUFBY2lRLFNBQWQsQ0FBd0IsS0FBS29SLElBQTdCLENBQVA7QUFBMEMsZUFBS0MsS0FBTCxDQUFXdGhCLENBQVgsRUFBY2lRLFNBQWQsQ0FBd0IsS0FBS3FSLEtBQUwsQ0FBV3ZoQixDQUFDLENBQUN5UCxNQUFiLENBQXhCO0FBQThDLFNBQTNKLEdBQTZKLEtBQUs2UixJQUFMLENBQVUvUSxpQkFBVixDQUE0QixDQUFDLENBQTdCLENBQTdKLEVBQTZMLEtBQUtnUixLQUFMLENBQVd2bUIsT0FBWCxDQUFtQmdGLENBQUMsSUFBRTtBQUFDQSxVQUFBQSxDQUFDLENBQUN5aEIsV0FBRixHQUFjLElBQUl2aEIsQ0FBSixDQUFNLEdBQUdGLENBQUMsQ0FBQzZQLFdBQVgsRUFBd0IxTyxPQUF4QixFQUFkO0FBQWdELFNBQXZFLENBQTdMO0FBQXNRO0FBQUM7O0FBQUErZixJQUFBQSxpQkFBaUIsR0FBRTtBQUFDLFVBQUcsQ0FBQyxLQUFLSyxLQUFMLENBQVdyakIsTUFBZixFQUFzQjtBQUFPLFVBQUk4QixDQUFDLEdBQUNsQixJQUFJLENBQUNDLEdBQUwsQ0FBUyxDQUFULEVBQVdELElBQUksQ0FBQ3VjLEdBQUwsQ0FBUyxDQUFULEVBQVd2YyxJQUFJLENBQUN3YyxJQUFMLENBQVV4YyxJQUFJLENBQUN5YyxHQUFMLENBQVN6YyxJQUFJLENBQUNzQixJQUFMLENBQVUsSUFBRSxLQUFLbWhCLEtBQUwsQ0FBV3JqQixNQUF2QixDQUFULElBQXlDWSxJQUFJLENBQUMwYyxHQUF4RCxDQUFYLENBQVgsQ0FBTjtBQUEyRixXQUFLa0csWUFBTCxHQUFrQixJQUFJcmxCLFlBQUosQ0FBaUIyRCxDQUFDLEdBQUNBLENBQUYsR0FBSSxDQUFyQixDQUFsQixFQUEwQyxLQUFLcWhCLGVBQUwsR0FBcUJyaEIsQ0FBL0QsRUFBaUUsS0FBS29oQixXQUFMLEdBQWlCLElBQUk5ZSxDQUFKLENBQU0sS0FBS3JJLEVBQVgsRUFBYztBQUFDK0MsUUFBQUEsS0FBSyxFQUFDLEtBQUswa0IsWUFBWjtBQUF5QjVPLFFBQUFBLGVBQWUsRUFBQyxDQUFDLENBQTFDO0FBQTRDalAsUUFBQUEsSUFBSSxFQUFDLEtBQUs1SixFQUFMLENBQVE2SixLQUF6RDtBQUErRDRPLFFBQUFBLGNBQWMsRUFBQyxLQUFLelksRUFBTCxDQUFRSCxRQUFSLENBQWlCc2EsUUFBakIsR0FBMEIsS0FBS25hLEVBQUwsQ0FBUXdnQixPQUFsQyxHQUEwQyxLQUFLeGdCLEVBQUwsQ0FBUXdZLElBQWhJO0FBQXFJUyxRQUFBQSxLQUFLLEVBQUMsQ0FBQyxDQUE1STtBQUE4SXpaLFFBQUFBLEtBQUssRUFBQ3VHO0FBQXBKLE9BQWQsQ0FBbEY7QUFBd1A7O0FBQUEyaEIsSUFBQUEsWUFBWSxDQUFDMWhCLENBQUQsRUFBRztBQUFDLFVBQUlELENBQUMsR0FBQyxJQUFJeUgsQ0FBSixDQUFNO0FBQUM2USxRQUFBQSxPQUFPLEVBQUMsS0FBS2lKLEtBQWQ7QUFBb0JubEIsUUFBQUEsSUFBSSxFQUFDNkQ7QUFBekIsT0FBTixDQUFOO0FBQXlDLGFBQU8sS0FBS2toQixVQUFMLENBQWdCM1YsSUFBaEIsQ0FBcUJ4TCxDQUFyQixHQUF3QkEsQ0FBL0I7QUFBaUM7O0FBQUFmLElBQUFBLE1BQU0sR0FBRTtBQUFDLFVBQUllLENBQUMsR0FBQyxDQUFOO0FBQVEsV0FBS21oQixVQUFMLENBQWdCbm1CLE9BQWhCLENBQXdCaUYsQ0FBQyxJQUFFRCxDQUFDLElBQUVDLENBQUMsQ0FBQ3VZLE1BQWhDLEdBQXdDLEtBQUsySSxVQUFMLENBQWdCbm1CLE9BQWhCLENBQXdCLENBQUNpRixDQUFELEVBQUdDLENBQUgsS0FBTztBQUFDRCxRQUFBQSxDQUFDLENBQUNoQixNQUFGLENBQVNlLENBQVQsRUFBVyxNQUFJRSxDQUFmO0FBQWtCLE9BQWxELENBQXhDO0FBQTRGOztBQUFBNEYsSUFBQUEsSUFBSSxDQUFDO0FBQUNpTSxNQUFBQSxNQUFNLEVBQUMvUjtBQUFSLFFBQVcsRUFBWixFQUFlO0FBQUMsV0FBS3NoQixJQUFMLENBQVUvUSxpQkFBVixDQUE0QixDQUFDLENBQTdCLEdBQWdDLEtBQUtnUixLQUFMLENBQVd2bUIsT0FBWCxDQUFtQixDQUFDZ0YsQ0FBRCxFQUFHQyxDQUFILEtBQU87QUFBQzJZLFFBQUFBLEVBQUUsQ0FBQzNYLFFBQUgsQ0FBWWpCLENBQUMsQ0FBQzZQLFdBQWQsRUFBMEI3UCxDQUFDLENBQUN5aEIsV0FBNUIsR0FBeUMsS0FBS0MsWUFBTCxDQUFrQm5qQixHQUFsQixDQUFzQnFhLEVBQXRCLEVBQXlCLEtBQUczWSxDQUE1QixDQUF6QztBQUF3RSxPQUFuRyxDQUFoQyxFQUFxSSxLQUFLbWhCLFdBQUwsS0FBbUIsS0FBS0EsV0FBTCxDQUFpQnBpQixXQUFqQixHQUE2QixDQUFDLENBQWpELENBQXJJLEVBQXlMLE1BQU04RyxJQUFOLENBQVc7QUFBQ2lNLFFBQUFBLE1BQU0sRUFBQy9SO0FBQVIsT0FBWCxDQUF6TDtBQUFnTjs7QUFBM21ELEdBQTF1dEIsRUFBdTF3QkEsQ0FBQyxDQUFDNGhCLE1BQUYsR0FBUyxjQUFjcGhCLENBQWQsQ0FBZTtBQUFDbEgsSUFBQUEsV0FBVyxDQUFDeU4sQ0FBRCxFQUFHO0FBQUNQLE1BQUFBLE1BQU0sRUFBQ2pFLENBQUMsR0FBQyxFQUFWO0FBQWF1VSxNQUFBQSxhQUFhLEVBQUN6VyxDQUFDLEdBQUMsRUFBN0I7QUFBZ0MwVyxNQUFBQSxjQUFjLEVBQUN4TCxDQUFDLEdBQUN6TSxJQUFJLENBQUN3YyxJQUFMLENBQVUsS0FBR2piLENBQWIsQ0FBakQ7QUFBaUV3aEIsTUFBQUEsUUFBUSxFQUFDdFosQ0FBQyxHQUFDLENBQTVFO0FBQThFdVosTUFBQUEsU0FBUyxFQUFDblYsQ0FBQyxHQUFDLElBQUU3TixJQUFJLENBQUM2QixFQUFqRztBQUFvR29oQixNQUFBQSxVQUFVLEVBQUN6VyxDQUFDLEdBQUMsQ0FBakg7QUFBbUgwVyxNQUFBQSxXQUFXLEVBQUNwVixDQUFDLEdBQUM5TixJQUFJLENBQUM2QixFQUF0STtBQUF5SXNDLE1BQUFBLFVBQVUsRUFBQzNDLENBQUMsR0FBQztBQUF0SixRQUEwSixFQUE3SixFQUFnSztBQUFDLFVBQUlrQixDQUFDLEdBQUNuQixDQUFOO0FBQUEsVUFBUUcsQ0FBQyxHQUFDK0ssQ0FBVjtBQUFBLFVBQVloTCxDQUFDLEdBQUNnSSxDQUFkO0FBQUEsVUFBZ0JwSyxDQUFDLEdBQUN3TyxDQUFsQjtBQUFBLFVBQW9CbEwsQ0FBQyxHQUFDNkosQ0FBdEI7QUFBQSxVQUF3QjFKLENBQUMsR0FBQ2dMLENBQTFCO0FBQUEsVUFBNEJ4SyxDQUFDLEdBQUMsQ0FBQ1osQ0FBQyxHQUFDLENBQUgsS0FBT2hCLENBQUMsR0FBQyxDQUFULENBQTlCO0FBQUEsVUFBMENuQyxDQUFDLEdBQUNtRCxDQUFDLEdBQUNoQixDQUFGLEdBQUksQ0FBaEQ7QUFBQSxVQUFrRGdDLENBQUMsR0FBQyxJQUFJbkcsWUFBSixDQUFpQixJQUFFK0YsQ0FBbkIsQ0FBcEQ7QUFBQSxVQUEwRUMsQ0FBQyxHQUFDLElBQUloRyxZQUFKLENBQWlCLElBQUUrRixDQUFuQixDQUE1RTtBQUFBLFVBQWtHRCxDQUFDLEdBQUMsSUFBSTlGLFlBQUosQ0FBaUIsSUFBRStGLENBQW5CLENBQXBHO0FBQUEsVUFBMEhyRSxDQUFDLEdBQUNxRSxDQUFDLEdBQUMsS0FBRixHQUFRLElBQUk0VSxXQUFKLENBQWdCM1ksQ0FBaEIsQ0FBUixHQUEyQixJQUFJMEYsV0FBSixDQUFnQjFGLENBQWhCLENBQXZKO0FBQUEsVUFBMEsyQixDQUFDLEdBQUMsQ0FBNUs7QUFBQSxVQUE4SzZNLENBQUMsR0FBQyxDQUFoTDtBQUFBLFVBQWtMM00sQ0FBQyxHQUFDLENBQXBMO0FBQUEsVUFBc0w0TSxDQUFDLEdBQUNyTCxDQUFDLEdBQUNHLENBQTFMO0FBQUEsVUFBNExMLENBQUMsR0FBQyxFQUE5TDtBQUFBLFVBQWlNd0wsQ0FBQyxHQUFDLElBQUk5TSxDQUFKLEVBQW5NOztBQUF5TSxXQUFJLElBQUlzSCxDQUFDLEdBQUMsQ0FBVixFQUFZQSxDQUFDLElBQUUvRyxDQUFmLEVBQWlCK0csQ0FBQyxFQUFsQixFQUFxQjtBQUFDLFlBQUk5RyxDQUFDLEdBQUMsRUFBTjtBQUFBLFlBQVM2QixDQUFDLEdBQUNpRixDQUFDLEdBQUMvRyxDQUFiOztBQUFlLGFBQUksSUFBSWlILENBQUMsR0FBQyxDQUFWLEVBQVlBLENBQUMsSUFBRWpHLENBQWYsRUFBaUJpRyxDQUFDLElBQUd6SCxDQUFDLEVBQXRCLEVBQXlCO0FBQUMsY0FBSWQsQ0FBQyxHQUFDdUksQ0FBQyxHQUFDakcsQ0FBUjtBQUFBLGNBQVVkLENBQUMsR0FBQyxDQUFDNkIsQ0FBRCxHQUFHekQsSUFBSSxDQUFDdU8sR0FBTCxDQUFTOU0sQ0FBQyxHQUFDckIsQ0FBQyxHQUFDZixDQUFiLENBQUgsR0FBbUJXLElBQUksQ0FBQ3NPLEdBQUwsQ0FBUzNMLENBQUMsR0FBQ2EsQ0FBQyxHQUFDVixDQUFiLENBQS9CO0FBQUEsY0FBK0NrQixDQUFDLEdBQUNQLENBQUMsR0FBQ3pELElBQUksQ0FBQ3VPLEdBQUwsQ0FBUzVMLENBQUMsR0FBQ2EsQ0FBQyxHQUFDVixDQUFiLENBQW5EO0FBQUEsY0FBbUVtQixDQUFDLEdBQUNSLENBQUMsR0FBQ3pELElBQUksQ0FBQ3NPLEdBQUwsQ0FBUzdNLENBQUMsR0FBQ3JCLENBQUMsR0FBQ2YsQ0FBYixDQUFGLEdBQWtCVyxJQUFJLENBQUNzTyxHQUFMLENBQVMzTCxDQUFDLEdBQUNhLENBQUMsR0FBQ1YsQ0FBYixDQUF2RjtBQUF1R1ksVUFBQUEsQ0FBQyxDQUFDLElBQUV4QyxDQUFILENBQUQsR0FBT1UsQ0FBUCxFQUFTOEIsQ0FBQyxDQUFDLElBQUV4QyxDQUFGLEdBQUksQ0FBTCxDQUFELEdBQVM4QyxDQUFsQixFQUFvQk4sQ0FBQyxDQUFDLElBQUV4QyxDQUFGLEdBQUksQ0FBTCxDQUFELEdBQVMrQyxDQUE3QixFQUErQmdLLENBQUMsQ0FBQ3hPLEdBQUYsQ0FBTW1DLENBQU4sRUFBUW9DLENBQVIsRUFBVUMsQ0FBVixFQUFhakIsU0FBYixFQUEvQixFQUF3RE8sQ0FBQyxDQUFDLElBQUVyQyxDQUFILENBQUQsR0FBTytNLENBQUMsQ0FBQzVPLENBQWpFLEVBQW1Fa0UsQ0FBQyxDQUFDLElBQUVyQyxDQUFGLEdBQUksQ0FBTCxDQUFELEdBQVMrTSxDQUFDLENBQUMxTyxDQUE5RSxFQUFnRmdFLENBQUMsQ0FBQyxJQUFFckMsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTK00sQ0FBQyxDQUFDdE0sQ0FBM0YsRUFBNkYwQixDQUFDLENBQUMsSUFBRW5DLENBQUgsQ0FBRCxHQUFPZCxDQUFwRyxFQUFzR2lELENBQUMsQ0FBQyxJQUFFbkMsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTLElBQUVzQyxDQUFqSCxFQUFtSDdCLENBQUMsQ0FBQytLLElBQUYsQ0FBT3FCLENBQUMsRUFBUixDQUFuSDtBQUErSDs7QUFBQXRMLFFBQUFBLENBQUMsQ0FBQ2lLLElBQUYsQ0FBTy9LLENBQVA7QUFBVTs7QUFBQSxXQUFJLElBQUlOLENBQUMsR0FBQyxDQUFWLEVBQVlBLENBQUMsR0FBQ0ssQ0FBZCxFQUFnQkwsQ0FBQyxFQUFqQixFQUFvQixLQUFJLElBQUlXLENBQUMsR0FBQyxDQUFWLEVBQVlBLENBQUMsR0FBQ1UsQ0FBZCxFQUFnQlYsQ0FBQyxFQUFqQixFQUFvQjtBQUFDLFlBQUlrTSxDQUFDLEdBQUN6TCxDQUFDLENBQUNwQixDQUFELENBQUQsQ0FBS1csQ0FBQyxHQUFDLENBQVAsQ0FBTjtBQUFBLFlBQWdCa0MsQ0FBQyxHQUFDekIsQ0FBQyxDQUFDcEIsQ0FBRCxDQUFELENBQUtXLENBQUwsQ0FBbEI7QUFBQSxZQUEwQmdOLENBQUMsR0FBQ3ZNLENBQUMsQ0FBQ3BCLENBQUMsR0FBQyxDQUFILENBQUQsQ0FBT1csQ0FBUCxDQUE1QjtBQUFBLFlBQXNDZ0csQ0FBQyxHQUFDdkYsQ0FBQyxDQUFDcEIsQ0FBQyxHQUFDLENBQUgsQ0FBRCxDQUFPVyxDQUFDLEdBQUMsQ0FBVCxDQUF4QztBQUFvRCxTQUFDLE1BQUlYLENBQUosSUFBT3NCLENBQUMsR0FBQyxDQUFWLE1BQWUxRCxDQUFDLENBQUMsSUFBRW1DLENBQUgsQ0FBRCxHQUFPOE0sQ0FBUCxFQUFTalAsQ0FBQyxDQUFDLElBQUVtQyxDQUFGLEdBQUksQ0FBTCxDQUFELEdBQVM4QyxDQUFsQixFQUFvQmpGLENBQUMsQ0FBQyxJQUFFbUMsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTNEcsQ0FBN0IsRUFBK0I1RyxDQUFDLEVBQS9DLEdBQW1ELENBQUNDLENBQUMsS0FBR0ssQ0FBQyxHQUFDLENBQU4sSUFBU3NNLENBQUMsR0FBQ2hPLElBQUksQ0FBQzZCLEVBQWpCLE1BQXVCNUMsQ0FBQyxDQUFDLElBQUVtQyxDQUFILENBQUQsR0FBTzhDLENBQVAsRUFBU2pGLENBQUMsQ0FBQyxJQUFFbUMsQ0FBRixHQUFJLENBQUwsQ0FBRCxHQUFTNE4sQ0FBbEIsRUFBb0IvUCxDQUFDLENBQUMsSUFBRW1DLENBQUYsR0FBSSxDQUFMLENBQUQsR0FBUzRHLENBQTdCLEVBQStCNUcsQ0FBQyxFQUF2RCxDQUFuRDtBQUE4Rzs7QUFBQXdSLE1BQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjclIsQ0FBZCxFQUFnQjtBQUFDcEUsUUFBQUEsUUFBUSxFQUFDO0FBQUNDLFVBQUFBLElBQUksRUFBQyxDQUFOO0FBQVFDLFVBQUFBLElBQUksRUFBQ29HO0FBQWIsU0FBVjtBQUEwQjBVLFFBQUFBLE1BQU0sRUFBQztBQUFDL2EsVUFBQUEsSUFBSSxFQUFDLENBQU47QUFBUUMsVUFBQUEsSUFBSSxFQUFDaUc7QUFBYixTQUFqQztBQUFpRC9GLFFBQUFBLEVBQUUsRUFBQztBQUFDSCxVQUFBQSxJQUFJLEVBQUMsQ0FBTjtBQUFRQyxVQUFBQSxJQUFJLEVBQUMrRjtBQUFiLFNBQXBEO0FBQW9FMkMsUUFBQUEsS0FBSyxFQUFDO0FBQUMxSSxVQUFBQSxJQUFJLEVBQUMyQjtBQUFOO0FBQTFFLE9BQWhCLEdBQXFHLE1BQU1nSixDQUFOLEVBQVF6RyxDQUFSLENBQXJHO0FBQWdIOztBQUFoK0IsR0FBLzJ3QixFQUFpMXlCTixDQUFDLENBQUNpaUIsSUFBRixHQUFPLFVBQVM7QUFBQ0MsSUFBQUEsSUFBSSxFQUFDbGlCLENBQU47QUFBUW1pQixJQUFBQSxJQUFJLEVBQUNoaUIsQ0FBYjtBQUFlMUcsSUFBQUEsS0FBSyxFQUFDc0UsQ0FBQyxHQUFDLElBQUUsQ0FBekI7QUFBMkJxa0IsSUFBQUEsS0FBSyxFQUFDNWhCLENBQUMsR0FBQyxNQUFuQztBQUEwQ3JFLElBQUFBLElBQUksRUFBQzJFLENBQUMsR0FBQyxDQUFqRDtBQUFtRHVoQixJQUFBQSxhQUFhLEVBQUM3Z0IsQ0FBQyxHQUFDLENBQW5FO0FBQXFFOGdCLElBQUFBLFVBQVUsRUFBQzdnQixDQUFDLEdBQUMsR0FBbEY7QUFBc0Y4Z0IsSUFBQUEsV0FBVyxFQUFDaGhCLENBQUMsR0FBQyxDQUFwRztBQUFzR2loQixJQUFBQSxTQUFTLEVBQUM1Z0IsQ0FBQyxHQUFDLENBQUM7QUFBbkgsR0FBVCxFQUErSDtBQUFDLFFBQUlRLENBQUMsR0FBQyxJQUFOO0FBQUEsUUFBV25DLENBQVg7QUFBQSxRQUFhdUMsQ0FBYjtBQUFBLFFBQWVILENBQWY7QUFBQSxRQUFpQkMsQ0FBakI7QUFBQSxRQUFtQkMsQ0FBbkI7QUFBQSxRQUFxQkosQ0FBQyxHQUFDLElBQXZCO0FBQUEsUUFBNEJvRixDQUFDLEdBQUMsSUFBOUI7O0FBQW1DLGFBQVNySCxDQUFULEdBQVk7QUFBQ21DLE1BQUFBLENBQUMsR0FBQ3JDLENBQUMsQ0FBQ3lpQixNQUFGLENBQVNILFVBQVgsRUFBc0JoZ0IsQ0FBQyxHQUFDdEMsQ0FBQyxDQUFDeWlCLE1BQUYsQ0FBU0MsSUFBakMsRUFBc0NuZ0IsQ0FBQyxHQUFDekIsQ0FBQyxHQUFDd0IsQ0FBMUM7QUFBNEMsVUFBSXBDLENBQUMsR0FBQ0MsQ0FBQyxDQUFDd2lCLE9BQUYsQ0FBVSxRQUFWLEVBQW1CLEVBQW5CLEVBQXVCemtCLE1BQTdCO0FBQW9Dc0UsTUFBQUEsQ0FBQyxHQUFDO0FBQUN0RyxRQUFBQSxRQUFRLEVBQUMsSUFBSUcsWUFBSixDQUFpQixJQUFFNkQsQ0FBRixHQUFJLENBQXJCLENBQVY7QUFBa0M1RCxRQUFBQSxFQUFFLEVBQUMsSUFBSUQsWUFBSixDQUFpQixJQUFFNkQsQ0FBRixHQUFJLENBQXJCLENBQXJDO0FBQTZEZ0QsUUFBQUEsRUFBRSxFQUFDLElBQUk3RyxZQUFKLENBQWlCLElBQUU2RCxDQUFuQixDQUFoRTtBQUFzRjRFLFFBQUFBLEtBQUssRUFBQyxJQUFJZixXQUFKLENBQWdCLElBQUU3RCxDQUFsQjtBQUE1RixPQUFGOztBQUFvSCxXQUFJLElBQUlELENBQUMsR0FBQyxDQUFWLEVBQVlBLENBQUMsR0FBQ0MsQ0FBZCxFQUFnQkQsQ0FBQyxFQUFqQixFQUFvQnVDLENBQUMsQ0FBQ1UsRUFBRixDQUFLakQsQ0FBTCxJQUFRQSxDQUFSLEVBQVV1QyxDQUFDLENBQUNzQyxLQUFGLENBQVF2RyxHQUFSLENBQVksQ0FBQyxJQUFFMEIsQ0FBSCxFQUFLLElBQUVBLENBQUYsR0FBSSxDQUFULEVBQVcsSUFBRUEsQ0FBRixHQUFJLENBQWYsRUFBaUIsSUFBRUEsQ0FBRixHQUFJLENBQXJCLEVBQXVCLElBQUVBLENBQUYsR0FBSSxDQUEzQixFQUE2QixJQUFFQSxDQUFGLEdBQUksQ0FBakMsQ0FBWixFQUFnRCxJQUFFQSxDQUFsRCxDQUFWOztBQUErRHdILE1BQUFBLENBQUM7QUFBRzs7QUFBQSxhQUFTQSxDQUFULEdBQVk7QUFBQyxVQUFJcEosQ0FBQyxHQUFDLEVBQU47QUFBQSxVQUFTZ0UsQ0FBQyxHQUFDLENBQVg7QUFBQSxVQUFhaEMsQ0FBQyxHQUFDLENBQWY7QUFBQSxVQUFpQmlDLENBQUMsR0FBQyxDQUFuQjtBQUFBLFVBQXFCcEMsQ0FBQyxHQUFDSyxDQUFDLEVBQXhCOztBQUEyQixlQUFTQSxDQUFULEdBQVk7QUFBQyxZQUFJUCxDQUFDLEdBQUM7QUFBQ3ZHLFVBQUFBLEtBQUssRUFBQyxDQUFQO0FBQVNtcEIsVUFBQUEsTUFBTSxFQUFDO0FBQWhCLFNBQU47QUFBMEIsZUFBT3ZrQixDQUFDLENBQUNtTixJQUFGLENBQU94TCxDQUFQLEdBQVVLLENBQUMsR0FBQ2dDLENBQVosRUFBY0MsQ0FBQyxHQUFDLENBQWhCLEVBQWtCdEMsQ0FBekI7QUFBMkI7O0FBQUEsVUFBSVMsQ0FBQyxHQUFDLENBQU47O0FBQVEsYUFBSzRCLENBQUMsR0FBQ2xDLENBQUMsQ0FBQ2pDLE1BQUosSUFBWXVDLENBQUMsR0FBQyxHQUFuQixHQUF3QjtBQUFDQSxRQUFBQSxDQUFDO0FBQUcsWUFBSUgsQ0FBQyxHQUFDSCxDQUFDLENBQUNrQyxDQUFELENBQVA7O0FBQVcsWUFBRyxDQUFDbkMsQ0FBQyxDQUFDekcsS0FBSCxJQUFVOE4sQ0FBQyxDQUFDc2IsSUFBRixDQUFPdmlCLENBQVAsQ0FBYixFQUF1QjtBQUFDRCxVQUFBQSxDQUFDLEdBQUMsRUFBRWdDLENBQUosRUFBTUMsQ0FBQyxHQUFDLENBQVI7QUFBVTtBQUFTOztBQUFBLFlBQUdILENBQUMsQ0FBQzBnQixJQUFGLENBQU92aUIsQ0FBUCxDQUFILEVBQWE7QUFBQytCLFVBQUFBLENBQUMsSUFBR25DLENBQUMsR0FBQ0ssQ0FBQyxFQUFQO0FBQVU7QUFBUzs7QUFBQSxZQUFJcEMsQ0FBQyxHQUFDOEIsQ0FBQyxDQUFDSyxDQUFELENBQVA7O0FBQVcsWUFBR0osQ0FBQyxDQUFDMGlCLE1BQUYsQ0FBUzFrQixNQUFaLEVBQW1CO0FBQUMsY0FBSTZFLENBQUMsR0FBQzdDLENBQUMsQ0FBQzBpQixNQUFGLENBQVMxaUIsQ0FBQyxDQUFDMGlCLE1BQUYsQ0FBUzFrQixNQUFULEdBQWdCLENBQXpCLEVBQTRCLENBQTVCLENBQU47QUFBQSxjQUFxQ3dDLENBQUMsR0FBQ3hCLENBQUMsQ0FBQ2YsQ0FBQyxDQUFDK0UsRUFBSCxFQUFNSCxDQUFDLENBQUNHLEVBQVIsQ0FBRCxHQUFhWCxDQUFwRDtBQUFzRHJDLFVBQUFBLENBQUMsQ0FBQ3pHLEtBQUYsSUFBU2lILENBQVQsRUFBVzRCLENBQUMsSUFBRTVCLENBQWQ7QUFBZ0I7O0FBQUFSLFFBQUFBLENBQUMsQ0FBQzBpQixNQUFGLENBQVNwWCxJQUFULENBQWMsQ0FBQ3JOLENBQUQsRUFBRytCLENBQUMsQ0FBQ3pHLEtBQUwsQ0FBZDtBQUEyQixZQUFJZ08sQ0FBQyxHQUFDLENBQU47O0FBQVEsWUFBR0YsQ0FBQyxDQUFDc2IsSUFBRixDQUFPdmlCLENBQVAsS0FBV0QsQ0FBQyxHQUFDZ0MsQ0FBRixFQUFJQyxDQUFDLEdBQUMsQ0FBTixFQUFRbUYsQ0FBQyxJQUFFbEcsQ0FBQyxHQUFDVCxDQUF4QixJQUEyQjJHLENBQUMsSUFBRWpHLENBQUMsR0FBQ1YsQ0FBaEMsRUFBa0MyRyxDQUFDLElBQUV0SixDQUFDLENBQUMya0IsUUFBRixHQUFXdmdCLENBQWhELEVBQWtEckMsQ0FBQyxDQUFDekcsS0FBRixJQUFTZ08sQ0FBM0QsRUFBNkRuRixDQUFDLElBQUVtRixDQUFoRSxFQUFrRXZILENBQUMsQ0FBQ3pHLEtBQUYsR0FBUXNFLENBQTdFLEVBQStFO0FBQUMsY0FBRzZELENBQUMsSUFBRTFCLENBQUMsQ0FBQzBpQixNQUFGLENBQVMxa0IsTUFBVCxHQUFnQixDQUF0QixFQUF3QjtBQUFDZ0MsWUFBQUEsQ0FBQyxDQUFDekcsS0FBRixJQUFTZ08sQ0FBVCxFQUFXdkgsQ0FBQyxDQUFDMGlCLE1BQUYsQ0FBU0csR0FBVCxFQUFYLEVBQTBCN2lCLENBQUMsR0FBQ0ssQ0FBQyxFQUE3QjtBQUFnQztBQUFTOztBQUFBLGNBQUcsQ0FBQ3FCLENBQUQsSUFBSVUsQ0FBQyxLQUFHcEMsQ0FBQyxDQUFDekcsS0FBYixFQUFtQjtBQUFDLGdCQUFJcUosQ0FBQyxHQUFDVCxDQUFDLEdBQUNoQyxDQUFGLEdBQUksQ0FBVjtBQUFZSCxZQUFBQSxDQUFDLENBQUMwaUIsTUFBRixDQUFTdFMsTUFBVCxDQUFnQixDQUFDeE4sQ0FBakIsRUFBbUJBLENBQW5CLEdBQXNCVCxDQUFDLEdBQUNoQyxDQUF4QixFQUEwQkgsQ0FBQyxDQUFDekcsS0FBRixJQUFTNkksQ0FBbkMsRUFBcUNwQyxDQUFDLEdBQUNLLENBQUMsRUFBeEM7QUFBMkM7QUFBUztBQUFDOztBQUFBOEIsUUFBQUEsQ0FBQztBQUFHOztBQUFBbkMsTUFBQUEsQ0FBQyxDQUFDekcsS0FBRixJQUFTNEUsQ0FBQyxDQUFDMGtCLEdBQUYsRUFBVCxFQUFpQixVQUFTMWdCLENBQVQsRUFBVztBQUFDLFlBQUlvRixDQUFDLEdBQUN6SCxDQUFDLENBQUN5aUIsTUFBRixDQUFTTyxNQUFmO0FBQUEsWUFBc0I5akIsQ0FBQyxHQUFDYyxDQUFDLENBQUN5aUIsTUFBRixDQUFTUSxNQUFqQztBQUFBLFlBQXdDL2lCLENBQUMsR0FBQyxNQUFJWSxDQUE5QztBQUFBLFlBQWdEd0IsQ0FBQyxHQUFDLENBQWxEOztBQUFvRCxhQUFJLElBQUlILENBQUMsR0FBQyxDQUFWLEVBQVlBLENBQUMsR0FBQ0UsQ0FBQyxDQUFDbkUsTUFBaEIsRUFBdUJpRSxDQUFDLEVBQXhCLEVBQTJCO0FBQUMsY0FBSXBFLENBQUMsR0FBQ3NFLENBQUMsQ0FBQ0YsQ0FBRCxDQUFQOztBQUFXLGVBQUksSUFBSVgsQ0FBQyxHQUFDLENBQVYsRUFBWUEsQ0FBQyxHQUFDekQsQ0FBQyxDQUFDNmtCLE1BQUYsQ0FBUzFrQixNQUF2QixFQUE4QnNELENBQUMsRUFBL0IsRUFBa0M7QUFBQyxnQkFBSXZCLENBQUMsR0FBQ2xDLENBQUMsQ0FBQzZrQixNQUFGLENBQVNwaEIsQ0FBVCxFQUFZLENBQVosQ0FBTjtBQUFBLGdCQUFxQnJCLENBQUMsR0FBQ3BDLENBQUMsQ0FBQzZrQixNQUFGLENBQVNwaEIsQ0FBVCxFQUFZLENBQVosQ0FBdkI7QUFBc0MsZ0JBQUcsYUFBV2hCLENBQVgsR0FBYUwsQ0FBQyxJQUFFLEtBQUdwQyxDQUFDLENBQUN0RSxLQUFyQixHQUEyQixZQUFVK0csQ0FBVixLQUFjTCxDQUFDLElBQUVwQyxDQUFDLENBQUN0RSxLQUFuQixDQUEzQixFQUFxRDhOLENBQUMsQ0FBQ3NiLElBQUYsQ0FBTzVpQixDQUFDLENBQUNpakIsSUFBVCxDQUF4RCxFQUF1RTtBQUFTL2lCLFlBQUFBLENBQUMsSUFBRUYsQ0FBQyxDQUFDa2pCLE9BQUYsR0FBVTVnQixDQUFiLEVBQWVyQyxDQUFDLElBQUVELENBQUMsQ0FBQ21qQixPQUFGLEdBQVU3Z0IsQ0FBNUI7QUFBOEIsZ0JBQUlsQyxDQUFDLEdBQUNKLENBQUMsQ0FBQ3hHLEtBQUYsR0FBUThJLENBQWQ7QUFBQSxnQkFBZ0JqQyxDQUFDLEdBQUNMLENBQUMsQ0FBQ3ZHLE1BQUYsR0FBUzZJLENBQTNCO0FBQTZCQyxZQUFBQSxDQUFDLENBQUN0RyxRQUFGLENBQVdxQyxHQUFYLENBQWUsQ0FBQzRCLENBQUQsRUFBR0QsQ0FBQyxHQUFDSSxDQUFMLEVBQU8sQ0FBUCxFQUFTSCxDQUFULEVBQVdELENBQVgsRUFBYSxDQUFiLEVBQWVDLENBQUMsR0FBQ0UsQ0FBakIsRUFBbUJILENBQUMsR0FBQ0ksQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUJILENBQUMsR0FBQ0UsQ0FBM0IsRUFBNkJILENBQTdCLEVBQStCLENBQS9CLENBQWYsRUFBaUQsSUFBRW9DLENBQUYsR0FBSSxDQUFyRDtBQUF3RCxnQkFBSWYsQ0FBQyxHQUFDdEIsQ0FBQyxDQUFDOUIsQ0FBRixHQUFJc0osQ0FBVjtBQUFBLGdCQUFZbEgsQ0FBQyxHQUFDTixDQUFDLENBQUN4RyxLQUFGLEdBQVFnTyxDQUF0QjtBQUFBLGdCQUF3QjdGLENBQUMsR0FBQyxJQUFFM0IsQ0FBQyxDQUFDNUIsQ0FBRixHQUFJYSxDQUFoQztBQUFBLGdCQUFrQ2YsQ0FBQyxHQUFDOEIsQ0FBQyxDQUFDdkcsTUFBRixHQUFTd0YsQ0FBN0M7QUFBK0NzRCxZQUFBQSxDQUFDLENBQUNsRyxFQUFGLENBQUtpQyxHQUFMLENBQVMsQ0FBQ2dELENBQUQsRUFBR0ssQ0FBQyxHQUFDekQsQ0FBTCxFQUFPb0QsQ0FBUCxFQUFTSyxDQUFULEVBQVdMLENBQUMsR0FBQ2hCLENBQWIsRUFBZXFCLENBQUMsR0FBQ3pELENBQWpCLEVBQW1Cb0QsQ0FBQyxHQUFDaEIsQ0FBckIsRUFBdUJxQixDQUF2QixDQUFULEVBQW1DLElBQUVVLENBQUYsR0FBSSxDQUF2QyxHQUEwQ3BDLENBQUMsSUFBRUQsQ0FBQyxDQUFDbWpCLE9BQUYsR0FBVTdnQixDQUF2RCxFQUF5REQsQ0FBQyxFQUExRDtBQUE2RDs7QUFBQXBDLFVBQUFBLENBQUMsSUFBRVksQ0FBQyxHQUFDVyxDQUFMO0FBQU87O0FBQUFXLFFBQUFBLENBQUMsQ0FBQ2loQixPQUFGLEdBQVU3Z0IsQ0FBVixFQUFZSixDQUFDLENBQUNraEIsUUFBRixHQUFXamhCLENBQUMsQ0FBQ25FLE1BQXpCLEVBQWdDa0UsQ0FBQyxDQUFDMUksTUFBRixHQUFTMEksQ0FBQyxDQUFDa2hCLFFBQUYsR0FBV3hpQixDQUFYLEdBQWFXLENBQXREO0FBQXdELE9BQTloQixDQUEraEJwRCxDQUEvaEIsQ0FBakI7QUFBbWpCOztBQUFBLGFBQVNhLENBQVQsQ0FBV2dCLENBQVgsRUFBYW5DLENBQWIsRUFBZTtBQUFDLFdBQUksSUFBSW9DLENBQUMsR0FBQyxDQUFWLEVBQVlBLENBQUMsR0FBQ0gsQ0FBQyxDQUFDdWpCLFFBQUYsQ0FBV3JsQixNQUF6QixFQUFnQ2lDLENBQUMsRUFBakMsRUFBb0M7QUFBQyxZQUFJRixDQUFDLEdBQUNELENBQUMsQ0FBQ3VqQixRQUFGLENBQVdwakIsQ0FBWCxDQUFOO0FBQW9CLFlBQUcsRUFBRUYsQ0FBQyxDQUFDdWpCLEtBQUYsR0FBUXRqQixDQUFSLElBQVdELENBQUMsQ0FBQ3dqQixNQUFGLEdBQVMxbEIsQ0FBdEIsQ0FBSCxFQUE0QixPQUFPa0MsQ0FBQyxDQUFDdWpCLEtBQUYsR0FBUXRqQixDQUFSLEdBQVUsQ0FBVixHQUFZRCxDQUFDLENBQUN1akIsS0FBRixLQUFVdGpCLENBQVYsSUFBYUQsQ0FBQyxDQUFDd2pCLE1BQUYsR0FBUzFsQixDQUF0QixHQUF3QixDQUF4QixHQUEwQmtDLENBQUMsQ0FBQ3lqQixNQUEvQztBQUFzRDs7QUFBQSxhQUFPLENBQVA7QUFBUzs7QUFBQXpqQixJQUFBQSxDQUFDLEdBQUMsRUFBRixFQUFLRCxDQUFDLENBQUMyakIsS0FBRixDQUFRM29CLE9BQVIsQ0FBZ0JnRixDQUFDLElBQUVDLENBQUMsQ0FBQ0QsQ0FBQyxDQUFDa2pCLElBQUgsQ0FBRCxHQUFVbGpCLENBQTdCLENBQUwsRUFBcUNFLENBQUMsRUFBdEMsRUFBeUMsS0FBS2hGLE1BQUwsR0FBWSxVQUFTOEUsQ0FBVCxFQUFXO0FBQUMsT0FBQztBQUFDdkcsUUFBQUEsS0FBSyxFQUFDc0U7QUFBUCxVQUFVaUMsQ0FBWCxHQUFjeUgsQ0FBQyxFQUFmO0FBQWtCLEtBQW5GLEVBQW9GLEtBQUt4SSxNQUFMLEdBQVksVUFBU2UsQ0FBVCxFQUFXO0FBQUMsT0FBQztBQUFDbWlCLFFBQUFBLElBQUksRUFBQ2hpQjtBQUFOLFVBQVNILENBQVYsR0FBYUUsQ0FBQyxFQUFkO0FBQWlCLEtBQTdIO0FBQThILEdBQWp0MkIsRUFBa3QyQkYsQ0FBQyxDQUFDdkQsT0FBRixHQUFVNkYsQ0FBNXQyQixFQUE4dDJCdEMsQ0FBQyxDQUFDNGpCLFNBQUYsR0FBWTlpQixDQUExdTJCLEVBQTR1MkJkLENBQUMsQ0FBQzVGLElBQUYsR0FBTzJELENBQW52MkIsRUFBcXYyQmlDLENBQUMsQ0FBQzZqQixJQUFGLEdBQU81akIsQ0FBNXYyQixFQUE4djJCRCxDQUFDLENBQUNuRSxJQUFGLEdBQU8sY0FBY2dGLEtBQWQsQ0FBbUI7QUFBQ3ZILElBQUFBLFdBQVcsQ0FBQzBHLENBQUMsR0FBQyxDQUFILEVBQUtDLENBQUMsR0FBQ0QsQ0FBUCxFQUFTRSxDQUFDLEdBQUNGLENBQVgsRUFBYUcsQ0FBQyxHQUFDSCxDQUFmLEVBQWlCO0FBQUMsYUFBTyxNQUFNQSxDQUFOLEVBQVFDLENBQVIsRUFBVUMsQ0FBVixFQUFZQyxDQUFaLEdBQWUsSUFBdEI7QUFBMkI7O0FBQUssUUFBRGhDLENBQUMsR0FBRTtBQUFDLGFBQU8sS0FBSyxDQUFMLENBQVA7QUFBZTs7QUFBSyxRQUFEQSxDQUFDLENBQUM2QixDQUFELEVBQUc7QUFBQyxXQUFLLENBQUwsSUFBUUEsQ0FBUjtBQUFVOztBQUFLLFFBQUQzQixDQUFDLEdBQUU7QUFBQyxhQUFPLEtBQUssQ0FBTCxDQUFQO0FBQWU7O0FBQUssUUFBREEsQ0FBQyxDQUFDMkIsQ0FBRCxFQUFHO0FBQUMsV0FBSyxDQUFMLElBQVFBLENBQVI7QUFBVTs7QUFBSyxRQUFEUyxDQUFDLEdBQUU7QUFBQyxhQUFPLEtBQUssQ0FBTCxDQUFQO0FBQWU7O0FBQUssUUFBREEsQ0FBQyxDQUFDVCxDQUFELEVBQUc7QUFBQyxXQUFLLENBQUwsSUFBUUEsQ0FBUjtBQUFVOztBQUFLLFFBQURPLENBQUMsR0FBRTtBQUFDLGFBQU8sS0FBSyxDQUFMLENBQVA7QUFBZTs7QUFBSyxRQUFEQSxDQUFDLENBQUNQLENBQUQsRUFBRztBQUFDLFdBQUssQ0FBTCxJQUFRQSxDQUFSO0FBQVU7O0FBQUF6QixJQUFBQSxHQUFHLENBQUN5QixDQUFELEVBQUdDLENBQUgsRUFBS0MsQ0FBTCxFQUFPQyxDQUFQLEVBQVM7QUFBQyxhQUFPSCxDQUFDLENBQUM5QixNQUFGLEdBQVMsS0FBS2tCLElBQUwsQ0FBVVksQ0FBVixDQUFULElBQXVCdUIsQ0FBQyxDQUFDLElBQUQsRUFBTXZCLENBQU4sRUFBUUMsQ0FBUixFQUFVQyxDQUFWLEVBQVlDLENBQVosQ0FBRCxFQUFnQixJQUF2QyxDQUFQO0FBQW9EOztBQUFBZixJQUFBQSxJQUFJLENBQUNZLENBQUQsRUFBRztBQUFDLGFBQU95QixDQUFDLENBQUMsSUFBRCxFQUFNekIsQ0FBTixDQUFELEVBQVUsSUFBakI7QUFBc0I7O0FBQUE4QixJQUFBQSxTQUFTLEdBQUU7QUFBQyxhQUFPRixDQUFDLENBQUMsSUFBRCxFQUFNLElBQU4sQ0FBRCxFQUFhLElBQXBCO0FBQXlCOztBQUFBZSxJQUFBQSxTQUFTLENBQUMzQyxDQUFELEVBQUdDLENBQUMsR0FBQyxDQUFMLEVBQU87QUFBQyxhQUFPLEtBQUssQ0FBTCxJQUFRRCxDQUFDLENBQUNDLENBQUQsQ0FBVCxFQUFhLEtBQUssQ0FBTCxJQUFRRCxDQUFDLENBQUNDLENBQUMsR0FBQyxDQUFILENBQXRCLEVBQTRCLEtBQUssQ0FBTCxJQUFRRCxDQUFDLENBQUNDLENBQUMsR0FBQyxDQUFILENBQXJDLEVBQTJDLEtBQUssQ0FBTCxJQUFRRCxDQUFDLENBQUNDLENBQUMsR0FBQyxDQUFILENBQXBELEVBQTBELElBQWpFO0FBQXNFOztBQUFBMkMsSUFBQUEsT0FBTyxDQUFDNUMsQ0FBQyxHQUFDLEVBQUgsRUFBTUMsQ0FBQyxHQUFDLENBQVIsRUFBVTtBQUFDLGFBQU9ELENBQUMsQ0FBQ0MsQ0FBRCxDQUFELEdBQUssS0FBSyxDQUFMLENBQUwsRUFBYUQsQ0FBQyxDQUFDQyxDQUFDLEdBQUMsQ0FBSCxDQUFELEdBQU8sS0FBSyxDQUFMLENBQXBCLEVBQTRCRCxDQUFDLENBQUNDLENBQUMsR0FBQyxDQUFILENBQUQsR0FBTyxLQUFLLENBQUwsQ0FBbkMsRUFBMkNELENBQUMsQ0FBQ0MsQ0FBQyxHQUFDLENBQUgsQ0FBRCxHQUFPLEtBQUssQ0FBTCxDQUFsRCxFQUEwREQsQ0FBakU7QUFBbUU7O0FBQWpoQixHQUF4eDJCLEVBQTJ5M0JBLENBQWx6M0I7QUFBb3ozQixDQUpobTRELENBSWltNEQsRUFKam00RCxDQUFWOzs7Ozs7Ozs7OztBQ0FQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1COztBQUVuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQixzQkFBc0I7QUFDeEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjs7QUFFQSxrQ0FBa0MsUUFBUTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGlCQUFpQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLHVDQUF1QyxRQUFRO0FBQy9DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTLHlCQUF5QjtBQUNsQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQixnQkFBZ0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4REFBOEQsWUFBWTtBQUMxRTtBQUNBLDhEQUE4RCxZQUFZO0FBQzFFO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsWUFBWTtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2hmYTtBQUNiO0FBQ0E7QUFDQSxpREFBaUQsT0FBTztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHlCQUF5QixtQkFBTyxDQUFDLGdGQUFvQjtBQUNyRCw0QkFBNEIsbUJBQU8sQ0FBQyxzRkFBdUI7QUFDM0Qsd0JBQXdCLG1CQUFPLENBQUMsOEVBQW1CO0FBQ25ELDZDQUE2Qyx5Q0FBeUMsK0NBQStDO0FBQ3JJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUZBQXFGO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRDtBQUN0RCwwREFBMEQ7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0Msd0JBQXdCLDhCQUE4QjtBQUM5RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsS0FDaUMsRUFBRSxFQUd0QztBQUNMLGFBQWEsS0FDNEIsRUFBRSxFQUd0QztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjOzs7Ozs7Ozs7Ozs7QUNyTUQsOENBQTJDLENBQUMsV0FBVyxFQUFDLENBQUMsbUJBQW1CLEVBQUUsNkNBQTZDLHFvQkFBcW9CLDZwQkFBNnBCLEtBQUssdUJBQXVCLEVBQUUsS0FBSyxVQUFVLEtBQUssV0FBVyxhQUFhLGFBQWEsWUFBWSxNQUFNLGFBQWEsU0FBUyxXQUFXLGFBQWEsYUFBYSxZQUFZLEdBQUcsUUFBUSxVQUFVLE9BQU8seUJBQXlCLDJCQUEyQix5QkFBeUIsMkJBQTJCLDZCQUE2Qix1QkFBdUIsNkJBQTZCLHlCQUF5Qix1QkFBdUIseUJBQXlCLHlCQUF5QiwyQkFBMkIsdUJBQXVCLHVCQUF1Qix1QkFBdUIseUJBQXlCLHVCQUF1Qiw2QkFBNkIseUJBQXlCLHlCQUF5QiwyQkFBMkIsMkJBQTJCLHlCQUF5Qiw2QkFBNkIsMkJBQTJCLHlCQUF5Qix5QkFBeUIsMkJBQTJCLDZCQUE2Qiw2QkFBNkIsNkJBQTZCLDZCQUE2Qiw2QkFBNkIsNkJBQTZCLDJCQUEyQiw2QkFBNkIseUJBQXlCLDJCQUEyQiwyQkFBMkIsNkJBQTZCLDZCQUE2Qiw2QkFBNkIsMkJBQTJCLHlCQUF5Qiw2QkFBNkIsNkJBQTZCLDJCQUEyQix5QkFBeUIsdUJBQXVCLDZCQUE2Qiw2QkFBNkIsNkJBQTZCLDJCQUEyQiw2QkFBNkIseUJBQXlCLDJCQUEyQiw2QkFBNkIsNkJBQTZCLDZCQUE2QiwyQkFBMkIseUJBQXlCLDZCQUE2QiwyQkFBMkIsMkJBQTJCLDZCQUE2Qiw2QkFBNkIsMkJBQTJCLDZCQUE2Qix5QkFBeUIsMkJBQTJCLDJCQUEyQiw2QkFBNkIsNkJBQTZCLDZCQUE2QiwyQkFBMkIseUJBQXlCLDZCQUE2Qiw2QkFBNkIsMkJBQTJCLHlCQUF5Qix1QkFBdUIsNkJBQTZCLDZCQUE2Qiw2QkFBNkIsMkJBQTJCLDZCQUE2Qix5QkFBeUIsNkJBQTZCLDZCQUE2Qiw2QkFBNkIsNkJBQTZCLDJCQUEyQix5QkFBeUIsNkJBQTZCLDJCQUEyQix5QkFBeUIseUJBQXlCLHVCQUF1QixxQkFBcUIscUJBQXFCLGNBQWMsY0FBYyxlQUFlLGVBQWUsYUFBYSxhQUFhLGNBQWMsYUFBYSxhQUFhLGVBQWUsYUFBYSxZQUFZLFlBQVksWUFBWSxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGFBQWEsYUFBYSxjQUFjLGFBQWEsY0FBYyxjQUFjLGdCQUFnQixhQUFhLFlBQVksY0FBYyxhQUFhLGNBQWMsZUFBZSxXQUFXLFdBQVcsV0FBVyxnQkFBZ0IsV0FBVyxZQUFZLGNBQWMsWUFBWSxnQkFBZ0IsWUFBWSxZQUFZLFlBQVksY0FBYyxjQUFjLGFBQWEsY0FBYyxjQUFjLGdCQUFnQixhQUFhLFlBQVksY0FBYyxhQUFhLGNBQWMsZUFBZSxXQUFXLFdBQVcsV0FBVyxnQkFBZ0IsV0FBVyxZQUFZLGVBQWUsY0FBYyxZQUFZLGdCQUFnQixZQUFZLFlBQVksWUFBWSxjQUFjLGlCQUFpQixjQUFjLFlBQVksYUFBYSxlQUFlLGNBQWMsY0FBYyxjQUFjLGNBQWMsZUFBZSxjQUFjLGFBQWEsY0FBYyxnQkFBZ0IsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGNBQWMsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGVBQWUsYUFBYSxjQUFjLGNBQWMsY0FBYyxhQUFhLGNBQWMsV0FBVyxhQUFhLFlBQVksY0FBYyxlQUFlLGNBQWMsYUFBYSxjQUFjLFlBQVksWUFBWSxXQUFXLFlBQVksWUFBWSxZQUFZLGVBQWUsWUFBWSxhQUFhLGNBQWMsV0FBVyxjQUFjLFdBQVcsV0FBVyxZQUFZLFlBQVksYUFBYSxhQUFhLGFBQWEsY0FBYyxlQUFlLGFBQWEsYUFBYSxjQUFjLGNBQWMsZUFBZSxlQUFlLGFBQWEsYUFBYSxZQUFZLGVBQWUsY0FBYyxlQUFlLGNBQWMsTUFBTSxhQUFhLFdBQVcsYUFBYSxjQUFjLGFBQWEsY0FBYyxlQUFlLFlBQVksZUFBZSxhQUFhLFlBQVksYUFBYSxhQUFhLGNBQWMsWUFBWSxZQUFZLFlBQVksYUFBYSxZQUFZLGVBQWUsYUFBYSxhQUFhLGNBQWMsY0FBYyxhQUFhLGVBQWUsY0FBYyxhQUFhLGFBQWEsY0FBYyxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxjQUFjLGVBQWUsYUFBYSxjQUFjLGNBQWMsZUFBZSxlQUFlLGVBQWUsY0FBYyxhQUFhLGVBQWUsZUFBZSxjQUFjLGFBQWEsWUFBWSxlQUFlLGVBQWUsZUFBZSxjQUFjLGVBQWUsYUFBYSxjQUFjLGVBQWUsZUFBZSxlQUFlLGNBQWMsYUFBYSxlQUFlLGNBQWMsY0FBYyxlQUFlLGVBQWUsY0FBYyxlQUFlLGFBQWEsY0FBYyxjQUFjLGVBQWUsZUFBZSxlQUFlLGNBQWMsYUFBYSxlQUFlLGVBQWUsY0FBYyxhQUFhLFlBQVksZUFBZSxlQUFlLGVBQWUsY0FBYyxlQUFlLGFBQWEsZUFBZSxlQUFlLGVBQWUsZUFBZSxjQUFjLGFBQWEsZUFBZSxjQUFjLGFBQWEsYUFBYSxZQUFZLFdBQVcsV0FBVyxjQUFjLGNBQWMsZUFBZSxlQUFlLGFBQWEsYUFBYSxjQUFjLGFBQWEsYUFBYSxlQUFlLGFBQWEsWUFBWSxZQUFZLFlBQVksY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxhQUFhLGFBQWEsY0FBYyxhQUFhLGNBQWMsY0FBYyxnQkFBZ0IsYUFBYSxZQUFZLGNBQWMsYUFBYSxjQUFjLGVBQWUsV0FBVyxXQUFXLFdBQVcsZ0JBQWdCLFdBQVcsWUFBWSxjQUFjLFlBQVksZ0JBQWdCLFlBQVksWUFBWSxZQUFZLGNBQWMsY0FBYyxhQUFhLGNBQWMsY0FBYyxnQkFBZ0IsYUFBYSxZQUFZLGNBQWMsYUFBYSxjQUFjLGVBQWUsV0FBVyxXQUFXLFdBQVcsZ0JBQWdCLFdBQVcsWUFBWSxlQUFlLGNBQWMsWUFBWSxnQkFBZ0IsWUFBWSxZQUFZLFlBQVksY0FBYyxpQkFBaUIsY0FBYyxZQUFZLGFBQWEsZUFBZSxjQUFjLGNBQWMsY0FBYyxjQUFjLGVBQWUsY0FBYyxhQUFhLGNBQWMsZ0JBQWdCLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxjQUFjLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxlQUFlLGFBQWEsY0FBYyxjQUFjLGNBQWMsYUFBYSxjQUFjLFdBQVcsYUFBYSxZQUFZLGNBQWMsZUFBZSxjQUFjLGFBQWEsY0FBYyxZQUFZLFlBQVksV0FBVyxZQUFZLFlBQVksWUFBWSxlQUFlLFlBQVksYUFBYSxjQUFjLFdBQVcsY0FBYyxXQUFXLFdBQVcsWUFBWSxZQUFZLGFBQWEsYUFBYSxhQUFhLGNBQWMsZUFBZSxhQUFhLGFBQWEsY0FBYyxjQUFjLGVB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YUFBYSxlQUFlLGVBQWUsWUFBWSxhQUFhLGFBQWEsZUFBZSxpQkFBaUIsY0FBYyxlQUFlLGVBQWUsZUFBZSxhQUFhLFlBQVksY0FBYyxZQUFZLGNBQWMsYUFBYSxlQUFlLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxlQUFlLGFBQWEsaUJBQWlCLGFBQWEsY0FBYyxhQUFhLHNCQUFzQixpQkFBaUIsaUJBQWlCLGlCQUFpQixpQkFBaUIsaUJBQWlCLGlCQUFpQixpQkFBaUIsaUJBQWlCLGNBQWMsZ0JBQWdCLGlCQUFpQixlQUFlLGdCQUFnQixjQUFjLGNBQWMsWUFBWSxlQUFlLGlCQUFpQixhQUFhLGFBQWEsY0FBYyxjQUFjLGVBQWUsZUFBZSxhQUFhLGNBQWMsYUFBYSxjQUFjLGNBQWMsZUFBZSxhQUFhLGNBQWMsZUFBZSxpQkFBaUIsaUJBQWlCLFlBQVksZUFBZSxnQkFBZ0IsYUFBYSxhQUFhLGNBQWMsYUFBYSxjQUFjLGNBQWMsZUFBZSxlQUFlLGVBQWUsY0FBYyxjQUFjLGNBQWMsZUFBZSxjQUFjLGFBQWEsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsYUFBYSxpQkFBaUIsYUFBYSxjQUFjLGVBQWUsY0FBYyxjQUFjLGNBQWMsY0FBYyxhQUFhLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxhQUFhLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGVBQWUsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGVBQWUsY0FBYyxlQUFlLGNBQWMsY0FBYyxjQUFjLGNBQWMsYUFBYSxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxlQUFlLGNBQWMsY0FBYyxjQUFjLGNBQWMsaUJBQWlCLGVBQWUsY0FBYyxlQUFlLFlBQVksZUFBZSxpQkFBaUIsZUFBZSxlQUFlLGVBQWUsY0FBYyxjQUFjLGNBQWMsZUFBZSxlQUFlLGNBQWMsY0FBYyxnQkFBZ0IsYUFBYSxnQkFBZ0IsYUFBYSxhQUFhLGFBQWEsa0JBQWtCLFlBQVksWUFBWSxhQUFhLGFBQWEsYUFBYSxjQUFjLGNBQWMsV0FBVyxhQUFhLGFBQWEsY0FBYyxpQkFBaUIsZUFBZSxnQkFBZ0IsaUJBQWlCLGNBQWMsY0FBYyxlQUFlLG1CQUFtQixnQkFBZ0IsY0FBYyxlQUFlLGNBQWMsY0FBYyxjQUFjLGFBQWEsY0FBYyxhQUFhLGNBQWMsY0FBYyxnQkFBZ0IsZ0JBQWdCLG9CQUFvQixvQkFBb0IsdUJBQXVCLGdCQUFnQixZQUFZLGlCQUFpQixlQUFlLGVBQWUsZUFBZSxjQUFjLGNBQWMsd0JBQXdCLGdCQUFnQixjQUFjLGNBQWMsZUFBZSxjQUFjLGVBQWUsYUFBYSxlQUFlLGVBQWUsZUFBZSxjQUFjLGVBQWUsWUFBWSx1QkFBdUIsY0FBYyxZQUFZLGNBQWMsZ0JBQWdCLGVBQWUsYUFBYSxjQUFjLGVBQWUsY0FBYyxlQUFlLGVBQWUsYUFBYSxpQkFBaUIsZUFBZSxhQUFhLGNBQWMsYUFBYSxlQUFlLGVBQWUsY0FBYyxpQkFBaUIsZUFBZSxjQUFjLGFBQWEsYUFBYSxlQUFlLGNBQWMscUJBQXFCLGdCQUFnQixhQUFhLGlCQUFpQixlQUFlLGVBQWUsZUFBZSxlQUFlLGNBQWMsZ0JBQWdCLFlBQVksYUFBYSxzQkFBc0IsYUFBYSxXQUFXLGVBQWUsbUJBQW1CLGVBQWUsV0FBVyxpQkFBaUIsWUFBWSxvQkFBb0IsZUFBZSxjQUFjLG1CQUFtQixlQUFlLGVBQWUsYUFBYSxZQUFZLGFBQWEsY0FBYyxjQUFjLGFBQWEsZUFBZSxjQUFjLGdCQUFnQixtQkFBbUIsZUFBZSxnQkFBZ0IsZ0JBQWdCLGlCQUFpQixxQkFBcUIsY0FBYyxhQUFhLFlBQVksWUFBWSxhQUFhLGFBQWEsYUFBYSxZQUFZLGVBQWUsZUFBZSxjQUFjLGVBQWUsYUFBYSxjQUFjLGFBQWEsYUFBYSxjQUFjLGNBQWMsYUFBYSxjQUFjLGtCQUFrQixjQUFjLGlCQUFpQixhQUFhLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxjQUFjLGVBQWUsY0FBYyxtQkFBbUIsZUFBZSxjQUFjLGtCQUFrQixlQUFlLGNBQWMsWUFBWSxhQUFhLGNBQWMsZUFBZSxnQkFBZ0IsaUJBQWlCLGNBQWMsZUFBZSxhQUFhLGNBQWMsYUFBYSxZQUFZLFlBQVksWUFBWSxjQUFjLGlCQUFpQixhQUFhLGNBQWMsY0FBYyxhQUFhLGNBQWMsY0FBYyxhQUFhLGNBQWMsZUFBZSxlQUFlLGdCQUFnQixlQUFlLGNBQWMsZUFBZSxnQkFBZ0IsNEJBQTRCLGVBQWUsY0FBYyxrQkFBa0IsYUFBYSxlQUFlLGFBQWEsZUFBZSxlQUFlLGNBQWMsZUFBZSxlQUFlLGVBQWUsY0FBYyxlQUFlLGNBQWMsZUFBZSxlQUFlLGVBQWUsY0FBYyxZQUFZLGFBQWEsY0FBYyxhQUFhLGVBQWUsYUFBYSxhQUFhLGVBQWUsY0FBYyxjQUFjLGNBQWMsZUFBZSxhQUFhLGNBQWMsZUFBZSxjQUFjLGlCQUFpQixpQkFBaUIsaUJBQWlCLGNBQWMsYUFBYSxjQUFjLGNBQWMsYUFBYSxlQUFlLGNBQWMsY0FBYyxnQkFBZ0IsY0FBYyxlQUFlLGVBQWUsY0FBYyxhQUFhLGNBQWMsWUFBWSxhQUFhLGNBQWMsY0FBYyxjQUFjLGVBQWUsY0FBYyxjQUFjLGlCQUFpQixlQUFlLFlBQVksYUFBYSxlQUFlLGFBQWEsYUFBYSxjQUFjLGNBQWMsZUFBZSxjQUFjLG1CQUFtQixhQUFhLGVBQWUsaUJBQWlCLGVBQWUsY0FBYyxtQkFBbUIsY0FBYyxnQkFBZ0IsZUFBZSxzQkFBc0IsZUFBZSxnQkFBZ0Isc0JBQXNCLFlBQVksZUFBZSxhQUFhLGVBQWUsY0FBYyxjQUFjLElBQUksU0FBUyxhQUFhLGNBQWMsZ0JBQWdCLGdCQUFnQixlQUFlLGVBQWUsWUFBWSxhQUFhLGdCQUFnQixpQkFBaUIsYUFBYSxZQUFZLGNBQWMsZUFBZSxjQUFjLGVBQWUsZ0JBQWdCLGlCQUFpQixjQUFjLGVBQWUsY0FBYyxlQUFlLGFBQWEsWUFBWSxlQUFlLGNBQWMsYUFBYSxlQUFlLGNBQWMsZUFBZSxtQkFBbUIsY0FBYyxpQkFBaUIsYUFBYSxjQUFjLGNBQWMsY0FBYyxhQUFhLGVBQWUsY0FBYyxjQUFjLGVBQWUsZ0JBQWdCLGVBQWUsZ0JBQWdCLGFBQWEsZUFBZSxlQUFlLFlBQVksY0FBYyxlQUFlLGNBQWMsY0FBYyxjQUFjLGNBQWMsZUFBZSxhQUFhLGNBQWMsZUFBZSxlQUFlLGdCQUFnQixlQUFlLHFCQUFxQixpQkFBaUIsZ0JBQWdCLGNBQWMsY0FBYyxjQUFjLGFBQWEsZ0JBQWdCLGVBQWUsZUFBZSxZQUFZLGNBQWMsYUFBYSxZQUFZLGNBQWMsZUFBZSxjQUFjLGdCQUFnQixhQUFhLGVBQWUsY0FBYyxjQUFjLFdBQVcsY0FBYyxhQUFhLGFBQWEsY0FBYyxjQUFjLGFBQWEsYUFBYSxjQUFjLGVBQWUsZUFBZSxlQUFlLGNBQWMsY0FBYyxlQUFlLGNBQWMsZ0JBQWdCLGFBQWEsZUFBZSxlQUFlLGtCQUFrQixhQUFhLFlBQVksY0FBYyxjQUFjLGVBQWUsZUFBZSxhQUFhLGFBQWEsd0JBQXdCLGNBQWMsWUFBWSxhQUFhLGFBQWEsZUFBZSxtQkFBbUIsYUFBYSxjQUFjLFlBQVksZ0JBQWdCLGtCQUFrQixnQkFBZ0IsZ0JBQWdCLGdCQUFnQixnQkFBZ0IsZ0JBQWdCLGVBQWUsZ0JBQWdCLG9CQUFvQixnQkFBZ0IsZ0JBQWdCLGNBQWMsYUFBYSxvQkFBb0IsYUFBYSxvQkFBb0IsZUFBZSxXQUFXLFlBQVksZUFBZSxjQUFjLGVBQWUsZUFBZSxjQUFjLGVBQWUsY0FBYyxjQUFjLGdCQUFnQixlQUFlLGNBQWMsY0FBYyxpQkFBaUIsZUFBZSxpQkFBaUIsZUFBZSxjQUFjLGVBQWUsZUFBZSxlQUFlLGNBQWMsWUFBWSxlQUFlLGFBQWEsZUFBZSxjQUFjLGNBQWMsYUFBYSxhQUFhLGVBQWUsWUFBWSxjQUFjLGNBQWMsZ0JBQWdCLFlBQVksY0FBYyxjQUFjLGdCQUFnQixhQUFhLGNBQWMsYUFBYSxjQUFjLFlBQVksWUFBWSxhQUFhLGFBQWEsYUFBYSxlQUFlLGFBQWEsZ0JBQWdCLFlBQVksZUFBZSxhQUFhLGVBQWUsaUJBQWlCLGFBQWEsY0FBYyxhQUFhLGVBQWUs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QTtBQUNBLDZFQUE2RSxlQUFlO0FBQzVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsNkVBQTZFLGVBQWU7QUFDNUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSw2RUFBNkUsZUFBZTtBQUM1RjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLDZFQUE2RSxlQUFlO0FBQzVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxtR0FBbUcsZUFBZTtBQUNsSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsNkVBQTZFLGVBQWU7QUFDNUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSw2RUFBNkUsZUFBZTtBQUM1RjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLDZFQUE2RSxlQUFlO0FBQzVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsZ0ZBQWdGLGlCQUFpQjtBQUNqRztBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFD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QUFXOztBQUVmLG9CQUFvQiw4QkFBOEI7QUFDbEQsTUFBTSxtREFBUTtBQUNkOztBQUVBOztBQUVBO0FBQ0EsTUFBTSxpREFBSTtBQUNWOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLCtEQUFTO0FBQ2IsR0FBRzs7QUFFSDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0EsSUFBSSxvREFBUzs7QUFFYjtBQUNBLDRCQUE0QiwwREFBYTtBQUN6QztBQUNBOztBQUVBLDRDQUE0QyxtRUFBUztBQUNyRCxLQUFLOztBQUVMLElBQUksaUVBQVc7O0FBRWYsb0JBQW9CLDRCQUE0QjtBQUNoRCxNQUFNLG9EQUFTO0FBQ2Y7O0FBRUE7O0FBRUE7QUFDQSxNQUFNLGlEQUFJO0FBQ1Y7QUFDQSxHQUFHOztBQUVIO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQSxJQUFJLG9EQUFTO0FBQ2IsR0FBRztBQUNIO0FBQ0EsSUFBSSxtREFBUTs7QUFFWjtBQUNBLE1BQU0saURBQUk7QUFDVjs7QUFFQSxJQUFJLGlFQUFXO0FBQ2Y7QUFDQTtBQUNBLGdCQUFnQixxRUFBZTtBQUMvQixzREFBTSxnRDs7Ozs7Ozs7Ozs7O0FDaFJOOztBQUVBLE1BQU04akIsR0FBTixDQUFVO0FBQ054cUIsRUFBQUEsV0FBVyxHQUFHO0FBQ1YsU0FBS3lCLElBQUw7QUFDSDs7QUFFREEsRUFBQUEsSUFBSSxHQUFHO0FBQ0gsUUFBSTFCLDBEQUFKO0FBQ0g7O0FBUEs7O0FBU1YsSUFBSXlxQixHQUFKLEc7Ozs7Ozs7Ozs7QUNYQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbnNpLWh0bWwtY29tbXVuaXR5L2luZGV4LmpzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL2NhbnZhcy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9vZ2wuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2h0bWwtZW50aXRpZXMvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9odG1sLWVudGl0aWVzL2xpYi9uYW1lZC1yZWZlcmVuY2VzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9odG1sLWVudGl0aWVzL2xpYi9udW1lcmljLXVuaWNvZGUtbWFwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9odG1sLWVudGl0aWVzL2xpYi9zdXJyb2dhdGUtcGFpcnMuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NoYWRlcnMvZnJhZ21lbnQuZ2xzbCIsIndlYnBhY2s6Ly8vLi9hcHAvc2hhZGVycy92ZXJ0ZXguZ2xzbCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9jbGllbnRzL1dlYlNvY2tldENsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9tb2R1bGVzL2xvZ2dlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9tb2R1bGVzL3N0cmlwLWFuc2kvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvb3ZlcmxheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9zb2NrZXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvdXRpbHMvY3JlYXRlU29ja2V0VVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL2dldEN1cnJlbnRTY3JpcHRTb3VyY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvdXRpbHMvbG9nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL3BhcnNlVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL3JlbG9hZEFwcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC91dGlscy9zZW5kTWVzc2FnZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvZW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvbG9nLmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L2luZGV4LmpzIiwid2VicGFjazovLy8uL2FwcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zdHlsZXMvaW5kZXguc2NzcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBhbnNpSFRNTFxuXG4vLyBSZWZlcmVuY2UgdG8gaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9hbnNpLXJlZ2V4XG52YXIgX3JlZ0FOU0kgPSAvKD86KD86XFx1MDAxYlxcWyl8XFx1MDA5YikoPzooPzpbMC05XXsxLDN9KT8oPzooPzo7WzAtOV17MCwzfSkqKT9bQS1NfGYtbV0pfFxcdTAwMWJbQS1NXS9cblxudmFyIF9kZWZDb2xvcnMgPSB7XG4gIHJlc2V0OiBbJ2ZmZicsICcwMDAnXSwgLy8gW0ZPUkVHUk9VRF9DT0xPUiwgQkFDS0dST1VORF9DT0xPUl1cbiAgYmxhY2s6ICcwMDAnLFxuICByZWQ6ICdmZjAwMDAnLFxuICBncmVlbjogJzIwOTgwNScsXG4gIHllbGxvdzogJ2U4YmYwMycsXG4gIGJsdWU6ICcwMDAwZmYnLFxuICBtYWdlbnRhOiAnZmYwMGZmJyxcbiAgY3lhbjogJzAwZmZlZScsXG4gIGxpZ2h0Z3JleTogJ2YwZjBmMCcsXG4gIGRhcmtncmV5OiAnODg4J1xufVxudmFyIF9zdHlsZXMgPSB7XG4gIDMwOiAnYmxhY2snLFxuICAzMTogJ3JlZCcsXG4gIDMyOiAnZ3JlZW4nLFxuICAzMzogJ3llbGxvdycsXG4gIDM0OiAnYmx1ZScsXG4gIDM1OiAnbWFnZW50YScsXG4gIDM2OiAnY3lhbicsXG4gIDM3OiAnbGlnaHRncmV5J1xufVxudmFyIF9vcGVuVGFncyA9IHtcbiAgJzEnOiAnZm9udC13ZWlnaHQ6Ym9sZCcsIC8vIGJvbGRcbiAgJzInOiAnb3BhY2l0eTowLjUnLCAvLyBkaW1cbiAgJzMnOiAnPGk+JywgLy8gaXRhbGljXG4gICc0JzogJzx1PicsIC8vIHVuZGVyc2NvcmVcbiAgJzgnOiAnZGlzcGxheTpub25lJywgLy8gaGlkZGVuXG4gICc5JzogJzxkZWw+JyAvLyBkZWxldGVcbn1cbnZhciBfY2xvc2VUYWdzID0ge1xuICAnMjMnOiAnPC9pPicsIC8vIHJlc2V0IGl0YWxpY1xuICAnMjQnOiAnPC91PicsIC8vIHJlc2V0IHVuZGVyc2NvcmVcbiAgJzI5JzogJzwvZGVsPicgLy8gcmVzZXQgZGVsZXRlXG59XG5cbjtbMCwgMjEsIDIyLCAyNywgMjgsIDM5LCA0OV0uZm9yRWFjaChmdW5jdGlvbiAobikge1xuICBfY2xvc2VUYWdzW25dID0gJzwvc3Bhbj4nXG59KVxuXG4vKipcbiAqIENvbnZlcnRzIHRleHQgd2l0aCBBTlNJIGNvbG9yIGNvZGVzIHRvIEhUTUwgbWFya3VwLlxuICogQHBhcmFtIHtTdHJpbmd9IHRleHRcbiAqIEByZXR1cm5zIHsqfVxuICovXG5mdW5jdGlvbiBhbnNpSFRNTCAodGV4dCkge1xuICAvLyBSZXR1cm5zIHRoZSB0ZXh0IGlmIHRoZSBzdHJpbmcgaGFzIG5vIEFOU0kgZXNjYXBlIGNvZGUuXG4gIGlmICghX3JlZ0FOU0kudGVzdCh0ZXh0KSkge1xuICAgIHJldHVybiB0ZXh0XG4gIH1cblxuICAvLyBDYWNoZSBvcGVuZWQgc2VxdWVuY2UuXG4gIHZhciBhbnNpQ29kZXMgPSBbXVxuICAvLyBSZXBsYWNlIHdpdGggbWFya3VwLlxuICB2YXIgcmV0ID0gdGV4dC5yZXBsYWNlKC9cXDAzM1xcWyhcXGQrKW0vZywgZnVuY3Rpb24gKG1hdGNoLCBzZXEpIHtcbiAgICB2YXIgb3QgPSBfb3BlblRhZ3Nbc2VxXVxuICAgIGlmIChvdCkge1xuICAgICAgLy8gSWYgY3VycmVudCBzZXF1ZW5jZSBoYXMgYmVlbiBvcGVuZWQsIGNsb3NlIGl0LlxuICAgICAgaWYgKCEhfmFuc2lDb2Rlcy5pbmRleE9mKHNlcSkpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1leHRyYS1ib29sZWFuLWNhc3RcbiAgICAgICAgYW5zaUNvZGVzLnBvcCgpXG4gICAgICAgIHJldHVybiAnPC9zcGFuPidcbiAgICAgIH1cbiAgICAgIC8vIE9wZW4gdGFnLlxuICAgICAgYW5zaUNvZGVzLnB1c2goc2VxKVxuICAgICAgcmV0dXJuIG90WzBdID09PSAnPCcgPyBvdCA6ICc8c3BhbiBzdHlsZT1cIicgKyBvdCArICc7XCI+J1xuICAgIH1cblxuICAgIHZhciBjdCA9IF9jbG9zZVRhZ3Nbc2VxXVxuICAgIGlmIChjdCkge1xuICAgICAgLy8gUG9wIHNlcXVlbmNlXG4gICAgICBhbnNpQ29kZXMucG9wKClcbiAgICAgIHJldHVybiBjdFxuICAgIH1cbiAgICByZXR1cm4gJydcbiAgfSlcblxuICAvLyBNYWtlIHN1cmUgdGFncyBhcmUgY2xvc2VkLlxuICB2YXIgbCA9IGFuc2lDb2Rlcy5sZW5ndGhcbiAgOyhsID4gMCkgJiYgKHJldCArPSBBcnJheShsICsgMSkuam9pbignPC9zcGFuPicpKVxuXG4gIHJldHVybiByZXRcbn1cblxuLyoqXG4gKiBDdXN0b21pemUgY29sb3JzLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbG9ycyByZWZlcmVuY2UgdG8gX2RlZkNvbG9yc1xuICovXG5hbnNpSFRNTC5zZXRDb2xvcnMgPSBmdW5jdGlvbiAoY29sb3JzKSB7XG4gIGlmICh0eXBlb2YgY29sb3JzICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBFcnJvcignYGNvbG9yc2AgcGFyYW1ldGVyIG11c3QgYmUgYW4gT2JqZWN0LicpXG4gIH1cblxuICB2YXIgX2ZpbmFsQ29sb3JzID0ge31cbiAgZm9yICh2YXIga2V5IGluIF9kZWZDb2xvcnMpIHtcbiAgICB2YXIgaGV4ID0gY29sb3JzLmhhc093blByb3BlcnR5KGtleSkgPyBjb2xvcnNba2V5XSA6IG51bGxcbiAgICBpZiAoIWhleCkge1xuICAgICAgX2ZpbmFsQ29sb3JzW2tleV0gPSBfZGVmQ29sb3JzW2tleV1cbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuICAgIGlmICgncmVzZXQnID09PSBrZXkpIHtcbiAgICAgIGlmICh0eXBlb2YgaGV4ID09PSAnc3RyaW5nJykge1xuICAgICAgICBoZXggPSBbaGV4XVxuICAgICAgfVxuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGhleCkgfHwgaGV4Lmxlbmd0aCA9PT0gMCB8fCBoZXguc29tZShmdW5jdGlvbiAoaCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGggIT09ICdzdHJpbmcnXG4gICAgICB9KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB2YWx1ZSBvZiBgJyArIGtleSArICdgIHByb3BlcnR5IG11c3QgYmUgYW4gQXJyYXkgYW5kIGVhY2ggaXRlbSBjb3VsZCBvbmx5IGJlIGEgaGV4IHN0cmluZywgZS5nLjogRkYwMDAwJylcbiAgICAgIH1cbiAgICAgIHZhciBkZWZIZXhDb2xvciA9IF9kZWZDb2xvcnNba2V5XVxuICAgICAgaWYgKCFoZXhbMF0pIHtcbiAgICAgICAgaGV4WzBdID0gZGVmSGV4Q29sb3JbMF1cbiAgICAgIH1cbiAgICAgIGlmIChoZXgubGVuZ3RoID09PSAxIHx8ICFoZXhbMV0pIHtcbiAgICAgICAgaGV4ID0gW2hleFswXV1cbiAgICAgICAgaGV4LnB1c2goZGVmSGV4Q29sb3JbMV0pXG4gICAgICB9XG5cbiAgICAgIGhleCA9IGhleC5zbGljZSgwLCAyKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGhleCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHZhbHVlIG9mIGAnICsga2V5ICsgJ2AgcHJvcGVydHkgbXVzdCBiZSBhIGhleCBzdHJpbmcsIGUuZy46IEZGMDAwMCcpXG4gICAgfVxuICAgIF9maW5hbENvbG9yc1trZXldID0gaGV4XG4gIH1cbiAgX3NldFRhZ3MoX2ZpbmFsQ29sb3JzKVxufVxuXG4vKipcbiAqIFJlc2V0IGNvbG9ycy5cbiAqL1xuYW5zaUhUTUwucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gIF9zZXRUYWdzKF9kZWZDb2xvcnMpXG59XG5cbi8qKlxuICogRXhwb3NlIHRhZ3MsIGluY2x1ZGluZyBvcGVuIGFuZCBjbG9zZS5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmFuc2lIVE1MLnRhZ3MgPSB7fVxuXG5pZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhbnNpSFRNTC50YWdzLCAnb3BlbicsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9vcGVuVGFncyB9XG4gIH0pXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhbnNpSFRNTC50YWdzLCAnY2xvc2UnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfY2xvc2VUYWdzIH1cbiAgfSlcbn0gZWxzZSB7XG4gIGFuc2lIVE1MLnRhZ3Mub3BlbiA9IF9vcGVuVGFnc1xuICBhbnNpSFRNTC50YWdzLmNsb3NlID0gX2Nsb3NlVGFnc1xufVxuXG5mdW5jdGlvbiBfc2V0VGFncyAoY29sb3JzKSB7XG4gIC8vIHJlc2V0IGFsbFxuICBfb3BlblRhZ3NbJzAnXSA9ICdmb250LXdlaWdodDpub3JtYWw7b3BhY2l0eToxO2NvbG9yOiMnICsgY29sb3JzLnJlc2V0WzBdICsgJztiYWNrZ3JvdW5kOiMnICsgY29sb3JzLnJlc2V0WzFdXG4gIC8vIGludmVyc2VcbiAgX29wZW5UYWdzWyc3J10gPSAnY29sb3I6IycgKyBjb2xvcnMucmVzZXRbMV0gKyAnO2JhY2tncm91bmQ6IycgKyBjb2xvcnMucmVzZXRbMF1cbiAgLy8gZGFyayBncmV5XG4gIF9vcGVuVGFnc1snOTAnXSA9ICdjb2xvcjojJyArIGNvbG9ycy5kYXJrZ3JleVxuXG4gIGZvciAodmFyIGNvZGUgaW4gX3N0eWxlcykge1xuICAgIHZhciBjb2xvciA9IF9zdHlsZXNbY29kZV1cbiAgICB2YXIgb3JpQ29sb3IgPSBjb2xvcnNbY29sb3JdIHx8ICcwMDAnXG4gICAgX29wZW5UYWdzW2NvZGVdID0gJ2NvbG9yOiMnICsgb3JpQ29sb3JcbiAgICBjb2RlID0gcGFyc2VJbnQoY29kZSlcbiAgICBfb3BlblRhZ3NbKGNvZGUgKyAxMCkudG9TdHJpbmcoKV0gPSAnYmFja2dyb3VuZDojJyArIG9yaUNvbG9yXG4gIH1cbn1cblxuYW5zaUhUTUwucmVzZXQoKVxuIiwiaW1wb3J0IHsgb2dsIH0gZnJvbSBcIi4vb2dsXCI7XHJcblxyXG5pbXBvcnQgdmVydGV4U2hhZGVyIGZyb20gJy4uL3NoYWRlcnMvdmVydGV4Lmdsc2wnXHJcbmltcG9ydCBmcmFnbWVudFNoYWRlciBmcm9tICcuLi9zaGFkZXJzL2ZyYWdtZW50Lmdsc2wnIFxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuYmluZCgpXHJcblxyXG4gICAgICAgIHRoaXMudmVydGV4U2hhZGVyID0gdmVydGV4U2hhZGVyXHJcbiAgICAgICAgdGhpcy5mcmFnbWVudFNoYWRlciA9IGZyYWdtZW50U2hhZGVyXHJcblxyXG4gICAgICAgIHRoaXMuaW1nU2l6ZSA9IHtcclxuICAgICAgICAgICAgd2lkdGg6IDE5MjAsXHJcbiAgICAgICAgICAgIGhlaWdodDogMTA4MFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlYmdsJylcclxuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IG9nbC5SZW5kZXJlcih7IGNhbnZhczogY2FudmFzLCBkcHI6IDIgfSlcclxuICAgICAgICB0aGlzLmdsID0gdGhpcy5yZW5kZXJlci5nbFxyXG5cclxuICAgICAgICAvLyBWYXJpYWJsZSBpbnB1dHMgdG8gY29udHJvbCBmbG93bWFwXHJcbiAgICAgICAgdGhpcy5hc3BlY3QgPSAxXHJcbiAgICAgICAgdGhpcy5tb3VzZSA9IG5ldyBvZ2wuVmVjMigtMSlcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gbmV3IG9nbC5WZWMyKClcclxuXHJcbiAgICAgICAgdGhpcy5mbG93bWFwID0gbmV3IG9nbC5GbG93bWFwKHRoaXMuZ2wsIHsgYWxwaGE6IDAuMSB9KVxyXG5cclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAgICAgdGhpcy5sYXN0TW91c2UgPSBuZXcgb2dsLlZlYzIoKVxyXG5cclxuICAgICAgICB0aGlzLmlzVG91Y2hDYXBhYmxlID0gXCJvbnRvdWNoc3RhcnRcIiBpbiB3aW5kb3dcclxuXHJcbiAgICAgICAgdGhpcy5yQUYgPSB1bmRlZmluZWRcclxuXHJcbiAgICAgICAgdGhpcy5pbml0KClcclxuICAgIH1cclxuXHJcbiAgICBiaW5kKCkge1xyXG4gICAgICAgIFsncmVzaXplJywgJ3VwZGF0ZU1vdXNlJywgJ3VwZGF0ZSddXHJcbiAgICAgICAgICAgIC5mb3JFYWNoKGZuID0+IHRoaXNbZm5dID0gdGhpc1tmbl0uYmluZCh0aGlzKSlcclxuICAgIH1cclxuXHJcbiAgICAvL3JlcGxhY2UgYWxsIHdpbmRvdy5pbm5lcldpZHRoIGFuZCBoZWlnaHQgYnkgdXNpbmcgdGhlbSBpbiBzdG9yZSBvYmplY3RcclxuICAgIHJlc2l6ZSgpIHtcclxuICAgICAgICBsZXQgYTEsIGEyXHJcbiAgICAgICAgdmFyIGltYWdlQXNwZWN0ID0gdGhpcy5pbWdTaXplLmhlaWdodCAvIHRoaXMuaW1nU2l6ZS53aWR0aFxyXG5cclxuICAgICAgICBpZiAod2luZG93LmlubmVySGVpZ2h0IC8gd2luZG93LmlubmVyV2lkdGggPCBpbWFnZUFzcGVjdCkge1xyXG4gICAgICAgICAgICBhMSA9IDFcclxuICAgICAgICAgICAgYTIgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyB3aW5kb3cuaW5uZXJXaWR0aCAvIGltYWdlQXNwZWN0XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYTEgPSAod2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQpICogaW1hZ2VBc3BlY3RcclxuICAgICAgICAgICAgYTIgPSAxXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1lc2gucHJvZ3JhbS51bmlmb3Jtcy5yZXMudmFsdWUgPSBuZXcgb2dsLlZlYzQoXHJcbiAgICAgICAgICAgIHdpbmRvdy5pbm5lcldpZHRoLFxyXG4gICAgICAgICAgICB3aW5kb3cuaW5uZXJIZWlnaHQsXHJcbiAgICAgICAgICAgIGExLFxyXG4gICAgICAgICAgICBhMlxyXG4gICAgICAgIClcclxuICAgIFxyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KVxyXG4gICAgICAgIHRoaXMuYXNwZWN0ID0gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHRcclxuICAgIH1cclxuICAgIFxyXG4gICAgY3JlYXRlR2VvbWV0cnkoKSB7XHJcbiAgICAgICAgLy8gVHJpYW5nbGUgdGhhdCBpbmNsdWRlcyAtMSB0byAxIHJhbmdlIGZvciAncG9zaXRpb24nLCBhbmQgMCB0byAxIHJhbmdlIGZvciAndXYnLlxyXG4gICAgICAgIHRoaXMuZ2VvbWV0cnkgPSBuZXcgb2dsLkdlb21ldHJ5KHRoaXMuZ2wsIHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBzaXplOiAyLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogbmV3IEZsb2F0MzJBcnJheShbLTEsIC0xLCAzLCAtMSwgLTEsIDNdKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1djogeyBzaXplOiAyLCBkYXRhOiBuZXcgRmxvYXQzMkFycmF5KFswLCAwLCAyLCAwLCAwLCAyXSkgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVGV4dHVyZSgpIHtcclxuICAgICAgICB0aGlzLnRleHR1cmUgPSBuZXcgb2dsLlRleHR1cmUodGhpcy5nbCwge1xyXG4gICAgICAgICAgICBtaW5GaWx0ZXI6IHRoaXMuZ2wuTElORUFSLFxyXG4gICAgICAgICAgICBtYWdGaWx0ZXI6IHRoaXMuZ2wuTElORUFSXHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKVxyXG4gICAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiAodGhpcy50ZXh0dXJlLmltYWdlID0gaW1nKVxyXG4gICAgICAgIGltZy5jcm9zc09yaWdpbiA9IFwiQW5vbnltb3VzXCJcclxuXHJcbiAgICAgICAgLy8gQ2hhbmdlIGltYWdlcyBiYXNlZCBvbiBkZXZpY2VcclxuICAgICAgICBpZiAodGhpcy5pc1RvdWNoQ2FwYWJsZSkge1xyXG4gICAgICAgICAgICBpbWcuc3JjID0gXCJtb2JpbGUuanBnXCJcclxuICAgICAgICAgICAgdGhpcy5pbWdTaXplID0ge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDUyMixcclxuICAgICAgICAgICAgICAgIGhlaWdodDogMTA4MFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaW1nLnNyYyA9IFwiZGVza3RvcC5wbmdcIlxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgYTEsIGEyXHJcbiAgICAgICAgdmFyIGltYWdlQXNwZWN0ID0gdGhpcy5pbWdTaXplLmhlaWdodCAvIHRoaXMuaW1nU2l6ZS53aWR0aFxyXG5cclxuICAgICAgICBpZiAod2luZG93LmlubmVySGVpZ2h0IC8gd2luZG93LmlubmVyV2lkdGggPCBpbWFnZUFzcGVjdCkge1xyXG4gICAgICAgICAgICBhMSA9IDFcclxuICAgICAgICAgICAgYTIgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyB3aW5kb3cuaW5uZXJXaWR0aCAvIGltYWdlQXNwZWN0XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYTEgPSAod2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQpICogaW1hZ2VBc3BlY3RcclxuICAgICAgICAgICAgYTIgPSAxXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4geyBhMSwgYTIgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjcmVhdGVTaGFkZXJzKCkge1xyXG4gICAgICAgIGNvbnN0IHRleHR1cmVBc3BlY3QgPSB0aGlzLnVwZGF0ZVRleHR1cmUoKVxyXG5cclxuICAgICAgICB0aGlzLnByb2dyYW0gPSBuZXcgb2dsLlByb2dyYW0odGhpcy5nbCwge1xyXG4gICAgICAgICAgICB2ZXJ0ZXg6IHRoaXMudmVydGV4U2hhZGVyLFxyXG4gICAgICAgICAgICBmcmFnbWVudDogdGhpcy5mcmFnbWVudFNoYWRlcixcclxuICAgICAgICAgICAgdW5pZm9ybXM6IHtcclxuICAgICAgICAgICAgdVRpbWU6IHsgdmFsdWU6IDAgfSxcclxuICAgICAgICAgICAgdFdhdGVyOiB7IHZhbHVlOiB0aGlzLnRleHR1cmUgfSxcclxuICAgICAgICAgICAgcmVzOiB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogbmV3IG9nbC5WZWM0KHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQsIHRleHR1cmVBc3BlY3QuYTEsIHRleHR1cmVBc3BlY3QuYTIpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzogeyB2YWx1ZTogbmV3IG9nbC5WZWMyKHRoaXMuaW1nU2l6ZS53aWR0aCwgdGhpcy5pbWdTaXplLmhlaWdodCkgfSxcclxuICAgICAgICAgICAgLy8gTm90ZSB0aGF0IHRoZSB1bmlmb3JtIGlzIGFwcGxpZWQgd2l0aG91dCB1c2luZyBhbiBvYmplY3QgYW5kIHZhbHVlIHByb3BlcnR5XHJcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgYmVjYXVzZSB0aGUgY2xhc3MgYWx0ZXJuYXRlcyB0aGlzIHRleHR1cmUgYmV0d2VlbiB0d28gcmVuZGVyIHRhcmdldHNcclxuICAgICAgICAgICAgLy8gYW5kIHVwZGF0ZXMgdGhlIHZhbHVlIHByb3BlcnR5IGFmdGVyIGVhY2ggcmVuZGVyLlxyXG4gICAgICAgICAgICB0RmxvdzogdGhpcy5mbG93bWFwLnVuaWZvcm1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlTWVzaCgpIHtcclxuICAgICAgICB0aGlzLm1lc2ggPSBuZXcgb2dsLk1lc2godGhpcy5nbCwgeyBnZW9tZXRyeTogdGhpcy5nZW9tZXRyeSwgcHJvZ3JhbTogdGhpcy5wcm9ncmFtIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlTW91c2UoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgaWYgKGUuY2hhbmdlZFRvdWNoZXMgJiYgZS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZS54ID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWFxyXG4gICAgICAgICAgICBlLnkgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlLnggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBlLnggPSBlLnBhZ2VYXHJcbiAgICAgICAgICAgIGUueSA9IGUucGFnZVlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gR2V0IG1vdXNlIHZhbHVlIGluIDAgdG8gMSByYW5nZSwgd2l0aCB5IGZsaXBwZWRcclxuICAgICAgICB0aGlzLm1vdXNlLnNldChlLnggLyB0aGlzLmdsLnJlbmRlcmVyLndpZHRoLCAxLjAgLSBlLnkgLyB0aGlzLmdsLnJlbmRlcmVyLmhlaWdodCk7XHJcblxyXG4gICAgICAgIC8vIENhbGN1bGF0ZSB2ZWxvY2l0eVxyXG4gICAgICAgIGlmICghdGhpcy5sYXN0VGltZSkge1xyXG4gICAgICAgICAgICAvLyBGaXJzdCBmcmFtZVxyXG4gICAgICAgICAgICB0aGlzLmxhc3RUaW1lID0gcGVyZm9ybWFuY2Uubm93KClcclxuICAgICAgICAgICAgdGhpcy5sYXN0TW91c2Uuc2V0KGUueCwgZS55KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGVsdGFYID0gZS54IC0gdGhpcy5sYXN0TW91c2UueFxyXG4gICAgICAgIGNvbnN0IGRlbHRhWSA9IGUueSAtIHRoaXMubGFzdE1vdXNlLnlcclxuXHJcbiAgICAgICAgdGhpcy5sYXN0TW91c2Uuc2V0KGUueCwgZS55KVxyXG5cclxuICAgICAgICBsZXQgdGltZSA9IHBlcmZvcm1hbmNlLm5vdygpXHJcblxyXG4gICAgICAgIC8vIEF2b2lkIGRpdmlkaW5nIGJ5IDBcclxuICAgICAgICBsZXQgZGVsdGEgPSBNYXRoLm1heCgxMC40LCB0aW1lIC0gdGhpcy5sYXN0VGltZSlcclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gdGltZVxyXG5cclxuICAgICAgICB0aGlzLnZlbG9jaXR5LnggPSBkZWx0YVggLyBkZWx0YVxyXG4gICAgICAgIHRoaXMudmVsb2NpdHkueSA9IGRlbHRhWSAvIGRlbHRhXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gRmxhZyB1cGRhdGUgdG8gcHJldmVudCBoYW5naW5nIHZlbG9jaXR5IHZhbHVlcyB3aGVuIG5vdCBtb3ZpbmdcclxuICAgICAgICB0aGlzLnZlbG9jaXR5Lm5lZWRzVXBkYXRlID0gdHJ1ZVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSh0KSB7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlKTtcclxuICAgIFxyXG4gICAgICAgIC8vIFJlc2V0IHZlbG9jaXR5IHdoZW4gbW91c2Ugbm90IG1vdmluZ1xyXG4gICAgICAgIGlmICghdGhpcy52ZWxvY2l0eS5uZWVkc1VwZGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlLnNldCgtMSlcclxuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eS5zZXQoMClcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICB0aGlzLnZlbG9jaXR5Lm5lZWRzVXBkYXRlID0gZmFsc2VcclxuICAgIFxyXG4gICAgICAgIC8vIFVwZGF0ZSBmbG93bWFwIGlucHV0c1xyXG4gICAgICAgIHRoaXMuZmxvd21hcC5hc3BlY3QgPSB0aGlzLmFzcGVjdFxyXG4gICAgICAgIHRoaXMuZmxvd21hcC5tb3VzZS5jb3B5KHRoaXMubW91c2UpXHJcbiAgICBcclxuICAgICAgICAvLyBFYXNlIHZlbG9jaXR5IGlucHV0LCBzbG93ZXIgd2hlbiBmYWRpbmcgb3V0XHJcbiAgICAgICAgdGhpcy5mbG93bWFwLnZlbG9jaXR5LmxlcnAodGhpcy52ZWxvY2l0eSwgdGhpcy52ZWxvY2l0eS5sZW4gPyAwLjE1IDogMC4xKVxyXG4gICAgICAgIHRoaXMuZmxvd21hcC51cGRhdGUoKVxyXG4gICAgXHJcbiAgICAgICAgdGhpcy5wcm9ncmFtLnVuaWZvcm1zLnVUaW1lLnZhbHVlID0gdCAqIDAuMDFcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcih7IHNjZW5lOiB0aGlzLm1lc2ggfSlcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKSB7XHJcbiAgICAgICAgdGhpcy5yQUYgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUpXHJcbiAgICB9XHJcblxyXG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoKSB7XHJcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5yQUYpXHJcbiAgICB9XHJcblxyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKVxyXG4gICAgICBcclxuICAgICAgICAvLyBDcmVhdGUgaGFuZGxlcnMgdG8gZ2V0IG1vdXNlIHBvc2l0aW9uIGFuZCB2ZWxvY2l0eVxyXG4gICAgICAgIGlmICh0aGlzLmlzVG91Y2hDYXBhYmxlKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLnVwZGF0ZU1vdXNlLCBmYWxzZSlcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgdGhpcy51cGRhdGVNb3VzZSwgeyBwYXNzaXZlOiBmYWxzZSB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMudXBkYXRlTW91c2UsIGZhbHNlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLnJlc2l6ZSwgZmFsc2UpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgICAgIHRoaXMuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5yQUYpXHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzVG91Y2hDYXBhYmxlKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLnVwZGF0ZU1vdXNlLCBmYWxzZSlcclxuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgdGhpcy51cGRhdGVNb3VzZSwgeyBwYXNzaXZlOiBmYWxzZSB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMudXBkYXRlTW91c2UsIGZhbHNlKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgcmVzaXplLCBmYWxzZSlcclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKVxyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVHZW9tZXRyeSgpXHJcbiAgICAgICAgdGhpcy5jcmVhdGVTaGFkZXJzKClcclxuICAgICAgICB0aGlzLmNyZWF0ZU1lc2goKVxyXG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKVxyXG4gICAgICAgIHRoaXMucmVzaXplKClcclxuICAgIH1cclxufSIsImV4cG9ydCBjb25zdCBvZ2w9ZnVuY3Rpb24oYSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gdChhKXtsZXQgYj1hWzBdLGM9YVsxXSxkPWFbMl07cmV0dXJuIE1hdGguc3FydChiKmIrYypjK2QqZCl9ZnVuY3Rpb24gdShhLGIpe3JldHVybiBhWzBdPWJbMF0sYVsxXT1iWzFdLGFbMl09YlsyXSxhfWZ1bmN0aW9uIHYoYSxiLGMpe3JldHVybiBhWzBdPWJbMF0rY1swXSxhWzFdPWJbMV0rY1sxXSxhWzJdPWJbMl0rY1syXSxhfWZ1bmN0aW9uIHcoYSxiLGMpe3JldHVybiBhWzBdPWJbMF0tY1swXSxhWzFdPWJbMV0tY1sxXSxhWzJdPWJbMl0tY1syXSxhfWZ1bmN0aW9uIHgoYSxiLGMpe3JldHVybiBhWzBdPWJbMF0qYyxhWzFdPWJbMV0qYyxhWzJdPWJbMl0qYyxhfWZ1bmN0aW9uIHkoYyxhKXtsZXQgZD1hWzBdLGU9YVsxXSxmPWFbMl0sYj1kKmQrZSplK2YqZjtyZXR1cm4gYj4wJiYoYj0xL01hdGguc3FydChiKSksY1swXT1hWzBdKmIsY1sxXT1hWzFdKmIsY1syXT1hWzJdKmIsY31mdW5jdGlvbiB6KGEsYil7cmV0dXJuIGFbMF0qYlswXSthWzFdKmJbMV0rYVsyXSpiWzJdfWxldCBBPWZ1bmN0aW9uKCl7bGV0IGE9WzAsMCwwXSxiPVswLDAsMF07cmV0dXJuIGZ1bmN0aW9uKGQsZSl7dShhLGQpLHUoYixlKSx5KGEsYSkseShiLGIpO2xldCBjPXooYSxiKTtyZXR1cm4gYz4xPzA6YzwgLTE/TWF0aC5QSTpNYXRoLmFjb3MoYyl9fSgpO2NsYXNzIGIgZXh0ZW5kcyBBcnJheXtjb25zdHJ1Y3RvcihhPTAsYj1hLGM9YSl7cmV0dXJuIHN1cGVyKGEsYixjKSx0aGlzfWdldCB4KCl7cmV0dXJuIHRoaXNbMF19c2V0IHgoYSl7dGhpc1swXT1hfWdldCB5KCl7cmV0dXJuIHRoaXNbMV19c2V0IHkoYSl7dGhpc1sxXT1hfWdldCB6KCl7cmV0dXJuIHRoaXNbMl19c2V0IHooYSl7dGhpc1syXT1hfXNldChhLGY9YSxnPWEpe3ZhciBiLGMsZCxlO3JldHVybiBhLmxlbmd0aD90aGlzLmNvcHkoYSk6KGI9dGhpcyxjPWEsZD1mLGU9ZyxiWzBdPWMsYlsxXT1kLGJbMl09ZSx0aGlzKX1jb3B5KGEpe3JldHVybiB1KHRoaXMsYSksdGhpc31hZGQoYSxiKXtyZXR1cm4gYj92KHRoaXMsYSxiKTp2KHRoaXMsdGhpcyxhKSx0aGlzfXN1YihhLGIpe3JldHVybiBiP3codGhpcyxhLGIpOncodGhpcyx0aGlzLGEpLHRoaXN9bXVsdGlwbHkoYyl7dmFyIGQsYSxiO3JldHVybiBjLmxlbmd0aD8oYT10aGlzLGI9YywoZD10aGlzKVswXT1hWzBdKmJbMF0sZFsxXT1hWzFdKmJbMV0sZFsyXT1hWzJdKmJbMl0pOngodGhpcyx0aGlzLGMpLHRoaXN9ZGl2aWRlKGMpe3ZhciBkLGEsYjtyZXR1cm4gYy5sZW5ndGg/KGE9dGhpcyxiPWMsKGQ9dGhpcylbMF09YVswXS9iWzBdLGRbMV09YVsxXS9iWzFdLGRbMl09YVsyXS9iWzJdKTp4KHRoaXMsdGhpcywxL2MpLHRoaXN9aW52ZXJzZShjPXRoaXMpe3ZhciBiLGE7cmV0dXJuIGE9YywoYj10aGlzKVswXT0xL2FbMF0sYlsxXT0xL2FbMV0sYlsyXT0xL2FbMl0sdGhpc31sZW4oKXtyZXR1cm4gdCh0aGlzKX1kaXN0YW5jZShmKXt2YXIgYSxiO2xldCBjLGQsZTtyZXR1cm4gZj8oYT10aGlzLGM9KGI9ZilbMF0tYVswXSxkPWJbMV0tYVsxXSxlPWJbMl0tYVsyXSxNYXRoLnNxcnQoYypjK2QqZCtlKmUpKTp0KHRoaXMpfXNxdWFyZWRMZW4oKXtyZXR1cm4gdGhpcy5zcXVhcmVkRGlzdGFuY2UoKX1zcXVhcmVkRGlzdGFuY2Uoail7dmFyIGEsYyxiO2xldCBkLGUsZixnLGgsaTtyZXR1cm4gaj8oYT10aGlzLGQ9KGM9ailbMF0tYVswXSxlPWNbMV0tYVsxXSxmPWNbMl0tYVsyXSxkKmQrZSplK2YqZik6KGI9dGhpcyxnPWJbMF0saD1iWzFdLGk9YlsyXSxnKmcraCpoK2kqaSl9bmVnYXRlKGM9dGhpcyl7dmFyIGIsYTtyZXR1cm4gYT1jLChiPXRoaXMpWzBdPS1hWzBdLGJbMV09LWFbMV0sYlsyXT0tYVsyXSx0aGlzfWNyb3NzKGosayl7dmFyIGEsYixjO2xldCBkLGUsZixnLGgsaTtyZXR1cm4gYT10aGlzLGI9aixjPWssZD1iWzBdLGU9YlsxXSxmPWJbMl0sZz1jWzBdLGg9Y1sxXSxpPWNbMl0sYVswXT1lKmktZipoLGFbMV09ZipnLWQqaSxhWzJdPWQqaC1lKmcsdGhpc31zY2FsZShhKXtyZXR1cm4geCh0aGlzLHRoaXMsYSksdGhpc31ub3JtYWxpemUoKXtyZXR1cm4geSh0aGlzLHRoaXMpLHRoaXN9ZG90KGEpe3JldHVybiB6KHRoaXMsYSl9ZXF1YWxzKGMpe3ZhciBiLGE7cmV0dXJuIGE9YywoYj10aGlzKVswXT09PWFbMF0mJmJbMV09PT1hWzFdJiZiWzJdPT09YVsyXX1hcHBseU1hdHJpeDQoaCl7dmFyIGYsZyxhO2xldCBjLGQsZSxiO3JldHVybiBmPXRoaXMsZz10aGlzLGE9aCxjPWdbMF0sZD1nWzFdLGU9Z1syXSxiPWFbM10qYythWzddKmQrYVsxMV0qZSthWzE1XSxiPWJ8fDEsZlswXT0oYVswXSpjK2FbNF0qZCthWzhdKmUrYVsxMl0pL2IsZlsxXT0oYVsxXSpjK2FbNV0qZCthWzldKmUrYVsxM10pL2IsZlsyXT0oYVsyXSpjK2FbNl0qZCthWzEwXSplK2FbMTRdKS9iLHRoaXN9YXBwbHlRdWF0ZXJuaW9uKHEpe3ZhciBoLGksYTtsZXQgaixrLGwsYixjLGQsZSxmLGcsbixvLHAsbTtyZXR1cm4gaD10aGlzLGk9dGhpcyxhPXEsaj1pWzBdLGs9aVsxXSxsPWlbMl0sYj1hWzBdLGM9YVsxXSxkPWFbMl0sZT1jKmwtZCprLGY9ZCpqLWIqbCxnPWIqay1jKmosbj1jKmctZCpmLG89ZCplLWIqZyxwPWIqZi1jKmUsbT0yKmFbM10sZSo9bSxmKj1tLGcqPW0sbio9MixvKj0yLHAqPTIsaFswXT1qK2UrbixoWzFdPWsrZitvLGhbMl09bCtnK3AsdGhpc31hbmdsZShhKXtyZXR1cm4gQSh0aGlzLGEpfWxlcnAoaCxpKXt2YXIgYSxiLGMsZDtsZXQgZSxmLGc7cmV0dXJuIGE9dGhpcyxiPXRoaXMsYz1oLGQ9aSxlPWJbMF0sZj1iWzFdLGc9YlsyXSxhWzBdPWUrZCooY1swXS1lKSxhWzFdPWYrZCooY1sxXS1mKSxhWzJdPWcrZCooY1syXS1nKSx0aGlzfWNsb25lKCl7cmV0dXJuIG5ldyBiKHRoaXNbMF0sdGhpc1sxXSx0aGlzWzJdKX1mcm9tQXJyYXkoYSxiPTApe3JldHVybiB0aGlzWzBdPWFbYl0sdGhpc1sxXT1hW2IrMV0sdGhpc1syXT1hW2IrMl0sdGhpc310b0FycmF5KGE9W10sYj0wKXtyZXR1cm4gYVtiXT10aGlzWzBdLGFbYisxXT10aGlzWzFdLGFbYisyXT10aGlzWzJdLGF9dHJhbnNmb3JtRGlyZWN0aW9uKGEpe2xldCBiPXRoaXNbMF0sYz10aGlzWzFdLGQ9dGhpc1syXTtyZXR1cm4gdGhpc1swXT1hWzBdKmIrYVs0XSpjK2FbOF0qZCx0aGlzWzFdPWFbMV0qYithWzVdKmMrYVs5XSpkLHRoaXNbMl09YVsyXSpiK2FbNl0qYythWzEwXSpkLHRoaXMubm9ybWFsaXplKCl9fWxldCBCPW5ldyBiLEM9MCxEPTA7Y2xhc3MgZntjb25zdHJ1Y3RvcihjLGE9e30pe2ZvcihsZXQgYiBpbiB0aGlzLmdsPWMsdGhpcy5hdHRyaWJ1dGVzPWEsdGhpcy5pZD1DKyssdGhpcy5WQU9zPXt9LHRoaXMuZHJhd1JhbmdlPXtzdGFydDowLGNvdW50OjB9LHRoaXMuaW5zdGFuY2VkQ291bnQ9MCx0aGlzLmdsLnJlbmRlcmVyLmJpbmRWZXJ0ZXhBcnJheShudWxsKSx0aGlzLmdsLnJlbmRlcmVyLmN1cnJlbnRHZW9tZXRyeT1udWxsLHRoaXMuZ2xTdGF0ZT10aGlzLmdsLnJlbmRlcmVyLnN0YXRlLGEpdGhpcy5hZGRBdHRyaWJ1dGUoYixhW2JdKX1hZGRBdHRyaWJ1dGUoYixhKXtpZih0aGlzLmF0dHJpYnV0ZXNbYl09YSxhLmlkPUQrKyxhLnNpemU9YS5zaXplfHwxLGEudHlwZT1hLnR5cGV8fChhLmRhdGEuY29uc3RydWN0b3I9PT1GbG9hdDMyQXJyYXk/dGhpcy5nbC5GTE9BVDphLmRhdGEuY29uc3RydWN0b3I9PT1VaW50MTZBcnJheT90aGlzLmdsLlVOU0lHTkVEX1NIT1JUOnRoaXMuZ2wuVU5TSUdORURfSU5UKSxhLnRhcmdldD1cImluZGV4XCI9PT1iP3RoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVI6dGhpcy5nbC5BUlJBWV9CVUZGRVIsYS5ub3JtYWxpemU9YS5ub3JtYWxpemV8fCExLGEuYnVmZmVyPXRoaXMuZ2wuY3JlYXRlQnVmZmVyKCksYS5jb3VudD1hLmRhdGEubGVuZ3RoL2Euc2l6ZSxhLmRpdmlzb3I9YS5pbnN0YW5jZWR8fDAsYS5uZWVkc1VwZGF0ZT0hMSx0aGlzLnVwZGF0ZUF0dHJpYnV0ZShhKSxhLmRpdmlzb3Ipe2lmKHRoaXMuaXNJbnN0YW5jZWQ9ITAsdGhpcy5pbnN0YW5jZWRDb3VudCYmdGhpcy5pbnN0YW5jZWRDb3VudCE9PWEuY291bnQqYS5kaXZpc29yKXJldHVybiBjb25zb2xlLndhcm4oXCJnZW9tZXRyeSBoYXMgbXVsdGlwbGUgaW5zdGFuY2VkIGJ1ZmZlcnMgb2YgZGlmZmVyZW50IGxlbmd0aFwiKSx0aGlzLmluc3RhbmNlZENvdW50PU1hdGgubWluKHRoaXMuaW5zdGFuY2VkQ291bnQsYS5jb3VudCphLmRpdmlzb3IpO3RoaXMuaW5zdGFuY2VkQ291bnQ9YS5jb3VudCphLmRpdmlzb3J9ZWxzZVwiaW5kZXhcIj09PWI/dGhpcy5kcmF3UmFuZ2UuY291bnQ9YS5jb3VudDp0aGlzLmF0dHJpYnV0ZXMuaW5kZXh8fCh0aGlzLmRyYXdSYW5nZS5jb3VudD1NYXRoLm1heCh0aGlzLmRyYXdSYW5nZS5jb3VudCxhLmNvdW50KSl9dXBkYXRlQXR0cmlidXRlKGEpe3RoaXMuZ2xTdGF0ZS5ib3VuZEJ1ZmZlciE9PWEuaWQmJih0aGlzLmdsLmJpbmRCdWZmZXIoYS50YXJnZXQsYS5idWZmZXIpLHRoaXMuZ2xTdGF0ZS5ib3VuZEJ1ZmZlcj1hLmlkKSx0aGlzLmdsLmJ1ZmZlckRhdGEoYS50YXJnZXQsYS5kYXRhLHRoaXMuZ2wuU1RBVElDX0RSQVcpLGEubmVlZHNVcGRhdGU9ITF9c2V0SW5kZXgoYSl7dGhpcy5hZGRBdHRyaWJ1dGUoXCJpbmRleFwiLGEpfXNldERyYXdSYW5nZShhLGIpe3RoaXMuZHJhd1JhbmdlLnN0YXJ0PWEsdGhpcy5kcmF3UmFuZ2UuY291bnQ9Yn1zZXRJbnN0YW5jZWRDb3VudChhKXt0aGlzLmluc3RhbmNlZENvdW50PWF9Y3JlYXRlVkFPKGEpe3RoaXMuVkFPc1thLmF0dHJpYnV0ZU9yZGVyXT10aGlzLmdsLnJlbmRlcmVyLmNyZWF0ZVZlcnRleEFycmF5KCksdGhpcy5nbC5yZW5kZXJlci5iaW5kVmVydGV4QXJyYXkodGhpcy5WQU9zW2EuYXR0cmlidXRlT3JkZXJdKSx0aGlzLmJpbmRBdHRyaWJ1dGVzKGEpfWJpbmRBdHRyaWJ1dGVzKGEpe2EuYXR0cmlidXRlTG9jYXRpb25zLmZvckVhY2goKGIsYyk9PntpZighdGhpcy5hdHRyaWJ1dGVzW2NdKXJldHVybiB2b2lkIGNvbnNvbGUud2FybihgYWN0aXZlIGF0dHJpYnV0ZSAke2N9IG5vdCBiZWluZyBzdXBwbGllZGApO2xldCBhPXRoaXMuYXR0cmlidXRlc1tjXTt0aGlzLmdsLmJpbmRCdWZmZXIoYS50YXJnZXQsYS5idWZmZXIpLHRoaXMuZ2xTdGF0ZS5ib3VuZEJ1ZmZlcj1hLmlkLHRoaXMuZ2wudmVydGV4QXR0cmliUG9pbnRlcihiLGEuc2l6ZSxhLnR5cGUsYS5ub3JtYWxpemUsMCwwKSx0aGlzLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGIpLHRoaXMuZ2wucmVuZGVyZXIudmVydGV4QXR0cmliRGl2aXNvcihiLGEuZGl2aXNvcil9KSx0aGlzLmF0dHJpYnV0ZXMuaW5kZXgmJnRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLHRoaXMuYXR0cmlidXRlcy5pbmRleC5idWZmZXIpfWRyYXcoe3Byb2dyYW06YSxtb2RlOmI9dGhpcy5nbC5UUklBTkdMRVN9KXt0aGlzLmdsLnJlbmRlcmVyLmN1cnJlbnRHZW9tZXRyeSE9PWAke3RoaXMuaWR9XyR7YS5hdHRyaWJ1dGVPcmRlcn1gJiYodGhpcy5WQU9zW2EuYXR0cmlidXRlT3JkZXJdfHx0aGlzLmNyZWF0ZVZBTyhhKSx0aGlzLmdsLnJlbmRlcmVyLmJpbmRWZXJ0ZXhBcnJheSh0aGlzLlZBT3NbYS5hdHRyaWJ1dGVPcmRlcl0pLHRoaXMuZ2wucmVuZGVyZXIuY3VycmVudEdlb21ldHJ5PWAke3RoaXMuaWR9XyR7YS5hdHRyaWJ1dGVPcmRlcn1gKSxhLmF0dHJpYnV0ZUxvY2F0aW9ucy5mb3JFYWNoKChjLGIpPT57bGV0IGE9dGhpcy5hdHRyaWJ1dGVzW2JdO2EubmVlZHNVcGRhdGUmJnRoaXMudXBkYXRlQXR0cmlidXRlKGEpfSksdGhpcy5pc0luc3RhbmNlZD90aGlzLmF0dHJpYnV0ZXMuaW5kZXg/dGhpcy5nbC5yZW5kZXJlci5kcmF3RWxlbWVudHNJbnN0YW5jZWQoYix0aGlzLmRyYXdSYW5nZS5jb3VudCx0aGlzLmF0dHJpYnV0ZXMuaW5kZXgudHlwZSx0aGlzLmRyYXdSYW5nZS5zdGFydCx0aGlzLmluc3RhbmNlZENvdW50KTp0aGlzLmdsLnJlbmRlcmVyLmRyYXdBcnJheXNJbnN0YW5jZWQoYix0aGlzLmRyYXdSYW5nZS5zdGFydCx0aGlzLmRyYXdSYW5nZS5jb3VudCx0aGlzLmluc3RhbmNlZENvdW50KTp0aGlzLmF0dHJpYnV0ZXMuaW5kZXg/dGhpcy5nbC5kcmF3RWxlbWVudHMoYix0aGlzLmRyYXdSYW5nZS5jb3VudCx0aGlzLmF0dHJpYnV0ZXMuaW5kZXgudHlwZSx0aGlzLmRyYXdSYW5nZS5zdGFydCk6dGhpcy5nbC5kcmF3QXJyYXlzKGIsdGhpcy5kcmF3UmFuZ2Uuc3RhcnQsdGhpcy5kcmF3UmFuZ2UuY291bnQpfWNvbXB1dGVCb3VuZGluZ0JveChkKXshZCYmdGhpcy5hdHRyaWJ1dGVzLnBvc2l0aW9uJiYoZD10aGlzLmF0dHJpYnV0ZXMucG9zaXRpb24uZGF0YSksZHx8Y29uc29sZS53YXJuKFwiTm8gcG9zaXRpb24gYnVmZmVyIGZvdW5kIHRvIGNvbXB1dGUgYm91bmRzXCIpLHRoaXMuYm91bmRzfHwodGhpcy5ib3VuZHM9e21pbjpuZXcgYixtYXg6bmV3IGIsY2VudGVyOm5ldyBiLHNjYWxlOm5ldyBiLHJhZGl1czoxLzB9KTtsZXQgYT10aGlzLmJvdW5kcy5taW4sYz10aGlzLmJvdW5kcy5tYXgsaT10aGlzLmJvdW5kcy5jZW50ZXIsaj10aGlzLmJvdW5kcy5zY2FsZTthLnNldCgxLzApLGMuc2V0KC0xLzApO2ZvcihsZXQgZT0wLGs9ZC5sZW5ndGg7ZTxrO2UrPTMpe2xldCBmPWRbZV0sZz1kW2UrMV0saD1kW2UrMl07YS54PU1hdGgubWluKGYsYS54KSxhLnk9TWF0aC5taW4oZyxhLnkpLGEuej1NYXRoLm1pbihoLGEueiksYy54PU1hdGgubWF4KGYsYy54KSxjLnk9TWF0aC5tYXgoZyxjLnkpLGMuej1NYXRoLm1heChoLGMueil9ai5zdWIoYyxhKSxpLmFkZChhLGMpLmRpdmlkZSgyKX1jb21wdXRlQm91bmRpbmdTcGhlcmUoYSl7IWEmJnRoaXMuYXR0cmlidXRlcy5wb3NpdGlvbiYmKGE9dGhpcy5hdHRyaWJ1dGVzLnBvc2l0aW9uLmRhdGEpLGF8fGNvbnNvbGUud2FybihcIk5vIHBvc2l0aW9uIGJ1ZmZlciBmb3VuZCB0byBjb21wdXRlIGJvdW5kc1wiKSx0aGlzLmJvdW5kc3x8dGhpcy5jb21wdXRlQm91bmRpbmdCb3goYSk7bGV0IGI9MDtmb3IobGV0IGM9MCxkPWEubGVuZ3RoO2M8ZDtjKz0zKUIuZnJvbUFycmF5KGEsYyksYj1NYXRoLm1heChiLHRoaXMuYm91bmRzLmNlbnRlci5zcXVhcmVkRGlzdGFuY2UoQikpO3RoaXMuYm91bmRzLnJhZGl1cz1NYXRoLnNxcnQoYil9cmVtb3ZlKCl7Zm9yKGxldCBhIGluIHRoaXMudmFvJiZ0aGlzLmdsLnJlbmRlcmVyLmRlbGV0ZVZlcnRleEFycmF5KHRoaXMudmFvKSx0aGlzLmF0dHJpYnV0ZXMpdGhpcy5nbC5kZWxldGVCdWZmZXIodGhpcy5hdHRyaWJ1dGVzW2FdLmJ1ZmZlciksZGVsZXRlIHRoaXMuYXR0cmlidXRlc1thXX19bGV0IEU9MCxGPXt9O2NsYXNzIGh7Y29uc3RydWN0b3IoYSx7dmVydGV4OmYsZnJhZ21lbnQ6Zyx1bmlmb3JtczptPXt9LHRyYW5zcGFyZW50Om49ITEsY3VsbEZhY2U6bz1hLkJBQ0ssZnJvbnRGYWNlOnA9YS5DQ1csZGVwdGhUZXN0OnE9ITAsZGVwdGhXcml0ZTpyPSEwLGRlcHRoRnVuYzpzPWEuTEVTU309e30pe3RoaXMuZ2w9YSx0aGlzLnVuaWZvcm1zPW0sdGhpcy5pZD1FKyssZnx8Y29uc29sZS53YXJuKFwidmVydGV4IHNoYWRlciBub3Qgc3VwcGxpZWRcIiksZ3x8Y29uc29sZS53YXJuKFwiZnJhZ21lbnQgc2hhZGVyIG5vdCBzdXBwbGllZFwiKSx0aGlzLnRyYW5zcGFyZW50PW4sdGhpcy5jdWxsRmFjZT1vLHRoaXMuZnJvbnRGYWNlPXAsdGhpcy5kZXB0aFRlc3Q9cSx0aGlzLmRlcHRoV3JpdGU9cix0aGlzLmRlcHRoRnVuYz1zLHRoaXMuYmxlbmRGdW5jPXt9LHRoaXMuYmxlbmRFcXVhdGlvbj17fSx0aGlzLnRyYW5zcGFyZW50JiYhdGhpcy5ibGVuZEZ1bmMuc3JjJiYodGhpcy5nbC5yZW5kZXJlci5wcmVtdWx0aXBsaWVkQWxwaGE/dGhpcy5zZXRCbGVuZEZ1bmModGhpcy5nbC5PTkUsdGhpcy5nbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTp0aGlzLnNldEJsZW5kRnVuYyh0aGlzLmdsLlNSQ19BTFBIQSx0aGlzLmdsLk9ORV9NSU5VU19TUkNfQUxQSEEpKTtsZXQgZD1hLmNyZWF0ZVNoYWRlcihhLlZFUlRFWF9TSEFERVIpO2Euc2hhZGVyU291cmNlKGQsZiksYS5jb21waWxlU2hhZGVyKGQpLFwiXCIhPT1hLmdldFNoYWRlckluZm9Mb2coZCkmJmNvbnNvbGUud2FybihgJHthLmdldFNoYWRlckluZm9Mb2coZCl9XHJcblZlcnRleCBTaGFkZXJcclxuJHtIKGYpfWApO2xldCBlPWEuY3JlYXRlU2hhZGVyKGEuRlJBR01FTlRfU0hBREVSKTtpZihhLnNoYWRlclNvdXJjZShlLGcpLGEuY29tcGlsZVNoYWRlcihlKSxcIlwiIT09YS5nZXRTaGFkZXJJbmZvTG9nKGUpJiZjb25zb2xlLndhcm4oYCR7YS5nZXRTaGFkZXJJbmZvTG9nKGUpfVxyXG5GcmFnbWVudCBTaGFkZXJcclxuJHtIKGcpfWApLHRoaXMucHJvZ3JhbT1hLmNyZWF0ZVByb2dyYW0oKSxhLmF0dGFjaFNoYWRlcih0aGlzLnByb2dyYW0sZCksYS5hdHRhY2hTaGFkZXIodGhpcy5wcm9ncmFtLGUpLGEubGlua1Byb2dyYW0odGhpcy5wcm9ncmFtKSwhYS5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMucHJvZ3JhbSxhLkxJTktfU1RBVFVTKSlyZXR1cm4gY29uc29sZS53YXJuKGEuZ2V0UHJvZ3JhbUluZm9Mb2codGhpcy5wcm9ncmFtKSk7YS5kZWxldGVTaGFkZXIoZCksYS5kZWxldGVTaGFkZXIoZSksdGhpcy51bmlmb3JtTG9jYXRpb25zPW5ldyBNYXA7bGV0IHQ9YS5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMucHJvZ3JhbSxhLkFDVElWRV9VTklGT1JNUyk7Zm9yKGxldCBoPTA7aDx0O2grKyl7bGV0IGI9YS5nZXRBY3RpdmVVbmlmb3JtKHRoaXMucHJvZ3JhbSxoKTt0aGlzLnVuaWZvcm1Mb2NhdGlvbnMuc2V0KGIsYS5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5wcm9ncmFtLGIubmFtZSkpO2xldCBjPWIubmFtZS5tYXRjaCgvKFxcdyspL2cpO2IudW5pZm9ybU5hbWU9Y1swXSwzPT09Yy5sZW5ndGg/KGIuaXNTdHJ1Y3RBcnJheT0hMCxiLnN0cnVjdEluZGV4PU51bWJlcihjWzFdKSxiLnN0cnVjdFByb3BlcnR5PWNbMl0pOjI9PT1jLmxlbmd0aCYmaXNOYU4oTnVtYmVyKGNbMV0pKSYmKGIuaXNTdHJ1Y3Q9ITAsYi5zdHJ1Y3RQcm9wZXJ0eT1jWzFdKX10aGlzLmF0dHJpYnV0ZUxvY2F0aW9ucz1uZXcgTWFwO2xldCBrPVtdLHU9YS5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMucHJvZ3JhbSxhLkFDVElWRV9BVFRSSUJVVEVTKTtmb3IobGV0IGk9MDtpPHU7aSsrKXtsZXQgaj1hLmdldEFjdGl2ZUF0dHJpYih0aGlzLnByb2dyYW0saSksbD1hLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMucHJvZ3JhbSxqLm5hbWUpO2tbbF09ai5uYW1lLHRoaXMuYXR0cmlidXRlTG9jYXRpb25zLnNldChqLm5hbWUsbCl9dGhpcy5hdHRyaWJ1dGVPcmRlcj1rLmpvaW4oXCJcIil9c2V0QmxlbmRGdW5jKGEsYixjLGQpe3RoaXMuYmxlbmRGdW5jLnNyYz1hLHRoaXMuYmxlbmRGdW5jLmRzdD1iLHRoaXMuYmxlbmRGdW5jLnNyY0FscGhhPWMsdGhpcy5ibGVuZEZ1bmMuZHN0QWxwaGE9ZCxhJiYodGhpcy50cmFuc3BhcmVudD0hMCl9c2V0QmxlbmRFcXVhdGlvbihhLGIpe3RoaXMuYmxlbmRFcXVhdGlvbi5tb2RlUkdCPWEsdGhpcy5ibGVuZEVxdWF0aW9uLm1vZGVBbHBoYT1ifWFwcGx5U3RhdGUoKXt0aGlzLmRlcHRoVGVzdD90aGlzLmdsLnJlbmRlcmVyLmVuYWJsZSh0aGlzLmdsLkRFUFRIX1RFU1QpOnRoaXMuZ2wucmVuZGVyZXIuZGlzYWJsZSh0aGlzLmdsLkRFUFRIX1RFU1QpLHRoaXMuY3VsbEZhY2U/dGhpcy5nbC5yZW5kZXJlci5lbmFibGUodGhpcy5nbC5DVUxMX0ZBQ0UpOnRoaXMuZ2wucmVuZGVyZXIuZGlzYWJsZSh0aGlzLmdsLkNVTExfRkFDRSksdGhpcy5ibGVuZEZ1bmMuc3JjP3RoaXMuZ2wucmVuZGVyZXIuZW5hYmxlKHRoaXMuZ2wuQkxFTkQpOnRoaXMuZ2wucmVuZGVyZXIuZGlzYWJsZSh0aGlzLmdsLkJMRU5EKSx0aGlzLmN1bGxGYWNlJiZ0aGlzLmdsLnJlbmRlcmVyLnNldEN1bGxGYWNlKHRoaXMuY3VsbEZhY2UpLHRoaXMuZ2wucmVuZGVyZXIuc2V0RnJvbnRGYWNlKHRoaXMuZnJvbnRGYWNlKSx0aGlzLmdsLnJlbmRlcmVyLnNldERlcHRoTWFzayh0aGlzLmRlcHRoV3JpdGUpLHRoaXMuZ2wucmVuZGVyZXIuc2V0RGVwdGhGdW5jKHRoaXMuZGVwdGhGdW5jKSx0aGlzLmJsZW5kRnVuYy5zcmMmJnRoaXMuZ2wucmVuZGVyZXIuc2V0QmxlbmRGdW5jKHRoaXMuYmxlbmRGdW5jLnNyYyx0aGlzLmJsZW5kRnVuYy5kc3QsdGhpcy5ibGVuZEZ1bmMuc3JjQWxwaGEsdGhpcy5ibGVuZEZ1bmMuZHN0QWxwaGEpLHRoaXMuYmxlbmRFcXVhdGlvbi5tb2RlUkdCJiZ0aGlzLmdsLnJlbmRlcmVyLnNldEJsZW5kRXF1YXRpb24odGhpcy5ibGVuZEVxdWF0aW9uLm1vZGVSR0IsdGhpcy5ibGVuZEVxdWF0aW9uLm1vZGVBbHBoYSl9dXNlKHtmbGlwRmFjZXM6YT0hMX09e30pe2xldCBiPS0xO3RoaXMuZ2wucmVuZGVyZXIuY3VycmVudFByb2dyYW09PT10aGlzLmlkfHwodGhpcy5nbC51c2VQcm9ncmFtKHRoaXMucHJvZ3JhbSksdGhpcy5nbC5yZW5kZXJlci5jdXJyZW50UHJvZ3JhbT10aGlzLmlkKSx0aGlzLnVuaWZvcm1Mb2NhdGlvbnMuZm9yRWFjaCgoZSxjKT0+e2xldCBkPWMudW5pZm9ybU5hbWUsYT10aGlzLnVuaWZvcm1zW2RdO2lmKGMuaXNTdHJ1Y3QmJihhPWFbYy5zdHJ1Y3RQcm9wZXJ0eV0sZCs9YC4ke2Muc3RydWN0UHJvcGVydHl9YCksYy5pc1N0cnVjdEFycmF5JiYoYT1hW2Muc3RydWN0SW5kZXhdW2Muc3RydWN0UHJvcGVydHldLGQrPWBbJHtjLnN0cnVjdEluZGV4fV0uJHtjLnN0cnVjdFByb3BlcnR5fWApLCFhKXJldHVybiBKKGBBY3RpdmUgdW5pZm9ybSAke2R9IGhhcyBub3QgYmVlbiBzdXBwbGllZGApO2lmKGEmJiB2b2lkIDA9PT1hLnZhbHVlKXJldHVybiBKKGAke2R9IHVuaWZvcm0gaXMgbWlzc2luZyBhIHZhbHVlIHBhcmFtZXRlcmApO2lmKGEudmFsdWUudGV4dHVyZSlyZXR1cm4gYis9MSxhLnZhbHVlLnVwZGF0ZShiKSxHKHRoaXMuZ2wsYy50eXBlLGUsYik7aWYoYS52YWx1ZS5sZW5ndGgmJmEudmFsdWVbMF0udGV4dHVyZSl7bGV0IGY9W107cmV0dXJuIGEudmFsdWUuZm9yRWFjaChhPT57Yis9MSxhLnVwZGF0ZShiKSxmLnB1c2goYil9KSxHKHRoaXMuZ2wsYy50eXBlLGUsZil9Ryh0aGlzLmdsLGMudHlwZSxlLGEudmFsdWUpfSksdGhpcy5hcHBseVN0YXRlKCksYSYmdGhpcy5nbC5yZW5kZXJlci5zZXRGcm9udEZhY2UodGhpcy5mcm9udEZhY2U9PT10aGlzLmdsLkNDVz90aGlzLmdsLkNXOnRoaXMuZ2wuQ0NXKX1yZW1vdmUoKXt0aGlzLmdsLmRlbGV0ZVByb2dyYW0odGhpcy5wcm9ncmFtKX19ZnVuY3Rpb24gRyhiLGUsYyxhKXthPWEubGVuZ3RoP2Z1bmN0aW9uKGEpe2xldCBmPWEubGVuZ3RoLGQ9YVswXS5sZW5ndGg7aWYodm9pZCAwPT09ZClyZXR1cm4gYTtsZXQgZT1mKmQsYj1GW2VdO2J8fChGW2VdPWI9bmV3IEZsb2F0MzJBcnJheShlKSk7Zm9yKGxldCBjPTA7YzxmO2MrKyliLnNldChhW2NdLGMqZCk7cmV0dXJuIGJ9KGEpOmE7bGV0IGQ9Yi5yZW5kZXJlci5zdGF0ZS51bmlmb3JtTG9jYXRpb25zLmdldChjKTtpZihhLmxlbmd0aCl7aWYodm9pZCAwPT09ZCliLnJlbmRlcmVyLnN0YXRlLnVuaWZvcm1Mb2NhdGlvbnMuc2V0KGMsYS5zbGljZSgwKSk7ZWxzZXtpZihmdW5jdGlvbihiLGMpe2lmKGIubGVuZ3RoIT09Yy5sZW5ndGgpcmV0dXJuITE7Zm9yKGxldCBhPTAsZD1iLmxlbmd0aDthPGQ7YSsrKWlmKGJbYV0hPT1jW2FdKXJldHVybiExO3JldHVybiEwfShkLGEpKXJldHVybjtkLnNldChhKSxiLnJlbmRlcmVyLnN0YXRlLnVuaWZvcm1Mb2NhdGlvbnMuc2V0KGMsZCl9fWVsc2V7aWYoZD09PWEpcmV0dXJuO2IucmVuZGVyZXIuc3RhdGUudW5pZm9ybUxvY2F0aW9ucy5zZXQoYyxhKX1zd2l0Y2goZSl7Y2FzZSA1MTI2OnJldHVybiBhLmxlbmd0aD9iLnVuaWZvcm0xZnYoYyxhKTpiLnVuaWZvcm0xZihjLGEpO2Nhc2UgMzU2NjQ6cmV0dXJuIGIudW5pZm9ybTJmdihjLGEpO2Nhc2UgMzU2NjU6cmV0dXJuIGIudW5pZm9ybTNmdihjLGEpO2Nhc2UgMzU2NjY6cmV0dXJuIGIudW5pZm9ybTRmdihjLGEpO2Nhc2UgMzU2NzA6Y2FzZSA1MTI0OmNhc2UgMzU2Nzg6Y2FzZSAzNTY4MDpyZXR1cm4gYS5sZW5ndGg/Yi51bmlmb3JtMWl2KGMsYSk6Yi51bmlmb3JtMWkoYyxhKTtjYXNlIDM1NjcxOmNhc2UgMzU2Njc6cmV0dXJuIGIudW5pZm9ybTJpdihjLGEpO2Nhc2UgMzU2NzI6Y2FzZSAzNTY2ODpyZXR1cm4gYi51bmlmb3JtM2l2KGMsYSk7Y2FzZSAzNTY3MzpjYXNlIDM1NjY5OnJldHVybiBiLnVuaWZvcm00aXYoYyxhKTtjYXNlIDM1Njc0OnJldHVybiBiLnVuaWZvcm1NYXRyaXgyZnYoYywhMSxhKTtjYXNlIDM1Njc1OnJldHVybiBiLnVuaWZvcm1NYXRyaXgzZnYoYywhMSxhKTtjYXNlIDM1Njc2OnJldHVybiBiLnVuaWZvcm1NYXRyaXg0ZnYoYywhMSxhKX19ZnVuY3Rpb24gSChjKXtsZXQgYj1jLnNwbGl0KFwiXFxuXCIpO2ZvcihsZXQgYT0wO2E8Yi5sZW5ndGg7YSsrKWJbYV09YSsxK1wiOiBcIitiW2FdO3JldHVybiBiLmpvaW4oXCJcXG5cIil9bGV0IEk9MDtmdW5jdGlvbiBKKGEpe0k+MTAwfHwoY29uc29sZS53YXJuKGEpLCsrST4xMDAmJmNvbnNvbGUud2FybihcIk1vcmUgdGhhbiAxMDAgcHJvZ3JhbSB3YXJuaW5ncyAtIHN0b3BwaW5nIGxvZ3MuXCIpKX1sZXQgSz1uZXcgYjtmdW5jdGlvbiBpKGEsYil7cmV0dXJuIGFbMF09YlswXSxhWzFdPWJbMV0sYVsyXT1iWzJdLGFbM109YlszXSxhfWZ1bmN0aW9uIGooYSxiLGMsZCxlKXtyZXR1cm4gYVswXT1iLGFbMV09YyxhWzJdPWQsYVszXT1lLGF9ZnVuY3Rpb24gayhiLGMpe2xldCBkPWNbMF0sZT1jWzFdLGY9Y1syXSxnPWNbM10sYT1kKmQrZSplK2YqZitnKmc7cmV0dXJuIGE+MCYmKGE9MS9NYXRoLnNxcnQoYSkpLGJbMF09ZCphLGJbMV09ZSphLGJbMl09ZiphLGJbM109ZyphLGJ9ZnVuY3Rpb24gTChhLGIsYyl7bGV0IGQ9YlswXSxlPWJbMV0sZj1iWzJdLGc9YlszXSxoPWNbMF0saT1jWzFdLGo9Y1syXSxrPWNbM107cmV0dXJuIGFbMF09ZCprK2cqaCtlKmotZippLGFbMV09ZSprK2cqaStmKmgtZCpqLGFbMl09ZiprK2cqaitkKmktZSpoLGFbM109ZyprLWQqaC1lKmktZipqLGF9bGV0IE09aSxfPWosTj1rO2NsYXNzIGQgZXh0ZW5kcyBBcnJheXtjb25zdHJ1Y3RvcihhPTAsYj0wLGM9MCxkPTEpe3JldHVybiBzdXBlcihhLGIsYyxkKSx0aGlzLm9uQ2hhbmdlPSgpPT57fSx0aGlzfWdldCB4KCl7cmV0dXJuIHRoaXNbMF19c2V0IHgoYSl7dGhpc1swXT1hLHRoaXMub25DaGFuZ2UoKX1nZXQgeSgpe3JldHVybiB0aGlzWzFdfXNldCB5KGEpe3RoaXNbMV09YSx0aGlzLm9uQ2hhbmdlKCl9Z2V0IHooKXtyZXR1cm4gdGhpc1syXX1zZXQgeihhKXt0aGlzWzJdPWEsdGhpcy5vbkNoYW5nZSgpfWdldCB3KCl7cmV0dXJuIHRoaXNbM119c2V0IHcoYSl7dGhpc1szXT1hLHRoaXMub25DaGFuZ2UoKX1pZGVudGl0eSgpe3ZhciBhO3JldHVybihhPXRoaXMpWzBdPTAsYVsxXT0wLGFbMl09MCxhWzNdPTEsdGhpcy5vbkNoYW5nZSgpLHRoaXN9c2V0KGEsYixjLGQpe3JldHVybiBhLmxlbmd0aD90aGlzLmNvcHkoYSk6KF8odGhpcyxhLGIsYyxkKSx0aGlzLm9uQ2hhbmdlKCksdGhpcyl9cm90YXRlWChqKXt2YXIgYSxiLGU7bGV0IGYsZyxoLGksYyxkO3JldHVybiBhPXRoaXMsYj10aGlzLGU9aixlKj0uNSxmPWJbMF0sZz1iWzFdLGg9YlsyXSxpPWJbM10sYz1NYXRoLnNpbihlKSxkPU1hdGguY29zKGUpLGFbMF09ZipkK2kqYyxhWzFdPWcqZCtoKmMsYVsyXT1oKmQtZypjLGFbM109aSpkLWYqYyx0aGlzLm9uQ2hhbmdlKCksdGhpc31yb3RhdGVZKGope3ZhciBhLGIsZTtsZXQgZixnLGgsaSxjLGQ7cmV0dXJuIGE9dGhpcyxiPXRoaXMsZT1qLGUqPS41LGY9YlswXSxnPWJbMV0saD1iWzJdLGk9YlszXSxjPU1hdGguc2luKGUpLGQ9TWF0aC5jb3MoZSksYVswXT1mKmQtaCpjLGFbMV09ZypkK2kqYyxhWzJdPWgqZCtmKmMsYVszXT1pKmQtZypjLHRoaXMub25DaGFuZ2UoKSx0aGlzfXJvdGF0ZVooail7dmFyIGEsYixlO2xldCBmLGcsaCxpLGMsZDtyZXR1cm4gYT10aGlzLGI9dGhpcyxlPWosZSo9LjUsZj1iWzBdLGc9YlsxXSxoPWJbMl0saT1iWzNdLGM9TWF0aC5zaW4oZSksZD1NYXRoLmNvcyhlKSxhWzBdPWYqZCtnKmMsYVsxXT1nKmQtZipjLGFbMl09aCpkK2kqYyxhWzNdPWkqZC1oKmMsdGhpcy5vbkNoYW5nZSgpLHRoaXN9aW52ZXJzZShpPXRoaXMpe3ZhciBhLGM7bGV0IGQsZSxmLGcsaCxiO3JldHVybiBhPXRoaXMsZD0oYz1pKVswXSxlPWNbMV0sZj1jWzJdLGc9Y1szXSxoPWQqZCtlKmUrZipmK2cqZyxiPWg/MS9oOjAsYVswXT0tZCpiLGFbMV09LWUqYixhWzJdPS1mKmIsYVszXT1nKmIsdGhpcy5vbkNoYW5nZSgpLHRoaXN9Y29uanVnYXRlKGM9dGhpcyl7dmFyIGIsYTtyZXR1cm4gYT1jLChiPXRoaXMpWzBdPS1hWzBdLGJbMV09LWFbMV0sYlsyXT0tYVsyXSxiWzNdPWFbM10sdGhpcy5vbkNoYW5nZSgpLHRoaXN9Y29weShhKXtyZXR1cm4gTSh0aGlzLGEpLHRoaXMub25DaGFuZ2UoKSx0aGlzfW5vcm1hbGl6ZShhPXRoaXMpe3JldHVybiBOKHRoaXMsYSksdGhpcy5vbkNoYW5nZSgpLHRoaXN9bXVsdGlwbHkoYSxiKXtyZXR1cm4gYj9MKHRoaXMsYSxiKTpMKHRoaXMsdGhpcyxhKSx0aGlzLm9uQ2hhbmdlKCksdGhpc31kb3QoYyl7dmFyIGEsYjtyZXR1cm4gYT10aGlzLGI9YyxhWzBdKmJbMF0rYVsxXSpiWzFdK2FbMl0qYlsyXSthWzNdKmJbM119ZnJvbU1hdHJpeDMoYSl7cmV0dXJuIGZ1bmN0aW9uKGQsYSl7bGV0IGIsZz1hWzBdK2FbNF0rYVs4XTtpZihnPjApYj1NYXRoLnNxcnQoZysxKSxkWzNdPS41KmIsYj0uNS9iLGRbMF09KGFbNV0tYVs3XSkqYixkWzFdPShhWzZdLWFbMl0pKmIsZFsyXT0oYVsxXS1hWzNdKSpiO2Vsc2V7bGV0IGM9MDthWzRdPmFbMF0mJihjPTEpLGFbOF0+YVszKmMrY10mJihjPTIpO2xldCBlPShjKzEpJTMsZj0oYysyKSUzO2I9TWF0aC5zcXJ0KGFbMypjK2NdLWFbMyplK2VdLWFbMypmK2ZdKzEpLGRbY109LjUqYixiPS41L2IsZFszXT0oYVszKmUrZl0tYVszKmYrZV0pKmIsZFtlXT0oYVszKmUrY10rYVszKmMrZV0pKmIsZFtmXT0oYVszKmYrY10rYVszKmMrZl0pKmJ9fSh0aGlzLGEpLHRoaXMub25DaGFuZ2UoKSx0aGlzfWZyb21FdWxlcihhKXtyZXR1cm4gZnVuY3Rpb24oYSxoLGk9XCJZWFpcIil7bGV0IGI9TWF0aC5zaW4oLjUqaFswXSksYz1NYXRoLmNvcyguNSpoWzBdKSxkPU1hdGguc2luKC41KmhbMV0pLGU9TWF0aC5jb3MoLjUqaFsxXSksZj1NYXRoLnNpbiguNSpoWzJdKSxnPU1hdGguY29zKC41KmhbMl0pO1wiWFlaXCI9PT1pPyhhWzBdPWIqZSpnK2MqZCpmLGFbMV09YypkKmctYiplKmYsYVsyXT1jKmUqZitiKmQqZyxhWzNdPWMqZSpnLWIqZCpmKTpcIllYWlwiPT09aT8oYVswXT1iKmUqZytjKmQqZixhWzFdPWMqZCpnLWIqZSpmLGFbMl09YyplKmYtYipkKmcsYVszXT1jKmUqZytiKmQqZik6XCJaWFlcIj09PWk/KGFbMF09YiplKmctYypkKmYsYVsxXT1jKmQqZytiKmUqZixhWzJdPWMqZSpmK2IqZCpnLGFbM109YyplKmctYipkKmYpOlwiWllYXCI9PT1pPyhhWzBdPWIqZSpnLWMqZCpmLGFbMV09YypkKmcrYiplKmYsYVsyXT1jKmUqZi1iKmQqZyxhWzNdPWMqZSpnK2IqZCpmKTpcIllaWFwiPT09aT8oYVswXT1iKmUqZytjKmQqZixhWzFdPWMqZCpnK2IqZSpmLGFbMl09YyplKmYtYipkKmcsYVszXT1jKmUqZy1iKmQqZik6XCJYWllcIj09PWkmJihhWzBdPWIqZSpnLWMqZCpmLGFbMV09YypkKmctYiplKmYsYVsyXT1jKmUqZitiKmQqZyxhWzNdPWMqZSpnK2IqZCpmKX0odGhpcyxhLGEub3JkZXIpLHRoaXN9ZnJvbUF4aXNBbmdsZShlLGYpe3ZhciBhLGIsZDtsZXQgYztyZXR1cm4gYT10aGlzLGI9ZSxkPWYsYz1NYXRoLnNpbihkKj0uNSksYVswXT1jKmJbMF0sYVsxXT1jKmJbMV0sYVsyXT1jKmJbMl0sYVszXT1NYXRoLmNvcyhkKSx0aGlzfXNsZXJwKHIscyl7dmFyIGMsZCxlLGY7bGV0IGwsZyxtLGEsYixuLG8scCxxLGgsaSxqLGs7cmV0dXJuIGM9dGhpcyxkPXRoaXMsZT1yLGY9cyxuPWRbMF0sbz1kWzFdLHA9ZFsyXSxxPWRbM10saD1lWzBdLGk9ZVsxXSxqPWVbMl0saz1lWzNdLChnPW4qaCtvKmkrcCpqK3Eqayk8MCYmKGc9LWcsaD0taCxpPS1pLGo9LWosaz0tayksMS1nPjFlLTY/KGw9TWF0aC5hY29zKGcpLG09TWF0aC5zaW4obCksYT1NYXRoLnNpbigoMS1mKSpsKS9tLGI9TWF0aC5zaW4oZipsKS9tKTooYT0xLWYsYj1mKSxjWzBdPWEqbitiKmgsY1sxXT1hKm8rYippLGNbMl09YSpwK2IqaixjWzNdPWEqcStiKmssdGhpc31mcm9tQXJyYXkoYSxiPTApe3JldHVybiB0aGlzWzBdPWFbYl0sdGhpc1sxXT1hW2IrMV0sdGhpc1syXT1hW2IrMl0sdGhpc1szXT1hW2IrM10sdGhpc310b0FycmF5KGE9W10sYj0wKXtyZXR1cm4gYVtiXT10aGlzWzBdLGFbYisxXT10aGlzWzFdLGFbYisyXT10aGlzWzJdLGFbYiszXT10aGlzWzNdLGF9fWZ1bmN0aW9uIE8oZSxmLGcpe2xldCBoPWZbMF0saT1mWzFdLGo9ZlsyXSxrPWZbM10sbD1mWzRdLG09Zls1XSxuPWZbNl0sbz1mWzddLHA9Zls4XSxxPWZbOV0scj1mWzEwXSxzPWZbMTFdLHQ9ZlsxMl0sdT1mWzEzXSx2PWZbMTRdLHc9ZlsxNV0sYT1nWzBdLGI9Z1sxXSxjPWdbMl0sZD1nWzNdO3JldHVybiBlWzBdPWEqaCtiKmwrYypwK2QqdCxlWzFdPWEqaStiKm0rYypxK2QqdSxlWzJdPWEqaitiKm4rYypyK2QqdixlWzNdPWEqaytiKm8rYypzK2QqdyxhPWdbNF0sYj1nWzVdLGM9Z1s2XSxkPWdbN10sZVs0XT1hKmgrYipsK2MqcCtkKnQsZVs1XT1hKmkrYiptK2MqcStkKnUsZVs2XT1hKmorYipuK2MqcitkKnYsZVs3XT1hKmsrYipvK2MqcytkKncsYT1nWzhdLGI9Z1s5XSxjPWdbMTBdLGQ9Z1sxMV0sZVs4XT1hKmgrYipsK2MqcCtkKnQsZVs5XT1hKmkrYiptK2MqcStkKnUsZVsxMF09YSpqK2IqbitjKnIrZCp2LGVbMTFdPWEqaytiKm8rYypzK2QqdyxhPWdbMTJdLGI9Z1sxM10sYz1nWzE0XSxkPWdbMTVdLGVbMTJdPWEqaCtiKmwrYypwK2QqdCxlWzEzXT1hKmkrYiptK2MqcStkKnUsZVsxNF09YSpqK2IqbitjKnIrZCp2LGVbMTVdPWEqaytiKm8rYypzK2QqdyxlfWNsYXNzIGMgZXh0ZW5kcyBBcnJheXtjb25zdHJ1Y3RvcihhPTEsYj0wLGM9MCxkPTAsZT0wLGY9MSxnPTAsaD0wLGk9MCxqPTAsaz0xLGw9MCxtPTAsbj0wLG89MCxwPTEpe3JldHVybiBzdXBlcihhLGIsYyxkLGUsZixnLGgsaSxqLGssbCxtLG4sbyxwKSx0aGlzfXNldCB4KGEpe3RoaXNbMTJdPWF9Z2V0IHgoKXtyZXR1cm4gdGhpc1sxMl19c2V0IHkoYSl7dGhpc1sxM109YX1nZXQgeSgpe3JldHVybiB0aGlzWzEzXX1zZXQgeihhKXt0aGlzWzE0XT1hfWdldCB6KCl7cmV0dXJuIHRoaXNbMTRdfXNldCB3KGEpe3RoaXNbMTVdPWF9Z2V0IHcoKXtyZXR1cm4gdGhpc1sxNV19c2V0KGIscyx0LHUsdix3LHgseSx6LEEsQixDLEQsRSxGLEcpe3ZhciBhLGMsZCxlLGYsZyxoLGksaixrLGwsbSxuLG8scCxxLHI7cmV0dXJuIGIubGVuZ3RoP3RoaXMuY29weShiKTooYT10aGlzLGM9YixkPXMsZT10LGY9dSxnPXYsaD13LGk9eCxqPXksaz16LGw9QSxtPUIsbj1DLG89RCxwPUUscT1GLHI9RyxhWzBdPWMsYVsxXT1kLGFbMl09ZSxhWzNdPWYsYVs0XT1nLGFbNV09aCxhWzZdPWksYVs3XT1qLGFbOF09ayxhWzldPWwsYVsxMF09bSxhWzExXT1uLGFbMTJdPW8sYVsxM109cCxhWzE0XT1xLGFbMTVdPXIsdGhpcyl9dHJhbnNsYXRlKHMsdD10aGlzKXt2YXIgYixhLGY7bGV0IGcsaCxpLGosayxsLG0sbixvLHAscSxyLGMsZCxlO3JldHVybiBiPXRoaXMsYT10LGM9KGY9cylbMF0sZD1mWzFdLGU9ZlsyXSxhPT09Yj8oYlsxMl09YVswXSpjK2FbNF0qZCthWzhdKmUrYVsxMl0sYlsxM109YVsxXSpjK2FbNV0qZCthWzldKmUrYVsxM10sYlsxNF09YVsyXSpjK2FbNl0qZCthWzEwXSplK2FbMTRdLGJbMTVdPWFbM10qYythWzddKmQrYVsxMV0qZSthWzE1XSk6KGc9YVswXSxoPWFbMV0saT1hWzJdLGo9YVszXSxrPWFbNF0sbD1hWzVdLG09YVs2XSxuPWFbN10sbz1hWzhdLHA9YVs5XSxxPWFbMTBdLHI9YVsxMV0sYlswXT1nLGJbMV09aCxiWzJdPWksYlszXT1qLGJbNF09ayxiWzVdPWwsYls2XT1tLGJbN109bixiWzhdPW8sYls5XT1wLGJbMTBdPXEsYlsxMV09cixiWzEyXT1nKmMraypkK28qZSthWzEyXSxiWzEzXT1oKmMrbCpkK3AqZSthWzEzXSxiWzE0XT1pKmMrbSpkK3EqZSthWzE0XSxiWzE1XT1qKmMrbipkK3IqZSthWzE1XSksdGhpc31yb3RhdGVYKG4sbz10aGlzKXt2YXIgYSxiLG07bGV0IGMsZCxlLGYsZyxoLGksaixrLGw7cmV0dXJuIGE9dGhpcyxiPW8sYz1NYXRoLnNpbihtPW4pLGQ9TWF0aC5jb3MobSksZT1iWzRdLGY9Yls1XSxnPWJbNl0saD1iWzddLGk9Yls4XSxqPWJbOV0saz1iWzEwXSxsPWJbMTFdLGIhPT1hJiYoYVswXT1iWzBdLGFbMV09YlsxXSxhWzJdPWJbMl0sYVszXT1iWzNdLGFbMTJdPWJbMTJdLGFbMTNdPWJbMTNdLGFbMTRdPWJbMTRdLGFbMTVdPWJbMTVdKSxhWzRdPWUqZCtpKmMsYVs1XT1mKmQraipjLGFbNl09ZypkK2sqYyxhWzddPWgqZCtsKmMsYVs4XT1pKmQtZSpjLGFbOV09aipkLWYqYyxhWzEwXT1rKmQtZypjLGFbMTFdPWwqZC1oKmMsdGhpc31yb3RhdGVZKG4sbz10aGlzKXt2YXIgYSxiLG07bGV0IGMsZCxlLGYsZyxoLGksaixrLGw7cmV0dXJuIGE9dGhpcyxiPW8sYz1NYXRoLnNpbihtPW4pLGQ9TWF0aC5jb3MobSksZT1iWzBdLGY9YlsxXSxnPWJbMl0saD1iWzNdLGk9Yls4XSxqPWJbOV0saz1iWzEwXSxsPWJbMTFdLGIhPT1hJiYoYVs0XT1iWzRdLGFbNV09Yls1XSxhWzZdPWJbNl0sYVs3XT1iWzddLGFbMTJdPWJbMTJdLGFbMTNdPWJbMTNdLGFbMTRdPWJbMTRdLGFbMTVdPWJbMTVdKSxhWzBdPWUqZC1pKmMsYVsxXT1mKmQtaipjLGFbMl09ZypkLWsqYyxhWzNdPWgqZC1sKmMsYVs4XT1lKmMraSpkLGFbOV09ZipjK2oqZCxhWzEwXT1nKmMraypkLGFbMTFdPWgqYytsKmQsdGhpc31yb3RhdGVaKG4sbz10aGlzKXt2YXIgYSxiLG07bGV0IGMsZCxlLGYsZyxoLGksaixrLGw7cmV0dXJuIGE9dGhpcyxiPW8sYz1NYXRoLnNpbihtPW4pLGQ9TWF0aC5jb3MobSksZT1iWzBdLGY9YlsxXSxnPWJbMl0saD1iWzNdLGk9Yls0XSxqPWJbNV0saz1iWzZdLGw9Yls3XSxiIT09YSYmKGFbOF09Yls4XSxhWzldPWJbOV0sYVsxMF09YlsxMF0sYVsxMV09YlsxMV0sYVsxMl09YlsxMl0sYVsxM109YlsxM10sYVsxNF09YlsxNF0sYVsxNV09YlsxNV0pLGFbMF09ZSpkK2kqYyxhWzFdPWYqZCtqKmMsYVsyXT1nKmQraypjLGFbM109aCpkK2wqYyxhWzRdPWkqZC1lKmMsYVs1XT1qKmQtZipjLGFbNl09aypkLWcqYyxhWzddPWwqZC1oKmMsdGhpc31zY2FsZShjLGg9dGhpcyl7dmFyIGEsYixnO2xldCBkLGUsZjtyZXR1cm4gYT10aGlzLGI9aCxkPShnPVwibnVtYmVyXCI9PXR5cGVvZiBjP1tjLGMsY106YylbMF0sZT1nWzFdLGY9Z1syXSxhWzBdPWJbMF0qZCxhWzFdPWJbMV0qZCxhWzJdPWJbMl0qZCxhWzNdPWJbM10qZCxhWzRdPWJbNF0qZSxhWzVdPWJbNV0qZSxhWzZdPWJbNl0qZSxhWzddPWJbN10qZSxhWzhdPWJbOF0qZixhWzldPWJbOV0qZixhWzEwXT1iWzEwXSpmLGFbMTFdPWJbMTFdKmYsYVsxMl09YlsxMl0sYVsxM109YlsxM10sYVsxNF09YlsxNF0sYVsxNV09YlsxNV0sdGhpc31tdWx0aXBseShhLGIpe3JldHVybiBiP08odGhpcyxhLGIpOk8odGhpcyx0aGlzLGEpLHRoaXN9aWRlbnRpdHkoKXt2YXIgYTtyZXR1cm4oYT10aGlzKVswXT0xLGFbMV09MCxhWzJdPTAsYVszXT0wLGFbNF09MCxhWzVdPTEsYVs2XT0wLGFbN109MCxhWzhdPTAsYVs5XT0wLGFbMTBdPTEsYVsxMV09MCxhWzEyXT0wLGFbMTNdPTAsYVsxNF09MCxhWzE1XT0xLHRoaXN9Y29weShjKXt2YXIgYixhO3JldHVybiBhPWMsKGI9dGhpcylbMF09YVswXSxiWzFdPWFbMV0sYlsyXT1hWzJdLGJbM109YVszXSxiWzRdPWFbNF0sYls1XT1hWzVdLGJbNl09YVs2XSxiWzddPWFbN10sYls4XT1hWzhdLGJbOV09YVs5XSxiWzEwXT1hWzEwXSxiWzExXT1hWzExXSxiWzEyXT1hWzEyXSxiWzEzXT1hWzEzXSxiWzE0XT1hWzE0XSxiWzE1XT1hWzE1XSx0aGlzfWZyb21QZXJzcGVjdGl2ZSh7Zm92OmgsYXNwZWN0OmksbmVhcjpqLGZhcjprfT17fSl7dmFyIGEsZixnLGIsYztsZXQgZCxlO3JldHVybiBhPXRoaXMsZj1oLGc9aSxiPWosYz1rLGQ9MS9NYXRoLnRhbihmLzIpLGU9MS8oYi1jKSxhWzBdPWQvZyxhWzFdPTAsYVsyXT0wLGFbM109MCxhWzRdPTAsYVs1XT1kLGFbNl09MCxhWzddPTAsYVs4XT0wLGFbOV09MCxhWzEwXT0oYytiKSplLGFbMTFdPS0xLGFbMTJdPTAsYVsxM109MCxhWzE0XT0yKmMqYiplLGFbMTVdPTAsdGhpc31mcm9tT3J0aG9nb25hbCh7bGVmdDprLHJpZ2h0OmwsYm90dG9tOm0sdG9wOm4sbmVhcjpvLGZhcjpwfSl7dmFyIGEsYixjLGQsZSxmLGc7bGV0IGgsaSxqO3JldHVybiBhPXRoaXMsYj1rLGM9bCxkPW0sZT1uLGY9byxnPXAsaD0xLyhiLWMpLGk9MS8oZC1lKSxqPTEvKGYtZyksYVswXT0tMipoLGFbMV09MCxhWzJdPTAsYVszXT0wLGFbNF09MCxhWzVdPS0yKmksYVs2XT0wLGFbN109MCxhWzhdPTAsYVs5XT0wLGFbMTBdPTIqaixhWzExXT0wLGFbMTJdPShiK2MpKmgsYVsxM109KGUrZCkqaSxhWzE0XT0oZytmKSpqLGFbMTVdPTEsdGhpc31mcm9tUXVhdGVybmlvbihzKXt2YXIgYSxlO2xldCBmLGMsYixnLGQsaCxpLGosayxsLG0sbixvLHAscSxyO3JldHVybiBhPXRoaXMsZj0oZT1zKVswXSxjPWVbMV0sYj1lWzJdLGc9ZVszXSxkPWYrZixoPWMrYyxpPWIrYixqPWYqZCxrPWMqZCxsPWMqaCxtPWIqZCxuPWIqaCxvPWIqaSxwPWcqZCxxPWcqaCxyPWcqaSxhWzBdPTEtbC1vLGFbMV09aytyLGFbMl09bS1xLGFbM109MCxhWzRdPWstcixhWzVdPTEtai1vLGFbNl09bitwLGFbN109MCxhWzhdPW0rcSxhWzldPW4tcCxhWzEwXT0xLWotbCxhWzExXT0wLGFbMTJdPTAsYVsxM109MCxhWzE0XT0wLGFbMTVdPTEsdGhpc31zZXRQb3NpdGlvbihhKXtyZXR1cm4gdGhpcy54PWFbMF0sdGhpcy55PWFbMV0sdGhpcy56PWFbMl0sdGhpc31pbnZlcnNlKEU9dGhpcyl7dmFyIGIsYztsZXQgZCxlLGYsZyxoLGksaixrLGwsbSxuLG8scCxxLHIscyx0LHUsdix3LHgseSx6LEEsQixfLEMsRCxhO3JldHVybiBiPXRoaXMsZD0oYz1FKVswXSxlPWNbMV0sZj1jWzJdLGc9Y1szXSxoPWNbNF0saT1jWzVdLGo9Y1s2XSxrPWNbN10sbD1jWzhdLG09Y1s5XSxuPWNbMTBdLG89Y1sxMV0scD1jWzEyXSxxPWNbMTNdLHI9Y1sxNF0scz1jWzE1XSx0PWQqaS1lKmgsdT1kKmotZipoLHY9ZCprLWcqaCx3PWUqai1mKmkseD1lKmstZyppLHk9ZiprLWcqaix6PWwqcS1tKnAsQT1sKnItbipwLEI9bCpzLW8qcCxfPW0qci1uKnEsQz1tKnMtbypxLEQ9bipzLW8qcixhPXQqRC11KkMrdipfK3cqQi14KkEreSp6LGEmJihhPTEvYSxiWzBdPShpKkQtaipDK2sqXykqYSxiWzFdPShmKkMtZSpELWcqXykqYSxiWzJdPShxKnktcip4K3MqdykqYSxiWzNdPShuKngtbSp5LW8qdykqYSxiWzRdPShqKkItaCpELWsqQSkqYSxiWzVdPShkKkQtZipCK2cqQSkqYSxiWzZdPShyKnYtcCp5LXMqdSkqYSxiWzddPShsKnktbip2K28qdSkqYSxiWzhdPShoKkMtaSpCK2sqeikqYSxiWzldPShlKkItZCpDLWcqeikqYSxiWzEwXT0ocCp4LXEqditzKnQpKmEsYlsxMV09KG0qdi1sKngtbyp0KSphLGJbMTJdPShpKkEtaCpfLWoqeikqYSxiWzEzXT0oZCpfLWUqQStmKnopKmEsYlsxNF09KHEqdS1wKnctcip0KSphLGJbMTVdPShsKnctbSp1K24qdCkqYSksdGhpc31jb21wb3NlKHgseSx6KXt2YXIgYSxjLGYsZztsZXQgYixkLGgsaSxuLGosZSxvLHAscSxyLHMsdCx1LHYsdyxrLGwsbTtyZXR1cm4gYT10aGlzLGM9eCxmPXksZz16LGI9Y1swXSxkPWNbMV0saD1jWzJdLGk9Y1szXSxuPWIrYixqPWQrZCxlPWgraCxvPWIqbixwPWIqaixxPWIqZSxyPWQqaixzPWQqZSx0PWgqZSx1PWkqbix2PWkqaix3PWkqZSxrPWdbMF0sbD1nWzFdLG09Z1syXSxhWzBdPSgxLShyK3QpKSprLGFbMV09KHArdykqayxhWzJdPShxLXYpKmssYVszXT0wLGFbNF09KHAtdykqbCxhWzVdPSgxLShvK3QpKSpsLGFbNl09KHMrdSkqbCxhWzddPTAsYVs4XT0ocSt2KSptLGFbOV09KHMtdSkqbSxhWzEwXT0oMS0obytyKSkqbSxhWzExXT0wLGFbMTJdPWZbMF0sYVsxM109ZlsxXSxhWzE0XT1mWzJdLGFbMTVdPTEsdGhpc31nZXRSb3RhdGlvbihlKXt2YXIgYyxhO2xldCBkLGI7cmV0dXJuIGM9ZSxhPXRoaXMsZD1hWzBdK2FbNV0rYVsxMF0sYj0wLGQ+MD8oYj0yKk1hdGguc3FydChkKzEpLGNbM109LjI1KmIsY1swXT0oYVs2XS1hWzldKS9iLGNbMV09KGFbOF0tYVsyXSkvYixjWzJdPShhWzFdLWFbNF0pL2IpOmFbMF0+YVs1XSYmYVswXT5hWzEwXT8oYj0yKk1hdGguc3FydCgxK2FbMF0tYVs1XS1hWzEwXSksY1szXT0oYVs2XS1hWzldKS9iLGNbMF09LjI1KmIsY1sxXT0oYVsxXSthWzRdKS9iLGNbMl09KGFbOF0rYVsyXSkvYik6YVs1XT5hWzEwXT8oYj0yKk1hdGguc3FydCgxK2FbNV0tYVswXS1hWzEwXSksY1szXT0oYVs4XS1hWzJdKS9iLGNbMF09KGFbMV0rYVs0XSkvYixjWzFdPS4yNSpiLGNbMl09KGFbNl0rYVs5XSkvYik6KGI9MipNYXRoLnNxcnQoMSthWzEwXS1hWzBdLWFbNV0pLGNbM109KGFbMV0tYVs0XSkvYixjWzBdPShhWzhdK2FbMl0pL2IsY1sxXT0oYVs2XSthWzldKS9iLGNbMl09LjI1KmIpLHRoaXN9Z2V0VHJhbnNsYXRpb24oYyl7dmFyIGIsYTtyZXR1cm4gYT10aGlzLChiPWMpWzBdPWFbMTJdLGJbMV09YVsxM10sYlsyXT1hWzE0XSx0aGlzfWdldFNjYWxpbmcobCl7dmFyIGIsYTtsZXQgYyxkLGUsZixnLGgsaSxqLGs7cmV0dXJuIGI9bCxhPXRoaXMsYz1hWzBdLGQ9YVsxXSxlPWFbMl0sZj1hWzRdLGc9YVs1XSxoPWFbNl0saT1hWzhdLGo9YVs5XSxrPWFbMTBdLGJbMF09TWF0aC5zcXJ0KGMqYytkKmQrZSplKSxiWzFdPU1hdGguc3FydChmKmYrZypnK2gqaCksYlsyXT1NYXRoLnNxcnQoaSppK2oqaitrKmspLHRoaXN9Z2V0TWF4U2NhbGVPbkF4aXMoKXt2YXIgYTtsZXQgYixjLGQsZSxmLGcsaCxpLGo7cmV0dXJuIGE9dGhpcyxiPWFbMF0sYz1hWzFdLGQ9YVsyXSxlPWFbNF0sZj1hWzVdLGc9YVs2XSxoPWFbOF0saT1hWzldLGo9YVsxMF0sTWF0aC5zcXJ0KE1hdGgubWF4KGIqYitjKmMrZCpkLGUqZStmKmYrZypnLGgqaCtpKmkraipqKSl9bG9va0F0KHIscyx0KXt2YXIgYSxpLGosaztsZXQgbCxtLG4sbyxwLHEsYyxkLGUsYixmLGcsaDtyZXR1cm4gYT10aGlzLGk9cixqPXMsaz10LGw9aVswXSxtPWlbMV0sbj1pWzJdLG89a1swXSxwPWtbMV0scT1rWzJdLGM9bC1qWzBdLGQ9bS1qWzFdLGU9bi1qWzJdLGI9YypjK2QqZCtlKmUsYj4wJiYoYyo9Yj0xL01hdGguc3FydChiKSxkKj1iLGUqPWIpLGY9cCplLXEqZCxnPXEqYy1vKmUsaD1vKmQtcCpjLChiPWYqZitnKmcraCpoKT4wJiYoZio9Yj0xL01hdGguc3FydChiKSxnKj1iLGgqPWIpLGFbMF09ZixhWzFdPWcsYVsyXT1oLGFbM109MCxhWzRdPWQqaC1lKmcsYVs1XT1lKmYtYypoLGFbNl09YypnLWQqZixhWzddPTAsYVs4XT1jLGFbOV09ZCxhWzEwXT1lLGFbMTFdPTAsYVsxMl09bCxhWzEzXT1tLGFbMTRdPW4sYVsxNV09MSx0aGlzfWRldGVybWluYW50KCl7dmFyIGE7bGV0IGIsYyxkLGUsZixnLGgsaSxqLGssbCxtLG4sbyxwLHE7cmV0dXJuIGE9dGhpcyxiPWFbMF0sYz1hWzFdLGQ9YVsyXSxlPWFbM10sZj1hWzRdLGc9YVs1XSxoPWFbNl0saT1hWzddLGo9YVs4XSxrPWFbOV0sbD1hWzEwXSxtPWFbMTFdLG49YVsxMl0sbz1hWzEzXSxwPWFbMTRdLHE9YVsxNV0sKGIqZy1jKmYpKihsKnEtbSpwKS0oYipoLWQqZikqKGsqcS1tKm8pKyhiKmktZSpmKSooaypwLWwqbykrKGMqaC1kKmcpKihqKnEtbSpuKS0oYyppLWUqZykqKGoqcC1sKm4pKyhkKmktZSpoKSooaipvLWsqbil9fWxldCBQPW5ldyBjO2NsYXNzIGwgZXh0ZW5kcyBBcnJheXtjb25zdHJ1Y3RvcihhPTAsYj1hLGM9YSxkPVwiWVhaXCIpe3JldHVybiBzdXBlcihhLGIsYyksdGhpcy5vcmRlcj1kLHRoaXMub25DaGFuZ2U9KCk9Pnt9LHRoaXN9Z2V0IHgoKXtyZXR1cm4gdGhpc1swXX1zZXQgeChhKXt0aGlzWzBdPWEsdGhpcy5vbkNoYW5nZSgpfWdldCB5KCl7cmV0dXJuIHRoaXNbMV19c2V0IHkoYSl7dGhpc1sxXT1hLHRoaXMub25DaGFuZ2UoKX1nZXQgeigpe3JldHVybiB0aGlzWzJdfXNldCB6KGEpe3RoaXNbMl09YSx0aGlzLm9uQ2hhbmdlKCl9c2V0KGEsYj1hLGM9YSl7cmV0dXJuIGEubGVuZ3RoP3RoaXMuY29weShhKToodGhpc1swXT1hLHRoaXNbMV09Yix0aGlzWzJdPWMsdGhpcy5vbkNoYW5nZSgpLHRoaXMpfWNvcHkoYSl7cmV0dXJuIHRoaXNbMF09YVswXSx0aGlzWzFdPWFbMV0sdGhpc1syXT1hWzJdLHRoaXN9cmVvcmRlcihhKXtyZXR1cm4gdGhpcy5vcmRlcj1hLHRoaXMub25DaGFuZ2UoKSx0aGlzfWZyb21Sb3RhdGlvbk1hdHJpeChhLGI9dGhpcy5vcmRlcil7cmV0dXJuIGZ1bmN0aW9uKGIsYSxjPVwiWVhaXCIpe1wiWFlaXCI9PT1jPyhiWzFdPU1hdGguYXNpbihNYXRoLm1pbihNYXRoLm1heChhWzhdLC0xKSwxKSksLjk5OTk5Pk1hdGguYWJzKGFbOF0pPyhiWzBdPU1hdGguYXRhbjIoLWFbOV0sYVsxMF0pLGJbMl09TWF0aC5hdGFuMigtYVs0XSxhWzBdKSk6KGJbMF09TWF0aC5hdGFuMihhWzZdLGFbNV0pLGJbMl09MCkpOlwiWVhaXCI9PT1jPyhiWzBdPU1hdGguYXNpbigtTWF0aC5taW4oTWF0aC5tYXgoYVs5XSwtMSksMSkpLC45OTk5OT5NYXRoLmFicyhhWzldKT8oYlsxXT1NYXRoLmF0YW4yKGFbOF0sYVsxMF0pLGJbMl09TWF0aC5hdGFuMihhWzFdLGFbNV0pKTooYlsxXT1NYXRoLmF0YW4yKC1hWzJdLGFbMF0pLGJbMl09MCkpOlwiWlhZXCI9PT1jPyhiWzBdPU1hdGguYXNpbihNYXRoLm1pbihNYXRoLm1heChhWzZdLC0xKSwxKSksLjk5OTk5Pk1hdGguYWJzKGFbNl0pPyhiWzFdPU1hdGguYXRhbjIoLWFbMl0sYVsxMF0pLGJbMl09TWF0aC5hdGFuMigtYVs0XSxhWzVdKSk6KGJbMV09MCxiWzJdPU1hdGguYXRhbjIoYVsxXSxhWzBdKSkpOlwiWllYXCI9PT1jPyhiWzFdPU1hdGguYXNpbigtTWF0aC5taW4oTWF0aC5tYXgoYVsyXSwtMSksMSkpLC45OTk5OT5NYXRoLmFicyhhWzJdKT8oYlswXT1NYXRoLmF0YW4yKGFbNl0sYVsxMF0pLGJbMl09TWF0aC5hdGFuMihhWzFdLGFbMF0pKTooYlswXT0wLGJbMl09TWF0aC5hdGFuMigtYVs0XSxhWzVdKSkpOlwiWVpYXCI9PT1jPyhiWzJdPU1hdGguYXNpbihNYXRoLm1pbihNYXRoLm1heChhWzFdLC0xKSwxKSksLjk5OTk5Pk1hdGguYWJzKGFbMV0pPyhiWzBdPU1hdGguYXRhbjIoLWFbOV0sYVs1XSksYlsxXT1NYXRoLmF0YW4yKC1hWzJdLGFbMF0pKTooYlswXT0wLGJbMV09TWF0aC5hdGFuMihhWzhdLGFbMTBdKSkpOlwiWFpZXCI9PT1jJiYoYlsyXT1NYXRoLmFzaW4oLU1hdGgubWluKE1hdGgubWF4KGFbNF0sLTEpLDEpKSwuOTk5OTk+TWF0aC5hYnMoYVs0XSk/KGJbMF09TWF0aC5hdGFuMihhWzZdLGFbNV0pLGJbMV09TWF0aC5hdGFuMihhWzhdLGFbMF0pKTooYlswXT1NYXRoLmF0YW4yKC1hWzldLGFbMTBdKSxiWzFdPTApKX0odGhpcyxhLGIpLHRoaXN9ZnJvbVF1YXRlcm5pb24oYSxiPXRoaXMub3JkZXIpe3JldHVybiBQLmZyb21RdWF0ZXJuaW9uKGEpLHRoaXMuZnJvbVJvdGF0aW9uTWF0cml4KFAsYil9fWNsYXNzIGd7Y29uc3RydWN0b3IoKXt0aGlzLnBhcmVudD1udWxsLHRoaXMuY2hpbGRyZW49W10sdGhpcy52aXNpYmxlPSEwLHRoaXMubWF0cml4PW5ldyBjLHRoaXMud29ybGRNYXRyaXg9bmV3IGMsdGhpcy5tYXRyaXhBdXRvVXBkYXRlPSEwLHRoaXMucG9zaXRpb249bmV3IGIsdGhpcy5xdWF0ZXJuaW9uPW5ldyBkLHRoaXMuc2NhbGU9bmV3IGIoMSksdGhpcy5yb3RhdGlvbj1uZXcgbCx0aGlzLnVwPW5ldyBiKDAsMSwwKSx0aGlzLnJvdGF0aW9uLm9uQ2hhbmdlPSgpPT50aGlzLnF1YXRlcm5pb24uZnJvbUV1bGVyKHRoaXMucm90YXRpb24pLHRoaXMucXVhdGVybmlvbi5vbkNoYW5nZT0oKT0+dGhpcy5yb3RhdGlvbi5mcm9tUXVhdGVybmlvbih0aGlzLnF1YXRlcm5pb24pfXNldFBhcmVudChhLGI9ITApe2ImJnRoaXMucGFyZW50JiZhIT09dGhpcy5wYXJlbnQmJnRoaXMucGFyZW50LnJlbW92ZUNoaWxkKHRoaXMsITEpLHRoaXMucGFyZW50PWEsYiYmYSYmYS5hZGRDaGlsZCh0aGlzLCExKX1hZGRDaGlsZChhLGI9ITApe350aGlzLmNoaWxkcmVuLmluZGV4T2YoYSl8fHRoaXMuY2hpbGRyZW4ucHVzaChhKSxiJiZhLnNldFBhcmVudCh0aGlzLCExKX1yZW1vdmVDaGlsZChhLGI9ITApe350aGlzLmNoaWxkcmVuLmluZGV4T2YoYSkmJnRoaXMuY2hpbGRyZW4uc3BsaWNlKHRoaXMuY2hpbGRyZW4uaW5kZXhPZihhKSwxKSxiJiZhLnNldFBhcmVudChudWxsLCExKX11cGRhdGVNYXRyaXhXb3JsZChhKXt0aGlzLm1hdHJpeEF1dG9VcGRhdGUmJnRoaXMudXBkYXRlTWF0cml4KCksKHRoaXMud29ybGRNYXRyaXhOZWVkc1VwZGF0ZXx8YSkmJihudWxsPT09dGhpcy5wYXJlbnQ/dGhpcy53b3JsZE1hdHJpeC5jb3B5KHRoaXMubWF0cml4KTp0aGlzLndvcmxkTWF0cml4Lm11bHRpcGx5KHRoaXMucGFyZW50LndvcmxkTWF0cml4LHRoaXMubWF0cml4KSx0aGlzLndvcmxkTWF0cml4TmVlZHNVcGRhdGU9ITEsYT0hMCk7Zm9yKGxldCBiPTAsYz10aGlzLmNoaWxkcmVuLmxlbmd0aDtiPGM7YisrKXRoaXMuY2hpbGRyZW5bYl0udXBkYXRlTWF0cml4V29ybGQoYSl9dXBkYXRlTWF0cml4KCl7dGhpcy5tYXRyaXguY29tcG9zZSh0aGlzLnF1YXRlcm5pb24sdGhpcy5wb3NpdGlvbix0aGlzLnNjYWxlKSx0aGlzLndvcmxkTWF0cml4TmVlZHNVcGRhdGU9ITB9dHJhdmVyc2UoYil7aWYoIWIodGhpcykpZm9yKGxldCBhPTAsYz10aGlzLmNoaWxkcmVuLmxlbmd0aDthPGM7YSsrKXRoaXMuY2hpbGRyZW5bYV0udHJhdmVyc2UoYil9ZGVjb21wb3NlKCl7dGhpcy5tYXRyaXguZ2V0VHJhbnNsYXRpb24odGhpcy5wb3NpdGlvbiksdGhpcy5tYXRyaXguZ2V0Um90YXRpb24odGhpcy5xdWF0ZXJuaW9uKSx0aGlzLm1hdHJpeC5nZXRTY2FsaW5nKHRoaXMuc2NhbGUpLHRoaXMucm90YXRpb24uZnJvbVF1YXRlcm5pb24odGhpcy5xdWF0ZXJuaW9uKX1sb29rQXQoYSxiPSExKXtiP3RoaXMubWF0cml4Lmxvb2tBdCh0aGlzLnBvc2l0aW9uLGEsdGhpcy51cCk6dGhpcy5tYXRyaXgubG9va0F0KGEsdGhpcy5wb3NpdGlvbix0aGlzLnVwKSx0aGlzLm1hdHJpeC5nZXRSb3RhdGlvbih0aGlzLnF1YXRlcm5pb24pLHRoaXMucm90YXRpb24uZnJvbVF1YXRlcm5pb24odGhpcy5xdWF0ZXJuaW9uKX19bGV0IFE9bmV3IGMsUj1uZXcgYixTPW5ldyBiO2Z1bmN0aW9uIFQoYSxiLGMpe2xldCBkPWJbMF0sZT1iWzFdLGY9YlsyXSxnPWJbM10saD1iWzRdLGk9Yls1XSxqPWJbNl0saz1iWzddLGw9Yls4XSxtPWNbMF0sbj1jWzFdLG89Y1syXSxwPWNbM10scT1jWzRdLHI9Y1s1XSxzPWNbNl0sdD1jWzddLHU9Y1s4XTtyZXR1cm4gYVswXT1tKmQrbipnK28qaixhWzFdPW0qZStuKmgrbyprLGFbMl09bSpmK24qaStvKmwsYVszXT1wKmQrcSpnK3IqaixhWzRdPXAqZStxKmgrciprLGFbNV09cCpmK3EqaStyKmwsYVs2XT1zKmQrdCpnK3UqaixhWzddPXMqZSt0KmgrdSprLGFbOF09cypmK3QqaSt1KmwsYX1jbGFzcyBtIGV4dGVuZHMgQXJyYXl7Y29uc3RydWN0b3IoYT0xLGI9MCxjPTAsZD0wLGU9MSxmPTAsZz0wLGg9MCxpPTEpe3JldHVybiBzdXBlcihhLGIsYyxkLGUsZixnLGgsaSksdGhpc31zZXQoYixsLG0sbixvLHAscSxyLHMpe3ZhciBhLGMsZCxlLGYsZyxoLGksaixrO3JldHVybiBiLmxlbmd0aD90aGlzLmNvcHkoYik6KGE9dGhpcyxjPWIsZD1sLGU9bSxmPW4sZz1vLGg9cCxpPXEsaj1yLGs9cyxhWzBdPWMsYVsxXT1kLGFbMl09ZSxhWzNdPWYsYVs0XT1nLGFbNV09aCxhWzZdPWksYVs3XT1qLGFbOF09ayx0aGlzKX10cmFuc2xhdGUobyxwPXRoaXMpe3ZhciBhLGIsZTtsZXQgZixnLGgsaSxqLGssbCxtLG4sYyxkO3JldHVybiBhPXRoaXMsYj1wLGU9byxmPWJbMF0sZz1iWzFdLGg9YlsyXSxpPWJbM10saj1iWzRdLGs9Yls1XSxsPWJbNl0sbT1iWzddLG49Yls4XSxjPWVbMF0sZD1lWzFdLGFbMF09ZixhWzFdPWcsYVsyXT1oLGFbM109aSxhWzRdPWosYVs1XT1rLGFbNl09YypmK2QqaStsLGFbN109YypnK2QqaittLGFbOF09YypoK2QqaytuLHRoaXN9cm90YXRlKG8scD10aGlzKXt2YXIgYSxiLGU7bGV0IGYsZyxoLGksaixrLGwsbSxuLGMsZDtyZXR1cm4gYT10aGlzLGI9cCxlPW8sZj1iWzBdLGc9YlsxXSxoPWJbMl0saT1iWzNdLGo9Yls0XSxrPWJbNV0sbD1iWzZdLG09Yls3XSxuPWJbOF0sYz1NYXRoLnNpbihlKSxkPU1hdGguY29zKGUpLGFbMF09ZCpmK2MqaSxhWzFdPWQqZytjKmosYVsyXT1kKmgrYyprLGFbM109ZCppLWMqZixhWzRdPWQqai1jKmcsYVs1XT1kKmstYypoLGFbNl09bCxhWzddPW0sYVs4XT1uLHRoaXN9c2NhbGUoZixnPXRoaXMpe3ZhciBhLGIsZTtsZXQgYyxkO3JldHVybiBhPXRoaXMsYj1nLGM9KGU9ZilbMF0sZD1lWzFdLGFbMF09YypiWzBdLGFbMV09YypiWzFdLGFbMl09YypiWzJdLGFbM109ZCpiWzNdLGFbNF09ZCpiWzRdLGFbNV09ZCpiWzVdLGFbNl09Yls2XSxhWzddPWJbN10sYVs4XT1iWzhdLHRoaXN9bXVsdGlwbHkoYSxiKXtyZXR1cm4gYj9UKHRoaXMsYSxiKTpUKHRoaXMsdGhpcyxhKSx0aGlzfWlkZW50aXR5KCl7dmFyIGE7cmV0dXJuKGE9dGhpcylbMF09MSxhWzFdPTAsYVsyXT0wLGFbM109MCxhWzRdPTEsYVs1XT0wLGFbNl09MCxhWzddPTAsYVs4XT0xLHRoaXN9Y29weShjKXt2YXIgYixhO3JldHVybiBhPWMsKGI9dGhpcylbMF09YVswXSxiWzFdPWFbMV0sYlsyXT1hWzJdLGJbM109YVszXSxiWzRdPWFbNF0sYls1XT1hWzVdLGJbNl09YVs2XSxiWzddPWFbN10sYls4XT1hWzhdLHRoaXN9ZnJvbU1hdHJpeDQoYyl7dmFyIGIsYTtyZXR1cm4gYT1jLChiPXRoaXMpWzBdPWFbMF0sYlsxXT1hWzFdLGJbMl09YVsyXSxiWzNdPWFbNF0sYls0XT1hWzVdLGJbNV09YVs2XSxiWzZdPWFbOF0sYls3XT1hWzldLGJbOF09YVsxMF0sdGhpc31mcm9tUXVhdGVybmlvbihzKXt2YXIgYSxlO2xldCBmLGMsYixnLGQsaCxpLGosayxsLG0sbixvLHAscSxyO3JldHVybiBhPXRoaXMsZj0oZT1zKVswXSxjPWVbMV0sYj1lWzJdLGc9ZVszXSxkPWYrZixoPWMrYyxpPWIrYixqPWYqZCxrPWMqZCxsPWMqaCxtPWIqZCxuPWIqaCxvPWIqaSxwPWcqZCxxPWcqaCxyPWcqaSxhWzBdPTEtbC1vLGFbM109ay1yLGFbNl09bStxLGFbMV09aytyLGFbNF09MS1qLW8sYVs3XT1uLXAsYVsyXT1tLXEsYVs1XT1uK3AsYVs4XT0xLWotbCx0aGlzfWZyb21CYXNpcyhhLGIsYyl7cmV0dXJuIHRoaXMuc2V0KGFbMF0sYVsxXSxhWzJdLGJbMF0sYlsxXSxiWzJdLGNbMF0sY1sxXSxjWzJdKSx0aGlzfWludmVyc2UocD10aGlzKXt2YXIgYixjO2xldCBkLGUsZixnLGgsaSxqLGssbCxtLG4sbyxhO3JldHVybiBiPXRoaXMsZD0oYz1wKVswXSxlPWNbMV0sZj1jWzJdLGc9Y1szXSxoPWNbNF0saT1jWzVdLGo9Y1s2XSxrPWNbN10sbD1jWzhdLG09bCpoLWkqayxuPS1sKmcraSpqLG89aypnLWgqaixhPWQqbStlKm4rZipvLGEmJihhPTEvYSxiWzBdPW0qYSxiWzFdPSgtbCplK2YqaykqYSxiWzJdPShpKmUtZipoKSphLGJbM109biphLGJbNF09KGwqZC1mKmopKmEsYls1XT0oLWkqZCtmKmcpKmEsYls2XT1vKmEsYls3XT0oLWsqZCtlKmopKmEsYls4XT0oaCpkLWUqZykqYSksdGhpc31nZXROb3JtYWxNYXRyaXgoRSl7dmFyIGMsYTtsZXQgZyxoLGksZCxqLGssbCxlLHMsdCx1LHYsbSxuLG8sZixCLEMsdyxELHgseSx6LEEscCxfLHEscixiO3JldHVybiBjPXRoaXMsZz0oYT1FKVswXSxoPWFbMV0saT1hWzJdLGQ9YVszXSxqPWFbNF0saz1hWzVdLGw9YVs2XSxlPWFbN10scz1hWzhdLHQ9YVs5XSx1PWFbMTBdLHY9YVsxMV0sbT1hWzEyXSxuPWFbMTNdLG89YVsxNF0sZj1hWzE1XSxCPWcqay1oKmosQz1nKmwtaSpqLHc9ZyplLWQqaixEPWgqbC1pKmsseD1oKmUtZCprLHk9aSplLWQqbCx6PXMqbi10Km0sQT1zKm8tdSptLHA9cypmLXYqbSxfPXQqby11Km4scT10KmYtdipuLHI9dSpmLXYqbyxiPUIqci1DKnErdypfK0QqcC14KkEreSp6LGImJihiPTEvYixjWzBdPShrKnItbCpxK2UqXykqYixjWzFdPShsKnAtaipyLWUqQSkqYixjWzJdPShqKnEtaypwK2UqeikqYixjWzNdPShpKnEtaCpyLWQqXykqYixjWzRdPShnKnItaSpwK2QqQSkqYixjWzVdPShoKnAtZypxLWQqeikqYixjWzZdPShuKnktbyp4K2YqRCkqYixjWzddPShvKnctbSp5LWYqQykqYixjWzhdPShtKngtbip3K2YqQikqYiksdGhpc319bGV0IFU9MDtjbGFzcyBuIGV4dGVuZHMgZ3tjb25zdHJ1Y3RvcihhLHtnZW9tZXRyeTpiLHByb2dyYW06ZCxtb2RlOmU9YS5UUklBTkdMRVMsZnJ1c3R1bUN1bGxlZDpmPSEwLHJlbmRlck9yZGVyOmc9MH09e30pe3N1cGVyKGEpLHRoaXMuZ2w9YSx0aGlzLmlkPVUrKyx0aGlzLmdlb21ldHJ5PWIsdGhpcy5wcm9ncmFtPWQsdGhpcy5tb2RlPWUsdGhpcy5mcnVzdHVtQ3VsbGVkPWYsdGhpcy5yZW5kZXJPcmRlcj1nLHRoaXMubW9kZWxWaWV3TWF0cml4PW5ldyBjLHRoaXMubm9ybWFsTWF0cml4PW5ldyBtLHRoaXMucHJvZ3JhbS51bmlmb3Jtcy5tb2RlbE1hdHJpeHx8T2JqZWN0LmFzc2lnbih0aGlzLnByb2dyYW0udW5pZm9ybXMse21vZGVsTWF0cml4Ont2YWx1ZTpudWxsfSx2aWV3TWF0cml4Ont2YWx1ZTpudWxsfSxtb2RlbFZpZXdNYXRyaXg6e3ZhbHVlOm51bGx9LG5vcm1hbE1hdHJpeDp7dmFsdWU6bnVsbH0scHJvamVjdGlvbk1hdHJpeDp7dmFsdWU6bnVsbH0sY2FtZXJhUG9zaXRpb246e3ZhbHVlOm51bGx9fSl9ZHJhdyh7Y2FtZXJhOmF9PXt9KXt0aGlzLm9uQmVmb3JlUmVuZGVyJiZ0aGlzLm9uQmVmb3JlUmVuZGVyKHttZXNoOnRoaXMsY2FtZXJhOmF9KSxhJiYodGhpcy5wcm9ncmFtLnVuaWZvcm1zLnByb2plY3Rpb25NYXRyaXgudmFsdWU9YS5wcm9qZWN0aW9uTWF0cml4LHRoaXMucHJvZ3JhbS51bmlmb3Jtcy5jYW1lcmFQb3NpdGlvbi52YWx1ZT1hLnBvc2l0aW9uLHRoaXMucHJvZ3JhbS51bmlmb3Jtcy52aWV3TWF0cml4LnZhbHVlPWEudmlld01hdHJpeCx0aGlzLm1vZGVsVmlld01hdHJpeC5tdWx0aXBseShhLnZpZXdNYXRyaXgsdGhpcy53b3JsZE1hdHJpeCksdGhpcy5ub3JtYWxNYXRyaXguZ2V0Tm9ybWFsTWF0cml4KHRoaXMubW9kZWxWaWV3TWF0cml4KSx0aGlzLnByb2dyYW0udW5pZm9ybXMubW9kZWxNYXRyaXgudmFsdWU9dGhpcy53b3JsZE1hdHJpeCx0aGlzLnByb2dyYW0udW5pZm9ybXMubW9kZWxWaWV3TWF0cml4LnZhbHVlPXRoaXMubW9kZWxWaWV3TWF0cml4LHRoaXMucHJvZ3JhbS51bmlmb3Jtcy5ub3JtYWxNYXRyaXgudmFsdWU9dGhpcy5ub3JtYWxNYXRyaXgpO2xldCBiPXRoaXMucHJvZ3JhbS5jdWxsRmFjZSYmMD50aGlzLndvcmxkTWF0cml4LmRldGVybWluYW50KCk7dGhpcy5wcm9ncmFtLnVzZSh7ZmxpcEZhY2VzOmJ9KSx0aGlzLmdlb21ldHJ5LmRyYXcoe21vZGU6dGhpcy5tb2RlLHByb2dyYW06dGhpcy5wcm9ncmFtfSksdGhpcy5vbkFmdGVyUmVuZGVyJiZ0aGlzLm9uQWZ0ZXJSZW5kZXIoe21lc2g6dGhpcyxjYW1lcmE6YX0pfX1sZXQgVj1uZXcgVWludDhBcnJheSg0KTtmdW5jdGlvbiBXKGEpe3JldHVybiAwPT0oYSZhLTEpfWxldCBYPTA7Y2xhc3Mgb3tjb25zdHJ1Y3RvcihhLHtpbWFnZTplLHRhcmdldDpmPWEuVEVYVFVSRV8yRCx0eXBlOmc9YS5VTlNJR05FRF9CWVRFLGZvcm1hdDpiPWEuUkdCQSxpbnRlcm5hbEZvcm1hdDpoPWIsd3JhcFM6aT1hLkNMQU1QX1RPX0VER0Usd3JhcFQ6aj1hLkNMQU1QX1RPX0VER0UsZ2VuZXJhdGVNaXBtYXBzOmM9ITAsbWluRmlsdGVyOms9Yz9hLk5FQVJFU1RfTUlQTUFQX0xJTkVBUjphLkxJTkVBUixtYWdGaWx0ZXI6bD1hLkxJTkVBUixwcmVtdWx0aXBseUFscGhhOm09ITEsdW5wYWNrQWxpZ25tZW50Om49NCxmbGlwWTpvPSEwLGxldmVsOnA9MCx3aWR0aDpkLGhlaWdodDpxPWR9PXt9KXt0aGlzLmdsPWEsdGhpcy5pZD1YKyssdGhpcy5pbWFnZT1lLHRoaXMudGFyZ2V0PWYsdGhpcy50eXBlPWcsdGhpcy5mb3JtYXQ9Yix0aGlzLmludGVybmFsRm9ybWF0PWgsdGhpcy5taW5GaWx0ZXI9ayx0aGlzLm1hZ0ZpbHRlcj1sLHRoaXMud3JhcFM9aSx0aGlzLndyYXBUPWosdGhpcy5nZW5lcmF0ZU1pcG1hcHM9Yyx0aGlzLnByZW11bHRpcGx5QWxwaGE9bSx0aGlzLnVucGFja0FsaWdubWVudD1uLHRoaXMuZmxpcFk9byx0aGlzLmxldmVsPXAsdGhpcy53aWR0aD1kLHRoaXMuaGVpZ2h0PXEsdGhpcy50ZXh0dXJlPXRoaXMuZ2wuY3JlYXRlVGV4dHVyZSgpLHRoaXMuc3RvcmU9e2ltYWdlOm51bGx9LHRoaXMuZ2xTdGF0ZT10aGlzLmdsLnJlbmRlcmVyLnN0YXRlLHRoaXMuc3RhdGU9e30sdGhpcy5zdGF0ZS5taW5GaWx0ZXI9dGhpcy5nbC5ORUFSRVNUX01JUE1BUF9MSU5FQVIsdGhpcy5zdGF0ZS5tYWdGaWx0ZXI9dGhpcy5nbC5MSU5FQVIsdGhpcy5zdGF0ZS53cmFwUz10aGlzLmdsLlJFUEVBVCx0aGlzLnN0YXRlLndyYXBUPXRoaXMuZ2wuUkVQRUFUfWJpbmQoKXt0aGlzLmdsU3RhdGUudGV4dHVyZVVuaXRzW3RoaXMuZ2xTdGF0ZS5hY3RpdmVUZXh0dXJlVW5pdF0hPT10aGlzLmlkJiYodGhpcy5nbC5iaW5kVGV4dHVyZSh0aGlzLnRhcmdldCx0aGlzLnRleHR1cmUpLHRoaXMuZ2xTdGF0ZS50ZXh0dXJlVW5pdHNbdGhpcy5nbFN0YXRlLmFjdGl2ZVRleHR1cmVVbml0XT10aGlzLmlkKX11cGRhdGUoYT0wKXtsZXQgYj0hKHRoaXMuaW1hZ2U9PT10aGlzLnN0b3JlLmltYWdlJiYhdGhpcy5uZWVkc1VwZGF0ZSk7KGJ8fHRoaXMuZ2xTdGF0ZS50ZXh0dXJlVW5pdHNbYV0hPT10aGlzLmlkKSYmKHRoaXMuZ2wucmVuZGVyZXIuYWN0aXZlVGV4dHVyZShhKSx0aGlzLmJpbmQoKSksYiYmKHRoaXMubmVlZHNVcGRhdGU9ITEsdGhpcy5mbGlwWSE9PXRoaXMuZ2xTdGF0ZS5mbGlwWSYmKHRoaXMuZ2wucGl4ZWxTdG9yZWkodGhpcy5nbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMLHRoaXMuZmxpcFkpLHRoaXMuZ2xTdGF0ZS5mbGlwWT10aGlzLmZsaXBZKSx0aGlzLnByZW11bHRpcGx5QWxwaGEhPT10aGlzLmdsU3RhdGUucHJlbXVsdGlwbHlBbHBoYSYmKHRoaXMuZ2wucGl4ZWxTdG9yZWkodGhpcy5nbC5VTlBBQ0tfUFJFTVVMVElQTFlfQUxQSEFfV0VCR0wsdGhpcy5wcmVtdWx0aXBseUFscGhhKSx0aGlzLmdsU3RhdGUucHJlbXVsdGlwbHlBbHBoYT10aGlzLnByZW11bHRpcGx5QWxwaGEpLHRoaXMudW5wYWNrQWxpZ25tZW50IT09dGhpcy5nbFN0YXRlLnVucGFja0FsaWdubWVudCYmKHRoaXMuZ2wucGl4ZWxTdG9yZWkodGhpcy5nbC5VTlBBQ0tfQUxJR05NRU5ULHRoaXMudW5wYWNrQWxpZ25tZW50KSx0aGlzLmdsU3RhdGUudW5wYWNrQWxpZ25tZW50PXRoaXMudW5wYWNrQWxpZ25tZW50KSx0aGlzLm1pbkZpbHRlciE9PXRoaXMuc3RhdGUubWluRmlsdGVyJiYodGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMudGFyZ2V0LHRoaXMuZ2wuVEVYVFVSRV9NSU5fRklMVEVSLHRoaXMubWluRmlsdGVyKSx0aGlzLnN0YXRlLm1pbkZpbHRlcj10aGlzLm1pbkZpbHRlciksdGhpcy5tYWdGaWx0ZXIhPT10aGlzLnN0YXRlLm1hZ0ZpbHRlciYmKHRoaXMuZ2wudGV4UGFyYW1ldGVyaSh0aGlzLnRhcmdldCx0aGlzLmdsLlRFWFRVUkVfTUFHX0ZJTFRFUix0aGlzLm1hZ0ZpbHRlciksdGhpcy5zdGF0ZS5tYWdGaWx0ZXI9dGhpcy5tYWdGaWx0ZXIpLHRoaXMud3JhcFMhPT10aGlzLnN0YXRlLndyYXBTJiYodGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMudGFyZ2V0LHRoaXMuZ2wuVEVYVFVSRV9XUkFQX1MsdGhpcy53cmFwUyksdGhpcy5zdGF0ZS53cmFwUz10aGlzLndyYXBTKSx0aGlzLndyYXBUIT09dGhpcy5zdGF0ZS53cmFwVCYmKHRoaXMuZ2wudGV4UGFyYW1ldGVyaSh0aGlzLnRhcmdldCx0aGlzLmdsLlRFWFRVUkVfV1JBUF9ULHRoaXMud3JhcFQpLHRoaXMuc3RhdGUud3JhcFQ9dGhpcy53cmFwVCksdGhpcy5pbWFnZT8odGhpcy5pbWFnZS53aWR0aCYmKHRoaXMud2lkdGg9dGhpcy5pbWFnZS53aWR0aCx0aGlzLmhlaWdodD10aGlzLmltYWdlLmhlaWdodCksdGhpcy5nbC5yZW5kZXJlci5pc1dlYmdsMnx8QXJyYXlCdWZmZXIuaXNWaWV3KHRoaXMuaW1hZ2UpP3RoaXMuZ2wudGV4SW1hZ2UyRCh0aGlzLnRhcmdldCx0aGlzLmxldmVsLHRoaXMuaW50ZXJuYWxGb3JtYXQsdGhpcy53aWR0aCx0aGlzLmhlaWdodCwwLHRoaXMuZm9ybWF0LHRoaXMudHlwZSx0aGlzLmltYWdlKTp0aGlzLmdsLnRleEltYWdlMkQodGhpcy50YXJnZXQsdGhpcy5sZXZlbCx0aGlzLmludGVybmFsRm9ybWF0LHRoaXMuZm9ybWF0LHRoaXMudHlwZSx0aGlzLmltYWdlKSx0aGlzLmdlbmVyYXRlTWlwbWFwcyYmKHRoaXMuZ2wucmVuZGVyZXIuaXNXZWJnbDJ8fFcodGhpcy5pbWFnZS53aWR0aCkmJlcodGhpcy5pbWFnZS5oZWlnaHQpP3RoaXMuZ2wuZ2VuZXJhdGVNaXBtYXAodGhpcy50YXJnZXQpOih0aGlzLmdlbmVyYXRlTWlwbWFwcz0hMSx0aGlzLndyYXBTPXRoaXMud3JhcFQ9dGhpcy5nbC5DTEFNUF9UT19FREdFLHRoaXMubWluRmlsdGVyPXRoaXMuZ2wuTElORUFSKSkpOnRoaXMud2lkdGg/dGhpcy5nbC50ZXhJbWFnZTJEKHRoaXMudGFyZ2V0LHRoaXMubGV2ZWwsdGhpcy5pbnRlcm5hbEZvcm1hdCx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0LDAsdGhpcy5mb3JtYXQsdGhpcy50eXBlLG51bGwpOnRoaXMuZ2wudGV4SW1hZ2UyRCh0aGlzLnRhcmdldCwwLHRoaXMuZ2wuUkdCQSwxLDEsMCx0aGlzLmdsLlJHQkEsdGhpcy5nbC5VTlNJR05FRF9CWVRFLFYpLHRoaXMuc3RvcmUuaW1hZ2U9dGhpcy5pbWFnZSx0aGlzLm9uVXBkYXRlJiZ0aGlzLm9uVXBkYXRlKCkpfX1jbGFzcyBwe2NvbnN0cnVjdG9yKGEse3dpZHRoOmI9YS5jYW52YXMud2lkdGgsaGVpZ2h0OmM9YS5jYW52YXMuaGVpZ2h0LHRhcmdldDprPWEuRlJBTUVCVUZGRVIsY29sb3I6bD0xLGRlcHRoOmU9ITAsc3RlbmNpbDpmPSExLGRlcHRoVGV4dHVyZTptPSExLHdyYXBTOmc9YS5DTEFNUF9UT19FREdFLHdyYXBUOmg9YS5DTEFNUF9UT19FREdFLG1pbkZpbHRlcjppPWEuTElORUFSLG1hZ0ZpbHRlcjpuPWksdHlwZTpwPWEuVU5TSUdORURfQllURSxmb3JtYXQ6aj1hLlJHQkEsaW50ZXJuYWxGb3JtYXQ6cT1qLHVucGFja0FsaWdubWVudDpyLHByZW11bHRpcGx5QWxwaGE6c309e30pe3RoaXMuZ2w9YSx0aGlzLndpZHRoPWIsdGhpcy5oZWlnaHQ9Yyx0aGlzLmJ1ZmZlcj10aGlzLmdsLmNyZWF0ZUZyYW1lYnVmZmVyKCksdGhpcy50YXJnZXQ9ayx0aGlzLmdsLmJpbmRGcmFtZWJ1ZmZlcih0aGlzLnRhcmdldCx0aGlzLmJ1ZmZlciksdGhpcy50ZXh0dXJlcz1bXTtmb3IobGV0IGQ9MDtkPGw7ZCsrKXRoaXMudGV4dHVyZXMucHVzaChuZXcgbyhhLHt3aWR0aDpiLGhlaWdodDpjLHdyYXBTOmcsd3JhcFQ6aCxtaW5GaWx0ZXI6aSxtYWdGaWx0ZXI6bix0eXBlOnAsZm9ybWF0OmosaW50ZXJuYWxGb3JtYXQ6cSx1bnBhY2tBbGlnbm1lbnQ6cixwcmVtdWx0aXBseUFscGhhOnMsZmxpcFk6ITEsZ2VuZXJhdGVNaXBtYXBzOiExfSkpLHRoaXMudGV4dHVyZXNbZF0udXBkYXRlKCksdGhpcy5nbC5mcmFtZWJ1ZmZlclRleHR1cmUyRCh0aGlzLnRhcmdldCx0aGlzLmdsLkNPTE9SX0FUVEFDSE1FTlQwK2QsdGhpcy5nbC5URVhUVVJFXzJELHRoaXMudGV4dHVyZXNbZF0udGV4dHVyZSwwKTt0aGlzLnRleHR1cmU9dGhpcy50ZXh0dXJlc1swXSxtJiYodGhpcy5nbC5yZW5kZXJlci5pc1dlYmdsMnx8dGhpcy5nbC5yZW5kZXJlci5nZXRFeHRlbnNpb24oXCJXRUJHTF9kZXB0aF90ZXh0dXJlXCIpKT8odGhpcy5kZXB0aFRleHR1cmU9bmV3IG8oYSx7d2lkdGg6YixoZWlnaHQ6Yyx3cmFwUzpnLHdyYXBUOmgsbWluRmlsdGVyOnRoaXMuZ2wuTkVBUkVTVCxtYWdGaWx0ZXI6dGhpcy5nbC5ORUFSRVNULGZsaXBZOiExLGZvcm1hdDp0aGlzLmdsLkRFUFRIX0NPTVBPTkVOVCxpbnRlcm5hbEZvcm1hdDphLnJlbmRlcmVyLmlzV2ViZ2wyP3RoaXMuZ2wuREVQVEhfQ09NUE9ORU5UMjQ6dGhpcy5nbC5ERVBUSF9DT01QT05FTlQsdHlwZTp0aGlzLmdsLlVOU0lHTkVEX0lOVCxnZW5lcmF0ZU1pcG1hcHM6ITF9KSx0aGlzLmRlcHRoVGV4dHVyZS51cGRhdGUoKSx0aGlzLmdsLmZyYW1lYnVmZmVyVGV4dHVyZTJEKHRoaXMudGFyZ2V0LHRoaXMuZ2wuREVQVEhfQVRUQUNITUVOVCx0aGlzLmdsLlRFWFRVUkVfMkQsdGhpcy5kZXB0aFRleHR1cmUudGV4dHVyZSwwKSk6KGUmJiFmJiYodGhpcy5kZXB0aEJ1ZmZlcj10aGlzLmdsLmNyZWF0ZVJlbmRlcmJ1ZmZlcigpLHRoaXMuZ2wuYmluZFJlbmRlcmJ1ZmZlcih0aGlzLmdsLlJFTkRFUkJVRkZFUix0aGlzLmRlcHRoQnVmZmVyKSx0aGlzLmdsLnJlbmRlcmJ1ZmZlclN0b3JhZ2UodGhpcy5nbC5SRU5ERVJCVUZGRVIsdGhpcy5nbC5ERVBUSF9DT01QT05FTlQxNixiLGMpLHRoaXMuZ2wuZnJhbWVidWZmZXJSZW5kZXJidWZmZXIodGhpcy50YXJnZXQsdGhpcy5nbC5ERVBUSF9BVFRBQ0hNRU5ULHRoaXMuZ2wuUkVOREVSQlVGRkVSLHRoaXMuZGVwdGhCdWZmZXIpKSxmJiYhZSYmKHRoaXMuc3RlbmNpbEJ1ZmZlcj10aGlzLmdsLmNyZWF0ZVJlbmRlcmJ1ZmZlcigpLHRoaXMuZ2wuYmluZFJlbmRlcmJ1ZmZlcih0aGlzLmdsLlJFTkRFUkJVRkZFUix0aGlzLnN0ZW5jaWxCdWZmZXIpLHRoaXMuZ2wucmVuZGVyYnVmZmVyU3RvcmFnZSh0aGlzLmdsLlJFTkRFUkJVRkZFUix0aGlzLmdsLlNURU5DSUxfSU5ERVg4LGIsYyksdGhpcy5nbC5mcmFtZWJ1ZmZlclJlbmRlcmJ1ZmZlcih0aGlzLnRhcmdldCx0aGlzLmdsLlNURU5DSUxfQVRUQUNITUVOVCx0aGlzLmdsLlJFTkRFUkJVRkZFUix0aGlzLnN0ZW5jaWxCdWZmZXIpKSxlJiZmJiYodGhpcy5kZXB0aFN0ZW5jaWxCdWZmZXI9dGhpcy5nbC5jcmVhdGVSZW5kZXJidWZmZXIoKSx0aGlzLmdsLmJpbmRSZW5kZXJidWZmZXIodGhpcy5nbC5SRU5ERVJCVUZGRVIsdGhpcy5kZXB0aFN0ZW5jaWxCdWZmZXIpLHRoaXMuZ2wucmVuZGVyYnVmZmVyU3RvcmFnZSh0aGlzLmdsLlJFTkRFUkJVRkZFUix0aGlzLmdsLkRFUFRIX1NURU5DSUwsYixjKSx0aGlzLmdsLmZyYW1lYnVmZmVyUmVuZGVyYnVmZmVyKHRoaXMudGFyZ2V0LHRoaXMuZ2wuREVQVEhfU1RFTkNJTF9BVFRBQ0hNRU5ULHRoaXMuZ2wuUkVOREVSQlVGRkVSLHRoaXMuZGVwdGhTdGVuY2lsQnVmZmVyKSkpLHRoaXMuZ2wuYmluZEZyYW1lYnVmZmVyKHRoaXMudGFyZ2V0LG51bGwpfX1jbGFzcyBxIGV4dGVuZHMgQXJyYXl7Y29uc3RydWN0b3IoYT0wLGI9MCxjPTApe3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiBhJiYoW2EsYixjXT1xLmhleFRvUkdCKGEpKSxzdXBlcihhLGIsYyksdGhpc31nZXQgcigpe3JldHVybiB0aGlzWzBdfXNldCByKGEpe3RoaXNbMF09YX1nZXQgZygpe3JldHVybiB0aGlzWzFdfXNldCBnKGEpe3RoaXNbMV09YX1nZXQgYigpe3JldHVybiB0aGlzWzJdfXNldCBiKGEpe3RoaXNbMl09YX1zZXQoYSxiLGMpe3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiBhJiYoW2EsYixjXT1xLmhleFRvUkdCKGEpKSxhLmxlbmd0aD90aGlzLmNvcHkoYSk6KHRoaXNbMF09YSx0aGlzWzFdPWIsdGhpc1syXT1jLHRoaXMpfWNvcHkoYSl7cmV0dXJuIHRoaXNbMF09YVswXSx0aGlzWzFdPWFbMV0sdGhpc1syXT1hWzJdLHRoaXN9c3RhdGljIGhleFRvUkdCKGEpezQ9PT1hLmxlbmd0aCYmKGE9YVswXSthWzFdK2FbMV0rYVsyXSthWzJdK2FbM10rYVszXSk7bGV0IGI9L14jPyhbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KSQvaS5leGVjKGEpO3JldHVybiBifHxjb25zb2xlLndhcm4oYFVuYWJsZSB0byBjb252ZXJ0IGhleCBzdHJpbmcgJHthfSB0byByZ2IgdmFsdWVzYCksW3BhcnNlSW50KGJbMV0sMTYpLzI1NSxwYXJzZUludChiWzJdLDE2KS8yNTUscGFyc2VJbnQoYlszXSwxNikvMjU1XX19ZnVuY3Rpb24gWShhLGIsYyl7cmV0dXJuIGFbMF09YlswXStjWzBdLGFbMV09YlsxXStjWzFdLGF9ZnVuY3Rpb24gJChhLGIsYyl7cmV0dXJuIGFbMF09YlswXS1jWzBdLGFbMV09YlsxXS1jWzFdLGF9ZnVuY3Rpb24gWihhLGIsYyl7cmV0dXJuIGFbMF09YlswXSpjLGFbMV09YlsxXSpjLGF9ZnVuY3Rpb24gYWEoYSl7dmFyIGI9YVswXSxjPWFbMV07cmV0dXJuIE1hdGguc3FydChiKmIrYypjKX1jbGFzcyBlIGV4dGVuZHMgQXJyYXl7Y29uc3RydWN0b3IoYT0wLGI9YSl7cmV0dXJuIHN1cGVyKGEsYiksdGhpc31nZXQgeCgpe3JldHVybiB0aGlzWzBdfXNldCB4KGEpe3RoaXNbMF09YX1nZXQgeSgpe3JldHVybiB0aGlzWzFdfXNldCB5KGEpe3RoaXNbMV09YX1zZXQoYSxlPWEpe3ZhciBiLGMsZDtyZXR1cm4gYS5sZW5ndGg/dGhpcy5jb3B5KGEpOihiPXRoaXMsYz1hLGQ9ZSxiWzBdPWMsYlsxXT1kLHRoaXMpfWNvcHkoYyl7dmFyIGIsYTtyZXR1cm4gYT1jLChiPXRoaXMpWzBdPWFbMF0sYlsxXT1hWzFdLHRoaXN9YWRkKGEsYil7cmV0dXJuIGI/WSh0aGlzLGEsYik6WSh0aGlzLHRoaXMsYSksdGhpc31zdWIoYSxiKXtyZXR1cm4gYj8kKHRoaXMsYSxiKTokKHRoaXMsdGhpcyxhKSx0aGlzfW11bHRpcGx5KGEpe3ZhciBkLGIsYztyZXR1cm4gYS5sZW5ndGg/KGI9dGhpcyxjPWEsKGQ9dGhpcylbMF09YlswXSpjWzBdLGRbMV09YlsxXSpjWzFdKTpaKHRoaXMsdGhpcyxhKSx0aGlzfWRpdmlkZShhKXt2YXIgZCxiLGM7cmV0dXJuIGEubGVuZ3RoPyhiPXRoaXMsYz1hLChkPXRoaXMpWzBdPWJbMF0vY1swXSxkWzFdPWJbMV0vY1sxXSk6Wih0aGlzLHRoaXMsMS9hKSx0aGlzfWludmVyc2UoYz10aGlzKXt2YXIgYixhO3JldHVybiBhPWMsKGI9dGhpcylbMF09MS9hWzBdLGJbMV09MS9hWzFdLHRoaXN9bGVuKCl7cmV0dXJuIGFhKHRoaXMpfWRpc3RhbmNlKGQpe3ZhciBhLGUsYixjO3JldHVybiBkPyhhPXRoaXMsYj0oZT1kKVswXS1hWzBdLGM9ZVsxXS1hWzFdLE1hdGguc3FydChiKmIrYypjKSk6YWEodGhpcyl9c3F1YXJlZExlbigpe3JldHVybiB0aGlzLnNxdWFyZWREaXN0YW5jZSgpfXNxdWFyZWREaXN0YW5jZShnKXt2YXIgYSxoLGIsYyxkLGUsZjtyZXR1cm4gZz8oYT10aGlzLGI9KGg9ZylbMF0tYVswXSxjPWhbMV0tYVsxXSxiKmIrYypjKTooZD10aGlzLGU9ZFswXSxmPWRbMV0sZSplK2YqZil9bmVnYXRlKGM9dGhpcyl7dmFyIGIsYTtyZXR1cm4gYT1jLChiPXRoaXMpWzBdPS1hWzBdLGJbMV09LWFbMV0sdGhpc31jcm9zcyhjLGQpe3ZhciBiLGE7cmV0dXJuIGE9ZCwoYj1jKVswXSphWzFdLWJbMV0qYVswXX1zY2FsZShhKXtyZXR1cm4gWih0aGlzLHRoaXMsYSksdGhpc31ub3JtYWxpemUoKXt2YXIgYyxiLGQsZSxhO3JldHVybiBjPXRoaXMsZD0oYj10aGlzKVswXSxlPWJbMV0sKGE9ZCpkK2UqZSk+MCYmKGE9MS9NYXRoLnNxcnQoYSkpLGNbMF09YlswXSphLGNbMV09YlsxXSphLHRoaXN9ZG90KGMpe3ZhciBiLGE7cmV0dXJuIGE9YywoYj10aGlzKVswXSphWzBdK2JbMV0qYVsxXX1lcXVhbHMoYyl7dmFyIGIsYTtyZXR1cm4gYT1jLChiPXRoaXMpWzBdPT09YVswXSYmYlsxXT09PWFbMV19YXBwbHlNYXRyaXgzKGYpe3ZhciBiLGUsYSxjLGQ7cmV0dXJuIGI9dGhpcyxhPWYsYz0oZT10aGlzKVswXSxkPWVbMV0sYlswXT1hWzBdKmMrYVszXSpkK2FbNl0sYlsxXT1hWzFdKmMrYVs0XSpkK2FbN10sdGhpc31hcHBseU1hdHJpeDQoZil7dmFyIGIsYyxhO2xldCBkLGU7cmV0dXJuIGI9dGhpcyxjPXRoaXMsYT1mLGQ9Y1swXSxlPWNbMV0sYlswXT1hWzBdKmQrYVs0XSplK2FbMTJdLGJbMV09YVsxXSpkK2FbNV0qZSthWzEzXSx0aGlzfWxlcnAoZyxoKXt2YXIgYSxiLGMsZCxlLGY7YT10aGlzLGI9dGhpcyxjPWcsZD1oLGU9YlswXSxmPWJbMV0sYVswXT1lK2QqKGNbMF0tZSksYVsxXT1mK2QqKGNbMV0tZil9Y2xvbmUoKXtyZXR1cm4gbmV3IGUodGhpc1swXSx0aGlzWzFdKX1mcm9tQXJyYXkoYSxiPTApe3JldHVybiB0aGlzWzBdPWFbYl0sdGhpc1sxXT1hW2IrMV0sdGhpc310b0FycmF5KGE9W10sYj0wKXtyZXR1cm4gYVtiXT10aGlzWzBdLGFbYisxXT10aGlzWzFdLGF9fWNsYXNzIHIgZXh0ZW5kcyBme2NvbnN0cnVjdG9yKGose3dpZHRoOms9MSxoZWlnaHQ6bD0xLHdpZHRoU2VnbWVudHM6bT0xLGhlaWdodFNlZ21lbnRzOm49MSxhdHRyaWJ1dGVzOmQ9e319PXt9KXtsZXQgYj1tLGM9bixhPShiKzEpKihjKzEpLGU9YipjKjYsZj1uZXcgRmxvYXQzMkFycmF5KDMqYSksZz1uZXcgRmxvYXQzMkFycmF5KDMqYSksaD1uZXcgRmxvYXQzMkFycmF5KDIqYSksaT1hPjY1NTM2P25ldyBVaW50MzJBcnJheShlKTpuZXcgVWludDE2QXJyYXkoZSk7ci5idWlsZFBsYW5lKGYsZyxoLGksayxsLDAsYixjKSxPYmplY3QuYXNzaWduKGQse3Bvc2l0aW9uOntzaXplOjMsZGF0YTpmfSxub3JtYWw6e3NpemU6MyxkYXRhOmd9LHV2OntzaXplOjIsZGF0YTpofSxpbmRleDp7ZGF0YTppfX0pLHN1cGVyKGosZCl9c3RhdGljIGJ1aWxkUGxhbmUoaSxqLGssZixsLG0sbixkLGcsbz0wLHA9MSxxPTIsdD0xLHU9LTEsYT0wLGU9MCl7bGV0IGg9YSx2PWwvZCx3PW0vZztmb3IobGV0IGI9MDtiPD1nO2IrKyl7bGV0IHg9Yip3LW0vMjtmb3IobGV0IGM9MDtjPD1kO2MrKyxhKyspe2xldCB5PWMqdi1sLzI7aWYoaVszKmErb109eSp0LGlbMyphK3BdPXgqdSxpWzMqYStxXT1uLzIsalszKmErb109MCxqWzMqYStwXT0wLGpbMyphK3FdPW4+PTA/MTotMSxrWzIqYV09Yy9kLGtbMiphKzFdPTEtYi9nLGI9PT1nfHxjPT09ZCljb250aW51ZTtsZXQgej1oK2MrYiooZCsxKSxyPWgrYysoYisxKSooZCsxKSxBPWgrYysoYisxKSooZCsxKSsxLHM9aCtjK2IqKGQrMSkrMTtmWzYqZV09eixmWzYqZSsxXT1yLGZbNiplKzJdPXMsZls2KmUrM109cixmWzYqZSs0XT1BLGZbNiplKzVdPXMsZSsrfX19fWxldCBhYj17Tk9ORTotMSxST1RBVEU6MCxET0xMWToxLFBBTjoyLERPTExZX1BBTjozfSxhYz1uZXcgYixhZD1uZXcgZSxhZT1uZXcgZSxhZj1uZXcgYixhZz1uZXcgYixhaD1uZXcgYixhaT1uZXcgYyxhaj1uZXcgYixhaz1uZXcgZCxhbD1uZXcgYixhbT1uZXcgYixhbj1uZXcgZCxhbz1uZXcgYjtjbGFzcyBze2NvbnN0cnVjdG9yKHtvYmplY3RzOmIsZGF0YTphfSl7dGhpcy5vYmplY3RzPWIsdGhpcy5kYXRhPWEsdGhpcy5lbGFwc2VkPTAsdGhpcy53ZWlnaHQ9MSx0aGlzLmR1cmF0aW9uPWEuZnJhbWVzLmxlbmd0aC0xfXVwZGF0ZShjPTEsZCl7bGV0IGU9ZD8xOnRoaXMud2VpZ2h0L2MsYj10aGlzLmVsYXBzZWQldGhpcy5kdXJhdGlvbixhPU1hdGguZmxvb3IoYiksZj1iLWEsZz10aGlzLmRhdGEuZnJhbWVzW2FdLGg9dGhpcy5kYXRhLmZyYW1lc1soYSsxKSV0aGlzLmR1cmF0aW9uXTt0aGlzLm9iamVjdHMuZm9yRWFjaCgoYixhKT0+e2FqLmZyb21BcnJheShnLnBvc2l0aW9uLDMqYSksYWsuZnJvbUFycmF5KGcucXVhdGVybmlvbiw0KmEpLGFsLmZyb21BcnJheShnLnNjYWxlLDMqYSksYW0uZnJvbUFycmF5KGgucG9zaXRpb24sMyphKSxhbi5mcm9tQXJyYXkoaC5xdWF0ZXJuaW9uLDQqYSksYW8uZnJvbUFycmF5KGguc2NhbGUsMyphKSxhai5sZXJwKGFtLGYpLGFrLnNsZXJwKGFuLGYpLGFsLmxlcnAoYW8sZiksYi5wb3NpdGlvbi5sZXJwKGFqLGUpLGIucXVhdGVybmlvbi5zbGVycChhayxlKSxiLnNjYWxlLmxlcnAoYWwsZSl9KX19bGV0IGFwPW5ldyBjO3JldHVybiBhLkFuaW1hdGlvbj1zLGEuQm94PWNsYXNzIGV4dGVuZHMgZntjb25zdHJ1Y3RvcihwLHt3aWR0aDpoPTEsaGVpZ2h0Omk9MSxkZXB0aDpqPTEsd2lkdGhTZWdtZW50czpxPTEsaGVpZ2h0U2VnbWVudHM6cz0xLGRlcHRoU2VnbWVudHM6dD0xLGF0dHJpYnV0ZXM6bj17fX09e30pe2xldCBjPXEsYT1zLGI9dCxtPShjKzEpKihhKzEpKjIrKGMrMSkqKGIrMSkqMisoYSsxKSooYisxKSoyLG89NiooYyphKjIrYypiKjIrYSpiKjIpLGQ9bmV3IEZsb2F0MzJBcnJheSgzKm0pLGU9bmV3IEZsb2F0MzJBcnJheSgzKm0pLGY9bmV3IEZsb2F0MzJBcnJheSgyKm0pLGc9bT42NTUzNj9uZXcgVWludDMyQXJyYXkobyk6bmV3IFVpbnQxNkFycmF5KG8pLGs9MCxsPTA7ci5idWlsZFBsYW5lKGQsZSxmLGcsaixpLGgsYixhLDIsMSwwLC0xLC0xLGssbCksci5idWlsZFBsYW5lKGQsZSxmLGcsaixpLC1oLGIsYSwyLDEsMCwxLC0xLGsrPShiKzEpKihhKzEpLGwrPWIqYSksci5idWlsZFBsYW5lKGQsZSxmLGcsaCxqLGksYixhLDAsMiwxLDEsMSxrKz0oYisxKSooYSsxKSxsKz1iKmEpLHIuYnVpbGRQbGFuZShkLGUsZixnLGgsaiwtaSxiLGEsMCwyLDEsMSwtMSxrKz0oYysxKSooYisxKSxsKz1jKmIpLHIuYnVpbGRQbGFuZShkLGUsZixnLGgsaSwtaixjLGEsMCwxLDIsLTEsLTEsays9KGMrMSkqKGIrMSksbCs9YypiKSxyLmJ1aWxkUGxhbmUoZCxlLGYsZyxoLGksaixjLGEsMCwxLDIsMSwtMSxrKz0oYysxKSooYSsxKSxsKz1jKmEpLE9iamVjdC5hc3NpZ24obix7cG9zaXRpb246e3NpemU6MyxkYXRhOmR9LG5vcm1hbDp7c2l6ZTozLGRhdGE6ZX0sdXY6e3NpemU6MixkYXRhOmZ9LGluZGV4OntkYXRhOmd9fSksc3VwZXIocCxuKX19LGEuQ2FtZXJhPWNsYXNzIGV4dGVuZHMgZ3tjb25zdHJ1Y3RvcihkLHtuZWFyOmU9LjEsZmFyOmY9MTAwLGZvdjpnPTQ1LGFzcGVjdDpoPTEsbGVmdDphLHJpZ2h0OmIsYm90dG9tOmksdG9wOmp9PXt9KXtzdXBlcihkKSx0aGlzLm5lYXI9ZSx0aGlzLmZhcj1mLHRoaXMuZm92PWcsdGhpcy5hc3BlY3Q9aCx0aGlzLnByb2plY3Rpb25NYXRyaXg9bmV3IGMsdGhpcy52aWV3TWF0cml4PW5ldyBjLHRoaXMucHJvamVjdGlvblZpZXdNYXRyaXg9bmV3IGMsYXx8Yj90aGlzLm9ydGhvZ3JhcGhpYyh7bGVmdDphLHJpZ2h0OmIsYm90dG9tOmksdG9wOmp9KTp0aGlzLnBlcnNwZWN0aXZlKCl9cGVyc3BlY3RpdmUoe25lYXI6YT10aGlzLm5lYXIsZmFyOmI9dGhpcy5mYXIsZm92OmM9dGhpcy5mb3YsYXNwZWN0OmQ9dGhpcy5hc3BlY3R9PXt9KXtyZXR1cm4gdGhpcy5wcm9qZWN0aW9uTWF0cml4LmZyb21QZXJzcGVjdGl2ZSh7Zm92OmMqKE1hdGguUEkvMTgwKSxhc3BlY3Q6ZCxuZWFyOmEsZmFyOmJ9KSx0aGlzLnR5cGU9XCJwZXJzcGVjdGl2ZVwiLHRoaXN9b3J0aG9ncmFwaGljKHtuZWFyOmE9dGhpcy5uZWFyLGZhcjpiPXRoaXMuZmFyLGxlZnQ6Yz0tMSxyaWdodDpkPTEsYm90dG9tOmU9LTEsdG9wOmY9MX09e30pe3JldHVybiB0aGlzLnByb2plY3Rpb25NYXRyaXguZnJvbU9ydGhvZ29uYWwoe2xlZnQ6YyxyaWdodDpkLGJvdHRvbTplLHRvcDpmLG5lYXI6YSxmYXI6Yn0pLHRoaXMudHlwZT1cIm9ydGhvZ3JhcGhpY1wiLHRoaXN9dXBkYXRlTWF0cml4V29ybGQoKXtyZXR1cm4gc3VwZXIudXBkYXRlTWF0cml4V29ybGQoKSx0aGlzLnZpZXdNYXRyaXguaW52ZXJzZSh0aGlzLndvcmxkTWF0cml4KSx0aGlzLnByb2plY3Rpb25WaWV3TWF0cml4Lm11bHRpcGx5KHRoaXMucHJvamVjdGlvbk1hdHJpeCx0aGlzLnZpZXdNYXRyaXgpLHRoaXN9bG9va0F0KGEpe3JldHVybiBzdXBlci5sb29rQXQoYSwhMCksdGhpc31wcm9qZWN0KGEpe3JldHVybiBhLmFwcGx5TWF0cml4NCh0aGlzLnZpZXdNYXRyaXgpLGEuYXBwbHlNYXRyaXg0KHRoaXMucHJvamVjdGlvbk1hdHJpeCksdGhpc311bnByb2plY3QoYSl7cmV0dXJuIGEuYXBwbHlNYXRyaXg0KFEuaW52ZXJzZSh0aGlzLnByb2plY3Rpb25NYXRyaXgpKSxhLmFwcGx5TWF0cml4NCh0aGlzLndvcmxkTWF0cml4KSx0aGlzfXVwZGF0ZUZydXN0dW0oKXt0aGlzLmZydXN0dW18fCh0aGlzLmZydXN0dW09W25ldyBiLG5ldyBiLG5ldyBiLG5ldyBiLG5ldyBiLG5ldyBiXSk7bGV0IGE9dGhpcy5wcm9qZWN0aW9uVmlld01hdHJpeDt0aGlzLmZydXN0dW1bMF0uc2V0KGFbM10tYVswXSxhWzddLWFbNF0sYVsxMV0tYVs4XSkuY29uc3RhbnQ9YVsxNV0tYVsxMl0sdGhpcy5mcnVzdHVtWzFdLnNldChhWzNdK2FbMF0sYVs3XSthWzRdLGFbMTFdK2FbOF0pLmNvbnN0YW50PWFbMTVdK2FbMTJdLHRoaXMuZnJ1c3R1bVsyXS5zZXQoYVszXSthWzFdLGFbN10rYVs1XSxhWzExXSthWzldKS5jb25zdGFudD1hWzE1XSthWzEzXSx0aGlzLmZydXN0dW1bM10uc2V0KGFbM10tYVsxXSxhWzddLWFbNV0sYVsxMV0tYVs5XSkuY29uc3RhbnQ9YVsxNV0tYVsxM10sdGhpcy5mcnVzdHVtWzRdLnNldChhWzNdLWFbMl0sYVs3XS1hWzZdLGFbMTFdLWFbMTBdKS5jb25zdGFudD1hWzE1XS1hWzE0XSx0aGlzLmZydXN0dW1bNV0uc2V0KGFbM10rYVsyXSxhWzddK2FbNl0sYVsxMV0rYVsxMF0pLmNvbnN0YW50PWFbMTVdK2FbMTRdO2ZvcihsZXQgYz0wO2M8NjtjKyspe2xldCBkPTEvdGhpcy5mcnVzdHVtW2NdLmRpc3RhbmNlKCk7dGhpcy5mcnVzdHVtW2NdLm11bHRpcGx5KGQpLHRoaXMuZnJ1c3R1bVtjXS5jb25zdGFudCo9ZH19ZnJ1c3R1bUludGVyc2VjdHNNZXNoKGEpe2lmKCFhLmdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb24pcmV0dXJuITA7YS5nZW9tZXRyeS5ib3VuZHMmJmEuZ2VvbWV0cnkuYm91bmRzLnJhZGl1cyE9PTEvMHx8YS5nZW9tZXRyeS5jb21wdXRlQm91bmRpbmdTcGhlcmUoKTtsZXQgYj1SO2IuY29weShhLmdlb21ldHJ5LmJvdW5kcy5jZW50ZXIpLGIuYXBwbHlNYXRyaXg0KGEud29ybGRNYXRyaXgpO2xldCBjPWEuZ2VvbWV0cnkuYm91bmRzLnJhZGl1cyphLndvcmxkTWF0cml4LmdldE1heFNjYWxlT25BeGlzKCk7cmV0dXJuIHRoaXMuZnJ1c3R1bUludGVyc2VjdHNTcGhlcmUoYixjKX1mcnVzdHVtSW50ZXJzZWN0c1NwaGVyZShjLGQpe2xldCBlPVM7Zm9yKGxldCBhPTA7YTw2O2ErKyl7bGV0IGI9dGhpcy5mcnVzdHVtW2FdO2lmKGUuY29weShiKS5kb3QoYykrYi5jb25zdGFudDwgLWQpcmV0dXJuITF9cmV0dXJuITB9fSxhLkNvbG9yPXEsYS5DeWxpbmRlcj1jbGFzcyBleHRlbmRzIGZ7Y29uc3RydWN0b3IoQSx7cmFkaXVzOnc9LjUsaGVpZ2h0OnI9MSxyYWRpYWxTZWdtZW50czpzPTE2LGhlaWdodFNlZ21lbnRzOnQ9MSxhdHRyaWJ1dGVzOng9e319PXt9KXtsZXQgdT1zLG89dCxxPShzKzEpKih0KzEpKzIseT1zKigyKzIqdCkqMyxoPW5ldyBGbG9hdDMyQXJyYXkoMypxKSxpPW5ldyBGbG9hdDMyQXJyYXkoMypxKSxuPW5ldyBGbG9hdDMyQXJyYXkoMipxKSxkPXE+NjU1MzY/bmV3IFVpbnQzMkFycmF5KHkpOm5ldyBVaW50MTZBcnJheSh5KSxrLGwsbSxhPTAsZT1uZXcgYjtrPTAsbD0tMC41KnIsbT0wLGhbMyphKzBdPWssaFszKmErMV09bCxoWzMqYSsyXT1tLGUuc2V0KGssbCxtKS5ub3JtYWxpemUoKSxpWzMqYV09ZS54LGlbMyphKzFdPWUueSxpWzMqYSsyXT1lLnosblsyKmFdPTAsblsyKmErMV09MTtsZXQgQj1hO2s9MCxsPS41KnIsbT0wLGhbMyogKythKzBdPWssaFszKmErMV09bCxoWzMqYSsyXT1tLGUuc2V0KGssbCxtKS5ub3JtYWxpemUoKSxpWzMqYV09ZS54LGlbMyphKzFdPWUueSxpWzMqYSsyXT1lLnosblsyKmFdPTAsblsyKmErMV09MDtsZXQgQz1hO2ErKztmb3IodmFyIGY9MDtmPHUrMTtmKyspe2xldCB2PWYvdTtmb3IodmFyIGc9MDtnPG8rMTtnKyspe2xldCB6PWcvbztrPU1hdGguY29zKHYqTWF0aC5QSSoyKSp3LGw9KHotLjUpKnIsbT1NYXRoLnNpbih2Kk1hdGguUEkqMikqdyxoWzMqYSswXT1rLGhbMyphKzFdPWwsaFszKmErMl09bSxlLnNldChrLGwsbSkubm9ybWFsaXplKCksaVszKmFdPWUueCxpWzMqYSsxXT1lLnksaVszKmErMl09ZS56LG5bMiphXT12LG5bMiphKzFdPTEteixhKyt9fWxldCBjPTAsaj1vKzE7Zm9yKGY9MDtmPHU7ZisrKXtsZXQgcD1mKzE7Zm9yKGRbMypjKzBdPUIsZFszKmMrMV09MitmKmosZFszKmMrMl09MitwKmosYysrLGc9MDtnPG87ZysrKWRbMypjKzBdPTIrZipqKyhnKzApLGRbMypjKzFdPTIrZipqKyhnKzEpLGRbMypjKzJdPTIrcCpqKyhnKzApLGRbMyogKytjKzBdPTIrcCpqKyhnKzApLGRbMypjKzFdPTIrZipqKyhnKzEpLGRbMypjKzJdPTIrcCpqKyhnKzEpLGMrKztkWzMqYyswXT0yK3AqaitvLGRbMypjKzFdPTIrZipqK28sZFszKmMrMl09QyxjKyt9T2JqZWN0LmFzc2lnbih4LHtwb3NpdGlvbjp7c2l6ZTozLGRhdGE6aH0sbm9ybWFsOntzaXplOjMsZGF0YTppfSx1djp7c2l6ZToyLGRhdGE6bn0saW5kZXg6e2RhdGE6ZH19KSxzdXBlcihBLHgpfX0sYS5FdWxlcj1sLGEuRmxvd21hcD1jbGFzc3tjb25zdHJ1Y3RvcihhLHtzaXplOmk9NTEyLGZhbGxvZmY6Yz0uMyxhbHBoYTpkPTEsZGlzc2lwYXRpb246Zz0uOTZ9PXt9KXtsZXQgYj10aGlzO3RoaXMuZ2w9YSx0aGlzLnVuaWZvcm09e3ZhbHVlOm51bGx9LHRoaXMubWFzaz17cmVhZDpudWxsLHdyaXRlOm51bGwsc3dhcCgpe2xldCBhPWIubWFzay5yZWFkO2IubWFzay5yZWFkPWIubWFzay53cml0ZSxiLm1hc2sud3JpdGU9YSxiLnVuaWZvcm0udmFsdWU9Yi5tYXNrLnJlYWQudGV4dHVyZX19LGZ1bmN0aW9uKCl7bGV0IGQ9YS5yZW5kZXJlci5leHRlbnNpb25zW2BPRVNfdGV4dHVyZV8ke2EucmVuZGVyZXIuaXNXZWJnbDI/XCJcIjpcImhhbGZfXCJ9ZmxvYXRfbGluZWFyYF0sYz17d2lkdGg6aSxoZWlnaHQ6aSx0eXBlOmEucmVuZGVyZXIuaXNXZWJnbDI/YS5IQUxGX0ZMT0FUOmEucmVuZGVyZXIuZXh0ZW5zaW9ucy5PRVNfdGV4dHVyZV9oYWxmX2Zsb2F0P2EucmVuZGVyZXIuZXh0ZW5zaW9ucy5PRVNfdGV4dHVyZV9oYWxmX2Zsb2F0LkhBTEZfRkxPQVRfT0VTOmEuVU5TSUdORURfQllURSxmb3JtYXQ6YS5SR0JBLGludGVybmFsRm9ybWF0OmEucmVuZGVyZXIuaXNXZWJnbDI/YS5SR0JBMTZGOmEuUkdCQSxtaW5GaWx0ZXI6ZD9hLkxJTkVBUjphLk5FQVJFU1QsZGVwdGg6ITF9O2IubWFzay5yZWFkPW5ldyBwKGEsYyksYi5tYXNrLndyaXRlPW5ldyBwKGEsYyksYi5tYXNrLnN3YXAoKX0oKSx0aGlzLmFzcGVjdD0xLHRoaXMubW91c2U9bmV3IGUsdGhpcy52ZWxvY2l0eT1uZXcgZSx0aGlzLm1lc2g9bmV3IG4oYSx7Z2VvbWV0cnk6bmV3IGYoYSx7cG9zaXRpb246e3NpemU6MixkYXRhOm5ldyBGbG9hdDMyQXJyYXkoWy0xLC0xLDMsLTEsLTEsM10pfSx1djp7c2l6ZToyLGRhdGE6bmV3IEZsb2F0MzJBcnJheShbMCwwLDIsMCwwLDJdKX19KSxwcm9ncmFtOm5ldyBoKGEse3ZlcnRleDpcIlxcbiAgICBhdHRyaWJ1dGUgdmVjMiB1djtcXG4gICAgYXR0cmlidXRlIHZlYzIgcG9zaXRpb247XFxuXFxuICAgIHZhcnlpbmcgdmVjMiB2VXY7XFxuXFxuICAgIHZvaWQgbWFpbigpIHtcXG4gICAgICAgIHZVdiA9IHV2O1xcbiAgICAgICAgZ2xfUG9zaXRpb24gPSB2ZWM0KHBvc2l0aW9uLCAwLCAxKTtcXG4gICAgfVxcblwiLGZyYWdtZW50OlwiXFxuICAgIHByZWNpc2lvbiBoaWdocCBmbG9hdDtcXG5cXG4gICAgdW5pZm9ybSBzYW1wbGVyMkQgdE1hcDtcXG5cXG4gICAgdW5pZm9ybSBmbG9hdCB1RmFsbG9mZjtcXG4gICAgdW5pZm9ybSBmbG9hdCB1QWxwaGE7XFxuICAgIHVuaWZvcm0gZmxvYXQgdURpc3NpcGF0aW9uO1xcblxcbiAgICB1bmlmb3JtIGZsb2F0IHVBc3BlY3Q7XFxuICAgIHVuaWZvcm0gdmVjMiB1TW91c2U7XFxuICAgIHVuaWZvcm0gdmVjMiB1VmVsb2NpdHk7XFxuXFxuICAgIHZhcnlpbmcgdmVjMiB2VXY7XFxuXFxuICAgIHZvaWQgbWFpbigpIHtcXG5cXG4gICAgICB2ZWMyIGN1cnNvciA9IHZVdiAtIHVNb3VzZTtcXG5cXG4gICAgICAgIHZlYzQgY29sb3IgPSB0ZXh0dXJlMkQodE1hcCwgdlV2KSAqIHVEaXNzaXBhdGlvbjtcXG5cXG4gICAgICAgIGN1cnNvci54ICo9IHVBc3BlY3Q7XFxuXFxuICAgICAgICB2ZWMzIHN0YW1wID0gdmVjMyh1VmVsb2NpdHkgKiB2ZWMyKDEsIC0xKSwgMS4wIC0gcG93KDEuMCAtIG1pbigxLjAsIGxlbmd0aCh1VmVsb2NpdHkpKSwgMy4wKSk7XFxuICAgICAgICBmbG9hdCBmYWxsb2ZmID0gc21vb3Roc3RlcCh1RmFsbG9mZiwgMC4wLCBsZW5ndGgoY3Vyc29yKSkgKiB1QWxwaGE7XFxuXFxuICAgICAgICBjb2xvci5yZ2IgPSBtaXgoY29sb3IucmdiLCBzdGFtcCwgdmVjMyhmYWxsb2ZmKSk7XFxuXFxuICAgICAgICBnbF9GcmFnQ29sb3IgPSBjb2xvcjtcXG4gICAgfVxcblwiLHVuaWZvcm1zOnt0TWFwOmIudW5pZm9ybSx1RmFsbG9mZjp7dmFsdWU6LjUqY30sdUFscGhhOnt2YWx1ZTpkfSx1RGlzc2lwYXRpb246e3ZhbHVlOmd9LHVBc3BlY3Q6e3ZhbHVlOjF9LHVNb3VzZTp7dmFsdWU6Yi5tb3VzZX0sdVZlbG9jaXR5Ont2YWx1ZTpiLnZlbG9jaXR5fX0sZGVwdGhUZXN0OiExfSl9KX11cGRhdGUoKXt0aGlzLm1lc2gucHJvZ3JhbS51bmlmb3Jtcy51QXNwZWN0LnZhbHVlPXRoaXMuYXNwZWN0LHRoaXMuZ2wucmVuZGVyZXIucmVuZGVyKHtzY2VuZTp0aGlzLm1lc2gsdGFyZ2V0OnRoaXMubWFzay53cml0ZSxjbGVhcjohMX0pLHRoaXMubWFzay5zd2FwKCl9fSxhLkdQR1BVPWNsYXNze2NvbnN0cnVjdG9yKGEse2RhdGE6ZD1uZXcgRmxvYXQzMkFycmF5KDE2KSxnZW9tZXRyeTplPW5ldyBmKGEse3Bvc2l0aW9uOntzaXplOjIsZGF0YTpuZXcgRmxvYXQzMkFycmF5KFstMSwtMSwzLC0xLC0xLDNdKX0sdXY6e3NpemU6MixkYXRhOm5ldyBGbG9hdDMyQXJyYXkoWzAsMCwyLDAsMCwyXSl9fSl9KXt0aGlzLmdsPWE7bGV0IGc9ZDt0aGlzLnBhc3Nlcz1bXSx0aGlzLmdlb21ldHJ5PWUsdGhpcy5kYXRhTGVuZ3RoPWcubGVuZ3RoLzQsdGhpcy5zaXplPU1hdGgucG93KDIsTWF0aC5jZWlsKE1hdGgubG9nKE1hdGguY2VpbChNYXRoLnNxcnQodGhpcy5kYXRhTGVuZ3RoKSkpL01hdGguTE4yKSksdGhpcy5jb29yZHM9bmV3IEZsb2F0MzJBcnJheSgyKnRoaXMuZGF0YUxlbmd0aCk7Zm9yKGxldCBiPTA7Yjx0aGlzLmRhdGFMZW5ndGg7YisrKXtsZXQgaD1iJXRoaXMuc2l6ZS90aGlzLnNpemUsaT1NYXRoLmZsb29yKGIvdGhpcy5zaXplKS90aGlzLnNpemU7dGhpcy5jb29yZHMuc2V0KFtoLGldLDIqYil9bGV0IGo9KCgpPT57aWYoZy5sZW5ndGg9PT10aGlzLnNpemUqdGhpcy5zaXplKjQpcmV0dXJuIGc7e2xldCBhPW5ldyBGbG9hdDMyQXJyYXkodGhpcy5zaXplKnRoaXMuc2l6ZSo0KTtyZXR1cm4gYS5zZXQoZyksYX19KSgpO3RoaXMudW5pZm9ybT17dmFsdWU6bmV3IG8oYSx7aW1hZ2U6aix0YXJnZXQ6YS5URVhUVVJFXzJELHR5cGU6YS5GTE9BVCxmb3JtYXQ6YS5SR0JBLGludGVybmFsRm9ybWF0OmEucmVuZGVyZXIuaXNXZWJnbDI/YS5SR0JBMzJGOmEuUkdCQSx3cmFwUzphLkNMQU1QX1RPX0VER0Usd3JhcFQ6YS5DTEFNUF9UT19FREdFLGdlbmVyYXRlTWlwbWFwczohMSxtaW5GaWx0ZXI6YS5ORUFSRVNULG1hZ0ZpbHRlcjphLk5FQVJFU1Qsd2lkdGg6dGhpcy5zaXplLGZsaXBZOiExfSl9O2xldCBjPXt3aWR0aDp0aGlzLnNpemUsaGVpZ2h0OnRoaXMuc2l6ZSx0eXBlOmEucmVuZGVyZXIuaXNXZWJnbDI/YS5IQUxGX0ZMT0FUOmEucmVuZGVyZXIuZXh0ZW5zaW9ucy5PRVNfdGV4dHVyZV9oYWxmX2Zsb2F0P2EucmVuZGVyZXIuZXh0ZW5zaW9ucy5PRVNfdGV4dHVyZV9oYWxmX2Zsb2F0LkhBTEZfRkxPQVRfT0VTOmEuVU5TSUdORURfQllURSxmb3JtYXQ6YS5SR0JBLGludGVybmFsRm9ybWF0OmEucmVuZGVyZXIuaXNXZWJnbDI/YS5SR0JBMTZGOmEuUkdCQSxtaW5GaWx0ZXI6YS5ORUFSRVNULGRlcHRoOiExLHVucGFja0FsaWdubWVudDoxfTt0aGlzLmZibz17cmVhZDpuZXcgcChhLGMpLHdyaXRlOm5ldyBwKGEsYyksc3dhcDooKT0+e2xldCBhPXRoaXMuZmJvLnJlYWQ7dGhpcy5mYm8ucmVhZD10aGlzLmZiby53cml0ZSx0aGlzLmZiby53cml0ZT1hLHRoaXMudW5pZm9ybS52YWx1ZT10aGlzLmZiby5yZWFkLnRleHR1cmV9fX1hZGRQYXNzKHt2ZXJ0ZXg6ZT1cIlxcbiAgICBhdHRyaWJ1dGUgdmVjMiB1djtcXG4gICAgYXR0cmlidXRlIHZlYzIgcG9zaXRpb247XFxuXFxuICAgIHZhcnlpbmcgdmVjMiB2VXY7XFxuXFxuICAgIHZvaWQgbWFpbigpIHtcXG4gICAgICAgIHZVdiA9IHV2O1xcbiAgICAgICAgZ2xfUG9zaXRpb24gPSB2ZWM0KHBvc2l0aW9uLCAwLCAxKTtcXG4gICAgfVxcblwiLGZyYWdtZW50OmY9XCJcXG4gICAgcHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xcblxcbiAgICB1bmlmb3JtIHNhbXBsZXIyRCB0TWFwO1xcbiAgICB2YXJ5aW5nIHZlYzIgdlV2O1xcblxcbiAgICB2b2lkIG1haW4oKSB7XFxuICAgICAgICBnbF9GcmFnQ29sb3IgPSB0ZXh0dXJlMkQodE1hcCwgdlV2KTtcXG4gICAgfVxcblwiLHVuaWZvcm1zOmE9e30sdGV4dHVyZVVuaWZvcm06Yj1cInRNYXBcIixlbmFibGVkOmc9ITB9PXt9KXthW2JdPXRoaXMudW5pZm9ybTtsZXQgYz1uZXcgaCh0aGlzLmdsLHt2ZXJ0ZXg6ZSxmcmFnbWVudDpmLHVuaWZvcm1zOmF9KSxkPXttZXNoOm5ldyBuKHRoaXMuZ2wse2dlb21ldHJ5OnRoaXMuZ2VvbWV0cnkscHJvZ3JhbTpjfSkscHJvZ3JhbTpjLHVuaWZvcm1zOmEsZW5hYmxlZDpnLHRleHR1cmVVbmlmb3JtOmJ9O3JldHVybiB0aGlzLnBhc3Nlcy5wdXNoKGQpLGR9cmVuZGVyKCl7dGhpcy5wYXNzZXMuZmlsdGVyKGE9PmEuZW5hYmxlZCkuZm9yRWFjaCgoYSxiKT0+e3RoaXMuZ2wucmVuZGVyZXIucmVuZGVyKHtzY2VuZTphLm1lc2gsdGFyZ2V0OnRoaXMuZmJvLndyaXRlLGNsZWFyOiExfSksdGhpcy5mYm8uc3dhcCgpfSl9fSxhLkdlb21ldHJ5PWYsYS5NYXQzPW0sYS5NYXQ0PWMsYS5NZXNoPW4sYS5Ob3JtYWxQcm9ncmFtPWZ1bmN0aW9uKGEpe3JldHVybiBuZXcgaChhLHt2ZXJ0ZXg6XCJcXG5wcmVjaXNpb24gaGlnaHAgZmxvYXQ7XFxucHJlY2lzaW9uIGhpZ2hwIGludDtcXG5cXG5hdHRyaWJ1dGUgdmVjMyBwb3NpdGlvbjtcXG5hdHRyaWJ1dGUgdmVjMyBub3JtYWw7XFxuXFxudW5pZm9ybSBtYXQzIG5vcm1hbE1hdHJpeDtcXG51bmlmb3JtIG1hdDQgbW9kZWxWaWV3TWF0cml4O1xcbnVuaWZvcm0gbWF0NCBwcm9qZWN0aW9uTWF0cml4O1xcblxcbnZhcnlpbmcgdmVjMyB2Tm9ybWFsO1xcblxcbnZvaWQgbWFpbigpIHtcXG4gICAgdk5vcm1hbCA9IG5vcm1hbGl6ZShub3JtYWxNYXRyaXggKiBub3JtYWwpO1xcbiAgICBnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KHBvc2l0aW9uLCAxLjApO1xcbn1cXG5cIixmcmFnbWVudDpcIlxcbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcXG5wcmVjaXNpb24gaGlnaHAgaW50O1xcblxcbnZhcnlpbmcgdmVjMyB2Tm9ybWFsO1xcblxcbnZvaWQgbWFpbigpIHtcXG4gICAgZ2xfRnJhZ0NvbG9yLnJnYiA9IG5vcm1hbGl6ZSh2Tm9ybWFsKTtcXG4gICAgZ2xfRnJhZ0NvbG9yLmEgPSAxLjA7XFxufVxcblwifSl9LGEuT3JiaXQ9ZnVuY3Rpb24oaSx7ZWxlbWVudDphPWRvY3VtZW50LGVuYWJsZWQ6aj0hMCx0YXJnZXQ6az1uZXcgYixlYXNlOmc9LjI1LGluZXJ0aWE6aD0uODUsZW5hYmxlUm90YXRlOnQ9ITAscm90YXRlU3BlZWQ6dT0uMSxlbmFibGVab29tOnY9ITAsem9vbVNwZWVkOnc9MSxlbmFibGVQYW46eD0hMCxwYW5TcGVlZDp5PS4xLG1pblBvbGFyQW5nbGU6ej0wLG1heFBvbGFyQW5nbGU6QT1NYXRoLlBJLG1pbkF6aW11dGhBbmdsZTpCPS0xLzAsbWF4QXppbXV0aEFuZ2xlOkM9MS8wLG1pbkRpc3RhbmNlOmw9MCxtYXhEaXN0YW5jZTptPTEvMH09e30pe3RoaXMuZW5hYmxlZD1qLHRoaXMudGFyZ2V0PWssZz1nfHwxLGg9aHx8MSx0aGlzLm1pbkRpc3RhbmNlPWwsdGhpcy5tYXhEaXN0YW5jZT1tO2xldCBEPXtyYWRpdXM6MSxwaGk6MCx0aGV0YTowfSxkPXtyYWRpdXM6MSxwaGk6MCx0aGV0YTowfSxmPXtyYWRpdXM6MSxwaGk6MCx0aGV0YTowfSxFPW5ldyBiLGM9bmV3IGI7Yy5jb3B5KGkucG9zaXRpb24pLnN1Yih0aGlzLnRhcmdldCksZi5yYWRpdXM9ZC5yYWRpdXM9Yy5kaXN0YW5jZSgpLGYudGhldGE9ZC50aGV0YT1NYXRoLmF0YW4yKGMueCxjLnopLGYucGhpPWQucGhpPU1hdGguYWNvcyhNYXRoLm1pbihNYXRoLm1heChjLnkvZC5yYWRpdXMsLTEpLDEpKSx0aGlzLnVwZGF0ZT0oKT0+e2QucmFkaXVzKj1ELnJhZGl1cyxkLnRoZXRhKz1ELnRoZXRhLGQucGhpKz1ELnBoaSxkLnRoZXRhPU1hdGgubWF4KEIsTWF0aC5taW4oQyxkLnRoZXRhKSksZC5waGk9TWF0aC5tYXgoeixNYXRoLm1pbihBLGQucGhpKSksZC5yYWRpdXM9TWF0aC5tYXgodGhpcy5taW5EaXN0YW5jZSxNYXRoLm1pbih0aGlzLm1heERpc3RhbmNlLGQucmFkaXVzKSksZi5waGkrPShkLnBoaS1mLnBoaSkqZyxmLnRoZXRhKz0oZC50aGV0YS1mLnRoZXRhKSpnLGYucmFkaXVzKz0oZC5yYWRpdXMtZi5yYWRpdXMpKmcsdGhpcy50YXJnZXQuYWRkKEUpO2xldCBhPWYucmFkaXVzKk1hdGguc2luKE1hdGgubWF4KDFlLTYsZi5waGkpKTtjLng9YSpNYXRoLnNpbihmLnRoZXRhKSxjLnk9Zi5yYWRpdXMqTWF0aC5jb3MoZi5waGkpLGMuej1hKk1hdGguY29zKGYudGhldGEpLGkucG9zaXRpb24uY29weSh0aGlzLnRhcmdldCkuYWRkKGMpLGkubG9va0F0KHRoaXMudGFyZ2V0KSxELnRoZXRhKj1oLEQucGhpKj1oLEUubXVsdGlwbHkoaCksRC5yYWRpdXM9MX07bGV0IEY9bmV3IGUsRz1uZXcgZSxIPW5ldyBlLF89YWIuTk9ORTtmdW5jdGlvbiBJKCl7cmV0dXJuIE1hdGgucG93KC45NSx3KX10aGlzLm1vdXNlQnV0dG9ucz17T1JCSVQ6MCxaT09NOjEsUEFOOjJ9O2xldCBKPShoLGopPT57dmFyIGQsYixlLGM7bGV0IGY9YT09PWRvY3VtZW50P2RvY3VtZW50LmJvZHk6YTthYy5jb3B5KGkucG9zaXRpb24pLnN1Yih0aGlzLnRhcmdldCk7bGV0IGc9YWMuZGlzdGFuY2UoKTtkPTIqaCooZyo9TWF0aC50YW4oKGkuZm92fHw0NSkvMipNYXRoLlBJLzE4MCkpL2YuY2xpZW50SGVpZ2h0LGI9aS5tYXRyaXgsYWMuc2V0KGJbMF0sYlsxXSxiWzJdKSxhYy5tdWx0aXBseSgtZCksRS5hZGQoYWMpLGU9MipqKmcvZi5jbGllbnRIZWlnaHQsYz1pLm1hdHJpeCxhYy5zZXQoY1s0XSxjWzVdLGNbNl0pLGFjLm11bHRpcGx5KGUpLEUuYWRkKGFjKX07ZnVuY3Rpb24gSyhhKXtELnJhZGl1cy89YX1mdW5jdGlvbiBMKGMsZCl7YWQuc2V0KGMsZCksYWUuc3ViKGFkLEYpLm11bHRpcGx5KHUpO2xldCBiPWE9PT1kb2N1bWVudD9kb2N1bWVudC5ib2R5OmE7RC50aGV0YS09MipNYXRoLlBJKmFlLngvYi5jbGllbnRIZWlnaHQsRC5waGktPTIqTWF0aC5QSSphZS55L2IuY2xpZW50SGVpZ2h0LEYuY29weShhZCl9ZnVuY3Rpb24gTShhLGIpe2FkLnNldChhLGIpLGFlLnN1YihhZCxHKS5tdWx0aXBseSh5KSxKKGFlLngsYWUueSksRy5jb3B5KGFkKX1sZXQgbj1hPT57aWYodGhpcy5lbmFibGVkKXtzd2l0Y2goYS5idXR0b24pe2Nhc2UgdGhpcy5tb3VzZUJ1dHRvbnMuT1JCSVQ6aWYoITE9PT10KXJldHVybjtGLnNldChhLmNsaWVudFgsYS5jbGllbnRZKSxfPWFiLlJPVEFURTticmVhaztjYXNlIHRoaXMubW91c2VCdXR0b25zLlpPT006aWYoITE9PT12KXJldHVybjtILnNldChhLmNsaWVudFgsYS5jbGllbnRZKSxfPWFiLkRPTExZO2JyZWFrO2Nhc2UgdGhpcy5tb3VzZUJ1dHRvbnMuUEFOOmlmKCExPT09eClyZXR1cm47Ry5zZXQoYS5jbGllbnRYLGEuY2xpZW50WSksXz1hYi5QQU59XyE9PWFiLk5PTkUmJih3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLE4sITEpLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLE8sITEpKX19LE49YT0+e2lmKHRoaXMuZW5hYmxlZClzd2l0Y2goXyl7Y2FzZSBhYi5ST1RBVEU6aWYoITE9PT10KXJldHVybjtMKGEuY2xpZW50WCxhLmNsaWVudFkpO2JyZWFrO2Nhc2UgYWIuRE9MTFk6dmFyIGI7aWYoITE9PT12KXJldHVybjtiPWEsYWQuc2V0KGIuY2xpZW50WCxiLmNsaWVudFkpLGFlLnN1YihhZCxIKSxhZS55PjA/SyhJKCkpOmFlLnk8MCYmSygxL0koKSksSC5jb3B5KGFkKTticmVhaztjYXNlIGFiLlBBTjppZighMT09PXgpcmV0dXJuO00oYS5jbGllbnRYLGEuY2xpZW50WSl9fSxPPSgpPT57dGhpcy5lbmFibGVkJiYoZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLE4sITEpLGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsTywhMSksXz1hYi5OT05FKX0sbz1hPT57dGhpcy5lbmFibGVkJiZ2JiYoXz09PWFiLk5PTkV8fF89PT1hYi5ST1RBVEUpJiYoYS5zdG9wUHJvcGFnYXRpb24oKSxhLmRlbHRhWTwwP0soMS9JKCkpOmEuZGVsdGFZPjAmJksoSSgpKSl9LHA9YT0+e2lmKHRoaXMuZW5hYmxlZClzd2l0Y2goYS5wcmV2ZW50RGVmYXVsdCgpLGEudG91Y2hlcy5sZW5ndGgpe2Nhc2UgMTppZighMT09PXQpcmV0dXJuO0Yuc2V0KGEudG91Y2hlc1swXS5wYWdlWCxhLnRvdWNoZXNbMF0ucGFnZVkpLF89YWIuUk9UQVRFO2JyZWFrO2Nhc2UgMjppZighMT09PXYmJiAhMT09PXgpcmV0dXJuOyhmdW5jdGlvbihhKXtpZih2KXtsZXQgYj1hLnRvdWNoZXNbMF0ucGFnZVgtYS50b3VjaGVzWzFdLnBhZ2VYLGM9YS50b3VjaGVzWzBdLnBhZ2VZLWEudG91Y2hlc1sxXS5wYWdlWSxkPU1hdGguc3FydChiKmIrYypjKTtILnNldCgwLGQpfWlmKHgpe2xldCBlPS41KihhLnRvdWNoZXNbMF0ucGFnZVgrYS50b3VjaGVzWzFdLnBhZ2VYKSxmPS41KihhLnRvdWNoZXNbMF0ucGFnZVkrYS50b3VjaGVzWzFdLnBhZ2VZKTtHLnNldChlLGYpfX0pKGEpLF89YWIuRE9MTFlfUEFOO2JyZWFrO2RlZmF1bHQ6Xz1hYi5OT05FfX0scT1hPT57aWYodGhpcy5lbmFibGVkKXN3aXRjaChhLnByZXZlbnREZWZhdWx0KCksYS5zdG9wUHJvcGFnYXRpb24oKSxhLnRvdWNoZXMubGVuZ3RoKXtjYXNlIDE6aWYoITE9PT10KXJldHVybjtMKGEudG91Y2hlc1swXS5wYWdlWCxhLnRvdWNoZXNbMF0ucGFnZVkpO2JyZWFrO2Nhc2UgMjppZighMT09PXYmJiAhMT09PXgpcmV0dXJuOyFmdW5jdGlvbihhKXtpZih2KXtsZXQgYj1hLnRvdWNoZXNbMF0ucGFnZVgtYS50b3VjaGVzWzFdLnBhZ2VYLGM9YS50b3VjaGVzWzBdLnBhZ2VZLWEudG91Y2hlc1sxXS5wYWdlWSxkPU1hdGguc3FydChiKmIrYypjKTthZC5zZXQoMCxkKSxhZS5zZXQoMCxNYXRoLnBvdyhhZC55L0gueSx3KSksSyhhZS55KSxILmNvcHkoYWQpfXgmJk0oLjUqKGEudG91Y2hlc1swXS5wYWdlWCthLnRvdWNoZXNbMV0ucGFnZVgpLC41KihhLnRvdWNoZXNbMF0ucGFnZVkrYS50b3VjaGVzWzFdLnBhZ2VZKSl9KGEpO2JyZWFrO2RlZmF1bHQ6Xz1hYi5OT05FfX0scj0oKT0+e3RoaXMuZW5hYmxlZCYmKF89YWIuTk9ORSl9LHM9YT0+e3RoaXMuZW5hYmxlZCYmYS5wcmV2ZW50RGVmYXVsdCgpfTt0aGlzLnJlbW92ZT1mdW5jdGlvbigpe2EucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIscywhMSksYS5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsbiwhMSksd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ3aGVlbFwiLG8sITEpLGEucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIixwLCExKSxhLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLHIsITEpLGEucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLHEsITEpLHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsTiwhMSksd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsTywhMSl9LGEuYWRkRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIscywhMSksYS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsbiwhMSksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ3aGVlbFwiLG8sITEpLGEuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIixwLHtwYXNzaXZlOiExfSksYS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIixyLCExKSxhLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIixxLHtwYXNzaXZlOiExfSl9LGEuUGxhbmU9cixhLlBvc3Q9Y2xhc3N7Y29uc3RydWN0b3IoYSx7d2lkdGg6YixoZWlnaHQ6YyxkcHI6ZCx3cmFwUzplPWEuQ0xBTVBfVE9fRURHRSx3cmFwVDpnPWEuQ0xBTVBfVE9fRURHRSxtaW5GaWx0ZXI6aD1hLkxJTkVBUixtYWdGaWx0ZXI6aT1hLkxJTkVBUixnZW9tZXRyeTpqPW5ldyBmKGEse3Bvc2l0aW9uOntzaXplOjIsZGF0YTpuZXcgRmxvYXQzMkFycmF5KFstMSwtMSwzLC0xLC0xLDNdKX0sdXY6e3NpemU6MixkYXRhOm5ldyBGbG9hdDMyQXJyYXkoWzAsMCwyLDAsMCwyXSl9fSl9PXt9KXt0aGlzLmdsPWEsdGhpcy5vcHRpb25zPXt3cmFwUzplLHdyYXBUOmcsbWluRmlsdGVyOmgsbWFnRmlsdGVyOml9LHRoaXMucGFzc2VzPVtdLHRoaXMuZ2VvbWV0cnk9ajtsZXQgaz10aGlzLmZibz17cmVhZDpudWxsLHdyaXRlOm51bGwsc3dhcCgpe2xldCBhPWsucmVhZDtrLnJlYWQ9ay53cml0ZSxrLndyaXRlPWF9fTt0aGlzLnJlc2l6ZSh7d2lkdGg6YixoZWlnaHQ6YyxkcHI6ZH0pfWFkZFBhc3Moe3ZlcnRleDplPVwiXFxuICAgIGF0dHJpYnV0ZSB2ZWMyIHV2O1xcbiAgICBhdHRyaWJ1dGUgdmVjMiBwb3NpdGlvbjtcXG5cXG4gICAgdmFyeWluZyB2ZWMyIHZVdjtcXG5cXG4gICAgdm9pZCBtYWluKCkge1xcbiAgICAgICAgdlV2ID0gdXY7XFxuICAgICAgICBnbF9Qb3NpdGlvbiA9IHZlYzQocG9zaXRpb24sIDAsIDEpO1xcbiAgICB9XFxuXCIsZnJhZ21lbnQ6Zj1cIlxcbiAgICBwcmVjaXNpb24gaGlnaHAgZmxvYXQ7XFxuXFxuICAgIHVuaWZvcm0gc2FtcGxlcjJEIHRNYXA7XFxuICAgIHZhcnlpbmcgdmVjMiB2VXY7XFxuXFxuICAgIHZvaWQgbWFpbigpIHtcXG4gICAgICAgIGdsX0ZyYWdDb2xvciA9IHRleHR1cmUyRCh0TWFwLCB2VXYpO1xcbiAgICB9XFxuXCIsdW5pZm9ybXM6YT17fSx0ZXh0dXJlVW5pZm9ybTpiPVwidE1hcFwiLGVuYWJsZWQ6Zz0hMH09e30pe2FbYl09e3ZhbHVlOnRoaXMuZmJvLnJlYWQudGV4dHVyZX07bGV0IGM9bmV3IGgodGhpcy5nbCx7dmVydGV4OmUsZnJhZ21lbnQ6Zix1bmlmb3JtczphfSksZD17bWVzaDpuZXcgbih0aGlzLmdsLHtnZW9tZXRyeTp0aGlzLmdlb21ldHJ5LHByb2dyYW06Y30pLHByb2dyYW06Yyx1bmlmb3JtczphLGVuYWJsZWQ6Zyx0ZXh0dXJlVW5pZm9ybTpifTtyZXR1cm4gdGhpcy5wYXNzZXMucHVzaChkKSxkfXJlc2l6ZSh7d2lkdGg6YSxoZWlnaHQ6YyxkcHI6Yn09e30pe2ImJih0aGlzLmRwcj1iKSxhJiYodGhpcy53aWR0aD1hLHRoaXMuaGVpZ2h0PWN8fGEpLGI9dGhpcy5kcHJ8fHRoaXMuZ2wucmVuZGVyZXIuZHByLGE9KHRoaXMud2lkdGh8fHRoaXMuZ2wucmVuZGVyZXIud2lkdGgpKmIsYz0odGhpcy5oZWlnaHR8fHRoaXMuZ2wucmVuZGVyZXIuaGVpZ2h0KSpiLHRoaXMub3B0aW9ucy53aWR0aD1hLHRoaXMub3B0aW9ucy5oZWlnaHQ9Yyx0aGlzLmZiby5yZWFkPW5ldyBwKHRoaXMuZ2wsdGhpcy5vcHRpb25zKSx0aGlzLmZiby53cml0ZT1uZXcgcCh0aGlzLmdsLHRoaXMub3B0aW9ucyl9cmVuZGVyKHtzY2VuZTpiLGNhbWVyYTpjLHRhcmdldDpkPW51bGwsdXBkYXRlOmU9ITAsc29ydDpmPSEwLGZydXN0dW1DdWxsOmc9ITB9KXtsZXQgYT10aGlzLnBhc3Nlcy5maWx0ZXIoYT0+YS5lbmFibGVkKTt0aGlzLmdsLnJlbmRlcmVyLnJlbmRlcih7c2NlbmU6YixjYW1lcmE6Yyx0YXJnZXQ6YS5sZW5ndGg/dGhpcy5mYm8ud3JpdGU6ZCx1cGRhdGU6ZSxzb3J0OmYsZnJ1c3R1bUN1bGw6Z30pLHRoaXMuZmJvLnN3YXAoKSxhLmZvckVhY2goKGIsYyk9PntiLm1lc2gucHJvZ3JhbS51bmlmb3Jtc1tiLnRleHR1cmVVbmlmb3JtXS52YWx1ZT10aGlzLmZiby5yZWFkLnRleHR1cmUsdGhpcy5nbC5yZW5kZXJlci5yZW5kZXIoe3NjZW5lOmIubWVzaCx0YXJnZXQ6Yz09PWEubGVuZ3RoLTE/ZDp0aGlzLmZiby53cml0ZSxjbGVhcjohMX0pLHRoaXMuZmJvLnN3YXAoKX0pfX0sYS5Qcm9ncmFtPWgsYS5RdWF0PWQsYS5SYXljYXN0PWNsYXNze2NvbnN0cnVjdG9yKGEpe3RoaXMuZ2w9YSx0aGlzLm9yaWdpbj1uZXcgYix0aGlzLmRpcmVjdGlvbj1uZXcgYn1jYXN0TW91c2UoYSxiPVswLDBdKXthLndvcmxkTWF0cml4LmdldFRyYW5zbGF0aW9uKHRoaXMub3JpZ2luKSx0aGlzLmRpcmVjdGlvbi5zZXQoYlswXSxiWzFdLC41KSxhLnVucHJvamVjdCh0aGlzLmRpcmVjdGlvbiksdGhpcy5kaXJlY3Rpb24uc3ViKHRoaXMub3JpZ2luKS5ub3JtYWxpemUoKX1pbnRlcnNlY3RCb3VuZHMoYSl7QXJyYXkuaXNBcnJheShhKXx8KGE9W2FdKTtsZXQgZD1haSxlPWFmLGY9YWcsYz1bXTtyZXR1cm4gYS5mb3JFYWNoKGE9PnthLmdlb21ldHJ5LmJvdW5kc3x8YS5nZW9tZXRyeS5jb21wdXRlQm91bmRpbmdCb3goKSxcInNwaGVyZVwiPT09YS5nZW9tZXRyeS5yYXljYXN0JiZhLmdlb21ldHJ5LmJvdW5kcz09PTEvMCYmYS5nZW9tZXRyeS5jb21wdXRlQm91bmRpbmdTcGhlcmUoKSxkLmludmVyc2UoYS53b3JsZE1hdHJpeCksZS5jb3B5KHRoaXMub3JpZ2luKS5hcHBseU1hdHJpeDQoZCksZi5jb3B5KHRoaXMuZGlyZWN0aW9uKS50cmFuc2Zvcm1EaXJlY3Rpb24oZCk7bGV0IGc9MDsoZz1cInNwaGVyZVwiPT09YS5nZW9tZXRyeS5yYXljYXN0P3RoaXMuaW50ZXJzZWN0U3BoZXJlKGEuZ2VvbWV0cnkuYm91bmRzLGUsZik6dGhpcy5pbnRlcnNlY3RCb3goYS5nZW9tZXRyeS5ib3VuZHMsZSxmKSkmJihhLmhpdHx8KGEuaGl0PXtsb2NhbFBvaW50Om5ldyBifSksYS5oaXQuZGlzdGFuY2U9ZyxhLmhpdC5sb2NhbFBvaW50LmNvcHkoZikubXVsdGlwbHkoZykuYWRkKGUpLGMucHVzaChhKSl9KSxjLnNvcnQoKGEsYik9PmEuaGl0LmRpc3RhbmNlLWIuaGl0LmRpc3RhbmNlKSxjfWludGVyc2VjdFNwaGVyZShjLGk9dGhpcy5vcmlnaW4saj10aGlzLmRpcmVjdGlvbil7bGV0IGE9YWg7YS5zdWIoYy5jZW50ZXIsaSk7bGV0IGI9YS5kb3QoaiksZT1hLmRvdChhKS1iKmIsZj1jLnJhZGl1cypjLnJhZGl1cztpZihlPmYpcmV0dXJuIDA7bGV0IGc9TWF0aC5zcXJ0KGYtZSksZD1iLWcsaD1iK2c7cmV0dXJuIGQ8MCYmaDwwPzA6ZDwwP2g6ZH1pbnRlcnNlY3RCb3gobixjPXRoaXMub3JpZ2luLGs9dGhpcy5kaXJlY3Rpb24pe2xldCBhLGIsZixsLGcsbSxoPTEvay54LGk9MS9rLnksaj0xL2sueixkPW4ubWluLGU9bi5tYXg7cmV0dXJuIGE9KChoPj0wP2QueDplLngpLWMueCkqaCxiPSgoaD49MD9lLng6ZC54KS1jLngpKmgsZj0oKGk+PTA/ZC55OmUueSktYy55KSppLGE+KGw9KChpPj0wP2UueTpkLnkpLWMueSkqaSl8fGY+Yj8wOihmPmEmJihhPWYpLGw8YiYmKGI9bCksZz0oKGo+PTA/ZC56OmUueiktYy56KSpqLGE+KG09KChqPj0wP2UuejpkLnopLWMueikqail8fGc+Yj8wOihnPmEmJihhPWcpLG08YiYmKGI9bSksYjwwPzA6YT49MD9hOmIpKX19LGEuUmVuZGVyVGFyZ2V0PXAsYS5SZW5kZXJlcj1jbGFzc3tjb25zdHJ1Y3Rvcih7Y2FudmFzOmE9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSx3aWR0aDpnPTMwMCxoZWlnaHQ6aD0xNTAsZHByOmk9MSxhbHBoYTpjPSExLGRlcHRoOmQ9ITAsc3RlbmNpbDplPSExLGFudGlhbGlhczpqPSExLHByZW11bHRpcGxpZWRBbHBoYTpmPSExLHByZXNlcnZlRHJhd2luZ0J1ZmZlcjprPSExLHBvd2VyUHJlZmVyZW5jZTpsPVwiZGVmYXVsdFwiLGF1dG9DbGVhcjptPSEwLHdlYmdsOm49Mn09e30pe2xldCBiPXthbHBoYTpjLGRlcHRoOmQsc3RlbmNpbDplLGFudGlhbGlhczpqLHByZW11bHRpcGxpZWRBbHBoYTpmLHByZXNlcnZlRHJhd2luZ0J1ZmZlcjprLHBvd2VyUHJlZmVyZW5jZTpsfTt0aGlzLmRwcj1pLHRoaXMuYWxwaGE9Yyx0aGlzLmNvbG9yPSEwLHRoaXMuZGVwdGg9ZCx0aGlzLnN0ZW5jaWw9ZSx0aGlzLnByZW11bHRpcGxpZWRBbHBoYT1mLHRoaXMuYXV0b0NsZWFyPW0sMj09PW4mJih0aGlzLmdsPWEuZ2V0Q29udGV4dChcIndlYmdsMlwiLGIpKSx0aGlzLmlzV2ViZ2wyPSEhdGhpcy5nbCx0aGlzLmdsfHwodGhpcy5nbD1hLmdldENvbnRleHQoXCJ3ZWJnbFwiLGIpfHxhLmdldENvbnRleHQoXCJleHBlcmltZW50YWwtd2ViZ2xcIixiKSksdGhpcy5nbC5yZW5kZXJlcj10aGlzLHRoaXMuc2V0U2l6ZShnLGgpLHRoaXMucGFyYW1ldGVycz17fSx0aGlzLnBhcmFtZXRlcnMubWF4VGV4dHVyZVVuaXRzPXRoaXMuZ2wuZ2V0UGFyYW1ldGVyKHRoaXMuZ2wuTUFYX0NPTUJJTkVEX1RFWFRVUkVfSU1BR0VfVU5JVFMpLHRoaXMuc3RhdGU9e30sdGhpcy5zdGF0ZS5ibGVuZEZ1bmM9e3NyYzp0aGlzLmdsLk9ORSxkc3Q6dGhpcy5nbC5aRVJPfSx0aGlzLnN0YXRlLmJsZW5kRXF1YXRpb249e21vZGVSR0I6dGhpcy5nbC5GVU5DX0FERH0sdGhpcy5zdGF0ZS5jdWxsRmFjZT1udWxsLHRoaXMuc3RhdGUuZnJvbnRGYWNlPXRoaXMuZ2wuQ0NXLHRoaXMuc3RhdGUuZGVwdGhNYXNrPSEwLHRoaXMuc3RhdGUuZGVwdGhGdW5jPXRoaXMuZ2wuTEVTUyx0aGlzLnN0YXRlLnByZW11bHRpcGx5QWxwaGE9ITEsdGhpcy5zdGF0ZS5mbGlwWT0hMSx0aGlzLnN0YXRlLnVucGFja0FsaWdubWVudD00LHRoaXMuc3RhdGUuZnJhbWVidWZmZXI9bnVsbCx0aGlzLnN0YXRlLnZpZXdwb3J0PXt3aWR0aDpudWxsLGhlaWdodDpudWxsfSx0aGlzLnN0YXRlLnRleHR1cmVVbml0cz1bXSx0aGlzLnN0YXRlLmFjdGl2ZVRleHR1cmVVbml0PTAsdGhpcy5zdGF0ZS5ib3VuZEJ1ZmZlcj1udWxsLHRoaXMuc3RhdGUudW5pZm9ybUxvY2F0aW9ucz1uZXcgTWFwLHRoaXMuZXh0ZW5zaW9ucz17fSx0aGlzLmlzV2ViZ2wyPyh0aGlzLmdldEV4dGVuc2lvbihcIkVYVF9jb2xvcl9idWZmZXJfZmxvYXRcIiksdGhpcy5nZXRFeHRlbnNpb24oXCJPRVNfdGV4dHVyZV9mbG9hdF9saW5lYXJcIikpOih0aGlzLmdldEV4dGVuc2lvbihcIk9FU190ZXh0dXJlX2Zsb2F0XCIpLHRoaXMuZ2V0RXh0ZW5zaW9uKFwiT0VTX3RleHR1cmVfZmxvYXRfbGluZWFyXCIpLHRoaXMuZ2V0RXh0ZW5zaW9uKFwiT0VTX3RleHR1cmVfaGFsZl9mbG9hdFwiKSx0aGlzLmdldEV4dGVuc2lvbihcIk9FU190ZXh0dXJlX2hhbGZfZmxvYXRfbGluZWFyXCIpLHRoaXMuZ2V0RXh0ZW5zaW9uKFwiT0VTX2VsZW1lbnRfaW5kZXhfdWludFwiKSx0aGlzLmdldEV4dGVuc2lvbihcIk9FU19zdGFuZGFyZF9kZXJpdmF0aXZlc1wiKSx0aGlzLmdldEV4dGVuc2lvbihcIkVYVF9zUkdCXCIpLHRoaXMuZ2V0RXh0ZW5zaW9uKFwiV0VCR0xfZGVwdGhfdGV4dHVyZVwiKSksdGhpcy52ZXJ0ZXhBdHRyaWJEaXZpc29yPXRoaXMuZ2V0RXh0ZW5zaW9uKFwiQU5HTEVfaW5zdGFuY2VkX2FycmF5c1wiLFwidmVydGV4QXR0cmliRGl2aXNvclwiLFwidmVydGV4QXR0cmliRGl2aXNvckFOR0xFXCIpLHRoaXMuZHJhd0FycmF5c0luc3RhbmNlZD10aGlzLmdldEV4dGVuc2lvbihcIkFOR0xFX2luc3RhbmNlZF9hcnJheXNcIixcImRyYXdBcnJheXNJbnN0YW5jZWRcIixcImRyYXdBcnJheXNJbnN0YW5jZWRBTkdMRVwiKSx0aGlzLmRyYXdFbGVtZW50c0luc3RhbmNlZD10aGlzLmdldEV4dGVuc2lvbihcIkFOR0xFX2luc3RhbmNlZF9hcnJheXNcIixcImRyYXdFbGVtZW50c0luc3RhbmNlZFwiLFwiZHJhd0VsZW1lbnRzSW5zdGFuY2VkQU5HTEVcIiksdGhpcy5jcmVhdGVWZXJ0ZXhBcnJheT10aGlzLmdldEV4dGVuc2lvbihcIk9FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0XCIsXCJjcmVhdGVWZXJ0ZXhBcnJheVwiLFwiY3JlYXRlVmVydGV4QXJyYXlPRVNcIiksdGhpcy5iaW5kVmVydGV4QXJyYXk9dGhpcy5nZXRFeHRlbnNpb24oXCJPRVNfdmVydGV4X2FycmF5X29iamVjdFwiLFwiYmluZFZlcnRleEFycmF5XCIsXCJiaW5kVmVydGV4QXJyYXlPRVNcIiksdGhpcy5kZWxldGVWZXJ0ZXhBcnJheT10aGlzLmdldEV4dGVuc2lvbihcIk9FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0XCIsXCJkZWxldGVWZXJ0ZXhBcnJheVwiLFwiZGVsZXRlVmVydGV4QXJyYXlPRVNcIil9c2V0U2l6ZShhLGIpe3RoaXMud2lkdGg9YSx0aGlzLmhlaWdodD1iLHRoaXMuZ2wuY2FudmFzLndpZHRoPWEqdGhpcy5kcHIsdGhpcy5nbC5jYW52YXMuaGVpZ2h0PWIqdGhpcy5kcHIsT2JqZWN0LmFzc2lnbih0aGlzLmdsLmNhbnZhcy5zdHlsZSx7d2lkdGg6YStcInB4XCIsaGVpZ2h0OmIrXCJweFwifSl9c2V0Vmlld3BvcnQoYSxiKXt0aGlzLnN0YXRlLnZpZXdwb3J0LndpZHRoPT09YSYmdGhpcy5zdGF0ZS52aWV3cG9ydC5oZWlnaHQ9PT1ifHwodGhpcy5zdGF0ZS52aWV3cG9ydC53aWR0aD1hLHRoaXMuc3RhdGUudmlld3BvcnQuaGVpZ2h0PWIsdGhpcy5nbC52aWV3cG9ydCgwLDAsYSxiKSl9ZW5hYmxlKGEpeyEwIT09dGhpcy5zdGF0ZVthXSYmKHRoaXMuZ2wuZW5hYmxlKGEpLHRoaXMuc3RhdGVbYV09ITApfWRpc2FibGUoYSl7ITEhPT10aGlzLnN0YXRlW2FdJiYodGhpcy5nbC5kaXNhYmxlKGEpLHRoaXMuc3RhdGVbYV09ITEpfXNldEJsZW5kRnVuYyhhLGIsYyxkKXt0aGlzLnN0YXRlLmJsZW5kRnVuYy5zcmM9PT1hJiZ0aGlzLnN0YXRlLmJsZW5kRnVuYy5kc3Q9PT1iJiZ0aGlzLnN0YXRlLmJsZW5kRnVuYy5zcmNBbHBoYT09PWMmJnRoaXMuc3RhdGUuYmxlbmRGdW5jLmRzdEFscGhhPT09ZHx8KHRoaXMuc3RhdGUuYmxlbmRGdW5jLnNyYz1hLHRoaXMuc3RhdGUuYmxlbmRGdW5jLmRzdD1iLHRoaXMuc3RhdGUuYmxlbmRGdW5jLnNyY0FscGhhPWMsdGhpcy5zdGF0ZS5ibGVuZEZ1bmMuZHN0QWxwaGE9ZCx2b2lkIDAhPT1jP3RoaXMuZ2wuYmxlbmRGdW5jU2VwYXJhdGUoYSxiLGMsZCk6dGhpcy5nbC5ibGVuZEZ1bmMoYSxiKSl9c2V0QmxlbmRFcXVhdGlvbihhLGIpe3RoaXMuc3RhdGUuYmxlbmRFcXVhdGlvbi5tb2RlUkdCPT09YSYmdGhpcy5zdGF0ZS5ibGVuZEVxdWF0aW9uLm1vZGVBbHBoYT09PWJ8fCh0aGlzLnN0YXRlLmJsZW5kRXF1YXRpb24ubW9kZVJHQj1hLHRoaXMuc3RhdGUuYmxlbmRFcXVhdGlvbi5tb2RlQWxwaGE9Yix2b2lkIDAhPT1iP3RoaXMuZ2wuYmxlbmRFcXVhdGlvblNlcGFyYXRlKGEsYik6dGhpcy5nbC5ibGVuZEVxdWF0aW9uKGEpKX1zZXRDdWxsRmFjZShhKXt0aGlzLnN0YXRlLmN1bGxGYWNlIT09YSYmKHRoaXMuc3RhdGUuY3VsbEZhY2U9YSx0aGlzLmdsLmN1bGxGYWNlKGEpKX1zZXRGcm9udEZhY2UoYSl7dGhpcy5zdGF0ZS5mcm9udEZhY2UhPT1hJiYodGhpcy5zdGF0ZS5mcm9udEZhY2U9YSx0aGlzLmdsLmZyb250RmFjZShhKSl9c2V0RGVwdGhNYXNrKGEpe3RoaXMuc3RhdGUuZGVwdGhNYXNrIT09YSYmKHRoaXMuc3RhdGUuZGVwdGhNYXNrPWEsdGhpcy5nbC5kZXB0aE1hc2soYSkpfXNldERlcHRoRnVuYyhhKXt0aGlzLnN0YXRlLmRlcHRoRnVuYyE9PWEmJih0aGlzLnN0YXRlLmRlcHRoRnVuYz1hLHRoaXMuZ2wuZGVwdGhGdW5jKGEpKX1hY3RpdmVUZXh0dXJlKGEpe3RoaXMuc3RhdGUuYWN0aXZlVGV4dHVyZVVuaXQhPT1hJiYodGhpcy5zdGF0ZS5hY3RpdmVUZXh0dXJlVW5pdD1hLHRoaXMuZ2wuYWN0aXZlVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkUwK2EpKX1iaW5kRnJhbWVidWZmZXIoe3RhcmdldDpiPXRoaXMuZ2wuRlJBTUVCVUZGRVIsYnVmZmVyOmE9bnVsbH09e30pe3RoaXMuc3RhdGUuZnJhbWVidWZmZXIhPT1hJiYodGhpcy5zdGF0ZS5mcmFtZWJ1ZmZlcj1hLHRoaXMuZ2wuYmluZEZyYW1lYnVmZmVyKGIsYSkpfWdldEV4dGVuc2lvbihhLGIsYyl7cmV0dXJuIGImJnRoaXMuZ2xbYl0/dGhpcy5nbFtiXS5iaW5kKHRoaXMuZ2wpOih0aGlzLmV4dGVuc2lvbnNbYV18fCh0aGlzLmV4dGVuc2lvbnNbYV09dGhpcy5nbC5nZXRFeHRlbnNpb24oYSkpLGI/dGhpcy5leHRlbnNpb25zW2FdW2NdLmJpbmQodGhpcy5leHRlbnNpb25zW2FdKTp0aGlzLmV4dGVuc2lvbnNbYV0pfXNvcnRPcGFxdWUoYSxiKXtyZXR1cm4gYS5yZW5kZXJPcmRlciE9PWIucmVuZGVyT3JkZXI/YS5yZW5kZXJPcmRlci1iLnJlbmRlck9yZGVyOmEucHJvZ3JhbS5pZCE9PWIucHJvZ3JhbS5pZD9hLnByb2dyYW0uaWQtYi5wcm9ncmFtLmlkOmEuekRlcHRoIT09Yi56RGVwdGg/YS56RGVwdGgtYi56RGVwdGg6Yi5pZC1hLmlkfXNvcnRUcmFuc3BhcmVudChhLGIpe3JldHVybiBhLnJlbmRlck9yZGVyIT09Yi5yZW5kZXJPcmRlcj9hLnJlbmRlck9yZGVyLWIucmVuZGVyT3JkZXI6YS56RGVwdGghPT1iLnpEZXB0aD9iLnpEZXB0aC1hLnpEZXB0aDpiLmlkLWEuaWR9c29ydFVJKGEsYil7cmV0dXJuIGEucmVuZGVyT3JkZXIhPT1iLnJlbmRlck9yZGVyP2EucmVuZGVyT3JkZXItYi5yZW5kZXJPcmRlcjphLnByb2dyYW0uaWQhPT1iLnByb2dyYW0uaWQ/YS5wcm9ncmFtLmlkLWIucHJvZ3JhbS5pZDpiLmlkLWEuaWR9Z2V0UmVuZGVyTGlzdCh7c2NlbmU6ZixjYW1lcmE6YixmcnVzdHVtQ3VsbDpnLHNvcnQ6aH0pe2xldCBhPVtdO2lmKGImJmcmJmIudXBkYXRlRnJ1c3R1bSgpLGYudHJhdmVyc2UoYz0+e2lmKCFjLnZpc2libGUpcmV0dXJuITA7Yy5kcmF3JiYoZyYmYy5mcnVzdHVtQ3VsbGVkJiZiJiYhYi5mcnVzdHVtSW50ZXJzZWN0c01lc2goYyl8fGEucHVzaChjKSl9KSxoKXtsZXQgYz1bXSxkPVtdLGU9W107YS5mb3JFYWNoKGE9PnthLnByb2dyYW0udHJhbnNwYXJlbnQ/YS5wcm9ncmFtLmRlcHRoVGVzdD9kLnB1c2goYSk6ZS5wdXNoKGEpOmMucHVzaChhKSxhLnpEZXB0aD0wLDA9PT1hLnJlbmRlck9yZGVyJiZhLnByb2dyYW0uZGVwdGhUZXN0JiZiJiYoYS53b3JsZE1hdHJpeC5nZXRUcmFuc2xhdGlvbihLKSxLLmFwcGx5TWF0cml4NChiLnByb2plY3Rpb25WaWV3TWF0cml4KSxhLnpEZXB0aD1LLnopfSksYy5zb3J0KHRoaXMuc29ydE9wYXF1ZSksZC5zb3J0KHRoaXMuc29ydFRyYW5zcGFyZW50KSxlLnNvcnQodGhpcy5zb3J0VUkpLGE9Yy5jb25jYXQoZCxlKX1yZXR1cm4gYX1yZW5kZXIoe3NjZW5lOmMsY2FtZXJhOmIsdGFyZ2V0OmE9bnVsbCx1cGRhdGU6ZT0hMCxzb3J0OmY9ITAsZnJ1c3R1bUN1bGw6Zz0hMCxjbGVhcjpkfSl7bnVsbD09PWE/KHRoaXMuYmluZEZyYW1lYnVmZmVyKCksdGhpcy5zZXRWaWV3cG9ydCh0aGlzLndpZHRoKnRoaXMuZHByLHRoaXMuaGVpZ2h0KnRoaXMuZHByKSk6KHRoaXMuYmluZEZyYW1lYnVmZmVyKGEpLHRoaXMuc2V0Vmlld3BvcnQoYS53aWR0aCxhLmhlaWdodCkpLChkfHx0aGlzLmF1dG9DbGVhciYmICExIT09ZCkmJighdGhpcy5kZXB0aHx8YSYmYS5kZXB0aHx8KHRoaXMuZW5hYmxlKHRoaXMuZ2wuREVQVEhfVEVTVCksdGhpcy5zZXREZXB0aE1hc2soITApKSx0aGlzLmdsLmNsZWFyKCh0aGlzLmNvbG9yP3RoaXMuZ2wuQ09MT1JfQlVGRkVSX0JJVDowKXwodGhpcy5kZXB0aD90aGlzLmdsLkRFUFRIX0JVRkZFUl9CSVQ6MCl8KHRoaXMuc3RlbmNpbD90aGlzLmdsLlNURU5DSUxfQlVGRkVSX0JJVDowKSkpLGUmJmMudXBkYXRlTWF0cml4V29ybGQoKSxiJiZudWxsPT09Yi5wYXJlbnQmJmIudXBkYXRlTWF0cml4V29ybGQoKSx0aGlzLmdldFJlbmRlckxpc3Qoe3NjZW5lOmMsY2FtZXJhOmIsZnJ1c3R1bUN1bGw6Zyxzb3J0OmZ9KS5mb3JFYWNoKGE9PnthLmRyYXcoe2NhbWVyYTpifSl9KX19LGEuU2tpbj1jbGFzcyBleHRlbmRzIG57Y29uc3RydWN0b3IoYSx7cmlnOmIsZ2VvbWV0cnk6Yyxwcm9ncmFtOmQsbW9kZTplPWEuVFJJQU5HTEVTfT17fSl7c3VwZXIoYSx7Z2VvbWV0cnk6Yyxwcm9ncmFtOmQsbW9kZTplfSksdGhpcy5jcmVhdGVCb25lcyhiKSx0aGlzLmNyZWF0ZUJvbmVUZXh0dXJlKCksdGhpcy5hbmltYXRpb25zPVtdLE9iamVjdC5hc3NpZ24odGhpcy5wcm9ncmFtLnVuaWZvcm1zLHtib25lVGV4dHVyZTp7dmFsdWU6dGhpcy5ib25lVGV4dHVyZX0sYm9uZVRleHR1cmVTaXplOnt2YWx1ZTp0aGlzLmJvbmVUZXh0dXJlU2l6ZX19KX1jcmVhdGVCb25lcyhhKXtpZih0aGlzLnJvb3Q9bmV3IGcsdGhpcy5ib25lcz1bXSxhLmJvbmVzJiZhLmJvbmVzLmxlbmd0aCl7Zm9yKGxldCBiPTA7YjxhLmJvbmVzLmxlbmd0aDtiKyspe2xldCBkPW5ldyBnO2QucG9zaXRpb24uZnJvbUFycmF5KGEuYmluZFBvc2UucG9zaXRpb24sMypiKSxkLnF1YXRlcm5pb24uZnJvbUFycmF5KGEuYmluZFBvc2UucXVhdGVybmlvbiw0KmIpLGQuc2NhbGUuZnJvbUFycmF5KGEuYmluZFBvc2Uuc2NhbGUsMypiKSx0aGlzLmJvbmVzLnB1c2goZCl9YS5ib25lcy5mb3JFYWNoKChhLGIpPT57aWYodGhpcy5ib25lc1tiXS5uYW1lPWEubmFtZSwtMT09PWEucGFyZW50KXJldHVybiB0aGlzLmJvbmVzW2JdLnNldFBhcmVudCh0aGlzLnJvb3QpO3RoaXMuYm9uZXNbYl0uc2V0UGFyZW50KHRoaXMuYm9uZXNbYS5wYXJlbnRdKX0pLHRoaXMucm9vdC51cGRhdGVNYXRyaXhXb3JsZCghMCksdGhpcy5ib25lcy5mb3JFYWNoKGE9PnthLmJpbmRJbnZlcnNlPW5ldyBjKC4uLmEud29ybGRNYXRyaXgpLmludmVyc2UoKX0pfX1jcmVhdGVCb25lVGV4dHVyZSgpe2lmKCF0aGlzLmJvbmVzLmxlbmd0aClyZXR1cm47bGV0IGE9TWF0aC5tYXgoNCxNYXRoLnBvdygyLE1hdGguY2VpbChNYXRoLmxvZyhNYXRoLnNxcnQoNCp0aGlzLmJvbmVzLmxlbmd0aCkpL01hdGguTE4yKSkpO3RoaXMuYm9uZU1hdHJpY2VzPW5ldyBGbG9hdDMyQXJyYXkoYSphKjQpLHRoaXMuYm9uZVRleHR1cmVTaXplPWEsdGhpcy5ib25lVGV4dHVyZT1uZXcgbyh0aGlzLmdsLHtpbWFnZTp0aGlzLmJvbmVNYXRyaWNlcyxnZW5lcmF0ZU1pcG1hcHM6ITEsdHlwZTp0aGlzLmdsLkZMT0FULGludGVybmFsRm9ybWF0OnRoaXMuZ2wucmVuZGVyZXIuaXNXZWJnbDI/dGhpcy5nbC5SR0JBMTZGOnRoaXMuZ2wuUkdCQSxmbGlwWTohMSx3aWR0aDphfSl9YWRkQW5pbWF0aW9uKGIpe2xldCBhPW5ldyBzKHtvYmplY3RzOnRoaXMuYm9uZXMsZGF0YTpifSk7cmV0dXJuIHRoaXMuYW5pbWF0aW9ucy5wdXNoKGEpLGF9dXBkYXRlKCl7bGV0IGE9MDt0aGlzLmFuaW1hdGlvbnMuZm9yRWFjaChiPT5hKz1iLndlaWdodCksdGhpcy5hbmltYXRpb25zLmZvckVhY2goKGIsYyk9PntiLnVwZGF0ZShhLDA9PT1jKX0pfWRyYXcoe2NhbWVyYTphfT17fSl7dGhpcy5yb290LnVwZGF0ZU1hdHJpeFdvcmxkKCEwKSx0aGlzLmJvbmVzLmZvckVhY2goKGEsYik9PnthcC5tdWx0aXBseShhLndvcmxkTWF0cml4LGEuYmluZEludmVyc2UpLHRoaXMuYm9uZU1hdHJpY2VzLnNldChhcCwxNipiKX0pLHRoaXMuYm9uZVRleHR1cmUmJih0aGlzLmJvbmVUZXh0dXJlLm5lZWRzVXBkYXRlPSEwKSxzdXBlci5kcmF3KHtjYW1lcmE6YX0pfX0sYS5TcGhlcmU9Y2xhc3MgZXh0ZW5kcyBme2NvbnN0cnVjdG9yKEYse3JhZGl1czpwPS41LHdpZHRoU2VnbWVudHM6dT0xNixoZWlnaHRTZWdtZW50czpHPU1hdGguY2VpbCguNSp1KSxwaGlTdGFydDpIPTAscGhpTGVuZ3RoOkk9MipNYXRoLlBJLHRoZXRhU3RhcnQ6Sj0wLHRoZXRhTGVuZ3RoOks9TWF0aC5QSSxhdHRyaWJ1dGVzOnY9e319PXt9KXtsZXQgaD11LGY9Ryx3PUgseD1JLGk9SixrPUssbD0oaCsxKSooZisxKSx5PWgqZio2LG09bmV3IEZsb2F0MzJBcnJheSgzKmwpLG49bmV3IEZsb2F0MzJBcnJheSgzKmwpLHE9bmV3IEZsb2F0MzJBcnJheSgyKmwpLGU9bD42NTUzNj9uZXcgVWludDMyQXJyYXkoeSk6bmV3IFVpbnQxNkFycmF5KHkpLGE9MCxMPTAsYz0wLE09aStrLGo9W10sXz1uZXcgYjtmb3IobGV0IHI9MDtyPD1mO3IrKyl7bGV0IHo9W10sbz1yL2Y7Zm9yKGxldCBzPTA7czw9aDtzKyssYSsrKXtsZXQgdD1zL2gsQT0tcCpNYXRoLmNvcyh3K3QqeCkqTWF0aC5zaW4oaStvKmspLEI9cCpNYXRoLmNvcyhpK28qayksQz1wKk1hdGguc2luKHcrdCp4KSpNYXRoLnNpbihpK28qayk7bVszKmFdPUEsbVszKmErMV09QixtWzMqYSsyXT1DLF8uc2V0KEEsQixDKS5ub3JtYWxpemUoKSxuWzMqYV09Xy54LG5bMyphKzFdPV8ueSxuWzMqYSsyXT1fLnoscVsyKmFdPXQscVsyKmErMV09MS1vLHoucHVzaChMKyspfWoucHVzaCh6KX1mb3IobGV0IGQ9MDtkPGY7ZCsrKWZvcihsZXQgZz0wO2c8aDtnKyspe2xldCBOPWpbZF1bZysxXSxEPWpbZF1bZ10sTz1qW2QrMV1bZ10sRT1qW2QrMV1bZysxXTsoMCE9PWR8fGk+MCkmJihlWzMqY109TixlWzMqYysxXT1ELGVbMypjKzJdPUUsYysrKSwoZCE9PWYtMXx8TTxNYXRoLlBJKSYmKGVbMypjXT1ELGVbMypjKzFdPU8sZVszKmMrMl09RSxjKyspfU9iamVjdC5hc3NpZ24odix7cG9zaXRpb246e3NpemU6MyxkYXRhOm19LG5vcm1hbDp7c2l6ZTozLGRhdGE6bn0sdXY6e3NpemU6MixkYXRhOnF9LGluZGV4OntkYXRhOmV9fSksc3VwZXIoRix2KX19LGEuVGV4dD1mdW5jdGlvbih7Zm9udDphLHRleHQ6ZCx3aWR0aDplPTEvMCxhbGlnbjpmPVwibGVmdFwiLHNpemU6Zz0xLGxldHRlclNwYWNpbmc6aD0wLGxpbmVIZWlnaHQ6aT0xLjQsd29yZFNwYWNpbmc6aj0wLHdvcmRCcmVhazprPSExfSl7bGV0IGw9dGhpcyxiLG0sbixvLHAscT0vXFxuLyxyPS9cXHMvO2Z1bmN0aW9uIGMoKXtuPWEuY29tbW9uLmxpbmVIZWlnaHQsbz1hLmNvbW1vbi5iYXNlLHA9Zy9vO2xldCBjPWQucmVwbGFjZSgvWyBcXG5dL2csXCJcIikubGVuZ3RoO209e3Bvc2l0aW9uOm5ldyBGbG9hdDMyQXJyYXkoNCpjKjMpLHV2Om5ldyBGbG9hdDMyQXJyYXkoNCpjKjIpLGlkOm5ldyBGbG9hdDMyQXJyYXkoNCpjKSxpbmRleDpuZXcgVWludDE2QXJyYXkoNipjKX07Zm9yKGxldCBiPTA7YjxjO2IrKyltLmlkW2JdPWIsbS5pbmRleC5zZXQoWzQqYiw0KmIrMiw0KmIrMSw0KmIrMSw0KmIrMiw0KmIrM10sNipiKTtzKCl9ZnVuY3Rpb24gcygpe2xldCB5PVtdLG49MCx1PTAsbz0wLGM9dygpO2Z1bmN0aW9uIHcoKXtsZXQgYT17d2lkdGg6MCxnbHlwaHM6W119O3JldHVybiB5LnB1c2goYSksdT1uLG89MCxhfWxldCB6PTA7Zm9yKDtuPGQubGVuZ3RoJiZ6PDEwMDspe3orKztsZXQgdj1kW25dO2lmKCFjLndpZHRoJiZyLnRlc3Qodikpe3U9KytuLG89MDtjb250aW51ZX1pZihxLnRlc3Qodikpe24rKyxjPXcoKTtjb250aW51ZX1sZXQgeD1iW3ZdO2lmKGMuZ2x5cGhzLmxlbmd0aCl7bGV0IEM9Yy5nbHlwaHNbYy5nbHlwaHMubGVuZ3RoLTFdWzBdLEE9dCh4LmlkLEMuaWQpKnA7Yy53aWR0aCs9QSxvKz1BfWMuZ2x5cGhzLnB1c2goW3gsYy53aWR0aF0pO2xldCBzPTA7aWYoci50ZXN0KHYpPyh1PW4sbz0wLHMrPWoqZyk6cys9aCpnLHMrPXgueGFkdmFuY2UqcCxjLndpZHRoKz1zLG8rPXMsYy53aWR0aD5lKXtpZihrJiZjLmdseXBocy5sZW5ndGg+MSl7Yy53aWR0aC09cyxjLmdseXBocy5wb3AoKSxjPXcoKTtjb250aW51ZX1pZighayYmbyE9PWMud2lkdGgpe2xldCBCPW4tdSsxO2MuZ2x5cGhzLnNwbGljZSgtQixCKSxuPXUsYy53aWR0aC09byxjPXcoKTtjb250aW51ZX19bisrfWMud2lkdGh8fHkucG9wKCksZnVuY3Rpb24obil7bGV0IHM9YS5jb21tb24uc2NhbGVXLHQ9YS5jb21tb24uc2NhbGVILGM9LjA3Kmcsbz0wO2ZvcihsZXQgcT0wO3E8bi5sZW5ndGg7cSsrKXtsZXQgZT1uW3FdO2ZvcihsZXQgaD0wO2g8ZS5nbHlwaHMubGVuZ3RoO2grKyl7bGV0IGI9ZS5nbHlwaHNbaF1bMF0sZD1lLmdseXBoc1toXVsxXTtpZihcImNlbnRlclwiPT09Zj9kLT0uNSplLndpZHRoOlwicmlnaHRcIj09PWYmJihkLT1lLndpZHRoKSxyLnRlc3QoYi5jaGFyKSljb250aW51ZTtkKz1iLnhvZmZzZXQqcCxjLT1iLnlvZmZzZXQqcDtsZXQgdT1iLndpZHRoKnAsdj1iLmhlaWdodCpwO20ucG9zaXRpb24uc2V0KFtkLGMtdiwwLGQsYywwLGQrdSxjLXYsMCxkK3UsYywwXSw0Km8qMyk7bGV0IGo9Yi54L3Msdz1iLndpZHRoL3Msaz0xLWIueS90LHg9Yi5oZWlnaHQvdDttLnV2LnNldChbaixrLXgsaixrLGordyxrLXgsait3LGtdLDQqbyoyKSxjKz1iLnlvZmZzZXQqcCxvKyt9Yy09ZyppfWwuYnVmZmVycz1tLGwubnVtTGluZXM9bi5sZW5ndGgsbC5oZWlnaHQ9bC5udW1MaW5lcypnKml9KHkpfWZ1bmN0aW9uIHQoYyxlKXtmb3IobGV0IGQ9MDtkPGEua2VybmluZ3MubGVuZ3RoO2QrKyl7bGV0IGI9YS5rZXJuaW5nc1tkXTtpZighKGIuZmlyc3Q8Y3x8Yi5zZWNvbmQ8ZSkpcmV0dXJuIGIuZmlyc3Q+Yz8wOmIuZmlyc3Q9PT1jJiZiLnNlY29uZD5lPzA6Yi5hbW91bnR9cmV0dXJuIDB9Yj17fSxhLmNoYXJzLmZvckVhY2goYT0+YlthLmNoYXJdPWEpLGMoKSx0aGlzLnJlc2l6ZT1mdW5jdGlvbihhKXsoe3dpZHRoOmV9PWEpLHMoKX0sdGhpcy51cGRhdGU9ZnVuY3Rpb24oYSl7KHt0ZXh0OmR9PWEpLGMoKX19LGEuVGV4dHVyZT1vLGEuVHJhbnNmb3JtPWcsYS5WZWMyPWUsYS5WZWMzPWIsYS5WZWM0PWNsYXNzIGV4dGVuZHMgQXJyYXl7Y29uc3RydWN0b3IoYT0wLGI9YSxjPWEsZD1hKXtyZXR1cm4gc3VwZXIoYSxiLGMsZCksdGhpc31nZXQgeCgpe3JldHVybiB0aGlzWzBdfXNldCB4KGEpe3RoaXNbMF09YX1nZXQgeSgpe3JldHVybiB0aGlzWzFdfXNldCB5KGEpe3RoaXNbMV09YX1nZXQgeigpe3JldHVybiB0aGlzWzJdfXNldCB6KGEpe3RoaXNbMl09YX1nZXQgdygpe3JldHVybiB0aGlzWzNdfXNldCB3KGEpe3RoaXNbM109YX1zZXQoYSxiLGMsZCl7cmV0dXJuIGEubGVuZ3RoP3RoaXMuY29weShhKTooaih0aGlzLGEsYixjLGQpLHRoaXMpfWNvcHkoYSl7cmV0dXJuIGkodGhpcyxhKSx0aGlzfW5vcm1hbGl6ZSgpe3JldHVybiBrKHRoaXMsdGhpcyksdGhpc31mcm9tQXJyYXkoYSxiPTApe3JldHVybiB0aGlzWzBdPWFbYl0sdGhpc1sxXT1hW2IrMV0sdGhpc1syXT1hW2IrMl0sdGhpc1szXT1hW2IrM10sdGhpc310b0FycmF5KGE9W10sYj0wKXtyZXR1cm4gYVtiXT10aGlzWzBdLGFbYisxXT10aGlzWzFdLGFbYisyXT10aGlzWzJdLGFbYiszXT10aGlzWzNdLGF9fSxhfSh7fSkiLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUiA9IHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyA/IFJlZmxlY3QgOiBudWxsXG52YXIgUmVmbGVjdEFwcGx5ID0gUiAmJiB0eXBlb2YgUi5hcHBseSA9PT0gJ2Z1bmN0aW9uJ1xuICA/IFIuYXBwbHlcbiAgOiBmdW5jdGlvbiBSZWZsZWN0QXBwbHkodGFyZ2V0LCByZWNlaXZlciwgYXJncykge1xuICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbCh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKTtcbiAgfVxuXG52YXIgUmVmbGVjdE93bktleXNcbmlmIChSICYmIHR5cGVvZiBSLm93bktleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgUmVmbGVjdE93bktleXMgPSBSLm93bktleXNcbn0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpXG4gICAgICAuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSk7XG4gIH07XG59IGVsc2Uge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBQcm9jZXNzRW1pdFdhcm5pbmcod2FybmluZykge1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbn1cblxudmFyIE51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uIE51bWJlcklzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgRXZlbnRFbWl0dGVyLmluaXQuY2FsbCh0aGlzKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xubW9kdWxlLmV4cG9ydHMub25jZSA9IG9uY2U7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzQ291bnQgPSAwO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG52YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG5mdW5jdGlvbiBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnRFbWl0dGVyLCAnZGVmYXVsdE1heExpc3RlbmVycycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGVmYXVsdE1heExpc3RlbmVycztcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgfHwgYXJnIDwgMCB8fCBOdW1iZXJJc05hTihhcmcpKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiZGVmYXVsdE1heExpc3RlbmVyc1wiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBhcmcgKyAnLicpO1xuICAgIH1cbiAgICBkZWZhdWx0TWF4TGlzdGVuZXJzID0gYXJnO1xuICB9XG59KTtcblxuRXZlbnRFbWl0dGVyLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICBpZiAodGhpcy5fZXZlbnRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHRoaXMuX2V2ZW50cyA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHMpIHtcbiAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59O1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMobikge1xuICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInIHx8IG4gPCAwIHx8IE51bWJlcklzTmFOKG4pKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcIm5cIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgbiArICcuJyk7XG4gIH1cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBfZ2V0TWF4TGlzdGVuZXJzKHRoYXQpIHtcbiAgaWYgKHRoYXQuX21heExpc3RlbmVycyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgcmV0dXJuIHRoYXQuX21heExpc3RlbmVycztcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiBfZ2V0TWF4TGlzdGVuZXJzKHRoaXMpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT09IHVuZGVmaW5lZCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgdmFyIGVyO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+IDApXG4gICAgICBlciA9IGFyZ3NbMF07XG4gICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIC8vIE5vdGU6IFRoZSBjb21tZW50cyBvbiB0aGUgYHRocm93YCBsaW5lcyBhcmUgaW50ZW50aW9uYWwsIHRoZXkgc2hvd1xuICAgICAgLy8gdXAgaW4gTm9kZSdzIG91dHB1dCBpZiB0aGlzIHJlc3VsdHMgaW4gYW4gdW5oYW5kbGVkIGV4Y2VwdGlvbi5cbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgIH1cbiAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5oYW5kbGVkIGVycm9yLicgKyAoZXIgPyAnICgnICsgZXIubWVzc2FnZSArICcpJyA6ICcnKSk7XG4gICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICB0aHJvdyBlcnI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gIH1cblxuICB2YXIgaGFuZGxlciA9IGV2ZW50c1t0eXBlXTtcblxuICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBSZWZsZWN0QXBwbHkoaGFuZGxlciwgdGhpcywgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIFJlZmxlY3RBcHBseShsaXN0ZW5lcnNbaV0sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGFyZ2V0Ll9ldmVudHNDb3VudCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gICAgaWYgKGV2ZW50cy5uZXdMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICAgICAgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgaWYgKGV4aXN0aW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICAgICsrdGFyZ2V0Ll9ldmVudHNDb3VudDtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIGV4aXN0aW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID1cbiAgICAgICAgcHJlcGVuZCA/IFtsaXN0ZW5lciwgZXhpc3RpbmddIDogW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgfSBlbHNlIGlmIChwcmVwZW5kKSB7XG4gICAgICBleGlzdGluZy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBtID0gX2dldE1heExpc3RlbmVycyh0YXJnZXQpO1xuICAgIGlmIChtID4gMCAmJiBleGlzdGluZy5sZW5ndGggPiBtICYmICFleGlzdGluZy53YXJuZWQpIHtcbiAgICAgIGV4aXN0aW5nLndhcm5lZCA9IHRydWU7XG4gICAgICAvLyBObyBlcnJvciBjb2RlIGZvciB0aGlzIHNpbmNlIGl0IGlzIGEgV2FybmluZ1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICB2YXIgdyA9IG5ldyBFcnJvcignUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcubGVuZ3RoICsgJyAnICsgU3RyaW5nKHR5cGUpICsgJyBsaXN0ZW5lcnMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdpbmNyZWFzZSBsaW1pdCcpO1xuICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICB3LmVtaXR0ZXIgPSB0YXJnZXQ7XG4gICAgICB3LnR5cGUgPSB0eXBlO1xuICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgIFByb2Nlc3NFbWl0V2FybmluZyh3KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG5cbmZ1bmN0aW9uIG9uY2VXcmFwcGVyKCkge1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQpO1xuICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmFwcGx5KHRoaXMudGFyZ2V0LCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBsaXN0ID0gZXZlbnRzW3R5cGVdO1xuICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdC5saXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKGkgPSBsaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8IGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBvcmlnaW5hbExpc3RlbmVyID0gbGlzdFtpXS5saXN0ZW5lcjtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwKVxuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICBldmVudHNbdHlwZV0gPSBsaXN0WzBdO1xuXG4gICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgb3JpZ2luYWxMaXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyh0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzLCBldmVudHMsIGk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhldmVudHMpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gICAgICB9IGVsc2UgaWYgKGxpc3RlbmVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIExJRk8gb3JkZXJcbiAgICAgICAgZm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbmZ1bmN0aW9uIF9saXN0ZW5lcnModGFyZ2V0LCB0eXBlLCB1bndyYXApIHtcbiAgdmFyIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG4gIGlmIChldmxpc3RlbmVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gdW53cmFwID8gW2V2bGlzdGVuZXIubGlzdGVuZXIgfHwgZXZsaXN0ZW5lcl0gOiBbZXZsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIHVud3JhcCA/XG4gICAgdW53cmFwTGlzdGVuZXJzKGV2bGlzdGVuZXIpIDogYXJyYXlDbG9uZShldmxpc3RlbmVyLCBldmxpc3RlbmVyLmxlbmd0aCk7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgdHJ1ZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJhd0xpc3RlbmVycyA9IGZ1bmN0aW9uIHJhd0xpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIubGlzdGVuZXJDb3VudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyQ291bnQuY2FsbChlbWl0dGVyLCB0eXBlKTtcbiAgfVxufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gbGlzdGVuZXJDb3VudDtcbmZ1bmN0aW9uIGxpc3RlbmVyQ291bnQodHlwZSkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGV2bGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdE93bktleXModGhpcy5fZXZlbnRzKSA6IFtdO1xufTtcblxuZnVuY3Rpb24gYXJyYXlDbG9uZShhcnIsIG4pIHtcbiAgdmFyIGNvcHkgPSBuZXcgQXJyYXkobik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKVxuICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICg7IGluZGV4ICsgMSA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKVxuICAgIGxpc3RbaW5kZXhdID0gbGlzdFtpbmRleCArIDFdO1xuICBsaXN0LnBvcCgpO1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmV0W2ldID0gYXJyW2ldLmxpc3RlbmVyIHx8IGFycltpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBvbmNlKGVtaXR0ZXIsIG5hbWUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBmdW5jdGlvbiBlcnJvckxpc3RlbmVyKGVycikge1xuICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcihuYW1lLCByZXNvbHZlcik7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNvbHZlcigpIHtcbiAgICAgIGlmICh0eXBlb2YgZW1pdHRlci5yZW1vdmVMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIGVycm9yTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZShbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgIH07XG5cbiAgICBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgbmFtZSwgcmVzb2x2ZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICBpZiAobmFtZSAhPT0gJ2Vycm9yJykge1xuICAgICAgYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIoZW1pdHRlciwgZXJyb3JMaXN0ZW5lciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZEVycm9ySGFuZGxlcklmRXZlbnRFbWl0dGVyKGVtaXR0ZXIsIGhhbmRsZXIsIGZsYWdzKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCAnZXJyb3InLCBoYW5kbGVyLCBmbGFncyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsIG5hbWUsIGxpc3RlbmVyLCBmbGFncykge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoZmxhZ3Mub25jZSkge1xuICAgICAgZW1pdHRlci5vbmNlKG5hbWUsIGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW1pdHRlci5vbihuYW1lLCBsaXN0ZW5lcik7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBFdmVudFRhcmdldCBkb2VzIG5vdCBoYXZlIGBlcnJvcmAgZXZlbnQgc2VtYW50aWNzIGxpa2UgTm9kZVxuICAgIC8vIEV2ZW50RW1pdHRlcnMsIHdlIGRvIG5vdCBsaXN0ZW4gZm9yIGBlcnJvcmAgZXZlbnRzIGhlcmUuXG4gICAgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGZ1bmN0aW9uIHdyYXBMaXN0ZW5lcihhcmcpIHtcbiAgICAgIC8vIElFIGRvZXMgbm90IGhhdmUgYnVpbHRpbiBgeyBvbmNlOiB0cnVlIH1gIHN1cHBvcnQgc28gd2VcbiAgICAgIC8vIGhhdmUgdG8gZG8gaXQgbWFudWFsbHkuXG4gICAgICBpZiAoZmxhZ3Mub25jZSkge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgd3JhcExpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIGxpc3RlbmVyKGFyZyk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwiZW1pdHRlclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBFdmVudEVtaXR0ZXIuIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBlbWl0dGVyKTtcbiAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG5hbWVkX3JlZmVyZW5jZXNfMSA9IHJlcXVpcmUoXCIuL25hbWVkLXJlZmVyZW5jZXNcIik7XG52YXIgbnVtZXJpY191bmljb2RlX21hcF8xID0gcmVxdWlyZShcIi4vbnVtZXJpYy11bmljb2RlLW1hcFwiKTtcbnZhciBzdXJyb2dhdGVfcGFpcnNfMSA9IHJlcXVpcmUoXCIuL3N1cnJvZ2F0ZS1wYWlyc1wiKTtcbnZhciBhbGxOYW1lZFJlZmVyZW5jZXMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgbmFtZWRfcmVmZXJlbmNlc18xLm5hbWVkUmVmZXJlbmNlcyksIHsgYWxsOiBuYW1lZF9yZWZlcmVuY2VzXzEubmFtZWRSZWZlcmVuY2VzLmh0bWw1IH0pO1xudmFyIGVuY29kZVJlZ0V4cHMgPSB7XG4gICAgc3BlY2lhbENoYXJzOiAvWzw+J1wiJl0vZyxcbiAgICBub25Bc2NpaTogLyg/Ols8PidcIiZcXHUwMDgwLVxcdUQ3RkZcXHVFMDAwLVxcdUZGRkZdfFtcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl18W1xcdUQ4MDAtXFx1REJGRl0oPyFbXFx1REMwMC1cXHVERkZGXSl8KD86W15cXHVEODAwLVxcdURCRkZdfF4pW1xcdURDMDAtXFx1REZGRl0pL2csXG4gICAgbm9uQXNjaWlQcmludGFibGU6IC8oPzpbPD4nXCImXFx4MDEtXFx4MDhcXHgxMS1cXHgxNVxceDE3LVxceDFGXFx4N2YtXFx1RDdGRlxcdUUwMDAtXFx1RkZGRl18W1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXXxbXFx1RDgwMC1cXHVEQkZGXSg/IVtcXHVEQzAwLVxcdURGRkZdKXwoPzpbXlxcdUQ4MDAtXFx1REJGRl18XilbXFx1REMwMC1cXHVERkZGXSkvZyxcbiAgICBleHRlbnNpdmU6IC8oPzpbXFx4MDEtXFx4MGNcXHgwZS1cXHgxZlxceDIxLVxceDJjXFx4MmUtXFx4MmZcXHgzYS1cXHg0MFxceDViLVxceDYwXFx4N2ItXFx4N2RcXHg3Zi1cXHVEN0ZGXFx1RTAwMC1cXHVGRkZGXXxbXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdfFtcXHVEODAwLVxcdURCRkZdKD8hW1xcdURDMDAtXFx1REZGRl0pfCg/OlteXFx1RDgwMC1cXHVEQkZGXXxeKVtcXHVEQzAwLVxcdURGRkZdKS9nXG59O1xudmFyIGRlZmF1bHRFbmNvZGVPcHRpb25zID0ge1xuICAgIG1vZGU6ICdzcGVjaWFsQ2hhcnMnLFxuICAgIGxldmVsOiAnYWxsJyxcbiAgICBudW1lcmljOiAnZGVjaW1hbCdcbn07XG4vKiogRW5jb2RlcyBhbGwgdGhlIG5lY2Vzc2FyeSAoc3BlY2lmaWVkIGJ5IGBsZXZlbGApIGNoYXJhY3RlcnMgaW4gdGhlIHRleHQgKi9cbmZ1bmN0aW9uIGVuY29kZSh0ZXh0LCBfYSkge1xuICAgIHZhciBfYiA9IF9hID09PSB2b2lkIDAgPyBkZWZhdWx0RW5jb2RlT3B0aW9ucyA6IF9hLCBfYyA9IF9iLm1vZGUsIG1vZGUgPSBfYyA9PT0gdm9pZCAwID8gJ3NwZWNpYWxDaGFycycgOiBfYywgX2QgPSBfYi5udW1lcmljLCBudW1lcmljID0gX2QgPT09IHZvaWQgMCA/ICdkZWNpbWFsJyA6IF9kLCBfZSA9IF9iLmxldmVsLCBsZXZlbCA9IF9lID09PSB2b2lkIDAgPyAnYWxsJyA6IF9lO1xuICAgIGlmICghdGV4dCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHZhciBlbmNvZGVSZWdFeHAgPSBlbmNvZGVSZWdFeHBzW21vZGVdO1xuICAgIHZhciByZWZlcmVuY2VzID0gYWxsTmFtZWRSZWZlcmVuY2VzW2xldmVsXS5jaGFyYWN0ZXJzO1xuICAgIHZhciBpc0hleCA9IG51bWVyaWMgPT09ICdoZXhhZGVjaW1hbCc7XG4gICAgZW5jb2RlUmVnRXhwLmxhc3RJbmRleCA9IDA7XG4gICAgdmFyIF9iID0gZW5jb2RlUmVnRXhwLmV4ZWModGV4dCk7XG4gICAgdmFyIF9jO1xuICAgIGlmIChfYikge1xuICAgICAgICBfYyA9ICcnO1xuICAgICAgICB2YXIgX2QgPSAwO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAoX2QgIT09IF9iLmluZGV4KSB7XG4gICAgICAgICAgICAgICAgX2MgKz0gdGV4dC5zdWJzdHJpbmcoX2QsIF9iLmluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBfZSA9IF9iWzBdO1xuICAgICAgICAgICAgdmFyIHJlc3VsdF8xID0gcmVmZXJlbmNlc1tfZV07XG4gICAgICAgICAgICBpZiAoIXJlc3VsdF8xKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvZGVfMSA9IF9lLmxlbmd0aCA+IDEgPyBzdXJyb2dhdGVfcGFpcnNfMS5nZXRDb2RlUG9pbnQoX2UsIDApIDogX2UuY2hhckNvZGVBdCgwKTtcbiAgICAgICAgICAgICAgICByZXN1bHRfMSA9IChpc0hleCA/ICcmI3gnICsgY29kZV8xLnRvU3RyaW5nKDE2KSA6ICcmIycgKyBjb2RlXzEpICsgJzsnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX2MgKz0gcmVzdWx0XzE7XG4gICAgICAgICAgICBfZCA9IF9iLmluZGV4ICsgX2UubGVuZ3RoO1xuICAgICAgICB9IHdoaWxlICgoX2IgPSBlbmNvZGVSZWdFeHAuZXhlYyh0ZXh0KSkpO1xuICAgICAgICBpZiAoX2QgIT09IHRleHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBfYyArPSB0ZXh0LnN1YnN0cmluZyhfZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIF9jID1cbiAgICAgICAgICAgIHRleHQ7XG4gICAgfVxuICAgIHJldHVybiBfYztcbn1cbmV4cG9ydHMuZW5jb2RlID0gZW5jb2RlO1xudmFyIGRlZmF1bHREZWNvZGVPcHRpb25zID0ge1xuICAgIHNjb3BlOiAnYm9keScsXG4gICAgbGV2ZWw6ICdhbGwnXG59O1xudmFyIHN0cmljdCA9IC8mKD86I1xcZCt8I1t4WF1bXFxkYS1mQS1GXSt8WzAtOWEtekEtWl0rKTsvZztcbnZhciBhdHRyaWJ1dGUgPSAvJig/OiNcXGQrfCNbeFhdW1xcZGEtZkEtRl0rfFswLTlhLXpBLVpdKylbOz1dPy9nO1xudmFyIGJhc2VEZWNvZGVSZWdFeHBzID0ge1xuICAgIHhtbDoge1xuICAgICAgICBzdHJpY3Q6IHN0cmljdCxcbiAgICAgICAgYXR0cmlidXRlOiBhdHRyaWJ1dGUsXG4gICAgICAgIGJvZHk6IG5hbWVkX3JlZmVyZW5jZXNfMS5ib2R5UmVnRXhwcy54bWxcbiAgICB9LFxuICAgIGh0bWw0OiB7XG4gICAgICAgIHN0cmljdDogc3RyaWN0LFxuICAgICAgICBhdHRyaWJ1dGU6IGF0dHJpYnV0ZSxcbiAgICAgICAgYm9keTogbmFtZWRfcmVmZXJlbmNlc18xLmJvZHlSZWdFeHBzLmh0bWw0XG4gICAgfSxcbiAgICBodG1sNToge1xuICAgICAgICBzdHJpY3Q6IHN0cmljdCxcbiAgICAgICAgYXR0cmlidXRlOiBhdHRyaWJ1dGUsXG4gICAgICAgIGJvZHk6IG5hbWVkX3JlZmVyZW5jZXNfMS5ib2R5UmVnRXhwcy5odG1sNVxuICAgIH1cbn07XG52YXIgZGVjb2RlUmVnRXhwcyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBiYXNlRGVjb2RlUmVnRXhwcyksIHsgYWxsOiBiYXNlRGVjb2RlUmVnRXhwcy5odG1sNSB9KTtcbnZhciBmcm9tQ2hhckNvZGUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlO1xudmFyIG91dE9mQm91bmRzQ2hhciA9IGZyb21DaGFyQ29kZSg2NTUzMyk7XG52YXIgZGVmYXVsdERlY29kZUVudGl0eU9wdGlvbnMgPSB7XG4gICAgbGV2ZWw6ICdhbGwnXG59O1xuLyoqIERlY29kZXMgYSBzaW5nbGUgZW50aXR5ICovXG5mdW5jdGlvbiBkZWNvZGVFbnRpdHkoZW50aXR5LCBfYSkge1xuICAgIHZhciBfYiA9IChfYSA9PT0gdm9pZCAwID8gZGVmYXVsdERlY29kZUVudGl0eU9wdGlvbnMgOiBfYSkubGV2ZWwsIGxldmVsID0gX2IgPT09IHZvaWQgMCA/ICdhbGwnIDogX2I7XG4gICAgaWYgKCFlbnRpdHkpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICB2YXIgX2IgPSBlbnRpdHk7XG4gICAgdmFyIGRlY29kZUVudGl0eUxhc3RDaGFyXzEgPSBlbnRpdHlbZW50aXR5Lmxlbmd0aCAtIDFdO1xuICAgIGlmIChmYWxzZVxuICAgICAgICAmJiBkZWNvZGVFbnRpdHlMYXN0Q2hhcl8xID09PSAnPScpIHtcbiAgICAgICAgX2IgPVxuICAgICAgICAgICAgZW50aXR5O1xuICAgIH1cbiAgICBlbHNlIGlmIChmYWxzZVxuICAgICAgICAmJiBkZWNvZGVFbnRpdHlMYXN0Q2hhcl8xICE9PSAnOycpIHtcbiAgICAgICAgX2IgPVxuICAgICAgICAgICAgZW50aXR5O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIGRlY29kZVJlc3VsdEJ5UmVmZXJlbmNlXzEgPSBhbGxOYW1lZFJlZmVyZW5jZXNbbGV2ZWxdLmVudGl0aWVzW2VudGl0eV07XG4gICAgICAgIGlmIChkZWNvZGVSZXN1bHRCeVJlZmVyZW5jZV8xKSB7XG4gICAgICAgICAgICBfYiA9IGRlY29kZVJlc3VsdEJ5UmVmZXJlbmNlXzE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZW50aXR5WzBdID09PSAnJicgJiYgZW50aXR5WzFdID09PSAnIycpIHtcbiAgICAgICAgICAgIHZhciBkZWNvZGVTZWNvbmRDaGFyXzEgPSBlbnRpdHlbMl07XG4gICAgICAgICAgICB2YXIgZGVjb2RlQ29kZV8xID0gZGVjb2RlU2Vjb25kQ2hhcl8xID09ICd4JyB8fCBkZWNvZGVTZWNvbmRDaGFyXzEgPT0gJ1gnXG4gICAgICAgICAgICAgICAgPyBwYXJzZUludChlbnRpdHkuc3Vic3RyKDMpLCAxNilcbiAgICAgICAgICAgICAgICA6IHBhcnNlSW50KGVudGl0eS5zdWJzdHIoMikpO1xuICAgICAgICAgICAgX2IgPVxuICAgICAgICAgICAgICAgIGRlY29kZUNvZGVfMSA+PSAweDEwZmZmZlxuICAgICAgICAgICAgICAgICAgICA/IG91dE9mQm91bmRzQ2hhclxuICAgICAgICAgICAgICAgICAgICA6IGRlY29kZUNvZGVfMSA+IDY1NTM1XG4gICAgICAgICAgICAgICAgICAgICAgICA/IHN1cnJvZ2F0ZV9wYWlyc18xLmZyb21Db2RlUG9pbnQoZGVjb2RlQ29kZV8xKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBmcm9tQ2hhckNvZGUobnVtZXJpY191bmljb2RlX21hcF8xLm51bWVyaWNVbmljb2RlTWFwW2RlY29kZUNvZGVfMV0gfHwgZGVjb2RlQ29kZV8xKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gX2I7XG59XG5leHBvcnRzLmRlY29kZUVudGl0eSA9IGRlY29kZUVudGl0eTtcbi8qKiBEZWNvZGVzIGFsbCBlbnRpdGllcyBpbiB0aGUgdGV4dCAqL1xuZnVuY3Rpb24gZGVjb2RlKHRleHQsIF9hKSB7XG4gICAgdmFyIGRlY29kZVNlY29uZENoYXJfMSA9IF9hID09PSB2b2lkIDAgPyBkZWZhdWx0RGVjb2RlT3B0aW9ucyA6IF9hLCBkZWNvZGVDb2RlXzEgPSBkZWNvZGVTZWNvbmRDaGFyXzEubGV2ZWwsIGxldmVsID0gZGVjb2RlQ29kZV8xID09PSB2b2lkIDAgPyAnYWxsJyA6IGRlY29kZUNvZGVfMSwgX2IgPSBkZWNvZGVTZWNvbmRDaGFyXzEuc2NvcGUsIHNjb3BlID0gX2IgPT09IHZvaWQgMCA/IGxldmVsID09PSAneG1sJyA/ICdzdHJpY3QnIDogJ2JvZHknIDogX2I7XG4gICAgaWYgKCF0ZXh0KSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgdmFyIGRlY29kZVJlZ0V4cCA9IGRlY29kZVJlZ0V4cHNbbGV2ZWxdW3Njb3BlXTtcbiAgICB2YXIgcmVmZXJlbmNlcyA9IGFsbE5hbWVkUmVmZXJlbmNlc1tsZXZlbF0uZW50aXRpZXM7XG4gICAgdmFyIGlzQXR0cmlidXRlID0gc2NvcGUgPT09ICdhdHRyaWJ1dGUnO1xuICAgIHZhciBpc1N0cmljdCA9IHNjb3BlID09PSAnc3RyaWN0JztcbiAgICBkZWNvZGVSZWdFeHAubGFzdEluZGV4ID0gMDtcbiAgICB2YXIgcmVwbGFjZU1hdGNoXzEgPSBkZWNvZGVSZWdFeHAuZXhlYyh0ZXh0KTtcbiAgICB2YXIgcmVwbGFjZVJlc3VsdF8xO1xuICAgIGlmIChyZXBsYWNlTWF0Y2hfMSkge1xuICAgICAgICByZXBsYWNlUmVzdWx0XzEgPSAnJztcbiAgICAgICAgdmFyIHJlcGxhY2VMYXN0SW5kZXhfMSA9IDA7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGlmIChyZXBsYWNlTGFzdEluZGV4XzEgIT09IHJlcGxhY2VNYXRjaF8xLmluZGV4KSB7XG4gICAgICAgICAgICAgICAgcmVwbGFjZVJlc3VsdF8xICs9IHRleHQuc3Vic3RyaW5nKHJlcGxhY2VMYXN0SW5kZXhfMSwgcmVwbGFjZU1hdGNoXzEuaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHJlcGxhY2VJbnB1dF8xID0gcmVwbGFjZU1hdGNoXzFbMF07XG4gICAgICAgICAgICB2YXIgZGVjb2RlUmVzdWx0XzEgPSByZXBsYWNlSW5wdXRfMTtcbiAgICAgICAgICAgIHZhciBkZWNvZGVFbnRpdHlMYXN0Q2hhcl8yID0gcmVwbGFjZUlucHV0XzFbcmVwbGFjZUlucHV0XzEubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBpZiAoaXNBdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICAmJiBkZWNvZGVFbnRpdHlMYXN0Q2hhcl8yID09PSAnPScpIHtcbiAgICAgICAgICAgICAgICBkZWNvZGVSZXN1bHRfMSA9IHJlcGxhY2VJbnB1dF8xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNTdHJpY3RcbiAgICAgICAgICAgICAgICAmJiBkZWNvZGVFbnRpdHlMYXN0Q2hhcl8yICE9PSAnOycpIHtcbiAgICAgICAgICAgICAgICBkZWNvZGVSZXN1bHRfMSA9IHJlcGxhY2VJbnB1dF8xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlY29kZVJlc3VsdEJ5UmVmZXJlbmNlXzIgPSByZWZlcmVuY2VzW3JlcGxhY2VJbnB1dF8xXTtcbiAgICAgICAgICAgICAgICBpZiAoZGVjb2RlUmVzdWx0QnlSZWZlcmVuY2VfMikge1xuICAgICAgICAgICAgICAgICAgICBkZWNvZGVSZXN1bHRfMSA9IGRlY29kZVJlc3VsdEJ5UmVmZXJlbmNlXzI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlcGxhY2VJbnB1dF8xWzBdID09PSAnJicgJiYgcmVwbGFjZUlucHV0XzFbMV0gPT09ICcjJykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGVjb2RlU2Vjb25kQ2hhcl8yID0gcmVwbGFjZUlucHV0XzFbMl07XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWNvZGVDb2RlXzIgPSBkZWNvZGVTZWNvbmRDaGFyXzIgPT0gJ3gnIHx8IGRlY29kZVNlY29uZENoYXJfMiA9PSAnWCdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gcGFyc2VJbnQocmVwbGFjZUlucHV0XzEuc3Vic3RyKDMpLCAxNilcbiAgICAgICAgICAgICAgICAgICAgICAgIDogcGFyc2VJbnQocmVwbGFjZUlucHV0XzEuc3Vic3RyKDIpKTtcbiAgICAgICAgICAgICAgICAgICAgZGVjb2RlUmVzdWx0XzEgPVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVjb2RlQ29kZV8yID49IDB4MTBmZmZmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBvdXRPZkJvdW5kc0NoYXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGRlY29kZUNvZGVfMiA+IDY1NTM1XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gc3Vycm9nYXRlX3BhaXJzXzEuZnJvbUNvZGVQb2ludChkZWNvZGVDb2RlXzIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZnJvbUNoYXJDb2RlKG51bWVyaWNfdW5pY29kZV9tYXBfMS5udW1lcmljVW5pY29kZU1hcFtkZWNvZGVDb2RlXzJdIHx8IGRlY29kZUNvZGVfMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVwbGFjZVJlc3VsdF8xICs9IGRlY29kZVJlc3VsdF8xO1xuICAgICAgICAgICAgcmVwbGFjZUxhc3RJbmRleF8xID0gcmVwbGFjZU1hdGNoXzEuaW5kZXggKyByZXBsYWNlSW5wdXRfMS5sZW5ndGg7XG4gICAgICAgIH0gd2hpbGUgKChyZXBsYWNlTWF0Y2hfMSA9IGRlY29kZVJlZ0V4cC5leGVjKHRleHQpKSk7XG4gICAgICAgIGlmIChyZXBsYWNlTGFzdEluZGV4XzEgIT09IHRleHQubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXBsYWNlUmVzdWx0XzEgKz0gdGV4dC5zdWJzdHJpbmcocmVwbGFjZUxhc3RJbmRleF8xKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVwbGFjZVJlc3VsdF8xID1cbiAgICAgICAgICAgIHRleHQ7XG4gICAgfVxuICAgIHJldHVybiByZXBsYWNlUmVzdWx0XzE7XG59XG5leHBvcnRzLmRlY29kZSA9IGRlY29kZTtcbiIsIlwidXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTp0cnVlfSk7ZXhwb3J0cy5ib2R5UmVnRXhwcz17eG1sOi8mKD86I1xcZCt8I1t4WF1bXFxkYS1mQS1GXSt8WzAtOWEtekEtWl0rKTs/L2csaHRtbDQ6LyYoPzpuYnNwfGlleGNsfGNlbnR8cG91bmR8Y3VycmVufHllbnxicnZiYXJ8c2VjdHx1bWx8Y29weXxvcmRmfGxhcXVvfG5vdHxzaHl8cmVnfG1hY3J8ZGVnfHBsdXNtbnxzdXAyfHN1cDN8YWN1dGV8bWljcm98cGFyYXxtaWRkb3R8Y2VkaWx8c3VwMXxvcmRtfHJhcXVvfGZyYWMxNHxmcmFjMTJ8ZnJhYzM0fGlxdWVzdHxBZ3JhdmV8QWFjdXRlfEFjaXJjfEF0aWxkZXxBdW1sfEFyaW5nfEFFbGlnfENjZWRpbHxFZ3JhdmV8RWFjdXRlfEVjaXJjfEV1bWx8SWdyYXZlfElhY3V0ZXxJY2lyY3xJdW1sfEVUSHxOdGlsZGV8T2dyYXZlfE9hY3V0ZXxPY2lyY3xPdGlsZGV8T3VtbHx0aW1lc3xPc2xhc2h8VWdyYXZlfFVhY3V0ZXxVY2lyY3xVdW1sfFlhY3V0ZXxUSE9STnxzemxpZ3xhZ3JhdmV8YWFjdXRlfGFjaXJjfGF0aWxkZXxhdW1sfGFyaW5nfGFlbGlnfGNjZWRpbHxlZ3JhdmV8ZWFjdXRlfGVjaXJjfGV1bWx8aWdyYXZlfGlhY3V0ZXxpY2lyY3xpdW1sfGV0aHxudGlsZGV8b2dyYXZlfG9hY3V0ZXxvY2lyY3xvdGlsZGV8b3VtbHxkaXZpZGV8b3NsYXNofHVncmF2ZXx1YWN1dGV8dWNpcmN8dXVtbHx5YWN1dGV8dGhvcm58eXVtbHxxdW90fGFtcHxsdHxndHwjXFxkK3wjW3hYXVtcXGRhLWZBLUZdK3xbMC05YS16QS1aXSspOz8vZyxodG1sNTovJig/OkFFbGlnfEFNUHxBYWN1dGV8QWNpcmN8QWdyYXZlfEFyaW5nfEF0aWxkZXxBdW1sfENPUFl8Q2NlZGlsfEVUSHxFYWN1dGV8RWNpcmN8RWdyYXZlfEV1bWx8R1R8SWFjdXRlfEljaXJjfElncmF2ZXxJdW1sfExUfE50aWxkZXxPYWN1dGV8T2NpcmN8T2dyYXZlfE9zbGFzaHxPdGlsZGV8T3VtbHxRVU9UfFJFR3xUSE9STnxVYWN1dGV8VWNpcmN8VWdyYXZlfFV1bWx8WWFjdXRlfGFhY3V0ZXxhY2lyY3xhY3V0ZXxhZWxpZ3xhZ3JhdmV8YW1wfGFyaW5nfGF0aWxkZXxhdW1sfGJydmJhcnxjY2VkaWx8Y2VkaWx8Y2VudHxjb3B5fGN1cnJlbnxkZWd8ZGl2aWRlfGVhY3V0ZXxlY2lyY3xlZ3JhdmV8ZXRofGV1bWx8ZnJhYzEyfGZyYWMxNHxmcmFjMzR8Z3R8aWFjdXRlfGljaXJjfGlleGNsfGlncmF2ZXxpcXVlc3R8aXVtbHxsYXF1b3xsdHxtYWNyfG1pY3JvfG1pZGRvdHxuYnNwfG5vdHxudGlsZGV8b2FjdXRlfG9jaXJjfG9ncmF2ZXxvcmRmfG9yZG18b3NsYXNofG90aWxkZXxvdW1sfHBhcmF8cGx1c21ufHBvdW5kfHF1b3R8cmFxdW98cmVnfHNlY3R8c2h5fHN1cDF8c3VwMnxzdXAzfHN6bGlnfHRob3JufHRpbWVzfHVhY3V0ZXx1Y2lyY3x1Z3JhdmV8dW1sfHV1bWx8eWFjdXRlfHllbnx5dW1sfCNcXGQrfCNbeFhdW1xcZGEtZkEtRl0rfFswLTlhLXpBLVpdKyk7Py9nfTtleHBvcnRzLm5hbWVkUmVmZXJlbmNlcz17eG1sOntlbnRpdGllczp7XCImbHQ7XCI6XCI8XCIsXCImZ3Q7XCI6XCI+XCIsXCImcXVvdDtcIjonXCInLFwiJmFwb3M7XCI6XCInXCIsXCImYW1wO1wiOlwiJlwifSxjaGFyYWN0ZXJzOntcIjxcIjpcIiZsdDtcIixcIj5cIjpcIiZndDtcIiwnXCInOlwiJnF1b3Q7XCIsXCInXCI6XCImYXBvcztcIixcIiZcIjpcIiZhbXA7XCJ9fSxodG1sNDp7ZW50aXRpZXM6e1wiJmFwb3M7XCI6XCInXCIsXCImbmJzcFwiOlwiwqBcIixcIiZuYnNwO1wiOlwiwqBcIixcIiZpZXhjbFwiOlwiwqFcIixcIiZpZXhjbDtcIjpcIsKhXCIsXCImY2VudFwiOlwiwqJcIixcIiZjZW50O1wiOlwiwqJcIixcIiZwb3VuZFwiOlwiwqNcIixcIiZwb3VuZDtcIjpcIsKjXCIsXCImY3VycmVuXCI6XCLCpFwiLFwiJmN1cnJlbjtcIjpcIsKkXCIsXCImeWVuXCI6XCLCpVwiLFwiJnllbjtcIjpcIsKlXCIsXCImYnJ2YmFyXCI6XCLCplwiLFwiJmJydmJhcjtcIjpcIsKmXCIsXCImc2VjdFwiOlwiwqdcIixcIiZzZWN0O1wiOlwiwqdcIixcIiZ1bWxcIjpcIsKoXCIsXCImdW1sO1wiOlwiwqhcIixcIiZjb3B5XCI6XCLCqVwiLFwiJmNvcHk7XCI6XCLCqVwiLFwiJm9yZGZcIjpcIsKqXCIsXCImb3JkZjtcIjpcIsKqXCIsXCImbGFxdW9cIjpcIsKrXCIsXCImbGFxdW87XCI6XCLCq1wiLFwiJm5vdFwiOlwiwqxcIixcIiZub3Q7XCI6XCLCrFwiLFwiJnNoeVwiOlwiwq1cIixcIiZzaHk7XCI6XCLCrVwiLFwiJnJlZ1wiOlwiwq5cIixcIiZyZWc7XCI6XCLCrlwiLFwiJm1hY3JcIjpcIsKvXCIsXCImbWFjcjtcIjpcIsKvXCIsXCImZGVnXCI6XCLCsFwiLFwiJmRlZztcIjpcIsKwXCIsXCImcGx1c21uXCI6XCLCsVwiLFwiJnBsdXNtbjtcIjpcIsKxXCIsXCImc3VwMlwiOlwiwrJcIixcIiZzdXAyO1wiOlwiwrJcIixcIiZzdXAzXCI6XCLCs1wiLFwiJnN1cDM7XCI6XCLCs1wiLFwiJmFjdXRlXCI6XCLCtFwiLFwiJmFjdXRlO1wiOlwiwrRcIixcIiZtaWNyb1wiOlwiwrVcIixcIiZtaWNybztcIjpcIsK1XCIsXCImcGFyYVwiOlwiwrZcIixcIiZwYXJhO1wiOlwiwrZcIixcIiZtaWRkb3RcIjpcIsK3XCIsXCImbWlkZG90O1wiOlwiwrdcIixcIiZjZWRpbFwiOlwiwrhcIixcIiZjZWRpbDtcIjpcIsK4XCIsXCImc3VwMVwiOlwiwrlcIixcIiZzdXAxO1wiOlwiwrlcIixcIiZvcmRtXCI6XCLCulwiLFwiJm9yZG07XCI6XCLCulwiLFwiJnJhcXVvXCI6XCLCu1wiLFwiJnJhcXVvO1wiOlwiwrtcIixcIiZmcmFjMTRcIjpcIsK8XCIsXCImZnJhYzE0O1wiOlwiwrxcIixcIiZmcmFjMTJcIjpcIsK9XCIsXCImZnJhYzEyO1wiOlwiwr1cIixcIiZmcmFjMzRcIjpcIsK+XCIsXCImZnJhYzM0O1wiOlwiwr5cIixcIiZpcXVlc3RcIjpcIsK/XCIsXCImaXF1ZXN0O1wiOlwiwr9cIixcIiZBZ3JhdmVcIjpcIsOAXCIsXCImQWdyYXZlO1wiOlwiw4BcIixcIiZBYWN1dGVcIjpcIsOBXCIsXCImQWFjdXRlO1wiOlwiw4FcIixcIiZBY2lyY1wiOlwiw4JcIixcIiZBY2lyYztcIjpcIsOCXCIsXCImQXRpbGRlXCI6XCLDg1wiLFwiJkF0aWxkZTtcIjpcIsODXCIsXCImQXVtbFwiOlwiw4RcIixcIiZBdW1sO1wiOlwiw4RcIixcIiZBcmluZ1wiOlwiw4VcIixcIiZBcmluZztcIjpcIsOFXCIsXCImQUVsaWdcIjpcIsOGXCIsXCImQUVsaWc7XCI6XCLDhlwiLFwiJkNjZWRpbFwiOlwiw4dcIixcIiZDY2VkaWw7XCI6XCLDh1wiLFwiJkVncmF2ZVwiOlwiw4hcIixcIiZFZ3JhdmU7XCI6XCLDiFwiLFwiJkVhY3V0ZVwiOlwiw4lcIixcIiZFYWN1dGU7XCI6XCLDiVwiLFwiJkVjaXJjXCI6XCLDilwiLFwiJkVjaXJjO1wiOlwiw4pcIixcIiZFdW1sXCI6XCLDi1wiLFwiJkV1bWw7XCI6XCLDi1wiLFwiJklncmF2ZVwiOlwiw4xcIixcIiZJZ3JhdmU7XCI6XCLDjFwiLFwiJklhY3V0ZVwiOlwiw41cIixcIiZJYWN1dGU7XCI6XCLDjVwiLFwiJkljaXJjXCI6XCLDjlwiLFwiJkljaXJjO1wiOlwiw45cIixcIiZJdW1sXCI6XCLDj1wiLFwiJkl1bWw7XCI6XCLDj1wiLFwiJkVUSFwiOlwiw5BcIixcIiZFVEg7XCI6XCLDkFwiLFwiJk50aWxkZVwiOlwiw5FcIixcIiZOdGlsZGU7XCI6XCLDkVwiLFwiJk9ncmF2ZVwiOlwiw5JcIixcIiZPZ3JhdmU7XCI6XCLDklwiLFwiJk9hY3V0ZVwiOlwiw5NcIixcIiZPYWN1dGU7XCI6XCLDk1wiLFwiJk9jaXJjXCI6XCLDlFwiLFwiJk9jaXJjO1wiOlwiw5RcIixcIiZPdGlsZGVcIjpcIsOVXCIsXCImT3RpbGRlO1wiOlwiw5VcIixcIiZPdW1sXCI6XCLDllwiLFwiJk91bWw7XCI6XCLDllwiLFwiJnRpbWVzXCI6XCLDl1wiLFwiJnRpbWVzO1wiOlwiw5dcIixcIiZPc2xhc2hcIjpcIsOYXCIsXCImT3NsYXNoO1wiOlwiw5hcIixcIiZVZ3JhdmVcIjpcIsOZXCIsXCImVWdyYXZlO1wiOlwiw5lcIixcIiZVYWN1dGVcIjpcIsOaXCIsXCImVWFjdXRlO1wiOlwiw5pcIixcIiZVY2lyY1wiOlwiw5tcIixcIiZVY2lyYztcIjpcIsObXCIsXCImVXVtbFwiOlwiw5xcIixcIiZVdW1sO1wiOlwiw5xcIixcIiZZYWN1dGVcIjpcIsOdXCIsXCImWWFjdXRlO1wiOlwiw51cIixcIiZUSE9STlwiOlwiw55cIixcIiZUSE9STjtcIjpcIsOeXCIsXCImc3psaWdcIjpcIsOfXCIsXCImc3psaWc7XCI6XCLDn1wiLFwiJmFncmF2ZVwiOlwiw6BcIixcIiZhZ3JhdmU7XCI6XCLDoFwiLFwiJmFhY3V0ZVwiOlwiw6FcIixcIiZhYWN1dGU7XCI6XCLDoVwiLFwiJmFjaXJjXCI6XCLDolwiLFwiJmFjaXJjO1wiOlwiw6JcIixcIiZhdGlsZGVcIjpcIsOjXCIsXCImYXRpbGRlO1wiOlwiw6NcIixcIiZhdW1sXCI6XCLDpFwiLFwiJmF1bWw7XCI6XCLDpFwiLFwiJmFyaW5nXCI6XCLDpVwiLFwiJmFyaW5nO1wiOlwiw6VcIixcIiZhZWxpZ1wiOlwiw6ZcIixcIiZhZWxpZztcIjpcIsOmXCIsXCImY2NlZGlsXCI6XCLDp1wiLFwiJmNjZWRpbDtcIjpcIsOnXCIsXCImZWdyYXZlXCI6XCLDqFwiLFwiJmVncmF2ZTtcIjpcIsOoXCIsXCImZWFjdXRlXCI6XCLDqVwiLFwiJmVhY3V0ZTtcIjpcIsOpXCIsXCImZWNpcmNcIjpcIsOqXCIsXCImZWNpcmM7XCI6XCLDqlwiLFwiJmV1bWxcIjpcIsOrXCIsXCImZXVtbDtcIjpcIsOrXCIsXCImaWdyYXZlXCI6XCLDrFwiLFwiJmlncmF2ZTtcIjpcIsOsXCIsXCImaWFjdXRlXCI6XCLDrVwiLFwiJmlhY3V0ZTtcIjpcIsOtXCIsXCImaWNpcmNcIjpcIsOuXCIsXCImaWNpcmM7XCI6XCLDrlwiLFwiJml1bWxcIjpcIsOvXCIsXCImaXVtbDtcIjpcIsOvXCIsXCImZXRoXCI6XCLDsFwiLFwiJmV0aDtcIjpcIsOwXCIsXCImbnRpbGRlXCI6XCLDsVwiLFwiJm50aWxkZTtcIjpcIsOxXCIsXCImb2dyYXZlXCI6XCLDslwiLFwiJm9ncmF2ZTtcIjpcIsOyXCIsXCImb2FjdXRlXCI6XCLDs1wiLFwiJm9hY3V0ZTtcIjpcIsOzXCIsXCImb2NpcmNcIjpcIsO0XCIsXCImb2NpcmM7XCI6XCLDtFwiLFwiJm90aWxkZVwiOlwiw7VcIixcIiZvdGlsZGU7XCI6XCLDtVwiLFwiJm91bWxcIjpcIsO2XCIsXCImb3VtbDtcIjpcIsO2XCIsXCImZGl2aWRlXCI6XCLDt1wiLFwiJmRpdmlkZTtcIjpcIsO3XCIsXCImb3NsYXNoXCI6XCLDuFwiLFwiJm9zbGFzaDtcIjpcIsO4XCIsXCImdWdyYXZlXCI6XCLDuVwiLFwiJnVncmF2ZTtcIjpcIsO5XCIsXCImdWFjdXRlXCI6XCLDulwiLFwiJnVhY3V0ZTtcIjpcIsO6XCIsXCImdWNpcmNcIjpcIsO7XCIsXCImdWNpcmM7XCI6XCLDu1wiLFwiJnV1bWxcIjpcIsO8XCIsXCImdXVtbDtcIjpcIsO8XCIsXCImeWFjdXRlXCI6XCLDvVwiLFwiJnlhY3V0ZTtcIjpcIsO9XCIsXCImdGhvcm5cIjpcIsO+XCIsXCImdGhvcm47XCI6XCLDvlwiLFwiJnl1bWxcIjpcIsO/XCIsXCImeXVtbDtcIjpcIsO/XCIsXCImcXVvdFwiOidcIicsXCImcXVvdDtcIjonXCInLFwiJmFtcFwiOlwiJlwiLFwiJmFtcDtcIjpcIiZcIixcIiZsdFwiOlwiPFwiLFwiJmx0O1wiOlwiPFwiLFwiJmd0XCI6XCI+XCIsXCImZ3Q7XCI6XCI+XCIsXCImT0VsaWc7XCI6XCLFklwiLFwiJm9lbGlnO1wiOlwixZNcIixcIiZTY2Fyb247XCI6XCLFoFwiLFwiJnNjYXJvbjtcIjpcIsWhXCIsXCImWXVtbDtcIjpcIsW4XCIsXCImY2lyYztcIjpcIsuGXCIsXCImdGlsZGU7XCI6XCLLnFwiLFwiJmVuc3A7XCI6XCLigIJcIixcIiZlbXNwO1wiOlwi4oCDXCIsXCImdGhpbnNwO1wiOlwi4oCJXCIsXCImenduajtcIjpcIuKAjFwiLFwiJnp3ajtcIjpcIuKAjVwiLFwiJmxybTtcIjpcIuKAjlwiLFwiJnJsbTtcIjpcIuKAj1wiLFwiJm5kYXNoO1wiOlwi4oCTXCIsXCImbWRhc2g7XCI6XCLigJRcIixcIiZsc3F1bztcIjpcIuKAmFwiLFwiJnJzcXVvO1wiOlwi4oCZXCIsXCImc2JxdW87XCI6XCLigJpcIixcIiZsZHF1bztcIjpcIuKAnFwiLFwiJnJkcXVvO1wiOlwi4oCdXCIsXCImYmRxdW87XCI6XCLigJ5cIixcIiZkYWdnZXI7XCI6XCLigKBcIixcIiZEYWdnZXI7XCI6XCLigKFcIixcIiZwZXJtaWw7XCI6XCLigLBcIixcIiZsc2FxdW87XCI6XCLigLlcIixcIiZyc2FxdW87XCI6XCLigLpcIixcIiZldXJvO1wiOlwi4oKsXCIsXCImZm5vZjtcIjpcIsaSXCIsXCImQWxwaGE7XCI6XCLOkVwiLFwiJkJldGE7XCI6XCLOklwiLFwiJkdhbW1hO1wiOlwizpNcIixcIiZEZWx0YTtcIjpcIs6UXCIsXCImRXBzaWxvbjtcIjpcIs6VXCIsXCImWmV0YTtcIjpcIs6WXCIsXCImRXRhO1wiOlwizpdcIixcIiZUaGV0YTtcIjpcIs6YXCIsXCImSW90YTtcIjpcIs6ZXCIsXCImS2FwcGE7XCI6XCLOmlwiLFwiJkxhbWJkYTtcIjpcIs6bXCIsXCImTXU7XCI6XCLOnFwiLFwiJk51O1wiOlwizp1cIixcIiZYaTtcIjpcIs6eXCIsXCImT21pY3JvbjtcIjpcIs6fXCIsXCImUGk7XCI6XCLOoFwiLFwiJlJobztcIjpcIs6hXCIsXCImU2lnbWE7XCI6XCLOo1wiLFwiJlRhdTtcIjpcIs6kXCIsXCImVXBzaWxvbjtcIjpcIs6lXCIsXCImUGhpO1wiOlwizqZcIixcIiZDaGk7XCI6XCLOp1wiLFwiJlBzaTtcIjpcIs6oXCIsXCImT21lZ2E7XCI6XCLOqVwiLFwiJmFscGhhO1wiOlwizrFcIixcIiZiZXRhO1wiOlwizrJcIixcIiZnYW1tYTtcIjpcIs6zXCIsXCImZGVsdGE7XCI6XCLOtFwiLFwiJmVwc2lsb247XCI6XCLOtVwiLFwiJnpldGE7XCI6XCLOtlwiLFwiJmV0YTtcIjpcIs63XCIsXCImdGhldGE7XCI6XCLOuFwiLFwiJmlvdGE7XCI6XCLOuVwiLFwiJmthcHBhO1wiOlwizrpcIixcIiZsYW1iZGE7XCI6XCLOu1wiLFwiJm11O1wiOlwizrxcIixcIiZudTtcIjpcIs69XCIsXCImeGk7XCI6XCLOvlwiLFwiJm9taWNyb247XCI6XCLOv1wiLFwiJnBpO1wiOlwiz4BcIixcIiZyaG87XCI6XCLPgVwiLFwiJnNpZ21hZjtcIjpcIs+CXCIsXCImc2lnbWE7XCI6XCLPg1wiLFwiJnRhdTtcIjpcIs+EXCIsXCImdXBzaWxvbjtcIjpcIs+FXCIsXCImcGhpO1wiOlwiz4ZcIixcIiZjaGk7XCI6XCLPh1wiLFwiJnBzaTtcIjpcIs+IXCIsXCImb21lZ2E7XCI6XCLPiVwiLFwiJnRoZXRhc3ltO1wiOlwiz5FcIixcIiZ1cHNpaDtcIjpcIs+SXCIsXCImcGl2O1wiOlwiz5ZcIixcIiZidWxsO1wiOlwi4oCiXCIsXCImaGVsbGlwO1wiOlwi4oCmXCIsXCImcHJpbWU7XCI6XCLigLJcIixcIiZQcmltZTtcIjpcIuKAs1wiLFwiJm9saW5lO1wiOlwi4oC+XCIsXCImZnJhc2w7XCI6XCLigYRcIixcIiZ3ZWllcnA7XCI6XCLihJhcIixcIiZpbWFnZTtcIjpcIuKEkVwiLFwiJnJlYWw7XCI6XCLihJxcIixcIiZ0cmFkZTtcIjpcIuKEolwiLFwiJmFsZWZzeW07XCI6XCLihLVcIixcIiZsYXJyO1wiOlwi4oaQXCIsXCImdWFycjtcIjpcIuKGkVwiLFwiJnJhcnI7XCI6XCLihpJcIixcIiZkYXJyO1wiOlwi4oaTXCIsXCImaGFycjtcIjpcIuKGlFwiLFwiJmNyYXJyO1wiOlwi4oa1XCIsXCImbEFycjtcIjpcIuKHkFwiLFwiJnVBcnI7XCI6XCLih5FcIixcIiZyQXJyO1wiOlwi4oeSXCIsXCImZEFycjtcIjpcIuKHk1wiLFwiJmhBcnI7XCI6XCLih5RcIixcIiZmb3JhbGw7XCI6XCLiiIBcIixcIiZwYXJ0O1wiOlwi4oiCXCIsXCImZXhpc3Q7XCI6XCLiiINcIixcIiZlbXB0eTtcIjpcIuKIhVwiLFwiJm5hYmxhO1wiOlwi4oiHXCIsXCImaXNpbjtcIjpcIuKIiFwiLFwiJm5vdGluO1wiOlwi4oiJXCIsXCImbmk7XCI6XCLiiItcIixcIiZwcm9kO1wiOlwi4oiPXCIsXCImc3VtO1wiOlwi4oiRXCIsXCImbWludXM7XCI6XCLiiJJcIixcIiZsb3dhc3Q7XCI6XCLiiJdcIixcIiZyYWRpYztcIjpcIuKImlwiLFwiJnByb3A7XCI6XCLiiJ1cIixcIiZpbmZpbjtcIjpcIuKInlwiLFwiJmFuZztcIjpcIuKIoFwiLFwiJmFuZDtcIjpcIuKIp1wiLFwiJm9yO1wiOlwi4oioXCIsXCImY2FwO1wiOlwi4oipXCIsXCImY3VwO1wiOlwi4oiqXCIsXCImaW50O1wiOlwi4oirXCIsXCImdGhlcmU0O1wiOlwi4oi0XCIsXCImc2ltO1wiOlwi4oi8XCIsXCImY29uZztcIjpcIuKJhVwiLFwiJmFzeW1wO1wiOlwi4omIXCIsXCImbmU7XCI6XCLiiaBcIixcIiZlcXVpdjtcIjpcIuKJoVwiLFwiJmxlO1wiOlwi4omkXCIsXCImZ2U7XCI6XCLiiaVcIixcIiZzdWI7XCI6XCLiioJcIixcIiZzdXA7XCI6XCLiioNcIixcIiZuc3ViO1wiOlwi4oqEXCIsXCImc3ViZTtcIjpcIuKKhlwiLFwiJnN1cGU7XCI6XCLiiodcIixcIiZvcGx1cztcIjpcIuKKlVwiLFwiJm90aW1lcztcIjpcIuKKl1wiLFwiJnBlcnA7XCI6XCLiiqVcIixcIiZzZG90O1wiOlwi4ouFXCIsXCImbGNlaWw7XCI6XCLijIhcIixcIiZyY2VpbDtcIjpcIuKMiVwiLFwiJmxmbG9vcjtcIjpcIuKMilwiLFwiJnJmbG9vcjtcIjpcIuKMi1wiLFwiJmxhbmc7XCI6XCLijKlcIixcIiZyYW5nO1wiOlwi4oyqXCIsXCImbG96O1wiOlwi4peKXCIsXCImc3BhZGVzO1wiOlwi4pmgXCIsXCImY2x1YnM7XCI6XCLimaNcIixcIiZoZWFydHM7XCI6XCLimaVcIixcIiZkaWFtcztcIjpcIuKZplwifSxjaGFyYWN0ZXJzOntcIidcIjpcIiZhcG9zO1wiLFwiwqBcIjpcIiZuYnNwO1wiLFwiwqFcIjpcIiZpZXhjbDtcIixcIsKiXCI6XCImY2VudDtcIixcIsKjXCI6XCImcG91bmQ7XCIsXCLCpFwiOlwiJmN1cnJlbjtcIixcIsKlXCI6XCImeWVuO1wiLFwiwqZcIjpcIiZicnZiYXI7XCIsXCLCp1wiOlwiJnNlY3Q7XCIsXCLCqFwiOlwiJnVtbDtcIixcIsKpXCI6XCImY29weTtcIixcIsKqXCI6XCImb3JkZjtcIixcIsKrXCI6XCImbGFxdW87XCIsXCLCrFwiOlwiJm5vdDtcIixcIsKtXCI6XCImc2h5O1wiLFwiwq5cIjpcIiZyZWc7XCIsXCLCr1wiOlwiJm1hY3I7XCIsXCLCsFwiOlwiJmRlZztcIixcIsKxXCI6XCImcGx1c21uO1wiLFwiwrJcIjpcIiZzdXAyO1wiLFwiwrNcIjpcIiZzdXAzO1wiLFwiwrRcIjpcIiZhY3V0ZTtcIixcIsK1XCI6XCImbWljcm87XCIsXCLCtlwiOlwiJnBhcmE7XCIsXCLCt1wiOlwiJm1pZGRvdDtcIixcIsK4XCI6XCImY2VkaWw7XCIsXCLCuVwiOlwiJnN1cDE7XCIsXCLCulwiOlwiJm9yZG07XCIsXCLCu1wiOlwiJnJhcXVvO1wiLFwiwrxcIjpcIiZmcmFjMTQ7XCIsXCLCvVwiOlwiJmZyYWMxMjtcIixcIsK+XCI6XCImZnJhYzM0O1wiLFwiwr9cIjpcIiZpcXVlc3Q7XCIsXCLDgFwiOlwiJkFncmF2ZTtcIixcIsOBXCI6XCImQWFjdXRlO1wiLFwiw4JcIjpcIiZBY2lyYztcIixcIsODXCI6XCImQXRpbGRlO1wiLFwiw4RcIjpcIiZBdW1sO1wiLFwiw4VcIjpcIiZBcmluZztcIixcIsOGXCI6XCImQUVsaWc7XCIsXCLDh1wiOlwiJkNjZWRpbDtcIixcIsOIXCI6XCImRWdyYXZlO1wiLFwiw4lcIjpcIiZFYWN1dGU7XCIsXCLDilwiOlwiJkVjaXJjO1wiLFwiw4tcIjpcIiZFdW1sO1wiLFwiw4xcIjpcIiZJZ3JhdmU7XCIsXCLDjVwiOlwiJklhY3V0ZTtcIixcIsOOXCI6XCImSWNpcmM7XCIsXCLDj1wiOlwiJkl1bWw7XCIsXCLDkFwiOlwiJkVUSDtcIixcIsORXCI6XCImTnRpbGRlO1wiLFwiw5JcIjpcIiZPZ3JhdmU7XCIsXCLDk1wiOlwiJk9hY3V0ZTtcIixcIsOUXCI6XCImT2NpcmM7XCIsXCLDlVwiOlwiJk90aWxkZTtcIixcIsOWXCI6XCImT3VtbDtcIixcIsOXXCI6XCImdGltZXM7XCIsXCLDmFwiOlwiJk9zbGFzaDtcIixcIsOZXCI6XCImVWdyYXZlO1wiLFwiw5pcIjpcIiZVYWN1dGU7XCIsXCLDm1wiOlwiJlVjaXJjO1wiLFwiw5xcIjpcIiZVdW1sO1wiLFwiw51cIjpcIiZZYWN1dGU7XCIsXCLDnlwiOlwiJlRIT1JOO1wiLFwiw59cIjpcIiZzemxpZztcIixcIsOgXCI6XCImYWdyYXZlO1wiLFwiw6FcIjpcIiZhYWN1dGU7XCIsXCLDolwiOlwiJmFjaXJjO1wiLFwiw6NcIjpcIiZhdGlsZGU7XCIsXCLDpFwiOlwiJmF1bWw7XCIsXCLDpVwiOlwiJmFyaW5nO1wiLFwiw6ZcIjpcIiZhZWxpZztcIixcIsOnXCI6XCImY2NlZGlsO1wiLFwiw6hcIjpcIiZlZ3JhdmU7XCIsXCLDqVwiOlwiJmVhY3V0ZTtcIixcIsOqXCI6XCImZWNpcmM7XCIsXCLDq1wiOlwiJmV1bWw7XCIsXCLDrFwiOlwiJmlncmF2ZTtcIixcIsOtXCI6XCImaWFjdXRlO1wiLFwiw65cIjpcIiZpY2lyYztcIixcIsOvXCI6XCImaXVtbDtcIixcIsOwXCI6XCImZXRoO1wiLFwiw7FcIjpcIiZudGlsZGU7XCIsXCLDslwiOlwiJm9ncmF2ZTtcIixcIsOzXCI6XCImb2FjdXRlO1wiLFwiw7RcIjpcIiZvY2lyYztcIixcIsO1XCI6XCImb3RpbGRlO1wiLFwiw7ZcIjpcIiZvdW1sO1wiLFwiw7dcIjpcIiZkaXZpZGU7XCIsXCLDuFwiOlwiJm9zbGFzaDtcIixcIsO5XCI6XCImdWdyYXZlO1wiLFwiw7pcIjpcIiZ1YWN1dGU7XCIsXCLDu1wiOlwiJnVjaXJjO1wiLFwiw7xcIjpcIiZ1dW1sO1wiLFwiw71cIjpcIiZ5YWN1dGU7XCIsXCLDvlwiOlwiJnRob3JuO1wiLFwiw79cIjpcIiZ5dW1sO1wiLCdcIic6XCImcXVvdDtcIixcIiZcIjpcIiZhbXA7XCIsXCI8XCI6XCImbHQ7XCIsXCI+XCI6XCImZ3Q7XCIsXCLFklwiOlwiJk9FbGlnO1wiLFwixZNcIjpcIiZvZWxpZztcIixcIsWgXCI6XCImU2Nhcm9uO1wiLFwixaFcIjpcIiZzY2Fyb247XCIsXCLFuFwiOlwiJll1bWw7XCIsXCLLhlwiOlwiJmNpcmM7XCIsXCLLnFwiOlwiJnRpbGRlO1wiLFwi4oCCXCI6XCImZW5zcDtcIixcIuKAg1wiOlwiJmVtc3A7XCIsXCLigIlcIjpcIiZ0aGluc3A7XCIsXCLigIxcIjpcIiZ6d25qO1wiLFwi4oCNXCI6XCImendqO1wiLFwi4oCOXCI6XCImbHJtO1wiLFwi4oCPXCI6XCImcmxtO1wiLFwi4oCTXCI6XCImbmRhc2g7XCIsXCLigJRcIjpcIiZtZGFzaDtcIixcIuKAmFwiOlwiJmxzcXVvO1wiLFwi4oCZXCI6XCImcnNxdW87XCIsXCLigJpcIjpcIiZzYnF1bztcIixcIuKAnFwiOlwiJmxkcXVvO1wiLFwi4oCdXCI6XCImcmRxdW87XCIsXCLigJ5cIjpcIiZiZHF1bztcIixcIuKAoFwiOlwiJmRhZ2dlcjtcIixcIuKAoVwiOlwiJkRhZ2dlcjtcIixcIuKAsFwiOlwiJnBlcm1pbDtcIixcIuKAuVwiOlwiJmxzYXF1bztcIixcIuKAulwiOlwiJnJzYXF1bztcIixcIuKCrFwiOlwiJmV1cm87XCIsXCLGklwiOlwiJmZub2Y7XCIsXCLOkVwiOlwiJkFscGhhO1wiLFwizpJcIjpcIiZCZXRhO1wiLFwizpNcIjpcIiZHYW1tYTtcIixcIs6UXCI6XCImRGVsdGE7XCIsXCLOlVwiOlwiJkVwc2lsb247XCIsXCLOllwiOlwiJlpldGE7XCIsXCLOl1wiOlwiJkV0YTtcIixcIs6YXCI6XCImVGhldGE7XCIsXCLOmVwiOlwiJklvdGE7XCIsXCLOmlwiOlwiJkthcHBhO1wiLFwizptcIjpcIiZMYW1iZGE7XCIsXCLOnFwiOlwiJk11O1wiLFwizp1cIjpcIiZOdTtcIixcIs6eXCI6XCImWGk7XCIsXCLOn1wiOlwiJk9taWNyb247XCIsXCLOoFwiOlwiJlBpO1wiLFwizqFcIjpcIiZSaG87XCIsXCLOo1wiOlwiJlNpZ21hO1wiLFwizqRcIjpcIiZUYXU7XCIsXCLOpVwiOlwiJlVwc2lsb247XCIsXCLOplwiOlwiJlBoaTtcIixcIs6nXCI6XCImQ2hpO1wiLFwizqhcIjpcIiZQc2k7XCIsXCLOqVwiOlwiJk9tZWdhO1wiLFwizrFcIjpcIiZhbHBoYTtcIixcIs6yXCI6XCImYmV0YTtcIixcIs6zXCI6XCImZ2FtbWE7XCIsXCLOtFwiOlwiJmRlbHRhO1wiLFwizrVcIjpcIiZlcHNpbG9uO1wiLFwizrZcIjpcIiZ6ZXRhO1wiLFwizrdcIjpcIiZldGE7XCIsXCLOuFwiOlwiJnRoZXRhO1wiLFwizrlcIjpcIiZpb3RhO1wiLFwizrpcIjpcIiZrYXBwYTtcIixcIs67XCI6XCImbGFtYmRhO1wiLFwizrxcIjpcIiZtdTtcIixcIs69XCI6XCImbnU7XCIsXCLOvlwiOlwiJnhpO1wiLFwizr9cIjpcIiZvbWljcm9uO1wiLFwiz4BcIjpcIiZwaTtcIixcIs+BXCI6XCImcmhvO1wiLFwiz4JcIjpcIiZzaWdtYWY7XCIsXCLPg1wiOlwiJnNpZ21hO1wiLFwiz4RcIjpcIiZ0YXU7XCIsXCLPhVwiOlwiJnVwc2lsb247XCIsXCLPhlwiOlwiJnBoaTtcIixcIs+HXCI6XCImY2hpO1wiLFwiz4hcIjpcIiZwc2k7XCIsXCLPiVwiOlwiJm9tZWdhO1wiLFwiz5FcIjpcIiZ0aGV0YXN5bTtcIixcIs+SXCI6XCImdXBzaWg7XCIsXCLPllwiOlwiJnBpdjtcIixcIuKAolwiOlwiJmJ1bGw7XCIsXCLigKZcIjpcIiZoZWxsaXA7XCIsXCLigLJcIjpcIiZwcmltZTtcIixcIuKAs1wiOlwiJlByaW1lO1wiLFwi4oC+XCI6XCImb2xpbmU7XCIsXCLigYRcIjpcIiZmcmFzbDtcIixcIuKEmFwiOlwiJndlaWVycDtcIixcIuKEkVwiOlwiJmltYWdlO1wiLFwi4oScXCI6XCImcmVhbDtcIixcIuKEolwiOlwiJnRyYWRlO1wiLFwi4oS1XCI6XCImYWxlZnN5bTtcIixcIuKGkFwiOlwiJmxhcnI7XCIsXCLihpFcIjpcIiZ1YXJyO1wiLFwi4oaSXCI6XCImcmFycjtcIixcIuKGk1wiOlwiJmRhcnI7XCIsXCLihpRcIjpcIiZoYXJyO1wiLFwi4oa1XCI6XCImY3JhcnI7XCIsXCLih5BcIjpcIiZsQXJyO1wiLFwi4oeRXCI6XCImdUFycjtcIixcIuKHklwiOlwiJnJBcnI7XCIsXCLih5NcIjpcIiZkQXJyO1wiLFwi4oeUXCI6XCImaEFycjtcIixcIuKIgFwiOlwiJmZvcmFsbDtcIixcIuKIglwiOlwiJnBhcnQ7XCIsXCLiiINcIjpcIiZleGlzdDtcIixcIuKIhVwiOlwiJmVtcHR5O1wiLFwi4oiHXCI6XCImbmFibGE7XCIsXCLiiIhcIjpcIiZpc2luO1wiLFwi4oiJXCI6XCImbm90aW47XCIsXCLiiItcIjpcIiZuaTtcIixcIuKIj1wiOlwiJnByb2Q7XCIsXCLiiJFcIjpcIiZzdW07XCIsXCLiiJJcIjpcIiZtaW51cztcIixcIuKIl1wiOlwiJmxvd2FzdDtcIixcIuKImlwiOlwiJnJhZGljO1wiLFwi4oidXCI6XCImcHJvcDtcIixcIuKInlwiOlwiJmluZmluO1wiLFwi4oigXCI6XCImYW5nO1wiLFwi4oinXCI6XCImYW5kO1wiLFwi4oioXCI6XCImb3I7XCIsXCLiiKlcIjpcIiZjYXA7XCIsXCLiiKpcIjpcIiZjdXA7XCIsXCLiiKtcIjpcIiZpbnQ7XCIsXCLiiLRcIjpcIiZ0aGVyZTQ7XCIsXCLiiLxcIjpcIiZzaW07XCIsXCLiiYVcIjpcIiZjb25nO1wiLFwi4omIXCI6XCImYXN5bXA7XCIsXCLiiaBcIjpcIiZuZTtcIixcIuKJoVwiOlwiJmVxdWl2O1wiLFwi4omkXCI6XCImbGU7XCIsXCLiiaVcIjpcIiZnZTtcIixcIuKKglwiOlwiJnN1YjtcIixcIuKKg1wiOlwiJnN1cDtcIixcIuKKhFwiOlwiJm5zdWI7XCIsXCLiioZcIjpcIiZzdWJlO1wiLFwi4oqHXCI6XCImc3VwZTtcIixcIuKKlVwiOlwiJm9wbHVzO1wiLFwi4oqXXCI6XCImb3RpbWVzO1wiLFwi4oqlXCI6XCImcGVycDtcIixcIuKLhVwiOlwiJnNkb3Q7XCIsXCLijIhcIjpcIiZsY2VpbDtcIixcIuKMiVwiOlwiJnJjZWlsO1wiLFwi4oyKXCI6XCImbGZsb29yO1wiLFwi4oyLXCI6XCImcmZsb29yO1wiLFwi4oypXCI6XCImbGFuZztcIixcIuKMqlwiOlwiJnJhbmc7XCIsXCLil4pcIjpcIiZsb3o7XCIsXCLimaBcIjpcIiZzcGFkZXM7XCIsXCLimaNcIjpcIiZjbHVicztcIixcIuKZpVwiOlwiJmhlYXJ0cztcIixcIuKZplwiOlwiJmRpYW1zO1wifX0saHRtbDU6e2VudGl0aWVzOntcIiZBRWxpZ1wiOlwiw4ZcIixcIiZBRWxpZztcIjpcIsOGXCIsXCImQU1QXCI6XCImXCIsXCImQU1QO1wiOlwiJlwiLFwiJkFhY3V0ZVwiOlwiw4FcIixcIiZBYWN1dGU7XCI6XCLDgVwiLFwiJkFicmV2ZTtcIjpcIsSCXCIsXCImQWNpcmNcIjpcIsOCXCIsXCImQWNpcmM7XCI6XCLDglwiLFwiJkFjeTtcIjpcItCQXCIsXCImQWZyO1wiOlwi8J2UhFwiLFwiJkFncmF2ZVwiOlwiw4BcIixcIiZBZ3JhdmU7XCI6XCLDgFwiLFwiJkFscGhhO1wiOlwizpFcIixcIiZBbWFjcjtcIjpcIsSAXCIsXCImQW5kO1wiOlwi4qmTXCIsXCImQW9nb247XCI6XCLEhFwiLFwiJkFvcGY7XCI6XCLwnZS4XCIsXCImQXBwbHlGdW5jdGlvbjtcIjpcIuKBoVwiLFwiJkFyaW5nXCI6XCLDhVwiLFwiJkFyaW5nO1wiOlwiw4VcIixcIiZBc2NyO1wiOlwi8J2SnFwiLFwiJkFzc2lnbjtcIjpcIuKJlFwiLFwiJkF0aWxkZVwiOlwiw4NcIixcIiZBdGlsZGU7XCI6XCLDg1wiLFwiJkF1bWxcIjpcIsOEXCIsXCImQXVtbDtcIjpcIsOEXCIsXCImQmFja3NsYXNoO1wiOlwi4oiWXCIsXCImQmFydjtcIjpcIuKrp1wiLFwiJkJhcndlZDtcIjpcIuKMhlwiLFwiJkJjeTtcIjpcItCRXCIsXCImQmVjYXVzZTtcIjpcIuKItVwiLFwiJkJlcm5vdWxsaXM7XCI6XCLihKxcIixcIiZCZXRhO1wiOlwizpJcIixcIiZCZnI7XCI6XCLwnZSFXCIsXCImQm9wZjtcIjpcIvCdlLlcIixcIiZCcmV2ZTtcIjpcIsuYXCIsXCImQnNjcjtcIjpcIuKErFwiLFwiJkJ1bXBlcTtcIjpcIuKJjlwiLFwiJkNIY3k7XCI6XCLQp1wiLFwiJkNPUFlcIjpcIsKpXCIsXCImQ09QWTtcIjpcIsKpXCIsXCImQ2FjdXRlO1wiOlwixIZcIixcIiZDYXA7XCI6XCLii5JcIixcIiZDYXBpdGFsRGlmZmVyZW50aWFsRDtcIjpcIuKFhVwiLFwiJkNheWxleXM7XCI6XCLihK1cIixcIiZDY2Fyb247XCI6XCLEjFwiLFwiJkNjZWRpbFwiOlwiw4dcIixcIiZDY2VkaWw7XCI6XCLDh1wiLFwiJkNjaXJjO1wiOlwixIhcIixcIiZDY29uaW50O1wiOlwi4oiwXCIsXCImQ2RvdDtcIjpcIsSKXCIsXCImQ2VkaWxsYTtcIjpcIsK4XCIsXCImQ2VudGVyRG90O1wiOlwiwrdcIixcIiZDZnI7XCI6XCLihK1cIixcIiZDaGk7XCI6XCLOp1wiLFwiJkNpcmNsZURvdDtcIjpcIuKKmVwiLFwiJkNpcmNsZU1pbnVzO1wiOlwi4oqWXCIsXCImQ2lyY2xlUGx1cztcIjpcIuKKlVwiLFwiJkNpcmNsZVRpbWVzO1wiOlwi4oqXXCIsXCImQ2xvY2t3aXNlQ29udG91ckludGVncmFsO1wiOlwi4oiyXCIsXCImQ2xvc2VDdXJseURvdWJsZVF1b3RlO1wiOlwi4oCdXCIsXCImQ2xvc2VDdXJseVF1b3RlO1wiOlwi4oCZXCIsXCImQ29sb247XCI6XCLiiLdcIixcIiZDb2xvbmU7XCI6XCLiqbRcIixcIiZDb25ncnVlbnQ7XCI6XCLiiaFcIixcIiZDb25pbnQ7XCI6XCLiiK9cIixcIiZDb250b3VySW50ZWdyYWw7XCI6XCLiiK5cIixcIiZDb3BmO1wiOlwi4oSCXCIsXCImQ29wcm9kdWN0O1wiOlwi4oiQXCIsXCImQ291bnRlckNsb2Nrd2lzZUNvbnRvdXJJbnRlZ3JhbDtcIjpcIuKIs1wiLFwiJkNyb3NzO1wiOlwi4qivXCIsXCImQ3NjcjtcIjpcIvCdkp5cIixcIiZDdXA7XCI6XCLii5NcIixcIiZDdXBDYXA7XCI6XCLiiY1cIixcIiZERDtcIjpcIuKFhVwiLFwiJkREb3RyYWhkO1wiOlwi4qSRXCIsXCImREpjeTtcIjpcItCCXCIsXCImRFNjeTtcIjpcItCFXCIsXCImRFpjeTtcIjpcItCPXCIsXCImRGFnZ2VyO1wiOlwi4oChXCIsXCImRGFycjtcIjpcIuKGoVwiLFwiJkRhc2h2O1wiOlwi4qukXCIsXCImRGNhcm9uO1wiOlwixI5cIixcIiZEY3k7XCI6XCLQlFwiLFwiJkRlbDtcIjpcIuKIh1wiLFwiJkRlbHRhO1wiOlwizpRcIixcIiZEZnI7XCI6XCLwnZSHXCIsXCImRGlhY3JpdGljYWxBY3V0ZTtcIjpcIsK0XCIsXCImRGlhY3JpdGljYWxEb3Q7XCI6XCLLmVwiLFwiJkRpYWNyaXRpY2FsRG91YmxlQWN1dGU7XCI6XCLLnVwiLFwiJkRpYWNyaXRpY2FsR3JhdmU7XCI6XCJgXCIsXCImRGlhY3JpdGljYWxUaWxkZTtcIjpcIsucXCIsXCImRGlhbW9uZDtcIjpcIuKLhFwiLFwiJkRpZmZlcmVudGlhbEQ7XCI6XCLihYZcIixcIiZEb3BmO1wiOlwi8J2Uu1wiLFwiJkRvdDtcIjpcIsKoXCIsXCImRG90RG90O1wiOlwi4oOcXCIsXCImRG90RXF1YWw7XCI6XCLiiZBcIixcIiZEb3VibGVDb250b3VySW50ZWdyYWw7XCI6XCLiiK9cIixcIiZEb3VibGVEb3Q7XCI6XCLCqFwiLFwiJkRvdWJsZURvd25BcnJvdztcIjpcIuKHk1wiLFwiJkRvdWJsZUxlZnRBcnJvdztcIjpcIuKHkFwiLFwiJkRvdWJsZUxlZnRSaWdodEFycm93O1wiOlwi4oeUXCIsXCImRG91YmxlTGVmdFRlZTtcIjpcIuKrpFwiLFwiJkRvdWJsZUxvbmdMZWZ0QXJyb3c7XCI6XCLin7hcIixcIiZEb3VibGVMb25nTGVmdFJpZ2h0QXJyb3c7XCI6XCLin7pcIixcIiZEb3VibGVMb25nUmlnaHRBcnJvdztcIjpcIuKfuVwiLFwiJkRvdWJsZVJpZ2h0QXJyb3c7XCI6XCLih5JcIixcIiZEb3VibGVSaWdodFRlZTtcIjpcIuKKqFwiLFwiJkRvdWJsZVVwQXJyb3c7XCI6XCLih5FcIixcIiZEb3VibGVVcERvd25BcnJvdztcIjpcIuKHlVwiLFwiJkRvdWJsZVZlcnRpY2FsQmFyO1wiOlwi4oilXCIsXCImRG93bkFycm93O1wiOlwi4oaTXCIsXCImRG93bkFycm93QmFyO1wiOlwi4qSTXCIsXCImRG93bkFycm93VXBBcnJvdztcIjpcIuKHtVwiLFwiJkRvd25CcmV2ZTtcIjpcIsyRXCIsXCImRG93bkxlZnRSaWdodFZlY3RvcjtcIjpcIuKlkFwiLFwiJkRvd25MZWZ0VGVlVmVjdG9yO1wiOlwi4qWeXCIsXCImRG93bkxlZnRWZWN0b3I7XCI6XCLihr1cIixcIiZEb3duTGVmdFZlY3RvckJhcjtcIjpcIuKlllwiLFwiJkRvd25SaWdodFRlZVZlY3RvcjtcIjpcIuKln1wiLFwiJkRvd25SaWdodFZlY3RvcjtcIjpcIuKHgVwiLFwiJkRvd25SaWdodFZlY3RvckJhcjtcIjpcIuKll1wiLFwiJkRvd25UZWU7XCI6XCLiiqRcIixcIiZEb3duVGVlQXJyb3c7XCI6XCLihqdcIixcIiZEb3duYXJyb3c7XCI6XCLih5NcIixcIiZEc2NyO1wiOlwi8J2Sn1wiLFwiJkRzdHJvaztcIjpcIsSQXCIsXCImRU5HO1wiOlwixYpcIixcIiZFVEhcIjpcIsOQXCIsXCImRVRIO1wiOlwiw5BcIixcIiZFYWN1dGVcIjpcIsOJXCIsXCImRWFjdXRlO1wiOlwiw4lcIixcIiZFY2Fyb247XCI6XCLEmlwiLFwiJkVjaXJjXCI6XCLDilwiLFwiJkVjaXJjO1wiOlwiw4pcIixcIiZFY3k7XCI6XCLQrVwiLFwiJkVkb3Q7XCI6XCLEllwiLFwiJkVmcjtcIjpcIvCdlIhcIixcIiZFZ3JhdmVcIjpcIsOIXCIsXCImRWdyYXZlO1wiOlwiw4hcIixcIiZFbGVtZW50O1wiOlwi4oiIXCIsXCImRW1hY3I7XCI6XCLEklwiLFwiJkVtcHR5U21hbGxTcXVhcmU7XCI6XCLil7tcIixcIiZFbXB0eVZlcnlTbWFsbFNxdWFyZTtcIjpcIuKWq1wiLFwiJkVvZ29uO1wiOlwixJhcIixcIiZFb3BmO1wiOlwi8J2UvFwiLFwiJkVwc2lsb247XCI6XCLOlVwiLFwiJkVxdWFsO1wiOlwi4qm1XCIsXCImRXF1YWxUaWxkZTtcIjpcIuKJglwiLFwiJkVxdWlsaWJyaXVtO1wiOlwi4oeMXCIsXCImRXNjcjtcIjpcIuKEsFwiLFwiJkVzaW07XCI6XCLiqbNcIixcIiZFdGE7XCI6XCLOl1wiLFwiJkV1bWxcIjpcIsOLXCIsXCImRXVtbDtcIjpcIsOLXCIsXCImRXhpc3RzO1wiOlwi4oiDXCIsXCImRXhwb25lbnRpYWxFO1wiOlwi4oWHXCIsXCImRmN5O1wiOlwi0KRcIixcIiZGZnI7XCI6XCLwnZSJXCIsXCImRmlsbGVkU21hbGxTcXVhcmU7XCI6XCLil7xcIixcIiZGaWxsZWRWZXJ5U21hbGxTcXVhcmU7XCI6XCLilqpcIixcIiZGb3BmO1wiOlwi8J2UvVwiLFwiJkZvckFsbDtcIjpcIuKIgFwiLFwiJkZvdXJpZXJ0cmY7XCI6XCLihLFcIixcIiZGc2NyO1wiOlwi4oSxXCIsXCImR0pjeTtcIjpcItCDXCIsXCImR1RcIjpcIj5cIixcIiZHVDtcIjpcIj5cIixcIiZHYW1tYTtcIjpcIs6TXCIsXCImR2FtbWFkO1wiOlwiz5xcIixcIiZHYnJldmU7XCI6XCLEnlwiLFwiJkdjZWRpbDtcIjpcIsSiXCIsXCImR2NpcmM7XCI6XCLEnFwiLFwiJkdjeTtcIjpcItCTXCIsXCImR2RvdDtcIjpcIsSgXCIsXCImR2ZyO1wiOlwi8J2UilwiLFwiJkdnO1wiOlwi4ouZXCIsXCImR29wZjtcIjpcIvCdlL5cIixcIiZHcmVhdGVyRXF1YWw7XCI6XCLiiaVcIixcIiZHcmVhdGVyRXF1YWxMZXNzO1wiOlwi4oubXCIsXCImR3JlYXRlckZ1bGxFcXVhbDtcIjpcIuKJp1wiLFwiJkdyZWF0ZXJHcmVhdGVyO1wiOlwi4qqiXCIsXCImR3JlYXRlckxlc3M7XCI6XCLiibdcIixcIiZHcmVhdGVyU2xhbnRFcXVhbDtcIjpcIuKpvlwiLFwiJkdyZWF0ZXJUaWxkZTtcIjpcIuKJs1wiLFwiJkdzY3I7XCI6XCLwnZKiXCIsXCImR3Q7XCI6XCLiiatcIixcIiZIQVJEY3k7XCI6XCLQqlwiLFwiJkhhY2VrO1wiOlwiy4dcIixcIiZIYXQ7XCI6XCJeXCIsXCImSGNpcmM7XCI6XCLEpFwiLFwiJkhmcjtcIjpcIuKEjFwiLFwiJkhpbGJlcnRTcGFjZTtcIjpcIuKEi1wiLFwiJkhvcGY7XCI6XCLihI1cIixcIiZIb3Jpem9udGFsTGluZTtcIjpcIuKUgFwiLFwiJkhzY3I7XCI6XCLihItcIixcIiZIc3Ryb2s7XCI6XCLEplwiLFwiJkh1bXBEb3duSHVtcDtcIjpcIuKJjlwiLFwiJkh1bXBFcXVhbDtcIjpcIuKJj1wiLFwiJklFY3k7XCI6XCLQlVwiLFwiJklKbGlnO1wiOlwixLJcIixcIiZJT2N5O1wiOlwi0IFcIixcIiZJYWN1dGVcIjpcIsONXCIsXCImSWFjdXRlO1wiOlwiw41cIixcIiZJY2lyY1wiOlwiw45cIixcIiZJY2lyYztcIjpcIsOOXCIsXCImSWN5O1wiOlwi0JhcIixcIiZJZG90O1wiOlwixLBcIixcIiZJZnI7XCI6XCLihJFcIixcIiZJZ3JhdmVcIjpcIsOMXCIsXCImSWdyYXZlO1wiOlwiw4xcIixcIiZJbTtcIjpcIuKEkVwiLFwiJkltYWNyO1wiOlwixKpcIixcIiZJbWFnaW5hcnlJO1wiOlwi4oWIXCIsXCImSW1wbGllcztcIjpcIuKHklwiLFwiJkludDtcIjpcIuKIrFwiLFwiJkludGVncmFsO1wiOlwi4oirXCIsXCImSW50ZXJzZWN0aW9uO1wiOlwi4ouCXCIsXCImSW52aXNpYmxlQ29tbWE7XCI6XCLigaNcIixcIiZJbnZpc2libGVUaW1lcztcIjpcIuKBolwiLFwiJklvZ29uO1wiOlwixK5cIixcIiZJb3BmO1wiOlwi8J2VgFwiLFwiJklvdGE7XCI6XCLOmVwiLFwiJklzY3I7XCI6XCLihJBcIixcIiZJdGlsZGU7XCI6XCLEqFwiLFwiJkl1a2N5O1wiOlwi0IZcIixcIiZJdW1sXCI6XCLDj1wiLFwiJkl1bWw7XCI6XCLDj1wiLFwiJkpjaXJjO1wiOlwixLRcIixcIiZKY3k7XCI6XCLQmVwiLFwiJkpmcjtcIjpcIvCdlI1cIixcIiZKb3BmO1wiOlwi8J2VgVwiLFwiJkpzY3I7XCI6XCLwnZKlXCIsXCImSnNlcmN5O1wiOlwi0IhcIixcIiZKdWtjeTtcIjpcItCEXCIsXCImS0hjeTtcIjpcItClXCIsXCImS0pjeTtcIjpcItCMXCIsXCImS2FwcGE7XCI6XCLOmlwiLFwiJktjZWRpbDtcIjpcIsS2XCIsXCImS2N5O1wiOlwi0JpcIixcIiZLZnI7XCI6XCLwnZSOXCIsXCImS29wZjtcIjpcIvCdlYJcIixcIiZLc2NyO1wiOlwi8J2SplwiLFwiJkxKY3k7XCI6XCLQiVwiLFwiJkxUXCI6XCI8XCIsXCImTFQ7XCI6XCI8XCIsXCImTGFjdXRlO1wiOlwixLlcIixcIiZMYW1iZGE7XCI6XCLOm1wiLFwiJkxhbmc7XCI6XCLin6pcIixcIiZMYXBsYWNldHJmO1wiOlwi4oSSXCIsXCImTGFycjtcIjpcIuKGnlwiLFwiJkxjYXJvbjtcIjpcIsS9XCIsXCImTGNlZGlsO1wiOlwixLtcIixcIiZMY3k7XCI6XCLQm1wiLFwiJkxlZnRBbmdsZUJyYWNrZXQ7XCI6XCLin6hcIixcIiZMZWZ0QXJyb3c7XCI6XCLihpBcIixcIiZMZWZ0QXJyb3dCYXI7XCI6XCLih6RcIixcIiZMZWZ0QXJyb3dSaWdodEFycm93O1wiOlwi4oeGXCIsXCImTGVmdENlaWxpbmc7XCI6XCLijIhcIixcIiZMZWZ0RG91YmxlQnJhY2tldDtcIjpcIuKfplwiLFwiJkxlZnREb3duVGVlVmVjdG9yO1wiOlwi4qWhXCIsXCImTGVmdERvd25WZWN0b3I7XCI6XCLih4NcIixcIiZMZWZ0RG93blZlY3RvckJhcjtcIjpcIuKlmVwiLFwiJkxlZnRGbG9vcjtcIjpcIuKMilwiLFwiJkxlZnRSaWdodEFycm93O1wiOlwi4oaUXCIsXCImTGVmdFJpZ2h0VmVjdG9yO1wiOlwi4qWOXCIsXCImTGVmdFRlZTtcIjpcIuKKo1wiLFwiJkxlZnRUZWVBcnJvdztcIjpcIuKGpFwiLFwiJkxlZnRUZWVWZWN0b3I7XCI6XCLipZpcIixcIiZMZWZ0VHJpYW5nbGU7XCI6XCLiirJcIixcIiZMZWZ0VHJpYW5nbGVCYXI7XCI6XCLip49cIixcIiZMZWZ0VHJpYW5nbGVFcXVhbDtcIjpcIuKKtFwiLFwiJkxlZnRVcERvd25WZWN0b3I7XCI6XCLipZFcIixcIiZMZWZ0VXBUZWVWZWN0b3I7XCI6XCLipaBcIixcIiZMZWZ0VXBWZWN0b3I7XCI6XCLihr9cIixcIiZMZWZ0VXBWZWN0b3JCYXI7XCI6XCLipZhcIixcIiZMZWZ0VmVjdG9yO1wiOlwi4oa8XCIsXCImTGVmdFZlY3RvckJhcjtcIjpcIuKlklwiLFwiJkxlZnRhcnJvdztcIjpcIuKHkFwiLFwiJkxlZnRyaWdodGFycm93O1wiOlwi4oeUXCIsXCImTGVzc0VxdWFsR3JlYXRlcjtcIjpcIuKLmlwiLFwiJkxlc3NGdWxsRXF1YWw7XCI6XCLiiaZcIixcIiZMZXNzR3JlYXRlcjtcIjpcIuKJtlwiLFwiJkxlc3NMZXNzO1wiOlwi4qqhXCIsXCImTGVzc1NsYW50RXF1YWw7XCI6XCLiqb1cIixcIiZMZXNzVGlsZGU7XCI6XCLiibJcIixcIiZMZnI7XCI6XCLwnZSPXCIsXCImTGw7XCI6XCLii5hcIixcIiZMbGVmdGFycm93O1wiOlwi4oeaXCIsXCImTG1pZG90O1wiOlwixL9cIixcIiZMb25nTGVmdEFycm93O1wiOlwi4p+1XCIsXCImTG9uZ0xlZnRSaWdodEFycm93O1wiOlwi4p+3XCIsXCImTG9uZ1JpZ2h0QXJyb3c7XCI6XCLin7ZcIixcIiZMb25nbGVmdGFycm93O1wiOlwi4p+4XCIsXCImTG9uZ2xlZnRyaWdodGFycm93O1wiOlwi4p+6XCIsXCImTG9uZ3JpZ2h0YXJyb3c7XCI6XCLin7lcIixcIiZMb3BmO1wiOlwi8J2Vg1wiLFwiJkxvd2VyTGVmdEFycm93O1wiOlwi4oaZXCIsXCImTG93ZXJSaWdodEFycm93O1wiOlwi4oaYXCIsXCImTHNjcjtcIjpcIuKEklwiLFwiJkxzaDtcIjpcIuKGsFwiLFwiJkxzdHJvaztcIjpcIsWBXCIsXCImTHQ7XCI6XCLiiapcIixcIiZNYXA7XCI6XCLipIVcIixcIiZNY3k7XCI6XCLQnFwiLFwiJk1lZGl1bVNwYWNlO1wiOlwi4oGfXCIsXCImTWVsbGludHJmO1wiOlwi4oSzXCIsXCImTWZyO1wiOlwi8J2UkFwiLFwiJk1pbnVzUGx1cztcIjpcIuKIk1wiLFwiJk1vcGY7XCI6XCLwnZWEXCIsXCImTXNjcjtcIjpcIuKEs1wiLFwiJk11O1wiOlwizpxcIixcIiZOSmN5O1wiOlwi0IpcIixcIiZOYWN1dGU7XCI6XCLFg1wiLFwiJk5jYXJvbjtcIjpcIsWHXCIsXCImTmNlZGlsO1wiOlwixYVcIixcIiZOY3k7XCI6XCLQnVwiLFwiJk5lZ2F0aXZlTWVkaXVtU3BhY2U7XCI6XCLigItcIixcIiZOZWdhdGl2ZVRoaWNrU3BhY2U7XCI6XCLigItcIixcIiZOZWdhdGl2ZVRoaW5TcGFjZTtcIjpcIuKAi1wiLFwiJk5lZ2F0aXZlVmVyeVRoaW5TcGFjZTtcIjpcIuKAi1wiLFwiJk5lc3RlZEdyZWF0ZXJHcmVhdGVyO1wiOlwi4omrXCIsXCImTmVzdGVkTGVzc0xlc3M7XCI6XCLiiapcIixcIiZOZXdMaW5lO1wiOlwiXFxuXCIsXCImTmZyO1wiOlwi8J2UkVwiLFwiJk5vQnJlYWs7XCI6XCLigaBcIixcIiZOb25CcmVha2luZ1NwYWNlO1wiOlwiwqBcIixcIiZOb3BmO1wiOlwi4oSVXCIsXCImTm90O1wiOlwi4qusXCIsXCImTm90Q29uZ3J1ZW50O1wiOlwi4omiXCIsXCImTm90Q3VwQ2FwO1wiOlwi4omtXCIsXCImTm90RG91YmxlVmVydGljYWxCYXI7XCI6XCLiiKZcIixcIiZOb3RFbGVtZW50O1wiOlwi4oiJXCIsXCImTm90RXF1YWw7XCI6XCLiiaBcIixcIiZOb3RFcXVhbFRpbGRlO1wiOlwi4omCzLhcIixcIiZOb3RFeGlzdHM7XCI6XCLiiIRcIixcIiZOb3RHcmVhdGVyO1wiOlwi4omvXCIsXCImTm90R3JlYXRlckVxdWFsO1wiOlwi4omxXCIsXCImTm90R3JlYXRlckZ1bGxFcXVhbDtcIjpcIuKJp8y4XCIsXCImTm90R3JlYXRlckdyZWF0ZXI7XCI6XCLiiavMuFwiLFwiJk5vdEdyZWF0ZXJMZXNzO1wiOlwi4om5XCIsXCImTm90R3JlYXRlclNsYW50RXF1YWw7XCI6XCLiqb7MuFwiLFwiJk5vdEdyZWF0ZXJUaWxkZTtcIjpcIuKJtVwiLFwiJk5vdEh1bXBEb3duSHVtcDtcIjpcIuKJjsy4XCIsXCImTm90SHVtcEVxdWFsO1wiOlwi4omPzLhcIixcIiZOb3RMZWZ0VHJpYW5nbGU7XCI6XCLii6pcIixcIiZOb3RMZWZ0VHJpYW5nbGVCYXI7XCI6XCLip4/MuFwiLFwiJk5vdExlZnRUcmlhbmdsZUVxdWFsO1wiOlwi4ousXCIsXCImTm90TGVzcztcIjpcIuKJrlwiLFwiJk5vdExlc3NFcXVhbDtcIjpcIuKJsFwiLFwiJk5vdExlc3NHcmVhdGVyO1wiOlwi4om4XCIsXCImTm90TGVzc0xlc3M7XCI6XCLiiarMuFwiLFwiJk5vdExlc3NTbGFudEVxdWFsO1wiOlwi4qm9zLhcIixcIiZOb3RMZXNzVGlsZGU7XCI6XCLiibRcIixcIiZOb3ROZXN0ZWRHcmVhdGVyR3JlYXRlcjtcIjpcIuKqosy4XCIsXCImTm90TmVzdGVkTGVzc0xlc3M7XCI6XCLiqqHMuFwiLFwiJk5vdFByZWNlZGVzO1wiOlwi4oqAXCIsXCImTm90UHJlY2VkZXNFcXVhbDtcIjpcIuKqr8y4XCIsXCImTm90UHJlY2VkZXNTbGFudEVxdWFsO1wiOlwi4ougXCIsXCImTm90UmV2ZXJzZUVsZW1lbnQ7XCI6XCLiiIxcIixcIiZOb3RSaWdodFRyaWFuZ2xlO1wiOlwi4ourXCIsXCImTm90UmlnaHRUcmlhbmdsZUJhcjtcIjpcIuKnkMy4XCIsXCImTm90UmlnaHRUcmlhbmdsZUVxdWFsO1wiOlwi4outXCIsXCImTm90U3F1YXJlU3Vic2V0O1wiOlwi4oqPzLhcIixcIiZOb3RTcXVhcmVTdWJzZXRFcXVhbDtcIjpcIuKLolwiLFwiJk5vdFNxdWFyZVN1cGVyc2V0O1wiOlwi4oqQzLhcIixcIiZOb3RTcXVhcmVTdXBlcnNldEVxdWFsO1wiOlwi4oujXCIsXCImTm90U3Vic2V0O1wiOlwi4oqC4oOSXCIsXCImTm90U3Vic2V0RXF1YWw7XCI6XCLiiohcIixcIiZOb3RTdWNjZWVkcztcIjpcIuKKgVwiLFwiJk5vdFN1Y2NlZWRzRXF1YWw7XCI6XCLiqrDMuFwiLFwiJk5vdFN1Y2NlZWRzU2xhbnRFcXVhbDtcIjpcIuKLoVwiLFwiJk5vdFN1Y2NlZWRzVGlsZGU7XCI6XCLiib/MuFwiLFwiJk5vdFN1cGVyc2V0O1wiOlwi4oqD4oOSXCIsXCImTm90U3VwZXJzZXRFcXVhbDtcIjpcIuKKiVwiLFwiJk5vdFRpbGRlO1wiOlwi4omBXCIsXCImTm90VGlsZGVFcXVhbDtcIjpcIuKJhFwiLFwiJk5vdFRpbGRlRnVsbEVxdWFsO1wiOlwi4omHXCIsXCImTm90VGlsZGVUaWxkZTtcIjpcIuKJiVwiLFwiJk5vdFZlcnRpY2FsQmFyO1wiOlwi4oikXCIsXCImTnNjcjtcIjpcIvCdkqlcIixcIiZOdGlsZGVcIjpcIsORXCIsXCImTnRpbGRlO1wiOlwiw5FcIixcIiZOdTtcIjpcIs6dXCIsXCImT0VsaWc7XCI6XCLFklwiLFwiJk9hY3V0ZVwiOlwiw5NcIixcIiZPYWN1dGU7XCI6XCLDk1wiLFwiJk9jaXJjXCI6XCLDlFwiLFwiJk9jaXJjO1wiOlwiw5RcIixcIiZPY3k7XCI6XCLQnlwiLFwiJk9kYmxhYztcIjpcIsWQXCIsXCImT2ZyO1wiOlwi8J2UklwiLFwiJk9ncmF2ZVwiOlwiw5JcIixcIiZPZ3JhdmU7XCI6XCLDklwiLFwiJk9tYWNyO1wiOlwixYxcIixcIiZPbWVnYTtcIjpcIs6pXCIsXCImT21pY3JvbjtcIjpcIs6fXCIsXCImT29wZjtcIjpcIvCdlYZcIixcIiZPcGVuQ3VybHlEb3VibGVRdW90ZTtcIjpcIuKAnFwiLFwiJk9wZW5DdXJseVF1b3RlO1wiOlwi4oCYXCIsXCImT3I7XCI6XCLiqZRcIixcIiZPc2NyO1wiOlwi8J2SqlwiLFwiJk9zbGFzaFwiOlwiw5hcIixcIiZPc2xhc2g7XCI6XCLDmFwiLFwiJk90aWxkZVwiOlwiw5VcIixcIiZPdGlsZGU7XCI6XCLDlVwiLFwiJk90aW1lcztcIjpcIuKot1wiLFwiJk91bWxcIjpcIsOWXCIsXCImT3VtbDtcIjpcIsOWXCIsXCImT3ZlckJhcjtcIjpcIuKAvlwiLFwiJk92ZXJCcmFjZTtcIjpcIuKPnlwiLFwiJk92ZXJCcmFja2V0O1wiOlwi4o60XCIsXCImT3ZlclBhcmVudGhlc2lzO1wiOlwi4o+cXCIsXCImUGFydGlhbEQ7XCI6XCLiiIJcIixcIiZQY3k7XCI6XCLQn1wiLFwiJlBmcjtcIjpcIvCdlJNcIixcIiZQaGk7XCI6XCLOplwiLFwiJlBpO1wiOlwizqBcIixcIiZQbHVzTWludXM7XCI6XCLCsVwiLFwiJlBvaW5jYXJlcGxhbmU7XCI6XCLihIxcIixcIiZQb3BmO1wiOlwi4oSZXCIsXCImUHI7XCI6XCLiqrtcIixcIiZQcmVjZWRlcztcIjpcIuKJulwiLFwiJlByZWNlZGVzRXF1YWw7XCI6XCLiqq9cIixcIiZQcmVjZWRlc1NsYW50RXF1YWw7XCI6XCLiibxcIixcIiZQcmVjZWRlc1RpbGRlO1wiOlwi4om+XCIsXCImUHJpbWU7XCI6XCLigLNcIixcIiZQcm9kdWN0O1wiOlwi4oiPXCIsXCImUHJvcG9ydGlvbjtcIjpcIuKIt1wiLFwiJlByb3BvcnRpb25hbDtcIjpcIuKInVwiLFwiJlBzY3I7XCI6XCLwnZKrXCIsXCImUHNpO1wiOlwizqhcIixcIiZRVU9UXCI6J1wiJyxcIiZRVU9UO1wiOidcIicsXCImUWZyO1wiOlwi8J2UlFwiLFwiJlFvcGY7XCI6XCLihJpcIixcIiZRc2NyO1wiOlwi8J2SrFwiLFwiJlJCYXJyO1wiOlwi4qSQXCIsXCImUkVHXCI6XCLCrlwiLFwiJlJFRztcIjpcIsKuXCIsXCImUmFjdXRlO1wiOlwixZRcIixcIiZSYW5nO1wiOlwi4p+rXCIsXCImUmFycjtcIjpcIuKGoFwiLFwiJlJhcnJ0bDtcIjpcIuKkllwiLFwiJlJjYXJvbjtcIjpcIsWYXCIsXCImUmNlZGlsO1wiOlwixZZcIixcIiZSY3k7XCI6XCLQoFwiLFwiJlJlO1wiOlwi4oScXCIsXCImUmV2ZXJzZUVsZW1lbnQ7XCI6XCLiiItcIixcIiZSZXZlcnNlRXF1aWxpYnJpdW07XCI6XCLih4tcIixcIiZSZXZlcnNlVXBFcXVpbGlicml1bTtcIjpcIuKlr1wiLFwiJlJmcjtcIjpcIuKEnFwiLFwiJlJobztcIjpcIs6hXCIsXCImUmlnaHRBbmdsZUJyYWNrZXQ7XCI6XCLin6lcIixcIiZSaWdodEFycm93O1wiOlwi4oaSXCIsXCImUmlnaHRBcnJvd0JhcjtcIjpcIuKHpVwiLFwiJlJpZ2h0QXJyb3dMZWZ0QXJyb3c7XCI6XCLih4RcIixcIiZSaWdodENlaWxpbmc7XCI6XCLijIlcIixcIiZSaWdodERvdWJsZUJyYWNrZXQ7XCI6XCLin6dcIixcIiZSaWdodERvd25UZWVWZWN0b3I7XCI6XCLipZ1cIixcIiZSaWdodERvd25WZWN0b3I7XCI6XCLih4JcIixcIiZSaWdodERvd25WZWN0b3JCYXI7XCI6XCLipZVcIixcIiZSaWdodEZsb29yO1wiOlwi4oyLXCIsXCImUmlnaHRUZWU7XCI6XCLiiqJcIixcIiZSaWdodFRlZUFycm93O1wiOlwi4oamXCIsXCImUmlnaHRUZWVWZWN0b3I7XCI6XCLipZtcIixcIiZSaWdodFRyaWFuZ2xlO1wiOlwi4oqzXCIsXCImUmlnaHRUcmlhbmdsZUJhcjtcIjpcIuKnkFwiLFwiJlJpZ2h0VHJpYW5nbGVFcXVhbDtcIjpcIuKKtVwiLFwiJlJpZ2h0VXBEb3duVmVjdG9yO1wiOlwi4qWPXCIsXCImUmlnaHRVcFRlZVZlY3RvcjtcIjpcIuKlnFwiLFwiJlJpZ2h0VXBWZWN0b3I7XCI6XCLihr5cIixcIiZSaWdodFVwVmVjdG9yQmFyO1wiOlwi4qWUXCIsXCImUmlnaHRWZWN0b3I7XCI6XCLih4BcIixcIiZSaWdodFZlY3RvckJhcjtcIjpcIuKlk1wiLFwiJlJpZ2h0YXJyb3c7XCI6XCLih5JcIixcIiZSb3BmO1wiOlwi4oSdXCIsXCImUm91bmRJbXBsaWVzO1wiOlwi4qWwXCIsXCImUnJpZ2h0YXJyb3c7XCI6XCLih5tcIixcIiZSc2NyO1wiOlwi4oSbXCIsXCImUnNoO1wiOlwi4oaxXCIsXCImUnVsZURlbGF5ZWQ7XCI6XCLip7RcIixcIiZTSENIY3k7XCI6XCLQqVwiLFwiJlNIY3k7XCI6XCLQqFwiLFwiJlNPRlRjeTtcIjpcItCsXCIsXCImU2FjdXRlO1wiOlwixZpcIixcIiZTYztcIjpcIuKqvFwiLFwiJlNjYXJvbjtcIjpcIsWgXCIsXCImU2NlZGlsO1wiOlwixZ5cIixcIiZTY2lyYztcIjpcIsWcXCIsXCImU2N5O1wiOlwi0KFcIixcIiZTZnI7XCI6XCLwnZSWXCIsXCImU2hvcnREb3duQXJyb3c7XCI6XCLihpNcIixcIiZTaG9ydExlZnRBcnJvdztcIjpcIuKGkFwiLFwiJlNob3J0UmlnaHRBcnJvdztcIjpcIuKGklwiLFwiJlNob3J0VXBBcnJvdztcIjpcIuKGkVwiLFwiJlNpZ21hO1wiOlwizqNcIixcIiZTbWFsbENpcmNsZTtcIjpcIuKImFwiLFwiJlNvcGY7XCI6XCLwnZWKXCIsXCImU3FydDtcIjpcIuKImlwiLFwiJlNxdWFyZTtcIjpcIuKWoVwiLFwiJlNxdWFyZUludGVyc2VjdGlvbjtcIjpcIuKKk1wiLFwiJlNxdWFyZVN1YnNldDtcIjpcIuKKj1wiLFwiJlNxdWFyZVN1YnNldEVxdWFsO1wiOlwi4oqRXCIsXCImU3F1YXJlU3VwZXJzZXQ7XCI6XCLiipBcIixcIiZTcXVhcmVTdXBlcnNldEVxdWFsO1wiOlwi4oqSXCIsXCImU3F1YXJlVW5pb247XCI6XCLiipRcIixcIiZTc2NyO1wiOlwi8J2SrlwiLFwiJlN0YXI7XCI6XCLii4ZcIixcIiZTdWI7XCI6XCLii5BcIixcIiZTdWJzZXQ7XCI6XCLii5BcIixcIiZTdWJzZXRFcXVhbDtcIjpcIuKKhlwiLFwiJlN1Y2NlZWRzO1wiOlwi4om7XCIsXCImU3VjY2VlZHNFcXVhbDtcIjpcIuKqsFwiLFwiJlN1Y2NlZWRzU2xhbnRFcXVhbDtcIjpcIuKJvVwiLFwiJlN1Y2NlZWRzVGlsZGU7XCI6XCLiib9cIixcIiZTdWNoVGhhdDtcIjpcIuKIi1wiLFwiJlN1bTtcIjpcIuKIkVwiLFwiJlN1cDtcIjpcIuKLkVwiLFwiJlN1cGVyc2V0O1wiOlwi4oqDXCIsXCImU3VwZXJzZXRFcXVhbDtcIjpcIuKKh1wiLFwiJlN1cHNldDtcIjpcIuKLkVwiLFwiJlRIT1JOXCI6XCLDnlwiLFwiJlRIT1JOO1wiOlwiw55cIixcIiZUUkFERTtcIjpcIuKEolwiLFwiJlRTSGN5O1wiOlwi0ItcIixcIiZUU2N5O1wiOlwi0KZcIixcIiZUYWI7XCI6XCJcXHRcIixcIiZUYXU7XCI6XCLOpFwiLFwiJlRjYXJvbjtcIjpcIsWkXCIsXCImVGNlZGlsO1wiOlwixaJcIixcIiZUY3k7XCI6XCLQolwiLFwiJlRmcjtcIjpcIvCdlJdcIixcIiZUaGVyZWZvcmU7XCI6XCLiiLRcIixcIiZUaGV0YTtcIjpcIs6YXCIsXCImVGhpY2tTcGFjZTtcIjpcIuKBn+KAilwiLFwiJlRoaW5TcGFjZTtcIjpcIuKAiVwiLFwiJlRpbGRlO1wiOlwi4oi8XCIsXCImVGlsZGVFcXVhbDtcIjpcIuKJg1wiLFwiJlRpbGRlRnVsbEVxdWFsO1wiOlwi4omFXCIsXCImVGlsZGVUaWxkZTtcIjpcIuKJiFwiLFwiJlRvcGY7XCI6XCLwnZWLXCIsXCImVHJpcGxlRG90O1wiOlwi4oObXCIsXCImVHNjcjtcIjpcIvCdkq9cIixcIiZUc3Ryb2s7XCI6XCLFplwiLFwiJlVhY3V0ZVwiOlwiw5pcIixcIiZVYWN1dGU7XCI6XCLDmlwiLFwiJlVhcnI7XCI6XCLihp9cIixcIiZVYXJyb2NpcjtcIjpcIuKliVwiLFwiJlVicmN5O1wiOlwi0I5cIixcIiZVYnJldmU7XCI6XCLFrFwiLFwiJlVjaXJjXCI6XCLDm1wiLFwiJlVjaXJjO1wiOlwiw5tcIixcIiZVY3k7XCI6XCLQo1wiLFwiJlVkYmxhYztcIjpcIsWwXCIsXCImVWZyO1wiOlwi8J2UmFwiLFwiJlVncmF2ZVwiOlwiw5lcIixcIiZVZ3JhdmU7XCI6XCLDmVwiLFwiJlVtYWNyO1wiOlwixapcIixcIiZVbmRlckJhcjtcIjpcIl9cIixcIiZVbmRlckJyYWNlO1wiOlwi4o+fXCIsXCImVW5kZXJCcmFja2V0O1wiOlwi4o61XCIsXCImVW5kZXJQYXJlbnRoZXNpcztcIjpcIuKPnVwiLFwiJlVuaW9uO1wiOlwi4ouDXCIsXCImVW5pb25QbHVzO1wiOlwi4oqOXCIsXCImVW9nb247XCI6XCLFslwiLFwiJlVvcGY7XCI6XCLwnZWMXCIsXCImVXBBcnJvdztcIjpcIuKGkVwiLFwiJlVwQXJyb3dCYXI7XCI6XCLipJJcIixcIiZVcEFycm93RG93bkFycm93O1wiOlwi4oeFXCIsXCImVXBEb3duQXJyb3c7XCI6XCLihpVcIixcIiZVcEVxdWlsaWJyaXVtO1wiOlwi4qWuXCIsXCImVXBUZWU7XCI6XCLiiqVcIixcIiZVcFRlZUFycm93O1wiOlwi4oalXCIsXCImVXBhcnJvdztcIjpcIuKHkVwiLFwiJlVwZG93bmFycm93O1wiOlwi4oeVXCIsXCImVXBwZXJMZWZ0QXJyb3c7XCI6XCLihpZcIixcIiZVcHBlclJpZ2h0QXJyb3c7XCI6XCLihpdcIixcIiZVcHNpO1wiOlwiz5JcIixcIiZVcHNpbG9uO1wiOlwizqVcIixcIiZVcmluZztcIjpcIsWuXCIsXCImVXNjcjtcIjpcIvCdkrBcIixcIiZVdGlsZGU7XCI6XCLFqFwiLFwiJlV1bWxcIjpcIsOcXCIsXCImVXVtbDtcIjpcIsOcXCIsXCImVkRhc2g7XCI6XCLiiqtcIixcIiZWYmFyO1wiOlwi4qurXCIsXCImVmN5O1wiOlwi0JJcIixcIiZWZGFzaDtcIjpcIuKKqVwiLFwiJlZkYXNobDtcIjpcIuKrplwiLFwiJlZlZTtcIjpcIuKLgVwiLFwiJlZlcmJhcjtcIjpcIuKAllwiLFwiJlZlcnQ7XCI6XCLigJZcIixcIiZWZXJ0aWNhbEJhcjtcIjpcIuKIo1wiLFwiJlZlcnRpY2FsTGluZTtcIjpcInxcIixcIiZWZXJ0aWNhbFNlcGFyYXRvcjtcIjpcIuKdmFwiLFwiJlZlcnRpY2FsVGlsZGU7XCI6XCLiiYBcIixcIiZWZXJ5VGhpblNwYWNlO1wiOlwi4oCKXCIsXCImVmZyO1wiOlwi8J2UmVwiLFwiJlZvcGY7XCI6XCLwnZWNXCIsXCImVnNjcjtcIjpcIvCdkrFcIixcIiZWdmRhc2g7XCI6XCLiiqpcIixcIiZXY2lyYztcIjpcIsW0XCIsXCImV2VkZ2U7XCI6XCLii4BcIixcIiZXZnI7XCI6XCLwnZSaXCIsXCImV29wZjtcIjpcIvCdlY5cIixcIiZXc2NyO1wiOlwi8J2SslwiLFwiJlhmcjtcIjpcIvCdlJtcIixcIiZYaTtcIjpcIs6eXCIsXCImWG9wZjtcIjpcIvCdlY9cIixcIiZYc2NyO1wiOlwi8J2Ss1wiLFwiJllBY3k7XCI6XCLQr1wiLFwiJllJY3k7XCI6XCLQh1wiLFwiJllVY3k7XCI6XCLQrlwiLFwiJllhY3V0ZVwiOlwiw51cIixcIiZZYWN1dGU7XCI6XCLDnVwiLFwiJlljaXJjO1wiOlwixbZcIixcIiZZY3k7XCI6XCLQq1wiLFwiJllmcjtcIjpcIvCdlJxcIixcIiZZb3BmO1wiOlwi8J2VkFwiLFwiJllzY3I7XCI6XCLwnZK0XCIsXCImWXVtbDtcIjpcIsW4XCIsXCImWkhjeTtcIjpcItCWXCIsXCImWmFjdXRlO1wiOlwixblcIixcIiZaY2Fyb247XCI6XCLFvVwiLFwiJlpjeTtcIjpcItCXXCIsXCImWmRvdDtcIjpcIsW7XCIsXCImWmVyb1dpZHRoU3BhY2U7XCI6XCLigItcIixcIiZaZXRhO1wiOlwizpZcIixcIiZaZnI7XCI6XCLihKhcIixcIiZab3BmO1wiOlwi4oSkXCIsXCImWnNjcjtcIjpcIvCdkrVcIixcIiZhYWN1dGVcIjpcIsOhXCIsXCImYWFjdXRlO1wiOlwiw6FcIixcIiZhYnJldmU7XCI6XCLEg1wiLFwiJmFjO1wiOlwi4oi+XCIsXCImYWNFO1wiOlwi4oi+zLNcIixcIiZhY2Q7XCI6XCLiiL9cIixcIiZhY2lyY1wiOlwiw6JcIixcIiZhY2lyYztcIjpcIsOiXCIsXCImYWN1dGVcIjpcIsK0XCIsXCImYWN1dGU7XCI6XCLCtFwiLFwiJmFjeTtcIjpcItCwXCIsXCImYWVsaWdcIjpcIsOmXCIsXCImYWVsaWc7XCI6XCLDplwiLFwiJmFmO1wiOlwi4oGhXCIsXCImYWZyO1wiOlwi8J2UnlwiLFwiJmFncmF2ZVwiOlwiw6BcIixcIiZhZ3JhdmU7XCI6XCLDoFwiLFwiJmFsZWZzeW07XCI6XCLihLVcIixcIiZhbGVwaDtcIjpcIuKEtVwiLFwiJmFscGhhO1wiOlwizrFcIixcIiZhbWFjcjtcIjpcIsSBXCIsXCImYW1hbGc7XCI6XCLiqL9cIixcIiZhbXBcIjpcIiZcIixcIiZhbXA7XCI6XCImXCIsXCImYW5kO1wiOlwi4oinXCIsXCImYW5kYW5kO1wiOlwi4qmVXCIsXCImYW5kZDtcIjpcIuKpnFwiLFwiJmFuZHNsb3BlO1wiOlwi4qmYXCIsXCImYW5kdjtcIjpcIuKpmlwiLFwiJmFuZztcIjpcIuKIoFwiLFwiJmFuZ2U7XCI6XCLipqRcIixcIiZhbmdsZTtcIjpcIuKIoFwiLFwiJmFuZ21zZDtcIjpcIuKIoVwiLFwiJmFuZ21zZGFhO1wiOlwi4qaoXCIsXCImYW5nbXNkYWI7XCI6XCLipqlcIixcIiZhbmdtc2RhYztcIjpcIuKmqlwiLFwiJmFuZ21zZGFkO1wiOlwi4qarXCIsXCImYW5nbXNkYWU7XCI6XCLipqxcIixcIiZhbmdtc2RhZjtcIjpcIuKmrVwiLFwiJmFuZ21zZGFnO1wiOlwi4qauXCIsXCImYW5nbXNkYWg7XCI6XCLipq9cIixcIiZhbmdydDtcIjpcIuKIn1wiLFwiJmFuZ3J0dmI7XCI6XCLiir5cIixcIiZhbmdydHZiZDtcIjpcIuKmnVwiLFwiJmFuZ3NwaDtcIjpcIuKIolwiLFwiJmFuZ3N0O1wiOlwiw4VcIixcIiZhbmd6YXJyO1wiOlwi4o28XCIsXCImYW9nb247XCI6XCLEhVwiLFwiJmFvcGY7XCI6XCLwnZWSXCIsXCImYXA7XCI6XCLiiYhcIixcIiZhcEU7XCI6XCLiqbBcIixcIiZhcGFjaXI7XCI6XCLiqa9cIixcIiZhcGU7XCI6XCLiiYpcIixcIiZhcGlkO1wiOlwi4omLXCIsXCImYXBvcztcIjpcIidcIixcIiZhcHByb3g7XCI6XCLiiYhcIixcIiZhcHByb3hlcTtcIjpcIuKJilwiLFwiJmFyaW5nXCI6XCLDpVwiLFwiJmFyaW5nO1wiOlwiw6VcIixcIiZhc2NyO1wiOlwi8J2StlwiLFwiJmFzdDtcIjpcIipcIixcIiZhc3ltcDtcIjpcIuKJiFwiLFwiJmFzeW1wZXE7XCI6XCLiiY1cIixcIiZhdGlsZGVcIjpcIsOjXCIsXCImYXRpbGRlO1wiOlwiw6NcIixcIiZhdW1sXCI6XCLDpFwiLFwiJmF1bWw7XCI6XCLDpFwiLFwiJmF3Y29uaW50O1wiOlwi4oizXCIsXCImYXdpbnQ7XCI6XCLiqJFcIixcIiZiTm90O1wiOlwi4qutXCIsXCImYmFja2Nvbmc7XCI6XCLiiYxcIixcIiZiYWNrZXBzaWxvbjtcIjpcIs+2XCIsXCImYmFja3ByaW1lO1wiOlwi4oC1XCIsXCImYmFja3NpbTtcIjpcIuKIvVwiLFwiJmJhY2tzaW1lcTtcIjpcIuKLjVwiLFwiJmJhcnZlZTtcIjpcIuKKvVwiLFwiJmJhcndlZDtcIjpcIuKMhVwiLFwiJmJhcndlZGdlO1wiOlwi4oyFXCIsXCImYmJyaztcIjpcIuKOtVwiLFwiJmJicmt0YnJrO1wiOlwi4o62XCIsXCImYmNvbmc7XCI6XCLiiYxcIixcIiZiY3k7XCI6XCLQsVwiLFwiJmJkcXVvO1wiOlwi4oCeXCIsXCImYmVjYXVzO1wiOlwi4oi1XCIsXCImYmVjYXVzZTtcIjpcIuKItVwiLFwiJmJlbXB0eXY7XCI6XCLiprBcIixcIiZiZXBzaTtcIjpcIs+2XCIsXCImYmVybm91O1wiOlwi4oSsXCIsXCImYmV0YTtcIjpcIs6yXCIsXCImYmV0aDtcIjpcIuKEtlwiLFwiJmJldHdlZW47XCI6XCLiiaxcIixcIiZiZnI7XCI6XCLwnZSfXCIsXCImYmlnY2FwO1wiOlwi4ouCXCIsXCImYmlnY2lyYztcIjpcIuKXr1wiLFwiJmJpZ2N1cDtcIjpcIuKLg1wiLFwiJmJpZ29kb3Q7XCI6XCLiqIBcIixcIiZiaWdvcGx1cztcIjpcIuKogVwiLFwiJmJpZ290aW1lcztcIjpcIuKoglwiLFwiJmJpZ3NxY3VwO1wiOlwi4qiGXCIsXCImYmlnc3RhcjtcIjpcIuKYhVwiLFwiJmJpZ3RyaWFuZ2xlZG93bjtcIjpcIuKWvVwiLFwiJmJpZ3RyaWFuZ2xldXA7XCI6XCLilrNcIixcIiZiaWd1cGx1cztcIjpcIuKohFwiLFwiJmJpZ3ZlZTtcIjpcIuKLgVwiLFwiJmJpZ3dlZGdlO1wiOlwi4ouAXCIsXCImYmthcm93O1wiOlwi4qSNXCIsXCImYmxhY2tsb3plbmdlO1wiOlwi4qerXCIsXCImYmxhY2tzcXVhcmU7XCI6XCLilqpcIixcIiZibGFja3RyaWFuZ2xlO1wiOlwi4pa0XCIsXCImYmxhY2t0cmlhbmdsZWRvd247XCI6XCLilr5cIixcIiZibGFja3RyaWFuZ2xlbGVmdDtcIjpcIuKXglwiLFwiJmJsYWNrdHJpYW5nbGVyaWdodDtcIjpcIuKWuFwiLFwiJmJsYW5rO1wiOlwi4pCjXCIsXCImYmxrMTI7XCI6XCLilpJcIixcIiZibGsxNDtcIjpcIuKWkVwiLFwiJmJsazM0O1wiOlwi4paTXCIsXCImYmxvY2s7XCI6XCLilohcIixcIiZibmU7XCI6XCI94oOlXCIsXCImYm5lcXVpdjtcIjpcIuKJoeKDpVwiLFwiJmJub3Q7XCI6XCLijJBcIixcIiZib3BmO1wiOlwi8J2Vk1wiLFwiJmJvdDtcIjpcIuKKpVwiLFwiJmJvdHRvbTtcIjpcIuKKpVwiLFwiJmJvd3RpZTtcIjpcIuKLiFwiLFwiJmJveERMO1wiOlwi4pWXXCIsXCImYm94RFI7XCI6XCLilZRcIixcIiZib3hEbDtcIjpcIuKVllwiLFwiJmJveERyO1wiOlwi4pWTXCIsXCImYm94SDtcIjpcIuKVkFwiLFwiJmJveEhEO1wiOlwi4pWmXCIsXCImYm94SFU7XCI6XCLilalcIixcIiZib3hIZDtcIjpcIuKVpFwiLFwiJmJveEh1O1wiOlwi4pWnXCIsXCImYm94VUw7XCI6XCLilZ1cIixcIiZib3hVUjtcIjpcIuKVmlwiLFwiJmJveFVsO1wiOlwi4pWcXCIsXCImYm94VXI7XCI6XCLilZlcIixcIiZib3hWO1wiOlwi4pWRXCIsXCImYm94Vkg7XCI6XCLilaxcIixcIiZib3hWTDtcIjpcIuKVo1wiLFwiJmJveFZSO1wiOlwi4pWgXCIsXCImYm94Vmg7XCI6XCLilatcIixcIiZib3hWbDtcIjpcIuKVolwiLFwiJmJveFZyO1wiOlwi4pWfXCIsXCImYm94Ym94O1wiOlwi4qeJXCIsXCImYm94ZEw7XCI6XCLilZVcIixcIiZib3hkUjtcIjpcIuKVklwiLFwiJmJveGRsO1wiOlwi4pSQXCIsXCImYm94ZHI7XCI6XCLilIxcIixcIiZib3hoO1wiOlwi4pSAXCIsXCImYm94aEQ7XCI6XCLilaVcIixcIiZib3hoVTtcIjpcIuKVqFwiLFwiJmJveGhkO1wiOlwi4pSsXCIsXCImYm94aHU7XCI6XCLilLRcIixcIiZib3htaW51cztcIjpcIuKKn1wiLFwiJmJveHBsdXM7XCI6XCLiip5cIixcIiZib3h0aW1lcztcIjpcIuKKoFwiLFwiJmJveHVMO1wiOlwi4pWbXCIsXCImYm94dVI7XCI6XCLilZhcIixcIiZib3h1bDtcIjpcIuKUmFwiLFwiJmJveHVyO1wiOlwi4pSUXCIsXCImYm94djtcIjpcIuKUglwiLFwiJmJveHZIO1wiOlwi4pWqXCIsXCImYm94dkw7XCI6XCLilaFcIixcIiZib3h2UjtcIjpcIuKVnlwiLFwiJmJveHZoO1wiOlwi4pS8XCIsXCImYm94dmw7XCI6XCLilKRcIixcIiZib3h2cjtcIjpcIuKUnFwiLFwiJmJwcmltZTtcIjpcIuKAtVwiLFwiJmJyZXZlO1wiOlwiy5hcIixcIiZicnZiYXJcIjpcIsKmXCIsXCImYnJ2YmFyO1wiOlwiwqZcIixcIiZic2NyO1wiOlwi8J2St1wiLFwiJmJzZW1pO1wiOlwi4oGPXCIsXCImYnNpbTtcIjpcIuKIvVwiLFwiJmJzaW1lO1wiOlwi4ouNXCIsXCImYnNvbDtcIjpcIlxcXFxcIixcIiZic29sYjtcIjpcIuKnhVwiLFwiJmJzb2xoc3ViO1wiOlwi4p+IXCIsXCImYnVsbDtcIjpcIuKAolwiLFwiJmJ1bGxldDtcIjpcIuKAolwiLFwiJmJ1bXA7XCI6XCLiiY5cIixcIiZidW1wRTtcIjpcIuKqrlwiLFwiJmJ1bXBlO1wiOlwi4omPXCIsXCImYnVtcGVxO1wiOlwi4omPXCIsXCImY2FjdXRlO1wiOlwixIdcIixcIiZjYXA7XCI6XCLiiKlcIixcIiZjYXBhbmQ7XCI6XCLiqYRcIixcIiZjYXBicmN1cDtcIjpcIuKpiVwiLFwiJmNhcGNhcDtcIjpcIuKpi1wiLFwiJmNhcGN1cDtcIjpcIuKph1wiLFwiJmNhcGRvdDtcIjpcIuKpgFwiLFwiJmNhcHM7XCI6XCLiiKnvuIBcIixcIiZjYXJldDtcIjpcIuKBgVwiLFwiJmNhcm9uO1wiOlwiy4dcIixcIiZjY2FwcztcIjpcIuKpjVwiLFwiJmNjYXJvbjtcIjpcIsSNXCIsXCImY2NlZGlsXCI6XCLDp1wiLFwiJmNjZWRpbDtcIjpcIsOnXCIsXCImY2NpcmM7XCI6XCLEiVwiLFwiJmNjdXBzO1wiOlwi4qmMXCIsXCImY2N1cHNzbTtcIjpcIuKpkFwiLFwiJmNkb3Q7XCI6XCLEi1wiLFwiJmNlZGlsXCI6XCLCuFwiLFwiJmNlZGlsO1wiOlwiwrhcIixcIiZjZW1wdHl2O1wiOlwi4qayXCIsXCImY2VudFwiOlwiwqJcIixcIiZjZW50O1wiOlwiwqJcIixcIiZjZW50ZXJkb3Q7XCI6XCLCt1wiLFwiJmNmcjtcIjpcIvCdlKBcIixcIiZjaGN5O1wiOlwi0YdcIixcIiZjaGVjaztcIjpcIuKck1wiLFwiJmNoZWNrbWFyaztcIjpcIuKck1wiLFwiJmNoaTtcIjpcIs+HXCIsXCImY2lyO1wiOlwi4peLXCIsXCImY2lyRTtcIjpcIuKng1wiLFwiJmNpcmM7XCI6XCLLhlwiLFwiJmNpcmNlcTtcIjpcIuKJl1wiLFwiJmNpcmNsZWFycm93bGVmdDtcIjpcIuKGulwiLFwiJmNpcmNsZWFycm93cmlnaHQ7XCI6XCLihrtcIixcIiZjaXJjbGVkUjtcIjpcIsKuXCIsXCImY2lyY2xlZFM7XCI6XCLik4hcIixcIiZjaXJjbGVkYXN0O1wiOlwi4oqbXCIsXCImY2lyY2xlZGNpcmM7XCI6XCLiippcIixcIiZjaXJjbGVkZGFzaDtcIjpcIuKKnVwiLFwiJmNpcmU7XCI6XCLiiZdcIixcIiZjaXJmbmludDtcIjpcIuKokFwiLFwiJmNpcm1pZDtcIjpcIuKrr1wiLFwiJmNpcnNjaXI7XCI6XCLip4JcIixcIiZjbHVicztcIjpcIuKZo1wiLFwiJmNsdWJzdWl0O1wiOlwi4pmjXCIsXCImY29sb247XCI6XCI6XCIsXCImY29sb25lO1wiOlwi4omUXCIsXCImY29sb25lcTtcIjpcIuKJlFwiLFwiJmNvbW1hO1wiOlwiLFwiLFwiJmNvbW1hdDtcIjpcIkBcIixcIiZjb21wO1wiOlwi4oiBXCIsXCImY29tcGZuO1wiOlwi4oiYXCIsXCImY29tcGxlbWVudDtcIjpcIuKIgVwiLFwiJmNvbXBsZXhlcztcIjpcIuKEglwiLFwiJmNvbmc7XCI6XCLiiYVcIixcIiZjb25nZG90O1wiOlwi4qmtXCIsXCImY29uaW50O1wiOlwi4oiuXCIsXCImY29wZjtcIjpcIvCdlZRcIixcIiZjb3Byb2Q7XCI6XCLiiJBcIixcIiZjb3B5XCI6XCLCqVwiLFwiJmNvcHk7XCI6XCLCqVwiLFwiJmNvcHlzcjtcIjpcIuKEl1wiLFwiJmNyYXJyO1wiOlwi4oa1XCIsXCImY3Jvc3M7XCI6XCLinJdcIixcIiZjc2NyO1wiOlwi8J2SuFwiLFwiJmNzdWI7XCI6XCLiq49cIixcIiZjc3ViZTtcIjpcIuKrkVwiLFwiJmNzdXA7XCI6XCLiq5BcIixcIiZjc3VwZTtcIjpcIuKrklwiLFwiJmN0ZG90O1wiOlwi4ouvXCIsXCImY3VkYXJybDtcIjpcIuKkuFwiLFwiJmN1ZGFycnI7XCI6XCLipLVcIixcIiZjdWVwcjtcIjpcIuKLnlwiLFwiJmN1ZXNjO1wiOlwi4oufXCIsXCImY3VsYXJyO1wiOlwi4oa2XCIsXCImY3VsYXJycDtcIjpcIuKkvVwiLFwiJmN1cDtcIjpcIuKIqlwiLFwiJmN1cGJyY2FwO1wiOlwi4qmIXCIsXCImY3VwY2FwO1wiOlwi4qmGXCIsXCImY3VwY3VwO1wiOlwi4qmKXCIsXCImY3VwZG90O1wiOlwi4oqNXCIsXCImY3Vwb3I7XCI6XCLiqYVcIixcIiZjdXBzO1wiOlwi4oiq77iAXCIsXCImY3VyYXJyO1wiOlwi4oa3XCIsXCImY3VyYXJybTtcIjpcIuKkvFwiLFwiJmN1cmx5ZXFwcmVjO1wiOlwi4oueXCIsXCImY3VybHllcXN1Y2M7XCI6XCLii59cIixcIiZjdXJseXZlZTtcIjpcIuKLjlwiLFwiJmN1cmx5d2VkZ2U7XCI6XCLii49cIixcIiZjdXJyZW5cIjpcIsKkXCIsXCImY3VycmVuO1wiOlwiwqRcIixcIiZjdXJ2ZWFycm93bGVmdDtcIjpcIuKGtlwiLFwiJmN1cnZlYXJyb3dyaWdodDtcIjpcIuKGt1wiLFwiJmN1dmVlO1wiOlwi4ouOXCIsXCImY3V3ZWQ7XCI6XCLii49cIixcIiZjd2NvbmludDtcIjpcIuKIslwiLFwiJmN3aW50O1wiOlwi4oixXCIsXCImY3lsY3R5O1wiOlwi4oytXCIsXCImZEFycjtcIjpcIuKHk1wiLFwiJmRIYXI7XCI6XCLipaVcIixcIiZkYWdnZXI7XCI6XCLigKBcIixcIiZkYWxldGg7XCI6XCLihLhcIixcIiZkYXJyO1wiOlwi4oaTXCIsXCImZGFzaDtcIjpcIuKAkFwiLFwiJmRhc2h2O1wiOlwi4oqjXCIsXCImZGJrYXJvdztcIjpcIuKkj1wiLFwiJmRibGFjO1wiOlwiy51cIixcIiZkY2Fyb247XCI6XCLEj1wiLFwiJmRjeTtcIjpcItC0XCIsXCImZGQ7XCI6XCLihYZcIixcIiZkZGFnZ2VyO1wiOlwi4oChXCIsXCImZGRhcnI7XCI6XCLih4pcIixcIiZkZG90c2VxO1wiOlwi4qm3XCIsXCImZGVnXCI6XCLCsFwiLFwiJmRlZztcIjpcIsKwXCIsXCImZGVsdGE7XCI6XCLOtFwiLFwiJmRlbXB0eXY7XCI6XCLiprFcIixcIiZkZmlzaHQ7XCI6XCLipb9cIixcIiZkZnI7XCI6XCLwnZShXCIsXCImZGhhcmw7XCI6XCLih4NcIixcIiZkaGFycjtcIjpcIuKHglwiLFwiJmRpYW07XCI6XCLii4RcIixcIiZkaWFtb25kO1wiOlwi4ouEXCIsXCImZGlhbW9uZHN1aXQ7XCI6XCLimaZcIixcIiZkaWFtcztcIjpcIuKZplwiLFwiJmRpZTtcIjpcIsKoXCIsXCImZGlnYW1tYTtcIjpcIs+dXCIsXCImZGlzaW47XCI6XCLii7JcIixcIiZkaXY7XCI6XCLDt1wiLFwiJmRpdmlkZVwiOlwiw7dcIixcIiZkaXZpZGU7XCI6XCLDt1wiLFwiJmRpdmlkZW9udGltZXM7XCI6XCLii4dcIixcIiZkaXZvbng7XCI6XCLii4dcIixcIiZkamN5O1wiOlwi0ZJcIixcIiZkbGNvcm47XCI6XCLijJ5cIixcIiZkbGNyb3A7XCI6XCLijI1cIixcIiZkb2xsYXI7XCI6XCIkXCIsXCImZG9wZjtcIjpcIvCdlZVcIixcIiZkb3Q7XCI6XCLLmVwiLFwiJmRvdGVxO1wiOlwi4omQXCIsXCImZG90ZXFkb3Q7XCI6XCLiiZFcIixcIiZkb3RtaW51cztcIjpcIuKIuFwiLFwiJmRvdHBsdXM7XCI6XCLiiJRcIixcIiZkb3RzcXVhcmU7XCI6XCLiiqFcIixcIiZkb3VibGViYXJ3ZWRnZTtcIjpcIuKMhlwiLFwiJmRvd25hcnJvdztcIjpcIuKGk1wiLFwiJmRvd25kb3duYXJyb3dzO1wiOlwi4oeKXCIsXCImZG93bmhhcnBvb25sZWZ0O1wiOlwi4oeDXCIsXCImZG93bmhhcnBvb25yaWdodDtcIjpcIuKHglwiLFwiJmRyYmthcm93O1wiOlwi4qSQXCIsXCImZHJjb3JuO1wiOlwi4oyfXCIsXCImZHJjcm9wO1wiOlwi4oyMXCIsXCImZHNjcjtcIjpcIvCdkrlcIixcIiZkc2N5O1wiOlwi0ZVcIixcIiZkc29sO1wiOlwi4qe2XCIsXCImZHN0cm9rO1wiOlwixJFcIixcIiZkdGRvdDtcIjpcIuKLsVwiLFwiJmR0cmk7XCI6XCLilr9cIixcIiZkdHJpZjtcIjpcIuKWvlwiLFwiJmR1YXJyO1wiOlwi4oe1XCIsXCImZHVoYXI7XCI6XCLipa9cIixcIiZkd2FuZ2xlO1wiOlwi4qamXCIsXCImZHpjeTtcIjpcItGfXCIsXCImZHppZ3JhcnI7XCI6XCLin79cIixcIiZlRERvdDtcIjpcIuKpt1wiLFwiJmVEb3Q7XCI6XCLiiZFcIixcIiZlYWN1dGVcIjpcIsOpXCIsXCImZWFjdXRlO1wiOlwiw6lcIixcIiZlYXN0ZXI7XCI6XCLiqa5cIixcIiZlY2Fyb247XCI6XCLEm1wiLFwiJmVjaXI7XCI6XCLiiZZcIixcIiZlY2lyY1wiOlwiw6pcIixcIiZlY2lyYztcIjpcIsOqXCIsXCImZWNvbG9uO1wiOlwi4omVXCIsXCImZWN5O1wiOlwi0Y1cIixcIiZlZG90O1wiOlwixJdcIixcIiZlZTtcIjpcIuKFh1wiLFwiJmVmRG90O1wiOlwi4omSXCIsXCImZWZyO1wiOlwi8J2UolwiLFwiJmVnO1wiOlwi4qqaXCIsXCImZWdyYXZlXCI6XCLDqFwiLFwiJmVncmF2ZTtcIjpcIsOoXCIsXCImZWdzO1wiOlwi4qqWXCIsXCImZWdzZG90O1wiOlwi4qqYXCIsXCImZWw7XCI6XCLiqplcIixcIiZlbGludGVycztcIjpcIuKPp1wiLFwiJmVsbDtcIjpcIuKEk1wiLFwiJmVscztcIjpcIuKqlVwiLFwiJmVsc2RvdDtcIjpcIuKql1wiLFwiJmVtYWNyO1wiOlwixJNcIixcIiZlbXB0eTtcIjpcIuKIhVwiLFwiJmVtcHR5c2V0O1wiOlwi4oiFXCIsXCImZW1wdHl2O1wiOlwi4oiFXCIsXCImZW1zcDEzO1wiOlwi4oCEXCIsXCImZW1zcDE0O1wiOlwi4oCFXCIsXCImZW1zcDtcIjpcIuKAg1wiLFwiJmVuZztcIjpcIsWLXCIsXCImZW5zcDtcIjpcIuKAglwiLFwiJmVvZ29uO1wiOlwixJlcIixcIiZlb3BmO1wiOlwi8J2VllwiLFwiJmVwYXI7XCI6XCLii5VcIixcIiZlcGFyc2w7XCI6XCLip6NcIixcIiZlcGx1cztcIjpcIuKpsVwiLFwiJmVwc2k7XCI6XCLOtVwiLFwiJmVwc2lsb247XCI6XCLOtVwiLFwiJmVwc2l2O1wiOlwiz7VcIixcIiZlcWNpcmM7XCI6XCLiiZZcIixcIiZlcWNvbG9uO1wiOlwi4omVXCIsXCImZXFzaW07XCI6XCLiiYJcIixcIiZlcXNsYW50Z3RyO1wiOlwi4qqWXCIsXCImZXFzbGFudGxlc3M7XCI6XCLiqpVcIixcIiZlcXVhbHM7XCI6XCI9XCIsXCImZXF1ZXN0O1wiOlwi4omfXCIsXCImZXF1aXY7XCI6XCLiiaFcIixcIiZlcXVpdkREO1wiOlwi4qm4XCIsXCImZXF2cGFyc2w7XCI6XCLip6VcIixcIiZlckRvdDtcIjpcIuKJk1wiLFwiJmVyYXJyO1wiOlwi4qWxXCIsXCImZXNjcjtcIjpcIuKEr1wiLFwiJmVzZG90O1wiOlwi4omQXCIsXCImZXNpbTtcIjpcIuKJglwiLFwiJmV0YTtcIjpcIs63XCIsXCImZXRoXCI6XCLDsFwiLFwiJmV0aDtcIjpcIsOwXCIsXCImZXVtbFwiOlwiw6tcIixcIiZldW1sO1wiOlwiw6tcIixcIiZldXJvO1wiOlwi4oKsXCIsXCImZXhjbDtcIjpcIiFcIixcIiZleGlzdDtcIjpcIuKIg1wiLFwiJmV4cGVjdGF0aW9uO1wiOlwi4oSwXCIsXCImZXhwb25lbnRpYWxlO1wiOlwi4oWHXCIsXCImZmFsbGluZ2RvdHNlcTtcIjpcIuKJklwiLFwiJmZjeTtcIjpcItGEXCIsXCImZmVtYWxlO1wiOlwi4pmAXCIsXCImZmZpbGlnO1wiOlwi76yDXCIsXCImZmZsaWc7XCI6XCLvrIBcIixcIiZmZmxsaWc7XCI6XCLvrIRcIixcIiZmZnI7XCI6XCLwnZSjXCIsXCImZmlsaWc7XCI6XCLvrIFcIixcIiZmamxpZztcIjpcImZqXCIsXCImZmxhdDtcIjpcIuKZrVwiLFwiJmZsbGlnO1wiOlwi76yCXCIsXCImZmx0bnM7XCI6XCLilrFcIixcIiZmbm9mO1wiOlwixpJcIixcIiZmb3BmO1wiOlwi8J2Vl1wiLFwiJmZvcmFsbDtcIjpcIuKIgFwiLFwiJmZvcms7XCI6XCLii5RcIixcIiZmb3JrdjtcIjpcIuKrmVwiLFwiJmZwYXJ0aW50O1wiOlwi4qiNXCIsXCImZnJhYzEyXCI6XCLCvVwiLFwiJmZyYWMxMjtcIjpcIsK9XCIsXCImZnJhYzEzO1wiOlwi4oWTXCIsXCImZnJhYzE0XCI6XCLCvFwiLFwiJmZyYWMxNDtcIjpcIsK8XCIsXCImZnJhYzE1O1wiOlwi4oWVXCIsXCImZnJhYzE2O1wiOlwi4oWZXCIsXCImZnJhYzE4O1wiOlwi4oWbXCIsXCImZnJhYzIzO1wiOlwi4oWUXCIsXCImZnJhYzI1O1wiOlwi4oWWXCIsXCImZnJhYzM0XCI6XCLCvlwiLFwiJmZyYWMzNDtcIjpcIsK+XCIsXCImZnJhYzM1O1wiOlwi4oWXXCIsXCImZnJhYzM4O1wiOlwi4oWcXCIsXCImZnJhYzQ1O1wiOlwi4oWYXCIsXCImZnJhYzU2O1wiOlwi4oWaXCIsXCImZnJhYzU4O1wiOlwi4oWdXCIsXCImZnJhYzc4O1wiOlwi4oWeXCIsXCImZnJhc2w7XCI6XCLigYRcIixcIiZmcm93bjtcIjpcIuKMolwiLFwiJmZzY3I7XCI6XCLwnZK7XCIsXCImZ0U7XCI6XCLiiadcIixcIiZnRWw7XCI6XCLiqoxcIixcIiZnYWN1dGU7XCI6XCLHtVwiLFwiJmdhbW1hO1wiOlwizrNcIixcIiZnYW1tYWQ7XCI6XCLPnVwiLFwiJmdhcDtcIjpcIuKqhlwiLFwiJmdicmV2ZTtcIjpcIsSfXCIsXCImZ2NpcmM7XCI6XCLEnVwiLFwiJmdjeTtcIjpcItCzXCIsXCImZ2RvdDtcIjpcIsShXCIsXCImZ2U7XCI6XCLiiaVcIixcIiZnZWw7XCI6XCLii5tcIixcIiZnZXE7XCI6XCLiiaVcIixcIiZnZXFxO1wiOlwi4omnXCIsXCImZ2Vxc2xhbnQ7XCI6XCLiqb5cIixcIiZnZXM7XCI6XCLiqb5cIixcIiZnZXNjYztcIjpcIuKqqVwiLFwiJmdlc2RvdDtcIjpcIuKqgFwiLFwiJmdlc2RvdG87XCI6XCLiqoJcIixcIiZnZXNkb3RvbDtcIjpcIuKqhFwiLFwiJmdlc2w7XCI6XCLii5vvuIBcIixcIiZnZXNsZXM7XCI6XCLiqpRcIixcIiZnZnI7XCI6XCLwnZSkXCIsXCImZ2c7XCI6XCLiiatcIixcIiZnZ2c7XCI6XCLii5lcIixcIiZnaW1lbDtcIjpcIuKEt1wiLFwiJmdqY3k7XCI6XCLRk1wiLFwiJmdsO1wiOlwi4om3XCIsXCImZ2xFO1wiOlwi4qqSXCIsXCImZ2xhO1wiOlwi4qqlXCIsXCImZ2xqO1wiOlwi4qqkXCIsXCImZ25FO1wiOlwi4ompXCIsXCImZ25hcDtcIjpcIuKqilwiLFwiJmduYXBwcm94O1wiOlwi4qqKXCIsXCImZ25lO1wiOlwi4qqIXCIsXCImZ25lcTtcIjpcIuKqiFwiLFwiJmduZXFxO1wiOlwi4ompXCIsXCImZ25zaW07XCI6XCLii6dcIixcIiZnb3BmO1wiOlwi8J2VmFwiLFwiJmdyYXZlO1wiOlwiYFwiLFwiJmdzY3I7XCI6XCLihIpcIixcIiZnc2ltO1wiOlwi4omzXCIsXCImZ3NpbWU7XCI6XCLiqo5cIixcIiZnc2ltbDtcIjpcIuKqkFwiLFwiJmd0XCI6XCI+XCIsXCImZ3Q7XCI6XCI+XCIsXCImZ3RjYztcIjpcIuKqp1wiLFwiJmd0Y2lyO1wiOlwi4qm6XCIsXCImZ3Rkb3Q7XCI6XCLii5dcIixcIiZndGxQYXI7XCI6XCLippVcIixcIiZndHF1ZXN0O1wiOlwi4qm8XCIsXCImZ3RyYXBwcm94O1wiOlwi4qqGXCIsXCImZ3RyYXJyO1wiOlwi4qW4XCIsXCImZ3RyZG90O1wiOlwi4ouXXCIsXCImZ3RyZXFsZXNzO1wiOlwi4oubXCIsXCImZ3RyZXFxbGVzcztcIjpcIuKqjFwiLFwiJmd0cmxlc3M7XCI6XCLiibdcIixcIiZndHJzaW07XCI6XCLiibNcIixcIiZndmVydG5lcXE7XCI6XCLiianvuIBcIixcIiZndm5FO1wiOlwi4omp77iAXCIsXCImaEFycjtcIjpcIuKHlFwiLFwiJmhhaXJzcDtcIjpcIuKAilwiLFwiJmhhbGY7XCI6XCLCvVwiLFwiJmhhbWlsdDtcIjpcIuKEi1wiLFwiJmhhcmRjeTtcIjpcItGKXCIsXCImaGFycjtcIjpcIuKGlFwiLFwiJmhhcnJjaXI7XCI6XCLipYhcIixcIiZoYXJydztcIjpcIuKGrVwiLFwiJmhiYXI7XCI6XCLihI9cIixcIiZoY2lyYztcIjpcIsSlXCIsXCImaGVhcnRzO1wiOlwi4pmlXCIsXCImaGVhcnRzdWl0O1wiOlwi4pmlXCIsXCImaGVsbGlwO1wiOlwi4oCmXCIsXCImaGVyY29uO1wiOlwi4oq5XCIsXCImaGZyO1wiOlwi8J2UpVwiLFwiJmhrc2Vhcm93O1wiOlwi4qSlXCIsXCImaGtzd2Fyb3c7XCI6XCLipKZcIixcIiZob2FycjtcIjpcIuKHv1wiLFwiJmhvbXRodDtcIjpcIuKIu1wiLFwiJmhvb2tsZWZ0YXJyb3c7XCI6XCLihqlcIixcIiZob29rcmlnaHRhcnJvdztcIjpcIuKGqlwiLFwiJmhvcGY7XCI6XCLwnZWZXCIsXCImaG9yYmFyO1wiOlwi4oCVXCIsXCImaHNjcjtcIjpcIvCdkr1cIixcIiZoc2xhc2g7XCI6XCLihI9cIixcIiZoc3Ryb2s7XCI6XCLEp1wiLFwiJmh5YnVsbDtcIjpcIuKBg1wiLFwiJmh5cGhlbjtcIjpcIuKAkFwiLFwiJmlhY3V0ZVwiOlwiw61cIixcIiZpYWN1dGU7XCI6XCLDrVwiLFwiJmljO1wiOlwi4oGjXCIsXCImaWNpcmNcIjpcIsOuXCIsXCImaWNpcmM7XCI6XCLDrlwiLFwiJmljeTtcIjpcItC4XCIsXCImaWVjeTtcIjpcItC1XCIsXCImaWV4Y2xcIjpcIsKhXCIsXCImaWV4Y2w7XCI6XCLCoVwiLFwiJmlmZjtcIjpcIuKHlFwiLFwiJmlmcjtcIjpcIvCdlKZcIixcIiZpZ3JhdmVcIjpcIsOsXCIsXCImaWdyYXZlO1wiOlwiw6xcIixcIiZpaTtcIjpcIuKFiFwiLFwiJmlpaWludDtcIjpcIuKojFwiLFwiJmlpaW50O1wiOlwi4oitXCIsXCImaWluZmluO1wiOlwi4qecXCIsXCImaWlvdGE7XCI6XCLihKlcIixcIiZpamxpZztcIjpcIsSzXCIsXCImaW1hY3I7XCI6XCLEq1wiLFwiJmltYWdlO1wiOlwi4oSRXCIsXCImaW1hZ2xpbmU7XCI6XCLihJBcIixcIiZpbWFncGFydDtcIjpcIuKEkVwiLFwiJmltYXRoO1wiOlwixLFcIixcIiZpbW9mO1wiOlwi4oq3XCIsXCImaW1wZWQ7XCI6XCLGtVwiLFwiJmluO1wiOlwi4oiIXCIsXCImaW5jYXJlO1wiOlwi4oSFXCIsXCImaW5maW47XCI6XCLiiJ5cIixcIiZpbmZpbnRpZTtcIjpcIuKnnVwiLFwiJmlub2RvdDtcIjpcIsSxXCIsXCImaW50O1wiOlwi4oirXCIsXCImaW50Y2FsO1wiOlwi4oq6XCIsXCImaW50ZWdlcnM7XCI6XCLihKRcIixcIiZpbnRlcmNhbDtcIjpcIuKKulwiLFwiJmludGxhcmhrO1wiOlwi4qiXXCIsXCImaW50cHJvZDtcIjpcIuKovFwiLFwiJmlvY3k7XCI6XCLRkVwiLFwiJmlvZ29uO1wiOlwixK9cIixcIiZpb3BmO1wiOlwi8J2VmlwiLFwiJmlvdGE7XCI6XCLOuVwiLFwiJmlwcm9kO1wiOlwi4qi8XCIsXCImaXF1ZXN0XCI6XCLCv1wiLFwiJmlxdWVzdDtcIjpcIsK/XCIsXCImaXNjcjtcIjpcIvCdkr5cIixcIiZpc2luO1wiOlwi4oiIXCIsXCImaXNpbkU7XCI6XCLii7lcIixcIiZpc2luZG90O1wiOlwi4ou1XCIsXCImaXNpbnM7XCI6XCLii7RcIixcIiZpc2luc3Y7XCI6XCLii7NcIixcIiZpc2ludjtcIjpcIuKIiFwiLFwiJml0O1wiOlwi4oGiXCIsXCImaXRpbGRlO1wiOlwixKlcIixcIiZpdWtjeTtcIjpcItGWXCIsXCImaXVtbFwiOlwiw69cIixcIiZpdW1sO1wiOlwiw69cIixcIiZqY2lyYztcIjpcIsS1XCIsXCImamN5O1wiOlwi0LlcIixcIiZqZnI7XCI6XCLwnZSnXCIsXCImam1hdGg7XCI6XCLIt1wiLFwiJmpvcGY7XCI6XCLwnZWbXCIsXCImanNjcjtcIjpcIvCdkr9cIixcIiZqc2VyY3k7XCI6XCLRmFwiLFwiJmp1a2N5O1wiOlwi0ZRcIixcIiZrYXBwYTtcIjpcIs66XCIsXCIma2FwcGF2O1wiOlwiz7BcIixcIiZrY2VkaWw7XCI6XCLEt1wiLFwiJmtjeTtcIjpcItC6XCIsXCIma2ZyO1wiOlwi8J2UqFwiLFwiJmtncmVlbjtcIjpcIsS4XCIsXCIma2hjeTtcIjpcItGFXCIsXCIma2pjeTtcIjpcItGcXCIsXCIma29wZjtcIjpcIvCdlZxcIixcIiZrc2NyO1wiOlwi8J2TgFwiLFwiJmxBYXJyO1wiOlwi4oeaXCIsXCImbEFycjtcIjpcIuKHkFwiLFwiJmxBdGFpbDtcIjpcIuKkm1wiLFwiJmxCYXJyO1wiOlwi4qSOXCIsXCImbEU7XCI6XCLiiaZcIixcIiZsRWc7XCI6XCLiqotcIixcIiZsSGFyO1wiOlwi4qWiXCIsXCImbGFjdXRlO1wiOlwixLpcIixcIiZsYWVtcHR5djtcIjpcIuKmtFwiLFwiJmxhZ3JhbjtcIjpcIuKEklwiLFwiJmxhbWJkYTtcIjpcIs67XCIsXCImbGFuZztcIjpcIuKfqFwiLFwiJmxhbmdkO1wiOlwi4qaRXCIsXCImbGFuZ2xlO1wiOlwi4p+oXCIsXCImbGFwO1wiOlwi4qqFXCIsXCImbGFxdW9cIjpcIsKrXCIsXCImbGFxdW87XCI6XCLCq1wiLFwiJmxhcnI7XCI6XCLihpBcIixcIiZsYXJyYjtcIjpcIuKHpFwiLFwiJmxhcnJiZnM7XCI6XCLipJ9cIixcIiZsYXJyZnM7XCI6XCLipJ1cIixcIiZsYXJyaGs7XCI6XCLihqlcIixcIiZsYXJybHA7XCI6XCLihqtcIixcIiZsYXJycGw7XCI6XCLipLlcIixcIiZsYXJyc2ltO1wiOlwi4qWzXCIsXCImbGFycnRsO1wiOlwi4oaiXCIsXCImbGF0O1wiOlwi4qqrXCIsXCImbGF0YWlsO1wiOlwi4qSZXCIsXCImbGF0ZTtcIjpcIuKqrVwiLFwiJmxhdGVzO1wiOlwi4qqt77iAXCIsXCImbGJhcnI7XCI6XCLipIxcIixcIiZsYmJyaztcIjpcIuKdslwiLFwiJmxicmFjZTtcIjpcIntcIixcIiZsYnJhY2s7XCI6XCJbXCIsXCImbGJya2U7XCI6XCLipotcIixcIiZsYnJrc2xkO1wiOlwi4qaPXCIsXCImbGJya3NsdTtcIjpcIuKmjVwiLFwiJmxjYXJvbjtcIjpcIsS+XCIsXCImbGNlZGlsO1wiOlwixLxcIixcIiZsY2VpbDtcIjpcIuKMiFwiLFwiJmxjdWI7XCI6XCJ7XCIsXCImbGN5O1wiOlwi0LtcIixcIiZsZGNhO1wiOlwi4qS2XCIsXCImbGRxdW87XCI6XCLigJxcIixcIiZsZHF1b3I7XCI6XCLigJ5cIixcIiZsZHJkaGFyO1wiOlwi4qWnXCIsXCImbGRydXNoYXI7XCI6XCLipYtcIixcIiZsZHNoO1wiOlwi4oayXCIsXCImbGU7XCI6XCLiiaRcIixcIiZsZWZ0YXJyb3c7XCI6XCLihpBcIixcIiZsZWZ0YXJyb3d0YWlsO1wiOlwi4oaiXCIsXCImbGVmdGhhcnBvb25kb3duO1wiOlwi4oa9XCIsXCImbGVmdGhhcnBvb251cDtcIjpcIuKGvFwiLFwiJmxlZnRsZWZ0YXJyb3dzO1wiOlwi4oeHXCIsXCImbGVmdHJpZ2h0YXJyb3c7XCI6XCLihpRcIixcIiZsZWZ0cmlnaHRhcnJvd3M7XCI6XCLih4ZcIixcIiZsZWZ0cmlnaHRoYXJwb29ucztcIjpcIuKHi1wiLFwiJmxlZnRyaWdodHNxdWlnYXJyb3c7XCI6XCLihq1cIixcIiZsZWZ0dGhyZWV0aW1lcztcIjpcIuKLi1wiLFwiJmxlZztcIjpcIuKLmlwiLFwiJmxlcTtcIjpcIuKJpFwiLFwiJmxlcXE7XCI6XCLiiaZcIixcIiZsZXFzbGFudDtcIjpcIuKpvVwiLFwiJmxlcztcIjpcIuKpvVwiLFwiJmxlc2NjO1wiOlwi4qqoXCIsXCImbGVzZG90O1wiOlwi4qm/XCIsXCImbGVzZG90bztcIjpcIuKqgVwiLFwiJmxlc2RvdG9yO1wiOlwi4qqDXCIsXCImbGVzZztcIjpcIuKLmu+4gFwiLFwiJmxlc2dlcztcIjpcIuKqk1wiLFwiJmxlc3NhcHByb3g7XCI6XCLiqoVcIixcIiZsZXNzZG90O1wiOlwi4ouWXCIsXCImbGVzc2VxZ3RyO1wiOlwi4ouaXCIsXCImbGVzc2VxcWd0cjtcIjpcIuKqi1wiLFwiJmxlc3NndHI7XCI6XCLiibZcIixcIiZsZXNzc2ltO1wiOlwi4omyXCIsXCImbGZpc2h0O1wiOlwi4qW8XCIsXCImbGZsb29yO1wiOlwi4oyKXCIsXCImbGZyO1wiOlwi8J2UqVwiLFwiJmxnO1wiOlwi4om2XCIsXCImbGdFO1wiOlwi4qqRXCIsXCImbGhhcmQ7XCI6XCLihr1cIixcIiZsaGFydTtcIjpcIuKGvFwiLFwiJmxoYXJ1bDtcIjpcIuKlqlwiLFwiJmxoYmxrO1wiOlwi4paEXCIsXCImbGpjeTtcIjpcItGZXCIsXCImbGw7XCI6XCLiiapcIixcIiZsbGFycjtcIjpcIuKHh1wiLFwiJmxsY29ybmVyO1wiOlwi4oyeXCIsXCImbGxoYXJkO1wiOlwi4qWrXCIsXCImbGx0cmk7XCI6XCLil7pcIixcIiZsbWlkb3Q7XCI6XCLFgFwiLFwiJmxtb3VzdDtcIjpcIuKOsFwiLFwiJmxtb3VzdGFjaGU7XCI6XCLijrBcIixcIiZsbkU7XCI6XCLiiahcIixcIiZsbmFwO1wiOlwi4qqJXCIsXCImbG5hcHByb3g7XCI6XCLiqolcIixcIiZsbmU7XCI6XCLiqodcIixcIiZsbmVxO1wiOlwi4qqHXCIsXCImbG5lcXE7XCI6XCLiiahcIixcIiZsbnNpbTtcIjpcIuKLplwiLFwiJmxvYW5nO1wiOlwi4p+sXCIsXCImbG9hcnI7XCI6XCLih71cIixcIiZsb2JyaztcIjpcIuKfplwiLFwiJmxvbmdsZWZ0YXJyb3c7XCI6XCLin7VcIixcIiZsb25nbGVmdHJpZ2h0YXJyb3c7XCI6XCLin7dcIixcIiZsb25nbWFwc3RvO1wiOlwi4p+8XCIsXCImbG9uZ3JpZ2h0YXJyb3c7XCI6XCLin7ZcIixcIiZsb29wYXJyb3dsZWZ0O1wiOlwi4oarXCIsXCImbG9vcGFycm93cmlnaHQ7XCI6XCLihqxcIixcIiZsb3BhcjtcIjpcIuKmhVwiLFwiJmxvcGY7XCI6XCLwnZWdXCIsXCImbG9wbHVzO1wiOlwi4qitXCIsXCImbG90aW1lcztcIjpcIuKotFwiLFwiJmxvd2FzdDtcIjpcIuKIl1wiLFwiJmxvd2JhcjtcIjpcIl9cIixcIiZsb3o7XCI6XCLil4pcIixcIiZsb3plbmdlO1wiOlwi4peKXCIsXCImbG96ZjtcIjpcIuKnq1wiLFwiJmxwYXI7XCI6XCIoXCIsXCImbHBhcmx0O1wiOlwi4qaTXCIsXCImbHJhcnI7XCI6XCLih4ZcIixcIiZscmNvcm5lcjtcIjpcIuKMn1wiLFwiJmxyaGFyO1wiOlwi4oeLXCIsXCImbHJoYXJkO1wiOlwi4qWtXCIsXCImbHJtO1wiOlwi4oCOXCIsXCImbHJ0cmk7XCI6XCLiir9cIixcIiZsc2FxdW87XCI6XCLigLlcIixcIiZsc2NyO1wiOlwi8J2TgVwiLFwiJmxzaDtcIjpcIuKGsFwiLFwiJmxzaW07XCI6XCLiibJcIixcIiZsc2ltZTtcIjpcIuKqjVwiLFwiJmxzaW1nO1wiOlwi4qqPXCIsXCImbHNxYjtcIjpcIltcIixcIiZsc3F1bztcIjpcIuKAmFwiLFwiJmxzcXVvcjtcIjpcIuKAmlwiLFwiJmxzdHJvaztcIjpcIsWCXCIsXCImbHRcIjpcIjxcIixcIiZsdDtcIjpcIjxcIixcIiZsdGNjO1wiOlwi4qqmXCIsXCImbHRjaXI7XCI6XCLiqblcIixcIiZsdGRvdDtcIjpcIuKLllwiLFwiJmx0aHJlZTtcIjpcIuKLi1wiLFwiJmx0aW1lcztcIjpcIuKLiVwiLFwiJmx0bGFycjtcIjpcIuKltlwiLFwiJmx0cXVlc3Q7XCI6XCLiqbtcIixcIiZsdHJQYXI7XCI6XCLippZcIixcIiZsdHJpO1wiOlwi4peDXCIsXCImbHRyaWU7XCI6XCLiirRcIixcIiZsdHJpZjtcIjpcIuKXglwiLFwiJmx1cmRzaGFyO1wiOlwi4qWKXCIsXCImbHVydWhhcjtcIjpcIuKlplwiLFwiJmx2ZXJ0bmVxcTtcIjpcIuKJqO+4gFwiLFwiJmx2bkU7XCI6XCLiiajvuIBcIixcIiZtRERvdDtcIjpcIuKIulwiLFwiJm1hY3JcIjpcIsKvXCIsXCImbWFjcjtcIjpcIsKvXCIsXCImbWFsZTtcIjpcIuKZglwiLFwiJm1hbHQ7XCI6XCLinKBcIixcIiZtYWx0ZXNlO1wiOlwi4pygXCIsXCImbWFwO1wiOlwi4oamXCIsXCImbWFwc3RvO1wiOlwi4oamXCIsXCImbWFwc3RvZG93bjtcIjpcIuKGp1wiLFwiJm1hcHN0b2xlZnQ7XCI6XCLihqRcIixcIiZtYXBzdG91cDtcIjpcIuKGpVwiLFwiJm1hcmtlcjtcIjpcIuKWrlwiLFwiJm1jb21tYTtcIjpcIuKoqVwiLFwiJm1jeTtcIjpcItC8XCIsXCImbWRhc2g7XCI6XCLigJRcIixcIiZtZWFzdXJlZGFuZ2xlO1wiOlwi4oihXCIsXCImbWZyO1wiOlwi8J2UqlwiLFwiJm1obztcIjpcIuKEp1wiLFwiJm1pY3JvXCI6XCLCtVwiLFwiJm1pY3JvO1wiOlwiwrVcIixcIiZtaWQ7XCI6XCLiiKNcIixcIiZtaWRhc3Q7XCI6XCIqXCIsXCImbWlkY2lyO1wiOlwi4quwXCIsXCImbWlkZG90XCI6XCLCt1wiLFwiJm1pZGRvdDtcIjpcIsK3XCIsXCImbWludXM7XCI6XCLiiJJcIixcIiZtaW51c2I7XCI6XCLiip9cIixcIiZtaW51c2Q7XCI6XCLiiLhcIixcIiZtaW51c2R1O1wiOlwi4qiqXCIsXCImbWxjcDtcIjpcIuKrm1wiLFwiJm1sZHI7XCI6XCLigKZcIixcIiZtbnBsdXM7XCI6XCLiiJNcIixcIiZtb2RlbHM7XCI6XCLiiqdcIixcIiZtb3BmO1wiOlwi8J2VnlwiLFwiJm1wO1wiOlwi4oiTXCIsXCImbXNjcjtcIjpcIvCdk4JcIixcIiZtc3Rwb3M7XCI6XCLiiL5cIixcIiZtdTtcIjpcIs68XCIsXCImbXVsdGltYXA7XCI6XCLiirhcIixcIiZtdW1hcDtcIjpcIuKKuFwiLFwiJm5HZztcIjpcIuKLmcy4XCIsXCImbkd0O1wiOlwi4omr4oOSXCIsXCImbkd0djtcIjpcIuKJq8y4XCIsXCImbkxlZnRhcnJvdztcIjpcIuKHjVwiLFwiJm5MZWZ0cmlnaHRhcnJvdztcIjpcIuKHjlwiLFwiJm5MbDtcIjpcIuKLmMy4XCIsXCImbkx0O1wiOlwi4omq4oOSXCIsXCImbkx0djtcIjpcIuKJqsy4XCIsXCImblJpZ2h0YXJyb3c7XCI6XCLih49cIixcIiZuVkRhc2g7XCI6XCLiiq9cIixcIiZuVmRhc2g7XCI6XCLiiq5cIixcIiZuYWJsYTtcIjpcIuKIh1wiLFwiJm5hY3V0ZTtcIjpcIsWEXCIsXCImbmFuZztcIjpcIuKIoOKDklwiLFwiJm5hcDtcIjpcIuKJiVwiLFwiJm5hcEU7XCI6XCLiqbDMuFwiLFwiJm5hcGlkO1wiOlwi4omLzLhcIixcIiZuYXBvcztcIjpcIsWJXCIsXCImbmFwcHJveDtcIjpcIuKJiVwiLFwiJm5hdHVyO1wiOlwi4pmuXCIsXCImbmF0dXJhbDtcIjpcIuKZrlwiLFwiJm5hdHVyYWxzO1wiOlwi4oSVXCIsXCImbmJzcFwiOlwiwqBcIixcIiZuYnNwO1wiOlwiwqBcIixcIiZuYnVtcDtcIjpcIuKJjsy4XCIsXCImbmJ1bXBlO1wiOlwi4omPzLhcIixcIiZuY2FwO1wiOlwi4qmDXCIsXCImbmNhcm9uO1wiOlwixYhcIixcIiZuY2VkaWw7XCI6XCLFhlwiLFwiJm5jb25nO1wiOlwi4omHXCIsXCImbmNvbmdkb3Q7XCI6XCLiqa3MuFwiLFwiJm5jdXA7XCI6XCLiqYJcIixcIiZuY3k7XCI6XCLQvVwiLFwiJm5kYXNoO1wiOlwi4oCTXCIsXCImbmU7XCI6XCLiiaBcIixcIiZuZUFycjtcIjpcIuKHl1wiLFwiJm5lYXJoaztcIjpcIuKkpFwiLFwiJm5lYXJyO1wiOlwi4oaXXCIsXCImbmVhcnJvdztcIjpcIuKGl1wiLFwiJm5lZG90O1wiOlwi4omQzLhcIixcIiZuZXF1aXY7XCI6XCLiiaJcIixcIiZuZXNlYXI7XCI6XCLipKhcIixcIiZuZXNpbTtcIjpcIuKJgsy4XCIsXCImbmV4aXN0O1wiOlwi4oiEXCIsXCImbmV4aXN0cztcIjpcIuKIhFwiLFwiJm5mcjtcIjpcIvCdlKtcIixcIiZuZ0U7XCI6XCLiiafMuFwiLFwiJm5nZTtcIjpcIuKJsVwiLFwiJm5nZXE7XCI6XCLiibFcIixcIiZuZ2VxcTtcIjpcIuKJp8y4XCIsXCImbmdlcXNsYW50O1wiOlwi4qm+zLhcIixcIiZuZ2VzO1wiOlwi4qm+zLhcIixcIiZuZ3NpbTtcIjpcIuKJtVwiLFwiJm5ndDtcIjpcIuKJr1wiLFwiJm5ndHI7XCI6XCLiia9cIixcIiZuaEFycjtcIjpcIuKHjlwiLFwiJm5oYXJyO1wiOlwi4oauXCIsXCImbmhwYXI7XCI6XCLiq7JcIixcIiZuaTtcIjpcIuKIi1wiLFwiJm5pcztcIjpcIuKLvFwiLFwiJm5pc2Q7XCI6XCLii7pcIixcIiZuaXY7XCI6XCLiiItcIixcIiZuamN5O1wiOlwi0ZpcIixcIiZubEFycjtcIjpcIuKHjVwiLFwiJm5sRTtcIjpcIuKJpsy4XCIsXCImbmxhcnI7XCI6XCLihppcIixcIiZubGRyO1wiOlwi4oClXCIsXCImbmxlO1wiOlwi4omwXCIsXCImbmxlZnRhcnJvdztcIjpcIuKGmlwiLFwiJm5sZWZ0cmlnaHRhcnJvdztcIjpcIuKGrlwiLFwiJm5sZXE7XCI6XCLiibBcIixcIiZubGVxcTtcIjpcIuKJpsy4XCIsXCImbmxlcXNsYW50O1wiOlwi4qm9zLhcIixcIiZubGVzO1wiOlwi4qm9zLhcIixcIiZubGVzcztcIjpcIuKJrlwiLFwiJm5sc2ltO1wiOlwi4om0XCIsXCImbmx0O1wiOlwi4omuXCIsXCImbmx0cmk7XCI6XCLii6pcIixcIiZubHRyaWU7XCI6XCLii6xcIixcIiZubWlkO1wiOlwi4oikXCIsXCImbm9wZjtcIjpcIvCdlZ9cIixcIiZub3RcIjpcIsKsXCIsXCImbm90O1wiOlwiwqxcIixcIiZub3RpbjtcIjpcIuKIiVwiLFwiJm5vdGluRTtcIjpcIuKLucy4XCIsXCImbm90aW5kb3Q7XCI6XCLii7XMuFwiLFwiJm5vdGludmE7XCI6XCLiiIlcIixcIiZub3RpbnZiO1wiOlwi4ou3XCIsXCImbm90aW52YztcIjpcIuKLtlwiLFwiJm5vdG5pO1wiOlwi4oiMXCIsXCImbm90bml2YTtcIjpcIuKIjFwiLFwiJm5vdG5pdmI7XCI6XCLii75cIixcIiZub3RuaXZjO1wiOlwi4ou9XCIsXCImbnBhcjtcIjpcIuKIplwiLFwiJm5wYXJhbGxlbDtcIjpcIuKIplwiLFwiJm5wYXJzbDtcIjpcIuKrveKDpVwiLFwiJm5wYXJ0O1wiOlwi4oiCzLhcIixcIiZucG9saW50O1wiOlwi4qiUXCIsXCImbnByO1wiOlwi4oqAXCIsXCImbnByY3VlO1wiOlwi4ougXCIsXCImbnByZTtcIjpcIuKqr8y4XCIsXCImbnByZWM7XCI6XCLiioBcIixcIiZucHJlY2VxO1wiOlwi4qqvzLhcIixcIiZuckFycjtcIjpcIuKHj1wiLFwiJm5yYXJyO1wiOlwi4oabXCIsXCImbnJhcnJjO1wiOlwi4qSzzLhcIixcIiZucmFycnc7XCI6XCLihp3MuFwiLFwiJm5yaWdodGFycm93O1wiOlwi4oabXCIsXCImbnJ0cmk7XCI6XCLii6tcIixcIiZucnRyaWU7XCI6XCLii61cIixcIiZuc2M7XCI6XCLiioFcIixcIiZuc2NjdWU7XCI6XCLii6FcIixcIiZuc2NlO1wiOlwi4qqwzLhcIixcIiZuc2NyO1wiOlwi8J2Tg1wiLFwiJm5zaG9ydG1pZDtcIjpcIuKIpFwiLFwiJm5zaG9ydHBhcmFsbGVsO1wiOlwi4oimXCIsXCImbnNpbTtcIjpcIuKJgVwiLFwiJm5zaW1lO1wiOlwi4omEXCIsXCImbnNpbWVxO1wiOlwi4omEXCIsXCImbnNtaWQ7XCI6XCLiiKRcIixcIiZuc3BhcjtcIjpcIuKIplwiLFwiJm5zcXN1YmU7XCI6XCLii6JcIixcIiZuc3FzdXBlO1wiOlwi4oujXCIsXCImbnN1YjtcIjpcIuKKhFwiLFwiJm5zdWJFO1wiOlwi4quFzLhcIixcIiZuc3ViZTtcIjpcIuKKiFwiLFwiJm5zdWJzZXQ7XCI6XCLiioLig5JcIixcIiZuc3Vic2V0ZXE7XCI6XCLiiohcIixcIiZuc3Vic2V0ZXFxO1wiOlwi4quFzLhcIixcIiZuc3VjYztcIjpcIuKKgVwiLFwiJm5zdWNjZXE7XCI6XCLiqrDMuFwiLFwiJm5zdXA7XCI6XCLiioVcIixcIiZuc3VwRTtcIjpcIuKrhsy4XCIsXCImbnN1cGU7XCI6XCLiiolcIixcIiZuc3Vwc2V0O1wiOlwi4oqD4oOSXCIsXCImbnN1cHNldGVxO1wiOlwi4oqJXCIsXCImbnN1cHNldGVxcTtcIjpcIuKrhsy4XCIsXCImbnRnbDtcIjpcIuKJuVwiLFwiJm50aWxkZVwiOlwiw7FcIixcIiZudGlsZGU7XCI6XCLDsVwiLFwiJm50bGc7XCI6XCLiibhcIixcIiZudHJpYW5nbGVsZWZ0O1wiOlwi4ouqXCIsXCImbnRyaWFuZ2xlbGVmdGVxO1wiOlwi4ousXCIsXCImbnRyaWFuZ2xlcmlnaHQ7XCI6XCLii6tcIixcIiZudHJpYW5nbGVyaWdodGVxO1wiOlwi4outXCIsXCImbnU7XCI6XCLOvVwiLFwiJm51bTtcIjpcIiNcIixcIiZudW1lcm87XCI6XCLihJZcIixcIiZudW1zcDtcIjpcIuKAh1wiLFwiJm52RGFzaDtcIjpcIuKKrVwiLFwiJm52SGFycjtcIjpcIuKkhFwiLFwiJm52YXA7XCI6XCLiiY3ig5JcIixcIiZudmRhc2g7XCI6XCLiiqxcIixcIiZudmdlO1wiOlwi4oml4oOSXCIsXCImbnZndDtcIjpcIj7ig5JcIixcIiZudmluZmluO1wiOlwi4qeeXCIsXCImbnZsQXJyO1wiOlwi4qSCXCIsXCImbnZsZTtcIjpcIuKJpOKDklwiLFwiJm52bHQ7XCI6XCI84oOSXCIsXCImbnZsdHJpZTtcIjpcIuKKtOKDklwiLFwiJm52ckFycjtcIjpcIuKkg1wiLFwiJm52cnRyaWU7XCI6XCLiirXig5JcIixcIiZudnNpbTtcIjpcIuKIvOKDklwiLFwiJm53QXJyO1wiOlwi4oeWXCIsXCImbndhcmhrO1wiOlwi4qSjXCIsXCImbndhcnI7XCI6XCLihpZcIixcIiZud2Fycm93O1wiOlwi4oaWXCIsXCImbnduZWFyO1wiOlwi4qSnXCIsXCImb1M7XCI6XCLik4hcIixcIiZvYWN1dGVcIjpcIsOzXCIsXCImb2FjdXRlO1wiOlwiw7NcIixcIiZvYXN0O1wiOlwi4oqbXCIsXCImb2NpcjtcIjpcIuKKmlwiLFwiJm9jaXJjXCI6XCLDtFwiLFwiJm9jaXJjO1wiOlwiw7RcIixcIiZvY3k7XCI6XCLQvlwiLFwiJm9kYXNoO1wiOlwi4oqdXCIsXCImb2RibGFjO1wiOlwixZFcIixcIiZvZGl2O1wiOlwi4qi4XCIsXCImb2RvdDtcIjpcIuKKmVwiLFwiJm9kc29sZDtcIjpcIuKmvFwiLFwiJm9lbGlnO1wiOlwixZNcIixcIiZvZmNpcjtcIjpcIuKmv1wiLFwiJm9mcjtcIjpcIvCdlKxcIixcIiZvZ29uO1wiOlwiy5tcIixcIiZvZ3JhdmVcIjpcIsOyXCIsXCImb2dyYXZlO1wiOlwiw7JcIixcIiZvZ3Q7XCI6XCLip4FcIixcIiZvaGJhcjtcIjpcIuKmtVwiLFwiJm9obTtcIjpcIs6pXCIsXCImb2ludDtcIjpcIuKIrlwiLFwiJm9sYXJyO1wiOlwi4oa6XCIsXCImb2xjaXI7XCI6XCLipr5cIixcIiZvbGNyb3NzO1wiOlwi4qa7XCIsXCImb2xpbmU7XCI6XCLigL5cIixcIiZvbHQ7XCI6XCLip4BcIixcIiZvbWFjcjtcIjpcIsWNXCIsXCImb21lZ2E7XCI6XCLPiVwiLFwiJm9taWNyb247XCI6XCLOv1wiLFwiJm9taWQ7XCI6XCLiprZcIixcIiZvbWludXM7XCI6XCLiipZcIixcIiZvb3BmO1wiOlwi8J2VoFwiLFwiJm9wYXI7XCI6XCLiprdcIixcIiZvcGVycDtcIjpcIuKmuVwiLFwiJm9wbHVzO1wiOlwi4oqVXCIsXCImb3I7XCI6XCLiiKhcIixcIiZvcmFycjtcIjpcIuKGu1wiLFwiJm9yZDtcIjpcIuKpnVwiLFwiJm9yZGVyO1wiOlwi4oS0XCIsXCImb3JkZXJvZjtcIjpcIuKEtFwiLFwiJm9yZGZcIjpcIsKqXCIsXCImb3JkZjtcIjpcIsKqXCIsXCImb3JkbVwiOlwiwrpcIixcIiZvcmRtO1wiOlwiwrpcIixcIiZvcmlnb2Y7XCI6XCLiirZcIixcIiZvcm9yO1wiOlwi4qmWXCIsXCImb3JzbG9wZTtcIjpcIuKpl1wiLFwiJm9ydjtcIjpcIuKpm1wiLFwiJm9zY3I7XCI6XCLihLRcIixcIiZvc2xhc2hcIjpcIsO4XCIsXCImb3NsYXNoO1wiOlwiw7hcIixcIiZvc29sO1wiOlwi4oqYXCIsXCImb3RpbGRlXCI6XCLDtVwiLFwiJm90aWxkZTtcIjpcIsO1XCIsXCImb3RpbWVzO1wiOlwi4oqXXCIsXCImb3RpbWVzYXM7XCI6XCLiqLZcIixcIiZvdW1sXCI6XCLDtlwiLFwiJm91bWw7XCI6XCLDtlwiLFwiJm92YmFyO1wiOlwi4oy9XCIsXCImcGFyO1wiOlwi4oilXCIsXCImcGFyYVwiOlwiwrZcIixcIiZwYXJhO1wiOlwiwrZcIixcIiZwYXJhbGxlbDtcIjpcIuKIpVwiLFwiJnBhcnNpbTtcIjpcIuKrs1wiLFwiJnBhcnNsO1wiOlwi4qu9XCIsXCImcGFydDtcIjpcIuKIglwiLFwiJnBjeTtcIjpcItC/XCIsXCImcGVyY250O1wiOlwiJVwiLFwiJnBlcmlvZDtcIjpcIi5cIixcIiZwZXJtaWw7XCI6XCLigLBcIixcIiZwZXJwO1wiOlwi4oqlXCIsXCImcGVydGVuaztcIjpcIuKAsVwiLFwiJnBmcjtcIjpcIvCdlK1cIixcIiZwaGk7XCI6XCLPhlwiLFwiJnBoaXY7XCI6XCLPlVwiLFwiJnBobW1hdDtcIjpcIuKEs1wiLFwiJnBob25lO1wiOlwi4piOXCIsXCImcGk7XCI6XCLPgFwiLFwiJnBpdGNoZm9yaztcIjpcIuKLlFwiLFwiJnBpdjtcIjpcIs+WXCIsXCImcGxhbmNrO1wiOlwi4oSPXCIsXCImcGxhbmNraDtcIjpcIuKEjlwiLFwiJnBsYW5rdjtcIjpcIuKEj1wiLFwiJnBsdXM7XCI6XCIrXCIsXCImcGx1c2FjaXI7XCI6XCLiqKNcIixcIiZwbHVzYjtcIjpcIuKKnlwiLFwiJnBsdXNjaXI7XCI6XCLiqKJcIixcIiZwbHVzZG87XCI6XCLiiJRcIixcIiZwbHVzZHU7XCI6XCLiqKVcIixcIiZwbHVzZTtcIjpcIuKpslwiLFwiJnBsdXNtblwiOlwiwrFcIixcIiZwbHVzbW47XCI6XCLCsVwiLFwiJnBsdXNzaW07XCI6XCLiqKZcIixcIiZwbHVzdHdvO1wiOlwi4qinXCIsXCImcG07XCI6XCLCsVwiLFwiJnBvaW50aW50O1wiOlwi4qiVXCIsXCImcG9wZjtcIjpcIvCdlaFcIixcIiZwb3VuZFwiOlwiwqNcIixcIiZwb3VuZDtcIjpcIsKjXCIsXCImcHI7XCI6XCLiibpcIixcIiZwckU7XCI6XCLiqrNcIixcIiZwcmFwO1wiOlwi4qq3XCIsXCImcHJjdWU7XCI6XCLiibxcIixcIiZwcmU7XCI6XCLiqq9cIixcIiZwcmVjO1wiOlwi4om6XCIsXCImcHJlY2FwcHJveDtcIjpcIuKqt1wiLFwiJnByZWNjdXJseWVxO1wiOlwi4om8XCIsXCImcHJlY2VxO1wiOlwi4qqvXCIsXCImcHJlY25hcHByb3g7XCI6XCLiqrlcIixcIiZwcmVjbmVxcTtcIjpcIuKqtVwiLFwiJnByZWNuc2ltO1wiOlwi4ouoXCIsXCImcHJlY3NpbTtcIjpcIuKJvlwiLFwiJnByaW1lO1wiOlwi4oCyXCIsXCImcHJpbWVzO1wiOlwi4oSZXCIsXCImcHJuRTtcIjpcIuKqtVwiLFwiJnBybmFwO1wiOlwi4qq5XCIsXCImcHJuc2ltO1wiOlwi4ouoXCIsXCImcHJvZDtcIjpcIuKIj1wiLFwiJnByb2ZhbGFyO1wiOlwi4oyuXCIsXCImcHJvZmxpbmU7XCI6XCLijJJcIixcIiZwcm9mc3VyZjtcIjpcIuKMk1wiLFwiJnByb3A7XCI6XCLiiJ1cIixcIiZwcm9wdG87XCI6XCLiiJ1cIixcIiZwcnNpbTtcIjpcIuKJvlwiLFwiJnBydXJlbDtcIjpcIuKKsFwiLFwiJnBzY3I7XCI6XCLwnZOFXCIsXCImcHNpO1wiOlwiz4hcIixcIiZwdW5jc3A7XCI6XCLigIhcIixcIiZxZnI7XCI6XCLwnZSuXCIsXCImcWludDtcIjpcIuKojFwiLFwiJnFvcGY7XCI6XCLwnZWiXCIsXCImcXByaW1lO1wiOlwi4oGXXCIsXCImcXNjcjtcIjpcIvCdk4ZcIixcIiZxdWF0ZXJuaW9ucztcIjpcIuKEjVwiLFwiJnF1YXRpbnQ7XCI6XCLiqJZcIixcIiZxdWVzdDtcIjpcIj9cIixcIiZxdWVzdGVxO1wiOlwi4omfXCIsXCImcXVvdFwiOidcIicsXCImcXVvdDtcIjonXCInLFwiJnJBYXJyO1wiOlwi4oebXCIsXCImckFycjtcIjpcIuKHklwiLFwiJnJBdGFpbDtcIjpcIuKknFwiLFwiJnJCYXJyO1wiOlwi4qSPXCIsXCImckhhcjtcIjpcIuKlpFwiLFwiJnJhY2U7XCI6XCLiiL3MsVwiLFwiJnJhY3V0ZTtcIjpcIsWVXCIsXCImcmFkaWM7XCI6XCLiiJpcIixcIiZyYWVtcHR5djtcIjpcIuKms1wiLFwiJnJhbmc7XCI6XCLin6lcIixcIiZyYW5nZDtcIjpcIuKmklwiLFwiJnJhbmdlO1wiOlwi4qalXCIsXCImcmFuZ2xlO1wiOlwi4p+pXCIsXCImcmFxdW9cIjpcIsK7XCIsXCImcmFxdW87XCI6XCLCu1wiLFwiJnJhcnI7XCI6XCLihpJcIixcIiZyYXJyYXA7XCI6XCLipbVcIixcIiZyYXJyYjtcIjpcIuKHpVwiLFwiJnJhcnJiZnM7XCI6XCLipKBcIixcIiZyYXJyYztcIjpcIuKks1wiLFwiJnJhcnJmcztcIjpcIuKknlwiLFwiJnJhcnJoaztcIjpcIuKGqlwiLFwiJnJhcnJscDtcIjpcIuKGrFwiLFwiJnJhcnJwbDtcIjpcIuKlhVwiLFwiJnJhcnJzaW07XCI6XCLipbRcIixcIiZyYXJydGw7XCI6XCLihqNcIixcIiZyYXJydztcIjpcIuKGnVwiLFwiJnJhdGFpbDtcIjpcIuKkmlwiLFwiJnJhdGlvO1wiOlwi4oi2XCIsXCImcmF0aW9uYWxzO1wiOlwi4oSaXCIsXCImcmJhcnI7XCI6XCLipI1cIixcIiZyYmJyaztcIjpcIuKds1wiLFwiJnJicmFjZTtcIjpcIn1cIixcIiZyYnJhY2s7XCI6XCJdXCIsXCImcmJya2U7XCI6XCLipoxcIixcIiZyYnJrc2xkO1wiOlwi4qaOXCIsXCImcmJya3NsdTtcIjpcIuKmkFwiLFwiJnJjYXJvbjtcIjpcIsWZXCIsXCImcmNlZGlsO1wiOlwixZdcIixcIiZyY2VpbDtcIjpcIuKMiVwiLFwiJnJjdWI7XCI6XCJ9XCIsXCImcmN5O1wiOlwi0YBcIixcIiZyZGNhO1wiOlwi4qS3XCIsXCImcmRsZGhhcjtcIjpcIuKlqVwiLFwiJnJkcXVvO1wiOlwi4oCdXCIsXCImcmRxdW9yO1wiOlwi4oCdXCIsXCImcmRzaDtcIjpcIuKGs1wiLFwiJnJlYWw7XCI6XCLihJxcIixcIiZyZWFsaW5lO1wiOlwi4oSbXCIsXCImcmVhbHBhcnQ7XCI6XCLihJxcIixcIiZyZWFscztcIjpcIuKEnVwiLFwiJnJlY3Q7XCI6XCLilq1cIixcIiZyZWdcIjpcIsKuXCIsXCImcmVnO1wiOlwiwq5cIixcIiZyZmlzaHQ7XCI6XCLipb1cIixcIiZyZmxvb3I7XCI6XCLijItcIixcIiZyZnI7XCI6XCLwnZSvXCIsXCImcmhhcmQ7XCI6XCLih4FcIixcIiZyaGFydTtcIjpcIuKHgFwiLFwiJnJoYXJ1bDtcIjpcIuKlrFwiLFwiJnJobztcIjpcIs+BXCIsXCImcmhvdjtcIjpcIs+xXCIsXCImcmlnaHRhcnJvdztcIjpcIuKGklwiLFwiJnJpZ2h0YXJyb3d0YWlsO1wiOlwi4oajXCIsXCImcmlnaHRoYXJwb29uZG93bjtcIjpcIuKHgVwiLFwiJnJpZ2h0aGFycG9vbnVwO1wiOlwi4oeAXCIsXCImcmlnaHRsZWZ0YXJyb3dzO1wiOlwi4oeEXCIsXCImcmlnaHRsZWZ0aGFycG9vbnM7XCI6XCLih4xcIixcIiZyaWdodHJpZ2h0YXJyb3dzO1wiOlwi4oeJXCIsXCImcmlnaHRzcXVpZ2Fycm93O1wiOlwi4oadXCIsXCImcmlnaHR0aHJlZXRpbWVzO1wiOlwi4ouMXCIsXCImcmluZztcIjpcIsuaXCIsXCImcmlzaW5nZG90c2VxO1wiOlwi4omTXCIsXCImcmxhcnI7XCI6XCLih4RcIixcIiZybGhhcjtcIjpcIuKHjFwiLFwiJnJsbTtcIjpcIuKAj1wiLFwiJnJtb3VzdDtcIjpcIuKOsVwiLFwiJnJtb3VzdGFjaGU7XCI6XCLijrFcIixcIiZybm1pZDtcIjpcIuKrrlwiLFwiJnJvYW5nO1wiOlwi4p+tXCIsXCImcm9hcnI7XCI6XCLih75cIixcIiZyb2JyaztcIjpcIuKfp1wiLFwiJnJvcGFyO1wiOlwi4qaGXCIsXCImcm9wZjtcIjpcIvCdlaNcIixcIiZyb3BsdXM7XCI6XCLiqK5cIixcIiZyb3RpbWVzO1wiOlwi4qi1XCIsXCImcnBhcjtcIjpcIilcIixcIiZycGFyZ3Q7XCI6XCLippRcIixcIiZycHBvbGludDtcIjpcIuKoklwiLFwiJnJyYXJyO1wiOlwi4oeJXCIsXCImcnNhcXVvO1wiOlwi4oC6XCIsXCImcnNjcjtcIjpcIvCdk4dcIixcIiZyc2g7XCI6XCLihrFcIixcIiZyc3FiO1wiOlwiXVwiLFwiJnJzcXVvO1wiOlwi4oCZXCIsXCImcnNxdW9yO1wiOlwi4oCZXCIsXCImcnRocmVlO1wiOlwi4ouMXCIsXCImcnRpbWVzO1wiOlwi4ouKXCIsXCImcnRyaTtcIjpcIuKWuVwiLFwiJnJ0cmllO1wiOlwi4oq1XCIsXCImcnRyaWY7XCI6XCLilrhcIixcIiZydHJpbHRyaTtcIjpcIuKnjlwiLFwiJnJ1bHVoYXI7XCI6XCLipahcIixcIiZyeDtcIjpcIuKEnlwiLFwiJnNhY3V0ZTtcIjpcIsWbXCIsXCImc2JxdW87XCI6XCLigJpcIixcIiZzYztcIjpcIuKJu1wiLFwiJnNjRTtcIjpcIuKqtFwiLFwiJnNjYXA7XCI6XCLiqrhcIixcIiZzY2Fyb247XCI6XCLFoVwiLFwiJnNjY3VlO1wiOlwi4om9XCIsXCImc2NlO1wiOlwi4qqwXCIsXCImc2NlZGlsO1wiOlwixZ9cIixcIiZzY2lyYztcIjpcIsWdXCIsXCImc2NuRTtcIjpcIuKqtlwiLFwiJnNjbmFwO1wiOlwi4qq6XCIsXCImc2Nuc2ltO1wiOlwi4oupXCIsXCImc2Nwb2xpbnQ7XCI6XCLiqJNcIixcIiZzY3NpbTtcIjpcIuKJv1wiLFwiJnNjeTtcIjpcItGBXCIsXCImc2RvdDtcIjpcIuKLhVwiLFwiJnNkb3RiO1wiOlwi4oqhXCIsXCImc2RvdGU7XCI6XCLiqaZcIixcIiZzZUFycjtcIjpcIuKHmFwiLFwiJnNlYXJoaztcIjpcIuKkpVwiLFwiJnNlYXJyO1wiOlwi4oaYXCIsXCImc2VhcnJvdztcIjpcIuKGmFwiLFwiJnNlY3RcIjpcIsKnXCIsXCImc2VjdDtcIjpcIsKnXCIsXCImc2VtaTtcIjpcIjtcIixcIiZzZXN3YXI7XCI6XCLipKlcIixcIiZzZXRtaW51cztcIjpcIuKIllwiLFwiJnNldG1uO1wiOlwi4oiWXCIsXCImc2V4dDtcIjpcIuKctlwiLFwiJnNmcjtcIjpcIvCdlLBcIixcIiZzZnJvd247XCI6XCLijKJcIixcIiZzaGFycDtcIjpcIuKZr1wiLFwiJnNoY2hjeTtcIjpcItGJXCIsXCImc2hjeTtcIjpcItGIXCIsXCImc2hvcnRtaWQ7XCI6XCLiiKNcIixcIiZzaG9ydHBhcmFsbGVsO1wiOlwi4oilXCIsXCImc2h5XCI6XCLCrVwiLFwiJnNoeTtcIjpcIsKtXCIsXCImc2lnbWE7XCI6XCLPg1wiLFwiJnNpZ21hZjtcIjpcIs+CXCIsXCImc2lnbWF2O1wiOlwiz4JcIixcIiZzaW07XCI6XCLiiLxcIixcIiZzaW1kb3Q7XCI6XCLiqapcIixcIiZzaW1lO1wiOlwi4omDXCIsXCImc2ltZXE7XCI6XCLiiYNcIixcIiZzaW1nO1wiOlwi4qqeXCIsXCImc2ltZ0U7XCI6XCLiqqBcIixcIiZzaW1sO1wiOlwi4qqdXCIsXCImc2ltbEU7XCI6XCLiqp9cIixcIiZzaW1uZTtcIjpcIuKJhlwiLFwiJnNpbXBsdXM7XCI6XCLiqKRcIixcIiZzaW1yYXJyO1wiOlwi4qWyXCIsXCImc2xhcnI7XCI6XCLihpBcIixcIiZzbWFsbHNldG1pbnVzO1wiOlwi4oiWXCIsXCImc21hc2hwO1wiOlwi4qizXCIsXCImc21lcGFyc2w7XCI6XCLip6RcIixcIiZzbWlkO1wiOlwi4oijXCIsXCImc21pbGU7XCI6XCLijKNcIixcIiZzbXQ7XCI6XCLiqqpcIixcIiZzbXRlO1wiOlwi4qqsXCIsXCImc210ZXM7XCI6XCLiqqzvuIBcIixcIiZzb2Z0Y3k7XCI6XCLRjFwiLFwiJnNvbDtcIjpcIi9cIixcIiZzb2xiO1wiOlwi4qeEXCIsXCImc29sYmFyO1wiOlwi4oy/XCIsXCImc29wZjtcIjpcIvCdlaRcIixcIiZzcGFkZXM7XCI6XCLimaBcIixcIiZzcGFkZXN1aXQ7XCI6XCLimaBcIixcIiZzcGFyO1wiOlwi4oilXCIsXCImc3FjYXA7XCI6XCLiipNcIixcIiZzcWNhcHM7XCI6XCLiipPvuIBcIixcIiZzcWN1cDtcIjpcIuKKlFwiLFwiJnNxY3VwcztcIjpcIuKKlO+4gFwiLFwiJnNxc3ViO1wiOlwi4oqPXCIsXCImc3FzdWJlO1wiOlwi4oqRXCIsXCImc3FzdWJzZXQ7XCI6XCLiio9cIixcIiZzcXN1YnNldGVxO1wiOlwi4oqRXCIsXCImc3FzdXA7XCI6XCLiipBcIixcIiZzcXN1cGU7XCI6XCLiipJcIixcIiZzcXN1cHNldDtcIjpcIuKKkFwiLFwiJnNxc3Vwc2V0ZXE7XCI6XCLiipJcIixcIiZzcXU7XCI6XCLilqFcIixcIiZzcXVhcmU7XCI6XCLilqFcIixcIiZzcXVhcmY7XCI6XCLilqpcIixcIiZzcXVmO1wiOlwi4paqXCIsXCImc3JhcnI7XCI6XCLihpJcIixcIiZzc2NyO1wiOlwi8J2TiFwiLFwiJnNzZXRtbjtcIjpcIuKIllwiLFwiJnNzbWlsZTtcIjpcIuKMo1wiLFwiJnNzdGFyZjtcIjpcIuKLhlwiLFwiJnN0YXI7XCI6XCLimIZcIixcIiZzdGFyZjtcIjpcIuKYhVwiLFwiJnN0cmFpZ2h0ZXBzaWxvbjtcIjpcIs+1XCIsXCImc3RyYWlnaHRwaGk7XCI6XCLPlVwiLFwiJnN0cm5zO1wiOlwiwq9cIixcIiZzdWI7XCI6XCLiioJcIixcIiZzdWJFO1wiOlwi4quFXCIsXCImc3ViZG90O1wiOlwi4qq9XCIsXCImc3ViZTtcIjpcIuKKhlwiLFwiJnN1YmVkb3Q7XCI6XCLiq4NcIixcIiZzdWJtdWx0O1wiOlwi4quBXCIsXCImc3VibkU7XCI6XCLiq4tcIixcIiZzdWJuZTtcIjpcIuKKilwiLFwiJnN1YnBsdXM7XCI6XCLiqr9cIixcIiZzdWJyYXJyO1wiOlwi4qW5XCIsXCImc3Vic2V0O1wiOlwi4oqCXCIsXCImc3Vic2V0ZXE7XCI6XCLiioZcIixcIiZzdWJzZXRlcXE7XCI6XCLiq4VcIixcIiZzdWJzZXRuZXE7XCI6XCLiiopcIixcIiZzdWJzZXRuZXFxO1wiOlwi4quLXCIsXCImc3Vic2ltO1wiOlwi4quHXCIsXCImc3Vic3ViO1wiOlwi4quVXCIsXCImc3Vic3VwO1wiOlwi4quTXCIsXCImc3VjYztcIjpcIuKJu1wiLFwiJnN1Y2NhcHByb3g7XCI6XCLiqrhcIixcIiZzdWNjY3VybHllcTtcIjpcIuKJvVwiLFwiJnN1Y2NlcTtcIjpcIuKqsFwiLFwiJnN1Y2NuYXBwcm94O1wiOlwi4qq6XCIsXCImc3VjY25lcXE7XCI6XCLiqrZcIixcIiZzdWNjbnNpbTtcIjpcIuKLqVwiLFwiJnN1Y2NzaW07XCI6XCLiib9cIixcIiZzdW07XCI6XCLiiJFcIixcIiZzdW5nO1wiOlwi4pmqXCIsXCImc3VwMVwiOlwiwrlcIixcIiZzdXAxO1wiOlwiwrlcIixcIiZzdXAyXCI6XCLCslwiLFwiJnN1cDI7XCI6XCLCslwiLFwiJnN1cDNcIjpcIsKzXCIsXCImc3VwMztcIjpcIsKzXCIsXCImc3VwO1wiOlwi4oqDXCIsXCImc3VwRTtcIjpcIuKrhlwiLFwiJnN1cGRvdDtcIjpcIuKqvlwiLFwiJnN1cGRzdWI7XCI6XCLiq5hcIixcIiZzdXBlO1wiOlwi4oqHXCIsXCImc3VwZWRvdDtcIjpcIuKrhFwiLFwiJnN1cGhzb2w7XCI6XCLin4lcIixcIiZzdXBoc3ViO1wiOlwi4quXXCIsXCImc3VwbGFycjtcIjpcIuKlu1wiLFwiJnN1cG11bHQ7XCI6XCLiq4JcIixcIiZzdXBuRTtcIjpcIuKrjFwiLFwiJnN1cG5lO1wiOlwi4oqLXCIsXCImc3VwcGx1cztcIjpcIuKrgFwiLFwiJnN1cHNldDtcIjpcIuKKg1wiLFwiJnN1cHNldGVxO1wiOlwi4oqHXCIsXCImc3Vwc2V0ZXFxO1wiOlwi4quGXCIsXCImc3Vwc2V0bmVxO1wiOlwi4oqLXCIsXCImc3Vwc2V0bmVxcTtcIjpcIuKrjFwiLFwiJnN1cHNpbTtcIjpcIuKriFwiLFwiJnN1cHN1YjtcIjpcIuKrlFwiLFwiJnN1cHN1cDtcIjpcIuKrllwiLFwiJnN3QXJyO1wiOlwi4oeZXCIsXCImc3dhcmhrO1wiOlwi4qSmXCIsXCImc3dhcnI7XCI6XCLihplcIixcIiZzd2Fycm93O1wiOlwi4oaZXCIsXCImc3dud2FyO1wiOlwi4qSqXCIsXCImc3psaWdcIjpcIsOfXCIsXCImc3psaWc7XCI6XCLDn1wiLFwiJnRhcmdldDtcIjpcIuKMllwiLFwiJnRhdTtcIjpcIs+EXCIsXCImdGJyaztcIjpcIuKOtFwiLFwiJnRjYXJvbjtcIjpcIsWlXCIsXCImdGNlZGlsO1wiOlwixaNcIixcIiZ0Y3k7XCI6XCLRglwiLFwiJnRkb3Q7XCI6XCLig5tcIixcIiZ0ZWxyZWM7XCI6XCLijJVcIixcIiZ0ZnI7XCI6XCLwnZSxXCIsXCImdGhlcmU0O1wiOlwi4oi0XCIsXCImdGhlcmVmb3JlO1wiOlwi4oi0XCIsXCImdGhldGE7XCI6XCLOuFwiLFwiJnRoZXRhc3ltO1wiOlwiz5FcIixcIiZ0aGV0YXY7XCI6XCLPkVwiLFwiJnRoaWNrYXBwcm94O1wiOlwi4omIXCIsXCImdGhpY2tzaW07XCI6XCLiiLxcIixcIiZ0aGluc3A7XCI6XCLigIlcIixcIiZ0aGthcDtcIjpcIuKJiFwiLFwiJnRoa3NpbTtcIjpcIuKIvFwiLFwiJnRob3JuXCI6XCLDvlwiLFwiJnRob3JuO1wiOlwiw75cIixcIiZ0aWxkZTtcIjpcIsucXCIsXCImdGltZXNcIjpcIsOXXCIsXCImdGltZXM7XCI6XCLDl1wiLFwiJnRpbWVzYjtcIjpcIuKKoFwiLFwiJnRpbWVzYmFyO1wiOlwi4qixXCIsXCImdGltZXNkO1wiOlwi4qiwXCIsXCImdGludDtcIjpcIuKIrVwiLFwiJnRvZWE7XCI6XCLipKhcIixcIiZ0b3A7XCI6XCLiiqRcIixcIiZ0b3Bib3Q7XCI6XCLijLZcIixcIiZ0b3BjaXI7XCI6XCLiq7FcIixcIiZ0b3BmO1wiOlwi8J2VpVwiLFwiJnRvcGZvcms7XCI6XCLiq5pcIixcIiZ0b3NhO1wiOlwi4qSpXCIsXCImdHByaW1lO1wiOlwi4oC0XCIsXCImdHJhZGU7XCI6XCLihKJcIixcIiZ0cmlhbmdsZTtcIjpcIuKWtVwiLFwiJnRyaWFuZ2xlZG93bjtcIjpcIuKWv1wiLFwiJnRyaWFuZ2xlbGVmdDtcIjpcIuKXg1wiLFwiJnRyaWFuZ2xlbGVmdGVxO1wiOlwi4oq0XCIsXCImdHJpYW5nbGVxO1wiOlwi4omcXCIsXCImdHJpYW5nbGVyaWdodDtcIjpcIuKWuVwiLFwiJnRyaWFuZ2xlcmlnaHRlcTtcIjpcIuKKtVwiLFwiJnRyaWRvdDtcIjpcIuKXrFwiLFwiJnRyaWU7XCI6XCLiiZxcIixcIiZ0cmltaW51cztcIjpcIuKoulwiLFwiJnRyaXBsdXM7XCI6XCLiqLlcIixcIiZ0cmlzYjtcIjpcIuKnjVwiLFwiJnRyaXRpbWU7XCI6XCLiqLtcIixcIiZ0cnBleml1bTtcIjpcIuKPolwiLFwiJnRzY3I7XCI6XCLwnZOJXCIsXCImdHNjeTtcIjpcItGGXCIsXCImdHNoY3k7XCI6XCLRm1wiLFwiJnRzdHJvaztcIjpcIsWnXCIsXCImdHdpeHQ7XCI6XCLiiaxcIixcIiZ0d29oZWFkbGVmdGFycm93O1wiOlwi4oaeXCIsXCImdHdvaGVhZHJpZ2h0YXJyb3c7XCI6XCLihqBcIixcIiZ1QXJyO1wiOlwi4oeRXCIsXCImdUhhcjtcIjpcIuKlo1wiLFwiJnVhY3V0ZVwiOlwiw7pcIixcIiZ1YWN1dGU7XCI6XCLDulwiLFwiJnVhcnI7XCI6XCLihpFcIixcIiZ1YnJjeTtcIjpcItGeXCIsXCImdWJyZXZlO1wiOlwixa1cIixcIiZ1Y2lyY1wiOlwiw7tcIixcIiZ1Y2lyYztcIjpcIsO7XCIsXCImdWN5O1wiOlwi0YNcIixcIiZ1ZGFycjtcIjpcIuKHhVwiLFwiJnVkYmxhYztcIjpcIsWxXCIsXCImdWRoYXI7XCI6XCLipa5cIixcIiZ1ZmlzaHQ7XCI6XCLipb5cIixcIiZ1ZnI7XCI6XCLwnZSyXCIsXCImdWdyYXZlXCI6XCLDuVwiLFwiJnVncmF2ZTtcIjpcIsO5XCIsXCImdWhhcmw7XCI6XCLihr9cIixcIiZ1aGFycjtcIjpcIuKGvlwiLFwiJnVoYmxrO1wiOlwi4paAXCIsXCImdWxjb3JuO1wiOlwi4oycXCIsXCImdWxjb3JuZXI7XCI6XCLijJxcIixcIiZ1bGNyb3A7XCI6XCLijI9cIixcIiZ1bHRyaTtcIjpcIuKXuFwiLFwiJnVtYWNyO1wiOlwixatcIixcIiZ1bWxcIjpcIsKoXCIsXCImdW1sO1wiOlwiwqhcIixcIiZ1b2dvbjtcIjpcIsWzXCIsXCImdW9wZjtcIjpcIvCdlaZcIixcIiZ1cGFycm93O1wiOlwi4oaRXCIsXCImdXBkb3duYXJyb3c7XCI6XCLihpVcIixcIiZ1cGhhcnBvb25sZWZ0O1wiOlwi4oa/XCIsXCImdXBoYXJwb29ucmlnaHQ7XCI6XCLihr5cIixcIiZ1cGx1cztcIjpcIuKKjlwiLFwiJnVwc2k7XCI6XCLPhVwiLFwiJnVwc2loO1wiOlwiz5JcIixcIiZ1cHNpbG9uO1wiOlwiz4VcIixcIiZ1cHVwYXJyb3dzO1wiOlwi4oeIXCIsXCImdXJjb3JuO1wiOlwi4oydXCIsXCImdXJjb3JuZXI7XCI6XCLijJ1cIixcIiZ1cmNyb3A7XCI6XCLijI5cIixcIiZ1cmluZztcIjpcIsWvXCIsXCImdXJ0cmk7XCI6XCLil7lcIixcIiZ1c2NyO1wiOlwi8J2TilwiLFwiJnV0ZG90O1wiOlwi4ouwXCIsXCImdXRpbGRlO1wiOlwixalcIixcIiZ1dHJpO1wiOlwi4pa1XCIsXCImdXRyaWY7XCI6XCLilrRcIixcIiZ1dWFycjtcIjpcIuKHiFwiLFwiJnV1bWxcIjpcIsO8XCIsXCImdXVtbDtcIjpcIsO8XCIsXCImdXdhbmdsZTtcIjpcIuKmp1wiLFwiJnZBcnI7XCI6XCLih5VcIixcIiZ2QmFyO1wiOlwi4quoXCIsXCImdkJhcnY7XCI6XCLiq6lcIixcIiZ2RGFzaDtcIjpcIuKKqFwiLFwiJnZhbmdydDtcIjpcIuKmnFwiLFwiJnZhcmVwc2lsb247XCI6XCLPtVwiLFwiJnZhcmthcHBhO1wiOlwiz7BcIixcIiZ2YXJub3RoaW5nO1wiOlwi4oiFXCIsXCImdmFycGhpO1wiOlwiz5VcIixcIiZ2YXJwaTtcIjpcIs+WXCIsXCImdmFycHJvcHRvO1wiOlwi4oidXCIsXCImdmFycjtcIjpcIuKGlVwiLFwiJnZhcnJobztcIjpcIs+xXCIsXCImdmFyc2lnbWE7XCI6XCLPglwiLFwiJnZhcnN1YnNldG5lcTtcIjpcIuKKiu+4gFwiLFwiJnZhcnN1YnNldG5lcXE7XCI6XCLiq4vvuIBcIixcIiZ2YXJzdXBzZXRuZXE7XCI6XCLiiovvuIBcIixcIiZ2YXJzdXBzZXRuZXFxO1wiOlwi4quM77iAXCIsXCImdmFydGhldGE7XCI6XCLPkVwiLFwiJnZhcnRyaWFuZ2xlbGVmdDtcIjpcIuKKslwiLFwiJnZhcnRyaWFuZ2xlcmlnaHQ7XCI6XCLiirNcIixcIiZ2Y3k7XCI6XCLQslwiLFwiJnZkYXNoO1wiOlwi4oqiXCIsXCImdmVlO1wiOlwi4oioXCIsXCImdmVlYmFyO1wiOlwi4oq7XCIsXCImdmVlZXE7XCI6XCLiiZpcIixcIiZ2ZWxsaXA7XCI6XCLii65cIixcIiZ2ZXJiYXI7XCI6XCJ8XCIsXCImdmVydDtcIjpcInxcIixcIiZ2ZnI7XCI6XCLwnZSzXCIsXCImdmx0cmk7XCI6XCLiirJcIixcIiZ2bnN1YjtcIjpcIuKKguKDklwiLFwiJnZuc3VwO1wiOlwi4oqD4oOSXCIsXCImdm9wZjtcIjpcIvCdladcIixcIiZ2cHJvcDtcIjpcIuKInVwiLFwiJnZydHJpO1wiOlwi4oqzXCIsXCImdnNjcjtcIjpcIvCdk4tcIixcIiZ2c3VibkU7XCI6XCLiq4vvuIBcIixcIiZ2c3VibmU7XCI6XCLiiorvuIBcIixcIiZ2c3VwbkU7XCI6XCLiq4zvuIBcIixcIiZ2c3VwbmU7XCI6XCLiiovvuIBcIixcIiZ2emlnemFnO1wiOlwi4qaaXCIsXCImd2NpcmM7XCI6XCLFtVwiLFwiJndlZGJhcjtcIjpcIuKpn1wiLFwiJndlZGdlO1wiOlwi4oinXCIsXCImd2VkZ2VxO1wiOlwi4omZXCIsXCImd2VpZXJwO1wiOlwi4oSYXCIsXCImd2ZyO1wiOlwi8J2UtFwiLFwiJndvcGY7XCI6XCLwnZWoXCIsXCImd3A7XCI6XCLihJhcIixcIiZ3cjtcIjpcIuKJgFwiLFwiJndyZWF0aDtcIjpcIuKJgFwiLFwiJndzY3I7XCI6XCLwnZOMXCIsXCImeGNhcDtcIjpcIuKLglwiLFwiJnhjaXJjO1wiOlwi4pevXCIsXCImeGN1cDtcIjpcIuKLg1wiLFwiJnhkdHJpO1wiOlwi4pa9XCIsXCImeGZyO1wiOlwi8J2UtVwiLFwiJnhoQXJyO1wiOlwi4p+6XCIsXCImeGhhcnI7XCI6XCLin7dcIixcIiZ4aTtcIjpcIs6+XCIsXCImeGxBcnI7XCI6XCLin7hcIixcIiZ4bGFycjtcIjpcIuKftVwiLFwiJnhtYXA7XCI6XCLin7xcIixcIiZ4bmlzO1wiOlwi4ou7XCIsXCImeG9kb3Q7XCI6XCLiqIBcIixcIiZ4b3BmO1wiOlwi8J2VqVwiLFwiJnhvcGx1cztcIjpcIuKogVwiLFwiJnhvdGltZTtcIjpcIuKoglwiLFwiJnhyQXJyO1wiOlwi4p+5XCIsXCImeHJhcnI7XCI6XCLin7ZcIixcIiZ4c2NyO1wiOlwi8J2TjVwiLFwiJnhzcWN1cDtcIjpcIuKohlwiLFwiJnh1cGx1cztcIjpcIuKohFwiLFwiJnh1dHJpO1wiOlwi4pazXCIsXCImeHZlZTtcIjpcIuKLgVwiLFwiJnh3ZWRnZTtcIjpcIuKLgFwiLFwiJnlhY3V0ZVwiOlwiw71cIixcIiZ5YWN1dGU7XCI6XCLDvVwiLFwiJnlhY3k7XCI6XCLRj1wiLFwiJnljaXJjO1wiOlwixbdcIixcIiZ5Y3k7XCI6XCLRi1wiLFwiJnllblwiOlwiwqVcIixcIiZ5ZW47XCI6XCLCpVwiLFwiJnlmcjtcIjpcIvCdlLZcIixcIiZ5aWN5O1wiOlwi0ZdcIixcIiZ5b3BmO1wiOlwi8J2VqlwiLFwiJnlzY3I7XCI6XCLwnZOOXCIsXCImeXVjeTtcIjpcItGOXCIsXCImeXVtbFwiOlwiw79cIixcIiZ5dW1sO1wiOlwiw79cIixcIiZ6YWN1dGU7XCI6XCLFulwiLFwiJnpjYXJvbjtcIjpcIsW+XCIsXCImemN5O1wiOlwi0LdcIixcIiZ6ZG90O1wiOlwixbxcIixcIiZ6ZWV0cmY7XCI6XCLihKhcIixcIiZ6ZXRhO1wiOlwizrZcIixcIiZ6ZnI7XCI6XCLwnZS3XCIsXCImemhjeTtcIjpcItC2XCIsXCImemlncmFycjtcIjpcIuKHnVwiLFwiJnpvcGY7XCI6XCLwnZWrXCIsXCImenNjcjtcIjpcIvCdk49cIixcIiZ6d2o7XCI6XCLigI1cIixcIiZ6d25qO1wiOlwi4oCMXCJ9LGNoYXJhY3RlcnM6e1wiw4ZcIjpcIiZBRWxpZztcIixcIiZcIjpcIiZhbXA7XCIsXCLDgVwiOlwiJkFhY3V0ZTtcIixcIsSCXCI6XCImQWJyZXZlO1wiLFwiw4JcIjpcIiZBY2lyYztcIixcItCQXCI6XCImQWN5O1wiLFwi8J2UhFwiOlwiJkFmcjtcIixcIsOAXCI6XCImQWdyYXZlO1wiLFwizpFcIjpcIiZBbHBoYTtcIixcIsSAXCI6XCImQW1hY3I7XCIsXCLiqZNcIjpcIiZBbmQ7XCIsXCLEhFwiOlwiJkFvZ29uO1wiLFwi8J2UuFwiOlwiJkFvcGY7XCIsXCLigaFcIjpcIiZhZjtcIixcIsOFXCI6XCImYW5nc3Q7XCIsXCLwnZKcXCI6XCImQXNjcjtcIixcIuKJlFwiOlwiJmNvbG9uZXE7XCIsXCLDg1wiOlwiJkF0aWxkZTtcIixcIsOEXCI6XCImQXVtbDtcIixcIuKIllwiOlwiJnNzZXRtbjtcIixcIuKrp1wiOlwiJkJhcnY7XCIsXCLijIZcIjpcIiZkb3VibGViYXJ3ZWRnZTtcIixcItCRXCI6XCImQmN5O1wiLFwi4oi1XCI6XCImYmVjYXVzZTtcIixcIuKErFwiOlwiJmJlcm5vdTtcIixcIs6SXCI6XCImQmV0YTtcIixcIvCdlIVcIjpcIiZCZnI7XCIsXCLwnZS5XCI6XCImQm9wZjtcIixcIsuYXCI6XCImYnJldmU7XCIsXCLiiY5cIjpcIiZidW1wO1wiLFwi0KdcIjpcIiZDSGN5O1wiLFwiwqlcIjpcIiZjb3B5O1wiLFwixIZcIjpcIiZDYWN1dGU7XCIsXCLii5JcIjpcIiZDYXA7XCIsXCLihYVcIjpcIiZERDtcIixcIuKErVwiOlwiJkNmcjtcIixcIsSMXCI6XCImQ2Nhcm9uO1wiLFwiw4dcIjpcIiZDY2VkaWw7XCIsXCLEiFwiOlwiJkNjaXJjO1wiLFwi4oiwXCI6XCImQ2NvbmludDtcIixcIsSKXCI6XCImQ2RvdDtcIixcIsK4XCI6XCImY2VkaWw7XCIsXCLCt1wiOlwiJm1pZGRvdDtcIixcIs6nXCI6XCImQ2hpO1wiLFwi4oqZXCI6XCImb2RvdDtcIixcIuKKllwiOlwiJm9taW51cztcIixcIuKKlVwiOlwiJm9wbHVzO1wiLFwi4oqXXCI6XCImb3RpbWVzO1wiLFwi4oiyXCI6XCImY3djb25pbnQ7XCIsXCLigJ1cIjpcIiZyZHF1b3I7XCIsXCLigJlcIjpcIiZyc3F1b3I7XCIsXCLiiLdcIjpcIiZQcm9wb3J0aW9uO1wiLFwi4qm0XCI6XCImQ29sb25lO1wiLFwi4omhXCI6XCImZXF1aXY7XCIsXCLiiK9cIjpcIiZEb3VibGVDb250b3VySW50ZWdyYWw7XCIsXCLiiK5cIjpcIiZvaW50O1wiLFwi4oSCXCI6XCImY29tcGxleGVzO1wiLFwi4oiQXCI6XCImY29wcm9kO1wiLFwi4oizXCI6XCImYXdjb25pbnQ7XCIsXCLiqK9cIjpcIiZDcm9zcztcIixcIvCdkp5cIjpcIiZDc2NyO1wiLFwi4ouTXCI6XCImQ3VwO1wiLFwi4omNXCI6XCImYXN5bXBlcTtcIixcIuKkkVwiOlwiJkREb3RyYWhkO1wiLFwi0IJcIjpcIiZESmN5O1wiLFwi0IVcIjpcIiZEU2N5O1wiLFwi0I9cIjpcIiZEWmN5O1wiLFwi4oChXCI6XCImZGRhZ2dlcjtcIixcIuKGoVwiOlwiJkRhcnI7XCIsXCLiq6RcIjpcIiZEb3VibGVMZWZ0VGVlO1wiLFwixI5cIjpcIiZEY2Fyb247XCIsXCLQlFwiOlwiJkRjeTtcIixcIuKIh1wiOlwiJm5hYmxhO1wiLFwizpRcIjpcIiZEZWx0YTtcIixcIvCdlIdcIjpcIiZEZnI7XCIsXCLCtFwiOlwiJmFjdXRlO1wiLFwiy5lcIjpcIiZkb3Q7XCIsXCLLnVwiOlwiJmRibGFjO1wiLFwiYFwiOlwiJmdyYXZlO1wiLFwiy5xcIjpcIiZ0aWxkZTtcIixcIuKLhFwiOlwiJmRpYW1vbmQ7XCIsXCLihYZcIjpcIiZkZDtcIixcIvCdlLtcIjpcIiZEb3BmO1wiLFwiwqhcIjpcIiZ1bWw7XCIsXCLig5xcIjpcIiZEb3REb3Q7XCIsXCLiiZBcIjpcIiZlc2RvdDtcIixcIuKHk1wiOlwiJmRBcnI7XCIsXCLih5BcIjpcIiZsQXJyO1wiLFwi4oeUXCI6XCImaWZmO1wiLFwi4p+4XCI6XCImeGxBcnI7XCIsXCLin7pcIjpcIiZ4aEFycjtcIixcIuKfuVwiOlwiJnhyQXJyO1wiLFwi4oeSXCI6XCImckFycjtcIixcIuKKqFwiOlwiJnZEYXNoO1wiLFwi4oeRXCI6XCImdUFycjtcIixcIuKHlVwiOlwiJnZBcnI7XCIsXCLiiKVcIjpcIiZzcGFyO1wiLFwi4oaTXCI6XCImZG93bmFycm93O1wiLFwi4qSTXCI6XCImRG93bkFycm93QmFyO1wiLFwi4oe1XCI6XCImZHVhcnI7XCIsXCLMkVwiOlwiJkRvd25CcmV2ZTtcIixcIuKlkFwiOlwiJkRvd25MZWZ0UmlnaHRWZWN0b3I7XCIsXCLipZ5cIjpcIiZEb3duTGVmdFRlZVZlY3RvcjtcIixcIuKGvVwiOlwiJmxoYXJkO1wiLFwi4qWWXCI6XCImRG93bkxlZnRWZWN0b3JCYXI7XCIsXCLipZ9cIjpcIiZEb3duUmlnaHRUZWVWZWN0b3I7XCIsXCLih4FcIjpcIiZyaWdodGhhcnBvb25kb3duO1wiLFwi4qWXXCI6XCImRG93blJpZ2h0VmVjdG9yQmFyO1wiLFwi4oqkXCI6XCImdG9wO1wiLFwi4oanXCI6XCImbWFwc3RvZG93bjtcIixcIvCdkp9cIjpcIiZEc2NyO1wiLFwixJBcIjpcIiZEc3Ryb2s7XCIsXCLFilwiOlwiJkVORztcIixcIsOQXCI6XCImRVRIO1wiLFwiw4lcIjpcIiZFYWN1dGU7XCIsXCLEmlwiOlwiJkVjYXJvbjtcIixcIsOKXCI6XCImRWNpcmM7XCIsXCLQrVwiOlwiJkVjeTtcIixcIsSWXCI6XCImRWRvdDtcIixcIvCdlIhcIjpcIiZFZnI7XCIsXCLDiFwiOlwiJkVncmF2ZTtcIixcIuKIiFwiOlwiJmlzaW52O1wiLFwixJJcIjpcIiZFbWFjcjtcIixcIuKXu1wiOlwiJkVtcHR5U21hbGxTcXVhcmU7XCIsXCLilqtcIjpcIiZFbXB0eVZlcnlTbWFsbFNxdWFyZTtcIixcIsSYXCI6XCImRW9nb247XCIsXCLwnZS8XCI6XCImRW9wZjtcIixcIs6VXCI6XCImRXBzaWxvbjtcIixcIuKptVwiOlwiJkVxdWFsO1wiLFwi4omCXCI6XCImZXNpbTtcIixcIuKHjFwiOlwiJnJsaGFyO1wiLFwi4oSwXCI6XCImZXhwZWN0YXRpb247XCIsXCLiqbNcIjpcIiZFc2ltO1wiLFwizpdcIjpcIiZFdGE7XCIsXCLDi1wiOlwiJkV1bWw7XCIsXCLiiINcIjpcIiZleGlzdDtcIixcIuKFh1wiOlwiJmV4cG9uZW50aWFsZTtcIixcItCkXCI6XCImRmN5O1wiLFwi8J2UiVwiOlwiJkZmcjtcIixcIuKXvFwiOlwiJkZpbGxlZFNtYWxsU3F1YXJlO1wiLFwi4paqXCI6XCImc3F1ZjtcIixcIvCdlL1cIjpcIiZGb3BmO1wiLFwi4oiAXCI6XCImZm9yYWxsO1wiLFwi4oSxXCI6XCImRnNjcjtcIixcItCDXCI6XCImR0pjeTtcIixcIj5cIjpcIiZndDtcIixcIs6TXCI6XCImR2FtbWE7XCIsXCLPnFwiOlwiJkdhbW1hZDtcIixcIsSeXCI6XCImR2JyZXZlO1wiLFwixKJcIjpcIiZHY2VkaWw7XCIsXCLEnFwiOlwiJkdjaXJjO1wiLFwi0JNcIjpcIiZHY3k7XCIsXCLEoFwiOlwiJkdkb3Q7XCIsXCLwnZSKXCI6XCImR2ZyO1wiLFwi4ouZXCI6XCImZ2dnO1wiLFwi8J2UvlwiOlwiJkdvcGY7XCIsXCLiiaVcIjpcIiZnZXE7XCIsXCLii5tcIjpcIiZndHJlcWxlc3M7XCIsXCLiiadcIjpcIiZnZXFxO1wiLFwi4qqiXCI6XCImR3JlYXRlckdyZWF0ZXI7XCIsXCLiibdcIjpcIiZndHJsZXNzO1wiLFwi4qm+XCI6XCImZ2VzO1wiLFwi4omzXCI6XCImZ3Ryc2ltO1wiLFwi8J2SolwiOlwiJkdzY3I7XCIsXCLiiatcIjpcIiZnZztcIixcItCqXCI6XCImSEFSRGN5O1wiLFwiy4dcIjpcIiZjYXJvbjtcIixcIl5cIjpcIiZIYXQ7XCIsXCLEpFwiOlwiJkhjaXJjO1wiLFwi4oSMXCI6XCImUG9pbmNhcmVwbGFuZTtcIixcIuKEi1wiOlwiJmhhbWlsdDtcIixcIuKEjVwiOlwiJnF1YXRlcm5pb25zO1wiLFwi4pSAXCI6XCImYm94aDtcIixcIsSmXCI6XCImSHN0cm9rO1wiLFwi4omPXCI6XCImYnVtcGVxO1wiLFwi0JVcIjpcIiZJRWN5O1wiLFwixLJcIjpcIiZJSmxpZztcIixcItCBXCI6XCImSU9jeTtcIixcIsONXCI6XCImSWFjdXRlO1wiLFwiw45cIjpcIiZJY2lyYztcIixcItCYXCI6XCImSWN5O1wiLFwixLBcIjpcIiZJZG90O1wiLFwi4oSRXCI6XCImaW1hZ3BhcnQ7XCIsXCLDjFwiOlwiJklncmF2ZTtcIixcIsSqXCI6XCImSW1hY3I7XCIsXCLihYhcIjpcIiZpaTtcIixcIuKIrFwiOlwiJkludDtcIixcIuKIq1wiOlwiJmludDtcIixcIuKLglwiOlwiJnhjYXA7XCIsXCLigaNcIjpcIiZpYztcIixcIuKBolwiOlwiJml0O1wiLFwixK5cIjpcIiZJb2dvbjtcIixcIvCdlYBcIjpcIiZJb3BmO1wiLFwizplcIjpcIiZJb3RhO1wiLFwi4oSQXCI6XCImaW1hZ2xpbmU7XCIsXCLEqFwiOlwiJkl0aWxkZTtcIixcItCGXCI6XCImSXVrY3k7XCIsXCLDj1wiOlwiJkl1bWw7XCIsXCLEtFwiOlwiJkpjaXJjO1wiLFwi0JlcIjpcIiZKY3k7XCIsXCLwnZSNXCI6XCImSmZyO1wiLFwi8J2VgVwiOlwiJkpvcGY7XCIsXCLwnZKlXCI6XCImSnNjcjtcIixcItCIXCI6XCImSnNlcmN5O1wiLFwi0IRcIjpcIiZKdWtjeTtcIixcItClXCI6XCImS0hjeTtcIixcItCMXCI6XCImS0pjeTtcIixcIs6aXCI6XCImS2FwcGE7XCIsXCLEtlwiOlwiJktjZWRpbDtcIixcItCaXCI6XCImS2N5O1wiLFwi8J2UjlwiOlwiJktmcjtcIixcIvCdlYJcIjpcIiZLb3BmO1wiLFwi8J2SplwiOlwiJktzY3I7XCIsXCLQiVwiOlwiJkxKY3k7XCIsXCI8XCI6XCImbHQ7XCIsXCLEuVwiOlwiJkxhY3V0ZTtcIixcIs6bXCI6XCImTGFtYmRhO1wiLFwi4p+qXCI6XCImTGFuZztcIixcIuKEklwiOlwiJmxhZ3JhbjtcIixcIuKGnlwiOlwiJnR3b2hlYWRsZWZ0YXJyb3c7XCIsXCLEvVwiOlwiJkxjYXJvbjtcIixcIsS7XCI6XCImTGNlZGlsO1wiLFwi0JtcIjpcIiZMY3k7XCIsXCLin6hcIjpcIiZsYW5nbGU7XCIsXCLihpBcIjpcIiZzbGFycjtcIixcIuKHpFwiOlwiJmxhcnJiO1wiLFwi4oeGXCI6XCImbHJhcnI7XCIsXCLijIhcIjpcIiZsY2VpbDtcIixcIuKfplwiOlwiJmxvYnJrO1wiLFwi4qWhXCI6XCImTGVmdERvd25UZWVWZWN0b3I7XCIsXCLih4NcIjpcIiZkb3duaGFycG9vbmxlZnQ7XCIsXCLipZlcIjpcIiZMZWZ0RG93blZlY3RvckJhcjtcIixcIuKMilwiOlwiJmxmbG9vcjtcIixcIuKGlFwiOlwiJmxlZnRyaWdodGFycm93O1wiLFwi4qWOXCI6XCImTGVmdFJpZ2h0VmVjdG9yO1wiLFwi4oqjXCI6XCImZGFzaHY7XCIsXCLihqRcIjpcIiZtYXBzdG9sZWZ0O1wiLFwi4qWaXCI6XCImTGVmdFRlZVZlY3RvcjtcIixcIuKKslwiOlwiJnZsdHJpO1wiLFwi4qePXCI6XCImTGVmdFRyaWFuZ2xlQmFyO1wiLFwi4oq0XCI6XCImdHJpYW5nbGVsZWZ0ZXE7XCIsXCLipZFcIjpcIiZMZWZ0VXBEb3duVmVjdG9yO1wiLFwi4qWgXCI6XCImTGVmdFVwVGVlVmVjdG9yO1wiLFwi4oa/XCI6XCImdXBoYXJwb29ubGVmdDtcIixcIuKlmFwiOlwiJkxlZnRVcFZlY3RvckJhcjtcIixcIuKGvFwiOlwiJmxoYXJ1O1wiLFwi4qWSXCI6XCImTGVmdFZlY3RvckJhcjtcIixcIuKLmlwiOlwiJmxlc3NlcWd0cjtcIixcIuKJplwiOlwiJmxlcXE7XCIsXCLiibZcIjpcIiZsZztcIixcIuKqoVwiOlwiJkxlc3NMZXNzO1wiLFwi4qm9XCI6XCImbGVzO1wiLFwi4omyXCI6XCImbHNpbTtcIixcIvCdlI9cIjpcIiZMZnI7XCIsXCLii5hcIjpcIiZMbDtcIixcIuKHmlwiOlwiJmxBYXJyO1wiLFwixL9cIjpcIiZMbWlkb3Q7XCIsXCLin7VcIjpcIiZ4bGFycjtcIixcIuKft1wiOlwiJnhoYXJyO1wiLFwi4p+2XCI6XCImeHJhcnI7XCIsXCLwnZWDXCI6XCImTG9wZjtcIixcIuKGmVwiOlwiJnN3YXJyb3c7XCIsXCLihphcIjpcIiZzZWFycm93O1wiLFwi4oawXCI6XCImbHNoO1wiLFwixYFcIjpcIiZMc3Ryb2s7XCIsXCLiiapcIjpcIiZsbDtcIixcIuKkhVwiOlwiJk1hcDtcIixcItCcXCI6XCImTWN5O1wiLFwi4oGfXCI6XCImTWVkaXVtU3BhY2U7XCIsXCLihLNcIjpcIiZwaG1tYXQ7XCIsXCLwnZSQXCI6XCImTWZyO1wiLFwi4oiTXCI6XCImbXA7XCIsXCLwnZWEXCI6XCImTW9wZjtcIixcIs6cXCI6XCImTXU7XCIsXCLQilwiOlwiJk5KY3k7XCIsXCLFg1wiOlwiJk5hY3V0ZTtcIixcIsWHXCI6XCImTmNhcm9uO1wiLFwixYVcIjpcIiZOY2VkaWw7XCIsXCLQnVwiOlwiJk5jeTtcIixcIuKAi1wiOlwiJlplcm9XaWR0aFNwYWNlO1wiLFwiXFxuXCI6XCImTmV3TGluZTtcIixcIvCdlJFcIjpcIiZOZnI7XCIsXCLigaBcIjpcIiZOb0JyZWFrO1wiLFwiwqBcIjpcIiZuYnNwO1wiLFwi4oSVXCI6XCImbmF0dXJhbHM7XCIsXCLiq6xcIjpcIiZOb3Q7XCIsXCLiiaJcIjpcIiZuZXF1aXY7XCIsXCLiia1cIjpcIiZOb3RDdXBDYXA7XCIsXCLiiKZcIjpcIiZuc3BhcjtcIixcIuKIiVwiOlwiJm5vdGludmE7XCIsXCLiiaBcIjpcIiZuZTtcIixcIuKJgsy4XCI6XCImbmVzaW07XCIsXCLiiIRcIjpcIiZuZXhpc3RzO1wiLFwi4omvXCI6XCImbmd0cjtcIixcIuKJsVwiOlwiJm5nZXE7XCIsXCLiiafMuFwiOlwiJm5nZXFxO1wiLFwi4omrzLhcIjpcIiZuR3R2O1wiLFwi4om5XCI6XCImbnRnbDtcIixcIuKpvsy4XCI6XCImbmdlcztcIixcIuKJtVwiOlwiJm5nc2ltO1wiLFwi4omOzLhcIjpcIiZuYnVtcDtcIixcIuKJj8y4XCI6XCImbmJ1bXBlO1wiLFwi4ouqXCI6XCImbnRyaWFuZ2xlbGVmdDtcIixcIuKnj8y4XCI6XCImTm90TGVmdFRyaWFuZ2xlQmFyO1wiLFwi4ousXCI6XCImbnRyaWFuZ2xlbGVmdGVxO1wiLFwi4omuXCI6XCImbmx0O1wiLFwi4omwXCI6XCImbmxlcTtcIixcIuKJuFwiOlwiJm50bGc7XCIsXCLiiarMuFwiOlwiJm5MdHY7XCIsXCLiqb3MuFwiOlwiJm5sZXM7XCIsXCLiibRcIjpcIiZubHNpbTtcIixcIuKqosy4XCI6XCImTm90TmVzdGVkR3JlYXRlckdyZWF0ZXI7XCIsXCLiqqHMuFwiOlwiJk5vdE5lc3RlZExlc3NMZXNzO1wiLFwi4oqAXCI6XCImbnByZWM7XCIsXCLiqq/MuFwiOlwiJm5wcmVjZXE7XCIsXCLii6BcIjpcIiZucHJjdWU7XCIsXCLiiIxcIjpcIiZub3RuaXZhO1wiLFwi4ourXCI6XCImbnRyaWFuZ2xlcmlnaHQ7XCIsXCLip5DMuFwiOlwiJk5vdFJpZ2h0VHJpYW5nbGVCYXI7XCIsXCLii61cIjpcIiZudHJpYW5nbGVyaWdodGVxO1wiLFwi4oqPzLhcIjpcIiZOb3RTcXVhcmVTdWJzZXQ7XCIsXCLii6JcIjpcIiZuc3FzdWJlO1wiLFwi4oqQzLhcIjpcIiZOb3RTcXVhcmVTdXBlcnNldDtcIixcIuKLo1wiOlwiJm5zcXN1cGU7XCIsXCLiioLig5JcIjpcIiZ2bnN1YjtcIixcIuKKiFwiOlwiJm5zdWJzZXRlcTtcIixcIuKKgVwiOlwiJm5zdWNjO1wiLFwi4qqwzLhcIjpcIiZuc3VjY2VxO1wiLFwi4ouhXCI6XCImbnNjY3VlO1wiLFwi4om/zLhcIjpcIiZOb3RTdWNjZWVkc1RpbGRlO1wiLFwi4oqD4oOSXCI6XCImdm5zdXA7XCIsXCLiiolcIjpcIiZuc3Vwc2V0ZXE7XCIsXCLiiYFcIjpcIiZuc2ltO1wiLFwi4omEXCI6XCImbnNpbWVxO1wiLFwi4omHXCI6XCImbmNvbmc7XCIsXCLiiYlcIjpcIiZuYXBwcm94O1wiLFwi4oikXCI6XCImbnNtaWQ7XCIsXCLwnZKpXCI6XCImTnNjcjtcIixcIsORXCI6XCImTnRpbGRlO1wiLFwizp1cIjpcIiZOdTtcIixcIsWSXCI6XCImT0VsaWc7XCIsXCLDk1wiOlwiJk9hY3V0ZTtcIixcIsOUXCI6XCImT2NpcmM7XCIsXCLQnlwiOlwiJk9jeTtcIixcIsWQXCI6XCImT2RibGFjO1wiLFwi8J2UklwiOlwiJk9mcjtcIixcIsOSXCI6XCImT2dyYXZlO1wiLFwixYxcIjpcIiZPbWFjcjtcIixcIs6pXCI6XCImb2htO1wiLFwizp9cIjpcIiZPbWljcm9uO1wiLFwi8J2VhlwiOlwiJk9vcGY7XCIsXCLigJxcIjpcIiZsZHF1bztcIixcIuKAmFwiOlwiJmxzcXVvO1wiLFwi4qmUXCI6XCImT3I7XCIsXCLwnZKqXCI6XCImT3NjcjtcIixcIsOYXCI6XCImT3NsYXNoO1wiLFwiw5VcIjpcIiZPdGlsZGU7XCIsXCLiqLdcIjpcIiZPdGltZXM7XCIsXCLDllwiOlwiJk91bWw7XCIsXCLigL5cIjpcIiZvbGluZTtcIixcIuKPnlwiOlwiJk92ZXJCcmFjZTtcIixcIuKOtFwiOlwiJnRicms7XCIsXCLij5xcIjpcIiZPdmVyUGFyZW50aGVzaXM7XCIsXCLiiIJcIjpcIiZwYXJ0O1wiLFwi0J9cIjpcIiZQY3k7XCIsXCLwnZSTXCI6XCImUGZyO1wiLFwizqZcIjpcIiZQaGk7XCIsXCLOoFwiOlwiJlBpO1wiLFwiwrFcIjpcIiZwbTtcIixcIuKEmVwiOlwiJnByaW1lcztcIixcIuKqu1wiOlwiJlByO1wiLFwi4om6XCI6XCImcHJlYztcIixcIuKqr1wiOlwiJnByZWNlcTtcIixcIuKJvFwiOlwiJnByZWNjdXJseWVxO1wiLFwi4om+XCI6XCImcHJzaW07XCIsXCLigLNcIjpcIiZQcmltZTtcIixcIuKIj1wiOlwiJnByb2Q7XCIsXCLiiJ1cIjpcIiZ2cHJvcDtcIixcIvCdkqtcIjpcIiZQc2NyO1wiLFwizqhcIjpcIiZQc2k7XCIsJ1wiJzpcIiZxdW90O1wiLFwi8J2UlFwiOlwiJlFmcjtcIixcIuKEmlwiOlwiJnJhdGlvbmFscztcIixcIvCdkqxcIjpcIiZRc2NyO1wiLFwi4qSQXCI6XCImZHJia2Fyb3c7XCIsXCLCrlwiOlwiJnJlZztcIixcIsWUXCI6XCImUmFjdXRlO1wiLFwi4p+rXCI6XCImUmFuZztcIixcIuKGoFwiOlwiJnR3b2hlYWRyaWdodGFycm93O1wiLFwi4qSWXCI6XCImUmFycnRsO1wiLFwixZhcIjpcIiZSY2Fyb247XCIsXCLFllwiOlwiJlJjZWRpbDtcIixcItCgXCI6XCImUmN5O1wiLFwi4oScXCI6XCImcmVhbHBhcnQ7XCIsXCLiiItcIjpcIiZuaXY7XCIsXCLih4tcIjpcIiZscmhhcjtcIixcIuKlr1wiOlwiJmR1aGFyO1wiLFwizqFcIjpcIiZSaG87XCIsXCLin6lcIjpcIiZyYW5nbGU7XCIsXCLihpJcIjpcIiZzcmFycjtcIixcIuKHpVwiOlwiJnJhcnJiO1wiLFwi4oeEXCI6XCImcmxhcnI7XCIsXCLijIlcIjpcIiZyY2VpbDtcIixcIuKfp1wiOlwiJnJvYnJrO1wiLFwi4qWdXCI6XCImUmlnaHREb3duVGVlVmVjdG9yO1wiLFwi4oeCXCI6XCImZG93bmhhcnBvb25yaWdodDtcIixcIuKllVwiOlwiJlJpZ2h0RG93blZlY3RvckJhcjtcIixcIuKMi1wiOlwiJnJmbG9vcjtcIixcIuKKolwiOlwiJnZkYXNoO1wiLFwi4oamXCI6XCImbWFwc3RvO1wiLFwi4qWbXCI6XCImUmlnaHRUZWVWZWN0b3I7XCIsXCLiirNcIjpcIiZ2cnRyaTtcIixcIuKnkFwiOlwiJlJpZ2h0VHJpYW5nbGVCYXI7XCIsXCLiirVcIjpcIiZ0cmlhbmdsZXJpZ2h0ZXE7XCIsXCLipY9cIjpcIiZSaWdodFVwRG93blZlY3RvcjtcIixcIuKlnFwiOlwiJlJpZ2h0VXBUZWVWZWN0b3I7XCIsXCLihr5cIjpcIiZ1cGhhcnBvb25yaWdodDtcIixcIuKllFwiOlwiJlJpZ2h0VXBWZWN0b3JCYXI7XCIsXCLih4BcIjpcIiZyaWdodGhhcnBvb251cDtcIixcIuKlk1wiOlwiJlJpZ2h0VmVjdG9yQmFyO1wiLFwi4oSdXCI6XCImcmVhbHM7XCIsXCLipbBcIjpcIiZSb3VuZEltcGxpZXM7XCIsXCLih5tcIjpcIiZyQWFycjtcIixcIuKEm1wiOlwiJnJlYWxpbmU7XCIsXCLihrFcIjpcIiZyc2g7XCIsXCLip7RcIjpcIiZSdWxlRGVsYXllZDtcIixcItCpXCI6XCImU0hDSGN5O1wiLFwi0KhcIjpcIiZTSGN5O1wiLFwi0KxcIjpcIiZTT0ZUY3k7XCIsXCLFmlwiOlwiJlNhY3V0ZTtcIixcIuKqvFwiOlwiJlNjO1wiLFwixaBcIjpcIiZTY2Fyb247XCIsXCLFnlwiOlwiJlNjZWRpbDtcIixcIsWcXCI6XCImU2NpcmM7XCIsXCLQoVwiOlwiJlNjeTtcIixcIvCdlJZcIjpcIiZTZnI7XCIsXCLihpFcIjpcIiZ1cGFycm93O1wiLFwizqNcIjpcIiZTaWdtYTtcIixcIuKImFwiOlwiJmNvbXBmbjtcIixcIvCdlYpcIjpcIiZTb3BmO1wiLFwi4oiaXCI6XCImcmFkaWM7XCIsXCLilqFcIjpcIiZzcXVhcmU7XCIsXCLiipNcIjpcIiZzcWNhcDtcIixcIuKKj1wiOlwiJnNxc3Vic2V0O1wiLFwi4oqRXCI6XCImc3FzdWJzZXRlcTtcIixcIuKKkFwiOlwiJnNxc3Vwc2V0O1wiLFwi4oqSXCI6XCImc3FzdXBzZXRlcTtcIixcIuKKlFwiOlwiJnNxY3VwO1wiLFwi8J2SrlwiOlwiJlNzY3I7XCIsXCLii4ZcIjpcIiZzc3RhcmY7XCIsXCLii5BcIjpcIiZTdWJzZXQ7XCIsXCLiioZcIjpcIiZzdWJzZXRlcTtcIixcIuKJu1wiOlwiJnN1Y2M7XCIsXCLiqrBcIjpcIiZzdWNjZXE7XCIsXCLiib1cIjpcIiZzdWNjY3VybHllcTtcIixcIuKJv1wiOlwiJnN1Y2NzaW07XCIsXCLiiJFcIjpcIiZzdW07XCIsXCLii5FcIjpcIiZTdXBzZXQ7XCIsXCLiioNcIjpcIiZzdXBzZXQ7XCIsXCLiiodcIjpcIiZzdXBzZXRlcTtcIixcIsOeXCI6XCImVEhPUk47XCIsXCLihKJcIjpcIiZ0cmFkZTtcIixcItCLXCI6XCImVFNIY3k7XCIsXCLQplwiOlwiJlRTY3k7XCIsXCJcXHRcIjpcIiZUYWI7XCIsXCLOpFwiOlwiJlRhdTtcIixcIsWkXCI6XCImVGNhcm9uO1wiLFwixaJcIjpcIiZUY2VkaWw7XCIsXCLQolwiOlwiJlRjeTtcIixcIvCdlJdcIjpcIiZUZnI7XCIsXCLiiLRcIjpcIiZ0aGVyZWZvcmU7XCIsXCLOmFwiOlwiJlRoZXRhO1wiLFwi4oGf4oCKXCI6XCImVGhpY2tTcGFjZTtcIixcIuKAiVwiOlwiJnRoaW5zcDtcIixcIuKIvFwiOlwiJnRoa3NpbTtcIixcIuKJg1wiOlwiJnNpbWVxO1wiLFwi4omFXCI6XCImY29uZztcIixcIuKJiFwiOlwiJnRoa2FwO1wiLFwi8J2Vi1wiOlwiJlRvcGY7XCIsXCLig5tcIjpcIiZ0ZG90O1wiLFwi8J2Sr1wiOlwiJlRzY3I7XCIsXCLFplwiOlwiJlRzdHJvaztcIixcIsOaXCI6XCImVWFjdXRlO1wiLFwi4oafXCI6XCImVWFycjtcIixcIuKliVwiOlwiJlVhcnJvY2lyO1wiLFwi0I5cIjpcIiZVYnJjeTtcIixcIsWsXCI6XCImVWJyZXZlO1wiLFwiw5tcIjpcIiZVY2lyYztcIixcItCjXCI6XCImVWN5O1wiLFwixbBcIjpcIiZVZGJsYWM7XCIsXCLwnZSYXCI6XCImVWZyO1wiLFwiw5lcIjpcIiZVZ3JhdmU7XCIsXCLFqlwiOlwiJlVtYWNyO1wiLF86XCImbG93YmFyO1wiLFwi4o+fXCI6XCImVW5kZXJCcmFjZTtcIixcIuKOtVwiOlwiJmJicms7XCIsXCLij51cIjpcIiZVbmRlclBhcmVudGhlc2lzO1wiLFwi4ouDXCI6XCImeGN1cDtcIixcIuKKjlwiOlwiJnVwbHVzO1wiLFwixbJcIjpcIiZVb2dvbjtcIixcIvCdlYxcIjpcIiZVb3BmO1wiLFwi4qSSXCI6XCImVXBBcnJvd0JhcjtcIixcIuKHhVwiOlwiJnVkYXJyO1wiLFwi4oaVXCI6XCImdmFycjtcIixcIuKlrlwiOlwiJnVkaGFyO1wiLFwi4oqlXCI6XCImcGVycDtcIixcIuKGpVwiOlwiJm1hcHN0b3VwO1wiLFwi4oaWXCI6XCImbndhcnJvdztcIixcIuKGl1wiOlwiJm5lYXJyb3c7XCIsXCLPklwiOlwiJnVwc2loO1wiLFwizqVcIjpcIiZVcHNpbG9uO1wiLFwixa5cIjpcIiZVcmluZztcIixcIvCdkrBcIjpcIiZVc2NyO1wiLFwixahcIjpcIiZVdGlsZGU7XCIsXCLDnFwiOlwiJlV1bWw7XCIsXCLiiqtcIjpcIiZWRGFzaDtcIixcIuKrq1wiOlwiJlZiYXI7XCIsXCLQklwiOlwiJlZjeTtcIixcIuKKqVwiOlwiJlZkYXNoO1wiLFwi4qumXCI6XCImVmRhc2hsO1wiLFwi4ouBXCI6XCImeHZlZTtcIixcIuKAllwiOlwiJlZlcnQ7XCIsXCLiiKNcIjpcIiZzbWlkO1wiLFwifFwiOlwiJnZlcnQ7XCIsXCLinZhcIjpcIiZWZXJ0aWNhbFNlcGFyYXRvcjtcIixcIuKJgFwiOlwiJndyZWF0aDtcIixcIuKAilwiOlwiJmhhaXJzcDtcIixcIvCdlJlcIjpcIiZWZnI7XCIsXCLwnZWNXCI6XCImVm9wZjtcIixcIvCdkrFcIjpcIiZWc2NyO1wiLFwi4oqqXCI6XCImVnZkYXNoO1wiLFwixbRcIjpcIiZXY2lyYztcIixcIuKLgFwiOlwiJnh3ZWRnZTtcIixcIvCdlJpcIjpcIiZXZnI7XCIsXCLwnZWOXCI6XCImV29wZjtcIixcIvCdkrJcIjpcIiZXc2NyO1wiLFwi8J2Um1wiOlwiJlhmcjtcIixcIs6eXCI6XCImWGk7XCIsXCLwnZWPXCI6XCImWG9wZjtcIixcIvCdkrNcIjpcIiZYc2NyO1wiLFwi0K9cIjpcIiZZQWN5O1wiLFwi0IdcIjpcIiZZSWN5O1wiLFwi0K5cIjpcIiZZVWN5O1wiLFwiw51cIjpcIiZZYWN1dGU7XCIsXCLFtlwiOlwiJlljaXJjO1wiLFwi0KtcIjpcIiZZY3k7XCIsXCLwnZScXCI6XCImWWZyO1wiLFwi8J2VkFwiOlwiJllvcGY7XCIsXCLwnZK0XCI6XCImWXNjcjtcIixcIsW4XCI6XCImWXVtbDtcIixcItCWXCI6XCImWkhjeTtcIixcIsW5XCI6XCImWmFjdXRlO1wiLFwixb1cIjpcIiZaY2Fyb247XCIsXCLQl1wiOlwiJlpjeTtcIixcIsW7XCI6XCImWmRvdDtcIixcIs6WXCI6XCImWmV0YTtcIixcIuKEqFwiOlwiJnplZXRyZjtcIixcIuKEpFwiOlwiJmludGVnZXJzO1wiLFwi8J2StVwiOlwiJlpzY3I7XCIsXCLDoVwiOlwiJmFhY3V0ZTtcIixcIsSDXCI6XCImYWJyZXZlO1wiLFwi4oi+XCI6XCImbXN0cG9zO1wiLFwi4oi+zLNcIjpcIiZhY0U7XCIsXCLiiL9cIjpcIiZhY2Q7XCIsXCLDolwiOlwiJmFjaXJjO1wiLFwi0LBcIjpcIiZhY3k7XCIsXCLDplwiOlwiJmFlbGlnO1wiLFwi8J2UnlwiOlwiJmFmcjtcIixcIsOgXCI6XCImYWdyYXZlO1wiLFwi4oS1XCI6XCImYWxlcGg7XCIsXCLOsVwiOlwiJmFscGhhO1wiLFwixIFcIjpcIiZhbWFjcjtcIixcIuKov1wiOlwiJmFtYWxnO1wiLFwi4oinXCI6XCImd2VkZ2U7XCIsXCLiqZVcIjpcIiZhbmRhbmQ7XCIsXCLiqZxcIjpcIiZhbmRkO1wiLFwi4qmYXCI6XCImYW5kc2xvcGU7XCIsXCLiqZpcIjpcIiZhbmR2O1wiLFwi4oigXCI6XCImYW5nbGU7XCIsXCLipqRcIjpcIiZhbmdlO1wiLFwi4oihXCI6XCImbWVhc3VyZWRhbmdsZTtcIixcIuKmqFwiOlwiJmFuZ21zZGFhO1wiLFwi4qapXCI6XCImYW5nbXNkYWI7XCIsXCLipqpcIjpcIiZhbmdtc2RhYztcIixcIuKmq1wiOlwiJmFuZ21zZGFkO1wiLFwi4qasXCI6XCImYW5nbXNkYWU7XCIsXCLipq1cIjpcIiZhbmdtc2RhZjtcIixcIuKmrlwiOlwiJmFuZ21zZGFnO1wiLFwi4qavXCI6XCImYW5nbXNkYWg7XCIsXCLiiJ9cIjpcIiZhbmdydDtcIixcIuKKvlwiOlwiJmFuZ3J0dmI7XCIsXCLipp1cIjpcIiZhbmdydHZiZDtcIixcIuKIolwiOlwiJmFuZ3NwaDtcIixcIuKNvFwiOlwiJmFuZ3phcnI7XCIsXCLEhVwiOlwiJmFvZ29uO1wiLFwi8J2VklwiOlwiJmFvcGY7XCIsXCLiqbBcIjpcIiZhcEU7XCIsXCLiqa9cIjpcIiZhcGFjaXI7XCIsXCLiiYpcIjpcIiZhcHByb3hlcTtcIixcIuKJi1wiOlwiJmFwaWQ7XCIsXCInXCI6XCImYXBvcztcIixcIsOlXCI6XCImYXJpbmc7XCIsXCLwnZK2XCI6XCImYXNjcjtcIixcIipcIjpcIiZtaWRhc3Q7XCIsXCLDo1wiOlwiJmF0aWxkZTtcIixcIsOkXCI6XCImYXVtbDtcIixcIuKokVwiOlwiJmF3aW50O1wiLFwi4qutXCI6XCImYk5vdDtcIixcIuKJjFwiOlwiJmJjb25nO1wiLFwiz7ZcIjpcIiZiZXBzaTtcIixcIuKAtVwiOlwiJmJwcmltZTtcIixcIuKIvVwiOlwiJmJzaW07XCIsXCLii41cIjpcIiZic2ltZTtcIixcIuKKvVwiOlwiJmJhcnZlZTtcIixcIuKMhVwiOlwiJmJhcndlZGdlO1wiLFwi4o62XCI6XCImYmJya3Ricms7XCIsXCLQsVwiOlwiJmJjeTtcIixcIuKAnlwiOlwiJmxkcXVvcjtcIixcIuKmsFwiOlwiJmJlbXB0eXY7XCIsXCLOslwiOlwiJmJldGE7XCIsXCLihLZcIjpcIiZiZXRoO1wiLFwi4omsXCI6XCImdHdpeHQ7XCIsXCLwnZSfXCI6XCImYmZyO1wiLFwi4pevXCI6XCImeGNpcmM7XCIsXCLiqIBcIjpcIiZ4b2RvdDtcIixcIuKogVwiOlwiJnhvcGx1cztcIixcIuKoglwiOlwiJnhvdGltZTtcIixcIuKohlwiOlwiJnhzcWN1cDtcIixcIuKYhVwiOlwiJnN0YXJmO1wiLFwi4pa9XCI6XCImeGR0cmk7XCIsXCLilrNcIjpcIiZ4dXRyaTtcIixcIuKohFwiOlwiJnh1cGx1cztcIixcIuKkjVwiOlwiJnJiYXJyO1wiLFwi4qerXCI6XCImbG96ZjtcIixcIuKWtFwiOlwiJnV0cmlmO1wiLFwi4pa+XCI6XCImZHRyaWY7XCIsXCLil4JcIjpcIiZsdHJpZjtcIixcIuKWuFwiOlwiJnJ0cmlmO1wiLFwi4pCjXCI6XCImYmxhbms7XCIsXCLilpJcIjpcIiZibGsxMjtcIixcIuKWkVwiOlwiJmJsazE0O1wiLFwi4paTXCI6XCImYmxrMzQ7XCIsXCLilohcIjpcIiZibG9jaztcIixcIj3ig6VcIjpcIiZibmU7XCIsXCLiiaHig6VcIjpcIiZibmVxdWl2O1wiLFwi4oyQXCI6XCImYm5vdDtcIixcIvCdlZNcIjpcIiZib3BmO1wiLFwi4ouIXCI6XCImYm93dGllO1wiLFwi4pWXXCI6XCImYm94REw7XCIsXCLilZRcIjpcIiZib3hEUjtcIixcIuKVllwiOlwiJmJveERsO1wiLFwi4pWTXCI6XCImYm94RHI7XCIsXCLilZBcIjpcIiZib3hIO1wiLFwi4pWmXCI6XCImYm94SEQ7XCIsXCLilalcIjpcIiZib3hIVTtcIixcIuKVpFwiOlwiJmJveEhkO1wiLFwi4pWnXCI6XCImYm94SHU7XCIsXCLilZ1cIjpcIiZib3hVTDtcIixcIuKVmlwiOlwiJmJveFVSO1wiLFwi4pWcXCI6XCImYm94VWw7XCIsXCLilZlcIjpcIiZib3hVcjtcIixcIuKVkVwiOlwiJmJveFY7XCIsXCLilaxcIjpcIiZib3hWSDtcIixcIuKVo1wiOlwiJmJveFZMO1wiLFwi4pWgXCI6XCImYm94VlI7XCIsXCLilatcIjpcIiZib3hWaDtcIixcIuKVolwiOlwiJmJveFZsO1wiLFwi4pWfXCI6XCImYm94VnI7XCIsXCLip4lcIjpcIiZib3hib3g7XCIsXCLilZVcIjpcIiZib3hkTDtcIixcIuKVklwiOlwiJmJveGRSO1wiLFwi4pSQXCI6XCImYm94ZGw7XCIsXCLilIxcIjpcIiZib3hkcjtcIixcIuKVpVwiOlwiJmJveGhEO1wiLFwi4pWoXCI6XCImYm94aFU7XCIsXCLilKxcIjpcIiZib3hoZDtcIixcIuKUtFwiOlwiJmJveGh1O1wiLFwi4oqfXCI6XCImbWludXNiO1wiLFwi4oqeXCI6XCImcGx1c2I7XCIsXCLiiqBcIjpcIiZ0aW1lc2I7XCIsXCLilZtcIjpcIiZib3h1TDtcIixcIuKVmFwiOlwiJmJveHVSO1wiLFwi4pSYXCI6XCImYm94dWw7XCIsXCLilJRcIjpcIiZib3h1cjtcIixcIuKUglwiOlwiJmJveHY7XCIsXCLilapcIjpcIiZib3h2SDtcIixcIuKVoVwiOlwiJmJveHZMO1wiLFwi4pWeXCI6XCImYm94dlI7XCIsXCLilLxcIjpcIiZib3h2aDtcIixcIuKUpFwiOlwiJmJveHZsO1wiLFwi4pScXCI6XCImYm94dnI7XCIsXCLCplwiOlwiJmJydmJhcjtcIixcIvCdkrdcIjpcIiZic2NyO1wiLFwi4oGPXCI6XCImYnNlbWk7XCIsXCJcXFxcXCI6XCImYnNvbDtcIixcIuKnhVwiOlwiJmJzb2xiO1wiLFwi4p+IXCI6XCImYnNvbGhzdWI7XCIsXCLigKJcIjpcIiZidWxsZXQ7XCIsXCLiqq5cIjpcIiZidW1wRTtcIixcIsSHXCI6XCImY2FjdXRlO1wiLFwi4oipXCI6XCImY2FwO1wiLFwi4qmEXCI6XCImY2FwYW5kO1wiLFwi4qmJXCI6XCImY2FwYnJjdXA7XCIsXCLiqYtcIjpcIiZjYXBjYXA7XCIsXCLiqYdcIjpcIiZjYXBjdXA7XCIsXCLiqYBcIjpcIiZjYXBkb3Q7XCIsXCLiiKnvuIBcIjpcIiZjYXBzO1wiLFwi4oGBXCI6XCImY2FyZXQ7XCIsXCLiqY1cIjpcIiZjY2FwcztcIixcIsSNXCI6XCImY2Nhcm9uO1wiLFwiw6dcIjpcIiZjY2VkaWw7XCIsXCLEiVwiOlwiJmNjaXJjO1wiLFwi4qmMXCI6XCImY2N1cHM7XCIsXCLiqZBcIjpcIiZjY3Vwc3NtO1wiLFwixItcIjpcIiZjZG90O1wiLFwi4qayXCI6XCImY2VtcHR5djtcIixcIsKiXCI6XCImY2VudDtcIixcIvCdlKBcIjpcIiZjZnI7XCIsXCLRh1wiOlwiJmNoY3k7XCIsXCLinJNcIjpcIiZjaGVja21hcms7XCIsXCLPh1wiOlwiJmNoaTtcIixcIuKXi1wiOlwiJmNpcjtcIixcIuKng1wiOlwiJmNpckU7XCIsXCLLhlwiOlwiJmNpcmM7XCIsXCLiiZdcIjpcIiZjaXJlO1wiLFwi4oa6XCI6XCImb2xhcnI7XCIsXCLihrtcIjpcIiZvcmFycjtcIixcIuKTiFwiOlwiJm9TO1wiLFwi4oqbXCI6XCImb2FzdDtcIixcIuKKmlwiOlwiJm9jaXI7XCIsXCLiip1cIjpcIiZvZGFzaDtcIixcIuKokFwiOlwiJmNpcmZuaW50O1wiLFwi4quvXCI6XCImY2lybWlkO1wiLFwi4qeCXCI6XCImY2lyc2NpcjtcIixcIuKZo1wiOlwiJmNsdWJzdWl0O1wiLFwiOlwiOlwiJmNvbG9uO1wiLFwiLFwiOlwiJmNvbW1hO1wiLFwiQFwiOlwiJmNvbW1hdDtcIixcIuKIgVwiOlwiJmNvbXBsZW1lbnQ7XCIsXCLiqa1cIjpcIiZjb25nZG90O1wiLFwi8J2VlFwiOlwiJmNvcGY7XCIsXCLihJdcIjpcIiZjb3B5c3I7XCIsXCLihrVcIjpcIiZjcmFycjtcIixcIuKcl1wiOlwiJmNyb3NzO1wiLFwi8J2SuFwiOlwiJmNzY3I7XCIsXCLiq49cIjpcIiZjc3ViO1wiLFwi4quRXCI6XCImY3N1YmU7XCIsXCLiq5BcIjpcIiZjc3VwO1wiLFwi4quSXCI6XCImY3N1cGU7XCIsXCLii69cIjpcIiZjdGRvdDtcIixcIuKkuFwiOlwiJmN1ZGFycmw7XCIsXCLipLVcIjpcIiZjdWRhcnJyO1wiLFwi4oueXCI6XCImY3VybHllcXByZWM7XCIsXCLii59cIjpcIiZjdXJseWVxc3VjYztcIixcIuKGtlwiOlwiJmN1cnZlYXJyb3dsZWZ0O1wiLFwi4qS9XCI6XCImY3VsYXJycDtcIixcIuKIqlwiOlwiJmN1cDtcIixcIuKpiFwiOlwiJmN1cGJyY2FwO1wiLFwi4qmGXCI6XCImY3VwY2FwO1wiLFwi4qmKXCI6XCImY3VwY3VwO1wiLFwi4oqNXCI6XCImY3VwZG90O1wiLFwi4qmFXCI6XCImY3Vwb3I7XCIsXCLiiKrvuIBcIjpcIiZjdXBzO1wiLFwi4oa3XCI6XCImY3VydmVhcnJvd3JpZ2h0O1wiLFwi4qS8XCI6XCImY3VyYXJybTtcIixcIuKLjlwiOlwiJmN1dmVlO1wiLFwi4ouPXCI6XCImY3V3ZWQ7XCIsXCLCpFwiOlwiJmN1cnJlbjtcIixcIuKIsVwiOlwiJmN3aW50O1wiLFwi4oytXCI6XCImY3lsY3R5O1wiLFwi4qWlXCI6XCImZEhhcjtcIixcIuKAoFwiOlwiJmRhZ2dlcjtcIixcIuKEuFwiOlwiJmRhbGV0aDtcIixcIuKAkFwiOlwiJmh5cGhlbjtcIixcIuKkj1wiOlwiJnJCYXJyO1wiLFwixI9cIjpcIiZkY2Fyb247XCIsXCLQtFwiOlwiJmRjeTtcIixcIuKHilwiOlwiJmRvd25kb3duYXJyb3dzO1wiLFwi4qm3XCI6XCImZUREb3Q7XCIsXCLCsFwiOlwiJmRlZztcIixcIs60XCI6XCImZGVsdGE7XCIsXCLiprFcIjpcIiZkZW1wdHl2O1wiLFwi4qW/XCI6XCImZGZpc2h0O1wiLFwi8J2UoVwiOlwiJmRmcjtcIixcIuKZplwiOlwiJmRpYW1zO1wiLFwiz51cIjpcIiZnYW1tYWQ7XCIsXCLii7JcIjpcIiZkaXNpbjtcIixcIsO3XCI6XCImZGl2aWRlO1wiLFwi4ouHXCI6XCImZGl2b254O1wiLFwi0ZJcIjpcIiZkamN5O1wiLFwi4oyeXCI6XCImbGxjb3JuZXI7XCIsXCLijI1cIjpcIiZkbGNyb3A7XCIsJDpcIiZkb2xsYXI7XCIsXCLwnZWVXCI6XCImZG9wZjtcIixcIuKJkVwiOlwiJmVEb3Q7XCIsXCLiiLhcIjpcIiZtaW51c2Q7XCIsXCLiiJRcIjpcIiZwbHVzZG87XCIsXCLiiqFcIjpcIiZzZG90YjtcIixcIuKMn1wiOlwiJmxyY29ybmVyO1wiLFwi4oyMXCI6XCImZHJjcm9wO1wiLFwi8J2SuVwiOlwiJmRzY3I7XCIsXCLRlVwiOlwiJmRzY3k7XCIsXCLip7ZcIjpcIiZkc29sO1wiLFwixJFcIjpcIiZkc3Ryb2s7XCIsXCLii7FcIjpcIiZkdGRvdDtcIixcIuKWv1wiOlwiJnRyaWFuZ2xlZG93bjtcIixcIuKmplwiOlwiJmR3YW5nbGU7XCIsXCLRn1wiOlwiJmR6Y3k7XCIsXCLin79cIjpcIiZkemlncmFycjtcIixcIsOpXCI6XCImZWFjdXRlO1wiLFwi4qmuXCI6XCImZWFzdGVyO1wiLFwixJtcIjpcIiZlY2Fyb247XCIsXCLiiZZcIjpcIiZlcWNpcmM7XCIsXCLDqlwiOlwiJmVjaXJjO1wiLFwi4omVXCI6XCImZXFjb2xvbjtcIixcItGNXCI6XCImZWN5O1wiLFwixJdcIjpcIiZlZG90O1wiLFwi4omSXCI6XCImZmFsbGluZ2RvdHNlcTtcIixcIvCdlKJcIjpcIiZlZnI7XCIsXCLiqppcIjpcIiZlZztcIixcIsOoXCI6XCImZWdyYXZlO1wiLFwi4qqWXCI6XCImZXFzbGFudGd0cjtcIixcIuKqmFwiOlwiJmVnc2RvdDtcIixcIuKqmVwiOlwiJmVsO1wiLFwi4o+nXCI6XCImZWxpbnRlcnM7XCIsXCLihJNcIjpcIiZlbGw7XCIsXCLiqpVcIjpcIiZlcXNsYW50bGVzcztcIixcIuKql1wiOlwiJmVsc2RvdDtcIixcIsSTXCI6XCImZW1hY3I7XCIsXCLiiIVcIjpcIiZ2YXJub3RoaW5nO1wiLFwi4oCEXCI6XCImZW1zcDEzO1wiLFwi4oCFXCI6XCImZW1zcDE0O1wiLFwi4oCDXCI6XCImZW1zcDtcIixcIsWLXCI6XCImZW5nO1wiLFwi4oCCXCI6XCImZW5zcDtcIixcIsSZXCI6XCImZW9nb247XCIsXCLwnZWWXCI6XCImZW9wZjtcIixcIuKLlVwiOlwiJmVwYXI7XCIsXCLip6NcIjpcIiZlcGFyc2w7XCIsXCLiqbFcIjpcIiZlcGx1cztcIixcIs61XCI6XCImZXBzaWxvbjtcIixcIs+1XCI6XCImdmFyZXBzaWxvbjtcIixcIj1cIjpcIiZlcXVhbHM7XCIsXCLiiZ9cIjpcIiZxdWVzdGVxO1wiLFwi4qm4XCI6XCImZXF1aXZERDtcIixcIuKnpVwiOlwiJmVxdnBhcnNsO1wiLFwi4omTXCI6XCImcmlzaW5nZG90c2VxO1wiLFwi4qWxXCI6XCImZXJhcnI7XCIsXCLihK9cIjpcIiZlc2NyO1wiLFwizrdcIjpcIiZldGE7XCIsXCLDsFwiOlwiJmV0aDtcIixcIsOrXCI6XCImZXVtbDtcIixcIuKCrFwiOlwiJmV1cm87XCIsXCIhXCI6XCImZXhjbDtcIixcItGEXCI6XCImZmN5O1wiLFwi4pmAXCI6XCImZmVtYWxlO1wiLFwi76yDXCI6XCImZmZpbGlnO1wiLFwi76yAXCI6XCImZmZsaWc7XCIsXCLvrIRcIjpcIiZmZmxsaWc7XCIsXCLwnZSjXCI6XCImZmZyO1wiLFwi76yBXCI6XCImZmlsaWc7XCIsZmo6XCImZmpsaWc7XCIsXCLima1cIjpcIiZmbGF0O1wiLFwi76yCXCI6XCImZmxsaWc7XCIsXCLilrFcIjpcIiZmbHRucztcIixcIsaSXCI6XCImZm5vZjtcIixcIvCdlZdcIjpcIiZmb3BmO1wiLFwi4ouUXCI6XCImcGl0Y2hmb3JrO1wiLFwi4quZXCI6XCImZm9ya3Y7XCIsXCLiqI1cIjpcIiZmcGFydGludDtcIixcIsK9XCI6XCImaGFsZjtcIixcIuKFk1wiOlwiJmZyYWMxMztcIixcIsK8XCI6XCImZnJhYzE0O1wiLFwi4oWVXCI6XCImZnJhYzE1O1wiLFwi4oWZXCI6XCImZnJhYzE2O1wiLFwi4oWbXCI6XCImZnJhYzE4O1wiLFwi4oWUXCI6XCImZnJhYzIzO1wiLFwi4oWWXCI6XCImZnJhYzI1O1wiLFwiwr5cIjpcIiZmcmFjMzQ7XCIsXCLihZdcIjpcIiZmcmFjMzU7XCIsXCLihZxcIjpcIiZmcmFjMzg7XCIsXCLihZhcIjpcIiZmcmFjNDU7XCIsXCLihZpcIjpcIiZmcmFjNTY7XCIsXCLihZ1cIjpcIiZmcmFjNTg7XCIsXCLihZ5cIjpcIiZmcmFjNzg7XCIsXCLigYRcIjpcIiZmcmFzbDtcIixcIuKMolwiOlwiJnNmcm93bjtcIixcIvCdkrtcIjpcIiZmc2NyO1wiLFwi4qqMXCI6XCImZ3RyZXFxbGVzcztcIixcIse1XCI6XCImZ2FjdXRlO1wiLFwizrNcIjpcIiZnYW1tYTtcIixcIuKqhlwiOlwiJmd0cmFwcHJveDtcIixcIsSfXCI6XCImZ2JyZXZlO1wiLFwixJ1cIjpcIiZnY2lyYztcIixcItCzXCI6XCImZ2N5O1wiLFwixKFcIjpcIiZnZG90O1wiLFwi4qqpXCI6XCImZ2VzY2M7XCIsXCLiqoBcIjpcIiZnZXNkb3Q7XCIsXCLiqoJcIjpcIiZnZXNkb3RvO1wiLFwi4qqEXCI6XCImZ2VzZG90b2w7XCIsXCLii5vvuIBcIjpcIiZnZXNsO1wiLFwi4qqUXCI6XCImZ2VzbGVzO1wiLFwi8J2UpFwiOlwiJmdmcjtcIixcIuKEt1wiOlwiJmdpbWVsO1wiLFwi0ZNcIjpcIiZnamN5O1wiLFwi4qqSXCI6XCImZ2xFO1wiLFwi4qqlXCI6XCImZ2xhO1wiLFwi4qqkXCI6XCImZ2xqO1wiLFwi4ompXCI6XCImZ25lcXE7XCIsXCLiqopcIjpcIiZnbmFwcHJveDtcIixcIuKqiFwiOlwiJmduZXE7XCIsXCLii6dcIjpcIiZnbnNpbTtcIixcIvCdlZhcIjpcIiZnb3BmO1wiLFwi4oSKXCI6XCImZ3NjcjtcIixcIuKqjlwiOlwiJmdzaW1lO1wiLFwi4qqQXCI6XCImZ3NpbWw7XCIsXCLiqqdcIjpcIiZndGNjO1wiLFwi4qm6XCI6XCImZ3RjaXI7XCIsXCLii5dcIjpcIiZndHJkb3Q7XCIsXCLippVcIjpcIiZndGxQYXI7XCIsXCLiqbxcIjpcIiZndHF1ZXN0O1wiLFwi4qW4XCI6XCImZ3RyYXJyO1wiLFwi4omp77iAXCI6XCImZ3ZuRTtcIixcItGKXCI6XCImaGFyZGN5O1wiLFwi4qWIXCI6XCImaGFycmNpcjtcIixcIuKGrVwiOlwiJmxlZnRyaWdodHNxdWlnYXJyb3c7XCIsXCLihI9cIjpcIiZwbGFua3Y7XCIsXCLEpVwiOlwiJmhjaXJjO1wiLFwi4pmlXCI6XCImaGVhcnRzdWl0O1wiLFwi4oCmXCI6XCImbWxkcjtcIixcIuKKuVwiOlwiJmhlcmNvbjtcIixcIvCdlKVcIjpcIiZoZnI7XCIsXCLipKVcIjpcIiZzZWFyaGs7XCIsXCLipKZcIjpcIiZzd2FyaGs7XCIsXCLih79cIjpcIiZob2FycjtcIixcIuKIu1wiOlwiJmhvbXRodDtcIixcIuKGqVwiOlwiJmxhcnJoaztcIixcIuKGqlwiOlwiJnJhcnJoaztcIixcIvCdlZlcIjpcIiZob3BmO1wiLFwi4oCVXCI6XCImaG9yYmFyO1wiLFwi8J2SvVwiOlwiJmhzY3I7XCIsXCLEp1wiOlwiJmhzdHJvaztcIixcIuKBg1wiOlwiJmh5YnVsbDtcIixcIsOtXCI6XCImaWFjdXRlO1wiLFwiw65cIjpcIiZpY2lyYztcIixcItC4XCI6XCImaWN5O1wiLFwi0LVcIjpcIiZpZWN5O1wiLFwiwqFcIjpcIiZpZXhjbDtcIixcIvCdlKZcIjpcIiZpZnI7XCIsXCLDrFwiOlwiJmlncmF2ZTtcIixcIuKojFwiOlwiJnFpbnQ7XCIsXCLiiK1cIjpcIiZ0aW50O1wiLFwi4qecXCI6XCImaWluZmluO1wiLFwi4oSpXCI6XCImaWlvdGE7XCIsXCLEs1wiOlwiJmlqbGlnO1wiLFwixKtcIjpcIiZpbWFjcjtcIixcIsSxXCI6XCImaW5vZG90O1wiLFwi4oq3XCI6XCImaW1vZjtcIixcIsa1XCI6XCImaW1wZWQ7XCIsXCLihIVcIjpcIiZpbmNhcmU7XCIsXCLiiJ5cIjpcIiZpbmZpbjtcIixcIuKnnVwiOlwiJmluZmludGllO1wiLFwi4oq6XCI6XCImaW50ZXJjYWw7XCIsXCLiqJdcIjpcIiZpbnRsYXJoaztcIixcIuKovFwiOlwiJmlwcm9kO1wiLFwi0ZFcIjpcIiZpb2N5O1wiLFwixK9cIjpcIiZpb2dvbjtcIixcIvCdlZpcIjpcIiZpb3BmO1wiLFwizrlcIjpcIiZpb3RhO1wiLFwiwr9cIjpcIiZpcXVlc3Q7XCIsXCLwnZK+XCI6XCImaXNjcjtcIixcIuKLuVwiOlwiJmlzaW5FO1wiLFwi4ou1XCI6XCImaXNpbmRvdDtcIixcIuKLtFwiOlwiJmlzaW5zO1wiLFwi4ouzXCI6XCImaXNpbnN2O1wiLFwixKlcIjpcIiZpdGlsZGU7XCIsXCLRllwiOlwiJml1a2N5O1wiLFwiw69cIjpcIiZpdW1sO1wiLFwixLVcIjpcIiZqY2lyYztcIixcItC5XCI6XCImamN5O1wiLFwi8J2Up1wiOlwiJmpmcjtcIixcIsi3XCI6XCImam1hdGg7XCIsXCLwnZWbXCI6XCImam9wZjtcIixcIvCdkr9cIjpcIiZqc2NyO1wiLFwi0ZhcIjpcIiZqc2VyY3k7XCIsXCLRlFwiOlwiJmp1a2N5O1wiLFwizrpcIjpcIiZrYXBwYTtcIixcIs+wXCI6XCImdmFya2FwcGE7XCIsXCLEt1wiOlwiJmtjZWRpbDtcIixcItC6XCI6XCIma2N5O1wiLFwi8J2UqFwiOlwiJmtmcjtcIixcIsS4XCI6XCIma2dyZWVuO1wiLFwi0YVcIjpcIiZraGN5O1wiLFwi0ZxcIjpcIiZramN5O1wiLFwi8J2VnFwiOlwiJmtvcGY7XCIsXCLwnZOAXCI6XCIma3NjcjtcIixcIuKkm1wiOlwiJmxBdGFpbDtcIixcIuKkjlwiOlwiJmxCYXJyO1wiLFwi4qqLXCI6XCImbGVzc2VxcWd0cjtcIixcIuKlolwiOlwiJmxIYXI7XCIsXCLEulwiOlwiJmxhY3V0ZTtcIixcIuKmtFwiOlwiJmxhZW1wdHl2O1wiLFwizrtcIjpcIiZsYW1iZGE7XCIsXCLippFcIjpcIiZsYW5nZDtcIixcIuKqhVwiOlwiJmxlc3NhcHByb3g7XCIsXCLCq1wiOlwiJmxhcXVvO1wiLFwi4qSfXCI6XCImbGFycmJmcztcIixcIuKknVwiOlwiJmxhcnJmcztcIixcIuKGq1wiOlwiJmxvb3BhcnJvd2xlZnQ7XCIsXCLipLlcIjpcIiZsYXJycGw7XCIsXCLipbNcIjpcIiZsYXJyc2ltO1wiLFwi4oaiXCI6XCImbGVmdGFycm93dGFpbDtcIixcIuKqq1wiOlwiJmxhdDtcIixcIuKkmVwiOlwiJmxhdGFpbDtcIixcIuKqrVwiOlwiJmxhdGU7XCIsXCLiqq3vuIBcIjpcIiZsYXRlcztcIixcIuKkjFwiOlwiJmxiYXJyO1wiLFwi4p2yXCI6XCImbGJicms7XCIsXCJ7XCI6XCImbGN1YjtcIixcIltcIjpcIiZsc3FiO1wiLFwi4qaLXCI6XCImbGJya2U7XCIsXCLipo9cIjpcIiZsYnJrc2xkO1wiLFwi4qaNXCI6XCImbGJya3NsdTtcIixcIsS+XCI6XCImbGNhcm9uO1wiLFwixLxcIjpcIiZsY2VkaWw7XCIsXCLQu1wiOlwiJmxjeTtcIixcIuKktlwiOlwiJmxkY2E7XCIsXCLipadcIjpcIiZsZHJkaGFyO1wiLFwi4qWLXCI6XCImbGRydXNoYXI7XCIsXCLihrJcIjpcIiZsZHNoO1wiLFwi4omkXCI6XCImbGVxO1wiLFwi4oeHXCI6XCImbGxhcnI7XCIsXCLii4tcIjpcIiZsdGhyZWU7XCIsXCLiqqhcIjpcIiZsZXNjYztcIixcIuKpv1wiOlwiJmxlc2RvdDtcIixcIuKqgVwiOlwiJmxlc2RvdG87XCIsXCLiqoNcIjpcIiZsZXNkb3RvcjtcIixcIuKLmu+4gFwiOlwiJmxlc2c7XCIsXCLiqpNcIjpcIiZsZXNnZXM7XCIsXCLii5ZcIjpcIiZsdGRvdDtcIixcIuKlvFwiOlwiJmxmaXNodDtcIixcIvCdlKlcIjpcIiZsZnI7XCIsXCLiqpFcIjpcIiZsZ0U7XCIsXCLipapcIjpcIiZsaGFydWw7XCIsXCLiloRcIjpcIiZsaGJsaztcIixcItGZXCI6XCImbGpjeTtcIixcIuKlq1wiOlwiJmxsaGFyZDtcIixcIuKXulwiOlwiJmxsdHJpO1wiLFwixYBcIjpcIiZsbWlkb3Q7XCIsXCLijrBcIjpcIiZsbW91c3RhY2hlO1wiLFwi4omoXCI6XCImbG5lcXE7XCIsXCLiqolcIjpcIiZsbmFwcHJveDtcIixcIuKqh1wiOlwiJmxuZXE7XCIsXCLii6ZcIjpcIiZsbnNpbTtcIixcIuKfrFwiOlwiJmxvYW5nO1wiLFwi4oe9XCI6XCImbG9hcnI7XCIsXCLin7xcIjpcIiZ4bWFwO1wiLFwi4oasXCI6XCImcmFycmxwO1wiLFwi4qaFXCI6XCImbG9wYXI7XCIsXCLwnZWdXCI6XCImbG9wZjtcIixcIuKorVwiOlwiJmxvcGx1cztcIixcIuKotFwiOlwiJmxvdGltZXM7XCIsXCLiiJdcIjpcIiZsb3dhc3Q7XCIsXCLil4pcIjpcIiZsb3plbmdlO1wiLFwiKFwiOlwiJmxwYXI7XCIsXCLippNcIjpcIiZscGFybHQ7XCIsXCLipa1cIjpcIiZscmhhcmQ7XCIsXCLigI5cIjpcIiZscm07XCIsXCLiir9cIjpcIiZscnRyaTtcIixcIuKAuVwiOlwiJmxzYXF1bztcIixcIvCdk4FcIjpcIiZsc2NyO1wiLFwi4qqNXCI6XCImbHNpbWU7XCIsXCLiqo9cIjpcIiZsc2ltZztcIixcIuKAmlwiOlwiJnNicXVvO1wiLFwixYJcIjpcIiZsc3Ryb2s7XCIsXCLiqqZcIjpcIiZsdGNjO1wiLFwi4qm5XCI6XCImbHRjaXI7XCIsXCLii4lcIjpcIiZsdGltZXM7XCIsXCLipbZcIjpcIiZsdGxhcnI7XCIsXCLiqbtcIjpcIiZsdHF1ZXN0O1wiLFwi4qaWXCI6XCImbHRyUGFyO1wiLFwi4peDXCI6XCImdHJpYW5nbGVsZWZ0O1wiLFwi4qWKXCI6XCImbHVyZHNoYXI7XCIsXCLipaZcIjpcIiZsdXJ1aGFyO1wiLFwi4omo77iAXCI6XCImbHZuRTtcIixcIuKIulwiOlwiJm1ERG90O1wiLFwiwq9cIjpcIiZzdHJucztcIixcIuKZglwiOlwiJm1hbGU7XCIsXCLinKBcIjpcIiZtYWx0ZXNlO1wiLFwi4pauXCI6XCImbWFya2VyO1wiLFwi4qipXCI6XCImbWNvbW1hO1wiLFwi0LxcIjpcIiZtY3k7XCIsXCLigJRcIjpcIiZtZGFzaDtcIixcIvCdlKpcIjpcIiZtZnI7XCIsXCLihKdcIjpcIiZtaG87XCIsXCLCtVwiOlwiJm1pY3JvO1wiLFwi4quwXCI6XCImbWlkY2lyO1wiLFwi4oiSXCI6XCImbWludXM7XCIsXCLiqKpcIjpcIiZtaW51c2R1O1wiLFwi4qubXCI6XCImbWxjcDtcIixcIuKKp1wiOlwiJm1vZGVscztcIixcIvCdlZ5cIjpcIiZtb3BmO1wiLFwi8J2TglwiOlwiJm1zY3I7XCIsXCLOvFwiOlwiJm11O1wiLFwi4oq4XCI6XCImbXVtYXA7XCIsXCLii5nMuFwiOlwiJm5HZztcIixcIuKJq+KDklwiOlwiJm5HdDtcIixcIuKHjVwiOlwiJm5sQXJyO1wiLFwi4oeOXCI6XCImbmhBcnI7XCIsXCLii5jMuFwiOlwiJm5MbDtcIixcIuKJquKDklwiOlwiJm5MdDtcIixcIuKHj1wiOlwiJm5yQXJyO1wiLFwi4oqvXCI6XCImblZEYXNoO1wiLFwi4oquXCI6XCImblZkYXNoO1wiLFwixYRcIjpcIiZuYWN1dGU7XCIsXCLiiKDig5JcIjpcIiZuYW5nO1wiLFwi4qmwzLhcIjpcIiZuYXBFO1wiLFwi4omLzLhcIjpcIiZuYXBpZDtcIixcIsWJXCI6XCImbmFwb3M7XCIsXCLima5cIjpcIiZuYXR1cmFsO1wiLFwi4qmDXCI6XCImbmNhcDtcIixcIsWIXCI6XCImbmNhcm9uO1wiLFwixYZcIjpcIiZuY2VkaWw7XCIsXCLiqa3MuFwiOlwiJm5jb25nZG90O1wiLFwi4qmCXCI6XCImbmN1cDtcIixcItC9XCI6XCImbmN5O1wiLFwi4oCTXCI6XCImbmRhc2g7XCIsXCLih5dcIjpcIiZuZUFycjtcIixcIuKkpFwiOlwiJm5lYXJoaztcIixcIuKJkMy4XCI6XCImbmVkb3Q7XCIsXCLipKhcIjpcIiZ0b2VhO1wiLFwi8J2Uq1wiOlwiJm5mcjtcIixcIuKGrlwiOlwiJm5sZWZ0cmlnaHRhcnJvdztcIixcIuKrslwiOlwiJm5ocGFyO1wiLFwi4ou8XCI6XCImbmlzO1wiLFwi4ou6XCI6XCImbmlzZDtcIixcItGaXCI6XCImbmpjeTtcIixcIuKJpsy4XCI6XCImbmxlcXE7XCIsXCLihppcIjpcIiZubGVmdGFycm93O1wiLFwi4oClXCI6XCImbmxkcjtcIixcIvCdlZ9cIjpcIiZub3BmO1wiLFwiwqxcIjpcIiZub3Q7XCIsXCLii7nMuFwiOlwiJm5vdGluRTtcIixcIuKLtcy4XCI6XCImbm90aW5kb3Q7XCIsXCLii7dcIjpcIiZub3RpbnZiO1wiLFwi4ou2XCI6XCImbm90aW52YztcIixcIuKLvlwiOlwiJm5vdG5pdmI7XCIsXCLii71cIjpcIiZub3RuaXZjO1wiLFwi4qu94oOlXCI6XCImbnBhcnNsO1wiLFwi4oiCzLhcIjpcIiZucGFydDtcIixcIuKolFwiOlwiJm5wb2xpbnQ7XCIsXCLihptcIjpcIiZucmlnaHRhcnJvdztcIixcIuKks8y4XCI6XCImbnJhcnJjO1wiLFwi4oadzLhcIjpcIiZucmFycnc7XCIsXCLwnZODXCI6XCImbnNjcjtcIixcIuKKhFwiOlwiJm5zdWI7XCIsXCLiq4XMuFwiOlwiJm5zdWJzZXRlcXE7XCIsXCLiioVcIjpcIiZuc3VwO1wiLFwi4quGzLhcIjpcIiZuc3Vwc2V0ZXFxO1wiLFwiw7FcIjpcIiZudGlsZGU7XCIsXCLOvVwiOlwiJm51O1wiLFwiI1wiOlwiJm51bTtcIixcIuKEllwiOlwiJm51bWVybztcIixcIuKAh1wiOlwiJm51bXNwO1wiLFwi4oqtXCI6XCImbnZEYXNoO1wiLFwi4qSEXCI6XCImbnZIYXJyO1wiLFwi4omN4oOSXCI6XCImbnZhcDtcIixcIuKKrFwiOlwiJm52ZGFzaDtcIixcIuKJpeKDklwiOlwiJm52Z2U7XCIsXCI+4oOSXCI6XCImbnZndDtcIixcIuKnnlwiOlwiJm52aW5maW47XCIsXCLipIJcIjpcIiZudmxBcnI7XCIsXCLiiaTig5JcIjpcIiZudmxlO1wiLFwiPOKDklwiOlwiJm52bHQ7XCIsXCLiirTig5JcIjpcIiZudmx0cmllO1wiLFwi4qSDXCI6XCImbnZyQXJyO1wiLFwi4oq14oOSXCI6XCImbnZydHJpZTtcIixcIuKIvOKDklwiOlwiJm52c2ltO1wiLFwi4oeWXCI6XCImbndBcnI7XCIsXCLipKNcIjpcIiZud2FyaGs7XCIsXCLipKdcIjpcIiZud25lYXI7XCIsXCLDs1wiOlwiJm9hY3V0ZTtcIixcIsO0XCI6XCImb2NpcmM7XCIsXCLQvlwiOlwiJm9jeTtcIixcIsWRXCI6XCImb2RibGFjO1wiLFwi4qi4XCI6XCImb2RpdjtcIixcIuKmvFwiOlwiJm9kc29sZDtcIixcIsWTXCI6XCImb2VsaWc7XCIsXCLipr9cIjpcIiZvZmNpcjtcIixcIvCdlKxcIjpcIiZvZnI7XCIsXCLLm1wiOlwiJm9nb247XCIsXCLDslwiOlwiJm9ncmF2ZTtcIixcIuKngVwiOlwiJm9ndDtcIixcIuKmtVwiOlwiJm9oYmFyO1wiLFwi4qa+XCI6XCImb2xjaXI7XCIsXCLiprtcIjpcIiZvbGNyb3NzO1wiLFwi4qeAXCI6XCImb2x0O1wiLFwixY1cIjpcIiZvbWFjcjtcIixcIs+JXCI6XCImb21lZ2E7XCIsXCLOv1wiOlwiJm9taWNyb247XCIsXCLiprZcIjpcIiZvbWlkO1wiLFwi8J2VoFwiOlwiJm9vcGY7XCIsXCLiprdcIjpcIiZvcGFyO1wiLFwi4qa5XCI6XCImb3BlcnA7XCIsXCLiiKhcIjpcIiZ2ZWU7XCIsXCLiqZ1cIjpcIiZvcmQ7XCIsXCLihLRcIjpcIiZvc2NyO1wiLFwiwqpcIjpcIiZvcmRmO1wiLFwiwrpcIjpcIiZvcmRtO1wiLFwi4oq2XCI6XCImb3JpZ29mO1wiLFwi4qmWXCI6XCImb3JvcjtcIixcIuKpl1wiOlwiJm9yc2xvcGU7XCIsXCLiqZtcIjpcIiZvcnY7XCIsXCLDuFwiOlwiJm9zbGFzaDtcIixcIuKKmFwiOlwiJm9zb2w7XCIsXCLDtVwiOlwiJm90aWxkZTtcIixcIuKotlwiOlwiJm90aW1lc2FzO1wiLFwiw7ZcIjpcIiZvdW1sO1wiLFwi4oy9XCI6XCImb3ZiYXI7XCIsXCLCtlwiOlwiJnBhcmE7XCIsXCLiq7NcIjpcIiZwYXJzaW07XCIsXCLiq71cIjpcIiZwYXJzbDtcIixcItC/XCI6XCImcGN5O1wiLFwiJVwiOlwiJnBlcmNudDtcIixcIi5cIjpcIiZwZXJpb2Q7XCIsXCLigLBcIjpcIiZwZXJtaWw7XCIsXCLigLFcIjpcIiZwZXJ0ZW5rO1wiLFwi8J2UrVwiOlwiJnBmcjtcIixcIs+GXCI6XCImcGhpO1wiLFwiz5VcIjpcIiZ2YXJwaGk7XCIsXCLimI5cIjpcIiZwaG9uZTtcIixcIs+AXCI6XCImcGk7XCIsXCLPllwiOlwiJnZhcnBpO1wiLFwi4oSOXCI6XCImcGxhbmNraDtcIixcIitcIjpcIiZwbHVzO1wiLFwi4qijXCI6XCImcGx1c2FjaXI7XCIsXCLiqKJcIjpcIiZwbHVzY2lyO1wiLFwi4qilXCI6XCImcGx1c2R1O1wiLFwi4qmyXCI6XCImcGx1c2U7XCIsXCLiqKZcIjpcIiZwbHVzc2ltO1wiLFwi4qinXCI6XCImcGx1c3R3bztcIixcIuKolVwiOlwiJnBvaW50aW50O1wiLFwi8J2VoVwiOlwiJnBvcGY7XCIsXCLCo1wiOlwiJnBvdW5kO1wiLFwi4qqzXCI6XCImcHJFO1wiLFwi4qq3XCI6XCImcHJlY2FwcHJveDtcIixcIuKquVwiOlwiJnBybmFwO1wiLFwi4qq1XCI6XCImcHJuRTtcIixcIuKLqFwiOlwiJnBybnNpbTtcIixcIuKAslwiOlwiJnByaW1lO1wiLFwi4oyuXCI6XCImcHJvZmFsYXI7XCIsXCLijJJcIjpcIiZwcm9mbGluZTtcIixcIuKMk1wiOlwiJnByb2ZzdXJmO1wiLFwi4oqwXCI6XCImcHJ1cmVsO1wiLFwi8J2ThVwiOlwiJnBzY3I7XCIsXCLPiFwiOlwiJnBzaTtcIixcIuKAiFwiOlwiJnB1bmNzcDtcIixcIvCdlK5cIjpcIiZxZnI7XCIsXCLwnZWiXCI6XCImcW9wZjtcIixcIuKBl1wiOlwiJnFwcmltZTtcIixcIvCdk4ZcIjpcIiZxc2NyO1wiLFwi4qiWXCI6XCImcXVhdGludDtcIixcIj9cIjpcIiZxdWVzdDtcIixcIuKknFwiOlwiJnJBdGFpbDtcIixcIuKlpFwiOlwiJnJIYXI7XCIsXCLiiL3MsVwiOlwiJnJhY2U7XCIsXCLFlVwiOlwiJnJhY3V0ZTtcIixcIuKms1wiOlwiJnJhZW1wdHl2O1wiLFwi4qaSXCI6XCImcmFuZ2Q7XCIsXCLipqVcIjpcIiZyYW5nZTtcIixcIsK7XCI6XCImcmFxdW87XCIsXCLipbVcIjpcIiZyYXJyYXA7XCIsXCLipKBcIjpcIiZyYXJyYmZzO1wiLFwi4qSzXCI6XCImcmFycmM7XCIsXCLipJ5cIjpcIiZyYXJyZnM7XCIsXCLipYVcIjpcIiZyYXJycGw7XCIsXCLipbRcIjpcIiZyYXJyc2ltO1wiLFwi4oajXCI6XCImcmlnaHRhcnJvd3RhaWw7XCIsXCLihp1cIjpcIiZyaWdodHNxdWlnYXJyb3c7XCIsXCLipJpcIjpcIiZyYXRhaWw7XCIsXCLiiLZcIjpcIiZyYXRpbztcIixcIuKds1wiOlwiJnJiYnJrO1wiLFwifVwiOlwiJnJjdWI7XCIsXCJdXCI6XCImcnNxYjtcIixcIuKmjFwiOlwiJnJicmtlO1wiLFwi4qaOXCI6XCImcmJya3NsZDtcIixcIuKmkFwiOlwiJnJicmtzbHU7XCIsXCLFmVwiOlwiJnJjYXJvbjtcIixcIsWXXCI6XCImcmNlZGlsO1wiLFwi0YBcIjpcIiZyY3k7XCIsXCLipLdcIjpcIiZyZGNhO1wiLFwi4qWpXCI6XCImcmRsZGhhcjtcIixcIuKGs1wiOlwiJnJkc2g7XCIsXCLilq1cIjpcIiZyZWN0O1wiLFwi4qW9XCI6XCImcmZpc2h0O1wiLFwi8J2Ur1wiOlwiJnJmcjtcIixcIuKlrFwiOlwiJnJoYXJ1bDtcIixcIs+BXCI6XCImcmhvO1wiLFwiz7FcIjpcIiZ2YXJyaG87XCIsXCLih4lcIjpcIiZycmFycjtcIixcIuKLjFwiOlwiJnJ0aHJlZTtcIixcIsuaXCI6XCImcmluZztcIixcIuKAj1wiOlwiJnJsbTtcIixcIuKOsVwiOlwiJnJtb3VzdGFjaGU7XCIsXCLiq65cIjpcIiZybm1pZDtcIixcIuKfrVwiOlwiJnJvYW5nO1wiLFwi4oe+XCI6XCImcm9hcnI7XCIsXCLipoZcIjpcIiZyb3BhcjtcIixcIvCdlaNcIjpcIiZyb3BmO1wiLFwi4qiuXCI6XCImcm9wbHVzO1wiLFwi4qi1XCI6XCImcm90aW1lcztcIixcIilcIjpcIiZycGFyO1wiLFwi4qaUXCI6XCImcnBhcmd0O1wiLFwi4qiSXCI6XCImcnBwb2xpbnQ7XCIsXCLigLpcIjpcIiZyc2FxdW87XCIsXCLwnZOHXCI6XCImcnNjcjtcIixcIuKLilwiOlwiJnJ0aW1lcztcIixcIuKWuVwiOlwiJnRyaWFuZ2xlcmlnaHQ7XCIsXCLip45cIjpcIiZydHJpbHRyaTtcIixcIuKlqFwiOlwiJnJ1bHVoYXI7XCIsXCLihJ5cIjpcIiZyeDtcIixcIsWbXCI6XCImc2FjdXRlO1wiLFwi4qq0XCI6XCImc2NFO1wiLFwi4qq4XCI6XCImc3VjY2FwcHJveDtcIixcIsWhXCI6XCImc2Nhcm9uO1wiLFwixZ9cIjpcIiZzY2VkaWw7XCIsXCLFnVwiOlwiJnNjaXJjO1wiLFwi4qq2XCI6XCImc3VjY25lcXE7XCIsXCLiqrpcIjpcIiZzdWNjbmFwcHJveDtcIixcIuKLqVwiOlwiJnN1Y2Nuc2ltO1wiLFwi4qiTXCI6XCImc2Nwb2xpbnQ7XCIsXCLRgVwiOlwiJnNjeTtcIixcIuKLhVwiOlwiJnNkb3Q7XCIsXCLiqaZcIjpcIiZzZG90ZTtcIixcIuKHmFwiOlwiJnNlQXJyO1wiLFwiwqdcIjpcIiZzZWN0O1wiLFwiO1wiOlwiJnNlbWk7XCIsXCLipKlcIjpcIiZ0b3NhO1wiLFwi4py2XCI6XCImc2V4dDtcIixcIvCdlLBcIjpcIiZzZnI7XCIsXCLima9cIjpcIiZzaGFycDtcIixcItGJXCI6XCImc2hjaGN5O1wiLFwi0YhcIjpcIiZzaGN5O1wiLFwiwq1cIjpcIiZzaHk7XCIsXCLPg1wiOlwiJnNpZ21hO1wiLFwiz4JcIjpcIiZ2YXJzaWdtYTtcIixcIuKpqlwiOlwiJnNpbWRvdDtcIixcIuKqnlwiOlwiJnNpbWc7XCIsXCLiqqBcIjpcIiZzaW1nRTtcIixcIuKqnVwiOlwiJnNpbWw7XCIsXCLiqp9cIjpcIiZzaW1sRTtcIixcIuKJhlwiOlwiJnNpbW5lO1wiLFwi4qikXCI6XCImc2ltcGx1cztcIixcIuKlslwiOlwiJnNpbXJhcnI7XCIsXCLiqLNcIjpcIiZzbWFzaHA7XCIsXCLip6RcIjpcIiZzbWVwYXJzbDtcIixcIuKMo1wiOlwiJnNzbWlsZTtcIixcIuKqqlwiOlwiJnNtdDtcIixcIuKqrFwiOlwiJnNtdGU7XCIsXCLiqqzvuIBcIjpcIiZzbXRlcztcIixcItGMXCI6XCImc29mdGN5O1wiLFwiL1wiOlwiJnNvbDtcIixcIuKnhFwiOlwiJnNvbGI7XCIsXCLijL9cIjpcIiZzb2xiYXI7XCIsXCLwnZWkXCI6XCImc29wZjtcIixcIuKZoFwiOlwiJnNwYWRlc3VpdDtcIixcIuKKk++4gFwiOlwiJnNxY2FwcztcIixcIuKKlO+4gFwiOlwiJnNxY3VwcztcIixcIvCdk4hcIjpcIiZzc2NyO1wiLFwi4piGXCI6XCImc3RhcjtcIixcIuKKglwiOlwiJnN1YnNldDtcIixcIuKrhVwiOlwiJnN1YnNldGVxcTtcIixcIuKqvVwiOlwiJnN1YmRvdDtcIixcIuKrg1wiOlwiJnN1YmVkb3Q7XCIsXCLiq4FcIjpcIiZzdWJtdWx0O1wiLFwi4quLXCI6XCImc3Vic2V0bmVxcTtcIixcIuKKilwiOlwiJnN1YnNldG5lcTtcIixcIuKqv1wiOlwiJnN1YnBsdXM7XCIsXCLipblcIjpcIiZzdWJyYXJyO1wiLFwi4quHXCI6XCImc3Vic2ltO1wiLFwi4quVXCI6XCImc3Vic3ViO1wiLFwi4quTXCI6XCImc3Vic3VwO1wiLFwi4pmqXCI6XCImc3VuZztcIixcIsK5XCI6XCImc3VwMTtcIixcIsKyXCI6XCImc3VwMjtcIixcIsKzXCI6XCImc3VwMztcIixcIuKrhlwiOlwiJnN1cHNldGVxcTtcIixcIuKqvlwiOlwiJnN1cGRvdDtcIixcIuKrmFwiOlwiJnN1cGRzdWI7XCIsXCLiq4RcIjpcIiZzdXBlZG90O1wiLFwi4p+JXCI6XCImc3VwaHNvbDtcIixcIuKrl1wiOlwiJnN1cGhzdWI7XCIsXCLipbtcIjpcIiZzdXBsYXJyO1wiLFwi4quCXCI6XCImc3VwbXVsdDtcIixcIuKrjFwiOlwiJnN1cHNldG5lcXE7XCIsXCLiiotcIjpcIiZzdXBzZXRuZXE7XCIsXCLiq4BcIjpcIiZzdXBwbHVzO1wiLFwi4quIXCI6XCImc3Vwc2ltO1wiLFwi4quUXCI6XCImc3Vwc3ViO1wiLFwi4quWXCI6XCImc3Vwc3VwO1wiLFwi4oeZXCI6XCImc3dBcnI7XCIsXCLipKpcIjpcIiZzd253YXI7XCIsXCLDn1wiOlwiJnN6bGlnO1wiLFwi4oyWXCI6XCImdGFyZ2V0O1wiLFwiz4RcIjpcIiZ0YXU7XCIsXCLFpVwiOlwiJnRjYXJvbjtcIixcIsWjXCI6XCImdGNlZGlsO1wiLFwi0YJcIjpcIiZ0Y3k7XCIsXCLijJVcIjpcIiZ0ZWxyZWM7XCIsXCLwnZSxXCI6XCImdGZyO1wiLFwizrhcIjpcIiZ0aGV0YTtcIixcIs+RXCI6XCImdmFydGhldGE7XCIsXCLDvlwiOlwiJnRob3JuO1wiLFwiw5dcIjpcIiZ0aW1lcztcIixcIuKosVwiOlwiJnRpbWVzYmFyO1wiLFwi4qiwXCI6XCImdGltZXNkO1wiLFwi4oy2XCI6XCImdG9wYm90O1wiLFwi4quxXCI6XCImdG9wY2lyO1wiLFwi8J2VpVwiOlwiJnRvcGY7XCIsXCLiq5pcIjpcIiZ0b3Bmb3JrO1wiLFwi4oC0XCI6XCImdHByaW1lO1wiLFwi4pa1XCI6XCImdXRyaTtcIixcIuKJnFwiOlwiJnRyaWU7XCIsXCLil6xcIjpcIiZ0cmlkb3Q7XCIsXCLiqLpcIjpcIiZ0cmltaW51cztcIixcIuKouVwiOlwiJnRyaXBsdXM7XCIsXCLip41cIjpcIiZ0cmlzYjtcIixcIuKou1wiOlwiJnRyaXRpbWU7XCIsXCLij6JcIjpcIiZ0cnBleml1bTtcIixcIvCdk4lcIjpcIiZ0c2NyO1wiLFwi0YZcIjpcIiZ0c2N5O1wiLFwi0ZtcIjpcIiZ0c2hjeTtcIixcIsWnXCI6XCImdHN0cm9rO1wiLFwi4qWjXCI6XCImdUhhcjtcIixcIsO6XCI6XCImdWFjdXRlO1wiLFwi0Z5cIjpcIiZ1YnJjeTtcIixcIsWtXCI6XCImdWJyZXZlO1wiLFwiw7tcIjpcIiZ1Y2lyYztcIixcItGDXCI6XCImdWN5O1wiLFwixbFcIjpcIiZ1ZGJsYWM7XCIsXCLipb5cIjpcIiZ1ZmlzaHQ7XCIsXCLwnZSyXCI6XCImdWZyO1wiLFwiw7lcIjpcIiZ1Z3JhdmU7XCIsXCLiloBcIjpcIiZ1aGJsaztcIixcIuKMnFwiOlwiJnVsY29ybmVyO1wiLFwi4oyPXCI6XCImdWxjcm9wO1wiLFwi4pe4XCI6XCImdWx0cmk7XCIsXCLFq1wiOlwiJnVtYWNyO1wiLFwixbNcIjpcIiZ1b2dvbjtcIixcIvCdlaZcIjpcIiZ1b3BmO1wiLFwiz4VcIjpcIiZ1cHNpbG9uO1wiLFwi4oeIXCI6XCImdXVhcnI7XCIsXCLijJ1cIjpcIiZ1cmNvcm5lcjtcIixcIuKMjlwiOlwiJnVyY3JvcDtcIixcIsWvXCI6XCImdXJpbmc7XCIsXCLil7lcIjpcIiZ1cnRyaTtcIixcIvCdk4pcIjpcIiZ1c2NyO1wiLFwi4ouwXCI6XCImdXRkb3Q7XCIsXCLFqVwiOlwiJnV0aWxkZTtcIixcIsO8XCI6XCImdXVtbDtcIixcIuKmp1wiOlwiJnV3YW5nbGU7XCIsXCLiq6hcIjpcIiZ2QmFyO1wiLFwi4qupXCI6XCImdkJhcnY7XCIsXCLippxcIjpcIiZ2YW5ncnQ7XCIsXCLiiorvuIBcIjpcIiZ2c3VibmU7XCIsXCLiq4vvuIBcIjpcIiZ2c3VibkU7XCIsXCLiiovvuIBcIjpcIiZ2c3VwbmU7XCIsXCLiq4zvuIBcIjpcIiZ2c3VwbkU7XCIsXCLQslwiOlwiJnZjeTtcIixcIuKKu1wiOlwiJnZlZWJhcjtcIixcIuKJmlwiOlwiJnZlZWVxO1wiLFwi4ouuXCI6XCImdmVsbGlwO1wiLFwi8J2Us1wiOlwiJnZmcjtcIixcIvCdladcIjpcIiZ2b3BmO1wiLFwi8J2Ti1wiOlwiJnZzY3I7XCIsXCLipppcIjpcIiZ2emlnemFnO1wiLFwixbVcIjpcIiZ3Y2lyYztcIixcIuKpn1wiOlwiJndlZGJhcjtcIixcIuKJmVwiOlwiJndlZGdlcTtcIixcIuKEmFwiOlwiJndwO1wiLFwi8J2UtFwiOlwiJndmcjtcIixcIvCdlahcIjpcIiZ3b3BmO1wiLFwi8J2TjFwiOlwiJndzY3I7XCIsXCLwnZS1XCI6XCImeGZyO1wiLFwizr5cIjpcIiZ4aTtcIixcIuKLu1wiOlwiJnhuaXM7XCIsXCLwnZWpXCI6XCImeG9wZjtcIixcIvCdk41cIjpcIiZ4c2NyO1wiLFwiw71cIjpcIiZ5YWN1dGU7XCIsXCLRj1wiOlwiJnlhY3k7XCIsXCLFt1wiOlwiJnljaXJjO1wiLFwi0YtcIjpcIiZ5Y3k7XCIsXCLCpVwiOlwiJnllbjtcIixcIvCdlLZcIjpcIiZ5ZnI7XCIsXCLRl1wiOlwiJnlpY3k7XCIsXCLwnZWqXCI6XCImeW9wZjtcIixcIvCdk45cIjpcIiZ5c2NyO1wiLFwi0Y5cIjpcIiZ5dWN5O1wiLFwiw79cIjpcIiZ5dW1sO1wiLFwixbpcIjpcIiZ6YWN1dGU7XCIsXCLFvlwiOlwiJnpjYXJvbjtcIixcItC3XCI6XCImemN5O1wiLFwixbxcIjpcIiZ6ZG90O1wiLFwizrZcIjpcIiZ6ZXRhO1wiLFwi8J2Ut1wiOlwiJnpmcjtcIixcItC2XCI6XCImemhjeTtcIixcIuKHnVwiOlwiJnppZ3JhcnI7XCIsXCLwnZWrXCI6XCImem9wZjtcIixcIvCdk49cIjpcIiZ6c2NyO1wiLFwi4oCNXCI6XCImendqO1wiLFwi4oCMXCI6XCImenduajtcIn19fTsiLCJcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6dHJ1ZX0pO2V4cG9ydHMubnVtZXJpY1VuaWNvZGVNYXA9ezA6NjU1MzMsMTI4OjgzNjQsMTMwOjgyMTgsMTMxOjQwMiwxMzI6ODIyMiwxMzM6ODIzMCwxMzQ6ODIyNCwxMzU6ODIyNSwxMzY6NzEwLDEzNzo4MjQwLDEzODozNTIsMTM5OjgyNDksMTQwOjMzOCwxNDI6MzgxLDE0NTo4MjE2LDE0Njo4MjE3LDE0Nzo4MjIwLDE0ODo4MjIxLDE0OTo4MjI2LDE1MDo4MjExLDE1MTo4MjEyLDE1Mjo3MzIsMTUzOjg0ODIsMTU0OjM1MywxNTU6ODI1MCwxNTY6MzM5LDE1ODozODIsMTU5OjM3Nn07IiwiXCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOnRydWV9KTtleHBvcnRzLmZyb21Db2RlUG9pbnQ9U3RyaW5nLmZyb21Db2RlUG9pbnR8fGZ1bmN0aW9uKGFzdHJhbENvZGVQb2ludCl7cmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoTWF0aC5mbG9vcigoYXN0cmFsQ29kZVBvaW50LTY1NTM2KS8xMDI0KSs1NTI5NiwoYXN0cmFsQ29kZVBvaW50LTY1NTM2KSUxMDI0KzU2MzIwKX07ZXhwb3J0cy5nZXRDb2RlUG9pbnQ9U3RyaW5nLnByb3RvdHlwZS5jb2RlUG9pbnRBdD9mdW5jdGlvbihpbnB1dCxwb3NpdGlvbil7cmV0dXJuIGlucHV0LmNvZGVQb2ludEF0KHBvc2l0aW9uKX06ZnVuY3Rpb24oaW5wdXQscG9zaXRpb24pe3JldHVybihpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKS01NTI5NikqMTAyNCtpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKzEpLTU2MzIwKzY1NTM2fTtleHBvcnRzLmhpZ2hTdXJyb2dhdGVGcm9tPTU1Mjk2O2V4cG9ydHMuaGlnaFN1cnJvZ2F0ZVRvPTU2MzE5OyIsImV4cG9ydCBkZWZhdWx0IFwicHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xcbnByZWNpc2lvbiBoaWdocCBpbnQ7XFxuI2RlZmluZSBHTFNMSUZZIDFcXG5cXG51bmlmb3JtIHNhbXBsZXIyRCB0V2F0ZXI7XFxudW5pZm9ybSBzYW1wbGVyMkQgdEZsb3c7XFxudW5pZm9ybSBmbG9hdCB1VGltZTtcXG5cXG52YXJ5aW5nIHZlYzIgdlV2O1xcblxcbnVuaWZvcm0gdmVjNCByZXM7XFxuXFxudm9pZCBtYWluKCkge1xcbiAgICAgICAgLy8gUiBhbmQgRyB2YWx1ZXMgYXJlIHZlbG9jaXR5IGluIHRoZSB4IGFuZCB5IGRpcmVjdGlvblxcbiAgICAgICAgLy8gQiB2YWx1ZSBpcyB0aGUgdmVsb2NpdHkgbGVuZ3RoXFxuICAgICAgICB2ZWMzIGZsb3cgPSB0ZXh0dXJlMkQodEZsb3csIHZVdikucmdiO1xcbiAgICAgICAgdmVjMiB1diA9IC41ICogZ2xfRnJhZ0Nvb3JkLnh5IC8gcmVzLnh5IDtcXG4gICAgICAgIHZlYzIgbXlVViA9ICh1diAtIHZlYzIoMC41KSkqcmVzLnp3ICsgdmVjMigwLjUpO1xcblxcbiAgICAgICAgbXlVViAtPSBmbG93Lnh5ICogKDAuMTUgKiAwLjcpO1xcbiAgICAgICAgXFxuICAgICAgICB2ZWMzIHRleCA9IHRleHR1cmUyRCh0V2F0ZXIsIG15VVYpLnJnYjtcXG5cXG4gICAgICAgIC8vIGdsX0ZyYWdDb2xvciA9IHZlYzQoZmxvdy5yLCBmbG93LmcsIGZsb3cuYiwgMS4wKTtcXG4gICAgICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQodGV4LnIsIHRleC5nLCB0ZXguYiwgMS4wKTtcXG59XCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIjZGVmaW5lIEdMU0xJRlkgMVxcbmF0dHJpYnV0ZSB2ZWMyIHV2O1xcbmF0dHJpYnV0ZSB2ZWMyIHBvc2l0aW9uO1xcblxcbnZhcnlpbmcgdmVjMiB2VXY7XFxuXFxudm9pZCBtYWluKCkge1xcbiAgICAgICAgdlV2ID0gdXY7XFxuICAgICAgICBcXG4gICAgICAgIGdsX1Bvc2l0aW9uID0gdmVjNChwb3NpdGlvbiwgMCwgMSk7XFxufVwiOyIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFwicHJvdG90eXBlXCIsIHsgd3JpdGFibGU6IGZhbHNlIH0pOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4uL3V0aWxzL2xvZy5qc1wiO1xuXG52YXIgV2ViU29ja2V0Q2xpZW50ID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICovXG4gIGZ1bmN0aW9uIFdlYlNvY2tldENsaWVudCh1cmwpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgV2ViU29ja2V0Q2xpZW50KTtcblxuICAgIHRoaXMuY2xpZW50ID0gbmV3IFdlYlNvY2tldCh1cmwpO1xuXG4gICAgdGhpcy5jbGllbnQub25lcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgbG9nLmVycm9yKGVycm9yKTtcbiAgICB9O1xuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0geyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gZlxuICAgKi9cblxuXG4gIF9jcmVhdGVDbGFzcyhXZWJTb2NrZXRDbGllbnQsIFt7XG4gICAga2V5OiBcIm9uT3BlblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbk9wZW4oZikge1xuICAgICAgdGhpcy5jbGllbnQub25vcGVuID0gZjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHsoLi4uYXJnczogYW55W10pID0+IHZvaWR9IGZcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcIm9uQ2xvc2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25DbG9zZShmKSB7XG4gICAgICB0aGlzLmNsaWVudC5vbmNsb3NlID0gZjtcbiAgICB9IC8vIGNhbGwgZiB3aXRoIHRoZSBtZXNzYWdlIHN0cmluZyBhcyB0aGUgZmlyc3QgYXJndW1lbnRcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSBmXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJvbk1lc3NhZ2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25NZXNzYWdlKGYpIHtcbiAgICAgIHRoaXMuY2xpZW50Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGYoZS5kYXRhKTtcbiAgICAgIH07XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFdlYlNvY2tldENsaWVudDtcbn0oKTtcblxuZXhwb3J0IHsgV2ViU29ja2V0Q2xpZW50IGFzIGRlZmF1bHQgfTsiLCIvKioqKioqLyAoZnVuY3Rpb24oKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0XCJ1c2Ugc3RyaWN0XCI7XG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlc19fID0gKHtcblxuLyoqKi8gXCIuL2NsaWVudC1zcmMvbW9kdWxlcy9sb2dnZXIvU3luY0JhaWxIb29rRmFrZS5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL2NsaWVudC1zcmMvbW9kdWxlcy9sb2dnZXIvU3luY0JhaWxIb29rRmFrZS5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUpIHtcblxuXG4vKipcbiAqIENsaWVudCBzdHViIGZvciB0YXBhYmxlIFN5bmNCYWlsSG9va1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2xpZW50VGFwYWJsZVN5bmNCYWlsSG9vaygpIHtcbiAgcmV0dXJuIHtcbiAgICBjYWxsOiBmdW5jdGlvbiBjYWxsKCkge31cbiAgfTtcbn07XG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvTG9nZ2VyLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvTG9nZ2VyLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKGZ1bmN0aW9uKF9fdW51c2VkX3dlYnBhY2tfbW9kdWxlLCBleHBvcnRzKSB7XG5cbi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gX2FycmF5V2l0aG91dEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheShhcnIpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IF9ub25JdGVyYWJsZVNwcmVhZCgpO1xufVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7XG4gIGlmICghbykgcmV0dXJuO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xuICB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XG4gIGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7XG4gIGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pO1xuICBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG59XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAodHlwZW9mICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pICE9PSBcInVuZGVmaW5lZFwiICYmIGl0ZXJbKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkuaXRlcmF0b3JdICE9IG51bGwgfHwgaXRlcltcIkBAaXRlcmF0b3JcIl0gIT0gbnVsbCkgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KGFycik7XG59XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gIGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykge1xuICAgIGFycjJbaV0gPSBhcnJbaV07XG4gIH1cblxuICByZXR1cm4gYXJyMjtcbn1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7XG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbnZhciBMb2dUeXBlID0gT2JqZWN0LmZyZWV6ZSh7XG4gIGVycm9yOlxuICAvKiogQHR5cGUge1wiZXJyb3JcIn0gKi9cbiAgXCJlcnJvclwiLFxuICAvLyBtZXNzYWdlLCBjIHN0eWxlIGFyZ3VtZW50c1xuICB3YXJuOlxuICAvKiogQHR5cGUge1wid2FyblwifSAqL1xuICBcIndhcm5cIixcbiAgLy8gbWVzc2FnZSwgYyBzdHlsZSBhcmd1bWVudHNcbiAgaW5mbzpcbiAgLyoqIEB0eXBlIHtcImluZm9cIn0gKi9cbiAgXCJpbmZvXCIsXG4gIC8vIG1lc3NhZ2UsIGMgc3R5bGUgYXJndW1lbnRzXG4gIGxvZzpcbiAgLyoqIEB0eXBlIHtcImxvZ1wifSAqL1xuICBcImxvZ1wiLFxuICAvLyBtZXNzYWdlLCBjIHN0eWxlIGFyZ3VtZW50c1xuICBkZWJ1ZzpcbiAgLyoqIEB0eXBlIHtcImRlYnVnXCJ9ICovXG4gIFwiZGVidWdcIixcbiAgLy8gbWVzc2FnZSwgYyBzdHlsZSBhcmd1bWVudHNcbiAgdHJhY2U6XG4gIC8qKiBAdHlwZSB7XCJ0cmFjZVwifSAqL1xuICBcInRyYWNlXCIsXG4gIC8vIG5vIGFyZ3VtZW50c1xuICBncm91cDpcbiAgLyoqIEB0eXBlIHtcImdyb3VwXCJ9ICovXG4gIFwiZ3JvdXBcIixcbiAgLy8gW2xhYmVsXVxuICBncm91cENvbGxhcHNlZDpcbiAgLyoqIEB0eXBlIHtcImdyb3VwQ29sbGFwc2VkXCJ9ICovXG4gIFwiZ3JvdXBDb2xsYXBzZWRcIixcbiAgLy8gW2xhYmVsXVxuICBncm91cEVuZDpcbiAgLyoqIEB0eXBlIHtcImdyb3VwRW5kXCJ9ICovXG4gIFwiZ3JvdXBFbmRcIixcbiAgLy8gW2xhYmVsXVxuICBwcm9maWxlOlxuICAvKiogQHR5cGUge1wicHJvZmlsZVwifSAqL1xuICBcInByb2ZpbGVcIixcbiAgLy8gW3Byb2ZpbGVOYW1lXVxuICBwcm9maWxlRW5kOlxuICAvKiogQHR5cGUge1wicHJvZmlsZUVuZFwifSAqL1xuICBcInByb2ZpbGVFbmRcIixcbiAgLy8gW3Byb2ZpbGVOYW1lXVxuICB0aW1lOlxuICAvKiogQHR5cGUge1widGltZVwifSAqL1xuICBcInRpbWVcIixcbiAgLy8gbmFtZSwgdGltZSBhcyBbc2Vjb25kcywgbmFub3NlY29uZHNdXG4gIGNsZWFyOlxuICAvKiogQHR5cGUge1wiY2xlYXJcIn0gKi9cbiAgXCJjbGVhclwiLFxuICAvLyBubyBhcmd1bWVudHNcbiAgc3RhdHVzOlxuICAvKiogQHR5cGUge1wic3RhdHVzXCJ9ICovXG4gIFwic3RhdHVzXCIgLy8gbWVzc2FnZSwgYXJndW1lbnRzXG5cbn0pO1xuZXhwb3J0cy5Mb2dUeXBlID0gTG9nVHlwZTtcbi8qKiBAdHlwZWRlZiB7dHlwZW9mIExvZ1R5cGVba2V5b2YgdHlwZW9mIExvZ1R5cGVdfSBMb2dUeXBlRW51bSAqL1xuXG52YXIgTE9HX1NZTUJPTCA9ICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pKFwid2VicGFjayBsb2dnZXIgcmF3IGxvZyBtZXRob2RcIik7XG52YXIgVElNRVJTX1NZTUJPTCA9ICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pKFwid2VicGFjayBsb2dnZXIgdGltZXNcIik7XG52YXIgVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MID0gKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkoXCJ3ZWJwYWNrIGxvZ2dlciBhZ2dyZWdhdGVkIHRpbWVzXCIpO1xuXG52YXIgV2VicGFja0xvZ2dlciA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKExvZ1R5cGVFbnVtLCBhbnlbXT0pOiB2b2lkfSBsb2cgbG9nIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oc3RyaW5nIHwgZnVuY3Rpb24oKTogc3RyaW5nKTogV2VicGFja0xvZ2dlcn0gZ2V0Q2hpbGRMb2dnZXIgZnVuY3Rpb24gdG8gY3JlYXRlIGNoaWxkIGxvZ2dlclxuICAgKi9cbiAgZnVuY3Rpb24gV2VicGFja0xvZ2dlcihsb2csIGdldENoaWxkTG9nZ2VyKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFdlYnBhY2tMb2dnZXIpO1xuXG4gICAgdGhpc1tMT0dfU1lNQk9MXSA9IGxvZztcbiAgICB0aGlzLmdldENoaWxkTG9nZ2VyID0gZ2V0Q2hpbGRMb2dnZXI7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoV2VicGFja0xvZ2dlciwgW3tcbiAgICBrZXk6IFwiZXJyb3JcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZXJyb3IoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmVycm9yLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwid2FyblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB3YXJuKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLndhcm4sIGFyZ3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJpbmZvXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluZm8oKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjMpLCBfa2V5MyA9IDA7IF9rZXkzIDwgX2xlbjM7IF9rZXkzKyspIHtcbiAgICAgICAgYXJnc1tfa2V5M10gPSBhcmd1bWVudHNbX2tleTNdO1xuICAgICAgfVxuXG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuaW5mbywgYXJncyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImxvZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsb2coKSB7XG4gICAgICBmb3IgKHZhciBfbGVuNCA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjQpLCBfa2V5NCA9IDA7IF9rZXk0IDwgX2xlbjQ7IF9rZXk0KyspIHtcbiAgICAgICAgYXJnc1tfa2V5NF0gPSBhcmd1bWVudHNbX2tleTRdO1xuICAgICAgfVxuXG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUubG9nLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGVidWdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVidWcoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuNSA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjUpLCBfa2V5NSA9IDA7IF9rZXk1IDwgX2xlbjU7IF9rZXk1KyspIHtcbiAgICAgICAgYXJnc1tfa2V5NV0gPSBhcmd1bWVudHNbX2tleTVdO1xuICAgICAgfVxuXG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuZGVidWcsIGFyZ3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJhc3NlcnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXNzZXJ0KGFzc2VydGlvbikge1xuICAgICAgaWYgKCFhc3NlcnRpb24pIHtcbiAgICAgICAgZm9yICh2YXIgX2xlbjYgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW42ID4gMSA/IF9sZW42IC0gMSA6IDApLCBfa2V5NiA9IDE7IF9rZXk2IDwgX2xlbjY7IF9rZXk2KyspIHtcbiAgICAgICAgICBhcmdzW19rZXk2IC0gMV0gPSBhcmd1bWVudHNbX2tleTZdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmVycm9yLCBhcmdzKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidHJhY2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdHJhY2UoKSB7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUudHJhY2UsIFtcIlRyYWNlXCJdKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY2xlYXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuY2xlYXIpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzdGF0dXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3RhdHVzKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjcgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW43KSwgX2tleTcgPSAwOyBfa2V5NyA8IF9sZW43OyBfa2V5NysrKSB7XG4gICAgICAgIGFyZ3NbX2tleTddID0gYXJndW1lbnRzW19rZXk3XTtcbiAgICAgIH1cblxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnN0YXR1cywgYXJncyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdyb3VwXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdyb3VwKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjggPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW44KSwgX2tleTggPSAwOyBfa2V5OCA8IF9sZW44OyBfa2V5OCsrKSB7XG4gICAgICAgIGFyZ3NbX2tleThdID0gYXJndW1lbnRzW19rZXk4XTtcbiAgICAgIH1cblxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmdyb3VwLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ3JvdXBDb2xsYXBzZWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ3JvdXBDb2xsYXBzZWQoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuOSA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjkpLCBfa2V5OSA9IDA7IF9rZXk5IDwgX2xlbjk7IF9rZXk5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5OV0gPSBhcmd1bWVudHNbX2tleTldO1xuICAgICAgfVxuXG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuZ3JvdXBDb2xsYXBzZWQsIGFyZ3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJncm91cEVuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBncm91cEVuZCgpIHtcbiAgICAgIGZvciAodmFyIF9sZW4xMCA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjEwKSwgX2tleTEwID0gMDsgX2tleTEwIDwgX2xlbjEwOyBfa2V5MTArKykge1xuICAgICAgICBhcmdzW19rZXkxMF0gPSBhcmd1bWVudHNbX2tleTEwXTtcbiAgICAgIH1cblxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmdyb3VwRW5kLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicHJvZmlsZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwcm9maWxlKGxhYmVsKSB7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUucHJvZmlsZSwgW2xhYmVsXSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInByb2ZpbGVFbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcHJvZmlsZUVuZChsYWJlbCkge1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnByb2ZpbGVFbmQsIFtsYWJlbF0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0aW1lXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRpbWUobGFiZWwpIHtcbiAgICAgIHRoaXNbVElNRVJTX1NZTUJPTF0gPSB0aGlzW1RJTUVSU19TWU1CT0xdIHx8IG5ldyBNYXAoKTtcbiAgICAgIHRoaXNbVElNRVJTX1NZTUJPTF0uc2V0KGxhYmVsLCBwcm9jZXNzLmhydGltZSgpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidGltZUxvZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0aW1lTG9nKGxhYmVsKSB7XG4gICAgICB2YXIgcHJldiA9IHRoaXNbVElNRVJTX1NZTUJPTF0gJiYgdGhpc1tUSU1FUlNfU1lNQk9MXS5nZXQobGFiZWwpO1xuXG4gICAgICBpZiAoIXByZXYpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gc3VjaCBsYWJlbCAnXCIuY29uY2F0KGxhYmVsLCBcIicgZm9yIFdlYnBhY2tMb2dnZXIudGltZUxvZygpXCIpKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRpbWUgPSBwcm9jZXNzLmhydGltZShwcmV2KTtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS50aW1lLCBbbGFiZWxdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkodGltZSkpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidGltZUVuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0aW1lRW5kKGxhYmVsKSB7XG4gICAgICB2YXIgcHJldiA9IHRoaXNbVElNRVJTX1NZTUJPTF0gJiYgdGhpc1tUSU1FUlNfU1lNQk9MXS5nZXQobGFiZWwpO1xuXG4gICAgICBpZiAoIXByZXYpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gc3VjaCBsYWJlbCAnXCIuY29uY2F0KGxhYmVsLCBcIicgZm9yIFdlYnBhY2tMb2dnZXIudGltZUVuZCgpXCIpKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRpbWUgPSBwcm9jZXNzLmhydGltZShwcmV2KTtcbiAgICAgIHRoaXNbVElNRVJTX1NZTUJPTF0uZGVsZXRlKGxhYmVsKTtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS50aW1lLCBbbGFiZWxdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkodGltZSkpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidGltZUFnZ3JlZ2F0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0aW1lQWdncmVnYXRlKGxhYmVsKSB7XG4gICAgICB2YXIgcHJldiA9IHRoaXNbVElNRVJTX1NZTUJPTF0gJiYgdGhpc1tUSU1FUlNfU1lNQk9MXS5nZXQobGFiZWwpO1xuXG4gICAgICBpZiAoIXByZXYpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gc3VjaCBsYWJlbCAnXCIuY29uY2F0KGxhYmVsLCBcIicgZm9yIFdlYnBhY2tMb2dnZXIudGltZUFnZ3JlZ2F0ZSgpXCIpKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRpbWUgPSBwcm9jZXNzLmhydGltZShwcmV2KTtcbiAgICAgIHRoaXNbVElNRVJTX1NZTUJPTF0uZGVsZXRlKGxhYmVsKTtcbiAgICAgIHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXSA9IHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXSB8fCBuZXcgTWFwKCk7XG4gICAgICB2YXIgY3VycmVudCA9IHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXS5nZXQobGFiZWwpO1xuXG4gICAgICBpZiAoY3VycmVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICh0aW1lWzFdICsgY3VycmVudFsxXSA+IDFlOSkge1xuICAgICAgICAgIHRpbWVbMF0gKz0gY3VycmVudFswXSArIDE7XG4gICAgICAgICAgdGltZVsxXSA9IHRpbWVbMV0gLSAxZTkgKyBjdXJyZW50WzFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRpbWVbMF0gKz0gY3VycmVudFswXTtcbiAgICAgICAgICB0aW1lWzFdICs9IGN1cnJlbnRbMV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdLnNldChsYWJlbCwgdGltZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRpbWVBZ2dyZWdhdGVFbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdGltZUFnZ3JlZ2F0ZUVuZChsYWJlbCkge1xuICAgICAgaWYgKHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgICB2YXIgdGltZSA9IHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXS5nZXQobGFiZWwpO1xuICAgICAgaWYgKHRpbWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgdGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdLmRlbGV0ZShsYWJlbCk7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUudGltZSwgW2xhYmVsXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KHRpbWUpKSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFdlYnBhY2tMb2dnZXI7XG59KCk7XG5cbmV4cG9ydHMuTG9nZ2VyID0gV2VicGFja0xvZ2dlcjtcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9jcmVhdGVDb25zb2xlTG9nZ2VyLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL2NyZWF0ZUNvbnNvbGVMb2dnZXIuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgX191bnVzZWRfd2VicGFja19leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gX2FycmF5V2l0aG91dEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheShhcnIpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IF9ub25JdGVyYWJsZVNwcmVhZCgpO1xufVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7XG4gIGlmICghbykgcmV0dXJuO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xuICB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XG4gIGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7XG4gIGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pO1xuICBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG59XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAodHlwZW9mICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pICE9PSBcInVuZGVmaW5lZFwiICYmIGl0ZXJbKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkuaXRlcmF0b3JdICE9IG51bGwgfHwgaXRlcltcIkBAaXRlcmF0b3JcIl0gIT0gbnVsbCkgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KGFycik7XG59XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gIGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykge1xuICAgIGFycjJbaV0gPSBhcnJbaV07XG4gIH1cblxuICByZXR1cm4gYXJyMjtcbn1cblxudmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9Mb2dnZXIgKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL0xvZ2dlci5qc1wiKSxcbiAgICBMb2dUeXBlID0gX3JlcXVpcmUuTG9nVHlwZTtcbi8qKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vLi4vZGVjbGFyYXRpb25zL1dlYnBhY2tPcHRpb25zXCIpLkZpbHRlckl0ZW1UeXBlc30gRmlsdGVySXRlbVR5cGVzICovXG5cbi8qKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vLi4vZGVjbGFyYXRpb25zL1dlYnBhY2tPcHRpb25zXCIpLkZpbHRlclR5cGVzfSBGaWx0ZXJUeXBlcyAqL1xuXG4vKiogQHR5cGVkZWYge2ltcG9ydChcIi4vTG9nZ2VyXCIpLkxvZ1R5cGVFbnVtfSBMb2dUeXBlRW51bSAqL1xuXG4vKiogQHR5cGVkZWYge2Z1bmN0aW9uKHN0cmluZyk6IGJvb2xlYW59IEZpbHRlckZ1bmN0aW9uICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gTG9nZ2VyQ29uc29sZVxuICogQHByb3BlcnR5IHtmdW5jdGlvbigpOiB2b2lkfSBjbGVhclxuICogQHByb3BlcnR5IHtmdW5jdGlvbigpOiB2b2lkfSB0cmFjZVxuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWR9IGluZm9cbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSBsb2dcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSB3YXJuXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gZXJyb3JcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gZGVidWdcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gZ3JvdXBcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gZ3JvdXBDb2xsYXBzZWRcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gZ3JvdXBFbmRcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gc3RhdHVzXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IHByb2ZpbGVcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gcHJvZmlsZUVuZFxuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWQ9fSBsb2dUaW1lXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBMb2dnZXJPcHRpb25zXG4gKiBAcHJvcGVydHkge2ZhbHNlfHRydWV8XCJub25lXCJ8XCJlcnJvclwifFwid2FyblwifFwiaW5mb1wifFwibG9nXCJ8XCJ2ZXJib3NlXCJ9IGxldmVsIGxvZ2xldmVsXG4gKiBAcHJvcGVydHkge0ZpbHRlclR5cGVzfGJvb2xlYW59IGRlYnVnIGZpbHRlciBmb3IgZGVidWcgbG9nZ2luZ1xuICogQHByb3BlcnR5IHtMb2dnZXJDb25zb2xlfSBjb25zb2xlIHRoZSBjb25zb2xlIHRvIGxvZyB0b1xuICovXG5cbi8qKlxuICogQHBhcmFtIHtGaWx0ZXJJdGVtVHlwZXN9IGl0ZW0gYW4gaW5wdXQgaXRlbVxuICogQHJldHVybnMge0ZpbHRlckZ1bmN0aW9ufSBmaWx0ZXIgZnVuY3Rpb25cbiAqL1xuXG5cbnZhciBmaWx0ZXJUb0Z1bmN0aW9uID0gZnVuY3Rpb24gZmlsdGVyVG9GdW5jdGlvbihpdGVtKSB7XG4gIGlmICh0eXBlb2YgaXRlbSA9PT0gXCJzdHJpbmdcIikge1xuICAgIHZhciByZWdFeHAgPSBuZXcgUmVnRXhwKFwiW1xcXFxcXFxcL11cIi5jb25jYXQoaXRlbS5yZXBsYWNlKCAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgICAvWy1bXFxde30oKSorPy5cXFxcXiR8XS9nLCBcIlxcXFwkJlwiKSwgXCIoW1xcXFxcXFxcL118JHwhfFxcXFw/KVwiKSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChpZGVudCkge1xuICAgICAgcmV0dXJuIHJlZ0V4cC50ZXN0KGlkZW50KTtcbiAgICB9O1xuICB9XG5cbiAgaWYgKGl0ZW0gJiYgdHlwZW9mIGl0ZW0gPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGl0ZW0udGVzdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChpZGVudCkge1xuICAgICAgcmV0dXJuIGl0ZW0udGVzdChpZGVudCk7XG4gICAgfTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgaXRlbSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIGl0ZW07XG4gIH1cblxuICBpZiAodHlwZW9mIGl0ZW0gPT09IFwiYm9vbGVhblwiKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBpdGVtO1xuICAgIH07XG4gIH1cbn07XG4vKipcbiAqIEBlbnVtIHtudW1iZXJ9XG4gKi9cblxuXG52YXIgTG9nTGV2ZWwgPSB7XG4gIG5vbmU6IDYsXG4gIGZhbHNlOiA2LFxuICBlcnJvcjogNSxcbiAgd2FybjogNCxcbiAgaW5mbzogMyxcbiAgbG9nOiAyLFxuICB0cnVlOiAyLFxuICB2ZXJib3NlOiAxXG59O1xuLyoqXG4gKiBAcGFyYW0ge0xvZ2dlck9wdGlvbnN9IG9wdGlvbnMgb3B0aW9ucyBvYmplY3RcbiAqIEByZXR1cm5zIHtmdW5jdGlvbihzdHJpbmcsIExvZ1R5cGVFbnVtLCBhbnlbXSk6IHZvaWR9IGxvZ2dpbmcgZnVuY3Rpb25cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChfcmVmKSB7XG4gIHZhciBfcmVmJGxldmVsID0gX3JlZi5sZXZlbCxcbiAgICAgIGxldmVsID0gX3JlZiRsZXZlbCA9PT0gdm9pZCAwID8gXCJpbmZvXCIgOiBfcmVmJGxldmVsLFxuICAgICAgX3JlZiRkZWJ1ZyA9IF9yZWYuZGVidWcsXG4gICAgICBkZWJ1ZyA9IF9yZWYkZGVidWcgPT09IHZvaWQgMCA/IGZhbHNlIDogX3JlZiRkZWJ1ZyxcbiAgICAgIGNvbnNvbGUgPSBfcmVmLmNvbnNvbGU7XG4gIHZhciBkZWJ1Z0ZpbHRlcnMgPSB0eXBlb2YgZGVidWcgPT09IFwiYm9vbGVhblwiID8gW2Z1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGVidWc7XG4gIH1dIDpcbiAgLyoqIEB0eXBlIHtGaWx0ZXJJdGVtVHlwZXNbXX0gKi9cbiAgW10uY29uY2F0KGRlYnVnKS5tYXAoZmlsdGVyVG9GdW5jdGlvbik7XG4gIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuXG4gIHZhciBsb2dsZXZlbCA9IExvZ0xldmVsW1wiXCIuY29uY2F0KGxldmVsKV0gfHwgMDtcbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIG5hbWUgb2YgdGhlIGxvZ2dlclxuICAgKiBAcGFyYW0ge0xvZ1R5cGVFbnVtfSB0eXBlIHR5cGUgb2YgdGhlIGxvZyBlbnRyeVxuICAgKiBAcGFyYW0ge2FueVtdfSBhcmdzIGFyZ3VtZW50cyBvZiB0aGUgbG9nIGVudHJ5XG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cblxuICB2YXIgbG9nZ2VyID0gZnVuY3Rpb24gbG9nZ2VyKG5hbWUsIHR5cGUsIGFyZ3MpIHtcbiAgICB2YXIgbGFiZWxlZEFyZ3MgPSBmdW5jdGlvbiBsYWJlbGVkQXJncygpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGFyZ3MpKSB7XG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA+IDAgJiYgdHlwZW9mIGFyZ3NbMF0gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICByZXR1cm4gW1wiW1wiLmNvbmNhdChuYW1lLCBcIl0gXCIpLmNvbmNhdChhcmdzWzBdKV0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShhcmdzLnNsaWNlKDEpKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFtcIltcIi5jb25jYXQobmFtZSwgXCJdXCIpXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KGFyZ3MpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgZGVidWcgPSBkZWJ1Z0ZpbHRlcnMuc29tZShmdW5jdGlvbiAoZikge1xuICAgICAgcmV0dXJuIGYobmFtZSk7XG4gICAgfSk7XG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgTG9nVHlwZS5kZWJ1ZzpcbiAgICAgICAgaWYgKCFkZWJ1ZykgcmV0dXJuOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmRlYnVnID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG4gICAgICAgICAgY29uc29sZS5kZWJ1Zy5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBMb2dUeXBlLmxvZzpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmxvZykgcmV0dXJuO1xuICAgICAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBMb2dUeXBlLmluZm86XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5pbmZvKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUuaW5mby5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBMb2dUeXBlLndhcm46XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC53YXJuKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUud2Fybi5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBMb2dUeXBlLmVycm9yOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwuZXJyb3IpIHJldHVybjtcbiAgICAgICAgY29uc29sZS5lcnJvci5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBMb2dUeXBlLnRyYWNlOlxuICAgICAgICBpZiAoIWRlYnVnKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS5ncm91cENvbGxhcHNlZDpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmxvZykgcmV0dXJuO1xuXG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC52ZXJib3NlKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuICAgICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5ncm91cENvbGxhcHNlZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG4gICAgICAgICAgICBjb25zb2xlLmdyb3VwQ29sbGFwc2VkLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgLy8gZmFsbHMgdGhyb3VnaFxuXG4gICAgICBjYXNlIExvZ1R5cGUuZ3JvdXA6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5ncm91cCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuICAgICAgICAgIGNvbnNvbGUuZ3JvdXAuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS5ncm91cEVuZDpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmxvZykgcmV0dXJuOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmdyb3VwRW5kID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG4gICAgICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS50aW1lOlxuICAgICAgICB7XG4gICAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmxvZykgcmV0dXJuO1xuICAgICAgICAgIHZhciBtcyA9IGFyZ3NbMV0gKiAxMDAwICsgYXJnc1syXSAvIDEwMDAwMDA7XG4gICAgICAgICAgdmFyIG1zZyA9IFwiW1wiLmNvbmNhdChuYW1lLCBcIl0gXCIpLmNvbmNhdChhcmdzWzBdLCBcIjogXCIpLmNvbmNhdChtcywgXCIgbXNcIik7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUubG9nVGltZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZ1RpbWUobXNnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2cobXNnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICBjYXNlIExvZ1R5cGUucHJvZmlsZTpcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUucHJvZmlsZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuICAgICAgICAgIGNvbnNvbGUucHJvZmlsZS5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS5wcm9maWxlRW5kOlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5wcm9maWxlRW5kID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG4gICAgICAgICAgY29uc29sZS5wcm9maWxlRW5kLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBMb2dUeXBlLmNsZWFyOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwubG9nKSByZXR1cm47IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUuY2xlYXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgICBjb25zb2xlLmNsZWFyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBMb2dUeXBlLnN0YXR1czpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmluZm8pIHJldHVybjtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUuc3RhdHVzID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUuc3RhdHVzKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuc3RhdHVzLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgY29uc29sZS5pbmZvLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgTG9nVHlwZSBcIi5jb25jYXQodHlwZSkpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbG9nZ2VyO1xufTtcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9ydW50aW1lLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL3J1bnRpbWUuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKGZ1bmN0aW9uKF9fdW51c2VkX3dlYnBhY2tfbW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cblxuZnVuY3Rpb24gX2V4dGVuZHMoKSB7XG4gIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcblxuICByZXR1cm4gX2V4dGVuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxudmFyIFN5bmNCYWlsSG9vayA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIHRhcGFibGUvbGliL1N5bmNCYWlsSG9vayAqLyBcIi4vY2xpZW50LXNyYy9tb2R1bGVzL2xvZ2dlci9TeW5jQmFpbEhvb2tGYWtlLmpzXCIpO1xuXG52YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL0xvZ2dlciAqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvTG9nZ2VyLmpzXCIpLFxuICAgIExvZ2dlciA9IF9yZXF1aXJlLkxvZ2dlcjtcblxudmFyIGNyZWF0ZUNvbnNvbGVMb2dnZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL2NyZWF0ZUNvbnNvbGVMb2dnZXIgKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL2NyZWF0ZUNvbnNvbGVMb2dnZXIuanNcIik7XG4vKiogQHR5cGUge2NyZWF0ZUNvbnNvbGVMb2dnZXIuTG9nZ2VyT3B0aW9uc30gKi9cblxuXG52YXIgY3VycmVudERlZmF1bHRMb2dnZXJPcHRpb25zID0ge1xuICBsZXZlbDogXCJpbmZvXCIsXG4gIGRlYnVnOiBmYWxzZSxcbiAgY29uc29sZTogY29uc29sZVxufTtcbnZhciBjdXJyZW50RGVmYXVsdExvZ2dlciA9IGNyZWF0ZUNvbnNvbGVMb2dnZXIoY3VycmVudERlZmF1bHRMb2dnZXJPcHRpb25zKTtcbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgbmFtZSBvZiB0aGUgbG9nZ2VyXG4gKiBAcmV0dXJucyB7TG9nZ2VyfSBhIGxvZ2dlclxuICovXG5cbmV4cG9ydHMuZ2V0TG9nZ2VyID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIG5ldyBMb2dnZXIoZnVuY3Rpb24gKHR5cGUsIGFyZ3MpIHtcbiAgICBpZiAoZXhwb3J0cy5ob29rcy5sb2cuY2FsbChuYW1lLCB0eXBlLCBhcmdzKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjdXJyZW50RGVmYXVsdExvZ2dlcihuYW1lLCB0eXBlLCBhcmdzKTtcbiAgICB9XG4gIH0sIGZ1bmN0aW9uIChjaGlsZE5hbWUpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5nZXRMb2dnZXIoXCJcIi5jb25jYXQobmFtZSwgXCIvXCIpLmNvbmNhdChjaGlsZE5hbWUpKTtcbiAgfSk7XG59O1xuLyoqXG4gKiBAcGFyYW0ge2NyZWF0ZUNvbnNvbGVMb2dnZXIuTG9nZ2VyT3B0aW9uc30gb3B0aW9ucyBuZXcgb3B0aW9ucywgbWVyZ2Ugd2l0aCBvbGQgb3B0aW9uc1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cblxuXG5leHBvcnRzLmNvbmZpZ3VyZURlZmF1bHRMb2dnZXIgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICBfZXh0ZW5kcyhjdXJyZW50RGVmYXVsdExvZ2dlck9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gIGN1cnJlbnREZWZhdWx0TG9nZ2VyID0gY3JlYXRlQ29uc29sZUxvZ2dlcihjdXJyZW50RGVmYXVsdExvZ2dlck9wdGlvbnMpO1xufTtcblxuZXhwb3J0cy5ob29rcyA9IHtcbiAgbG9nOiBuZXcgU3luY0JhaWxIb29rKFtcIm9yaWdpblwiLCBcInR5cGVcIiwgXCJhcmdzXCJdKVxufTtcblxuLyoqKi8gfSlcblxuLyoqKioqKi8gXHR9KTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuLyoqKioqKi8gXHRcdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzICovXG4vKioqKioqLyBcdCFmdW5jdGlvbigpIHtcbi8qKioqKiovIFx0XHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuLyoqKioqKi8gXHRcdFx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuLyoqKioqKi8gXHRcdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcbi8qKioqKiovIFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuLyoqKioqKi8gXHRcdFx0XHR9XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCAqL1xuLyoqKioqKi8gXHQhZnVuY3Rpb24oKSB7XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfVxuLyoqKioqKi8gXHR9KCk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0ICovXG4vKioqKioqLyBcdCFmdW5jdGlvbigpIHtcbi8qKioqKiovIFx0XHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuLyoqKioqKi8gXHRcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4vKioqKioqLyBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuLyoqKioqKi8gXHRcdFx0fVxuLyoqKioqKi8gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHR9KCk7XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG4vLyBUaGlzIGVudHJ5IG5lZWQgdG8gYmUgd3JhcHBlZCBpbiBhbiBJSUZFIGJlY2F1c2UgaXQgbmVlZCB0byBiZSBpc29sYXRlZCBhZ2FpbnN0IG90aGVyIG1vZHVsZXMgaW4gdGhlIGNodW5rLlxuIWZ1bmN0aW9uKCkge1xuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9jbGllbnQtc3JjL21vZHVsZXMvbG9nZ2VyL2luZGV4LmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFwiZGVmYXVsdFwiOiBmdW5jdGlvbigpIHsgcmV0dXJuIC8qIHJlZXhwb3J0IGRlZmF1bHQgZXhwb3J0IGZyb20gbmFtZWQgbW9kdWxlICovIHdlYnBhY2tfbGliX2xvZ2dpbmdfcnVudGltZV9qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fOyB9XG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciB3ZWJwYWNrX2xpYl9sb2dnaW5nX3J1bnRpbWVfanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIHdlYnBhY2svbGliL2xvZ2dpbmcvcnVudGltZS5qcyAqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvcnVudGltZS5qc1wiKTtcblxufSgpO1xudmFyIF9fd2VicGFja19leHBvcnRfdGFyZ2V0X18gPSBleHBvcnRzO1xuZm9yKHZhciBpIGluIF9fd2VicGFja19leHBvcnRzX18pIF9fd2VicGFja19leHBvcnRfdGFyZ2V0X19baV0gPSBfX3dlYnBhY2tfZXhwb3J0c19fW2ldO1xuaWYoX193ZWJwYWNrX2V4cG9ydHNfXy5fX2VzTW9kdWxlKSBPYmplY3QuZGVmaW5lUHJvcGVydHkoX193ZWJwYWNrX2V4cG9ydF90YXJnZXRfXywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKioqKioqLyB9KSgpXG47IiwiLyoqKioqKi8gKGZ1bmN0aW9uKCkgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdFwidXNlIHN0cmljdFwiO1xuLyoqKioqKi8gXHR2YXIgX193ZWJwYWNrX21vZHVsZXNfXyA9ICh7XG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvc3RyaXAtYW5zaS9pbmRleC5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL3N0cmlwLWFuc2kvaW5kZXguanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovIChmdW5jdGlvbihfX3VudXNlZF93ZWJwYWNrX19fd2VicGFja19tb2R1bGVfXywgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBcImRlZmF1bHRcIjogZnVuY3Rpb24oKSB7IHJldHVybiAvKiBiaW5kaW5nICovIHN0cmlwQW5zaTsgfVxuLyogaGFybW9ueSBleHBvcnQgKi8gfSk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgYW5zaV9yZWdleF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgYW5zaS1yZWdleCAqLyBcIi4vbm9kZV9tb2R1bGVzL3N0cmlwLWFuc2kvbm9kZV9tb2R1bGVzL2Fuc2ktcmVnZXgvaW5kZXguanNcIik7XG5cbmZ1bmN0aW9uIHN0cmlwQW5zaShzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkV4cGVjdGVkIGEgYHN0cmluZ2AsIGdvdCBgXCIuY29uY2F0KHR5cGVvZiBzdHJpbmcsIFwiYFwiKSk7XG4gIH1cblxuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoKDAsYW5zaV9yZWdleF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fW1wiZGVmYXVsdFwiXSkoKSwgJycpO1xufVxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy9zdHJpcC1hbnNpL25vZGVfbW9kdWxlcy9hbnNpLXJlZ2V4L2luZGV4LmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvc3RyaXAtYW5zaS9ub2RlX21vZHVsZXMvYW5zaS1yZWdleC9pbmRleC5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKGZ1bmN0aW9uKF9fdW51c2VkX3dlYnBhY2tfX193ZWJwYWNrX21vZHVsZV9fLCBfX3dlYnBhY2tfZXhwb3J0c19fLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFwiZGVmYXVsdFwiOiBmdW5jdGlvbigpIHsgcmV0dXJuIC8qIGJpbmRpbmcgKi8gYW5zaVJlZ2V4OyB9XG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbmZ1bmN0aW9uIGFuc2lSZWdleCgpIHtcbiAgdmFyIF9yZWYgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9LFxuICAgICAgX3JlZiRvbmx5Rmlyc3QgPSBfcmVmLm9ubHlGaXJzdCxcbiAgICAgIG9ubHlGaXJzdCA9IF9yZWYkb25seUZpcnN0ID09PSB2b2lkIDAgPyBmYWxzZSA6IF9yZWYkb25seUZpcnN0O1xuXG4gIHZhciBwYXR0ZXJuID0gW1wiW1xcXFx1MDAxQlxcXFx1MDA5Ql1bW1xcXFxdKCkjOz9dKig/Oig/Oig/Oig/OjtbLWEtekEtWlxcXFxkXFxcXC8jJi46PT8lQH5fXSspKnxbYS16QS1aXFxcXGRdKyg/OjtbLWEtekEtWlxcXFxkXFxcXC8jJi46PT8lQH5fXSopKik/XFxcXHUwMDA3KVwiLCAnKD86KD86XFxcXGR7MSw0fSg/OjtcXFxcZHswLDR9KSopP1tcXFxcZEEtUFItVFpjZi1udHFyeT0+PH5dKSknXS5qb2luKCd8Jyk7XG4gIHJldHVybiBuZXcgUmVnRXhwKHBhdHRlcm4sIG9ubHlGaXJzdCA/IHVuZGVmaW5lZCA6ICdnJyk7XG59XG5cbi8qKiovIH0pXG5cbi8qKioqKiovIFx0fSk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcbi8qKioqKiovIFx0XHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcbi8qKioqKiovIFx0XHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyAqL1xuLyoqKioqKi8gXHQhZnVuY3Rpb24oKSB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcbi8qKioqKiovIFx0XHRcdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcbi8qKioqKiovIFx0XHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG4vKioqKioqLyBcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcbi8qKioqKiovIFx0XHRcdFx0fVxuLyoqKioqKi8gXHRcdFx0fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdH0oKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQgKi9cbi8qKioqKiovIFx0IWZ1bmN0aW9uKCkge1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH1cbi8qKioqKiovIFx0fSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCAqL1xuLyoqKioqKi8gXHQhZnVuY3Rpb24oKSB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbi8qKioqKiovIFx0XHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuLyoqKioqKi8gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbi8qKioqKiovIFx0XHRcdH1cbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuLy8gVGhpcyBlbnRyeSBuZWVkIHRvIGJlIHdyYXBwZWQgaW4gYW4gSUlGRSBiZWNhdXNlIGl0IG5lZWQgdG8gYmUgaXNvbGF0ZWQgYWdhaW5zdCBvdGhlciBtb2R1bGVzIGluIHRoZSBjaHVuay5cbiFmdW5jdGlvbigpIHtcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL2NsaWVudC1zcmMvbW9kdWxlcy9zdHJpcC1hbnNpL2luZGV4LmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgc3RyaXBfYW5zaV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgc3RyaXAtYW5zaSAqLyBcIi4vbm9kZV9tb2R1bGVzL3N0cmlwLWFuc2kvaW5kZXguanNcIik7XG5cbi8qIGhhcm1vbnkgZGVmYXVsdCBleHBvcnQgKi8gX193ZWJwYWNrX2V4cG9ydHNfX1tcImRlZmF1bHRcIl0gPSAoc3RyaXBfYW5zaV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fW1wiZGVmYXVsdFwiXSk7XG59KCk7XG52YXIgX193ZWJwYWNrX2V4cG9ydF90YXJnZXRfXyA9IGV4cG9ydHM7XG5mb3IodmFyIGkgaW4gX193ZWJwYWNrX2V4cG9ydHNfXykgX193ZWJwYWNrX2V4cG9ydF90YXJnZXRfX1tpXSA9IF9fd2VicGFja19leHBvcnRzX19baV07XG5pZihfX3dlYnBhY2tfZXhwb3J0c19fLl9fZXNNb2R1bGUpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfX3dlYnBhY2tfZXhwb3J0X3RhcmdldF9fLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKioqKiovIH0pKClcbjsiLCIvLyBUaGUgZXJyb3Igb3ZlcmxheSBpcyBpbnNwaXJlZCAoYW5kIG1vc3RseSBjb3BpZWQpIGZyb20gQ3JlYXRlIFJlYWN0IEFwcCAoaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29raW5jdWJhdG9yL2NyZWF0ZS1yZWFjdC1hcHApXG4vLyBUaGV5LCBpbiB0dXJuLCBnb3QgaW5zcGlyZWQgYnkgd2VicGFjay1ob3QtbWlkZGxld2FyZSAoaHR0cHM6Ly9naXRodWIuY29tL2dsZW5qYW1pbi93ZWJwYWNrLWhvdC1taWRkbGV3YXJlKS5cbmltcG9ydCBhbnNpSFRNTCBmcm9tIFwiYW5zaS1odG1sLWNvbW11bml0eVwiO1xuaW1wb3J0IHsgZW5jb2RlIH0gZnJvbSBcImh0bWwtZW50aXRpZXNcIjtcbnZhciBjb2xvcnMgPSB7XG4gIHJlc2V0OiBbXCJ0cmFuc3BhcmVudFwiLCBcInRyYW5zcGFyZW50XCJdLFxuICBibGFjazogXCIxODE4MThcIixcbiAgcmVkOiBcIkUzNjA0OVwiLFxuICBncmVlbjogXCJCM0NCNzRcIixcbiAgeWVsbG93OiBcIkZGRDA4MFwiLFxuICBibHVlOiBcIjdDQUZDMlwiLFxuICBtYWdlbnRhOiBcIjdGQUNDQVwiLFxuICBjeWFuOiBcIkMzQzJFRlwiLFxuICBsaWdodGdyZXk6IFwiRUJFN0UzXCIsXG4gIGRhcmtncmV5OiBcIjZENzg5MVwiXG59O1xuLyoqIEB0eXBlIHtIVE1MSUZyYW1lRWxlbWVudCB8IG51bGwgfCB1bmRlZmluZWR9ICovXG5cbnZhciBpZnJhbWVDb250YWluZXJFbGVtZW50O1xuLyoqIEB0eXBlIHtIVE1MRGl2RWxlbWVudCB8IG51bGwgfCB1bmRlZmluZWR9ICovXG5cbnZhciBjb250YWluZXJFbGVtZW50O1xuLyoqIEB0eXBlIHtBcnJheTwoZWxlbWVudDogSFRNTERpdkVsZW1lbnQpID0+IHZvaWQ+fSAqL1xuXG52YXIgb25Mb2FkUXVldWUgPSBbXTtcbmFuc2lIVE1MLnNldENvbG9ycyhjb2xvcnMpO1xuXG5mdW5jdGlvbiBjcmVhdGVDb250YWluZXIoKSB7XG4gIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIpO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LmlkID0gXCJ3ZWJwYWNrLWRldi1zZXJ2ZXItY2xpZW50LW92ZXJsYXlcIjtcbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5zcmMgPSBcImFib3V0OmJsYW5rXCI7XG4gIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSBcImZpeGVkXCI7XG4gIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuc3R5bGUubGVmdCA9IDA7XG4gIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuc3R5bGUudG9wID0gMDtcbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5zdHlsZS5yaWdodCA9IDA7XG4gIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuc3R5bGUuYm90dG9tID0gMDtcbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5zdHlsZS53aWR0aCA9IFwiMTAwdndcIjtcbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBcIjEwMHZoXCI7XG4gIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuc3R5bGUuYm9yZGVyID0gXCJub25lXCI7XG4gIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuc3R5bGUuekluZGV4ID0gOTk5OTk5OTk5OTtcblxuICBpZnJhbWVDb250YWluZXJFbGVtZW50Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb250YWluZXJFbGVtZW50ID1cbiAgICAvKiogQHR5cGUge0RvY3VtZW50fSAqL1xuXG4gICAgLyoqIEB0eXBlIHtIVE1MSUZyYW1lRWxlbWVudH0gKi9cbiAgICBpZnJhbWVDb250YWluZXJFbGVtZW50LmNvbnRlbnREb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuaWQgPSBcIndlYnBhY2stZGV2LXNlcnZlci1jbGllbnQtb3ZlcmxheS1kaXZcIjtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUuYm94U2l6aW5nID0gXCJib3JkZXItYm94XCI7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS5sZWZ0ID0gMDtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLnRvcCA9IDA7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS5yaWdodCA9IDA7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS5ib3R0b20gPSAwO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUud2lkdGggPSBcIjEwMHZ3XCI7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBcIjEwMHZoXCI7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwgMCwgMCwgMC44NSlcIjtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLmNvbG9yID0gXCIjRThFOEU4XCI7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS5mb250RmFtaWx5ID0gXCJNZW5sbywgQ29uc29sYXMsIG1vbm9zcGFjZVwiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUuZm9udFNpemUgPSBcImxhcmdlXCI7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS5wYWRkaW5nID0gXCIycmVtXCI7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS5saW5lSGVpZ2h0ID0gXCIxLjJcIjtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLndoaXRlU3BhY2UgPSBcInByZS13cmFwXCI7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9IFwiYXV0b1wiO1xuICAgIHZhciBoZWFkZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgaGVhZGVyRWxlbWVudC5pbm5lclRleHQgPSBcIkNvbXBpbGVkIHdpdGggcHJvYmxlbXM6XCI7XG4gICAgdmFyIGNsb3NlQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgY2xvc2VCdXR0b25FbGVtZW50LmlubmVyVGV4dCA9IFwiWFwiO1xuICAgIGNsb3NlQnV0dG9uRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJ0cmFuc3BhcmVudFwiO1xuICAgIGNsb3NlQnV0dG9uRWxlbWVudC5zdHlsZS5ib3JkZXIgPSBcIm5vbmVcIjtcbiAgICBjbG9zZUJ1dHRvbkVsZW1lbnQuc3R5bGUuZm9udFNpemUgPSBcIjIwcHhcIjtcbiAgICBjbG9zZUJ1dHRvbkVsZW1lbnQuc3R5bGUuZm9udFdlaWdodCA9IFwiYm9sZFwiO1xuICAgIGNsb3NlQnV0dG9uRWxlbWVudC5zdHlsZS5jb2xvciA9IFwid2hpdGVcIjtcbiAgICBjbG9zZUJ1dHRvbkVsZW1lbnQuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgY2xvc2VCdXR0b25FbGVtZW50LnN0eWxlLmNzc0Zsb2F0ID0gXCJyaWdodFwiOyAvLyBAdHMtaWdub3JlXG5cbiAgICBjbG9zZUJ1dHRvbkVsZW1lbnQuc3R5bGUuc3R5bGVGbG9hdCA9IFwicmlnaHRcIjtcbiAgICBjbG9zZUJ1dHRvbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGhpZGUoKTtcbiAgICB9KTtcbiAgICBjb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKGhlYWRlckVsZW1lbnQpO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b25FbGVtZW50KTtcbiAgICBjb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gICAgY29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIikpO1xuICAgIC8qKiBAdHlwZSB7RG9jdW1lbnR9ICovXG5cbiAgICAvKiogQHR5cGUge0hUTUxJRnJhbWVFbGVtZW50fSAqL1xuICAgIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuY29udGVudERvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyRWxlbWVudCk7XG4gICAgb25Mb2FkUXVldWUuZm9yRWFjaChmdW5jdGlvbiAob25Mb2FkKSB7XG4gICAgICBvbkxvYWQoXG4gICAgICAvKiogQHR5cGUge0hUTUxEaXZFbGVtZW50fSAqL1xuICAgICAgY29udGFpbmVyRWxlbWVudCk7XG4gICAgfSk7XG4gICAgb25Mb2FkUXVldWUgPSBbXTtcbiAgICAvKiogQHR5cGUge0hUTUxJRnJhbWVFbGVtZW50fSAqL1xuXG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5vbmxvYWQgPSBudWxsO1xuICB9O1xuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaWZyYW1lQ29udGFpbmVyRWxlbWVudCk7XG59XG4vKipcbiAqIEBwYXJhbSB7KGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50KSA9PiB2b2lkfSBjYWxsYmFja1xuICovXG5cblxuZnVuY3Rpb24gZW5zdXJlT3ZlcmxheUV4aXN0cyhjYWxsYmFjaykge1xuICBpZiAoY29udGFpbmVyRWxlbWVudCkge1xuICAgIC8vIEV2ZXJ5dGhpbmcgaXMgcmVhZHksIGNhbGwgdGhlIGNhbGxiYWNrIHJpZ2h0IGF3YXkuXG4gICAgY2FsbGJhY2soY29udGFpbmVyRWxlbWVudCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgb25Mb2FkUXVldWUucHVzaChjYWxsYmFjayk7XG5cbiAgaWYgKGlmcmFtZUNvbnRhaW5lckVsZW1lbnQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjcmVhdGVDb250YWluZXIoKTtcbn0gLy8gU3VjY2Vzc2Z1bCBjb21waWxhdGlvbi5cblxuXG5mdW5jdGlvbiBoaWRlKCkge1xuICBpZiAoIWlmcmFtZUNvbnRhaW5lckVsZW1lbnQpIHtcbiAgICByZXR1cm47XG4gIH0gLy8gQ2xlYW4gdXAgYW5kIHJlc2V0IGludGVybmFsIHN0YXRlLlxuXG5cbiAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChpZnJhbWVDb250YWluZXJFbGVtZW50KTtcbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudCA9IG51bGw7XG4gIGNvbnRhaW5lckVsZW1lbnQgPSBudWxsO1xufVxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtzdHJpbmcgIHwgeyBmaWxlPzogc3RyaW5nLCBtb2R1bGVOYW1lPzogc3RyaW5nLCBsb2M/OiBzdHJpbmcsIG1lc3NhZ2U/OiBzdHJpbmcgfX0gaXRlbVxuICogQHJldHVybnMge3sgaGVhZGVyOiBzdHJpbmcsIGJvZHk6IHN0cmluZyB9fVxuICovXG5cblxuZnVuY3Rpb24gZm9ybWF0UHJvYmxlbSh0eXBlLCBpdGVtKSB7XG4gIHZhciBoZWFkZXIgPSB0eXBlID09PSBcIndhcm5pbmdcIiA/IFwiV0FSTklOR1wiIDogXCJFUlJPUlwiO1xuICB2YXIgYm9keSA9IFwiXCI7XG5cbiAgaWYgKHR5cGVvZiBpdGVtID09PSBcInN0cmluZ1wiKSB7XG4gICAgYm9keSArPSBpdGVtO1xuICB9IGVsc2Uge1xuICAgIHZhciBmaWxlID0gaXRlbS5maWxlIHx8IFwiXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXN0ZWQtdGVybmFyeVxuXG4gICAgdmFyIG1vZHVsZU5hbWUgPSBpdGVtLm1vZHVsZU5hbWUgPyBpdGVtLm1vZHVsZU5hbWUuaW5kZXhPZihcIiFcIikgIT09IC0xID8gXCJcIi5jb25jYXQoaXRlbS5tb2R1bGVOYW1lLnJlcGxhY2UoL14oXFxzfFxcUykqIS8sIFwiXCIpLCBcIiAoXCIpLmNvbmNhdChpdGVtLm1vZHVsZU5hbWUsIFwiKVwiKSA6IFwiXCIuY29uY2F0KGl0ZW0ubW9kdWxlTmFtZSkgOiBcIlwiO1xuICAgIHZhciBsb2MgPSBpdGVtLmxvYztcbiAgICBoZWFkZXIgKz0gXCJcIi5jb25jYXQobW9kdWxlTmFtZSB8fCBmaWxlID8gXCIgaW4gXCIuY29uY2F0KG1vZHVsZU5hbWUgPyBcIlwiLmNvbmNhdChtb2R1bGVOYW1lKS5jb25jYXQoZmlsZSA/IFwiIChcIi5jb25jYXQoZmlsZSwgXCIpXCIpIDogXCJcIikgOiBmaWxlKS5jb25jYXQobG9jID8gXCIgXCIuY29uY2F0KGxvYykgOiBcIlwiKSA6IFwiXCIpO1xuICAgIGJvZHkgKz0gaXRlbS5tZXNzYWdlIHx8IFwiXCI7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGhlYWRlcjogaGVhZGVyLFxuICAgIGJvZHk6IGJvZHlcbiAgfTtcbn0gLy8gQ29tcGlsYXRpb24gd2l0aCBlcnJvcnMgKGUuZy4gc3ludGF4IGVycm9yIG9yIG1pc3NpbmcgbW9kdWxlcykuXG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nICB8IHsgZmlsZT86IHN0cmluZywgbW9kdWxlTmFtZT86IHN0cmluZywgbG9jPzogc3RyaW5nLCBtZXNzYWdlPzogc3RyaW5nIH0+fSBtZXNzYWdlc1xuICovXG5cblxuZnVuY3Rpb24gc2hvdyh0eXBlLCBtZXNzYWdlcykge1xuICBlbnN1cmVPdmVybGF5RXhpc3RzKGZ1bmN0aW9uICgpIHtcbiAgICBtZXNzYWdlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICB2YXIgZW50cnlFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHZhciB0eXBlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG4gICAgICB2YXIgX2Zvcm1hdFByb2JsZW0gPSBmb3JtYXRQcm9ibGVtKHR5cGUsIG1lc3NhZ2UpLFxuICAgICAgICAgIGhlYWRlciA9IF9mb3JtYXRQcm9ibGVtLmhlYWRlcixcbiAgICAgICAgICBib2R5ID0gX2Zvcm1hdFByb2JsZW0uYm9keTtcblxuICAgICAgdHlwZUVsZW1lbnQuaW5uZXJUZXh0ID0gaGVhZGVyO1xuICAgICAgdHlwZUVsZW1lbnQuc3R5bGUuY29sb3IgPSBcIiNcIi5jb25jYXQoY29sb3JzLnJlZCk7IC8vIE1ha2UgaXQgbG9vayBzaW1pbGFyIHRvIG91ciB0ZXJtaW5hbC5cblxuICAgICAgdmFyIHRleHQgPSBhbnNpSFRNTChlbmNvZGUoYm9keSkpO1xuICAgICAgdmFyIG1lc3NhZ2VUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBtZXNzYWdlVGV4dE5vZGUuaW5uZXJIVE1MID0gdGV4dDtcbiAgICAgIGVudHJ5RWxlbWVudC5hcHBlbmRDaGlsZCh0eXBlRWxlbWVudCk7XG4gICAgICBlbnRyeUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKTtcbiAgICAgIGVudHJ5RWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIikpO1xuICAgICAgZW50cnlFbGVtZW50LmFwcGVuZENoaWxkKG1lc3NhZ2VUZXh0Tm9kZSk7XG4gICAgICBlbnRyeUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKTtcbiAgICAgIGVudHJ5RWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIikpO1xuICAgICAgLyoqIEB0eXBlIHtIVE1MRGl2RWxlbWVudH0gKi9cblxuICAgICAgY29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChlbnRyeUVsZW1lbnQpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZXhwb3J0IHsgZm9ybWF0UHJvYmxlbSwgc2hvdywgaGlkZSB9OyIsIi8qIGdsb2JhbCBfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXyAqL1xuaW1wb3J0IFdlYlNvY2tldENsaWVudCBmcm9tIFwiLi9jbGllbnRzL1dlYlNvY2tldENsaWVudC5qc1wiO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vdXRpbHMvbG9nLmpzXCI7IC8vIHRoaXMgV2Vic29ja2V0Q2xpZW50IGlzIGhlcmUgYXMgYSBkZWZhdWx0IGZhbGxiYWNrLCBpbiBjYXNlIHRoZSBjbGllbnQgaXMgbm90IGluamVjdGVkXG5cbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuXG52YXIgQ2xpZW50ID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5lc3RlZC10ZXJuYXJ5XG50eXBlb2YgX193ZWJwYWNrX2Rldl9zZXJ2ZXJfY2xpZW50X18gIT09IFwidW5kZWZpbmVkXCIgPyB0eXBlb2YgX193ZWJwYWNrX2Rldl9zZXJ2ZXJfY2xpZW50X18uZGVmYXVsdCAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19kZXZfc2VydmVyX2NsaWVudF9fLmRlZmF1bHQgOiBfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXyA6IFdlYlNvY2tldENsaWVudDtcbi8qIGVzbGludC1lbmFibGUgY2FtZWxjYXNlICovXG5cbnZhciByZXRyaWVzID0gMDtcbnZhciBtYXhSZXRyaWVzID0gMTA7XG52YXIgY2xpZW50ID0gbnVsbDtcbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICogQHBhcmFtIHt7IFtoYW5kbGVyOiBzdHJpbmddOiAoZGF0YT86IGFueSwgcGFyYW1zPzogYW55KSA9PiBhbnkgfX0gaGFuZGxlcnNcbiAqIEBwYXJhbSB7bnVtYmVyfSBbcmVjb25uZWN0XVxuICovXG5cbnZhciBzb2NrZXQgPSBmdW5jdGlvbiBpbml0U29ja2V0KHVybCwgaGFuZGxlcnMsIHJlY29ubmVjdCkge1xuICBjbGllbnQgPSBuZXcgQ2xpZW50KHVybCk7XG4gIGNsaWVudC5vbk9wZW4oZnVuY3Rpb24gKCkge1xuICAgIHJldHJpZXMgPSAwO1xuXG4gICAgaWYgKHR5cGVvZiByZWNvbm5lY3QgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIG1heFJldHJpZXMgPSByZWNvbm5lY3Q7XG4gICAgfVxuICB9KTtcbiAgY2xpZW50Lm9uQ2xvc2UoZnVuY3Rpb24gKCkge1xuICAgIGlmIChyZXRyaWVzID09PSAwKSB7XG4gICAgICBoYW5kbGVycy5jbG9zZSgpO1xuICAgIH0gLy8gVHJ5IHRvIHJlY29ubmVjdC5cblxuXG4gICAgY2xpZW50ID0gbnVsbDsgLy8gQWZ0ZXIgMTAgcmV0cmllcyBzdG9wIHRyeWluZywgdG8gcHJldmVudCBsb2dzcGFtLlxuXG4gICAgaWYgKHJldHJpZXMgPCBtYXhSZXRyaWVzKSB7XG4gICAgICAvLyBFeHBvbmVudGlhbGx5IGluY3JlYXNlIHRpbWVvdXQgdG8gcmVjb25uZWN0LlxuICAgICAgLy8gUmVzcGVjdGZ1bGx5IGNvcGllZCBmcm9tIHRoZSBwYWNrYWdlIGBnb3RgLlxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtcHJvcGVydGllc1xuICAgICAgdmFyIHJldHJ5SW5NcyA9IDEwMDAgKiBNYXRoLnBvdygyLCByZXRyaWVzKSArIE1hdGgucmFuZG9tKCkgKiAxMDA7XG4gICAgICByZXRyaWVzICs9IDE7XG4gICAgICBsb2cuaW5mbyhcIlRyeWluZyB0byByZWNvbm5lY3QuLi5cIik7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc29ja2V0KHVybCwgaGFuZGxlcnMsIHJlY29ubmVjdCk7XG4gICAgICB9LCByZXRyeUluTXMpO1xuICAgIH1cbiAgfSk7XG4gIGNsaWVudC5vbk1lc3NhZ2UoXG4gIC8qKlxuICAgKiBAcGFyYW0ge2FueX0gZGF0YVxuICAgKi9cbiAgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICB2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoZGF0YSk7XG5cbiAgICBpZiAoaGFuZGxlcnNbbWVzc2FnZS50eXBlXSkge1xuICAgICAgaGFuZGxlcnNbbWVzc2FnZS50eXBlXShtZXNzYWdlLmRhdGEsIG1lc3NhZ2UucGFyYW1zKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgc29ja2V0OyIsIi8qKlxuICogQHBhcmFtIHt7IHByb3RvY29sPzogc3RyaW5nLCBhdXRoPzogc3RyaW5nLCBob3N0bmFtZT86IHN0cmluZywgcG9ydD86IHN0cmluZywgcGF0aG5hbWU/OiBzdHJpbmcsIHNlYXJjaD86IHN0cmluZywgaGFzaD86IHN0cmluZywgc2xhc2hlcz86IGJvb2xlYW4gfX0gb2JqVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBmb3JtYXQob2JqVVJMKSB7XG4gIHZhciBwcm90b2NvbCA9IG9ialVSTC5wcm90b2NvbCB8fCBcIlwiO1xuXG4gIGlmIChwcm90b2NvbCAmJiBwcm90b2NvbC5zdWJzdHIoLTEpICE9PSBcIjpcIikge1xuICAgIHByb3RvY29sICs9IFwiOlwiO1xuICB9XG5cbiAgdmFyIGF1dGggPSBvYmpVUkwuYXV0aCB8fCBcIlwiO1xuXG4gIGlmIChhdXRoKSB7XG4gICAgYXV0aCA9IGVuY29kZVVSSUNvbXBvbmVudChhdXRoKTtcbiAgICBhdXRoID0gYXV0aC5yZXBsYWNlKC8lM0EvaSwgXCI6XCIpO1xuICAgIGF1dGggKz0gXCJAXCI7XG4gIH1cblxuICB2YXIgaG9zdCA9IFwiXCI7XG5cbiAgaWYgKG9ialVSTC5ob3N0bmFtZSkge1xuICAgIGhvc3QgPSBhdXRoICsgKG9ialVSTC5ob3N0bmFtZS5pbmRleE9mKFwiOlwiKSA9PT0gLTEgPyBvYmpVUkwuaG9zdG5hbWUgOiBcIltcIi5jb25jYXQob2JqVVJMLmhvc3RuYW1lLCBcIl1cIikpO1xuXG4gICAgaWYgKG9ialVSTC5wb3J0KSB7XG4gICAgICBob3N0ICs9IFwiOlwiLmNvbmNhdChvYmpVUkwucG9ydCk7XG4gICAgfVxuICB9XG5cbiAgdmFyIHBhdGhuYW1lID0gb2JqVVJMLnBhdGhuYW1lIHx8IFwiXCI7XG5cbiAgaWYgKG9ialVSTC5zbGFzaGVzKSB7XG4gICAgaG9zdCA9IFwiLy9cIi5jb25jYXQoaG9zdCB8fCBcIlwiKTtcblxuICAgIGlmIChwYXRobmFtZSAmJiBwYXRobmFtZS5jaGFyQXQoMCkgIT09IFwiL1wiKSB7XG4gICAgICBwYXRobmFtZSA9IFwiL1wiLmNvbmNhdChwYXRobmFtZSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKCFob3N0KSB7XG4gICAgaG9zdCA9IFwiXCI7XG4gIH1cblxuICB2YXIgc2VhcmNoID0gb2JqVVJMLnNlYXJjaCB8fCBcIlwiO1xuXG4gIGlmIChzZWFyY2ggJiYgc2VhcmNoLmNoYXJBdCgwKSAhPT0gXCI/XCIpIHtcbiAgICBzZWFyY2ggPSBcIj9cIi5jb25jYXQoc2VhcmNoKTtcbiAgfVxuXG4gIHZhciBoYXNoID0gb2JqVVJMLmhhc2ggfHwgXCJcIjtcblxuICBpZiAoaGFzaCAmJiBoYXNoLmNoYXJBdCgwKSAhPT0gXCIjXCIpIHtcbiAgICBoYXNoID0gXCIjXCIuY29uY2F0KGhhc2gpO1xuICB9XG5cbiAgcGF0aG5hbWUgPSBwYXRobmFtZS5yZXBsYWNlKC9bPyNdL2csXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWF0Y2hcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQobWF0Y2gpO1xuICB9KTtcbiAgc2VhcmNoID0gc2VhcmNoLnJlcGxhY2UoXCIjXCIsIFwiJTIzXCIpO1xuICByZXR1cm4gXCJcIi5jb25jYXQocHJvdG9jb2wpLmNvbmNhdChob3N0KS5jb25jYXQocGF0aG5hbWUpLmNvbmNhdChzZWFyY2gpLmNvbmNhdChoYXNoKTtcbn1cbi8qKlxuICogQHBhcmFtIHtVUkwgJiB7IGZyb21DdXJyZW50U2NyaXB0PzogYm9vbGVhbiB9fSBwYXJzZWRVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cblxuXG5mdW5jdGlvbiBjcmVhdGVTb2NrZXRVUkwocGFyc2VkVVJMKSB7XG4gIHZhciBob3N0bmFtZSA9IHBhcnNlZFVSTC5ob3N0bmFtZTsgLy8gTm9kZS5qcyBtb2R1bGUgcGFyc2VzIGl0IGFzIGA6OmBcbiAgLy8gYG5ldyBVUkwodXJsU3RyaW5nLCBbYmFzZVVSTFN0cmluZ10pYCBwYXJzZXMgaXQgYXMgJ1s6Ol0nXG5cbiAgdmFyIGlzSW5BZGRyQW55ID0gaG9zdG5hbWUgPT09IFwiMC4wLjAuMFwiIHx8IGhvc3RuYW1lID09PSBcIjo6XCIgfHwgaG9zdG5hbWUgPT09IFwiWzo6XVwiOyAvLyB3aHkgZG8gd2UgbmVlZCB0aGlzIGNoZWNrP1xuICAvLyBob3N0bmFtZSBuL2EgZm9yIGZpbGUgcHJvdG9jb2wgKGV4YW1wbGUsIHdoZW4gdXNpbmcgZWxlY3Ryb24sIGlvbmljKVxuICAvLyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrL3dlYnBhY2stZGV2LXNlcnZlci9wdWxsLzM4NFxuXG4gIGlmIChpc0luQWRkckFueSAmJiBzZWxmLmxvY2F0aW9uLmhvc3RuYW1lICYmIHNlbGYubG9jYXRpb24ucHJvdG9jb2wuaW5kZXhPZihcImh0dHBcIikgPT09IDApIHtcbiAgICBob3N0bmFtZSA9IHNlbGYubG9jYXRpb24uaG9zdG5hbWU7XG4gIH1cblxuICB2YXIgc29ja2V0VVJMUHJvdG9jb2wgPSBwYXJzZWRVUkwucHJvdG9jb2wgfHwgc2VsZi5sb2NhdGlvbi5wcm90b2NvbDsgLy8gV2hlbiBodHRwcyBpcyB1c2VkIGluIHRoZSBhcHAsIHNlY3VyZSB3ZWIgc29ja2V0cyBhcmUgYWx3YXlzIG5lY2Vzc2FyeSBiZWNhdXNlIHRoZSBicm93c2VyIGRvZXNuJ3QgYWNjZXB0IG5vbi1zZWN1cmUgd2ViIHNvY2tldHMuXG5cbiAgaWYgKHNvY2tldFVSTFByb3RvY29sID09PSBcImF1dG86XCIgfHwgaG9zdG5hbWUgJiYgaXNJbkFkZHJBbnkgJiYgc2VsZi5sb2NhdGlvbi5wcm90b2NvbCA9PT0gXCJodHRwczpcIikge1xuICAgIHNvY2tldFVSTFByb3RvY29sID0gc2VsZi5sb2NhdGlvbi5wcm90b2NvbDtcbiAgfVxuXG4gIHNvY2tldFVSTFByb3RvY29sID0gc29ja2V0VVJMUHJvdG9jb2wucmVwbGFjZSgvXig/Omh0dHB8ListZXh0ZW5zaW9ufGZpbGUpL2ksIFwid3NcIik7XG4gIHZhciBzb2NrZXRVUkxBdXRoID0gXCJcIjsgLy8gYG5ldyBVUkwodXJsU3RyaW5nLCBbYmFzZVVSTHN0cmluZ10pYCBkb2Vzbid0IGhhdmUgYGF1dGhgIHByb3BlcnR5XG4gIC8vIFBhcnNlIGF1dGhlbnRpY2F0aW9uIGNyZWRlbnRpYWxzIGluIGNhc2Ugd2UgbmVlZCB0aGVtXG5cbiAgaWYgKHBhcnNlZFVSTC51c2VybmFtZSkge1xuICAgIHNvY2tldFVSTEF1dGggPSBwYXJzZWRVUkwudXNlcm5hbWU7IC8vIFNpbmNlIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb24gZG9lcyBub3QgYWxsb3cgZW1wdHkgdXNlcm5hbWUsXG4gICAgLy8gd2Ugb25seSBpbmNsdWRlIHBhc3N3b3JkIGlmIHRoZSB1c2VybmFtZSBpcyBub3QgZW1wdHkuXG5cbiAgICBpZiAocGFyc2VkVVJMLnBhc3N3b3JkKSB7XG4gICAgICAvLyBSZXN1bHQ6IDx1c2VybmFtZT46PHBhc3N3b3JkPlxuICAgICAgc29ja2V0VVJMQXV0aCA9IHNvY2tldFVSTEF1dGguY29uY2F0KFwiOlwiLCBwYXJzZWRVUkwucGFzc3dvcmQpO1xuICAgIH1cbiAgfSAvLyBJbiBjYXNlIHRoZSBob3N0IGlzIGEgcmF3IElQdjYgYWRkcmVzcywgaXQgY2FuIGJlIGVuY2xvc2VkIGluXG4gIC8vIHRoZSBicmFja2V0cyBhcyB0aGUgYnJhY2tldHMgYXJlIG5lZWRlZCBpbiB0aGUgZmluYWwgVVJMIHN0cmluZy5cbiAgLy8gTmVlZCB0byByZW1vdmUgdGhvc2UgYXMgdXJsLmZvcm1hdCBibGluZGx5IGFkZHMgaXRzIG93biBzZXQgb2YgYnJhY2tldHNcbiAgLy8gaWYgdGhlIGhvc3Qgc3RyaW5nIGNvbnRhaW5zIGNvbG9ucy4gVGhhdCB3b3VsZCBsZWFkIHRvIG5vbi13b3JraW5nXG4gIC8vIGRvdWJsZSBicmFja2V0cyAoZS5nLiBbWzo6XV0pIGhvc3RcbiAgLy9cbiAgLy8gQWxsIG9mIHRoZXNlIHdlYiBzb2NrZXQgdXJsIHBhcmFtcyBhcmUgb3B0aW9uYWxseSBwYXNzZWQgaW4gdGhyb3VnaCByZXNvdXJjZVF1ZXJ5LFxuICAvLyBzbyB3ZSBuZWVkIHRvIGZhbGwgYmFjayB0byB0aGUgZGVmYXVsdCBpZiB0aGV5IGFyZSBub3QgcHJvdmlkZWRcblxuXG4gIHZhciBzb2NrZXRVUkxIb3N0bmFtZSA9IChob3N0bmFtZSB8fCBzZWxmLmxvY2F0aW9uLmhvc3RuYW1lIHx8IFwibG9jYWxob3N0XCIpLnJlcGxhY2UoL15cXFsoLiopXFxdJC8sIFwiJDFcIik7XG4gIHZhciBzb2NrZXRVUkxQb3J0ID0gcGFyc2VkVVJMLnBvcnQ7XG5cbiAgaWYgKCFzb2NrZXRVUkxQb3J0IHx8IHNvY2tldFVSTFBvcnQgPT09IFwiMFwiKSB7XG4gICAgc29ja2V0VVJMUG9ydCA9IHNlbGYubG9jYXRpb24ucG9ydDtcbiAgfSAvLyBJZiBwYXRoIGlzIHByb3ZpZGVkIGl0J2xsIGJlIHBhc3NlZCBpbiB2aWEgdGhlIHJlc291cmNlUXVlcnkgYXMgYVxuICAvLyBxdWVyeSBwYXJhbSBzbyBpdCBoYXMgdG8gYmUgcGFyc2VkIG91dCBvZiB0aGUgcXVlcnlzdHJpbmcgaW4gb3JkZXIgZm9yIHRoZVxuICAvLyBjbGllbnQgdG8gb3BlbiB0aGUgc29ja2V0IHRvIHRoZSBjb3JyZWN0IGxvY2F0aW9uLlxuXG5cbiAgdmFyIHNvY2tldFVSTFBhdGhuYW1lID0gXCIvd3NcIjtcblxuICBpZiAocGFyc2VkVVJMLnBhdGhuYW1lICYmICFwYXJzZWRVUkwuZnJvbUN1cnJlbnRTY3JpcHQpIHtcbiAgICBzb2NrZXRVUkxQYXRobmFtZSA9IHBhcnNlZFVSTC5wYXRobmFtZTtcbiAgfVxuXG4gIHJldHVybiBmb3JtYXQoe1xuICAgIHByb3RvY29sOiBzb2NrZXRVUkxQcm90b2NvbCxcbiAgICBhdXRoOiBzb2NrZXRVUkxBdXRoLFxuICAgIGhvc3RuYW1lOiBzb2NrZXRVUkxIb3N0bmFtZSxcbiAgICBwb3J0OiBzb2NrZXRVUkxQb3J0LFxuICAgIHBhdGhuYW1lOiBzb2NrZXRVUkxQYXRobmFtZSxcbiAgICBzbGFzaGVzOiB0cnVlXG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTb2NrZXRVUkw7IiwiLyoqXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRDdXJyZW50U2NyaXB0U291cmNlKCkge1xuICAvLyBgZG9jdW1lbnQuY3VycmVudFNjcmlwdGAgaXMgdGhlIG1vc3QgYWNjdXJhdGUgd2F5IHRvIGZpbmQgdGhlIGN1cnJlbnQgc2NyaXB0LFxuICAvLyBidXQgaXMgbm90IHN1cHBvcnRlZCBpbiBhbGwgYnJvd3NlcnMuXG4gIGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuZ2V0QXR0cmlidXRlKFwic3JjXCIpO1xuICB9IC8vIEZhbGxiYWNrIHRvIGdldHRpbmcgYWxsIHNjcmlwdHMgcnVubmluZyBpbiB0aGUgZG9jdW1lbnQuXG5cblxuICB2YXIgc2NyaXB0RWxlbWVudHMgPSBkb2N1bWVudC5zY3JpcHRzIHx8IFtdO1xuICB2YXIgc2NyaXB0RWxlbWVudHNXaXRoU3JjID0gQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKHNjcmlwdEVsZW1lbnRzLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIHJldHVybiBlbGVtZW50LmdldEF0dHJpYnV0ZShcInNyY1wiKTtcbiAgfSk7XG5cbiAgaWYgKHNjcmlwdEVsZW1lbnRzV2l0aFNyYy5sZW5ndGggPiAwKSB7XG4gICAgdmFyIGN1cnJlbnRTY3JpcHQgPSBzY3JpcHRFbGVtZW50c1dpdGhTcmNbc2NyaXB0RWxlbWVudHNXaXRoU3JjLmxlbmd0aCAtIDFdO1xuICAgIHJldHVybiBjdXJyZW50U2NyaXB0LmdldEF0dHJpYnV0ZShcInNyY1wiKTtcbiAgfSAvLyBGYWlsIGFzIHRoZXJlIHdhcyBubyBzY3JpcHQgdG8gdXNlLlxuXG5cbiAgdGhyb3cgbmV3IEVycm9yKFwiW3dlYnBhY2stZGV2LXNlcnZlcl0gRmFpbGVkIHRvIGdldCBjdXJyZW50IHNjcmlwdCBzb3VyY2UuXCIpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRDdXJyZW50U2NyaXB0U291cmNlOyIsImltcG9ydCBsb2dnZXIgZnJvbSBcIi4uL21vZHVsZXMvbG9nZ2VyL2luZGV4LmpzXCI7XG52YXIgbmFtZSA9IFwid2VicGFjay1kZXYtc2VydmVyXCI7IC8vIGRlZmF1bHQgbGV2ZWwgaXMgc2V0IG9uIHRoZSBjbGllbnQgc2lkZSwgc28gaXQgZG9lcyBub3QgbmVlZFxuLy8gdG8gYmUgc2V0IGJ5IHRoZSBDTEkgb3IgQVBJXG5cbnZhciBkZWZhdWx0TGV2ZWwgPSBcImluZm9cIjsgLy8gb3B0aW9ucyBuZXcgb3B0aW9ucywgbWVyZ2Ugd2l0aCBvbGQgb3B0aW9uc1xuXG4vKipcbiAqIEBwYXJhbSB7ZmFsc2UgfCB0cnVlIHwgXCJub25lXCIgfCBcImVycm9yXCIgfCBcIndhcm5cIiB8IFwiaW5mb1wiIHwgXCJsb2dcIiB8IFwidmVyYm9zZVwifSBsZXZlbFxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cblxuZnVuY3Rpb24gc2V0TG9nTGV2ZWwobGV2ZWwpIHtcbiAgbG9nZ2VyLmNvbmZpZ3VyZURlZmF1bHRMb2dnZXIoe1xuICAgIGxldmVsOiBsZXZlbFxuICB9KTtcbn1cblxuc2V0TG9nTGV2ZWwoZGVmYXVsdExldmVsKTtcbnZhciBsb2cgPSBsb2dnZXIuZ2V0TG9nZ2VyKG5hbWUpO1xuZXhwb3J0IHsgbG9nLCBzZXRMb2dMZXZlbCB9OyIsImltcG9ydCBnZXRDdXJyZW50U2NyaXB0U291cmNlIGZyb20gXCIuL2dldEN1cnJlbnRTY3JpcHRTb3VyY2UuanNcIjtcbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHJlc291cmNlUXVlcnlcbiAqIEByZXR1cm5zIHt7IFtrZXk6IHN0cmluZ106IHN0cmluZyB8IGJvb2xlYW4gfX1cbiAqL1xuXG5mdW5jdGlvbiBwYXJzZVVSTChyZXNvdXJjZVF1ZXJ5KSB7XG4gIC8qKiBAdHlwZSB7eyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfX0gKi9cbiAgdmFyIG9wdGlvbnMgPSB7fTtcblxuICBpZiAodHlwZW9mIHJlc291cmNlUXVlcnkgPT09IFwic3RyaW5nXCIgJiYgcmVzb3VyY2VRdWVyeSAhPT0gXCJcIikge1xuICAgIHZhciBzZWFyY2hQYXJhbXMgPSByZXNvdXJjZVF1ZXJ5LnN1YnN0cigxKS5zcGxpdChcIiZcIik7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlYXJjaFBhcmFtcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHBhaXIgPSBzZWFyY2hQYXJhbXNbaV0uc3BsaXQoXCI9XCIpO1xuICAgICAgb3B0aW9uc1twYWlyWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gRWxzZSwgZ2V0IHRoZSB1cmwgZnJvbSB0aGUgPHNjcmlwdD4gdGhpcyBmaWxlIHdhcyBjYWxsZWQgd2l0aC5cbiAgICB2YXIgc2NyaXB0U291cmNlID0gZ2V0Q3VycmVudFNjcmlwdFNvdXJjZSgpO1xuICAgIHZhciBzY3JpcHRTb3VyY2VVUkw7XG5cbiAgICB0cnkge1xuICAgICAgLy8gVGhlIHBsYWNlaG9sZGVyIGBiYXNlVVJMYCB3aXRoIGB3aW5kb3cubG9jYXRpb24uaHJlZmAsXG4gICAgICAvLyBpcyB0byBhbGxvdyBwYXJzaW5nIG9mIHBhdGgtcmVsYXRpdmUgb3IgcHJvdG9jb2wtcmVsYXRpdmUgVVJMcyxcbiAgICAgIC8vIGFuZCB3aWxsIGhhdmUgbm8gZWZmZWN0IGlmIGBzY3JpcHRTb3VyY2VgIGlzIGEgZnVsbHkgdmFsaWQgVVJMLlxuICAgICAgc2NyaXB0U291cmNlVVJMID0gbmV3IFVSTChzY3JpcHRTb3VyY2UsIHNlbGYubG9jYXRpb24uaHJlZik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHsvLyBVUkwgcGFyc2luZyBmYWlsZWQsIGRvIG5vdGhpbmcuXG4gICAgICAvLyBXZSB3aWxsIHN0aWxsIHByb2NlZWQgdG8gc2VlIGlmIHdlIGNhbiByZWNvdmVyIHVzaW5nIGByZXNvdXJjZVF1ZXJ5YFxuICAgIH1cblxuICAgIGlmIChzY3JpcHRTb3VyY2VVUkwpIHtcbiAgICAgIG9wdGlvbnMgPSBzY3JpcHRTb3VyY2VVUkw7XG4gICAgICBvcHRpb25zLmZyb21DdXJyZW50U2NyaXB0ID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb3B0aW9ucztcbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyc2VVUkw7IiwiaW1wb3J0IGhvdEVtaXR0ZXIgZnJvbSBcIndlYnBhY2svaG90L2VtaXR0ZXIuanNcIjtcbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuL2xvZy5qc1wiO1xuLyoqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi9pbmRleFwiKS5PcHRpb25zfSBPcHRpb25zXG4vKiogQHR5cGVkZWYge2ltcG9ydChcIi4uL2luZGV4XCIpLlN0YXR1c30gU3RhdHVzXG5cbi8qKlxuICogQHBhcmFtIHtPcHRpb25zfSBvcHRpb25zXG4gKiBAcGFyYW0ge1N0YXR1c30gc3RhdHVzXG4gKi9cblxuZnVuY3Rpb24gcmVsb2FkQXBwKF9yZWYsIHN0YXR1cykge1xuICB2YXIgaG90ID0gX3JlZi5ob3QsXG4gICAgICBsaXZlUmVsb2FkID0gX3JlZi5saXZlUmVsb2FkO1xuXG4gIGlmIChzdGF0dXMuaXNVbmxvYWRpbmcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgY3VycmVudEhhc2ggPSBzdGF0dXMuY3VycmVudEhhc2gsXG4gICAgICBwcmV2aW91c0hhc2ggPSBzdGF0dXMucHJldmlvdXNIYXNoO1xuICB2YXIgaXNJbml0aWFsID0gY3VycmVudEhhc2guaW5kZXhPZihcbiAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gIHByZXZpb3VzSGFzaCkgPj0gMDtcblxuICBpZiAoaXNJbml0aWFsKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0ge1dpbmRvd30gcm9vdFdpbmRvd1xuICAgKiBAcGFyYW0ge251bWJlcn0gaW50ZXJ2YWxJZFxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIGFwcGx5UmVsb2FkKHJvb3RXaW5kb3csIGludGVydmFsSWQpIHtcbiAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICAgIGxvZy5pbmZvKFwiQXBwIHVwZGF0ZWQuIFJlbG9hZGluZy4uLlwiKTtcbiAgICByb290V2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9XG5cbiAgdmFyIHNlYXJjaCA9IHNlbGYubG9jYXRpb24uc2VhcmNoLnRvTG93ZXJDYXNlKCk7XG4gIHZhciBhbGxvd1RvSG90ID0gc2VhcmNoLmluZGV4T2YoXCJ3ZWJwYWNrLWRldi1zZXJ2ZXItaG90PWZhbHNlXCIpID09PSAtMTtcbiAgdmFyIGFsbG93VG9MaXZlUmVsb2FkID0gc2VhcmNoLmluZGV4T2YoXCJ3ZWJwYWNrLWRldi1zZXJ2ZXItbGl2ZS1yZWxvYWQ9ZmFsc2VcIikgPT09IC0xO1xuXG4gIGlmIChob3QgJiYgYWxsb3dUb0hvdCkge1xuICAgIGxvZy5pbmZvKFwiQXBwIGhvdCB1cGRhdGUuLi5cIik7XG4gICAgaG90RW1pdHRlci5lbWl0KFwid2VicGFja0hvdFVwZGF0ZVwiLCBzdGF0dXMuY3VycmVudEhhc2gpO1xuXG4gICAgaWYgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYud2luZG93KSB7XG4gICAgICAvLyBicm9hZGNhc3QgdXBkYXRlIHRvIHdpbmRvd1xuICAgICAgc2VsZi5wb3N0TWVzc2FnZShcIndlYnBhY2tIb3RVcGRhdGVcIi5jb25jYXQoc3RhdHVzLmN1cnJlbnRIYXNoKSwgXCIqXCIpO1xuICAgIH1cbiAgfSAvLyBhbGxvdyByZWZyZXNoaW5nIHRoZSBwYWdlIG9ubHkgaWYgbGl2ZVJlbG9hZCBpc24ndCBkaXNhYmxlZFxuICBlbHNlIGlmIChsaXZlUmVsb2FkICYmIGFsbG93VG9MaXZlUmVsb2FkKSB7XG4gICAgdmFyIHJvb3RXaW5kb3cgPSBzZWxmOyAvLyB1c2UgcGFyZW50IHdpbmRvdyBmb3IgcmVsb2FkIChpbiBjYXNlIHdlJ3JlIGluIGFuIGlmcmFtZSB3aXRoIG5vIHZhbGlkIHNyYylcblxuICAgIHZhciBpbnRlcnZhbElkID0gc2VsZi5zZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAocm9vdFdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCAhPT0gXCJhYm91dDpcIikge1xuICAgICAgICAvLyByZWxvYWQgaW1tZWRpYXRlbHkgaWYgcHJvdG9jb2wgaXMgdmFsaWRcbiAgICAgICAgYXBwbHlSZWxvYWQocm9vdFdpbmRvdywgaW50ZXJ2YWxJZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb290V2luZG93ID0gcm9vdFdpbmRvdy5wYXJlbnQ7XG5cbiAgICAgICAgaWYgKHJvb3RXaW5kb3cucGFyZW50ID09PSByb290V2luZG93KSB7XG4gICAgICAgICAgLy8gaWYgcGFyZW50IGVxdWFscyBjdXJyZW50IHdpbmRvdyB3ZSd2ZSByZWFjaGVkIHRoZSByb290IHdoaWNoIHdvdWxkIGNvbnRpbnVlIGZvcmV2ZXIsIHNvIHRyaWdnZXIgYSByZWxvYWQgYW55d2F5c1xuICAgICAgICAgIGFwcGx5UmVsb2FkKHJvb3RXaW5kb3csIGludGVydmFsSWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcmVsb2FkQXBwOyIsIi8qIGdsb2JhbCBfX3Jlc291cmNlUXVlcnkgV29ya2VyR2xvYmFsU2NvcGUgKi9cbi8vIFNlbmQgbWVzc2FnZXMgdG8gdGhlIG91dHNpZGUsIHNvIHBsdWdpbnMgY2FuIGNvbnN1bWUgaXQuXG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7YW55fSBbZGF0YV1cbiAqL1xuZnVuY3Rpb24gc2VuZE1zZyh0eXBlLCBkYXRhKSB7XG4gIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiAodHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlID09PSBcInVuZGVmaW5lZFwiIHx8ICEoc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlKSkpIHtcbiAgICBzZWxmLnBvc3RNZXNzYWdlKHtcbiAgICAgIHR5cGU6IFwid2VicGFja1wiLmNvbmNhdCh0eXBlKSxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9LCBcIipcIik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgc2VuZE1zZzsiLCJ2YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZShcImV2ZW50c1wiKTtcbm1vZHVsZS5leHBvcnRzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuIiwidmFyIGxvZ0xldmVsID0gXCJpbmZvXCI7XG5cbmZ1bmN0aW9uIGR1bW15KCkge31cblxuZnVuY3Rpb24gc2hvdWxkTG9nKGxldmVsKSB7XG5cdHZhciBzaG91bGRMb2cgPVxuXHRcdChsb2dMZXZlbCA9PT0gXCJpbmZvXCIgJiYgbGV2ZWwgPT09IFwiaW5mb1wiKSB8fFxuXHRcdChbXCJpbmZvXCIsIFwid2FybmluZ1wiXS5pbmRleE9mKGxvZ0xldmVsKSA+PSAwICYmIGxldmVsID09PSBcIndhcm5pbmdcIikgfHxcblx0XHQoW1wiaW5mb1wiLCBcIndhcm5pbmdcIiwgXCJlcnJvclwiXS5pbmRleE9mKGxvZ0xldmVsKSA+PSAwICYmIGxldmVsID09PSBcImVycm9yXCIpO1xuXHRyZXR1cm4gc2hvdWxkTG9nO1xufVxuXG5mdW5jdGlvbiBsb2dHcm91cChsb2dGbikge1xuXHRyZXR1cm4gZnVuY3Rpb24gKGxldmVsLCBtc2cpIHtcblx0XHRpZiAoc2hvdWxkTG9nKGxldmVsKSkge1xuXHRcdFx0bG9nRm4obXNnKTtcblx0XHR9XG5cdH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxldmVsLCBtc2cpIHtcblx0aWYgKHNob3VsZExvZyhsZXZlbCkpIHtcblx0XHRpZiAobGV2ZWwgPT09IFwiaW5mb1wiKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhtc2cpO1xuXHRcdH0gZWxzZSBpZiAobGV2ZWwgPT09IFwid2FybmluZ1wiKSB7XG5cdFx0XHRjb25zb2xlLndhcm4obXNnKTtcblx0XHR9IGVsc2UgaWYgKGxldmVsID09PSBcImVycm9yXCIpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IobXNnKTtcblx0XHR9XG5cdH1cbn07XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGlucyAqL1xudmFyIGdyb3VwID0gY29uc29sZS5ncm91cCB8fCBkdW1teTtcbnZhciBncm91cENvbGxhcHNlZCA9IGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQgfHwgZHVtbXk7XG52YXIgZ3JvdXBFbmQgPSBjb25zb2xlLmdyb3VwRW5kIHx8IGR1bW15O1xuLyogZXNsaW50LWVuYWJsZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnMgKi9cblxubW9kdWxlLmV4cG9ydHMuZ3JvdXAgPSBsb2dHcm91cChncm91cCk7XG5cbm1vZHVsZS5leHBvcnRzLmdyb3VwQ29sbGFwc2VkID0gbG9nR3JvdXAoZ3JvdXBDb2xsYXBzZWQpO1xuXG5tb2R1bGUuZXhwb3J0cy5ncm91cEVuZCA9IGxvZ0dyb3VwKGdyb3VwRW5kKTtcblxubW9kdWxlLmV4cG9ydHMuc2V0TG9nTGV2ZWwgPSBmdW5jdGlvbiAobGV2ZWwpIHtcblx0bG9nTGV2ZWwgPSBsZXZlbDtcbn07XG5cbm1vZHVsZS5leHBvcnRzLmZvcm1hdEVycm9yID0gZnVuY3Rpb24gKGVycikge1xuXHR2YXIgbWVzc2FnZSA9IGVyci5tZXNzYWdlO1xuXHR2YXIgc3RhY2sgPSBlcnIuc3RhY2s7XG5cdGlmICghc3RhY2spIHtcblx0XHRyZXR1cm4gbWVzc2FnZTtcblx0fSBlbHNlIGlmIChzdGFjay5pbmRleE9mKG1lc3NhZ2UpIDwgMCkge1xuXHRcdHJldHVybiBtZXNzYWdlICsgXCJcXG5cIiArIHN0YWNrO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBzdGFjaztcblx0fVxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjc4MGYyYmI5MDBkNGNlNmJmMmZmXCIpIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qIGdsb2JhbCBfX3Jlc291cmNlUXVlcnksIF9fd2VicGFja19oYXNoX18gKi9cbi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwid2VicGFjay9tb2R1bGVcIiAvPlxuaW1wb3J0IHdlYnBhY2tIb3RMb2cgZnJvbSBcIndlYnBhY2svaG90L2xvZy5qc1wiO1xuaW1wb3J0IHN0cmlwQW5zaSBmcm9tIFwiLi9tb2R1bGVzL3N0cmlwLWFuc2kvaW5kZXguanNcIjtcbmltcG9ydCBwYXJzZVVSTCBmcm9tIFwiLi91dGlscy9wYXJzZVVSTC5qc1wiO1xuaW1wb3J0IHNvY2tldCBmcm9tIFwiLi9zb2NrZXQuanNcIjtcbmltcG9ydCB7IGZvcm1hdFByb2JsZW0sIHNob3csIGhpZGUgfSBmcm9tIFwiLi9vdmVybGF5LmpzXCI7XG5pbXBvcnQgeyBsb2csIHNldExvZ0xldmVsIH0gZnJvbSBcIi4vdXRpbHMvbG9nLmpzXCI7XG5pbXBvcnQgc2VuZE1lc3NhZ2UgZnJvbSBcIi4vdXRpbHMvc2VuZE1lc3NhZ2UuanNcIjtcbmltcG9ydCByZWxvYWRBcHAgZnJvbSBcIi4vdXRpbHMvcmVsb2FkQXBwLmpzXCI7XG5pbXBvcnQgY3JlYXRlU29ja2V0VVJMIGZyb20gXCIuL3V0aWxzL2NyZWF0ZVNvY2tldFVSTC5qc1wiO1xuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBPcHRpb25zXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGhvdFxuICogQHByb3BlcnR5IHtib29sZWFufSBsaXZlUmVsb2FkXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHByb2dyZXNzXG4gKiBAcHJvcGVydHkge2Jvb2xlYW4gfCB7IHdhcm5pbmdzPzogYm9vbGVhbiwgZXJyb3JzPzogYm9vbGVhbiB9fSBvdmVybGF5XG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2xvZ2dpbmddXG4gKiBAcHJvcGVydHkge251bWJlcn0gW3JlY29ubmVjdF1cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFN0YXR1c1xuICogQHByb3BlcnR5IHtib29sZWFufSBpc1VubG9hZGluZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IGN1cnJlbnRIYXNoXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3ByZXZpb3VzSGFzaF1cbiAqL1xuXG4vKipcbiAqIEB0eXBlIHtTdGF0dXN9XG4gKi9cblxudmFyIHN0YXR1cyA9IHtcbiAgaXNVbmxvYWRpbmc6IGZhbHNlLFxuICAvLyBUT0RPIFdvcmthcm91bmQgZm9yIHdlYnBhY2sgdjQsIGBfX3dlYnBhY2tfaGFzaF9fYCBpcyBub3QgcmVwbGFjZWQgd2l0aG91dCBIb3RNb2R1bGVSZXBsYWNlbWVudFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIGN1cnJlbnRIYXNoOiB0eXBlb2YgX193ZWJwYWNrX2hhc2hfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19oYXNoX18gOiBcIlwiXG59O1xuLyoqIEB0eXBlIHtPcHRpb25zfSAqL1xuXG52YXIgb3B0aW9ucyA9IHtcbiAgaG90OiBmYWxzZSxcbiAgbGl2ZVJlbG9hZDogZmFsc2UsXG4gIHByb2dyZXNzOiBmYWxzZSxcbiAgb3ZlcmxheTogZmFsc2Vcbn07XG52YXIgcGFyc2VkUmVzb3VyY2VRdWVyeSA9IHBhcnNlVVJMKF9fcmVzb3VyY2VRdWVyeSk7XG5cbmlmIChwYXJzZWRSZXNvdXJjZVF1ZXJ5LmhvdCA9PT0gXCJ0cnVlXCIpIHtcbiAgb3B0aW9ucy5ob3QgPSB0cnVlO1xuICBsb2cuaW5mbyhcIkhvdCBNb2R1bGUgUmVwbGFjZW1lbnQgZW5hYmxlZC5cIik7XG59XG5cbmlmIChwYXJzZWRSZXNvdXJjZVF1ZXJ5W1wibGl2ZS1yZWxvYWRcIl0gPT09IFwidHJ1ZVwiKSB7XG4gIG9wdGlvbnMubGl2ZVJlbG9hZCA9IHRydWU7XG4gIGxvZy5pbmZvKFwiTGl2ZSBSZWxvYWRpbmcgZW5hYmxlZC5cIik7XG59XG5cbmlmIChwYXJzZWRSZXNvdXJjZVF1ZXJ5LmxvZ2dpbmcpIHtcbiAgb3B0aW9ucy5sb2dnaW5nID0gcGFyc2VkUmVzb3VyY2VRdWVyeS5sb2dnaW5nO1xufVxuXG5pZiAodHlwZW9mIHBhcnNlZFJlc291cmNlUXVlcnkucmVjb25uZWN0ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gIG9wdGlvbnMucmVjb25uZWN0ID0gTnVtYmVyKHBhcnNlZFJlc291cmNlUXVlcnkucmVjb25uZWN0KTtcbn1cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGxldmVsXG4gKi9cblxuXG5mdW5jdGlvbiBzZXRBbGxMb2dMZXZlbChsZXZlbCkge1xuICAvLyBUaGlzIGlzIG5lZWRlZCBiZWNhdXNlIHRoZSBITVIgbG9nZ2VyIG9wZXJhdGUgc2VwYXJhdGVseSBmcm9tIGRldiBzZXJ2ZXIgbG9nZ2VyXG4gIHdlYnBhY2tIb3RMb2cuc2V0TG9nTGV2ZWwobGV2ZWwgPT09IFwidmVyYm9zZVwiIHx8IGxldmVsID09PSBcImxvZ1wiID8gXCJpbmZvXCIgOiBsZXZlbCk7XG4gIHNldExvZ0xldmVsKGxldmVsKTtcbn1cblxuaWYgKG9wdGlvbnMubG9nZ2luZykge1xuICBzZXRBbGxMb2dMZXZlbChvcHRpb25zLmxvZ2dpbmcpO1xufVxuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoXCJiZWZvcmV1bmxvYWRcIiwgZnVuY3Rpb24gKCkge1xuICBzdGF0dXMuaXNVbmxvYWRpbmcgPSB0cnVlO1xufSk7XG52YXIgb25Tb2NrZXRNZXNzYWdlID0ge1xuICBob3Q6IGZ1bmN0aW9uIGhvdCgpIHtcbiAgICBpZiAocGFyc2VkUmVzb3VyY2VRdWVyeS5ob3QgPT09IFwiZmFsc2VcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG9wdGlvbnMuaG90ID0gdHJ1ZTtcbiAgICBsb2cuaW5mbyhcIkhvdCBNb2R1bGUgUmVwbGFjZW1lbnQgZW5hYmxlZC5cIik7XG4gIH0sXG4gIGxpdmVSZWxvYWQ6IGZ1bmN0aW9uIGxpdmVSZWxvYWQoKSB7XG4gICAgaWYgKHBhcnNlZFJlc291cmNlUXVlcnlbXCJsaXZlLXJlbG9hZFwiXSA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgb3B0aW9ucy5saXZlUmVsb2FkID0gdHJ1ZTtcbiAgICBsb2cuaW5mbyhcIkxpdmUgUmVsb2FkaW5nIGVuYWJsZWQuXCIpO1xuICB9LFxuICBpbnZhbGlkOiBmdW5jdGlvbiBpbnZhbGlkKCkge1xuICAgIGxvZy5pbmZvKFwiQXBwIHVwZGF0ZWQuIFJlY29tcGlsaW5nLi4uXCIpOyAvLyBGaXhlcyAjMTA0Mi4gb3ZlcmxheSBkb2Vzbid0IGNsZWFyIGlmIGVycm9ycyBhcmUgZml4ZWQgYnV0IHdhcm5pbmdzIHJlbWFpbi5cblxuICAgIGlmIChvcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgIGhpZGUoKTtcbiAgICB9XG5cbiAgICBzZW5kTWVzc2FnZShcIkludmFsaWRcIik7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBoYXNoXG4gICAqL1xuICBoYXNoOiBmdW5jdGlvbiBoYXNoKF9oYXNoKSB7XG4gICAgc3RhdHVzLnByZXZpb3VzSGFzaCA9IHN0YXR1cy5jdXJyZW50SGFzaDtcbiAgICBzdGF0dXMuY3VycmVudEhhc2ggPSBfaGFzaDtcbiAgfSxcbiAgbG9nZ2luZzogc2V0QWxsTG9nTGV2ZWwsXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWVcbiAgICovXG4gIG92ZXJsYXk6IGZ1bmN0aW9uIG92ZXJsYXkodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgb3B0aW9ucy5vdmVybGF5ID0gdmFsdWU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZVxuICAgKi9cbiAgcmVjb25uZWN0OiBmdW5jdGlvbiByZWNvbm5lY3QodmFsdWUpIHtcbiAgICBpZiAocGFyc2VkUmVzb3VyY2VRdWVyeS5yZWNvbm5lY3QgPT09IFwiZmFsc2VcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG9wdGlvbnMucmVjb25uZWN0ID0gdmFsdWU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWVcbiAgICovXG4gIHByb2dyZXNzOiBmdW5jdGlvbiBwcm9ncmVzcyh2YWx1ZSkge1xuICAgIG9wdGlvbnMucHJvZ3Jlc3MgPSB2YWx1ZTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHt7IHBsdWdpbk5hbWU/OiBzdHJpbmcsIHBlcmNlbnQ6IG51bWJlciwgbXNnOiBzdHJpbmcgfX0gZGF0YVxuICAgKi9cbiAgXCJwcm9ncmVzcy11cGRhdGVcIjogZnVuY3Rpb24gcHJvZ3Jlc3NVcGRhdGUoZGF0YSkge1xuICAgIGlmIChvcHRpb25zLnByb2dyZXNzKSB7XG4gICAgICBsb2cuaW5mbyhcIlwiLmNvbmNhdChkYXRhLnBsdWdpbk5hbWUgPyBcIltcIi5jb25jYXQoZGF0YS5wbHVnaW5OYW1lLCBcIl0gXCIpIDogXCJcIikuY29uY2F0KGRhdGEucGVyY2VudCwgXCIlIC0gXCIpLmNvbmNhdChkYXRhLm1zZywgXCIuXCIpKTtcbiAgICB9XG5cbiAgICBzZW5kTWVzc2FnZShcIlByb2dyZXNzXCIsIGRhdGEpO1xuICB9LFxuICBcInN0aWxsLW9rXCI6IGZ1bmN0aW9uIHN0aWxsT2soKSB7XG4gICAgbG9nLmluZm8oXCJOb3RoaW5nIGNoYW5nZWQuXCIpO1xuXG4gICAgaWYgKG9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgaGlkZSgpO1xuICAgIH1cblxuICAgIHNlbmRNZXNzYWdlKFwiU3RpbGxPa1wiKTtcbiAgfSxcbiAgb2s6IGZ1bmN0aW9uIG9rKCkge1xuICAgIHNlbmRNZXNzYWdlKFwiT2tcIik7XG5cbiAgICBpZiAob3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICBoaWRlKCk7XG4gICAgfVxuXG4gICAgcmVsb2FkQXBwKG9wdGlvbnMsIHN0YXR1cyk7XG4gIH0sXG4gIC8vIFRPRE86IHJlbW92ZSBpbiB2NSBpbiBmYXZvciBvZiAnc3RhdGljLWNoYW5nZWQnXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlXG4gICAqL1xuICBcImNvbnRlbnQtY2hhbmdlZFwiOiBmdW5jdGlvbiBjb250ZW50Q2hhbmdlZChmaWxlKSB7XG4gICAgbG9nLmluZm8oXCJcIi5jb25jYXQoZmlsZSA/IFwiXFxcIlwiLmNvbmNhdChmaWxlLCBcIlxcXCJcIikgOiBcIkNvbnRlbnRcIiwgXCIgZnJvbSBzdGF0aWMgZGlyZWN0b3J5IHdhcyBjaGFuZ2VkLiBSZWxvYWRpbmcuLi5cIikpO1xuICAgIHNlbGYubG9jYXRpb24ucmVsb2FkKCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlXG4gICAqL1xuICBcInN0YXRpYy1jaGFuZ2VkXCI6IGZ1bmN0aW9uIHN0YXRpY0NoYW5nZWQoZmlsZSkge1xuICAgIGxvZy5pbmZvKFwiXCIuY29uY2F0KGZpbGUgPyBcIlxcXCJcIi5jb25jYXQoZmlsZSwgXCJcXFwiXCIpIDogXCJDb250ZW50XCIsIFwiIGZyb20gc3RhdGljIGRpcmVjdG9yeSB3YXMgY2hhbmdlZC4gUmVsb2FkaW5nLi4uXCIpKTtcbiAgICBzZWxmLmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0Vycm9yW119IHdhcm5pbmdzXG4gICAqIEBwYXJhbSB7YW55fSBwYXJhbXNcbiAgICovXG4gIHdhcm5pbmdzOiBmdW5jdGlvbiB3YXJuaW5ncyhfd2FybmluZ3MsIHBhcmFtcykge1xuICAgIGxvZy53YXJuKFwiV2FybmluZ3Mgd2hpbGUgY29tcGlsaW5nLlwiKTtcblxuICAgIHZhciBwcmludGFibGVXYXJuaW5ncyA9IF93YXJuaW5ncy5tYXAoZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICB2YXIgX2Zvcm1hdFByb2JsZW0gPSBmb3JtYXRQcm9ibGVtKFwid2FybmluZ1wiLCBlcnJvciksXG4gICAgICAgICAgaGVhZGVyID0gX2Zvcm1hdFByb2JsZW0uaGVhZGVyLFxuICAgICAgICAgIGJvZHkgPSBfZm9ybWF0UHJvYmxlbS5ib2R5O1xuXG4gICAgICByZXR1cm4gXCJcIi5jb25jYXQoaGVhZGVyLCBcIlxcblwiKS5jb25jYXQoc3RyaXBBbnNpKGJvZHkpKTtcbiAgICB9KTtcblxuICAgIHNlbmRNZXNzYWdlKFwiV2FybmluZ3NcIiwgcHJpbnRhYmxlV2FybmluZ3MpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcmludGFibGVXYXJuaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgbG9nLndhcm4ocHJpbnRhYmxlV2FybmluZ3NbaV0pO1xuICAgIH1cblxuICAgIHZhciBuZWVkU2hvd092ZXJsYXlGb3JXYXJuaW5ncyA9IHR5cGVvZiBvcHRpb25zLm92ZXJsYXkgPT09IFwiYm9vbGVhblwiID8gb3B0aW9ucy5vdmVybGF5IDogb3B0aW9ucy5vdmVybGF5ICYmIG9wdGlvbnMub3ZlcmxheS53YXJuaW5ncztcblxuICAgIGlmIChuZWVkU2hvd092ZXJsYXlGb3JXYXJuaW5ncykge1xuICAgICAgc2hvdyhcIndhcm5pbmdcIiwgX3dhcm5pbmdzKTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5wcmV2ZW50UmVsb2FkaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmVsb2FkQXBwKG9wdGlvbnMsIHN0YXR1cyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RXJyb3JbXX0gZXJyb3JzXG4gICAqL1xuICBlcnJvcnM6IGZ1bmN0aW9uIGVycm9ycyhfZXJyb3JzKSB7XG4gICAgbG9nLmVycm9yKFwiRXJyb3JzIHdoaWxlIGNvbXBpbGluZy4gUmVsb2FkIHByZXZlbnRlZC5cIik7XG5cbiAgICB2YXIgcHJpbnRhYmxlRXJyb3JzID0gX2Vycm9ycy5tYXAoZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICB2YXIgX2Zvcm1hdFByb2JsZW0yID0gZm9ybWF0UHJvYmxlbShcImVycm9yXCIsIGVycm9yKSxcbiAgICAgICAgICBoZWFkZXIgPSBfZm9ybWF0UHJvYmxlbTIuaGVhZGVyLFxuICAgICAgICAgIGJvZHkgPSBfZm9ybWF0UHJvYmxlbTIuYm9keTtcblxuICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KGhlYWRlciwgXCJcXG5cIikuY29uY2F0KHN0cmlwQW5zaShib2R5KSk7XG4gICAgfSk7XG5cbiAgICBzZW5kTWVzc2FnZShcIkVycm9yc1wiLCBwcmludGFibGVFcnJvcnMpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcmludGFibGVFcnJvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxvZy5lcnJvcihwcmludGFibGVFcnJvcnNbaV0pO1xuICAgIH1cblxuICAgIHZhciBuZWVkU2hvd092ZXJsYXlGb3JFcnJvcnMgPSB0eXBlb2Ygb3B0aW9ucy5vdmVybGF5ID09PSBcImJvb2xlYW5cIiA/IG9wdGlvbnMub3ZlcmxheSA6IG9wdGlvbnMub3ZlcmxheSAmJiBvcHRpb25zLm92ZXJsYXkuZXJyb3JzO1xuXG4gICAgaWYgKG5lZWRTaG93T3ZlcmxheUZvckVycm9ycykge1xuICAgICAgc2hvdyhcImVycm9yXCIsIF9lcnJvcnMpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtFcnJvcn0gZXJyb3JcbiAgICovXG4gIGVycm9yOiBmdW5jdGlvbiBlcnJvcihfZXJyb3IpIHtcbiAgICBsb2cuZXJyb3IoX2Vycm9yKTtcbiAgfSxcbiAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgIGxvZy5pbmZvKFwiRGlzY29ubmVjdGVkIVwiKTtcblxuICAgIGlmIChvcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgIGhpZGUoKTtcbiAgICB9XG5cbiAgICBzZW5kTWVzc2FnZShcIkNsb3NlXCIpO1xuICB9XG59O1xudmFyIHNvY2tldFVSTCA9IGNyZWF0ZVNvY2tldFVSTChwYXJzZWRSZXNvdXJjZVF1ZXJ5KTtcbnNvY2tldChzb2NrZXRVUkwsIG9uU29ja2V0TWVzc2FnZSwgb3B0aW9ucy5yZWNvbm5lY3QpOyIsImltcG9ydCBDYW52YXMgZnJvbSBcIi4vY29tcG9uZW50cy9jYW52YXNcIlxyXG5cclxuY2xhc3MgQXBwIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdCgpXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICBuZXcgQ2FudmFzKClcclxuICAgIH1cclxufVxyXG5uZXcgQXBwKCkiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsib2dsIiwidmVydGV4U2hhZGVyIiwiZnJhZ21lbnRTaGFkZXIiLCJDYW52YXMiLCJjb25zdHJ1Y3RvciIsImJpbmQiLCJpbWdTaXplIiwid2lkdGgiLCJoZWlnaHQiLCJjYW52YXMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJyZW5kZXJlciIsIlJlbmRlcmVyIiwiZHByIiwiZ2wiLCJhc3BlY3QiLCJtb3VzZSIsIlZlYzIiLCJ2ZWxvY2l0eSIsImZsb3dtYXAiLCJGbG93bWFwIiwiYWxwaGEiLCJsYXN0VGltZSIsInVuZGVmaW5lZCIsImxhc3RNb3VzZSIsImlzVG91Y2hDYXBhYmxlIiwid2luZG93IiwickFGIiwiaW5pdCIsImZvckVhY2giLCJmbiIsInJlc2l6ZSIsImExIiwiYTIiLCJpbWFnZUFzcGVjdCIsImlubmVySGVpZ2h0IiwiaW5uZXJXaWR0aCIsIm1lc2giLCJwcm9ncmFtIiwidW5pZm9ybXMiLCJyZXMiLCJ2YWx1ZSIsIlZlYzQiLCJzZXRTaXplIiwiY3JlYXRlR2VvbWV0cnkiLCJnZW9tZXRyeSIsIkdlb21ldHJ5IiwicG9zaXRpb24iLCJzaXplIiwiZGF0YSIsIkZsb2F0MzJBcnJheSIsInV2IiwidXBkYXRlVGV4dHVyZSIsInRleHR1cmUiLCJUZXh0dXJlIiwibWluRmlsdGVyIiwiTElORUFSIiwibWFnRmlsdGVyIiwiaW1nIiwiSW1hZ2UiLCJvbmxvYWQiLCJpbWFnZSIsImNyb3NzT3JpZ2luIiwic3JjIiwiY3JlYXRlU2hhZGVycyIsInRleHR1cmVBc3BlY3QiLCJQcm9ncmFtIiwidmVydGV4IiwiZnJhZ21lbnQiLCJ1VGltZSIsInRXYXRlciIsInRGbG93IiwidW5pZm9ybSIsImNyZWF0ZU1lc2giLCJNZXNoIiwidXBkYXRlTW91c2UiLCJlIiwicHJldmVudERlZmF1bHQiLCJjaGFuZ2VkVG91Y2hlcyIsImxlbmd0aCIsIngiLCJwYWdlWCIsInkiLCJwYWdlWSIsInNldCIsInBlcmZvcm1hbmNlIiwibm93IiwiZGVsdGFYIiwiZGVsdGFZIiwidGltZSIsImRlbHRhIiwiTWF0aCIsIm1heCIsIm5lZWRzVXBkYXRlIiwidXBkYXRlIiwidCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNvcHkiLCJsZXJwIiwibGVuIiwicmVuZGVyIiwic2NlbmUiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImFkZEV2ZW50TGlzdGVuZXJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhc3NpdmUiLCJyZW1vdmVFdmVudExpc3RlbmVycyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJkZXN0cm95IiwiYSIsImIiLCJjIiwiZCIsInNxcnQiLCJ1IiwidiIsInciLCJmIiwieiIsIkEiLCJQSSIsImFjb3MiLCJBcnJheSIsImciLCJhZGQiLCJzdWIiLCJtdWx0aXBseSIsImRpdmlkZSIsImludmVyc2UiLCJkaXN0YW5jZSIsInNxdWFyZWRMZW4iLCJzcXVhcmVkRGlzdGFuY2UiLCJqIiwiaCIsImkiLCJuZWdhdGUiLCJjcm9zcyIsImsiLCJzY2FsZSIsIm5vcm1hbGl6ZSIsImRvdCIsImVxdWFscyIsImFwcGx5TWF0cml4NCIsImFwcGx5UXVhdGVybmlvbiIsInEiLCJsIiwibiIsIm8iLCJwIiwibSIsImFuZ2xlIiwiY2xvbmUiLCJmcm9tQXJyYXkiLCJ0b0FycmF5IiwidHJhbnNmb3JtRGlyZWN0aW9uIiwiQiIsIkMiLCJEIiwiYXR0cmlidXRlcyIsImlkIiwiVkFPcyIsImRyYXdSYW5nZSIsInN0YXJ0IiwiY291bnQiLCJpbnN0YW5jZWRDb3VudCIsImJpbmRWZXJ0ZXhBcnJheSIsImN1cnJlbnRHZW9tZXRyeSIsImdsU3RhdGUiLCJzdGF0ZSIsImFkZEF0dHJpYnV0ZSIsInR5cGUiLCJGTE9BVCIsIlVpbnQxNkFycmF5IiwiVU5TSUdORURfU0hPUlQiLCJVTlNJR05FRF9JTlQiLCJ0YXJnZXQiLCJFTEVNRU5UX0FSUkFZX0JVRkZFUiIsIkFSUkFZX0JVRkZFUiIsImJ1ZmZlciIsImNyZWF0ZUJ1ZmZlciIsImRpdmlzb3IiLCJpbnN0YW5jZWQiLCJ1cGRhdGVBdHRyaWJ1dGUiLCJpc0luc3RhbmNlZCIsImNvbnNvbGUiLCJ3YXJuIiwibWluIiwiaW5kZXgiLCJib3VuZEJ1ZmZlciIsImJpbmRCdWZmZXIiLCJidWZmZXJEYXRhIiwiU1RBVElDX0RSQVciLCJzZXRJbmRleCIsInNldERyYXdSYW5nZSIsInNldEluc3RhbmNlZENvdW50IiwiY3JlYXRlVkFPIiwiYXR0cmlidXRlT3JkZXIiLCJjcmVhdGVWZXJ0ZXhBcnJheSIsImJpbmRBdHRyaWJ1dGVzIiwiYXR0cmlidXRlTG9jYXRpb25zIiwidmVydGV4QXR0cmliUG9pbnRlciIsImVuYWJsZVZlcnRleEF0dHJpYkFycmF5IiwidmVydGV4QXR0cmliRGl2aXNvciIsImRyYXciLCJtb2RlIiwiVFJJQU5HTEVTIiwiZHJhd0VsZW1lbnRzSW5zdGFuY2VkIiwiZHJhd0FycmF5c0luc3RhbmNlZCIsImRyYXdFbGVtZW50cyIsImRyYXdBcnJheXMiLCJjb21wdXRlQm91bmRpbmdCb3giLCJib3VuZHMiLCJjZW50ZXIiLCJyYWRpdXMiLCJjb21wdXRlQm91bmRpbmdTcGhlcmUiLCJyZW1vdmUiLCJ2YW8iLCJkZWxldGVWZXJ0ZXhBcnJheSIsImRlbGV0ZUJ1ZmZlciIsIkUiLCJGIiwidHJhbnNwYXJlbnQiLCJjdWxsRmFjZSIsIkJBQ0siLCJmcm9udEZhY2UiLCJDQ1ciLCJkZXB0aFRlc3QiLCJkZXB0aFdyaXRlIiwiciIsImRlcHRoRnVuYyIsInMiLCJMRVNTIiwiYmxlbmRGdW5jIiwiYmxlbmRFcXVhdGlvbiIsInByZW11bHRpcGxpZWRBbHBoYSIsInNldEJsZW5kRnVuYyIsIk9ORSIsIk9ORV9NSU5VU19TUkNfQUxQSEEiLCJTUkNfQUxQSEEiLCJjcmVhdGVTaGFkZXIiLCJWRVJURVhfU0hBREVSIiwic2hhZGVyU291cmNlIiwiY29tcGlsZVNoYWRlciIsImdldFNoYWRlckluZm9Mb2ciLCJIIiwiRlJBR01FTlRfU0hBREVSIiwiY3JlYXRlUHJvZ3JhbSIsImF0dGFjaFNoYWRlciIsImxpbmtQcm9ncmFtIiwiZ2V0UHJvZ3JhbVBhcmFtZXRlciIsIkxJTktfU1RBVFVTIiwiZ2V0UHJvZ3JhbUluZm9Mb2ciLCJkZWxldGVTaGFkZXIiLCJ1bmlmb3JtTG9jYXRpb25zIiwiTWFwIiwiQUNUSVZFX1VOSUZPUk1TIiwiZ2V0QWN0aXZlVW5pZm9ybSIsImdldFVuaWZvcm1Mb2NhdGlvbiIsIm5hbWUiLCJtYXRjaCIsInVuaWZvcm1OYW1lIiwiaXNTdHJ1Y3RBcnJheSIsInN0cnVjdEluZGV4IiwiTnVtYmVyIiwic3RydWN0UHJvcGVydHkiLCJpc05hTiIsImlzU3RydWN0IiwiQUNUSVZFX0FUVFJJQlVURVMiLCJnZXRBY3RpdmVBdHRyaWIiLCJnZXRBdHRyaWJMb2NhdGlvbiIsImpvaW4iLCJkc3QiLCJzcmNBbHBoYSIsImRzdEFscGhhIiwic2V0QmxlbmRFcXVhdGlvbiIsIm1vZGVSR0IiLCJtb2RlQWxwaGEiLCJhcHBseVN0YXRlIiwiZW5hYmxlIiwiREVQVEhfVEVTVCIsImRpc2FibGUiLCJDVUxMX0ZBQ0UiLCJCTEVORCIsInNldEN1bGxGYWNlIiwic2V0RnJvbnRGYWNlIiwic2V0RGVwdGhNYXNrIiwic2V0RGVwdGhGdW5jIiwidXNlIiwiZmxpcEZhY2VzIiwiY3VycmVudFByb2dyYW0iLCJ1c2VQcm9ncmFtIiwiSiIsIkciLCJwdXNoIiwiQ1ciLCJkZWxldGVQcm9ncmFtIiwiZ2V0Iiwic2xpY2UiLCJ1bmlmb3JtMWZ2IiwidW5pZm9ybTFmIiwidW5pZm9ybTJmdiIsInVuaWZvcm0zZnYiLCJ1bmlmb3JtNGZ2IiwidW5pZm9ybTFpdiIsInVuaWZvcm0xaSIsInVuaWZvcm0yaXYiLCJ1bmlmb3JtM2l2IiwidW5pZm9ybTRpdiIsInVuaWZvcm1NYXRyaXgyZnYiLCJ1bmlmb3JtTWF0cml4M2Z2IiwidW5pZm9ybU1hdHJpeDRmdiIsInNwbGl0IiwiSSIsIksiLCJMIiwiTSIsIl8iLCJOIiwib25DaGFuZ2UiLCJpZGVudGl0eSIsInJvdGF0ZVgiLCJzaW4iLCJjb3MiLCJyb3RhdGVZIiwicm90YXRlWiIsImNvbmp1Z2F0ZSIsImZyb21NYXRyaXgzIiwiZnJvbUV1bGVyIiwib3JkZXIiLCJmcm9tQXhpc0FuZ2xlIiwic2xlcnAiLCJPIiwidHJhbnNsYXRlIiwiZnJvbVBlcnNwZWN0aXZlIiwiZm92IiwibmVhciIsImZhciIsInRhbiIsImZyb21PcnRob2dvbmFsIiwibGVmdCIsInJpZ2h0IiwiYm90dG9tIiwidG9wIiwiZnJvbVF1YXRlcm5pb24iLCJzZXRQb3NpdGlvbiIsImNvbXBvc2UiLCJnZXRSb3RhdGlvbiIsImdldFRyYW5zbGF0aW9uIiwiZ2V0U2NhbGluZyIsImdldE1heFNjYWxlT25BeGlzIiwibG9va0F0IiwiZGV0ZXJtaW5hbnQiLCJQIiwicmVvcmRlciIsImZyb21Sb3RhdGlvbk1hdHJpeCIsImFzaW4iLCJhYnMiLCJhdGFuMiIsInBhcmVudCIsImNoaWxkcmVuIiwidmlzaWJsZSIsIm1hdHJpeCIsIndvcmxkTWF0cml4IiwibWF0cml4QXV0b1VwZGF0ZSIsInF1YXRlcm5pb24iLCJyb3RhdGlvbiIsInVwIiwic2V0UGFyZW50IiwicmVtb3ZlQ2hpbGQiLCJhZGRDaGlsZCIsImluZGV4T2YiLCJzcGxpY2UiLCJ1cGRhdGVNYXRyaXhXb3JsZCIsInVwZGF0ZU1hdHJpeCIsIndvcmxkTWF0cml4TmVlZHNVcGRhdGUiLCJ0cmF2ZXJzZSIsImRlY29tcG9zZSIsIlEiLCJSIiwiUyIsIlQiLCJyb3RhdGUiLCJmcm9tTWF0cml4NCIsImZyb21CYXNpcyIsImdldE5vcm1hbE1hdHJpeCIsIlUiLCJmcnVzdHVtQ3VsbGVkIiwicmVuZGVyT3JkZXIiLCJtb2RlbFZpZXdNYXRyaXgiLCJub3JtYWxNYXRyaXgiLCJtb2RlbE1hdHJpeCIsIk9iamVjdCIsImFzc2lnbiIsInZpZXdNYXRyaXgiLCJwcm9qZWN0aW9uTWF0cml4IiwiY2FtZXJhUG9zaXRpb24iLCJjYW1lcmEiLCJvbkJlZm9yZVJlbmRlciIsIm9uQWZ0ZXJSZW5kZXIiLCJWIiwiVWludDhBcnJheSIsIlciLCJYIiwiVEVYVFVSRV8yRCIsIlVOU0lHTkVEX0JZVEUiLCJmb3JtYXQiLCJSR0JBIiwiaW50ZXJuYWxGb3JtYXQiLCJ3cmFwUyIsIkNMQU1QX1RPX0VER0UiLCJ3cmFwVCIsImdlbmVyYXRlTWlwbWFwcyIsIk5FQVJFU1RfTUlQTUFQX0xJTkVBUiIsInByZW11bHRpcGx5QWxwaGEiLCJ1bnBhY2tBbGlnbm1lbnQiLCJmbGlwWSIsImxldmVsIiwiY3JlYXRlVGV4dHVyZSIsInN0b3JlIiwiUkVQRUFUIiwidGV4dHVyZVVuaXRzIiwiYWN0aXZlVGV4dHVyZVVuaXQiLCJiaW5kVGV4dHVyZSIsImFjdGl2ZVRleHR1cmUiLCJwaXhlbFN0b3JlaSIsIlVOUEFDS19GTElQX1lfV0VCR0wiLCJVTlBBQ0tfUFJFTVVMVElQTFlfQUxQSEFfV0VCR0wiLCJVTlBBQ0tfQUxJR05NRU5UIiwidGV4UGFyYW1ldGVyaSIsIlRFWFRVUkVfTUlOX0ZJTFRFUiIsIlRFWFRVUkVfTUFHX0ZJTFRFUiIsIlRFWFRVUkVfV1JBUF9TIiwiVEVYVFVSRV9XUkFQX1QiLCJpc1dlYmdsMiIsIkFycmF5QnVmZmVyIiwiaXNWaWV3IiwidGV4SW1hZ2UyRCIsImdlbmVyYXRlTWlwbWFwIiwib25VcGRhdGUiLCJGUkFNRUJVRkZFUiIsImNvbG9yIiwiZGVwdGgiLCJzdGVuY2lsIiwiZGVwdGhUZXh0dXJlIiwiY3JlYXRlRnJhbWVidWZmZXIiLCJiaW5kRnJhbWVidWZmZXIiLCJ0ZXh0dXJlcyIsImZyYW1lYnVmZmVyVGV4dHVyZTJEIiwiQ09MT1JfQVRUQUNITUVOVDAiLCJnZXRFeHRlbnNpb24iLCJORUFSRVNUIiwiREVQVEhfQ09NUE9ORU5UIiwiREVQVEhfQ09NUE9ORU5UMjQiLCJERVBUSF9BVFRBQ0hNRU5UIiwiZGVwdGhCdWZmZXIiLCJjcmVhdGVSZW5kZXJidWZmZXIiLCJiaW5kUmVuZGVyYnVmZmVyIiwiUkVOREVSQlVGRkVSIiwicmVuZGVyYnVmZmVyU3RvcmFnZSIsIkRFUFRIX0NPTVBPTkVOVDE2IiwiZnJhbWVidWZmZXJSZW5kZXJidWZmZXIiLCJzdGVuY2lsQnVmZmVyIiwiU1RFTkNJTF9JTkRFWDgiLCJTVEVOQ0lMX0FUVEFDSE1FTlQiLCJkZXB0aFN0ZW5jaWxCdWZmZXIiLCJERVBUSF9TVEVOQ0lMIiwiREVQVEhfU1RFTkNJTF9BVFRBQ0hNRU5UIiwiaGV4VG9SR0IiLCJleGVjIiwicGFyc2VJbnQiLCJZIiwiJCIsIloiLCJhYSIsImFwcGx5TWF0cml4MyIsIndpZHRoU2VnbWVudHMiLCJoZWlnaHRTZWdtZW50cyIsIlVpbnQzMkFycmF5IiwiYnVpbGRQbGFuZSIsIm5vcm1hbCIsImFiIiwiTk9ORSIsIlJPVEFURSIsIkRPTExZIiwiUEFOIiwiRE9MTFlfUEFOIiwiYWMiLCJhZCIsImFlIiwiYWYiLCJhZyIsImFoIiwiYWkiLCJhaiIsImFrIiwiYWwiLCJhbSIsImFuIiwiYW8iLCJvYmplY3RzIiwiZWxhcHNlZCIsIndlaWdodCIsImR1cmF0aW9uIiwiZnJhbWVzIiwiZmxvb3IiLCJhcCIsIkFuaW1hdGlvbiIsIkJveCIsImRlcHRoU2VnbWVudHMiLCJDYW1lcmEiLCJwcm9qZWN0aW9uVmlld01hdHJpeCIsIm9ydGhvZ3JhcGhpYyIsInBlcnNwZWN0aXZlIiwicHJvamVjdCIsInVucHJvamVjdCIsInVwZGF0ZUZydXN0dW0iLCJmcnVzdHVtIiwiY29uc3RhbnQiLCJmcnVzdHVtSW50ZXJzZWN0c01lc2giLCJmcnVzdHVtSW50ZXJzZWN0c1NwaGVyZSIsIkNvbG9yIiwiQ3lsaW5kZXIiLCJyYWRpYWxTZWdtZW50cyIsIkV1bGVyIiwiZmFsbG9mZiIsImRpc3NpcGF0aW9uIiwibWFzayIsInJlYWQiLCJ3cml0ZSIsInN3YXAiLCJleHRlbnNpb25zIiwiSEFMRl9GTE9BVCIsIk9FU190ZXh0dXJlX2hhbGZfZmxvYXQiLCJIQUxGX0ZMT0FUX09FUyIsIlJHQkExNkYiLCJ0TWFwIiwidUZhbGxvZmYiLCJ1QWxwaGEiLCJ1RGlzc2lwYXRpb24iLCJ1QXNwZWN0IiwidU1vdXNlIiwidVZlbG9jaXR5IiwiY2xlYXIiLCJHUEdQVSIsInBhc3NlcyIsImRhdGFMZW5ndGgiLCJwb3ciLCJjZWlsIiwibG9nIiwiTE4yIiwiY29vcmRzIiwiUkdCQTMyRiIsImZibyIsImFkZFBhc3MiLCJ0ZXh0dXJlVW5pZm9ybSIsImVuYWJsZWQiLCJmaWx0ZXIiLCJNYXQzIiwiTWF0NCIsIk5vcm1hbFByb2dyYW0iLCJPcmJpdCIsImVsZW1lbnQiLCJlYXNlIiwiaW5lcnRpYSIsImVuYWJsZVJvdGF0ZSIsInJvdGF0ZVNwZWVkIiwiZW5hYmxlWm9vbSIsInpvb21TcGVlZCIsImVuYWJsZVBhbiIsInBhblNwZWVkIiwibWluUG9sYXJBbmdsZSIsIm1heFBvbGFyQW5nbGUiLCJtaW5BemltdXRoQW5nbGUiLCJtYXhBemltdXRoQW5nbGUiLCJtaW5EaXN0YW5jZSIsIm1heERpc3RhbmNlIiwicGhpIiwidGhldGEiLCJtb3VzZUJ1dHRvbnMiLCJPUkJJVCIsIlpPT00iLCJib2R5IiwiY2xpZW50SGVpZ2h0IiwiYnV0dG9uIiwiY2xpZW50WCIsImNsaWVudFkiLCJzdG9wUHJvcGFnYXRpb24iLCJ0b3VjaGVzIiwiUGxhbmUiLCJQb3N0Iiwib3B0aW9ucyIsInNvcnQiLCJmcnVzdHVtQ3VsbCIsIlF1YXQiLCJSYXljYXN0Iiwib3JpZ2luIiwiZGlyZWN0aW9uIiwiY2FzdE1vdXNlIiwiaW50ZXJzZWN0Qm91bmRzIiwiaXNBcnJheSIsInJheWNhc3QiLCJpbnRlcnNlY3RTcGhlcmUiLCJpbnRlcnNlY3RCb3giLCJoaXQiLCJsb2NhbFBvaW50IiwiUmVuZGVyVGFyZ2V0IiwiY3JlYXRlRWxlbWVudCIsImFudGlhbGlhcyIsInByZXNlcnZlRHJhd2luZ0J1ZmZlciIsInBvd2VyUHJlZmVyZW5jZSIsImF1dG9DbGVhciIsIndlYmdsIiwiZ2V0Q29udGV4dCIsInBhcmFtZXRlcnMiLCJtYXhUZXh0dXJlVW5pdHMiLCJnZXRQYXJhbWV0ZXIiLCJNQVhfQ09NQklORURfVEVYVFVSRV9JTUFHRV9VTklUUyIsIlpFUk8iLCJGVU5DX0FERCIsImRlcHRoTWFzayIsImZyYW1lYnVmZmVyIiwidmlld3BvcnQiLCJzdHlsZSIsInNldFZpZXdwb3J0IiwiYmxlbmRGdW5jU2VwYXJhdGUiLCJibGVuZEVxdWF0aW9uU2VwYXJhdGUiLCJURVhUVVJFMCIsInNvcnRPcGFxdWUiLCJ6RGVwdGgiLCJzb3J0VHJhbnNwYXJlbnQiLCJzb3J0VUkiLCJnZXRSZW5kZXJMaXN0IiwiY29uY2F0IiwiQ09MT1JfQlVGRkVSX0JJVCIsIkRFUFRIX0JVRkZFUl9CSVQiLCJTVEVOQ0lMX0JVRkZFUl9CSVQiLCJTa2luIiwicmlnIiwiY3JlYXRlQm9uZXMiLCJjcmVhdGVCb25lVGV4dHVyZSIsImFuaW1hdGlvbnMiLCJib25lVGV4dHVyZSIsImJvbmVUZXh0dXJlU2l6ZSIsInJvb3QiLCJib25lcyIsImJpbmRQb3NlIiwiYmluZEludmVyc2UiLCJib25lTWF0cmljZXMiLCJhZGRBbmltYXRpb24iLCJTcGhlcmUiLCJwaGlTdGFydCIsInBoaUxlbmd0aCIsInRoZXRhU3RhcnQiLCJ0aGV0YUxlbmd0aCIsIlRleHQiLCJmb250IiwidGV4dCIsImFsaWduIiwibGV0dGVyU3BhY2luZyIsImxpbmVIZWlnaHQiLCJ3b3JkU3BhY2luZyIsIndvcmRCcmVhayIsImNvbW1vbiIsImJhc2UiLCJyZXBsYWNlIiwiZ2x5cGhzIiwidGVzdCIsInhhZHZhbmNlIiwicG9wIiwic2NhbGVXIiwic2NhbGVIIiwiY2hhciIsInhvZmZzZXQiLCJ5b2Zmc2V0IiwiYnVmZmVycyIsIm51bUxpbmVzIiwia2VybmluZ3MiLCJmaXJzdCIsInNlY29uZCIsImFtb3VudCIsImNoYXJzIiwiVHJhbnNmb3JtIiwiVmVjMyIsIkFwcCJdLCJzb3VyY2VSb290IjoiIn0=