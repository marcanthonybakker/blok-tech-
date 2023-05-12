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
  res.render('form');
});

// Server open zetten op port 3000
app.listen(3000, () => {
  console.log("Server aan op port 3000");
});