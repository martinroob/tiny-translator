import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationFileStatusComponent } from './translation-file-status.component';

describe('TranslationFileStatusComponent', () => {
  let component: TranslationFileStatusComponent;
  let fixture: ComponentFixture<TranslationFileStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationFileStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationFileStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
