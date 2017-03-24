import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {APP_CONFIG, APP_CONFIG_VALUE} from './app.config';
import {routing, appRoutingProviders} from './app.routing';

import 'hammerjs';
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { ProjectStarterComponent } from './project-starter/project-starter.component';
import {TinyTranslatorService} from './tiny-translator.service';
import { TranslationFileStatusComponent } from './translation-file-status/translation-file-status.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TranslatePageComponent } from './translate-page/translate-page.component';
import { TranslateUnitComponent } from './translate-unit/translate-unit.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectStarterComponent,
    TranslationFileStatusComponent,
    HomePageComponent,
    TranslatePageComponent,
    TranslateUnitComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    {provide: APP_CONFIG, useValue: APP_CONFIG_VALUE},
    appRoutingProviders,
    TinyTranslatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
