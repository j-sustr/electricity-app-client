import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app-store.state';
import { CostsOverviewState } from './costs-overview.model';

export const selectCostsOverview = createFeatureSelector<
    AppState,
    CostsOverviewState
>('costsOverview');

export const selectCostsOverviewHasData = createSelector(
    selectCostsOverview,
    (state) => Array.isArray(state.items)
);
