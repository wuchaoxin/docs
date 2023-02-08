<!--
 * @description
!-->
<template>
  <div class="mobile">
    <div class="nav" v-show="currentComponent !== Home">
      <img src="/images/back.png" alt="" @click="setJumpComponent('Home')" />
      <span>{{ jumpComponent || component }}</span>
    </div>
    <div class="component">
        <component :is="currentComponent" @jump="setJumpComponent"></component>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { MobileComponent } from './typeing'
  import Home from '@/components/Mobile/Home.vue'
  import Button from '@/components/Mobile/examples/Button.vue'
  import Cell from '@/components/Mobile/examples/Cell.vue'
  import SwipeCell from '@/components/Mobile/examples/SwipeCell.vue'
  import Container from '@/components/Mobile/examples/Container.vue'
  import Dialog from '@/components/Mobile/examples/Dialog.vue'
  import Toast from '@/components/Mobile/examples/Toast.vue'
  import Input from '@/components/Mobile/examples/Input.vue'
  import Textarea from '@/components/Mobile/examples/Textarea.vue'
  import ProgressBar from '@/components/Mobile/examples/ProgressBar.vue'

  const props = defineProps<{
    component?: MobileComponent
  }>()

  const jumpComponent = ref<MobileComponent>(undefined)

  const currentComponent = computed(() => {
    const name = jumpComponent.value || props.component || 'Home'
    const examplesMap = {
      Home: Home,
      Button: Button,
      Cell: Cell,
      SwipeCell: SwipeCell,
      Container: Container,
      Dialog: Dialog,
      Toast: Toast,
      Input: Input,
      Textarea: Textarea,
      ProgressBar: ProgressBar,
    }
    if (examplesMap[name]) {
      return examplesMap[name]
    } else {
      return Home
    }
  })

  function setJumpComponent(componentName: MobileComponent) {
    jumpComponent.value = componentName
  }
</script>
<style scoped lang="scss">
  .mobile {
    width: 100%;
    min-height: 100vh;
    position: relative;
    background-color: #fff;
    color: #323233;
    margin: 0 auto;
    overflow: hidden;

    .nav {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 56px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #ebebeb;
      background-color: #fff;
      z-index: 10;

      > img {
        position: absolute;
        left: 16px;
        width: 24px;
        height: 24px;
        cursor: pointer;
      }

      > span {
        font-weight: 600;
        font-size: 17px;
        color: #323233;
      }
    }

    .component {
      margin-top: 52px;
    }
  }
</style>
