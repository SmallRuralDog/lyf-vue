<template lang="html">
<div class="page">
  <div class="page-content">
    <div class="padding">
      <button @click="go_back()" class="button button-assertive button-block">点击回到登录前页面</button>
    </div>

  </div>
</div>
</template>

<script>
export default {
  name:"auth",
  data(){
    return{
      token:"",
      back:""
    }
  },
  mounted(){
    this.token = this.$route.params.token


    this.back= this.$api.get("login_back")
    this.back = this.back.split("#")
    this.back = this.back[1]
    if(this.token==0){
      $toast.show("登录失败")
    }else{
      this.$api.l_set("token",this.token)
      $router.back(this.back)
    }
    console.log(this.back);
  },
  methods:{
    go_back(){
      $router.replace(this.back)
    }
  }
}
</script>

<style lang="css">
</style>
