"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var backend_service_api_1 = require("./backend-service-api");
var BackendLocalStorageService = (function (_super) {
    __extends(BackendLocalStorageService, _super);
    function BackendLocalStorageService() {
        return _super.call(this) || this;
    }
    /**
     * Store a project.
     */
    BackendLocalStorageService.prototype.store = function (project) {
        console.log('project stored in local storage');
        // TODO
    };
    /**
     * Get all stored projects.
     */
    BackendLocalStorageService.prototype.projects = function () {
        console.log('projects retrieved from local storage');
        return []; // TODO
    };
    return BackendLocalStorageService;
}(backend_service_api_1.BackendServiceAPI));
BackendLocalStorageService = __decorate([
    core_1.Injectable()
], BackendLocalStorageService);
exports.BackendLocalStorageService = BackendLocalStorageService;
