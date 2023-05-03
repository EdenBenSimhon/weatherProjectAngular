const https = require("https");
const express = require("express");
const app = express();
const request = require('request');

var details =""
 async function getLocation(latLong){
  return new Promise((resolve,reject) =>{
  var data=""
  console.log(latLong)
  const url1 =  "https://api.geoapify.com/v1/geocode/reverse?lat="+parseFloat(latLong[0])+"&lon="+parseFloat(latLong[1])+"&apiKey=e1cea055d0c345dc9853bc28ccead0d7"
   request(url1, (error, response, body) => {
    if (error) {
      console.error(error);
    } else {
      data = JSON.parse(body);
      console.log(data)

    // ... save the data to a variable or database
    }
  });
  console.log(data)

 })
}
module.exports={getLocation}
