"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dist_1 = require("ngx-i18nsupport/dist");
var util_1 = require("util");
var translation_unit_1 = require("./translation-unit");
/**
 * A single xlf or xmb file ready for work.
 * This is a wrapper around ITranslationMessagesFile.
 * It can read from uploaded files and adds errorhandling.
 * It also has a pointer to the current trans unit and allows scrolling through the trans units.
 * Created by roobm on 22.03.2017.
 */
/**
 * Scrollmode.
 * Decides, wether next and prev scoll through all units
 * or only untranslated units.
 */
var ScrollMode;
(function (ScrollMode) {
    ScrollMode[ScrollMode["ALL"] = 0] = "ALL";
    ScrollMode[ScrollMode["UNTRANSLATED"] = 1] = "UNTRANSLATED";
})(ScrollMode = exports.ScrollMode || (exports.ScrollMode = {}));
var TranslationFile = (function () {
    function TranslationFile(uploadedFile) {
        var _this = this;
        this._error = null;
        this.scrollMode = ScrollMode.UNTRANSLATED;
        /**
         * Pointer to current unit (points to _scrollableTransUnits).
         */
        this._currentTransUnitIndex = -1;
        this._uploadedFile = uploadedFile;
        this._allTransUnits = [];
        if (this._uploadedFile) {
            var reader_1 = new FileReader();
            reader_1.onloadend = function () {
                var fileContent = reader_1.result;
                try {
                    _this._translationFile = dist_1.TranslationMessagesFileFactory.fromFileContent(_this.guessFormat(uploadedFile), fileContent, uploadedFile.name, null);
                    _this.readTransUnits();
                }
                catch (err) {
                    _this._error = err.toString();
                }
                _this.setScrollModeUntranslated();
            };
            reader_1.readAsText(this._uploadedFile);
        }
    }
    TranslationFile.prototype.guessFormat = function (uploadedFile) {
        if (uploadedFile.name.endsWith('xmb')) {
            return 'xmb';
        }
        return 'xlf';
    };
    TranslationFile.prototype.readTransUnits = function () {
        var _this = this;
        this._allTransUnits = [];
        if (this._translationFile) {
            this._translationFile.forEachTransUnit(function (tu) {
                _this._allTransUnits.push(new translation_unit_1.TranslationUnit(_this, tu));
            });
        }
    };
    Object.defineProperty(TranslationFile.prototype, "name", {
        get: function () {
            return this._uploadedFile ? this._uploadedFile.name : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TranslationFile.prototype, "type", {
        get: function () {
            return '?'; // TODO
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TranslationFile.prototype, "size", {
        get: function () {
            return this._uploadedFile ? this._uploadedFile.size : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TranslationFile.prototype, "numberOfTransUnits", {
        get: function () {
            return this._allTransUnits.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TranslationFile.prototype, "numberOfUntranslatedTransUnits", {
        get: function () {
            // TODO move this functionality into i18nsupport API
            return this._allTransUnits.filter(function (tu) { return !tu.isTranslated(); }).length;
        },
        enumerable: true,
        configurable: true
    });
    TranslationFile.prototype.sourceLanguage = function () {
        return this._translationFile ? this._translationFile.sourceLanguage() : '';
    };
    TranslationFile.prototype.targetLanguage = function () {
        return this._translationFile ? this._translationFile.targetLanguage() : '';
    };
    TranslationFile.prototype.percentageUntranslated = function () {
        if (this.numberOfTransUnits === 0) {
            return 0;
        }
        return 100 * this.numberOfUntranslatedTransUnits / this.numberOfTransUnits;
    };
    TranslationFile.prototype.percentageTranslated = function () {
        return 100 - this.percentageUntranslated();
    };
    TranslationFile.prototype.hasErrors = function () {
        return !util_1.isNullOrUndefined(this._error);
    };
    TranslationFile.prototype.canTranslate = function () {
        return !this.hasErrors() && this.numberOfTransUnits > 0;
    };
    Object.defineProperty(TranslationFile.prototype, "error", {
        get: function () {
            return this._error;
        },
        enumerable: true,
        configurable: true
    });
    TranslationFile.prototype.setScrollModeAll = function () {
        this.scrollMode = ScrollMode.ALL;
        var oldCurrent = (this._currentTransUnitIndex >= 0) ? this.currentTransUnit() : null;
        this._scrollableTransUnits = this._allTransUnits;
        if (oldCurrent) {
            this._currentTransUnitIndex = this._scrollableTransUnits.findIndex(function (tu) { return tu == oldCurrent; });
        }
    };
    TranslationFile.prototype.setScrollModeUntranslated = function () {
        this.scrollMode = ScrollMode.UNTRANSLATED;
        var oldCurrent = (this._currentTransUnitIndex >= 0) ? this.currentTransUnit() : null;
        this._scrollableTransUnits = this._allTransUnits.filter(function (tu) { return !tu.isTranslated(); });
        if (oldCurrent) {
            this._currentTransUnitIndex = this._scrollableTransUnits.findIndex(function (tu) { return tu == oldCurrent; });
        }
    };
    /**
     * Check, wether file is changed.
     * @return {boolean}
     */
    TranslationFile.prototype.isDirty = function () {
        return this._allTransUnits.find(function (tu) { return tu.isDirty(); }) != null;
    };
    /**
     * return content with all changes.
     */
    TranslationFile.prototype.editedContent = function () {
        if (this._translationFile) {
            return this._translationFile.editedContent();
        }
        else {
            this._error = 'cannot save, no valid file';
        }
    };
    TranslationFile.prototype.currentTransUnit = function () {
        if (this._scrollableTransUnits.length === 0) {
            return null;
        }
        if (this._currentTransUnitIndex < 0) {
            this._currentTransUnitIndex = 0;
        }
        if (this._currentTransUnitIndex >= 0 && this._currentTransUnitIndex < this._scrollableTransUnits.length) {
            return this._scrollableTransUnits[this._currentTransUnitIndex];
        }
        else {
            return null;
        }
    };
    TranslationFile.prototype.selectTransUnit = function (selectedTransUnit) {
        var index = this._scrollableTransUnits.findIndex(function (tu) { return tu === selectedTransUnit; });
        if (index >= 0) {
            this._currentTransUnitIndex = index;
        }
    };
    TranslationFile.prototype.nextTransUnit = function () {
        if (this._currentTransUnitIndex >= 0) {
            this._currentTransUnitIndex++;
        }
        return this.currentTransUnit();
    };
    TranslationFile.prototype.prevTransUnit = function () {
        if (this._currentTransUnitIndex >= 1) {
            this._currentTransUnitIndex--;
        }
        return this.currentTransUnit();
    };
    TranslationFile.prototype.hasNext = function () {
        if (this._currentTransUnitIndex < 0) {
            return this._scrollableTransUnits.length > 0;
        }
        else {
            return this._currentTransUnitIndex < (this._scrollableTransUnits.length - 1);
        }
    };
    TranslationFile.prototype.hasPrev = function () {
        if (this._currentTransUnitIndex < 0) {
            return false;
        }
        else {
            return this._currentTransUnitIndex > 0;
        }
    };
    TranslationFile.prototype.scrollabeTransUnits = function () {
        return this._scrollableTransUnits;
    };
    TranslationFile.prototype.currentTransUnitIndex = function () {
        return (this._currentTransUnitIndex < 0) ? 0 : this._currentTransUnitIndex + 1;
    };
    TranslationFile.prototype.scrollabeTransUnitsLength = function () {
        return (this._scrollableTransUnits) ? this._scrollableTransUnits.length : 0;
    };
    return TranslationFile;
}());
exports.TranslationFile = TranslationFile;
