import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerFactorDistributionTableComponent } from './power-factor-distribution-table.component';

describe('PowerFactorDistributionTableComponent', () => {
  let component: PowerFactorDistributionTableComponent;
  let fixture: ComponentFixture<PowerFactorDistributionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerFactorDistributionTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerFactorDistributionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
