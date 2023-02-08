const FRONTEND_COMMON__SIDEBAR_START = [
  {
    text: '指南',
    items: [
      { text: '起步', link: '/start.md' },
      { text: '说明', link: '/frontend-common-guide/README.md' },
      { text: '贡献', link: '/frontend-common-guide/CONTRIBUTOR.md' },
    ],
  },
]
const FRONTEND_COMMON__SIDEBAR_VUE3 = [
  {
    text: '指南',
    items: [{ text: '说明', link: '/frontend-common-guide/vue3/README.md' }],
  },
  {
    text: '移动端组件',
    items: [
      { text: '说明', link: '/frontend-common-guide/vue3/components/Mobile/README.md' },
      { text: 'Button', link: '/frontend-common-guide/vue3/components/Mobile/Button.md' },
      { text: 'Cell', link: '/frontend-common-guide/vue3/components/Mobile/Cell.md' },
      { text: 'SwipeCell', link: '/frontend-common-guide/vue3/components/Mobile/SwipeCell.md' },
      { text: 'Container', link: '/frontend-common-guide/vue3/components/Mobile/Container.md' },
      { text: 'Dialog', link: '/frontend-common-guide/vue3/components/Mobile/Dialog.md' },
      { text: 'Toast', link: '/frontend-common-guide/vue3/components/Mobile/Toast.md' },
      { text: 'Input', link: '/frontend-common-guide/vue3/components/Mobile/Input.md' },
      { text: 'Textarea', link: '/frontend-common-guide/vue3/components/Mobile/Textarea.md' },
      { text: 'ProgressBar', link: '/frontend-common-guide/vue3/components/Mobile/ProgressBar.md' },
    ],
    collapsible: true,
    collapsed: false,
  },
  {
    text: '移动端业务组件',
    items: [
      { text: 'Login', link: '/frontend-common-guide/vue3/components/MobileBusiness/Login.md' },
      { text: 'SlideVerify', link: '/frontend-common-guide/vue3/components/MobileBusiness/SlideVerify.md' },
    ],
    collapsible: true,
    collapsed: false,
  },
  {
    text: 'Web 端组件',
    items: [
      { text: 'Editor', link: '/frontend-common-guide/vue3/components/Web/Editor.md' },
      {
        text: 'Dropzone',
        link: '/frontend-common-guide/vue3/components/Web/Dropzone.md',
      },
      {
        text: 'Cropper',
        link: '/frontend-common-guide/vue3/components/Web/Cropper.md',
      },
    ],
    collapsible: true,
    collapsed: false,
  },
  {
    text: '组合式 API',
    items: [{ text: 'region', link: '/frontend-common-guide/vue3/hooks/region.md' }],
    collapsible: true,
    collapsed: false,
  },
  {
    text: '指令',
    items: [],
    collapsible: true,
    collapsed: false,
  },
]
const FRONTEND_COMMON_SIDEBAR_UTILS = [
  {
    text: '工具函数',
    items: [
      { text: '说明', link: '/frontend-common-guide/utils/README.md' },
      { text: 'UA', link: '/frontend-common-guide/utils/UA.md' },
      { text: 'cookie', link: '/frontend-common-guide/utils/cookie.md' },
      { text: 'design', link: '/frontend-common-guide/utils/design.md' },
      { text: 'dom', link: '/frontend-common-guide/utils/dom.md' },
      { text: 'error', link: '/frontend-common-guide/utils/error.md' },
      { text: 'exteriorScript', link: '/frontend-common-guide/utils/exteriorScript.md' },
      { text: 'formatter', link: '/frontend-common-guide/utils/formatter.md' },
      { text: 'mock', link: '/frontend-common-guide/utils/mock.md' },
      { text: 'progressBar', link: '/frontend-common-guide/utils/progressBar.md' },
      { text: 'request', link: '/frontend-common-guide/utils/request.md' },
      { text: 'storage', link: '/frontend-common-guide/utils/storage.md' },
      { text: 'url', link: '/frontend-common-guide/utils/url.md' },
      { text: 'validate', link: '/frontend-common-guide/utils/validate.md' },
      { text: 'weChat', link: '/frontend-common-guide/utils/weChat.md' },
      { text: 'buriedPoint', link: '/frontend-common-guide/utils/buriedPoint.md' },
      { text: 'login', link: '/frontend-common-guide/utils/login.md' },
      { text: 'cos', link: '/frontend-common-guide/utils/cos.md' },
      { text: 'environment', link: '/frontend-common-guide/utils/environment.md' },
      { text: 'native', link: '/frontend-common-guide/utils/native.md' },
    ],
    collapsible: true,
  },
]
const FRONTEND_COMMON_SIDEBAR_STYLES = [
  {
    text: '指引',
    items: [{ text: '说明', link: '/frontend-common-guide/styles/README.md' }],
    collapsible: true,
  },
  {
    text: 'Sass',
    items: [
      { text: '说明', link: '/frontend-common-guide/styles/sass/README.md' },
      { text: '变量', link: '/frontend-common-guide/styles/sass/variable.md' },
      { text: '混入', link: '/frontend-common-guide/styles/sass/utils.md' },
    ],
    collapsible: true,
    collapsed: false,
  },
  {
    text: 'Tailwindcss',
    items: [{ text: '说明', link: '/frontend-common-guide/styles/tailwindcss/README.md' }],
    collapsible: true,
    collapsed: false,
  },
]

const LEAD_LIST = [
  { text: '基础指引', link: '/frontend-lead-guide/base.md' },
  { text: '外部导航', link: '/frontend-lead-guide/external.md' },
  { text: 'FAQ', link: '/frontend-lead-guide/faq.md' },
]

export default {
  '/frontend-common-guide/README': FRONTEND_COMMON__SIDEBAR_START,
  start: FRONTEND_COMMON__SIDEBAR_START,
  '/frontend-common-guide/CONTRIBUTOR': FRONTEND_COMMON__SIDEBAR_START,
  '/frontend-lead-guide': [
    {
      text: '指引',
      items: LEAD_LIST,
    },
  ],
  '/frontend-common-guide/vue3': FRONTEND_COMMON__SIDEBAR_VUE3,
  '/frontend-common-guide/utils': FRONTEND_COMMON_SIDEBAR_UTILS,
  '/frontend-common-guide/styles': FRONTEND_COMMON_SIDEBAR_STYLES,
  '/frontend-js-bridge-guide': [
    {
      text: 'JSBridge',
      items: [
        { text: '原理', link: '/frontend-js-bridge-guide/README.md' },
        { text: '文档', link: '/frontend-js-bridge-guide/index.md' },
      ],
    },
  ],
  '/frontend-flow-chart-guide': [
    {
      text: '流程图',
      items: [
        { text: '说明', link: '/frontend-flow-chart-guide/README.md' },
      ],
    },
  ],
}
