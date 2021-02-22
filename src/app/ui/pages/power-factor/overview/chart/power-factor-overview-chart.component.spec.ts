import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerFactorOverviewChartComponent } from './power-factor-overview-chart.component';

describe('PowerFactorOverviewChartComponent', () => {
  let component: PowerFactorOverviewChartComponent;
  let fixture: ComponentFixture<PowerFactorOverviewChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerFactorOverviewChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerFactorOverviewChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
