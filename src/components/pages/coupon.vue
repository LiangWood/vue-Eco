<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="mt-3 d-flex">
			<button class="btn btn-outline-success btn-sm d-flex align-items-center ml-auto" @click="openModal(true)">
			  <i class="fas fa-plus"></i>建立優惠券
			</button>
		</div>
    <div class="table-responsive">
        <table class="table table-hover mt-3">
            <thead class="table-becare">
                <tr class="text-nowrap">
                    <th>名稱</th>
                    <th>代碼</th>
                    <th width="100">折扣 % </th>
                    <th width="200">到期日</th>
                    <th width="100">是否啟用</th>
                    <th width="150">操作</th>
                </tr>
            </thead>
            <tbody class="bg-white">
                <tr v-for="item in coupons" :key="item.id">
                    <td>{{ item.couponName }}</td>
                    <td>{{ item.couponCode }}</td>
                    <td>{{ item.percent | percentage }}</td>
                    <td>{{ item.date }}</td>
                    <td>
                        <span v-if="item.is_enabled" class="text-success font-weight-bold">啟用</span>
                        <span v-else :class="{'text-danger' : !item.is_enabled}">未啟用</span>
                    </td>
                    <td>
                        <button class="btn btn-outline-secondary btn-sm mr-1" @click="openModal(false, item)">編輯</button>
                        <button class="btn btn-outline-danger btn-sm" @click="openDeleteModal(item)">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>
      </div>

        <!-- pagination -->
    <pagination :pageData="pagination" @changepage="getCoupons"></pagination>

    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="couponModal">
              <span>新增優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="couponName">優惠券名稱</label>
                  <input type="text" class="form-control" id="couponName"
                    v-model="tempCoupon.couponName"
                    placeholder="請輸入優惠券名稱">
                </div>
                  <div class="form-group">
                    <label for="couponCode">優惠代碼</label>
                    <input type="text" class="form-control" id="couponCode"
                      v-model="tempCoupon.couponCode"
                      placeholder="請輸入優惠代碼">
                  </div>
                  <div class="form-group">
                    <label for="date">到期日</label>
                    <input type="date" class="form-control" id="date"
                      v-model="tempCoupon.date"
                      placeholder="請選擇到期日">
                  </div>
                <div class="form-group">
                    <label for="percent">折扣百分比</label>
                    <input type="tel" class="form-control" id="percent"
                      v-model="tempCoupon.percent"
                      placeholder="請輸入折扣百分比">
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      v-model="tempCoupon.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
                </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon()">確認</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="deleteModal">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-secondary">{{ tempCoupon.couponName }}</strong> 優惠卷<span class="text-danger">(刪除後將無法恢復)</span>。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger"
              @click="deleteItem()"
              >確認刪除</button>
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
      coupons: [],
      pagination: {},
      tempCoupon: {},
      isNew: false,
      isLoading: false,
      status: {
        loading: false
      }
    }
  },
  methods: {
    getCoupons (page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/coupons?page=${page}`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        this.isLoading = false
        console.log(res.data)
        this.coupons = res.data.coupons
        this.pagination = res.data.pagination
      })
    },
    openModal (is_New, item) {
      if (is_New) {
        this.tempCoupon = {}
        this.isNew = true
      } else {
        this.tempCoupon = { ...item }
        this.isNew = false
      }
      $('#couponModal').modal('show')
    },
    openDeleteModal (item) {
      console.log(item)
      this.tempCoupon = item
      $('#deleteModal').modal('show')
    },
    deleteItem () {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/coupon/${this.tempCoupon.id}`
      this.isLoading = true
      this.$http.delete(api).then((res) => {
        console.log(res.data)
        if (res.data.success) {
          $('#deleteModal').modal('hide')
          this.isLoading = false
          this.getCoupons()
        } else {
          $('#deleteModal').modal('hide')
          this.isLoading = false
          this.getCoupons()
          console.log('刪除失敗')
        }
      })
    },
    updateCoupon () {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/coupon`
      let httpMethods = 'post'
      if (!this.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/coupon/${this.tempCoupon.id}`
        httpMethods = 'put'
      }
      this.$http[httpMethods](api, { data: this.tempCoupon }).then((res) => {
        console.log(res.data)
        if (res.data.success) {
          $('#couponModal').modal('hide')
          this.getCoupons()
        } else {
          $('#couponModal').modal('hide')
          this.$bus.$emit('message:push', res.data.message, 'danger')
          this.getCoupons()
          console.log('新增失敗')
        }
      })
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>
