export default {


    state: () => ({

        ready: true,

        ARCGISAPIKEY: 'AAPKef7ec4e29d744b99ab4c7559913aa230eEHLZcbaede0pSb8ydrbHua7h8nRxP3H1SxIJ39Waz1d7bPpq4ARivKbCN6y2VCy',

        basemap: 'topo-vector',
        center: [106.357033, 10.357343],
        zoom: 13,
        
        basemapL: 'osm',
        basemapR: 'streets-night-vector',
    }),

    getters: {
        getapiKey: state => state.ARCGISAPIKEY,
        getReady: state => state.ready,
        getMapConfig: state => state,
    },

    mutations: {
        CHANGE_READY(state) {
            state.ready = true
        },

        CHANGE_CENTTER(state,payload) {
            state.ready = !state.ready
            state.center = payload
        },

        CHANGE_BASE_MAP_CONFIG(state,payload) {
            state.ready = false
            state.center = payload.center
            state.zoom = payload.zoom

        }

    },

    actions: {
        saveReady({ commit }) {
            commit('CHANGE_READY')
        },
        async saveNewBaseMap({ dispatch, commit }) {
            await commit('CHANGE_BASE_MAP')
            dispatch('saveReady')
        },

        async saveNewCentter({ dispatch, commit }, data) {
            await commit('CHANGE_CENTTER', data.center)
            dispatch('saveReady')
        },

        async saveNewBaseMapConfig({ dispatch, commit }, data) {
            await commit('CHANGE_BASE_MAP_CONFIG', data)
            dispatch('saveReady')
        }

    },
}