<!--
 * @description 容器组件
!-->
<template>
  <div class="container">
    <div class="main" ref="main" :style="{ height: height }">
      <template v-if="html">
        <div class="html-container" v-html="html"></div>
      </template>
      <template v-else="html">
        <slot></slot>
      </template>
    </div>
    <div class="footer" v-if="height && diaplayHandle">
      <slot name="footer" :expand="!!handleFlag" :change="changeStatus"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
  import Desgin from '../../../../utils/design'
  import { HANDLE } from './types/const'
  import { Hanlde } from './types/typings'

  const props = withDefaults(
    defineProps<{
      // 高度折叠（第一优先级)
      height?: number | string
      // 个数折叠（第二优先级)
      number?: number
      // 是否传入 html 进入进行渲染
      html?: string
      desgin?: number
    }>(),
    {
      desgin: 375,
    }
  )

  const handleFlag = ref<Hanlde>(HANDLE.EXPAND)
  const numberHeight = ref<number>(0)
  const main = ref<null | HTMLDivElement>(null)
  const diaplayHandle = ref(true)
  const getDesgin = new Desgin(props.desgin)
  const observe = new MutationObserver(function (mutationRecoards) {
    if (mutationRecoards[0] && mutationRecoards[0].type === 'childList') {
      if (props.number) {
        handleFlag.value = HANDLE.EXPAND
        countNumberHeight()
      }
    }
  })

  const height = computed(() => {
    if (props.height) {
      if (handleFlag.value === HANDLE.EXPAND) {
        return getDesgin.px2viewport(props.height)
      } else {
        return 'auto'
      }
    } else if (props.number) {
      if (handleFlag.value === HANDLE.EXPAND) {
        return numberHeight.value + 'px'
      } else {
        return 'auto'
      }
    } else {
      return 'auto'
    }
  })

  onMounted(() => {
    addMonitor()
    setTimeout(() => {
        refresh()
    }, 0);
  })

  onBeforeUnmount(() => {
    removeMonitor()
  })

  function addMonitor() {
    const mainEL = main.value
    if (mainEL) {
      observe.observe(mainEL, {
        childList: true,
      })
    }
  }

  function removeMonitor() {
    observe.disconnect()
  }

  function refresh() {
    if (props.number) {
      handleFlag.value = HANDLE.EXPAND
      countNumberHeight()
    }
  }

  function countNumberHeight() {
    const mainEL = main.value
    if (mainEL) {
      const textChildren = Array.from(mainEL.children) as HTMLElement[]
      if (textChildren.length <= (props.number || 0)) {
        handleFlag.value = HANDLE.SHRINK
        diaplayHandle.value = false
        return
      }
      diaplayHandle.value = true
      const numberTextChildren = textChildren.slice(0, props.number || 0)
      let height = 0
      for (const item of numberTextChildren) {
        const temp = getComputedStyle(item)
        height = height + item.offsetHeight + Number.parseFloat(temp.marginTop) + Number.parseFloat(temp.marginBottom)
      }
      numberHeight.value = height
    }
  }

  function changeStatus() {
    handleFlag.value = handleFlag.value === HANDLE.EXPAND ? HANDLE.SHRINK : HANDLE.EXPAND
  }

  defineExpose({
    changeStatus,
    refresh,
  })
</script>
<style scoped lang="scss">
  .container {
    position: relative;
    .main {
      overflow: hidden;
      :deep(.html-container) {
        img,
        video {
          overflow: hidden;
          max-width: 100% !important;
          object-fit: cover !important;
        }
        ul,
        ol {
          padding-left: 20px;
        }
        ul {
          list-style: disc;
          li {
            list-style: disc;
          }
        }
        ol {
          list-style: decimal;
          li {
            list-style: decimal;
          }
        }
      }
    }
  }
</style>
