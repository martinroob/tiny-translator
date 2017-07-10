import { Component, OnInit } from '@angular/core';
import {AutoTranslateSummaryReport} from '../model/auto-translate-summary-report';
import {TinyTranslatorService} from '../model/tiny-translator.service';
import {Router} from '@angular/router';
import {TranslationUnitFilterAll} from '../model/filters/translation-unit-filter-all';
import {TranslationUnitFilterAutoTranslated} from '../model/filters/translation-unit-filter-autotranslated';

@Component({
  selector: 'app-auto-translate-summary-page',
  templateUrl: './auto-translate-summary-page.component.html',
  styleUrls: ['./auto-translate-summary-page.component.css']
})
export class AutoTranslateSummaryPageComponent implements OnInit {

  private _autoTranslateSummaryReport: AutoTranslateSummaryReport;

  constructor(private translatorService: TinyTranslatorService, private router: Router) { }

  ngOnInit() {
    const project = this.translatorService.currentProject();
    if (project) {
      this._autoTranslateSummaryReport = project.autoTranslateSummaryReport();
    }
  }

  autoTranslateSummaryReport() {
    return this._autoTranslateSummaryReport;
  }

  navigateToTranslated() {
    this.translatorService.currentProject().translationFileView.setActiveFilter(
      new TranslationUnitFilterAutoTranslated(this._autoTranslateSummaryReport));
    this.router.navigateByUrl('translate');
  }

  navigateToContinueWork() {
    this.router.navigateByUrl('translate');
  }
}
