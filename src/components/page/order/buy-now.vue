<style lang="css">



</style>

<template lang="html">

<div class="page">
    <div class="page-content">
        <div id="confirmOrder_1" class="order-confirmOrder">
            <div class="order-address mui-flex align-center" id="address_1">
                <div class="cell fixed align-center">
                    <div class="icon"></div>
                </div>
                <div class="cell content">
                    <div class="info">
                        <span>收货人：  </span>
                        <span>张益达</span>
                        <span> </span>
                        <span class="tel">18677067774</span></div>
                    <div class="detail" id="addressTop">
                        <span>收货地址：</span>
                        <span></span>
                        <span>广西壮族自治区 </span>
                        <span>南宁市 </span>
                        <span>青秀区 </span>
                        <span>津头街道 </span>
                        <span>中泰路8号天健商务大厦1302进门右边第二个办公室 </span>
                    </div>
                </div>
                <div class="cell fixed align-center">
                    <div class="nav"></div>
                </div>
                <b class="s1-borderB"></b>
            </div>
        </div>
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
            cart_id: '',
            ifcart: false,
        }
    },
    mounted() {
        this.cart_id = this.$route.params.cart_id
        this.ifcart = this.$route.params.ifcart

        this.getData()
    },
    methods: {
        getData() {
            this.$api.userAuthPost("buy_step1", {
                cart_id: this.cart_id,
                ifcart: this.ifcart
            }, res => {

            }, error => {

            })
        }
    }
}

</script>
