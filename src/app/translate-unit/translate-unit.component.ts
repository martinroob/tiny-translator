import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {TranslationUnit} from '../model/translation-unit';
import {MdDialog, MdSnackBar} from '@angular/material';
import {NormalizedMessage} from '../model/normalized-message';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {TranslateUnitWarningConfirmDialogComponent} from '../translate-unit-warning-confirm-dialog/translate-unit-warning-confirm-dialog.component';
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

  @Input() translationUnit: TranslationUnit;

  @Input() showNormalized: boolean = true;

  @Output() translationChanged: EventEmitter<TranslationUnit> = new EventEmitter();

  form: FormGroup;

  private _editedTargetMessage: NormalizedMessage;
  private isMarkedAsTranslated = false;

  constructor(private formBuilder: FormBuilder, private dialog: MdDialog, private _snackbar: MdSnackBar) { }

  ngOnInit() {
    this.form.valueChanges.subscribe(formValue => {this.valueChanged(formValue)});
  }

  private valueChanged(v: any) {
    console.log('tu form value changed: ', v);
    this._editedTargetMessage = v._editedTargetMessage;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.form) {
      this.form = this.formBuilder.group({_editedTargetMessage: [this.targetContentNormalized()]});
    }
    const changedTranslationUnit: SimpleChange = changes['translationUnit'];
    if (changedTranslationUnit) {
      if (changedTranslationUnit.currentValue) {
        this._editedTargetMessage = changedTranslationUnit.currentValue.targetContentNormalized();
      } else {
        this._editedTargetMessage = null;
      }
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

  public targetContentNormalized(): NormalizedMessage {
    if (this.translationUnit) {
      return this.translationUnit.targetContentNormalized();
    } else {
      return null;
    }
  }

  /**
   * Toggle between normalized an native markup.
   */
  public toggleNormalized() {
    this.showNormalized = !this.showNormalized;
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
    let errors = this._editedTargetMessage.validate(this.showNormalized);
    if (errors) {
      return Object.keys(errors).map(key => errors[key]);
    } else {
      return [];
    }
  }

  warnings(): any[] {
    let errors = this._editedTargetMessage.validateWarnings(this.showNormalized);
    if (errors) {
      return Object.keys(errors).map(key => errors[key]);
    } else {
      return [];
    }
  }

  public commitChanges() {
    if (this.translationUnit) {
      console.log('accept ', this._editedTargetMessage);
      if (this.isTranslationChanged() || this.isMarkedAsTranslated) {
        this.translationUnit.translate(this._editedTargetMessage);
        this.translationChanged.emit(this.translationUnit);
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

  /**
   * If there are errors or warnings, open a dialog to conform what to do.
   * There are 3 possible results:
   * 'cancel': do not do anything, stay on this trans unit.
   * 'discard': do not translate, leave transunit unchanged, but go to the next/prev unit.
   * 'accept': translate tu as given, ignoring warnings (errors cannot be ignored).
   * @return {any}
   */
  openConfirmWarningsDialog(): Observable<any> {
    let warnings = this.warnings();
    let errors = this.errors();
    if (warnings.length === 0 && errors.length === 0) {
      // everything good, we don´t need a dialog then.
      return Observable.of('accept');
    } else if (!this.isTranslationChanged()) {
      return Observable.of('accept');
    } else {
      let dialogRef = this.dialog.open(TranslateUnitWarningConfirmDialogComponent,
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
            if (this.translationUnit.translationFile().hasNext()) {
              this.translationUnit.translationFile().nextTransUnit();
            }
            break;
          case 'accept':
            this.commitChanges();
            if (this.translationUnit.translationFile().hasNext()) {
              this.translationUnit.translationFile().nextTransUnit();
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
      return this.translationUnit.translationFile().hasNext();
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
            if (this.translationUnit.translationFile().hasPrev()) {
              this.translationUnit.translationFile().prevTransUnit();
            }
            break;
          case 'accept':
            this.commitChanges();
            if (this.translationUnit.translationFile().hasPrev()) {
              this.translationUnit.translationFile().prevTransUnit();
            }
            break;
        }
      });
    }
  }

  public hasPrev(): boolean {
    if (this.translationUnit) {
      return this.translationUnit.translationFile().hasPrev();
    } else {
      return false;
    }
  }
}
