document.addEventListener('DOMContentLoaded', function() {
    const placeholder = document.createElement('div');
    placeholder.id = 'sidebar-container';
    document.body.prepend(placeholder);

    fetch('/components/sidebar.html')
        .then(response => response.text())
        .then(html => {
            placeholder.innerHTML = html;

            // --- Sidebar Logic ---
            const sidebar = document.getElementById('sidebar');
            const sidebarToggle = document.getElementById('sidebar-toggle');
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

            if (sidebarToggle) sidebarToggle.addEventListener('click', openSidebar);
            if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
            if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);
            
            document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSidebar(); });

            // --- Active Page Highlight Logic ---
            try {
                const currentPath = window.location.pathname;
                sidebar.querySelectorAll('a').forEach(link => {
                    const linkPath = new URL(link.href).pathname;
                    if (currentPath === linkPath) {
                        link.classList.add('bg-blue-600', 'text-white');
                        link.classList.remove('hover:bg-gray-700');
                    }
                });
            } catch (e) {
                console.error("Error highlighting current page:", e);
            }
        })
        .catch(error => {
            console.error('Error fetching sidebar:', error);
            placeholder.innerHTML = '<p>Error loading sidebar.</p>';
        });
});