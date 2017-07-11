<style lang="scss">

  @import "../../../assets/news.scss";
  .search-btn {
    line-height: 1.07rem;
    padding: 0 0.27rem;
    text-align: center;
    display: inline-block;
  }

  .search-btn i {
    font-size: 0.59rem;
    color: #333;
  }



</style>

<template lang="html">

  <div class="page has-tabbar">
    <div class="">
      <div class="topbar">
        <div ref="top_menu" class="top-menu aui-border-b hm-flex-1">
          <ul ref="top_menu_list" class="top-menu-list" :style="'width:'+m_w+'px'">
            <li ref="top_menu_item" class="top-menu-item" :class="index==active?'active':''" v-for="(item,index) in news_class" @click="changeMenu(index)">{{item.gc_name}}</li>
          </ul>
        </div>
        <a class="search-btn J_search-btn  aui-border-b"><i class="iconfont icon-sousuo"></i></a><!--ion-search-->
      </div>



      <div class="news-list" style="margin-top: 45px;">
        <div class="news-item pic-wide aui-border-b" @click="go_news(111)"><!-- 通栏宽图:加pic-wide，一张图:加pic-one，三张图:加pic-three-->
          <div class="news-title">有胆就来，穿上就能飞！</div>
          <div class="news-pic">
            <img src="https://gw.alicdn.com/tfscom/i2/1645506084014939236/TB2bOkkAY4npuFjSZFmXXXl4FXa_!!0-arctic.jpg_640x640q90s150.jpg">
          </div>
          <div class="news-info">在家zaijia 3 19小时前</div>
        </div>

        <div class="news-item pic-one aui-border-b" @click="go_news(222)">
          <div class="news-title">吃水果容易胖？非也，这6种让你越吃越瘦</div>
          <div class="news-pic">
            <img src="https://gw.alicdn.com/imgextra/i4/2485507108/TB2H7dwwB0lpuFjSszdXXcdxFXa_!!2485507108-0-beehive-scenes.jpg_320x320q90s150.jpg">
          </div>
          <div class="news-info">美食盛会 37 173</div>
        </div>

        <div class="news-item pic-three aui-border-b" @click="go_news(434)">
          <div class="news-title">用渔网袜化人鱼妆，掀开那一刻我真服了！</div>
          <div class="news-pic">
            <div class="pic-div"><img src="https://gw.alicdn.com/imgextra/i4/31231784/TB2r70ioY_0UKFjy1XaXXbKfXXa_!!31231784-0-beehive-scenes.jpg_320x320q90s150.jpg"></div>
            <div class="pic-div"><img src="https://gw.alicdn.com/imgextra/i1/2415696462/TB2U5qvww0kpuFjSspdXXX4YXXa_!!2415696462-0-daren.jpg_320x320q90s150.jpg"></div>
            <div class="pic-div"><img src="https://gw.alicdn.com/imgextra/i3/3269846291/TB2beuxA98mpuFjSZFMXXaxpVXa_!!3269846291-0-beehive-scenes.jpg_320x320q90s150.jpg"></div>
          </div>
          <div class="news-info">BestList 43 53</div>
        </div>
      </div>



    </div>
    <footnav :active="1"></footnav>
</div>

</template>

<script>

import footnav from '../../layout/footnav';
import BScroll from 'better-scroll'
import {
  mapState
} from 'vuex'
export default {
    components: {
        footnav
    },
    data() {
        return {
            msg: 'cool',
            pr: 150,
            activity:[],
          st: 0,
          menu_item_width: 0,
          menu_len: 0,
          active: 0,
          step_width: 0,
          top_menu_scroll:null,

          m_w: 0,
          active: 0,

          news_class:[
            {
              "gc_id": 0,
              "gc_name": "首页"
            },
            {
              "gc_id": 1,
              "gc_name": "女装"
            },
            {
              "gc_id": 21,
              "gc_name": "男装"
            },
            {
              "gc_id": 31,
              "gc_name": "母婴"
            },
            {
              "gc_id": 41,
              "gc_name": "家居"
            },
            {
              "gc_id": 76,
              "gc_name": "美食"
            },
            {
              "gc_id": 51,
              "gc_name": "电器"
            },
            {
              "gc_id": 89,
              "gc_name": "家纺"
            },
            {
              "gc_id": 100,
              "gc_name": "美妆"
            },
            {
              "gc_id": 111,
              "gc_name": "水果"
            },
            {
              "gc_id": 11,
              "gc_name": "鞋包"
            },
            {
              "gc_id": 69,
              "gc_name": "内衣"
            }
          ]
        }
    },
  computed:{
    ...mapState({
//      news_class: state => state.discovery.goods_class,
      list: state => state.discovery.list,
      init_load: state => state.discovery.init_load,
      goods: state => state.discovery.list,
      list_scroll: state => state.discovery.list[state.discovery.active].scroll,
      page: state => state.discovery.list[state.discovery.active].page,
      is_load: state => state.discovery.list[state.discovery.active].is_load,
      load_more: state => state.discovery.list[state.discovery.active].load_more,
      more_data: state => state.discovery.list[state.discovery.active].more_data,

    })
  },
    mounted() {
      $loading.hide()
      this.$store.commit('UPDATE_PAGE_LOAD_STATE_DATA', {
        discovery: true,
      })

      if (!this.init_load) {
        this.initScroll()
        this._setMenuW()
      }
    },
    methods:{
      initScroll() {
        if (this.top_menu_scroll) {
          this.top_menu_scroll.refresh()
        } else {
          this.top_menu_scroll = new BScroll(this.$refs.top_menu, {
            startX: 0,
            startY: 0,
            scrollX: true,
            click: true
          })
        }
        var top_menu = this.$refs.top_menu
        var top_menu_w = top_menu.clientWidth
        this.step_width = (this.m_w - top_menu_w) / (this.menu_len - 3);
        console.log('top_menu_w=', top_menu_w, 'step_width=', this.step_width)
      },
      _setMenuW() {
        var items = this.$refs.top_menu_item;
        var a = 0;
        this.menu_item_width = items[0].clientWidth;
        this.menu_len = items.length;

        for (var index in items) {
          a = a + items[index].clientWidth
        }
        this.m_w = a

        this.$nextTick(() => {
            this.initScroll()
        })
      },
      changeMenu(index) {
        //设置当前y轴滚动距离
        let o_scrol = this.$refs.lyf_scroll.$el.scrollTop;
        let o_active = this.active;
//      console.log('o_active=',o_active,'o_scrol=',o_scrol)
        this.$store.commit('UPDATE_HOME_LIST_SCROLL', {active:o_active,scrol:o_scrol})

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
            this.$refs.lyf_scroll.setscrollTop(this.list_scroll)
          this.$refs.lyf_scroll.infiniteDone()
        })
        })
        } else {
          this.$nextTick(() => {
//          console.log(this.active,this.list_scroll);
            this.$refs.lyf_scroll.setscrollTop(this.list_scroll)
          this.$refs.lyf_scroll.infiniteDone()

        })
        }
      },

      getData(){
        this.$api.userGet("activity",res=>{
          if(res.data.status_code==1){
            this.activity = res.data.data
          }
          $loading.hide()
        },error=>{
          $loading.hide()
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
      onInfinite(done) {
        if (this.is_load || !this.load_more) return;
        this.$store.commit('UPDATE_LIST', {
          page: this.page + 1
        })
        this.$store.dispatch('getData', res => {
          done()
        })
      },
      go_news(id){
        this.$router.push({
          name:'news_detail',
          params:{
            id:id
          }
        })
      }

    }
}

</script>
