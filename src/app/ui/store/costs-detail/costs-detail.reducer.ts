import { Action, createReducer, on } from '@ngrx/store';
import { CostsDetailState } from './costs-detail.model';
import * as actions from './costs-detail.actions';

export const initialState: CostsDetailState = {
    groupName: null,
    items1: null,
    items2: null,
    loading: false,
    error: null
};

const reducer = createReducer(
    initialState,
    on(actions.getDetail, (state) => ({
        ...state,
        items1: null,
        items2: null,
        loading: true,
        error: null
    })),
    on(actions.getDetailSuccess, (state, { groupName, items1, items2 }) => ({
        ...state,
        groupName,
        items1,
        items2,
        loading: false,
        error: null
    })),
    on(actions.getDetailError, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);

export function costsDetailReducer(
    state: CostsDetailState | undefined,
    action: Action
): CostsDetailState {
    return reducer(state, action);
}
