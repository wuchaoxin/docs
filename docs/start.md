# 说明

::: warning 警告
当前`VitePress`还属于`alpha`阶段，不建议将其放入正式的项目中。如果你有相关需求需要移步至[VuePress](https://v2.vuepress.vuejs.org/zh/)
:::
> 即使`VuePress`最新版本处于`beta`阶段也会比`VitePress`稳定，因为`VitePress`刚进入 `1.0.0-alpha`，api 相关可能会发生变动。

## WHY

为什么要搭建一个前端文档？目前前端文档没有进行整合，这里主要对文档（内部以及外部）进行一个整合，并且提供一个比较好的可视化查看。

## HOW

由于目前文档库都由一人来维护，所以不适合进行单独的文档维护。除了基础的说明文档，其他文档都应该采用`git submodule`的形式，引入其他仓库的`Markdown`文件，而函数说明相关则通过`VS Code region`进行局部引用（你可以参见组件库的 README 示例）。如果有更新，那么更新`submodule`进行重新部署即可，所以维护这个文档心智负担并不是很大（前提是大家都有良好的写书`Markdown`文件的习惯）。

> 后续待组件库稳定后，可以考虑将文档进行回迁工作。

## RELEASE

目前的部署流程，打算通过`git`固定的分支的`hook`去触发`Jenkins`发布（当前 push 之前你应该先去拉`submodule`一次）。

> 从很大程度已经降低维护的心智负担。流程：拉取`submodule`->`git push`->`Jenkins`自动发布。

## DESIGN

本项目通过[VitePress](https://vitepress.vuejs.org/)进行构建生成。为何采用`VitePress`，而非其他构建工具呢？因为`VitePress`原生支持`Vue3`写法，可以快速进行构建并且执行`Vue3`语法。不采用`VuePress`的原因就是`VitePress`相比`VuePress`配置更加简单、易懂。

当前缺点也显而易见，`VitePress`暂时没有中文文档，并且相比`VuePress`，`VitePress`的生态并不丰富。