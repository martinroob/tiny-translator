import {InjectionToken} from '@angular/core';
import {environment} from '../environments/environment';
/**
 * Created by martin on 23.03.2017.
 * Configuration Data of the application.
 */

export class AppConfig {
  // URL to Google translate API (optional)
  GOOGLETRANSLATE_API_ROOT_URL?: string;
  // Your API Key, should not be set here, because it is secret
  // can be typed in in the application, but test config needs it
  GOOGLETRANSLATE_API_KEY?: string;
  BUILDVERSION: string;
  BUILDTIME: string;
}

export const APP_CONFIG_VALUE: AppConfig = {
  // set values here
  'BUILDVERSION': '0.2.0',
  'BUILDTIME': '16.06.2017',
  GOOGLETRANSLATE_API_ROOT_URL: 'https://translation.googleapis.com/',
  GOOGLETRANSLATE_API_KEY: environment.googletranslate_api_key
};

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');
