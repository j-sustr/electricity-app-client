import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app-store.state';
import { PowerFactorDetailState } from './power-factor-detail.model';

export const selectDetail = createFeatureSelector<
    AppState,
    PowerFactorDetailState
>('powerFactorDetail');

export const selectHasData = createSelector(
    selectDetail,
    (state) => (state.distributionStack?.length ?? NaN) > 0
);

export const selectViewType = createSelector(
    selectDetail,
    (state) => state.viewType
);

export const selectDetailType = createSelector(
    selectDetail,
    (state) => state.detailType
);
