import { AxiosCustomConfig, AxiosCustomRequestConfig, ReAxiosPromise } from "./types/typings/request";
export declare let axiosCustomConfig: AxiosCustomConfig;
export default function service(config: AxiosCustomRequestConfig): ReAxiosPromise;
/**
 * @description setCustomConfig 设置 axios 默认全局配置
 * @param {Partial<AxiosCustomConfig>} config 配置
 * @returns {void}
 * @example
 */
export declare function setCustomConfig(config: Partial<AxiosCustomConfig>): void;
