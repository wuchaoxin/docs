# cookie

使用 [js-cookie](https://www.npmjs.com/package/js-cookie) 进行了一次二次包装，用于 cookie 相关的设置。

相关配置项请参见 [js-cookie](https://www.npmjs.com/package/js-cookie) 说明。

## 获取 cookie
<<< @/frontend-common/utils/cookie.ts#getCookie

## 设置 cookie
<<< @/frontend-common/utils/cookie.ts#setCookie

## 基础使用

```ts
import { getCookie } from '@common-utils/cookie'

getCookie()
```