import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerFactorDistributionChartComponent } from './power-factor-distribution-chart.component';

describe('PowerFactorDistributionChartComponent', () => {
  let component: PowerFactorDistributionChartComponent;
  let fixture: ComponentFixture<PowerFactorDistributionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerFactorDistributionChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerFactorDistributionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
