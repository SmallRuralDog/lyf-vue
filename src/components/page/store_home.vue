<template lang="html">
<div class="page">
    <div class="page-content">

      <div class="hm-flex" style="padding: 20px;background: #fff;margin-bottom:2px; ">
        <div style="padding-right: 15px;">
          <img src="//b1.hucdn.com/upload/brand/1701/18/38161614044120_200x200.jpg!200.webp" class="brand-img"/>
        </div>
        <div class="hm-flex-1">
          <div class="brand-name">
            皇朵/HUANGDUO
          </div>
          <div class="collect-num">
            7021人已团
          </div>
        </div>
        <div class="hm-flex" style="width: 40px;flex-direction: column;align-items:center;font-size: 10px;padding-left: 10px;">
          <i class="iconfont icon-favorite" style="font-size: 22px;"></i>
          收藏
        </div>

      </div>


      <div class="goods-list clear">
        <div class="hm-list hm-flex"  v-if="goods.length>0" style="flex-wrap:wrap">
          <div  style="width: 49.4%;margin:0.3%;background: #fff;" v-for="(item,index) in data">
            <div class="hm-list-item" style="padding:0" @click="goodsClick(item.goods_id)">
              <div class="hm-list-inner" style="padding:0">
                <img v-lazy="item.goods_image" style="width: 100%;">
                <div  style="padding:.13rem .08rem .13rem .08rem;">
                  <div class="hm-list-title-2 goods-name aui-ellipsis-2" style=" height:1.17rem; line-height:.59rem; font-size:.37rem; color:#333;">{{item.goods_name}}</div>
                  <div class="hm-list-price hm-flex" style=" margin-top:.07rem;justify-content: space-between;">
                    <div class="" style="color: #ee2e3a;font-weight: 700;">
                      <span>￥<b><big style="font-size:.48rem;">{{item.goods_price}}</big></b></span>
                    </div>
                    <div class="hm-color-gray" style="color:#9c9c9c;">
                      <small>已售</small>{{item.goods_salenum}}<small>件</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>






    </div>
</div>
</template>

<script>


import {
  mapState,
  mapActions
} from 'vuex'
export default {

  components: {

  },
  data() {
    return {
      m_w: 0,
      st: 0,
      menu_item_width: 0,
      menu_len: 0,
      active: 0,
      step_width: 0,
      data:{}

    }
  },
  computed: mapState({
    goods_class: state => state.home.goods_class,
    swiper_data: state => state.home.swiper_data,
    list: state => state.home.list,
    init_load: state => state.home.init_load,

    //goods: state => state.home.list[state.home.active].goods,
    goods: state => state.home.list,
    list_scroll: state => state.home.list_scroll[state.home.active].scroll,
    subclass: state => state.home.list[state.home.active].subclass,
    page: state => state.home.list[state.home.active].page,
    is_load: state => state.home.list[state.home.active].is_load,
    load_more: state => state.home.list[state.home.active].load_more,
    more_data: state => state.home.list[state.home.active].more_data,

  }),
  mounted() {

  },
  beforeRouteEnter(to, from, next) {
    console.log('to:'+to.path, 'from:'+from.path)
    next(vm => {
//        let id = vm.$route.params.id;
//      //            vm.data=dataInit()
//      console.log('beforeRouteEnter id=', id)
//      vm.goods_id = id;
      vm.getData();

    })
  },
  methods: {


    changeMenu(index) {
      //设置当前滚动距离(不准确)
      let o_scrol = this.$refs.lyf_scroll.$el.scrollTop;
      let o_active = this.active;
      //this.$store.commit('UPDATE_HOME_LIST_SCROLL', {active:o_active,scrol:o_scrol})

      //移动menu
      this.active = index;
      this.$store.commit('UPDATE', { active: index })
      if (index >= 1 && index < this.menu_len) {
        this.top_menu_scroll.scrollTo(-this.step_width * (index - 1), 0, 500);
      }
      if (index == this.menu_len) {
        this.top_menu_scroll.scrollTo(-this.step_width * (index - 2), 0, 500);
      }
      //请求数据
      if (this.list[this.active].init == false) {
        this.$store.dispatch('getData', res => {
          this.$nextTick(() => {
            //this.$refs.lyf_scroll.setscrollTop(this.list_scroll)
            this.$refs.lyf_scroll.setscrollTop(0)
            this.$refs.lyf_scroll.infiniteDone()
          })
        })
      } else {
        this.$nextTick(() => {
          //console.log(this.list_scroll);
          this.$refs.lyf_scroll.setscrollTop(0)
          this.$refs.lyf_scroll.infiniteDone()

        })
      }
    },
    getData(){
      this.$api.userGet('index?page=1&gc_id=1',res=>{
        console.log(res)
        this.data=res.data.data.goods_list.data

      },err=>{

      })
    },
    goodsClick(id) {
      $router.push({
        name: 'goods_detail',
        params: {
          id: id,
        }
      });
    },


    goLoad() {
      if (this.is_load) return;
      $loading.show('拼命加载中..')
      this.$store.commit('UPDATE_LIST', {
        more_data: "没有更多数据",
        load_more: true
      })
      this.$store.dispatch('getData', res => {

      })
    },
    onRefresh(done) {
      if (this.is_load) return;
      this.$store.commit('UPDATE_LIST', {
        page: 1,
        load_more: true
      })
      this.$store.dispatch('getData', res => {
        done()
      })
    },
    onInfinite(done) {
      if (this.is_load || !this.load_more) return;
      this.$store.commit('UPDATE_LIST', {
        page: this.page + 1
      })
      this.$store.dispatch('getData', res => {
        done()
      })
    },
    onScrollListener(res) {
      this.st = res
    },
    goTop() {
      document.querySelector(".scroll").scrollTop = 0
    }
  }
}
</script>

<style lang="scss">
.brand-img{
  width:60px;
}
</style>
