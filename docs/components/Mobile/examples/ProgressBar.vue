<!--
 * @description
!-->
<template>
  <div>
    <Container title="基础用法">
      <Button width-type="all" @click="startProgressBar">开启进度条</Button>
      <Button width-type="all" @click="stopProgressBar">关闭进度条</Button>
    </Container>
  </div>
</template>
<script setup lang="ts">
  import { progressBarInit, startProgressBar, stopProgressBar } from '@/frontend-common/utils/progressBar'
  import { Button } from '@/frontend-common/vue3/components/Common'
  import Container from '../Container.vue'

  progressBarInit()
</script>
<style lang="scss">
  #nprogress {
    .bar {
      background-color: #0078f5;
    }
  }
</style>
<style scoped lang="scss"></style>
