import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BannerComponent } from './banner-inline/banner-inline.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserService } from './user.service'; //I'm confused about registering services globally



@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
