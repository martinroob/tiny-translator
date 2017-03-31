"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var translation_file_1 = require("./translation-file");
var util_1 = require("util");
var translation_project_1 = require("./translation-project");
var TinyTranslatorService = (function () {
    function TinyTranslatorService(backendService) {
        this.backendService = backendService;
        this._projects = this.backendService.projects();
    }
    /**
     * Start working on a new translation.
     * @param projectName
     * @param files selected xlf files to translate
     * @return list of errors found in file selection.
     */
    TinyTranslatorService.prototype.startProject = function (projectName, files) {
        var newProject = this.createProject(projectName, files);
        this._projects.push(newProject);
        return [];
    };
    TinyTranslatorService.prototype.createProject = function (projectName, files) {
        var result = new translation_project_1.TranslationProject(projectName, new translation_file_1.TranslationFile(files.item(0))); // TODO handle xmb 2 files
        return result;
    };
    /**
     * Test, wether the project selection is ready to start.
     * This is the case, if there is a valid xlf file selected.
     * @return {boolean}
     */
    TinyTranslatorService.prototype.canStartWork = function () {
        return this._projects && this._projects.length > 0 && !this.hasErrors();
    };
    TinyTranslatorService.prototype.setCurrentProject = function (project) {
        if (!this._projects.find(function (p) { return p === project; })) {
            throw new Error('oops, selected project not in list');
        }
        this._currentProject = project;
    };
    TinyTranslatorService.prototype.currentProject = function () {
        return this._currentProject;
    };
    /**
     * Check, wether there are errors in any of the selected files.
     * @return {boolean}
     */
    TinyTranslatorService.prototype.hasErrors = function () {
        if (!this._projects || this._projects.length === 0) {
            return false;
        }
        var projectWithErrors = this._projects.find(function (p) { return p.hasErrors(); });
        return !util_1.isNullOrUndefined(projectWithErrors);
    };
    TinyTranslatorService.prototype.projects = function () {
        return this._projects;
    };
    return TinyTranslatorService;
}());
TinyTranslatorService = __decorate([
    core_1.Injectable()
], TinyTranslatorService);
exports.TinyTranslatorService = TinyTranslatorService;
