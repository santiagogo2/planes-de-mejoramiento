import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IoFollowActionsComponent } from './io-follow-actions.component';

describe('IoFollowActionsComponent', () => {
  let component: IoFollowActionsComponent;
  let fixture: ComponentFixture<IoFollowActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IoFollowActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IoFollowActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
