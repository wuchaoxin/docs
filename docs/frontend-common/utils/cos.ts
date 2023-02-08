/**
 * @description 该文件旨在操作 cos 腾讯的存储桶
 */
import Cos, {
  CosObject,
  DeleteMultipleObjectParams,
  DeleteObjectParams,
  GetBucketParams,
  UploadFileParams,
  UploadFilesParams,
  UploadFilesResult,
} from 'cos-js-sdk-v5'
import { CONFIG, REQUEST_INFO, ROOT } from './types/const/cos'
import request from './request'
import { Data } from './types/typings/request'
import {
  COSInfo,
  FileType,
  RemoveFileHandleFn,
  UploadFileHandleFn,
  UploadMultipleFilesHandleFn,
  UploadFile,
  UploadMultipleFiles,
} from './types/typings/cos'
import { getProject } from './environment'

let cos: undefined | Cos = undefined

// #region uploadFile
/**
 * @description 上传文件到腾讯云 (单文件上传)
 * @param {File} file 文件
 * @param {FileType} type 文件类型
 * @param {UploadFileHandleFn} handle 各个状态下操作函数
 * @returns {UploadFile}
 * @example
 */
// #endregion uploadFile
export function uploadFile(
  file: File,
  type: FileType = 'img',
  handle?: UploadFileHandleFn,
  uploadFileParams?: UploadFileParams
): UploadFile {
  if (!file.size) return Promise.reject('未选择上传文件')
  return new Promise((resolve, reject) => {
    const { bucket, region, key } = getInfo(type)
    initCOS(false)
      .then(() => {
        // 文件名
        let fileName = String(file.name)
        // 文件名加时间戳避重
        fileName = fileName.substring(0, fileName.lastIndexOf('.')) + '_' + uuid() + fileName.substring(fileName.lastIndexOf('.'))
        const objKey = key + fileName
        // 文件上传
        cos
          .uploadFile({
            Bucket: bucket,
            Region: region,
            Key: objKey,
            Body: file,
            SliceSize: 1024 * 1024 * 5,
            onProgress: function (info) {
              const percent = parseInt((info.percent * 10000).toString()) / 100 + '%'
              const speed = parseInt(((info.speed / 1024 / 1024) * 100).toString()) / 100 + 'Mb/s'
              handle?.progress?.({ percent, speed, loaded: info.loaded, total: info.total })
            },
            ...uploadFileParams,
          })
          .then((data) => {
            // cos域名替换为省流域名
            const url = replaceQcloudDomain(data.Location) || ''
            resolve({
              url,
              fileName,
            })
            handle?.success?.({ url, fileName })
          })
          .catch((err) => {
            handle?.error?.(err)
            reject(err)
          })
      })
      .catch(() => {
        reject('Initialization COS failed')
      })
  })
}

// #region uploadMultipleFiles
/**
 * @description 上传文件到腾讯云 (多文件上传，目前只支持多文件上传到同一桶，不支持多文件不同桶混传)
 * @param {File[]} fileList 文件列表
 * @param {FileType} type 文件类型
 * @param {UploadMultipleFilesHandleFn} handle 各个状态下操作函数
 * @param {UploadFilesParams} uploadFilesParams 参数
 * @returns {UploadMultipleFiles}
 * @example
 */
