// 应用mutations
export const updateLoginStatus = ({commit}, user) => {
  commit('loginStatus', user)
}
