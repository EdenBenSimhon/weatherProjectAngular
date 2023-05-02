import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {response} from "express";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'weatherProjectAngular';
  message: any
  latLong: any

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.getLocation();
    //this.postCoordinates(this.latLong)
    //this.getData();

  }

  /*getData() {

    this.httpClient.get<any>('http://localhost:3000').subscribe((response: any) => {
      this.message = response;
      console.log(response)
    });
  }
  */


  getLocation() {

    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      this.latLong = {"latitude": coords.latitude , "longitude:" :coords.longitude};
      //this.latLong = [coords.latitude, coords.longitude];
      console.log(`lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`);
      this.postCoordinates(this.latLong)
    });
  }
  postCoordinates(latLong:any) {
    this.httpClient.post('http://localhost:3000', JSON.stringify(this.latLong), {})
      .subscribe(data => {
        //console.log(data);
        this.message = data.toLocaleString();
        console.log(data)
      });
  }
}






