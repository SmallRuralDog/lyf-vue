import http from '../../api/http.js'

let list = []
let catLen=12
for (var i=0;i<catLen;i++){
    list.push({
        init   : false,
        goods   : [],///ok
        subclass:[],///
        scroll:0,
        page: 1,
        is_load: false,
        load_more: true,
        more_data: '--- 到底了 ---',
    })
}

const state = {
    swiper_data: [],
    goods_class: [],
    list,
    active:0,
    init_load:false
}

const actions = {
    getData(context, cb) {
        context.commit("UPDATE_LIST", {
            is_load: true
        })
        var gc=state.goods_class[state.active]
        //console.log(state.active,JSON.stringify(gc))
        var gc_id=0
        if(gc) gc_id=gc.gc_id
        var showpage=1
        var activelist=state.list[state.active]
        if(activelist) showpage=state.list[state.active].page
        http.userGet('index?page=' + showpage+'&gc_id='+gc_id, res => {
            context.commit('SET_DATA', res)
            $loading.hide();
            cb(res)
        }, error => {
            context.commit("UPDATE_LIST", {
                is_load: false,
                load_more: false,
                init_load:true,
                more_data: '--- 加载失败，点击重新加载 ---',
            })
            $loading.hide();
            cb(error)
        })
    }
}
const mutations = {
    ['SET_DATA'](state, payload) {
        state.list[state.active].init =true
        if (state.list[state.active].page == 1) {
            if(state.active==0){
              state.goods_class = payload.data.data.goods_class
              state.swiper_data = payload.data.data.slide.adv
            }else {
              state.list[state.active].subclass = payload.data.data.goods_class
            }
            state.list[state.active].goods = payload.data.data.goods_list.data
        } else {
            for (var i = 0; i < payload.data.data.goods_list.data.length; i++) {
                state.list[state.active].goods.push(payload.data.data.goods_list.data[i]);
            }
        }
        if (state.list[state.active].page >= payload.data.data.goods_list.last_page) {
            state.list[state.active].page = payload.data.data.goods_list.current_page
            state.list[state.active].load_more = false;
        }
        state.list[state.active].is_load = false;

        state.init_load = true;
    },
    ['UPDATE'](state, payload) {
        for (var key in payload) {
            state[key] = payload[key]
        }

    },
    ['UPDATE_LIST'](state, payload) {
        for (var key in payload) {
            state.list[state.active][key] = payload[key]
        }

    },
    ['UPDATE_HOME_LIST_SCROLL'](state, payload){
      state.list[payload.active].scroll = payload.scrol
    }
}
export default {
    state,
    actions,
    mutations
}
