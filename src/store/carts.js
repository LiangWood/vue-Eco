import axios from 'axios'

export default {
  state: {
    cart: {}
  },
  actions: {
    addtoCart (context, { id, qty }) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      context.commit('LOADING', true)
      axios.post(api, { data: cart }).then((res) => {
        if (res.data.success) {
          context.commit('LOADING', false)
          context.dispatch('getCart')
          console.log('加入購物車', res.data)
          // this.$bus.$emit('message:push', `【${res.data.data.product.title}】
					// 	${res.data.data.qty} ${res.data.data.product.unit} ${res.data.message}`, 'success')
          }
      })
    },
    removeCartItem (context, id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart/${id}`
      context.commit('LOADING', true)
      axios.delete(api).then(() => {
        // console.log(res.data)
        context.dispatch('getCart')
        context.commit('LOADING', false)
      })
    },
    getCart (context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart`
      axios.get(api).then((res) => {
        console.log('取得購物車資料', res.data.data)
        context.commit('CART', res.data.data)
      })
    }

  },
  mutations: {
    CART (state, payload) {
      state.cart = payload
    }

  },
  getters: {
    cart (state) {
      return state.cart
    }
  }
}
