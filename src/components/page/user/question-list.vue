<style lang="scss" scoped>

</style>

<template lang="html">

<div class="page">
   <div class="page-content">

     <ul class="aui-list aui-list-in">
       <li class="aui-list-item" @click="open_question(1)">
         <div class="aui-list-item-inner aui-list-item-arrow">
           我拍下后的产品什么时候发货？
         </div>
       </li>
       <li class="aui-list-item" @click="open_question(2)">
         <div class="aui-list-item-inner aui-list-item-arrow">
           已成团未发货如何退款？
         </div>
       </li>
       <li class="aui-list-item" @click="open_question(10)">
         <div class="aui-list-item-inner aui-list-item-arrow">
           没有收到货/商家发错地址了怎么办？
         </div>
       </li>
       <li class="aui-list-item" @click="open_question(6)">
         <div class="aui-list-item-inner aui-list-item-arrow">
           收到产品有问题怎么办？
         </div>
       </li>
       <li class="aui-list-item" @click="open_question(1)">
         <div class="aui-list-item-inner aui-list-item-arrow">
           如何联系商家客服？
         </div>
       </li>
       <li class="aui-list-item" @click="open_question(1)">
         <div class="aui-list-item-inner aui-list-item-arrow">
           为什么我的优惠券不能使用？
         </div>
       </li>
       <li class="aui-list-item" @click="open_question(1)">
         <div class="aui-list-item-inner aui-list-item-arrow">
           收到的产品能退换货么？
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
    open_question(id){
      this.$router.push({
        name:'question_detail',
        params:{
          id:id
        }
      })
    }


  }
}
</script>
