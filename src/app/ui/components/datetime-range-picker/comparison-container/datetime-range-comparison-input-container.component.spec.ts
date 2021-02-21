import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
    selectDataSourceInfo,
    selectDataSourceIntervals
} from 'src/app/ui/store/data-source/data-source.selectors';

import { DatetimeRangeComparisonInputContainerComponent } from './datetime-range-comparison-input-container.component';

describe('DatetimeRangeComparisonInputContainerComponent', () => {
    let component: DatetimeRangeComparisonInputContainerComponent;
    let fixture: ComponentFixture<DatetimeRangeComparisonInputContainerComponent>;
    let store: MockStore<unknown>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DatetimeRangeComparisonInputContainerComponent],
            providers: [provideMockStore()]
        }).compileComponents();

        store = TestBed.inject<MockStore<unknown>>(MockStore);
        store.overrideSelector(selectDataSourceIntervals, [
            { start: -Infinity, end: Infinity },
            { start: -Infinity, end: Infinity }
        ]);
        store.overrideSelector(selectDataSourceInfo, {
            minDatetime: new Date(2021, 0, 1),
            maxDatetime: new Date(2021, 1, 1)
        });
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
