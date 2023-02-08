import Dropzone, { DropzoneDictFileSizeUnits, DropzoneFile, DropzoneOptions, DropzoneResizeInfo } from 'dropzone'

export interface CustomDropzoneFile extends DropzoneFile {
  // 是否是手动加入
  manuallyAdded?: boolean
  cos?: {
    url: string
    fileName: string
  }
}

declare function setOption(option: 'url', val: ((files: ReadonlyArray<DropzoneFile>) => string) | string | undefined): void
declare function setOption(option: 'method', val: ((files: ReadonlyArray<DropzoneFile>) => string) | string | undefined): void
declare function setOption(option: 'withCredentials', val: boolean | undefined): void
declare function setOption(option: 'timeout', val: number | undefined): void
declare function setOption(option: 'parallelUploads', val: number | undefined): void
declare function setOption(option: 'uploadMultiple', val: boolean | undefined): void
declare function setOption(option: 'chunking', val: boolean | undefined): void
declare function setOption(option: 'forceChunking', val: boolean | undefined): void
declare function setOption(option: 'chunkSize', val: number | undefined): void
declare function setOption(option: 'parallelChunkUploads', val: boolean | undefined): void
declare function setOption(option: 'retryChunks', val: boolean | undefined): void
declare function setOption(option: 'retryChunksLimit', val: number | undefined): void
declare function setOption(option: 'maxFilesize', val: number | undefined): void
declare function setOption(option: 'paramName', val: string | undefined): void
declare function setOption(option: 'createImageThumbnails', val: boolean | undefined): void
declare function setOption(option: 'maxThumbnailFilesize', val: number | undefined): void
declare function setOption(option: 'thumbnailWidth', val: number | undefined): void
declare function setOption(option: 'thumbnailHeight', val: number | undefined): void
declare function setOption(option: 'thumbnailMethod', val: 'contain' | 'crop' | undefined): void
declare function setOption(option: 'resizeWidth', val: number | undefined): void
declare function setOption(option: 'resizeHeight', val: number | undefined): void
declare function setOption(option: 'resizeMimeType', val: string | undefined): void
declare function setOption(option: 'resizeQuality', val: number | undefined): void
declare function setOption(option: 'resizeMethod', val: 'contain' | 'crop' | undefined): void
declare function setOption(option: 'filesizeBase', val: number | undefined): void
declare function setOption(option: 'maxFiles', val: number | undefined): void
declare function setOption(option: 'params', val: {} | undefined): void
declare function setOption(option: 'headers', val: { [key: string]: string } | undefined): void
declare function setOption(option: 'clickable', val: boolean | string | HTMLElement | (string | HTMLElement)[] | undefined): void
declare function setOption(option: 'ignoreHiddenFiles', val: boolean | undefined): void
declare function setOption(option: 'acceptedFiles', val: string | undefined): void
declare function setOption(option: 'renameFilename', val: (name: string) => string): void
declare function setOption(option: 'autoProcessQueue', val: boolean | undefined): void
declare function setOption(option: 'autoQueue', val: boolean | undefined): void
declare function setOption(option: 'addRemoveLinks', val: boolean | undefined): void
declare function setOption(option: 'previewsContainer', val: boolean | string | HTMLElement | undefined): void
declare function setOption(option: 'hiddenInputContainer', val: HTMLElement | undefined): void
declare function setOption(option: 'capture', val: string | undefined): void
declare function setOption(option: 'dictDefaultMessage', val: string | undefined): void
declare function setOption(option: 'dictFallbackMessage', val: string | undefined): void
declare function setOption(option: 'dictFallbackText', val: string | undefined): void
declare function setOption(option: 'dictFileTooBig', val: string | undefined): void
declare function setOption(option: 'dictInvalidFileType', val: string | undefined): void
declare function setOption(option: 'dictResponseError', val: string | undefined): void
declare function setOption(option: 'dictCancelUpload', val: string | undefined): void
declare function setOption(option: 'dictCancelUploadConfirmation', val: string | undefined): void
declare function setOption(option: 'dictRemoveFile', val: string | undefined): void
declare function setOption(option: 'dictRemoveFileConfirmation', val: string | undefined): void
declare function setOption(option: 'dictMaxFilesExceeded', val: string | undefined): void
declare function setOption(option: 'dictFileSizeUnits', val: DropzoneDictFileSizeUnits | undefined): void
declare function setOption(option: 'dictUploadCanceled', val: string | undefined): void
declare function setOption(option: 'accept', val: (file: DropzoneFile, done: (error?: string | Error) => void) => void): void
declare function setOption(option: 'chunksUploaded', val: (file: DropzoneFile, done: (error?: string | Error) => void) => void): void
declare function setOption(option: 'init', val: (this: Dropzone) => void): void
declare function setOption(option: 'forceFallback', val: boolean | undefined): void
declare function setOption(option: 'fallback', val: () => void): void
declare function setOption(
  option: 'resize',
  val: (file: DropzoneFile, width?: number, height?: number, resizeMethod?: string) => DropzoneResizeInfo
): void
declare function setOption(option: 'drop', val: (e: DragEvent) => void): void
declare function setOption(option: 'dragstart', val: (e: DragEvent) => void): void
declare function setOption(option: 'dragend', val: (e: DragEvent) => void): void
declare function setOption(option: 'dragenter', val: (e: DragEvent) => void): void
declare function setOption(option: 'paste', val: (e: DragEvent) => void): void
declare function setOption(option: 'reset', val: () => void): void
declare function setOption(option: 'addedfile', val: (file: DropzoneFile) => void): void
declare function setOption(option: 'addedfiles', val: (file: DropzoneFile) => void): void
declare function setOption(option: 'removedfile', val: (file: DropzoneFile) => void): void
declare function setOption(option: 'thumbnail', val: (file: DropzoneFile, dataUrl: string) => void): void
declare function setOption(option: 'error', val: (file: DropzoneFile, message: string | Error, xhr: XMLHttpRequest) => void): void
declare function setOption(
  option: 'errormultiple',
  val: (files: DropzoneFile[], message: string | Error, xhr: XMLHttpRequest) => void
): void
declare function setOption(option: 'processing', val: (file: DropzoneFile) => void): void
declare function setOption(option: 'processingmultiple', val: (files: DropzoneFile[]) => void): void
declare function setOption(option: 'uploadprogress', val: (file: DropzoneFile, progress: number, bytesSent: number) => void): void
declare function setOption(
  option: 'totaluploadprogress',
  val: (totalProgress: number, totalBytes: number, totalBytesSent: number) => void
): void
declare function setOption(option: 'sending', val: (file: DropzoneFile, xhr: XMLHttpRequest, formData: FormData) => void): void
declare function setOption(option: 'sendingmultiple', val: (files: DropzoneFile[], xhr: XMLHttpRequest, formData: FormData) => void): void
declare function setOption(option: 'success', val: (file: DropzoneFile) => void): void
declare function setOption(option: 'successmultiple', val: (files: DropzoneFile[], responseText: string) => void): void
declare function setOption(option: 'canceled', val: (file: DropzoneFile) => void): void
declare function setOption(option: 'canceledmultiple', val: (file: DropzoneFile[]) => void): void
declare function setOption(option: 'complete', val: (file: DropzoneFile) => void): void
declare function setOption(option: 'completemultiple', val: (file: DropzoneFile[]) => void): void
declare function setOption(option: 'maxfilesexceeded', val: (file: DropzoneFile) => void): void
declare function setOption(option: 'maxfilesreached', val: (files: DropzoneFile[]) => void): void
declare function setOption(option: 'queuecomplete', val: () => void): void
declare function setOption(option: 'transformFile', val: (file: DropzoneFile, done: (file: string | Blob) => void) => void): void
declare function setOption(option: 'previewTemplate', val: string | undefined): void

export interface DropzoneInstance {
  removeAllFiles: (bool: boolean) => void
  manuallyAddFile: (file: CustomDropzoneFile, fileUrl: string) => void
  removeFile: (file: CustomDropzoneFile) => void
  processQueue: () => void
  getAcceptedFiles: () => DropzoneFile[]
  getRejectedFiles: () => DropzoneFile[]
  getQueuedFiles: () => DropzoneFile[]
  getUploadingFiles: () => DropzoneFile[]
  disable: () => void
  enable: () => void
  getDropzoneInstance: () => Dropzone
  setOption: typeof setOption
}
