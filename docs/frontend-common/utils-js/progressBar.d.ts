/**
 * @description 跟进度条相关
 */
import { NProgressOptions } from "nprogress";
import "nprogress/nprogress.css";
/**
 * @description 配置 progressBar
 * @param {NProgressOptions} config
 * @returns {void}
 */
export declare function progressBarInit(config?: NProgressOptions): void;
/**
 * @description 开启进度条
 * @returns {void}
 */
export declare function startProgressBar(): void;
/**
 * @description 关闭进度条
 * @returns {void}
 */
export declare function stopProgressBar(): void;
