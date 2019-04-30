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
                            <span class="text-danger" v-if="prod.final_total < prod.total">{{prod.final_total | currency}} ({{prod.coupon.title}})</span>
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
                        <button class="btn btn-outline-secondary btn-sm mr-1" @click="openModal(false, item)">編輯</button>
                        <button class="btn btn-outline-danger btn-sm" @click="openDeleteModal(item)">刪除</button>
                    </td>
                  </template>
                </tr>
            </tbody>
        </table>
      </div>
    <!-- pagination -->
    <pagination :pageData="pagination" @changepage="getOrders"></pagination>

  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      orders: [],
      tempOrders: {},
      orderId: '',
      pagination: {}
    }
  },
  methods: {
    getOrders(page=1) {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/orders?page=${page}`
        this.isLoading = true
        this.$http.get(api).then((res) => {
            console.log(res.data)
            this.orders = res.data.orders
            this.pagination = res.data.pagination
            this.isLoading = false
        })
    }
  },
  created() {
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
</style>
