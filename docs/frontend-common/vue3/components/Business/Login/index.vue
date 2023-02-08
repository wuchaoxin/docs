<!--
 * @description
!-->
<template>
  <div class="container">
    <div class="nav" @click="quit" v-if="loginType !== 'register'">稍后登录</div>
    <div class="form">
      <div class="title">
        <div class="icon"></div>
        <div class="text">{{ titleText }}</div>
      </div>
      <div v-if="loginType === 'password'" class="login-container">
        <Input v-model="data.passwordData.account" @input="check" clearable placeholder="请输入账号"></Input>
        <Input
          v-model="data.passwordData.password"
          @input="check"
          clearable
          type="password"
          handle-text="忘记密码"
          @handleClick="forgotPassword"
          placeholder="请输入密码"
        ></Input>
      </div>
      <div v-else class="register-container">
        <Input v-model="data.verificationCodeData.phone" @input="check" clearable placeholder="请输入手机号"></Input>
        <Input
          v-model="data.verificationCodeData.verificationCode"
          @input="check"
          clearable
          :handle-text="verificationCodeText"
          :handle-style="{
            color: verificationCodeTextColor,
          }"
          @handleClick="getVerificationCode"
          placeholder="请输入验证码"
        ></Input>
      </div>
      <div class="login-btn">
        <Button width-type="all" :disabled="!allowLogin" @click="login">{{ loginType === 'register' ? '注册' : '登录' }}</Button>
      </div>
      <div class="switch-area" @click="switchLoginType" v-if="loginType !== 'register'">{{ switchText }}</div>
    </div>
    <div class="protocol">
      <div :class="['icon', selProtocol ? 'sel' : 'unsel']" @click="selProtocol = !selProtocol"></div>
      阅读并同意
      <span @click="goProtocol('regist')">《用户注册协议》</span>
      <span @click="goProtocol('privacy')">《隐私政策》</span>
    </div>
    <Verify @success="verfySuccess" ref="verify" mode="pop" captchaType="blockPuzzle"></Verify>
  </div>
