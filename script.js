// Deklaracja zmiennych
const cards = document.querySelectorAll(".beer-card");
const editButtons = document.querySelectorAll(".edit-button");
const selectImages = document.querySelectorAll(".select-images");

// Funkcja do zapisywania danych piwa w Local Storage
function saveBeerData(index, beerData) {
  const savedData = localStorage.getItem("beerData")
    ? JSON.parse(localStorage.getItem("beerData"))
    : [];

  savedData[index] = beerData;

  localStorage.setItem("beerData", JSON.stringify(savedData));
}

// Funkcja do odczytywania zapisanych danych piwa z Local Storage
function loadBeerData() {
  if (localStorage.getItem("beerData")) {
    const savedData = JSON.parse(localStorage.getItem("beerData"));

    cards.forEach((card, index) => {
      const beerData = savedData[index] || {}; // Użyj pustego obiektu, jeśli dane nie istnieją
      const beerNameElement = card.querySelector(".beer-name");
      const beerStyleElement = card.querySelector(".beer-style");
      const beerBLGElement = card.querySelector(".beer-blg");
      const beerAlcoholElement = card.querySelector(".beer-alcohol");
      const beerPriceElement = card.querySelector(".beer-price");
      const beerImageElement = card.querySelector(".beer-image");

      beerNameElement.textContent = beerData.name || "";
      beerStyleElement.textContent = beerData.style || "";
      beerBLGElement.textContent = `BLG: ${beerData.blg || ""}`;
      beerAlcoholElement.textContent = `Alcohol: ${beerData.alcohol || ""}%`;
      beerPriceElement.textContent = `0.3l: ${
        beerData.price03 || ""
      } zł | 0.5l: ${beerData.price05 || ""} zł | Butelka 1l: ${
        beerData.price1 || ""
      } zł`;
      beerImageElement.src = beerData.image || "";
    });
  }
}

// Zdarzenie zmiany wybranego obrazka
selectImages.forEach((select, index) => {
  select.addEventListener("change", function () {
    const selectedImage = this.value;
    const beerImageElement = cards[index].querySelector(".beer-image");
    beerImageElement.src = selectedImage;

    // Zapisz wybrany obrazek w Local Storage dla odpowiedniej karty
    const beerData = {
      ...getBeerData(index),
      image: selectedImage,
    };

    saveBeerData(index, beerData);
  });
});

// Zdarzenie kliknięcia przycisku Edycji
editButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const name = prompt("Nazwa piwa");
    const style = prompt("Styl piwa");
    const blg = prompt("Wpisz BLG");
    const alcohol = prompt("Zawartość alkoholu");
    const price03 = prompt("Wprowadź cenę za 0.3l");
    const price05 = prompt("Wprowadź cenę za 0.5l");
    const price1 = prompt("Wprowadź cenę za 1l");

    // Zapisz dane piwa w Local Storage dla odpowiedniej karty
    const beerData = {
      name,
      style,
      blg,
      alcohol,
      price03,
      price05,
      price1,
      image: selectImages[index].value, // Pobierz wybrany obrazek dla karty
    };

    saveBeerData(index, beerData);
    loadBeerData(); // Wczytaj zaktualizowane dane po zapisie
  });
});

// Funkcja pomocnicza do odczytywania danych piwa z Local Storage dla danej karty
function getBeerData(index) {
  if (localStorage.getItem("beerData")) {
    const savedData = JSON.parse(localStorage.getItem("beerData"));
    return savedData[index] || {};
  }
  return {};
}

// Wywołaj funkcję do odczytania zapisanych danych po załadowaniu strony
loadBeerData();
