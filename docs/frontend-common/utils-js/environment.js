/**
 * @description 跟环境相关的函数
 */
// #region getEnv
/**
 * @description 获取当前的运行环境
 * @returns {'qa'|'stage'|'live'}
 * @example
 */
// #endregion getEnv
export function getEnv() {
    const prefixHost = location.host.split('.')[0];
    if (prefixHost.includes('3')) {
        return 'qa';
    }
    else if (prefixHost.includes('1')) {
        return 'stage';
    }
    else {
        return 'live';
    }
}
// #region getEnvFlag
/**
 * @description 根据当前的运行环境得到当前的 flag
 * @returns {'' | '1' | '3'}
 * @example
 */
// #endregion getEnvFlag
export function getEnvFlag() {
    const FLAG_MAP = {
        qa: '3',
        stage: '1',
        live: '',
    };
    return FLAG_MAP[getEnv()];
}
// #region getProject
/**
 * @description 获取当前的项目
 * @returns {'YM_HTML'|'IN_MARKET'|'IN_OPERATION'|'IN_MAN_MOBILE'}
 * @example
 */
// #endregion getProject
export function getProject() {
    const PROJECT_REG_MAP = {
        YM_HTML: /wx/,
        IN_MARKET: /market/,
        IN_OPERATION: /operat/,
        IN_MAN_MOBILE: /mzs/,
    };
    const hostName = window.location.hostname;
    for (const [key, reg] of Object.entries(PROJECT_REG_MAP)) {
        const temp = key;
        if (reg.test(hostName)) {
            return temp;
        }
    }
    return '';
}
