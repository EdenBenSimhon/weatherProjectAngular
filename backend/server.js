const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cordi = require ("./model/coordinators")
const axios = require('axios');
const api = require("./routes/api")
const app = express();
let savedData;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/',async (req, res) => {
  var data = req.body;
  var coordinates = api.getCoordinatesFromClient(data);
  const location = await api.getLocation(coordinates);
  const weather = await api.getWeather(coordinates)
  var wear = api.WhatToWearToday(weather);
  console.log()
   console.log(weather)
  res.status(200).json({
    weather,
    location ,
     wear
  });

});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

