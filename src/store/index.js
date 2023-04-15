import Vue from 'vue'
import Vuex from 'vuex'


import api from './modules/api.js'
import authorization from './modules/authorization.js'
import user from './modules/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    api,
    authorization,
    user
  }
})
