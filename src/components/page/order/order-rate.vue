<template lang="html">
  <div class="page">
    <div class="page-content">
      <div class="rate-main" v-if="page_show">

        <div class="rate-goods" v-for="goods in data.order_goods">
          <div class="goods-info">
            <img v-lazy="goods.goods_image_url" alt="">
            <div class="">
              <span>{{goods.goods_name}}</span>
            </div>
          </div>

          <div class="input-info">
            <div class="">
              <textarea v-model="goods.content" placeholder="宝贝满足你的期待吗？说说你的使用心得，分享给想买的他们吧"></textarea>
            </div>
          </div>

          <div class="nickname-info">
            <div class="nickname-info-box" @click="nimin_goods(goods.goods_id)">
              <div class="nickname-info-ck">
                <img :src="goods.nimin?ckecked:ckeck" alt="">
                <span>匿名评价</span>
              </div>
              <div class="nickname-info-text">
                <span>{{goods.nimin|set_nimi}}</span>
              </div>
            </div>
          </div>

          <div class="desc-info">
            <div class="desc-info-box">
              <div class="desc-info-box-list">
                <div class="l-a">
                  <span>描述相符</span>
                </div>
                <div class="l-b">
                  <div class="l-b-img" v-for="(item,index) in 5" @click="scores_goods(goods.goods_id,index+1)">
                    <img :src="goods.scores<index+1?xin_ck:xin_cked" alt="">
                  </div>
                </div>
                <div class="l-c">
                  <span>{{goods.scores|set_scores}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="reat-store-info">
          <div class="store-info">
            <img :src="store_icon" alt="">
            <span>店铺评分</span>
          </div>
          <div class="desc-info">
            <div class="desc-info-box" style="border-width:0; margin-left:0;">
              <div class="desc-info-box-list">
                <div class="l-a">
                  <span>物流服务</span>
                </div>
                <div class="l-b">
                  <div class="l-b-img" v-for="(item,index) in 5" @click="scores_store('d',index+1)">
                    <img :src="data.order_store.deliverycredit<index+1?xin_ck:xin_cked" alt="">
                  </div>
                </div>
                <div class="l-c">
                  <span>{{data.order_store.deliverycredit|set_scores}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="desc-info">
            <div class="desc-info-box" style="border-width:0; margin-left:0;">
              <div class="desc-info-box-list">
                <div class="l-a">
                  <span>服务态度</span>
                </div>
                <div class="l-b">
                  <div class="l-b-img" v-for="(item,index) in 5" @click="scores_store('s',index+1)">
                    <img :src="data.order_store.servicecredit<index+1?xin_ck:xin_cked" alt="">
                  </div>
                </div>
                <div class="l-c">
                  <span>{{data.order_store.servicecredit|set_scores}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

<div class="reat-push" v-if="page_show" @click="rate_push()">
  <span>发表评价</span>
</div>

  </div>
</template>

<script>
export default {
  name: "order_rate",
  data() {
    return {
      ckecked: require("../../../assets/images/reat-nick-checked.png"),
      ckeck: require("../../../assets/images/reat-nick-check.png"),
      xin_cked: require("../../../assets/images/xin-cked.png"),
      xin_ck: require("../../../assets/images/xin-ck.png"),
      store_icon: require("../../../assets/images/store-icon.png"),
      order_id: 0,
      data: {
        order_goods: [],
        order_store: []
      },
      page_show: false
    }
  },
  mounted() {
    this.order_id = this.$route.params.order_id
    console.log(this.order_id);
    $loading.show()
    this.getData()
  },
  methods: {
    getData() {
      this.$api.userAuthGet("order_rate?order_id=" + this.order_id, res => {
        if (res.data.status_code == 1) {
          this.data = res.data.data
          this.data.order_goods.map(a => {
            this.$set(a, 'nimin', true)
            this.$set(a, 'scores', 5)
            this.$set(a, 'content', "")
          })
          this.$set(this.data.order_store, 'servicecredit', 0) //服务默认评分
          this.$set(this.data.order_store, 'deliverycredit', 0) //物流默认评分
          console.log(this.data.order_goods);
          this.page_show = true
          $loading.hide()

        }else{
          $toast.show(res.data.message)

          setTimeout(()=>{
            $router.go(-2)
          },1500);
        }
      }, error => {

      })
    },
    nimin_goods(goods_id) {
      this.data.order_goods.filter(a => {
        return a.goods_id == goods_id
      }).map(a => {
        a.nimin = !a.nimin
      })
    },
    scores_goods(goods_id, scores) {
      this.data.order_goods.filter(a => {
        return a.goods_id == goods_id
      }).map(a => {
        a.scores = scores
      })
    },
    scores_store(type, scores) {
      if (type == 's') {
        this.$set(this.data.order_store, 'servicecredit', scores)
      } else {
        this.$set(this.data.order_store, 'deliverycredit', scores)
      }
    },
    rate_push() {
      let servicecredit = this.data.order_store.servicecredit
      let deliverycredit = this.data.order_store.deliverycredit
      if (deliverycredit <= 0 || deliverycredit > 5) {
        $toast.show("请对物流服务评分")
        return
      }
      if (servicecredit <= 0 || servicecredit > 5) {
        $toast.show("请对服务态度评分")
        return
      }
      let goods = new Object()
      this.data.order_goods.map(a => {
        let item = new Object()
        item.score = a.scores
        item.comment = a.content
        item.anony = a.nimin
        goods[a.goods_id] = item
      })

      console.log(goods);
      $loading.show()
      this.$api.userAuthPost("order_rate", {
        order_id: this.order_id,
        goods: goods,
        store_servicecredit: servicecredit,
        store_deliverycredit: deliverycredit
      }, res => {
        if(res.data.status_code==1){
          $toast.show(res.data.message)
        }else{
          $toast.show(res.data.message)
        }
      }, error => {
        $toast.show(res.data.message)
      })

    }

  },
  filters: {
    set_scores(value) {
      let str = ""
      switch (value) {
        case 1:
          str = "很不满意"
          break;
        case 2:
          str = "不满意"
          break;
        case 3:
          str = "一般"
          break;
        case 4:
          str = "满意"
          break;
        case 5:
          str = "非常满意"
          break;
      }
      return str
    },
    set_nimi(value) {
      if (value) {
        return "你写的评价会以匿名的形式展现"
      } else {
        return "你的评价能帮助其他小伙伴哟"
      }
    }
  }
}
</script>

<style lang="scss">
.rate-main {
    border: 0 solid black;
    position: relative;
    box-sizing: border-box;
    display: flex;
    -webkit-box-orient: vertical;
    flex-direction: column;
    align-content: flex-start;
    flex-shrink: 0;
    padding-bottom: 1.56rem;
    width: 100%;
}
.rate-goods {
    border-width: 0 0 0.5px;
    border-style: solid;
    border-color: black black rgb(231, 231, 231);
    border-image: initial;
    position: relative;
    box-sizing: border-box;
    display: flex;
    -webkit-box-orient: vertical;
    flex-direction: column;
    align-content: flex-start;
    flex-shrink: 0;
    margin-bottom: 0.32rem;
    .goods-info {
        border-width: 0 0 0.01rem;
        border-style: solid;
        border-color: black black rgb(231, 231, 231);
        border-image: initial;
        position: relative;
        box-sizing: border-box;
        display: flex;
        -webkit-box-orient: horizontal;
        flex-direction: row;
        place-content: flex-start center;
        flex-shrink: 0;
        background-color: rgb(255, 255, 255);
        -webkit-box-align: center;
        align-items: center;
        padding: 0.35rem 0.32rem;
        -webkit-box-pack: center;
        img {
            display: flex;
            width: 0.69rem;
            height: 0.69rem;
            margin-right: 0.32rem;
        }
        div {
            border: 0 solid black;
            position: relative;
            box-sizing: border-box;
            display: flex;
            -webkit-box-orient: vertical;
            flex-direction: column;
            align-content: flex-start;
            flex: 1 1 0;
            padding: 0;
            -webkit-box-flex: 1;
            span {
                border: 0 solid black;
                position: relative;
                box-sizing: border-box;
                display: block;
                -webkit-box-orient: vertical;
                flex-direction: column;
                align-content: flex-start;
                flex-shrink: 0;
                font-size: 0.37rem;
            }
        }
    }
    .input-info {
        border: 0 solid black;
        position: relative;
        box-sizing: border-box;
        display: flex;
        -webkit-box-orient: vertical;
        flex-direction: column;
        align-content: flex-start;
        flex-shrink: 0;
        padding: 0.35rem 0.32rem 0;
        background-color: rgb(255, 255, 255);
        div {
            border: 0 solid black;
            position: relative;
            box-sizing: border-box;
            display: flex;
            -webkit-box-orient: horizontal;
            flex-direction: row;
            align-content: flex-start;
            flex-shrink: 0;
            textarea {
                background-color: transparent;
                border-color: rgb(0, 0, 0);
                border-width: 0;
                box-sizing: border-box;
                color: rgb(0, 0, 0);
                padding: 0 0 0 0.11rem;
                line-height: 0.53rem;
                font-size: 0.37rem;
                height: 2.13rem;
                width: 8.53rem;
                resize: none;
                outline: none;
            }
        }
    }
}
.nickname-info {
    border: 0 solid black;
    position: relative;
    box-sizing: border-box;
    display: flex;
    -webkit-box-orient: vertical;
    flex-direction: column;
    align-content: flex-start;
    flex-shrink: 0;
    background-color: rgb(255, 255, 255);
    .nickname-info-box {
        border-width: 0.01rem 0 0;
        border-style: solid;
        border-color: rgb(231, 231, 231) black black;
        border-image: initial;
        position: relative;
        box-sizing: border-box;
        display: flex;
        -webkit-box-orient: horizontal;
        flex-direction: row;
        align-content: flex-start;
        flex-shrink: 0;
        padding: 0.35rem 0.32rem 0.35rem 0;
        margin-left: 0.32rem;
        -webkit-box-align: center;
        align-items: center;
        .nickname-info-ck {
            border: 0 solid black;
            position: relative;
            box-sizing: border-box;
            display: flex;
            -webkit-box-orient: horizontal;
            flex-direction: row;
            place-content: flex-start center;
            flex-shrink: 0;
            cursor: pointer;
            font-size: 0.32rem;
            text-align: center;
            -webkit-box-align: center;
            align-items: center;
            -webkit-box-pack: center;
            width: 2.4rem;
            img {
                display: inline-block;
                width: 0.53rem;
                height: 0.53rem;
                margin-left: auto;
                margin-right: auto;
            }
            span {
                border: 0 solid black;
                position: relative;
                box-sizing: border-box;
                display: block;
                -webkit-box-orient: vertical;
                flex-direction: column;
                align-content: flex-start;
                flex: 1 1 0;
                font-size: 0.37rem;
                color: rgb(0, 0, 0);
                text-align: left;
                margin-left: 0.27rem;
                -webkit-box-flex: 1;
            }
        }
        .nickname-info-text {
            border: 0 solid black;
            position: relative;
            box-sizing: border-box;
            display: flex;
            -webkit-box-orient: vertical;
            flex-direction: column;
            align-content: flex-start;
            flex: 1 1 0;
            -webkit-box-flex: 1;
            span {
                border: 0 solid black;
                position: relative;
                box-sizing: border-box;
                display: block;
                -webkit-box-orient: vertical;
                flex-direction: column;
                align-content: flex-start;
                flex-shrink: 0;
                font-size: 0.37rem;
                text-align: right;
                color: rgb(170, 171, 179);
            }
        }
    }
}
.desc-info {
    border: 0 solid black;
    position: relative;
    box-sizing: border-box;
    display: flex;
    -webkit-box-orient: vertical;
    flex-direction: column;
    align-content: flex-start;
    flex-shrink: 0;
    background-color: rgb(255, 255, 255);
    .desc-info-box {
        border-width: 0.01rem 0 0;
        border-style: solid;
        border-color: rgb(231, 231, 231) black black;
        border-image: initial;
        position: relative;
        box-sizing: border-box;
        display: flex;
        -webkit-box-orient: vertical;
        flex-direction: column;
        align-content: flex-start;
        flex-shrink: 0;
        padding: 0 0.32rem 0 0;
        margin-left: 0.32rem;
        .desc-info-box-list {
            border: 0 solid black;
            position: relative;
            box-sizing: border-box;
            display: flex;
            -webkit-box-orient: horizontal;
            flex-direction: row;
            align-content: flex-start;
            flex-shrink: 0;
            height: 1.12rem;
            -webkit-box-align: center;
            align-items: center;
            .l-a {
                border: 0 solid black;
                position: relative;
                box-sizing: border-box;
                display: flex;
                -webkit-box-orient: vertical;
                flex-direction: column;
                align-content: flex-start;
                flex-shrink: 0;
                margin-right: 0.48rem;
                span {
                    border: 0 solid black;
                    position: relative;
                    box-sizing: border-box;
                    display: block;
                    -webkit-box-orient: vertical;
                    flex-direction: column;
                    align-content: flex-start;
                    flex-shrink: 0;
                    font-size: 0.37rem;
                    color: rgb(102, 102, 102);
                }
            }
            .l-b {
                border: 0 solid black;
                position: relative;
                box-sizing: border-box;
                display: flex;
                -webkit-box-orient: horizontal;
                flex-direction: row;
                align-content: flex-start;
                flex-shrink: 0;
                .l-b-img {
                    border: 0 solid black;
                    position: relative;
                    box-sizing: border-box;
                    display: flex;
                    -webkit-box-orient: vertical;
                    flex-direction: column;
                    place-content: flex-start center;
                    flex: 1 1 0;
                    cursor: pointer;
                    -webkit-box-align: center;
                    align-items: center;
                    padding-right: 0.48rem;
                    -webkit-box-flex: 1;
                    -webkit-box-pack: center;
                    img {
                        display: inline-block;
                        width: 0.53rem;
                        height: 0.53rem;
                        margin-left: auto;
                        margin-right: auto;
                    }
                }
            }
            .l-c {
                border: 0 solid black;
                position: relative;
                box-sizing: border-box;
                display: flex;
                -webkit-box-orient: vertical;
                flex-direction: column;
                align-content: flex-start;
                flex-shrink: 0;
                span {
                    border: 0 solid black;
                    position: relative;
                    box-sizing: border-box;
                    display: block;
                    -webkit-box-orient: vertical;
                    flex-direction: column;
                    align-content: flex-start;
                    flex-shrink: 0;
                    font-size: 0.37rem;
                    color: rgb(170, 171, 179);
                }
            }
        }
    }
}
.reat-store-info {
    border: 0 solid black;
    position: relative;
    box-sizing: border-box;
    display: flex;
    -webkit-box-orient: vertical;
    flex-direction: column;
    align-content: flex-start;
    flex-shrink: 0;
    padding: 0 0.32rem 0.35rem;
    background-color: rgb(255, 255, 255);
    .store-info {
        border: 0 solid black;
        position: relative;
        box-sizing: border-box;
        display: flex;
        -webkit-box-orient: horizontal;
        flex-direction: row;
        align-content: flex-start;
        flex-shrink: 0;
        -webkit-box-align: center;
        align-items: center;
        height: 1.12rem;
        img {
            display: inline-block;
            width: 0.53rem;
            height: 0.53rem;
            margin-left: auto;
            margin-right: auto;
        }
        span {
            border: 0 solid black;
            position: relative;
            box-sizing: border-box;
            display: block;
            -webkit-box-orient: vertical;
            flex-direction: column;
            align-content: flex-start;
            flex: 1 1 0;
            font-size: 0.37rem;
            margin-left: 0.27rem;
            -webkit-box-flex: 1;
        }
    }
}
.reat-push {
    border: 0 solid black;
    position: fixed;
    box-sizing: border-box;
    display: flex;
    -webkit-box-orient: vertical;
    flex-direction: column;
    place-content: flex-start center;
    flex-shrink: 0;
    cursor: pointer;
    height: 1.28rem;
    font-size: 0.37rem;
    -webkit-box-align: center;
    align-items: center;
    text-align: center;
    -webkit-box-pack: center;
    background-color: rgb(255, 83, 2);
    margin-top: 0.27rem;
    bottom: 0;
    right: 0;
    left: 0;
    span {
        border: 0 solid black;
        position: relative;
        box-sizing: border-box;
        display: block;
        -webkit-box-orient: vertical;
        flex-direction: column;
        align-content: flex-start;
        flex-shrink: 0;
        font-size: 0.37rem;
        line-height: 1.28rem;
        color: rgb(255, 255, 255);
    }
}
</style>
