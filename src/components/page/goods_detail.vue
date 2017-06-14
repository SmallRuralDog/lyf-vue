<template>
<div class="page">
  <!--固定不动的元素 要放到page-content的外面-->
  <div class="download-app">
    <i class="iconfont icon-zuo4" @click="gohome"></i>
  </div>
  <div class="page-content" v-show="init">
    <!-- 页面内容 -->


    <swiper :options="swiperOption" v-bind:style="{height: swipe_height+'px'}" style="position: relative;z-index: 1;">
      <template v-for="slide in data.goods_image">
                <swiper-slide>
                    <img :src="slide" alt="" style="background-color:#ffffff; width:100%;">
                </swiper-slide>
</template>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>

            <!--<div v-bind:style="{height: swipe_height+'px'}">-->
                <!--<swipe :auto="4000" >-->
                    <!--<template v-for="item in data.goods_image">
-->
<!--<swipe-item>-->
<!--<img :src="item" alt="" style="background-color:#ffffff; width:100%; height:100%;">-->
<!--</swipe-item>-->
<!--
</template>-->

                <!--</swipe>-->
            <!--</div>-->

            <div>
                ￥{{data.goods_info.goods_price}}
            </div>
            <div>{{data.goods_info.goods_name}}</div>

            <div>图文详情</div>
            <div></div>
        </div>
        <!--固定不动的元素 要放到page-content的外面-->
        <div class="submit-order">
            <div class="hm-center hm-flex"  style="padding: 0;margin: 0;height:100%;">

                <div class="hm-flex-1 icon-align" @click="gohome">
                    <i class="iconfont icon-shouye"></i>
                </div>
                <div class="hm-flex-1 icon-align hm-border-l"  @click="collect">
                    <i class="iconfont icon-shouye"></i>

                </div>
                <div class="hm-flex-1 icon-align hm-border-l"  style="position: relative;">
                    <i class="iconfont icon-shouye"></i>
                    <div v-if="cartNumber>0" style="background: #15bc7f;color: #fff;position: absolute;width: 0.7rem;height: 0.7rem;border-radius: 50%;top:0.3rem;right: 0.5rem;font-size: 0.6rem;display: flex;justify-content: center;align-items: center;">{{cartNumber}}</div>

                </div>
                <div class="hm-flex-2 buy-align cart"  @click="add">
                    <span>加入购物车</span>
                </div>
                <div class="hm-flex-2 buy-align"  @click="buy">
                    <span>立即购买</span>
                </div>


            </div>

        </div>
    </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

function dataInit() {
  return {
    init: false,
    goods_id: null,
    data: {
      goods_image: [],
      goods_info: {
        goods_price: 0,
        goods_name: ''
      }

    },
    swipe_height: 100,
    cartNumber: 0,
    swiperOption: {
      autoplay: 4000,
      initialSlide: 1,
      loop: true,
      pagination: '.swiper-pagination',

      onSlideChangeEnd: swiper => {
        console.log('onSlideChangeEnd', swiper.realIndex)
      }
    },
  }
}
export default {
  components: {
    swiper,
    swiperSlide
  },
  data: dataInit,

  created() {

    //        let id=this.$route.params.id;
    //        this.goods_id=id;
    //        this.getData(id);
    this.swipe_height = screen.width;
  },
  methods: {
    getData() {

      this.$api.userGet('goods_info?goods_id=' + this.goods_id, res => {
        //                console.log(JSON.stringify(res.data));

        this.data = res.data.data;
        //            this.init=true;
        this.$nextTick(() => {
          this.init = true;
          console.log('this.$nextTlick')
        })

      }, err => {
        //$toast(err)
      })
    },
    collect() {

    },
    gohome() {
      this.$router.push('/home')
    },
    add() {

    },
    buy() {

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
    console.log(to.path, from.path)
    next(vm => {
      let id = vm.$route.params.id;
      //            vm.data=dataInit()
      console.log('beforeRouteEnter id=', id)
      vm.goods_id = id;
      vm.getData();

    })
  },
  beforeRouteLeave(to, from, next) {
    console.log(to.path, from.path)
    this.init = false
    next()
  },
  activated() {
    console.log('activated=============')
  },
  deactivated() {
    console.log('deactivated~~~~~~~~~~~~~~~~~~')
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
    z-index: 1;
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
}
.submit-order .buy-align.cart {
    background: lighten($color-theme,10%);
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
    padding: 10px 0;
}
.submit-order .hm-flex-1 .iconfont {
    font-size: 20px;
    line-height: 1.5;
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
</style>
