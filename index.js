/*************************************/
/* MongoDB aanzetten, basic security */
/*************************************/

// Haal wachtwoorden en andere data uit de .env file
require("dotenv").config();

// MongoDB connectie
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.DB_PASSWORD;

// Creëer een MongoClient met een MongoClientOptions object om de stabiele API-versie in te stellen.
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
      "Je hebt een verbinding gemaakt met MongoDB en succesvol een 'ping' naar je implementatie gestuurd!"
    );
  } finally {
    console.log("DB werkt");
  }
}
run().catch(console.dir);





/************************/
/* Vaak opgeroepde code */
/************************/

// Server express en ejs laten gebruiken
const express = require("express");
const app = express();
const ejs = require("ejs");

// collectie van de database aanroepen
const collectionGebruikerData = client
  .db("bloktech")
  .collection("gebruikersNaam");
const collectionFormulierData = client
  .db("bloktech")
  .collection("formulierDataCollectie");

// Variabelen om geposte gegevens op te slaan
let plaatsData = "";
let hobbyData = "";
let datumData = "";
let beschrijvingData = "";
let gebruikerData = "";

// Templating engine aanzetten met statische content en geposte data ophalen
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));





/*****************************************************/
/* Formulier pagina route, data RECIEVE van database */
/*****************************************************/

// Formulier pagina https link
app.get("/", async (req, res) => {
  const gebruikerData = await collectionGebruikerData.find({}).toArray();
  res.render("form.ejs", { gebruikerData });
});





/***************************************************************/
/* Berichten pagina route, data CREATE en RECIEVE van database */
/***************************************************************/

// Formulier gegevens naar de database sturen
async function stopDataInDatabase(data) {
  try {
    // Verbind met de database
    await client.connect();

    // Selecteer de gewenste database en collectie
    const db = client.db("bloktech");

    // Voeg de gegevens toe aan de collectie
    const result = await collectionFormulierData.insertOne(data);
    console.log(
      "Gegevens zijn succesvol toegevoegd aan de database:",
      result.insertedId
    );
  } catch (err) {
    console.error("Fout bij het toevoegen van gegevens aan de database:", err);
  }
}

// Formulier gegevens ophalen en doorsturen naar de database
app.post("/berichten", async function (req, res) {
  plaatsData = req.body.plaats;
  hobbyData = req.body.hobbys;
  datumData = req.body["trip-start"];
  beschrijvingData = req.body.beschrijving;

  // Gegevens opslaan in een object
  const formulierData = {
    plaatsData,
    hobbyData,
    datumData,
    beschrijvingData,
  };

  try {
    // Gegevens naar de database sturen
    await stopDataInDatabase(formulierData);
    // Doorsturen naar /berichten
    res.redirect("/berichten");
  } catch (err) {
    console.error("Fout bij het verwerken van gegevens:", err);
    // Stuur een foutmelding naar de gebruiker
    res.render("error.ejs");
  }
});

// Laad de berichten pagina met de gegevens uit de database
app.get("/berichten", async (req, res) => {
  try {
    const gebruikerData = await collectionGebruikerData.find({}).toArray();
    const plaatsData = await collectionFormulierData.find({}).toArray();
    const hobbyData = await collectionFormulierData.find({}).toArray();
    const datumData = await collectionFormulierData.find({}).toArray();
    const beschrijvingData = await collectionFormulierData.find({}).toArray();

    if (
      // Check of er gegevens in de database staan, zo niet geef dummy data door
      plaatsData.length === 0 ||
      hobbyData.length === 0 ||
      datumData.length === 0 ||
      beschrijvingData.length === 0
    ) {
      // Genereer dummy data
      const dummyData = {
        gebruikerData: [{ gebruikerData: "" }],
        plaatsData: [{ plaatsData: "Nog geen formulier ingevuld" }],
        hobbyData: [{ hobbyData: "Nog geen formulier ingevuld" }],
        datumData: [{ datumData: "Nog geen formulier ingevuld" }],
        beschrijvingData: [{ beschrijvingData: "Nog geen formulier ingevuld" }],
      };

      // Geef de dummy data door aan de template
      res.render("berichten.ejs", dummyData);
    } else {
      // Geef de opgehaalde gegevens door aan de template
      res.render("berichten.ejs", {
        gebruikerData,
        plaatsData,
        hobbyData,
        datumData,
        beschrijvingData,
      });
    }
  } catch (err) {
    console.error("Fout bij het ophalen van gegevens:", err);
  }
});





/******************************************************************/
/* Route voor wanneer een niet bestaande pagina wordt aangevraagd */
/******************************************************************/

// Error 404: ontbrekende pagina of onjuist pad
app.get("/*", (req, res) => {
  res.status(404);
  res.render("error.ejs");
});





/**********************************************/
/* Het prototype openzetten op localhost 3000 */
/**********************************************/

// Server open zetten op poort 3000
app.listen(3000, () => {
  console.log("Server draait op poort 3000");
});