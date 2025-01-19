import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import pgp from "pg-promise";
import { checkDatabaseConnection } from './db.js';
import schedule from "node-schedule";

import habitRoutes from "./Routers/habits.js";

const app = express();
const PORT = 3000;

app.use(express.static(path.join('../virtues-and-vices/public')));
app.use(express.json());

// Connect Routers
app.use('/api', habitRoutes);

await checkDatabaseConnection();
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

app.get("/", (req, res) => {
  //send index.html file
  res.sendFile("index.html");
});

app.get("/stats", (req, res) => {
  //send index.html file
  res.sendFile("stats.html");
});

app.get("/config", (req, res) => {
  //send index.html file
  res.sendFile("config.html");
});

//const pgp = require('pg-promise')({/* Initialization Options */});
//const db = pgp('postgres://postgres:MooDengDB@localhost:5432/Virtuosi');

/*
db.one('SELECT $1 AS value', 123)
  .then((data) => {
    console.log('DATA:', data.value)
  })
  .catch((error) => {
    console.log('ERROR:', error)
  })
*/
  
const globalResetJob = schedule.scheduleJob('0 0 * * *', () => {
  //yourVar = 1;
});

/* EXAMPLE
let yourVar = 12345;
  
const globalResetJob = schedule.scheduleJob('0 0 * * *', () => {
  yourVar = 1;
});
*/