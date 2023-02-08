<!--
 * @description 下拉加载
!-->
<template>
  <List class="list" v-model:loading="listValue" v-bind="attrs">
    <slot></slot>
    <template #loading>
      <slot name="loading">
        <div class="default-loading">加载中...</div>
      </slot>
    </template>
    <template #finished>
      <slot name="finished">
        <div class="default-finished">- 已经到底了 -</div>
      </slot>
    </template>
  </List>
</template>
<script setup lang="ts">
  import { List } from 'vant'
  import { computed, useAttrs } from 'vue'

  const props = defineProps<{
    modelValue: boolean
  }>()
  const emit = defineEmits(['update:modelValue'])

  const attrs = useAttrs()

  const listValue = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      emit('update:modelValue', val)
    },
  })
</script>
<style scoped lang="scss">
  .list {
    .default-loading {
      @include autoFontFamily('PingFangSC-Regular');
      @include autoFontWeight(400);
      font-size: 12px;
      color: #999999;
      line-height: 12px;
      text-align: center;
      padding: 24px 0;
    }

    .default-finished {
      @include autoFontFamily('PingFangSC-Regular');
      @include autoFontWeight(400);
      font-size: 12px;
      color: #999999;
      text-align: center;
      line-height: 12px;
      padding: 24px 0;
    }
  }
</style>
