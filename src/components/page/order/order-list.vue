<style lang="scss">

.top-fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9;
}

.order-manage .nav-tab-top ul {
    display: flex;
    background: #fff;
    border-bottom: 0.01rem solid #e7e7e7;
}

.order-manage .nav-tab-top ul li {
    height: 1.067rem;
    line-height: 1.067rem;
    margin-bottom: -0.01rem;
    text-align: center;
    font-size: 0.37rem;
    font-weight: 400;
    flex-grow: 1;
    flex-shrink: 0;
}

.order-manage .nav-tab-top ul .cur {
    border-bottom: 0.08rem solid #ea5a49;
    box-sizing: border-box;
    color: #ea5a49;
}

</style>

<template lang="html">

<div class="page">
    <div class="order-manage list">


        <div class="top-fixed">
            <div class="nav-tab-top">
                <ul>
                    <li class="cur">全部</li>
                    <li class="">待付款</li>
                    <li class="">待发货</li>
                    <li class="">待收货</li>
                    <li class="">待评价</li>
                </ul>
            </div>
        </div>
        <scroll class="page-content" :on-refresh="onRefresh">
            <div class="">
                <ul class="order-list">
                    <li v-for="order in order_list" style="margin-bottom:.27rem;">
                        <div class="module storage"></div>
                        <div class="module seller">
                            <div class="o-t-title-shop">
                                <div class="tcont">
                                    <div class="ico"><img v-lazy="order.order_store.store_avatar"></div>
                                    <div class="contact">
                                        <a>
                                            <p class="title">{{order.order_store.store_name}}</p>
                                            <p class="arrow" style="margin-left:.13rem;"><span class="ion-chevron-right"></span></p>
                                        </a>
                                    </div>
                                    <div class="state">
                                        <div class="state-cont">
                                            <p class="h" style="width:auto;">{{order.order_state|order_stae}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="module" @click="go_order_detail(order.order_id)" v-for="goods in order.order_goods" style="border-bottom:1px solid #ffffff;">
                            <div class="item-list o-t-item">
                                <div class="item-img">
                                    <p> <img class="" v-lazy="goods.goods_image_url"> </p>
                                </div>
                                <div class="item-info">
                                    <h3 class="title">{{goods.goods_name}}</h3>
                                    <p class="sku" style="min-height:0;">{{goods.goods_spec}}</p>
                                </div>
                                <div class="item-pay">
                                    <div class="item-pay-data">
                                        <p class="price">￥{{goods.goods_price}}</p>
                                        <p class="price"> <del class="">￥{{goods.goods_marketprice}}</del> </p>
                                        <p class="nums">x{{goods.goods_num}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="module serviceinfo" id="serviceinfo6"></div>
                        <div class="module">

                        </div>
                        <div class="module pay">
                            <div class="o-total-price">
                                <div class="cont"> <span>共<b>{{order.goods_count}}</b>件商品</span> <span>合计:<b>￥{{order.order_amount}}</b></span> <span>(含运费<b>￥{{order.shipping_fee}}</b>)</span> </div>
                            </div>
                        </div>
                        <div class="module orderop" v-if="order.order_state !=20">
                            <div class="o-tab-btn">
                                <ul>
                                    <li class="h" v-if="order.order_state==30"> 确认收货 </li>
                                    <li class="h" v-if="order.order_state==30"> 查看物流 </li>
                                    <li class="h" v-if="order.order_state==10"> 立即付款 </li>
                                    <li class="" v-if="order.order_state==10"> 取消订单 </li>
                                    <li class="" v-if="order.order_state==0"> 删除订单 </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </scroll>
    </div>
</div>

</template>

<script>

import "../../../assets/order.scss"
export default {
    name: "order_list",
    data() {
        return {
            order_list: [],
            page: 1,
            load_more: true
        }
    },
    mounted() {
        $loading.show()
        this.getData(() => {

        })
    },
    methods: {
        getData(done) {
                this.$api.userAuthGet("order_list?page=" + this.page, res => {
                    console.log(res);
                    if (res.data.status_code == 1) {
                        if (this.page == 1) {
                            this.order_list = res.data.data.data
                        } else {

                        }
                    }
                    this.$nextTick(() => {
                        $loading.hide()
                        done()
                    })
                }, error => {

                })
            },
            onRefresh(done) {
                if (this.is_load) return;
                this.page = 1
                this.load_more = true
                this.getData(done)
            },
            go_order_detail(order_id) {
                $router.push({
                    name: "order_detail",
                    params: {
                        order_id: order_id
                    }
                })
            }
    },
    filters: {
        order_stae(val, typr = 1) {
            let text = '';
            let class_name = '';
            switch (val) {
                case 0:
                    text = '交易关闭'
                    break;
                case 10:
                    text = '等待买家付款'
                    break;
                case 20:
                    text = '等待卖家发货'
                    break;
                case 30:
                    text = '卖家已发货'
                    break;
                case 40:
                    text = '交易成功'
                    break;
            }
            return text
        }
    }
}

</script>
