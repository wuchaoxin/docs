import { UploadFilesResult } from 'cos-js-sdk-v5';
export interface COSInfo {
    tmpSecretId: string;
    tmpSecretKey: string;
    sessionToken: string;
    startTime: number;
    expiredTime: number;
    cosPath: string;
    bucketName: string;
}
export declare type FileType = 'img' | 'vedio';
export interface UploadFileHandleFn {
    success?: (info: {
        url: string;
        fileName: string;
    }) => void;
    error?: (err: unknown) => void;
    progress?: (info: {
        percent: string;
        speed: string;
        loaded: number;
        total: number;
    }) => void;
}
export interface UploadMultipleFilesHandleFn {
    success?: (info: {
        urlList: string[];
        source: UploadFilesResult['files'];
    }) => void;
    error?: (err: unknown) => void;
    progress?: (info: {
        percent: string;
        speed: string;
    }) => void;
}
export interface RemoveFileHandleFn {
    success?: () => void;
    error?: (err: unknown) => void;
    progress?: (info: {
        percent: string;
        speed: string;
    }) => void;
}
export declare type UploadFile = Promise<{
    url: string;
    fileName: string;
}>;
export declare type UploadMultipleFiles = Promise<{
    urlList: string[];
    source: UploadFilesResult['files'];
}>;
