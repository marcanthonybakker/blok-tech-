// // Haal wachtwoorden en andere data uit de .env file
require("dotenv").config();

// MongoDB connectie test ruimte
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.DB_PASSWORD;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
console.log("uri: ", uri);
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    console.log("DB werkt");
  }
}
run().catch(console.dir);








// Server express en ejs laten gebruiken
const express = require("express");
const app = express();
const ejs = require("ejs");

// Gebruiker data (nep data omdat ik nog geen database heb)
const gebruikerData = "Marc Bakker (server data)";

// Variabelen om geposte gegevens op te slaan
let plaatsData = "";
let hobbyData = "";
let datumData = "";
let beschrijvingData = "";

// Templating engine aanzetten met statische content en geposte data ophalen
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));

// Formulier pagina https link
app.get("/", (req, res) => {
  res.render("form.ejs", { gebruikerData });
});

app.post('/berichten', function(req, res) {
  plaatsData = req.body.plaats;
  hobbyData = req.body.hobbys;
  datumData = req.body['trip-start'];
  beschrijvingData = req.body.beschrijving;

  // Hier kun je de gegevens verder verwerken, bijvoorbeeld opslaan in een database of uitvoeren van andere logica

  // Doorsturen naar /berichten
  res.redirect("/berichten");
});

// Berichten pagina https link
app.get("/berichten", (req, res) => {
  res.render("berichten.ejs", { 
    plaatsData,
    hobbyData,
    datumData,
    beschrijvingData,
    gebruikerData
  });
});

// Error 404: ontbrekende pagina of onjuist pad
app.get("/*", (req, res) => {
  res.status(404);
  res.render("error.ejs");
})

// Server open zetten op poort 3000
app.listen(3000, () => {
  console.log("Server draait op poort 3000");
});

