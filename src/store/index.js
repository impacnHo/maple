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
    orderRule: [
      { id: 0, name: '默认排序', icon: '', orderBy: null, sort: null, selected: true },
      { id: 1, name: '按价格升序', icon: 'arrow_upward', orderBy: 'price', sort: 'ASC', selected: false },
      { id: 2, name: '按价格降序', icon: 'arrow_downward', orderBy: 'price', sort: 'DESC', selected: false },
      { id: 3, name: '按时间升序', icon: 'arrow_upward', orderBy: 'lanch_date', sort: 'ASC', selected: false },
      { id: 4, name: '按时间降序', icon: 'arrow_downward', orderBy: 'lanch_date', sort: 'DESC', selected: false }
    ]
    // sideBarState: false // 侧导航栏状态
  },
  getters,
  mutations,
  actions
})
