<template lang="html">
<div class="page">
  <div class="topbar">
      <div ref="list_top_menu" class="top-menu">
          <ul ref="list_top_menu_list" class="top-menu-list" :style="'width:'+m_w+'px'">
              <li ref="list_top_menu_item" class="top-menu-item" :class="index==active?'active':''" v-for="(item,index) in goods_class" @click="changeMenu(index,item.gc_id)">{{item.gc_name}}</li>
          </ul>
      </div>
      </div>
      <scroll ref="lyf_scroll" class="index-scroll page-content" style="top: 1.07rem;" :on-infinite="onInfinite">
        <div class="goods-list clear">
          <div class="hm-list hm-flex" style="flex-wrap:wrap">
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

</div>
</template>

<script>
import BScroll from 'better-scroll'
import scroll from '../layout/scroll.vue';
import {
  mapState,
  mapActions
} from 'vuex'
export default {
  name: "catgoods",
  components: {
    scroll
  },
  data() {
    return {
      goods_class: [],
      goods: [],
      m_w: 0,
      page: 1,
      is_load: false,
      load_more: true,
      more_data: '-- 没有更多了 --',
    }
  },
  computed: {
    ...mapState({
      cat_goods_list_class_id: state => state.common.cat_goods_list_class_id,
      cat_goods_list_class_init_menu: state => state.common.cat_goods_list_class_init_menu,
      active: state => state.common.cat_goods_list_class_active,
    }),
  },
  watch: {
    cat_goods_list_class_id: function(val, oldVal) {
      if (val != oldVal) {
        this.page = 1
        this.m_w = 0
        this.load_more = true
        this.$refs.lyf_scroll.setscrollTop(0)
        this.getData(() => {

        })
      }
    }
  },
  mounted() {
    this.gc_id = this.$route.params.gc_id;
    if (this.gc_id > 0) {
      this.$store.commit('UPDATE_COMMON_DATA', {
        cat_goods_list_class_id: this.gc_id
      })
    }
    this.getData(() => {})
  },
  methods: {
    getData(done) {
      this.is_load = true
      this.$api.userGet('goods_list?gc_id=' + this.cat_goods_list_class_id + '&page=' + this.page, res => {
        if (res.data.data.goods_list.current_page == 1) {
          if (!this.cat_goods_list_class_init_menu) {

            this.goods_class = res.data.data.goods_class
          }
          this.goods = res.data.data.goods_list.data
        } else {
          for (var index in res.data.data.goods_list.data) {
            this.goods.push(res.data.data.goods_list.data[index])
          }
        }
        if (this.page == res.data.data.goods_list.last_page || res.data.data.goods_list.total == 0) {
          this.load_more = false
        }

        this.$nextTick(() => {
          if (!this.cat_goods_list_class_init_menu) {
            this._initScroll()
            this._setMenuW()
            this.$store.commit('UPDATE_COMMON_DATA', {
              cat_goods_list_class_init_menu: true
            })
          }
          done()
          this.$refs.lyf_scroll.infiniteDone()
          this.is_load = false
        })
      }, error => {
        $toast.show(error.message)
        this.$refs.lyf_scroll.infiniteDone()
        this.is_load = false
        this.load_more = false
        this.more_data = "加载失败，点击重新加载"
      })
    },
    _initScroll() {
      if (this.list_top_menu) {
        this.list_top_menu.refresh()
      } else {
        this.list_top_menu = new BScroll(this.$refs.list_top_menu, {
          startX: 0,
          startY: 0,
          scrollX: true,
          click: true
        })
      }
    },
    _setMenuW() {
      var items = this.$refs.list_top_menu_item;
      var a = 0;
      for (var index in items) {
        a = a + items[index].clientWidth
      }
      this.m_w = a
      this.$nextTick(() => {
        this._initScroll()
      })
    },
    changeMenu(index, gc_id) {
      if (this.active == index) return;
      this.$store.commit('UPDATE_COMMON_DATA', {
        cat_goods_list_class_id: gc_id,
        cat_goods_list_class_active: index
      })
      this.page = 1
      this.is_load = false
      this.load_more = true
      this.more_data = "没有更多数据"
      $loading.show("加载中")
      this.getData(() => {
        $loading.hide()
        this.$refs.lyf_scroll.setscrollTop(0)
      })

    },
    goLoad() {
      if (this.is_load || !this.load_more) return;
      $loading.show('拼命加载中..')
      this.more_data = "没有更多数据"
      this.load_more = true
      this.getData(() => {})
    },
    onInfinite(done) {
      if (this.is_load || !this.load_more) return;
      this.page = this.page + 1
      this.getData(done)
    },
    goodsClick(id) {
      $router.push({
        name: 'goods_detail',
        params: {
          id: id,
        }
      });
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
    padding: 0 0.27rem;
    height: 100%;
    font-size: 0.37rem;
    text-align: center;
    line-height: 1.07rem;
    flex-grow: 1;
    flex-shrink: 0;
}

.top-menu-list .active {
    color: #ea5a49;
    border-bottom: 0.08rem solid #ea5a49;
    font-weight: bold;
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
</style>
