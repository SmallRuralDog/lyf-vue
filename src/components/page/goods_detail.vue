<template>
<div class="page">
  <!--固定不动的元素 要放到page-content的外面-->
  <div class="download-app">
    <i class="iconfont icon-houtui2" @click="goback"></i>
  </div>
  <div class="page-content" v-show="init" style="padding-bottom: 70px;">
    <!-- 页面内容 -->



    <swiper ref="goods_swiper" :options="swiperOption" v-bind:style="{height: swipe_height+'px'}" style="position: relative;z-index: 1;">
      <template v-for="(slide,index) in data.goods_image">
          <swiper-slide>
              <img :src="slide" v-show="init" alt="" style="background-color:#ffffff; width:100%;" @click="goods_img_show(index)">
          </swiper-slide>
      </template>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <div class="infos hm-margin-b">
      <div class="area">
        <div class="prices" style="display: flex;align-items: center;width:100%;">
          <div class="price theme-txt" style="color:#e02e24">¥<i>{{data.goods_info.goods_price|price_yuan}}</i><b><big>{{data.goods_info.goods_price|price_jiao}}</big></b></div>
          <div class="price-old">¥268</div>
          <div style="padding-left: 10px;">
            <div class="aui-label aui-label-danger" style="font-size: 10px;height:14px;line-height: 15px;padding: 0px 3px;margin:0 5px;">拼团价</div>
            <div class="aui-label aui-label-danger" style="font-size: 10px;height:14px;line-height: 15px;padding: 0px 3px;">包邮</div>
          </div>
        </div>
      </div>
      <div class="product hm-flex" style="padding-top: 6px;">
        <h3 class="hm-flex-1">
          <span>{{data.goods_info.goods_name}}</span>
        </h3>
        <div class="hm-flex" @click="collect(data.goods_info.goods_id)" style="width: 45px;flex-direction: column;align-items:center;font-size: 10px;padding-left: 5px;">
          <i class="iconfont icon-favorite" :class="{'color-theme':collected}" style="font-size: 22px;"></i>
          <template v-show="collected">已</template>收藏
        </div>
      </div>
    </div>


    <!--<div class="hm-margin-b promise-block" style="background: #fff;padding:0 10px 10px;">-->
    <!--<div class="hm-flex">-->
    <!--<div class="hm-flex-1"><i class="iconfont icon-shouye"></i>正品保证</div>-->
    <!--<div class="hm-flex-1"><i class="iconfont icon-shouye"></i>全场包邮</div>-->
    <!--<div class="hm-flex-1"><i class="iconfont icon-shouye"></i>24h发货</div>-->
    <!--<div class="hm-flex-1"><i class="iconfont icon-shouye"></i>售后补贴</div>-->
    <!--</div>-->
    <!--</div>-->


    <ul class="aui-list hm-margin-b" @click="add">
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

    <ul class="aui-list">
      <li class="aui-list-item aui-list-item-middle">
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



    <!--<item class="item-icon-right">-->
    <!--{{data.store_info.store_name}}-->
    <!--<span style="float:right;font-size: 12px;color: #888;">进入店铺</span>-->
    <!--<i class="icon ion-ios-arrow-right" style="color: #DDD;"></i>-->
    <!--</item>-->

    <div class="hm-flex" @click="go_store(data.store_info.store_id)" style="background: #fff;padding: 15px 15px 0;">
      <img v-lazy="data.store_info.store_label" style="width:35px; height:35px; margin-right:5px; border-radius:2px;" class="aui-border">
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


    <div class="text-14" style="background: #fff;padding: 10px 10px 6px;">店铺推荐</div>
    <div style="background: #fff;">
      <swiper :options="swiperOption2" style="position: relative;z-index: 1;" v-bind:style="{height: swipe2_height+'px'}">
        <!---->
        <swiper-slide>
          <div class="hm-flex">
            <template v-for="slide in recom_items1">
                            <div class="hm-flex-1">
                                <div style="margin:1.6%;">
                                    <img :src="slide.img" style="background-color:#ffffff; width:100%;">
                                    <p class="aui-ellipsis-2">{{slide.title}}</p>
                                </div>
                            </div>
                        </template>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="hm-flex">
            <template v-for="slide in recom_items2">
                            <div class="hm-flex-1">
                                <div style="margin:1.6%;">
                                    <img :src="slide.img" style="background-color:#ffffff; width:100%;">
                                    <p class="aui-ellipsis-2">{{slide.title}}</p>
                                </div>
                            </div>
                        </template>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="hm-flex">
            <template v-for="slide3 in recom_items3">
                            <div class="hm-flex-1">
                                <div style="margin:1.6%;">
                                    <img :src="slide3.img" style="background-color:#ffffff; width:100%;">
                                    <p class="aui-ellipsis-2">{{slide3.title}}</p>
                                </div>
                            </div>
                        </template>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>

    <div class="mobile_body">
      <template v-for="item in data.goods_info.mobile_body">
        <img v-if="item.type=='image'" v-lazy="item.value" alt="">
        <p v-else-if="item.type=='text'" v-html="item.value"></p>
      </template>
    </div>

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

