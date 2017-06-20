const state = {
  cart_view_data_reload: false,
  cat_goods_list_class_id: 0,
  cat_goods_list_class_init_menu: false,
  cat_goods_list_class_active: 0,
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
