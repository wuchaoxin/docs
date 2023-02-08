import { EVENT_TYPE } from './../types/const/JSBridge';
import { bridge } from './index'
import { MessageForIOS, MessageForAndroid, ResponseCallback } from '../types/typings/JSBridge'
import { defaultUADetector } from '../UA'
import { _clearEvent } from './index';

export class BridgeForIOS {
  // 是否是手动注入
  manualInjection = true
  // 消息队列（当native端检测到iframe src的变化时，会来获取）
  sendMessageQueue: MessageForIOS[] = []
  // 注册的事件（相当于我们需要 native 监听的事件）
  messageHandlers = {}
  CUSTOM_PROTOCOL_SCHEME = 'https'
  QUEUE_HAS_MESSAGE = '__wvjb_queue_message__'
  // 回调对象（我们主动触发之后，需要触发的事件）
  responseCallbacks = {}
  // 回调 id （保证 callbackId 和 responseId 唯一）
  uniqueId = 1
  // 是否启用 settimeout（意义不明）
  dispatchMessagesWithTimeoutSafety = true

  constructor() {
    this._init()
  }
  // 注册事件
  registerHandler(handlerName: string, handler: ResponseCallback) {
    this.messageHandlers[handlerName] = handler
  }
  // 进行发送事件
  callHandler(handlerName: string, data?: null | Record<string, unknown>, responseCallback?: ResponseCallback) {
    this._doSend({ handlerName: handlerName, data: data }, responseCallback)
  }
  disableJavscriptAlertBoxSafetyTimeout() {
    this.dispatchMessagesWithTimeoutSafety = false
  }
  _init() {
    // 这里监听一个事件用于标记是否使用 settimeout
    this.registerHandler('_disableJavascriptAlertBoxSafetyTimeout', this.disableJavscriptAlertBoxSafetyTimeout)
    const WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'https://__bridge_loaded__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(function () {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
  }
  // 发送 iframe 请求
  _doSend(message: MessageForIOS, responseCallback?: ResponseCallback) {
    if (responseCallback) {
      const callbackId = 'cb_' + this.uniqueId++ + '_' + new Date().getTime()
      this.responseCallbacks[callbackId] = responseCallback
      message['callbackId'] = callbackId
    }
    this.sendMessageQueue.push(message)
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = this.CUSTOM_PROTOCOL_SCHEME + '://' + this.QUEUE_HAS_MESSAGE
    document.documentElement.appendChild(iframe)
    setTimeout(function () {
      const temp = iframe.parentNode as Document
      temp.removeChild(iframe)
    }, 0)
  }
  _fetchQueue() {
    const messageQueueString = JSON.stringify(this.sendMessageQueue)
    this.sendMessageQueue = []
    return messageQueueString
  }
  _dispatchMessageFromObjC(messageJSON: string) {
    if (this.dispatchMessagesWithTimeoutSafety) {
      setTimeout(() => {
        this._doDispatchMessageFromObjC(messageJSON)
      }, 0)
    } else {
      this._doDispatchMessageFromObjC(messageJSON)
    }
  }
  _doDispatchMessageFromObjC(messageJSON: string) {
    const message = JSON.parse(messageJSON) as MessageForIOS
    let responseCallback
    if (message.responseId) {
      responseCallback = this.responseCallbacks[message.responseId]
      if (!responseCallback) {
        return
      }
      responseCallback(message.responseData)
      delete this.responseCallbacks[message.responseId]
    } else {
      if (message.callbackId) {
        const callbackResponseId = message.callbackId
        responseCallback = (responseData: unknown) => {
          this._doSend({
            handlerName: message.handlerName,
            responseId: callbackResponseId,
            responseData: responseData,
          })
        }
      }
      const handler = this.messageHandlers[message.handlerName]
      if (!handler) {
        console.log('WebViewJavascriptBridge: WARNING: no handler for message from ObjC:', message)
      } else {
        handler(message.data, responseCallback)
      }
    }
  }
  // 取出 callback 函数
  _handleMessageFromObjC(messageJSON: string) {
    this._dispatchMessageFromObjC(messageJSON)
  }
}

