<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { ThreeApp } from './threejs/ThreeApp'
const webgl = ref(null)
let threeApp
onMounted(() => {
    console.log("hello threejs")
    threeApp = new ThreeApp({ el: webgl.value, containerElId: 'webgl-container'})
    threeApp.render()
})
onUnmounted(() => {
    threeApp.clear()
})
</script>
<template>
    <div id="webgl-container" class="webgl-container">
        <canvas ref="webgl" id="webgl" class="webgl"></canvas>
        <div style="position: absolute; bottom: 4px; left: 4px; width: max-content;">Component --> Scene.vue</div>
    </div>
</template>
<style>
#webgl-container {
    position: fixed;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    outline: none;
}
.webgl {
    width: 100%;
    height: 100%;
    outline: none;
}
</style>