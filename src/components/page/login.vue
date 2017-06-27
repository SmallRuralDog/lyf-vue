<style lang="css">

.fx{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}

</style>

<template lang="html">

<div class="page has-navbar">
    <von-header class="fx">
        <button class="button button-icon ion-ios-arrow-back" slot="left" @click="$router.go(-1)"></button>
        <span slot="title">登录</span>
    </von-header>
    <div class="page-content" style="background:#ffffff;">
        <div class="wap-login">
            <ul id="login_switch" class="login-txt">
                <li class="active">老友粉账号登录</li>
                <li class="">手机快捷登录</li>
            </ul>
            <form id="normal-logo" action="/user/login" method="post" enctype="application/x-www-form-urlencoded">
                <input name="return_url" type="hidden" value="//m.juanpi.com/order">
                <div class="login-info">
                    <ul class="info-input">
                        <li>
                            <input type="text" name="username" id="username" placeholder="手机号/邮箱/用户名" value="" class="normalInput">
                        </li>
                        <li>
                            <input type="password" name="password" id="password" placeholder="密码" class="normalInput">
                        </li>
                    </ul>
                    <a id="btn_login" class="sub disable-btn" rel="nofollow">登  录</a>
                    <div id="login_l" class="other-action">
                        <label class="freeLogin on" style="line-height:.99rem;">
                            <input type="checkbox" class="ck" name="auto" checked="checked">
                            <i class="before"><img :src="lable_on"></i>两周内免登录
                        </label>
                    </div>
                </div>
            </form>
            <form id="quick-login" action="/muser/password" method="post" enctype="application/x-www-form-urlencoded" v-if="false">
                <div class="login-info">
                    <ul class="info-input clear">
                        <li>
                            <input type="tel" pattern="[0-9]*" placeholder="请输入手机号码" id="mobile" name="mobile" class="normalInput">
                        </li>
                        <li>
                            <div class="quickLoginHmtl clear">
                                <input type="tel" class="code-txt normalInput fl" id="code" placeholder="请输入验证码" name="code">
                                <a class="btn_get get-code disable-code" id="code_btn" href="javascript:;">获取验证码</a>
                            </div>
                        </li>
                    </ul>
                    <input type="hidden" name="mtoken" value="2dee9a13913334435eb81a6efd3e61ac" id="mtoken">
                    <input type="hidden" name="mtokenact" value="quick" id="mtokenact">
                    <a id="btn_quick_login" class="sub codeBtn disable-btn" rel="nofollow">登  录</a>
                    <a style="display:none;" id="normal_login" class="sub disable-btn" rel="nofollow">登  录</a>
                    <div id="quick_l" class="other-action">
                        <label class="freeLogin on" style="line-height:.99rem;">
                            <input type="checkbox" class="ck" name="auto_quick" checked="checked"><i class="before"><img :src="lable_on"></i>两周内免登录</label>
                    </div>
                </div>
            </form>
            <div class="wap-app">
                <h3 class="third-txt">第三方账号快速登录</h3>
                <div class="third-app clear">
                    <a class="qq">
                        <img src="//jp.juancdn.com/jpwebapp_v1/images_v1/user/tencent.png?29cf7667-1&amp;sv=bdd23e22">
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>

import "../../assets/user-login.scss"
export default {
    name: "login",
    data() {
        return {
          lable_on:require("../../assets/images/label_on.png")
        }
    },
    mounted(){

    }
}

</script>
