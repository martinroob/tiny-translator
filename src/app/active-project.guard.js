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
 * Created by martin on 30.03.2017.
 * Guard that checks wether there is an active project selected.
 * If not, it redirects to the home page, where you can select one.
 */
var ActiveProjectGuard = (function () {
    function ActiveProjectGuard(translatorService, router) {
        this.translatorService = translatorService;
        this.router = router;
    }
    ActiveProjectGuard.prototype.canActivate = function (route, routerState) {
        if (this.translatorService.currentFile()) {
            return true;
        }
        else {
            this.router.navigateByUrl('');
            return false;
        }
    };
    return ActiveProjectGuard;
}());
ActiveProjectGuard = __decorate([
    core_1.Injectable()
], ActiveProjectGuard);
exports.ActiveProjectGuard = ActiveProjectGuard;
