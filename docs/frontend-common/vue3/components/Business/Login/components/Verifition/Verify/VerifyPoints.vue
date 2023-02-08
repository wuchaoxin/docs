<template>
  <div class="verify-points" ref="verifyPoints" @selectstart="selectstart">
    <div class="verify-img-out">
      <div
        class="verify-img-panel"
        :style="{
          width: setSize.imgWidth,
          height: setSize.imgHeight,
          'background-size': setSize.imgWidth + ' ' + setSize.imgHeight,
          'margin-bottom': vSpace + 'px',
        }"
      >
        <div class="verify-refresh icon icon-refresh" @click="refresh" v-show="showRefresh"></div>
        <img
          :src="pointBackImgBase ? 'data:image/png;base64,' + pointBackImgBase : defaultImg"
          ref="canvas"
          @click="bindingClick ? canvasClick($event) : undefined"
        />
        <div
          v-for="(tempPoint, index) in tempPoints"
          :key="index"
          class="point-area"
          :style="{
            top: tempPoint.y - 10 + 'px',
            left: tempPoint.x - 10 + 'px',
            width: '20px',
            height: '20px',
            'line-height': '20px',
          }"
        >
          {{ index + 1 }}
        </div>
      </div>
    </div>
    <div
      class="verify-bar-area"
      :style="{
        width: setSize.imgWidth,
        color: barAreaColor,
        'border-color': barAreaBorderColor,
        'line-height': barSize.height,
      }"
    >
      <span class="verify-msg">{{ text }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { resetSize, _code_chars, _code_color1, _code_color2 } from '../utils/util'
  import { aesEncrypt } from '../utils/ase'
  import { reqGet, reqCheck } from '../apis/index'
  import { Size, CaptchaType, Mode, Point, VerifyType } from '../types/typings'
  import { ref, nextTick, watch } from 'vue'

  const props = withDefaults(
    defineProps<{
      mode?: Mode
      captchaType?: CaptchaType
      type?: VerifyType
      vSpace?: number
      imgSize?: Size
      barSize?: Size
      defaultImg?: string
    }>(),
    {
      mode: 'fixed',
      vSpace: 5,
      imgSize: () => ({
        width: '310px',
        height: '155px',
      }),
      barSize: () => ({
        width: '310px',
        height: '40px',
      }),
      defaultImg: '',
    }
  )
  const emits = defineEmits(['close', 'success', 'error'])

  // 后端返回的ase加密秘钥
  const secretKey = ref('')
  // 默认需要点击的字数
  const checkNum = ref(3)
  // 选中的坐标信息
  const fontPos = ref([])
  // 用户点击的坐标
  const checkPosArr = ref<Point[]>([])
  // 点击的记数
  const num = ref(1)
  // 后端获取到的背景图片
  const pointBackImgBase = ref('')
  // 后端返回的点击字体顺序
  const poinTextList = ref([])
  // 后端返回的token值
  const backToken = ref('')
  const setSize = ref({
    imgHeight: '',
    imgWidth: '',
    barHeight: '',
    barWidth: '',
  })
  const tempPoints = ref<Point[]>([])
  const text = ref('')
  const barAreaColor = ref<string | undefined>(undefined)
  const barAreaBorderColor = ref<string | undefined>(undefined)
  const showRefresh = ref(true)
  const bindingClick = ref(true)
  const verifyPoints = ref<HTMLDivElement | null>(null)

  function init() {
    fontPos.value.splice(0, fontPos.value.length)
    checkPosArr.value.splice(0, checkPosArr.value.length)
    num.value = 1
    getPictrue()
    nextTick(() => {
      setSize.value = resetSize(verifyPoints.value, props.imgSize, props.barSize)
    })
  }
  function canvasClick(e: MouseEvent) {
    checkPosArr.value.push(getMousePos(e))
    if (num.value == checkNum.value) {
      num.value = createPoint(getMousePos(e))
      // 按比例转换坐标值
      checkPosArr.value = pointTransfrom(checkPosArr.value, setSize.value)
      // 等创建坐标执行完
      setTimeout(() => {
        // 发送后端请求
        const captchaVerification = secretKey.value
          ? aesEncrypt(backToken.value + '---' + JSON.stringify(checkPosArr.value), secretKey.value)
          : backToken.value + '---' + JSON.stringify(checkPosArr.value)
        let data = {
          captchaType: props.captchaType,
          pointJson: secretKey.value ? aesEncrypt(JSON.stringify(checkPosArr.value), secretKey.value) : JSON.stringify(checkPosArr.value),
          token: backToken.value,
        }
        reqCheck(data).then((response) => {
          const res = response.data
          if (res.repCode == '0000') {
            barAreaColor.value = '#4cae4c'
            barAreaBorderColor.value = '#5cb85c'
            text.value = '验证成功'
            bindingClick.value = false
            if (props.mode == 'pop') {
              setTimeout(() => {
                emits('close')
                refresh()
              }, 1500)
            }
            emits('success', { captchaVerification })
          } else {
            emits('error')
            barAreaColor.value = '#d9534f'
            barAreaBorderColor.value = '#d9534f'
            text.value = '验证失败'
            setTimeout(() => {
              refresh()
            }, 700)
          }
        })
      }, 400)
    }
    if (num.value < checkNum.value) {
      num.value = createPoint(getMousePos(e))
    }
  }
  // 获取坐标
  function getMousePos(e: MouseEvent) {
    var x = e.offsetX
    var y = e.offsetY
    return { x, y }
  }
  // 创建坐标点
  function createPoint(pos) {
    tempPoints.value.push(Object.assign({}, pos))
    return ++num.value
  }
  function refresh() {
    tempPoints.value.splice(0, tempPoints.value.length)
    barAreaColor.value = '#000'
    barAreaBorderColor.value = '#ddd'
    bindingClick.value = true
    fontPos.value.splice(0, fontPos.value.length)
    checkPosArr.value.splice(0, checkPosArr.value.length)
    num.value = 1
    getPictrue()
    text.value = '验证失败'
    showRefresh.value = true
  }
  // 请求背景图片和验证图片
  function getPictrue() {
    let data = {
      captchaType: props.captchaType,
      clientUid: localStorage.getItem('point'),
      ts: Date.now(), // 现在的时间戳
    }
    reqGet(data).then((res) => {
      if (res.repCode == '0000') {
        pointBackImgBase.value = res.repData.originalImageBase64
        backToken.value = res.repData.token
        secretKey.value = res.repData.secretKey
        poinTextList.value = res.repData.wordList
        text.value = '请依次点击【' + poinTextList.value.join(',') + '】'
      } else {
        text.value = res.repMsg
      }
      // 判断接口请求次数是否失效
      if (res.repCode == '6201') {
        pointBackImgBase.value = ''
      }
    })
  }
  // 坐标转换函数
  function pointTransfrom(pointArr, imgSize) {
    const newPointArr = pointArr.map((p) => {
      let x = Math.round((310 * p.x) / parseInt(imgSize.imgWidth))
      let y = Math.round((155 * p.y) / parseInt(imgSize.imgHeight))
      return { x, y }
    })
    return newPointArr
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
    &.icon-refresh {
      background-image: url('../assets/refresh.png');
    }
  }
  .verify-points {
    position: relative;
    .verify-img-out {
      .verify-img-panel {
        margin: 0;
        box-sizing: content-box;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        border-radius: 2px;
        position: relative;
        width: 310px;
        height: 155px;
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
          z-index: 3;
        }
        > img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }
        .point-area {
          background-color: #1abd6c;
          color: #fff;
          z-index: 9999;
          text-align: center;
          border-radius: 50%;
          position: absolute;
        }
        .icon-refresh {
          font-size: 10px;
          color: #fff;
        }
        .verify-bar-area {
          .verify-msg {
            z-index: 3;
          }
        }
      }
    }
  }
</style>
