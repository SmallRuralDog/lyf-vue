let list = []
let catLen=12
for (var i=0;i<catLen;i++){
    list.push({
        init   : false,
        goods   : [],
        scroll:0,
        page: 1,
        is_load: false,
        load_more: true,
        more_data: '--- 到底了 ---',
    })
}

const state = {

  news_class: [],
  list,
  active:0,
  init_load:false

}

const mutations = {
  ['DISCOVERY_GETDATA_CALLBACK'](state, payload) {
    state.list[state.active].init =true
    if (state.list[state.active].page == 1) {
      state.list[state.active].order_list = payload.ret.data.data.data

    } else {
      state.list[state.active].page =payload.ret.data.data.current_page
      for (var i = 0; i < payload.ret.data.data.data.length; i++) {
        state.list[state.active].order_list.push(payload.ret.data.data.data[i]);
      }

    }
    if(payload.ret.data.data.current_page>=payload.ret.data.data.last_page){
      state.list[state.active].load_more = false;
    }else{
      state.list[state.active].load_more = true;
    }
    state.list[state.active].init = true;

    //state.list[state.active].is_load = false;
    //state.init_load = true;
  },
  ['DISCOVERY_UPDATE'](state, payload) {
    for (var key in payload) {
      state[key] = payload[key]
    }

  },
  ['DISCOVERY_UPDATE_LIST'](state, payload) {
    for (var key in payload) {
      state.list[state.active][key] = payload[key]
    }

  },

}
export default {
  state,
  mutations
}
