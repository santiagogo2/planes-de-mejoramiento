import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IoRegisterComponent } from './io-register.component';

describe('IoRegisterComponent', () => {
  let component: IoRegisterComponent;
  let fixture: ComponentFixture<IoRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IoRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
