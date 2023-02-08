/**
 * @description 根据传入的设计图尺寸进行计算适应屏幕的尺寸
 */
declare class Desgin {
    standardWidth: any;
    constructor(standardWidth?: number);
    /**
     * @description px2px 根据屏幕宽度来得出应有的 px
     * @param {number|string} value
     * @param {boolean} isCarryCompany 是否携带单位
     * @returns {string}
     */
    px2px(value: number | string, isCarryCompany?: boolean): string;
    /**
     * @description px2viewport（目的：如果使用最新 v-bind in css 语法，postcss 是无法进行转换，因为已经处于运行时）
     * @param {string | number} originPx px 值
     * @returns {string}
     */
    px2viewport(originPx: number | string): string;
    /**
     * @description px2percentage 根据设计稿宽度，计算出相关的百分比
     * @param {number|string} value
     * @returns {string}
     */
    px2percentage(value: string | number): string;
}
export default Desgin;
export declare const defaultDesgin: Desgin;
