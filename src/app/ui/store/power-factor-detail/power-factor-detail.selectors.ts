import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app-store.state';
import { PowerFactorOverviewState } from '../power-factor-overview/power-factor-overview.model';

export const selectDetail = createFeatureSelector<
    AppState,
    PowerFactorOverviewState
>('powerFactorOverview');

export const selectHasData = createSelector(selectDetail, (state) =>
    Array.isArray(state.items1)
);

export const selectViewType = createSelector(
    selectDetail,
    (state) => state.viewType
);
