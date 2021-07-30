<template>
    <div class="map-view grid grid-cols-2">
        <div class="h-screen w-full " id="viewDivL"></div>
        <div class="h-screen w-full " id="viewDivR"></div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import esriConfig from '@arcgis/core/config'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import SceneView from '@arcgis/core/views/SceneView'

export default {
    name: 'Layout2',
    computed: {
        ...mapGetters(['getMapConfig', 'getapiKey']),
    },

    mounted() {
        console.log('Layout2 ...')

        esriConfig.apiKey = this.getapiKey

        const mapL = new Map({
            basemap: 'satellite',
        })

        const viewL = new MapView({
            container: viewDivL,
            map: mapL,
            center: this.getMapConfig.center,
            zoom: this.getMapConfig.zoom,
        })

        viewL.when(() => {
            console.log('viewL ready ...')
        })

        const mapR = new Map({
            basemap: 'satellite',
        })

        const viewR = new SceneView({
            container: viewDivR,
            map: mapR,
            center: this.getMapConfig.center,
            zoom: this.getMapConfig.zoom,
        })

        viewR.when(() => {
            console.log('viewR ready ...')
        })
    },
}
</script>

<style>
@import 'https://js.arcgis.com/4.20/@arcgis/core/assets/esri/themes/light/main.css';
</style>
