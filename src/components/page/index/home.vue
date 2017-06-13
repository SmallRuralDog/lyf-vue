<template lang="html">
    <div class="page has-tabbar">
        <div class="">
            <div class="topbar">
                <div ref="top_menu" class="top-menu">
                    <ul ref="top_menu_list" class="top-menu-list" :style="'width:'+m_w+'px'">
                        <li ref="top_menu_item" class="top-menu-item" :class="index==active?'active':''" v-for="(item,index) in goods_class" @click="changeMenu(index)">{{item.gc_name}}</li>
                    </ul>
                </div>
                <a class="search-btn J_search-btn"><i class="ion-gear-b"></i></a>
            </div>
            <scroll class="index-scroll page-content" style="top: 0;" :on-refresh="onRefresh" :on-infinite="onInfinite">
                <!--:on-refresh="onRefresh"-->
                <swiper :options="swiperOption"  v-show="active==0">
                  <swiper-slide v-for="slide in swiper_data">
                    <img v-lazy="slide.adv_content" alt="" style="background-color:#ffffff; width:100%; height:3.73rem;">
                  </swiper-slide>
                  <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
                <!--二级分类列表-->
                <div class="hm-content" v-show="subclass.length>0" style="margin-bottom: 0.1rem;">
                    <ul class="category hm-flex" style="flex-wrap:wrap;">
                        <li style="width: 25%;" v-for="item in subclass">
                            <div @click="switchbtn0( $index )">
                                <!-- <a v-link="{name:'categorylist',params:{id:item.cat_id,name:item.cat_name}}"> -->
                                <img :src="item.logo">
                                <span>{{item.gc_name}}</span>
                                <!-- </a> -->
                            </div>
                        </li>
                        <li style="width: 25%;">
                            <div @click="">
                                <!-- <a v-link="{name:'categorylist',params:{id:item.cat_id,name:item.cat_name}}"> -->
                                <img src="../../../assets/images/more_cat.png">
                                <span>查看全部</span>
                                <!-- </a> -->
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="goods-list clear">
                  <div class="hm-list hm-flex"  v-if="goods.length>0" style="flex-wrap:wrap">
                    <div  style="width: 49.4%;margin:0.3%;background: #fff;" v-for="(item,index) in goods">
                      <div class="hm-list-item" style="padding:0" @click="goodsClick(item.goods_id)">
                            <div class="hm-list-inner" style="padding:0">
                                    <img v-lazy="item.goods_image" style="width: 100%;">
                                    <div  style="padding:.13rem .08rem .13rem .08rem;">
                                        <div class="hm-list-title-2 goods-name" style=" height:1.17rem; line-height:.59rem; font-size:.37rem; color:#333;">{{item.goods_name}}</div>
                                        <div class="hm-list-price hm-flex" style=" margin-top:.07rem;justify-content: space-between;">
                                            <div class="" style="color: #ee2e3a;font-weight: 700;">
                                                <span>￥<b><big style="font-size:.48rem;">{{item.goods_price}}</big></b></span>
                                            </div>
                                            <div class="hm-color-gray" style="color:#9c9c9c;">
                                                <small>已售</small>{{item.goods_salenum}}<small>件</small>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                      </div>
                    </div>
                </div>

                <div v-if="!load_more" slot="infinite" @click="goLoad" class="text-center">{{more_data}}</div>
            </scroll>
            <div @click="goTop()" :class="{'top-button-show':page>1}" class="go-top"><span>顶部</span></div>
            <lyf-tab-bar :index="0"></lyf-tab-bar>
        </div>
    </div>
</template>

