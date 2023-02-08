/**
 * @description 与 url 操作相关的函数
 */
/**
 * @description: deleteQueryParams 对 url 中的参数进行删除
 * @param {string} url
 * @param {string} deleteParam 需要删除的参数
 * @return {string} 修改后的 url
 */
export declare function deleteQueryParams(url: string, deleteParam: string): string;
/**
 * @description: addQueryParams 对 url 中的参数进行新增
 * @param {string} url
 * @param {string} addParam 需要新增的参数
 * @param {string} value 新增的参数值
 * @return {string} 修改后的 url
 */
export declare function addQueryParams(url: string, addParam: string, value: string): string;
/**
 * @description: getURLAndParams 获取 url 中的 baseURL 和 query 参数
 * @param {string} url
 * @return {Object} baseURL 和 query 参数
 */
export declare function getURLAndParams(url?: string): {
    baseUrl: string;
    params: Record<string, string>;
};
