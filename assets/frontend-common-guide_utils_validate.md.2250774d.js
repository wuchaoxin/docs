import{_ as s,c as a,o as n,a as l}from"./app.3d9ab6db.js";const d=JSON.parse('{"title":"validate","description":"","frontmatter":{},"headers":[],"relativePath":"frontend-common-guide/utils/validate.md","lastUpdated":1675835613000}'),p={name:"frontend-common-guide/utils/validate.md"},o=l(`<h1 id="validate" tabindex="-1">validate <a class="header-anchor" href="#validate" aria-hidden="true">#</a></h1><p>跟正则校验以及正则表达式相关的常量以及函数。</p><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 移动电话校验</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> REG_PHONE </span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">/</span><span style="color:#89DDFF;font-style:italic;">^</span><span style="color:#C3E88D;">1</span><span style="color:#89DDFF;">(</span><span style="color:#C3E88D;">3</span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;">4</span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;">5</span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;">6</span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;">7</span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;">8</span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;">9</span><span style="color:#89DDFF;">)</span><span style="color:#C3E88D;">\\d</span><span style="color:#89DDFF;">{9}</span><span style="color:#89DDFF;font-style:italic;">$</span><span style="color:#89DDFF;">/</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Email 校验</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> REG_EMAIL </span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">/</span><span style="color:#C3E88D;">\\w</span><span style="color:#89DDFF;">+([</span><span style="color:#C3E88D;">-+.</span><span style="color:#89DDFF;">]</span><span style="color:#C3E88D;">\\w</span><span style="color:#89DDFF;">+)*</span><span style="color:#C3E88D;">@\\w</span><span style="color:#89DDFF;">+([</span><span style="color:#C3E88D;">-.</span><span style="color:#89DDFF;">]</span><span style="color:#C3E88D;">\\w</span><span style="color:#89DDFF;">+)*</span><span style="color:#A6ACCD;">\\.</span><span style="color:#C3E88D;">\\w</span><span style="color:#89DDFF;">+([</span><span style="color:#C3E88D;">-.</span><span style="color:#89DDFF;">]</span><span style="color:#C3E88D;">\\w</span><span style="color:#89DDFF;">+)*/</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 密码校验</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> REG_PASSWORD </span><span style="color:#89DDFF;">=</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">/</span><span style="color:#89DDFF;font-style:italic;">^</span><span style="color:#89DDFF;">(?![</span><span style="color:#C3E88D;">a-zA-Z</span><span style="color:#89DDFF;">]+</span><span style="color:#89DDFF;font-style:italic;">$</span><span style="color:#89DDFF;">)(?![</span><span style="color:#C3E88D;">A-Z0-9</span><span style="color:#89DDFF;">]+</span><span style="color:#89DDFF;font-style:italic;">$</span><span style="color:#89DDFF;">)(?![</span><span style="color:#C3E88D;">A-Z\\W_</span><span style="color:#89DDFF;">]+</span><span style="color:#89DDFF;font-style:italic;">$</span><span style="color:#89DDFF;">)(?![</span><span style="color:#C3E88D;">a-z0-9</span><span style="color:#89DDFF;">]+</span><span style="color:#89DDFF;font-style:italic;">$</span><span style="color:#89DDFF;">)(?![</span><span style="color:#C3E88D;">a-z\\W_</span><span style="color:#89DDFF;">]+</span><span style="color:#89DDFF;font-style:italic;">$</span><span style="color:#89DDFF;">)(?![</span><span style="color:#C3E88D;">0-9\\W_</span><span style="color:#89DDFF;">]+</span><span style="color:#89DDFF;font-style:italic;">$</span><span style="color:#89DDFF;">)[</span><span style="color:#C3E88D;">a-zA-Z0-9\\W_</span><span style="color:#89DDFF;">]{8,16}</span><span style="color:#89DDFF;font-style:italic;">$</span><span style="color:#89DDFF;">/</span><span style="color:#89DDFF;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div>`,3),t=[o];function e(c,r,D,y,F,i){return n(),a("div",null,t)}const E=s(p,[["render",e]]);export{d as __pageData,E as default};
