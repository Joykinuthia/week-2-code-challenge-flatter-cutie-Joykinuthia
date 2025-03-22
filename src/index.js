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
   
    
    
    
    
    