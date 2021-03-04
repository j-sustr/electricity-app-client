import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app-store.state';
import { PowerFactorOverviewState } from './power-factor-overview.model';

export const selectOverview = createFeatureSelector<
    AppState,
    PowerFactorOverviewState
>('powerFactorOverview');

export const selectHasData = createSelector(selectOverview, (state) =>
    Array.isArray(state.items)
);

export const selectViewType = createSelector(
    selectOverview,
    (state) => state.viewType
);
