/**
 * @description 根据传入的设计图尺寸进行计算适应屏幕的尺寸
 */
class Desgin {
    standardWidth;
    constructor(standardWidth = 375) {
        this.standardWidth = standardWidth;
    }
    // #region px2px
    /**
     * @description px2px 根据屏幕宽度来得出应有的 px
     * @param {number|string} value
     * @param {boolean} isCarryCompany 是否携带单位
     * @returns {string}
     */
    // #endregion px2px
    px2px(value, isCarryCompany = true) {
        const temp = (() => {
            if (typeof value === "number") {
                return value;
            }
            else {
                return Number(value.replace("px", ""));
            }
        })();
        if (Number.isNaN(temp)) {
            return "0";
        }
        else {
            const clientWidth = document.body.clientWidth || document.documentElement.clientWidth;
            const width = this.standardWidth;
            if (isCarryCompany) {
                return (clientWidth * temp) / width + "px";
            }
            else {
                return ((clientWidth * temp) / width).toString();
            }
        }
    }
    // #region px2viewport
    /**
     * @description px2viewport（目的：如果使用最新 v-bind in css 语法，postcss 是无法进行转换，因为已经处于运行时）
     * @param {string | number} originPx px 值
     * @returns {string}
     */
    // #endregion px2viewport
    px2viewport(originPx) {
        const temp = (() => {
            if (typeof originPx === "number") {
                return originPx;
            }
            else {
                return Number(originPx.replace("px", ""));
            }
        })();
        if (Number.isNaN(temp)) {
            return "0";
        }
        else {
            return ((temp * 100) / this.standardWidth).toFixed(3) + "vw";
        }
    }
    // #region px2percentage
    /**
     * @description px2percentage 根据设计稿宽度，计算出相关的百分比
     * @param {number|string} value
     * @returns {string}
     */
    // #endregion px2percentage
    px2percentage(value) {
        const temp = (() => {
            if (typeof value === "number") {
                return value;
            }
            else {
                return Number(value.replace("px", ""));
            }
        })();
        if (Number.isNaN(temp)) {
            return "0";
        }
        else {
            const percentageNumber = (temp / this.standardWidth) * 100;
            return percentageNumber + "%";
        }
    }
}
export default Desgin;
export const defaultDesgin = new Desgin();
