export declare const REQUEST_INFO: {
    /**
     * 公众号：/base/cos/temp-credential.do header 需要加 tk
     * 市场端、运营端：/mk-opt/cos/temp-credential.do 需要加 mid（1：man端 2：市场端 3：运营端 4：苗助手公众号端）
     */
    readonly YM_HTML: {
        readonly url: "/base/cos/temp-credential.do";
        readonly header: () => {
            tk: string;
        };
    };
    readonly IN_MARKET: {
        readonly url: "/mk-opt/cos/temp-credential.do";
        readonly header: {
            readonly mid: 2;
        };
    };
    readonly IN_OPERATION: {
        readonly url: "/mk-opt/cos/temp-credential.do";
        readonly header: {
            readonly mid: 3;
        };
    };
    readonly IN_MAN_MOBILE: {
        readonly url: "/mk-opt/cos/temp-credential.do";
        readonly header: {
            readonly mid: 4;
        };
    };
};
export declare const CONFIG: {
    readonly IMG_BUCKET: "adultvacc-1253522668";
    readonly VIDEO_BUCKET: "adultvaccmovie-1253522668";
    readonly REGION: "ap-guangzhou";
    readonly COS_IMG_OBJ_KEY: "thematic pic/";
    readonly COS_VIDEO_OBJ_KEY: "hospitalmovie/";
};
export declare const ROOT: {
    readonly IMG_URL: "img.scmttec.com";
    readonly MOVIE_URL: "movie.scmttec.com";
};
export declare const ACCEPT: {
    readonly IMAGE: ".jpg,.png,.jpeg,.gif";
    readonly VIDEO: ".mov,.mp4";
    readonly FILE: ".doc,.docx";
};
