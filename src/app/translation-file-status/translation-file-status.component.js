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
 * Component to show the current status of a loaded translation file.
 * It shows the size, number of translations, wether it is changed etc.
 */
var TranslationFileStatusComponent = (function () {
    function TranslationFileStatusComponent(downloaderService) {
        this.downloaderService = downloaderService;
    }
    TranslationFileStatusComponent.prototype.ngOnInit = function () {
    };
    /**
     * percentage translated rounded to 0 digits.
     * @return {any}
     */
    TranslationFileStatusComponent.prototype.percentageTranslated = function () {
        if (this.translationFile) {
            var result = this.translationFile.percentageTranslated();
            return result.toFixed(0);
        }
        else {
            return '0';
        }
    };
    /**
     * Save the changed file.
     */
    TranslationFileStatusComponent.prototype.save = function () {
        if (this.translationFile) {
            this.downloaderService.downloadXliffFile(this.translationFile.name, this.translationFile.editedContent());
        }
    };
    return TranslationFileStatusComponent;
}());
__decorate([
    core_1.Input()
], TranslationFileStatusComponent.prototype, "translationFile", void 0);
TranslationFileStatusComponent = __decorate([
    core_1.Component({
        selector: 'app-translation-file-status',
        templateUrl: './translation-file-status.component.html',
        styleUrls: ['./translation-file-status.component.css']
    })
], TranslationFileStatusComponent);
exports.TranslationFileStatusComponent = TranslationFileStatusComponent;
