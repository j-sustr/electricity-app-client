import { createFeatureSelector, createSelector } from '@ngrx/store';
import { toUnitPrefix } from 'src/app/common/number/number-utils';
import { PeakDemandOverviewItem } from 'src/app/web-api-client';
import { AppState } from '../app-store.state';
import { PeakDemandOverviewState } from './peak-demand-overview.model';

export interface PeakDemandOverviewTableItem {
    groupId: string;
    groupName: string;
    peakDemandTime: Date;
    peakDemandValue: number;
    isForComparison?: boolean;
}

export interface PeakDemandOverviewTable {
    items: PeakDemandOverviewTableItem[];
}

export const selectOverview = createFeatureSelector<
    AppState,
    PeakDemandOverviewState
>('peakDemandOverview');

export const selectHasData = createSelector(selectOverview, (state) =>
    Array.isArray(state.items1)
);

export const selectViewType = createSelector(
    selectOverview,
    (state) => state.viewType
);

export const selectOverviewTableItems = createSelector(
    selectOverview,
    (state: PeakDemandOverviewState): PeakDemandOverviewTableItem[] | null => {
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
            item: PeakDemandOverviewItem,
            stack?: 1 | 2
        ): PeakDemandOverviewTableItem {
            const suffix = stack ? ` (${stack})` : '';
            return {
                groupId: item.groupId ?? '(no id)',
                groupName: (item.groupName ?? '(no name)') + suffix,
                peakDemandTime: item.peakDemands?.[0]?.start ?? new Date(NaN),
                peakDemandValue: toUnitPrefix(
                    item.peakDemands?.[0]?.value ?? NaN,
                    'Kilo'
                )
            };
        }
    }
);

export const selectOverviewTable = createSelector(
    selectOverviewTableItems,
    (items): PeakDemandOverviewTable | null => {
        if (!items) {
            return null;
        }
        return {
            items
        };
    }
);
