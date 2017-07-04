<style lang="scss">
.success-main {
    background: #ffffff;
    padding-bottom: 0.53rem;
}
.pay-success-top {
    background-color: #EA5A49;
    color: #ffffff;
    display: flex;
    height: 5.33rem;
    justify-content: center;
    align-items: flex-start;
    padding-top: 0.8rem;
    i {
        font-size: 2.13rem;
        line-height: 2.13rem;
        color: #ffffff;
        display: inline-block;
    }
    div {
        margin-left: 0.4rem;
        height: 2.13rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        span {
            font-size: 0.53rem;
            color: #ffffff;
        }
        p {
            margin-bottom: 0;
            margin-top: 0.27rem;
        }
    }
}

.pay-ewm {
    text-align: center;
    img {
        border-radius: 0.27rem;
        background-color: #ffffff;
        margin-top: -1.6rem;
        width: 4rem;
        height: 4rem;
    }
}

.pay-btn-group {
    text-align: center;
    margin-top: 0.53rem;
    margin-bottom: 0.53rem;
    button {
        width: 3.2rem;
    }
    button {
        margin: 0 0.53rem;
    }
}
</style>

<template lang="html">

<div class="page">
    <div class="page-content">
        <div class="success-main">
            <div class="text-center pay-success-top">
                <i class="ion-checkmark-circled"></i>
                <div>
                    <span class="color-dark">支付成功！</span>
                    <p>感谢您的购买</p>
                </div>
            </div>
            <div class="pay-ewm">
                <img v-lazy="'http://www.gxlyf.cn/picture/ewm_wx.png'" alt="">
                <p class="mt-10 color-dark">如果你还未关注老友粉公众号
                    <br />请长按二维码识别关注</p>
            </div>

            <div class="pay-btn-group">
                <button class="button button-assertive button-small" @click="go_index()">继续逛逛</button>
                <button class="button button-royal button-small" @click="go_order_list()">我的订单</button>
            </div>
        </div>
    </div>
</div>

</template>

<script>
export default {
  methods: {
    go_index() {
      $router.push({ name: 'home' })
    },
    go_order_list() {
      $router.push({ name: 'order_list', params: { type: 0 } })
    }
  }
}
</script>
