import { Vec2, Renderer, Camera, Transform, Plane, Color, Flowmap } from 'ogl'
// import About from "./about"

import gsap from 'gsap'
import { Program, Text, Geometry, Mesh, Texture, Post } from 'ogl'
import { Ar } from './font'

import vertex from "../shaders/vertex.glsl"
import fragment from "../shaders/fragment.glsl"

const vertex100 =
    /* glsl */ `
` + vertex;

const fragment100 =
    /* glsl */ `#extension GL_OES_standard_derivatives : enable
    precision highp float;
` + fragment;

const vertex300 =
    /* glsl */ `#version 300 es
    #define attribute in
    #define varying out
` + vertex;

const fragment300 =
    /* glsl */ `#version 300 es
    precision highp float;
    #define varying in
    #define texture2D texture
    #define gl_FragColor FragColor
    out vec4 FragColor;
` + fragment;

const fragShader = `precision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D tMap;\nuniform sampler2D tFlow;\n\nvarying vec2 vUv;\n\nvoid main() {\n  vec3 flow = texture2D(tFlow, vUv).rgb;\n\n  vec2 uv = vUv;\n\n  uv -= flow.xy * (0.15 * 0.5);\n\n  vec4 color = texture2D(tMap, uv);\n\n  gl_FragColor = color;\n}\n`

//  this.canvas in app
export default class Canvas {
    constructor() {
        this.bind()

        this.isTouchCapable = "ontouchstart" in window
        
        this.backgroundColor = new Color("#f4d8cc")
        this.color = new Color("#ff3a00")
        
        // wherever i have written vec2, was originally written new q()
        this.aspect = 1
        this.mouse = new Vec2()
        this.lastMouse = new Vec2()
        this.velocity = new Vec2()

        this.rAF = undefined

        this.init()
    }

    bind() {
        ["resize", "update", 'updateMouse']
            .forEach((fn) => (this[fn] = this[fn].bind(this)))
    }

