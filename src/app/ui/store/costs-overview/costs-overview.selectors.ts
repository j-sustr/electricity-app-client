import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app-store.state';
import { CostsOverviewState } from './costs-overview.model';

export const selectOverview = createFeatureSelector<
    AppState,
    CostsOverviewState
>('costsOverview');

export const selectHasData = createSelector(selectOverview, (state) =>
    Array.isArray(state.items)
);
