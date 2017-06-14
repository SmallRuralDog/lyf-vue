<template lang="html">
<div class="page">
  <div class="topbar">
      <div ref="list_top_menu" class="top-menu">
          <ul ref="list_top_menu_list" class="top-menu-list" :style="'width:'+m_w+'px'">
              <li ref="list_top_menu_item" class="top-menu-item" :class="index==active?'active':''" v-for="(item,index) in goods_class" @click="changeMenu(index)">{{item.gc_name}}</li>
          </ul>
      </div>
  </div>
</div>
</template>

<script>
export default {
  name:"catgoods",
  data() {
    return {
      goods_class: [],
      m_w: 0,
      active: 0,
      gc_id: 0,
      page: 1
    }
  },
  mounted() {
    this.gc_id = this.$route.params.gc_id;
    this.getData()

  },
  methods: {
    getData() {
      this.$api.userGet('goods_list?gc_id=' + this.gc_id, res => {
        if (res.data.data.goods_list.current_page == 1) {
          this.goods_class = res.data.data.goods_class
        }
        this.$nextTick(()=>{
          this._setMenuW()
        })
      }, error => {
        $toast.show(error.message)
      })
    },
    _setMenuW() {
      var items = this.$refs.list_top_menu_item;
      var a = 0;
      for (var index in items) {
        a = a + items[index].clientWidth
      }
      this.m_w = a
      this.$nextTick(() => {
        //this.initScroll()
      })
    },
  }
}
</script>

<style lang="scss">
.topbar {
    height: 1.07rem;
    background: #ffffff;
    z-index: 2000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    color: #333;
}
.top-menu {
    overflow: hidden;
    // padding-left: 0.27rem;
}

.top-menu-list {
    height: 1.07rem;
    width: 100%;
    display: flex;
}

.top-menu-item {
    min-width: 1.33rem;
    height: 100%;
    font-size: 0.37rem;
    text-align: center;
    line-height: 1.07rem;
}
.top-menu-item:first {
    padding-left: 0.53rem;
}

.top-menu-list .active {
    color: #ea5a49;
    border-bottom: 0.08rem solid #ea5a49;
    font-weight: bold;
}
</style>
