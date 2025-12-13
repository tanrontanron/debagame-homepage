/* empty css                                    */
import { c as createComponent, a as renderComponent, r as renderTemplate } from '../../chunks/astro/server_CZYxoDnS.mjs';
import 'piccolore';
import 'html-escaper';
import { $ as $$ContentLayout } from '../../chunks/ContentLayout_Dyy8z7X0.mjs';
/* empty css                                           */
export { renderers } from '../../renderers.mjs';

const $$NumberPlate = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "ContentLayout", $$ContentLayout, { "title": "\u30CA\u30F3\u30D0\u30FC\u30D7\u30EC\u30FC\u30C8\u60C5\u5831 | \u3067\u3070\u304C\u3081\u306E\u307B\u3081\u3071\u3052" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "NumberPlateGenerator", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/dev/knackdash-dev/src/components/info/NumberPlateGenerator", "client:component-export": "default" })} ` })} `;
}, "C:/dev/knackdash-dev/src/pages/info/number-plate.astro", void 0);

const $$file = "C:/dev/knackdash-dev/src/pages/info/number-plate.astro";
const $$url = "/debagame-homepage/info/number-plate";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$NumberPlate,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
