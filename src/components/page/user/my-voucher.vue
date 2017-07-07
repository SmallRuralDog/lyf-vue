<template lang="html">
<div class="page">
    <div class="order-manage list">
        <div class="top-fixed">
          <div class="nav-tab-top">
            <ul>
              <template v-for="(item,index) in tabs">
                <li :class="{'cur':index==active}" >{{item}}</li>
                <!--@click="changeFav(index)"-->
              </template>
            </ul>
          </div>
        </div>

        <scroll class="page-content" ref="lyf_scroll" style="margin-top: 40px;" v-show="init">
          <!--:on-refresh="onRefresh" :on-infinite="onInfinite"-->
            <div class="voucher-item item-dianpu">
              <div class="hm-flex-1">
                店铺券
                <div class="price-wrapper">
                  ￥<span class="voucher-price">2</span>
                </div>
                <div class="hole hole-up"></div>
                <div class="hole hole-down"></div>
              </div>
              <div class="hm-flex-2">
                <div class="voucher-condition">满29减2</div>
                <div>仅限零食铺子</div>
                <div class="voucher-time">2017.6.15-2017.6.26</div>
              </div>
            </div>

            <div class="voucher-item item-tongyong">
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

            <div class="voucher-item item-leimu">
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

          <div v-if="!load_more" slot="infinite" class="text-center">没有更多数据</div><!--要放在scroll内最外层-->
        </scroll>

      <div class="del-fav-btn" v-show="edit_status" @click="del">删除</div>
    </div>
</div>

</template>

<script>

