<!--
 * @description
!-->
<template>
  <div>
    <Container title="基础使用">
      <Button @click="toast1" width-type="all">基础</Button>
      <Button @click="toast2" width-type="all">字数限制</Button>
      <Button @click="toast3" width-type="all">设置对齐方式-左对齐</Button>
      <Button @click="toast4" width-type="all">设置对齐方式-右对齐</Button>
    </Container>
  </div>
</template>
<script setup lang="ts">
  import Container from '../Container.vue'
  import { Button } from '@/frontend-common/vue3/components/Common'
  import { ToastFn } from '@/frontend-common/vue3/components/CustomVant'

  function toast1() {
    ToastFn('燃烧的法庭')
  }
  function toast2() {
    ToastFn({
        message:
        '《燃烧的法庭》是著名推理小说作家约翰·狄克森·卡尔非系列经典杰作之一，与H.M.爵士探案系列的《犹大之窗》、菲尔博士探案系列的《三口棺材》并称为卡尔三大神作。',
    })
  }
  function toast3(){
    ToastFn({
        message:
        '《燃烧的法庭》是著名推理小说作家约翰·狄克森·卡尔非系列经典杰作之一，与H.M.爵士探案系列的《犹大之窗》、菲尔博士探案系列的《三口棺材》并称为卡尔三大神作。',
        align: "left"
    })
  }
  function toast4(){
    ToastFn({
        message:
        '《燃烧的法庭》是著名推理小说作家约翰·狄克森·卡尔非系列经典杰作之一，与H.M.爵士探案系列的《犹大之窗》、菲尔博士探案系列的《三口棺材》并称为卡尔三大神作。',
        align: "right"
    })
  }
</script>
<style scoped lang="scss"></style>
