<template lang="html">
<div class="page has-navbar">
  <von-header theme="">
  <button class="button button-icon ion-ios-arrow-back" slot="left" @click='this.$router.go(-1)'></button>
  <span slot="title">地址管理</span>
</von-header>
  <div class="page-content">
    <div>
      <ul class="addresses-list">
            <!--repeat096156211313--><li class="address-item-use">
                <div class="address-item-wrap">
                    <div class="address-item-main">
                        <div class="contact-name">
                            小马哥，18688888888
                        </div>
                        <div class="contact-address">
                            <!--ms-if-->广西&nbsp;南宁&nbsp;上林县&nbsp;8888888哈哈哈哈
                        </div>
                    </div>
                    <!--ms-if-->
                </div>
                <div class="address-item-ops-1">
                    <span class="address-item-set-default default">已设为默认</span>
                </div>
                <div class="address-item-ops-2">
                    <div class="address-item-edit">
                        <span><i class="ion-compass"></i> 编辑</span>
                    </div>
                    <div class="address-item-delete">
                        <span><i class="ion-compass"></i> 删除</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <div class="pd-10">
      <button class="button button-assertive button-block" @click="add_address()">添加地址</button>
    </div>
  </div>
  <div style="width:100%;">
    <mt-popup v-model="popupVisible"  popup-transition="popup-fade" class="mint-popup-100">
      <div class="" style="width:100%;">
        <div class="m-addr-main">
        <div class="m-addr-title">添加新收货地址</div>
        <div class="m-address-receiver">
            <input class="m-addr-name" id="name" placeholder="名字" type="text">
            <input class="m-addr-mobile" id="mobile" placeholder="电话" type="tel">
        </div>
        <div class="m-addr-region">
            <div class="m-addr-province">
                <select class="m-addr-select" data-duplex-changed="onProvinceEdited">
                    <option value="0">选择省份</option>
                </select>
            </div>
            <div class="m-addr-city">
                <select class="m-addr-select" data-duplex-changed="onCityEdited">
                    <option value="0">选择城市</option>
                </select>
            </div>
            <div class="m-addr-district">
                <select class="m-addr-select" data-duplex-changed="onDistrictEdited">
                    <option value="0">选择地区</option>
                </select>
            </div>
        </div>
        <div class="m-addr-address">
            <input id="address" placeholder="请填写详细街道地址" type="text">
        </div>
        <div class="m-addr-save">保存</div>
        <div class="m-addr-close">
            <div class="ms-addr-close-icon"></div>
        </div>
        <!--ms-if-->
    </div>
      </div>
    </mt-popup>
  </div>
</div>
</template>

<script>
require('mint-popup/lib/index.css');
import Popup from 'mint-popup';
export default {
  components: {
    'MtPopup': Popup
  },
  data() {
    return {
      popupVisible: false
    }
  },
  mounted() {

  },
  destroyed() {

  },
  methods: {
    add_address() {
      this.popupVisible = true
    }
  }
}
</script>

<style lang="css">
.bar{
  position: fixed;
}
.addresses-list li {
    position: relative;
    background-color: #fff;
    margin-bottom: 10px;
}
.address-item-wrap {
    padding: 16px 15px 0;
    min-height: 55px;
    height: auto;
    color: #151516;
    font-size: 14px;
    border-bottom: 1px solid #ededed;
}
.address-item-wrap .address-item-main {
    position: relative;
    display: inline-block;
    width: 100%;
    margin-bottom: 14px;
}
.address-item-wrap .address-item-main .contact-name {
    margin-bottom: 4px;
}
.address-item-ops-1 {
    position: relative;
    display: inline-block;
    width: 32%;
    height: 40px;
    padding-left: 15px;
    text-align: left;
    line-height: 41px;
}
.address-item-ops-1 .default {
    color: #e02e24;
}
.address-item-ops-1 .address-item-set-default {
    position: relative;
    display: inline-block;
    height: 13px;
    line-height: 1;
    color: #9c9c9c;
    font-size: 13px;
    margin-left: 20px;
    text-align: center;
}
.address-item-ops-1 .default:before {
    content: "";
    color: #e02e24;
    line-height: 1;
    font-weight: 400;
    border: none;
}
.address-item-ops-1 .address-item-set-default:before {
    content: '';
    position: absolute;
    left: -20px;
    font-size: 14px;
    z-index: 2;
    color: #9c9c9c;
    line-height: 14px;
    width: 14px;
    height: 14px;
    border-radius: 100%;
    border: 1px solid #9c9c9c;
}
.address-item-ops-2 {
    position: relative;
    display: inline-block;
    height: 40px;
    padding-right: 15px;
    float: right;
    text-align: right;
    line-height: 41px;
    color: #9c9c9c;
    font-size: 13px;
}
.address-item-ops-2 .address-item-edit {
    position: relative;
    display: inline-block;
    width: 1.12rem;
    height: 100%;

}
.address-item-ops-2 .address-item-edit span {
    position: relative;
    display: inline-block;
    height: 13px;
    line-height: 1;

}

