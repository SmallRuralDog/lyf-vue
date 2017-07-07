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
                      <i style="margin:5px;" class="text-14" :class="{'color-assertive':address.is_default== 1,' ion-ios-checkmark':address.is_default== 1,'ion-ios-circle-outline':address.is_default== 0}"></i><span @click="set_address_default(address.address_id)">默认地址</span>
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
      address_list: [],
    }
  },
  destroyed() {
    if (this.f_modal)
      $modal.destroy(this.f_modal)
  },
  mounted() {
    $loading.show()
    this.getData()
    $modal.fromComponent(address_from, {
      title: '地址管理',
      theme: 'default'
    }).then((modal) => {
      this.f_modal = modal
    })
    bus.$on("onEditAddress", res => {
      this.getData()
      this.f_modal.hide();
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
    add_address() {
      this.f_modal.show()
    },
    edit_address(address_id) {
      this.address_list.filter(a => {
        return a.address_id == address_id
      }).map(item => {
        this.f_modal.content.address_id = address_id
        this.f_modal.content.name = item.true_name
        this.f_modal.content.mobile = item.tel_phone
        this.f_modal.content.address = item.address
        this.f_modal.content.province = item.province_id
        this.f_modal.content.city = item.city_id
        this.f_modal.content.district = item.area_id
      })
      console.log(this.f_modal);
      this.f_modal.show()
    },
    del_address(address_id) {
      $dialog.confirm({
        theme: 'ios',
        title: '确认要删除吗?',
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
    set_address_default(address_id) {
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
    change_address(key) {
      let address = this.address_list[key]
      bus.$emit("onChangeAddress", address)
    }
  }
}
</script>
