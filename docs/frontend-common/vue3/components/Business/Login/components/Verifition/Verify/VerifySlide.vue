<template>
  <div class="verify-slide" ref="verifySlide" @selectstart="selectstart">
    <div v-if="type === '2'" class="verify-img-out" :style="{ height: Number.parseFloat(setSize.imgHeight) + vSpace + 'px' }">
      <div class="verify-img-panel" :style="{ width: setSize.imgWidth, height: setSize.imgHeight }">
        <img :src="backImgBase ? 'data:image/png;base64,' + backImgBase : defaultImg" />
        <div class="verify-refresh icon icon-refresh" @click="refresh" v-show="showRefresh"></div>
        <transition name="tips">
          <span class="verify-tips" v-if="tipWords" :class="passFlag ? 'suc-bg' : 'err-bg'">{{ tipWords }}</span>
        </transition>
      </div>
    </div>
    <!-- 公共部分 -->
    <div
      class="verify-bar-area"
      ref="barArea"
      :style="{
        width: Number.parseFloat(setSize.imgWidth) - 2 + 'px',
        height: barSize.height,
        'line-height': barSize.height,
      }"
    >
      <span class="verify-msg" v-text="text"></span>
      <div
        class="verify-left-bar"
        :style="{
          width: leftBarWidth !== undefined ? leftBarWidth : barSize.height,
          height: barSize.height,
          'border-color': leftBarBorderColor,
          transition: transitionWidth,
        }"
      >
        <span class="verify-msg" v-text="finishText"></span>
        <div
          class="verify-move-block"
          @touchstart="start"
          @mousedown="start"
          :style="{
            width: barSize.height,
            height: barSize.height,
            'background-color': moveBlockBackgroundColor,
            left: moveBlockLeft,
            transition: transitionLeft,
          }"
        >
          <div :class="['verify-icon', 'icon', iconClass]" :style="{ color: iconColor }"></div>
          <div
            v-if="type === '2'"
            class="verify-sub-block"
            :style="{
              width: Math.floor((Number.parseFloat(setSize.imgWidth) * 47) / 310) + 'px',
              height: setSize.imgHeight,
              top: - Number.parseFloat(setSize.imgHeight) - vSpace + 'px',
              'background-size': setSize.imgWidth + ' ' + setSize.imgHeight,
            }"
          >
            <img :src="blockBackImgBase ? 'data:image/png;base64,' + blockBackImgBase : defaultBlockImg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { aesEncrypt } from '../utils/ase'
  import { resetSize } from '../utils/util'
  import { reqGet, reqCheck } from '../apis/index'
  import { Size, CaptchaType, Mode, VerifyType } from '../types/typings'
  import { ref, watch, nextTick, onBeforeUnmount } from 'vue'

  const props = withDefaults(
    defineProps<{
      captchaType?: CaptchaType
      type?: VerifyType
      mode?: Mode
      vSpace?: number
      explain?: string
      imgSize?: Size
      blockSize?: Size
      barSize?: Size
      defaultImg?: string
      defaultBlockImg?: string
      boxPadding?: number
    }>(),
    {
      vSpace: 5,
      explain: '向右滑动完成验证',
      imgSize: () => ({
        width: '310px',
        height: '155px',
      }),
      blockSize: () => ({
        width: '50px',
        height: '50px',
      }),
      barSize: () => ({
        width: '310px',
        height: '40px',
      }),
      defaultImg: '',
      defaultBlockImg: '',
      boxPadding: 10,
    }
  )
  const emits = defineEmits(['close', 'success', 'error'])

  // 后端返回的加密秘钥 字段
  const secretKey = ref('')
  // 是否通过的标识
  const passFlag = ref(false)
  // 验证码背景图片
  const backImgBase = ref('')
  // 验证滑块的背景图片
  const blockBackImgBase = ref('')
  // 后端返回的唯一token值
  const backToken = ref('')
  // 移动开始的时间
  const startMoveTime = ref<number>(0)
  // 移动结束的时间
  const endMovetime = ref<number>(0)
  const tipWords = ref('')
  const text = ref('')
  const finishText = ref('')
  const setSize = ref({
    imgHeight: '',
    imgWidth: '',
    barHeight: '',
    barWidth: '',
  })
  const moveBlockLeft = ref<string>('')
  const leftBarWidth = ref<string>('')
  // 移动中样式
  const moveBlockBackgroundColor = ref<string>('')
  const leftBarBorderColor = ref('#ddd')
  const iconColor = ref<string>('')
  const iconClass = ref('icon-right')
  // 鼠标状态
  const status = ref(false)
  //是否验证完成
  const isEnd = ref(false)
  const showRefresh = ref(true)
  const transitionLeft = ref('')
  const transitionWidth = ref('')
  const barArea = ref<null | HTMLDivElement>(null)
  const verifySlide = ref<null | HTMLDivElement>(null)

  onBeforeUnmount(() => {
    removeMonitor()
  })

  function init() {
    text.value = props.explain
    nextTick(() => {
      //重新设置宽度高度
      setSize.value = resetSize(
        verifySlide.value,
        {
          width: props.imgSize.width,
          height: props.imgSize.height,
        },
        {
          width: props.barSize.width,
          height: props.barSize.height,
        }
      )
    })

    removeMonitor()

    addMonitor()
  }

  function addMonitor() {
    window.addEventListener('touchmove', move)
    window.addEventListener('mousemove', move)

    //鼠标松开
    window.addEventListener('touchend', end)
    window.addEventListener('mouseup', end)
  }

  function removeMonitor() {
    window.removeEventListener('touchmove', move)
    window.removeEventListener('mousemove', move)

    //鼠标松开
    window.removeEventListener('touchend', end)
    window.removeEventListener('mouseup', end)
  }

  // 鼠标按下
  function start(e) {
    e = e || window.event
    e.preventDefault()
    e.stopPropagation()
    // 开始滑动的时间
    startMoveTime.value = +new Date()
    if (isEnd.value == false) {
      text.value = ''
      moveBlockBackgroundColor.value = '#337ab7'
      leftBarBorderColor.value = '#337AB7'
      iconColor.value = '#fff'
      e.stopPropagation()
      status.value = true
    }
  }
  // 鼠标移动
  function move(e) {
    e = e || window.event
    e.preventDefault()
    e.stopPropagation()
    let x = 0
    if (status.value && isEnd.value == false) {
      if (!e.touches) {
        //兼容PC端
        x = e.clientX
      } else {
        //兼容移动端
        x = e.touches[0].pageX
      }
      const bar_area_left = barArea.value?.getBoundingClientRect().left || 0
      let move_block_left = x - bar_area_left //小方块相对于父元素的left值
      if (move_block_left >= (barArea.value?.offsetWidth || 0) - parseInt(props.blockSize.width) / 2 - 2) {
        move_block_left = (barArea.value?.offsetWidth || 0) - parseInt(props.blockSize.width) / 2 - 4
      }
      let leftVal = move_block_left - props.boxPadding > 0 ? move_block_left - props.boxPadding : 0
      moveBlockLeft.value = leftVal + 'px'
      leftBarWidth.value = leftVal + 'px'
    }
  }

  //鼠标松开
  function end() {
    endMovetime.value = +new Date()
    // 判断是否重合
    if (status.value && isEnd.value == false) {
      let moveLeftDistance = parseInt((moveBlockLeft.value || '').replace('px', ''))
      moveLeftDistance = (moveLeftDistance * 310) / Number.parseFloat(setSize.value.imgWidth)
      let data = {
        captchaType: props.captchaType,
        pointJson: secretKey.value
          ? aesEncrypt(JSON.stringify({ x: moveLeftDistance, y: 5.0 }), secretKey.value)
          : JSON.stringify({ x: moveLeftDistance, y: 5.0 }),
        token: backToken.value,
      }
      reqCheck(data).then((response) => {
        const res = response.data
        if (res.repCode == '0000') {
          moveBlockBackgroundColor.value = '#5cb85c'
          leftBarBorderColor.value = '#5cb85c'
          iconColor.value = '#fff'
          iconClass.value = 'icon-check'
          showRefresh.value = false
          isEnd.value = true
          passFlag.value = true
          tipWords.value = `${((endMovetime.value - startMoveTime.value) / 1000).toFixed(2)}s验证成功`
          const captchaVerification = secretKey.value
            ? aesEncrypt(backToken.value + '---' + JSON.stringify({ x: moveLeftDistance, y: 5.0 }), secretKey.value)
            : backToken.value + '---' + JSON.stringify({ x: moveLeftDistance, y: 5.0 })
          setTimeout(() => {
            tipWords.value = ''
            emits('close')
            let successparams = {
              captchaVerification: captchaVerification,
              token: backToken.value,
            }
            emits('success', successparams)
          }, 1000)
        } else {
          moveBlockBackgroundColor.value = '#d9534f'
          leftBarBorderColor.value = '#d9534f'
          iconColor.value = '#fff'
          iconClass.value = 'icon-close'
          passFlag.value = false
          setTimeout(function () {
            refresh()
          }, 1000)
          emits('error')
          tipWords.value = '验证失败'
          setTimeout(() => {
            tipWords.value = ''
          }, 1000)
        }
      })
      status.value = false
    }
  }

  function refresh() {
    showRefresh.value = true
    finishText.value = ''

    transitionLeft.value = 'left .3s'
    moveBlockLeft.value = ''

    leftBarWidth.value = ''
    transitionWidth.value = 'width .3s'

    leftBarBorderColor.value = '#ddd'
    moveBlockBackgroundColor.value = '#fff'
    iconColor.value = '#000'
    iconClass.value = 'icon-right'
    isEnd.value = false

    getPictrue()
    setTimeout(() => {
      transitionWidth.value = ''
      transitionLeft.value = ''
      text.value = props.explain
    }, 300)
  }

  // 请求背景图片和验证图片
  function getPictrue() {
    let data = {
      captchaType: props.captchaType,
      clientUid: localStorage.getItem('slider'),
      ts: Date.now(), // 现在的时间戳
    }
    reqGet(data).then((response) => {
      const res = response.data
      if (res.repCode == '0000') {
        backImgBase.value = res.repData.originalImageBase64
        blockBackImgBase.value = res.repData.jigsawImageBase64
        backToken.value = res.repData.token
        secretKey.value = res.repData.secretKey
      } else {
        tipWords.value = res.repMsg
      }
      // 判断接口请求次数是否失效
      if (res.repCode == '6201') {
        backImgBase.value = ''
        blockBackImgBase.value = ''
      }
    })
  }
  function selectstart() {
    return false
  }

  watch(
    () => props.type,
    () => {
      init()
    },
    {
      immediate: true,
    }
  )

  defineExpose({
    refresh,
  })
