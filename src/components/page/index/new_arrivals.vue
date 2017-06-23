<template lang="html">
<div class="page">
  <div class="page-content">

    {{msg|capitalize}}<br>
    {{pr|price_yuan}}{{pr|price_jiao}}

    <!--<div v-text="pr|price"></div>-->

  </div>
  <!--<lyf-tab-bar :index="1"></lyf-tab-bar>-->
  <footnav :active="1"></footnav>
</div>
</template>

<script>
//import LyfTabBar from '../../layout/lyf-tab-bar';
import footnav from '../../layout/footnav';

export default {
  components: {
//    LyfTabBar,
    footnav
  },
  data(){
    return{
      msg:'cool',
      pr:150,
    }
  },
  mounted(){
    $loading.hide()
    this.$store.commit('UPDATE_PAGE_LOAD_STATE_DATA', {
      new_arrivals: true,
    })
  },
}
</script>

<style lang="css">
</style>
