<style lang="css">
</style>
<template lang="html">
<div v-if="show_page">
    <div class="page-content" style="margin-bottom:2.64rem;">
        <div class="cartbuy" style="margin-bottom: 1.32rem;">
            <div class="allItemv2" v-for="(store,s_key,s_index) in cart_list" v-if="store.goods.length > 0">
                <div class="bundlev2">
                    <div class="shop">
                        <div class="o-t-title-shop">
                            <div class="tcont">
                                <div class="shopcb">
                                    <p>
                                        <input :id="'cb-s-'+store.store_id" :value="store.store_id" v-model="store_check_all" class="o-t-cb" type="checkbox">
                                        <label :for="'cb-s-'+store.store_id"></label>
                                    </p>
                                </div>
                                <div class="ico" v-if="false">
                                    <span class="shopIco_B"></span></div>
                                <div class="contact">
                                    <a>
                                        <p class="title">{{store.store_name}}</p>
                                        <p class="arrow">
                                            <span class="icon-right"></span></p>
                                    </a>
                                </div>
                                <div class="state">
                                    <div class="state-cont" v-if="store.voucher_list.length > 0">
                                        <p class="edit undefined color-assertive" @click="neck_voucher(store.voucher_list,store.store_name)"><i class="ion-fireball"></i> 领券</p>
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
                                            <input :id="'cb-'+goods.cart_id" type="checkbox" v-model="goods.is_check" class="cb o-t-cb">
                                            <label :for="'cb-'+goods.cart_id"></label>
                                        </p>
                                    </div>
                                    <div class="item-detail">
                                        <div>
                                            <div class="item-img">
                                                <a>
                                                    <img class="lazy" :src="goods.goods_image_url">
                                                </a>
                                                <div class="icoTxt" v-if="false">
                                                    <span style="color:;background:;">
                                                  <img src="" ></span></div>
                                            </div>
                                            <div class="item-info">
                                                <a>
                                                    <h3 class="title">{{goods.goods_name}}</h3>
                                                    <div class="sku" style="min-height: 1.12rem;">
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
                                                                <span class="minor" v-if="false">00</span></span>
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
                                </div>
                            </div>
                            <div class="item-edit o-t-item undefined" style="background:#fff8f4;" v-if="store.is_edit">
                                <div class="item-cb">
                                    <p>
                                        <input :id="'cb-'+goods.cart_id" type="checkbox" class="cb o-t-cb" v-model="goods.is_check">
                                        <label :for="'cb-'+goods.cart_id"></label>
                                    </p>
                                </div>
                                <div class="item-detail">
                                    <div>
                                        <div class="item-img">
                                            <a>
                                                <img class="lazy" :src="goods.goods_image_url">
                                            </a>
                                        </div>
                                        <div class="item-info2">
                                            <div class="edit-quantity">
                                                <p class="btn-minus">
                                                    <a @click="cut_goods_num(store.store_id,index)" class="btn minus off" min="1"></a>
                                                </p>
                                                <p class="btn-input">
                                                    <input type="number" min="1" v-on:blur="changeCount(store.store_id,index)" v-model.number="goods.goods_num">
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
                                <div class="item-del c-edit-delshow" @click="del_cart(goods.cart_id,store.store_id,index)">
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
            <cart-no-data v-if="cart_count <= 0"></cart-no-data>
        </div>
    </div>
    <div class="cartbuy" v-if="cart_count > 0" style="position:fixed; width:100%;bottom: 1.31rem; margin-top:0;">
        <div class="footer" :class="{'c_fb':show_footer}" style="margin-top:0;">
            <div :class="{'c_fb':show_footer}" class="f-fx">
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
                            <p>不含运费，优惠券等</p>
                        </div>
                    </div>
                    <div class="btn" :class="{'btn-success':total.num>0}" @click="submit_cart()">
                        <p>
                            <span>结算</span>
                            <span>(</span><span>{{total.num}}</span><span>)</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <voucher-list :popupVisible="popupVisible" :voucherlist="voucher_list" :storename="voucher_store_name" :from="'cart'"></voucher-list>
