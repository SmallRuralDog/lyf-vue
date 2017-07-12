<template lang="html">
    <div class="page has-tabbar">
        <scroll class="page-content" style="top: -1.1rem;" :on-refresh="onRefresh" v-if="page_show">
            <div class="personal-head head-bg-img" >
                <img alt="" v-lazy="user.user.avatar">
                <div class="p-head-info">
                    <p class="p-nickname">{{user.user.nickname}}</p>
                    <p class="p-platform" v-if="user.user.user_wx != ''">已绑定微信</p>
                    <p  class="p-platform" v-else>未绑定微信</p>
                </div>
            </div>

          <div class="personal-numbers hm-margin-b">
            <div class="personal-numbers-item" @click='this.$router.push({name:"message_list"})'>
              <div class="number"><span>￥</span>2486.0</div>
              <div class="number-title">营业额</div>
            </div>
            <div class="personal-numbers-item" @click='this.$router.push({name:"wallet"})'>
              <div class="number"><span>￥</span>253.0</div>
              <div class="number-title">钱包</div>
            </div>
            <div class="personal-numbers-item" @click='go_friendlist(0)'>
              <div class="number">256</div>
              <div class="number-title">好友</div>
            </div>

          </div>


          <ul class="aui-list aui-list-in">
            <li class="aui-list-item " style="min-height: 44px;">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-title">我的订单</div>
                <div class="aui-list-item-right" @click="go_orderlist(0)" style="color: #aaa;display: flex;align-items: center;">查看更多 <i class="ion-ios-arrow-right" style="color: #DDD;margin-left: 5px;"></i></div>

              </div>
            </li>
          </ul>

            <!--<div class="personal-orders">-->
                <!--<div class="p-orders">-->
                    <!--<span class="p-all-orders">我的订单</span>-->
                    <!--<span class="p-all-orders-span" @click="go_orderlist(0)">查看更多 <i class="ion-ios-arrow-right"></i></span>-->
                <!--</div>-->
            <!--</div>-->
            <div class="personal-wrapper-1 hm-margin-b">
                <div class="p-wrapper-1-item" @click="go_orderlist(0)">
                  <div class="p-grouping"><i class="iconfont icon-yichengtuan"></i></div>
                  <p class="p-wrap-1-title">
                    全部订单
                  </p>
                </div>
                <div class="p-wrapper-1-item" @click="go_orderlist(1)">
                    <div class="p-unpaid"><i class="iconfont icon-daifukuan"></i><span v-if="user.order_count.order_nopay_count >0">{{user.order_count.order_nopay_count}}</span></div>
                    <p class="p-wrap-1-title">

                        待付款
                    </p>
                </div>
                <div class="p-wrapper-1-item" @click="go_orderlist(2)">
                    <div class="p-unshipping"><i class="iconfont icon-wuliu"></i><span v-if="user.order_count.order_nosend_count >0">{{user.order_count.order_nosend_count}}</span></div>
                    <p class="p-wrap-1-title">
                        待发货
                    </p>
                </div>
                <div class="p-wrapper-1-item" @click="go_orderlist(3)">
                    <div class="p-unreceived"><i class="iconfont icon-daishouhuo"></i><span v-if="user.order_count.order_noreceipt_count >0">{{user.order_count.order_noreceipt_count}}</span></div>
                    <p class="p-wrap-1-title">
                        待收货
                    </p>
                </div>
                <div class="p-wrapper-1-item" @click="go_orderlist(4)">
                    <div class="p-unrated"><i class="iconfont icon-daipingjia"></i><span v-if="user.order_count.order_noeval_count >0">{{user.order_count.order_noeval_count}}</span></div>
                    <p class="p-wrap-1-title">
                        待评价
                    </p>
                </div>
            </div>

            <ul class="aui-list aui-list-in">
              <li class="aui-list-item " style="min-height: 44px;">
                <div class="aui-list-item-inner">
                  <div class="aui-list-item-title">必备工具</div>
                  <div class="aui-list-item-right" @click="go_orderlist(0)" style="color: #aaa;display: flex;align-items: center;">查看更多 <i class="ion-ios-arrow-right" style="color: #DDD;margin-left: 5px;"></i></div>

                </div>
              </li>
            </ul>


            <div class="personal-wrapper-2" style="margin-top: 0">
                <div class="p-wrapper-2-item" @click='this.$router.push({name:"message_list"})'>
                    <div class="p-messages"><i class="iconfont icon-xiaoxi1 color-assertive"></i></div>
                    <p class="p-wrap-2-title">我的消息</p>
                </div>
                <div class="p-wrapper-2-item" @click='this.$router.push({name:"my_voucher"})'>
                    <div class="p-coupons"><i class="iconfont icon-coupon color-positive"></i></div>
                    <p class="p-wrap-2-title">我的优惠券</p>
                </div>
                <div class="p-wrapper-2-item" @click='this.$router.push({name:"favorite"})'>
                    <div class="p-likes"><i class="iconfont icon-ai-mark color-calm"></i></div>
                    <p class="p-wrap-2-title">我的收藏</p>
                </div>
                <div class="p-wrapper-2-item" @click='this.$router.push({name:"order_refund_list"})'>
                    <div class="p-after-sales"><i class="iconfont icon-tuikuan1 color-balanced"></i></div>
                    <p class="p-wrap-2-title">退款/售后</p>
                </div>
            </div>
            <div class="personal-wrapper-2 hm-margin-b" style="margin-top: 0">
              <div class="p-wrapper-2-item" @click='this.$router.push({name:"message_list"})'>
                <div class="p-messages"><i class="iconfont icon-gerenzhongxin color-assertive"></i></div>
                <p class="p-wrap-2-title">旧版会员中心</p>
              </div>

            </div>
            <!--<div class="" style="margin-bottom:.8rem;">-->
                <!--<div class="item item-divider">-->
                    <!--必备工具-->
                <!--</div>-->
                <!--<item class="item-icon-left item-icon-right" style="padding-left: 11px;" @click.native='this.$router.push({name:"address"})'>-->
                    <!--<i class="iconfont icon-dizhi"></i> 收货地址-->
                    <!--<i class="icon ion-ios-arrow-right" style="color: #DDD;"></i>-->
                <!--</item>-->
                <!--<item class="item-icon-left item-icon-right" style="padding-left: 11px;">-->
                    <!--<i class="iconfont icon-shezhi"></i> 设置-->
                    <!--<i class="icon ion-ios-arrow-right" style="color: #DDD;"></i>-->
                <!--</item>-->

            <!--</div>-->

          <!--<div class="item item-divider">-->
          <!--必备工具-->
          <!--</div>-->

          <ul class="aui-list hm-margin-b"  style="margin-bottom:.8rem;"><!--@click="add"-->
            <li class="aui-list-item aui-list-item-middle" @click='this.$router.push({name:"address"})'>
              <div class="aui-list-item-label-icon">
                <i class="iconfont icon-dizhi"></i>
              </div>
              <div class="aui-list-item-inner ">
                收货地址
                <i class="icon ion-ios-arrow-right" style="color: #DDD;"></i>
              </div>
            </li>
            <li class="aui-list-item aui-list-item-middle" @click='this.$router.push({name:"setting"})'>
              <div class="aui-list-item-label-icon">
                <i class="iconfont icon-shezhi"></i>
              </div>
              <div class="aui-list-item-inner ">
                设置
                <i class="icon ion-ios-arrow-right" style="color: #DDD;"></i>
              </div>
            </li>
          </ul>


        </scroll>
      <footnav :active="4"></footnav>
    </div>