    createRenderer() {
        const canvas = document.querySelector('.webgl')
        this.renderer = new Renderer({
            canvas: canvas,
            dpr: Math.min(window.devicePixelRatio, 2),
            // alpha: true, 
            // premultipliedAlpha: true,
        })
        this.gl = this.renderer.gl
        this.gl.clearColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, 1)
        document.body.appendChild(this.gl.canvas)
    }

    createCamera() {
        this.camera = new Camera(this.gl)
        this.camera.fov = 45
        // this.camera.position.z = 50
        this.camera.position.z = 7
    }

    createScene() {
        this.scene = new Transform()
    }

    createFlowmap() {
        this.flowmap = new Flowmap(this.gl, { alpha: 1, falloff: 0.2, dissipation: 0.9 })
        
        
    }

    createPostprocessing() {
        // POST PROCESSING EFFECTS
        this.post = new Post(this.gl)
        this.resolution = { value: new Vec2() }
        this.pass = this.post.addPass({
            fragment: fragShader,
            uniforms: {
                uResolution: this.resolution,
                tFlow: this.flowmap.uniform
            },
        })
    }

    // This is separated in a class because
    // it contains aspects of loading msdf fonts
    // and this canvas class contains aspects of flowmap
    createAbout() {
        // create plane geo
        // const t 
        // const planeGeo = new Plane(this.gl, { heightSegments: 1, widthSegments: 1 })
        this.createShader()
        // or 
        // Triangle that includes -1 to 1 range for 'position', and 0 to 1 range for 'uv'.
        // const geometry = new ogl.Geometry(gl, {
        //   position: {
        //     size: 2,
        //     data: new Float32Array([-1, -1, 3, -1, -1, 3])
        //   },
        //   uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) }
        // });

        // this.about = new About({ 
        //     background: this.background, 
        //     color: this.color, 
        //     geometry: planeGeo, 
        //     gl: this.gl, 
        //     renderer: this.renderer, 
        //     scene: this.scene, 
        //     screen: this.screen, 
        //     viewport: this.viewport 
        // })
    }

    resize() {
        this.screen = {
            height: window.innerHeight,
            width: window.innerWidth
        }

        this.renderer.setSize(this.screen.width, this.screen.height)
        this.camera.perspective({ aspect: this.gl.canvas.width / this.gl.canvas.height })
        this.post.resize()
        this.resolution.value.set(this.screen.width, this.screen.height)

        // to calculate plane size as per camera distance
        const t = this.camera.fov * (Math.PI / 180),
            e = 2 * Math.tan(t / 2) * this.camera.position.z,
            i = e * this.camera.aspect;

        this.viewport = {
            height: e,
            heightHalf: 0.5 * e,
            width: i
        }

        const s = {
            screen: this.screen,
            viewport: this.viewport
        }

        // this.about && this.about.onResize(s)
    }

    //////////////////////////////////////////////////////////////
    createShader() {
        // this part will not be included if you worked out below mentioned window.TEXTURES
        // otherwise replace tmap value with texture
        
        const texture = new Texture(this.gl, {
            generateMipmaps: false,
        })
        const img = new Image()
        img.src = 'suisse.png'
        img.onload = () => (texture.image = img)
        // //////////////////////////////////////////
        
        this.program = new Program(this.gl, {
            // Get fallback shader for WebGL1 - needed for OES_standard_derivatives ext
            vertex: this.renderer.isWebgl2 ? vertex300 : vertex100,
            fragment: this.renderer.isWebgl2 ? fragment300 : fragment100,
            uniforms: { 
                uAlpha: { value: 0 }, 
                uColor: { value: this.color }, 
                uSpeed: { value: 0 }, 
                tMap: { value: texture },
                // tMap: { value: window.TEXTURES[c.isWebPSupported() ? Tr : Er] } 
            },
            transparent: true,
            cullFace: null,
            depthWrite: false,
        })
        
        this.loadText()
    }

    async loadText() {
        // this can be inlined as well
        const font = await (await fetch('suisse.json')).json()

        const text = new Text({
            font, 
            text: "About me",
            width: 4,
            align: 'center',
            letterSpacing: -0.05,
            size: 1,
            lineHeight: 1.1,
        })

        // Pass the generated buffers into a geometry
        this.geometry = new Geometry(this.gl, {
            position: { size: 3, data: text.buffers.position },
            uv: { size: 2, data: text.buffers.uv },
            // id provides a per-character index, for effects that may require it
            id: { size: 1, data: text.buffers.id },
            index: { data: text.buffers.index },
        })

        this.mesh = new Mesh(this.gl, { geometry: this.geometry, program: this.program })

        // Use the height value to position text vertically. Here it is centered.
        // this.mesh.position.y = text.height * 0.5;
        this.mesh.setParent(this.scene)
    }
    ////////////////////////////////////////////////////////////////

    // DONE
    updateMouse(e) {
        e.preventDefault()

        if (e.changedTouches && e.changedTouches.length) {
            e.x = e.changedTouches[0].pageX
            e.y = e.changedTouches[0].pageY
        }
        if (e.x === undefined) {
            e.x = e.pageX
            e.y = e.pageY
        }
        
        // Get mouse value in 0 to 1 range, with y flipped
        this.mouse.set(e.x / this.gl.renderer.width, 1.0 - e.y / this.gl.renderer.height)

        // Calculate velocity
        if (!this.lastTime) {
            // First frame
            this.lastTime = performance.now()
            this.lastMouse.set(e.x, e.y)
        }

        const deltaX = e.x - this.lastMouse.x
        const deltaY = e.y - this.lastMouse.y

        this.lastMouse.set(e.x, e.y)

        let time = performance.now()

        // Avoid dividing by 0
        let delta = Math.max(10.4, time - this.lastTime)
        this.lastTime = time

        this.velocity.x = deltaX / delta
        this.velocity.y = deltaY / delta

        // Flag update to prevent hanging velocity values when not moving
        this.velocity.needsUpdate = true
    }

    // REPLACEMENT OF ABOVE FUNCTION
    // some additional stuff for this.mouse
    // onTouchMove(t) {
    //     const { changedTouches: e, clientX: i, clientY: s } = t,
    //         n = e ? e[0].clientX : i,
    //         r = e ? e[0].clientY : s;
    //     this.mouse.set(n / this.gl.renderer.width, 1 - r / this.gl.renderer.height), this.lastTime || ((this.lastTime = performance.now()), this.lastMouse.set(n, r));
    //     const o = n - this.lastMouse.x,
    //         a = r - this.lastMouse.y;
    //     this.lastMouse.set(n, r);
    //     const h = performance.now(),
    //         c = Math.max(14, h - this.lastTime);
    //     (this.lastTime = h), (this.velocity.x = o / c), (this.velocity.y = a / c), (this.velocity.needsUpdate = !0), this.case && this.case.onTouchMove(t), this.work && this.work.onTouchMove(t);
    // }

    update() {
        requestAnimationFrame(this.update)

        // Reset velocity when mouse not moving
        if (!this.velocity.needsUpdate) {
            this.mouse.set(-1)
            this.velocity.set(0)
        }

        this.velocity.needsUpdate = false

        // Update flowmap inputs

        // this can also be added during the time of declaration
        this.flowmap.mesh.program.uniforms.uFalloff.value = 0.1

        this.flowmap.aspect = this.screen.width / this.screen.height
        // or take an aspect variable

        this.flowmap.mouse.copy(this.mouse)
        this.flowmap.velocity.lerp(this.velocity, 0.1)
        this.flowmap.update()

        this.post.render({ scene: this.scene, camera: this.camera })
    }

    requestAnimationFrame() {
        this.rAF = requestAnimationFrame(this.update)
    }

    cancelAnimationFrame() {
        cancelAnimationFrame(this.rAF)
    }

    addEventListeners() {
        this.update()
      
        // Create handlers to get mouse position and velocity
        if (this.isTouchCapable) {
            window.addEventListener("touchstart", this.updateMouse, false)
            window.addEventListener("touchmove", this.updateMouse, { passive: false })
        } else {
            window.addEventListener("mousemove", this.updateMouse, false)
        }
        
        window.addEventListener("resize", this.resize, false)
    }

    removeEventListeners() {
        this.cancelAnimationFrame(this.rAF)

        if (this.isTouchCapable) {
            window.removeEventListener("touchstart", this.updateMouse, false)
            window.removeEventListener("touchmove", this.updateMouse, { passive: false })
        } else {
            window.removeEventListener("mousemove", this.updateMouse, false)
        }

        window.removeEventListener("resize", resize, false)
    }

    destroy() {
        this.removeEventListeners()
    }

    init() {
        this.createRenderer()
        this.createCamera()
        this.createScene()
        this.createFlowmap()
        this.createPostprocessing()
        // added resize here so as to initialize this.screen and this.viewport to pass into about constructor
        this.resize()
        this.createAbout()
        this.addEventListeners()
        // this.resize()
    }
}