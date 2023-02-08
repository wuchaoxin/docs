
如果你有防抖、节流等工具函数的使用需求，请直接 ...`,l:"frontend-common-guide/CONTRIBUTOR.html",a:"如何贡献代码"},"1.1":{t:"分支说明",p:"master、master-template、master-cli 这三个分支，开发者没有权限去 merge 以及 push ...",l:"frontend-common-guide/CONTRIBUTOR.html#分支说明",a:"分支说明"},"1.2":{t:"effect",p:"",l:"frontend-common-guide/CONTRIBUTOR.html#effect",a:"effect"},"1.3":{t:"禁止未知来源",p:"所有的组件、函数、样式（工具类样式函数除外）不允许在文件中不知道来源。也就是说组件不允许全局注册，函数不允许挂载到 wind ...",l:"frontend-common-guide/CONTRIBUTOR.html#禁止未知来源",a:"禁止未知来源"},"1.4":{t:"纯函数",p:"在函数式编程中，函数分为纯函数、副作用函数。如果一个函数只依赖实参，而不依赖其他外部参数并且函数运行后，并不会对外部环境造成 ...",l:"frontend-common-guide/CONTRIBUTOR.html#纯函数",a:"纯函数"},"1.5":{t:"only-typescript",p:"此仓库中必须使用 typeScript。如果你需要使用 javaScript，请同时开发好相关的类型声明文件，否则你应该重构 ...",l:"frontend-common-guide/CONTRIBUTOR.html#only-typescript",a:"only-typescript"},"1.6":{t:"注释规范",p:`首先，你需要学会如何配置代码片段

按下组合键 ctrl(command) + shift + p
在出现的输入框输入 sn ...`,l:"frontend-common-guide/CONTRIBUTOR.html#注释规范",a:"注释规范"},"1.7":{t:"文件注释",p:"文件注释主要说明这个文件的具体作用，让进入者通过文件名以及文件注释，一眼知道这个文件的作用。例如，输入 tsNote（根据上 ...",l:"frontend-common-guide/CONTRIBUTOR.html#文件注释",a:"文件注释"},"1.8":{t:"函数注释",p:"函数注释主要说明这个函数的具体入参、返回、作用，让使用者通过注释，一眼知道这个函数的作用。例如，输入 tsMethodNot ...",l:"frontend-common-guide/CONTRIBUTOR.html#函数注释",a:"函数注释"},"1.9":{t:"组件注释",p:`组件注释主要通过文件下的 README.md 进行书写（当然，你也应该添加文件注释）
`,l:"frontend-common-guide/CONTRIBUTOR.html#组件注释",a:"组件注释"},"1.10":{t:"git-提交规范",p:`建议开启 CommitLint，使得你的提交更加规范。
`,l:"frontend-common-guide/CONTRIBUTOR.html#git-提交规范",a:"git-提交规范"},"1.11":{t:"安装-cz",p:`
安装 commitizen：npm install -g commitizen
生成适配器：commitizen init ...`,l:"frontend-common-guide/CONTRIBUTOR.html#安装-cz",a:"安装-cz"},"1.12":{t:"提交性质",p:`


值
描述




feat
新增一个功能


fix
修复一个Bug


docs
文档变更


style
代码格式 ...`,l:"frontend-common-guide/CONTRIBUTOR.html#提交性质",a:"提交性质"},"1.13":{t:"命名规范",p:"",l:"frontend-common-guide/CONTRIBUTOR.html#命名规范",a:"命名规范"},"1.14":{t:"函数命名",p:`
以 get 开头的函数都为类纯函数（不带有副作用，但是可能依赖外部变量），并且有返回值。
以 is 开头的函数都为不确定类 ...`,l:"frontend-common-guide/CONTRIBUTOR.html#函数命名",a:"函数命名"},"1.15":{t:"sfc-命名",p:`
页面命名：以小骆驼峰为准
组件命名：以大骆驼峰为准（业务组件中文件夹使用小写，共用组件中文件夹使用大写）
css clas ...`,l:"frontend-common-guide/CONTRIBUTOR.html#sfc-命名",a:"sfc-命名"},"2.0":{t:"frontend-common",p:`仓库地址：frontend-common
该仓库旨在将所有工具类的设置以及函数进行统一处理，已达到提升效率的作用。

如果你 ...`,l:"frontend-common-guide/README.html",a:"frontend-common"},"2.1":{t:"分支说明",p:`
master：配置以及函数主分支（常用分支），建设优先级高
master-template：架子主分支，用于存放基础架子， ...`,l:"frontend-common-guide/README.html#分支说明",a:"分支说明"},"2.2":{t:"submodule",p:`强烈建议该仓库作为子仓库进行引入（submodule）
关于 submodule 的介绍以及说明
`,l:"frontend-common-guide/README.html#submodule",a:"submodule"},"2.3":{t:"如何使用",p:`
如果是首次引入直接运行 git submodule add 仓库地址
如果仓库已有 submodule 设置，需要运行 g ...`,l:"frontend-common-guide/README.html#如何使用",a:"如何使用"},"2.4":{t:"卸载-submodule",p:`
git 目录需要你打开查看隐藏目录


需要先暂存 .gitmodules 文件, 否则会报错
删除你想卸载的 submo ...`,l:"frontend-common-guide/README.html#卸载-submodule",a:"卸载-submodule"},"2.5":{t:"使用必要操作",p:"",l:"frontend-common-guide/README.html#使用必要操作",a:"使用必要操作"},"2.6":{t:"引入类型声明文件",p:`在 tsconfig.json 中的 include 中，加入 frontend-common/shims.d.ts。

