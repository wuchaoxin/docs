/**
 * @description 不借用 JSBridge 能力但是又与 native 相关的函数
 */
import { IOS_DOWN_LINK } from './types/const/native'
import { defaultUADetector } from './UA'
import request from './request'

// #region openOrDownApp
/**
 * @description 跳转 app 链接，如果没有下载 app 那么就下载
 * @param {string} appsUrl
 * @param {boolean} isShowToast
 * @example
 */
// #endregion openOrDownApp
export const openOrDownApp = (appsUrl: string, isShowToast?: boolean) => {
  // 若已安装约苗APP 直接进入
  window.location.href = appsUrl
  checkOpen(isShowToast)
}

/**
 * 检测是否唤端成功
 * @param isShowToast 不能跳转app 是否提示
 */
async function checkOpen(isShowToast?: boolean, showToastFn?: () => void) {
  const visibilityChangeProperty = getVisibilityChangeProperty()
  const timer = setTimeout(async () => {
    const hidden = isPageHidden()
    if (!hidden) {
      // 端口唤起失败，下载apk
      if (isShowToast) {
        if (showToastFn) {
          showToastFn()
        } else {
          alert('请在微信中打开本页面')
        }
      } else {
        if (defaultUADetector.isAndroid()) {
          let res = await getAndroidUrl({ version: '0.0.1' })
          window.location.href = res.data.androidApkUrl //android下载地址
        } else {
          window.location.href = IOS_DOWN_LINK
        }
      }
    }
  }, 2000)
  if (visibilityChangeProperty) {
    document.addEventListener(visibilityChangeProperty, (res) => {
      clearTimeout(timer)
    })
    return
  }
  window.addEventListener('pagehide', () => {
    clearTimeout(timer)
  })
}

/**
 * 获取页面隐藏属性的前缀
 * 如果页面支持 hidden 属性，返回 '' 就行
 * 如果不支持，各个浏览器对 hidden 属性，有自己的实现，不同浏览器不同前缀，遍历看支持哪个
 */
function getPagePropertyPrefix() {
  const prefixes = ['webkit', 'moz', 'ms', 'o']
  let correctPrefix
  if ('hidden' in document) return ''
  prefixes.forEach((prefix) => {
    if (`${prefix}Hidden` in document) {
      correctPrefix = prefix
    }
  })
  return correctPrefix || false
}

/**
 * 判断页面是否隐藏（进入后台）
 */
function isPageHidden() {
  const prefix = getPagePropertyPrefix()
  if (prefix === false) return false
  const hiddenProperty = prefix ? `${prefix}Hidden` : 'hidden'
  return document[hiddenProperty]
}

/**
 * 获取判断页面 显示|隐藏 状态改变的属性
 */
function getVisibilityChangeProperty() {
  const prefix = getPagePropertyPrefix()
  if (prefix === false) return false
  return `${prefix}visibilitychange`
}

export function getAndroidUrl(params: any) {
  return request({
    url: '/passport-app/app/version/latest.do',
    method: 'get',
    headers: {
      platform: 'ANDROID',
    },
    params,
  })
}
