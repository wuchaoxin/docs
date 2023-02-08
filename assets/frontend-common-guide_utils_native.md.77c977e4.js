import{_ as s,c as a,o as n,a as t}from"./app.3d9ab6db.js";const m=JSON.parse('{"title":"native","description":"","frontmatter":{},"headers":[{"level":2,"title":"openOrDownApp","slug":"openordownapp","link":"#openordownapp","children":[]}],"relativePath":"frontend-common-guide/utils/native.md","lastUpdated":1675835613000}'),l={name:"frontend-common-guide/utils/native.md"},e=t(`<h1 id="native" tabindex="-1">native <a class="header-anchor" href="#native" aria-hidden="true">#</a></h1><p>不借用 JSBridge 能力但是又与 native 相关的函数</p><h2 id="openordownapp" tabindex="-1">openOrDownApp <a class="header-anchor" href="#openordownapp" aria-hidden="true">#</a></h2><p>跳转 app 链接，如果没有下载 app 那么就下载</p><blockquote><p>需要注意：判断是通过时间来进行的（2s），如果用户在 2s 内没有操作，这时候判断是会有问题的。</p></blockquote><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">description</span><span style="color:#676E95;font-style:italic;"> 跳转 app 链接，如果没有下载 app 那么就下载</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">param</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#89DDFF;font-style:italic;">{</span><span style="color:#FFCB6B;font-style:italic;">string</span><span style="color:#89DDFF;font-style:italic;">}</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#A6ACCD;font-style:italic;">appsUrl</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">param</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#89DDFF;font-style:italic;">{</span><span style="color:#FFCB6B;font-style:italic;">boolean</span><span style="color:#89DDFF;font-style:italic;">}</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#A6ACCD;font-style:italic;">isShowToast</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">example</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div>`,6),o=[e];function p(i,c,r,y,d,f){return n(),a("div",null,o)}const u=s(l,[["render",p]]);export{m as __pageData,u as default};
