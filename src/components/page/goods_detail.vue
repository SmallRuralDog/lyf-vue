<template>
<div class="page">
  <!--固定不动的元素 要放到page-content的外面-->
  <div class="download-app">
    <i class="iconfont icon-zuo4" @click="gohome"></i>
  </div>
  <div class="page-content" v-show="init" style="padding-bottom: 70px;">
    <!-- 页面内容 -->

        <swiper :options="swiperOption" v-bind:style="{height: swipe_height+'px'}" style="position: relative;z-index: 1;">
          <template v-for="slide in data.goods_image">
                <swiper-slide>
                    <img :src="slide" alt="" style="background-color:#ffffff; width:100%;">
                </swiper-slide>
            </template>
                    <div class="swiper-pagination" slot="pagination"></div>
        </swiper>

          <div class="infos hm-margin-b">
              <div class="area" >
                  <div class="prices " style="display: flex;align-items: center;"><!--flex-center align-bottom-->
                      <div class="price theme-txt" style="color:#e02e24">¥<i>{{data.goods_info.goods_price}}</i></div>
                      <div class="price-old">¥268</div>
                      <div class="sale-tag-wrapper">

                          <!--<span class="sale-tag">拼团价</span>-->
                          <!--<span class="sale-tag">包邮</span>-->
                      <div class="aui-label aui-label-danger" style="font-size: 10px;height:14px;line-height: 15px;padding: 0px 3px;margin:0 5px;">拼团价</div>
                      <div class="aui-label aui-label-danger" style="font-size: 10px;height:14px;line-height: 15px;padding: 0px 3px;">包邮</div>

                      </div>
                  </div>
              </div>
              <div class="product hm-flex" style="padding-top: 6px;">
                  <h3 class="hm-flex-1" style="font-weight: bold;">
                    <span>{{data.goods_info.goods_name}}</span>
                  </h3>
                  <div class="hm-flex" style="width: 40px;flex-direction: column;align-items:center;font-size: 10px;padding-left: 10px;">
                    <i class="iconfont icon-favorite" style="font-size: 22px;"></i>
                    收藏
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


          <!--<item class="item-icon-right hm-margin-b" @click.native="add">-->
              <!--已选-->
              <!--<template v-if="data.goods_info.goods_spec">-->
              <!--<template v-for="value in cur_spec_namex">&lt;!&ndash;data.goods_info.goods_spec&ndash;&gt;-->
                  <!--"{{value}}"-->
              <!--</template>-->
              <!--</template>-->
              <!--<i class="icon ion-ios-arrow-right" style="color: #DDD;"></i>-->
          <!--</item>-->

          <ul class="aui-list hm-margin-b" @click="add">
              <li class="aui-list-item aui-list-item-middle">
                  <div class="aui-list-item-inner ">
                      已选
                      <template v-if="data.goods_info.goods_spec">
                          <template v-for="value in cur_spec_namex"><!--data.goods_info.goods_spec-->
                              "{{value}}"
                          </template>
                      </template>
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
            <li class="review-item aui-border-b">
              <p style="margin-bottom: 0;">
                <img src="//h0.hucdn.com/open/201724/21d777a959c51877_225x225.png" class="head-img lazyimg b-lazy b-loaded">
                <span class="nick">134****5675</span>
                <!--<span class="join-time">在贝贝47天</span>-->
                    <span class="score">
                      <i class="icon-score active"></i><i class="icon-score active"></i><i class="icon-score active"></i><i class="icon-score active"></i><i class="icon-score active"></i>
                    </span>
              </p>

              <p class="content">跟图片一致，收到之后很惊喜，网眼很大，很透气，宝宝每天穿着在地上跑来跑去，还没有气球，简直出乎我的意料，满意！</p>

              <p class="sku-info">
                <span>颜色：五双礼盒装 袜子尺码：6-12个月（袜底长约10cm） 宝宝1岁1个月</span>
              </p>
            </li>

            <li class="review-item aui-border-b">
              <p style="margin-bottom: 0;">
                <img src="//h0.hucdn.com/open/201724/b45f79169d677edf_225x225.png" class="head-img lazyimg b-lazy b-loaded">
                <span class="nick">159****6354</span>
                <!--<span class="join-time">在贝贝188天</span>-->
                    <span class="score">
                      <i class="iconfont icon-favorite active"></i><i class="icon-score active"></i><i class="icon-score active"></i><i class="icon-score active"></i><i class="icon-score active"></i>
                    </span>
              </p>

              <p class="content">袜子不错，这个天气穿刚好。造型可爱线头不多，有一个一个的洞洞，很透气，整体满意！！</p>

              <p class="sku-info">
                <span>颜色：五双礼盒装 袜子尺码：6-12个月（袜底长约10cm） 宝宝5个月</span>
              </p>
            </li>

          </ul>
          </div>



          <!--<item class="item-icon-right">-->
              <!--{{data.store_info.store_name}}-->
              <!--<span style="float:right;font-size: 12px;color: #888;">进入店铺</span>-->
              <!--<i class="icon ion-ios-arrow-right" style="color: #DDD;"></i>-->
          <!--</item>-->

        <div class="hm-flex" @click="go_store(data.store_info.store_id)" style="justify-content: space-between;background: #fff;padding: 15px 15px 0;align-items: center;">
            <img  src="http://b1.hucdn.com/upload/brand/1702/17/99795606587083_200x200.jpg" style="width:40px;" class="aui-border">
            <div class="text-14" style="flex:1">{{data.store_info.store_name}}</div>
            <div class="aui-label aui-label-outlined" style="color: #555;"> 进入店铺</div>
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


        <div class="text-14" style="background: #fff;padding: 10px 10px 6px;">大家还买了</div>
        <div style="background: #fff;">
        <swiper :options="swiperOption2"  style="position: relative;z-index: 1;" v-bind:style="{height: swipe2_height+'px'}"><!---->
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
              <template v-for="slide in recom_items3">
                <div class="hm-flex-1">
                  <div style="margin:1.6%;">
                    <img :src="slide.img" style="background-color:#ffffff; width:100%;">
                    <p class="aui-ellipsis-2">{{slide.title}}</p>
                  </div>
                </div>
              </template>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        </div>

        <div v-html="data.goods_info.mobile_body">

        </div>


        </div>
        <!--固定不动的元素 要放到page-content的外面-->
        <div class="submit-order">
            <div class="hm-center hm-flex"  style="padding: 0;margin: 0;height:100%;">
                <div style="flex:0.15"></div>
                <div class="hm-flex-1 icon-align" @click="gohome">
                    <i class="iconfont icon-shouye-shouye"></i>
                </div>
                <!--<div class="hm-flex-1 icon-align hm-border-l"  @click="collect">-->
                    <!--<i class="iconfont icon-favorite"></i>-->
                <!--</div>-->
                <div class="hm-flex-1 icon-align hm-border-l" @click="gocart" style="position: relative;">
                    <i class="iconfont icon-gouwuchexiantiao"></i>
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
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import actionsheet from '../layout/action-sheet.vue';
import {mapState,mapActions} from 'vuex'

