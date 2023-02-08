<!--
 * @description
!-->
<template>
  <div>
    <Container title="基础用法">
      <Input v-model="inputVal" />
    </Container>
    <Container title="带有 label">
      <Input v-model="inputVal" label="姓名" />
    </Container>
    <Container title="带有清除功能">
      <Input v-model="inputVal" label="姓名" clearable />
    </Container>
    <Container title="带有处理按钮">
      <Input v-model="inputVal" label="手机号" handleText="发送验证码" :handleStyle="{ color: '#0078f5' }" @handleClick="ToastFn('已发送')" />
    </Container>
  </div>
</template>
<script setup lang="ts">
  import { Input } from '@/frontend-common/vue3/components/Common'
  import { ToastFn } from '@/frontend-common/vue3/components/CustomVant'
  import Container from '../Container.vue'
  import { ref } from 'vue'

  const inputVal = ref('')
</script>
<style scoped lang="scss"></style>
