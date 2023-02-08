/**
 * @description 该文件旨在根据 UA 判断系统以及平台等相关信息
 */
import { getURLAndParams } from '../url'
import { getDetail } from './detail'
import { autoBridge } from '../JSBridge'
import { APP_ANDROID_UA, APP_IOS_UA } from '../types/const/UA'

const detail = getDetail()

class UADetector {
  //   constructor() {}
  // #region UA
  isApp(): Promise<boolean> {
    return new Promise((resolved) => {
      const { params } = getURLAndParams()
      if (params.isApp || this.isAppSync()) {
        resolved(true)
      } else {
        if (autoBridge.platform) {
          resolved(true)
        } else if (autoBridge.platform === null) {
          resolved(false)
        } else {
          autoBridge
            .getAppBaseInfo()
            .then(() => {
              resolved(true)
            })
            .catch(() => {
              resolved(false)
            })
        }
      }
    })
  }
  // 为了兼容老版本暂时不可单独使用
  isAppSync(): boolean {
    const ua = navigator.userAgent
    if(ua.includes(APP_IOS_UA) || ua.includes(APP_ANDROID_UA)){
        return true
    } else {
        return false
    }
  }
  isWeChat(): boolean {
    return !!detail.shell && detail.shell === 'weChat'
  }
  isWeiXin(): boolean {
    return this.isWeChat()
  }
  isChrome(): boolean {
    return detail.supporter === 'chrome'
  }
  isSafari(): boolean {
    return detail.supporter === 'safari'
  }
  isMobile(): boolean {
    return detail.platform === 'mobile'
  }
  isDesktop(): boolean {
    return detail.platform === 'desktop'
  }
  isIOS(): boolean {
    return detail.system === 'ios'
  }
  isMac(): boolean {
    return detail.system === 'macos'
  }
  isAndroid(): boolean {
    return detail.system === 'android'
  }
  isIexplore(): boolean {
    return detail.supporter === 'iexplore'
  }
  isIE(): boolean {
    return this.isIexplore()
  }
  getIexploreVersion(): boolean | string {
    if (this.isIexplore()) {
      return detail.supporterVs
    } else {
      return false
    }
  }
  getIEVersion(): boolean | string {
    return this.getIexploreVersion()
  }
  getDetail() {
    return detail
  }
  // #endregion UA
}

export default UADetector

export const defaultUADetector = new UADetector()
