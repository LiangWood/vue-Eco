import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap'

import App from './App.vue'
import router from './router'
import './bus'
import pagination from './components/pagination'
import currencyFilter from './filters/currency'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
axios.defaults.withCredentials = true

// 全域啟動元件
Vue.component('Loading', Loading)
Vue.component('pagination', pagination)
Vue.filter('currency', currencyFilter)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  console.log(to, from, next)

  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then((res) => {
      console.log(res.data)
      if (res.data.success) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
})
