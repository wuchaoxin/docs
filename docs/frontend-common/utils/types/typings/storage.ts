export interface AddVal {
  // 设置的值
  val: unknown;
  // 过期时间（毫秒级别）
  expires?: number;
}

export interface GetVal {
  // 设置的值
  val: unknown;
  // 过期时间（毫秒级别）
  expires?: number;
  // 当时储存的时间
  storageTime: number;
}