function dataInit() {
  return {
    init: false,
    goods_id: null,
    data: {
      goods_image: [],
      goods_info: {
        goods_price: 0,
        color_id:0,
        goods_name: '',
        spec_name:[],
        spec_value:[],
        goods_spec:[],
      },
      spec_image:{},
      store_info:{
          buy_count:'',
          collect_count:'',
          goods_count:'',
          store_credit:{
              store_deliverycredit:{},
              store_desccredit:{},
              store_servicecredit:{}
          }
      },
    },
    swipe_height: 100,
    cartNumber: 5,
    swiperOption: {
      autoplay: 4000,
      initialSlide: 0,
      loop: true,
      pagination: '.swiper-pagination'
    },
    swiperOption2: {
//      autoplay: 4000,
      initialSlide: 0,
      loop: true,
      pagination: '.swiper-pagination',
//      slidesPerView: 3,
//      spaceBetween: 20
    },
    recom_items1: [
      {
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
      },
      {
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
      },
      {
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
    recom_items2: [
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      }
    ],

  }
}
export default {
    name:'goods_detail',
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
        //                console.log(JSON.stringify(res.data));
        this.data = res.data.data;
//        this.$nextTick(() => {
          this.init = true;
            $loading.hide();
            //更新init_spec，init_spec_name至vuex
            this.$store.commit('ACTIONSHEET_UPDATE',{key:'cur_specx',value:this.init_spec})
            this.$store.commit('ACTIONSHEET_UPDATE',{key:'cur_spec_namex',value:this.init_spec_name})
//        })

      }, err => {
        //$toast(err)
      })
    },
      refreshGoodsData(id) {
          this.$api.userGet('goods_info?goods_id=' + id, res => {
              this.data = res.data.data;
              //更新init_spec，init_spec_name至vuex
              this.$store.commit('ACTIONSHEET_UPDATE',{key:'cur_specx',value:this.init_spec})
              this.$store.commit('ACTIONSHEET_UPDATE',{key:'cur_spec_namex',value:this.init_spec_name})
          }, err => {
              //$toast(err)
          })
      },
    collect() {

    },
    gohome() {
        this.$router.push('/home')
//        console.log('History.previous=',history.length,history.previous)
//        if(history.length>2){
//            this.$router.go(-1)
//        }else{
//            this.$router.push('/home')
//        }
    },
    go_store(id) {
      $router.push({
        name:'store_home',
        params:{
          store_id:id
        }
      })
    },
      gocart() {
          this.$router.push('/cart')
      },
    add() {
        // this.popupVisible=true
        this.$store.commit('ACTIONSHEET_UPDATE',{key:'showpicksheet',value:true})
        if(this.firstTimeOpenSheet==false){
            this.$store.commit('ACTIONSHEET_UPDATE',{key:'firstTimeOpenSheet',value:true})
        }
    },
    buy() {
        // this.popupVisible=true
        this.$store.commit('ACTIONSHEET_UPDATE',{key:'showpicksheet',value:true})
        if(this.firstTimeOpenSheet==false){
            this.$store.commit('ACTIONSHEET_UPDATE',{key:'firstTimeOpenSheet',value:true})
        }
    },
      quit(){
        console.log("quit");
          this.$store.commit('ACTIONSHEET_UPDATE',{key:'showpicksheet',value:false})
      }


  },
    computed:{
        ...mapState({
            showpicksheet:state=>state.actionsheet.showpicksheet,
            firstTimeOpenSheet:state=>state.actionsheet.firstTimeOpenSheet,
            cur_spec_namex:state=>state.actionsheet.cur_spec_namex,
        }),

        init_spec(){//默认属性id数组
//            console.log('init_spec_keys')
            let goods_spec=this.data.goods_info.goods_spec
            let spec_value=this.data.goods_info.spec_value
            let spec_key={}
            let spec_arr=[]

            for(var goodsKey in goods_spec){
//                console.log(goodsKey)
                for(var valueKey in spec_value) {
//                    console.log(goodsKey,JSON.stringify(spec_value[valueKey]))
                    let valueJson=spec_value[valueKey]
                    for(var keyValueJson in valueJson){
                        if(keyValueJson==goodsKey){
//                            console.log(valueKey,keyValueJson)
                            spec_key[valueKey]=keyValueJson
                        }
                    }
                }
            }
            for(var i in spec_key){
                spec_arr.push(spec_key[i])
            }
//            console.log('spec_key=',JSON.stringify(spec_key))
//            console.log('spec_arr=',spec_arr)
            return spec_arr
        },
        init_spec_name(){//默认属性名数组
        //            console.log('init_spec_keys')
            let goods_spec=this.data.goods_info.goods_spec
            let spec_value=this.data.goods_info.spec_value
            let spec_key={}
            let spec_name={}
            let spec_arr=[]

            for(var goodsKey in goods_spec){
        //                console.log(goodsKey)
                for(var valueKey in spec_value) {
        //                    console.log(goodsKey,JSON.stringify(spec_value[valueKey]))
                    let valueJson=spec_value[valueKey]
                    for(var keyValueJson in valueJson){
                        if(keyValueJson==goodsKey){
        //                            console.log(valueKey,keyValueJson)
                            spec_key[valueKey]=valueJson[keyValueJson]//仅此处与init_spec有区别
                        }
                    }
                }
            }
            for(var i in spec_key){
                spec_arr.push(spec_key[i])
            }
        //            console.log('spec_key=',JSON.stringify(spec_key))
        //            console.log('spec_arr=',spec_arr)
            return spec_arr
        },
        swipe2_height(){
            return this.swipe_height/3+80
        }

    },
  watch: {

    gid(val, newVal) {
      console.log('watch', val, newVal)
      this.goods_id = val
      getData()


    }
  },
  beforeRouteEnter(to, from, next) {
    console.log('to:'+to.path, 'from:'+from.path)
    next(vm => {
      let id = vm.$route.params.id;
      //            vm.data=dataInit()
      console.log('beforeRouteEnter id=', id)
      vm.goods_id = id;
      vm.getData();

    })
  },
  beforeRouteLeave(to, from, next) {
    console.log('to:'+to.path, 'from:'+from.path)
    this.init = false
    this.$store.commit('ACTIONSHEET_UPDATE', { key: 'firstTimeOpenSheet', value: false })
    this.$store.commit('ACTIONSHEET_UPDATE',{key:'showpicksheet',value:false})
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
// 主题色
$color-theme: #e02e24;
.submit-order {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 100;
    height:1.33rem;
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
    background: lighten($color-theme,15%);
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
    font-size: 22px;
}
.cart-badge{
    background: lighten($color-theme,10%);
    color: #fff;
    position: absolute;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    top:4px;
    right: 8px;
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
        background: rgba(0,0,0,0.3);
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
.promise-block{
    font-size: 12px;
    i{font-size: 12px;color:$color-theme;margin-right: 5px;}
    .hm-flex-1{text-align: center;color:#666}
}

//贝贝样式
  .flex-center {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-wrap: wrap;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
  }
.flex-center.align-bottom {
    -webkit-box-align: end;
    -webkit-align-items: flex-end;
    -ms-flex-align: end;
    align-items: flex-end;
}
.infos {
    padding:10px;
    background-color: #fff;
}
.infos .area .prices .sale-tag-wrapper {
    display: inline-block;
    margin-left: .34133333rem;
    /*-webkit-transform: scale(.6);*/
    /*-moz-transform: scale(.6);*/
    /*transform: scale(.6);*/
    /*-webkit-transform-origin: left bottom;*/
    /*transform-origin: left bottom;*/
}
.infos .area .prices .sale-tag {
    display: inline-block;
    /*display: flex;*/
    /*align-items:center;*/
    /*justify-content:center;*/
    margin-left: 4px;
    padding:1px 7px 0;
    color: #fff;
    line-height: 1.8;
    font-size: 8px;
    background: lighten($color-theme,5%);
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
    margin: 0 .064rem;
}
.infos .area .prices .price-old {
    margin-left: .256rem;
    /*display: inline-block;
    line-height: 1;*/
    font-size: 13px;
    text-decoration: line-through;
    color: #8f8f8f;
}
.infos .product h3 {
    font-size: 15px;
    line-height:1.5;
}
/*评价列表样式*/
.reviews{
  background: #fff;
}
.reviews .review-item {
  padding: 10px;

}
.reviews .content {
  margin: 0px 0 5px;
  color: #3d3d3d;
  font-size: 13px;
  line-height: 1.5;
  padding-left:40px;
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
  padding-left:40px;
}
.reviews .review-item span {
  display: inline-block;
  vertical-align: top;
}
.reviews .icon-score.active {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAMAAADto6y6AAAAVFBMV…Chy0apPDoqGE5MP6J24oQpQTN7/Tw9sy6hXWH1am3v8QcfsRf3W4ketwAAAABJRU5ErkJggg==) no-repeat 50%;
  background-size: .46933333rem .46933333rem;
}
/*===========*/
.event-list{
    display: flex;
    background: #fff;
    padding:15px 0;
}
.event-item{
    flex:1;
    display: flex;
    flex-direction:column;
    align-items:center;
    justify-content: center;
    /*border-right: 1px #fafafa solid;*/
}
/*.event-item:last-child{*/
    /*flex:1.5;*/
/*}*/
.event-item-num{
    font-size:14px ;
}
.event-item-text{
    color: #8f8f8f;
}
</style>
