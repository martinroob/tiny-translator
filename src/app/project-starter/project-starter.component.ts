import {Component, OnInit} from '@angular/core';
import {TinyTranslatorService} from '../tiny-translator.service';
import {TranslationFile} from '../translation-file';
import {Router} from '@angular/router';

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

  private selectedFiles: FileList;

  private isSelectionDone = false;

  constructor(private translatorService: TinyTranslatorService, private router: Router) { }

  ngOnInit() {
  }

  public fileSelectionChange(input: HTMLInputElement) {
    this.selectedFiles = input.files;
    if (this.selectedFiles.length > 0) {
      this.isSelectionDone = true;
    }
    this.translatorService.startProject(this.selectedFiles);
  }

  public canStartWork(): boolean {
    return this.isSelectionDone && this.translatorService.canStartWork();
  }

  public startWork(translationFile: TranslationFile) {
    console.log('Set current file to ', translationFile.name);
    this.translatorService.setCurrentFile(translationFile);
    this.router.navigateByUrl('translate');
  }

  public selectedFilesInfo(): TranslationFile[] {
    return this.translatorService.translationFiles();
  }
}
