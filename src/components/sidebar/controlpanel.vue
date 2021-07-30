<template>
    <div class="sidebar-block">
        <div class="sidebar-block-col space-y-1">
            <button class="sidebar-rounded bg-gray-200">
                <div class="item-icon w-1/4"><Icon name="map-2-d" /></div>
                <a href="/" class="w-2/4"><span class="item-sidebar-title">2D Map</span></a>
                <div class="item-icon w-1/4" v-on:click="activateContralPanel"><Icon name="chevron-down" /></div>
            </button>
            <div v-show="getControlPanelActive" class="w-full flex flex-col items-center">
                <div class="rounded-md w-5/6 h-44 bg-gray-200 flex flex-row items-center">
                    <div class="w-full flex flex-col items-center space-y-1">
                        <div class="rounded-md flex flex-row items-center w-5/6 h-8 bg-gray-200">
                            <span class="text-sz1 leading-none w-2/6"> longitude </span>
                            <input class="input-number h-6 w-4/6 m-1" type="number" min="-180.0000000" max="180.0000000" v-model="longitude" />
                        </div>
                        <div class="rounded-md flex flex-row items-center w-5/6 h-8 bg-gray-200">
                            <span class="text-sz1 leading-none w-2/6">latitude</span>
                            <input class="input-number h-6 w-4/6 m-1" type="number" min="-90.0000000" max="90.0000000" v-model="latitude" />
                        </div>
                        <div class="rounded-md flex flex-row items-center w-5/6 h-8 bg-gray-200">
                            <span class="text-sz1 leading-none w-2/6">zoom</span>
                            <input class="input-number h-6 w-4/6 m-1" type="number" min="1" max="100" v-model="zoom" />
                        </div>
                        <button
                            class="rounded-md w-5/6 h-8 bg-white mt-3 flex flex-row items-center justify-between"
                            type="submit"
                            @click="
                                setBaseMapConfig({
                                    center: [longitude, latitude],
                                    zoom: zoom,
                                })
                            "
                        >
                            <span class="w-full text-sz1 leading-none"> go </span>
                        </button>
<!-- 
                        <div class="rounded-md flex flex-row items-center justify-between w-5/6 h-8 bg-gray-200">
                            <button id="rotateAntiClockwiseSpan" title="Rotate 90°">↻</button>
                        </div> -->
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
    name: 'ControlPanel',
    components: { Icon },

    computed: mapGetters(['getControlTask', 'getCurrentControlTask', 'getControlPanelActive']),
    methods: {
        ...mapMutations(['CHANGE_BASE_MAP_CONFIG']),
        setBaseMapConfig(data) {
            // console.log(this.getMapConfig)
            this.$store.dispatch('saveNewBaseMapConfig', data)
            console.log(this.getMapConfig)
        },
        ...mapMutations(['ACTIVATE_CONTROL']),
        activateContralPanel() {
            this.$store.dispatch('saveActivateCortrol')
        },
    },
}
</script>

<style></style>
