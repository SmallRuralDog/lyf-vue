<style lang="scss" scoped>
  @import "../../../assets/config.scss";
  .yue-info{
    padding:25px 15px 35px ;
    background: $color-theme;
    color: #fff;

  }
.yue-number{
  font-size: 28px;
  padding-top: 10px;
}
  .yue-title{
    color: #888;
    font-size: 12px;
    padding:15px;
  }
</style>

<template lang="html">

<div class="page">
   <div class="page-content">

     <div class="yue-info hm-flex">
       <div class="hm-flex-4">
         当前余额
         <div class="yue-number">￥100.00</div>
       </div>
       <div class="hm-flex-1" style="display: flex;align-items: flex-end ;">
         <div class="aui-btn aui-btn-danger" style="background: #fff !important;color:red !important;width: 100%;">提现</div>
       </div>
     </div>

     <div class="yue-title">余额明细</div>


    </div>
</div>

</template>

<script>

export default {

  data() {
    return {
      init:false,

    }
  },
  mounted() {

  },
  methods: {



  }
}
</script>
