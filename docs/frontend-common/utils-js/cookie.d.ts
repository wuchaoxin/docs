/**
 * @description 简单的利用 js-cookie 操作
 */
import { CookieAttributes } from 'js-cookie';
export declare function getCookie(key: string): string;
export declare function setCookie(key: string, value: string, config?: CookieAttributes): void;
export declare function removeCookie(key: string, options?: CookieAttributes): void;
