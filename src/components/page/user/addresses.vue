<style lang="css">

.bar {
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

.m-addr-main .m-addr-mobile,
.m-addr-main .m-addr-name {
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

.m-addr-main .m-addr-mobile,
.m-addr-main .m-addr-name {
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

.m-addr-city,
.m-addr-province {
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

.m-addr-city,
.m-addr-province {
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

<template lang="html">

<div class="page">
    <div class="page-content">
        <div>
            <ul class="addresses-list">
                <li class="address-item-use" v-for="(address,key,index) in address_list" @click="change_address(key)">
                    <div class="address-item-wrap">
                        <div class="address-item-main">
                            <div class="contact-name">
                                {{address.true_name}}，{{address.mob_phone}}
                            </div>
                            <div class="contact-address">
                              {{address.area_info}} {{address.address}}
                            </div>
                        </div>

                    </div>
                    <div class="address-item-ops-1">
                        <span @click="set_address_default(address.address_id)"><i class="ion-checkmark-circled text-14" :class="{'color-assertive':address.is_default== 1}"></i> 默认地址</span>
                    </div>
                    <div class="address-item-ops-2">
                        <div class="address-item-edit" @click="edit_address(address.address_id)">
                            <span><i class="ion-compose"></i> 编辑</span>
                        </div>
                        <div class="address-item-delete" @click="del_address(address.address_id)">
                            <span><i class="ion-trash-a"></i> 删除</span>
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
        <mt-popup v-model="popupVisible"  popup-transition="popup-fade" modal="false" closeOnClickModal="false" class="mint-popup-100">
            <div class="" style="width:100%;">
                <div class="m-addr-main">
                    <div class="m-addr-title">{{title}}收货地址</div>
                    <div class="m-address-receiver">
                        <input class="m-addr-name" id="name" v-model="name" placeholder="名字" type="text">
                        <input class="m-addr-mobile" id="mobile" v-model="mobile" placeholder="电话" type="tel">
                    </div>

                    <div class="m-addr-region">
                        <div class="m-addr-province">
                            <select class="m-addr-select" v-model="province">
                                <option value="0">选择省份</option>
                                <option :value="province.area_id" v-for="province in province_list">{{province.area_name}}</option>
                            </select>
                        </div>
                        <div class="m-addr-city">
                            <select class="m-addr-select" v-model="city">
                                <option value="0">选择城市</option>
                                <option :value="city.area_id" v-for="city in city_list">{{city.area_name}}</option>
                            </select>
                        </div>
                        <div class="m-addr-district">
                            <select class="m-addr-select" v-model="district">
                                <option value="0">选择地区</option>
                                <option :value="district.area_id" v-for="district in district_list">{{district.area_name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="m-addr-address">
                        <input id="address" v-model="address" placeholder="请填写详细街道地址" type="text">
                    </div>
                    <div class="pd-10">
                      <button class="button button-assertive button-block" :disabled="ck_save" @click="save_addrsss()">保存</button>
                    </div>

                </div>
            </div>
        </mt-popup>
    </div>
</div>

</template>

<script>
 import address_from from './address-from.vue'
import bus from '../../../bus.js'

export default {
  name: "address_list",
  data() {
    return {
      f_modal: undefined,
      title: "添加",
      popupVisible: false,
      address_list: [],
      province_list: [],
      city_list: [],
      district_list: [],
      province: 0,
      city: 0,
      district: 0,
      e_province: 0,
      e_city: 0,
      e_district: 0,
      name: "",
      mobile: "",
      address: "",
      address_id: 0,

    }
  },
  watch: {
    province: function(val, oldVal) {
      if (val > 0 && val !== oldVal) {
        if (oldVal != '') {
          this.city = 0
          this.e_city = 0
        }

        this.getArea(val, 2)
      }
    },
    city: function(val, oldVal) {
      if (val > 0 && val !== oldVal) {
        if (oldVal != '') {
          this.district = 0
          this.e_district = 0
        }
        this.getArea(val, 3)
      }
    },
  },
  computed: {
    ck_save: {
      get() {
        if (this.province <= 0 || this.city <= 0 || this.district <= 0 || this.name == '' || this.mobile == '' || this.address == '') {
          return true
        } else {
          return false
        }
      },
      set() {

      }
    }
  },
  mounted() {
    $loading.show()
    this.getData()
    $modal.fromComponent(address_from, {
        title: this.title+'地址',
        theme: 'default'
      }).then((modal) => {
        this.f_modal = modal
      })
  },
  methods: {
    getData() {
      this.$api.userAuthGet("user_address", res => {
        this.address_list = res.data.data
        $loading.hide()
      }, error => {
        $loading.hide()
      })
    },
    getArea(parent_id = 0, level = 1) {
      this.$api.userGet("get_area?parent_id=" + parent_id, res => {
        switch (level) {
          case 1:
            this.province_list = res.data.data
            break;
          case 2:
            this.city_list = res.data.data
            break;
          case 3:
            this.district_list = res.data.data
            break;
        }
        /*this.$nextTick(() => {
          if (level == 1) {
            this.province = this.e_province
          }
          if (level == 2) {
            this.city = this.e_city
          }
          if (level == 3) {
            this.district = this.e_district
          }

        })*/

      }, error => {

      })
    },
    add_address() {
      this.f_modal.show()
      /*this.title = "添加新"
      this.popupVisible = true
      this.address_id = 0
      this.name = ''
      this.mobile = ''
      this.address = ''
      this.e_province = 0
      this.e_city = 0
      this.e_district = 0
      this.province = 0
      this.city = 0
      this.district = 0
      this.getArea()*/
    },
    edit_address(address_id) {
      this.address_list.filter(a => {
        return a.address_id == address_id
      }).map(item => {
        this.address_id = address_id
        this.name = item.true_name
        this.mobile = item.tel_phone
        this.address = item.address
        this.e_province = item.province_id
        this.e_city = item.city_id
        this.e_district = item.area_id
      })
      this.getArea()
      this.title = "编辑"
      this.popupVisible = true
    },
    save_addrsss() {
      $loading.show()
      this.$api.userAuthPost("user_save_address", {
        address_id: this.address_id,
        province: this.province,
        city: this.city,
        district: this.district,
        name: this.name,
        mobile: this.mobile,
        address: this.address
      }, res => {
        this.popupVisible = false
        $toast.show(res.data.message)
        this.getData()
      }, error => {
        this.popupVisible = false
        $toast.show(res.data.message)
      })
    },
    del_address(address_id) {
      $dialog.confirm({
        theme: 'ios',
        title: '确认要删除这个宝贝吗?',
        cancelText: '取消',
        okText: '确认'
      }).then((res) => {
        if (res) {
          $loading.show()
          this.$api.userAuthGet("user_del_address?address_id=" + address_id, res => {
            $toast.show(res.data.message)
            if (res.data.status_code == 1) {
              this.getData()
            }
          }, error => {
            $toast.show("删除成功")
          })
        }
      })
    },
    set_address_default(address_id){
      $loading.show()
      this.$api.userAuthGet("user_set_address_default?address_id=" + address_id, res => {
        $toast.show(res.data.message)
        if (res.data.status_code == 1) {
          this.getData()
        }
      }, error => {
        $toast.show("删除成功")
      })
    },
    change_address(key){
      let address = this.address_list[key]
      bus.$emit("onChangeAddress",address)
    }
  }
}
</script>