<script>
import LyfTabBar from '../../layout/lyf-tab-bar';
import {
  mapState,
  mapActions
} from 'vuex'
import BScroll from 'better-scroll'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    LyfTabBar,
    swiper,
    swiperSlide
  },
  data() {
    return {
      m_w: 0,
      menu_item_width: 0,
      menu_len: 0,
      active: 0,
      step_width: 0,
      swiperOption: {
        autoplay: 5000,
        initialSlide: 1,
        loop: true,
        pagination: '.swiper-pagination',
        onSlideChangeEnd: swiper => {
          console.log('onSlideChangeEnd', swiper.realIndex)
        }
      }
    }
  },
  computed: mapState({
    goods_class: state => state.home.goods_class,
    swiper_data: state => state.home.swiper_data,
    list: state => state.home.list,

    goods: state => state.home.list[state.home.active].goods,
    subclass: state => state.home.list[state.home.active].subclass,
    page: state => state.home.list[state.home.active].page,
    is_load: state => state.home.list[state.home.active].is_load,
    load_more: state => state.home.list[state.home.active].load_more,
    more_data: state => state.home.list[state.home.active].more_data,

  }),
  mounted() {
    if (this.goods.length <= 0) {
      this.$store.dispatch('getData', res => {
        this.$nextTick(() => {
          this.initScroll()
          this._setMenuW()
        });
      })
    }
  },
  methods: {
    initScroll() {
      if (this.scroll) {
        this.scroll.refresh()
      } else {
        this.scroll = new BScroll(this.$refs.top_menu, {
          startX: 0,
          startY: 0,
          scrollX: true,
          click: true
        })
      }
      var top_menu = this.$refs.top_menu
      var top_menu_w = top_menu.clientWidth
      this.step_width = (this.m_w - top_menu_w) / (this.menu_len - 3);
      console.log('top_menu_w=', top_menu_w, 'step_width=', this.step_width)
    },
    _setMenuW() {
      var items = this.$refs.top_menu_item;
      var a = 0;
      this.menu_item_width = items[0].clientWidth;
      this.menu_len = items.length;

      for (var index in items) {
        a = a + items[index].clientWidth
      }
      this.m_w = a

      this.$nextTick(() => {
        this.initScroll()
      })
    },
    changeMenu(index) {
      //移动menu
      this.active = index;
      this.$store.commit('UPDATE', { active: index })
      if (index >= 1 && index < this.menu_len) {
        this.scroll.scrollTo(-this.step_width * (index - 1), 0, 500);
        console.log(index, -this.step_width * (index - 1));
      }
      if (index == this.menu_len) {
        this.scroll.scrollTo(-this.step_width * (index - 2), 0, 500);
        console.log(index, -this.step_width * (index - 2));
      }
      //请求数据
      if (this.list[this.active].init == false) {
        this.$store.dispatch('getData', res => {})
      }

    },
    goodsClick(id) {
      $router.push({
        name: 'goods_detail',
        params: {
          id: id,
        }
      });
    },
    goLoad() {
      if (this.is_load) return;
      $loading.show('拼命加载中..')
      this.$store.commit('UPDATE_LIST', {
        more_data: "没有更多数据",
        load_more: true
      })
      this.$store.dispatch('getData', res => {

      })
    },
    onRefresh(done) {
      if (this.is_load) return;
      this.$store.commit('UPDATE_LIST', {
        page: 1,
        load_more: true
      })
      this.$store.dispatch('getData', res => {
        done()
      })
    },
    onInfinite(done) {
      if (this.is_load || !this.load_more) return;
      this.$store.commit('UPDATE_LIST', {
        page: this.page + 1
      })
      this.$store.dispatch('getData', res => {
        done()
      })
    },
    goTop() {
      document.querySelector(".scroll").scrollTop = 0
    }
  }
}
</script>

<style lang="scss">
.topbar {
    height: 1.07rem;
    background: #ffffff;
    z-index: 2000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    color: #333;
}
.top-menu {
    overflow: hidden;
    // padding-left: 0.27rem;
}

.top-menu-list {
    height: 1.07rem;
    width: 100%;
    display: flex;
}

.top-menu-item {
    min-width: 1.33rem;
    // font-weight: bold;
    height: 100%;
    font-size: 0.37rem;
    text-align: center;
    line-height: 1.07rem;
}
.top-menu-item:first {
    padding-left: 0.53rem;
}

.top-menu-list .active {
    color: #ea5a49;
    border-bottom: 0.08rem solid #ea5a49;
    font-weight: bold;
}

.search-btn {
    line-height: 1.07rem;
    padding: 0 0.27rem;
    text-align: center;
    display: inline-block;
}

.search-btn i {
    font-size: 0.59rem;
    color: #333;
}

.index-scroll {
    top: 1.07rem;
}

.my-swipe {
    height: 3.73rem;
    width: 100%;
    color: #fff;
    text-align: center;
}

.goods-list {
    width: 10rem;
}

.goods-list .goods-item {
    width: 5rem;
    float: left;
}

.goods-list .goods-item .goods-item-image img {
    width: 100%;
}
.goods-item-content {
    background: #ffffff;
}
.goods-item-l {
    margin-right: 0.05rem;
    margin-top: 0.05rem;
}
.goods-item-r {
    margin-left: 0.05rem;
    margin-top: 0.05rem;
}
.goods-name {
    overflow: hidden;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.hm-flex {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.hm-flex-1,
.hm-flex-item {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
}
.hm-flex-2 {
    -webkit-box-flex: 2;
    -ms-flex: 2;
    flex: 2;
}
.hm-flex-3 {
    -webkit-box-flex: 3;
    -ms-flex: 3;
    flex: 3;
}
.hm-margin-b,
.hm-margin-b-m,
.hm-margin-tb,
.hm-margin-tb-m {
    margin-bottom: 0.6rem;
}
.category {
    overflow: hidden;
    background: #fff;
    li {
        padding: 0.27rem 0;
        box-sizing: border-box;
        text-align: center;
        font-size: 0.27rem;
    }
    img {
        width: 50%;
        min-width: 1.01rem;
        max-width: 1.92rem;
        display: block;
        margin: 0 auto;
    }
}

#go-top,
.go-top {
    display: block;
    width: 42px;
    height: 42px;
    position: fixed;
    right: 0.53rem;
    bottom: 1.71rem;
    z-index: 999;
    background-image: url("../../../assets/images/go_top-005163a986.png");
    background-size: contain;
    opacity: 0;
    -webkit-transition: bottom 0.8s ease,opacity 0.6s ease;
}
#go-top span,
.go-top span {
    position: absolute;
    bottom: 0.19rem;
    width: 100%;
    display: block;
    height: 12px;
    line-height: 0.32rem;
    text-align: center;
    font-size: 0.27rem;
    color: #333;
}
.top-button-hide {
    bottom: -64px;
    opacity: 0;
}
.top-button-show {
    bottom: 64px;
    opacity: 1;
}
.swiper-pagination-bullet-active{
  background:#e02e24;
}
</style>
