<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!-- headers -->
    <navbar />

    <!-- main body -->
    <div class="container main-contant mb-1">
      <div class="row">
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
    </div>

    <!-- footer -->
    <Footer />

  </div>
</template>

<script>
import navbar from './mainNavbar'
import Footer from './footer'
import product from './mainProduct'
import catergory from './pages/catergory'

export default {
  components: {
    navbar,
    product,
    catergory,
    Footer
  },
  data () {
    return {
      isLoading: false,
      products: [],
      tempProduct: {},
      pagination: {},
      category:['測試分類', '假鬼假怪', '干你屁事'],
      prodCategory:'',
      filterProd:[]
    }
  },
  methods: {
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/products?page=${page}`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        this.isLoading = false
        // console.log(res.data)
        this.products = res.data.products
        this.pagination = res.data.pagination
      })
    },
    changeTab(item) {
      // console.log(item)
      this.prodCategory = item
    }
 },
 created () {
  this.getProducts()
 },
 computed: {
   filterItem() {
    this.filterProd = this.products
    this.filterProd = this.products.filter((item)=>{
      if(this.prodCategory === '') {
        return this.filterProd
      } else {
       return item.category == this.prodCategory
      }
    })
    return this.filterProd
   }
 }
}
</script>
