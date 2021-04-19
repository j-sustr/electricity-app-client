import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { combineLatest, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import {
    IntervalDto,
    intervalToDto
} from 'src/app/common/temporal/interval/interval-dto';
import { DemandSeriesDto, IPeakDemandClient } from 'src/app/web-api-client';
import { PEAK_DEMAND_CLIENT } from 'src/app/web-api-client-di';
import { AppState } from '../app-store.state';
import { createIntervalFromDto } from '../common/dto-mapping';
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
import { DemandSeries } from './peak-demand-detail.model';

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
                        dto2?.isInfinite,
                        0
                    )
                    .pipe(
                        map((dto) => {
                            const s1 = createDemandSeries(dto.demandSeries1);
                            let s2: DemandSeries | null = null;
                            if (dto.demandSeries2) {
                                s2 = createDemandSeries(dto.demandSeries2);
                            }
                            return getDetailSuccess({
                                series1: s1,
                                series2: s2
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

function createDemandSeries(
    series: DemandSeriesDto | null | undefined
): DemandSeries {
    if (!series?.timeRange) {
        throw new Error('does not have timeRange');
    }
    if ((series?.timeStep ?? NaN) > 0) {
        throw new Error('does not have timeStep');
    }
    let length = 0;
    length = series?.valuesMain?.length ?? length;
    length = series?.valuesL1?.length ?? length;
    length = series?.valuesL2?.length ?? length;
    length = series?.valuesL3?.length ?? length;

    return {
        timeRange: createIntervalFromDto(series.timeRange),
        timeStep: series.timeStep ?? NaN,
        valuesMain: series.valuesMain ?? null,
        valuesL1: series.valuesL1 ?? null,
        valuesL2: series.valuesL2 ?? null,
        valuesL3: series.valuesL3 ?? null,
        length
    };
}
