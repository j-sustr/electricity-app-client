import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerFactorDetailComponent } from './power-factor-detail.component';

describe('PowerFactorDetailComponent', () => {
  let component: PowerFactorDetailComponent;
  let fixture: ComponentFixture<PowerFactorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerFactorDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerFactorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
