// 更改用户登录状态
export const loginStatus = (state, user) => {
  if (user) {
    // 登录
    state.username = user.username
    state.token = user.token
    state.loginState = true
  } else {
    // 登出
    sessionStorage.removeItem('access_token') // or setItem('access_token', '')
    state.username = null
    state.loginState = false
    state.token = null
  }
}
