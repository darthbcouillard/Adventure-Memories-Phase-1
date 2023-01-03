window.addEventListener("DOMContentLoaded", () => {
    fetchMemories()
})

function fetchMemories() {
    fetch("http://localhost:3000/memories")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const memories = document.querySelector("#memory-container")
        memories.innerHTML = renderAllMemories(data)
    })
}

function renderAllMemories(memories) {
    return memories.map(mem => renderSingleMemory(mem)).join("")
}

function renderSingleMemory(memory) {
    return `
    <div class="memory-card" id="${memory.id}">
        <div class="memory-frame">
            <h1 class="center-text">${memory.title}</h1>
                <p>${memory.year}</p>
                <p>${memory.body}</p>
            <button data-action="delete" class="memory-delete-button">Delete</button><br></br> 
    </div>
</div>
    `
}