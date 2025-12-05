document.addEventListener("DOMContentLoaded", () => {
    
    
    // 1. LÓGICA DO DASHBOARD (KPIs e Simulação de dados)
    
    

    const kpiLeitos = document.getElementById("kpi-leitos");
    
    if (kpiLeitos) {
        function loadKpiData() {
            // Simula delay de rede
            setTimeout(() => {
                if(document.getElementById("kpi-leitos")) 
                    document.getElementById("kpi-leitos").textContent = "85.3%";
                
                if(document.getElementById("kpi-atendimentos")) 
                    document.getElementById("kpi-atendimentos").textContent = "1.142";
                
                if(document.getElementById("kpi-faturamento")) 
                    document.getElementById("kpi-faturamento").textContent = "R$ 4.8M";
                
                if(document.getElementById("kpi-pacientes")) 
                    document.getElementById("kpi-pacientes").textContent = "+215";
            }, 500);
        }
        loadKpiData();
    }


    // 2. LÓGICA DE CADASTRO (Novo Profissional)
    

    const registerForm = document.getElementById("register-form");

    if (registerForm) {
        registerForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const nameInput = document.getElementById("name");
            const roleSelect = document.getElementById("role");
            
            const name = nameInput.value;
            const role = roleSelect.options[roleSelect.selectedIndex].text;

            alert(`Sucesso!\n\nO profissional ${name} foi cadastrado como ${role}.\nAs credenciais foram enviadas por e-mail.`);
            
            // Redireciona para o dashboard (ajuste o nome do arquivo se for admin.html ou dashboard.html)
            window.location.href = "admin.html"; 
        });
    }
});