<!--
 * @description
!-->
<template>
  <div>
    <Container title="基础用法" :need-gap="false">
      <Cell title="描述" value="固定内容"></Cell>
    </Container>
    <Container title="值类型" :need-gap="false">
      <Cell title="描述" value="键入内容" value-type="bold"></Cell>
      <Cell title="描述" value="占位内容" value-type="light"></Cell>
    </Container>
    <Container title="图标" :need-gap="false">
      <Cell title="描述" value="键入内容" value-type="bold" value-icon="link"></Cell>
      <Cell title="描述" value="占位内容" value-type="light" title-icon="weChat" :is-link="true"></Cell>
      <Cell title="描述" title-icon="weChatPay" value-icon="complete"></Cell>
    </Container>
  </div>
</template>
<script setup lang="ts">
  import { Cell } from '@/frontend-common/vue3/components/Common'
  import Container from '../Container.vue'
</script>
<style scoped lang="scss"></style>
