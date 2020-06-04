import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IoUpdateEffectivenessIndicatorComponent } from './io-update-effectiveness-indicator.component';

describe('IoUpdateEffectivenessIndicatorComponent', () => {
  let component: IoUpdateEffectivenessIndicatorComponent;
  let fixture: ComponentFixture<IoUpdateEffectivenessIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IoUpdateEffectivenessIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IoUpdateEffectivenessIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
