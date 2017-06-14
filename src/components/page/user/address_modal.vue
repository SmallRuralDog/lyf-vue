<template lang="html">
<div class="">
  1231231231231
</div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.modal-backdrop-bg {
    -webkit-transition: opacity .3s ease-in-out;
    transition: opacity .3s ease-in-out;
    background-color: #000;
    opacity: 0;
}
.active .modal-backdrop-bg {
    opacity: .5;
}
.modal{
  bottom: 0;
  top: auto;
  max-height: 8rem;
  min-height: 0;
}
</style>
