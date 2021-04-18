import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { combineLatest, of } from 'rxjs';
import { withLatestFrom, switchMap, catchError, map } from 'rxjs/operators';
import {
    IntervalDto,
    intervalToDto
} from 'src/app/common/temporal/interval/interval-dto';
import {
    IPeakDemandClient,
    PeakDemandDetailData
} from 'src/app/web-api-client';
import { PEAK_DEMAND_CLIENT } from 'src/app/web-api-client-di';
import { AppState } from '../app-store.state';
import { selectGroupId } from '../common/router/router.selectors';
import {
    selectIntervals,
    selectPhases
} from '../data-source/data-source.selectors';
import {
    getDetail,
    getDetailError,
    getDetailSuccess
} from './peak-demand-detail.actions';

@Injectable()
export class PeakDemandDetailEffects {
    getDetail$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getDetail),
            withLatestFrom(
                combineLatest([
                    this.store.pipe(select(selectGroupId)),
                    this.store.pipe(select(selectIntervals)),
                    this.store.pipe(select(selectPhases))
                ]),
                (v1, v2) => v2
            ),
            switchMap(([groupId, { interval1, interval2 }, phases]) => {
                const dto1 = intervalToDto(interval1);
                let dto2: IntervalDto | undefined = undefined;
                if (interval2) {
                    dto2 = intervalToDto(interval2);
                }
                return this.client
                    .getDetail(
                        groupId,
                        dto1.start,
                        dto1.end,
                        dto1.isInfinite,
                        dto2?.start,
                        dto2?.end,
                        dto2?.isInfinite
                    )
                    .pipe(
                        map((dto) => {
                            validateData(dto.data1);
                            if (dto.data2) {
                                validateData(dto.data2);
                            }

                            return getDetailSuccess({
                                data1: dto.data1 as PeakDemandDetailData,
                                data2: dto.data2 ?? null
                            });
                        }),
                        catchError((error: HttpErrorResponse) =>
                            of(
                                getDetailError({
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

function validateData(
    data: PeakDemandDetailData | null | undefined
): data is PeakDemandDetailData {
    return true;
}
