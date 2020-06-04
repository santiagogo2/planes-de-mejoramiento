import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionUpdateLineComponent } from './action-update-line.component';

describe('ActionUpdateLineComponent', () => {
  let component: ActionUpdateLineComponent;
  let fixture: ComponentFixture<ActionUpdateLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionUpdateLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionUpdateLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
