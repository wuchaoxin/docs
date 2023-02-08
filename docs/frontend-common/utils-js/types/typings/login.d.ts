import { DoAppUserLoginAction } from './JSBridge';
export interface LoginParamsForWechat {
    target: string;
    params?: AnyObject;
    wait?: number;
    attachFn?: () => void;
}
export interface LoginParamsForApp {
    callback?: (data: DoAppUserLoginAction) => void;
}
