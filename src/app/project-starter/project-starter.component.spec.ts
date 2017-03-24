import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStarterComponent } from './project-starter.component';

describe('ProjectStarterComponent', () => {
  let component: ProjectStarterComponent;
  let fixture: ComponentFixture<ProjectStarterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectStarterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
