<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <router-link class="navbar-brand p-2 border-0" to="/">前台測試</router-link>
      <!-- 購物車內的數量 (Button 內包含 icon, 數量 badge) -->
      <div class="dropdown ml-auto">
        <button
        class="btn btn-sm btn-cart"
        @click.prevent="isActive=!isActive">
          <i class="fa fa-shopping-cart text-dark fa-2x" aria-hidden="true"></i>
          <span class="badge badge-pill badge-danger" v-if="shopCart.carts && shopCart.carts.length != 0">
            {{ shopCart.carts.length }}
          </span>
          <span class="sr-only">unread messages</span>
        </button>
        <div
          class="dropdown-menu dropdown-menu-right p-3"
          :class="{'show' : isActive}"
          style="min-width: 300px"
        >
          <h6>已選擇商品</h6>
          <table class="table table-sm">
            <tbody>
              <tr v-for="item in shopCart.carts" :key="item.id">
                <td class="align-middle text-center">
                  <button type="button" class="btn btn-danger btn-sm" @click="removeCartItem(item.id)">
                    <i class="fas fa-trash-alt" aria-hidden="true"></i>
                  </button>
                </td>
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">{{ item.qty }} {{ item.product.unit }}</td>
                <td class="align-middle text-right">{{ item.total | currency }}</td>
              </tr>
            </tbody>
          </table>
          <div class="total-price mb-3 text-primary">總計：{{ shopCart.total }} 元</div>
          <a href="#" class="btn btn-info btn-block" @click.prevent="shoppingCartCheck()">
            <i class="fa fa-cart-plus" aria-hidden="true"></i> 前往結帳
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isActive: false,
      shopCart: {}
    }
  },
  methods: {
    getCart () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart`
      this.$http.get(api).then((res) => {
        console.log(res.data)
        this.shopCart = res.data.data
      })
    },
    removeCartItem (id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart/${id}`
      this.isLoading = true
      this.$http.delete(api).then(() => {
        // console.log(res.data)
        this.$bus.$emit('shopCart:update')
        this.isLoading = false
      })
    },
    shoppingCartCheck () {
      let cartItem = this.shopCart

      if (cartItem.carts == '') {
        alert(`購物車沒有東西，請前往購物`)
      } else {
        this.$router.push(`/shoppingcartcheck`)
      }
    }
  },
  created () {
    this.getCart()
    this.$bus.$on('shopCart:update', () => {
      this.getCart()
    })
  }
}
</script>

<style lang="scss" scoped>
.btn:focus {
  box-shadow: none;
}
</style>
