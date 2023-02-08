<!--
 * @description
!-->
<template>
  <SwipeCell class="swipe-cell" v-bind="myAttrs">
    <template #left>
      <slot name="left"></slot>
    </template>
    <slot></slot>
    <template #right>
      <slot name="right"></slot>
    </template>
  </SwipeCell>
</template>
<script setup lang="ts">
import { SwipeCell } from "vant";
import { computed, useAttrs } from "vue";

const myAttrs = computed(() => {
  return Object.assign({}, useAttrs());
});
</script>
<style scoped lang="scss"></style>
