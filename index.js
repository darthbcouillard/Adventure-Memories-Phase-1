window.addEventListener("DOMContentLoaded", () => {
    fetchMemories()
    document.querySelector('#new-memory').addEventListener("submit", addMemory)
})

function fetchMemories() {
    fetch("http://localhost:3000/memories")
    .then(res => res.json())
    .then(data => {
        const memories = document.querySelector("#memory-container")
        memories.innerHTML = renderAllMemories(data)
        addDeleteListeners()
        likeButtonListener()
    })
    
}


function renderAllMemories(memories) {
    return memories.map(mem => renderSingleMemory(mem)).join("")
}


function renderSingleMemory(memory) {
    return `
     <div class="memory-card">
            <div class="memory-frame">
                <h4 class="center-text">${memory.title}</h4>
                    <p>${memory.date}</p>
                    <p>${memory.body}</p>
                    <button data-action="delete" id="${memory.id}" class="memory-delete-button">Delete</button><br></br>
                    <button id="${memory.id}" class="like-button">0</button><br></br>
            </div>
    </div>
    `
}

function likeButtonListener() {
    const likeAction = document.querySelectorAll(".like-button")
    likeAction.forEach(td => td.addEventListener('click', addLike))

}

function addLike(event) {
    event.target.innerHTML = 1
}


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
        fetchMemories()
    })
}

function addDeleteListeners() {
    const memories = document.querySelectorAll(".memory-delete-button")
    memories.forEach(td => td.addEventListener('click', deleteMemory))
}

function deleteMemory(event) {
    fetch(`http://localhost:3000/memories/${event.target.id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const memoryCard = event.target.parentElement.parentElement
    document.querySelector("#memory-container").removeChild(memoryCard)
}



