// Javascript link check
console.log("script.js geladen");


// Code voor geolocation API en reverse geocoding van Geoapify
const apiKey = '15a0ff507ba54cdeaa2699add37a5999';
const resultElement = document.getElementById('plaats');
const getLocationBtn = document.getElementById('getLocationBtn');

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    resultElement.value = 'Geolocation is not supported by this browser.';
  }
}

function onSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const reverseGeocodingUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}`;

  fetch(reverseGeocodingUrl)
    .then(response => response.json())
    .then(data => {
      const address = data.features[0].properties.formatted;
      resultElement.value = address;
    })
    .catch(error => {
      console.log('Error getting reverse geocoding data:', error);
      resultElement.value = 'Error getting address.';
    });
}

function onError(error) {
  resultElement.value = 'Error getting current location: ' + error.message;
}

getLocationBtn.addEventListener('click', getLocation);






// Event listeners voor het formulier
const submitButton = document.querySelector(".form main div:last-of-type>input");

const inputHobby = document.getElementById("hobby-select");
const hobbySelector = document.querySelector(".form select");
let hobbyAan = false;

const inputPlaats = document.getElementById("plaats");
const plaatsSelector = document.querySelector(".form input");
let plaatsAan = false;

const inputDatum = document.getElementById("datum");
const datumSelector = document.querySelector(".form input[type=date]");
let datumsAan = false;

const inputBeschrijving = document.getElementById("beschrijving");
const beschrijvingSelector = document.querySelector(".form main textarea");
let beschrijvingAan = false;

if (
  hobbyAan == false &&
  plaatsAan == false &&
  datumsAan == false &&
  beschrijvingAan == false
) {
  console.log("submit uit");
  submitButton.classList.add("uit");
}

function checkSubmitButton() {
  if (hobbyAan && plaatsAan && datumsAan && beschrijvingAan) {
    console.log("submit aan");
    submitButton.classList.remove("uit");
  }
}

inputHobby.addEventListener("focus", () => {
  console.log("hobby gefocust");
  hobbySelector.classList.add("ingevuld");
  hobbyAan = true;
  checkSubmitButton();
});

inputPlaats.addEventListener("focus", () => {
  console.log("plaats gefocust");
  plaatsSelector.classList.add("ingevuld");
  plaatsAan = true;
  checkSubmitButton();
});

inputDatum.addEventListener("focus", () => {
  console.log("datum gefocust");
  datumSelector.classList.add("ingevuld");
  datumsAan = true;
  checkSubmitButton();
});

inputBeschrijving.addEventListener("focus", () => {
  console.log("beschrijving gefocust");
  beschrijvingSelector.classList.add("ingevuld");
  beschrijvingAan = true;
  checkSubmitButton();
});