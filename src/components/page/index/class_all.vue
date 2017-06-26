<template lang="html">
    <div class="page has-tabbar">
        <div id="search-bar" @click="search_click()">
            <div class="search-container" >
                <div class="search-icon-container">
                    <div class="search-icon-class"></div>
                    <span class="search-box">搜索商品</span>
                </div>
            </div>
        </div>
        <div class="page-content" style="top:1.2rem;">
            <div id="root-list" ref="root_list" class="turn-background-grey">
                <ul :style="'height:'+l_h+'px'">
                    <li ref="root_list_item" v-for="(item,index) in class_list" class="root-list-item " :class="{'root-active':currentIndex==index}"  @click="selectMenu(index)" v-cloak>
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
                            <div class="show-all" @click="go_cat(item.gc_id)">
                                查看更多
                                <img class="detail-arrow" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAQBAMAAADdUfNzAAAAIVBMVEUAAACcnJycnJycnJycnJycnJycnJycnJycnJycnJycnJx3mU74AAAAC3RSTlMAfw5vJHdYSjUbQQwBkC0AAAAySURBVAjXY+AoYgCCicIKQFJV0AhIsgiCOY6onAQgySUYAGFDxMFqIEywXpg5IDNhAAB0CwdERcuYjQAAAABJRU5ErkJggg==">
                            </div>
                        </div>
                        <ul class="detail">
                            <li v-for="chidren in item.children" class="detail-item" @click="go_cat(chidren.gc_id)">
                                <img v-lazy="chidren.logo">
                                <p>{{chidren.gc_name}}</p>
                            </li>

                        </ul>
                    </li>

                    <li class="blank"></li>
                </ul>
            </div>
        </div>
        <div class="search-view-container" v-show="show_search">
    <div class="search-view-box">
        <div class="search-view-top">
            <div class="view-top-container">
                <div id="search-module-submit">
                    <input v-model="search_key" id="view-input" type="search" class="search-box-view-main" placeholder="输入商品名称/关键字">
                </div>
                <div class="search-view-icon"></div>
                <div class="search-content-clear" @click="clear_search()" v-show="search_key != ''"></div>
            </div>
            <div class="cancel-container-view" v-show="search_key == ''">
                <div class="cancel-button-view" style="line-height:.8rem;" @click="search_click()" >取消</div>
            </div>
            <div class="submit-container-view" v-show="search_key != ''">
                <div class="submit-button-view" style="line-height:.8rem;">搜索</div>
            </div>
        </div>
        <div id="search-suggestion-box" v-show="search_key != ''">
          <ul class="search-suggestion-container" avalonctrl="suggestion">
            <li>
                <span data-index="0">123沙发垫</span>
            </li><li>
                <span data-index="1">123组合沙发垫</span>
            </li><li>
                <span data-index="2">123沙发套</span>
            </li><li>
                <span data-index="3">123沙发巾</span>
            </li><li>
                <span data-index="4">123组合沙发套</span>
            </li><li>
                <span data-index="5">123童装</span>
            </li>
        </ul>
        </div>
        <div class="search-main-view" v-show="false">
            <div class="search-recent-title-view">历史搜索</div>
            <div class="search-recent-delete-view">
                <div class="delete-recent-search"></div>
            </div>
            <div class="search-recent-list-view">
            </div>
        </div>
        <div class="search-main-view" v-show="search_key == ''">
            <div class="search-recent-title-view">热门搜索</div>
            <div class="search-recent-list-view search-hotquery-list-view">
                <span class="recent-history-list">厨房收纳架</span>
                <span class="recent-history-list">男士套装</span>
                <span class="recent-history-list">小孩睡衣</span>
                <span class="recent-history-list">外搭女</span>
                <span class="recent-history-list">皮带男</span>
                <span class="recent-history-list">手机指环</span>
                <span class="recent-history-list">音响低音炮</span>
                <span class="recent-history-list">吊带睡衣</span>
                <span class="recent-history-list">手表男</span>
                <span class="recent-history-list">斜挎包女</span><
            </div>
        </div>
    </div>
</div>

        <!--<lyf-tab-bar :index="2"></lyf-tab-bar>-->
        <footnav :active="2"></footnav>
    </div>
</template>

