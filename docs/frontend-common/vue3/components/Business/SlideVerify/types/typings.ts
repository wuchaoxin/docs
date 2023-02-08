export type ImgType = 'request' | 'local'

export interface ReqGetParams {
  captchaType: 'blockPuzzle'
  clientUid: string
  ts: number
}
export interface ReqGet {
  repCode: string
  repData: GetRepData
  success: boolean
}
export interface GetRepData {
  jigsawImageBase64: string
  originalImageBase64: string
  result: boolean
  secretKey: string
  token: string
}

export interface ReqCheckParams {
  captchaType: 'blockPuzzle'
  pointJson: string
  token: string
}
export interface ReqCheck {
  repCode: string
  repData: CheckRepData
  success: boolean
}
export interface CheckRepData {
  captchaType: 'blockPuzzle'
  pointJson: string
  result: boolean
}
