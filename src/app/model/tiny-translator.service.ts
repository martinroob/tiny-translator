import {Injectable} from '@angular/core';
import {TranslationFile} from './translation-file';
import {isNullOrUndefined} from 'util';
import {BackendServiceAPI} from './backend-service-api';
import {TranslationProject, WorkflowType} from './translation-project';
import {Observable} from 'rxjs';
import {DownloaderService} from './downloader.service';
import {AsynchronousFileReaderService} from './asynchronous-file-reader.service';
import {
  AutoTranslateDisabledReason, AutoTranslateDisabledReasonKey,
  AutoTranslateServiceAPI
} from './auto-translate-service-api';
import {AutoTranslateSummaryReport} from './auto-translate-summary-report';

@Injectable()
export class TinyTranslatorService {

  /**
   * List of projects for work.
   */
  private _projects: TranslationProject[];

  /**
   * The current project.
   */
  private _currentProject: TranslationProject;

  constructor(private backendService: BackendServiceAPI,
              private fileReaderService: AsynchronousFileReaderService,
              private downloaderService: DownloaderService,
              private autoTranslateService: AutoTranslateServiceAPI) {
    this._projects = this.backendService.projects();
    this.autoTranslateService.setApiKey(this.backendService.autoTranslateApiKey());
  }

  /**
   * Add a new project.
   * @param project
   * @return list of errors found in file selection.
   */
  public addProject(project: TranslationProject): string[] {
    this._projects.push(project);
    this.backendService.store(project);
    // TODO error handling
    return [];
  }

  /**
   * Create a new project.
   * (you must add it with addProject to use it).
   * @param projectName
   * @param file selected xlf or xmb file to translate
   * @param masterXmbFile in case of xmb the master file
   * @param workflowType Type of workflow used in project (singleUser versus withReview).
   * @return {TranslationProject}
   */
  public createProject(projectName: string, file: File, masterXmbFile?: File, workflowType?: WorkflowType): Observable<TranslationProject> {
    const uploadingFile = this.fileReaderService.readFile(file);
    const readingMaster = this.fileReaderService.readFile(masterXmbFile);
    return TranslationFile.fromUploadedFile(uploadingFile, readingMaster)
      .map((translationfile: TranslationFile) => {
        return new TranslationProject(projectName, translationfile, workflowType);
      });
  }

  /**
   * Test, wether the project selection is ready to start.
   * This is the case, if there is a valid xlf file selected.
   * @return {boolean}
   */
  public canStartWork(): boolean {
    return this._projects && this._projects.length > 0 && !this.hasErrors();
  }

  public setCurrentProject(project: TranslationProject) {
    if (!this._projects.find(p => p === project)) {
      throw new Error('oops, selected project not in list');
    }
    this._currentProject = project;
  }

  public currentProject(): TranslationProject {
    return this._currentProject;
  }

  /**
   * Check, wether there are errors in any of the selected files.
   * @return {boolean}
   */
  public hasErrors(): boolean {
    if (!this._projects || this._projects.length === 0) {
      return false;
    }
    const projectWithErrors = this._projects.find((p) => p.hasErrors());
    return !isNullOrUndefined(projectWithErrors);
  }

  public projects(): TranslationProject[] {
    return this._projects;
  }

  public commitChanges(project: TranslationProject) {
    this.backendService.store(project);
  }

  public saveProject(project: TranslationProject) {
    this.downloaderService.downloadXliffFile(project.translationFile.name, project.translationFile.editedContent());
    project.translationFile.markExported();
    this.commitChanges(project);
  }

  public deleteProject(project: TranslationProject) {
    this.backendService.delete(project);
    const index = this._projects.findIndex(p => p === project);
    if (index >= 0) {
      this._projects = this._projects.slice(0, index).concat(this._projects.slice(index + 1));
    }
  }

  /**
   * Set an API key for Google Translate.
   * Will be stored in local storage.
   * @param key
   */
  public setAutoTranslateApiKey(key: string) {
    this.autoTranslateService.setApiKey(key);
    this.backendService.storeAutoTranslateApiKey(key);
  }

  /**
   * Get the currently active Google Translate API key.
   * @return {string}
   */
  public autoTranslateApiKey(): string {
    return this.autoTranslateService.apiKey();
  }

  /**
   * Test, wether auto translation is possible for current project.
   * @return {Observable<boolean>}
   */
  public canAutoTranslate(): Observable<boolean> {
    if (isNullOrUndefined(this.currentProject()) || !this.currentProject().canTranslate()) {
      return Observable.of(false);
    }
    return this.canAutoTranslateForLanguages(
      this.currentProject().translationFile.sourceLanguage(),
      this.currentProject().translationFile.targetLanguage());
  }

  /**
   * Test, wether auto translation is possible for given languages.
   * @param source Source Language
   * @param target Target Language
   * @return {Observable<boolean>}
   */
  public canAutoTranslateForLanguages(source: string, target: string): Observable<boolean> {
    return this.autoTranslateService.canAutoTranslate(source, target);
  }

  /**
   * Reason, why auto translation is not possible for current project.
   * @return {Observable<string>}
   */
  public autoTranslateDisabledReason(): Observable<string> {
    if (isNullOrUndefined(this.currentProject()) || !this.currentProject().canTranslate()) {
      return Observable.of('no translatable project');
    }
    return this.autoTranslateDisabledReasonForLanguages(
      this.currentProject().translationFile.sourceLanguage(),
      this.currentProject().translationFile.targetLanguage());
  }

  /**
   * Reason, why auto translation is not possible for given languages.
   * @return {Observable<string>}
   */
  public autoTranslateDisabledReasonForLanguages(source: string, target: string): Observable<string> {
    return this.autoTranslateService.disabledReason(source, target).map((reason) => {
      if (isNullOrUndefined(reason)) {
        return null; // means not disabled, everything is ok!
      }
      switch (reason.reason) {
        case AutoTranslateDisabledReasonKey.NO_PROVIDER:
          return 'no provider';
        case AutoTranslateDisabledReasonKey.NO_KEY:
          return 'no key';
        case AutoTranslateDisabledReasonKey.INVALID_KEY:
          return 'invalid key';
        case AutoTranslateDisabledReasonKey.SOURCE_LANG_NOT_SUPPORTED:
          return 'source language not supported';
        case AutoTranslateDisabledReasonKey.TARGET_LANG_NOT_SUPPORTED:
          return 'target language not supported';
        case AutoTranslateDisabledReasonKey.CONNECT_PROBLEM:
          return 'connection problem: ' + reason.details;
      }
    });
  }

  /**
   * Test call the auto translate service.
   * @param message
   * @param source
   * @param target
   * @return {Observable<string>}
   */
  public testAutoTranslate(message: string, source: string, target: string): Observable<string> {
    return this.autoTranslateService.translate(message, source, target);
  }

  /**
   * Auto translate all untranslated units.
   */
  public autoTranslate(): Observable<AutoTranslateSummaryReport>  {
    if (this.currentProject() && this.currentProject().translationFile) {
      return this.currentProject().translationFile.autoTranslateUsingService(this.autoTranslateService);
    } else {
      return Observable.of(new AutoTranslateSummaryReport());
    }
  }

}
