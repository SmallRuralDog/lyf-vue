<style lang="css">



</style>

<template lang="html">

<div class="page">
    <scroll class="page-content" ref="lyf_scroll" :on-refresh="onRefresh" :on-infinite="onInfinite" v-show="init" style="margin-top: -40px;">
    <!--<div class="page-content" v-show="init">-->

    <div style="background-color: #fff;" v-for="item in data">
      <div class="aui-border-b hm-flex" style="padding: 10px;text-align: right;justify-content: space-between;">
        <div>订单号：{{item.order_sn}}</div>
        <div class="color-theme">
          <span>卖家:{{item.seller_state}}</span>
          <template v-if="item.admin_state_v>1">
          <span class="color-royal">|</span>
          <span>平台:{{item.admin_state}}</span>
          </template>
        </div>
      </div>
      <div class="hm-flex" style="background: #fff;padding: 10px;" v-for="itemg in item.goods_list">
        <div class="hm-flex-1"><img :src="itemg.goods_img"></div>
        <div class="hm-flex-4 hm-flex" style="flex-direction: column;justify-content: space-between;padding-left: 10px">
          <div>{{itemg.goods_name}}</div>
          <div>卖家：{{item.store_name}}
            <div class="aui-label aui-label-danger" @click="go_return_ship(item.refund_id,item.admin_state_v)" v-if="item.seller_state_v==2 && item.admin_state_v<2" style="float:right">上传退货凭证</div>
          </div>
        </div>
      </div>
      <div class="aui-border-t  hm-margin-b" style="background-color: #fff;text-align: right;padding: 10px;">
         <!--退款 共x件商品-->
        退款金额：￥<big>{{item.refund_amount}}</big>
      </div>
    </div>

    <div v-if="!load_more" slot="infinite" class="text-center">
      <template v-if="data.length>0">
        没有更多数据
      </template>
    </div><!--要放在scroll内最外层-->


    </scroll>
</div>

</template>

<script>
import "../../../assets/order-re.scss"
export default {
  name: "order_refund_list",
  data() {
    return {
      init:false,
      page:1,
      data:[{
        "refund_id": 27,
        "order_id": 107,
        "refund_amount": "0.01",
        "refund_sn": "206101170628164801",
        "order_sn": "9000000000010901",
        "add_time": "2017-06-28 16:48:01",
        "seller_state_v": 1,
        "seller_state": "等待审核",
        "admin_state_v": 1,
        "admin_state": "无",
        "store_id": 1,
        "store_name": "老友粉",
        "goods_list": [
          {
            "goods_id": 1119,
            "goods_name": "测试产品 黑色 S",
            "goods_spec": "",
            "goods_img": "http://lyfimg.gxlyf.cn/goods_image/mJyCpvciU4Kjag7arRUtUCJPXYiUD72NWpXwSZ1p.jpeg!240x240"
          }
        ]
      }],
      load_more:true,
      page:1,
      loading:false,
    }
  },
  mounted() {

    this.getData(()=>{
      this.init=true
    })
  },
  methods: {
    getData(done) {
      $loading.show('')
      this.$api.userAuthGet("get_refund_list?page=" + this.page , res => {
        if(res.data.status_code==1){
          this.data.pop()
          for(var i in res.data.data.data){
              this.data.push(res.data.data.data[i])
          }
        }
        if(res.data.data.current_page>=res.data.data.last_page) {
          this.load_more=false
        }

        $loading.hide()
//        this.init=true
        console.log(res)
        done()

      }, error => {

      })
    },
    onRefresh(done) {
      if (this.loading) return;
      this.page = 1
      this.load_more = true
//      this.$store.commit('ORDERLIST_UPDATE_LIST',{load_more:true})
      this.getData(done)

    },
    onInfinite(){
//      this.$set(this.pages,this.active,this.page+1)
//      this.$store.commit('ORDERLIST_UPDATE_LIST',{page:this.page+1})

      console.log('pages=',this.page,'load_more=',this.load_more)
      if(this.load_more){
        this.page=this.page+1
        this.getData(()=>{})
      }

    },

    //上传退货凭证
    go_return_ship(return_id,admin_state_v){

      console.log(return_id,admin_state_v)
      if(admin_state_v==2){
        $toast.show('已上传凭证，等待平台审核',2000)
        return;
      }
      $router.push({
        name:'order_refund_return',
        params:{
          return_id:return_id
        }
      })

    }



  }
}
</script>
