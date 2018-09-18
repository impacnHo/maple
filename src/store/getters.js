// 获取购物车列表数
export const cartListSize = state => {
  return state.cartList === null ? 0 : state.cartList.length
}

// 获取用户是否登录
export const loginState = state => {
  return state.username !== null
}

// 获取当前sideBar开光
// export const sideBarStatus = state => {
//   return state.sideBar
// }