</template>
<script setup lang="ts">
  import { ref, reactive, computed } from 'vue'
  import { LoginType, VerificationCodeTextColor } from './types/typings'
  import Button from '../../Common/Button/index.vue'
  import Input from '../../Common/Input/index.vue'
  import Verify from './components/Verifition/Verify.vue'
  import { useRouter } from 'vue-router'
  import { getCookie } from '../../../../utils/cookie'
  import { ToastFn, DialogFn } from '../../../components/index'
  import JsEncrypt from 'jsencrypt'
  import md5 from 'js-md5'
  import { REG_PHONE, REG_PASSWORD } from '../../../../utils/validate'
  import { bindUserMobile, loginByMobile, loginByPassword, sendValidateCodeForH5, sendValidateCodeForWeChat } from './apis'
  import { ENCRYPT_SALT, VERIFICATION_CODE_TEXT_COLOR } from './types/const'
  import { useJSEncrypt } from './hooks/encrypt'
  import { addQueryParams, getURLAndParams } from '../../../../utils/url'
  import { getRedirect } from './utils'

  const router = useRouter()
  const loginType = ref<LoginType>('verificationCode')
  let uFrom = ''
  const data = reactive({
    passwordData: { account: '', password: '' },
    verificationCodeData: { phone: '', verificationCode: '' },
  })
  const allowLogin = ref(false)
  const verify = ref(null)
  const verificationCodeText = ref('获取验证码')
  const verificationCodeTextColor = ref<VerificationCodeTextColor>(VERIFICATION_CODE_TEXT_COLOR.ALLOW)
  const { getLoginInitClient } = useJSEncrypt()
  const selProtocol = ref(false)

  const titleText = computed(() => {
    if (loginType.value === 'password') {
      return '账号密码登录'
    } else if (loginType.value === 'register') {
      return '验证码注册'
    } else {
      return '验证码登录'
    }
  })
  const switchText = computed(() => {
    if (loginType.value === 'password') {
      return '手机号码登录'
    } else {
      return '账号密码登录'
    }
  })

  init()

  function init() {
    // URL 参数
    const { params } = getURLAndParams()
    if (params.type) {
      if (params.type === 'password' || params.type === 'verificationCode' || params.type === 'register') {
        loginType.value = params.type
      }
    }
    if (params.uFrom) {
      uFrom = params.uFrom
    }
  }
  // 稍后登录，退出登录
  function quit() {
    const { params } = getURLAndParams()
    if (params.redirect) {
      const redirect = getRedirect(params.redirect)
      const url = addQueryParams(redirect, 'later', '1')
      window.location.href = url
    } else {
      window.location.href = ''
    }
  }
  // 忘记密码
  function forgotPassword() {
    const { params } = getURLAndParams()
    // 去设置密码
    router.push({
      path: '/password',
      query: {
        ...params,
        type: 'reset',
      },
    })
  }
  // 切换登录方式
  function switchLoginType() {
    data.passwordData = {
      account: '',
      password: '',
    }
    data.verificationCodeData = {
      phone: '',
      verificationCode: '',
    }
    if (loginType.value === 'password') {
      loginType.value = 'verificationCode'
    } else {
      loginType.value = 'password'
    }
    allowLogin.value = false
    check()
  }
  // 检查当前表单是否有值
  function check() {
    if (loginType.value === 'password') {
      if (!data.passwordData.account) {
        allowLogin.value = false
        return
      }
      if (!data.passwordData.password) {
        allowLogin.value = false
        return
      }
      allowLogin.value = true
    } else {
      if (!data.verificationCodeData.phone) {
        allowLogin.value = false
        return
      }
      if (!data.verificationCodeData.verificationCode) {
        allowLogin.value = false
        return
      }
      allowLogin.value = true
    }
  }
  // 校验当前的表单值
  function validateVal(type: 'account' | 'phone' | 'password' | 'verificationCode') {
    const regMap = {
      account: {
        reg: REG_PHONE,
        val: data.passwordData.account,
        msg: '请输入正确的手机号码',
      },
      password: {
        reg: /.{1,}/,
        val: data.passwordData.password,
        msg: '请输入密码',
      },
      phone: {
        reg: REG_PHONE,
        val: data.verificationCodeData.phone,
        msg: '请输入正确的手机号码',
      },
      verificationCode: {
        reg: /.{1,}/,
        val: data.verificationCodeData.verificationCode,
        msg: '请输入验证码',
      },
    }
    const info = regMap[type]
    if (!info.reg.test(info.val)) {
      ToastFn(info.msg)
      return false
    } else {
      return true
    }
  }
  // 点击登录
  function login() {
    if (loginType.value === 'password') {
      const accountFlag = validateVal('account')
      if (!accountFlag) {
        return false
      }
      const passwordFlag = validateVal('password')
      if (!passwordFlag) {
        return false
      }
      if (selProtocol.value) {
        openVerify()
      } else {
        DialogFn({
          showCancelButton: true,
          message: '是否同意用户注册协议以及隐私协议',
        }).then(() => {
          openVerify()
          selProtocol.value = true
        })
      }
    } else {
      const phoneFlag = validateVal('phone')
      if (!phoneFlag) {
        return false
      }
      const verificationCodeFlag = validateVal('verificationCode')
      if (!verificationCodeFlag) {
        return false
      }
      if (selProtocol.value) {
        handleLogin()
      } else {
        DialogFn({
          showCancelButton: true,
          message: '是否同意用户注册协议以及隐私协议',
        }).then(() => {
          handleLogin()
          selProtocol.value = true
        })
      }
    }
  }
  // 打开图片验证
  function openVerify() {
    const temp = verify.value as any
    temp.refresh()
    setTimeout(() => {
      temp.show()
    }, 250)
  }
  // 获取验证码
  function getVerificationCode() {
    if (verificationCodeTextColor.value === VERIFICATION_CODE_TEXT_COLOR.DISABLED) {
      return
    }
    const flag = validateVal('phone')
    if (flag) {
      openVerify()
    }
  }
  // 图片验证器验证成功
  function verfySuccess(params) {
    if (loginType.value === 'password') {
      handleLogin(params)
    } else {
      handleSendVerificationCode(params)
    }
  }
  // 处理登录
  function handleLogin(params?: any) {
    if (loginType.value === 'password') {
      const rsa = new JsEncrypt()
      const password = data.passwordData.password
      let encodePassword = password
      // 获取公钥
      getLoginInitClient().then((pub: any) => {
        // 设置公钥
        rsa.setPublicKey(pub)
        encodePassword = rsa.encrypt(md5(ENCRYPT_SALT + password).toUpperCase()) || ''
        // 参数合并
        let newParams = Object.assign(
          {},
          {
            mobile: data.passwordData.account,
            password: encodePassword,
          },
          params
        )

        if (uFrom) newParams = Object.assign(newParams, { uFrom })

        // 账号密码登录
        loginByPassword(newParams).then((res) => {
          // 登录接口反馈
          loginFeedback(res)
        })
        return false
      })
    } else if (loginType.value === 'register') {
      let newParams = {
        mobile: data.verificationCodeData.phone,
        validateCode: data.verificationCodeData.verificationCode,
      }
      bindUserMobile(newParams).then(() => {
        const { params } = getURLAndParams()
        window.location.href = getRedirect(params.redirect)
      })
    } else {
      let newParams = {
        mobile: data.verificationCodeData.phone,
        validateCode: data.verificationCodeData.verificationCode,
      }

      if (uFrom) newParams = Object.assign(newParams, { uFrom: uFrom })

      // 手机验证码登录
      loginByMobile(newParams).then((res) => {
        // 登录接口反馈
        loginFeedback(res)
      })
    }
  }
  // 发送验证码
  function handleSendVerificationCode(params) {
    let newParams = Object.assign(
      {},
      {
        mobile: data.verificationCodeData.phone,
        // 1: 登录/注册  2: 修改密码
        vcodeType: 1,
      },
      params
    )
    if (loginType.value === 'register') {
      sendValidateCodeForWeChat(newParams).then(() => {
        doHandle()
      })
    } else {
      sendValidateCodeForH5(newParams).then((res: any) => {
        doHandle()
      })
    }
    function doHandle() {
      ToastFn({
        message: '验证码已发送，请注意查收',
        align: 'left',
      })
      let times = 60
      verificationCodeTextColor.value = VERIFICATION_CODE_TEXT_COLOR.DISABLED
      verificationCodeText.value = `${times}s后重新获取`
      var timer = setInterval(() => {
        times--
        verificationCodeText.value = `${times}s后重新获取`
        if (times <= 0) {
          verificationCodeText.value = '获取验证码'
          verificationCodeTextColor.value = VERIFICATION_CODE_TEXT_COLOR.ALLOW
          clearInterval(timer)
        }
      }, 1000)
    }
  }
  // 登录接口状态反馈处理
  function loginFeedback(res) {
    const { params } = getURLAndParams()
    // 获取user信息
    let user = (() => {
      const str = window.decodeURIComponent(getCookie('_xxhm_') || '')
      try {
        return JSON.parse(str)
      } catch (error) {
        return {}
      }
    })()
    // 验证码登录,判断是否有密码
    if (loginType.value === 'verificationCode') {
      if (user && !user.hasPassword) {
        // 去设置密码
        router.replace({
          path: '/password',
          query: {
            ...params,
            type: 'set',
          },
        })
        return false
      }
    } else {
      // 检测密码是否符合新规则
      if (!REG_PASSWORD.test(data.passwordData.password)) {
        DialogFn({
          message: '当前密码过于简单，建议修改密码',
          confirmButtonText: '去修改',
          cancelButtonText: '暂不修改',
          showCancelButton: true,
        }).then(() => {
          router.replace({
            path: '/password',
            query: {
              ...params,
              type: 'edit',
            },
          })
        })
        return false
      }
    }
    window.location.href = getRedirect(params.redirect)
  }
  function goProtocol(type: 'regist' | 'privacy') {
    router.push(`/${type}`)
  }
