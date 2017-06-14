<template lang="html">
<div class="page">
  <div class="page-content">
    <div>

    </div>
    <div class="pd-10">
      <md-button class="button button-assertive button-block" @click.native="add_address()">添加地址</md-button>
    </div>
  </div>
</div>
</template>

<script>
import address_modal from "./address_modal.vue"
import lyf_modal from "../../layout/modal"
export default {
  data() {
    return {
      modal: undefined
    }
  },
  mounted() {
    lyf_modal.modal.fromComponent(address_modal, {
      title: '123',
      theme: 'modal'
    }).then((modal) => {
      this.modal = modal
    })
  },
  destroyed() {
    if (this.modal)
      lyf_modal.modal.destroy(this.modal)
  },
  methods: {
    add_address() {
      this.modal.show()
    }
  }
}
</script>

<style lang="css">
</style>
