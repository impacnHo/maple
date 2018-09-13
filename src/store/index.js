import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
Vue.use(Vuex)

export default new Vuex.Store({
  // 定义状态
  state: {
    username: null,
    loginState: false,
    token: null
    // sideBar: false
  },
  getters,
  mutations,
  actions
})
