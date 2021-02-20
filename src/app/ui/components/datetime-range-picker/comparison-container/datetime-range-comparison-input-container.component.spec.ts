import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimeRangeComparisonInputContainerComponent } from './datetime-range-comparison-input-container.component';

describe('DatetimeRangeComparisonInputContainerComponent', () => {
    let component: DatetimeRangeComparisonInputContainerComponent;
    let fixture: ComponentFixture<DatetimeRangeComparisonInputContainerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DatetimeRangeComparisonInputContainerComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(
            DatetimeRangeComparisonInputContainerComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
