import {Component, Inject} from '@angular/core';
import {AppConfig, APP_CONFIG} from './app.config';
import {TinyTranslatorService} from './model/tiny-translator.service';
import {isNullOrUndefined} from 'util';
import {Observable} from 'rxjs/observable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';

  constructor(@Inject(APP_CONFIG) private APP_CONFIG: AppConfig, private translatorService: TinyTranslatorService, private router: Router) {

  }

  buildtime() {
    return this.APP_CONFIG.BUILDTIME;
  }

  buildversion() {
    return this.APP_CONFIG.BUILDVERSION;
  }

  currentProjectName(): string {
    const project = this.translatorService.currentProject();
    return project ? project.name : '';
  }

  save() {
    this.translatorService.saveProject(this.translatorService.currentProject());
  }

  /**
   * Auto translate all untranslated units.
   * Redirects to a config page, if Google Translate is currently not available.
   * Otherwise auto translates all untranslated units..
   */
  autoTranslate() {
    this.translatorService.canAutoTranslate().subscribe((canTranslate: boolean) => {
      if (canTranslate) {
        this.translatorService.autoTranslate().subscribe((summary) => {
          console.log('Summary: ', summary.content(), summary); // TODO show Toast or result page...
          this.translatorService.currentProject().setAutoTranslateSummaryReport(summary);
          this.router.navigateByUrl('autotranslatesummary');
        });
      } else {
        this.router.navigateByUrl('configureautotranslate');
      }
    });
  }

  configureAutoTranslate() {
    this.router.navigateByUrl('configureautotranslate');
  }

  navigateToAutoTranslateSummary() {
    this.router.navigateByUrl('autotranslatesummary');
  }

}
