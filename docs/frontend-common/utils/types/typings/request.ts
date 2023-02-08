/**
 * @description 请求公共接口类型
 */
import { AxiosRequestConfig } from 'axios'

export type Data<T = unknown> = {
  code: number
  msg?: string
  data: T
}
export interface PageData<T = unknown> {
  // 当前页的数据
  rows: T[]
  // 总共的数据
  total: number
}
export type ReAxiosPromise<T = any> = Promise<T>

type Reuqest = Array<'get' | 'GET' | 'post' | 'POST'>
type AppendData = {
  key: string
  value: string | (() => string | undefined)
  params: Reuqest
  data: Reuqest
}

export interface AxiosCustomConfig {
  // #region AxiosCustomConfig
  // 是否开启去除重复请求
  noRepeat: boolean
  cache: {
    // 是否开启缓存
    storage: boolean
    // 需要缓存多久
    storageTime: number
  }
  // 请求失败后，是否重复请求
  retry: {
    // 重复请求几次
    retries: number
    // 控制重试请求之间的延迟。
    retryDelay: number
    // 选择哪些 api 需要进行重复请求
    apis?: Array<string>
  }
  // 追加参数列表（方法以区分大小写）
  appendData: Array<AppendData>
  // 追加消息头配置
  appendHeader: {
    [key: string]: (config?: AxiosCustomRequestConfig) => string
  }
  // 错误提示函数
  errorHint?: (config: Record<string, unknown>) => void
  // #endregion AxiosCustomConfig
}

export interface AxiosCustomRequestConfig extends AxiosRequestConfig {
  // #region AxiosCustomRequestConfig
  // 是否开启去除重复请求
  noRepeat?: boolean
  // 请求失败后，是否重复请求
  retry?: boolean
  // 请求数据方式是否为表单
  formData?: boolean
  // 是否开启缓存
  cache?: boolean
  // 缓存过期时间
  storageTime?: number
  // 是否需要进度条
  progressBar?: boolean
  // 错误提示函数
  errorHint?: (config: Record<string, unknown>) => void
  // #endregion AxiosCustomRequestConfig
}

export interface AxiosCustomResponseConfig<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosCustomRequestConfig
  request?: any
}

export interface Cache {
  [key: string]: CacheItem
}

export interface CacheItem {
  storageExpire: number
  data: Record<string, unknown>
}
