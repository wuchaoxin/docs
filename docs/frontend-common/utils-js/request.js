import axios from "axios";
import { handleRequestError } from "./error";
import { addPendingAjax, appendParamsOrData, cacheRequest, cacheResponse, handleRequestRetry, handleStartProgressBar, handleStopProgressBar, isCache, removePendingAjax, setHeaders, setRequestType, } from "./requestAttch";
import { API_ERROR, SUCCESS_CODE } from "./types/const/request";
export let axiosCustomConfig = {
    // #region defaultCustomConfig
    noRepeat: false,
    // 默认配置，请求侧可再次更改（只对 get 请求有效）
    cache: {
        storage: false,
        storageTime: 5 * 60 * 1000,
    },
    // 默认关闭，需要在请求侧开启
    retry: { retries: 3, retryDelay: 1000 },
    appendData: [],
    appendHeader: {},
    // #endregion defaultCustomConfig
};
const defaultConfig = {
    // 当跨域请求时发送cookie
    withCredentials: true,
    // 请求超时
    timeout: 5000,
};
const instance = axios.create(Object.assign({}, defaultConfig));
// 请求拦截器
instance.interceptors.request.use((config) => {
    // 在请求开始之前检查先前的请求
    removePendingAjax(config);
    // 将当前请求添加到pendingAjax
    addPendingAjax(axios, config);
    appendParamsOrData(config);
    setHeaders(config);
    setRequestType(config);
    cacheRequest(config, axios);
    handleStartProgressBar(config);
    return config;
}, (error) => {
    // 请求错误操作
    handleRequestError(error, "request", error.config);
    return Promise.reject(error);
});
// 响应拦截器
instance.interceptors.response.use((response) => {
    removePendingAjax(response.config);
    handleStopProgressBar();
    const res = response.data;
    // 如果自定义代码不是成功 code，就会被判定为错误。
    if (res.code !== SUCCESS_CODE) {
        const requestConfig = response.config;
        handleRequestError(res, "response", requestConfig);
        return Promise.reject(res);
    }
    else {
        cacheResponse(response);
        return res;
    }
}, (error) => {
    removePendingAjax(error.config);
    handleStopProgressBar();
    const cache = isCache(error);
    if (cache) {
        return Promise.resolve(JSON.parse(error.message));
    }
    else {
        // then 说明处于重复请求中
        handleRequestRetry(error).catch(() => {
            handleRequestError(error, "response", error.config);
        });
        const isOnLine = window.navigator.onLine;
        if (isOnLine) {
            return Promise.reject(API_ERROR);
        }
        else {
            return Promise.reject(error);
        }
    }
});
// 向外暴露的最终方法
export default function service(config) {
    return instance(config);
}
// #region setCustomConfig
/**
 * @description setCustomConfig 设置 axios 默认全局配置
 * @param {Partial<AxiosCustomConfig>} config 配置
 * @returns {void}
 * @example
 */
// #endregion setCustomConfig
export function setCustomConfig(config) {
    axiosCustomConfig = Object.assign({}, axiosCustomConfig, config);
}
