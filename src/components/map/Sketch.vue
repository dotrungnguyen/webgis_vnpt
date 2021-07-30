<template>
    <div class="map-view"></div>
</template>

<script>
import { mapGetters } from 'vuex'

import esriConfig from '@arcgis/core/config'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'

import Sketch from '@arcgis/core/widgets/Sketch'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'

export default {
    name: 'Sketch',
    computed: {
        ...mapGetters(['getMapConfig', 'getapiKey']),
    },

    mounted() {
        esriConfig.apiKey = this.getapiKey
        const graphicsLayer = new GraphicsLayer();

        const map = new Map({
            basemap: this.getMapConfig.basemap,
            layers: [graphicsLayer]
        })

        const view = new MapView({
            container: this.$el,
            map: map,
            center: this.getMapConfig.center,
            zoom: this.getMapConfig.zoom,
        })




        view.when(() => {
            console.log('view ready ...')
            const sketch = new Sketch({
                layer: graphicsLayer,
                view: view,
                // graphic will be selected as soon as it is created
                creationMode: 'update',
            })
            view.ui.add(sketch, 'top-right')
        })
    },
}
</script>

<style>
@import 'https://js.arcgis.com/4.20/@arcgis/core/assets/esri/themes/light/main.css';
</style>
