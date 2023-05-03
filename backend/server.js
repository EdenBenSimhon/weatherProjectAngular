const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cordi = require ("./model/coordinators")
const findJSON = require("./routes/findDataInJSON");
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
  const response1 = await axios.get("https://api.geoapify.com/v1/geocode/reverse?lat="+parseFloat(coordinates[0])+"&lon="+parseFloat(coordinates[1])+"&apiKey=e1cea055d0c345dc9853bc28ccead0d7");
  var location = api.findAddressNameInJSON(response1.data);
  const response2 = await axios.get("https://api.open-meteo.com/v1/forecast?latitude="+parseFloat(coordinates[0])+"&longitude="+parseFloat(coordinates[1])+"&current_weather=true&hourly=rain&timezone=auto");
  console.log(location)
  var weather = api.findTemperatureAndRainInJSON(response2.data);
   console.log(weather)
  var result = location + weather;
  res.status(200).json({

  });

});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

