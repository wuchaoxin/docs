# weChat

针对 `weChat` `JSSDK` 所进行的封装

## injectJSSDK

注入微信 `JSSDK`，并且返回一个 promise，如果加载成功将走 then。

<<< @/frontend-common/utils/weChat.ts#injectJSSDK

## isHaveJSSDK

判断当前是否注入过微信 `JSSDK`。

<<< @/frontend-common/utils/weChat.ts#isHaveJSSDK

## waitJSSDK

等待 JSSDK 下载完毕后，执行的函数（因为下载是异步的，所以需要考虑这一点）

> 如果执行时已下载完毕，那么直接执行；如果执行时没有下载完毕，那么放入队列中，下载完毕后，处理队列。

<<< @/frontend-common/utils/weChat.ts#waitJSSDK

## initJSSDK

初始化微信 `JSSDK`（去缓存或者后端接口读取配置）。

<<< @/frontend-common/utils/weChat.ts#initJSSDK

## setShare

配置微信分享

<<< @/frontend-common/utils/weChat.ts#setShare