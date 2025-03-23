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

// Store whichever character currently selected in this variable
    let currentCharacter = null;

    /*
  getAllCharacters: Fetches the list of characters from our JSON server.
  */
function getAllCharacters() {
    fetch(baseURL)
      .then(r => r.json())
      .then(data => {
        data.forEach(renderCharacterBar);
        if (data.length > 0) {
          showCharacterDetails(data[0]);
        }
      });
  }
  

    /*
  renderCharacterBar:Creates <span> element to hold the character's name & Adds a click event so when you click the nam
*/
function renderCharacterBar(char) {
    const span = document.createElement("span");
    span.textContent = char.name;
    span.style.cursor = "pointer";
    span.addEventListener("click", () => {
      showCharacterDetails(char);
    });
    characterBar.appendChild(span);
  }
  

  /*
  showCharacterDetails:Saves the clicked character object to currentCharacter
*/
function showCharacterDetails(char) {
    currentCharacter = char;
    nameElem.textContent = char.name;
    imageElem.src = char.image;
    imageElem.alt = char.name;
    voteCountElem.textContent = char.votes;
  }

  /*
  Event listener for the #votes-form submission:
*/
votesForm.addEventListener("submit", e => {
    e.preventDefault();
    const votesToAdd = parseInt(votesInput.value);
    if (!isNaN(votesToAdd) && currentCharacter) {
      currentCharacter.votes += votesToAdd;
      voteCountElem.textContent = currentCharacter.votes;
      updateCharacterVotes(currentCharacter);
      votesInput.value = "";
    }
  });
    
   /*
  resetBtn click event:Sets the currentCharacter's votes to 0 & Updates the displayed votes to 0.
*/
resetBtn.addEventListener("click", () => {
    if (currentCharacter) {
      currentCharacter.votes = 0;
      voteCountElem.textContent = 0;
      updateCharacterVotes(currentCharacter);
    }
  });
   
    /*
  newCharForm event listener:
  1) Collects the name and image URL from the form inputs.
  2) Sends a POST request to the JSON server to create a new character with 0 votes.
  3) Adds the new character to the character bar by calling renderCharacterBar.
  4) Immediately displays the new character's details by calling showCharacterDetails.
  5) Clears the form fields.
*/
if (newCharForm) {
    newCharForm.addEventListener("submit", e => {
      e.preventDefault();
      const characterName = newCharName.value;
      const characterImage = newCharImage.value;
      if (characterName && characterImage) {
        const newCharacter = {
          name: characterName,
          image: characterImage,
          votes: 0
        };
        fetch(baseURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCharacter)
          })
          .then(r => r.json())
          .then(savedCharacter => {
            renderCharacterBar(savedCharacter);
            showCharacterDetails(savedCharacter);
          });
          newCharName.value = "";
          newCharImage.value = "";
        }
      });
    }

    /*
  updateCharacterVotes:
  1) Uses a PATCH request to update the "votes" property for the current character in the db.json file.
  2) This ensures the votes are persisted even if the page reloads.
*/
function updateCharacterVotes(char) {
    fetch(${baseURL}/${char.id}, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ votes: char.votes })
    })
    