/**
 * @description 跟进度条相关
 */
import progressBar from "nprogress";
import "nprogress/nprogress.css";
// https://github.com/rstacruz/nprogress
// #region progressBarInit
/**
 * @description 配置 progressBar
 * @param {NProgressOptions} config
 * @returns {void}
 */
// #endregion progressBarInit
export function progressBarInit(config) {
    const defaultConfig = { showSpinner: false };
    progressBar.configure(Object.assign({}, defaultConfig, config));
}
// #region startProgressBar
/**
 * @description 开启进度条
 * @returns {void}
 */
// #endregion startProgressBar
export function startProgressBar() {
    progressBar.start();
}
// #region stopProgressBar
/**
 * @description 关闭进度条
 * @returns {void}
 */
// #endregion stopProgressBar
export function stopProgressBar() {
    progressBar.done();
}
