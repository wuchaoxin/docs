/**
 * @description 该文件旨在操作 cos 腾讯的存储桶
 */
import { CosObject, DeleteMultipleObjectParams, DeleteObjectParams, GetBucketParams, UploadFileParams, UploadFilesParams } from 'cos-js-sdk-v5';
import { FileType, RemoveFileHandleFn, UploadFileHandleFn, UploadMultipleFilesHandleFn, UploadFile, UploadMultipleFiles } from './types/typings/cos';
/**
 * @description 上传文件到腾讯云 (单文件上传)
 * @param {File} file 文件
 * @param {FileType} type 文件类型
 * @param {UploadFileHandleFn} handle 各个状态下操作函数
 * @returns {UploadFile}
 * @example
 */
export declare function uploadFile(file: File, type?: FileType, handle?: UploadFileHandleFn, uploadFileParams?: UploadFileParams): UploadFile;
/**
 * @description 上传文件到腾讯云 (多文件上传，目前只支持多文件上传到同一桶，不支持多文件不同桶混传)
 * @param {File[]} fileList 文件列表
 * @param {FileType} type 文件类型
 * @param {UploadMultipleFilesHandleFn} handle 各个状态下操作函数
 * @param {UploadFilesParams} uploadFilesParams 参数
 * @returns {UploadMultipleFiles}
 * @example
 */
export declare function uploadMultipleFiles(fileList: File[], type?: FileType, handle?: UploadMultipleFilesHandleFn, uploadFilesParams?: UploadFilesParams): UploadMultipleFiles;
/**
 * @description 删除腾讯云上的文件
 * @param {string} fileName 文件名称
 * @param {FileType} type 文件类型
 * @param {HandleFn} handle 各个状态下操作函数
 * @param {DeleteObjectParams} deleteObjectParams 参数
 * @returns {Promise<void>}
 * @example
 */
export declare function removeFile(fileName: string, type?: FileType, handle?: RemoveFileHandleFn, deleteObjectParams?: DeleteObjectParams): Promise<void>;
/**
 * @description 删除腾讯云上的多个文件
 * @param {string[]} fileNameList 文件名称列表
 * @param {FileType} type 文件类型
 * @param {HandleFn} handle 各个状态下操作函数
 * @param {DeleteObjectParams} deleteObjectParams 参数
 * @returns {Promise<void>}
 * @example
 */
export declare function removeMultipleFiles(fileNameList: string[], type: FileType, handle?: RemoveFileHandleFn, deleteMultipleObjectParams?: DeleteMultipleObjectParams): Promise<void>;
/**
 * @description 创建目录
 * @param {string} dir
 * @returns {Promise<void>}
 * @example
 */
export declare function createDir(dir: string, type?: FileType): Promise<void>;
/**
 * @description 列出目录下的所有文件
 * @param {string} dir
 * @param {FileType} type
 * @returns {Promise<CosObject[]>}
 * @example
 */
export declare function getDirFiles(dir: string, type: FileType, getBucketParams: GetBucketParams): Promise<CosObject[]>;
