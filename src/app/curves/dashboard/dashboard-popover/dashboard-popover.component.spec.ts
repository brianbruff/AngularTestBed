import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPopoverComponent } from './dashboard-popover.component';

describe('DashboardPopoverComponent', () => {
  let component: DashboardPopoverComponent;
  let fixture: ComponentFixture<DashboardPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
