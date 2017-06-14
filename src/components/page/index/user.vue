<template lang="html">
    <div class="page has-tabbar">
        <div class="page-content">
            <div class="personal-head head-bg-img">
                <img alt="" src="http://pinduoduoimg.yangkeduo.com/base/mobile_user_avatar.png">
                <div class="p-head-info">
                    <p class="p-nickname">186****7774</p>
                    <p class="p-platform"></p>
                </div>
            </div>
            <div class="personal-orders">
                <div class="p-orders">
                    <span class="p-all-orders">我的订单</span>
                    <span class="p-all-orders-span">查看更多订单 <i class="ion-ios-arrow-right"></i></span>
                </div>
            </div>
            <div class="personal-wrapper-1">
                <div class="p-wrapper-1-item">
                    <div class="p-unpaid"><i class="ion-help-buoy"></i></div>
                    <p class="p-wrap-1-title">
                        待付款
                    </p>
                </div>
                <div class="p-wrapper-1-item">
                    <div class="p-grouping"><i class="ion-compass"></i></div>
                    <p class="p-wrap-1-title">
                        待成团
                    </p>
                </div>
                <div class="p-wrapper-1-item">
                    <div class="p-unshipping"><i class="ion-at"></i></div>
                    <p class="p-wrap-1-title">
                        待发货
                    </p>
                </div>
                <div class="p-wrapper-1-item">
                    <div class="p-unreceived"><i class="ion-power"></i></div>
                    <p class="p-wrap-1-title">
                        待收货
                    </p>
                </div>
                <div class="p-wrapper-1-item">
                    <div class="p-unrated"><i class="ion-wifi"></i></div>
                    <p class="p-wrap-1-title">
                        待评价
                    </p>
                </div>
            </div>

            <div class="personal-wrapper-2">
                <div class="p-wrapper-2-item">
                    <div class="p-messages"><i class="ion-help-buoy color-assertive"></i></div>
                    <p class="p-wrap-2-title">我的消息</p>
                </div>
                <div class="p-wrapper-2-item">
                    <div class="p-coupons"><i class="ion-help-buoy color-positive"></i></div>
                    <p class="p-wrap-2-title">我的优惠券</p>
                </div>
                <div class="p-wrapper-2-item">
                    <div class="p-likes"><i class="ion-help-buoy color-calm"></i></div>
                    <p class="p-wrap-2-title">我的收藏</p>
                </div>
                <div class="p-wrapper-2-item">
                    <div class="p-after-sales"><i class="ion-help-buoy color-balanced"></i></div>
                    <p class="p-wrap-2-title">退款/售后</p>
                </div>
            </div>
            <div class="" style="margin-bottom:.8rem;">
                <div class="item item-divider">
                    必备工具
                </div>
                <item class="item-icon-left item-icon-right" @click.native='this.$router.push({name:"address"})'>
                    <i class="icon ion-ios-navigate dark"></i>
                    收货地址
                    <i class="icon ion-ios-arrow-right" style="color: #DDD;"></i>
                </item>
                <item class="item-icon-left item-icon-right">
                    <i class="icon ion-ios-gear dark"></i>
                    设置
                    <i class="icon ion-ios-arrow-right" style="color: #DDD;"></i>
                </item>

            </div>
        </div>
        <lyf-tab-bar :index="4"></lyf-tab-bar>
    </div>
</template>

