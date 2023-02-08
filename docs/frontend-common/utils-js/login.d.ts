/**
 * @description 该文件旨在统一登录相关函数
 */
import { LoginParamsForApp, LoginParamsForWechat } from './types/typings/login';
/**
 * @description 获取用户的登录信息
 * @returns {Object}
 * @example
 */
export declare function getLoginInfo(): AnyObject;
/**
 * @description 判断用户是否登录
 * @returns {boolean}
 * @example
 */
export declare function isLogin(): boolean;
/**
 * @description 进行微信登录
 * @param {LoginParamsForWechat} params
 * @returns {void}
 * @example
 */
export declare function handleWeChatLogion(params: LoginParamsForWechat): void;
/**
 * @description 进行 APP 登录
 * @param {LoginParamsForApp} params
 * @returns {void}
 * @example
 */
export declare function handleAppLogin(params?: LoginParamsForApp): void;
/**
 * @description 用于检测登录是否过期（一般放于请求响应拦截器中）
 * @param {Dynamic} config
 * @param {Function} callback
 * @returns {void}
 * @example
 */
export declare function handlelLoginExpired(config: Dynamic, callback?: () => void): void;
/**
 * @description 是否为非注册用户（未绑定手机号）
 * @returns {boolean}
 * @example
 */
export declare function isNonRegisteredUser(): boolean;
