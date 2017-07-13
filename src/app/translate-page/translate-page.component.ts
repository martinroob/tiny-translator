import { Component, OnInit } from '@angular/core';
import {TinyTranslatorService} from '../model/tiny-translator.service';
import {TranslationUnit} from '../model/translation-unit';
import {TranslationProject, UserRole} from '../model/translation-project';
import {TranslationFileView} from '../model/translation-file-view';

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

  currentView(): TranslationFileView {
    return this.currentProject() ? this.currentProject().translationFileView : null;
  }

  currentTranslationUnit(): TranslationUnit {
    const currentProject = this.currentProject();
    return currentProject ? currentProject.translationFileView.currentTransUnit() : null;
  }

  commitChanges() {
    this.translationService.commitChanges(this.currentProject());
  }

  /**
   * Navigate to another unit.
   * @param translationUnit
   */
  onChangeTranslationUnit(translationUnit: TranslationUnit) {
    this.translationService.selectTransUnit(translationUnit);
  }

  /**
   * Navigate to next or prev unit.
   * @param direction 'next' or 'prev'.
   */
  onChangeTranslationUnitToNextOrPrev(direction: string) {
    if (direction === 'next') {
      this.translationService.nextTransUnit();
    } else if (direction === 'prev') {
      this.translationService.prevTransUnit();
    }
  }

  save() {
    this.translationService.saveProject(this.currentProject());
  }

  isInReviewMode(): boolean {
    return this.currentProject() && this.currentProject().userRole === UserRole.REVIEWER;
  }

  hasAutotranslatedUnits(): boolean {
    return this.currentProject()
      && this.currentProject().autoTranslateSummaryReport()
      && this.currentProject().autoTranslateSummaryReport().success() > 0;
  }

}
