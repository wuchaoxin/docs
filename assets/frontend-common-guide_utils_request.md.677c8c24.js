import{_ as s,c as n,o as a,a as l}from"./app.b713d63a.js";const b=JSON.parse('{"title":"request","description":"","frontmatter":{},"headers":[{"level":2,"title":"setCustomConfig","slug":"setcustomconfig","link":"#setcustomconfig","children":[]},{"level":2,"title":"请求时新增 api","slug":"请求时新增-api","link":"#请求时新增-api","children":[]}],"relativePath":"frontend-common-guide/utils/request.md","lastUpdated":1675835613000}'),p={name:"frontend-common-guide/utils/request.md"},e=l(`<h1 id="request" tabindex="-1">request <a class="header-anchor" href="#request" aria-hidden="true">#</a></h1><p>使用方法和 axios 一模一样，不过在 axios 的基础上做了一个程度的封装，新增了一些常见的功能。</p><h2 id="setcustomconfig" tabindex="-1">setCustomConfig <a class="header-anchor" href="#setcustomconfig" aria-hidden="true">#</a></h2><p>可以通过函数进行修改全局的配置</p><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">description</span><span style="color:#676E95;font-style:italic;"> setCustomConfig 设置 axios 默认全局配置</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">param</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#89DDFF;font-style:italic;">{</span><span style="color:#FFCB6B;font-style:italic;">Partial&lt;AxiosCustomConfig&gt;</span><span style="color:#89DDFF;font-style:italic;">}</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#A6ACCD;font-style:italic;">config</span><span style="color:#676E95;font-style:italic;"> 配置</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">returns</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#89DDFF;font-style:italic;">{</span><span style="color:#FFCB6B;font-style:italic;">void</span><span style="color:#89DDFF;font-style:italic;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">example</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>可以配置的功能如下：</p><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 是否开启去除重复请求</span></span>
<span class="line"><span style="color:#FFCB6B;">noRepeat</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> boolean</span></span>
<span class="line"><span style="color:#FFCB6B;">cache</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 是否开启缓存</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">storage</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">boolean</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 需要缓存多久</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">storageTime</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">number</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 请求失败后，是否重复请求</span></span>
<span class="line"><span style="color:#FFCB6B;">retry</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 重复请求几次</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">retries</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">number</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 控制重试请求之间的延迟。</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">retryDelay</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">number</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 选择哪些 api 需要进行重复请求</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">apis</span><span style="color:#89DDFF;">?:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Array</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">string</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 追加参数列表（方法以区分大小写）</span></span>
<span class="line"><span style="color:#FFCB6B;">appendData</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> Array</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">AppendData</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 追加消息头配置</span></span>
<span class="line"><span style="color:#FFCB6B;">appendHeader</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  [</span><span style="color:#A6ACCD;">key</span><span style="color:#F07178;">: </span><span style="color:#A6ACCD;">string</span><span style="color:#F07178;">]: </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">config</span><span style="color:#89DDFF;">?:</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">AxiosCustomRequestConfig</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">string</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 错误提示函数</span></span>
<span class="line"><span style="color:#A6ACCD;">errorHint</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">config</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Record</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">unknown</span><span style="color:#89DDFF;">&gt;)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">void</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>默认的配置：</p><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">noRepeat</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 默认配置，请求侧可再次更改（只对 get 请求有效）</span></span>
<span class="line"><span style="color:#FFCB6B;">cache</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">storage</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">storageTime</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">5</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">*</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">60</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">*</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1000</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 默认关闭，需要在请求侧开启</span></span>
<span class="line"><span style="color:#FFCB6B;">retry</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">retries</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">retryDelay</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1000</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#FFCB6B;">appendData</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> []</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#FFCB6B;">appendHeader</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{},</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="请求时新增-api" tabindex="-1">请求时新增 api <a class="header-anchor" href="#请求时新增-api" aria-hidden="true">#</a></h2><p>请求新增选项 api（你可以直接在请求中加入这些选项）：</p><blockquote><p>如果 api 选项和全局选项冲突了，那么只会启动 api 选项。</p></blockquote><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 是否开启去除重复请求</span></span>
<span class="line"><span style="color:#A6ACCD;">noRepeat</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> boolean</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 请求失败后，是否重复请求</span></span>
<span class="line"><span style="color:#A6ACCD;">retry</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> boolean</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 请求数据方式是否为表单</span></span>
<span class="line"><span style="color:#A6ACCD;">formData</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> boolean</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 是否开启缓存</span></span>
<span class="line"><span style="color:#A6ACCD;">cache</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> boolean</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 缓存过期时间</span></span>
<span class="line"><span style="color:#A6ACCD;">storageTime</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> number</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 是否需要进度条</span></span>
<span class="line"><span style="color:#A6ACCD;">progressBar</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> boolean</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 错误提示函数</span></span>
<span class="line"><span style="color:#A6ACCD;">errorHint</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">config</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Record</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">unknown</span><span style="color:#89DDFF;">&gt;)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">void</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div>`,13),o=[e];function t(c,r,i,y,F,D){return a(),n("div",null,o)}const u=s(p,[["render",t]]);export{b as __pageData,u as default};