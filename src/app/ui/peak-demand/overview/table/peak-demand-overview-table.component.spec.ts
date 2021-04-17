import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeakDemandOverviewTableComponent } from './peak-demand-overview-table.component';

describe('PeakDemandOverviewTableComponent', () => {
  let component: PeakDemandOverviewTableComponent;
  let fixture: ComponentFixture<PeakDemandOverviewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeakDemandOverviewTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeakDemandOverviewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
