// // Haal wachtwoorden en andere data uit de .env file
require("dotenv").config();

//-

// MongoDB connectie test ruimte
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.DB_PASSWORD;

//-

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

//-

// Server express en ejs laten gebruiken
const express = require("express");
const app = express();
const ejs = require("ejs");

// collectie van de database aanroepen
const collectionGebruikerData = client.db("bloktech").collection("gebruikersNaam");
const collectionFormulierData = client.db("bloktech").collection("formulierDataCollectie");

//-

// Formulier gegevens naar de database sturen
async function insertDataToDatabase(data) {
  try {
    // Verbind met de database
    await client.connect();

    // Selecteer de gewenste database en collectie
    const db = client.db("bloktech");

    // Voeg de gegevens toe aan de collectie
    const result = await collectionFormulierData.insertOne(data);
    console.log("Gegevens zijn succesvol toegevoegd aan de database:", result.insertedId);
  } catch (err) {
    console.error("Fout bij het toevoegen van gegevens aan de database:", err);
  } finally {
    // Sluit de verbinding met de database
    await client.close();
  }
}

// Variabelen om geposte gegevens op te slaan
let plaatsData = "";
let hobbyData = "";
let datumData = "";
let beschrijvingData = "";

//-

// Templating engine aanzetten met statische content en geposte data ophalen
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));

//-

// Formulier pagina https link
app.get("/", async (req, res) => {
  const gebruikerData = await collectionGebruikerData.find({}).toArray();
  res.render("form.ejs", { gebruikerData });
});

//-

// Formulier gegevens ophalen en doorsturen naar de database
app.post('/berichten', async function(req, res) {
  plaatsData = req.body.plaats;
  hobbyData = req.body.hobbys;
  datumData = req.body['trip-start'];
  beschrijvingData = req.body.beschrijving;

  // Gegevens opslaan in een object
  const formulierData = {
    plaatsData,
    hobbyData,
    datumData,
    beschrijvingData
  };

  try {
    // Gegevens naar de database sturen
    await insertDataToDatabase(formulierData);

    // Doorsturen naar /berichten
    res.redirect("/berichten");
  } catch (err) {
    console.error("Fout bij het verwerken van gegevens:", err);
    // Stuur een foutmelding naar de gebruiker
    res.render("error.ejs");
  }
});

//-

// Berichten pagina https link
app.get("/berichten", async (req, res) => {
  try {
    const gebruikerData = await collectionGebruikerData.find({}).toArray();
    res.render("berichten.ejs", { 
      plaatsData,
      hobbyData,
      datumData,
      beschrijvingData,
      gebruikerData
    });
  } catch (err) {
    console.error("Fout bij het ophalen van formulier data", err);
  }
});

//-

// Data ophalen uit de database oefening
app.get("/data", async (req, res) => {
  try {
    const gebruikerData = await collectionGebruikerData.find({}).toArray();
    const formulierData = await collectionFormulierData.find({}).toArray();
    res.render("data.ejs", { gebruikerData, plaatsData });
  } catch (err) {
    console.error("Fout bij het ophalen van gegevens:", err);
  }
});

//-

// Error 404: ontbrekende pagina of onjuist pad
app.get("/*", (req, res) => {
  res.status(404);
  res.render("error.ejs");
})

//-

// Server open zetten op poort 3000
app.listen(3000, () => {
  console.log("Server draait op poort 3000");
});