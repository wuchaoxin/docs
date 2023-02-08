/**
 * @description 外部脚本
 */
// #region mockInit
/**
 * @description mockInit 开启 mock
 * @returns {void}
 */
// #endregion mockInit
export function mockInit() {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
        "https://cdn.bootcdn.net/ajax/libs/Mock.js/1.0.1-beta3/mock-min.js";
    document.getElementsByTagName("head")[0].appendChild(script);
    return new Promise((resolevd, rejected) => {
        script.onload = function () {
            resolevd();
        };
        script.onerror = function () {
            rejected();
        };
    });
}
// #region debugInit
/**
 * @description debugInit 开启调试器
 * @returns {void}
 */
// #endregion debugInit
export function debugInit() {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdn.jsdelivr.net/npm/eruda";
    document.getElementsByTagName("head")[0].appendChild(script);
    return new Promise((resolevd, rejected) => {
        script.onload = function () {
            window.eruda.init();
            resolevd();
        };
        script.onerror = function () {
            rejected();
        };
    });
}
// #region weChatJSSDKInit
/**
 * @description 注入微信 JS-SDK
 * @returns {void}
 * @example
 */
// #endregion weChatJSSDKInit
export function weChatJSSDKInit() {
    const script = document.createElement("script");
    script.type = "text/javascript";
    const protocol = window.location.protocol;
    script.src = `${protocol}//res.wx.qq.com/open/js/jweixin-1.6.0.js`;
    // 备用地址：https://res2.wx.qq.com/open/js/jweixin-1.6.0.js
    document.getElementsByTagName("head")[0].appendChild(script);
    return new Promise((resolevd, rejected) => {
        script.onload = function () {
            resolevd();
        };
        script.onerror = function () {
            rejected();
        };
    });
}
