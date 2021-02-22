import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { toDateDto } from 'src/app/common/temporal/date-dto';
import { IPowerFactorClient } from 'src/app/web-api-client';
import { POWER_FACTOR_CLIENT } from 'src/app/web-api-client-di';
import { AppState } from '../app-store.state';
import { selectDataSourceIntervals } from '../data-source/data-source.selectors';
import {
    actionPowerFactorOverviewGetData,
    actionPowerFactorOverviewGetDataError,
    actionPowerFactorOverviewGetDataSuccess
} from './power-factor-overview.actions';

@Injectable()
export class PowerFactorOverviewEffects {
    effectName$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(actionPowerFactorOverviewGetData),
            withLatestFrom(this.store.pipe(select(selectDataSourceIntervals))),
            switchMap(([, intervals]) =>
                this.client
                    .getOverview(
                        toDateDto(intervals[0]?.start),
                        toDateDto(intervals[0]?.end),
                        toDateDto(intervals[1]?.start),
                        toDateDto(intervals[1]?.end),
                        null
                    )
                    .pipe(
                        map((dto) =>
                            actionPowerFactorOverviewGetDataSuccess({
                                dto
                            })
                        ),
                        catchError((error: HttpErrorResponse) =>
                            of(
                                actionPowerFactorOverviewGetDataError({
                                    error
                                })
                            )
                        )
                    )
            )
        );
    });

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        @Inject(POWER_FACTOR_CLIENT)
        private client: IPowerFactorClient
    ) {}
}
