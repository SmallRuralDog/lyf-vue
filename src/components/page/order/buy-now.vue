<style lang="css">

</style>

<template lang="html">

<div class="page">
    <div class="page-content" v-if="page_show" style="margin-bottom:1.33rem">
        <div id="confirmOrder_1" class="order-confirmOrder" @click="select_address()">
            <div class="order-address mui-flex align-center" id="address_1">
                <div class="cell fixed align-center">
                    <div class="icon"></div>
                </div>
                <div class="cell content" v-if="address_info != null">
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
                <div class="cell content" v-else>
                  添加收货地址
                </div>
                <div class="cell fixed align-center">
                    <div class="nav"></div>
                </div>
                <b class="s1-borderB"></b>
            </div>
        </div>











        <section class="shopping-confirm-box">
            <p class="scb-title" id="shoppingSwitch">商品清单
                <span class="fr ion-chevron-up">&nbsp;</span>
            </p>
            <div class="scb-list" id="scbList" style="display: block;">
                <!--入仓商品列表-->
                <div class="scb-content" v-for="(store,key,index) in store_cart_list">
                  <p class="seller" v-if="address_info != null">
                      <i class="iconfont ion-ios-cart color-dark"></i><font color="#4a4a4a"> 宝贝由  {{store.store_name}} 发货</font>
                      <span v-if="address_api.content[key] > 0" style="color:#ff464e">运费：￥{{address_api.content[key]}}</span>
                      <span v-else>运费：包邮</span>
                  </p>
                    <ul class="bag-list" style="background:#f7f7f7;">
                        <li v-for="goods in store.goods_list">
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
                                        <p class="type fl">{{goods.goods_spec_text}}</p>
                                        <p class="old fr">×{{goods.goods_num}}</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <div class="user-coupon no-coupon" v-if="store.store_voucher_list != null">
                        <h2 @click="select_order_voucger(store.store_voucher_list,store.store_voucher_info,store.store_id,store.store_name)" class="uc-title" id="default-coupon-title" style="margin-bottom:0;">
                          <span class="cp-title">店铺优惠</span>
                          <span class="iconfont ion-chevron-right"></span>
                          <span class="fr coupon-status" v-if="store.store_voucher_info.voucher_id > 0"><font color="#ff464e">{{store.store_voucher_info.name}}</font></span>
                          <span class="fr coupon-status" v-else>不使用优惠券</span>
                        </h2>
                    </div>
                    <p class="seller">
                        <span>
                            小计：<strong style="color:#ff464e">￥{{store_final_total_list[key]}}</strong>
                        </span>
                    </p>
                    <div class="activate-box">
                        <input type="text" class="activate-key js-user-note" :name="key" v-model="pay_massage[key]"  maxlength="50" placeholder="给卖家留言(50字以内)" autocomplete="off">
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
                <li data-pay-type="5" class="" v-if="false">
                    <img src="//jp.juancdn.com/jpwebapp/images/shopping/icon_ali.png">
                    <span>支付宝支付</span>
                    <span class="payway-tips-text"></span>
                    <i class="pay-type-radio"></i>
                </li>
            </ul>
        </div>
        <div class="order_total order-amount-total">
            <div class="total-title">应付金额<span>¥{{order_amount}}</span></div>
            <p class="clear"><span class="sp1">商品总额</span><span class="sp2">¥{{goods_total}}</span></p>
            <p class="clear"><span class="sp1">总运费</span><span class="sp2">¥{{freight_total}}</span></p>
        </div>
    </div>
    <div class="bag-total order_temai" v-if="page_show">
        <a href="javascript:;" class="go_pay" @click="go_pay()">去付款</a>
    </div>


    <order-store-voucher-list :popupVisible="order_store_voucher_list_show" :voucherlist="order_store_voucher_list_data" :voucherInfo="order_store_voucher_info" :storename="order_store_voucher_list_name"></order-store-voucher-list>

</div>
</template>

<script>
import "../../../assets/buy-now.scss"
import 'lib-flexible/flexible'

