<style lang="css">



</style>

<template lang="html">

<div class="page">
    <div class="page-content" v-if="page_show" style="margin-bottom:1.33rem">
        <div id="confirmOrder_1" class="order-confirmOrder">
            <div class="order-address mui-flex align-center" id="address_1">
                <div class="cell fixed align-center">
                    <div class="icon"></div>
                </div>
                <div class="cell content">
                    <div class="info">
                        <span>收货人：  </span>
                        <span>{{address_info.true_name}}</span>
                        <span> </span>
                        <span class="tel">{{address_info.mob_phone}}</span></div>
                    <div class="detail" id="addressTop">
                        <span>收货地址：</span>
                        <span></span>
                        <span>{{address_info.area_info}} </span>
                        <span>{{address_info.address}} </span>
                    </div>
                </div>
                <div class="cell fixed align-center">
                    <div class="nav"></div>
                </div>
                <b class="s1-borderB"></b>
            </div>
        </div>




        <div class="user-coupon no-coupon" id="user-quan">
            <h2 class="uc-title" id="default-coupon-title">
              <span class="cp-title">使用优惠券</span>
              <span class="iconfont ion-chevron-right"></span>
              <span class="fr coupon-status"><font color="#999999">暂无可用券</font></span>
            </h2>
        </div>






        <section class="shopping-confirm-box">
            <p class="scb-title" id="shoppingSwitch">商品清单
                <span class="fr ion-chevron-up">&nbsp;</span>
            </p>
            <div class="scb-list" id="scbList" style="display: block;">
                <!--入仓商品列表-->
                <div class="scb-content" v-for="(store,key,index) in store_cart_list">
                  <p class="seller">
                      <i class="iconfont ion-ios-cart"></i><font color="#4a4a4a">  {{store.store_name}}</font> 发货
                      <span v-if="address_api.content[key] > 0" style="color:#ff464e">运费：￥{{address_api.content[key]}}</span>
                      <span v-else>运费：包邮</span>
                  </p>
                    <ul class="bag-list">
                        <li v-for="goods in store.goods_list" >
                            <a class="orderlist-box clear js-active-goods">
                                <div class="pic fl">
                                    <img v-lazy="goods.goods_image_url">
                                </div>
                                <div class="ob-info">
                                    <div class="obi-first">
                                        <p class="title fl">{{goods.goods_name}}</p>
                                        <p class="current fr">￥{{goods.goods_price}}</p>
                                    </div>
                                    <div class="obi-second">
                                        <p class="type fl">
                                            条纹&nbsp;M
                                        </p>
                                        <p class="old fr">×{{goods.goods_num}}</p>
                                    </div>
                                </div>
                            </a>

                        </li>

                    </ul>
                    <p class="seller">
                        <span>
                            小计：<strong style="color:#ff464e">￥{{store_final_total_list[key]}}</strong>
                        </span>
                    </p>
                    <div class="activate-box">
                        <input type="text" class="activate-key js-user-note" name="user_notes[32495699]" maxlength="50" x-webkit-speech="" placeholder="给卖家留言(50字以内)" autocomplete="off">
                    </div>
                </div>
                <div class="bg"></div>
            </div>
        </section>

        <div class="pay-type" style="margin-bottom: .27rem;">
            <h5>支付方式<span class="needMoney fr"></span></h5>
            <ul class="type" id="pay-type-list">
                <li data-pay-type="12" class="active  ">
                    <img src="//jp.juancdn.com/jpwebapp/images/shopping/icon_wx.png">
                    <span>微信支付</span>
                    <span class="payway-tips-ad">推荐</span>
                    <i class="pay-type-radio"></i>
                </li>
                <li data-pay-type="5" class="  ">
                    <img src="//jp.juancdn.com/jpwebapp/images/shopping/icon_ali.png">
                    <span>支付宝支付</span>
                    <span class="payway-tips-text"></span>
                    <i class="pay-type-radio"></i>
                </li>
            </ul>
        </div>

        <div class="order_total order-amount-total">
            <div class="total-title">应付金额<span>¥39.00</span></div>
            <p class="clear"><span class="sp1">商品总额</span><span class="sp2">¥39.00</span></p>
            <p class="clear"><span class="sp1">总运费 <font color="#C8C8C8">(2天发货)</font></span><span class="sp2">¥0.00</span></p>
        </div>





    </div>
    <div class="bag-total order_temai">
        <a href="javascript:;" id="go-pay" _payentrance="1" class="go_pay">去付款</a>
    </div>
</div>

</template>

<script>

import "../../../assets/buy-now.scss"
import 'lib-flexible/flexible'
export default {
    name: "order_buynow",
    data() {
        return {
            page_show: false,
            cart_id: '',
            ifcart: false,
            address_info: [],
            store_cart_list:[],
            address_api:[],
            store_final_total_list:[]
        }
    },
    mounted() {
        this.cart_id = this.$route.params.cart_id
        this.ifcart = this.$route.params.ifcart

        this.getData()
    },
    methods: {
        getData() {
            $loading.show()
            this.$api.userAuthPost("buy_step1", {
                cart_id: this.cart_id,
                ifcart: this.ifcart
            }, res => {

                this.address_info = res.data.data.address_info
                this.store_cart_list = res.data.data.store_cart_list
                this.address_api = res.data.data.address_api
                this.store_final_total_list = res.data.data.store_final_total_list
                this.page_show = true
                $loading.hide()
            }, error => {
                $loading.hide()
            })
        }
    }
}

</script>
