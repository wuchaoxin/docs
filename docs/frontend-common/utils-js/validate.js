/**
 * @description 检验相关
 */
// #region validate
// 移动电话校验
export const REG_PHONE = /^1(3|4|5|6|7|8|9)\d{9}$/;
// Email 校验
export const REG_EMAIL = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
// 密码校验
export const REG_PASSWORD = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,16}$/;
// #endregion validate
