# todo

该文件旨在说明目前进行着手的事情以及后续需要完成的内容

+ :white_check_mark: 为已完成
+ :x: 为调研失败
+ :raised_hands: 为正在开发或者调研


## 关于文档库

### 文档库的基础搭建和发布 :white_check_mark:

通过 `vitepress` 进行快速搭建文档，而通过 `gitlab` 的 `webhook` 进行触发 `jenkins` 部署。

### 版本升级 :raised_hands:

由于文档库基于 `vitepress` 进行搭建的，`vitepress` 目前还处于 alpha 阶段，本人将进行持续关注版本的更新以及 bug 修复。等待 `vitepress` `1.0.0` 版本的正式推出，本人将不会高强度关注版本变化。

### Search :white_check_mark:

Search 是指文档库能够通过搜索快速进行查找到想要的文档，详情见 [search](https://vitepress.vuejs.org/guide/theme-search)。

::: tip 使用第三方插件
由于官方推荐的方式需要在公网进行抓取，当前无法使用，转而采用第三方插件实现 [vitepress-plugin-search](https://github.com/emersonbottero/vitepress-plugin-search)。
:::

### 流程图 :white_check_mark:

详情见 [流程图](/frontend-flow-chart-guide/README.html)。

### 树组件 :x:

树组件主要是针对 `man 端` 权限进行一个详细的说明（结合上线文档），需有如下的功能：

1. 图标以及相关信息区分菜单以及权限
2. 颜色或者图标标记新增与删除项
3. 展示图标、图片、名称、地址、类型等相关信息
4. 具有剪贴板功能
5. 能够看出原始的 json 信息

::: warning 路径转移
目前这方面维护已交由后端 sql 进行处理，前端不在维护路径上，故不行进行处理。
:::

## 关于公共库

### 公共库的基础搭建和引入 :white_check_mark:

通过 `submodule` 进行代码共享，通过 `tsc` 转译 ts 文件至 js 文件。

### 如何方便引入 :white_check_mark:

因为现在发布都是走的 `jenkins`，如何让每个项目都拉取公共库，这是一个值得讨论的问题。

::: tip 模板引入
运维目前给 `jenkins` 添加了公有模板，使得每次都会去拉取公共库代码（如果仓库中没有添加公共库，也不会有影响）。
:::

### vue-demi :x:

vue-demi 旨在编写一套代码，可以兼容 vue3 以及 vue2。

::: warning 放弃探索
目前 vant 官方并不打算支持 `vue-demi`，并且该库偏底层一些，占用时间比较长（并且路线不明），放弃。
:::

### 函数补充 :white_check_mark:

常用函数以及文档已编写完毕。

::: tip vscode region
目前函数注释通过 `vscode region` 进行代码引入的方式，详情见：[Import Code Snippets](https://vitepress.vuejs.org/guide/markdown#import-code-snippets)。
:::

### vue3 组件补充 :raised_hands:

先考虑支持 `vue3` 版本，目前正在慢速增加中。

### vue3 hook 补充

先考虑支持 `vue3` 版本，目前待支持中。

### vue3 指令补充

目前还未清楚，业务中暂时要哪些指令

### JSBridge :white_check_mark:

目前 `JSBridge` 已开发完毕，详情见：[JSBridge](/frontend-js-bridge-guide/README.html)。

::: warning 风险点
APP 方并没有对这种模式进行预演，而是在项目开发周期中进行引入直接开发。目前已经发现安卓方已有多个[不理想点](/frontend-js-bridge-guide/index.html)。这种方式下，存在 APP 变更框架模式的情况（目前 H5 是跟随 APP 方的技术走的，虽然自己也之前实现过，不过为了方便 APP 就跟随 APP 方的技术）。
:::

### 统一登录注册页 :raised_hands:

开发一个统一登录注册页组件

::: warning TODO
目前开发了一个统一登录组件，后面需要将其管理在某一个项目中。
:::

### 微信流程封装 :white_check_mark:

封装微信流程，使得使用更加方便。详情见：[微信](/frontend-common-guide/utils/weChat.html)。

## 关于小程序

目前后期很有可能在小程序上进行发力，需要有空时针对小程序进行技术储备。目前市面上小程序常用框架一般是：[taro](https://docs.taro.zone/docs/) 或者 [uniapp](https://uniapp.dcloud.net.cn/)

在前几年，一般开发会认定 react 技术栈认定 taro，而 vue 技术栈认定 uniapp。但是目前如何选择还需要进行一定的考虑。并且还需要考虑的是，组件库的选择。

根据在论坛上询问，taro 目前在 `vue3` 中编译性能不够高，在开发阶段中比较卡（即使到 3.5 版本，当然本人没有进行实验），这方面需要持续跟进中。

::: info 目前掌握的信息
目前发现小程序最大的问题还是维护度的问题，很有可能在使用的开源框架就不进行更新了。
所以这里个人更加推荐更加稳定的原生：
`uniapp` + `uni-ui` 进行开发（这样使用的好处是贴近 vue 技术栈并且不会脱离更新）。
:::

## 关于 SSR

目前后续期很有可能在 SSR 服务端渲染进行发力（因为需要做官网），需要有空时针对 SSR 进行技术储备。一般来说，官网一般都是 `react` 加 `next.js` 进行开发，但是目前我们的技术栈是以 `vue3` 为主，这一部分还是要考虑 [nuxt3](https://v3.nuxtjs.org/) 是否有能力去承载这一开发内容。

当前这块还需要 `docker` 相关的知识。