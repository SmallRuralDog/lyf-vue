<template>
<div class="" v-nav="{hideNavbar:true}">
    <transition>
        <keep-alive exclude="cart_data,order_buynow,address_list,order_logistics,order_detail,order_rate,comment_list,goods_detail">
            <router-view></router-view>
        </keep-alive>
    </transition>
</div>
</template>
<script>
export default {
    data() {
        return {
            menus: [{
                    iconOn: 'ion-ios-home',
                    iconOff: 'ion-ios-home-outline',
                    text: '首页',
                    path: '/home'
                },
                {
                    iconOn: 'ion-ios-list',
                    iconOff: 'ion-ios-list-outline',
                    text: '分类',
                    path: '/class_all'
                },
                {
                    iconOn: 'ion-ios-cart',
                    iconOff: 'ion-ios-cart-outline',
                    text: '购物车',
                    path: '/cart'
                },
                {
                    iconOn: 'ion-ios-person',
                    iconOff: 'ion-ios-person-outline',
                    text: '我的',
                    path: '/user'
                }
            ]
        }
    },
    mounted(){

    },
    methods: {
        menuClicked(menuIndex) {}
    },
    beforeDestroy() {
        $tabbar.$emit('hideTabbar')
    }
}
</script>
<style>
.tabbar .tabbar-item .icon-wrapper{
  height: .93rem;
  line-height: .93rem;
  font-weight: bold;
  font-size: .75rem;
}
.tabbar .tabbar-item .text-wrapper{

  font-size: .59rem;
  line-height: .59rem;
}
</style>
