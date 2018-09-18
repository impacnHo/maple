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
    token: null, // 口令
    cartList: null, // 购物车列
    profile: null // 用户个人信息
    // sideBar: false
  },
  getters,
  mutations,
  actions
})
