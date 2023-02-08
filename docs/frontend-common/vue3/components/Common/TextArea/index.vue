<!--
 * @description
!-->
<template>
  <div class="textarea-container" :style="textareaContainerStyle">
    <textarea class="textarea" v-bind="myAttrs" ref="textarea" :value="textareaVal" :style="textareaStyle" />
  </div>
</template>
<script setup lang="ts">
  import { ref, computed, useAttrs, StyleValue } from 'vue'

  const props = defineProps<{
    modelValue?: string
    textareaContainerStyle?: StyleValue
    textareaStyle?: StyleValue
  }>()
  const emits = defineEmits(['update:modelValue'])

  const isTextareaLock = ref(false)
  const textarea = ref<HTMLInputElement | null>(null)

  const myAttrs = computed(() => {
    const attrs = useAttrs()
    const cover = {
      onCompositionstart: (...params: Dynamic) => {
        lockTextarea()
        const onCompositionstart = attrs?.onCompositionstart as Function | undefined
        onCompositionstart?.(...params)
      },
      onCompositionend: (...params: Dynamic) => {
        unLockTextarea()
        const onCompositionend = attrs?.onCompositionend as Function | undefined
        onCompositionend?.(...params)
      },
      onInput: (...params: Dynamic) => {
        // @ts-ignore
        setVal(...params);
        const onInput = attrs?.onInput as Function | undefined;
        onInput?.(...params);
      },
    }
    return Object.assign({}, attrs, cover)
  })
  const textareaVal = computed({
    get() {
      return props.modelValue || ''
    },
    set(val: string) {
      emits('update:modelValue', val)
    },
  })

  function lockTextarea() {
    isTextareaLock.value = true
  }
  function unLockTextarea() {
    isTextareaLock.value = false
    const inputEl = textarea.value
    if (inputEl) {
      textareaVal.value = inputEl.value
    }
  }
  function setVal($event:Dynamic) {
    if (!isTextareaLock.value) {
      const value = $event.target.value;
      textareaVal.value = value;
    }
  }
</script>
<style scoped lang="scss">
  .textarea-container {
    .textarea {
      background: #f9f9f9;
      border: 1px solid rgba(235, 235, 235, 1);
      border-radius: 8px;
      resize: none;
      caret-color: #0078f5;
      padding: 16px;
      width: 343px;
      height: 134px;
      @include autoFontFamily(PingFangSC-Regular);
      @include autoFontWeight(400);
      font-size: 14px;
      color: #1a2129;
      line-height: 22px;
      &::placeholder {
        color: #c8cacc;
      }
    }
  }
</style>
