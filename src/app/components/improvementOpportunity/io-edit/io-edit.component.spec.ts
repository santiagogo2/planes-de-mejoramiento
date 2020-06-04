import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IoEditComponent } from './io-edit.component';

describe('IoEditComponent', () => {
  let component: IoEditComponent;
  let fixture: ComponentFixture<IoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
