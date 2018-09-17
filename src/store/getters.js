// 获取用户名
export const username = state => {
  return state.username
}

// 获取当前是否登录
export const loginState = state => {
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

// 获取用户个人信息
export const profile = state => {
  return state.profile
}

// 获取当前sideBar开光
// export const sideBarStatus = state => {
//   return state.sideBar
// }
