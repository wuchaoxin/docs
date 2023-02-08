import { AddVal, GetVal } from './types/typings/storage'
import { getRightTypeVal } from './formatter'

/**
 * @description 简单封装 storage 相关
 */
export class LocalStorage {
  // #region LocalStorage
  get(key: string): unknown
  get(key: string, type: 'string'): string
  get(key: string, type: 'Array'): Array<unknown>
  get(key: string, type: 'Object'): AnyObject
  get(key: string, type?: 'string' | 'Array' | 'Object'): string | Array<unknown> | AnyObject | null | unknown {
    const valStr = localStorage.getItem(key)
    if (valStr && valStr.includes('storageTime')) {
      const val = JSON.parse(valStr) as GetVal
      if (val.expires) {
        const now = getNowTime()
        if (now - val.storageTime > val.expires) {
          this.delete(key)
          return getVal(null)
        }
      }
      try {
        const result = JSON.parse(valStr)
        const val = result.val as null | string | Array<unknown> | AnyObject
        return getVal(val)
      } catch {
        return getVal(null)
      }
    } else {
      return getVal(valStr)
    }
    function getVal(val: string | Array<unknown> | AnyObject | null) {
      if (type === 'Array') {
        return getRightTypeVal(val, 'Array')
      } else if (type === 'Object') {
        return getRightTypeVal(val, 'Object')
      } else if (type === 'string') {
        return getRightTypeVal(val, 'string')
      } else {
        return val
      }
    }
  }
  add(key: string, val: AddVal): void {
    const temp = {
      ...val,
      storageTime: getNowTime(),
    }
    localStorage.setItem(key, JSON.stringify(temp))
  }
  delete(key: string) {
    localStorage.removeItem(key)
  }
  clear() {
    localStorage.clear()
  }
  // #endregion LocalStorage
}

function getNowTime() {
  return new Date().getTime()
}

export default LocalStorage

export const defaultLocalStorage = new LocalStorage()
