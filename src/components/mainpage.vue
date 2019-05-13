<template>
  <div>
    <!-- headers -->
    <navbar />

    <!-- jumbotron -->
    <div class="jumbotron" style="background-image: url(https://mdbootstrap.com/img/Photos/Others/gradient1.jpg);">
      <div class="text-white text-center py-5 px-4 my-5">
        <div>
          <h2 class="card-title h1-responsive pt-3 mb-5 font-bold"><strong>測試</strong></h2>
          <p class="mx-5 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, rerum commodi! Aut error, atque delectus iure temporibus
          </p>
        </div>
      </div>
    </div>

    <!-- main body -->
    <div class="container mainContent mb-1">
        <mainBody />
    </div>
    <alertMessage />
    <!-- footer -->
    <Footer />

  </div>
</template>

<script>
import navbar from './mainNavbar'
import Footer from './footer'
import mainBody from './mainBody'
import alertMessage from './AlertMessage'

export default {
  components: {
    alertMessage,
    navbar,
    mainBody,
    Footer
  }
}
</script>
