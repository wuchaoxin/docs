import{_ as s,c as a,o as n,a as e}from"./app.b713d63a.js";const h=JSON.parse('{"title":"混入","description":"","frontmatter":{},"headers":[{"level":2,"title":"textOverflow","slug":"textoverflow","link":"#textoverflow","children":[]},{"level":2,"title":"safeTop","slug":"safetop","link":"#safetop","children":[]},{"level":2,"title":"safeBottom","slug":"safebottom","link":"#safebottom","children":[]},{"level":2,"title":"zIndex","slug":"zindex","link":"#zindex","children":[]},{"level":2,"title":"autoFontFamily","slug":"autofontfamily","link":"#autofontfamily","children":[]},{"level":2,"title":"autoFontWeight","slug":"autofontweight","link":"#autofontweight","children":[]},{"level":2,"title":"setBackgroundImage","slug":"setbackgroundimage","link":"#setbackgroundimage","children":[]},{"level":2,"title":"setBackgroundImageForTheme","slug":"setbackgroundimagefortheme","link":"#setbackgroundimagefortheme","children":[]},{"level":2,"title":"thinBorder","slug":"thinborder","link":"#thinborder","children":[]},{"level":2,"title":"基础使用","slug":"基础使用","link":"#基础使用","children":[]}],"relativePath":"frontend-common-guide/styles/sass/utils.md","lastUpdated":1675835613000}'),l={name:"frontend-common-guide/styles/sass/utils.md"},t=e(`<h1 id="混入" tabindex="-1">混入 <a class="header-anchor" href="#混入" aria-hidden="true">#</a></h1><h2 id="textoverflow" tabindex="-1">textOverflow <a class="header-anchor" href="#textoverflow" aria-hidden="true">#</a></h2><p>文字溢出处理</p><div class="language-scss line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">scss</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * @description 文字溢出处理-</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * @param { number } $line 行数限制</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="safetop" tabindex="-1">safeTop <a class="header-anchor" href="#safetop" aria-hidden="true">#</a></h2><p>IOS 开启顶部安全距离</p><div class="language-scss line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">scss</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * @description IOS 开启顶部安全距离</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * @param { boolean } $isMargin 是否启动 margin（否则使用 padding，默认 false）</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="safebottom" tabindex="-1">safeBottom <a class="header-anchor" href="#safebottom" aria-hidden="true">#</a></h2><p>IOS 开启底部安全距离</p><div class="language-scss line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">scss</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * @description IOS 开启底部安全距离</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * @param { boolean } $isMargin 是否启动 margin（否则使用 padding，默认 false）</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="zindex" tabindex="-1">zIndex <a class="header-anchor" href="#zindex" aria-hidden="true">#</a></h2><p><code>z-index</code> 的设置，解决在ios下偶尔 z-index 不生效（原因是设置了-webkit-overflow-scrolling: touch，并且 Safari 的图层渲染和 Chrome 有点不一样）</p><div class="language-scss line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">scss</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * @description 解决在ios下 z-index 不生效（原因是设置了-webkit-overflow-scrolling: touch）</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * @param {number} $z-index 层级设置</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="autofontfamily" tabindex="-1">autoFontFamily <a class="header-anchor" href="#autofontfamily" aria-hidden="true">#</a></h2><p><code>autoFontFamily</code> 是为了设置好字体的 fallback 机制，值得注意安卓预装了 <code>MiSans</code> 字体，我们只需要按照苹果的字体走，安卓会自动应用对应其字体。</p><div class="language-scss line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">scss</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * @description 解决字体 fallback 问题</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * @param {string} $fontFamily 字体</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="autofontweight" tabindex="-1">autoFontWeight <a class="header-anchor" href="#autofontweight" aria-hidden="true">#</a></h2><p><code>autoFontWeight</code> 是为了区分安卓下对很多字体 <code>font-weight</code> 不支持，所以我们在这里直接判断安卓下如果小于 400 则为 400，大于 400 则为 700，而 IOS 不受影响。如果安卓预装了 <code>MiSans</code> 字体对<code>font-weight</code> 支持度够好，其实也就不用使用这个混入了，不过一切需要测试后才知道。</p><div class="language-scss line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">scss</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * @description 解决在安卓下的很多字体对 font-weight 支持度较少的情况</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * @param {number} $number 值</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="setbackgroundimage" tabindex="-1">setBackgroundImage <a class="header-anchor" href="#setbackgroundimage" aria-hidden="true">#</a></h2><p>处理图片分辨率问题，如果你使用的是svg，则不应该使用该函数（原理：根据图片名称，自动加入不同分辨率的图片）</p><div class="language-scss line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">scss</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// !!! 使用之前，一定要仔细看！（对图片名字带有约定要求）</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * @description 处理图片分辨率问题，如果你使用的是svg，则不应该使用该函数（原理：根据图片名称，自动加入不同分辨率的图片）</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * @param {string} $imgName 图片名称（需要带后缀名，注意名称不能带.，同时该图片应当是目前最低的分辨率，同时图片的名称需要固定写法）</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * @param {string} $theme 当前的主题（会自动拼接到路径上）</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * @param {string} $imgFolder 图片路径（根据项目你应该使其有个默认值）</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * @example @include judgeImg(&#39;test.png&#39;,&#39;@/icons&#39;);（注意:这个时候你需要有 test.png、test@2x.png、test@3x.png ）</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * @example @include judgeImg(&#39;test@2x.png&#39;,&#39;@/icons&#39;);（注意:这个时候你需要有 test@2x.png、test@3x.png、test@4x.png ）  </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="setbackgroundimagefortheme" tabindex="-1">setBackgroundImageForTheme <a class="header-anchor" href="#setbackgroundimagefortheme" aria-hidden="true">#</a></h2><p><code>setBackgroundImage</code> 混入的变种，目的是为了处理多主题的图片</p><p>自动加入 <code>dark</code> 类，然后 dark 类下加入和 <code>setBackgroundImage</code> 一样的图片（不过名称后面跟了<code>_dark</code>）</p><h2 id="thinborder" tabindex="-1">thinBorder <a class="header-anchor" href="#thinborder" aria-hidden="true">#</a></h2><p>处理 1px 问题（原理：利用伪元素画出一个 div，再将这个 div 进行取消互动事件以及局部缩放处理）</p><div class="language-scss line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">scss</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    * @description 处理 1px 问题（原理：利用伪元素画出一个 div，再将这个 div 进行取消互动事件以及局部缩放处理）</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    * @param {string|List} $directionMaps 边框位置（top,bottom,left,right）</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    * @param {string} $color 颜色</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    * @param {string|List} $radius 圆角边框</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    * @param {string} $position（after,before）</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    * @example 单边 thinBorder(top,red)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    * @example 多边 thinBorder((top,left),red)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    * @example 圆角 thinBorder(top, red, 100px)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    */</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="基础使用" tabindex="-1">基础使用 <a class="header-anchor" href="#基础使用" aria-hidden="true">#</a></h2><div class="language-scss line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">scss</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 提前在 webpack 或者 vite 中引入样式</span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">test</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">@include</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">textOverflow</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div>`,30),i=[t];function p(o,r,c,d,u,m){return n(),a("div",null,i)}const y=s(l,[["render",p]]);export{h as __pageData,y as default};