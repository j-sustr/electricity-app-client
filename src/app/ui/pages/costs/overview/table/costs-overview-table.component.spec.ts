import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostsOverviewTableComponent } from './costs-overview-table.component';

describe('CostsOverviewTableComponent', () => {
  let component: CostsOverviewTableComponent;
  let fixture: ComponentFixture<CostsOverviewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostsOverviewTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostsOverviewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
