document.addEventListener("DOMContentLoaded", () => {
    
  
    const profileSelect = document.getElementById("profile");
    const googleBtn = document.getElementById("google-login-btn");
    const divider = document.getElementById("login-divider");

    
    function toggleGoogleButton() {
        
        if (profileSelect && googleBtn && divider) {
            
            const selectedProfile = profileSelect.value;

            if (selectedProfile === "paciente") {
                
                googleBtn.style.display = "flex"; 
                divider.style.display = "flex";
            } else {
              
                googleBtn.style.display = "none";
                divider.style.display = "none";
            }
        }
    }

    
    toggleGoogleButton();

    
    if (profileSelect) {
        profileSelect.addEventListener("change", toggleGoogleButton);
    }


  
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault(); 

            const username = document.getElementById("username").value;
            const profile = document.getElementById("profile").value;

            if (!username) {
                alert("Por favor, insira seu usuário.");
                return;
            }

            
            switch (profile) {
                case "paciente":
                    window.location.href = "paciente/dashboard-paciente.html"; 
                    break;
                case "profissional":
                    window.location.href = "profissional/agenda.html";
                    break;
                case "admin":
                    
                    window.location.href = "administrador/admin.html"; 
                    break;
                default:
                    alert("Perfil inválido.");
            }
        });
    }

   

    const registerForm = document.getElementById("register-form");

    if (registerForm) {
        registerForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const password = document.getElementById("reg-password").value;
            const confirmPassword = document.getElementById("confirm-password").value;
            
            if (password !== confirmPassword) {
                alert("As senhas não coincidem.");
                return;
            }

            alert("Cadastro realizado com sucesso! Faça login.");
            window.location.href = "index.html";
        });
    }
});