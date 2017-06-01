import {Component, Input, OnInit} from '@angular/core';
import {TranslationUnit} from '../model/translation-unit';
import {MdRadioChange} from '@angular/material';
import {TranslationFileView} from '../model/translation-file-view';
import {TranslationUnitFilterAll} from '../model/filters/translation-unit-filter-all';
import {TranslationUnitFilterUntranslated} from '../model/filters/translation-unit-filter-untranslated';
import {TranslationUnitFilterNeedsReview} from '../model/filters/translation-unit-filter-needs-review';
import {WorkflowType} from '../model/translation-project';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {TranslationUnitFilterSubstring} from '../model/filters/translation-unit-filter-substring';

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
  public _selectedFilterName = 'all';
  public substringToSearch: string;
  private substringSubject: Subject<string>;
  private substringSubscription: Subscription;

  /**
   * workflowType determines, what filters are visibile.
   */
  @Input() workflowType: WorkflowType;

  constructor() {
    this.translationFileView = new TranslationFileView(null);
    this.substringSubject = new Subject<string>();
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
    this.translationFileView.setActiveFilter(new TranslationUnitFilterUntranslated());
  }

  public showNeedsReview() {
    this.translationFileView.setActiveFilter(new TranslationUnitFilterNeedsReview());
  }

  public showBySearchFilter() {
    if (this.substringSubscription) {
      this.substringSubscription.unsubscribe();
    }
    this.substringSubscription = this.substringSubject.debounceTime(200).subscribe((substr) => {
      console.log('CHange filter to', substr);
      this.translationFileView.setActiveFilter(new TranslationUnitFilterSubstring(substr));
    });
  }

  substringToSearchChange() {
    this.substringSubject.next(this.substringToSearch);
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
      case 'search':
        this.showBySearchFilter();
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

  isWorkflowWithReview(): boolean {
    return this.workflowType === WorkflowType.WITH_REVIEW;
  }
}
