<template>
    <div class="map-view" id="viewDiv">
        <!-- <div ></div> -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import esriConfig from '@arcgis/core/config'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'

import SceneView from '@arcgis/core/views/SceneView'
import TileLayer from '@arcgis/core/layers/TileLayer'

export default {
    name: 'Transportation',

    computed: {
        ...mapGetters(['getMapConfig', 'getapiKey', 'getCurrentService']),
    },

    mounted() {
        console.log('Transportation ...')

        const transportationLayer = new TileLayer({
            url: 'https://server.arcgisonline.com/arcgis/rest/services/Reference/World_Transportation/MapServer',
            // This property can be used to uniquely identify the layer
            id: 'streets',
            visible: false,
        })

        const housingLayer = new TileLayer({
            url: 'https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/New_York_Housing_Density/MapServer',
            id: 'ny-housing',
            opacity: 0.9,
        })

        const map = new Map({
            basemap: 'oceans',
            layers: [housingLayer],
        })

        map.add(transportationLayer)

        // if (this.getCurrentService === 'transportation') {
        //     transportationLayer.visible = true
        // }

        const view = new SceneView({
            container: 'viewDiv',
            map: map,
            center: this.getMapConfig.center,
            zoom: this.getMapConfig.zoom,
        })

        view.on('layerview-create', (event) => {
            if (event.layer.id === 'ny-housing') {
                console.log(
                    'LayerView for male population created!',
                    event.layerView
                )
            }
            if (event.layer.id === 'streets') {
                console.log('LayerView for streets created!', event.layerView)
            }
        })

        view.when(() => {
            housingLayer.when(() => {
                view.goTo(housingLayer.fullExtent).catch((error) => {
                    console.error(error)
                })
            })
        })

        const streetsLayerToggle = document.getElementById('streetsLayer')

        streetsLayerToggle.addEventListener('change', () => {
            transportationLayer.visible = streetsLayerToggle.checked
        })

        // view.when(() => {
        //     console.log('view ready ...')
        // })
    },
}
</script>

<style>
@import 'https://js.arcgis.com/4.20/@arcgis/core/assets/esri/themes/light/main.css';
</style>
