import{r as a,e as i,d as u,c as f,f as d,n as o,u as _,o as h,_ as v}from"../app.3d9ab6db.js";function b(){const e=a(!1),t=a("light");return i(()=>{const s=document.documentElement,r=s.className||"light";if(t.value=r,!e.value){var c={attributes:!0,attributeFilter:["class"]};new MutationObserver(function(l){for(const n of l)if(n.attributeName==="class"){const m=n.target.className||"light";t.value=m}}).observe(s,c)}}),t}const g=["src","srcdoc"],p=u({__name:"Iframe",props:{src:null,srcdoc:null,type:{default:"mobile"}},setup(e){const t=a(null),s=b();return(r,c)=>(h(),f("div",{class:o(["iframe-container",_(s)==="light"?"light":"dark"])},[d("iframe",{src:e.src,srcdoc:e.srcdoc,ref_key:"iframe",ref:t,class:o([e.type,"iframe"]),frameborder:"0"},null,10,g)],2))}});const k=v(p,[["__scopeId","data-v-497a2a7e"]]);export{k as I};
