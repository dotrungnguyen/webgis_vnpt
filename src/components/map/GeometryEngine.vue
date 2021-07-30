<template>
    <div class="map-view grid grid-cols-2">
        <div class="h-screen w-full bg-red-800" id="viewDiv2d"></div>
        <div class="h-screen w-full bg-yellow-700" id="viewDiv3d"></div>
    </div>
</template>

<script>

import Map from '@arcgis/core/Map'
import SceneView from '@arcgis/core/views/SceneView'
import MapView from '@arcgis/core/views/MapView'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import Graphic from '@arcgis/core/Graphic'
import geometryEngine from '@arcgis/core/geometry/geometryEngine'

export default {
    name: 'GeometryEngine',

    mounted() {
        console.log('GeometryEngine ...')

        const map = new Map({
            basemap: 'satellite',
        })

        // Add two graphics layers to map: one for points, another for buffers

        const bufferLayer = new GraphicsLayer()
        const pointLayer = new GraphicsLayer()
        map.addMany([bufferLayer, pointLayer])

        const viewOptions = {
            map: map,
            zoom: 3,
            center: [0, 60],
        }

        const view3d = new SceneView(viewOptions)
        view3d.container = 'viewDiv3d'
        // view3d.ui.add('info', 'top-right')

        const view2d = new MapView(viewOptions)
        view2d.container = 'viewDiv2d'

        const polySym = {
            type: 'simple-fill', // autocasts as new SimpleFillSymbol()
            color: [140, 140, 222, 0.5],
            outline: {
                color: [0, 0, 0, 0.5],
                width: 2,
            },
        }

        const pointSym = {
            type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
            color: [255, 0, 0],
            outline: {
                color: [255, 255, 255],
                width: 1,
            },
            size: 7,
        }

        // Indicates whether buffering is enabled

        let bufferEnabled = false

        /**
         * When the b key is tapped, then buffering is enabled.
         * @param {Object} event - The event object associated with the
         *   key-down event.
         */
        function keyDownListener(event) {
            const keyInput = event.key
            bufferEnabled = keyInput === 'b' && !bufferEnabled
            if (bufferEnabled) {
                document.getElementById('mode').innerHTML = 'navigation'
            } else {
                document.getElementById('mode').innerHTML = 'buffering'
            }
        }

        view2d.on('key-down', keyDownListener)
        view3d.on('key-down', keyDownListener)

        view2d.on('pointer-move', (event) => {
            if (bufferEnabled) {
                createBuffer(event, view2d)
            }
        })

        view3d.on('pointer-move', (event) => {
            if (bufferEnabled) {
                createBuffer(event, view3d)
            }
        })

        view2d.on('click', (event) => {
            bufferPoint(event.mapPoint)
        })

        view3d.on('click', (event) => {
            bufferPoint(event.mapPoint)
        })

        /**
         * Stops propagation on the given event and constructs a point for
         * buffering.
         *
         * @param {Object}   event - Event object containing XY screen coordinates.
         * @param {Mapview | SceneView} view - View instance from which the point was obtained.
         */
        function createBuffer(event, view) {
            // prevent further propagation of the current event bubbling up the event chain.
            // in this case, it will prevent default `drag` event behavior for the MapView
            // which is to move around the view by dragging the pointer.
            event.stopPropagation()

            // convert screen coordinates to map coordinates
            const point = view.toMap({
                x: event.x,
                y: event.y,
            })

            if (point) {
                bufferPoint(point)
            }
        }

        /**
         * Buffers the given point by 560 kilometers.
         *
         * @param {esri/geometry/Point} point - A point instance to buffer.
         */
        function bufferPoint(point) {
            if (!bufferEnabled) {
                console.log(
                    'buffering not enabled. Hit the b key and click/drag to buffer.'
                )
                return
            }

            clearGraphics()

            // removes z-values from the point when taken from a SceneView.
            // GeometryEngine does not support 3D geometries.
            point.hasZ = false
            point.z = undefined

            pointLayer.add(
                new Graphic({
                    geometry: point,
                    symbol: pointSym,
                })
            )

            const buffer = geometryEngine.geodesicBuffer(
                point,
                560,
                'kilometers'
            )
            bufferLayer.add(
                new Graphic({
                    geometry: buffer,
                    symbol: polySym,
                })
            )
        }

        /**
         * Clears all graphics from all GraphicsLayers
         */
        function clearGraphics() {
            pointLayer.removeAll()
            bufferLayer.removeAll()
        }

        view2d.when(() => {
            console.log('viewR ready ...')
        })
        view3d.when(() => {
            console.log('viewR ready ...')
        })
    },
}
</script>

<style>
@import 'https://js.arcgis.com/4.20/@arcgis/core/assets/esri/themes/light/main.css';
</style>
