<!--
 * @description
!-->
<template>
  <div class="editor-container" :style="containerStyle">
    <div class="loading-container" v-if="!isReady">
      <Loading></Loading>
    </div>
    <editor v-model="editorVal" v-bind="Object.assign({}, attrs, props)" :init="initVal" />
  </div>
</template>
<script setup lang="ts">
  import { computed, useAttrs, ref } from 'vue'
  import { EditorOptions, Editor as EditorType } from 'tinymce'
  import Editor from '@tinymce/tinymce-vue'
  import { API_KEY, getDefaultInit, DEFAULT_PLUGINS, DEFAULT_TOOLBAR, handleWeChatImg } from './config'
  import Loading from './components/loading.vue'
  import { ExtraStyle, Style, UploadImgType, UploadMediaType } from './types/typings'
  import { EDITOR_STYLE_CLASS, STYLE } from './types/const'
  import { styleMap } from './styles'
  import { getStyle } from './utils'

  // 由于 props 需要在 vue 3.3 版本才支持导入类型，这里先自己手动写一下
  const props = withDefaults(
    defineProps<{
      apiKey?: string
      cloudChannel?: string
      // 是否禁用
      disabled?: boolean
      id?: string
      // 初始化内容
      init?: EditorOptions
      // 初始化编辑器的值
      initialValue?: string
      inline?: boolean
      // 设置需要触发的事件
      modelEvents?: string
      // 指定输出格式
      outputFormat?: 'html' | 'text'
      // 插件
      plugins?: string
      // 内联模式下指定 tag 类型
      tagName?: string
      // 工具栏
      toolbar?: string | Array<string>
      tinymceScriptSrc?: string
      // 需要使用什么样式
      styleType?: Style
      extraStyle?: ExtraStyle
      // 是否启用微信图片识别
      convertWeChatImg?: boolean
      modelValue?: string
    }>(),
    {
      apiKey: API_KEY,
      toolbar: () => DEFAULT_TOOLBAR,
      plugins: () => DEFAULT_PLUGINS,
      // 核心事件可以在这里定义然后外部触发
      modelEvents: 'change keydown blur focus paste',
      styleType: STYLE.WECHAT,
      convertWeChatImg: true,
      modelValue: '',
    }
  )

  const emits = defineEmits(['openImage', 'openMedia', 'update:modelValue'])

  const attrs = useAttrs()
  const isReady = ref(false)

  const editorVal = computed({
    get() {
      return props.modelValue
    },
    set(val: string) {
      emits('update:modelValue', val)
    },
  })
  const initVal = computed(() => {
    const propsInit = props.init
    const defaultInit = getDefaultInit({ openImage, openMedia, toReady }, props)
    const coverInit = (() => {
      const result: Partial<EditorOptions> = {}
      if (propsInit?.setup) {
        result.setup = (editor: EditorType) => {
          defaultInit.setup?.(editor)
          propsInit.setup?.(editor)
        }
      }
      if (propsInit?.paste_preprocess) {
        result.paste_preprocess = (editor, args) => {
          propsInit.paste_preprocess(editor, args)
          handleWeChatImg(editor, args)
        }
      }
      return result
    })()
    return Object.assign({}, getDefaultInit({ openImage, openMedia, toReady }, props), props.init, coverInit)
  })
  const containerStyle = computed(() => {
    return {
      width: initVal.value.width + 'px',
      height: initVal.value.height + 'px',
      borderRadius: '10px',
    }
  })

  function openImage(type: UploadImgType, data: EditorType) {
    emits('openImage', type, data)
  }

  function openMedia(type: UploadMediaType, data: EditorType) {
    emits('openMedia', type, data)
  }
  function toReady() {
    isReady.value = true
  }
  function getHTMLWithStyle() {
    const html = (() => {
      const style = (() => {
        if (props.styleType || props.extraStyle) {
          const styleModal = Object.assign({}, styleMap[props.styleType], props?.extraStyle)
          return `<style>${getStyle(styleModal)}</style>`
        } else {
          return ''
        }
      })()
      let result = `<div class="${EDITOR_STYLE_CLASS}">${style}${editorVal.value}</div>`
      return result
    })()
    return html
  }

  defineExpose({
    getHTMLWithStyle,
  })
</script>
<style scoped lang="scss">
  .editor-container {
    position: relative;
    overflow: hidden;
    .loading-container {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 10;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f7f7f7;
    }
  }
</style>
