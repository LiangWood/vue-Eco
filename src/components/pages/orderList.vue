<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="table-responsive">
        <table class="table table-hover mt-3">
            <thead class="table-becare">
                <tr class="text-nowrap">
                    <th width="160">下單時間</th>
                    <th width="80">訂購人資料</th>
                    <th width="200">購買品項</th>
                    <th>備註</th>
                    <th width="100">總金額</th>
                    <th width="100">是否付款</th>
                    <th width="130">操作</th>
                </tr>
            </thead>
            <tbody class="bg-white">
                <tr v-for="item in orders" :key="item.id">
                  <template>
                    <td>{{ item.create_at | timetamps }}</td>
                    <td>
                      <ul>
                        <li>{{ item.user.name }}</li>
                        <li>{{ item.user.email }}</li>
                        <li>{{ item.user.tel }}</li>
                        <li>{{ item.user.address }}</li>
                      </ul>
                    </td>
                    <td>
                      <ul>
                        <li v-for="prod in item.products" :key="prod.id">
                          <div class="text-nowrap">
                            {{prod.product.title}}<br>
                            {{prod.qty}} {{prod.product.unit}} -
                            <span class="text-main" v-if="prod.final_total >= prod.total">{{prod.final_total | currency}}</span>
                            <span class="text-danger" v-if="prod.final_total < prod.total">{{prod.final_total | currency}} ({{prod.coupon.couponName}})</span>
                          </div>
                        </li>
                      </ul>
                    </td>
                    <td>{{ item.message }}</td>
                    <td>{{ item.total | currency }}元</td>
                    <td>
                        <span v-if="item.is_paid" class="text-success font-weight-bold">已付款</span>
                        <span v-else :class="{'text-danger' : !item.is_paid}">未付款</span>
                    </td>
                    <td>
                        <button class="btn btn-outline-secondary btn-sm mr-1" @click="openModal(item)">編輯訂單</button>
                    </td>
                  </template>
                </tr>
            </tbody>
        </table>
      </div>

      <div
      class="modal fade"
      id="orderModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>修改訂單</span>
            </h5>
            <button
              type="button"
              class="close text-white"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <label class="h5">購買款項</label>
                <ul class="list-group">
                  <li
                    class="list-group-item"
                    v-for="item in tempOrder.products"
                    :key="item.id"
                  >
                    <div class="row no-gutters">
                      <div class="col-9">
                        <span>{{ item.product.title }}</span>
                      </div>
                      <div class="col-3">
                        <span>數量：{{ item.qty }}</span>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item form-inline">
                    <div class="form-group d-flex justify-content-end">
                      <label for="inputTotal">總計：</label>
                      <input
                        type="number"
                        class="form-control w-25"
                        id="inputTotal"
                        placeholder="請輸入金額"
                        min="0"
                        v-model.number="tempOrder.total"
                      />
                    </div>
                  </li>
                </ul>
              </div>
              <div class="form-group container mt-4">
                <label class="h5 mb-3" for="is_enabled">是否付款</label>
                <div class="form-check px-4">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="is_enabled"
                    v-model.number="tempOrder.is_paid"
                  />
                  <label class="form-check-label" for="is_enabled">
                    <span class="text-success" v-if="tempOrder.is_paid"
                      >已付款</span
                    >
                    <span class="text-danger" v-else>未付款</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer bg-dark">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="updateOrder">
              更新
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- pagination -->
    <pagination :pageData="pagination" @changepage="getOrders"></pagination>

  </div>
</template>

<script>
import $ from 'jquery'

export default {
  data () {
    return {
      isLoading: false,
      orders: [],
      tempOrder: {},
      orderId: '',
      pagination: {}
    }
  },
  methods: {
    openModal(item) {
      $("#orderModal").modal('show')
      this.tempOrder = item
      // console.log(this.tempOrder)
    },
    getOrders (page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/orders?page=${page}`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        console.log(res.data)
        this.orders = [...res.data.orders]
        this.pagination = res.data.pagination
        this.isLoading = false
      })
    },
    updateOrder () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/order/${this.tempOrder.id}`
      this.isLoading = true
      this.$http.put(api, { data:this.tempOrder })
        .then( res => {
          console.log(res)
          if(res.data.success) {
            $("#orderModal").modal('hide')
            this.isLoading = false
          }
        })
        .catch( err => {
          console.log(err)
          $("#orderModal").modal('hide')
          this.isLoading = false
        })
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
<style lang="scss" scoped>
  .table {
    td:nth-child(3) {
      padding: 5px;
    }
  }
  ul {
    .text-nowrap {
      color: green;
      padding-bottom: 5px;
      border-bottom: 1px dashed gray;
    }
  }
  .modal-footer {
    button {
      width: 120px;
    }
  }
</style>
