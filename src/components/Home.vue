<template>
    <div class="web-view">
        <div :class="sidebarActivate ? 'sidebar-on' : 'sidebar-off'">
            <Sidebar/>
        </div>
        <div class="map-view">
            <MapView  v-if="getReady" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Sidebar from './sidebar/sidebar.vue'
import MapView from './mapview/mapview.vue'

export default {
    components: { Sidebar, MapView },
    computed: {
        ...mapGetters(['getReady', 'sidebarActivate']),
    },
}
</script>
<style scoped></style>
