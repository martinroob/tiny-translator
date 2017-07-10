import {TranslationUnit} from './translation-unit';
/**
 * Created by martin on 29.06.2017.
 */

export class AutoTranslateResult {

  constructor(private _transUnitId: string, private _success: boolean, private _details: string) {

  }

  public success(): boolean {
    return this._success;
  }

  public translationUnitId(): string {
    return this._transUnitId;
  }
}
