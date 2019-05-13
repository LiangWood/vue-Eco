<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <navbar/>
    <div class="mainContent container h-100 my-5">
        <div class="row">
          <div class="col-md-8">
            <div class="prodWrapper">

              <img  class="img-fluid" :src="product.imageUrl" :alt="product.title" />
              <p class="card-text mt-5">{{ product.description }}</p>

            </div>
          </div>

          <div class="col-md-4">
            <div class="prodWrapper" style="top: 30px; position:sticky;">
              <h1 class="h2 tilte">{{ product.title }}</h1>
              <div class="d-flex my-3 align-items-end justify-content-end">
                <del class="text-muted">售價 {{ product.origin_price }}</del>
                <div class="h3 mb-0 ml-auto text-danger">
                  <small>優惠價 NT$</small>
                  <strong>{{ product.price }}</strong>
                </div>
              </div>

              <div class="input-group mt-3">
                <select name="" class="form-control mr-1" v-model="product.num">
                  <option :value="num" v-for="num in 10" :key="num">
                    選購 {{ num }} {{ product.unit }}
                  </option>
                </select>
                <a href="shoppingCart-checkout.html" class="btn btn-primary" @click.prevent="addtoCart(product.id, product.num)">
                  <i class="fa fa-cart-plus" aria-hidden="true"></i> 加入購物車
                </a>
              </div>
              <div class="text-muted pt-3">
                小計 <strong>{{ product.num * product.price }}</strong> 元
              </div>
            </div>
          </div>
        </div>
    </div>

    <Footer/>

  </div>
</template>

<script>
import navbar from '../mainNavbar'
import Footer from '../footer'

import { mapGetters } from 'vuex'

export default {
  components: {
    navbar,
    Footer
  },
  props: {
    item: {
      type: Object,
      default: () => { {} }
    }
  },
  data () {
    return {
      cart: {}
    }
  },
  methods: {
    getProduct (id) {
      this.$store.dispatch('getProduct', id)
    },
    addtoCart (id, qty = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post(api, { data: cart }).then((res) => {
        console.log('加入購物車', res.data)
        if (res.data.success) {
          this.$bus.$emit('shopCart:update')
          this.$bus.$emit('message:push', `【${res.data.data.product.title}】
						${res.data.data.qty} ${res.data.data.product.unit} ${res.data.message}`, 'success')
        }
      })
    },
    getCart () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart`
      this.$http.get(api).then((res) => {
        console.log(res.data)
        this.cart = res.data.data
      })
    }
  },
  created () {
    this.productId = this.$route.params.prodId
    this.getProduct(this.productId)
    this.getCart()
  },
  computed: {
    product () {
      return this.$store.state.product
    },
    ...mapGetters([
      'isLoading'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .prodWrapper {
    border: 1px solid #666;
    background-color: white;
    padding: 20px 30px;
    width: 100%;

    img {
      width: 100%;
    }

  }
</style>
