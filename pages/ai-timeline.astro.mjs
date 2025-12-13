/* empty css                                 */
import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_CZYxoDnS.mjs';
import 'piccolore';
import 'html-escaper';
import { $ as $$Layout, a as $$Header, b as $$Footer } from '../chunks/Footer_COdvifAy.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", ' <script async src="https://platform.x.com/widgets.js" charset="utf-8"><\/script>'])), renderComponent($$result, "Layout", $$Layout, { "title": "\u751F\u6210AI\u306E\u6B74\u53F2\u30BF\u30A4\u30E0\u30E9\u30A4\u30F3" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "showBack": true })} ${maybeRenderHead()}<main class="flex-1 w-full bg-gray-100 flex flex-col relative" style="min-height: calc(100vh - 64px);"> ${renderComponent($$result2, "AiTimelineComponent", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/dev/knackdash-dev/src/components/timeline/AiTimeline", "client:component-export": "default" })} </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` }));
}, "C:/dev/knackdash-dev/src/pages/ai-timeline/index.astro", void 0);

const $$file = "C:/dev/knackdash-dev/src/pages/ai-timeline/index.astro";
const $$url = "/debagame-homepage/ai-timeline";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
