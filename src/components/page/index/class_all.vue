<template lang="html">
<div class="page has-tabbar">
  <div id="search-bar">
        <div class="search-container">
                <div class="search-icon-container">
                    <div class="search-icon-class"></div>
                    <span class="search-box">搜索商品</span>
                </div>
            </div>
        </div>
        <div class="page-content" style="top:1.2rem;">
          <div id="root-list" ref="root_list" class="turn-background-grey">
            <ul :style="'height:'+l_h+'px'">
                <li ref="root_list_item" v-for="(item,index) in class_list" class="root-list-item " :class="{'root-active':currentIndex==index}"  @click="selectMenu(index,$event)" v-cloak>
                    <div class="root-box">
                        <span>{{item.gc_name}}</span>
                        <i class="icon icon-category-bag url-icon">
                            <img class="selected-icon" src="http://omsproductionimg.yangkeduo.com/images/2017-06-01/834a8cc3c7ae5f87aa4f23c310352412.png">
                            <img class="unselected-icon" src="http://omsproductionimg.yangkeduo.com/images/2017-06-04/da66477f08f39bbb5ae6d245176e3799.png">
                        </i>
                    </div>
                </li>
            </ul>
        </div>
        <div id="detail-list" ref="detail_list" >
        <ul :style="'height:'+r_h+'px'">
            <li ref="detail_list_item" v-for="(item,index) in class_list" class="classification-detail-item">
                <div class="head">
                    <div class="tab">
                        <span>{{item.gc_name}}</span>
                    </div>
                    <div class="show-all">
                        查看更多
                        <img class="detail-arrow" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAQBAMAAADdUfNzAAAAIVBMVEUAAACcnJycnJycnJycnJycnJycnJycnJycnJycnJycnJx3mU74AAAAC3RSTlMAfw5vJHdYSjUbQQwBkC0AAAAySURBVAjXY+AoYgCCicIKQFJV0AhIsgiCOY6onAQgySUYAGFDxMFqIEywXpg5IDNhAAB0CwdERcuYjQAAAABJRU5ErkJggg==">
                    </div>
                </div>
                <ul class="detail">
                    <li v-for="chidren in item.children" class="detail-item">
                        <img v-lazy="chidren.logo">
                        <p>{{chidren.gc_name}}</p>
                    </li>

                </ul>
            </li>

            <li class="blank"></li>
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
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      l_h: 0,
      r_h: 0,
      listHeight: [],
      scrollY: 0,
    }
  },
  computed: {
    ...mapState({
      class_list: state => state.class_index.class_list,
      is_load: state => state.class_index.is_load,
    }),
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        //判断当currentIndex在height1和height2之间的时候显示
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        //最后一个区间没有height2
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    }
  },
  mounted() {
    if (!this.class_list) {
      this.$store.dispatch('getClassIndexData', res => {
        this.$nextTick(() => {
          this._setListH()
        });
      })
    }
  },
  methods: {
    _initScroll() {
      if (this.root_list_scroll) {
        this.root_list_scroll.refresh()
      } else {
        this.root_list_scroll = new BScroll(this.$refs.root_list, {
          startX: 0,
          startY: 0,
          scrollY: true,
          bounce: true,
          click: true
        })
      }
      if (this.detail_list_scroll) {
        this.detail_list_scroll.refresh()
      } else {
        this.detail_list_scroll = new BScroll(this.$refs.detail_list, {
          startX: 0,
          startY: 0,
          scrollY: true,
          bounce: true,
          click: true,
          probeType: 3,
        })
      }
      //设置监听滚动位置
      this.detail_list_scroll.on('scroll', (pos) => {
        //scrollY接收变量
        this.scrollY = Math.abs(Math.round(pos.y));
      })
    },
    _setListH() {
      var items = this.$refs.root_list_item;
      var items_r = this.$refs.detail_list_item;
      var a = 0;
      var b = 0;
      for (var index in items) {
        a = a + items[index].clientHeight
      }
      this.l_h = a
      //把第一个高度送入数组
      this.listHeight.push(b);
      for (var index in items_r) {
        b = b + items_r[index].clientHeight
        this.listHeight.push(b);
      }
      console.log(this.listHeight);
      this.r_h = b
      this.$nextTick(() => {
        this._initScroll()
      })
    },
    selectMenu(index, event) {
      // 自己默认派发事件时候(BScroll),_constructed被置为true,但是浏览器原生并没有这个属性
      if (!event._constructed) {
        return;
      }
      //运用BScroll接口，滚动到相应位置
      let foodList = this.$refs.detail_list_item
      //获取对应元素的列表
      let el = foodList[index];
      //设置滚动时间
      this.detail_list_scroll.scrollToElement(el, 300);
    },
  }
}
</script>

