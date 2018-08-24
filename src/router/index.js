import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'
import ProductList from '../components/v-productList'
import ProductDetail  from '../components/product/v-productDetail'

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
      component: ProductList
    },
    {
      path: '/product/:productNum',
      name: 'product',
      component: ProductDetail
    }
  ]
})
