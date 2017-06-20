<template>
<div div class="page">
    <div class="topbar">
        <div ref="top_menu" class="top-menu">
            <ul ref="top_menu_list" class="top-menu-list" >
                <li ref="top_menu_item" class="top-menu-item" :class="index==active?'active':''" v-for="(item,index) in tabs" @click="onTabClick(index)">{{item}}</li>
            </ul>
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
        tabs: [
            "待付款",
            "待成团",
            "待发货",
            "待收货",
            "待评价"
        ],
        active: 0,

    }
  },
    beforeRouteEnter(to, from, next) {
        console.log('to:'+to.path, 'from:'+from.path)
        next(vm => {
            let id = vm.$route.params.id;
        //            vm.data=dataInit()
        console.log('beforeRouteEnter id=', id)
        vm.active = id;
//        vm.getData();

        })
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
  methods: {
      onTabClick(index) {
          this.active = index
      },


    goodsClick(id) {
      $router.push({
        name: 'goods_detail',
        params: {
          id: id,
        }
      });
    },
    go_cat(gc_id){
      $router.push({
        name: 'catgoods',
        params: {
          gc_id: gc_id,
        }
      });
    },
    go_search(){
      $router.push({
        name: 'class_all',
        params: {
          show_search: 1,
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
    onScrollListener(res){
      this.st = res
    },
    goTop() {
      document.querySelector(".scroll").scrollTop = 0
    }
  }
}
</script>

<style lang="scss" scoped>
.top-menu{
    width:100%;
}
.top-menu-item{
    width:20%;
}
</style>
