/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
declare type AnyObject<T = unknown> = Record<string, T>
declare type Dynamic = any

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, Dynamic>
  export default component
}

declare namespace NodeJS {
  interface ProcessEnv {
    SELF_CONFIG: {
      mock?: string
    }
  }
}

type ResponseCallback = (payload: Dynamic) => void

interface Window {
  WebViewJavascriptBridge: {
    manualInjection: boolean
    callHandler: (handlerName: string, data?: null | AnyObject, responseCallback?: ResponseCallback) => void
    registerHandler: (handlerName: string, handler: ResponseCallback) => void
  }
  wx: Dynamic
  eruda: Dynamic
}
