/**
 * Sidebar Component
 * Dynamically generates and manages the sidebar navigation.
 */

(function () {
    // Determine current path depth to adjust relative links
    const path = window.location.pathname;
    // Simple heuristic: count slashes to determine depth relative to root
    // But since we might be on localhost or github pages, it's safer to use absolute paths if possible,
    // OR robust relative paths.
    // Let's assume the script is loaded as <script src=".../js/sidebar.js"></script>
    // We can try to detect the script location, but for links, let's use a configurable base or relative logic.

    // Better approach: Check if we are in a subdirectory.
    // If path ends with /, it's index.html.
    // Count segments after the domain.
    // localhost:3000/index.html -> depth 0
    // localhost:3000/bear/index.html -> depth 1
    // localhost:3000/mokkin/dist/index.html -> depth 2

    // However, the user might be on GitHub Pages: username.github.io/repo/index.html
    // So we should look at relative relation to the 'root' of the site.
    // We can infer the root by looking for the script tag that loaded this file?
    // No, let's just use a simple "up" logic based on known structure or pass a config.
    // Or, we can just use absolute paths if we know the base.
    // But the user had issues with base paths.

    // Let's use a data attribute on the script tag or body to specify "root depth" if needed,
    // or just calculate it.

    function getRelativePath(targetPath) {
        // targetPath should be relative to site root, e.g., 'index.html', 'bear/index.html'
        // We need to convert it to relative from current page.

        // This is tricky without knowing the exact deployment root.
        // Let's try to find the common root.
        // Actually, for a static site, it's often easiest to just hardcode the menu items 
        // with "../" based on the current page's location.

        // Let's define the menu structure with paths relative to the SITE ROOT.
        const menuItems = [
            { type: 'link', label: 'トップページ', icon: 'fas fa-home', href: 'index.html' },
            { type: 'header', label: 'ゲーム' },
            { type: 'link', label: '無限チンチロ', icon: 'fas fa-dice', href: 'endless-chinchirorin/dist/index.html' },
            { type: 'link', label: '木琴シミュレータ', icon: 'fas fa-music', href: 'mokkin/dist/index.html' },
            { type: 'header', label: 'ツール' },
            { type: 'link', label: '服のサイズ検討', icon: 'fas fa-ruler-combined', href: 'size/size.html' },
            { type: 'header', label: 'ダッシュボード' },
            { type: 'link', label: '熊被害状況', icon: 'fas fa-chart-line', href: 'bear/index.html' },
            { type: 'link', label: '健康診断', icon: 'fas fa-heartbeat', href: 'myhealth/index.html' },
            { type: 'header', label: '情報' },
            { type: 'link', label: '世界地図', icon: 'fas fa-globe', href: 'Interactive_worldmap/worldmap.html' },
            { type: 'link', label: 'ナンバープレート', icon: 'fas fa-car-side', href: 'numberplate/numberplate.html' },
            { type: 'link', label: 'AI年表', icon: 'fas fa-brain', href: 'ai-timeline/index.html' },
        ];

        // Determine how many levels up we need to go.
        // We can check the current URL segments.
        // Known structure:
        // /index.html (0)
        // /bear/index.html (1)
        // /endless-chinchirorin/dist/index.html (2)

        // We can try to detect "known" directories in the path.
        const knownDirs = ['bear', 'ai-timeline', 'endless-chinchirorin', 'mokkin', 'size', 'myhealth', 'Interactive_worldmap', 'numberplate', 'dist'];

        const pathSegments = window.location.pathname.split('/').filter(s => s.length > 0);

        // Remove empty strings and potentially the domain if it was included (it's not in pathname).
        // If we are on localhost:3000/index.html, segments = ['index.html']
        // If we are on localhost:3000/bear/index.html, segments = ['bear', 'index.html']

        // But on GitHub Pages: /repo/index.html -> ['repo', 'index.html']
        // /repo/bear/index.html -> ['repo', 'bear', 'index.html']

        // We need a reliable way to find the "root".
        // Let's assume the script is placed in /js/sidebar.js relative to root.
        // We can check the src of the script tag.
        const scripts = document.getElementsByTagName('script');
        let scriptSrc = '';
        for (let i = 0; i < scripts.length; i++) {
            if (scripts[i].src && scripts[i].src.includes('sidebar.js')) {
                scriptSrc = scripts[i].src;
                break;
            }
        }

        // If scriptSrc is "http://localhost:3000/js/sidebar.js", we know the root is "http://localhost:3000/"
        // If scriptSrc is "../js/sidebar.js", we can calculate back.

        // Let's try to calculate the prefix to root.
        let prefix = './';
        if (scriptSrc) {
            try {
                const scriptUrl = new URL(scriptSrc);
                // If absolute URL
                const currentUrl = new URL(window.location.href);

                // If they share the same origin
                if (scriptUrl.origin === currentUrl.origin) {
                    // script path: /js/sidebar.js
                    // current path: /bear/index.html
                    // We want to go from /bear/ to /

                    // Simple hack: if we assume the standard structure, we can just count how many known folders we are deep.
                    // But that's brittle.

                    // Let's try to use the script location as the anchor.
                    // The script is at ROOT/js/sidebar.js
                    // We want to link to ROOT/targetPath

                    // Actually, if we just use the calculated relative path from the script tag's src...
                    // If src is "../js/sidebar.js", then root is "../"
                    // If src is "../../js/sidebar.js", then root is "../../"
                    // If src is "./js/sidebar.js" or "js/sidebar.js", then root is "./"

                    // Let's parse the src attribute literally from the DOM if possible, not the resolved URL.
                    const scriptTag = document.querySelector('script[src*="sidebar.js"]');
                    if (scriptTag) {
                        const rawSrc = scriptTag.getAttribute('src');
                        // e.g. "../js/sidebar.js"
                        const jsIndex = rawSrc.indexOf('js/sidebar.js');
                        if (jsIndex !== -1) {
                            prefix = rawSrc.substring(0, jsIndex); // e.g. "../" or ""
                            if (prefix === '') prefix = './';
                        }
                    }
                }
            } catch (e) {
                console.error("Error calculating path", e);
            }
        }

        return prefix + targetPath;
    }

    const prefix = getRelativePath(''); // Get root prefix

    const sidebarHTML = `
    <nav id="sidebar" class="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white transform -translate-x-full transition-transform duration-300 ease-in-out z-50 shadow-2xl">
        <div class="flex items-center justify-between p-6 border-b border-gray-700">
            <h2 class="text-xl font-bold tracking-wider">MENU</h2>
            <button id="sidebar-close" class="text-gray-400 hover:text-white transition-colors"><i class="fas fa-times text-xl"></i></button>
        </div>
        <div class="p-4">
            <ul class="space-y-2">
                ${generateMenuItems(prefix)}
            </ul>
        </div>
        <div class="absolute bottom-0 left-0 right-0 p-6 bg-gray-900 border-t border-gray-800">
            <div class="text-xs text-gray-500 text-center">
                <p>&copy; 2024 でばがめ</p>
            </div>
        </div>
    </nav>
    <div id="sidebar-overlay" class="fixed inset-0 bg-black bg-opacity-50 z-40 hidden backdrop-blur-sm transition-opacity"></div>
    `;

    function generateMenuItems(rootPrefix) {
        const menuItems = [
            { type: 'link', label: 'トップページ', icon: 'fas fa-home', href: 'index.html' },
            { type: 'header', label: 'ゲーム' },
            { type: 'link', label: '無限チンチロ', icon: 'fas fa-dice', href: 'endless-chinchirorin/dist/index.html' },
            { type: 'link', label: '木琴シミュレータ', icon: 'fas fa-music', href: 'mokkin/dist/index.html' },
            { type: 'header', label: 'ツール' },
            { type: 'link', label: '服のサイズ検討', icon: 'fas fa-ruler-combined', href: 'size/size.html' },
            { type: 'header', label: 'ダッシュボード' },
            { type: 'link', label: '熊被害状況', icon: 'fas fa-chart-line', href: 'bear/index.html' },
            { type: 'link', label: '健康診断', icon: 'fas fa-heartbeat', href: 'myhealth/index.html' },
            { type: 'header', label: '情報' },
            { type: 'link', label: '世界地図', icon: 'fas fa-globe', href: 'Interactive_worldmap/worldmap.html' },
            { type: 'link', label: 'ナンバープレート', icon: 'fas fa-car-side', href: 'numberplate/numberplate.html' },
            { type: 'link', label: 'AI年表', icon: 'fas fa-brain', href: 'ai-timeline/index.html' },
        ];

        return menuItems.map(item => {
            if (item.type === 'header') {
                return `<li class="text-gray-400 text-xs font-bold mt-6 mb-2 px-4 uppercase tracking-wider">${item.label}</li>`;
            } else {
                return `<li><a href="${rootPrefix}${item.href}" class="flex items-center px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors pl-8 group"><i class="${item.icon} mr-3 w-4 text-center text-gray-500 group-hover:text-white transition-colors"></i><span class="text-sm">${item.label}</span></a></li>`;
            }
        }).join('');
    }

    // Inject CSS for sidebar if not present (optional, but good for self-contained)
    // For now, we assume Tailwind and FontAwesome are loaded in the host page.

    // Inject HTML
    // We want to inject it at the beginning of body
    const div = document.createElement('div');
    div.innerHTML = sidebarHTML;
    document.body.insertBefore(div, document.body.firstChild);

    // Add Toggle Button if it doesn't exist? 
    // Usually the page header has the toggle button. 
    // If the page is missing the toggle button, we might want to add a floating one?
    // The user didn't ask for a floating toggle, but for the sidebar to be common.
    // The "Mokkin" page might need a toggle button if it doesn't have one.
    // The Mokkin page has a header in React. We should probably let React handle the toggle button UI 
    // or inject a floating one if needed.
    // Let's check if #sidebar-toggle exists.

    // Logic to handle open/close
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebar-close');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    // We need to delegate the toggle click because it might be in React or static HTML
    document.addEventListener('click', function (e) {
        const toggle = e.target.closest('#sidebar-toggle');
        if (toggle) {
            openSidebar();
        }
    });

    function openSidebar() {
        if (!sidebar || !sidebarOverlay) return;
        sidebar.classList.remove('-translate-x-full');
        sidebarOverlay.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }

    function closeSidebar() {
        if (!sidebar || !sidebarOverlay) return;
        sidebar.classList.add('-translate-x-full');
        sidebarOverlay.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }

    if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeSidebar();
    });

})();
