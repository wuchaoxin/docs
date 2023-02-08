
export const HTTP_CANCEL = "Cancel";
export const NETWORK_ERROR = "Network Error";
export const API_ERROR = "API Error";

// 成功
export let SUCCESS_CODE: string | number = "0000";
export function setSuccessCode(code: string | number) {
  SUCCESS_CODE = code;
}
// 登录失效
export const LOGIN_INVALID = "1001";
