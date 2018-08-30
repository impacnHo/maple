import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/v-index'
import ProductList from '../components/v-productList'
import ProductDetail from '../components/v-productDetail'
import Login from '../components/auth/v-login'
import Logup from '../components/auth/v-logup'
import Profile from '../components/user/v-profile'
import AddressBook from '../components/user/v-addressBook'

Vue.use(Router)

const router =  new Router({
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
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logup',
      name: 'Logup',
      component: Logup
    },
    {
      path: '/userInfo/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userConsignee/addressBook',
      name: 'AddressBook',
      component: AddressBook,
      meta: {
        requireAuth: true
      }
    }
  ],
})

router.beforeEach(function (to,from,next) {
  if(to.meta.requireAuth === true && to.path !== '/login' && to.path !== '/logup' && sessionStorage.getItem('access_token') == null) {
    return next('/login')
  }
  next()
})

export default router
