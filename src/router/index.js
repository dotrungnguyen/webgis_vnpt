import {createRouter,createWebHistory} from 'vue-router'

import Home from '/src/components/Home.vue'
import BaseMap from '/src/components/map/BaseMap.vue'
import Transportation from '/src/components/map/Transportation.vue'
import AreaMeasurement from '/src/components/map/AreaMeasurement.vue'
// import GeometryEngine from '/src/components/map/GeometryEngine.vue'

// import Geoprocessing from '/src/components/map/Geoprocessing.vue'

import RouteTask from '/src/components/map/RouteTask.vue'
import Sketch from '/src/components/map/Sketch.vue'
import Bookmarks from '/src/components/map/Bookmarks.vue'

import Layout from '/src/components/map/Layout.vue'
import Layout2 from '/src/components/map/Layout-2.vue'

import Editor from '/src/components/map/Editor.vue'

import TileLayer from '/src/components/map/TileLayer.vue'

import Camera from '/src/components/map/Camera.vue'

import SceneLayer from '/src/components/map/SceneLayer.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/',
                name: '',
                component: BaseMap,
            },
            {
                path: '/map/Transportation',
                name: '',
                component: Transportation,
            },
            {
                path: '/map/AreaMeasurement',
                name: '',
                component: AreaMeasurement,
            },
            {
                path: '/map/RouteTask',
                name: '',
                component: RouteTask,
            },
            {
                path: '/map/Sketch',
                name: '',
                component: Sketch,
            },
            {
                path: '/map/Bookmarks',
                name: '',
                component: Bookmarks,
            },
            {
                path: '/map/Layout',
                name: '',
                component: Layout,
            },
            {
                path: '/map/Layout-2',
                name: '',
                component: Layout2,
            },
            {
                path: '/map/Editor',
                name: '',
                component: Editor,
            },
            {
                path: '/map/TileLayer',
                name: 'TileLayer',
                component: TileLayer,
            },
            {
                path: '/map/Camera',
                name: '',
                component: Camera,
            },

            {
                path: '/map/SceneLayer',
                name: '',
                component: SceneLayer,
            },
        ]
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
    
})

export default router