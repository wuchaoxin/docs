<template>
  <div :class="['iframe-container', theme === 'light' ? 'light' : 'dark']">
    <iframe :src="src" :srcdoc="srcdoc" ref="iframe" :class="[type, 'iframe']" frameborder="0"></iframe>
  </div>
</template>

<script setup lang="ts">
  import { useGetTheme } from '@/utils/dom'
  import { ref } from 'vue'

  withDefaults(
    defineProps<{
      src?: string
      srcdoc?: string
      type?: 'pc' | 'mobile'
    }>(),
    {
      type: 'mobile',
    }
  )

  const iframe = ref<null | HTMLIFrameElement>(null)
  const theme = useGetTheme()
</script>

<style lang="scss" scoped>
  .iframe-container {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 16px 0;

    &.light {
      background-color: #f9f9f9;
    }

    &.dark {
      background-color: #1a1a1a;
    }

    .iframe {
      overflow: hidden;

      &.pc {
        width: 100%;
        height: 100vh;
      }

      &.mobile {
        width: 375px;
        height: 667px;
        border-radius: 10px;
      }
    }
  }
</style>
