import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerFactorOverviewComponent } from './power-factor-overview.component';

describe('PowerFactorOverviewComponent', () => {
  let component: PowerFactorOverviewComponent;
  let fixture: ComponentFixture<PowerFactorOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerFactorOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerFactorOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
