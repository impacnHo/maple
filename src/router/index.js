import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'
import ProductList from '../components/v-productList'
import ProductDetail from '../components/v-productDetail'
import Register from '../components/v-register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/:typeName',
      name: 'viewByType',
      component: ProductList,
    },
    {
      path: '/product/:productNum',
      name: 'product',
      component: ProductDetail
    },
    {
      path: '/user/register',
      name: 'register',
      component: Register
    }
  ]
})
