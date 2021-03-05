import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PowerFactorOverviewItem } from 'src/app/web-api-client';
import { AppState } from '../app-store.state';
import { selectIsComparisonMode } from '../data-source/data-source.selectors';
import { SeriesParams } from '../models';
import { PowerFactorOverviewState } from './power-factor-overview.model';

export interface PowerFactorOverviewChartItem {
    groupName: string;
    activeEnergy1: number;
    reactiveEnergyL1: number;
    reactiveEnergyC1: number;
    cosFi1: number;
    activeEnergy2?: number;
    reactiveEnergyL2?: number;
    reactiveEnergyC2?: number;
    cosFi2?: number;
}

export interface PowerFactorOverviewChart {
    title: string;
    items: PowerFactorOverviewChartItem[];
    series: SeriesParams[];
}

export interface PowerFactorOverviewTableItem {
    groupName: string;
    activeEnergy: number;
    reactiveEnergyL: number;
    reactiveEnergyC: number;
    cosFi: number;
    forComparison?: boolean;
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
                const tableItem1 = mapToTableItem(items1[i]);
                const tableItem2 = mapToTableItem(items2[i]);
                tableItem2.forComparison = true;
                result.push(tableItem1);
                result.push(tableItem2);
            }
            return result;
        }
        return null;

        function mapToTableItem(
            item: PowerFactorOverviewItem
        ): PowerFactorOverviewTableItem {
            return {
                groupName: item.groupName ?? '(no name)',
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
            groupName: item1.groupName ?? '(no name)',
            activeEnergy1: item1.activeEnergy ?? NaN,
            reactiveEnergyL1: item1.reactiveEnergyL ?? NaN,
            reactiveEnergyC1: item1.reactiveEnergyC ?? NaN,
            cosFi1: item1.cosFi ?? NaN,
            activeEnergy2: item2 ? item2.activeEnergy ?? NaN : undefined,
            reactiveEnergyL2: item2 ? item2.reactiveEnergyL ?? NaN : undefined,
            reactiveEnergyC2: item2 ? item2.reactiveEnergyC ?? NaN : undefined,
            cosFi2: item2 ? item2.cosFi ?? NaN : undefined
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
            valueField: 'activeEnergy1',
            unit: 'kWh',
            color: 'red',
            stack: 1
        },
        {
            name: 'Reactive Energy L',
            valueField: 'reactiveEnergyL1',
            unit: 'kvarh',
            color: 'orange',
            stack: 1
        },
        {
            name: 'Reactive Energy C',
            valueField: 'reactiveEnergyC1',
            unit: 'kvarh',
            color: 'blue',
            stack: 1
        },
        {
            name: 'cos FI',
            valueField: 'cosFi1',
            unit: '',
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
