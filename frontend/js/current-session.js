//Retrieve arrays local browser storage
let remainingTunes = JSON.parse(localStorage.getItem("remainingTunes")) || [];
console.log("Remaining Tunes: ", remainingTunes);
let setsPlayed = JSON.parse(localStorage.getItem("setsPlayed")) || [];

//Show all sets that have been generated from the current session
function displaySetsPlayed() {
    let setsList = document.getElementById("setsPlayed");
    setsList.innerHTML = ""; 
    setsPlayed.forEach((set) => {
        const listItem = document.createElement("li");
        listItem.textContent = set;
        setsList.appendChild(listItem);
      });
}

//Display all tunes from the current session that have not been selected
function displayRemainingTunes() {
    const remainingTunesList = document.getElementById("remainingTunes");
    remainingTunesList.innerHTML = ""; 
    remainingTunes.forEach((tune) => {
        const listItem = document.createElement("li");
        listItem.textContent = tune;
        remainingTunesList.appendChild(listItem);
      });
}


// Display all content
displaySetsPlayed();
displayRemainingTunes();