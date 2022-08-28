import { Vec2, Renderer, Camera, Transform, Plane, Color, Flowmap, Post } from 'ogl'
import About from "./about"

import postFragShader from '../shaders/post.glsl'

//  this.canvas in app
export default class Canvas {
    constructor() {
        this.bind()

        this.isTouchCapable = "ontouchstart" in window
        
        this.backgroundColor = new Color("#f4d8cc")
        this.color = new Color("#ff3a00")
        
        this.aspect = 1
        this.mouse = new Vec2()
        this.lastMouse = new Vec2()
        this.velocity = new Vec2()

        this.rAF = undefined

        this.init()
    }

    bind() {
        ['resize', 'update', 'updateMouse']
            .forEach((fn) => (this[fn] = this[fn].bind(this)))
    }

    createRenderer() {
        const canvas = document.querySelector('.webgl')
        this.renderer = new Renderer({
            canvas: canvas,
            dpr: Math.min(window.devicePixelRatio, 2),
            alpha: true, 
            premultipliedAlpha: true,
        })
        this.gl = this.renderer.gl
        this.gl.clearColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, 1)
        document.body.appendChild(this.gl.canvas)
    }

    createCamera() {
        this.camera = new Camera(this.gl)
        this.camera.fov = 45
        this.camera.position.z = 50
        // this.camera.position.z = 5
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
            fragment: postFragShader,
            uniforms: {
                uResolution: this.resolution,
                tFlow: this.flowmap.uniform
            },
        })
    }

    // 'About' is separated in a class because
    // it contains aspects of loading MSDF fonts
    // and this 'Canvas' class contains aspects of flowmap
    createPageText() {
        const geo = new Plane(this.gl, { heightSegments: 1, widthSegments: 1 })

        this.about = new About({ 
                background: this.background, 
                color: this.color, 
                geometry: geo, 
                gl: this.gl, 
                renderer: this.renderer, 
                scene: this.scene, 
                screen: this.screen, 
                viewport: this.viewport 
            })
    }

    calculateUnitSize(z) {
        const fovInRadian = (this.fov * Math.PI) / 180
        // basic trigonometry
        // this gives the width of plane/viewport that would cover the whole screen based on z position
        const height = 2 * Math.tan(fovInRadian / 2) * z

        return { width: height * this.camera.aspect, height: height }
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
        this.camUnit = this.calculateUnitSize(this.camera.position.z)

        this.viewport = {
            height: this.camUnit.height,
            heightHalf: 0.5 * this.camUnit.height,
            width: this.camUnit.width
        }

        const s = {
            screen: this.screen,
            viewport: this.viewport
        }

        this.aspect = window.innerWidth / window.innerHeight;

        // this.about && this.about.onResize(s)
    }

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

    update() {
        requestAnimationFrame(this.update)

        // Reset velocity when mouse not moving
        if (!this.velocity.needsUpdate) {
            this.mouse.set(-1)
            this.velocity.set(0)
        }
        this.velocity.needsUpdate = false

        // UPDATE FLOWMAP INPUTS
        this.flowmap.mesh.program.uniforms.uFalloff.value = 0.1
        // this.flowmap.aspect = this.screen.width / this.screen.height
        this.flowmap.aspect = this.aspect
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
        this.resize()
        this.createPageText()
        this.addEventListeners()
    }
}