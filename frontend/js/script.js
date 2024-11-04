//While we don't have a database. Let's stick to reels for now. 
let tuneLibrary = JSON.parse(localStorage.getItem("tuneLibrary")) || [
    "Cooley's Reel",
    "Wise Maid",
    "Bird in the Bush"
];

let remainingTunes = JSON.parse(localStorage.getItem("remainingTunes")) || [...tuneLibrary];
console.log("Remaining Tunes: ", remainingTunes)
localStorage.setItem("tuneLibrary", JSON.stringify(tuneLibrary));
localStorage.setItem("remainingTunes", JSON.stringify(remainingTunes));
console.log("Remaining Tunes: ", remainingTunes)

let setsPlayed = JSON.parse(localStorage.getItem("setsPlayed")) || [];
localStorage.setItem("setsPlayed", JSON.stringify(setsPlayed));

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
localStorage.setItem("favorites", JSON.stringify(favorites));

function getRandomSet() {
    if (remainingTunes.length < 3) {
        alert("Out of tunes! Please reset the session to get more sets.")
    }
    else {
        let newSet = ""
        for (let i = 0; i < 3; i++) {
            let randomIndex = Math.floor(Math.random()*remainingTunes.length)
            let newTune = remainingTunes[randomIndex]
            remainingTunes.splice(randomIndex, 1)
            if (i < 2) {
                newSet = newSet.concat(newTune.concat('/ '))
            }
            else {
                newSet = newSet.concat(newTune)
            }
            
        }

        localStorage.setItem("remainingTunes", JSON.stringify(remainingTunes));
        console.log(remainingTunes)
        setsPlayed.push(newSet);
        localStorage.setItem("setsPlayed", JSON.stringify(setsPlayed));
        console.log("sets played", setsPlayed)
        displaySet(newSet)

        const addFavoriteButton = document.getElementById("addFavorite")
        addFavoriteButton.onclick = () => addFavorite(newSet);

    }
}


function displaySet(newSet) {
    setText = document.getElementById("newSet")
    setText.innerHTML = newSet

}

function resetSession() {
    setText = document.getElementById("newSet")
    setText.innerHTML = ""
    remainingTunes = [...tuneLibrary]
    localStorage.setItem("remainingTunes", JSON.stringify(remainingTunes));

    setsPlayed = []
    localStorage.setItem("setsPlayed", JSON.stringify(setsPlayed));

    console.log("Remaining Tunes: ", remainingTunes)
}


function addFavorite(newSet) {
    favorites.push(newSet);
    localStorage.setItem("favorites", JSON.stringify(favorites));

}


document.getElementById("generateSet").addEventListener("click", getRandomSet);
document.getElementById("reset").addEventListener("click", resetSession);
