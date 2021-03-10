import { createFeatureSelector, createSelector } from '@ngrx/store';
import isDate from 'date-fns/isDate';
import { AppState } from '../app-store.state';
import { DataSourceState } from './data-source.model';

const selectDataSource = createFeatureSelector<AppState, DataSourceState>(
    'dataSource'
);

export const selectIntervals = createSelector(
    selectDataSource,
    (state: DataSourceState) => ({
        interval1: state.interval1,
        interval2: state.interval2
    })
);

export const selectPhases = createSelector(
    selectDataSource,
    (state: DataSourceState) => state.phases
);

export const selectInfo = createSelector(
    selectDataSource,
    (state: DataSourceState) => state.info
);

export const selectIsComparisonMode = createSelector(
    selectDataSource,
    (state) => isDate(state.interval2?.start)
);
