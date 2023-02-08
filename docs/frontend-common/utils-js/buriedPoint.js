/**
 * @description 埋点相关
 */
import { getCookie } from './cookie';
import { USER_INFO_KEY } from './types/const/storage';
import { YM_BURIED_POINT, YM_BURIED_POINT_KEY_AND_SECRET_MAP, YM_BURIED_POINT_SENSORS } from './types/const/buriedPoint';
import { getURLAndParams } from './url';
import { getEnv } from './environment';
// #region initBuriedPoint
/**
 * @description 初始化埋点
 * @param {BaseConfig} baseConfig 上报基础信息配置
 * @param {PageConfig} pageConfig 页面基础信息配置
 * @param {Event} event 事件相关配置
 * @returns {void}
 * @example
 */
// #endregion initBuriedPoint
export function initBuriedPoint(baseConfig, pageConfig, event) {
    if (window[YM_BURIED_POINT]) {
        return false;
    }
    else {
        const buriedPoint = new BuriedPoint(event);
        buriedPoint.init(baseConfig, pageConfig);
        window[YM_BURIED_POINT] = buriedPoint;
    }
}
// #region sensorsTrack
/**
 * @description 埋点触发
 * @param {string} eventName 事件名
 * @param {AnyObject} eventMap 预置属性
 * @returns {void}
 * @example
 */
// #endregion sensorsTrack
export function sensorsTrack(eventName, eventMap) {
    if (_checkBuriedPoint()) {
        const buriedPoint = window[YM_BURIED_POINT];
        buriedPoint.sensorsTrack(eventName, eventMap);
    }
}
// #region pageViewTrack
/**
 * @description web 浏览页面事件上报（该方法一般放在路由拦截器中）
 * @param {string} eventName web 浏览页面事件名称
 * @returns {void}
 * @example
 */
// #endregion pageViewTrack
export function pageViewTrack(eventName) {
    if (_checkBuriedPoint()) {
        const buriedPoint = window[YM_BURIED_POINT];
        buriedPoint.pageViewTrack(eventName);
    }
}
// #region getAppKeyAndSecret
/**
 * @description 获取数据上报的 key 和 secret
 * @param {'YM' | 'YMGJ'} type 上报的数据项目
 * @returns {string}
 * @example
 */
