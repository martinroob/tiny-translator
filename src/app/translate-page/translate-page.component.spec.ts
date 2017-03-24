import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatePageComponent } from './translate-page.component';

describe('TranslatePageComponent', () => {
  let component: TranslatePageComponent;
  let fixture: ComponentFixture<TranslatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
