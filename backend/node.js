var http = require('http')
var fs = require('fs');
var api = require('./OpenMeteoAPI')
const https = require("https");
const request = require("request");
const bodyParser = require('body-parser');
var details = ""
const querystring = require('querystring');
const {parse} = require("request/lib/cookies");
var lat =""
var long =""
var temp =""

http.createServer(function (request, response) {
  response.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  });
  if(request.method=='POST') {

    request.on('data', (chunk) => {
      console.log(chunk.toString())
       temp += chunk.toString()
    });
    request.on('end',()=>{
      console.log(temp)

    })
  } //if the method is POST we need get the coordination from params
  //readAPIWeather();
    readAPILocation();
  response.end(JSON.stringify(details));
}).listen(3000,  () => {
  console.log('Server started on port 3000');
});

const url = "https://api.open-meteo.com/v1/forecast?latitude="+parseFloat(1)+"&longitude="+parseFloat(1)+"&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m";
function  readAPIWeather() {
  cleanString();
  https.get(url, (resp) => {
    let data = ""
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      details += chunk;
    });

    resp.on('end', () => {
      //console.log(JSON.parse(data));
      console.log(details);
      lat=""
      long =""
    });


  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });



}
function cleanString(){
  let body =0;
  for (let i =0; i <temp.length; i++) {
    if (temp[i] == ",") {
      body = 1
    }
    if (temp[i] != "[" && temp[i] != "]" && body == 0) {
      lat += temp[i].toString();
    } else if (temp[i] != "[" && temp[i] != "]" && body == 1) {
      long += temp[i].toString();
    }
  }
  long = long.substring(1)
  console.log("lat value:  " +1 +"   long value  :" + 1);

}
function readAPILocation(){
const url1 =  "https://api.geoapify.com/v1/geocode/reverse?lat=32.079872&lon=34.9831168&apiKey=e1cea055d0c345dc9853bc28ccead0d7"


  https.get(url1, (resp) => {
    let data = ""
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      details += chunk;
    });

    resp.on('end', () => {

      console.log(details);
    })
  });
}


