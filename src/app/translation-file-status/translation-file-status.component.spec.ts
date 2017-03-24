import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {TranslationFile} from '../translation-file';

import { TranslationFileStatusComponent } from './translation-file-status.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('TranslationFileStatusComponent', () => {
  let component: TranslationFileStatusComponent;
  let fixture: ComponentFixture<TranslationFileStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationFileStatusComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationFileStatusComponent);
    component = fixture.componentInstance;
    component.translationFile = new TranslationFile(new File([], 'dummy'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
