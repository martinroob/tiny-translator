"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var util_1 = require("util");
/**
 * A Pipe to abbreviate long text.
 * The text is cut and .. is added at the end.
 * The length can be given as parameter.
 * Default is 20.
 * Examples:
 * 'abcdefghijklmnopqrstuvwxyz' | abbreviate -> 'abcdefghijklmnopqrst..'
 * 'abcdefghijklmnopqrstuvwxyz' | abbreviate:5 -> 'abcde..'
 */
var AbbreviatePipe = (function () {
    function AbbreviatePipe() {
        this.DEFAULT_LENGTH = 20; // aabreviation length if not given as parameter
    }
    AbbreviatePipe.prototype.transform = function (value, lengthParam) {
        var length = (!util_1.isNullOrUndefined(lengthParam)) ? lengthParam : this.DEFAULT_LENGTH;
        if (util_1.isString(value)) {
            if (value.length > length) {
                return value.substring(0, length).concat('..');
            }
            else {
                return value;
            }
        }
        return value;
    };
    return AbbreviatePipe;
}());
AbbreviatePipe = __decorate([
    core_1.Pipe({
        name: 'abbreviate'
    })
], AbbreviatePipe);
exports.AbbreviatePipe = AbbreviatePipe;
