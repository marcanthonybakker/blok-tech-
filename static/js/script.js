// Javascript link check
console.log("script.js geladen");

// Event listeners voor het formulier

const submitButton = document.querySelector('.form main div:last-of-type>input');

const inputHobby = document.getElementById('hobby-select');
const hobbySelector = document.querySelector('.form select');
let hobbyAan = false;

const inputPlaats = document.getElementById('plaats');
const plaatsSelector = document.querySelector('.form input');
let plaatsAan = false;

const inputDatum = document.getElementById('datum');
const datumSelector = document.querySelector('.form input[type=date]');
let datumsAan = false;

const inputBeschrijving = document.getElementById('beschrijving');
const beschrijvingSelector = document.querySelector('.form main textarea');
let beschrijvingAan = false;

if (hobbyAan == false && plaatsAan == false && datumsAan == false && beschrijvingAan == false) {
  console.log("submit uit");
  submitButton.classList.add('uit');
}

function checkSubmitButton() {
    if (hobbyAan && plaatsAan && datumsAan && beschrijvingAan) {
      console.log("submit uit");
      submitButton.classList.remove('uit');
    }
  }
  
  inputHobby.addEventListener('focus', () => {
    console.log("hobby gefocust");
    hobbySelector.classList.add('ingevuld')
    hobbyAan = true;
    checkSubmitButton();
  });
  
  inputPlaats.addEventListener('focus', () => {
    console.log("plaats gefocust");
    plaatsSelector.classList.add('ingevuld')
    plaatsAan = true;
    checkSubmitButton();
  });
  
  inputDatum.addEventListener('focus', () => {
    console.log("datum gefocust");
    datumSelector.classList.add('ingevuld')
    datumsAan = true;
    checkSubmitButton();
  });
  
  inputBeschrijving.addEventListener('focus', () => {
    console.log("beschrijving gefocust");
    beschrijvingSelector.classList.add('ingevuld')
    beschrijvingAan = true;
    checkSubmitButton();
  });
