<!--
 * @description
!-->
<template>
  <div class="cell">
    <div class="cell-title">
      <div
        :class="['icon', titleIcon]"
        v-show="titleIcon || titleIconStyle"
        :style="titleIconStyle"
      ></div>
      <div class="text" :style="titleStyle">{{ title }}</div>
    </div>
    <div :class="['cell-value', valueType]">
      <div class="text" :style="valueStyle">{{ value }}</div>
      <div
        :class="['icon', valueIcon]"
        v-show="valueIcon || valueIconStyle"
        :style="valueIconStyle"
      ></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { StyleValue } from "vue";
import type { Icon, ValueType } from "./types/typings";

withDefaults(
  defineProps<{
    title?: string;
    value?: string;
    valueType?: ValueType;
    titleIcon?: Icon;
    valueIcon?: Icon;
    titleStyle?: StyleValue;
    valueStyle?: StyleValue;
    titleIconStyle?: StyleValue;
    valueIconStyle?: StyleValue;
  }>(),
  {
    valueType: "normal",
  }
);
</script>
<style scoped lang="scss">
.cell {
  width: 375px;
  height: 64px;
  box-sizing: border-box;
  background: #ffffff;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: inset 0px -0.5px 0px 0px rgba(204, 204, 204, 0.4);

  @include autoFontFamily(PingFangSC-Regular);
  @include autoFontWeight(400);
  font-size: 16px;
  color: #1a2129;
  line-height: 16px;

  .cell-title,
  .cell-value {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon {
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    &.link {
      background-image: url("../../../assets/svg/sel.svg");
    }
    &.weChat {
      background-image: url("../../../assets/svg/login_wechat.svg");
    }
    &.weChatPay {
      background-image: url("../../../assets/svg/wechatpay.svg");
    }
    &.complete {
      background-image: url("../../../assets/svg/radiobtn_sel.svg");
    }
  }

  .cell-title {
    .icon {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
  }

  .cell-value {
    .icon {
      margin-left: 5px;
    }
    &.normal {
      @include autoFontFamily(PingFangSC-Regular);
      color: #1a2129;
      @include autoFontWeight(400);
    }
    &.bold {
      @include autoFontFamily(PingFangSC-Medium);
      color: #1a2129;
      @include autoFontWeight(500);
    }
    &.light {
      @include autoFontFamily(PingFangSC-Regular);
      @include autoFontWeight(400);
      color: #c8cacc;
    }
  }
}
</style>
