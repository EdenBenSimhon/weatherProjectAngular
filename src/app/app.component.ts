import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {response} from "express";
import {WeatherService} from "./wheater-window/weather.service";
import {WeatherInterface} from "./wheater-window/weather.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'weatherProjectAngular';

}