export class BridgeForAndroid {
  // 是否是手动注入
  manualInjection = true
  // 用于发送消息的 ifaram
  messagingIframe: HTMLIFrameElement | undefined
  // 用于让 native 接收消息的iframe
  bizMessagingIframe: HTMLIFrameElement | undefined
  // 发送消息的队列
  sendMessageQueue: MessageForAndroid[] = []
  // 注册的事件（相当于我们需要 native 监听的事件）
  messageHandlers = {}
  CUSTOM_PROTOCOL_SCHEME = 'yy'
  QUEUE_HAS_MESSAGE = '__QUEUE_MESSAGE__/'
  // 回调对象（我们主动触发之后，需要触发的事件）
  responseCallbacks = {}
  uniqueId = 1

  constructor() {
    this._init()
  }

  _init() {
    const doc = document
    this._createQueueReadyIframe(doc)
    this._createQueueReadyIframe4biz(doc)
  }

  // 创建消息index队列iframe
  _createQueueReadyIframe(doc: Document) {
    this.messagingIframe = doc.createElement('iframe')
    this.messagingIframe.style.display = 'none'
    doc.documentElement.appendChild(this.messagingIframe)
  }
  // 创建消息体队列iframe
  _createQueueReadyIframe4biz(doc: Document) {
    this.bizMessagingIframe = doc.createElement('iframe')
    this.bizMessagingIframe.style.display = 'none'
    doc.documentElement.appendChild(this.bizMessagingIframe)
  }
  send(data: AnyObject, responseCallback: ResponseCallback) {
    this._doSend(
      {
        data: data,
      },
      responseCallback
    )
  }
  // 注册事件
  registerHandler(handlerName: string, handler: ResponseCallback) {
    this.messageHandlers[handlerName] = handler
  }
  // 进行发送事件
  callHandler(handlerName: string, data?: null | AnyObject, responseCallback?: ResponseCallback) {
    this._doSend(
      {
        handlerName: handlerName,
        data: data,
      },
      responseCallback
    )
  }
  // 发送 iframe 请求
  _doSend(message: MessageForAndroid, responseCallback?: ResponseCallback) {
    if (responseCallback) {
      const callbackId = 'cb_' + this.uniqueId++ + '_' + new Date().getTime()
      this.responseCallbacks[callbackId] = responseCallback
      message.callbackId = callbackId
    }

    this.sendMessageQueue.push(message)
    if (this.messagingIframe) {
      this.messagingIframe.src = this.CUSTOM_PROTOCOL_SCHEME + '://' + this.QUEUE_HAS_MESSAGE
    }
  }
  // 让 native 拿到所有的消息
  _fetchQueue() {
    var messageQueueString = JSON.stringify(this.sendMessageQueue)
    this.sendMessageQueue = []
    if (messageQueueString !== '[]' && this.bizMessagingIframe) {
      this.bizMessagingIframe.src = this.CUSTOM_PROTOCOL_SCHEME + '://return/_fetchQueue/' + encodeURIComponent(messageQueueString)
    }
  }
  // 找回调函数（native 调用）
  _dispatchMessageFromNative(messageJSON: string) {
    const that = this
    setTimeout(function () {
      const message = JSON.parse(messageJSON)
      if(!message.responseId && !message.callbackId && message.data === 'ready') {
        bridge.isReady = true
        bridge.platform = "android"
        _clearEvent(EVENT_TYPE.FORCE_WAIT_APP)
        return 
      }
      let responseCallback
      if (message.responseId) {
        responseCallback = that.responseCallbacks[message.responseId]
        if (!responseCallback) {
          return
        }
        responseCallback(message.responseData)
        delete that.responseCallbacks[message.responseId]
      } else {
        //直接发送
        if (message.callbackId) {
          var callbackResponseId = message.callbackId
          responseCallback = function (responseData: AnyObject) {
            that._doSend({
              responseId: callbackResponseId,
              responseData: responseData,
            })
          }
        }
        let handler
        if (message.handlerName) {
          handler = that.messageHandlers[message.handlerName]
        }
        //查找指定handler
        try {
          handler(message.data, responseCallback)
        } catch (exception) {
          if (typeof console != 'undefined') {
            console.log('WebViewJavascriptBridge: WARNING: javascript handler threw.', message, exception)
          }
        }
      }
    })
  }
  _handleMessageFromNative(messageJSON: string) {
    this._dispatchMessageFromNative(messageJSON)
  }
}

export function initBridge() {
  if (window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.manualInjection) {
    return
  }
  if (defaultUADetector.isMobile()) {
    if (defaultUADetector.isIOS()) {
      window.WebViewJavascriptBridge = new BridgeForIOS()
    } else {
      window.WebViewJavascriptBridge = new BridgeForAndroid()
    }
  }
}
