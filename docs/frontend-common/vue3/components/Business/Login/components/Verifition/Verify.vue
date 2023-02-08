<template>
  <div :class="mode == 'pop' ? 'mask' : ''" v-show="showBox">
    <div :class="mode == 'pop' ? 'verifybox' : ''" :style="{ 'max-width': parseInt(imgSize.width) + 20 + 'px' }">
      <div class="verifybox-top" v-if="mode == 'pop'">
        请完成安全验证
        <div class="verifybox-close icon icon-close" @click="closeBox"></div>
      </div>

      <div class="verifybox-bottom" :style="{ padding: mode == 'pop' ? boxPadding + 'px' : '0' }">
        <!-- VerifySlide -->
        <VerifySlide
          v-if="componentType === 'VerifySlide'"
          :captchaType="captchaType"
          :type="verifyType"
          :mode="mode"
          :vSpace="vSpace"
          :explain="explain"
          :imgSize="imgSize"
          :blockSize="blockSize"
          :barSize="barSize"
          :defaultImg="defaultImg"
          :defaultBlockImg="defaultBlockImg"
          :boxPadding="boxPadding"
          ref="instance"
          @close="close"
          @success="success"
          @error="error"
        ></VerifySlide>

        <!-- VerifyPoints -->
        <VerifyPoints
          v-if="componentType === 'VerifyPoints'"
          :captchaType="captchaType"
          :type="verifyType"
          :mode="mode"
          :vSpace="vSpace"
          :imgSize="imgSize"
          :barSize="barSize"
          :defaultImg="defaultImg"
          ref="instance"
          @close="close"
          @success="success"
          @error="error"
        ></VerifyPoints>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import VerifySlide from './Verify/VerifySlide.vue'
  import VerifyPoints from './Verify/VerifyPoints.vue'
  import { ref, computed, watch } from 'vue'
  import { Size, CaptchaType, Mode, VerifyType } from './types/typings'

  const props = withDefaults(
    defineProps<{
      // 验证码类型
      captchaType: CaptchaType
      // 类型
      mode?: Mode
      // 间隔
      vSpace?: number
      // 说明文字
      explain?: string
      imgSize?: Size
      blockSize?: Size
      barSize?: Size
    }>(),
    {
      mode: 'pop',
      imgSize: () => ({
        width: '280px',
        height: '140px',
      }),
    }
  )
  const emits = defineEmits(['success', 'error'])

  // pop 模式下是否显示
  const clickShow = ref(false)
  // 标志是滑动验证还是选词验证
  const verifyType = ref<undefined | VerifyType>(undefined)
  // 标志是滑动验证组件还是选词验证组件
  const componentType = ref<undefined | 'VerifySlide' | 'VerifyPoints'>(undefined)
  // 默认的图片
  const defaultImg = require('./assets/default_verify.png')
  // 默认的滑块图片
  const defaultBlockImg = require('./assets/default_verify_block.png')
  const boxPadding = 10
  const instance = ref(null)

  const showBox = computed(() => {
    if (props.mode == 'pop') {
      return clickShow.value
    } else {
      return true
    }
  })

  uuid()

  function uuid() {
    var s: string[] = []
    var hexDigits = '0123456789abcdef'
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((+s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-'

    var slider = 'slider' + '-' + s.join('')
    var point = 'point' + '-' + s.join('')
    // 判断下是否存在 slider
    if (!localStorage.getItem('slider')) {
      localStorage.setItem('slider', slider)
    }
    if (!localStorage.getItem('point')) {
      localStorage.setItem('point', point)
    }
  }
  function refresh() {
    const temp = instance.value as any
    if (temp) {
      temp?.refresh?.()
    }
  }
  function closeBox() {
    clickShow.value = false
  }
  function show() {
    if (props.mode === 'pop') {
      clickShow.value = true
    }
  }
  function close() {
    closeBox()
  }
  function success(params) {
    emits('success', params)
  }
  function error() {
    emits('error')
  }

  watch(
    () => props.captchaType,
    (captchaType) => {
      switch (captchaType.toString()) {
        case 'blockPuzzle':
          verifyType.value = '2'
          componentType.value = 'VerifySlide'
          break
        case 'clickWord':
          verifyType.value = undefined
          componentType.value = 'VerifyPoints'
          break
      }
    },
    {
      immediate: true,
    }
  )

  defineExpose({
    show,
    refresh,
  })
</script>
<style lang="scss" scoped>
  .icon {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    &.icon-close {
      background-image: url('./assets/close.png');
    }
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1001;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    transition: all 0.5s;
  }
  .verifybox {
    position: relative;
    box-sizing: border-box;
    border-radius: 1px;
    border: 1px solid #e4e7eb;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .verifybox-top {
      padding: 0 8px;
      height: 35px;
      line-height: 35px;
      text-align: left;
      font-size: 15px;
      color: #45494c;
      border-bottom: 1px solid #e4e7eb;
      box-sizing: border-box;
      .verifybox-close {
        width: 16px;
        height: 16px;
        position: absolute;
        top: 10px;
        right: 15px;
        width: 12px;
        height: 12px;
        text-align: center;
        cursor: pointer;
      }
    }
    .verifybox-bottom {
      padding: 15px;
      box-sizing: border-box;
    }
  }
</style>
