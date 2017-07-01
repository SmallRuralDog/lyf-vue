<style lang="css">
  .refund-tip{
    background-color: forestgreen;
    color: #fff;
    text-align: center;
    padding:10px;;
  }


</style>

<template lang="html">

<div class="page">
    <div class="page-content">

      <div class="refund-tip" v-show="refund_applied"><i class="iconfont icon-xuanze"></i>&nbsp;卖家已同意退货<br>请上传退货快递单号</div>




      <ul class="aui-list hm-margin-b"  style="margin-bottom:10px;">
        <li class="aui-list-item aui-list-item-middle" @click='choose_reason()'>
          <div class="aui-list-item-inner ">
            <div><span class="color-theme">*</span>&nbsp;选择快递公司：{{reason}}</div>
            <i class="icon ion-ios-arrow-right" style="color: #DDD;"></i>
          </div>
        </li>
      </ul>

      <ul class="aui-list aui-form-list" style="margin-bottom:10px;">
        <li class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              <span class="color-theme">*</span>&nbsp;快递单号：
            </div>
            <div class="aui-list-item-input">
              <input type="tel" placeholder="" v-model="refund_amout">
            </div>
          </div>
        </li>
      </ul>








      <div style="padding: 10px;" v-show="!refund_applied">
        <div class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm" @click="refund">提交</div>
      </div>






    </div>
</div>

</template>

<script>
import "../../../assets/order-re.scss"
export default {
  name: "order_refund",
  data() {
    return {
      init:false,
      order_id: 0,
      goods_id: 0,
      type:'tuikuan',
      refund_amout:'',
      return_id:0,

      order: {
        "order_id": null,
        "order_type": null,
        "order_amount": "",
        "order_sn": "",
        "store_name": "",
        "store_id": null
      },
      goods: {
        "store_id": null,
        "order_goods_id": null,
        "goods_id": null,
        "goods_name": "",
        "goods_type": "",
        "goods_image": "",
        "goods_price": "",
        "goods_spec": "",
        "goods_num": null,
        "goods_pay_price": ""
      },
//      reason_list: [
//        {
//          "reason_id": 95,
//          "reason_info": "效果不好不喜欢"
//        },
//
//      ],
      reason:'',
      reason_id:0,
      refund_type:1,
      buyer_message:'000',
      refund_applied:true,

    }
  },
  mounted() {

  },
  methods: {

    choose_reason(){
      let title=this.type=='tuikuan'?'点击退款原因':'点击退货原因'
      $actionSheet.show({
          // 支持三种主题样式 ios/android/weixin
          theme: 'weixin',
          title: title,
          buttons: {
            // 操作列表选项文字及回调函数
            '效果不好不喜欢': () => {
                console.log('action 1 called.')
                this.reason='效果不好不喜欢'
                this.reason_id=95
            },
            '商品破损、有污渍': () => {
              console.log('action 2 called.')
              this.reason='商品破损、有污渍'
              this.reason_id=96
            },
            '保质期不符': () => {
              console.log('action 1 called.')
              this.reason='保质期不符'
              this.reason_id=97
            },
            '认为是假货': () => {
              console.log('action 1 called.')
              this.reason='认为是假货'
              this.reason_id=98
            },
            '不能按时发货': () => {
              console.log('action 1 called.')
              this.reason='不能按时发货'
              this.reason_id=99
            },

          },
          cancelText:'取消'

      })
    },
    refund(){
      if(this.reason_id==0){
        $toast.show('请选择退款原因',1500);
        return;
      }
      $loading.show('')
      this.$api.userAuthPost('refund_post',{
        order_id:this.order.order_id,
        order_goods_id:this.goods.order_goods_id,
        refund_amount:this.order.order_amount,
        goods_num:this.goods.goods_num,
        reason_id:this.reason_id,
        refund_pic:'',
        refund_type:this.refund_type,
        buyer_message:this.buyer_message,
      },res=>{
        $loading.hide()
        console.log(res)
        if(res.data.status_code==1){
//          this.refund_applied=true;
//          $toast.show('退款申请提交成功')

          $dialog.alert({
            // 效果
            theme: 'ios',
            // 标题
            title: '退款申请提交成功',

            // 按钮文本
            okText: '确定',
            // 按钮主题
            okTheme: 'assertive'
          }).then(()=>{
            this.$router.replace({name:'order_refund_list'})
          })



//          setTimeout(() => {
//            this.$router.replace({name:'order_refund_list'})
//          }, 2000)
        }else{
//          $toast.show('退款申请提交失败！',3000)
          $dialog.alert({
            // 效果
            theme: 'ios',
            // 标题
            title: '退款申请提交失败！',

            // 按钮文本
            okText: '确定',
            // 按钮主题
            okTheme: 'assertive'
          }).then(()=>{
            this.$router.go(-1)
          })
        }
      },err=>{
//        $loading.hide()
        console.log(err)
//        $toast.show(err.data.message,2000);
      })
    },
    getExpressData(return_id) {
      console.log('getExpressData() return_id=',return_id)
      this.$api.userAuthPost("return_ship",{
        return_id:parseInt(return_id)
      },res => {
        if(res.data.status_code==1){


        }
        console.log(res)

      },err => {

      })
    },
    return_ship_post(return_id){

    }

  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      vm.return_id = vm.$route.params.return_id
      console.log('vm.return_id=',vm.return_id)
//      vm.getExpressData(33)//vm.return_id

    })
  }
}
</script>
