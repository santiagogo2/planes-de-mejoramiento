import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionSearchComponent } from './action-search.component';

describe('ActionSearchComponent', () => {
  let component: ActionSearchComponent;
  let fixture: ComponentFixture<ActionSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
