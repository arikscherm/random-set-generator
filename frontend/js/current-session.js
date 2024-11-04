let remainingTunes = JSON.parse(localStorage.getItem("remainingTunes")) || [];
console.log("Remaining Tunes: ", remainingTunes)

let setsPlayed = JSON.parse(localStorage.getItem("setsPlayed")) || [];
localStorage.setItem("setsPlayed", JSON.stringify(setsPlayed));
console.log("sets played", setsPlayed)

function displaySetsPlayed() {
    let setsList = document.getElementById("setsPlayed")
    setsList.innerHTML = ""; 
    setsPlayed.forEach((set) => {
        const listItem = document.createElement("li");
        listItem.textContent = set;
        setsList.appendChild(listItem);
      });
}


function displayRemainingTunes() {
    const remainingTunesList = document.getElementById("remainingTunes")
    remainingTunesList.innerHTML = ""; 
    remainingTunes.forEach((tune) => {
        const listItem = document.createElement("li");
        listItem.textContent = tune;
        remainingTunesList.appendChild(listItem);
      });
}

displaySetsPlayed()
displayRemainingTunes()