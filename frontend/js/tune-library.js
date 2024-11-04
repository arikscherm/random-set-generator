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

//
function addTune() {

    //Get new tune from input field
    let newTune = document.getElementById("newTune").value;
    if (!newTune) return;

    //Add the new tune to the tune library and remaining tunes for the session. Update both lists in local browser storage
    tuneLibrary.push(newTune);
    remainingTunes.push(newTune);
    localStorage.setItem("tuneLibrary", JSON.stringify(tuneLibrary));
    localStorage.setItem("remainingTunes", JSON.stringify(remainingTunes));

    //Display the new tune
    const tuneList = document.getElementById("tuneLibrary");
    const newItem = document.createElement("li");
    newItem.textContent = newTune;
    tuneList.appendChild(newItem);
    displayTuneLibrary();

    //Clear input after posting new tune
    document.getElementById("newTune").value = "";
    console.log("Remaining Tunes: ", remainingTunes)

}

//Remove tune from tune library
function removeTune(tuneToRemove) {

    //Remove the tune and update the tune library in local browser storage
    tuneLibrary = tuneLibrary.filter(tune => tune != tuneToRemove);
    localStorage.setItem("tuneLibrary", JSON.stringify(tuneLibrary));

    //Remove the tune and update remaining tunes in local browser storage...TODO: put if it's in remaining tunes, bc this doesn't need to execute if the tune was already played 
    remainingTunes = remainingTunes.filter(tune => tune != tuneToRemove);
    localStorage.setItem("remainingTunes", JSON.stringify(remainingTunes));
    
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
