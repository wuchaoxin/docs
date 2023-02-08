import request from '../../../../../utils/request'

// 获取验证码（H5 渠道）
export function sendValidateCodeForH5(params: any) {
  return request({
    url: '/message/validate/h5/sendVcode.do',
    method: 'POST',
    data: params,
  })
}

// 获取验证码（微信渠道）
export function sendValidateCodeForWeChat(params: any) {
  return request({
    url: '/message/validate/sendValidateCode.do',
    method: 'get',
    params,
  })
}

// 获取加密签名等要素
export function loginInitClient() {
  return request({
    url: '/passport/v1/h5/login/initClient.do',
    method: 'GET',
  })
}

// 通过密码登录
export function loginByPassword(params: any) {
  return request({
    url: '/passport/v1/h5/login/loginByPassword.do',
    method: 'POST',
    data: params,
  })
}

// 通过验证码登录
export function loginByMobile(params: any) {
  return request({
    url: '/passport/v1/h5/login/loginByMobile.do',
    method: 'POST',
    data: params,
  })
}

// 重置密码
export function resetPassword(params: any) {
  return request({
    url: '/passport/v1/h5/login/resetPassword.do',
    method: 'POST',
    data: params,
  })
}

// 修改密码
export function modifyPassword(params: any) {
  return request({
    url: '/passport/v1/h5/login/modifyPassword.do',
    method: 'POST',
    data: params,
  })
}

// 设置密码
export function setPassword(params: any) {
  return request({
    url: '/passport/v1/h5/login/setPassword.do',
    method: 'POST',
    data: params,
  })
}

// 用户绑定手机号码
export function bindUserMobile(params: any) {
  return request({
    url: '/passport/user/bindUserMobile.do',
    method: 'get',
    params,
  })
}
