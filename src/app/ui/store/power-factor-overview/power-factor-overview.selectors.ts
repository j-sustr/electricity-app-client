import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app-store.state';
import { PowerFactorOverviewState } from './power-factor-overview.model';

export const selectPowerFactorOverview = createFeatureSelector<
    AppState,
    PowerFactorOverviewState
>('powerFactorOverview');

export const selectPowerFactorOverviewHasData = createSelector(
    selectPowerFactorOverview,
    (state) => Array.isArray(state.items)
);
