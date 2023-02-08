/**
 * @description 处理错误相关
 */

import { App } from "vue";
import { ErrorConfig } from "./types/typings/error";
import { AxiosCustomRequestConfig } from "./types/typings/request";
import UA from "./UA";
import { axiosCustomConfig } from "./request";

// #region handleGlobalError
/**
 * @description handleGlobalError 处理全局的资源、运行、promise错误
 * @param {Function} 全局报错处理函数
 * @param {Function} 全局处理未被处理的 Promise 函数
 * @returns {void}
 */
// #endregion handleGlobalError
export function handleGlobalError(
  globalErrorFn?: () => void,
  promiseErrorFn?: () => void
): void {
  // 捕捉资源加载错误、运行错误（无法捕捉语法错误以及异步错误）
  window.addEventListener(
    "error",
    (err) => {
      globalErrorFn?.();
      console.log("globalError", err);
    },
    true
  );
  // 捕捉全局未被处理的 Promise
  window.addEventListener("unhandledrejection", function (err) {
    promiseErrorFn?.();
    console.log("promiseError", err);
  });
}

// #region handleRenderError
/**
 * @description handleRenderError 处理渲染错误（仅针对 vue3）
 * @param {App<Element>} app
 * @returns {void}
 */
// #endregion handleRenderError
export function handleRenderError(
  app: App<Element>,
  rederErrorFn?: () => void
): void {
  app.config.errorHandler = (err, vm, info) => {
    rederErrorFn?.();
    console.log("rederError", { err, vm, info });
  };
}

// #region handleRequestError
/**
 * @description handleRequestError 处理请求错误（注意：只要不为成功 code，都为请求错误）
 * @param {Record<string,unknown>} error
 * @param {"response" | "request"} source
 * @returns {void}
 */
// #endregion handleRequestError
export function handleRequestError(
  error: Record<string, unknown>,
  source: "response" | "request",
  requestConfig: AxiosCustomRequestConfig
) {
  let errorConfig: ErrorConfig = {};
  errorConfig = {
    code: error.code || "unknown",
    source: source,
    message: error.message || "unknown",
    UA: new UA().getDetail(),
    raw: error,
  };
  console.log("HTTP ERROR", errorConfig);
  if (axiosCustomConfig.errorHint || requestConfig.errorHint) {
    if (requestConfig.errorHint) {
      requestConfig.errorHint(error);
    } else {
      axiosCustomConfig.errorHint?.(error);
    }
  }
}
