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
import {TinyTranslatorService} from './model/tiny-translator.service';
import { TranslationFileStatusComponent } from './translation-file-status/translation-file-status.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TranslatePageComponent } from './translate-page/translate-page.component';
import { TranslateUnitComponent } from './translate-unit/translate-unit.component';
import {DownloaderService} from './model/downloader.service';
import { TranslateUnitListComponent } from './translate-unit-list/translate-unit-list.component';
import { AbbreviatePipe } from './common/abbreviate.pipe';
import { LanguageComponent } from './language/language.component';
import {ActiveProjectGuard} from './active-project.guard';
import {BackendServiceAPI} from './model/backend-service-api';
import {BackendLocalStorageService} from './model/backend-local-storage.service';
import { ProjectComponent } from './project/project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ProjectStarterComponent,
    TranslationFileStatusComponent,
    HomePageComponent,
    TranslatePageComponent,
    TranslateUnitComponent,
    TranslateUnitListComponent,
    LanguageComponent,
    AbbreviatePipe,
    ProjectComponent,
    ProjectListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    routing,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    {provide: APP_CONFIG, useValue: APP_CONFIG_VALUE},
    appRoutingProviders,
    TinyTranslatorService,
    DownloaderService,
    ActiveProjectGuard,
    {provide: BackendServiceAPI, useClass: BackendLocalStorageService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