</script>
<style scoped lang="scss">
  .container {
    overflow: hidden;
    min-height: 100vh;
    position: relative;
    @supports (-webkit-touch-callout: none) {
      min-height: -webkit-fill-available;
    }
    .nav {
      padding: 15px 16px;
      display: flex;
      justify-content: flex-end;
      @include autoFontFamily(PingFangSC-Regular);
      @include autoFontWeight(400);
      font-size: 14px;
      color: #898c8f;
      line-height: 14px;
    }

    .form {
      margin-top: 38px;
      padding: 0 32px;
      .title {
        display: flex;
        align-items: center;
        margin-bottom: 48px;

        .icon {
          width: 36px;
          height: 36px;
          background-image: url('./assets/logo.svg');
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          margin-right: 12px;
        }

        .text {
          @include autoFontFamily(PingFangSC-Medium);
          @include autoFontWeight(500);
          font-size: 24px;
          color: #1a2129;
          line-height: 24px;
        }
      }
      .login-container,
      .register-container {
        > div {
          margin-top: 24px;
          &:nth-child(1) {
            margin-top: 0;
          }
        }
      }

      .login-btn {
        margin-top: 48px;
      }
      .switch-area {
        @include autoFontFamily(PingFangSC-Regular);
        @include autoFontWeight(400);
        font-size: 14px;
        color: #137ef0;
        text-align: center;
        line-height: 14px;
        margin-top: 25px;
        margin-bottom: 148px;
      }
    }
    .protocol {
      position: absolute;
      bottom: 20px;
      width: 100%;
      @include autoFontFamily(PingFangSC-Regular);
      @include autoFontWeight(400);
      font-size: 12px;
      color: #898c8f;
      line-height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        width: 14px;
        height: 14px;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        margin-right: 8px;
        &.sel {
          background-image: url('./assets/radiobtn.svg');
        }
        &.unsel {
          background-image: url('./assets/radiobtn_unsel_small.svg');
        }
      }
      > span {
        color: #0078f5;
      }
    }
  }
</style>
