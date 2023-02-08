export declare type ShareType = 'weChatMoments' | 'weChatFriends' | 'QQ' | 'microBlog' | 'QQSpace';
export interface ShareConfig {
    title: string;
    desc: string;
    link: string;
    imgUrl: string;
    callback?: (type: ShareType) => void;
}
export interface Config {
    appId: string;
    nonceStr: string;
    signature: string;
    timestamp: number;
    url: string;
}
