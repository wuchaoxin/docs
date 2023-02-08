# 如何贡献代码

原则上这个仓库不会迁移代码，而是进行代码重构，请保证代码质量以及注释丰富。

> 如果你有防抖、节流等工具函数的使用需求，请直接使用 [vue-use](https://vueuse.org/) 这个 hook 函数库，无需开发新的工具函数。

## 分支说明

`master`、`master-template`、`master-cli` 这三个分支，开发者没有权限去 `merge` 以及 `push`，如果你有相关修改，请遵循一下步骤：

开发或者迭代（`feature` 也可以叫做 `task`）：
1. 拉出 `feature/xxx` 分支，开发完毕后，提出 `Merge Request` 给到仓库维护者
2. 维护者进行 `Code Review`，`feature` 分支将被删除

修复问题：
1. 拉出 `bugfix/xxx` 分支，开发完毕后，提出 `Merge Request` 给到仓库维护者
2. 维护者进行 `Code Review`，`bugfix` 分支将被删除

> 原则上，除 `master` 相关分支外，你的分支不应该在仓库停留过长，如果你有此需求，请将分支改名为 `release/xxx` 作为停靠分支。

## Effect

### 禁止未知来源

所有的组件、函数、样式（工具类样式函数除外）不允许在文件中不知道来源。也就是说组件不允许全局注册，函数不允许挂载到 window 等对象上，样式不得随意全局污染。组件应该与样式进行强绑定，而非通过样式文件到处穿插。

同时，禁止魔术常量，也就是说禁止直接出现具体的数字或者字符，你应该用枚举或者对象进行声明（名称需要大写下划线形式）。

### 纯函数

在函数式编程中，函数分为纯函数、副作用函数。如果一个函数只依赖实参，而不依赖其他外部参数并且函数运行后，并不会对外部环境造成影响的贼为纯函数，否则这个函数是一个副作用函数。我们在平时开发时，尽量书写纯函数（方便进行迁移工作）。举例：
```js
let temp = 0
// 纯函数
function pureFn(params) {
    return params + 'pure'
}
// 副作用函数
function effectFn(params) {
    temp = params
    return temp + 'pure'
}
```

## Only TypeScript

此仓库中必须使用 `typeScript`。如果你需要使用 `javaScript`，请同时开发好相关的类型声明文件，否则你应该重构。 但是代码也兼容`javaScript`，在 `utils` 文件夹下编写相关函数，而 `js` 文件夹通过 `npm run build` 进行生成即可。这样的的好处在于，编写一套代码，从而可以支持 `ts` 以及 `js`，并且 `js` 可以支持类型推导，相关设置参见 `tsconfig.json`。

[编译选项说明](https://www.tslang.cn/docs/handbook/compiler-options.html)

> 想要运行 `npm run build` 命令，需要在全局安装 `typescript` ,命令: `sudo npm install typescript -g`。

## 注释规范

首先，你需要学会如何配置代码片段

1. 按下组合键 ctrl(command) + shift + p 
2. 在出现的输入框输入 snippets，回车
3. 输入 ts，进入 typeScript.json文件夹下
4. 将下面的配置进行拷贝
5. 使用：在 ts 文件中输入 ts 即可看见相关配置的片段

> js 同理也是如此操作，只是将 ts 换成 js 即可。
```json
{
	"Print to tsNoteTitle": {
		"prefix": "tsNote",
		"body": [
			"/**",
			" * @description",
			" */"
		],
		"description": "TS注释"
	},
	"Print to tsNoteMethod": {
		"prefix": "tsMethodNote",
		"body": [
			"/**",
			" * @description",
			" * @param {null} ${1:参数1}",
			" * @param {null} ${2:参数2}",
			" * @returns {void}",
            " * @example ",
			" */"
		],
		"description": "TS方法注释"
	}
}
```

### 文件注释

文件注释主要说明这个文件的具体作用，让进入者通过文件名以及文件注释，一眼知道这个文件的作用。例如，输入 `tsNote`（根据上述配置），然后声明这个文件的作用。

### 函数注释

函数注释主要说明这个函数的具体入参、返回、作用，让使用者通过注释，一眼知道这个函数的作用。例如，输入 `tsMethodNote`（根据上述配置），然后写入注释。

###  组件注释

组件注释主要通过文件下的 `README.md` 进行书写（当然，你也应该添加文件注释）

## git 提交规范

建议开启 `CommitLint`，使得你的提交更加规范。

### 安装 CZ

1. 安装 commitizen：`npm install -g commitizen`
2. 生成适配器：`commitizen init cz-conventional-changelog --save-dev --save-exact`
3. 全局指定适配器：`echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc`
4. 往后提交使用 `git cz` 代替 `git commit` 指令

相信我，这不会让你的提交过程有过多心智负担，反而使得你追溯自己的提交更有效率。

### 提交性质

值 | 描述
---|---
feat |  新增一个功能
fix|修复一个Bug
docs|文档变更
style|代码格式（不影响功能，例如空格、分号等格式修正）
refactor|既不修复错误也不添加功能的代码更改
perf|提高性能的代码更改
test|添加缺失的测试或纠正现有的测试
build|影响构建系统或外部依赖项的更改（示例范围：gulp、broccoli、npm）
ci|对我们的 CI 配置文件和脚本的更改（示例范围：Travis、Circle、Browser Stack、Sauce Labs）
chore|不修改 src 或测试文件的其他更改
revert|恢复之前的提交

## 命名规范

### 函数命名

+ 以 `get` 开头的函数都为类纯函数（不带有副作用，但是可能依赖外部变量），并且有返回值。
+ 以 `is` 开头的函数都为不确定类型函数，有 boolean 返回值或者 Promise 类型的 boolean（没有 catch）。
+ 已 `judge` 开头的函数都为副作用函数（带有副作用），可能有返回值，多用于用户判断。
+ 已 `handle` 开头的函数都为副作用函数（带有副作用），有返回值。
+ 已 `generate` 开头的函数都为副作用函数（带有副作用）生成相关结果，无返回值。
+ 已 `use` 开头的函数都为类纯函数（不带有副作用）且本身使用了 vue 相关的 api 或者大规模的逻辑抽离，多为同步函数，也有 promise 风格出现。

### SFC 命名

+ 页面命名：以小骆驼峰为准
+ 组件命名：以大骆驼峰为准（业务组件中文件夹使用小写，共用组件中文件夹使用大写）
+ css class 命名：以短横线为准

> 尽量不要出现 Test > Test.vue 这种多层且为文件夹和文件相同名称大写命名方式。

> 由于 mac、git、以及 vue setup自动注册的原因，你最好不要去修改一个组件的大小写关系。如果修改后发现运行有问题，排除掉 git 大小写敏感的问题；多半是自动注册的原因，这个时候，你可以备份源文件，删除掉文件，重新创建。(PS：如果你修改文件大小写名，发现无论怎么操作 TS 都会失效，这个时候最好将项目删除，然后利用 git 恢复回来)