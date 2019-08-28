import Vue from 'vue'
import Vuex from 'vuex'

import players from "./modules/players"
import results from "./modules/results"
import courses from "./modules/courses"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        players,
        results,
        courses
    }
})
