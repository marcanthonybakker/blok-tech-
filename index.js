// // Haal wachtwoorden en andere data uit de .env file
require('dotenv').config(); 

// MongoDB connectie test ruimte
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DB_PASSWORD;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
console.log('uri: ', uri)
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    console.log("DB werkt");
  }
}
run().catch(console.dir);

// Server express en ejs laten gebruiken
const express = require('express');
const app = express();
const ejs = require('ejs');

// Gebruiker data (nep data omdat ik nog geen database heb)
const gebruikerData = 'Marc Bakker (server data)';

// Test data uit database halen
app.get('/data', async (req, res) => {
  const collection = client.db("bloktech").collection("gebruikersNaam");
  const data = await collection.find({}).toArray();
  res.send(data);
})

// Templating engine aanzetten met statische content
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('static'));



// NIEUW
app.use(express.urlencoded({ extended: true }));





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

