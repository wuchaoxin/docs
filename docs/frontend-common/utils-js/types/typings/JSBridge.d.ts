import { EVENT_TYPE } from "../const/JSBridge";
export interface MessageForIOS {
    handlerName: string;
    data?: null | AnyObject;
    callbackId?: string;
    responseId?: string;
    responseData?: unknown;
}
export interface MessageForAndroid {
    handlerName?: string;
    data?: null | AnyObject;
    callbackId?: string;
    responseId?: string;
    responseData?: unknown;
}
export declare type ResponseCallback = (payload: Dynamic) => void;
export declare type EventType = typeof EVENT_TYPE[keyof typeof EVENT_TYPE];
export interface Bridge {
    platform: Platform;
    _event: Array<{
        fn: Function;
        type: EventType;
    }>;
    isReady: boolean;
    ready: (fn: Function, options?: ReadyOptions) => void;
    forceReady: (fn: Function) => void;
    getAppUserInfo: () => Promise<GetAppUserInfo | ''>;
    doAppUserLoginAction: () => Promise<DoAppUserLoginAction>;
    handleAppUserLoginAction: (callback: (loginInfo: DoAppUserLoginAction) => void) => void;
    getAppBaseInfo: () => Promise<GetAppBaseInfo>;
    setShare: (parmas: SetShareParams) => Promise<SetShare>;
    cancelShare: () => void;
    share: (params?: ShareParams) => Promise<Share>;
    notifyLoginExpiration: () => Promise<void>;
    close: () => void;
    pageShow: (callback: (data: Dynamic) => void) => void;
}
export interface ReadyOptions {
    forceWaitApp?: boolean;
}
export declare type Platform = undefined | null | 'iOS' | 'android' | 'harmony';
export interface GetAppUserInfo {
    id: number;
    memberStatus: 0 | 1;
    mobile: string;
    name: string;
    nickName: string;
}
export interface DoAppUserLoginAction {
    isLogin: 0 | 1;
    cookie: string;
}
export interface GetAppBaseInfo {
    UDID: string;
    OS: Platform;
}
export declare type SetShareParams = {
    title: string;
    desc: string;
    link: string;
    imgUrl: string;
    platform?: Array<SharePlatform>;
    buriedPointInfo?: BuriedPointInfo;
    card?: Card;
};
export declare type SharePlatform = 'weChatFriends' | 'weChatMoments' | 'microBlog';
export interface Card {
    title?: string;
    desc?: Array<string>;
    imgUrl: string;
    QRCode?: string;
    hint?: string;
    backgroundColor?: string;
}
export interface SetShare {
    isShare: 0 | 1;
    type: SetShareType;
}
export declare type SetShareType = 'weChatFriends' | 'weChatMoments' | 'microBlog' | 'card';
export declare type ShareParams = {
    type?: ShareParamsType;
    buriedPointInfo?: BuriedPointInfo;
    vaccineResults?: VaccineResults[];
};
export declare type ShareParamsType = 'normal' | 'vaccineResults';
export interface BuriedPointInfo {
    title: string;
}
export interface VaccineResults {
    name: string;
    icon: string;
    info: string[];
}
export interface Share {
    isShare: 0 | 1;
    type: ShareType;
}
export declare type ShareType = 'weChatFriends' | 'weChatMoments' | 'card' | 'vaccineResults';
