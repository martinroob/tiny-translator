import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectPageComponent } from './edit-project-page.component';

describe('EditProjectPageComponent', () => {
  let component: EditProjectPageComponent;
  let fixture: ComponentFixture<EditProjectPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProjectPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
