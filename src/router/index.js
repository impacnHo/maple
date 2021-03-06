import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import Index from '../components/v-index'
import ProductList from '../components/product/v-productList'
import ProductDetail from '../components/product/v-productDetail'
import Login from '../components/auth/v-login'
import Logup from '../components/auth/v-logup'
import Profile from '../components/user/v-profile'
import AddressBook from '../components/user/v-addressBook'
import Password from '../components/user/v-password'
import CartList from '../components/user/v-cartList'
import Checkout from '../components/order/v-checkout'
import OrderList from '../components/order/v-orderList'
import OrderDetail from '../components/order/v-orderDetail'

import store from '../store/index'

Vue.use(Router)
Vue.use(Vuex)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/product/:typeName',
      name: 'viewByType',
      component: ProductList
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
    },
    {
      path: '/userInfo/password',
      name: 'Password',
      component: Password,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/user/cart',
      name: 'CartList',
      component: CartList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/user/checkout',
      name: 'Checkout',
      component: Checkout,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/order/',
      name: 'OrderList',
      component: OrderList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/order/:id',
      name: 'OrderDetail',
      component: OrderDetail,
      meta: {
        requireAuth: true
      }
    }
  ]
})

router.beforeEach(function (to, from, next) {
  if (to.meta.requireAuth && window.sessionStorage.getItem('access_token') === null) {
    return next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
  }
  next()
})

export default router
