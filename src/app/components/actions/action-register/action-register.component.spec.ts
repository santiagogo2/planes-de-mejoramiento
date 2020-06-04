import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionRegisterComponent } from './action-register.component';

describe('ActionRegisterComponent', () => {
  let component: ActionRegisterComponent;
  let fixture: ComponentFixture<ActionRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
