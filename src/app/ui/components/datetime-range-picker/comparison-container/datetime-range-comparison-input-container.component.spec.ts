import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectIntervals } from 'src/app/app/data-source/data-source.selectors';
import { selectUserRecordGroupsInterval } from 'src/app/app/groups/groups.selectors';
import { DatetimeRangePickerModule } from '../datetime-range-picker.module';
import { DatetimeRangeComparisonInputContainerComponent } from './datetime-range-comparison-input-container.component';

describe('DatetimeRangeComparisonInputContainerComponent', () => {
    let component: DatetimeRangeComparisonInputContainerComponent;
    let fixture: ComponentFixture<DatetimeRangeComparisonInputContainerComponent>;
    let store: MockStore<unknown>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DatetimeRangePickerModule],
            declarations: [DatetimeRangeComparisonInputContainerComponent],
            providers: [provideMockStore()]
        }).compileComponents();

        store = TestBed.inject<MockStore<unknown>>(MockStore);
        store.overrideSelector(selectIntervals, {
            interval1: { start: -Infinity, end: Infinity },
            interval2: { start: -Infinity, end: Infinity }
        });
        store.overrideSelector(selectUserRecordGroupsInterval, {
            start: new Date(2021, 0, 1),
            end: new Date(2021, 1, 1)
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
