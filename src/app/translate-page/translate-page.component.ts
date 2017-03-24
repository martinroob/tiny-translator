import { Component, OnInit } from '@angular/core';
import {TinyTranslatorService} from '../tiny-translator.service';
import {TranslationFile} from '../translation-file';
import {ITransUnit} from 'ngx-i18nsupport/dist';

@Component({
  selector: 'app-translate-page',
  templateUrl: './translate-page.component.html',
  styleUrls: ['./translate-page.component.css']
})
export class TranslatePageComponent implements OnInit {

  constructor(private translationService: TinyTranslatorService) { }

  ngOnInit() {
  }

  currentFile(): TranslationFile {
    return this.translationService.currentFile();
  }

  transUnit(): ITransUnit {
    const currentFile = this.translationService.currentFile();
    return currentFile ? currentFile.currentTransUnit() : null;
  }
}
