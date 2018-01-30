import Vue from 'vue'
import Vuex from 'vuex'
import vuexModules from './modules'
import axios from '../util/ajax'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    modules: vuexModules
})