import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as d3 from 'd3-color';
import { PowerFactorOverviewItem } from 'src/app/web-api-client';
import * as colors from '../../ui/common/colors/colors';
import { AppState } from '../app-store.state';
import { selectIsComparisonMode } from '../data-source/data-source.selectors';
import { SeriesParams } from '../models';
import { PowerFactorOverviewState } from './power-factor-overview.model';

export interface PowerFactorOverviewChartItem {
    groupId: string;
    groupName: string;
    activeEnergy_1: number;
    reactiveEnergyL_1: number;
    reactiveEnergyC_1: number;
    cosFi_1: number;
    activeEnergy_2?: number;
    reactiveEnergyL_2?: number;
    reactiveEnergyC_2?: number;
    cosFi_2?: number;
}

export interface PowerFactorOverviewChart {
    title: string;
    items: PowerFactorOverviewChartItem[];
    series: SeriesParams[];
}

export interface PowerFactorOverviewTableItem {
    groupId: string;
    groupName: string;
    activeEnergy: number;
    reactiveEnergyL: number;
    reactiveEnergyC: number;
    cosFi: number;
    isForComparison?: boolean;
}

export interface PowerFactorOverviewTable {
    items: PowerFactorOverviewTableItem[];
}

export const selectOverview = createFeatureSelector<
    AppState,
    PowerFactorOverviewState
>('powerFactorOverview');

export const selectHasData = createSelector(selectOverview, (state) =>
    Array.isArray(state.items1)
);

export const selectViewType = createSelector(
    selectOverview,
    (state) => state.viewType
);

export const selectOverviewTableItems = createSelector(
    selectOverview,
    (
        state: PowerFactorOverviewState
    ): PowerFactorOverviewTableItem[] | null => {
        const items1 = state.items1;
        const items2 = state.items2;
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
            item: PowerFactorOverviewItem,
            stack?: 1 | 2
        ): PowerFactorOverviewTableItem {
            const suffix = stack ? ` (${stack})` : '';
            return {
                groupId: item.groupId ?? '(no id)',
                groupName: (item.groupName ?? '(no name)') + suffix,
                activeEnergy: item.activeEnergy ?? NaN,
                reactiveEnergyL: item.reactiveEnergyL ?? NaN,
                reactiveEnergyC: item.reactiveEnergyC ?? NaN,
                cosFi: item.cosFi ?? NaN
            };
        }
    }
);

export const selectOverviewTable = createSelector(
    selectOverviewTableItems,
    (items): PowerFactorOverviewTable | null => {
        if (!items) {
            return null;
        }
        return {
            items
        };
    }
);

export const selectOverviewChartItems = createSelector(selectOverview, (state):
    | PowerFactorOverviewChartItem[]
    | null => {
    const items1 = state.items1;
    const items2 = state.items2;
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
        item1: PowerFactorOverviewItem,
        item2?: PowerFactorOverviewItem
    ): PowerFactorOverviewChartItem {
        return {
            groupId: item1.groupId ?? '(no id)',
            groupName: item1.groupName ?? '(no name)',
            activeEnergy_1: item1.activeEnergy ?? NaN,
            reactiveEnergyL_1: -(item1.reactiveEnergyL ?? NaN),
            reactiveEnergyC_1: -(item1.reactiveEnergyC ?? NaN),
            cosFi_1: item1.cosFi ?? NaN,
            activeEnergy_2: item2 ? item2.activeEnergy ?? NaN : undefined,
            reactiveEnergyL_2: item2
                ? -(item2.reactiveEnergyL ?? NaN)
                : undefined,
            reactiveEnergyC_2: item2
                ? -(item2.reactiveEnergyC ?? NaN)
                : undefined,
            cosFi_2: item2 ? item2.cosFi ?? NaN : undefined
        };
    }
});

export const selectSeriesParamsArray = createSelector(
    selectIsComparisonMode,
    (isComparison) => createSeriesParamsArray(isComparison)
);

export const selectOverviewChart = createSelector(
    selectOverviewChartItems,
    selectSeriesParamsArray,
    (items, series): PowerFactorOverviewChart | null => {
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
            name: 'Active Energy',
            valueField: 'activeEnergy_1',
            unit: 'kWh',
            color: colors.activeEnergy,
            stack: 1
        },
        {
            name: 'Reactive Energy L',
            valueField: 'reactiveEnergyL_1',
            unit: 'kvarh',
            color: colors.reactiveEnergyL,
            stack: 1
        },
        {
            name: 'Reactive Energy C',
            valueField: 'reactiveEnergyC_1',
            unit: 'kvarh',
            color: colors.reactiveEnergyC,
            stack: 1
        },
        {
            name: 'cos FI',
            valueField: 'cosFi_1',
            unit: '',
            color: colors.cosFi,
            stack: 1,
            axis: 'cosFi',
            type: 'spline'
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
        let color = d3.hsl(item.color);
        color = color.darker(1);
        color.h -= 80;

        item.name += ' (2)';
        item.valueField = item.valueField.replace(/_1$/, '_2');
        item.stack = 2;
        item.color = color.formatHex();
    });

    return arr.concat(...arr2);
}
