import { Component, OnInit } from '@angular/core';
import {TinyTranslatorService} from '../model/tiny-translator.service';
import {TranslationFile} from '../model/translation-file';
import {TranslationUnit} from '../model/translation-unit';
import {TranslationProject} from '../model/translation-project';

@Component({
  selector: 'app-translate-page',
  templateUrl: './translate-page.component.html',
  styleUrls: ['./translate-page.component.css']
})
export class TranslatePageComponent implements OnInit {

  constructor(private translationService: TinyTranslatorService) { }

  ngOnInit() {
  }

  currentProject(): TranslationProject {
    return this.translationService.currentProject();
  }

  currentFile(): TranslationFile {
    return this.currentProject() ? this.currentProject().translationFile : null;
  }

  currentTranslationUnit(): TranslationUnit {
    const currentFile = this.currentFile();
    return currentFile ? currentFile.currentTransUnit() : null;
  }

  commitChanges() {
    this.translationService.commitChanges(this.currentProject());
  }

  save() {
    this.translationService.saveProject(this.currentProject());
  }
}
