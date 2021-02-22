import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { toDateDto } from 'src/app/common/temporal/date-dto';
import { IPowerFactorClient } from 'src/app/web-api-client';
import { POWER_FACTOR_CLIENT } from 'src/app/web-api-client-di';
import {
    actionGetPowerFactorOverviewData,
    actionGetPowerFactorOverviewDataError,
    actionGetPowerFactorOverviewDataSuccess
} from './power-factor-overview.actions';

@Injectable()
export class PowerFactorOverviewEffects {
    effectName$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(actionGetPowerFactorOverviewData),
            switchMap(({ interval1, interval2 }) =>
                this.client
                    .getOverview(
                        toDateDto(interval1.start),
                        toDateDto(interval1.end),
                        toDateDto(interval2.start),
                        toDateDto(interval2.end),
                        null
                    )
                    .pipe(
                        map((dto) =>
                            actionGetPowerFactorOverviewDataSuccess({
                                dto
                            })
                        ),
                        catchError((error: unknown) =>
                            of(
                                actionGetPowerFactorOverviewDataError({
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
        @Inject(POWER_FACTOR_CLIENT)
        private client: IPowerFactorClient
    ) {}
}
