import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateUnitListComponent } from './translate-unit-list.component';
import {AbbreviatePipe} from '../common/abbreviate.pipe';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('TranslateUnitListComponent', () => {
  let component: TranslateUnitListComponent;
  let fixture: ComponentFixture<TranslateUnitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslateUnitListComponent, AbbreviatePipe ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslateUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
