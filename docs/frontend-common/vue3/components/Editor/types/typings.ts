import { Editor } from 'tinymce'
import { STYLE, UPLOAD_IMG_TYPE, UPLOAD_MEDIA_TYPE } from './const'
import { weChat } from '../styles'

export interface InitHandleFn {
  openImage: (type: UploadImgType, data: Editor) => void
  openMedia: (type: UploadMediaType, data: Editor) => void
  toReady: () => void
}

export interface EditorInfo {
  // 编辑器宽度
  width: string
  // 编辑器高度
  height: string
  // 内容区的左右 padding（单侧）
  iframePadding: string
}

export type Style = typeof STYLE[keyof typeof STYLE]
export type UploadImgType = typeof UPLOAD_IMG_TYPE[keyof typeof UPLOAD_IMG_TYPE]
export type UploadMediaType = typeof UPLOAD_MEDIA_TYPE[keyof typeof UPLOAD_MEDIA_TYPE]
export type WeChatStyleKey = keyof typeof weChat

export type ExtraStyle = {
  [k in WeChatStyleKey]: AnyObject
}
