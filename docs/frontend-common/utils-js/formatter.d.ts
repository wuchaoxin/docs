/**
 * @description 与格式化相关的函数
 */
import { Dayjs } from "dayjs";
import { JSType } from "./types/typings/common";
/**
 * @description moneyFormat 格式成金钱格式。详情见：http://openexchangerates.github.io/accounting.js/
 * @param {number | string} money 数字
 * @param {string} unit 单位
 * @param {number} digit 保留小数点后几位（具备四舍五入）
 * @returns {string}
 */
export declare function moneyFormat(money: number | string | undefined, unit?: string, digit?: number): string;
/**
 * @description moneyUnformat 解除金钱格式，仅对 moneyFormat 方法创建出来的金钱格式有效
 * @param {string | undefined} money
 * @returns {number}
 */
export declare function moneyUnformat(money: string | undefined): number;
/**
 * @description time 时间操作实际就是返回 dayjs 对象
 * @param {string|Date|number} time 时间
 * @returns {Object}
 * @example
 */
export declare function time(time?: string | number | Date): Dayjs;
/**
 * @description timeFormat 标准时间格式化(中文)
 * @param {string|Date|number} time 时间
 * @param {string} formatConfig 格式
 * @returns {string}
 */
export declare function timeFormat(time?: string | number | Date, formatConfig?: string): string;
/**
 * @description removeSpace 删除空格
 * @param {string} str 待处理字符串
 * @param {'all'|'left'|'right'|'both'} type 处理方式（默认 both)
 * @returns {string}
 */
export declare function removeSpace(str: string, type?: "all" | "left" | "right" | "both"): string;
/**
 * @description addSuffix 补上后缀或者前缀
 * @param {string} text 文本
 * @param {string} symbol 要追加的文本
 * @param {boolean} order 正序还是倒序
 * @returns {string}
 */
export declare function addSuffix(text: string | number, symbol: string, order?: boolean): string;
/**
 * @description toFixed 针对数字和字符串进行小数格式化
 * @param {number | string} val 值
 * @param {number} digit 位数
 * @returns {string}
 */
export declare function toFixed(val: number | string, digit: number): string;
/**
 * @description isRightJSType 判断当前的值类型是否正确
 * @param {unknown} val 判断的值
 * @param {JSType} judgeType 判断的类型
 * @returns {boolean}
 * @example isRightJSType([],'array') => true
 */
export declare function isRightJSType(val: unknown, judgeType: JSType): boolean;
/**
 * @description getRightTypeVal 判断当前的类型是否正确，如果不正确，那么进行转换或者启用默认值
 * @param {unknown} val 判断的值
 * @param {JSType} judgeType 判断的类型
 * @returns {T}
 * @example getRightTypeVal(null, 'array') => []
 */
export declare function getRightTypeVal(val: unknown, judgeType: "undefined"): undefined;
export declare function getRightTypeVal(val: unknown, judgeType: "null"): null;
export declare function getRightTypeVal(val: unknown, judgeType: "string"): string;
export declare function getRightTypeVal(val: unknown, judgeType: "number"): number;
export declare function getRightTypeVal(val: unknown, judgeType: "boolean"): boolean;
export declare function getRightTypeVal(val: unknown, judgeType: "Symbol"): symbol;
export declare function getRightTypeVal(val: unknown, judgeType: "Function"): Function;
export declare function getRightTypeVal<T = unknown>(val: unknown, judgeType: "Array"): T[];
export declare function getRightTypeVal<T = AnyObject>(val: unknown, judgeType: "Object"): T;
