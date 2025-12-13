/* empty css                                    */
import { c as createComponent, a as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CZYxoDnS.mjs';
import 'piccolore';
import 'html-escaper';
import { $ as $$Layout, a as $$Header, b as $$Footer } from '../../chunks/Footer_COdvifAy.mjs';
export { renderers } from '../../renderers.mjs';

const $$Xylophone = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "\u6728\u7434\u30B7\u30DF\u30E5\u30EC\u30FC\u30BF | \u3067\u3070\u304C\u3081\u306E\u307B\u3081\u3071\u3052" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "showBack": true })} ${maybeRenderHead()}<main class="flex-1 w-full bg-stone-100 flex flex-col relative" style="height: calc(100dvh - 64px);"> ${renderComponent($$result2, "Game", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/dev/knackdash-dev/src/components/game/xylophone/Game", "client:component-export": "default" })} </main> ${renderComponent($$result2, "Footer", $$Footer, { "class": "!bg-white" })} ` })}`;
}, "C:/dev/knackdash-dev/src/pages/game/xylophone.astro", void 0);

const $$file = "C:/dev/knackdash-dev/src/pages/game/xylophone.astro";
const $$url = "/debagame-homepage/game/xylophone";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Xylophone,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
