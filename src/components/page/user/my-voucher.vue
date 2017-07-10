<style lang="scss">
@import "../../../assets/config.scss";
$hole-width: 10px;
$color-dianpu: #F3A544;
$color-guoqi: #484746;
$color-shiyong: #484746;
$color-tongyong: #F27677;
$color-leimu: #4FC4F1;
.voucher-item {
    margin: 10px 10px 0;
    background: #fff;
    display: flex;
    border-radius: 5px 0 0 5px;
    overflow: hidden;
}

.hole {
    position: absolute;
    width: $hole-width;
    height: $hole-width;
    border-radius: 50%;
    background: #f5f5f5;
}

.hole-up {
    right: -$hole-width/2;
    top: -$hole-width/2;
}

.hole-down {
    right: -$hole-width/2;
    bottom: -$hole-width/2;
}

.voucher-price {
    font-size: 40px;
    font-weight: bold;
}

.voucher-item .hm-flex-1 {
    position: relative;
    border-right: 1px dotted #eee;
    padding: 8px 10px 8px 10px;

}


.voucher-item.item-dianpu .hm-flex-1 {
    border-left: 4px solid $color-dianpu;
    color: $color-dianpu;
}
.voucher-item.item-guoqi .hm-flex-1 {
    border-left: 4px solid $color-guoqi;
    color: $color-guoqi;
}

.voucher-item.item-tongyong .hm-flex-1 {
    border-left: 4px solid $color-tongyong;
    color: $color-tongyong;
}

.voucher-item.item-leimu .hm-flex-1 {
    border-left: 4px solid $color-leimu;
    color: $color-leimu;
}

.voucher-item .hm-flex-2 {
    border-right: 2px dotted #f5f5f5;
    padding: 8px 10px 8px 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    span{
      position: absolute;
      top: 0;
      right: .13rem;
      font-size: .32rem;
      margin: .13rem;
    }
    i{
      font-size:50px;
      position: absolute;
      right: 5px;
      top:5px;
    }
}

.price-wrapper {
    text-align: center;
    padding: 20px 0 25px;
}

.voucher-time {
    color: #999;
    font-size: 12px;
    margin-top: 4px;
}

.voucher-condition {
    font-size: 18px;
    margin-bottom: 5px;
}

.voucher-item.item-dianpu .hm-flex-2 .voucher-condition,.voucher-item.item-dianpu .hm-flex-2 i {
    color: $color-dianpu;
}
.voucher-item.item-guoqi .hm-flex-2 .voucher-condition ,.voucher-item.item-guoqi .hm-flex-2 i{
    color: #484746;
}
.voucher-item.item-tongyong .hm-flex-2 .voucher-condition,.voucher-item.item-tongyong .hm-flex-2 i {
    color: $color-tongyong;
}

.voucher-item.item-leimu .hm-flex-2 .voucher-condition ,.voucher-item.item-leimu .hm-flex-2 i{
    color: $color-leimu;
}

.top-fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9;
}

.order-manage .nav-tab-top ul {
    display: flex;
    /*background: #fff;*/
    /*border-bottom: 0.01rem solid #e7e7e7;*/
}

.order-manage .nav-tab-top ul li {
    height: 1.067rem;
    line-height: 1.067rem;
    margin-bottom: -0.01rem;
    text-align: center;
    font-size: 0.37rem;
    font-weight: 400;
    flex-grow: 1;
    flex-shrink: 0;
}

.order-manage .nav-tab-top ul .cur {
    border-bottom: 0.01rem solid $color-theme;
    box-sizing: border-box;
    color: $color-theme;
    font-weight:bold;
}

.fav-good-item {
    background: #fff;
    padding: 10px;
}

.del-fav-btn {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    padding: 12px;
    background: $color-theme;
    color: #fff;
}

.choose-btn {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 20px;
    color: #888;
}

.del-active {
    color: $color-theme !important;
}
</style>

<template lang="html">

