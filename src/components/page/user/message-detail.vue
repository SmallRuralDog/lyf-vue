<template lang="html">
<div class="page">
   <div class="page-content">

     <section class="aui-chat" style="margin-bottom: 40px;">
       <div class="aui-chat-header">2017年7月10日</div>
       <div class="aui-chat-item aui-chat-left">
         <div class="aui-chat-media">
           <img src="http://pic1.ipadown.com/imgs/20120611114618624.jpg" />
         </div>
         <div class="aui-chat-inner">
           <div class="aui-chat-name">AUI</div>
           <div class="aui-chat-content">
             <div class="aui-chat-arrow"></div>
             Hello AUI 2.0!
           </div>
           <div class="aui-chat-status aui-chat-status-refresh">
             <i class="aui-iconfont aui-icon-correct aui-text-success"></i>
           </div>
         </div>
       </div>
       <div class="aui-chat-item aui-chat-right">
         <div class="aui-chat-media">
           <img src="http://n1.itc.cn/img8/wb/smccloud/2015/03/27/142745821547154995.JPEG" />
         </div>
         <div class="aui-chat-inner">
           <div class="aui-chat-name">流浪男</div>
           <div class="aui-chat-content">
             <div class="aui-chat-arrow"></div>
             你好！
           </div>
           <div class="aui-chat-status">
             <i class="aui-iconfont aui-icon-info aui-text-danger"></i>
           </div>
         </div>
       </div>
       <div class="aui-chat-item aui-chat-left">
         <div class="aui-chat-media">
           <img src="http://pic1.ipadown.com/imgs/20120611114618624.jpg" />
         </div>
         <div class="aui-chat-inner">
           <div class="aui-chat-name">AUI</div>
           <div class="aui-chat-content">
             <div class="aui-chat-arrow"></div>
             老友推荐，放心购买
           </div>
         </div>
       </div>
       <div class="aui-chat-item aui-chat-right">
         <div class="aui-chat-media">
           <img src="http://n1.itc.cn/img8/wb/smccloud/2015/03/27/142745821547154995.JPEG" />
         </div>
         <div class="aui-chat-inner">
           <div class="aui-chat-name">流浪男</div>
           <div class="aui-chat-content">
             <div class="aui-chat-arrow"></div>
             以前拍摄的牛背山星空
           </div>
         </div>
       </div>
       <div class="aui-chat-item aui-chat-left">
         <div class="aui-chat-media">
           <img src="http://pic1.ipadown.com/imgs/20120611114618624.jpg" />
         </div>
         <div class="aui-chat-inner">
           <div class="aui-chat-name">AUI</div>
           <div class="aui-chat-content">
             <div class="aui-chat-arrow"></div>
             <img src="http://pic1.ipadown.com/imgs/20120611114618624.jpg" />
           </div>
         </div>
       </div>

     </section>

     <div class="hm-flex msg-input" style="border-top: 1px #ddd solid;">
       <div class="hm-flex-3">
         <von-input
           type="text"
           v-model="text"
           placeholder="请输入"
         >
         </von-input>
       </div>
       <div class="hm-flex-1 send-btn">
           发送
       </div>
     </div>



    </div>
</div>

</template>

<script>

