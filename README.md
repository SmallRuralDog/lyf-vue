# lyf-vue
这是一个基于vue2开发在线商城，目前已完成大部分，先将其开源给感兴趣的同学学习参考！

## 目录结构
```
│  bus.js //组件通信
│  main.js //入口文件
│  
├─api //公共方法等
│      filter.js
│      http.js
│      methods.js
│      sess.js
│      
├─assets
│  ├─icon
│  └─images
│          
├─components
│  │  Index.vue
│  │  
│  ├─layout //布局
│  │      action-sheet.vue //sku弹窗
│  │      cart-data.vue //购物车有数据
│  │      cart-no-data.vue //购物车无数据
│  │      footnav.vue //底部
│  │      lyf-tab-bar.vue //tabbar
│  │      order-store-voucher-list.vue
│  │      scroll.vue
│  │      voucher-list.vue
│  │      
│  └─page
│      │  auth.vue //登录授权回调页（仅作为测试用）
│      │  login.vue //登录页
│      │  
│      ├─index （首页）
│      │      cart.vue //购物车
│      │      class_all.vue //分类
│      │      discovery.vue
│      │      home.vue //首页
│      │      user.vue //用户用心
│      │      
│      ├─mall //商城
│      │      catgoods.vue //分类商品
│      │      comment-list.vue //评论列表
│      │      goods_detail.vue //产品详情
│      │      store_home.vue //店铺首页
│      │      
│      ├─news //新闻（未完成）
│      │      news-detail.vue
│      │      
│      ├─order //订单
│      │      buy-now.vue //订单确认页
│      │      order-detail.vue //订单详情
│      │      order-list.vue //订单列表
│      │      order-logistics.vue
│      │      order-pay-success.vue //订单支付成功
│      │      order-rate.vue
│      │      order-refund-list.vue //售后
│      │      order-refund-return.vue //售后
│      │      order-refund-start.vue //售后
│      │      order-refund.vue //售后
│      │      
│      ├─user //用户
│      │      address-from.vue //收货地址编辑
│      │      addresses.vue //收货地址
│      │      favorite.vue //
│      │      friend-list.vue
│      │      message-detail.vue
│      │      message-list.vue
│      │      my-voucher.vue
│      │      question-detail.vue
│      │      question-list.vue
│      │      setting.vue
│      │      
│      └─wallet //钱包
│              my-money.vue
│              transaction-list.vue
│              wallet.vue
│              
└─store //vuex定义
    │  index.js //主
    └─modules
            actionsheet.js
            class_index.js
            common.js
            discovery.js
            home.js
            orderlist.js
            page_load_state.js
```

## 项目如何运行

```
git clone https://github.com/SmallRuralDog/lyf-vue.git
cd lyf-vue
npm install
npm run dev
```
由于开源代码使用的接口是我这边的测试接口，如果需要加入自己的业务请自行开发接口，接口可具体查看源码，或可参考`shopnc`，商城后端是查考`shopnc`开发的，接口返回字段基本和`shopnc`相同

## 项目使用的一些组件
 - axios
 - better-scroll
 - lib-flexible
 - mint-ui
 - vue-awesome-swiper
 - vue-lazyload
 - vue-router
 - vuex


 项目是基于 `vonic 2.0.0-beta.15`搭建，不建议直接做为线上项目，本源码只做为参考学习，大神勿喷！！喜欢的点一下 `star`　！蟹蟹--
 另外我还开源了微信小程序，感兴趣的也可以去看看--

 **说了那么多，无图无真相，直接上demo吧!**

 [(☄⊙ω⊙)☄　点我点我点我](http://tvue.applinzi.com/#/home)

扫一扫⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇

![](http://i1.bvimg.com/1949/64fee2e7dee7b944.png)
