import {Component, Input, OnInit} from '@angular/core';
import {TranslationFile} from '../translation-file';

@Component({
  selector: 'app-translation-file-status',
  templateUrl: './translation-file-status.component.html',
  styleUrls: ['./translation-file-status.component.css']
})
export class TranslationFileStatusComponent implements OnInit {

  @Input() translationFile: TranslationFile;

  constructor() { }

  ngOnInit() {
  }

}