// #endregion uploadMultipleFiles
export function uploadMultipleFiles(
  fileList: File[],
  type: FileType = 'img',
  handle?: UploadMultipleFilesHandleFn,
  uploadFilesParams?: UploadFilesParams
): UploadMultipleFiles {
  if (!fileList.length || !fileList[0].size) return Promise.reject('未选择上传文件')
  return new Promise((resolve, reject) => {
    const limitSliceSize = 1024 * 1024 * 10
    const { bucket, region, key } = getInfo(type)
    initCOS(false)
      .then(() => {
        const tempFiles = [] as any
        fileList.forEach((file) => {
          let fileName = String(file.name)
          fileName = fileName.substring(0, fileName.lastIndexOf('.')) + '_' + uuid() + fileName.substring(fileName.lastIndexOf('.'))
          const objKey = key + fileName
          const tempObj = {
            Bucket: bucket,
            Region: region,
            Key: objKey,
            Body: file,
          }
          tempFiles.push(tempObj)
        })
        // 多文件上传
        cos
          .uploadFiles({
            files: tempFiles,
            SliceSize: limitSliceSize,
            onProgress: function (info) {
              const percent = parseInt((info.percent * 10000).toString()) / 100 + '%'
              const speed = parseInt(((info.speed / 1024 / 1024) * 100).toString()) / 100 + 'Mb/s'
              handle?.progress?.({ percent, speed })
            },
            ...uploadFilesParams,
          })
          .then((data) => {
            const { files } = data
            const urlList: string[] = []
            const _files = JSON.parse(JSON.stringify(files)) as UploadFilesResult['files']
            _files.forEach(function (item) {
              item.data.Location = replaceQcloudDomain(item.data.Location)
              urlList.push(replaceQcloudDomain(item.data.Location))
            })
            resolve({
              urlList,
              source: _files,
            })
            handle?.success?.({
              urlList,
              source: _files,
            })
          })
          .catch((err) => {
            handle?.error?.(err)
            reject(err)
          })
      })
      .catch(() => {
        reject('Initialization COS failed')
      })
  })
}

// #region removeFile
/**
 * @description 删除腾讯云上的文件
 * @param {string} fileName 文件名称
 * @param {FileType} type 文件类型
 * @param {HandleFn} handle 各个状态下操作函数
 * @param {DeleteObjectParams} deleteObjectParams 参数
 * @returns {Promise<void>}
 * @example
 */
// #endregion removeFile
export function removeFile(
  fileName: string,
  type: FileType = 'img',
  handle?: RemoveFileHandleFn,
  deleteObjectParams?: DeleteObjectParams
): Promise<void> {
  return new Promise((resolve, reject) => {
    const { bucket, region, key } = getInfo(type)
    initCOS(false)
      .then(() => {
        cos
          .deleteObject({
            Bucket: bucket,
            Region: region,
            Key: key + fileName,
            ...deleteObjectParams,
          })
          .then((_data) => {
            resolve()
            handle?.success?.()
          })
          .catch((err) => {
            reject(err)
            handle?.error?.(err)
          })
      })
      .catch(() => {
        reject('Initialization COS failed')
      })
  })
}

// #region removeMultipleFiles
/**
 * @description 删除腾讯云上的多个文件
 * @param {string[]} fileNameList 文件名称列表
 * @param {FileType} type 文件类型
 * @param {HandleFn} handle 各个状态下操作函数
 * @param {DeleteObjectParams} deleteObjectParams 参数
 * @returns {Promise<void>}
 * @example
 */
// #endregion removeMultipleFiles
export function removeMultipleFiles(
  fileNameList: string[],
  type: FileType,
  handle?: RemoveFileHandleFn,
  deleteMultipleObjectParams?: DeleteMultipleObjectParams
): Promise<void> {
  return new Promise((resolve, reject) => {
    const { bucket, region, key } = getInfo(type)
    const objects = (() => {
      const result = []
      for (const item of fileNameList) {
        result.push({ Key: key + item })
      }
      return result
    })()
    initCOS(false)
      .then(() => {
        cos
          .deleteMultipleObject({
            Bucket: bucket,
            Region: region,
            Objects: objects,
            ...deleteMultipleObjectParams,
          })
          .then((_data) => {
            resolve()
            handle?.success?.()
          })
          .catch((err) => {
            reject(err)
            handle?.error?.(err)
          })
      })
      .catch(() => {
        reject('Initialization COS failed')
      })
  })
}

// #region createDir
/**
 * @description 创建目录
 * @param {string} dir
 * @returns {Promise<void>}
 * @example
 */
