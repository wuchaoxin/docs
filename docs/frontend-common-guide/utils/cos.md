# cos

对象存储（Cloud Object Storage，COS）是腾讯云提供的一种存储海量文件的分布式存储服务，用户可通过网络随时存储和查看数据。

::: info 校验方式
通过请求后端接口进行校验（即密钥相关放在后端管理）
:::

[JavaScript SDK 文档](https://cloud.tencent.com/document/product/436/11459)

## 封装 API

### uploadFile

上传单个文件

<<< @/frontend-common/utils/cos.ts#uploadFile

### uploadMultipleFiles

上传多个文件

<<< @/frontend-common/utils/cos.ts#uploadMultipleFiles

### removeFile

删除腾讯云上的单个文件

<<< @/frontend-common/utils/cos.ts#removeFile

### removeMultipleFiles

删除腾讯云上的多个文件

<<< @/frontend-common/utils/cos.ts#removeMultipleFiles

### createDir

创建一个目录

::: tip 删除目录
对象存储中本身是没有目录的概念的，为了满足用户使用习惯，用户可通过分隔符/来模拟“目录”。
删除目录及其文件这一场景，实际在 COS 上相当于删除一批有着同样前缀的对象。目前 COS SDK 没有提供一个接口去实现这样的操作，但是可以通过组合查询对象列表加上批量删除对象的基本操作，达到删除文件夹下对象的目的。
:::

<<< @/frontend-common/utils/cos.ts#createDir

### getDirFiles

列出目录下的所有文件

<<< @/frontend-common/utils/cos.ts#getDirFiles
