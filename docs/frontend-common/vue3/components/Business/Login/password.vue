<!--
 * @description
!-->
<template>
  <div class="password-container">
    <div class="form">
      <div class="title" v-html="titleHTML"></div>
      <div v-if="passwordType === 'set'" class="set-password-container">
        <Input
          v-model="data.setData.password"
          label="密码"
          @input="check"
          clearable
          placeholder="请输入8-16位(字母+数字)密码"
        ></Input>
        <Input
          v-model="data.setData.passwordRe"
          label="确认密码"
          @input="check"
          clearable
          placeholder="请再次输入密码"
        ></Input>
      </div>
      <div v-else-if="passwordType === 'edit'" class="edit-password-container">
        <Input
          v-model="data.editData.oldPassword"
          label="旧密码"
          @input="check"
          clearable
          placeholder="请输入旧密码"
        ></Input>
        <Input
          v-model="data.editData.password"
          label="新密码"
          @input="check"
          clearable
          placeholder="请输入8-16位(字母+数字)密码"
        ></Input>
        <Input
          v-model="data.editData.passwordRe"
          label="确认密码"
          @input="check"
          clearable
          placeholder="请再次输入密码"
        ></Input>
      </div>
      <div v-else class="reset-password-container">
        <Input
          v-model="data.resetData.phone"
          label="手机号"
          @input="check"
          clearable
          placeholder="请输入手机号"
        ></Input>
        <Input
          v-model="data.resetData.verificationCode"
          label="验证码"
          @input="check"
          :handle-text="verificationCodeText"
          :handle-style="{
            color: verificationCodeTextColor,
          }"
          @handleClick="getVerificationCode"
          clearable
          placeholder="请输入验证码"
        ></Input>
        <Input
          v-model="data.resetData.password"
          label="密码"
          @input="check"
          clearable
          placeholder="请输入8-16位(字母+数字)密码"
        ></Input>
        <Input
          v-model="data.resetData.passwordRe"
          label="确认密码"
          @input="check"
          clearable
          placeholder="请再次输入密码"
        ></Input>
      </div>
      <div class="save-btn">
        <Button width-type="all" :disabled="!allowSave" @click="save"
          >保存</Button
        >
      </div>
    </div>
    <Verify
      @success="verfySuccess"
      ref="verify"
      mode="pop"
      captchaType="blockPuzzle"
    ></Verify>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import Input from '../../Common/Input/index.vue'
import Button from "../../Common/Button/index.vue";
import { PasswordType, VerificationCodeTextColor } from "./types/typings";
import Verify from "./components/Verifition/Verify.vue";
import { ENCRYPT_SALT, VERIFICATION_CODE_TEXT_COLOR } from "./types/const";
import {
  modifyPassword,
  resetPassword,
  sendValidateCodeForH5,
  setPassword,
} from "./apis";
import { ToastFn } from "../../../components/index";
import { REG_PASSWORD, REG_PHONE } from "../../../../utils/validate";
import JsEncrypt from "jsencrypt";
import md5 from "js-md5";
import { useJSEncrypt } from "./hooks/encrypt";
import { getURLAndParams } from "../../../../utils/url";
import { useRouter } from "vue-router";

const passwordType = ref<PasswordType>("set");
const data = reactive({
  setData: {
    password: "",
    passwordRe: "",
  },
  editData: {
    oldPassword: "",
    password: "",
    passwordRe: "",
  },
  resetData: {
    phone: "",
    verificationCode: "",
    password: "",
    passwordRe: "",
  },
});
const allowSave = ref(false);
const verificationCodeText = ref("获取验证码");
const verificationCodeTextColor = ref<VerificationCodeTextColor>(
  VERIFICATION_CODE_TEXT_COLOR.ALLOW
);
const verify = ref(null);
const { getLoginInitClient } = useJSEncrypt();
const router = useRouter();

const titleHTML = computed(() => {
  if (passwordType.value === "set") {
    return "为保证账号安全<br/>请您设置密码";
  } else if (passwordType.value === "edit") {
    return "修改密码";
  } else {
    return "重置密码";
  }
});

init();

