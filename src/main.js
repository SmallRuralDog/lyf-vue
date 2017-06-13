import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Vonic from 'vonic'
Vue.use(Vonic)


import 'lib-flexible/flexible'
import './assets/common.scss'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1
})
// Page Components
const Index = resolve => require(['./components/Index'], resolve)
const Home = resolve => require(['./components/page/index/home.vue'], resolve)
const Cart = resolve => require(['./components/page/index/cart.vue'], resolve)
const User = resolve => require(['./components/page/index/user.vue'], resolve)
const ClassAll = resolve => require(['./components/page/index/class_all.vue'], resolve)
const goods_detail = resolve => require(['./components/page/goods_detail.vue'], resolve)
// Routes
const routes = [{
    path: '/',
    redirect: '/home',
    component: Index,
    children: [{
        path: 'home',
        component: Home
      },
      {
        path: 'class_all',
        component: ClassAll
      },
      {
        path: 'cart',
        component: Cart
      },
      {
        path: 'user',
        component: User
      }, {
        path: '/goods/:goods_id',
        name: 'goods_detail',
        component: goods_detail
      }
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

import store from './store'
Vue.use(Vonic.app, {
  store: store,
  routes: routes,
})
