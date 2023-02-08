/**
 * @description 与 mock 相关
 */
import { Params } from "./types/typings/mock";
/**
 * @description 是否处于 mock 环境
 * @returns {boolean}
 */
export declare function isMock(): boolean;
/**
 * @description 进行 mock 数据（注意：使用 mock.js 后会重写 XMLHTTPRequest，使得依赖此对象的相关内容变得异常）
 * @param {Function} fn 请求方法
 * @param {AnyObject | Function} data 返回的数据
 * @returns {void}
 */
export declare function handleMock<T = Record<string, unknown>>(fn: Function, data: T | ((params: Params) => AnyObject)): void;