import address_modal from "../user/addresses.vue"
import orderStoreVoucherList from "../../layout/order-store-voucher-list.vue"
import bus from "../../../bus.js"
export default {
  name: "order_buynow",
  components: {
    orderStoreVoucherList
  },
  data() {
    return {
      page_show: false,
      cart_id: '',
      ifcart: false,
      voucher:new Object,
      address_info: [],
      store_cart_list: [],
      address_api: [],
      store_final_total_list: [],
      order_amount: 0,
      pay_massage: [],
      modal: undefined,

      order_store_voucher_list_data:[],
      order_store_voucher_info:null,
      order_store_voucher_list_show:false,
      order_store_voucher_list_name:"店铺优惠",
    }
  },
  filters: {
    goods_spec: function(val) {
      if (val != null) {
        return val.join(";")
      }

    }
  },
  mounted() {
    this.cart_id = this.$route.params.cart_id
    this.ifcart = this.$route.params.ifcart
    this.getData()
    $modal.fromComponent(address_modal, {
      title: '地址管理',
      theme: 'default'
    }).then((modal) => {
      this.modal = modal
    })
    bus.$on("onChangeAddress", address => {
      /*if(this.address_info == null){
        this.getData()
      }else{
        this.address_info = address
        this.getData()
      }*/
      this.address_info = address
      this.getData()
      this.modal.hide();
    })
    bus.$on("onBuyVoucherState", res => {//打开关闭优惠券选择弹窗
      this.order_store_voucher_list_show = res
    })
    bus.$on("onBuyVoucherselect",res=>{
      console.log(res);
      this.$set(this.voucher,res.store_id,res.voucher_id)
      console.log(this.voucher);
      this.order_store_voucher_list_show = false
      this.getData()
    })
  },
  computed: {
    goods_total: {
      get() {
        let total = 0;
        for (var key in this.store_final_total_list) {
          total = total + parseFloat(this.store_final_total_list[key])
        }
        return total - this.freight_total
      },
      set() {

      }
    },
    freight_total: {
      get() {
        let total = 0;
        for (var key in this.address_api.content) {
          total = total + parseFloat(this.address_api.content[key])
        }
        return total
      },
      set() {

      }
    }
  },
  destroyed() {
    if (this.modal)
      $modal.destroy(this.modal)
  },
  methods: {
    getData() {
      $loading.show()
      this.$api.userAuthPost("buy_step1", {
        cart_id: this.cart_id,
        ifcart: this.ifcart,
        address_id:this.address_info.address_id,
        voucher:JSON.stringify(this.voucher)
      }, res => {
        if (res.data.status_code == 1) {
          this.address_info = res.data.data.address_info
          this.store_cart_list = res.data.data.store_cart_list
          this.address_api = res.data.data.address_api
          this.store_final_total_list = res.data.data.store_final_total_list
          this.order_amount = res.data.data.order_amount
          this.page_show = true
          for (var key in this.store_cart_list) {
            this.$set(this.pay_massage, key, '')
            if( this.store_cart_list[key].store_voucher_info != ''){
              this.$set(this.voucher, key, this.store_cart_list[key].store_voucher_info.voucher_id)
            }

          }
          $loading.hide()
        } else {
          $toast.show(res.data.message)
          setTimeout(()=>{
            $router.go(-1)
          },1500)
        }
      }, error => {
        $loading.hide()
      })
    },
    select_address() {
      this.modal.show()
    },
    go_pay() {
      if(this.address_info == '' || this.address_info == null){
        $toast.show("请选择收货地址")
        return
      }
      let msg = [];
      for (var store_id in this.pay_massage) {
        let c_p = store_id + '|' + this.pay_massage[store_id]
        msg.push(c_p)
      }
      $loading.show()
      this.$api.userAuthPost("buy_step2", {
        cart_id: this.cart_id,
        ifcart: this.ifcart,
        voucher:JSON.stringify(this.voucher),
        address_id: this.address_info.address_id,
        pay_message: msg.join(",")
      }, res => {
        this.$store.commit('UPDATE_COMMON_DATA', {
          cart_view_data_reload: true
        })
        if (res.data.status_code == 1) {
          $loading.hide()
          window.location.href = res.data.data
        } else {
          $toast.show(res.data.message)
          setTimeout(function(){
            $router.go(-1)
          },1500);
        }
      }, error => {
        $toast.show("支付失败")
        setTimeout(function(){
          $router.go(-1)
        },1500);
      })
    },
    select_order_voucger(list,store_voucher_info,store_id,store_name){
      this.order_store_voucher_list_data = list
      this.order_store_voucher_info = store_voucher_info
      this.order_store_voucher_list_name= store_name
      this.order_store_voucher_list_show = true
    }
  }
}
</script>