<div class="page">
    <div class="order-manage list">
        <div class="top-fixed">
            <div class="nav-tab-top">
                <ul class=" aui-border-b">
                    <template v-for="(item,index) in tabs">
                        <li @click="change_type(index)" :class="{'cur':index==active}">{{item}}</li>
                    </template>
                </ul>
            </div>
        </div>
        <scroll class="page-content" ref="lyf_scroll" :on-refresh="onRefresh" :on-infinite="onInfinite" v-show="init">
            <template v-for="item in voucher_list">
                <div class="voucher-item item-dianpu" :class="{'item-guoqi':item.voucher_state>1}">
                    <div class="hm-flex-1">店铺券
                        <div class="price-wrapper">
                            <span style="font-size: 20px;">￥</span><span class="voucher-price">{{item.voucher_price}}</span>
                        </div>
                        <div class="hole hole-up"></div>
                        <div class="hole hole-down"></div>
                    </div>



                    <div class="hm-flex-2">
                        <i class="iconfont icon-kuaiguoqi" v-if="item.be_gq"></i>
                        <i class="iconfont icon-yiguoqi" v-if="item.voucher_state==3"></i><!--已过期-->
                        <i class="iconfont icon-yishiyong" v-if="item.voucher_state==2"></i><!--已使用-->
                        <!--<span v-if="item.voucher_state==3">已过期</span>-->
                        <!--<span v-if="item.voucher_state==2">已使用</span>-->
                        <div class="voucher-condition">满{{item.voucher_limit}}减{{item.voucher_price}}</div>
                        <div>仅限{{item.store.store_name}}</div>
                        <div class="voucher-time">{{item.voucher_start_date}}-{{item.voucher_end_date}}</div>
                    </div>
                </div>

                <div class="voucher-item item-tongyong" v-if="false">
                    <div class="hm-flex-1">
                        通用券
                        <div class="price-wrapper">
                            ￥<span class="voucher-price">2</span>
                        </div>
                        <div class="hole hole-up"></div>
                        <div class="hole hole-down"></div>
                    </div>
                    <div class="hm-flex-2">
                        <div class="voucher-condition">满29减2</div>
                        <div>全场通用</div>
                        <div class="voucher-time">2017.6.15-2017.6.26</div>
                    </div>
                </div>

                <div class="voucher-item item-leimu" v-if="false">
                    <div class="hm-flex-1">
                        类目券
                        <div class="price-wrapper">
                            ￥<span class="voucher-price">2</span>
                        </div>
                        <div class="hole hole-up"></div>
                        <div class="hole hole-down"></div>
                    </div>
                    <div class="hm-flex-2">
                        <div class="voucher-condition">满29减2</div>
                        <div>仅手机类目可用</div>
                        <div class="voucher-time">2017.6.15-2017.6.26</div>
                    </div>
                </div>
            </template>
            <div v-if="!load_more && !no_data" slot="infinite" class="text-center">就这么多了</div>
            <div v-else-if="no_data" slot="infinite" class="text-center" style="margin-top:200px;">
              <p><i class="ion-ios-list-outline color-royal text-80"></i></p>
              <p>暂无数据</p>
            </div>
        </scroll>
    </div>
</div>

</template>

<script>
import "../../../assets/order.scss"
export default {
  data() {
    return {
      init: false,
      page: 1,
      type: 1,
      voucher_list: [],
      load_more: true,
      no_data:false,
      loading: false,
      tabs: ['未使用', '已使用/已过期'],
      active: 0,

    }
  },

  mounted() {
    $loading.show()
    this.getData(() => {})

  },
  computed: {

  },
  methods: {
    getData(done) {
      this.$api.userAuthGet("my_voucher_list?page=" + this.page + "&type=" + this.type, res => {
        if (res.data.status_code == 1) {
          if (res.data.data.current_page == 1) {
            this.voucher_list = res.data.data.data
          } else {
            res.data.data.data.map(a => {
              this.voucher_list.push(a)
            })
          }
          if (res.data.data.last_page <= this.page) {
            this.load_more = false
          }
          if(res.data.data.total <= 0){
            this.no_data = true
          }else{
            this.no_data = false
          }
          this.loading = false
          this.init = true
        }
        done()
        $loading.hide()
      }, error => {
        this.loading = false
        $toast.show("请求失败")
      })
    },
    onRefresh(done) {
      if (this.loading) return;
      this.page = 1
      this.load_more = true
      this.getData(done)
    },
    onInfinite(done) {
      this.page + 1
      if (this.load_more) {
        this.getData(done)
      }
    },
    change_type(index) {
      this.active = index
    }
  },
  watch: {
    active(val, oldVal) {
      this.type = val + 1
      this.page = 1
      this.loading = false
      this.load_more = true
      $loading.show()
      this.getData(() => {})
    }
  },
}
</script>