请 ...`,l:"frontend-common-guide/README.html#引入类型声明文件",a:"引入类型声明文件"},"2.7":{t:"老项目引入",p:`如果在老项目中引入公共库，可能会报类型错误，需将 .babelrc 修改为 babel.config.js。
两者区别请见此 ...`,l:"frontend-common-guide/README.html#老项目引入",a:"老项目引入"},"3.0":{t:"styles",p:`此处主要放置跟样式相关的东西。
目前从技术栈来讲，会使用 sass、less、tailwindcss、windicss。但是 ...`,l:"frontend-common-guide/styles/README.html",a:"styles"},"4.0":{t:"sass",p:`将 Sass 一般常用样式设置以及混入 mixin 提取。
`,l:"frontend-common-guide/styles/sass/README.html",a:"sass"},"4.1":{t:"sass-官网",p:`Sass 官网
也可以直接看我写的文章 Sass 介绍
`,l:"frontend-common-guide/styles/sass/README.html#sass-官网",a:"sass-官网"},"4.2":{t:"关于命名问题",p:`待 _ 开头的文件 Sass 只会导入不会编译（里面的 CSS 并不会生效），而且让人一眼就能明白这是个全局变量文件。
`,l:"frontend-common-guide/styles/sass/README.html#关于命名问题",a:"关于命名问题"},"5.0":{t:"混入",p:"",l:"frontend-common-guide/styles/sass/utils.html",a:"混入"},"5.1":{t:"textoverflow",p:`文字溢出处理
&lt;&lt;&lt; @/frontend-common/styles/sass/_utils.scss# ...`,l:"frontend-common-guide/styles/sass/utils.html#textoverflow",a:"textoverflow"},"5.2":{t:"safetop",p:`IOS 开启顶部安全距离
&lt;&lt;&lt; @/frontend-common/styles/sass/_utils ...`,l:"frontend-common-guide/styles/sass/utils.html#safetop",a:"safetop"},"5.3":{t:"safebottom",p:`IOS 开启底部安全距离
&lt;&lt;&lt; @/frontend-common/styles/sass/_utils ...`,l:"frontend-common-guide/styles/sass/utils.html#safebottom",a:"safebottom"},"5.4":{t:"zindex",p:"z-index 的设置，解决在ios下偶尔 z-index 不生效（原因是设置了-webkit-overflow-scrol ...",l:"frontend-common-guide/styles/sass/utils.html#zindex",a:"zindex"},"5.5":{t:"autofontfamily",p:"autoFontFamily 是为了设置好字体的 fallback 机制，值得注意安卓预装了 MiSans 字体，我们只需要 ...",l:"frontend-common-guide/styles/sass/utils.html#autofontfamily",a:"autofontfamily"},"5.6":{t:"autofontweight",p:"autoFontWeight 是为了区分安卓下对很多字体 font-weight 不支持，所以我们在这里直接判断安卓下如果小 ...",l:"frontend-common-guide/styles/sass/utils.html#autofontweight",a:"autofontweight"},"5.7":{t:"setbackgroundimage",p:`处理图片分辨率问题，如果你使用的是svg，则不应该使用该函数（原理：根据图片名称，自动加入不同分辨率的图片）
&lt;&lt ...`,l:"frontend-common-guide/styles/sass/utils.html#setbackgroundimage",a:"setbackgroundimage"},"5.8":{t:"setbackgroundimagefortheme",p:`setBackgroundImage 混入的变种，目的是为了处理多主题的图片
自动加入 dark 类，然后 dark 类下加 ...`,l:"frontend-common-guide/styles/sass/utils.html#setbackgroundimagefortheme",a:"setbackgroundimagefortheme"},"5.9":{t:"thinborder",p:`处理 1px 问题（原理：利用伪元素画出一个 div，再将这个 div 进行取消互动事件以及局部缩放处理）
&lt;&lt; ...`,l:"frontend-common-guide/styles/sass/utils.html#thinborder",a:"thinborder"},"5.10":{t:"基础使用",p:`// 提前在 webpack 或者 vite 中引入样式
.test {
    @include textOverflow ...`,l:"frontend-common-guide/styles/sass/utils.html#基础使用",a:"基础使用"},"6.0":{t:"变量",p:`根据 UI 设计规范，而提炼出来的 sass 变量。
&lt;&lt;&lt; @/frontend-common/styl ...`,l:"frontend-common-guide/styles/sass/variable.html",a:"变量"},"7.0":{t:"tailwindcss",p:`现代 css 预处理器，目前还需要进行 demo 产出后，进行后一步的工具提取。
`,l:"frontend-common-guide/styles/tailwindcss/README.html",a:"tailwindcss"},"7.1":{t:"文档说明",p:`
应当使用 tailwindcss 3.x 否则本地开发可能会有性能问题，一切以英文官网为主。

英文 3.x 文档
中文  ...`,l:"frontend-common-guide/styles/tailwindcss/README.html#文档说明",a:"文档说明"},"8.0":{t:"utils",p:"这个目录放的是常见的工具类函数，像一些防抖、节流等未出现的函数你应该直接使用 vue-use 里的（不仅好用，还自带响应式， ...",l:"frontend-common-guide/utils/README.html",a:"utils"},"8.1":{t:"兼容-js",p:`目前代码都是用 TS 书写，但是你可以通过 npm run build 命令去生成 utils-js文件夹去支持 JS。
`,l:"frontend-common-guide/utils/README.html#兼容-js",a:"兼容-js"},"8.2":{t:"types-目录",p:`types 目录下放置的是:

const：常量的定义，防止出现魔术常量
typings: 类型的统一放置地方


如果你需 ...`,l:"frontend-common-guide/utils/README.html#types-目录",a:"types-目录"},"9.0":{t:"ua",p:`用于判断用户当前的访问平台相关信息，该工具旨在快速判断平台相关信息。
UA 可以得到以下信息（detail）：

syste ...`,l:"frontend-common-guide/utils/UA.html",a:"ua"},"9.1":{t:"暴露方法",p:`从以上信息中，衍生出了一些快速判断的方法，见下方：
&lt;&lt;&lt; @/frontend-common/utils ...`,l:"frontend-common-guide/utils/UA.html#暴露方法",a:"暴露方法"},"9.2":{t:"基础使用",p:`import UADetector from '@common-utils/UA'

const UA = new UADe ...`,l:"frontend-common-guide/utils/UA.html#基础使用",a:"基础使用"},"10.0":{t:"buriedpoint",p:`埋点相关的函数，基于 神策 1.24.2 二次开发。
具体的数据模型请参见具体的 TS 接口，具体的常量设置请参见 type ...`,l:"frontend-common-guide/utils/buriedPoint.html",a:"buriedpoint"},"10.1":{t:"initburiedpoint",p:`初始化埋点信息（一般放在 main.ts 中），该函数操作内容如下：

下载 SDK
初始化埋点请求
初始化埋点信息

&l ...`,l:"frontend-common-guide/utils/buriedPoint.html#initburiedpoint",a:"initburiedpoint"},"10.2":{t:"sensorstrack",p:`触发埋点
&lt;&lt;&lt; @/frontend-common/utils/buriedPoint.ts#senso ...`,l:"frontend-common-guide/utils/buriedPoint.html#sensorstrack",a:"sensorstrack"},"10.3":{t:"pageviewtrack",p:`web 浏览页面事件上报（该方法一般放在路由拦截器中）
&lt;&lt;&lt; @/frontend-common/uti ...`,l:"frontend-common-guide/utils/buriedPoint.html#pageviewtrack",a:"pageviewtrack"},"10.4":{t:"getappkeyandsecret",p:`获取数据上报的 key 和 secret，因为不同环境以及项目的 key 和 secret 不一样。
&lt;&lt;&lt ...`,l:"frontend-common-guide/utils/buriedPoint.html#getappkeyandsecret",a:"getappkeyandsecret"},"10.5":{t:"sdk说明",p:"目前web埋点SDK采用 神策数据 开源方案，由于特殊需求和后端接口参数规范，进行了二次开发，对相关的API进行了调整。当前 ...",l:"frontend-common-guide/utils/buriedPoint.html#sdk说明",a:"sdk说明"},"10.6":{t:"ajax方法添加token信息",p:`function ajax(para) {
  // 获取请求头 token
  var tk = saCookie.get ...`,l:"frontend-common-guide/utils/buriedPoint.html#ajax方法添加token信息",a:"ajax方法添加token信息"},"10.7":{t:"注释以下预置属性",p:"属性is_first_time 由于产品需求和源码表达的意思不一样，要求是当前事件是否首次触发，故在后续 initSenso ...",l:"frontend-common-guide/utils/buriedPoint.html#注释以下预置属性",a:"注释以下预置属性"},"10.8":{t:"重写参数base64方法",p:`直接将参数进行 base64 编码，返回 base64 数据，进行接口数据上报。
`,l:"frontend-common-guide/utils/buriedPoint.html#重写参数base64方法",a:"重写参数base64方法"},"10.9":{t:"before",p:`kit.encodeTrackData = function(data) {
  var dataStr = base64E ...`,l:"frontend-common-guide/utils/buriedPoint.html#before",a:"before"},"10.10":{t:"after",p:`kit.encodeTrackData = function(data) {
  return base64Encode(d ...`,l:"frontend-common-guide/utils/buriedPoint.html#after",a:"after"},"10.11":{t:"重写getsenddata",p:`重写获取埋点属性参数方法。
`,l:"frontend-common-guide/utils/buriedPoint.html#重写getsenddata",a:"重写getsenddata"},"10.12":{t:"before",p:`function getSendData(data) {
  return sd.kit.encodeTrackData(d ...`,l:"frontend-common-guide/utils/buriedPoint.html#before",a:"before"},"10.13":{t:"after",p:`_SET_SEND_DATA 在 initSensors.js 文件中进行了重写，为了输出同一格式的属性数据。
/**
 * ...`,l:"frontend-common-guide/utils/buriedPoint.html#after",a:"after"},"10.14":{t:"post请求contenttype",p:`新增 contentType: application/json
AjaxSender.prototype.start =  ...`,l:"frontend-common-guide/utils/buriedPoint.html#post请求contenttype",a:"post请求contenttype"},"10.15":{t:"调整post请求data参数",p:"去除POST请求data参数中 data_list=,去除 encodeURIComponent 编码格式，只保留输出 ba ...",l:"frontend-common-guide/utils/buriedPoint.html#调整post请求data参数",a:"调整post请求data参数"},"10.16":{t:"重写批量上报add缓存方法",p:`批量上报时，调用 _SET_SEND_DATA 方法，将存储在 localStorage 的数据进行同一格式输出。
add: ...`,l:"frontend-common-guide/utils/buriedPoint.html#重写批量上报add缓存方法",a:"重写批量上报add缓存方法"},"11.0":{t:"cookie",p:`使用 js-cookie 进行了一次二次包装，用于 cookie 相关的设置。
相关配置项请参见 js-cookie 说明。 ...`,l:"frontend-common-guide/utils/cookie.html",a:"cookie"},"11.1":{t:"获取-cookie",p:`&lt;&lt;&lt; @/frontend-common/utils/cookie.ts#getCookie
`,l:"frontend-common-guide/utils/cookie.html#获取-cookie",a:"获取-cookie"},"11.2":{t:"设置-cookie",p:`&lt;&lt;&lt; @/frontend-common/utils/cookie.ts#setCookie
`,l:"frontend-common-guide/utils/cookie.html#设置-cookie",a:"设置-cookie"},"11.3":{t:"基础使用",p:`import { getCookie } from '@common-utils/cookie'

getCookie()
 ...`,l:"frontend-common-guide/utils/cookie.html#基础使用",a:"基础使用"},"12.0":{t:"cos",p:"对象存储（Cloud Object Storage，COS）是腾讯云提供的一种存储海量文件的分布式存储服务，用户可通过网络随 ...",l:"frontend-common-guide/utils/cos.html",a:"cos"},"12.1":{t:"封装-api",p:"",l:"frontend-common-guide/utils/cos.html#封装-api",a:"封装-api"},"12.2":{t:"uploadfile",p:`上传单个文件
&lt;&lt;&lt; @/frontend-common/utils/cos.ts#uploadFile
`,l:"frontend-common-guide/utils/cos.html#uploadfile",a:"uploadfile"},"12.3":{t:"uploadmultiplefiles",p:`上传多个文件
&lt;&lt;&lt; @/frontend-common/utils/cos.ts#uploadMulti ...`,l:"frontend-common-guide/utils/cos.html#uploadmultiplefiles",a:"uploadmultiplefiles"},"12.4":{t:"removefile",p:`删除腾讯云上的单个文件
&lt;&lt;&lt; @/frontend-common/utils/cos.ts#remove ...`,l:"frontend-common-guide/utils/cos.html#removefile",a:"removefile"},"12.5":{t:"removemultiplefiles",p:`删除腾讯云上的多个文件
&lt;&lt;&lt; @/frontend-common/utils/cos.ts#remove ...`,l:"frontend-common-guide/utils/cos.html#removemultiplefiles",a:"removemultiplefiles"},"12.6":{t:"createdir",p:`创建一个目录
::: tip 删除目录
对象存储中本身是没有目录的概念的，为了满足用户使用习惯，用户可通过分隔符/来模拟“目 ...`,l:"frontend-common-guide/utils/cos.html#createdir",a:"createdir"},"12.7":{t:"getdirfiles",p:`列出目录下的所有文件
&lt;&lt;&lt; @/frontend-common/utils/cos.ts#getDirF ...`,l:"frontend-common-guide/utils/cos.html#getdirfiles",a:"getdirfiles"},"13.0":{t:"design",p:"移动端有响应式的适配，需要我们在运行时进行单位换算，而 design 就是为了处理这种现象，根据传入的设计图尺寸（默认 37 ...",l:"frontend-common-guide/utils/design.html",a:"design"},"13.1":{t:"px2px",p:`将设计图上 px值 转换为实际的 px值
&lt;&lt;&lt; @/frontend-common/utils/desi ...`,l:"frontend-common-guide/utils/design.html#px2px",a:"px2px"},"13.2":{t:"px2viewport",p:`将设计图上 px值 转换为实际的 vw值
&lt;&lt;&lt; @/frontend-common/utils/desi ...`,l:"frontend-common-guide/utils/design.html#px2viewport",a:"px2viewport"},"13.3":{t:"px2percentage",p:`将设计图上 px值 按照屏幕宽度转换为实际的 百分比
&lt;&lt;&lt; @/frontend-common/util ...`,l:"frontend-common-guide/utils/design.html#px2percentage",a:"px2percentage"},"13.4":{t:"基础使用",p:`import Desgin from '@common-utils/design'

const desgin = new  ...`,l:"frontend-common-guide/utils/design.html#基础使用",a:"基础使用"},"14.0":{t:"dom",p:`与 dom 操作相关的函数，目前还不够丰富。
`,l:"frontend-common-guide/utils/dom.html",a:"dom"},"14.1":{t:"switchscroll",p:"在移动端，当我们打开弹窗或者遮罩的时候我们并不希望背景也跟着一起滑动，故我们打开弹窗或者遮罩的时候锁定背景，关闭时释放背景。 ...",l:"frontend-common-guide/utils/dom.html#switchscroll",a:"switchscroll"},"14.2":{t:"基础使用",p:`import { switchScroll } from '@common-utils/dom'

switchScroll ...`,l:"frontend-common-guide/utils/dom.html#基础使用",a:"基础使用"},"15.0":{t:"environment",p:`与环境操作相关的函数
`,l:"frontend-common-guide/utils/environment.html",a:"environment"},"15.1":{t:"getenv",p:`根据域名获取当前的运行环境

qa：测试环境
stage：预发环境
live：正式环境

&lt;&lt;&lt; @/fr ...`,l:"frontend-common-guide/utils/environment.html#getenv",a:"getenv"},"15.2":{t:"getenvflag",p:`反向获取当前环境对应的 flag。

因为目前域名命名很烂，qa 对应 3，stage 对应 1，live 没有数字，所以会 ...`,l:"frontend-common-guide/utils/environment.html#getenvflag",a:"getenvflag"},"15.3":{t:"getproject",p:`根据当前的域名获取到当前是哪一个项目（这里的名字为了方便统一记住，使用的其实是仓库的大写名）。
&lt;&lt;&lt; @ ...`,l:"frontend-common-guide/utils/environment.html#getproject",a:"getproject"},"16.0":{t:"error",p:`跟错误捕获相关的函数
`,l:"frontend-common-guide/utils/error.html",a:"error"},"16.1":{t:"handleglobalerror",p:`处理全局的资源、运行、promise错误（一般在main.ts引入，可以不传入参数，当有错误时，控制台会自动打印错误）
&l ...`,l:"frontend-common-guide/utils/error.html#handleglobalerror",a:"handleglobalerror"},"16.2":{t:"handlerendererror",p:"处理渲染错误（仅针对 vue3）（一般在main.ts引入，将 vue3 创建的 app 传入，可以不传入处理函数，控制台会 ...",l:"frontend-common-guide/utils/error.html#handlerendererror",a:"handlerendererror"},"16.3":{t:"handlerequesterror",p:`处理请求错误（注意：只要不为成功 code，都为请求错误），封装的axios已包含此函数，一般不会使用此函数。
&lt;&l ...`,l:"frontend-common-guide/utils/error.html#handlerequesterror",a:"handlerequesterror"},"17.0":{t:"exteriorscript",p:`外部脚本加载，本质这些函数作为一个 script 插入至页面中，根据加载情况返回 promise
`,l:"frontend-common-guide/utils/exteriorScript.html",a:"exteriorscript"},"17.1":{t:"wechatjssdkinit",p:`注入微信 JS-SDK
&lt;&lt;&lt; @/frontend-common/utils/exteriorScrip ...`,l:"frontend-common-guide/utils/exteriorScript.html#wechatjssdkinit",a:"wechatjssdkinit"},"17.2":{t:"mockinit",p:`开启 mock
&lt;&lt;&lt; @/frontend-common/utils/exteriorScript.ts ...`,l:"frontend-common-guide/utils/exteriorScript.html#mockinit",a:"mockinit"},"17.3":{t:"debuginit",p:`开启调试器（用于移动端调试，使用后，右下角会出现一个光标）
&lt;&lt;&lt; @/frontend-common/u ...`,l:"frontend-common-guide/utils/exteriorScript.html#debuginit",a:"debuginit"},"17.4":{t:"基础使用",p:"import { weChatJSSDKInit } from '@common-utils/exteriorScript' ...",l:"frontend-common-guide/utils/exteriorScript.html#基础使用",a:"基础使用"},"18.0":{t:"formatter",p:`跟格式化相关的函数，这个文件你可能会经常使用。
`,l:"frontend-common-guide/utils/formatter.html",a:"formatter"},"18.1":{t:"moneyformat",p:`将数字格式化为金钱格式（例如：3000 =&gt; '3,000'）
&lt;&lt;&lt; @/frontend-com ...`,l:"frontend-common-guide/utils/formatter.html#moneyformat",a:"moneyformat"},"18.2":{t:"moneyunformat",p:`将金钱格式转换为数字格式
&lt;&lt;&lt; @/frontend-common/utils/formatter.ts ...`,l:"frontend-common-guide/utils/formatter.html#moneyunformat",a:"moneyunformat"},"18.3":{t:"time",p:`利用day.js，返回一个可操作的dayjs 对象

这里时间格式选用 day.js 是因为 day.js 比 moment ...`,l:"frontend-common-guide/utils/formatter.html#time",a:"time"},"18.4":{t:"timeformat",p:`利用day.js，进行格式化
&lt;&lt;&lt; @/frontend-common/utils/formatter. ...`,l:"frontend-common-guide/utils/formatter.html#timeformat",a:"timeformat"},"18.5":{t:"removespace",p:`删除输入的字符串的空格（可选前侧、右侧、两端、全部）
&lt;&lt;&lt; @/frontend-common/util ...`,l:"frontend-common-guide/utils/formatter.html#removespace",a:"removespace"},"18.6":{t:"addsuffix",p:`给一个字符串补上后缀或者前缀
&lt;&lt;&lt; @/frontend-common/utils/formatter. ...`,l:"frontend-common-guide/utils/formatter.html#addsuffix",a:"addsuffix"},"18.7":{t:"tofixed",p:`针对数字和字符串进行小数格式化（字符串对象下的 toFixed 函数具有精度问题）
&lt;&lt;&lt; @/front ...`,l:"frontend-common-guide/utils/formatter.html#tofixed",a:"tofixed"},"18.8":{t:"isrightjstype",p:`判断当前的值类型是否正确
&lt;&lt;&lt; @/frontend-common/utils/formatter.ts ...`,l:"frontend-common-guide/utils/formatter.html#isrightjstype",a:"isrightjstype"},"18.9":{t:"getrighttypeval",p:`判断当前的类型是否正确，如果不正确，那么进行转换或者启用默认值（一般用于检测后端返回的数据类型）
&lt;&lt;&lt;  ...`,l:"frontend-common-guide/utils/formatter.html#getrighttypeval",a:"getrighttypeval"},"18.10":{t:"基础使用",p:`import { getRightTypeVal } from '@common-utils/formatter'

//  ...`,l:"frontend-common-guide/utils/formatter.html#基础使用",a:"基础使用"},"19.0":{t:"login",p:`和登录相关的函数
`,l:"frontend-common-guide/utils/login.html",a:"login"},"19.1":{t:"getlogininfo",p:`获取 cookie 中的用户信息
&lt;&lt;&lt; @/frontend-common/utils/login.ts ...`,l:"frontend-common-guide/utils/login.html#getlogininfo",a:"getlogininfo"},"19.2":{t:"islogin",p:`判断当前是否已登录（PS：APP、weChat、H5 都可以用）
&lt;&lt;&lt; @/frontend-commo ...`,l:"frontend-common-guide/utils/login.html#islogin",a:"islogin"},"19.3":{t:"handlewechatlogion",p:`进行微信登录
&lt;&lt;&lt; @/frontend-common/utils/login.ts#handleWeC ...`,l:"frontend-common-guide/utils/login.html#handlewechatlogion",a:"handlewechatlogion"},"19.4":{t:"handleapplogin",p:`进行 APP 登录
&lt;&lt;&lt; @/frontend-common/utils/login.ts#handle ...`,l:"frontend-common-guide/utils/login.html#handleapplogin",a:"handleapplogin"},"19.5":{t:"handlelloginexpired",p:`处理登录失效的情况
&lt;&lt;&lt; @/frontend-common/utils/login.ts#handle ...`,l:"frontend-common-guide/utils/login.html#handlelloginexpired",a:"handlelloginexpired"},"19.6":{t:"isnonregistereduser",p:`是否为非注册用户（未绑定手机号），仅针对微信环境
&lt;&lt;&lt; @/frontend-common/utils/ ...`,l:"frontend-common-guide/utils/login.html#isnonregistereduser",a:"isnonregistereduser"},"20.0":{t:"mock",p:`该文件下的函数是用于处理 mock 数据，这里的方案是 mock.js
`,l:"frontend-common-guide/utils/mock.html",a:"mock"},"20.1":{t:"ismock",p:"判断当前的环境是否是 mock 环境，从这里可以看出我们是从 process.env 配置里判断的，所以我们需要提前进行注入 ...",l:"frontend-common-guide/utils/mock.html#ismock",a:"ismock"},"20.2":{t:"handlemock",p:`传入函数后，对该函数进行拦截处理。
&lt;&lt;&lt; @/frontend-common/utils/mock.ts ...`,l:"frontend-common-guide/utils/mock.html#handlemock",a:"handlemock"},"20.3":{t:"基础使用",p:`import { handleMock } from '@common-utils/mock'
import { getDa ...`,l:"frontend-common-guide/utils/mock.html#基础使用",a:"基础使用"},"21.0":{t:"native",p:`不借用 JSBridge 能力但是又与 native 相关的函数
`,l:"frontend-common-guide/utils/native.html",a:"native"},"21.1":{t:"openordownapp",p:`跳转 app 链接，如果没有下载 app 那么就下载

需要注意：判断是通过时间来进行的（2s），如果用户在 2s 内没有操 ...`,l:"frontend-common-guide/utils/native.html#openordownapp",a:"openordownapp"},"22.0":{t:"progressbar",p:`progressBar 是一个顶部进度条，算是大家都喜欢应用的方案。
`,l:"frontend-common-guide/utils/progressBar.html",a:"progressbar"},"22.1":{t:"progressbarinit",p:`progressBarInit 基础配置，配置请见 progressBar
&lt;&lt;&lt; @/frontend- ...`,l:"frontend-common-guide/utils/progressBar.html#progressbarinit",a:"progressbarinit"},"22.2":{t:"startprogressbar",p:`开启 progressBar
&lt;&lt;&lt; @/frontend-common/utils/progressBa ...`,l:"frontend-common-guide/utils/progressBar.html#startprogressbar",a:"startprogressbar"},"22.3":{t:"stopprogressbar",p:`关闭 progressBar
&lt;&lt;&lt; @/frontend-common/utils/progressBa ...`,l:"frontend-common-guide/utils/progressBar.html#stopprogressbar",a:"stopprogressbar"},"23.0":{t:"request",p:`使用方法和 axios 一模一样，不过在 axios 的基础上做了一个程度的封装，新增了一些常见的功能。
`,l:"frontend-common-guide/utils/request.html",a:"request"},"23.1":{t:"setcustomconfig",p:`可以通过函数进行修改全局的配置
&lt;&lt;&lt; @/frontend-common/utils/request.t ...`,l:"frontend-common-guide/utils/request.html#setcustomconfig",a:"setcustomconfig"},"23.2":{t:"请求时新增-api",p:`请求新增选项 api（你可以直接在请求中加入这些选项）：

如果 api 选项和全局选项冲突了，那么只会启动 api 选项。 ...`,l:"frontend-common-guide/utils/request.html#请求时新增-api",a:"请求时新增-api"},"24.0":{t:"storage",p:`主要针对 localStorage 进行封装
`,l:"frontend-common-guide/utils/storage.html",a:"storage"},"24.1":{t:"get",p:"和 localStorage.getItem 用法大致相同，不过第二个参数可以进行断言得到的类型，如果是复杂数据类型，会自动 ...",l:"frontend-common-guide/utils/storage.html#get",a:"get"},"24.2":{t:"add",p:"和 localStorage.setItem 用法大致相同，不过第二个参数为一个对象了，对象中包括值和过期时间（可以为空）。 ...",l:"frontend-common-guide/utils/storage.html#add",a:"add"},"24.3":{t:"delete",p:`和 localStorage.removeItem 一致
`,l:"frontend-common-guide/utils/storage.html#delete",a:"delete"},"24.4":{t:"clear",p:`和 localStorage.clear 一致
`,l:"frontend-common-guide/utils/storage.html#clear",a:"clear"},"24.5":{t:"api-示例",p:`&lt;&lt;&lt; @/frontend-common/utils/storage.ts#LocalStorage
`,l:"frontend-common-guide/utils/storage.html#api-示例",a:"api-示例"},"24.6":{t:"基础使用",p:`import LocalStorage from '@common-utils/storage'

const localS ...`,l:"frontend-common-guide/utils/storage.html#基础使用",a:"基础使用"},"25.0":{t:"url",p:`跟 URL 处理相关的函数
`,l:"frontend-common-guide/utils/url.html",a:"url"},"25.1":{t:"geturlandparams",p:`获取传入 url（默认是 location.href） 的 baseURL 和 query 参数
&lt;&lt;&lt;  ...`,l:"frontend-common-guide/utils/url.html#geturlandparams",a:"geturlandparams"},"25.2":{t:"deletequeryparams",p:`删除某个 url 参数
&lt;&lt;&lt; @/frontend-common/utils/url.ts#delete ...`,l:"frontend-common-guide/utils/url.html#deletequeryparams",a:"deletequeryparams"},"25.3":{t:"addqueryparams",p:`添加一个 url 参数
&lt;&lt;&lt; @/frontend-common/utils/url.ts#addQue ...`,l:"frontend-common-guide/utils/url.html#addqueryparams",a:"addqueryparams"},"26.0":{t:"validate",p:`跟正则校验以及正则表达式相关的常量以及函数。
&lt;&lt;&lt; @/frontend-common/utils/va ...`,l:"frontend-common-guide/utils/validate.html",a:"validate"},"27.0":{t:"wechat",p:`针对 weChat JSSDK 所进行的封装
`,l:"frontend-common-guide/utils/weChat.html",a:"wechat"},"27.1":{t:"injectjssdk",p:`注入微信 JSSDK，并且返回一个 promise，如果加载成功将走 then。
&lt;&lt;&lt; @/fronte ...`,l:"frontend-common-guide/utils/weChat.html#injectjssdk",a:"injectjssdk"},"27.2":{t:"ishavejssdk",p:`判断当前是否注入过微信 JSSDK。
&lt;&lt;&lt; @/frontend-common/utils/weChat ...`,l:"frontend-common-guide/utils/weChat.html#ishavejssdk",a:"ishavejssdk"},"27.3":{t:"waitjssdk",p:`等待 JSSDK 下载完毕后，执行的函数（因为下载是异步的，所以需要考虑这一点）

如果执行时已下载完毕，那么直接执行；如果 ...`,l:"frontend-common-guide/utils/weChat.html#waitjssdk",a:"waitjssdk"},"27.4":{t:"initjssdk",p:`初始化微信 JSSDK（去缓存或者后端接口读取配置）。
&lt;&lt;&lt; @/frontend-common/uti ...`,l:"frontend-common-guide/utils/weChat.html#initjssdk",a:"initjssdk"},"27.5":{t:"setshare",p:`配置微信分享
&lt;&lt;&lt; @/frontend-common/utils/weChat.ts#setShare ...`,l:"frontend-common-guide/utils/weChat.html#setshare",a:"setshare"},"28.0":{t:"vue3",p:`该文件夹下包含了常用的 vue3 相关 directive、hook、component等。
`,l:"frontend-common-guide/vue3/README.html",a:"vue3"},"28.1":{t:"vue3-资料",p:`vue3 官方文档
也可以直接看我写的文章 vue3 setup
加入其中的代码请使用最新的 composition 以及  ...`,l:"frontend-common-guide/vue3/README.html#vue3-资料",a:"vue3-资料"},"29.0":{t:"iframe-src-mobile-html-button-iframe",p:"&lt;div style=&quot;height:20px;width:100%;&quot;&gt;&lt;/div& ...",l:"frontend-common-guide/vue3/components/Mobile/Button.html",a:"iframe-src-mobile-html-button-iframe"},"29.1":{t:"演示",p:"",l:"frontend-common-guide/vue3/components/Mobile/Button.html#演示",a:"演示"},"29.2":{t:"按钮类型-type",p:`type 用于区分按钮类型
 &lt;Button type=&quot;plain&quot;&gt;按钮-plain&l ...`,l:"frontend-common-guide/vue3/components/Mobile/Button.html#按钮类型-type",a:"按钮类型-type"},"29.3":{t:"文本类型-texttype",p:`仅当 type 为 text，该属性生效。该属性用于定义文本按钮的类型，参见上面文本按钮
&lt;Button type=& ...`,l:"frontend-common-guide/vue3/components/Mobile/Button.html#文本类型-texttype",a:"文本类型-texttype"},"29.4":{t:"宽度类型-widthtype",p:`widthType 用于定义当前的按钮宽度
&lt;Button width-type=&quot;normal&quot; ...`,l:"frontend-common-guide/vue3/components/Mobile/Button.html#宽度类型-widthtype",a:"宽度类型-widthtype"},"29.5":{t:"字体颜色",p:`该属性标志使用何种字体颜色
&lt;Button color-type=&quot;red&quot;&gt;red&lt; ...`,l:"frontend-common-guide/vue3/components/Mobile/Button.html#字体颜色",a:"字体颜色"},"29.6":{t:"是否禁用-disabled",p:`该属性与 HTML 属性 disabled 表现一致
&lt;Button :disabled=&quot;true&quo ...`,l:"frontend-common-guide/vue3/components/Mobile/Button.html#是否禁用-disabled",a:"是否禁用-disabled"},"29.7":{t:"滑动自适应-slide",p:`该属性一般配合 SwipeCell 组件使用，实现滑动按钮的效果。
`,l:"frontend-common-guide/vue3/components/Mobile/Button.html#滑动自适应-slide",a:"滑动自适应-slide"},"29.8":{t:"props",p:`


属性
描述
默认值
可能的值




type
按钮类型
&quot;blue&quot;
&quot;blue&qu ...`,l:"frontend-common-guide/vue3/components/Mobile/Button.html#props",a:"props"},"29.9":{t:"events",p:`


事件
描述
参数
备注



`,l:"frontend-common-guide/vue3/components/Mobile/Button.html#events",a:"events"},"30.0":{t:"iframe-src-mobile-html-cell-iframe",p:"&lt;div style=&quot;height:20px;width:100%;&quot;&gt;&lt;/div& ...",l:"frontend-common-guide/vue3/components/Mobile/Cell.html",a:"iframe-src-mobile-html-cell-iframe"},"30.1":{t:"演示",p:"",l:"frontend-common-guide/vue3/components/Mobile/Cell.html#演示",a:"演示"},"30.2":{t:"基础用法",p:`传入基础的属性 title 和 value 即可呈现基础的单元格。
&lt;Cell title=&quot;描述&quot ...`,l:"frontend-common-guide/vue3/components/Mobile/Cell.html#基础用法",a:"基础用法"},"30.3":{t:"值类型-valuetype",p:`value 对应的值有几种类型，设置不同 valueType 对应不同的样式。
&lt;Cell title=&quot;描 ...`,l:"frontend-common-guide/vue3/components/Mobile/Cell.html#值类型-valuetype",a:"值类型-valuetype"},"30.4":{t:"图标-titleicon-titleicon",p:`你可以设置 title-icon 和 value-icon 分别设置标题和值处的 icon 。
&lt;Cell title ...`,l:"frontend-common-guide/vue3/components/Mobile/Cell.html#图标-titleicon-titleicon",a:"图标-titleicon-titleicon"},"30.5":{t:"props",p:`


属性
描述
默认值
可能的值




title
标题
-
-


value
值
-
-


valueType
值 ...`,l:"frontend-common-guide/vue3/components/Mobile/Cell.html#props",a:"props"},"30.6":{t:"events",p:`


事件
描述
参数
备注



`,l:"frontend-common-guide/vue3/components/Mobile/Cell.html#events",a:"events"},"31.0":{t:"iframe-src-mobile-html-container-iframe",p:"&lt;div style=&quot;height:20px;width:100%;&quot;&gt;&lt;/div& ...",l:"frontend-common-guide/vue3/components/Mobile/Container.html",a:"iframe-src-mobile-html-container-iframe"},"31.1":{t:"演示",p:"",l:"frontend-common-guide/vue3/components/Mobile/Container.html#演示",a:"演示"},"31.2":{t:"固定高度-height",p:"设置组件高度即可固定好当前组件的高度，你可以通过传入 slot footer 去加入底部信息，从作用域插槽中获取当前展开状态 ...",l:"frontend-common-guide/vue3/components/Mobile/Container.html#固定高度-height",a:"固定高度-height"},"31.3":{t:"固定个数限制-number",p:`有时候我们并不知道限制高度多少，而只是想要限制显示多少个，这个时候就该这个属性出场啦。
&lt;Container :num ...`,l:"frontend-common-guide/vue3/components/Mobile/Container.html#固定个数限制-number",a:"固定个数限制-number"},"31.4":{t:"传入-html-进行渲染-清洗-html",p:`我们在全局顶层会进行 html 样式初始化，但是富文本有些想要保留，每次去样式穿透修改比较麻烦，这个做一个统一的处理。

如 ...`,l:"frontend-common-guide/vue3/components/Mobile/Container.html#传入-html-进行渲染-清洗-html",a:"传入-html-进行渲染-清洗-html"},"31.5":{t:"props",p:`


属性
描述
默认值
可能的值




height
限制的高度
-
-


number
限制的个数
-
-


ht ...`,l:"frontend-common-guide/vue3/components/Mobile/Container.html#props",a:"props"},"31.6":{t:"events",p:`


事件
描述
参数
备注




changeStatus
修改展开状态
-
-


refresh
刷新状态，针对 D ...`,l:"frontend-common-guide/vue3/components/Mobile/Container.html#events",a:"events"},"31.7":{t:"slots",p:`


名称
描述
参数
备注




footer
底部区域
expand,changeStatus
-



`,l:"frontend-common-guide/vue3/components/Mobile/Container.html#slots",a:"slots"},"32.0":{t:"iframe-src-mobile-html-dialog-iframe",p:"&lt;div style=&quot;height:20px;width:100%;&quot;&gt;&lt;/div& ...",l:"frontend-common-guide/vue3/components/Mobile/Dialog.html",a:"iframe-src-mobile-html-dialog-iframe"},"32.1":{t:"演示",p:"",l:"frontend-common-guide/vue3/components/Mobile/Dialog.html#演示",a:"演示"},"32.2":{t:"函数调用",p:`函数进行了一次写法封装：
import { DialogFn } from '@common/vue3/components ...`,l:"frontend-common-guide/vue3/components/Mobile/Dialog.html#函数调用",a:"函数调用"},"32.3":{t:"组件调用-props-events-slots",p:`请参见 vant 的 Dialog 组件
`,l:"frontend-common-guide/vue3/components/Mobile/Dialog.html#组件调用-props-events-slots",a:"组件调用-props-events-slots"},"33.0":{t:"iframe-src-mobile-html-input-iframe",p:"&lt;div style=&quot;height:20px;width:100%;&quot;&gt;&lt;/div& ...",l:"frontend-common-guide/vue3/components/Mobile/Input.html",a:"iframe-src-mobile-html-input-iframe"},"33.1":{t:"演示",p:"",l:"frontend-common-guide/vue3/components/Mobile/Input.html#演示",a:"演示"},"33.2":{t:"基础用法",p:`&lt;Input v-model=&quot;inputVal&quot;/&gt;

`,l:"frontend-common-guide/vue3/components/Mobile/Input.html#基础用法",a:"基础用法"},"33.3":{t:"带有-label",p:"&lt;Input v-model=&quot;inputVal&quot; label=&quot;姓名&quot; /& ...",l:"frontend-common-guide/vue3/components/Mobile/Input.html#带有-label",a:"带有-label"},"33.4":{t:"带有清除功能",p:"&lt;Input v-model=&quot;inputVal&quot; label=&quot;姓名&quot; cl ...",l:"frontend-common-guide/vue3/components/Mobile/Input.html#带有清除功能",a:"带有清除功能"},"33.5":{t:"带有处理按钮",p:"&lt;Input v-model=&quot;inputVal&quot; label=&quot;手机号&quot; h ...",l:"frontend-common-guide/vue3/components/Mobile/Input.html#带有处理按钮",a:"带有处理按钮"},"33.6":{t:"props",p:`


属性
描述
默认值
可能的值




label
输入框左边的标题
-
-


clearable
是有带有清除按钮
 ...`,l:"frontend-common-guide/vue3/components/Mobile/Input.html#props",a:"props"},"33.7":{t:"events",p:`


事件
描述
参数
备注




handleClick
右侧处理按钮点击后
-
-



`,l:"frontend-common-guide/vue3/components/Mobile/Input.html#events",a:"events"},"34.0":{t:"iframe-src-mobile-html-progressbar-iframe",p:"&lt;div style=&quot;height:20px;width:100%;&quot;&gt;&lt;/div& ...",l:"frontend-common-guide/vue3/components/Mobile/ProgressBar.html",a:"iframe-src-mobile-html-progressbar-iframe"},"34.1":{t:"演示",p:"import { progressBarInit, startProgressBar, stopProgressBar }  ...",l:"frontend-common-guide/vue3/components/Mobile/ProgressBar.html#演示",a:"演示"},"35.0":{t:"组件说明",p:"",l:"frontend-common-guide/vue3/components/Mobile/README.html",a:"组件说明"},"35.1":{t:"需要提前进行引入的文件",p:`在使用前，你需要提前从公共库进行引入这么几个文件：

_variable.scss：变量名（从 webpack、vite 配 ...`,l:"frontend-common-guide/vue3/components/Mobile/README.html#需要提前进行引入的文件",a:"需要提前进行引入的文件"},"35.2":{t:"组件公有属性统一说明",p:`某些组件有统一的属性，在文档中不会单独罗列出来进行说明，只在属性中标明是否具有。
`,l:"frontend-common-guide/vue3/components/Mobile/README.html#组件公有属性统一说明",a:"组件公有属性统一说明"},"35.3":{t:"design",p:`design 标明了当前的组件是按照多少的设计图宽度进行处理的，默认是375，如果你是其他设计宽度则需要传入修复。

注：这 ...`,l:"frontend-common-guide/vue3/components/Mobile/README.html#design",a:"design"},"35.4":{t:"style-style",p:"虽然组件都是按照 UI 规范进行开发的，但是免不了设计图会出现一些特殊情况，所以针对一些场景会暴露一些属性用于style样式 ...",l:"frontend-common-guide/vue3/components/Mobile/README.html#style-style",a:"style-style"},"36.0":{t:"iframe-src-mobile-html-swipecell-iframe",p:"&lt;div style=&quot;height:20px;width:100%;&quot;&gt;&lt;/div& ...",l:"frontend-common-guide/vue3/components/Mobile/SwipeCell.html",a:"iframe-src-mobile-html-swipecell-iframe"},"36.1":{t:"演示",p:"",l:"frontend-common-guide/vue3/components/Mobile/SwipeCell.html#演示",a:"演示"},"36.2":{t:"基础用法",p:`&lt;SwipeCell&gt;
    &lt;template #left&gt;
        &lt;Butto ...`,l:"frontend-common-guide/vue3/components/Mobile/SwipeCell.html#基础用法",a:"基础用法"},"36.3":{t:"属性与事件",p:`属性与事件与 vant 的 SwipeCell 组件 保持一致。
`,l:"frontend-common-guide/vue3/components/Mobile/SwipeCell.html#属性与事件",a:"属性与事件"},"37.0":{t:"iframe-src-mobile-html-textarea-iframe",p:"&lt;div style=&quot;height:20px;width:100%;&quot;&gt;&lt;/div& ...",l:"frontend-common-guide/vue3/components/Mobile/Textarea.html",a:"iframe-src-mobile-html-textarea-iframe"},"37.1":{t:"演示",p:"",l:"frontend-common-guide/vue3/components/Mobile/Textarea.html#演示",a:"演示"},"37.2":{t:"基础用法",p:"&lt;Textarea v-model=&quot;inputVal&quot; placeholder=&quot;有什 ...",l:"frontend-common-guide/vue3/components/Mobile/Textarea.html#基础用法",a:"基础用法"},"37.3":{t:"props",p:"",l:"frontend-common-guide/vue3/components/Mobile/Textarea.html#props",a:"props"},"37.4":{t:"events",p:"",l:"frontend-common-guide/vue3/components/Mobile/Textarea.html#events",a:"events"},"38.0":{t:"iframe-src-mobile-html-toast-iframe",p:"&lt;div style=&quot;height:20px;width:100%;&quot;&gt;&lt;/div& ...",l:"frontend-common-guide/vue3/components/Mobile/Toast.html",a:"iframe-src-mobile-html-toast-iframe"},"38.1":{t:"演示",p:"",l:"frontend-common-guide/vue3/components/Mobile/Toast.html#演示",a:"演示"},"38.2":{t:"函数调用",p:`函数进行了一次写法封装：
import { ToastFn } from '@common/vue3/components/ ...`,l:"frontend-common-guide/vue3/components/Mobile/Toast.html#函数调用",a:"函数调用"},"38.3":{t:"props-events-slots",p:`请参见 vant 的 Toast 组件
`,l:"frontend-common-guide/vue3/components/Mobile/Toast.html#props-events-slots",a:"props-events-slots"},"39.0":{t:"login-组件",p:`该组件是针对 H5 场景下所做的通用登录组件。
::: warning 注意
在后续，应该将此组件作为项目进行单独部署，而非 ...`,l:"frontend-common-guide/vue3/components/MobileBusiness/Login.html",a:"login-组件"},"39.1":{t:"对外暴露的-url-参数",p:`


参数名
描述
可能的值
备注




type
登录的方式
'password' | 'verificationCod ...`,l:"frontend-common-guide/vue3/components/MobileBusiness/Login.html#对外暴露的-url-参数",a:"对外暴露的-url-参数"},"39.2":{t:"作为组件所需要的路由",p:`{
    path: &quot;/login&quot;,
    name: &quot;Login&quot;,
  ...`,l:"frontend-common-guide/vue3/components/MobileBusiness/Login.html#作为组件所需要的路由",a:"作为组件所需要的路由"},"40.0":{t:"slideverify-组件",p:`该组件是针对滑块验证所做的通用登录组件。

UI地址：verification


基础代码来源于：vue3-slide-v ...`,l:"frontend-common-guide/vue3/components/MobileBusiness/SlideVerify.html",a:"slideverify-组件"},"40.1":{t:"展示",p:"&lt;Button @click=&quot;slideVerify.openDialog()&quot;&gt;图片验证 ...",l:"frontend-common-guide/vue3/components/MobileBusiness/SlideVerify.html#展示",a:"展示"},"40.2":{t:"props-参数",p:`::: warning 注意
如果只用作服务端滑块验证，你其实不需要传入 props。如果你需要传入 props 参数，请理 ...`,l:"frontend-common-guide/vue3/components/MobileBusiness/SlideVerify.html#props-参数",a:"props-参数"},"40.3":{t:"events",p:`


事件
描述
参数
备注




success
验证成功
本地图片模式：{timestamp:number}；远程模式 ...`,l:"frontend-common-guide/vue3/components/MobileBusiness/SlideVerify.html#events",a:"events"},"41.0":{t:"cropper-组件",p:"Cropper 组件为图片裁剪组件（附带压缩功能），Cropper 相关的组件在 github 上有很多，这里选用了 vue ...",l:"frontend-common-guide/vue3/components/Web/Cropper.html",a:"cropper-组件"},"41.1":{t:"基础展示",p:`&lt;div class=&quot;copper-container&quot;&gt;
&lt;ClientOnly& ...`,l:"frontend-common-guide/vue3/components/Web/Cropper.html#基础展示",a:"基础展示"},"42.0":{t:"dropzone-组件",p:"Dropzone 组件为上传图片组件，由于目前 vue3 下没有对应的稳定的库，这里直接通过 dropzone 库实现一个  ...",l:"frontend-common-guide/vue3/components/Web/Dropzone.html",a:"dropzone-组件"},"42.1":{t:"基础展示",p:`&lt;ClientOnly&gt;
&lt;Dropzone :id=&quot;getDropzoneId()&quot ...`,l:"frontend-common-guide/vue3/components/Web/Dropzone.html#基础展示",a:"基础展示"},"42.2":{t:"props",p:`


属性
描述
默认值
可能的值
备注




id
组件唯一标识
-
string
必传


options
配置信息
 ...`,l:"frontend-common-guide/vue3/components/Web/Dropzone.html#props",a:"props"},"42.3":{t:"events",p:`


事件名称
描述




vdropzone-extra-button
额外的按钮被点击触发


vdropzone-f ...`,l:"frontend-common-guide/vue3/components/Web/Dropzone.html#events",a:"events"},"42.4":{t:"methods",p:`


方法名
描述
参数
备注




removeAllFiles
删除所有文件（删除正在上传的文件需要传入参数）
boo ...`,l:"frontend-common-guide/vue3/components/Web/Dropzone.html#methods",a:"methods"},"43.0":{t:"editor-组件",p:"Editor 组件为后台管理系统中经常会使用到的富文本组件。详细的细节内容请见注释以及文档，配置项过多完全理解确实需要一定时 ...",l:"frontend-common-guide/vue3/components/Web/Editor.html",a:"editor-组件"},"43.1":{t:"基础构思",p:"",l:"frontend-common-guide/vue3/components/Web/Editor.html#基础构思",a:"基础构思"},"43.2":{t:"如何响应式",p:`编辑器会向富文本中输出一段不可见的编辑器信息富文本，用于下游去得到这段富文本设置时编辑器相关的信息。

一切富文本操作将尽可 ...`,l:"frontend-common-guide/vue3/components/Web/Editor.html#如何响应式",a:"如何响应式"},"43.3":{t:"下游如何修改样式",p:`下游可以通过辅助函数去移除所有的 style 样式来得到干净的样式。

一切富文本操作将尽可能提供暴露函数，方便下游使用。
 ...`,l:"frontend-common-guide/vue3/components/Web/Editor.html#下游如何修改样式",a:"下游如何修改样式"},"43.4":{t:"上传图片以及视频",p:"由于当前使用的是 tinymce6，目前国内插件还不够丰富，所以放弃使用 tinymce6 插件。采用外部上传的形式，并且并 ...",l:"frontend-common-guide/vue3/components/Web/Editor.html#上传图片以及视频",a:"上传图片以及视频"},"43.5":{t:"全屏模式",p:`使用方希望在全屏时，设置版本。故监听了全屏模式，在开启或关闭全屏模式时，会对编辑器操作空间进行样式修改。
`,l:"frontend-common-guide/vue3/components/Web/Editor.html#全屏模式",a:"全屏模式"},"43.6":{t:"层级排列规则",p:`
下拉框设置
文本相关设置
插入内容设置
非修改设置

`,l:"frontend-common-guide/vue3/components/Web/Editor.html#层级排列规则",a:"层级排列规则"},"43.7":{t:"展示",p:"",l:"frontend-common-guide/vue3/components/Web/Editor.html#展示",a:"展示"},"43.8":{t:"基础示例",p:`一个全功能的基础编辑器

基础样式尽可能去对齐微信编辑器的样式。

&lt;ClientOnly&gt;
&lt;Dialo ...`,l:"frontend-common-guide/vue3/components/Web/Editor.html#基础示例",a:"基础示例"},"43.9":{t:"输出网页",p:`&lt;br/&gt;
&lt;Iframe type=&quot;mobile&quot; :srcdoc=&quot;e ...`,l:"frontend-common-guide/vue3/components/Web/Editor.html#输出网页",a:"输出网页"},"43.10":{t:"输出网页-动态响应式",p:`&lt;br/&gt;
&lt;Iframe type=&quot;mobile&quot; :srcdoc=&quot;e ...`,l:"frontend-common-guide/vue3/components/Web/Editor.html#输出网页-动态响应式",a:"输出网页-动态响应式"},"43.11":{t:"修改默认样式",p:"有时候我们需要去修改默认的编辑器设置，但是修改会和我们想的不太一样。编辑器作者推荐使用 content_style 或者 c ...",l:"frontend-common-guide/vue3/components/Web/Editor.html#修改默认样式",a:"修改默认样式"},"43.12":{t:"props",p:`
这里只会标注我个人认为有用的 props，详细 props 请见 文档。


默认值请见注释（PS：如果你真的想了解设置相 ...`,l:"frontend-common-guide/vue3/components/Web/Editor.html#props",a:"props"},"43.13":{t:"event",p:`相关事件请见：Event
但是你需要注意的是事件分为核心事件和插件事件
`,l:"frontend-common-guide/vue3/components/Web/Editor.html#event",a:"event"},"43.14":{t:"辅助函数",p:`
富文本中包含大量的字符串操作，这里提供一些常见的富文本操作函数方便使用者的使用。


路径：frontend-common ...`,l:"frontend-common-guide/vue3/components/Web/Editor.html#辅助函数",a:"辅助函数"},"43.15":{t:"cleanstyle",p:"&lt;&lt;&lt; @/frontend-common/vue3/components/Editor/utils.ts ...",l:"frontend-common-guide/vue3/components/Web/Editor.html#cleanstyle",a:"cleanstyle"},"43.16":{t:"addeditorinfo",p:"&lt;&lt;&lt; @/frontend-common/vue3/components/Editor/utils.ts ...",l:"frontend-common-guide/vue3/components/Web/Editor.html#addeditorinfo",a:"addeditorinfo"},"43.17":{t:"geteditorinfo",p:"&lt;&lt;&lt; @/frontend-common/vue3/components/Editor/utils.ts ...",l:"frontend-common-guide/vue3/components/Web/Editor.html#geteditorinfo",a:"geteditorinfo"},"43.18":{t:"adddefaultstyle",p:"&lt;&lt;&lt; @/frontend-common/vue3/components/Editor/utils.ts ...",l:"frontend-common-guide/vue3/components/Web/Editor.html#adddefaultstyle",a:"adddefaultstyle"},"43.19":{t:"getstyle",p:"&lt;&lt;&lt; @/frontend-common/vue3/components/Editor/utils.ts ...",l:"frontend-common-guide/vue3/components/Web/Editor.html#getstyle",a:"getstyle"},"43.20":{t:"convertunits",p:"&lt;&lt;&lt; @/frontend-common/vue3/components/Editor/utils.ts ...",l:"frontend-common-guide/vue3/components/Web/Editor.html#convertunits",a:"convertunits"},"44.0":{t:"useregion",p:`获取地区数据，并且数据之间有联动。
`,l:"frontend-common-guide/vue3/hooks/region.html",a:"useregion"},"44.1":{t:"基本用法",p:"",l:"frontend-common-guide/vue3/hooks/region.html#基本用法",a:"基本用法"},"44.2":{t:"获取地区数据",p:`import { useRegion } from '@common/vue3/hooks/region'

const { ...`,l:"frontend-common-guide/vue3/hooks/region.html#获取地区数据",a:"获取地区数据"},"44.3":{t:"获取联动数据",p:`传入固定的 ref 参数，即可获取到具体的数据
import { ref } from 'vue'
import { use ...`,l:"frontend-common-guide/vue3/hooks/region.html#获取联动数据",a:"获取联动数据"},"44.4":{t:"回调函数",p:`当某些数据发生变动时你可能想要执行某些回调函数
import { ref } from 'vue'
import { use ...`,l:"frontend-common-guide/vue3/hooks/region.html#回调函数",a:"回调函数"},"44.5":{t:"额外选项",p:`这里包含了其他的特殊选项：

expires：缓存过期时间（默认不过期）
request：修改请求函数

import {  ...`,l:"frontend-common-guide/vue3/hooks/region.html#额外选项",a:"额外选项"},"44.6":{t:"参数",p:`重载一：



参数
描述
类型
默认值
备注




options
特殊选项
Options
-
见下表



重载二： ...`,l:"frontend-common-guide/vue3/hooks/region.html#参数",a:"参数"},"44.7":{t:"code",p:`


参数
描述
类型
默认值
备注




provinceCode
省对应的 code
Ref&lt;string&gt ...`,l:"frontend-common-guide/vue3/hooks/region.html#code",a:"code"},"44.8":{t:"callback",p:`


参数
描述
类型
默认值
备注




provinceCodeChange
省数据变动时执行
(val: strin ...`,l:"frontend-common-guide/vue3/hooks/region.html#callback",a:"callback"},"44.9":{t:"options",p:`


参数
描述
类型
默认值
备注




expires
缓存需要的时间
number
-
毫秒级别


request ...`,l:"frontend-common-guide/vue3/hooks/region.html#options",a:"options"},"45.0":{t:"流程图-flow-chart",p:`本系列旨在用流程图阐明项目中常见且稍微有些复杂的场景
`,l:"frontend-flow-chart-guide/README.html",a:"流程图-flow-chart"},"45.1":{t:"为什么会有流程图",p:`在一些场景中，我们十分难以通过言语去阐明相关流程，用流程图的形式去说明是一个很好的方法。
`,l:"frontend-flow-chart-guide/README.html#为什么会有流程图",a:"为什么会有流程图"},"45.2":{t:"如何实现",p:"本项目通过 vitepress-plugin-mermaid 插件实现。其本身原理使用过 mermaid 实现，关于 mer ...",l:"frontend-flow-chart-guide/README.html#如何实现",a:"如何实现"},"45.3":{t:"如何书写",p:`关于流程图的书写格式你可以参见 mermaid。你也可以参见本目录下的 md 文件，去参见基本写法。
一般来讲我们只会书写流 ...`,l:"frontend-flow-chart-guide/README.html#如何书写",a:"如何书写"},"45.4":{t:"举例",p:`flowchart LR
  Start --&gt; Stop

flowchart LR
  Start --&gt;  ...`,l:"frontend-flow-chart-guide/README.html#举例",a:"举例"},"46.0":{t:"jsbridge",p:"JSBridge 是一种 JS 实现的 Bridge，连接着桥两端的 Native 和 H5。它在 APP 内方便地让 Na ...",l:"frontend-js-bridge-guide/README.html",a:"jsbridge"},"46.1":{t:"原理",p:"目前采用通信的方式是 拦截 URL Scheme。H5 方进行创建一个隐藏的 iframe，该 iframe 设置上协商好的 ...",l:"frontend-js-bridge-guide/README.html#原理",a:"原理"},"46.2":{t:"初始化",p:"创建一个 src 为 https://__bridge_loaded__ 的 iframe，用于告诉 App 需要进行初始化 ...",l:"frontend-js-bridge-guide/README.html#初始化",a:"初始化"},"46.3":{t:"js-调用-native",p:`
H5 方调用 callHandler 方法，执行 _doSend 方法。
_doSend 方法会创建一个 src 为 __ ...`,l:"frontend-js-bridge-guide/README.html#js-调用-native",a:"js-调用-native"},"46.4":{t:"native-调用-js",p:`
Native 调用 JS 比较简单，只要 H5 将 JS 方法暴露在 Window 上给 Native 调用即可。


A ...`,l:"frontend-js-bridge-guide/README.html#native-调用-js",a:"native-调用-js"},"46.5":{t:"实际操作",p:"",l:"frontend-js-bridge-guide/README.html#实际操作",a:"实际操作"},"46.6":{t:"bridge",p:`
H5 方当调用后 initBridge 方法后，会在 window 全局对象对象上挂载 WebViewJavascript ...`,l:"frontend-js-bridge-guide/README.html#bridge",a:"bridge"},"46.7":{t:"autobridge",p:`autoBridge 和 bridge 使用方法一模一样，不过利用了 Proxy 进行了一次拦截，完成以下操作：

会自动进 ...`,l:"frontend-js-bridge-guide/README.html#autobridge",a:"autobridge"},"47.0":{t:"jsbridge",p:`
JSBridge 其实也属于 utils 里的内容，不过由于其本身特殊性所以单独提出来。

相关原理可以去查看 JSBri ...`,l:"frontend-js-bridge-guide/index.html",a:"jsbridge"},"47.1":{t:"getappuserinfo",p:`用于获取当前用户的信息，如果没有登录，会返回 &quot;&quot;。
`,l:"frontend-js-bridge-guide/index.html#getappuserinfo",a:"getappuserinfo"},"47.2":{t:"参数",p:`-
`,l:"frontend-js-bridge-guide/index.html#参数",a:"参数"},"47.3":{t:"结果",p:"&lt;&lt;&lt; @/frontend-common/utils/types/typings/JSBridge.ts ...",l:"frontend-js-bridge-guide/index.html#结果",a:"结果"},"47.4":{t:"doappuserloginaction-badge-type-warning-text-兼容性",p:`::: warning 兼容性
仅 iOS 支持全部功能，安卓下跳出页面将不再会有回调能力（仅能判断是否已登录），安卓下需联 ...`,l:"frontend-js-bridge-guide/index.html#doappuserloginaction-badge-type-warning-text-兼容性",a:"doappuserloginaction-badge-type-warning-text-兼容性"},"47.5":{t:"参数",p:`-
`,l:"frontend-js-bridge-guide/index.html#参数",a:"参数"},"47.6":{t:"结果",p:"&lt;&lt;&lt; @/frontend-common/utils/types/typings/JSBridge.ts ...",l:"frontend-js-bridge-guide/index.html#结果",a:"结果"},"47.7":{t:"handleappuserloginaction-badge-type-tip-text-注册事件-badge-type-warning-text-兼容性",p:`::: warning 兼容性
仅 android 支持，iOS 下需联合 doAppUserLoginAction 使用。 ...`,l:"frontend-js-bridge-guide/index.html#handleappuserloginaction-badge-type-tip-text-注册事件-badge-type-warning-text-兼容性",a:"handleappuserloginaction-badge-type-tip-text-注册事件-badge-type-warning-text-兼容性"},"47.8":{t:"参数",p:"&lt;&lt;&lt; @/frontend-common/utils/types/typings/JSBridge.ts ...",l:"frontend-js-bridge-guide/index.html#参数",a:"参数"},"47.9":{t:"结果",p:`-
`,l:"frontend-js-bridge-guide/index.html#结果",a:"结果"},"47.10":{t:"getappbaseinfo",p:`获取设备信息
`,l:"frontend-js-bridge-guide/index.html#getappbaseinfo",a:"getappbaseinfo"},"47.11":{t:"参数",p:`-
`,l:"frontend-js-bridge-guide/index.html#参数",a:"参数"},"47.12":{t:"结果",p:"&lt;&lt;&lt; @/frontend-common/utils/types/typings/JSBridge.ts ...",l:"frontend-js-bridge-guide/index.html#结果",a:"结果"},"47.13":{t:"setshare-badge-type-warning-text-废弃",p:`告诉 App 方当前页面可以进行分享，同时设置当前页面的分享设置
::: warning 不推荐使用
由于之前未考虑充分，将 ...`,l:"frontend-js-bridge-guide/index.html#setshare-badge-type-warning-text-废弃",a:"setshare-badge-type-warning-text-废弃"},"47.14":{t:"参数",p:"&lt;&lt;&lt; @/frontend-common/utils/types/typings/JSBridge.ts ...",l:"frontend-js-bridge-guide/index.html#参数",a:"参数"},"47.15":{t:"结果",p:"&lt;&lt;&lt; @/frontend-common/utils/types/typings/JSBridge.ts ...",l:"frontend-js-bridge-guide/index.html#结果",a:"结果"},"47.16":{t:"cancelshare",p:`隐藏 App 下右上角的分享按钮
`,l:"frontend-js-bridge-guide/index.html#cancelshare",a:"cancelshare"},"47.17":{t:"参数",p:`-
`,l:"frontend-js-bridge-guide/index.html#参数",a:"参数"},"47.18":{t:"结果",p:`-
`,l:"frontend-js-bridge-guide/index.html#结果",a:"结果"},"47.19":{t:"share",p:`唤起当前页面 App 方的分享
`,l:"frontend-js-bridge-guide/index.html#share",a:"share"},"47.20":{t:"参数",p:`
注：参数可能为空，此种场景为默认分享

&lt;&lt;&lt; @/frontend-common/utils/type ...`,l:"frontend-js-bridge-guide/index.html#参数",a:"参数"},"47.21":{t:"结果",p:"&lt;&lt;&lt; @/frontend-common/utils/types/typings/JSBridge.ts ...",l:"frontend-js-bridge-guide/index.html#结果",a:"结果"},"47.22":{t:"notifyloginexpiration",p:`通知 App 方当前登录已过期

为何会有这个 Bridge，因为当前没有展期的概念，所以 App 方无法通知到 H5 当前 ...`,l:"frontend-js-bridge-guide/index.html#notifyloginexpiration",a:"notifyloginexpiration"},"47.23":{t:"参数",p:`-
`,l:"frontend-js-bridge-guide/index.html#参数",a:"参数"},"47.24":{t:"结果",p:`仅有回调，无结果
`,l:"frontend-js-bridge-guide/index.html#结果",a:"结果"},"47.25":{t:"close",p:`用于通知 APP 关闭当前的 webview 页面。
`,l:"frontend-js-bridge-guide/index.html#close",a:"close"},"47.26":{t:"参数",p:`-
`,l:"frontend-js-bridge-guide/index.html#参数",a:"参数"},"47.27":{t:"结果",p:`-
`,l:"frontend-js-bridge-guide/index.html#结果",a:"结果"},"47.28":{t:"pageshow-badge-type-tip-text-注册事件",p:`注册事件，用于 APP 原生页面 返回 webview 通知到 H5。

APP 原生页面返回 webview 并不会触发  ...`,l:"frontend-js-bridge-guide/index.html#pageshow-badge-type-tip-text-注册事件",a:"pageshow-badge-type-tip-text-注册事件"},"47.29":{t:"参数",p:"&lt;&lt;&lt; @/frontend-common/utils/types/typings/JSBridge.ts ...",l:"frontend-js-bridge-guide/index.html#参数",a:"参数"},"47.30":{t:"结果",p:`目前只是预留，暂无具体定义。
`,l:"frontend-js-bridge-guide/index.html#结果",a:"结果"},"48.0":{t:"基础指引",p:`
本文档的内容都是与配置相关。

`,l:"frontend-lead-guide/base.html",a:"基础指引"},"48.1":{t:"node-版本的选择",p:`笔者当前的 node 版本为：v16.16.0（截止到 2022/08 这是一个最新的长期维护版本）。

如果你的控制台显示 ...`,l:"frontend-lead-guide/base.html#node-版本的选择",a:"node-版本的选择"},"48.2":{t:"选取正确的包管理器",p:"一般线上 jenkins 使用的是 npm，但是项目中不难免的会使用 npm、yarn、pnpm，所以我们为了防止 lock ...",l:"frontend-lead-guide/base.html#选取正确的包管理器",a:"选取正确的包管理器"},"48.3":{t:"压缩方案的选择",p:`关于压缩这一点，其实很重要，它关乎了页面的速度以及打包的大小。一般来说有这么几种方案：
`,l:"frontend-lead-guide/base.html#压缩方案的选择",a:"压缩方案的选择"},"48.4":{t:"通过压缩网站进行压缩",p:`压缩网站有大名鼎鼎的tinify，但是网站在线压缩的时候，图片多了会时常不稳定，而且图片移动来移动去也挺麻烦。
`,l:"frontend-lead-guide/base.html#通过压缩网站进行压缩",a:"通过压缩网站进行压缩"},"48.5":{t:"通过-webpack-打包处理",p:"通过某些loader 或者 plugins 进行处理。trust me，它们是有一些很好用，但是它们的依赖都大部分从gith ...",l:"frontend-lead-guide/base.html#通过-webpack-打包处理",a:"通过-webpack-打包处理"},"48.6":{t:"tinify-api-压缩",p:`
去Tiny developers申请开发者 apiKey
vscode 下载 TinyPNG 插件（当前其他编辑器也有这个 ...`,l:"frontend-lead-guide/base.html#tinify-api-压缩",a:"tinify-api-压缩"},"49.0":{t:"前端外部指引文档",p:"",l:"frontend-lead-guide/external.html",a:"前端外部指引文档"},"49.1":{t:"工具类网站",p:`


网站名称
功能
备注




json2ts
在线TS类型生成器
-


anytype
TS类型生成器
vscode ...`,l:"frontend-lead-guide/external.html#工具类网站",a:"工具类网站"},"49.2":{t:"技术生态文档",p:":white_check_mark: 为推荐查阅；:negative_squared_cross_mark:为不推荐查阅。值 ...",l:"frontend-lead-guide/external.html#技术生态文档",a:"技术生态文档"},"50.0":{t:"faq",p:"",l:"frontend-lead-guide/faq.html",a:"faq"},"50.1":{t:"开发为何会出现无限刷新",p:"由于开发中使用了反向代理，会造成 socket 访问失败（加了端口没走 host 文件），这种情况偶尔会造成 vite 无限 ...",l:"frontend-lead-guide/faq.html#开发为何会出现无限刷新",a:"开发为何会出现无限刷新"},"50.2":{t:"为何本地代码和线上代码不一致",p:"排查一下是否是 jenkins 依赖的问题，jenkins 走的 package.lock.json。如果你使用了其他的包管 ...",l:"frontend-lead-guide/faq.html#为何本地代码和线上代码不一致",a:"为何本地代码和线上代码不一致"},"50.3":{t:"微信分享失败",p:"微信配置成功但是分享一直都是链接的形式而不是自定义的。大概率你是从一个链接进入了页面而不是通过公众号，微信在后面对这方面进行 ...",l:"frontend-lead-guide/faq.html#微信分享失败",a:"微信分享失败"},"50.4":{t:"微信配置失败",p:"因为 appid 跟公众号挂钩，所以我们切环境（不同环境公众号不一样），本地保存的 appid 会是错误的，需要清理下，微信 ...",l:"frontend-lead-guide/faq.html#微信配置失败",a:"微信配置失败"},"50.5":{t:"微信开发者工具执行两次",p:"在微信开发者工具中点击刷新，有几率会发生 beforeEach 执行两次的情况（原因未知，仅在此处有问题，其他不受影响，可忽 ...",l:"frontend-lead-guide/faq.html#微信开发者工具执行两次",a:"微信开发者工具执行两次"},"50.6":{t:"vant-list-组件初次进入执行两次",p:`
未合理的设置 finished 属性
页面滑动到一定程度，跳转到一个具有 list 组件的页面，可能会发生多次请求见：详情 ...`,l:"frontend-lead-guide/faq.html#vant-list-组件初次进入执行两次",a:"vant-list-组件初次进入执行两次"},"50.7":{t:"jenkins-拉取-submodule-提示密码错误",p:"如果 jenkins 打包提示 remote: HTTP Basic: Access denied. The provide ...",l:"frontend-lead-guide/faq.html#jenkins-拉取-submodule-提示密码错误",a:"jenkins-拉取-submodule-提示密码错误"},"50.8":{t:"老项目引入公共库-写法报错",p:"如果在老项目中引入公共库（里面包含 package.json 被识别成另外的项目了），可能会报类型错误，需将 .babell ...",l:"frontend-lead-guide/faq.html#老项目引入公共库-写法报错",a:"老项目引入公共库-写法报错"},"51.0":{t:"上线文档",p:`
利用 key 去寻找上线信息，页脚的更新日期并不具备参考意义。

&lt;ReleaseDisplay :useKey=& ...`,l:"frontend-release-guide/detail.html",a:"上线文档"},"52.0":{t:"前端上线文档",p:`&lt;div class=&quot;avoid-container&quot;&gt;
&lt;Form :inline ...`,l:"frontend-release-guide/index.html",a:"前端上线文档"},"53.0":{t:"介绍物料",p:`
在这里你应该写入你的物料明细、方便运维及时查看

&lt;ReleaseDisplay :useKey=&quot;tru ...`,l:"frontend-release-guide/materiels/test.html",a:"介绍物料"},"55.0":{t:"vpteampage",p:`&lt;VPTeamPageTitle&gt;
&lt;template #title&gt;
团队成员
&lt;/temp ...`,l:"member-guide.html",a:"vpteampage"},"56.0":{t:"mobile-v-show-mobileshow-component-currentcomponent-mobile",p:"",l:"mobile.html",a:"mobile-v-show-mobileshow-component-currentcomponent-mobile"},"57.0":{t:"说明",p:`::: warning 警告
当前 VitePress 还属于 alpha 阶段，不建议将其放入正式的项目中。如果你有相关需 ...`,l:"start.html",a:"说明"},"57.1":{t:"why",p:"为什么要搭建一个前端文档？目前前端文档没有进行整合，这里主要对文档（内部以及外部）进行一个整合，并且提供一个比较好的可视化查 ...",l:"start.html#why",a:"why"},"57.2":{t:"how",p:"由于目前文档库都由一人来维护，所以不适合进行单独的文档维护，但是不单独维护文档又显得文档简陋，目前采用以下方案：固定的文案写 ...",l:"start.html#how",a:"how"},"57.3":{t:"release",p:"目前的部署流程，打算通过 git 固定的分支(master)的 hook 去触发 Jenkins 发布（当前 push 之前 ...",l:"start.html#release",a:"release"},"57.4":{t:"design",p:"本项目通过 VitePress 进行构建生成。为何采用 VitePress，而非其他构建工具呢？因为 VitePress 原 ...",l:"start.html#design",a:"design"},"58.0":{t:"todo",p:`该文件旨在说明目前进行着手的事情以及后续需要完成的内容

:white_check_mark: 为已完成
:x: 为调研失败 ...`,l:"todo.html",a:"todo"},"58.1":{t:"关于文档库",p:"",l:"todo.html#关于文档库",a:"关于文档库"},"58.2":{t:"文档库的基础搭建和发布-white-check-mark",p:`通过 vitepress 进行快速搭建文档，而通过 gitlab 的 webhook 进行触发 jenkins 部署。
`,l:"todo.html#文档库的基础搭建和发布-white-check-mark",a:"文档库的基础搭建和发布-white-check-mark"},"58.3":{t:"版本升级-raised-hands",p:"由于文档库基于 vitepress 进行搭建的，vitepress 目前还处于 alpha 阶段，本人将进行持续关注版本的更 ...",l:"todo.html#版本升级-raised-hands",a:"版本升级-raised-hands"},"58.4":{t:"search-white-check-mark",p:`Search 是指文档库能够通过搜索快速进行查找到想要的文档，详情见 search。
::: tip 使用第三方插件
由于官 ...`,l:"todo.html#search-white-check-mark",a:"search-white-check-mark"},"58.5":{t:"流程图-white-check-mark",p:`详情见 流程图。
`,l:"todo.html#流程图-white-check-mark",a:"流程图-white-check-mark"},"58.6":{t:"树组件-x",p:`树组件主要是针对 man 端 权限进行一个详细的说明（结合上线文档），需有如下的功能：

图标以及相关信息区分菜单以及权限
 ...`,l:"todo.html#树组件-x",a:"树组件-x"},"58.7":{t:"关于公共库",p:"",l:"todo.html#关于公共库",a:"关于公共库"},"58.8":{t:"公共库的基础搭建和引入-white-check-mark",p:`通过 submodule 进行代码共享，通过 tsc 转译 ts 文件至 js 文件。
`,l:"todo.html#公共库的基础搭建和引入-white-check-mark",a:"公共库的基础搭建和引入-white-check-mark"},"58.9":{t:"如何方便引入-white-check-mark",p:`因为现在发布都是走的 jenkins，如何让每个项目都拉取公共库，这是一个值得讨论的问题。
::: tip 模板引入
运维目 ...`,l:"todo.html#如何方便引入-white-check-mark",a:"如何方便引入-white-check-mark"},"58.10":{t:"vue-demi-x",p:`vue-demi 旨在编写一套代码，可以兼容 vue3 以及 vue2。
::: warning 放弃探索
目前 vant  ...`,l:"todo.html#vue-demi-x",a:"vue-demi-x"},"58.11":{t:"函数补充-white-check-mark",p:`常用函数以及文档已编写完毕。
::: tip vscode region
目前函数注释通过 vscode region 进行 ...`,l:"todo.html#函数补充-white-check-mark",a:"函数补充-white-check-mark"},"58.12":{t:"vue3-组件补充-raised-hands",p:`先考虑支持 vue3 版本，目前正在慢速增加中。
`,l:"todo.html#vue3-组件补充-raised-hands",a:"vue3-组件补充-raised-hands"},"58.13":{t:"vue3-hook-补充",p:`先考虑支持 vue3 版本，目前待支持中。
`,l:"todo.html#vue3-hook-补充",a:"vue3-hook-补充"},"58.14":{t:"vue3-指令补充",p:`目前还未清楚，业务中暂时要哪些指令
`,l:"todo.html#vue3-指令补充",a:"vue3-指令补充"},"58.15":{t:"jsbridge-white-check-mark",p:`目前 JSBridge 已开发完毕，详情见：JSBridge。
::: warning 风险点
APP 方并没有对这种模式进 ...`,l:"todo.html#jsbridge-white-check-mark",a:"jsbridge-white-check-mark"},"58.16":{t:"统一登录注册页-raised-hands",p:`开发一个统一登录注册页组件
::: warning TODO
目前开发了一个统一登录组件，后面需要将其管理在某一个项目中。
 ...`,l:"todo.html#统一登录注册页-raised-hands",a:"统一登录注册页-raised-hands"},"58.17":{t:"微信流程封装-white-check-mark",p:`封装微信流程，使得使用更加方便。详情见：微信。
`,l:"todo.html#微信流程封装-white-check-mark",a:"微信流程封装-white-check-mark"},"58.18":{t:"关于小程序",p:"目前后期很有可能在小程序上进行发力，需要有空时针对小程序进行技术储备。目前市面上小程序常用框架一般是：taro 或者 uni ...",l:"todo.html#关于小程序",a:"关于小程序"},"58.19":{t:"关于-ssr",p:"目前后续期很有可能在 SSR 服务端渲染进行发力（因为需要做官网），需要有空时针对 SSR 进行技术储备。一般来说，官网一般 ...",l:"todo.html#关于-ssr",a:"关于-ssr"},"59.0":{t:"iframe-src-mobile-html-iframe",p:"",l:"ui-guide/mobile-show.html",a:"iframe-src-mobile-html-iframe"},"60.0":{t:"ui-h5-方补充说明",p:"",l:"ui-guide/replenish.html",a:"ui-h5-方补充说明"},"60.1":{t:"设计稿",p:"设计稿目前是以 375 作为标准宽度，当我们使用 375 作为基础转换的时候是没有问题的。但是老项目有些是以 750 作为基 ...",l:"ui-guide/replenish.html#设计稿",a:"设计稿"},"60.2":{t:"字体",p:`在 H5 中安卓字体是十分令人头疼的。详情请见：
2022年了，安卓能用 font-weight: 500了吗？
大部分前端 ...`,l:"ui-guide/replenish.html#字体",a:"字体"},"60.3":{t:"图片",p:`关于图片选用svg 或者 png 应当这样区分：

如果是图标之类的图片应当选用svg格式（会把所有的 svg 集中到雪碧图 ...`,l:"ui-guide/replenish.html#图片",a:"图片"}},a={previewLength:62,buttonLabel:"搜索",placeholder:"输入以搜索",encode:!1,tokenize:"full"},o={INDEX_DATA:e,PREVIEW_LOOKUP:t,Options:a};export{o as default};