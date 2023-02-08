declare class UADetector {
    isApp(): Promise<boolean>;
    isAppSync(): boolean;
    isWeChat(): boolean;
    isWeiXin(): boolean;
    isChrome(): boolean;
    isSafari(): boolean;
    isMobile(): boolean;
    isDesktop(): boolean;
    isIOS(): boolean;
    isMac(): boolean;
    isAndroid(): boolean;
    isIexplore(): boolean;
    isIE(): boolean;
    getIexploreVersion(): boolean | string;
    getIEVersion(): boolean | string;
    getDetail(): import("../types/typings/UA").Detail;
}
export default UADetector;
export declare const defaultUADetector: UADetector;
