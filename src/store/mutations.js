// 更改用户登录状态
export const loginStatus = (state, user) => {
  if (user) {
    // 登录
    state.username = user.username
    state.token = user.token
    state.loginState = true
  } else {
    // 登出
    window.sessionStorage.removeItem('access_token') // or setItem('access_token', '')
    state.username = null
    state.loginState = false
    state.token = null
  }
}

// 更改侧导航栏的状态
// export const sideBarStatus = state => {
//   console.log('mutations: toggle，当前状态：' + state.sideBar)
//   state.sideBar = !state.sideBar

//   console.log('最终状态：' + state.sideBar)
// }
