<template>
    <div class="map-view" id="viewDiv">
        <!-- <div id="viewDiv"></div>

        <div id="info" class="esri-widget">
            Click on a parcel polygon to display its area and perimeter.
        </div> -->
    </div>
</template>

<script>
// import { mapGetters, mapState } from 'vuex'

// import esriConfig from '@arcgis/core/config'
import WebScene from '@arcgis/core/WebScene'
import AreaMeasurementLayer from '@arcgis/core/layers/AreaMeasurementLayer'
import SceneView from '@arcgis/core/views/SceneView'

export default {
    name: 'AreaMeasurement',
    // computed: {
    //     ...mapGetters(['getMapConfig', 'getapiKey']),
    // },

    mounted() {
        console.log('AreaMeasurement')
        // esriConfig.apiKey = this.getapiKey

        const map = new WebScene({
            portalItem: {
                id: '340f87d4f3ef4184b04bcd76261cdf9c',
            },
        })

        const view = new SceneView({
            container: 'viewDiv',
            map,
            qualityProfile: 'high',
        })

        const areaMeasurementLayer = new AreaMeasurementLayer()
        map.layers.add(areaMeasurementLayer)

        view.when(() => {
            console.log('AreaMeasurement')
            // const hitTestLayers = view.map.layers.filter(
            //     (layer) => layer.title === 'Parcels'
            // )
            // view.on('click', async (event) => {
            //     // remove the current measured geometry from the layer when the user clicks on the map
            //     areaMeasurementLayer.geometry = null
            //     // get results only from the "Parcels" layer
            //     const hitTestResult = await view.hitTest(event, {
            //         include: hitTestLayers,
            //     })
            //     if (hitTestResult.results.length > 0) {
            //         const geometry = hitTestResult.results[0].graphic.geometry
            //         // pass the polygon geometry to the areaMeasurementLayer to display a new measurement
            //         areaMeasurementLayer.geometry = geometry
            //         // zoom to the selected geometry
            //         view.goTo(geometry)
            //     }
            // })
        })

        view.ui.add('info', 'top-right')

        // view.when(() => {
        //     console.log('view ready ...')
        // })
    },
}
</script>

<style>
@import 'https://js.arcgis.com/4.20/@arcgis/core/assets/esri/themes/light/main.css';
</style>