.address-item-ops-2 .address-item-delete {
    position: relative;
    display: inline-block;
    width: 1.12rem;
    height: 100%;
    margin-left: .4rem;
}
.address-item-ops-2 .address-item-delete span {
    position: relative;
    display: inline-block;
    height: 13px;
    line-height: 1;

}

.mint-popup-100 {
    width: 85%;
    border-radius: .13rem;
}
.m-addr-main {
    width: 100%;
    background-color: #fff;
    text-align: center;
    color: #151516;
    font-size: 0;
    border-radius: .13rem;
}
.m-addr-main .m-addr-title {
    position: relative;
    height: 1.36rem;
    line-height: 1.33rem;
    font-size: .45rem;
    border-bottom: 0.025rem solid #ededed;
}
.m-addr-main .m-address-receiver {
    position: relative;
    width: 100%;
    text-align: left;
}
.m-addr-main .m-addr-name {
    width: 50%;
    border-right: 0.025rem solid #ededed;
    border-radius: 0;
}
.m-addr-main .m-addr-mobile, .m-addr-main .m-addr-name {
    padding: .27rem 0 .27rem .45rem;
    font-size: .4rem;
    line-height: normal;
    height: 1.2rem;
    text-align: left;
    display: inline-block;
    position: relative;
}
.m-addr-main .m-addr-mobile {
    width: 48%;
}

.m-addr-main .m-addr-mobile, .m-addr-main .m-addr-name {
    padding: .27rem 0 .27rem .45rem;
    font-size: .4rem;
    line-height: normal;
    height: 1.2rem;
    text-align: left;
    display: inline-block;
    position: relative;
}
.m-addr-main .m-addr-region {
    position: relative;
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
    font-size: 0;
    text-align: left;
    border-top: 0.025rem solid #ededed;
    border-bottom: 0.025rem solid #ededed;
}
.m-addr-city, .m-addr-province {
    width: 33%;
    position: relative;
    display: inline-block;
    height: 100%;
    font-size: .4rem;
    overflow: hidden;
}
.m-addr-province .m-addr-select {
    padding-left: .45rem;
}
.m-addr-select {
    position: relative;
    height: 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    box-sizing: border-box;
    background-color: #fff;
}
.m-addr-city, .m-addr-province {
    width: 33%;
    position: relative;
    display: inline-block;
    height: 100%;
    font-size: .4rem;
    overflow: hidden;
}
.m-addr-district {
    position: relative;
    display: inline-block;
    width: 32%;
    height: 100%;
    font-size: .4rem;
    overflow: hidden;
}
.m-addr-main .m-addr-address {
    position: relative;
    width: 100%;
    min-height: 1.2rem;
    padding: .27rem .45rem;
    font-size: .4rem;
    text-align: left;
    word-wrap: break-word;
    border-bottom: 0.025rem solid #ededed;
}
.m-addr-main .m-addr-save {
    position: relative;
    display: inline-block;
    width: 91%;
    height: 1.15rem;
    line-height: 1.15rem;
    margin: .4rem 0;
    font-size: .45rem;
    color: #fff;
    background-color: #e02e24;
    border-radius: .13rem;
}
</style>
