<script setup lang="ts">
    import 'vue-cropper/dist/index.css'
    import { ref, computed, defineAsyncComponent, watch } from 'vue'
    import { inBrowser } from 'vitepress'
    import { ElSlider as Slider } from 'element-plus'

    const cropperRef = ref(null)
    const cropFile = ref({size: 0, dataURL: ''})
    const croppedFile = ref(null)
    const croppedFileURL = ref('')
    const imgQuality = ref(0.9)
    const Cropper = computed(()=>{
        if(inBrowser) {
            const vueCropper = defineAsyncComponent(() => import('vue-cropper/lib/vue-cropper.vue'))
            return vueCropper
        } else {
            return null
        }
    })
    watch(imgQuality, ()=>{
        getCropBlob()
    })

    getCropFile()

    function getCropFile() {
        if(!inBrowser) {
            return
        }
        const dataUrl = "https://ts1.cn.mm.bing.net/th/id/R-C.1cc9be82d3f852a2e09c6ea0fe8da0b9?rik=oA6jlJL1dhTArQ&riu=http%3a%2f%2fimg.crcz.com%2fallimg%2f202002%2f26%2f1582709499438278.jpg&ehk=RztWOBl7%2biproByAyjPcLgFxjL7Sh9%2fjzSQvL7HIFkw%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"
        let http = new XMLHttpRequest();
        http.open("GET", dataUrl, true);
        http.responseType = 'blob';
        http.onload = function(e){
            if(this.status === 200 || this.status === 0){
                let r = new FileReader();
                r.onload = function (e) {
                    cropFile.value.dataURL = e.target.result
                }
                cropFile.value.size = this.response.size
                r.readAsDataURL(this.response);
            }
        }
        http.send()
    }
    function realTime() {
        getCropBlob()
    }
    function getCropBlob() {
        cropperRef.value?.getCropBlob?.(data => {
            croppedFile.value = data
            croppedFileURL.value = URL.createObjectURL(data)
        })
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

# Cropper 组件

Cropper 组件为图片裁剪组件（附带压缩功能），Cropper 相关的组件在 github 上有很多，这里选用了 `vue-cropper@next` 组件。

[vue-cropper 文档](https://github.com/xyxiao001/vue-cropper)

:::warning 提示
这里并没有封装组件，而是提供一下解决思路。因为目前看起来这个组件灵活性十分高，并且 api 已经够全面。因为 `vue3.2` 目前的限制，封装反而会丧失语法提示。
:::

> 如果你需要圆角的图片，请直接通过 css 处理，这并不需要 js 参与。

## 基础展示

<div class="copper-container">
    <ClientOnly>
        <Cropper 
            class="cropper"
            ref="cropperRef"
            :img="cropFile.dataURL"
            :autoCrop="true"
            :outputSize="imgQuality"
            @realTime="realTime"
        ></Cropper>
        <div class="preview">
            <img :src="croppedFileURL">
        </div>
        <div>
            输出质量
            <Slider v-model="imgQuality" :min="0.1" :max="1" :step="0.1"></Slider>
                <div>文件原本大小：{{((cropFile?.size || 0) / 1024).toFixed(1)}} kb</div>
                <div>文件输出大小：{{((croppedFile?.size || 0) / 1024).toFixed(1)}} kb</div>
            </div>
    </ClientOnly>
</div>