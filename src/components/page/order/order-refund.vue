<style lang="css">



</style>

<template lang="html">

<div class="page">
    <div class="page-content">
      
    </div>
</div>

</template>

<script>
import "../../../assets/order-re.scss"
export default {
  name: "order_refund",
  data() {
    return {
      order_id: 0,
      goods_id: 0
    }
  },
  mounted() {
    this.order_id = this.$route.params.order_id
    this.goods_id = this.$route.params.goods_id

    this.getData()
  },
  methods: {
    getData() {
      this.$api.userAuthGet("refund_form?order_id=" + this.order_id + "&order_goods_id=" + this.goods_id, res => {

      }, error => {

      })
    }

  }
}
</script>
