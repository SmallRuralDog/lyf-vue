<template lang="html">
<mt-popup v-model="popupVisible_o" position="bottom" style="width:100%; height:10.8rem;">
    <div class="" style="position:absolute; width:100%;">
        <div class="" style="padding-top:.4rem; height:1.47rem; width:100%; ">
            <h1 class="color-dark" style="text-align:center;font-size:.43rem;">{{storename}}</h1>
            <div class="color-royal" style="text-align:center;font-size:.32rem;">领取优惠券</div>
        </div>
        <div style="height:8rem; width:100%;overflow:hidden;" ref="voucher_list">
            <ul>
                <li style="padding:.27rem;border-bottom:1px solid #f7f7f7;" v-for="item in voucherlist">
                    <div class="" style="display:flex;">
                        <div class="" style="flex-grow:1">
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
    </div>
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
                    console.log("123");
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
                        console.log("xxxxxxxxxx");
                        this.voucher_list_scroll.refresh()
                    } else {
                        this.voucher_list_scroll = new BScroll(this.$refs.voucher_list, {
                            startX: 0,
                            startY: 0,
                            click: false
                        })
                    }
                },
                close_voucher() {
                    this.popupVisible_o = false
                }
        }
}

</script>
