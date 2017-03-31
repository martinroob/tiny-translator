"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Component to input a new translation.
 * It shows the source and allows to input the target text.
 */
var TranslateUnitComponent = (function () {
    function TranslateUnitComponent() {
    }
    TranslateUnitComponent.prototype.ngOnInit = function () {
    };
    TranslateUnitComponent.prototype.ngOnChanges = function (changes) {
        var changedTranslationUnit = changes['translationUnit'];
        if (changedTranslationUnit) {
            if (changedTranslationUnit.currentValue) {
                this._editedTargetText = changedTranslationUnit.currentValue.targetContent();
            }
            else {
                this._editedTargetText = '';
            }
        }
    };
    TranslateUnitComponent.prototype.transUnitID = function () {
        if (this.translationUnit) {
            return this.translationUnit.id();
        }
        else {
            return '';
        }
    };
    TranslateUnitComponent.prototype.targetState = function () {
        if (this.translationUnit) {
            return this.translationUnit.targetState();
        }
        else {
            return '';
        }
    };
    TranslateUnitComponent.prototype.targetLanguage = function () {
        if (this.translationUnit) {
            return this.translationUnit.translationFile().targetLanguage();
        }
        else {
            return '';
        }
    };
    TranslateUnitComponent.prototype.sourceContent = function () {
        if (this.translationUnit) {
            return this.translationUnit.sourceContent();
        }
        else {
            return '';
        }
    };
    TranslateUnitComponent.prototype.sourceLanguage = function () {
        if (this.translationUnit) {
            return this.translationUnit.translationFile().sourceLanguage();
        }
        else {
            return '';
        }
    };
    TranslateUnitComponent.prototype.sourceDescription = function () {
        if (this.translationUnit) {
            return this.translationUnit.description();
        }
        else {
            return '';
        }
    };
    TranslateUnitComponent.prototype.sourceMeaning = function () {
        if (this.translationUnit) {
            return this.translationUnit.meaning();
        }
        else {
            return '';
        }
    };
    TranslateUnitComponent.prototype.commitChanges = function () {
        if (this.translationUnit) {
            if (this.isTranslationChanged()) {
                this.translationUnit.translate(this._editedTargetText);
            }
        }
    };
    TranslateUnitComponent.prototype.isTranslationChanged = function () {
        var original = this.translationUnit.targetContent();
        return original !== this._editedTargetText;
    };
    /**
     * Go to the next trans unit.
     */
    TranslateUnitComponent.prototype.next = function () {
        this.commitChanges();
        if (this.translationUnit) {
            if (this.translationUnit.translationFile().hasNext()) {
                this.translationUnit.translationFile().nextTransUnit();
            }
        }
    };
    /**
     * Check, wether there is a next trans unit.
     * @return {boolean}
     */
    TranslateUnitComponent.prototype.hasNext = function () {
        if (this.translationUnit) {
            return this.translationUnit.translationFile().hasNext();
        }
        else {
            return false;
        }
    };
    TranslateUnitComponent.prototype.prev = function () {
        this.commitChanges();
        if (this.translationUnit) {
            if (this.translationUnit.translationFile().hasPrev()) {
                this.translationUnit.translationFile().prevTransUnit();
            }
        }
    };
    TranslateUnitComponent.prototype.hasPrev = function () {
        if (this.translationUnit) {
            return this.translationUnit.translationFile().hasPrev();
        }
        else {
            return false;
        }
    };
    return TranslateUnitComponent;
}());
__decorate([
    core_1.Input()
], TranslateUnitComponent.prototype, "translationUnit", void 0);
TranslateUnitComponent = __decorate([
    core_1.Component({
        selector: 'app-translate-unit',
        templateUrl: './translate-unit.component.html',
        styleUrls: ['./translate-unit.component.css']
    })
], TranslateUnitComponent);
exports.TranslateUnitComponent = TranslateUnitComponent;
