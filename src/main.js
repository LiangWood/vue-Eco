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
import percentage from './filters/percentage'
import timetamps from './filters/timetamps'

import VeeValidate from 'vee-validate'
import zhTWValidate from 'vee-validate/dist/locale/zh_TW'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
axios.defaults.withCredentials = true

Vue.use(VeeValidate)
VeeValidate.Validator.localize('zh_TW', zhTWValidate)

// 全域啟動元件
Vue.component('Loading', Loading)
Vue.component('pagination', pagination)
Vue.filter('currency', currencyFilter)
Vue.filter('percentage', percentage)
Vue.filter('timetamps', timetamps)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  console.log(to, from, next)

  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then((res) => {
      // console.log(res.data)
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
