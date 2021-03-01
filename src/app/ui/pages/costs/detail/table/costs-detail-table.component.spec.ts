import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostsDetailTableComponent } from './costs-detail-table.component';

describe('CostsDetailTableComponent', () => {
  let component: CostsDetailTableComponent;
  let fixture: ComponentFixture<CostsDetailTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostsDetailTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostsDetailTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
