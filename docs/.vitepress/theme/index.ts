import DefaultTheme from 'vitepress/theme'
import { install } from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import "vant/lib/index.css"
// import '../../frontend-common/styles/sass/common-class.scss'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    const app = ctx.app
    install(app, { locale: zhCn })
    // extend default theme custom behaviour.
    DefaultTheme.enhanceApp(ctx)
    // register your custom global components
    // ctx.app.component('MyGlobalComponent' /* ... */)
  },
}
