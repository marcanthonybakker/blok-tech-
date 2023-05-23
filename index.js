// Server express en ejs laten gebruiken
const express = require('express');
const app = express();
const ejs = require('ejs');

// Gebruiker data (nep data omdat ik nog geen database heb)
const gebruikerData = 'Marc Bakker (server data)';

// Templating engine aanzetten met statische content
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('static'));

// Formulier pagina https link
app.get('/', (req, res) => {
  res.render('form.ejs', { gebruikerData });
});

// Berichten pagina https link
app.get('/berichten', (req, res) => {
  res.render('berichten.ejs');

  //nep data om dynamisch te plaatsen op mijn template pagina's
  const plaatsData = 'Wibautstraat 2, 1091 GM Amsterdam, Netherlands (server data)';
  const hobbyData = 'tuinieren (server data)';
  const datumData = '26-05-2023 (server data)';
  const beschrijvingData = 'Ik hou van tuinieren (server data)';
  const verzendingData = '26-05-2023 om 14:00 (server data)';
  res.render('berichten.ejs', { plaatsData, hobbyData, datumData, beschrijvingData, verzendingData, gebruikerData });
});

// Server open zetten op port 3000
app.listen(3000, () => {
  console.log("Server aan op port 3000");
});

// Error 404 missende pagina/icorrect pad
app.use(function (req, res) {
  res.status(404);

  res.render('error.ejs');
});