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

// 更改商品列表排序规则
export const updateProductSortRule = (state, id) => {
  for (let i = 0; i < state.productSortRule.length; i++) {
    if (state.productSortRule[i].id === id) {
      state.productSortRule[i].selected = true
    } else {
      state.productSortRule[i].selected = false
    }
  }
}

// 更改查看订单列表状态
export const updateOrderViewRule = (state, id) => {
  for (let i = 0; i < state.orderViewRule.length; i++) {
    if (state.orderViewRule[i].id === id) {
      state.orderViewRule[i].selected = true
    } else {
      state.orderViewRule[i].selected = false
    }
  }
}
