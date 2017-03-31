"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var translation_file_1 = require("../model/translation-file");
var TranslateUnitListComponent = (function () {
    function TranslateUnitListComponent() {
        this.translationFile = new translation_file_1.TranslationFile(null);
    }
    Object.defineProperty(TranslateUnitListComponent.prototype, "translationFile", {
        get: function () {
            return this._translationFile;
        },
        set: function (file) {
            if (file) {
                this._translationFile = file;
            }
            else {
                this._translationFile = new translation_file_1.TranslationFile(null);
            }
        },
        enumerable: true,
        configurable: true
    });
    TranslateUnitListComponent.prototype.ngOnInit = function () {
    };
    TranslateUnitListComponent.prototype.transUnits = function () {
        return this.translationFile.scrollabeTransUnits();
    };
    TranslateUnitListComponent.prototype.showAll = function () {
        this.translationFile.setScrollModeAll();
    };
    TranslateUnitListComponent.prototype.showUntranslated = function () {
        this.translationFile.setScrollModeUntranslated();
    };
    TranslateUnitListComponent.prototype.selectTransUnit = function (tu) {
        this.translationFile.selectTransUnit(tu);
    };
    return TranslateUnitListComponent;
}());
__decorate([
    core_1.Input()
], TranslateUnitListComponent.prototype, "translationFile", null);
TranslateUnitListComponent = __decorate([
    core_1.Component({
        selector: 'app-translate-unit-list',
        templateUrl: './translate-unit-list.component.html',
        styleUrls: ['./translate-unit-list.component.css']
    })
], TranslateUnitListComponent);
exports.TranslateUnitListComponent = TranslateUnitListComponent;
