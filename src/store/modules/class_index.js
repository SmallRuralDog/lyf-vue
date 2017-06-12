import http from '../../api/http.js'
const state = {
  class_list: false,
}
const actions = {
  getClassIndexData(context, cb) {
    context.commit("UPDATE_CLASS_INDEX", {
      is_load: true
    })
    http.userGet('get_class_index', res => {
      context.commit('SET_CLASS_INDEX_DATA', res)
      $loading.hide();
      cb(res)
    }, error => {
      context.commit("UPDATE_CLASS_INDEX", {
        is_load: false,
      })
      $loading.hide();
      cb(error)
    })
  }
}
const mutations = {
  ['SET_CLASS_INDEX_DATA'](state, payload) {
    state.class_list = payload.data.data
    state.is_load = false;
  },
  ['UPDATE_CLASS_INDEX'](state, payload) {
    for (var key in payload) {
      state[key] = payload[key]
    }

  }
}
export default {
  state,
  actions,
  mutations
}
