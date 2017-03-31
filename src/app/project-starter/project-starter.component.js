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
 * The ProjectStarter is an upload component.
 * You can upload a file for translation (xliff file normally) to start working with it.
 */
var ProjectStarterComponent = (function () {
    function ProjectStarterComponent(translatorService, router) {
        this.translatorService = translatorService;
        this.router = router;
        this.isSelectionDone = false;
    }
    ProjectStarterComponent.prototype.ngOnInit = function () {
    };
    ProjectStarterComponent.prototype.fileSelectionChange = function (input) {
        this.selectedFiles = input.files;
        if (this.selectedFiles.length > 0) {
            this.isSelectionDone = true;
        }
        this.translatorService.startProject('todoname', this.selectedFiles);
    };
    ProjectStarterComponent.prototype.canStartWork = function () {
        return this.isSelectionDone && this.translatorService.canStartWork();
    };
    ProjectStarterComponent.prototype.startWork = function (translationFile) {
        console.log('Set current file to ', translationFile.name);
        this.translatorService.setCurrentProject(translationFile);
        this.router.navigateByUrl('translate');
    };
    ProjectStarterComponent.prototype.selectedFilesInfo = function () {
        return this.translatorService.translationFiles();
    };
    return ProjectStarterComponent;
}());
ProjectStarterComponent = __decorate([
    core_1.Component({
        selector: 'app-project-starter',
        templateUrl: './project-starter.component.html',
        styleUrls: ['./project-starter.component.css']
    })
], ProjectStarterComponent);
exports.ProjectStarterComponent = ProjectStarterComponent;
