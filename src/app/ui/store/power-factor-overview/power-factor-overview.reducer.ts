import { Action, createReducer, on } from '@ngrx/store';
import {
    getOverview as getOverview,
    getOverviewSuccess as getOverviewSuccess,
    setViewType,
    toggleEnergy,
    getOverviewError
} from './power-factor-overview.actions';
import { PowerFactorOverviewState } from './power-factor-overview.model';

export const initialState: PowerFactorOverviewState = {
    viewType: 'table',
    showEnergy: false,
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
    on(toggleEnergy, (state) => ({
        ...state,
        showEnergy: !state.showEnergy
    })),
    on(getOverview, (state) => ({
        ...state,
        items: null,
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
        items: null,
        loading: false,
        error
    }))
);

export function powerFactorOverviewReducer(
    state: PowerFactorOverviewState | undefined,
    action: Action
): PowerFactorOverviewState {
    return reducer(state, action);
}
