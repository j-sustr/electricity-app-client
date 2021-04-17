import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import {
    IntervalDto,
    intervalToDto
} from 'src/app/common/temporal/interval/interval-dto';
import {
    IPeakDemandClient,
    PeakDemandOverviewItem
} from 'src/app/web-api-client';
import { PEAK_DEMAND_CLIENT } from 'src/app/web-api-client-di';
import { AppState } from '../app-store.state';
import { selectIntervals } from '../data-source/data-source.selectors';
import {
    getOverview,
    getOverviewError,
    getOverviewSuccess
} from './peak-demand-overview.actions';

@Injectable()
export class PeakDemandOverviewEffects {
    getData$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getOverview),
            withLatestFrom(this.store.pipe(select(selectIntervals))),
            switchMap(([, { interval1, interval2 }]) => {
                const dto1 = intervalToDto(interval1);
                let dto2: IntervalDto | undefined = undefined;
                if (interval2) {
                    dto2 = intervalToDto(interval2);
                }
                return this.client
                    .getOverview(
                        dto1.start,
                        dto1.end,
                        dto1.isInfinite,
                        dto2?.start,
                        dto2?.end,
                        dto2?.isInfinite
                    )
                    .pipe(
                        map((dto) => {
                            validateItems(dto.items1);
                            if (dto.items2) {
                                validateItems(dto.items2);
                            }

                            return getOverviewSuccess({
                                items1: dto.items1 as PeakDemandOverviewItem[],
                                items2: dto.items2 ?? null
                            });
                        }),
                        catchError((error: HttpErrorResponse) =>
                            of(
                                getOverviewError({
                                    error
                                })
                            )
                        )
                    );
            })
        );
    });

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        @Inject(PEAK_DEMAND_CLIENT)
        private client: IPeakDemandClient
    ) {}
}

function validateItems(
    items: PeakDemandOverviewItem[] | null | undefined
): items is PeakDemandOverviewItem[] {
    return true;
}
