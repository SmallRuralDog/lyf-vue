import Vue from 'vue'
import Vuex from 'vuex'


import home from './modules/home'
import class_index from './modules/class_index'
import actionsheet from './modules/actionsheet'
import common from './modules/common'


Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    home,
    class_index,
    actionsheet,
    common,
  },
  strict: debug
})
