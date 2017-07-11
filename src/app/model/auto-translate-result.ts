/**
 * Created by martin on 29.06.2017.
 */

export class AutoTranslateResult {

  public static Success(tuId: string): AutoTranslateResult {
    return new AutoTranslateResult(tuId, true, false, null);
  }

  public static Failed(tuId: string, details: string): AutoTranslateResult {
    return new AutoTranslateResult(tuId, false, false, details);
  }

  public static Ignored(tuId: string, details: string): AutoTranslateResult {
    return new AutoTranslateResult(tuId, true, true, details);
  }

  private constructor(private _transUnitId: string, private _success: boolean, private _ignored: boolean, private _details: string) {

  }

  public success(): boolean {
    return this._success;
  }

  public failed(): boolean {
    return !this._success;
  }

  public ignored(): boolean {
    return this._ignored;
  }

  public details(): string {
    return this._details;
  }

  public translationUnitId(): string {
    return this._transUnitId;
  }
}
