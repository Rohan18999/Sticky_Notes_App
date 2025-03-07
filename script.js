let btn = document.getElementById('add-note');
let notesContainer = document.getElementById('notes-container');
const notesList = JSON.parse(localStorage.getItem("note")) || [];

window.addEventListener("load", () =>{
    notesList.forEach(text => {
        let noteElement = createNoteElement(text)
        notesContainer.appendChild(noteElement)
    })
})

btn.addEventListener("click" , () =>{
    pushNotes("")
})

function saveContent(){
    const notesText = Array.from(document.querySelectorAll("textarea")).map(textarea => textarea.value);
    localStorage.setItem("note", JSON.stringify(notesText));
}

function pushNotes(text){
    let noteElement = createNoteElement(text);
    notesContainer.appendChild(noteElement);
    notesList.push(text) // store only the text 
    console.log(notesList)
    saveContent();

}
function createNoteElement(text = ""){
    let divNote = document.createElement("div");
    divNote.classList.add('div-note')

    let textArea = document.createElement("textarea")
    textArea.classList.add('text-area')
    //textArea.placeholder = "Write your note here..."
    textArea.value = text // store stored text

    textArea.addEventListener("input",saveContent) // Save when text changes

    let deleteButton = document.createElement("button")
    deleteButton.classList.add('delete-button')
    deleteButton.textContent = "X"
    deleteButton.addEventListener("click", () => {

        // deleting the entire Note / divNote
        divNote.remove()

        // removing from notesList as well
        const index = notesList.indexOf(divNote);
        if (index!=-1){
            notesList.splice(index,1);
        }
        // consoling again after deletion
        console.log(notesList);
        saveContent();
    })

    divNote.appendChild(textArea)
    divNote.appendChild(deleteButton)

    return divNote
}