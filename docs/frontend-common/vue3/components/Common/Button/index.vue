<!--
 * @description 按钮组件
!-->
<template>
  <div
    :class="[
      'button-container',
      slide ? 'slide' : '',
      widthType === 'all' ? 'all' : '',
    ]"
  >
    <button
      :class="['button', typeClass, colorClass, widthTypeClass, textTypeClass]"
      type="button"
      :disabled="disabled"
      :style="style"
    >
      <slot></slot>
    </button>
  </div>
</template>
<script setup lang="ts">
import {
  BackgroundColor,
  getCommonBackgroundColorClass,
  getCommonTextColorClass,
  TextColor,
} from "../../../../styles/sass/common-class";
import { computed, StyleValue } from "vue";
import { TextType, WidthType } from "./types/typings";

const TYPE_WHITE_LIST = ["text", "plain"] as const;
type TypeWhite = typeof TYPE_WHITE_LIST[number];

const props = withDefaults(
  defineProps<{
    type?: BackgroundColor | TypeWhite;
    widthType?: WidthType;
    colorType?: TextColor;
    textType?: TextType;
    disabled?: boolean;
    slide?: boolean;
    style?: StyleValue;
  }>(),
  {
    type: "blue",
    widthType: "normal",
    colorType: "white",
    textType: "default",
    disabled: false,
    slide: false,
  }
);

const typeClass = computed(() => {
  const type = props.type;
  const temp = TYPE_WHITE_LIST as unknown as Array<unknown>;
  if (temp.includes(type)) {
    return type;
  } else {
    const typeRe = type as BackgroundColor;
    return getCommonBackgroundColorClass(typeRe);
  }
});

const colorClass = computed(() => {
  return getCommonTextColorClass(props.colorType);
});

const widthTypeClass = computed(() => {
  if (props.type === "text") {
    return "";
  } else {
    return props.widthType;
  }
});

const textTypeClass = computed(() => {
  if (props.type === "text") {
    return props.textType;
  } else {
    return "";
  }
});
</script>
<style scoped lang="scss">
.button-container {
  display: inline-block;
  &.all {
    display: block;
    width: 100%;
  }
  &.slide {
    height: 100%;
    .button {
      border-radius: 0;
      height: 100%;
      padding: 8px;
      &.normal {
        min-width: 64px;
      }
    }
  }

  .button {
    border: none;
    outline: none;
    border-radius: 4px;
    @include autoFontFamily(PingFangSC-Regular);
    @include autoFontWeight(400);
    font-size: 16px;
    text-align: center;
    line-height: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 16px;
    min-height: 48px;

    &:disabled {
      opacity: 0.5;
    }

    // 按钮类型
    &.plain {
      @include thinBorder(
        (top, bottom, left, right),
        rgba(235, 235, 235, 1),
        4px
      );
      background-color: #fff;
      color: #1a2129;
    }

    &.text {
      width: auto;
      height: auto;
      min-height: auto;
      min-width: auto;
      padding: 0;
      font-size: 14px;
      line-height: 14px;
      @include autoFontWeight(400);
    }

    // 文本按钮类型
    &.default {
      color: #0078f5;
    }

    &.hint {
      font-size: 12px;
      color: #0078f5;
      line-height: 12px;
    }

    &.secondaryDefault {
      color: #1a2129;
    }

    &.secondaryHint {
      font-size: 12px;
      color: #898c8f;
      line-height: 12px;
    }

    // 宽度类型
    &.huge {
      min-width: 343px;
    }

    &.big {
      min-width: 164px;
    }

    &.normal {
      min-width: 109px;
    }
    &.all {
      width: 100%;
    }
  }
}
</style>
