import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslationProject} from '../model/translation-project';
import {TranslationFile} from '../model/translation-file';

/**
 * Shows the actual translation status of a project.
 * The layout is made for showing it as part of the toolbar.
 * So it is all in one row.
 */
@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  styleUrls: ['./project-status.component.css']
})
export class ProjectStatusComponent implements OnInit {

  @Input() project: TranslationProject;
  @Input() showActions: boolean = true;

  @Output() onSave: EventEmitter<TranslationProject> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  save(translationFile: TranslationFile) {
    this.onSave.emit(this.project);
  }
}
