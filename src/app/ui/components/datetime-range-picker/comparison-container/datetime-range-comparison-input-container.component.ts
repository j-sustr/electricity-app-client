import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { parseJSON } from 'date-fns';
import isValid from 'date-fns/fp/isValid';
import { Subject } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { AppState } from 'src/app/app/app-store.state';
import { setIntervals } from 'src/app/app/data-source/data-source.actions';
import {
    selectInfo,
    selectIntervals
} from 'src/app/app/data-source/data-source.selectors';
import {
    DatetimeRangeComparisonInputComponent,
    DatetimeRangeComparisonInputValueChange
} from '../comparison/datetime-range-comparison-input.component';
import { DatetimeRange } from '../input/datetime-range-selection-model';

@Component({
    selector: 'app-datetime-range-comparison-input-container',
    templateUrl: './datetime-range-comparison-input-container.component.html'
})
export class DatetimeRangeComparisonInputContainerComponent
    implements AfterViewInit, OnDestroy {
    private destroy$ = new Subject();

    @ViewChild(DatetimeRangeComparisonInputComponent)
    input!: DatetimeRangeComparisonInputComponent;

    constructor(
        private store: Store<AppState>,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngAfterViewInit(): void {
        this.store
            .pipe(
                select(selectIntervals),
                withLatestFrom(
                    this.route.queryParamMap.pipe(
                        map(extractIntervalsFromParamMap)
                    )
                ),
                take(1),
                tap(([storeIntervals, routerIntervals]) => {
                    const interval1 =
                        routerIntervals[0] ?? storeIntervals.interval1;
                    const interval2 =
                        routerIntervals[1] ?? storeIntervals.interval2;

                    setTimeout(() => {
                        this.input.value1 = DatetimeRange.fromInterval(
                            interval1
                        );
                        if (interval2) {
                            this.input.addRange(
                                DatetimeRange.fromInterval(interval2)
                            );
                        }
                    }, 0);
                })
            )
            .subscribe();

        this.store
            .pipe(select(selectInfo), takeUntil(this.destroy$))
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
                    setIntervals({
                        interval1: event.range1.toInterval(),
                        interval2: event.range2?.toInterval()
                    })
                );
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                this.router.navigate([], {
                    queryParams: {
                        int1s: event.range1.start?.toJSON() ?? null,
                        int1e: event.range1.end?.toJSON() ?? null,
                        int2s: event.range2?.start?.toJSON() ?? null,
                        int2e: event.range2?.end?.toJSON() ?? null
                    },
                    replaceUrl: true
                });
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }
}

function extractIntervalsFromParamMap(
    params: ParamMap
): [Interval | null, Interval | null] {
    const int1s = parseJSON(params.get('int1s') ?? NaN);
    const int1e = parseJSON(params.get('int1e') ?? NaN);
    const int2s = parseJSON(params.get('int2s') ?? NaN);
    const int2e = parseJSON(params.get('int2e') ?? NaN);
    let interval1: Interval | null = null;
    let interval2: Interval | null = null;
    if (isValid(int1s) && isValid(int1e)) {
        interval1 = {
            start: int1s,
            end: int1e
        };
    }
    if (isValid(int2s) && isValid(int2e)) {
        interval2 = {
            start: int2s,
            end: int2e
        };
    }

    return [interval1, interval2];
}