</div>
</template>

<script>
import {
  swiper,
  swiperSlide
}
from 'vue-awesome-swiper'
import actionsheet from '../layout/action-sheet.vue';
import {
  mapState,
  mapActions
}
from 'vuex'

function dataInit() {
  return {
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
    swiperOption2: {
      initialSlide: 0,
      loop: true,
      pagination: '.swiper-pagination',
    },
    collected: false, //已收藏
    recom_items1: [{
      "price_ori": 5000,
      "img": "http://b1.hucdn.com/upload/item/1701/04/11007582681203_800x800.jpg",
      "iid": 17103226,
      "sale_num": 3153,
      "item_track_data": "eyJtYXRjaFR5cGUiOiJoaXN0b3J5In0=",
      "sale_tip": "3153人已团",
      "discount": 62,
      "ads_tag": "",
      "title": "10条装活力鸭 6层婴儿纱布口水巾宝宝纯棉小方巾",
      "his_product_sold_cnt": 3153,
      "vid": 15,
      "event_id": 600015913,
      "event_type": "mall",
      "is_ads": false,
      "price": 3100,
      "product_id": 2265437,
      "stock": 10074,
      "country_circle_icon": "",
      "status": 1,
      "ico_label": ""
    }, {
      "price_ori": 8800,
      "img": "http://b1.hucdn.com/upload/item/1704/28/54964729637083_800x800.jpg",
      "iid": 20570576,
      "sale_num": 1688,
      "item_track_data": "eyJtYXRjaFR5cGUiOiJoaXN0b3J5In0=",
      "sale_tip": "1688人已团",
      "discount": 21,
      "ads_tag": "",
      "title": "5条装   贝吉宝婴儿口水巾新生儿洗脸巾纯棉小方巾超柔宝宝儿童手帕手绢",
      "his_product_sold_cnt": 1688,
      "vid": 15,
      "event_id": 600003198,
      "event_type": "mall",
      "is_ads": false,
      "price": 1789,
      "product_id": 2972477,
      "stock": 4992,
      "country_circle_icon": "",
      "status": 1,
      "ico_label": ""
    }, {
      "price_ori": 3990,
      "img": "http://b1.hucdn.com/upload/item/1611/29/00200816563322_800x800.jpg",
      "iid": 16324824,
      "sale_num": 593,
      "item_track_data": "eyJtYXRjaFR5cGUiOiJoaXN0b3J5In0=",
      "sale_tip": "593人已团",
      "discount": 31,
      "ads_tag": "",
      "title": "贝比熊 棉质柔软6层纱布巾婴儿口水巾2条装",
      "his_product_sold_cnt": 593,
      "vid": 15,
      "event_id": 600014918,
      "event_type": "mall",
      "is_ads": false,
      "price": 1200,
      "product_id": 2212280,
      "stock": 987,
      "country_circle_icon": "",
      "status": 1,
      "ico_label": ""
    }],
    recom_items2: [{
      "price_ori": 6200,
      "img": "http://b1.hucdn.com/upload/item/1704/03/93963615297083_800x800.jpg",
      "iid": 20063120,
      "sale_num": 956,
      "item_track_data": "eyJtYXRjaFR5cGUiOiJoaXN0b3J5In0=",
      "sale_tip": "956人已团",
      "discount": 26,
      "ads_tag": "",
      "title": "【5条装】婴儿双层纱布口水巾围嘴",
      "his_product_sold_cnt": 956,
      "vid": 15,
      "event_id": 600003198,
      "event_type": "mall",
      "is_ads": false,
      "price": 1600,
      "product_id": 2801944,
      "stock": 799,
      "country_circle_icon": "",
      "status": 1,
      "ico_label": ""
    }, {
      "price_ori": 19500,
      "img": "http://b1.hucdn.com/upload/item/1703/23/65252644291311_800x800.jpg",
      "iid": 14944478,
      "sale_num": 1269,
      "item_track_data": "eyJtYXRjaFR5cGUiOiJoaXN0b3J5In0=",
      "sale_tip": "1269人已团",
      "discount": 18,
      "ads_tag": "",
      "title": "HHTU高密度5条装婴儿纯棉6层纱布巾宝宝口水巾",
      "his_product_sold_cnt": 1269,
      "vid": 15,
      "event_id": 600002893,
      "event_type": "mall",
      "is_ads": false,
      "price": 3490,
      "product_id": 1754037,
      "stock": 3973,
      "country_circle_icon": "",
      "status": 1,
      "ico_label": ""
    }, {
      "price_ori": 5800,
      "img": "http://b1.hucdn.com/upload/item/1703/15/52853905321583_800x800.jpg",
      "iid": 5283805,
      "sale_num": 2231,
      "item_track_data": "eyJtYXRjaFR5cGUiOiJoaXN0b3J5In0=",
      "sale_tip": "2231人已团",
      "discount": 48,
      "ads_tag": "",
      "title": "威尔贝鲁 婴儿纱布口水巾 宝宝毛巾小方巾",
      "his_product_sold_cnt": 2231,
      "vid": 462,
      "event_id": 600002134,
      "event_type": "mall",
      "is_ads": false,
      "price": 2760,
      "product_id": 300739,
      "stock": 10767,
      "country_circle_icon": "",
      "status": 1,
      "ico_label": ""
    }],
    recom_items3: [{
      "price_ori": 12800,
      "img": "http://b1.hucdn.com/upload/item/1703/03/03088614807083_800x800.jpg",
      "iid": 14017389,
      "sale_num": 1129,
      "item_track_data": "eyJtYXRjaFR5cGUiOiJoaXN0b3J5In0=",
      "sale_tip": "1129人已团",
      "discount": 29,
      "ads_tag": "",
      "title": "贝吉宝【10条装】30*30cm六层纯棉纱布方巾纱布毛巾",
      "his_product_sold_cnt": 1129,
      "vid": 15,
      "event_id": 600003198,
      "event_type": "mall",
      "is_ads": false,
      "price": 3590,
      "product_id": 1969395,
      "stock": 488,
      "country_circle_icon": "",
      "status": 1,
      "ico_label": ""
    }, {
      "price_ori": 3800,
      "img": "http://b1.hucdn.com/upload/item/1702/15/48301285777083_800x800.jpg",
      "iid": 15589366,
      "sale_num": 1385,
      "item_track_data": "eyJtYXRjaFR5cGUiOiJoaXN0b3J5In0=",
      "sale_tip": "1385人已团",
      "discount": 38,
      "ads_tag": "",
      "title": "【4条装】贝吉宝 纯棉双面可用带按扣三角巾",
      "his_product_sold_cnt": 1385,
      "vid": 15,
      "event_id": 600003198,
      "event_type": "mall",
      "is_ads": false,
      "price": 1440,
      "product_id": 2154466,
      "stock": 755,
      "country_circle_icon": "",
      "status": 1,
      "ico_label": ""
    }, {
      "price_ori": 7600,
      "img": "http://b1.hucdn.com/upload/item/1701/05/97632143352550_800x800.jpg",
      "iid": 17734562,
      "sale_num": 684,
      "item_track_data": "eyJtYXRjaFR5cGUiOiJoaXN0b3J5In0=",
      "sale_tip": "684人已团",
      "discount": 37,
      "ads_tag": "",
      "title": "蓓贝婴 4条婴儿纱布口水巾全棉宝宝纱布方巾",
      "his_product_sold_cnt": 684,
      "vid": 462,
      "event_id": 600016115,
      "event_type": "mall",
      "is_ads": false,
      "price": 2800,
      "product_id": 2337881,
      "stock": 75,
      "country_circle_icon": "",
      "status": 1,
      "ico_label": ""
    }],

  }
}
export default {
  name: 'goods_detail',
  data: dataInit,
  components: {
    swiper,
    swiperSlide,
    actionsheet
  },
  created() {
    this.swipe_height = screen.width;
  },
  methods: {
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
      }, err => {
        //$toast(err)
      })
    },
    refreshGoodsData(id) {
      console.log('refreshGoodsData(id)..',this.goods_id)
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
      if(vm.goods_id != id){
        vm.goods_id = id;
      }else{
        vm.init=true;
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
  @import "../../assets/config.scss";
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
    font-size: 14px;
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
    font-size: 24px;
  }

  .cart-badge {
    background: lighten($color-theme, 10%);
    color: #fff;
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    top: 3px;
    right: 6px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  //幻灯片焦点颜色
    .swiper-pagination-bullet-active {
      background: #e02e24;
    }

  .download-app {
    padding-top: 4px;
    height: 48px;
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
    margin: 5px 10px;
    font-size: 18px;
    width: 32px;
    height: 32px;
    line-height: 32px;
    border-radius: 50%;
    text-align: center;
    z-index: 100;
  }
  }

  .promise-block {
    font-size: 12px;
  i {
    font-size: 12px;
    color: $color-theme;
    margin-right: 5px;
  }
  .hm-flex-1 {
    text-align: center;
    color: #666;
  }
  }

  //贝贝样式


  .infos {
    padding: 10px;
    background-color: #fff;
  }



  .infos .area .prices span {
    /*vertical-align: bottom;*/
  }

  .infos .area .prices .price {
    /*display: inline-block;*/
    /*line-height: 1;*/
    font-size: 15px;
  }

  .infos .area .prices .price i {
    font-size: 24px;
    /*line-height: 1.024rem;*/
    margin-left: 0.064rem;
    font-weight: bold;
  }

  .infos .area .prices .price-old {
    margin-left: 0.256rem;
    /*display: inline-block;
    line-height: 1;*/
    font-size: 13px;
    text-decoration: line-through;
    color: #8f8f8f;
  }

  .infos .product h3 {
    font-size: 15px;
    line-height: 1.5;
  }

  /*评价列表样式*/

  .reviews {
    background: #fff;
  }

  .reviews .review-item {
    padding: 10px;
  }

  .reviews .content {
    margin: 0 0 5px;
    color: #3d3d3d;
    font-size: 13px;
    line-height: 1.5;
    padding-left: 40px;
  }

  .reviews .head-img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
    border: 1px solid #e4e4e4;
    display: inline-block;
    vertical-align: top;
  }

  .reviews .sku-info span {
    /*margin-right: .384rem;*/
    font-size: 12px;
    line-height: 1.5;
    color: #999;
    padding-left: 40px;
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
    padding: 15px 0;
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
    font-size: 14px;
  }

  .event-item-text {
    color: #8f8f8f;
  }
  .instore.aui-label-outlined:after {
    -webkit-border-radius: 4px;
    border-radius: 4px;
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
    padding-top: 0.4rem;
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
</style>
