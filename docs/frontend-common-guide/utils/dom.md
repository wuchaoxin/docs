# dom

与 dom 操作相关的函数，目前还不够丰富。

## switchScroll

在移动端，当我们打开弹窗或者遮罩的时候我们并不希望背景也跟着一起滑动，故我们打开弹窗或者遮罩的时候锁定背景，关闭时释放背景。

<<< @/frontend-common/utils/dom.ts#switchScroll

## 基础使用

```ts
import { switchScroll } from '@common-utils/dom'

switchScroll(false)

setTimeout(() => {
    switchScroll(true)
}, 1000);
```