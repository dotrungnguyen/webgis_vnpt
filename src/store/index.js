import { createStore } from "vuex";

import sidebarstate from '../store/modules/sidebarstate'
import mapviewstate from '../store/modules/mapviewstate'
import mapservicestate from '../store/modules/mapservicestate'
const store = createStore({
    modules: {
        sidebarstate,
        mapviewstate,
        mapservicestate
    }
})

export default store