# JSBridge

JSBridge 是一种 JS 实现的 Bridge，连接着桥两端的 Native 和 H5。它在 APP 内方便地让 Native 调用 JS，JS 调用 Native ，是双向通信的通道。JSBridge 主要提供了 JS 调用 Native 代码的能力，实现原生功能如查看本地相册、打开摄像头、指纹支付等。

| name     | H5                                                | Native                                             |
| -------- | ------------------------------------------------- | -------------------------------------------------- |
| 稳定性   | 调用系统浏览器内核，稳定性较差                    | 使用原生内核，更加稳定                             |
| 灵活性   | 版本迭代快，上线灵活                              | 迭代慢，需要应用商店审核，上线速度受限制           |
| 流畅度   | 有时加载慢，给用户“卡顿”的感觉                    | 加载速度快，更加流畅                               |
| 用户体验 | 功能受浏览器限制，体验有时较差                    | 原生系统 api 丰富，能实现的功能较多，体验较好      |
| 可移植性 | 兼容跨平台跨系统，如 PC 与 移动端，iOS 与 Android | 可移植性较低，对于 iOS 和 Android 需要维护两套代码 |

## 原理

目前采用通信的方式是 `拦截 URL Scheme`。H5 方进行创建一个隐藏的 `iframe`，该 `iframe` 设置上协商好的 `URL Scheme`, Android 和 iOS 都可以通过拦截该 `URL Scheme` 并解析 scheme 来决定是否进行对应的 Native 代码逻辑处理。

> 注：原理相关主要 `JS` 为主，H5 并不十分了解 `APP` 方的逻辑。

> 原理解释主要是面向 `IOS` 方，`Android` 方于其类似，逻辑稍有不同但是不做过多解释。

### 初始化

创建一个 src 为 `https://__bridge_loaded__` 的 `iframe`，用于告诉 `App` 需要进行初始化了。

> 其最开始本身的作用是为了让 `App` 执行 `injectJavascriptFile` 方法，但是 bridge 相关的逻辑都是 `JS`这边注入的，但是也不能缺少这一步，不清楚 `App` 那边的逻辑

### JS 调用 Native

1. H5 方调用 `callHandler` 方法，执行 `_doSend` 方法。
2. `_doSend` 方法会创建一个 src 为 `__wvjb_queue_message__` 的 `iframe`，同时我们会向 `sendMessageQueue` 里面加入本次发送的信息。
3. `App` 拦截到这个请求，会进行解析。
4. 解析完毕后，会来调用 H5 的 `_fetchQueue` 方法以来获取 `sendMessageQueue`属性。
5. 如果有回调函数那么 `App` 会调用 `H5`这边的 `_dispatchMessageFromObjC` （此时 `App` 返回的 `message` 会携带 `responseId`）来进行回调函数的执行。


### Native 调用 JS

> Native 调用 JS 比较简单，只要 H5 将 JS 方法暴露在 Window 上给 Native 调用即可。

1. `App` 主动调用 `H5`方的 `_handleMessageFromObjC` 方法。
2. `H5` 继续执行 `_doDispatchMessageFromObjC` 方法利用 `App` 所携带的 `callbackId`（没有那么就不执行）进行调用 `_doSend` 方法。
3. ... 后续步骤同上的 `_doSend` 方法。
4. 执行后，还会检测 `messageHandlers` 中是否有需要监听的事件，如果有并且符合事件名会进行一次执行。


## 实际操作

### Bridge

+ `H5` 方当调用后 `initBridge` 方法后，会在 `window` 全局对象对象上挂载 `WebViewJavascriptBridge` 对象。
+ 当 `H5` 方调用 `window.WebViewJavascriptBridge.callHandler` 方法后，调用 `Native` 方事件。
+ 当 `H5` 方调用 `window.WebViewJavascriptBridge.registerHandler` 方法后，会进行监听 `Native` 方事件。

### autoBridge

`autoBridge` 和 `bridge` 使用方法一模一样，不过利用了 `Proxy` 进行了一次拦截，完成以下操作：
+ 会自动进行初始化 `Bridge` （并不需要手动执行 `initBridge`）
+ 会自动判断当前是否在 `App` 环境内，如果不在将不会执行
+ 将禁止修改 `autoBridge` 对象