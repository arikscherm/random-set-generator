//Declare list of reels
let tuneLibrary = JSON.parse(localStorage.getItem("tuneLibrary")) || [
    "Cooley's Reel",
    "Wise Maid",
    "Bird in the Bush"
];

//Save tune library to local storage
localStorage.setItem("tuneLibrary", JSON.stringify(tuneLibrary));

//If remainingTunes array doesn't exist, copy tune Library.
let remainingTunes = JSON.parse(localStorage.getItem("remainingTunes")) || [...tuneLibrary];
let setsPlayed = JSON.parse(localStorage.getItem("setsPlayed")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

//Get three random tunes to create an Irish set of reels. Remove each tune from the remaining list of tunes once selected
function getRandomSet() {
    if (remainingTunes.length < 3) {
        alert("Out of tunes! Please reset the session to get more sets.");
    }
    else {
        let newSet = ""
        for (let i = 0; i < 3; i++) {
            
            //Select random tune and delete it from remainingTunes
            let randomIndex = Math.floor(Math.random()*remainingTunes.length);
            let newTune = remainingTunes[randomIndex];
            remainingTunes.splice(randomIndex, 1);
           
            //Concatenate new tune to the set. Sets are displayed as a string--> tune1/ tune2/ tune3
            if (i < 2) {
                newSet = newSet.concat(newTune.concat('/ '));
            }
            else {
                newSet = newSet.concat(newTune);
            }
            
        }

        //Update remainingTunes in local browser storage
        localStorage.setItem("remainingTunes", JSON.stringify(remainingTunes));
        console.log(remainingTunes);
        
        //Record the new set and save it to local browser storage
        setsPlayed.push(newSet);
        localStorage.setItem("setsPlayed", JSON.stringify(setsPlayed));
        displaySet(newSet);

        //Button to click to add set to favorites
        // Leaving as is but could make more consistent with an addEventListener like the other two at the bottom.
        const addFavoriteButton = document.getElementById("addFavorite");
        addFavoriteButton.onclick = () => addFavorite(newSet);

    }
}

//Helper function to display set
function displaySet(newSet) {
    setText = document.getElementById("newSet");
    setText.innerHTML = newSet;

}

// Clear the current session
function resetSession() {

    // Clear set text
    setText = document.getElementById("newSet");
    setText.innerHTML = "";

    // Reset remaining tunes to tune library
    remainingTunes = [...tuneLibrary];
    localStorage.setItem("remainingTunes", JSON.stringify(remainingTunes));
    console.log("Remaining Tunes: ", remainingTunes);

    // Clear out record of sets played
    setsPlayed = [];
    localStorage.setItem("setsPlayed", JSON.stringify(setsPlayed));

}


// Helper function to add set to favorites
function addFavorite(newSet) {
    if (favorites.includes(newSet)) {
        alert("Set already favorited!")
    }

    else{
        favorites.push(newSet);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }


}

console.log("Remaining Tunes: ", remainingTunes);
document.getElementById("generateSet").addEventListener("click", getRandomSet);
document.getElementById("reset").addEventListener("click", resetSession);
