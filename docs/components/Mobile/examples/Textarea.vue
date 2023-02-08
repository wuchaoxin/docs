<!--
 * @description
!-->
<template>
    <div>
      <Container title="基础用法">
        <Textarea v-model="inputVal" placeholder="有什么意见就说一说吧（200字以内）" maxlength="200"/>
      </Container>
    </div>
  </template>
  <script setup lang="ts">
    import { Textarea } from '@/frontend-common/vue3/components/Common'
    import Container from '../Container.vue'
    import { ref } from 'vue'
  
    const inputVal = ref('')
  </script>
  <style scoped lang="scss"></style>
  