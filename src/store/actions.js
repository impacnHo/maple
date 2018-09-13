// 应用mutations
export const updateLoginStatus = ({ commit }, user) => {
  commit('loginStatus', user)
}

// export const toggleSideBarStatus = ({ commit }) => {
//   console.log('actions: toggle')
//   commit('sideBarStatus')
// }
