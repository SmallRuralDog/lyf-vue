<style lang="css">



</style>

<template lang="html">

<div class="page">
    <div class="page-content">
        <div class="order-manage detail" v-if="page_show">
            <div class="order">
                <ul class="order-list">
                    <li>

                        <div class="module status">
                            <div class="seller-state  " style="background: #ff7e00;">
                                <div class="state-cont">
                                    <p class="h">{{order_info.order_text}} </p>
                                </div>
                            </div>
                        </div>

                        <div class="module logisticsholder" v-if="false">
                            <div class="o-t-contmsg express">
                                <div class="ico"><span class="ion-planet"></span></div>
                                <div class="cont">
                                    <h5> <div>[南宁市]【已签收，签收人是拍照签收】，感谢使用百世快递，期待再次为您服务</div> <div></div> </h5>
                                    <div class="subtime">2017-05-17 10:00:53</div>
                                </div>
                                <div class="arrow">
                                    <p><span class="icon-right"></span></p>
                                </div>
                            </div>
                        </div>

                        <div class="module address">
                            <div class="o-t-contmsg">
                                <div class="ico"><span class="ion-location"></span></div>
                                <div class="cont">
                                    <h5 class=""> <div>收货人：{{order_info.reciver_name}}</div> <div>{{order_info.reciver_phone}}</div> </h5>
                                    <div class="submsg">收货地址：{{order_info.reciver_addr}} </div>
                                </div>
                            </div>
                        </div>

                        <div class="module seller">
                            <div class="o-t-title-shop">
                                <div class="tcont">
                                    <div class="ico"><img :src="order_info.store_info.store_avatar"></div>
                                    <div class="contact">
                                        <a>
                                            <p class="title">{{order_info.store_info.store_name}}</p>
                                            <p class="arrow" style="margin-left:.13rem;"><span class="ion-chevron-right"></span></p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="module o_item">
                            <div class="item-list o-t-item" v-for="goods in order_info.order_goods">
                                <div class="item-img">
                                    <p> <img class="" v-lazy="goods.image_url" data-src-checked="true"> </p>
                                </div>
                                <div class="item-info">
                                    <h3 class="title">{{goods.goods_name}}</h3>
                                    <p class="sku">{{goods.goods_spec}}</p>
                                </div>
                                <div class="item-pay">
                                    <div class="item-pay-data">
                                        <p class="price">￥{{goods.goods_price}}</p>
                                        <p class="price"> <del class="">￥{{goods.goods_marketprice}}</del> </p>
                                        <p class="nums">x{{goods.goods_num}}</p>
                                    </div>
                                    <div class="item-pay-btn">
                                      <a class="h" v-if="order_info.order_state==20" @click="go_refund(order_info.order_id,goods.goods_id)"> 退款 </a>
                                      <a class="h" v-if="order_info.order_state==30"> 退货 </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="module  paydetail">
                            <div class="order-price-freight">
                                <dl> <dt>运费</dt>
                                    <dd>￥{{order_info.shipping_fee}}</dd>
                                </dl>
                                <dl> <dt>实付款（含运费）</dt>
                                    <dd class="h">￥{{order_info.real_pay_amount}}</dd>
                                </dl>
                            </div>
                        </div>

                        <div class="module  talkseller" v-if="false">
                            <div class="order-tablink o-t-tablink">
                                <div class="cont ww" data-nick="">
                                    <p><span class="ico ion-chatbubbles"></span></p>
                                    <p><span>联系卖家</span></p>
                                </div>
                                <a class="cont phone" href="tel:">
                                    <p><span class="ico ion-ipad"></span></p>
                                    <p><span>卖家电话</span></p>
                                </a>
                            </div>
                        </div>

                        <div class="module  orderinfo">
                            <div class="order-box order-message">
                                <p class="">订单编号：{{order_info.order_sn}}</p>
                                <p class="">交易号：{{order_info.order_pay.pay_sn}}</p>
                                <p class="">创建时间：{{order_info.add_time}}</p>
                                <p class="" v-if="order_info.payment_time != ''">付款时间：{{order_info.payment_time}}</p>
                                <p class="" v-if="order_info.finnshed_time != ''">收货时间：{{order_info.finnshed_time}}</p>
                            </div>
                        </div>

                        <div class="module orderop">
                            <div class="o-tab-btn">
                              <ul>
                                  <li class="h" v-if="order_info.order_state==30" @click="order_receive(order_info.order_id)"> 确认收货 </li>
                                  <li class="h" v-if="order_info.order_state==40" @click="$router.push({name:'order_rate',params:{order_id:order_info.order_id}})"> 评价订单 </li>
                                  <li class="" v-if="order_info.order_state==30 || order_info.order_state==40" @click="$router.push({name:'order_logistics',params:{order_id:order_info.order_id}})"> 查看物流 </li>
                                  <!--li class="h" v-if="order.order_state==10"> 立即付款 </li-->
                                  <li class="" v-if="order_info.order_state==10" @click="order_cancel(order_info.order_id)"> 取消订单 </li>
                                  <li class="" v-if="order_info.order_state==0"> 删除订单 </li>

                              </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import "../../../assets/order.scss"
export default {
  name: "order_detail",
  data() {
    return {
      order_info: [],
      order_id: 63,
      page_show: false
    }
  },
  mounted() {
    this.order_id = this.$route.params.order_id
    $loading.show()
    this.getData()
  },
  methods: {
    getData() {
      this.$api.userAuthGet("order_info?order_id=" + this.order_id, res => {
        if (res.data.status_code == 1) {
          this.order_info = res.data.data

          this.page_show = true
        }
        $loading.hide()
      }, error => {
        $loading.hide()
      })
    },
    go_refund(order_id, goods_id) {
      $router.push({
        name: "order_refund",
        params: {
          order_id: order_id,
          goods_id: goods_id
        }
      });
    }
  }
}
</script>
