import { getRightTypeVal } from './formatter';
/**
 * @description 简单封装 storage 相关
 */
export class LocalStorage {
    get(key, type) {
        const valStr = localStorage.getItem(key);
        if (valStr && valStr.includes('storageTime')) {
            const val = JSON.parse(valStr);
            if (val.expires) {
                const now = getNowTime();
                if (now - val.storageTime > val.expires) {
                    this.delete(key);
                    return getVal(null);
                }
            }
            try {
                const result = JSON.parse(valStr);
                const val = result.val;
                return getVal(val);
            }
            catch {
                return getVal(null);
            }
        }
        else {
            return getVal(valStr);
        }
        function getVal(val) {
            if (type === 'Array') {
                return getRightTypeVal(val, 'Array');
            }
            else if (type === 'Object') {
                return getRightTypeVal(val, 'Object');
            }
            else if (type === 'string') {
                return getRightTypeVal(val, 'string');
            }
            else {
                return val;
            }
        }
    }
    add(key, val) {
        const temp = {
            ...val,
            storageTime: getNowTime(),
        };
        localStorage.setItem(key, JSON.stringify(temp));
    }
    delete(key) {
        localStorage.removeItem(key);
    }
    clear() {
        localStorage.clear();
    }
}
function getNowTime() {
    return new Date().getTime();
}
export default LocalStorage;
export const defaultLocalStorage = new LocalStorage();
