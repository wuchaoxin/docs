import { DIALOG_NAMESPACE } from '../../../../styles/sass/common-class'
import { Dialog, DialogOptions } from 'vant'

interface DialogOptionsRe extends DialogOptions {
  className?: Array<string>
}

export function DialogFn(message: string | DialogOptionsRe): Promise<unknown>
export function DialogFn(title: string, message: string): Promise<unknown>
export function DialogFn(...args: [title: string, message: string] | [string | DialogOptionsRe]): Promise<unknown> {
  const basicConfig: DialogOptionsRe = {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    className: [DIALOG_NAMESPACE],
  }
  if (args.length === 1) {
    const message = args[0]
    if (typeof message === 'string') {
      basicConfig.message = message
      basicConfig.className = [DIALOG_NAMESPACE]
      return Dialog(basicConfig)
    } else {
      message.className = [...(basicConfig.className || []), ...(message.className || [])]
      const temp = Object.assign(basicConfig, message)
      return Dialog(temp)
    }
  } else {
    const title = args[0]
    const message = args[1]
    return Dialog({
      title,
      message,
      ...basicConfig,
    })
  }
}
