import{_ as s,c as n,o as a,a as e}from"./app.17fb9f66.js";const u=JSON.parse('{"title":"如何贡献代码","description":"","frontmatter":{},"headers":[{"level":2,"title":"分支说明","slug":"分支说明","link":"#分支说明","children":[]},{"level":2,"title":"Effect","slug":"effect","link":"#effect","children":[{"level":3,"title":"禁止未知来源","slug":"禁止未知来源","link":"#禁止未知来源","children":[]},{"level":3,"title":"纯函数","slug":"纯函数","link":"#纯函数","children":[]}]},{"level":2,"title":"Only TypeScript","slug":"only-typescript","link":"#only-typescript","children":[]},{"level":2,"title":"注释规范","slug":"注释规范","link":"#注释规范","children":[{"level":3,"title":"文件注释","slug":"文件注释","link":"#文件注释","children":[]},{"level":3,"title":"函数注释","slug":"函数注释","link":"#函数注释","children":[]},{"level":3,"title":"组件注释","slug":"组件注释","link":"#组件注释","children":[]}]},{"level":2,"title":"git 提交规范","slug":"git-提交规范","link":"#git-提交规范","children":[{"level":3,"title":"安装 CZ","slug":"安装-cz","link":"#安装-cz","children":[]},{"level":3,"title":"提交性质","slug":"提交性质","link":"#提交性质","children":[]}]},{"level":2,"title":"命名规范","slug":"命名规范","link":"#命名规范","children":[{"level":3,"title":"函数命名","slug":"函数命名","link":"#函数命名","children":[]},{"level":3,"title":"SFC 命名","slug":"sfc-命名","link":"#sfc-命名","children":[]}]}],"relativePath":"frontend-common-guide/CONTRIBUTOR.md","lastUpdated":1675835613000}'),l={name:"frontend-common-guide/CONTRIBUTOR.md"},o=e(`<h1 id="如何贡献代码" tabindex="-1">如何贡献代码 <a class="header-anchor" href="#如何贡献代码" aria-hidden="true">#</a></h1><p>原则上这个仓库不会迁移代码，而是进行代码重构，请保证代码质量以及注释丰富。</p><blockquote><p>如果你有防抖、节流等工具函数的使用需求，请直接使用 <a href="https://vueuse.org/" target="_blank" rel="noreferrer">vue-use</a> 这个 hook 函数库，无需开发新的工具函数。</p></blockquote><h2 id="分支说明" tabindex="-1">分支说明 <a class="header-anchor" href="#分支说明" aria-hidden="true">#</a></h2><p><code>master</code>、<code>master-template</code>、<code>master-cli</code> 这三个分支，开发者没有权限去 <code>merge</code> 以及 <code>push</code>，如果你有相关修改，请遵循一下步骤：</p><p>开发或者迭代（<code>feature</code> 也可以叫做 <code>task</code>）：</p><ol><li>拉出 <code>feature/xxx</code> 分支，开发完毕后，提出 <code>Merge Request</code> 给到仓库维护者</li><li>维护者进行 <code>Code Review</code>，<code>feature</code> 分支将被删除</li></ol><p>修复问题：</p><ol><li>拉出 <code>bugfix/xxx</code> 分支，开发完毕后，提出 <code>Merge Request</code> 给到仓库维护者</li><li>维护者进行 <code>Code Review</code>，<code>bugfix</code> 分支将被删除</li></ol><blockquote><p>原则上，除 <code>master</code> 相关分支外，你的分支不应该在仓库停留过长，如果你有此需求，请将分支改名为 <code>release/xxx</code> 作为停靠分支。</p></blockquote><h2 id="effect" tabindex="-1">Effect <a class="header-anchor" href="#effect" aria-hidden="true">#</a></h2><h3 id="禁止未知来源" tabindex="-1">禁止未知来源 <a class="header-anchor" href="#禁止未知来源" aria-hidden="true">#</a></h3><p>所有的组件、函数、样式（工具类样式函数除外）不允许在文件中不知道来源。也就是说组件不允许全局注册，函数不允许挂载到 window 等对象上，样式不得随意全局污染。组件应该与样式进行强绑定，而非通过样式文件到处穿插。</p><p>同时，禁止魔术常量，也就是说禁止直接出现具体的数字或者字符，你应该用枚举或者对象进行声明（名称需要大写下划线形式）。</p><h3 id="纯函数" tabindex="-1">纯函数 <a class="header-anchor" href="#纯函数" aria-hidden="true">#</a></h3><p>在函数式编程中，函数分为纯函数、副作用函数。如果一个函数只依赖实参，而不依赖其他外部参数并且函数运行后，并不会对外部环境造成影响的贼为纯函数，否则这个函数是一个副作用函数。我们在平时开发时，尽量书写纯函数（方便进行迁移工作）。举例：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> temp </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 纯函数</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">pureFn</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">params</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">params</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">pure</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 副作用函数</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">effectFn</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">params</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">temp</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">params</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">temp</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">pure</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="only-typescript" tabindex="-1">Only TypeScript <a class="header-anchor" href="#only-typescript" aria-hidden="true">#</a></h2><p>此仓库中必须使用 <code>typeScript</code>。如果你需要使用 <code>javaScript</code>，请同时开发好相关的类型声明文件，否则你应该重构。 但是代码也兼容<code>javaScript</code>，在 <code>utils</code> 文件夹下编写相关函数，而 <code>js</code> 文件夹通过 <code>npm run build</code> 进行生成即可。这样的的好处在于，编写一套代码，从而可以支持 <code>ts</code> 以及 <code>js</code>，并且 <code>js</code> 可以支持类型推导，相关设置参见 <code>tsconfig.json</code>。</p><p><a href="https://www.tslang.cn/docs/handbook/compiler-options.html" target="_blank" rel="noreferrer">编译选项说明</a></p><blockquote><p>想要运行 <code>npm run build</code> 命令，需要在全局安装 <code>typescript</code> ,命令: <code>sudo npm install typescript -g</code>。</p></blockquote><h2 id="注释规范" tabindex="-1">注释规范 <a class="header-anchor" href="#注释规范" aria-hidden="true">#</a></h2><p>首先，你需要学会如何配置代码片段</p><ol><li>按下组合键 ctrl(command) + shift + p</li><li>在出现的输入框输入 snippets，回车</li><li>输入 ts，进入 typeScript.json文件夹下</li><li>将下面的配置进行拷贝</li><li>使用：在 ts 文件中输入 ts 即可看见相关配置的片段</li></ol><blockquote><p>js 同理也是如此操作，只是将 ts 换成 js 即可。</p></blockquote><div class="language-json line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">Print to tsNoteTitle</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">prefix</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">tsNote</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">body</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/**</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;"> * @description</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;"> */</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">],</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">description</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">TS注释</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">Print to tsNoteMethod</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">prefix</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">tsMethodNote</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">body</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/**</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;"> * @description</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;"> * @param {null} \${1:参数1}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;"> * @param {null} \${2:参数2}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;"> * @returns {void}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;"> * @example </span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;"> */</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">],</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">description</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">TS方法注释</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h3 id="文件注释" tabindex="-1">文件注释 <a class="header-anchor" href="#文件注释" aria-hidden="true">#</a></h3><p>文件注释主要说明这个文件的具体作用，让进入者通过文件名以及文件注释，一眼知道这个文件的作用。例如，输入 <code>tsNote</code>（根据上述配置），然后声明这个文件的作用。</p><h3 id="函数注释" tabindex="-1">函数注释 <a class="header-anchor" href="#函数注释" aria-hidden="true">#</a></h3><p>函数注释主要说明这个函数的具体入参、返回、作用，让使用者通过注释，一眼知道这个函数的作用。例如，输入 <code>tsMethodNote</code>（根据上述配置），然后写入注释。</p><h3 id="组件注释" tabindex="-1">组件注释 <a class="header-anchor" href="#组件注释" aria-hidden="true">#</a></h3><p>组件注释主要通过文件下的 <code>README.md</code> 进行书写（当然，你也应该添加文件注释）</p><h2 id="git-提交规范" tabindex="-1">git 提交规范 <a class="header-anchor" href="#git-提交规范" aria-hidden="true">#</a></h2><p>建议开启 <code>CommitLint</code>，使得你的提交更加规范。</p><h3 id="安装-cz" tabindex="-1">安装 CZ <a class="header-anchor" href="#安装-cz" aria-hidden="true">#</a></h3><ol><li>安装 commitizen：<code>npm install -g commitizen</code></li><li>生成适配器：<code>commitizen init cz-conventional-changelog --save-dev --save-exact</code></li><li>全局指定适配器：<code>echo &#39;{ &quot;path&quot;: &quot;cz-conventional-changelog&quot; }&#39; &gt; ~/.czrc</code></li><li>往后提交使用 <code>git cz</code> 代替 <code>git commit</code> 指令</li></ol><p>相信我，这不会让你的提交过程有过多心智负担，反而使得你追溯自己的提交更有效率。</p><h3 id="提交性质" tabindex="-1">提交性质 <a class="header-anchor" href="#提交性质" aria-hidden="true">#</a></h3><table><thead><tr><th>值</th><th>描述</th></tr></thead><tbody><tr><td>feat</td><td>新增一个功能</td></tr><tr><td>fix</td><td>修复一个Bug</td></tr><tr><td>docs</td><td>文档变更</td></tr><tr><td>style</td><td>代码格式（不影响功能，例如空格、分号等格式修正）</td></tr><tr><td>refactor</td><td>既不修复错误也不添加功能的代码更改</td></tr><tr><td>perf</td><td>提高性能的代码更改</td></tr><tr><td>test</td><td>添加缺失的测试或纠正现有的测试</td></tr><tr><td>build</td><td>影响构建系统或外部依赖项的更改（示例范围：gulp、broccoli、npm）</td></tr><tr><td>ci</td><td>对我们的 CI 配置文件和脚本的更改（示例范围：Travis、Circle、Browser Stack、Sauce Labs）</td></tr><tr><td>chore</td><td>不修改 src 或测试文件的其他更改</td></tr><tr><td>revert</td><td>恢复之前的提交</td></tr></tbody></table><h2 id="命名规范" tabindex="-1">命名规范 <a class="header-anchor" href="#命名规范" aria-hidden="true">#</a></h2><h3 id="函数命名" tabindex="-1">函数命名 <a class="header-anchor" href="#函数命名" aria-hidden="true">#</a></h3><ul><li>以 <code>get</code> 开头的函数都为类纯函数（不带有副作用，但是可能依赖外部变量），并且有返回值。</li><li>以 <code>is</code> 开头的函数都为不确定类型函数，有 boolean 返回值或者 Promise 类型的 boolean（没有 catch）。</li><li>已 <code>judge</code> 开头的函数都为副作用函数（带有副作用），可能有返回值，多用于用户判断。</li><li>已 <code>handle</code> 开头的函数都为副作用函数（带有副作用），有返回值。</li><li>已 <code>generate</code> 开头的函数都为副作用函数（带有副作用）生成相关结果，无返回值。</li><li>已 <code>use</code> 开头的函数都为类纯函数（不带有副作用）且本身使用了 vue 相关的 api 或者大规模的逻辑抽离，多为同步函数，也有 promise 风格出现。</li></ul><h3 id="sfc-命名" tabindex="-1">SFC 命名 <a class="header-anchor" href="#sfc-命名" aria-hidden="true">#</a></h3><ul><li>页面命名：以小骆驼峰为准</li><li>组件命名：以大骆驼峰为准（业务组件中文件夹使用小写，共用组件中文件夹使用大写）</li><li>css class 命名：以短横线为准</li></ul><blockquote><p>尽量不要出现 Test &gt; Test.vue 这种多层且为文件夹和文件相同名称大写命名方式。</p></blockquote><blockquote><p>由于 mac、git、以及 vue setup自动注册的原因，你最好不要去修改一个组件的大小写关系。如果修改后发现运行有问题，排除掉 git 大小写敏感的问题；多半是自动注册的原因，这个时候，你可以备份源文件，删除掉文件，重新创建。(PS：如果你修改文件大小写名，发现无论怎么操作 TS 都会失效，这个时候最好将项目删除，然后利用 git 恢复回来)</p></blockquote>`,46),t=[o];function p(c,r,i,d,D,F){return a(),n("div",null,t)}const h=s(l,[["render",p]]);export{u as __pageData,h as default};