import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Vonic from 'vonic'
Vue.use(Vonic)
import BUS from './bus.js'
//popup插件
import {
  Popup
} from 'mint-ui';
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

//路由 懒加载
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
const order_detail = resolve => require(['./components/page/order/order-detail.vue'], resolve)
const order_logistics = resolve => require(['./components/page/order/order-logistics.vue'], resolve)
const order_rate = resolve => require(['./components/page/order/order-rate.vue'], resolve)
const store_home = resolve => require(['./components/page/store_home.vue'], resolve)
const favorite = resolve => require(['./components/page/user/favorite.vue'], resolve)

const order_refund = resolve => require(['./components/page/order/order-refund.vue'], resolve)
const login = resolve => require(['./components/page/login.vue'], resolve)
const auth = resolve => require(['./components/page/auth.vue'], resolve)


// Routes
const routes = [{
    path: '/',
    redirect: '/home',
    component: Index,
    children: [{
        path: '/home',
        name: 'home',
        component: Home
      },
      {
        path: 'new_arrivals',
        name: 'new_arrivals',
        component: new_arrivals
      },
      {
        path: 'class_all',
        name: "class_all",
        component: ClassAll
      },
      {
        path: 'cart',
        name: 'cart',
        component: Cart
      },
      {
        path: 'user',
        name: 'user',
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
        path: '/order_buynow/:cart_id-:ifcart', //（购物车，快速购买）下单第一步  参数格式  :cart_id（产品ID|购买数量）  :ifcart  (true or false) 是否从购物车
        name: 'order_buynow',
        component: order_buynow
      },
      {
        path: '/order-list/:type',
        name: 'order_list',
        component: order_list
      },
      {
        path: '/order-detail/:order_id',
        name: 'order_detail',
        component: order_detail
      },
      {
        path: '/order-logistics/:order_id',
        name: 'order_logistics',
        component: order_logistics
      },
      {
        path: '/order-rate/:order_id',
        name: 'order_rate',
        component: order_rate
      },
      {
        path: '/order-refund/:order_id/:goods_id',
        name: 'order_refund',
        component: order_refund
      },
      {
        path: '/store/:store_id',
        name: 'store_home',
        component: store_home
      },
      {
        path: '/login',
        name: 'login',
        component: login
      },
      {
        path: '/auth/:token',
        name: 'auth',
        component: auth
      },
      {
        path: '/favorite',
        name: 'favorite',
        component: favorite
      },
    ]

  },

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

//过滤器
import filters from './api/filter'

import store from './store'
Vue.use(Vonic.app, {
  store: store,
  routes: routes,

})
