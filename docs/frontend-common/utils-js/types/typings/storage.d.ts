export interface AddVal {
    val: unknown;
    expires?: number;
}
export interface GetVal {
    val: unknown;
    expires?: number;
    storageTime: number;
}
