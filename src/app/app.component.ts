import {Component, Inject} from '@angular/core';
import {AppConfig, APP_CONFIG} from './app.config';
import {TinyTranslatorService} from './model/tiny-translator.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';

  constructor(@Inject(APP_CONFIG) private APP_CONFIG: AppConfig, private translatorService: TinyTranslatorService) {

  }

  buildtime() {
    return this.APP_CONFIG.BUILDTIME;
  }

  buildversion() {
    return this.APP_CONFIG.BUILDVERSION;
  }

  /**
   * Auto translate all untranslated units.
   */
  autoTranslate() {
      this.translatorService.autoTranslate();
  }

  canAutoTranslate(): boolean {
    return this.translatorService.canAutoTranslate();
  }
}
