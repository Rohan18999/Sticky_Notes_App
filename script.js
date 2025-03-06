let notesButton = document.getElementById('add-note');
let notesContainer = document.getElementById('notes-container')
let notesList = JSON.parse(localStorage.getItem('notesList')) || [];

notesButton.addEventListener("click" ,() =>{
    notesPush()
} );

function saveNotes(){
    localStorage.setItem('notesList', JSON.stringify(notesList));
}

function notesPush(){
    let noteData = {text: ""};
    notesList.push(noteData);
    display();
}
// It display's the element in notesList
function display(){
    notesContainer.innerHTML = ''
    notesList.forEach( (note,index) => {
        let noteElement = createNoteElement(note,index)
        notesContainer.appendChild(noteElement);
    });
    saveNotes();
}
function createNoteElement(noteData,index){
    let noteDiv = document.createElement('div');
    noteDiv.classList.add('note');

    let textArea = document.createElement('textarea')
    textArea.placeholder = "Write your note here..."
    textArea.classList.add('note-area');
    textArea.value = noteData.text

    textArea.addEventListener("input", () =>{
        notesList[index].text = textArea.value;
        saveNotes();
    })

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete-note');
    deleteButton.addEventListener("click", () =>{
        let noteIndex = notesList.indexOf(noteDiv);
        if (noteIndex !== -1){
            notesList.splice(noteIndex,1);
            display();
        }
    });

    noteDiv.append(textArea);
    noteDiv.append(deleteButton);

    return noteDiv;
}
