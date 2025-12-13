/* empty css                                    */
import { c as createComponent, a as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CZYxoDnS.mjs';
import 'piccolore';
import 'html-escaper';
import { $ as $$ContentLayout } from '../../chunks/ContentLayout_Dyy8z7X0.mjs';
/* empty css                                        */
export { renderers } from '../../renderers.mjs';

const $$Chinchiro = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "ContentLayout", $$ContentLayout, { "title": "\u7121\u9650\u30C1\u30F3\u30C1\u30ED | \u3067\u3070\u304C\u3081\u306E\u307B\u3081\u3071\u3052" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex justify-center"> ${renderComponent($$result2, "Game", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/dev/knackdash-dev/src/components/game/chinchiro/Game", "client:component-export": "default" })} </div> ` })} `;
}, "C:/dev/knackdash-dev/src/pages/game/chinchiro.astro", void 0);

const $$file = "C:/dev/knackdash-dev/src/pages/game/chinchiro.astro";
const $$url = "/debagame-homepage/game/chinchiro";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Chinchiro,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
