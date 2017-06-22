/**
 * Interface of AutoTranslate Service API.
 * An AutoTranslateService can translate messages to other languages.
 */
export class AutoTranslateServiceAPI {

  /**
   * Test, wether it is active.
   */
  canAutoTranslate(): boolean {
    return false;
  }

  /**
   * Translate a message.
   * TODO API to be designed
   * @param message the message to be translated
   * @param from source language code
   * @param to target language code
   * @return translated message or null
   */
  translate(message: string, from: string, to: string): string {
    return null;
  }

}
