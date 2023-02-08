import { EVENT_TYPE } from "../const/JSBridge"

export interface MessageForIOS {
  // 事件名称
  handlerName: string
  // 参数
  data?: null | AnyObject
  // 回调函数 id （native 主动调用 H5）
  callbackId?: string
  // 响应函数 id（H5 主动调用函数）
  responseId?: string
  // 返回的值
  responseData?: unknown
}

export interface MessageForAndroid {
  // 事件名称
  handlerName?: string
  // 参数
  data?: null | AnyObject
  // 回调函数 id （native 主动调用 H5）
  callbackId?: string
  // 响应函数 id（H5 主动调用函数）
  responseId?: string
  // 返回的值
  responseData?: unknown
}

export type ResponseCallback = (payload: Dynamic) => void

export type EventType = typeof EVENT_TYPE[keyof typeof EVENT_TYPE]
export interface Bridge {
  platform: Platform
  _event: Array<{fn: Function, type: EventType}>
  isReady: boolean
  ready: (fn: Function, options?: ReadyOptions) => void
  forceReady: (fn: Function) => void,
  getAppUserInfo: () => Promise<GetAppUserInfo | ''>
  doAppUserLoginAction: () => Promise<DoAppUserLoginAction>
  // #region handleAppUserLoginAction
  handleAppUserLoginAction: (callback: (loginInfo: DoAppUserLoginAction) => void) => void
  // #endregion handleAppUserLoginAction
  getAppBaseInfo: () => Promise<GetAppBaseInfo>
  setShare: (parmas: SetShareParams) => Promise<SetShare>
  cancelShare: () => void
  share: (params?: ShareParams) => Promise<Share>
  notifyLoginExpiration: () => Promise<void>
  close: () => void,
  // #region pageShow
  pageShow: (callback: (data: Dynamic) => void) => void
  // #endregion pageShow
}
export interface ReadyOptions {
    forceWaitApp?: boolean
}
// #region Platform
export type Platform = undefined | null | 'iOS' | 'android' | 'harmony'
// #endregion Platform

// #region GetAppUserInfo
export interface GetAppUserInfo {
  // 用户id
  id: number
  // 是不是会员
  memberStatus: 0 | 1
  // 手机号
  mobile: string
  // 名字
  name: string
  // 昵称
  nickName: string
}
// #endregion GetAppUserInfo

// #region DoAppUserLoginAction
export interface DoAppUserLoginAction {
  // 是否进行了登录
  isLogin: 0 | 1
  // cookie 信息
  cookie: string
}
// #endregion DoAppUserLoginAction

// #region GetAppBaseInfo
export interface GetAppBaseInfo {
  // 设备 ID
  UDID: string
  // 对应苹果、安卓、鸿蒙
  OS: Platform
}
// #endregion GetAppBaseInfo

// #region SetShareParams
export type SetShareParams = {
  // 分享的标题
  title: string
  // 分享的描述
  desc: string
  // 打开的链接
  link: string
  // 分享的图片
  imgUrl: string
  // 分享的平台（如果不填写，则固定显示微信好友、朋友圈、微博，卡片需看 card 选项）
  // PS：该属性 APP 暂未全部支持
  platform?: Array<SharePlatform>
  // 埋点信息字段
  buriedPointInfo?: BuriedPointInfo
  // 分享选项是否具有生成卡片
  card?: Card
}
// #endregion SetShareParams

// #region SharePlatform
// weChatFriends：微信朋友 weChatMoments：微信朋友圈 microBlog：微博
export type SharePlatform = 'weChatFriends' | 'weChatMoments' | 'microBlog'
// #endregion SharePlatform

// #region Card
export interface Card {
  // 卡片的标题
  title?: string
  // 卡片的描述
  desc?: Array<string>
  // 卡片中的图片
  imgUrl: string
  // 卡片中的二维码
  QRCode?: string
  // 卡片提示文本
  hint?: string
  // 背景颜色
  backgroundColor?: string
}
// #endregion Card

// #region SetShare
export interface SetShare {
  // 是否进行了分享
  isShare: 0 | 1
  // 分享的方式
  type: SetShareType
}
// #endregion SetShare

// #region SetShareType
// weChatFriends：微信好友 weChatMoments：微信 microBlog：微博 card：卡片
export type SetShareType = 'weChatFriends' | 'weChatMoments' | 'microBlog' | 'card'
// #endregion SetShareType

// #region ShareParams
export type ShareParams = {
  // 分享的方式，不传则为唤起标准分享框
  type?: ShareParamsType
  // 埋点信息字段
  buriedPointInfo?: BuriedPointInfo
  // 疫苗结果所需配置数据（注：这里是数组）
  vaccineResults?: VaccineResults[]
}
// #endregion ShareParams

// #region ShareParamsType
// normal:普通分享 vaccineResults：疫苗结果
export type ShareParamsType = 'normal' | 'vaccineResults'
// #endregion ShareParamsType

// #region BuriedPointInfo
export interface BuriedPointInfo {
  title: string
}
// #endregion BuriedPointInfo

// #region VaccineResults
export interface VaccineResults {
  // 疫苗名称
  name: string
  // icon链接（注：这里是 URL 链接或者 base64 链接）
  icon: string
  // 描述
  info: string[]
}
// #endregion VaccineResults

// #region Share
export interface Share {
  // 是否进行了分享
  isShare: 0 | 1
  // 分享的方式
  type: ShareType
}
// #endregion Share

// #region ShareType
// weChatFriends: 微信好友 weChatMoments：微信朋友圈 card：生成卡片 vaccineResults：疫苗结果
export type ShareType = 'weChatFriends' | 'weChatMoments' | 'card' | 'vaccineResults'
// #endregion ShareType
