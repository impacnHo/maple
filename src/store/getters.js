// 获取用户名
export const username = state => {
  return state.username
}

// 获取当前是否登录
export const loginStatus = state => {
  return state.loginState
}

// 获取当前购物车列表
export const cartList = state => {
  return state.cartList
}

// 获取购物车列表数
export const cartListSize = state => {
  return state.cartList.length
}

// 获取当前sideBar开光
// export const sideBarStatus = state => {
//   return state.sideBar
// }
