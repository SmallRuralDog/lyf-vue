<style lang="scss">
.voucher-top{
  padding-top:.4rem; height:1.47rem; width:100%;
  h1{
    text-align:center;font-size:.43rem;
  }
  div{
    text-align:center;font-size:.32rem;
  }
}
.voucher-list{
  height:8rem; width:100%;overflow:hidden;
  ul{
    li{
      padding:.27rem;border-bottom:1px solid #f7f7f7;
      .voucher-list-item{
        display:flex;
        .voucher-list-item-left{
          flex-grow:1
        }
      }
    }
  }
}
</style>

<template lang="html">
<mt-popup v-model="popupVisible_o" position="bottom" style="width:100%; height:10.8rem;">
        <div class="voucher-top">
            <h1 class="color-dark">{{storename}}</h1>
            <div class="color-royal">领取优惠券</div>
        </div>
        <div class="voucher-list" ref="voucherListScroll">
            <ul>
                <li v-for="item in voucherlist">
                    <div class="voucher-list-item">
                        <div class="voucher-list-item-left">
                            <p style="font-size:.67rem;color:#EA5A49;">{{item.voucher_t_price}}<small style="font-size:.43rem; margin-left:3px;">元</small></p>
                            <p class="text-12 color-dark">订单满<strong style="color:#EA5A49;">{{item.voucher_t_limit}}</strong>元使用（不含邮费）</p>
                            <p class="text-12 color-royal">使用期限 {{item.voucher_t_start_date}} - {{item.voucher_t_end_date}}</p>
                        </div>
                        <div class="" style="width:2.13rem;align-self:center;text-align:right">
                            <button style="width:1.47rem;" class="button button-assertive button-outline button-small">领取</button>
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
      popupVisible_o: false,
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
      this.popupVisible_o = val
    },
    popupVisible_o(val, oldVal) {
      bus.$emit("onVoucherState", val)

    }
  },
  methods: {
    _initScroll() {
      if (this.voucher_list_scroll) {
        this.voucher_list_scroll.refresh()
      } else {
        this.voucher_list_scroll = new BScroll(this.$refs.voucherListScroll, {
          click: true
        })
      }
    },
    close_voucher() {
      this.popupVisible_o = false
    }
  }
}
</script>
