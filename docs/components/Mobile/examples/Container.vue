<!--
 * @description
!-->
<template>
  <div>
    <Container title="设置固定高度">
      <ContainerRe height="100">
        <div>
          燃烧的法庭》是著名推理小说作家约翰·狄克森·卡尔非系列经典杰作之一，与H.M.爵士探案系列的《犹大之窗》、菲尔博士探案系列的《三口棺材》并称为卡尔三大神作。《燃烧的法庭》不仅有卡尔一贯的精妙密室诡计，更糅合了推理、惊悚、超自然、心理悬疑等元素，谜面富有吸引力，结尾急转直下，不失为约翰·狄克森·卡尔最棒的小说之一。
        </div>
        <div>
          《罗杰疑案》讲的是一个星期五的晚上，罗杰被“我”和他的管家帕克发现死在他的书房中。因为“我”对罗杰比较了解以及“我”的不在现场的证明，“我”成了波洛的助手。随着案件的剥茧抽丝，嫌疑人的逐渐排除，最后结局出人意料。
        </div>
        <template #footer="params">
          <Button type="text" @click="params.change">{{ params.expand ? '收起' : '展开' }}</Button>
        </template>
      </ContainerRe>
    </Container>
    <Container title="设置固定个数限制">
      <ContainerRe :number="1">
        <div>
          燃烧的法庭》是著名推理小说作家约翰·狄克森·卡尔非系列经典杰作之一，与H.M.爵士探案系列的《犹大之窗》、菲尔博士探案系列的《三口棺材》并称为卡尔三大神作。《燃烧的法庭》不仅有卡尔一贯的精妙密室诡计，更糅合了推理、惊悚、超自然、心理悬疑等元素，谜面富有吸引力，结尾急转直下，不失为约翰·狄克森·卡尔最棒的小说之一。
        </div>
        <div>
          《罗杰疑案》讲的是一个星期五的晚上，罗杰被“我”和他的管家帕克发现死在他的书房中。因为“我”对罗杰比较了解以及“我”的不在现场的证明，“我”成了波洛的助手。随着案件的剥茧抽丝，嫌疑人的逐渐排除，最后结局出人意料。
        </div>
        <template #footer="params">
          <Button type="text" @click="params.change">{{ params.expand ? '收起' : '展开' }}</Button>
        </template>
      </ContainerRe>
    </Container>
    <Container title="传入 html 进行渲染（清洗 html）">
      <ContainerRe :html="html"></ContainerRe>
    </Container>
  </div>
</template>
<script setup lang="ts">
  import Container from '../Container.vue'
  import { Container as ContainerRe, Button } from '@/frontend-common/vue3/components/Common'

  const html = "<ul><li>推荐书籍一：燃烧的法庭</li><li>推荐书籍二：罗杰疑案</li><li>推荐书籍三：东方快车谋杀案</li></ul>"
</script>
<style scoped lang="scss"></style>
