let notesButton = document.getElementById('add-note');
let notesContainer = document.getElementById('notes-container')
let notesList = JSON.parse(localStorage.getItem('notesList')) || [];
index = 0



notesButton.addEventListener("click" ,() =>{
    notesPush()
} );

function saveNotes(){
    localStorage.setItem('notesList', JSON.stringify(notesList));
}

function notesPush(){
    let noteElement = createNoteElement(index)
    notesContainer.appendChild(noteElement);
    notesList.push(noteElement)
    index+=1
}
// It display's the element in notesList
function display(){
    notesContainer.innerHTML = ''
    notesList.forEach( (note) => {
        notesContainer.appendChild(note);
    });
    saveNotes();
}
function createNoteElement(){
    let noteDiv = document.createElement('div');
    noteDiv.classList.add('note');

    let textArea = document.createElement('textarea')
    textArea.placeholder = "Write your note here..."
    textArea.classList.add('note-area');

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete-note');
    deleteButton.addEventListener("click", () =>{
        let noteIndex = notesList.indexOf(noteDiv);
        if (noteIndex !== -1){
            notesList.splice(noteIndex,1);
            display();
            saveNotes();
        }
    });

    noteDiv.append(textArea);
    noteDiv.append(deleteButton);

    return noteDiv;
}
