import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
const gui = new GUI()
// gui.domElement.style.display = "none"
gui.domElement.style.position = 'absolute'
gui.domElement.style.top = '2px'
gui.domElement.style.right = '2px'
const debugObject = {}
export { gui, debugObject }