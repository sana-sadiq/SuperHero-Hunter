let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");
let date = new Date();
console.log(date.getTime());
const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal];
function displayWords(value) {
  input.value = value;
  removeElements();
}
function removeElements() {
  listContainer.innerHTML = "";
}

// function showToast(message) {
//   const toast = document.createElement("div");
//   toast.classList.add("toast");
//   toast.textContent = message;
//   document.body.appendChild(toast);

//   // Remove the toast after a certain period (e.g., 3 seconds)
//   setTimeout(() => {
//     toast.remove();
//   }, 3000);
// }
input.addEventListener("keyup", async () => {
  removeElements();
  if (input.value.length < 4) {
    return false;
  }
  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;
  const response = await fetch(url);
  const jsonData = await response.json();
  jsonData.data["results"].forEach((result) => {
    let name = result.name;
    let div = document.createElement("div");
    div.style.cursor = "pointer";
    div.classList.add("autocomplete-items");
    div.setAttribute("onclick", "displayWords('" + name + "')");
    let word = "<b>" + name.substr(0, input.value.length) + "</b>";
    word += name.substr(input.value.length);
    div.innerHTML = `<p class="item">${word}</p>`;
    listContainer.appendChild(div);
  });
});

function updateFavorite(character) {
  const favoriteList = JSON.parse(localStorage.getItem("favoriteList")) || [];
  favoriteList.push(character);
  localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
  showToast(`${character.name} added to favorites`);
}
// ... existing code for character data retrieval

button.addEventListener("click", async () => {
  showContainer.innerHTML = "";
  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;
  const response = await fetch(url);
  const jsonData = await response.json();
  jsonData.data["results"].forEach((element) => {
    let characterCard = document.createElement("div");
    characterCard.classList.add("card-container");

    let characterImage = document.createElement("div");
    characterImage.classList.add("container-character-image");
    characterImage.innerHTML = `<img src="${element.thumbnail.path}.${element.thumbnail.extension}"/>`;

    let characterName = document.createElement("div");
    characterName.classList.add("character-name");
    characterName.textContent = element.name;

    let characterDescription = document.createElement("div");
    characterDescription.classList.add("character-description");
    characterDescription.textContent = element.description;

    let favoriteButton = document.createElement("button");
    favoriteButton.classList.add("fa", "fa-heart", "favorite-button"); // Add Font Awesome classes
    favoriteButton.textContent = "";
    favoriteButton.classList.add("add-button");
    favoriteButton.addEventListener("click", () => {
      updateFavorite({
        id: element.id,
        name: element.name,
        path: element.thumbnail.path,
      });
      document.getElementById("parentElement").appendChild(favoriteButton);
    });

    characterCard.appendChild(characterImage);
    characterCard.appendChild(characterName);
    characterCard.appendChild(characterDescription);
    characterCard.appendChild(favoriteButton);

    showContainer.appendChild(characterCard);
  });
});

window.onload = () => {
  getRsult();
};
