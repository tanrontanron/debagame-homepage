import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, f as renderScript, r as renderTemplate, d as renderSlot, a as renderComponent, g as renderHead } from './astro/server_CZYxoDnS.mjs';
import 'piccolore';
import 'html-escaper';
import 'clsx';
/* empty css                        */

const baseUrl = "/debagame-homepage";
const contents = [
  {
    title: "AI年表",
    description: "ウィル・スミスと学ぶAIの進化と歴史。タイムライン形式で見ていこうじゃないの",
    category: "info",
    image: `${baseUrl}/images/ai-timeline.png`,
    // Placeholder
    icon: "🍝",
    url: `${baseUrl}/ai-timeline`,
    tags: ["AI", "History", "Timeline"],
    isRecommended: true
  },
  {
    title: "無限チンチロ",
    description: "チンチロを心ゆくまで楽しめるゲーム",
    category: "game",
    image: `${baseUrl}/images/chinchiro.png`,
    // Placeholder
    icon: "🎲",
    url: `${baseUrl}/game/chinchiro`,
    tags: ["Game", "Dice"]
  },
  {
    title: "木琴シミュレータ",
    description: "木琴を演奏できるシミュレータ",
    category: "game",
    image: `${baseUrl}/images/xylophone.png`,
    // Placeholder
    icon: "🎹",
    url: `${baseUrl}/game/xylophone`,
    tags: ["Music", "Simulator"]
  },
  {
    title: "服のサイズ検討",
    description: "日本と海外の表記の差から自分に合う服かを比較検討するツール",
    category: "tool",
    image: `${baseUrl}/images/size-check.png`,
    // Placeholder
    icon: "👕",
    url: `${baseUrl}/tool/size-check`,
    tags: ["Utility", "Shopping"]
  },
  {
    title: "健康診断ダッシュボード",
    description: "健康診断の結果をダッシュボード化",
    category: "dashboard",
    image: `${baseUrl}/images/health-dashboard.png`,
    // Placeholder
    icon: "🏥",
    url: `${baseUrl}/dashboard/health`,
    tags: ["Health", "Data"]
  },
  {
    title: "芸人年表",
    description: "Coming Soon...",
    category: "info",
    image: `${baseUrl}/images/comedian-timeline.png`,
    // Placeholder
    icon: "🎤",
    url: "#",
    tags: ["Entertainment"]
  },
  {
    title: "熊被害状況ダッシュボード",
    description: "熊の目撃・被害状況をダッシュボード化",
    category: "dashboard",
    image: `${baseUrl}/images/prefecture-dashboard.png`,
    // Placeholder
    icon: "🐻",
    url: `${baseUrl}/dashboard/bear`,
    tags: ["Data", "Map"]
  },
  {
    title: "インタラクティブ世界地図",
    description: "世界地図から各国の情報を把握。もっと盛りたい",
    category: "info",
    image: `${baseUrl}/images/world-map.png`,
    // Placeholder
    icon: "🌍",
    url: `${baseUrl}/info/world-map`,
    tags: ["Map", "Interactive"]
  },
  {
    title: "ナンバープレート情報",
    description: "ナンバープレートのルールなんてわかるわけねえじゃん",
    category: "info",
    image: `${baseUrl}/images/number-plate.png`,
    // Placeholder
    icon: "🚗",
    url: `${baseUrl}/info/number-plate`,
    tags: ["Utility", "Car"]
  }
];

