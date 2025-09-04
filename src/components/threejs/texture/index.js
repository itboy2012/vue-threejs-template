import * as THREE from 'three'
/**
 * 纹理贴图
 */
const cubeTextureLoader = new THREE.CubeTextureLoader()
export const envMap = cubeTextureLoader.setPath(import.meta.env.BASE_URL+'texture/sky/day/',).load([
    "px.png",
    "nx.png",
    "py.png",
    "ny.png",
    "pz.png",
    "nz.png",
])
const textureLoader = new THREE.TextureLoader()
textureLoader.setPath(import.meta.env.BASE_URL)
export const envMap2 = textureLoader.load('texture/sky/day/sky.jpg');
envMap2.mapping = THREE.EquirectangularReflectionMapping;
envMap2.colorSpace = THREE.SRGBColorSpace;

export function disposeTexture() {
    envMap.dispose()
    envMap2.dispose()
}