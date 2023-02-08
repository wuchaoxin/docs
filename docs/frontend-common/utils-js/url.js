/**
 * @description 与 url 操作相关的函数
 */
// #region deleteQueryParams
/**
 * @description: deleteQueryParams 对 url 中的参数进行删除
 * @param {string} url
 * @param {string} deleteParam 需要删除的参数
 * @return {string} 修改后的 url
 */
// #endregion deleteQueryParams
export function deleteQueryParams(url, deleteParam) {
    if (!url) {
        return url;
    }
    const { baseUrl, params } = getURLAndParams(url);
    let result = baseUrl + "?";
    for (const item of Object.keys(params)) {
        if (item !== deleteParam) {
            result += `${item}=${params[item]}&`;
        }
    }
    result = result.slice(0, result.length - 1);
    return result;
}
// #region addQueryParams
/**
 * @description: addQueryParams 对 url 中的参数进行新增
 * @param {string} url
 * @param {string} addParam 需要新增的参数
 * @param {string} value 新增的参数值
 * @return {string} 修改后的 url
 */
// #endregion addQueryParams
export function addQueryParams(url, addParam, value) {
    if (!url) {
        return url;
    }
    const { baseUrl, params } = getURLAndParams(url);
    let result = baseUrl + "?";
    params[addParam] = value;
    for (const item of Object.keys(params)) {
        result += `${item}=${params[item]}&`;
    }
    result = result.slice(0, result.length - 1);
    return result;
}
// #region getURLAndParams
/**
 * @description: getURLAndParams 获取 url 中的 baseURL 和 query 参数
 * @param {string} url
 * @return {Object} baseURL 和 query 参数
 */
// #endregion getURLAndParams
export function getURLAndParams(url = window.location.href) {
    try {
        const tempArr = url.split("?");
        const urlConfig = new URL(url);
        const baseUrl = (() => {
            const origin = urlConfig.origin;
            const pathname = urlConfig.pathname;
            let hash = urlConfig.hash;
            if (hash) {
                hash = hash.split("?")[0];
            }
            return origin + pathname + hash;
        })();
        tempArr.splice(0, 1);
        const paramsStr = tempArr.join("&");
        const params = {};
        if (paramsStr) {
            const paramsGroup = paramsStr.split("&");
            for (const item of paramsGroup) {
                const temp = item.split("=");
                temp[1] = filterHash(temp[1]);
                params[temp[0]] = temp[1];
            }
        }
        return {
            baseUrl,
            params,
        };
    }
    catch (error) {
        console.log("getURLAndParams url error", error);
        return {
            baseUrl: "",
            params: {},
        };
    }
}
function filterHash(val) {
    const hashreg = /^.*#\//;
    if (val && hashreg.test(val)) {
        return val.split("#/")[0];
    }
    else {
        return val;
    }
}
