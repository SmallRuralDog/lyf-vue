<style lang="scss" scoped>

</style>

<template lang="html">

<div class="page">
   <div class="page-content">

     <ul class="aui-list aui-list-in" style="margin-top: 10px;">

       <li class="aui-list-item aui-list-item-arrow" @click="this.$router.push({name:'question_list'})">
         <div class="aui-list-item-label-icon">
           <i class="iconfont icon-tuikuan1"></i>
         </div>
         <div class="aui-list-item-inner">
           常见问题
         </div>
       </li>
       <li class="aui-list-item aui-list-item-arrow">
         <div class="aui-list-item-label-icon">
           <i class="iconfont icon-tuikuan1"></i>
         </div>
         <div class="aui-list-item-inner">
           服务协议
         </div>
       </li>
       <li class="aui-list-item aui-list-item-arrow">
         <div class="aui-list-item-label-icon">
           <i class="iconfont icon-tuikuan1"></i>
         </div>
         <div class="aui-list-item-inner">
           意见反馈
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



  }
}
</script>
