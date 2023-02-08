<!--
 * @description
!-->
<template>
  <div class="slide-verify-container">
    <div class="header">
      <div class="title">请完成安全验证</div>
      <div class="close-icon" @click="close"></div>
    </div>
    <SlideVerify ref="slideVerify" @success="success" @fail="fail" @again="again" @refresh="refresh" @getFail="getFail" v-bind="attrs"></SlideVerify>
  </div>
</template>
<script setup lang="ts">
  import { ref,useAttrs } from 'vue'
  import SlideVerify from './SlideVerify.vue'
  import { SlideVerifyInstance } from './mobile'
  
  const emits = defineEmits(['success', 'fail', 'refresh', 'getFail', 'close'])

  const slideVerify = ref<SlideVerifyInstance | null>()
  const attrs = useAttrs()

  function success(data) {
    emits('success', data)
  }
  function again(data) {
    emits('fail', data)
  }
  function fail(data) {
    emits('fail', data)
  }
  function refresh(data) {
    emits('refresh', data)
  }
  function getFail(data) {
    emits('getFail', data)
  }
  function close() {
    emits('close')
  }
</script>
<style scoped lang="scss">
  .slide-verify-container {
    padding: 16px;
    .header {
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      .title {
        @include autoFontFamily(PingFangSC-Medium);
        @include autoFontWeight(500);
        font-size: 16px;
        color: #1a2129;
        text-align: center;
        line-height: 16px;
        font-weight: 500;
      }
      .close-icon {
        width: 24px;
        height: 24px;
        background-image: url('./assets/popup_close.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        margin-left: auto;
      }
    }
  }
</style>
