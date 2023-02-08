export interface Size {
  width: string
  height: string
}

// 目前只使用了 blockPuzzle 滑动验证这一种
export type CaptchaType = 'blockPuzzle' | 'clickWord'
export type VerifyType = '1' | '2'

// pop 为弹窗类型
export type Mode = 'pop' | 'fixed'

export interface Point {
  x: number
  y: number
}
