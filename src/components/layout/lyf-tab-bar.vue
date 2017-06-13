<template lang="html">
<div class="">
    <ul class="footer">
      <li @click="setTab('/home')" class="fb-move-bottom" ><a class="nav-controller" :class="{'active':index==0}"><i class="fb fb-home"></i>首页</a></li>
      <li @click="setTab('/new_arrivals')"><a class="nav-controller" :class="{'active':index==1}"><i class="fb fb-rank"></i>新品</a></li>
      <li @click="setTab('/class_all')"><a class="nav-controller" :class="{'active':index==2}"><i class="fb fb-class"></i>搜索</a></li>
      <li @click="setTab('/cart')"><a class="nav-controller" :class="{'active':index==3}"><i class="fb fb-chat"></i>购物车</a></li>
      <li @click="setTab('/user')"><a class="nav-controller" :class="{'active':index==4}"><i class="fb fb-user"></i>个人中心</a></li>
  </ul>
</div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  props:['index'],
  methods: {
    setTab(name){
      $router.forward({path: name});
    }
  }
}
</script>

<style lang="scss">
.footer {
	width: 100%;
	height: 1.31rem;
	position: fixed;
	bottom: 0;
	left: 50%;
	transform: translate3d(-50%,0,0);
	-webkit-transform: translate3d(-50%,0,0);
	background-color: #fff;
	z-index: 10000!important
}

.footer:before {
	position: absolute;
	content: "";
	width: 100%;
	left: 0;
	top: 0;
	height: 1px;
	background-color: #e0e0e0;
	-webkit-transform: scale(1,.5);
	transform: scale(1,.5);
	-webkit-transform-origin: center bottom;
	transform-origin: center bottom
}

.footer .chat-popup,.footer .unread-sign {
	background-color: #E02E24;
	color: #fff;
	position: absolute
}

.footer .fb-move-bottom a {
	padding-top: 1px
}

.footer .fb-move-bottom i {
	margin-bottom: 2px!important
}

.footer li {
	float: left;
	width: 20%;
	text-align: center;
	margin: auto;
	height: 100%
}

.footer a,.footer a:focus,.footer a:hover {
	color: #777;
	font-size: .27rem
}

.footer a.active {
	color: #df2127
}

.footer .nav-controller {
	position: relative;
	height: 100%;
	display: block
}

.footer .nav-controller i {
	display: block;
	font-size: .4rem;
	margin-bottom: .08rem
}

.footer .chat-popup {
	width: 2.88rem;
	height: .8rem;
	border-radius: .05rem;
	-webkit-transform: translate(-50%,0);
	transform: translate(-50%,0);
	left: 50%;
	bottom: 1.6rem;
	display: none;
	text-align: center;
	font-size: 13px;
	line-height: .43rem;
	padding-top: .21rem;
	box-shadow: 0 0 .2rem 0 rgba(38,12,10,.12)
}

.footer .chat-popup:before {
	content: '';
	position: absolute;
	height: 0;
	width: 0;
	border-width: .08rem .08rem 0;
	border-style: solid;
	border-color: #E02E24 transparent transparent;
	top: 100%;
	-webkit-transform: translate(-50%,0);
	transform: translate(-50%,0);
	left: 50%
}

.footer .chat-popup-show {
	display: block
}

.footer .unread-sign {
	width: .53rem;
	height: .53rem;
	border-style: solid;
	border-radius: .27rem;
	border-color: #fff;
	border-width: 1px;
	margin-top: -.11rem;
	margin-left: 16px;
	font-size: 11px;
	display: none;
	font-family: Arial;
	padding-top: .05rem
}

.footer .unread-len-2 {
	width: .67rem
}

.footer .unread-sign-show {
	display: block
}

.active .fb-chat,.active .fb-class,.active .fb-home,.active .fb-oversea,.active .fb-rank,.active .fb-user,.fb-chat,.fb-class,.fb-home,.fb-oversea,.fb-rank,.fb-user {
	background: url('../../assets/images/tabbar.png') no-repeat;
	background-size: auto 23px;
	content: "";
	height: 23px;
	margin: 6px auto auto;
	width: 23px
}

.fb-badge-fix:after,.fb-badge:after {
	left: 19px;
	top: 0;
	width: 8px;
	height: 8px;
	border-radius: 4px;
	content: ""
}

.fb-home {
	background-position: 0 0
}

.active .fb-home {
	background-position: -23px 0
}

.fb-rank {
	background-position: -46px 0
}

.active .fb-rank {
	background-position: -69px 0
}

.fb-oversea {
	background-position: -230px 0
}

.active .fb-oversea {
	background-position: -253px 0
}

.fb-class {
	background-position: -138px 0
}

.active .fb-class {
	background-position: -161px 0
}

.fb-chat {
	background-position: -92px 0
}

.active .fb-chat {
	background-position: -115px 0
}

.fb-user {
	background-position: -184px 0
}

.active .fb-user {
	background-position: -207px 0
}

.fb {
	position: relative
}

.fb-badge:after {
	position: absolute;
	background-color: red
}

.fb-badge-fix:after {
	position: absolute;
	background-color: #e02e24
}

.active .fb-badge:after {
	content: "";
	display: none
}

.no-footer {
	padding-bottom: 0!important
}

#footer-black-friday {
	position: absolute;
	bottom: 0;
	left: 50%;
	-webkit-transform: translate3d(-50%,0,0);
	transform: translate3d(-50%,0,0);
	height: 48px;
	width: 63px;
	z-index: 10001
}

#footer-black-friday img {
	width: 100%;
	height: auto
}
</style>
