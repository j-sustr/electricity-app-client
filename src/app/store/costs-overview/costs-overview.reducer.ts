import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './costs-overview.actions';
import { CostsOverviewState } from './costs-overview.model';

export const initialState: CostsOverviewState = {
    items1: null,
    items2: null,
    loading: false,
    error: null
};

const reducer = createReducer(
    initialState,
    on(actions.getOverview, (state) => ({
        ...state,
        items1: null,
        items2: null,
        loading: true,
        error: null
    })),
    on(actions.getOverviewSuccess, (state, { items1, items2 }) => ({
        ...state,
        items1,
        items2,
        loading: false,
        error: null
    })),
    on(actions.getOverviewError, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);

export function costsOverviewReducer(
    state: CostsOverviewState | undefined,
    action: Action
): CostsOverviewState {
    return reducer(state, action);
}
