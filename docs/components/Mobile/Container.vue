<!--
 * @description 因为展示需要，这里创建一个容器组件，主要功能为：显示标题以及添加间隔
!-->
<template>
  <div :class="['container', needGap ? 'gap' : '']">
    <div class="title">{{ title }}</div>
    <div :class="['main', sort ? 'sort' : '']">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
  withDefaults(
    defineProps<{
      title: string
      needGap?: boolean
      sort?: boolean
    }>(),
    {
      needGap: true,
      sort: false,
    }
  )
</script>
<style scoped lang="scss">
  .container {
    padding: 16px 0 0 0;
    &.gap {
      padding: 16px 16px 0 16px;
      .title {
        margin: 0;
      }
    }
    .title {
      margin: 0 16px;
      font-family: PingFangSC-Semibold;
      font-size: 20px;
      color: #000000;
      line-height: 40px;
      font-weight: 600;
      @include thinBorder((bottom), #bfbfbf);
    }

    .main {
      padding-top: 10px;

      :slotted(> div, > p) {
        margin-bottom: 10px;
      }
      &.sort {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
      }
    }
  }
</style>
