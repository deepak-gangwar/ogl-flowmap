// import gsap from 'gsap'
import { Program, Text, Geometry, Mesh, Texture } from 'ogl'

import vertex from "../shaders/vertex.glsl"
import fragment from "../shaders/fragment.glsl"
import { check } from '../utils/check';

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


export default class About {
    constructor({ bg, color, geometry, gl, renderer, scene, screen, viewport }) {
        this.background = bg
        this.color = color

        // this.element = document.querySelector(".about__title")
        this.gl = gl
        this.renderer = renderer
        this.scene = scene
        this.screen = screen
        this.viewport = viewport
        this.text = 'Regeneration Suite'
        // this.text = this.element.textContent

        this.createShader()
        this.createMesh()
        // this.onResize()
    }
    
    // use this function if json font is stored inline as constant
    // otherwise use async await syntax loadText function to load from and external file
    createShader() {
        const texture = new Texture(this.gl, {
            generateMipmaps: false,
            minFilter: this.gl.LINEAR,
            magFilter: this.gl.LINEAR,
            premultiplyAlpha: true
        })
        const img = new Image()
        img.src = check.isWebPSupported() ? 'suisse.webp' : 'suisse.png'
        img.onload = () => (texture.image = img)
        img.crossOrigin = 'Anonymous'

        
        this.program = new Program(this.gl, {
            // Get fallback shader for WebGL1 - needed for OES_standard_derivatives ext
            vertex: this.renderer.isWebgl2 ? vertex300 : vertex100,
            fragment: this.renderer.isWebgl2 ? fragment300 : fragment100,
            uniforms: { 
                uAlpha: { value: 0 }, 
                uColor: { value: this.color }, 
                uSpeed: { value: 0 }, 
                tMap: { value: texture },
                // tMap: { value: window.TEXTURES[check.isWebPSupported() ? Tr : Er] } 
            },
            transparent: true,
            cullFace: null,
            depthWrite: false,
        })
    }

    async createMesh() {
        // this font can be inlined as well
        const font = await (await fetch('suisse.json')).json()

        const text = new Text({
            width: 4,
            // font: Ar, 
            font, 
            align: 'center',
            letterSpacing: -0.05,
            lineHeight: 0.7,
            size: 10.1,
            text: this.text,
        })

        // Pass the generated buffers into a geometry
        this.geometry = new Geometry(this.gl, {
            position: { size: 3, data: text.buffers.position },
            uv: { size: 2, data: text.buffers.uv },
            id: { size: 1, data: text.buffers.id },
            index: { data: text.buffers.index },
        })

        this.mesh = new Mesh(this.gl, { geometry: this.geometry, program: this.program })

        // this.mesh.visible = false
        // Use the height value to position text vertically. Here it is centered.
        this.mesh.position.y = text.height * 0.5;
        this.mesh.setParent(this.scene)
    }

    onResize({ screen: screen, viewport: viewport } = {}) {
        if(screen) this.screen = screen
        if(viewport) this.viewport = viewport
        // this.bounds = this.element.getBoundingClientRect()
        
        if(this.screen.width < 1024) {
            this.mesh.scale.x = (((1230 / this.screen.height) * this.screen.width) / 343) * 0.33
            this.mesh.scale.y = (((1230 / this.screen.height) * this.screen.width) / 343) * 0.33
            this.mesh.position.x = -14.6 * this.mesh.scale.x
            this.mesh.position.y = -this.viewport.height / 2 + 16.8 * this.mesh.scale.y
        } else {
            this.scale = Math.max(1230 / this.screen.height, 1)
            this.mesh.scale.x = (this.screen.width / 0.002) * this.scale
            this.mesh.scale.y = (this.screen.width / 0.002) * this.scale
            this.mesh.position.x = -this.viewport.width / 2 + (this.bounds.left / this.screen.width) * this.viewport.width
            this.mesh.position.y = -this.viewport.height / 2 + 16.8 * this.mesh.scale.y
        }
    }

    animateIn() {
        // this.mesh.visible = true
        // gsap.killTweensOf(this.program.uniforms.uAlpha)
        // gsap.to(this.program.uniforms.uAlpha, { delay: 1.5, duration: 0.5, value: 1 })
    }

    animateOut() {
        // gsap.killTweensOf(this.program.uniforms.uAlpha), 
        // gsap.to(this.program.uniforms.uAlpha, { duration: 0.5, onComplete: (t) => (this.mesh.visible = false), value: 0 })
    }
}

// const Tr = i.p + "28acbdc0f55c79c33522b856d60678ee.webp"
// const Er = i.p + "d2cf75421b7a564eb2c807ac28521b01.png"

// URL BASED ROUTING ANIMATION
// onChange(t) {
//     this.about && ("/about" === t ? this.about.animateIn(t, this.url) : this.about.animateOut(t, this.url)),
//     (this.url = t);
// }