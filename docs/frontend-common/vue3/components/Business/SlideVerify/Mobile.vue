<!--
 * @description
!-->
<template>
  <div>
    <Dialog v-model:show="dialogShow" :style="{ width: 'auto' }">
      <SlideVerifyBase @close="closeDialog" @success="handleSuccess" @fail="handleFail" @getFail="handleGetFail" v-bind="attrs"></SlideVerifyBase>
      <template #footer></template>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
  import Dialog from '../../CustomVant/Dialog/index.vue'
  import { ToastFn } from '../../CustomVant/Toast'
  import { ref, useAttrs } from 'vue'
  import SlideVerifyBase from './Base.vue'

  const emits = defineEmits(['success', 'fail'])

  const attrs = useAttrs()
  const dialogShow = ref(false)

  function openDialog() {
    dialogShow.value = true
  }
  function closeDialog() {
    dialogShow.value = false
  }

  function handleSuccess(data) {
    closeDialog()
    emits('success', data)
  }
  function handleFail(data) {
    emits('fail', data)
    // promptError('验证失败')
  }
  function handleGetFail(res) {
    const msg = res.repMsg || '未知错误'
    promptError(msg)
  }

  function promptError(msg: string) {
    ToastFn({
      message: msg,
      align: 'left',
    })
  }

  defineExpose({
    openDialog,
    closeDialog,
  })
</script>
<style scoped lang="scss">
  .container {
    padding: 16px;
  }
</style>
