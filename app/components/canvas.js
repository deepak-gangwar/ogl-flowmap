import { ogl } from "./ogl";

import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl' 

export default class Canvas {
    constructor() {
        this.bind()

        this.vertexShader = vertexShader
        this.fragmentShader = fragmentShader

        this.imgSize = {
            width: 1920,
            height: 1080
        }

        const canvas = document.querySelector('.webgl')
        this.renderer = new ogl.Renderer({ canvas: canvas, dpr: 2 })
        this.gl = this.renderer.gl

        // Variable inputs to control flowmap
        this.aspect = 1
        this.mouse = new ogl.Vec2(-1)
        this.velocity = new ogl.Vec2()

        this.flowmap = new ogl.Flowmap(this.gl)

        this.lastTime = undefined
        this.lastMouse = new ogl.Vec2()

        this.rAF = undefined

        this.init()
    }

    bind() {
        ['updateMouse', 'update']
            .forEach(fn => this[fn] = this[fn].bind(this))
    }

    //replace all window.innerWidth and height by using them in store object
    resize() {
        let a1, a2
        var imageAspect = this.imgSize.height / this.imgSize.width

        if (window.innerHeight / window.innerWidth < imageAspect) {
            a1 = 1
            a2 = window.innerHeight / window.innerWidth / imageAspect
        } else {
            a1 = (window.innerWidth / window.innerHeight) * imageAspect
            a2 = 1
        }

        this.mesh.program.uniforms.res.value = new ogl.Vec4(
            window.innerWidth,
            window.innerHeight,
            a1,
            a2
        )
    
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.aspect = window.innerWidth / window.innerHeight
    }
    
    createGeometry() {
        // Triangle that includes -1 to 1 range for 'position', and 0 to 1 range for 'uv'.
        this.geometry = new ogl.Geometry(this.gl, {
                position: {
                size: 2,
                data: new Float32Array([-1, -1, 3, -1, -1, 3])
            },
            uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) }
        })
    }

    updateTexture() {
        this.texture = new ogl.Texture(this.gl, {
            minFilter: this.gl.LINEAR,
            magFilter: this.gl.LINEAR
        })
        
        const img = new Image()
        img.onload = () => (this.texture.image = img)
        img.crossOrigin = "Anonymous"
        img.src = "text.png"
        
        let a1, a2
        var imageAspect = this.imgSize.height / this.imgSize.width

        if (window.innerHeight / window.innerWidth < imageAspect) {
            a1 = 1
            a2 = window.innerHeight / window.innerWidth / imageAspect
        } else {
            a1 = (window.innerWidth / window.innerHeight) * imageAspect
            a2 = 1
        }

        return { a1, a2 }
    }
    
    createShaders() {
        const textureAspect = this.updateTexture()

        this.program = new ogl.Program(this.gl, {
            vertex: this.vertexShader,
            fragment: this.fragmentShader,
            uniforms: {
            uTime: { value: 0 },
            tWater: { value: this.texture },
            res: {
                value: new ogl.Vec4(window.innerWidth, window.innerHeight, textureAspect.a1, textureAspect.a2)
            },
            img: { value: new ogl.Vec2(this.imgSize.width, this.imgSize.height) },
            // Note that the uniform is applied without using an object and value property
            // This is because the class alternates this texture between two render targets
            // and updates the value property after each render.
            tFlow: this.flowmap.uniform
            }
        })
    }

    createMesh() {
        this.mesh = new ogl.Mesh(this.gl, { geometry: this.geometry, program: this.program })
    }

    updateMouse(e) {
        e.preventDefault();

        if (e.changedTouches && e.changedTouches.length) {
            e.x = e.changedTouches[0].pageX
            e.y = e.changedTouches[0].pageY
        }
        if (e.x === undefined) {
            e.x = e.pageX
            e.y = e.pageY
        }
        
        // Get mouse value in 0 to 1 range, with y flipped
        this.mouse.set(e.x / this.gl.renderer.width, 1.0 - e.y / this.gl.renderer.height);

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

    update(t) {
        requestAnimationFrame(this.update);
    
        // Reset velocity when mouse not moving
        if (!this.velocity.needsUpdate) {
            this.mouse.set(-1)
            this.velocity.set(0)
        }
    
        this.velocity.needsUpdate = false
    
        // Update flowmap inputs
        this.flowmap.aspect = this.aspect
        this.flowmap.mouse.copy(this.mouse)
    
        // Ease velocity input, slower when fading out
        this.flowmap.velocity.lerp(this.velocity, this.velocity.len ? 0.15 : 0.1)
        this.flowmap.update()
    
        this.program.uniforms.uTime.value = t * 0.01
        
        this.renderer.render({ scene: this.mesh })
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
        const isTouchCapable = "ontouchstart" in window
        if (isTouchCapable) {
            window.addEventListener("touchstart", this.updateMouse, false)
            window.addEventListener("touchmove", this.updateMouse, { passive: false })
        } else {
            window.addEventListener("mousemove", this.updateMouse, false)
        }
        
        window.addEventListener("resize", this.resize, false)
    }
    
    removeEventListeners() {
        this.cancelAnimationFrame(this.rAF)

        const isTouchCapable = "ontouchstart" in window
        if (isTouchCapable) {
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
        this.createGeometry()
        this.createShaders()
        this.createMesh()
        this.addEventListeners()
        this.resize()
    }
}