import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getTime } from 'date-fns';
import { AppState } from '../app-store.state';
import { SeriesParams } from '../common/models';
import { Phases } from '../data-source/data-source.model';
import {
    selectIsComparisonMode,
    selectPhases
} from '../data-source/data-source.selectors';
import {
    DemandSeries,
    PeakDemandDetailState
} from './peak-demand-detail.model';
import * as colors from '../../ui/common/colors/colors';
import { shiftColorHue } from 'src/app/common/color/color-utils';

export interface PeakDemandDetailChartItem {
    time: Date;
    valueMain_1?: number;
    valueL1_1?: number;
    valueL2_1?: number;
    valueL3_1?: number;
    valueMain_2?: number;
    valueL1_2?: number;
    valueL2_2?: number;
    valueL3_2?: number;
}

export interface PeakDemandDetailChart {
    title: string;
    items: PeakDemandDetailChartItem[];
    series: SeriesParams[];
}

export const selectDetail = createFeatureSelector<
    AppState,
    PeakDemandDetailState
>('peakDemandDetail');

export const selectHasData = createSelector(
    selectDetail,
    (state) => state.series1 !== null
);

export const selectAggregation = createSelector(
    selectDetail,
    (state) => state.aggregation
);

export const selectDetailChartItems = createSelector(selectDetail, (state):
    | PeakDemandDetailChartItem[]
    | null => {
    const series1 = state?.series1;
    const series2 = state?.series2;
    if (series1) {
        return createChartItems(series1, series2 ?? undefined);
    }
    return null;

    function createChartItems(
        series1: DemandSeries,
        series2?: DemandSeries
    ): PeakDemandDetailChartItem[] | null {
        const len = series1.length;
        const items: PeakDemandDetailChartItem[] = [];
        const timeStart = getTime(series1.timeRange.start);
        const timeStep = series1.timeStep;
        for (let i = 0; i < len; i++) {
            items.push({
                time: new Date(timeStart + i * timeStep),
                valueMain_1: series1.valuesMain?.[i] ?? undefined,
                valueL1_1: series1.valuesL1?.[i] ?? undefined,
                valueL2_1: series1.valuesL2?.[i] ?? undefined,
                valueL3_1: series1.valuesL3?.[i] ?? undefined,
                valueMain_2: series2?.valuesMain?.[i] ?? undefined,
                valueL1_2: series2?.valuesL1?.[i] ?? undefined,
                valueL2_2: series2?.valuesL2?.[i] ?? undefined,
                valueL3_2: series2?.valuesL3?.[i ?? undefined]
            });
        }
        return items;
    }
});

export const selectSeriesParamsArray = createSelector(
    selectPhases,
    selectIsComparisonMode,
    (phases, isComparison) => createSeriesParamsArray(phases, isComparison)
);

export const selectDetailChart = createSelector(
    selectDetailChartItems,
    selectSeriesParamsArray,
    (items, series): PeakDemandDetailChart | null => {
        if (!items) {
            return null;
        }
        return {
            title: 'Active Power Demand',
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
            unit: 'kW',
            color: colors.activePowerMain,
            stack: 1
        });
    }
    if (phases.l1) {
        arr.push({
            name: 'L1',
            valueField: 'valueL1_1',
            unit: 'kW',
            color: colors.activePowerL1,
            stack: 1
        });
    }
    if (phases.l2) {
        arr.push({
            name: 'L2',
            valueField: 'valueL2_1',
            unit: 'kW',
            color: colors.activePowerL2,
            stack: 1
        });
    }
    if (phases.l3) {
        arr.push({
            name: 'L3',
            valueField: 'valueL3_1',
            unit: 'kW',
            color: colors.activePowerL3,
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
