import { createSelector } from '@ngrx/store';
import {
    calculatePowerFactorDistribution,
    PowerFactorDistributionCalculatedItem
} from 'src/app/domain/power-factor/calculate-power-factor-distribution';
import { Phases } from '../data-source/data-source.model';
import {
    selectIsComparisonMode,
    selectPhases
} from '../data-source/data-source.selectors';
import { SeriesParams } from '../models';
import { selectDetail } from './power-factor-detail.selectors';

export interface PowerFactorDistributionChartItem {
    range: string;
    valueMain_1: number;
    valueL1_1: number;
    valueL2_1: number;
    valueL3_1: number;
    valueMain_2?: number;
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
    phases: Phases;
}

export const selectDistribution = createSelector(selectDetail, (state) => {
    const dist = state.distribution;
    if (!dist) {
        return null;
    }
    let items1 = dist.items1
        ? calculatePowerFactorDistribution(dist.items1)
        : null;
    let items2 = dist.items2
        ? calculatePowerFactorDistribution(dist.items2)
        : null;

    items1 = items1?.filter((item) => item.range !== 'outlier') ?? null;
    items2 = items2?.filter((item) => item.range !== 'outlier') ?? null;

    return {
        items1,
        items2
    };
});

export const selectDistributionTableItems = createSelector(
    selectDistribution,
    (data): PowerFactorDistributionTableItem[] | null => {
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
            item: PowerFactorDistributionCalculatedItem,
            stack?: 1 | 2
        ): PowerFactorDistributionTableItem {
            return {
                intervalId: stack,
                range: item.range ?? '(no range)',
                valueMain: item.valueMain ?? NaN,
                valueL1: item.valueL1 ?? NaN,
                valueL2: item.valueL2 ?? NaN,
                valueL3: item.valueL3 ?? NaN
            };
        }
    }
);

export const selectDistributionTable = createSelector(
    selectDistributionTableItems,
    selectPhases,
    (items, phases): PowerFactorDistributionTable | null => {
        if (!items) {
            return null;
        }
        return {
            items,
            phases
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
            item1: PowerFactorDistributionCalculatedItem,
            item2?: PowerFactorDistributionCalculatedItem
        ): PowerFactorDistributionChartItem {
            return {
                range: item1.range ?? '(unlabeled range)',
                valueMain_1: item1.valueMain ?? NaN,
                valueL1_1: item1.valueL1 ?? NaN,
                valueL2_1: item1.valueL2 ?? NaN,
                valueL3_1: item1.valueL3 ?? NaN,
                valueMain_2: item2?.valueMain ?? undefined,
                valueL1_2: item2?.valueL1 ?? undefined,
                valueL2_2: item2?.valueL2 ?? undefined,
                valueL3_2: item2?.valueL3 ?? undefined
            };
        }
    }
);

export const selectSeriesParamsArray = createSelector(
    selectPhases,
    selectIsComparisonMode,
    (phases, isComparison) => createSeriesParamsArray(phases, isComparison)
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

function createSeriesParamsArray(phases: Phases, isComparison: boolean) {
    const arr: SeriesParams[] = [];

    if (phases.main) {
        arr.push({
            name: 'Main',
            valueField: 'valueMain_1',
            unit: '%',
            color: 'red',
            stack: 1
        });
    }
    if (phases.l1) {
        arr.push({
            name: 'L1',
            valueField: 'valueL1_1',
            unit: '%',
            color: 'orange',
            stack: 1
        });
    }
    if (phases.l2) {
        arr.push({
            name: 'L2',
            valueField: 'valueL2_1',
            unit: '%',
            color: 'blue',
            stack: 1
        });
    }
    if (phases.l3) {
        arr.push({
            name: 'L3',
            valueField: 'valueL3_1',
            unit: '%',
            color: 'purple',
            stack: 1
        });
    }

    if (!isComparison) {
        return arr;
    }

    const arr2 = arr.map((item) => ({ ...item }));
    arr.forEach((item) => {
        item.name += ' (1)';
    });
    arr2.forEach((item) => {
        item.name += ' (2)';
        item.valueField = item.valueField.replace(/_1$/, '_2');
        item.stack = 2;
    });

    return arr.concat(...arr2);
}
