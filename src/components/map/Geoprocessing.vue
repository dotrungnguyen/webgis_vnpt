<template>
    <div class="map-view" id="viewDiv">
        <!-- <div ></div> -->
    </div>
</template>

<script>
import Map from '@arcgis/core/Map'
import SceneView from '@arcgis/core/views/SceneView'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'

import Graphic from '@arcgis/core/Graphic'
import Point from '@arcgis/core/geometry/Point'
import geoprocessor from '@arcgis/core/rest/geoprocessor'
import LinearUnit from '@arcgis/core/rest/support/LinearUnit'
import FeatureSet from '@arcgis/core/rest/support/FeatureSet'

export default {
    name: 'Geoprocessing',

    mounted() {
        console.log('Geoprocessing ...')

        const gpUrl =
            'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Elevation/ESRI_Elevation_World/GPServer/Viewshed'

        const map = new Map({
            basemap: 'hybrid',
            ground: 'world-elevation',
        })

        const view = new SceneView({
            container: 'viewDiv',
            map: map,
            camera: {
                position: [7.59564, 46.06595, 100],
                tilt: 70,
            },
        })

        const graphicsLayer = new GraphicsLayer()
        map.add(graphicsLayer)

        const markerSymbol = {
            type: 'simple-marker',
            color: [255, 0, 0],
            outline: {
                color: [255, 255, 255],
                width: 2,
            },
        }

        const fillSymbol = {
            type: 'simple-fill',
            color: [226, 119, 40, 0.75],
            outline: {
                color: [255, 255, 255],
                width: 1,
            },
        }

        const options = {
            outSpatialReference: {
                wkid: 102100,
            },
        }

        view.on('click', computeViewshed)

        function computeViewshed(event) {
            graphicsLayer.removeAll()

            const point = new Point({
                longitude: event.mapPoint.longitude,
                latitude: event.mapPoint.latitude,
            })

            const inputGraphic = new Graphic({
                geometry: point,
                symbol: markerSymbol,
            })

            graphicsLayer.add(inputGraphic)

            const inputGraphicContainer = []
            inputGraphicContainer.push(inputGraphic)
            const featureSet = new FeatureSet()
            featureSet.features = inputGraphicContainer

            const vsDistance = new LinearUnit()
            vsDistance.distance = 5
            vsDistance.units = 'miles'

            const params = {
                Input_Observation_Point: featureSet,
                Viewshed_Distance: vsDistance,
            }

            geoprocessor.execute(gpUrl, params, options).then(drawResultData)
        }

        function drawResultData(result) {
            const resultFeatures = result.results[0].value.features

            // Assign each resulting graphic a symbol
            const viewshedGraphics = resultFeatures.map((feature) => {
                feature.symbol = fillSymbol
                return feature
            })

            // Add the resulting graphics to the graphics layer
            graphicsLayer.addMany(viewshedGraphics)

            /********************************************************************
             * Animate to the result. This is a temporary workaround
             * for animating to an array of graphics in a SceneView. In a future
             * release, you will be able to replicate this behavior by passing
             * the graphics directly to the goTo function, like the following:
             *
             * view.goTo(viewshedGraphics);
             ********************************************************************/
            view.goTo({
                target: viewshedGraphics,
                tilt: 0,
            }).catch((error) => {
                if (error.name != 'AbortError') {
                    console.error(error)
                }
            })

            view.when(() => {
                console.log('view ready ...')
            })
        }
    },
}
</script>

<style>
@import 'https://js.arcgis.com/4.20/@arcgis/core/assets/esri/themes/light/main.css';
</style>
