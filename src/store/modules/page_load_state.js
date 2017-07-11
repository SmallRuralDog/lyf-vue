/**
页面是否加载过状态记录  在路由切换的时候获取状态  false的时候显示$loading 加载完成将状态设为true
主要是在页面比较大的时候使用 要不然在点击跳转的时候会有加载延迟不友好
*/
const state = {
  home: false,
  cart: false,
  discovery:false,
  class_all: false,
  user: false
}
const mutations = {
  ['UPDATE_PAGE_LOAD_STATE_DATA'](state, payload) {
    for (var key in payload) {
      state[key] = payload[key]
    }

  }
}
export default {
  state,
  mutations
}
