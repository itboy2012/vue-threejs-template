import { sizes } from "./sizes"
let cameras,renderers, canvas, canvasElId;
function resizeEvent() {

    canvas = document.getElementById(canvasElId)

    // Update sizes
    sizes.width = canvas.clientWidth
    sizes.height = canvas.clientHeight

    try {
        // Update camera
        for (let i = 0; i < cameras.length; i++) {
            cameras[i].aspect = sizes.width / sizes.height
            cameras[i].updateProjectionMatrix()
        }
        // Update renderer
        for (let i = 0; i < renderers.length; i++) {
            renderers[i].setSize(sizes.width, sizes.height)
            renderers[i].setPixelRatio(Math.min(window.devicePixelRatio, 2))
        }
    } catch (error) {
        // console.log(error)
    }

}
export function initResizeEventListener(_cameras = [], _renderers = [], canvasContainerElId = 'webgl-container'){
    cameras = _cameras; renderers = _renderers; canvasElId = canvasContainerElId;
    window.addEventListener('resize', resizeEvent)
}
export function clearResizeEventListener(){
    window.removeEventListener("resize", resizeEvent)
}