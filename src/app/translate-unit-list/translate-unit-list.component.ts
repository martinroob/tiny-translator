import {Component, Input, OnInit} from '@angular/core';
import {TranslationFile} from '../model/translation-file';
import {TranslationUnit} from '../model/translation-unit';

@Component({
  selector: 'app-translate-unit-list',
  templateUrl: './translate-unit-list.component.html',
  styleUrls: ['./translate-unit-list.component.css']
})
export class TranslateUnitListComponent implements OnInit {

  private _translationFile: TranslationFile;

  constructor() {
    this.translationFile = new TranslationFile();
  }

  @Input() public get translationFile() {
    return this._translationFile;
  }

  public set translationFile(file: TranslationFile) {
    if (file) {
      this._translationFile = file;
    } else {
      this._translationFile = new TranslationFile();
    }
  }

  ngOnInit() {
  }

  public transUnits(): TranslationUnit[] {
    return this.translationFile.scrollabeTransUnits();
  }

  public showAll() {
    this.translationFile.setScrollModeAll();
  }

  public showUntranslated() {
    this.translationFile.setScrollModeUntranslated();
  }

  public selectTransUnit(tu: TranslationUnit) {
    this.translationFile.selectTransUnit(tu);
  }
}
