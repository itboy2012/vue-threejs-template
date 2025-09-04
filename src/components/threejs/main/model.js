import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const loaderManager = new THREE.LoadingManager();
loaderManager.onLoad = () => {
    console.log('All models loaded');
}

const dracoLoader = new DRACOLoader();
const path = new URL('/draco/', import.meta.url).href + '/';
dracoLoader.setDecoderPath(path);
const gltfLoader = new GLTFLoader(loaderManager);
gltfLoader.setDRACOLoader(dracoLoader);

/**
 * 
 * @param {THREE.Scene} scene 
 */
function initModels(scene) {
    return new Promise((resolve, reject) => {
        gltfLoader
            .setPath(import.meta.env.BASE_URL)
            .load('model.glb', (gltf) => {
                scene.add(gltf.scene);
                updateAllMaterials();
                resolve();
            }, undefined, reject);
    })
}

/**
 * 材质更新调整
 */
function updateAllMaterials() {
    return
    scene.traverse((child) => {
        if (child.isMesh) {
            // TODO: 更新材质
            child.material.needsUpdate = true;
        }
    })
}

export { initModels };