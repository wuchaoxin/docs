import { ShareConfig } from './types/typings/weChat';
/**
 * @description 注入 weChat SDK
 * @returns {Promise}
 * @example
 */
export declare function injectJSSDK(): Promise<void>;
/**
 * @description 判断是否注入了 weChat SDK
 * @returns {void}
 * @example
 */
export declare function isHaveJSSDK(): boolean;
/**
 * @description 等待 JSSDK 下载完毕后，需要进行的操作（因为下载是异步的，所以有可能还没有下载完毕）
 * @param {Function} 执行函数
 * @returns {void}
 * @example
 */
export declare function waitJSSDK(fn: () => void): void;
/**
 * @description 初始化 weChat
 * @returns {void}
 * @example
 */
export declare function initJSSDK(): void;
/**
 * @description 设置分享配置
 * @returns {void}
 * @example
 */
export declare function setShare(config: ShareConfig): void;
