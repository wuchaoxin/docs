<!--
 * @description
!-->
<template>
    <div class="input-container" :style="inputContainerStyle">
      <div class="label" v-if="props.label" :style="labelStyle">{{ props.label }}</div>
      <div class="input">
        <input v-bind="myAttrs" ref="input" :value="inputVal" :style="inputStyle" />
      </div>
      <div v-show="clearIconDisplay" class="clear-icon" @click="clearVal"></div>
      <div
        v-show="handleText"
        class="handle"
        :style="handleStyle"
        @click="handleClick"
      >
        {{ handleText }}
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import { ref, computed, useAttrs, StyleValue } from "vue";
  
  const props = defineProps<{
    label?: string;
    modelValue?: string;
    clearable?: boolean;
    handleText?: string;
    handleStyle?: StyleValue;
    inputContainerStyle?: StyleValue;
    labelStyle?: StyleValue;
    inputStyle?: StyleValue;
  }>();
  const emits = defineEmits(["update:modelValue", "handleClick"]);
  
  const isInputLock = ref(false);
  const input = ref<HTMLInputElement | null>(null);
  
  const myAttrs = computed(() => {
    const attrs = useAttrs();
    const cover = {
      onCompositionstart: (...params: Dynamic) => {
        lockInput();
        const onCompositionstart = attrs?.onCompositionstart as
          | Function
          | undefined;
        onCompositionstart?.(...params);
      },
      onCompositionend: (...params: Dynamic) => {
        unLockInput();
        const onCompositionend = attrs?.onCompositionend as Function | undefined;
        onCompositionend?.(...params);
      },
      onInput: (...params: Dynamic) => {
        // @ts-ignore
        setVal(...params);
        const onInput = attrs?.onInput as Function | undefined;
        onInput?.(...params);
      },
    };
    return Object.assign({}, attrs, cover);
  });
  const inputVal = computed({
    get() {
      return props.modelValue || "";
    },
    set(val: string) {
      emits("update:modelValue", val);
    },
  });
  const clearIconDisplay = computed(() => {
    return inputVal.value && props.clearable;
  });
  
  function lockInput() {
    isInputLock.value = true;
  }
  function unLockInput() {
    isInputLock.value = false;
    const inputEl = input.value;
    if (inputEl) {
      inputVal.value = inputEl.value;
    }
  }
  function setVal($event:Dynamic) {
    if (!isInputLock.value) {
      const value = $event.target.value;
      inputVal.value = value;
    }
  }
  function clearVal() {
    inputVal.value = "";
  }
  function handleClick() {
    emits("handleClick");
  }
  </script>
  <style scoped lang="scss">
  .input-container {
    height: 48px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ebebeb;
    width: 100%;
    .label {
      width: 80px;
      @include autoFontFamily(PingFangSC-Regular);
      @include autoFontWeight(400);
      font-size: 16px;
      color: #1a2129;
      line-height: 16px;
      flex-shrink: 0;
    }
    .input {
      flex: 1;
      input {
        width: 100%;
        outline: none;
        border: none;
        caret-color: #0078f5;
        color: #1a2129;
        @include autoFontFamily(PingFangSC-Regular);
        @include autoFontWeight(400);
        font-size: 16px;
        line-height: 16px;
        &::placeholder {
          color: #c8cacc;
        }
        &:-webkit-autofill {
          box-shadow: 0 0 0 1000px #ffffff inset;
          &::first-line {
            font-size: 16px;
          }
        }
      }
    }
    .clear-icon {
      width: 24px;
      height: 24px;
      background-image: url("../../../assets/svg/del.svg");
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      cursor: pointer;
      flex-shrink: 0;
    }
    .handle {
      @include autoFontFamily(PingFangSC-Regular);
      @include autoFontWeight(400);
      font-size: 16px;
      color: #1a2129;
      text-align: right;
      line-height: 16px;
      margin-left: 4px;
      flex-shrink: 0;
    }
  }
  </style>
  