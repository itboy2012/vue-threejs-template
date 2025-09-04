import * as THREE from 'three';
import { gui } from '../system/gui';

function initLight(scene) {
    
    // ambientlight
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // directionallight
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(1, 2, 3);
    scene.add(directionalLight);

    // debug
    const lightFolder = gui.addFolder('lights');
    const ambientLightFolder = lightFolder.addFolder('ambientLight');
    ambientLightFolder.add(ambientLight, 'intensity', 0, 5, 0.1);
    const directionalLightFolder = lightFolder.addFolder('directionalLight');
    directionalLightFolder.add(directionalLight, 'intensity', 0, 10, 0.1)
    
}

export { initLight };