const $$Astro$4 = createAstro("https://tanrontanron.github.io");
const $$Sidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Sidebar;
  return renderTemplate`${maybeRenderHead()}<aside id="sidebar" class="fixed top-0 left-0 z-50 w-64 h-screen transition-transform -translate-x-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow-lg" aria-label="Sidebar"> <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800"> <div class="flex justify-between items-center mb-6 px-2"> <h2 class="text-xl font-bold text-gray-800 dark:text-white">Menu</h2> <button id="close-sidebar" class="text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2"> <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path> </svg> <span class="sr-only">Close menu</span> </button> </div> <ul class="space-y-2 font-medium"> <li> <a${addAttribute("/debagame-homepage", "href")} class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group transition-colors"> <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21"> <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"></path> <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"></path> </svg> <span class="ms-3">トップページ</span> </a> </li> <li class="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700"> <div class="px-2 text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">Contents</div> </li> ${contents.map((content) => renderTemplate`<li> <a${addAttribute(content.url, "href")} class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group transition-colors"> <span class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white flex items-center justify-center"> ${content.category === "game" ? "🎮" : content.category === "tool" ? "🛠️" : content.category === "dashboard" ? "📊" : "ℹ️"} </span> <span class="ms-3">${content.title}</span> </a> </li>`)} </ul> </div> </aside> <div id="sidebar-overlay" class="fixed inset-0 bg-gray-900/50 z-40 hidden backdrop-blur-sm transition-opacity" aria-hidden="true"></div> ${renderScript($$result, "C:/dev/knackdash-dev/src/components/Sidebar.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/dev/knackdash-dev/src/components/Sidebar.astro", void 0);

const $$Astro$3 = createAstro("https://tanrontanron.github.io");
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "C:/dev/knackdash-dev/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/dev/knackdash-dev/node_modules/astro/components/ClientRouter.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$2 = createAstro("https://tanrontanron.github.io");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="ja" class="scroll-smooth"> <head><meta charset="UTF-8"><meta name="description" content="\u3067\u3070\u304C\u3081\u306E\u30DD\u30FC\u30C8\u30D5\u30A9\u30EA\u30AA\u30B5\u30A4\u30C8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', "><title>", "</title>", `<!-- Google tag (gtag.js) --><script async src="https://www.googletagmanager.com/gtag/js?id=G-ZDEY5ZH97E"><\/script><script>
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());

			// Initial tracking is handled by astro:page-load to support View Transitions
			document.addEventListener('astro:page-load', () => {
				gtag('config', 'G-ZDEY5ZH97E', {
					page_path: window.location.pathname,
				});
			});
		<\/script>`, '</head> <body class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col font-sans"> ', " ", " </body></html>"])), addAttribute(Astro2.generator, "content"), title, renderComponent($$result, "ClientRouter", $$ClientRouter, {}), renderHead(), renderComponent($$result, "Sidebar", $$Sidebar, {}), renderSlot($$result, $$slots["default"]));
}, "C:/dev/knackdash-dev/src/layouts/Layout.astro", void 0);

const $$Astro$1 = createAstro("https://tanrontanron.github.io");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Header;
  const { showBack = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<header class="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50"> <div class="container mx-auto px-4 h-16 flex items-center justify-between"> <div class="flex items-center gap-2"> ${showBack ? renderTemplate`<a${addAttribute("/debagame-homepage", "href")} class="p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" aria-label="トップページに戻る"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg> </a>` : renderTemplate`<div class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
&lt;/&gt;
</div>`} <h1 class="font-bold text-xl tracking-tight"> <a${addAttribute("/debagame-homepage", "href")} class="hover:text-blue-600 transition-colors">でばがめのほめぱげ</a> </h1> </div> <button class="sidebar-toggle p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="メニューを開く"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg> </button> </div> </header>`;
}, "C:/dev/knackdash-dev/src/components/Header.astro", void 0);

const $$Astro = createAstro("https://tanrontanron.github.io");
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Footer;
  const { class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<footer${addAttribute(["bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12", className], "class:list")}> <div class="container mx-auto px-4 py-12"> <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto"> <div class="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">  <div class="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500"> <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> </div> </div> <div class="flex-1 text-center md:text-left space-y-2"> <h3 class="font-bold text-lg">About this site</h3> <p class="text-blue-600 font-medium">Author : でばがめ</p> <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
おう、でばがめだよ。<br>
フルネームは出歯島亀之助でやってますが覚えなくていいです。<br>
気になったことや学んだことをAIを使ってウェブページとして形にし、この場所に保管しています。<br>
思いの外デザインが好きかもしれない。<br>
このページのアクセスが増えてお金もらえたら最高～～
</p> <div class="flex gap-4 justify-center md:justify-start pt-2"> <a href="#" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"> <span class="sr-only">GitHub</span> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg> </a> <a href="#" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"> <span class="sr-only">Twitter</span> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg> </a> </div> </div> </div> <div class="text-center text-xs text-gray-400 mt-12">
&copy; 2025 でばがめ
</div> </div> </footer>`;
}, "C:/dev/knackdash-dev/src/components/Footer.astro", void 0);

export { $$Layout as $, $$Header as a, $$Footer as b, contents as c };
