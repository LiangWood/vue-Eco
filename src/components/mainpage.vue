<template>
  <div>
    <!-- headers -->
    <navbar />

    <!-- main body -->
    <div class="container main-contant mb-1">
      <div class="row">
        <div class="col-md-3">
          <!-- 左側選單 (List group) -->
          <catergory />
        </div>
        <div class="col-md-9">
          <product />
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
  data() {
    return {
    };
  },
  created() {
  }
};
</script>
