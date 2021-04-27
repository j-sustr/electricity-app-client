import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregationInputComponent } from './aggregation-input.component';

describe('AggregationInputComponent', () => {
    let component: AggregationInputComponent;
    let fixture: ComponentFixture<AggregationInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AggregationInputComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AggregationInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});
