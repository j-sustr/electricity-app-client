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
import {
    CostlyQuantitiesDetailItem,
    ICostsClient
} from 'src/app/web-api-client';
import { COSTS_CLIENT } from 'src/app/web-api-client-di';
import { AppState } from '../app-store.state';
import { selectIntervals } from '../data-source/data-source.selectors';
import { selectGroupId } from '../router/router.selectors';
import {
    getDetail,
    getDetailError,
    getDetailSuccess
} from './costs-detail.actions';

@Injectable()
export class CostsDetailEffects {
    getDetail$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getDetail),
            withLatestFrom(
                combineLatest([
                    this.store.pipe(select(selectGroupId)),
                    this.store.pipe(select(selectIntervals))
                ]),
                (v1, v2) => v2
            ),
            switchMap(([groupId, { interval1, interval2 }]) => {
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
                            validateItems(dto.items1);
                            if (dto.items2) {
                                validateItems(dto.items2);
                            }
                            return getDetailSuccess({
                                groupName: dto.groupName ?? '(no name)',
                                items1: dto.items1 as CostlyQuantitiesDetailItem[],
                                items2: dto.items2 ?? null
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
        @Inject(COSTS_CLIENT)
        private client: ICostsClient
    ) {}
}

function validateItems(
    items: CostlyQuantitiesDetailItem[] | null | undefined
): items is CostlyQuantitiesDetailItem[] {
    return true;
}
