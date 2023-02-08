import { MessageForIOS, MessageForAndroid, ResponseCallback } from '../types/typings/JSBridge';
export declare class BridgeForIOS {
    manualInjection: boolean;
    sendMessageQueue: MessageForIOS[];
    messageHandlers: {};
    CUSTOM_PROTOCOL_SCHEME: string;
    QUEUE_HAS_MESSAGE: string;
    responseCallbacks: {};
    uniqueId: number;
    dispatchMessagesWithTimeoutSafety: boolean;
    constructor();
    registerHandler(handlerName: string, handler: ResponseCallback): void;
    callHandler(handlerName: string, data?: null | Record<string, unknown>, responseCallback?: ResponseCallback): void;
    disableJavscriptAlertBoxSafetyTimeout(): void;
    _init(): void;
    _doSend(message: MessageForIOS, responseCallback?: ResponseCallback): void;
    _fetchQueue(): string;
    _dispatchMessageFromObjC(messageJSON: string): void;
    _doDispatchMessageFromObjC(messageJSON: string): void;
    _handleMessageFromObjC(messageJSON: string): void;
}
export declare class BridgeForAndroid {
    manualInjection: boolean;
    messagingIframe: HTMLIFrameElement | undefined;
    bizMessagingIframe: HTMLIFrameElement | undefined;
    sendMessageQueue: MessageForAndroid[];
    messageHandlers: {};
    CUSTOM_PROTOCOL_SCHEME: string;
    QUEUE_HAS_MESSAGE: string;
    responseCallbacks: {};
    uniqueId: number;
    constructor();
    _init(): void;
    _createQueueReadyIframe(doc: Document): void;
    _createQueueReadyIframe4biz(doc: Document): void;
    send(data: AnyObject, responseCallback: ResponseCallback): void;
    registerHandler(handlerName: string, handler: ResponseCallback): void;
    callHandler(handlerName: string, data?: null | AnyObject, responseCallback?: ResponseCallback): void;
    _doSend(message: MessageForAndroid, responseCallback?: ResponseCallback): void;
    _fetchQueue(): void;
    _dispatchMessageFromNative(messageJSON: string): void;
    _handleMessageFromNative(messageJSON: string): void;
}
export declare function initBridge(): void;
