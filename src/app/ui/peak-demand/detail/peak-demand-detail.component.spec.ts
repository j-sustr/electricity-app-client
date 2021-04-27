import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeakDemandDetailComponent } from './peak-demand-detail.component';

describe('PeakDemandDetailComponent', () => {
    let component: PeakDemandDetailComponent;
    let fixture: ComponentFixture<PeakDemandDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PeakDemandDetailComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PeakDemandDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});
