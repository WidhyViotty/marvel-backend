const express = require("express");
const formidable = require("express-formidable");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors());

app.get("/characters", async (req, res) => {
  try {
    if (req.query.name) {
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.apiKey}&limit=${req.query.limit}&skip=${req.query.skip}&name=${req.query.name}`
      );
      res.json(response.data);
    } else {
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.apiKey}&limit=${req.query.limit}&skip=${req.query.skip}`
      );
      res.json(response.data);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.apiKey}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/comics/:characterId", async (req, res) => {
  try {
    console.log(req.params);
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.apiKey}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/character/:characterId", async (req, res) => {
  try {
    console.log(req.params);
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${character._id}?apiKey=${process.env.apiKey}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json("Page introuvable");
});

app.listen(process.env.PORT, () => {
  console.log("Server started !");
});
