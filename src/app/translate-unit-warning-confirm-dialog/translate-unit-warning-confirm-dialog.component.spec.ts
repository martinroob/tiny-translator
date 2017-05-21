import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateUnitWarningConfirmDialogComponent } from './translate-unit-warning-confirm-dialog.component';

describe('TranslateUnitWarningConfirmDialogComponent', () => {
  let component: TranslateUnitWarningConfirmDialogComponent;
  let fixture: ComponentFixture<TranslateUnitWarningConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslateUnitWarningConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslateUnitWarningConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
