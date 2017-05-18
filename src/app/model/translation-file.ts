import {TranslationMessagesFileFactory, ITranslationMessagesFile, ITransUnit} from 'ngx-i18nsupport-lib';
import {isNullOrUndefined} from 'util';
import {TranslationUnit} from './translation-unit';
import {Observable, Subject} from 'rxjs';
import {AsynchronousFileReaderResult, AsynchronousFileReaderService} from './asynchronous-file-reader.service';

/**
 * A single xlf or xmb file ready for work.
 * This is a wrapper around ITranslationMessagesFile.
 * It can read from uploaded files and adds errorhandling.
 * It also has a pointer to the current trans unit and allows scrolling through the trans units.
 * Created by roobm on 22.03.2017.
 */

/**
 * Scrollmode.
 * Decides, wether next and prev scoll through all units
 * or only untranslated units.
 */
export enum ScrollMode {
  ALL,
  UNTRANSLATED
}

// internal representation of serialized form.
interface ISerializedTranslationFile {
  name: string;
  size: number;
  fileContent: string;
  editedContent: string;
}

export class TranslationFile {

  private _name: string;

  private _size: number;

  private _error: string = null;

  private fileContent: string;

  private _translationFile: ITranslationMessagesFile;

  private _scrollMode: ScrollMode = ScrollMode.UNTRANSLATED;

  /**
   * all TransUnits read from file.
   */
  private _allTransUnits: TranslationUnit[];

  /**
   * The scroll list (either all or all unitranslated, depending on ScrollMode).
   */
  private _scrollableTransUnits: TranslationUnit[];

  /**
   * Pointer to current unit (points to _scrollableTransUnits).
   */
  private _currentTransUnitIndex: number = -1;

  static fromUploadedFile(readingUploadedFile: Observable<AsynchronousFileReaderResult>,
          readingMasterXmbFile?: Observable<AsynchronousFileReaderResult>): Observable<TranslationFile> {
    return Observable.combineLatest(readingUploadedFile, readingMasterXmbFile)
      .map((contentArray) => {
        const fileContent: AsynchronousFileReaderResult = contentArray[0];
        const newInstance = new TranslationFile();
        newInstance._name = fileContent.name;
        newInstance._size = fileContent.size;
        if (fileContent.content) {
          const masterXmbContent: AsynchronousFileReaderResult = contentArray[1];
          try {
            newInstance.fileContent = fileContent.content;
            let optionalMaster: any = null;
            if (masterXmbContent && masterXmbContent.content) {
              optionalMaster = {
                path: masterXmbContent.name,
                xmlContent: masterXmbContent.content,
                encoding: null
              };
            }
            console.log('creating translation file', fileContent.content.length, fileContent.name, optionalMaster);
            newInstance._translationFile =
              TranslationMessagesFileFactory.fromUnknownFormatFileContent(
                fileContent.content, fileContent.name, null, optionalMaster);
            newInstance.readTransUnits();
          } catch (err) {
            newInstance._error = err.toString();
          }
          newInstance.setScrollModeUntranslated();
        }
        return newInstance;
      });
  }

  /**
   * Create a translation file from the serialization.
   * @param serializationString
   * @return {TranslationFile}
   */
  static deserialize(serializationString: string): TranslationFile {
    const deserializedObject: ISerializedTranslationFile = <ISerializedTranslationFile> JSON.parse(serializationString);
    const file = TranslationFile.fromDeserializedObject(deserializedObject);
    return file;
  }

  static fromDeserializedObject(deserializedObject: ISerializedTranslationFile): TranslationFile {
    const newInstance = new TranslationFile();
    newInstance._name = deserializedObject.name;
    newInstance._size = deserializedObject.size;
    newInstance.fileContent = deserializedObject.fileContent;
    try {
      newInstance._translationFile = TranslationMessagesFileFactory.fromUnknownFormatFileContent(deserializedObject.editedContent, deserializedObject.name, null);
      newInstance.readTransUnits();
    } catch (err) {
      newInstance._error = err.toString();
    }
    newInstance.setScrollModeUntranslated();
    return newInstance;
  }

  constructor() {
    this._allTransUnits = [];
  }

  private guessFormat(filename: string): string {
    if (filename.endsWith('xmb')) {
      return 'xmb';
    }
    return 'xlf';
  }

  private readTransUnits() {
    this._allTransUnits = [];
    if (this._translationFile) {
      this._translationFile.forEachTransUnit((tu: ITransUnit) => {
        this._allTransUnits.push(new TranslationUnit(this, tu));
      });
    }
  }

  get name(): string {
    return this._name;
  }

  get type(): string {
    return '?'; // TODO
  }

