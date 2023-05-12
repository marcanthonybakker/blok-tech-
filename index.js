const express = require('express');
const app = express();
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('aap');
});

app.listen(3000, () => {
  console.log("Whats up! The server has started on port 3000. Have fun!");
});