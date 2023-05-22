// Server express en ejs laten gebruiken
const express = require('express');
const app = express();
const ejs = require('ejs');

// Templating engine aanzetten met statische content
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('static'));

// Formulier pagina https link
app.get('/', (req, res) => {
  res.render('form.ejs');
});

// Berichten pagina https link
app.get('/berichten', (req, res) => {
  res.render('berichten.ejs');

  //nep data om dynamisch te plaatsen op mijn template pagina's
  const plaatsData = 'Dit is mijn stringgegevens vanuit de server!';
  const hobbyData = 'Dit is mijn stringgegevens vanuit de server!';
  const datumData = 'Dit is mijn stringgegevens vanuit de server!';
  const beschrijvingData = 'Dit is mijn stringgegevens vanuit de server!';
  res.render('berichten.ejs', { plaatsData, hobbyData, datumData, beschrijvingData });
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

// app.post('/', (req, res) => {
//   // Haal de formuliervelden op uit de request body
//   const plaats = req.body.plaats;
//   const hobby = req.body.hobbys;
//   const datum = req.body.datum;
//   const beschrijving = req.body.beschrijving;

  
//   // Stuur een succesreactie terug naar de client
//   res.send('Uitnodiging succesvol verstuurd!');
//   console.log(plaats, hobby, datum, beschrijving);
// });