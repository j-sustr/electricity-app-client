import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app-store.state';
import { PowerFactorOverviewState } from './power-factor-overview.model';

export const selectPowerFactorOverview = createFeatureSelector<
    AppState,
    PowerFactorOverviewState
>('powerFactorOverview');

export const selectPFOverviewViewType = createSelector(
    selectPowerFactorOverview,
    (state: PowerFactorOverviewState) => state.viewType
);

export const selectPFOverviewShowEnergy = createSelector(
    selectPowerFactorOverview,
    (state: PowerFactorOverviewState) => state.showEnergy
);

export const selectPFOverviewViewItems = createSelector(
    selectPowerFactorOverview,
    (state: PowerFactorOverviewState) => state.view.items
);

export const selectPFOverviewViewSeries = createSelector(
    selectPowerFactorOverview,
    (state: PowerFactorOverviewState) => state.view.series
);

export const selectPFOverviewViewLoading = createSelector(
    selectPowerFactorOverview,
    (state: PowerFactorOverviewState) => state.view.loading
);
