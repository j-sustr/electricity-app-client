import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
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
    persistTodos = createEffect(
        () =>
            this.actions$.pipe(
                ofType(getOverview),
                withLatestFrom(
                    combineLatest([
                        this.store.pipe(select(selectCustomerParams)),
                        this.store.pipe(select(selectIntervals))
                    ])
                ),
                switchMap(([, [customerParams, { interval1, interval2 }]]) => {
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
            ),
        { dispatch: false }
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
        customerParams: CustomerParams
    ): CostsOverviewItem[] | null {
        if (!Array.isArray(dto.items1)) {
            return null;
        }
        const calc = this.calculatorFactory.create(customerParams);

        const items: CostsOverviewItem[] = [];
        for (const srcItem of dto.items1) {
            const item = calculateCostsOverviewItem(srcItem, calc);
            items.push(item);
        }
        return items;
    }
}
