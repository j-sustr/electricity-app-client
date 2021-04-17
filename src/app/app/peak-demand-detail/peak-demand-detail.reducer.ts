import { Action, createReducer, on } from '@ngrx/store';
import {
    getDetail,
    getDetailError,
    getDetailSuccess,
    setViewType
} from './peak-demand-detail.actions';
import { PeakDemandDetailState } from './peak-demand-detail.model';

export const initialState: PeakDemandDetailState = {
    viewType: 'table',
    data1: null,
    data2: null,
    loading: false,
    error: null
};

const reducer = createReducer(
    initialState,
    on(setViewType, (state, action) => ({
        ...state,
        viewType: action.viewType
    })),
    on(getDetail, (state) => ({
        ...state,
        data1: null,
        data2: null,
        loading: true,
        error: null
    })),
    on(getDetailSuccess, (state, { data1, data2 }) => ({
        ...state,
        data1,
        data2,
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
