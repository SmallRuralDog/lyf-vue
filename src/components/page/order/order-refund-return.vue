<template lang="html">

<div class="page">
    <div class="page-content">

      <div class="refund-tip hm-margin-b"><i class="iconfont icon-xuanze"></i> 卖家已同意退货<br>请上传退货快递单号</div>



      <ul class="aui-list hm-margin-b"  style="margin-bottom:10px;">
        <li class="aui-list-item aui-list-item-middle"><!--@click='choose_company()'-->
          <div class="aui-list-item-inner ">
            <div><span class="color-theme">*</span>&nbsp;选择快递公司：

              <select v-model="express_id">
                <option disabled value="">请选择</option>
                <option v-for="(item,index) in options" :value="index+1">{{item}}</option>
              </select>

            </div>

          </div>
        </li>
      </ul>

      <ul class="aui-list aui-form-list" style="margin-bottom:10px;">
        <li class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              <span class="color-theme">*</span>&nbsp;快递单号：
            </div>
            <div class="aui-list-item-input">
              <input type="tel" placeholder="" v-model="invoice_no">
            </div>
          </div>
        </li>
      </ul>


      <div style="padding: 10px;">
        <div class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm" @click="return_ship_post">提交</div>
      </div>



    </div>
</div>

</template>

<script>
export default {

  data() {
    return {
      express_id:'',
      return_id:'',
      invoice_no:'',
      init:false,
      options:[],
    }
  },
  mounted() {

  },
  methods: {

    select(i){
      console.log('action ',i,' called.')
      this.express_company='效果不'
      this.express_id=95
    },


    getExpressData() {
      console.log('getExpressData() return_id=',this.return_id)
      this.$api.userAuthPost("return_ship",{
        return_id:this.return_id
      },res => {
        if(res.data.status_code==1){
//          console.log(res.data.data.express_list)
          for(var it in res.data.data.express_list){
            this.options.push(res.data.data.express_list[it])
          }
        }else{
          //状态异常
          $dialog.alert({
            theme: 'ios',
            title: res.data.message,
            okText: '确定',
          }).then(()=>{
            $router.go(-1)
          })
        }
      },err => {

      })
    },
    return_ship_post(){
      if(!this.express_id || !this.invoice_no){
        $toast.show("快递公司、快递单号不能为空",2000);
        return;
      }
      this.$api.userAuthPost("return_ship_post",{
        return_id:this.return_id,
        express_id:this.express_id,
        invoice_no:this.invoice_no

      },res => {
        if(res.data.status_code==1){
          $dialog.alert({
            // 效果
            effect: 'default',
            // 标题
            title: '提交成功',

            // 按钮文本
            okText: '确定',
            // 按钮主题
            okTheme: 'assertive'
          }).then(()=>{
            $router.go(-1)
          })

        }
        console.log(res)

      },err => {

      })
    }

  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      vm.return_id = vm.$route.params.return_id
      console.log('vm.return_id=',vm.return_id)

      vm.getExpressData()

    })
  }
}
</script>
<style lang="scss">
  @import "../../../assets/config.scss";
  .refund-tip{
    background-color: $color-theme;
    color: #fff;
    text-align: center;
    padding:10px;;
  }


</style>
