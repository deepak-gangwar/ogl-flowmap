import gsap from 'gsap'
import { Program, Text, Geometry, Mesh, Texture } from 'ogl'
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


export default class About {
    constructor({ background, color, geometry, gl, renderer, scene, screen, viewport }) {
        this.bind()

        this.background = background
        this.color = color
        // this.element = document.querySelector(".about__title")
        this.gl = gl
        this.renderer = renderer
        this.scene = scene
        this.screen = screen
        this.viewport = viewport
        // this.text = this.element.textContent
        this.text = 'dont panic'

        this.createShader()
        // this.update()
        // this.createMesh()
        // this.onResize()
    }

    bind() {
        []
        .forEach((fn) => (this[fn] = this[fn].bind(this)))
    }

    

    // use this function if json font is stored inline as constant
    // otherwise use async await syntax loadText function to load from and external file
    createShader() {
        // this part will not be included if you worked out below mentioned window.TEXTURES
        // otherwise replace tmap value with texture
        // const texture = new Texture(this.gl, {
        //     generateMipmaps: false,
        // })
        // const img = new Image()
        // img.src = 'suisse.png'
        // img.onload = () => (texture.image = img)
        // //////////////////////////////////////////

        const texture = new Texture(this.gl, {
            generateMipmaps: false,
        })
        const img = new Image()
        img.src = 'suisse.png'
        img.onload = () => (texture.image = img)
        
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
        this.mesh.position.y = text.height * 0.5;
        this.mesh.setParent(this.scene)

        // this.update()
    }

    // update() {
    //     // console.log(this.mesh)
    //     this.renderer.render({ scene: this.mesh })
    //     requestAnimationFrame(this.update)
    // }

    // createMesh() {
    //     const text = new Text({ 
    //         align: "left", 
    //         //  see where are we loading Ar
    //         font: Ar, 
    //         letterSpacing: -0.05, 
    //         lineHeight: 0.7, 
    //         size: 10.1, 
    //         text: this.text 
    //     })

    //     this.geometry = new Geometry(this.gl, {
    //         position: { size: 3, data: text.buffers.position },
    //         uv: { size: 2, data: text.buffers.uv },
    //         id: { size: 1, data: text.buffers.id },
    //         index: { data: text.buffers.index },
    //     })

    //     this.mesh = new Mesh(this.gl, { geometry: this.geometry, program: this.program })

    //     // Use the height value to position text vertically. Here it is centered.
    //     this.mesh.visible = !1
    //     this.mesh.setParent(this.scene)
    // }

    animateIn() {
        this.mesh.visible = !0
        gsap.killTweensOf(this.program.uniforms.uAlpha)
        gsap.to(this.program.uniforms.uAlpha, { delay: 1.5, duration: 0.5, value: 1 })
    }
}

// const planeGeo = new Plane(this.gl, { heightSegments: 1, widthSegments: 1 })

// or 
// Triangle that includes -1 to 1 range for 'position', and 0 to 1 range for 'uv'.
// const geometry = new ogl.Geometry(gl, {
//   position: {
//     size: 2,
//     data: new Float32Array([-1, -1, 3, -1, -1, 3])
//   },
//   uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) }
// });


// this.about for app
// const about = new About({ 
//     background: this.background, 
//     color: this.color, 
//     geometry: planeGeo, 
//     gl: this.gl, 
//     renderer: this.renderer, 
//     scene: this.scene, 
//     screen: this.screen, 
//     viewport: this.viewport 
// })


// onChangeColors({ background: t = "#f4d8cc", color: e = "#ff3a00" } = {}) {
//     const i = new E(t),
//         s = new E(e);
//     dr.to(document.documentElement, { background: t, color: e }),
//         dr.to(this.color, { ...s }),
//         dr.to(this.background, {
//             ...i,
//             onUpdate: (t) => {
//                 this.gl.clearColor(this.background.r, this.background.g, this.background.b, 1);
//             },
//         });
// }

// const Tr = i.p + "28acbdc0f55c79c33522b856d60678ee.webp"
// const Er = i.p + "d2cf75421b7a564eb2c807ac28521b01.png"