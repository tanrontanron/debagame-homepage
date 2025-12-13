/* empty css                                    */
import { c as createComponent, a as renderComponent, r as renderTemplate } from '../../chunks/astro/server_CZYxoDnS.mjs';
import 'piccolore';
import 'html-escaper';
import { $ as $$ContentLayout } from '../../chunks/ContentLayout_Dyy8z7X0.mjs';
export { renderers } from '../../renderers.mjs';

const $$Health = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "ContentLayout", $$ContentLayout, { "title": "\u5065\u5EB7\u8A3A\u65AD\u7D50\u679C\u30C0\u30C3\u30B7\u30E5\u30DC\u30FC\u30C9 | \u3067\u3070\u304C\u3081\u306E\u307B\u3081\u3071\u3052" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HealthDashboard", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/dev/knackdash-dev/src/components/dashboard/HealthDashboard", "client:component-export": "default" })} ` })}`;
}, "C:/dev/knackdash-dev/src/pages/dashboard/health.astro", void 0);

const $$file = "C:/dev/knackdash-dev/src/pages/dashboard/health.astro";
const $$url = "/debagame-homepage/dashboard/health";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Health,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
