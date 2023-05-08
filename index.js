const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

express()
  .get("/", onhome)
  .get("/about", onabout)
  .get("/login", onlogin)
  .use(onNotFound)
  .listen(8000);

function onhome(req, res) {
  res.send("<h1>Hello World!</h1>");
  // app.get('/', (req, res) => {
  //     const data = {
  //       pageTitle: 'My Website',
  //       currentDate: new Date().toDateString()
  //     };
  //     res.render('index', data); // Render the index.ejs template with the provided data
  //   });
}

function onabout(req, res) {
  res.send("<h1>About me</h1>");
}

function onlogin(req, res) {
  res.send("<h1>Login</h1>");
}

function onNotFound(req, res) {
  res.status(404).send("<h1>Error 404: Page not found</h1>");
}
