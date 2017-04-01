import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {TranslationUnit} from '../model/translation-unit';

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

  @Output() translationChanged: EventEmitter<TranslationUnit> = new EventEmitter();

  private _editedTargetText: string;
  private isMarkedAsTranslated = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const changedTranslationUnit: SimpleChange = changes['translationUnit'];
    if (changedTranslationUnit) {
      if (changedTranslationUnit.currentValue) {
        this._editedTargetText = changedTranslationUnit.currentValue.targetContent();
      } else {
        this._editedTargetText = '';
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

  public commitChanges() {
    if (this.translationUnit) {
      if (this.isTranslationChanged() || this.isMarkedAsTranslated) {
        this.translationUnit.translate(this._editedTargetText);
        this.translationChanged.emit(this.translationUnit);
      }
    }
  }

  public isTranslationChanged(): boolean {
    const original = this.translationUnit.targetContent();
    return original !== this._editedTargetText;
  }

  markTranslated() {
    this.isMarkedAsTranslated = true;
  }

  /**
   * Go to the next trans unit.
   */
  public next() {
    this.commitChanges();
    if (this.translationUnit) {
      if (this.translationUnit.translationFile().hasNext()) {
        this.translationUnit.translationFile().nextTransUnit();
      }
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
    this.commitChanges();
    if (this.translationUnit) {
      if (this.translationUnit.translationFile().hasPrev()) {
        this.translationUnit.translationFile().prevTransUnit();
      }
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
