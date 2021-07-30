<template>
    <div class="map-view grid grid-cols-2">
        <div class="h-screen w-full" id="viewDiv"></div>
        <div class="h-screen w-full" id="viewDivR"></div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import esriConfig from '@arcgis/core/config'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import SceneView from '@arcgis/core/views/SceneView'
import SceneLayer from '@arcgis/core/layers/SceneLayer'

export default {
    name: 'SceneLayer',
    computed: {
        ...mapGetters(['getMapConfig', 'getapiKey']),
    },

    mounted() {
        console.log('SceneLayer ...')

        esriConfig.apiKey = this.getapiKey

        const mapR = new Map({
            basemap: 'osm',
            // ground: 'world-elevation',
        })

        // Create the SceneView
        const viewR = new MapView({
            container: 'viewDivR',
            map: mapR,
            center: [-74.0338, 40.6913],
            zoom: 13,
        })

        viewR.when(() => {
            console.log('viewR ready ...')
        })

        const map = new Map({
            basemap: 'dark-gray-vector',
            ground: 'world-elevation',
        })

        // Create the SceneView
        const view = new SceneView({
            container: 'viewDiv',
            map: map,
            camera: {
                position: [-74.0338, 40.6913, 707],
                tilt: 81,
                // heading: 50,
            },
        })

        // Create SceneLayer and add to the map
        const sceneLayer = new SceneLayer({
            portalItem: {
                id: '2e0761b9a4274b8db52c4bf34356911e',
            },
            popupEnabled: false,
        })
        map.add(sceneLayer)

        // Create MeshSymbol3D for symbolizing SceneLayer
        const symbol = {
            type: 'mesh-3d', // autocasts as new MeshSymbol3D()
            symbolLayers: [
                {
                    type: 'fill', // autocasts as new FillSymbol3DLayer()
                    // If the value of material is not assigned, the default color will be grey
                    material: {
                        color: [244, 247, 134],
                    },
                },
            ],
        }
        // Add the renderer to sceneLayer
        sceneLayer.renderer = {
            type: 'simple', // autocasts as new SimpleRenderer()
            symbol: symbol,
        }

        // view.when(() => {
        //     console.log('viewR ready ...')
        // })
    },
}
</script>

<style>
@import 'https://js.arcgis.com/4.20/@arcgis/core/assets/esri/themes/light/main.css';
</style>
