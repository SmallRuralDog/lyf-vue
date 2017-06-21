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
              <div class="area">
                  <div class="prices flex-center align-bottom">
                      <p class="price theme-txt" style="color:#e02e24">¥<i>{{data.goods_info.goods_price}}</i></p>
                      <p class="price-old">¥268</p>
                      <p class="sale-tag-wrapper">

                          <span class="sale-tag">拼团价</span>

                          <span class="sale-tag">包邮</span>

                      </p>
                  </div>
              </div>
              <div class="product">
                  <h3>
                    <span>{{data.goods_info.goods_name}}</span>
                  </h3>
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


          <item class="item-icon-right hm-margin-b" @click.native="add">
              已选
              <template v-if="data.goods_info.goods_spec">
              <template v-for="value in cur_spec_namex"><!--data.goods_info.goods_spec-->
                  "{{value}}"
              </template>
              </template>
              <i class="icon ion-ios-arrow-right" style="color: #DDD;"></i>
          </item>

          <item class="item-icon-right">
              {{data.store_info.store_name}}
              <span style="float:right;font-size: 12px;color: #888;">进入店铺</span>
              <i class="icon ion-ios-arrow-right" style="color: #DDD;"></i>
          </item>

          <ul class="event-list">
              <li class="event-item">
                      <span class="event-item-num">{{data.store_info.goods_count}}件</span>
                      <span class="event-item-text">全部商品</span>
              </li>
              <li class="event-item">
                      <span class="event-item-num">{{data.store_info.buy_count}}</span>
                      <span class="event-item-text">购买人数</span>
              </li>
              <li class="event-item">
                      <span class="event-item-num">{{data.store_info.collect_count}}</span>
                      <span class="event-item-text">收藏人数</span>
              </li>
              <li class="event-item" v-if="data.store_info.store_credit.length>1">
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

        <div v-html="data.goods_info.mobile_body">

        </div>


        </div>
        <!--固定不动的元素 要放到page-content的外面-->
        <div class="submit-order">
            <div class="hm-center hm-flex"  style="padding: 0;margin: 0;height:100%;">
                <div style="flex:0.1"></div>
                <div class="hm-flex-1 icon-align" @click="gohome">
                    <i class="iconfont icon-shouye"></i>
                </div>
                <div class="hm-flex-1 icon-align hm-border-l"  @click="collect">
                    <i class="iconfont icon-shouye"></i>

                </div>
                <div class="hm-flex-1 icon-align hm-border-l" @click="gocart" style="position: relative;">
                    <i class="iconfont icon-fahuo"></i>
                    <div v-show="cartNumber>0" class="cart-badge">{{cartNumber}}</div>

                </div>
                <div style="flex:0.1"></div>
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
      initialSlide: 1,
      loop: true,
      pagination: '.swiper-pagination'
    },

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
    color: #888;
    // padding: 10px 0;
}
.submit-order .hm-flex-1 .iconfont {
    font-size: 20px;
    // line-height: 1.5;
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
    border-right: 1px #fafafa solid;
}
.event-item:last-child{
    flex:1.5;
}
    
</style>
