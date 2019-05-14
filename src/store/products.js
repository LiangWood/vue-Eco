import axios from 'axios'

export default {
  state: {
    products: [],
    product: {},
    pagination: {},
  },
  actions: {
    // payload 載荷
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
        console.log('取得產品列表', res.data)
        context.commit('PRODUCT', res.data.product)
        context.commit('LOADING', false)
      })
    },
  },
  mutations: {
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
    products (state) {
      return state.products
    },
    pagination (state) {
      return state.pagination
    },
    product (state) {
      return state.product
    }
  }
}