</script>

<style lang="scss" scoped>
  .icon {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    &.icon-check {
      background-image: url('../assets/check.png');
    }
    &.icon-right {
      background-image: url('../assets/right.png');
    }
    &.icon-refresh {
      background-image: url('../assets/refresh.png');
    }
  }
  .tips-enter,
  .tips-leave-to {
    bottom: -15px;
  }
  .tips-enter-active,
  .tips-leave-active {
    transition: bottom 0.5s;
  }
  .verify-slide {
    position: relative;
    .verify-img-out {
      display: block;
      width: 100%;
      overflow: hidden;
      .verify-img-panel {
        margin: 0;
        box-sizing: content-box;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        border-radius: 2px;
        position: relative;
        width: 310px;
        height: 155px;
        > img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }
        .verify-refresh {
          box-sizing: border-box;
          width: 15px;
          height: 15px;
          text-align: center;
          padding: 2px;
          cursor: pointer;
          position: absolute;
          top: 2px;
          right: 4px;
          z-index: 2;
        }
        .verify-tips {
          position: absolute;
          left: 0px;
          bottom: 0px;
          width: 100%;
          height: 23px;
          line-height: 23px;
          color: #fff;
          font-size: 13px;
        }
      }
    }
    .verify-bar-area {
      position: relative;
      background: #ffffff;
      text-align: center;
      box-sizing: content-box;
      border: 1px solid #ddd;
      border-radius: 2px;
      .verify-msg {
        z-index: 3;
      }
      .verify-left-bar {
        position: absolute;
        top: -1px;
        left: -1px;
        background: #f0fff0;
        cursor: pointer;
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        box-sizing: content-box;
        border: 1px solid #ddd;
      }
      .verify-move-block {
        touch-action: pan-y;
        position: absolute;
        top: 0px;
        left: 0;
        background: #fff;
        cursor: pointer;
        box-sizing: content-box;
        border-radius: 1px;
        border-right: 1px solid #eee;
        display: flex;
        justify-content: center;
        align-items: center;
        .verify-icon {
          width: 16px;
          height: 16px;
        }
        .verify-sub-block {
          position: absolute;
          text-align: center;
          z-index: 3;
          left: 0;
          > img {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
          }
        }
      }
    }
  }
</style>
