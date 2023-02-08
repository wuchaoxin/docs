# frontend-common

仓库地址：[frontend-common](https://gitlab.healthych.com/front/frontend-common)

该仓库旨在将所有工具类的设置以及函数进行统一处理，已达到提升效率的作用。

> 如果你想要进行贡献代码，请先查看贡献文档。

## 分支说明

1. master：配置以及函数主分支（常用分支），建设优先级高
2. master-template：架子主分支，用于存放基础架子，建设优先级中
3. master-cli：简易脚手架主分支，用于快速拉取写入架子，建设优先级低

## submodule

强烈建议该仓库作为子仓库进行引入（submodule）

关于 [submodule](https://juejin.cn/post/6844903572950401038) 的介绍以及说明

### 如何使用

1. 如果是首次引入直接运行 `git submodule add 仓库地址`
2. 如果仓库已有 `submodule` 设置，需要运行 `git submodule init` 以及 `git submodule update` 进行拉取代码

> 值得注意的是：请不要反复引入 submodule ，因为删除 submodule 会涉及好几个隐藏文件，稍稍有点麻烦

> 当然，路径需要设置别名是最方便的。

别名示例：
```js
"@common": path.resolve(__dirname, "frontend-common"),
"@common-utils": path.resolve(__dirname, "frontend-common/utils"),
```

> 当然别忘记配置 `tsconfig.json` 或者 `jsconfig.json` 相关 `paths` 配置

### 卸载 submodule

> git 目录需要你打开查看隐藏目录

1. 需要先暂存 `.gitmodules` 文件, 否则会报错
2. 删除你想卸载的 submodule 目录
3. 修改 `.gitmodules`：移除对应的 submodule 信息, 只有1个 submodule 信息也可以删除该文件
4. 进入 `git/modules`：移除对应的 submodule 目录
5. 进入 `.git/config`：移除对应的 submodule 信息

## 使用必要操作

### 引入类型声明文件

在 `tsconfig.json` 中的 `include` 中，加入 `frontend-common/shims.d.ts`。

> 请注意项目中的 `shims.d.ts` 不要和公共库里的 `shims.d.ts` 冲突。

### 老项目引入

如果在老项目中引入公共库，可能会报类型错误，需将 `.babelrc` 修改为 `babel.config.js`。
两者区别请见[此处](https://zhuanlan.zhihu.com/p/367724302)。

> `.babelrc` 是局部配置，`babel.config.js` 是全局配置。公共库被识别为一个项目了，导致公共库没有过 babel，所以会报错。引入公共库的项目应当使用 `babel.config.js`。详细解释请见[此处](https://stackoverflow.com/questions/52990965/babel-submodule-unexpected-token-import)。

::: warning 提示
如果你将 `.babellrc` 修改为 `babel.config.js`，发现 babel 配置直接没有生效。请检查 babel 版本，@babel/core 7.7 以上，才能使用 babel.config.js。
:::