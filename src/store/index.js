import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
Vue.use(Vuex)

export default new Vuex.Store({
  // 定义状态
  state: {
    username: null, // 用户名
    loginStatus: false, // 登录状态：true-已登录，false-未登录
    token: null, // 口令
    cartList: [] // 购物车列
    // sideBar: false
  },
  getters,
  mutations,
  actions
})
