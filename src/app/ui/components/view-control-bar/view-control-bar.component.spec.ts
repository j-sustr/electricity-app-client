import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewControlBarComponent } from './view-control-bar.component';

describe('ViewControlBarComponent', () => {
  let component: ViewControlBarComponent;
  let fixture: ComponentFixture<ViewControlBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewControlBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewControlBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
