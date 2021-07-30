<template>
    <div id="viewDiv"></div>
</template>

<script>
import { mapGetters } from 'vuex'

import esriConfig from '@arcgis/core/config'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'

import SceneView from '@arcgis/core/views/SceneView'
import TileLayer from '@arcgis/core/layers/TileLayer'

export default {
    name: 'TileLayer',

    computed: {
        ...mapGetters(['getMapConfig', 'getapiKey', 'getCurrentService']),
    },

    mounted() {
        console.log('TileLayer ...')

        const map = new Map({
            basemap: 'gray',
        })

        const boundariesAlternateLayer = new TileLayer({
            url: 'https://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places_Alternate/MapServer',
            id: 'boundariesAlternateLayer',
            visible: false,
        })

        map.add(boundariesAlternateLayer)

        const boundariesLayer= new TileLayer({
            url: 'https://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer',
            id: 'boundariesLayer',
            visible: false,
        })

        map.add(boundariesLayer)

        const transportationLayer = new TileLayer({
            url: 'https://server.arcgisonline.com/arcgis/rest/services/Reference/World_Transportation/MapServer',
            id: 'streets',
            visible: false,
        })

        map.add(transportationLayer)

        const overlayLayer = new TileLayer({
            url: 'https://services.arcgisonline.com/arcgis/rest/services/Reference/World_Reference_Overlay/MapServer',
            id: 'overlay',
            visible: false,
        })

        map.add(overlayLayer)

        const deLormeWorldBaseMapLayer = new TileLayer({
            url: 'https://services.arcgisonline.com/arcgis/rest/services/Specialty/DeLorme_World_Base_Map/MapServer',
            id: 'DeLorme_World_Base_Map',
            visible: false,
        })

        map.add(deLormeWorldBaseMapLayer)


        const worldNavigationChartsLayer = new TileLayer({
            url: 'https://services.arcgisonline.com/arcgis/rest/services/Specialty/World_Navigation_Charts/MapServer',
            id: 'World_Navigation_Charts',
            visible: false,
        })

        map.add(worldNavigationChartsLayer)



        const worldOceanBaseLayer = new TileLayer({
            url: 'https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer',
            id: 'World_Ocean_Base',
            visible: false,
        })

        map.add(worldOceanBaseLayer)


        const WorldHillshadeLayer = new TileLayer({
            url: 'https://services.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer',
            id: 'World_Hillshade',
            visible: false,
        })

        map.add(WorldHillshadeLayer)


                const worldImageryLayer = new TileLayer({
            url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer',
            id: 'World_Imagery',
            visible: false,
        })

        map.add(worldImageryLayer)


        const view = new SceneView({
            container: 'viewDiv',
            map: map,
            center: this.getMapConfig.center,
            zoom: this.getMapConfig.zoom,
        })

        view.when(() => {})

        const boundariesAlternateLayerToggle = document.getElementById(
            'boundariesAlternateLayerToggle'
        )

        boundariesAlternateLayerToggle.addEventListener('change', () => {
            boundariesAlternateLayer.visible = boundariesAlternateLayerToggle.checked
        })

        const boundariesLayerToggle = document.getElementById(
            'boundariesLayerToggle'
        )

        boundariesLayerToggle.addEventListener('change', () => {
            boundariesLayer.visible = boundariesLayerToggle.checked
        })

        const streetsLayerToggle = document.getElementById('streetsLayer')

        streetsLayerToggle.addEventListener('change', () => {
            transportationLayer.visible = streetsLayerToggle.checked
        })

        const overlayLayerToggle = document.getElementById('overlayLayerToggle')

        overlayLayerToggle.addEventListener('change', () => {
            overlayLayer.visible = overlayLayerToggle.checked
        })

        const deLormeWorldBaseMapLayerToggle = document.getElementById('deLormeWorldBaseMapLayerToggle')

        deLormeWorldBaseMapLayerToggle.addEventListener('change', () => {
            deLormeWorldBaseMapLayer.visible = deLormeWorldBaseMapLayerToggle.checked
        })

        const worldNavigationChartsLayerToggle = document.getElementById('worldNavigationChartsLayerToggle')

        worldNavigationChartsLayerToggle.addEventListener('change', () => {
            worldNavigationChartsLayer.visible = worldNavigationChartsLayerToggle.checked
        })


        const worldOceanBaseLayerToggle = document.getElementById('worldOceanBaseLayerToggle')

        worldOceanBaseLayerToggle.addEventListener('change', () => {
            worldOceanBaseLayer.visible = worldOceanBaseLayerToggle.checked
        })


                const WorldHillshadeLayerToggle = document.getElementById('WorldHillshadeLayerToggle')

        WorldHillshadeLayerToggle.addEventListener('change', () => {
            WorldHillshadeLayer.visible = WorldHillshadeLayerToggle.checked
        })

        const worldImageryLayerToggle = document.getElementById('worldImageryLayerToggle')

        worldImageryLayerToggle.addEventListener('change', () => {
            worldImageryLayer.visible = worldImageryLayerToggle.checked
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
