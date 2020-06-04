import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IoOpenFollowListComponent } from './io-open-follow-list.component';

describe('IoOpenFollowListComponent', () => {
  let component: IoOpenFollowListComponent;
  let fixture: ComponentFixture<IoOpenFollowListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IoOpenFollowListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IoOpenFollowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
