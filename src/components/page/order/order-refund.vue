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
    <div class="page-content" v-show="init">

      <div class="refund-tip" v-show="refund_applied"><i class="iconfont icon-xuanze"></i>&nbsp;退款申请已提交</div>

      <div class="hm-flex" style="background: #fff;padding: 10px;">
        <div class="hm-flex-1"><img :src="goods.goods_image"></div>
        <div class="hm-flex-4 hm-flex" style="flex-direction: column;justify-content: space-between;padding-left: 10px">
          <div>{{goods.goods_name}}</div>
          <div>卖家：{{order.store_name}}</div>
          <div style="color: #ee2e3a;font-weight: 700;">
            <span>￥<b><big style="font-size:.48rem;">{{goods.goods_pay_price|price_yuan}}</big></b>{{goods.goods_pay_price|price_jiao}}</span>
          </div>
        </div>
      </div>
      <div class="aui-border-t  hm-margin-b" style="background-color: #fff;text-align: right;padding: 10px;">
        <span v-if="type=='tuikuan'">退款</span><span v-else>退货</span> 共{{goods.goods_num}}件商品 合计：￥<big>{{goods.goods_pay_price}}</big>

      </div>

      <template v-if="!refund_applied">
      <ul class="aui-list hm-margin-b"  style="margin-bottom:10px;">
        <li class="aui-list-item aui-list-item-middle" @click='choose_reason()'>
          <div class="aui-list-item-inner ">
            选择<template v-if="type=='tuikuan'">退款</template><template v-else>退货</template>原因：{{reason}}
            <i class="icon ion-ios-arrow-right" style="color: #DDD;"></i>
          </div>
        </li>
      </ul>

      <ul class="aui-list aui-form-list" style="margin-bottom:10px;">
        <li class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              退款金额(元)：
            </div>
            <div class="aui-list-item-input">
              <input type="tel" placeholder="" v-model="refund_amout">
            </div>
          </div>
        </li>
      </ul>

      </template>

      <ul v-else class="aui-list hm-margin-b"  style="margin-bottom:.8rem;">
        <li class="aui-list-item aui-list-item-middle">
          <div class="aui-list-item-inner ">
            <template v-if="type=='tuikuan'">退款</template><template v-else>退货</template>原因：{{reason}}
            <i class="icon ion-ios-arrow-right" style="color: #DDD;"></i>
          </div>
        </li>
      </ul>




      <div style="padding: 10px;" v-show="!refund_applied">
        <div class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm" @click="refund">申请<span v-if="type=='tuikuan'">退款</span><span v-else>退货</span></div>
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
      refund_applied:false,

    }
  },
  mounted() {
//    this.order_id = this.$route.params.order_id
//    this.goods_id = this.$route.params.goods_id
//    this.type=this.$route.query.type
//    this.getData()
  },
  methods: {
    getData() {
      this.$api.userAuthGet("refund_form?order_id=" + this.order_id + "&order_goods_id=" + this.goods_id, res => {
          this.order=res.data.data.order;
          this.goods=res.data.data.goods;
          this.init=true;

      }, error => {

      })
    },
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
          $toast.show('退款申请提交成功')
          this.$router.replace({name:'order_refund_list'})

//          setTimeout(() => {
//            this.$router.replace({name:'order_refund_list'})
//          }, 2000)
        }
      },err=>{
//        $loading.hide()
        console.log(err)
//        $toast.show(err.data.message,2000);
      })
    }

  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      vm.order_id = vm.$route.params.order_id
      vm.goods_id = vm.$route.params.goods_id
      vm.type=vm.$route.query.type
      vm.getData()
    })
  }
}
</script>
