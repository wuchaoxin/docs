/**
 * @description 请求公共接口类型
 */
import { AxiosRequestConfig } from 'axios';
export declare type Data<T = unknown> = {
    code: number;
    msg?: string;
    data: T;
};
export interface PageData<T = unknown> {
    rows: T[];
    total: number;
}
export declare type ReAxiosPromise<T = any> = Promise<T>;
declare type Reuqest = Array<'get' | 'GET' | 'post' | 'POST'>;
declare type AppendData = {
    key: string;
    value: string | (() => string | undefined);
    params: Reuqest;
    data: Reuqest;
};
export interface AxiosCustomConfig {
    noRepeat: boolean;
    cache: {
        storage: boolean;
        storageTime: number;
    };
    retry: {
        retries: number;
        retryDelay: number;
        apis?: Array<string>;
    };
    appendData: Array<AppendData>;
    appendHeader: {
        [key: string]: (config?: AxiosCustomRequestConfig) => string;
    };
    errorHint?: (config: Record<string, unknown>) => void;
}
export interface AxiosCustomRequestConfig extends AxiosRequestConfig {
    noRepeat?: boolean;
    retry?: boolean;
    formData?: boolean;
    cache?: boolean;
    storageTime?: number;
    progressBar?: boolean;
    errorHint?: (config: Record<string, unknown>) => void;
}
export interface AxiosCustomResponseConfig<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: AxiosCustomRequestConfig;
    request?: any;
}
export interface Cache {
    [key: string]: CacheItem;
}
export interface CacheItem {
    storageExpire: number;
    data: Record<string, unknown>;
}
export {};
