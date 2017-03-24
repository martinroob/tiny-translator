import { Injectable } from '@angular/core';
import {ITranslationMessagesFile } from 'ngx-i18nsupport/dist';
import {TranslationFile} from './translation-file';
import {isNullOrUndefined} from 'util';

@Injectable()
export class TinyTranslatorService {

  /**
   * List of selected files for work.
   */
  private _selectedFiles: TranslationFile[];

  /**
   * The current work file.
   */
  private _currentFile: TranslationFile;

  constructor() { }

  /**
   * Start working on a new translation.
   * @param files selected xlf files to translate
   * @return list of errors found in file selection.
   */
  public startProject(files: FileList): string[] {
    this._selectedFiles = [];
    for (let i = 0; i < files.length; i++) {
      this._selectedFiles.push(new TranslationFile(files.item(i)));
    }
    return [];
  }

  /**
   * Test, wether the project selection is ready to start.
   * This is the case, if there is a valid xlf file selected.
   * @return {boolean}
   */
  public canStartWork(): boolean {
    return this._selectedFiles && this._selectedFiles.length > 0 && !this.hasErrors();
  }

  public setCurrentFile(translationFile: TranslationFile) {
    if (!this._selectedFiles.find(f => f === translationFile)) {
      throw new Error('oops, selected file is not in project');
    }
    this._currentFile = translationFile;
  }

  public currentFile(): TranslationFile {
    return this._currentFile;
  }

  /**
   * Check, wether there are errors in any of the selected files.
   * @return {boolean}
   */
  public hasErrors(): boolean {
    if (!this._selectedFiles || this._selectedFiles.length === 0) {
      return false;
    }
    const fileWithErrors = this._selectedFiles.find((file) => file.hasErrors());
    return !isNullOrUndefined(fileWithErrors);
  }

  public translationFiles(): TranslationFile[] {
    return this._selectedFiles;
  }
}
