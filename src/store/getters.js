// 获取购物车列表数
export const cartListSize = state => {
  return state.cartList === null ? 0 : state.cartList.length
}

// 获取用户是否登录
export const loginState = state => {
  return state.username !== null
}

// 获取侧导航栏状态
export const getSideBarState = state => {
  return state.sideBarState
}

// 获取当前排序规则
export const getCurrentProductSortRule = state => {
  return state.productSortRule.filter(item => item.selected === true)
}

// 获取其他排序规则
export const getOtherProductSortRule = state => {
  return state.productSortRule.filter(item => item.selected === false)
}

// 获取当前订单查看状态
export const getCurrentOrderViewRule = state => {
  return state.orderViewRule.filter(item => item.selected === true)
}

// 获取当前sideBar开光
// export const sideBarStatus = state => {
//   return state.sideBar
// }
