import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeakDemandDetailChartComponent } from './peak-demand-detail-chart.component';

describe('PeakDemandDetailChartComponent', () => {
  let component: PeakDemandDetailChartComponent;
  let fixture: ComponentFixture<PeakDemandDetailChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeakDemandDetailChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeakDemandDetailChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
