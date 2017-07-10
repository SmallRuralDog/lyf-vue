<style lang="scss" scoped>
  .aui-list .aui-list-item-media {
    width: 70px;
  }


</style>

<template lang="html">

<div class="page">
   <div class="page-content">

     <ul class="aui-list aui-media-list">
       <li class="aui-list-item aui-list-item-middle" @click="go_message(1)">
         <div class="aui-media-list-item-inner">
           <div class="aui-list-item-media">
             <img src="http://pic1.ipadown.com/imgs/20120611114618624.jpg" class="aui-img-round aui-list-img-sm">
           </div>
           <div class="aui-list-item-inner">
             <div class="aui-list-item-text">
               <div class="aui-list-item-title aui-font-size-14">老友粉官方</div>
               <div class="aui-list-item-right">08:00</div>
             </div>
             <div class="aui-list-item-text">
               欢迎光临老友粉商城
             </div>
           </div>
         </div>
       </li>
       <li class="aui-list-item aui-list-item-middle" @click="go_message(2)">
         <div class="aui-media-list-item-inner">
           <div class="aui-list-item-media">
             <img src="http://n1.itc.cn/img8/wb/smccloud/2015/03/27/142745821547154995.JPEG" class="aui-img-round aui-list-img-sm">
           </div>
           <div class="aui-list-item-inner">
             <div class="aui-list-item-text">
               <div class="aui-list-item-title aui-font-size-14">功夫熊猫</div>
               <div class="aui-list-item-right">08:00</div>
             </div>
             <div class="aui-list-item-text">
               hoho
             </div>
           </div>
         </div>
       </li>
     </ul>



    </div>
</div>

</template>

<script>

export default {
  name: "order_refund_list",
  data() {
    return {
      init:false,

    }
  },
  mounted() {

  },
  methods: {
    go_message(id) {
      $router.push({
        name: 'message_detail',
        params: {
          id: id
        }
      })
    },


  }
}
</script>
