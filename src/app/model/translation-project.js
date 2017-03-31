"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A Translation Project.
 * A name and a translation file.
 */
var TranslationProject = (function () {
    function TranslationProject(_name, _translationFile) {
        this._name = _name;
        this._translationFile = _translationFile;
    }
    Object.defineProperty(TranslationProject.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TranslationProject.prototype, "translationFile", {
        get: function () {
            return this._translationFile;
        },
        enumerable: true,
        configurable: true
    });
    TranslationProject.prototype.hasErrors = function () {
        return this.translationFile.hasErrors();
    };
    return TranslationProject;
}());
exports.TranslationProject = TranslationProject;
