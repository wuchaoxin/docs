/**
 * @description 关于 detail 相关的类型声明
 */
export declare type System = "windows" | "macos" | "linux" | "android" | "ios" | "unknow";
export declare type Platform = "desktop" | "mobile" | "unknow";
export declare type Engine = "webkit" | "gecko" | "presto" | "trident" | "unknow";
export declare type Supporter = "edge" | "opera" | "chrome" | "safari" | "firefox" | "opera" | "iexplore" | "unknow";
export declare type Shell = "weChat" | "qq" | "uc" | "360" | "2345" | "sougou" | "liebao" | "maxthon" | "none";
export declare type Detail = {
    engine: Engine;
    engineVs: string;
    platform: Platform;
    supporter: Supporter;
    supporterVs: string;
    system: System;
    systemVs: string;
} & ({
    shell?: undefined;
    shellVs?: undefined;
} | {
    shell: Shell;
    shellVs: string;
});
