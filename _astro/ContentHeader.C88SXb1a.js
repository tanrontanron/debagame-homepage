import"./index.Cycvls3P.js";var x={exports:{}},r={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var d;function c(){if(d)return r;d=1;var s=Symbol.for("react.transitional.element"),n=Symbol.for("react.fragment");function i(l,e,t){var o=null;if(t!==void 0&&(o=""+t),e.key!==void 0&&(o=""+e.key),"key"in e){t={};for(var a in e)a!=="key"&&(t[a]=e[a])}else t=e;return e=t.ref,{$$typeof:s,type:l,key:o,ref:e!==void 0?e:null,props:t}}return r.Fragment=n,r.jsx=i,r.jsxs=i,r}var p;function f(){return p||(p=1,x.exports=c()),x.exports}var u=f();const v=({title:s,children:n,className:i=""})=>{const e=(t=>t>20?"text-sm md:text-base":t>15?"text-base md:text-lg":"text-lg md:text-xl")(s.length);return u.jsxs("div",{className:`flex-none bg-slate-900/95 backdrop-blur shadow-md z-[40] px-4 py-3 border-b border-slate-700 flex items-center justify-center relative sticky top-0 ${i}`,children:[u.jsx("h1",{className:`${e} font-bold text-white tracking-wide whitespace-nowrap overflow-hidden text-ellipsis flex items-center gap-2`,children:s}),n&&u.jsx("div",{className:"absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-end z-10",children:n})]})};export{v as C,u as j};
