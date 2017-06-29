import {InjectionToken} from '@angular/core';
import {environment} from '../environments/environment';
/**
 * Created by martin on 23.03.2017.
 * Configuration Data of the application.
 */

export class AppConfig {
  // URL to Google translate API (optional)
  GOOGLETRANSLATE_API_ROOT_URL?: string;
  BUILDVERSION: string;
  BUILDTIME: string;
}

export const APP_CONFIG_VALUE: AppConfig = {
  // set values here
  'BUILDVERSION': '0.2.0',
  'BUILDTIME': '16.06.2017',
  GOOGLETRANSLATE_API_ROOT_URL: 'https://translation.googleapis.com/',
};

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');
