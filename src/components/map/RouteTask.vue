<template>
    <div class="map-view" id="viewDiv">
        <!-- <div id="viewDiv"></div>

        <div id="info" class="esri-widget">
            Click on a parcel polygon to display its area and perimeter.
        </div> -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import Graphic from '@arcgis/core/Graphic'
import RouteTask from '@arcgis/core/tasks/RouteTask'
import RouteParameters from '@arcgis/core/rest/support/RouteParameters'
import FeatureSet from '@arcgis/core/rest/support/FeatureSet'

export default {
    name: 'RouteTask',
    computed: {
        ...mapGetters([ 'getapiKey','getMapConfig']),
    },

    mounted() {
        console.log('RouteTask...')

        var routeTask = new RouteTask({
            url: 'https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World',
        })

        // The stops and route result will be stored in this layer
        var routeLayer = new GraphicsLayer()

        // Setup the route parameters
        var routeParams = new RouteParameters({
            // An authorization string used to access the routing service
            apiKey: this.getapiKey,
            stops: new FeatureSet(),
            outSpatialReference: {
                // autocasts as new SpatialReference()
                wkid: 3857,
            },
        })

        // Define the symbology used to display the stops
        var stopSymbol = {
            type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
            style: 'cross',
            size: 15,
            outline: {
                // autocasts as new SimpleLineSymbol()
                width: 4,
            },
        }

        // Define the symbology used to display the route
        var routeSymbol = {
            type: 'simple-line', // autocasts as SimpleLineSymbol()
            color: "rgba(255,50,50,.25)",
            width: 5,
        }

        var map = new Map({
            basemap: 'streets-navigation-vector',
            layers: [routeLayer], // Add the route layer to the map
        })

        var view = new MapView({
            container: 'viewDiv', // Reference to the scene div created in step 5
            map: map, // Reference to the map object created before the scene
            center: this.getMapConfig.center,
            zoom: this.getMapConfig.zoom,
        })

        // Adds a graphic when the user clicks the map. If 2 or more points exist, route is solved.
        view.on('click', addStop)

        function addStop(event) {
            // Add a point at the location of the map click
            var stop = new Graphic({
                geometry: event.mapPoint,
                symbol: stopSymbol,
            })
            routeLayer.add(stop)

            // Execute the route task if 2 or more stops are input
            routeParams.stops.features.push(stop)
            if (routeParams.stops.features.length >= 2) {
                routeTask.solve(routeParams).then(showRoute)
            }
        }
        // Adds the solved route to the map as a graphic
        function showRoute(data) {
            var routeResult = data.routeResults[0].route
            routeResult.symbol = routeSymbol
            routeLayer.add(routeResult)
        }

        // view.when(() => {
        //     console.log('view ready ...')
        // })
    },
}
</script>

<style>
@import 'https://js.arcgis.com/4.20/@arcgis/core/assets/esri/themes/light/main.css';
</style>
