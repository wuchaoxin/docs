# 组件说明

## 需要提前进行引入的文件

在使用前，你需要提前从公共库进行引入这么几个文件：

+ `_variable.scss`：变量名（从 webpack、vite 配置里注入）
+ `_utils.scss`：混入工具包（从 webpack、vite 配置里注入）
+ `common-class.scss`：公共的 class 样式（在入口处引入，已做前缀添加，保证唯一性）

## 组件公有属性统一说明

某些组件有统一的属性，在文档中不会单独罗列出来进行说明，只在属性中标明是否具有。

### design

`design` 标明了当前的组件是按照多少的设计图宽度进行处理的，默认是`375`，如果你是其他设计宽度则需要传入修复。

> 注：这里的 `design` 知识对于 `js` 逻辑的，如果你想要 `css` 也是按照对应设计图宽度走，请从 `postcss` 配置处进行动态修改（识别路径）。

### style | []Style

虽然组件都是按照 UI 规范进行开发的，但是免不了设计图会出现一些特殊情况，所以针对一些场景会暴露一些属性用于`style`样式注入，进行快速修改样式（当然你也可以选择使用样式穿透）。