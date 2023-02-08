# request

使用方法和 axios 一模一样，不过在 axios 的基础上做了一个程度的封装，新增了一些常见的功能。

## setCustomConfig

可以通过函数进行修改全局的配置

<<< @/frontend-common/utils/request.ts#setCustomConfig

可以配置的功能如下：

<<< @/frontend-common/utils/types/typings/request.ts#AxiosCustomConfig

默认的配置：

<<< @/frontend-common/utils/request.ts#defaultCustomConfig

## 请求时新增 api

请求新增选项 api（你可以直接在请求中加入这些选项）：

> 如果 api 选项和全局选项冲突了，那么只会启动 api 选项。

<<< @/frontend-common/utils/types/typings/request.ts#AxiosCustomRequestConfig