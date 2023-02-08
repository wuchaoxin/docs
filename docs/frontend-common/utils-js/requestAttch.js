/**
 * @description 请求的方法抽离出来（防止 request 文件过于大）
 */
import instance, { axiosCustomConfig } from "./request";
import { stopProgressBar, startProgressBar } from "./progressBar";
import qs from "qs";
import { API_ERROR, HTTP_CANCEL, SUCCESS_CODE } from "./types/const/request";
import { YM_API_CACHE } from "./types/const/storage";
// 保存状态还处于 pending 的请求
const pendingAjax = new Map();
// 缓存 map
const cacheMap = new Map();
/**
 * @description 数据是否是从缓存中读取
 * @param {any} error
 * @returns {boolean}
 */
export function isCache(error) {
    const name = error?.constructor?.name;
    if (name && name === HTTP_CANCEL) {
        const data = JSON.parse(error.message);
        if (data.cache) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}
// 是否需要处理缓存
function _isHandleCache(axiosCustomConfig, config) {
    if (config.cache === true) {
        return true;
    }
    else if (config.cache === false) {
        return false;
    }
    else {
        return axiosCustomConfig.cache.storage;
    }
}
/**
 * @description 将缓存返回
 * @param {AxiosCustomRequestConfig} config
 * @param {AxiosStatic} axios
 * @returns {void}
 */
export function cacheRequest(config, axios) {
    // 开启缓存则保存请求结果和cancel 函数
    if (_isHandleCache(axiosCustomConfig, config)) {
        const key = generateRequestKey(config, true);
        const data = _getCache(key);
        if (data) {
            const isOverdue = _isCacheTimeOverdue(config, data.storageExpire);
            // 判断缓存数据是否存在 存在的话 是否过期 没过期就返回
            if (!isOverdue) {
                config.cancelToken = new axios.CancelToken((cancel) => {
                    console.log(`读取缓存`, config);
                    // cancel 函数的参数会作为 promise 的 error 被捕获，传递结果到catch中
                    cancel(JSON.stringify(data.data));
                });
            }
        }
    }
}
/**
 * @description 结果成功进行缓存(只对 get 请求有效)
 * @param {AxiosCustomRequestConfig} response
 * @returns {void}
 */
export function cacheResponse(response) {
    const config = response.config;
    const data = response.data;
    const isGet = ((config) => {
        if (config.method === "get" || config.method === "GET") {
            return true;
        }
        else {
            return false;
        }
    })(config);
    if (response &&
        _isHandleCache(axiosCustomConfig, config) &&
        isGet &&
        data.code === SUCCESS_CODE) {
        const data = {
            storageExpire: getNowTime(),
            data: response.data,
        };
        _setCache(config, data);
    }
}
// 缓存是否过期
function _isCacheTimeOverdue(config, storageExpire) {
    const options = axiosCustomConfig.cache;
    // 这里用于存储是默认时间还是用户传递过来的时间
    const setExpireTime = ((config, options) => {
        if (config.storageTime) {
            return config.storageTime;
        }
        else {
            return options.storageTime;
        }
    })(config, options);
    if (getNowTime() - storageExpire < setExpireTime) {
        return false;
    }
    else {
        return true;
    }
}
// 设置缓存（1.存入内存；2.写入 localStorage）
function _setCache(config, value) {
    try {
        const key = generateRequestKey(config, true);
        cacheMap.set(key, value);
        const cacheStr = window.localStorage.getItem(YM_API_CACHE) || "{}";
        const cache = Object.assign({}, JSON.parse(cacheStr), {
            [key]: value,
        });
        // 检查一下是否有过期项
        for (const [key, value] of Object.entries(cache)) {
            if (_isCacheTimeOverdue(config, value.storageExpire)) {
                delete cache[key];
            }
        }
        window.localStorage.setItem(YM_API_CACHE, JSON.stringify(cache));
    }
    catch (error) {
        window.localStorage.removeItem(YM_API_CACHE);
    }
}
// 读取缓存(1.首先从内存中读取；2.内存中没有读取到就去 localStorage 中读取)
function _getCache(key) {
    const memoryCache = cacheMap.get(key);
    const diskCacheStr = window.localStorage.getItem(key);
    const diskCache = diskCacheStr ? JSON.parse(diskCacheStr) : null;
    return memoryCache || diskCache;
}
/**
 * @description 生成请求 key
 * @param {AxiosCustomRequestConfig} config
 * @returns {String}
 */
export function generateRequestKey(config, cache = false) {
    return JSON.stringify({
        cache,
        duplicatedKey: config.url,
        type: config.method,
        data: config.data,
        params: config.params,
    });
}
/**
 * @description 是否需要处理重复请求
 * @param {AxiosCustomRequestConfig} config
 * @param {AxiosCustomConfig} noRepeat
 * @returns {boolean}
 */
function isHandleRepeatRequest(config, noRepeat) {
    if (config.noRepeat === true) {
        return true;
    }
    else if (config.noRepeat === false) {
        return false;
    }
    else {
        return noRepeat;
    }
}
/**
 * @description 在 map 中添加相关正在请求的请求
 * @param {AxiosStatic} axios
 * @param {AxiosCustomRequestConfig} config
 * @return {void}
 */
export function addPendingAjax(axios, config) {
    // 是否需要取消重复的请求
    if (!isHandleRepeatRequest(config, axiosCustomConfig.noRepeat))
        return;
    const duplicatedKey = generateRequestKey(config);
    config.cancelToken =
        config.cancelToken ||
            new axios.CancelToken((cancel) => {
                // 如果pendingAjax中不存在当前请求，添加进去
                if (duplicatedKey && !pendingAjax.has(duplicatedKey)) {
                    pendingAjax.set(duplicatedKey, cancel);
                }
            });
}
/**
 * @description 在 map 中删除重复请求
 * @param {AxiosCustomRequestConfig}  config
 * @return {void}
 */
export function removePendingAjax(config) {
    // 是否需要取消重复的请求
    if (!isHandleRepeatRequest(config, axiosCustomConfig.noRepeat))
        return;
    const duplicatedKey = generateRequestKey(config);
    // 如果pendingAjax中存在当前请求, 取消当前请求并将其删除
    if (duplicatedKey && pendingAjax.has(duplicatedKey)) {
        const cancel = pendingAjax.get(duplicatedKey);
        cancel(duplicatedKey);
        pendingAjax.delete(duplicatedKey);
    }
}
/**
 * @description 处理是否需要重复发送请求
 * @param {any} error
 * @returns {Promise<void>}
 */
export function handleRequestRetry(error) {
    return new Promise((resolved, rejected) => {
        const config = error.config;
        const retryConfig = axiosCustomConfig.retry;
        if (!config) {
            rejected();
            return;
        }
        const retries = ((config, retryConfig) => {
            if (config.retry) {
                return retryConfig.retries;
            }
            else {
                return null;
            }
        })(config, retryConfig);
        const retryDelay = ((config, retryConfig) => {
            if (config.retry) {
                return retryConfig.retryDelay;
            }
            else {
                return null;
            }
        })(config, retryConfig);
        if (!retryDelay || !retries) {
            rejected();
            return;
        }
        // 设置用于跟踪重试计数的变量
        config.__retryCount = config.__retryCount || 0;
        // 检查次数是否用光(todo)
        if (config.__retryCount >= retries) {
            rejected();
            return;
        }
        config.__retryCount += 1;
        resolved();
        setTimeout(() => {
            instance(config);
        }, retryDelay);
    });
}
/**
 * @description 设置请求头
 * @param {AxiosRequestConfig} config axios 参数
 * @returns {void}
 */
export function setHeaders(config) {
    const appendList = axiosCustomConfig.appendHeader;
    for (const [key, val] of Object.entries(appendList)) {
        const isFn = typeof val === "function";
        if (isFn) {
            if (config.headers) {
                config.headers[key] = val(config);
            }
            else {
                config.headers = {
                    [key]: val(config),
                };
            }
        }
        else {
            if (config.headers) {
                config.headers[key] = val;
            }
            else {
                config.headers = {
                    [key]: val,
                };
            }
        }
    }
}
/**
 * @description 追加参数(有时候请求会要求携带一些公共参数)
 * @param {AxiosRequestConfig} config
 * @returns {void}
 */
export function appendParamsOrData(config) {
    const appendData = axiosCustomConfig.appendData;
    for (const item of appendData) {
        const val = (() => {
            const val = item.value;
            if (typeof val === "function") {
                return val();
            }
            else {
                return val;
            }
        })();
        const params = item.params;
        const data = item.data;
        if (val) {
            if (item.params) {
                judgeMethodType("params", params, config, {
                    [item.key]: val,
                });
            }
            if (item.data) {
                judgeMethodType("data", data, config, {
                    [item.key]: val,
                });
            }
        }
    }
    function judgeMethodType(type, list, config, dataMap) {
        const method = config.method;
        for (const item of list) {
            if (item.toLocaleLowerCase() === method ||
                item.toLocaleUpperCase() === method) {
                if (type === "params") {
                    if (config.params) {
                        appendDataToConfig(type, config, dataMap);
                    }
                    else {
                        config.params = dataMap;
                    }
                }
                if (type === "data") {
                    if (config.data) {
                        appendDataToConfig(type, config, dataMap);
                    }
                    else {
                        config.data = dataMap;
                    }
                }
            }
        }
    }
    function appendDataToConfig(type, config, dataMap) {
        for (const [key, val] of Object.entries(dataMap)) {
            config[type][key] = val;
        }
    }
}
// 获取当前时间戳
function getNowTime() {
    return new Date().getTime();
}
/**
 * @description 开启进度条
 * @param {AxiosCustomRequestConfig} config
 * @returns {void}
 */
export function handleStartProgressBar(config) {
    if (config.progressBar) {
        startProgressBar();
    }
}
/**
 * @description 关闭进度条
 * @returns {void}
 */
export function handleStopProgressBar() {
    stopProgressBar();
}
/**
 * @description 设置请求的格式
 * @param {AxiosCustomRequestConfig} config
 * @returns {void}
 */
export function setRequestType(config) {
    // 目前只有 formData 的设置
    if (config.formData) {
        config.headers &&
            (config.headers["Content-Type"] = "application/x-www-form-urlencoded");
        config.transformRequest = [
            function (data) {
                return qs.stringify(data);
            },
        ];
    }
}
/**
 * @description 判断是否是接口报错，而非全局没网
 * @param {null} 参数1
 * @returns {boolean}
 * @example
 */
export function isAPIError(error) {
    if (error === API_ERROR) {
        return true;
    }
    else {
        return false;
    }
}
