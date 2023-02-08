import { TOAST_NAMESPACE } from '../../../../styles/sass/common-class'
import { Toast, ToastOptions } from 'vant'
import { ToastWrapperInstance } from 'vant/es/toast/types'

interface ToastOptionsRe extends ToastOptions {
  className?: Array<string>
  align?: 'left' | 'right' | 'center'
}

export function ToastFn(message: string): ToastWrapperInstance
export function ToastFn(options: ToastOptionsRe): ToastWrapperInstance
export function ToastFn(options: string | ToastOptionsRe): ToastWrapperInstance {
  const defaultOptions = {
    className: [TOAST_NAMESPACE],
  }
  if (typeof options === 'string') {
    return Toast({
      message: options,
      ...defaultOptions,
    })
  } else {
    options.className = [...(defaultOptions.className || []), options.align || 'center', ...(options.className || [])]
    return Toast(Object.assign(defaultOptions, options))
  }
}