// #endregion createDir
export function createDir(dir: string, type: FileType = 'img'): Promise<void> {
  return new Promise((resolved, rejected) => {
    const { bucket, region, key } = getInfo(type)
    initCOS(false)
      .then(() => {
        cos
          .putObject({
            Bucket: bucket,
            Region: region,
            Key: dir,
            Body: '',
          })
          .then(() => {
            resolved()
          })
          .catch(() => {
            rejected()
          })
      })
      .catch(() => {
        rejected('Initialization COS failed')
      })
  })
}

// #region getDirFiles
/**
 * @description 列出目录下的所有文件
 * @param {string} dir
 * @param {FileType} type
 * @returns {Promise<CosObject[]>}
 * @example
 */
// #endregion getDirFiles
export function getDirFiles(dir: string, type: FileType = 'img', getBucketParams: GetBucketParams): Promise<CosObject[]> {
  return new Promise((resolved, rejected) => {
    const { bucket, region } = getInfo(type)
    initCOS(false)
      .then(() => {
        cos
          .getBucket({
            Bucket: bucket,
            Region: region,
            Prefix: dir,
            ...getBucketParams,
          })
          .then((data) => {
            resolved(data.Contents)
          })
          .catch((err) => {
            rejected(err)
          })
      })
      .catch(() => {
        rejected('Initialization COS failed')
      })
  })
}

function getInfo(type: FileType) {
  if (type === 'img') {
    return {
      bucket: CONFIG.IMG_BUCKET,
      region: CONFIG.REGION,
      key: CONFIG.COS_IMG_OBJ_KEY,
    }
  } else {
    return {
      bucket: CONFIG.VIDEO_BUCKET,
      region: CONFIG.REGION,
      key: CONFIG.COS_VIDEO_OBJ_KEY,
    }
  }
}

function replaceQcloudDomain(url: string) {
  let _url = url.toLowerCase()
  const qcloudMovieStr = CONFIG.VIDEO_BUCKET + '.cos.' + CONFIG.REGION + '.myqcloud.com'
  const qcloudFileStr = CONFIG.IMG_BUCKET + '.cos.' + CONFIG.REGION + '.myqcloud.com'
  if (url.indexOf(qcloudMovieStr) != -1) {
    _url = url.replace(qcloudMovieStr, ROOT.MOVIE_URL)
  }
  if (url.indexOf(qcloudFileStr) != -1) {
    _url = url.replace(qcloudFileStr, ROOT.IMG_URL)
  }
  // 正则验证，是否以http://或者https://开头
  const reg = /^(http|https):\/\//gi
  if (!_url.match(reg)) {
    _url = 'https://' + _url
  }
  return _url
}

/**
 * @description 初始化 COS 实例化
 * @param {boolean} forceUpdate 是否强制更新（暂时没用）
 * @returns {Promise<void>}
 * @example
 */
function initCOS(forceUpdate: boolean): Promise<void> {
  if (cos && !forceUpdate) {
    return Promise.resolve()
  } else {
    return new Promise((resolved, rejected) => {
      const config = getRequestConfig()
      if (!config) {
        rejected("Can't find which project")
        console.error("Can't find which project")
        return
      }
      cos = new Cos({
        getAuthorization(_options, callback) {
          // 签名过期后，会再次执行获取新的 id 和 key
          const defaultConfig = {
            method: 'get',
            url: config.url,
            headers: {
              ...config.header,
            },
          }
          request(Object.assign({}, defaultConfig, config))
            .then((res: Data<COSInfo>) => {
              const data = res.data
              callback({
                TmpSecretId: data.tmpSecretId,
                TmpSecretKey: data.tmpSecretKey,
                SecurityToken: data.sessionToken,
                StartTime: data.startTime,
                ExpiredTime: data.expiredTime,
              })
            })
            .catch(() => {
              callback('Error getting signature')
            })
        },
      })
      resolved()
    })
  }
}

// 获取请求设置
function getRequestConfig() {
  const project = getProject()
  const config = REQUEST_INFO[project]
  if (config) {
    const header = (() => {
      if (typeof config.header === 'function') {
        return config.header()
      } else {
        return config.header
      }
    })()
    return {
      url: config.url,
      header: header,
    }
  } else {
    return null
  }
}

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
