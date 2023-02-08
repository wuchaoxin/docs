/**
 * @description 简单的利用 js-cookie 操作
 */

import Cookies, { CookieAttributes } from 'js-cookie'

// #region getCookie
export function getCookie(key: string): string {
  return Cookies.get(key) || ''
}
// #endregion getCookie

// #region setCookie
export function setCookie(key: string, value: string, config?: CookieAttributes): void {
  const defaultConfig = {}
  if (config) {
    Cookies.set(key, value, Object.assign({}, defaultConfig, config))
  } else {
    Cookies.set(key, value, defaultConfig)
  }
}
// #endregion setCookie

// #region removeCookie
export function removeCookie(key: string, options?: CookieAttributes): void {
  Cookies.remove(key, options)
}
// #endregion removeCookie
