import { Action, createReducer, on } from '@ngrx/store';
import {
    getOverview,
    getOverviewError,
    getOverviewSuccess,
    setViewType
} from './peak-demand-overview.actions';
import { PeakDemandOverviewState } from './peak-demand-overview.model';

export const initialState: PeakDemandOverviewState = {
    viewType: 'table',
    items1: null,
    items2: null,
    loading: false,
    error: null
};

const reducer = createReducer(
    initialState,
    on(setViewType, (state, action) => ({
        ...state,
        viewType: action.viewType
    })),
    on(getOverview, (state) => ({
        ...state,
        items1: null,
        items2: null,
        loading: true,
        error: null
    })),
    on(getOverviewSuccess, (state, { items1, items2 }) => ({
        ...state,
        items1,
        items2,
        loading: false,
        error: null
    })),
    on(getOverviewError, (state, { error }) => ({
        ...state,
        items1: null,
        items2: null,
        loading: false,
        error
    }))
);

export function peakDemandOverviewReducer(
    state: PeakDemandOverviewState | undefined,
    action: Action
): PeakDemandOverviewState {
    return reducer(state, action);
}
