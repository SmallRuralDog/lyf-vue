<template>
<div class="page">
  <!--固定不动的元素 要放到page-content的外面-->
  <div class="download-app">
    <i class="iconfont icon-houtui2" @click="goback"></i>
  </div>
  <div class="page-content" v-show="init" style="padding-bottom: 1.87rem;">
    <!-- 页面内容 -->
    <scroll>
    <swiper ref="goods_swiper" :options="swiperOption" v-bind:style="{height: swipe_height+'px'}" style="position: relative;z-index: 1;">
      <template v-for="(slide,index) in data.goods_image">
          <swiper-slide>
              <img :src="slide" v-show="init" alt="" style="background-color:#ffffff; width:100%;" @click="goods_img_show(index)">
          </swiper-slide>
      </template>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <div class="infos">
      <div class="area">
        <div class="prices" style="display: flex;align-items: center;width:100%;">
          <div class="price theme-txt" style="color:#e02e24">¥<i>{{data.goods_info.goods_price|price_yuan}}</i><b><big>{{data.goods_info.goods_price|price_jiao}}</big></b></div>
          <div class="price-old">¥268</div>
          <div style="padding-left: .27rem;">
            <div class="aui-label aui-label-danger" style="font-size: .27rem;height:.37rem;line-height: .4rem;padding: 0px .08rem;margin:0 .13rem;">拼团价</div>
            <div class="aui-label aui-label-danger" style="font-size: .27rem;height:.37rem;line-height: .4rem;padding: 0px .08rem;">包邮</div>
          </div>
        </div>
      </div>
      <div class="product hm-flex" style="padding-top: .16rem;">
        <h3 class="hm-flex-1">
          <span>{{data.goods_info.goods_name}}</span>
        </h3>
        <div class="hm-flex" @click="collect(data.goods_info.goods_id)" style="width: 1.2rem;flex-direction: column;align-items:center;font-size: .27rem;padding-left: .13rem;">
          <i class="iconfont icon-favorite" :class="{'color-theme':collected}" style="font-size: .59rem;"></i>
          <template v-show="collected">已</template>收藏
        </div>
      </div>
    </div>
    <!--<div class="hm-margin-b promise-block" style="background: #fff;padding:0 .27rem .27rem;">-->
    <!--<div class="hm-flex">-->
    <!--<div class="hm-flex-1"><i class="iconfont icon-shouye"></i>正品保证</div>-->
    <!--<div class="hm-flex-1"><i class="iconfont icon-shouye"></i>全场包邮</div>-->
    <!--<div class="hm-flex-1"><i class="iconfont icon-shouye"></i>24h发货</div>-->
    <!--<div class="hm-flex-1"><i class="iconfont icon-shouye"></i>售后补贴</div>-->
    <!--</div>-->
    <!--</div>-->

    <ul class="aui-list" v-if="data.voucher_list != ''">
      <li class="aui-list-item aui-list-item-middle" style="height:1.07rem; min-height:1.07rem;" @click="neck_voucher()">
        <div class="aui-list-item-inner " style="height:1.07rem; min-height:1.07rem;">
          <div class="goods-voucher">
            <div class="goods-voucher-name">领券</div>
            <div class="goods-voucher-list">
              <span v-if="index<3" v-for="(item,index) in data.voucher_list">满{{item.voucher_t_limit}}减{{item.voucher_t_price}}</span>
            </div>
          </div>
          <i class="icon ion-android-more-horizontal color-royal"></i>
        </div>
      </li>
    </ul>


    <ul class="aui-list hm-margin-b mt-10" @click="add">
      <li class="aui-list-item aui-list-item-middle">
        <div class="aui-list-item-inner ">
          已选
          <template v-if="data.goods_info.goods_spec">
                        <template v-for="value in cur_spec_namex">
                            <!--data.goods_info.goods_spec-->
                            "{{value}}"
                        </template>
          </template>
          "数量:{{quantityx}}"
          <i class="icon ion-ios-arrow-right" style="color: #DDD;"></i>
        </div>
      </li>
    </ul>

    <ul class="aui-list ">
      <li class="aui-list-item aui-list-item-middle" @click="go_comment(goods_id)">
        <div class="aui-list-item-inner ">
          买家口碑
          <i class="icon ion-ios-arrow-right" style="color: #DDD;"></i>
        </div>
      </li>
    </ul>

    <div class="reviews hm-margin-b">
      <ul class="review-list">
        <li class="review-item aui-border-b" v-for="item in data.goods_eval_list">
          <p style="margin-bottom: 0;">
            <img v-lazy="item.avatar" class="head-img lazyimg b-lazy b-loaded">
            <span class="nick">{{item.nick}}</span>
            <!--<span class="join-time">在贝贝188天</span>-->
            <span class="score">
              <i class="iconfont icon-favorite active " v-for="i in item.geval_scores"></i>
            </span>
          </p>

          <p class="content">{{item.geval_content}}</p>

          <p class="sku-info" v-if="item.geval_goodsspec != null">
            <span>{{item.geval_goodsspec}}</span>
          </p>
        </li>

      </ul>
    </div>


    <div class="hm-flex" @click="go_store(data.store_info.store_id)" style="background: #fff;padding: .4rem .4rem 0;">
      <img v-lazy="data.store_info.store_label" style="width:.93rem; height:.93rem; margin-right:.13rem; border-radius:.05rem;" class="aui-border">
      <div class="text-14" style="flex:1">{{data.store_info.store_name}}</div>
      <div class="join-store-btn" id="instore"> 进店逛逛</div>
    </div>

    <ul class="event-list hm-margin-b">
      <li class="event-item aui-border-r">
        <span class="event-item-num">{{data.store_info.goods_count}}件</span>
        <span class="event-item-text">全部商品</span>
      </li>
      <li class="event-item aui-border-r">
        <span class="event-item-num">{{data.store_info.buy_count}}</span>
        <span class="event-item-text">购买人数</span>
      </li>
      <li class="event-item">
        <span class="event-item-num">{{data.store_info.collect_count}}</span>
        <span class="event-item-text">收藏人数</span>
      </li>
      <li class="event-item  aui-border-l" style="flex:1.5;" v-if="data.store_info.store_credit.length>1">
        <ul class="logis-list">
          <li>
            <span>{{data.store_info.store_credit.store_deliverycredit.text}}评价</span>
            <span style="color: #FF4965" class="logis-score">{{data.store_info.store_credit.store_deliverycredit.credit}}</span>
            <span style="color: #FF4965" class="logis-val">{{data.store_info.store_credit.store_deliverycredit.percent_text}}</span>
          </li>
          <li>
            <span>{{data.store_info.store_credit.store_servicecredit.text}}评价</span>
            <span style="color: #8F8F8F" class="logis-score">{{data.store_info.store_credit.store_servicecredit.credit}}</span>
            <span style="color: #8F8F8F" class="logis-val">{{data.store_info.store_credit.store_servicecredit.percent_text}}</span>
          </li>
          <li>
            <span>{{data.store_info.store_credit.store_desccredit.text}}评价</span>
            <span style="color: #8F8F8F" class="logis-score">{{data.store_info.store_credit.store_desccredit.credit}}</span>
            <span style="color: #8F8F8F" class="logis-val">{{data.store_info.store_credit.store_desccredit.percent_text}}</span>
          </li>
        </ul>
      </li>
    </ul>


    <div class="text-14" style="background: #fff;padding: .27rem .27rem .16rem;">店铺推荐</div>
    <div style="background: #fff;" ref="store_hot_scl">
      <div class="hm-flex" :style="'width:'+store_hot_list_w+'px'">
        <template v-for="goods in data.store_hot">
                <div  ref="store_hot_scl_item" @click="go_goods(goods.goods_id)">
                    <div style="width:130px; margin:5px;">
                        <img v-lazy="goods.goods_image" style="background-color:#ffffff; width:100%;">
                        <p class="aui-ellipsis-2">{{goods.goods_name}}</p>
                    </div>
                </div>
            </template>
      </div>

    </div>

    <div class="mobile_body">
      <div class="text-14" style="background: #fff;padding: .27rem .27rem .16rem;">商品详情</div>
      <template v-for="item in data.goods_info.mobile_body">
        <img v-if="item.type=='image'" v-lazy="item.value" alt="">
        <p v-else-if="item.type=='text'" v-html="item.value"></p>
      </template>
    </div>

    </scroll>


  </div>
  <!--固定不动的元素 要放到page-content的外面-->
  <div class="submit-order">
    <div class="hm-center hm-flex" style="padding: 0;margin: 0;height:100%;">
      <div style="flex:0.15"></div>
      <div class="hm-flex-1 icon-align" @click="gohome">
        <i class="iconfont icon-shouye-shouye"></i>
      </div>
      <div class="hm-flex-1 icon-align hm-border-l" @click="gocart" style="position: relative;">
        <i class="iconfont icon-gouwuche1"></i>
        <div v-show="cartNumber>0" class="cart-badge">{{cartNumber}}</div>
      </div>
      <div style="flex:0.15"></div>
      <div class="hm-flex-2 buy-align cart" style="flex:2.5" @click="add">
        <span>加入购物车</span>
      </div>
      <div class="hm-flex-2 buy-align" style="flex:2.5" @click="buy">
        <span>立即购买</span>
      </div>
    </div>
  </div>

  {{/*属性选择*/}}
  <actionsheet :data="data" :goodsid="goods_id" :init_spec="init_spec" :init_spec_name="init_spec_name" @refresh_goods_data="refreshGoodsData"></actionsheet>

  {{/*店铺优惠券*/}}
  <voucher-list :popupVisible="voucherPopupVisible" :voucherlist="data.voucher_list" :storename="data.store_info.store_name" :from="'goods'"></voucher-list>
