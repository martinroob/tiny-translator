import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateUnitWarningConfirmDialogComponent } from './translate-unit-warning-confirm-dialog.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MdDialog, MdDialogContainer, MdDialogModule, MdDialogRef, Overlay} from '@angular/material';
import {AppModule} from '../app.module';

describe('TranslateUnitWarningConfirmDialogComponent', () => {
  let dialog: MdDialog;
  let component: TranslateUnitWarningConfirmDialogComponent;
  let fixture: ComponentFixture<TranslateUnitWarningConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [AppModule, MdDialogModule],
      providers: [MdDialogRef],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.get(MdDialog);
    let dialogRef = dialog.open(TranslateUnitWarningConfirmDialogComponent);
    fixture = TestBed.createComponent(TranslateUnitWarningConfirmDialogComponent);
    component = dialogRef.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
