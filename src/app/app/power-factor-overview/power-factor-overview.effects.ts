import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { intervalToDto } from 'src/app/common/temporal/interval/interval-dto';
import {
    IntervalDto,
    IPowerFactorClient,
    PowerFactorOverviewItem
} from 'src/app/web-api-client';
import { POWER_FACTOR_CLIENT } from 'src/app/web-api-client-di';
import { OVERVIEW_MAX_GROUPS } from '../app-constants';
import { AppState } from '../app-store.state';
import { selectIntervals } from '../data-source/data-source.selectors';
import {
    getOverview,
    getOverviewError,
    getOverviewSuccess
} from './power-factor-overview.actions';

@Injectable()
export class PowerFactorOverviewEffects {
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
                        dto2?.isInfinite,
                        OVERVIEW_MAX_GROUPS
                    )
                    .pipe(
                        map((dto) => {
                            validateItems(dto.items1);
                            if (dto.items2) {
                                validateItems(dto.items2);
                            }

                            return getOverviewSuccess({
                                items1: dto.items1 as PowerFactorOverviewItem[],
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
        @Inject(POWER_FACTOR_CLIENT)
        private client: IPowerFactorClient
    ) {}
}

function validateItems(
    items: PowerFactorOverviewItem[] | null | undefined
): items is PowerFactorOverviewItem[] {
    return true;
}