</div>
</template>

<script>
import {
  swiper,
  swiperSlide
}
from 'vue-awesome-swiper'
import actionsheet from '../../layout/action-sheet.vue';
import {
  mapState,
  mapActions
}
from 'vuex'
import VoucherList from '../../layout/voucher-list.vue'
import bus from "../../../bus.js"
import BScroll from 'better-scroll'

function dataInit() {
  return {
    voucherPopupVisible: false,
    init: false,
    goods_id: null,
    data: {
      goods_image: [],
      goods_info: {
        goods_price: 0,
        color_id: 0,
        goods_name: '',
        spec_name: [],
        spec_value: [],
        goods_spec: [],
      },
      spec_image: {},
      store_info: {
        buy_count: '',
        collect_count: '',
        goods_count: '',
        store_credit: {
          store_deliverycredit: {},
          store_desccredit: {},
          store_servicecredit: {}
        }
      },
    },
    swipe_height: 100,
    cartNumber: 5,
    swiperOption: {
      autoplay: 4000,
      initialSlide: 0,
      loop: true,
      pagination: '.swiper-pagination',
    },
//    swiperOption2: {
//      initialSlide: 0,
//      loop: true,
//      pagination: '.swiper-pagination',
//    },
    collected: false, //已收藏
    store_hot_list_w: 0
  }
}
export default {
  name: 'goods_detail',
  data: dataInit,
  components: {
    swiper,
    swiperSlide,
    actionsheet,
    VoucherList
  },
  created() {
    this.swipe_height = screen.width;
  },
  mounted() {
    bus.$on("onVoucherState", res => {
      console.log(res);
      this.voucherPopupVisible = res
    })
  },
  methods: {
    _initScroll() {
      let items = this.$refs.store_hot_scl_item;
      this.store_hot_list_w=0;
      items.map(a => {
        this.store_hot_list_w += a.clientWidth
      })
      this.$nextTick(() => {
        if (this.store_hot_scl) {
          this.store_hot_scl.refresh()
        } else {
          this.store_hot_scl = new BScroll(this.$refs.store_hot_scl, {
            scrollX: true,
            scrollY:false,
            click:false
          })
        }
      })
    },
    getData() {
      $loading.show("")
      this.$api.userGet('goods_info?goods_id=' + this.goods_id, res => {
        //console.log(JSON.stringify(res.data));
        this.data = res.data.data;
        this.init = true;
        $loading.hide();
        //更新init_spec，init_spec_name至vuex
        this.$store.commit('ACTIONSHEET_UPDATE', {
          key: 'cur_specx',
          value: this.init_spec
        })
        this.$store.commit('ACTIONSHEET_UPDATE', {
          key: 'cur_spec_namex',
          value: this.init_spec_name
        })
        this.$nextTick(() => {
          this.goTop()
          this._initScroll()

        })
      }, err => {
        //$toast(err)
      })
    },
    refreshGoodsData(id) {
      console.log('refreshGoodsData(id)..', this.goods_id)
      this.$api.userGet('goods_info?goods_id=' + id, res => {
        this.data = res.data.data;
        //更新init_spec，init_spec_name至vuex
        this.$store.commit('ACTIONSHEET_UPDATE', {
          key: 'cur_specx',
          value: this.init_spec
        })
        this.$store.commit('ACTIONSHEET_UPDATE', {
          key: 'cur_spec_namex',
          value: this.init_spec_name
        })
        //将幻灯片跳到第一张
        this.swiper.slideTo(1, 0, false)
      }, err => {
        //$toast(err)
      })
    },
    collect(id) {
      $loading.show()
      this.$api.userAuthGet('favorites_add_goods?goods_id=' + id, res => {
        this.collected = true;
        $loading.hide()
        $toast.show('收藏成功', 3000)
      }, err => {
        $toast.show(err)
      })
    },
    goback() {
      this.$router.go(-1)
    },
    gohome() {
      this.$router.push('/home')
    },
    go_store(id) {
      $router.push({
        name: 'store_home',
        params: {
          store_id: id
        }
      })
    },
    go_goods(id){
      this.goods_id=id
      $router.push({
        name: 'goods_detail',
        params: {
          id: id
        }
      })
    },
    goTop() {

      document.querySelector(".scroll").scrollTop = 0
    },
    go_comment(id) {
      $router.push({
        name: 'comment_list',
        params: {
          id: id
        }
      })
    },
    gocart() {
      this.$router.push('/cart')
    },
    add() {
      // this.popupVisible=true
      this.$store.commit('ACTIONSHEET_UPDATE', {
        key: 'showpicksheet',
        value: true
      })
      if (this.firstTimeOpenSheet == false) {
        this.$store.commit('ACTIONSHEET_UPDATE', {
          key: 'firstTimeOpenSheet',
          value: true
        })
      }
    },
    buy() {
      // this.popupVisible=true
      this.$store.commit('ACTIONSHEET_UPDATE', {
        key: 'showpicksheet',
        value: true
      })
      if (this.firstTimeOpenSheet == false) {
        this.$store.commit('ACTIONSHEET_UPDATE', {
          key: 'firstTimeOpenSheet',
          value: true
        })
      }
    },
    quit() {
      console.log("quit");
      this.$store.commit('ACTIONSHEET_UPDATE', {
        key: 'showpicksheet',
        value: false
      })
    },
    goods_img_show(index) {
      if (typeof WeixinJSBridge != "undefined") {
        WeixinJSBridge.invoke('imagePreview', {
          'current': this.data.goods_image[index],
          'urls': this.data.goods_image
        });
      }
    },
    neck_voucher() {
      this.voucherPopupVisible = true
    }
  },
  computed: {
    ...mapState({
      showpicksheet: state => state.actionsheet.showpicksheet,
      firstTimeOpenSheet: state => state.actionsheet.firstTimeOpenSheet,
      cur_spec_namex: state => state.actionsheet.cur_spec_namex,
      quantityx: state => state.actionsheet.quantityx,
    }),

    init_spec() { //默认属性id数组
      //            console.log('init_spec_keys')
      let goods_spec = this.data.goods_info.goods_spec
      let spec_value = this.data.goods_info.spec_value
      let spec_key = {}
      let spec_arr = []
      for (var goodsKey in goods_spec) {
        for (var valueKey in spec_value) {
          let valueJson = spec_value[valueKey]
          for (var keyValueJson in valueJson) {
            if (keyValueJson == goodsKey) {
              spec_key[valueKey] = keyValueJson
            }
          }
        }
      }
      for (var i in spec_key) {
        spec_arr.push(spec_key[i])
      }
      //            console.log('spec_key=',JSON.stringify(spec_key))
      //            console.log('spec_arr=',spec_arr)
      return spec_arr
    },
    init_spec_name() { //默认属性名数组
      //            console.log('init_spec_keys')
      let goods_spec = this.data.goods_info.goods_spec
      let spec_value = this.data.goods_info.spec_value
      let spec_key = {}
      let spec_name = {}
      let spec_arr = []

      for (var goodsKey in goods_spec) {
        //                console.log(goodsKey)
        for (var valueKey in spec_value) {
          //                    console.log(goodsKey,JSON.stringify(spec_value[valueKey]))
          let valueJson = spec_value[valueKey]
          for (var keyValueJson in valueJson) {
            if (keyValueJson == goodsKey) {
              //                            console.log(valueKey,keyValueJson)
              spec_key[valueKey] = valueJson[keyValueJson] //仅此处与init_spec有区别
            }
          }
        }
      }
      for (var i in spec_key) {
        spec_arr.push(spec_key[i])
      }
      //            console.log('spec_key=',JSON.stringify(spec_key))
      //            console.log('spec_arr=',spec_arr)
      return spec_arr
    },
    swipe2_height() {
      return this.swipe_height / 3 + 80
    },
    swiper() {
      return this.$refs.goods_swiper.swiper
    }
  },
  watch: {
    goods_id(val, newVal) {
      console.log('watch', val, newVal)
      //      this.goods_id = val
      this.getData()
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log('to:' + to.path, 'from:' + from.path)
    next(vm => {
      let id = vm.$route.params.id;
      //            vm.data=dataInit()
      console.log('beforeRouteEnter id=', id)
      if (vm.goods_id != id) {
        vm.goods_id = id;
      } else {
        vm.init = true;
      }
      //      vm.getData();
      //还原默认购买数量
      vm.$store.commit('ACTIONSHEET_UPDATE', {
        key: 'quantityx',
        value: 1
      })


    })
  },
  beforeRouteLeave(to, from, next) {
    //    console.log('to:' + to.path, 'from:' + from.path)
    this.init = false
    this.$store.commit('ACTIONSHEET_UPDATE', {
      key: 'firstTimeOpenSheet',
      value: false
    })
    this.$store.commit('ACTIONSHEET_UPDATE', {
      key: 'showpicksheet',
      value: false
    })
    next()
  },
  activated() {
    console.log('==activated==')
  },
  deactivated() {
    console.log('~~deactivated~~')
  }



}
</script>
<style lang="scss">
@import "../../../assets/config.scss";
.submit-order {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 100;
    height: 1.33rem;
}

.submit-order .buy-align {
    color: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    background: $color-theme;
    font-size: 0.37rem;
}

.submit-order .buy-align.cart {
    background: lighten($color-theme, 15%);
}

.submit-order .icon-align {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}

.submit-order .hm-flex-1 {
    color: #666;
}

.submit-order .hm-flex-1 .iconfont {
    font-size: 0.64rem;
}

.cart-badge {
    background: lighten($color-theme, 10%);
    color: #fff;
    position: absolute;
    width: 0.43rem;
    height: 0.43rem;
    border-radius: 50%;
    top: 0.08rem;
    right: 0.16rem;
    font-size: 0.32rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

//幻灯片焦点颜色
.swiper-pagination-bullet-active {
    background: #e02e24;
}

.download-app {
    padding-top: 0.11rem;
    height: 1.28rem;
    background-color: transparent;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    vertical-align: middle;
    display: block;
    i {
        display: block;
        float: left;
        color: #fff;
        background: rgba(0, 0, 0, 0.3);
        margin: 0.13rem 0.27rem;
        font-size: 0.48rem;
        width: 0.85rem;
        height: 0.85rem;
        line-height: 0.85rem;
        border-radius: 50%;
        text-align: center;
        z-index: 100;
    }
}

.promise-block {
    font-size: 0.32rem;
    i {
        font-size: 0.32rem;
        color: $color-theme;
        margin-right: 0.13rem;
    }
    .hm-flex-1 {
        text-align: center;
        color: #666;
    }
}

//贝贝样式

.infos {
    padding: 0.27rem;
    background-color: #fff;
}

.infos .area .prices span {
    /*vertical-align: bottom;*/
}

.infos .area .prices .price {
    /*display: inline-block;*/
    /*line-height: 1;*/
    font-size: 0.4rem;
}

.infos .area .prices .price i {
    font-size: 0.64rem;
    /*line-height: 1.024rem;*/
    margin-left: 0.064rem;
    font-weight: bold;
}

.infos .area .prices .price-old {
    margin-left: 0.256rem;
    /*display: inline-block;
    line-height: 1;*/
    font-size: 0.35rem;
    text-decoration: line-through;
    color: #8f8f8f;
}

.infos .product h3 {
    font-size: 0.4rem;
    line-height: 1.5;
}

/*评价列表样式*/

.reviews {
    background: #fff;
}

.reviews .review-item {
    padding: 0.27rem;
}

.reviews .content {
    margin: 0 0 0.13rem;
    color: #3d3d3d;
    font-size: 0.35rem;
    line-height: 1.5;
    padding-left: 1.07rem;
}

.reviews .head-img {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    margin-right: 0.27rem;
    border: 1px solid #e4e4e4;
    display: inline-block;
    vertical-align: top;
}

.reviews .sku-info span {
    /*margin-right: .384rem;*/
    font-size: 0.32rem;
    line-height: 1.5;
    color: #999;
    padding-left: 1.07rem;
}

.reviews .review-item span {
    display: inline-block;
    vertical-align: top;
}

.reviews .icon-score.active {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAMAAADto6y6AAAAVFBMV…Chy0apPDoqGE5MP6J24oQpQTN7/Tw9sy6hXWH1am3v8QcfsRf3W4ketwAAAABJRU5ErkJggg==") no-repeat 50%;
    background-size: 0.46933333rem 0.46933333rem;
}

/*===========*/

.event-list {
    display: flex;
    background: #fff;
    padding: 0.4rem 0;
}

.event-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /*border-right: 1px #fafafa solid;*/
}

/*.event-item:last-child{*/

/*flex:1.5;*/

/*}*/

.event-item-num {
    font-size: 0.37rem;
}

.event-item-text {
    color: #8f8f8f;
}
.instore.aui-label-outlined:after {
    -webkit-border-radius: 0.11rem;
    border-radius: 0.11rem;
    height: 200%;
    content: '';
    width: 200%;
    border: 1px solid $color-theme;
    position: absolute;
    top: -1px;
    left: -1px;
    transform: scale(0.5);
    -webkit-transform: scale(0.5);
    transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
    z-index: 1;
}

.score i {
    font-size: 0.32rem;
    color: #f60;
    margin-right: 0.05rem;
}
.mobile_body {
    background: #ffffff;
    margin-top: 0.4rem;
}
.mobile_body p {
    padding-left: 0.32rem;
    padding-right: 0.32rem;
    margin-top: 0.16rem;
    margin-bottom: 0.16rem;
    font-size: 0.4rem;
    color: #3d4245;
}
.join-store-btn {
    border: 1px solid #ff5000;
    color: #ff5000;
    padding: 0.08rem 0.32rem;
    border-radius: 0.106667rem;
    margin: 0 0.32rem;
    height: 0.75rem;
}
.goods-voucher {
    display: flex;
    align-items: center;
    height: 0.8rem;
    .goods-voucher-name {
        margin-right: 0.27rem;
        line-height: 0.53rem;
        height: 0.53rem;
    }
    .goods-voucher-list {
        span {
            font-size: 0.27rem;
            color: #ffffff;
            background-color: #F23030;
            padding: 0.025rem 0.13rem;
            margin: 0 0.2rem 0 0;
            border-radius: 2px;
        }
        height: 0.53rem;
        font-size: 0.27rem;
        vertical-align: middle;
    }
}
</style>