export default {
  data() {
    return {
      init:false,
      text:'',

    }
  },
  mounted() {

  },
  methods: {



  }
}
</script>
<style lang="scss" scoped>
  @import "../../../assets/config.scss";
  .msg-input{
    position: fixed;
    bottom:0;
    left:0;
    width:100%;
  }
  .send-btn{
    background: #4A90E2;color:#fff;display: flex;justify-content: center;align-items: center;
    font-size: 15px;

  }
  .hairline-top:before {
    content: '';
    position: absolute;
    background-color: #ddd;
    display: block;
    left: 0;
    top: 0;
    bottom: auto;
    right: auto;
    height: 0px;
  }
  .hairline-bottom:after {
    content: '';
    position: absolute;
    background-color: #ddd;
    display: block;
    left: 0;
    top: atuo;
    bottom: 0;
    right: auto;
    height: 0px;
  }

  /*聊天气泡*/
  .aui-chat {
    width: 100%;
    height: 100%;
    padding: 10px;
  }
  .aui-chat .aui-chat-item {
    position: relative;
    width: 100%;
    margin-bottom: 15px;
    overflow: hidden;
    display: block;
  }
  .aui-chat .aui-chat-header {
    width: 100%;
    text-align: center;
    margin-bottom: 15px;
    font-size: 12px;
    color: #757575;
  }
  .aui-chat .aui-chat-left {
    float: left;
  }
  .aui-chat .aui-chat-right {
    float: right;
  }
  .aui-chat .aui-chat-media {
    display: inline-block;
    max-width: 40px;
  }
  .aui-chat .aui-chat-media img {
    width: 100%;
    border-radius: 50%;
  }
  .aui-chat .aui-chat-inner {
    position: relative;
    overflow: hidden;
    display: inherit;
  }
  .aui-chat .aui-chat-arrow {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    top: 4px;
    -webkit-transform-origin: 50% 50% 0;
    transform-origin: 50% 50% 0;
    background-color: transparent;
  }
  /*.aui-chat .aui-chat-left .aui-chat-arrow {*/
    /*background-image: -webkit-linear-gradient(45deg, #b3e5fc, #b3e5fc 50%, transparent 50%);*/
    /*background-image: linear-gradient(45deg, #b3e5fc, #b3e5fc 50%, transparent 50%);*/
    /*-webkit-transform: rotate(45deg);*/
    /*transform: rotate(45deg);*/
    /*left: -5px;*/
  /*}*/
  /*.aui-chat .aui-chat-right .aui-chat-arrow {*/
    /*background-image: -webkit-linear-gradient(45deg, #ffffff, #ffffff 50%, transparent 50%);*/
    /*background-image: linear-gradient(45deg, #ffffff, #ffffff 50%, transparent 50%);*/
    /*-webkit-transform: rotate(-135deg);*/
    /*transform: rotate(-135deg);*/
    /*right: -5px;*/
  /*}*/
  .aui-chat .aui-chat-content {
    color: #212121;
    font-size: 14px;
    border-radius: 4px;
    min-height: 40px;
    position: relative;
    padding: 10px;
    max-width: 80%;
    word-break: break-all;
    word-wrap: break-word;
  }
  .aui-chat .aui-chat-content img {
    max-width: 100%;
    display: block;
  }
  .aui-chat .aui-chat-status {
    position: relative;
    width: 40px;
    height: 40px;
    line-height:40px;
    text-align: center;
  }
  .aui-chat .aui-chat-name {
    width: 100%;
    position: relative;
    font-size: 12px;
    color: #757575;
    margin-bottom:5px;
  }
  .aui-chat .aui-chat-left .aui-chat-name {
    left: 10px;
  }
  .aui-chat .aui-chat-left .aui-chat-status {
    left: 10px;
    float: left;
  }
  .aui-chat .aui-chat-left .aui-chat-media {
    width: 40px;
    float: left;
  }
  .aui-chat .aui-chat-left .aui-chat-inner {
    max-width: 70%;
  }
  .aui-chat .aui-chat-left .aui-chat-content{
    background-color: #b3e5fc;
    float: left;
    left: 10px;
  }
  .aui-chat .aui-chat-right .aui-chat-media {
    width:40px;
    float: right;
  }
  .aui-chat .aui-chat-right .aui-chat-inner {
    float: right;
    max-width: 70%;
  }
  .aui-chat .aui-chat-right .aui-chat-name {
    float: right;
    right: 10px;
    text-align: right;
  }
  .aui-chat .aui-chat-right .aui-chat-content {
    background-color: #ffffff;
    right: 10px;
    float: right;
  }
  .aui-chat .aui-chat-right .aui-chat-status {
    float: right;
    right: 10px;
  }

</style>
