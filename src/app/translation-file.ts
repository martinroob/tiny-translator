import {ITranslationMessagesFile, ITransUnit} from 'ngx-i18nsupport/dist';
import {TranslationMessagesFileFactory} from 'ngx-i18nsupport/dist';
import {isNullOrUndefined} from 'util';

/**
 * A single xlf or xmb file ready for work.
 * Created by roobm on 22.03.2017.
 */

export class TranslationFile {

  private _uploadedFile: File;

  private _error: string;

  private _translationFile: ITranslationMessagesFile;

  constructor(uploadedFile: File) {
    this._uploadedFile = uploadedFile;
    if (this._uploadedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileContent = reader.result;
        try {
          this._translationFile = TranslationMessagesFileFactory.fromFileContent(this.guessFormat(uploadedFile), fileContent, uploadedFile.name, null);
        } catch(err) {
          this._error = err.toString();
        }
      };
      reader.readAsText(this._uploadedFile);
    }
  }

  private guessFormat(uploadedFile: File): string {
    if (uploadedFile.name.endsWith('xmb')) {
      return 'xmb';
    }
    return 'xlf';
  }

  get name(): string {
    return this._uploadedFile ? this._uploadedFile.name : '';
  }

  get type(): string {
    return '?'; // TODO
  }

  get size(): number {
    return this._uploadedFile ? this._uploadedFile.size : 0;
  }

  get numberOfTransUnits(): number {
    return this._translationFile ? this._translationFile.numberOfTransUnits() : 0;
  }

  get numberOfUntranslatedTransUnits(): number {
    // TODO move this functionality into i18nsupport API
    if (!this._translationFile) {
      return null;
    }
    let count = 0;
    this._translationFile.forEachTransUnit((tu: ITransUnit) => {
      let state: string = tu.targetState();
      if (!state || state === 'new') {
        count++;
      }
    });
    return count;
  }

  public percentageUntranslated(): number {
    if (this.numberOfTransUnits === 0) {
      return 0;
    }
    return 100 * this.numberOfUntranslatedTransUnits / this.numberOfTransUnits;
  }

  public percentageTranslated(): number {
    return 100 - this.percentageUntranslated();
  }

  public hasErrors(): boolean {
    return !isNullOrUndefined(this._error);
  }

  public canTranslate(): boolean {
    return !this.hasErrors() && this.numberOfTransUnits > 0;
  }

  get error(): string {
    return this._error;
  }

  public currentTransUnit(): ITransUnit {
    // TODO Blättern etc. ...
    let curr: ITransUnit;
    // TODO API-Zugriff auf Liste der TUs...
    this._translationFile.forEachTransUnit((tu: ITransUnit) => {
      curr = tu;
    });
    return curr;
  }
}
