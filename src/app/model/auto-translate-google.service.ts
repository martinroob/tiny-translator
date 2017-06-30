import {Inject, Injectable} from '@angular/core';
import {
  AutoTranslateDisabledReason, AutoTranslateDisabledReasonKey, AutoTranslateServiceAPI,
  Language
} from './auto-translate-service-api';
import {APP_CONFIG, AppConfig} from '../app.config';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import {isNullOrUndefined} from 'util';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

const projectId = 'tinytranslator-20170621';

/**
 * Types form google translate api.
 */

interface GetSupportedLanguagesRequest {
  target: string; // The language to use to return localized, human readable names of supported\nlanguages.
}

interface LanguagesResource {
  language: string; // code of the language
  name: string; // human readable name (in target language)
}

interface LanguagesListResponse {
  languages: LanguagesResource[];
}

interface TranslateTextRequest {
  q: string[];  // The input texts to translate
  target: string; // The language to use for translation of the input text
  source: string; // The language of the source text
  format?: string; // "html" (default) or "text"
  model?: string; // see public documentation
}

interface TranslationsResource {
  detectedSourceLanguage?: string;
  model?: string;
  translatedText: string;
}

interface TranslationsListResponse {
  translations: TranslationsResource[];
}

/**
 * Auto Translate Service using Google Translate.
 */
@Injectable()
export class AutoTranslateGoogleService extends AutoTranslateServiceAPI {

  private _rootUrl: string;

  private _apiKey: string;

  /**
   * Cache of supported languages.
   */
  private _subjects: {[target: string]: BehaviorSubject<Language[]>};

  /**
   * Reason, that currently disables the API.
   * (no key, invalid key)
   */
  private _permanentFailReason: AutoTranslateDisabledReason;

  constructor(@Inject(APP_CONFIG) app_config: AppConfig, private httpService: Http) {
    super();
    this._rootUrl = app_config.GOOGLETRANSLATE_API_ROOT_URL;
    // API key is secret, normally it is nit configured and will be null
    // it can be set interactively in the app
    // but in the karma tests it will be set. It is stored than in environment.secret.ts (not in Git)
    this.setApiKey(app_config.GOOGLETRANSLATE_API_KEY); // must be set explicitly via setApiKey()
  }

  public apiKey(): string {
    return this._apiKey;
  }

  public setApiKey(key: string) {
    this._apiKey = key;
    this._permanentFailReason = null;
    this._subjects = {};
    if (!this._apiKey) {
      this._permanentFailReason = {reason: AutoTranslateDisabledReasonKey.NO_KEY};
    }
  }

  /**
   * Test, wether it is active.
   * @param source the language to translate from
   * @param target the language to translate to
   */
  public canAutoTranslate(source: string, target: string): Observable<boolean> {
    return this.supportedLanguages().map((languages: Language[]) => {
      if (languages.findIndex((lang) => lang.language === source) < 0) {
        return false;
      }
      return (languages.findIndex((lang) => lang.language === target) >= 0);
    });
  }

  /**
   * The reason, why canAutoTranslate returns false.
   * @param source the language to translate from
   * @param target the language to translate to
   * @return {AutoTranslateDisabledReason} or null, if API is enabled.
   */
  public disabledReason(source: string, target: string): Observable<AutoTranslateDisabledReason> {
    return this.supportedLanguages().map((languages: Language[]) => {
      if (languages.length === 0) {
        return this._permanentFailReason;
      }
      if (!source || languages.findIndex((lang) => lang.language === source) < 0) {
        return {reason: AutoTranslateDisabledReasonKey.SOURCE_LANG_NOT_SUPPORTED};
      }
      if (!target || languages.findIndex((lang) => lang.language === target) < 0) {
        return {reason: AutoTranslateDisabledReasonKey.TARGET_LANG_NOT_SUPPORTED};
      }
      return null;
    });
  }

  /**
   * Return a list of language codes that can be used.
   * Returns codes as "language" and readable name.
   * @param target language for readable name. (default is en)
   */
  supportedLanguages(target?: string): Observable<Language[]> {
    if (!target) {
      target = 'en';
    }
    if (!this._subjects[target]) {
      if (this._apiKey) {
        this._permanentFailReason = {reason: AutoTranslateDisabledReasonKey.NO_PROVIDER};
      } else {
        this._permanentFailReason = {reason: AutoTranslateDisabledReasonKey.NO_KEY};
      }
      this._subjects[target] = new BehaviorSubject<Language[]>([]);
      if (this._apiKey) {
        const languagesRequestUrl = this._rootUrl + 'language/translate/v2/languages' + '?key=' + this._apiKey + '&target=' + target;
        this.httpService.get(languagesRequestUrl).catch((error: Response) => {
          if (this.isInvalidApiKeyError(error)) {
            this._permanentFailReason = {reason: AutoTranslateDisabledReasonKey.INVALID_KEY};
          } else {
            this._permanentFailReason = {reason: AutoTranslateDisabledReasonKey.CONNECT_PROBLEM, details: JSON.stringify(error.json())};
          }
          return [];
        }).map((response: Response) => {
          const result: LanguagesListResponse = response.json().data;
          return result.languages;
        }).subscribe((languages) => {
          this._subjects[target].next(languages);
        });
      }
    }
    return this._subjects[target];
  }

  private isInvalidApiKeyError(error: Response): boolean {
    if (!error) {
      return false;
    }
    if (error.status === 400) {
      const body = error.json();
      if (body) {
        return JSON.stringify(body).indexOf('API key not valid') >= 0;
      }
    }
    return false;
  }

  /**
   * Translate a message.
   * @param message the message to be translated
   * @param from source language code
   * @param to target language code
   * @return Observable with translated message or error
   */
  public translate(message: string, from: string, to: string): Observable<string> {
    if (!this._apiKey) {
      return Observable.throw('error, no api key');
    }
    const translateRequest: TranslateTextRequest = {
      q: [message],
      target: to,
      source: from,
      // format: TODO useful html or text
    };
    const realUrl = this._rootUrl + 'language/translate/v2' + '?key=' + this._apiKey;
    return this.httpService.post(realUrl, translateRequest).map((response: Response) => {
      const result: TranslationsListResponse = response.json().data;
      return result.translations[0].translatedText;
    });
  }

  /**
   * Translate an array of messages at once.
   * @param messages the messages to be translated
   * @param from source language code
   * @param to target language code
   * @return Observable with translated messages or error
   */
  public translateMultipleStrings(messages: string[], from: string, to: string): Observable<string[]> {
    if (!this._apiKey) {
      return Observable.throw('error, no api key');
    }
    const translateRequest: TranslateTextRequest = {
      q: messages,
      target: to,
      source: from,
      // format: TODO useful html or text
    };
    const realUrl = this._rootUrl + 'language/translate/v2' + '?key=' + this._apiKey;
    return this.httpService.post(realUrl, translateRequest).map((response: Response) => {
      const result: TranslationsListResponse = response.json().data;
      return result.translations.map((translation: TranslationsResource) => {
        return translation.translatedText;
      });
    });
  }
}
