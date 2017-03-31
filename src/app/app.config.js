"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Created by martin on 23.03.2017.
 * Configuration Data of the application.
 */
var AppConfig = (function () {
    function AppConfig() {
    }
    return AppConfig;
}());
exports.AppConfig = AppConfig;
exports.APP_CONFIG_VALUE = {
    // set values here
    'BUILDVERSION': '0.0.1',
    'BUILDTIME': '24.03.2017',
};
exports.APP_CONFIG = new core_1.InjectionToken('app.config');
