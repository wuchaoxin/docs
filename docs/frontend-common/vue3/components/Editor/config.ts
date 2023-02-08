/**
 * @description 这里存放的是富文本编辑器的默认配置（PS：默认配置将是以一种精简化的配置出现）
 */
import { Editor, EditorOptions } from 'tinymce'
import { styleMap } from './styles'
import { EDITOR_DEFAULT_PADDING, EDITOR_STYLE_CLASS, EDITOR_WECHAT_WIDTH, UPLOAD_IMG_TYPE, UPLOAD_MEDIA_TYPE } from './types/const'
import { InitHandleFn, UploadMediaType } from './types/typings'
import { getStyle } from './utils'

// API Key（PS：这个 key 是使用自己的账户的得到，你也可以更新成你自己账户的 key，因为都是免费账户，并没有使用什么收费功能），但是更换后你需要设置此 key 允许的 domain，在 tinymce 账户设置中。
export const API_KEY = 'vva4u5ofa4835zwr0nwptl400dczpvlm03zzrzuisabgonf3'

// 默认初始化
export function getDefaultInit(handle?: InitHandleFn, props?: AnyObject<Dynamic>) {
  const DEFAULT_INIT: Partial<EditorOptions> = {
    width: EDITOR_WECHAT_WIDTH + EDITOR_DEFAULT_PADDING * 2,
    height: 700,
    content_css: ['default'],
    content_style: '',
    // 禁止合并 HTML 格式
    paste_merge_formats: false,
    // 禁用 TinyMCE 的默认 webkit 样式粘贴过滤器
    paste_remove_styles_if_webkit: false,
    // 粘贴时要保留的样式
    paste_webkit_styles: 'all',
    // 保护行内样式不被删除
    // valid_children:'+div[style]',
    // 是否展示右下角的 tiny logo，基于协议最好不要屏蔽
    // branding: false,
    // 设置默认语言
    language: 'zh_CN',
    // 设置文本类型
    block_formats: '正文=p; H1=h1; H2=h2; H3=h3; H4=h4; H5=h5',
    // 设置文本字体
    font_family_formats:
      '系统字体=system-ui; 黑体=黑体; 仿宋=仿宋; 楷体=楷体; 标楷体=标楷体; 华文仿宋=华文仿宋; 华文楷体=华文楷体; 宋体=宋体; 微软雅黑=微软雅黑; Arial=Arial; Tahoma=Tahoma; Verdana=Verdana; Times New Roman=Times New Roman; Courier New=Courier New;',
    // 设置文本字号
    font_size_formats: '12px 14px 15px 16px 17px 18px 19px 20px 24px',
    // 设置行高
    line_height_formats: '1 1.5 1.6 1.75 2 3 4 5',
    // 设置缩进
    indentation: '2em',
  }
  if (props.styleType || props.extraStyle) {
    const temp = props.styleType as string
    const styleModal = Object.assign({}, styleMap[temp], props.extraStyle)
    DEFAULT_INIT.content_style = getStyle(styleModal)
  }
  if (handle) {
    const { openImage, openMedia, toReady } = handle
    DEFAULT_INIT.setup = (editor) => {
      editor.ui.registry.addSplitButton('imageSelf', {
        icon: 'image',
        tooltip: '上传图片',
        onAction: (_buttonApi) => {
          openImage(UPLOAD_IMG_TYPE.REMOTE, editor)
        },
        onItemAction: (_buttonApi, value: UploadMediaType) => {
          openImage(value, editor)
        },
        fetch: (callback) => {
          const items = [
            {
              type: 'choiceitem' as const,
              text: '上传远程图片',
              value: UPLOAD_IMG_TYPE.REMOTE,
            },
            {
              type: 'choiceitem' as const,
              text: '上传本地图片',
              value: UPLOAD_IMG_TYPE.LOCAL,
            },
            {
              type: 'choiceitem' as const,
              text: '上传模板图片',
              value: UPLOAD_IMG_TYPE.TEMPLATE,
            },
          ]
          callback(items)
        },
      })
      editor.ui.registry.addSplitButton('mediaSelf', {
        icon: 'embed',
        tooltip: '上传视频',
        onAction: (_buttonApi) => {
          openMedia(UPLOAD_MEDIA_TYPE.REMOTE, editor)
        },
        onItemAction: (_buttonApi, value: UploadMediaType) => {
          openMedia(value, editor)
        },
        fetch: (callback) => {
          const items = [
            {
              type: 'choiceitem' as const,
              text: '上传远程视频',
              value: UPLOAD_MEDIA_TYPE.REMOTE,
            },
            {
              type: 'choiceitem' as const,
              text: '上传本地视频',
              value: UPLOAD_MEDIA_TYPE.LOCAL,
            },
          ]
          callback(items)
        },
      })
      editor.on('init', function (e) {
        toReady()
        const { target } = e as { target: Dynamic }
        const iframeElement = target.iframeElement as HTMLIFrameElement
        const iframeDocument = iframeElement.contentDocument
        const iframeBody = iframeDocument!.body
        iframeBody.classList.add(EDITOR_STYLE_CLASS)
      })
      editor.on('FullscreenStateChanged', (e) => {
        // state 是否开启全屏； iframeElement 操作区域
        const { state, target } = e as { state: boolean; target: Dynamic }
        const iframeElement = target.iframeElement as HTMLIFrameElement
        const iframeDocument = iframeElement.contentDocument
        const iframeHTML = iframeDocument!.documentElement
        const iframeBody = iframeDocument!.body
        setFullScreenStyle(state)
        function setFullScreenStyle(state: boolean) {
          if (state) {
            iframeHTML.style.cssText = 'height:100%;background-color:#F7F7F7;overflow:hidden;'
            iframeBody.style.cssText = `width:${
              EDITOR_WECHAT_WIDTH + EDITOR_DEFAULT_PADDING * 2 + 'px'
            };height:100%;margin: 0 auto;padding: ${EDITOR_DEFAULT_PADDING}px ${EDITOR_DEFAULT_PADDING}px 0 ${EDITOR_DEFAULT_PADDING}px;overflow:hidden;background-color:#fff`
          } else {
            iframeHTML.style.cssText = 'height:auto;background-color:#fff;'
            iframeBody.style.cssText = 'width:auto;height:auto;padding:0;background-color:#fff'
          }
        }
      })
    }
  }
  if (props?.convertWeChatImg) {
    DEFAULT_INIT.paste_preprocess = (editor, args) => {
      handleWeChatImg(editor, args)
    }
  }
  return DEFAULT_INIT
}

