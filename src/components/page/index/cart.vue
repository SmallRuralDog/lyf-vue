<template lang="html">

<div class="page has-tabbar" >
    <cart-data></cart-data>
    <lyf-tab-bar :index="3"></lyf-tab-bar>
</div>

</template>

<script>
import LyfTabBar from '../../layout/lyf-tab-bar'
import CartData from '../../layout/cart-data'

export default {
  components: {
    LyfTabBar,
    CartData
  },
  mounted() {
    $loading.hide()
    this.$store.commit('UPDATE_PAGE_LOAD_STATE_DATA', {
      cart: true,
    })
  }
}
</script>
