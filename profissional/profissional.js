document.addEventListener("DOMContentLoaded", () => {
    
    

    const patientListItems = document.querySelectorAll(".patient-item");
    
    
    if (patientListItems.length > 0) {
        const quickRecordContent = document.getElementById("quick-record-content");
        const quickRecordEmpty = document.getElementById("quick-record-empty");

     
        const patientData = {
            p1: { nome: "Carlos Silva", id: "P001", idade: 52, tipo: "Retorno (Presencial)", historico: "Pós-cirurgia bariátrica." },
            p2: { nome: "Mariana Almeida", id: "P002", idade: 34, tipo: "Primeira Consulta (Telemedicina)", historico: "Cefaleia persistente." },
            p3: { nome: "Jorge Nunes", id: "P003", idade: 45, tipo: "Exame (Presencial)", historico: "Eletrocardiograma." },
            p4: { nome: "Ana Beatriz Costa", id: "P004", idade: 29, tipo: "Retorno (Presencial)", historico: "Ansiedade controlada." }
        };

        patientListItems.forEach(item => {
            item.addEventListener("click", () => {
                patientListItems.forEach(i => i.classList.remove("active"));
                item.classList.add("active");
                
                const patientId = item.dataset.patientId;
                const data = patientData[patientId];

                if (data && quickRecordContent) {
                    quickRecordContent.innerHTML = `
                        <h3>${data.nome}</h3>
                        <p><strong>ID:</strong> ${data.id} | <strong>Idade:</strong> ${data.idade}</p>
                        <p><strong>Tipo:</strong> ${data.tipo}</p>
                        <div class="record-section"><h4>Histórico Rápido</h4><p>${data.historico}</p></div>
                        <div class="record-actions">
                            <a href="prontuario.html?id=${data.id}" class="btn btn-primary">Abrir Prontuário</a>
                            <a href="prescricao.html?id=${data.id}" class="btn btn-secondary">Prescrição</a>
                        </div>
                    `;
                    quickRecordContent.style.display = "block";
                    if (quickRecordEmpty) quickRecordEmpty.style.display = "none";
                }
            });
        });
    }


    const evolutionForm = document.getElementById("evolution-form");
    
    if (evolutionForm) {
        const timeline = document.getElementById("history-timeline");
        
        evolutionForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const notes = document.getElementById("evolution-notes").value;
            const cid = document.getElementById("cid").value;
            
            if (notes.trim() === "") {
                alert("Preencha as anotações.");
                return;
            }
            
            const now = new Date();
            const timestamp = `${now.toLocaleDateString()} - ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
            
            const newTimelineItem = document.createElement("li");
            newTimelineItem.classList.add("timeline-item");
            newTimelineItem.innerHTML = `
                <span class="timeline-date">${timestamp}</span>
                <strong>Consulta Atual (Salva)</strong>
                <p>${notes}</p>
                ${cid ? `<p><strong>CID:</strong> ${cid}</p>` : ''}
            `;
            
            if (timeline) timeline.prepend(newTimelineItem);
            
            document.getElementById("evolution-notes").value = "";
            document.getElementById("cid").value = "";
            alert("Evolução salva!");
        });
    }


   

    const prescriptionForm = document.getElementById("prescription-form");

    if (prescriptionForm) {
        const prescriptionList = document.getElementById("prescription-list");
        const finalizeButton = document.getElementById("btn-finalize"); // Alterado para ID

        prescriptionForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const name = document.getElementById("drug-name").value;
            const dosage = document.getElementById("drug-dosage").value;
            const emptyMsg = document.getElementById("empty-list-msg");

            if (emptyMsg) emptyMsg.style.display = "none";

            const li = document.createElement("li");
            li.classList.add("prescription-item");
            li.innerHTML = `<strong>${name}</strong><p>${dosage}</p>`;
            
            if (prescriptionList) prescriptionList.appendChild(li);
            
            document.getElementById("drug-name").value = "";
            document.getElementById("drug-dosage").value = "";
        });

        if (finalizeButton) {
            finalizeButton.addEventListener("click", () => {
                if (prescriptionList && prescriptionList.children.length <= 1) {
                    alert("Adicione medicamentos primeiro.");
                    return;
                }
                alert("Receita finalizada!");
                window.location.href = "agenda.html";
            });
        }
    }
});