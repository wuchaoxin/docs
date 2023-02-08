
<script setup lang="ts">
    import { ref, reactive, computed, defineAsyncComponent, watch } from 'vue'
    import Editor from "@/frontend-common/vue3/components/Editor/index.vue"
    import { ElDialog as Dialog, ElButton as Button, ElForm as Form, ElFormItem as FormItem, ElInput as Input, ElMessageBox as MessageBox, ElSlider as Slider } from 'element-plus'
    import { inBrowser } from 'vitepress'
    import 'vue-cropper/dist/index.css'
    import Iframe from '@/components/Iframe.vue'
    import { convertUnits } from '@/frontend-common/vue3/components/Editor/utils.ts'

    const formLabelWidth = "100px"
    const editorValue = ref('')
    const editorRef = ref(null)
    const editorHTML = computed(() => {
        if(editorRef.value) {
            return editorRef.value.getHTMLWithStyle()
        } else {
            return null
        }
    })
    const editorHTMLDynamicUnit = computed(()=>{
        return convertUnits(editorHTML.value || '', 574)
    })

    const remoteFormRef = ref(null)
    const remoteDialogVisible = ref(false)
    const remoteForm = ref({})
    const remoteRules = {
        url: [
            {
                required: true,
                message: "请输入图片 URL",
                trigger: 'change',
            },
        ],
        describe: [
            {
                required: true,
                message: "请输入图片描述",
                trigger: 'change',
            },
        ],
        imgTitle: [
            {
                required: true,
                message: "请输入图片标题",
                trigger: 'change',
            },
        ],
        imgWidth: [
            {
                required: true,
                message: "请输入图片宽度",
                trigger: 'change',
            },
        ],
        imgHeight: [
            {
                required: true,
                message: "请输入图片高度",
                trigger: 'change',
            },
        ],
    }

    const localDialogVisible = ref(false)
    const dropzoneRef = ref(null)
    const dropzoneId = 'local'
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

    const cropDialogVisible = ref(false)
    const cropperRef = ref(null)
    const cropFile = ref(null)
    const previews = ref({})
    const imgQuality = ref(0.9)
    const croppedFile = ref(null)
    const croppedFileURL = ref('')
    const Cropper = computed(()=>{
        if(inBrowser) {
            return defineAsyncComponent(() => import('vue-cropper/lib/vue-cropper.vue'))
        } else {
            return null
        }
    })
    watch(imgQuality, ()=>{
        getCropBlob()
    })

    function openImage(type,data){
        if(type === 'remote') {
            remoteDialogVisible.value = true
        }else if(type === 'local') {
            localDialogVisible.value = true
        }else {
            MessageBox("模板根据需求定义，插入对应的 html 即可，这里不再提供示例。")
        }
    }
    function openMedia(){
        MessageBox("与图片上传类似，这里不再提供示例。")
    }
    function remoteClose() {
        remoteForm.value = {}
        remoteFormRef.value.resetFields()
    }
    function remoteSubmit() {
        remoteFormRef.value.validate().then(()=>{
            remoteDialogVisible.value = false
            const imgHTML = `<img src=${remoteForm.value.url} alt=${remoteForm.value.describe} title=${remoteForm.value.imgTitle} width=${remoteForm.value.imgWidth} height=${remoteForm.value.imgHeight} />`
            editorValue.value = editorValue.value + imgHTML
        })
    }
    function localClose() {
        dropzoneRef.value?.removeAllFiles?.(true)
    }
    function localSubmit() {
        let files = dropzoneRef.value?.getAcceptedFiles?.(true) 
        if(files){
            for(const file of files) {
                const imgHTML = `<img src=${file.dataURL} alt=${file.name} title=${file.name} width=${file.width} height=${file.height} />`
                editorValue.value = editorValue.value + imgHTML
            }
        }
        localDialogVisible.value = false
    }
    function openCropDialog(file) {
        cropDialogVisible.value = true
        cropFile.value = file
    }
    function cropClose() {
        cropDialogVisible.value = false
        resetCrop()
    }
    function cropImg() {
        dropzoneRef.value?.removeFile?.(cropFile.value)
        const file = new File([croppedFile.value], cropFile.value.name, {type: "image/jpeg"});
        dropzoneRef.value?.manuallyAddFile?.(file, URL.createObjectURL(croppedFile.value))
        cropDialogVisible.value = false
        resetCrop()
    }
    function realTime(data){
        previews.value = data
        getCropBlob()
    }
    function getCropBlob() {
        cropperRef.value?.getCropBlob?.(data=>{
            croppedFile.value = data
            croppedFileURL.value = URL.createObjectURL(data)
        })
    }
    function resetCrop() {
        cropperRef.value?.goAutoCrop?.()
        imgQuality.value = 0.9
        croppedFile.value = null
        croppedFileURL.value = ''
    }
