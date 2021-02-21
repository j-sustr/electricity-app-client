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
