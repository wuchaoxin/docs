# native

不借用 JSBridge 能力但是又与 native 相关的函数

## openOrDownApp

跳转 app 链接，如果没有下载 app 那么就下载

> 需要注意：判断是通过时间来进行的（2s），如果用户在 2s 内没有操作，这时候判断是会有问题的。

<<< @/frontend-common/utils/native.ts#openOrDownApp