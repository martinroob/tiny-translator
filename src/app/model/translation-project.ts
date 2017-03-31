import {TranslationFile} from './translation-file';

/**
 * A Translation Project.
 * A name and a translation file.
 */
export class TranslationProject {

  public id: string;

  constructor(private _name: string, private _translationFile: TranslationFile) {

  }

  get name(): string {
    return this._name;
  }

  get translationFile(): TranslationFile {
    return this._translationFile;
  }

  public hasErrors(): boolean {
    return this.translationFile && this.translationFile.hasErrors();
  }

  public canTranslate(): boolean {
    return this.translationFile && this.translationFile.canTranslate();
  }

  /**
   * Return a string represenation of project state.
   * This will be stored in BackendService.
   */
  public serialize(): string {
    const serializedObject = {
      id: this.id,
      name: this.name,
      translationFile: this.translationFile.serialize()
    };
    return JSON.stringify(serializedObject);
  }

  /**
   * Create a project from the serialization.
   * @param serializationString
   * @return {TranslationProject}
   */
  static deserialize(serializationString: string): TranslationProject {
    let deserializedObject: any = JSON.parse(serializationString);
    let project = new TranslationProject(deserializedObject.name, TranslationFile.deserialize(deserializedObject.translationFile));
    project.id = deserializedObject.id;
    return project;
  }
}
