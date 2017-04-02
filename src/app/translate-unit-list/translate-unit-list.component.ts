import {Component, Input, OnInit} from '@angular/core';
import {ScrollMode, TranslationFile} from '../model/translation-file';
import {TranslationUnit} from '../model/translation-unit';
import {MdRadioChange} from '@angular/material';

@Component({
  selector: 'app-translate-unit-list',
  templateUrl: './translate-unit-list.component.html',
  styleUrls: ['./translate-unit-list.component.scss']
})
export class TranslateUnitListComponent implements OnInit {

  private _translationFile: TranslationFile;
  public _selectedFilter: string = 'all';

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
    this._selectedFilter = this.scrollModeToString(this._translationFile.scrollMode());
  }

  private scrollModeToString(scrollMode: ScrollMode) {
    switch (scrollMode) {
      case ScrollMode.ALL:
        return 'all';
      case ScrollMode.UNTRANSLATED:
        return 'untranslated';
      default:return '';
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

  filterChanged(changeEvent: MdRadioChange) {
    switch (changeEvent.value) {
      case 'all':
        this.showAll();
        break;
      case 'untranslated':
        this.showUntranslated();
        break;
      default:
        // do nothing
    }
  }

  public selectTransUnit(tu: TranslationUnit) {
    this.translationFile.selectTransUnit(tu);
  }

  isSelected(tu: TranslationUnit): boolean {
    return tu && tu === this.translationFile.currentTransUnit();
  }

  selectedStyle(tu: TranslationUnit): any {
    if (!tu || !this.isSelected(tu)) {
      return {};
    } else {
      return {
        'background-color': 'pink'
      }
    }
  }
}
