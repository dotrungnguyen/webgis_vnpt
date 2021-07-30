<template>
    <div class="w-full space-y-1">
        <div class="w-full h-20 flex flex-row items-center">
            <div class="sidebar-icon" @click="activateSidebar()">
                <Icon name="menu" />
            </div>
        </div>
        <!-- 
        <div class="w-full h-48 flex flex-col items-center">
            <div v-for="s in sidebarSections" :key="s.id" :class="s.id == sidebarSelected ? 'item-sidebar-on' : 'item-sidebar-off '" @click="setSidebarState(s.id)">
                <div class="item-icon"><Icon :name="s.icon_id" /></div>
                <span v-show="sidebarActivate" class="sidebar-title-1"
                    ><a v-bind:href="s.link">{{ s.title }}</a></span
                >
            </div>
        </div> -->

        <div class="w-full flex flex-col items-center" v-show="sidebarActivate">
            <ControlPanel />
        </div>

        <div class="w-full flex flex-col items-center" v-show="sidebarActivate">
            <SceneView />
        </div>

        <div class="w-full flex flex-col items-center" v-show="sidebarActivate">
            <MapCollection />
        </div>

        <div class="w-full flex flex-col items-center" v-show="sidebarActivate">
            <MultiView />
        </div>
    </div>
</template>

<script>
import Icon from '../deco/Icon.vue'
import ControlPanel from './controlpanel.vue'
import MapCollection from './mapcollection.vue'
import SceneView from './sceneview.vue'
import MultiView from './multiview.vue'

import { mapMutations, mapGetters } from 'vuex'

export default {
    name: 'Sidebar',
    components: {
        Icon,
        ControlPanel,
        MapCollection,
        SceneView,
        MultiView,
    },

    computed: mapGetters(['sidebarActivate', 'sidebarSections', 'sidebarSelected', 'sidebarActivate', 'getMapConfig']),
    methods: {
        nameRoute() {
            return this.$route.name === 'TileLayer'
        },
        ...mapMutations(['SET_SIDEBAR_STATE']),
        setSidebarState(itemID) {
            this.$store.dispatch('saveSidebarState', itemID)
        },
        ...mapMutations(['ACTIVATE_SIDEBAR']),
        activateSidebar() {
            this.$store.dispatch('saveActivateSidebar')
        },

        ...mapMutations(['CHANGE_BASE_MAP']),
        c() {
            this.$store.dispatch('saveNewBaseMap')
            console.log(this.getMapConfig)
        },

        ...mapMutations(['CHANGE_READY']),
        resh() {
            this.$store.dispatch('saveReady')
            console.log(this.getMapConfig)
        },
    },
}
</script>

<style></style>
