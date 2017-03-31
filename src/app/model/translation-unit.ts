import {ITransUnit} from 'ngx-i18nsupport/dist';
import {TranslationFile} from './translation-file';

/**
 * A wrapper around ITransUnit.
 * Adds some support for easier GUI handling.
 * Created by martin on 24.03.2017.
 */

export class TranslationUnit {

  private _isDirty: boolean;

  constructor(private _translationFile: TranslationFile, private _transUnit: ITransUnit) {
    this._isDirty = false;
  }

  public translationFile(): TranslationFile {
    return this._translationFile;
  }

  public id(): string {
    if (this._transUnit) {
      return this._transUnit.id;
    } else {
      return null;
    }
  }

  public sourceContent(): string {
    if (this._transUnit) {
      return this._transUnit.sourceContent();
    } else {
      return null;
    }
  }

  public targetContent(): string {
    if (this._transUnit) {
      return this._transUnit.targetContent();
    } else {
      return null;
    }
  }

  public description(): string {
    if (this._transUnit) {
      return this._transUnit.description();
    } else {
      return null;
    }
  }

  public meaning(): string {
    if (this._transUnit) {
      return this._transUnit.meaning();
    } else {
      return null;
    }
  }

  public targetState(): string {
    if (this._transUnit) {
      return this._transUnit.targetState();
    } else {
      return null;
    }
  }

  public isDirty(): boolean {
    return this._isDirty;
  }

  public isTranslated(): boolean {
    return this.targetState() && this.targetState() !== 'new';
  }

  public translate(newTranslation: string) {
    if (this._transUnit) {
      this._transUnit.translate(newTranslation);
      this._isDirty = true;
    }
  }
}
