<!--
 * @description
!-->
<template>
  <div class="mobile-home">
    <div class="title">
      <img src="/images/logo.svg" />
      <span>移动端组件库</span>
    </div>
    <div class="description">基于 UI 设计进行开发</div>

    <div class="small-title">基础组件</div>
    <div class="display-item" v-for="item in COMPONENTS_LIST" @click="jumpComponent(item.name)">
      <span>{{ item.title }}</span>
      <img src="/images/arrow.png" alt="" />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { MobileComponent } from './typeing'

  const emit = defineEmits(['jump'])

  const COMPONENTS_LIST: Array<{ title: string; name: MobileComponent }> = [
    { title: 'Button 按钮', name: 'Button' },
    { title: 'Cell 单元格', name: 'Cell' },
    { title: 'SwipeCell 滑动单元格', name: 'SwipeCell' },
    { title: 'Container 容器', name: 'Container' },
    { title: 'Dialog 弹窗', name: 'Dialog' },
    { title: 'Toast 提示', name: 'Toast' },
    { title: 'Input 输入框', name: 'Input' },
    { title: 'Textarea 输入框', name: 'Textarea' },
    { title: 'ProgressBar 进度条', name: 'ProgressBar' },
  ]

  function jumpComponent(componentName: MobileComponent) {
    emit('jump', componentName)
  }
</script>
<style scoped lang="scss">
  .mobile-home {
    padding: 16px;
    font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'miui',
      'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
    font-weight: 400;
    color: #323233;

    .title {
      font-size: 32px;
      display: flex;
      align-items: center;

      > img {
        width: 32px;
      }

      > span {
        margin-left: 16px;
        color: #323233;
      }
    }

    .description {
      margin: 16px 0 40px 0;
      font-size: 14px;
      color: rgba(69, 90, 100, 0.6);
    }

    .small-title {
      color: rgba(69, 90, 100, 0.6);
      font-size: 14px;
    }

    .display-item {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #323233;
      font-size: 14px;
      font-weight: 600;
      background-color: #f7f8fa;
      border-radius: 99px;
      line-height: 40px;
      padding-left: 20px;
      padding-right: 20px;
      cursor: pointer;

      > img {
        width: 16px;
        height: 16px;
      }
    }
  }
</style>
