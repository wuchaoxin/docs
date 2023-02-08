import { defaultUADetector } from './UA';
import { defaultLocalStorage } from './storage';
import { WECHAT_CONFIG_STORAGE_KEY } from './types/const/weChat';
import request from './request';
let _queue = [];
// #region injectJSSDK
/**
 * @description 注入 weChat SDK
 * @returns {Promise}
 * @example
 */
// #endregion injectJSSDK
export function injectJSSDK() {
    if (isHaveJSSDK()) {
        return;
    }
    const script = document.createElement('script');
    script.type = 'text/javascript';
    const protocol = window.location.protocol;
    script.src = `${protocol}//res.wx.qq.com/open/js/jweixin-1.6.0.js`;
    // 备用地址：https://res2.wx.qq.com/open/js/jweixin-1.6.0.js
    document.getElementsByTagName('head')[0].appendChild(script);
    return new Promise((resolevd, rejected) => {
        script.onload = function () {
            handleQueue();
            resolevd();
        };
        script.onerror = function () {
            rejected();
        };
    });
}
// #region isHaveJSSDK
/**
 * @description 判断是否注入了 weChat SDK
 * @returns {void}
 * @example
 */
// #endregion isHaveJSSDK
export function isHaveJSSDK() {
    if (window.wx) {
        return true;
    }
    else {
        return false;
    }
}
// #region waitJSSDK
/**
 * @description 等待 JSSDK 下载完毕后，需要进行的操作（因为下载是异步的，所以有可能还没有下载完毕）
 * @param {Function} 执行函数
 * @returns {void}
 * @example
 */
// #endregion waitJSSDK
export function waitJSSDK(fn) {
    if (isHaveJSSDK()) {
        fn();
    }
    else {
        _queue.push(fn);
    }
}
function handleQueue() {
    const queue = _queue;
    if (queue.length > 0) {
        for (const item of queue) {
            item();
        }
        _queue = [];
    }
}
// #region initJSSDK
/**
 * @description 初始化 weChat
 * @returns {void}
 * @example
 */
// #endregion initJSSDK
export function initJSSDK() {
    const url = window.location.href.split('#')[0];
    const handleConfig = defaultLocalStorage.get(WECHAT_CONFIG_STORAGE_KEY, 'Object');
    if (Object.keys(handleConfig).length > 0 && handleConfig.url === url) {
        JSSDKConfig(handleConfig);
    }
    else {
        requestJSSdkConfig((config) => {
            JSSDKConfig(config);
        });
    }
}
function requestJSSdkConfig(callback) {
    // 清除缓存
    defaultLocalStorage.delete(WECHAT_CONFIG_STORAGE_KEY);
    const url = window.location.href.split('#')[0];
    getJsSdkConfig({ url: url })
        .then((res) => {
        const config = res.data;
        defaultLocalStorage.add(WECHAT_CONFIG_STORAGE_KEY, {
            val: config,
            expires: 1000 * 60 * 30,
        });
        if (callback) {
            callback(config);
        }
    })
        .catch((e) => {
        console.log(e);
    });
}
function JSSDKConfig(config) {
    // 调取微信api
    window.wx.config({
        debug: false,
        appId: config.appId,
        timestamp: config.timestamp,
        nonceStr: config.nonceStr,
        signature: config.signature,
        jsApiList: [
            'updateAppMessageShareData',
            'updateTimelineShareData',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
        ],
    });
    // 微信配置失败
    window.wx.error(function (res) {
        console.log('wx配置失败！！！！：' + res.errMsg);
    });
}
// #region setShare
/**
 * @description 设置分享配置
 * @returns {void}
 * @example
 */
// #endregion setShare
export function setShare(config) {
    if (defaultUADetector.isWeChat()) {
        waitJSSDK(() => {
            window.wx.ready(() => {
                // window.wx.updateAppMessageShareData({
                //   title: config.title,
                //   desc: config.desc,
                //   link: config.link,
                //   imgUrl: config.imgUrl,
                // })
                // window.wx.updateTimelineShareData({
                //   title: config.title,
                //   link: config.link,
                //   imgUrl: config.imgUrl,
                // })
                window.wx.onMenuShareTimeline({
                    title: config.title,
                    link: config.link,
                    imgUrl: config.imgUrl,
                    success: () => {
                        config.callback && config.callback('weChatMoments');
                    },
                });
                window.wx.onMenuShareAppMessage({
                    title: config.title,
                    desc: config.desc,
                    link: config.link,
                    imgUrl: config.imgUrl,
                    success: () => {
                        config.callback && config.callback('weChatFriends');
                    },
                });
                window.wx.onMenuShareQQ({
                    title: config.title,
                    desc: config.desc,
                    link: config.link,
                    imgUrl: config.imgUrl,
                    success: () => {
                        config.callback && config.callback('QQ');
                    },
                });
                window.wx.onMenuShareWeibo({
                    title: config.title,
                    desc: config.desc,
                    link: config.link,
                    imgUrl: config.imgUrl,
                    success: () => {
                        config.callback && config.callback('microBlog');
                    },
                });
                window.wx.onMenuShareQZone({
                    title: config.title,
                    desc: config.desc,
                    link: config.link,
                    imgUrl: config.imgUrl,
                    success: () => {
                        config.callback && config.callback('QQSpace');
                    },
                });
            });
        });
    }
}
function getJsSdkConfig(params) {
    return request({
        url: '/passport/wx/getJsSdkConfig.do',
        method: 'GET',
        params,
    });
}
