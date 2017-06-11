<template lang="html">
    <div class="page has-tabbar">
        <div class="">
            <div class="topbar">
                <div ref="top_menu" class="top-menu">
                    <ul ref="top_menu_list" class="top-menu-list" :style="'width:'+m_w+'px'">
                        <li ref="top_menu_item" class="top-menu-item" :class="index==0?'active':''" v-for="(item,index) in goods_class">{{item.gc_name}}</li>
                    </ul>
                </div>
                <a class="search-btn J_search-btn"><i class="ion-gear-b"></i></a>
            </div>
            <scroll class="index-scroll page-content" style="top: 0;" :on-refresh="onRefresh" :on-infinite="onInfinite">
                <!--:on-refresh="onRefresh"-->
                <div class="my-swipe">
                    <swipe :speed="200" :auto="8000" :continuous="false" :prevent="true">
                        <swipe-item v-for="item in swiper_data" :key="item.adv_title">
                            <img v-lazy="item.adv_content" alt="" style="background-color:#ffffff; width:100%; height:3.73rem;">
                        </swipe-item>
                    </swipe>
                </div>
                <div>
                    <div class="g-nav">
                        <div class="nav_item" v-for="item in grid_nav">
                            <img v-lazy="item.pic" alt="" style="background-color:#ffffff; margin-bottom:.27rem;">
                            <p class="font-s-14">{{item.name}}</p>
                        </div>
                    </div>
                </div>
                <div class="goods-list clear">

                    <div class="goods-item" v-for="(item,index) in goods">
                        <div class="goods-item-content" :class="index % 2 == 0?'goods-item-l':'goods-item-r'">
                            <div class="goods-item-image">
                                <img v-lazy="item.goods_image" />
                            </div>
                            <div class="goods-name">
                              {{item.goods_name}}
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="!load_more" slot="infinite" @click="goLoad" class="text-center">{{more_data}}</div>
            </scroll>
        </div>
    </div>
</template>

<script>
require('vue-swipe/dist/vue-swipe.css');
import {
    mapState,
    mapActions
} from 'vuex'
import {
    Swipe,
    SwipeItem
} from 'vue-swipe';
import BScroll from 'better-scroll'
export default {
    components: {
        'swipe': Swipe,
        'swipe-item': SwipeItem
    },
    data() {
        return {
            m_w: 0
        }
    },
    computed: mapState({
        goods_class: state => state.home.goods_class,
        swiper_data: state => state.home.swiper_data,
        grid_nav: state => state.home.grid_nav,
        goods: state => state.home.goods,
        page: state => state.home.page,
        is_load: state => state.home.is_load,
        load_more: state => state.home.load_more,
        more_data: state => state.home.more_data,
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
                })
            }
        },
        _setMenuW() {
            var items = this.$refs.top_menu_item;
            var a = 0;
            for (var index in items) {
                a = a + items[index].clientWidth
            }
            this.m_w = a
            this.$nextTick(() => {
                this.initScroll()
            })
        },
        newsClick() {
            $router.push({
                name: 'news-info',
                params: {
                    id: item.id,
                    news: item
                }
            });
        },
        goLoad() {
            if (this.is_load) return;
            $loading.show('拼命加载中..')
            this.$store.commit('UPDATE', {
                more_data: "没有更多数据",
                load_more: true
            })
            this.$store.dispatch('getData', res => {

            })
        },
        onRefresh(done) {
            if (this.is_load) return;
            this.$store.commit('UPDATE', {
                page: 1,
                load_more: true
            })
            this.$store.dispatch('getData', res => {
                done()
            })
        },
        onInfinite(done) {
            if (this.is_load || !this.load_more) return;
            this.$store.commit('UPDATE', {
                page: this.page + 1
            })
            this.$store.dispatch('getData', res => {
                done()
            })
        },
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
.topbar:after {
    position: absolute;
    content: "";
    width: 100%;
    left: 0;
    bottom: 0;
    height: 1px;
    background-color: #e0e0e0;
    -webkit-transform: scale(1, .5);
    transform: scale(1, .5);
    -webkit-transform-origin: center bottom;
    transform-origin: center bottom;
}

.top-menu {
    overflow: hidden;
    padding-left: 0.27rem;
}

.top-menu-list {
    height: 1.07rem;
    width: 100%;
    display: flex;
}

.top-menu-item {
    min-width: 1.33rem;
    font-weight: bold;
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
.goods-item-content{
  background: #ffffff;
}
.goods-item-l {
    margin-right: .05rem;
    margin-top: .05rem;
}
.goods-item-r {
    margin-left: .05rem;
    margin-top: .05rem;
}
 .goods-item .goods-name {
    padding: 0.1rem 0.09rem 0 0.1rem;
    width: 100%;
    word-wrap: break-word;
    text-align: justify;
    font-size: .37rem;
    color: #333;
    line-height: 1.5;
    overflow: hidden;
word-break: break-all;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
}
</style>
