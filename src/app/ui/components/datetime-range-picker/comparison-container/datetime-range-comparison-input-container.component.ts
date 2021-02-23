import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { AppState } from 'src/app/ui/store/app-store.state';
import { actionDataSourceSetIntervals } from 'src/app/ui/store/data-source/data-source.actions';
import {
    selectDataSourceInfo,
    selectDataSourceIntervals
} from 'src/app/ui/store/data-source/data-source.selectors';
import {
    DatetimeRangeComparisonInputComponent,
    DatetimeRangeComparisonInputValueChange
} from '../comparison/datetime-range-comparison-input.component';

@Component({
    selector: 'app-datetime-range-comparison-input-container',
    templateUrl: './datetime-range-comparison-input-container.component.html',
    styleUrls: ['./datetime-range-comparison-input-container.component.scss']
})
export class DatetimeRangeComparisonInputContainerComponent
    implements AfterViewInit, OnDestroy {
    private destroy$ = new Subject();

    @ViewChild(DatetimeRangeComparisonInputComponent)
    input!: DatetimeRangeComparisonInputComponent;

    constructor(private store: Store<AppState>) {}

    ngAfterViewInit(): void {
        this.store
            .pipe(select(selectDataSourceIntervals), take(1))
            .subscribe((intervals) => {
                setTimeout(() => {
                    if (intervals.length > 1) {
                        this.input.addRange();
                    }
                }, 0);
            });

        this.store
            .pipe(select(selectDataSourceInfo), takeUntil(this.destroy$))
            .subscribe((info) => {
                if (info) {
                    this.input.min = info.minDatetime;
                    this.input.max = info.maxDatetime;
                }
            });

        this.input.valueChange
            .pipe(takeUntil(this.destroy$))
            .subscribe((event: DatetimeRangeComparisonInputValueChange) => {
                this.store.dispatch(
                    actionDataSourceSetIntervals({
                        interval1: event.range1.toInterval(),
                        interval2: event.range2?.toInterval()
                    })
                );
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }
}
