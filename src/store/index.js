import Vue from 'vue'
import Vuex from 'vuex'

import productsModule from './products'
import cartsModule from './carts'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false
  },
  actions: {
    // payload 載荷
    updateLoading (context, status) {
      context.commit('LOADING', status)
    }
  },
  mutations: {
    LOADING (state, status) {
      state.isLoading = status
    }
  },
  getters: {
    isLoading (state) {
      return state.isLoading
    }
  },
  modules: {
    productsModule,
    cartsModule
  }
})
