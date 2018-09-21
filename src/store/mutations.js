// 更改用户登录状态
export const updateLoginState = (state, user) => {
  if (user) {
    // 登录
    state.username = user.username
    state.token = user.token
  } else {
    // 登出
    window.sessionStorage.removeItem('username')
    window.sessionStorage.removeItem('access_token')
    state.username = null
    state.token = null
  }
}

// 更改购物车列表
export const updateCartList = (state, cartList) => {
  state.cartList = cartList
}

export const updateOrderRule = (state, id) => {
  for (let i = 0; i < state.orderRule.length; i++) {
    if (state.orderRule[i].id === id) {
      state.orderRule[i].selected = true
    } else {
      state.orderRule[i].selected = false
    }
  }
}
