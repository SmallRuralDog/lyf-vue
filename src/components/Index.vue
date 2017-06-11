<template>
<div class="" v-nav="{hideNavbar:true}" v-tabbar="{'menus': menus, menuColor: '#B5B5B5', activeMenuColor: '#EA5A49', onMenuClick: menuClicked}">
    <transition>
        <keep-alive>
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
                    iconOn: 'ion-ios-camera',
                    iconOff: 'ion-ios-camera-outline',
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
    methods: {
        menuClicked(menuIndex) {}
    },
    beforeDestroy() {
        $tabbar.$emit('hideTabbar')
    }
}
</script>
<style>

</style>
