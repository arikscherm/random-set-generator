let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
localStorage.setItem("favorites", JSON.stringify(favorites));
console.log("favorites", favorites)

function displayFavorites() {
    let favoritesList = document.getElementById("favorites")
    favoritesList.innerHTML = ""; 
    favorites.forEach((set) => {
    const listItem = document.createElement("li");
    listItem.textContent = set;


    const removeButton = document.createElement("button")
    removeButton.textContent = "remove";
    removeButton.onclick = () => removeFavorite(set);
    listItem.appendChild(removeButton)


    favoritesList.appendChild(listItem);
      });
}





function removeFavorite(setToRemove) {
    favorites = favorites.filter(set => set != setToRemove);
    localStorage.setItem("favorites", JSON.stringify(favorites));

    displayFavorites();
    console.log("favorites", favorites)


}

displayFavorites();