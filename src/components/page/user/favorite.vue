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
            <div class="">
                <div class="hm-flex" style="justify-content: space-between;padding: 10px;">
                  全部商品 ({{goods_list.length}})
                  <div v-if="!edit_status" @click="edit">编辑</div>
                  <div v-else @click="edit_done">完成</div>
                </div>
                <ul>
                    <li v-for="(item,index) in goods_list" style="margin-bottom:.27rem;" class="fav-good-item">
                      <div class="hm-flex">
                        <div class="hm-flex-1" style="position:relative;">
                          <i class="iconfont icon-xuanze choose-btn" :class="{'del-active':choose_arr[index]}" @click="choose_del(index)" v-show="edit_status"></i>
                          <img :src="item.goods.goods_image">
                        </div>
                        <div class="hm-flex-2 hm-flex" @click="open_goods(item.goods.goods_id)" style="flex-direction: column;justify-content: space-between;padding-left: 10px">
                          <div>{{item.goods_name}}</div>
                          <div style="color: #ee2e3a;font-weight: 700;">
                            <span>￥<b><big style="font-size:.48rem;">{{item.log_price|price_yuan}}</big></b>{{item.log_price|price_jiao}}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                </ul>

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
      tabs:['商品','店铺'],
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
