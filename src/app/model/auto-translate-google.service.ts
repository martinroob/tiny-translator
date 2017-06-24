import {Inject, Injectable} from '@angular/core';
import {AutoTranslateServiceAPI} from './auto-translate-service-api';
import {APP_CONFIG, AppConfig} from '../app.config';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Http, RequestOptions, Response} from '@angular/http';

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

  constructor(@Inject(APP_CONFIG) private app_config: AppConfig, private httpService: Http) {
    super();
  }

  /**
   * Test, wether it is active.
   */
  public canAutoTranslate(): boolean {
    return true;
  }

  /**
   * Return a list of language codes that can be used.
   * Returns codes as "language" and readable name.
   * @param target language for readable name.
   */
  supportedLanguages(target: string): Observable<{language: string; name: string}[]> {
    const realUrl = this.app_config.GOOGLETRANSLATE_API_ROOT_URL + 'language/translate/v2/languages' + '?key=' + this.app_config.GOOGLETRANSLATE_API_KEY + '&target=' + target;
    return this.httpService.get(realUrl).map((response: Response) => {
      const result: LanguagesListResponse = response.json().data;
      return result.languages;
    });
  }

  /**
   * Translate a message.
   * @param message the message to be translated
   * @param from source language code
   * @param to target language code
   * @return Observable with translated message or error
   */
  public translate(message: string, from: string, to: string): Observable<string> {
    const translateRequest: TranslateTextRequest = {
      q: [message],
      target: to,
      source: from,
      // format: TODO useful html or text
    };
    const realUrl = this.app_config.GOOGLETRANSLATE_API_ROOT_URL + 'language/translate/v2' + '?key=' + this.app_config.GOOGLETRANSLATE_API_KEY;
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
    const translateRequest: TranslateTextRequest = {
      q: messages,
      target: to,
      source: from,
      // format: TODO useful html or text
    };
    const realUrl = this.app_config.GOOGLETRANSLATE_API_ROOT_URL + 'language/translate/v2' + '?key=' + this.app_config.GOOGLETRANSLATE_API_KEY;
    return this.httpService.post(realUrl, translateRequest).map((response: Response) => {
      const result: TranslationsListResponse = response.json().data;
      return result.translations.map((translation: TranslationsResource) => {return translation.translatedText});
    });
  }
}
