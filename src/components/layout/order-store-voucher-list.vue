<style lang="scss">
.voucher-top {
    padding-top: 0.4rem;
    height: 1.47rem;
    width: 100%;
    h1 {
        text-align: center;
        font-size: 0.43rem;
        margin-bottom: 0;
    }
    div {
        text-align: center;
        font-size: 0.32rem;
    }
}
.voucher-list {
    height: 8rem;
    width: 100%;
    overflow: hidden;
    ul {
        li {
            padding: 0.27rem;
            border-bottom: 1px solid #f7f7f7;
            .voucher-list-item {
                display: flex;
                .voucher-list-item-left {
                    flex-grow: 1;
                }
            }
            p {
                margin-bottom: 0;
            }
        }
    }
}
</style>

<template lang="html">
<mt-popup v-model="order_store_voucher_list_show" position="bottom" style="width:100%; height:10.8rem;">
        <div class="voucher-top">
            <h1 class="color-dark">{{storename}}</h1>
            <div class="color-royal">可用优惠券</div>
        </div>
        <div class="voucher-list" ref="voucherListScroll">
            <ul>
                <li v-for="item in voucherlist" @click="select_voucher(item.voucher_id,item.voucher_store_id)">
                    <div class="voucher-list-item">
                        <div class="voucher-list-item-left">
                            <p class="text-14 color-assertive">{{item.name}}</p>
                            <p class="text-12 color-royal">订单满<strong>{{item.voucher_limit}}</strong>元使用</p>
                            <p class="text-12 color-royal">使用期限： {{item.voucher_start_date}} - {{item.voucher_end_date}}</p>
                        </div>
                        <div class="" style="width:2.13rem;align-self:center;text-align:right">
                            <i v-if="voucherInfo.voucher_id == item.voucher_id" class="ion-ios-checkmark text-30 color-assertive"></i>
                            <i v-else class="ion-ios-circle-outline text-30 color-royal"></i>
                        </div>
                    </div>
                </li>
                <li  @click="select_voucher('no',voucherInfo.voucher_store_id)">
                  <div class="voucher-list-item">
                      <div class="voucher-list-item-left">
                         <p style="line-height:35px;" class="text-14 color-dark">不使用优惠券</p>
                      </div>
                      <div class="" style="width:2.13rem;align-self:center;text-align:right">
                          <i v-if="voucherInfo == null || voucherInfo == ''" class="ion-ios-checkmark text-30 color-assertive"></i>
                          <i v-else class="ion-ios-circle-outline text-30 color-royal"></i>
                      </div>
                    </div>
                </li>

            </ul>
        </div>
        <div @click="close_voucher()" style="height:1.33rem; line-height:1.33rem; text-align:center;color:#ffffff;background-color:#EA5A49; font-size:.37rem;">关闭</div>
</mt-popup>

</template>

<script>
import BScroll from 'better-scroll'
import bus from '../../bus.js'
export default {
  data() {
    return {
      order_store_voucher_list_show: false,
    }
  },
  props: {
    popupVisible: {
      type: Boolean,
      default: false,
    },
    voucherlist: {
      type: Array,
      default: null,
    },
    voucherInfo: {
      type: Object|Array,
      default: null,
    },
    storename: {
      type: String,
      default: "优惠券"
    }
  },
  watch: {
    voucherlist(val, oldVal) {
      this.$nextTick(() => {
        this._initScroll()
      })
    },
    popupVisible(val, oldVal) {
      this.order_store_voucher_list_show = val
    },
    order_store_voucher_list_show(val, oldVal) {
      bus.$emit("onBuyVoucherState", val)
    }
  },
  methods: {
    _initScroll() {
      if (this.voucher_list_scroll) {
        this.voucher_list_scroll.refresh()
      } else {
        this.voucher_list_scroll = new BScroll(this.$refs.voucherListScroll, {
          click: false
        })
      }
    },
    close_voucher() {
      this.order_store_voucher_list_show = false
    },
    select_voucher(voucher_id, store_id) {
      let res = {voucher_id:voucher_id,store_id:store_id};
      bus.$emit("onBuyVoucherselect", res)
    }
  }
}
</script>
