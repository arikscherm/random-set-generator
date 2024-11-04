//Use JS array but try using PG later. Also add options for Jigs, SlipJigs, Hornpipes, Polkas
let tuneLibrary = JSON.parse(localStorage.getItem("tuneLibrary")) || [
    "Cooley's Reel",
    "Wise Maid",
    "Bird in the Bush"
];

//Add tune library to local browser storage
localStorage.setItem("tuneLibrary", JSON.stringify(tuneLibrary));

//If remainingTunes array doesn't exist, copy tune Library.
let remainingTunes = JSON.parse(localStorage.getItem("remainingTunes")) || [...tuneLibrary];
let setsPlayed = JSON.parse(localStorage.getItem("setsPlayed")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
//delete this comment


//Get three random tunes to create Irish set. Remove each tune from the remaining pool of tunes once selected
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
           
            //Add concatenate new tune to the set. Sets are displayed as a string--> tune1/ tune2/ tune3
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

        //Add set to favorites
        const addFavoriteButton = document.getElementById("addFavorite");
        addFavoriteButton.onclick = () => addFavorite(newSet);

    }
}


function displaySet(newSet) {
    setText = document.getElementById("newSet");
    setText.innerHTML = newSet;

}

function resetSession() {
    setText = document.getElementById("newSet");
    setText.innerHTML = "";

    remainingTunes = [...tuneLibrary];
    localStorage.setItem("remainingTunes", JSON.stringify(remainingTunes));
    console.log("Remaining Tunes: ", remainingTunes);

    setsPlayed = [];
    localStorage.setItem("setsPlayed", JSON.stringify(setsPlayed));

}


function addFavorite(newSet) {
    favorites.push(newSet);
    localStorage.setItem("favorites", JSON.stringify(favorites));

}

console.log("Remaining Tunes: ", remainingTunes);
document.getElementById("generateSet").addEventListener("click", getRandomSet);
document.getElementById("reset").addEventListener("click", resetSession);
