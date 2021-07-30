<template>
    <div class="map-view" id="viewDiv"></div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import esriConfig from '@arcgis/core/config'

import WebMap from '@arcgis/core/WebMap'
import MapView from '@arcgis/core/views/MapView'

import Bookmarks from '@arcgis/core/widgets/Bookmarks'
import Expand from '@arcgis/core/widgets/Expand'

export default {
    name: 'Bookmarks',
    computed: {
        ...mapGetters(['getMapConfig', 'getapiKey']),
    },

    mounted() {
        esriConfig.apiKey = this.getapiKey
        
        const webmap = new WebMap({
            portalItem: {
                // autocasts as new PortalItem()
                id: '876995f34a6d4871b8556336b7349837',
            },
        })

        const view = new MapView({
            container: 'viewDiv',
            map: webmap,
        })

        const bookmarks = new Bookmarks({
            view: view,
            // allows bookmarks to be added, edited, or deleted
            editingEnabled: true,
        })

        const bkExpand = new Expand({
            view: view,
            content: bookmarks,
            expanded: true,
        })

        // Add the widget to the top-right corner of the view
        view.ui.add(bkExpand, 'top-right')

        // bonus - how many bookmarks in the webmap?
        webmap.when(function () {
            if (webmap.bookmarks && webmap.bookmarks.length) {
                console.log('Bookmarks: ', webmap.bookmarks.length)
            } else {
                console.log('No bookmarks in this webmap.')
            }
        })
    },
}
</script>

<style>
@import 'https://js.arcgis.com/4.20/@arcgis/core/assets/esri/themes/light/main.css';
</style>
