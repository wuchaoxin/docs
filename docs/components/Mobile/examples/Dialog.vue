<!--
 * @description
!-->
<template>
  <div>
    <Container title="函数调用">
      <Button @click="dialog1" width-type="all">无标题弹窗-文本居中-单按钮</Button>
      <Button @click="dialog2" width-type="all">无标题弹窗-多行文本左对齐-双按钮</Button>
      <Button @click="dialog3" width-type="all">标题弹窗-多行文本左对齐-双按钮</Button>
      <Button @click="dialog4" width-type="all">标题弹窗-最多行文本左对齐-双按钮</Button>
    </Container>

    <Container title="组件调用">
      <Button @click="dialog5" width-type="all">组件调用</Button>
      <Dialog v-model:show="show" title="标题" show-cancel-button>
        <img src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg" />
      </Dialog>
    </Container>
  </div>
</template>
<script setup lang="ts">
  import Container from '../Container.vue'
  import { Button } from '@/frontend-common/vue3/components/Common'
  import { DialogFn, Dialog } from '@/frontend-common/vue3/components/CustomVant'
  import { ref } from 'vue'

  const show = ref(false)

  function dialog1() {
    DialogFn('燃烧的法庭')
  }
  function dialog2() {
    DialogFn({
      message:
        '《燃烧的法庭》是著名推理小说作家约翰·狄克森·卡尔非系列经典杰作之一，与H.M.爵士探案系列的《犹大之窗》、菲尔博士探案系列的《三口棺材》并称为卡尔三大神作。',
      messageAlign: 'left',
      showCancelButton: true,
    })
  }
  function dialog3() {
    DialogFn({
      title: '燃烧的法庭',
      message:
        '《燃烧的法庭》是著名推理小说作家约翰·狄克森·卡尔非系列经典杰作之一，与H.M.爵士探案系列的《犹大之窗》、菲尔博士探案系列的《三口棺材》并称为卡尔三大神作。',
      messageAlign: 'left',
      showCancelButton: true,
    })
  }
  function dialog4() {
    DialogFn({
      title: '燃烧的法庭',
      message:
        '《燃烧的法庭》是著名推理小说作家约翰·狄克森·卡尔非系列经典杰作之一，与H.M.爵士探案系列的《犹大之窗》、菲尔博士探案系列的《三口棺材》并称为卡尔三大神作。编辑史蒂文斯看到新书稿中的照片，不禁震悚无比：数十年前已被处决的毒杀犯，竟和他妻子长得一模一样！前不久，他的邻居老迈尔斯病逝，症状却如同中毒。管家太太声称曾在其逝世当晚，看见一名盛装女子从卧室中穿墙而过。怀疑者决定验尸，可棺材中的尸体竟不翼而飞，仅留下一段九结绳。到底是过去的亡魂归来作祟，还是有人故弄玄虚？当“不可能犯罪”蒙上哥特的面纱，我们将得到怎样的解答……作者：约翰·迪克森·卡尔（John Dickson Carr，1906—1977），美籍推理小说家，曾在英国长期定居。他的作品集欧美古典本格推理之大成，并以“密室谋杀”和“不可能犯罪”的构思见长，有“密室之王”的美誉。1950年和1970年，他先后两次获得美国推理作家协会（简称MWA）的埃德加·爱伦·坡特别奖。1963年，MWA一致同意向他颁发“终身大师奖”，这是推理界的至高荣誉。译者：房小然，毕业于北京语言大学，自由译者。中英文独立双语艺术杂志《燃点》（Ran Dian）编辑、北京UCCA尤伦斯当代艺术中心中文编辑。已翻译《吸血鬼日记》《神探夏洛克》等剧集，译有多部英文热销小说，其中包括《吉诃德大神父》《泥土之界》《呼叫助产士》《格雷厄姆·格林短篇小说全集》（合译）及文斯·弗林的反恐小说。',
      messageAlign: 'left',
      showCancelButton: true,
    })
  }
  function dialog5() {
    show.value = true
  }
</script>
<style scoped lang="scss"></style>
