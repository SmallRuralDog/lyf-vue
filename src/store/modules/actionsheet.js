
const state = {    
    showpicksheet :false,
    fisrtTimeOpenSheet:false,
    pin_id:null,
    pin_goodid:null

}

const mutations = {
    ['ACTIONSHEET_UPDATE'] (state,payload) {
        state[payload.key] = payload.value;
    },

    ['ACTIONSHEET_CLEAN'] (state){
        state.showpicksheet = false;
        // state.pin_id=null
      
    },


}

export default {
    state,
    mutations
}
