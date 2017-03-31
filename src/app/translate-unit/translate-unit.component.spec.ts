import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateUnitComponent } from './translate-unit.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('TranslateUnitComponent', () => {
  let component: TranslateUnitComponent;
  let fixture: ComponentFixture<TranslateUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslateUnitComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslateUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
