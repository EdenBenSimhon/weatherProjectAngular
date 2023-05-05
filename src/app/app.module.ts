import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import { WeatherWindowComponent } from './weather-window/weather-window.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    WeatherWindowComponent
  ],
  imports: [
    BrowserModule ,
    HttpClientModule,
    RouterModule.forRoot([{path: '', component:AppComponent}])
  ],
  providers: [],
  bootstrap: [AppComponent,WeatherWindowComponent]
})
export class AppModule { }
