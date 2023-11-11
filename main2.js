let favoriteList = []; // Define favoriteList

function getFavoritesList() {
  const favContainer = document.getElementById("superhero-card-container");
  favContainer.innerHTML = "";

  favoriteList = JSON.parse(localStorage.getItem("favoriteList")) || [];

  favoriteList.forEach((element) => {
    let characterCard = document.createElement("div");
    characterCard.classList.add("card-container");

    let characterImage = document.createElement("div");
    characterImage.classList.add("container-character-image");
    // characterImage.innerHTML = `<img src="${element.path}.${element.extension}"/>`;

    let characterName = document.createElement("div");
    characterName.classList.add("character-name");
    characterName.textContent = element.name;

    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      removeFavorite(element.id); // Call the removeFavorite function passing the character's ID
      characterCard.remove(); // Remove the specific character card from the DOM
    });

    characterCard.appendChild(characterImage);
    characterCard.appendChild(characterName);
    characterCard.appendChild(removeButton);

    favContainer.appendChild(characterCard);
  });
}

function removeFavorite(id) {
  favoriteList = favoriteList.filter((character) => character.id !== id);
  localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
}

window.onload = () => {
  getFavoritesList();
};
