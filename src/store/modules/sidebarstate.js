export default {
    state: () => ({
        // mapview: {name: 'Map View', on: True},
        // discover: {name: 'Discover', on: False},
        // guide: {name: 'Guide', on: False},
        active: true,

        sections: [
            { id: 1, icon_id: 'map', title: 'Map View', link: '/' },
            { id: 2, icon_id: 'compass', title: 'Discover', link: '/' },
            { id: 3, icon_id: 'message', title: 'Guide', link: '/' },
            { id: 4, icon_id: 'cube-alt', title: '3D map', link: '/map/TileLayer' }
        ],
        selected: 1,

        controlTask: [
            { id: 1, title: 'longitude', max: 180, min: -180, type: 'number' },
            { id: 2, title: 'latitude', max: 90, min: -90, type: 'number' },
            { id: 3, title: 'zoom', max: 100, min: 1, type: 'number' },
        ],
        currentControlTask: 0,

        controlPanelActive: false,

        mapCollection: [
            { id: 1, title: 'transportation', link: '/map/Transportation' },
            { id: 2, title: 'areameasurement', link: '/map/AreaMeasurement' },
            { id: 3, title: 'Editor', link: '/map/Editor' },
            { id: 4, title: 'Layout', link: '/map/Layout' },
            { id: 5, title: 'Bookmarks', link: '/map/Bookmarks' },
            { id: 6, title: 'Sketch', link: '/map/Sketch' },
            { id: 7, title: 'RouteTask', link: '/map/RouteTask' },
        ],

        currentMapCollection: 0,

        mapCollectionActive: false,

        mapViewTwoLayout: false,

        serviceControlActive: false,


        sceneViewService: [
            { id: 'streetsLayer', title: 'transportation'},

        ],

        multiViewActive: false,


    }),

    getters: {
        sidebarSections: state => state.sections,
        sidebarSelected: state => state.selected,
        sidebarActivate: state => state.active,

        getControlTask: state => state.controlTask,
        getCurrentControlTask: state => state.currentControlTask,
        getControlPanelActive: state => state.controlPanelActive,

        getMapCollection: state => state.mapCollection,
        getCurrentMapCollection: state => state.currentMapCollection,
        getMapCollectionActive: state => state.mapCollectionActive,

        getServiceControlActive: state => state.serviceControlActive,

        // getMapLink(id): id => state.mapCollection()

        getSceneViewService: state => state.sceneViewService,

        getMultiViewActive: state => state.multiViewActive,

    },

    mutations: {
        ACTIVATE_SIDEBAR(state) {
            state.active = !state.active
        },
        SET_SIDEBAR_STATE(state, payload) {
            state.selected = payload
        },

        ACTIVATE_CONTROL(state) {
            state.controlPanelActive = !state.controlPanelActive
        },

        SET_CURENT_CONTROL_TASK(state, payload) {
            state.currentControlTask = payload
        },


        ACTIVATE_MAP_COLLECTION(state) {
            state.mapCollectionActive = !state.mapCollectionActive
        },

        SET_CURENT_MAP_COLLECTION(state, payload) {
            state.currentMapCollection = payload
        },

        ACTIVATE_SERVICE(state) {
            state.serviceControlActive = !state.serviceControlActive
        },

        ACTIVATE_MULTI_VIEW(state) {
            state.multiViewActive = !state.multiViewActive
        },

    },

    actions: {
        saveSidebarState({ commit }, data) {
            commit('SET_SIDEBAR_STATE', data)
        },
        saveActivateSidebar({ commit }) {
            commit('ACTIVATE_SIDEBAR')
        },
        saveActivateCortrol({ commit }) {
            commit('ACTIVATE_CONTROL')
        },
        saveCurrentControlTask({ commit }, data) {
            commit('SET_CURENT_CONTROL_TASK', data)
        },
        saveActivateMapCollection({ commit }) {
            commit('ACTIVATE_MAP_COLLECTION')
        },
        saveCurrentMapCollection({ commit }, data) {
            commit('SET_CURENT_MAP_COLLECTION', data)
        },

        saveActivateService({ commit }) {
            commit('ACTIVATE_SERVICE')
        },

        saveActivateMultiView({ commit }) {
            commit('ACTIVATE_MULTI_VIEW')
        },


    },
}