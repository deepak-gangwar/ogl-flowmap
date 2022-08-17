import { ogl } from "./ogl";

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl' 

const vertex = vertexShader
const fragment = fragmentShader

export default class DesignEmbraced {
    constructor() {
        this.bind()

        this.imgSize = [1920, 1080]
        this.renderer = new ogl.Renderer({ dpr: 2 })
        this.gl = this.renderer.gl
        // const webgl = document.querySelector('.webgl__wrapper')
        // webgl.appendChild(this.gl.canvas)
        document.body.appendChild(this.gl.canvas)
        
        // variable inputs to control flowmap
        this.aspect = 1
        this.mouse = new ogl.Vec2(-1)
        this.velocity = new ogl.Vec2()
        
        this.createFlowmap()
        this.createShader()
        this.createMesh()
        this.init()
        // this.onResize()
    }

    bind() {
        ['createFlowmap', 'createShader', 'createMesh', 'addEventListeners', 'onResize', 'updateMouse', 'update']
            .forEach(fn => this[fn] = this[fn].bind(this))
    }

    createFlowmap() {
        this.flowmap = new ogl.Flowmap(this.gl)
    }

    createShader() {
        this.texture = new ogl.Texture(this.gl, {
            minFilter: this.gl.LINEAR,
            magFilter: this.gl.LINEAR
        })
        
        const img = new Image()
        img.onload = () => (this.texture.image = img)
        img.crossOrigin = "Anonymous"
        img.src = "text.png"

        let a1, a2
        var imageAspect = this.imgSize[1] / this.imgSize[0]

        if (window.innerHeight / window.innerWidth < imageAspect) {
            a1 = 1
            a2 = window.innerHeight / window.innerWidth / imageAspect
        } else {
            a1 = (window.innerWidth / window.innerHeight) * imageAspect
            a2 = 1
        }

        this.program = new ogl.Program(this.gl, {
            vertex,
            fragment,
            uniforms: {
                uTime: { value: 0 },
                tWater: { value: this.texture },
                res: {
                    value: new ogl.Vec4(window.innerWidth, window.innerHeight, a1, a2)
                },
                img: { value: new ogl.Vec2(this.imgSize[0], this.imgSize[1]) },
                // Note that the uniform is applied without using an object and value property
                // This is because the class alternates this texture between two render targets
                // and updates the value property after each render.
                tFlow: this.flowmap.uniform
            }
        })
    }
    
    createMesh() {
        // Triangle that includes -1 to 1 range for 'position', and 0 to 1 range for 'uv'.
        const geometry = new ogl.Geometry(this.gl, {
            position: {
                size: 2,
                data: new Float32Array([-1, -1, 3, -1, -1, 3])
            },
            uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) }
        })

        this.mesh = new ogl.Mesh(this.gl, { geometry: geometry, program: this.program })
    }

    onResize() {
        let a1, a2
        var imageAspect = this.imgSize[1] / this.imgSize[0]

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

    updateMouse(e) {
        let lastTime
        const lastMouse = new ogl.Vec2()

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
        if (!lastTime) {
            // First frame
            lastTime = performance.now()
            lastMouse.set(e.x, e.y)
        }

        const deltaX = e.x - lastMouse.x
        const deltaY = e.y - lastMouse.y

        lastMouse.set(e.x, e.y)

        let time = performance.now()

        // Avoid dividing by 0
        let delta = Math.max(10.4, time - lastTime)
        lastTime = time

        this.velocity.x = deltaX / delta
        this.velocity.y = deltaY / delta
        
        // Flag update to prevent hanging velocity values when not moving
        this.velocity.needsUpdate = true
    }

    update(t) {
        requestAnimationFrame(this.update);

        // Reset velocity when mouse not moving
        if (!this.velocity.needsUpdate) {
            this.mouse.set(-1);
            this.velocity.set(0);
        }

        this.velocity.needsUpdate = false;

        // Update flowmap inputs
        // console.log(this.flowmap)
        this.flowmap.aspect = this.aspect;
        this.flowmap.mouse.copy(this.mouse);

        // Ease velocity input, slower when fading out
        this.flowmap.velocity.lerp(this.velocity, this.velocity.len ? 0.15 : 0.1);
        this.flowmap.update();

        this.program.uniforms.uTime.value = t * 0.01;
        
        this.renderer.render({ scene: this.mesh });
    }

    addEventListeners() {
        // this.update()
        requestAnimationFrame(this.update)
        window.addEventListener("resize", this.onResize, false)

        const isTouchCapable = "ontouchstart" in window;
        if (isTouchCapable) {
            window.addEventListener("touchstart", this.updateMouse, false);
            window.addEventListener("touchmove", this.updateMouse, { passive: false });
        } else {
            window.addEventListener("mousemove", this.updateMouse, false);
        }
    }

    init() {
        this.addEventListeners()
        // this.onResize()
        // requestAnimationFrame(this.update)
    }
}