import {Component, OnInit} from '@angular/core';
import {TinyTranslatorService} from '../model/tiny-translator.service';
import {TranslationFile} from '../model/translation-file';
import {Router} from '@angular/router';
import {TranslationProject} from '../model/translation-project';

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
  styleUrls: ['./project-starter.component.css']
})
export class ProjectStarterComponent implements OnInit {

  private projectName: string; // set via input field
  private selectedFiles: FileList;

  constructor(private translatorService: TinyTranslatorService, private router: Router) { }

  ngOnInit() {
  }

  public fileSelectionChange(input: HTMLInputElement) {
    this.selectedFiles = input.files;
  }

  public addProject() {
    this.translatorService.createProject(this.projectName, this.selectedFiles).map((newProject: TranslationProject) => {
      this.translatorService.addProject(newProject);
    }).subscribe();
  }

}
