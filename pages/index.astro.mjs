/* empty css                                 */
import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, r as renderTemplate, a as renderComponent, f as renderScript } from '../chunks/astro/server_CZYxoDnS.mjs';
import 'piccolore';
import 'html-escaper';
import { c as contents, $ as $$Layout, a as $$Header, b as $$Footer } from '../chunks/Footer_COdvifAy.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://tanrontanron.github.io");
const $$Card = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Card;
  const { content } = Astro2.props;
  const categoryColors = {
    game: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    tool: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    dashboard: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
  };
  const categoryLabels = {
    game: "\u30B2\u30FC\u30E0",
    tool: "\u30C4\u30FC\u30EB",
    dashboard: "\u30C0\u30C3\u30B7\u30E5\u30DC\u30FC\u30C9",
    info: "\u60C5\u5831"
  };
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(content.url, "href")} class="block group h-full"> <article class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col border border-gray-100 dark:border-gray-700"> <div class="aspect-video w-full bg-gray-200 dark:bg-gray-700 relative overflow-hidden">  <div class="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500"> ${content.icon ? renderTemplate`<span class="text-6xl select-none filter drop-shadow-sm">${content.icon}</span>` : content.image ? renderTemplate`<img${addAttribute(content.image, "src")}${addAttribute(content.title, "alt")} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">` : renderTemplate`<span>No Image</span>`} </div> </div> <div class="p-4 flex-1 flex flex-col"> <div class="flex justify-between items-start mb-2"> <h3 class="font-bold text-lg text-gray-900 dark:text-white group-hover:text-cyan-500 transition-colors line-clamp-1"> ${content.title} </h3> <span${addAttribute(`text-xs px-2 py-1 rounded-full font-medium ${categoryColors[content.category]}`, "class")}> ${categoryLabels[content.category]} </span> </div> <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2"> ${content.description} </p> </div> </article> </a>`;
}, "C:/dev/knackdash-dev/src/components/Card.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const recommendedContent = contents.find((c) => c.isRecommended) || contents[0];
  const tabs = [
    { id: "all", label: "\u3059\u3079\u3066", active: true },
    { id: "game", label: "\u30B2\u30FC\u30E0", active: false },
    { id: "tool", label: "\u30C4\u30FC\u30EB", active: false },
    { id: "dashboard", label: "\u30C0\u30C3\u30B7\u30E5\u30DC\u30FC\u30C9", active: false },
    { id: "info", label: "\u60C5\u5831", active: false }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "\u3067\u3070\u304C\u3081\u306E\u307B\u3081\u3071\u3052" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main class="flex-1 container mx-auto px-4 py-8 space-y-12">  <section> <div class="relative w-full h-[33vh] min-h-[250px] md:min-h-[300px] rounded-2xl overflow-hidden shadow-xl group">  <div class="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-800 z-0"></div>  <div class="absolute -right-4 -bottom-12 md:right-10 md:-bottom-10 opacity-20 md:opacity-30 transform rotate-12 scale-150 md:scale-100 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6 select-none pointer-events-none z-0"> <span class="text-[10rem] md:text-[16rem] leading-none">🍝</span> </div>  <div class="absolute inset-0 z-10 flex flex-col justify-center p-4 md:p-12"> <div class="max-w-2xl space-y-2 md:space-y-4"> <div class="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm font-bold text-white mb-1 md:mb-2 border border-white/30">
おすすめコンテンツ
</div> <h2 class="text-2xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-md"> ${recommendedContent.title} </h2> <p class="text-blue-100 text-sm md:text-xl max-w-lg line-clamp-2 md:line-clamp-none drop-shadow-sm"> ${recommendedContent.description} </p> <div class="pt-2 md:pt-4"> <a${addAttribute(recommendedContent.url, "href")} class="inline-flex items-center gap-2 bg-white text-blue-700 px-5 py-2 md:px-6 md:py-3 rounded-full font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm md:text-base"> <span>詳しく見る</span> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path> </svg> </a> </div> </div> </div>  <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20"> <div class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white"></div> <div class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/50"></div> <div class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/50"></div> </div> </div> </section>  <section> <div class="flex flex-wrap gap-2"> ${tabs.map((tab) => renderTemplate`<button${addAttribute(`filter-btn px-4 py-2 rounded-full text-sm font-medium transition-colors ${tab.active ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`, "class")}${addAttribute(tab.id, "data-category")}> ${tab.label} </button>`)} </div> </section>  <section class="space-y-8 min-h-[50vh]"> ${["game", "tool", "dashboard", "info"].map((category) => {
    const categoryContents = contents.filter((c) => c.category === category);
    if (categoryContents.length === 0) return null;
    const categoryLabel = tabs.find((t) => t.id === category)?.label;
    const icon = category === "game" ? "\u{1F3AE}" : category === "tool" ? "\u{1F6E0}\uFE0F" : category === "dashboard" ? "\u{1F4CA}" : "\u2139\uFE0F";
    return renderTemplate`<div class="content-section space-y-4"${addAttribute(category, "data-category")}> <h3 class="text-xl font-bold flex items-center gap-2 text-gray-800 dark:text-gray-200"> <span>${icon}</span> ${categoryLabel} </h3> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${categoryContents.map((content) => renderTemplate`${renderComponent($$result2, "Card", $$Card, { "content": content })}`)} </div> </div>`;
  })} </section> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })} ${renderScript($$result, "C:/dev/knackdash-dev/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/dev/knackdash-dev/src/pages/index.astro", void 0);

const $$file = "C:/dev/knackdash-dev/src/pages/index.astro";
const $$url = "/debagame-homepage";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