<script>
//import LyfTabBar from '../../layout/lyf-tab-bar';
import footnav from '../../layout/footnav';
import {
  mapState,
  mapActions
} from 'vuex'
import BScroll from 'better-scroll'
export default {
  name:"class_all",
  components: {
//    LyfTabBar,
    footnav
  },
  data() {
    return {
      l_h: 0,
      r_h: 0,
      listHeight: [],
      scrollY: 0,
      show_search:false,
      search_key:'',
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
    //$loading.hide()
    this.$store.commit('UPDATE_PAGE_LOAD_STATE_DATA', {
      class_all:true,
    })
    let s_h = this.$route.params.show_search;
    if(s_h==1){
      this.show_search = true
    }

    if (!this.class_list) {
      $loading.show('')
      this.$store.dispatch('getClassIndexData', res => {
        this.$nextTick(() => {
          $loading.hide()
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
      var items = this.$refs.root_list_item;
      //设置监听滚动位置

      this.detail_list_scroll.on('scroll', (pos) => {
        //scrollY接收变量
        this.scrollY = Math.abs(Math.round(pos.y));
        if (this.currentIndex == 5) {
          let el = items[this.currentIndex];
          this.root_list_scroll.scrollToElement(el, 700);
        } else if (this.currentIndex < 5) {
          let el = items[0];
          this.root_list_scroll.scrollToElement(el, 700);
        }
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
    selectMenu(index) {
      //运用BScroll接口，滚动到相应位置
      let rList = this.$refs.detail_list_item
      //获取对应元素的列表
      let el = rList[index];
      //设置滚动时间
      this.detail_list_scroll.scrollToElement(el, 300);
    },
    search_click(){
      console.log("132132");
      this.show_search = !this.show_search
    },
    clear_search(){
      this.search_key = ''
    },
    go_cat(gc_id){
      this.$store.commit('UPDATE_COMMON_DATA', {
        cat_goods_list_class_id:gc_id,
        cat_goods_list_class_init_menu:false,
        cat_goods_list_class_active:0
      })
      $router.push({
        name: 'catgoods',
        params: {
          gc_id: gc_id,
        }
      });
    }
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
        border-bottom: 0.025rem solid #dddddd;
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
    .search-view-container {
	position:fixed;
	top:0;
	left:0;
	width:100%;
	height:200%;
	background-color:#f8f8f8;
	overflow:hidden;
	z-index:999999998;
}
.search-content-clear,.search-view-icon {
	background-size:contain;
	position:absolute;
	background-repeat:no-repeat
}
.search-box-view-main,.search-recent-list-view span {
	font-family:PingFangSC-Regular,Helvetica,STHeiti STXihei,Microsoft JhengHei,Microsoft YaHei,Arial
}
.search-view-box {
	height:50%;
	overflow-y:auto
}
.search-view-top {
	width:100%;
	padding:.16rem 0 .16rem .32rem;
	height:1.2rem;
	border-bottom:.01rem solid #EDEDED
}
.search-box-view-main,.view-top-container {
	height:.85rem;
	float:left;
	border-radius:.13rem
}
.view-top-container {
	width:8.08rem;
	background-color:#fff
}
.search-box-view-main {
	width:6.4rem!important;
	margin-left:.8rem;
	font-size:.4rem;
	display:inline-block;
	color:#151516;
	-webkit-border-radius:.13rem;
	background-color:#FFF
}
#view-input {
	background:none;
  padding-top: 0;
}
.search-view-icon {
	width:.37rem;
	height:.37rem;
	top:.4rem;
	left:.53rem;
	background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAM1BMVEUAAACenp6dnZ2lpaWdnZ2dnZ2enp6dnZ2dnZ2enp6fn5+cnJydnZ2enp6dnZ2dnZ2cnJwuBT3hAAAAEHRSTlMAL/AR2OVFlopkVcR7Hqa0bCS5IQAAANNJREFUKM91kdm6xRAMRiUSQ4v+7/+0Z2s5bHbXjWHJ8IXpOC8MlhKtWYmKDodvnU8AEuIRU92pmxwpcFE7WA/gGHEKPpa3/7EnmMyMFXBuvfQsA2KUZ6e4zEoC7mSurhuKUBcPWc24FYRFtHx1FIz4Q9JTrPa6Yz/yNTI/UpDeaxacP2SCtgHZXQr8XZrhN3f00Yd9RFZ6LavQJfE13jtAaI77uDBX4DROAsw/7BhQ78hml6oKPNtcMDjJULMNCnIb8fWy24ElorvtYTeGVfNutfwBiJYKBbU3umQAAAAASUVORK5CYII=")
}
.search-icon-container-view {
	display:inline-block;
	width:.4rem;
	height:.4rem
}
.search-icon-container-view img {
	height:.4rem;
	width:.4rem
}
.search-box-container-view {
	background-color:#eceded;
	color:#333;
	display:inline-block;
	height:.8rem
}
.search-box-view {
	width:100%;
	height:100%;
	font-size:.43rem
}
.cancel-container-view,.submit-container-view {
	margin-right:0;
	width:1.25rem;
	height:.93rem;
	font-size:.43rem;
	float:right;
	display:inline-block
}
.cancel-container-view {
	color:#9C9C9C
}
.submit-container-view {
	color:#151516
}
.search-content-clear {
	background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiBAMAAADIaRbxAAAAJFBMVEWxsbGdnZ2dnZ2cnJyenp6dnZ2cnJycnJyfn5+dnZ2cnJycnJwQ7JGfAAAAC3RSTlMBsKP0IHS92VJJMYswFMoAAADTSURBVCjPZVIrDgJBDO2wQAKKBNwagiIZAwFDMBAkBs8BEHgMDosh4QJ7hV2+SS9HZ9pJ2fSJZub1daY/YFwOs9MYFN0+BkyLRDQ9MqqVMHdMWDDRQsUuMntUvALRwX/ciNnUmDkxvsZUlEuIXsfbILxYgCP7hDy6t2R7kJEtoUF2GPkJXDE6PEkcEr50ZJFIyHFEFo1Ygm84I4tAfB9YoojafHgo4xKjUblE2Zfld6e/S4a5ZpiJRKvQSkuu1HbDdsx21XbeTsdO0E7ZboLdFrtRPzHeFgrIg1bIAAAAAElFTkSuQmCC");
	height:.45rem;
	width:.45rem;
	top:.37rem;
	right:1.87rem
}
.search-main-view {
	padding-top:.61rem;
	height:auto;
	width:100%
}
.search-recent-title-view {
	line-height:.43rem;
	font-size:.4rem;
	color:#151516;
	margin-left:.32rem;
	width:2.67rem;
	display:inline-block
}
.search-recent-delete-view {
	padding-top:.05rem;
	float:right;
	margin-right:.53rem;
	width:.43rem;
	height:.43rem;
	background-image:url("http://cdn.yangkeduo.com/assets/img/sprite_search-d13f06ef49.png");
	background-repeat:no-repeat;
	background-size:1.87rem .93rem;
	background-position:0 0
}
.search-recent-list-view {
	margin:.13rem .32rem 0 .05rem
}
.search-recent-list-view span {
	display:inline-block;
	padding:0 .4rem;
	margin:.21rem 0 0 .27rem;
	border:.025rem solid #d2d2d2;
	border-radius:.11rem;
	color:#151516;
	cursor:pointer;
	min-width:.16rem;
	max-width:.8rem;
	overflow:hidden;
	white-space:nowrap;
	text-overflow:ellipsis;
	height:.85rem;
	line-height:.8rem;
	font-size:.37rem;
	text-align:center;
	vertical-align:top
}
@media only screen and (-webkit-min-device-pixel-ratio:2) {
	.search-recent-list-view span {
	max-width:4rem
}
}@media only screen and (-webkit-min-device-pixel-ratio:3) {
	.search-recent-list-view span {
	max-width:4rem
}
}.search-hotquery-list-view {
	height:2.13rem;
	overflow:hidden
}
.search-suggestion-container {
	width:100%;
	height:100%;
	background-color:#F2F2F2
}
.search-suggestion-container li {
	width:100%;
	height:1.23rem;
	padding-left:.32rem;
	background-color:#FFF
}
.search-suggestion-container li span {
	width:100%;
	height:100%;
	color:#58595B;
	overflow:hidden;
	font-size:.4rem;
	white-space:nowrap;
	line-height:1.23rem;
	padding-left:.08rem;
	display:inline-block;
	text-overflow:ellipsis;
	border-bottom:0.025rem solid #EDEDED;
	font-family:PingFangSC-Regular,Helvetica,STHeiti STXihei,Microsoft JhengHei,Microsoft YaHei,Arial
}
.search-suggestion-container li:last-child span {
	border:none
}
.search-suggestion-container .modify-background {
	background-color:#EDEDED
}
</style>
