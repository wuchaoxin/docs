export interface BaseConfig {
  // 是否批量上报
  batch_send: boolean | BatchSend
  name: 'Web'
}

export interface BatchSend {
  // 一次请求超过多少毫秒的话自动取消，防止请求无响应
  datasend_timeout?: number
  // 间隔多少毫秒发一次数据
  send_interval?: number
  // 一次请求最大发送几条数据，防止数据太大
  one_send_max_length?: number
}

export interface PageConfig {
  $appkey: string
  $secret: string
  // 平台ID
  $plate_id: number
  // 统计名称
  $sensors_name: 'Web'
  // 产品 id
  $product_id: number
}

export interface Event {
  [prop: string]: {
    event_id: number
    event_name: string
  }
}

export type Queue = QueueItem[]
export interface QueueItem {
  eventName: string
  eventMap: AnyObject | (() => AnyObject)
}
