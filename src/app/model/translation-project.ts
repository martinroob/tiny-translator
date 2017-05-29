import {TranslationFile} from './translation-file';
import {TranslationFileView} from './translation-file-view';
import {isNullOrUndefined} from 'util';

export enum WorkflowType {
  SINGLE_USER,
  WITH_REVIEW
}

/**
 * A Translation Project.
 * A name and a translation file.
 */
export class TranslationProject {

  public id: string;

  private _view: TranslationFileView;

  /**
   * Create a project from the serialization.
   * @param serializationString
   * @return {TranslationProject}
   */
  static deserialize(serializationString: string): TranslationProject {
    const deserializedObject: any = JSON.parse(serializationString);
    const project = new TranslationProject(deserializedObject.name, TranslationFile.deserialize(deserializedObject.translationFile));
    project.id = deserializedObject.id;
    return project;
  }

  constructor(private _name: string, private _translationFile: TranslationFile, private _workflowType?: WorkflowType) {
    if (isNullOrUndefined(this._workflowType)) {
      this._workflowType = WorkflowType.SINGLE_USER;
    }
    this._view = new TranslationFileView(_translationFile);
  }

  /**
   * Return a string represenation of project state.
   * This will be stored in BackendService.
   */
  public serialize(): string {
    const serializedObject = {
      id: this.id,
      name: this.name,
      translationFile: this.translationFile.serialize(),
      workflowType: this.workflowType
    };
    return JSON.stringify(serializedObject);
  }

  get name(): string {
    return this._name;
  }

  get translationFile(): TranslationFile {
    return this._translationFile;
  }

  get translationFileView(): TranslationFileView {
    return this._view;
  }

  get workflowType(): WorkflowType {
    return this._workflowType ? this._workflowType : WorkflowType.SINGLE_USER;
  }

  public setWorkflowType(type: WorkflowType) {
    this._workflowType = type;
  }

  public hasErrors(): boolean {
    return this.translationFile && this.translationFile.hasErrors();
  }

  public canTranslate(): boolean {
    return this.translationFile && this.translationFile.canTranslate();
  }

}
