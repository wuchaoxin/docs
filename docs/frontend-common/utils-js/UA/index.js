/**
 * @description 该文件旨在根据 UA 判断系统以及平台等相关信息
 */
import { getURLAndParams } from '../url';
import { getDetail } from './detail';
import { autoBridge } from '../JSBridge';
import { APP_ANDROID_UA, APP_IOS_UA } from '../types/const/UA';
const detail = getDetail();
class UADetector {
    //   constructor() {}
    // #region UA
    isApp() {
        return new Promise((resolved) => {
            const { params } = getURLAndParams();
            if (params.isApp || this.isAppSync()) {
                resolved(true);
            }
            else {
                if (autoBridge.platform) {
                    resolved(true);
                }
                else if (autoBridge.platform === null) {
                    resolved(false);
                }
                else {
                    autoBridge
                        .getAppBaseInfo()
                        .then(() => {
                        resolved(true);
                    })
                        .catch(() => {
                        resolved(false);
                    });
                }
            }
        });
    }
    // 为了兼容老版本暂时不可单独使用
    isAppSync() {
        const ua = navigator.userAgent;
        if (ua.includes(APP_IOS_UA) || ua.includes(APP_ANDROID_UA)) {
            return true;
        }
        else {
            return false;
        }
    }
    isWeChat() {
        return !!detail.shell && detail.shell === 'weChat';
    }
    isWeiXin() {
        return this.isWeChat();
    }
    isChrome() {
        return detail.supporter === 'chrome';
    }
    isSafari() {
        return detail.supporter === 'safari';
    }
    isMobile() {
        return detail.platform === 'mobile';
    }
    isDesktop() {
        return detail.platform === 'desktop';
    }
    isIOS() {
        return detail.system === 'ios';
    }
    isMac() {
        return detail.system === 'macos';
    }
    isAndroid() {
        return detail.system === 'android';
    }
    isIexplore() {
        return detail.supporter === 'iexplore';
    }
    isIE() {
        return this.isIexplore();
    }
    getIexploreVersion() {
        if (this.isIexplore()) {
            return detail.supporterVs;
        }
        else {
            return false;
        }
    }
    getIEVersion() {
        return this.getIexploreVersion();
    }
    getDetail() {
        return detail;
    }
}
export default UADetector;
export const defaultUADetector = new UADetector();
