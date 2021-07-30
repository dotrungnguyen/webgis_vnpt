<template>
    <!-- <div></div> -->
    <!-- <base_map/> -->
    <router-view class="map-view"/>

    <!-- <Transportation v-if="getCurrentService === 'transportation'" /> -->
    <!-- <span id="layerToggle" class="esri-widget"> <input type="checkbox" id="streetsLayer" checked /> Transportation </span> -->
</template>

<script>
import { mapGetters, mapState } from 'vuex'
// import transportation from './map/Transportation.vue'
// import base_map from './map/base_map.vue'
// import AreaMeasurement from './map/AreaMeasurement.vue'

// // import Geoprocessing from './map/Geoprocessing.vue'

// import RouteTask from './map/RouteTask.vue'

// import Sketch from './map/Sketch.vue'


export default {
    name: 'ViewMap',

    // components: {Sketch, RouteTask ,AreaMeasurement,transportation, base_map},

    computed: {
        ...mapGetters(['getReady', 'getCurrentService']),
    },

    mounted() {
        console.log(this.getCurrentService)
        // const app = await import('../data/Transportation.js')
        // app.initialize(this.$el)
    },
}
</script>

<style>
@import 'https://js.arcgis.com/4.20/@arcgis/core/assets/esri/themes/light/main.css';

</style>
