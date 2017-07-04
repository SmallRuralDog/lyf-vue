<style lang="scss">
.o-t-error {
    margin: 2.133rem 0;
}
.o-t-error .img {
    margin: 0 auto;
    width: 2.933rem;
    height: 2.933rem;
    background: #ccc;
    border-radius: 100%;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.o-t-error .img img {
    width: 1.6rem;
}
.o-t-error .title {
    margin-top: .32rem;
    text-align: center;
}
.o-t-error .title {
    font-size: .37rem;
}
.o-t-error .sub {
    margin-top: .133rem;
    text-align: center;
    color: #999;
}
.o-t-error .btn {
    text-align: center;
    margin-top: .267rem;
}
.o-t-error .btn a {
    display: inline-block;
    border: 1px solid #051b28;
    border-radius: .107rem;
    padding: .107rem .667rem;
    cursor: pointer;
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
a, a:hover {
    text-decoration: none;
}
a, body {
    color: #051b28;
}


</style>

<template lang="html">

<div class="">
    <div class="allItemv2">
        <div class="o-t-error">
            <div class="img"><img :src="cart_icon"></div>
            <div class="info">
                <h1 class="title">购物车快饿瘪了T.T</h1>
                <p class="sub">主人快给我挑点宝贝吧</p>
                <p class="btn"><a @click='this.$router.push({name:"home"})'>去逛逛</a></p>
            </div>
        </div>
    </div>
</div>

</template>

<script>
export default {
  data(){
    return{
      cart_icon: require('../../assets/images/cart-176.png')
    }
  }
}

</script>
