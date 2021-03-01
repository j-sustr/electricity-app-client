import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostsDetailComponent } from './costs-detail.component';

describe('CostsDetailComponent', () => {
  let component: CostsDetailComponent;
  let fixture: ComponentFixture<CostsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
