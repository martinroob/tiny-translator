import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureAutoTranslatePageComponent } from './configure-auto-translate-page.component';

describe('ConfigureAutoTranslatePageComponent', () => {
  let component: ConfigureAutoTranslatePageComponent;
  let fixture: ComponentFixture<ConfigureAutoTranslatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureAutoTranslatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureAutoTranslatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
