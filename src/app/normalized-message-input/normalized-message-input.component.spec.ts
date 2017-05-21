import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalizedMessageInputComponent } from './normalized-message-input.component';

describe('NormalizedMessageInputComponent', () => {
  let component: NormalizedMessageInputComponent;
  let fixture: ComponentFixture<NormalizedMessageInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormalizedMessageInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalizedMessageInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
