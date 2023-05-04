const https = require("https");
const express = require("express");
const app = express();
const request = require('request');
const axios = require("axios");




//The function addresses the API with coordinates in order to get the location name of the coordinates
async function getLocation(coordinates){
  var jsonLocation = await axios.get("https://api.geoapify.com/v1/geocode/reverse?lat="+parseFloat(coordinates[0])+"&lon="+parseFloat(coordinates[1])+"&apiKey=e1cea055d0c345dc9853bc28ccead0d7");
  return await findAddressNameInJSON(jsonLocation.data)
}
//The function addresses the API with coordinates in order to receive the weather at the sent location
async function  getWeather(coordinates) {
  console.log(coordinates)
  var jsonWeather = await axios.get("https://api.open-meteo.com/v1/forecast?latitude="+parseFloat(coordinates[0])+"&longitude="+parseFloat(coordinates[1])+"&current_weather=true&hourly=rain&timezone=auto");
  return await findTemperatureAndRainInJSON(jsonWeather.data)
}



//The function extracts the coordinates from the received data requested from the client
function getCoordinatesFromClient(data) {
  return [data['latitude'],data['longitude']];
}

//The function extracts the address name from the information received as a result of the application to the API
async function findAddressNameInJSON(details){
  //temp = JSON.parse(details)
  var country = details.features[0].properties.country;
  var city = details.features[0].properties.city;
  var location = { "address": city +","+ country}
  return  location;
}


//The function extracts the weather and rain from the information received as a result of the application to the API
async function findTemperatureAndRainInJSON(details) {
  var temperature = details.current_weather.temperature;
  var liveTime = details.current_weather.time;
  var lastHour = parseInt(liveTime.substring(11, 13));
  console.log(lastHour)//getTheLastHour
  var rain = (details.hourly.rain);
  temperatureAndSumOfRain = {
    "temperature": Math.round(temperature) ,
    "rain": rain[lastHour]
  }
  return temperatureAndSumOfRain;
}


function WhatToWearToday(weather){
  var recommendation;
  if(weather['temperature']>=22&& weather['rain'] == 0)
  {
    recommendation = "לבוש קצר";
  }
  else if (weather['temperature']<22 && weather['rain']==0){
    recommendation= "לבוש ארוך"
  }
  else {
    recommendation = "מעיל"
  }

  return recommendation;


}


module.exports = {getLocation,getWeather,getCoordinatesFromClient,WhatToWearToday}
