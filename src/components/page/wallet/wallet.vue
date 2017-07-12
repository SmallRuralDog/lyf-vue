<style lang="scss" scoped>
  .my-money-wrapper{
    display: flex;
    justify-content: space-between;
    align-items:center;
  }
.my-money{
  font-size: 30px;
  /*font-weight:bold;*/
}

  .forbid{
    font-size: 12px;
    color: #999;
  }
</style>

<template lang="html">

<div class="page">
   <div class="page-content">

     <ul class="aui-list" style="margin-top: 10px;">
       <div style="font-size: 13px;color: #666;padding: 10px 10px 2px;">我的余额</div>
       <li class="aui-list-item aui-list-item-arrow" @click="this.$router.push({name:'my_money'})">

         <div class="aui-list-item-inner">
           <div style="padding: 10px 0;width: 100%;">

             <div class="my-money-wrapper">
              <div class="color-theme"><i class="iconfont icon-tuikuan1" style="font-size: 30px;margin-right: 10px;"></i> <span style="font-size: 20px;">￥</span><span class="my-money">120.0</span></div>
              <div class="forbid">不可提现</div>
             </div>
             </div>
         </div>
       </li>
     </ul>
     <ul class="aui-list" style="margin-top: 10px;">
       <li class="aui-list-item aui-list-item-arrow" @click="go_transaction_list(0)">
         <div class="aui-list-item-label-icon">
           <i class="iconfont icon-tuikuan1"></i>
         </div>
         <div class="aui-list-item-inner">
           交易明细
         </div>
       </li>
     </ul>
     <ul class="aui-list" style="margin-top: 10px;">
       <li class="aui-list-item aui-list-item-arrow" @click="this.$router.push({name:'question_list'})">
         <div class="aui-list-item-label-icon">
           <i class="iconfont icon-tuikuan1"></i>
         </div>
         <div class="aui-list-item-inner">
           支付设置
         </div>
       </li>
     </ul>


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
    go_transaction_list(id) {
      $router.push({
        name: 'transaction_list',
        params: {
          id: id
        }
      })
    },


  }
}
</script>
