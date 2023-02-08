# exteriorScript

外部脚本加载，本质这些函数作为一个 script 插入至页面中，根据加载情况返回 promise

## weChatJSSDKInit

注入微信 JS-SDK

<<< @/frontend-common/utils/exteriorScript.ts#weChatJSSDKInit

## mockInit

开启 mock

<<< @/frontend-common/utils/exteriorScript.ts#mockInit

## debugInit

开启调试器（用于移动端调试，使用后，右下角会出现一个光标）

<<< @/frontend-common/utils/exteriorScript.ts#debugInit

## 基础使用

```ts
import { weChatJSSDKInit } from '@common-utils/exteriorScript'

weChatJSSDKInit().then(()=>{
    // 进行后续微信配置
}).catch(()=>{
    console.error('weChat JSSDK init error')
})
```