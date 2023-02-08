<!--
 * @description
!-->
<template>
  <div>
    <Container title="按钮类型" :sort="true">
      <Button>blue</Button>
      <Button type="red">red</Button>
      <Button type="orange">orange</Button>
      <Button type="yellow">yellow</Button>
      <Button type="green">green</Button>
      <Button type="cyan">cyan</Button>
      <Button type="purple">purple</Button>
      <Button type="pink">pink</Button>
      <Button type="grey">grey</Button>
      <Button type="plain">plain</Button>
      <div :style="{display: 'flex', justifyContent: 'space-between', alignItems: 'center',flexWrap: 'wrap' }">
        <div>
            <Button type="text">文本按钮-正文</Button>
        </div>
        <div>
            <Button type="text" text-type="hint">文本按钮-提示</Button>
        </div>
        <div>
            <Button type="text" text-type="secondaryDefault">文本按钮-次级正文</Button>
        </div>
        <div>
            <Button type="text" text-type="secondaryHint">文本按钮-次级提示</Button>
        </div>
      </div>
    </Container>
    <Container title="按钮宽度">
      <Button width-type="all">整行</Button>
      <Button width-type="huge">按钮-超大</Button>
      <div>
        <Button width-type="big">按钮-大</Button>
      </div>
      <div>
        <Button width-type="normal">按钮-正常</Button>
      </div>
    </Container>
    <Container title="字体颜色" :sort="true">
        <Button color-type="white">white</Button>
        <Button type="plain" color-type="red">red</Button>
        <Button type="plain" color-type="text-1">text-1</Button>
        <Button type="plain" color-type="text-2">text-2</Button>
        <Button type="plain" color-type="text-3">text-3</Button>
        <Button type="plain" color-type="text-occupy">occupy</Button>
        <Button type="plain" color-type="text-disable">disable</Button>
    </Container>
    <Container title="不可点击">
        <Button :disabled="true">按钮-不可点</Button>
    </Container>
    <Container title="滑动按钮">
        <Button :slide="true">滑动</Button>
    </Container>
  </div>
</template>
<script setup lang="ts">
  import Container from '../Container.vue'
  import { Button } from '@/frontend-common/vue3/components/Common'
</script>
<style scoped lang="scss">
  .title {
    color: #323233;
    background-color: antiquewhite;
    width: 50vw;
  }
</style>
