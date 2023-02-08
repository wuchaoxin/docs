<template>
  <div id="slideVerify" class="slide-verify" :style="{ width: w + 'px' }" onselectstart="return false;">
    <!-- 图片加载遮蔽罩 -->
    <div :class="{ 'slider-verify-loading': loadBlock }"></div>
    <canvas v-if="imgType === 'local'" ref="canvas" :width="w" :height="h"></canvas>
    <div v-else class="back-img" ref="backImg"></div>
    <div v-if="show" class="slide-verify-refresh-icon" @click="refresh"></div>
    <canvas v-if="imgType === 'local'" ref="block" :width="w" :height="h" class="slide-verify-block"></canvas>
    <div v-else class="block-img" ref="blockImg"></div>
    <!-- container -->
    <div
      class="slide-verify-slider"
      v-if="!containerCls.containerSuccess && !containerCls.containerFail"
      :class="{
        'container-active': containerCls.containerActive,
      }"
    >
      <div class="slide-verify-slider-mask" :style="{ width: sliderBox.width }">
        <!-- slider -->
        <div
          class="slide-verify-slider-mask-item"
          :style="{ left: sliderBox.left }"
          @mousedown="sliderDown"
          @touchstart="touchStartEvent"
          @touchmove="touchMoveEvent"
          @touchend="touchEndEvent"
        >
          <div :class="['slide-verify-slider-mask-item-icon', `icon-${sliderBox.iconCls}`]"></div>
        </div>
      </div>
      <span class="slide-verify-slider-text">{{ sliderText }}</span>
    </div>
    <!-- Result display -->
    <div
      v-else
      :class="{
        'container-success': containerCls.containerSuccess,
        'container-fail': containerCls.containerFail,
        'result-display-container': true,
      }"
    >
      <div class="result-display">
        <div class="result-display-icon"></div>
        <div class="result-display-text">{{ containerCls.containerSuccess ? '验证成功' : '验证失败' }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
  import { useSlideAction } from './hooks'
  import { createImg, draw, getRandomImg, getRandomNumberByRange, throttle, aesEncrypt } from './util'
  import { reqGet, reqCheck } from './apis'
  import { ImgType } from './types/typings'
  import { SUCCESS_CODE } from '../../../../utils/types/const/request'
  import { DEFAULT_BACK_IMG, DEFAULT_BLOCK_IMG } from './types/const'

  const props = withDefaults(
    defineProps<{
      // block length
      l?: number
      // block radius
      r?: number
      // canvas width
      w?: number
      // canvas height
      h?: number
      // 滑动文字
      sliderText?: string
      // 精度
      accuracy?: number
      // 是否展示刷新按钮
      show?: boolean
      // 图片集
      imgs?: Array<string>
      // 节流时长间隔
      interval?: number
    }>(),
    {
      l: 40,
      r: 10,
      w: 280,
      h: 140,
      sliderText: '向右拖动滑块填充拼图',
      accuracy: 5,
      show: true,
      imgs: () => [],
      interval: 50,
    }
  )

  const emits = defineEmits(['success', 'again', 'fail', 'refresh', 'getFail'])

  const { imgs, l, r, w, h, accuracy, interval } = props
  // 图片加载完关闭遮蔽罩
  const loadBlock = ref(true)
  const blockX = ref(0)
  const blockY = ref(0)
  // class
  const containerCls = reactive({
    containerActive: false, // container active class
    containerSuccess: false, // container success class
    containerFail: false, // container fail class
  })
  // sliderMaskWidth sliderLeft
  const sliderBox = reactive({
    iconCls: 'arrow-right',
    width: '0',
    left: '0',
  })
  // 请求到的图片信息以及加密信息
  const remoteImgInfo = reactive({
    secretKey: '',
    token: '',
    backImg: '',
    blockImg: '',
  })
  // 当前图片验证的类型
  const imgType: ImgType = (() => {
    if (props.imgs.length > 0) {
      return 'local'
    } else {
      return 'request'
    }
  })()

  const block = ref<HTMLCanvasElement>()
  const blockCtx = ref<CanvasRenderingContext2D | null>()
  const canvas = ref<HTMLCanvasElement>()
  const canvasCtx = ref<CanvasRenderingContext2D | null>()
  const backImg = ref<HTMLDivElement | null>()
  const blockImg = ref<HTMLDivElement | null>()
  let img: HTMLImageElement
  const { success, start, move, end, verify } = useSlideAction()

  // event
  const reset = () => {
    success.value = false
    containerCls.containerActive = false
    containerCls.containerSuccess = false
    containerCls.containerFail = false
    sliderBox.iconCls = 'arrow-right'
    sliderBox.left = '0'
    sliderBox.width = '0'

    if (imgType === 'local') {
      block.value!.style.left = '0'
      canvasCtx.value?.clearRect(0, 0, w, h)
      blockCtx.value?.clearRect(0, 0, w, h)
      block.value!.width = w
      // generate img
      img.src = getRandomImg(imgs)
    } else {
      blockImg.value!.style.left = '0'
      getRemoteImgInfo()
    }
  }
  const refresh = () => {
    reset()
    emits('refresh')
  }

  function getRemoteImgInfo() {
    let data = {
      captchaType: 'blockPuzzle',
      clientUid: uuid(),
      ts: Date.now(),
    } as const
    reqGet(data).then((response) => {
      const res = response.data
      if (res.repCode == SUCCESS_CODE) {
        const data = res.repData
        remoteImgInfo.backImg = data.originalImageBase64
        remoteImgInfo.blockImg = data.jigsawImageBase64
        remoteImgInfo.token = data.token
        remoteImgInfo.secretKey = data.secretKey

        const backImgEL = backImg.value
        const blockImgEL = blockImg.value
        if (backImgEL && blockImgEL) {
          const BASE64_PREFIX = 'data:image/png;base64,'
          backImgEL.style.cssText = `width:${w}px;height:${h}px;background-image:url(${BASE64_PREFIX + remoteImgInfo.backImg})`
          blockImgEL.style.cssText = `width:${l}px;height:${h}px;background-image:url(${BASE64_PREFIX + remoteImgInfo.blockImg})`
        }
      } else {
        const backImgEL = backImg.value
        const blockImgEL = blockImg.value
        if (backImgEL && blockImgEL) {
          backImgEL.style.cssText = `width:${w}px;height:${h}px;background-image:url(${DEFAULT_BACK_IMG})`
          blockImgEL.style.cssText = `width:${l}px;height:${h}px;background-image:url(${DEFAULT_BLOCK_IMG})`
        }
        emits('getFail', res)
      }
    })
  }

  function uuid() {
    const userSlider = localStorage.getItem('slider')
    if (userSlider) {
      return userSlider
    } else {
      var s: string[] = []
      var hexDigits = '0123456789abcdef'
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((+s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = '-'

      var slider = 'slider' + '-' + s.join('')
      localStorage.setItem('slider', slider)
      return slider
    }
  }

  function moveCb(moveX: number) {
    sliderBox.left = moveX + 'px'
    let blockLeft = moveX
    if (imgType === 'local') {
      block.value!.style.left = blockLeft + 'px'
    } else {
      blockImg.value!.style.left = blockLeft + 'px'
    }
    containerCls.containerActive = true
    sliderBox.width = moveX + 3 + 'px'
  }

  function endCb(timestamp: number) {
    if (imgType === 'local') {
      const { spliced, TuringTest } = verify(block.value!.style.left, blockX.value, accuracy)
      if (spliced) {
        if (accuracy === -1) {
          containerCls.containerSuccess = true
          sliderBox.iconCls = 'success'
          success.value = true
          emits('success', { timestamp })
          setTimeout(() => {
            reset()
          }, 1000)
          return
        }
        if (TuringTest) {
          // success
          containerCls.containerSuccess = true
          sliderBox.iconCls = 'success'
          success.value = true
          emits('success', { timestamp })
          setTimeout(() => {
            reset()
          }, 1000)
        } else {
          containerCls.containerFail = true
          sliderBox.iconCls = 'fail'
          emits('again', {})
          setTimeout(() => {
            reset()
          }, 1000)
        }
      } else {
        containerCls.containerFail = true
        sliderBox.iconCls = 'fail'
        emits('fail', {})
        setTimeout(() => {
          reset()
        }, 1000)
      }
    } else {
      // 这里除以 310 是因为，后端返回的图片宽度是 310，为了迎合我们这边显示我们将图片缩小，这里需要做一个倍率转换
      const ORIGINAL_IMG_WIDTH = 310
      const left = (Number.parseFloat(blockImg.value!.style.left) * ORIGINAL_IMG_WIDTH) / w
      let data = {
        captchaType: 'blockPuzzle',
        pointJson: remoteImgInfo.secretKey
          ? aesEncrypt(JSON.stringify({ x: left, y: 5.0 }), remoteImgInfo.secretKey)
          : JSON.stringify({ x: left, y: 5.0 }),
        token: remoteImgInfo.token,
      } as const
      reqCheck(data).then((response) => {
        const res = response.data
        if (res.repCode == SUCCESS_CODE) {
          containerCls.containerSuccess = true
          sliderBox.iconCls = 'success'
          success.value = true
          const captchaVerification = remoteImgInfo.secretKey
            ? aesEncrypt(remoteImgInfo.token + '---' + JSON.stringify({ x: left, y: 5.0 }), remoteImgInfo.secretKey)
            : remoteImgInfo.token + '---' + JSON.stringify({ x: left, y: 5.0 })
          emits('success', {
            timestamp,
            captchaVerification,
            token: remoteImgInfo.token,
          })
          setTimeout(() => {
            reset()
          }, 1000)
        } else {
          containerCls.containerFail = true
          sliderBox.iconCls = 'fail'
          emits('fail', res)
          setTimeout(() => {
            reset()
          }, 1000)
        }
      })
    }
  }

  const sliderDown = start
  const touchStartEvent = start

  const touchMoveEvent = throttle((e: TouchEvent | MouseEvent) => {
    move(w, e, moveCb)
  }, interval)

  const touchEndEvent = (e: TouchEvent | MouseEvent) => {
    end(e, endCb)
  }

  onMounted(() => {
    const _canvasCtx = canvas.value?.getContext('2d')
    const _blockCtx = block.value?.getContext('2d')
    canvasCtx.value = _canvasCtx
    blockCtx.value = _blockCtx
    if (imgType === 'local') {
      img = createImg(imgs, () => {
        loadBlock.value = false
        const L = l + r * 2 + 3
        // draw block
        blockX.value = getRandomNumberByRange(L + 10, w - (L + 10))
        blockY.value = getRandomNumberByRange(10 + r * 2, h - (L + 10))
        if (_canvasCtx && _blockCtx) {
          draw(_canvasCtx, blockX.value, blockY.value, l, r, 'fill')
          draw(_blockCtx, blockX.value, blockY.value, l, r, 'clip')
          // draw image
          _canvasCtx.drawImage(img, 0, 0, w, h)
          _blockCtx.drawImage(img, 0, 0, w, h)
          // getImage
          const _y = blockY.value - r * 2 - 1
          const imgData = _blockCtx.getImageData(blockX.value, _y, L, L)
          block.value!.width = L
          _blockCtx.putImageData(imgData, 0, _y)
        }
      })
    } else {
      getRemoteImgInfo()
    }

    // bindEvent
    document.addEventListener('mousemove', touchMoveEvent)
    document.addEventListener('mouseup', touchEndEvent)
  })

  // 移除全局事件
  onBeforeUnmount(() => {
    document.removeEventListener('mousemove', touchMoveEvent)
    document.removeEventListener('mouseup', touchEndEvent)
  })

  defineExpose({
    reset,
  })
</script>

<style scoped lang="scss">
  @mixin position($back: false) {
    position: absolute;
    z-index: 1;

    @if ($back ==false) {
      left: 0;
      top: 0;
    } @else {
      left: -1px;
      top: -1px;
    }
  }

  .slide-verify {
    position: relative;

    > canvas {
      display: block;
    }

    .back-img,
    .block-img {
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
    .block-img {
      @include position();
    }

    &-loading {
      @include position();
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.9);
      z-index: 999;
      animation: loading 1.5s infinite;
    }

    &-block {
      @include position();
    }

    &-refresh-icon {
      position: absolute;
      right: 8px;
      top: 8px;
      width: 24px;
      height: 24px;
      cursor: pointer;
      background-image: url('./assets/refresh.svg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }

    &-slider {
      position: relative;
      text-align: center;
      width: 100%;
      height: 48px;
      box-sizing: border-box;
      margin-top: 16px;
      background: #f9f9f9;
      border: 1px solid rgba(235, 235, 235, 1);
      border-radius: 4px;

      &-mask {
        @include position(true);
        height: 48px;
        box-sizing: border-box;
        border: 0 solid #6fe9c4;
        background: #e0f6ef;
        border-radius: 4px 0 0 4px;

        &-item {
          @include position();
          width: 64px;
          height: 48px;
          box-sizing: border-box;
          background: #fff;
          border: 1px solid rgba(235, 235, 235, 1);
          box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.04);
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s linear;
          display: flex;
          align-items: center;
          justify-content: center;

          &-icon {
            width: 40px;
            height: 40px;
            background-image: url('./assets/right.svg');
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
          }
        }
      }

      &-text {
        white-space: nowrap;
        position: absolute;
        left: 55%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #1a2129;
        font-size: 14px;
        font-weight: 400;
        @include autoFontFamily(PingFangSC-Regular);
      }
    }
  }

  .container-active .slide-verify-slider-mask {
    border-width: 1px;
    box-sizing: border-box;

    &-item {
      box-sizing: border-box;
      height: 48px;
      top: -1px;
    }
  }

  .result-display-container {
    margin-top: 16px;

    .result-display {
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 48px;
      box-sizing: border-box;

      &-icon {
        width: 20px;
        height: 20px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        margin-right: 4px;
      }

      &-text {
        @include autoFontFamily(PingFangSC-Regular);
        @include autoFontWeight(400);
        font-size: 14px;
      }
    }
  }

  .result-display-container.container-success {
    .result-display {
      background: rgba(143, 230, 198, 0.2);
      border: 1px solid rgba(143, 230, 198, 1);

      &-icon {
        background-image: url('./assets/success.svg');
      }

      &-text {
        color: #0cc785;
      }
    }
  }

  .result-display-container.container-fail {
    .result-display {
      background: rgba(255, 165, 157, 0.2);
      border: 1px solid rgba(255, 82, 67, 0.4);

      &-icon {
        background-image: url('./assets/fault.svg');
      }

      &-text {
        color: #ff5243;
      }
    }
  }

  @keyframes loading {
    0% {
      opacity: 0.7;
    }

    100% {
      opacity: 9;
    }
  }
</style>
