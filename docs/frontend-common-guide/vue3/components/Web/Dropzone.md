<script setup lang="ts">
    import { computed, defineAsyncComponent } from 'vue'
    import { inBrowser } from 'vitepress'

    const dropzoneOptions = {
        url: 'https://httpbin.org/post',
        headers: { "My-Awesome-Header": "header value" },
    }
    const Dropzone = computed(()=>{
        if(inBrowser) {
            return defineAsyncComponent(() => import('@/frontend-common/vue3/components/Dropzone/index.vue'))
        } else {
            return null
        }
    })

    function getDropzoneId(){
        return (Date.now() + selectFrom(1,1000)).toString()
    }
    function selectFrom(lowerValue, upperValue) {
        var choices = upperValue - lowerValue + 1;
        return Math.floor(Math.random() * choices + lowerValue);
    } 
</script>

# Dropzone 组件

Dropzone 组件为上传图片组件，由于目前 vue3 下没有对应的稳定的库，这里直接通过 `dropzone` 库实现一个 vue3 组件。

[dropzone 文档](https://www.dropzone.dev/)

## 基础展示

<ClientOnly>
    <Dropzone :id="getDropzoneId()" :options="dropzoneOptions" :cos="false"></Dropzone>
</ClientOnly>

## Props

|      属性       | 描述                                               |  默认值   | 可能的值          | 备注                                                                                        |
| :-------------: | -------------------------------------------------- | :-------: | ----------------- | ------------------------------------------------------------------------------------------- |
|       id        | 组件唯一标识                                       |     -     | string            | 必传                                                                                        |
|     options     | 配置信息                                           |  Object   | Object            | 必传，详情见[options](https://docs.dropzone.dev/configuration/basics/configuration-options) |
| includeStyling  | 是否使用默认样式                                   |   true    | boolean           | -                                                                                           |
| destroyDropzone | 销毁组件时是否销毁 dropzone 对象                   |   true    | boolean           | -                                                                                           |
| duplicateCheck  | 在 dropzone 中已删除的文件中检查添加的文件是否重复 |   false   | boolean           | -                                                                                           |  |
|  useCustomSlot  | 使用在默认消息区域使用自定义槽                     |   false   | boolean           | -                                                                                           |
|   extraButton   | 是否使用一个额外的按钮                             | undefined | string\|undefined | -                                                                                           |
|       cos       | 是否使用 cos 上传                                  |   true    | boolean           | 默认将启用 cos 上传，如果你想自定义上传可以关闭该选项                                       |
## Events

|                       事件名称                       | 描述                                                                                                                                                                                                                                                   |
| :--------------------------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|                vdropzone-extra-button                | 额外的按钮被点击触发                                                                                                                                                                                                                                   |
|              vdropzone-file-added(file)              | 添加到 dropzone 的文件                                                                                                                                                                                                                                 |
|             vdropzone-files-added(file)              | 添加到 dropzone 的文件                                                                                                                                                                                                                                 |
|         vdropzone-file-added-manually(file)          | 手动将文件添加到 dropzone                                                                                                                                                                                                                              |
|          vdropzone-thumbnail(file, dataUrl)          | 生成缩略图时触发                                                                                                                                                                                                                                       |
|          vdropzone-success(file, response)           | 文件已成功上载                                                                                                                                                                                                                                         |
|             vdropzone-complete(response)             | 当上载成功或错误时调用                                                                                                                                                                                                                                 |
|               vdropzone-canceled(file)               | 当文件上载被取消时调用                                                                                                                                                                                                                                 |
|            vdropzone-error(file, message)            | 上传错误时触发                                                                                                                                                                                                                                         |
|       vdropzone-error-multiple(files, message)       | uploadMultiple 为 true 时触发，同 error                                                                                                                                                                                                                |
|             vdropzone-removed-file(file)             | 已从 dropzone 中删除文件                                                                                                                                                                                                                               |
|        vdropzone-sending(file, xhr, formData)        | 在发送前修改请求并向请求添加附加参数                                                                                                                                                                                                                   |
|          vdropzone-complete-multiple(files)          | uploadMultiple 为 true 时触发，同 complete                                                                                                                                                                                                             |
|               vdropzone-canceled(file)               | 当文件上载被取消时调用                                                                                                                                                                                                                                 |
|          vdropzone-max-files-reached(files)          | 当接受的文件数达到 maxFiles 限制时调用                                                                                                                                                                                                                 |
|          vdropzone-max-files-exceeded(file)          | 因文件数超过 maxFiles 限制而被拒绝的文件                                                                                                                                                                                                               |
|          vdropzone-success-multiple(files)           | uploadMultiple 为 true 时触发，同 success                                                                                                                                                                                                              |
|   vdropzone-sending-multiple(files, xhr, formData)   | uploadMultiple 为 true 时触发，同 sending                                                                                                                                                                                                              |
|              vdropzone-queue-complete()              | 队列已完全处理/上载时激发                                                                                                                                                                                                                              |
|              vdropzone-processing(file)              | 当一个文件被处理时（由于有一个队列，并不是所有文件都立即被处理），此事件以前称为 processingfile                                                                                                                                                        |
|         vdropzone-processing-multiple(files)         | uploadMultiple 为true时触发，同 processing                                                                                                                                                                                                             |
| vdropzone-upload-progress(file, progress, bytesSent) | 每当文件上载进度更改时，都会定期调用。获取进度参数作为第二个参数（0-100），获取 bytesSent 参数作为第三个参数（已发送到服务器的字节数）。当上传完成时，dropzone 确保 uploadprogress 将至少以100的百分比调用一次。警告：此函数可能会以相同的进度多次调用 |
|                 vdropzone-mounted()                  | 安装 dropzone 组件时激发                                                                                                                                                                                                                               |
|            vdropzone-duplicate-file(file)            | 启用 duplicateCheck 并找到重复文件时激发                                                                                                                                                                                                               |
|                vdropzone-drop(event)                 | 用户将文件放到了放置区                                                                                                                                                                                                                                 |
|             vdropzone-drag-start(event)              | 用户开始拖动任何位置                                                                                                                                                                                                                                   |
|              vdropzone-drag-end(event)               | 拖动已结束                                                                                                                                                                                                                                             |
|             vdropzone-drag-enter(event)              | 用户将文件拖到 Dropzone 上                                                                                                                                                                                                                             |
|              vdropzone-drag-over(event)              | 用户正在 Dropzone 上拖动文件                                                                                                                                                                                                                           |
|             vdropzone-drag-leave(event)              | 用户将文件拖出 Dropzone                                                                                                                                                                                                                                |

## Methods

|       方法名        | 描述                                           | 参数          | 备注 |
| :-----------------: | ---------------------------------------------- | ------------- | ---- |
|   removeAllFiles    | 删除所有文件（删除正在上传的文件需要传入参数） | bool          | -    |
|   manuallyAddFile   | 手动添加文件                                   | file, fileUrl | -    |
|     removeFile      | 删除指定文件                                   | file          | -    |
|    processQueue     | 手动开启 autoProcessQueue                      |               | -    |
|  getAcceptedFiles   | 获取所有通过的文件                             |               | -    |
|  getRejectedFiles   | 获取所有被拒绝的文件                           |               | -    |
|   getQueuedFiles    | 获取所有排队的文件                             |               | -    |
|  getUploadingFiles  | 获取所有正在上载文件                           |               | -    |
|       disable       | 禁用 dropzone 组件                             |               | -    |
|       enable        | 启用     dropzone 组件                         |               | -    |
| getDropzoneInstance | 获取 dropzone 实例                             |               | -    |
|      setOption      | 设置 dropzone 配置                             | option,val    | -    |