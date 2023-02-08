/**
 * @description 简单的利用 js-cookie 操作
 */
import Cookies from 'js-cookie';
// #region getCookie
export function getCookie(key) {
    return Cookies.get(key) || '';
}
// #endregion getCookie
// #region setCookie
export function setCookie(key, value, config) {
    const defaultConfig = {};
    if (config) {
        Cookies.set(key, value, Object.assign({}, defaultConfig, config));
    }
    else {
        Cookies.set(key, value, defaultConfig);
    }
}
// #endregion setCookie
// #region removeCookie
export function removeCookie(key, options) {
    Cookies.remove(key, options);
}
// #endregion removeCookie
