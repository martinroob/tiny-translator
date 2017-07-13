import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {TranslationUnit} from '../model/translation-unit';
import {MdDialog, MdSnackBar} from '@angular/material';
import {NormalizedMessage} from '../model/normalized-message';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {TranslateUnitWarningConfirmDialogComponent} from '../translate-unit-warning-confirm-dialog/translate-unit-warning-confirm-dialog.component';
import {TranslationFileView} from '../model/translation-file-view';
import {WorkflowType} from '../model/translation-project';
import {STATE_FINAL, STATE_TRANSLATED} from 'ngx-i18nsupport-lib/dist';
import {AutoTranslateServiceAPI} from '../model/auto-translate-service-api';
import {isNullOrUndefined} from 'util';

/**
 * Component to input a new translation.
 * It shows the source and allows to input the target text.
 */
@Component({
  selector: 'app-translate-unit',
  templateUrl: './translate-unit.component.html',
  styleUrls: ['./translate-unit.component.css']
})
export class TranslateUnitComponent implements OnInit, OnChanges {

  @Input() translationFileView: TranslationFileView;

  @Input() translationUnit: TranslationUnit;

  @Input() workflowType: WorkflowType;

  @Input() showNormalized = true;

  @Input() reviewMode = false;

  /**
   * Emitted, when translation is changed.
   * @type {EventEmitter} value is the newly translated unit.
   */
  @Output() translationChanged: EventEmitter<TranslationUnit> = new EventEmitter();

  /**
   * Emitted, when user wants to navigate to another unit.
   * @type {EventEmitter<string>} string value can be 'next' or 'prev'
   */
  @Output() changeTranslationUnit: EventEmitter<string> = new EventEmitter();

  form: FormGroup;

  private _editedTargetMessage: NormalizedMessage;
  private _editableTargetMessage: NormalizedMessage;
  private isMarkedAsTranslated = false;
  private isMarkedAsReviewed = false;

  constructor(private formBuilder: FormBuilder,
              private dialog: MdDialog,
              private _snackbar: MdSnackBar,
              private autoTranslateService: AutoTranslateServiceAPI) {
  }

  ngOnInit() {
    this.initForm();
    this.form.valueChanges.subscribe(formValue => {this.valueChanged(formValue); });
  }

  private valueChanged(v: any) {
    this._editedTargetMessage = v._editedTargetMessage;
    this.showNormalized = v.showNormalized;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initForm();
    const changedTranslationUnit: SimpleChange = changes['translationUnit'];
    if (changedTranslationUnit) {
      if (changedTranslationUnit.currentValue) {
        this._editedTargetMessage = changedTranslationUnit.currentValue.targetContentNormalized();
      } else {
        this._editedTargetMessage = null;
      }
      this._editableTargetMessage = null;
    }
  }

  private initForm() {
    if (!this.form) {
      this.form = this.formBuilder.group({
        _editedTargetMessage: [this.editedTargetContentNormalized()],
        showNormalized: [this.showNormalized],
      });
    }
  }

  public transUnitID(): string {
    if (this.translationUnit) {
      return this.translationUnit.id();
    } else {
      return '';
    }
  }

  public targetState(): string {
    if (this.translationUnit) {
      return this.translationUnit.targetState();
    } else {
      return '';
    }
  }

  public targetLanguage(): string {
    if (this.translationUnit) {
      return this.translationUnit.translationFile().targetLanguage();
    } else {
      return '';
    }
  }

  public sourceContent(): string {
    if (this.translationUnit) {
      return this.translationUnit.sourceContent();
    } else {
      return '';
    }
  }

  public sourceContentNormalized(): NormalizedMessage {
    if (this.translationUnit) {
      return this.translationUnit.sourceContentNormalized();
    } else {
      return null;
    }
  }

  public editedTargetContentNormalized(): NormalizedMessage {
    if (isNullOrUndefined(this._editableTargetMessage)) {
      if (this.translationUnit) {
        this._editableTargetMessage = this.translationUnit.targetContentNormalized();
      }
    }
    return this._editableTargetMessage;
  }

  public sourceLanguage(): string {
    if (this.translationUnit) {
      return this.translationUnit.translationFile().sourceLanguage();
    } else {
      return '';
    }
  }

  public sourceDescription(): string {
    if (this.translationUnit) {
      return this.translationUnit.description();
    } else {
      return '';
    }
  }

  public sourceMeaning(): string {
    if (this.translationUnit) {
      return this.translationUnit.meaning();
    } else {
      return '';
    }
  }

  public sourceRef(): string {
    if (this.translationUnit) {
      const refs = this.translationUnit.sourceReferences();
      if (refs.length > 0) {
        return refs[0].sourcefile + ':' + refs[0].linenumber;
      }
    } else {
      return null;
    }
  }

  /**
   * Open a snackbar to show source ref
   */
  public showSourceRefInfo() {
    const sourceRefMessage = 'Original message position: ' + this.sourceRef(); // TODO i18n it
    this._snackbar.open(sourceRefMessage, 'OK', {duration: 5000}); // TODO i18n it
  }

