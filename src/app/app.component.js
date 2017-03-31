"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_config_1 = require("./app.config");
var AppComponent = (function () {
    function AppComponent(APP_CONFIG) {
        this.APP_CONFIG = APP_CONFIG;
        this.title = 'app works!';
    }
    AppComponent.prototype.buildtime = function () {
        return this.APP_CONFIG.BUILDTIME;
    };
    AppComponent.prototype.buildversion = function () {
        return this.APP_CONFIG.BUILDVERSION;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss']
    }),
    __param(0, core_1.Inject(app_config_1.APP_CONFIG))
], AppComponent);
exports.AppComponent = AppComponent;
