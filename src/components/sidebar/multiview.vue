<template>
    <div class="w-full flex flex-row items-center">
        <div class="w-full flex flex-col items-center space-y-1">
            <button class="w-5/6 rounded-md h-11 text-center flex flex-row items-center bg-gray-200" v-on:click="activateMultiView">
                <Icon class="item-icon w-1/4" name="view-grid-add" />
                <a href="/map/Layout" class="w-2/4"><span class="item-sidebar-title">Multi-View</span></a>
                <Icon class="item-icon w-1/4" name="chevron-down" />
            </button>
            <div v-show="getMultiViewActive" class="w-5/6 flex flex-col items-center bg-gray-200 space-y-1 py-3">
                <div class="rounded-md w-5/6 h-8 flex flex-row items-center justify-between">
                    <span class="text-sz1 leading-none ml-3"><a href="/map/layout">2D - 2D</a></span>
                </div>

                <div class="rounded-md w-5/6 h-8 flex flex-row items-center justify-between">
                    <span class="text-sz1 leading-none ml-3"><a href="/map/layout-2">2D - 3D</a></span>
                </div>

                <div class="rounded-md w-5/6 h-8 flex flex-row items-center justify-between">
                    <span class="text-sz1 leading-none ml-3"><a href="/map/SceneLayer">Building - OSM</a></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from '../deco/Icon.vue'

import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'MultiView',

    computed: mapGetters(['getMultiViewActive']),
    methods: {
        ...mapMutations(['ACTIVATE_MULTI_VIEW']),
        activateMultiView() {
            this.$store.dispatch('saveActivateMultiView')
        },
    },

    components: { Icon },
}
</script>

<style>
</style>