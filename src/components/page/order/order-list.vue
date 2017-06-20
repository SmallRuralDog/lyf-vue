<template>
<!--<div class="page has-navbar" v-nav="{title: '页面标题'}">-->
    <!--<div class="page-content">-->
        <!--&lt;!&ndash;<tabs :tab-items="tabs" :tab-index="tabIndex" :on-tab-click="onTabClick"></tabs>&ndash;&gt;-->
        <!--ss-->
    <!--</div>-->

<!--</div>-->
    <div div class="page">
        <tabs :tab-items="tabs" :tab-index="tabIndex" :on-tab-click="onTabClick"></tabs>
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
        tabIndex: 0,

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
  methods: {
      onTabClick(index) {
          this.tabIndex = index
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

</style>
