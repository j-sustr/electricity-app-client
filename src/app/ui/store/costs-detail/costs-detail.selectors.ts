import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
    calculateCostsDetailItems,
    CostsDetailItem
} from 'src/app/core/costs/calculate-costs-detail-item';
import { CustomerParams } from 'src/app/core/costs/costs';
import ERUCalculatorFactory from 'src/app/core/costs/ERUCalculatorFactory';
import { AppState } from '../app-store.state';
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
    isForComparison?: boolean;
}

export interface CostsDetailTable {
    items: CostsDetailTableItem[];
}

export const selectDetail = createFeatureSelector<AppState, CostsDetailState>(
    'costsDetail'
);

export const selectHasData = createSelector(selectDetail, (state) =>
    Array.isArray(state.items1)
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
    ({ items1, items2 }, customerParams, { calculatorFactory }) => {
        const calculator =
            customerParams !== null && calculatorFactory
                ? calculatorFactory.create(customerParams)
                : null;
        return {
            items1: items1
                ? calculateCostsDetailItems(items1, calculator)
                : null,
            items2: items2
                ? calculateCostsDetailItems(items2, calculator)
                : null
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
                const tableItem1 = mapToTableItem(items1[i], 1);
                const tableItem2 = mapToTableItem(items2[i], 2);
                tableItem2.isForComparison = true;
                result.push(tableItem1);
                result.push(tableItem2);
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
    (items): CostsDetailTable | null => {
        if (!Array.isArray(items)) {
            return null;
        }
        return {
            items
        };
    }
);
