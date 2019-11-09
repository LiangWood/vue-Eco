<template>
<div>
    <div class="container main-contant py-5">
      <h1 class="text-center mb-3 text-secondary">結帳</h1>
      <section class="form-row align-items-center text-center">
        <div class="col">
          <div class="alert alert-success alert-rounded mb-0" role="alert">
            1.輸入訂單資料
          </div>
        </div>
        <div class="col">
          <div class="alert alert-light alert-rounded mb-0" role="alert">
            2.金流付款
          </div>
        </div>
        <div class="col">
          <div class="alert alert-light alert-rounded mb-0" role="alert">
            3.完成
          </div>
        </div>
      </section>
      <section class="row justify-content-center mt-5">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header" id="headingOne">
              <h6 class="mb-0 d-flex align-items-center">
                <a data-toggle="collapse" href="#CartCollapse">
                  顯示購物車細節
                  <i class="fa fa-angle-down" aria-hidden="true"></i>
                </a>
                <span v-if="shopCart.total <= shopCart.final_total" class="h3 ml-auto mb-0">{{ shopCart.total }}</span>
                <span v-else class="h3 ml-auto mb-0">{{ shopCart.final_total }}</span>
              </h6>

            </div>
          </div>
          <div id="CartCollapse" class="collapse mt-3">
            <table class="table table-sm">
              <thead>
                <tr>
                  <th width="30"></th>
                  <th width="100"></th>
                  <th>商品名稱</th>
                  <th width="100">數量</th>
                  <th width="80">小計</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in carts" :key="item.id">
                  <td class="align-middle text-center">
                    <a @click="openModal(item.id)">
                      <i class="fas fa-trash" aria-hidden="true"></i>
                    </a>
                  </td>
                  <td class="align-middle">
                    <img
                    :src="item.product.imageUrl"
                    style="height:100px;width:150px;"
                    class="img-fluid img-thumbnail"
                    :alt="item.product.title">
                  </td>
                  <td class="align-middle">{{ item.product.title }}
                    <div class="text-success" v-if="item.coupon">
                      已套用優惠券
                    </div>
                  </td>
                  <td class="align-middle">{{ item.qty }}{{ item.product.unit }}</td>
                  <td class="align-middle text-right">{{ item.total }}</td>
                </tr>
                <tr>
                  <td colspan="4" class="text-right">合計</td>
                  <td class="text-right">
                    <strong>{{ shopCart.total | currency }}</strong>
                  </td>
                </tr>
                <tr v-if="shopCart.total > shopCart.final_total">
                  <td colspan="4" class="text-right text-success">折扣價</td>
                  <td class="text-right text-success">{{ shopCart.final_total }}</td>
                </tr>
              </tbody>
            </table>
          </div>

        <div class="input-group my-3 input-group-sm">
          <input type="text" class="form-control" v-model.trim="coupon_code" placeholder="請輸入優惠碼">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
              套用優惠碼
            </button>
          </div>
        </div>

          <h5 class="py-3 mt-5 mb-2 text-center bg-light">
            訂購人資訊
          </h5>
          <form @submit.prevent="createOrder">
            <div class="form-row">
              <div class="form-group col-md">
                <label for="username">姓名</label>
                <input
                id="username"
                name="name"
                type="text"
                class="form-control"
                placeholder="請輸入姓名"
                v-model.trim="form.user.name"
                v-validate="'required'"
                :class="{'is-invalid' : errors.has('name')}">
              <span class="text-danger" v-if="errors.has('name')">姓名為必填</span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md">
                <label for="email">Email</label>
                <input
                id="email"
                name="email"
                type="email"
                class="form-control"
                placeholder="請輸入Email"
                v-model.trim="form.user.email"
                v-validate="'required|email'"
                :class="{'is-invalid' : errors.has('email')}">
                <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md">
                <label for="tel">電話</label>
                <input
                id="tel"
                name="tel"
                type="text"
                class="form-control"
                placeholder="請輸入電話"
                v-model.trim="form.user.tel">
              </div>
            </div>
            <div class="form-group">
              <label for="inputAddress">地址</label>
              <input
              id="inputAddress"
              name="address"
              type="text"
              class="form-control"
              placeholder="請輸入地址"
              v-model.trim="form.user.address"
              v-validate="'required'"
              :class="{'is-invalid' : errors.has('address')}">
              <span class="text-danger" v-if="errors.has('address')">地址不能為空</span>
            </div>
            <div class="form-group">
              <label for="message">其他</label>
              <textarea class="form-control" name="message" id="message" rows="10" v-model.trim="form.user.message"></textarea>
            </div>
            <div class="text-right">
              <a href="/" class="btn btn-secondary mr-1">繼續選購</a>
              <button type="submit" class="btn btn-primary">確認付款</button>
            </div>
          </form>
        </div>
      </section>
    </div>

    <div class="modal fade" id="removeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">刪除商品</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>是否確認刪除商品</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">否</button>
            <button type="button" class="btn btn-outline-danger px-5" @click="deleteItem()">是</button>
          </div>
        </div>
      </div>
    </div>

</div>
</template>

<script>

import $ from 'jquery'

export default {
  data () {
    return {
      coupon_code: '',
      shopCart: {},
      carts: [],
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    getCart () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart`
      this.$http.get(api).then((res) => {
        console.log(res.data)
        this.shopCart = res.data.data
        this.carts = this.shopCart.carts
      })
    },
    openModal (id) {
      console.log(id)
      this.tempProductId = id;
      $('#removeModal').modal('show')
    },
    deleteItem () {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart/${this.tempProductId}`
      this.$http.delete(api).then((res) => {
        console.log(res.data)
        if (res.data.success) {
          $('#removeModal').modal('hide')
          this.getCart()
        } else {
          $('#removeModal').modal('hide')
          console.log('刪除失敗')
          this.getCart()
        }
      })
    },
    createOrder () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/order`
      const order = this.form
      this.$validator.validate().then(valid => {
        if (valid) {
          this.$http.post(api, { data: order }).then((res) => {
            if (res.data.success) {
              console.log('訂單已建立', res)
              this.$router.push(`/shoppingcartcheck/${res.data.orderId}`)
            }
          })
        } else {
          console.log('欄位不完整')
        }
      })
    },
    addCouponCode () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/coupon`
      const coupon = {
        couponCode: this.coupon_code
      }
      this.isLoading = true
      this.$http.post(api, { data: coupon }).then((res) => {
        console.log(res)
        this.isLoading = false
        this.couponCode = ''
        this.getCart()
      })
    }
  },
  created () {
    this.getCart()
  }
}
</script>

<style lang="scss" scoped>
 i {
   cursor: pointer;
 }
</style>