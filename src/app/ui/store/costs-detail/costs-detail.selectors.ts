import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app-store.state';
import { CostsDetailState } from './costs-detail.model';

export const selectCostsDetail = createFeatureSelector<
    AppState,
    CostsDetailState
>('costsDetail');

export const selectCostsDetailHasData = createSelector(
    selectCostsDetail,
    (state) => Array.isArray(state.items)
);
