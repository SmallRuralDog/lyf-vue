<template lang="html">

<div class="page has-tabbar" >
    <cart-data></cart-data>
    <!--<lyf-tab-bar :index="3"></lyf-tab-bar>-->
    <footnav :active="3"></footnav>
</div>

</template>

<script>
//import LyfTabBar from '../../layout/lyf-tab-bar'
import CartData from '../../layout/cart-data'
import footnav from '../../layout/footnav';

export default {
  components: {
//    LyfTabBar,
    CartData,
    footnav
  },
  mounted() {
    $loading.hide()
    this.$store.commit('UPDATE_PAGE_LOAD_STATE_DATA', {
      cart: true,
    })
  }
}
</script>
