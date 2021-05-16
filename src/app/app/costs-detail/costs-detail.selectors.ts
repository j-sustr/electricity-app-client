import { createFeatureSelector, createSelector } from '@ngrx/store';
import { formatInterval } from 'src/app/common/temporal/interval/format-interval';
import {
    calculateCostsDetailItems,
    CostsDetailItem
} from 'src/app/domain/costs/calculate-costs-detail-item';
import { CustomerParams } from 'src/app/domain/costs/costs';
import ERUCalculatorFactory from 'src/app/domain/costs/ERUCalculatorFactory';
import { AppState } from '../app-store.state';
import { formatIntervalVsInterval } from '../common/format-intervals';
import { selectCustomerParams } from '../costs/costs.selectors';
import { CostsDetailState } from './costs-detail.model';

export interface CostsDetailTableItem {
    year: number;
    month: string;
    itemName: string;
    quantity: string;
    unit?: string;
    currency?: string;
    costPerUnit?: number;
    cost?: number;

    quantity2?: string;
    costPerUnit2?: number;
    cost2?: number;
    // isForComparison?: boolean;
}

export interface CostsDetailTable {
    items: CostsDetailTableItem[];
    comparison: boolean;
}

export const selectDetail = createFeatureSelector<AppState, CostsDetailState>(
    'costsDetail'
);

export const selectHasData = createSelector(selectDetail, (state) =>
    Array.isArray(state.items1)
);

export const selectIsComparison = createSelector(selectDetail, (state) =>
    Array.isArray(state.items2)
);

export const selectComputedDetailItems = createSelector<
    AppState,
    { calculatorFactory: ERUCalculatorFactory },
    CostsDetailState,
    CustomerParams | null,
    { items1: CostsDetailItem[] | null; items2: CostsDetailItem[] | null }
>(
    selectDetail,
    selectCustomerParams,
    (
        { items1, items2, interval1, interval2 },
        customerParams,
        { calculatorFactory }
    ) => {
        const calculator =
            customerParams !== null && calculatorFactory
                ? calculatorFactory.create(customerParams)
                : null;

        const calculatedItems1 =
            items1 && interval1
                ? calculateCostsDetailItems(items1, interval1, calculator)
                : null;
        const calculatedItems2 =
            items2 && interval2
                ? calculateCostsDetailItems(items2, interval2, calculator)
                : null;

        if (!calculatedItems2 && calculatedItems1) {
            for (let i = 0; i < calculatedItems1.length; i++) {
                const item1 = calculatedItems1[i];
                item1.month =
                    item1.month + ` (${formatInterval(item1.interval)})`;
            }
        }

        if (calculatedItems2 && calculatedItems1) {
            for (let i = 0; i < calculatedItems2.length; i++) {
                const item2 = calculatedItems2[i];
                const item1 = calculatedItems1[i];
                item2.year = item1.year;
                // item2.month = item1.month;
                const formatedIntervals = formatIntervalVsInterval({
                    interval1: item1.interval,
                    interval2: item2.interval
                });
                const monthLabel = item1.month + ` (${formatedIntervals})`;
                item1.month = monthLabel;
                item2.month = monthLabel;
            }
        }

        return {
            items1: calculatedItems1,
            items2: calculatedItems2
        };
    }
);

export const selectDetailTableItems = createSelector(
    selectComputedDetailItems,
    ({ items1, items2 }) => {
        if (items1 && !items2) {
            return items1.map((item) => mapToTableItem(item));
        }
        if (items1 && items2) {
            const length = items1.length;
            const result = [];
            for (let i = 0; i < length; i++) {
                const tableItem = mapToTableItem(items1[i]);
                // const tableItem2 = mapToTableItem(items2[i], 2);
                // tableItem2.isForComparison = true;

                tableItem.quantity2 = items2[i].quantity;
                tableItem.costPerUnit2 = items2[i].costPerUnit;
                tableItem.cost2 = items2[i].cost;

                result.push(tableItem);
                // result.push(tableItem2);
            }
            return result;
        }
        return null;

        function mapToTableItem(
            item: CostsDetailItem,
            stack?: 1 | 2
        ): CostsDetailTableItem {
            const suffix = stack ? ` (${stack})` : '';
            return {
                ...item,
                itemName: item.itemName + suffix
            };
        }
    }
);

export const selectDetailTable = createSelector(
    selectDetailTableItems,
    selectIsComparison,
    (items, isComparison): CostsDetailTable | null => {
        if (!Array.isArray(items)) {
            return null;
        }
        return {
            items,
            comparison: isComparison
        };
    }
);
