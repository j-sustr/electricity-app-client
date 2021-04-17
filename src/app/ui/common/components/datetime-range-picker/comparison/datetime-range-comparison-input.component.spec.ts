import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimeRangeComparisonInputComponent } from './datetime-range-comparison-input.component';

describe('DatetimeRangeComparisonInputComponent', () => {
    let component: DatetimeRangeComparisonInputComponent;
    let fixture: ComponentFixture<DatetimeRangeComparisonInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DatetimeRangeComparisonInputComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(
            DatetimeRangeComparisonInputComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
