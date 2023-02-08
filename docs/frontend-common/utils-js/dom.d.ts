/**
 * @description DOM 相关的操作
 */
/**
 * @description switchScroll 移动端是否允许可滑动（注：如果一直处于滑动状态，禁用滑动将会在停止滑动后生效）
 * @param {boolean} isScroll 是否可滑动
 * @returns {void}
 * @example
 */
export declare function switchScroll(isScroll: boolean, html?: HTMLElement): void;
export declare function riseInput(input: HTMLElement | null, target: HTMLElement | null): void;
