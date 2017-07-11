<style lang="scss" scoped>

  /*评价列表样式*/
  .reviews{
    background: #fff;
  }
  .reviews .review-item {
    padding: 10px;

  }
  .reviews .content {
    margin: 0px 0 5px;
    color: #3d3d3d;
    font-size: 14px;
    line-height: 1.5;
    padding-left:40px;
  }
  .reviews .head-img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
    border: 1px solid #e4e4e4;
    display: inline-block;
    vertical-align: top;
  }
  .reviews .sku-info span {
    /*margin-right: .384rem;*/
    font-size: 12px;
    line-height: 1.5;
    color: #ccc;
    padding-left:40px;
  }
  .reviews .review-item span {
    display: inline-block;
    vertical-align: top;
  }
  .icon-wuxing{
    float:right;font-size: 10px;
  }



</style>

<template lang="html">

<div class="page">
   <div class="page-content">
      <div class="reviews hm-margin-b">
        <ul class="review-list">
          <li class="review-item aui-border-b">
            <p style="margin-bottom: 0;">
              <img src="//h0.hucdn.com/open/201724/21d777a959c51877_225x225.png" class="head-img lazyimg b-lazy b-loaded">
              <span class="nick">134****5675</span>
              <i class="iconfont icon-wuxing color-theme"></i>
            </p>
            <p class="content">跟图片一致，收到之后很惊喜，网眼很大，很透气，宝宝每天穿着在地上跑来跑去，还没有气球，简直出乎我的意料，满意！</p>
            <p class="sku-info">
              <span>颜色：五双礼盒装 袜子尺码：6-12个月（袜底长约10cm） 宝宝1岁1个月</span>
            </p>
          </li>

          <li class="review-item aui-border-b">
            <p style="margin-bottom: 0;">
              <img src="//h0.hucdn.com/open/201724/b45f79169d677edf_225x225.png" class="head-img lazyimg b-lazy b-loaded">
              <span class="nick">159****6354</span>
              <i class="iconfont icon-wuxing color-theme"></i>
            </p>
            <p class="content">袜子不错，这个天气穿刚好。造型可爱线头不多，有一个一个的洞洞，很透气，整体满意！！</p>
            <p class="sku-info">
              <span>颜色：五双礼盒装 袜子尺码：6-12个月（袜底长约10cm） 宝宝5个月</span>
            </p>
          </li>

          <li class="review-item aui-border-b">
            <p style="margin-bottom: 0;">
              <img src="//h0.hucdn.com/open/201724/21d777a959c51877_225x225.png" class="head-img lazyimg b-lazy b-loaded">
              <span class="nick">134****5675</span>
              <i class="iconfont icon-wuxing color-theme"></i>
            </p>
            <p class="content">跟图片一致，收到之后很惊喜，网眼很大，很透气，宝宝每天穿着在地上跑来跑去，还没有气球，简直出乎我的意料，满意！</p>
            <p class="sku-info">
              <span>颜色：五双礼盒装 袜子尺码：6-12个月（袜底长约10cm） 宝宝1岁1个月</span>
            </p>
          </li>

          <li class="review-item aui-border-b">
            <p style="margin-bottom: 0;">
              <img src="//h0.hucdn.com/open/201724/b45f79169d677edf_225x225.png" class="head-img lazyimg b-lazy b-loaded">
              <span class="nick">159****6354</span>
              <i class="iconfont icon-wuxing color-theme"></i>
            </p>
            <p class="content">袜子不错，这个天气穿刚好。造型可爱线头不多，有一个一个的洞洞，很透气，整体满意！！</p>
            <p class="sku-info">
              <span>颜色：五双礼盒装 袜子尺码：6-12个月（袜底长约10cm） 宝宝5个月</span>
            </p>
          </li>

        </ul>
      </div>




    </div>
</div>

</template>

<script>

export default {
  name: "comment_list",
  data() {
    return {
      init:false,
    }
  },
  mounted() {

  },
  methods: {



  }
}
</script>
