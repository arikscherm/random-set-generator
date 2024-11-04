//show all the tunes. So it's just a constent from script.js. Which should be local storage I guess? but I'd like to import it. 
//favorites will be local storage for sure. 
//remaining sets can be exported since that's temporary

//Grab the full library from script.js
//use the tune-library id to display our new var


let tuneLibrary = JSON.parse(localStorage.getItem("tuneLibrary")) || [];
let remainingTunes = JSON.parse(localStorage.getItem("remainingTunes")) || [];
console.log("Remaining Tunes: ", remainingTunes)

function displayTuneLibrary() {
    const tuneList = document.getElementById("tuneLibrary")
    tuneList.innerHTML = ""; 
    tuneLibrary.forEach((tune) => {
        const listItem = document.createElement("li");
        listItem.textContent = tune;

        const removeButton = document.createElement("button")
        removeButton.textContent = "remove";
        removeButton.onclick = () => removeTune(tune);

        listItem.appendChild(removeButton);
        tuneList.appendChild(listItem);
      });
}


function addTune() {
    let newTune = document.getElementById("newTune").value;
    if (!newTune) return;

    //get from local storage and add it
    tuneLibrary.push(newTune);
    remainingTunes.push(newTune);
    localStorage.setItem("tuneLibrary", JSON.stringify(tuneLibrary));
    localStorage.setItem("remainingTunes", JSON.stringify(remainingTunes));

    //now add it to the list
    const tuneList = document.getElementById("tuneLibrary");
    const newItem = document.createElement("li");
    newItem.textContent = newTune;
    tuneList.appendChild(newItem)

    //clear input field
    document.getElementById("newTune").value = "";
    displayTuneLibrary();
    console.log("Remaining Tunes: ", remainingTunes)

}


function removeTune(tuneToRemove) {
    tuneLibrary = tuneLibrary.filter(tune => tune != tuneToRemove);
    localStorage.setItem("tuneLibrary", JSON.stringify(tuneLibrary));

    remainingTunes = remainingTunes.filter(tune => tune != tuneToRemove);
    localStorage.setItem("remainingTunes", JSON.stringify(remainingTunes));
    displayTuneLibrary();
    console.log(remainingTunes)

}

function addEnterKeyListener() {
    const input = document.getElementById("newTune");
    input.addEventListener("keydown", function(event) {
        if (event.key == "Enter") {
            addTune();
            event.preventDefault();
        }
    });
}

displayTuneLibrary()
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("submitNewTune").addEventListener("click", addTune);
    addEnterKeyListener();
})
