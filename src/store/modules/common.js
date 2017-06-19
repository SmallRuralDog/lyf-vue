const state = {
  cart_view_data_reload: false,
}
const mutations = {
  ['UPDATE_COMMON_DATA'](state, payload) {
    for (var key in payload) {
      state[key] = payload[key]
    }

  }
}
export default {
  state,
  mutations
}
