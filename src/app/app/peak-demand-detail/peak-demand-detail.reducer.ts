import { Action, createReducer, on } from '@ngrx/store';
import { DemandAggregation } from 'src/app/web-api-client';
import {
    getDetail,
    getDetailError,
    getDetailSuccess,
    setAggregation
} from './peak-demand-detail.actions';
import { PeakDemandDetailState } from './peak-demand-detail.model';

export const initialState: PeakDemandDetailState = {
    viewType: 'chart',
    aggregation: DemandAggregation.OneHour,
    series1: null,
    series2: null,
    interval1: null,
    interval2: null,
    loading: false,
    error: null
};

const reducer = createReducer(
    initialState,
    on(setAggregation, (state, action) => ({
        ...state,
        aggregation: action.aggregation
    })),
    on(getDetail, (state) => ({
        ...state,
        series1: null,
        series2: null,
        loading: true,
        error: null
    })),
    on(getDetailSuccess, (state, action) => ({
        ...state,
        series1: action.series1,
        series2: action.series2,
        interval1: action.interval1,
        interval2: action.interval2,
        loading: false,
        error: null
    })),
    on(getDetailError, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);

export function peakDemandDetailReducer(
    state: PeakDemandDetailState | undefined,
    action: Action
): PeakDemandDetailState {
    return reducer(state, action);
}
