import express from "express";
import path from "path";

const app = express();
const PORT = 3000;

app.use(express.static(path.join('../virtues-and-vices/public')));

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