/**
 * @description 请求的方法抽离出来（防止 request 文件过于大）
 */
import { AxiosRequestConfig, AxiosStatic } from "axios";
import { AxiosCustomRequestConfig, AxiosCustomResponseConfig } from "./types/typings/request";
/**
 * @description 数据是否是从缓存中读取
 * @param {any} error
 * @returns {boolean}
 */
export declare function isCache(error: any): boolean;
/**
 * @description 将缓存返回
 * @param {AxiosCustomRequestConfig} config
 * @param {AxiosStatic} axios
 * @returns {void}
 */
export declare function cacheRequest(config: AxiosCustomRequestConfig, axios: AxiosStatic): void;
/**
 * @description 结果成功进行缓存(只对 get 请求有效)
 * @param {AxiosCustomRequestConfig} response
 * @returns {void}
 */
export declare function cacheResponse(response: AxiosCustomResponseConfig): void;
/**
 * @description 生成请求 key
 * @param {AxiosCustomRequestConfig} config
 * @returns {String}
 */
export declare function generateRequestKey(config: AxiosCustomRequestConfig, cache?: boolean): string;
/**
 * @description 在 map 中添加相关正在请求的请求
 * @param {AxiosStatic} axios
 * @param {AxiosCustomRequestConfig} config
 * @return {void}
 */
export declare function addPendingAjax(axios: AxiosStatic, config: AxiosCustomRequestConfig): void;
/**
 * @description 在 map 中删除重复请求
 * @param {AxiosCustomRequestConfig}  config
 * @return {void}
 */
export declare function removePendingAjax(config: AxiosCustomRequestConfig): void;
/**
 * @description 处理是否需要重复发送请求
 * @param {any} error
 * @returns {Promise<void>}
 */
export declare function handleRequestRetry(error: any): Promise<void>;
/**
 * @description 设置请求头
 * @param {AxiosRequestConfig} config axios 参数
 * @returns {void}
 */
export declare function setHeaders(config: AxiosRequestConfig): void;
/**
 * @description 追加参数(有时候请求会要求携带一些公共参数)
 * @param {AxiosRequestConfig} config
 * @returns {void}
 */
export declare function appendParamsOrData(config: AxiosRequestConfig): void;
/**
 * @description 开启进度条
 * @param {AxiosCustomRequestConfig} config
 * @returns {void}
 */
export declare function handleStartProgressBar(config: AxiosCustomRequestConfig): void;
/**
 * @description 关闭进度条
 * @returns {void}
 */
export declare function handleStopProgressBar(): void;
/**
 * @description 设置请求的格式
 * @param {AxiosCustomRequestConfig} config
 * @returns {void}
 */
export declare function setRequestType(config: AxiosCustomRequestConfig): void;
/**
 * @description 判断是否是接口报错，而非全局没网
 * @param {null} 参数1
 * @returns {boolean}
 * @example
 */
export declare function isAPIError(error: any): boolean;
