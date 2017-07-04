<style lang="css">



</style>

<template lang="html">

<div class="page">
    <div class="page-content">
        
    </div>

    <footnav :active="1"></footnav>
</div>

</template>

<script>

import footnav from '../../layout/footnav';

export default {
    components: {
        footnav
    },
    data() {
        return {
            msg: 'cool',
            pr: 150,
            activity:[],
        }
    },
    mounted() {

        this.$store.commit('UPDATE_PAGE_LOAD_STATE_DATA', {
            new_arrivals: true,
        })

        this.getData()
    },
    methods:{
      getData(){
        this.$api.userGet("activity",res=>{
          if(res.data.status_code==1){
            this.activity = res.data.data
          }
          $loading.hide()
        },error=>{
          $loading.hide()
        })
      }
    }
}

</script>
