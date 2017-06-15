<style lang="css">

.cartbuy .c_fb {
    bottom: 1.31rem;
}

</style>

<template lang="html">

<div v-if="show_page">
    <div class="page-content" style="margin-bottom:2.64rem;">
        <div class="cartbuy">
            <div class="allItemv2" v-for="(store,s_key,s_index) in cart_list">
                <div class="bundlev2" id="bundlev2_s_92042735">
                    <div class="shop">
                        <div class="o-t-title-shop">
                            <div class="tcont">
                                <div class="shopcb">
                                    <p v-if="false">
                                        <input :id="'cb-'+store.store_id" class="o-t-cb" type="checkbox">
                                        <label :for="'cb-'+store.store_id"></label>
                                    </p>
                                </div>
                                <div class="ico">
                                    <span class="shopIco_B"></span></div>
                                <div class="contact">
                                    <a>
                                        <p class="title">{{store.store_name}}</p>
                                        <p class="arrow">
                                        <span class="icon-right"></span></p>
                                    </a>
                                </div>
                                <div class="state">
                                    <div class="state-cont" v-if="false">
                                        <p class="edit undefined" >领券</p>
                                    </div>
                                    <div class="state-cont">
                                        <p class="edit undefined" @click="edit_cart(store.store_id)">{{store.edit_text}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="group groupPromotion">
                        <div class="group-promotion" style="background:#fff8f4;" v-if="false">
                            <div class="ctrl-ui-label">
                                <div class="icon">
                                    <img src="//img.alicdn.com/tfs/TB1oh1BRFXXXXb4XFXXXXXXXXXX-160-36.png"></div>
                                <div class="box full limitHeight ">
                                    <div class="title">
                                        <div>
                                            <h2 class="titleSub">6.18-6.20每300减60，可跨店</h2></div>
                                    </div>
                                    <div class="sub">
                                        <div>
                                            <div class="subSmall">去凑单</div>
                                        </div>
                                    </div>
                                    <div class="arrow"></div>
                                </div>
                            </div>
                        </div>
                        <div class="itemv2 edit-false" v-for="(goods,index) in store.goods">
                            <div class="item-box" style="background:#fff8f4;" v-if="!store.is_edit">
                                <div class="item-list o-t-item undefined">
                                    <div class="item-cb">
                                        <p>
                                            <input :id="'cb-'+goods.cart_id" type="checkbox" v-model="goods_all_list[goods.cart_id].is_check"  class="cb o-t-cb">
                                            <label :for="'cb-'+goods.cart_id"></label>
                                        </p>
                                    </div>
                                    <div class="item-detail">
                                        <div>
                                            <div class="item-img">
                                                <a>
                                                    <img class="lazy" v-lazy="goods.goods_image_url" >
                                                  </a>
                                                <div class="icoTxt" v-if="false">
                                                    <span style="color:;background:;">
                                                  <img src="//img.alicdn.com/bao/uploaded/TB14wX2RXXXXXcOaXXXwu0bFXXX.png" ></span></div>
                                            </div>
                                            <div class="item-info">
                                                <a>
                                                    <h3 class="title">{{goods.goods_name}}</h3>
                                                    <div class="sku">
                                                        <p>{{goods.goods_spec_text}}</p>
                                                    </div>
                                                </a>
                                                <div class="item-logos">

                                                </div>
                                                <div class="pay">
                                                    <div class="pay-price">
                                                        <div class="price">
                                                            <p class="o-t-price" data-symbol="￥">
                                                                <span>
                                                          <span class="major" >{{goods.goods_price}}</span>
                                                                <span class="point" v-if="false">.</span>
                                                                <span class="minor"  v-if="false">00</span></span>
                                                            </p>
                                                        </div>
                                                        <div class="originPrice">
                                                            <p>
                                                                <del>￥{{goods.goods_marketprice}}</del></p>
                                                        </div>
                                                    </div>
                                                    <div class="quantity">
                                                        <p>
                                                            <span>x</span>
                                                            <span>{{goods.goods_num}}</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="item-del c-edit-delhide">
                                        <p>删除</p>
                                    </div>
                                </div>
                            </div>
                            <div class="item-edit o-t-item undefined" style="background:#fff8f4;" v-if="store.is_edit">
                                <div class="item-cb">
                                    <p>
                                        <input :id="'cb-'+goods.cart_id" type="checkbox" class="cb o-t-cb" v-model="goods_all_list[goods.cart_id].is_check">
                                        <label :for="'cb-'+goods.cart_id"></label>
                                    </p>
                                </div>
                                <div class="item-detail">
                                    <div>
                                        <div class="item-img">
                                            <a>
                                              <img class="lazy" v-lazy="goods.goods_image_url" >
                                            </a>
                                        </div>
                                        <div class="item-info2">
                                            <div class="edit-quantity">
                                                <p class="btn-minus">
                                                    <a @click="cut_goods_num(store.store_id,index)" class="btn minus off" min="1"></a>
                                                </p>
                                                <p class="btn-input">
                                                    <input type="tel" max="2" min="1" v-model="goods.goods_num">
                                                </p>
                                                <p class="btn-plus">
                                                    <a @click="add_goods_num(store.store_id,index)" class="btn plus" max="2"></a>
                                                </p>
                                            </div>
                                            <div class="edit-sku">
                                                <div>
                                                    <p>{{goods.goods_spec_text}}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="icoTxt" v-if="false">
                                        <span style="color:#;background:#;">
                                      <img src="" ></span>
                                    </div>
                                </div>
                                <div class="item-del c-edit-delshow">
                                    <p>删除</p>
                                </div>
                            </div>
                            <div class="op">
                                <div class="item-del c-edit-delhide">
                                    <p>删除</p>
                                </div>
                            </div>
                            <div class="op2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <cart-no-data v-if="!cart_list"></cart-no-data>
        </div>
    </div>
    <div class="cartbuy">
        <div class="footer" :class="{'c_fb':show_footer}">
            <div class="f-fx">
                <div>
                    <div class="ft-cb">
                        <p>
                            <input id="cb-footer" type="checkbox" class="cb o-t-cb" v-model="cart_check_all">
                            <label for="cb-footer"></label>
                        </p>
                    </div>
                    <div class="qx">全选</div>
                    <div class="pay">
                        <div>
                            <div>合计：</span>
                                <p class="o-t-price" data-symbol="￥">
                                    <span v-html="total.total"></span>
                                </p>
                            </div>
                            <p>不含运费</p>
                        </div>
                    </div>
                    <div class="btn" @click="submit_cart()">
                        <p>
                            <span>结算</span>
                            <span>(</span><span>{{total.num}}</span><span>)</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import '../../assets/cart.scss'
import CartNoData from './cart-no-data'
export default {
  name: "cart-data",
  components: {
    CartNoData
  },
  data() {
    return {
      cart_list: [],
      goods_all_list: [],
      show_page: false
    }
  },
  computed: {
    cart_check_all: {
      get: function() {
        console.log(this.goods_all_list.length);
        return this.goods_all_list.filter(function(item) {
          return item.is_check == true;
        }).length == this.goods_all_list.length-2;
      },
      set: function(val) {
        this.goods_all_list.forEach(function(item) {
          console.log(item);
          item.is_check = val;
        });
      }
    },
    total: function() {
      var total = 0;
      var num = 0;
      this.goods_all_list.filter(function(a) {
        return a.is_check;
      }).map(function(a) {
        num++;
        return a.goods_num * a.goods_price
      }).forEach(function(a) {
        total += a;
      });
      return {total:this.$api.fmoney(total,2),num:num};
    }
  },
  props: {
    show_footer: { //是否显示底部导航栏
      type: Boolean,
      default: true,
      required: false,
    }
  },
  mounted() {
    if (!this.show_page) {
      $loading.show("加载中");
      this.getList();
    }
  },
  methods: {
    getList() {
      this.$api.userAuthGet('cart_list', res => {
        for (var key in res.data.data.cart_list) {
          res.data.data.cart_list[key].is_edit = false;
          res.data.data.cart_list[key].edit_text = "编辑";
          for (var c_k in res.data.data.cart_list[key].goods) {
            res.data.data.cart_list[key].goods[c_k].is_check = false
            this.goods_all_list[res.data.data.cart_list[key].goods[c_k].cart_id] = res.data.data.cart_list[key].goods[c_k]
          }
        }
        this.cart_list = res.data.data.cart_list
        console.log(this.goods_all_list);
        this.show_page = true
      }, error => {

      })
    },
    edit_cart(store_id) {
      if (this.cart_list[store_id].is_edit) {
        this.cart_list[store_id].is_edit = false;
        this.cart_list[store_id].edit_text = "编辑";
      } else {
        this.cart_list[store_id].is_edit = true;
        this.cart_list[store_id].edit_text = "完成";
      }
    },
    add_goods_num(store_id, index) {
      this.cart_list[store_id].goods[index].goods_num++
    },
    cut_goods_num(store_id, index) {
      if (this.cart_list[store_id].goods[index].goods_num == 1) {
        $toast.show("受不鸟了，宝贝不能再减少了哦")
        return
      }
      this.cart_list[store_id].goods[index].goods_num--
    },
    submit_cart() {
      console.log(this.cart_checked);
    }
  }
}
</script>
