<template>
    <div class="w-full flex flex-row items-center">
        <div class="w-full flex flex-col items-center space-y-1">
            <button class="w-5/6 rounded-md h-11 text-center flex flex-row items-center bg-gray-200" v-on:click="activateMapColection">
                <Icon class="item-icon w-1/4" name="collection" />
                <span class="item-sidebar-title w-2/4">Map Collection</span>
                <Icon class="item-icon w-1/4" name="chevron-down" />
            </button>
            <div
                v-show="getMapCollectionActive"
                class="w-5/6 flex flex-col items-center bg-gray-200 space-y-1 py-3"
            >
                <div
                    v-for="task in getMapCollection"
                    :key="task.id"
                    @click="setCurentControlTask(task.id)"
                    class="rounded-md  w-5/6 h-8 flex flex-row items-center justify-between"
                >
                    <span class="text-sz1 lowercase leading-none ml-3"><a v-bind:href="task.link">{{ task.title }}</a></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from '../deco/Icon.vue'

import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'MapCollection',

    computed: mapGetters([
        'getMapCollection',
        'getCurrentMapCollection',
        'getMapCollectionActive',
    ]),
    methods: {
        ...mapMutations(['ACTIVATE_MAP_COLLECTION']),
        activateMapColection() {
            this.$store.dispatch('saveActivateMapCollection')
        },
        ...mapMutations(['SET_CURENT_CONTROL_TASK']),
        setCurentControlTask(taskID) {
            this.$store.dispatch('saveCurrentControlTask', taskID)
            console.log(taskID)
        },
    },

    components: { Icon },
}
</script>

<style>
</style>