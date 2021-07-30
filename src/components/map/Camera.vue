<template>
    <div id="viewDiv"></div>
    <div id="buttonsDiv">
        <button id="rotateAntiClockwiseSpan" title="Rotate 90°">↻</button>
        <button id="indicatorSpan"></button>
        <button id="rotateClockwiseSpan" title="Rotate 90°">↺</button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Map from '@arcgis/core/Map'
import SceneView from '@arcgis/core/views/SceneView'

export default {
    name: 'Camera',

    computed: {
        ...mapGetters(['getMapConfig', 'getapiKey']),
    },

    mounted() {
        console.log('Camera ...')

        const map = new Map({
            basemap: 'hybrid',
            ground: 'world-elevation',
        })

        const view = new SceneView({
            center: this.getMapConfig.center,
            map: map,
            container: 'viewDiv',
            // camera: {
            //     position: [7.654, 45.919, 5183],
            //     tilt: 80,
            // },
        })

        const rotateAntiClockwiseSpan = document.getElementById('rotateAntiClockwiseSpan')
        rotateAntiClockwiseSpan.addEventListener('click', () => {
            rotateView(1)
        })

        view.watch('camera', updateIndicator)

        function rotateView(direction) {
            let heading = view.camera.heading

            if (direction > 0) {
                heading = Math.floor((heading + 1e-3) / 90) * 90 + 90
            } else {
                heading = Math.ceil((heading - 1e-3) / 90) * 90 - 90
            }

            view.goTo({
                heading: heading,
            }).catch((error) => {
                if (error.name != 'AbortError') {
                    console.error(error)
                }
            })
        }
    },
}
</script>

<style>
@import 'https://js.arcgis.com/4.20/@arcgis/core/assets/esri/themes/light/main.css';

html,
body,
#viewDiv {
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
}

#buttonsDiv {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 12px;
    background-color: rgba(200, 200, 200, 0.5);
    border: 1px solid black;
}

#indicatorSpan {
    display: inline-block;
    vertical-align: middle;
    width: 30px;
    height: 30px;
    background-color: rgba(100, 100, 100, 0.8);
    border: 2px solid #ccc;
}
</style>
