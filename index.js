window.addEventListener("DOMContentLoaded", () => {
    fetchMemories()
    document.querySelector('#new-memory').addEventListener("submit", addMemory)
})

function fetchMemories() {
    fetch("http://localhost:3000/memories")
    .then(res => res.json())
    .then(data => {
        const memories = data
        memories.map(memory => renderSingleMemory(memory))
    })
    
}


    
function renderSingleMemory(memory) {
    const memoryCollection = document.getElementById("memory-container")
    const div = document.createElement("div")
    div.classList.add("memory-card")
    const h4 = document.createElement("h4")
    h4.textContent = memory.title
    const p = document.createElement("p")
    p.textContent = memory.date
    const p2 = document.createElement("p2")
    p2.textContent = memory.body
    const deleteButton = document.createElement("button")
    deleteButton.textContent = "Delete"
    deleteButton.classList.add("memory-delete-button")
    deleteButton.id = memory.id
    deleteButton.addEventListener("click", (event) => {
        fetch(`http://localhost:3000/memories/${memory.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const memoryCard = event.target.parentElement
        memoryCard.parentElement.removeChild(memoryCard)
    })
    div.append(h4, p, p2, deleteButton)
    memoryCollection.append(div)
}


// function renderSingleMemory(memory) {
//     return `
//      <div class="memory-card">
//             <div class="memory-frame">
//                 <h4 class="center-text">${memory.title}</h4>
//                     <p>${memory.date}</p>
//                     <p>${memory.body}</p>
//                     <button data-action="delete" id="${memory.id}" class="memory-delete-button">Delete</button><br></br>
//             </div>
//     </div>
//     `
// }




function addMemory(event) {
    event.preventDefault()
    const memory = {
        title: document.querySelector('#title').value, 
        date: document.querySelector('#date').value,
        body: document.querySelector('#body').value
        }
    fetch("http://localhost:3000/memories", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(memory)
    })
    .then(res => res.json())
    .then(data => {
        event.target.reset()
        renderSingleMemory(data)
    })
}





