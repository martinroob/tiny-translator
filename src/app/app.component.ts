import {Component, Inject} from '@angular/core';
import {AppConfig, APP_CONFIG} from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';

  constructor(@Inject(APP_CONFIG) private APP_CONFIG: AppConfig) {

  }

  buildtime() {
    return this.APP_CONFIG.BUILDTIME;
  }

  buildversion() {
    return this.APP_CONFIG.BUILDVERSION;
  }


}
