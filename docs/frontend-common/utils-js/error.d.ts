/**
 * @description 处理错误相关
 */
import { App } from "vue";
import { AxiosCustomRequestConfig } from "./types/typings/request";
/**
 * @description handleGlobalError 处理全局的资源、运行、promise错误
 * @param {Function} 全局报错处理函数
 * @param {Function} 全局处理未被处理的 Promise 函数
 * @returns {void}
 */
export declare function handleGlobalError(globalErrorFn?: () => void, promiseErrorFn?: () => void): void;
/**
 * @description handleRenderError 处理渲染错误（仅针对 vue3）
 * @param {App<Element>} app
 * @returns {void}
 */
export declare function handleRenderError(app: App<Element>, rederErrorFn?: () => void): void;
/**
 * @description handleRequestError 处理请求错误（注意：只要不为成功 code，都为请求错误）
 * @param {Record<string,unknown>} error
 * @param {"response" | "request"} source
 * @returns {void}
 */
export declare function handleRequestError(error: Record<string, unknown>, source: "response" | "request", requestConfig: AxiosCustomRequestConfig): void;
