import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app-store.state';
import { DataSourceState } from './data-source.reducer';

const selectDataSource = createFeatureSelector<AppState, DataSourceState>(
    'dataSource'
);

export const selectDataSourceIntervals = createSelector(
    selectDataSource,
    (state: DataSourceState) => state.intervals
);

export const selectDataSourceInfo = createSelector(
    selectDataSource,
    (state: DataSourceState) => state.info
);
