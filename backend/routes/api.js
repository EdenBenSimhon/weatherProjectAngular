const https = require("https");
const findJSON = require("./findDataInJSON");
const express = require("express");
const app = express();
const request = require('request');

var details =""
async function getLocation(latLong){
  console.log(latLong)
  let data=""
  const url1 =  "https://api.geoapify.com/v1/geocode/reverse?lat="+parseFloat(latLong[0])+"&lon="+parseFloat(latLong[1])+"&apiKey=e1cea055d0c345dc9853bc28ccead0d7"
  https.get(url1, (resp) => {
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
      //console.log(chunk)

    });
    resp.on('end', () => {
      //findNameLocationFromJSON();
      //console.log(findAddressNameInJSON(data));
    })
  });
  //console.log(findAddressNameInJSON(data))
  console.log(data);
}
async function  getWeather(coordinates) {
  var details="";
  let data = ""
  const url = "https://api.open-meteo.com/v1/forecast?latitude="+parseFloat(coordinates[0])+"&longitude="+parseFloat(coordinates[1])+"&current_weather=true&hourly=rain&timezone=auto";
  https.get(url, (resp) => {
    resp.on('data', (chunk) => {
      details += chunk;
    });

    resp.on('end', () => {

     findTemperatureAndRainInJSON(details)
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  console.log(details)

  return data;
}


function getCoordinatesFromClient(data) {
  console.log(data)
  return [data['latitude'],data['longitude']];
  //var temp = JSON.parse(chunk.toString())
  //temp = Object.values(temp)
  //lat = parseFloat(temp[0]);
  //long = parseFloat(temp[1]);
  //console.log("getCoordinatesFromClient");
  //return [lat ,long] ;

}


function findAddressNameInJSON(details){
  //temp = JSON.parse(details)
  var finaldata = details['features']
  console.log(Object.keys(finaldata))
  var ca =finaldata['0']
  var tempCountry = ca['properties']
  var country = tempCountry['country']
  var city = tempCountry['city']

  var location = { "address": city +","+ country}
  return location;
}


function checkTheRule(location,weather){
  var recommend =''
  if(weather['temperature']>22&& weather['rain'] == 0)
  {
    recommend = "לבוש קצר";
  }
  else if (weather['temperature']<=22 && weather['rain']==0){
    recommend= "לבוש ארוך"
  }
  else {
    recommend = "מעיל"
  }
  var finalResult = {
    "temperature": weather['temperature'] ,
    "address" : location['address'],
    "recommend" : recommend
  }
  return finalResult;


}


function getResponse(chunk){
  var coordinates = getCoordinatesFromClient(chunk);
  getWeather(coordinates);




}

function findTemperatureAndRainInJSON(details) {
  //var temp = JSON.parse(details)

  var finalData = details['current_weather'];
  var temperature = finalData["temperature"]
  var findTheTimeNow = finalData['time'];
  var counter = findTheTimeNow.substring(11, 13);
  var tempOfRain = details['hourly']
  var tempOfTempRain = tempOfRain['rain']
  returnTheData = {
    "temperature": temperature,
    "rain": tempOfTempRain[counter]
  }
  return returnTheData;
}

module.exports = {getLocation,getWeather,getResponse,getCoordinatesFromClient,findAddressNameInJSON,findTemperatureAndRainInJSON}
