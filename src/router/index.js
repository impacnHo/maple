import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/v-index'
import ProductList from '../components/v-productList'
import ProductDetail from '../components/v-productDetail'
import Login from '../components/log/v-login'
import Logup from '../components/log/v-logup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/product/:typeName',
      name: 'viewByType',
      component: ProductList,
    },
    {
      path: '/product/p/:productNum',
      name: 'product',
      component: ProductDetail
    },
    {
      path: '/user/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user/logup',
      name: 'Logup',
      component: Logup
    }
  ]
})
