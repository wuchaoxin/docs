import { UploadFilesResult } from 'cos-js-sdk-v5'

export interface COSInfo {
  tmpSecretId: string
  tmpSecretKey: string
  sessionToken: string
  startTime: number
  expiredTime: number
  cosPath: string
  bucketName: string
}

export type FileType = 'img' | 'vedio'

export interface UploadFileHandleFn {
  success?: (info: { url: string; fileName: string }) => void
  error?: (err: unknown) => void
  // percent: 百分比；speed：速度；loaded：已上传的大小；total：整个文件的大小
  progress?: (info: { percent: string; speed: string; loaded: number; total: number }) => void
}
export interface UploadMultipleFilesHandleFn {
  success?: (info: { urlList: string[]; source: UploadFilesResult['files'] }) => void
  error?: (err: unknown) => void
  progress?: (info: { percent: string; speed: string }) => void
}
export interface RemoveFileHandleFn {
  success?: () => void
  error?: (err: unknown) => void
  progress?: (info: { percent: string; speed: string }) => void
}

export type UploadFile = Promise<{ url: string; fileName: string }>
export type UploadMultipleFiles = Promise<{ urlList: string[]; source: UploadFilesResult['files'] }>
