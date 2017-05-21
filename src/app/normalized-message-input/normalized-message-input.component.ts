import {Component, forwardRef, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {NormalizedMessage} from '../model/normalized-message';
import {isNullOrUndefined} from 'util';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
/**
 * A component used as an input field for normalized message.
 */
@Component({
  selector: 'app-normalized-message-input',
  templateUrl: './normalized-message-input.component.html',
  styleUrls: ['./normalized-message-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NormalizedMessageInputComponent),
      multi: true
    }
  ]
})
export class NormalizedMessageInputComponent implements OnInit, OnChanges, ControlValueAccessor {

  /**
   * The message to be edited or shown.
   */
  @Input() message: NormalizedMessage;

  /**
   * Flag, wether the message should be shown in normalized form.
   */
  @Input() normalized: boolean;

  /**
   * Flag, wether message is read only.
   * Then, there is no input field, but only the text is shown.
   */
  @Input() readonly: boolean;

  form: FormGroup;

  propagateChange = (_: any) => {};
  disabled: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form.valueChanges.debounceTime(200).subscribe(formValue => {this.valueChanged(formValue)});
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.form) {
      this.form = this.formBuilder.group({displayedText: [{value: this.textToDisplay(), disabled: this.disabled}]});
    }
    const isChanged = !isNullOrUndefined(changes['message']) || !isNullOrUndefined(changes['normalized']);
    if (isChanged) {
      this.form.controls['displayedText'].setValue(this.textToDisplay());
    }
  }

  /**
   * Write a new value to the element.
   */
  writeValue(obj: any): void {
    this.message = obj;
  }

  /**
   * Set the function to be called when the control receives a change event.
   */
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  /**
   * Set the function to be called when the control receives a touch event.
   */
  registerOnTouched(fn: any): void {

  }

  /**
   * This function is called when the control status changes to or from "DISABLED".
   * Depending on the value, it will enable or disable the appropriate DOM element.
   *
   * @param isDisabled
   */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.form = this.formBuilder.group({displayedText: [{value: this.textToDisplay(), disabled: this.disabled}]});
  }

  textToDisplay(): string {
    if (this.message) {
      return this.message.dislayText(this.normalized);
    } else {
      return '';
    }
  }

  private valueChanged(value: any) {
    if (!this.readonly) {
      let textEntered = value.displayedText;
      this.message = this.message.translate(textEntered, this.normalized);
    }
    this.propagateChange(this.message);
  }
}
