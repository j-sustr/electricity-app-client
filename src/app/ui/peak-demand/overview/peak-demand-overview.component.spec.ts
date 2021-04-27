import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeakDemandOverviewComponent } from './peak-demand-overview.component';

describe('PeakDemandOverviewComponent', () => {
    let component: PeakDemandOverviewComponent;
    let fixture: ComponentFixture<PeakDemandOverviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PeakDemandOverviewComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PeakDemandOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    //   it('should create', () => {
    //     expect(component).toBeTruthy();
    //   });
});
