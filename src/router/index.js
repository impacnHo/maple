import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'
import ProductList from '../components/v-productList'

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
    }
  ]
})
