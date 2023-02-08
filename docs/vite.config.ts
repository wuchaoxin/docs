import path from 'path'
import { SearchPlugin } from 'vitepress-plugin-search'

export default {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../docs'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/frontend-common/styles/sass/_variable.scss" as *;@use "@/frontend-common/styles/sass/_utils.scss" as *;`,
      },
    },
  },
  postcss: '../',
  plugins: [
    SearchPlugin({
      encode: false,
      tokenize: 'full',
      buttonLabel: '搜索',
      placeholder: '输入以搜索',
    }),
  ],
  ssr: {
    noExternal: ['vue-cropper'],
  }
}
