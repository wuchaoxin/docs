/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/**
 * @description 与格式化相关的函数
 */
import dayjs from "dayjs";
import accounting from "accounting";
import NP from "number-precision";
import { NO_DADA_LINE } from "./types/const/common";
// #region moneyFormat
/**
 * @description moneyFormat 格式成金钱格式。详情见：http://openexchangerates.github.io/accounting.js/
 * @param {number | string} money 数字
 * @param {string} unit 单位
 * @param {number} digit 保留小数点后几位（具备四舍五入）
 * @returns {string}
 */
// #endregion moneyFormat
export function moneyFormat(money, unit = "", digit = 3) {
    if (money) {
        return accounting.formatMoney(money, unit, digit);
    }
    else {
        return "0";
    }
}
// #region moneyUnformat
/**
 * @description moneyUnformat 解除金钱格式，仅对 moneyFormat 方法创建出来的金钱格式有效
 * @param {string | undefined} money
 * @returns {number}
 */
// #endregion moneyUnformat
export function moneyUnformat(money) {
    if (money) {
        return accounting.unformat(money);
    }
    else {
        return 0;
    }
}
// #region time
/**
 * @description time 时间操作实际就是返回 dayjs 对象
 * @param {string|Date|number} time 时间
 * @returns {Object}
 * @example
 */
// #endregion time
export function time(time = new Date()) {
    return dayjs(time);
}
// #region timeFormat
/**
 * @description timeFormat 标准时间格式化(中文)
 * @param {string|Date|number} time 时间
 * @param {string} formatConfig 格式
 * @returns {string}
 */
// #endregion timeFormat
export function timeFormat(time = new Date(), formatConfig = "YYYY-MM-DD") {
    return dayjs(time).format(formatConfig);
}
// #region removeSpace
/**
 * @description removeSpace 删除空格
 * @param {string} str 待处理字符串
 * @param {'all'|'left'|'right'|'both'} type 处理方式（默认 both)
 * @returns {string}
 */
// #endregion removeSpace
export function removeSpace(str, type = "both") {
    if (type === "both") {
        return str.replace(/^\s+|\s+$/g, "");
    }
    else if (type === "all") {
        return str.replace(/\s+/g, "");
    }
    else if (type === "left") {
        return str.replace(/^\s*/, "");
    }
    else if (type === "right") {
        return str.replace(/(\s*$)/g, "");
    }
    else {
        return str;
    }
}
// #region addSuffix
/**
 * @description addSuffix 补上后缀或者前缀
 * @param {string} text 文本
 * @param {string} symbol 要追加的文本
 * @param {boolean} order 正序还是倒序
 * @returns {string}
 */
// #endregion addSuffix
export function addSuffix(text, symbol, order = false) {
    if (text) {
        if (order) {
            return symbol + text;
        }
        else {
            return text + symbol;
        }
    }
    else {
        return "";
    }
}
// #region toFixed
/**
 * @description toFixed 针对数字和字符串进行小数格式化
 * @param {number | string} val 值
 * @param {number} digit 位数
 * @returns {string}
 */
// #endregion toFixed
export function toFixed(val, digit) {
    if (typeof val === "number") {
        return realToFixed(val, digit);
    }
    else if (typeof val === "string") {
        const temp = Number.parseFloat(val);
        if (Number.isNaN(temp)) {
            return NO_DADA_LINE;
        }
        else {
            return realToFixed(temp, digit);
        }
    }
    else {
        return NO_DADA_LINE;
    }
}
// 因为默认的 toFixed 在 chrome 下有精度问题，这里重新实现一个
function realToFixed(val, digit) {
    const temp = NP.round(val, digit);
    return temp.toFixed(digit);
}
// #region isRightJSType
/**
 * @description isRightJSType 判断当前的值类型是否正确
 * @param {unknown} val 判断的值
 * @param {JSType} judgeType 判断的类型
 * @returns {boolean}
 * @example isRightJSType([],'array') => true
 */
// #endregion isRightJSType
export function isRightJSType(val, judgeType) {
    // 不在其中的统一为 Object（这里并没有考虑新语法）
    const typeMap = {
        Undefined: "undefined",
        Null: "null",
        String: "string",
        Boolean: "boolean",
        Number: "number",
        Symbol: "Symbol",
        Function: "Function",
        Array: "Array",
    };
    const callType = (() => {
        return Object.prototype.toString.call(val).slice(8, -1);
    })();
    const type = typeMap[callType];
    if (type) {
        if (type === judgeType) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        if (judgeType === "Object") {
            return true;
        }
        else {
            return false;
        }
    }
}
export function getRightTypeVal(val, judgeType) {
    const typeInfoMap = {
        undefined: {
            defaultVal: undefined,
            judgeFn: (val) => {
                if (val === undefined) {
                    return val;
                }
                else {
                    return false;
                }
            },
        },
        null: {
            defaultVal: null,
            judgeFn: (val) => {
                if (val === undefined) {
                    return val;
                }
                else {
                    return false;
                }
            },
        },
        string: {
            defaultVal: "",
            judgeFn: (val) => {
                if (typeof val === "string" || typeof val === "number") {
                    const temp = val;
                    return temp.toString();
                }
                else {
                    return false;
                }
            },
        },
        boolean: {
            defaultVal: false,
            judgeFn: (val) => {
                if (typeof val === "string") {
                    return val === "true";
                }
                else if (typeof val === "boolean") {
                    return val;
                }
                else {
                    return false;
                }
            },
        },
        number: {
            defaultVal: -1,
            judgeFn: (val) => {
                const temp = Number.parseFloat(val);
                if (Number.isNaN(temp)) {
                    return false;
                }
                else {
                    return temp;
                }
            },
        },
        Symbol: {
            defaultVal: Symbol(-1),
            judgeFn: (val) => {
                if (typeof val === "symbol") {
                    return val;
                }
                else {
                    return false;
                }
            },
        },
        Function: {
            defaultVal: () => { },
            judgeFn: (val) => {
                if (typeof val === "function") {
                    return val;
                }
                else {
                    return false;
                }
            },
        },
        Object: {
            defaultVal: {},
            judgeFn: (val) => {
                if (typeof val === "object" && val !== null) {
                    return val;
                }
                else {
                    return false;
                }
            },
        },
        Array: {
            defaultVal: [],
            judgeFn: (val) => {
                if (Array.isArray(val)) {
                    return val;
                }
                else {
                    return false;
                }
            },
        },
    };
    const isRightType = isRightJSType(val, judgeType);
    if (isRightType) {
        return val;
    }
    else {
        const typeInfo = typeInfoMap[judgeType];
        if (typeInfo) {
            const result = typeInfo.judgeFn(val);
            if (result === false) {
                return typeInfo.defaultVal;
            }
            else {
                return result;
            }
        }
        else {
            throw new Error(`${judgeType} is not a right type`);
        }
    }
}
