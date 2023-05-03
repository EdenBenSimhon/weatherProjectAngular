var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const JSONfile = require("./routes/findDataInJSON")
const api = require ("./routes/api")
const querystring = require('querystring')

var http = require('http')
var fs = require('fs');
const https = require("https");
const request = require("request");
const bodyParser = require('body-parser');
var details = ""
const querystring = require('querystring');
const {parse} = require("request/lib/cookies");
var lat =""
var long =""
var temp =""
var returnTheData =''
var result=""

http.createServer(function (request, response) {
  response.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  });
  if(request.method=='POST') {

    request.on('data', (chunk) => {

       result = api.getResponse(chunk);
      const cordi = require ("./model/coordinators")


    });
    request.on('end',()=>{

    })

  }
  console.log(querystring.parse(result))
  //  readAPILocation();
  response.end(JSON.stringify("hello"));
}).listen(3000,  () => {
  console.log('Server started on port 3000');
});











/*
function  readAPIWeather() {
  const url = "https://api.open-meteo.com/v1/forecast?latitude="+parseFloat(lat)+"&longitude="+parseFloat(long)+"&current_weather=true&hourly=rain&timezone=auto";
  https.get(url, (resp) => {
    let data = ""
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      details += chunk;

    });

    resp.on('end', () => {
      //console.log(JSON.parse(data));
      findTheTemperatureAndRain();

    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  console.log("readAPIWeather");

}
*/

/*
function readAPILocation(){
const url1 =  "https://api.geoapify.com/v1/geocode/reverse?lat="+parseFloat(lat)+"&lon="+parseFloat(long)+"&apiKey=e1cea055d0c345dc9853bc28ccead0d7"

  https.get(url1, (resp) => {
    let data = ""
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      details += chunk;
    });

    resp.on('end', () => {
      findNameLocationFromJSON();

    })
  });

  console.log("readAPILocation");
}


*/
/*

function findTheTemperatureAndRain(){
  temp = JSON.parse(details)

  var finalData = temp['current_weather'];
  var temperature = finalData["temperature"]
  var findTheTimeNow =finalData['time'];
  console.log(findTheTimeNow)
  var counter = findTheTimeNow.substring(11,13);
  console.log(counter)
  var tempOfRain = temp['hourly']
  console.log(tempOfRain['rain'])
  var tempOfTempRain=tempOfRain['rain']
  console.log(tempOfTempRain[counter])
  returnTheData = {
    "temperature": temperature ,
    "rain": tempOfTempRain[counter]
  }
  return returnTheData;

}
*/






/*function checkTheRule(location,weather){
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
 */