</template>

<script>
import footnav from '../../layout/footnav';
export default {
  components: {
    footnav
  },
  data() {
    return {
      user: {
        order_nopay_count:[]
      },
      page_show:false,
      is_load:false
    }
  },
  mounted() {

    this.$store.commit('UPDATE_PAGE_LOAD_STATE_DATA', {
      user: true,
    })
    this.get_data(()=>{})
  },
  methods: {
    get_data(done) {
      this.is_load = true;
      this.$api.userAuthGet("user_index", res => {
        if (res.data.status_code == 1) {
          this.user = res.data.data
        }
        $loading.hide()
        this.is_load = false
        this.page_show = true
        done()
      }, error => {
        $toast.show("加载失败")
      })
    },
    go_orderlist(id) {
      $router.push({
        name: 'order_list',
        params: {
          type: id
        }
      })
    },
    go_friendlist(id) {
      $router.push({
        name: 'friend_list',
        params: {
          id: id
        }
      })
    },
    onRefresh(done) {
      if (this.is_load) return;
      this.get_data(done)
    },
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
    vertical-align:top;
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
.personal-wrapper-2,
.personal-wrapper-3 {
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
        color: #666;
    }
}

.personal-wrapper-1 .p-wrapper-1-item .p-wrap-1-title {
    color: #151516;
    font-size: 12px;
    line-height: 1;
    position: relative;
    color:#666;
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
    margin: 0.35rem auto 0.15rem;
    width: 0.77rem;
    i {
        font-size: 0.67rem;
    }
}

.personal-wrapper-2 .p-wrapper-2-item .p-wrap-2-title {
    color: #151516;
    font-size: 12px;
    line-height: 1;
    position: relative;
    color:#666;
}


.p-unpaid,
.p-unrated,
.p-unreceived,
.p-unshipping {
    span {
        color: #ffffff;
        line-height: 0.37rem;
        padding: 0.0rem 0.11rem;
        border-radius: 0.13rem;
        position: absolute;
        background: #EA5A49;
        font-size: 0.27rem;
        top: 0.08rem;
        right: 20px;
        animation: myfirst 0.5s linear infinite;
        @keyframes myfirst {
            0% {
                transform: translate(0px, 0px);
            }
            50% {
                transform: translate(0px, -2px);
            }
            100% {
                transform: translate(0px, 0px);
            }
        }
    }
}
.personal-numbers{
  display: flex;
  width:100%;

  .personal-numbers-item{
    flex:1;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items:center;
    background: #fff;
    /*height:70px;*/
    padding:15px 0 10px;
    .number{
      font-size: 18px;
      margin-bottom: 2px;
      span{
        font-size: 12px;
      }
    }
    .number-title{
      color: #333;
    }
  }
}
</style>
