import * as THREE from "three"
import Stats from "three/examples/jsm/libs/stats.module.js"
import { gui } from "./system/gui"
import * as resize from "./system/resize"
import { createCamera } from "./base/camera"
import { createScene } from "./base/scene"
import { createCube } from "./base/cube"
import { createRenderer } from "./base/renderer"
import { createControl } from "./base/control"
import { initLight } from "./base/light"
import { initModels } from "./main/model"
import { disposeTexture } from "./texture"

let stats = new Stats();
stats.dom.style.position = 'absolute';
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
stats.dom.style.top = "2px"
document.body.appendChild(stats.dom);

class ThreeApp {

    static #instance = null;

    // 单例模式
    static getInstance() {
        if (!this.#instance) {
            this.#instance = new ThreeApp();
        }
        return this.#instance;
    }

    constructor(canvas = {
        el: document.querySelector('.webgl'),
        containerElId: 'webgl-container'
    }) {
        if (ThreeApp.#instance) return ThreeApp.#instance; // 宽松机制，允许重复创建，但仍然返回同一个实例
        ThreeApp.#instance = this;

        console.log("场景初始化")
        this.stats = stats
        document.getElementById(canvas.containerElId).appendChild(stats.dom)
        document.getElementById(canvas.containerElId).appendChild(gui.domElement)
        // 相机 camera
        this.camera = createCamera()
        // 控制器
        this.control = createControl(this.camera, canvas.el)
        // 场景 scene
        this.scene = createScene()
        // 灯光 light
        initLight(this.scene)
        // 场景组成内容 object3D
        const cube = createCube()
        this.scene.add(cube)
        initModels(this.scene)
        // 渲染器 renderer
        this.renderer = createRenderer(canvas.el)
        // resize
        resize.initResizeEventListener([this.camera], [this.renderer], canvas.containerElId)
        // debug
        this.debug()

    }
    debug() {
        const controlsFolder = gui.addFolder('controls')
        controlsFolder.add(this.control, 'autoRotate')
    }
    render() {
        // 渲染场景
        console.log("渲染场景...")
        const clock = new THREE.Clock()
        let previousTime = 0, elapsedTime = 0, deltaTime = 0;
        this.tick = () => {
            this.stats.update()
            elapsedTime = clock.getElapsedTime()
            deltaTime = elapsedTime - previousTime
            previousTime = elapsedTime

            // Update controls
            this.control.update()

            // Render
            this.renderer.render(this.scene, this.camera)

            this.tickId = window.requestAnimationFrame(this.tick)
        }
        this.tick()
    }
    clear() {
        console.log("清理内存")
        ThreeApp.#instance = null
        resize.clearResizeEventListener()
        this.stats.dom.remove()
        cancelAnimationFrame(this.tickId)
        this.scene.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose()
                child.material.dispose()
            }
        })
        this.tick = null
        this.scene = null
        this.camera = null
        this.renderer.dispose()
        this.control.dispose()
        disposeTexture()
        gui.children.forEach(h => { h.domElement.remove() })
    }
}

export { ThreeApp }