function init() {
  const { params } = getURLAndParams();
  const type = (() => {
    const temp = params.type as PasswordType | undefined;
    if (temp === "set" || temp === "edit" || temp === "reset") {
      return temp;
    } else {
      return "reset";
    }
  })();
  passwordType.value = type;
}
function check() {
  if (passwordType.value === "set") {
    if (!data.setData.password) {
      allowSave.value = false;
      return;
    }
    if (!data.setData.passwordRe) {
      allowSave.value = false;
      return;
    }
    allowSave.value = true;
  } else if (passwordType.value === "edit") {
    if (!data.editData.oldPassword) {
      allowSave.value = false;
      return;
    }
    if (!data.editData.password) {
      allowSave.value = false;
      return;
    }
    if (!data.editData.passwordRe) {
      allowSave.value = false;
      return;
    }
    allowSave.value = true;
  } else {
    if (!data.resetData.phone) {
      allowSave.value = false;
      return;
    }
    if (!data.resetData.verificationCode) {
      allowSave.value = false;
      return;
    }
    if (!data.resetData.password) {
      allowSave.value = false;
      return;
    }
    if (!data.resetData.passwordRe) {
      allowSave.value = false;
      return;
    }
    allowSave.value = true;
  }
}
function validateVal(type: PasswordType) {
  if (type === "set") {
    const regMap = {
      password: {
        reg: REG_PASSWORD,
        val: data.setData.password,
        msg: "请输入8-16位(大、小字母+数字)密码",
      },
      passwordRe: {
        reg: /.{1,}/,
        val: data.setData.passwordRe,
        msg: "请输入确认密码",
      },
    };
    return handle(regMap);
  } else if (type === "edit") {
    const regMap = {
      oldPassword: {
        reg: /.{1,}/,
        val: data.editData.oldPassword,
        msg: "请输入旧密码",
      },
      password: {
        reg: REG_PASSWORD,
        val: data.editData.password,
        msg: "请输入8-16位(大、小字母+数字)密码",
      },
      passwordRe: {
        reg: /.{1,}/,
        val: data.editData.passwordRe,
        msg: "请输入确认密码",
      },
    };
    return handle(regMap);
  } else {
    const regMap = {
      phone: {
        reg: REG_PHONE,
        val: data.resetData.phone,
        msg: "请输入正确的手机号码",
      },
      verificationCode: {
        reg: /.{1,}/,
        val: data.resetData.verificationCode,
        msg: "请输入验证码",
      },
      password: {
        reg: REG_PASSWORD,
        val: data.resetData.password,
        msg: "请输入8-16位(大、小字母+数字)密码",
      },
      passwordRe: {
        reg: /.{1,}/,
        val: data.resetData.passwordRe,
        msg: "请输入确认密码",
      },
    };
    return handle(regMap);
  }
  function handle(
    regMap: Record<
      string,
      {
        reg: RegExp;
        val: string;
        msg: string;
      }
    >
  ) {
    for (const item of Object.values(regMap)) {
      if (!item.reg.test(item.val)) {
        ToastFn(item.msg);
        return false;
      }
    }
    const password = regMap.password.val;
    const passwordRe = regMap.passwordRe.val;
    if (password === passwordRe) {
      return true;
    } else {
      ToastFn("两次密码不一致");
      return false;
    }
  }
}
function save() {
  if (passwordType.value === "set") {
    const flag = validateVal("set");
    if (flag) {
      openVerify();
    }
  } else if (passwordType.value === "edit") {
    const flag = validateVal("edit");
    if (flag) {
      openVerify();
    }
  } else {
    const flag = validateVal("reset");
    if (flag) {
      handleSave();
    }
  }
}
// 打开图片验证
function openVerify() {
  const temp = verify.value as any;
  temp.refresh();
  setTimeout(() => {
    temp.show();
  }, 250);
}
// 获取验证码
function getVerificationCode() {
  if (
    verificationCodeTextColor.value === VERIFICATION_CODE_TEXT_COLOR.DISABLED
  ) {
    return;
  }
  if (REG_PHONE.test(data.resetData.phone)) {
    openVerify();
  } else {
    ToastFn("请输入正确的手机号");
  }
}
function verfySuccess(params) {
  if (passwordType.value === "set") {
    handleSave(params);
  } else if (passwordType.value === "edit") {
    handleSave(params);
  } else {
    handleSendVerificationCode(params);
  }
}
function handleSave(params?: any) {
  // 实例化一个JSEncrypt对象
  const rsa = new JsEncrypt();
  // 获取公钥
  getLoginInitClient().then((pub: any) => {
    // 设置公钥
    rsa.setPublicKey(pub);

    // 重置密码
    if (passwordType.value === "reset") {
      let params = {
        password: rsa.encrypt(data.resetData.password),
        mobile: data.resetData.phone,
        validateCode: data.resetData.verificationCode,
      };
      // 重置密码
      resetPassword(params).then((res) => {
        // 提交反馈
        submitFeedback(res);
      });
    } else if (passwordType.value == "edit") {
      let params = {
        oPassword: rsa.encrypt(
          md5(ENCRYPT_SALT + data.editData.oldPassword).toUpperCase()
        ),
        password: rsa.encrypt(data.editData.password),
      };
      // 修改密码
      modifyPassword(params).then((res) => {
        // 提交反馈
        submitFeedback(res);
      });
    } else {
      let params = {
        password: rsa.encrypt(data.setData.password),
      };
      // 新设置密码
      setPassword(params).then((res) => {
        // 提交反馈
        submitFeedback(res);
      });
    }
  });
}
function submitFeedback(res: any) {
  const { params } = getURLAndParams();
  // 重置|修改密码成功，去登录页重新登录
  router.replace({
    path: "/login",
    query: {
      ...params,
      type: "password",
    },
  });
}
// 发送验证码
function handleSendVerificationCode(params) {
  let newParams = Object.assign(
    {},
    {
      mobile: data.resetData.phone,
      // 1: 登录/注册  2: 修改密码
      vcodeType: 2,
    },
    params
  );
  sendValidateCodeForH5(newParams).then((res: any) => {
    ToastFn("验证码已发送，请注意查收");
    let times = 60;
    verificationCodeTextColor.value = VERIFICATION_CODE_TEXT_COLOR.DISABLED;
    verificationCodeText.value = `${times}s后重新获取`;
    var timer = setInterval(() => {
      times--;
      verificationCodeText.value = `${times}s后重新获取`;
      if (times <= 0) {
        verificationCodeText.value = "获取验证码";
        verificationCodeTextColor.value = VERIFICATION_CODE_TEXT_COLOR.ALLOW;
        clearInterval(timer);
      }
    }, 1000);
  });
}
</script>
<style scoped lang="scss">
.password-container {
  .form {
    margin: 68px 16px 25px 16px;
    .title {
      @include autoFontFamily(PingFangSC-Medium);
      @include autoFontWeight(500);
      font-size: 24px;
      color: #1a2129;
      line-height: 32px;
      margin-bottom: 48px;
    }
    .set-password-container,
    .edit-password-container,
    .reset-password-container {
      > div {
        height: 64px;
      }
      margin-bottom: 48px;
    }
  }
}
</style>
