import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app-store.state';
import { PowerFactorDetailState } from './power-factor-detail.model';

export const selectDetail = createFeatureSelector<
    AppState,
    PowerFactorDetailState
>('powerFactorDetail');

export const selectHasData = createSelector(selectDetail, (state) =>
    Array.isArray(state.distribution)
);

export const selectViewType = createSelector(
    selectDetail,
    (state) => state.viewType
);

export const selectDistribution = createSelector(
    selectDetail,
    (state) => state.distribution
);
