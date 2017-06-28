<style lang="css">



</style>

<template lang="html">

<div class="page">
    <div class="page-content">
    <div style="background: #fff;" v-for="item in data">
      <div class="aui-border-b hm-flex" style="padding: 10px;text-align: right;justify-content: space-between;">
        <div>订单号：{{item.order_sn}}</div>
        <div class="color-theme">{{item.seller_state}}</div>

      </div>
      <div class="hm-flex" style="background: #fff;padding: 10px;" v-for="itemg in item.goods_list">
        <div class="hm-flex-2"><img :src="itemg.goods_img"></div>
        <div class="hm-flex-5 hm-flex" style="flex-direction: column;justify-content: space-between;padding-left: 10px">
          <div>{{itemg.goods_name}}</div>
          <div>卖家：{{item.store_name}}</div>
          <!--<div style="color: #ee2e3a;font-weight: 700;">-->
            <!--<span>￥<b><big style="font-size:.48rem;">{{goods.goods_pay_price|price_yuan}}</big></b>{{goods.goods_pay_price|price_jiao}}</span>-->
          <!--</div>-->
        </div>
      </div>
      <div class="aui-border-t  hm-margin-b" style="background-color: #fff;text-align: right;padding: 10px;">
        退款 共x件商品 合计：￥<big>x</big>

      </div>
    </div>








    </div>
</div>

</template>

<script>
import "../../../assets/order-re.scss"
export default {
  name: "order_refund_list",
  data() {
    return {
      page:1,
      data:[{
        "refund_id": 27,
        "order_id": 107,
        "refund_amount": "0.01",
        "refund_sn": "206101170628164801",
        "order_sn": "9000000000010901",
        "add_time": "2017-06-28 16:48:01",
        "seller_state_v": 1,
        "seller_state": "等待审核",
        "admin_state_v": 1,
        "admin_state": "无",
        "store_id": 1,
        "store_name": "老友粉",
        "goods_list": [
          {
            "goods_id": 1119,
            "goods_name": "测试产品 黑色 S",
            "goods_spec": "",
            "goods_img": "http://lyfimg.gxlyf.cn/goods_image/mJyCpvciU4Kjag7arRUtUCJPXYiUD72NWpXwSZ1p.jpeg!240x240"
          }
        ]
      }],


//      order_id: 0,
//      goods_id: 0,
//
//      order: {
//        "order_id": 107,
//        "order_type": null,
//        "order_amount": "0.02",
//        "order_sn": "9000000000010901",
//        "store_name": "老友粉",
//        "store_id": 1
//      },
//      goods: {
//        "store_id": 1,
//        "order_goods_id": 128,
//        "goods_id": 1119,
//        "goods_name": "测试产品 黑色 S",
//        "goods_type": "",
//        "goods_image": "http://lyfimg.gxlyf.cn/goods_image/mJyCpvciU4Kjag7arRUtUCJPXYiUD72NWpXwSZ1p.jpeg!240x240",
//        "goods_price": "0.01",
//        "goods_spec": "N;",
//        "goods_num": 1,
//        "goods_pay_price": "0.01"
//      },
//
//      reason:'',
//      reason_id:'',
//      refund_type:1,
//      buyer_message:'000'



    }
  },
  mounted() {

    this.getData()
  },
  methods: {
    getData() {
      this.$api.userAuthGet("get_refund_list?page=" + this.page , res => {
//          this.order=res.data.data.order;
//          this.goods=res.data.data.goods;
        console.log(res)

      }, error => {

      })
    },



  }
}
</script>
