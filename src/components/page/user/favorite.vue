<template lang="html">
<div class="page">
    <div class="order-manage list">

        <scroll class="page-content" ref="lyf_scroll" >
          <!--:on-refresh="onRefresh" :on-infinite="onInfinite"-->
            <div class="">
                <ul class="order-list">
                    <li style="margin-bottom:.27rem;">


                  收藏商品



                    </li>
                </ul>

            </div>
          <div v-if="!load_more" slot="infinite" class="text-center">没有更多数据</div><!--要放在scroll内最外层-->
        </scroll>
    </div>
</div>

</template>

<script>

import "../../../assets/order.scss"
export default {
  data() {
    return {
      order_list: [],
      page:1,
      load_more: true,
      loading:false,

    }
  },

  mounted() {
//    $loading.show()
  },


  methods: {
    getData(done) {

      if(!this.load_more) return;
      console.log('!load_more=',!this.load_more,'loading=',this.loading,'pages=',this.page)
//      if (this.page == 1) {
//        $loading.show()
//      }

      let condition='&state_type='+this.state_type[this.active];
      //console.log('this.active=',this.active,'condition=',condition)
      this.$api.userAuthGet("order_list?page=" + this.page+condition, res => {
        console.log(res);

        if (res.data.status_code == 1) {

          if (this.page == 1) {
            this.order_list = res.data.data.data
          } else {
            for(var i in res.data.data.data){
              this.order_list.push(res.data.data.data[i])
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



  },


}
</script>
<style lang="scss">
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
</style>
