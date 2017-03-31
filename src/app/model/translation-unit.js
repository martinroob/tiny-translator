"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A wrapper around ITransUnit.
 * Adds some support for easier GUI handling.
 * Created by martin on 24.03.2017.
 */
var TranslationUnit = (function () {
    function TranslationUnit(_translationFile, _transUnit) {
        this._translationFile = _translationFile;
        this._transUnit = _transUnit;
        this._isDirty = false;
    }
    TranslationUnit.prototype.translationFile = function () {
        return this._translationFile;
    };
    TranslationUnit.prototype.id = function () {
        if (this._transUnit) {
            return this._transUnit.id;
        }
        else {
            return null;
        }
    };
    TranslationUnit.prototype.sourceContent = function () {
        if (this._transUnit) {
            return this._transUnit.sourceContent();
        }
        else {
            return null;
        }
    };
    TranslationUnit.prototype.targetContent = function () {
        if (this._transUnit) {
            return this._transUnit.targetContent();
        }
        else {
            return null;
        }
    };
    TranslationUnit.prototype.description = function () {
        if (this._transUnit) {
            return this._transUnit.description();
        }
        else {
            return null;
        }
    };
    TranslationUnit.prototype.meaning = function () {
        if (this._transUnit) {
            return this._transUnit.meaning();
        }
        else {
            return null;
        }
    };
    TranslationUnit.prototype.targetState = function () {
        if (this._transUnit) {
            return this._transUnit.targetState();
        }
        else {
            return null;
        }
    };
    TranslationUnit.prototype.isDirty = function () {
        return this._isDirty;
    };
    TranslationUnit.prototype.isTranslated = function () {
        return this.targetState() && this.targetState() !== 'new';
    };
    TranslationUnit.prototype.translate = function (newTranslation) {
        if (this._transUnit) {
            this._transUnit.translate(newTranslation);
            this._isDirty = true;
        }
    };
    return TranslationUnit;
}());
exports.TranslationUnit = TranslationUnit;
