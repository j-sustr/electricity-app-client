import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
    calculateCostsOverviewItem,
    CostsOverviewItem
} from 'src/app/core/costs/calculate-costs-overview-item';
import { CustomerParams } from 'src/app/core/costs/costs';
import ERUCalculator from 'src/app/core/costs/ERUCalculator';
import ERUCalculatorFactory from 'src/app/core/costs/ERUCalculatorFactory';
import { CostlyQuantitiesOverviewItem } from 'src/app/web-api-client';
import { AppState } from '../app-store.state';
import { selectCustomerParams } from '../costs/costs.selectors';
import { CostsOverviewState } from './costs-overview.model';

export interface CostsOverviewTableItem {
    groupId: string;
    groupName: string;
    activeEnergy: number;
    reactiveEnergy: number;
    cosFi: number;
    peakDemand: number;
    cost: number | null;
    isForComparison?: boolean;
}

export interface CostsOverviewTable {
    items: CostsOverviewTableItem[];
}

export const selectOverview = createFeatureSelector<
    AppState,
    CostsOverviewState
>('costsOverview');

export const selectHasData = createSelector(selectOverview, (state) =>
    Array.isArray(state.items1)
);

export const selectComputedOverviewItems = createSelector<
    AppState,
    { calculatorFactory: ERUCalculatorFactory },
    CostsOverviewState,
    CustomerParams | null,
    { items1: CostsOverviewItem[] | null; items2: CostsOverviewItem[] | null }
>(
    selectOverview,
    selectCustomerParams,
    ({ items1, items2 }, customerParams, { calculatorFactory }) => {
        const calculator =
            customerParams !== null && calculatorFactory
                ? calculatorFactory.create(customerParams)
                : null;
        return {
            items1: items1 ? computeItems(items1, calculator) : null,
            items2: items2 ? computeItems(items2, calculator) : null
        };
    }
);

export const selectOverviewTableItems = createSelector(
    selectComputedOverviewItems,
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
            item: CostsOverviewItem,
            stack?: 1 | 2
        ): CostsOverviewTableItem {
            const suffix = stack ? ` (${stack})` : '';
            return {
                ...item,
                groupId: item.groupId ?? '(no id)',
                groupName: (item.groupName ?? '(no name)') + suffix
            };
        }
    }
);

export const selectOverviewTable = createSelector(
    selectOverviewTableItems,
    (items): CostsOverviewTable | null => {
        if (!Array.isArray(items)) {
            return null;
        }
        return {
            items
        };
    }
);

function computeItems(
    items: CostlyQuantitiesOverviewItem[],
    calculator: ERUCalculator | null
): CostsOverviewItem[] {
    const resultItems: CostsOverviewItem[] = [];
    for (const srcItem of items) {
        const item = calculateCostsOverviewItem(srcItem, calculator);
        resultItems.push(item);
    }
    return resultItems;
}
