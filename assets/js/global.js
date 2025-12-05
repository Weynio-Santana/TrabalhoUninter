// assets/js/global.js

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Lógica do Menu Mobile (Sidebar) ---
    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");

    // Verifica se os elementos existem na página antes de tentar usar
    if (menuToggle && sidebar) {
        menuToggle.addEventListener("click", () => {
            sidebar.classList.toggle("visible");
        });
    }

    // --- 2. Lógica de Logout (Opcional, mas útil) ---
    const logoutBtn = document.getElementById("logout-button");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            
             e.preventDefault();
             if(confirm("Deseja realmente sair?")) {
                window.location.href = logoutBtn.href;
             }
        });
    }
});