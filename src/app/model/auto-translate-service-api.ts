import {Observable} from 'rxjs/Observable';
/**
 * Interface of AutoTranslate Service API.
 * An AutoTranslateService can translate messages to other languages.
 */
export class AutoTranslateServiceAPI {

  /**
   * Test, wether it is active.
   */
  public canAutoTranslate(): boolean {
    return false;
  }

  /**
   * Return a list of language codes that can be used.
   * Returns codes as "language" and readable name.
   * @param target language for readable name.
   */
  supportedLanguages(target: string): Observable<{language: string; name: string}[]> {
    return Observable.of([]);
  }

  /**
   * Translate a message.
   * TODO API to be designed
   * @param message the message to be translated
   * @param from source language code
   * @param to target language code
   * @return Observable with translated message or error
   */
  public translate(message: string, from: string, to: string): Observable<string> {
    return Observable.throw('no translation service installed');
  }

  /**
   * Translate an array of messages at once.
   * @param messages the messages to be translated
   * @param from source language code
   * @param to target language code
   * @return Observable with translated messages or error
   */
  public translateMultipleStrings(messages: string[], from: string, to: string): Observable<string[]> {
    return Observable.throw('no translation service installed');
  }
}
