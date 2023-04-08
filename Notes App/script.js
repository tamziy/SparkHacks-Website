const addBtn = document.querySelector(".add");

const notes = JSON.parse(localStorage.getItem('notes'));

const h1 = document.getElementById("h1")

let colored_letters = "";

for (let i = 0; i < h1.textContent.length; i++) {
    if (i % 2 === 0) {
        colored_letters += "<span class = 'red'>" + h1.textContent.charAt(i)
    }
    else {
        colored_letters += "<span class = 'blue'>" + h1.textContent.charAt(i)
    }
}

h1.innerHTML = colored_letters

if (notes) {
    notes.forEach(note => {
        addNewNote(note)
    })
}

addBtn.addEventListener("click", () => {
    addNewNote();
});

function addNewNote(text = '') { 
    const note = document.createElement("div");
    note.classList.add("note");

    note.innerHTML = `
        <div class="tools">
            <button class = "edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
            <button class = "like"><i class = "fas fa-heart"></i></button>
        </div>
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class = "${text ? "hidden" : ""}"></textarea>
    `;

    const editBtn = note.querySelector(".edit");
    const deleteBtn = note.querySelector(".delete");

    const main = note.querySelector(".main");
    const textArea = note.querySelector("textarea");

    textArea.value = text;
    main.innerHTML = marked.parse(text);


    editBtn.addEventListener("click", () => {
        main.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    });

    deleteBtn.addEventListener("click", () => {
        note.remove();

        updateLocalStorage();
    });

    textArea.addEventListener("input", (e) => {
        const { value } = e.target;

        main.innerHTML = marked.parse(value);

        updateLocalStorage();
    })

    const likeBtn = note.querySelector(".like");
    let isLiked = false;

    likeBtn.addEventListener("click", () => {
        isLiked = !isLiked;
        likeBtn.classList.toggle("liked");
        updateLocalStorage()
    })

    document.body.appendChild(note);
    
};

function updateLocalStorage() {
    const notesText = document.querySelectorAll("textarea");

    const notes = [];

    notesText.forEach(note => {
        notes.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}
