export interface Options<T = unknown> {
    url: "string";
    type: "GET" | "POST";
    body: string;
    data: T;
}
export interface Params {
    url: "string";
    type: "GET" | "POST";
    params: AnyObject<string>;
    body: AnyObject;
}
