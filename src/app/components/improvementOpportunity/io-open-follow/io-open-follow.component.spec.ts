import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IoOpenFollowComponent } from './io-open-follow.component';

describe('IoOpenFollowComponent', () => {
  let component: IoOpenFollowComponent;
  let fixture: ComponentFixture<IoOpenFollowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IoOpenFollowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IoOpenFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