<style lang="css">
#search-bar {
    width: 100%;
    height: 1.2rem;
    background-color: #f8f8f8;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
}
#search-bar:before {
    position: absolute;
    width: 200%;
    height: 200%;
    transform-origin: 0 0;
    transform: scale(.5,.5);
    box-sizing: border-box;
    -webkit-transform-origin: 0 0;
    -webkit-transform: scale(.5,.5);
    -webkit-box-sizing: border-box;
    content: '';
    border-bottom: .01rem solid #EDEDED;
}
#search-bar .search-container {
    background-color: #f2f2f2;
    text-align: center;
    height: 1.2rem;
    padding: .16rem .27rem;
}
#search-bar .search-container .search-icon-container {
    border-radius: .13rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -webkit-align-items: center;
    -webkit-justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    height: .85rem;
    background-color: #fff;
}
#search-bar .search-container .search-icon-container .search-icon-class {
    display: inline-block;
    width: .37rem;
    height: .37rem;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAM1BMVEUAAACenp6dnZ2lpaWdnZ2dnZ2enp6dnZ2dnZ2enp6fn5+cnJydnZ2enp6dnZ2dnZ2cnJwuBT3hAAAAEHRSTlMAL/AR2OVFlopkVcR7Hqa0bCS5IQAAANNJREFUKM91kdm6xRAMRiUSQ4v+7/+0Z2s5bHbXjWHJ8IXpOC8MlhKtWYmKDodvnU8AEuIRU92pmxwpcFE7WA/gGHEKPpa3/7EnmMyMFXBuvfQsA2KUZ6e4zEoC7mSurhuKUBcPWc24FYRFtHx1FIz4Q9JTrPa6Yz/yNTI/UpDeaxacP2SCtgHZXQr8XZrhN3f00Yd9RFZ6LavQJfE13jtAaI77uDBX4DROAsw/7BhQ78hml6oKPNtcMDjJULMNCnIb8fWy24ElorvtYTeGVfNutfwBiJYKBbU3umQAAAAASUVORK5CYII=);
    background-repeat: no-repeat;
    background-size: contain;
    margin-right: .21rem;
}
#search-bar .search-container .search-box {
    line-height: 1;
    font-size: .4rem;
    color: #9c9c9c;
}

#detail-list, #root-list {
    float: left;
    overflow: hidden;
}
#root-list {
    position: relative;
    height: 100%;
    width: 2.72rem;
}
.root-list-item {
    position: relative;
    height: 1.41rem;
    color: #666;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-display: flex;
    -webkit-justify-content: center;
    -webkit-align-items: center;
    background-color: #fafafa;
}
.root-active {
    color: #e02e24;
    background-color: #fff;
}
.root-list-item .root-box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.root-list-item .root-box span {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    text-align: center;
    font-size: .35rem;
}
.root-list-item .root-box i {
    width: .56rem;
    height: .56rem;
    border-radius: 50%;
    text-align: center;
    box-sizing: border-box;
    position: relative;
    margin-left: .16rem;
}
.root-list-item .root-box i:before {
    display: inline-block;
    line-height: .56rem;
    font-size: .29rem;
    color: #d8d8d8;
    position: relative;
}

.root-list-item .root-box i .selected-icon {
    display: none;
}
.root-active .root-box .icon .unselected-icon {
    display: none;
}
.root-list-item .root-box i .unselected-icon {
    display: inline-block;
}
.root-active .root-box .icon .selected-icon {
    display: inline-block;
}
.root-list-item .root-box i img {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    z-index: 10;
}

#detail-list {
    position: relative;
    width: 7.28rem;
    padding: 0 .27rem 0 0;
    height: 100%;
    background: #ffffff;
}
.classification-detail-item .head {
    padding-top: .43rem;
    position: relative;
    width: 100%;
    height: .53rem;
    line-height: .53rem;
    margin-bottom: .19rem;
}
.classification-detail-item .head .tab {
    float: left;
    height: .53rem;
    background-size: 1.55rem .53rem;
    background-repeat: no-repeat;
}
.classification-detail-item .head .tab span {
    color: #333;
    margin-left: .29rem;
    font-size: .35rem;
}
.classification-detail-item .head .show-all {
    float: right;
    font-size: .32rem;
    color: #9c9c9c;
    height: .53rem;
}
.classification-detail-item .head .show-all .detail-arrow {
    width: .11rem;
    height: .16rem;
    vertical-align: middle;
    margin: 0 0 .05rem .08rem;
}
.classification-detail-item .detail {
    margin-left: .27rem;
    width: 100%;
    overflow: hidden;
}
.classification-detail-item .detail li {
    width: 1.6rem;
    height: 1.92rem;
    margin: 0 .72rem .43rem 0;
    float: left;
}
.classification-detail-item .detail li img {
    width: 1.6rem;
    height: 1.6rem;
}
.classification-detail-item .detail li p {
    color: #666;
    font-size: .32rem;
    text-align: center;
}
</style>
