export interface BaseConfig {
    batch_send: boolean | BatchSend;
    name: 'Web';
}
export interface BatchSend {
    datasend_timeout?: number;
    send_interval?: number;
    one_send_max_length?: number;
}
export interface PageConfig {
    $appkey: string;
    $secret: string;
    $plate_id: number;
    $sensors_name: 'Web';
    $product_id: number;
}
export interface Event {
    [prop: string]: {
        event_id: number;
        event_name: string;
    };
}
export declare type Queue = QueueItem[];
export interface QueueItem {
    eventName: string;
    eventMap: AnyObject | (() => AnyObject);
}
