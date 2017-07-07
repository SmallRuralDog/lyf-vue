<template>
<mt-popup v-model="popupVisible" position="bottom" style="width:100%;height:11.17rem;">
  <div class="sku_list sku-prop ctrl-ui-sku">
    <i class="icon_closed ion-ios-close-outline" @click="quit()"></i>
    <div class="container_sku">
      <div class="head">
        <template v-show="this.data.goods_info.color_id">
            <img :src="goods_sku_img" @click="sku_show_pic(goodsid_choose)"><!--init_color_id  -->
        </template>
        <div class="infos">
          <p class="price">¥<strong id="J_sku-price">{{data.goods_info.goods_price}}</strong><span id="J_sku-stock"></span>
          </p>
          <p class="text">库存：{{data.goods_info.goods_storage}}</p>
          <p class="text">已选
            <template v-if="data.goods_info.goods_spec">
              <template v-for="value in cur_spec_name"><!--data.goods_info.goods_spec-->
                  "{{value}}"
              </template>
            </template>
          </p>
        </div>
      </div>
      <div ref="sku_scroll" class="scroll-container">
        <div class="">
          <div class="prop-mainer">
            <template v-if="data.goods_info.spec_name">
            <section v-for="(spec,key,index) in data.goods_info.spec_name">
              <h3>{{spec}}</h3>
              <ul class="J_sku-list">
                <li class="sku-item" @click="choose_spec(index,key,keys)" :class="{'active':keys==cur_spec[index]}" v-for="(item,keys,indexs) in data.goods_info.spec_value[key]">{{item}}</li>
              </ul>
            </section>
          </template>

          </div>
          <div class="quantity-info">
            <div class="sku-quantity">
              <h2>购买数量 <span></span></h2>
              <p class="btn-minus off" @click="decline">
                <a class="btn minus" min=""></a>
              </p>
              <p class="btn-input"><input type="tel" v-model="quantity"></p>
              <p class="btn-plus" @click="add">
                <a class="btn plus" max=""></a>
              </p>
            </div>
          </div>
          <div class="" style="height:20px;"></div>
        </div>
      </div>


      <div class="sku-btns">
        <div class="sku-btn addcart" @click="add_cart">加入购物车</div>
        <div class="sku-btn gobuy" @click="buy_now">立即购买</div>
      </div>
    </div>
  </div>

