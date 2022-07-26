import { defineConfig } from 'vitepress'

const frontendSidebar = [
  {
    text: '指南',
    items: [
      { text: '起步', link: '/start.md' },
      { text: '说明', link: '/frontend-common/README.md' },
      { text: '贡献', link: '/frontend-common/CONTRIBUTOR.md' },
    ],
  },
  {
    text: 'vue3物料',
    items: [{ text: '起步', link: '/frontend-common/vue3/README.md' }],
    collapsible: true,
    collapsed: false,
  },
  {
    text: '工具',
    items: [{ text: '说明', link: '/frontend-common/utils/README.md' }],
    collapsible: true,
  },
  {
    text: 'styles',
    items: [
      { text: '起步', link: '/frontend-common/styles/README.md' },
      { text: 'Sass', link: '/frontend-common/styles/sass/README.md' },
      { text: 'Tailwindcss', link: '/frontend-common/styles/tailwindcss/README.md' },
    ],
    collapsible: true,
  },
]

export default defineConfig({
  outDir: '../public',
  title: 'YM',
  description: '前端说明文档',
  lang: 'zh-CN',
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    logo: '/matai.webp',
    siteTitle: '前端文档',
    nav: [
      { text: 'UI 设计文档', link: '/ui-guide/index' },
      {
        text: '前端公共库文档',
        items: [
          { text: '说明', link: '/frontend-common/README.md' },
          { text: 'vue3物料文档', link: '/frontend-common/vue3/README.md' },
          { text: '工具库文档', link: '/frontend-common/utils/README.md' },
          { text: 'styles 文档', link: '/frontend-common/styles/README.md' },
        ],
      },
      { text: '前端上线文档', link: '/frontend-release-guide/' },
      { text: '团队成员', link: '/member-guide' },
    ],
    sidebar: {
      '/ui-guide': [
        {
          text: '设计分类',
          items: [
            { text: '颜色', link: '/ui-guide/color' },
            { text: '字体', link: '/ui-guide/font' },
            { text: '布局', link: '/ui-guide/layout' },
            { text: '组件', link: '/ui-guide/component' },
          ],
        },
      ],
      '/frontend-common': frontendSidebar,
      start: frontendSidebar,
    },
    socialLinks: [{ icon: 'github', link: 'https://gitlab.healthych.com/front/docs' }],
    footer: {
      message: '由马太科技前端组织提供技术支持',
      copyright: 'Maitai Technology',
    },
    editLink: {
      pattern: 'https://gitlab.healthych.com/front/docs',
      text: '在 Git Lab 上编辑此页面',
    },
    lastUpdatedText: '更新日期',
  },
})
