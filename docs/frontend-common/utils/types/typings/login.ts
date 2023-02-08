import { DoAppUserLoginAction } from './JSBridge'

// #region LoginParamsForWechat
export interface LoginParamsForWechat {
  // 回调页面
  target: string
  // 携带的参数
  params?: AnyObject
  // 延时跳转
  wait?: number
  // 附加的函数
  attachFn?: () => void
}
// #endregion LoginParamsForWechat

// #region LoginParamsForApp
export interface LoginParamsForApp {
  callback?: (data: DoAppUserLoginAction) => void
}
// #endregion LoginParamsForApp
