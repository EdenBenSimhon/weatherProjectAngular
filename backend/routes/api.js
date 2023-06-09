const https = require("https");
const express = require("express");
const app = express();
const request = require('request');
const axios = require("axios");
const  limitTemperature=22;


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
  var country = details.features[0].properties.country;
  var city = details.features[0].properties.city;
  var location = { "address": city +","+ country}
  return  location;
}

//The function extracts the weather and rain from the information received as a result of the application to the API
async function findTemperatureAndRainInJSON(details) {
  var temperature = details.current_weather.temperature;
  var realTime = details.current_weather.time;
  var lastHour = parseInt(realTime.substring(11, 13));
  var rain = (details.hourly.rain);
  temperatureAndSumOfRain = {
    "temperature": Math.round(temperature) ,
    "rain": rain[lastHour]
  }
  return temperatureAndSumOfRain;
}

//The function determines what to wear today
function WhatToWearToday(weather){
  if(weather['temperature']>=limitTemperature&& weather['rain'] == 0)
  {
    return  "לבוש קצר";
  }
  else if (weather['temperature']<limitTemperature && weather['rain']==0){
    return "לבוש ארוך";
  }
  else {
    return "מעיל";
  }
}

module.exports = {getLocation,getWeather,getCoordinatesFromClient,WhatToWearToday}
