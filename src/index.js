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
  renderCharacterBar:Creates a <span> element to hold the character's name & Adds a click event so when you click the nam
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
  
    
    
    