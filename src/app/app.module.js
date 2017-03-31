"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_config_1 = require("./app.config");
var app_routing_1 = require("./app.routing");
require("hammerjs");
var material_1 = require("@angular/material");
var flex_layout_1 = require("@angular/flex-layout");
var app_component_1 = require("./app.component");
var project_starter_component_1 = require("./project-starter/project-starter.component");
var tiny_translator_service_1 = require("./model/tiny-translator.service");
var translation_file_status_component_1 = require("./translation-file-status/translation-file-status.component");
var home_page_component_1 = require("./home-page/home-page.component");
var translate_page_component_1 = require("./translate-page/translate-page.component");
var translate_unit_component_1 = require("./translate-unit/translate-unit.component");
var downloader_service_1 = require("./model/downloader.service");
var translate_unit_list_component_1 = require("./translate-unit-list/translate-unit-list.component");
var abbreviate_pipe_1 = require("./common/abbreviate.pipe");
var language_component_1 = require("./language/language.component");
var active_project_guard_1 = require("./active-project.guard");
var backend_service_api_1 = require("./model/backend-service-api");
var backend_local_storage_service_1 = require("./model/backend-local-storage.service");
var project_component_1 = require("./project/project.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            project_starter_component_1.ProjectStarterComponent,
            translation_file_status_component_1.TranslationFileStatusComponent,
            home_page_component_1.HomePageComponent,
            translate_page_component_1.TranslatePageComponent,
            translate_unit_component_1.TranslateUnitComponent,
            translate_unit_list_component_1.TranslateUnitListComponent,
            language_component_1.LanguageComponent,
            abbreviate_pipe_1.AbbreviatePipe,
            project_component_1.ProjectComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            app_routing_1.routing,
            material_1.MaterialModule,
            flex_layout_1.FlexLayoutModule
        ],
        providers: [
            { provide: app_config_1.APP_CONFIG, useValue: app_config_1.APP_CONFIG_VALUE },
            app_routing_1.appRoutingProviders,
            tiny_translator_service_1.TinyTranslatorService,
            downloader_service_1.DownloaderService,
            active_project_guard_1.ActiveProjectGuard,
            { provide: backend_service_api_1.BackendServiceAPI, useClass: backend_local_storage_service_1.BackendLocalStorageService }
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
