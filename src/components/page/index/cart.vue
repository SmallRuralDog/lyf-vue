<template lang="html">
<div class="page has-tabbar" >
    <cart-data></cart-data>
    <footnav :active="3"></footnav>
</div>
</template>
<script>
import CartData from '../../layout/cart-data'
import footnav from '../../layout/footnav';
export default {
  components: {
    CartData,
    footnav
  },
  mounted() {
    this.$store.commit('UPDATE_PAGE_LOAD_STATE_DATA', {
      cart: true,
    })
  }
}
</script>
