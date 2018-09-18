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

// 修改个人信息
export const updateProfile = (state, profile) => {
  state.profile = profile
}

// 更改侧导航栏的状态
// export const sideBarStatus = state => {
//   console.log('mutations: toggle，当前状态：' + state.sideBar)
//   state.sideBar = !state.sideBar

//   console.log('最终状态：' + state.sideBar)
// }