</mt-popup>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      popupVisible: false,
      cur_spec: [],
      cur_spec_name: [],
      quantity: 1,

    }
  },
  mounted() {

  },
  props: {
    data: {
      type: Object,
      default: null,
    },
    goodsid: {
      type: [String, Number],
      default: null,
    },
    init_spec: {
      type: Array,
      default: null,
    },
    init_spec_name: {
      type: Array,
      default: null,
    },
  },
  computed: {
    ...mapState({
      showpicksheet: state => state.actionsheet.showpicksheet,
      firstTimeOpenSheet: state => state.actionsheet.firstTimeOpenSheet,
    }),
    init_color_id() {
      return this.data.goods_info.color_id
    },
    spec_string() {
      //复制数组
      var cur_spec2 = this.cur_spec.slice(0, this.cur_spec.length);

      if (cur_spec2) {
        var cur_spec_sort = cur_spec2.sort((a, b) => {
          return a - b
        })
        var str = ''
        for (var i in cur_spec_sort) {
          str += cur_spec_sort[i] + '|';
        }
        str = str.substring(0, str.length - 1)
        return str;
      }
    },
    goods_sku_img(){
      return this.data.spec_image[this.goodsid_choose]
    },
    goodsid_choose() {
      let spec_list = this.data.spec_list;
      let spec_string = this.spec_string;
      if (spec_string) {
        for (var key in spec_list) {
          if (spec_string == key) return spec_list[key]
        }
      } else {
        return this.goodsid
      }

    },

  },
  deactivated() {
    console.log('~~actionsheet.vue deactivated~~')
    this.quantity = 1;
  },
  watch: {
    //同步showpicksheet=popupVisible
    showpicksheet(val, oldVal) {
      this.popupVisible = val
      if (val) {
        this.$nextTick(() => {
          this._initScroll()
        })
      }
    },
    popupVisible(val, oldVal) {
      this.$store.commit('ACTIONSHEET_UPDATE', { key: 'showpicksheet', value: val })
    },
    quantity(val, oldVal) {
      this.$store.commit('ACTIONSHEET_UPDATE', { key: 'quantityx', value: val })
    },
    cur_spec(val, oldVal) {

    },
    spec_string(val, oldVal) {

    },
    firstTimeOpenSheet(val, oldVal) {
      console.log('firstTimeOpenSheet set this.cur_spec')
      if (val) {
        this.cur_spec = []
        this.cur_spec_name = []
        for (var i in this.init_spec) {
          this.cur_spec.push(this.init_spec[i])
        }
        for (var i in this.init_spec_name) {
          this.cur_spec_name.push(this.init_spec_name[i])
        }

      }
    },
    goodsid_choose(val, oldVal) {
      //打开action-sheet时，选择参数导致goodsid_choose变更，触发详情页刷新
      if (val && oldVal && val != oldVal && this.showpicksheet) {
        console.log('goodsid_choose=', val, oldVal,' refresh_goods_data()')
        this.$emit('refresh_goods_data', val)

      }
    }

  },

  methods: {
    sku_show_pic(goods_id) {
      let spec_image  = this.data.spec_image
      let current = spec_image[goods_id].replace("!310x310", "")
      let urls = []
      urls.push(current)
      for (var key in spec_image) {
        let img = spec_image[key].replace("!310x310", "")
        if(current !== img)
        urls.push(img)
      }
      urls = this.$api.unique_arr(urls)
      if (typeof WeixinJSBridge != "undefined") {
        WeixinJSBridge.invoke('imagePreview', {
          'current': current,
          'urls': urls
        });
      }
    },
    choose_spec(index, key1, key2) {
      this.$set(this.cur_spec, index, key2)
      this.cur_spec_name[index] = this.data.goods_info.spec_value[key1][key2]
      //更新init_spec，init_spec_name至vuex
      this.$store.commit('ACTIONSHEET_UPDATE_ARR', { key: 'cur_specx', value: this.cur_spec })
      this.$store.commit('ACTIONSHEET_UPDATE_ARR', { key: 'cur_spec_namex', value: this.cur_spec_name })

    },
    add_cart() {
      $loading.show("提交中");
      this.$store.commit('ACTIONSHEET_UPDATE', { key: 'showpicksheet', value: false })
      this.$api.userAuthGet('add_cart?goods_id=' + this.goodsid_choose + '&quantity=' + this.quantity, res => {
        console.log(JSON.stringify(res.data));
        //              this.$store.commit('ACTIONSHEET_UPDATE', { key: 'showpicksheet', value: false })
        //              $loading.hide()
        $toast.show('加入购物车成功', 3000)
        this.$store.commit('UPDATE_COMMON_DATA', {
          cart_view_data_reload: true
        })

      }, err => {
        //$toast(err)
        console.log(JSON.stringify(err));
      })
    },
    buy_now() {
      $loading.show("提交中");
      this.$store.commit('ACTIONSHEET_UPDATE', { key: 'showpicksheet', value: false })
      this.$api.userAuthPost('buy_step1', { cart_id: this.goodsid_choose + '|' + this.quantity, ifcart: 0, address_id: 0 }, res => {
        console.log(JSON.stringify(res.data));
        $router.push({
          name: 'order_buynow',
          params: {
            cart_id: this.goodsid_choose + '|' + this.quantity,
            ifcart: 0,
            address_id: 0
          }
        })
        //              this.$store.commit('ACTIONSHEET_UPDATE', { key: 'showpicksheet', value: false })
        //
        //              $toast.show('加入购物车成功', 3000)
        //              this.$store.commit('UPDATE_COMMON_DATA', {
        //                  cart_view_data_reload:true
        //              })

      }, err => {
        //$toast(err)
        console.log(JSON.stringify(err));
      })

    },
    _initScroll() {
      if (this.sku_scroll) {
        this.sku_scroll.refresh()
      } else {
        this.sku_scroll = new BScroll(this.$refs.sku_scroll, {
          startX: 0,
          startY: 0,
          click: true
        })
      }
    },
    add() {
      if (this.quantity < 999)
        this.quantity = this.quantity + 1;

    },
    decline() {
      if (this.quantity > 1)
        this.quantity = this.quantity - 1;
    },
    quit() {
      this.popupVisible = false
    },

  }
}
</script>
<style lang="scss">
$color-theme: #e02e24;
.sku_list {
    width: 100%;
    background: #fff;
    position: absolute;
}
.sku_list .icon_closed {
    position: absolute;
    z-index: 99;
    right: 0.4rem;
    color: #999999;
    top: 0.3rem;
    font-size: 0.67rem;
    background-position: center center;
    background-size: contain;
    cursor: pointer;
}
.head {
    padding-left: 0.32rem;
    height: 2.13rem;
}
.head img {
    width: 2.67rem;
    height: 2.67rem;
    border-radius: 0.16rem;
    border: 1px solid #eee;
    top: -.8rem;
    position: absolute;

}
.head .infos {
    position: absolute;
    top: 0;
    left: 2.67rem;
    margin-left: 0.4rem;
    display: inline-block;
    vertical-align: top;
    font-size: 0.32rem;
    line-height: 0.32rem;
    padding: 0 0 0 0.27rem;
    color: #3d3d3d;
}
.head .infos .price {
    color: #ff4965;
    margin-top: 0.13rem;
    margin-bottom: 0.05rem;
}
.head strong {
    margin-left: 0.10666667rem;
    line-height: 0.768rem;
    font-size: 0.48rem;
}
.head .text {
    margin-bottom: 0.16rem;
}
.scroll-container {
    height: 7.73rem;
    overflow: hidden;
}
.sku-prop .prop-mainer {
    font-size: 0;
    text-align: left;
    margin: 0 0.32rem 0.27rem;
    position: relative;
}
.sku-prop .prop-mainer h3 {
    margin-top: 0.27rem;
    margin-bottom: 0;
    line-height: 0.64rem;
    font-size: 0.4rem;
    color: #3d3d3d;
}
.sku-prop .prop-mainer .sku-item {
    display: inline-block;
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: center;
    vertical-align: middle;
    font-size: .35rem;
    background: #f9f9f9;
    border-radius: 0.16rem;
    padding: 0 0.267rem;
    box-sizing: border-box;
    margin: 0.24rem 0.24rem 0 0;
    cursor: pointer;
    min-width: 1.63rem;
}
.sku-prop .prop-mainer .sku-item.active {
    color: #fff;
    background-color: #df2127;
}
.sku-quantity {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    padding-right: 0.24rem;

}
.quantity-info {
    padding: 0.32rem 0;
    margin: 0 0.32rem;
}
.sku-quantity h2 {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 100%;
    font-size: 0.4rem;
    padding: 0;
}
.ctrl-ui-sku .sku-quantity .off {
    background-color: #f9f9f9;
}
.ctrl-ui-sku .sku-quantity .btn-minus,
.ctrl-ui-sku .sku-quantity .btn-plus {
    width: 0.88rem;
    cursor: pointer;
}
.ctrl-ui-sku .sku-quantity .btn {
    display: block;
    height: 0.8rem;
    position: relative;

}
.ctrl-ui-sku .sku-quantity .off .btn:after,
.ctrl-ui-sku .sku-quantity .off .btn:before {
    border-color: #ddd;
}
.ctrl-ui-sku .sku-quantity .btn:after,
.ctrl-ui-sku .sku-quantity .btn:before {
    position: absolute;
    top: 0.38rem;
    left: 0.29rem;
    border-bottom: 0.053rem solid #878787;
    width: 0.32rem;
    height: 0.053rem;
    content: ' ';
}
.ctrl-ui-sku .sku-quantity .btn-input {
    width: 1.2rem;
    cursor: pointer;
    border-left: 0.08rem solid #fff;
    border-right: 0.08rem solid #fff;
}
.ctrl-ui-sku .sku-quantity input {
    width: 100%;
    height: 0.8rem;
    text-align: center;
}
.ctrl-ui-sku button,
.ctrl-ui-sku input,
.ctrl-ui-sku select,
.ctrl-ui-sku textarea {
    background-color: transparent;
    color: inherit;
    font-family: inherit;
    font-style: inherit;
    font-weight: inherit;
    min-height: 1.5em;
    border: none;
}
.ctrl-ui-sku .sku-quantity .btn {
    display: block;
    height: 0.8rem;
    position: relative;
}
.ctrl-ui-sku .sku-quantity .btn.plus:before {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
}
.ctrl-ui-sku .sku-quantity .btn-input,
.ctrl-ui-sku .sku-quantity .btn-minus,
.ctrl-ui-sku .sku-quantity .btn-plus {
    background: #f1f1f1;
}
.ctrl-ui-sku .sku-btns {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    bottom: 0;
    left: 0;
    top: auto;
    width: 100%;
    font-size: 0.37rem;

}
.ctrl-ui-sku .sku-btns .addcart {
    /*background: #f90;*/
    background: lighten($color-theme,10%);
}
.ctrl-ui-sku .sku-btns .sku-btn {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 100%;
}
.ctrl-ui-sku .sku-btn {
    height: 1.33rem;
    line-height: 1.33rem;
    text-align: center;
    color: #fff;
    background: #df2127;
    z-index: 1;
}
</style>
