//While we don't have a database. Let's stick to reels for now. 
let tuneLibrary = JSON.parse(localStorage.getItem("tuneLibrary")) || [
    "Cooley's Reel",
    "Wise Maid",
    "Bird in the Bush"
];
let remainingTunes = JSON.parse(localStorage.getItem("remainingTunes")) || [...tuneLibrary];

localStorage.setItem("tuneLibrary", JSON.stringify(tuneLibrary));
localStorage.setItem("remainingTunes", JSON.stringify(remainingTunes));
console.log("Remaining Tunes: ", remainingTunes)

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
        displaySet(newSet)
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
    console.log("Remaining Tunes: ", remainingTunes)
}


document.getElementById("generateSet").addEventListener("click", getRandomSet);
document.getElementById("reset").addEventListener("click", resetSession);