<script>
    import LyfTabBar from '../../layout/lyf-tab-bar';
    export default {
        components: {
            LyfTabBar
        },
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss">
    .head-bg-img {
        position: relative;
        background-image: url("../../../assets/images/personal_sprite_v10-59e86df834.png");
    }

    .bg-img,
    .head-bg-img,
    .personal-download-app .p-download-txt:before {
        background-repeat: no-repeat;
        background-size: 10.53rem 6.67rem;
    }

    .personal-head {
        background-position: 0 0;
        font-size: 0;
        height: 3.6rem;
        padding: 0.88rem 0 0 0.45rem;
        position: relative;
        width: 100%;
    }

    .personal-head img {
        border: 0.015rem solid rgba(255, 255, 255, .5);
        border-radius: 100%;
        display: inline-block;
        height: 1.71rem;
        position: relative;
        width: 1.71rem;
    }

    .personal-head .p-head-info {
        display: inline-block;
        margin: 0.4rem 0 0 0.43rem;
    }

    .personal-head .p-head-info .p-nickname {
        color: #fff;
        font-size: 0.43rem;
        line-height: 0.43rem;
    }

    .personal-head .p-head-info .p-platform {
        color: #e5e5e5;
        font-size: 0.29rem;
        line-height: 0.29rem;
        margin-top: 0.16rem;
    }

    .personal-head .p-head-refresh {
        background-position: -3.2rem -4.8rem;
        height: 0.73rem;
        position: absolute;
        right: 0.45rem;
        top: 0.4rem;
        width: 0.73rem;
    }

    .personal-orders {
        background-color: #fff;
        position: relative;
        width: 100%;
    }

    .personal-orders .p-orders {
        height: 1.2rem;
        line-height: 1.2rem;
        margin-left: 0.32rem;
        overflow: hidden;
        position: relative;
        border-bottom: 0.025rem solid #ededed;
    }

    .personal-orders .p-orders .p-all-orders {
        color: #151516;
        float: left;
        font-size: 0.43rem;
    }

    .personal-orders .p-orders .p-all-orders-span,
    .personal-orders .p-orders .p-unpaied-orders {
        color: #9c9c9c;
        float: right;
        font-size: 0.35rem;
        margin-right: 0.27rem;
    }

    .personal-orders .p-orders .p-unpaied-orders b {
        color: #e02e24;
        font-weight: 500;
    }

    .personal-orders .p-orders .p-unpaied-orders:before {
        width: 0.16rem;
        height: 0.16rem;
        background-color: #f8453e;
        content: '';
        display: inline-block;
        margin-right: 0.05rem;
        border-radius: 0.08rem;
    }

    .p-bubble,
    .personal-list,
    .personal-logout,
    .personal-wrapper-1,
    .personal-wrapper-2 {
        background-color: #fff;
    }

    .personal-wrapper-1 {
        height: 1.76rem;
        overflow: hidden;
        position: relative;
        width: 100%;
    }

    .personal-wrapper-1 .p-wrapper-1-item {
        position: relative;
        display: inline-block;
        float: left;
        height: inherit;
        text-align: center;
        width: 20%;
    }

    .personal-wrapper-1 .p-wrapper-1-item .p-complaint,
    .personal-wrapper-1 .p-wrapper-1-item .p-grouping,
    .personal-wrapper-1 .p-wrapper-1-item .p-unpaid,
    .personal-wrapper-1 .p-wrapper-1-item .p-unrated,
    .personal-wrapper-1 .p-wrapper-1-item .p-unreceived,
    .personal-wrapper-1 .p-wrapper-1-item .p-unshipping {
        height: 0.67rem;
        margin: 0.32rem auto 0.19rem;
        width: 0.67rem;
        i {
            font-size: 0.67rem;
            color: #999;
        }
    }

    .personal-wrapper-1 .p-wrapper-1-item .p-wrap-1-title {
        color: #151516;
        font-size: 0.32rem;
        line-height: 0.32rem;
        position: relative;
    }

    .personal-wrapper-2 {
        height: 2.03rem;
        margin-top: 0.27rem;
        overflow: hidden;
        position: relative;
        width: 100%;
    }

    .personal-wrapper-2 .p-wrapper-2-item {
        display: inline-block;
        float: left;
        height: inherit;
        text-align: center;
        width: 25%;
    }

    .personal-wrapper-2 .p-wrapper-2-item .p-after-sales,
    .personal-wrapper-2 .p-wrapper-2-item .p-coupons,
    .personal-wrapper-2 .p-wrapper-2-item .p-footprint-big,
    .personal-wrapper-2 .p-wrapper-2-item .p-likes,
    .personal-wrapper-2 .p-wrapper-2-item .p-lotteries,
    .personal-wrapper-2 .p-wrapper-2-item .p-messages {
        height: 0.77rem;
        margin: 0.35rem auto 0.24rem;
        width: 0.77rem;
        i {
            font-size: 0.67rem;
        }
    }

    .personal-wrapper-2 .p-wrapper-2-item .p-wrap-2-title {
        color: #151516;
        font-size: 0.32rem;
        line-height: 0.32rem;
        position: relative;
    }
</style>