</script>

<style scoped lang="scss">
    .copper-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        .cropper {
            width: 200px;
            height: 200px;
        }
        .preview {
            width: 200px;
            height: 200px;
            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
    }
</style>

# Editor 组件

Editor 组件为后台管理系统中经常会使用到的富文本组件。详细的细节内容请见注释以及文档，配置项过多完全理解确实需要一定时间。

[tinymce6 文档](https://www.tiny.cloud/docs/tinymce/6/)

[tinymce-vue 文档](https://www.tiny.cloud/docs/tinymce/6/vue-ref/)

## 基础构思

### 如何响应式

编辑器会向富文本中输出一段不可见的编辑器信息富文本，用于下游去得到这段富文本设置时编辑器相关的信息。

> 一切富文本操作将尽可能提供暴露函数，方便下游使用。

### 下游如何修改样式

下游可以通过辅助函数去移除所有的 `style` 样式来得到干净的样式。

> 一切富文本操作将尽可能提供暴露函数，方便下游使用。

### 上传图片以及视频

由于当前使用的是 `tinymce6`，目前国内插件还不够丰富，所以放弃使用 `tinymce6` 插件。采用外部上传的形式，并且并不想将当前组件和其他组件库绑定过深，所以采用 `emits` 的形式暴露出去事件。

### 全屏模式

使用方希望在全屏时，设置版本。故监听了全屏模式，在开启或关闭全屏模式时，会对编辑器操作空间进行样式修改。

### 层级排列规则

1. 下拉框设置
2. 文本相关设置
3. 插入内容设置
4. 非修改设置

## 展示

### 基础示例

一个全功能的基础编辑器

> 基础样式尽可能去对齐微信编辑器的样式。

<ClientOnly>
  <Dialog v-model="remoteDialogVisible" title="上传远程图片" width="30%" @close="remoteClose">
    <Form ref="remoteFormRef" :model="remoteForm" :label-width="formLabelWidth" :rules="remoteRules">
      <FormItem label="URL 链接" prop="url">
        <Input v-model="remoteForm.url" />
      </FormItem>
      <FormItem label="描述" prop="describe">
        <Input v-model="remoteForm.describe" />
      </FormItem>
      <FormItem label="图片标题" prop="imgTitle">
        <Input v-model="remoteForm.imgTitle" />
      </FormItem>
      <FormItem label="图片宽度" prop="imgWidth">
        <Input v-model="remoteForm.imgWidth" />
      </FormItem>
      <FormItem label="图片高度" prop="imgHeight">
        <Input v-model="remoteForm.imgHeight" />
      </FormItem>
    </Form>
    <template #footer>
      <span class="dialog-footer">
        <Button @click="remoteDialogVisible = false">关闭</Button>
        <Button type="primary" @click="remoteSubmit">上传</Button>
      </span>
    </template>
  </Dialog>
</ClientOnly>

<ClientOnly>
  <Dialog v-model="localDialogVisible" title="上传本地图片" width="30%" @close="localClose">
    <Dropzone ref="dropzoneRef" :id="dropzoneId" :options="dropzoneOptions" :cos="false" extraButton="裁剪图片" @vdropzone-extra-button="openCropDialog"/>
    <template #footer>
      <span class="dialog-footer">
        <Button @click="localDialogVisible = false">关闭</Button>
        <Button type="primary" @click="localSubmit">上传</Button>
      </span>
    </template>
  </Dialog>
</ClientOnly>

<ClientOnly>
  <Dialog v-model="cropDialogVisible" title="裁剪图片" width="50%" @close="cropClose">
        <div class="copper-container">
            <Cropper 
                class="cropper"
                ref="cropperRef"
                :img="cropFile.dataURL"
                :autoCrop="true"
                :canMove="false"
                :canScale="false"
                :outputSize="imgQuality"
                @realTime="realTime"
            ></Cropper>
            <!-- <div class="preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
                <div :style="previews.div">
                    <img :src="previews.url" :style="previews.img">
                </div>
            </div> -->
            <div class="preview">
                <img :src="croppedFileURL">
            </div>
            <div>
                输出质量
                <Slider v-model="imgQuality" :min="0.1" :max="1" :step="0.1"></Slider>
                <div>文件原本大小：{{(cropFile.size / 1024).toFixed(1)}} kb</div>
                <div>文件输出大小：{{((croppedFile?.size || 0) / 1024).toFixed(1)}} kb</div>
            </div>
        </div>
    <template #footer>
      <span class="dialog-footer">
        <Button @click="cropDialogVisible = false">关闭</Button>
        <Button type="primary" @click="cropImg">确认</Button>
      </span>
    </template>
  </Dialog>
</ClientOnly>

<Editor v-model="editorValue" ref="editorRef" @openImage="openImage" @openMedia="openMedia"></Editor>

<br/>

#### 输出网页

<br/>

<Iframe type="mobile" :srcdoc="editorHTML"></Iframe>

<br/>

#### 输出网页（动态响应式）

<br/>

<Iframe type="mobile" :srcdoc="editorHTMLDynamicUnit"></Iframe>

<br/>

### 修改默认样式

有时候我们需要去修改默认的编辑器设置，但是修改会和我们想的不太一样。编辑器作者推荐使用 `content_style` 或者 `content_css` 去修改操作区域的样式，然后在富文本输出的时候新增一个顶层 div，在这个新增的 html 上进行设置默认的样式。当然这样比较麻烦，简单封装了一下，我们只需 props 中 传递 `extraStyle` 即可。

> PS：也许你通过阅读文档看见了可以通过初始化后命令去控制编辑器默认设置，但是在执行命令的时候，会自动聚焦并且滚动至编辑器区域，这并不是我们想要的效果而且作者也不推荐这么进行使用。

## Props

> 这里只会标注我个人认为有用的 props，详细 props 请见 文档。

> 默认值请见注释（PS：如果你真的想了解设置相关注释一定是需要阅读的）。 

|     属性     | 描述               |              默认值               | 可能的值                     | 备注                         |
| :----------: | ------------------ | :-------------------------------: | ---------------------------- | ---------------------------- |
|   disabled   | 是否禁用           |               false               | true \| false                | -                            |
|     init     | 初始化内容         |         getDefaultInit()          | Object                       | -                            |
|  commandFn   | 需要执行的命令     |             undefined             | Function                     | -                            |
| initialValue | 初始化编辑器的值   |             undefined             | string                       | -                            |
| modelEvents  | 设置需要触发的事件 | 'change keydown blur focus paste' | string                       | -                            |
|   plugins    | 插件               |          DEFAULT_PLUGINS          | string                       | -                            |
|   toolbar    | 工具栏             |          DEFAULT_TOOLBAR          | string                       | -                            |
|  styleType   | 使用的样式类型     |             'weChat'              | 详情见 `Style` 数据模型      | -                            |
|  extraStyle  | 额外加入的样式     |             undefined             | 详情见 `ExtraStyle` 数据模型 | 在你修改默认样式时将十分有用 |

## Event

相关事件请见：[Event](https://www.tiny.cloud/docs/tinymce/6/events/#editor-core-events)

但是你需要注意的是事件分为核心事件和插件事件

## 辅助函数

> 富文本中包含大量的字符串操作，这里提供一些常见的富文本操作函数方便使用者的使用。

> 路径：`frontend-common/vue3/components/Editor/utils.ts`

### cleanStyle

<<< @/frontend-common/vue3/components/Editor/utils.ts#cleanStyle

### addEditorInfo

<<< @/frontend-common/vue3/components/Editor/utils.ts#addEditorInfo

### getEditorInfo

<<< @/frontend-common/vue3/components/Editor/utils.ts#getEditorInfo

### addDefaultStyle

<<< @/frontend-common/vue3/components/Editor/utils.ts#addDefaultStyle

### getStyle

<<< @/frontend-common/vue3/components/Editor/utils.ts#getStyle

### convertUnits

<<< @/frontend-common/vue3/components/Editor/utils.ts#convertUnits