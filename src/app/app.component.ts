import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {response} from "express";
import {WeatherService} from "./weather-window/weather.service";
import {WeatherInterface} from "./weather-window/weather.interface";
import * as express from 'express';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'weatherProjectAngular';
}






