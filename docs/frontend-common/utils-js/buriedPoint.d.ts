/**
 * @description 埋点相关
 */
import { BaseConfig, Event, PageConfig } from './types/typings/buriedPoint';
/**
 * @description 初始化埋点
 * @param {BaseConfig} baseConfig 上报基础信息配置
 * @param {PageConfig} pageConfig 页面基础信息配置
 * @param {Event} event 事件相关配置
 * @returns {void}
 * @example
 */
export declare function initBuriedPoint(baseConfig: BaseConfig, pageConfig: PageConfig, event: Event): boolean;
/**
 * @description 埋点触发
 * @param {string} eventName 事件名
 * @param {AnyObject} eventMap 预置属性
 * @returns {void}
 * @example
 */
export declare function sensorsTrack(eventName: string, eventMap: AnyObject): void;
/**
 * @description web 浏览页面事件上报（该方法一般放在路由拦截器中）
 * @param {string} eventName web 浏览页面事件名称
 * @returns {void}
 * @example
 */
export declare function pageViewTrack(eventName: string): void;
/**
 * @description 获取数据上报的 key 和 secret
 * @param {'YM' | 'YMGJ'} type 上报的数据项目
 * @returns {string}
 * @example
 */
export declare function getAppKeyAndSecret(type: 'YM' | 'YMGJ'): {
    readonly appkey: "3156a3563ee0760630439952440aed728e4ae0ae7fd38f38890a9efd6eda48be";
    readonly secret: "962aee93b65b9c7de7f33667e80dd1a7462a946fb0da4ca0fa756b6a7d17cfc6af309c926108fc0ad50d85133382bd90ac90e2abc60df5e24d9afb2495d12961";
} | {
    readonly appkey: "8b2a7bfdf95a3c30aa63d7a1148af1516c8a285a054dd9085c061dfccaf04dfd";
    readonly secret: "cc3ce15666dde9e6961b417a5370764d73a4f6095dbfec184506cb445ec63a26049ad74735e5c000d1308c7b3e1cf4b6a251a8da8f3103dd4148765f8570b946";
} | {
    readonly appkey: "e615606750e656cf5a59c175cec9a38ce3a5d4b44c0300ff9ec42e641dcececa";
    readonly secret: "e9c05673e75d51e29521b67eb5197579c21b3c1e7aa41bfc0134a22471855c14128121de3746c4658c2ba9e97ae055ff206ec689c3bca0c4700b4f405b1c3a6d";
} | {
    readonly appkey: "dbc3f3b4c1777060d7dde7ebb936174a05483de3c4ede753ddc20a53098bd995";
    readonly secret: "dae831b33d39b2fd4c0362c5fdad72564ad69fbdae26002c9fe10bdb5e65ea783fc1455ca6fff9f56509873ce6077287d734e8271ba7f8336f02432f6640348a";
} | {
    readonly appkey: "e8209851b6778a72e92de325a62b1257c0f9b71082e9033ecd241eb68b2d9121";
    readonly secret: "ec374e40a926128271093be9102a2d1e826e3e1efc972d1094a7c648e9e6b70feb26aef9a4bcd46aafe0bf3d8f0b2037f19c40be5e7c2e485d03cfde16149617";
} | {
    readonly appkey: "e8209851b6778a72e92de325a62b1257c0f9b71082e9033ecd241eb68b2d9121";
    readonly secret: "ec374e40a926128271093be9102a2d1e826e3e1efc972d1094a7c648e9e6b70feb26aef9a4bcd46aafe0bf3d8f0b2037f19c40be5e7c2e485d03cfde16149617";
};
