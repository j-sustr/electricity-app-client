import { createSelector } from '@ngrx/store';
import { shiftColorHue } from 'src/app/common/color/color-utils';
import {
    calculatePowerFactorDistribution,
    PowerFactorDistributionCalculatedItem
} from 'src/app/domain/power-factor/calculate-power-factor-distribution';
import { BinRange } from 'src/app/web-api-client';
import * as colors from '../../ui/common/colors/colors';
import { formatIntervalVsInterval } from '../common/format-intervals';
import { SeriesParams } from '../common/models';
import { Phases } from '../data-source/data-source.model';
import {
    selectIsComparisonMode,
    selectPhases
} from '../data-source/data-source.selectors';
import { selectDetail, selectIntervals } from './power-factor-detail.selectors';
import { createBinRangeName } from './power-factor-distribution-utils';

export interface PowerFactorDistributionChartItem {
    rangeName: string;
    range: BinRange;
    valueMain_1?: number;
    valueL1_1?: number;
    valueL2_1?: number;
    valueL3_1?: number;
    valueMain_2?: number;
    valueL1_2?: number;
    valueL2_2?: number;
    valueL3_2?: number;
}

export interface PowerFactorDistributionChart {
    title: string;
    items: PowerFactorDistributionChartItem[];
    series: SeriesParams[];
    level: number;
}

export interface PowerFactorDistributionTableItem {
    intervalId?: number;
    rangeName: string;
    range: BinRange;
    valueMain?: number;
    valueL1?: number;
    valueL2?: number;
    valueL3?: number;
    isForComparison?: boolean;
}

export interface PowerFactorDistributionTable {
    items: PowerFactorDistributionTableItem[];
    phases: Phases;
}

export const selectDistributionLevel = createSelector(selectDetail, (state) => {
    return state.distributionStack?.length ?? null;
});

export const selectTopDistribution = createSelector(selectDetail, (state) => {
    const stack = state.distributionStack;
    if (stack && stack.length > 0) {
        return stack[stack.length - 1];
    }
    return null;
});

export const selectDistribution = createSelector(
    selectTopDistribution,
    (dist) => {
        if (!dist) return null;

        let items1 = dist.items1
            ? calculatePowerFactorDistribution(dist.items1)
            : null;
        let items2 = dist.items2
            ? calculatePowerFactorDistribution(dist.items2)
            : null;

        items1 = items1?.filter((item) => isFiniteBin(item.range)) ?? null;
        items2 = items2?.filter((item) => isFiniteBin(item.range)) ?? null;

        function isFiniteBin(range: BinRange): boolean {
            return Number.isFinite(range.start) && Number.isFinite(range.end);
        }

        function sortItems(
            items: PowerFactorDistributionCalculatedItem[]
        ): PowerFactorDistributionCalculatedItem[] {
            return items.sort((a, b) => {
                return (
                    (b.range.start ?? Infinity) - (a.range.start ?? Infinity)
                );
            });
        }

        return {
            items1: items1 ? sortItems(items1) : null,
            items2: items2 ? sortItems(items2) : null
        };
    }
);

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
                rangeName: createBinRangeName(item.range),
                range: item.range,
                valueMain: item.valueMain ?? undefined,
                valueL1: item.valueL1 ?? undefined,
                valueL2: item.valueL2 ?? undefined,
                valueL3: item.valueL3 ?? undefined
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
                rangeName: createBinRangeName(item1.range),
                range: item1.range,
                valueMain_1: item1?.valueMain ?? undefined,
                valueL1_1: item1?.valueL1 ?? undefined,
                valueL2_1: item1?.valueL2 ?? undefined,
                valueL3_1: item1?.valueL3 ?? undefined,
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
    selectIntervals,
    selectDistributionChartItems,
    selectSeriesParamsArray,
    selectDistributionLevel,
    (intervals, items, series, level): PowerFactorDistributionChart | null => {
        if (!items || !Number.isInteger(level)) {
            return null;
        }
        const formatedInterval = formatIntervalVsInterval(intervals);
        return {
            title: `Cosφ Distribution (${formatedInterval})`,
            items,
            series,
            level: level ?? NaN
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
            color: colors.cosFiMain,
            stack: 1
        });
    }
    if (phases.l1) {
        arr.push({
            name: 'L1',
            valueField: 'valueL1_1',
            unit: '%',
            color: colors.cosFiL1,
            stack: 1
        });
    }
    if (phases.l2) {
        arr.push({
            name: 'L2',
            valueField: 'valueL2_1',
            unit: '%',
            color: colors.cosFiL2,
            stack: 1
        });
    }
    if (phases.l3) {
        arr.push({
            name: 'L3',
            valueField: 'valueL3_1',
            unit: '%',
            color: colors.cosFiL3,
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
        item.color = shiftColorHue(item.color, -60);
        item.stack = 2;
    });

    return arr.concat(...arr2);
}
