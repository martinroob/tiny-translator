import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TinyTranslatorService} from '../model/tiny-translator.service';
import {TranslationFile} from '../model/translation-file';
import {TranslationProject} from '../model/translation-project';
import {Observable} from 'rxjs';

interface FileInfo {
  name: string;
  type: string;
  size: number;
}

/**
 * The ProjectStarter is an upload component.
 * You can upload a file for translation (xliff file normally) to start working with it.
 */
@Component({
  selector: 'app-project-starter',
  templateUrl: './project-starter.component.html',
  styleUrls: ['./project-starter.component.scss']
})
export class ProjectStarterComponent implements OnInit {

  @Output() onAddProject: EventEmitter<TranslationProject> = new EventEmitter();

  public projectName: string; // set via input field
  private selectedFiles: FileList;
  private selectedMasterXmbFiles;
  private createdProject: TranslationProject;

  constructor(private translatorService: TinyTranslatorService) { }

  ngOnInit() {
  }

  fileSelectionChange(input: HTMLInputElement) {
    this.selectedFiles = input.files;
    const translationFile = (this.selectedFiles) ? this.selectedFiles.item(0) : null;
    const masterXmbFile = (this.selectedMasterXmbFiles) ? this.selectedMasterXmbFiles.item(0) : null;
    this.translatorService.createProject(this.projectName, translationFile, masterXmbFile).subscribe((newProject) => {
      this.createdProject = newProject;
    });
  }

  addProject() {
      this.onAddProject.emit(new TranslationProject(this.projectName, this.createdProject.translationFile));
  }

  selectedFilesFormatted(): string {
    return this.fileListFormatted(this.selectedFiles);
  }

  selectedMasterFilesFormatted(): string {
    return this.fileListFormatted(this.selectedMasterXmbFiles);
  }

  private fileListFormatted(fileList: FileList): string {
    if (fileList) {
      let result = '';
      for (let i = 0; i < fileList.length; i++) {
        if (i > 0) {
          result = result + ', ';
        }
        result = result + fileList.item(i).name;
      }
      return result;
    } else {
      return '';
    }
  }

  /**
   * If the first file was a xmb file, master is needed.
   * Enables the input for a second file, the master xmb.
   */
  isMasterXmbFileNeeded(): boolean {
    return this.isFileSelected() && this.createdProject && this.createdProject.translationFile && this.createdProject.translationFile.fileType() === 'XMB';
  }

  masterXmlFileSelectionChange(input: HTMLInputElement) {
    this.selectedMasterXmbFiles = input.files;
    const translationFile = (this.selectedFiles) ? this.selectedFiles.item(0) : null;
    const masterXmbFile = (this.selectedMasterXmbFiles) ? this.selectedMasterXmbFiles.item(0) : null;
    this.translatorService.createProject(this.projectName, translationFile, masterXmbFile).subscribe((newProject) => {
      this.createdProject = newProject;
    });
  }

  /**
   * Check, wether all needed is typed in.
   * Enables the add button.
   */
  isInputComplete(): boolean {
    return this.projectName && this.isFileSelected();
  }

  isFileSelected(): boolean {
    return this.selectedFiles && this.selectedFiles.length > 0 && !!this.createdProject;
  }
}
