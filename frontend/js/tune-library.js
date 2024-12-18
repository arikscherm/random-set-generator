//Retrieve lists from local browser storage
let tuneLibrary = JSON.parse(localStorage.getItem("tuneLibrary")) || [];
let remainingTunes = JSON.parse(localStorage.getItem("remainingTunes")) || [];

//Display entire collection of tunes, including tunes already selected in the current session
function displayTuneLibrary() {
    const tuneList = document.getElementById("tuneLibrary");
    tuneList.innerHTML = ""; 
    tuneLibrary.forEach((tune) => {
        const listItem = document.createElement("li");
        listItem.textContent = tune;

        //Button to remove tunes from tune library
        const removeButton = document.createElement("button")
        removeButton.textContent = "remove";
        removeButton.onclick = () => removeTune(tune);

        listItem.appendChild(removeButton);
        tuneList.appendChild(listItem);
      });
}

// Take input value and append to list of tunes
function addTune() {

    //Get new tune from input field
    let newTune = document.getElementById("newTune").value;
    if (!newTune) return;

    //Add the new tune to the tune library and remaining tunes for the session. Update both lists in local browser storage
    //Check for duplicate
    if (tuneLibrary.includes(newTune)) {
        alert("Tune already in library!");
    }
    else {
        // add new tune to both tune library and remaining tunes for current session
        tuneLibrary.push(newTune);
        remainingTunes.push(newTune);
        localStorage.setItem("tuneLibrary", JSON.stringify(tuneLibrary));
        localStorage.setItem("remainingTunes", JSON.stringify(remainingTunes));

        //Update the html and display the new tune
        const tuneList = document.getElementById("tuneLibrary");
        const newItem = document.createElement("li");
        newItem.textContent = newTune;
        tuneList.appendChild(newItem);
        displayTuneLibrary();

        //Clear input after posting new tune
        document.getElementById("newTune").value = "";
        console.log("Remaining Tunes: ", remainingTunes);
    }

}

//Remove tune from tune library
function removeTune(tuneToRemove) {

    //Remove the tune and update the tune library in local browser storage
    tuneLibrary = tuneLibrary.filter(tune => tune != tuneToRemove);
    localStorage.setItem("tuneLibrary", JSON.stringify(tuneLibrary));

    //If tune is in remaining tunes, remove the tune and update remaining tunes in local browser storage
    if (remainingTunes.includes(tuneToRemove)) {
        remainingTunes = remainingTunes.filter(tune => tune != tuneToRemove);
        localStorage.setItem("remainingTunes", JSON.stringify(remainingTunes));
    }

    //Display the updated tunes library
    displayTuneLibrary();
    console.log(remainingTunes)

}


//Enable posting new tunesd by pushing enter
function addEnterKeyListener() {
    const input = document.getElementById("newTune");
    input.addEventListener("keydown", function(event) {
        if (event.key == "Enter") {
            addTune();
            event.preventDefault();
        }
    });
}


console.log("Remaining Tunes: ", remainingTunes);
displayTuneLibrary();
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("submitNewTune").addEventListener("click", addTune);
    addEnterKeyListener();
})



