import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanRegisterComponent } from './plan-register.component';

describe('PlanRegisterComponent', () => {
  let component: PlanRegisterComponent;
  let fixture: ComponentFixture<PlanRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
