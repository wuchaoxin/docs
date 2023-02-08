import { getCookie } from '../../cookie';
import { USER_TOKEN_KEY } from './storage';
// 默认的请求URL
export const REQUEST_INFO = {
    /**
     * 公众号：/base/cos/temp-credential.do header 需要加 tk
     * 市场端、运营端：/mk-opt/cos/temp-credential.do 需要加 mid（1：man端 2：市场端 3：运营端 4：苗助手公众号端）
     */
    YM_HTML: {
        url: '/base/cos/temp-credential.do',
        header: () => ({ tk: getCookie(USER_TOKEN_KEY) || '' }),
    },
    IN_MARKET: {
        url: '/mk-opt/cos/temp-credential.do',
        header: {
            mid: 2,
        },
    },
    IN_OPERATION: {
        url: '/mk-opt/cos/temp-credential.do',
        header: {
            mid: 3,
        },
    },
    IN_MAN_MOBILE: {
        url: '/mk-opt/cos/temp-credential.do',
        header: {
            mid: 4,
        },
    },
};
// cos上传基础变量
export const CONFIG = {
    // 图片桶
    IMG_BUCKET: 'adultvacc-1253522668',
    // 视频桶
    VIDEO_BUCKET: 'adultvaccmovie-1253522668',
    // 区域名
    REGION: 'ap-guangzhou',
    // 图片对象键
    COS_IMG_OBJ_KEY: 'thematic pic/',
    // 视频对象键
    COS_VIDEO_OBJ_KEY: 'hospitalmovie/',
};
// cos资源省流域名
export const ROOT = {
    // 图片省流域名
    IMG_URL: 'img.scmttec.com',
    // 视频省流域名
    MOVIE_URL: 'movie.scmttec.com',
};
// 文件上传格式限制
export const ACCEPT = {
    // 图片上传格式限制
    IMAGE: '.jpg,.png,.jpeg,.gif',
    // 视频上传格式限制
    VIDEO: '.mov,.mp4',
    // 上传格式限制
    FILE: '.doc,.docx',
};
