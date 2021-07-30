<template>
    <div class="sidebar-block">
        <div class="sidebar-block-col space-y-1">
            <button class="sidebar-rounded bg-gray-200">
                <div class="item-icon w-1/4"><Icon name="map-3-d" /></div>
                <a href="/map/TileLayer" class="w-2/4"><span class="item-sidebar-title">3D Map</span></a>
                <div class="item-icon w-1/4" v-on:click="activateService"><Icon name="chevron-down" /></div>
            </button>
            <div v-show="getServiceControlActive" class="w-full flex flex-col items-center">
                <div class="rounded-md w-5/6 h-56 bg-gray-200 flex flex-row items-center">
                    <div class="w-full flex flex-col items-center space-y-1">
                        <!-- <div class="rounded-md w-auto h-5 p-1 bg-white flex flex-row items-center" v-for="service in getSceneViewService" :key="service.id">
                            <input type="checkbox" class="ml-1" :id="service.id" />
                            <span class="text-sz1 leading-none mx-2">{{ service.title }}</span>
                        </div> -->

                        <div class="check-box">
                            <input type="checkbox" class="ml-1" id="streetsLayer" />
                            <span class="text-item">transportation</span>
                        </div>

                        <div class="check-box">
                            <input type="checkbox" class="ml-1" id="boundariesAlternateLayerToggle" />
                            <span class="text-item">boundaries alternate</span>
                        </div>

                        <div class="check-box">
                            <input type="checkbox" class="ml-1" id="boundariesLayerToggle" />
                            <span class="text-item">boundaries</span>
                        </div>

                        <div class="check-box">
                            <input type="checkbox" class="ml-1" id="overlayLayerToggle" />
                            <span class="text-item">overlay</span>
                        </div>

                        <div class="check-box">
                            <input type="checkbox" class="ml-1" id="deLormeWorldBaseMapLayerToggle" />
                            <span class="text-item">DeLorme World</span>
                        </div>

                        <div class="check-box">
                            <input type="checkbox" class="ml-1" id="worldNavigationChartsLayerToggle" />
                            <span class="text-item">world navigation</span>
                        </div>

                        <div class="check-box">
                            <input type="checkbox" class="ml-1" id="worldOceanBaseLayerToggle" />
                            <span class="text-item">world ocean base</span>
                        </div>

                        <div class="check-box">
                            <input type="checkbox" class="ml-1" id="WorldHillshadeLayerToggle" />
                            <span class="text-item">world hill shade</span>
                        </div>

                        <div class="check-box">
                            <input type="checkbox" class="ml-1" id="worldImageryLayerToggle" />
                            <span class="text-item">world imagery</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from '../deco/Icon.vue'

import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'SceneView',
    components: { Icon },

    computed: mapGetters(['getServiceControlActive', 'getSceneViewService']),
    methods: {
        ...mapMutations(['ACTIVATE_SERVICE']),
        activateService() {
            this.$store.dispatch('saveActivateService')
        },
    },
}
</script>

<style>
</style>