# JSBridge

> JSBridge 其实也属于 `utils` 里的内容，不过由于其本身特殊性所以单独提出来。

相关原理可以去查看 [JSBridge 原理](/frontend-js-bridge-guide/README.html )

在你进行新增某个 `JSBridge` 时，你应该注意函数应该返回一个 `Promise` 类型。

基础使用：

```ts
import { autoBridge } from '@common-utils/JSBridge'

autoBridge.getAppUserInfo().then((res)=>{
    console.log(res)
})
```

::: warning 值得注意的是
+ 在安卓下，重新回到页面，`eruda` 打印消息会失效，需要点击下 `eruda` 的清除消息才能再次生效。
+ 在安卓下，参数使用过 URL 进行传递的，这种情况如果参数过多是有可能爆 URL 的，需要谨慎。
+ 在安卓下，瞬发三个 bridge 以上（含三个），会出现返回延时的现象。
+ 在安卓下，是监听 webview 页面加载后才会配置好 bridge，如果页面有很多资源会导致返回延时的现象。
:::

Bridge `tag` 说明：
+ 兼容性：说明有一端兼容性有问题，具体情况请具体参见说明（不兼容的情况一般需要其他 bridge 联合使用）。
+ 注册事件：默认 bridge 为 `callHandler`（发送一次接收回调一次），注册事件则为 `registerHandler`（App 来触发我们，可触发多次）。

## getAppUserInfo

用于获取当前用户的信息，如果没有登录，会返回 ""。

### 参数

\-

### 结果

<<< @/frontend-common/utils/types/typings/JSBridge.ts#GetAppUserInfo

## doAppUserLoginAction <Badge type="warning" text="兼容性" />

::: warning 兼容性
仅 iOS 支持全部功能，安卓下跳出页面将不再会有回调能力（仅能判断是否已登录），安卓下需联合 `handleAppUserLoginAction` 使用。
:::

唤起 APP 方的登录界面

### 参数

\-

### 结果

<<< @/frontend-common/utils/types/typings/JSBridge.ts#DoAppUserLoginAction

## handleAppUserLoginAction <Badge type="tip" text="注册事件" /><Badge type="warning" text="兼容性" />

::: warning 兼容性
仅 android 支持，iOS 下需联合 `doAppUserLoginAction` 使用。
:::

因为 `android` 不好实现 `doAppUserLoginAction`，所以采用注册事件让 APP 方告诉我们相关登录信息。

### 参数

<<< @/frontend-common/utils/types/typings/JSBridge.ts#handleAppUserLoginAction

<<< @/frontend-common/utils/types/typings/JSBridge.ts#DoAppUserLoginAction

### 结果

\-

## getAppBaseInfo

获取设备信息

### 参数

\-

### 结果

<<< @/frontend-common/utils/types/typings/JSBridge.ts#GetAppBaseInfo

<<< @/frontend-common/utils/types/typings/JSBridge.ts#Platform

## setShare <Badge type="warning" text="废弃" />

告诉 App 方当前页面可以进行分享，同时设置当前页面的分享设置

::: warning 不推荐使用
由于之前未考虑充分，将此 API 设置成为了 `callHander`，所以回调只有一次，如果想要持续回调，需要在回调里进行重复调用。这里应该是修改成 `registerHander`，在后续将新开一个 `registerHander` 版本的此 API。这个后续应该减少使用。
:::

### 参数

<<< @/frontend-common/utils/types/typings/JSBridge.ts#SetShareParams

<<< @/frontend-common/utils/types/typings/JSBridge.ts#SharePlatform

<<< @/frontend-common/utils/types/typings/JSBridge.ts#BuriedPointInfo

<<< @/frontend-common/utils/types/typings/JSBridge.ts#Card

### 结果

<<< @/frontend-common/utils/types/typings/JSBridge.ts#SetShare

<<< @/frontend-common/utils/types/typings/JSBridge.ts#SetShareType

## cancelShare

隐藏 App 下右上角的分享按钮

### 参数

\-

### 结果

\-

## share

唤起当前页面 App 方的分享

### 参数

> 注：参数可能为空，此种场景为默认分享

<<< @/frontend-common/utils/types/typings/JSBridge.ts#ShareParams

<<< @/frontend-common/utils/types/typings/JSBridge.ts#ShareParamsType

<<< @/frontend-common/utils/types/typings/JSBridge.ts#BuriedPointInfo

<<< @/frontend-common/utils/types/typings/JSBridge.ts#VaccineResults

### 结果

<<< @/frontend-common/utils/types/typings/JSBridge.ts#Share

<<< @/frontend-common/utils/types/typings/JSBridge.ts#ShareType

## notifyLoginExpiration

通知 App 方当前登录已过期

> 为何会有这个 Bridge，因为当前没有展期的概念，所以 App 方无法通知到 H5 当前最新的 cookie。故需要 H5 通知到 App。

### 参数

\-

### 结果

仅有回调，无结果

## close

用于通知 APP 关闭当前的 `webview` 页面。

### 参数

\-

### 结果

\-

## pageShow <Badge type="tip" text="注册事件" />

注册事件，用于 `APP 原生页面` 返回 `webview` 通知到 H5。

> APP 原生页面返回 webview 并不会触发 JS 本身的 pageShow 事件，所以需要 APP 直接告诉我们。

### 参数

<<< @/frontend-common/utils/types/typings/JSBridge.ts#pageShow

### 结果

目前只是预留，暂无具体定义。