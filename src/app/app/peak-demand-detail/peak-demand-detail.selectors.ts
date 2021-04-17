import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app-store.state';
import { PeakDemandDetailState } from './peak-demand-detail.model';

export const selectDetail = createFeatureSelector<
    AppState,
    PeakDemandDetailState
>('peakDemandDetail');

export const selectHasData = createSelector(
    selectDetail,
    (state) => state.data1 !== null
);

export const selectViewType = createSelector(
    selectDetail,
    (state) => state.viewType
);
