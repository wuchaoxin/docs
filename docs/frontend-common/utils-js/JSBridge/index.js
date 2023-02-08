/**
 * @description
 */
import { initBridge } from './bridge';
import { setCookie } from '../cookie';
import { defaultUADetector } from '../UA/index';
import { EVENT_TYPE } from '../types/const/JSBridge';
export const bridge = {
    // 平台
    platform: undefined,
    // app 是否准备好 bridge
    isReady: false,
    _event: [],
    ready: (fn, options) => {
        if (options?.forceWaitApp) {
            if (defaultUADetector.isIOS()) {
                bridge.getAppBaseInfo();
            }
            if (bridge.isReady) {
                fn();
            }
            else {
                bridge._event.push({
                    fn,
                    type: EVENT_TYPE.FORCE_WAIT_APP
                });
            }
        }
        else {
            if (bridge.platform === undefined) {
                bridge._event.push({
                    fn,
                    type: EVENT_TYPE.NORMAL
                });
                bridge.getAppBaseInfo();
            }
            else {
                fn();
            }
        }
    },
    forceReady(fn) {
        bridge.ready(fn, { forceWaitApp: true });
    },
    // 获取用户信息
    getAppUserInfo: () => {
        return new Promise((resolevd) => {
            window.WebViewJavascriptBridge.callHandler('getAppUserInfo', null, (res) => {
                const result = handleResult(res);
                resolevd(result);
            });
        });
    },
    // 唤起 APP 原生登录
    doAppUserLoginAction: () => {
        return new Promise((resolevd, rejected) => {
            window.WebViewJavascriptBridge.callHandler('doAppUserLoginAction', null, (res) => {
                if (res) {
                    const result = handleResult(res);
                    const cookiesGroup = result.cookie.split(';');
                    for (const item of cookiesGroup) {
                        const val = item.split('=');
                        setCookie(val[0], window.decodeURIComponent(val[1]));
                    }
                    resolevd(result);
                }
                else {
                    rejected();
                }
            });
        });
    },
    handleAppUserLoginAction: (callback) => {
        window.WebViewJavascriptBridge.registerHandler('handleAppUserLoginAction', (loginInfo) => {
            const result = handleResult(loginInfo);
            callback(result);
        });
    },
    // 获取 APP 设备信息
    getAppBaseInfo: () => {
        return new Promise((resolevd, rejected) => {
            if (bridge.platform === undefined) {
                const waitingTime = 200;
                setTimeout(() => {
                    rejected('Bridge getAppBaseInfo overtime');
                    if (!bridge.platform) {
                        bridge.platform = null;
                    }
                    _clearEvent();
                }, waitingTime);
            }
            window.WebViewJavascriptBridge.callHandler('getAppBaseInfo', null, (res) => {
                if (res) {
                    const result = handleResult(res);
                    bridge.platform = result.OS;
                    resolevd(result);
                    if (defaultUADetector.isIOS()) {
                        bridge.isReady = true;
                        _clearEvent(EVENT_TYPE.FORCE_WAIT_APP);
                    }
                }
                else {
                    rejected();
                }
                _clearEvent();
            });
        });
    },
    setShare: (parmas) => {
        return new Promise((resolevd, rejected) => {
            window.WebViewJavascriptBridge.callHandler('setShare', parmas, (res) => {
                if (res) {
                    const result = handleResult(res);
                    resolevd(result);
                }
                else {
                    rejected();
                }
            });
        });
    },
    cancelShare: () => {
        window.WebViewJavascriptBridge.callHandler('cancelShare');
    },
    share: (params) => {
        return new Promise((resolevd, rejected) => {
            window.WebViewJavascriptBridge.callHandler('share', params, (res) => {
                if (res) {
                    const result = handleResult(res);
                    resolevd(result);
                }
                else {
                    rejected();
                }
            });
        });
    },
    notifyLoginExpiration: () => {
        return new Promise((resolevd) => {
            window.WebViewJavascriptBridge.callHandler('notifyLoginExpiration', null, () => {
                resolevd();
            });
        });
    },
    close: () => {
        window.WebViewJavascriptBridge.callHandler('close');
    },
    pageShow: (callback) => {
        window.WebViewJavascriptBridge.registerHandler('pageShow', (data) => {
            callback(data);
        });
    },
};
export function _clearEvent(type = EVENT_TYPE.NORMAL) {
    if (bridge._event.length) {
        for (let i = 0; i < bridge._event.length; i++) {
            if (bridge._event[i].type === type) {
                bridge._event[i].fn();
                bridge._event.splice(i, 1);
                i--;
            }
        }
    }
}
export const autoBridge = new Proxy(bridge, {
    get(target, prop) {
        if (defaultUADetector.isWeChat()) {
            bridge.platform = null;
            const whiteListForWeChat = ['platform', '_event', 'ready'];
            if (whiteListForWeChat.includes(prop)) {
                return target[prop];
            }
            else {
                return () => Promise.reject('You are not using in the app environment');
            }
        }
        const whiteList = ['getAppBaseInfo', 'platform', '_event', 'ready', 'forceReady', 'isReady'];
        initBridge();
        if (!whiteList.includes(prop)) {
            if (target.platform === null) {
                return () => Promise.reject('You are not using in the app environment');
            }
            else if (target.platform) {
                return target[prop];
            }
            else {
                return (...params) => target.getAppBaseInfo().then(() => {
                    return target[prop](...params);
                });
            }
        }
        else {
            return target[prop];
        }
    },
    set() {
        throw new Error('Do not modify the bridge');
    },
});
function handleResult(res) {
    if (res === '') {
        return res;
    }
    try {
        return JSON.parse(res);
    }
    catch (error) {
        console.log('JSON.parse', res);
        return {};
    }
}
