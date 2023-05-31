// Javascript link check
console.log("script.js geladen");

/***********************************************/
/* huidig locatie knop progressive enhancement */
/***********************************************/

// Code voor geolocation API en reverse geocoding van Geoapify
const apiKey = "15a0ff507ba54cdeaa2699add37a5999"; // API key van Geoapify
const resultaaatElement = document.getElementById("plaats");
const locatieKnopId = document.getElementById("locatieKnopId");

function getLocation() {
  if (navigator.geolocation) {
    // Check of geolocation beschikbaar is
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    resultaaatElement.value = "Geolocation is niet beschikbaar voor uw browser.";
  }
}

// Reverse geocoding van Geoapify
function onSuccess(position) {
  //
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const reverseGeocodingUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}`; // URL voor reverse geocoding

  fetch(reverseGeocodingUrl) // Fetch data van reverse geocoding
    .then((response) => response.json()) // Data omzetten naar json
    .then((data) => {
      // Data van reverse geocoding
      const address = data.features[0].properties.formatted;
      resultaaatElement.value = address;
    })
    .catch((error) => {
      // Error handling voor reverse geocoding
      console.log("Error getting reverse geocoding data:", error);
      resultaaatElement.value =
        "Kon het adres niet vinden. Er is een fout opgetreden.";
    });
}

// Error handling voor geolocation
function onError(error) {
  resultaaatElement.value =
    "Error opgelopen met het opladen van uw locatie: " + error.message;
}

/**********************************************/
/* hide submit button progressive enhancement */
/**********************************************/

// Event listener voor de gebruik huidige locatie knop
locatieKnopId.addEventListener("click", getLocation);

// Dom elementen selecteren
const submitButton = document.querySelector(
  ".form main div:last-of-type>input"
);

const hobbyInput = document.getElementById("hobby-select");
const hobbySelector = document.querySelector(".form select");
let hobbyAan = false;

const plaatsInput = document.getElementById("plaats");
const plaatsSelector = document.querySelector(".form input");
let plaatsAan = false;

const datumInput = document.getElementById("datum");
const datumSelector = document.querySelector(".form input[type=date]");
let datumsAan = false;

const beschrijvingInput = document.getElementById("beschrijving");
const beschrijvingSelector = document.querySelector(".form main textarea");
let beschrijvingAan = false;

// De submit button wordt uitgezet als er nog geen input is
if (
  hobbyAan == false &&
  plaatsAan == false &&
  datumsAan == false &&
  beschrijvingAan == false
) {
  console.log("submit uit");
  submitButton.classList.add("uit");
}

// De submit button wordt aangezet als alle input zijn tenminste 1 keertje zijn aangeklikt/gefocusd
function checkSubmitButton() {
  if (hobbyAan && plaatsAan && datumsAan && beschrijvingAan) {
    console.log("submit aan");
    submitButton.classList.remove("uit");
  }
}

hobbyInput.addEventListener("focus", () => {
  console.log("hobby gefocust");
  hobbySelector.classList.add("ingevuld");
  hobbyAan = true;
  checkSubmitButton();
});

plaatsInput.addEventListener("focus", () => {
  console.log("plaats gefocust");
  plaatsSelector.classList.add("ingevuld");
  plaatsAan = true;
  checkSubmitButton();
});

datumInput.addEventListener("focus", () => {
  console.log("datum gefocust");
  datumSelector.classList.add("ingevuld");
  datumsAan = true;
  checkSubmitButton();
});

beschrijvingInput.addEventListener("focus", () => {
  console.log("beschrijving gefocust");
  beschrijvingSelector.classList.add("ingevuld");
  beschrijvingAan = true;
  checkSubmitButton();
});

// css fallback voor geolocation, stop met het hiden van een waarschuwing blok
const jsCheck = 1;
const geenGeolocatieWaarschuwing = document.querySelector("fieldset>section>p");
const locatieKnopSelector = document.querySelector("fieldset>section>button");

if (jsCheck == 1) {
  geenGeolocatieWaarschuwing.classList.add("uit");
  locatieKnopSelector.classList.remove("uit");
}