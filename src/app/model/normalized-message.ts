import {INormalizedMessage} from 'ngx-i18nsupport-lib';
import {ValidationErrors} from '@angular/forms';
/**
 * Created by martin on 19.05.2017.
 * Wrapper around INormalizedMessage for GUI usage.
 * Holds the normalized form and the original.
 */
export class NormalizedMessage {

  /**
   * Original source as string.
   */
  private _original: string;

  /**
   * normalized message.
   * null if original is unparsable.
   */
  private _normalizedMessage: INormalizedMessage;

  /**
   * Parse error if message was unparsable.
   */
  private _parseError: string;

  private _sourceMessage: INormalizedMessage;

  /**
   * Create normalized message
   * @param original the original string.
   * @param normalizedMessage parsed version or null, if parsing error.
   * @param parseError parsing error or (normally) null, if no error.
   */
  constructor(original: string, normalizedMessage: INormalizedMessage, parseError: string, sourceMessage: INormalizedMessage) {
    this._original = original;
    this._normalizedMessage = normalizedMessage;
    this._parseError = parseError;
    this._sourceMessage = sourceMessage;
  }

  public dislayText(normalize: boolean): string {
    if (normalize) {
      if (this._normalizedMessage) {
        return this._normalizedMessage.asDisplayString();
      } else {
        return this._parseError;
      }
    } else {
      return this._original;
    }
  }

  public translate(newValue: string, normalize: boolean): NormalizedMessage {
    let newOriginal: string;
    let newMessage: INormalizedMessage;
    let parseError: string;
    if (normalize) {
      try {
        if (this._normalizedMessage) {
          newMessage = this._normalizedMessage.translate(newValue);
        } else {
          newMessage = this._sourceMessage.translate(newValue);
        }
        newOriginal = newMessage.asNativeString();
        parseError = null;
      } catch (error) {
        parseError = error.message;
        newMessage = null;
        newOriginal = null;
      }
    } else {
      newOriginal = newValue;
      try {
        if (this._normalizedMessage) {
          newMessage = this._normalizedMessage.translateNativeString(newValue);
          parseError = null;
        } else {
          newMessage = this._sourceMessage.translateNativeString(newValue);
          parseError = null;
        }
      } catch (error) {
        parseError = error.message;
      }
    }
    return new NormalizedMessage(newOriginal, newMessage, parseError, this._sourceMessage);
  }

  public nativeString(): string {
    if (this._normalizedMessage) {
      return this._normalizedMessage.asNativeString();
    } else {
      return this._original;
    }
  }

  public validate(normalize: boolean): ValidationErrors | null {
    if (normalize) {
      if (this._normalizedMessage) {
        return this._normalizedMessage.validate();
      } else {
        return {'parseError': this._parseError};
      }
    } else {
      return null;
    }
  }

  public validateWarnings(normalize: boolean): ValidationErrors | null {
    if (normalize) {
      if (this._normalizedMessage) {
        return this._normalizedMessage.validateWarnings();
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
