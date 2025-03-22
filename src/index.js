// Your code here
document.addEventListener("DOMContentLoaded",() =>{
    const characterBar = document.getElementById("character-bar");
    const characterForm = document.getElementById("character-form");
    const detailedInfo = document.getElementById("detailed-info");
    const imageElement = document.getElementById("image");
    const nameElement = detailedInfo.querySelector("p");
    const nameInput = document.getElementById("name");
    const votesInput = document.getElementById("votes");
    const votesForm = document.getElementById("votes-form");
    const voteCount = document.getElementById("vote-count");
    const characterName = document.getElementById("name");
    const imageUrlInput = document.getElementById("image-url");
    const resetButton = document.getElementById("reset-btn");
})
    let currentSelectedCharacter = null;

// fetch characters
    function fetchCharacters() {
        fetch("http://localhost:3000/characters")
        .then(response => response.json())
        .then(data => {
            characterBar.innerHTML = "";
            data.forEach(character => 
                displayCharacterInBar(character));
        })
        .catch(error => console.error("Error fetching characters:", error));

    }

// displaying character name
    function displayCharacterInBar(character) {
        const span = document.createElement("span");
        span.textContent = character.name;
        span.dataset.id = character.id;
        span.style.cursor = "pointer";
        span.addEventListener("click", () => 
    displayCharacterDetails(character));
        character.appendChild(span);
    }

// displaying character details
    function displayCharacterDetails(character) {
        currentSelectedCharacter = character;
        nameElement.textContent = character.name;
        imageElement.src = character.image;
        voteCount.textContent = character.votes;
    }
   
    
    
    
    
    