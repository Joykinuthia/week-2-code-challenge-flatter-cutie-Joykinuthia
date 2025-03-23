// Your code here
// Base URL for the local JSON server (the "database" for our characters)
const baseURL = "http://localhost:3000/characters";

// Grabbing references to HTML elements using their IDs

    const characterBar = document.getElementById("character-bar"); 
    const detailedInfo = document.getElementById("detailed-info"); 
    const nameElem = document.getElementById("name");              
    const imageElem = document.getElementById("image");            
    const voteCountElem = document.getElementById("vote-count");   
    const votesForm = document.getElementById("votes-form");       
    const votesInput = document.getElementById("votes");           
    const resetBtn = document.getElementById("reset-btn");         
    const newCharForm = document.getElementById("character-form"); 
    const newCharName = document.getElementById("new-character-name");   
    const newCharImage = document.getElementById("new-character-image"); 

// We'll store whichever character is currently selected in this variable
    let currentCharacter = null;

    // Fetch characters
    function fetchCharacters() {
        fetch("http://localhost:3000/characters")
            .then(response => response.json())
            .then(data => {
                characterBar.innerHTML = "";
                data.forEach(character => displayCharacterInBar(character));
            })
            .catch(error => console.error("Error fetching characters:", error));
    }

    // Displaying character in character bar
    function displayCharacterInBar(character) {
        const span = document.createElement("span");
        span.textContent = character.name;
        span.dataset.id = character.id;
        span.style.cursor = "pointer";
        span.addEventListener("click", () => displayCharacterDetails(character));
        characterBar.appendChild(span); 
    }

    // Displaying character details
    function displayCharacterDetails(character) {
        currentSelectedCharacter = character;
        nameElement.textContent = character.name;
        imageElement.src = character.image;
        voteCount.textContent = character.votes;
    }

    // Handling submission of votes
    votesForm.addEventListener("submit", event => {
        event.preventDefault();
        if (!currentSelectedCharacter) return;

        const addedVotes = parseInt(votesInput.value, 10) || 0;
        currentSelectedCharacter.votes += addedVotes;
        voteCount.textContent = currentSelectedCharacter.votes;

        // Updating the server
        fetch(`http://localhost:3000/characters/${currentSelectedCharacter.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ votes: currentSelectedCharacter.votes })
        })
        .catch(error => console.error("Error updating votes:", error));

        votesInput.value = "";
    });

    // Resetting votes
    resetButton.addEventListener("click", () => {
        if (!currentSelectedCharacter) return;
        currentSelectedCharacter.votes = 0;
        voteCount.textContent = 0;

        // Updating the server to reset votes
        fetch(`http://localhost:3000/characters/${currentSelectedCharacter.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ votes: 0 })
        })
        .catch(error => console.error("Error resetting votes:", error));
    });

    // New character submission
    characterForm.addEventListener("submit", event => {
        event.preventDefault();

        const newCharacter = {
            name: nameInput.value,
            image: imageUrlInput.value,
            votes: 0
        };

        fetch("http://localhost:3000/characters", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCharacter)
        })
        .then(response => response.json())
        .then(data => {
            const span = document.createElement("span");
            span.textContent = data.name;
            span.dataset.id = data.id; 
            span.addEventListener("click", () => displayCharacterDetails(data));
            characterBar.appendChild(span);
            displayCharacterDetails(data);
        })
        .catch(error => console.error("Error adding new character:", error));

        // Resetting the form fields
        nameInput.value = "";
        imageUrlInput.value = "";
    });

    // Fetch all characters on page load
    fetchCharacters();
});

    
    
    