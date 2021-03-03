import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import {
    IntervalDto,
    intervalToDto
} from 'src/app/common/temporal/interval/interval-dto';
import { calculateCostsOverviewItem } from 'src/app/core/costs/calculate-costs-overview-item';
import { CustomerParams } from 'src/app/core/costs/costs';
import ERUCalculatorFactory from 'src/app/core/costs/ERUCalculatorFactory';
import {
    CostlyQuantitiesOverviewItem,
    CostsOverviewDto,
    ICostsClient
} from 'src/app/web-api-client';
import { COSTS_CLIENT } from 'src/app/web-api-client-di';
import { AppState } from '../app-store.state';
import { selectCustomerParams } from '../costs/costs.selectors';
import { selectIntervals } from '../data-source/data-source.selectors';
import {
    getOverview,
    getOverviewError,
    getOverviewSuccess
} from './costs-overview.actions';
import { CostsOverviewItem } from './costs-overview.model';

@Injectable()
export class CostsOveviewEffects {
    getData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getOverview),
            withLatestFrom(
                combineLatest([
                    this.store.pipe(select(selectCustomerParams)),
                    this.store.pipe(select(selectIntervals))
                ])
            ),
            switchMap(([, [customerParams, intervals]]) => {
                const dto1 = intervalToDto(intervals.interval1);
                let dto2: IntervalDto | undefined = undefined;
                if (intervals.interval2) {
                    dto2 = intervalToDto(intervals.interval2);
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
                            const items = this._createItems(
                                dto,
                                customerParams
                            );

                            return getOverviewSuccess({ items });
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
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        @Inject(COSTS_CLIENT)
        private client: ICostsClient,
        private calculatorFactory: ERUCalculatorFactory
    ) {}

    _createItems(
        dto: CostsOverviewDto,
        customerParams: CustomerParams | null
    ): CostsOverviewItem[] {
        if (!Array.isArray(dto.items1)) {
            return [];
        }

        const calc =
            customerParams !== null
                ? this.calculatorFactory.create(customerParams)
                : null;

        return calculateItems(dto.items1);

        function calculateItems(items: CostlyQuantitiesOverviewItem[]) {
            const resultItems: CostsOverviewItem[] = [];
            for (const srcItem of items) {
                const item = calculateCostsOverviewItem(srcItem, calc);
                resultItems.push(item);
            }
            return resultItems;
        }
    }
}