// 粘贴微信图片预处理
export function handleWeChatImg(_editor: Editor, args: { content: string; readonly internal: boolean }) {
  const pasteContent = args.content
  /**
   * 这里有两种方式可供参考
   * 1. 识别微信图片进行上传并且进行替换处理（难点：用户删除时也要考虑到删除图片）
   * 2. 设置一个跳板，使用你的服务端脚本，远程抓取图片，抹掉 Referer 信息，然后输出image/* 格式（难点：gif 需要一帧一帧提取，并且接口不要随意开放）
   */
  const WECHAT_IMG_REG = /<img.{1,}data-src="(https:\/\/mmbiz.qpic.cn.{1,}?)".{1,}src="(https:\/\/mmbiz.qpic.cn.{1,}?)".{0,}>/g
  const convertedContent = pasteContent.replace(WECHAT_IMG_REG, (match, match1, match2) => {
    const temp1 = match1.replace('?', '\\?')
    const temp2 = match2.replace('?', '\\?')
    let result = match
    // TODO
    const springboard = 'https://ym-jump.com?url='
    const jumpURL1 = springboard + window.encodeURIComponent(match1)
    const jumpURL2 = springboard + window.encodeURIComponent(match2)
    result = result.replace(new RegExp(`\"${temp1}\"`, 'g'), `\"${jumpURL1}\"`)
    result = result.replace(new RegExp(`\"${temp2}\"`, 'g'), `\"${jumpURL2}\"`)
    return result
  })
}

/**
 * @description 默认工具栏说明
 * blocks 文本类型
 * fontfamily 文本字体类型
 * fontsize 文本字号大小
 * bold 文本是否加粗
 * italic 文本是否倾斜
 * underline 文本是否加下划线
 * strikethrough 文本是否加删除线
 * forecolor 文本颜色
 * backcolor 背景颜色
 * blockquote 引用
 * Superscript 上标
 * Subscript 下标
 * alignleft 左对齐
 * aligncenter 居中对齐
 * alignright 右对齐
 * outdent 减少缩进
 * indent 增加缩进
 * lineheight 设置行高
 * insertdatetime 插入时间
 * bullist 无序列表
 * numlist 有序列表
 * link 设置链接
 * emoticons 表情
 * imageSelf 图片
 * mediaSelf 媒体
 * table 表格
 * hr 水平线
 * preview 预览
 * wordcount 文本计数
 * searchreplace 查找
 * fullscreen 全屏
 * undo 撤销
 * redo 重做
 * removeformat 去除格式
 */
export const DEFAULT_TOOLBAR = [
  'blocks fontfamily fontsize',
  'bold italic underline strikethrough forecolor backcolor blockquote Superscript Subscript alignleft aligncenter alignright outdent indent lineheight',
  'insertdatetime bullist numlist link emoticons imageSelf mediaSelf table hr',
  'preview wordcount code searchreplace undo redo remove removeformat fullscreen',
]

/**
 * @description 默认插件说明
 * lists 列表插件
 * advlist 列表拓展插件
 * autosave 保存提示插件（直接离开会有提示）
 * fullscreen 全屏插件
 * insertdatetime 插入时间插件
 * link 插入链接插件
 * media 插入视频或者音频
 * preview 预览插件
 * searchreplace 查找插件
 * wordcount 字数计数器插件
 * code 查看源代码插件
 * emoticons 表情插件
 * image 插入图片插件
 * table 表格插件
 */
export const DEFAULT_PLUGINS =
  'lists advlist autosave fullscreen insertdatetime link media preview searchreplace wordcount code emoticons image table'