import "../../../assets/order.scss"
export default {
  data() {
    return {
      init:false,
      edit_status:false,
      choose_arr:[],

      goods_list: [{
        goods_name:'',
        store_name:'',
        log_price:'',
        goods:{
          goods_image:'',
        },
      }],
      page:1,
      load_more: true,
      loading:false,
      tabs:['未使用','已使用/已过期'],
      type:['goods','store'],
      active:0,

    }
  },

  mounted() {
//    $loading.show()
    this.getData(()=>{})

  },
  computed:{
    fav_id_arr(){
      let choose_ids=new Array()
      for(var i in this.choose_arr){
        if(this.choose_arr[i]){
          choose_ids.push(this.goods_list[i].fav_id)
        }
      }
      return choose_ids.join()
    }
  },


  methods: {
    getData(done) {

      if(!this.load_more) return;
      $loading.show()
      console.log('!load_more=',!this.load_more,'loading=',this.loading,'pages=',this.page)
//      if (this.page == 1) {
//        $loading.show()
//      }

      let condition='&type='+this.type[this.active];
      //console.log('this.active=',this.active,'condition=',condition)
      this.$api.userAuthGet("favorites_list?page=" + this.page+condition, res => {
        console.log(res);


        if (res.data.status_code == 1) {

          if (this.page == 1) {
            if(this.active==0){
              this.goods_list = res.data.data.data
              this.$nextTick(()=>{
                this.init=true
                $loading.hide()
              })

              //选择数组初始化
              for(var i in res.data.data.data){
                this.choose_arr.push(false)
              }

            }else {
              this.store_list = res.data.data.data
            }

          } else {
            if(this.active==0){
              for(var i in res.data.data.data){
                this.goods_list.push(res.data.data.data[i])
                for(var i in res.data.data.data){
                  this.choose_arr.push(false)
                }
              }
            }else {
              for(var i in res.data.data.data){
                this.store_list.push(res.data.data.data[i])
              }
            }
          }
          if(res.data.data.last_page==res.data.data.current_page){
            this.$set(this.load_more,this.active,false)
          }else{
            this.$set(this.load_more,this.active,true)
          }
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
      this.load_more = true

      this.getData(done)
    },
    onInfinite(){
      this.$set(this.pages,this.active,this.page+1)

      console.log('pages=',this.page,'load_more=',this.load_more)
      if(this.load_more){
        this.getData(()=>{
          //this.$refs.lyf_scroll.infiniteDone()
        })
      }

    },

    go_order_detail(order_id) {
      $router.push({
        name: "order_detail",
        params: {
          order_id: order_id
        }
      })
    },
    changeFav(index){
      this.active=index
    },
    edit(){
      this.edit_status=true;
    },
    edit_done(){
      this.edit_status=false;
    },
    choose_del(index){
      if(this.choose_arr[index]==false){
        this.$set(this.choose_arr,index,true)
      }else{
        this.$set(this.choose_arr,index,false)
      }

    },
    del(){
      if(!this.fav_id_arr){
        $toast.show('请选择拟删除商品',2000);
        return;
      }
      $loading.show('删除中')
      this.$api.userAuthPost('favorites_del',{
        fav_id:this.fav_id_arr,
        fav_type:this.type[this.active]
      },res=>{
        if(res.data.status_code==1){
          $loading.hide()
          $toast.show('删除成功',2000)
//          this.edit_status=false
          for(var i in this.choose_arr){
            this.$set(this.choose_arr,i,false)
          }
          this.getData(()=>{})
        }

      },err=>{

      })
    },
    open_goods(id){
      this.$router.push({
        name:'goods_detail',
        params:{
          id:id
        }
      })
    }




  },
  watch:{
    active(val,oldVal){
      this.getData(()=>{})
    }
  },
  beforeRouteEnter(to, from, next){
    next(vm=>{
      vm.getData(()=>{})
    })
  }


}
</script>
<style lang="scss">
  $hole-width:10px;
  $color-dianpu:#F3A544;
  $color-tongyong:#F27677;
  $color-leimu:#4FC4F1;
  .voucher-item{
    margin:10px 10px 0;
    background: #fff;
    display: flex;
    border-radius: 5px 0 0 5px;
    overflow: hidden;

  }
  .hole{
    position: absolute;
    width:$hole-width;
    height:$hole-width;
    border-radius: 50%;
    background: #f5f5f5;
  }
  .hole-up{
    right:-$hole-width/2;
    top:-$hole-width/2;
  }
  .hole-down{
    right:-$hole-width/2;
    bottom:-$hole-width/2;
  }
  .voucher-price{
    font-size:40px;
    font-weight:bold;

  }
  .voucher-item .hm-flex-1{
    position: relative;
    border-right: 1px dotted #eee;
    padding:8px 5px 8px 10px;
  }
  .voucher-item.item-dianpu .hm-flex-1{
    border-left:4px solid $color-dianpu;
    color:$color-dianpu;
  }
  .voucher-item.item-tongyong .hm-flex-1{
    border-left:4px solid $color-tongyong;
    color:$color-tongyong;
  }
  .voucher-item.item-leimu .hm-flex-1{
    border-left:4px solid $color-leimu;
    color:$color-leimu;
  }
  .voucher-item .hm-flex-2{
    border-right: 2px dotted #f5f5f5;
    padding:8px 0px 8px 25px;
    display: flex;
    flex-direction:column;
    justify-content: center;

  }
  .price-wrapper{
    text-align: center;
    padding:20px 0 25px;
  }
  .voucher-time{
    color: #999;
    font-size: 12px;
    margin-top: 4px;
  }
  .voucher-condition{
    font-size: 18px;
    margin-bottom: 5px;
  }
  .voucher-item.item-dianpu .hm-flex-2 .voucher-condition{
    color: $color-dianpu;
  }
  .voucher-item.item-tongyong .hm-flex-2 .voucher-condition{
    color: $color-tongyong;
  }
  .voucher-item.item-leimu .hm-flex-2 .voucher-condition{
    color: $color-leimu;
  }



  $color-theme:#F23030;
  .top-fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9;
  }

  .order-manage .nav-tab-top ul {
    display: flex;
    background: #fff;
    border-bottom: 0.01rem solid #e7e7e7;
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
    border-bottom: 0.08rem solid #ea5a49;
    box-sizing: border-box;
    color: #ea5a49;
  }

  .fav-good-item{
    background: #fff;
    padding:10px;
  }
  .del-fav-btn{
    position: fixed;
    left:0;
    right:0;
    bottom:0;
    text-align: center;
    padding:12px;
    background: $color-theme;
    color:#fff;
  }
  .choose-btn{
    position:absolute;left: 0;top:0;font-size: 20px;color:#888;
  }
  .del-active{
    color: $color-theme !important;
  }
</style>
