//Get list of favorite sets from local storage
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
console.log("favorites", favorites);

function displayFavorites() {
    let favoritesList = document.getElementById("favorites");
    favoritesList.innerHTML = ""; 
    favorites.forEach((set) => {
            const listItem = document.createElement("li");
            listItem.textContent = set;

            //Each favorite set gets a remove button
            const removeButton = document.createElement("button");
            removeButton.textContent = "remove";
            removeButton.onclick = () => removeFavorite(set);
            listItem.appendChild(removeButton);

            favoritesList.appendChild(listItem);
      });
}

//Remove favorite
function removeFavorite(setToRemove) {

    //Remove from favorites array and save to local browser storage
    favorites = favorites.filter(set => set != setToRemove);
    localStorage.setItem("favorites", JSON.stringify(favorites));

    //Display the updated favorites list
    displayFavorites();
    console.log("favorites", favorites);


}

displayFavorites();