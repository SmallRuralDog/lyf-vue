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
        <!--<span v-if="type=='tuikuan'">退款</span><span v-else>退货</span> -->
        共{{goods.goods_num}}件商品 合计：￥<big>{{goods.goods_pay_price}}</big>

      </div>

      <ul  class="aui-list aui-media-list"  style="margin-bottom:.8rem;">
        <li class="aui-list-item aui-list-item-middle" @click="go_refund(order_id,goods_id,'tuikuan')">
          <div class="aui-media-list-item-inner">
            <div class="aui-list-item-media" style="width: 36px;">
              <i class="iconfont icon-ccgl-tuihuoyugao-7 color-theme" style="font-size: 24px;"></i>
            </div>
            <div class="aui-list-item-inner  aui-list-item-arrow">
              <div class="aui-list-item-text">
                <div class="aui-list-item-title">
                  仅退款
                </div>
              </div>
              <div class="aui-list-item-text">
                未收到货(包含未签收)，或卖家协商同意前提下
              </div>
            </div>
          </div>
        </li>

        <li class="aui-list-item aui-list-item-middle" @click="go_refund(order_id,goods_id,'tuihuo')">
          <div class="aui-media-list-item-inner">
            <div class="aui-list-item-media" style="width: 36px;">
              <i class="iconfont icon-tuihuo color-theme" style="font-size: 24px;"></i>
            </div>
            <div class="aui-list-item-inner  aui-list-item-arrow">
            <div class="aui-list-item-text">
              <div class="aui-list-item-title">
              退货退款
              </div>
            </div>
            <div class="aui-list-item-text">
              已收到货，需要退换已收到的货物
            </div>
            </div>
          </div>
        </li>
      </ul>



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


    go_refund(order_id, goods_id,type) {
      $router.push({
        name: "order_refund",
        params: {
          order_id: order_id,
          goods_id: goods_id
        },
        query:{
          type:type
        }
      });
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
