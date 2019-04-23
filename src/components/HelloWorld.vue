<template>
  <div class="hello">
    <div>
      <a href="#" class="btn btn-primary" @click.prevent="logout()">登出</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    logout () {
      const api = `${process.env.VUE_APP_APIPATH}/logout`
      this.$http.post(api).then((res) => {
        console.log(res.data)
        if (res.data.success) {
          this.$router.push('/login')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
