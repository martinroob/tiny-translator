import {Component, Input, OnInit} from '@angular/core';
import {TranslationUnit} from '../model/translation-unit';
import {MdRadioChange} from '@angular/material';
import {TranslationFileView} from '../model/translation-file-view';
import {TranslationUnitFilterAll} from '../model/filters/translation-unit-filter-all';
import {TranslationUnitFilterUnranslated} from '../model/filters/translation-unit-filter-untranslated';
import {TranslationUnitFilterNeedsReview} from '../model/filters/translation-unit-filter-needs-review';

/**
 * Component that shows a list of trans units.
 * It allows to filter by different criteria and to select a unit.
 */
@Component({
  selector: 'app-translate-unit-list',
  templateUrl: './translate-unit-list.component.html',
  styleUrls: ['./translate-unit-list.component.scss']
})
export class TranslateUnitListComponent implements OnInit {

  private _translationFileView: TranslationFileView;
  public _selectedFilterName: string = 'all';

  constructor() {
    this.translationFileView = new TranslationFileView(null);
  }

  @Input() public get translationFileView() {
    return this._translationFileView;
  }

  public set translationFileView(view: TranslationFileView) {
    if (view) {
      this._translationFileView = view;
    } else {
      this._translationFileView = new TranslationFileView(null);
    }
    this._selectedFilterName = this._translationFileView.activeFilter().name();
  }

  ngOnInit() {
  }

  public transUnits(): TranslationUnit[] {
    return this.translationFileView.scrollabeTransUnits();
  }

  public showAll() {
    this.translationFileView.setActiveFilter(new TranslationUnitFilterAll());
  }

  public showUntranslated() {
    this.translationFileView.setActiveFilter(new TranslationUnitFilterUnranslated());
  }

  public showNeedsReview() {
    this.translationFileView.setActiveFilter(new TranslationUnitFilterNeedsReview());
  }

  filterChanged(changeEvent: MdRadioChange) {
    switch (changeEvent.value) {
      case 'all':
        this.showAll();
        break;
      case 'untranslated':
        this.showUntranslated();
        break;
      case 'needsReview':
        this.showNeedsReview();
        break;
      default:
        // do nothing
    }
  }

  public selectTransUnit(tu: TranslationUnit) {
    this.translationFileView.selectTransUnit(tu);
  }

  isSelected(tu: TranslationUnit): boolean {
    return tu && tu === this.translationFileView.currentTransUnit();
  }

}