  get size(): number {
    return this._size;
  }

  get numberOfTransUnits(): number {
    return this._allTransUnits.length;
  }

  get numberOfUntranslatedTransUnits(): number {
    // TODO move this functionality into i18nsupport API
    return this._allTransUnits.filter(tu => !tu.isTranslated()).length;
  }

  /**
   * Type of file.
   * Currently 'XLIFF 1.2' or 'XMB'
   * @return {null}
   */
  public fileType(): string {
    return this._translationFile ? this._translationFile.fileType() : null;
  }

  public sourceLanguage(): string {
    return this._translationFile ? this._translationFile.sourceLanguage() : '';
  }

  public targetLanguage(): string {
    return this._translationFile ? this._translationFile.targetLanguage() : '';
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

  public scrollMode(): ScrollMode {
    return this._scrollMode;
  }

  public setScrollModeAll() {
    this._scrollMode = ScrollMode.ALL;
    const oldCurrent = (this._currentTransUnitIndex >= 0) ? this.currentTransUnit() : null;
    this._scrollableTransUnits = this._allTransUnits;
    if (oldCurrent) {
      this._currentTransUnitIndex = this._scrollableTransUnits.findIndex(tu => tu === oldCurrent);
    }
  }

  public setScrollModeUntranslated() {
    this._scrollMode = ScrollMode.UNTRANSLATED;
    const oldCurrent = (this._currentTransUnitIndex >= 0) ? this.currentTransUnit() : null;
    this._scrollableTransUnits = this._allTransUnits.filter(tu => !tu.isTranslated());
    if (oldCurrent) {
      this._currentTransUnitIndex = this._scrollableTransUnits.findIndex(tu => tu === oldCurrent);
    }
  }

  /**
   * Check, wether file is changed.
   * @return {boolean}
   */
  public isDirty(): boolean {
    return this._translationFile && this.fileContent !== this.editedContent();
    // return this._allTransUnits.find(tu => tu.isDirty()) != null;
  }

  /**
   * return content with all changes.
   */
  public editedContent(): string {
    if (this._translationFile) {
      return this._translationFile.editedContent();
    } else {
      this._error = 'cannot save, no valid file';
    }
  }

  /**
   * Mark file as "exported".
   * This means, that the file was downloaded.
   * So the new fileConted is the edited one.
   */
  public markExported() {
    this.fileContent = this.editedContent();
  }

  public currentTransUnit(): TranslationUnit {
    if (this._scrollableTransUnits.length === 0) {
      return null;
    }
    if (this._currentTransUnitIndex < 0) {
      this._currentTransUnitIndex = 0;
    }
    if (this._currentTransUnitIndex >= 0 && this._currentTransUnitIndex < this._scrollableTransUnits.length) {
      return this._scrollableTransUnits[this._currentTransUnitIndex];
    } else {
      return null;
    }
  }

  public selectTransUnit(selectedTransUnit: TranslationUnit) {
    const index = this._scrollableTransUnits.findIndex(tu => tu === selectedTransUnit);
    if (index >= 0) {
      this._currentTransUnitIndex = index;
    }
  }

  public nextTransUnit(): TranslationUnit {
    if (this._currentTransUnitIndex >= 0) {
      this._currentTransUnitIndex++;
    }
    return this.currentTransUnit();
  }

  public prevTransUnit(): TranslationUnit {
    if (this._currentTransUnitIndex >= 1) {
      this._currentTransUnitIndex--;
    }
    return this.currentTransUnit();
  }

  public hasNext(): boolean {
    if (this._currentTransUnitIndex < 0) {
      return this._scrollableTransUnits.length > 0;
    } else {
      return this._currentTransUnitIndex < (this._scrollableTransUnits.length - 1);
    }
  }

  public hasPrev(): boolean {
    if (this._currentTransUnitIndex < 0) {
      return false;
    } else {
      return this._currentTransUnitIndex > 0;
    }
  }

  public scrollabeTransUnits(): TranslationUnit[] {
    return this._scrollableTransUnits;
  }

  public currentTransUnitIndex(): number {
    return (this._currentTransUnitIndex < 0) ? 0 : this._currentTransUnitIndex + 1;
  }

  public scrollabeTransUnitsLength(): number {
    return (this._scrollableTransUnits) ? this._scrollableTransUnits.length : 0;
  }

  /**
   * Return a string represenation of translation file content.
   * This will be stored in BackendService.
   */
  public serialize(): string {
    const serializedObject: ISerializedTranslationFile = {
      name: this.name,
      size: this.size,
      fileContent: this.fileContent,
      editedContent: this.editedContent()
    };
    return JSON.stringify(serializedObject);
  }

}
