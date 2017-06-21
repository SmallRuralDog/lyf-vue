<style lang="scss">
.new-order-track {
    padding: 10px 20px;
    border: 1px solid #999;
    margin: 0 20px 20px 20px;
}
.new-order-track span {
    display: block;
    font-size: 14px;
    color: #6e6e6e;
}
.new-order-flow {
    padding: 5px 10px 30px;
    border-left: 1px solid #ccc;
}

.new-p-re {
    position: relative;
}

.new-order-arr {
    position: absolute;
    top: -4px;
    left: -5px;
    width: 9px;
    height: 9px;
}

.new-of-storey li {
    position: relative;
    padding: 15px 10px;
    border-bottom: 1px dotted #e8e5e5;
}

.new-of-storey li .icon.on {
    background-color: #e4393c;
}

.new-of-storey li .icon {
    position: absolute;
    top: 42%;
    left: -15px;
    width: 9px;
    height: 9px;
    border-radius: 5px;
    background-color: #ccc;
}

.new-of-storey li span {
    display: block;
    font-size: 14px;
    color: #6e6e6e;
}
</style>

<template lang="html">

<div class="page">
    <div class="page-content">
        <div v-if="page_show" style="background-color:#ffffff; padding-top:20px;">
          <div class="new-order-track">
                <span>物流单号：{{data.shipping_code}}</span>
                <span class="new-txt-rd2">物流公司：{{data.express_name}}</span>
            </div>
            <div class="" style="margin:0 20px; display: block;" v-if="data.deliver_info.length>0">
                <div class="new-order-flow new-p-re">
                    <span class="new-order-arr"></span>
                    <ul class="new-of-storey">
                        <li v-for="info in data.deliver_info">
                            <span class="icon on"></span>
                            <span>{{info.context}}</span>
                            <span>{{info.time}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="item" style="text-align:content;" v-else>
              暂无物流信息
            </div>
        </div>
    </div>
</div>

</template>

<script>
export default {
  name:"order_logistics",
  data() {
    return {
      page_show:false,
      data:{
        deliver_info:[]
      }
    }
  },
  mounted() {
    this.order_id = this.$route.params.order_id
    $loading.show()
    this.getData()
  },
  methods: {
    getData() {
      this.$api.userAuthGet("search_deliver?order_id=" + this.order_id, res => {
        console.log(res.data);
        if(res.data.status_code == 1){
          this.data = res.data.data
        }
        $loading.hide()
        this.page_show = true
      }, error => {
        $toast.show("查询失败")
        $router.go(-1)

      })
    }
  }
}
</script>
