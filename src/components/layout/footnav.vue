
<template>
  <footer class="hm-nav-foot aui-border-t">
    <template v-for="(item,index) in list">
    <div class="hm-nav-item" :class="{'active':active==index}" @click="go(item.link,index)">
      <i class="iconfont" :class="[active==index?item.active_icon:item.icon]">
        <!-- <div class="hm-msg" v-if="$index===3" v-show="number>0">{{number}}</div> -->
      </i>
      <div>{{item.title}}</div>
    </div>
    </template>
  </footer>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default{
    data(){
      return {
        list : [
          { title : "首页",   link  : "home",     icon: "icon-shouye-shouye",active_icon:'icon-shouye-shixin1'},
          { title : "发现",   link  : "discovery", icon: "icon-z-new",active_icon:'icon-xinpinshixin'},
          { title : "分类",   link  : "class_all", icon: "icon-sousuo",active_icon:'icon-sousuoshixin'},
          { title : "购物车",   link  : "cart", icon: "icon-gouwuche1",active_icon:'icon-gouwucheshixin'},
          { title : "我的",   link  : "user",   icon: "icon-gerenzhongxinxian",active_icon:'icon-gerenzhongxin'}
        ]
      }
    },
    props: ['active'],
    computed:{
      ...mapState({
          home: state => state.page_load_state.home,
          new_arrivals: state => state.page_load_state.new_arrivals,
          cart: state => state.page_load_state.cart,
          class_all: state => state.page_load_state.class_all,
          user: state => state.page_load_state.user
      })
    },


    methods: {
      go(name,index){
        if ((name == 'home' && !this.home) || (name == 'new_arrivals' && !this.new_arrivals) || (name == 'class_all' && !this.class_all) || (name == 'cart' && !this.cart) || (name == 'user' && !this.user)) {
          $loading.show()
        }
        this.$router.push({name:name})
      }
    },
  }
</script>
<style lang="scss">
  // 导航底
  $color-theme:#F23030;
  $nav-foot-height     : 1.33rem !default;
  $nav-foot-fontsize   : .27rem !default;
  $nav-foot-iconsize   : .64rem !default;
  /*$nav-foot-padding    : .11rem !default;*/
  $nav-foot-bg         : #fff !default;
  $nav-foot-color      : #666 !default;
  $nav-foot-btn-active : $color-theme !default;
  .hm-nav {
    height:$nav-foot-height; background-color:$nav-foot-bg; color:$nav-foot-color;
     font-size:$nav-foot-fontsize;
    /*text-align:center;*/
    display: flex;
    .hm-nav-item {flex:1;
      display: flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
    }/*padding:$nav-foot-padding 0;*/
    .hm-nav-item.active {color:$nav-foot-btn-active;}
    i {font-size:$nav-foot-iconsize; padding-top: .21rem;
      padding-bottom:.05rem;}
  /*margin-bottom:.05rem; display:inline-block;padding-bottom:.05rem; */

    /*span {display:block;}*/
  }
  .hm-nav-foot {
    @extend .hm-nav; z-index:2;
    position:fixed!important; bottom:0; left:0; right:0;
  }
</style>
