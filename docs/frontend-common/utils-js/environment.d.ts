/**
 * @description 跟环境相关的函数
 */
/**
 * @description 获取当前的运行环境
 * @returns {'qa'|'stage'|'live'}
 * @example
 */
export declare function getEnv(): "qa" | "stage" | "live";
/**
 * @description 根据当前的运行环境得到当前的 flag
 * @returns {'' | '1' | '3'}
 * @example
 */
export declare function getEnvFlag(): "" | "3" | "1";
/**
 * @description 获取当前的项目
 * @returns {'YM_HTML'|'IN_MARKET'|'IN_OPERATION'|'IN_MAN_MOBILE'}
 * @example
 */
export declare function getProject(): "" | "YM_HTML" | "IN_MARKET" | "IN_OPERATION" | "IN_MAN_MOBILE";
