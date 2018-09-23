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
    productSortRule: [
      { id: 0, name: '默认排序', icon: '', orderBy: null, sort: null, selected: true },
      { id: 1, name: '按价格升序', icon: 'arrow_upward', orderBy: 'price', sort: 'ASC', selected: false },
      { id: 2, name: '按价格降序', icon: 'arrow_downward', orderBy: 'price', sort: 'DESC', selected: false },
      { id: 3, name: '按时间升序', icon: 'arrow_upward', orderBy: 'lanch_date', sort: 'ASC', selected: false },
      { id: 4, name: '按时间降序', icon: 'arrow_downward', orderBy: 'lanch_date', sort: 'DESC', selected: false }
    ], // 商品排列顺序
    orderViewRule: [
      { id: -1, name: '全部订单', selected: true },
      { id: 0, name: '待付款', selected: false },
      { id: 2, name: '待发货', selected: false },
      { id: 3, name: '已发货', selected: false },
      { id: 4, name: '待确认', selected: false },
      { id: 5, name: '交易完成', selected: false },
      { id: 1, name: '已取消', selected: false }
    ]

    // sideBarState: false // 侧导航栏状态
  },
  getters,
  mutations,
  actions
})
