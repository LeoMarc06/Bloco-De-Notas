const noteText = document.getElementById("noteText");
const saveNote = document.getElementById("saveNote");
const notesList = document.getElementById("notesList");
const noteTitle = document.getElementById("noteTitle");

function loadNotes() {
    notesContainer.innerHTML = "";
    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.forEach((noteObj, index) => {
        const noteDiv = document.createElement("div");
        noteDiv.className = "note";

        const titleEl = document.createElement("h3");
        titleEl.textContent = noteObj.title;

        const textEl = document.createElement("p");
        textEl.textContent = noteObj.text;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Editar";
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Excluir";

        editBtn.onclick = () => {
            noteDiv.innerHTML = "";

            const titleInput = document.createElement("input");
            titleInput.type = "text";
            titleInput.value = noteObj.title;
            titleInput.className = "noteTitleInput";

            const textArea = document.createElement("textarea");
            textArea.value = noteObj.text;
            textArea.className = "noteTextArea";

            const saveBtn = document.createElement("button");
            saveBtn.textContent = "Salvar";
            saveBtn.onclick = () => {
                const newTitle = titleInput.value.trim();
                const newText = textArea.value.trim();
                if (newTitle !== "" && newText !== "") {
                    noteObj.title = newTitle;
                    noteObj.text = newText;
                    localStorage.setItem("notes", JSON.stringify(notes));
                    loadNotes();
                } else {
                    alert("Título e conteúdo não podem ficar vazios!");
                }
            };

            deleteBtn.onclick = () => {
                notes.splice(index, 1);
                localStorage.setItem("notes", JSON.stringify(notes));
                loadNotes();
            };

            noteDiv.appendChild(titleInput);
            noteDiv.appendChild(textArea);
            noteDiv.appendChild(saveBtn);
            noteDiv.appendChild(deleteBtn);
        };

        noteDiv.appendChild(titleEl);
        noteDiv.appendChild(textEl);
        noteDiv.appendChild(editBtn);
        noteDiv.appendChild(deleteBtn);

        notesContainer.appendChild(noteDiv);
    });
}

saveNote.addEventListener("click", () => {
    const title = noteTitle.value.trim();
    const text = noteText.value.trim();

    if (title === "" || text === "") {
        alert("Digite um título e um conteúdo!");
        return;
    }

    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push({ title, text });
    localStorage.setItem("notes", JSON.stringify(notes));

    noteTitle.value = "";
    noteText.value = "";
    loadNotes();
});

loadNotes();
