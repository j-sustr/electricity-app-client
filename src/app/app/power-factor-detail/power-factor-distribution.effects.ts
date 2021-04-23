import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { combineLatest, of } from 'rxjs';
import {
    catchError,
    map,
    switchMap,
    tap,
    withLatestFrom
} from 'rxjs/operators';
import {
    IntervalDto,
    intervalToDto
} from 'src/app/common/temporal/interval/interval-dto';
import {
    IPowerFactorClient,
    PowerFactorDistributionItem
} from 'src/app/web-api-client';
import { POWER_FACTOR_CLIENT } from 'src/app/web-api-client-di';
import { AppState } from '../app-store.state';
import { selectGroupId } from '../common/router/router.selectors';
import {
    selectIntervals,
    selectPhases
} from '../data-source/data-source.selectors';
import {
    getDistribution,
    getDistributionError,
    getDistributionSuccess,
    getRangeDistribution,
    resetDistributionRange
} from './power-factor-detail.actions';
import { getDistributionRange } from './power-factor-distribution-utils';

@Injectable()
export class PowerFactorDistributionEffects {
    resetDistributionRange$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(resetDistributionRange),
                tap(() => this.store.dispatch(getDistribution()))
            ),
        { dispatch: false }
    );

    getDistribution$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getDistribution, getRangeDistribution),
            map(getDistributionRange),
            withLatestFrom(
                combineLatest([
                    this.store.pipe(select(selectGroupId)),
                    this.store.pipe(select(selectIntervals)),
                    this.store.pipe(select(selectPhases))
                ]),
                (v1, v2) => [...v2, v1] as const
            ),
            switchMap(([groupId, { interval1, interval2 }, phases, range]) => {
                const dto1 = intervalToDto(interval1);
                let dto2: IntervalDto | undefined = undefined;
                if (interval2) {
                    dto2 = intervalToDto(interval2);
                }
                return this.client
                    .getDistribution(
                        groupId,
                        dto1.start,
                        dto1.end,
                        dto1.isInfinite,
                        dto2?.start,
                        dto2?.end,
                        dto2?.isInfinite,
                        phases.main,
                        phases.l1,
                        phases.l2,
                        phases.l3
                    )
                    .pipe(
                        map((dto) => {
                            validateItems(dto.distribution1);
                            if (dto.distribution2) {
                                validateItems(dto.distribution2);
                            }

                            return getDistributionSuccess({
                                groupName: dto.groupName ?? '(no name)',
                                items1: dto.distribution1 as PowerFactorDistributionItem[],
                                items2: dto.distribution2 ?? null
                            });
                        }),
                        catchError((error: HttpErrorResponse) =>
                            of(
                                getDistributionError({
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
    items: PowerFactorDistributionItem[] | null | undefined
): items is PowerFactorDistributionItem[] {
    return true;
}