</div>
</template>

<script>
import '../../assets/cart.scss'

import CartNoData from './cart-no-data'
import bus from '../../bus.js'
import VoucherList from '../layout/voucher-list.vue'
import {
  mapState,
  mapActions
} from 'vuex'
export default {
  name: "cart_data",
  components: {
    CartNoData,
    VoucherList
  },
  data() {
    return {
      cart_list: [],
      cart_count: 0,
      store_check_all: [],
      show_page: false,
      is_cart_state: [],
      is_c: true,
      popupVisible: false,
      voucher_list: [],
      voucher_store_name: "店铺优惠券",
    }
  },
  watch: {
    store_check_all: function(val, oldVal) {
      var add = val.length > oldVal.length
      var difference = val.concat(oldVal).filter(function(v) {
        return val.indexOf(v) === -1 || oldVal.indexOf(v) === -1
      })
      if (difference.length > 0 && this.is_c) {
        for (var key in this.cart_list[difference[0]].goods) {
          this.$set(this.cart_list[difference[0]].goods[key], 'is_check', add)
        }
      }
      this.is_c = true
    },
    is_cart_state: function(val, oldVal) {
      this.is_c = false
      this.store_check_all = []
      for (var key in val) {
        if (!this.$api.isCon(this.store_check_all, key)) {
          this.is_c = false
          this.store_check_all.push(Number(key))
        }
      }
    },
    cart_view_data_reload: function(val, oldVal) {
      if (val) {
        this.getList()
      }
    }
  },
  computed: {
    ...mapState({
      cart_view_data_reload: state => state.common.cart_view_data_reload,
    }),
    cart_check_all: {
      get: function() {
        var all = 0;
        var check = 0;
        for (var k in this.cart_list) {
          var g_all = 0;
          var g_check = 0;
          for (var key in this.cart_list[k].goods) {
            all++;
            g_all++;
            if (this.cart_list[k].goods[key].is_check) {
              check++;
              g_check++;
            }
          }
          if (g_all == g_check) {
            this.$set(this.is_cart_state, k, true)
          } else {
            this.$delete(this.is_cart_state, k)
          }
        }
        if (all == check && all > 0) {
          return true;
        } else {
          return false;
        }
      },
      set: function(val) {
        for (var k in this.cart_list) {
          for (var key in this.cart_list[k].goods) {
            this.$set(this.cart_list[k].goods[key], 'is_check', val)
          }
        }
      }
    },
    total: function() {
      var total = 0;
      var num = 0;
      for (var k in this.cart_list) {
        let goods_list = this.cart_list[k].goods;
        for (var key in goods_list) {
          let goods = goods_list[key];
          if (goods.is_check) {
            num++;
            total = total + goods.goods_num * goods.goods_price
          }
        }
      }
      return {
        total: this.$api.fmoney(total, 2),
        num: num
      };
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
      $loading.show("");
      this.getList();
    }
    bus.$on("onVoucherStateByCart", res => {
      console.log(res);
      this.popupVisible = res
    })
  },
  methods: {
    getList() {
      this.$api.userAuthGet('cart_list', res => {
        for (var key in res.data.data.cart_list) {
          this.$set(res.data.data.cart_list[key], "is_edit", false)
          this.$set(res.data.data.cart_list[key], "edit_text", "编辑")
          for (var c_k in res.data.data.cart_list[key].goods) {
            this.$set(res.data.data.cart_list[key].goods[c_k], "is_check", false)
          }
        }
        this.cart_list = res.data.data.cart_list
        this.cart_count = res.data.data.cart_count
        console.log(this.cart_list);
        this.show_page = true
        $loading.hide()
        this.$store.commit('UPDATE_COMMON_DATA', {
          cart_view_data_reload: false
        })
      }, error => {
        this.$store.commit('UPDATE_COMMON_DATA', {
          cart_view_data_reload: false
        })
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
      $loading.show("");
      this.cart_list[store_id].goods[index].goods_num++
        let quantity = this.cart_list[store_id].goods[index].goods_num
      let cart_id = this.cart_list[store_id].goods[index].cart_id
      if (quantity < 1) {
        $toast.show("受不鸟了，宝贝不能再减少了哦")
        return
      }
      this.$api.userAuthGet('cart_edit_quantity?cart_id=' + cart_id + '&quantity=' + quantity, res => {
        if (res.data.status_code != 1) {
          this.cart_list[store_id].goods[index].goods_num--
            $toast.show(res.data.message)
        } else {
          $loading.hide()
        }
      }, error => {
        this.cart_list[store_id].goods[index].goods_num--
      })

    },
    cut_goods_num(store_id, index) {
      if (this.cart_list[store_id].goods[index].goods_num == 1) {
        $toast.show("受不鸟了，宝贝不能再减少了哦")
        return
      }
      this.cart_list[store_id].goods[index].goods_num--
        $loading.show("");
      let quantity = this.cart_list[store_id].goods[index].goods_num
      let cart_id = this.cart_list[store_id].goods[index].cart_id
      if (quantity < 1) {
        $toast.show("受不鸟了，宝贝不能再减少了哦")
        this.cart_list[store_id].goods[index].goods_num = 1
        return
      }
      this.$api.userAuthGet('cart_edit_quantity?cart_id=' + cart_id + '&quantity=' + quantity, res => {
        if (res.data.status_code != 1) {
          this.cart_list[store_id].goods[index].goods_num++
            $toast.show(res.data.message)
        } else {
          $loading.hide()
        }
      }, error => {
        this.cart_list[store_id].goods[index].goods_num++
      })
    },
    changeCount(store_id, index) {
      let quantity = this.cart_list[store_id].goods[index].goods_num
      let cart_id = this.cart_list[store_id].goods[index].cart_id
      if (quantity < 1) {
        $toast.show("受不鸟了，宝贝不能再减少了哦")
        this.cart_list[store_id].goods[index].goods_num = 1
        quantity = 1
      }
      $loading.show("");
      this.$api.userAuthGet('cart_edit_quantity?cart_id=' + cart_id + '&quantity=' + quantity, res => {
        if (res.data.status_code != 1) {
          this.cart_list[store_id].goods[index].goods_num = quantity
          $toast.show(res.data.message)
        } else {
          $loading.hide()
        }
      }, error => {
        this.cart_list[store_id].goods[index].goods_num = 1
      })
    },
    del_cart(cart_id, store_id, index) {
      $dialog.confirm({
        theme: 'ios',
        title: '确认要删除这个宝贝吗?',
        cancelText: '取消',
        okText: '确认'
      }).then((res) => {
        if (res) {
          $loading.show("");
          this.$api.userAuthGet('del_cart?cart_id=' + cart_id, res => {
            if (res.data.status_code == 1) {
              this.$delete(this.cart_list[store_id].goods, index)
              $loading.hide()
            } else if (res.data.status_code == -1) {
              $toast.show(res.data.message)
              this.$delete(this.cart_list[store_id].goods, index)
            } else {
              $toast.show(res.data.message)
            }
          }, error => {
            $toast.show('请求错误')
          })
        }
      })
    },
    submit_cart() {
      if (this.total.num > 0) {
        let cart_arr = [];
        for (var store_id in this.cart_list) {
          this.cart_list[store_id].goods.filter(function(a) {
            return a.is_check === true;
          }).map(function(a) {
            let c_p = a.cart_id + '|' + a.goods_num
            cart_arr.push(c_p)
          })
        }
        $router.push({
          name: 'order_buynow',
          params: { cart_id: cart_arr.join(","), ifcart: true },
        })
      }
    },
    neck_voucher(list, name) {
      this.voucher_list = list
      this.voucher_store_name = name
      this.popupVisible = true
    }
  }
}
</script>
