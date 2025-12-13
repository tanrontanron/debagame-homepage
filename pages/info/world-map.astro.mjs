/* empty css                                    */
import { c as createComponent, a as renderComponent, r as renderTemplate } from '../../chunks/astro/server_CZYxoDnS.mjs';
import 'piccolore';
import 'html-escaper';
import { $ as $$ContentLayout } from '../../chunks/ContentLayout_Dyy8z7X0.mjs';
export { renderers } from '../../renderers.mjs';

const $$WorldMap = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "ContentLayout", $$ContentLayout, { "title": "\u30A4\u30F3\u30BF\u30E9\u30AF\u30C6\u30A3\u30D6\u4E16\u754C\u5730\u56F3 | \u3067\u3070\u304C\u3081\u306E\u307B\u3081\u3071\u3052" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "WorldMap", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/dev/knackdash-dev/src/components/map/WorldMap", "client:component-export": "default" })} ` })} <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">`;
}, "C:/dev/knackdash-dev/src/pages/info/world-map.astro", void 0);

const $$file = "C:/dev/knackdash-dev/src/pages/info/world-map.astro";
const $$url = "/debagame-homepage/info/world-map";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$WorldMap,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
