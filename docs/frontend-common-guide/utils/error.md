# error

跟错误捕获相关的函数

## handleGlobalError

处理全局的资源、运行、promise错误（一般在`main.ts`引入，可以不传入参数，当有错误时，控制台会自动打印错误）

<<< @/frontend-common/utils/error.ts#handleGlobalError

## handleRenderError

 处理渲染错误（仅针对 vue3）（一般在`main.ts`引入，将 vue3 创建的 app 传入，可以不传入处理函数，控制台会自动打印错误）

<<< @/frontend-common/utils/error.ts#handleRenderError

## handleRequestError

处理请求错误（注意：只要不为成功 code，都为请求错误），封装的`axios`已包含此函数，一般不会使用此函数。

<<< @/frontend-common/utils/error.ts#handleRequestError