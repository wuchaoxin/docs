import { AddVal } from './types/typings/storage';
/**
 * @description 简单封装 storage 相关
 */
export declare class LocalStorage {
    get(key: string): unknown;
    get(key: string, type: 'string'): string;
    get(key: string, type: 'Array'): Array<unknown>;
    get(key: string, type: 'Object'): AnyObject;
    add(key: string, val: AddVal): void;
    delete(key: string): void;
    clear(): void;
}
export default LocalStorage;
export declare const defaultLocalStorage: LocalStorage;
