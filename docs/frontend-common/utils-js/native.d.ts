/**
 * @description 跳转 app 链接，如果没有下载 app 那么就下载
 * @param {string} appsUrl
 * @param {boolean} isShowToast
 * @example
 */
export declare const openOrDownApp: (appsUrl: string, isShowToast?: boolean) => void;
export declare function getAndroidUrl(params: any): import("./types/typings/request").ReAxiosPromise<any>;
