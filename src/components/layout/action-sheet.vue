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
    padding: 0 0 0 .27rem;
    color: #3d3d3d;
}
.head .infos .price {
    color: #ff4965;
    margin-top: .13rem;
    margin-bottom: .05rem;
}
.head strong {
    margin-left: 0.10666667rem;
    line-height: 0.768rem;
    font-size: 0.48rem;
}
.head .text {
margin-bottom: .16rem;
}
.scroll-container {
    height:7.73rem;
    overflow: hidden;
}
.sku-prop .prop-mainer {
    font-size: 0;
    text-align: left;
    margin: 0 0.32rem .27rem .32rem;
    position: relative;
}
.sku-prop .prop-mainer h3 {
    margin-top: 0.27rem;
    margin-bottom: 0;
    line-height: 0.64rem;
    font-size: .4rem;
    color: #3d3d3d;
}
.sku-prop .prop-mainer .sku-item {
    display: inline-block;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    vertical-align: middle;
    font-size: 0.32rem;
    background: #f9f9f9;
    border-radius: 0.16rem;
    padding: 0 0.267rem;
    box-sizing: border-box;
    margin: 0.24rem 0.24rem 0 0;
    cursor: pointer;
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
    padding-right: .24rem;

}
.quantity-info{
  padding: .32rem 0;
  margin: 0 .32rem;
}
.sku-quantity h2 {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 100%;
    font-size: .4rem;
    padding: 0;
}
.ctrl-ui-sku .sku-quantity .off {
    background-color: #f9f9f9;
}
.ctrl-ui-sku .sku-quantity .btn-minus, .ctrl-ui-sku .sku-quantity .btn-plus {
    width: .88rem;
    cursor: pointer;
}
.ctrl-ui-sku .sku-quantity .btn {
    display: block;
    height: .8rem;
    position: relative;

}
.ctrl-ui-sku .sku-quantity .off .btn:after, .ctrl-ui-sku .sku-quantity .off .btn:before {
    border-color: #ddd;
}
.ctrl-ui-sku .sku-quantity .btn:after, .ctrl-ui-sku .sku-quantity .btn:before {
    position: absolute;
    top: .38rem;
    left: .29rem;
    border-bottom: .053rem solid #878787;
    width: .32rem;
    height: .053rem;
    content: ' ';
}
.ctrl-ui-sku .sku-quantity .btn-input {
    width: 1.2rem;
    cursor: pointer;
    border-left: .08rem solid #fff;
    border-right: .08rem solid #fff;
}
.ctrl-ui-sku .sku-quantity input {
    width: 100%;
    height: .8rem;
    text-align: center;
}
.ctrl-ui-sku button, .ctrl-ui-sku input, .ctrl-ui-sku select, .ctrl-ui-sku textarea {
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
    height: .8rem;
    position: relative;
}
.ctrl-ui-sku .sku-quantity .btn.plus:before {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
}
.ctrl-ui-sku .sku-quantity .btn-input, .ctrl-ui-sku .sku-quantity .btn-minus, .ctrl-ui-sku .sku-quantity .btn-plus {
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
    font-size: .37rem;
}
.ctrl-ui-sku .sku-btns .addcart {
    background: #f90;
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
<template>
<mt-popup v-model="popupVisible" position="bottom" style="width:100%;height:11.17rem">
  <div class="sku_list sku-prop ctrl-ui-sku">
    <i class="icon_closed ion-ios-close-outline" @click="quit()"></i>
    <div class="container_sku">
      <div class="head">
        <img :src="data.spec_image[init_color_id]">
        <div class="infos">
          <p class="price">¥<strong id="J_sku-price">27.90</strong><span id="J_sku-stock"></span>
          </p>
          <p class="text">库存：888</p>
          <p class="text">已选 "西班牙套" "6ML*5瓶"</p>
        </div>
      </div>
      <div ref="sku_scroll" class="scroll-container">
        <div class="">
          <div class="prop-mainer">
            <section v-for="(spec,key,index) in data.goods_info.spec_name">
              <h3>{{spec}}</h3>
              <ul class="J_sku-list">
                <li class="sku-item " :class="{'active':keys==875}" v-for="(item,keys,indexs) in data.goods_info.spec_value[key]">{{item}}--{{keys}}</li>
              </ul>
            </section>

          </div>
          <div class="quantity-info">
            <div class="sku-quantity">
              <h2>购买数量 <span></span></h2>
              <p class="btn-minus off">
                <a class="btn minus" min=""></a>
              </p>
              <p class="btn-input"><input type="tel" value="1"></p>
              <p class="btn-plus">
                <a class="btn plus" max=""></a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="sku-btns"><div class="sku-btn addcart">加入购物车</div><div class="sku-btn gobuy">立即购买</div></div>
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
      popupVisible: false
    }
  },
  mounted(){
    console.log(this.data);
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    base: {
      type: Object,
      default: null,
    },
    data: {
      type: Object,
      default: null,
    },
    pick: {
      type: Object,
      default: null,
    },
    goodsid: {
      type: String,
      default: null,
    },
    buytype: {
      type: String,
      default: null,
    }
  },
  computed: {
    ...mapState({
      showpicksheet: state => state.actionsheet.showpicksheet,
    }),
    init_color_id() {
      return this.data.goods_info.color_id
    }
  },
  watch: {
    //同步showpicksheet=popupVisible
    showpicksheet(val, oldVal) {
      this.popupVisible = val
      if(val){
        this.$nextTick(()=>{
          this._initScroll()
        })
      }
    },
    popupVisible(val, oldVal) {
      this.$store.commit('ACTIONSHEET_UPDATE', { key: 'showpicksheet', value: val })
    }
  },
  methods: {
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
    pickattr(key, val) {
      this.$set('pick.value[' + key + '].index', val);
      this.$set('pick.value[' + key + '].active', this.pick.value[key].tag[this.pick.value[key].index]);
      this.$set('pick.value[' + key + '].attr', this.pick.value[key].pack[this.pick.value[key].index]);
      // 判断是否选择完成
      var complete = true;
      var arr = [];
      for (var i = 0; i < this.pick.value.length; i++) {
        if (this.pick.value[i].index === null) complete = false;
        arr.push(this.pick.value[i].attr);
      }
      this.$set('pick.complete', complete);
      this.$set('pick.post', this.pick.complete ? JSON.stringify(arr) : "");
      if (complete) this.query();
    },
    add() {
      if (this.pick.quantity < 999)
        this.$set('pick.quantity', this.pick.quantity + 1);
    },
    move() {
      if (this.pick.quantity > 1)
        this.$set('pick.quantity', this.pick.quantity - 1);
    },
    query() {
      this.$root.ajax({
        url: '/home/goods/getByAttr',
        loading: 3,
        params: {
          goods_id: this.goodsid,
          spec: this.pick.post,
        },
      }, (ret, err) => {
        if (ret) {
          this.$set('pick.price', ret.result.price);
          this.$set('pick.warehouse', ret.result.product_number);
        } else {
          this.$set('pick.complete', false);
          this.$set('show', false);
          this.$root.toast(err.msg);
        }
      });
    },
    submit(control) {
      console.log('control=', control);
      if (this.pick.complete) {
        if (control) {
          if (this.pick.warehouse !== null && this.pick.warehouse < this.pick.quantity) {
            this.$root.toast('商品库存不足');
          } else {
            this.$dispatch('goodsControl', control);
          }
        } else {
          this.quit();
        }
      } else {
        this.$root.toast('请选择商品属性');
      }
    },

    quit() {
      this.popupVisible = false
    }
  }
}
</script>