// #endregion getAppKeyAndSecret
export function getAppKeyAndSecret(type) {
    const env = getEnv();
    return YM_BURIED_POINT_KEY_AND_SECRET_MAP[type][env];
}
class BuriedPoint {
    _uForm = '';
    _event = {};
    // 事件队列
    _queue = [];
    constructor(event) {
        const { params } = getURLAndParams();
        this._event = event;
        this._uForm = params.uForm || '';
    }
    init(baseConfig, pageConfig) {
        this._loadScript()
            .then(() => {
            this._initBuriedPoint(baseConfig);
            this._initSensors(pageConfig);
            this._checkQueue();
        })
            .catch((err) => {
            console.error('BuriedPoint Script download error');
        });
    }
    /**
     * @description sensorsTrack 触发埋点方法 参数说明
     * @param {string} eventName 必须 事件英文名
     * @param {AnyObject} eventMap  属性列表,示例{ ext1:属性值, ext2:属性值, ext3, ext4....ext20 }
     * @example  sensorsTrack('page_view',{ ext1: 页面标题 })
     */
    sensorsTrack(eventName, eventMap) {
        if (this._checkScript(false)) {
            const sensors = window[YM_BURIED_POINT_SENSORS];
            const e = this._event[eventName];
            if (!e) {
                console.error('No corresponding buried point event was found');
                return;
            }
            eventMap = Object.assign(eventMap, e);
            sensors.track(eventName, eventMap);
        }
        else {
            this._queue.push({ eventName, eventMap });
        }
    }
    /**
     * @description 页面默认全埋点事件
     * @param {string} eventName 事件英文名
     */
    pageViewTrack(eventName) {
        if (this._checkScript(false)) {
            const sensors = window[YM_BURIED_POINT_SENSORS];
            sensors.quick('isReady', () => {
                const g = sensors.getPresetProperties();
                const e = this._event[eventName];
                if (!e) {
                    console.error('No corresponding buried point event was found');
                    return;
                }
                const attrList = Object.assign(e, {
                    // 页面标题
                    ext1: g.$title || '',
                    // 页面路径
                    ext2: g.$url || '',
                    // 前向域名
                    ext3: g.$referrer_host,
                    // 前向地址
                    ext4: g.$referrer,
                    // 用户渠道来源
                    ext5: this._uForm,
                });
                sensors.track(eventName, attrList);
            });
        }
        else {
            this._queue.push({
                eventName,
                eventMap: () => {
                    const sensors = window[YM_BURIED_POINT_SENSORS];
                    const g = sensors.getPresetProperties();
                    const e = this._event[eventName];
                    const attrList = Object.assign(e, {
                        // 页面标题
                        ext1: g.$title || '',
                        // 页面路径
                        ext2: g.$url || '',
                        // 前向域名
                        ext3: g.$referrer,
                        // 前向地址
                        ext4: g.$referrer_host,
                        // 用户渠道来源
                        ext5: this._uForm,
                    });
                    return attrList;
                },
            });
        }
    }
    _initSensors(pageConfig) {
        if (this._checkScript()) {
            const user = (() => {
                const info = window.decodeURIComponent(getCookie(USER_INFO_KEY) || '');
                if (info) {
                    try {
                        return JSON.parse(info);
                    }
                    catch {
                        return {};
                    }
                }
                else {
                    return {};
                }
            })();
            const sensors = window[YM_BURIED_POINT_SENSORS];
            const config = {
                $is_login: user.id ? true : false,
                $user_id: user.id || '',
            };
            sensors.registerPage(Object.assign(config, pageConfig));
        }
    }
    _initBuriedPoint(baseConfig) {
        const config = {
            server_url: window.location.protocol + '//' + window.location.host + '/log.html',
            send_type: 'ajax',
        };
        if (this._checkScript()) {
            const sensors = window[YM_BURIED_POINT_SENSORS];
            sensors.init(Object.assign({}, config, baseConfig));
        }
    }
    _checkQueue() {
        const queue = this._queue;
        if (queue.length > 0) {
            for (const item of queue) {
                const sensors = window[YM_BURIED_POINT_SENSORS];
                const eventMap = (() => {
                    const eventMapTemp = item.eventMap;
                    if (typeof eventMapTemp === 'function') {
                        return eventMapTemp();
                    }
                    else {
                        const e = this._event[item.eventName];
                        return Object.assign({}, e, eventMapTemp);
                    }
                })();
                if (!eventMap.event_id) {
                    console.error('No corresponding buried point event was found');
                    return;
                }
                sensors.track(item.eventName, eventMap);
            }
            this._queue = [];
        }
    }
    // 检查埋点脚本是否安装
    _checkScript(showError = true) {
        if (!window[YM_BURIED_POINT_SENSORS]) {
            if (showError) {
                console.error('BuriedPoint Script not installed');
            }
            return false;
        }
        else {
            return true;
        }
    }
    // 加载埋点
    _loadScript() {
        const SCRIPT_MAP = {
            jsencrypts: 'https://img.scmttec.com/ym/libs/ymStatistics/jsencrypts.min.js',
            MD5: 'https://img.scmttec.com/ym/libs/ymStatistics/MD5.js',
            initSensors: 'https://img.scmttec.com/ym/libs/ymStatistics/initSensors.js',
            sensorsdata: 'https://img.scmttec.com/ym/libs/ymStatistics/sensorsdata.full.js',
        };
        const promiseList = [];
        for (const src of Object.values(SCRIPT_MAP)) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = src;
            document.getElementsByTagName('head')[0].appendChild(script);
            promiseList.push(new Promise((resolevd, rejected) => {
                script.onload = function () {
                    resolevd();
                };
                script.onerror = function () {
                    rejected();
                };
            }));
        }
        return Promise.all(promiseList);
    }
}
function _checkBuriedPoint() {
    if (window[YM_BURIED_POINT]) {
        return true;
    }
    else {
        console.error('The buried point must be initialized first');
        return false;
    }
}
