import { createSelector } from '@ngrx/store';
import { PowerFactorDistributionItem } from 'src/app/web-api-client';
import { selectIsComparisonMode } from '../data-source/data-source.selectors';
import { SeriesParams } from '../models';
import { PowerFactorDistribution } from './power-factor-detail.model';
import { selectDistribution } from './power-factor-detail.selectors';

export interface PowerFactorDistributionChartItem {
    range: string;
    valueMain1: number;
    valueL1_1: number;
    valueL2_1: number;
    valueL3_1: number;
    valueMain2?: number;
    valueL1_2?: number;
    valueL2_2?: number;
    valueL3_2?: number;
}

export interface PowerFactorDistributionChart {
    title: string;
    items: PowerFactorDistributionChartItem[];
    series: SeriesParams[];
}

export interface PowerFactorDistributionTableItem {
    intervalId?: number;
    range: string;
    valueMain: number;
    valueL1: number;
    valueL2: number;
    valueL3: number;
    isForComparison?: boolean;
}

export interface PowerFactorDistributionTable {
    items: PowerFactorDistributionTableItem[];
}

export const selectDistributionTableItems = createSelector(
    selectDistribution,
    (
        data: PowerFactorDistribution | null
    ): PowerFactorDistributionTableItem[] | null => {
        const items1 = data?.items1;
        const items2 = data?.items2;
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
            item: PowerFactorDistributionItem,
            stack?: 1 | 2
        ): PowerFactorDistributionTableItem {
            return {
                intervalId: stack,
                range: item.range ?? '(no range)',
                valueMain: item.value ?? NaN,
                valueL1: item.value ?? NaN,
                valueL2: item.value ?? NaN,
                valueL3: item.value ?? NaN
            };
        }
    }
);

export const selectDistributionTable = createSelector(
    selectDistributionTableItems,
    (items): PowerFactorDistributionTable | null => {
        if (!items) {
            return null;
        }
        return {
            items
        };
    }
);

export const selectDistributionChartItems = createSelector(
    selectDistribution,
    (state): PowerFactorDistributionChartItem[] | null => {
        const items1 = state?.items1;
        const items2 = state?.items2;
        if (items1 && !items2) {
            return items1.map((item) => mapToChartItem(item));
        }
        if (items1 && items2) {
            const length = items1.length;
            const result = [];
            for (let i = 0; i < length; i++) {
                const chartItem = mapToChartItem(items1[i], items2[i]);
                result.push(chartItem);
            }
            return result;
        }
        return null;

        function mapToChartItem(
            item1: PowerFactorDistributionItem,
            item2?: PowerFactorDistributionItem
        ): PowerFactorDistributionChartItem {
            return {
                range: item1.range ?? '(unlabeled range)',
                valueMain1: item1.value ?? NaN,
                valueL1_1: item1.value ?? NaN,
                valueL2_1: item1.value ?? NaN,
                valueL3_1: item1.value ?? NaN,
                valueMain2: item2?.value,
                valueL1_2: item2?.value,
                valueL2_2: item2?.value,
                valueL3_2: item2?.value
            };
        }
    }
);

export const selectSeriesParamsArray = createSelector(
    selectIsComparisonMode,
    (isComparison) => createSeriesParamsArray(isComparison)
);

export const selectDistributionChart = createSelector(
    selectDistributionChartItems,
    selectSeriesParamsArray,
    (items, series): PowerFactorDistributionChart | null => {
        if (!items) {
            return null;
        }
        return {
            title: '',
            items,
            series
        };
    }
);

function createSeriesParamsArray(isComparison: boolean) {
    const arr: SeriesParams[] = [
        {
            name: 'Main',
            valueField: 'valueMain',
            unit: '%',
            color: 'red',
            stack: 1
        },
        {
            name: 'L1',
            valueField: 'valueL1',
            unit: '%',
            color: 'orange',
            stack: 1
        },
        {
            name: 'L2',
            valueField: 'valueL2',
            unit: '%',
            color: 'blue',
            stack: 1
        },
        {
            name: 'L3',
            valueField: 'cosFi1',
            unit: '%',
            color: 'purple',
            stack: 1
        }
    ];

    if (!isComparison) {
        return arr;
    }

    const arr2 = arr.map((item) => ({ ...item }));
    arr.forEach((item) => {
        item.name += ' (1)';
    });
    arr2.forEach((item) => {
        item.name += ' (2)';
        item.valueField.replace(/1$/, '2');
        item.stack = 2;
    });

    return arr.concat(...arr2);
}
