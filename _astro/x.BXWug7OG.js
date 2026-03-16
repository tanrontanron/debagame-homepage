import{c as C}from"./index.ByPZWPtf.js";import{r as a}from"./index.Cl8VkP5O.js";const h="https://wxblqinfkmodvnsnytwn.supabase.co",I="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4YmxxaW5ma21vZHZuc255dHduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4OTU5OTksImV4cCI6MjA4MTQ3MTk5OX0.5F8NBBn__jSLvih_lykP3XPrcYlGLnxiFwphQOrOcAo",v=C(h,I);/**
 * @license lucide-react v0.561.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),b=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,r,o)=>o?o.toUpperCase():r.toLowerCase()),i=t=>{const e=b(t);return e.charAt(0).toUpperCase()+e.slice(1)},l=(...t)=>t.filter((e,r,o)=>!!e&&e.trim()!==""&&o.indexOf(e)===r).join(" ").trim(),f=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.561.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var k={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.561.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=a.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:r=2,absoluteStrokeWidth:o,className:n="",children:s,iconNode:p,...c},m)=>a.createElement("svg",{ref:m,...k,width:e,height:e,stroke:t,strokeWidth:o?Number(r)*24/Number(e):r,className:l("lucide",n),...!s&&!f(c)&&{"aria-hidden":"true"},...c},[...p.map(([u,d])=>a.createElement(u,d)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.561.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=(t,e)=>{const r=a.forwardRef(({className:o,...n},s)=>a.createElement(y,{ref:s,iconNode:e,className:l(`lucide-${w(i(t))}`,`lucide-${t}`,o),...n}));return r.displayName=i(t),r};/**
 * @license lucide-react v0.561.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],L=x("x",A);export{L as X,x as c,v as s};
