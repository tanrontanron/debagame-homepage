/* empty css                                    */
import { c as createComponent, a as renderComponent, r as renderTemplate } from '../../chunks/astro/server_CZYxoDnS.mjs';
import 'piccolore';
import 'html-escaper';
import { $ as $$ContentLayout } from '../../chunks/ContentLayout_Dyy8z7X0.mjs';
/* empty css                                         */
export { renderers } from '../../renderers.mjs';

const $$SizeCheck = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "ContentLayout", $$ContentLayout, { "title": "\u8863\u985E\u30B5\u30A4\u30BA\u6BD4\u8F03\u30C4\u30FC\u30EB | \u3067\u3070\u304C\u3081\u306E\u307B\u3081\u3071\u3052" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SizeCheck", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/dev/knackdash-dev/src/components/tool/size-check/SizeCheck", "client:component-export": "default" })} ` })} `;
}, "C:/dev/knackdash-dev/src/pages/tool/size-check.astro", void 0);

const $$file = "C:/dev/knackdash-dev/src/pages/tool/size-check.astro";
const $$url = "/debagame-homepage/tool/size-check";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$SizeCheck,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
