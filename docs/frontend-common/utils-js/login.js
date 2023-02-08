/**
 * @description 该文件旨在统一登录相关函数
 */
import { getCookie, removeCookie, setCookie } from './cookie';
import { getEnvFlag } from './environment';
import { autoBridge } from './JSBridge';
import { LOGIN_INVALID } from './types/const/request';
import { USER_INFO_KEY, USER_TOKEN_KEY } from './types/const/storage';
import { defaultUADetector } from './UA';
// #region getLoginInfo
/**
 * @description 获取用户的登录信息
 * @returns {Object}
 * @example
 */
// #endregion getLoginInfo
export function getLoginInfo() {
    const info = window.decodeURIComponent(getCookie(USER_INFO_KEY) || '');
    if (info) {
        try {
            return JSON.parse(info);
        }
        catch (error) {
            console.error('getLoginInfo parse error', error);
            return {};
        }
    }
    else {
        return {};
    }
}
// #region isLogin
/**
 * @description 判断用户是否登录
 * @returns {boolean}
 * @example
 */
// #endregion isLogin
export function isLogin() {
    const userToken = getCookie(USER_TOKEN_KEY);
    const userInfo = getLoginInfo();
    return !!(userToken && Object.keys(userInfo).length > 0);
}
// #region handleWeChatLogion
/**
 * @description 进行微信登录
 * @param {LoginParamsForWechat} params
 * @returns {void}
 * @example
 */
// #endregion handleWeChatLogion
export function handleWeChatLogion(params) {
    if (defaultUADetector.isWeChat()) {
        const LOGIN_URL = `https://wx${getEnvFlag()}.scmttec.com/passport/wx/login.do`;
        let url = LOGIN_URL + `?target=${params.target}`;
        if (params.params) {
            url += '?';
            for (const [key, val] of Object.entries(params.params)) {
                url += `${key}=${val}&`;
            }
            url = url.slice(0, url.length - 1);
        }
        params?.attachFn?.();
        if (params.wait) {
            setTimeout(() => {
                window.location.href = url;
            }, params.wait);
        }
        else {
            window.location.href = url;
        }
    }
}
// #region handleAppLogin
/**
 * @description 进行 APP 登录
 * @param {LoginParamsForApp} params
 * @returns {void}
 * @example
 */
// #endregion handleAppLogin
export function handleAppLogin(params) {
    defaultUADetector.isApp().then((isApp) => {
        if (isApp) {
            autoBridge.doAppUserLoginAction().then((data) => {
                if (data.isLogin) {
                    const cookiesGroup = data.cookie.split(';');
                    for (const item of cookiesGroup) {
                        const val = item.split('=');
                        setCookie(val[0], val[1]);
                    }
                    params?.callback?.(data);
                    window.location.reload();
                }
            });
        }
    });
}
// #region handlelLoginExpired
/**
 * @description 用于检测登录是否过期（一般放于请求响应拦截器中）
 * @param {Dynamic} config
 * @param {Function} callback
 * @returns {void}
 * @example
 */
// #endregion handlelLoginExpired
export function handlelLoginExpired(config, callback) {
    const errorCode = config.code;
    if (errorCode === LOGIN_INVALID) {
        removeCookie(USER_INFO_KEY);
        removeCookie(USER_TOKEN_KEY);
        defaultUADetector.isApp().then((isApp) => {
            if (isApp) {
                autoBridge.notifyLoginExpiration();
            }
        });
        callback?.();
        window.location.reload();
    }
}
// #region isNonRegisteredUser
/**
 * @description 是否为非注册用户（未绑定手机号）
 * @returns {boolean}
 * @example
 */
// #endregion isNonRegisteredUser
export function isNonRegisteredUser() {
    const userInfo = getLoginInfo();
    if (!userInfo.mobile && defaultUADetector.isWeChat()) {
        return true;
    }
    else {
        return false;
    }
}
