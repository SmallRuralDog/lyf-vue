<template lang="html">
<div class="page">
    <div class="order-manage list">
        <div class="top-fixed">
            <div class="nav-tab-top">
                <ul class="aui-border-b">
                  <template v-for="(item,index) in tabs">
                    <li :class="{'cur':index==active}" @click="go_orderlist(index)">{{item}}</li>
                  </template>
                </ul>
            </div>
        </div>


        <scroll class="page-content" ref="lyf_scroll" :on-refresh="onRefresh" :on-infinite="onInfinite" v-show="init">
            <div class="">
                <ul class="order-list" v-if="order_list.length>0">
                    <li v-for="order in order_list" style="margin-bottom:.27rem;" class="aui-border-b">
                        <div class="module storage"></div>
                        <div class="module seller">
                            <div class="o-t-title-shop">
                                <div class="tcont">
                                    <div class="ico"><img v-lazy="order.order_store.store_avatar"></div>
                                    <div class="contact">
                                        <a>
                                            <p class="title">{{order.order_store.store_name}}</p>
                                            <p class="" style="margin-left:.13rem;"><span class="ion-chevron-right"></span></p>
                                        </a>
                                    </div>
                                    <div class="state">
                                        <div class="state-cont">
                                            <p class="h" style="width:auto;" v-if="!order.if_lock">{{order.order_state|order_stae}}</p>
                                              <p class="h" style="width:auto;" v-else>退款退货中</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="module" @click="go_order_detail(order.order_id)" v-for="goods in order.order_goods" style="border-bottom:1px solid #ffffff;">
                            <div class="item-list o-t-item">
                                <div class="item-img">
                                    <p> <img class="" :src="goods.goods_image_url"> </p>
                                </div>
                                <div class="item-info">
                                    <h3 class="title">{{goods.goods_name}}</h3>
                                    <p class="sku" style="min-height:0;">{{goods.goods_spec}}</p>
                                </div>
                                <div class="item-pay">
                                    <div class="item-pay-data">
                                        <p class="price">￥{{goods.goods_price}}</p>
                                        <p class="price"> <del class="">￥{{goods.goods_marketprice}}</del> </p>
                                        <p class="nums">x{{goods.goods_num}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="module serviceinfo" id="serviceinfo6"></div>
                        <div class="module">

                        </div>
                        <div class="module pay">
                            <div class="o-total-price">
                                <div class="cont"> <span>共<b>{{order.goods_count}}</b>件商品</span> <span>合计:<b>￥{{order.order_amount}}</b></span> <span>(含运费<b>￥{{order.shipping_fee}}</b>)</span> </div>
                            </div>
                        </div>
                        <div class="module orderop" v-if="order.order_state !=20">
                            <div class="o-tab-btn">
                                <ul>
                                    <li class="h" v-if="order.order_state==30" @click="order_receive(order.order_id)"> 确认收货 </li>
                                    <li class="h" v-if="order.order_state==40" @click="$router.push({name:'order_rate',params:{order_id:order.order_id}})"> 评价订单 </li>
                                    <li class="" v-if="order.order_state==30 || order.order_state==40" @click="$router.push({name:'order_logistics',params:{order_id:order.order_id}})"> 查看物流 </li>
                                    <!--li class="h" v-if="order.order_state==10"> 立即付款 </li-->
                                    <li class="" v-if="order.order_state==10" @click="order_cancel(order.order_id)"> 取消订单 </li>
                                    <li class="" v-if="order.order_state==0"> 删除订单 </li>

                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>

                <div v-else class="text-center" style="margin-top:200px;">
                  <p><i class="ion-ios-list-outline color-royal text-80"></i></p>
                  <p>暂无数据</p>
                </div>

            </div>
          <div v-if="!load_more" slot="infinite" class="text-center">
            <template v-if="order_list.length>0">
            没有更多数据
            </template>
          </div><!--要放在scroll内最外层-->


        </scroll>
    </div>
</div>

</template>

<script>
import {mapState} from 'vuex'
import "../../../assets/order.scss"
export default {
  name: "order_list",
  data() {
    return {

      tabs:['全部','待付款','待发货','待收货','待评价'],
      state_type:['all','dfk','dfh','dsh','dpj'],
//      active:0,
//      order_list: [],
//      pages:[1,1,1,1,1],
//      load_more: [true,true,true,true,true],
      loading:false,
//      st:0,
    }
  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      let id=vm.$route.params.type
      vm.active=id
      vm.$store.commit('ORDERLIST_UPDATE',{active:id})
//      vm.loading=true
      vm.getData(() => {
        //vm.$refs.lyf_scroll.infiniteDone()
      })


    })
  },
  mounted() {
//    $loading.show()
  },
  computed:{
    ...mapState({
        active: state => state.orderlist.active,
        order_list: state => state.orderlist.list[state.orderlist.active].order_list,
        page: state => state.orderlist.list[state.orderlist.active].page,
        load_more:state => state.orderlist.list[state.orderlist.active].load_more,
        init:state => state.orderlist.list[state.orderlist.active].init,

    })
  },

  methods: {
    getData(done) {

      if(!this.load_more) return;
      $loading.show()
      console.log('!load_more=',!this.load_more,'loading=',this.loading,'pages=',this.page)
//      if (this.page == 1) {
//        $loading.show()
//      }

      let condition='&state_type='+this.state_type[this.active];
      //console.log('this.active=',this.active,'condition=',condition)
      this.$api.userAuthGet("order_list?page=" + this.page+condition, res => {
        console.log(res);

        if (res.data.status_code == 1) {
          this.$store.commit('ORDERLIST_GETDATA_CALLBACK',{ret:res})
//          if (this.page == 1) {
//            this.order_list = res.data.data.data
//          } else {
//            for(var i in res.data.data.data){
//              this.order_list.push(res.data.data.data[i])
//            }
//
//          }
//          if(res.data.data.last_page==res.data.data.current_page){
//            this.$set(this.load_more,this.active,false)
//          }else{
//            this.$set(this.load_more,this.active,true)
//          }
        }
        this.loading=false
        this.$nextTick(() => {

          $loading.hide()
          done()
        })
      }, error => {

      })

    },
    onRefresh(done) {
      if (this.loading) return;
//      this.page = 1
//      this.load_more = true
      this.$store.commit('ORDERLIST_UPDATE_LIST',{load_more:true})
      this.getData(done)
    },
    onInfinite(){
//      this.$set(this.pages,this.active,this.page+1)
      this.$store.commit('ORDERLIST_UPDATE_LIST',{page:this.page+1})

      console.log('pages=',this.page,'load_more=',this.load_more)
      if(this.load_more){
        this.getData(()=>{
          //this.$refs.lyf_scroll.infiniteDone()
        })
      }

    },
//    onScrollListener(res) {
//      this.st = res
//    },
    go_order_detail(order_id) {
      $router.push({
        name: "order_detail",
        params: {
          order_id: order_id
        }
      })
    },
    order_cancel(order_id, text = '', show = true) { //取消订单
      if (show) {
        $actionSheet.show({
          theme: 'weixin',
          title: '请点击取消理由',
          cancelText: '取消',
          buttons: {
            '我不想买了': () => {
              this.order_cancel(order_id, '我不想买了', false)
            },
            '信息填写错误，重新拍': () => {
              this.order_cancel(order_id, '信息填写错误，重新拍', false)
            },
            '卖家缺货': () => {
              this.order_cancel(order_id, '卖家缺货', false)
            },
            '同城见面交易': () => {
              this.order_cancel(order_id, '同城见面交易', false)
            },
            '其他原因': () => {
              this.order_cancel(order_id, '其他原因', false)
            }
          }
        })
      } else {
        $actionSheet.hide()
        $loading.show()
        this.$api.userAuthPost("order_cancel", {
          order_id: order_id,
          msg: text
        }, res => {
          if (res.data.status_code == 1) {
            $loading.hide()
            this.order_list.filter(a => {
              return a.order_id == order_id
            }).map(a => {
              a.order_state = 0
            })
          } else {
            $toast.show(res.data.message)
          }
        }, error => {
          $toast.show(error.message)
        })
      }
    },
    order_receive(order_id) { //确认收货
      $dialog.confirm({
        theme: 'ios',
        title: '确认收货?',
        cancelText: '取消',
        okText: '确定'
      }).then((res) => {
        if (res) {
          $loading.show()
          this.$api.userAuthGet("order_receive?order_id=" + order_id, res => {
            if (res.data.status_code == 1) {
              $loading.hide()
              this.order_list.filter(a => {
                return a.order_id == order_id
              }).map(a => {
                a.order_state = 40
              })
            } else {
              $toast.show(res.data.message)
            }
          }, error => {
            $toast.show(error.message)
          })
        }
      })
    },
    go_orderlist(id) {
      //this.active=id
      this.$store.commit('ORDERLIST_UPDATE',{active:id})
    },
//    go_orderlist(id) {
//      $router.push({
//        name: 'order_list',
//        params: {
//          type: id
//        }
//      })
//    }
  },
  watch:{

    active(val,oldVal){

      if(!this.init){
        this.loading=true
        this.getData(() => {
          //this.$refs.lyf_scroll.infiniteDone()
        })
      }

    }
  },
  filters: {
    order_stae(val, typr = 1) {
      let text = '';
      let class_name = '';
      switch (val) {
        case 0:
          text = '交易关闭'
          break;
        case 10:
          text = '等待买家付款'
          break;
        case 20:
          text = '等待卖家发货'
          break;
        case 30:
          text = '卖家已发货'
          break;
        case 40:
          text = '交易成功'
          break;
      }
      return text
    }
  }
}
</script>
<style lang="scss">
  @import "../../../assets/config.scss";
  .top-fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9;
  }

  .order-manage .nav-tab-top ul {
    display: flex;
    /*background: #fff;
    border-bottom: 0.01rem solid #e7e7e7;*/
  }

  .order-manage .nav-tab-top ul li {
    height: 1.067rem;
    line-height: 1.067rem;
    /*margin-bottom: -0.01rem;*/
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
</style>
