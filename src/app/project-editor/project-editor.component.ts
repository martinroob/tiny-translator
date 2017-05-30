import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslationProject, WorkflowType} from '../model/translation-project';
import {FormBuilder, FormGroup} from '@angular/forms';

/**
 * Component to edit some properties of the current project.
 * (name, workflowType).-
 */
@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.css']
})
export class ProjectEditorComponent implements OnInit {

  @Output() onEditProject: EventEmitter<TranslationProject> = new EventEmitter();

  @Input() project: TranslationProject;

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    if (!this.form) {
      this.form = this.formBuilder.group({
        projectName: [this.project.name],
        workflowType: [this.workflowTypeToString(this.project.workflowType)],
      });
    }
  }

  toWorkflowType(type: string): WorkflowType {
    switch (type) {
      case 'singleuser':
        return WorkflowType.SINGLE_USER;
      case 'withReview':
        return WorkflowType.WITH_REVIEW;
      default:
        return null;
    }
  }

  workflowTypeToString(type: WorkflowType): string {
    switch(type) {
      case WorkflowType.SINGLE_USER:
        return 'singleuser';
      case WorkflowType.WITH_REVIEW:
        return 'withReview';
    }
  }

  editProject() {
    this.project.setName(this.form.value.projectName);
    this.project.setWorkflowType(this.toWorkflowType(this.form.value.workflowType));
    this.onEditProject.emit(this.project);
  }

  selectedFilesFormatted(): string {
    return this.project.translationFile.name;
  }

}
