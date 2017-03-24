import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateUnitComponent } from './translate-unit.component';

describe('TranslateUnitComponent', () => {
  let component: TranslateUnitComponent;
  let fixture: ComponentFixture<TranslateUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslateUnitComponent ]
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
