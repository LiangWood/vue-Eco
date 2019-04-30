<template>
  <div>
      <loading :active.sync="isLoading"></loading>
      <div class="d-flex mb-4">
              <!-- Search bar
              <form class="form-inline my-3 my-lg-0">
                <div class="input-group">
                  <input class="form-control" type="text" placeholder="Search" aria-label="Search">
                  <div class="input-group-btn">
                    <button class="btn btn-outline-warning" type="submit">
                      <i class="fa fa-search" aria-hidden="true"></i> Search
                    </button>
                  </div>
                </div>
              </form> -->
              <!-- 主要商品列表 (Card) -->
              <div class="row">
                <div class="col-md-4 mb-4" v-for="item in products" :key="item.id" :item="item">
                  <div class="card border-secondary shadow-sm">
                    <div class="card-img"
                    :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
                    <div class="card-body">
                      <span
                      class="badge float-right ml-2"
                      :class="{
                        'badge-secondary' : item.category=='測試分類',
                        'badge-warning' : item.category=='假鬼假怪',
                        'badge-primary' : item.category=='干你屁事',
                        }"
                      >{{ item.category }}</span>
                      <h5 class="card-title">
                        <a href="#" class="text-dark">{{ item.title }}</a>
                      </h5>
                      <p class="card-text">{{ item.description }}</p>
                      <div class="d-flex justify-content-between align-items-baseline">
                        <div class="h5" v-if="!item.price">{{ item.origin_price }}</div>
                        <del class="h6" v-if="item.price">原本 {{ item.origin_price }} </del>
                        <div class="h5" v-if="item.price">現在只要 {{ item.price }} </div>
                      </div>
                    </div>
                    <div class="card-footer d-flex">
                      <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">
                        查看更多
                      </button>
                      <button
                      type="button"
                      class="btn btn-outline-danger btn-sm ml-auto"
                      @click="addtoCart(item.id)">
                        加到購物車
                      </button>
                    </div>
                  </div>
                </div>
              </div>
      </div>
      <!-- pagination -->
      <pagination :pageData="pagination" @changepage="getProducts" class="pb-3"></pagination>

  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      products: [],
      tempProduct: {},
      pagination: {}
    }
  },
  methods: {
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/products?page=${page}`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        this.isLoading = false
        console.log(res.data)
        this.products = res.data.products
        this.pagination = res.data.pagination
      })
    }
  },
  created() {
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
.card {

  border-radius: 0;

  .card-text {
    height: 50px;
    max-height: 50px;
    color: #666;
  }
  .card-img {
    width: 100%;
    height: 150px;
    border-bottom: 1px solid #333;
    border-radius: 0;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }
}
</style>
