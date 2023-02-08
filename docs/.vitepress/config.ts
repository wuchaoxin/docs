import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import nav from './config/nav'
import sidebar from './config/sidebar'

const LINK = 'https://github.com/wuchaoxin/docs'

export default withMermaid(
  defineConfig({
    appearance: 'dark',
    // outDir: '../dist',
    title: 'docs',
    description: '前端说明文档',
    head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
    lang: 'zh-CN',
    lastUpdated: true,
    markdown: {
      lineNumbers: true,
    },
    themeConfig: {
      logo: '/images/logo.svg',
      siteTitle: '前端文档',
      nav,
      sidebar,
      outlineTitle: '此页面',
      socialLinks: [{ icon: 'github', link: LINK }],
    //   footer: {
    //     message: '',
    //     copyright: '',
    //   },
      editLink: {
        pattern: LINK,
        text: '在 GitHub 上编辑此页面',
      },
      lastUpdatedText: '更新日期',
      docFooter: {
        prev: '上一页',
        next: '下一页',
      },
    },
  })
)
