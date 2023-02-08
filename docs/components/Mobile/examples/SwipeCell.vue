<!--
 * @description
!-->
<template>
  <div>
    <Container title="基础用法" :need-gap="false">
      <SwipeCell>
        <template #left>
          <Button :slide="true">选择</Button>
        </template>
        <Cell title="向右滑" value="向左滑"></Cell>
        <template #right>
          <Button type="red" :slide="true">删除</Button>
          <Button :slide="true">收藏</Button>
        </template>
      </SwipeCell>
    </Container>
  </div>
</template>
<script setup lang="ts">
  import Container from '../Container.vue'
  import { Cell, Button } from '@/frontend-common/vue3/components/Common'
  import { SwipeCell } from '@/frontend-common/vue3/components/CustomVant'
</script>
<style scoped lang="scss"></style>
