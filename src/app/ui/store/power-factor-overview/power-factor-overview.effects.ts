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
import { IPowerFactorClient } from 'src/app/web-api-client';
import { POWER_FACTOR_CLIENT } from 'src/app/web-api-client-di';
import { AppState } from '../app-store.state';
import { selectDataSourceIntervals } from '../data-source/data-source.selectors';
import {
    getOverview,
    getOverviewError,
    getOverviewSuccess
} from './power-factor-overview.actions';

@Injectable()
export class PowerFactorOverviewEffects {
    effectName$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getOverview),
            withLatestFrom(this.store.pipe(select(selectDataSourceIntervals))),
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
                        null
                    )
                    .pipe(
                        map((dto) =>
                            getOverviewSuccess({
                                dto
                            })
                        ),
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
