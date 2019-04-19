import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/pages/login.vue'
import Products from './components/pages/products.vue'
import Dashboard from './components/Dashboard.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'login'
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'products',
          name: 'products',
          component: Products,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresAuth: true }
    }
  ]
})
