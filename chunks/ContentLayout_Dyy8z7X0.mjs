import { b as createAstro, c as createComponent, a as renderComponent, r as renderTemplate, m as maybeRenderHead, d as renderSlot } from './astro/server_CZYxoDnS.mjs';
import 'piccolore';
import 'html-escaper';
import { $ as $$Layout, a as $$Header, b as $$Footer } from './Footer_COdvifAy.mjs';

const $$Astro = createAstro("https://tanrontanron.github.io");
const $$ContentLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ContentLayout;
  const { title } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "showBack": true })} ${maybeRenderHead()}<main class="flex-1 container mx-auto px-4 py-8"> ${renderSlot($$result2, $$slots["default"])} </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "C:/dev/knackdash-dev/src/layouts/ContentLayout.astro", void 0);

export { $$ContentLayout as $ };