  errors(): any[] {
    if (!this._editedTargetMessage) {
      return [];
    }
    const errors = this._editedTargetMessage.validate(this.showNormalized);
    if (errors) {
      return Object.keys(errors).map(key => errors[key]);
    } else {
      return [];
    }
  }

  warnings(): any[] {
    if (!this._editedTargetMessage) {
      return [];
    }
    const errors = this._editedTargetMessage.validateWarnings(this.showNormalized);
    if (errors) {
      return Object.keys(errors).map(key => errors[key]);
    } else {
      return [];
    }
  }

  public commitChanges() {
    if (this.translationUnit) {
      if (this.isTranslationChanged() || this.isMarkedAsTranslated || this.isMarkedAsReviewed) {
        this.translationUnit.translate(this._editedTargetMessage);
        switch (this.workflowType) {
          case WorkflowType.SINGLE_USER:
            this.translationUnit.setTargetState(STATE_FINAL);
            break;
          case WorkflowType.WITH_REVIEW:
            if (this.isMarkedAsReviewed) {
              this.translationUnit.setTargetState(STATE_FINAL);
            } else {
              this.translationUnit.setTargetState(STATE_TRANSLATED);
            }
            break;
        }
        this.translationChanged.emit(this.translationUnit);
        this.isMarkedAsTranslated = false;
        this.isMarkedAsReviewed = false;
      }
    }
  }

  public isTranslationChanged(): boolean {
    const original = this.translationUnit.targetContent();
    return original !== this._editedTargetMessage.nativeString();
  }

  markTranslated() {
    this.openConfirmWarningsDialog().subscribe(result => {
      switch (result) {
        case 'cancel':
          break;
        case 'discard':
          break;
        case 'accept':
          this.isMarkedAsTranslated = true;
          this.commitChanges();
          break;
      }

    });
  }

  markReviewed() {
    this.isMarkedAsReviewed = true;
    this.commitChanges();
  }

  /**
   * If there are errors or warnings, open a dialog to conform what to do.
   * There are 3 possible results:
   * 'cancel': do not do anything, stay on this trans unit.
   * 'discard': do not translate, leave transunit unchanged, but go to the next/prev unit.
   * 'accept': translate tu as given, ignoring warnings (errors cannot be ignored).
   * @return {any}
   */
  openConfirmWarningsDialog(): Observable<any> {
    const warnings = this.warnings();
    const errors = this.errors();
    if (warnings.length === 0 && errors.length === 0) {
      // everything good, we don´t need a dialog then.
      return Observable.of('accept');
    } else if (!this.isTranslationChanged()) {
      return Observable.of('accept');
    } else {
      const dialogRef = this.dialog.open(TranslateUnitWarningConfirmDialogComponent,
        {
          data: {errors: errors, warnings: warnings},
          disableClose: true
        }
        );
      return dialogRef.afterClosed();
    }
  }

  /**
   * Go to the next trans unit.
   */
  public next() {
    if (this.translationUnit) {
      this.openConfirmWarningsDialog().subscribe(result => {
        switch (result) {
          case 'cancel':
            break;
          case 'discard':
            if (this.translationFileView.hasNext()) {
              this.changeTranslationUnit.emit('next');
            }
            break;
          case 'accept':
            this.commitChanges();
            if (this.translationFileView.hasNext()) {
              this.changeTranslationUnit.emit('next');
            }
            break;
        }
      });
    }
  }

  /**
   * Check, wether there is a next trans unit.
   * @return {boolean}
   */
  public hasNext(): boolean {
    if (this.translationUnit) {
      return this.translationFileView.hasNext();
    } else {
      return false;
    }
  }

  public prev() {
    if (this.translationUnit) {
      this.openConfirmWarningsDialog().subscribe(result => {
        switch (result) {
          case 'cancel':
            break;
          case 'discard':
            if (this.translationFileView.hasPrev()) {
              this.changeTranslationUnit.emit('prev');
            }
            break;
          case 'accept':
            this.commitChanges();
            if (this.translationFileView.hasPrev()) {
              this.changeTranslationUnit.emit('prev');
            }
            break;
        }
      });
    }
  }

  public hasPrev(): boolean {
    if (this.translationUnit) {
      return this.translationFileView.hasPrev();
    } else {
      return false;
    }
  }

  /**
   * Auto translate this unit using Google Translate.
   */
  autoTranslate() {
    this.sourceContentNormalized().autoTranslateUsingService(
      this.autoTranslateService,
      this.sourceLanguage(),
      this.targetLanguage()
    ).subscribe((translatedMessage: NormalizedMessage) => {
        this._editableTargetMessage = translatedMessage;
        this._editedTargetMessage = translatedMessage;
        this.translationChanged.emit(this.translationUnit);
    });
  }

  autoTranslateDisabled(): Observable<boolean> {
    if (!this.translationUnit) {
      return Observable.of(true);
    }
    return this.autoTranslateService.canAutoTranslate(
      this.translationUnit.translationFile().sourceLanguage(),
      this.translationUnit.translationFile().targetLanguage()).map(val => !val);
  }

}
