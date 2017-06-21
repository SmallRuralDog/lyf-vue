<template lang="html">
<div class="page">
    <div class="page-content">

      <section class="brand J_brand">
        <div class="wrapper-main">
          <div class="wrapper-sub">
            <div class="brand-img">
              <img src="//b1.hucdn.com/upload/brand/1701/18/38161614044120_200x200.jpg!200.webp" />
            </div>
            <div class="brand-name">
              皇朵/HUANGDUO
            </div>
            <div class="collect-num">
              7021人已团
            </div>
            <div class="collect-btn" favor-event="" eid="318711">
              <div class="collect-icon iconfont"></div>
              <div class="collect-text">
                <span>收藏键</span>
              </div>
            </div>
          </div>
          <p class="promotion-info"></p>
        </div>
      </section>



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

</style>
