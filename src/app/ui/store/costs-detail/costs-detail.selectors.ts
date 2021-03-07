import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app-store.state';
import { CostsDetailState } from './costs-detail.model';

export const selectDetail = createFeatureSelector<AppState, CostsDetailState>(
    'costsDetail'
);

export const selectHasData = createSelector(selectDetail, (state) =>
    Array.isArray(state.items)
);
