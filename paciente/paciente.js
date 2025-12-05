document.addEventListener("DOMContentLoaded", () => {
    

    
    const appointmentList = document.getElementById("appointment-list");


    if (appointmentList) {
        const savedData = localStorage.getItem("novaConsulta");
        
        if (savedData) {
            const consulta = JSON.parse(savedData);
            
          
            const novoItem = document.createElement("li");
            novoItem.classList.add("appointment-item");

            novoItem.style.borderLeft = "4px solid #28a745"; 
            
            novoItem.innerHTML = `
                <div class="appointment-details">
                    <span class="appointment-date">${consulta.data} - ${consulta.hora}</span>
                    <strong>${consulta.especialidade} - ${consulta.medico}</strong>
                    <span>Local: ${consulta.local}</span>
                </div>
                <button class="btn btn-danger btn-cancel">Cancelar</button>
            `;
            
           
            appointmentList.prepend(novoItem);
        }
    }

  
    if (appointmentList) {
        appointmentList.addEventListener("click", (event) => {
            // Verifica se clicou num botão de cancelar
            if (event.target.classList.contains("btn-cancel")) {
                const confirmed = confirm("Tem certeza que deseja cancelar esta consulta?");
                
                if (confirmed) {
                    const item = event.target.closest(".appointment-item");
                    
                    
                    if (item.style.borderLeft.includes("28a745")) { // Cor verde
                         localStorage.removeItem("novaConsulta");
                    }

                    item.remove();
                    alert("Consulta cancelada com sucesso.");
                    checkIfAppointmentsEmpty();
                }
            }
        });
    }

    function checkIfAppointmentsEmpty() {
        if (appointmentList) {
            const remainingItems = appointmentList.querySelectorAll(".appointment-item");
            const emptyMessage = appointmentList.querySelector(".appointment-item-empty");
            
            if (remainingItems.length === 0) {
                if (emptyMessage) emptyMessage.style.display = "block";
            } else {
                if (emptyMessage) emptyMessage.style.display = "none";
            }
        }
    }
    
    checkIfAppointmentsEmpty();


    const scheduleForm = document.getElementById("schedule-form");

    if (scheduleForm) {
        const steps = document.querySelectorAll(".step-content");
        
        const setupNavButton = (id, stepIndex) => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener("click", () => {
                    steps.forEach((step, index) => {
                        if (index === stepIndex) step.classList.add("active-step");
                        else step.classList.remove("active-step");
                    });
                });
            }
        };

        setupNavButton("btn-next-1", 1);
        setupNavButton("btn-prev-2", 0);
        setupNavButton("btn-next-2", 2);
        setupNavButton("btn-prev-3", 1);
        setupNavButton("btn-next-3", 3); 
        setupNavButton("btn-prev-4", 2);

        
        const btnGoToConfirmation = document.getElementById("btn-next-3");
        
      
        let finalData = {};

        if (btnGoToConfirmation) {
            btnGoToConfirmation.addEventListener("click", () => {
                const specialtySelect = document.getElementById("specialty");
                const doctorSelect = document.getElementById("doctor");
                const locationSelect = document.getElementById("location");
                const dateInput = document.getElementById("date");
                const selectedTimeSlot = document.querySelector(".time-slot.selected");

                const specialtyText = specialtySelect.options[specialtySelect.selectedIndex]?.text || "Não informado";
                const doctorText = doctorSelect.options[doctorSelect.selectedIndex]?.text || "Não informado";
                const locationText = locationSelect.options[locationSelect.selectedIndex]?.text || "Não informado";
                
                let dateText = dateInput.value;
                if (dateText) {
                    const parts = dateText.split("-");
                    dateText = `${parts[2]}/${parts[1]}/${parts[0]}`; 
                } else {
                    dateText = "--/--/----";
                }

                const timeText = selectedTimeSlot ? selectedTimeSlot.innerText : "--:--";

                
                finalData = {
                    especialidade: specialtyText,
                    medico: doctorText,
                    local: locationText,
                    data: dateText,
                    hora: timeText
                };

                const summaryList = document.querySelector(".confirmation-summary");
                if (summaryList) {
                    summaryList.innerHTML = `
                        <li><strong>Especialidade:</strong> ${specialtyText}</li>
                        <li><strong>Profissional:</strong> ${doctorText}</li>
                        <li><strong>Local:</strong> ${locationText}</li>
                        <li><strong>Data e Hora:</strong> ${dateText} às ${timeText}</li>
                    `;
                }
            });
        }

      
        const timeSlots = document.querySelectorAll(".time-slot");
        timeSlots.forEach(slot => {
            slot.addEventListener("click", () => {
                timeSlots.forEach(s => s.classList.remove("selected"));
                slot.classList.add("selected");
            });
        });

        scheduleForm.addEventListener("submit", (event) => {
            event.preventDefault();
            
           
            localStorage.setItem("novaConsulta", JSON.stringify(finalData));

            alert("Consulta agendada com sucesso!");
            window.location.href = "dashboard-paciente.html";
        });
    }



    const btnMute = document.getElementById("btn-mute");
    
    if (btnMute) {
        // ... (Mesmo código de antes para a teleconsulta) ...
        const btnVideo = document.getElementById("btn-video");
        const btnHangup = document.getElementById("btn-hangup");
        const callStatus = document.getElementById("call-status");
        
        let isMuted = false;
        let isVideoOn = true;

        setTimeout(() => { if (callStatus) callStatus.textContent = "Conectado | 00:01"; }, 1500);

        btnMute.addEventListener("click", () => {
            isMuted = !isMuted;
            if (isMuted) {
                btnMute.classList.add("active");
                btnMute.querySelector("span").textContent = "Ativar Som";
            } else {
                btnMute.classList.remove("active");
                btnMute.querySelector("span").textContent = "Microfone";
            }
        });

        if (btnVideo) {
            btnVideo.addEventListener("click", () => {
                isVideoOn = !isVideoOn;
                if (!isVideoOn) {
                    btnVideo.classList.add("active");
                    btnVideo.querySelector("span").textContent = "Ligar Câmera";
                } else {
                    btnVideo.classList.remove("active");
                    btnVideo.querySelector("span").textContent = "Câmera";
                }
            });
        }

        if (btnHangup) {
            btnHangup.addEventListener("click", () => {
                if (confirm("Tem certeza que deseja encerrar a consulta?")) {
                    alert("Consulta encerrada.");
                    window.location.href = "dashboard-paciente.html";
                }
            });
        }
    }
    // ===========================================================
    // 4. LÓGICA DO PERFIL (Salvar dados)
    // ===========================================================

    const profileForm = document.getElementById("profile-form");

    if (profileForm) {
        profileForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Impede a página de recarregar

            
            const nome = document.getElementById("p-name").value;
            const email = document.getElementById("p-email").value;

            
            const btn = profileForm.querySelector("button[type='submit']");
            const originalText = btn.innerText;
            btn.innerText = "Salvando...";
            btn.disabled = true;

            setTimeout(() => {
                alert(`Dados atualizados com sucesso!\n\nNome: ${nome}\nE-mail: ${email}`);
                btn.innerText = originalText;
                btn.disabled = false;
            }, 800);
        });
    }
});