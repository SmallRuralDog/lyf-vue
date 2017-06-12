import http from '../../api/http.js'

let list = []
let catLen=12
for (var i=0;i<catLen;i++){
    list.push({
        init   : false,
        //empty  : false,
        //more   : true,
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
    //grid_nav: [],
    //goods: [],
    page: 1,
    is_load: false,
    load_more: true,
    more_data: '--- 到底了 ---',
    list,
    active:0,
}
// actions
const actions = {
    getData(context, cb) {
        context.commit("UPDATE", {
            is_load: true
        })
        var gc=state.goods_class[state.active]
        var gc_id=0
        if(gc) gc_id=gc.gc_id
        http.userGet('index?page=' + state.page+'&gc_id='+gc_id, res => {
            context.commit('SET_DATA', res)
            $loading.hide();
            cb(res)
        }, error => {
            context.commit("UPDATE", {
                is_load: false,
                load_more: false,
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
        if (state.page == 1) {
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
        state.is_load = false;
    },
    ['UPDATE'](state, payload) {
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
