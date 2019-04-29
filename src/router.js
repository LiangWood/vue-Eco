import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/pages/login.vue'
import Products from './components/pages/products.vue'
import Dashboard from './components/Dashboard.vue'
import CustomOrder from './components/pages/CustomOrder.vue'
import coupon from './components/pages/coupon.vue'
import order from './components/pages/order.vue'
import orderList from './components/pages/orderList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'coupon',
          name: 'coupon',
          component: coupon,
          meta: { requiresAuth: true }
        },
        {
          path: 'products',
          name: 'products',
          component: Products,
          meta: { requiresAuth: true }
        },
        {
          path: 'orderlist',
          name: 'orderList',
          component: orderList,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'custom_order',
          name: 'custom_order',
          component: CustomOrder
        },
        {
            path: 'custom_order/:orderId',
            name: 'order',
            component: order
          }
      ]
    }
  ]
})
