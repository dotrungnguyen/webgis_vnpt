<template>
    <div></div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import esriConfig from '@arcgis/core/config'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'

import BasemapToggle from '@arcgis/core/widgets/BasemapToggle'
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery'

import Locate from '@arcgis/core/widgets/Locate'

import Search from '@arcgis/core/widgets/Search'

export default {
    name: 'BaseMap',
    computed: {
        ...mapGetters(['getMapConfig', 'getapiKey']),
    },

    mounted() {

        esriConfig.apiKey = this.getapiKey
        console.log(esriConfig.apiKey)

        const map = new Map({
            basemap: this.getMapConfig.basemap,
        })

        const view = new MapView({
            container: this.$el,
            map: map,
            center: this.getMapConfig.center,
            zoom: this.getMapConfig.zoom,
        })

        const basemapToggle = new BasemapToggle({
            view: view,
            nextBasemap: 'arcgis-imagery',
        })

        view.ui.add(basemapToggle, 'bottom-right')

        // const basemapGallery = new BasemapGallery({
        //     view: view,
        //     source: {
        //         query: {
        //             title: '"World Basemaps for Developers" AND owner:esri',
        //         },
        //     },
        // })

        // view.ui.add(basemapGallery, 'bottom-right') // Add to the view

        // Add Search widget
        const search = new Search({
            view: view,
        })
        view.ui.add(search, 'top-right') //Add to the map

        const locate = new Locate({
            view: view,
            useHeadingEnabled: false,
            goToOverride: function (view, options) {
                options.target.scale = 1500
                return view.goTo(options.target)
            },
        })
        view.ui.add(locate, 'bottom-left')

        view.when(() => {
            console.log('view ready ...')
        })
    },
}
</script>

<style>
@import 'https://js.arcgis.com/4.20/@arcgis/core/assets/esri/themes/light/main.css';
</style>
