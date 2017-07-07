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
        }
    }
    p{
      margin-bottom: 0;
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
                            <p style="font-size:.67rem;color:#EA5A49;"><small style="font-size:.43rem; margin-right:3px;">￥</small>{{item.voucher_t_price}}</p>
                            <p class="text-12 color-royal">订单满<strong>{{item.voucher_t_limit}}</strong>元使用（不含邮费）</p>
                            <p class="text-12 color-royal">使用期限：{{item.voucher_t_start_date}} - {{item.voucher_t_end_date}}</p>
                        </div>
                        <div class="" style="width:2.13rem;align-self:center;text-align:right">
                            <button class="button button-royal button-small button-outline color-royal" style="width:1.47rem;" v-if="!item.get_num">已领取</button>
                            <button v-else @click="get_voucher(item.voucher_t_id)" style="width:1.47rem;" class="button button-assertive button-outline button-small">领取</button>
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
    },
    from:{
      type:String,
      default:'goods'
    }
  },
  watch: {
    voucherlist(val, oldVal) {

    },
    popupVisible(val, oldVal) {
      this.popupVisible_o = val
    },
    popupVisible_o(val, oldVal) {
      if(this.from == 'goods'){
        bus.$emit("onVoucherState", val)
      }
      if(this.from == 'cart'){
        bus.$emit("onVoucherStateByCart", val)
      }
      this.$nextTick(() => {
        this._initScroll()
      })
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
      this.popupVisible_o = false
    },
    get_voucher(id) {
      $loading.show();
      this.$api.userAuthGet("get_voucher?voucher_t_id=" + id, res => {
        $toast.show(res.data.message)
      }, error => {
        $toast.show(error.data.message)
      })
    }
  }
}
</script>
