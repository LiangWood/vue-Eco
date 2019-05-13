import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    products: [],
    product: {},
    pagination: {},
  },
  actions: {
    // payload 載荷
    updateLoading (context, status) {
      context.commit('LOADING', status)
    },
    getProducts (context, page=1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/products?page=${page}`
      context.commit('LOADING', true)
      axios.get(api).then((res) => {
        console.log(res.data)
        context.commit('LOADING', false)
        context.commit('PRODUCTS', res.data.products)
        context.commit('PAGINATION', res.data.pagination)
      })
    },
    getProduct (context, id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/product/${id}`
      context.commit('LOADING', true)
      axios.get(api).then((res) => {
        console.log(res.data)
        context.commit('PRODUCT', res.data.product)
        context.commit('LOADING', false)
      })
    },
  },
  mutations: {
    LOADING (state, status) {
      state.isLoading = status
    },
    PRODUCTS (state, payload) {
      state.products = payload
    },
    PRODUCT (state, payload) {
      state.product = payload
    },
    PAGINATION (state, payload) {
      state.pagination = payload
    },
  },
  getters: {
    isLoading (state) {
      return state.isLoading
    },
    products (state) {
      return state.products
    },
    pagination (state) {
      return state.pagination
    }
  }
})
