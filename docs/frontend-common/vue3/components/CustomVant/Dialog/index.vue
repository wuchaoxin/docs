<!--
 * @description Dialog 组件（暂时有 bug、不启用）
!-->
<template>
  <Dialog v-bind="myAttrs" v-model:show="customShow">
    <template v-slot:title v-if="$slots.title">
      <slot name="title"></slot>
    </template>
    <template v-if="$slots.default">
      <slot></slot>
    </template>
    <template v-slot:footer v-if="$slots.footer">
      <slot name="footer"></slot>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { DIALOG_NAMESPACE } from "../../../../styles/sass/common-class";
import { Dialog as DialogObj } from "vant";
import { useAttrs, computed } from "vue";

const Dialog = DialogObj.Component;

const props = defineProps<{
  show?: boolean;
}>();
const emits = defineEmits(["update:show"]);

const customShow = computed({
  get() {
    return !!props.show;
  },
  set(val: boolean) {
    emits("update:show", val);
  },
});

const myAttrs = computed(() => {
  const attrs = useAttrs();
  return Object.assign(
    {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      className: [DIALOG_NAMESPACE],
    },
    attrs
  );
});
</script>
<style scoped lang="scss"></style>
