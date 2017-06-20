import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Vonic from 'vonic'
Vue.use(Vonic)
import BUS from './bus.js'
//popup插件
import { Popup } from 'mint-ui';
Vue.component(Popup.name, Popup);

import 'lib-flexible/flexible'
import './assets/common.scss'
//图标
import './assets/icon/iconfont.css'

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
    try: 3,
})
// Page Components
const Index = resolve => require(['./components/Index'], resolve)
const Home = resolve => require(['./components/page/index/home.vue'], resolve)
const new_arrivals = resolve => require(['./components/page/index/new_arrivals.vue'], resolve)
const Cart = resolve => require(['./components/page/index/cart.vue'], resolve)
const User = resolve => require(['./components/page/index/user.vue'], resolve)
const ClassAll = resolve => require(['./components/page/index/class_all.vue'], resolve)
const goods_detail = resolve => require(['./components/page/goods_detail.vue'], resolve)
const catgoods = resolve => require(['./components/page/catgoods.vue'], resolve)
const address = resolve => require(['./components/page/user/addresses.vue'], resolve)
const order_buynow = resolve => require(['./components/page/order/buy-now.vue'], resolve)
const order_list = resolve => require(['./components/page/order/order-list.vue'], resolve)
// Routes
const routes = [{
    path: '/',
    redirect: '/home',
    component: Index,
    children: [
      {
        path: '/home',
          name:'home',
        component: Home
      },
      {
        path: 'new_arrivals',
        component: new_arrivals
      },
      {
        path: 'class_all',
        name:"class_all",
        component: ClassAll
      },
      {
        path: 'cart',
        component: Cart
      },
      {
        path: 'user',
        component: User
      },
      {
        path: '/goods/:id',
        name: 'goods_detail',
        component: goods_detail
      },
      {
        path: '/catgoods/:gc_id',
        name: 'catgoods',
        component: catgoods
      },
      {
        path: '/address',
        name: 'address',
        component: address
      },
      {
        path: '/order_buynow/:cart_id-:ifcart',//（购物车，快速购买）下单第一步  参数格式  :cart_id（产品ID|购买数量）  :ifcart  (true or false) 是否从购物车
        name: 'order_buynow',
        component: order_buynow
      },
        {
            path: '/order_list/:id',
            name: 'order_list',
            component: order_list
        },
    ]

  },
  // {
  //   path: '/goods/:id',
  //   name: 'goods_detail',
  //   component: goods_detail
  // },
]
//******************************//
import sess from './api/sess'
Vue.prototype.$sess = sess;
const beforeEach = (toRoute, fromRoute, next) => {
  const to = toRoute.path
  const from = fromRoute.path
  const scrollTop = Vonic.app.pageContentScrollTop()

  let h = sess.get(to)
  if (h && h.history) {
    Vonic.app.nextDirection('') //back
    h.history = true
    sess.set(to, h)
  } else {
    sess.set(from || '/', {
      history: true,
      scrollTop: scrollTop
    })
    Vonic.app.nextDirection('') //forward
  }
  next()
}
const afterEach = (toRoute, fromRoute) => {
  const to = toRoute.path
  const from = fromRoute.path
  const h = sess.get(to)
  if (h && h.scrollTop) {
    Vue.nextTick(() => {
      Vonic.app.pageContentScrollTop(h.scrollTop)
    })
  }
}
Vonic.app.setConfig('beforeEach', beforeEach)
Vonic.app.setConfig('afterEach', afterEach)

//注册全局方法
import api from './api/methods'
Vue.prototype.$api = api;

import store from './store'
Vue.use(Vonic.app, {
  store: store,
  routes: routes,
})
