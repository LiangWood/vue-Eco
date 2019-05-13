<template>
  <div class="row">
    <loading :active.sync="isLoading"></loading>
    <div class="col-md-3">
      <!-- 左側選單 (List group) -->
      <catergory :category="category" @changeCategory="changeTab"/>
    </div>
    <div class="col-md-9">
      <div class="d-flex mb-4">
        <div class="row w-100">
          <div class="col-md-4 mb-4" v-for="item in filterItem" :key="item.id">
              <product :item="item" :prodCategory="prodCategory"/>
          </div>
        </div>
      </div>
      <!-- pagination -->
      <pagination :pageData="pagination" @changepage="getProducts" class="pb-3"></pagination>
    </div>
  </div>
</template>

<script>
import product from './mainProduct'
import catergory from './pages/catergory'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    product,
    catergory
  },
  data () {
    return {
      tempProduct: {},
      category: ['測試分類', '假鬼假怪', '干你屁事'],
      prodCategory: '',
      filterProd: []
    }
  },
  methods: {
    changeTab (item) {
      // console.log(item)
      this.prodCategory = item
    },
    ...mapActions(['getProducts'])
  },
  created () {
    this.getProducts()
  },
  computed: {
    filterItem () {
      this.filterProd = this.products
      this.filterProd = this.products.filter((item) => {
        if (this.prodCategory === '') {
          return this.filterProd
        } else {
          return item.category == this.prodCategory
        }
      })
      return this.filterProd
    },
    ...mapGetters([
      'isLoading',
      'products',
      'pagination'
    ])
  }
}
</script>
