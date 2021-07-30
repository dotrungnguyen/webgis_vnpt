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

import WebMap from '@arcgis/core/WebMap'
import MapView from '@arcgis/core/views/MapView'

import Editor from '@arcgis/core/widgets/Editor'

export default {
    name: 'Editor',

    mounted() {
        console.log('Editor...')
        const webmap = new WebMap({
            portalItem: {
                id: '459a495fc16d4d4caa35e92e895694c8',
            },
        })

        const view = new MapView({
            container: 'viewDiv',
            map: webmap,
        })

        view.when(() => {
            view.map.loadAll().then(() => {
                view.map.allLayers.forEach((layer) => {
                    if (layer.type === 'feature') {
                        switch (layer.geometryType) {
                            case 'polygon':
                                polygonLayer = layer
                                break
                            case 'polyline':
                                lineLayer = layer
                                break
                            case 'point':
                                pointLayer = layer
                                break
                        }
                    }
                })

                // Create layerInfos for layers in Editor. This
                // sets the fields for editing.

                const pointInfos = {
                    layer: pointLayer,
                    fieldConfig: [
                        {
                            name: 'HazardType',
                            label: 'Hazard type',
                        },
                        {
                            name: 'Description',
                            label: 'Description',
                        },
                        {
                            name: 'SpecialInstructions',
                            label: 'Special Instructions',
                        },
                        {
                            name: 'Status',
                            label: 'Status',
                        },
                        {
                            name: 'Priority',
                            label: 'Priority',
                        },
                    ],
                }

                const lineInfos = {
                    layer: lineLayer,
                    fieldConfig: [
                        {
                            name: 'Severity',
                            label: 'Severity',
                        },
                        {
                            name: 'blocktype',
                            label: 'Type of blockage',
                        },
                        {
                            name: 'fullclose',
                            label: 'Full closure',
                        },
                        {
                            name: 'active',
                            label: 'Active',
                        },
                        {
                            name: 'locdesc',
                        },
                    ],
                }

                const polyInfos = {
                    layer: polygonLayer,
                    fieldConfig: [
                        {
                            name: 'incidenttype',
                            label: 'Incident Type',
                        },
                        {
                            name: 'activeincid',
                            label: 'Active',
                        },
                        {
                            name: 'descrip',
                            label: 'Description',
                        },
                    ],
                }

                const editor = new Editor({
                    view: view,
                    layerInfos: [
                        {
                            layer: pointLayer,
                            fieldConfig: [pointInfos],
                        },
                        {
                            layer: lineLayer,
                            fieldConfig: [lineInfos],
                        },
                        {
                            layer: polygonLayer,
                            fieldConfig: [polyInfos],
                        },
                    ],
                    // Set the snapping options for the Editor. By default, snapping is enabled. This can be toggled on/off using the CTRL key.
                    snappingOptions: {
                        enabled: true,
                        selfEnabled: true,
                        featureEnabled: true,
                        featureSources: [
                            {
                                layer: pointLayer,
                            },
                            {
                                layer: lineLayer,
                            },
                            {
                                layer: polygonLayer,
                            },
                        ],
                    },
                })
                // Add widget to top-right of the view
                view.ui.add(editor, 'top-right')
            })
        })

    },
}
</script>

<style>
@import 'https://js.arcgis.com/4.20/@arcgis/core/assets/esri/themes/light/main.css';
</style>
