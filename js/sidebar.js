/**
 * Sidebar Component
 * Dynamically generates and manages the sidebar navigation.
 */

(function () {
    function initSidebar() {
        // Determine current path depth to adjust relative links
        function getRelativePath(targetPath) {
            let prefix = './';
            const scriptTag = document.querySelector('script[src*="sidebar.js"]');
            if (scriptTag) {
                const rawSrc = scriptTag.getAttribute('src');
                const jsIndex = rawSrc.indexOf('js/sidebar.js');
                if (jsIndex !== -1) {
                    prefix = rawSrc.substring(0, jsIndex);
                    if (prefix === '') prefix = './';
                }
            }
            return prefix + targetPath;
        }

        const prefix = getRelativePath('');

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

        // Inject HTML
        if (!document.getElementById('sidebar')) {
            const div = document.createElement('div');
            div.innerHTML = sidebarHTML;
            document.body.insertBefore(div, document.body.firstChild);
        }

        // Logic to handle open/close
        const sidebar = document.getElementById('sidebar');
        const sidebarClose = document.getElementById('sidebar-close');
        const sidebarOverlay = document.getElementById('sidebar-overlay');

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

        // Event Delegation for Toggle Button
        document.addEventListener('click', function (e) {
            const toggle = e.target.closest('#sidebar-toggle');
            if (toggle) {
                openSidebar();
            }
        });

        if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
        if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeSidebar();
        });

        // Expose openSidebar globally just in case
        window.openSidebar = openSidebar;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSidebar);
    } else {
        initSidebar();
    }

})();
